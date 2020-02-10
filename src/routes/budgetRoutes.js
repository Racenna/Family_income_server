const router = require("express").Router();
const verifyToken = require("./verifyToken");
//model
const Budget = require("../models/Budget");

// /api/budget/creat
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { date, income, expenses, amount } = req.body;

    if (income < 0 || expenses < 0) {
      return res
        .status(400)
        .json({ message: "Invalid income or expenses. Must be at least 0" });
    }

    const budget = new Budget({
      date,
      income,
      expenses,
      amount,
      owner: req.user.userId
    });

    await budget.save();

    res.status(201).json({ message: "Operation success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// /api/budget/delete
router.delete("/delete", verifyToken, async (req, res) => {
  try {
    await Budget.deleteOne({ _id: req.body._id });
    console.log("YA TUTA");
    res.status(200).json({ message: "Record deleted" });
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
