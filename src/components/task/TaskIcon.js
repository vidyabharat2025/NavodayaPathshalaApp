/**
 * TaskIcon Component
 * Displays circular icon for different task types
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskIcon = ({ type = 'lesson', status = 'pending' }) => {
  const getIconStyle = () => {
    switch (type) {
      case 'lesson':
        return styles.lessonIcon;
      case 'topic':
        return styles.topicIcon;
      case 'subject':
        return styles.subjectIcon;
      case 'grade':
        return styles.gradeIcon;
      case 'mock':
        return styles.mockIcon;
      default:
        return styles.lessonIcon;
    }
  };

  const getIconEmoji = () => {
    switch (type) {
      case 'lesson':
        return '📝';
      case 'topic':
        return '🌿';
      case 'subject':
        return '📚';
      case 'grade':
        return '⭐';
      case 'mock':
        return '📖';
      default:
        return '📝';
    }
  };

  return (
    <View style={[styles.iconContainer, getIconStyle()]}>
      <Text style={styles.emoji}>{getIconEmoji()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  lessonIcon: {
    backgroundColor: '#DBEAFE', // Light blue
  },
  topicIcon: {
    backgroundColor: '#DCFCE7', // Light green
  },
  subjectIcon: {
    backgroundColor: '#F3E8FF', // Light purple
  },
  gradeIcon: {
    backgroundColor: '#FEF3C7', // Light yellow
  },
  mockIcon: {
    backgroundColor: '#E9D5FF', // Light purple (darker than subject)
  },
});

export default TaskIcon;
