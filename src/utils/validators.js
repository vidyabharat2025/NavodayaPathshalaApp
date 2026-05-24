/**
 * Validators Utility
 * Common validation functions for forms
 */

/**
 * Validate email format
 */
const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
const validatePassword = password => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate phone number (10-15 digits)
 */
const validatePhone = phone => {
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Validate Indian mobile number (10 digits, starts with 6-9)
 */
const validateIndianMobileNumber = phone => {
  const cleanPhone = phone.replace(/\D/g, '');
  const indianMobileRegex = /^[6-9]\d{9}$/;
  return indianMobileRegex.test(cleanPhone);
};

/**
 * Validate email or Indian mobile number
 */
const validateEmailOrMobile = value => {
  return validateEmail(value) || validateIndianMobileNumber(value);
};

/**
 * Validate required field
 */
const validateRequired = value => {
  return value != null && value.toString().trim().length > 0;
};

/**
 * Validate minimum length
 */
const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

/**
 * Validate maximum length
 */
const validateMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength;
};

/**
 * Validate URL format
 */
const validateURL = url => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validate number range
 */
const validateNumberRange = (value, min, max) => {
  const num = Number(value);
  return num >= min && num <= max;
};

export {
  validateEmail,
  validatePassword,
  validatePhone,
  validateIndianMobileNumber,
  validateEmailOrMobile,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateURL,
  validateNumberRange,
};
