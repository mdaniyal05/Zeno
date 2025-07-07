const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Category = sequelize.define(
  "Category",
  {
    categoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryType: {
      type: DataTypes.ENUM("Needs", "Wants", "Savings"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 150],
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    monthlyLimit: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0,
      },
      allowNull: false,
    },
    monthlyLimitRemainingAmount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    isMonthlyLimitExceeded: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "Categories",
    timestamps: true,
  }
);

User.hasMany(Category, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Category.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Category;
