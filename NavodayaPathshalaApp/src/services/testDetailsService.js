/**
 * Test Details Service
 * Handles fetching complete test details including questions, meta info, etc.
 */

import apiClient from '../api/apiClient';

/**
 * Fetch complete test details by ID
 * @param {number} testId - The ID of the test to fetch
 * @returns {Promise<Object>} Test details including title, questions, time_limit_minutes, pass_percentage, etc.
 */
export const fetchTestDetails = async (testId) => {
  try {
    if (!testId) {
      throw new Error('Test ID is required');
    }

    const response = await apiClient.get(`/tests/${testId}`, {
      skipGlobalLoader: false, // Show loader while fetching test details
    });

    // Validate response has required fields
    if (!response.data) {
      throw new Error('Invalid test response');
    }

    return response.data;
  } catch (err) {
    console.error('Failed to fetch test details:', err);
    throw err;
  }
};

export default {
  fetchTestDetails,
};
