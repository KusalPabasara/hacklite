import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff, Check, X, AlertCircle, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import Logo from "../components/Logo";

function Register() {
  const { register: registerUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });
  const [emailExists, setEmailExists] = useState(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to user preferences
  const redirectTo = location.state?.from?.pathname || "/user-preferences";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Check password strength when password changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    
    // Check email existence when email changes (debounced)
    if (name === 'email' && value.includes('@')) {
      clearTimeout(window.emailCheckTimeout);
      window.emailCheckTimeout = setTimeout(() => checkEmailExists(value), 1000);
    }
  };
  
  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];
    
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }
    
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One lowercase letter');
    }
    
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One uppercase letter');
    }
    
    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('One number');
    }
    
    if (/[^\w\s]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One special character');
    }
    
    setPasswordStrength({ score, feedback });
  };
  
  // Email existence checker using Supabase
  const checkEmailExists = async (email) => {
    if (!email || !email.includes('@')) return;
    
    setIsCheckingEmail(true);
    try {
      // Check if user exists in Supabase auth
      const { data, error } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Email check error:', error);
        setEmailExists(false);
      } else {
        setEmailExists(!!data);
      }
    } catch (err) {
      console.log('Email check failed:', err.message);
      setEmailExists(false);
    } finally {
      setIsCheckingEmail(false);
    }
  };
  
  // Get password strength color and text
  const getPasswordStrengthInfo = () => {
    const { score } = passwordStrength;
    if (score <= 1) return { color: 'text-red-500', bg: 'bg-red-500', text: 'Weak', width: '20%' };
    if (score <= 2) return { color: 'text-orange-500', bg: 'bg-orange-500', text: 'Fair', width: '40%' };
    if (score <= 3) return { color: 'text-yellow-500', bg: 'bg-yellow-500', text: 'Good', width: '60%' };
    if (score <= 4) return { color: 'text-blue-500', bg: 'bg-blue-500', text: 'Strong', width: '80%' };
    return { color: 'text-green-500', bg: 'bg-green-500', text: 'Very Strong', width: '100%' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    if (passwordStrength.score < 3) {
      setError("Please choose a stronger password.");
      return;
    }
    
    if (emailExists === true) {
      setError("This email is already registered. Please use a different email or sign in.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('🔐 Attempting registration with Supabase:', form.email);
      const result = await registerUser(form.email, form.password, form.name);
      
      if (result.success) {
        if (result.warning) {
          // Show warning but allow user to proceed
          console.log('⚠️ Registration warning:', result.warning);
          setError(result.warning);
          // Still navigate after a short delay
          setTimeout(() => {
            navigate(redirectTo);
          }, 2000);
        } else if (result.requiresEmailConfirmation) {
          // Email confirmation required
          console.log('📧 Email confirmation required');
          setError(""); // Clear any errors
          setSuccessMessage(result.message || "Account created! Please check your email (including spam folder) for a confirmation link. Click the link to verify your email, then sign in.");
          
          // Navigate to login after showing message
          setTimeout(() => {
            navigate("/login", { 
              state: { 
                message: result.message || "Account created! Please check your email (including spam folder) for a confirmation link. Click the link to verify your email, then sign in." 
              } 
            });
          }, 3000);
        } else {
          // Registration successful, user logged in
          console.log('✅ Registration successful');
          navigate(redirectTo);
        }
      } else {
        console.error('❌ Registration failed:', result.error);
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-start sm:items-center justify-center p-3 sm:p-4 py-4 sm:py-6 md:py-8 hide-scrollbar"
      style={{ 
        backgroundColor: 'var(--bg-secondary)',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      <div className="w-full max-w-md mx-auto my-auto">
        <div 
          className="rounded-xl shadow-sm border p-4 sm:p-6 md:p-8 mb-4 hide-scrollbar"
          style={{ 
            backgroundColor: 'var(--bg-primary)', 
            borderColor: 'var(--border-primary)',
            maxHeight: 'calc(100vh - 2rem)',
            overflowY: 'auto'
          }}
        >
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex justify-center mb-2 sm:mb-3">
              <Logo className="h-10 sm:h-12 md:h-16" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>Create Account</h1>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>Start your career journey with us</p>
          </div>
          
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs sm:text-sm">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base min-h-[44px]"
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-primary)'
                }}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base min-h-[44px]"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    color: 'var(--text-primary)',
                    borderColor: emailExists === true ? '#ef4444' : emailExists === false ? '#10b981' : 'var(--border-primary)'
                  }}
                  placeholder="Enter your email"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isCheckingEmail ? (
                    <div className="animate-spin w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                  ) : emailExists === true ? (
                    <X className="w-5 h-5 text-red-500" />
                  ) : emailExists === false ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : form.email.includes('@') ? (
                    <Mail className="w-5 h-5 text-gray-400" />
                  ) : null}
                </div>
              </div>
              {emailExists === true && (
                <p className="text-red-500 text-sm mt-1">This email is already registered</p>
              )}
              {emailExists === false && (
                <p className="text-green-500 text-sm mt-1">Email is available</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base min-h-[44px]"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-primary)'
                  }}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {form.password && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Password Strength:</span>
                    <span className={`text-sm font-medium ${getPasswordStrengthInfo().color}`}>
                      {getPasswordStrengthInfo().text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthInfo().bg}`}
                      style={{ width: getPasswordStrengthInfo().width }}
                    ></div>
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Requirements:</p>
                      {passwordStrength.feedback.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
                          <AlertCircle className="w-3 h-3" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base min-h-[44px]"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    color: 'var(--text-primary)',
                    borderColor: form.confirmPassword && form.password !== form.confirmPassword ? '#ef4444' : 'var(--border-primary)'
                  }}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
              {form.confirmPassword && form.password === form.confirmPassword && form.confirmPassword.length > 0 && (
                <p className="text-green-500 text-sm mt-1">Passwords match</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-2.5 sm:py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg min-h-[44px] sm:min-h-[48px] flex items-center justify-center mt-4 sm:mt-6"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          
          <div className="mt-4 sm:mt-6 text-center pb-2">
            <p style={{ color: 'var(--text-secondary)' }} className="text-xs sm:text-sm md:text-base">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium transition-colors underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;