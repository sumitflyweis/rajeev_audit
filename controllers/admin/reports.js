const reportModel = require("../../model/reports")
const Audit = require("../../model/audit");

// Create a new report
exports.createReport = async (req,res) => {
  const report = new reportModel(req.body);
  const savedReport = await report.save();
  return savedReport;
};

// Get all reports
exports.getAllReports = async () => {
  const allReports = await reportModel.find();
  return allReports;
};

// Get a specific report by ID
exports.getReportById = async (id) => {
  const report = await reportModel.findById(id);
  return report;
};

// Update a report by ID
exports.updateReportById = async (id, newData) => {
  const report = await reportModel.findById(id);
  if (newData.siteId != null) {
    report.siteId = newData.siteId;
  }
  if (newData.siteName != null) {
    report.siteName = newData.siteName;
  }
  if (newData.reportId != null) {
    report.reportId = newData.reportId;
  }
  if (newData.date != null) {
    report.date = newData.date;
  }
  if (newData.time != null) {
    report.time = newData.time;
  }
  if (newData.download != null) {
    report.download = newData.download;
  }
  const updatedReport = await report.save();
  return updatedReport;
};

// Delete a report by ID
exports.deleteReportById = async (id) => {
  const report = await reportModel.findById(id);
  await report.remove();
};

// Get reports by site ID and site name
exports.getReportsBySite = async (siteId, siteName) => {
  const siteReports = await reportModel.find({ siteId, siteName });
  return siteReports;
};


