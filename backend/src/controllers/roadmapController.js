const {
  saveUserRoadmap,
  getUserRoadmap,
  updateProgress
} = require("../models/roadmapModel");

// Set target career for user
const setTargetCareer = async (req, res) => {
  try {
      const { career_id } = req.body;
      const user_id = req.user.id;
      const roadmap = await saveUserRoadmap(user_id, career_id);
      res.status(201).json({ message: "Career goal set!", roadmap });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error setting goal" });
  }
};

// Get roadmap by career ID - Fixed to use existing model functions
const getRoadmapByCareer = async (req, res) => {
  try {
      const { careerId } = req.params;
      const userId = req.user.id;
      
      console.log(`🔍 Checking roadmap for user: ${userId}, career: ${careerId}`);
      
      // Use getUserRoadmap and filter by career if needed
      // You might need to modify this based on your actual model structure
      const roadmap = await getUserRoadmap(userId);
      
      if (!roadmap) {
          return res.status(404).json({ message: "No roadmap found for this career" });
      }

      // If your roadmap has career info, you can filter here
      // For now, returning the user's roadmap
      res.json(roadmap);
  } catch (err) {
      console.error("❌ Roadmap fetch error:", err);
      res.status(500).json({ message: "Server error" });
  }
};

// Get user's current roadmap steps
const getUserSteps = async (req, res) => {
  try {
      const user_id = req.user.id;
      console.log("🔍 Checking roadmap for:", user_id);
      
      const data = await getUserRoadmap(user_id);
      console.log("🎯 Roadmap data returned:", data);
      
      if (!data || !data.roadmap) {
          console.warn("⚠️ No roadmap found");
          return res.status(404).json({ error: "No roadmap found. Please set a career goal first." });
      }

      const { roadmap, title, current_step, completed } = data;
      
      // Handle both string and array formats
      let roadmapSteps = [];
      if (typeof roadmap === 'string') {
          try {
              roadmapSteps = JSON.parse(roadmap);
          } catch (e) {
              roadmapSteps = [roadmap];
          }
      } else if (Array.isArray(roadmap)) {
          roadmapSteps = roadmap;
      } else {
          console.warn("⚠️ Roadmap is missing or invalid in DB:", roadmap);
          return res.status(400).json({ error: "Invalid roadmap format in database" });
      }

      return res.json({
          career: title || "Unknown Career",
          completed: completed || false,
          steps: roadmapSteps,
          currentStep: current_step || 0,
          next: roadmapSteps[current_step] || null,
          totalSteps: roadmapSteps.length
      });
  } catch (err) {
      console.error("🚨 Error fetching roadmap:", err);
      return res.status(500).json({ error: "Server error in roadmap" });
  }
};

// Update user's progress
const updateUserSteps = async (req, res) => {
  try {
      const { step } = req.body;
      const user_id = req.user.id;
      const updated = await updateProgress(user_id, step);
      res.json({ message: "Progress updated", updated });
  } catch (err) {
      console.error("Error updating progress:", err);
      res.status(500).json({ error: "Update failed" });
  }
};

module.exports = {
  setTargetCareer,
  getUserSteps,
  updateUserSteps,
  getRoadmapByCareer
};