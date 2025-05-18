const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

const getBudget = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Budget",
  });
});

const getAllBudgets = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "All Budgets",
  });
});

const createBudget = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Budget Created",
  });
});

const updateBudget = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Budget Updated",
  });
});

const deleteBudget = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Budget Deleted",
  });
});

module.exports = {
  getBudget,
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
};
