/**
 * Legal Content Service
 * Handles fetching Privacy Policy and Terms & Conditions from backend
 */

import apiClient from '../api/apiClient';

const TAG = 'LegalContentService';

/**
 * Fetch legal content (privacy policy or terms)
 * @param {string} type - Type of content: 'privacy-policy' or 'terms'
 * @param {string} languageCode - Language code (e.g., 'en')
 * @returns {Promise<object>} Legal content with title, last_updated, and content_html
 */
const fetchLegalContent = async (type, languageCode = 'en') => {
  try {
    if (!type || !['privacy-policy', 'terms'].includes(type)) {
      throw new Error('Invalid legal content type');
    }

    // Map type to endpoint
    const endpoint =
      type === 'privacy-policy' ? '/legal/privacy-policy' : '/legal/terms';

    // Fetch with language code
    const response = await apiClient.get(endpoint, {
      params: {
        language_code: languageCode,
      },
    });

    return response.data;
  } catch (err) {
    console.error(`[${TAG}] Failed to fetch legal content (${type}):`, err.message);
    throw err;
  }
};

export { fetchLegalContent };
