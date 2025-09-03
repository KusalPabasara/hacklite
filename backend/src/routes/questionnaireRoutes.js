const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  getQuestions,
  submitAnswers,
  getRecommendations,
  checkCompletion,
  getUserAnswers,
} = require('../controllers/questionnaireController');

// Public route - no auth required
router.get('/questions', getQuestions);

// Protected routes - auth required
router.use(verifyToken);

// Submit questionnaire answers
router.post('/submit', submitAnswers);

// Get user's career recommendations
router.get('/recommendations', getRecommendations);

// Check if user has completed questionnaire
router.get('/completion', checkCompletion);

// Get user's questionnaire answers
router.get('/answers', getUserAnswers);

module.exports = router;
