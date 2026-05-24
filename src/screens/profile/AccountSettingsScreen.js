/**
 * Account Settings Screen
 * Allows user to update email and mobile number
 * - Uses exact same header and footer structure as EditProfile
 * - Only shows email and mobile fields in editable mode
 * - Same validations as EditProfile
 * - Requires password verification before updating
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/common/AppText';
import { useAppContext } from '../../store/AppContext';
import { fetchUserProfile, updateUserProfile } from '../../services/userProfileService';
import { storeUserData } from '../../services/storageService';
import apiClient from '../../api/apiClient';
import styles from './editProfileStyles';

const AccountSettingsScreen = ({ navigation }) => {
  const { user, updateUser, signOut } = useAppContext();

  // Form state
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [originalMobileNumber, setOriginalMobileNumber] = useState('');

  // Password verification state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordModalMode, setPasswordModalMode] = useState('update'); // 'update' or 'delete'

  // Delete account state
  const [showDeleteReasonModal, setShowDeleteReasonModal] = useState(false);
  const [selectedDeleteReason, setSelectedDeleteReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Delete reasons
  const deleteReasons = [
    'Not using the app anymore',
    'Found a better alternative',
    'Privacy concerns',
    'Technical issues',
    'Other reason',
  ];

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const profile = await fetchUserProfile();
      const emailValue = profile?.email || '';
      const mobileValue = profile?.mobile_number || '';
      setEmail(emailValue);
      setMobileNumber(mobileValue);
      setOriginalEmail(emailValue);
      setOriginalMobileNumber(mobileValue);
    } catch (err) {
      console.error('Failed to load profile:', err.message);
      Alert.alert('Error', 'Failed to load account settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Validation functions (same as EditProfile)
  const isValidEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const isValidPhoneNumber = (phone) => {
    // Extract only digits from the phone number
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it has exactly 10 digits
    return digitsOnly.length === 10;
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation if provided
    if (email.trim() && !isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Mobile validation if provided
    if (mobileNumber.trim() && !isValidPhoneNumber(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    // At least one of email or mobile is mandatory
    if (!email.trim() && !mobileNumber.trim()) {
      newErrors.emailOrMobile = 'Please provide either an email address or mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if user made any changes
  const hasChanges = () => {
    return email !== originalEmail || mobileNumber !== originalMobileNumber;
  };

  // Verify password
  const verifyPassword = async () => {
    if (!password.trim()) {
      setPasswordError('Please enter your password');
      return;
    }

    setIsVerifyingPassword(true);
    setPasswordError('');
    try {
      const response = await apiClient.post('/auth/verify-password', {
        password: password,
      });

      if (response.data?.status === true) {
        // Password is correct
        setShowPasswordModal(false);
        setPassword('');
        setShowPassword(false);
        
        if (passwordModalMode === 'update') {
          proceedWithUpdate();
        } else if (passwordModalMode === 'delete') {
          setShowDeleteReasonModal(true);
        }
      } else {
        setPasswordError('Password is incorrect');
      }
    } catch (err) {
      console.error('Password verification error:', err);
      setPasswordError(err.response?.data?.message || 'Failed to verify password');
    } finally {
      setIsVerifyingPassword(false);
    }
  };

  // Proceed with actual update after password verification
  const proceedWithUpdate = async () => {
    setIsSaving(true);
    try {
      const updateData = {
        email: email.trim() || null,
        mobile_number: mobileNumber.trim() || null,
      };

      const updatedProfile = await updateUserProfile(updateData);
      await storeUserData(updatedProfile);

      if (updateUser) {
        updateUser(updatedProfile);
      }

      Alert.alert('Success', 'Account settings updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      console.error('Failed to update account settings:', err);
      Alert.alert('Error', err.message || 'Failed to update account settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle save - first validate form, then show password modal
  const handleSave = () => {
    if (!hasChanges()) {
      Alert.alert('No Changes', 'You haven\'t made any changes to your account settings.');
      return;
    }
    if (!validateForm()) {
      return;
    }
    // Show password verification modal for update
    setPasswordModalMode('update');
    setShowPasswordModal(true);
  };

  // Handle delete account initiation
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPasswordModalMode('delete');
            setShowPasswordModal(true);
          },
        },
      ]
    );
  };

  // Delete account after password verification
  const proceedWithDelete = async () => {
    if (!selectedDeleteReason.trim()) {
      Alert.alert('Please select a reason for deleting your account');
      return;
    }

    setIsDeleting(true);
    try {
      const response = await apiClient.delete('/auth/delete-account', {
        data: {
          password: password,
          reason: selectedDeleteReason,
        },
      });

      if (response.data?.status === true) {
        // Clear auth and navigate to login
        signOut();
        
        Alert.alert('Account Deleted', 'Your account has been successfully deleted.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
              });
            },
          },
        ]);
      } else {
        Alert.alert('Error', response.data?.message || 'Failed to delete account');
      }
    } catch (err) {
      console.error('Delete account error:', err);
      Alert.alert('Error', err.response?.data?.message || 'Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteReasonModal(false);
      setSelectedDeleteReason('');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        {/* Standard Header */}
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
            <AppText style={styles.headerTitle}>Account Settings</AppText>
            <AppText style={styles.headerGreeting}>Update your contact information</AppText>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.screenContainer}>
        {/* Standard Header - Exact same as EditProfile */}
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
            <AppText style={styles.headerTitle}>Account Settings</AppText>
            <AppText style={styles.headerGreeting}>Update your contact information</AppText>
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
            {/* Personal Info Section */}
            <AppText style={styles.sectionTitle}>Edit Personal Information</AppText>

            {/* Email - Always Editable */}
            <View style={styles.formGroup}>
              <AppText style={styles.label}>Email Address</AppText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#d1d5db"
                  value={email}
                  onChangeText={setEmail}
                  editable={!isSaving}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <AppText style={styles.errorText}>{errors.email}</AppText>}
            </View>

            {/* Mobile - Always Editable */}
            <View style={styles.formGroup}>
              <AppText style={styles.label}>Mobile Number</AppText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter mobile number (optional)"
                  placeholderTextColor="#d1d5db"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  editable={!isSaving}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.mobileNumber && <AppText style={styles.errorText}>{errors.mobileNumber}</AppText>}
            </View>

            {/* Email or Mobile Required Error */}
            {errors.emailOrMobile && (
              <View style={styles.formGroup}>
                <AppText style={styles.errorText}>{errors.emailOrMobile}</AppText>
              </View>
            )}
          </View>

          {/* Delete Account Section - Outside Box */}
          <View style={{ marginTop: 0, alignItems: 'center' }}>
            <TouchableOpacity onPress={handleDeleteAccount} disabled={isDeleting} activeOpacity={0.7}>
              <AppText style={{ color: '#dc2626', fontWeight: '500', fontSize: 14 }}>
                Delete Account
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Action Button - Fixed Footer (Exact same as EditProfile) */}
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              (isSaving || isVerifyingPassword || !hasChanges()) && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={isSaving || isVerifyingPassword || !hasChanges()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4f46e5', '#6366f1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveButtonGradient}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <AppText style={styles.saveButtonText}>Update Account</AppText>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Password Verification Modal */}
        <Modal
          visible={showPasswordModal}
          transparent
          animationType="fade"
          onRequestClose={() => !isVerifyingPassword && setShowPasswordModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <AppText style={styles.modalTitle}>Verify Your Password</AppText>
              <AppText style={styles.modalSubtitle}>
                Enter your password to confirm the changes
              </AppText>

              {/* Password Input with Eye Icon */}
              <View style={styles.modalInputContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter your password"
                  placeholderTextColor="#d1d5db"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError('');
                  }}
                  secureTextEntry={!showPassword}
                  editable={!isVerifyingPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  style={styles.passwordEyeIcon}
                  disabled={isVerifyingPassword}
                >
                  <Image
                    source={require('../../assets/icons/eye.png')}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* Password Error */}
              {passwordError && (
                <AppText style={styles.errorText}>{passwordError}</AppText>
              )}

              {/* Modal Buttons */}
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCancelButton]}
                  onPress={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                    setPasswordError('');
                  }}
                  disabled={isVerifyingPassword}
                  activeOpacity={0.7}
                >
                  <AppText style={styles.modalCancelButtonText}>Cancel</AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.modalConfirmButton,
                    isVerifyingPassword && styles.disabledButton,
                  ]}
                  onPress={verifyPassword}
                  disabled={isVerifyingPassword}
                  activeOpacity={0.7}
                >
                  {isVerifyingPassword ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <AppText style={styles.modalConfirmButtonText}>Verify</AppText>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Reason Modal */}
        <Modal
          visible={showDeleteReasonModal}
          transparent
          animationType="fade"
          onRequestClose={() => !isDeleting && setShowDeleteReasonModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <AppText style={styles.modalTitle}>Why are you deleting your account?</AppText>
              <AppText style={styles.modalSubtitle}>
                Your feedback helps us improve the app
              </AppText>

              {/* Reason Options */}
              <View style={{ marginVertical: 16 }}>
                {deleteReasons.map((reason, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      marginVertical: 6,
                      borderRadius: 8,
                      backgroundColor: selectedDeleteReason === reason ? '#eff6ff' : '#f9fafb',
                      borderWidth: selectedDeleteReason === reason ? 2 : 1,
                      borderColor: selectedDeleteReason === reason ? '#3b82f6' : '#e5e7eb',
                    }}
                    onPress={() => setSelectedDeleteReason(reason)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: selectedDeleteReason === reason ? '#3b82f6' : '#d1d5db',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}
                    >
                      {selectedDeleteReason === reason && (
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#3b82f6',
                          }}
                        />
                      )}
                    </View>
                    <AppText
                      style={{
                        flex: 1,
                        color: selectedDeleteReason === reason ? '#1f2937' : '#6b7280',
                        fontSize: 14,
                      }}
                    >
                      {reason}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Modal Buttons */}
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCancelButton]}
                  onPress={() => {
                    setShowDeleteReasonModal(false);
                    setSelectedDeleteReason('');
                  }}
                  disabled={isDeleting}
                  activeOpacity={0.7}
                >
                  <AppText style={styles.modalCancelButtonText}>Cancel</AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: selectedDeleteReason.trim() ? '#dc2626' : '#fca5a5',
                    },
                    isDeleting && styles.disabledButton,
                  ]}
                  onPress={proceedWithDelete}
                  disabled={isDeleting || !selectedDeleteReason.trim()}
                  activeOpacity={0.7}
                >
                  {isDeleting ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <AppText style={{ color: '#ffffff', fontWeight: '600', fontSize: 14 }}>
                      Delete Account
                    </AppText>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default AccountSettingsScreen;
