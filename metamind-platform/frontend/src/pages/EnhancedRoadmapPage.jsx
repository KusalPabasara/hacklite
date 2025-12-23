import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  CheckCircle,
  Circle,
  Clock,
  Trophy,
  Target,
  BookOpen,
  Award,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Play,
  Lock,
  Zap,
  Users,
  Calendar,
  TrendingUp,
  Info
} from 'lucide-react';
import axios from 'axios';

const EnhancedRoadmapPage = () => {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  // State management
  const [careerData, setCareerData] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [expandedSteps, setExpandedSteps] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  // Load career and roadmap data
  useEffect(() => {
    const loadRoadmapData = async () => {
      try {
        setLoading(true);

        // Fetch career data
        const careerResponse = await axios.get(`http://localhost:5000/api/careers/${careerId}`);
        const career = careerResponse.data;

        if (career && career.roadmap) {
          const parsedRoadmap = typeof career.roadmap === 'string'
            ? JSON.parse(career.roadmap)
            : career.roadmap;

          setCareerData(career);
          setRoadmap(parsedRoadmap);

          // Calculate total points and user progress
          const total = parsedRoadmap.reduce((sum, step) => sum + (step.points || 0), 0);
          setTotalPoints(total);

          // Load user progress (mock for now - would be from API)
          const mockProgress = {};
          parsedRoadmap.forEach((step, stepIndex) => {
            mockProgress[stepIndex] = {
              completed: false,
              tasks: step.tasks?.reduce((acc, task) => ({ ...acc, [task.id]: task.completed }), {}) || {}
            };
          });
          setUserProgress(mockProgress);

          // Expand first step by default
          setExpandedSteps({ 0: true });
        }
      } catch (error) {
        console.error('❌ Error loading roadmap:', error);
      } finally {
        setLoading(false);
      }
    };

    if (careerId) {
      loadRoadmapData();
    }
  }, [careerId]);

  // Calculate earned points and level
  useEffect(() => {
    const earned = Object.values(userProgress).reduce((sum, stepProgress) => {
      return sum + Object.values(stepProgress.tasks || {}).filter(completed => completed).length * 10;
    }, 0);

    setEarnedPoints(earned);
    setCurrentLevel(Math.floor(earned / 100) + 1);
  }, [userProgress]);

  const toggleStepExpansion = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const toggleTaskCompletion = (stepIndex, taskId) => {
    setUserProgress(prev => ({
      ...prev,
      [stepIndex]: {
        ...prev[stepIndex],
        tasks: {
          ...prev[stepIndex].tasks,
          [taskId]: !prev[stepIndex].tasks[taskId]
        }
      }
    }));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStepProgress = (step, stepIndex) => {
    const stepTasks = step.tasks || [];
    const completedTasks = stepTasks.filter(task => userProgress[stepIndex]?.tasks[task.id]).length;
    return stepTasks.length > 0 ? (completedTasks / stepTasks.length) * 100 : 0;
  };

  const isStepUnlocked = (stepIndex) => {
    if (stepIndex === 0) return true;
    const prevStepProgress = getStepProgress(roadmap[stepIndex - 1], stepIndex - 1);
    return prevStepProgress >= 80; // Unlock when 80% of previous step is complete
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg`}>Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  if (!careerData || !roadmap.length) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <Target className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-xl`}>Roadmap not found</p>
          <button
            onClick={() => navigate('/my-career-path')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Career Path
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {careerData.title} Roadmap
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your step-by-step journey to success
              </p>
            </div>
            <button
              onClick={() => navigate('/my-career-path')}
              className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
            >
              ← Back to Career Path
            </button>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md`}>
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Level {currentLevel}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Current Level
                  </p>
                </div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md`}>
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-blue-500" />
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {earnedPoints}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Points Earned
                  </p>
                </div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md`}>
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-green-500" />
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {roadmap.filter((_, index) => getStepProgress(roadmap[index], index) >= 100).length}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Steps Completed
                  </p>
                </div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md`}>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-purple-500" />
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {Math.round((earnedPoints / totalPoints) * 100) || 0}%
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Overall Progress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6">
          {roadmap.map((step, stepIndex) => {
            const isUnlocked = isStepUnlocked(stepIndex);
            const stepProgress = getStepProgress(step, stepIndex);
            const isExpanded = expandedSteps[stepIndex];
            const isCompleted = stepProgress >= 100;

            return (
              <div
                key={stepIndex}
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden ${
                  !isUnlocked ? 'opacity-60' : ''
                }`}
              >
                {/* Step Header */}
                <div
                  onClick={() => isUnlocked && toggleStepExpansion(stepIndex)}
                  className={`p-6 cursor-pointer transition-all duration-200 ${
                    isUnlocked ? 'hover:bg-opacity-80' : 'cursor-not-allowed'
                  } ${isCompleted ? 'bg-green-50' : isUnlocked ? '' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : isUnlocked ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        {!isUnlocked ? (
                          <Lock className="h-6 w-6 text-white" />
                        ) : isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <span className="text-white font-bold">{stepIndex + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {step.title}
                        </h3>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                          {step.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(step.difficulty)}`}>
                            {step.difficulty}
                          </span>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {step.duration}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Star className="h-4 w-4" />
                            {step.points} points
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {Math.round(stepProgress)}%
                        </div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                          <div
                            className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${stepProgress}%` }}
                          ></div>
                        </div>
                      </div>
                      {isUnlocked && (
                        isExpanded ? (
                          <ChevronDown className="h-6 w-6 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-6 w-6 text-gray-400" />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Step Content */}
                {isExpanded && isUnlocked && (
                  <div className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'} p-6`}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Tasks */}
                      <div className="lg:col-span-2">
                        <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Tasks ({step.tasks?.filter(task => userProgress[stepIndex]?.tasks[task.id]).length || 0}/{step.tasks?.length || 0})
                        </h4>
                        <div className="space-y-3">
                          {step.tasks?.map((task) => {
                            const isTaskCompleted = userProgress[stepIndex]?.tasks[task.id];
                            return (
                              <div
                                key={task.id}
                                onClick={() => toggleTaskCompletion(stepIndex, task.id)}
                                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                                  isTaskCompleted
                                    ? 'bg-green-50 border-green-200'
                                    : isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'
                                } border`}
                              >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  isTaskCompleted ? 'bg-green-500' : 'bg-gray-200'
                                }`}>
                                  {isTaskCompleted ? (
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className={`font-medium ${
                                    isTaskCompleted ? 'text-green-800 line-through' : isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {task.title}
                                  </p>
                                  {task.description && (
                                    <p className={`text-sm mt-1 ${
                                      isTaskCompleted ? 'text-green-600' : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                      {task.description}
                                    </p>
                                  )}
                                  {task.sri_lankan_tip && (
                                    <div className={`mt-2 p-2 rounded text-xs ${
                                      isDarkMode ? 'bg-amber-900/20 text-amber-400 border border-amber-800' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                    }`}>
                                      💡 <strong>Sri Lankan Tip:</strong> {task.sri_lankan_tip}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Zap className="h-4 w-4" />
                                  {task.points}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step Details */}
                      <div className="space-y-6">
                        {/* Local Sri Lankan Context */}
                        {step.localContext && (
                          <div>
                            <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              🇱🇰 Local Context
                            </h4>
                            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                              {step.localContext.locations && (
                                <div className="mb-3">
                                  <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>📍 Locations:</p>
                                  <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                                    {Array.isArray(step.localContext.locations)
                                      ? step.localContext.locations.join(', ')
                                      : step.localContext.locations}
                                  </p>
                                </div>
                              )}
                              {step.localContext.contacts && (
                                <div className="mb-3">
                                  <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>📞 Contacts:</p>
                                  <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                                    {Array.isArray(step.localContext.contacts)
                                      ? step.localContext.contacts.join(', ')
                                      : step.localContext.contacts}
                                  </p>
                                </div>
                              )}
                              {step.localContext.bestTime && (
                                <div className="mb-3">
                                  <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>⏰ Best Time:</p>
                                  <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                                    {step.localContext.bestTime}
                                  </p>
                                </div>
                              )}
                              {step.localContext.requirements && (
                                <div>
                                  <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>📋 Requirements:</p>
                                  <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                                    {step.localContext.requirements}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Resources */}
                        {step.resources && step.resources.length > 0 && (
                          <div>
                            <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              Resources
                            </h4>
                            <div className="space-y-2">
                              {step.resources.map((resource, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center gap-2 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                                >
                                  <BookOpen className="h-4 w-4 text-blue-500" />
                                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {typeof resource === 'object' ? resource.title || resource.name : resource}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Milestones */}
                        {step.milestones && step.milestones.length > 0 && (
                          <div>
                            <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              Milestones
                            </h4>
                            <div className="space-y-2">
                              {step.milestones.map((milestone, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                                >
                                  <Award className="h-4 w-4 text-yellow-500" />
                                  <div className="flex-1">
                                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                      {typeof milestone === 'object' ? milestone.name || milestone.title : milestone}
                                    </span>
                                    {typeof milestone === 'object' && milestone.description && (
                                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {milestone.description}
                                      </p>
                                    )}
                                  </div>
                                  {typeof milestone === 'object' && milestone.points && (
                                    <div className="flex items-center gap-1 text-xs text-yellow-600">
                                      <Star className="h-3 w-3" />
                                      {milestone.points}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tutorials & Resources */}
                        {step.tutorials && step.tutorials.length > 0 && (
                          <div>
                            <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              🎥 Tutorials & Guides
                            </h4>
                            <div className="space-y-3">
                              {step.tutorials.map((tutorial, index) => (
                                <div
                                  key={index}
                                  className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                      tutorial.type === 'video' ? 'bg-red-100 text-red-600' :
                                      tutorial.type === 'pdf' ? 'bg-blue-100 text-blue-600' :
                                      'bg-green-100 text-green-600'
                                    }`}>
                                      {tutorial.type === 'video' ? '🎬' :
                                       tutorial.type === 'pdf' ? '📄' : '📚'}
                                    </div>
                                    <div className="flex-1">
                                      <h5 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {tutorial.title}
                                      </h5>
                                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {tutorial.description}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => tutorial.url && window.open(tutorial.url, '_blank')}
                                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                                        tutorial.type === 'video' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                                        tutorial.type === 'pdf' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                                        'bg-green-100 text-green-700 hover:bg-green-200'
                                      }`}
                                    >
                                      {tutorial.type === 'video' ? 'Watch' :
                                       tutorial.type === 'pdf' ? 'Download' : 'View'}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Website Links */}
                        {step.localContext?.website && (
                          <div className={`p-4 rounded-lg border-l-4 border-green-500 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 text-green-500 flex-shrink-0">🌐</div>
                              <div>
                                <h5 className={`font-medium mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>
                                  Official Website
                                </h5>
                                <a
                                  href={step.localContext.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`text-sm hover:underline ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}
                                >
                                  {step.localContext.website}
                                </a>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Next Steps */}
                        {step.nextSteps && (
                          <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                            <div className="flex items-start gap-2">
                              <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <h5 className={`font-medium mb-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>
                                  Next Steps
                                </h5>
                                <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                                  {step.nextSteps}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/my-career-path')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Career Path
          </button>
          <button
            onClick={() => navigate('/explore-careers')}
            className={`px-6 py-3 rounded-lg transition-colors font-medium ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
          >
            Explore Other Careers
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedRoadmapPage;