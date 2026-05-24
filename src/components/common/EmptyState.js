// EmptyState.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../config/colors';
import { Fonts } from '../../config/fonts';
import SPACING from '../../config/spacing';

/**
 * EmptyState Component
 * Reusable component for displaying empty states, no data, or error states
 * Can be used across multiple screens
 */
const EmptyState = ({
  type = 'empty', // 'empty' | 'error'
  title = 'No Data Available',
  message = 'There is no data to display right now',
  icon = '📭',
  actionText = null,
  onAction = null,
  style = {},
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return '⚠️';
      case 'empty':
      default:
        return icon;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'error':
        return 'Something Went Wrong';
      case 'empty':
      default:
        return title;
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'error':
        return 'We encountered an error loading your data. Please try again.';
      case 'empty':
      default:
        return message;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>{getIcon()}</Text>
      
      <Text style={styles.title}>{getDefaultTitle()}</Text>
      
      <Text style={styles.message}>{getDefaultMessage()}</Text>

      {actionText && onAction && (
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={onAction}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.SCREEN_HORIZONTAL,
    paddingVertical: SPACING.LARGE,
  },

  icon: {
    fontSize: 64,
    marginBottom: SPACING.LARGE,
  },

  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: SPACING.SMALL,
    textAlign: 'center',
  },

  message: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.LARGE,
    maxWidth: '85%',
  },

  actionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: SPACING.SMALL,
  },

  actionButtonText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default EmptyState;
