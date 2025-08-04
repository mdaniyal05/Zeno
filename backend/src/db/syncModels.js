const sequelize = require("./db");

const syncModels = async () => {
  await sequelize.sync({ match: /Tracker$/ });
};

module.exports = syncModels;
