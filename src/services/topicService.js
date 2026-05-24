// topicService.js
import apiClient from '../api/apiClient';

/**
 * Fetch topics using paginated endpoint
 * @param {number} subjectId - Subject ID (required)
 * @param {number} page - Page number (starts from 1)
 * @param {number} limit - Items per page (default 10)
 * @param {string} languageCode - Language code (optional)
 * @param {string} searchKey - Search query (optional)
 * @param {boolean} isLoadingMore - Whether this is a pagination call (skips global loader)
 * @returns {Object} Response with data and meta information
 */
export const getTopicsPaginated = async (
  subjectId,
  page = 1,
  limit = 10,
  languageCode = 'en',
  searchKey = '',
  isLoadingMore = false
) => {
  const params = new URLSearchParams({
    subject_id: subjectId,
    page,
    limit,
  });

  if (languageCode) {
    params.append('language_code', languageCode);
  }

  if (searchKey) {
    params.append('searchKey', searchKey);
  }

  const response = await apiClient.get(`/topics/paginated?${params.toString()}`, {
    skipGlobalLoader: isLoadingMore, // Skip global loader for pagination calls
  });
  return response.data;
};

/**
 * Legacy non-paginated endpoint (kept for reference)
 * @deprecated Use getTopicsPaginated instead
 */
export const getTopics = async (subjectId, languageCode) => {
  const response = await apiClient.get(`/topics?subject_id=${subjectId}&language_code=${languageCode}`);
  return response.data;
};
