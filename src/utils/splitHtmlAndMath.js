/**
 * Splits content into HTML blocks and BLOCK MATH ONLY ($$...$$, \[...\])
 * Inline math ($...$, \(...\)) stays INSIDE HTML strings
 * 
 * @param {string} input - Content string containing HTML and LaTeX
 * @returns {Array} Array of blocks with type ('html' or 'math') and value
 */
export function splitHtmlAndMath(input) {
  if (!input) return []

  const parts = []
  let lastIndex = 0

  // Regex to match ONLY block math:
  // - $$ ... $$ (block display math)
  // - \[ ... \] (block display math)
  // Inline math ($...$, \(...\)) is NOT matched - stays in HTML
  const blockMathRegex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\])/g

  let match
  const matches = []

  // Find all block math expression positions
  while ((match = blockMathRegex.exec(input)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      content: match[0],
    })
  }

  // If no block math found, treat entire content as HTML
  if (matches.length === 0) {
    return [
      {
        type: 'html',
        value: input,
      },
    ]
  }

  // Process content, splitting around block math expressions only
  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i]

    // Add HTML before this block math (includes any inline math in it)
    if (currentMatch.start > lastIndex) {
      const htmlContent = input.substring(lastIndex, currentMatch.start).trim()
      if (htmlContent) {
        parts.push({
          type: 'html',
          value: htmlContent,
        })
      }
    }

    // Extract and clean block math expression
    let mathValue = currentMatch.content

    if (mathValue.startsWith('$$') && mathValue.endsWith('$$')) {
      // Block math: $$ ... $$
      mathValue = mathValue.replace(/^\$\$/, '').replace(/\$\$$/, '').trim()
    } else if (mathValue.startsWith('\\[') && mathValue.endsWith('\\]')) {
      // Block math: \[ ... \]
      mathValue = mathValue.substring(2, mathValue.length - 2).trim()
    }

    // Remove any HTML tags from math (e.g., <p>$$math$$</p> → $$math$$)
    mathValue = mathValue.replace(/<[^>]*>/g, '').trim()

    if (mathValue) {
      parts.push({
        type: 'math',
        value: mathValue,
      })
    }

    lastIndex = currentMatch.end
  }

  // Add any remaining HTML content
  if (lastIndex < input.length) {
    const remainingHtml = input.substring(lastIndex).trim()
    if (remainingHtml) {
      parts.push({
        type: 'html',
        value: remainingHtml,
      })
    }
  }

  return parts.filter(block => block.value && block.value.trim() !== '')
}
