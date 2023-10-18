require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
require("./config/databaseConfig");
const route = require("./routes/routes");
if (process.env.CREATETABLE === "true") {
  require("./Models/models");
}

app.use(express.json());
app.use("/v1/api", route);

app.listen(process.env.PORT || 3000, (error) => {
  if (error) throw error;

  console.log(`Server is running at Port ${process.env.PORT || 3000}`);
});
