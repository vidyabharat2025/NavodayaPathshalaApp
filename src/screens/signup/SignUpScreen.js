/**
 * Sign Up Screen (View)
 * MVVM Pattern: Screen/View contains only UI logic
 * Business logic is delegated to ViewModel
 * Single-step signup flow with EditProfileScreen-style UI
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/common/AppText';
import SignUpViewModel from './SignUpViewModel';
import { useAppContext } from '../../store/AppContext';
import COLORS from '../../config/colors';
import FONTS from '../../config/fonts';
import ROUTES from '../../constants/routes';

/**
 * Sign Up Screen Component
 * Handles user registration with single-step form
 * @param {object} navigation - React Navigation prop
 */
const SignUpScreen = ({ navigation }) => {
  // Get ViewModel (business logic)
  const viewModel = SignUpViewModel();

  // Get app context for authentication
  const { signIn } = useAppContext();

  // Dropdown visibility states
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Destructure ViewModel state and actions
  const {
    name,
    email,
    password,
    mobileNumber,
    dateOfBirth,
    schoolName,
    grade,
    gradeId,
    board,
    state,
    stateId,
    district,
    districtId,
    language,
    termsAccepted,
    showPassword,
    grades,
    boards,
    states,
    districts,
    languages,
    isLoadingMeta,
    isLoadingDistricts,
    isLoading,
    errors,
    setName,
    setEmail,
    setPassword,
    setMobileNumber,
    setDateOfBirth,
    setSchoolName,
    setGrade,
    setGradeId,
    setBoard,
    setState,
    setStateId,
    setDistrict,
    setDistrictId,
    setLanguage,
    setTermsAccepted,
    toggleShowPassword,
    handleSignUp,
  } = viewModel;

  /**
   * Validate complete form
   */
  const validateCompleteForm = () => {
    const newErrors = {};

    // Full Name
    if (!name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    // Email
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password
    if (!password) {
      newErrors.password = 'Please create a password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    // Mobile Number (Optional)
    if (mobileNumber && !isValidPhoneNumber(mobileNumber)) {
      newErrors.mobileNumber =
        'Please enter a valid 10-digit mobile number.';
    }

    // Date of Birth
    if (!dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Please select your date of birth.';
    }

    // School Name
    if (!schoolName.trim()) {
      newErrors.schoolName = 'Please enter your school name.';
    }

    // Grade
    if (!grade.trim()) {
      newErrors.grade = 'Please select your grade.';
    }

    // Board
    if (!board.trim()) {
      newErrors.board = 'Please select your education board.';
    }

    // State
    if (!state.trim()) {
      newErrors.state = 'Please select your state.';
    }

    // District
    if (!district.trim()) {
      newErrors.district = 'Please select your district.';
    }

    // Preferred Language
    if (!language.trim()) {
      newErrors.language = 'Please select your preferred language.';
    }

    // Terms & Conditions
    if (!termsAccepted) {
      newErrors.terms =
        'Please accept the Terms & Conditions to continue.';
    }

    return {
      errors: newErrors,
      isValid: Object.keys(newErrors).length === 0,
    };
  };
  /**
   * Validate email format
   */
  const isValidEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  /**
   * Validate phone number
   */
  const isValidPhoneNumber = (phone) => {
    if (!phone) return true; // Optional field
    // Extract only digits from the phone number
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it has exactly 10 digits
    return digitsOnly.length === 10;
  };

  /**
   * Handle sign up completion
   */
  const onSignUpPress = async () => {
    const validation = validateCompleteForm();

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      Alert.alert('', firstError, [{ text: 'OK' }]);
      return;
    }

    const result = await handleSignUp();

    if (result?.error) {
      Alert.alert('Sign Up Error', result.errorMessage, [{ text: 'OK' }]);
      return;
    }

    if (result?.success && result?.user) {
      Alert.alert(
        'Account Created',
        'Your account has been created successfully. Please log in with your email and password.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    }
  };

  /**
   * Handle back button press
   */
  const onBackPress = () => {
    navigation.goBack();
  };

  /**
   * Navigate to login screen
   */
  const onLoginPress = () => {
    navigation.goBack();
  };

  /**
   * Get label for selected grade
   */
  const getGradeLabel = (id) => {
    return grades.find(g => g.id === parseInt(id))?.name || grade;
  };

  /**
   * Get label for selected board
   */
  const getBoardLabel = (boardName) => {
    return boards.find(b => b.name === boardName)?.name || boardName;
  };

  /**
   * Get label for selected state
   */
  const getStateLabel = (stateName) => {
    return states.find(s => s.name === stateName)?.name || stateName;
  };

  /**
   * Get label for selected district
   */
  const getDistrictLabel = (districtName) => {
    return districts.find(d => d.name === districtName)?.name || districtName;
  };

  /**
   * Get label for selected language
   */
  const getLanguageLabel = (langCode) => {
    return languages.find(l => l.code === langCode)?.name || langCode;
  };

  // Show loading while metadata is being fetched
  if (isLoadingMeta) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 12,
            backgroundColor: '#ffffff',
            borderBottomWidth: 1,
            borderBottomColor: '#f3f4f6',
          }}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#eef2ff',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
              }}
              onPress={onBackPress}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Image
                source={require('../../assets/icons/back-arrow.png')}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: 'contain',
                  tintColor: '#4f46e5',
                }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <AppText style={{
                fontSize: 16,
                fontWeight: '700',
                fontFamily: FONTS.FAMILY.BOLD,
                color: COLORS.TEXT_PRIMARY,
                marginBottom: 2,
                lineHeight: 20,
              }}>Sign Up</AppText>
              <AppText style={{
                fontSize: 12,
                fontFamily: FONTS.FAMILY.REGULAR,
                color: COLORS.TEXT_DISABLED,
                lineHeight: 16,
              }}>Create your account</AppText>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#4f46e5" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
        {/* Standard Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 12,
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: '#f3f4f6',
        }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#eef2ff',
              justifyContent: 'center',
              alignItems: 'center',
              flexShrink: 0,
            }}
            onPress={onBackPress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require('../../assets/icons/back-arrow.png')}
              style={{
                width: 18,
                height: 18,
                resizeMode: 'contain',
                tintColor: '#4f46e5',
              }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <AppText style={{
              fontSize: 16,
              fontWeight: '700',
              fontFamily: FONTS.FAMILY.BOLD,
              color: COLORS.TEXT_PRIMARY,
              marginBottom: 2,
              lineHeight: 20,
            }}>Sign Up</AppText>
            <AppText style={{
              fontSize: 12,
              fontFamily: FONTS.FAMILY.REGULAR,
              color: COLORS.TEXT_DISABLED,
              lineHeight: 16,
            }}>Create your account</AppText>
          </View>
        </View>

        {/* Form Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ACCOUNT INFORMATION SECTION */}
          <View style={{
            marginHorizontal: 16,
            marginTop: 16,
            marginBottom: 20,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 1,
            borderWidth: 1,
            borderColor: '#f3f4f6',
          }}>
            <AppText style={{
              fontSize: 10,
              fontWeight: '700',
              fontFamily: FONTS.FAMILY.BOLD,
              color: '#9ca3af',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}>Account Information</AppText>

            {/* Full Name */}
            <View style={{ marginBottom: 14 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Full Name</AppText>
              <View style={{
                backgroundColor: errors.name ? '#fef2f2' : '#f9fafb',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: errors.name ? '#fca5a5' : '#e5e7eb',
                paddingHorizontal: 14,
                height: 44,
                justifyContent: 'center',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontFamily: FONTS.FAMILY.REGULAR,
                    color: COLORS.TEXT_PRIMARY,
                    padding: 0,
                  }}
                  placeholder="Enter your full name"
                  placeholderTextColor="#d1d5db"
                  value={name}
                  onChangeText={setName}
                  editable={!isLoading}
                />
              </View>
              {errors.name && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.name}
                </AppText>
              )}
            </View>

            {/* Email */}
            <View style={{ marginBottom: 14 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Email Address</AppText>
              <View style={{
                backgroundColor: errors.email ? '#fef2f2' : '#f9fafb',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: errors.email ? '#fca5a5' : '#e5e7eb',
                paddingHorizontal: 14,
                height: 44,
                justifyContent: 'center',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontFamily: FONTS.FAMILY.REGULAR,
                    color: COLORS.TEXT_PRIMARY,
                    padding: 0,
                  }}
                  placeholder="name@example.com"
                  placeholderTextColor="#d1d5db"
                  value={email}
                  onChangeText={setEmail}
                  editable={!isLoading}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.email}
                </AppText>
              )}
            </View>

            {/* Mobile Number */}
            <View style={{ marginBottom: 14 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Mobile Number (Optional)</AppText>
              <View style={{
                backgroundColor: errors.mobileNumber ? '#fef2f2' : '#f9fafb',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: errors.mobileNumber ? '#fca5a5' : '#e5e7eb',
                paddingHorizontal: 14,
                height: 44,
                justifyContent: 'center',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontFamily: FONTS.FAMILY.REGULAR,
                    color: COLORS.TEXT_PRIMARY,
                    padding: 0,
                  }}
                  placeholder="+91 98765 43210"
                  placeholderTextColor="#d1d5db"
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  editable={!isLoading}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.mobileNumber && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.mobileNumber}
                </AppText>
              )}
            </View>

            {/* Password */}
            <View style={{ marginBottom: 0 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Password</AppText>
              <View style={{
                backgroundColor: errors.password ? '#fef2f2' : '#f9fafb',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: errors.password ? '#fca5a5' : '#e5e7eb',
                paddingHorizontal: 14,
                height: 44,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontFamily: FONTS.FAMILY.REGULAR,
                    color: COLORS.TEXT_PRIMARY,
                    padding: 0,
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor="#d1d5db"
                  value={password}
                  onChangeText={setPassword}
                  editable={!isLoading}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={toggleShowPassword} disabled={isLoading}>
                  <Image
                    source={showPassword ? require('../../assets/icons/eye.png') : require('../../assets/icons/hidden.png')}
                    style={{
                      width: 18,
                      height: 18,
                      resizeMode: 'contain',
                      tintColor: '#9ca3af',
                    }}
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
          </View>

          {/* PROFILE INFORMATION SECTION */}
          <View style={{
            marginHorizontal: 16,
            marginTop: 0,
            marginBottom: 20,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 1,
            borderWidth: 1,
            borderColor: '#f3f4f6',
          }}>
            <AppText style={{
              fontSize: 10,
              fontWeight: '700',
              fontFamily: FONTS.FAMILY.BOLD,
              color: '#9ca3af',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}>Profile Information</AppText>

            {/* Date of Birth */}
            <View style={{ marginBottom: 14 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Date of Birth</AppText>
              <View style={{
                backgroundColor: errors.dateOfBirth ? '#fef2f2' : '#f9fafb',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: errors.dateOfBirth ? '#fca5a5' : '#e5e7eb',
                paddingHorizontal: 14,
                height: 44,
                justifyContent: 'center',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontFamily: FONTS.FAMILY.REGULAR,
                    color: COLORS.TEXT_PRIMARY,
                    padding: 0,
                  }}
                  placeholder="dd/mm/yyyy"
                  placeholderTextColor="#d1d5db"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  editable={!isLoading}
                />
              </View>
              {errors.dateOfBirth && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.dateOfBirth}
                </AppText>
              )}
            </View>

            {/* School Name */}
            <View style={{ marginBottom: 14 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>School Name</AppText>
              <View style={{
                backgroundColor: errors.schoolName ? '#fef2f2' : '#f9fafb',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: errors.schoolName ? '#fca5a5' : '#e5e7eb',
                paddingHorizontal: 14,
                height: 44,
                justifyContent: 'center',
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontFamily: FONTS.FAMILY.REGULAR,
                    color: COLORS.TEXT_PRIMARY,
                    padding: 0,
                  }}
                  placeholder="Enter school name"
                  placeholderTextColor="#d1d5db"
                  value={schoolName}
                  onChangeText={setSchoolName}
                  editable={!isLoading}
                />
              </View>
              {errors.schoolName && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.schoolName}
                </AppText>
              )}
            </View>

            {/* Grade Dropdown */}
            <View style={{ marginBottom: 14 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Grade</AppText>
              <TouchableOpacity
                style={{
                  backgroundColor: errors.grade ? '#fef2f2' : '#f9fafb',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: errors.grade ? '#fca5a5' : '#e5e7eb',
                  paddingHorizontal: 14,
                  height: 44,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => !isLoading && setShowGradeDropdown(!showGradeDropdown)}
                disabled={isLoading}
              >
                <AppText style={{
                  fontSize: 15,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: !grade ? '#d1d5db' : COLORS.TEXT_PRIMARY,
                  flex: 1,
                }}>
                  {grade ? getGradeLabel(gradeId) : 'Select Grade'}
                </AppText>
                <Image
                  source={require('../../assets/icons/next.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: '#4f46e5',
                  }}
                />
              </TouchableOpacity>
              {errors.grade && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.grade}
                </AppText>
              )}

              {/* Grade Modal */}
              <Modal
                transparent={true}
                visible={showGradeDropdown}
                animationType="slide"
                onRequestClose={() => setShowGradeDropdown(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                  activeOpacity={1}
                  onPress={() => setShowGradeDropdown(false)}
                >
                  <View style={{
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    maxHeight: '70%',
                    paddingTop: 12,
                  }}>
                    {grades.length === 0 ? (
                      <View style={{ padding: 16, alignItems: 'center' }}>
                        <AppText>No grades available</AppText>
                      </View>
                    ) : (
                      <FlatList
                        data={grades}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setGradeId(item.id.toString());
                              setGrade(item.name);
                              setShowGradeDropdown(false);
                            }}
                            style={{
                              paddingHorizontal: 16,
                              paddingVertical: 12,
                              borderBottomWidth: 1,
                              borderBottomColor: '#f3f4f6',
                              justifyContent: 'center',
                            }}
                          >
                            <AppText style={{
                              fontSize: 16,
                              fontFamily: FONTS.FAMILY.REGULAR,
                              color: COLORS.TEXT_PRIMARY,
                            }}>
                              {item.name}
                            </AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            {/* Board Dropdown */}
            <View style={{ marginBottom: 0 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Board</AppText>
              <TouchableOpacity
                style={{
                  backgroundColor: errors.board ? '#fef2f2' : '#f9fafb',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: errors.board ? '#fca5a5' : '#e5e7eb',
                  paddingHorizontal: 14,
                  height: 44,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => !isLoading && setShowBoardDropdown(!showBoardDropdown)}
                disabled={isLoading}
              >
                <AppText style={{
                  fontSize: 15,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: !board ? '#d1d5db' : COLORS.TEXT_PRIMARY,
                  flex: 1,
                }}>
                  {board ? getBoardLabel(board) : 'Select Board'}
                </AppText>
                <Image
                  source={require('../../assets/icons/next.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: '#4f46e5',
                  }}
                />
              </TouchableOpacity>
              {errors.board && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.board}
                </AppText>
              )}

              {/* Board Modal */}
              <Modal
                transparent={true}
                visible={showBoardDropdown}
                animationType="slide"
                onRequestClose={() => setShowBoardDropdown(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                  activeOpacity={1}
                  onPress={() => setShowBoardDropdown(false)}
                >
                  <View style={{
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    maxHeight: '70%',
                    paddingTop: 12,
                  }}>
                    {boards.length === 0 ? (
                      <View style={{ padding: 16, alignItems: 'center' }}>
                        <AppText>No boards available</AppText>
                      </View>
                    ) : (
                      <FlatList
                        data={boards}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setBoard(item.name);
                              setShowBoardDropdown(false);
                            }}
                            style={{
                              paddingHorizontal: 16,
                              paddingVertical: 12,
                              borderBottomWidth: 1,
                              borderBottomColor: '#f3f4f6',
                              justifyContent: 'center',
                            }}
                          >
                            <AppText style={{
                              fontSize: 16,
                              fontFamily: FONTS.FAMILY.REGULAR,
                              color: COLORS.TEXT_PRIMARY,
                            }}>
                              {item.name}
                            </AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>

          {/* LOCATION SECTION */}
          <View style={{
            marginHorizontal: 16,
            marginTop: 0,
            marginBottom: 20,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 1,
            borderWidth: 1,
            borderColor: '#f3f4f6',
          }}>
            <AppText style={{
              fontSize: 10,
              fontWeight: '700',
              fontFamily: FONTS.FAMILY.BOLD,
              color: '#9ca3af',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}>Location</AppText>

            {/* State Dropdown */}
            <View style={{ marginBottom: 14 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>State</AppText>
              <TouchableOpacity
                style={{
                  backgroundColor: errors.state ? '#fef2f2' : '#f9fafb',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: errors.state ? '#fca5a5' : '#e5e7eb',
                  paddingHorizontal: 14,
                  height: 44,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => !isLoading && setShowStateDropdown(!showStateDropdown)}
                disabled={isLoading}
              >
                <AppText style={{
                  fontSize: 15,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: !state ? '#d1d5db' : COLORS.TEXT_PRIMARY,
                  flex: 1,
                }}>
                  {state ? getStateLabel(state) : 'Select State'}
                </AppText>
                <Image
                  source={require('../../assets/icons/next.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: '#4f46e5',
                  }}
                />
              </TouchableOpacity>
              {errors.state && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.state}
                </AppText>
              )}

              {/* State Modal */}
              <Modal
                transparent={true}
                visible={showStateDropdown}
                animationType="slide"
                onRequestClose={() => setShowStateDropdown(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                  activeOpacity={1}
                  onPress={() => setShowStateDropdown(false)}
                >
                  <View style={{
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    maxHeight: '70%',
                    paddingTop: 12,
                  }}>
                    {states.length === 0 ? (
                      <View style={{ padding: 16, alignItems: 'center' }}>
                        <AppText>No states available</AppText>
                      </View>
                    ) : (
                      <FlatList
                        data={states}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setState(item.name);
                              setStateId(item.id);
                              setDistrict('');
                              setDistrictId('');
                              setShowStateDropdown(false);
                            }}
                            style={{
                              paddingHorizontal: 16,
                              paddingVertical: 12,
                              borderBottomWidth: 1,
                              borderBottomColor: '#f3f4f6',
                              justifyContent: 'center',
                            }}
                          >
                            <AppText style={{
                              fontSize: 16,
                              fontFamily: FONTS.FAMILY.REGULAR,
                              color: COLORS.TEXT_PRIMARY,
                            }}>
                              {item.name}
                            </AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            {/* District Dropdown */}
            <View style={{ marginBottom: 0 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>District</AppText>
              <TouchableOpacity
                style={{
                  backgroundColor: errors.district ? '#fef2f2' : '#f9fafb',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: errors.district ? '#fca5a5' : '#e5e7eb',
                  paddingHorizontal: 14,
                  height: 44,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => !isLoading && !isLoadingDistricts && setShowDistrictDropdown(!showDistrictDropdown)}
                disabled={isLoading || isLoadingDistricts}
              >
                <AppText style={{
                  fontSize: 15,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: !district ? '#d1d5db' : COLORS.TEXT_PRIMARY,
                  flex: 1,
                }}>
                  {isLoadingDistricts ? 'Loading...' : (district ? getDistrictLabel(district) : 'Select District')}
                </AppText>
                {isLoadingDistricts ? (
                  <ActivityIndicator size="small" color="#4f46e5" />
                ) : (
                  <Image
                    source={require('../../assets/icons/next.png')}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      tintColor: '#4f46e5',
                    }}
                  />
                )}
              </TouchableOpacity>
              {errors.district && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.district}
                </AppText>
              )}

              {/* District Modal */}
              <Modal
                transparent={true}
                visible={showDistrictDropdown}
                animationType="slide"
                onRequestClose={() => setShowDistrictDropdown(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                  activeOpacity={1}
                  onPress={() => setShowDistrictDropdown(false)}
                >
                  <View style={{
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    maxHeight: '70%',
                    paddingTop: 12,
                  }}>
                    {districts.length === 0 ? (
                      <View style={{ padding: 16, alignItems: 'center' }}>
                        <AppText>{isLoadingDistricts ? 'Loading districts...' : 'No districts available'}</AppText>
                      </View>
                    ) : (
                      <FlatList
                        data={districts}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setDistrict(item.name);
                              setDistrictId(item.id);
                              setShowDistrictDropdown(false);
                            }}
                            style={{
                              paddingHorizontal: 16,
                              paddingVertical: 12,
                              borderBottomWidth: 1,
                              borderBottomColor: '#f3f4f6',
                              justifyContent: 'center',
                            }}
                          >
                            <AppText style={{
                              fontSize: 16,
                              fontFamily: FONTS.FAMILY.REGULAR,
                              color: COLORS.TEXT_PRIMARY,
                            }}>
                              {item.name}
                            </AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>

          {/* PREFERENCES SECTION */}
          <View style={{
            marginHorizontal: 16,
            marginTop: 0,
            marginBottom: 20,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 1,
            borderWidth: 1,
            borderColor: '#f3f4f6',
          }}>
            <AppText style={{
              fontSize: 10,
              fontWeight: '700',
              fontFamily: FONTS.FAMILY.BOLD,
              color: '#9ca3af',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}>Preferences</AppText>

            {/* Language Dropdown */}
            <View style={{ marginBottom: 0 }}>
              <AppText style={{
                fontSize: 11,
                fontWeight: '600',
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: COLORS.TEXT_DISABLED,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Language</AppText>
              <TouchableOpacity
                style={{
                  backgroundColor: errors.language ? '#fef2f2' : '#f9fafb',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: errors.language ? '#fca5a5' : '#e5e7eb',
                  paddingHorizontal: 14,
                  height: 44,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => !isLoading && setShowLanguageDropdown(!showLanguageDropdown)}
                disabled={isLoading}
              >
                <AppText style={{
                  fontSize: 15,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: !language ? '#d1d5db' : COLORS.TEXT_PRIMARY,
                  flex: 1,
                }}>
                  {language ? getLanguageLabel(language) : 'Select Language'}
                </AppText>
                <Image
                  source={require('../../assets/icons/next.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: '#4f46e5',
                  }}
                />
              </TouchableOpacity>
              {errors.language && (
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: '#dc2626',
                  marginTop: 6,
                }}>
                  {errors.language}
                </AppText>
              )}

              {/* Language Modal */}
              <Modal
                transparent={true}
                visible={showLanguageDropdown}
                animationType="slide"
                onRequestClose={() => setShowLanguageDropdown(false)}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                  activeOpacity={1}
                  onPress={() => setShowLanguageDropdown(false)}
                >
                  <View style={{
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    maxHeight: '70%',
                    paddingTop: 12,
                  }}>
                    {languages.length === 0 ? (
                      <View style={{ padding: 16, alignItems: 'center' }}>
                        <AppText>No languages available</AppText>
                      </View>
                    ) : (
                      <FlatList
                        data={languages}
                        keyExtractor={(item) => item.code}
                        scrollEnabled={true}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setLanguage(item.code);
                              setShowLanguageDropdown(false);
                            }}
                            style={{
                              paddingHorizontal: 16,
                              paddingVertical: 12,
                              borderBottomWidth: 1,
                              borderBottomColor: '#f3f4f6',
                              justifyContent: 'center',
                            }}
                          >
                            <AppText style={{
                              fontSize: 16,
                              fontFamily: FONTS.FAMILY.REGULAR,
                              color: COLORS.TEXT_PRIMARY,
                            }}>
                              {item.name}
                            </AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>

          {/* TERMS & CONDITIONS SECTION */}
          <View style={{
            marginHorizontal: 16,
            marginTop: 0,
            marginBottom: 20,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 1,
            borderWidth: 1,
            borderColor: '#f3f4f6',
          }}>
            {/* Checkbox + Agreement Text */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 12,
            }}>
              <TouchableOpacity
                onPress={() => setTermsAccepted(!termsAccepted)}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: termsAccepted ? '#4f46e5' : '#e5e7eb',
                  backgroundColor: termsAccepted ? '#4f46e5' : '#ffffff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 2,
                }}>
                  {termsAccepted && (
                    <AppText style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#ffffff',
                    }}>
                      ✓
                    </AppText>
                  )}
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1, paddingTop: 1 }}>
                <AppText style={{
                  fontSize: 12,
                  fontFamily: FONTS.FAMILY.REGULAR,
                  color: COLORS.TEXT_PRIMARY,
                  lineHeight: 18,
                }}>
                  By continuing, you agree to our{'\n'}
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PROFILE.LEGAL, { type: 'terms' })}
                    disabled={isLoading}
                  >
                    <AppText style={{
                      fontFamily: FONTS.FAMILY.SEMI_BOLD,
                      color: '#4f46e5',
                      textDecorationLine: 'underline',
                      lineHeight: 18,
                    }}>
                      Terms & Conditions
                    </AppText>
                  </TouchableOpacity>
                  {' and '}
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.PROFILE.LEGAL, { type: 'privacy-policy' })}
                    disabled={isLoading}
                  >
                    <AppText style={{
                      fontFamily: FONTS.FAMILY.SEMI_BOLD,
                      color: '#4f46e5',
                      textDecorationLine: 'underline',
                      lineHeight: 18,
                    }}>
                      Privacy Policy
                    </AppText>
                  </TouchableOpacity>
                </AppText>
              </View>
            </View>

            {errors.terms && (
              <AppText style={{
                fontSize: 12,
                fontFamily: FONTS.FAMILY.REGULAR,
                color: '#dc2626',
                marginTop: 12,
              }}>
                {errors.terms}
              </AppText>
            )}
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
            }}
            onPress={onSignUpPress}
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
                }}>
                  Create Account
                </AppText>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={{
            marginTop: 16,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 4,
          }}>
            <AppText style={{
              fontSize: 14,
              fontFamily: FONTS.FAMILY.REGULAR,
              color: COLORS.TEXT_SECONDARY,
            }}>
              Already have an account?
            </AppText>
            <TouchableOpacity onPress={onLoginPress} disabled={isLoading}>
              <AppText style={{
                fontSize: 14,
                fontFamily: FONTS.FAMILY.SEMI_BOLD,
                color: '#4f46e5',
              }}>
                Log In
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

