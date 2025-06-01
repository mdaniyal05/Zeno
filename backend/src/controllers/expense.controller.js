const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense.model");

const getUserExpense = asyncHandler(async (req, res) => {});

const getAllUserExpenses = asyncHandler(async (req, res) => {});

const createUserExpense = asyncHandler(async (req, res) => {});

const updateUserExpense = asyncHandler(async (req, res) => {});

const deleteUserExpense = asyncHandler(async (req, res) => {});

module.exports = {
  getUserExpense,
  getAllUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
};
