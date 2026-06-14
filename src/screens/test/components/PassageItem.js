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

const PassageItem = ({ item, expanded, onToggle, onQuestionPress, onImagePress, startIndex = 0 }) => {
  const pid = item.passage && item.passage.id;
  const displayOrder = typeof item.order === 'number' ? item.order : item.order;

  return (
    <View style={styles.passageCard}>
      <TouchableOpacity onPress={() => onToggle(pid)} activeOpacity={0.7}>
        <View style={styles.passageHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.passageTitle}>
              {item.passage.title || `Section ${displayOrder}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {expanded && Array.isArray(item.questions) && (
        <View style={{ marginTop: 14 }}>
          {item.questions.map((q, index) => {
            const images = parseImageUrls(q.image_url);
            const questionText = stripHtml(q.text || '');
            return (
              <View key={q.id} style={styles.passageQuestionBlock}>
                <View style={styles.passageQuestionHeader}>
                  <Text style={styles.passageQuestionLabel}>
                    {`Q ${startIndex + index + 1}`}
                  </Text>
                </View>
                
                <LessonContentRenderer 
                  content={q.text} 
                  contentWidth={280}
                  style={{ marginBottom: 10 }}
                />
                
                {images.length > 0 && (
                  <View style={styles.passageImagesRow}>
                    {images.map((imageUrl, imgIndex) => (
                      <TouchableOpacity
                        key={`${imageUrl}-${imgIndex}`}
                        activeOpacity={0.8}
                        onPress={() => onImagePress?.(images, imgIndex)}
                      >
                        <Image
                          source={{ uri: imageUrl }}
                          style={styles.passageQuestionImage}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
                <View style={styles.optionsSection}>
                  {Array.isArray(q.options) && q.options.map((option, optIndex) => (
                    <View key={option.id} style={styles.optionCard}>
                      <Text style={styles.optionLabel}>
                        {getOptionLabel(optIndex)}
                      </Text>
                      <View style={{ flex: 1 }}>
                        <LessonContentRenderer 
                          content={option.option_text} 
                          contentWidth={240}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default PassageItem;
