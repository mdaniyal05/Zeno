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
    throw new Error("Account Not Found.");
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
    throw new Error("No Accounts Available.");
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
    throw new Error("Account Already Exists.");
  }

  const userId = req.user.userId;
  const isActive = true;

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
      message: "Account Created Successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Account Data.");
  }
});

const deleteUserAccount = asyncHandler(async (req, res) => {
  const accountId = req.params.id;
  const account = await Account.findByPk(accountId);

  if (account) {
    await Account.destroy({ where: { accountId: accountId } });
    res.status(200).json({
      message: `Account Number: ${account.accountNumber} Deleted Succesfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Account Not Found.");
  }
});

module.exports = {
  getUserAccount,
  getAllUserAccounts,
  createUserAccount,
  deleteUserAccount,
};
