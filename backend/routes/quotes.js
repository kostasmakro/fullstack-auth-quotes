const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.get("/random", requireAuth, async (req, res) => {
  try {
    // ZenQuotes random endpoint
    const response = await fetch("https://zenquotes.io/api/random");
    if (!response.ok) {
      return res.status(502).json({ error: "Failed to fetch quote/Reached quote limit" });
    }

    const data = await response.json();
    // ZenQuotes returns array-object
    const quoteObj = Array.isArray(data) ? data[0] : null;

    if (!quoteObj?.q) {
      return res.status(502).json({ error: "Unexpected quote format" });
    }

    return res.json({ quote: quoteObj.q, author: quoteObj.a });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;