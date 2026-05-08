const express = require("express");
const router = express.Router();
const College = require("../models/College");

// GET all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET single college by id
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    res.json(college);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST add a college
router.post("/", async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;