import { JSX } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MIN_TOUCH_SIZE } from '@app/shared/config';
import { useTheme } from '@app/shared/theme';
import type { IconName } from './button';

type IconButtonProps = {
  icon: IconName;
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
  isPrimary?: boolean;
};

export const IconButton = ({
  icon,
  onPress,
  accessibilityLabel,
  disabled = false,
  isPrimary = false,
}: IconButtonProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: isPrimary ? colors.accent : colors.border },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Ionicons name={icon} size={22} color={isPrimary ? colors.onAccent : colors.textPrimary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: MIN_TOUCH_SIZE,
    height: MIN_TOUCH_SIZE,
    borderRadius: MIN_TOUCH_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.35,
  },
});
