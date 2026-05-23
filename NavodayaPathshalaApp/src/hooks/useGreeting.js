/**
 * useGreeting Hook
 * Returns a greeting message based on the current time of day
 */

import { useState, useEffect } from 'react';

const useGreeting = () => {
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      // Determine greeting based on current hour
      if (currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour < 17) {
        setGreeting('Good Afternoon');
      } else if (currentHour < 21) {
        setGreeting('Good Evening');
      } else {
        setGreeting('Good Night');
      }
    };

    // Set initial greeting
    updateGreeting();

    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return greeting;
};

export default useGreeting;
