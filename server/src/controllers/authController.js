import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 1. REGISTER USER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Create Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretKey123", {
      expiresIn: "1h"
    });

    res.status(201).json({ token, user: { id: user._id, username: user.username, plan: user.plan } });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// 2. LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretKey123", {
      expiresIn: "1h"
    });

    res.json({ token, user: { id: user._id, username: user.username, plan: user.plan } });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};