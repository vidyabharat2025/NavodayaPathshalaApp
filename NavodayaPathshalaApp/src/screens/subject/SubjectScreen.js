// SubjectScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import usePaginatedSubjects from '../../hooks/usePaginatedSubjects';
import useGreeting from '../../hooks/useGreeting';
import { useAppContext } from '../../store/AppContext';
import SubjectCard from './SubjectCard';
import EmptyState from '../../components/common/EmptyState';
import styles from './subjectStyles';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../config/colors';

const SubjectScreen = () => {
  const { state } = useAppContext();
  const user = state?.user;
  const gradeId = user?.gradeId || 1;
  const language = user?.language || 'en';
  const navigation = useNavigation();
  const greeting = useGreeting();

  // Use paginated subjects hook
  const {
    subjects,
    loading,
    loadingMore,
    error,
    hasMore,
    search,
    onSearch,
    onLoadMore,
    onRefresh,
  } = usePaginatedSubjects(gradeId, language, 10);

  const userName = user?.name || 'Alex';
  const streak = user?.streak || 12;

  /**
   * Handle scroll event for infinite pagination
   */
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 400; // Load more when 400px from bottom

    if (contentSize.height - contentOffset.y - layoutMeasurement.height < paddingToBottom) {
      onLoadMore();
    }
  };

  const handleSubjectPress = (subject) => {
    navigation.navigate('TopicList', {
      subjectId: subject.id,
      subjectName: subject.name,
      languageCode: subject.language_code,
    });
  };

  /**
   * Render empty state or error
   */
  const renderEmptyState = () => {
    if (error) {
      return (
        <EmptyState
          type="error"
          title="Failed to Load Subjects"
          message={error || "We couldn't load your subjects. Please try again."}
          actionText="Retry"
          onAction={onRefresh}
        />
      );
    }

    if (!loading && subjects.length === 0 && search) {
      return (
        <EmptyState
          type="empty"
          title="No Results"
          message={`No subjects found for "${search}"`}
          icon="🔍"
        />
      );
    }

    if (!loading && subjects.length === 0) {
      return (
        <EmptyState
          type="empty"
          title="No Subjects Yet"
          message="You don't have any subjects assigned yet. Check back soon!"
          icon="📚"
        />
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.headerSection}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* Title + Greeting */}
        <View style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>My Subjects</Text>
          <Text style={styles.headerGreeting}>{greeting}, {userName}</Text>
        </View>

        {/* Streak Badge */}
        <View style={styles.streakBadge}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakNumber}>{streak}</Text>
        </View>
      </View>

      {/* Sticky Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search subjects..."
            placeholderTextColor={COLORS.TEXT_SECONDARY}
            value={search}
            onChangeText={onSearch}
          />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={loading && subjects.length > 0}
            onRefresh={onRefresh}
            tintColor={COLORS.PRIMARY}
          />
        }
        onScroll={handleScroll}
        scrollEventThrottle={400}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Show empty state or subjects list */}
        {renderEmptyState() ? (
          renderEmptyState()
        ) : (
          /* Subjects List */
          <View style={styles.subjectsContainer}>
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id.toString()}
                name={subject.name}
                totalTopics={subject.total_topics || subject.totalTopics || 0}
                progressPercentage={subject.progress_percentage || 0}
                color={subject.color || '#DC2626'}
                onPress={() => handleSubjectPress(subject)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubjectScreen;
