import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    quizzesCompleted: 2,
    careerGoals: 1,
    roadmapProgress: 65,
    mentorConnections: 3
  });

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
      <div className="min-h-screen bg-slate-50">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          
          * {
            font-family: 'Space Grotesk', sans-serif;
          }
          
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

        {/* Hero Section with Animated Background */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-32 left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-animation" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center slide-up">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                {t('dashboard.welcome')}, <span className="gradient-text">{user?.name || 'Guest'}</span>
              </h1>
              <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto leading-relaxed font-light">
                {t('dashboard.subtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Cards with Glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 -mt-16 relative z-20">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">{t('dashboard.stats.quizzes')}</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">{stats.quizzesCompleted}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl pulse-glow">
                  📝
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">{t('dashboard.stats.goals')}</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">{stats.careerGoals}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl pulse-glow">
                  🎯
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">{t('dashboard.stats.progress')}</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">{stats.roadmapProgress}%</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-violet-600 rounded-2xl flex items-center justify-center text-white text-2xl pulse-glow">
                  📊
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">{t('dashboard.stats.mentors')}</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">{stats.mentorConnections}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-white text-2xl pulse-glow">
                  👥
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions with Modern Design */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t('dashboard.quickActions')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="group relative overflow-hidden bg-white rounded-3xl shadow-lg p-8 border border-slate-200 hover:border-transparent transition-all duration-500 card-hover"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${action.color}"></div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-500">{action.icon}</div>
                    <h3 className="text-xl font-semibold action-card-text group-hover:text-white mb-2 transition-colors duration-500">{action.title}</h3>
                    <p className="text-sm action-card-desc group-hover:text-white/90 transition-colors duration-500">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity & Progress with Modern Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('dashboard.recentActivity')}</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                      activity.type === 'quiz' ? 'bg-cyan-500' :
                      activity.type === 'goal' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{activity.action}</p>
                      <p className="text-sm text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('dashboard.yourProgress')}</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-700 font-medium">{t('dashboard.progress.quiz')}</span>
                    <span className="font-bold text-slate-900">100%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-700 font-medium">{t('dashboard.progress.roadmap')}</span>
                    <span className="font-bold text-slate-900">{stats.roadmapProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${stats.roadmapProgress}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-700 font-medium">{t('dashboard.progress.mentors')}</span>
                    <span className="font-bold text-slate-900">{stats.mentorConnections}/5</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-400 to-violet-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${(stats.mentorConnections/5)*100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">{t('dashboard.cta.title')}</h3>
                <p className="text-cyan-100 mb-8 max-w-2xl mx-auto text-lg">
                  {t('dashboard.cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/quizzes"
                    className="bg-white text-cyan-600 hover:bg-cyan-50 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {t('dashboard.cta.startQuiz')}
                  </Link>
                  <Link
                    to="/explore-careers"
                    className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    {t('dashboard.cta.exploreCareers')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;