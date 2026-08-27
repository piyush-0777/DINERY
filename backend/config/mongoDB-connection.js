require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/dinerydata";

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected successfully:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

module.exports = mongoose;