/**
 * Test Attempt Service
 * Handles all test attempt-related API calls
 * - Start/restart attempt
 * - Save answers
 * - Submit test
 * - Get latest attempt summary
 */

import apiClient from '../api/apiClient';
import { API_ENDPOINTS } from '../api/apiConstants';

const TAG = 'TestAttemptService';

/**
 * Start or restart a test attempt
 * @param {string} testId - Test ID
 * @returns {Promise<object>} Attempt data with attempt_id, total_questions, time_limit_minutes, started_at
 */
const startAttempt = async (testId) => {
  try {
    console.log(`[${TAG}] Starting attempt for test: ${testId}`);

    const endpoint = API_ENDPOINTS.TEST.START_ATTEMPT.replace(':test_id', testId);
    const response = await apiClient.post(endpoint, {});

    const { data } = response;
    console.log(`[${TAG}] Attempt started successfully`, {
      attempt_id: data.attempt_id,
      total_questions: data.total_questions,
      time_limit_minutes: data.time_limit_minutes,
    });

    return data;
  } catch (err) {
    console.error(`[${TAG}] Failed to start attempt for test ${testId}`, err);
    throw err;
  }
};

/**
 * Save an answer for a question
 * Backend will upsert (overwrite previous answer if exists)
 * @param {string} attemptId - Attempt ID
 * @param {string} questionId - Question ID
 * @param {string} selectedOptionId - Selected option ID
 * @returns {Promise<void>}
 */
const saveAnswer = async (attemptId, questionId, selectedOptionId, timeSpentSeconds) => {
  try {
    console.log(`[${TAG}] Saving answer for question: ${questionId}`, {
      attempt_id: attemptId,
      selected_option_id: selectedOptionId,
      time_spent_seconds: timeSpentSeconds,
    });

    const endpoint = API_ENDPOINTS.ATTEMPT.SAVE_ANSWER.replace(':attempt_id', attemptId);
    const response = await apiClient.post(endpoint, {
      question_id: questionId,
      selected_option_id: selectedOptionId,
      time_spent_seconds: timeSpentSeconds,
    });

    console.log(`[${TAG}] Answer saved successfully`);
    return response.data;
  } catch (err) {
    console.error(`[${TAG}] Failed to save answer for question ${questionId}`, err);
    throw err;
  }
};

/**
 * Submit the test
 * Marks the attempt as submitted and returns result
 * @param {string} attemptId - Attempt ID
 * @returns {Promise<object>} Result data with score, percentage, passed, total_questions, submitted_late, time_spent_seconds
 */
const submitTest = async (attemptId) => {
  try {
    console.log(`[${TAG}] Submitting test for attempt: ${attemptId}`);

    const endpoint = API_ENDPOINTS.ATTEMPT.SUBMIT_TEST.replace(':attempt_id', attemptId);
    const response = await apiClient.post(endpoint, {});

    const { data } = response;
    console.log(`[${TAG}] Test submitted successfully`, {
      score: data.score,
      percentage: data.percentage,
      passed: data.passed,
    });

    return data;
  } catch (err) {
    console.error(`[${TAG}] Failed to submit test for attempt ${attemptId}`, err);
    throw err;
  }
};

/**
 * Get the latest attempt summary for a test
 * @param {string} testId - Test ID
 * @returns {Promise<object>} Latest attempt data
 */
const getLatestAttempt = async (testId) => {
  try {
    console.log(`[${TAG}] Getting latest attempt for test: ${testId}`);

    const endpoint = API_ENDPOINTS.TEST.GET_LATEST_ATTEMPT.replace(':test_id', testId);
    const response = await apiClient.get(endpoint);

    console.log(`[${TAG}] Latest attempt retrieved successfully`);
    return response.data;
  } catch (err) {
    console.error(`[${TAG}] Failed to get latest attempt for test ${testId}`, err);
    throw err;
  }
};

export {
  startAttempt,
  saveAnswer,
  submitTest,
  getLatestAttempt,
};
