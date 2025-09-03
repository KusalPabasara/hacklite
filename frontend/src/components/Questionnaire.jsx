import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';

const Questionnaire = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      console.log('🔍 Fetching questionnaire questions...');
      const response = await api.get('/questionnaire/questions');
      console.log('✅ Questions received:', response.data);
      console.log('📝 First question structure:', response.data[0]);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching questions:', error);
      setError('Failed to load questionnaire');
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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

      const response = await api.post('/questionnaire/submit', {
        answers: formattedAnswers
      });

      // Navigate to dashboard with recommendations
      navigate('/dashboard', { 
        state: { 
          recommendations: response.data.recommendations,
          questionnaireCompleted: true 
        } 
      });
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      setError('Failed to submit questionnaire. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const isCurrentQuestionAnswered = () => {
    const question = questions[currentQuestion];
    if (!question) return false;
    return answers[question.id] !== undefined && answers[question.id] !== '';
  };

  const isAllQuestionsAnswered = () => {
    return questions.every(question => 
      answers[question.id] !== undefined && answers[question.id] !== ''
    );
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

  const question = questions[currentQuestion];
  if (!question) return null;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Career Discovery Questionnaire</h1>
              <p className="text-slate-600 mt-1">Help us find the perfect career path for you</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Question {currentQuestion + 1} of {questions.length}</div>
              <div className="w-32 bg-slate-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              {question.question_text}
            </h2>
            
            {question.question_type === 'multiple_choice' && Array.isArray(question.options) && question.options.length > 0 ? (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <label 
                    key={index}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      answers[question.id] === option.value
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      answers[question.id] === option.value
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-slate-300'
                    }`}>
                      {answers[question.id] === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-slate-700 font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">No options available for this question.</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentQuestion === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-3">
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!isAllQuestionsAnswered() || submitting}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    !isAllQuestionsAnswered() || submitting
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-cyan-600 text-white hover:bg-cyan-700'
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Get My Results'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentQuestionAnswered()}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    !isCurrentQuestionAnswered()
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-cyan-600 text-white hover:bg-cyan-700'
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
          <div className="flex space-x-2">
            {questions.map((_, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
