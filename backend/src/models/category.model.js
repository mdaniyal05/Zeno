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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
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

Category.belongsTo(User, { foreignKey: "userId" });

module.exports = Category;
