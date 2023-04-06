const mongoose = require("mongoose");

const inspectorSchema = mongoose.Schema({
  inspectorId: {
    type: String,
  },
  inspectorName: {
    type: String,
  },
  siteId: {
    type: String,
  },
  siteName: {
    type: String,
  },
  clientName: {
    type: String,
  },
  inspectionDate: {
    type: String,
  },
});

const inspectorModel = mongoose.model("inspector", inspectorSchema);

module.exports = inspectorModel;
