/**
 * Profile Screen Styles
 * Refactored to match Stitch UI design
 * - Modern gradient header with decorative elements
 * - Clean card-based layout
 * - Proper spacing and typography
 */

import { StyleSheet } from 'react-native';
import COLORS from '../../config/colors';
import FONTS from '../../config/fonts';

const profileStyles = StyleSheet.create({
  // ========== SCREEN CONTAINER ==========
  screenContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  scrollContent: {
    paddingBottom: 32,
  },

  // ========== HEADER GRADIENT ==========
  headerGradient: {
    paddingTop: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    position: 'relative',
  },

  blurTopRight: {
    position: 'absolute',
    top: -60,
    right: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.5,
  },

  blurBottomLeft: {
    position: 'absolute',
    bottom: -40,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.3,
  },

  headerContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 32,
    position: 'relative',
  },

  headerEditButton: {
    position: 'absolute',
    top: 64,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  headerEditIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#ffffff',
  },

  // ========== AVATAR SECTION ==========
  avatarWrapper: {
    position: 'relative',
    marginBottom: 24,
  },

  avatarContainer: {
    width: 112,
    height: 112,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },

  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#4f46e5',
  },

  avatarImage: {
    width: 112,
    height: 112,
    borderRadius: 24,
  },

  editButton: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },

  editIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#4f46e5',
  },

  // ========== PROFILE INFO ==========
  nameText: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: FONTS.FAMILY.BOLD,
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: -0.5,
  },

  gradeBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  gradeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONTS.FAMILY.SEMI_BOLD,
    color: '#ffffff',
    letterSpacing: 0.3,
  },

  // ========== LOADING STATE ==========
  loadingContainer: {
    marginHorizontal: 16,
    marginTop: -32,
    marginBottom: 20,
    paddingVertical: 60,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },

  // ========== PROFILE DETAILS CARD ==========
  detailsCard: {
    marginHorizontal: 16,
    marginTop: -32,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONTS.FAMILY.BOLD,
    color: '#1f2937',
    letterSpacing: 0.2,
  },

  cardHeaderIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
    tintColor: '#4f46e5',
  },

  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },

  detailsGrid: {
    backgroundColor: '#ffffff',
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },

  twoColumnRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },

  twoColumnCell: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#f3f4f6',
  },

  rightCell: {
    borderRightWidth: 0,
  },

  detailDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 0,
  },

  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONTS.FAMILY.SEMI_BOLD,
    color: COLORS.TEXT_DISABLED,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    flex: 0.4,
  },

  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FONTS.FAMILY.MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    flex: 0.6,
    textAlign: 'right',
  },

  leftAligned: {
    textAlign: 'left',
    marginTop: 8,
  },

  // ========== SETTINGS CARD ==========
  settingsCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },

  settingsHeader: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },

  settingsTitle: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONTS.FAMILY.BOLD,
    color: '#9ca3af',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  settingsList: {
    backgroundColor: '#ffffff',
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },

  lastSettingItem: {
    borderBottomWidth: 0,
  },

  settingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },

  settingIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#4f46e5',
  },

  settingContent: {
    flex: 1,
    justifyContent: 'center',
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.FAMILY.SEMI_BOLD,
    color: '#1f2937',
  },

  settingSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONTS.FAMILY.REGULAR,
    color: '#d1d5db',
    marginTop: 4,
  },

  settingSwitch: {
    marginLeft: 8,
  },

  settingDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 56,
  },

  chevronIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#d1d5db',
  },

  // ========== LOGOUT BUTTON ==========
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#fee2e2',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },

  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
    tintColor: '#ef4444',
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.FAMILY.SEMI_BOLD,
    color: '#ef4444',
    letterSpacing: 0.2,
  },

  // ========== FOOTER ==========
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  footerText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: FONTS.FAMILY.MEDIUM,
    color: '#9ca3af',
    letterSpacing: 0.3,
  },
});

export default profileStyles;
