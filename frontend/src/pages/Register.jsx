import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import Logo from "../components/Logo";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        /* Professional Register Styling */
        
        @keyframes aurora {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.5); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(168, 85, 247, 0.4); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .aurora-bg {
          background: linear-gradient(45deg, #a855f7, #ec4899, #06b6d4, #10b981);
          filter: blur(100px);
          animation: aurora 20s ease-in-out infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        
        .input-field {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .input-field:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #a855f7;
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
        }
        
        .slide-in {
          animation: slide-in 0.6s ease-out;
        }
        
        .pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] aurora-bg opacity-30"></div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-up ${Math.random() * 10 + 10}s infinite linear`,
              animationDelay: `${Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md slide-in">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo className="h-16" />
          </div>
          <p className="text-purple-300 text-lg font-light">Begin Your Journey</p>
        </div>

        {/* Registration Form */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-semibold text-white mb-6">Create Account</h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-2xl mb-6 flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                className="w-full px-5 py-4 input-field rounded-2xl text-white placeholder-white/40 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                onChange={handleChange}
                className="w-full px-5 py-4 input-field rounded-2xl text-white placeholder-white/40 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                onChange={handleChange}
                className="w-full px-5 py-4 input-field rounded-2xl text-white placeholder-white/40 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/60">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200">
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