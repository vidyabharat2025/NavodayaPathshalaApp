/**
 * App Context
 * Global state management using Context API
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredToken,
  getStoredUserData,
} from '../services/storageService';
import { logout as logoutAuthService } from '../services/authService';

// Create context
const AppContext = createContext();

/**
 * App Context Provider
 * Provides global app state (auth, user, theme, etc.)
 */
export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    isSignedIn: false,
    userToken: null,
    user: null,
    theme: 'light',
    language: 'en',
    greeting: {
      title: null,
      subtitle: null,
    },
  });

  // Initialize app state on mount
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // Restore token and user data from storage
        const token = await getStoredToken();
        const userData = await getStoredUserData();

        // Transform snake_case to camelCase if needed (for backward compatibility)
        let normalizedUser = userData;
        if (userData && !userData.gradeId && userData.grade_id) {
          normalizedUser = {
            ...userData,
            gradeId: userData.grade_id,
            mobileNumber: userData.mobile_number,
            schoolName: userData.school_name,
          };
        }

        setState(prevState => ({
          ...prevState,
          isLoading: false,
          isSignedIn: !!token,
          userToken: token,
          user: normalizedUser,
        }));
      } catch (err) {
        console.error('Failed to restore session:', err);
        setState(prevState => ({
          ...prevState,
          isLoading: false,
        }));
      }
    };

    bootstrapAsync();
  }, []);

  // Auth actions
  const authContext = {
    state,

    // Set user signed in state
    signIn: (token, userData) => {
      setState(prevState => ({
        ...prevState,
        isSignedIn: true,
        userToken: token,
        user: userData,
      }));
    },

    // Set user signed out state
    signOut: async () => {
      try {
        // Call logout service to clear stored data
        await logoutAuthService();
      } catch (err) {
        console.error('Logout error:', err);
      }
      // Update context state
      setState(prevState => ({
        ...prevState,
        isSignedIn: false,
        userToken: null,
        user: null,
      }));
    },

    // Update user data
    updateUser: userData => {
      setState(prevState => ({
        ...prevState,
        user: { ...prevState.user, ...userData },
      }));
    },

    // Set theme
    setTheme: theme => {
      setState(prevState => ({
        ...prevState,
        theme,
      }));
    },

    // Set language
    setLanguage: language => {
      setState(prevState => ({
        ...prevState,
        language,
      }));
    },

    // Set greeting (from home API)
    setGreeting: (title, subtitle) => {
      setState(prevState => ({
        ...prevState,
        greeting: {
          title: title || null,
          subtitle: subtitle || null,
        },
      }));
    },
  };

  return (
    <AppContext.Provider value={authContext}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to use App Context
 */
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }

  return context;
};
