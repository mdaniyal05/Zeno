const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model");
const Account = require("../models/account.model");
const Saving = require("../models/saving.model");
const sequelize = require("../db/db");
const notifyEmail = require("../utils/notifyEmail");

const getUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  if (transaction) {
    res.status(200).json({
      transactionId: transaction.transactionId,
      transactionAmount: transaction.transactionAmount,
      transactionType: transaction.transactionType,
      paymentMethod: transaction.paymentMethod,
      transactionDate: transaction.transactionDate,
      description: transaction.description,
      accountId: transaction.accountId,
      savingId: transaction.savingId,
    });
  } else {
    res.status(404);
    throw new Error("Transaction not found.");
  }
});

const getAllUserTransactions = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const transactions = await Transaction.findAll({ where: { userId: userId } });

  if (transactions) {
    res.status(200).json({
      transactionsData: transactions,
    });
  } else {
    res.status(404);
    throw new Error("No transactions available.");
  }
});

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

  let checkCalculation = false;

  if (
    !transactionAmount ||
    !transactionType ||
    !paymentMethod ||
    !transactionDate ||
    !description ||
    !accountId
  ) {
    res.status(400);
    throw new Error(
      "All fields are required (savings field only required when performing savings transactions)."
    );
  }

  if (transactionAmount <= 0) {
    res.status(400);
    throw new Error("Negative values and zero are not allowed.");
  }

  const userId = req.user.userId;

  const account = await Account.findOne({
    where: { accountId: accountId },
  });

  if (account) {
    if (transactionType === "Saving" && account.accountType === "Savings") {
      if (!savingId) {
        res.status(400);
        throw new Error("Please provide the saving field.");
      }

      const saving = await Saving.findOne({ where: { savingId: savingId } });

      if (saving) {
        saving.currentAmount = saving.currentAmount + transactionAmount;

        account.accountBalance = account.accountBalance + transactionAmount;

        await saving.save();
        await account.save();

        if (saving.currentAmount >= saving.targetAmount) {
          saving.status = "Completed";

          const message =
            "Congratulations! You have reached your savings target. Keep up the good financial record.";

          notifyEmail(
            req.user.email,
            message,
            `Savings target of: ${saving.targetAmount} completed.`
          );
        }
      } else {
        res.status(400);
        throw new Error(
          "You must have a saving active in order to create a saving transaction."
        );
      }

      checkCalculation = true;
    }

    if (transactionType === "Expense" && account.accountType !== "Savings") {
      if (savingId) {
        res.status(400);
        throw new Error(
          "Please set saving to none when doing income or expense transaction."
        );
      }

      if (transactionAmount < account.accountBalance) {
        account.accountBalance = account.accountBalance - transactionAmount;

        await account.save();
      } else {
        res.status(400);
        throw new Error(
          "Transaction amount cannot be greater than account balance."
        );
      }

      checkCalculation = true;
    }

    if (transactionType === "Income" && account.accountType !== "Savings") {
      if (savingId) {
        res.status(400);
        throw new Error(
          "Please set saving to none when doing income or expense transaction."
        );
      }

      account.accountBalance = account.accountBalance + transactionAmount;

      await account.save();

      checkCalculation = true;
    }

    if (checkCalculation) {
      const newTransaction = await Transaction.create({
        transactionAmount: transactionAmount,
        transactionType: transactionType,
        paymentMethod: paymentMethod,
        transactionDate: transactionDate,
        description: description,
        userId: userId,
        accountId: accountId,
        savingId: savingId,
      });

      if (newTransaction) {
        res.status(201).json({
          message: `Transaction created successfully.`,
        });
      } else {
        res.status(400);
        throw new Error("Invalid transaction data.");
      }
    } else {
      res.status(400);
      throw new Error(
        "Unable to create transaction. Please check the types you have selected. (Saving type will not work with any other type except saving and expense or income type will only work with current and default types.)"
      );
    }
  } else {
    res.status(404);
    throw new Error("Account not found.");
  }
});

/*

Update controller and logic for transaction feature

*/

const validateUpdateInputs = (
  res,
  reqBody,
  newAccount,
  newSaving,
  transaction
) => {
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
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Update controller and logic for transaction feature (END)

*/

/*

Delete controller and logic for transaction feature

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
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Delete controller and logic for transaction feature (END)

*/

module.exports = {
  getUserTransaction,
  getAllUserTransactions,
  createUserTransaction,
  updateUserTransaction,
  deleteUserTransaction,
};
