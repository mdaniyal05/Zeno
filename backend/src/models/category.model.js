const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Category = sequelize.define("Category", {
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

Category.sync();

module.exports = Category;
