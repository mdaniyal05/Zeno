const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Category = require("./category.model");
const Account = require("./account.model");
const User = require("./user.model");

const Transaction = sequelize.define(
  "Transaction",
  {
    transactionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    transactionAmount: {
      type: DataTypes.DECIMAL(18, 5),
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.ENUM("Income", "Expense"),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("Cash", "Card", "Bank", "Online", "Other"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [0, 150],
      },
    },
  },
  {
    tableName: "Transactions",
    timestamps: true,
  }
);

User.hasMany(Transaction, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Transaction.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Account.hasMany(Transaction, {
  foreignKey: { name: "accountId", allowNull: false },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Transaction.belongsTo(Account, {
  as: "srcAccount",
  foreignKey: { name: "accountId" },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

module.exports = Transaction;
