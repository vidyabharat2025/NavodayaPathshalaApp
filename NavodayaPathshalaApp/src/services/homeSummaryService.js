// homeSummaryService.js
import apiClient from '../api/apiClient';

/**
 * Fetch home summary data
 * @returns {Object} Home summary with greeting, progress, resume lesson, and tasks
 */
export const getHomeSummary = async () => {
  try {
    const response = await apiClient.get('/home/summary', {
      skipGlobalLoader: true, // HomeScreen shows its own local loader
    });
    return response.data;
  } catch (error) {
    console.error('[homeSummaryService] Failed to fetch home summary:', error.message);
    throw error;
  }
};
