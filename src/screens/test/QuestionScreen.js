/**
 * Question Screen
 * Displays test questions with real API data and rich text support
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../config/colors';
import { Fonts } from '../../config/fonts';
import GraceTimeModal from './GraceTimeModal';
import { fetchFirstPlayItem, fetchNextPlayItem, fetchPrevPlayItem } from '../../services/testPlayService';
// import { fetchQuestionDetails } from '../../services/questionDetailsService';
import { saveAnswer, submitTest } from '../../services/testAttemptService';
import LessonContentRenderer from '../../components/common/LessonContentRenderer';
import FullScreenImageViewer from '../../components/common/FullScreenImageViewer';
import styles from './QuestionScreen.styles';

const { width } = Dimensions.get('window');

const QuestionScreen = ({ route }) => {
  const navigation = useNavigation();
  const {
    testId,
    attemptId,
    questions: questionList = [],
    timeLimitMinutes,
    totalQuestions: totalQuestionsFromAttempt,
    testType,
    startedAt,
  } = route.params || {};
  const { width: screenWidth } = useWindowDimensions();
  const contentWidth = screenWidth - 36;
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [answersMap, setAnswersMap] = useState({}); // Store answers for all questions
  const [showExitModal, setShowExitModal] = useState(false);
  const [showGraceTimeModal, setShowGraceTimeModal] = useState(false);
  const [gracePeriodsUsed, setGracePeriodsUsed] = useState(0);
  const [savingAnswer, setSavingAnswer] = useState(false);
  const [submittingTest, setSubmittingTest] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [playItem, setPlayItem] = useState(null); // Holds the current play item (question or passage)
  const [lastOrder, setLastOrder] = useState(null); // For stuck detection
  const [imageDimensions, setImageDimensions] = useState({});
  // Full screen image viewer state
  const [fullScreenImageVisible, setFullScreenImageVisible] = useState(false);
  const [fullScreenImageUrls, setFullScreenImageUrls] = useState([]); // [{url: ...}]
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(0);

  const openFullScreenImage = (urls, index = 0) => {
    setFullScreenImageUrls(urls.map(url => ({ url })));
    setFullScreenImageIndex(index);
    setFullScreenImageVisible(true);
  };
  const closeFullScreenImage = () => {
    setFullScreenImageVisible(false);
    setFullScreenImageUrls([]);
    setFullScreenImageIndex(0);
  };
  const [currentOrder, setCurrentOrder] = useState(null); // Track current order/index for navigation
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Calculate initial time in seconds from API data
  const totalTimeInSeconds = (timeLimitMinutes || 0) * 60;
  const [timeRemaining, setTimeRemaining] = useState(totalTimeInSeconds);
  const [showTimer, setShowTimer] = useState(timeLimitMinutes > 0);

  // Load the first play item on mount
  useEffect(() => {
    const loadFirstItem = async () => {
      setLoadingQuestion(true);
      try {
        const data = await fetchFirstPlayItem(testId);
        setPlayItem(data.item);
        setCurrentOrder(data.item.order);
        setTotalQuestions(data.total_questions || 0);
        setSelectedAnswer(null);
        setQuestionStartTime(Date.now());
      } catch (err) {
        console.error('Failed to load first play item:', err);
        setPlayItem(null);
      } finally {
        setLoadingQuestion(false);
      }
    };
    if (testId) loadFirstItem();
  }, [testId]);

  // Restore answer when play item changes (if needed)
  useEffect(() => {
    setQuestionStartTime(Date.now());
    if (!playItem) {
      setSelectedAnswer(null);
      // Removed loadingItem
      return;
    }
    if (playItem.type === 'question' && playItem.question) {
      setSelectedAnswer(answersMap[playItem.question.id] || null);
    } else if (playItem.type === 'passage' && Array.isArray(playItem.questions) && playItem.questions.length > 0) {
      setSelectedAnswer(answersMap[playItem.questions[0].id] || null);
    } else {
      setSelectedAnswer(null);
    }
    // Removed loadingItem
  }, [playItem, answersMap]);


  // Removed loadingItem fallback effect

  // ...existing code...
  // --- ALL HOOKS ABOVE THIS LINE ---

  // No early return! Always render the full component tree.


  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - show grace time modal
          setShowGraceTimeModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Show exit confirmation modal instead of going back
      setShowExitModal(true);
      return true; // Prevent default back behavior
    });

    return () => backHandler.remove();
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId) => {
    setSelectedAnswer(optionId);
    // Save to local answersMap
    if (playItem) {
      if (playItem.type === 'question') {
        setAnswersMap(prev => ({
          ...prev,
          [playItem.question.id]: optionId
        }));
      } else if (playItem.type === 'passage' && Array.isArray(playItem.questions) && playItem.questions.length > 0) {
        setAnswersMap(prev => ({
          ...prev,
          [playItem.questions[0].id]: optionId
        }));
      }
    }
  };

  // Handler for Next (when answered)
  const handleNext = async () => {
    if (!playItem || currentOrder === null || loadingQuestion || currentOrder === totalQuestions) {
      if (currentOrder === totalQuestions) {
        setShowFinishModal(true);
      }
      return;
    }

    // Save current answer if one is selected and item is a question or passage
    if (selectedAnswer && attemptId && playItem) {
      let questionId = null;
      if (playItem.type === 'question') {
        questionId = playItem.question.id;
      } else if (playItem.type === 'passage' && Array.isArray(playItem.questions) && playItem.questions.length > 0) {
        questionId = playItem.questions[0].id;
      }
      if (questionId) {
        try {
          setSavingAnswer(true);
          const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
          await saveAnswer(attemptId, questionId, selectedAnswer, timeSpent);
        } catch (err) {
          console.error('Failed to save answer:', err);
          Alert.alert(
            'Save Error',
            'Failed to save your answer. Please try again.',
            [{ text: 'OK', style: 'cancel' }]
          );
          setSavingAnswer(false);
          return; // Don't navigate if save fails
        } finally {
          setSavingAnswer(false);
        }
      }
    }

    setLoadingQuestion(true);
    try {
      setSelectedAnswer(null);
      const data = await fetchNextPlayItem(testId, currentOrder);
      console.log('handleNext: currentOrder', currentOrder, 'lastOrder', lastOrder, 'data.item', data && data.item);
      if (data && data.item) {
        if (data.item.order === currentOrder || data.item.order === lastOrder) {
          // Stuck detected: force navigation to result
          Alert.alert(
            'Test Complete',
            'No further questions to show. Submitting your test.',
            [
              { text: 'OK', onPress: () => {
                  navigation.navigate('TestResult', { testId, testType });
                } }
            ]
          );
        } else {
          setPlayItem(data.item);
          setCurrentOrder(data.item.order);
          setLastOrder(currentOrder);
          // selectedAnswer will be set by useEffect
        }
      }
    } catch (err) {
      console.error('Failed to load next play item:', err);
    } finally {
      setLoadingQuestion(false);
    }
  };

  // Handler for Skip (when not answered)
  const handleSkip = async () => {
    if (!playItem || currentOrder === null || loadingQuestion || currentOrder === totalQuestions) {
      if (currentOrder === totalQuestions) {
        setShowFinishModal(true);
      }
      return;
    }

    setLoadingQuestion(true);
    try {
      setSelectedAnswer(null);
      const data = await fetchNextPlayItem(testId, currentOrder);
      console.log('handleSkip: currentOrder', currentOrder, 'lastOrder', lastOrder, 'data.item', data && data.item);
      if (data && data.item) {
        if (data.item.order === currentOrder || data.item.order === lastOrder) {
          // Stuck detected: force navigation to result
          Alert.alert(
            'Test Complete',
            'No further questions to skip. Submitting your test.',
            [
              { text: 'OK', onPress: () => {
                  navigation.navigate('TestResult', { testId, testType });
                } }
            ]
          );
        } else {
          setPlayItem(data.item);
          setCurrentOrder(data.item.order);
          setLastOrder(currentOrder);
          // selectedAnswer will be set by useEffect
        }
      }
    } catch (err) {
      console.error('Failed to load next play item:', err);
    } finally {
      setLoadingQuestion(false);
    }
  };

  const handleSubmitTest = async () => {
    if (!attemptId) {
      console.error('No attempt ID found');
      Alert.alert('Error', 'Unable to submit test. Please try again.');
      setShowFinishModal(false);
      setSubmittingTest(false);
      return;
    }

    let didNavigate = false;
    try {
      setSubmittingTest(true);
      setShowFinishModal(false);
      const result = await submitTest(attemptId);
      // Navigate to TestResult with the submission result
      navigation.navigate('TestResult', {
        testId,
        testType,
        submissionResult: result,
      });
      didNavigate = true;
    } catch (err) {
      console.error('Failed to submit test:', err);
      Alert.alert(
        'Submission Error',
        'Failed to submit your test. Please try again.',
        [{ text: 'OK', style: 'cancel' }]
      );
    } finally {
      setShowFinishModal(false);
      setSubmittingTest(false);
      // Fallback: if navigation does not occur, reset state after 2 seconds
      if (!didNavigate) {
        setTimeout(() => {
          setShowFinishModal(false);
          setSubmittingTest(false);
        }, 2000);
      }
    }
  };

  const handlePrevious = async () => {
    if (!playItem || currentOrder === null || loadingQuestion || currentOrder === 1) {
      return;
    }

    setLoadingQuestion(true);
    try {
      const data = await fetchPrevPlayItem(testId, currentOrder);
      if (data && data.item) {
        setPlayItem(data.item);
        setCurrentOrder(data.item.order);
        // selectedAnswer will be set by useEffect
      }
    } catch (err) {
      console.error('Failed to load previous play item:', err);
    } finally {
      setLoadingQuestion(false);
    }
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = async () => {
    setShowExitModal(false);
    // If there were answers, they're already saved on the backend
    // User can reattempt anytime
    navigation.navigate('TaskList');
  };

  const renderQuestionContent = () => {
    // Show loader while fetching play item
    // Removed loader UI

    if (!playItem) {
      return <Text style={styles.questionText}>Unable to load question</Text>;
    }

    // If passage type, render passage text, then image (if any), then the first question (like question type)
    if (playItem.type === 'passage' && playItem.passage) {
      try {
        // Defensive: always use playItem.questions[0] if available
        const passageQuestion = playItem.questions && playItem.questions.length > 0 ? playItem.questions[0] : null;
        if (!passageQuestion) {
          console.error('No passageQuestion found in playItem:', playItem);
          return <Text style={styles.questionText}>Unable to load passage question</Text>;
        }
        if (!Array.isArray(passageQuestion.options)) {
          console.error('No options found for passageQuestion:', passageQuestion);
          return <Text style={styles.questionText}>Unable to load passage options</Text>;
        }

        let passageQuestionImages = [];
        if (passageQuestion.image_url) {
          try {
            passageQuestionImages = typeof passageQuestion.image_url === 'string'
              ? JSON.parse(passageQuestion.image_url)
              : Array.isArray(passageQuestion.image_url)
                ? passageQuestion.image_url
                : [];
          } catch (err) {
            console.error('Failed to parse passageQuestion.image_url:', err, passageQuestion.image_url);
            passageQuestionImages = [];
          }
        }

        // Render passage text, then image (if any), then question, then options
        return (
          <View>
            <View style={styles.passageTextContainer}>
              <LessonContentRenderer
                content={playItem.passage.text}
                contentWidth={contentWidth - 20}
              />
              {/* Passage image below text */}
              {playItem.passage.image_url && typeof playItem.passage.image_url === 'string' && playItem.passage.image_url.trim() !== '' && (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => openFullScreenImage([playItem.passage.image_url])}
                >
                  <Image
                    source={{ uri: playItem.passage.image_url }}
                    style={{
                      width: '100%',
                      height: 220,
                      borderRadius: 12,
                      marginTop: 12,
                      backgroundColor: '#f0f0f0',
                    }}
                    resizeMode="contain"
                    onError={error => {
                      console.error('Failed to load passage image:', playItem.passage.image_url, error);
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
            {passageQuestionImages.length > 0 && (
              <View style={styles.questionImagesContainer}>
                {passageQuestionImages.map((imageUrl, index) => {
                  const imageHeight = imageDimensions[imageUrl] || 250;
                  return (
                    <TouchableOpacity
                      key={`${imageUrl}-${index}`}
                      activeOpacity={0.85}
                      onPress={() => openFullScreenImage(passageQuestionImages, index)}
                    >
                      <Image
                        source={{ uri: imageUrl }}
                        style={{
                          width: '100%',
                          height: imageHeight,
                          borderRadius: 12,
                          marginBottom: index < passageQuestionImages.length - 1 ? 12 : 0,
                          backgroundColor: '#f0f0f0',
                        }}
                        resizeMode="contain"
                        onLoad={(e) => {
                          const { width: imgWidth, height: imgHeight } = e.nativeEvent.source;
                          const calculatedHeight = (imgHeight / imgWidth) * (contentWidth - 20);
                          setImageDimensions(prev => ({
                            ...prev,
                            [imageUrl]: calculatedHeight,
                          }));
                        }}
                        onError={(error) => {
                          console.error('Failed to load passage question image:', imageUrl, error);
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            <View style={styles.questionTextContainer}>
              <LessonContentRenderer
                content={passageQuestion.text}
                contentWidth={contentWidth - 20}
              />
            </View>
            <View style={styles.optionsSection}>
              {passageQuestion.options.map((option) => {
                // Option: render image if option_text is an image URL, else render as text
                const isImage =
                  typeof option.option_text === 'string' &&
                  option.option_text.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i);
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionCard,
                      selectedAnswer === option.id && styles.optionCardSelected,
                    ]}
                    onPress={() => handleSelectOption(option.id)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        selectedAnswer === option.id && styles.radioButtonSelected,
                      ]}
                    >
                      {selectedAnswer === option.id && (
                        <View style={styles.radioDot} />
                      )}
                    </View>
                    <View style={styles.optionContentWrapper}>
                      {isImage ? (
                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={() => openFullScreenImage([option.option_text])}
                        >
                          <Image
                            source={{ uri: option.option_text }}
                            style={{
                              width: contentWidth - 120,
                              height: 120,
                              borderRadius: 8,
                              backgroundColor: '#f0f0f0',
                            }}
                            resizeMode="contain"
                            onError={error => {
                              console.error('Failed to load option image:', option.option_text, error);
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <LessonContentRenderer
                          content={option.option_text}
                          contentWidth={contentWidth - 80}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      } catch (err) {
        console.error('Error rendering passage question:', err, playItem);
        return <Text style={styles.questionText}>Error rendering passage question</Text>;
      }
    }

    // If question type, render question as before
    if (playItem.type === 'question' && playItem.question) {
      const q = playItem.question;
      // Parse image_url if it's a JSON string
      let questionImages = [];
      if (q.image_url) {
        try {
          questionImages = typeof q.image_url === 'string' 
            ? JSON.parse(q.image_url)
            : Array.isArray(q.image_url)
            ? q.image_url
            : [];
        } catch (err) {
          console.error('Failed to parse image_url:', err);
          questionImages = [];
        }
      }
      return (
        <>
          <View style={styles.questionTextContainer}>
            <LessonContentRenderer
              content={q.text}
              contentWidth={contentWidth - 20}
            />
          </View>
          {/* Render question images */}
          {questionImages.length > 0 && (
            <View style={styles.questionImagesContainer}>
              {questionImages.map((imageUrl, index) => {
                const imageHeight = imageDimensions[imageUrl] || 250;
                return (
                  <TouchableOpacity
                    key={`${imageUrl}-${index}`}
                    activeOpacity={0.85}
                    onPress={() => openFullScreenImage(questionImages, index)}
                  >
                    <Image
                      source={{ uri: imageUrl }}
                      style={{ 
                        width: '100%', 
                        height: imageHeight, 
                        borderRadius: 12, 
                        marginBottom: index < questionImages.length - 1 ? 12 : 0,
                        backgroundColor: '#f0f0f0'
                      }}
                      resizeMode="contain"
                      onLoad={(e) => {
                        const { width: imgWidth, height: imgHeight } = e.nativeEvent.source;
                        const calculatedHeight = (imgHeight / imgWidth) * (contentWidth - 20);
                        setImageDimensions(prev => ({
                          ...prev,
                          [imageUrl]: calculatedHeight
                        }));
                      }}
                      onError={(error) => {
                        console.error('Failed to load question image:', imageUrl, error);
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          {/* Options */}
          {q.options && (
            <View style={styles.optionsSection}>
              {q.options.map((option) => {
                // Option: render image if option_text is an image URL, else render as text
                const isImage =
                  typeof option.option_text === 'string' &&
                  option.option_text.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i);
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionCard,
                      selectedAnswer === option.id && styles.optionCardSelected,
                    ]}
                    onPress={() => handleSelectOption(option.id)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        selectedAnswer === option.id && styles.radioButtonSelected,
                      ]}
                    >
                      {selectedAnswer === option.id && (
                        <View style={styles.radioDot} />
                      )}
                    </View>
                    <View style={styles.optionContentWrapper}>
                      {isImage ? (
                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={() => openFullScreenImage([option.option_text])}
                        >
                          <Image
                            source={{ uri: option.option_text }}
                            style={{
                              width: contentWidth - 120,
                              height: 120,
                              borderRadius: 8,
                              backgroundColor: '#f0f0f0',
                            }}
                            resizeMode="contain"
                            onError={error => {
                              console.error('Failed to load option image:', option.option_text, error);
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <LessonContentRenderer
                          content={option.option_text}
                          contentWidth={contentWidth - 80}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </>
      );
    }

    return <Text style={styles.questionText}>Unknown item type</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Left: Timer */}
        <View style={styles.timerPill}>
          <Text style={styles.timerIcon}>⏱️</Text>
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </View>

        {/* Center: Question Counter */}
        <Text style={styles.questionCounter}>
          Question {currentOrder ? currentOrder : 1} / {totalQuestions}
        </Text>

        {/* Right: Exit Button */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.exitButton, { marginRight: 8 }]}
              onPress={() => navigation.navigate('TestIndex', { testId })}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.exitButtonText}>Index</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.exitButton}
              onPress={handleExit}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.exitButtonText}>Exit</Text>
            </TouchableOpacity>
          </View>
      </View>

      {/* Question Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.questionContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content: Only show empty state if no playItem, otherwise show question content */}
        {!playItem ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateIcon}>📭</Text>
            <Text style={styles.emptyStateTitle}>No Questions Found</Text>
            <Text style={styles.emptyStateMessage}>
              This test doesn't have any questions or failed to load.
            </Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Text style={styles.emptyStateButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          renderQuestionContent()
        )}
      </ScrollView>

      {/* Full Screen Image Viewer */}
      <FullScreenImageViewer
        visible={fullScreenImageVisible}
        imageUrls={fullScreenImageUrls}
        onClose={closeFullScreenImage}
        index={fullScreenImageIndex}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.previousButton,
            (!playItem || currentOrder === null || currentOrder === 1 || savingAnswer || submittingTest || loadingQuestion) && styles.navButtonDisabled,
          ]}
          onPress={handlePrevious}
          disabled={!playItem || currentOrder === null || currentOrder === 1 || savingAnswer || submittingTest || loadingQuestion}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        {currentOrder === totalQuestions ? (
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.nextButton,
              (!playItem || currentOrder === null || submittingTest || loadingQuestion) && styles.navButtonDisabled,
            ]}
            onPress={() => setShowFinishModal(true)}
            disabled={!playItem || currentOrder === null || submittingTest || loadingQuestion}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>Finish Test</Text>
          </TouchableOpacity>
        ) : (
          selectedAnswer ? (
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.nextButton,
                (!playItem || currentOrder === null || submittingTest || loadingQuestion) && styles.navButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!playItem || currentOrder === null || submittingTest || loadingQuestion}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.nextButton,
                (!playItem || currentOrder === null || submittingTest || loadingQuestion) && styles.navButtonDisabled,
              ]}
              onPress={handleSkip}
              disabled={!playItem || currentOrder === null || submittingTest || loadingQuestion}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>Skip</Text>
            </TouchableOpacity>
          )
        )}
            {/* Finish Test Confirmation Modal */}
            <Modal
              visible={showFinishModal}
              transparent
              animationType="fade"
              statusBarTranslucent
              onRequestClose={() => setShowFinishModal(false)}
            >
              <View style={styles.exitModalBackdrop}>
                <View style={styles.exitModalCard}>
                  <View style={styles.exitIconContainer}>
                    <Text style={styles.exitIcon}>📝</Text>
                  </View>
                  <Text style={styles.exitModalTitle}>Finish Test?</Text>
                  <Text style={styles.exitModalText}>
                    Are you sure you want to submit your test? You won't be able to change your answers after this.
                  </Text>
                  <View style={styles.exitModalButtons}>
                    <TouchableOpacity
                      style={[styles.exitModalButton, styles.exitCancelButton]}
                      onPress={() => setShowFinishModal(false)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.exitCancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.exitModalButton, styles.exitConfirmButton]}
                      onPress={async () => {
                        setShowFinishModal(false);
                        await handleSubmitTest();
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.exitConfirmButtonText}>Submit Test</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
      </View>

      {/* Exit Confirmation Modal */}
      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.exitModalBackdrop}>
          <View style={styles.exitModalCard}>
            {/* Icon Container */}
            <View style={styles.exitIconContainer}>
              <Text style={styles.exitIcon}>⚠️</Text>
            </View>
            
            <Text style={styles.exitModalTitle}>Exit Test?</Text>
            <Text style={styles.exitModalText}>
              Your test progress will not be saved. You'll need to start from the beginning if you exit.
            </Text>
            
            <View style={styles.exitModalButtons}>
              <TouchableOpacity
                style={[styles.exitModalButton, styles.exitCancelButton]}
                onPress={() => setShowExitModal(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.exitCancelButtonText}>Continue Test</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.exitModalButton, styles.exitConfirmButton]}
                onPress={confirmExit}
                activeOpacity={0.8}
              >
                <Text style={styles.exitConfirmButtonText}>Exit Test</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Grace Time Modal */}
      <GraceTimeModal
        visible={showGraceTimeModal}
        onClose={() => setShowGraceTimeModal(false)}
        onRequestTime={(minutes) => {
          setTimeRemaining(minutes * 60);
          setGracePeriodsUsed(gracePeriodsUsed + 1);
          setShowGraceTimeModal(false);
        }}
        onFinish={() => {
          setShowGraceTimeModal(false);
          handleSubmitTest();
        }}
        gracePeriodsUsed={gracePeriodsUsed}
      />
    </SafeAreaView>
  );
};


export default QuestionScreen;
