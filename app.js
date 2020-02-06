const express = require("express");
const dotenv = require("dotenv");

// db connect
const connectMongoDB = require("./src/dbconnect");
dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  connectMongoDB();
  console.log(`App has been started on http://localhost:${process.env.PORT}`);
});
