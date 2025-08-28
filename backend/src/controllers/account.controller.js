const sequelize = require("../db/db");
const asyncHandler = require("express-async-handler");
const Account = require("../models/account.model");
const Transaction = require("../models/transaction.model");
const Saving = require("../models/saving.model");

/*

Get single account controller

*/

const getUserAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  const account = await Account.findByPk(accountId);

  if (!account) {
    res.status(404);
    throw new Error("Account not found.");
  }

  res.status(200).json({
    ...account.toJSON(),
  });
});

/*

Get single account controller (END)

*/

/*

Get all accounts controller

*/

const getAllUserAccounts = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const accounts = await Account.findAll({ where: { userId: userId } });

  if (!accounts) {
    res.status(404);
    throw new Error("No accounts found.");
  }

  res.status(200).json({
    accountsData: accounts,
  });
});

/*

Get all accounts controller (END)

*/

/*

Create account controller

*/

const createUserAccount = asyncHandler(async (req, res) => {
  const { accountName, accountType, accountBalance, bankName, accountNumber } =
    req.body;

  if (
    !accountName ||
    !accountType ||
    !accountBalance ||
    !bankName ||
    !accountNumber
  ) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (accountBalance <= 0) {
    res.status(400);
    throw new Error("Account Balance must be greater than 0.");
  }

  const userId = req.user.userId;

  const t = await sequelize.transaction();

  try {
    const accountExists = await Account.findOne({
      where: { accountNumber: accountNumber },
      transaction: t,
    });

    if (accountExists) {
      res.status(400);
      throw new Error("Account already exists.");
    }

    const newAccount = await Account.create(
      {
        accountName: accountName,
        accountType: accountType,
        accountBalance: accountBalance,
        bankName: bankName,
        accountNumber: accountNumber,
        userId: userId,
      },
      { transaction: t }
    );

    if (newAccount) {
      await t.commit();

      res.status(201).json({
        ...newAccount.toJSON(),
        message: "Account created successfully.",
      });
    }
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Create account controller (END)

*/

/*

Update account controller

*/

const updateUserAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  const account = await Account.findByPk(accountId);

  if (!account) {
    res.status(404);
    throw new Error("Account not found.");
  }

  if (req.body.accountBalance <= 0) {
    res.status(400);
    throw new Error("Account Balance must be greater than 0.");
  }

  const t = await sequelize.transaction();

  try {
    Object.assign(account, {
      accountName: req.body.accountName,
      accountType: req.body.accountType,
      accountBalance: req.body.accountBalance,
      bankName: req.body.bankName,
      accountNumber: req.body.accountNumber,
    });

    await account.save({ transaction: t });

    await t.commit();

    res.status(200).json({
      ...account.toJSON(),
      message: "Account updated successfully.",
    });
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Update account controller (END)

*/

/*

Delete account controller

*/

const deleteUserAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  const account = await Account.findByPk(accountId);

  if (!account) {
    res.status(404);
    throw new Error("Account not found.");
  }

  const t = await sequelize.transaction();

  try {
    if (account.accountType === "Savings") {
      await Saving.destroy({ where: { accountId: accountId }, transaction: t });
    }

    await Transaction.destroy({
      where: { accountId: accountId },
      transaction: t,
    });

    await account.destroy({ transaction: t });

    await t.commit();

    res.status(200).json({
      message: `Account and all the transactions related to this account are deleted successfully.`,
    });
  } catch (error) {
    await t.rollback();
    res.status(400);
    throw new Error(error.message);
  }
});

/*

Delete account controller (END)

*/

module.exports = {
  getUserAccount,
  getAllUserAccounts,
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
};
