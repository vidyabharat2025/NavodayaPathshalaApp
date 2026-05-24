/**
 * TaskFilterBar Component
 * Displays conditional filter dropdowns based on active test type tab
 * - Lesson Tests: Subject → Topic → Lesson
 * - Topic Tests: Subject → Topic
 * - Subject Tests: Subject
 * - My Grade Tests: No filters
 * - Mock Tests: No filters
 * - PYQ: No filters
 */

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import { Fonts } from '../../config/fonts';
import COLORS from '../../config/colors';

/**
 * TaskFilterDropdown - Individual dropdown for a filter
 */
const TaskFilterDropdown = ({
  label,
  placeholder,
  selectedValue,
  items = [],
  onValueChange,
  loading = false,
  disabled = false,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const displayLabel = selectedValue
    ? items.find(item => item.id === selectedValue)?.name || selectedValue
    : placeholder;

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.optionItem,
        selectedValue === item.id && styles.optionItemSelected,
      ]}
      onPress={() => {
        onValueChange(item.id);
        setShowOptions(false);
      }}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.optionItemText,
          selectedValue === item.id && styles.optionItemTextSelected,
        ]}
        numberOfLines={1}
      >
        {item.name}
      </Text>
      {selectedValue === item.id && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.noOptions}>
      <Text style={styles.noOptionsText}>No options available</Text>
    </View>
  );

  return (
    <View style={styles.dropdownWrapper}>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          disabled && styles.dropdownButtonDisabled,
        ]}
        onPress={() => !disabled && setShowOptions(!showOptions)}
        activeOpacity={disabled ? 0.5 : 0.7}
        disabled={disabled}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            !selectedValue && styles.dropdownPlaceholderText,
            disabled && styles.dropdownButtonTextDisabled,
          ]}
          numberOfLines={1}
        >
          {displayLabel}
        </Text>
        {loading && (
          <ActivityIndicator size="small" color={disabled ? COLORS.GRAY : COLORS.PRIMARY} />
        )}
        {!loading && (
          <Text style={[styles.dropdownIcon, disabled && styles.dropdownIconDisabled]}>
            {showOptions ? '▲' : '▼'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Options Modal - Always rendered, visible controlled by state */}
      <Modal
        visible={showOptions}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOptions(false)}
      >
        {/* Overlay background - catches touches outside modal content */}
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setShowOptions(false)}
          />
          <View style={styles.optionsContainer}>
            <FlatList
              data={items}
              renderItem={renderOption}
              keyExtractor={(item) => String(item.id)}
              scrollEnabled={items.length > 5}
              nestedScrollEnabled={true}
              ListEmptyComponent={renderEmpty}
              style={styles.optionsList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

/**
 * TaskFilterBar - Main filter bar component
 */
const TaskFilterBar = ({
  activeTab,
  selectedSubjectId,
  selectedTopicId,
  selectedLessonId,
  subjects = [],
  topics = [],
  lessons = [],
  onSubjectChange,
  onTopicChange,
  onLessonChange,
  loadingSubjects = false,
  loadingTopics = false,
  loadingLessons = false,
  disableTopics = false,
  disableLessons = false,
}) => {
  // Determine which filters to show based on active tab
  const filterConfig = useMemo(() => {
    const config = {
      'Lesson Tests': ['subject', 'topic', 'lesson'],
      'Topic Tests': ['subject', 'topic'],
      'Subject Tests': ['subject'],
      'My Grade Tests': [],
      'Mock Tests': [],
      'Past Year Papers (PYQ)': [],
    };
    return config[activeTab] || [];
  }, [activeTab]);

  // Don't render if no filters needed
  if (filterConfig.length === 0) {
    return null;
  }

  return (
    <View style={styles.filterBarContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {/* Subject Filter */}
        {filterConfig.includes('subject') && (
          <TaskFilterDropdown
            label="Subject"
            placeholder="Select subject"
            selectedValue={selectedSubjectId}
            items={subjects}
            onValueChange={onSubjectChange}
            loading={loadingSubjects}
          />
        )}

        {/* Topic Filter */}
        {filterConfig.includes('topic') && (
          <TaskFilterDropdown
            label="Topic"
            placeholder="Select topic"
            selectedValue={selectedTopicId}
            items={topics}
            onValueChange={onTopicChange}
            loading={loadingTopics}
            disabled={disableTopics}
          />
        )}

        {/* Lesson Filter */}
        {filterConfig.includes('lesson') && (
          <TaskFilterDropdown
            label="Lesson"
            placeholder="Select lesson"
            selectedValue={selectedLessonId}
            items={lessons}
            onValueChange={onLessonChange}
            loading={loadingLessons}
            disabled={disableLessons}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterBarContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  filterScroll: {
    maxHeight: 44,
  },
  filterContent: {
    gap: 12,
    paddingRight: 16,
  },
  dropdownWrapper: {
    minWidth: 140,
    maxWidth: 180,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    minHeight: 36,
    gap: 8,
  },
  dropdownButtonDisabled: {
    opacity: 0.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.regular,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
  },
  dropdownButtonTextDisabled: {
    color: '#9CA3AF',
  },
  dropdownPlaceholderText: {
    color: COLORS.TEXT_SECONDARY,
  },
  dropdownIcon: {
    fontSize: 10,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '600',
  },
  dropdownIconDisabled: {
    color: '#D1D5DB',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '70%',
    minHeight: 300,
    paddingBottom: 20,
  },
  optionsList: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionItemSelected: {
    backgroundColor: '#F0F4FF',
  },
  optionItemText: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_PRIMARY,
  },
  optionItemTextSelected: {
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  checkmark: {
    fontSize: 18,
    color: COLORS.PRIMARY,
    marginLeft: 12,
  },
  noOptions: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  noOptionsText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default TaskFilterBar;
