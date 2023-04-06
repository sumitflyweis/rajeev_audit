const mongoose = require("mongoose");

const reviewerSchema = mongoose.Schema({
  reviewerId: {
    type: String,
  },
  reviewerName: {
    type: String,
  },
  auditRequirements: [{
    type: String,
  }],
  address: {
    type: String,
  },
  uploadFileFromYourDevice:{
    type:String
  }
});

const reviewerModel = mongoose.model("reviewer", reviewerSchema);

module.exports = reviewerModel;
