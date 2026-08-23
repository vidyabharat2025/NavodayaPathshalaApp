/**
 * Login ViewModel
 * Business logic for login screen
 * Handles validation, API calls, and state management
 * MVVM Pattern: ViewModel separates business logic from UI
 */

import { useState, useCallback } from 'react';
import { login } from '../../services/authService';
import { validateEmailOrMobile, validateRequired } from '../../utils/validators';

const LoginViewModel = () => {
  // State - Prefilled with test credentials for faster transit (will revert later)
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Validate individual field
   * @param {string} fieldName - Field to validate (userName or password)
   * @param {string} value - Field value
   */
  const validateField = useCallback((fieldName, value) => {
    const newErrors = { ...errors };

    if (fieldName === 'userName') {
      if (!validateRequired(value)) {
        newErrors.userName = 'Email or mobile number is required';
      } else if (!validateEmailOrMobile(value)) {
        newErrors.userName = 'Please enter a valid email or Indian mobile number';
      } else {
        delete newErrors.userName;
      }
    } else if (fieldName === 'password') {
      if (!validateRequired(value)) {
        newErrors.password = 'Password is required';
      } else if (value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  }, [errors]);

  /**
   * Validate form inputs before submission
   * @returns {boolean} True if valid
   */
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Validate userName (email or mobile)
    if (!validateRequired(userName)) {
      newErrors.userName = 'Email or mobile number is required';
    } else if (!validateEmailOrMobile(userName)) {
      newErrors.userName = 'Please enter a valid email or Indian mobile number';
    }

    // Validate password
    if (!validateRequired(password)) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [userName, password]);

  /**
   * Handle userName change with real-time validation
   */
  const handleUserNameChange = useCallback((text) => {
    setUserName(text);
    validateField('userName', text);
  }, [validateField]);

  /**
   * Handle password change with real-time validation
   */
  const handlePasswordChange = useCallback((text) => {
    setPassword(text);
    validateField('password', text);
  }, [validateField]);

  /**
   * Handle login
   * @returns {Promise<object>} Login response
   */
  const handleLogin = useCallback(async () => {
    // Validate form
    if (!validateForm()) {
      return null;
    }

    setIsLoading(true);

    try {
      // Call login API with userName (can be email or mobile)
      const response = await login(userName, password);

      // Login successful
      return response;
    } catch (error) {
      // Extract error message from API response
      let errorMessage = 'Login failed. Please try again.';

      // Handle API error response format: { error: true, reason: "..." }
      if (error?.response?.data?.reason) {
        errorMessage = error.response.data.reason;
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error && typeof error.response.data.error === 'string') {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      // Return error object to be displayed as single Alert in LoginScreen
      return { error: true, errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [userName, password, validateForm]);

  /**
   * Clear form
   */
  const clearForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setErrors({});
    setShowPassword(false);
  }, []);

  /**
   * Toggle password visibility
   */
  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  // Return public interface (actions and state)
  return {
    // State
    userName,
    password,
    isLoading,
    errors,
    showPassword,

    // Actions
    setUserName: handleUserNameChange,
    setPassword: handlePasswordChange,
    setErrors,
    handleLogin,
    clearForm,
    toggleShowPassword,
    validateForm,
  };
};

export default LoginViewModel;
