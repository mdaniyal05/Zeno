const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Category = sequelize.define(
  "Category",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categoryType: {
      type: DataTypes.ENUM("Expense", "Income"),
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
    },
  },
  {
    tableName: "Categories",
    timestamps: true,
  }
);

User.hasMany(Category, { foreignKey: { name: "userId", allowNull: false } });
Category.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
});

module.exports = Category;
