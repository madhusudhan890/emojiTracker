const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DBPORT,
    dialect: process.env.DIALECT,
    // operatorsAliases: Sequelize.Op,
    logging: false,
    // pool: {
    //   max: 10,
    //   idle: 10000,
    // },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
