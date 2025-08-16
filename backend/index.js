const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");

const { connect } = require("./db"); // DB connection
const router = require("./Routes/index");
const port = 5000;

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

// ✅ OTP / Payment / Resume routes
const otpRoutes = require("./Routes/otpRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const resumeRoutes = require("./Routes/resumeRoutes");

app.use("/otp", otpRoutes);
app.use("/payment", paymentRoutes);
app.use("/resume", resumeRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on the port ${port}`);
});
