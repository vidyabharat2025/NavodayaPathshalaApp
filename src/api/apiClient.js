/**
 * API Client
 * Axios instance with interceptors for requests and responses
 */

import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './apiConstants';
import apiProgress from './apiProgress';
import { getStoredToken, removeStoredToken } from '../services/storageService';
import { showErrorMessage } from '../utils/logger';
import { logApiRequest, logApiResponse, logApiError } from './apiLogger';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request Interceptor
 * - Add auth token
 * - Show global loader
 * - Log request
 */
apiClient.interceptors.request.use(
  async config => {
    // Skip loader for metadata endpoints and pagination calls
    const skipLoader = !config.url?.includes('/meta/') && config.skipGlobalLoader;
    if (!config.url || (!config.url.includes('/meta/') && !skipLoader)) {
      apiProgress.startRequest();
    }

    // Add token if it exists (wait for async)
    const token = await getStoredToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log the request
    logApiRequest(config);

    return config;
  },
  error => {
    apiProgress.endRequest();
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Hide global loader
 * - Handle token refresh on 401
 * - Handle errors globally
 * - Log response and errors
 */
apiClient.interceptors.response.use(
  response => {
    // Skip loader end for metadata endpoints and pagination calls
    if (!response.config.url || (!response.config.url.includes('/meta/') && !response.config.skipGlobalLoader)) {
      apiProgress.endRequest();
    }
    // Log the response
    logApiResponse(response);
    return response;
  },
  async error => {
    // Skip loader end for metadata endpoints and pagination calls
    if (!error.config?.url || (!error.config.url.includes('/meta/') && !error.config.skipGlobalLoader)) {
      apiProgress.endRequest();
    }

    // Log the error
    logApiError(error);

    const { response, config } = error;

    // Handle 401 Unauthorized - Token expired
    if (response?.status === 401) {
      await removeStoredToken();
      // TODO: Navigate to login screen
      // Let the calling function handle the error message
      return Promise.reject(error);
    }

    // Handle 403 Forbidden
    if (response?.status === 403) {
      // Let the calling function handle the error message
      return Promise.reject(error);
    }

    // Handle 404 Not Found
    if (response?.status === 404) {
      // Let the calling function handle the error message
      return Promise.reject(error);
    }

    // Handle 500+ Server errors
    if (response?.status >= 500) {
      // Let the calling function handle the error message
      return Promise.reject(error);
    }

    // Handle network errors
    if (!response) {
      // Let the calling function handle the error message
      return Promise.reject(error);
    }

    // Handle validation errors (typically 422 or 400 with field errors)
    if (response?.status === 422 || response?.status === 400) {
      // Let the calling function handle the error message
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
