import { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useFocusEffect } from 'expo-router';

export const useNow = (): number => {
  const [now, setNow] = useState(Date.now);

  useFocusEffect(
    useCallback(() => {
      setNow(Date.now());
    }, []),
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        setNow(Date.now());
      }
    });
    return () => subscription.remove();
  }, []);

  return now;
};
