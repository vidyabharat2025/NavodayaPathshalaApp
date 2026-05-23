/**
 * Topic List Screen Styles
 */

import { StyleSheet } from 'react-native';
import COLORS from '../../config/colors';
import { Fonts } from '../../config/fonts';
import SPACING from '../../config/spacing';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: SPACING.LARGE,
  },

  // Header Section
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

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  backIcon: {
    fontSize: 20,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },

  headerTextContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
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

  // Overall Progress Block
  overallProgressBlock: {
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },

  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressLabel: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },

  progressPercentage: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: '#6C4DFF',
  },

  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6C4DFF',
  },

  // Search Section
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFF2',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    gap: 8,
  },

  searchIcon: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_PRIMARY,
    padding: 0,
  },

  // Topics Container
  topicsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },

  // Loading State
  loaderContainer: {
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
