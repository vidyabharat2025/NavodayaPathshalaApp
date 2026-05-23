// ProgressOverview.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import COLORS, { GradientColors } from '../../config/colors';

const ProgressCard = ({ 
  value, 
  label, 
  icon, 
  gradientColors,
  delay = 0 
}) => {
  const displayValue = typeof value === 'number' 
    ? (Number.isInteger(value) ? value : parseFloat(value).toFixed(2))
    : value;

  return (
    <Animatable.View 
      animation="slideInUp" 
      duration={600}
      delay={delay}
      style={styles.cardWrapper}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Container for grouping all content for perfect vertical centering */}
        <View style={styles.innerContent}>
          <View style={styles.iconBackground}>
            <Text style={styles.icon}>{icon}</Text>
          </View>

          <Text style={styles.largeText}>{displayValue}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      </LinearGradient>
    </Animatable.View>
  );
};

const ProgressOverview = ({
  courseProgress = 98,
  lessonsDone = 117,
  testsPassed = 1,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Progress Overview 📊</Text>
      </View>

      <View style={styles.cardsRow}>
        <ProgressCard
          value={`${parseFloat(courseProgress).toFixed(0)}%`}
          label="Course Done"
          icon="𖣠"
          gradientColors={GradientColors.purplePink}
          delay={0}
        />
        <ProgressCard
          value={lessonsDone}
          label="Lessons Done"
          icon="✓⃝"
          gradientColors={GradientColors.green}
          delay={100}
        />
        <ProgressCard
          value={testsPassed}
          label="Tests Passed"
          icon="🏆"
          gradientColors={GradientColors.orange}
          delay={200}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  headerRow: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 6,
  },
  card: {
    borderRadius: 20, // Increased for a smoother look
    alignItems: 'center',
    justifyContent: 'center', // This handles the vertical centering
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  innerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconBackground: {
    width: 48, // Slightly larger for better visual balance
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14, // Balanced spacing
  },
  icon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  largeText: {
    fontSize: 28, // Bigger to match image pop
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
});

export default ProgressOverview;
