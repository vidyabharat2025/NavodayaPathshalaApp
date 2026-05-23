/**
 * Route Constants
 * Centralized route/screen names
 */

const ROUTES = {
  // Auth stack
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    FORGOT_PASSWORD: 'ForgotPassword',
    RESET_PASSWORD: 'ResetPassword',
  },

  // App stack
  APP: {
    HOME: 'Home',
    SUBJECT: 'Subject',
    TASK: 'Task',
    PROFILE: 'Profile',
    SCHOOL_MANAGEMENT: 'SchoolManagement',
    STUDENT_MANAGEMENT: 'StudentManagement',
    CLASS_MANAGEMENT: 'ClassManagement',
    SETTINGS: 'Settings',
    ABOUT: 'About',
  },

  // Profile screens
  PROFILE: {
    MAIN: 'ProfileMain',
    EDIT: 'EditProfile',
    ACCOUNT_SETTINGS: 'AccountSettings',
    CHANGE_PASSWORD: 'ChangePassword',
    LEGAL: 'LegalContent',
  },

  // Detail screens
  DETAILS: {
    SCHOOL_DETAIL: 'SchoolDetail',
    STUDENT_DETAIL: 'StudentDetail',
    CLASS_DETAIL: 'ClassDetail',
  },

  // Modal screens
  MODALS: {
    ADD_SCHOOL: 'AddSchool',
    EDIT_SCHOOL: 'EditSchool',
    ADD_STUDENT: 'AddStudent',
    EDIT_STUDENT: 'EditStudent',
    ADD_CLASS: 'AddClass',
    EDIT_CLASS: 'EditClass',
  },
};

export default ROUTES;
