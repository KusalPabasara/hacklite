import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Video, Award, Star, Clock, Target, Loader2, AlertCircle } from 'lucide-react';
import { 
  getRoadmapByCareer, 
  updateRoadmapProgress, 
  calculateProgressPercentage,
  getNextStep,
  isStepCompleted,
  isStepLocked,
  getDifficultyColor,
  formatDuration
} from '../utils/roadmapApi';

const RoadmapPage = () => {
  const { careerId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Load roadmap data from API
  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRoadmapByCareer(careerId);
        setRoadmap(data);
      } catch (err) {
        console.error('Error loading roadmap:', err);
        setError('Failed to load roadmap. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (careerId) {
      loadRoadmap();
    }
  }, [careerId]);

  const handleStepComplete = async (stepNumber) => {
    try {
      setUpdating(true);
      console.log(`🎯 Completing step ${stepNumber} for career ${careerId}`);
      
      await updateRoadmapProgress(stepNumber);
      
      // Reload roadmap to get updated progress
      console.log('🔄 Reloading roadmap data...');
      const updatedData = await getRoadmapByCareer(careerId);
      console.log('✅ Updated roadmap data:', updatedData);
      setRoadmap(updatedData);
    } catch (err) {
      console.error('Error updating progress:', err);
      setError('Failed to update progress. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleStepUndo = async (stepNumber) => {
    try {
      setUpdating(true);
      await updateRoadmapProgress(stepNumber - 1);
      
      // Reload roadmap to get updated progress
      const updatedData = await getRoadmapByCareer(careerId);
      setRoadmap(updatedData);
    } catch (err) {
      console.error('Error undoing progress:', err);
      setError('Failed to undo progress. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-500" />
          <p className="text-gray-400">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !roadmap) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold text-white mb-2">Roadmap Not Found</h2>
          <p className="text-gray-400 mb-4">{error || 'The requested roadmap could not be found.'}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateProgressPercentage(roadmap.current_step, roadmap.total_steps);
  const allStepsCompleted = roadmap.completed;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-4xl font-bold text-white mb-2">{roadmap.career_title}</h1>
        <p className="text-lg text-gray-400 mb-2">Category: {roadmap.category}</p>
        <p className="text-sm text-gray-500 mb-6">Career ID: {roadmap.career_id}</p>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-300">Your Progress</span>
            <span className="text-sm font-bold text-purple-400">{progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {roadmap.current_step} of {roadmap.total_steps} steps completed
          </p>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="space-y-6">
        {roadmap.steps.map((step, index) => {
          // Use backend-provided status or fallback to local calculation
          const isCompleted = step.is_completed !== undefined ? step.is_completed : isStepCompleted(step.step_number, roadmap.current_step);
          const isNext = step.is_current !== undefined ? step.is_current : step.step_number === roadmap.current_step + 1;
          const isLocked = step.is_locked !== undefined ? step.is_locked : isStepLocked(step.step_number, roadmap.current_step);
          
          return (
            <div 
              key={step.id}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                isCompleted 
                  ? 'border-green-500 bg-gray-800/50 shadow-lg shadow-green-500/10' 
                  : isNext
                  ? 'border-purple-500 bg-gray-800 shadow-lg shadow-purple-500/20'
                  : isLocked
                  ? 'border-gray-700 bg-gray-800/30 opacity-60'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start flex-1">
                  {/* Step Number/Check Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-6 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 shadow-lg shadow-green-500/30' 
                      : isNext
                      ? 'bg-purple-600 shadow-lg shadow-purple-500/30'
                      : isLocked
                      ? 'bg-gray-600'
                      : 'bg-gray-700'
                  }`}>
                    {isCompleted ? (
                      <Check size={24} className="text-white" />
                    ) : (
                      <span className="text-white font-bold text-lg">{step.step_number}</span>
                    )}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-xl font-semibold transition-all duration-300 ${
                        isCompleted 
                          ? 'text-gray-400 line-through' 
                          : isLocked
                          ? 'text-gray-500'
                          : 'text-white'
                      }`}>
                        {step.title}
                      </h3>
                      {isNext && (
                        <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full animate-pulse">
                          NEXT
                        </span>
                      )}
                    </div>
                    
                    <p className={`mb-4 transition-all duration-300 ${
                      isCompleted ? 'text-gray-500' : isLocked ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    
                    {/* Step Metadata */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-gray-400">{formatDuration(step.duration)}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(step.difficulty)}`}>
                        {step.difficulty} Difficulty
                      </div>
                    </div>
                    
                    {/* Requirements */}
                    {step.requirements && Array.isArray(step.requirements) && step.requirements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                          {step.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Resources */}
                    {step.resources && (
                      <div className="flex gap-3">
                        {step.resources.video && typeof step.resources.video === 'string' && step.resources.video.trim() && (
                          <a 
                            href={step.resources.video} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors text-sm font-medium"
                          >
                            <Video size={16} />
                            Watch Guide
                          </a>
                        )}
                        {step.resources.link && typeof step.resources.link === 'string' && step.resources.link.trim() && (
                          <a 
                            href={step.resources.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors text-sm font-medium"
                          >
                            <ArrowRight size={16} />
                            Visit Link
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="ml-4">
                  {isLocked ? (
                    <div className="px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-700 rounded-lg cursor-not-allowed">
                      Locked
                    </div>
                  ) : (
                    <button 
                      onClick={() => isCompleted ? handleStepUndo(step.step_number) : handleStepComplete(step.step_number)}
                      disabled={updating}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${
                        isCompleted 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/30'
                      } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {updating && <Loader2 size={14} className="animate-spin" />}
                      {isCompleted ? 'Undo' : 'Complete'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Celebration */}
      {allStepsCompleted && (
        <div className="mt-12 text-center bg-gradient-to-r from-purple-600 via-orange-500 to-green-500 p-8 rounded-xl shadow-2xl">
          <div className="bg-gray-900/20 backdrop-blur-sm rounded-lg p-6">
            <Award size={64} className="mx-auto text-white mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-white mb-2">🎉 Congratulations!</h2>
            <p className="text-white/90 text-lg mb-4">
              You've completed all the steps in your {roadmap.career_title.toLowerCase()}! 
            </p>
            <p className="text-white/80">
              You're on an amazing path to success! Keep up the great work and continue pursuing your dreams.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button className="px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors">
                Share Achievement
              </button>
              <button className="px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors">
                View Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Motivational Quote */}
      <div className="mt-8 text-center">
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <Star size={24} className="mx-auto text-yellow-400 mb-2" />
          <p className="text-gray-300 italic">
            "The journey of a thousand miles begins with a single step. You've already taken the first step by being here!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;