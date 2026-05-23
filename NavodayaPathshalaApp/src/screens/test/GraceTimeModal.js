/**
 * Grace Time Modal
 * Displayed when time runs out, allowing student to request extra time
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import COLORS from '../../config/colors';
import { Fonts } from '../../config/fonts';

// Grace period configuration - Can be updated later or fetched from BE
const MAX_GRACE_PERIODS = 1;

const GraceTimeModal = ({ visible, onClose, onRequestTime, onFinish, gracePeriodsUsed = 0 }) => {
  const gracePeriodsRemaining = MAX_GRACE_PERIODS - gracePeriodsUsed;
  const canRequestGrace = gracePeriodsRemaining > 0;

  const handleRequestTime = (minutes) => {
    if (onRequestTime && canRequestGrace) {
      onRequestTime(minutes);
    }
  };

  const handleFinishTest = () => {
    if (onFinish) {
      onFinish();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      {/* Backdrop */}
      <View style={styles.backdrop}>
        {/* Modal Card */}
        <View style={styles.modalCard}>
          {/* Clock Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.clockIcon}>⏰</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Time's up!</Text>

          {/* Subtext - Changes based on grace periods remaining */}
          <Text style={styles.subtext}>
            {canRequestGrace 
              ? 'You can request extra time or finish the test now.'
              : 'No more grace periods available. Please finish the test.'}
          </Text>

          {/* Time Request Buttons - Only show if grace periods available */}
          {canRequestGrace && (
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.timeButton, styles.timeButton5]}
                onPress={() => handleRequestTime(5)}
                activeOpacity={0.7}
              >
                <Text style={styles.timeButtonText}>+5 min</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.timeButton, styles.timeButton10]}
                onPress={() => handleRequestTime(10)}
                activeOpacity={0.7}
              >
                <Text style={styles.timeButtonText}>+10 min</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.timeButton, styles.timeButton15]}
                onPress={() => handleRequestTime(15)}
                activeOpacity={0.7}
              >
                <Text style={styles.timeButtonText}>+15 min</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Finish Test Button */}
          <TouchableOpacity
            style={[styles.timeButton, styles.finishButton, !canRequestGrace && styles.fullWidthButton]}
            onPress={handleFinishTest}
            activeOpacity={0.8}
          >
            <Text style={styles.finishButtonText}>
              {canRequestGrace ? 'Finish Test' : 'View Results'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.PURPLE_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  clockIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  timeButton: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeButton5: {
    backgroundColor: '#FEF3C7',
  },
  timeButton10: {
    backgroundColor: '#DBEAFE',
  },
  timeButton15: {
    backgroundColor: '#DCFCE7',
  },
  timeButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  finishButton: {
    backgroundColor: COLORS.PURPLE_PRIMARY,
    marginTop: 4,
  },
  fullWidthButton: {
    width: '100%',
  },
  finishButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
});

export default GraceTimeModal;
