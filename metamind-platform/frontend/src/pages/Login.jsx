import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to dashboard
  const redirectTo = location.state?.from?.pathname || "/dashboard";
  
  // Check for success message from registration or email confirmation
  useEffect(() => {
    // Check URL params for email confirmation
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('confirmed') === 'true') {
      setSuccessMessage('Email confirmed successfully! You can now sign in.');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Check for message from registration
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after showing it
      setTimeout(() => setSuccessMessage(""), 8000);
    }
  }, [location.state]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      console.log('🔐 Attempting login with Supabase:', form.email);
      const result = await login(form.email, form.password);
      
      if (result.success) {
        console.log('✅ Login successful');
        // Navigate based on questionnaire completion
        setTimeout(() => {
          navigate(redirectTo);
        }, 100);
      } else {
        console.error('❌ Login failed:', result.error);
        setError(result.error || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm sm:text-base">Sign in to continue your career journey</p>
          </div>
          
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {successMessage}
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base min-h-[44px]"
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-primary)'
                }}
                placeholder="Enter your email"
              />
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
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-2.5 sm:py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg min-h-[44px] sm:min-h-[48px] flex items-center justify-center mt-4 sm:mt-6"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          
          <div className="mt-4 sm:mt-6 text-center pb-2">
            <p style={{ color: 'var(--text-secondary)' }} className="text-xs sm:text-sm md:text-base">
              Don't have an account?{" "}
              <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium transition-colors underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;