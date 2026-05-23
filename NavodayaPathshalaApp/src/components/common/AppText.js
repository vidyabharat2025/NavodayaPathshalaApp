/**
 * AppText Component
 * Wrapper component for text with consistent styling
 */

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import THEME from '../../config/theme';
import { Fonts } from '../../config/fonts';
import { Colors } from '../../config/colors';

const COLORS = THEME.COLORS;
const FONT_SIZES = THEME.FONTS;

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  caption: {
    ...FONT_SIZES.STYLES.CAPTION,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  small: {
    ...FONT_SIZES.STYLES.SMALL,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  body: {
    ...FONT_SIZES.STYLES.BODY,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...FONT_SIZES.STYLES.SUBTITLE,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
  title: {
    ...FONT_SIZES.STYLES.TITLE,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  heading: {
    ...FONT_SIZES.STYLES.HEADING,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  large: {
    ...FONT_SIZES.STYLES.LARGE,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
  },
  textWhite: {
    color: '#FFFFFF',
  },
  textPrimary: {
    color: Colors.primary,
  },
  textSecondary: {
    color: Colors.textSecondary,
  },
  textDisabled: {
    color: Colors.textDisabled,
  },
  textError: {
    color: Colors.error,
  },
  textSuccess: {
    color: Colors.secondary,
  },
  textCenter: {
    textAlign: 'center',
  },
  regular: {
    fontFamily: Fonts.regular,
  },
  medium: {
    fontFamily: Fonts.medium,
  },
  semiBold: {
    fontFamily: Fonts.semiBold,
  },
  bold: {
    fontFamily: Fonts.bold,
  },
});

/**
 * AppText Component
 * @param {string} variant - Text style variant (caption, small, body, subtitle, title, heading, large)
 * @param {string} color - Text color variant (white, secondary, disabled, error, success)
 * @param {string} font - Font variant (regular, medium, semiBold, bold)
 * @param {boolean} center - Center text
 * @param {object} style - Additional custom styles
 * @param {string} children - Text content
 */
const AppText = ({
  variant = 'body',
  color,
  font = 'regular',
  center = false,
  style,
  children,
  ...props
}) => {
  const variantStyle = styles[variant] || styles.body;

  const colorStyle = color ? styles[`text${color.charAt(0).toUpperCase() + color.slice(1)}`] : null;

  const fontStyle = styles[font] || styles.regular;

  const alignStyle = center ? styles.textCenter : null;

  return (
    <Text
      style={[
        styles.text,
        variantStyle,
        fontStyle,
        colorStyle,
        alignStyle,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default AppText;
