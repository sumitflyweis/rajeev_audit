const Inspector = require("../../model/inspector");

exports.createInspector = async (req, res) => {
  try {
    const inspector = new Inspector(req.body);
    const savedInspector = await inspector.save();
    res.status(201).json(savedInspector);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getInspectorById = async (req, res) => {
  try {
    const inspector = await Inspector.findOne({ inspectorId: req.params.id });
    if (!inspector) {
      return res.status(404).json({ message: "Inspector not found" });
    }
    res.json(inspector);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllInspectors = async (req, res) => {
  try {
    const inspectors = await Inspector.find();
    res.json(inspectors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInspectorById = async (req, res) => {
  try {
    const inspector = await Inspector.findOneAndUpdate(
      { inspectorId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!inspector) {
      return res.status(404).json({ message: "Inspector not found" });
    }
    res.json(inspector);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteInspectorById = async (req, res) => {
  try {
    const inspector = await Inspector.findOneAndDelete({ inspectorId: req.params.id });
    if (!inspector) {
      return res.status(404).json({ message: "Inspector not found" });
    }
    res.json(inspector);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
