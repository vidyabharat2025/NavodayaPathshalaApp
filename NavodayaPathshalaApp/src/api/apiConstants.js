/**
 * API Constants
 * Centralized API endpoints and configuration
 */

// For iOS simulator: use localhost or 10.0.2.2
// For physical device: use your actual IP address (192.168.1.32)
// const API_BASE_URL = 'http://192.168.1.51:8080'; // Change this to your actual API base URL
// const API_BASE_URL = 'https://navodaya-backend-sez5.onrender.com'; // Change this to your actual API base URL
const API_TIMEOUT = 60000; // 60 seconds
const API_BASE_URL = 'https://mental-meta-vidyabharat-6f47efdb.koyeb.app'; // Change this to your actual API base URL

/**
 * API Endpoints
 */
const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Sign up endpoint (alias for register)
  SIGNUP: '/auth/signup',

  // User endpoints
  USER: {
    ME: '/me',
    GET_PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
  },

  // Metadata endpoints (for dropdowns in signup)
  META: {
    GRADES: '/meta/grades',
    BOARDS: '/meta/boards',
    STATES: '/meta/states',
    DISTRICTS: '/meta/districts', // append stateId: /meta/districts/:stateId
    LANGUAGES: '/meta/languages',
  },

  // School management endpoints
  SCHOOL: {
    GET_SCHOOLS: '/schools',
    GET_SCHOOL_DETAILS: '/schools/:id',
    CREATE_SCHOOL: '/schools',
    UPDATE_SCHOOL: '/schools/:id',
    DELETE_SCHOOL: '/schools/:id',
  },

  // Student management endpoints
  STUDENT: {
    GET_STUDENTS: '/students',
    GET_STUDENT_DETAILS: '/students/:id',
    CREATE_STUDENT: '/students',
    UPDATE_STUDENT: '/students/:id',
    DELETE_STUDENT: '/students/:id',
  },

  // Class management endpoints
  CLASS: {
    GET_CLASSES: '/classes',
    GET_CLASS_DETAILS: '/classes/:id',
    CREATE_CLASS: '/classes',
    UPDATE_CLASS: '/classes/:id',
    DELETE_CLASS: '/classes/:id',
  },

  // Test Engine endpoints
  TEST: {
    GET_TESTS: '/tests',
    GET_TEST_DETAILS: '/tests/:id',
    START_ATTEMPT: '/tests/:test_id/attempt/start',
    GET_LATEST_ATTEMPT: '/tests/:test_id/attempt/latest',
  },

  // Test Attempt endpoints
  ATTEMPT: {
    SAVE_ANSWER: '/attempts/:attempt_id/answers',
    SUBMIT_TEST: '/attempts/:attempt_id/submit',
  },
};

export { API_BASE_URL, API_TIMEOUT, API_ENDPOINTS };
