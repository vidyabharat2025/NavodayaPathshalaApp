/**
 * Login Screen Styles
 */

import { StyleSheet } from 'react-native';
import THEME from '../../config/theme';
import LoginColors from '../../constants/loginColors';
import LoginTypography from '../../constants/loginTypography';
import LoginSpacing from '../../constants/loginSpacing';

const COLORS = THEME.COLORS;

const styles = StyleSheet.create({
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

  // Header Section
  headerSection: {
    marginBottom: LoginSpacing.headerMarginBottom,
    alignItems: 'center',
    marginTop: LoginSpacing.headerMarginTop,
  },
  mainTitle: {
    fontSize: LoginTypography.title.fontSize,
    fontWeight: LoginTypography.title.fontWeight,
    lineHeight: LoginTypography.title.lineHeight,
    color: LoginColors.textPrimary,
    marginBottom: LoginSpacing.xl,
    textAlign: 'center',
    letterSpacing: LoginTypography.title.letterSpacing,
  },
  subtitle: {
    fontSize: LoginTypography.subtitle.fontSize,
    fontWeight: LoginTypography.subtitle.fontWeight,
    lineHeight: LoginTypography.subtitle.lineHeight,
    color: LoginColors.textSecondary,
    textAlign: 'center',
  },

  // Form Container
  formContainer: {
    marginBottom: LoginSpacing.formMarginBottom,
  },
  inputGroup: {
    marginBottom: LoginSpacing.inputGroupMarginBottom,
  },
  label: {
    marginBottom: LoginSpacing.labelMarginBottom,
    color: LoginColors.textPrimary,
    fontSize: LoginTypography.label.fontSize,
    fontWeight: LoginTypography.label.fontWeight,
    lineHeight: LoginTypography.label.lineHeight,
    letterSpacing: LoginTypography.label.letterSpacing,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: LoginColors.borderDefault,
    borderRadius: LoginSpacing.inputBorderRadius,
    paddingHorizontal: LoginSpacing.inputPaddingHorizontal,
    height: LoginSpacing.inputHeight,
    backgroundColor: LoginColors.white,
    shadowColor: LoginColors.shadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
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
  iconImage: {
    width: LoginSpacing.iconSize,
    height: LoginSpacing.iconSize,
    resizeMode: 'contain',
  },
  eyeIconContainer: {
    padding: LoginSpacing.iconPadding,
  },

  // Error & Forgot Password
  errorText: {
    color: LoginColors.textError,
    fontSize: LoginTypography.errorText.fontSize,
    marginTop: LoginSpacing.lg,
    fontWeight: LoginTypography.errorText.fontWeight,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: LoginSpacing.forgotPasswordMarginBottom,
    marginTop: LoginSpacing.forgotPasswordMarginTop,
    paddingVertical: LoginSpacing.lg,
  },
  forgotPasswordText: {
    color: LoginColors.accentOrange,
    fontSize: LoginTypography.linkText.fontSize,
    fontWeight: LoginTypography.linkText.fontWeight,
    lineHeight: LoginTypography.linkText.lineHeight,
    letterSpacing: LoginTypography.linkText.letterSpacing,
  },

  // Button Styles
  buttonContainer: {
    marginBottom: 0,
    marginTop: LoginSpacing.buttonMarginTop,
    height: LoginSpacing.buttonHeight,
    borderRadius: LoginSpacing.buttonBorderRadius,
    overflow: 'hidden',
    shadowColor: LoginColors.accentBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },

  // Sign Up Section
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: LoginSpacing.signupPaddingHorizontal,
    paddingVertical: LoginSpacing.signupPaddingVertical,
  },
  signupLink: {
    color: LoginColors.accentOrange,
    fontWeight: '800',
    fontSize: LoginTypography.linkText.fontSize,
    letterSpacing: LoginTypography.linkText.letterSpacing,
  },

  // Solid Color Section
  solidColorSection: {
    flex: 0,
    backgroundColor: LoginColors.backgroundSolid,
    paddingHorizontal: LoginSpacing.signupSectionPaddingHorizontal,
    paddingVertical: LoginSpacing.signupSectionPaddingVertical,
    justifyContent: 'flex-end',
  },

  // Students Image Section
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: LoginSpacing['3xl'],
    height: 164,
  },
  studentImage: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
