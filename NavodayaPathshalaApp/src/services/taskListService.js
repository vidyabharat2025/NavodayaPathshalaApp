/**
 * Task List Service
 * Non-paginated APIs for fetching subjects, topics, and lessons
 * Used in TaskScreen for simple dropdown filters
 */

import apiClient from '../api/apiClient';

/**
 * Get all subjects for a grade
 * @param {number} gradeId - Grade ID
 * @param {string} languageCode - Language code (default: 'en')
 * @returns {Promise<Array>} Array of subjects
 */
export const getSubjects = async (gradeId, languageCode = 'en') => {
  try {
    const params = new URLSearchParams({
      grade_id: gradeId,
      language_code: languageCode,
    });

    const response = await apiClient.get(`/subjects?${params.toString()}`, {
      skipGlobalLoader: true, // Don't show global loader for filter APIs
    });
    
    // Direct array response
    return response.data || [];
  } catch (err) {
    console.error('Failed to fetch subjects:', err);
    return [];
  }
};

/**
 * Get all topics for a subject
 * @param {number} subjectId - Subject ID
 * @returns {Promise<Array>} Array of topics
 */
export const getTopics = async (subjectId) => {
  try {
    if (!subjectId) {
      return [];
    }

    const params = new URLSearchParams({
      subject_id: subjectId,
    });

    const response = await apiClient.get(`/topics?${params.toString()}`, {
      skipGlobalLoader: true, // Don't show global loader for filter APIs
    });
    
    // Direct array response
    return response.data || [];
  } catch (err) {
    console.error('Failed to fetch topics:', err);
    return [];
  }
};

/**
 * Get all lessons for a topic
 * @param {number} topicId - Topic ID
 * @returns {Promise<Array>} Array of lessons
 */
export const getLessons = async (topicId) => {
  try {
    if (!topicId) {
      return [];
    }

    const params = new URLSearchParams({
      topic_id: topicId,
    });

    const response = await apiClient.get(`/lessons?${params.toString()}`, {
      skipGlobalLoader: true, // Don't show global loader for filter APIs
    });
    
    // Direct array response
    return response.data || [];
  } catch (err) {
    console.error('Failed to fetch lessons:', err);
    return [];
  }
};
