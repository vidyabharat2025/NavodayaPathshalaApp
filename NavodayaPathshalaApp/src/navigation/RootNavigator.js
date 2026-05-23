/**
 * Root Navigator
 * Main navigation stack that switches between Auth and App navigators
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useAppContext } from '../store/AppContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import THEME from '../config/theme';

const Stack = createNativeStackNavigator();

const COLORS = THEME.COLORS;

const RootNavigator = () => {
  const { state } = useAppContext();
  const { isLoading, isSignedIn } = state;

  // Show splash/loading screen
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.WHITE,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen
          name="AppStack"
          component={AppNavigator}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      ) : (
        <Stack.Screen
          name="AuthStack"
          component={AuthNavigator}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
