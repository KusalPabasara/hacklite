const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const saveUserRoadmap = async (user_id, career_id, roadmap = null) => {
  try {
    const existing = await pool.query(
      "SELECT * FROM user_roadmaps WHERE user_id = $1",
      [user_id]
    );

    if (existing.rows.length > 0) {
      // Update existing roadmap with new career_id
      const result = await pool.query(
        `UPDATE user_roadmaps 
         SET career_id = $2, current_step = 0, completed = false, roadmap_override = $3
         WHERE user_id = $1 
         RETURNING *`,
        [user_id, career_id, roadmap]
      );
      return result.rows[0];
    }

    // Create new roadmap
    const result = await pool.query(
      `INSERT INTO user_roadmaps (user_id, career_id, current_step, completed, roadmap_override)
       VALUES ($1, $2, 0, false, $3) 
       RETURNING *`,
      [user_id, career_id, roadmap]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error in saveUserRoadmap:", error);
    throw error;
  }
};

const getUserRoadmap = async (user_id) => {
  // First check if user has a roadmap with a career_id
  const result = await pool.query(`
    SELECT ur.*, c.title, 
      CASE
        WHEN ur.roadmap_override IS NOT NULL THEN ur.roadmap_override
        ELSE c.roadmap
      END as roadmap
    FROM user_roadmaps ur
    JOIN careers c ON ur.career_id = c.id
    WHERE ur.user_id = $1 AND ur.career_id IS NOT NULL
  `, [user_id]);

  if (result.rows.length > 0) {
    return result.rows[0];
  }

  // If no roadmap with career_id, return a default structure
  return {
    user_id: user_id,
    career_id: null,
    current_step: 0,
    completed: false,
    title: null,
    roadmap: null
  };
};

const updateProgress = async (user_id, step) => {
  const result = await pool.query(
    `UPDATE user_roadmaps
     SET current_step = $1,
         completed = CASE WHEN $1 >= (SELECT jsonb_array_length(roadmap) FROM careers WHERE id = user_roadmaps.career_id)
                      THEN true ELSE false END
     WHERE user_id = $2
     RETURNING *`,
    [step, user_id]
  );
  return result.rows[0];
};
module.exports = {
    saveUserRoadmap,
    getUserRoadmap,
    updateProgress,
  };