const express = require("express");
const router = express.Router();
const reviewerController = require("../controllers/admin/reviewer");

router.post("/admin/createReviewer", reviewerController.createReviewer);
router.get("/admin/getAllReviewer", reviewerController.getAllReviewers);
router.get("/admin/getByIdReviewer/:id", reviewerController.getReviewerById);
router.put("/admin/updateReviewer/:id", reviewerController.updateReviewerById);
router.delete("/admin/deleteReviewer/:id", reviewerController.deleteReviewerById);

module.exports = router;