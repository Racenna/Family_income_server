const router = require("express").Router();
const verifyToken = require("./verifyToken");
//model
const User = require("../models/User");

// /api/user
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    console.log(user.email);
    res.status(200).json(user.email);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
