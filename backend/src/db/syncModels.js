const sequelize = require("./db");

const syncModels = async () => {
  await sequelize.sync();
};

module.exports = syncModels;
