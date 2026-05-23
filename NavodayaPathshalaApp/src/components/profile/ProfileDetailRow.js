/**
 * Profile Detail Row Component
 * Displays a detail field with label on left and value on right
 * Used in the Profile Details section
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../config/colors';

const ProfileDetailRow = ({ label, value, isLast }) => {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {!isLast && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER,
    marginHorizontal: 16,
  },
});

export default ProfileDetailRow;
