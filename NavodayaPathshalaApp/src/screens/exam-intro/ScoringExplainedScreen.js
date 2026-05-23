/**
 * Scoring Explained Screen
 * Details about scoring and evaluation
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

const ScoringExplainedScreen = ({ route, navigation }) => {
  const { data, language, toggleLanguage } = route.params || {};

  if (!data || !data.scoring) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load content</Text>
      </SafeAreaView>
    );
  }

  const scoring = data.scoring;

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
          <Text style={styles.headerGreeting}>Scoring Explained</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Title */}
        <Text style={styles.mainTitle}>How Scoring Works</Text>
        <Text style={styles.subtitle}>
          Understand the marking scheme to maximize your score in JNVST.
        </Text>

        {/* Correct Answer Card */}
        <View style={[styles.scoringCard, styles.correctCard]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBadge}>
              <Text style={styles.cardIcon}>✓</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>CORRECT ANSWER</Text>
              <Text style={styles.cardValue}>
                <Text style={styles.marksValue}>+{scoring.correctMarks}</Text>
                <Text style={styles.marksLabel}> Marks</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Wrong Answer Card */}
        <View style={[styles.scoringCard, styles.wrongCard]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBadge, styles.orangeBadge]}>
              <Text style={styles.orangeIcon}>−</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardLabel, styles.orangeLabel]}>WRONG ANSWER</Text>
              <Text style={styles.cardValue}>
                <Text style={styles.wrongMarksValue}>{scoring.wrongMarks}</Text>
                <Text style={styles.wrongMarksLabel}> Marks</Text>
              </Text>
              <Text style={styles.noNegative}>No Negative Marking</Text>
            </View>
          </View>
        </View>

        {/* Example Section */}
        <Text style={styles.sectionTitle}>Let's see an example:</Text>

        {/* Example Card */}
        <View style={styles.exampleContainer}>
          {/* Correct Count */}
          <View style={styles.exampleRow}>
            <View style={styles.exampleIcon}>
              <Text>✓</Text>
            </View>
            <View style={styles.exampleInfo}>
              <Text style={styles.exampleLabel}>4 Correct</Text>
              <Text style={styles.exampleFormula}>4 × 1.25</Text>
            </View>
            <Text style={styles.exampleScore}>5.00</Text>
          </View>

          {/* Wrong Count */}
          <View style={styles.exampleRow}>
            <View style={[styles.exampleIcon, styles.redIcon]}>
              <Text>✕</Text>
            </View>
            <View style={styles.exampleInfo}>
              <Text style={styles.exampleLabel}>2 Wrong</Text>
              <Text style={styles.exampleFormula}>2 × 0</Text>
            </View>
            <Text style={styles.exampleScore}>0.00</Text>
          </View>

          {/* Total Score */}
          <View style={styles.totalScoreRow}>
            <Text style={styles.totalLabel}>Total Score</Text>
            <View style={styles.totalScoreBadge}>
              <Text style={styles.totalScoreValue}>5.00</Text>
            </View>
          </View>
        </View>

        {/* Pro Tip */}
        <View style={styles.proTipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>PRO TIP</Text>
            <Text style={styles.tipText}>
              Since there is <Text style={styles.tipBold}>no penalty</Text> for wrong answers, you should attempt <Text style={styles.tipBold}>all</Text> questions.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SelectionCriteria')}
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#EDE9FE',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowIcon: {
    width: 24,
    height: 24,
  },
  headerTextContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
  },
  headerGreeting: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 24,
    lineHeight: 20,
  },
  scoringCard: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctCard: {
    backgroundColor: '#E8F5E9',
  },
  wrongCard: {
    backgroundColor: '#FFF3E0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeBadge: {
    backgroundColor: '#FF8C42',
  },
  cardIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  orangeIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#4CAF50',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  orangeLabel: {
    color: '#FF8C42',
  },
  cardValue: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_PRIMARY,
  },
  marksValue: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#4CAF50',
  },
  wrongMarksValue: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#FF8C42',
  },
  marksLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#4CAF50',
  },
  wrongMarksLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#FF8C42',
  },
  noNegative: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginTop: 20,
    marginBottom: 16,
  },
  exampleContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    gap: 12,
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exampleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  redIcon: {
    backgroundColor: '#FFEBEE',
    color: '#F44336',
  },
  exampleInfo: {
    flex: 1,
  },
  exampleLabel: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  exampleFormula: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
  },
  exampleScore: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  totalScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  totalScoreBadge: {
    backgroundColor: '#EDE9FE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  totalScoreValue: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  proTipCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 24,
    flexDirection: 'row',
    gap: 12,
  },
  tipIcon: {
    fontSize: 24,
    marginTop: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#9C6D00',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },
  tipBold: {
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  bottomCTA: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
  },
  nextButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ScoringExplainedScreen;
