const express = require("express");
const router = express.Router();

const checkSheetController = require("../controllers/admin/report");

// GET check sheet details based on answer
router.get(
  "/checksheet/:checkSheetId/question/:questionIndex/answer/:answer",
  checkSheetController.getCheckSheetDetails
);

module.exports = router;
