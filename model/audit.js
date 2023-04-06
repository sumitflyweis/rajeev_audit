const mongoose = require("mongoose");

const auditSchema = mongoose.Schema({
  siteId: {
    type: String,
  },
  siteName: {
    type: String,
  },
  inspectorName: {
    type: String,
  },
  clientName: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: String,
  },
  address: {
    type: String,
  },
  auditRequirements: [
    {
      type: String,
    },
  ],
  uploadFileFromYourDevice: {
    type: String,
  },
});

const auditModel = mongoose.model("audit", auditSchema);

module.exports = auditModel;
