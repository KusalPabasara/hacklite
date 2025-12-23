const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Import roadmap loader
const { getCareerRoadmap, getAllRoadmaps: getAllRoadmapsFromLoader } = require('../roadmaps/roadmapLoader');

// Get roadmap steps for a specific career
const getRoadmapSteps = async (career_id) => {
  try {
    // Get roadmap from our roadmap loader (which fetches from database)
    const roadmap = await getCareerRoadmap(career_id);
    
    if (!roadmap || !roadmap.steps) {
      console.log(`⚠️ No roadmap found for career ID ${career_id}`);
      return [];
    }
    
    // Add career information to each step
    const steps = roadmap.steps.map(step => ({
      ...step,
      career_id: roadmap.id,
      career_title: roadmap.title,
      category: roadmap.category
    }));
    
    console.log(`✅ Retrieved ${steps.length} steps for career: ${roadmap.title}`);
    return steps;
  } catch (error) {
    console.error("Error in getRoadmapSteps:", error);
    throw error;
  }
};

// Get all roadmaps with career information
const getAllRoadmaps = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id as career_id,
        c.title as career_title,
        c.category,
        c.description as career_description,
        COUNT(r.id) as total_steps,
        MIN(r.difficulty) as min_difficulty,
        MAX(r.difficulty) as max_difficulty
      FROM careers c
      LEFT JOIN roadmaps r ON c.id = r.career_id
      GROUP BY c.id, c.title, c.category, c.description
      ORDER BY c.category, c.title
    `);
    return result.rows;
  } catch (error) {
    console.error("Error in getAllRoadmaps:", error);
    throw error;
  }
};

// Get roadmap step by ID
const getRoadmapStep = async (step_id) => {
  try {
    const result = await pool.query(`
      SELECT r.*, c.title as career_title
      FROM roadmaps r
      JOIN careers c ON r.career_id = c.id
      WHERE r.id = $1
    `, [step_id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in getRoadmapStep:", error);
    throw error;
  }
};

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
  try {
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
  } catch (error) {
    console.error("Error in getUserRoadmap:", error);
    // Return default structure on error
    return {
      user_id: user_id,
      career_id: null,
      current_step: 0,
      completed: false,
      title: null,
      roadmap: null
    };
  }
};

const updateProgress = async (user_id, step) => {
  try {
    // Get the user's current career to determine total steps
    const userRoadmap = await getUserRoadmap(user_id);
    const careerId = userRoadmap?.career_id || 1;
    
    // Get roadmap steps for the career to determine total steps
    const roadmapSteps = await getRoadmapSteps(careerId);
    const totalSteps = roadmapSteps.length || 10; // Default to 10 for customized roadmaps
    const isCompleted = step >= totalSteps;
    
    console.log(`📊 Updating progress: step ${step}/${totalSteps}, completed: ${isCompleted}`);
    
    // Handle both UUID and integer user IDs
    let result;
    
    if (typeof user_id === 'string' && user_id.includes('-')) {
      // UUID user ID - try to update with string user_id
      console.log('🔄 Updating progress for UUID user ID:', user_id);
      
      result = await pool.query(
        `UPDATE user_roadmaps
         SET current_step = $1, completed = $2
         WHERE user_id = $3
         RETURNING *`,
        [step, isCompleted, user_id]
      );
      
      if (result.rows.length === 0) {
        // If no roadmap exists, create one
        console.log('📝 Creating new roadmap for UUID user:', user_id);
        result = await pool.query(
          `INSERT INTO user_roadmaps (user_id, career_id, current_step, completed)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [user_id, careerId, step, isCompleted]
        );
      }
    } else {
      // Integer user ID
      result = await pool.query(
        `UPDATE user_roadmaps
         SET current_step = $1, completed = $2
         WHERE user_id = $3
         RETURNING *`,
        [step, isCompleted, parseInt(user_id)]
      );
      
      if (result.rows.length === 0) {
        // If no roadmap exists, create one
        result = await pool.query(
          `INSERT INTO user_roadmaps (user_id, career_id, current_step, completed)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [parseInt(user_id), careerId, step, isCompleted]
        );
      }
    }
    
    console.log('✅ Progress updated successfully:', result.rows[0]);
    return result.rows[0];
    
  } catch (error) {
    console.error("Error in updateProgress:", error);
    // Return a fallback response for any errors
    return {
      id: 1,
      user_id: user_id,
      career_id: 1,
      current_step: step,
      completed: step >= 10, // Updated to 10 steps for customized roadmaps
      roadmap_override: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }
};
module.exports = {
    getRoadmapSteps,
    getAllRoadmaps,
    getRoadmapStep,
    saveUserRoadmap,
    getUserRoadmap,
    updateProgress,
  };