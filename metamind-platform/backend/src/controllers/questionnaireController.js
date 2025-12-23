const pool = require('../db');
const {
  getQuestionnaireQuestions,
  saveQuestionnaireAnswers,
  getUserQuestionnaireAnswers,
  calculateCareerRecommendations,
  getUserCareerRecommendations,
  hasUserCompletedQuestionnaire,
  getQuestionnaireCompletionStatus,
  markQuestionnaireCompleted,
  getUserQuestionnaireResults
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

// Save career recommendations to database
const saveCareerRecommendation = async (userId, percentages, topRecommendation) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Delete any existing recommendations for this user
    await client.query(
      'DELETE FROM user_career_recommendations WHERE user_id = $1',
      [userId]
    );
    
    // Insert new recommendations - use the correct career path names
    for (const [career, percentage] of Object.entries(percentages)) {
      await client.query(
        `INSERT INTO user_career_recommendations 
         (user_id, career_path, match_percentage, is_top_recommendation) 
         VALUES ($1, $2, $3, $4)`,
        [userId, career, percentage, career === topRecommendation]
      );
    }
    
    await client.query('COMMIT');
    console.log('💾 Career recommendations saved to database');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Submit questionnaire answers
const submitAnswers = async (req, res) => {
  try {
    const { answers, recommendation, percentages, update = false } = req.body;
    const userId = req.user?.id;

    // Validate user ID
    if (!userId) {
      console.error('❌ Invalid user ID in questionnaire submission:', userId);
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    console.log('📝 Questionnaire submission received:', { 
      userId, 
      answersCount: answers?.length, 
      recommendation,
      percentages,
      update
    });

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid answers format' });
    }

    // Check if questionnaire already submitted (only if not updating)
    if (!update) {
      const existing = await getUserQuestionnaireResults(userId);

      if (existing) {
        console.log('📋 Questionnaire already submitted, returning existing results');
        return res.json({
          message: 'Questionnaire already submitted',
          result: existing,
          percentages: existing.percentages,
          topRecommendation: existing.recommendation
        });
      }
    }

    // Save answers and calculate recommendations using database-driven approach
    const result = await saveQuestionnaireAnswers(userId, answers, recommendation, percentages);
    console.log('✅ Answers and results saved successfully');

    res.json({
      message: 'Questionnaire submitted successfully',
      result: result,
      percentages: result.percentages,
      topRecommendation: result.recommendation,
      sortedCareers: result.sortedCareers
    });
  } catch (error) {
    console.error('❌ Error submitting questionnaire:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint
    });
    res.status(500).json({ 
      error: 'Failed to submit questionnaire',
      details: error.message 
    });
  }
};

// Get saved questionnaire results
const getSavedResults = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    const result = await pool.query(
      'SELECT * FROM user_questionnaire_results WHERE user_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No saved results found' });
    }
    
    const questionnaireResult = result.rows[0];
    console.log('📊 Retrieved saved results for user:', userId, questionnaireResult.percentages);
    
    res.json({
      completed: true,
      result: questionnaireResult,
      percentages: questionnaireResult.percentages,
      topRecommendation: questionnaireResult.recommendation
    });
  } catch (error) {
    console.error('❌ Error fetching saved results:', error);
    res.status(500).json({ error: 'Failed to fetch saved results' });
  }
};

// Get questionnaire result for My Career tab (optimized with fetch tracking)
const getUserQuestionnaireResult = async (req, res) => {
  try {
    const userId = req.user?.id;
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
    
    // Check completion status and last fetch time
    const completionStatus = await pool.query(
      `SELECT is_completed, last_fetched_at 
       FROM questionnaire_completion_status 
       WHERE user_id = $1`,
      [userId]
    );
    
    // If user hasn't completed questionnaire, return not completed
    if (completionStatus.rows.length === 0 || !completionStatus.rows[0].is_completed) {
      return res.json({ completed: false });
    }
    
    const lastFetchedAt = completionStatus.rows[0].last_fetched_at;
    
    // If we fetched results recently (within 5 minutes), return cached response
    if (lastFetchedAt && new Date(lastFetchedAt) > fiveMinutesAgo) {
      console.log('📊 Returning cached results (fetched recently)');
      
      const result = await pool.query(
        'SELECT * FROM user_questionnaire_results WHERE user_id = $1',
        [userId]
      );
      
      if (result.rows.length === 0) {
        return res.json({ completed: false });
      }
      
      const questionnaireResult = result.rows[0];
      return res.json({ 
        completed: true, 
        result: questionnaireResult,
        percentages: questionnaireResult.percentages,
        topRecommendation: questionnaireResult.recommendation,
        cached: true
      });
    }
    
    // Fetch fresh results and update last_fetched_at
    const result = await pool.query(
      'SELECT * FROM user_questionnaire_results WHERE user_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.json({ completed: false });
    }
    
    // Update last_fetched_at timestamp
    await pool.query(
      'UPDATE questionnaire_completion_status SET last_fetched_at = $1 WHERE user_id = $2',
      [now, userId]
    );
    
    const questionnaireResult = result.rows[0];
    console.log('📊 Retrieved fresh questionnaire result for user:', userId);
    
    res.json({ 
      completed: true, 
      result: questionnaireResult,
      percentages: questionnaireResult.percentages,
      topRecommendation: questionnaireResult.recommendation,
      cached: false
    });
  } catch (error) {
    console.error('❌ Error fetching questionnaire result:', error);
    res.status(500).json({ error: 'Failed to fetch questionnaire result' });
  }
};

// Get user's career recommendations
const getRecommendations = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    // Validate user ID
    if (!userId || isNaN(parseInt(userId))) {
      console.error('❌ Invalid user ID in recommendations fetch:', userId);
      return res.status(400).json({ error: 'Invalid user ID' });
    }

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
    const userId = req.user?.id;
    
    // Validate user ID (can be UUID string or integer)
    if (!userId) {
      console.error('❌ Missing user ID in questionnaire completion check');
      return res.status(400).json({ 
        error: 'Invalid user ID',
        completed: false 
      });
    }

    console.log('🔍 Checking questionnaire completion for user:', userId);
    const completed = await hasUserCompletedQuestionnaire(userId);
    console.log('✅ Questionnaire completion status:', completed);
    res.json({ completed });
  } catch (error) {
    console.error('❌ Error checking questionnaire completion:', error);
    res.status(500).json({ 
      error: 'Failed to check questionnaire completion',
      completed: false 
    });
  }
};

// Get user's questionnaire answers
const getUserAnswers = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    // Validate user ID (can be UUID string or integer)
    if (!userId) {
      console.error('❌ Missing user ID in answers fetch');
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const answers = await getUserQuestionnaireAnswers(userId);
    res.json(answers);
  } catch (error) {
    console.error('Error fetching user answers:', error);
    res.status(500).json({ error: 'Failed to fetch user answers' });
  }
};

// Get questionnaire completion status
const getQuestionnaireStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('🔍 Checking questionnaire status for user:', userId);
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const status = await getQuestionnaireCompletionStatus(userId);
    console.log('✅ Questionnaire status:', status);
    res.json({ questionnaireCompleted: status });
  } catch (error) {
    console.error('❌ Error checking questionnaire status:', error);
    res.status(500).json({ error: 'Failed to check questionnaire status' });
  }
};

module.exports = {
  getQuestions,
  submitAnswers,
  getRecommendations,
  checkCompletion,
  getUserAnswers,
  getQuestionnaireStatus,
  getSavedResults,
  getUserQuestionnaireResult
};
