/**
 * Profile Screen ViewModel
 * MVVM Pattern: Contains business logic for Profile Screen
 */

import { useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAppContext } from '../../store/AppContext';
import apiClient from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/apiConstants';

/**
 * ProfileViewModel Hook
 * Manages Profile Screen logic
 */
const ProfileViewModel = () => {
  // Get app context for authentication
  const { signOut, user } = useAppContext();
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch user profile from /me endpoint
   */
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get(API_ENDPOINTS.USER.ME);
      const userData = response.data;
      
      setProfileData(userData);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError(err.message);
      // Fallback to context user if API fails
      if (user) {
        setProfileData(user);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Fetch profile on component mount
   */
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /**
   * Handle logout
   */
  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await signOut();
            // Navigation will be handled by RootNavigator based on isSignedIn state
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }, [signOut]);

  /**
   * Handle notifications toggle
   */
  const handleNotificationsToggle = useCallback((value) => {
    setNotificationsEnabled(value);
    // TODO: Save notification preference to API
  }, []);

  /**
   * Handle edit profile
   */
  const handleEditProfile = useCallback(() => {
    // TODO: Navigate to edit profile screen
    console.log('Edit profile pressed');
  }, []);

  /**
   * Handle language change
   */
  const handleLanguageChange = useCallback(() => {
    // TODO: Navigate to language selection screen
    console.log('Change language pressed');
  }, []);

  /**
   * Handle help & support
   */
  const handleHelpSupport = useCallback(() => {
    // TODO: Navigate to help & support screen
    console.log('Help & support pressed');
  }, []);

  /**
   * Handle privacy policy
   */
  const handlePrivacyPolicy = useCallback(() => {
    // TODO: Open privacy policy in webview or browser
    console.log('Privacy policy pressed');
  }, []);

  return {
    profileData,
    loading,
    error,
    notificationsEnabled,
    handleNotificationsToggle,
    handleEditProfile,
    handleLanguageChange,
    handleHelpSupport,
    handlePrivacyPolicy,
    handleLogout,
  };
};

export default ProfileViewModel;
