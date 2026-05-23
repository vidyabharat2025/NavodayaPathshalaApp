/**
 * Main App Component
 * Entry point of the application
 * Sets up navigation, context provider, and global components
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { AppContextProvider } from './store/AppContext';
import RootNavigator from './navigation/RootNavigator';
import Loader from './components/common/Loader';
import THEME from './config/theme';
import { Colors } from './config/colors';

const COLORS = THEME.COLORS;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

/**
 * App Component
 * Main component that wraps the entire app with providers
 */
const App = () => {
  return (
    <SafeAreaProvider style={styles.flex}>
      <AppContextProvider>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.background}
            translucent={false}
          />
          <RootNavigator />
          <Loader message="Loading..." />
        </NavigationContainer>
      </AppContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
