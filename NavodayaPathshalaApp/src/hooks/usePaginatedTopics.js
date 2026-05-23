// usePaginatedTopics.js
// Custom hook for managing paginated topics list
import useGenericPaginatedList from './useGenericPaginatedList';
import { getTopicsPaginated } from '../services/topicService';

/**
 * Hook for managing paginated topics with search and infinite scroll
 * @param {number} subjectId - Subject ID
 * @param {string} languageCode - Language code
 * @param {number} pageSize - Items per page (default 10)
 * @returns {Object} - items (topics), loading, loadingMore, error, hasMore, search, onSearch, onLoadMore, onRefresh
 */
const usePaginatedTopics = (subjectId, languageCode, pageSize = 10) => {
  // Create a wrapper that checks subjectId before calling the API
  const apiFunction = (pageNum, searchKey, limit, isLoadingMore) => {
    if (!subjectId) {
      return Promise.resolve({ data: [], meta: { has_more: false } });
    }
    return getTopicsPaginated(subjectId, pageNum, limit, languageCode, searchKey, isLoadingMore);
  };

  // Always call the hook (not conditionally)
  const result = useGenericPaginatedList(apiFunction, [subjectId], pageSize);

  // If no subjectId, return empty state
  if (!subjectId) {
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

export default usePaginatedTopics;
