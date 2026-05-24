/**
 * Home Screen (View)
 * Displays dashboard with greeting, learning progress, and tasks
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScrollView, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GreetingHeader from '../../components/home/GreetingHeader';
import ContinueLearningCard from '../../components/home/ContinueLearningCard';
import ProgressOverview from '../../components/home/ProgressOverview';
import TodayTasks from '../../components/home/TodayTasks';
import MotivationCard from '../../components/home/MotivationCard';
import { getHomeSummary } from '../../services/homeSummaryService';
import { useAppContext } from '../../store/AppContext';
import styles from './homeStyles';
import COLORS from '../../config/colors';

/**
 * Home Screen Component
 * Displays user greeting, learning progress, and daily tasks
 */
const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { state, setGreeting } = useAppContext();
  const userName = state?.user?.name || 'Student';
  const streak = state?.user?.streak || 0;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeSummary, setHomeSummary] = useState(null);
  const isMountedRef = useRef(true);
  const hasInitializedRef = useRef(false);
  const setGreetingRef = useRef(setGreeting);

  // Update ref when setGreeting changes
  useEffect(() => {
    setGreetingRef.current = setGreeting;
  }, [setGreeting]);

  // Memoize the fetch function with no external dependencies
  const fetchHomeSummary = useCallback(async () => {
    // Prevent duplicate requests if component is unmounted
    if (!isMountedRef.current) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log('[HomeScreen] Fetching home summary...');
      const data = await getHomeSummary();
      
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        console.log('[HomeScreen] Home summary fetched successfully');
        setHomeSummary(data);
        
        // Store greeting data in context for use in GreetingHeader
        if (data?.greeting_title || data?.greeting_subtitle) {
          setGreetingRef.current(data.greeting_title, data.greeting_subtitle);
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        console.error('[HomeScreen] Failed to fetch home summary:', err);
        setError('Failed to load home data');
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

const handleRetry = () => {
    setError(null);
    fetchHomeSummary();
  };

  // Fetch on component mount (only once)
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      isMountedRef.current = true;
      fetchHomeSummary();
    }
  }, [fetchHomeSummary]);

  // Show loader
  if (loading) {
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom }]}> 
        <GreetingHeader userName={userName} streak={streak} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.PURPLE_PRIMARY} />
        </View>
      </View>
    );
  }

  // Show error fallback - use simple text display instead
  if (error || !homeSummary) {
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom }]}> 
        <GreetingHeader userName={userName} streak={streak} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 16, color: COLORS.RED, textAlign: 'center' }}>
            {error || 'Failed to load home data'}
          </Text>
          <TouchableOpacity onPress={handleRetry} style={{ marginTop: 16, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: COLORS.PURPLE_PRIMARY, borderRadius: 8 }}>
            <Text style={{ color: COLORS.WHITE, fontSize: 15, fontWeight: '600' }}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const resumeLesson = homeSummary?.resume_lesson;
  const quickTestActions = homeSummary?.quick_test_actions?.actions || [];
  const progressOverview = homeSummary?.progress_overview || {};

  // Determine which card to show
  const hasResume = !!resumeLesson;
  const hasStartedLessons = (progressOverview?.lessons_done || 0) > 0;

  // Handle resume lesson navigation
  const handleResume = () => {
    if (resumeLesson) {
      // Navigate to LessonDetails screen within the same HomeStack
      navigation.navigate('LessonDetails', {
        lessonId: resumeLesson.lesson_id,
        lessonTitle: resumeLesson.lesson_title,
      });
    } else {
      // Keep Learning or Start First Lesson - go to Subjects tab
      navigation.navigate('Subject');
    }
  };

  // Handle test button navigation - navigate to Task tab with testType
  const handleTestPress = (testType) => {
    navigation.navigate('Task', {
      screen: 'TaskList',
      params: {
        testType: testType, // 'grade' or 'pyq_paper'
      },
    });
  };

  const handleExamGuidePress = () => {
    navigation.navigate('ExamIntroModal');
  };

  // Map continue learning card data
  const continueCardData = {
    subject: hasResume ? resumeLesson?.subject_name : 'Continue Learning',
    title: hasResume ? resumeLesson?.lesson_title : (hasStartedLessons ? 'Keep Learning' : 'Start Your First Lesson'),
    subtext: hasResume ? resumeLesson?.topic_name : 'Begin your learning journey today',
    progress: resumeLesson?.progress_percent || 0,
    image: hasResume ? '📚' : '🎯',
    buttonText: hasResume ? 'Resume Lesson' : 'View Subjects',
  };

  // Map progress overview data
  const progressData = {
    courseProgress: progressOverview?.course_percent || 0,
    lessonsDone: progressOverview?.lessons_done || 0,
    testsPassed: progressOverview?.tests_passed || 0,
  };

  // Map quick test actions to task list format
  const tasksList = quickTestActions.map((action, index) => ({
    id: String(index),
    icon: action.type === 'grade' ? '📊' : '📝',
    title: action.title || 'Test',
    subtitle: action.description || '',
    type: action.type,
    onPress: () => handleTestPress(action.type),
  }));

  return (
    <View style={styles.container}>
      {/* Sticky Header with Exam Guide CTA */}
      <GreetingHeader
        userName={userName}
        streak={streak}
        onExamGuidePress={handleExamGuidePress}
      />

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
      >
        {/* Continue/Resume Learning Card */}
        <ContinueLearningCard
          subject={continueCardData.subject}
          title={continueCardData.title}
          subtext={continueCardData.subtext}
          progress={continueCardData.progress}
          image={continueCardData.image}
          buttonText={continueCardData.buttonText}
          onPress={handleResume}
        />

        {/* Progress Overview */}
        <ProgressOverview
          courseProgress={progressData.courseProgress}
          lessonsDone={progressData.lessonsDone}
          testsPassed={progressData.testsPassed}
        />

        {/* Quick Test Actions */}
        {tasksList.length > 0 && (
          <TodayTasks tasks={tasksList} />
        )}

        {/* Motivation Card */}
        <MotivationCard userName={userName} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
