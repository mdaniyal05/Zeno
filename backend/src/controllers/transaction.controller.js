const sequelize = require("../db/db");
const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model");
const Account = require("../models/account.model");
const Saving = require("../models/saving.model");
const notifyEmail = require("../utils/notifyEmail");

/*

Get single transaction controller

*/

const getUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found.");
  }

  res.status(200).json({
    ...transaction.toJSON(),
  });
});

/*

Get single  transaction controller (END)

*/

/*

Get all transactions controller

*/

const getAllUserTransactions = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const transactions = await Transaction.findAll({ where: { userId: userId } });

  if (transactions.length === 0) {
    res.status(404);
    throw new Error("No transactions found.");
  }

  res.status(200).json({
    transactionsData: transactions,
  });
});

/*

Get all transactions controller (END)

*/

/*

Create transaction controller

*/

const validateCreateInputs = (
  res,
  transactionAmount,
  transactionType,
  account,
  saving
) => {
  if (transactionAmount <= 0) {
    res.status(400);
    throw new Error("Transaction amount must be greater than 0.");
  }

  if (
    transactionType === "Expense" &&
    account.accountBalance < transactionAmount
  ) {
    res.status(400);
    throw new Error(
      "Expense transaction amount cannot be greater than account balance."
    );
  }

  if (
    (transactionType === "Expense" || transactionType === "Income") &&
    account.accountType === "Savings"
  ) {
    res.status(400);
    throw new Error("Expense or Income cannot be linked to a Savings account.");
  }

  if (transactionType === "Saving" && account.accountType !== "Savings") {
    res.status(400);
    throw new Error("Saving transaction must be linked to a Savings account.");
  }

  if (saving && saving.status !== "Active") {
    res.status(400);
    throw new Error("Selected saving must  be active.");
  }
};

const createCalculations = async ({
  transactionAmount,
  transactionType,
  account,
  saving,
  userEmail,
  t,
}) => {
  if (transactionType === "Saving") {
    account.accountBalance += transactionAmount;
    saving.currentAmount += transactionAmount;

    if (
      saving.currentAmount >= saving.targetAmount &&
      saving.status !== "Completed"
    ) {
      saving.status = "Completed";
      const message =
        "Congratulations! You have reached your savings target. Keep up the good financial record.";
      await notifyEmail(
        userEmail,
        message,
        `Savings target of: ${saving.targetAmount} completed.`
      );
    }

    await saving.save({ transaction: t });
  }

  if (transactionType === "Income") {
    account.accountBalance += transactionAmount;
  }

  if (transactionType === "Expense") {
    account.accountBalance -= transactionAmount;
  }

  await account.save({ transaction: t });
};

const createUserTransaction = asyncHandler(async (req, res) => {
  const {
    transactionAmount,
    transactionType,
    paymentMethod,
    transactionDate,
    description,
    accountId,
    savingId,
  } = req.body;

  if (
    !transactionAmount ||
    !transactionType ||
    !paymentMethod ||
    !transactionDate ||
    !description ||
    !accountId
  ) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (transactionType === "Saving" && !savingId) {
    res.status(400);
    throw new Error(
      "Please provide the saving field for a Saving transaction."
    );
  }

  if (
    (transactionType === "Expense" || transactionType === "Income") &&
    savingId
  ) {
    res.status(400);
    throw new Error(
      "Do not provide saving for Expense or Income transactions."
    );
  }

  const t = await sequelize.transaction();

  try {
    const account = await Account.findByPk(accountId, {
      transaction: t,
    });

    const saving = savingId
      ? await Saving.findByPk(savingId, { transaction: t })
      : null;

    validateCreateInputs(
      res,
      transactionAmount,
      transactionType,
      account,
      saving
    );

    await createCalculations({
      transactionAmount,
      transactionType,
      account,
      saving,
      userEmail: req.user.email,
      t,
    });

    const userId = req.user.userId;

    const newTransaction = await Transaction.create(
      {
        transactionAmount,
        transactionType,
        paymentMethod,
        transactionDate,
        description,
        userId,
        accountId,
        savingId,
      },
      { transaction: t }
    );

    if (newTransaction) {
      await t.commit();

      res.status(201).json({
        ...newTransaction.toJSON(),
        message: "Transaction created successfully.",
      });
    }
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Create transaction controller (END)

*/

/*

Update transaction controller

*/

const validateUpdateInputs = (
  res,
  reqBody,
  newAccount,
  newSaving,
  transaction
) => {
  if (
    !reqBody.transactionAmount ||
    !reqBody.transactionType ||
    !reqBody.paymentMethod ||
    !reqBody.transactionDate ||
    !reqBody.description ||
    !reqBody.accountId
  ) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (reqBody.transactionAmount <= 0) {
    res.status(400);
    throw new Error("Transaction amount must be greater than 0.");
  }

  if (reqBody.transactionType === "Saving" && !reqBody.savingId) {
    res.status(400);
    throw new Error(
      "Please provide the saving field for a Saving transaction."
    );
  }

  if (newSaving && newSaving.status !== "Active") {
    res.status(400);
    throw new Error("Selected saving must  be active.");
  }

  if (
    transaction.transactionType === "Saving" &&
    (reqBody.transactionType === "Expense" ||
      reqBody.transactionType === "Income")
  ) {
    res.status(400);
    throw new Error(
      "You cannot change saving transaction into epxense or income."
    );
  }

  if (
    reqBody.transactionType === "Saving" &&
    (transaction.transactionType === "Expense" ||
      transaction.transactionType === "Income")
  ) {
    res.status(400);
    throw new Error(
      "You cannot change income or expense transaction into saving."
    );
  }

  if (
    reqBody.transactionType === "Saving" &&
    newAccount.accountType !== "Savings"
  ) {
    res.status(400);
    throw new Error("Saving transaction must be linked to a Savings account.");
  }

  if (
    (reqBody.transactionType === "Expense" ||
      reqBody.transactionType === "Income") &&
    newAccount.accountType === "Savings"
  ) {
    res.status(400);
    throw new Error("Expense or Income cannot be linked to a Savings account.");
  }

  if (
    reqBody.transactionType === "Expense" &&
    newAccount.accountBalance < reqBody.transactionAmount
  ) {
    res.status(400);
    throw new Error(
      "Expense transaction amount cannot be greater than account balance."
    );
  }

  if (
    (reqBody.transactionType === "Expense" ||
      reqBody.transactionType === "Income") &&
    reqBody.savingId
  ) {
    res.status(400);
    throw new Error(
      "Do not provide saving for Expense or Income transactions."
    );
  }
};

const calculateBalances = async ({
  reqBody,
  transaction,
  oldAccount,
  newAccount,
  oldSaving,
  newSaving,
  userEmail,
  t,
}) => {
  const oldTransactionAmount = transaction.transactionAmount;
  const newTransactionAmount = reqBody.transactionAmount;

  if (
    reqBody.transactionType === "Saving" ||
    reqBody.transactionType === "Income"
  ) {
    if (newAccount.accountId !== oldAccount.accountId) {
      oldAccount.accountBalance -= oldTransactionAmount;
      newAccount.accountBalance += newTransactionAmount;

      if (oldAccount === "Savings") {
        oldSaving.currentAmount -= oldTransactionAmount;
      }
    }

    if (transaction.transactionType === "Expense") {
      oldAccount.accountBalance += oldTransactionAmount * 2;
    }

    if (newTransactionAmount !== oldTransactionAmount) {
      oldAccount.accountBalance -= oldTransactionAmount;
      oldAccount.accountBalance += newTransactionAmount;
    }

    await oldAccount.save({ transaction: t });
    await newAccount.save({ transaction: t });
  }

  if (reqBody.transactionType === "Saving") {
    if (newSaving.savingId !== oldSaving.savingId) {
      oldSaving.currentAmount -= oldTransactionAmount;

      newSaving.currentAmount += newTransactionAmount;
    }

    if (newTransactionAmount !== oldTransactionAmount) {
      oldSaving.currentAmount -= oldTransactionAmount;
      oldSaving.currentAmount += newTransactionAmount;
    }

    if (
      newSaving.currentAmount >= newSaving.targetAmount &&
      newSaving.status !== "Completed"
    ) {
      newSaving.status = "Completed";
      const message =
        "Congratulations! You have reached your savings target. Keep up the good financial record.";
      await notifyEmail(
        userEmail,
        message,
        `Savings target of: ${newSaving.targetAmount} completed.`
      );
    }

    await oldSaving.save({ transaction: t });
    await newSaving.save({ transaction: t });
  }

  if (reqBody.transactionType === "Expense") {
    if (newAccount.accountId !== oldAccount.accountId) {
      oldAccount.accountBalance += oldTransactionAmount;
      newAccount.accountBalance -= newTransactionAmount;
    }

    if (transaction.transactionType === "Income") {
      oldAccount.accountBalance -= oldTransactionAmount * 2;
    }

    if (newTransactionAmount !== oldTransactionAmount) {
      oldAccount.accountBalance += oldTransactionAmount;
      oldAccount.accountBalance -= newTransactionAmount;
    }

    await oldAccount.save({ transaction: t });
    await newAccount.save({ transaction: t });
  }
};

const updateUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found.");
  }

  const t = await sequelize.transaction();

  try {
    const oldAccount = await Account.findByPk(transaction.accountId, {
      transaction: t,
    });

    const newAccount = await Account.findByPk(req.body.accountId, {
      transaction: t,
    });

    const oldSaving = transaction.savingId
      ? await Saving.findByPk(transaction.savingId, { transaction: t })
      : null;

    const newSaving = req.body.savingId
      ? await Saving.findByPk(req.body.savingId, { transaction: t })
      : null;

    validateUpdateInputs(res, req.body, newAccount, newSaving, transaction);

    await calculateBalances({
      transaction,
      reqBody: req.body,
      oldAccount,
      newAccount,
      oldSaving,
      newSaving,
      t,
      userEmail: req.user.email,
    });

    Object.assign(transaction, {
      transactionAmount: req.body.transactionAmount,
      transactionType: req.body.transactionType,
      paymentMethod: req.body.paymentMethod,
      transactionDate: req.body.transactionDate,
      description: req.body.description,
      accountId: req.body.accountId,
      savingId: req.body.savingId,
    });

    await transaction.save({ transaction: t });

    await t.commit();

    res.status(200).json({
      ...transaction.toJSON(),
      message: "Transaction updated successfully.",
    });
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Update transaction controller (END)

*/

/*

Delete transaction controller

*/

const deleteUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found.");
  }

  const t = await sequelize.transaction();

  try {
    const account = await Account.findByPk(transaction.accountId, {
      transaction: t,
    });

    const saving = transaction.savingId
      ? await Saving.findByPk(transaction.savingId, { transaction: t })
      : null;

    if (saving) {
      saving.currentAmount -= transaction.transactionAmount;

      await saving.save({ transaction: t });
    }

    if (account) {
      if (transaction.transactionType === "Expense") {
        account.accountBalance += transaction.transactionAmount;
      } else if (
        transaction.transactionType === "Saving" ||
        transaction.transactionType === "Income"
      ) {
        account.accountBalance -= transaction.transactionAmount;
      }

      await account.save({ transaction: t });
    }

    await transaction.destroy({ transaction: t });

    await t.commit();

    res.status(200).json({
      message: `Transaction deleted successfully.`,
    });
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Delete transaction controller (END)

*/

module.exports = {
  getUserTransaction,
  getAllUserTransactions,
  createUserTransaction,
  updateUserTransaction,
  deleteUserTransaction,
};
