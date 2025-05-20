const asyncHandler = require("express-async-handler");
const Account = require("../models/account.model");

const getUserAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  const account = await Account.findByPk(accountId);

  if (account) {
    res.status(200).json({
      accountName: account.accountName,
      accountType: account.accountType,
      accountBalance: account.accountBalance,
      accountCurrency: account.accountCurrency,
      bankName: account.bankName,
      accountNumber: account.accountNumber,
      isActive: account.isActive,
    });
  } else {
    res.status(404);
    throw new Error("Account Not Found.");
  }
});

const getAllUserAccounts = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const accounts = await Account.findAll({ where: { userId: userId } });

  if (accounts) {
    res.status(200).json({
      accountName: accounts.accountName,
      accountType: accounts.accountType,
    });
  } else {
    res.status(404);
    throw new Error("No Accounts Available.");
  }
});

const createUserAccount = asyncHandler(async (req, res) => {
  const {
    accountName,
    accountType,
    accountBalance,
    accountCurrency,
    bankName,
    accountNumber,
  } = req.body;

  const accountExists = await Account.findOne({
    where: { accountNumber: accountNumber },
  });

  if (accountExists) {
    res.status(400);
    throw new Error("Account Already Exists.");
  }

  const isActive = true;
  const userId = req.user.userId;

  const newAccount = await Account.create({
    userId: userId,
    accountName: accountName,
    accountType: accountType,
    accountBalance: accountBalance,
    accountCurrency: accountCurrency,
    bankName: bankName,
    accountNumber: accountNumber,
    isActive: isActive,
  });

  if (newAccount) {
    res.status(201).json({
      accountName: accountName,
      accountType: accountType,
      isActive: isActive,
      message: "Account Created Successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Account Data");
  }
});

const updateUserAccount = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User Account Updated",
  });
});

const deleteUserAccount = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User Account Deleted",
  });
});

module.exports = {
  getUserAccount,
  getAllUserAccounts,
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
};
