import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar.jsx";

const ExploreCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
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
=======
  // Extract state with better error handling
  const state = location.state || {};
  const recommendations = state.recommendations || [];
  const fromQuestionnaire = state.fromQuestionnaire || false;
  const showRecommendations = state.showRecommendations || false;
  const suggestedCategory = state.suggestedCategory || null;
  const error = state.error || null;

  useEffect(() => {
    console.log('🔍 ExploreCareers - Full location state:', location.state);
    console.log('🔍 ExploreCareers - Recommendations:', recommendations);
    console.log('🔍 ExploreCareers - From questionnaire:', fromQuestionnaire);
    console.log('🔍 ExploreCareers - Show recommendations:', showRecommendations);
    console.log('🔍 ExploreCareers - Suggested category:', suggestedCategory);
    console.log('🔍 ExploreCareers - Error:', error);
    
    // Set careers based on recommendations or default
    if (recommendations.length > 0) {
      setCareers(recommendations);
    } else {
      // Load default careers if no recommendations
      loadDefaultCareers();
    }
    
    setLoading(false);
  }, [location.state]);

  const loadDefaultCareers = () => {
    // Default careers when no recommendations
    const defaultCareers = [
      {
        title: "Software Engineer",
        description: "Design and develop software applications",
        category: "Technology",
        matchScore: null
      },
      {
        title: "Healthcare Worker", 
        description: "Provide medical care and support",
        category: "Healthcare",
        matchScore: null
      },
      {
        title: "Teacher",
        description: "Educate and inspire students",
        category: "Education", 
        matchScore: null
      }
    ];
    setCareers(defaultCareers);
  };
>>>>>>> c2fbe43 (Initial commit)

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
        <div className="main-content bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-600 dark:text-cyan-300 text-lg">Loading careers...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="main-content bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 overflow-y-auto">
        {/* Hero Section - Dashboard Style */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute -top-32 right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
            <div className="absolute -bottom-32 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center slide-up">
              <h1 className="text-h1 text-white dark:text-white mb-6">
                Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Careers</span>
              </h1>
              <p className="text-subtitle text-white/80 dark:text-white/80 max-w-3xl mx-auto">
                Discover exciting career paths that match your interests and skills. 
                Your future starts with the right choice.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Questionnaire Recommendations - Dashboard Card Style */}
          {showRecommendations && recommendations && recommendations.length > 0 && (
            <div className="mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🎯</span>
                  </div>
                  <h3 className="text-h2 text-gray-900 dark:text-white mb-2">Your Career Recommendations</h3>
                  <p className="text-subtitle text-gray-600 dark:text-gray-400">
                    Based on your questionnaire answers, here are your top career matches:
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {recommendations.slice(0, 3).map((rec, index) => (
                    <div key={rec.career_id} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                      <div className="mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">
                            {rec.career_category === 'Healthcare' ? '🏥' : '🔧'}
                          </span>
                        </div>
                        <h4 className="text-h3 text-gray-900 dark:text-white mb-2">{rec.career_title}</h4>
                        <p className="text-small text-gray-600 dark:text-gray-400 mb-3">{rec.career_category}</p>
                        <div className="flex items-center justify-center">
                          <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {Math.round(rec.match_score * 100)}% Match
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSelectCareer(rec.career_id, rec.career_title)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25"
                      >
                        Choose This Career
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Suggestion Banner - Dashboard Card Style */}
          {suggestedCategory && !showRecommendations && (
            <div className="mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="text-h2 text-gray-900 dark:text-white mb-2">Perfect Match Found!</h3>
                <p className="text-subtitle text-gray-600 dark:text-gray-400">
                  Based on your quiz results, careers in <span className="font-bold text-cyan-600 dark:text-cyan-400">{suggestedCategory}</span> are your best fit!
                </p>
              </div>
            </div>
          )}

          {/* Career Grid - Dashboard Card Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career, index) => (
              <div 
                key={career.id} 
                className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1 ${
                  suggestedCategory === career.category 
                    ? 'ring-2 ring-cyan-500 ring-opacity-50' 
                    : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Career Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">{getCategoryIcon(career.category)}</span>
                  </div>
                  {suggestedCategory === career.category && (
                    <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </span>
                  )}
                </div>

                {/* Career Content */}
                <div className="mb-6">
                  <h3 className="text-h3 text-gray-900 dark:text-white mb-2">{career.title}</h3>
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {career.category}
                  </span>
                  <p className="text-body text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {career.description}
                  </p>
                  
                  {/* Career Info */}
                  {(() => {
                    const info = getCareerInfo(career);
                    if (Object.keys(info).length > 0) {
                      return (
                        <div className="mb-6 space-y-2">
                          <div className="flex items-center text-small text-gray-600 dark:text-gray-400">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                            <span><strong>Requirements:</strong> {info.requirements}</span>
                          </div>
                          <div className="flex items-center text-small text-gray-600 dark:text-gray-400">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                            <span><strong>Duration:</strong> {info.duration}</span>
                          </div>
                          <div className="flex items-center text-small text-gray-600 dark:text-gray-400">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                            <span><strong>Age Limit:</strong> {info.ageLimit}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleSelectCareer(career.id, career.title)}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                      suggestedCategory === career.category
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white shadow-lg hover:shadow-cyan-500/25'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-purple-500/25'
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
                            className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors text-center"
                          >
                            Official Website
                          </a>
                          {info.youtube && (
                            <a
                              href={info.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors text-center"
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
            ))}
          </div>

          {/* Bottom CTA Section - Dashboard Style */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-h2 text-white mb-4">Ready to start your career journey?</h3>
                <p className="text-subtitle text-white/90 mb-8 max-w-2xl mx-auto">
                  Take our career assessment quiz to get personalized recommendations and find your perfect career path.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/questionnaire')}
                    className="btn-primary py-4 px-8 text-lg"
                  >
                    Take Career Quiz
                  </button>
                  <button
                    onClick={() => navigate('/quizzes')}
                    className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-purple-600 py-4 px-8 text-lg"
                  >
                    Explore Quizzes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreCareers;