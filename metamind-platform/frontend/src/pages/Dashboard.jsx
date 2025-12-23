import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { setTargetCareer } from "../utils/roadmapApi";

const Dashboard = () => {
  const { user, markQuestionnaireCompleted } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    quizzesCompleted: 2,
    careerGoals: 1,
    roadmapProgress: 65,
    mentorConnections: 3
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [showQuizResults, setShowQuizResults] = useState(false);

  useEffect(() => {
    // Check if user just completed questionnaire
    if (location.state?.questionnaireCompleted && location.state?.recommendations) {
      setRecommendations(location.state.recommendations);
      setShowRecommendations(true);
      markQuestionnaireCompleted();
      // Clear the state to prevent showing again on refresh
      window.history.replaceState({}, document.title);
    }
    
    // Check if user just completed quiz
    if (location.state?.quizCompleted && location.state?.quizResults) {
      setQuizResults(location.state.quizResults);
      setShowQuizResults(true);
      // Clear the state to prevent showing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, markQuestionnaireCompleted]);

  const quickActions = [
    {
      title: "Take Career Quiz",
      description: "Discover your perfect career path",
      icon: "🧠",
      color: "from-cyan-400 to-teal-600",
      link: "/quizzes",
      bgColor: "bg-cyan-50"
    },
    {
      title: "Explore Careers",
      description: "Browse different career options",
      icon: "🔍",
      color: "from-emerald-400 to-green-600",
      link: "/explore-careers",
      bgColor: "bg-emerald-50"
    },
    {
      title: "View Roadmap",
      description: "Track your learning progress",
      icon: "🗺️",
      color: "from-violet-400 to-purple-600",
      link: "/roadmap",
      bgColor: "bg-violet-50"
    },
    {
      title: "Connect Mentors",
      description: "Get guidance from experts",
      icon: "👥",
      color: "from-amber-400 to-orange-600",
      link: "/mentors",
      bgColor: "bg-amber-50"
    }
  ];

  const recentActivities = [
    { action: "Completed Career Interest Quiz", time: "2 hours ago", type: "quiz" },
    { action: "Set Software Engineer as career goal", time: "1 day ago", type: "goal" },
    { action: "Connected with mentor Sarah Johnson", time: "3 days ago", type: "mentor" }
  ];

  return (
    <>
      {/* Global Dashboard Styles */}
      <style>{`
        /* Dashboard Full Layout Styles */
        .dashboard-container {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-y: auto;
          overflow-x: hidden;
        }
        
        .dashboard-content {
          min-height: 100%;
          width: 100%;
        }
        
        /* Professional Dashboard Styling */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.5); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.8); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        /* Improved text visibility */
        .action-card-text {
          color: #1e293b;
          font-weight: 600;
        }
        
        .action-card-desc {
          color: #475569;
          font-weight: 500;
        }
        
        /* Hero section full width */
        .hero-section {
          width: 100%;
          margin: 0 -2rem;
          padding: 0 2rem;
        }
        
        /* Content container improvements */
        .content-container {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 0;
        }
        
        /* Stats cards responsive */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 0 0 2rem 0;
        }
        
        /* Quick actions grid */
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
        
        /* Bottom section grid */
        .bottom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            margin: 0 -1rem;
            padding: 0 1rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }
          
          .actions-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }
          
          .bottom-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-content">
          {/* Hero Section with Clean Design */}
          <div className="hero-section relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 float-animation"></div>
              <div className="absolute top-40 right-20 w-96 h-96 bg-orange-300 dark:bg-orange-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation" style={{animationDelay: '2s'}}></div>
              <div className="absolute -bottom-32 left-40 w-80 h-80 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply filter blur-3xl opacity-25 float-animation" style={{animationDelay: '4s'}}></div>
            </div>
            
            <div className="relative z-10 px-6 py-16 lg:py-24">
              <div className="text-center slide-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Welcome back, <span className="text-orange-500 dark:text-orange-400">{user?.name || 'Guest'}</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Your comprehensive career companion. Discover your perfect path, build skills, and connect with mentors to achieve your dreams.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="content-container px-4 lg:px-8 py-8">
            
            {/* Career Recommendations Modal */}
            {showRecommendations && recommendations.length > 0 && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">🎉</div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Perfect Match Found!</h2>
                      <p className="text-slate-600 dark:text-slate-400">Based on your questionnaire, we found the ideal career paths for you</p>
                    </div>
                    
                    <div className="space-y-6">
                      {recommendations.map((rec, index) => (
                        <div key={rec.career_id} className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900 dark:to-teal-900 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-700">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <span className="bg-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full mr-3">
                                  #{index + 1}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{rec.career_title}</h3>
                              </div>
                              <p className="text-slate-600 dark:text-slate-300 mb-3">{rec.description}</p>
                              <div className="flex items-center">
                                <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">Match Score:</span>
                                <div className="flex items-center">
                                  <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                                    <div 
                                      className="bg-cyan-600 h-2 rounded-full transition-all duration-1000"
                                      style={{ width: `${rec.match_score * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-bold text-cyan-600">
                                    {Math.round(rec.match_score * 100)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={async () => {
                                try {
                                  await setTargetCareer(rec.career_id);
                                  navigate(`/roadmap/${rec.career_id}`);
                                } catch (error) {
                                  console.error('Error setting target career:', error);
                                  navigate(`/roadmap/${rec.career_id}`);
                                }
                              }}
                              className="ml-4 bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
                            >
                              View Roadmap
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-8 space-x-4">
                      <button
                        onClick={() => setShowRecommendations(false)}
                        className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
                      >
                        Close
                      </button>
                      <Link
                        to="/explore-careers"
                        className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
                      >
                        Explore All Careers
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quiz Results Modal */}
            {showQuizResults && quizResults && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">🎯</div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Quiz Results!</h2>
                      <p className="text-slate-600 dark:text-slate-400">Based on your answers, here's your career recommendation</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-8 border border-purple-200 dark:border-purple-700">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {quizResults.suggested_career}
                        </h3>
                        <span className="inline-block bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                          {quizResults.career_category}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-2">{quizResults.scores.technology}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Technology Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-2">{quizResults.scores.healthcare}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Healthcare Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-pink-600 mb-2">{quizResults.scores.design}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Design Score</div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-slate-700 dark:text-slate-300 mb-4">
                          Your quiz results show a strong preference for <strong>{quizResults.career_category.toLowerCase()}</strong> careers. 
                          We recommend exploring <strong>{quizResults.suggested_career}</strong> as your next step!
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-8 space-x-4">
                      <button
                        onClick={() => setShowQuizResults(false)}
                        className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
                      >
                        Close
                      </button>
                      <Link
                        to="/explore-careers"
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                      >
                        Explore Careers
                      </Link>
                      <Link
                        to="/roadmap"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        View Roadmap
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Cards with Clean Design */}
            <div className="stats-grid -mt-12 relative z-20 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Quizzes Completed</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.quizzesCompleted}</p>
                  </div>
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 text-2xl">
                    📝
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Career Goals</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.careerGoals}</p>
                  </div>
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 text-2xl">
                    🎯
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Roadmap Progress</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.roadmapProgress}%</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl">
                    📊
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Mentor Connections</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">{stats.mentorConnections}</p>
                  </div>
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl">
                    👥
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions with Clean Design */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Quick Actions</h2>
              <div className="actions-grid">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 p-6"
                  >
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{action.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity & Progress with Clean Cards */}
            <div className="bottom-grid">
              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${
                        activity.type === 'quiz' ? 'bg-orange-500' :
                        activity.type === 'goal' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Progress</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Career Quiz</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Roadmap Steps</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{stats.roadmapProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-orange-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${stats.roadmapProgress}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Mentor Connections</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{stats.mentorConnections}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(stats.mentorConnections/5)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">Ready to accelerate your career?</h3>
                  <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">
                    Take the next step in your professional journey. Marga.lk will guide you to success.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/quizzes"
                      className="bg-white text-orange-600 hover:bg-orange-50 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Start Career Quiz
                    </Link>
                    <Link
                      to="/explore-careers"
                      className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Careers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Theme Toggle */}
      <ThemeToggle variant="floating" />
    </>
  );
};

export default Dashboard;