const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model");
const Account = require("../models/account.model");

const getUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  if (transaction) {
    res.status(200).json({
      transactionId: transaction.transactionId,
      transactionAmount: transaction.transactionAmount,
      transactionType: transaction.transactionType,
      paymentMethod: transaction.paymentMethod,
      description: transaction.description,
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
    description,
    accountId,
  } = req.body;

  const userId = req.user.userId;
  const account = await Account.findOne({
    where: { accountId: accountId },
  });

  if (transactionAmount < 0) {
    res.status(400);
    throw new Error("Negative values are not allowed.");
  }

  if (account) {
    let updatedAccountBalance;

    if (transactionType === "Expense") {
      if (transactionAmount < account.accountBalance) {
        updatedAccountBalance = account.accountBalance - transactionAmount;
        await Account.update(
          { accountBalance: updatedAccountBalance },
          { where: { accountId: accountId } }
        );
      } else {
        res.status(400);
        throw new Error(
          "Transaction amount cannot be greater than account balance."
        );
      }
    } else if (transactionType === "Income") {
      updatedAccountBalance = account.accountBalance + transactionAmount;
      await Account.update(
        { accountBalance: updatedAccountBalance },
        { where: { accountId: accountId } }
      );
    }

    const newTransaction = await Transaction.create({
      transactionAmount: transactionAmount,
      transactionType: transactionType,
      paymentMethod: paymentMethod,
      description: description,
      userId: userId,
      accountId: account.accountId,
    });

    if (newTransaction) {
      res.status(201).json({
        message: `Transaction of amount: ${transactionAmount} has been created successfully.`,
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

const deleteUserTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  const account = await Account.findByPk(transaction.accountId);

  if (transaction && account) {
    account.accountBalance =
      account.accountBalance + transaction.transactionAmount;

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
  deleteUserTransaction,
};
