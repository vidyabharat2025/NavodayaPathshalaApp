/**
 * Metadata Service
 * Fetches and caches metadata for signup dropdowns (grades, boards, states, districts, languages)
 */

import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../api/apiConstants';
import { debug, error } from '../utils/logger';

const TAG = 'MetadataService';

// In-memory cache
const cache = {
  grades: null,
  boards: null,
  states: null,
  districts: {}, // by stateId
  languages: null,
};

/**
 * Get all grades
 * @returns {Promise<Array>}
 */
const getGrades = async () => {
  try {
    if (cache.grades) {
      debug(TAG, 'Using cached grades');
      console.log('🎓 Cached Grades:', cache.grades);
      return cache.grades;
    }

    debug(TAG, 'Fetching grades from API');
    const response = await apiClient.get(API_ENDPOINTS.META.GRADES);
    cache.grades = response.data || [];
    console.log('🎓 Fetched Grades:', cache.grades);
    
    return cache.grades;
  } catch (err) {
    error(TAG, 'Failed to fetch grades', err);
    console.log('❌ Grade Error:', err.message);
    return [];
  }
};

/**
 * Get all boards
 * @returns {Promise<Array>}
 */
const getBoards = async () => {
  try {
    if (cache.boards) {
      debug(TAG, 'Using cached boards');
      return cache.boards;
    }

    debug(TAG, 'Fetching boards from API');
    const response = await apiClient.get(API_ENDPOINTS.META.BOARDS);
    cache.boards = response.data || [];
    
    return cache.boards;
  } catch (err) {
    error(TAG, 'Failed to fetch boards', err);
    return [];
  }
};

/**
 * Get all states
 * @returns {Promise<Array>}
 */
const getStates = async () => {
  try {
    if (cache.states) {
      debug(TAG, 'Using cached states');
      console.log('🏛️ Cached States:', cache.states.length, 'states');
      return cache.states;
    }

    debug(TAG, 'Fetching states from API');
    const response = await apiClient.get(API_ENDPOINTS.META.STATES);
    cache.states = response.data || [];
    console.log('🏛️ Fetched States:', cache.states.length, 'states', cache.states);
    
    return cache.states;
  } catch (err) {
    error(TAG, 'Failed to fetch states', err);
    console.log('❌ States Error:', err.message);
    return [];
  }
};

/**
 * Get districts for a specific state
 * @param {number} stateId - State ID
 * @returns {Promise<Array>}
 */
const getDistricts = async (stateId) => {
  try {
    if (!stateId) {
      return [];
    }

    if (cache.districts[stateId]) {
      debug(TAG, `Using cached districts for state ${stateId}`);
      return cache.districts[stateId];
    }

    debug(TAG, `Fetching districts for state ${stateId}`);
    const endpoint = `${API_ENDPOINTS.META.DISTRICTS}/${stateId}`;
    const response = await apiClient.get(endpoint);
    cache.districts[stateId] = response.data || [];
    
    return cache.districts[stateId];
  } catch (err) {
    error(TAG, `Failed to fetch districts for state ${stateId}`, err);
    return [];
  }
};

/**
 * Get all languages
 * @returns {Promise<Array>}
 */
const getLanguages = async () => {
  try {
    if (cache.languages) {
      debug(TAG, 'Using cached languages');
      return cache.languages;
    }

    debug(TAG, 'Fetching languages from API');
    const response = await apiClient.get(API_ENDPOINTS.META.LANGUAGES);
    cache.languages = response.data || [];
    
    return cache.languages;
  } catch (err) {
    error(TAG, 'Failed to fetch languages', err);
    return [];
  }
};

/**
 * Clear all caches
 */
const clearCache = () => {
  cache.grades = null;
  cache.boards = null;
  cache.states = null;
  cache.districts = {};
  cache.languages = null;
  debug(TAG, 'Cache cleared');
};

export {
  getGrades,
  getBoards,
  getStates,
  getDistricts,
  getLanguages,
  clearCache,
};
