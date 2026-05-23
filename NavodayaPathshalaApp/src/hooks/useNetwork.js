/**
 * useNetwork Hook
 * Custom hook to monitor network connectivity
 */

import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useNetwork = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check current network state
    const checkNetwork = async () => {
      try {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected ?? true);
      } catch (error) {
        console.warn('Network check failed:', error);
        setIsConnected(true); // Assume connected on error
      } finally {
        setIsLoading(false);
      }
    };

    checkNetwork();

    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true);
    });

    return unsubscribe;
  }, []);

  return { isConnected, isLoading };
};

export default useNetwork;
