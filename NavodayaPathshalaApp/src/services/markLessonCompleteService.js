// markLessonCompleteService.js
import apiClient from '../api/apiClient';

export const markLessonComplete = async (lessonId) => {
  const response = await apiClient.post(`/lessons/${lessonId}/mark-complete`);
  return response.data;
};
