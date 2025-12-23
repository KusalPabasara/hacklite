const { verifySupabaseToken, getUserProfile } = require("../lib/supabase");

/**
 * Middleware to verify Supabase JWT tokens
 * Attaches the authenticated user data to req.user
 */
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("🔐 Incoming Supabase token:", authHeader ? "Token present" : "No token");
  
  if (!authHeader) {
    console.log("❌ No authorization header");
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("❌ Invalid token format");
    return res.status(401).json({ error: "Token invalid" });
  }

  try {
    // Verify Supabase JWT token
    const user = await verifySupabaseToken(token);
    
    if (!user) {
      console.log("❌ Invalid or expired token");
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // Get user profile from database
    const profile = await getUserProfile(user.id);
    
    // Attach user data to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.user_metadata?.role || 'user',
      // Include profile data if available
      ...(profile && {
        full_name: profile.full_name,
        language: profile.language,
        questionnaire_completed: profile.questionnaire_completed
      })
    };
    
    console.log("✅ Supabase token verified for user:", req.user.email);
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = { verifyToken };