import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
=======
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
>>>>>>> c2fbe43 (Initial commit)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
<<<<<<< HEAD
    
=======

>>>>>>> c2fbe43 (Initial commit)
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        /* Unified Auth Background */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float-up {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        .gradient-animate {
          background: linear-gradient(-45deg, #06b6d4, #10b981, #7f5af0, #a855f7);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        
        /* Professional Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
          50% { box-shadow: 0 0 30px rgba(6, 182, 212, 0.5); }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          animation: float-up 20s infinite linear;
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 gradient-animate opacity-20"></div>
<<<<<<< HEAD
      
=======

>>>>>>> c2fbe43 (Initial commit)
      {/* Floating Bubbles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
<<<<<<< HEAD
            animationDuration: `${Math.random() * 10 + 20}s`
=======
            animationDuration: `${Math.random() * 10 + 20}s`,
>>>>>>> c2fbe43 (Initial commit)
          }}
        ></div>
      ))}

<<<<<<< HEAD
      {/* Morphing Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/20 morph-shape filter blur-3xl"></div>
<<<<<<< HEAD
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 morph-shape filter blur-3xl" style={{animationDelay: '4s'}}></div>
=======
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 morph-shape filter blur-3xl"
        style={{ animationDelay: "4s" }}
      ></div>
>>>>>>> c2fbe43 (Initial commit)

=======
>>>>>>> 4199d3e (feat: changed ui)
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo className="h-20 w-auto" />
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
          <p className="text-cyan-300 text-lg font-light">Your Smart Career Navigator</p>
=======
          <p className="text-cyan-300 text-lg font-light">
=======
          <h1 className="text-h1 text-white mb-2">Welcome Back</h1>
          <p className="text-subtitle text-white/80">
>>>>>>> 4199d3e (feat: changed ui)
            Your Smart Career Navigator
          </p>
>>>>>>> c2fbe43 (Initial commit)
        </div>

<<<<<<< HEAD
        {/* Login Form */}
        <div className="glass-effect rounded-3xl p-8 shadow-2xl">
<<<<<<< HEAD
          <h2 className="text-2xl font-semibold text-white mb-6">Welcome Back</h2>
          
=======
          <h2 className="text-2xl font-semibold text-white mb-6">
            Welcome Back
          </h2>

>>>>>>> c2fbe43 (Initial commit)
=======
        {/* Login Form - Dashboard Card Style */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 fade-in-up">
>>>>>>> 4199d3e (feat: changed ui)
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-2xl mb-6 flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
<<<<<<< HEAD
<<<<<<< HEAD
              <label className="block text-sm font-medium text-cyan-300 mb-2">Email Address</label>
=======
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Email Address
              </label>
>>>>>>> c2fbe43 (Initial commit)
=======
              <label className="form-label text-gray-700 dark:text-gray-300">Email Address</label>
>>>>>>> 4199d3e (feat: changed ui)
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 pr-12"
                  required
                />
<<<<<<< HEAD
                <div className="absolute right-4 top-4 text-cyan-400">
<<<<<<< HEAD
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  </div>
=======
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
=======
                <div className="absolute right-4 top-4 text-cyan-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
>>>>>>> 4199d3e (feat: changed ui)
                  </svg>
                </div>
>>>>>>> c2fbe43 (Initial commit)
              </div>
            </div>

            <div>
<<<<<<< HEAD
<<<<<<< HEAD
              <label className="block text-sm font-medium text-cyan-300 mb-2">Password</label>
=======
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Password
              </label>
>>>>>>> c2fbe43 (Initial commit)
=======
              <label className="form-label text-gray-700 dark:text-gray-300">Password</label>
>>>>>>> 4199d3e (feat: changed ui)
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 pr-12"
                  required
                />
<<<<<<< HEAD
                <div className="absolute right-4 top-4 text-cyan-400">
<<<<<<< HEAD
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
=======
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
>>>>>>> c2fbe43 (Initial commit)
                  </svg>
                </div>
=======
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-cyan-500 hover:text-cyan-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
>>>>>>> 4199d3e (feat: changed ui)
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-small text-cyan-600 hover:text-cyan-500 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-small text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
<<<<<<< HEAD
<<<<<<< HEAD
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200">
=======
              <Link
                to="/register"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200"
              >
>>>>>>> c2fbe43 (Initial commit)
                Create one now
=======
              <Link to="/register" className="text-cyan-600 hover:text-cyan-500 font-semibold transition-colors">
                Sign up
>>>>>>> 4199d3e (feat: changed ui)
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-small text-white/40">
            Powered by MetaMind • Built for your success
          </p>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> c2fbe43 (Initial commit)
