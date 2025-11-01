const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
  });

  // sequelize = new Sequelize(
  //   process.env.DB_NAME,
  //   process.env.DB_USER,
  //   process.env.DB_PASS,
  //   {
  //     host: process.env.DB_HOST,
  //     port: process.env.DB_PORT || 5432,
  //     dialect: "postgres",
  //   }
  // );
}

module.exports = sequelize;
