const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense.model");

const getUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (expense) {
    res.status(200).json({
      expenseId: expense.expenseId,
      expenseAmount: expense.expenseAmount,
      expenseType: expense.expenseType,
      currency: expense.currency,
      expenseDate: expense.expenseDate,
      merchant: expense.merchant,
    });
  } else {
    res.status(404);
    throw new Error("Expense Not Found.");
  }
});

const getAllUserExpenses = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const expenses = await Expense.findAll({ where: { userId: userId } });

  if (expenses) {
    res.status(200).json({
      expensesData: expenses,
    });
  } else {
    res.status(404);
    throw new Error("No Expenses Available.");
  }
});

const createUserExpense = asyncHandler(async (req, res) => {
  const { expenseAmount, expenseType, currency, expenseDate, merchant } =
    req.body;

  const userId = req.user.userId;

  const newExpense = await Expense.create({
    expenseAmount: expenseAmount,
    expenseType: expenseType,
    currency: currency,
    expenseDate: expenseDate,
    merchant: merchant,
    userId: userId,
  });

  if (newExpense) {
    res.status(201).json({
      expenseAmount: newExpense.expenseAmount,
      expenseType: newExpense.expenseType,
      currency: newExpense.currency,
      expenseDate: newExpense.expenseDate,
      merchant: newExpense.merchant,
      message: "Expense Created Successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Expense Data.");
  }
});

const deleteUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (expense) {
    await Expense.destroy({ where: { expenseId: expenseId } });
    res.status(200).json({
      message: `Expense Of Amount: ${expense.expenseAmount} Deleted Successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Expense Not Found.");
  }
});

module.exports = {
  getUserExpense,
  getAllUserExpenses,
  createUserExpense,
  deleteUserExpense,
};
