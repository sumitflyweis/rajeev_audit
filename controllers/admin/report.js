const CheckSheet = require("../../model/CheckSheet");

exports.getCheckSheetDetails = async (req, res) => {
  try {
    const { checkSheetId, questionIndex, answer } = req.params;

    const checkSheet = await CheckSheet.findById(checkSheetId);

    if (!checkSheet) {
      return res.status(404).json({ message: "Check sheet not found" });
    }

    const question = checkSheet.addQuestionForInspect[questionIndex];

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (question.answer !== answer) {
      return res.status(404).json({ message: "Answer does not match" });
    }

    // If the answer matches, return the details of the check sheet
    res.status(200).json({ checkSheet });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
