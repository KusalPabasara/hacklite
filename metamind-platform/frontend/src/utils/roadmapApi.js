import api from './api';

// Roadmap API functions for connecting with the roadmap table

/**
 * Get all available roadmaps with career information
 * @returns {Promise} API response with all roadmaps
 */
export const getAllRoadmaps = async () => {
  try {
    const response = await api.get('/roadmap/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all roadmaps:', error);
    throw error;
  }
};

/**
 * Get roadmap steps for a specific career
 * @param {number} careerId - The career ID
 * @returns {Promise} API response with roadmap steps
 */
export const getRoadmapByCareer = async (careerId) => {
  try {
    const response = await api.get(`/roadmap/career/${careerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roadmap by career:', error);
    throw error;
  }
};

/**
 * Get user's current roadmap progress
 * @returns {Promise} API response with user's roadmap
 */
export const getUserRoadmap = async () => {
  try {
    const response = await api.get('/roadmap/');
    return response.data;
  } catch (error) {
    console.error('Error fetching user roadmap:', error);
    throw error;
  }
};

/**
 * Set user's target career
 * @param {number} careerId - The career ID to set as target
 * @returns {Promise} API response
 */
export const setTargetCareer = async (careerId) => {
  try {
    const response = await api.post('/roadmap/select', { career_id: careerId });
    return response.data;
  } catch (error) {
    console.error('Error setting target career:', error);
    throw error;
  }
};

/**
 * Update user's progress in the roadmap
 * @param {number} step - The step number to update to
 * @returns {Promise} API response
 */
export const updateRoadmapProgress = async (step) => {
  try {
    const response = await api.put('/roadmap/progress', { step });
    return response.data;
  } catch (error) {
    console.error('Error updating roadmap progress:', error);
    throw error;
  }
};

/**
 * Get specific roadmap step details
 * @param {number} stepId - The step ID
 * @returns {Promise} API response with step details
 */
export const getRoadmapStep = async (stepId) => {
  try {
    const response = await api.get(`/roadmap/step/${stepId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roadmap step:', error);
    throw error;
  }
};

/**
 * Get careers with roadmap information
 * @returns {Promise} API response with careers and roadmap data
 */
export const getCareersWithRoadmaps = async () => {
  try {
    const response = await api.get('/careers');
    return response.data;
  } catch (error) {
    console.error('Error fetching careers with roadmaps:', error);
    throw error;
  }
};

/**
 * Complete a roadmap step
 * @param {number} stepNumber - The step number to complete
 * @returns {Promise} API response
 */
export const completeRoadmapStep = async (stepNumber) => {
  try {
    const response = await updateRoadmapProgress(stepNumber);
    return response;
  } catch (error) {
    console.error('Error completing roadmap step:', error);
    throw error;
  }
};

/**
 * Get roadmap progress percentage
 * @param {number} currentStep - Current step number
 * @param {number} totalSteps - Total number of steps
 * @returns {number} Progress percentage
 */
export const calculateProgressPercentage = (currentStep, totalSteps) => {
  if (totalSteps === 0) return 0;
  return Math.round((currentStep / totalSteps) * 100);
};

/**
 * Get next step in roadmap
 * @param {Array} steps - Array of roadmap steps
 * @param {number} currentStep - Current step number
 * @returns {Object|null} Next step object or null
 */
export const getNextStep = (steps, currentStep) => {
  if (!steps || steps.length === 0) return null;
  return steps.find(step => step.step_number === currentStep + 1) || null;
};

/**
 * Check if step is completed
 * @param {number} stepNumber - Step number to check
 * @param {number} currentStep - Current completed step
 * @returns {boolean} True if step is completed
 */
export const isStepCompleted = (stepNumber, currentStep) => {
  return stepNumber <= currentStep;
};

/**
 * Check if step is locked (not yet accessible)
 * @param {number} stepNumber - Step number to check
 * @param {number} currentStep - Current completed step
 * @returns {boolean} True if step is locked
 */
export const isStepLocked = (stepNumber, currentStep) => {
  return stepNumber > currentStep + 1;
};

/**
 * Get difficulty color class for UI
 * @param {string} difficulty - Difficulty level
 * @returns {string} CSS class for difficulty
 */
export const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'low':
      return 'text-green-400 bg-green-900/20';
    case 'medium':
      return 'text-yellow-400 bg-yellow-900/20';
    case 'high':
      return 'text-red-400 bg-red-900/20';
    case 'very high':
      return 'text-red-500 bg-red-900/30';
    default:
      return 'text-gray-400 bg-gray-900/20';
  }
};

/**
 * Format duration for display
 * @param {string} duration - Duration string
 * @returns {string} Formatted duration
 */
export const formatDuration = (duration) => {
  if (!duration) return 'Not specified';
  return duration;
};

/**
 * Get roadmap statistics
 * @param {Array} steps - Array of roadmap steps
 * @returns {Object} Statistics object
 */
export const getRoadmapStats = (steps) => {
  if (!steps || steps.length === 0) {
    return {
      totalSteps: 0,
      difficulties: {},
      totalDuration: 'Unknown'
    };
  }

  const difficulties = {};
  steps.forEach(step => {
    const difficulty = step.difficulty || 'Unknown';
    difficulties[difficulty] = (difficulties[difficulty] || 0) + 1;
  });

  return {
    totalSteps: steps.length,
    difficulties,
    totalDuration: 'Varies by step'
  };
};
