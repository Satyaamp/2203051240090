const express = require("express");
const app = express();
const userRoutes = require("./routes/user");

const { connectDB } = require("./db");
const shorturlRoutes = require("./routes/shorturl");

app.use(express.json());
app.use("/", shorturlRoutes);
app.use("/user", userRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
});