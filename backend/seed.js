const mongoose = require("mongoose");
const College = require("./models/College");
require("dotenv").config();

const colleges =[
  { name: "Indian Institute of Technology Bombay", location: "Mumbai", fees: 900000, rating: 4.9, courses: "CSE, EE, MBA", placement_percent: 98 },

  { name: "Indian Institute of Technology Delhi", location: "New Delhi", fees: 850000, rating: 4.9, courses: "CSE, Mechanical, M.Tech", placement_percent: 99 },

  { name: "Indian Institute of Technology Madras", location: "Chennai", fees: 875000, rating: 4.8, courses: "CSE, Civil, MBA", placement_percent: 97 },

  { name: "Indian Institute of Technology Kanpur", location: "Kanpur", fees: 825000, rating: 4.8, courses: "CSE, Aerospace", placement_percent: 96 },

  { name: "Indian Institute of Technology Kharagpur", location: "Kharagpur", fees: 800000, rating: 4.7, courses: "CSE, Mining, MBA", placement_percent: 95 },

  { name: "BITS Pilani", location: "Pilani", fees: 1800000, rating: 4.7, courses: "CSE, Electrical, M.E.", placement_percent: 92 },

  { name: "National Institute of Technology Trichy", location: "Tiruchirappalli", fees: 650000, rating: 4.5, courses: "CSE, Mechanical", placement_percent: 90 },

  { name: "National Institute of Technology Warangal", location: "Warangal", fees: 620000, rating: 4.4, courses: "CSE, ECE", placement_percent: 88 },

  { name: "PSG College of Technology", location: "Coimbatore", fees: 700000, rating: 4.1, courses: "CSE, Mechanical", placement_percent: 80 },

  { name: "Jadavpur University", location: "Kolkata", fees: 50000, rating: 4.4, courses: "CSE, Electronics, MBA", placement_percent: 85 },

  { name: "Amity University Noida", location: "Noida", fees: 1100000, rating: 3.8, courses: "CSE, BBA, MBA", placement_percent: 72 },

  { name: "SRM Institute of Science and Technology", location: "Chennai", fees: 1300000, rating: 3.9, courses: "CSE, Biotech, MBA", placement_percent: 75 },

  { name: "Thapar Institute of Engineering", location: "Patiala", fees: 1400000, rating: 4.1, courses: "CSE, ECE", placement_percent: 83 },

  { name: "National Institute of Technology Surathkal", location: "Surathkal", fees: 630000, rating: 4.3, courses: "CSE, Chemical", placement_percent: 87 },

  { name: "Pune Institute of Computer Technology", location: "Pune", fees: 450000, rating: 4.0, courses: "CSE, IT, M.E.", placement_percent: 82 },

  { name: "Indian Institute of Information Technology Allahabad", location: "Allahabad", fees: 750000, rating: 4.3, courses: "CSE, IT, M.Tech", placement_percent: 91 },

  { name: "JECRC University", location: "Jaipur", fees: 850000, rating: 3.6, courses: "CSE, Mechanical, MBA", placement_percent: 65 },

  { name: "Malaviya National Institute of Technology", location: "Jaipur", fees: 600000, rating: 4.2, courses: "CSE, ECE", placement_percent: 86 },

  { name: "Chandigarh University", location: "Chandigarh", fees: 950000, rating: 3.8, courses: "CSE, BBA, MBA", placement_percent: 70 },

  { name: "Coimbatore Institute of Technology", location: "Coimbatore", fees: 380000, rating: 3.9, courses: "CSE, Mechanical", placement_percent: 74 },

  { name: "Maulana Azad National Institute of Technology", location: "Bhopal", fees: 590000, rating: 4.1, courses: "CSE, ECE, M.Tech", placement_percent: 82 },

  { name: "RV College of Engineering", location: "Bangalore", fees: 900000, rating: 4.2, courses: "CSE, ECE, M.Tech", placement_percent: 88 },

  { name: "PES University", location: "Bangalore", fees: 1200000, rating: 4.1, courses: "CSE, ECE, MBA", placement_percent: 86 },

  { name: "BMS College of Engineering", location: "Bangalore", fees: 850000, rating: 4.0, courses: "CSE, Civil", placement_percent: 82 },

  { name: "Indraprastha Institute of Information Technology", location: "Delhi", fees: 780000, rating: 4.4, courses: "CSE, ECE, M.Tech", placement_percent: 95 },

  { name: "Birla Institute of Technology Mesra", location: "Ranchi", fees: 1100000, rating: 4.0, courses: "CSE, Mechanical, MBA", placement_percent: 80 },

  { name: "Shiv Nadar University", location: "Greater Noida", fees: 1600000, rating: 4.3, courses: "CSE, Physics, MBA", placement_percent: 89 },

  { name: "Lovely Professional University", location: "Jalandhar", fees: 900000, rating: 3.7, courses: "CSE, BCA, MBA", placement_percent: 68 },

  { name: "Mumbai University", location: "Mumbai", fees: 90000, rating: 3.8, courses: "CSE, MBA, B.Sc", placement_percent: 72 },

  { name: "Graphic Era University", location: "Dehradun", fees: 950000, rating: 3.8, courses: "CSE, ECE, MBA", placement_percent: 70 }
];
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await College.insertMany(colleges);
    console.log("20 more colleges added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));