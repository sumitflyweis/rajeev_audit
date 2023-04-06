const Audit = require("../../model/audit");

exports.getAllAudits = async (req, res) => {
  try {
    const audits = await Audit.find();
    res.status(200).json({ success: true, data: audits });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAuditById = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id);
    res.status(200).json({ success: true, data: audit });
  } catch (error) {
    res.status(404).json({ success: false, error: "Audit not found" });
  }
};

exports.createAudit = async (req, res) => {
  try {
    const audit = await Audit.create(req.body);
    res.status(201).json({ success: true, data: audit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: audit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteAudit = async (req, res) => {
  try {
    const audit = await Audit.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: audit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
