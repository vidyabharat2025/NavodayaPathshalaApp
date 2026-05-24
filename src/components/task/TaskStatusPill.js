/**
 * TaskStatusPill Component
 * Displays status indicator (Pending, Completed, or Locked)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts } from '../../config/fonts';
import COLORS from '../../config/colors';

const TaskStatusPill = ({ status = 'pending' }) => {
  const getPillStyle = () => {
    switch (status) {
      case 'pending':
        return styles.pendingPill;
      case 'completed':
        return styles.completedPill;
      case 'locked':
        return styles.lockedPill;
      default:
        return styles.pendingPill;
    }
  };

  const getPillTextStyle = () => {
    switch (status) {
      case 'pending':
        return styles.pendingText;
      case 'completed':
        return styles.completedText;
      case 'locked':
        return styles.lockedText;
      default:
        return styles.pendingText;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'locked':
        return '🔒';
      default:
        return 'Pending';
    }
  };

  if (status === 'locked') {
    return (
      <View style={styles.lockContainer}>
        <Text style={styles.lockIcon}>{getStatusLabel()}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.pill, getPillStyle()]}>
      <Text style={[styles.pillText, getPillTextStyle()]}>
        {getStatusLabel()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  pendingPill: {
    backgroundColor: '#FEF3C7',
  },
  pendingText: {
    color: '#D97706',
  },
  completedPill: {
    backgroundColor: '#D1FAE5',
  },
  completedText: {
    color: '#059669',
  },
  lockedPill: {
    backgroundColor: 'transparent',
  },
  lockedText: {
    color: COLORS.TEXT_DISABLED,
  },
  lockContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 18,
  },
});

export default TaskStatusPill;
