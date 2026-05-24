/**
 * Exam Intro Stack Navigator
 * Navigation stack for all 8 exam intro screens
 */

import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, Text } from 'react-native';
import THEME from '../config/theme';
import apiClient from '../api/apiClient';
import AboutJNVSTScreen from '../screens/exam-intro/AboutJNVSTScreen';
import ExamDurationScreen from '../screens/exam-intro/ExamDurationScreen';
import ExamPatternScreen from '../screens/exam-intro/ExamPatternScreen';
import PreparationTipsScreen from '../screens/exam-intro/PreparationTipsScreen';
import OMRGuideScreen from '../screens/exam-intro/OMRGuideScreen';
import ScoringExplainedScreen from '../screens/exam-intro/ScoringExplainedScreen';
import SelectionCriteriaScreen from '../screens/exam-intro/SelectionCriteriaScreen';
import ExamDayGuideScreen from '../screens/exam-intro/ExamDayGuideScreen';

const Stack = createNativeStackNavigator();
const COLORS = THEME.COLORS;

/**
 * Hook to fetch and manage exam intro content
 */
const useExamIntroContent = (examCode = 'JNVST', examYear = 2025) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en');

  const fetchContent = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        `/meta/exam-intro-content?exam_code=${examCode}&exam_year=${examYear}`,
        { skipGlobalLoader: true }
      );

      if (response.data?.content) {
        const parsedContent = JSON.parse(response.data.content);
        const meta = response.data.meta || {};
        
        setData({ ...parsedContent, meta });
        setLanguage(meta.defaultLanguage || 'en');
        setError(null);
      } else {
        setError('No content received');
      }
    } catch (err) {
      console.error('Error fetching exam intro content:', err);
      setError(err.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [examCode, examYear]);

  const toggleLanguage = React.useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  }, []);

  React.useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    data,
    loading,
    error,
    language,
    toggleLanguage,
    refetch: fetchContent,
  };
};

/**
 * Main Exam Intro Stack Navigator
 */
const ExamIntroStack = () => {
  const { data, loading, error, language, toggleLanguage } = useExamIntroContent();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F8FA' }}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F8FA' }}>
        <Text style={{ color: COLORS.ERROR, fontSize: 16, textAlign: 'center', paddingHorizontal: 20 }}>
          {error || 'Failed to load exam guide. Please try again.'}
        </Text>
      </View>
    );
  }

  const initialParams = {
    data,
    language,
    toggleLanguage,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        name="AboutJNVST"
        component={AboutJNVSTScreen}
        initialParams={initialParams}
      />
      <Stack.Screen
        name="ExamPattern"
        component={ExamPatternScreen}
        initialParams={initialParams}
      />
      <Stack.Screen
        name="ExamDuration"
        component={ExamDurationScreen}
        initialParams={initialParams}
      />
      <Stack.Screen
        name="PreparationTips"
        component={PreparationTipsScreen}
        initialParams={initialParams}
      />
      <Stack.Screen
        name="OMRGuide"
        component={OMRGuideScreen}
        initialParams={initialParams}
      />
      <Stack.Screen
        name="ScoringExplained"
        component={ScoringExplainedScreen}
        initialParams={initialParams}
      />
      <Stack.Screen
        name="SelectionCriteria"
        component={SelectionCriteriaScreen}
        initialParams={initialParams}
      />
      <Stack.Screen
        name="ExamDayGuide"
        component={ExamDayGuideScreen}
        initialParams={initialParams}
      />
    </Stack.Navigator>
  );
};

export default ExamIntroStack;
export { useExamIntroContent };
