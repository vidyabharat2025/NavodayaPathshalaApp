/**
 * Login Screen (View)
 * MVVM Pattern: Screen/View contains only UI logic
 * Business logic is delegated to ViewModel
 * Cleaner design matching EditProfileScreen UI
 */

import React from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/common/AppText';
import LoginViewModel from './LoginViewModel';
import styles from './loginStyles';
import STRINGS from '../../constants/strings';
import { useAppContext } from '../../store/AppContext';
import COLORS from '../../config/colors';
import FONTS from '../../config/fonts';
import ROUTES from '../../constants/routes';

/**
 * Login Screen Component
 * Handles user authentication
 * @param {object} navigation - React Navigation prop
 */
const LoginScreen = ({ navigation }) => {
  // Get ViewModel (business logic)
  const viewModel = LoginViewModel();

  // Get app context for authentication
  const { signIn } = useAppContext();

  // Destructure ViewModel state and actions
  const {
    userName,
    password,
    isLoading,
    errors,
    showPassword,
    setUserName,
    setPassword,
    handleLogin,
    toggleShowPassword,
  } = viewModel;

  /**
   * Handle login button press
   */
  const onLoginPress = async () => {
    const result = await handleLogin();

    // Handle API error
    if (result?.error) {
      Alert.alert('Login Error', result.errorMessage, [{ text: 'OK' }]);
      return;
    }

    // If login was successful, update app context and navigate to home
    if (result && result.token && result.user) {
      // Sign in with token and user data
      // Navigation will be handled automatically by RootNavigator based on isSignedIn state
      signIn(result.token, result.user);
    }
  };

  /**
   * Navigate to sign up screen
   */
  const onSignUpPress = () => {
    navigation.navigate(ROUTES.AUTH.REGISTER);
  };

  /**
   * Navigate to forgot password screen
   */
  const onForgotPasswordPress = () => {
    // TODO: Navigate to forgot password screen
    // navigation.navigate(ROUTES.AUTH.FORGOT_PASSWORD);
  };

  const onLoginWithOTPPress = () => {
    // TODO: Navigate to login with OTP screen
    // navigation.navigate(ROUTES.AUTH.LOGIN_WITH_OTP);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['bottom']}>
      <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
        {/* Header with Logo/Branding */}
        <View style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 20,
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          alignItems: 'center',
          minHeight: 110,
          justifyContent: 'center',
        }}>
          <AppText style={{
            fontSize: 22,
            fontWeight: '700',
            fontFamily: FONTS.FAMILY.BOLD,
            color: '#4f46e5',
            marginBottom: 4,
          }}>Navo Bharat</AppText>
          <AppText style={{
            fontSize: 12,
            fontFamily: FONTS.FAMILY.REGULAR,
            color: '#6b7280',
          }}>Learn. Practice. Excel.</AppText>
        </View>

        {/* Form Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{
            marginHorizontal: 16,
            marginTop: 24,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            overflow: 'hidden',
            paddingHorizontal: 16,
            paddingVertical: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 1,
            borderWidth: 1,
            borderColor: '#f3f4f6',
          }}>
            {/* Title */}
            <AppText style={{
              fontSize: 18,
              fontWeight: '700',
              fontFamily: FONTS.FAMILY.BOLD,
              color: COLORS.TEXT_PRIMARY,
              marginBottom: 8,
            }}>Welcome Back</AppText>
            <AppText style={{
              fontSize: 13,
              fontFamily: FONTS.FAMILY.REGULAR,
              color: COLORS.TEXT_DISABLED,
              marginBottom: 20,
            }}>Sign in to continue learning</AppText>

            {/* Email/Mobile Input */}
            <View style={{ marginBottom: 16 }}>
              <AppText style={{
                fontSize: 13,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_PRIMARY,
                marginBottom: 8,
              }}>Email or Mobile Number</AppText>
              <View style={{
                height: 44,
                backgroundColor: '#f9fafb',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                paddingHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontFamily: FONTS.FAMILY.REGULAR,
                    color: COLORS.TEXT_PRIMARY,
                  }}
                  placeholder="email@school.com or 9876543210"
                  placeholderTextColor="#d1d5db"
                  value={userName}
                  onChangeText={setUserName}
                  editable={!isLoading}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Image
                  source={require('../../assets/icons/email.png')}
                  style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: '#6b7280' }}
                />
              </View>
              {errors.userName && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.userName}
                </AppText>
              )}
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: 16 }}>
              <AppText style={{
                fontSize: 13,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_PRIMARY,
                marginBottom: 8,
              }}>Password</AppText>
              <View style={{
                height: 44,
                backgroundColor: '#f9fafb',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                paddingHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontFamily: FONTS.FAMILY.REGULAR,
                    color: COLORS.TEXT_PRIMARY,
                  }}
                  placeholder="••••••••"
                  placeholderTextColor="#d1d5db"
                  value={password}
                  onChangeText={setPassword}
                  editable={!isLoading}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={toggleShowPassword}
                  disabled={isLoading}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Image
                    source={showPassword ? require('../../assets/icons/eye.png') : require('../../assets/icons/hidden.png')}
                    style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: '#6b7280' }}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.password}
                </AppText>
              )}
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={onForgotPasswordPress}
              disabled={isLoading}
              style={{ marginBottom: 20, marginTop: 8, alignSelf: 'flex-end' }}
            >
              <AppText style={{
                fontSize: 13,
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: '#4f46e5',
              }}>Forgot Password?</AppText>
            </TouchableOpacity>

          </View>
        </ScrollView>

        {/* Action Buttons - Fixed Footer */}
        <View style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
        }}>
          <TouchableOpacity
            style={{
              height: 56,
              borderRadius: 24,
              overflow: 'hidden',
              shadowColor: '#4f46e5',
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
              marginBottom: 16,
            }}
            onPress={onLoginPress}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4f46e5', '#6366f1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                height: 56,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 24,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <AppText style={{
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: FONTS.FAMILY.SEMI_BOLD,
                  color: '#ffffff',
                  letterSpacing: 0.3,
                }}>Sign In</AppText>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
            }}
            onPress={onSignUpPress}
            disabled={isLoading}
          >
            <AppText style={{
              fontSize: 14,
              fontFamily: FONTS.FAMILY.REGULAR,
              color: COLORS.TEXT_SECONDARY,
            }}>Don't have an account?</AppText>
            <AppText style={{
              fontSize: 14,
              fontFamily: FONTS.FAMILY.SEMI_BOLD,
              color: '#4f46e5',
              marginLeft: 4,
            }}>Sign Up</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
