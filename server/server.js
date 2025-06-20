require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./database/Mongo.database");

db();

app.listen(process.env.PORT, () => {
  console.log("Server is working");
});
