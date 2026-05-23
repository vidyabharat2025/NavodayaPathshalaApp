/**
 * Sign Up ViewModel
 * MVVM Pattern: Contains business logic for sign up flow
 */

import { useState, useEffect } from 'react';
import { register } from '../../services/authService';
import {
  getGrades,
  getBoards,
  getStates,
  getDistricts,
  getLanguages,
} from '../../services/metadataService';

/**
 * Sign Up ViewModel Hook
 * Manages form state, validation, and API calls
 */
const SignUpViewModel = () => {
  // Step 1 - Create Account
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // Step 2 - Profile Details
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [grade, setGrade] = useState('');
  const [gradeId, setGradeId] = useState('');
  const [board, setBoard] = useState('');
  const [state, setState] = useState('');
  const [stateId, setStateId] = useState('');
  const [district, setDistrict] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [language, setLanguage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Metadata State
  const [grades, setGrades] = useState([]);
  const [boards, setBoards] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  // Load metadata on mount
  useEffect(() => {
    loadMetadata();
  }, []);

  // Load districts when state changes
  useEffect(() => {
    if (stateId) {
      loadDistricts(stateId);
    } else {
      setDistricts([]);
    }
  }, [stateId]);

  /**
   * Load all metadata
   */
  const loadMetadata = async () => {
    setIsLoadingMeta(true);
    try {
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
    } catch (err) {
      console.error('Failed to load metadata:', err);
    } finally {
      setIsLoadingMeta(false);
    }
  };

  /**
   * Load districts for selected state
   */
  const loadDistricts = (selectedStateId) => {
    setIsLoadingDistricts(true);
    setDistricts([]);
    setDistrict('');
    setDistrictId('');
    
    // Use requestAnimationFrame to defer API call after UI renders
    requestAnimationFrame(() => {
      setTimeout(() => {
        getDistricts(selectedStateId)
          .then(districtsData => {
            setDistricts(districtsData);
            setIsLoadingDistricts(false);
          })
          .catch(err => {
            console.error('Failed to load districts:', err);
            setDistricts([]);
            setIsLoadingDistricts(false);
          });
      }, 50);
    });
  };

  /**
   * Validate email format
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate password strength
   */
  const isValidPassword = (password) => {
    return password && password.length >= 6;
  };

  /**
   * Validate phone number (basic)
   */
  const isValidPhoneNumber = (phone) => {
    if (!phone) return true; // Optional field
    // Extract only digits from the phone number
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it has exactly 10 digits
    return digitsOnly.length === 10;
  };

  /**
   * Validate Step 1 - Create Account
   */
  const validateStep1 = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mobileNumber && !isValidPhoneNumber(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Validate Step 2 - Profile Details
   */
  const validateStep2 = () => {
    const newErrors = {};

    if (!dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }

    if (!grade.trim()) {
      newErrors.grade = 'Grade is required';
    }

    if (!board.trim()) {
      newErrors.board = 'Board is required';
    }

    if (!state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!district.trim()) {
      newErrors.district = 'District is required';
    }

    if (!language.trim()) {
      newErrors.language = 'Please select a language';
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle next step (validation + step change)
   */
  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setErrors({});
    }
  };

  /**
   * Handle back to previous step
   */
  const handleBackStep = () => {
    setCurrentStep(1);
    setErrors({});
  };

  /**
   * Handle sign up (complete submission)
   */
  const handleSignUp = async () => {
    if (!validateStep2()) {
      return { error: true, errorMessage: 'Please fill all required fields' };
    }

    setIsLoading(true);
    try {
      // Send all fields matching the API specification
      // Use snake_case to match backend database schema
      const requestBody = {
        name: name,
        email: email,
        password: password,
        mobile_number: mobileNumber,
        language: language,
        dob: dateOfBirth,
        school_name: schoolName,
        grade: parseInt(gradeId) || 0, // Convert to integer
        board: board,
        state: state,
        district: district,
      };

      console.log('📝 SignUp Request:', requestBody);

      // Use authService register which handles storage and response parsing
      const response = await register(requestBody);

      if (response && response.success) {
        setIsLoading(false);
        return {
          success: true,
          user: response.user,
          token: response.token,
        };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setIsLoading(false);
      return {
        error: true,
        errorMessage: error?.response?.data?.message || 'Sign up failed. Please try again.',
      };
    }
  };

  /**
   * Toggle password visibility
   */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Return ViewModel state and actions
  return {
    // Step 1
    name,
    email,
    password,
    mobileNumber,
    showPassword,
    // Step 2
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
    // Metadata
    grades,
    boards,
    states,
    districts,
    languages,
    isLoadingMeta,
    isLoadingDistricts,
    // UI
    isLoading,
    errors,
    currentStep,
    // Actions
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
    handleNextStep,
    handleBackStep,
    handleSignUp,
    validateStep1,
    validateStep2,
  };
};

export default SignUpViewModel;
