/**
 * Test Instructions Screen
 * Displays test information, rules, and guidelines before starting
 * Fetches real test data from API
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../config/colors';
import { Fonts } from '../../config/fonts';
import { useAppContext } from '../../store/AppContext';
import { fetchTestDetails } from '../../services/testDetailsService';
import { startAttempt } from '../../services/testAttemptService';
import LessonContentRenderer from '../../components/common/LessonContentRenderer';

const TestInstructionsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { testId } = route.params || {};
  const { state } = useAppContext();
  const { width } = useWindowDimensions();
  // contentWidth matches scrollContent paddingHorizontal (16px on each side)
  const contentWidth = width - 32;
  
  const userName = state?.user?.name || 'Student';
  const streak = state?.user?.streak || 0;

  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startingAttempt, setStartingAttempt] = useState(false);

  // Fetch test details on mount
  useEffect(() => {
    loadTestDetails();
  }, [testId]);

  const loadTestDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const details = await fetchTestDetails(testId);
      setTestDetails(details);
    } catch (err) {
      console.error('Failed to load test details:', err);
      setError(err.message || 'Failed to load test details');
    } finally {
      setLoading(false);
    }
  };

  const getTestTypeDisplay = (type) => {
    const typeMap = {
      lesson: 'Lesson Test',
      topic: 'Topic Test',
      subject: 'Subject Test',
      grade: 'Grade Test',
      mock: 'Mock Test',
      pyq_paper: 'PYQ Paper',
    };
    return typeMap[type] || type.toUpperCase();
  };

  const handleStartTest = async () => {
    if (!testDetails || !testDetails.questions) {
      setError('No questions available for this test');
      return;
    }

    try {
      setStartingAttempt(true);
      
      // Call API to start/restart attempt
      const attemptData = await startAttempt(testDetails.id);
      
      // Navigate to Question screen with attempt data and test questions
      navigation.navigate('Question', {
        testId: testDetails.id,
        attemptId: attemptData.attempt_id,
        questions: testDetails.questions,
        timeLimitMinutes: attemptData.time_limit_minutes,
        totalQuestions: attemptData.total_questions,
        testType: testDetails.type,
        startedAt: attemptData.started_at,
      });
    } catch (err) {
      console.error('Failed to start test attempt:', err);
      Alert.alert(
        'Error',
        'Failed to start test. Please try again.',
        [{ text: 'OK', style: 'cancel' }]
      );
    } finally {
      setStartingAttempt(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRetry = () => {
    loadTestDetails();
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require('../../assets/icons/back-arrow.png')}
              style={styles.backArrowIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContent}>
            <Text style={styles.headerTitle}>Tests</Text>
            <Text style={styles.headerGreeting}>Loading test details...</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakNumber}>{streak}</Text>
          </View>
        </View>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={COLORS.PURPLE_PRIMARY} />
          <Text style={styles.loadingText}>Loading test details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error || !testDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={handleBack}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require('../../assets/icons/back-arrow.png')}
              style={styles.backArrowIcon}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContent}>
            <Text style={styles.headerTitle}>Tests</Text>
            <Text style={styles.headerGreeting}>Test Details</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakNumber}>{streak}</Text>
          </View>
        </View>
        <View style={styles.centerContent}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Unable to Load Test</Text>
          <Text style={styles.errorMessage}>{error || 'Something went wrong'}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
            activeOpacity={0.8}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const testTitle = testDetails?.title || 'Test';
  const totalQuestions = testDetails?.total_questions || 0;
  const timeLimit = testDetails?.time_limit_minutes || 0;
  const passingScore = testDetails?.pass_percentage || 60;
  const testType = testDetails?.type || 'test';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Standardized Design */}
      <View style={styles.headerSection}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={handleBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../../assets/icons/back-arrow.png')}
            style={styles.backArrowIcon}
          />
        </TouchableOpacity>

        {/* Title + Subtitle */}
        <View style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>Tests</Text>
          <Text style={styles.headerGreeting}>
            {testTitle}
          </Text>
        </View>

        {/* Streak Badge */}
        <View style={styles.streakBadge}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakNumber}>{streak}</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Instruction Card */}
        <View style={styles.instructionCard}>
          {/* Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{getTestTypeDisplay(testType)}</Text>
          </View>

          {/* Info Rows */}
          <View style={styles.infoSection}>
            {/* Questions Row */}
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>📋</Text>
              </View>
              <View style={styles.infoTextBlock}>
                <Text style={styles.infoLabel}>Total Questions</Text>
                <Text style={styles.infoValue}>{totalQuestions} Questions</Text>
              </View>
            </View>

            {/* Time Limit Row */}
            {timeLimit > 0 && (
              <View style={styles.infoRow}>
                <View style={styles.iconCircle}>
                  <Text style={styles.icon}>⏱️</Text>
                </View>
                <View style={styles.infoTextBlock}>
                  <Text style={styles.infoLabel}>Time Limit</Text>
                  <Text style={styles.infoValue}>{timeLimit} Minutes</Text>
                </View>
              </View>
            )}

            {/* Passing Criteria Row */}
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>🏆</Text>
              </View>
              <View style={styles.infoTextBlock}>
                <Text style={styles.infoLabel}>Passing Criteria</Text>
                <Text style={styles.infoValue}>{passingScore}% required</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description Section - from API */}
        {testDetails?.description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About This Test</Text>
            <View style={styles.descriptionCard}>
              <LessonContentRenderer
                content={testDetails.description}
                contentWidth={contentWidth}
              />
            </View>
          </View>
        )}

        {/* Instructions Section - from API */}
        {testDetails?.instructions && (
          <View style={styles.instructionsSection}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <View style={styles.instructionsCard}>
              <LessonContentRenderer
                content={testDetails.instructions}
                contentWidth={contentWidth}
              />
            </View>
          </View>
        )}

        {/* Fallback: Show hardcoded rules if no instructions from API */}
        {!testDetails?.instructions && (
          <View style={styles.rulesSection}>
            <Text style={styles.rulesTitle}>Rules & Guidelines</Text>
            
            {[
              'One question at a time',
              'Timer starts after you begin',
              'You can skip questions',
              'Submit anytime before timer ends',
            ].map((rule, index) => (
              <View key={index} style={styles.ruleRow}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.startButton,
            (totalQuestions === 0 || startingAttempt) && styles.startButtonDisabled,
          ]}
          onPress={handleStartTest}
          activeOpacity={(totalQuestions === 0 || startingAttempt) ? 0.5 : 0.8}
          disabled={totalQuestions === 0 || startingAttempt}
        >
          {startingAttempt ? (
            <View style={styles.buttonLoadingContainer}>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text style={styles.startButtonText}>Starting...</Text>
            </View>
          ) : (
            <Text style={styles.startButtonText}>
              {totalQuestions === 0 ? 'No Questions Available' : 'Start Test →'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  backArrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#6D28D9',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    color: '#6D28D9',
  },
  headerTextContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
    lineHeight: 24,
  },
  headerGreeting: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },
  streakBadge: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  streakIcon: {
    fontSize: 14,
  },
  streakNumber: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#FF6B35',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: COLORS.PURPLE_PRIMARY,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  instructionCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.PURPLE_LIGHT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.PURPLE_PRIMARY,
  },
  infoSection: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.PURPLE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  icon: {
    fontSize: 16,
  },
  infoTextBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  rulesSection: {
    marginBottom: 24,
  },
  rulesTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  instructionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 12,
  },
  descriptionCard: {
    marginBottom: 24,
  },
  instructionsCard: {
    marginBottom: 24,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  checkIcon: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    fontWeight: '700',
    marginTop: 2,
  },
  ruleText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
    flex: 1,
  },
  warningCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  warningIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  warningTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  warningMessage: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: '#B45309',
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },
  startButton: {
    backgroundColor: COLORS.PURPLE_PRIMARY,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonDisabled: {
    opacity: 0.5,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  buttonLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});

export default TestInstructionsScreen;
