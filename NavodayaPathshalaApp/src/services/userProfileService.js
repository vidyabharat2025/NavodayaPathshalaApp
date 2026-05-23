/**
 * User Profile Service
 * Handles user profile API calls
 */

import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../api/apiConstants';

const TAG = 'UserProfileService';

/**
 * Fetch user profile data from GET /me endpoint
 * @returns {Promise<object>} User profile data
 */
const fetchUserProfile = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USER.ME);
    return response.data;
  } catch (err) {
    console.error(`[${TAG}] Failed to fetch user profile:`, err.message);
    throw err;
  }
};

/**
 * Update user profile data using PUT /me endpoint
 * @param {object} updateData - Data to update (name, email, mobile_number, language, school_name, board, state, district, grade)
 * @returns {Promise<object>} Updated user profile data
 */
const updateUserProfile = async (updateData) => {
  try {
    const response = await apiClient.put(API_ENDPOINTS.USER.ME, updateData);
    return response.data;
  } catch (err) {
    console.error(`[${TAG}] Failed to update user profile:`, err.message);
    throw err;
  }
};

/**
 * Map language code to language name
 * @param {string} languageCode - Language code (e.g., 'en')
 * @returns {string} Language name
 */
const getLanguageName = (languageCode) => {
  const languageMap = {
    en: 'English',
    hi: 'Hindi',
    mr: 'Marathi',
    gu: 'Gujarati',
    kn: 'Kannada',
    ta: 'Tamil',
    te: 'Telugu',
    ml: 'Malayalam',
    bn: 'Bengali',
  };
  return languageMap[languageCode] || languageCode;
};

/**
 * Format grade number to grade label
 * @param {number} grade - Grade number
 * @returns {string} Formatted grade label
 */
const getGradeLabel = (grade) => {
  if (!grade || grade === 0) return 'Student';
  return `${grade}th Grade Student`;
};

export {
  fetchUserProfile,
  updateUserProfile,
  getLanguageName,
  getGradeLabel,
};
