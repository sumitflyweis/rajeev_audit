const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  clientName: { type: String },
  email: { type: String },
  phone:{type: String},
  // siteId: {
  //   type: String,
  // },
  // siteName: {
  //   type: String,
  // },
    
});

const clientModel = mongoose.model("client", clientSchema);

module.exports = clientModel;
