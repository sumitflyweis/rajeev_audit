const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  siteId: {
    type: String,
  },
  siteName: {
    type: String,
  },
  reportId: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  download: {
    type: String,
  },
});

const reportModel = mongoose.model("report", reportSchema);

module.exports = reportModel;
