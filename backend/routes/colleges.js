const express = require("express");
const router = express.Router();
const College = require("../models/College");

// GET all colleges with server-side search and filter
router.get("/", async (req, res) => {
  try {
    const { search, location, fees, course } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (course) {
      query.courses = { $regex: course, $options: "i" };
    }

    if (fees) {
      if (fees === "low") query.fees = { $lte: 100000 };
      if (fees === "medium") query.fees = { $gt: 100000, $lte: 250000 };
      if (fees === "high") query.fees = { $gt: 250000 };
    }

    const colleges = await College.find(query);
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET single college by id
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: "College not found" });
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