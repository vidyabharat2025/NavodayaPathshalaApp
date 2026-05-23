/**
 * Preparation Tips Screen
 * Provides strategies for exam preparation
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

const PreparationTipsScreen = ({ route, navigation }) => {
  const { data, language } = route.params || {};

  if (!data || !data.preparationTips) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load content</Text>
      </SafeAreaView>
    );
  }

  const preparationTips = data.preparationTips;
  const steps = preparationTips.steps || [];

  const getIconEmoji = (iconName) => {
    const iconMap = {
      check: '✓',
      skip: '⏭️',
      clock: '⏱️',
      book: '📚',
      chart: '📊',
    };
    return iconMap[iconName] || '📌';
  };

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
            Preparation Tips
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>👨</Text>
          </View>
        </View>

        {/* Title with Emoji */}
        <Text style={styles.titleWithEmoji}>{preparationTips.title} 🕐</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Master your minutes with these 3 simple superpowers to ace the JNVST exam!
        </Text>

        {/* Steps Section */}
        {steps.length > 0 && (
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                {/* Left Border */}
                <View style={styles.leftBorder} />

                {/* Content */}
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>
                    Step {step.step}: {step.title}
                  </Text>
                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>
                </View>

                {/* Icon */}
                <View style={styles.stepIcon}>
                  <Text style={styles.stepIconText}>
                    {getIconEmoji(step.icon)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('OMRGuide')}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>I am ready! 🚀</Text>
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 280,
    height: 280,
    borderRadius: 16,
    backgroundColor: '#FFE8CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 120,
  },
  titleWithEmoji: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 24,
    marginBottom: 24,
  },
  stepsContainer: {
    gap: 12,
  },
  stepCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  leftBorder: {
    width: 4,
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 2,
    marginLeft: -16,
    marginRight: 8,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIconText: {
    fontSize: 20,
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

export default PreparationTipsScreen;
