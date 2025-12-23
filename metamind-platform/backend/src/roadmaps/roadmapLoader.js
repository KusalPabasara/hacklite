// Roadmap Loader - Dynamically loads roadmap files based on career
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Career ID to filename mapping (based on actual database careers)
const careerFileMap = {
  23: 'nts.js',                    // NTS - Nursing Training School
  24: 'medical-officer.js',        // Medical Officer (MO)
  25: 'vta.js',                    // VTA - Vocational Training Authority
  27: 'teacher-training.js',       // Teacher Training College
  28: 'german-technical.js',       // German Technical Training
  29: 'chartered-accountancy.js',  // Chartered Accountancy (CA)
  31: 'agricultural-engineering.js', // Agricultural Engineering
  32: 'dtet-open-university.js',   // DTET Open University
  33: 'korean-employment.js',      // Korean Employment Program
  34: 'bit.js'                     // BIT - Bachelor of Information Technology
};

// Function to get career information from database
const getCareerFromDatabase = async (careerId) => {
  try {
    const result = await pool.query(
      'SELECT id, title, category, description FROM careers WHERE id = $1',
      [careerId]
    );
    
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  } catch (error) {
    console.error(`❌ Error fetching career ${careerId} from database:`, error);
    return null;
  }
};

// Function to get roadmap for a specific career
const getCareerRoadmap = async (careerId) => {
  try {
    // Get career information from database
    const career = await getCareerFromDatabase(careerId);
    
    if (!career) {
      console.log(`⚠️ Career ID ${careerId} not found in database, using default roadmap`);
      return require('./default.js');
    }
    
    const filename = careerFileMap[careerId];
    
    if (filename) {
      const filePath = path.join(__dirname, filename);
      
      // Check if file exists
      if (fs.existsSync(filePath)) {
        const roadmap = require(filePath);
        
        // Update roadmap with database career information
        roadmap.id = career.id;
        roadmap.title = career.title;
        roadmap.category = career.category;
        roadmap.description = career.description;
        
        console.log(`✅ Loaded roadmap for career ID ${careerId}: ${roadmap.title}`);
        return roadmap;
      }
    }
    
    // Fallback to default roadmap with database career info
    console.log(`⚠️ No specific roadmap file found for career ID ${careerId}, using default`);
    const defaultRoadmap = require('./default.js');
    defaultRoadmap.id = career.id;
    defaultRoadmap.title = career.title;
    defaultRoadmap.category = career.category;
    defaultRoadmap.description = career.description;
    return defaultRoadmap;
    
  } catch (error) {
    console.error(`❌ Error loading roadmap for career ID ${careerId}:`, error);
    // Return default roadmap on error
    return require('./default.js');
  }
};

// Function to get all available roadmaps
const getAllRoadmaps = async () => {
  const roadmaps = [];
  
  try {
    // Get all careers from database
    const result = await pool.query('SELECT id, title, category, description FROM careers ORDER BY id');
    const careers = result.rows;
    
    // Load roadmaps for each career
    for (const career of careers) {
      const roadmap = await getCareerRoadmap(career.id);
      if (roadmap && roadmap.id !== 0) { // Exclude default
        roadmaps.push(roadmap);
      }
    }
    
    console.log(`✅ Loaded ${roadmaps.length} career roadmaps from database`);
    return roadmaps;
    
  } catch (error) {
    console.error('❌ Error loading all roadmaps:', error);
    return [];
  }
};

module.exports = {
  getCareerRoadmap,
  getAllRoadmaps
};
