/**
 * Storage Service
 * AsyncStorage wrapper for consistent data persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { debug, error } from '../utils/logger';

const TAG = 'StorageService';

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  USER_PREFERENCES: 'user_preferences',
  LAST_LOGIN: 'last_login',
  THEME: 'theme',
  LANGUAGE: 'language',
};

/**
 * Store item in AsyncStorage
 */
const storeItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    debug(TAG, `Stored item: ${key}`);
  } catch (err) {
    error(TAG, `Failed to store item: ${key}`, err);
    throw err;
  }
};

/**
 * Retrieve item from AsyncStorage
 */
const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      debug(TAG, `Retrieved item: ${key}`);
      return JSON.parse(value);
    }
    return null;
  } catch (err) {
    error(TAG, `Failed to retrieve item: ${key}`, err);
    throw err;
  }
};

/**
 * Remove item from AsyncStorage
 */
const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
    debug(TAG, `Removed item: ${key}`);
  } catch (err) {
    error(TAG, `Failed to remove item: ${key}`, err);
    throw err;
  }
};

/**
 * Clear all AsyncStorage
 */
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    debug(TAG, 'Cleared all storage');
  } catch (err) {
    error(TAG, 'Failed to clear storage', err);
    throw err;
  }
};

/**
 * Store authentication token
 */
const storeToken = async token => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    debug(TAG, `Stored token`);
  } catch (err) {
    error(TAG, `Failed to store token`, err);
    throw err;
  }
};

/**
 * Get stored authentication token
 */
const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return token;
  } catch (err) {
    error(TAG, 'Failed to get token', err);
    return null;
  }
};

/**
 * Remove authentication token
 */
const removeStoredToken = async () => {
  return removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Store user data
 */
const storeUserData = async userData => {
  return storeItem(STORAGE_KEYS.USER_DATA, userData);
};

/**
 * Get stored user data
 */
const getStoredUserData = async () => {
  return getItem(STORAGE_KEYS.USER_DATA);
};

/**
 * Remove user data
 */
const removeUserData = async () => {
  return removeItem(STORAGE_KEYS.USER_DATA);
};

/**
 * Store user preferences
 */
const storeUserPreferences = async preferences => {
  return storeItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

/**
 * Get user preferences
 */
const getUserPreferences = async () => {
  return getItem(STORAGE_KEYS.USER_PREFERENCES);
};

export {
  storeItem,
  getItem,
  removeItem,
  clearAll,
  storeToken,
  getStoredToken,
  removeStoredToken,
  storeUserData,
  getStoredUserData,
  removeUserData,
  storeUserPreferences,
  getUserPreferences,
  STORAGE_KEYS,
};
