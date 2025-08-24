const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");
const Account = require("./account.model");

const Saving = sequelize.define(
  "Saving",
  {
    savingId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("targetAmount");
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    currentAmount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      get() {
        const rawValue = this.getDataValue("currentAmount");
        return rawValue === null ? null : parseFloat(rawValue);
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Completed"),
      defaultValue: "Active",
    },
  },
  { tableName: "Savings", timestamps: true }
);

User.hasMany(Saving, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Saving.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Account.hasMany(Saving, {
  foreignKey: { name: "accountId", allowNull: false },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Saving.belongsTo(Account, {
  as: "srcAccount",
  foreignKey: { name: "accountId" },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

module.exports = Saving;
