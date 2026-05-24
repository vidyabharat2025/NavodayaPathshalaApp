/**
 * AppButton Component
 * Reusable button with theme styling
 */

import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import AppText from './AppText';
import THEME from '../../config/theme';
import { Colors } from '../../config/colors';
import { Fonts } from '../../config/fonts';

const COLORS = THEME.COLORS;
const SPACING = THEME.SPACING;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.BUTTON.PADDING_VERTICAL,
    paddingHorizontal: SPACING.BUTTON.PADDING_HORIZONTAL,
    borderRadius: 28,
    minHeight: 56,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  primaryPressed: {
    backgroundColor: Colors.primaryDark,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  success: {
    backgroundColor: Colors.secondary,
  },
  warning: {
    backgroundColor: Colors.accent,
  },
  error: {
    backgroundColor: Colors.error,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  outlineSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.secondary,
  },
  text: {
    marginLeft: 8,
  },
  disabled: {
    backgroundColor: Colors.textDisabled,
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 36,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
  },
});

/**
 * AppButton Component
 * @param {function} onPress - Callback when button is pressed
 * @param {string} title - Button text
 * @param {string} variant - Button style (primary, secondary, success, warning, error, outline)
 * @param {boolean} disabled - Disable button
 * @param {boolean} loading - Show loading indicator
 * @param {boolean} fullWidth - Make button full width
 * @param {string} size - Button size (small, medium, large)
 * @param {object} style - Additional custom styles
 */
const AppButton = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  size = 'medium',
  icon = null,
  style,
  ...props
}) => {
  const [pressed, setPressed] = useState(false);
  const isDisabled = disabled || loading;

  const variantStyle = [
    styles[variant] || styles.primary,
    pressed && variant === 'primary' && styles.primaryPressed,
    isDisabled && styles.disabled,
  ];

  const sizeStyle = size === 'small' ? styles.small : size === 'large' ? styles.large : null;

  const widthStyle = fullWidth ? styles.fullWidth : null;

  const isOutline = variant === 'outline' || variant === 'outlineSecondary';
  const textColor = isDisabled
    ? Colors.textDisabled
    : isOutline
    ? variant === 'outline'
      ? Colors.primary
      : Colors.secondary
    : '#FFFFFF';

  return (
    <TouchableOpacity
      style={[styles.container, variantStyle, sizeStyle, widthStyle, style]}
      onPress={onPress}
      onPressIn={() => !isDisabled && setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
          <AppText
            variant="subtitle"
            color={isDisabled ? 'Disabled' : isOutline ? 'Primary' : 'White'}
            font="bold"
            style={icon ? styles.text : null}
          >
            {title}
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
