const asyncHandler = require("express-async-handler");

const calculateBudget = asyncHandler(async (budget) => {
  if (
    expenseType === "Needs" ||
    expenseType === "Wants" ||
    expenseType === "Savings"
  ) {
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    if (budget.status === "Active") {
      budget.amountSpent = budget.amountSpent + expenseAmount;
      budget.amountRemaining = budget.amountRemaining - expenseAmount;
      budget.percentUsed = (budget.amountSpent / budget.budgetAmount) * 100;
    } else {
      throw new Error(
        "The Budget Is Either Completed Or Exceeded. Select Or Create Another Budget."
      );
    }

    if (budget.endDate < `${year}-${month}-${day}`) {
      budget.status = "Completed";
    }

    if (
      budget.amountSpent > budget.budgetAmount &&
      budget.endDate > `${year}-${month}-${day}`
    ) {
      budget.status = "Exceeded";
    }
  } else {
    throw new Error("Invalid Expense Type.");
  }
});

module.exports = calculateBudget;
