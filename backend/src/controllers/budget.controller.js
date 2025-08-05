const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

const getUserBudget = asyncHandler(async (req, res) => {
  const budgetId = req.params.id;
  const budget = await Budget.findByPk(budgetId);

  if (budget) {
    res.status(200).json({
      budgetId: budget.budgetId,
      startDate: budget.startDate,
      endDate: budget.endDate,
      budgetAmount: budget.budgetAmount,
      amountSpent: budget.amountSpent,
      amountRemaining: budget.amountRemaining,
      description: budget.description,
      status: budget.status,
    });
  } else {
    res.status(404);
    throw new Error("Budget not found.");
  }
});

const getAllUserBudgets = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const budgets = await Budget.findAll({ where: { userId: userId } });

  if (budgets) {
    res.status(200).json({
      budgetsData: budgets,
    });
  } else {
    res.status(404);
    throw new Error("No budgets available.");
  }
});

const createUserBudget = asyncHandler(async (req, res) => {
  const { startDate, endDate, budgetAmount, description } = req.body;

  const userId = req.user.userId;

  if (budgetAmount < 0) {
    res.status(400);
    throw new Error("Negative values are not allowed.");
  }

  const newBudget = await Budget.create({
    startDate: startDate,
    endDate: endDate,
    budgetAmount: budgetAmount,
    amountSpent: 0,
    amountRemaining: budgetAmount,
    description: description,
    userId: userId,
  });

  if (newBudget) {
    res.status(201).json({
      startDate: newBudget.startDate,
      endDate: newBudget.endDate,
      budgetAmount: newBudget.budgetAmount,
      status: newBudget.status,
      message: "Budget created successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid budget data.");
  }
});

const deleteUserBudget = asyncHandler(async (req, res) => {
  const budgetId = req.params.id;
  const budget = await Budget.findByPk(budgetId);

  if (budget) {
    await Budget.destroy({ where: { budgetId: budgetId } });
    res.status(200).json({
      message: `Budget deleted successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Budget not found.");
  }
});

module.exports = {
  getUserBudget,
  getAllUserBudgets,
  createUserBudget,
  deleteUserBudget,
};
