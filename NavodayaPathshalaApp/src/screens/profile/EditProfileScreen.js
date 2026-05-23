/**
 * Edit Profile Screen
 * Allows user to update profile information with restrictions on email/mobile
 * - Once email is set, cannot be changed, but can add mobile if not already set
 * - Once mobile is set, cannot be changed, but can add email if not already set
 * - Can always update: name, school_name, board, state, district, grade, language
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  Image,
  ActivityIndicator,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../components/common/AppText';
import { useAppContext } from '../../store/AppContext';
import { fetchUserProfile, updateUserProfile } from '../../services/userProfileService';
import {
  getGrades,
  getBoards,
  getStates,
  getDistricts,
  getLanguages,
} from '../../services/metadataService';
import { storeUserData } from '../../services/storageService';
import styles from './editProfileStyles';

const EditProfileScreen = ({ navigation }) => {
  // User data
  const { user, updateUser } = useAppContext();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [grade, setGrade] = useState('');
  const [gradeId, setGradeId] = useState('');
  const [board, setBoard] = useState('');
  const [state, setState] = useState('');
  const [stateId, setStateId] = useState('');
  const [district, setDistrict] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [language, setLanguage] = useState('');

  // Track original values for email/mobile lock status
  const [originalEmail, setOriginalEmail] = useState('');
  const [originalMobileNumber, setOriginalMobileNumber] = useState('');

  // Metadata state
  const [grades, setGrades] = useState([]);
  const [boards, setBoards] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [languages, setLanguages] = useState([]);

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Fetch current user profile
      const profile = await fetchUserProfile();

      // Load metadata
      const [gradesData, boardsData, statesData, languagesData] = await Promise.all([
        getGrades(),
        getBoards(),
        getStates(),
        getLanguages(),
      ]);

      setGrades(gradesData);
      setBoards(boardsData);
      setStates(statesData);
      setLanguages(languagesData);

      // Populate form with current data
      setName(profile.name || '');
      setEmail(profile.email || '');
      setMobileNumber(profile.mobile_number || '');
      setSchoolName(profile.school_name || '');
      setGrade(profile.grade ? profile.grade.toString() : '');
      setGradeId(profile.grade_id ? profile.grade_id.toString() : '');
      setBoard(profile.board || '');
      setState(profile.state || '');
      setDistrict(profile.district || '');
      setLanguage(profile.language || 'en');

      // Store original values for lock status
      setOriginalEmail(profile.email || '');
      setOriginalMobileNumber(profile.mobile_number || '');

      // Load districts for current state
      if (profile.state) {
        const stateObj = statesData.find(s => s.name === profile.state);
        if (stateObj) {
          setStateId(stateObj.id);
          const districtsData = await getDistricts(stateObj.id);
          setDistricts(districtsData);
        }
      }
    } catch (error) {
      console.error('Failed to load profile data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStateChange = async (selectedState) => {
    setState(selectedState.name);
    setStateId(selectedState.id);
    setDistrict('');
    setDistrictId('');

    try {
      const districtsData = await getDistricts(selectedState.id);
      setDistricts(districtsData);
    } catch (error) {
      console.error('Failed to load districts:', error);
    }

    setShowStateDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }

    if (!grade) {
      newErrors.grade = 'Grade is required';
    }

    if (!board) {
      newErrors.board = 'Board is required';
    }

    if (!state) {
      newErrors.state = 'State is required';
    }

    if (!district) {
      newErrors.district = 'District is required';
    }

    if (!language) {
      newErrors.language = 'Language is required';
    }

    // At least one of email or mobile is mandatory
    if (!email.trim() && !mobileNumber.trim()) {
      newErrors.emailOrMobile = 'Please provide either an email address or mobile number';
    }

    // Email validation if provided
    if (email && !isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Mobile validation if provided
    if (mobileNumber && !isValidPhoneNumber(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const updateData = {
        name: name,
        school_name: schoolName,
        grade: parseInt(gradeId) || 0,
        board: board,
        state: state,
        district: district,
        language: language,
      };

      // Only include email/mobile if they're being added or modified
      if (email) {
        updateData.email = email;
      }
      if (mobileNumber) {
        updateData.mobile_number = mobileNumber;
      }

      console.log('📝 Update Profile Request:', updateData);

      const updatedProfile = await updateUserProfile(updateData);

      // Store updated user data locally
      await storeUserData(updatedProfile);

      // Update app context
      if (updateUser) {
        updateUser(updatedProfile);
      }

      Alert.alert('Success', 'Profile updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        { text: 'Keep Editing', onPress: () => {} },
        {
          text: 'Discard',
          onPress: () => navigation.goBack(),
          style: 'destructive',
        },
      ]
    );
  };

  // Get label for selected values
  const getGradeLabel = (id) => {
    return grades.find(g => g.id === parseInt(id))?.name || grade;
  };

  const getBoardLabel = (boardName) => {
    return boards.find(b => b.name === boardName)?.name || boardName;
  };

  const getStateLabel = (stateName) => {
    return states.find(s => s.name === stateName)?.name || stateName;
  };

  const getDistrictLabel = (districtName) => {
    return districts.find(d => d.name === districtName)?.name || districtName;
  };

  const getLanguageLabel = (langCode) => {
    return languages.find(l => l.code === langCode)?.name || langCode;
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
            <AppText style={styles.headerTitle}>Profile</AppText>
            <AppText style={styles.headerGreeting}>Edit Information</AppText>
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
          <AppText style={styles.headerTitle}>Profile</AppText>
          <AppText style={styles.headerGreeting}>Edit Information</AppText>
        </View>
      </View>

        {/* Form Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
            {/* PERSONAL INFORMATION SECTION */}
            <AppText style={[styles.sectionTitle, styles.firstSection]}>
              Personal Information
            </AppText>

            {/* Name */}
            <View style={styles.formGroup}>
              <AppText style={styles.label}>Full Name</AppText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#d1d5db"
                  value={name}
                  onChangeText={setName}
                  editable={!isSaving}
                />
              </View>
              {errors.name && <AppText style={styles.errorText}>{errors.name}</AppText>}
            </View>

            {/* Email - Read Only if already set, Editable if not set */}
            {originalEmail ? (
              <View style={styles.formGroup}>
                <AppText style={styles.label}>Email Address</AppText>
                <View style={[styles.inputContainer, styles.inputContainerReadOnly]}>
                  <TextInput
                    style={[styles.input, styles.inputReadOnly]}
                    value={email}
                    editable={false}
                  />
                </View>
                <AppText style={styles.readOnlyLabel}>✓ Email address cannot be changed</AppText>
              </View>
            ) : (
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
            )}

            {/* Mobile - Read Only if already set, Editable if not set */}
            {originalMobileNumber ? (
              <View style={styles.formGroup}>
                <AppText style={styles.label}>Mobile Number</AppText>
                <View style={[styles.inputContainer, styles.inputContainerReadOnly]}>
                  <TextInput
                    style={[styles.input, styles.inputReadOnly]}
                    value={mobileNumber}
                    editable={false}
                  />
                </View>
                <AppText style={styles.readOnlyLabel}>✓ Mobile number cannot be changed</AppText>
              </View>
            ) : (
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
            )}

            {/* Email or Mobile Required Error */}
            {errors.emailOrMobile && (
              <View style={styles.formGroup}>
                <AppText style={styles.errorText}>{errors.emailOrMobile}</AppText>
              </View>
            )}

            {/* SCHOOL INFORMATION SECTION */}
            <AppText style={styles.sectionTitle}>School Information</AppText>

            {/* School Name */}
            <View style={styles.formGroup}>
              <AppText style={styles.label}>School Name</AppText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter school name"
                  placeholderTextColor="#d1d5db"
                  value={schoolName}
                  onChangeText={setSchoolName}
                  editable={!isSaving}
                />
              </View>
              {errors.schoolName && <AppText style={styles.errorText}>{errors.schoolName}</AppText>}
            </View>

            {/* Grade Dropdown */}
            <View style={styles.dropdownWrapper}>
              <AppText style={styles.label}>Grade</AppText>
              <TouchableOpacity
                style={[styles.dropdownButton, errors.grade && styles.dropdownButtonError]}
                onPress={() => !isSaving && setShowGradeDropdown(!showGradeDropdown)}
              >
                <AppText
                  style={[
                    styles.dropdownText,
                    !grade && styles.dropdownPlaceholder,
                  ]}
                >
                  {grade ? getGradeLabel(gradeId) : 'Select Grade'}
                </AppText>
                <Image
                  source={require('../../assets/icons/next.png')}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
              {errors.grade && <AppText style={styles.errorText}>{errors.grade}</AppText>}

              {/* Grade Dropdown Modal */}
              <Modal
                transparent={true}
                visible={showGradeDropdown}
                animationType="slide"
                onRequestClose={() => setShowGradeDropdown(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowGradeDropdown(false)}
                >
                  <View style={styles.modalContent}>
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
                            style={styles.dropdownItem}
                          >
                            <AppText style={styles.dropdownItemText}>{item.name}</AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            {/* Board Dropdown */}
            <View style={styles.dropdownWrapper}>
              <AppText style={styles.label}>Board</AppText>
              <TouchableOpacity
                style={[styles.dropdownButton, errors.board && styles.dropdownButtonError]}
                onPress={() => !isSaving && setShowBoardDropdown(!showBoardDropdown)}
              >
                <AppText
                  style={[
                    styles.dropdownText,
                    !board && styles.dropdownPlaceholder,
                  ]}
                >
                  {board ? getBoardLabel(board) : 'Select Board'}
                </AppText>
                <Image
                  source={require('../../assets/icons/next.png')}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
              {errors.board && <AppText style={styles.errorText}>{errors.board}</AppText>}

              {/* Board Dropdown Modal */}
              <Modal
                transparent={true}
                visible={showBoardDropdown}
                animationType="slide"
                onRequestClose={() => setShowBoardDropdown(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowBoardDropdown(false)}
                >
                  <View style={styles.modalContent}>
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
                            style={styles.dropdownItem}
                          >
                            <AppText style={styles.dropdownItemText}>{item.name}</AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            {/* LOCATION SECTION */}
            <AppText style={styles.sectionTitle}>Location</AppText>

            {/* State Dropdown */}
            <View style={styles.dropdownWrapper}>
              <AppText style={styles.label}>State</AppText>
              <TouchableOpacity
                style={[styles.dropdownButton, errors.state && styles.dropdownButtonError]}
                onPress={() => !isSaving && setShowStateDropdown(!showStateDropdown)}
              >
                <AppText
                  style={[
                    styles.dropdownText,
                    !state && styles.dropdownPlaceholder,
                  ]}
                >
                  {state ? getStateLabel(state) : 'Select State'}
                </AppText>
                <Image
                  source={require('../../assets/icons/next.png')}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
              {errors.state && <AppText style={styles.errorText}>{errors.state}</AppText>}

              {/* State Dropdown Modal */}
              <Modal
                transparent={true}
                visible={showStateDropdown}
                animationType="slide"
                onRequestClose={() => setShowStateDropdown(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowStateDropdown(false)}
                >
                  <View style={styles.modalContent}>
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
                            onPress={() => handleStateChange(item)}
                            style={styles.dropdownItem}
                          >
                            <AppText style={styles.dropdownItemText}>{item.name}</AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            {/* District Dropdown */}
            <View style={styles.dropdownWrapper}>
              <AppText style={styles.label}>District</AppText>
              <TouchableOpacity
                style={[styles.dropdownButton, errors.district && styles.dropdownButtonError]}
                onPress={() => !isSaving && setShowDistrictDropdown(!showDistrictDropdown)}
              >
                <AppText
                  style={[
                    styles.dropdownText,
                    !district && styles.dropdownPlaceholder,
                  ]}
                >
                  {district ? getDistrictLabel(district) : 'Select District'}
                </AppText>
                <Image
                  source={require('../../assets/icons/next.png')}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
              {errors.district && <AppText style={styles.errorText}>{errors.district}</AppText>}

              {/* District Dropdown Modal */}
              <Modal
                transparent={true}
                visible={showDistrictDropdown}
                animationType="slide"
                onRequestClose={() => setShowDistrictDropdown(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowDistrictDropdown(false)}
                >
                  <View style={styles.modalContent}>
                    {districts.length === 0 ? (
                      <View style={{ padding: 16, alignItems: 'center' }}>
                        <AppText>No districts available</AppText>
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
                            style={styles.dropdownItem}
                          >
                            <AppText style={styles.dropdownItemText}>{item.name}</AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            {/* PREFERENCES SECTION */}
            <AppText style={styles.sectionTitle}>Preferences</AppText>

            {/* Language Dropdown */}
            <View style={styles.dropdownWrapper}>
              <AppText style={styles.label}>Language</AppText>
              <TouchableOpacity
                style={[styles.dropdownButton, errors.language && styles.dropdownButtonError]}
                onPress={() => !isSaving && setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <AppText
                  style={[
                    styles.dropdownText,
                    !language && styles.dropdownPlaceholder,
                  ]}
                >
                  {language ? getLanguageLabel(language) : 'Select Language'}
                </AppText>
                <Image
                  source={require('../../assets/icons/next.png')}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
              {errors.language && <AppText style={styles.errorText}>{errors.language}</AppText>}

              {/* Language Dropdown Modal */}
              <Modal
                transparent={true}
                visible={showLanguageDropdown}
                animationType="slide"
                onRequestClose={() => setShowLanguageDropdown(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowLanguageDropdown(false)}
                >
                  <View style={styles.modalContent}>
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
                            style={styles.dropdownItem}
                          >
                            <AppText style={styles.dropdownItemText}>{item.name}</AppText>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons - Fixed Footer */}
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
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
                <AppText style={styles.saveButtonText}>Update Profile</AppText>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
