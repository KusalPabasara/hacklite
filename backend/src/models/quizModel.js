const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const getAllQuizzes = async () => {
  const result = await pool.query("SELECT * FROM quizzes ORDER BY id");
  return result.rows;
};

const getQuizById = async (id) => {
  const quizRes = await pool.query("SELECT * FROM quizzes WHERE id = $1", [id]);
  const quiz = quizRes.rows[0];

  if (quiz && quiz.questions) {
    // Transform the questions data structure to match frontend expectations
    quiz.questions = quiz.questions.map(q => ({
      question_text: q.q,
      answers: q.options
    }));
  }

  return quiz;
};

const saveResult = async ({ quiz_id, user_id, answers, suggestions }) => {
  const result = await pool.query(
    `INSERT INTO results (quiz_id, user_id, answers, suggestions)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [quiz_id, user_id, answers, suggestions]
  );
  return result.rows[0];
};

const getResultsByUser = async (user_id) => {
  const result = await pool.query("SELECT * FROM results WHERE user_id = $1", [user_id]);
  return result.rows;
};

// --- FIX: Consolidated all functions into a single export block at the end ---
module.exports = { 
  getAllQuizzes, 
  getQuizById, 
  saveResult, 
  getResultsByUser 
};
