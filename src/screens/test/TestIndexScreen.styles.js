import { StyleSheet } from 'react-native';
import COLORS from '../../config/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafaf8' },
  
  // ===== HEADER STYLES (Exam Paper Header) =====
  header: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  title: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  headerMeta: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  closeButtonText: { 
    color: '#2563eb', 
    fontWeight: '600',
    fontSize: 13,
  },

  // ===== EXAM PAPER HEADER SECTION =====
  examHeaderSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1.5,
    borderBottomColor: '#d1d5db',
  },
  examTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  examMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  examMeta: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  
  // ===== QUESTION INDEX SECTION =====
  indexSection: {
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  indexTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  indexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  indexItem: {
    width: '16.666%',
    paddingHorizontal: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  indexBox: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  indexBoxActive: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  indexNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1f2937',
  },
  indexNumberActive: {
    color: '#2563eb',
  },

  // ===== MAIN CONTENT LIST =====
  list: { 
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  // ===== PASSAGE STYLES (SECTION) =====
  passageCard: {
    backgroundColor: '#fff',
    borderRadius: 0,
    paddingTop: 20,
    paddingHorizontal: 0,
    marginBottom: 24,
    borderTopWidth: 3,
    borderTopColor: COLORS.PURPLE_PRIMARY,
  },
  passageTitle: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#111827',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  passageHeaderRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  orderBadge: {
    backgroundColor: COLORS.PURPLE_LIGHT,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.PURPLE_PRIMARY,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.PURPLE_PRIMARY,
  },

  // ===== QUESTION CARD STYLES (INDEX ITEM) =====
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 0,
    paddingVertical: 16,
    paddingHorizontal: 0,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  questionNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.PURPLE_PRIMARY,
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  questionText: { 
    fontSize: 15, 
    color: '#1f2937',
    fontWeight: '500',
    lineHeight: 22,
  },
  questionRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-start',
  },
  questionPreview: { 
    flex: 1, 
    fontSize: 15, 
    color: '#1f2937',
    fontWeight: '500',
    lineHeight: 22,
  },
  thumb: { 
    width: 80, 
    height: 60, 
    borderRadius: 4, 
    marginLeft: 12, 
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  thumbWrapper: { 
    borderRadius: 4, 
    overflow: 'hidden' 
  },

  // ===== PASSAGE QUESTION BLOCK =====
  passageQuestionBlock: {
    paddingVertical: 14,
    marginBottom: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  passageQuestionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  passageQuestionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.PURPLE_PRIMARY,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingRight: 12,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.PURPLE_PRIMARY,
  },
  passageImagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  passageQuestionImage: {
    width: 120,
    height: 90,
    borderRadius: 4,
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  // ===== OPTIONS SECTION =====
  optionsSection: {
    marginTop: 12,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e40af',
    marginRight: 12,
    marginTop: 2,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
  },

  // ===== LOAD MORE =====
  loadMore: { 
    padding: 20, 
    alignItems: 'center',
    paddingBottom: 40,
  },
  loadMoreText: { 
    color: '#2563eb', 
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.3,
  },

  // ===== EMPTY STATE =====
  emptyState: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    color: '#9ca3af',
    fontSize: 15,
    fontWeight: '500',
  },
});
