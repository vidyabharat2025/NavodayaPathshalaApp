// LessonDetailsViewModel.js
import { useEffect, useState } from 'react';
import { getLessonDetails } from '../../services/lessonDetailsService';

const useLessonDetailsViewModel = (lessonId) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getLessonDetails(lessonId)
      .then(data => setLesson(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [lessonId]);

  return { lesson, loading, error };
};

export default useLessonDetailsViewModel;
