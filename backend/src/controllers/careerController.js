const {
    getAllCareers,
    getCareerById,
    createCareer,
    updateCareer,
    deleteCareer,
  } = require("../models/careerModel");
  
  const getCareers = async (req, res) => {
    try {
      const data = await getAllCareers();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Failed to fetch careers" });
    }
  };
  
  const getCareer = async (req, res) => {
    try {
      const data = await getCareerById(req.params.id);
      if (!data) return res.status(404).json({ error: "Not found" });
      res.json(data);
    } catch {
      res.status(500).json({ error: "Error fetching career" });
    }
  };
  
  const postCareer = async (req, res) => {
    try {
      const { role } = req.user || {}; // from auth middleware
      if (role !== "admin")
        return res.status(403).json({ error: "Admin only" });
  
      const { title, category, description, roadmap } = req.body;
      const saved = await createCareer({ title, category, description, roadmap });
      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error adding career" });
    }
  };
  
  const putCareer = async (req, res) => {
    try {
      const { title, category, description, roadmap } = req.body;
      const updated = await updateCareer(req.params.id, {
        title, category, description, roadmap,
      });
      res.json(updated);
    } catch {
      res.status(500).json({ error: "Error updating career" });
    }
  };
  
  const removeCareer = async (req, res) => {
    try {
      await deleteCareer(req.params.id);
      res.json({ message: "Deleted" });
    } catch {
      res.status(500).json({ error: "Error deleting" });
    }
  };
  
  module.exports = {
    getCareers,
    getCareer,
    postCareer,
    putCareer,
    removeCareer,
  };