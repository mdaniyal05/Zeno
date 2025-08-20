const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense.model");
const Category = require("../models/category.model");
const Budget = require("../models/budget.model");
const notifyEmail = require("../utils/notifyEmail");

const getUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (expense) {
    res.status(200).json({
      expenseId: expense.expenseId,
      expenseAmount: expense.expenseAmount,
      expenseType: expense.expenseType,
      expenseDate: expense.expenseDate,
      merchant: expense.merchant,
      categoryId: expense.categoryId,
    });
  } else {
    res.status(404);
    throw new Error("Expense not found.");
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
    throw new Error("No expenses available.");
  }
});

const createUserExpense = asyncHandler(async (req, res) => {
  const { expenseAmount, expenseType, expenseDate, merchant, categoryId } =
    req.body;

  if (
    !expenseAmount ||
    !expenseType ||
    !expenseDate ||
    !merchant ||
    !categoryId
  ) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (expenseAmount <= 0) {
    res.status(400);
    throw new Error("Negative values and zero are not allowed.");
  }

  const userId = req.user.userId;

  const category = await Category.findByPk(categoryId);

  if (category && category.isActive === true) {
    if (category.categoryType !== expenseType) {
      res.status(400);
      throw new Error("The category type and expense type should be same.");
    }

    category.limitRemainingAmount =
      category.limitRemainingAmount - expenseAmount;

    if (category.limitRemainingAmount <= 0) {
      category.islimitExceeded = true;
      category.isActive === false;

      const message = `Your category: ${category.categoryName} of type: ${category.categoryType} limit is being exceeded. This category is not active anymore. Keep your expenses in check and don't waste too much. Be in your limits.`;

      notifyEmail(
        req.user.email,
        message,
        `Category: ${category.categoryName} limit exceeded.`
      );
    }

    await category.save();

    const budget = await Budget.findOne({
      where: { status: "Active", userId: userId },
    });

    if (budget) {
      budget.amountSpent = budget.amountSpent + expenseAmount;

      budget.amountRemaining = budget.amountRemaining - expenseAmount;

      if (
        budget.amountSpent >= budget.budgetAmount &&
        budget.amountRemaining <= 0
      ) {
        budget.status = "Exceeded";

        const message = `Your current active budget of amount: ${budget.budgetAmount} is being exceeded due to the following expense. This budget is being marked as exceeded. You have to consider your spending habits. They are awful. Best of luck for your next budget.`;

        notifyEmail(
          req.user.email,
          message,
          `Current active budget of amount: ${budget.budgetAmount} exceeded.`
        );
      }

      await budget.save();
    } else {
      res.status(404);
      throw new Error("No active budget found.");
    }

    const newExpense = await Expense.create({
      expenseAmount: expenseAmount,
      expenseType: expenseType,
      expenseDate: expenseDate,
      merchant: merchant,
      userId: userId,
      categoryId: category.categoryId,
    });

    if (newExpense) {
      res.status(201).json({
        message: "Expense created successfully.",
      });
    } else {
      res.status(400);
      throw new Error("Invalid expense data.");
    }
  } else {
    res.status(400);
    throw new Error(
      "The category is not active anymore due to exceeded factor. Select another category or create a new one."
    );
  }
});

const updateUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (expense) {
    const category = await Category.findByPk(expense.categoryId);

    if (req.body.expenseAmount <= 0) {
      res.status(400);
      throw new Error("Negative values and zero are not allowed.");
    }

    if (req.body.categoryId !== category.categoryId) {
      if (category.categoryType !== req.body.expenseType) {
        res.status(400);
        throw new Error("The category type and expense type should be same.");
      }

      const newCategory = await Category.findByPk(req.body.categoryId);

      category.limitRemainingAmount =
        category.limitRemainingAmount + expense.expenseAmount;

      newCategory.limitRemainingAmount =
        newCategory.limitRemainingAmount - req.body.expenseAmount;

      if (newCategory.limitRemainingAmount <= 0) {
        newCategory.islimitExceeded = true;
        newCategory.isActive === false;

        const message = `Your category: ${newCategory.categoryName} of type: ${newCategory.categoryType} limit is being exceeded. This category is not active anymore. Keep your expenses in check and don't waste too much. Be in your limits.`;

        notifyEmail(
          req.user.email,
          message,
          `Category: ${newCategory.categoryName} limit exceeded.`
        );

        await newCategory.save();
      } else {
        await category.save();
        await newCategory.save();
      }
    }

    if (req.body.expenseAmount !== expense.expenseAmount) {
      category.limitRemainingAmount =
        category.limitRemainingAmount + expense.expenseAmount;

      category.limitRemainingAmount =
        category.limitRemainingAmount - req.body.expenseAmount;

      const budget = await Budget.findOne({
        where: { status: "Active", userId: req.user.userId },
      });

      if (budget) {
        budget.amountSpent = budget.amountSpent - expense.expenseAmount;
        budget.amountSpent = budget.amountSpent + req.body.expenseAmount;

        budget.amountRemaining = budget.amountRemaining + expense.expenseAmount;
        budget.amountRemaining =
          budget.amountRemaining - req.body.expenseAmount;

        if (
          budget.amountSpent > budget.budgetAmount &&
          budget.amountRemaining <= 0
        ) {
          budget.status = "Exceeded";

          const message = `Your current active budget of amount: ${budget.budgetAmount} is being exceeded due to the following expense. This budget is being marked as exceeded. You have to consider your spending habits. They are awful. Best of luck for your next budget.`;

          notifyEmail(
            req.user.email,
            message,
            `Current active budget of amount: ${budget.budgetAmount} exceeded.`
          );
        }

        await category.save();
        await budget.save();
      }
    }

    expense.expenseAmount = req.body.expenseAmount || expense.expenseAmount;
    expense.expenseType = req.body.expenseType || expense.expenseType;
    expense.expenseDate = req.body.expenseDate || expense.expenseDate;
    expense.merchant = req.body.merchant || expense.merchant;
    expense.categoryId = req.body.categoryId || expense.categoryId;

    const updatedExpense = await expense.save();

    res.status(201).json({
      expenseAmount: updatedExpense.expenseAmount,
      expenseType: updatedExpense.expenseType,
      expenseDate: updatedExpense.expenseDate,
      merchant: updatedExpense.merchant,
      categoryId: updatedExpense.categoryId,
      message: "Expense updated successfully.",
    });
  } else {
    res.status(404);
    throw new Error("Expense not found.");
  }
});

const deleteUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  const category = await Category.findByPk(expense.categoryId);

  if (expense && category) {
    const budget = await Budget.findOne({
      where: { status: "Active", userId: req.user.userId },
    });

    if (budget) {
      budget.amountSpent = budget.amountSpent - expenseAmount;

      budget.amountRemaining = budget.amountRemaining + expenseAmount;
    }

    if (category.isActive === true) {
      category.limitRemainingAmount =
        category.limitRemainingAmount + expense.expenseAmount;

      await category.save();
    }

    await Expense.destroy({ where: { expenseId: expenseId } });
    res.status(200).json({
      message: `Expense deleted successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Expense not found.");
  }
});

module.exports = {
  getUserExpense,
  getAllUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
};
