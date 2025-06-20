require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./database/Mongo.database");
const port = 3000;
const cors = require("cors");
const todoRoutes = require("./routes/App.routes");

const bodyParser = require("body-parser");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
db();

app.use("/todo", todoRoutes);

app.listen(port, () => {
  console.log("Server is working on http://localhost:3000/");
});
