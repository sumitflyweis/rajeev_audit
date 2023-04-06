const express = require("express");
const router = express.Router();
const checkSheetController = require("../controllers/admin/CheckSheet");


//ADMIN
router.post("/admin/create/CheckSheet", checkSheetController.createCheckSheet);
router.get("/admin/getAll/checkSheet", checkSheetController.getAllCheckSheets);
router.get("/admin/getById/checkSheet/:id", checkSheetController.getCheckSheet);
router.patch("/admin/update/checkSheet/:id", checkSheetController.updateCheckSheet);
router.delete("/admin/delete/checkSheet/:id" , checkSheetController.deleteCheckSheet)


module.exports = router; 