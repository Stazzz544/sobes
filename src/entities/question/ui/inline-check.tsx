import { JSX, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { CARD_BORDER_RADIUS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, FormattedText } from '@app/shared/ui';
import { OPTION_LETTERS } from '../lib/options';
import { OPTION_IDS } from '../model/types';
import { OptionButton } from './option-button';
import type { InlineCheck } from '../model/types';
import type { OptionState } from './option-button';

type InlineCheckViewProps = {
  check: InlineCheck;
  onAnswer?: (isCorrect: boolean) => void;
};

const getOptionState = (index: number, chosen: number | null, answer: number): OptionState => {
  if (chosen === null) {
    return 'idle';
  }
  if (index === answer) {
    return 'correct';
  }
  return index === chosen ? 'wrong' : 'dimmed';
};

export const InlineCheckView = ({ check, onAnswer }: InlineCheckViewProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const [chosen, setChosen] = useState<number | null>(null);
  const isCorrect = chosen === check.answer;

  const choose = (index: number): void => {
    setChosen(index);
    onAnswer?.(index === check.answer);
  };

  return (
    <View style={[styles.container, { borderColor: colors.accent, backgroundColor: colors.bgCard }]}>
      <View style={styles.header}>
        <Ionicons name="help-buoy-outline" size={18} color={colors.accentText} />
        <AppText variant="label" tone="accent">
          {t('lesson.check')}
        </AppText>
      </View>
      <FormattedText>{text(check.prompt)}</FormattedText>
      <View style={styles.options}>
        {check.options.map((option, index) => {
          const optionId = OPTION_IDS[index] ?? 'a';
          return (
            <OptionButton
              key={optionId}
              letter={OPTION_LETTERS[optionId]}
              option={option}
              state={getOptionState(index, chosen, check.answer)}
              onPress={chosen === null ? () => choose(index) : undefined}
            />
          );
        })}
      </View>
      {chosen !== null ? (
        <Animated.View entering={FadeIn.duration(260)} accessibilityLiveRegion="polite" style={styles.feedback}>
          <AppText variant="bodyStrong" style={{ color: isCorrect ? colors.success : colors.danger }}>
            {isCorrect ? t('quiz.result.correct') : t('quiz.result.wrong')}
          </AppText>
          <FormattedText>{text(check.explanation)}</FormattedText>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: CARD_BORDER_RADIUS,
    padding: 12,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  options: {
    gap: 8,
  },
  feedback: {
    gap: 6,
  },
});
