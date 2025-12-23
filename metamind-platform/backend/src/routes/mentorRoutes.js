const router = require("express").Router();
const {
  getAllMentors,
  createMentor,
  submitMentorRequest,
  getMentorInbox
} = require("../controllers/mentorController");

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllMentors); // public
router.post("/", verifyToken, createMentor); // admin-only
router.post("/request", verifyToken, submitMentorRequest); // student -> mentor
router.get("/requests/:mentor_id", verifyToken, getMentorInbox); // show requests

module.exports = router;