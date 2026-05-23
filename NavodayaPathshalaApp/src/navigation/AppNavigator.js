/**
 * App Navigator
 * Main navigator for authenticated users
 * Uses bottom tab navigation for main screens and modal stacks
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import ExamIntroStack from './ExamIntroStack';

const Stack = createNativeStackNavigator();

/**
 * App Navigator Component
 * Serves as entry point for the authenticated app experience
 */
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainApp"
        component={BottomTabNavigator}
      />
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal', animationEnabled: true }}>
        <Stack.Screen
          name="ExamIntroModal"
          component={ExamIntroStack}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
