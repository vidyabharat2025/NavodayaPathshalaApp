/**
 * Exam Day Guide Screen
 * Final screen with day-of checklist and instructions
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

const ExamDayGuideScreen = ({ route, navigation }) => {
  const { data, language, toggleLanguage } = route.params || {};

  if (!data || !data.examDayGuide) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to load content</Text>
      </SafeAreaView>
    );
  }

  const guide = data.examDayGuide;

  const getItemIcon = (itemName) => {
    const iconMap = {
      'Admit Card': '📋',
      'Blue or Black Pen': '✏️',
      'Water Bottle': '💧',
      'Calculator': '🧮',
      'Smart Watch': '⌚',
      'Mobile Phone': '📱',
    };
    return iconMap[itemName] || '📦';
  };

  const getTimelineStatus = (index) => {
    return index === guide.timeline.length - 1 ? 'active' : 'inactive';
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
          <Text style={styles.headerGreeting}>Exam Day Guide</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* What to Bring */}
        <Text style={styles.sectionTitle}>What to Bring</Text>
        <View style={styles.itemsGrid}>
          {guide.bring && guide.bring.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <View style={styles.itemIconContainer}>
                <Text style={styles.itemIcon}>{getItemIcon(item)}</Text>
              </View>
              <Text style={styles.itemLabel}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Don't Bring */}
        <Text style={styles.sectionTitle}>Don't Bring</Text>
        <View style={styles.itemsGrid}>
          {guide.dontBring && guide.dontBring.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <View style={[styles.itemIconContainer, styles.deniedContainer]}>
                <Text style={styles.itemIcon}>{getItemIcon(item)}</Text>
                <View style={styles.redXBadge}>
                  <Text style={styles.redXText}>✕</Text>
                </View>
              </View>
              <Text style={styles.itemLabel}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Timeline */}
        <Text style={styles.sectionTitle}>Timeline</Text>
        {guide.timeline && guide.timeline.map((item, index) => (
          <View key={index} style={styles.timelineItem}>
            {/* Timeline Line */}
            {index < guide.timeline.length - 1 && (
              <View style={styles.timelineLine} />
            )}

            {/* Timeline Dot */}
            <View
              style={[
                styles.timelineDot,
                getTimelineStatus(index) === 'active'
                  ? styles.timelineDotActive
                  : styles.timelineDotInactive,
              ]}
            />

            {/* Timeline Content */}
            <View style={styles.timelineContent}>
              <Text
                style={[
                  styles.timelineTime,
                  getTimelineStatus(index) === 'active'
                    ? styles.timelineTimeActive
                    : {},
                ]}
              >
                {item.time}
              </Text>
              <View style={styles.timelineEventCard}>
                <Text style={styles.timelineEventTitle}>{item.event}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Motivational Card */}
        <View style={styles.motivationalCard}>
          <View style={styles.motivationalIconContainer}>
            <Text style={styles.motivationalIcon}>😊</Text>
          </View>
          <Text style={styles.motivationalTitle}>You are ready!</Text>
          <Text style={styles.motivationalSubtitle}>
            You have prepared well. Believe in yourself and do your best.
          </Text>
        </View>

        {/* Download Checklist Button */}
        <TouchableOpacity
          style={styles.downloadButton}
          activeOpacity={0.8}
        >
          <Text style={styles.downloadButtonIcon}>⬇️</Text>
          <Text style={styles.downloadButtonText}>Download Checklist for Parents</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.finishButtonText}>Finish Guide ✓</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
    marginTop: 20,
  },
  itemsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  itemCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 8,
  },
  itemIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  deniedContainer: {
    backgroundColor: '#FFEBEE',
  },
  itemIcon: {
    fontSize: 28,
  },
  redXBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redXText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  itemLabel: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 12,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 19,
    top: 44,
    width: 2,
    height: 40,
    backgroundColor: '#D0D0D0',
    zIndex: 0,
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginRight: 12,
  },
  timelineDotInactive: {
    backgroundColor: '#D0D0D0',
  },
  timelineDotActive: {
    backgroundColor: '#4CAF50',
  },
  timelineContent: {
    flex: 1,
    paddingTop: 6,
  },
  timelineTime: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 4,
  },
  timelineTimeActive: {
    color: COLORS.PRIMARY,
  },
  timelineEventCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  timelineEventTitle: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  timelineEventDescription: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 16,
  },
  motivationalCard: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 24,
  },
  motivationalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  motivationalIcon: {
    fontSize: 40,
  },
  motivationalTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
    marginBottom: 8,
    textAlign: 'center',
  },
  motivationalSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.WHITE,
    textAlign: 'center',
    lineHeight: 20,
  },
  downloadButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  downloadButtonIcon: {
    fontSize: 18,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  bottomCTA: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
  },
  finishButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishButtonText: {
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

export default ExamDayGuideScreen;
