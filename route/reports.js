const express = require("express");
const router = express.Router();

const checkSheetController = require("../controllers/admin/report");

// GET check sheets with answer
router.get(
  "/checksheet/question/:questionIndex/answer/:answer",
  checkSheetController.getCheckSheetsWithAnswer
);

module.exports = router;
