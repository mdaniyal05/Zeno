const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Category = require("./category.model");
const Account = require("./account.model");
const User = require("./user.model");

const Transaction = sequelize.define(
  "Transaction",
  {
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    transactionAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.ENUM("Income", "Expense"),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Cash", "Card", "Bank", "Online", "Other"]],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 150],
      },
    },
  },
  {
    tableName: "Transactions",
    timestamps: true,
    updatedAt: false,
  }
);

User.hasMany(Transaction, {
  foreignKey: { name: "userId", allowNull: false },
});
Transaction.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
});

Account.hasMany(Transaction, {
  foreignKey: { name: "accountId", allowNull: false },
});
Transaction.belongsTo(Account, {
  as: "srcAccount",
  foreignKey: { name: "accountId" },
});

Category.hasMany(Transaction, {
  foreignKey: { name: "categoryId", allowNull: false },
});
Transaction.belongsTo(Category, {
  as: "fromCategory",
  foreignKey: { name: "categoryId" },
});

module.exports = Transaction;
