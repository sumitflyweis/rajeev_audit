const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/admin/reports");

router.post("/admin/createReport", reportsController.createReport);
router.get("/admin/getAllReports", reportsController.getAllReports);
router.get("/admin/getReportById/:id", reportsController.getReportById);
router.put("/admin/updateReportById/:id", reportsController.updateReportById);
router.delete("/admin/deleteReportById/:id", reportsController.deleteReportById);
router.delete("/admin/getReportsBySite/:id", reportsController.getReportsBySite);

module.exports = router;