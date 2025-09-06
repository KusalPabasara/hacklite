import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../utils/api";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const res = await api.get("/quizzes");
        setQuizzes(res.data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const quizTypes = [
    { type: "Career Interest", icon: "🧠", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
    { type: "Skills Assessment", icon: "⚡", color: "from-cyan-500 to-cyan-600", bgColor: "bg-cyan-50 dark:bg-cyan-900/20" },
    { type: "Personality Match", icon: "🌟", color: "from-teal-500 to-teal-600", bgColor: "bg-teal-50 dark:bg-teal-900/20" },
    { type: "Industry Fit", icon: "🏢", color: "from-indigo-500 to-indigo-600", bgColor: "bg-indigo-50 dark:bg-indigo-900/20" }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="main-content bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-all duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-600 dark:text-cyan-300 text-lg">Loading quizzes...</p>
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
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-32 left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center slide-up">
              <h1 className="text-h1 text-white dark:text-white mb-6">
                Discover Your Path
              </h1>
              <p className="text-subtitle text-white/80 dark:text-white/80 max-w-3xl mx-auto">
                AI-powered quizzes to unlock your career potential and find your perfect match
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Quiz Categories - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12 fade-in-up">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Quiz Categories</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Choose your assessment type</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quizTypes.map((quizType, index) => (
                <div 
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${quizType.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">{quizType.icon}</span>
                    </div>
                    <h3 className="text-h3 text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{quizType.type}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Quizzes - Dashboard Card Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">Available Quizzes</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Take these assessments to discover your career path</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz, index) => (
                <div 
                  key={quiz.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                      {quiz.questions?.length || 0} questions
                    </span>
                  </div>
                  
                  <h3 className="text-h3 text-gray-900 dark:text-white mb-2">{quiz.title}</h3>
                  <p className="text-body text-gray-600 dark:text-gray-400 mb-4">
                    Discover your career preferences, skills, and get personalized recommendations.
                  </p>
                  
                  <div className="flex items-center justify-between text-small text-gray-500 dark:text-gray-400 mb-6">
                    <span>⏱️ 5-10 minutes</span>
                    <span>📊 AI Analysis</span>
                  </div>

                  <Link 
                    to={`/quizzes/${quiz.id}`}
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/25"
                  >
                    Start Quiz
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works - Dashboard Timeline Style */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-gray-900 dark:text-white mb-2">How It Works</h2>
              <p className="text-subtitle text-gray-600 dark:text-gray-400">Simple steps to discover your perfect career</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Take the Quiz", desc: "Answer thoughtful questions about your interests and preferences", icon: "📝", color: "from-purple-500 to-purple-600" },
                { step: "02", title: "Get AI Analysis", desc: "Our AI analyzes your responses to find perfect career matches", icon: "🤖", color: "from-cyan-500 to-cyan-600" },
                { step: "03", title: "Explore Paths", desc: "Discover careers aligned with your unique profile and goals", icon: "🎯", color: "from-teal-500 to-teal-600" }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center group hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-xl px-3 py-1 text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-h3 text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-body text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action - Dashboard Style */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-h2 text-white mb-4">Ready to discover your perfect career?</h3>
                <p className="text-subtitle text-white/90 mb-8 max-w-2xl mx-auto">
                  Join thousands who've found their dream careers through our AI-powered assessment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to={`/quizzes/${quizzes[0]?.id}`}
                    className="btn-primary bg-white text-purple-600 hover:bg-purple-50 py-4 px-8 text-lg"
                  >
                    Start Your Journey
                  </Link>
                  <Link
                    to="/explore-careers"
                    className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-purple-600 py-4 px-8 text-lg"
                  >
                    Explore Careers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quizzes;