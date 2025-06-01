const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");
const Category = require("../models/category.model");

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
  const userId = req.params.id;
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

const createBudget = asyncHandler(async (req, res) => {
  const {
    budgetAmount,
    budgetPeriod,
    description,
    startDate,
    endDate,
    categoryName,
  } = req.body;

  const category = await Category.findOne({
    where: { categoryName: categoryName },
  });
  const userId = req.user.userId;
  const notificationsEnabled = true;
  const status = "Active";

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
    categoryId: category.categoryId,
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

const deleteBudget = asyncHandler(async (req, res) => {
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
  getBudget,
  getAllBudgets,
  createBudget,
  deleteBudget,
};
