const express = require("express");
const dotenv = require("dotenv");
// db connect
const connectMongoDB = require("./src/dbconnect");
// routes
const authRoutes = require("./src/routes/authRoutes");
const budgetRoutes = require("./src/routes/budgetRoutes");
const userRoutes = require("./src/routes/userRouters");

const app = express();
dotenv.config();

app.use(express.json({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  connectMongoDB();
  console.log(`App has been started on http://localhost:${process.env.PORT}`);
});
