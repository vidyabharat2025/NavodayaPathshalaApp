import React, { useState } from 'react'
import { View, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import COLORS from '../../config/colors'

const screenWidth = Dimensions.get('window').width

/**
 * HtmlWithMathRenderer
 * Renders HTML content that contains inline KaTeX math expressions
 * Uses KaTeX.renderMathInElement() to process all inline math in the HTML
 * 
 * Props:
 *   htmlContent: string - HTML string (can contain $...$, \(...\) inline math)
 *   contentWidth: number (optional) - Width for rendering
 */
export default function HtmlWithMathRenderer({
  htmlContent,
  contentWidth = screenWidth - 36,
}) {
  const [height, setHeight] = useState(1)

  if (!htmlContent) return null

  // Wrap HTML with KaTeX support and proper styling
  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
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
            font-size: 17px;
            line-height: 1.6;
            color: #333333;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            word-wrap: break-word;
            overflow-wrap: break-word;
            padding: 0px;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
          }
          
          p {
            margin-bottom: 16px;
            font-size: 17px;
            color: #333333;
            line-height: 26px;
            font-weight: 400;
          }
          
          h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 16px;
            margin-top: 24px;
            color: #111111;
            line-height: 36px;
          }
          
          h2 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 14px;
            margin-top: 20px;
            color: #111111;
            line-height: 32px;
          }
          
          h3 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
            margin-top: 16px;
            color: #111111;
            line-height: 28px;
          }
          
          h4 {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 12px;
            color: #111111;
          }
          
          strong, b {
            font-weight: 700;
            color: #111111;
          }
          
          em, i {
            font-style: italic;
          }
          
          u {
            text-decoration: underline;
          }
          
          ul, ol {
            margin-left: 24px;
            margin-bottom: 16px;
            padding-left: 0;
          }
          
          li {
            margin-bottom: 8px;
            line-height: 24px;
            font-size: 16px;
            color: #333333;
            margin-left: 12px;
            padding-left: 8px;
          }
          
          code {
            background-color: #F5F5F5;
            padding: 3px 8px;
            border-radius: 4px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            font-size: 15px;
            color: #333333;
          }
          
          pre {
            background-color: #F5F5F5;
            padding: 14px;
            border-radius: 8px;
            margin-bottom: 16px;
            margin-top: 16px;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            color: #333333;
            overflow-x: auto;
            line-height: 22px;
          }
          
          pre code {
            background-color: transparent;
            padding: 0;
            font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
          }
          
          a {
            color: #2563EB;
            text-decoration: none;
            border-bottom: 1px solid rgba(37, 99, 235, 0.3);
          }
          
          a:active {
            opacity: 0.7;
          }
          
          br {
            display: block;
            content: "";
            margin: 8px 0;
          }
          
          .katex {
            display: inline;
            margin: 0 2px;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
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
            renderMathInElement(document.body, {
              delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '\\\\[', right: '\\\\]', display: true },
                { left: '\\\\(', right: '\\\\)', display: false },
                { left: '$', right: '$', display: false }
              ],
              throwOnError: false
            });
          } catch (e) {
            console.error('KaTeX error:', e);
          }
          
          window.addEventListener('load', observeSize);
          observeSize();
        </script>
      </body>
    </html>
  `

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: fullHtml }}
      style={{
        width: contentWidth,
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
  )
}
