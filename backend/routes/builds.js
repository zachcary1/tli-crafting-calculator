const express = require("express");
const router = express.Router();
const Build = require("../models/Build");

// Create a new build
router.post("/", async (req, res) => {
  try {
    const build = new Build(req.body);
    const saved = await build.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all builds
router.get("/", async (req, res) => {
  try {
    const builds = await Build.find();
    res.json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
