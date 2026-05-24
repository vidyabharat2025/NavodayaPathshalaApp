// subjectService.js
// API calls for fetching subjects
import apiClient from '../api/apiClient';

/**
 * Fetch subjects using paginated endpoint
 * @param {number} gradeId - Grade ID (required)
 * @param {number} page - Page number (starts from 1)
 * @param {number} limit - Items per page (default 10)
 * @param {string} languageCode - Language code (optional)
 * @param {string} searchKey - Search query (optional)
 * @param {boolean} isLoadingMore - Whether this is a pagination call (skips global loader)
 * @returns {Object} Response with data and meta information
 */
export const getSubjectsPaginated = async (
  gradeId,
  page = 1,
  limit = 10,
  languageCode = 'en',
  searchKey = '',
  isLoadingMore = false
) => {
  const params = new URLSearchParams({
    grade_id: gradeId,
    page,
    limit,
  });

  if (languageCode) {
    params.append('language_code', languageCode);
  }

  if (searchKey) {
    params.append('searchKey', searchKey);
  }

  const response = await apiClient.get(`/subjects/paginated?${params.toString()}`, {
    skipGlobalLoader: isLoadingMore, // Skip global loader for pagination calls
  });
  return response.data;
};

/**
 * Legacy non-paginated endpoint (kept for reference)
 * @deprecated Use getSubjectsPaginated instead
 */
export const getSubjects = async (gradeId, languageCode) => {
  const response = await apiClient.get(
    `/subjects?grade_id=${gradeId}&language_code=${languageCode}`
  );
  return response.data;
};
