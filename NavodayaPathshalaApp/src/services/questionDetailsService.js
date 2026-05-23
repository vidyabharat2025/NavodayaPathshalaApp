/**
 * Question Details Service
 * Handles fetching complete question details including options
 */

import apiClient from '../api/apiClient';

/**
 * Fetch complete question details by ID
 * @param {number} questionId - The ID of the question to fetch
 * @param {string} languageCode - Language code (default: 'en')
 * @returns {Promise<Object>} Question details including question_text, options with option_text, explanation, etc.
 */
export const fetchQuestionDetails = async (questionId, languageCode = 'en') => {
  try {
    if (!questionId) {
      throw new Error('Question ID is required');
    }

    const response = await apiClient.get(`/questions/${questionId}?language_code=${languageCode}`, {
      skipGlobalLoader: false,
    });

    if (!response.data) {
      throw new Error('Invalid question response');
    }

    // Sort options by order field
    if (response.data.options && Array.isArray(response.data.options)) {
      response.data.options.sort((a, b) => a.order - b.order);
    }

    return response.data;
  } catch (err) {
    console.error('Failed to fetch question details:', err);
    throw err;
  }
};

export default {
  fetchQuestionDetails,
};
