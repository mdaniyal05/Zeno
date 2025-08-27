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
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("budgetAmount");
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    amountSpent: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      get() {
        const rawValue = this.getDataValue("amountSpent");
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    amountRemaining: {
      type: DataTypes.DECIMAL,
      get() {
        const rawValue = this.getDataValue("amountRemaining");
        return rawValue === null ? null : parseFloat(rawValue);
      },
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
        "You’ve successfully managed your budget. Your spending stayed within the planned amount, and you finished with a balance left — great job keeping control!";

      notifyEmail(
        user.email,
        message,
        `Budget of amount: ${budget.budgetAmount} completion.`
      );
    }
  }
});

module.exports = Budget;
