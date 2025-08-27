const sequelize = require("../db/db");
const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");

/*

Get single income controller

*/

const getUserIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.id;
  const income = await Income.findByPk(incomeId);

  if (!income) {
    res.status(404);
    throw new Error("Income not found.");
  }

  res.status(200).json({
    ...income.toJSON(),
  });
});

/*

Get single income controller (END)

*/

/*

Get all income controller

*/

const getAllUserIncomes = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const incomes = await Income.findAll({ where: { userId: userId } });

  if (!incomes) {
    res.status(404);
    throw new Error("No incomes found.");
  }

  res.status(200).json({
    incomesData: incomes,
  });
});

/*

Get all income controller (END)

*/

/*

Create income controller

*/

const createUserIncome = asyncHandler(async (req, res) => {
  const { incomeAmount, incomeDate, incomeSource } = req.body;

  if (!incomeAmount || !incomeDate || !incomeSource) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (incomeAmount <= 0) {
    res.status(400);
    throw new Error("Income amount must be greater than 0.");
  }

  const userId = req.user.userId;

  const t = await sequelize.transaction();

  try {
    const newIncome = await Income.create(
      {
        incomeAmount: incomeAmount,
        incomeDate: incomeDate,
        incomeSource: incomeSource,
        userId: userId,
      },
      { transaction: t }
    );

    if (newIncome) {
      await t.commit();

      res.status(201).json({
        ...newIncome.toJSON(),
        message: "Income created successfully.",
      });
    }
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Create income controller (END)

*/

/*

Update income controller

*/

const updateUserIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.id;
  const income = await Income.findByPk(incomeId);

  if (!income) {
    res.status(404);
    throw new Error("Income not found.");
  }

  if (req.body.incomeAmount <= 0) {
    res.status(400);
    throw new Error("Income amount must be greater than 0.");
  }

  const t = await sequelize.transaction();

  try {
    Object.assign(income, {
      incomeAmount: req.body.incomeAmount,
      incomeDate: req.body.incomeDate,
      incomeSource: req.body.incomeSource,
    });

    await income.save({ transaction: t });

    await t.commit();

    res.status(200).json({
      ...income.toJSON(),
      message: "Income updated successfully.",
    });
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Update income controller (END)

*/

/*

Delete income controller

*/

const deleteUserIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.id;
  const income = await Income.findByPk(incomeId);

  if (!income) {
    res.status(404);
    throw new Error("Income not found.");
  }

  const t = await sequelize.transaction();

  try {
    await income.destroy({ transaction: t });

    await t.commit();

    res.status(200).json({
      message: `Income deleted successfully.`,
    });
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Delete income controller (END)

*/

module.exports = {
  getUserIncome,
  getAllUserIncomes,
  createUserIncome,
  deleteUserIncome,
  updateUserIncome,
};
