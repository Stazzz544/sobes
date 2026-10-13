import { ComponentProps, JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BORDER_RADIUS, MIN_TOUCH_SIZE } from '@app/shared/config';
import { useTheme } from '@app/shared/theme';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ThemeColors } from '@app/shared/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type ButtonSize = 'regular' | 'compact';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
};

type ButtonPalette = {
  background: string;
  foreground: string;
  border: string;
};

const getPalette = (variant: ButtonVariant, colors: ThemeColors): ButtonPalette => {
  if (variant === 'secondary') {
    return { background: colors.accentSoft, foreground: colors.accentText, border: colors.accentSoft };
  }
  if (variant === 'ghost') {
    return { background: 'transparent', foreground: colors.textPrimary, border: colors.border };
  }
  if (variant === 'danger') {
    return { background: colors.dangerSoft, foreground: colors.danger, border: colors.dangerSoft };
  }
  return { background: colors.accent, foreground: colors.onAccent, border: colors.accent };
};

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'regular',
  icon,
  disabled = false,
  style,
  accessibilityHint,
}: ButtonProps): JSX.Element => {
  const { colors } = useTheme();
  const palette = getPalette(variant, colors);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.button,
        size === 'compact' && styles.compact,
        { backgroundColor: palette.background, borderColor: palette.border },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {icon ? <Ionicons name={icon} size={20} color={palette.foreground} /> : null}
        <Text style={[styles.title, size === 'compact' && styles.compactTitle, { color: palette.foreground }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: MIN_TOUCH_SIZE + 4,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
  },
  compact: {
    minHeight: MIN_TOUCH_SIZE,
    paddingHorizontal: 12,
  },
  compactTitle: {
    fontSize: 14,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.45,
  },
});
