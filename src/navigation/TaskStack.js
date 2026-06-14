import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from '../screens/task/TaskScreen';
import TestInstructionsScreen from '../screens/test/TestInstructionsScreen';
import QuestionScreen from '../screens/test/QuestionScreen';
import TestResultScreen from '../screens/test/TestResultScreen';
import TestIndexScreen from '../screens/test/TestIndexScreen';

const Stack = createNativeStackNavigator();

const TaskStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TaskList" component={TaskScreen} />
    <Stack.Screen name="TestInstructions" component={TestInstructionsScreen} />
    <Stack.Screen name="Question" component={QuestionScreen} />
    <Stack.Screen name="TestIndex" component={TestIndexScreen} />
    <Stack.Screen name="TestResult" component={TestResultScreen} />
  </Stack.Navigator>
);

export default TaskStack;
