const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");
const Category = require("./category.model");

const Transaction = sequelize.define("Transaction", {
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
  category: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: "categoryId",
    },
  },
  transactionDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  transactionTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  transactionAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transactionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

Transaction.sync();

module.exports = Transaction;
