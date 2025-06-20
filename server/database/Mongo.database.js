const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DATABASE_URL;

const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected");
  } catch (err) {
    console.err("Database connection error", err.message);
  }
};

module.exports = ConnectToDatabase;
