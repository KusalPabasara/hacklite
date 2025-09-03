const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Make sure .env is being read
console.log("🔐 Loaded OpenAI key:", process.env.OPENAI_API_KEY ? "✅ exists" : "❌ missing");

// --- All route imports ---
const authRoutes = require("./routes/authRoutes");
const careerRoutes = require("./routes/careerRoutes");
const quizRoutes = require("./routes/quizRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const storyRoutes = require("./routes/storyRoutes");
const questionnaireRoutes = require("./routes/questionnaireRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost on any port
    if (origin.match(/^https?:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
    // Allow specific origins
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174', 
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Register all routes
app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/chat", chatRoutes);

// Add missing leaderboard route
app.get("/api/leaderboard", (req, res) => {
    const leaderboardData = [
        { id: 1, username: "Alex Chen", score: 1250, rank: 1, career: "Data Scientist" },
        { id: 2, username: "Sarah Johnson", score: 1180, rank: 2, career: "Web Developer" },
        { id: 3, username: "Mike Rodriguez", score: 1050, rank: 3, career: "UI/UX Designer" },
        { id: 4, username: "Emma Wilson", score: 980, rank: 4, career: "DevOps Engineer" },
        { id: 5, username: "David Kim", score: 920, rank: 5, career: "Mobile Developer" }
    ];
    
    res.json({
        message: "Leaderboard data",
        data: leaderboardData,
        total: leaderboardData.length
    });
});

// Home route
app.get("/", (req, res) => res.send("🎉 MetaMind Backend Running"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("🚨 Global error handler:", err.stack);
    res.status(500).json({ 
        error: "Something went wrong on the server",
        message: process.env.NODE_ENV === 'development' ? err.message : "Internal server error"
    });
});

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        message: `The route ${req.originalUrl} does not exist`
    });
});

// Start server
app.listen(PORT, () => {
    console.log("🌐 Server running at http://localhost:" + PORT);
    console.log("📊 Available routes:");
    console.log("   • /api/auth - Authentication routes");
    console.log("   • /api/careers - Career routes");
    console.log("   • /api/quizzes - Quiz routes");
    console.log("   • /api/roadmap - Roadmap routes");
    console.log("   • /api/mentors - Mentor routes");
    console.log("   • /api/stories - Story routes");
    console.log("   • /api/questionnaire - Questionnaire routes");
    console.log("   • /api/chat - Chat assistant routes");
    console.log("   • /api/leaderboard - Leaderboard data");
});