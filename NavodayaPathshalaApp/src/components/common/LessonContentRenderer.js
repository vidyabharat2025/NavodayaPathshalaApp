import React from 'react'
import { View, Dimensions } from 'react-native'
import { splitHtmlAndMath } from '../../utils/splitHtmlAndMath'
import HtmlWithMathRenderer from './HtmlWithMathRenderer'
import MathBlockRenderer from './MathBlockRenderer'

const screenWidth = Dimensions.get('window').width

/**
 * LessonContentRenderer
 * Renders content that may contain both HTML markup and LaTeX block math expressions
 * 
 * Inline math ($...$, \(...\)) stays inside HTML strings and is rendered by HtmlWithMathRenderer
 * Block math ($$...$$, \[...\]) is separated and rendered by MathBlockRenderer
 * 
 * Props:
 *   content: string - Content with HTML and/or LaTeX math
 *   contentWidth: number (optional) - Width for rendering, defaults to screen width minus padding
 */
export default function LessonContentRenderer({
  content,
  contentWidth = screenWidth - 36,
}) {
  if (!content) return null

  const blocks = splitHtmlAndMath(content)

  return (
    <View>
      {blocks.map((block, index) => {
        if (block.type === 'html') {
          // HTML content with inline math embedded
          return (
            <HtmlWithMathRenderer
              key={`html-${index}`}
              htmlContent={block.value}
              contentWidth={contentWidth}
            />
          )
        }

        // Block math - separate WebView
        return (
          <MathBlockRenderer
            key={`math-${index}`}
            expression={block.value}
          />
        )
      })}
    </View>
  )
}

