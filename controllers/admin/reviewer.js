const Reviewer = require('../../model/reviewer');

exports.createReviewer = async (req, res) => {
  try {
    const reviewer = new Reviewer(req.body);
    await reviewer.save();
    res.status(201).json(reviewer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reviewer' });
  }
};

exports.getAllReviewers = async (req, res) => {
  try {
    const reviewers = await Reviewer.find();
    res.json(reviewers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting reviewers' });
  }
};

exports.getReviewerById = async (req, res) => {
  try {
    const reviewer = await Reviewer.findById(req.params.id);
    if (!reviewer) {
      res.status(404).json({ message: 'Reviewer not found' });
      return;
    }
    res.json(reviewer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting reviewer' });
  }
};

exports.updateReviewerById = async (req, res) => {
  try {
    const reviewer = await Reviewer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!reviewer) {
      res.status(404).json({ message: 'Reviewer not found' });
      return;
    }
    res.json(reviewer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating reviewer' });
  }
};

exports.deleteReviewerById = async (req, res) => {
  try {
    const reviewer = await Reviewer.findByIdAndDelete(req.params.id);
    if (!reviewer) {
      res.status(404).json({ message: 'Reviewer not found' });
      return;
    }
    res.json({ message: 'Reviewer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting reviewer' });
  }
};
