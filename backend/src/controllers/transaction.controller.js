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

  let transactionAmounts = [];

  transactions.map((transaction) => {
    transactionAmounts.push(transaction.dataValues.transactionAmount);
  });

  if (transactions) {
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
    accountNumber,
    categoryName,
  } = req.body;

  const userId = req.user.userId;
  const account = await Account.findOne({
    where: { accountNumber: accountNumber },
  });
  const category = await Category.findOne({
    where: { categoryName: categoryName },
  });

  if (account && category) {
    if (transactionAmount < account.accountBalance) {
      const updatedAccountBalance = account.accountBalance - transactionAmount;

      await Account.update({ accountBalance: updatedAccountBalance });

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
      res.status(400);
      throw new Error(
        "Transaction Amount Cannot Be Greater Than Account Balance."
      );
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
