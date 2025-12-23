const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Import the correct function names that match the exports
const {
    getUserSteps,        // Get user's current roadmap
    updateUserSteps,     // Update user progress
    getRoadmapByCareer,  // Get roadmap by career ID
    setTargetCareer,     // Set user's target career
    getAllAvailableRoadmaps,  // Get all available roadmaps
    getSpecificRoadmapStep    // Get specific roadmap step
} = require("../controllers/roadmapController");

// Debug logging (can be removed in production)
console.log("getUserSteps:", typeof getUserSteps);
console.log("updateUserSteps:", typeof updateUserSteps);
console.log("getRoadmapByCareer:", typeof getRoadmapByCareer);
console.log("setTargetCareer:", typeof setTargetCareer);

// 🚀 FIXED: Proper route definitions without invalid characters
// Routes in order of specificity (most specific first)

// Get specific roadmap step by step ID
router.get("/step/:stepId", verifyToken, getSpecificRoadmapStep);

// Get roadmap by career ID (specific career)
router.get("/career/:careerId", verifyToken, getRoadmapByCareer);

// Get all available roadmaps (public endpoint)
router.get("/all", getAllAvailableRoadmaps);

// Set target career route - support both /select and /set-career for compatibility
router.post("/select", verifyToken, setTargetCareer);
router.post("/set-career", verifyToken, setTargetCareer);

// Update progress route  
router.put("/progress", verifyToken, updateUserSteps);

// Get user's current roadmap (general)
router.get("/", verifyToken, getUserSteps);

module.exports = router;