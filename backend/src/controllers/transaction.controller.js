const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model");
const Account = require("../models/account.model");
const Category = require("../models/category.model");

const getTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  if (transaction) {
    res.status(200).json({
      transactionAmount: transaction.transactionAmount,
      transactionType: transaction.transactionType,
      paymentMethod: transaction.paymentMethod,
      description: transaction,
    });
  } else {
    res.status(404);
    throw new Error("Transaction Not Found.");
  }
});

const getAllTransactions = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const transactions = await Transaction.findAll({ where: { userId: userId } });

  if (transactions) {
    let transactionAmounts = [];

    transactions.map((transaction) => {
      transactionAmounts.push(transaction.dataValues.transactionAmount);
    });

    res.status(200).json({
      transactionAmount: transactionAmounts,
    });
  } else {
    res.status(404);
    throw new Error("No Transactions Available.");
  }
});

const createTransaction = asyncHandler(async (req, res) => {
  const {
    transactionAmount,
    transactionType,
    paymentMethod,
    description,
    accountId,
    categoryId,
  } = req.body;

  const userId = req.user.userId;
  const account = await Account.findOne({
    where: { accountId: accountId },
  });
  const category = await Category.findOne({
    where: { categoryId: categoryId },
  });

  if (account && category) {
    let updatedAccountBalance;

    if (category.categoryType === "Expense") {
      if (transactionAmount < account.accountBalance) {
        updatedAccountBalance = account.accountBalance - transactionAmount;
        await Account.update({ accountBalance: updatedAccountBalance });
      } else {
        res.status(400);
        throw new Error(
          "Transaction Amount Cannot Be Greater Than Account Balance."
        );
      }
    } else if (category.categoryType === "Income") {
      updatedAccountBalance = account.accountBalance + transactionAmount;
      await Account.update({ accountBalance: updatedAccountBalance });
    }

    const newTransaction = await Transaction.create({
      transactionAmount: transactionAmount,
      transactionType: transactionType,
      paymentMethod: paymentMethod,
      description: description,
      userId: userId,
      accountId: account.accountId,
      categoryId: category.categoryId,
    });

    if (newTransaction) {
      res.status(201).json({
        message: `Transaction Of Amount: ${transactionAmount} Has Been Done Successfully.`,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Transaction Data.");
    }
  } else {
    res.status(404);
    throw new Error("Account or Category Not Found.");
  }
});

module.exports = {
  getTransaction,
  getAllTransactions,
  createTransaction,
};
