// usePaginatedSubjects.js
// Custom hook for managing paginated subject list with search and infinite scroll
import { useEffect, useState, useCallback, useRef } from 'react';
import { getSubjectsPaginated } from '../services/subjectService';

/**
 * Debounce hook implementation
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 */
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

/**
 * Temporary hardcoded data for missing API fields
 * These will be replaced with actual API data once the backend is updated
 */
const TEMPORARY_DATA = {
  colors: ['#2563EB', '#A259FF', '#F59E0B', '#EC4899', '#06B6D4', '#10B981'],
  progressPercentages: [45, 10, 80, 0, 25, 90],
  topicsCount: [12, 8, 15, 5, 10, 6],
  currentTopics: [
    'Geometry basics',
    'Solar System',
    'Ancient Rome',
    'Colors & Shapes',
    'Grammar',
    'Photosynthesis',
  ],
  dueCount: [1, 0, 0, 0, 0, 0],
};

/**
 * Enrich API subject data with temporary hardcoded values
 * Until the backend provides: progressPercentage, totalTopics, dueCount, color, currentTopic
 */
const enrichSubjectData = (subjects) => {
  return subjects.map((subject, index) => ({
    ...subject,
    progressPercentage: TEMPORARY_DATA.progressPercentages[index % TEMPORARY_DATA.progressPercentages.length],
    totalTopics: TEMPORARY_DATA.topicsCount[index % TEMPORARY_DATA.topicsCount.length],
    currentTopic: TEMPORARY_DATA.currentTopics[index % TEMPORARY_DATA.currentTopics.length],
    dueCount: TEMPORARY_DATA.dueCount[index % TEMPORARY_DATA.dueCount.length],
    color: TEMPORARY_DATA.colors[index % TEMPORARY_DATA.colors.length],
  }));
};

/**
 * Hook for managing paginated subjects with search and infinite scroll
 * @param {number} gradeId - Grade ID
 * @param {string} languageCode - Language code
 * @param {number} pageSize - Items per page (default 10)
 * @returns {Object} - subjects, loading, loadingMore, error, hasMore, search, onSearch, onLoadMore, onRefresh
 */
const usePaginatedSubjects = (gradeId, languageCode = 'en', pageSize = 10) => {
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');

  /**
   * Fetch subjects from API
   * @param {number} pageNum - Page number to fetch
   * @param {string} query - Search query
   * @param {boolean} isLoadMore - Whether this is a load more request (pagination)
   */
  const fetchSubjects = useCallback(
    async (pageNum, query = '', isLoadMore = false) => {
      try {
        isLoadMore ? setLoadingMore(true) : setLoading(true);
        setError(null);

        const response = await getSubjectsPaginated(
          gradeId,
          pageNum,
          pageSize,
          languageCode,
          query,
          isLoadMore // Pass flag to skip global loader for pagination
        );

        const enrichedSubjects = enrichSubjectData(response.data);

        if (isLoadMore) {
          // Append to existing list for pagination
          setSubjects(prev => [...prev, ...enrichedSubjects]);
        } else {
          // Replace list for initial load or search
          setSubjects(enrichedSubjects);
        }

        // Update pagination metadata
        setHasMore(response.meta.has_more);
        setPage(pageNum);
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setError(err.message || 'Failed to load subjects');
      } finally {
        isLoadMore ? setLoadingMore(false) : setLoading(false);
      }
    },
    [gradeId, pageSize, languageCode]
  );

  /**
   * Initial load - fetch first page
   */
  useEffect(() => {
    fetchSubjects(1, search, false);
  }, [gradeId, languageCode]); // Only depend on these, search is handled separately

  /**
   * Debounced API call for search
   */
  const debouncedSearch = useDebounce((query) => {
    // Reset to page 1 and clear existing subjects when searching
    fetchSubjects(1, query, false);
  }, 300);

  /**
   * Handle search input change
   * Updates state immediately, debounces API call
   */
  const handleSearch = useCallback(
    (query) => {
      setSearch(query);
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  /**
   * Load next page for infinite scroll
   */
  const onLoadMore = useCallback(() => {
    // Prevent multiple calls
    if (loadingMore || !hasMore || loading) {
      return;
    }

    const nextPage = page + 1;
    fetchSubjects(nextPage, search, true);
  }, [page, search, loadingMore, hasMore, loading, fetchSubjects]);

  /**
   * Pull-to-refresh handler
   */
  const onRefresh = useCallback(() => {
    setSearch('');
    fetchSubjects(1, '', false);
  }, [fetchSubjects]);

  return {
    subjects,
    loading,
    loadingMore,
    error,
    hasMore,
    search,
    onSearch: handleSearch,
    onLoadMore,
    onRefresh,
  };
};

export default usePaginatedSubjects;
