/**
 * Profile Screen (Refactored)
 * Modern design matching Stitch UI with:
 * - Gradient header with avatar and profile info
 * - Profile details card
 * - Settings & preferences section
 * - Logout button
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Switch,
  Text,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../config/colors';
import profileStyles from './profileStyles';
import { useAppContext } from '../../store/AppContext';
import { fetchUserProfile, getLanguageName, getGradeLabel } from '../../services/userProfileService';
import useAppVersion from '../../hooks/useAppVersion';
import ROUTES from '../../constants/routes';

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAppContext();
  const { fullVersion } = useAppVersion();

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Fetch user profile on screen focus (refreshes when returning from edit)
  useFocusEffect(
    React.useCallback(() => {
      const loadProfile = async () => {
        try {
          setLoading(true);
          const data = await fetchUserProfile();
          setProfileData(data);
        } catch (err) {
          console.error('Failed to load profile:', err.message);
        } finally {
          setLoading(false);
        }
      };

      loadProfile();
    }, [])
  );

  // Fallback values if data not loaded
  const userName = profileData?.name || 'Student';
  const userGrade = profileData?.grade || 0;
  const userInitials = getInitials(userName);
  const profileImageUrl = null;

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLanguageChange = () => {
    Alert.alert('Language', 'Language selection coming soon');
  };

  const handleNotificationChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'Contact support coming soon');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate(ROUTES.PROFILE.LEGAL, { type: 'privacy-policy' });
  };

  const handleTermsConditions = () => {
    navigation.navigate(ROUTES.PROFILE.LEGAL, { type: 'terms' });
  };

  const handleAccountSettings = () => {
    navigation.navigate(ROUTES.PROFILE.ACCOUNT_SETTINGS);
  };

  const handleChangePassword = () => {
    navigation.navigate(ROUTES.PROFILE.CHANGE_PASSWORD);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } catch (err) {
            console.error('Logout failed:', err);
            Alert.alert('Logout Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <View style={profileStyles.screenContainer}>
      <ScrollView
        contentContainerStyle={profileStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ========== GRADIENT HEADER ========== */}
        <LinearGradient
          colors={['#4f46e5', '#6366f1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={profileStyles.headerGradient}
        >
          {/* Decorative blurs */}
          <View style={profileStyles.blurTopRight} />
          <View style={profileStyles.blurBottomLeft} />

          <SafeAreaView style={profileStyles.headerContent}>
            {/* Edit Profile Button - Top Right */}
            <TouchableOpacity
              style={profileStyles.headerEditButton}
              onPress={handleEditProfile}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../assets/icons/edit.png')}
                style={profileStyles.headerEditIcon}
              />
            </TouchableOpacity>

            {/* Avatar with Edit Button */}
            <View style={profileStyles.avatarWrapper}>
              <View style={profileStyles.avatarContainer}>
                {profileImageUrl ? (
                  <Image
                    source={{ uri: profileImageUrl }}
                    style={profileStyles.avatarImage}
                  />
                ) : (
                  <Text style={profileStyles.avatarText}>{userInitials}</Text>
                )}
              </View>
            </View>

            {/* Name */}
            <Text style={profileStyles.nameText}>{userName}</Text>

            {/* Grade Badge */}
            <View style={profileStyles.gradeBadge}>
              <Text style={profileStyles.gradeBadgeText}>
                {getGradeLabel(userGrade)}
              </Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* ========== PROFILE DETAILS CARD ========== */}
        {loading ? (
          <View style={profileStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          </View>
        ) : (
          <View style={profileStyles.detailsCard}>
            {/* Card Header */}
            <View style={profileStyles.cardHeader}>
              <Image
                source={require('../../assets/icons/tab-profile.png')}
                style={profileStyles.cardHeaderIcon}
              />
              <Text style={profileStyles.cardTitle}>Profile Details</Text>
            </View>

            {/* Divider */}
            <View style={profileStyles.divider} />

            {/* Details Grid */}
            <View style={profileStyles.detailsGrid}>
              {/* Email */}
              <View style={profileStyles.detailRow}>
                <Text style={profileStyles.detailLabel}>Email</Text>
                <Text
                  style={profileStyles.detailValue}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {profileData?.email || '-'}
                </Text>
              </View>

              <View style={profileStyles.detailDivider} />

              {/* Mobile */}
              <View style={profileStyles.detailRow}>
                <Text style={profileStyles.detailLabel}>Mobile</Text>
                <Text style={profileStyles.detailValue}>
                  {profileData?.mobile_number || '-'}
                </Text>
              </View>

              <View style={profileStyles.detailDivider} />

              {/* School */}
              <View style={profileStyles.detailRow}>
                <Text style={profileStyles.detailLabel}>School</Text>
                <Text
                  style={profileStyles.detailValue}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {profileData?.school_name || '-'}
                </Text>
              </View>

              <View style={profileStyles.detailDivider} />

              {/* Board & Grade Row */}
              <View style={profileStyles.twoColumnRow}>
                <View style={profileStyles.twoColumnCell}>
                  <Text style={profileStyles.detailLabel}>Board</Text>
                  <Text style={[profileStyles.detailValue, profileStyles.leftAligned]}>
                    {profileData?.board || '-'}
                  </Text>
                </View>
                <View
                  style={[profileStyles.twoColumnCell, profileStyles.rightCell]}
                >
                  <Text style={profileStyles.detailLabel}>Grade</Text>
                  <Text style={[profileStyles.detailValue, profileStyles.leftAligned]}>
                    {profileData?.grade || '-'}
                  </Text>
                </View>
              </View>

              <View style={profileStyles.detailDivider} />

              {/* Location */}
              <View style={profileStyles.detailRow}>
                <Text style={profileStyles.detailLabel}>Location</Text>
                <Text style={profileStyles.detailValue}>
                  {profileData?.state && profileData?.district
                    ? `${profileData.district}, ${profileData.state}`
                    : '-'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* ========== SETTINGS & PREFERENCES ========== */}
        <View style={profileStyles.settingsCard}>
          {/* Section Header */}
          <View style={profileStyles.settingsHeader}>
            <Text style={profileStyles.settingsTitle}>
              SETTINGS & PREFERENCES
            </Text>
          </View>

          {/* Settings Items */}
          <View style={profileStyles.settingsList}>
            {/* Language */}
            <TouchableOpacity
              style={profileStyles.settingItem}
              onPress={handleLanguageChange}
              activeOpacity={0.6}
            >
              <View style={profileStyles.settingIconBox}>
                <Image
                  source={require('../../assets/icons/language.png')}
                  style={profileStyles.settingIcon}
                />
              </View>
              <View style={profileStyles.settingContent}>
                <Text style={profileStyles.settingTitle}>Language</Text>
                <Text style={profileStyles.settingSubtitle}>
                  {profileData ? getLanguageName(profileData.language || 'en') : 'English'}
                </Text>
              </View>
              <Image
                source={require('../../assets/icons/next.png')}
                style={profileStyles.chevronIcon}
              />
            </TouchableOpacity>

            <View style={profileStyles.settingDivider} />

            {/* Notifications */}
            <View style={profileStyles.settingItem}>
              <View style={profileStyles.settingIconBox}>
                <Image
                  source={require('../../assets/icons/notification.png')}
                  style={profileStyles.settingIcon}
                />
              </View>
              <View style={profileStyles.settingContent}>
                <Text style={profileStyles.settingTitle}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationChange}
                trackColor={{ false: '#e5e7eb', true: '#4f46e5' }}
                thumbColor={notificationsEnabled ? '#ffffff' : '#f3f4f6'}
                style={profileStyles.settingSwitch}
              />
            </View>

            <View style={profileStyles.settingDivider} />

            {/* Help & Support */}
            <TouchableOpacity
              style={profileStyles.settingItem}
              onPress={handleHelpSupport}
              activeOpacity={0.6}
            >
              <View style={profileStyles.settingIconBox}>
                <Image
                  source={require('../../assets/icons/help.png')}
                  style={profileStyles.settingIcon}
                />
              </View>
              <View style={profileStyles.settingContent}>
                <Text style={profileStyles.settingTitle}>Help & Support</Text>
              </View>
              <Image
                source={require('../../assets/icons/next.png')}
                style={profileStyles.chevronIcon}
              />
            </TouchableOpacity>

            <View style={profileStyles.settingDivider} />

            {/* Privacy Policy */}
            <TouchableOpacity
              style={profileStyles.settingItem}
              onPress={handlePrivacyPolicy}
              activeOpacity={0.6}
            >
              <View style={profileStyles.settingIconBox}>
                <Image
                  source={require('../../assets/icons/privacy.png')}
                  style={profileStyles.settingIcon}
                />
              </View>
              <View style={profileStyles.settingContent}>
                <Text style={profileStyles.settingTitle}>Privacy Policy</Text>
              </View>
              <Image
                source={require('../../assets/icons/next.png')}
                style={profileStyles.chevronIcon}
              />
            </TouchableOpacity>

            <View style={profileStyles.settingDivider} />

            {/* Terms & Conditions */}
            <TouchableOpacity
              style={profileStyles.settingItem}
              onPress={handleTermsConditions}
              activeOpacity={0.6}
            >
              <View style={profileStyles.settingIconBox}>
                <Image
                  source={require('../../assets/icons/privacy.png')}
                  style={profileStyles.settingIcon}
                />
              </View>
              <View style={profileStyles.settingContent}>
                <Text style={profileStyles.settingTitle}>Terms & Conditions</Text>
              </View>
              <Image
                source={require('../../assets/icons/next.png')}
                style={profileStyles.chevronIcon}
              />
            </TouchableOpacity>

            <View style={profileStyles.settingDivider} />

            {/* Change Password */}
            <TouchableOpacity
              style={profileStyles.settingItem}
              onPress={handleChangePassword}
              activeOpacity={0.6}
            >
              <View style={profileStyles.settingIconBox}>
                <Image
                  source={require('../../assets/icons/user-setting.png')}
                  style={profileStyles.settingIcon}
                />
              </View>
              <View style={profileStyles.settingContent}>
                <Text style={profileStyles.settingTitle}>Change Password</Text>
              </View>
              <Image
                source={require('../../assets/icons/next.png')}
                style={profileStyles.chevronIcon}
              />
            </TouchableOpacity>

            <View style={profileStyles.settingDivider} />

            {/* Account Settings */}
            <TouchableOpacity
              style={[profileStyles.settingItem, profileStyles.lastSettingItem]}
              onPress={handleAccountSettings}
              activeOpacity={0.6}
            >
              <View style={profileStyles.settingIconBox}>
                <Image
                  source={require('../../assets/icons/user-setting.png')}
                  style={profileStyles.settingIcon}
                />
              </View>
              <View style={profileStyles.settingContent}>
                <Text style={profileStyles.settingTitle}>Account Settings</Text>
              </View>
              <Image
                source={require('../../assets/icons/next.png')}
                style={profileStyles.chevronIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ========== LOGOUT BUTTON ========== */}
        <TouchableOpacity
          style={profileStyles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../assets/icons/logout.png')}
            style={profileStyles.logoutIcon}
          />
          <Text style={profileStyles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* ========== FOOTER ========== */}
        <View style={profileStyles.footerContainer}>
          <Text style={profileStyles.footerText}>{fullVersion}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
