const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");
//model
const Budget = require("../models/Budget");

// /api/budget/creat
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { date, income, expenses, amount } = req.body;

    const budget = new Budget({
      date,
      income,
      expenses,
      amount,
      owner: req.user.userId
    });

    await budget.save();

    res.status(201).json({ budget });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// /api/budget
router.get("/", verifyToken, async (req, res) => {
  try {
    const budgets = await Budget.find({ owner: req.user.userId });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
