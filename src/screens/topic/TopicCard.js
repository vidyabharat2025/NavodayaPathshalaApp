// TopicCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../config/colors';
import { Fonts } from '../../config/fonts';

/**
 * TopicCard Component
 * Displays a topic card with lessons count, progress bar, and metadata
 * Matches SubjectCard design pattern
 */
const TopicCard = ({ 
  name, 
  lessonCount = 0,
  progress = 0, 
  color = '#2563EB',
  onPress 
}) => {
  const progressPercent = Math.round(progress * 100);
  const progressText = progressPercent > 0 ? `${progressPercent}%` : 'Start';

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onPress}
    > 
      <View style={styles.card}>
        {/* Header Row: Icon, Title/Subtitle, Progress Pill */}
        <View style={styles.headerRow}>
          {/* Circular Icon */}
          <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
            <Text style={[styles.iconText, { color }]}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>

          {/* Title and Subtitle */}
          <View style={styles.titleSection}>
            <Text style={styles.title} numberOfLines={2}>
              {name}
            </Text>
            <Text style={styles.subtitle}>
              {lessonCount} {lessonCount === 1 ? 'Lesson' : 'Lessons'}
            </Text>
          </View>

          {/* Progress Pill */}
          <View style={[styles.progressPill, { backgroundColor: `${color}10` }]}>
            <Text style={[styles.progressPillText, { color }]}>
              {progressText}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarTrack}>
            <View 
              style={[
                styles.progressBarFill,
                { 
                  width: `${Math.min(progressPercent, 100)}%`,
                  backgroundColor: color
                }
              ]} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  iconText: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: Fonts.bold,
  },

  titleSection: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.semiBold,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
    lineHeight: 22,
  },

  subtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 16,
  },

  progressPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  progressPillText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },

  progressBarContainer: {
    width: '100%',
  },

  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: 6,
    borderRadius: 3,
  },
});

export default TopicCard;
