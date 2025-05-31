const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

const getBudget = asyncHandler(async (req, res) => {
  const budgetId = req.params.id;
  const budget = await Budget.findByPk(budgetId);

  if (budget) {
    res.status(200).json({
      budgetAmount: budget.budgetAmount,
      budgetPeriod: budget.budgetPeriod,
      description: budget.description,
      startDate: budget.startDate,
      endDate: budget.endDate,
      amountSpent: budget.amountSpent,
      amountRemaining: budget.amountRemaining,
      percentUsed: budget.percentUsed,
      status: budget.status,
      notificationsEnabled: budget.notificationsEnabled,
    });
  } else {
    res.status(404);
    throw new Error("Budget Not Found.");
  }
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

const deleteBudget = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Budget Deleted",
  });
});

module.exports = {
  getBudget,
  getAllBudgets,
  createBudget,
  deleteBudget,
};
