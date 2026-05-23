// LessonListViewModel.js
import { useEffect, useState } from 'react';
import { getLessons } from '../../services/lessonService';

const useLessonListViewModel = (topicId, language = 'en') => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getLessons(topicId, language)
      .then(data => setLessons(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [topicId, language]);

  return { lessons, loading, error };
};

export default useLessonListViewModel;
