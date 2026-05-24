/**
 * Exam Guide CTA Card Component
 * Displays card to launch exam intro flow
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import COLORS, { GradientColors } from '../../config/colors';
import { Fonts } from '../../config/fonts';

const ExamGuideCard = ({ onPress }) => {
  return (
    <Animatable.View 
      animation="slideInDown" 
      duration={600}
      style={{ marginBottom: 16, marginHorizontal: 16, borderRadius: 18, overflow: 'hidden' }}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={GradientColors.blue}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {/* Left Section - Icon */}
          <Animatable.View 
            animation="pulse" 
            iterationCount="infinite"
            duration={2000}
            style={styles.iconSection}
          >
            <Text style={styles.icon}>📖</Text>
          </Animatable.View>

          {/* Middle Section - Text */}
          <View style={styles.textSection}>
            <Text style={styles.title}>JNVST Exam Guide</Text>
            <Text style={styles.subtitle}>Everything you need before the exam</Text>
          </View>

          {/* Right Section - Chevron */}
          <View style={styles.arrowSection}>
            <Text style={styles.arrow}>›</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 18,
    gap: 14,
  },
  iconSection: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  icon: {
    fontSize: 32,
  },
  textSection: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
  },
  arrowSection: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  arrow: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: '700',
  },
});

export default ExamGuideCard;
