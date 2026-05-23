// SubjectCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../config/colors';
import { Fonts } from '../../config/fonts';

/**
 * SubjectCard Component
 * Displays a subject card with icon, progress bar, and metadata
 * Matches the new design specifications
 */
const SubjectCard = ({ 
  name, 
  totalTopics = 0,
  progressPercentage = 0, 
  color = '#DC2626',
  onPress 
}) => {
  // Map subject names to progress bar colors
  const getProgressColor = () => {
    const nameUpper = name.toUpperCase();
    const colorMap = {
      'MATHEMATICS': '#3B82F6',
      'MATH': '#3B82F6',
      'SCIENCE': '#10B981',
      'ENGLISH': '#F59E0B',
      'HISTORY': '#A855F7',
      'GEOGRAPHY': '#06B6D4',
      'ART': '#F87171',
      'ART & DESIGN': '#F87171',
    };
    return colorMap[nameUpper] || color;
  };

  const progressColor = getProgressColor();
  const progressText = `${Math.round(progressPercentage)}%`;

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onPress}
    > 
      <View style={styles.card}>
        {/* Header Row: Icon, Title/Subtitle, Progress Pill */}
        <View style={styles.headerRow}>
          {/* Circular Icon */}
          <View style={[styles.iconContainer, { backgroundColor: `${progressColor}15` }]}>
            <Text style={[styles.iconText, { color: progressColor }]}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>

          {/* Title and Subtitle */}
          <View style={styles.titleSection}>
            <Text style={styles.title} numberOfLines={2}>
              {name}
            </Text>
            <Text style={styles.subtitle}>
              {totalTopics} {totalTopics === 1 ? 'Topic' : 'Topics'}
            </Text>
          </View>

          {/* Progress Pill */}
          <View style={styles.progressPill}>
            <Text style={[styles.progressPillText, { color: progressColor }]}>
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
                  width: `${Math.min(progressPercentage, 100)}%`,
                  backgroundColor: progressColor
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
    backgroundColor: '#F0F4FF',
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

export default SubjectCard;
