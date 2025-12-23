import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Check, Compass, School, Briefcase, ArrowRight, Target, Globe, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/api';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';

// Questions will be fetched from the API


const QuestionnairePage = () => {
    const { user, refreshUserStatus } = useAuth();
    const { isDarkMode } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const navigate = useNavigate();

    const [step, setStep] = useState(0); 
    const [education, setEducation] = useState('');
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkingSavedResults, setCheckingSavedResults] = useState(false);
    const [questionsData, setQuestionsData] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [hasCheckedSavedResults, setHasCheckedSavedResults] = useState(false);
    const [hasRedirected, setHasRedirected] = useState(false);

    // Check if user is retaking questionnaire from Quizzes page
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const retake = urlParams.get('retake');

        // Only redirect if user has completed questionnaire and is not explicitly retaking
        if (user && user.questionnaireCompleted && !retake && !hasRedirected) {
            console.log('🔍 User has already completed questionnaire, redirecting to My Career tab');
            setHasRedirected(true);
            navigate('/my-career-path', { replace: true });
        }
    }, [user, navigate, hasRedirected]);

    const handleLangChoice = (lang) => {
        changeLanguage(lang);
        localStorage.setItem("user_lang", lang);
        localStorage.setItem('language', lang);
        
        // Update document language attributes
        document.documentElement.lang = lang;
        document.body.lang = lang;
        
        // Trigger Google Translate
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        setStep(1);
    };

    // Fetch questions when language is selected
    useEffect(() => {
        const fetchQuestions = async () => {
            if (step === 1 && questionsData.length === 0 && !loadingQuestions) {
                setLoadingQuestions(true);
                try {
                    console.log('🔍 Fetching questions from API...');
                    
                    const response = await api.get('/questionnaire/questions');
                    
                    console.log('✅ Questions fetched from API:', response.data.length);
                    console.log('📝 First question options from API:', response.data[0]?.options);
                    if (response.data && response.data.length > 0) {
                        setQuestionsData(response.data);
                        console.log('🎯 Using API data');
                    } else {
                        throw new Error('Empty API response');
                    }
                } catch (error) {
                    console.error('❌ Error fetching questions from API:', error);
                    // Show error message instead of fallback data
                    alert('Unable to load questionnaire questions. Please check your internet connection and try again.');
                    setQuestionsData([]);
                } finally {
                    setLoadingQuestions(false);
                }
            }
        };
        
        fetchQuestions();
    }, [step, questionsData.length, loadingQuestions]);

    const handleEducationSelect = (level) => {
        setEducation(level);
        setStep(2);
    };

    const handleAnswer = (questionId, option) => {
        console.log('🎯 Answer selected:', { questionId, option, currentQuestion });
        const newAnswers = { ...answers, [questionId]: option };
        setAnswers(newAnswers);
        console.log('📝 Updated answers:', newAnswers);
        
        // Auto-advance to next question if not the last one
        if (currentQuestion < questionsData.length - 1) {
            console.log('➡️ Moving to next question:', currentQuestion + 1);
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
            }, 500); // Small delay for better UX
        } else {
            console.log('✅ All questions answered - showing results button');
            // Don't auto-advance, show the results button instead
        }
    };
    
    const calculateScores = () => {
        let scores = { nts: 0, vta: 0, 'german-tech': 0 };
        
        // Education bonus
        if (education === 'al_science') scores.nts += 15;
        if (education === 'ol') {
            scores.vta += 10;
            scores['german-tech'] += 8;
        }
        if (education === 'al_other') {
            scores.vta += 5;
            scores['german-tech'] += 3;
        }
        
        // Question answers
        questionsData.forEach(q => {
            const selectedOptionText = answers[q.id];
            const optionIndex = q.options.indexOf(selectedOptionText);
            if (optionIndex !== -1) {
                // Use career_weight from database instead of weights
                const optionWeights = q.career_weight || q.weights;
                if (optionWeights) {
                    Object.keys(optionWeights).forEach(career => {
                        scores[career] += optionWeights[career];
                    });
                }
            }
        });
        
        const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
        if (totalScore === 0) return { nts: 33, vta: 34, 'german-tech': 33 };

        const percentages = {
            nts: Math.round((scores.nts / totalScore) * 100),
            vta: Math.round((scores.vta / totalScore) * 100),
            'german-tech': Math.round((scores['german-tech'] / totalScore) * 100),
        };
        const topRecommendation = Object.keys(percentages).reduce((a, b) => percentages[a] > percentages[b] ? a : b);
        return { percentages, topRecommendation };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        const results = calculateScores();
        console.log("Final Results:", results);
        
        try {
            // ✅ FIX: Construct the payload the backend is expecting
            // Convert answers object to array format that backend expects
            const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
                questionId: questionId, // Backend expects questionId (camelCase)
                answer: answer
            }));

            // Check if user is retaking questionnaire
            const urlParams = new URLSearchParams(window.location.search);
            const retake = urlParams.get('retake');
            const isRetaking = retake === 'true' && user?.questionnaireCompleted;

            const payload = {
                answers: answersArray, // Array format the backend expects
                recommendation: results.topRecommendation, // The final calculated recommendation string
                percentages: results.percentages, // Include the calculated percentages
                update: isRetaking // Allow updates when retaking
            };

            console.log("Sending payload to backend:", payload);

            // Step 1: Tell the backend the questionnaire is complete
            const response = await api.post('/questionnaire/submit', payload);

            console.log("✅ Backend submission successful:", response.data);

            // Step 2: Force refresh user status and wait for it to complete
            await refreshUserStatus();
            
            // Step 3: Wait a bit more to ensure database update is reflected
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Step 4: Force another refresh to get the updated questionnaire_completed flag
            await refreshUserStatus();

            console.log("✅ User status refreshed");

            // Step 5: Navigate to My Career tab - it will fetch results from database
            console.log("✅ Redirecting to My Career tab");
            
            // Use window.location to force a full page reload and clear any cached state
            window.location.href = '/my-career-path';

        } catch (error) {
            console.error("Failed to submit questionnaire:", error);
            console.error("Error details:", error.response?.data);
            
            // If backend fails, try to handle gracefully
            if (error.response?.status === 500) {
                console.log("🔄 Backend error detected, trying alternative approach...");
                
                // For now, let's navigate to the results page with our calculated results
                // Store results in localStorage as a fallback
                localStorage.setItem('fallback_questionnaire_results', JSON.stringify({
                    answers: answers,
                    recommendation: results.topRecommendation,
                    percentages: results.percentages,
                    completed_at: new Date().toISOString()
                }));
                
                // Navigate to results page
                console.log("✅ Navigating to My Career tab with fallback results");
                navigate('/my-career-path');
            } else {
                // Show user-friendly error message
                alert("There was an issue submitting your questionnaire. Please try again or contact support.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch(step) {
            case 0:
                const urlParams = new URLSearchParams(window.location.search);
                const retake = urlParams.get('retake');
                const isRetaking = retake === 'true' && user?.questionnaireCompleted;
                
                return (
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="gradient-card p-12 rounded-2xl" style={{ background: 'var(--bg-card)' }}>
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 transition-all duration-300"
                                 style={{ 
                                   background: 'var(--gradient-corporate)',
                                   boxShadow: 'var(--shadow-colored)'
                                 }}>
                                <Compass size={32} className="text-white" />
                            </div>
                            
                            <h2 className="text-4xl font-bold mb-6 gradient-text">
                                {isRetaking ? "Update Your Recommendations" : "Welcome! Let's Find Your Perfect Match"}
                            </h2>
                            
                            <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                                {isRetaking 
                                    ? "Retake the assessment to update your career recommendations with fresh insights." 
                                    : "Choose your preferred language to begin your personalized career discovery journey."
                                }
                            </p>
                            
                            {isRetaking && (
                                <div className="p-6 rounded-xl mb-8 border-l-4"
                                     style={{ 
                                       background: 'var(--bg-secondary)', 
                                       borderColor: 'var(--accent-orange)',
                                       boxShadow: 'var(--shadow-sm)'
                                     }}>
                                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                        💡 Your updated results will replace your current career recommendations
                                    </p>
                                </div>
                            )}
                            
                            {/* Professional language + theme choice */}
                            <div className="space-y-6">
                              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                                <button 
                                  type="button" 
                                  onClick={() => handleLangChoice("en")} 
                                  className="group p-8 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col items-center justify-center gap-3"
                                  style={{
                                    background: 'var(--bg-button-secondary)',
                                    borderColor: 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                  }}
                                >
                                  <div className="p-3 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
                                    <Globe className="text-orange-500" />
                                  </div>
                                  <div className="font-semibold text-lg">English</div>
                                </button>

                                <button 
                                  type="button" 
                                  onClick={() => handleLangChoice("si")} 
                                  className="group p-8 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col items-center justify-center gap-3"
                                  style={{
                                    background: 'var(--bg-button-secondary)',
                                    borderColor: 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                  }}
                                >
                                  <div className="p-3 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
                                    <Globe className="text-orange-500" />
                                  </div>
                                  <div className="font-semibold text-lg">සිංහල</div>
                                </button>

                                <button 
                                  type="button" 
                                  onClick={() => handleLangChoice("ta")} 
                                  className="group p-8 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col items-center justify-center gap-3"
                                  style={{
                                    background: 'var(--bg-button-secondary)',
                                    borderColor: 'var(--border-primary)',
                                    color: 'var(--text-primary)'
                                  }}
                                >
                                  <div className="p-3 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
                                    <Globe className="text-orange-500" />
                                  </div>
                                  <div className="font-semibold text-lg">தமிழ்</div>
                                </button>
                              </div>

                              {/* Theme Toggle */}
                              <div className="flex items-center justify-center gap-4 mt-4">
                                <span className="text-sm opacity-70" style={{ color: 'var(--text-secondary)' }}>Theme:</span>
                                <ThemeToggle size="md" showLabel={true} />
                              </div>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                const educationOptions = [
                    {
                        id: 'ol',
                        title: 'G.C.E. Ordinary Level (O/L)',
                        description: 'Completed up to Grade 11 with O/L qualification',
                        icon: '📚',
                        color: 'from-emerald-500 to-teal-600'
                    },
                    {
                        id: 'al_science',
                        title: 'G.C.E. Advanced Level - Science',
                        description: 'Completed A/L with Science stream (Physics, Chemistry, Biology/Math)',
                        icon: '🔬',
                        color: 'from-blue-500 to-purple-600'
                    },
                    {
                        id: 'al_other',
                        title: 'G.C.E. Advanced Level - Other',
                        description: 'Completed A/L with Arts, Commerce, or Technology stream',
                        icon: '🎨',
                        color: 'from-orange-500 to-red-500'
                    }
                ];

                return (
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="gradient-card p-12 rounded-2xl" style={{ background: 'var(--bg-card)' }}>
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 transition-all duration-300"
                                 style={{ 
                                   background: 'var(--gradient-secondary)',
                                   boxShadow: 'var(--shadow-colored)'
                                 }}>
                                <School size={32} className="text-white" />
                            </div>
                            
                            <h2 className="text-4xl font-bold mb-6 gradient-text">
                                What's Your Educational Background?
                            </h2>
                            
                            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
                                This helps us recommend the most suitable career paths based on your qualifications
                            </p>
                            
                            <div className="grid gap-6">
                                {educationOptions.map((option) => (
                                    <button 
                                        key={option.id}
                                        type="button" 
                                        onClick={() => handleEducationSelect(option.id)}
                                        className="group p-8 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-left"
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--text-primary)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.borderColor = 'var(--accent-blue)';
                                            e.target.style.boxShadow = 'var(--shadow-colored)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.borderColor = 'var(--border-primary)';
                                            e.target.style.boxShadow = 'var(--shadow-sm)';
                                        }}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="text-4xl">{option.icon}</div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                                    {option.title}
                                                </h3>
                                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                    {option.description}
                                                </p>
                                            </div>
                                            <ArrowRight size={24} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                                                       style={{ color: 'var(--accent-blue)' }} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 2:
                if (loadingQuestions) {
                    return (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                            <p className="text-white">Loading questions...</p>
                        </div>
                    );
                }
                
                if (questionsData.length === 0) {
                    return (
                        <div className="text-center">
                            <p className="text-white">No questions available. Please try again.</p>
                        </div>
                    );
                }
                
                const q = questionsData[currentQuestion];
                const progress = ((currentQuestion + 1) / questionsData.length) * 100;
                
                console.log('🔍 Rendering question:', { 
                    currentQuestion, 
                    totalQuestions: questionsData.length, 
                    question: q,
                    options: q?.options,
                    answers: answers
                });
                
                return (
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="gradient-card p-8 md:p-12 rounded-2xl" style={{ background: 'var(--bg-card)' }}>
                            {/* Header with icon and progress */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300"
                                     style={{ 
                                       background: 'var(--gradient-professional)',
                                       boxShadow: 'var(--shadow-colored)'
                                     }}>
                                    <Briefcase size={24} className="text-white" />
                                </div>
                                
                                {/* Enhanced progress bar */}
                                <div className="relative w-full max-w-md mx-auto mb-6">
                                    <div className="w-full h-3 rounded-full overflow-hidden" 
                                         style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <div className="h-full rounded-full transition-all duration-700 ease-out relative" 
                                             style={{ 
                                               width: `${progress}%`, 
                                               background: 'var(--gradient-corporate)'
                                             }}>
                                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2 text-sm" 
                                         style={{ color: 'var(--text-secondary)' }}>
                                        <span>Question {currentQuestion + 1}</span>
                                        <span>{Math.round(progress)}% Complete</span>
                                        <span>{questionsData.length} Total</span>
                                    </div>
                                </div>
                            </div>

                            {/* Question */}
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-3xl font-bold leading-relaxed" 
                                    style={{ color: 'var(--text-primary)' }}>
                                    {q.question_text || q.text}
                                </h2>
                            </div>

                            {/* Options */}
                            <div className="question-options max-w-3xl mx-auto">
                              {q.options && q.options.length > 0 ? (
                                q.options.map((option, optionIndex) => {
                                  // Handle both string arrays and object arrays
                                  const optionText = typeof option === 'string' ? option : (option.text || option.label || option.value || `Option ${optionIndex + 1}`);
                                  const optionValue = typeof option === 'string' ? option : (option.value || option.id || optionText);
                                  const isSelected = answers[q.id] === optionValue;

                                  return (
                                    <button
                                      key={typeof option === 'string' ? optionIndex : (option.id || option.value || optionIndex)}
                                      type="button"
                                      onClick={() => {
                                        console.log('🔍 Option clicked:', {
                                          questionId: q.id,
                                          optionValue,
                                          optionText,
                                          option,
                                          currentAnswers: answers
                                        });
                                        handleAnswer(q.id, optionValue);
                                      }}
                                      className={`question-option focusable group ${
                                        isSelected
                                          ? 'shadow-lg transform scale-[1.01]'
                                          : 'hover:shadow-md'
                                      }`}
                                      style={{
                                        backgroundColor: isSelected ? 'var(--bg-button-secondary)' : 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        borderColor: isSelected ? 'var(--accent-blue)' : 'var(--border-primary)',
                                        boxShadow: isSelected ? 'var(--shadow-colored)' : 'var(--shadow-sm)',
                                        border: '2px solid'
                                      }}
                                      onMouseEnter={(e) => {
                                        if (!isSelected) {
                                          e.target.style.borderColor = 'var(--accent-blue)';
                                          e.target.style.boxShadow = 'var(--shadow-md)';
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        if (!isSelected) {
                                          e.target.style.borderColor = 'var(--border-primary)';
                                          e.target.style.boxShadow = 'var(--shadow-sm)';
                                        }
                                      }}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                          <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                                            isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
                                          }`}>
                                            {isSelected && <Check size={16} className="text-white" />}
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium leading-relaxed">
                                              {optionText}
                                            </p>
                                          </div>
                                        </div>
                                        <ArrowRight 
                                          size={20} 
                                          className={`transition-all duration-300 ${
                                            isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0'
                                          }`}
                                          style={{ color: 'var(--accent-blue)' }}
                                        />
                                      </div>
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="text-center p-8 rounded-xl" style={{ 
                                  background: 'var(--bg-secondary)',
                                  color: 'var(--text-secondary)'
                                }}>
                                  <p className="mb-2">No options available for this question</p>
                                  <p className="text-sm opacity-75">Question ID: {q.id}</p>
                                </div>
                              )}
                            </div>
                            
                            {/* Show results button when on the last question and it's answered */}
                        {currentQuestion === questionsData.length - 1 && answers[q.id] && (
                            <div className="text-center mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                                <div className="mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                                         style={{ background: 'var(--gradient-success)' }}>
                                        <Check size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                        Assessment Complete! 🎉
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        You've answered all {questionsData.length} questions. Ready to discover your career path?
                                    </p>
                                </div>
                                
                                <form onSubmit={handleSubmit}>
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="group px-10 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg disabled:transform-none disabled:hover:scale-100 relative overflow-hidden"
                                        style={{
                                            background: isSubmitting ? 'var(--bg-secondary)' : 'var(--gradient-corporate)',
                                            color: isSubmitting ? 'var(--text-secondary)' : 'white',
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                            boxShadow: isSubmitting ? 'var(--shadow-sm)' : 'var(--shadow-colored)'
                                        }}
                                    >
                                        {/* Animated background for loading */}
                                        {isSubmitting && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                                        )}
                                        
                                        <div className="relative z-10 flex items-center justify-center gap-3">
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                                    Processing Your Results...
                                                </>
                                            ) : (
                                                <>
                                                    <Target size={24} />
                                                    Get My Career Recommendations
                                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </form>
                                
                                <div className="mt-6 p-4 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                                    <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                        What happens next?
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                            AI analyzes your responses
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                            Personalized career matching
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                            Custom roadmap creation
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    // Show loading state while checking for saved results
    if (checkingSavedResults) {
        return (
            <div className="h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--accent-orange)' }}></div>
                    <p style={{ color: 'var(--text-primary)' }}>Checking for saved results...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="questionnaire-container" style={{ background: 'var(--bg-primary)' }}>
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-5"
                     style={{ background: 'var(--gradient-corporate)' }}></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5"
                     style={{ background: 'var(--gradient-secondary)' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full opacity-3"
                     style={{ background: 'var(--gradient-professional)' }}></div>
            </div>

            {/* Main content container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="questionnaire-card">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default QuestionnairePage;