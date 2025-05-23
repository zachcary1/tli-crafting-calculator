const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // <-- Make sure this is here and not missing


// Routes
const buildsRoute = require("./routes/builds");
app.use("/api/builds", buildsRoute);

// Optional root route (for Render home page check)
app.get("/", (req, res) => {
  res.send("Backend API is live. Visit /api/builds to test.");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
