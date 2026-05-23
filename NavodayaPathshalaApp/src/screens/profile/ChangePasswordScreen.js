/**
 * Change Password Screen
 * Allows user to change their password
 * - Same header and footer structure as AccountSettings
 * - Three password fields: current, new, confirm new
 * - Password visibility toggle with eye icon
 * - Validates passwords match and meet minimum length
 * - Requires current password verification
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/common/AppText';
import apiClient from '../../api/apiClient';
import styles from './editProfileStyles';

const ChangePasswordScreen = ({ navigation }) => {
  // Form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI state
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation function
  const validatePasswords = () => {
    const newErrors = {};

    if (!currentPassword.trim()) {
      newErrors.currentPassword = 'Please enter your current password';
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = 'Please enter your new password';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if user made any changes
  const hasInput = () => {
    return currentPassword.trim() || newPassword.trim() || confirmPassword.trim();
  };

  // Handle password change
  const handleChangePassword = async () => {
    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/change-password', {
        current_password: currentPassword.trim(),
        new_password: newPassword.trim(),
        confirm_password: confirmPassword.trim(),
      });

      if (response.data?.message) {
        // Success
        Alert.alert('Success', 'Password changed successfully', [
          {
            text: 'OK',
            onPress: () => {
              // Clear form and go back
              setCurrentPassword('');
              setNewPassword('');
              setConfirmPassword('');
              setErrors({});
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (err) {
      console.error('Change password error:', err);
      const errorMessage = err.response?.data?.reason || 'Failed to change password. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.screenContainer}>
        {/* Standard Header - Exact same as AccountSettings */}
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require('../../assets/icons/back-arrow.png')}
              style={styles.backArrowIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContent}>
            <AppText style={styles.headerTitle}>Change Password</AppText>
            <AppText style={styles.headerGreeting}>Update your password to keep account secure</AppText>
          </View>
        </View>

        {/* Form Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Form Card - White container with shadow */}
          <View style={styles.formCard}>
            {/* Password Fields Section */}
            <AppText style={styles.sectionTitle}>Password Information</AppText>

            {/* Current Password */}
            <View style={styles.formGroup}>
              <AppText style={styles.label}>Current Password</AppText>
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter your current password"
                  placeholderTextColor="#d1d5db"
                  value={currentPassword}
                  onChangeText={(text) => {
                    setCurrentPassword(text);
                    if (errors.currentPassword) {
                      setErrors({ ...errors, currentPassword: '' });
                    }
                  }}
                  secureTextEntry={!showCurrentPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  activeOpacity={0.7}
                  style={styles.passwordEyeIcon}
                  disabled={isLoading}
                >
                  <Image
                    source={require('../../assets/icons/eye.png')}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
              {errors.currentPassword && <AppText style={styles.errorText}>{errors.currentPassword}</AppText>}
            </View>

            {/* New Password */}
            <View style={styles.formGroup}>
              <AppText style={styles.label}>New Password</AppText>
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter your new password"
                  placeholderTextColor="#d1d5db"
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    if (errors.newPassword) {
                      setErrors({ ...errors, newPassword: '' });
                    }
                  }}
                  secureTextEntry={!showNewPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  activeOpacity={0.7}
                  style={styles.passwordEyeIcon}
                  disabled={isLoading}
                >
                  <Image
                    source={require('../../assets/icons/eye.png')}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
              {errors.newPassword && <AppText style={styles.errorText}>{errors.newPassword}</AppText>}
              <AppText style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                Minimum 6 characters
              </AppText>
            </View>

            {/* Confirm Password */}
            <View style={styles.formGroup}>
              <AppText style={styles.label}>Confirm New Password</AppText>
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Confirm your new password"
                  placeholderTextColor="#d1d5db"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) {
                      setErrors({ ...errors, confirmPassword: '' });
                    }
                  }}
                  secureTextEntry={!showConfirmPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                  style={styles.passwordEyeIcon}
                  disabled={isLoading}
                >
                  <Image
                    source={require('../../assets/icons/eye.png')}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <AppText style={styles.errorText}>{errors.confirmPassword}</AppText>}
            </View>
          </View>
        </ScrollView>

        {/* Action Button - Fixed Footer (Exact same as AccountSettings) */}
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              (isLoading || !hasInput()) && styles.saveButtonDisabled,
            ]}
            onPress={handleChangePassword}
            disabled={isLoading || !hasInput()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4f46e5', '#6366f1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveButtonGradient}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <AppText style={styles.saveButtonText}>Change Password</AppText>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
