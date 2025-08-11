const { Sequelize } = require("sequelize");
const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");
const Expense = require("../models/expense.model");
const Transaction = require("../models/transaction.model");

const months = [
  { month: "Jan" },
  { month: "Feb" },
  { month: "Mar" },
  { month: "Apr" },
  { month: "May" },
  { month: "Jun" },
  { month: "Jul" },
  { month: "Aug" },
  { month: "Sep" },
  { month: "Oct" },
  { month: "Nov" },
  { month: "Dec" },
];

const incomeVsExpenseVsSavingBarChartDataset = (
  monthlyIncomeData,
  monthlyExpenseData,
  monthlySavingData
) => {
  const combined = months.map((month) => {
    const income =
      monthlyIncomeData.find((income) => income.month === month.month) || {};
    const expense =
      monthlyExpenseData.find((expense) => expense.month === month.month) || {};
    const saving =
      monthlySavingData.find((saving) => saving.month === month.month) || {};

    return {
      month: month.month,
      totalIncome: income.totalIncome || 0,
      totalExpense: expense.totalExpense || 0,
      totalSaving: saving.totalSaving || 0,
    };
  });

  return combined;
};

const totalIncomeExpenseSavingPieChartDataset = (
  totalIncomeData,
  totalExpenseData,
  totalSavingData
) => {
  const combined = [
    ...totalIncomeData.map((obj, idx) => ({
      id: idx + 1,
      value: obj.allIncome,
      label: "Total income",
    })),
    ...totalExpenseData.map((obj, idx) => ({
      id: totalIncomeData.length + idx + 1,
      value: obj.allExpense,
      label: "Total expense",
    })),
    ...totalSavingData.map((obj, idx) => ({
      id: totalIncomeData.length + totalExpenseData.length + idx + 1,
      value: obj.allSaving,
      label: "Total saving",
    })),
  ];

  return combined;
};

const monthlyIncomeCalculation = (monthlyIncome) => {
  const monthlyIncomeDataset = months.map((month) => {
    const income =
      monthlyIncome.find((income) => income.month === month.month) || {};

    return {
      month: month.month,
      totalIncome: income.totalIncome || 0,
    };
  });

  return monthlyIncomeDataset;
};

const getUserDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const monthlyIncome = await Income.findAll({
    attributes: [
      [Sequelize.fn("FORMAT", Sequelize.col("incomeDate"), "MMM"), "month"],
      [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "totalIncome"],
    ],
    where: { userId: userId },
    group: [Sequelize.fn("FORMAT", Sequelize.col("incomeDate"), "MMM")],
    order: [[Sequelize.literal("month"), "ASC"]],
    raw: true,
  });

  const totalIncome = await Income.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "allIncome"],
    ],
    where: { userId: userId },
    raw: true,
  });

  const monthlyExpense = await Expense.findAll({
    attributes: [
      [Sequelize.fn("FORMAT", Sequelize.col("expenseDate"), "MMM"), "month"],
      [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "totalExpense"],
    ],
    where: { userId: userId },
    group: [Sequelize.fn("FORMAT", Sequelize.col("expenseDate"), "MMM")],
    order: [[Sequelize.literal("month"), "ASC"]],
    raw: true,
  });

  const totalExpense = await Expense.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "allExpense"],
    ],
    where: { userId: userId },
    raw: true,
  });

  const monthlySaving = await Transaction.findAll({
    attributes: [
      [
        Sequelize.fn("FORMAT", Sequelize.col("transactionDate"), "MMM"),
        "month",
      ],
      [Sequelize.fn("SUM", Sequelize.col("transactionAmount")), "totalSaving"],
    ],
    where: { userId: userId, transactiontype: "Saving" },
    group: [Sequelize.fn("FORMAT", Sequelize.col("transactionDate"), "MMM")],
    order: [[Sequelize.literal("month"), "ASC"]],
    raw: true,
  });

  const totalSaving = await Transaction.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("transactionAmount")), "allSaving"],
    ],
    where: { userId: userId, transactiontype: "Saving" },
    raw: true,
  });

  const monthlyIncomeDataset = monthlyIncomeCalculation(monthlyIncome);

  const pieChartData = totalIncomeExpenseSavingPieChartDataset(
    totalIncome,
    totalExpense,
    totalSaving
  );

  const barChartData = incomeVsExpenseVsSavingBarChartDataset(
    monthlyIncome,
    monthlyExpense,
    monthlySaving
  );

  res.status(200).json({
    monthlyIncomeData: monthlyIncome,
    monthlyExpenseData: monthlyExpense,
    monthlySavingData: monthlySaving,
    monthlyIncomeDataset: monthlyIncomeDataset,
    pieChartData: pieChartData,
    barChartData: barChartData,
  });
});

module.exports = getUserDashboardData;
