/**
 * Authentication Service
 * Handles all authentication API calls
 * NOTE: This service only contains API logic, NO state management
 */

import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../api/apiConstants';
import {
  storeToken,
  storeUserData,
  removeStoredToken,
  removeUserData,
  clearAll,
} from './storageService';
import { createUserResponse, getStorableUserData } from '../models/UserResponse';
import { debug, error, logAPICall } from '../utils/logger';

const TAG = 'AuthService';

/**
 * Login API call
 * @param {string} userName - User email or mobile number
 * @param {string} password - User password
 * @returns {Promise<object>} Login response with token and user data
 */
const login = async (userName, password) => {
  try {
    debug(TAG, 'Attempting login', { userName });

    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      user_name: userName,
      password,
    });

    const { token, user: apiUser } = response.data;

    // Transform snake_case API response to camelCase for consistency
    const user = {
      ...apiUser,
      // Map snake_case to camelCase for internal use
      gradeId: apiUser.grade_id,
      mobileNumber: apiUser.mobile_number,
      schoolName: apiUser.school_name,
    };

    // Store token and user data
    if (token) {
      await storeToken(token);
    }
    if (user) {
      await storeUserData(user);
    }

    logAPICall('POST', API_ENDPOINTS.AUTH.LOGIN, { user_name: userName }, response.data);
    debug(TAG, 'Login successful');

    return {
      token,
      user,
      success: true,
    };
  } catch (err) {
    error(TAG, 'Login failed', err);
    throw err;
  }
};

/**
 * Register API call
 * @param {object} userData - User registration data
 * @returns {Promise<object>} Registration response
 */
const register = async userData => {
  try {
    debug(TAG, 'Attempting registration');

    const response = await apiClient.post(API_ENDPOINTS.SIGNUP, userData);

    // API returns user data directly (no token in signup response)
    const apiUser = response.data;

    // Transform snake_case API response to camelCase for consistency
    const user = {
      ...apiUser,
      // Map snake_case to camelCase for internal use
      gradeId: apiUser.grade_id,
      mobileNumber: apiUser.mobile_number,
      schoolName: apiUser.school_name,
    };

    // Store user data (no token in signup response)
    if (user) {
      await storeUserData(user);
    }

    logAPICall('POST', API_ENDPOINTS.SIGNUP, userData, response.data);
    debug(TAG, 'Registration successful');

    return {
      user,
      success: true,
    };
  } catch (err) {
    error(TAG, 'Registration failed', err);
    throw err;
  }
};

/**
 * Logout API call
 * @returns {Promise<void>}
 */
const logout = async () => {
  try {
    debug(TAG, 'Attempting logout');

    // Call logout endpoint
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (apiErr) {
      debug(TAG, 'Logout API call failed, clearing local data anyway', apiErr);
    }

    // Clear ALL stored data
    await clearAll();

    debug(TAG, 'Logout successful - all data cleared');
  } catch (err) {
    error(TAG, 'Logout error', err);
    throw err;
  }
};

/**
 * Refresh authentication token
 * @returns {Promise<object>} New token response
 */
const refreshToken = async () => {
  try {
    debug(TAG, 'Attempting token refresh');

    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);

    const { data } = response;

    if (data.token) {
      await storeToken(data.token);
    }

    logAPICall('POST', API_ENDPOINTS.AUTH.REFRESH_TOKEN, null, data);
    debug(TAG, 'Token refresh successful');

    return data;
  } catch (err) {
    error(TAG, 'Token refresh failed', err);
    throw err;
  }
};

/**
 * Forgot password API call
 * @param {string} email - User email
 * @returns {Promise<object>} Response
 */
const forgotPassword = async email => {
  try {
    debug(TAG, 'Attempting forgot password', { email });

    const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });

    logAPICall('POST', API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }, response.data);
    debug(TAG, 'Forgot password request sent');

    return response.data;
  } catch (err) {
    error(TAG, 'Forgot password failed', err);
    throw err;
  }
};

/**
 * Reset password API call
 * @param {string} token - Reset token
 * @param {string} newPassword - New password
 * @returns {Promise<object>} Response
 */
const resetPassword = async (token, newPassword) => {
  try {
    debug(TAG, 'Attempting password reset');

    const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    });

    logAPICall('POST', API_ENDPOINTS.AUTH.RESET_PASSWORD, { token }, response.data);
    debug(TAG, 'Password reset successful');

    return response.data;
  } catch (err) {
    error(TAG, 'Password reset failed', err);
    throw err;
  }
};

/**
 * Get user profile
 * @returns {Promise<object>} User profile data
 */
const getUserProfile = async () => {
  try {
    debug(TAG, 'Fetching user profile');

    const response = await apiClient.get(API_ENDPOINTS.USER.GET_PROFILE);

    logAPICall('GET', API_ENDPOINTS.USER.GET_PROFILE, null, response.data);
    debug(TAG, 'User profile fetched');

    return response.data;
  } catch (err) {
    error(TAG, 'Failed to fetch user profile', err);
    throw err;
  }
};

export {
  login,
  register,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getUserProfile,
};
