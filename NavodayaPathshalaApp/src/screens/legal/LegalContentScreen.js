/**
 * Legal Content Screen (View)
 * Displays Privacy Policy and Terms & Conditions
 * Renders HTML content from backend
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Linking,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import AppText from '../../components/common/AppText';
import { fetchLegalContent } from '../../services/legalContentService';
import { useAppContext } from '../../store/AppContext';
import COLORS from '../../config/colors';
import FONTS from '../../config/fonts';

const TAG = 'LegalContentScreen';

/**
 * Legal Content Screen Component
 * @param {object} route - React Navigation route object
 * @param {object} navigation - React Navigation object
 */
const LegalContentScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const { user } = useAppContext();
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  // Get language from user profile, default to 'en'
  const languageCode = user?.language || 'en';

  /**
   * Fetch legal content on mount
   */
  useEffect(() => {
    loadLegalContent();
  }, [type, languageCode]);

  /**
   * Load legal content from API
   */
  const loadLegalContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchLegalContent(type, languageCode);
      setContent(data);
    } catch (err) {
      console.error(`[${TAG}] Error loading content:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle back button press
   */
  const handleBackPress = () => {
    navigation.goBack();
  };

  /**
   * Render header with back button
   */
  const renderHeader = () => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
    }}>
      <TouchableOpacity
        onPress={handleBackPress}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#eef2ff',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        }}
      >
        <Image
          source={require('../../assets/icons/back-arrow.png')}
          style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
            tintColor: '#4f46e5',
          }}
        />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <AppText style={{
          fontSize: 18,
          fontWeight: '700',
          fontFamily: FONTS.FAMILY.BOLD,
          color: COLORS.TEXT_PRIMARY,
        }}>
          {content?.title || (type === 'privacy-policy' ? 'Privacy Policy' : 'Terms & Conditions')}
        </AppText>
      </View>
    </View>
  );

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {renderHeader()}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f3f4f6',
        }}>
          <ActivityIndicator size="large" color="#4f46e5" />
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {renderHeader()}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          backgroundColor: '#f3f4f6',
        }}>
          <AppText style={{
            fontSize: 16,
            fontFamily: FONTS.FAMILY.REGULAR,
            color: COLORS.TEXT_PRIMARY,
            marginBottom: 16,
            textAlign: 'center',
          }}>
            Failed to load content
          </AppText>
          <AppText style={{
            fontSize: 13,
            fontFamily: FONTS.FAMILY.REGULAR,
            color: COLORS.TEXT_SECONDARY,
            marginBottom: 20,
            textAlign: 'center',
          }}>
            {error}
          </AppText>
          <TouchableOpacity
            onPress={loadLegalContent}
            style={{
              paddingHorizontal: 32,
              paddingVertical: 12,
              backgroundColor: '#4f46e5',
              borderRadius: 8,
            }}
          >
            <AppText style={{
              fontSize: 14,
              fontWeight: '600',
              fontFamily: FONTS.FAMILY.SEMI_BOLD,
              color: '#ffffff',
            }}>
              Try Again
            </AppText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Define styles for HTML tags
   */
  const tagsStyles = {
    h1: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 16,
      marginTop: 16,
      color: COLORS.TEXT_PRIMARY,
      fontFamily: FONTS.FAMILY.BOLD,
    },
    h2: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      marginTop: 14,
      color: COLORS.TEXT_PRIMARY,
      fontFamily: FONTS.FAMILY.SEMI_BOLD,
    },
    h3: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
      marginTop: 12,
      color: COLORS.TEXT_PRIMARY,
      fontFamily: FONTS.FAMILY.SEMI_BOLD,
    },
    p: {
      fontSize: 14,
      marginBottom: 12,
      lineHeight: 20,
      color: COLORS.TEXT_PRIMARY,
      fontFamily: FONTS.FAMILY.REGULAR,
    },
    li: {
      fontSize: 14,
      marginBottom: 8,
      lineHeight: 20,
      color: COLORS.TEXT_PRIMARY,
      fontFamily: FONTS.FAMILY.REGULAR,
      marginLeft: 16,
    },
    ul: {
      marginBottom: 12,
    },
    ol: {
      marginBottom: 12,
    },
    a: {
      color: '#4f46e5',
      textDecorationLine: 'underline',
    },
  };

  /**
   * Handle link press in HTML content
   */
  const handleLinkPress = (href) => {
    if (href) {
      Linking.openURL(href).catch(err =>
        console.error(`[${TAG}] Failed to open URL:`, err)
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {renderHeader()}

      <ScrollView
        style={{ flex: 1, backgroundColor: '#f3f4f6' }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Last Updated Text */}
        {content?.last_updated && (
          <View style={{
            marginHorizontal: 16,
            marginTop: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: '#ede9fe',
            borderRadius: 8,
            borderLeftWidth: 4,
            borderLeftColor: '#4f46e5',
          }}>
            <AppText style={{
              fontSize: 12,
              fontFamily: FONTS.FAMILY.REGULAR,
              color: '#5b21b6',
            }}>
              Last updated: {new Date(content.last_updated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </AppText>
          </View>
        )}

        {/* HTML Content */}
        <View style={{
          marginHorizontal: 16,
          marginTop: 12,
          backgroundColor: '#ffffff',
          borderRadius: 12,
          overflow: 'hidden',
          paddingHorizontal: 16,
          paddingVertical: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 1,
          borderWidth: 1,
          borderColor: '#f3f4f6',
        }}>
          {content?.content_html ? (
            <RenderHTML
              contentWidth={width - 80}
              source={{ html: content.content_html }}
              tagsStyles={tagsStyles}
              onLinkPress={(event, href) => handleLinkPress(href)}
              defaultTextProps={{
                selectable: true,
              }}
            />
          ) : (
            <AppText style={{
              fontSize: 14,
              fontFamily: FONTS.FAMILY.REGULAR,
              color: COLORS.TEXT_SECONDARY,
            }}>
              No content available
            </AppText>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LegalContentScreen;
