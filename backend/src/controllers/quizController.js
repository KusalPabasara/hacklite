// --- FIX: Correctly import getQuizById ---
const {
  getAllQuizzes,
  getQuizById, // Changed from getQuiz to getQuizById for consistency
  saveResult,
  getResultsByUser,
} = require("../models/quizModel");
const { saveUserRoadmap } = require("../models/roadmapModel");

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await getAllQuizzes();
    res.json(quizzes);
  } catch(err) {
    console.error("Failed to fetch quizzes", err);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

const getSingleQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await getQuizById(id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};

const submitQuiz = async (req, res) => {
    try {
      const user_id = req.user.id;
      const quiz_id = parseInt(req.params.id);
      const { answers } = req.body;
      
      // Enhanced career recommendation logic based on quiz answers
      let techScore = 0;
      let healthcareScore = 0;
      let designScore = 0;
      
      // Analyze answers to determine career fit
      // Get the quiz questions to understand context
      const quiz = await getQuizById(quiz_id);
      if (!quiz || !quiz.questions) {
        throw new Error("Quiz not found");
      }
      
      quiz.questions.forEach((question, index) => {
        const answer = answers[index];
        const answerLower = answer.toLowerCase();
        // Handle both original and transformed question structures
        const questionText = (question.q || question.question_text || '').toLowerCase();
        
        // Technology indicators
        if (answerLower === 'yes' && (questionText.includes('computer') || questionText.includes('code') || questionText.includes('tech') || questionText.includes('programming'))) {
          techScore += 2;
        }
        
        // Healthcare indicators
        if (answerLower === 'yes' && (questionText.includes('help') || questionText.includes('people') || questionText.includes('care') || questionText.includes('patient'))) {
          healthcareScore += 2;
        }
        
        // Design indicators
        if (answerLower === 'yes' && (questionText.includes('creativ') || questionText.includes('design') || questionText.includes('art') || questionText.includes('visual'))) {
          designScore += 2;
        }
        
        // Tool usage can indicate various careers
        if (answerLower === 'yes' && questionText.includes('tool')) {
          techScore += 1;
          healthcareScore += 1;
        }
        
        // Problem solving indicates tech
        if (answerLower === 'yes' && questionText.includes('problem')) {
          techScore += 1;
        }
      });
      
      // Determine the best career category
      let suggestedCategory = 'Technology'; // default
      let suggestedCareer = 'Software Engineer';
      
      if (healthcareScore > techScore && healthcareScore > designScore) {
        suggestedCategory = 'Healthcare';
        suggestedCareer = 'Nurse';
      } else if (designScore > techScore && designScore > healthcareScore) {
        suggestedCategory = 'Design';
        suggestedCareer = 'UI/UX Designer';
      } else if (techScore >= healthcareScore && techScore >= designScore) {
        suggestedCategory = 'Technology';
        suggestedCareer = techScore > 3 ? 'Data Scientist' : 'Software Engineer';
      }

      await saveResult({ 
        quiz_id, 
        user_id, 
        answers, 
        suggestions: [suggestedCategory, suggestedCareer] 
      });

      res.status(200).json({
        message: "Quiz completed",
        career_category: suggestedCategory,
        suggested_career: suggestedCareer,
        scores: {
          technology: techScore,
          healthcare: healthcareScore,
          design: designScore
        }
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Could not process quiz" });
    }
};

const getUserResults = async (req, res) => {
  try {
    const userId = req.params.userId;
    const results = await getResultsByUser(userId);
    res.json(results);
  } catch {
    res.status(500).json({ error: "Error fetching results" });
  }
};

// --- FIX: Consolidated all exports to the end ---
module.exports = {
  getQuizzes,
  submitQuiz,
  getUserResults,
  getSingleQuiz,
};
