const sequelize = require("./db");

const syncModels = async () => {
  await sequelize.sync({ match: /Tracker$/, force: true });
};

module.exports = syncModels;
