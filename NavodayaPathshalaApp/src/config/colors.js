/**
 * Color Palette
 * Centralized color definitions for consistent theming
 */

export const Colors = {
  // Primary colors
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  primaryLight: '#DBEAFE',

  // Secondary colors
  secondary: '#16A34A',
  secondaryLight: '#DCFCE7',

  // Semantic colors
  accent: '#F59E0B',
  error: '#DC2626',
  errorLight: '#FEE2E2',

  // Text colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textDisabled: '#9CA3AF',

  // Background colors
  background: '#F9FAFB',
  card: '#FFFFFF',
  border: '#E5E7EB',
};

// Vibrant gradient colors for modern UI
export const GradientColors = {
  // Purple/Pink gradient
  purplePink: ['#9333ea', '#ec4899'],
  
  // Blue gradient
  blue: ['#3b82f6', '#2563eb'],
  
  // Green gradient
  green: ['#10b981', '#059669'],
  
  // Orange gradient
  orange: ['#f59e0b', '#ea580c'],
  
  // Additional gradients for variety
  blueDeep: ['#2563eb', '#1e40af'],
  greenLight: ['#34d399', '#10b981'],
  pinkLight: ['#f472b6', '#ec4899'],
};

// Alias for backward compatibility with theme system
const COLORS = {
  PRIMARY: Colors.primary,
  PRIMARY_DARK: Colors.primaryDark,
  PRIMARY_LIGHT: Colors.primaryLight,

  SECONDARY: Colors.secondary,
  SECONDARY_LIGHT: Colors.secondaryLight,

  ACCENT: Colors.accent,
  ERROR: Colors.error,
  ERROR_LIGHT: Colors.errorLight,

  TEXT_PRIMARY: Colors.textPrimary,
  TEXT_SECONDARY: Colors.textSecondary,
  TEXT_DISABLED: Colors.textDisabled,
  TEXT_WHITE: '#FFFFFF',

  BG_PRIMARY: Colors.card,
  BG_SECONDARY: Colors.background,
  BG_TERTIARY: '#EEEEEE',
  BR_LIGHT_GREY: '#f9fafb',
  BORDER: Colors.border,
  BORDER_LIGHT: '#F0F0F0',

  OVERLAY_DARK: 'rgba(0, 0, 0, 0.5)',
  OVERLAY_LIGHT: 'rgba(255, 255, 255, 0.5)',

  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  BLACK: '#000000',

  // Purple colors for progress and buttons
  PURPLE_PRIMARY: '#6D28D9',
  PURPLE_MEDIUM: '#6b5e8e',
  PURPLE_LIGHT: '#EDE9FE',
  PURPLE_VERY_LIGHT: '#F3E8FF',
  
  // Vibrant colors for modern gradient UI
  // Purple/Pink
  PURPLE_VIBRANT: '#9333ea',
  PINK_VIBRANT: '#ec4899',
  
  // Blue shades
  BLUE_BRIGHT: '#3b82f6',
  BLUE_DARK: '#2563eb',
  BLUE_DEEP: '#1e40af',
  
  // Green shades
  GREEN_VIBRANT: '#10b981',
  GREEN_DARK: '#059669',
  GREEN_LIGHT: '#34d399',
  
  // Orange shades
  ORANGE_VIBRANT: '#f59e0b',
  ORANGE_DARK: '#ea580c',
  
  // Status colors
  RED: '#dc2626',
  YELLOW: '#f59e0b',
  SUCCESS: '#10b981',
};

export default COLORS;
