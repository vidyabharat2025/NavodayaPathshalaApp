import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const QuestionCard = ({ question, questionNumber, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  let meta = {};
  try {
    meta = JSON.parse(question.meta);
  } catch (e) {
    return null;
  }

  const handleOptionSelect = (optionKey) => {
    if (isAnswered) return; // Prevent further selection

    setSelectedOption(optionKey);
    setIsAnswered(true);
  };

  const isOptionCorrect = (optionKey) => optionKey === meta.correct_option_key;

  return (
    <View style={{ marginBottom: 28, padding: 20, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#F0F0F0' }}>
      
      {/* Question Text */}
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#111111', marginBottom: 18, lineHeight: 24, fontFamily: 'System' }}>
        {meta.question_text}
      </Text>

      {/* Options */}
      {meta.options && meta.options.map((option) => {
        const isSelected = selectedOption === option.key;
        const isCorrect = isOptionCorrect(option.key);
        
        // Determine styling based on state
        let borderColor = '#E5E7EB';
        let backgroundColor = '#FFFFFF';
        let showCheckmark = false;
        let showCross = false;

        if (isAnswered) {
          if (isSelected && isCorrect) {
            // Correct answer selected
            borderColor = '#16A34A';
            backgroundColor = '#F0FDF4';
            showCheckmark = true;
          } else if (isSelected && !isCorrect) {
            // Wrong answer selected
            borderColor = '#DC2626';
            backgroundColor = '#FEF2F2';
            showCross = true;
          } else if (!isSelected && isCorrect) {
            // Show correct answer even if not selected
            borderColor = '#16A34A';
            backgroundColor = '#F0FDF4';
            showCheckmark = true;
          }
          // else: non-selected, non-correct options stay neutral
        }

        return (
          <TouchableOpacity
            key={option.key}
            onPress={() => handleOptionSelect(option.key)}
            disabled={isAnswered}
            activeOpacity={isAnswered ? 1 : 0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 14,
              borderRadius: 50,
              marginBottom: 10,
              borderWidth: 2,
              borderColor: borderColor,
              backgroundColor: backgroundColor,
              opacity: isAnswered && !isSelected && !isCorrect ? 0.5 : 1,
            }}
          >
            {/* Radio Circle */}
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: borderColor,
                marginRight: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isAnswered && (isSelected || isCorrect) ? borderColor : 'transparent',
              }}
            >
              {showCheckmark && (
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 }}>✓</Text>
              )}
              {showCross && (
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>✕</Text>
              )}
            </View>

            {/* Option Text */}
            <Text
              style={{
                fontSize: 15,
                color: isAnswered && (isSelected || isCorrect) ? '#111111' : '#333333',
                flex: 1,
                fontWeight: isAnswered && (isSelected || isCorrect) ? '600' : '400',
                fontFamily: 'System',
                lineHeight: 20,
              }}
            >
              {option.text}
            </Text>

            {/* Right-aligned Icon */}
            {showCheckmark && (
              <Text style={{ fontSize: 16, marginLeft: 8 }}>✓</Text>
            )}
            {showCross && (
              <Text style={{ fontSize: 16, marginLeft: 8, color: '#DC2626' }}>✕</Text>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Helper Text - Shows Only When Not Answered */}
      {!isAnswered && (
        <Text style={{ fontSize: 13, color: '#AAAAAA', marginTop: 14, fontStyle: 'italic', textAlign: 'center', lineHeight: 18, fontFamily: 'System' }}>
          Select an option to see the correct answer
        </Text>
      )}
    </View>
  );
};

export default QuestionCard;
