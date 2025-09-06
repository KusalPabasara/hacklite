import { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Questionnaire = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { markQuestionnaireCompleted } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Use useCallback to prevent infinite re-renders
  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching questionnaire questions...');
      const response = await api.get('/questionnaire/questions');
      console.log('✅ Questions received:', response.data);
      console.log('📝 First question structure:', response.data[0]);
      setQuestions(response.data);
      setFilteredQuestions(response.data);
    } catch (error) {
      console.error('❌ Error fetching questions:', error);
      setError('Failed to load questionnaire');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array to prevent re-renders

  useEffect(() => {
    // Only fetch if questions are not already loaded
    if (questions.length === 0) {
      fetchQuestions();
    }
  }, []); // Empty dependency array to run only once



  // Filter questions based on previous answers
  const filterQuestions = (newAnswers) => {
    const updatedAnswers = { ...answers, ...newAnswers };
    
    // Check if user has completed A/L
    const hasCompletedALevels = updatedAnswers[1] === 'alevels' || updatedAnswers[1] === 'degree';
    
    const filtered = questions.filter(question => {
      // Always show education level question (id: 1)
      if (question.id === 1) return true;
      
      // Always show O/L subjects question (id: 2)
      if (question.id === 2) return true;
      
      // Only show A/L subjects question if user completed A/L
      if (question.id === 3) return hasCompletedALevels;
      
      // Show all other questions
      return true;
    });
    
    setFilteredQuestions(filtered);
    return filtered;
  };

  const handleAnswerChange = (questionId, answer) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer
    };
    setAnswers(newAnswers);
    
    // Filter questions based on new answer
    filterQuestions(newAnswers);
  };

  const handleMultipleAnswerChange = (questionId, optionValue, isChecked) => {
    const currentAnswer = answers[questionId] || [];
    let newAnswer;
    
    if (isChecked) {
      // Add the option if it's not already selected
      newAnswer = [...currentAnswer, optionValue];
    } else {
      // Remove the option if it's already selected
      newAnswer = currentAnswer.filter(val => val !== optionValue);
    }
    
    const newAnswers = {
      ...answers,
      [questionId]: newAnswer
    };
    setAnswers(newAnswers);
    
    // Filter questions based on new answer
    filterQuestions(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer: answer
      }));

      console.log('🚀 Submitting questionnaire with answers:', formattedAnswers);
      const response = await api.post('/questionnaire/submit', {
        answers: formattedAnswers
      });

      console.log('✅ Questionnaire submitted successfully:', response.data);

      // Validate response data
      if (!response.data || !response.data.recommendations) {
        throw new Error('Invalid response from server');
      }

      console.log('🎯 Navigating to careers with recommendations:', response.data.recommendations);

      // Mark questionnaire as completed in context
      markQuestionnaireCompleted();

      // Small delay to ensure context update
      setTimeout(() => {
        console.log('🚀 About to navigate to /explore-careers');
<<<<<<< HEAD
        // Option 1: Navigate to careers page with recommendations
        try {
          navigate('/explore-careers', { 
            state: { 
              recommendations: response.data.recommendations,
              questionnaireCompleted: true,
              showRecommendations: true
            } 
          });
          console.log('✅ Navigation called');
=======
        console.log('📊 Recommendations data:', response.data.recommendations);
        
        // Navigate to careers page with recommendations
        try {
          const navigationState = { 
            recommendations: response.data.recommendations || [],
            questionnaireCompleted: true,
            showRecommendations: true,
            fromQuestionnaire: true,
            timestamp: Date.now()
          };
          
          console.log('📤 Navigation state:', navigationState);
          navigate('/explore-careers', { state: navigationState });
          console.log('✅ Navigation called with state');
>>>>>>> c2fbe43 (Initial commit)
        } catch (navError) {
          console.error('❌ Navigation failed:', navError);
          // Fallback: use window.location
          window.location.href = '/explore-careers';
        }
        
        // Option 2: Auto-select top recommendation and go to roadmap
        // Uncomment the lines below if you want to auto-select the top career
        /*
        const topRecommendation = response.data.recommendations[0];
        if (topRecommendation && topRecommendation.career_id) {
          try {
            await api.post('/roadmap/select', { career_id: topRecommendation.career_id });
            navigate('/roadmap');
          } catch (error) {
            console.error('Error auto-selecting career:', error);
            // Fallback to careers page
            navigate('/explore-careers', { 
              state: { 
                recommendations: response.data.recommendations,
                questionnaireCompleted: true,
                showRecommendations: true
              } 
            });
          }
        }
        */
      }, 100);
    } catch (error) {
      console.error('❌ Error submitting questionnaire:', error);
      console.error('❌ Error details:', error.response?.data || error.message);
      setError(`Failed to submit questionnaire: ${error.response?.data?.error || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const isCurrentQuestionAnswered = () => {
    const question = filteredQuestions[currentQuestion];
    if (!question) return false;
    
    const answer = answers[question.id];
    if (answer === undefined) return false;
    
    // Handle multiple choice questions (arrays)
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    
    // Handle single choice questions
    return answer !== '';
  };

  const isAllQuestionsAnswered = () => {
    return filteredQuestions.every(question => {
      const answer = answers[question.id];
      if (answer === undefined) return false;
      
      // Handle multiple choice questions (arrays)
      if (Array.isArray(answer)) {
        return answer.length > 0;
      }
      
      // Handle single choice questions
      return answer !== '';
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading questionnaire...</p>
        </div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Error</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = filteredQuestions[currentQuestion];
  if (!question) return null;

  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-16">
      {/* Hero Section - Dashboard Style */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -top-32 right-40 w-80 h-80 bg-violet-400 dark:bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="slide-up">
              <h1 className="text-heading-1 text-gray-800 dark:text-white">Career Discovery Questionnaire</h1>
              <p className="text-body text-gray-600 dark:text-white/80 mt-2">Help us find the perfect career path for you</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-white/80">Question {currentQuestion + 1} of {filteredQuestions.length}</div>
              <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-violet-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="professional-card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
          <div className="mb-8">
            <h2 className="text-heading-2 text-slate-900 dark:text-white mb-6">
              {question.question_text}
            </h2>
            
            {/* Show instruction for multiple selection questions */}
            {question.question_text.toLowerCase().includes('select all that apply') && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                <p className="text-blue-800 dark:text-blue-300 text-sm font-medium">
                  💡 You can select multiple options that apply to you
                </p>
              </div>
            )}
            
<<<<<<< HEAD
            {question.question_type === 'multiple_choice' && Array.isArray(question.options) && question.options.length > 0 ? (
              <div className="space-y-3">
                {/* Check if this is a "select all that apply" question */}
                {question.question_text.toLowerCase().includes('select all that apply') ? (
                  // Multiple selection (checkboxes)
                  question.options.map((option, index) => {
                    const isSelected = Array.isArray(answers[question.id]) && answers[question.id].includes(option.value);
=======
            {/* Handle both single_choice and multiple_choice questions */}
            {((question.question_type === 'single_choice' || question.question_type === 'multiple_choice') && 
              Array.isArray(question.options) && question.options.length > 0) ? (
              <div className="space-y-3">
                {/* Check if this is a "select all that apply" question or multiple_choice */}
                {(question.question_type === 'multiple_choice' || question.question_text.toLowerCase().includes('select all that apply')) ? (
                  // Multiple selection (checkboxes)
                  question.options.map((option, index) => {
                    const isSelected = Array.isArray(answers[question.id]) && answers[question.id].includes(option);
>>>>>>> c2fbe43 (Initial commit)
                    return (
                      <label 
                        key={index}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                            : 'border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500 hover:bg-slate-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name={`question-${question.id}`}
<<<<<<< HEAD
                          value={option.value}
                          checked={isSelected}
                          onChange={(e) => handleMultipleAnswerChange(question.id, option.value, e.target.checked)}
=======
                          value={option}
                          checked={isSelected}
                          onChange={(e) => handleMultipleAnswerChange(question.id, option, e.target.checked)}
>>>>>>> c2fbe43 (Initial commit)
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-500'
                            : 'border-slate-300 dark:border-gray-500'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
<<<<<<< HEAD
<<<<<<< HEAD
                        <span className="text-slate-700 font-medium">{option.label}</span>
=======
                        <span className="text-slate-700 font-medium">{option}</span>
>>>>>>> c2fbe43 (Initial commit)
=======
                        <span className="text-slate-700 dark:text-gray-300 font-medium">{option}</span>
>>>>>>> 4199d3e (feat: changed ui)
                      </label>
                    );
                  })
                ) : (
<<<<<<< HEAD
                  // Single selection (radio buttons)
=======
                  // Single selection (radio buttons) for single_choice questions
>>>>>>> c2fbe43 (Initial commit)
                  question.options.map((option, index) => (
                    <label 
                      key={index}
<<<<<<< HEAD
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
<<<<<<< HEAD
                        answers[question.id] === option.value
=======
                        answers[question.id] === option
>>>>>>> c2fbe43 (Initial commit)
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
=======
                                              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          answers[question.id] === option
                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                            : 'border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500 hover:bg-slate-50 dark:hover:bg-gray-700'
                        }`}
>>>>>>> 4199d3e (feat: changed ui)
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
<<<<<<< HEAD
                        value={option.value}
                        checked={answers[question.id] === option.value}
=======
                        value={option}
                        checked={answers[question.id] === option}
>>>>>>> c2fbe43 (Initial commit)
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="sr-only"
                      />
<<<<<<< HEAD
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
<<<<<<< HEAD
                        answers[question.id] === option.value
                          ? 'border-cyan-500 bg-cyan-500'
                          : 'border-slate-300'
                      }`}>
                        {answers[question.id] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-slate-700 font-medium">{option.label}</span>
=======
                        answers[question.id] === option
                          ? 'border-cyan-500 bg-cyan-500'
                          : 'border-slate-300'
                      }`}>
                        {answers[question.id] === option && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-slate-700 font-medium">{option}</span>
>>>>>>> c2fbe43 (Initial commit)
=======
                                              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                          answers[question.id] === option
                            ? 'border-cyan-500 bg-cyan-500'
                            : 'border-slate-300 dark:border-gray-500'
                        }`}>
                          {answers[question.id] === option && (
                            <div className="w-2 h-2 bg-white dark:bg-gray-200 rounded-full"></div>
                          )}
                      </div>
                      <span className="text-slate-700 dark:text-gray-300 font-medium">{option}</span>
>>>>>>> 4199d3e (feat: changed ui)
                    </label>
                  ))
                )}
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">No options available for this question.</p>
<<<<<<< HEAD
=======
                <p className="text-yellow-600 text-sm mt-2">
                  Debug: question_type={question.question_type}, options={JSON.stringify(question.options)}
                </p>
>>>>>>> c2fbe43 (Initial commit)
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-gray-600">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`professional-button px-6 py-3 ${
                currentQuestion === 0
                  ? 'bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-slate-200 dark:bg-gray-600 text-slate-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-500'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-3">
              {currentQuestion === filteredQuestions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!isAllQuestionsAnswered() || submitting}
                  className={`professional-button px-8 py-3 ${
                    !isAllQuestionsAnswered() || submitting
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'gradient-primary text-white hover:opacity-90'
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Get My Results'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentQuestionAnswered()}
                  className={`professional-button px-6 py-3 ${
                    !isCurrentQuestionAnswered()
                      ? 'bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed'
                      : 'gradient-primary text-white hover:opacity-90'
                  }`}
                >
                  Next
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="text-center">
            <div className="flex space-x-2 mb-4">
              {filteredQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index < currentQuestion
                      ? 'bg-cyan-600'
                      : index === currentQuestion
                      ? 'bg-cyan-400'
                      : 'bg-slate-300'
                  }`}
                ></div>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              {filteredQuestions.length} questions • {filteredQuestions.length - currentQuestion - 1} remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
