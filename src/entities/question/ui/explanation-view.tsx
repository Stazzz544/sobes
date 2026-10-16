import { JSX, useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, CodeBlock, FormattedText } from '@app/shared/ui';
import { TAGS } from '../config/tags';
import { findQuestionStep, isStepLesson } from '../lib/lesson';
import { getDiagram, getIllustration, getLessonByTag } from '../model/content';
import { DiagramPlayer } from './diagram-player';
import { GlossarySheet } from './glossary-sheet';
import { IllustrationView } from './illustration-view';
import { InlineCheckView } from './inline-check';
import type { TagId } from '../config/tags';
import type { LessonBlock, Question, QuestionSource } from '../model/types';

type ExplanationBlocksProps = {
  blocks: readonly LessonBlock[];
  onCheckAnswer?: (checkId: string, isCorrect: boolean) => void;
};

type SourceListProps = {
  sources: QuestionSource[];
};

type ExplanationViewProps = {
  question: Question;
  onOpenLesson?: (tag: TagId, stepId?: string) => void;
};

export const ExplanationBlocks = ({ blocks, onCheckAnswer }: ExplanationBlocksProps): JSX.Element => {
  const { text } = useI18n();
  const [termId, setTermId] = useState<string | null>(null);
  const [isTermOpen, setIsTermOpen] = useState(false);

  const openTerm = (id: string): void => {
    setTermId(id);
    setIsTermOpen(true);
  };

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'diagram') {
          const diagram = getDiagram(block.diagram);
          return diagram ? <DiagramPlayer key={index} diagram={diagram} /> : null;
        }
        if (block.type === 'illustration') {
          const illustration = getIllustration(block.illustration);
          return illustration ? (
            <IllustrationView key={index} illustration={illustration} caption={block.caption ? text(block.caption) : undefined} />
          ) : null;
        }
        if (block.type === 'check') {
          return (
            <InlineCheckView
              key={block.check.id}
              check={block.check}
              onAnswer={(isCorrect) => onCheckAnswer?.(block.check.id, isCorrect)}
            />
          );
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
        return (
          <FormattedText key={index} onTermPress={openTerm}>
            {text(block.text)}
          </FormattedText>
        );
      })}
      <GlossarySheet termId={termId} isOpen={isTermOpen} onClose={() => setIsTermOpen(false)} />
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
  const stepRef = onOpenLesson ? findQuestionStep(question.id) : null;
  const lessonTags = onOpenLesson ? question.tags.filter((tag) => getLessonByTag(tag) && tag !== stepRef?.tag) : [];

  return (
    <View style={styles.container}>
      <AppText variant="label" tone="muted">
        {t('quiz.explanation')}
      </AppText>
      <ExplanationBlocks blocks={question.explanation} />
      {stepRef ? (
        <Button
          title={t('lesson.openStep', { tag: text(TAGS[stepRef.tag].title), step: stepRef.index + 1 })}
          icon="book-outline"
          variant="secondary"
          size="compact"
          onPress={() => onOpenLesson?.(stepRef.tag, stepRef.stepId)}
        />
      ) : null}
      {lessonTags.map((tag) => (
        <Button
          key={tag}
          title={t(isStepLesson(getLessonByTag(tag)) ? 'lesson.openLesson' : 'lesson.open', { tag: text(TAGS[tag].title) })}
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
