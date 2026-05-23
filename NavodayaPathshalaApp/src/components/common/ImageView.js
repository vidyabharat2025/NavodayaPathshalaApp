/**
 * ImageView Component
 * Image component with placeholder, error handling, and loading state
 */

import React, { useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import THEME from '../../config/theme';

const COLORS = THEME.COLORS;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.ERROR_LIGHT,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: 12,
    textAlign: 'center',
  },
});

/**
 * ImageView Component
 * @param {string} source - Image source (URI or require())
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {boolean} showLoading - Show loading indicator while loading
 * @param {string} placeholder - Placeholder image source
 * @param {string} errorImage - Error fallback image source
 * @param {function} onLoad - Callback when image loads
 * @param {function} onError - Callback when image fails to load
 * @param {object} style - Additional custom styles
 */
const ImageView = ({
  source,
  width = 100,
  height = 100,
  showLoading = true,
  placeholder,
  errorImage,
  onLoad,
  onError,
  style,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = error => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError(error);
    }
  };

  const containerStyle = [
    styles.container,
    { width, height },
    style,
  ];

  if (hasError && errorImage) {
    return (
      <View style={containerStyle}>
        <Image
          source={errorImage}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={[containerStyle, styles.errorContainer]}>
        <Text style={styles.errorText}>Failed to load image</Text>
      </View>
    );
  }

  if (!source) {
    return (
      <View style={containerStyle}>
        {placeholder && (
          <Image
            source={placeholder}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Image
        source={source}
        style={styles.image}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        resizeMode="cover"
        {...props}
      />
      {isLoading && showLoading && (
        <View style={[styles.placeholder, { position: 'absolute' }]}>
          <ActivityIndicator size="small" color={COLORS.PRIMARY} />
        </View>
      )}
    </View>
  );
};

export default ImageView;
