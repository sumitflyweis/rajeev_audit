const CheckSheet = require("../../model/CheckSheet");

// CREATE
module.exports.createCheckSheet = async (req, res) => {
  try {
    const checkSheet = new CheckSheet(req.body);
    const result = await checkSheet.save();
   return res.status(201).json(result);
  } catch (err) {
  return  res.status(400).json({ message: err.message });
  }
}

// READ ALL
module.exports.getAllCheckSheets = async (req, res) => {
  try {
    const checkSheets = await CheckSheet.find();
   return res.json(checkSheets);
  } catch (err) {
   return res.status(500).json({ message: err.message });
  }
}

// READ ONE
module.exports.getCheckSheet = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findById(req.params.id);
    if (checkSheet == null) {
      return res.status(404).json({ message: "Cannot find check sheet" });
    }
   return res.json(checkSheet);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// UPDATE
module.exports.updateCheckSheet = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findById(req.params.id);
    if (checkSheet == null) {
      return res.status(404).json({ message: "Cannot find check sheet" });
    }
    if (req.body.nameOfCheckSheet != null) {
      checkSheet.nameOfCheckSheet = req.body.nameOfCheckSheet;
    }
    if (req.body.revisionNumber != null) {
      checkSheet.revisionNumber = req.body.revisionNumber;
    }
    if (req.body.addQuestionForInspect != null) {
      checkSheet.addQuestionForInspect = req.body.addQuestionForInspect;
    }
    if (req.body.type != null) {
      checkSheet.type = req.body.type;
    }
    const updatedCheckSheet = await checkSheet.save();
    return res.json(updatedCheckSheet);
  } catch (err) {
   return res.status(400).json({ message: err.message });
  }
}

// DELETE
module.exports.deleteCheckSheet = async (req, res) => {
  try {
    const checkSheet = await CheckSheet.findById(req.params.id);
    if (checkSheet == null) {
      return res.status(404).json({ message: "Cannot find check sheet" });
    }
    await checkSheet.remove();
   return res.json({ message: "Check sheet deleted" });
  } catch (err) {
   return res.status(500).json({ message: err.message });
  }
}


