/**
 * Settings Row Component
 * Displays a settings option with icon, label, and action (chevron or toggle)
 * Used in the Settings & Preferences section
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import COLORS from '../../config/colors';

const SettingsRow = ({
  icon,
  title,
  subtitle,
  rightComponent,
  onPress = () => {},
  isLast = false,
}) => {
  const isImage = typeof icon === 'number';

  return (
    <TouchableOpacity 
      style={[styles.row, isLast && styles.rowLast]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        {isImage ? (
          <Image source={icon} style={styles.iconImage} />
        ) : (
          <Text style={styles.icon}>{icon}</Text>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* Right Component (Chevron, Toggle, etc.) */}
      {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.BG_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  rightComponent: {
    marginLeft: 12,
  },
});

export default SettingsRow;
