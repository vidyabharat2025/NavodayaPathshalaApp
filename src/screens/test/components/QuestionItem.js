import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LessonContentRenderer from '../../../components/common/LessonContentRenderer';
import styles from '../TestIndexScreen.styles';

const stripHtml = (html = '') => html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

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

const getOptionLabel = (index) => {
  const labels = ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)'];
  return labels[index] || `(${String.fromCharCode(97 + index)})`;
};

const QuestionItem = ({ item, onPress, onImagePress, compact = false, globalIndex = null }) => {
  const q = item.question || item;
  const questionText = q.text || '';
  // For index view keep a short preview; still render with rich renderer
  let previewText = stripHtml(questionText || '');
  if (!compact && previewText.length > 220) previewText = `${previewText.slice(0, 220)}...`;

  const imageUrls = parseImageUrls(q.image_url);
  const thumbUrl = imageUrls[0] || null;
  const displayOrder = typeof item.order === 'number' ? item.order : (item.order || q.id);

  const questionLabel = globalIndex != null ? globalIndex : displayOrder;

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.questionCard}>
      <Text style={styles.questionNumber}>{`Question ${questionLabel}`}</Text>

      <View style={imageUrls.length > 0 ? styles.questionRow : {}}>
        <View style={{ flex: 1 }}>
          <LessonContentRenderer content={previewText} contentWidth={260} />
        </View>
        {thumbUrl && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onImagePress?.(imageUrls, 0)}
            style={{ marginLeft: 12 }}
          >
            <Image source={{ uri: thumbUrl }} style={styles.thumb} />
          </TouchableOpacity>
        )}
      </View>

      {Array.isArray(q.options) && q.options.length > 0 && (
        <View style={styles.optionsSection}>
          {q.options.map((option, idx) => (
            <View key={option.id || idx} style={styles.optionCard}>
              <Text style={styles.optionLabel}>{getOptionLabel(idx)}</Text>
              <View style={{ flex: 1 }}>
                <LessonContentRenderer content={option.option_text} contentWidth={220} />
              </View>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default QuestionItem;
