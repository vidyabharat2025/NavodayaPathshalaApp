/**
 * Test Result Screen
 * Displays test score, result status, and feedback
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../config/colors';
import { Fonts } from '../../config/fonts';
import { useAppContext } from '../../store/AppContext';
import { getLatestAttempt } from '../../services/testAttemptService';

const TestResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const {
    testId,
    testType,
    submissionResult = {},
    isReviewMode = false,
  } = route.params || {};
  const { state } = useAppContext();
  const userName = state?.user?.name || 'Student';
  const streak = state?.user?.streak || 0;
  // Removed loading state
  const [resultData, setResultData] = useState(submissionResult);

  // Fetch latest attempt when screen loads (for review mode)
  useEffect(() => {
    if (isReviewMode && testId) {
      fetchLatestAttempt();
    }
  }, [testId, isReviewMode]);

  const fetchLatestAttempt = async () => {
    try {
      // Removed loading
      const data = await getLatestAttempt(testId);
      setResultData(data);
    } catch (err) {
      console.error('Failed to fetch latest attempt:', err);
      Alert.alert(
        'Error',
        'Failed to load test results. Please try again.',
        [{ text: 'OK', style: 'cancel' }]
      );
    } finally {
      // Removed loading
    }
  };

  // Extract data from result data or use defaults
  const score = resultData.score || 0;
  const totalQuestions = resultData.total_questions || 10;
  const rawPercentage = resultData.percentage || ((score / totalQuestions) * 100);
  const percentage = Number.isFinite(rawPercentage) ? rawPercentage.toFixed(2) : '0.00';
  const passed = resultData.passed || (percentage >= 60);
  const submittedLate = resultData.submitted_late || false;
  const timeSpentSeconds = resultData.time_spent_seconds || 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleGoBack = () => {
    try {
      navigation.navigate('TaskList');
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  const handleReattempt = () => {
    Alert.alert(
      'Re-attempt Test?',
      'Re-attempting this test will delete your current score. Continue?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Re-attempt',
          onPress: () => {
            try {
              navigation.replace('TestInstructions', {
                testId,
                isReattempt: true,
              });
            } catch (err) {
              console.error('Navigation error:', err);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Show loading state
  // Removed loading UI and fallback

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Standardized Design */}
      <View style={styles.headerSection}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* Title + Subtitle */}
        <View style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>Results</Text>
          <Text style={styles.headerGreeting}>
            {testType ? testType.charAt(0).toUpperCase() + testType.slice(1) : 'Test'} Result
          </Text>
        </View>

        {/* Streak Badge */}
        <View style={styles.streakBadge}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakNumber}>{streak}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Result Card */}
        <View style={styles.resultCard}>
          {/* Result Circle */}
          <View style={[
            styles.resultCircle,
            passed ? styles.resultCirclePassed : styles.resultCircleFailed,
          ]}>
            <Text style={styles.resultIcon}>
              {passed ? '✓' : '✗'}
            </Text>
          </View>

          {/* Result Status */}
          <Text style={[
            styles.resultStatus,
            passed ? styles.statusPassed : styles.statusFailed,
          ]}>
            {passed ? 'Passed' : 'Failed'}
          </Text>

          {/* Score */}
          <Text style={styles.score}>
            {score} / {totalQuestions}
          </Text>

          {/* Message */}
          <Text style={styles.message}>
            {passed
              ? 'Excellent! You passed! 🎉'
              : 'You can try again anytime'}
          </Text>

          {/* Subtext */}
          <Text style={styles.subtext}>
            {passed
              ? `You scored ${percentage}% on this test.`
              : `You scored ${percentage}%. Review and reattempt to improve.`}
          </Text>

          {submittedLate && (
            <View style={styles.lateWarning}>
              <Text style={styles.lateWarningText}>
                ⚠️ This attempt was submitted after time limit
              </Text>
            </View>
          )}

          {/* Score Breakdown */}
          <View style={styles.scoreBreakdown}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Correct</Text>
              <Text style={styles.breakdownValue}>{score}</Text>
            </View>
            <View style={styles.breakdownDivider} />
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Total</Text>
              <Text style={styles.breakdownValue}>{totalQuestions}</Text>
            </View>
            <View style={styles.breakdownDivider} />
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Time Spent</Text>
              <Text style={styles.breakdownValue}>{formatTime(timeSpentSeconds)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomSection}>
        {isReviewMode ? (
          // Review mode: show re-attempt and go back buttons
          <>
            <TouchableOpacity
              style={[styles.ctaButton, styles.secondaryButton]}
              onPress={handleGoBack}
              activeOpacity={0.8}
              disabled={false}
            >
              <Text style={styles.secondaryButtonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.ctaButton, { marginTop: 12 }]}
              onPress={handleReattempt}
              activeOpacity={0.8}
              disabled={false}
            >
              <Text style={styles.ctaButtonText}>Re-attempt Test</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Normal mode: just go back button
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleGoBack}
            activeOpacity={0.8}
            disabled={false}
          >
            <Text style={styles.ctaButtonText}>Go Back to Tasks</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 16,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
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
  header: {
    marginBottom: 24,
  },
  resultCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  resultCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultCirclePassed: {
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  resultCircleFailed: {
    backgroundColor: COLORS.ERROR_LIGHT,
  },
  resultIcon: {
    fontSize: 40,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.SECONDARY,
  },
  resultStatus: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusPassed: {
    color: COLORS.SECONDARY,
  },
  statusFailed: {
    color: COLORS.ERROR,
  },
  score: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  lateWarning: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  lateWarningText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#92400E',
    textAlign: 'center',
  },
  scoreBreakdown: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },
  breakdownItem: {
    alignItems: 'center',
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  breakdownDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.BORDER,
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
    backgroundColor: COLORS.WHITE,
  },
  ctaButton: {
    backgroundColor: COLORS.PURPLE_PRIMARY,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  secondaryButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1.5,
    borderColor: COLORS.BORDER,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
});

export default TestResultScreen;
