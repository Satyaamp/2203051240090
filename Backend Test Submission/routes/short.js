const express = require("express");
const router = express.Router();
const { log } = require("../../Logging Middleware/index");
const { generateShortcode, getExpiry, isExpired } = require("../utils/helpers");
const ShortUrl = require("../models/ShorterUrl");

router.post("/shorturls", async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || typeof url !== "string" || !url.startsWith("http")) {
    await log("backend", "error", "handler", "Invalid URL input");
    return res.status(400).json({ error: "Invalid URL" });
  }

  const code = shortcode || generateShortcode();

  if (!/^[a-zA-Z0-9]{4,10}$/.test(code)) {
    await log("backend", "warn", "handler", "Invalid shortcode format");
    return res.status(400).json({ error: "Shortcode must be alphanumeric and 4–10 characters" });
  }

  const existing = await ShortUrl.findOne({ shortcode: code });
  if (existing) {
    await log("backend", "error", "handler", `Shortcode already used: ${code}`);
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const expiryDate = getExpiry(validity);

  const newShort = new ShortUrl({
    shortcode: code,
    longURL: url,
    expiry: expiryDate,
  });

  await newShort.save();
  await log("backend", "info", "service", `Created shortcode: ${code}`);

  res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiryDate.toISOString(),
  });
});

router.get("/:shortcode", async (req, res) => {
  const code = req.params.shortcode;
  const urlData = await ShortUrl.findOne({ shortcode: code });

  if (!urlData) {
    await log("backend", "error", "handler", `Shortcode not found: ${code}`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (isExpired(urlData.expiry)) {
    await log("backend", "warn", "handler", `Shortcode expired: ${code}`);
    return res.status(410).json({ error: "Link has expired" });
  }

  urlData.clicks.push({
    referrer: req.get("Referer") || "direct",
    location: req.ip || "unknown",
  });

  await urlData.save();
  await log("backend", "info", "route", `Redirected from ${code}`);
  res.redirect(urlData.longURL);
});

router.get("/shorturls/:shortcode", async (req, res) => {
  const code = req.params.shortcode;
  const data = await ShortUrl.findOne({ shortcode: code });

  if (!data) {
    await log("backend", "error", "handler", `Stats not found: ${code}`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const stat = {
    originalURL: data.longURL,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: data.clicks.length,
    clickDetails: data.clicks,
  };

  await log("backend", "info", "service", `Stat retrieved for ${code}`);
  res.json(stats);
});

module.exports = router;