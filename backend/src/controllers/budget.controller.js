const asyncHandler = require("express-async-handler");
const Budget = require("../models/budget.model");

/*

Get single budget controller

*/

const getUserBudget = asyncHandler(async (req, res) => {
  const budgetId = req.params.id;
  const budget = await Budget.findByPk(budgetId);

  if (!budget) {
    res.status(404);
    throw new Error("Budget not found.");
  }

  res.status(200).json({
    ...budget.toJSON(),
  });
});

/*

Get single budget controller (END)

*/

/*

Get all budget controller

*/

const getAllUserBudgets = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const budgets = await Budget.findAll({ where: { userId: userId } });

  if (!budgets) {
    res.status(404);
    throw new Error("No budgets found.");
  }

  res.status(200).json({
    budgetsData: budgets,
  });
});

/*

Get all budget controller (END)

*/

/*

Create budget controller

*/

const createUserBudget = asyncHandler(async (req, res) => {
  const { startDate, endDate, budgetAmount, description } = req.body;

  if (!startDate || !endDate || !budgetAmount || !description) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (budgetAmount <= 0) {
    res.status(400);
    throw new Error("Budget amount must be greater than 0.");
  }

  const userId = req.user.userId;

  const t = await sequelize.transaction();

  try {
    const budget = await Budget.findOne({
      where: { status: "Active", userId: userId },
      transaction: t,
    });

    if (budget) {
      res.status(400);
      throw new Error("You can only have one active budget at a time.");
    }

    const newBudget = await Budget.create(
      {
        startDate: startDate,
        endDate: endDate,
        budgetAmount: budgetAmount,
        amountRemaining: budgetAmount,
        description: description,
        userId: userId,
      },
      { transaction: t }
    );

    if (newBudget) {
      await t.commit();

      res.status(201).json({
        ...newBudget.toJSON(),
        message: "Budget created successfully.",
      });
    }
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Create budget controller (END)

*/

/*

Update budget controller

*/

const updateUserBudget = asyncHandler(async (req, res) => {
  const budgetId = req.params.id;
  const budget = await Budget.findByPk(budgetId);

  if (!budget) {
    res.status(404);
    throw new Error("Budget not found.");
  }

  if (req.body.budgetAmount <= 0) {
    res.status(400);
    throw new Error("Budget amount must be greater than 0.");
  }

  const t = await sequelize.transaction();

  try {
    Object.assign(budget, {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      budgetAmount: req.body.budgetAmount,
      description: req.body.description,
    });

    await budget.save({ transaction: t });

    await t.commit();

    res.status(200).json({
      ...budget.toJSON(),
      message: "Budget updated successfully.",
    });
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Update budget controller (END)

*/

/*

Delete budget controller

*/

const deleteUserBudget = asyncHandler(async (req, res) => {
  const budgetId = req.params.id;
  const budget = await Budget.findByPk(budgetId);

  if (!budget) {
    res.status(404);
    throw new Error("Budget not found.");
  }

  const t = await sequelize.transaction();

  try {
    await budget.destroy({ transaction: t });

    await t.commit();

    res.status(200).json({
      message: `Budget deleted successfully.`,
    });
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Delete budget controller (END)

*/

module.exports = {
  getUserBudget,
  getAllUserBudgets,
  createUserBudget,
  updateUserBudget,
  deleteUserBudget,
};
