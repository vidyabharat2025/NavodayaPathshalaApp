// useGenericPaginatedList.js
// Reusable hook for managing paginated lists with search, infinite scroll, and pull-to-refresh
import { useEffect, useState, useCallback, useRef } from 'react';

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
 * Generic hook for managing paginated lists with search and infinite scroll
 * @param {Function} apiFunction - Async function that fetches paginated data
 * @param {Array} dependencies - Dependencies for re-initialization (e.g., [id, type])
 * @param {number} pageSize - Items per page (default 10)
 * @returns {Object} - items, loading, loadingMore, error, hasMore, search, onSearch, onLoadMore, onRefresh
 */
const useGenericPaginatedList = (apiFunction, dependencies = [], pageSize = 10) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');

  /**
   * Fetch items from API
   * @param {number} pageNum - Page number to fetch
   * @param {string} query - Search query
   * @param {boolean} isLoadMore - Whether this is a load more request (pagination)
   */
  const fetchItems = useCallback(
    async (pageNum, query = '', isLoadMore = false) => {
      try {
        isLoadMore ? setLoadingMore(true) : setLoading(true);
        setError(null);

        // Call the API function with all parameters
        const response = await apiFunction(pageNum, query, pageSize, isLoadMore);

        if (!response.data) {
          throw new Error('No data in response');
        }

        if (isLoadMore) {
          // Append to existing list for pagination
          setItems(prev => [...prev, ...response.data]);
        } else {
          // Replace list for initial load or search
          setItems(response.data);
        }

        // Update pagination metadata
        if (response.meta) {
          setHasMore(response.meta.has_more || false);
        }
        setPage(pageNum);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError(err.message || 'Failed to load items');
      } finally {
        isLoadMore ? setLoadingMore(false) : setLoading(false);
      }
    },
    [apiFunction, pageSize]
  );

  /**
   * Initial load - fetch first page when dependencies change
   */
  useEffect(() => {
    fetchItems(1, search, false);
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Debounced API call for search
   */
  const debouncedSearch = useDebounce((query) => {
    // Reset to page 1 and clear existing items when searching
    fetchItems(1, query, false);
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
    fetchItems(nextPage, search, true);
  }, [page, search, loadingMore, hasMore, loading, fetchItems]);

  /**
   * Pull-to-refresh handler
   */
  const onRefresh = useCallback(() => {
    setSearch('');
    fetchItems(1, '', false);
  }, [fetchItems]);

  return {
    items,
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

export default useGenericPaginatedList;
