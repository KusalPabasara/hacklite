const router = require("express").Router();
const { getAllQuizzes, getSingleQuiz, submitQuiz, getUserResults, getQuizzes } = require("../controllers/quizController");
const { verifyToken } = require("../middleware/authMiddleware");

// Public routes - no auth required
router.get("/", getQuizzes);
router.get("/:id", getSingleQuiz);

// Protected routes - auth required
router.get("/user/:userId", verifyToken, getUserResults); 
router.post("/:id/submit", verifyToken, submitQuiz);

module.exports = router;
