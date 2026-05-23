// usePaginatedLessons.js
// Custom hook for managing paginated lessons list
import useGenericPaginatedList from './useGenericPaginatedList';
import { getLessonsPaginated } from '../services/lessonService';

/**
 * Hook for managing paginated lessons with search and infinite scroll
 * @param {number} topicId - Topic ID
 * @param {string} languageCode - Language code
 * @param {number} pageSize - Items per page (default 10)
 * @returns {Object} - items (lessons), loading, loadingMore, error, hasMore, search, onSearch, onLoadMore, onRefresh
 */
const usePaginatedLessons = (topicId, languageCode, pageSize = 10) => {
  // Create a wrapper that checks topicId before calling the API
  const apiFunction = (pageNum, searchKey, limit, isLoadingMore) => {
    if (!topicId) {
      return Promise.resolve({ data: [], meta: { has_more: false } });
    }
    return getLessonsPaginated(topicId, pageNum, limit, languageCode, searchKey, isLoadingMore);
  };

  // Always call the hook (not conditionally)
  const result = useGenericPaginatedList(apiFunction, [topicId], pageSize);

  // If no topicId, return empty state
  if (!topicId) {
    return {
      items: [],
      loading: false,
      loadingMore: false,
      error: null,
      hasMore: false,
      search: '',
      onSearch: () => {},
      onLoadMore: () => {},
      onRefresh: () => {},
    };
  }

  return result;
};

export default usePaginatedLessons;
