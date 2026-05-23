/**
 * useTestAttempt Hook
 * Manages test attempt state in memory (no async storage)
 * Stores: attempt_id, test_id, total_questions, time_limit, started_at
 */

import { useState, useCallback } from 'react';

const useTestAttempt = () => {
  const [attempt, setAttempt] = useState({
    attempt_id: null,
    test_id: null,
    total_questions: 0,
    time_limit: 0,
    started_at: null,
  });

  /**
   * Initialize a new attempt
   * Called when user starts a test
   */
  const initializeAttempt = useCallback((data) => {
    setAttempt({
      attempt_id: data.attempt_id,
      test_id: data.test_id,
      total_questions: data.total_questions,
      time_limit: data.time_limit_minutes,
      started_at: data.started_at,
    });
  }, []);

  /**
   * Clear attempt state
   * Called when test is completed or user goes back
   */
  const clearAttempt = useCallback(() => {
    setAttempt({
      attempt_id: null,
      test_id: null,
      total_questions: 0,
      time_limit: 0,
      started_at: null,
    });
  }, []);

  /**
   * Get current attempt data
   */
  const getAttemptData = useCallback(() => {
    return attempt;
  }, [attempt]);

  /**
   * Check if attempt is active
   */
  const isAttemptActive = useCallback(() => {
    return attempt.attempt_id !== null;
  }, [attempt]);

  return {
    attempt,
    initializeAttempt,
    clearAttempt,
    getAttemptData,
    isAttemptActive,
  };
};

export default useTestAttempt;
