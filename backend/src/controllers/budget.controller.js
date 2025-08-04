const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");
const Income = require("../models/income.model");
const { Op } = require("sequelize");

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
  const { startDate, endDate, description } = req.body;

  const userId = req.user.userId;

  const allIncomes = await Income.findAll({
    where: {
      incomeDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: ["incomeAmount"],
  });

  let netIncome;

  allIncomes.map((income) => {
    netIncome = netIncome + income.incomeAmount;
  });

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
      budgetAmount: newBudget.budgetAmount,
      budgetPeriod: newBudget.budgetPeriod,
      startDate: newBudget.startDate,
      endDate: newBudget.endDate,
      status: newBudget.status,
      notificationsEnabled: newBudget.notificationsEnabled,
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
      message: `Budget of amount: ${budget.budgetAmount} deleted successfully.`,
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
