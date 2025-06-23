const mongoose = require("mongoose");

const ClickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  referrer: { type: String },
  location: { type: String },
});

const ShortUrlSchema = new mongoose.Schema({
  shortcode: { type: String, required: true, unique: true },
  longURL: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date },
  clicks: [ClickSchema],
});

module.exports = mongoose.model("ShorterUrl", ShortUrlSchema);