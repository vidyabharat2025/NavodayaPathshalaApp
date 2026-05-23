/**
 * Profile Stack Navigator
 * Handles navigation between Profile and Edit Profile screens
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import AccountSettingsScreen from '../screens/profile/AccountSettingsScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';
import LegalContentScreen from '../screens/legal/LegalContentScreen';
import ROUTES from '../constants/routes';

const Stack = createNativeStackNavigator();

/**
 * Profile Stack Navigator
 * Routes:
 * - Profile: Main profile view
 * - EditProfile: Edit profile form
 * 
 * Note: Tab bar visibility is controlled from BottomTabNavigator
 * based on navigation stack depth
 */
const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen
        name={ROUTES.PROFILE.MAIN}
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name={ROUTES.PROFILE.EDIT}
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
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
      <Stack.Screen
        name={ROUTES.PROFILE.ACCOUNT_SETTINGS}
        component={AccountSettingsScreen}
        options={{
          title: 'Account Settings',
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
      <Stack.Screen
        name={ROUTES.PROFILE.CHANGE_PASSWORD}
        component={ChangePasswordScreen}
        options={{
          title: 'Change Password',
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
      <Stack.Screen
        name={ROUTES.PROFILE.LEGAL}
        component={LegalContentScreen}
        options={{
          title: 'Legal',
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
    </Stack.Navigator>
  );
};

export default ProfileStack;
