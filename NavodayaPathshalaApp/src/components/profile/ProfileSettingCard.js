// ProfileSettingCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import COLORS from '../../config/colors';

const ProfileSettingCard = ({
  icon,
  title,
  subtitle,
  rightComponent,
  iconBackgroundColor,
  onPress = () => {},
}) => {
  const isImage = typeof icon === 'number'; // Image require() returns a number

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon Container */}
      <View
        style={[
          styles.iconWrapper,
          iconBackgroundColor && { backgroundColor: iconBackgroundColor },
        ]}
      >
        {isImage ? (
          <Image source={icon} style={styles.iconImage} />
        ) : (
          <Text style={styles.icon}>{icon}</Text>
        )}
      </View>

      {/* Content */}
      <View style={styles.contentSection}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* Right Component (Chevron, Switch, etc.) */}
      {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.BG_PRIMARY,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },
  icon: {
    fontSize: 22,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  contentSection: {
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
  },
  rightComponent: {
    marginLeft: 12,
  },
});

export default ProfileSettingCard;
