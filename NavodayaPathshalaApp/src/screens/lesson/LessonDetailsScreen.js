// LessonDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import AppButton from '../../components/common/AppButton';
import STRINGS from '../../constants/strings';
import { markLessonComplete } from '../../services/markLessonCompleteService';
import { startLesson } from '../../services/lessonService';
import useLessonDetailsViewModel from './LessonDetailsViewModel';
import COLORS from '../../config/colors';
import { useNavigation } from '@react-navigation/native';
import EmptyState from '../../components/common/EmptyState';
import LessonContentRenderer from '../../components/common/LessonContentRenderer';
import MathBlockRenderer from '../../components/common/MathBlockRenderer';
import QuestionCard from '../../components/common/QuestionCard';
import FullScreenImageViewer from '../../components/common/FullScreenImageViewer';

const LessonDetailsScreen = ({ route }) => {
  const { lessonId, lessonTitle } = route.params;
  const { lesson, loading, error } = useLessonDetailsViewModel(lessonId);
  const [marking, setMarking] = useState(false);
  const [completed, setCompleted] = useState(lesson?.completion_status === 'completed');
  const { width } = useWindowDimensions();
  const contentWidth = width - 36;
  const [imageDimensions, setImageDimensions] = useState({});
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [imageViewerImages, setImageViewerImages] = useState([]);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);

  const openImageViewer = (urls, index = 0) => {
    setImageViewerImages(urls.map(url => ({ url })));
    setImageViewerIndex(index);
    setImageViewerVisible(true);
  };

  const closeImageViewer = () => {
    setImageViewerVisible(false);
    setImageViewerImages([]);
    setImageViewerIndex(0);
  };

  const renderBlock = (block) => {
    switch (block.block_type) {
      case 'text':
        return (
          <View key={block.id} style={{ marginBottom: 32, padding: 20, backgroundColor: '#FAFAFA', borderRadius: 12, borderWidth: 1, borderColor: '#F0F0F0' }}>
            {block.title ? (
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F1F1F', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: 'System' }}>
                {block.title}
              </Text>
            ) : null}
            <LessonContentRenderer content={block.content} contentWidth={contentWidth - 40} />
          </View>
        );

      case 'image':
        const imageHeight = imageDimensions[block.id] || 300;
        return (
          <View key={block.id} style={{ marginBottom: 32 }}>
            {console.log('🖼️ Rendering image block:', block.id, 'URL:', block.content)}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => openImageViewer([block.content])}
            >
              <Image
                source={{ uri: block.content }}
                style={{ width: '100%', height: imageHeight, borderRadius: 14, backgroundColor: '#E8E8E8' }}
                resizeMode="contain"
                onLoad={(e) => {
                  const { width: imgWidth, height: imgHeight } = e.nativeEvent.source;
                  const screenWidth = contentWidth;
                  const calculatedHeight = (imgHeight / imgWidth) * screenWidth;
                  setImageDimensions(prev => ({
                    ...prev,
                    [block.id]: calculatedHeight
                  }));
                  console.log('✅ Image loaded:', block.id, `Original: ${imgWidth}x${imgHeight}, Calculated height: ${calculatedHeight}`);
                }}
                onError={(error) => {
                  console.error('❌ Image failed to load:', block.id, 'Error:', error.nativeEvent.error);
                }}
                onLoadStart={() => console.log('⏳ Image loading started:', block.id)}
              />
            </TouchableOpacity>
            {block.title && (
              <Text style={{ fontSize: 13, color: '#666666', marginTop: 12, fontWeight: '400', lineHeight: 18, fontFamily: 'System' }}>
                {block.title}
              </Text>
            )}
          </View>
        );

      case 'info':
        return (
          <View key={block.id} style={{ marginBottom: 32, padding: 20, backgroundColor: '#FFFBF0', borderRadius: 12, borderWidth: 1, borderColor: '#F5EFDB' }}>
            {block.title && (
              <View style={{ flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 18, marginRight: 12, marginTop: 2 }}>ℹ️</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#4B3920', flex: 1, fontFamily: 'System' }}>
                  {block.title}
                </Text>
              </View>
            )}
            <Text style={{ fontSize: 15, color: '#5C4033', lineHeight: 24, fontWeight: '400', fontFamily: 'System' }}>
              {block.content}
            </Text>
          </View>
        );

      case 'question':
        return null; // Questions handled separately

      default:
        return null;
    }
  };

  React.useEffect(() => {
    setCompleted(lesson?.completion_status === 'completed');
  }, [lesson]);

  // Call lesson start API in background if lesson is not completed
  useEffect(() => {
    if (lesson && lesson.id && lesson.completion_status !== 'completed') {
      startLesson(lesson.id);
    }
  }, [lesson?.id, lesson?.completion_status]);

  const handleMarkComplete = async () => {
    setMarking(true);
    try {
      await markLessonComplete(lessonId);
      setCompleted(true);
    } catch (e) {
      // Error handling
    } finally {
      setMarking(false);
    }
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Fixed Navigation Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 12, 
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between'
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
          <Image
            source={require('../../assets/icons/back-arrow.png')}
            style={{ width: 24, height: 24, tintColor: '#374151' }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
          <Text style={{ fontSize: 20 }}>🔖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
          <Text style={{ fontSize: 20 }}>⋮</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <EmptyState
          type="error"
          title="Failed to Load Lesson"
          message="We couldn't load the lesson details. Please try again."
          actionText="Retry"
          onAction={() => {}}
        />
      ) : lesson ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 16, paddingBottom: 24, flexGrow: 1, backgroundColor: '#FFFFFF' }}>
          {/* Subject Badge */}
          <View style={{ marginBottom: 16 }}>
            <View style={{ 
              backgroundColor: '#EEF6FF',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#D4E3FF'
            }}>
              <Text style={{ fontSize: 12, marginRight: 4 }}>📕</Text>
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#1F40AF', letterSpacing: 0.3, fontFamily: 'System' }}>
                MATHEMATICS
              </Text>
            </View>
          </View>

          {/* Lesson Title */}
          <Text style={{ fontSize: 32, fontWeight: '700', color: '#111111', marginBottom: 12, lineHeight: 40, fontFamily: 'System' }}>
            {lesson.title}
          </Text>

          {/* Lesson Meta */}
          <Text style={{ fontSize: 14, color: '#999999', marginBottom: 28, lineHeight: 20, fontWeight: '400', fontFamily: 'System' }}>
            Chapter 1: Number System • 20 min read
          </Text>

          {/* Lesson Description */}
          {lesson.description ? (
            <View style={{ marginBottom: 32 }}>
              <LessonContentRenderer content={lesson.description} contentWidth={contentWidth} />
            </View>
          ) : null}

          {/* Render blocks */}
          {lesson.blocks && lesson.blocks.map(block => {
            if (block.block_type === 'text' && block.title === 'SET OF INTEGERS') {
              // Wrap math formulas in cards
              return (
                <View key={block.id} style={{ marginBottom: 32, padding: 24, backgroundColor: '#F8F7F2', borderRadius: 14, borderWidth: 1, borderColor: '#ECEAE3', alignItems: 'center' }}>
                  {block.title ? (
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F1F1F', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: 'System' }}>
                      {block.title}
                    </Text>
                  ) : null}
                  <LessonContentRenderer content={block.content} contentWidth={contentWidth - 48} />
                </View>
              );
            }
            return renderBlock(block);
          })}

          {/* Divider Before Quick Check */}
          {lesson.blocks && lesson.blocks.some(b => b.block_type === 'question') && (
            <View style={{ height: 1, backgroundColor: '#F0F0F0', marginVertical: 32 }} />
          )}

          {/* Questions Section */}
          {lesson.blocks && lesson.blocks.some(b => b.block_type === 'question') && (
            <View style={{ marginTop: 24, marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 22, fontWeight: '600', color: '#111111', flex: 1, fontFamily: 'System' }}>
                  Quick Check
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#666666', letterSpacing: 0.5, fontFamily: 'System' }}>
                  {lesson.blocks.filter(b => b.block_type === 'question').length} QUESTIONS
                </Text>
              </View>

              {lesson.blocks.filter(b => b.block_type === 'question').map((question, idx) => (
                <QuestionCard 
                  key={question.id}
                  question={question}
                  questionNumber={idx + 1}
                  totalQuestions={lesson.blocks.filter(b => b.block_type === 'question').length}
                />
              ))}
            </View>
          )}

          {/* Mark Complete Button */}
          <AppButton
            title={completed ? 'Completed ✓' : 'Mark Lesson Complete ✓'}
            variant={completed ? 'success' : 'primary'}
            size="large"
            fullWidth
            loading={marking}
            onPress={completed ? null : handleMarkComplete}
          />
        </ScrollView>
      ) : (
        <EmptyState
          type="empty"
          title="Lesson Not Found"
          message="The lesson you're looking for doesn't exist."
          icon="🤔"
        />
      )}
      <FullScreenImageViewer
        visible={imageViewerVisible}
        imageUrls={imageViewerImages}
        onClose={closeImageViewer}
        index={imageViewerIndex}
      />
    </SafeAreaView>
  );
};

export default LessonDetailsScreen;
