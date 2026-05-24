/**
 * User Response Model
 * Represents the user data received from signup/login API responses
 */

/**
 * User Response from API
 * @typedef {Object} UserResponse
 * @property {number} id - User ID
 * @property {string} uuid - User UUID
 * @property {string} name - Full name
 * @property {string} email - Email address
 * @property {string} mobileNumber - Mobile number
 * @property {string} role - User role (e.g., 'student', 'teacher')
 * @property {string} language - Preferred language
 * @property {number} grade - Grade/Class level
 * @property {string} board - School board (e.g., 'CBSE')
 * @property {string} schoolName - School name
 * @property {string} state - State name
 * @property {string} district - District name
 * @property {string} [password] - Password (only in signup response, not stored)
 * @property {string} [dob] - Date of birth
 * @property {string} [createdAt] - Account creation timestamp
 * @property {string} [updatedAt] - Last update timestamp
 */

/**
 * Create a user model instance
 * @param {Object} data - Raw response data from API
 * @returns {UserResponse}
 */
const createUserResponse = (data) => {
  if (!data) return null;

  return {
    id: data.id,
    uuid: data.uuid,
    name: data.name,
    email: data.email,
    mobileNumber: data.mobileNumber,
    role: data.role || 'student',
    language: data.language,
    grade: data.grade,
    board: data.board,
    schoolName: data.schoolName,
    state: data.state,
    district: data.district,
    dob: data.dob,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

/**
 * Extract storable user data (exclude sensitive fields)
 * @param {UserResponse} user
 * @returns {Object} User data safe to store
 */
const getStorableUserData = (user) => {
  if (!user) return null;

  const { ...userData } = user;
  // Ensure password is never stored
  delete userData.password;

  return userData;
};

/**
 * Validate user response has required fields
 * @param {UserResponse} user
 * @returns {boolean}
 */
const isValidUserResponse = (user) => {
  if (!user) return false;

  return (
    user.id &&
    user.uuid &&
    user.email &&
    user.name &&
    user.role
  );
};

export {
  createUserResponse,
  getStorableUserData,
  isValidUserResponse,
};
