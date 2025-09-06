const {
    getMentors,
    addMentor,
    requestMentorship,
    getRequestsByMentor
  } = require("../models/mentorModel");
  
  const getAllMentors = async (req, res) => {
    try {
      const data = await getMentors();
      res.json(data);
    } catch {
      res.status(500).json({ error: "Error fetching mentors" });
    }
  };
  
  const createMentor = async (req, res) => {
    try {
      const { role } = req.user;
      if (role !== "admin") return res.status(403).json({ error: "Admin only" });
  
      const saved = await addMentor(req.body);
      res.status(201).json(saved);
    } catch {
      res.status(500).json({ error: "Error adding mentor" });
    }
  };
  
  const submitMentorRequest = async (req, res) => {
    try {
      const user_id = req.user.id;
      const { mentor_id, note } = req.body;
  
      const data = await requestMentorship(user_id, mentor_id, note);
      res.status(201).json({ message: "Request submitted", data });
    } catch (err) { // <--- Add (err) here
      console.error(err); // <--- And add this line
      res.status(500).json({ error: "Error submitting mentor request" });
    }
  };
  
  const getMentorInbox = async (req, res) => {
    try {
      const mentor_id = parseInt(req.params.mentor_id); // could be from JWT later
      const data = await getRequestsByMentor(mentor_id);
  
      res.json(data);
    } catch {
      res.status(500).json({ error: "Error fetching requests" });
    }
  };
  
  module.exports = {
    getAllMentors,
    createMentor,
    submitMentorRequest,
    getMentorInbox,
  };