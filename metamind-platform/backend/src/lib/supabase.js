const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://onzdjdxvnemoikybbwhz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  console.error('⚠️ Supabase service role key not found. Please add SUPABASE_SERVICE_ROLE_KEY to your .env file');
}

// Create Supabase client with service role key (for backend operations)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper function to verify a user's JWT token
const verifySupabaseToken = async (token) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) {
      console.error('Token verification error:', error);
      return null;
    }
    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Helper function to create a user profile
const createUserProfile = async (userId, userData) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: userId,
          full_name: userData.full_name || userData.name,
          email: userData.email,
          questionnaire_completed: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to create user profile:', error);
    return null;
  }
};

// Helper function to get user profile
const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};

// Helper function to update user profile
const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return null;
  }
};

module.exports = {
  supabase,
  verifySupabaseToken,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
};

