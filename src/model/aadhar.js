const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const aadharSchema = mongoose.Schema(
  {
    authid: {
      type: objectid,
      ref: "Auth_Employee_Owner",
      default: "",
    },
    driverId: {
      type: objectid,
      ref:"driver"
    },
    driverExperience: {
      type: objectid,
      ref:"driver_experience"
    },
    frontImage:{
        type:String,
        default:""
    },
    backImage:{
        type:String,
        default:""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("aadhar", aadharSchema);
