const {
  getQuestionnaireQuestions,
  saveQuestionnaireAnswers,
  getUserQuestionnaireAnswers,
  calculateCareerRecommendations,
  getUserCareerRecommendations,
  hasUserCompletedQuestionnaire,
} = require('../models/questionnaireModel');

// Get questionnaire questions
const getQuestions = async (req, res) => {
  try {
    console.log('🔍 Fetching questionnaire questions...');
    const questions = await getQuestionnaireQuestions();
    console.log('✅ Questions fetched:', questions.length);
    console.log('📝 Sample question structure:', questions[0]);
    res.json(questions);
  } catch (error) {
    console.error('❌ Error fetching questionnaire questions:', error);
    res.status(500).json({ error: 'Failed to fetch questionnaire questions' });
  }
};

// Submit questionnaire answers
const submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.id;

    console.log('📝 Questionnaire submission received:', { userId, answersCount: answers?.length });

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid answers format' });
    }

    // Save answers
    await saveQuestionnaireAnswers(userId, answers);
    console.log('✅ Answers saved successfully');

    // Calculate career recommendations
    const recommendations = await calculateCareerRecommendations(userId);
    console.log('🎯 Career recommendations calculated:', recommendations.length);

    res.json({
      message: 'Questionnaire submitted successfully',
      recommendations: recommendations.slice(0, 3) // Return top 3 recommendations
    });
  } catch (error) {
    console.error('❌ Error submitting questionnaire:', error);
    res.status(500).json({ error: 'Failed to submit questionnaire' });
  }
};

// Get user's career recommendations
const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const recommendations = await getUserCareerRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching career recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch career recommendations' });
  }
};

// Check if user has completed questionnaire
const checkCompletion = async (req, res) => {
  try {
    const userId = req.user.id;
    const completed = await hasUserCompletedQuestionnaire(userId);
    res.json({ completed });
  } catch (error) {
    console.error('Error checking questionnaire completion:', error);
    res.status(500).json({ error: 'Failed to check questionnaire completion' });
  }
};

// Get user's questionnaire answers
const getUserAnswers = async (req, res) => {
  try {
    const userId = req.user.id;
    const answers = await getUserQuestionnaireAnswers(userId);
    res.json(answers);
  } catch (error) {
    console.error('Error fetching user answers:', error);
    res.status(500).json({ error: 'Failed to fetch user answers' });
  }
};

module.exports = {
  getQuestions,
  submitAnswers,
  getRecommendations,
  checkCompletion,
  getUserAnswers,
};
