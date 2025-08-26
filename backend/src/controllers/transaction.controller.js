const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model");
const Account = require("../models/account.model");
const Saving = require("../models/saving.model");
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

const updateUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  let checkCalculation = false;

  if (transaction) {
    const account = await Account.findByPk(transaction.accountId);
    const newAccount = await Account.findByPk(req.body.accountId);

    const saving = await Saving.findOne({
      where: { savingId: transaction.savingId },
    });
    const newSaving = await Saving.findOne({
      where: { savingId: req.body.savingId },
    });

    if (req.body.transactionAmount <= 0) {
      res.status(400);
      throw new Error("Negative values and zero are not allowed.");
    }

    if (
      req.body.transactionType === transaction.transactionType &&
      req.body.accountId === account.accountId
    ) {
      checkCalculation = true;
    }

    if (
      req.body.transactionType === "Saving" &&
      newAccount.accountType === "Savings"
    ) {
      if (!req.body.savingId) {
        res.status(400);
        throw new Error("Please provide the saving field.");
      }

      if (newAccount.accountId !== transaction.accountId) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        newAccount.accountBalance =
          newAccount.accountBalance + req.body.transactionAmount;

        await account.save();
        await newAccount.save();

        checkCalculation = true;
      }

      if (newSaving.savingId !== transaction.savingId) {
        saving.currentAmount =
          saving.currentAmount - transaction.transactionAmount;

        newSaving.currentAmount =
          newSaving.currentAmount + req.body.transactionAmount;

        if (newSaving.currentAmount >= newSaving.targetAmount) {
          newSaving.status = "Completed";

          const message =
            "Congratulations! You have reached your savings target. Keep up the good financial record.";

          notifyEmail(
            req.user.email,
            message,
            `Savings target of: ${newSaving.targetAmount} completed.`
          );
        }

        await saving.save();
        await newSaving.save();

        checkCalculation = true;
      }

      if (req.body.transactionAmount !== transaction.transactionAmount) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        account.accountBalance =
          account.accountBalance + req.body.transactionAmount;

        saving.currentAmount =
          saving.currentAmount - transaction.transactionAmount;

        saving.currentAmount =
          saving.currentAmount + req.body.transactionAmount;

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

        await account.save();
        await saving.save();

        checkCalculation = true;
      }
    }

    if (
      req.body.transactionType === "Expense" &&
      newAccount.accountType !== "Savings"
    ) {
      if (req.body.savingId) {
        res.status(400);
        throw new Error(
          "Please set saving to none when doing income or expense transaction."
        );
      }

      if (account.accountType === "Income") {
        account.accountBalance =
          account.accountBalance + transaction.transactionAmount;

        await account.save();
      }

      if (account.accountType === "Savings") {
        saving.currentAmount =
          saving.currentAmount - transaction.transactionAmount;

        await saving.save();
      }

      if (newAccount.accountId !== transaction.accountId) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        await account.save();

        if (req.body.transactionAmount < newAccount.accountBalance) {
          newAccount.accountBalance =
            newAccount.accountBalance + req.body.transactionAmount;

          await newAccount.save();
        } else {
          res.status(400);
          throw new Error(
            "Transaction amount cannot be greater than account balance."
          );
        }

        checkCalculation = true;
      }

      if (req.body.transactionAmount !== transaction.transactionAmount) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        account.accountBalance =
          account.accountBalance + req.body.transactionAmount;

        await account.save();
      }

      checkCalculation = true;
    }

    if (
      req.body.transactionType === "Income" &&
      newAccount.accountType !== "Savings"
    ) {
      if (req.body.savingId) {
        res.status(400);
        throw new Error(
          "Please set saving to none when doing income or expense transaction."
        );
      }

      if (account.accountType === "Expense") {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        await account.save();
      }

      if (account.accountType === "Savings") {
        saving.currentAmount =
          saving.currentAmount - transaction.transactionAmount;

        await saving.save();
      }

      if (newAccount.accountId !== transaction.accountId) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        await account.save();

        newAccount.accountBalance =
          newAccount.accountBalance + req.body.transactionAmount;

        await newAccount.save();

        checkCalculation = true;
      }

      if (req.body.transactionAmount !== transaction.transactionAmount) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        account.accountBalance =
          account.accountBalance + req.body.transactionAmount;

        await account.save();

        checkCalculation = true;
      }
    }

    if (checkCalculation) {
      transaction.transactionAmount =
        req.body.transactionAmount || transaction.transactionAmount;
      transaction.transactionType =
        req.body.transactionType || transaction.transactionType;
      transaction.paymentMethod =
        req.body.paymentMethod || transaction.paymentMethod;
      transaction.transactionDate =
        req.body.transactionDate || transaction.transactionDate;
      transaction.description = req.body.description || transaction.description;
      transaction.accountId = req.body.accountId || transaction.accountId;
      transaction.savingId = req.body.savingId || transaction.savingId;

      const updatedTransaction = await transaction.save();

      res.status(200).json({
        transactionAmount: updatedTransaction.transactionAmount,
        transactionType: updatedTransaction.transactionType,
        paymentMethod: updatedTransaction.paymentMethod,
        transactionDate: updatedTransaction.transactionDate,
        description: updatedTransaction.description,
        accountId: updatedTransaction.accountId,
        message: "Transaction updated successfully.",
      });
    } else {
      throw new Error(
        "Unable to create transaction. Please check the types you have selected. (Saving type will not work with any other type except saving and expense or income type will only work with current and default types.)"
      );
    }
  } else {
    res.status(404);
    throw new Error("Transaction not found.");
  }
});

const deleteUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  if (transaction) {
    const account = await Account.findByPk(transaction.accountId);
    const saving = await Saving.findByPk(transaction.savingId);

    if (saving && transaction.transactionType === "Saving") {
      saving.currentAmount =
        saving.currentAmount - transaction.transactionAmount;

      await saving.save();
    }

    if (
      transaction.transactionType === "Savings" ||
      transaction.transactionType === "Income"
    ) {
      account.accountBalance =
        account.accountBalance - transaction.transactionAmount;
    } else if (transaction.transactionType === "Expense") {
      account.accountBalance =
        account.accountBalance + transaction.transactionAmount;
    }

    await account.save();

    await Transaction.destroy({ where: { transactionId: transactionId } });

    res.status(200).json({
      message: `Transaction deleted successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Transaction not found.");
  }
});

module.exports = {
  getUserTransaction,
  getAllUserTransactions,
  createUserTransaction,
  updateUserTransaction,
  deleteUserTransaction,
};
