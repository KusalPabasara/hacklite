const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");
const fs = require('fs');
const path = require('path');
const pool = require('../db');

require('dotenv').config();

const register = async (req, res) => {
  try {
    const { name, email, password, role = "student", language = "en" } = req.body;
    
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered. Please use a different email or sign in." });
    }
    
    // Validate password strength (basic check)
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }
    
    const hashedPw = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, password: hashedPw, role, language });
    res.status(201).json({ message: "Account created successfully! Please sign in to continue.", user });
  } catch (err) {
    console.error('Registration error:', err);
    
    // Handle specific database errors
    if (err.code === '23505' && err.constraint === 'users_email_key') {
      return res.status(400).json({ message: "Email is already registered. Please use a different email or sign in." });
    }
    
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    
    const user = await findUserByEmail(email);
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) return res.status(404).json({ error: "User not found" });

    console.log('User password hash exists:', !!user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

    // Get saved questionnaire recommendations (if table exists)
    let recommendations = {};
    try {
      const recommendationsResult = await pool.query(
        'SELECT career_path, match_percentage, is_top_recommendation FROM user_career_recommendations WHERE user_id=$1 ORDER BY match_percentage DESC',
        [user.id]
      );
      recommendations = recommendationsResult.rows.reduce((acc, row) => {
        acc[row.career_path] = row.match_percentage;
        return acc;
      }, {});
    } catch (err) {
      console.log('Recommendations table not found, using empty recommendations');
      recommendations = {};
    }

    res.json({
      message: "Login successful",
      token,
      user: { 
        id: user.id, 
        name: user.name, 
        username: user.name, // Use name as username since username column doesn't exist
        email: user.email,
        profile_picture: user.profile_picture || null,
        role: user.role,
        questionnaire_completed: user.questionnaire_completed || false
      },
      recommendations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed." });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Query for both UUID and integer IDs
    const result = await pool.query(
      'SELECT id, name, email, role, language, location, bio, phone, education, interests, profile_picture, questionnaire_completed, questionnaire_completed_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, name, email, language, location, bio, phone, education, interests, profile_pic } = req.body;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [email, userId]
      );
      
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Email already in use by another account' });
      }
    }

    let photoUrl = null;
    if (req.file) {
      photoUrl = `/uploads/profile-pictures/${req.file.filename}`;
      
      // Delete old profile picture if it exists
      const oldUser = await pool.query('SELECT photo_url FROM users WHERE id = $1', [userId]);
      if (oldUser.rows[0]?.photo_url && oldUser.rows[0].photo_url.startsWith('/uploads/profile-pictures/')) {
        const oldFilePath = path.join(__dirname, '../../', oldUser.rows[0].photo_url);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    // Handle name field - prefer fullName if provided, otherwise use name
    const nameToUpdate = fullName || name;
    if (nameToUpdate) {
      updates.push(`name = $${paramCount}`);
      values.push(nameToUpdate);
      paramCount++;
    }

    if (email) {
      updates.push(`email = $${paramCount}`);
      values.push(email);
      paramCount++;
    }

    if (language) {
      updates.push(`language = $${paramCount}`);
      values.push(language);
      paramCount++;
    }

    if (location) {
      updates.push(`location = $${paramCount}`);
      values.push(location);
      paramCount++;
    }

    if (bio) {
      updates.push(`bio = $${paramCount}`);
      values.push(bio);
      paramCount++;
    }

    if (phone) {
      updates.push(`phone = $${paramCount}`);
      values.push(phone);
      paramCount++;
    }

    if (education) {
      updates.push(`education = $${paramCount}`);
      values.push(education);
      paramCount++;
    }

    if (interests) {
      updates.push(`interests = $${paramCount}`);
      values.push(interests);
      paramCount++;
    }

    if (profile_pic) {
      updates.push(`profile_picture = $${paramCount}`);
      values.push(profile_pic);
      paramCount++;
    }

    if (photoUrl) {
      updates.push(`photo_url = $${paramCount}`);
      values.push(photoUrl);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(userId);

    const query = `
      UPDATE users 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING id, name, email, role, language, location, bio, phone, education, interests, profile_picture, photo_url, questionnaire_completed, questionnaire_completed_at, created_at, updated_at
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ 
      message: 'Profile updated successfully', 
      user: result.rows[0] 
    });
  } catch (error) {
    console.error('❌ Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Delete profile picture
const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get current photo URL
    const result = await pool.query('SELECT photo_url FROM users WHERE id = $1', [userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const photoUrl = result.rows[0].photo_url;

    if (!photoUrl) {
      return res.status(400).json({ error: 'No profile picture to delete' });
    }

    // Delete file from filesystem
    if (photoUrl.startsWith('/uploads/profile-pictures/')) {
      const filePath = path.join(__dirname, '../../', photoUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Update database
    await pool.query(
      'UPDATE users SET photo_url = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [userId]
    );

    res.json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting profile picture:', error);
    res.status(500).json({ error: 'Failed to delete profile picture' });
  }
};

// Check if email exists
const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    
    const user = await findUserByEmail(email);
    res.json({ exists: !!user });
  } catch (err) {
    console.error('Email check error:', err);
    res.status(500).json({ error: "Failed to check email" });
  }
};

module.exports = { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  deleteProfilePicture,
  checkEmailExists
};