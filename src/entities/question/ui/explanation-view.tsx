import { JSX } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, CodeBlock, FormattedText } from '@app/shared/ui';
import { TAGS } from '../config/tags';
import { DIAGRAMS } from '../data/diagrams';
import { LESSONS_BY_TAG } from '../lessons';
import { DiagramPlayer } from './diagram-player';
import type { TagId } from '../config/tags';
import type { ExplanationBlock, Question, QuestionSource } from '../model/types';

type ExplanationBlocksProps = {
  blocks: ExplanationBlock[];
};

type SourceListProps = {
  sources: QuestionSource[];
};

type ExplanationViewProps = {
  question: Question;
  onOpenLesson?: (tag: TagId) => void;
};

export const ExplanationBlocks = ({ blocks }: ExplanationBlocksProps): JSX.Element => {
  const { text } = useI18n();

  return (
    <>
      {blocks.map((block, index) => {
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
    </>
  );
};

export const SourceList = ({ sources }: SourceListProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <>
      <AppText variant="label" tone="muted" style={styles.sourcesTitle}>
        {t('quiz.sources')}
      </AppText>
      {sources.map((source) => (
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
    </>
  );
};

export const ExplanationView = ({ question, onOpenLesson }: ExplanationViewProps): JSX.Element => {
  const { t, text } = useI18n();
  const lessonTags = onOpenLesson ? question.tags.filter((tag) => LESSONS_BY_TAG[tag]) : [];

  return (
    <View style={styles.container}>
      <AppText variant="label" tone="muted">
        {t('quiz.explanation')}
      </AppText>
      <ExplanationBlocks blocks={question.explanation} />
      {lessonTags.map((tag) => (
        <Button
          key={tag}
          title={t('lesson.open', { tag: text(TAGS[tag].title) })}
          icon="book-outline"
          variant="secondary"
          size="compact"
          onPress={() => onOpenLesson?.(tag)}
        />
      ))}
      <SourceList sources={question.sources} />
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
