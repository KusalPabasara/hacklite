import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import { CheckCircle, BookOpen, Wrench, Globe, ArrowRight, GraduationCap, Stethoscope, Calculator, Palette, Tractor, Building, Users, Briefcase, Star, TrendingUp, Award, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

// Simplified session-based cache to prevent multiple API calls
const sessionResultsCache = new Map();

// Institute-specific themes based on logo colors and branding
const instituteThemes = {
    'NTS - Nursing Training School': {
        primary: '#2563EB', // Professional blue (medical/healthcare)
        secondary: '#1D4ED8', // Darker blue
        light: '#DBEAFE', // Light blue background
        dark: '#1E3A8A', // Dark blue
        icon: '🏥',
        name: 'NTS Blue'
    },
    'VTA - Vocational Training Authority': {
        primary: '#059669', // Professional green (vocational/technical)
        secondary: '#047857', // Darker green
        light: '#D1FAE5', // Light green background
        dark: '#064E3B', // Dark green
        icon: '⚙️',
        name: 'VTA Green'
    },
    'German Technical Training': {
        primary: '#7C2D12', // German flag red
        secondary: '#991B1B', // Darker red
        light: '#FEE2E2', // Light red background
        dark: '#7F1D1D', // Dark red
        icon: '🇩🇪',
        name: 'German Red'
    },
    'Agricultural Engineering': {
        primary: '#16A34A', // Natural green (agriculture)
        secondary: '#15803D', // Darker green
        light: '#DCFCE7', // Light green background
        dark: '#14532D', // Dark green
        icon: '🌾',
        name: 'Agriculture Green'
    },
    'Medical Officer (MO)': {
        primary: '#DC2626', // Medical red
        secondary: '#B91C1C', // Darker red
        light: '#FEE2E2', // Light red background
        dark: '#991B1B', // Dark red
        icon: '⚕️',
        name: 'Medical Red'
    },
    'Chartered Accountancy (CA)': {
        primary: '#7C3AED', // Professional purple (finance)
        secondary: '#6D28D9', // Darker purple
        light: '#EDE9FE', // Light purple background
        dark: '#4C1D95', // Dark purple
        icon: '💼',
        name: 'CA Purple'
    },
    'Teacher Training College': {
        primary: '#EA580C', // Educational orange
        secondary: '#C2410C', // Darker orange
        light: '#FED7AA', // Light orange background
        dark: '#9A3412', // Dark orange
        icon: '🎓',
        name: 'Education Orange'
    },
    'DTET Open University': {
        primary: '#0891B2', // University cyan
        secondary: '#0E7490', // Darker cyan
        light: '#CFFAFE', // Light cyan background
        dark: '#164E63', // Dark cyan
        icon: '📚',
        name: 'DTET Cyan'
    },
    'Open University Sri Lanka': {
        primary: '#9333EA', // University violet
        secondary: '#7C2D12', // Darker violet
        light: '#F3E8FF', // Light violet background
        dark: '#581C87', // Dark violet
        icon: '🎓',
        name: 'Open Uni Violet'
    },
    'Korean Employment Program': {
        primary: '#1F2937', // Korean navy
        secondary: '#111827', // Darker navy
        light: '#F3F4F6', // Light gray background
        dark: '#030712', // Dark navy
        icon: '🇰🇷',
        name: 'Korean Navy'
    },
    'BIT - Bachelor of Information Technology': {
        primary: '#0EA5E9', // Tech blue
        secondary: '#0284C7', // Darker blue
        light: '#E0F2FE', // Light blue background
        dark: '#0C4A6E', // Dark blue
        icon: '💻',
        name: 'BIT Blue'
    }
};

// Get match quality indicator
const getMatchQuality = (percentage) => {
    if (percentage >= 80) return { label: 'Excellent Match', icon: Star, color: 'text-green-400' };
    if (percentage >= 60) return { label: 'Good Match', icon: TrendingUp, color: 'text-blue-400' };
    if (percentage >= 40) return { label: 'Fair Match', icon: Target, color: 'text-yellow-400' };
    return { label: 'Consider', icon: Award, color: 'text-gray-400' };
};

// Career details with institute logos and specific theming
const getCareerDetails = (careerId, title, category) => {
    const instituteLogos = {
        'NTS - Nursing Training School': '/images/institutes/nts-logo.png',
        'VTA - Vocational Training Authority': '/images/institutes/vta-logo.png',
        'German Technical Training': '/images/institutes/german-tech-logo.png',
        'Agricultural Engineering': '/images/institutes/agricultural-engineering-logo.png', // University program
        'Medical Officer (MO)': '/images/institutes/medical-officer-logo.png', // Government position
        'Chartered Accountancy (CA)': '/images/institutes/ca-logo.png', // Professional qualification
        'Teacher Training College': '/images/institutes/teacher-training-logo.png', // Government institution
        'DTET Open University': '/images/institutes/dtet-open-uni-logo.png', // DTET Open University
        'Open University Sri Lanka': '/images/institutes/open-university-sl.png', // Sri Lanka Open University
        'Korean Employment Program': '/images/institutes/korean employment.jpeg', // Korean Employment Program
        'BIT - Bachelor of Information Technology': '/images/institutes/bit-logo.png' // University program
    };
    
    // Get institute-specific theme or fallback to category-based theme
    const theme = instituteThemes[title] || getCategoryTheme(category);
    
    return {
        title: title,
        category: category,
        theme: theme,
        logo: instituteLogos[title] || null
    };
};

// Fallback category themes for careers without specific institute themes
const getCategoryTheme = (category) => {
    const categoryThemes = {
        'Healthcare': {
            primary: '#10B981', // emerald-500
            secondary: '#059669', // emerald-600
            light: '#D1FAE5', // emerald-100
            dark: '#064E3B', // emerald-900
            icon: '🏥',
            name: 'Healthcare Green'
        },
        'Technical': {
            primary: '#3B82F6', // blue-500
            secondary: '#2563EB', // blue-600
            light: '#DBEAFE', // blue-100
            dark: '#1E3A8A', // blue-900
            icon: '⚙️',
            name: 'Technical Blue'
        },
        'Education': {
            primary: '#8B5CF6', // violet-500
            secondary: '#7C3AED', // violet-600
            light: '#EDE9FE', // violet-100
            dark: '#4C1D95', // violet-900
            icon: '🎓',
            name: 'Education Violet'
        },
        'Agriculture': {
            primary: '#F59E0B', // amber-500
            secondary: '#D97706', // amber-600
            light: '#FEF3C7', // amber-100
            dark: '#92400E', // amber-900
            icon: '🌾',
            name: 'Agriculture Amber'
        },
        'Business': {
            primary: '#EF4444', // red-500
            secondary: '#DC2626', // red-600
            light: '#FEE2E2', // red-100
            dark: '#991B1B', // red-900
            icon: '💼',
            name: 'Business Red'
        },
        'Technology': {
            primary: '#06B6D4', // cyan-500
            secondary: '#0891B2', // cyan-600
            light: '#CFFAFE', // cyan-100
            dark: '#164E63', // cyan-900
            icon: '💻',
            name: 'Technology Cyan'
        }
    };
    
    return categoryThemes[category] || categoryThemes['Technology'];
};

const RecommendationPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isDarkMode } = useTheme();
    const [results, setResults] = useState(state?.results || null);
    const [loading, setLoading] = useState(false);
    const hasFetchedRef = useRef(false);
    const lastFetchTimeRef = useRef(0);
    const [careers, setCareers] = useState([]);
    const [hasRedirected, setHasRedirected] = useState(false);

    // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL LOGIC OR EARLY RETURNS
    
    // Simplified results fetching with session-based caching
    useEffect(() => {
        const fetchResults = async () => {
            // If we already have results, don't fetch again
            if (results) {
                return;
            }

            // Use navigation state if available
            if (state?.results) {
                setResults(state.results);
                return;
            }

            const userId = user?.id;
            if (!userId || !user?.questionnaireCompleted) {
                // Redirect to questionnaire if not completed
                if (!hasRedirected) {
                    setHasRedirected(true);
                    navigate('/questionnaire', { replace: true });
                }
                return;
            }

            // Check session cache first
            const cacheKey = `results_${userId}`;
            if (sessionResultsCache.has(cacheKey)) {
                const cachedData = sessionResultsCache.get(cacheKey);
                console.log('📊 Using session cache');
                setResults(cachedData);
                return;
            }

            // Prevent multiple simultaneous fetches
            if (hasFetchedRef.current || loading) {
                return;
            }

            setLoading(true);
            hasFetchedRef.current = true;

            try {
                const token = localStorage.getItem('token');
                console.log('🔍 Fetching saved questionnaire results');

                const response = await axios.get('http://localhost:5000/api/questionnaire/result', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.completed && response.data.percentages) {
                    setResults(response.data);
                    sessionResultsCache.set(cacheKey, response.data);
                    console.log('📊 Results loaded successfully');
                } else {
                    console.log('📊 No valid results found, redirecting to questionnaire');
                    setHasRedirected(true);
                    navigate('/questionnaire', { replace: true });
                }
            } catch (error) {
                console.error('❌ Error fetching results:', error.message);

                // Check for fallback results
                const fallbackResults = localStorage.getItem('fallback_questionnaire_results');
                if (fallbackResults) {
                    try {
                        const parsedResults = JSON.parse(fallbackResults);
                        const fallbackData = {
                            completed: true,
                            percentages: parsedResults.percentages,
                            topRecommendation: parsedResults.recommendation,
                            fallback: true
                        };
                        setResults(fallbackData);
                        sessionResultsCache.set(cacheKey, fallbackData);
                    } catch (parseError) {
                        console.error('❌ Error parsing fallback results:', parseError);
                        navigate('/questionnaire', { replace: true });
                    }
                } else {
                    navigate('/questionnaire', { replace: true });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [user, navigate, state, results, hasRedirected, loading]);

    // Fetch all careers for display
    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/careers');
                setCareers(response.data);
            } catch (error) {
                console.error('❌ Failed to fetch careers:', error);
            }
        };
        
        if (careers.length === 0) {
            fetchCareers();
        }
    }, [careers.length]);

    // Calculate career data (after all hooks)
    const { percentages, topRecommendation } = results || {};
    const topCareerData = results && careers.length > 0 ? careers.find(career => career.id.toString() === topRecommendation) : null;
    const topCareer = topCareerData ? getCareerDetails(topCareerData.id, topCareerData.title, topCareerData.category) : null;

    // CONDITIONAL RENDERING AFTER ALL HOOKS
    if (loading) {
        return (
            <div className={`h-full w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading your results...</p>
                </div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className={`h-full w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>Redirecting to questionnaire...</p>
                </div>
            </div>
        );
    }

    if (results && !topCareer) {
        return (
            <div className={`h-full w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading career data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className={`text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>My Recommendations</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg max-w-2xl mx-auto`}>
                    Based on your assessment, here are the career paths that best match your profile
                </p>
            </div>

            {/* Top Recommendation */}
            <div className="mb-8">
                <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-8 shadow-xl border`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            {topCareer.logo ? (
                                <img 
                                    src={topCareer.logo} 
                                    alt={topCareer.title}
                                    className="w-16 h-16 rounded-xl object-cover"
                                    onError={(e) => {
                                        // Fallback to category icon if logo fails to load
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <div 
                                className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${topCareer.logo ? 'hidden' : 'flex'}`}
                                style={{ backgroundColor: topCareer.theme.light, color: topCareer.theme.primary }}
                            >
                                {topCareer.theme.icon}
                            </div>
                            <div>
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{topCareer.title}</h2>
                                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{topCareer.category}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold" style={{ color: topCareer.theme.primary }}>
                                {Math.round(percentages[topRecommendation] || 0)}%
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Match Score</div>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                            <span>Compatibility</span>
                            <span>{Math.round(percentages[topRecommendation] || 0)}%</span>
                        </div>
                        <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                            <div 
                                className="h-3 rounded-full transition-all duration-1000"
                                style={{ 
                                    width: `${percentages[topRecommendation] || 0}%`,
                                    backgroundColor: topCareer.theme.primary
                                }}
                            ></div>
                        </div>
                    </div>
                    
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                        This career path shows the strongest alignment with your interests, skills, and goals. 
                        Based on your comprehensive assessment, your profile matches exceptionally well with this field.
                    </p>
                </div>
            </div>

            {/* Enhanced Recommendations with Visual Hierarchy */}
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Career Matches</h3>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                            Ranked by compatibility with your interests and skills
                        </p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'} rounded-lg px-4 py-2`}>
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                            {Object.keys(percentages).length} careers analyzed
                        </span>
                    </div>
                </div>

                {Object.entries(percentages)
                    .sort(([,a],[,b]) => b-a)
                    .map(([careerId, value], index) => {
                        const careerData = careers.find(career => career.id.toString() === careerId);
                        if (!careerData) return null;

                        const details = getCareerDetails(careerData.id, careerData.title, careerData.category);
                        const isTopMatch = index === 0;

                        // Enhanced match quality labels
                        const getMatchQuality = (percentage) => {
                            if (percentage >= 85) return { label: 'Excellent Match', color: 'text-green-600', bgColor: 'bg-green-50', border: 'border-green-200' };
                            if (percentage >= 70) return { label: 'Strong Match', color: 'text-blue-600', bgColor: 'bg-blue-50', border: 'border-blue-200' };
                            if (percentage >= 55) return { label: 'Good Match', color: 'text-yellow-600', bgColor: 'bg-yellow-50', border: 'border-yellow-200' };
                            if (percentage >= 40) return { label: 'Fair Match', color: 'text-orange-600', bgColor: 'bg-orange-50', border: 'border-orange-200' };
                            return { label: 'Consider', color: 'text-gray-600', bgColor: 'bg-gray-50', border: 'border-gray-200' };
                        };

                        const matchQuality = getMatchQuality(value);

                        // Card size based on ranking
                        const getCardStyle = (index) => {
                            if (index === 0) return 'scale-105 shadow-2xl border-2'; // Largest for top match
                            if (index === 1) return 'scale-100 shadow-xl border'; // Second largest
                            return 'scale-95 shadow-lg'; // Smaller for lower matches
                        };
                        
                        return (
                            <div
                                key={careerId}
                                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} ${matchQuality.border} rounded-2xl p-6 transition-all duration-300 hover:scale-102 ${getCardStyle(index)} ${
                                    isTopMatch ? `ring-2 ring-opacity-50` : ''
                                }`}
                                style={{
                                    ringColor: isTopMatch ? details.theme.primary : 'transparent',
                                    borderColor: isTopMatch ? details.theme.primary : undefined
                                }}
                            >
                                <div className="space-y-4">
                                    {/* Header with Rank and Quality Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                                style={{ backgroundColor: details.theme.primary }}
                                            >
                                                {index + 1}
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${matchQuality.color} ${matchQuality.bgColor} border ${matchQuality.border}`}>
                                                {matchQuality.label}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {isTopMatch && (
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className={`text-xs font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                                        Best Match
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex items-start gap-6">
                                        {/* Logo/Icon */}
                                        <div className="flex-shrink-0">
                                            {details.logo ? (
                                                <img
                                                    src={details.logo}
                                                    alt={details.title}
                                                    className="w-16 h-16 rounded-xl object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div
                                                className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${details.logo ? 'hidden' : 'flex'}`}
                                                style={{ backgroundColor: details.theme.light, color: details.theme.primary }}
                                            >
                                                {details.theme.icon}
                                            </div>
                                        </div>

                                        {/* Career Information */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                                                {details.title}
                                            </h4>
                                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                                                {details.category}
                                            </p>

                                            {/* Why This Matches */}
                                            <div className={`${matchQuality.bgColor} rounded-lg p-3 mb-4`}>
                                                <h5 className={`text-sm font-semibold ${matchQuality.color} mb-1`}>
                                                    Why this matches you:
                                                </h5>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {value >= 70 ?
                                                        "Strong alignment with your interests, skills, and career preferences." :
                                                        value >= 50 ?
                                                        "Good compatibility with several of your key preferences and abilities." :
                                                        "Some overlap with your interests - worth exploring further."
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        {/* Score Display */}
                                        <div className="text-center">
                                            <div
                                                className="text-4xl font-bold mb-1"
                                                style={{ color: details.theme.primary }}
                                            >
                                                {Math.round(value)}%
                                            </div>
                                            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                                                Compatibility
                                            </div>

                                            {/* Enhanced Progress Ring */}
                                            <div className="relative w-16 h-16 mx-auto">
                                                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                                                    <circle
                                                        cx="32" cy="32" r="28"
                                                        fill="none"
                                                        stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                                                        strokeWidth="4"
                                                    />
                                                    <circle
                                                        cx="32" cy="32" r="28"
                                                        fill="none"
                                                        stroke={details.theme.primary}
                                                        strokeWidth="4"
                                                        strokeDasharray={`${(value * 175.9) / 100} 175.9`}
                                                        strokeLinecap="round"
                                                        className="transition-all duration-1000 ease-out"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-2">
                                        <Link
                                            to={`/roadmap/${careerId}`}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-colors`}
                                            style={{
                                                backgroundColor: details.theme.primary,
                                                color: 'white'
                                            }}
                                        >
                                            <Target className="w-4 h-4" />
                                            View Roadmap
                                        </Link>
                                        <button
                                            className={`flex items-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                                                isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                            }`}
                                        >
                                            <BookOpen className="w-4 h-4" />
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to={`/roadmap/${topRecommendation}`}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Target className="w-5 h-5" />
                        View My Roadmap
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link 
                        to="/explore-careers"
                        className="inline-flex items-center gap-2 bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <Globe className="w-5 h-5" />
                        Explore All Careers
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecommendationPage;
