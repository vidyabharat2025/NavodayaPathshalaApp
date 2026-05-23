// ContinueLearningCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import COLORS, { GradientColors } from '../../config/colors';

const ContinueLearningCard = ({
  subject = 'SCIENCE',
  title = 'Biology: Photosynthesis',
  subtext = 'Lesson 4 • Plant Systems',
  progress = 60,
  image = '🍃',
  buttonText = 'Resume Lesson',
  onPress = () => {},
}) => {
  const handlePressIn = () => {
    // Animatable has built-in press handling via Interaction manager
  };

  return (
    <Animatable.View 
      animation="slideInUp" 
      duration={600}
      style={{ marginBottom: 24, marginHorizontal: 16 }}
    >
      <View style={styles.card}>
        {/* Top Section with Badge and Image */}
        <View style={styles.topSection}>
          <View style={styles.leftContent}>
            {/* Subject Badge */}
            <Animatable.View 
              animation="fadeIn" 
              duration={800}
              style={styles.subjectBadge}
            >
              <Text style={styles.subjectIcon}>📚</Text>
              <Text style={styles.subjectText}>{subject}</Text>
            </Animatable.View>

            {/* Lesson Title */}
            <Text style={styles.lessonTitle}>{title}</Text>
            <Text style={styles.subtext}>{subtext}</Text>
          </View>

          {/* Image Circle with Gradient */}
          <Animatable.View 
            animation="pulse" 
            iterationCount="infinite"
            duration={2000}
          >
            <LinearGradient
              colors={GradientColors.green}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.imageContainer}
            >
              <Text style={styles.imageEmoji}>{image}</Text>
            </LinearGradient>
          </Animatable.View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressBarBackground}>
            <Animatable.View
              animation="slideInLeft"
              duration={1000}
              style={[styles.progressBar, { width: `${progress}%` }]}
            >
              <LinearGradient
                colors={GradientColors.green}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ width: '100%', height: 8, borderRadius: 4 }}
              />
            </Animatable.View>
          </View>
          <Text style={styles.progressText}>{progress}% Complete</Text>
        </View>

        {/* Creative Motivation Section */}
        <Animatable.View 
          animation="fadeIn" 
          duration={1000}
          style={styles.motivationSection}
        >
          <Text style={styles.motivationIcon}>💡</Text>
          <Text style={styles.motivationText}>Every expert was once a beginner. Let's keep going! 🚀</Text>
        </Animatable.View>

        {/* Resume Button with Gradient */}
        <TouchableOpacity 
          style={styles.resumeButtonContainer}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={GradientColors.purplePink}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.resumeButton}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
            <Text style={styles.playIcon}>▶</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.BG_PRIMARY,
    borderRadius: 20,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  leftContent: {
    flex: 1,
    marginRight: 12,
  },
  subjectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  subjectIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  subjectText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.PURPLE_VIBRANT,
    letterSpacing: 0.5,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
    lineHeight: 24,
  },
  subtext: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  imageEmoji: {
    fontSize: 34,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GREEN_VIBRANT,
    textAlign: 'right',
  },
  motivationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(241, 246, 256)',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderColor: COLORS.BORDER_LIGHT,
    borderWidth: 1,
    paddingVertical: 12,
    marginBottom: 14,
    gap: 8,
  },
  motivationIcon: {
    fontSize: 18,
    flexShrink: 0,
  },
  motivationText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.PURPLE_VIBRANT,
    flex: 1,
    lineHeight: 18,
  },
  resumeButtonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  resumeButton: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  playIcon: {
    fontSize: 14,
    color: COLORS.WHITE,
  },
});

export default ContinueLearningCard;
