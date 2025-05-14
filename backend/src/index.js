const app = require("./app");
const dotenv = require("dotenv");
const sequelize = require("./db/db");
const syncModels = require("./db/syncModels");

dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database has been connected successfully.");

    syncModels();

    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Unable to connect to the database: ${error}`);
  });
