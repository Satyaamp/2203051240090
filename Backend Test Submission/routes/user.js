const express = require("express");
const router = express.Router();

const { log } = require("../../Logging Middleware/index");

router.post("/register", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    await log("backend", "error", "handler", "Email is missing in request body");
    return res.status(400).json({ error: "Email is required" });
  }

  await log("backend", "info", "handler", `Registration started for ${email}`);
  res.json({ message: "User registered" });
});

module.exports = router;