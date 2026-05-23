/**
 * Exam Duration Screen
 * Shows total time and suggested time split
 */

import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import COLORS from '../../config/colors';
import { Fonts } from '../../config/fonts';

const ExamDurationScreen = ({ route, navigation }) => {
  const { data, language } = route.params || {};

  if (!data || !data.examDuration) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load content</Text>
      </SafeAreaView>
    );
  }

  const duration = data.examDuration;
  const totalMinutes = duration.totalMinutes || 120;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const suggestedSplit = duration.suggestedSplit || [];
  const expertTip = duration.expertTip || '';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Standardized Design */}
      <View style={styles.headerSection}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../../assets/icons/back-arrow.png')}
            style={styles.backArrowIcon}
          />
        </TouchableOpacity>

        <View style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>Exam Introduction</Text>
          <Text style={styles.headerGreeting}>
            Exam Duration
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Duration Card */}
        <View style={styles.durationCard}>
          <View style={styles.clockCircle}>
            <Text style={styles.clockIcon}>⏱️</Text>
          </View>
          <Text style={styles.durationValue}>{totalMinutes} min</Text>
          <Text style={styles.durationLabel}>
            ({hours} {hours === 1 ? 'Hour' : 'Hours'}
            {minutes > 0 ? ` ${minutes} min` : ''})
          </Text>
        </View>

        {/* Suggested Time Split */}
        {suggestedSplit.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Suggested Time Split</Text>
            <View style={styles.splitContainer}>
              {suggestedSplit.map((item, index) => (
                <View key={index} style={styles.splitRow}>
                  <View style={styles.splitLeft}>
                    <Text style={styles.sectionName}>{item.section}</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${(item.minutes / totalMinutes) * 100}%`,
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <Text style={styles.splitTime}>{item.minutes} min</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Expert Tip */}
        {expertTip && (
          <View style={styles.expertTip}>
            <Text style={styles.tipIcon}>💡</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>EXPERT TIP</Text>
              <Text style={styles.tipText}>{expertTip}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('PreparationTips')}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next →</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 12,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#6D28D9',
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  durationCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 32,
  },
  clockCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D0E0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  clockIcon: {
    fontSize: 48,
  },
  durationValue: {
    fontSize: 48,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  durationLabel: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
  },
  splitContainer: {
    gap: 16,
    marginBottom: 24,
  },
  splitRow: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  splitLeft: {
    flex: 1,
    gap: 8,
  },
  sectionName: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
  },
  splitTime: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  expertTip: {
    backgroundColor: '#EDE9FE',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.PRIMARY,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.PRIMARY,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.ERROR,
    textAlign: 'center',
    marginTop: 32,
  },
  bottomCTA: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },
  nextButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
});

export default ExamDurationScreen;
