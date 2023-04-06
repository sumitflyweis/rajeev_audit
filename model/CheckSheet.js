const mongoose = require("mongoose");

const checkSheetSchema = mongoose.Schema({
  nameOfCheckSheet: { type: String },
  revisionNumber: { type: String },
  addQuestionForInspect:{type: String},
  type:{type: String},
  
});

const checkSheetModel = mongoose.model("checkSheet", checkSheetSchema);

module.exports = checkSheetModel;
