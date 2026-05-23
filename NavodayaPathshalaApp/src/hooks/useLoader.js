/**
 * useLoader Hook
 * Custom hook to manage global loader state
 */

import { useState, useEffect } from 'react';
import apiProgress from '../api/apiProgress';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Subscribe to API progress changes
    const unsubscribe = apiProgress.subscribe(loading => {
      setIsLoading(loading);
    });

    // Return cleanup function
    return unsubscribe;
  }, []);

  return { isLoading };
};

export default useLoader;
