const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");

const STATIC_PASSWORD = "pass123";

userRouter.post("/signup", async (req, res) => {
  const { name, role } = req.body;
  if (!["author", "customer"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = new UserModel({ name, password: STATIC_PASSWORD, role });
  await user.save();
  res.status(201).json({ message: "User created", user });
});

userRouter.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = await UserModel.findOne({ name });
  if (!user || password !== STATIC_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token, user: { name: user.name, role: user.role, id: user._id } });
});

module.exports = { userRouter };
