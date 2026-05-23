// TopicListViewModel.js
import { useEffect, useState } from 'react';
import { getTopics } from '../../services/topicService';

const useTopicListViewModel = (subjectId, language = 'en') => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTopics(subjectId, language)
      .then(data => setTopics(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [subjectId, language]);

  return { topics, loading, error };
};

export default useTopicListViewModel;
