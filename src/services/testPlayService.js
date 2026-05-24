/**
 * Test Play Service
 * Handles fetching questions and passages for test play flow
 */

import apiClient from '../api/apiClient';

/**
 * Fetch the first question or passage for a test attempt
 * @param {number|string} testId - The ID of the test
 * @returns {Promise<Object>} The play/start response
 */
export const fetchFirstPlayItem = async (testId) => {
  if (!testId) throw new Error('Test ID is required');
  const response = await apiClient.get(`/tests/${testId}/play/start`);
  return response.data;
};

/**
 * Fetch the next question or passage
 * @param {number|string} testId - The ID of the test
 * @param {number} currentOrder - The current order/index
 * @returns {Promise<Object>} The play/next response
 */
export const fetchNextPlayItem = async (testId, currentOrder) => {
  if (!testId || currentOrder == null) throw new Error('Test ID and current order are required');
  const response = await apiClient.get(`/tests/${testId}/play/next?current=${currentOrder}`);
  return response.data;
};

/**
 * Fetch the previous question or passage
 * @param {number|string} testId - The ID of the test
 * @param {number} currentOrder - The current order/index
 * @returns {Promise<Object>} The play/prev response
 */
export const fetchPrevPlayItem = async (testId, currentOrder) => {
  if (!testId || currentOrder == null) throw new Error('Test ID and current order are required');
  const response = await apiClient.get(`/tests/${testId}/play/prev?current=${currentOrder}`);
  return response.data;
};
