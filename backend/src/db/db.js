const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
  }
);

module.exports = sequelize;
