const mongoose = require("mongoose");

const siteSchema = mongoose.Schema({
  QA_CA_ID: {
    type: String,
  },
  siteId: {
    type: String,
  },
  circle: {
    type: String,
  },
  location: {
    type: String,
  },
  address: {
    type: String,
  },
  clientName: {
    type: String,
  },
  date: {
    type: String,
  },
  allocateSiteToInspector: {
    type: String,
  },
  uploadFileFromDevice: {
    type: String,
  },
});

const siteModel = mongoose.model("site", siteSchema);

module.exports = siteModel;
