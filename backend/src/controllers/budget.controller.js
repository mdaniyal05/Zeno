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

  if (!startDate || !endDate || !budgetAmount || !description) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (budgetAmount <= 0) {
    res.status(400);
    throw new Error("Negative values and zero are not allowed.");
  }

  const userId = req.user.userId;

  const budget = await Budget.findOne({
    where: { status: "Active", userId: userId },
  });

  if (budget) {
    res.status(400);
    throw new Error("You can only have one active budget at a time.");
  }

  const newBudget = await Budget.create({
    startDate: startDate,
    endDate: endDate,
    budgetAmount: budgetAmount,
    amountRemaining: budgetAmount,
    description: description,
    userId: userId,
  });

  if (newBudget) {
    res.status(201).json({
      message: "Budget created successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid budget data.");
  }
});

const updateUserBudget = asyncHandler(async (req, res) => {
  const budgetId = req.params.id;
  const budget = await Budget.findByPk(budgetId);

  if (budget) {
    if (req.body.budgetAmount <= 0) {
      res.status(400);
      throw new Error("Negative values and zero are not allowed.");
    }

    if (req.body.budgetAmount !== budget.budgetAmount) {
      budget.amountRemaining = req.body.budgetAmount - budget.amountSpent;
    }

    budget.startDate = req.body.startDate || budget.startDate;
    budget.endDate = req.body.endDate || budget.endDate;
    budget.budgetAmount = req.body.budgetAmount || budget.budgetAmount;
    budget.description = req.body.description || budget.description;

    const updatedBudget = await budget.save();

    res.status(200).json({
      startDate: updatedBudget.startDate,
      endDate: updatedBudget.endDate,
      budgetAmount: updatedBudget.budgetAmount,
      description: updatedBudget.description,
      message: "Budget updated successfully.",
    });
  } else {
    res.status(404);
    throw new Error("Budget not found.");
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
  updateUserBudget,
  deleteUserBudget,
};
