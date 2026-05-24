// GreetingHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import useSessionGreeting from '../../hooks/useSessionGreeting';
import useGreeting from '../../hooks/useGreeting';
import { useAppContext } from '../../store/AppContext';
import COLORS, { GradientColors } from '../../config/colors';
import { Fonts } from '../../config/fonts';

const GreetingHeader = ({ userName = 'Priya Vaishnav', streak = 12, onStreakPress = () => {}, onExamGuidePress = () => {} }) => {
  const { state } = useAppContext();
  const sessionGreeting = useSessionGreeting();
  const timeGreeting = useGreeting();

  // Use greeting from API if available, fallback to computed greetings
  const displayTitle = state?.greeting?.title || sessionGreeting;
  const displaySubtitle = state?.greeting?.subtitle || timeGreeting;

  return (
    <LinearGradient
      colors={GradientColors.purplePink}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Main Header Content */}
      <View style={styles.headerContent}>
        {/* Avatar */}
        <Animatable.View animation="fadeIn" duration={800} style={styles.avatar}>
          <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
        </Animatable.View>

        {/* Title + Greeting Section */}
        <Animatable.View animation="slideInLeft" duration={600} style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>{displayTitle}</Text>
          <Text style={styles.headerGreeting}>{displaySubtitle}</Text>
        </Animatable.View>

        {/* Streak Badge - Modern oval pill style */}
        <TouchableOpacity 
          style={styles.streakBadge}
          onPress={onStreakPress}
          activeOpacity={0.8}
        >
          <Animatable.Text animation="pulse" iterationCount="infinite" duration={2000} style={styles.streakIcon}>🔥</Animatable.Text>
          <Text style={styles.streakNumber}>{streak}</Text>
        </TouchableOpacity>
      </View>

      {/* Exam Guide Card inside header */}
      <Animatable.View 
        animation="slideInUp" 
        duration={700}
        style={styles.examGuideWrapper}
      >
        <TouchableOpacity
          style={styles.examGuideCard}
          onPress={onExamGuidePress}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={GradientColors.blue}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.examGuideGradient}
          >
            {/* Left Section - Icon */}
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite"
              duration={2000}
              style={styles.examGuideIconSection}
            >
              <Text style={styles.examGuideIcon}>📖</Text>
            </Animatable.View>

            {/* Middle Section - Text */}
            <View style={styles.examGuideTextSection}>
              <Text style={styles.examGuideTitle} numberOfLines={1}>JNVST Exam Guide</Text>
              <Text style={styles.examGuideSubtitle} numberOfLines={2}>Everything you need before the exam</Text>
            </View>

            {/* Right Section - Chevron */}
            <Animatable.Text style={styles.examGuideChevron}>›</Animatable.Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    paddingTop: 64,
    paddingBottom: 0,
    gap: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerTextContent: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerGreeting: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.95)',
  },
  streakBadge: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  streakIcon: {
    fontSize: 12,
  },
  streakNumber: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 24,
    textAlign: 'center',
  },
  
  // Exam Guide Card Styles
  examGuideWrapper: {
    marginHorizontal: 0,
    marginBottom: 8,
    marginTop: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  examGuideCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  examGuideGradient: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 16,
    gap: 14,
    borderRadius: 20,
    minHeight: 110,
  },
  examGuideIconSection: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  examGuideIcon: {
    fontSize: 24,
  },
  examGuideTextSection: {
    flex: 1,
    justifyContent: 'center',
  },
  examGuideTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6
  },
  examGuideSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    flexWrap: 'wrap',
  },
  examGuideChevron: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    marginRight: 30,
  },
});

export default GreetingHeader;
