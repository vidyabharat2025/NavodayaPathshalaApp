/**
 * Task Screen
 * Displays tasks, tests, and challenges for the student
 * Screen purpose: "What tests or tasks do I need to do now?"
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import COLORS from '../../config/colors';
import { Fonts } from '../../config/fonts';
import TaskCard from '../../components/task/TaskCard';
import TaskSegmentedControl from '../../components/task/TaskSegmentedControl';
import TaskEmptyState from '../../components/task/TaskEmptyState';
import TaskFilterBar from '../../components/task/TaskFilterBar';
import { useAppContext } from '../../store/AppContext';
import useGreeting from '../../hooks/useGreeting';
import { getSubjects, getTopics, getLessons } from '../../services/taskListService';
import { fetchTests } from '../../services/testService';
import styles from './taskStyles';

const TABS = [
  // 'Lesson Tests',
  // 'Topic Tests',
  // 'Subject Tests',
  // 'My Grade Tests',
  'Mock Tests',
  'Past Year Papers (PYQ)',
];

// Map tab names to test types for API
const TAB_TO_TYPE = {
  // 'Lesson Tests': 'lesson',
  // 'Topic Tests': 'topic',
  // 'Subject Tests': 'subject',
  // 'My Grade Tests': 'grade',
  'Mock Tests': 'mock',
  'Past Year Papers (PYQ)': 'pyq_paper',
};

const TaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const { state } = useAppContext();
  const user = state?.user;
  const greeting = useGreeting();
  
  // Convert API test type to tab name
  const getTabFromType = (type) => {
    const typeToTab = {
      // 'lesson': 'Lesson Tests',
      // 'topic': 'Topic Tests',
      // 'subject': 'Subject Tests',
      // 'grade': 'My Grade Tests',
      'mock': 'Mock Tests',
      'pyq_paper': 'Past Year Papers (PYQ)',
    };
    return typeToTab[type] || 'Mock Tests';
  };
  
  const [activeTab, setActiveTab] = useState('Mock Tests');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  
  // Filter data states
  const [subjectsList, setSubjectsList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [lessonsList, setLessonsList] = useState([]);
  
  // Loading states
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(false);
  
  // Test data states
  const [tests, setTests] = useState([]);
  const [loadingTests, setLoadingTests] = useState(false);
  const [testError, setTestError] = useState(null);
  const [testPage, setTestPage] = useState(1);
  const [hasMoreTests, setHasMoreTests] = useState(false);
  const [loadingMoreTests, setLoadingMoreTests] = useState(false);
  
  const flatListRef = useRef(null);

  const userName = user?.name || 'Student';
  const streak = user?.streak || 0;
  const gradeId = user?.gradeId || 1;
  const languageCode = user?.language || 'en';

  // Update activeTab when route params change (e.g., from HomeScreen)
  useEffect(() => {
    const testType = route?.params?.testType;
    if (testType) {
      const newTab = getTabFromType(testType);
      setActiveTab(newTab);
    }
  }, [route?.params?.testType]);

  // Load subjects on mount
  useEffect(() => {
    const loadSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const subjects = await getSubjects(gradeId, languageCode);
        setSubjectsList(subjects || []);
      } catch (err) {
        console.error('Failed to load subjects:', err);
        setSubjectsList([]);
      } finally {
        setLoadingSubjects(false);
      }
    };

    loadSubjects();
  }, [gradeId, languageCode]);

  /**
   * Defer topic loading using requestAnimationFrame
   * Ensures modal closes BEFORE API call
   */
  const loadTopics = (selectedSubjectId) => {
    if (!selectedSubjectId) {
      setTopicsList([]);
      return;
    }

    setLoadingTopics(true);
    setTopicsList([]);

    // Use requestAnimationFrame to defer AFTER frame render, then setTimeout for network call
    requestAnimationFrame(() => {
      const timeoutId = setTimeout(() => {
        getTopics(selectedSubjectId)
          .then(topicsData => {
            setTopicsList(topicsData || []);
            setLoadingTopics(false);
          })
          .catch(err => {
            console.error('Failed to load topics:', err);
            setTopicsList([]);
            setLoadingTopics(false);
          });
      }, 50); // 50ms after frame

      return () => clearTimeout(timeoutId);
    });
  };

  /**
   * Defer lesson loading using requestAnimationFrame
   * Ensures modal closes BEFORE API call
   */
  const loadLessons = (selectedTopicId) => {
    if (!selectedTopicId) {
      setLessonsList([]);
      return;
    }

    setLoadingLessons(true);
    setLessonsList([]);

    // Use requestAnimationFrame to defer AFTER frame render, then setTimeout for network call
    requestAnimationFrame(() => {
      const timeoutId = setTimeout(() => {
        getLessons(selectedTopicId)
          .then(lessonsData => {
            setLessonsList(lessonsData || []);
            setLoadingLessons(false);
          })
          .catch(err => {
            console.error('Failed to load lessons:', err);
            setLessonsList([]);
            setLoadingLessons(false);
          });
      }, 50); // 50ms after frame

      return () => clearTimeout(timeoutId);
    });
  };

  /**
   * Load tests for current tab and filters
   * Uses AbortController for timeout protection
   */
  const loadTests = async (pageNum = 1, isLoadMore = false) => {
    if (!isLoadMore) {
      setLoadingTests(true);
      setTestError(null);
      setTests([]);
    } else {
      setLoadingMoreTests(true);
    }

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 15000); // 15 second timeout

    try {
      const testType = TAB_TO_TYPE[activeTab];

      const testOptions = {
        type: testType,
        gradeId,
        languageCode: languageCode,
        page: pageNum,
        limit: 20,
      };

      // Add optional filters based on test type and user selection
      if (testType === 'lesson' && selectedSubjectId) {
        testOptions.subjectId = selectedSubjectId;
      }
      if ((testType === 'lesson' || testType === 'topic') && selectedTopicId) {
        testOptions.topicId = selectedTopicId;
      }
      if (testType === 'lesson' && selectedLessonId) {
        testOptions.lessonId = selectedLessonId;
      }
      if (testType === 'subject' && selectedSubjectId) {
        testOptions.subjectId = selectedSubjectId;
      }

      const response = await fetchTests(testOptions);

      if (isLoadMore) {
        setTests(prev => [...prev, ...response.data]);
      } else {
        setTests(response.data || []);
      }

      setHasMoreTests(response.meta?.has_more || false);
      setTestPage(pageNum);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.error('Test loading timeout');
        setTestError('Request timeout. Please try again.');
      } else {
        console.error('Failed to load tests:', err);
        setTestError(err.message || 'Failed to load tests');
      }
      if (!isLoadMore) {
        setTests([]);
      }
    } finally {
      clearTimeout(timeoutId);
      setLoadingTests(false);
      setLoadingMoreTests(false);
    }
  };

  // Fetch tests when tab changes - IMMEDIATE load, no debounce
  useEffect(() => {
    // Reset filters and scroll
    setSelectedSubjectId(null);
    setSelectedTopicId(null);
    setSelectedLessonId(null);
    setTopicsList([]);
    setLessonsList([]);
    setTestPage(1);

    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }

    // Load tests for new tab IMMEDIATELY
    loadTests(1, false);
  }, [activeTab]);

  // Refresh tests when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Reload tests to get updated status (completed, pending, etc)
      loadTests(1, false);
    }, [activeTab])
  );

  // Debounced fetch tests when FILTERS change (not tab change)
  // Only fetch if we have the necessary filters for this tab
  useEffect(() => {
    // Skip if this is the initial mount (when filters are null)
    if (selectedSubjectId === null && selectedTopicId === null && selectedLessonId === null) {
      return;
    }

    const debounceTimer = setTimeout(() => {
      const testType = TAB_TO_TYPE[activeTab];

      // Skip loading if required filters not set
      if (testType === 'subject' && !selectedSubjectId) {
        return;
      }

      if (testType === 'topic' && !selectedSubjectId) {
        return;
      }

      setTestPage(1);
      
      // Defer test loading to next frame AFTER modal closes
      requestAnimationFrame(() => {
        setTimeout(() => {
          loadTests(1, false);
        }, 100);
      });
    }, 300); // Debounce for filter changes only

    return () => clearTimeout(debounceTimer);
  }, [selectedSubjectId, selectedTopicId, selectedLessonId]);

  const handleSubjectChange = (subjectId) => {
    // Immediately close the modal and update state
    setSelectedSubjectId(subjectId);
    setSelectedTopicId(null);
    setSelectedLessonId(null);
    
    // THEN defer the topics loading after modal closes
    requestAnimationFrame(() => {
      setTimeout(() => {
        loadTopics(subjectId);
      }, 50);
    });
  };

  const handleTopicChange = (topicId) => {
    // Immediately close the modal and update state
    setSelectedTopicId(topicId);
    setSelectedLessonId(null);
    
    // THEN defer the lessons loading after modal closes
    requestAnimationFrame(() => {
      setTimeout(() => {
        loadLessons(topicId);
      }, 50);
    });
  };

  const handleLessonChange = (lessonId) => {
    setSelectedLessonId(lessonId);
  };

  // Transform API data for filter dropdowns
  const subjectsForFilter = useMemo(() => {
    return (subjectsList || []).map(subject => ({
      id: subject.id,
      name: subject.name,
    }));
  }, [subjectsList]);

  const topicsForFilter = useMemo(() => {
    return (topicsList || []).map(topic => ({
      id: topic.id,
      name: topic.name,
    }));
  }, [topicsList]);

  const lessonsForFilter = useMemo(() => {
    return (lessonsList || []).map(lesson => ({
      id: lesson.id,
      name: lesson.title || lesson.name,
    }));
  }, [lessonsList]);

  /**
   * Determine if filters should be disabled based on test results
   * If a filter level has no tests, disable child filters
   */
  const shouldDisableTopics = useMemo(() => {
    const testType = TAB_TO_TYPE[activeTab];
    
    // For Lesson & Topic tests: disable topics if subject selected but no tests found
    if ((testType === 'lesson' || testType === 'topic') && selectedSubjectId && !loadingTests) {
      return tests.length === 0;
    }
    
    return false;
  }, [activeTab, selectedSubjectId, tests, loadingTests]);

  const shouldDisableLessons = useMemo(() => {
    const testType = TAB_TO_TYPE[activeTab];
    
    // For Lesson tests: disable lessons if:
    // 1. Topic dropdown is disabled (subject has no tests), OR
    // 2. Topic is selected but no tests found
    if (testType === 'lesson') {
      if (shouldDisableTopics) {
        return true; // If topics are disabled, lessons should be too
      }
      if (selectedTopicId && !loadingTests && tests.length === 0) {
        return true; // If topic selected but no tests, disable lessons
      }
    }
    
    return false;
  }, [activeTab, shouldDisableTopics, selectedTopicId, tests, loadingTests]);
  const handleTaskPress = (test) => {
    // If test is completed, show results directly
    if (test.status === 'completed' || test.status === 'attempted') {
      navigation.navigate('TestResult', {
        testId: test.id,
        testType: test.type,
        isReviewMode: true, // Show re-attempt button
      });
    } else {
      // Otherwise navigate to Test Instructions screen
      navigation.navigate('TestInstructions', {
        testId: test.id,
      });
    }
  };

  const handleRetry = () => {
    loadTests(1, false);
  };

  const handleLoadMore = () => {
    if (!loadingMoreTests && hasMoreTests) {
      loadTests(testPage + 1, true);
    }
  };

  const renderTestCard = ({ item }) => {
    // Build subtitle based on available data
    let subtitle = '';
    if (item.subject_name || item.topic_name) {
      subtitle = [item.subject_name, item.topic_name].filter(Boolean).join(' • ');
    }

    // Map API status to card status
    const cardStatus = item.status || 'pending';

    return (
      <TaskCard
        id={item.id}
        title={item.title}
        subtitle={subtitle || `${TAB_TO_TYPE[activeTab]} Test`}
        questionsCount={item.total_questions}
        duration={item.time_limit_minutes}
        status={cardStatus}
        type={TAB_TO_TYPE[activeTab]}
        onPress={() => handleTaskPress(item)}
      />
    );
  };

  const renderLoadingIndicator = () => {
    if (loadingMoreTests) {
      return (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <ActivityIndicator size="small" color={COLORS.PRIMARY} />
        </View>
      );
    }
    return null;
  };

  const renderEmpty = () => {
    if (loadingTests) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      );
    }

    if (testError) {
      return (
        <TaskEmptyState 
          onExplorePress={handleRetry}
          errorMessage={testError}
        />
      );
    }

    return (
      <TaskEmptyState 
        onExplorePress={() => {}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>Tasks</Text>
          <Text style={styles.headerGreeting}>
            Practice, tests & challenges
          </Text>
        </View>

        <View style={styles.streakBadge}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakNumber}>{streak}</Text>
        </View>
      </View>

      {/* Tab Control */}
      <TaskSegmentedControl
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        equalWidthTabs={TABS.length === 2}
        containerStyle={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 16,
        }}
      />

      {/* Filter Bar */}
      <TaskFilterBar
        activeTab={activeTab}
        selectedSubjectId={selectedSubjectId}
        selectedTopicId={selectedTopicId}
        selectedLessonId={selectedLessonId}
        subjects={subjectsForFilter}
        topics={topicsForFilter}
        lessons={lessonsForFilter}
        onSubjectChange={handleSubjectChange}
        onTopicChange={handleTopicChange}
        onLessonChange={handleLessonChange}
        loadingSubjects={loadingSubjects}
        loadingTopics={loadingTopics}
        loadingLessons={loadingLessons}
        disableTopics={shouldDisableTopics}
        disableLessons={shouldDisableLessons}
      />

      {/* Tests List */}
      {loadingTests && tests.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={tests}
          renderItem={renderTestCard}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          scrollEnabled={tests.length > 0}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderLoadingIndicator}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          scrollToOverflowEnabled={false}
        />
      )}
    </SafeAreaView>
  );
};

export default TaskScreen;

