const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
  userId: String,
  collegeId: String,
  collegeName: String,
  location: String,
  fees: Number,
  rating: Number,
  placement_percent: Number,
});

const Saved = mongoose.model("Saved", savedSchema);

// Save a college
router.post("/", async (req, res) => {
  try {
    const { userId, collegeId, collegeName, location, fees, rating, placement_percent } = req.body;
    const exists = await Saved.findOne({ userId, collegeId });
    if (exists) {
      return res.status(400).json({ message: "Already saved!" });
    }
    const saved = new Saved({ userId, collegeId, collegeName, location, fees, rating, placement_percent });
    await saved.save();
    res.status(201).json({ message: "College saved!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get saved colleges by user
router.get("/:userId", async (req, res) => {
  try {
    const saved = await Saved.find({ userId: req.params.userId });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete saved college
router.delete("/:id", async (req, res) => {
  try {
    await Saved.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;