/**
 * Spacing Constants
 * Centralized spacing values for consistent margins and padding
 */

const SPACING = {
  // Base spacing unit (8px)
  UNIT: 8,

  // Predefined spacing values (multiples of 8)
  XS: 4, // 0.5x
  SMALL: 8, // 1x
  MEDIUM: 16, // 2x
  LARGE: 24, // 3x
  XL: 32, // 4x
  XXL: 48, // 6x
  XXXL: 64, // 8x

  // Custom spacing
  SCREEN_HORIZONTAL: 16,
  SCREEN_VERTICAL: 16,
  COMPONENT_PADDING: 16,
  COMPONENT_MARGIN: 16,

  // Border radius
  RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
    XL: 16,
    FULL: 999,
  },

  // Specific use cases
  BUTTON: {
    PADDING_VERTICAL: 12,
    PADDING_HORIZONTAL: 16,
    BORDER_RADIUS: 8,
    HEIGHT: 48,
  },

  INPUT: {
    PADDING_VERTICAL: 12,
    PADDING_HORIZONTAL: 12,
    BORDER_RADIUS: 8,
    HEIGHT: 48,
    MARGIN_BOTTOM: 16,
  },

  CARD: {
    PADDING: 16,
    MARGIN_BOTTOM: 16,
    BORDER_RADIUS: 12,
  },
};

export default SPACING;
