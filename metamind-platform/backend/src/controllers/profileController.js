const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage for profile pics
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads/profile-pictures');
    console.log('📁 Profile picture upload destination:', dir);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('🔍 Fetching profile for user ID:', userId);
    
    // Handle both integer and UUID user IDs
    let query, params;
    // Query for both UUID and integer IDs
    query = `SELECT id, name, email, profile_picture, location, bio, phone, education, interests, questionnaire_completed, questionnaire_completed_at
             FROM users 
             WHERE id = $1`;
    params = [userId];
    
    const result = await pool.query(query, params);
    
    console.log('📊 Profile query result:', result.rows.length, 'rows found');
    
    if (result.rows.length === 0) {
      console.log('❌ User not found in database');
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = result.rows[0];
    res.json({
      id: user.id,
      username: user.name, // Map name to username for frontend consistency
      name: user.name,
      email: user.email,
      profile_picture: user.profile_picture,
      location: user.location,
      bio: user.bio,
      phone: user.phone,
      education: user.education,
      interests: user.interests,
      questionnaireCompleted: user.questionnaire_completed,
      questionnaireCompletedAt: user.questionnaire_completed_at
    });
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      stack: error.stack
    });
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  console.log('📝 Profile update request:', {
    userId: req.user.id,
    hasFile: !!req.file,
    bodyKeys: Object.keys(req.body),
    filename: req.file?.filename
  });
  
  try {
    const userId = req.user.id;
    const { username, email, location, bio, phone, education, interests, profile_picture } = req.body;
    // Map username to name since database uses 'name' column
    const name = username;
    const profilePicPath = req.file ? `/uploads/profile-pictures/${req.file.filename}` : profile_picture;

    // Check if email is already taken by another user (only if email is being changed)
    if (email) {
      // First check if the user's current email is different from the new email
      const currentUser = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
      const currentEmail = currentUser.rows[0]?.email;
      
      // Only check for duplicates if the email is actually being changed
      if (currentEmail !== email) {
        const existingUser = await pool.query(
          'SELECT id FROM users WHERE email = $1 AND id != $2',
          [email, userId]
        );
        
        if (existingUser.rows.length > 0) {
          return res.status(400).json({ error: 'Email is already in use by another account' });
        }
      }
    }

    // Build dynamic query based on provided fields
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (name) {
      updateFields.push(`name=$${paramCount}`);
      values.push(name);
      paramCount++;
    }

    if (email) {
      updateFields.push(`email=$${paramCount}`);
      values.push(email);
      paramCount++;
    }

    if (location) {
      updateFields.push(`location=$${paramCount}`);
      values.push(location);
      paramCount++;
    }

    if (bio) {
      updateFields.push(`bio=$${paramCount}`);
      values.push(bio);
      paramCount++;
    }

    if (phone) {
      updateFields.push(`phone=$${paramCount}`);
      values.push(phone);
      paramCount++;
    }

    if (education) {
      updateFields.push(`education=$${paramCount}`);
      values.push(education);
      paramCount++;
    }

    if (interests) {
      updateFields.push(`interests=$${paramCount}`);
      values.push(interests);
      paramCount++;
    }

    if (profilePicPath) {
      updateFields.push(`profile_picture=$${paramCount}`);
      values.push(profilePicPath);
      paramCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Add userId as the last parameter
    values.push(userId);
    const userIdParam = `$${paramCount}`;

    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id=${userIdParam} RETURNING id, name, email, location, profile_picture, bio, phone, education, interests`;

    console.log('📊 Executing query:', query);
    console.log('📊 With values:', values);
    
    const result = await pool.query(query, values);
    
    console.log('✅ Profile update successful:', result.rows[0]);
    
    // Return user data with proper field mapping
    const updatedUser = result.rows[0];
    const responseUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      username: updatedUser.name, // Map name to username for frontend consistency
      email: updatedUser.email,
      location: updatedUser.location,
      profile_picture: updatedUser.profile_picture,
      bio: updatedUser.bio,
      phone: updatedUser.phone,
      education: updatedUser.education,
      interests: updatedUser.interests
    };

    res.json({ message: 'Profile updated successfully', user: responseUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Handle specific database errors
    if (error.code === '23505') { // Unique constraint violation
      if (error.constraint === 'users_email_key') {
        return res.status(400).json({ error: 'Email is already in use by another account' });
      }
    }
    
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Delete profile picture
const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get current profile picture
    const result = await pool.query(
      'SELECT profile_picture FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows[0]?.profile_picture) {
      const imagePath = result.rows[0].profile_picture.replace('/uploads/profile-pictures/', 'uploads/profile-pictures/');
      
      // Delete file from filesystem
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      
      // Update database
      await pool.query(
        'UPDATE users SET profile_picture = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [userId]
      );
    }
    
    res.json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ error: 'Failed to delete profile picture' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfilePicture,
  upload
};