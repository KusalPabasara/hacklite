const router = require("express").Router();
const { addSuccessStory, getStories, adminVerify } = require("../controllers/storyController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getStories);                   // public view
router.post("/", verifyToken, addSuccessStory);       // student shares story
router.put("/:id/verify", verifyToken, adminVerify);  // admin verifies story

module.exports = router;