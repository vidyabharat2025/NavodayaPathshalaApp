/**
 * Selection Criteria Screen
 * Information about cutoff and selection process
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

const SelectionCriteriaScreen = ({ route, navigation }) => {
  const { data, language, toggleLanguage } = route.params || {};

  if (!data || !data.selectionCriteria) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load content</Text>
      </SafeAreaView>
    );
  }

  const criteria = data.selectionCriteria;

  // Parse factors and add descriptions
  const getFactorDetails = (factorString) => {
    const factorMap = {
      'District Rank': {
        title: 'District Rank',
        description: 'Competition within district',
        icon: 'location',
      },
      'Rural Quota (75%)': {
        title: 'Rural Quota',
        description: '75% seats for rural',
        icon: 'tree',
      },
      'Reservation Rules': {
        title: 'Reservation',
        description: 'SC/ST/OBC rules apply',
        icon: 'people',
      },
    };
    return factorMap[factorString] || {
      title: factorString,
      description: '',
      icon: 'rank',
    };
  };

  const factorsData = criteria.factors && typeof criteria.factors[0] === 'string'
    ? criteria.factors.map(f => getFactorDetails(f))
    : criteria.factors;

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
          <Text style={styles.headerGreeting}>Selection Criteria</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconEmoji}>🏆</Text>
          </View>
          <Text style={styles.heroTitle}>Selection is based on merit</Text>
          <Text style={styles.heroSubtitle}>
            Only the best performers in your district get selected based on the final score.
          </Text>
        </View>

        {/* Target Score Card */}
        <View style={styles.targetCard}>
          <View style={styles.targetHeader}>
            <Text style={styles.targetIcon}>📊</Text>
            <Text style={styles.targetLabel}>Target Score</Text>
          </View>

          <View style={styles.targetContent}>
            <Text style={styles.goalLabel}>Current Goal</Text>
            <Text style={styles.goalScore}>{criteria.targetScorePercent}%</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${criteria.targetScorePercent}%` }]} />
          </View>

          <View style={styles.safeZoneContainer}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.safeZoneText}>{criteria.targetScorePercent}%+ Safe Zone</Text>
          </View>
        </View>

        {/* Key Factors */}
        <Text style={styles.keyFactorsTitle}>Key Factors</Text>

        {/* Factors List */}
        {factorsData && factorsData.map((factor, index) => (
          <View key={index} style={styles.factorCard}>
            <View style={[styles.factorIconContainer, styles[`factor${index}Color`]]}>
              <Text style={styles.factorEmoji}>{getFactorIcon(factor.icon)}</Text>
            </View>
            <View style={styles.factorContent}>
              <Text style={styles.factorTitle}>{factor.title}</Text>
              <Text style={styles.factorDescription}>{factor.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ExamDayGuide')}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const getFactorIcon = (iconName) => {
  const iconMap = {
    location: '📍',
    tree: '🌲',
    people: '👥',
    rank: '📊',
    quota: '📈',
    reservation: '👥',
  };
  return iconMap[iconName] || '•';
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
  heroCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF3CD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroIconEmoji: {
    fontSize: 48,
  },
  heroTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
  },
  targetCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  targetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  targetIcon: {
    fontSize: 20,
    color: COLORS.PRIMARY,
  },
  targetLabel: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  targetContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalLabel: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
  },
  goalScore: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
  },
  safeZoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkmark: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  safeZoneText: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.PRIMARY,
  },
  keyFactorsTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 12,
  },
  factorCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  factorIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  factor0Color: {
    backgroundColor: '#E3F2FD',
  },
  factor1Color: {
    backgroundColor: '#E8F5E9',
  },
  factor2Color: {
    backgroundColor: '#F3E5F5',
  },
  factorEmoji: {
    fontSize: 20,
  },
  factorContent: {
    flex: 1,
    paddingTop: 2,
  },
  factorTitle: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  factorDescription: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: 16,
    textAlign: 'center',
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
});

export default SelectionCriteriaScreen;
