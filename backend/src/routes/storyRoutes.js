const router = require("express").Router();
const { addSuccessStory, getStories, adminVerify } = require("../controllers/storyController");
const auth = require("../middleware/authMiddleware");

router.get("/", getStories);                   // public view
router.post("/", auth, addSuccessStory);       // student shares story
router.put("/:id/verify", auth, adminVerify);  // admin verifies story

module.exports = router;