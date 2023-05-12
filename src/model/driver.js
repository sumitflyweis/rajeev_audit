const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const driverSchema = mongoose.Schema(
  {
    authid: {
      type: objectid,
      ref: "Auth_Employee_Owner",
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    ResumeTitle: {
      type: String,
      default: "",
    },
    location: {
      type: objectid,
      ref: "location",
      default: "",
    },
    exactAddress: {
      type: String,
      default: "",
    },
    category: {
      type: objectid,
      ref: "category",
      default: "",
    },
    language: {
      type: objectid,
      ref: "different_Languages",
      default: "",
    },
    militaryService: {
      type: String,
      default: "",
    },
    DateOfBirth: {
      type: String,
      default: "",
    },
    licienceNumber: {
      type: String,
      default: "",
    },

    ////////////////////////////////////

    companyName: {
      type: String,
      default: "",
    },
    jobTitle: {
      type: String,
      default: "",
    },
    vehicletype: {
      type: objectid,
      ref: "vehicletype",
      default: "",
    },
    starttime: {
      type: String,
      default: "",
    },
    endtime: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },

    /////////////////////

    frontImage: {
      type: String,
      default: "",
    },
    backImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("driver", driverSchema);
