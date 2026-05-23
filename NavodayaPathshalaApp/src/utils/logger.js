/**
 * Logger Utility
 * Centralized logging and error handling
 */

import { Alert } from 'react-native';

const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

/**
 * Get current log level (can be changed based on environment)
 */
const getCurrentLogLevel = () => {
  // In production, you might want to set a higher log level
  return LOG_LEVEL.DEBUG;
};

/**
 * Log a message with specified level
 */
const logMessage = (level, tag, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] [${tag}] ${message}`;

  if (__DEV__) {
    console.log(logEntry);
    if (data) {
      console.log(data);
    }
  }
};

/**
 * Debug logging
 */
const debug = (tag, message, data) => {
  logMessage(LOG_LEVEL.DEBUG, tag, message, data);
};

/**
 * Info logging
 */
const info = (tag, message, data) => {
  logMessage(LOG_LEVEL.INFO, tag, message, data);
};

/**
 * Warning logging
 */
const warn = (tag, message, data) => {
  logMessage(LOG_LEVEL.WARN, tag, message, data);
};

/**
 * Error logging
 */
const error = (tag, message, errorObj) => {
  logMessage(LOG_LEVEL.ERROR, tag, message, errorObj);
};

/**
 * Show error message to user
 */
const showErrorMessage = (message, title = 'Error') => {
  if (__DEV__) {
    console.error(message);
  }

  Alert.alert(title, message, [{ text: 'OK' }]);
};

/**
 * Show success message to user
 */
const showSuccessMessage = (message, title = 'Success') => {
  if (__DEV__) {
    console.log(message);
  }

  Alert.alert(title, message, [{ text: 'OK' }]);
};

/**
 * Show warning message to user
 */
const showWarningMessage = (message, title = 'Warning') => {
  Alert.alert(title, message, [{ text: 'OK' }]);
};

/**
 * Log API calls for debugging
 */
const logAPICall = (method, url, data = null, response = null) => {
  if (__DEV__) {
    const logData = {
      method,
      url,
      requestData: data,
      response,
      timestamp: new Date().toISOString(),
    };
    console.log('API Call:', logData);
  }
};

export {
  debug,
  info,
  warn,
  error,
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
  logAPICall,
};
