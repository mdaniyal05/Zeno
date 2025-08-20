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

    if (transactionAmount < 0) {
      res.status(400);
      throw new Error("Negative values are not allowed.");
    } else {
      if (
        transaction.transactionType === "Saving" &&
        account.accountType === "Savings"
      ) {
        if (req.body.accountId !== transaction.accountId) {
          account.accountBalance =
            account.accountBalance - transaction.transactionAmount;

          const saving = await Saving.findOne({
            where: { accountId: account.accountId },
          });

          saving.currentAmount =
            saving.currentAmount - transaction.transactionAmount;

          await saving.save();
          await account.save();

          const newAccount = await Account.findByPk(req.body.accountId);
          const newSaving = await Saving.findOne({
            where: { accountId: newAccount.accountId },
          });

          newAccount.accountBalance =
            newAccount.accountBalance + req.body.transactionAmount;

          newSaving.currentAmount =
            newSaving.currentAmount + req.body.transactionAmount;

          await newSaving.save();
          await newAccount.save();
        }
      } else {
        res.status(400);
        throw new Error("Saving only works with saving accounts.");
      }

      if (
        transaction.transactionType === "Expense" &&
        account.accountType !== "Savings"
      ) {
        if (req.body.accountId !== transaction.accountId) {
          account.accountBalance =
            account.accountBalance + transaction.transactionAmount;

          await account.save();

          const newAccount = await Account.findByPk(req.body.accountId);

          if (req.body.transactionAmount < newAccount.accountBalance) {
            newAccount.accountBalance =
              newAccount.accountBalance - req.body.transactionAmount;

            await newAccount.save();
          } else {
            res.status(400);
            throw new Error(
              "Transaction amount cannot be greater than account balance."
            );
          }
        }
      } else {
        res.status(400);
        throw new Error(
          "Expense only works with default and current accounts."
        );
      }

      if (
        transaction.transactionType === "Income" &&
        account.accountType !== "Savings"
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
      } else {
        res.status(400);
        throw new Error("Income only works with default and current accounts.");
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

    const updatedTransaction = await transaction.save();

    res.status(201).json({
      transactionAmount: updatedTransaction.transactionAmount,
      transactionType: updatedTransaction.transactionType,
      paymentMethod: updatedTransaction.paymentMethod,
      transactionDate: updatedTransaction.transactionDate,
      description: updatedTransaction.description,
      accountId: updatedTransaction.accountId,
    });
  } else {
    res.status(404);
    throw new Error("Transaction not found.");
  }
});

const deleteUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  const account = await Account.findByPk(transaction.accountId);

  if (transaction && account) {
    account.accountBalance =
      account.accountBalance + transaction.transactionAmount;

    await account.save();

    await Transaction.destroy({ where: { transactionId: transactionId } });

    res.status(200).json({
      message: `Transaction of amount: ${transaction.transactionAmount} deleted successfully.`,
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
