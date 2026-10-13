import { JSX, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BORDER_RADIUS, MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { toPlainText } from '@app/shared/lib';
import { useTheme } from '@app/shared/theme';
import { FormattedText } from '@app/shared/ui';
import { getOptionText } from '../lib/options';
import type { ThemeColors } from '@app/shared/theme';
import type { IconName } from '@app/shared/ui';
import type { OptionContent } from '../model/types';

export type OptionState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dimmed';

type OptionButtonProps = {
  letter: string;
  option: OptionContent;
  state: OptionState;
  onPress?: () => void;
};

type OptionPalette = {
  background: string;
  border: string;
  badgeBackground: string;
  badgeText: string;
  icon: IconName | null;
  iconColor: string;
};

const getPalette = (state: OptionState, colors: ThemeColors): OptionPalette => {
  if (state === 'selected') {
    return {
      background: colors.accentSoft,
      border: colors.accentText,
      badgeBackground: colors.accent,
      badgeText: colors.onAccent,
      icon: null,
      iconColor: colors.accentText,
    };
  }
  if (state === 'correct') {
    return {
      background: colors.successSoft,
      border: colors.success,
      badgeBackground: colors.success,
      badgeText: colors.bgPrimary,
      icon: 'checkmark-circle',
      iconColor: colors.success,
    };
  }
  if (state === 'wrong') {
    return {
      background: colors.dangerSoft,
      border: colors.danger,
      badgeBackground: colors.danger,
      badgeText: colors.bgPrimary,
      icon: 'close-circle',
      iconColor: colors.danger,
    };
  }
  return {
    background: colors.bgCard,
    border: colors.border,
    badgeBackground: colors.border,
    badgeText: colors.textSecondary,
    icon: null,
    iconColor: colors.textMuted,
  };
};

export const OptionButton = ({ letter, option, state, onPress }: OptionButtonProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, locale } = useI18n();
  const palette = getPalette(state, colors);
  const offset = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (state === 'wrong') {
      offset.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withTiming(8, { duration: 50 }),
        withTiming(-6, { duration: 50 }),
        withTiming(6, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
    }
    if (state === 'correct') {
      scale.value = withSequence(withTiming(1.03, { duration: 140 }), withTiming(1, { duration: 160 }));
    }
  }, [state, offset, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }, { scale: scale.value }],
  }));

  const getStateLabel = (): string => {
    if (state === 'correct') {
      return t('quiz.optionCorrect');
    }
    if (state === 'wrong') {
      return t('quiz.optionWrong');
    }
    return '';
  };
  const stateLabel = getStateLabel();
  const isCode = 'code' in option;

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole="radio"
        accessibilityState={{ selected: state === 'selected', disabled: !onPress }}
        accessibilityLabel={`${letter}. ${toPlainText(getOptionText(option, locale))}. ${stateLabel}`}
        style={({ pressed }) => [
          styles.option,
          { backgroundColor: palette.background, borderColor: palette.border },
          state === 'dimmed' && styles.dimmed,
          pressed && styles.pressed,
        ]}
      >
        <View style={[styles.badge, { backgroundColor: palette.badgeBackground }]}>
          <Text style={[styles.badgeText, { color: palette.badgeText }]}>{letter}</Text>
        </View>
        <View style={styles.content}>
          {isCode ? (
            <Text style={[styles.code, { color: colors.textPrimary }]}>{option.code}</Text>
          ) : (
            <FormattedText>{option.text[locale]}</FormattedText>
          )}
        </View>
        {palette.icon ? <Ionicons name={palette.icon} size={24} color={palette.iconColor} /> : null}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: MIN_TOUCH_SIZE + 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: BORDER_RADIUS,
    borderWidth: 2,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
  dimmed: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.85,
  },
});
