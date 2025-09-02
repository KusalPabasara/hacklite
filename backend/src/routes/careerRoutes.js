const express = require("express");
const router = express.Router();
const {
  getCareers,
  getCareer,
  postCareer,
  putCareer,
  removeCareer,
} = require("../controllers/careerController");

const auth = require("../middleware/authMiddleware");

router.get("/", getCareers);                    // public
router.get("/:id", getCareer);                  // public
router.post("/", auth, postCareer);             // admin only
router.put("/:id", auth, putCareer);            // admin only
router.delete("/:id", auth, removeCareer);      // admin only

module.exports = router;