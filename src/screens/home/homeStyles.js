/**
 * Home Screen Styles
 * Modern, gradient-rich design for kids' education app
 */

import { StyleSheet } from 'react-native';
import COLORS from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 80,
    paddingTop: 0,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 14,
    marginHorizontal: 16,
  },
});

export default styles;
