const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, getUserById } = require("../crud");

const router = express.Router();

function isValidEmail(email) {
  return typeof email === "string" && email.includes("@") && email.length <= 254;
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 8;
}

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email" });
    if (!isValidPassword(password)) return res.status(400).json({ error: "Password must be at least 8 characters" });

    const existing = getUserByEmail(email);
    if (existing) return res.status(409).json({ error: "Email already registered" });

    // Hash password 
    const passwordHash = await bcrypt.hash(password, 10);

    const user = createUser(email, passwordHash);
    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email) || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = getUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // HttpOnly cookie (good security)
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set true only when using https
      maxAge: 60 * 60 * 1000
    });

    return res.json({ message: "Logged in" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
});

// ME (who am I?)
router.get("/me", (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = getUserById(payload.userId);
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    return res.json(user);
  } catch {
    return res.status(401).json({ error: "Not authenticated" });
  }
});

module.exports = router;