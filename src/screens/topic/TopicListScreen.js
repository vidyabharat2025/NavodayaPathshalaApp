// TopicListScreen.js
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
import usePaginatedTopics from '../../hooks/usePaginatedTopics';
import TopicCard from './TopicCard';
import EmptyState from '../../components/common/EmptyState';
import COLORS from '../../config/colors';
import { useAppContext } from '../../store/AppContext';
import styles from './topicListStyles';

const TopicListScreen = ({ route }) => {
  const { subjectId, subjectName, languageCode } = route.params;
  const { state } = useAppContext();
  const userName = state?.user?.name || 'Student';
  const streak = state?.user?.streak || 0;
  const navigation = useNavigation();

  // Use paginated topics hook
  const {
    items: topics,
    loading,
    loadingMore,
    error,
    hasMore,
    search,
    onSearch,
    onLoadMore,
    onRefresh,
  } = usePaginatedTopics(subjectId, languageCode, 10);



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
   * Render empty state or error
   */
  const renderEmptyState = () => {
    if (error) {
      return (
        <EmptyState
          type="error"
          title="Failed to Load Topics"
          message={error || "We couldn't load your topics. Please try again."}
          actionText="Retry"
          onAction={onRefresh}
        />
      );
    }

    if (!loading && topics.length === 0 && search) {
      return (
        <EmptyState
          type="empty"
          title="No Results"
          message={`No topics found for "${search}"`}
          icon="🔍"
        />
      );
    }

    if (!loading && topics.length === 0) {
      return (
        <EmptyState
          type="empty"
          title="No Topics Available"
          message="There are no topics available for this subject."
          icon="📖"
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
          <Text style={styles.headerTitle}>Topics</Text>
          <Text style={styles.headerGreeting}>
            {subjectName}
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
            placeholder="Search topics..."
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
            refreshing={loading && topics.length > 0}
            onRefresh={onRefresh}
            tintColor={COLORS.PRIMARY}
          />
        }
        onScroll={handleScroll}
        scrollEventThrottle={400}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Show empty state or topics list */}
        {renderEmptyState() ? (
          renderEmptyState()
        ) : (
          /* Topics List */
          <View style={styles.topicsContainer}>
            {topics.map((topic, index) => (
              <TopicCard
                key={topic.id.toString()}
                name={topic.name}
                lessonCount={topic.lesson_count || 0}
                progress={typeof topic.progress_percentage === 'number' ? topic.progress_percentage / 100 : 0}
                color={['#2563EB', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4'][index % 5]}
                onPress={() => navigation.navigate('LessonList', { topicId: topic.id, topicName: topic.name, languageCode: topic.language_code })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopicListScreen;

