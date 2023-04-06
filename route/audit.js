const express = require("express");
const router = express.Router();
const auditController = require("../controllers/admin/audit");

router.get("/admin/getAll/getAllAudits", auditController.getAllAudits);
router.get("/admin/get/getAuditById/:id", auditController.getAuditById);
router.post("/admin/create/createAudit", auditController.createAudit);
router.put("/admin/update/updateAudit/:id", auditController.updateAudit);
router.delete("/admin/delete/deleteAudit/:id", auditController.deleteAudit);

module.exports = router;
