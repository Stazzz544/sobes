import { JSX, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '@app/shared/theme';

type ProgressBarProps = {
  value: number;
  color?: string;
  height?: number;
  accessibilityLabel?: string;
};

export const ProgressBar = ({ value, color, height = 8, accessibilityLabel }: ProgressBarProps): JSX.Element => {
  const { colors } = useTheme();
  const clamped = Math.min(Math.max(value, 0), 1);
  const progress = useSharedValue(clamped);

  useEffect(() => {
    progress.value = withTiming(clamped, { duration: 400 });
  }, [clamped, progress]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      style={[styles.track, { height, borderRadius: height / 2, backgroundColor: colors.bgSecondary }]}
    >
      <Animated.View style={[styles.fill, { borderRadius: height / 2, backgroundColor: color ?? colors.accent }, fillStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
