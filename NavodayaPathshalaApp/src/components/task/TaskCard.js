/**
 * TaskCard Component
 * Displays a single task/test card with icon, title, details, and status
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts } from '../../config/fonts';
import COLORS from '../../config/colors';
import TaskIcon from './TaskIcon';
import TaskStatusPill from './TaskStatusPill';

const TaskCard = ({
  id,
  title,
  subtitle,
  description,
  questionsCount = 10,
  duration = 10,
  status = 'pending', // 'pending', 'completed', 'locked'
  type = 'lesson', // 'lesson', 'topic', 'subject', 'grade', 'mock'
  onPress,
  disabled = false,
}) => {
  const handlePress = () => {
    if (!disabled && status !== 'locked' && onPress) {
      onPress({ id, title, subtitle, type, status });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, disabled || status === 'locked' ? styles.cardDisabled : {}]}
      onPress={handlePress}
      disabled={disabled || status === 'locked'}
      activeOpacity={0.7}
    >
      {/* Left: Icon */}
      <View style={styles.iconContainer}>
        <TaskIcon type={type} status={status} />
      </View>

      {/* Center: Text Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            {questionsCount} questions • {duration} mins
          </Text>
        </View>
      </View>

      {/* Right: Status */}
      <View style={styles.statusContainer}>
        <TaskStatusPill status={status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BG_PRIMARY,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardDisabled: {
    opacity: 0.7,
  },
  iconContainer: {
    marginRight: 14,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 6,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 16,
  },
  statusContainer: {
    marginLeft: 12,
  },
});

export default TaskCard;
