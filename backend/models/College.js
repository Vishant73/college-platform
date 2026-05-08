const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: String,
  location: String,
  fees: Number,
  rating: Number,
  courses: String,
  placement_percent: Number,
});

module.exports = mongoose.model("College", collegeSchema);