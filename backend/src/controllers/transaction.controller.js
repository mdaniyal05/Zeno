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

        await saving.save();

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

      account.accountBalance = account.accountBalance + transactionAmount;

      await account.save();
    }

    if (transactionType === "Expense" && account.accountType !== "Savings") {
      if (transactionAmount < account.accountBalance) {
        account.accountBalance =
          account.accountBalance - parseFloat(transactionAmount);

        await account.save();
      } else {
        res.status(400);
        throw new Error(
          "Transaction amount cannot be greater than account balance."
        );
      }
    }

    if (transactionType === "Income" && account.accountType !== "Savings") {
      account.accountBalance = account.accountBalance + transactionAmount;

      await account.save();
    }

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
    res.status(404);
    throw new Error("Account not found.");
  }
});

const updateUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  if (transaction) {
    const account = await Account.findByPk(transaction.accountId);

    const saving = await Saving.findOne({
      where: { savingId: transaction.savingId },
    });

    if (req.body.transactionAmount <= 0) {
      res.status(400);
      throw new Error("Negative values and zero are not allowed.");
    }

    if (
      req.body.transactionType === "Saving" &&
      req.body.accountType === "Savings"
    ) {
      if (!req.body.savingId) {
        res.status(400);
        throw new Error("Please provide the saving field.");
      }

      if (req.body.accountId !== transaction.accountId) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        const newAccount = await Account.findByPk(req.body.accountId);

        newAccount.accountBalance =
          newAccount.accountBalance + req.body.transactionAmount;

        await account.save();
        await newAccount.save();
      }

      if (req.body.savingId !== transaction.savingId) {
        saving.currentAmount =
          saving.currentAmount - transaction.transactionAmount;

        const newSaving = await Saving.findOne({
          where: { savingId: req.body.savingId },
        });

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
      }
    }

    if (
      req.body.transactionType === "Expense" &&
      req.body.accountType !== "Savings"
    ) {
      if (req.body.accountId !== transaction.accountId) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        await account.save();

        const newAccount = await Account.findByPk(req.body.accountId);

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
      }

      if (req.body.transactionAmount !== transaction.transactionAmount) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        account.accountBalance =
          account.accountBalance + req.body.transactionAmount;

        await account.save();
      }
    }

    if (
      req.body.transactionType === "Income" &&
      req.body.accountType !== "Savings"
    ) {
      if (req.body.accountId !== transaction.accountId) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        await account.save();

        const newAccount = await Account.findByPk(req.body.accountId);

        newAccount.accountBalance =
          newAccount.accountBalance + req.body.transactionAmount;

        await newAccount.save();
      }

      if (req.body.transactionAmount !== transaction.transactionAmount) {
        account.accountBalance =
          account.accountBalance - transaction.transactionAmount;

        account.accountBalance =
          account.accountBalance + req.body.transactionAmount;

        await account.save();
      }
    }

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

    res.status(201).json({
      transactionAmount: updatedTransaction.transactionAmount,
      transactionType: updatedTransaction.transactionType,
      paymentMethod: updatedTransaction.paymentMethod,
      transactionDate: updatedTransaction.transactionDate,
      description: updatedTransaction.description,
      accountId: updatedTransaction.accountId,
      message: "Transaction updated successfully.",
    });
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

    if (saving) {
      saving.currentAmount =
        saving.currentAmount - transaction.transactionAmount;

      await saving.save();
    }

    account.accountBalance =
      account.accountBalance + transaction.transactionAmount;

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
