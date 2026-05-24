/**
 * About JNVST Screen
 * First screen of exam intro flow
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

const AboutJNVSTScreen = ({ route, navigation }) => {
  const { data, language, toggleLanguage } = route.params || {};

  if (!data || !data.about) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load content</Text>
      </SafeAreaView>
    );
  }

  const about = data.about;
  const benefits = data.whyNavodaya.benefits || [];
  const textContent = about.title || 'About JNVST';
  const subtitleContent = about.subtitle || '';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Just Back Button */}
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

        {/* Title + Subtitle */}
        <View style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>Exam Introduction</Text>
          <Text style={styles.headerGreeting}>
            {textContent}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        {about.heroImage && (
          <Image
            source={{ uri: about.heroImage }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        )}

        {/* Title */}
        <View style={styles.textSection}>
          <Text style={styles.title}>{textContent}</Text>

          {/* Subtitle */}
          {subtitleContent && (
            <Text style={styles.subtitle}>{subtitleContent}</Text>
          )}
        </View>

        {/* Benefits Section */}
        {benefits && benefits.length > 0 && (
          <View style={styles.benefitsSection}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitCard}>
                {benefit.icon && (
                  <Image
                    source={{ uri: benefit.icon }}
                    style={styles.benefitIcon}
                    resizeMode="contain"
                  />
                )}
                <View style={styles.benefitContent}>
                  {benefit.label && (
                    <Text style={styles.benefitLabel}>{benefit.label}</Text>
                  )}
                  <Text style={styles.benefitTitle}>
                    {benefit.title}
                  </Text>
                  <Text style={styles.benefitDescription}>
                    {benefit.description}
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
          onPress={() => navigation.navigate('ExamPattern')}
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
    paddingBottom: 20,
    paddingHorizontal: 16
  },
  heroImage: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  textSection: {
    // paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 24,
  },
  benefitsSection: {
    // paddingHorizontal: 16,
    gap: 12,
  },
  benefitCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F4FF',
  },
  benefitContent: {
    flex: 1,
  },
  benefitLabel: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.PRIMARY,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  benefitTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 6,
  },
  benefitDescription: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
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

export default AboutJNVSTScreen;
