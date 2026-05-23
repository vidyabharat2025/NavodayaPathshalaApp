import React from 'react';
import ImageViewing from 'react-native-image-viewing';

/**
 * FullScreenImageViewer
 * Props:
 *   visible: boolean - Show/hide viewer
 *   imageUrls: array of { url: string } - Images to show (for single image, pass [{url: ...}])
 *   onClose: function - Called when viewer is closed
 *   index: number (optional) - Initial index for multi-image
 */
export default function FullScreenImageViewer({ visible, imageUrls, onClose, index = 0 }) {
  return (
    <ImageViewing
      images={imageUrls.map(image => ({ uri: image.url }))}
      imageIndex={index}
      visible={visible}
      onRequestClose={onClose}
      swipeToCloseEnabled
      doubleTapToZoomEnabled
      presentationStyle="fullScreen"
    />
  );
}
