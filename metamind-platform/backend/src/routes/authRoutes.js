const express = require("express");
const router = express.Router();
const { register, login, getProfile, updateProfile, deleteProfilePicture, checkEmailExists } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { upload, handleUploadError } = require("../middleware/uploadMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.get("/check-email", checkEmailExists);

// Protected routes
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.put("/update", verifyToken, upload.single('photo'), handleUploadError, updateProfile);
router.delete("/profile/photo", verifyToken, deleteProfilePicture);

module.exports = router;