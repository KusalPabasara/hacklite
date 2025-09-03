import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar.jsx";

const QuizTake = () => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quizzes/${id}`);
        setQuiz(res.data);
      } catch (error) {
        console.error("Failed to fetch quiz", error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleChange = (qIdx, aIdx) => {
    const answerText = quiz.questions[qIdx].answers[aIdx];
    setAnswers({ ...answers, [qIdx]: answerText });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length < quiz.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('🚀 Submitting quiz with answers:', answers);
      const res = await api.post(`/quizzes/${id}/submit`, { answers });
      console.log('✅ Quiz submitted successfully:', res.data);
      
      // Validate response data
      if (!res.data || !res.data.suggested_career) {
        throw new Error('Invalid response from server');
      }
      
      // Create a mock recommendation object for quiz results
      const mockRecommendation = {
        career_id: null, // We'll need to find the career by title
        career_title: res.data.suggested_career,
        career_category: res.data.career_category,
        match_score: 0.85 // Default high score for quiz results
      };
      
      console.log('🎯 Navigating to careers with recommendation:', mockRecommendation);
      
      // Navigate to careers page with quiz results as recommendations
      navigate("/explore-careers", { 
        state: { 
          recommendations: [mockRecommendation],
          quizResults: res.data,
          suggestedCategory: res.data.career_category,
          suggestedCareer: res.data.suggested_career,
          showRecommendations: true,
          quizCompleted: true
        } 
      });
    } catch (err) {
      console.error("❌ Error submitting quiz:", err);
      console.error("❌ Error details:", err.response?.data || err.message);
      alert(`There was an error submitting your quiz: ${err.response?.data?.error || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  if (!quiz) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-indigo-950 pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-purple-300 text-lg">Loading Quiz...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-indigo-950 pt-16">
        <style>{`
          /* Professional Quiz Take Styling */
          
          @keyframes question-slide {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes progress-pulse {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(1.02); }
          }
          
          @keyframes option-hover {
            0% { transform: translateX(0); }
            100% { transform: translateX(10px); }
          }
          
          .question-card {
            animation: question-slide 0.5s ease-out;
          }
          
          .progress-bar {
            animation: progress-pulse 2s ease-in-out infinite;
          }
          
          .option-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .option-card:hover {
            animation: option-hover 0.3s ease-out forwards;
          }
          
          .glass-panel {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          .neon-purple {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5),
                        0 0 40px rgba(168, 85, 247, 0.3),
                        inset 0 0 20px rgba(168, 85, 247, 0.1);
          }
          
          .cyber-dots {
            background-image: radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}</style>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-16 relative overflow-hidden">
          <div className="absolute inset-0 cyber-dots opacity-20"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {quiz.title}
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Answer thoughtfully to discover your ideal career path
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="mb-8 glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-purple-300 uppercase tracking-wider">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm font-bold text-purple-300">
                {Math.round(((Object.keys(answers).length / quiz.questions.length) * 100))}% Complete
              </span>
            </div>
            <div className="w-full bg-indigo-900/50 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 progress-bar neon-purple"
                style={{ width: `${(Object.keys(answers).length / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 ${
                    currentQuestion === index
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg neon-purple'
                      : answers[index]
                      ? 'bg-green-600 text-white shadow-md'
                      : 'glass-panel text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current Question */}
          <div className="glass-panel rounded-3xl p-10 mb-8 question-card" key={currentQuestion}>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                {quiz.questions[currentQuestion].question_text}
              </h2>
              <p className="text-purple-300">
                Select the option that best resonates with you
              </p>
            </div>

            <div className="space-y-4">
              {quiz.questions[currentQuestion].answers.map((answer, aIdx) => (
                <label 
                  key={aIdx} 
                  className="block cursor-pointer"
                >
                  <div className={`option-card glass-panel p-6 rounded-2xl border-2 transition-all duration-300 ${
                    answers[currentQuestion] === answer
                      ? 'border-purple-500 bg-purple-500/20 neon-purple'
                      : 'border-transparent hover:border-purple-500/50 hover:bg-white/5'
                  }`}>
                    <div className="flex items-center">
                      <div className="relative">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          checked={answers[currentQuestion] === answer}
                          onChange={() => handleChange(currentQuestion, aIdx)}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                          answers[currentQuestion] === answer
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-500'
                        }`}>
                          {answers[currentQuestion] === answer && (
                            <div className="w-full h-full rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="ml-4 text-lg text-gray-200 font-medium">
                        {answer}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-8 py-4 glass-panel text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-300 uppercase tracking-wider"
            >
              ← Previous
            </button>

            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                disabled={!answers[currentQuestion]}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg uppercase tracking-wider"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < quiz.questions.length || isSubmitting}
                className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg neon-purple uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  '🎯 Get Results'
                )}
              </button>
            )}
          </div>

          {/* Tips Panel */}
          <div className="mt-12 glass-panel rounded-3xl p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="font-bold text-white mb-3 text-lg">Pro Tips</h3>
                <ul className="text-purple-300 space-y-2">
                  <li>• Trust your instincts - go with what feels right</li>
                  <li>• Consider what energizes you, not just what you're good at</li>
                  <li>• Think about your ideal work environment</li>
                  <li>• Remember, there are no wrong answers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizTake;