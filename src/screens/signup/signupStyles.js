/**
 * Sign Up Screen Styles
 * Reuses design constants from Login Screen for consistency
 */

import { StyleSheet } from 'react-native';
import LoginColors from '../../constants/loginColors';
import LoginTypography from '../../constants/loginTypography';
import LoginSpacing from '../../constants/loginSpacing';

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: LoginColors.backgroundSolid,
  },

  gradientContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: LoginSpacing.screenPaddingHorizontal,
    paddingVertical: LoginSpacing.screenPaddingVertical,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: LoginSpacing.headerMarginBottom,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    fontSize: 24,
    color: LoginColors.textPrimary,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
    ...LoginTypography.label,
    color: LoginColors.textPrimary,
    display: 'none',
  },

  headerPlaceholder: {
    width: 40,
    display: 'none',
  },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: LoginSpacing.md,
    marginBottom: LoginSpacing.inputGroupMarginBottom,
  },

  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  progressDotActive: {
    backgroundColor: LoginColors.accentBlue,
    width: 24,
  },

  progressDotInactive: {
    backgroundColor: LoginColors.borderLight,
  },

  // Section
  headerSection: {
    marginBottom: LoginSpacing.headerMarginBottom,
  },

  mainTitle: {
    ...LoginTypography.title,
    color: LoginColors.textPrimary,
    marginBottom: LoginSpacing.lg,
  },

  subtitle: {
    ...LoginTypography.subtitle,
    color: LoginColors.textSecondary,
  },

  // Form
  formContainer: {
    marginBottom: LoginSpacing.buttonMarginTop,
  },

  inputGroup: {
    marginBottom: LoginSpacing.inputGroupMarginBottom,
  },

  label: {
    ...LoginTypography.label,
    color: LoginColors.textPrimary,
    marginBottom: LoginSpacing.labelMarginBottom,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LoginSpacing.labelMarginBottom,
  },

  labelOptional: {
    ...LoginTypography.label,
    color: LoginColors.textTertiary,
  },

  inputContainer: {
    position: 'relative',
    height: LoginSpacing.inputHeight,
    backgroundColor: LoginColors.white,
    borderRadius: LoginSpacing.inputBorderRadius,
    borderWidth: 1,
    borderColor: LoginColors.borderDefault,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: LoginSpacing.inputPaddingHorizontal,
    shadowColor: LoginColors.shadowColor,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  input: {
    flex: 1,
    fontSize: LoginTypography.inputText.fontSize,
    color: LoginColors.textPrimary,
    paddingVertical: 0,
    marginRight: LoginSpacing.lg,
    fontWeight: LoginTypography.inputText.fontWeight,
  },

  inputPlaceholder: {
    color: LoginColors.textTertiary,
  },

  iconImage: {
    width: LoginSpacing.iconSize,
    height: LoginSpacing.iconSize,
    resizeMode: 'contain',
    marginLeft: LoginSpacing.iconPadding,
  },

  eyeIconContainer: {
    marginLeft: LoginSpacing.iconPadding,
  },

  selectContainer: {
    position: 'relative',
  },

  selectInput: {
    flex: 1,
    fontSize: LoginTypography.inputText.fontSize,
    color: LoginColors.textPrimary,
    fontWeight: LoginTypography.inputText.fontWeight,
  },

  selectIcon: {
    width: LoginSpacing.iconSize,
    height: LoginSpacing.iconSize,
    resizeMode: 'contain',
    marginLeft: LoginSpacing.iconPadding,
  },

  doubleInputRow: {
    flexDirection: 'row',
    gap: LoginSpacing.md,
  },

  doubleInputContainer: {
    flex: 1,
  },

  errorText: {
    ...LoginTypography.errorText,
    color: LoginColors.textError,
    marginTop: LoginSpacing.xs,
  },

  // Checkbox Section
  checkboxSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: LoginSpacing.buttonMarginTop,
    gap: LoginSpacing.md,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: LoginColors.accentBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },

  checkboxChecked: {
    backgroundColor: LoginColors.accentBlue,
  },

  checkboxText: {
    flex: 1,
    ...LoginTypography.label,
    color: LoginColors.textSecondary,
  },

  checkboxLink: {
    color: LoginColors.accentOrange,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  // Button
  buttonContainer: {
    height: LoginSpacing.buttonHeight,
    borderRadius: LoginSpacing.buttonBorderRadius,
    overflow: 'hidden',
    marginTop: LoginSpacing.md,
    marginBottom: LoginSpacing.md,
    shadowColor: LoginColors.accentBlue,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  buttonText: {
    ...LoginTypography.buttonText,
    color: LoginColors.white,
  },

  // Bottom Section
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: LoginSpacing.md,
    gap: LoginSpacing.sm,
  },

  bottomText: {
    ...LoginTypography.label,
    color: LoginColors.textSecondary,
  },

  bottomLink: {
    ...LoginTypography.label,
    fontWeight: 'bold',
    color: LoginColors.accentOrange,
  },

  // Sticky Bottom Section
  stickyBottomSection: {
    backgroundColor: LoginColors.backgroundSolid,
    paddingVertical: LoginSpacing.md,
    borderTopWidth: 1,
    borderTopColor: LoginColors.borderLight,
    paddingBottom: LoginSpacing.lg,
    paddingHorizontal: LoginSpacing.screenPaddingHorizontal,
  },

  // Modal Styles for Dropdowns
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: LoginColors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
    paddingTop: LoginSpacing.md,
  },

  dropdownItem: {
    paddingVertical: LoginSpacing.lg,
    paddingHorizontal: LoginSpacing.screenPaddingHorizontal,
    borderBottomWidth: 1,
    borderBottomColor: LoginColors.borderDefault,
  },

  dropdownItemText: {
    ...LoginTypography.body,
    fontSize: 16,
    color: LoginColors.textPrimary,
  },
});

export default styles;
