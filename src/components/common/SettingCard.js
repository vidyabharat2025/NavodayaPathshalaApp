/**
 * SettingCard Component
 * Reusable component for profile settings
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Switch,
  Image,
} from 'react-native';
import AppText from './AppText';
import THEME from '../../config/theme';

const COLORS = THEME.COLORS;
const SPACING = THEME.SPACING;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    paddingHorizontal: SPACING.LARGE,
    paddingVertical: SPACING.LARGE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...THEME.SHADOWS.SMALL,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.LARGE,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '400',
  },
  rightContent: {
    alignItems: 'flex-end',
    marginLeft: SPACING.MEDIUM,
  },
});

/**
 * SettingCard Component
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {string} props.icon - Icon name
 * @param {string} props.iconBackgroundColor - Background color for icon
 * @param {boolean} props.isToggle - If true, shows toggle switch
 * @param {boolean} props.toggleValue - Toggle switch value
 * @param {Function} props.onToggle - Toggle change handler
 * @param {Function} props.onPress - Press handler for card
 * @param {string} props.rightText - Text to show on right side
 */
const SettingCard = ({
  title,
  subtitle,
  icon,
  iconBackgroundColor = COLORS.PRIMARY_LIGHT,
  isToggle = false,
  toggleValue = false,
  onToggle,
  onPress,
  rightText,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={isToggle ? null : onPress}
      activeOpacity={isToggle ? 1 : 0.6}
      disabled={isToggle}
    >
      <View style={styles.leftContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: iconBackgroundColor },
          ]}
        >
          {icon && (
            <Image
              source={icon}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          )}
        </View>
        <View style={styles.textContent}>
          <AppText style={styles.title}>{title}</AppText>
          {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
        </View>
      </View>

      <View style={styles.rightContent}>
        {isToggle ? (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ false: COLORS.BORDER, true: COLORS.PRIMARY }}
            thumbColor={COLORS.WHITE}
            style={{ transform: [{ scaleX: 0.92 }, { scaleY: 0.92 }] }}
          />
        ) : rightText ? (
          <AppText style={styles.subtitle}>{rightText}</AppText>
        ) : (
          <Image
            source={require('../../assets/icons/next.png')}
            style={{ width: 18, height: 18, resizeMode: 'contain' }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SettingCard;
