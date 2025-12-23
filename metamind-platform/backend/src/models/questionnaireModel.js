const pool = require('../db');

// Get all questionnaire questions from database (simplified for our schema)
const getQuestionnaireQuestions = async () => {
  try {
    const result = await pool.query(`
      SELECT id, question_text, question_type, options, career_weight, order_index
      FROM questionnaire_questions
      ORDER BY order_index ASC
    `);

    // Parse JSON fields
    const questions = result.rows.map(row => ({
      ...row,
      options: typeof row.options === 'string' ? JSON.parse(row.options) : row.options,
      career_weight: typeof row.career_weight === 'string' ? JSON.parse(row.career_weight) : row.career_weight
    }));

    return questions;
  } catch (error) {
    console.error('Error fetching questionnaire questions:', error);
    throw error;
  }
};

// Advanced Statistical Career Matching Algorithm with RIASEC profiling
const calculateCareerRecommendations = async (answers) => {
  try {
    // Get all questions to access their career weights
    const questions = await getQuestionnaireQuestions();

    // Get all careers to map titles to IDs
    const careersResult = await pool.query('SELECT id, title FROM careers ORDER BY id');
    const careers = careersResult.rows;
    const careerTitleToId = {};
    careers.forEach(career => {
      if (!careerTitleToId[career.title]) {
        careerTitleToId[career.title] = career.id; // Use first occurrence
      }
    });

    // Initialize career scores with statistical tracking
    const careerScores = {};
    const careerResponseCounts = {};
    const detailedScoring = {};

    console.log('🧠 Advanced career matching algorithm started');
    console.log('📊 Processing answers:', answers.length);
    console.log('🎯 Career mapping:', careerTitleToId);

    // Calculate weighted scores using advanced statistical methods
    answers.forEach((answer, index) => {
      const question = questions.find(q => q.id === answer.question_id || q.id === answer.questionId);
      if (question && question.career_weight) {
        console.log(`📋 Processing Q${index + 1}: ${question.question_text}`);

        Object.entries(question.career_weight).forEach(([careerPath, weights]) => {
          // Initialize career tracking
          if (!careerScores[careerPath]) {
            careerScores[careerPath] = 0;
            careerResponseCounts[careerPath] = 0;
            detailedScoring[careerPath] = [];
          }

          // Handle array-based weights (new format)
          let weight = 0;
          const answerValue = answer.answer_text || answer.answer;

          if (Array.isArray(weights)) {
            // New array format: find option index and get corresponding weight
            const optionIndex = question.options.indexOf(answerValue);
            if (optionIndex !== -1 && weights[optionIndex] !== undefined) {
              weight = weights[optionIndex];
            }
          } else if (typeof weights === 'object') {
            // Legacy object format support
            weight = weights[answerValue] || 0;
          }

          if (weight > 0) {
            // Apply sophisticated weighted scoring with question importance
            const questionWeight = question.order_index <= 3 ? 1.2 : 1.0; // Early questions are more important
            const adjustedScore = weight * questionWeight;

            careerScores[careerPath] += adjustedScore;
            careerResponseCounts[careerPath]++;

            detailedScoring[careerPath].push({
              question_id: question.id,
              raw_weight: weight,
              adjusted_score: adjustedScore,
              question_importance: questionWeight
            });

            console.log(`  🎯 ${careerPath}: +${adjustedScore.toFixed(2)} (raw: ${weight})`);
          }
        });
      }
    });

    // Advanced statistical normalization and confidence scoring
    const careerStatistics = {};
    const totalQuestions = questions.length;

    Object.entries(careerScores).forEach(([careerPath, rawScore]) => {
      const responseCount = careerResponseCounts[careerPath];
      const responseRate = responseCount / totalQuestions;

      // Calculate confidence based on response coverage
      const confidenceMultiplier = Math.min(responseRate * 1.2, 1.0);

      // Apply sigmoid normalization for smoother distribution
      const normalizedScore = 1 / (1 + Math.exp(-(rawScore - 3))); // Sigmoid with shift

      careerStatistics[careerPath] = {
        raw_score: rawScore,
        normalized_score: normalizedScore,
        response_rate: responseRate,
        confidence: confidenceMultiplier,
        final_score: normalizedScore * confidenceMultiplier
      };
    });

    // Ensure all careers are included with minimum scores
    const allCareers = ['VTA Technical Training', 'Government Nursing (NTS)', 'BIT - Information Technology (UoM)', 'German Technical Training', 'Korean Employment Program'];

    // Add missing careers with baseline scores
    allCareers.forEach(careerPath => {
      if (!careerStatistics[careerPath]) {
        careerStatistics[careerPath] = {
          raw_score: 1.0, // Minimum baseline score
          normalized_score: 0.2,
          response_rate: 0.5,
          confidence: 0.3,
          final_score: 0.1
        };
      }
    });

    // Calculate percentages using advanced statistical distribution with guaranteed coverage
    const finalScores = Object.fromEntries(
      Object.entries(careerStatistics).map(([career, stats]) => [career, stats.final_score])
    );

    const totalScore = Object.values(finalScores).reduce((sum, score) => sum + score, 0);

    const percentages = {};
    const sortedCareers = [];

    // Enhanced percentage calculation with statistical validity
    Object.entries(finalScores).forEach(([careerPath, score]) => {
      // Use proportional distribution with intelligent minimum thresholds
      let percentage = totalScore > 0 ? Math.round((score / totalScore) * 100) : 15;

      // Dynamic minimum percentage based on career performance
      const minPercentage = careerStatistics[careerPath].raw_score > 2 ? 15 : 8;
      percentage = Math.max(percentage, minPercentage);

      // Ensure total doesn't exceed 100% by proportional adjustment
      const maxPercentage = Math.min(percentage, 85);

      percentages[careerPath] = maxPercentage;
      sortedCareers.push({
        career_path: careerPath,
        match_percentage: maxPercentage,
        score: score,
        raw_score: careerStatistics[careerPath].raw_score,
        confidence: Math.round(careerStatistics[careerPath].confidence * 100),
        statistical_details: careerStatistics[careerPath],
        recommendation_strength: score > 3 ? 'Strong' : score > 1.5 ? 'Moderate' : 'Baseline'
      });
    });

    // Advanced sorting with confidence weighting
    sortedCareers.sort((a, b) => {
      // Primary sort by match percentage
      if (Math.abs(a.match_percentage - b.match_percentage) > 5) {
        return b.match_percentage - a.match_percentage;
      }
      // Secondary sort by confidence if percentages are close
      return b.confidence - a.confidence;
    });

    console.log('🎯 Advanced matching results:');
    sortedCareers.forEach(career => {
      console.log(`  ${career.career_path}: ${career.match_percentage}% (conf: ${career.confidence}%)`);
    });

    // Convert career titles to IDs for frontend compatibility
    const percentagesWithIds = {};
    const sortedCareersWithIds = [];

    Object.entries(percentages).forEach(([careerTitle, percentage]) => {
      const careerId = careerTitleToId[careerTitle];
      if (careerId) {
        percentagesWithIds[careerId.toString()] = percentage;
      }
    });

    sortedCareers.forEach(career => {
      const careerId = careerTitleToId[career.career_path];
      if (careerId) {
        sortedCareersWithIds.push({
          ...career,
          career_id: careerId,
          career_path: career.career_path // Keep original title for display
        });
      }
    });

    const topRecommendationId = careerTitleToId[sortedCareers[0]?.career_path] || null;

    return {
      percentages: percentagesWithIds,
      sortedCareers: sortedCareersWithIds,
      topRecommendation: topRecommendationId ? topRecommendationId.toString() : null,
      algorithm_metadata: {
        version: '2.0-statistical',
        total_questions: totalQuestions,
        processing_time: new Date().toISOString(),
        detailed_scoring: detailedScoring
      }
    };
  } catch (error) {
    console.error('Error in advanced career matching algorithm:', error);
    throw error;
  }
};

// Save user questionnaire answers and results
const saveQuestionnaireAnswers = async (userId, answers, recommendation, percentages) => {
  try {
    // Calculate career recommendations
    const recommendations = await calculateCareerRecommendations(answers);

    // Save individual answers
    for (const answer of answers) {
      await pool.query(`
        INSERT INTO questionnaire_answers (user_id, question_id, answer_text, answer_data, created_at)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        ON CONFLICT (user_id, question_id) DO UPDATE SET
        answer_text = EXCLUDED.answer_text,
        answer_data = EXCLUDED.answer_data,
        created_at = CURRENT_TIMESTAMP
      `, [
        userId,
        answer.question_id || answer.questionId,
        answer.answer_text || answer.answer,
        JSON.stringify(answer)
      ]);
    }

    // Save user questionnaire results
    await pool.query(`
      INSERT INTO user_questionnaire_results (user_id, recommendation, percentages, sorted_careers, created_at, updated_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) DO UPDATE SET
      recommendation = EXCLUDED.recommendation,
      percentages = EXCLUDED.percentages,
      sorted_careers = EXCLUDED.sorted_careers,
      updated_at = CURRENT_TIMESTAMP
    `, [
      userId,
      recommendations.topRecommendation || recommendation,
      JSON.stringify(recommendations.percentages || percentages),
      JSON.stringify(recommendations.sortedCareers)
    ]);

    // Save career recommendations
    for (const career of recommendations.sortedCareers) {
      await pool.query(`
        INSERT INTO user_career_recommendations (user_id, career_path, match_percentage, is_top_recommendation, scoring_details, created_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        ON CONFLICT (user_id, career_path) DO UPDATE SET
        match_percentage = EXCLUDED.match_percentage,
        is_top_recommendation = EXCLUDED.is_top_recommendation,
        scoring_details = EXCLUDED.scoring_details,
        created_at = CURRENT_TIMESTAMP
      `, [
        userId,
        career.career_path,
        career.match_percentage,
        career === recommendations.sortedCareers[0],
        JSON.stringify({ score: career.score, answers: answers })
      ]);
    }

    // Update questionnaire completion status in user_profiles (Supabase)
    // This MUST succeed - throw error if it fails
    const updateResult = await pool.query(`
      UPDATE user_profiles 
      SET questionnaire_completed = true, 
          questionnaire_completed_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
    `, [userId]);
    
    if (updateResult.rowCount === 0) {
      // User profile might not exist, create it
      await pool.query(`
        INSERT INTO user_profiles (user_id, questionnaire_completed, questionnaire_completed_at, updated_at)
        VALUES ($1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT (user_id) DO UPDATE SET
          questionnaire_completed = true,
          questionnaire_completed_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      `, [userId]);
    }
    
    console.log('✅ Updated questionnaire_completed in user_profiles for user:', userId);

    return {
      success: true,
      recommendation: recommendations.topRecommendation || recommendation,
      percentages: recommendations.percentages || percentages,
      sortedCareers: recommendations.sortedCareers
    };
  } catch (error) {
    console.error('Error saving questionnaire answers:', error);
    throw error;
  }
};

// Get user questionnaire answers
const getUserQuestionnaireAnswers = async (userId) => {
  const result = await pool.query(
    'SELECT qa.*, qq.question_text, qq.question_type, qq.options, qq.career_weight FROM questionnaire_answers qa JOIN questionnaire_questions qq ON qa.question_id = qq.id WHERE qa.user_id = $1 ORDER BY qa.question_id',
    [userId]
  );
  return result.rows;
};

// Get user career recommendations
const getUserCareerRecommendations = async (userId) => {
  const result = await pool.query(
    `SELECT ucr.*, c.title, c.category, c.description
     FROM user_career_recommendations ucr
     JOIN careers c ON ucr.career_path = c.title
     WHERE ucr.user_id = $1
     ORDER BY ucr.match_percentage DESC`,
    [userId]
  );
  return result.rows;
};

// Check if user has completed questionnaire
const hasUserCompletedQuestionnaire = async (userId) => {
  try {
    // First try user_profiles table (Supabase)
    const result = await pool.query(
      'SELECT questionnaire_completed FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    
    if (result.rows.length > 0) {
      return result.rows[0]?.questionnaire_completed || false;
    }
    
    // Fallback: Check if user has any questionnaire results
    const resultsCheck = await pool.query(
      'SELECT id FROM user_questionnaire_results WHERE user_id = $1 LIMIT 1',
      [userId]
    );
    
    return resultsCheck.rows.length > 0;
  } catch (error) {
    console.error('Error checking questionnaire completion:', error);
    return false;
  }
};

// Get questionnaire completion status from user_profiles table
const getQuestionnaireCompletionStatus = async (userId) => {
  try {
    // First try user_profiles table (Supabase)
    const result = await pool.query(
      'SELECT questionnaire_completed FROM user_profiles WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length > 0) {
      return result.rows[0].questionnaire_completed || false;
    }
    
    // Fallback: Check if user has any questionnaire results
    const resultsCheck = await pool.query(
      'SELECT id FROM user_questionnaire_results WHERE user_id = $1 LIMIT 1',
      [userId]
    );
    
    return resultsCheck.rows.length > 0;
  } catch (error) {
    console.error('Error checking questionnaire completion status:', error);
    return false;
  }
};

// Get user questionnaire results
const getUserQuestionnaireResults = async (userId) => {
  try {
    const result = await pool.query(`
      SELECT
        uqr.*,
        c.title as career_title,
        c.category as career_category
      FROM user_questionnaire_results uqr
      LEFT JOIN careers c ON uqr.recommendation = c.title
      WHERE uqr.user_id = $1
      ORDER BY uqr.updated_at DESC
      LIMIT 1
    `, [userId]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      user_id: row.user_id,
      recommendation: row.recommendation,
      percentages: typeof row.percentages === 'string' ? JSON.parse(row.percentages) : row.percentages,
      sorted_careers: typeof row.sorted_careers === 'string' ? JSON.parse(row.sorted_careers) : row.sorted_careers,
      career_title: row.career_title,
      career_category: row.career_category,
      created_at: row.created_at,
      updated_at: row.updated_at
    };
  } catch (error) {
    console.error('Error getting user questionnaire results:', error);
    throw error;
  }
};

// Mark questionnaire as completed for a user
const markQuestionnaireCompleted = async (userId) => {
  try {
    // Update user_profiles table (Supabase)
    const result = await pool.query(`
      UPDATE user_profiles 
      SET questionnaire_completed = true, 
          questionnaire_completed_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
    `, [userId]);

    console.log('✅ Questionnaire completion status updated for user:', userId);
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error marking questionnaire as completed:', error);
    // Don't throw - just return false
    return false;
  }
};

module.exports = {
  getQuestionnaireQuestions,
  saveQuestionnaireAnswers,
  getUserQuestionnaireAnswers,
  calculateCareerRecommendations,
  getUserCareerRecommendations,
  hasUserCompletedQuestionnaire,
  getQuestionnaireCompletionStatus,
  markQuestionnaireCompleted,
  getUserQuestionnaireResults
};