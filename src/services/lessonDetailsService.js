// lessonDetailsService.js
import apiClient from '../api/apiClient';

export const getLessonDetails = async (lessonId) => {
  const response = await apiClient.get(`/lessons/${lessonId}`);
  return response.data;
};
