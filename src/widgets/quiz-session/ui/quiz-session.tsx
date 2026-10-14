import { JSX, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUnit } from 'effector-react';
import { ExplanationView, OPTION_IDS, QuestionView, isChoiceQuestion, isResponseComplete } from '@app/entities/question';
import { AskAiButton } from '@app/features/ask-ai';
import { ReportQuestionButton } from '@app/features/report-question';
import { SCREEN_PADDING } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useKeyboardHeight } from '@app/shared/lib';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, EmptyState, ProgressBar } from '@app/shared/ui';
import { quizSessionModel } from '../model/quiz-session-model';
import { AnswerArea } from './answer-area';
import { AnswerFeedback } from './answer-feedback';
import { SessionSummary } from './session-summary';
import type { TagId } from '@app/entities/question';
import type { TopicId } from '@app/shared/config';
import type { SessionParams } from '../lib/build-queue';

type QuizSessionProps = {
  params: SessionParams;
  onOpenQuestion: (questionId: string) => void;
  onOpenLesson: (tag: TagId) => void;
  onOpenPath: (topic: TopicId) => void;
  onDone: () => void;
};

const formatSeconds = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const QuizSession = ({ params, onOpenQuestion, onOpenLesson, onOpenPath, onDone }: QuizSessionProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const scrollRef = useRef<ScrollView>(null);
  const feedbackOffset = useRef(0);
  const model = useUnit({
    phase: quizSessionModel.$phase,
    queue: quizSessionModel.$queue,
    index: quizSessionModel.$index,
    question: quizSessionModel.$currentQuestion,
    currentAnswer: quizSessionModel.$currentAnswer,
    draft: quizSessionModel.$draft,
    optionOrder: quizSessionModel.$optionOrder,
    itemOrder: quizSessionModel.$itemOrder,
    answers: quizSessionModel.$answers,
    summary: quizSessionModel.$summary,
    isInterview: quizSessionModel.$isInterview,
    isLast: quizSessionModel.$isLast,
    remainingSeconds: quizSessionModel.$remainingSeconds,
    onSelect: quizSessionModel.optionSelected,
    onDraftChange: quizSessionModel.draftChanged,
    onConfirm: quizSessionModel.answerConfirmed,
    onDontKnow: quizSessionModel.dontKnowPressed,
    onNext: quizSessionModel.nextPressed,
  });
  const { mode, topic, tag } = params;

  useEffect(() => {
    quizSessionModel.sessionStarted({ mode, topic, tag });
    return () => quizSessionModel.sessionClosed();
  }, [mode, topic, tag]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [model.index]);

  const isRevealed = model.phase === 'revealed';

  useEffect(() => {
    if (keyboardHeight > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [keyboardHeight]);

  useEffect(() => {
    if (isRevealed) {
      const timeout = setTimeout(
        () => scrollRef.current?.scrollTo({ y: Math.max(feedbackOffset.current - SCREEN_PADDING, 0), animated: true }),
        120,
      );
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [isRevealed]);

  if (model.phase === 'idle') {
    return <View style={[styles.fill, { backgroundColor: colors.bgPrimary }]} />;
  }

  if (model.phase === 'empty') {
    return (
      <View style={[styles.fill, styles.emptyContainer, { backgroundColor: colors.bgPrimary }]}>
        <EmptyState icon="file-tray-outline" title={t('quiz.emptyTitle')} text={t(`quiz.empty.${mode}`)} />
        <Button title={t('common.back')} variant="ghost" onPress={onDone} />
      </View>
    );
  }

  if (model.phase === 'finished' || !model.question) {
    return (
      <SessionSummary
        summary={model.summary}
        queue={model.queue}
        answers={model.answers}
        placementTopic={mode === 'placement' && topic !== 'all' ? topic : null}
        onOpenLesson={onOpenLesson}
        onOpenPath={onOpenPath}
        onOpenQuestion={onOpenQuestion}
        onRestart={() => quizSessionModel.sessionStarted({ mode, topic, tag })}
        onDone={onDone}
      />
    );
  }

  const question = model.question;
  const submitted = model.currentAnswer?.response ?? null;

  return (
    <View style={[styles.fill, { backgroundColor: colors.bgPrimary, paddingBottom: keyboardHeight }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerRow}>
          <AppText variant="bodyStrong" tone="secondary">
            {t('quiz.progress', { current: model.index + 1, total: model.queue.length })}
          </AppText>
          {model.isInterview ? (
            <AppText
              variant="bodyStrong"
              tone={model.remainingSeconds <= 60 ? 'danger' : 'accent'}
              accessibilityLabel={`${t('quiz.timeLeft')}: ${formatSeconds(model.remainingSeconds)}`}
            >
              {formatSeconds(model.remainingSeconds)}
            </AppText>
          ) : null}
        </View>
        <ProgressBar value={(model.index + (isRevealed ? 1 : 0)) / model.queue.length} height={6} />
      </View>

      <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <Animated.View key={question.id} entering={FadeIn.duration(220)} style={styles.questionBlock}>
          <QuestionView question={question} />
          <AnswerArea
            question={question}
            draft={model.draft}
            submitted={submitted}
            result={model.currentAnswer?.result ?? null}
            isRevealed={isRevealed}
            optionOrder={model.optionOrder}
            itemOrder={model.itemOrder}
            onSelectOption={model.onSelect}
            onDraftChange={model.onDraftChange}
          />
        </Animated.View>

        {isRevealed && model.currentAnswer ? (
          <View
            style={styles.reveal}
            onLayout={(event) => {
              feedbackOffset.current = event.nativeEvent.layout.y;
            }}
          >
            <AnswerFeedback
              result={model.currentAnswer.result}
              correct={isChoiceQuestion(question) ? (OPTION_IDS[model.optionOrder.indexOf(question.answer)] ?? question.answer) : undefined}
            />
            <Animated.View entering={FadeIn.delay(150).duration(300)} style={styles.reveal}>
              <ExplanationView question={question} onOpenLesson={onOpenLesson} />
              <AskAiButton question={question} response={submitted} />
              <ReportQuestionButton question={question} />
            </Animated.View>
          </View>
        ) : null}
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { backgroundColor: colors.bgPrimary, borderTopColor: colors.border, paddingBottom: (keyboardHeight > 0 ? 0 : insets.bottom) + 12 },
        ]}
      >
        {isRevealed ? (
          <Button
            title={model.isLast ? t('quiz.finish') : t('common.next')}
            icon={model.isLast ? 'flag' : 'arrow-forward'}
            onPress={model.onNext}
            style={styles.grow}
          />
        ) : (
          <>
            <Button title={t('quiz.dontKnow')} variant="ghost" onPress={model.onDontKnow} style={styles.grow} />
            <Button
              title={t('quiz.confirm')}
              icon="checkmark"
              disabled={!isResponseComplete(question, model.draft)}
              onPress={model.onConfirm}
              style={styles.grow}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  emptyContainer: {
    padding: SCREEN_PADDING,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    padding: SCREEN_PADDING,
    paddingBottom: SCREEN_PADDING * 2,
    gap: 16,
  },
  questionBlock: {
    gap: 16,
  },
  reveal: {
    gap: 14,
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  grow: {
    flex: 1,
  },
});
