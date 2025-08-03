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
    throw new Error("Budget Not Found.");
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
    throw new Error("No Budgets Available.");
  }
});

const createUserBudget = asyncHandler(async (req, res) => {
  const { budgetAmount, budgetPeriod, description, startDate, endDate } =
    req.body;

  const userId = req.user.userId;
  const notificationsEnabled = true;
  const status = "Active";

  if (budgetAmount < 0 && budgetAmount < 10000) {
    res.status(400);
    throw new Error(
      "No negative values allowed and budget amount must be greater than 10000."
    );
  }

  const newBudget = await Budget.create({
    budgetAmount: budgetAmount,
    budgetPeriod: budgetPeriod,
    description: description,
    startDate: startDate,
    endDate: endDate,
    amountSpent: 0,
    amountRemaining: budgetAmount,
    percentUsed: 0,
    status: status,
    notificationsEnabled: notificationsEnabled,
    userId: userId,
  });

  if (newBudget) {
    res.status(201).json({
      budgetAmount: newBudget.budgetAmount,
      budgetPeriod: newBudget.budgetPeriod,
      startDate: newBudget.startDate,
      endDate: newBudget.endDate,
      status: newBudget.status,
      notificationsEnabled: newBudget.notificationsEnabled,
      message: "Budget Created Successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Budget Data.");
  }
});

const deleteUserBudget = asyncHandler(async (req, res) => {
  const budgetId = req.params.id;
  const budget = await Budget.findByPk(budgetId);

  if (budget) {
    await Budget.destroy({ where: { budgetId: budgetId } });
    res.status(200).json({
      message: `Budget Of Amount: ${budget.budgetAmount} Deleted Successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Budget Not Found.");
  }
});

module.exports = {
  getUserBudget,
  getAllUserBudgets,
  createUserBudget,
  deleteUserBudget,
};
