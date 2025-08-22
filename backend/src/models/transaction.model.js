const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Account = require("./account.model");
const User = require("./user.model");
const Saving = require("../models/saving.model");

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
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.ENUM("Income", "Expense", "Saving"),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("Cash", "Card", "Bank", "Online", "Other"),
      allowNull: false,
    },
    transactionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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

Saving.hasMany(Transaction, {
  foreignKey: { name: "savingId", defaultValue: null },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Transaction.belongsTo(Saving, {
  as: "srcSaving",
  foreignKey: { name: "savingId" },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

module.exports = Transaction;
