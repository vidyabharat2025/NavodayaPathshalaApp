// lessonService.js
import apiClient from '../api/apiClient';

/**
 * Fetch lessons using paginated endpoint
 * @param {number} topicId - Topic ID (required)
 * @param {number} page - Page number (starts from 1)
 * @param {number} limit - Items per page (default 10)
 * @param {string} languageCode - Language code (optional)
 * @param {string} searchKey - Search query (optional)
 * @param {boolean} isLoadingMore - Whether this is a pagination call (skips global loader)
 * @returns {Object} Response with data and meta information
 */
export const getLessonsPaginated = async (
  topicId,
  page = 1,
  limit = 10,
  languageCode = 'en',
  searchKey = '',
  isLoadingMore = false
) => {
  const params = new URLSearchParams({
    topic_id: topicId,
    page,
    limit,
  });

  if (languageCode) {
    params.append('language_code', languageCode);
  }

  if (searchKey) {
    params.append('searchKey', searchKey);
  }

  const response = await apiClient.get(`/lessons/paginated?${params.toString()}`, {
    skipGlobalLoader: isLoadingMore, // Skip global loader for pagination calls
  });
  return response.data;
};

/**
 * Legacy non-paginated endpoint (kept for reference)
 * @deprecated Use getLessonsPaginated instead
 */
export const getLessons = async (topicId, languageCode = 'en') => {
  const response = await apiClient.get(`/lessons?topic_id=${topicId}&language_code=${languageCode}`);
  return response.data;
};

/**
 * Start a lesson (call when user opens lesson)
 * @param {number} lessonId - Lesson ID
 */
export const startLesson = async (lessonId) => {
  try {
    const response = await apiClient.post(`/lessons/${lessonId}/start`, {});
    return response.data;
  } catch (error) {
    // Silent error - no error handling as per requirements
    console.log('[lessonService] startLesson error:', error.message);
  }
};
