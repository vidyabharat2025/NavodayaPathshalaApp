/**
 * Exam Pattern Screen
 * Shows exam sections and marks distribution
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

const ExamPatternScreen = ({ route, navigation }) => {
  const { data, language } = route.params || {};

  if (!data || !data.examPattern) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load content</Text>
      </SafeAreaView>
    );
  }

  const examPattern = data.examPattern;
  const overview = examPattern.overview || {};
  const sections = examPattern.sections || [];
  const notes = examPattern.notes || [];

  const getIconEmoji = (iconName) => {
    const iconMap = {
      brain: '🧠',
      calculator: '📊',
      book: '📚',
      chart: '📈',
    };
    return iconMap[iconName] || '📊';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
            Exam Pattern
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Card */}
        <View style={styles.overviewCard}>
          {/* Year Label */}
          <Text style={styles.yearLabel}>JNVST 2024</Text>

          {/* Icon */}
          <View style={styles.cardIcon}>
            <Text style={styles.cardIconText}>📊</Text>
          </View>

          {/* Title */}
          <Text style={styles.overviewTitle}>Total Overview</Text>

          {/* Stats Badges */}
          <View style={styles.statsBadges}>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>📋</Text>
              <Text style={styles.badgeText}>{overview.questions} Questions</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>⭐</Text>
              <Text style={styles.badgeText}>{overview.marks} Marks</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>⏱️</Text>
              <Text style={styles.badgeText}>{overview.durationMinutes / 60} Hours</Text>
            </View>
          </View>
        </View>

        {/* Subjects Section */}
        {sections.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Subjects Section</Text>

            {sections.map((section, index) => (
              <TouchableOpacity
                key={index}
                style={styles.subjectCard}
                activeOpacity={0.7}
              >
                {/* Subject Icon */}
                <View style={styles.subjectIcon}>
                  <Text style={styles.subjectIconText}>
                    {getIconEmoji(section.icon)}
                  </Text>
                </View>

                {/* Subject Info */}
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{section.title}</Text>
                  <Text style={styles.subjectSection}>
                    Section {String.fromCharCode(64 + index + 1)}
                  </Text>
                  <Text style={styles.subjectDetails}>
                    {section.questions} Questions • {section.marks} Marks
                  </Text>
                </View>

                {/* Chevron */}
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Notes Section */}
        {notes.length > 0 && (
          <View style={styles.notesSection}>
            {notes.map((note, index) => (
              <View key={index} style={styles.noteItem}>
                <Text style={styles.noteIcon}>✓</Text>
                <Text style={styles.noteText}>{note}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ExamDuration')}
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
    paddingTop: 16,
    paddingBottom: 20,
  },
  overviewCard: {
    backgroundColor: '#6D28D9',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 28,
    position: 'relative',
  },
  yearLabel: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  cardIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconText: {
    fontSize: 28,
  },
  overviewTitle: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  statsBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeIcon: {
    fontSize: 16,
  },
  badgeText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
  },
  subjectCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  subjectIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectIconText: {
    fontSize: 28,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  subjectSection: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.PRIMARY,
    marginBottom: 4,
  },
  subjectDetails: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
  },
  chevron: {
    fontSize: 24,
    color: COLORS.TEXT_SECONDARY,
  },
  notesSection: {
    marginTop: 12,
    gap: 12,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  noteIcon: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    fontWeight: '700',
    marginTop: 2,
  },
  noteText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
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

export default ExamPatternScreen;
