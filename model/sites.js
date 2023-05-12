const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const siteSchema = mongoose.Schema({
  QA_CA_ID: {
    type: String,
  },
  siteName: {
    type: String,
  },
  email: {
    type: String,
  },
  circle: {
    type: String,
  },

  location:{
    type:String
  },

  // longitude: {
  //   type: String,
  // },
  // latitude: {
  //   type: String,
  // },

  address: {
    type: String,
  },
  // clientId: {
  //   type: objectid,
  //   ref: "client",
  // },
  // clientName: {
  //   type: String,
  // },
  dateAllocated: {
    type: String,
  },
  dueDate: {
    type: String,
  },
  dateAuditScheduled: {
    type: String,
  },
  InspectorName: {
    type: String,
  },
  dateActualAudit: {
    type: String,
  },
  reviewerName: {
    type: String,
  },
  dateReviewed: {
    type: String,
  },
  // clientRepName: {
  //   type: String,
  // },
  DateClient: {
    type: String,
  },
  uploadFileFromDevice: {
    type: String,
  },
});

const siteModel = mongoose.model("site", siteSchema);

module.exports = siteModel;
