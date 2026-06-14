import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, Image, Alert, SectionList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './TestIndexScreen.styles';
import { fetchTestItemsPaginated } from '../../services/testItemsService';
import FullScreenImageViewer from '../../components/common/FullScreenImageViewer';
import QuestionItem from './components/QuestionItem';
import PassageItem from './components/PassageItem';

const stripHtml = (html = '') => {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

const parseImageUrls = (image_url) => {
  if (!image_url) return [];
  try {
    const parsed = typeof image_url === 'string' ? JSON.parse(image_url) : image_url;
    if (Array.isArray(parsed)) {
      return parsed.filter(url => typeof url === 'string');
    }
    return typeof parsed === 'string' ? [parsed] : [];
  } catch (err) {
    return typeof image_url === 'string' ? [image_url] : [];
  }
};

const TestIndexScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { testId } = route.params || {};

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(null);
  const [expandedPassages, setExpandedPassages] = useState({});
  const [fullScreenVisible, setFullScreenVisible] = useState(false);
  const [fullScreenImageUrls, setFullScreenImageUrls] = useState([]);
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(0);

  const loadPage = useCallback(async (p = 0) => {
    if (!testId) return;
    setLoading(true);
    try {
      const resp = await fetchTestItemsPaginated(testId, p, 10);
      const body = resp || {};
      const newItems = Array.isArray(body.data) ? body.data : [];
      setItems(prev => (p === 0 ? newItems : [...prev, ...newItems]));
      setMeta(body.meta || null);
      setPage(p);
    } catch (err) {
      console.error('Failed to fetch test items:', err);
    } finally {
      setLoading(false);
    }
  }, [testId]);

  useEffect(() => {
    loadPage(0);
  }, [loadPage]);

  const togglePassage = (passageId) => {
    setExpandedPassages(prev => ({ ...prev, [passageId]: !prev[passageId] }));
  };

  const getTotalQuestions = () => {
    let count = 0;
    items.forEach(item => {
      if (item.type === 'question') count++;
      else if (item.type === 'passage' && Array.isArray(item.questions)) {
        count += item.questions.length;
      }
    });
    return count;
  };

  const renderItem = ({ item, index }) => {
    if (item.type === 'passage' && item.passage) {
      // compute number of questions before this item to provide global question numbering
      const questionsBefore = items.slice(0, index).reduce((acc, it) => {
        if (it.type === 'question') return acc + 1;
        if (it.type === 'passage' && Array.isArray(it.questions)) return acc + it.questions.length;
        return acc;
      }, 0);
      return (
        <PassageItem
          item={item}
          expanded={!!expandedPassages[item.passage.id]}
          onToggle={(pid) => togglePassage(pid)}
          onQuestionPress={(q) => Alert.alert('Jump', `Jump to question ${q.id} (placeholder)`)}
          onImagePress={openFullScreenImages}
          startIndex={questionsBefore}
        />
      );
    }

    if (item.type === 'question' && item.question) {
      const q = item.question;
      const questionsBefore = items.slice(0, index).reduce((acc, it) => {
        if (it.type === 'question') return acc + 1;
        if (it.type === 'passage' && Array.isArray(it.questions)) return acc + it.questions.length;
        return acc;
      }, 0);
      const globalIndex = questionsBefore + 1;
      return (
        <QuestionItem
          item={{ ...item.question, order: item.order }}
          globalIndex={globalIndex}
          onPress={() => Alert.alert('Jump', `Jump to question ${globalIndex} (placeholder)`)}
          onImagePress={(images, index) => openFullScreenImages(images, index)}
        />
      );
    }

    return null;
  };

  const loadMore = () => {
    if (!meta || !meta.has_more) return;
    loadPage(page + 1);
  };

  const handleEndReached = () => {
    if (!loading && meta && meta.has_more) {
      loadPage(page + 1);
    }
  };

  const openFullScreenImages = (images, index = 0) => {
    const urls = Array.isArray(images) ? images.map(url => ({ url })) : [];
    if (urls.length > 0) {
      setFullScreenImageUrls(urls);
      setFullScreenImageIndex(index);
      setFullScreenVisible(true);
    }
  };

  const closeFullScreenImages = () => {
    setFullScreenVisible(false);
    setFullScreenImageUrls([]);
    setFullScreenImageIndex(0);
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Question Index</Text>
          <Text style={styles.headerMeta}>
            {getTotalQuestions()} Questions • Total {items.length} Items
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>



      <FlatList
        contentContainerStyle={styles.list}
        data={items}
        keyExtractor={(it, idx) => {
          const keyOrder = it.order || (it.passage && it.passage.id) || idx;
          return `${it.type || 'item'}-${keyOrder}-${idx}`;
        }}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          !loading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No questions found</Text>
            </View>
          ) : null
        )}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReached}
        ListFooterComponent={() => (
          <View style={styles.loadMore}>
            {loading ? (
              <ActivityIndicator color="#2563eb" size="small" />
            ) : meta && meta.has_more ? (
              <TouchableOpacity onPress={loadMore} activeOpacity={0.7}>
                <Text style={styles.loadMoreText}>Load More Questions</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: '#9ca3af', fontSize: 13, fontWeight: '500' }}>
                All questions loaded
              </Text>
            )}
          </View>
        )}
      />

      <FullScreenImageViewer
        visible={fullScreenVisible}
        imageUrls={fullScreenImageUrls}
        onClose={closeFullScreenImages}
        index={fullScreenImageIndex}
      />
    </SafeAreaView>
  );
};

export default TestIndexScreen;
