import { JSX, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUnit } from 'effector-react';
import { progressModel, TEST_PASS_RATIO } from '@app/entities/progress';
import { ExplanationBlocks, getLessonTestIds, getQuestions, getStepIndex, SourceList, TAGS } from '@app/entities/question';
import { SCREEN_PADDING } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, Card, FormattedText, ProgressBar } from '@app/shared/ui';
import type { LessonRecord } from '@app/entities/progress';
import type { StepLesson, TagId } from '@app/entities/question';

type LessonStepperProps = {
  lesson: StepLesson;
  initialStepId: string | null;
  isFromTest: boolean;
  onStartTest: (tag: TagId) => void;
  onPractice: (tag: TagId) => void;
  onBackToTest: () => void;
};

type FinalScreenProps = {
  lesson: StepLesson;
  record: LessonRecord | undefined;
  isFromTest: boolean;
  onStartTest: (tag: TagId) => void;
  onPractice: (tag: TagId) => void;
  onBackToTest: () => void;
};

const getInitialIndex = (lesson: StepLesson, initialStepId: string | null, record: LessonRecord | undefined): number => {
  const requested = initialStepId ? getStepIndex(lesson, initialStepId) : -1;
  if (requested >= 0) {
    return requested;
  }
  if (record?.lastStep && !record.finishedAt) {
    return Math.max(getStepIndex(lesson, record.lastStep), 0);
  }
  return 0;
};

const FinalScreen = ({ lesson, record, isFromTest, onStartTest, onPractice, onBackToTest }: FinalScreenProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text, plural } = useI18n();
  const testSize = getLessonTestIds(lesson).length;
  const practiceCount = getQuestions().filter((question) => question.tags.includes(lesson.tag)).length;
  const test = record?.test ?? null;
  const target = Math.round(TEST_PASS_RATIO * 100);

  const getTestStatus = (): string | null => {
    if (!test) {
      return null;
    }
    if (test.passedAt) {
      return t('lesson.testPassed', { percent: Math.round(test.bestRatio * 100) });
    }
    return t('lesson.testBest', { percent: Math.round(test.bestRatio * 100), target });
  };
  const testStatus = getTestStatus();

  return (
    <>
      <AppText variant="title">{t('lesson.finalTitle')}</AppText>
      <Card style={styles.keyPoints}>
        <AppText variant="label" tone="muted">
          {t('lesson.keyPoints')}
        </AppText>
        {lesson.keyPoints.map((point, index) => (
          <View key={index} style={styles.point}>
            <AppText tone="accent">•</AppText>
            <View style={styles.grow}>
              <FormattedText>{text(point)}</FormattedText>
            </View>
          </View>
        ))}
      </Card>
      {testStatus ? (
        <AppText variant="bodyStrong" style={{ color: test?.passedAt ? colors.success : colors.textSecondary }}>
          {testStatus}
        </AppText>
      ) : null}
      {isFromTest ? (
        <Button title={t('lesson.backToTest')} icon="arrow-undo-outline" onPress={onBackToTest} />
      ) : null}
      {!isFromTest && testSize > 0 ? (
        <Button
          title={t(test ? 'lesson.retakeTest' : 'lesson.startTest', { count: plural('question', testSize) })}
          icon="checkbox-outline"
          onPress={() => onStartTest(lesson.tag)}
        />
      ) : null}
      {practiceCount > 0 ? (
        <Button
          title={t('lesson.practice', { count: plural('question', practiceCount) })}
          icon="school-outline"
          variant="secondary"
          onPress={() => onPractice(lesson.tag)}
        />
      ) : null}
      <View style={styles.sources}>
        <SourceList sources={lesson.sources} />
      </View>
    </>
  );
};

export const LessonStepper = ({
  lesson,
  initialStepId,
  isFromTest,
  onStartTest,
  onPractice,
  onBackToTest,
}: LessonStepperProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const { learning } = useUnit({ learning: progressModel.$learning });
  const record = learning.lessons[lesson.tag];
  const [index, setIndex] = useState(() => getInitialIndex(lesson, initialStepId, record));
  const total = lesson.steps.length;
  const step = lesson.steps[index];
  const isFinal = index >= total;

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    const current = lesson.steps[index];
    if (current) {
      progressModel.lessonStepViewed({ tag: lesson.tag, stepId: current.id });
    } else {
      progressModel.lessonFinished({ tag: lesson.tag, at: Date.now() });
    }
  }, [index, lesson]);

  const goTo = (next: number): void => setIndex(Math.min(Math.max(next, 0), total));
  const stepLabel = isFinal ? t('lesson.finalTitle') : t('lesson.stepOf', { current: index + 1, total });

  return (
    <View style={[styles.fill, { backgroundColor: colors.bgPrimary }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerRow}>
          <AppText variant="bodyStrong" numberOfLines={1} style={styles.grow}>
            {text(TAGS[lesson.tag].title)}
          </AppText>
          <AppText variant="caption" tone="secondary">
            {stepLabel}
          </AppText>
        </View>
        <ProgressBar value={Math.min(index + 1, total) / total} height={6} accessibilityLabel={stepLabel} />
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.content}>
        <Animated.View key={index} entering={FadeIn.duration(220)} style={styles.stepBody}>
          {step ? (
            <>
              {index === 0 ? <AppText tone="secondary">{text(lesson.summary)}</AppText> : null}
              <AppText variant="title">{text(step.title)}</AppText>
              <ExplanationBlocks blocks={step.blocks} />
            </>
          ) : (
            <FinalScreen
              lesson={lesson}
              record={record}
              isFromTest={isFromTest}
              onStartTest={onStartTest}
              onPractice={onPractice}
              onBackToTest={onBackToTest}
            />
          )}
        </Animated.View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { backgroundColor: colors.bgPrimary, borderTopColor: colors.border, paddingBottom: insets.bottom + 12 },
        ]}
      >
        <Button
          title={t('common.back')}
          icon="arrow-back"
          variant="ghost"
          disabled={index === 0}
          onPress={() => goTo(index - 1)}
          style={styles.grow}
        />
        {isFinal ? null : (
          <Button title={t('common.next')} icon="arrow-forward" onPress={() => goTo(index + 1)} style={styles.grow} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  content: {
    padding: SCREEN_PADDING,
    paddingBottom: SCREEN_PADDING * 2,
    gap: 16,
  },
  stepBody: {
    gap: 16,
  },
  keyPoints: {
    gap: 10,
  },
  point: {
    flexDirection: 'row',
    gap: 10,
  },
  grow: {
    flex: 1,
    minWidth: 0,
  },
  sources: {
    gap: 12,
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
