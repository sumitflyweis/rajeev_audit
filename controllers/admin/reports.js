const reportModel = require("../../model/reports")
const Audit = require("../../model/audit");
const CheckSheet = require("../../model/CheckSheet");


// Create a new report
exports.createReport = async (req, res) => {
  try {
    const { checksheetid, photo, remarks } = req.body;

    const newReport = new reportModel({
      checksheetid,
      photo,
      remarks,
    });

    const createdReport = await newReport.save();

    res.status(201).json(createdReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await reportModel.find().populate("checksheetid")

    res.json({msg:reports});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await reportModel.findById(req.params.id).populate("checksheetid")

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({msg:report})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a report
exports.updateReport = async (req, res) => {
  try {
    const { photo, remarks } = req.body;

    const report = await reportModel.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.photo = photo;
    report.remarks = remarks;

    const updatedReport = await report.save();

    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a report
exports.deleteReport = async (req, res) => {
  try {
    const report = await reportModel.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// // Create a new report
// exports.createReport = async (req,res) => {
//   const report = new reportModel(req.body);
//   const savedReport = await report.save();
//   return savedReport;
// };

// // Get all reports
// exports.getAllReports = async () => {
//   const allReports = await reportModel.find();
//   return allReports;
// };

// // Get a specific report by ID
// exports.getReportById = async (id) => {
//   const report = await reportModel.findById(id);
//   return report;
// };

// // Update a report by ID
// exports.updateReportById = async (id, newData) => {
//   const report = await reportModel.findById(id);
//   if (newData.siteId != null) {
//     report.siteId = newData.siteId;
//   }
//   if (newData.siteName != null) {
//     report.siteName = newData.siteName;
//   }
//   if (newData.reportId != null) {
//     report.reportId = newData.reportId;
//   }
//   if (newData.date != null) {
//     report.date = newData.date;
//   }
//   if (newData.time != null) {
//     report.time = newData.time;
//   }
//   if (newData.download != null) {
//     report.download = newData.download;
//   }
//   const updatedReport = await report.save();
//   return updatedReport;
// };

// // Delete a report by ID
// exports.deleteReportById = async (id) => {
//   const report = await reportModel.findById(id);
//   await report.remove();
// };

// // Get reports by site ID and site name
// exports.getReportsBySite = async (siteId, siteName) => {
//   const siteReports = await reportModel.find({ siteId, siteName });
//   return siteReports;
// };


