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
const profileRoutes = require("./routes/profileRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      'http://localhost:5173',
      'http://localhost:5174', 
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'https://marga.kusalpabasara.me',
      'http://marga.kusalpabasara.me'
    ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost on any port
    if (origin.match(/^https?:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
    // Check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: "10mb" })); // allow larger JSON bodies for Base64 images
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Serve static files from uploads directory with proper CORS headers
const path = require('path');

// Global middleware for all static files to fix OpaqueResponseBlocking
app.use('/uploads', (req, res, next) => {
  // Set CORS headers to allow cross-origin access
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
}, express.static(path.join(__dirname, '../uploads')));

// Specific middleware for profile pictures
app.use('/uploads/profile-pictures', express.static(path.join(__dirname, '../uploads/profile-pictures')));

const uploadsPath = path.join(__dirname, '../uploads');
console.log('📁 Static files serving from:', uploadsPath);
console.log('📷 Profile pictures from:', path.join(uploadsPath, 'profile-pictures'));

// Register all routes
app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/profile", profileRoutes);

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
app.get("/", (req, res) => res.send("🎉 Career Platform Backend Running"));

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