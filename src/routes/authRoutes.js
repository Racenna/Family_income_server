const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
//model
const User = require("../models/User");

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Invalid email").isEmail(),
    check("pwd", "Minimum password length 8 characters").isLength({ min: 8 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data"
        });
      }

      const { email, pwd } = req.body;
      const checkEmail = await User.findOne({ email });

      if (checkEmail) {
        return res.status(400).json({ message: "Email alrady exist" });
      }

      const hashedPwd = await bcrypt.hash(pwd, 12);
      const user = new User({ email, pwd: hashedPwd });

      await user.save();

      res.status(201).json({ message: "Registrate complete" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// /api/auth/register
router.post(
  "/login",
  [
    check("email", "Enter valid email")
      .normalizeEmail()
      .isEmail(),
    check("pwd", "Enter password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Login data incorrect"
        });
      }

      const { email, pwd } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User is not found" });
      }

      const isMatch = await bcrypt.compare(pwd, user.pwd);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid data" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
module.exports = router;
