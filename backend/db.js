// db.js
const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables

const url = process.env.DATABASE_URL;

module.exports.connect = () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Database is connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
};
