import { JSX, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BORDER_RADIUS, MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, CodeTokens, tokenize } from '@app/shared/ui';
import type { ThemeColors } from '@app/shared/theme';
import type { IconName, Token } from '@app/shared/ui';
import type { BugLineQuestion } from '../model/types';

type BugLineAnswerProps = {
  question: BugLineQuestion;
  line: number | null;
  isRevealed: boolean;
  onChange?: (line: number) => void;
};

const splitLines = (tokens: Token[]): Token[][] => {
  const lines: Token[][] = [[]];
  tokens.forEach((token) => {
    token.value.split('\n').forEach((part, index) => {
      if (index > 0) {
        lines.push([]);
      }
      if (part) {
        lines[lines.length - 1]?.push({ kind: token.kind, value: part });
      }
    });
  });
  return lines;
};

const getLineBackground = (lineNumber: number, line: number | null, answerLine: number, isRevealed: boolean, colors: ThemeColors): string => {
  if (isRevealed && lineNumber === answerLine) {
    return colors.successSoft;
  }
  if (isRevealed && lineNumber === line) {
    return colors.dangerSoft;
  }
  if (lineNumber === line) {
    return colors.accentSoft;
  }
  return 'transparent';
};

type LineMarker = {
  icon: IconName;
  color: string;
};

const getLineMarker = (lineNumber: number, line: number | null, answerLine: number, isRevealed: boolean, colors: ThemeColors): LineMarker | null => {
  if (isRevealed && lineNumber === answerLine) {
    return { icon: 'checkmark-circle', color: colors.success };
  }
  if (isRevealed && lineNumber === line) {
    return { icon: 'close-circle', color: colors.danger };
  }
  if (lineNumber === line) {
    return { icon: 'arrow-forward-circle', color: colors.accentText };
  }
  return null;
};

export const BugLineAnswer = ({ question, line, isRevealed, onChange }: BugLineAnswerProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const lines = useMemo(() => splitLines(tokenize(question.code.source, question.code.lang)), [question.code]);

  return (
    <View style={styles.container}>
      {isRevealed ? null : (
        <AppText variant="caption" tone="secondary">
          {t('question.bugLineHint')}
        </AppText>
      )}
      <View style={[styles.code, { backgroundColor: colors.codeBg, borderColor: colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {lines.map((tokens, index) => {
              const lineNumber = index + 1;
              const isSelected = lineNumber === line;
              const marker = getLineMarker(lineNumber, line, question.answerLine, isRevealed, colors);
              return (
                <Pressable
                  key={lineNumber}
                  onPress={isRevealed || !onChange ? undefined : () => onChange(lineNumber)}
                  disabled={isRevealed || !onChange}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`${t('question.bugLineLabel', { line: lineNumber })}: ${tokens.map((token) => token.value).join('')}`}
                  style={[
                    styles.line,
                    { backgroundColor: getLineBackground(lineNumber, line, question.answerLine, isRevealed, colors) },
                  ]}
                >
                  <View style={styles.number}>
                    {marker ? (
                      <Ionicons name={marker.icon} size={18} color={marker.color} />
                    ) : (
                      <Text style={[styles.numberText, { color: colors.codeComment }]}>{lineNumber}</Text>
                    )}
                  </View>
                  <Text style={[styles.text, { color: colors.codeText }]}>
                    <CodeTokens tokens={tokens} />
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  code: {
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    paddingVertical: 8,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_SIZE,
    paddingRight: 14,
  },
  number: {
    width: 40,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  numberText: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 13,
  },
});
