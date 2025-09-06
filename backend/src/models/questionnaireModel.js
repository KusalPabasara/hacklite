const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Get all questionnaire questions
const getQuestionnaireQuestions = async () => {
  try {
    const result = await pool.query(
      'SELECT * FROM questionnaire_questions ORDER BY id ASC'
    );
    
    // Transform the data to match frontend expectations
    return result.rows.map(question => ({
      ...question,
      // Extract options array from the nested JSONB structure
      options: question.options?.options || []
    }));
  } catch (error) {
    console.error('Error fetching questionnaire questions:', error);
    throw error;
  }
};

// Save user questionnaire answers
const saveQuestionnaireAnswers = async (userId, answers) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Delete existing answers for this user
    await client.query('DELETE FROM questionnaire_answers WHERE user_id = $1', [userId]);
    
    // Insert new answers
    for (const answer of answers) {
<<<<<<< HEAD
      await client.query(
        'INSERT INTO questionnaire_answers (user_id, question_id, answer) VALUES ($1, $2, $3)',
        [userId, answer.questionId, answer.answer]
=======
      // Convert answer to JSON format for jsonb column
      const answerJson = JSON.stringify(answer.answer);
      await client.query(
        'INSERT INTO questionnaire_answers (user_id, question_id, answer) VALUES ($1, $2, $3)',
        [userId, answer.questionId, answerJson]
>>>>>>> c2fbe43 (Initial commit)
      );
    }
    
    // Update user questionnaire completion status
    await client.query(
      'UPDATE users SET questionnaire_completed = TRUE, questionnaire_completed_at = CURRENT_TIMESTAMP WHERE id = $1',
      [userId]
    );
    
    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Get user questionnaire answers
const getUserQuestionnaireAnswers = async (userId) => {
  const result = await pool.query(
    'SELECT qa.*, qq.question_text, qq.question_type, qq.options, qq.career_weight FROM questionnaire_answers qa JOIN questionnaire_questions qq ON qa.question_id = qq.id WHERE qa.user_id = $1 ORDER BY qa.question_id',
    [userId]
  );
<<<<<<< HEAD
  return result.rows;
=======
  
  // Parse the JSON answers back to their original format
  return result.rows.map(row => {
    let parsedAnswer = row.answer;
    
    // If answer is a string, try to parse it as JSON
    if (typeof row.answer === 'string') {
      try {
        parsedAnswer = JSON.parse(row.answer);
      } catch (error) {
        // If parsing fails, it might be a simple string value, keep it as is
        parsedAnswer = row.answer;
      }
    }
    
    return {
      ...row,
      answer: parsedAnswer
    };
  });
>>>>>>> c2fbe43 (Initial commit)
};

// Calculate career recommendations based on answers
const calculateCareerRecommendations = async (userId) => {
  const answers = await getUserQuestionnaireAnswers(userId);
  console.log('🔍 Calculating recommendations for user:', userId, 'with', answers.length, 'answers');
  
  // Get all careers
  const careersResult = await pool.query('SELECT * FROM careers');
  const careers = careersResult.rows;
  console.log('📚 Found', careers.length, 'careers to evaluate');
  
  const recommendations = [];
  
  for (const career of careers) {
    let totalScore = 0;
    let questionCount = 0;
    
    for (const answer of answers) {
      if (answer.career_weight) {
        const weights = answer.career_weight;
        
        // Map career titles to keys for new careers
        let weightKey = '';
        if (career.title.includes('German Technical')) {
          weightKey = 'german_tech';
        } else if (career.title.includes('VTA') || career.title.includes('Vocational Training')) {
          weightKey = 'vta';
        } else if (career.title.includes('NTS') || career.title.includes('Nursing Training')) {
          weightKey = 'nts';
        }
        
        if (weightKey && weights[weightKey]) {
          const answerValue = answer.answer;
          if (typeof answerValue === 'string' && weights[weightKey][answerValue] !== undefined) {
            totalScore += weights[weightKey][answerValue];
            questionCount++;
          } else if (Array.isArray(answerValue)) {
            // Handle multiple selections
            let maxScore = 0;
            for (const val of answerValue) {
              if (weights[weightKey][val] !== undefined) {
                maxScore = Math.max(maxScore, weights[weightKey][val]);
              }
            }
            totalScore += maxScore;
            questionCount++;
          }
        }
      }
    }
    
    if (questionCount > 0) {
      const averageScore = totalScore / questionCount;
      recommendations.push({
        career_id: career.id,
        career_title: career.title,
        career_category: career.category,
        match_score: Math.round(averageScore * 100) / 100
      });
    }
  }
  
  // If no specific recommendations found, provide fallback recommendations based on career categories
  if (recommendations.length === 0) {
    console.log('⚠️ No specific recommendations found, providing fallback recommendations');
    
    // Get user's education level from answers
    const educationAnswer = answers.find(a => a.question_id === 1);
    const educationLevel = educationAnswer ? educationAnswer.answer : 'olevels';
    console.log('🎓 Education level detected:', educationLevel);
    
          // Provide fallback recommendations based on education level for new careers
      for (const career of careers) {
        let fallbackScore = 0.5; // Base score
        
        // Adjust score based on education level and career category
        if (career.category === 'Technical') {
          if (educationLevel === 'olevels') {
            fallbackScore = 0.9; // VTA is perfect for O/L graduates
          } else if (educationLevel === 'alevels') {
            fallbackScore = 0.8; // Good for A/L graduates
          } else if (educationLevel === 'degree') {
            fallbackScore = 0.7; // German Tech good for degree holders
          }
        } else if (career.category === 'Healthcare') {
          if (educationLevel === 'alevels' || educationLevel === 'degree') {
            fallbackScore = 0.9; // NTS perfect for A/L and degree holders
          } else if (educationLevel === 'diploma') {
            fallbackScore = 0.8;
          }
        }
        
        recommendations.push({
          career_id: career.id,
          career_title: career.title,
          career_category: career.category,
          match_score: Math.round(fallbackScore * 100) / 100
        });
      }
  }
  
  // Sort by match score descending
  recommendations.sort((a, b) => b.match_score - a.match_score);
  
  // Save recommendations to database
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Delete existing recommendations
    await client.query('DELETE FROM user_career_recommendations WHERE user_id = $1', [userId]);
    
    // Insert new recommendations
    for (const rec of recommendations) {
      await client.query(
        'INSERT INTO user_career_recommendations (user_id, career_id, match_score) VALUES ($1, $2, $3)',
        [userId, rec.career_id, rec.match_score]
      );
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
  
  console.log('🎯 Final recommendations:', recommendations.length, 'careers recommended');
  return recommendations;
};

// Get user career recommendations
const getUserCareerRecommendations = async (userId) => {
  const result = await pool.query(
    `SELECT ucr.*, c.title, c.category, c.description, c.roadmap 
     FROM user_career_recommendations ucr 
     JOIN careers c ON ucr.career_id = c.id 
     WHERE ucr.user_id = $1 
     ORDER BY ucr.match_score DESC`,
    [userId]
  );
  return result.rows;
};

// Check if user has completed questionnaire
const hasUserCompletedQuestionnaire = async (userId) => {
  const result = await pool.query(
    'SELECT questionnaire_completed FROM users WHERE id = $1',
    [userId]
  );
  return result.rows[0]?.questionnaire_completed || false;
};

module.exports = {
  getQuestionnaireQuestions,
  saveQuestionnaireAnswers,
  getUserQuestionnaireAnswers,
  calculateCareerRecommendations,
  getUserCareerRecommendations,
  hasUserCompletedQuestionnaire,
};
