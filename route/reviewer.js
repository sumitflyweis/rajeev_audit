const express = require('express');
const router = express.Router();
const reviewerController = require('../controllers/admin/reviewer'); // Import the reviewer controller

// Create a new reviewer
router.post('/reviewers', reviewerController.createReviewer);

// Retrieve all reviewers with populated audit data
router.get('/reviewers', reviewerController.getAllReviewerspopulate);

// Retrieve a reviewer by ID with populated audit data
router.get('/reviewers/:id', reviewerController.getReviewerByIdpopulate);

// Update a reviewer by ID
router.put('/reviewers/:id', reviewerController.updateReviewerById);

// Delete a reviewer by ID
router.delete('/reviewers/:id', reviewerController.deleteReviewerById);

module.exports = router;
