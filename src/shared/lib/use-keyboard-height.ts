import { useEffect, useState } from 'react';
import { Dimensions, Keyboard } from 'react-native';

// с edge-to-edge окно не ужимается под клавиатуру, а её height не включает полосу навигации — считаем от верхнего края клавиатуры
export const useKeyboardHeight = (): number => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (event) =>
      setHeight(Math.max(Dimensions.get('screen').height - event.endCoordinates.screenY, 0)),
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setHeight(0));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return height;
};
