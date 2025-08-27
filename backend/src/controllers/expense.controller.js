const sequelize = require("../db/db");
const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense.model");
const Category = require("../models/category.model");
const Budget = require("../models/budget.model");
const notifyEmail = require("../utils/notifyEmail");

/*

Get single expense controller

*/

const getUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found.");
  }

  res.status(200).json({
    ...expense.toJSON(),
  });
});

/*

Get single expense controller (END)

*/

/*

Get all expense controller

*/

const getAllUserExpenses = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const expenses = await Expense.findAll({ where: { userId: userId } });

  if (!expenses) {
    res.status(404);
    throw new Error("No expenses found.");
  }

  res.status(200).json({
    expensesData: expenses,
  });
});

/*

Get all expense controller (END)

*/

/*

Create expense controller

*/

const validateCreateInputs = (res, expenseAmount, expenseType, category) => {
  if (expenseAmount <= 0) {
    res.status(400);
    throw new Error("Expense amount must be greater than 0.");
  }

  if (category.categoryType !== expenseType) {
    res.status(400);
    throw new Error(
      "Needs and wants type cannot be linked with each other. It must be same for category and expense."
    );
  }

  if (category.isActive === false) {
    res.status(400);
    throw new Error("Exceeded categories cannot be used again.");
  }
};

const createCalculations = async ({
  expenseAmount,
  category,
  budget,
  userEmail,
  t,
}) => {
  if (budget) {
    budget.amountSpent += expenseAmount;
    budget.amountRemaining -= expenseAmount;

    if (
      budget.amountSpent >= budget.budgetAmount &&
      budget.amountRemaining <= 0 &&
      budget.status !== "Completed"
    ) {
      budget.status = "Exceeded";

      const message =
        "Your spending has gone over the allocated budget. You crossed the set limit and spent more than planned, so it may be a good time to review your recent expenses and adjust for better control.";

      notifyEmail(
        userEmail,
        message,
        `Budget of amount: ${budget.budgetAmount} exceeded.`
      );
    }

    await budget.save({ transaction: t });
  }

  category.limitRemainingAmount -= expenseAmount;

  if (category.limitRemainingAmount <= 0) {
    category.islimitExceeded = true;
    category.isActive = false;

    const message =
      "Your spending in this category has gone over the limit. You’ve spent more than the planned limit, so it’s a good idea to review your expenses here and adjust to stay on track.";

    notifyEmail(
      userEmail,
      message,
      `Category: ${category.categoryName} limit exceeded.`
    );
  }

  await category.save({ transaction: t });
};

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

  const userId = req.user.userId;

  const t = await sequelize.transaction();

  try {
    const category = await Category.findByPk(categoryId, { transaction: t });

    const budget = await Budget.findOne({
      where: { status: "Active", userId: userId },
      transaction: t,
    });

    validateCreateInputs(res, expenseAmount, expenseType, category);

    await createCalculations({
      expenseAmount,
      category,
      budget,
      userEmail: req.user.email,
      t,
    });

    const newExpense = await Expense.create({
      expenseAmount,
      expenseType,
      expenseDate,
      merchant,
      userId,
      categoryId,
    });

    if (newExpense) {
      await t.commit();

      res.status(201).json({
        ...newExpense.toJSON(),
        message: "Expense created successfully.",
      });
    }
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Create expense controller (END)

*/

/*

Update expense controller

*/

const validateUpdateInputs = (reqBody, res, newCategory) => {
  if (reqBody.expenseAmount <= 0) {
    res.status(400);
    throw new Error("Expense amount must be greater than 0.");
  }

  if (newCategory.categoryType !== reqBody.expenseType) {
    res.status(400);
    throw new Error(
      "Needs and wants type cannot be linked with each other. It must be same for category and expense."
    );
  }

  if (newCategory.isActive === false) {
    res.status(400);
    throw new Error("Exceeded categories cannot be used again.");
  }
};

const calculateBalances = async ({
  reqBody,
  expense,
  budget,
  oldCategory,
  newCategory,
  userEmail,
  t,
}) => {
  const oldExpenseAmount = expense.expenseAmount;
  const newExpenseAmount = reqBody.expenseAmount;

  if (oldCategory.categoryId !== newCategory.categoryId) {
    oldCategory.limitRemainingAmount += oldExpenseAmount;
    newCategory.limitRemainingAmount -= newExpenseAmount;

    if (newCategory.limitRemainingAmount <= 0) {
      newCategory.islimitExceeded = true;
      newCategory.isActive = false;

      const message =
        "Your spending in this category has gone over the limit. You’ve spent more than the planned limit, so it’s a good idea to review your expenses here and adjust to stay on track.";

      notifyEmail(
        userEmail,
        message,
        `Category: ${newCategory.categoryName} limit exceeded.`
      );
    }

    await newCategory.save({ transaction: t });
  }

  if (oldExpenseAmount !== newExpenseAmount) {
    oldCategory.limitRemainingAmount += oldExpenseAmount;
    oldCategory.limitRemainingAmount -= newExpenseAmount;
  }

  await oldCategory.save({ transaction: t });

  if (budget) {
    budget.amountSpent -= oldExpenseAmount;
    budget.amountSpent += newExpenseAmount;

    budget.amountRemaining += oldExpenseAmount;
    budget.amountRemaining -= newExpenseAmount;

    if (
      budget.amountSpent >= budget.budgetAmount &&
      budget.amountRemaining <= 0 &&
      budget.status !== "Completed"
    ) {
      budget.status = "Exceeded";

      const message =
        "Your spending has gone over the allocated budget. You crossed the set limit and spent more than planned, so it may be a good time to review your recent expenses and adjust for better control.";

      notifyEmail(
        userEmail,
        message,
        `Budget of amount: ${budget.budgetAmount} exceeded.`
      );
    }

    await budget.save({ transaction: t });
  }
};

const updateUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found.");
  }

  const userId = req.user.userId;

  const t = await sequelize.transaction();

  try {
    const oldCategory = await Category.findByPk(expense.categoryId, {
      transaction: t,
    });

    const newCategory = await Category.findByPk(req.body.categoryId, {
      transaction: t,
    });

    const budget = await Budget.findOne({
      where: { status: "Active", userId: userId },
      transaction: t,
    });

    validateUpdateInputs(req.body, res, newCategory);

    await calculateBalances({
      reqBody: req.body,
      expense,
      budget,
      oldCategory,
      newCategory,
      userEmail: req.user.email,
      t,
    });

    Object.assign(expense, {
      expenseAmount: req.body.expenseAmount,
      expenseType: req.body.expenseType,
      expenseDate: req.body.expenseDate,
      merchant: req.body.merchant,
      categoryId: req.body.categoryId,
    });

    await expense.save({ transaction: t });

    await t.commit();

    res.status(200).json({
      ...expense.toJSON(),
      message: "Expense updated successfully.",
    });
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Update expense controller (END)

*/

/*

Delete expense controller

*/

const deleteUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found.");
  }

  const t = await sequelize.transaction();

  try {
    const category = await Category.findByPk(expense.categoryId, {
      transaction: t,
    });

    const budget = await Budget.findOne({
      where: { status: "Active", userId: req.user.userId },
      transaction: t,
    });

    if (category) {
      if (category.isActive === true) {
        category.limitRemainingAmount += expense.expenseAmount;
      }

      await category.save({ transaction: t });
    }

    if (budget) {
      budget.amountSpent -= expense.expenseAmount;
      budget.amountRemaining += expense.expenseAmount;

      await budget.save({ transaction: t });
    }
    await expense.destroy({ transaction: t });

    await t.commit();

    res.status(200).json({
      message: `Expense deleted successfully.`,
    });
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Delete expense controller (END)

*/

module.exports = {
  getUserExpense,
  getAllUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
};
