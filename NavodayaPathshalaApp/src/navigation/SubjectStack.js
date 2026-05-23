import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubjectScreen from '../screens/subject/SubjectScreen';
import TopicListScreen from '../screens/topic/TopicListScreen';
import LessonListScreen from '../screens/lesson/LessonListScreen';
import LessonDetailsScreen from '../screens/lesson/LessonDetailsScreen';

const Stack = createNativeStackNavigator();

const SubjectStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SubjectList" component={SubjectScreen} />
    <Stack.Screen name="TopicList" component={TopicListScreen} />
    <Stack.Screen name="LessonList" component={LessonListScreen} />
    <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
  </Stack.Navigator>
);

export default SubjectStack;
