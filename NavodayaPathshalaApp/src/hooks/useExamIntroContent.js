/**
 * useExamIntroContent Hook
 * Fetches and manages exam intro content from API
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/apiClient';

const useExamIntroContent = (examCode = 'JNVST', examYear = 2025) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get('/meta/exam-intro-content', {
        params: {
          exam_code: examCode,
          exam_year: examYear,
        },
        skipGlobalLoader: true,
      });

      if (!response.data || !response.data.content) {
        throw new Error('Invalid response format');
      }

      // Parse the stringified JSON content
      const parsedContent = typeof response.data.content === 'string'
        ? JSON.parse(response.data.content)
        : response.data.content;

      setData({
        ...parsedContent,
        meta: response.data.meta || {},
      });

      // Set default language
      if (response.data.meta?.defaultLanguage) {
        setLanguage(response.data.meta.defaultLanguage.toLowerCase());
      }
    } catch (err) {
      console.error('Failed to fetch exam intro content:', err);
      setError(err.message || 'Failed to load exam introduction');
    } finally {
      setLoading(false);
    }
  }, [examCode, examYear]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  }, []);

  return {
    data,
    loading,
    error,
    language,
    toggleLanguage,
    refetch: fetchContent,
  };
};

export default useExamIntroContent;
