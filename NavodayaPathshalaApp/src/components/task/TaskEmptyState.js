/**
 * TaskEmptyState Component
 * Displays empty state message when no tasks available
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts } from '../../config/fonts';
import COLORS from '../../config/colors';

const TaskEmptyState = ({ onExplorePress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.title}>No tasks for today</Text>
      <Text style={styles.subtitle}>
        You're all caught up. Try a practice test.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onExplorePress}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Explore Tests</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TaskEmptyState;
