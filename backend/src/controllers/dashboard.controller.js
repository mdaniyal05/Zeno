const { Sequelize } = require("sequelize");
const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");
const Expense = require("../models/expense.model");

const getUserDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const monthlyIncome = await Income.findAll({
    attributes: [
      [Sequelize.fn("FORMAT", Sequelize.col("incomeDate"), "yyyy-MM"), "month"],
      [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "totalIncome"],
    ],
    where: { userId },
    group: [Sequelize.fn("FORMAT", Sequelize.col("incomeDate"), "yyyy-MM")],
    order: [[Sequelize.literal("month"), "ASC"]],
    raw: true,
  });

  const monthlyExpense = await Expense.findAll({
    attributes: [
      [
        Sequelize.fn("FORMAT", Sequelize.col("expenseDate"), "yyyy-MM"),
        "month",
      ],
      [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "totalExpense"],
    ],
    where: { userId },
    group: [Sequelize.fn("FORMAT", Sequelize.col("expenseDate"), "yyyy-MM")],
    order: [[Sequelize.literal("month"), "ASC"]],
    raw: true,
  });

  if (!monthlyIncome || !monthlyExpense) {
    res.status(400);
    throw new Error("Unable to get dashboard data. Something went wrong");
  }

  res.status(200).json({
    monthlyIncomeData: monthlyIncome,
    monthlyExpenseData: monthlyExpense,
  });
});

module.exports = getUserDashboardData;
