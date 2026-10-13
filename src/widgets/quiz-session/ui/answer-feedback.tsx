import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { OPTION_LETTERS } from '@app/entities/question';
import { CARD_BORDER_RADIUS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';
import type { AnswerResult } from '@app/entities/progress';
import type { OptionId } from '@app/entities/question';
import type { ThemeColors } from '@app/shared/theme';
import type { IconName } from '@app/shared/ui';

type AnswerFeedbackProps = {
  result: AnswerResult;
  correct: OptionId;
};

type FeedbackLook = {
  icon: IconName;
  color: string;
  background: string;
};

const getLook = (result: AnswerResult, colors: ThemeColors): FeedbackLook => {
  if (result === 'correct') {
    return { icon: 'checkmark-circle', color: colors.success, background: colors.successSoft };
  }
  if (result === 'wrong') {
    return { icon: 'close-circle', color: colors.danger, background: colors.dangerSoft };
  }
  return { icon: 'help-circle', color: colors.warning, background: colors.warningSoft };
};

export const AnswerFeedback = ({ result, correct }: AnswerFeedbackProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const look = getLook(result, colors);

  return (
    <Animated.View
      entering={FadeInDown.duration(260)}
      accessibilityLiveRegion="polite"
      style={[styles.container, { backgroundColor: look.background, borderColor: look.color }]}
    >
      <Ionicons name={look.icon} size={32} color={look.color} />
      <View style={styles.texts}>
        <AppText variant="subtitle" style={{ color: look.color }}>
          {t(`quiz.result.${result}`)}
        </AppText>
        {result === 'correct' ? null : (
          <AppText variant="caption" tone="secondary">
            {t('quiz.correctAnswerIs', { letter: OPTION_LETTERS[correct] })}
          </AppText>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: CARD_BORDER_RADIUS,
    borderWidth: 1,
  },
  texts: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
});
