const {
    addStory,
    getVerifiedStories,
    listAllStories,
    verifyStory,
  } = require("../models/storyModel");
  
  const addSuccessStory = async (req, res) => {
    try {
      const user_id = req.user.id;
      const { career_title, quote, full_story, photo_url } = req.body;
  
      const saved = await addStory({ user_id, career_title, quote, full_story, photo_url });
      res.status(201).json({ message: "Story submitted", data: saved });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving story" });
    }
  };
  
  const getStories = async (req, res) => {
    try {
      const data = await getVerifiedStories();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Failed to fetch stories" });
    }
  };
  
  const adminVerify = async (req, res) => {
    try {
      if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  
      const verified = await verifyStory(req.params.id);
      res.json({ message: "Story verified", verified });
    } catch {
      res.status(500).json({ error: "Verification failed" });
    }
  };
  module.exports = {
    addSuccessStory,
    getStories,
    adminVerify,
  };