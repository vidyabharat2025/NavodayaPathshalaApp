import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import LessonDetailsScreen from '../screens/lesson/LessonDetailsScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
  </Stack.Navigator>
);

export default HomeStack;
