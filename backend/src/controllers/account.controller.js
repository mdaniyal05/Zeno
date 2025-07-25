const asyncHandler = require("express-async-handler");
const Account = require("../models/account.model");

const getUserAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  const account = await Account.findByPk(accountId);

  if (account) {
    res.status(200).json({
      accountId: account.accountId,
      accountName: account.accountName,
      accountType: account.accountType,
      accountBalance: account.accountBalance,
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      isActive: account.isActive,
    });
  } else {
    res.status(404);
    throw new Error("Account not found.");
  }
});

const getAllUserAccounts = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const accounts = await Account.findAll({ where: { userId: userId } });

  if (accounts) {
    res.status(200).json({
      accountsData: accounts,
    });
  } else {
    res.status(404);
    throw new Error("No accounts available.");
  }
});

const createUserAccount = asyncHandler(async (req, res) => {
  const { accountName, accountType, accountBalance, bankName, accountNumber } =
    req.body;

  const accountExists = await Account.findOne({
    where: { accountNumber: accountNumber },
  });

  if (accountExists) {
    res.status(400);
    throw new Error("Account already exists.");
  }

  const userId = req.user.userId;
  const isActive = true;

  if (accountBalance < 0) {
    res.status(400);
    throw new Error("Negative values are not allowed.");
  }

  const newAccount = await Account.create({
    accountName: accountName,
    accountType: accountType,
    accountBalance: accountBalance,
    bankName: bankName,
    accountNumber: accountNumber,
    isActive: isActive,
    userId: userId,
  });

  if (newAccount) {
    res.status(201).json({
      accountName: accountName,
      accountType: accountType,
      isActive: isActive,
      message: "Account created successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid account data.");
  }
});

const updateUserAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  const account = await Account.findByPk(accountId);

  if (account) {
    account.accountName = req.body.accountName || account.accountName;
    account.accountType = req.body.accountType || account.accountType;
    account.accountBalance = req.body.accountBalance || account.accountBalance;
    account.bankName = req.body.bankName || account.bankName;
    account.accountNumber = req.body.accountNumber || account.accountNumber;

    const updatedAccount = await account.save();

    res.status(201).json({
      accountName: updatedAccount.accountName,
      accountType: updatedAccount.accountType,
      accountBalance: updatedAccount.accountBalance,
      bankName: updatedAccount.bankName,
      accountNumber: updatedAccount.accountNumber,
    });
  } else {
    res.status(404);
    throw new Error("Account not found.");
  }
});

const deleteUserAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  const account = await Account.findByPk(accountId);

  if (account) {
    await Account.destroy({ where: { accountId: accountId } });
    res.status(200).json({
      message: `Account number: ${account.accountNumber} deleted succesfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Account not found.");
  }
});

module.exports = {
  getUserAccount,
  getAllUserAccounts,
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
};
