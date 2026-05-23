/**
 * Edit Profile Screen Styles
 * Matching standard header design from other screens
 */

import { StyleSheet } from 'react-native';
import COLORS from '../../config/colors';
import FONTS from '../../config/fonts';

const editProfileStyles = StyleSheet.create({
  // ========== SCREEN CONTAINER ==========
  screenContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  // ========== STANDARD HEADER ==========
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },

  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  backArrowIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#4f46e5',
  },

  headerTextContent: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: FONTS.FAMILY.BOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
    lineHeight: 20,
  },

  headerGreeting: {
    fontSize: 12,
    fontFamily: FONTS.FAMILY.REGULAR,
    color: COLORS.TEXT_DISABLED,
    lineHeight: 16,
  },

  scrollContent: {
    paddingBottom: 32,
  },

  // ========== FORM CARD ==========
  formCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: FONTS.FAMILY.BOLD,
    color: '#9ca3af',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 14,
    marginTop: 14,
  },

  firstSection: {
    marginTop: 0,
  },

  formGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONTS.FAMILY.SEMI_BOLD,
    color: COLORS.TEXT_DISABLED,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },

  inputContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 14,
    height: 44,
    justifyContent: 'center',
  },

  inputContainerError: {
    borderColor: '#fca5a5',
    backgroundColor: '#fef2f2',
  },

  inputContainerReadOnly: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
  },

  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: FONTS.FAMILY.REGULAR,
    color: COLORS.TEXT_PRIMARY,
    padding: 0,
  },

  inputReadOnly: {
    color: '#9ca3af',
  },

  inputPlaceholder: {
    color: '#d1d5db',
  },

  errorText: {
    fontSize: 12,
    fontFamily: FONTS.FAMILY.REGULAR,
    color: '#dc2626',
    marginTop: 6,
    letterSpacing: 0.2,
  },

  readOnlyLabel: {
    fontSize: 12,
    fontFamily: FONTS.FAMILY.REGULAR,
    color: '#9ca3af',
    marginTop: 6,
  },

  // ========== DROPDOWN SECTION ==========
  dropdownWrapper: {
    marginBottom: 14,
  },

  dropdownButton: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 14,
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  dropdownButtonError: {
    borderColor: '#fca5a5',
    backgroundColor: '#fef2f2',
  },

  dropdownText: {
    fontSize: 15,
    fontFamily: FONTS.FAMILY.REGULAR,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },

  dropdownPlaceholder: {
    color: '#d1d5db',
  },

  dropdownIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#4f46e5',
  },

  dropdownList: {
    marginTop: 6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    justifyContent: 'center',
  },

  dropdownItemLast: {
    borderBottomWidth: 0,
  },

  dropdownItemText: {
    fontSize: 16,
    fontFamily: FONTS.FAMILY.REGULAR,
    color: COLORS.TEXT_PRIMARY,
  },

  dropdownItemSelected: {
    backgroundColor: '#eef2ff',
  },

  dropdownItemSelectedText: {
    color: '#4f46e5',
    fontFamily: FONTS.FAMILY.SEMI_BOLD,
  },

  // ========== ACTION BUTTONS ==========
  footerButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },

  saveButton: {
    height: 56,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#4f46e5',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  saveButtonGradient: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.FAMILY.SEMI_BOLD,
    color: '#ffffff',
    letterSpacing: 0.3,
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  // ========== MODAL DROPDOWN ==========
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
    paddingTop: 12,
  },

  // ========== PASSWORD VERIFICATION MODAL ==========
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FONTS.FAMILY.BOLD,
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },

  modalSubtitle: {
    fontSize: 13,
    fontFamily: FONTS.FAMILY.REGULAR,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 18,
  },

  modalInputContainer: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    marginBottom: 12,
  },

  passwordEyeIcon: {
    padding: 8,
    marginLeft: 8,
  },

  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#6b7280',
  },

  modalButtonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },

  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCancelButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
  },

  modalCancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS.FAMILY.SEMIBOLD,
    color: '#374151',
  },

  modalConfirmButton: {
    backgroundColor: '#4f46e5',
  },

  modalConfirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS.FAMILY.SEMIBOLD,
    color: '#ffffff',
  },

  // ========== LOADING STATE ==========
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default editProfileStyles;
