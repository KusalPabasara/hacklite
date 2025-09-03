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
    { type: "Career Interest", icon: "🧠", color: "from-blue-500 to-cyan-600", bgColor: "bg-blue-50" },
    { type: "Skills Assessment", icon: "⚡", color: "from-green-500 to-emerald-600", bgColor: "bg-green-50" },
    { type: "Personality Match", icon: "🌟", color: "from-purple-500 to-pink-600", bgColor: "bg-purple-50" },
    { type: "Industry Fit", icon: "🏢", color: "from-orange-500 to-red-600", bgColor: "bg-orange-50" }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-900 pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-300 text-lg">Loading quizzes...</p>
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
          /* Professional Quizzes Styling */
          
          @keyframes quiz-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            75% { transform: translateY(-10px) rotate(-1deg); }
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          
          @keyframes gradient-x {
            0%, 100% { transform: translateX(0%); }
            50% { transform: translateX(100%); }
          }
          
          .quiz-card {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .quiz-card:hover {
            animation: quiz-float 4s ease-in-out infinite;
          }
          
          .sparkle::before {
            content: '✨';
            position: absolute;
            animation: sparkle 2s ease-in-out infinite;
          }
          
          .gradient-move {
            background-size: 200% 100%;
            animation: gradient-x 3s ease infinite;
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }
          
          .neon-cyan {
            text-shadow: 0 0 20px rgba(6, 182, 212, 0.8),
                         0 0 40px rgba(6, 182, 212, 0.6),
                         0 0 60px rgba(6, 182, 212, 0.4);
          }
        `}</style>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-cyan-900 via-slate-900 to-blue-900 py-24">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block relative mb-6">
              <h1 className="text-7xl md:text-8xl font-black text-white neon-cyan">
                Discover Your Path
              </h1>
              <div className="sparkle absolute top-0 right-0" style={{animationDelay: '0s'}}></div>
              <div className="sparkle absolute bottom-0 left-0" style={{animationDelay: '1s'}}></div>
              <div className="sparkle absolute top-1/2 right-1/4" style={{animationDelay: '2s'}}></div>
            </div>
            <p className="text-2xl text-cyan-200 max-w-3xl mx-auto font-light">
              AI-powered quizzes to unlock your career potential and find your perfect match
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Quiz Types Overview */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Quiz Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {quizTypes.map((quizType, index) => (
                <div 
                  key={index}
                  className="group text-center transform hover:scale-110 transition-all duration-300"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl group-hover:shadow-cyan-500/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="text-5xl z-10">{quizType.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{quizType.type}</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full gradient-move"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Quizzes */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Available Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((quiz, index) => (
                <div 
                  key={quiz.id}
                  className="quiz-card glass-effect rounded-3xl overflow-hidden group"
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  {/* Quiz Header */}
                  <div className="bg-gradient-to-br from-cyan-600 to-blue-700 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full blur-2xl transform -translate-x-16 translate-y-16"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-5xl">🧠</span>
                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-white">
                          Quiz #{index + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{quiz.title}</h3>
                      <p className="text-cyan-100">
                        {quiz.questions?.length || 0} questions • 5-10 minutes
                      </p>
                    </div>
                  </div>

                  {/* Quiz Content */}
                  <div className="p-8">
                    <div className="mb-8">
                      <h4 className="font-bold text-white mb-4 text-lg">What you'll discover:</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 shadow-lg shadow-cyan-500/50"></div>
                          Career preferences and interests
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 shadow-lg shadow-blue-500/50"></div>
                          Skills and strengths analysis
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 shadow-lg shadow-purple-500/50"></div>
                          Industry recommendations
                        </li>
                      </ul>
                    </div>

                    <Link 
                      to={`/quizzes/${quiz.id}`}
                      className="block w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 uppercase tracking-wider"
                    >
                      Start Quiz →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Take the Quiz", desc: "Answer thoughtful questions about your interests and preferences", icon: "📝" },
                { step: "02", title: "Get AI Analysis", desc: "Our AI analyzes your responses to find perfect career matches", icon: "🤖" },
                { step: "03", title: "Explore Paths", desc: "Discover careers aligned with your unique profile and goals", icon: "🎯" }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-2xl group-hover:shadow-cyan-500/50 transform group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 bg-slate-800 rounded-xl px-3 py-1 text-cyan-400 font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="glass-effect rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20"></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-white mb-6">Ready to discover your perfect career?</h3>
                <p className="text-cyan-200 mb-8 max-w-2xl mx-auto text-xl">
                  Join thousands who've found their dream careers through our AI-powered assessment.
                </p>
                <Link
                  to={`/quizzes/${quizzes[0]?.id}`}
                  className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/50 text-lg uppercase tracking-wider"
                >
                  🎯 Start Your Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quizzes;