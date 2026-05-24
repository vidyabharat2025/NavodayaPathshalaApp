// LessonCard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './lessonListStyles';

/**
 * LessonCard Component
 * Displays lesson with status (completed, in-progress, not-started)
 */
const LessonCard = ({
  lessonNumber = 1,
  title,
  status = 'notstarted',
  onPress,
}) => {
  const getIconBgColor = () => {
    switch (status) {
      case 'completed':
        return '#D1FAE5';
      case 'inprogress':
        return '#EDE9FE';
      default:
        return '#F3F4F6';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'inprogress':
        return '▶';
      default:
        return '▶';
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'completed':
        return '#059669';
      case 'inprogress':
        return '#6C4DFF';
      default:
        return '#9CA3AF';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'COMPLETED';
      case 'inprogress':
        return 'IN PROGRESS';
      default:
        return 'NOT STARTED';
    }
  };

  const getStatusStyle = () => {
    switch (status) {
      case 'completed':
        return styles.statusTagCompleted;
      case 'inprogress':
        return styles.statusTagInProgress;
      default:
        return styles.statusTagNotStarted;
    }
  };

  const getRightIcon = () => {
    return status === 'completed' ? '↻' : '→';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.card}
    >
      {/* Left Icon Container */}
      <View
        style={[
          styles.cardIconContainer,
          { backgroundColor: getIconBgColor() },
        ]}
      >
        <Text style={{ fontSize: 18, color: getIconColor(), fontWeight: '600' }}>
          {getIcon()}
        </Text>
      </View>

      {/* Center Content */}
      <View style={styles.cardContent}>
        {/* Lesson Number and Title */}
        <Text style={styles.cardTitleRow} numberOfLines={2}>
          {lessonNumber}. {title}
        </Text>

        {/* Status Tag */}
        <Text style={[styles.statusTag, getStatusStyle()]}>
          {getStatusText()}
        </Text>
      </View>

      {/* Right Icon */}
      <Text style={styles.rightIcon}>
        {getRightIcon()}
      </Text>
    </TouchableOpacity>
  );
};

export default LessonCard;
