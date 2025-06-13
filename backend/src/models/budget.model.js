const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");
const Category = require("./category.model");

const Budget = sequelize.define(
  "Budget",
  {
    budgetId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    budgetAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Amount must be greater than 0.",
        },
      },
    },
    budgetPeriod: {
      type: DataTypes.ENUM("Weekly", "Monthly", "Yearly"),
      allowNull: false,
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
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        validator(value) {
          let currentDate = new Date();

          let year = currentDate.getFullYear();
          let month = currentDate.getMonth() + 1;
          let day = currentDate.getDate();

          if (value > `${year}-${month}-${day}`) {
            throw new Error("Start date must be current date.");
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
    amountSpent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    amountRemaining: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    percentUsed: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    status: {
      type: DataTypes.ENUM("Active", "Completed", "Exceeded"),
      allowNull: false,
    },
    notificationsEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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

// Category.hasOne(Budget, {
//   foreignKey: { name: "categoryId", allowNull: false },
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });
// Budget.belongsTo(Category, {
//   as: "ofCategory",
//   foreignKey: { name: "categoryId" },
//   onDelete: "NO ACTION",
//   onUpdate: "CASCADE",
// });

module.exports = Budget;
