import { JSX } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, CodeBlock, FormattedText } from '@app/shared/ui';
import { DIAGRAMS } from '../data/diagrams';
import { DiagramPlayer } from './diagram-player';
import type { Question } from '../model/types';

type ExplanationViewProps = {
  question: Question;
};

export const ExplanationView = ({ question }: ExplanationViewProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();

  return (
    <View style={styles.container}>
      <AppText variant="label" tone="muted">
        {t('quiz.explanation')}
      </AppText>
      {question.explanation.map((block, index) => {
        if (block.type === 'diagram') {
          return <DiagramPlayer key={index} diagram={DIAGRAMS[block.diagram]} />;
        }
        if (block.type === 'code') {
          return (
            <CodeBlock
              key={index}
              source={block.code.source}
              lang={block.code.lang}
              caption={block.caption ? text(block.caption) : undefined}
            />
          );
        }
        return <FormattedText key={index}>{text(block.text)}</FormattedText>;
      })}
      <AppText variant="label" tone="muted" style={styles.sourcesTitle}>
        {t('quiz.sources')}
      </AppText>
      {question.sources.map((source) => (
        <Pressable
          key={source.url}
          onPress={() => Linking.openURL(source.url)}
          accessibilityRole="link"
          style={({ pressed }) => [styles.source, pressed && styles.pressed]}
        >
          <Ionicons name="open-outline" size={18} color={colors.accentText} />
          <AppText tone="accent" style={styles.sourceTitle}>
            {source.title}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  sourcesTitle: {
    marginTop: 4,
  },
  source: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: MIN_TOUCH_SIZE,
  },
  sourceTitle: {
    flex: 1,
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.7,
  },
});
