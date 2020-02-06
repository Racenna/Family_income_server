const express = require("express");
const dotenv = require("dotenv");
// db connect
const connectMongoDB = require("./src/dbconnect");

const app = express();

dotenv.config();

// routes
app.use("/api/auth", require("./src/routes/auth.routes"));

app.listen(process.env.PORT, () => {
  connectMongoDB();
  console.log(`App has been started on http://localhost:${process.env.PORT}`);
});
