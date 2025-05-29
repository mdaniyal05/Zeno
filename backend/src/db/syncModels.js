const User = require("../models/user.model");
const Account = require("../models/account.model");
const Category = require("../models/category.model");
const Transaction = require("../models/transaction.model");
const Budget = require("../models/budget.model");

const syncModels = () => {
  User.sync();
  Account.sync();
  Category.sync();
  // Transaction.sync();
  // Budget.sync();
};

module.exports = syncModels;
