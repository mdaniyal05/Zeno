const asyncHandler = require("express-async-handler");
const Saving = require("../models/saving.model");
const Transaction = require("../models/transaction.model");

/*

Get single saving controller

*/

const getUserSaving = asyncHandler(async (req, res) => {
  const savingId = req.params.id;
  const saving = await Saving.findByPk(savingId);

  if (!saving) {
    res.status(404);
    throw new Error("Saving not found.");
  }

  res.status(200).json({
    ...saving.toJSON(),
  });
});

/*

Get single saving controller (END)

*/

/*

Get all saving controller

*/

const getAllUserSavings = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const savings = await Saving.findAll({ where: { userId: userId } });

  if (!savings) {
    res.status(404);
    throw new Error("No savings found.");
  }

  res.status(200).json({
    savingsData: savings,
  });
});

/*

Get all saving controller (END)

*/

/*

Create saving controller

*/

const createUserSaving = asyncHandler(async (req, res) => {
  const { title, targetAmount, description, accountId } = req.body;

  if (!title || !targetAmount || !description || !accountId) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (targetAmount <= 0) {
    res.status(400);
    throw new Error("Target amount must be greater than 0.");
  }

  const userId = req.user.userId;

  const t = await sequelize.transaction();

  try {
    const newSaving = await Saving.create(
      {
        title: title,
        targetAmount: targetAmount,
        description: description,
        userId: userId,
        accountId: accountId,
      },
      { transaction: t }
    );

    if (newSaving) {
      await t.commit();

      res.status(201).json({
        ...newSaving.toJSON(),
        message: "Saving created successfully.",
      });
    }
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Create saving controller (END)

*/

/*

Update saving controller (END)

*/

const updateUserSaving = asyncHandler(async (req, res) => {
  const savingId = req.params.id;
  const saving = await Saving.findByPk(savingId);

  if (!saving) {
    res.status(404);
    throw new Error("Saving not found.");
  }

  if (req.body.targetAmount <= 0) {
    res.status(400);
    throw new Error("Target amount must be greater than 0.");
  }

  const t = await sequelize.transaction();

  try {
    Object.assign(saving, {
      title: req.body.title,
      targetAmount: req.body.targetAmount,
      description: req.body.description,
      accountId: req.body.accountId,
    });

    await saving.save({ transaction: t });

    await t.commit();

    res.status(200).json({
      ...saving.toJSON(),
      message: "Saving updated successfully.",
    });
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Update saving controller (END)

*/

/*

Delete saving controller

*/

const deleteUserSaving = asyncHandler(async (req, res) => {
  const savingId = req.params.id;
  const saving = await Saving.findByPk(savingId);

  if (!saving) {
    res.status(404);
    throw new Error("Saving not found.");
  }

  const t = await sequelize.transaction();

  try {
    await Transaction.destroy({
      where: { savingId: savingId },
      transaction: t,
    });

    await saving.destroy({ transaction: t });

    res.status(200).json({
      message: `Saving and all the transactions related to it are deleted successfully.`,
    });
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Delete saving controller (END)

*/

module.exports = {
  getUserSaving,
  getAllUserSavings,
  createUserSaving,
  updateUserSaving,
  deleteUserSaving,
};
