const sequelize = require("../db/db");
const { Sequelize, Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");
const Expense = require("../models/expense.model");
const Transaction = require("../models/transaction.model");
const Budget = require("../models/budget.model");

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

const monthlyIncomeExpenseSaving = (
  monthlyIncomeData,
  monthlyExpenseData,
  monthlySavingData
) => {
  return months.map((month) => {
    const income = monthlyIncomeData.find((i) => i.month === month.month) || {};
    const expense =
      monthlyExpenseData.find((e) => e.month === month.month) || {};
    const saving = monthlySavingData.find((s) => s.month === month.month) || {};

    return {
      month: month.month,
      totalIncome: Number(income.totalIncome) || 0,
      totalExpense: Number(expense.totalExpense) || 0,
      totalSaving: Number(saving.totalSaving) || 0,
    };
  });
};

const dailyIncomeExpenseSaving = (
  dailyIncome,
  dailyExpense,
  dailySaving,
  year,
  month
) => {
  const daysInMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, "0");
    const income = dailyIncome.find((d) => d.day === day) || {};
    const expense = dailyExpense.find((d) => d.day === day) || {};
    const saving = dailySaving.find((d) => d.day === day) || {};

    const monthName = new Date(year, month - 1).toLocaleString("en-US", {
      month: "short",
    });
    const label = `${monthName} ${i + 1}`;

    return {
      day: label,
      totalIncome: Number(income.totalIncome) || 0,
      totalExpense: Number(expense.totalExpense) || 0,
      totalSaving: Number(saving.totalSaving) || 0,
    };
  });
};

const totalIncomeExpenseSaving = (
  totalIncomeData,
  totalExpenseData,
  totalSavingData
) => {
  if (
    totalIncomeData.length &&
    totalExpenseData.length &&
    totalSavingData.length
  ) {
    const allTotal =
      Number(totalIncomeData[0].allIncome || 0) +
      Number(totalExpenseData[0].allExpense || 0) +
      Number(totalSavingData[0].allSaving || 0);

    const colors = [
      "hsl(220, 25%, 65%)",
      "hsl(220, 25%, 45%)",
      "hsl(220, 25%, 30%)",
    ];

    return [
      ...totalIncomeData.map((obj, idx) => ({
        id: idx,
        value: Number(obj.allIncome) || 0,
        label: "Total income",
        color: colors[idx],
        percentage: allTotal
          ? ((obj.allIncome / allTotal) * 100).toFixed(2)
          : 0,
      })),
      ...totalExpenseData.map((obj, idx) => ({
        id: totalIncomeData.length + idx,
        value: Number(obj.allExpense) || 0,
        label: "Total expense",
        color: colors[totalIncomeData.length + idx],
        percentage: allTotal
          ? ((obj.allExpense / allTotal) * 100).toFixed(2)
          : 0,
      })),
      ...totalSavingData.map((obj, idx) => ({
        id: totalIncomeData.length + totalExpenseData.length + idx,
        value: Number(obj.allSaving) || 0,
        label: "Total saving",
        color: colors[totalIncomeData.length + totalExpenseData.length + idx],
        percentage: allTotal
          ? ((obj.allSaving / allTotal) * 100).toFixed(2)
          : 0,
      })),
    ];
  }
  return [];
};

const activeBudget = (currentBudget) => {
  if (currentBudget) {
    const keysToExtract = ["budgetAmount", "amountSpent", "amountRemaining"];
    const colors = [
      "hsl(220, 25%, 65%)",
      "hsl(220, 25%, 45%)",
      "hsl(220, 25%, 30%)",
    ];

    const labelMap = {
      budgetAmount: "Budget amount",
      amountRemaining: "Amount remaining",
      amountSpent: "Amount spent",
    };

    return keysToExtract.map((key, idx) => ({
      index: idx,
      value: Number(currentBudget[key]) || 0,
      label: labelMap[key],
      percentage:
        currentBudget.budgetAmount > 0
          ? ((currentBudget[key] / currentBudget.budgetAmount) * 100).toFixed(2)
          : 0,
      color: colors[idx],
    }));
  }
  return [];
};

const monthlyIncomeCalculation = (monthlyIncome) =>
  months.map((month) => {
    const income = monthlyIncome.find((i) => i.month === month.month) || {};
    return { month: month.month, totalIncome: Number(income.totalIncome) || 0 };
  });

const monthlyExpenseCalculation = (monthlyExpense) =>
  months.map((month) => {
    const expense = monthlyExpense.find((e) => e.month === month.month) || {};
    return {
      month: month.month,
      totalExpense: Number(expense.totalExpense) || 0,
    };
  });

const monthlySavingCalculation = (monthlySaving) =>
  months.map((month) => {
    const saving = monthlySaving.find((s) => s.month === month.month) || {};
    return { month: month.month, totalSaving: Number(saving.totalSaving) || 0 };
  });

const getUserDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const now = new Date();
  const currentYear = now.getFullYear();
  const lastMonth = now.getMonth();
  const lastMonthNum = lastMonth === 0 ? 12 : lastMonth;

  const t = await sequelize.transaction();

  try {
    const monthlyIncome = await Income.findAll({
      attributes: [
        [Sequelize.fn("TO_CHAR", Sequelize.col("incomeDate"), "Mon"), "month"],
        [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "totalIncome"],
      ],
      where: {
        userId,
        [Op.and]: Sequelize.where(
          Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "incomeDate"')),
          currentYear
        ),
      },
      group: [Sequelize.fn("TO_CHAR", Sequelize.col("incomeDate"), "Mon")],
      raw: true,
      transaction: t,
    });

    const monthlyExpense = await Expense.findAll({
      attributes: [
        [Sequelize.fn("TO_CHAR", Sequelize.col("expenseDate"), "Mon"), "month"],
        [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "totalExpense"],
      ],
      where: {
        userId,
        [Op.and]: Sequelize.where(
          Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "expenseDate"')),
          currentYear
        ),
      },
      group: [Sequelize.fn("TO_CHAR", Sequelize.col("expenseDate"), "Mon")],
      raw: true,
      transaction: t,
    });

    const monthlySaving = await Transaction.findAll({
      attributes: [
        [
          Sequelize.fn("TO_CHAR", Sequelize.col("transactionDate"), "Mon"),
          "month",
        ],
        [
          Sequelize.fn("SUM", Sequelize.col("transactionAmount")),
          "totalSaving",
        ],
      ],
      where: {
        userId,
        transactionType: "Saving",
        [Op.and]: Sequelize.where(
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('YEAR FROM "transactionDate"')
          ),
          currentYear
        ),
      },
      group: [Sequelize.fn("TO_CHAR", Sequelize.col("transactionDate"), "Mon")],
      raw: true,
      transaction: t,
    });

    const totalIncome = await Income.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "allIncome"],
      ],
      where: {
        userId,
        [Op.and]: Sequelize.where(
          Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "incomeDate"')),
          currentYear
        ),
      },
      raw: true,
      transaction: t,
    });

    const totalExpense = await Expense.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "allExpense"],
      ],
      where: {
        userId,
        [Op.and]: Sequelize.where(
          Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "expenseDate"')),
          currentYear
        ),
      },
      raw: true,
      transaction: t,
    });

    const totalSaving = await Transaction.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("transactionAmount")), "allSaving"],
      ],
      where: {
        userId,
        transactionType: "Saving",
        [Op.and]: Sequelize.where(
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('YEAR FROM "transactionDate"')
          ),
          currentYear
        ),
      },
      raw: true,
      transaction: t,
    });

    const dailyIncomeLastMonth = await Income.findAll({
      attributes: [
        [Sequelize.fn("TO_CHAR", Sequelize.col("incomeDate"), "DD"), "day"],
        [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "totalIncome"],
      ],
      where: {
        userId,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('YEAR FROM "incomeDate"')
            ),
            currentYear
          ),
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('MONTH FROM "incomeDate"')
            ),
            lastMonthNum
          ),
        ],
      },
      group: [Sequelize.fn("TO_CHAR", Sequelize.col("incomeDate"), "DD")],
      raw: true,
      transaction: t,
    });

    const dailyExpenseLastMonth = await Expense.findAll({
      attributes: [
        [Sequelize.fn("TO_CHAR", Sequelize.col("expenseDate"), "DD"), "day"],
        [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "totalExpense"],
      ],
      where: {
        userId,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('YEAR FROM "expenseDate"')
            ),
            currentYear
          ),
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('MONTH FROM "expenseDate"')
            ),
            lastMonthNum
          ),
        ],
      },
      group: [Sequelize.fn("TO_CHAR", Sequelize.col("expenseDate"), "DD")],
      raw: true,
      transaction: t,
    });

    const dailySavingLastMonth = await Transaction.findAll({
      attributes: [
        [
          Sequelize.fn("TO_CHAR", Sequelize.col("transactionDate"), "DD"),
          "day",
        ],
        [
          Sequelize.fn("SUM", Sequelize.col("transactionAmount")),
          "totalSaving",
        ],
      ],
      where: {
        userId,
        transactionType: "Saving",
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('YEAR FROM "transactionDate"')
            ),
            currentYear
          ),
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('MONTH FROM "transactionDate"')
            ),
            lastMonthNum
          ),
        ],
      },
      group: [Sequelize.fn("TO_CHAR", Sequelize.col("transactionDate"), "DD")],
      raw: true,
      transaction: t,
    });

    const currentBudget = await Budget.findOne({
      where: { status: "Active", userId },
      transaction: t,
    });

    const allIncome = Number(totalIncome[0]?.allIncome || 0);
    const allExpense = Number(totalExpense[0]?.allExpense || 0);
    const allSaving = Number(totalSaving[0]?.allSaving || 0);

    const netBalance = allIncome - allExpense;

    let savingsRate = 0;

    if (allSaving > 0) {
      savingsRate =
        allIncome > 0 ? ((allSaving / allIncome) * 100).toFixed(2) : 0;
    }

    let budgetUtilization = 0;

    if (currentBudget && currentBudget.budgetAmount > 0) {
      budgetUtilization = (
        (currentBudget.amountSpent / currentBudget.budgetAmount) *
        100
      ).toFixed(2);
    }

    const insights = [];

    if (netBalance < 0) {
      insights.push(
        "⚠️ You are spending more than you earn. Consider cutting expenses!"
      );
    } else if (netBalance > 0) {
      insights.push("✅ You are earning more than your spendings. Great job!");
    }

    if (budgetUtilization < 70 && budgetUtilization !== 0) {
      insights.push("✅ Your budget utilization is less than 70%. Keep it up!");
    } else if (budgetUtilization >= 70 && budgetUtilization <= 90) {
      insights.push(
        "⚠️ Your budget utilization is more than 70%. Keep your expenses in check!"
      );
    } else if (budgetUtilization > 90) {
      insights.push(
        "🚨 Your budget utilization has reached over 90%. Slow down and think before spending!"
      );
    }

    if (savingsRate < 20 && savingsRate !== 0) {
      insights.push("💡 Try to increase your savings rate to at least 20%.");
    } else if (savingsRate > 20) {
      insights.push("✅ Your savings rate is greater than 20%. Great job!");
    }

    const monthlyIncomeDataset = monthlyIncomeCalculation(monthlyIncome);
    const monthlyExpenseDataset = monthlyExpenseCalculation(monthlyExpense);
    const monthlySavingDataset = monthlySavingCalculation(monthlySaving);

    const IncomeExpenseSavingDataset = monthlyIncomeExpenseSaving(
      monthlyIncome,
      monthlyExpense,
      monthlySaving
    );

    const dailyIncomeExpenseSavingDataset = dailyIncomeExpenseSaving(
      dailyIncomeLastMonth,
      dailyExpenseLastMonth,
      dailySavingLastMonth,
      currentYear,
      lastMonthNum
    );

    const totalIncomeExpenseSavingDataset = totalIncomeExpenseSaving(
      totalIncome,
      totalExpense,
      totalSaving
    );

    const activeBudgetDataset = activeBudget(currentBudget);

    await t.commit();

    res.status(200).json({
      IncomeExpenseSavingDataset,
      totalIncomeExpenseSavingDataset,
      dailyIncomeExpenseSavingDataset,
      activeBudgetDataset,
      monthlyIncomeDataset,
      monthlyExpenseDataset,
      monthlySavingDataset,
      monthlyIncome,
      monthlyExpense,
      monthlySaving,
      totalIncome,
      totalExpense,
      totalSaving,
      dailyIncomeLastMonth,
      dailyExpenseLastMonth,
      dailySavingLastMonth,
      netBalance,
      savingsRate,
      budgetUtilization,
      insights,
    });
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(
      error.message || "Unable to calculate dashboard data. Server error."
    );
  }
});

module.exports = getUserDashboardData;
