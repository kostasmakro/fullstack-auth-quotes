const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

require("./db"); // initialize DB + tables

const authRoutes = require("./routes/auth");
const quoteRoutes = require("./routes/quotes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Backend running ✅" });
});

app.use("/auth", authRoutes);
app.use("/quotes", quoteRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});