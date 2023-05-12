const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const aadharSchema = mongoose.Schema(
  {
    driverId: {
      type: objectid,
      ref:"driver"
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
