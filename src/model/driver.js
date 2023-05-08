const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const driverSchema = mongoose.Schema(
  {
    authid:{
        type:objectid,
        ref:"Auth_Employee_Owner"
    },
    gender: {
      type: String,
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    ResumeTitle:{
        type:String
    },
    location:{
        type:objectid,
        ref:"location"
    },
    exactAddress:{
        type:String
    },
    category:{
        type:objectid,
        ref:"category"
    },
    language:{
        type:objectid,
        ref:"different_Languages"
    },
    militaryService:{
        type:String
    },
    DateOfBirth:{
        type:String
    },
    licienceNumber:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("driver", driverSchema);
