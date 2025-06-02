const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense.model");

const getUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (expense) {
    res.status(200).json({
      expenseId: expense.expenseId,
      expenseAmount: expense.expenseAmount,
      currency: expense.currency,
      expenseDate: expense.expenseDate,
      merchant: expense.merchant,
    });
  } else {
    res.status(404);
    throw new Error("Expense Not Found.");
  }
});

const getAllUserExpenses = asyncHandler(async (req, res) => {});

const createUserExpense = asyncHandler(async (req, res) => {});

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
