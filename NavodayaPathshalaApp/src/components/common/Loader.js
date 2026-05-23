/**
 * Loader Component
 * Global loading indicator
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Grid } from 'react-native-animated-spinkit';
import apiProgress from '../../api/apiProgress';
import THEME from '../../config/theme';

const COLORS = THEME.COLORS;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    zIndex: 9999,
    elevation: 9999,
    pointerEvents: 'none',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
    pointerEvents: 'none',
  },
});

/**
 * Loader Component
 * Subscribes to API progress and shows/hides loader
 * @param {string} message - Optional loading message
 */
const Loader = ({ message = 'Loading...' }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = apiProgress.subscribe(loading => {
      setIsLoading(loading);
    });

    return unsubscribe;
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.container} pointerEvents="none">
        <Grid size={64} color={COLORS.PURPLE_PRIMARY} />
      </View>
    </View>
  );
};

export default Loader;
