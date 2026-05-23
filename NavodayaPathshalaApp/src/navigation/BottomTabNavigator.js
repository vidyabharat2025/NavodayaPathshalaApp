/**
 * Bottom Tab Navigator
 * Provides bottom tab navigation for main app screens
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ROUTES from '../constants/routes';
import HomeStack from './HomeStack';
import SubjectStack from './SubjectStack';
import TaskStack from './TaskStack';
import ProfileStack from './ProfileStack';
import THEME from '../config/theme';
import { Fonts } from '../config/fonts';

const Tab = createBottomTabNavigator();
const COLORS = THEME.COLORS;

// Tab icon map
const tabIcons = {
  [ROUTES.APP.HOME]: require('../assets/icons/tab-home.png'),
  [ROUTES.APP.SUBJECT]: require('../assets/icons/tab-subject.png'),
  [ROUTES.APP.TASK]: require('../assets/icons/tab-task.png'),
  [ROUTES.APP.PROFILE]: require('../assets/icons/tab-profile.png'),
};

/**
 * Tab Bar Icon Component
 * Renders the icon with proper styling
 */
const TabBarIcon = ({ name, focused }) => {
  return (
    <Image
      source={tabIcons[name]}
      style={[
        styles.icon,
        {
          tintColor: focused ? COLORS.PURPLE_PRIMARY : COLORS.TEXT_SECONDARY,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

/**
 * Bottom Tab Navigator Component
 * Displays bottom tab bar with 4 main navigation tabs
 * Respects safe area insets on iOS
 */
const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon name={route.name} focused={focused} />
        ),
        tabBarActiveTintColor: COLORS.PURPLE_PRIMARY,
        tabBarInactiveTintColor: COLORS.TEXT_SECONDARY,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: COLORS.WHITE,
          borderTopColor: COLORS.BORDER,
          borderTopWidth: 1,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
          paddingTop: 5,
          paddingLeft: 0,
          paddingRight: 0,
          height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: Fonts.medium,
          marginTop: 0,
          marginBottom: 8,
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.APP.HOME}
        component={HomeStack}
        options={({ navigation }) => ({
          tabBarLabel: 'Home',
          tabBarStyle: (navigation.getState()?.routes[navigation.getState()?.index]?.name === ROUTES.APP.HOME &&
            navigation.getState()?.routes[navigation.getState()?.index]?.state?.index > 0)
            ? { display: 'none' }
            : {
                backgroundColor: COLORS.WHITE,
                borderTopColor: COLORS.BORDER,
                borderTopWidth: 1,
                paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
                paddingTop: 5,
                paddingLeft: 0,
                paddingRight: 0,
                height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
              },
        })}
      />
      <Tab.Screen
        name={ROUTES.APP.SUBJECT}
        component={SubjectStack}
        options={({ navigation }) => ({
          tabBarLabel: 'Subjects',
          tabBarStyle: (navigation.getState()?.routes[navigation.getState()?.index]?.name === ROUTES.APP.SUBJECT &&
            navigation.getState()?.routes[navigation.getState()?.index]?.state?.index > 0)
            ? { display: 'none' }
            : {
                backgroundColor: COLORS.WHITE,
                borderTopColor: COLORS.BORDER,
                borderTopWidth: 1,
                paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
                paddingTop: 5,
                paddingLeft: 0,
                paddingRight: 0,
                height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
              },
        })}
      />
      <Tab.Screen
        name={ROUTES.APP.TASK}
        component={TaskStack}
        options={({ navigation }) => ({
          tabBarLabel: 'Tasks',
          tabBarStyle: (navigation.getState()?.routes[navigation.getState()?.index]?.name === ROUTES.APP.TASK &&
            navigation.getState()?.routes[navigation.getState()?.index]?.state?.index > 0)
            ? { display: 'none' }
            : {
                backgroundColor: COLORS.WHITE,
                borderTopColor: COLORS.BORDER,
                borderTopWidth: 1,
                paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
                paddingTop: 5,
                paddingLeft: 0,
                paddingRight: 0,
                height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
              },
        })}
      />
      <Tab.Screen
        name={ROUTES.APP.PROFILE}
        component={ProfileStack}
        options={({ navigation }) => ({
          tabBarLabel: 'Profile',
          tabBarStyle: (navigation.getState()?.routes[navigation.getState()?.index]?.name === ROUTES.APP.PROFILE &&
            navigation.getState()?.routes[navigation.getState()?.index]?.state?.index > 0)
            ? { display: 'none' }
            : {
                backgroundColor: COLORS.WHITE,
                borderTopColor: COLORS.BORDER,
                borderTopWidth: 1,
                paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
                paddingTop: 5,
                paddingLeft: 0,
                paddingRight: 0,
                height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
              },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
