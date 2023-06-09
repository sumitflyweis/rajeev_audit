const CheckSheet = require("../../model/CheckSheet");

// CREATE a new check sheet
exports.createCheckSheet = async (req, res) => {
  try {
    const checkSheet = await CheckSheet(req.body);
    await checkSheet.save();
    res.status(201).json(checkSheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ all check sheets
exports.getAllCheckSheets = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.find();
    res.json({msg:checkSheets});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a single check sheet by ID
exports.getCheckSheetById = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findById(req.params.id);
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json({msg:checkSheet});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE a check sheet by ID
exports.addQuestionInID = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { $push: { addQuestionForInspect: { question: req.body.question,type: req.body.type }}},
      { new: true }
    );

    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json(checkSheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.updateCheckSheet = async (req, res) => {
  try {
    const { checkSheetId, questionId } = req.params;
    const { answer,isAnswer } = req.body;

    const updatedCheckSheet = await CheckSheet.updateOne(
      { _id: checkSheetId, "addQuestionForInspect._id": questionId },
      { $set: { "addQuestionForInspect.$.answer": answer,
      "addQuestionForInspect.$.isAnswer": isAnswer  } }
    );

    if (updatedCheckSheet.nModified === 0) {
      return res
        .status(404)
        .json({ error: "Question or checkSheet not found" });
    }

    res.json({ message: "Answer updated successfully", updatedCheckSheet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// exports.CheckAnswer = async (req, res) => {
//   try {
//     const checkSheet = await CheckSheet.findOne({ _id: req.params.id });

//     console.log(checkSheet);

//     if (!checkSheet) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }

//     const questionsWithAnswer = checkSheet.addQuestionForInspect.filter(
//       (q) => q.answer !== "select"
//     );
//     const questionsWithoutAnswer = checkSheet.addQuestionForInspect.filter(
//       (q) => q.answer === "select"
//     );

//     return res.status(200).json({
//       questionsWithAnswer,
//       questionsWithoutAnswer,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



// exports.CheckAnswer = async (req, res) => {
//   try {
//     const checkSheet = await CheckSheet.findOne({ _id: req.params.id });

//     console.log(checkSheet);

//     if (!checkSheet) {
//       return res.status(404).json({ message: "Check sheet not found" });
//     }

//     const questionsWithAnswer = checkSheet.addQuestionForInspect.filter(
//       (q) => q.answer !== "select" || q.isAnswer === true
//     );
//     const questionsWithoutAnswer = checkSheet.addQuestionForInspect.filter(
//       (q) => q.answer === "select" && q.isAnswer === false
//     );


//   let data = [questionsWithAnswer,questionsWithoutAnswer]
//     return res.status(200).json(
//       // questionsWithAnswer,
//       // questionsWithoutAnswer,
//       data
//     );
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


exports.CheckAnswer = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findOne({ _id: req.params.id });

    console.log(checkSheet);

    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }

    const questionsWithAnswer = checkSheet.addQuestionForInspect.filter(
      (q) => q.answer !== "select" || q.isAnswer === true
    );
    const questionsWithoutAnswer = checkSheet.addQuestionForInspect.filter(
      (q) => q.answer === "select" && q.isAnswer === false
    );

    // Shuffle the arrays
    shuffleArray(questionsWithAnswer);
    shuffleArray(questionsWithoutAnswer);

    return res.status(200).json([questionsWithAnswer, questionsWithoutAnswer]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Function to shuffle an array in-place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



// DELETE a check sheet by ID
exports.deleteCheckSheet = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findByIdAndDelete(req.params.id);
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json({ message: "Check sheet deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ a single check sheet by ID
exports.getCheckSheetBySiteId = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.find({ siteId: req.params.id });
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json({msg:checkSheet});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getCheckSheetBySiteIdandchecksheetid = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.find({ siteId: req.params.siteid , _id:req.params.checsheet });
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json({msg:checkSheet});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a check sheet by ID
exports.updatefields = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          nameOfCheckSheet: req.body.nameOfCheckSheet,
          revisionNumber: req.body.revisionNumber,
          type: req.body.type,
          uploadDocument: req.body.uploadDocument,
          QA_CA_ID: req.body.QA_CA_ID,
          client: req.body.client,
          circle: req.body.circle,
          auditDate:req.body.auditDate,
          address:req.body.address,
          location:req.body.location,
          siteName : req.body.siteName,
          siteId : req.body.siteId,
          uploadDocument:req.body.uploadDocument,
          
        },
      },
      { new: true }
    );
    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }
    res.json(checkSheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a check sheet by ID
exports.populatesiteid = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.find({
      siteId: req.params.id,
    }).populate("siteId"); // Populate the referenced siteId field

    if (checkSheets.length === 0) {
      return res.json([]);
    }
    return res.json({msg:checkSheets});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
