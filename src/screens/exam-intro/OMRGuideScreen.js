/**
 * OMR Guide Screen
 * Instructions for filling OMR sheets
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

const OMRGuideScreen = ({ route, navigation }) => {
  const { data, language } = route.params || {};

  if (!data || !data.omrGuide) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load content</Text>
      </SafeAreaView>
    );
  }

  const omrGuide = data.omrGuide;

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
            OMR Guide
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Basic Info</Text>
          </View>
          <View style={styles.heroImagePlaceholder}>
            <Text style={styles.heroImageText}>👩</Text>
          </View>
          <Text style={styles.heroTitle}>{omrGuide.intro}</Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoBlueDot}>
            <Text style={styles.infoDotText}>ℹ</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>{omrGuide.description}</Text>
          </View>
        </View>

        {/* How to Fill Bubbles Section */}
        <View>
          <Text style={styles.sectionTitle}>How to Fill Bubbles</Text>

          {/* Correct Way Card */}
          <View style={styles.correctWayCard}>
            <View style={styles.correctBadge}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.correctBadgeText}>Correct Way</Text>
            </View>

            {/* Circle Visualization */}
            <View style={styles.circleContainer}>
              <View style={styles.filledCircle} />
            </View>

            <Text style={styles.correctLabel}>Fill completely</Text>
          </View>

          {/* Incorrect Ways Grid */}
          <View style={styles.incorrectGrid}>
            {/* Don't Tick */}
            <View style={styles.incorrectCard}>
              <View style={styles.circleWithBadge}>
                <View style={styles.incorrectCircle}>
                  <Text style={styles.tickIcon}>✓</Text>
                </View>
                <View style={styles.badgeIcon}>
                  <Text style={styles.badgeX}>✕</Text>
                </View>
              </View>
              <Text style={styles.incorrectLabel}>Don't Tick</Text>
            </View>

            {/* Don't Half Fill */}
            <View style={styles.incorrectCard}>
              <View style={styles.circleWithBadge}>
                <View style={styles.incorrectCircle}>
                  <View style={styles.halfFilledCircle} />
                </View>
                <View style={styles.badgeIcon}>
                  <Text style={styles.badgeX}>✕</Text>
                </View>
              </View>
              <Text style={styles.incorrectLabel}>Don't Half Fill</Text>
            </View>

            {/* Don't Cross */}
            <View style={styles.incorrectCard}>
              <View style={styles.circleWithBadge}>
                <View style={styles.incorrectCircle}>
                  <Text style={styles.crossIcon}>✕</Text>
                </View>
                <View style={styles.badgeIcon}>
                  <Text style={styles.badgeX}>✕</Text>
                </View>
              </View>
              <Text style={styles.incorrectLabel}>Do not cross</Text>
            </View>

            {/* Don't Fill Two */}
            <View style={styles.incorrectCard}>
              <View style={styles.circleWithBadge}>
                <View style={styles.doubleCirlceContainer}>
                  <View style={styles.filledCircleSmall} />
                  <View style={[styles.filledCircleSmall, { marginLeft: -10 }]} />
                </View>
                <View style={styles.badgeIcon}>
                  <Text style={styles.badgeX}>✕</Text>
                </View>
              </View>
              <Text style={styles.incorrectLabel}>Do not fill two bubbles</Text>
            </View>
          </View>
        </View>

        {/* Tools Allowed Section */}
        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>Tools Allowed</Text>

          {/* Allowed Tool */}
          <View style={styles.toolCard}>
            <View style={styles.toolLeftBorder} />
            <View style={styles.toolIcon}>
              <Text style={styles.toolIconText}>✏️</Text>
            </View>
            <View style={styles.toolContent}>
              <Text style={styles.toolTitle}>Blue or Black Pen</Text>
              <Text style={styles.toolSubtitle}>Ball point only</Text>
            </View>
            <View style={styles.allowedBadge}>
              <Text style={styles.allowedIcon}>✓</Text>
            </View>
          </View>

          {/* Not Allowed Tool */}
          <View style={styles.toolCard}>
            <View style={styles.toolLeftBorderDisabled} />
            <View style={styles.toolIcon}>
              <Text style={styles.toolIconText}>✏️</Text>
            </View>
            <View style={styles.toolContent}>
              <Text style={styles.toolTitle}>Pencil or Gel Pen</Text>
              <Text style={styles.toolSubtitle}>Not allowed</Text>
            </View>
            <View style={styles.disallowedBadge}>
              <Text style={styles.disallowedIcon}>✕</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('ScoringExplained')}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Try Filling a Sample</Text>
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
  heroCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  heroBadge: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 16,
    borderRadius: 8,
  },
  heroBadgeText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  heroImagePlaceholder: {
    width: '100%',
    height: 220,
    backgroundColor: '#E8D4B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  heroImageText: {
    fontSize: 100,
  },
  heroTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  infoBox: {
    backgroundColor: '#EBF5FF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  infoBlueDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoDotText: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: '700',
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
  },
  correctWayCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  correctBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  checkIcon: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontWeight: '700',
  },
  correctBadgeText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  circleContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  filledCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1A1A1A',
    borderWidth: 3,
    borderColor: '#D0D0D0',
  },
  correctLabel: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#2E7D32',
  },
  incorrectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  incorrectCard: {
    width: '48%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  circleWithBadge: {
    position: 'relative',
    width: 80,
    height: 80,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incorrectCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tickIcon: {
    fontSize: 28,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  crossIcon: {
    fontSize: 28,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  halfFilledCircle: {
    width: '100%',
    height: '50%',
    backgroundColor: '#1A1A1A',
  },
  doubleCirlceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledCircleSmall: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#1A1A1A',
  },
  badgeIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.ERROR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeX: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontWeight: '700',
  },
  incorrectLabel: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  toolsSection: {
    marginBottom: 24,
  },
  toolCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  toolLeftBorder: {
    width: 4,
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
    marginLeft: -14,
    marginRight: 8,
  },
  toolLeftBorderDisabled: {
    width: 4,
    height: '100%',
    backgroundColor: COLORS.ERROR,
    borderRadius: 2,
    marginLeft: -14,
    marginRight: 8,
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolIconText: {
    fontSize: 20,
  },
  toolContent: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  toolSubtitle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
  },
  allowedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allowedIcon: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '700',
  },
  disallowedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disallowedIcon: {
    fontSize: 16,
    color: COLORS.ERROR,
    fontWeight: '700',
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

export default OMRGuideScreen;
