const router = require("express").Router();
const {
  getAllMentors,
  createMentor,
  submitMentorRequest,
  getMentorInbox
} = require("../controllers/mentorController");

const auth = require("../middleware/authMiddleware");

router.get("/", getAllMentors); // public
router.post("/", auth, createMentor); // admin-only
router.post("/request", auth, submitMentorRequest); // student -> mentor
router.get("/requests/:mentor_id", auth, getMentorInbox); // show requests

module.exports = router;