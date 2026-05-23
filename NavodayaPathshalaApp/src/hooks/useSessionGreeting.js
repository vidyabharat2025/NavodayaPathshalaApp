/**
 * useSessionGreeting Hook
 * Returns a random motivational greeting that stays consistent throughout the app session
 * Later this can be replaced with BE data based on user progress
 */

import { useState, useRef, useEffect } from 'react';

const GREETING_MESSAGES = [
  'Welcome Back',
  'Keep it up',
  'Nice to see you',
  'Ready to learn?',
  'Let\'s get started',
  'Time to shine',
  'Great to have you',
  'Keep Learning',
  'Stay Curious',
  'You got this',
  'Proud of your progress',
  'Let\'s do this',
  'Amazing Work',
  'Keep going strong',
  'Learning never stops',
];

const useSessionGreeting = () => {
  const [greeting, setGreeting] = useState(null);
  const greetingRef = useRef(null);

  useEffect(() => {
    // Only set greeting once per session
    if (greetingRef.current === null) {
      const randomIndex = Math.floor(Math.random() * GREETING_MESSAGES.length);
      const selectedGreeting = GREETING_MESSAGES[randomIndex];
      greetingRef.current = selectedGreeting;
      setGreeting(selectedGreeting);
    }
  }, []);

  return greeting || 'Welcome Back'; // Default fallback
};

export default useSessionGreeting;
