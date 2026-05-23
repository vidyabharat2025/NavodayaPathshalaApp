// MotivationCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import COLORS, { GradientColors } from '../../config/colors';

const MotivationCard = ({ userName = 'Priya' }) => {
  return (
    <Animatable.View 
      animation="slideInUp" 
      duration={1800}
      style={{ marginBottom: 16, marginHorizontal: 16, borderRadius: 20, overflow: 'hidden' }}
    >
      <LinearGradient
        colors={GradientColors.purplePink}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Animated Emoji */}
        <Animatable.Text 
          animation="bounce" 
          iterationCount="infinite"
          duration={1000}
          style={styles.emoji}
        >
          🚀
        </Animatable.Text>

        {/* Heading */}
        <Text style={styles.heading}>Keep it up!</Text>

        {/* Message */}
        <Text style={styles.message}>You're doing great, {userName}.</Text>
       
      </LinearGradient>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4
  },
  emoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.WHITE,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: 26,
    lineHeight: 22,
  },
});

export default MotivationCard;
