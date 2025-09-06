import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
<<<<<<< HEAD
=======
import ThemeToggle from "../components/ThemeToggle";
>>>>>>> c2fbe43 (Initial commit)
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

const Dashboard = () => {
  const { t } = useTranslation();
  const { user, markQuestionnaireCompleted } = useContext(AuthContext);
  const location = useLocation();
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
      title: t('dashboard.takeQuiz'),
      description: t('dashboard.takeQuizDesc'),
      icon: "🧠",
      color: "from-cyan-400 to-teal-600",
      link: "/quizzes",
      bgColor: "bg-cyan-50"
    },
    {
      title: t('dashboard.exploreCareers'),
      description: t('dashboard.exploreCareersDesc'),
      icon: "🔍",
      color: "from-emerald-400 to-green-600",
      link: "/explore-careers",
      bgColor: "bg-emerald-50"
    },
    {
      title: t('dashboard.viewRoadmap'),
      description: t('dashboard.viewRoadmapDesc'),
      icon: "🗺️",
      color: "from-violet-400 to-purple-600",
      link: "/roadmap",
      bgColor: "bg-violet-50"
    },
    {
      title: t('dashboard.connectMentors'),
      description: t('dashboard.connectMentorsDesc'),
      icon: "👥",
      color: "from-amber-400 to-orange-600",
      link: "/mentors",
      bgColor: "bg-amber-50"
    }
  ];

  const recentActivities = [
    { action: t('dashboard.activity1'), time: t('dashboard.time1'), type: "quiz" },
    { action: t('dashboard.activity2'), time: t('dashboard.time2'), type: "goal" },
    { action: t('dashboard.activity3'), time: t('dashboard.time3'), type: "mentor" }
  ];

  return (
    <>
      <Navbar />
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="min-h-screen bg-slate-50 pt-16">
=======
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-20 transition-all duration-300">
>>>>>>> c2fbe43 (Initial commit)
=======
      <div className="main-content bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
>>>>>>> 4199d3e (feat: changed ui)
        <style>{`
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
        `}</style>

        {/* Hero Section with Personalization */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-32 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center slide-up">
              <div className="flex items-center justify-center mb-6">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-20 h-20 rounded-full border-4 border-white/20 mr-4"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
                  </div>
                )}
                <div className="text-left">
                  <h1 className="text-h1 text-white mb-2">
                    Welcome back, <span className="gradient-text">{user?.name || 'Guest'}</span>
                  </h1>
                  <p className="text-subtitle text-white/80">
                    {user?.email || 'Ready to continue your journey?'}
                  </p>
                </div>
              </div>
              <p className="text-body-large text-white/90 max-w-3xl mx-auto leading-relaxed">
                {t('dashboard.subtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Career Recommendations Modal */}
          {showRecommendations && recommendations.length > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Perfect Match Found!</h2>
                    <p className="text-slate-600">Based on your questionnaire, we found the ideal career paths for you</p>
                  </div>
                  
                  <div className="space-y-6">
                    {recommendations.map((rec, index) => (
                      <div key={rec.career_id} className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="bg-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full mr-3">
                                #{index + 1}
                              </span>
                              <h3 className="text-xl font-bold text-slate-900">{rec.career_title}</h3>
                            </div>
                            <p className="text-slate-600 mb-3">{rec.description}</p>
                            <div className="flex items-center">
                              <span className="text-sm text-slate-500 mr-2">Match Score:</span>
                              <div className="flex items-center">
                                <div className="w-24 bg-slate-200 rounded-full h-2 mr-2">
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
                          <Link
                            to={`/roadmap/${rec.career_id}`}
                            className="ml-4 bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors font-medium"
                          >
                            View Roadmap
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-8 space-x-4">
                    <button
                      onClick={() => setShowRecommendations(false)}
                      className="bg-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-300 transition-colors font-medium"
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
              <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🎯</div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Results!</h2>
                    <p className="text-slate-600">Based on your answers, here's your career recommendation</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {quizResults.suggested_career}
                      </h3>
                      <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                        {quizResults.career_category}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{quizResults.scores.technology}</div>
                        <div className="text-sm text-slate-600">Technology Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">{quizResults.scores.healthcare}</div>
                        <div className="text-sm text-slate-600">Healthcare Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600 mb-2">{quizResults.scores.design}</div>
                        <div className="text-sm text-slate-600">Design Score</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-slate-700 mb-4">
                        Your quiz results show a strong preference for <strong>{quizResults.career_category.toLowerCase()}</strong> careers. 
                        We recommend exploring <strong>{quizResults.suggested_career}</strong> as your next step!
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8 space-x-4">
                    <button
                      onClick={() => setShowQuizResults(false)}
                      className="bg-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-300 transition-colors font-medium"
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

<<<<<<< HEAD
          {/* Stats Cards with Professional Styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 -mt-16 relative z-20">
<<<<<<< HEAD
            <div className="professional-card p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">{t('dashboard.stats.quizzes')}</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">{stats.quizzesCompleted}</p>
=======
            <div className="professional-card p-6 card-hover bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-gray-400 uppercase tracking-wider">{t('dashboard.stats.quizzes')}</p>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{stats.quizzesCompleted}</p>
>>>>>>> c2fbe43 (Initial commit)
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl pulse-glow">
                  📝
                </div>
              </div>
            </div>

<<<<<<< HEAD
            <div className="professional-card p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">{t('dashboard.stats.goals')}</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">{stats.careerGoals}</p>
=======
            <div className="professional-card p-6 card-hover bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-gray-400 uppercase tracking-wider">{t('dashboard.stats.goals')}</p>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{stats.careerGoals}</p>
>>>>>>> c2fbe43 (Initial commit)
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl pulse-glow">
                  🎯
                </div>
              </div>
            </div>

<<<<<<< HEAD
            <div className="professional-card p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">{t('dashboard.stats.progress')}</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">{stats.roadmapProgress}%</p>
=======
            <div className="professional-card p-6 card-hover bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-gray-400 uppercase tracking-wider">{t('dashboard.stats.progress')}</p>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{stats.roadmapProgress}%</p>
>>>>>>> c2fbe43 (Initial commit)
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-violet-600 rounded-2xl flex items-center justify-center text-white text-2xl pulse-glow">
                  📊
                </div>
              </div>
            </div>

<<<<<<< HEAD
            <div className="professional-card p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">{t('dashboard.stats.mentors')}</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">{stats.mentorConnections}</p>
=======
            <div className="professional-card p-6 card-hover bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-gray-400 uppercase tracking-wider">{t('dashboard.stats.mentors')}</p>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">{stats.mentorConnections}</p>
>>>>>>> c2fbe43 (Initial commit)
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-white text-2xl pulse-glow">
                  👥
                </div>
              </div>
            </div>
=======
          {/* Stats Cards - Standardized Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 -mt-16 relative z-20">
            {[
              { 
                label: t('dashboard.stats.quizzes'), 
                value: stats.quizzesCompleted, 
                icon: "📝", 
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50 dark:bg-purple-900/20"
              },
              { 
                label: t('dashboard.stats.goals'), 
                value: stats.careerGoals, 
                icon: "🎯", 
                color: "from-cyan-500 to-cyan-600",
                bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
              },
              { 
                label: t('dashboard.stats.progress'), 
                value: `${stats.roadmapProgress}%`, 
                icon: "📊", 
                color: "from-teal-500 to-teal-600",
                bgColor: "bg-teal-50 dark:bg-teal-900/20"
              },
              { 
                label: t('dashboard.stats.mentors'), 
                value: stats.mentorConnections, 
                icon: "👥", 
                color: "from-indigo-500 to-indigo-600",
                bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
              }
            ].map((stat, index) => (
              <div key={index} className="card p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-small text-gray-600 dark:text-gray-400 uppercase tracking-wider font-medium">{stat.label}</p>
                    <p className="text-h2 text-gray-900 dark:text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
>>>>>>> 4199d3e (feat: changed ui)
          </div>

          {/* Quick Actions - Separated Design */}
          <div className="mb-12">
<<<<<<< HEAD
<<<<<<< HEAD
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t('dashboard.quickActions')}</h2>
=======
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{t('dashboard.quickActions')}</h2>
>>>>>>> c2fbe43 (Initial commit)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
=======
            <div className="text-center mb-8">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">{t('dashboard.quickActions')}</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Choose your next step in your career journey</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
>>>>>>> 4199d3e (feat: changed ui)
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
<<<<<<< HEAD
<<<<<<< HEAD
                  className="group relative overflow-hidden bg-white rounded-3xl shadow-lg p-8 border border-slate-200 hover:border-transparent transition-all duration-500 card-hover"
=======
                  className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-slate-200 dark:border-gray-700 hover:border-transparent transition-all duration-500 card-hover"
>>>>>>> c2fbe43 (Initial commit)
=======
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1"
>>>>>>> 4199d3e (feat: changed ui)
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{action.icon}</span>
                    </div>
                    <h3 className="text-h3 text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{action.title}</h3>
                    <p className="text-body text-gray-600 dark:text-gray-400">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity & Progress with Modern Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
<<<<<<< HEAD
            {/* Recent Activity */}
<<<<<<< HEAD
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('dashboard.recentActivity')}</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
=======
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t('dashboard.recentActivity')}</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300">
>>>>>>> c2fbe43 (Initial commit)
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                      activity.type === 'quiz' ? 'bg-cyan-500' :
                      activity.type === 'goal' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></div>
                    <div className="flex-1">
<<<<<<< HEAD
                      <p className="font-medium text-slate-900">{activity.action}</p>
                      <p className="text-sm text-slate-500 mt-1">{activity.time}</p>
=======
                      <p className="font-medium text-slate-900 dark:text-white">{activity.action}</p>
                      <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">{activity.time}</p>
>>>>>>> c2fbe43 (Initial commit)
=======
            {/* Recent Activity - Timeline Design */}
            <div className="card">
              <h3 className="text-h3 text-gray-900 dark:text-white mb-6">{t('dashboard.recentActivity')}</h3>
              <div className="space-y-6">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 relative">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'quiz' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        activity.type === 'goal' ? 'bg-cyan-100 dark:bg-cyan-900/30' : 'bg-teal-100 dark:bg-teal-900/30'
                      }`}>
                        <span className="text-lg">
                          {activity.type === 'quiz' ? '🧠' : activity.type === 'goal' ? '🎯' : '👥'}
                        </span>
                      </div>
                      {index < recentActivities.length - 1 && (
                        <div className="absolute top-10 left-5 w-0.5 h-6 bg-gray-200 dark:bg-gray-700"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-small text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
>>>>>>> 4199d3e (feat: changed ui)
                    </div>
                  </div>
                ))}
              </div>
            </div>

<<<<<<< HEAD
            {/* Progress Overview */}
<<<<<<< HEAD
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('dashboard.yourProgress')}</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-700 font-medium">{t('dashboard.progress.quiz')}</span>
                    <span className="font-bold text-slate-900">100%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
=======
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t('dashboard.yourProgress')}</h3>
=======
            {/* Progress Overview - Brand Colors */}
            <div className="card">
              <h3 className="text-h3 text-gray-900 dark:text-white mb-6">{t('dashboard.yourProgress')}</h3>
>>>>>>> 4199d3e (feat: changed ui)
              <div className="space-y-6">
                {[
                  { 
                    label: t('dashboard.progress.quiz'), 
                    value: 100, 
                    color: "from-purple-500 to-purple-600",
                    bgColor: "bg-purple-100 dark:bg-purple-900/20"
                  },
                  { 
                    label: t('dashboard.progress.roadmap'), 
                    value: stats.roadmapProgress, 
                    color: "from-cyan-500 to-cyan-600",
                    bgColor: "bg-cyan-100 dark:bg-cyan-900/20"
                  },
                  { 
                    label: t('dashboard.progress.mentors'), 
                    value: Math.round((stats.mentorConnections/5)*100), 
                    color: "from-teal-500 to-teal-600",
                    bgColor: "bg-teal-100 dark:bg-teal-900/20",
                    suffix: "/5"
                  }
                ].map((progress, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-small mb-3">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{progress.label}</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {progress.value}%{progress.suffix || ''}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${progress.color} h-3 rounded-full transition-all duration-1000`} 
                        style={{ width: `${progress.value}%` }}
                      ></div>
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
>>>>>>> c2fbe43 (Initial commit)
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-3">
<<<<<<< HEAD
                    <span className="text-slate-700 font-medium">{t('dashboard.progress.roadmap')}</span>
                    <span className="font-bold text-slate-900">{stats.roadmapProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
=======
                    <span className="text-slate-700 dark:text-gray-300 font-medium">{t('dashboard.progress.roadmap')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{stats.roadmapProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
>>>>>>> c2fbe43 (Initial commit)
                    <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${stats.roadmapProgress}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-3">
<<<<<<< HEAD
                    <span className="text-slate-700 font-medium">{t('dashboard.progress.mentors')}</span>
                    <span className="font-bold text-slate-900">{stats.mentorConnections}/5</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
=======
                    <span className="text-slate-700 dark:text-gray-300 font-medium">{t('dashboard.progress.mentors')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{stats.mentorConnections}/5</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
>>>>>>> c2fbe43 (Initial commit)
                    <div className="bg-gradient-to-r from-violet-400 to-violet-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${(stats.mentorConnections/5)*100}%` }}></div>
                  </div>
                </div>
=======
                ))}
>>>>>>> 4199d3e (feat: changed ui)
              </div>
            </div>
          </div>

          {/* Call to Action - Brand Consistent */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-h2 text-white mb-4">{t('dashboard.cta.title')}</h3>
                <p className="text-subtitle text-white/90 mb-8 max-w-2xl mx-auto">
                  {t('dashboard.cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/quizzes"
                    className="btn-primary bg-white text-purple-600 hover:bg-purple-50 py-4 px-8 text-lg"
                  >
                    {t('dashboard.cta.startQuiz')}
                  </Link>
                  <Link
                    to="/explore-careers"
                    className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-purple-600 py-4 px-8 text-lg"
                  >
                    {t('dashboard.cta.exploreCareers')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
=======
      
<<<<<<< HEAD
      {/* Floating Theme Toggle */}
      <ThemeToggle variant="floating" />
>>>>>>> c2fbe43 (Initial commit)
=======
>>>>>>> 4199d3e (feat: changed ui)
    </>
  );
};

export default Dashboard;