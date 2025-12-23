const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getAllCareers = async () => {
  const result = await pool.query("SELECT * FROM careers ORDER BY id ASC");
  return result.rows;
};

const getCareerById = async (id) => {
  const result = await pool.query("SELECT * FROM careers WHERE id = $1", [id]);
  const career = result.rows[0];

  if (career) {
    // Fetch enhanced roadmap data from roadmaps table
    const roadmapResult = await pool.query(`
      SELECT step_number, title, description, difficulty, estimated_duration,
             resources, prerequisites, skills_learned, certification_info
      FROM roadmaps
      WHERE career_id = $1
      ORDER BY step_number ASC
    `, [id]);

    // If we have enhanced roadmap data, use it; otherwise fall back to career.roadmap
    if (roadmapResult.rows.length > 0) {
      const enhancedRoadmap = roadmapResult.rows.map(step => ({
        step: step.step_number,
        title: step.title,
        description: step.description,
        difficulty: step.difficulty,
        duration: step.estimated_duration,
        points: 200, // Default points value
        xp: 150, // Default XP value
        achievements: step.skills_learned || [],
        tasks: JSON.parse(step.resources || '[]'),
        milestones: JSON.parse(step.prerequisites || '[]'),
        localContext: {
          requirements: step.certification_info
        }
      }));
      career.roadmap = enhancedRoadmap;
    }
  }

  return career;
};

const createCareer = async ({ title, category, description, roadmap }) => {
  const result = await pool.query(
    `INSERT INTO careers (title, category, description, roadmap)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, category, description, roadmap]
  );
  return result.rows[0];
};

const updateCareer = async (id, { title, category, description, roadmap }) => {
  const result = await pool.query(
    `UPDATE careers
      SET title = $1, category = $2, description = $3, roadmap = $4
      WHERE id = $5 RETURNING *`,
    [title, category, description, roadmap, id]
  );
  return result.rows[0];
};

const deleteCareer = async (id) => {
  await pool.query("DELETE FROM careers WHERE id = $1", [id]);
};

module.exports = {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
};