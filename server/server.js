const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");

dotenv.config();

mongoose.connect(process.env.DB_ACCESS, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  dbName: 'DRC'
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/app", routesUrls);
app.listen(4000, () => console.log("Server started"));
