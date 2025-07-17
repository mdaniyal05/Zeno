const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Account = sequelize.define(
  "Account",
  {
    accountId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.ENUM("Current", "Default", "Savings"),
      allowNull: false,
    },
    accountBalance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "Accounts",
    timestamps: true,
  }
);

User.hasMany(Account, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Account.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Account;
