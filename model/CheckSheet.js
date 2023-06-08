const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const checkSheetSchema = mongoose.Schema({
  nameOfCheckSheet: {
    type: String,
    default: "",
  },
  revisionNumber: { 
    type: String ,
    default: ""
  },
  addQuestionForInspect: [
    {
      isAnswer:{
        type:Boolean,
        default:false
      },
      question: {
        type: String,
        default: ""
      },
      type: { 
        type: String,
        default: ""
       },
      answer: {
        type: String,
        default: "select",
      },
    },
    ],
  uploadDocument: {
    type: String,
    default: ""
  },
  siteId: {
    type: objectid,
    ref: "site",
  },
  siteName: {
    type: String,
    default: ""
  },
  QA_CA_ID: {
    type: String,
    default: ""
  },
  client: {
    type: String,
    default: ""
  },
  circle: {
    type: String,
    default: ""
  },
  address:{
    type:String,
    default:""
  },
  auditDate:{
    type:String,
    default:""
  },
  location:{
    type:String,
    default:""
  }
});

const checkSheetModel = mongoose.model("checkSheet", checkSheetSchema);

module.exports = checkSheetModel;
