const {
  getRoadmapSteps,
  getAllRoadmaps,
  getRoadmapStep,
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

// Get roadmap by career ID - Enhanced to use new roadmap table
const getRoadmapByCareer = async (req, res) => {
  try {
      const { careerId } = req.params;
      const userId = req.user.id;
      
      console.log(`🔍 Checking roadmap for user: ${userId}, career: ${careerId}`);
      
      // Get roadmap steps for the specific career
      const roadmapSteps = await getRoadmapSteps(careerId);
      
      if (!roadmapSteps || roadmapSteps.length === 0) {
          return res.status(404).json({ message: "No roadmap found for this career" });
      }

      // Get user's progress for this career
      const userRoadmap = await getUserRoadmap(userId);
      
      // Get current step from user roadmap
      const currentStep = userRoadmap?.current_step || 0;
      
      // Format the response
      const response = {
          career_id: parseInt(careerId),
          career_title: roadmapSteps[0]?.career_title || "Unknown Career",
          category: roadmapSteps[0]?.category || "Unknown",
          total_steps: roadmapSteps.length,
          current_step: currentStep,
          completed: userRoadmap?.completed || false,
          steps: roadmapSteps.map(step => ({
              id: step.id,
              step_number: step.step_number,
              title: step.title,
              description: step.description,
              duration: step.duration,
              difficulty: step.difficulty,
              requirements: step.requirements,
              resources: step.resources,
              order_index: step.order_index,
              // Add status information for frontend
              is_completed: step.step_number <= currentStep,
              is_locked: step.step_number > currentStep + 1,
              is_current: step.step_number === currentStep + 1
          }))
      };

      res.json(response);
  } catch (err) {
      console.error("❌ Roadmap fetch error:", err);
      res.status(500).json({ message: "Server error" });
  }
};

// Get all available roadmaps
const getAllAvailableRoadmaps = async (req, res) => {
  try {
      const roadmaps = await getAllRoadmaps();
      res.json({
          success: true,
          data: roadmaps,
          total: roadmaps.length
      });
  } catch (err) {
      console.error("❌ Error fetching all roadmaps:", err);
      res.status(500).json({ message: "Server error" });
  }
};

// Get specific roadmap step
const getSpecificRoadmapStep = async (req, res) => {
  try {
      const { stepId } = req.params;
      const step = await getRoadmapStep(stepId);
      
      if (!step) {
          return res.status(404).json({ message: "Roadmap step not found" });
      }

      res.json({
          success: true,
          data: step
      });
  } catch (err) {
      console.error("❌ Error fetching roadmap step:", err);
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
      
      // If user has no roadmap yet, return a helpful message instead of 404
      if (!data || !data.roadmap) {
          console.log("ℹ️ No roadmap found for user, returning empty state");
          return res.json({
              career: "No Career Selected",
              completed: false,
              steps: [],
              currentStep: 0,
              next: null,
              totalSteps: 0,
              message: "Please select a career goal to get started"
          });
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
          return res.json({
              career: title || "Unknown Career",
              completed: false,
              steps: [],
              currentStep: 0,
              next: null,
              totalSteps: 0,
              message: "Roadmap data is being updated"
          });
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
  getRoadmapByCareer,
  getAllAvailableRoadmaps,
  getSpecificRoadmapStep
};