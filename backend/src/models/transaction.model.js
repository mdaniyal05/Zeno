const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");
const Category = require("./category.model");

const Transaction = sequelize.define(
  "Transaction",
  {
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "categoryId",
      },
      allowNull: false,
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
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Transactions",
    timestamps: true,
    updatedAt: false,
  }
);

Transaction.belongsTo(User, { foreignKey: "userId" });
Transaction.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Transaction;
