const express = require("express");
const router = express.Router();
const {
  getCareers,
  getCareer,
  postCareer,
  putCareer,
  removeCareer,
} = require("../controllers/careerController");

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getCareers);                    // public
router.get("/:id", getCareer);                  // public
router.post("/", verifyToken, postCareer);             // admin only
router.put("/:id", verifyToken, putCareer);            // admin only
router.delete("/:id", verifyToken, removeCareer);      // admin only

module.exports = router;