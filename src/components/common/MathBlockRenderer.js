import React, { useState } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

/**
 * MathBlockRenderer
 * Renders BLOCK LaTeX math expressions ($$...$$, \[...\]) using KaTeX inside a WebView
 * Auto-sizes WebView height based on content using postMessage with multi-pass measurement
 *
 * Props:
 *   expression: string - LaTeX math expression (without delimiters)
 */
export default function MathBlockRenderer({ expression }) {
  const [height, setHeight] = useState(1)

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            width: 100%;
            height: auto !important;
            min-height: 100%;
            margin: 0;
            padding: 0;
            overflow: visible !important;
          }
          
          body {
            margin: 0;
            padding: 4px 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <div id="math"></div>
        <script>
          function sendHeight() {
            const height = Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            );
            window.ReactNativeWebView.postMessage(String(height));
          }

          function observeSize() {
            sendHeight();
            requestAnimationFrame(sendHeight);
            setTimeout(sendHeight, 50);
            setTimeout(sendHeight, 150);
            setTimeout(sendHeight, 300);
          }

          try {
            katex.render(String.raw\`${expression}\`, document.getElementById('math'), {
              throwOnError: false,
              displayMode: true
            });
          } catch (e) {
            console.error('KaTeX error:', e);
          }
          
          observeSize();
        </script>
      </body>
    </html>
  `

  return (
    <View style={{ marginVertical: 8 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={{
          width: '100%',
          height,
          backgroundColor: 'transparent',
        }}
        scrollEnabled={false}
        javaScriptEnabled
        onMessage={(event) => {
          const h = Number(event.nativeEvent.data)
          if (!isNaN(h) && h > 0) {
            setHeight(prev => Math.max(prev, h))
          }
        }}
      />
    </View>
  )
}
