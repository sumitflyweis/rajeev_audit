const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const driver_experienceSchema = mongoose.Schema(
  {
    driverId:{
        type:objectid,
        ref:"driver"
    },
    companyName: {
      type: String,
    },
    jobTitle:{
        type:String
    },
    vehicletype:{
        type:objectid,
        ref:"vehicletype"
    },
    starttime:{
        type:String
    },
    endtime:{
        type:String
    },
    status:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("driver_experience", driver_experienceSchema);
