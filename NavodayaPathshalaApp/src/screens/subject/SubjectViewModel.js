// SubjectViewModel.js
// Handles fetching and state for subjects
import { useEffect, useState } from 'react';
import { getSubjects } from '../../services/subjectService';

/**
 * Temporary hardcoded data for missing API fields
 * These will be replaced with actual API data once the backend is updated
 */
const TEMPORARY_DATA = {
  colors: ['#2563EB', '#A259FF', '#F59E0B', '#EC4899', '#06B6D4', '#10B981'],
  progressPercentages: [45, 10, 80, 0, 25, 90],
  topicsCount: [12, 8, 15, 5, 10, 6],
  currentTopics: [
    'Geometry basics',
    'Solar System',
    'Ancient Rome',
    'Colors & Shapes',
    'Grammar',
    'Photosynthesis',
  ],
  dueCount: [1, 0, 0, 0, 0, 0],
};

/**
 * Enhances API subject data with temporary hardcoded values
 * until the backend provides: progressPercentage, totalTopics, dueCount, color, currentTopic
 */
const enrichSubjectData = (subjects) => {
  return subjects.map((subject, index) => ({
    ...subject,
    progressPercentage: TEMPORARY_DATA.progressPercentages[index % TEMPORARY_DATA.progressPercentages.length],
    totalTopics: TEMPORARY_DATA.topicsCount[index % TEMPORARY_DATA.topicsCount.length],
    currentTopic: TEMPORARY_DATA.currentTopics[index % TEMPORARY_DATA.currentTopics.length],
    dueCount: TEMPORARY_DATA.dueCount[index % TEMPORARY_DATA.dueCount.length],
    color: TEMPORARY_DATA.colors[index % TEMPORARY_DATA.colors.length],
  }));
};

const useSubjectViewModel = (gradeId, language = 'en') => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getSubjects(gradeId, language)
      .then(data => {
        const enrichedData = enrichSubjectData(data);
        setSubjects(enrichedData);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [gradeId, language]);

  return { subjects, loading, error };
};

export default useSubjectViewModel;
