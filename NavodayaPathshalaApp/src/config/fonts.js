/**
 * Font Configuration
 * Centralized font family and size definitions
 * Using Inter custom fonts from assets/fonts/Inter/static
 */

export const Fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  italic: 'Inter-Italic',
  mediumItalic: 'Inter-MediumItalic',
  semiBoldItalic: 'Inter-SemiBoldItalic',
  boldItalic: 'Inter-BoldItalic',
};

const FONTS = {
  // Font families
  FAMILY: {
    REGULAR: Fonts.regular,
    BOLD: Fonts.bold,
    SEMI_BOLD: Fonts.semiBold,
    ITALIC: Fonts.italic,
    MEDIUM: Fonts.medium,
    MEDIUM_ITALIC: Fonts.mediumItalic,
    SEMI_BOLD_ITALIC: Fonts.semiBoldItalic,
    BOLD_ITALIC: Fonts.boldItalic,
  },

  // Font sizes
  SIZE: {
    EXTRA_SMALL: 10,
    SMALL: 12,
    BODY: 14,
    SUBTITLE: 16,
    TITLE: 18,
    HEADING: 20,
    LARGE: 24,
    EXTRA_LARGE: 32,
  },

  // Font weights
  WEIGHT: {
    REGULAR: '400',
    MEDIUM: '500',
    SEMI_BOLD: '600',
    BOLD: '700',
  },

  // Line heights
  LINE_HEIGHT: {
    TIGHT: 1.2,
    NORMAL: 1.5,
    RELAXED: 1.75,
    LOOSE: 2,
  },

  // Predefined text styles
  STYLES: {
    CAPTION: {
      fontFamily: Fonts.regular,
      fontSize: 10,
      fontWeight: '400',
      lineHeight: 14,
    },
    SMALL: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    BODY: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21,
    },
    SUBTITLE: {
      fontFamily: Fonts.medium,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    TITLE: {
      fontFamily: Fonts.semiBold,
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 27,
    },
    HEADING: {
      fontFamily: Fonts.semiBold,
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 30,
    },
    LARGE: {
      fontFamily: Fonts.bold,
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 36,
    },
  },
};

export default FONTS;
