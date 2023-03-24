const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter your First name"],
  },
  middleName: {
    type: String,
    required: [true, "Please enter your Middle Name."],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your Last name."],
  },
  employeeId: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please Enter your E-mail!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide your valid E-mail!"],
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password!"],
    minlength: 8,
    select: false,
  },
  dateOfBirth: {
    type: String,
  },
  highestEducationQualification: {
    type: String,
  },
  specialisation: {
    type: String,
  },
  currentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  emergencyContactNumber: {
    type: Number,
  },
  otp: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["auditor", "admin"],
    default: "auditor",
  },
  google_id: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
