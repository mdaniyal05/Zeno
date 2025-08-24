const { DataTypes } = require("sequelize");
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
      type: DataTypes.ENUM("Needs", "Wants"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    limit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("limit");
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    limitRemainingAmount: {
      type: DataTypes.DECIMAL,
      get() {
        const rawValue = this.getDataValue("limitRemainingAmount");
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    islimitExceeded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      get() {
        const rawValue = this.getDataValue("islimitExceeded");
        return rawValue === null ? null : parseFloat(rawValue);
      },
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
