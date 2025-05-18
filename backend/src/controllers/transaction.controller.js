const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model");

const getTransaction = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Transaction",
  });
});

const getAllTransactions = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "All Transactions",
  });
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
