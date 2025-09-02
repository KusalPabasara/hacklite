import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar.jsx";

const ExploreCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const suggestedCategory = location.state?.suggestedCategory;

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/careers");
        setCareers(res.data);
      } catch (error) {
        console.error("Failed to fetch careers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleSelectCareer = async (careerId) => {
    try {
      await api.post("/roadmap/select", { career_id: careerId });
      navigate("/roadmap");
    } catch (err) {
      console.error("Error setting career goal", err);
      alert("Could not set career goal. Please try again.");
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'from-blue-500 to-indigo-600',
      'Healthcare': 'from-emerald-500 to-teal-600',
      'Finance': 'from-purple-500 to-pink-600',
      'Education': 'from-orange-500 to-red-600',
      'Marketing': 'from-pink-500 to-rose-600',
      'Design': 'from-indigo-500 to-purple-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Technology': '💻',
      'Healthcare': '🏥',
      'Finance': '💰',
      'Education': '📚',
      'Marketing': '📢',
      'Design': '🎨'
    };
    return icons[category] || '💼';
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-300 text-lg">Loading careers...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
          
          * {
            font-family: 'Outfit', sans-serif;
          }
          
          @keyframes float-card {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.5); }
            50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.4); }
          }
          
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .career-card {
            animation: slide-up 0.6s ease-out forwards;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .career-card:hover {
            animation: float-card 3s ease-in-out infinite;
          }
          
          .glow-effect {
            animation: glow 3s ease-in-out infinite;
          }
          
          .gradient-border {
            background: linear-gradient(45deg, #06b6d4, #a855f7, #ec4899, #06b6d4);
            background-size: 400% 400%;
            animation: gradient-shift 10s ease infinite;
          }
          
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Careers</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover exciting career paths that match your interests and skills. 
              Your future starts with the right choice.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Suggestion Banner */}
          {suggestedCategory && (
            <div className="mb-12">
              <div className="gradient-border p-1 rounded-3xl">
                <div className="bg-slate-900 rounded-3xl p-8 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center glow-effect">
                      <span className="text-4xl">🎯</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Perfect Match Found!</h3>
                  <p className="text-cyan-300 text-lg">
                    Based on your quiz results, careers in <span className="font-bold text-cyan-400">{suggestedCategory}</span> are your best fit!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Career Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career, index) => (
              <div 
                key={career.id} 
                className={`career-card group relative ${
                  suggestedCategory === career.category 
                    ? 'gradient-border p-1 rounded-3xl' 
                    : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`${suggestedCategory === career.category ? 'bg-slate-900' : 'bg-slate-800/50 backdrop-blur-lg border border-slate-700'} rounded-3xl overflow-hidden h-full`}>
                  {/* Career Header */}
                  <div className={`bg-gradient-to-r ${getCategoryColor(career.category)} p-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-5xl">{getCategoryIcon(career.category)}</span>
                        {suggestedCategory === career.category && (
                          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium text-white">
                            Recommended
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{career.title}</h3>
                      <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium text-white">
                        {career.category}
                      </span>
                    </div>
                  </div>

                  {/* Career Content */}
                  <div className="p-6">
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {career.description}
                    </p>
                    
                    {/* Action Button */}
                    <button
                      onClick={() => handleSelectCareer(career.id)}
                      className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        suggestedCategory === career.category
                          ? 'bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/25'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                      }`}
                    >
                      {suggestedCategory === career.category ? '🎯 Set as My Goal' : 'Choose This Path'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreCareers;