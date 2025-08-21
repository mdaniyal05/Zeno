const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");
const notifyEmail = require("../utils/notifyEmail");

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
          const currentDate = new Date().toLocaleDateString("en-CA");

          if (value !== currentDate) {
            throw new Error("Start date must be today.");
          }
        },
      },
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        validator(value) {
          if (value <= this.startDate) {
            throw new Error("End date must be after the start date.");
          }
        },
      },
    },
    budgetAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    amountSpent: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    amountRemaining: {
      type: DataTypes.DECIMAL(12, 2),
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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

Budget.afterFind(async (budget, options) => {
  const today = new Date().toLocaleDateString("en-CA");

  if (budget && budget.status === "Active" && budget.endDate <= today) {
    budget.status = "Completed";

    await budget.save();

    const user = await User.findByPk(budget.userId);

    if (user) {
      const message =
        "Congratulations! You have completed your budget target. Keep up the good work.";

      notifyEmail(
        user.email,
        message,
        `Budget of amount: ${budget.budgetAmount} completion.`
      );
    }
  }
});

module.exports = Budget;
