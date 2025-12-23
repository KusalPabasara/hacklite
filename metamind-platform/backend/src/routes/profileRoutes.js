const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { upload, updateProfile, getProfile, deleteProfilePicture } = require('../controllers/profileController');

// Get user profile
router.get('/', verifyToken, getProfile);

// Update user profile (with file upload support)
router.put('/update', verifyToken, upload.single('profile_picture'), updateProfile);

// Update user profile (JSON only, no file upload)
router.put('/update-json', verifyToken, updateProfile);

// Delete profile picture
router.delete('/picture', verifyToken, deleteProfilePicture);

// Test profile picture serving
router.get('/test-image', (req, res) => {
  const path = require('path');
  const fs = require('fs');
  const uploadsDir = path.join(__dirname, '../../uploads/profile-pictures');
  
  // List all files in profile-pictures directory
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.json({ error: 'Could not read directory', uploadsDir });
    }
    
    res.json({ 
      message: 'Profile pictures directory contents',
      uploadsDir,
      files: files || [],
      sampleUrl: files.length > 0 ? `http://localhost:5000/uploads/profile-pictures/${files[0]}` : 'No files found'
    });
  });
});

module.exports = router;
