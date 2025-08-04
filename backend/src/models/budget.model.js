const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Budget = sequelize.define(
  "Budget",
  {
    budgetId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        validator(value) {
          const currentDate = new Date();

          if (value <= currentDate) {
            throw new Error("Start date must be in future.");
          }
        },
      },
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        validator(value) {
          if (value < this.startDate) {
            throw new Error("End date must be after the start date.");
          }
        },
      },
    },
    budgetAmount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    amountSpent: {
      type: DataTypes.DECIMAL(10, 2),
    },
    amountRemaining: {
      type: DataTypes.DECIMAL(10, 2),
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [0, 150],
          msg: "Description cannot exceed 150 characters.",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("Active", "Completed", "Exceeded"),
      defaultValue: "Active",
    },
  },
  {
    tableName: "Budgets",
    timestamps: true,
  }
);

User.hasMany(Budget, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Budget.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Budget;
