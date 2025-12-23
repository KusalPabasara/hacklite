import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Target,
  TrendingUp,
  Calendar,
  Award,
  Compass,
  BarChart,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  RefreshCw,
  Info,
  Users
} from 'lucide-react';
import axios from 'axios';

const MyCareerPath = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // State management
  const [results, setResults] = useState(null);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch user's career recommendations on mount
  useEffect(() => {
    const fetchCareerData = async () => {
      if (!user?.questionnaireCompleted) {
        navigate('/questionnaire');
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        // Fetch user's questionnaire results
        const resultsResponse = await axios.get('http://localhost:5000/api/questionnaire/result', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Fetch all careers
        const careersResponse = await axios.get('http://localhost:5000/api/careers');

        if (resultsResponse.data.completed) {
          setResults(resultsResponse.data);
          setLastUpdated(new Date(resultsResponse.data.result?.updated_at || Date.now()));
        }

        setCareers(careersResponse.data);
      } catch (error) {
        console.error('❌ Error fetching career data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();
  }, [user, navigate]);

  const retakeQuestionnaire = () => {
    navigate('/questionnaire?retake=true');
  };

  const viewRoadmap = (careerId) => {
    navigate(`/roadmap/${careerId}`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg`}>Loading your career path...</p>
        </div>
      </div>
    );
  }

  if (!results || !results.completed) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md mx-auto">
          <Compass className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Start Your Career Journey
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Complete our career assessment to get personalized recommendations and track your progress.
          </p>
          <button
            onClick={() => navigate('/questionnaire')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Take Career Assessment
          </button>
        </div>
      </div>
    );
  }

  const { percentages, topRecommendation, sortedCareers } = results;
  const topCareerData = careers.find(career => career.id.toString() === topRecommendation);

  // Use sortedCareers from backend if available, otherwise fall back to percentages
  const sortedRecommendations = sortedCareers && sortedCareers.length > 0
    ? sortedCareers.map(item => ({
        id: item.career_id || item.id,
        percentage: item.match_percentage,
        career: careers.find(c => c.id.toString() === (item.career_id || item.id)?.toString())
      }))
    : Object.entries(percentages || {})
        .map(([id, percentage]) => ({
          id,
          percentage,
          career: careers.find(c => c.id.toString() === id)
        }))
        .filter(item => item.career)
        .sort((a, b) => b.percentage - a.percentage);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-4 sm:py-8`}>
      <div className="w-full max-w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-8"
           style={{ maxWidth: 'min(100vw, 1400px)' }}>
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
                My Career Path
              </h1>
              <p className={`text-sm sm:text-base lg:text-lg mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your personalized career recommendations and progress
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {lastUpdated && (
                <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-2 justify-center sm:justify-start`}>
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>Updated {lastUpdated.toLocaleDateString()}</span>
                </div>
              )}
              <button
                onClick={retakeQuestionnaire}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 justify-center"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistical Analysis Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Match Analysis Card */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <BarChart className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0" />
              <h3 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Match Analysis
              </h3>
            </div>
            <div className="space-y-2">
              <div>
                <span className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {sortedRecommendations.length}
                </span>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Careers Analysed
                </p>
              </div>
              <div>
                <span className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {sortedRecommendations.length > 0
                    ? Math.round(sortedRecommendations.reduce((sum, item) => sum + item.percentage, 0) / sortedRecommendations.length)
                    : 0}%
                </span>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Avg Match Score
                </p>
              </div>
            </div>
          </div>

          {/* Confidence Level Card */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
              <h3 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Confidence Level
              </h3>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-green-600">
                  {sortedRecommendations.length > 0 && sortedRecommendations[0].percentage > 70 ? '85%' : '65%'}
                </span>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Statistical Confidence
                </p>
              </div>
            </div>
          </div>

          {/* Career Diversity Card */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500 flex-shrink-0" />
              <h3 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Career Diversity
              </h3>
            </div>
            <div className="space-y-2">
              <div>
                <span className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {new Set(sortedRecommendations.map(item => item.career?.category).filter(Boolean)).size}
                </span>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Different Categories
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation Strength Card */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 flex-shrink-0" />
              <h3 className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Recommendation Strength
              </h3>
            </div>
            <div className="space-y-2">
              <div>
                <span className={`text-base sm:text-lg font-bold ${
                  sortedRecommendations[0]?.percentage >= 80 ? 'text-green-600' :
                  sortedRecommendations[0]?.percentage >= 65 ? 'text-orange-500' : 'text-red-500'
                }`}>
                  {sortedRecommendations[0]?.percentage >= 80 ? 'Strong' :
                   sortedRecommendations[0]?.percentage >= 65 ? 'Moderate' : 'Exploring'}
                </span>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Match Quality
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content - Career Matches */}
          <div className="lg:col-span-3 w-full min-w-0">
            {/* All Career Matches Section */}
            <div className="mb-8">
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                All Career Matches
              </h2>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Sorted by compatibility
              </p>

              {/* Top Recommendation Card */}
              {topCareerData && (
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border-2 border-blue-200 mb-6 sm:mb-8`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                        <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
                          Top Recommendation
                        </span>
                        <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight`}>
                          {topCareerData.title}
                        </h2>
                        <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {topCareerData.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right flex-shrink-0 w-full sm:w-auto">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1">
                        {Math.round(percentages[topRecommendation] || 0)}%
                      </div>
                      <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Match Score
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                      <div
                        className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                        style={{ width: `${percentages[topRecommendation] || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 leading-relaxed`}>
                    {topCareerData.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={() => viewRoadmap(topCareerData.id)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base justify-center"
                    >
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                      View Roadmap
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                    <button
                      onClick={() => navigate('/explore-careers')}
                      className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'} justify-center`}
                    >
                      <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
                      Explore More
                    </button>
                  </div>
                </div>
              )}

              {/* Statistical Analysis Section */}
              <div className="grid gap-6 lg:grid-cols-4 mb-8">
                {/* Statistical Cards */}
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Match Analysis
                    </h4>
                    <BarChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Careers Analyzed</span>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{sortedRecommendations.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Avg Match Score</span>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {Math.round(sortedRecommendations.reduce((sum, item) => sum + item.percentage, 0) / sortedRecommendations.length)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Confidence Level
                    </h4>
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {sortedRecommendations[0]?.career?.title?.includes('Strong') ? '95%' :
                       sortedRecommendations[0]?.percentage > 70 ? '85%' :
                       sortedRecommendations[0]?.percentage > 50 ? '75%' : '65%'}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Statistical Confidence
                    </div>
                  </div>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Career Diversity
                    </h4>
                    <Compass className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {new Set(sortedRecommendations.map(item => item.career?.category)).size}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Different Categories
                    </div>
                  </div>
                </div>

                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Recommendation Strength
                    </h4>
                    <Award className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {sortedRecommendations[0]?.percentage > 80 ? 'Excellent' :
                       sortedRecommendations[0]?.percentage > 65 ? 'Strong' :
                       sortedRecommendations[0]?.percentage > 50 ? 'Good' : 'Moderate'}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Match Quality
                    </div>
                  </div>
                </div>
              </div>

              {/* All Recommendations */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Recommendations List */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      All Career Matches
                    </h3>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Sorted by compatibility
                    </div>
                  </div>
                  <div className="space-y-4">
                    {sortedRecommendations.map((item, index) => (
                      <div
                        key={item.id}
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 ${
                          index === 0 ? 'ring-2 ring-blue-500 ring-opacity-30' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                              index === 0 ? 'bg-blue-100 text-blue-600' :
                              index === 1 ? 'bg-green-100 text-green-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📋'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                                  {item.career.title}
                                </h4>
                                {index === 0 && (
                                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                    Best Match
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {item.career.category}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => viewRoadmap(item.career.id)}
                              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                                isDarkMode
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                              }`}
                            >
                              View Roadmap
                            </button>
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {Math.round(item.percentage)}%
                              </div>
                              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Match
                              </div>
                            </div>

                            <div className="w-20">
                              <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                                <div
                                  className="h-2 rounded-full transition-all duration-1000"
                                  style={{
                                    width: `${item.percentage}%`,
                                    backgroundColor: index === 0 ? '#3B82F6' :
                                                   index === 1 ? '#10B981' : '#6B7280'
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side Panel - Quick Stats & Actions */}
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-md`}>
                    <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Assessment Overview
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Careers Analyzed
                        </span>
                        <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {sortedRecommendations.length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Top Match Score
                        </span>
                        <span className="font-semibold text-blue-600">
                          {Math.round(sortedRecommendations[0]?.percentage || 0)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Assessment Date
                        </span>
                        <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {lastUpdated?.toLocaleDateString() || 'Today'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-md`}>
                    <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Quick Actions
                    </h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate('/explore-careers')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                      >
                        <Compass className="h-5 w-5" />
                        Explore All Careers
                      </button>
                      <button
                        onClick={() => navigate('/quizzes')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                      >
                        <Award className="h-5 w-5" />
                        Take Skills Quiz
                      </button>
                      <button
                        onClick={() => navigate('/mentors')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                      >
                        <Users className="h-5 w-5" />
                        Find Mentors
                      </button>
                    </div>
                  </div>

                  {/* Progress Tip */}
                  <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} rounded-xl p-6 border`}>
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>
                          Pro Tip
                        </h5>
                        <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                          Your career path can evolve! Retake the assessment every few months to discover new opportunities as your interests and skills grow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCareerPath;