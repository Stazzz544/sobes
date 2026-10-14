import { JSX } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BORDER_RADIUS, MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, CodeBlock } from '@app/shared/ui';
import type { ThemeColors } from '@app/shared/theme';
import type { OutputQuestion } from '../model/types';

type OutputAnswerProps = {
  question: OutputQuestion;
  text: string;
  isRevealed: boolean;
  isCorrect: boolean;
  onChange?: (text: string) => void;
};

const getBorderColor = (isRevealed: boolean, isCorrect: boolean, colors: ThemeColors): string => {
  if (!isRevealed) {
    return colors.accent;
  }
  return isCorrect ? colors.success : colors.danger;
};

export const OutputAnswer = ({ question, text, isRevealed, isCorrect, onChange }: OutputAnswerProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const isEditable = !isRevealed && onChange !== undefined;

  return (
    <View style={styles.container}>
      {isEditable || text ? (
        <TextInput
          value={text}
          onChangeText={onChange}
          editable={isEditable}
          placeholder={t('question.outputPlaceholder')}
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          accessibilityLabel={t('question.outputPlaceholder')}
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              backgroundColor: colors.codeBg,
              borderColor: getBorderColor(isRevealed, isCorrect, colors),
            },
          ]}
        />
      ) : null}
      {isRevealed && !isCorrect ? (
        <View style={styles.correct}>
          <View style={styles.correctTitle}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <AppText variant="label" tone="muted">
              {t('question.outputCorrect')}
            </AppText>
          </View>
          <CodeBlock source={question.answers[0] ?? ''} lang="text" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    minHeight: MIN_TOUCH_SIZE,
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: 14,
    fontFamily: 'monospace',
    fontSize: 15,
  },
  correct: {
    gap: 8,
  },
  correctTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
