const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const subscriptionSchema = mongoose.Schema(
  {
    plan: {
      type: String,
    },
    price: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subscription", subscriptionSchema);




