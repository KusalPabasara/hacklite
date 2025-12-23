import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Zap, Star, Building, Target, Clock, CheckCircle } from "lucide-react";
import api from "../utils/api";
import { useTheme } from "../context/ThemeContext";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

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
    { 
      type: "Career Interest", 
      icon: Brain, 
      color: "blue",
      description: "Discover what careers match your interests and passions"
    },
    { 
      type: "Skills Assessment", 
      icon: Zap, 
      color: "green",
      description: "Evaluate your skills and identify areas for development"
    },
    { 
      type: "Personality Match", 
      icon: Star, 
      color: "purple",
      description: "Find careers that align with your personality traits"
    },
    { 
      type: "Industry Fit", 
      icon: Building, 
      color: "orange",
      description: "Explore which industries suit your professional goals"
    }
  ];

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl sm:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Career Assessment Quizzes</h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Discover your perfect career path through our comprehensive assessment tools designed to match your interests, skills, and goals.
          </p>
        </div>

        {/* Quiz Types Overview */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-12`}>Assessment Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quizTypes.map((quizType, index) => {
              const IconComponent = quizType.icon;
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                purple: 'bg-purple-100 text-purple-600',
                orange: 'bg-orange-100 text-orange-600'
              };
              
              return (
                <div 
                  key={index}
                  className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} group`}
                >
                  <div className={`w-16 h-16 ${colorClasses[quizType.color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{quizType.type}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{quizType.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Quizzes */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-12`}>Available Assessments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Career Assessment Questionnaire */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} group`}>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
                      Career Assessment
                    </span>
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mt-2`}>Career Path Assessment</h3>
                  </div>
                </div>
                
                <div className={`flex items-center gap-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    10 questions
                  </span>
                  <span>•</span>
                  <span>5-10 minutes</span>
                </div>

                <div className="mb-6">
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>What you'll discover:</h4>
                  <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      Your top career recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      Career suitability percentages
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                      Personalized career roadmap
                    </li>
                  </ul>
                </div>

                <Link 
                  to="/questionnaire?retake=true"
                  className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors"
                >
                  Start Assessment
                </Link>
              </div>
            </div>

            {/* Dynamic Quizzes */}
            {quizzes.map((quiz, index) => (
              <div key={quiz.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} group`}>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                      <Brain className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        Quiz #{index + 1}
                      </span>
                      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mt-2`}>{quiz.title}</h3>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {quiz.questions?.length || 0} questions
                    </span>
                    <span>•</span>
                    <span>5-10 minutes</span>
                  </div>

                  <div className="mb-6">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>What you'll discover:</h4>
                    <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        Career preferences and interests
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        Skills and strengths analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        Industry recommendations
                      </li>
                    </ul>
                  </div>

                  <Link 
                    to={`/quizzes/${quiz.id}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-colors"
                  >
                    Start Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-12`}>How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Take the Assessment", 
                desc: "Answer thoughtful questions about your interests, skills, and preferences", 
                icon: Target 
              },
              { 
                step: "02", 
                title: "Get AI Analysis", 
                desc: "Our advanced AI analyzes your responses to find perfect career matches", 
                icon: Brain 
              },
              { 
                step: "03", 
                title: "Explore Your Path", 
                desc: "Discover careers aligned with your unique profile and professional goals", 
                icon: Star 
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-xl px-3 py-1 text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>{item.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-12 shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Ready to discover your perfect career?</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto text-lg`}>
              Join thousands who've found their dream careers through Marga.lk's comprehensive assessment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/questionnaire"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
              >
                <Target className="w-5 h-5" />
                Start Career Assessment
              </Link>
              {quizzes.length > 0 && (
                <Link
                  to={`/quizzes/${quizzes[0]?.id}`}
                  className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                >
                  <Brain className="w-5 h-5" />
                  Take Quick Quiz
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quizzes;