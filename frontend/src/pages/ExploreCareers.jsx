import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar.jsx";

const ExploreCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const suggestedCategory = location.state?.suggestedCategory ?? null;
  const recommendations = location.state?.recommendations ?? []; // Better fallback
  const showRecommendations = location.state?.showRecommendations ?? false;

  // Debug logging
  useEffect(() => {
    console.log('🔍 ExploreCareers - Location state:', location.state);
    console.log('🔍 ExploreCareers - Recommendations:', recommendations);
    console.log('🔍 ExploreCareers - Show recommendations:', showRecommendations);
  }, [location.state, recommendations, showRecommendations]);

  // Handle recommendations display
  useEffect(() => {
    if (recommendations.length > 0) {
      console.log("🧠 Filtered careers being shown:", recommendations);
    }
  }, [recommendations]);

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

  const handleSelectCareer = async (careerId, careerTitle) => {
    try {
      // If careerId is null (from quiz results), find the career by title
      let actualCareerId = careerId;
      if (!actualCareerId && careerTitle) {
        const matchingCareer = careers.find(career => 
          career.title.toLowerCase().includes(careerTitle.toLowerCase()) ||
          careerTitle.toLowerCase().includes(career.title.toLowerCase())
        );
        actualCareerId = matchingCareer?.id;
        
        if (!actualCareerId) {
          console.log('🔍 Available careers:', careers.map(c => c.title));
          console.log('🔍 Looking for career title:', careerTitle);
        }
      }
      
      if (!actualCareerId) {
        alert(`Career "${careerTitle}" not found. Please try again or select from the available careers below.`);
        return;
      }
      
      console.log('🎯 Setting career goal:', actualCareerId, careerTitle);
      await api.post("/roadmap/select", { career_id: actualCareerId });
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
      'Design': 'from-indigo-500 to-purple-600',
      'Technical': 'from-amber-500 to-orange-600',
      'Vocational': 'from-green-500 to-emerald-600'
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
      'Design': '🎨',
      'Technical': '🔧',
      'Vocational': '🛠️'
    };
    return icons[category] || '💼';
  };

  const getCareerInfo = (career) => {
    const info = {
      'German Technical Training': {
        website: 'https://germantec.lk/index.php/register-now/',
        youtube: 'https://www.youtube.com/watch?v=example', // Add actual YouTube link if available
        requirements: 'G.C.E. O/L with 6 subjects including Mathematics and Science',
        duration: '3-4 years',
        ageLimit: '16-22 years'
      },
      'Vocational Training Authority (VTA)': {
        website: 'https://course.vta.lk/program/desc/',
        youtube: 'https://www.youtube.com/watch?v=example', // Add actual YouTube link if available
        requirements: 'Above 16 years old with basic educational qualifications',
        duration: '1-18 months (varies by course)',
        ageLimit: '16+ years'
      },
      'Nursing Training School (NTS)': {
        website: 'https://www.youtube.com/watch?v=-4CMH6WRDW8',
        youtube: 'https://www.youtube.com/watch?v=-4CMH6WRDW8',
        requirements: 'A/L with 3 science subjects including Biology, O/L credit passes',
        duration: '3-4 years',
        ageLimit: 'No specific limit'
      }
    };
    return info[career.title] || {};
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-900 pt-16 flex items-center justify-center">
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
      <div className="min-h-screen bg-slate-900 pt-16">
        <style>{`
          /* Professional Explore Careers Styling */
          
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
          {/* Questionnaire Recommendations */}
          {showRecommendations && recommendations && recommendations.length > 0 && (
            <div className="mb-12">
              <div className="gradient-border p-1 rounded-3xl">
                <div className="bg-slate-900 rounded-3xl p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-cyan-400 rounded-full flex items-center justify-center glow-effect">
                        <span className="text-4xl">🎯</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Your Career Recommendations</h3>
                    <p className="text-cyan-300 text-lg">
                      Based on your questionnaire answers, here are your top career matches:
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {recommendations.slice(0, 3).map((rec, index) => (
                      <div key={rec.career_id} className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 text-center">
                        <div className="mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">
                              {rec.career_category === 'Healthcare' ? '🏥' : '🔧'}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-white mb-2">{rec.career_title}</h4>
                          <p className="text-gray-300 text-sm mb-3">{rec.career_category}</p>
                          <div className="flex items-center justify-center">
                            <span className="bg-gradient-to-r from-green-400 to-cyan-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {Math.round(rec.match_score * 100)}% Match
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSelectCareer(rec.career_id, rec.career_title)}
                          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          Choose This Career
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suggestion Banner */}
          {suggestedCategory && !showRecommendations && (
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
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {career.description}
                    </p>
                    
                    {/* Career Info */}
                    {(() => {
                      const info = getCareerInfo(career);
                      if (Object.keys(info).length > 0) {
                        return (
                          <div className="mb-6 space-y-2">
                            <div className="flex items-center text-sm text-gray-400">
                              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                              <span><strong>Requirements:</strong> {info.requirements}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                              <span><strong>Duration:</strong> {info.duration}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                              <span><strong>Age Limit:</strong> {info.ageLimit}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleSelectCareer(career.id, career.title)}
                        className={`w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                          suggestedCategory === career.category
                            ? 'bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/25'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                        }`}
                      >
                        {suggestedCategory === career.category ? '🎯 Set as My Goal' : 'Choose This Path'}
                      </button>
                      
                      {(() => {
                        const info = getCareerInfo(career);
                        if (info.website) {
                          return (
                            <div className="flex space-x-2">
                              <a
                                href={info.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors text-center"
                              >
                                Official Website
                              </a>
                              {info.youtube && (
                                <a
                                  href={info.youtube}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors text-center"
                                >
                                  YouTube
                                </a>
                              )}
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
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