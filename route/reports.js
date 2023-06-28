const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/admin/reports");


router.post("/", reportsController.createReport);

// Get all reports
router.get("/", reportsController.getAllReports);

// Get a single report by ID
router.get("/:id", reportsController.getReportById);

// Update a report
router.put("/:id", reportsController.updateReport);

// Delete a report
router.delete("/:id", reportsController.deleteReport);

module.exports = router;

// router.post("/admin/createReport", reportsController.createReport);
// router.get("/admin/getAllReports", reportsController.getAllReports);
// router.get("/admin/getReportById/:id", reportsController.getReportById);
// router.put("/admin/updateReportById/:id", reportsController.updateReportById);
// router.delete("/admin/deleteReportById/:id", reportsController.deleteReportById);
// router.delete("/admin/getReportsBySite/:id", reportsController.getReportsBySite);
