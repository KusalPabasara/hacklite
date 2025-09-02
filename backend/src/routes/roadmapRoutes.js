const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Import the correct function names that match the exports
const {
    getUserSteps,        // Get user's current roadmap
    updateUserSteps,     // Update user progress
    getRoadmapByCareer,  // Get roadmap by career ID
    setTargetCareer      // Set user's target career
} = require("../controllers/roadmapController");

// Debug logging (can be removed in production)
console.log("getUserSteps:", typeof getUserSteps);
console.log("updateUserSteps:", typeof updateUserSteps);
console.log("getRoadmapByCareer:", typeof getRoadmapByCareer);
console.log("setTargetCareer:", typeof setTargetCareer);

// 🚀 FIXED: Proper route definitions without invalid characters
// Routes in order of specificity (most specific first)

// Set target career route - support both /select and /set-career for compatibility
router.post("/select", authMiddleware, setTargetCareer);
router.post("/set-career", authMiddleware, setTargetCareer);

// Update progress route  
router.put("/progress", authMiddleware, updateUserSteps);

// Get roadmap by career ID (specific career)
router.get("/:careerId", authMiddleware, getRoadmapByCareer);

// Get user's current roadmap (general)
router.get("/", authMiddleware, getUserSteps);

module.exports = router;