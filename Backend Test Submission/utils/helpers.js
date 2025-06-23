const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

function generateShortcode() {
  return nanoid();
}

function getExpiry(minutes = 30) {
  return new Date(Date.now() + minutes * 60000);
}

function isExpired(expiryDate) {
  return new Date() > new Date(expiryDate);
}

module.exports = { generateShortcode, getExpiry, isExpired };