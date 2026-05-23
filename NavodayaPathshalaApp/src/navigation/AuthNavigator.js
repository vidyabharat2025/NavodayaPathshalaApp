/**
 * Auth Navigator
 * Stack navigator for authentication screens
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ROUTES from '../constants/routes';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpScreen from '../screens/signup/SignUpScreen';
import LegalContentScreen from '../screens/legal/LegalContentScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen
        name={ROUTES.AUTH.LOGIN}
        component={LoginScreen}
        options={{
          animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name={ROUTES.AUTH.REGISTER}
        component={SignUpScreen}
        options={{
          animationTypeForReplace: 'pop',
        }}
      />
      <Stack.Screen
        name={ROUTES.PROFILE.LEGAL}
        component={LegalContentScreen}
        options={{
          animationEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      />
      {/* Add more auth screens here as needed */}
      {/* <Stack.Screen name={ROUTES.AUTH.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      <Stack.Screen name={ROUTES.AUTH.RESET_PASSWORD} component={ResetPasswordScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
