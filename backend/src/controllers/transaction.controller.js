const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model");

const getTransaction = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findByPk(transactionId);

  if (transaction) {
    res.status(200).json({
      transactionAmount: transaction.transactionAmount,
      transactionType: transaction.transactionType,
      paymentMethod: transaction.paymentMethod,
      description: transaction,
      description,
      notes: transaction.notes,
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

  transactions.map((transactions) => {
    transactionAmounts.push(transactions.dataValues.transactionAmount);
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
  res.status(201).json({
    message: "Transaction Created",
  });
});

module.exports = {
  getTransaction,
  getAllTransactions,
  createTransaction,
};
