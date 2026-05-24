/**
 * Theme Configuration
 * Combines colors, fonts, and spacing into a cohesive theme
 */

import COLORS from './colors';
import FONTS from './fonts';
import SPACING from './spacing';

const THEME = {
  COLORS,
  FONTS,
  SPACING,

  // Light theme (default)
  LIGHT: {
    background: COLORS.WHITE,
    text: COLORS.TEXT_PRIMARY,
    border: COLORS.BORDER,
    placeholder: COLORS.TEXT_DISABLED,
    surface: COLORS.LIGHT_GRAY,
  },

  // Dark theme (for future use)
  DARK: {
    background: COLORS.VERY_DARK_GRAY,
    text: COLORS.WHITE,
    border: COLORS.DARK_GRAY,
    placeholder: COLORS.GRAY,
    surface: COLORS.BLACK,
  },

  // Common shadows
  SHADOWS: {
    SMALL: {
      shadowColor: COLORS.BLACK,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    MEDIUM: {
      shadowColor: COLORS.BLACK,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    LARGE: {
      shadowColor: COLORS.BLACK,
      shadowOffset: { width: 0, height: 7 },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 14,
    },
  },
};

export default THEME;
