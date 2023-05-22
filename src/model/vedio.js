const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const vedioSchema = mongoose.Schema(
  {
    vedio: {
        type: String,
        default:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplilearn.com%2Fimage-processing-article&psig=AOvVaw1kvCFmU96sIc0v4VgaPKW8&ust=1682860597316000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODu37iWz_4CFQAAAAAdAAAAABAE",
      },
    startTime: {
      type: String,
      default:""
    },
    endTime:{
        type:String,
        default:""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vedio", vedioSchema);


