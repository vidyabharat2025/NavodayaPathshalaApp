/**
 * Test Service
 * Handles fetching tests from /tests/paginated endpoint
 * Supports different test types with optional filters
 */

import apiClient from '../api/apiClient';

/**
 * Fetch tests with pagination
 * @param {Object} options
 * @param {string} options.type - Test type: 'lesson', 'topic', 'subject', 'grade', 'mock', 'pyq_paper'
 * @param {number} options.gradeId - Grade ID (required for most types)
 * @param {string} options.languageCode - Language code (required for pyq_paper)
 * @param {number} options.page - Page number (default 1)
 * @param {number} options.limit - Items per page (default 20)
 * @param {number} options.subjectId - Subject ID (optional, for lesson/topic/subject tests)
 * @param {number} options.topicId - Topic ID (optional, for lesson/topic tests)
 * @param {number} options.lessonId - Lesson ID (optional, for lesson tests only)
 * @returns {Promise<Object>} Response with data array and meta pagination info
 */
export const fetchTests = async (options = {}) => {
  try {
    const {
      type = 'lesson',
      gradeId,
      languageCode = 'en',
      page = 1,
      limit = 20,
      subjectId,
      topicId,
      lessonId,
    } = options;

    // Build query parameters
    const params = new URLSearchParams({
      page,
      limit,
      is_active: true,
      type,
    });

    // Add grade_id for all types except mock and pyq_paper (which don't require it)
    if (gradeId && type !== 'mock' && type !== 'pyq_paper') {
      params.append('grade_id', gradeId);
    }

    // Add language_code for pyq_paper tests
    if (type === 'pyq_paper') {
      params.append('language_code', languageCode);
    }

    // Add optional subject_id for lesson/topic/subject tests
    if (subjectId && ['lesson', 'topic', 'subject'].includes(type)) {
      params.append('subject_id', subjectId);
    }

    // Add optional topic_id for lesson/topic tests
    if (topicId && ['lesson', 'topic'].includes(type)) {
      params.append('topic_id', topicId);
    }

    // Add optional lesson_id for lesson tests only
    if (lessonId && type === 'lesson') {
      params.append('lesson_id', lessonId);
    }

    const response = await apiClient.get(`/tests/paginated?${params.toString()}`, {
      skipGlobalLoader: false, // Show loader for test list
    });

    return response.data; // { data: [...], meta: {...} }
  } catch (err) {
    console.error('Failed to fetch tests:', err);
    throw err;
  }
};

/**
 * Fetch tests for a specific test type
 * Convenience wrapper around fetchTests
 */
export const fetchLessonTests = (options) =>
  fetchTests({ ...options, type: 'lesson' });

export const fetchTopicTests = (options) =>
  fetchTests({ ...options, type: 'topic' });

export const fetchSubjectTests = (options) =>
  fetchTests({ ...options, type: 'subject' });

export const fetchGradeTests = (options) =>
  fetchTests({ ...options, type: 'grade' });

export const fetchMockTests = (options) =>
  fetchTests({ ...options, type: 'mock' });

export const fetchPYQTests = (options) =>
  fetchTests({ ...options, type: 'pyq_paper' });
