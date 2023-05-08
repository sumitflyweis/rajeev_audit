const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const Employee_OwnerSchema = mongoose.Schema(
  {
    phone: {
      type: String,
    },
    otp:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth_Employee_Owner", Employee_OwnerSchema);
