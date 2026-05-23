// LessonListScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import usePaginatedLessons from '../../hooks/usePaginatedLessons';
import LessonCard from './LessonCard';
import EmptyState from '../../components/common/EmptyState';
import COLORS from '../../config/colors';
import { useAppContext } from '../../store/AppContext';
import styles from './lessonListStyles';

const LessonListScreen = ({ route }) => {
  const { topicId, topicName, languageCode } = route.params;
  const { state } = useAppContext();
  const userName = state?.user?.name || 'Student';
  const streak = state?.user?.streak || 0;
  const navigation = useNavigation();

  // Use paginated lessons hook
  const {
    items: lessons,
    loading,
    loadingMore,
    error,
    hasMore,
    search,
    onSearch,
    onLoadMore,
    onRefresh,
  } = usePaginatedLessons(topicId, languageCode, 10);



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

  /**
   * Render individual lesson card
   */
  const renderLessonCard = (item, index) => {
    let status = 'notstarted';
    if (item.completion_status === 'completed') {
      status = 'completed';
    } else if (item.completion_status === 'in_progress') {
      status = 'inprogress';
    }

    return (
      <LessonCard
        lessonNumber={index + 1}
        title={item.name || item.title}
        status={status}
        onPress={() =>
          navigation.navigate('LessonDetails', {
            lessonId: item.id,
            lessonTitle: item.name || item.title,
          })
        }
      />
    );
  };

  /**
   * Render empty state or error
   */
  const renderEmptyState = () => {
    if (error) {
      return (
        <EmptyState
          type="error"
          title="Failed to Load Lessons"
          message={error || "We couldn't load your lessons. Please try again."}
          actionText="Retry"
          onAction={onRefresh}
        />
      );
    }

    if (!loading && lessons.length === 0 && search) {
      return (
        <EmptyState
          type="empty"
          title="No Results"
          message={`No lessons found for "${search}"`}
          icon="🔍"
        />
      );
    }

    if (!loading && lessons.length === 0) {
      return (
        <EmptyState
          type="empty"
          title="No Lessons Available"
          message="There are no lessons available for this topic."
          icon="🎓"
        />
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sticky Header - Standardized Design */}
      <View style={styles.headerSection}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Image
            source={require('../../assets/icons/back-arrow.png')}
            style={styles.backArrowIcon}
          />
        </TouchableOpacity>

        {/* Title + Subtitle */}
        <View style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>Lessons</Text>
          <Text style={styles.headerGreeting}>
            {topicName}
          </Text>
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
            placeholder="Search lessons..."
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
            refreshing={loading && lessons.length > 0}
            onRefresh={onRefresh}
            tintColor={COLORS.PRIMARY}
          />
        }
        onScroll={handleScroll}
        scrollEventThrottle={400}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Show empty state or lessons list */}
        {renderEmptyState() ? (
          renderEmptyState()
        ) : (
          <View style={styles.lessonsContainer}>
            {lessons.map((lesson, index) => (
              <View key={lesson.id.toString()}>
                {renderLessonCard(lesson, index)}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessonListScreen;
