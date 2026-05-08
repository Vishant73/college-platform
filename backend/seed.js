const mongoose = require("mongoose");
const College = require("./models/College");
require("dotenv").config();

const colleges = [
  { name: "IIT Roorkee", location: "Roorkee", fees: 215000, rating: 4.7, courses: "CS, ECE, Civil, Architecture", placement_percent: 95 },
  { name: "IIT Hyderabad", location: "Hyderabad", fees: 205000, rating: 4.6, courses: "CS, ECE, ME, Design", placement_percent: 93 },
  { name: "IIT Gandhinagar", location: "Ahmedabad", fees: 200000, rating: 4.5, courses: "CS, ECE, Chemical, Humanities", placement_percent: 91 },
  { name: "IIT Indore", location: "Indore", fees: 198000, rating: 4.4, courses: "CS, ECE, ME, Physics", placement_percent: 90 },
  { name: "NIT Calicut", location: "Calicut", fees: 135000, rating: 4.3, courses: "CS, ECE, ME, Architecture", placement_percent: 84 },
  { name: "NIT Rourkela", location: "Rourkela", fees: 138000, rating: 4.2, courses: "CS, ECE, Mining, Chemical", placement_percent: 83 },
  { name: "NIT Jaipur", location: "Jaipur", fees: 132000, rating: 4.1, courses: "CS, ECE, ME, Civil", placement_percent: 81 },
  { name: "Delhi Technological University", location: "Delhi", fees: 110000, rating: 4.4, courses: "CS, ECE, ME, Bio", placement_percent: 86 },
  { name: "NSUT Delhi", location: "Delhi", fees: 105000, rating: 4.2, courses: "CS, ECE, IT, Bio", placement_percent: 82 },
  { name: "PEC Chandigarh", location: "Chandigarh", fees: 90000, rating: 4.1, courses: "CS, ECE, ME, Aerospace", placement_percent: 80 },
  { name: "Symbiosis Institute of Technology", location: "Pune", fees: 380000, rating: 4.0, courses: "CS, ECE, ME, Civil", placement_percent: 77 },
  { name: "Christ University", location: "Bangalore", fees: 220000, rating: 3.9, courses: "CS, Business, Law, Arts", placement_percent: 74 },
  { name: "Vellore Institute of Technology", location: "Chennai", fees: 190000, rating: 4.1, courses: "CS, ECE, Bio, Chemical", placement_percent: 79 },
  { name: "Kalinga Institute", location: "Bhubaneswar", fees: 170000, rating: 4.0, courses: "CS, ECE, ME, Civil", placement_percent: 76 },
  { name: "LNM Institute", location: "Jaipur", fees: 290000, rating: 4.2, courses: "CS, ECE, ME, Design", placement_percent: 85 },
  { name: "DAIICT", location: "Ahmedabad", fees: 260000, rating: 4.3, courses: "CS, IT, ECE, Mathematics", placement_percent: 87 },
  { name: "MIT Manipal", location: "Manipal", fees: 360000, rating: 4.0, courses: "CS, ECE, ME, Architecture", placement_percent: 77 },
  { name: "Presidency University", location: "Kolkata", fees: 60000, rating: 4.0, courses: "CS, Physics, Chemistry, Economics", placement_percent: 70 },
  { name: "Anna University", location: "Chennai", fees: 75000, rating: 4.2, courses: "CS, ECE, ME, Civil", placement_percent: 81 },
  { name: "Osmania University", location: "Hyderabad", fees: 55000, rating: 3.9, courses: "CS, ECE, ME, Arts", placement_percent: 68 },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await College.insertMany(colleges);
    console.log("20 more colleges added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));