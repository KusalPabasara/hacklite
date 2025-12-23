const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getQuestions,
  submitAnswers,
  getRecommendations,
  checkCompletion,
  getUserAnswers,
  getQuestionnaireStatus,
  getSavedResults,
  getUserQuestionnaireResult,
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

// Alias for /completion (backwards compatibility)
router.get('/completed', checkCompletion);

// Get questionnaire completion status
router.get('/status', getQuestionnaireStatus);

// Get user's questionnaire answers
router.get('/answers', getUserAnswers);

// Get saved questionnaire results
router.get('/saved-results', getSavedResults);

// Get questionnaire result for My Career tab
router.get('/result', getUserQuestionnaireResult);

module.exports = router;
