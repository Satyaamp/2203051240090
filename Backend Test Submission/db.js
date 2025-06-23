const mongoose = require("mongoose");

async function connDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/satyamurlshort", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection success!");
  } catch (err) {
    console.error("MongoDB connection failed!:", err.message);
  }
}

module.exports = { connDB };