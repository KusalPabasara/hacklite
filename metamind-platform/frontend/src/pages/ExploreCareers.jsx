import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Wrench, Globe, GraduationCap, Stethoscope, Code, Palette, Calculator, Tractor } from 'lucide-react';
import { getAllRoadmaps, setTargetCareer } from '../utils/roadmapApi';
import { useTheme } from '../context/ThemeContext';

// Institute-specific themes and logos (same as RecommendationPage)
const instituteThemes = {
    'NTS - Nursing Training School': {
        primary: '#2563EB',
        secondary: '#1D4ED8',
        light: '#DBEAFE',
        dark: '#1E3A8A',
        icon: '🏥',
        name: 'NTS Blue'
    },
    'VTA - Vocational Training Authority': {
        primary: '#059669',
        secondary: '#047857',
        light: '#D1FAE5',
        dark: '#064E3B',
        icon: '⚙️',
        name: 'VTA Green'
    },
    'German Technical Training': {
        primary: '#7C2D12',
        secondary: '#991B1B',
        light: '#FEE2E2',
        dark: '#7F1D1D',
        icon: '🇩🇪',
        name: 'German Red'
    },
    'Agricultural Engineering': {
        primary: '#16A34A',
        secondary: '#15803D',
        light: '#DCFCE7',
        dark: '#14532D',
        icon: '🌾',
        name: 'Agriculture Green'
    },
    'Medical Officer (MO)': {
        primary: '#DC2626',
        secondary: '#B91C1C',
        light: '#FEE2E2',
        dark: '#991B1B',
        icon: '⚕️',
        name: 'Medical Red'
    },
    'Chartered Accountancy (CA)': {
        primary: '#7C3AED',
        secondary: '#6D28D9',
        light: '#EDE9FE',
        dark: '#4C1D95',
        icon: '💼',
        name: 'CA Purple'
    },
    'Teacher Training College': {
        primary: '#EA580C',
        secondary: '#C2410C',
        light: '#FED7AA',
        dark: '#9A3412',
        icon: '🎓',
        name: 'Education Orange'
    },
    'DTET Open University': {
        primary: '#0891B2',
        secondary: '#0E7490',
        light: '#CFFAFE',
        dark: '#164E63',
        icon: '📚',
        name: 'DTET Cyan'
    },
    'Open University Sri Lanka': {
        primary: '#9333EA',
        secondary: '#7C2D12',
        light: '#F3E8FF',
        dark: '#581C87',
        icon: '🎓',
        name: 'Open Uni Violet'
    },
    'Korean Employment Program': {
        primary: '#1F2937',
        secondary: '#111827',
        light: '#F3F4F6',
        dark: '#030712',
        icon: '🇰🇷',
        name: 'Korean Navy'
    },
    'BIT - Bachelor of Information Technology': {
        primary: '#0EA5E9',
        secondary: '#0284C7',
        light: '#E0F2FE',
        dark: '#0C4A6E',
        icon: '💻',
        name: 'BIT Blue'
    }
};

// Institute logos mapping
const instituteLogos = {
    'NTS - Nursing Training School': '/images/institutes/nts-logo.png',
    'VTA - Vocational Training Authority': '/images/institutes/vta-logo.png',
    'German Technical Training': '/images/institutes/german-tech-logo.png',
    'Agricultural Engineering': '/images/institutes/agricultural-engineering-logo.png',
    'Medical Officer (MO)': '/images/institutes/medical-officer-logo.png',
    'Chartered Accountancy (CA)': '/images/institutes/ca-logo.png',
    'Teacher Training College': '/images/institutes/teacher-training-logo.png',
    'DTET Open University': '/images/institutes/dtet-open-uni-logo.png',
    'Open University Sri Lanka': '/images/institutes/open-university-sl.png',
    'Korean Employment Program': '/images/institutes/korean employment.jpeg',
    'BIT - Bachelor of Information Technology': '/images/institutes/bit-logo.png'
};

// Get career details with theme and logo
const getCareerDetails = (title, category) => {
    const theme = instituteThemes[title] || getCategoryTheme(category);
    return {
        title: title,
        category: category,
        theme: theme,
        logo: instituteLogos[title] || null
    };
};

// Fallback category themes
const getCategoryTheme = (category) => {
    const categoryThemes = {
        'Healthcare': {
            primary: '#10B981',
            secondary: '#059669',
            light: '#D1FAE5',
            dark: '#064E3B',
            icon: '🏥',
            name: 'Healthcare Green'
        },
        'Technical': {
            primary: '#3B82F6',
            secondary: '#2563EB',
            light: '#DBEAFE',
            dark: '#1E3A8A',
            icon: '⚙️',
            name: 'Technical Blue'
        },
        'Education': {
            primary: '#8B5CF6',
            secondary: '#7C3AED',
            light: '#EDE9FE',
            dark: '#4C1D95',
            icon: '🎓',
            name: 'Education Violet'
        },
        'Agriculture': {
            primary: '#F59E0B',
            secondary: '#D97706',
            light: '#FEF3C7',
            dark: '#92400E',
            icon: '🌾',
            name: 'Agriculture Amber'
        },
        'Business': {
            primary: '#EF4444',
            secondary: '#DC2626',
            light: '#FEE2E2',
            dark: '#991B1B',
            icon: '💼',
            name: 'Business Red'
        },
        'Technology': {
            primary: '#06B6D4',
            secondary: '#0891B2',
            light: '#CFFAFE',
            dark: '#164E63',
            icon: '💻',
            name: 'Technology Cyan'
        }
    };
    
    return categoryThemes[category] || categoryThemes['Technology'];
};


const ExploreCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await getAllRoadmaps();
        setCareers(response.data || []);
      } catch (err) {
        console.error('Error fetching careers:', err);
        setError('Failed to load careers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading careers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center max-w-md mx-auto">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Something went wrong</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl sm:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Explore Careers</h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Discover exciting career paths that match your interests and skills. Your future starts with the right choice.
          </p>
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career) => {
            const details = getCareerDetails(career.career_title, career.category);
            
            return (
              <div 
                key={career.career_id} 
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} group`}
              >
                {/* Card Header with Logo/Icon */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Institute Logo or Category Icon */}
                      <div className="flex-shrink-0">
                        {details.logo ? (
                          <img 
                            src={details.logo} 
                            alt={details.title}
                            className="w-16 h-16 rounded-xl object-cover shadow-md"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-md ${details.logo ? 'hidden' : 'flex'}`}
                          style={{ backgroundColor: details.theme.light, color: details.theme.primary }}
                        >
                          {details.theme.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide`}>{details.category}</span>
                        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mt-1 line-clamp-2`}>{details.title}</h2>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed line-clamp-3 mb-4`}>
                    {career.career_description}
                  </p>
                  
                  {/* Career Stats */}
                  <div className={`flex items-center gap-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: details.theme.primary }}></span>
                      {career.total_steps} steps
                    </span>
                    <span>•</span>
                    <span>{career.min_difficulty} - {career.max_difficulty}</span>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="px-6 pb-6">
                  <button 
                    onClick={async () => {
                      try {
                        // Set the target career first
                        await setTargetCareer(career.career_id);
                        // Then navigate to roadmap
                        navigate(`/roadmap/${career.career_id}`);
                      } catch (error) {
                        console.error('Error setting target career:', error);
                        // Still navigate even if setting fails
                        navigate(`/roadmap/${career.career_id}`);
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 group-hover:scale-105"
                    style={{ 
                      backgroundColor: details.theme.primary,
                      boxShadow: `0 4px 14px 0 ${details.theme.primary}40`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = details.theme.secondary;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = details.theme.primary;
                    }}
                  >
                    Choose This Path
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Need Help Choosing?</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 max-w-2xl mx-auto`}>
              Take our comprehensive career assessment to get personalized recommendations based on your interests, skills, and goals.
            </p>
            <Link 
              to="/questionnaire"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Take Career Assessment
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCareers;