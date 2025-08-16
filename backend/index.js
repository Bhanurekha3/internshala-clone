const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");

const { connect } = require("./db"); // DB connection
const router = require("./Routes/index");

// Use PORT from hosting provider, fallback to 5000 locally
const port = process.env.PORT || 5000;

//connect it

// Connect to MongoDB ASAP
connect();

// Middleware
app.use(cors());
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("hello this is internshala backend");
});

// Main API routes
app.use("/api", router);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
