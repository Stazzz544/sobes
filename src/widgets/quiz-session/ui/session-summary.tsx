import { JSX } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LESSONS_BY_TAG, QUESTIONS_BY_ID, TAGS } from '@app/entities/question';
import { MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { toPlainText } from '@app/shared/lib';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, Card, Pill, ProgressBar, Screen } from '@app/shared/ui';
import type { AnswerResult } from '@app/entities/progress';
import type { TagId } from '@app/entities/question';
import type { ThemeColors } from '@app/shared/theme';
import type { IconName } from '@app/shared/ui';
import type { SessionAnswer, SessionSummary as Summary } from '../model/quiz-session-model';

type SessionSummaryProps = {
  summary: Summary;
  queue: string[];
  answers: SessionAnswer[];
  onOpenQuestion: (questionId: string) => void;
  onOpenLesson: (tag: TagId) => void;
  onRestart: () => void;
  onDone: () => void;
};

const MAX_LESSON_LINKS = 3;

const RESULT_LABEL_KEY = {
  correct: 'quiz.summaryCorrect',
  wrong: 'quiz.summaryWrong',
  dontKnow: 'quiz.summaryDontKnow',
} as const;

const getResultIcon = (result: AnswerResult | null, colors: ThemeColors): { name: IconName; color: string } => {
  if (result === 'correct') {
    return { name: 'checkmark-circle', color: colors.success };
  }
  if (result === 'wrong') {
    return { name: 'close-circle', color: colors.danger };
  }
  if (result === 'dontKnow') {
    return { name: 'help-circle', color: colors.warning };
  }
  return { name: 'remove-circle-outline', color: colors.textMuted };
};

export const SessionSummary = ({
  summary,
  queue,
  answers,
  onOpenQuestion,
  onOpenLesson,
  onRestart,
  onDone,
}: SessionSummaryProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text, plural } = useI18n();
  const ratio = summary.total > 0 ? summary.correct / summary.total : 0;
  const missedTags = queue
    .filter((questionId) => answers.find((answer) => answer.questionId === questionId)?.result !== 'correct')
    .flatMap((questionId) => QUESTIONS_BY_ID[questionId]?.tags ?? []);
  const lessonTags = [...new Set(missedTags)].filter((tag) => LESSONS_BY_TAG[tag]).slice(0, MAX_LESSON_LINKS);

  return (
    <Screen withBottomInset>
      <Animated.View entering={FadeIn.duration(300)}>
        <Card style={styles.hero}>
          <AppText variant="label" tone="muted">
            {t('quiz.summaryTitle')}
          </AppText>
          <AppText variant="display" tone="accent">
            {`${Math.round(ratio * 100)}%`}
          </AppText>
          <AppText tone="secondary">
            {t('quiz.summaryScore', { correct: summary.correct, total: plural('question', summary.total) })}
          </AppText>
          <ProgressBar value={ratio} color={colors.success} accessibilityLabel={t('quiz.summaryTitle')} />
          <View style={styles.pills}>
            <Pill label={`${t('quiz.summaryCorrect')} ${summary.correct}`} icon="checkmark" />
            <Pill label={`${t('quiz.summaryWrong')} ${summary.wrong}`} icon="close" />
            <Pill label={`${t('quiz.summaryDontKnow')} ${summary.dontKnow}`} icon="help" />
          </View>
          {summary.level ? (
            <View style={[styles.level, { backgroundColor: colors.accentSoft }]}>
              <AppText variant="bodyStrong" tone="accent">
                {t(`quiz.level.${summary.level}`)}
              </AppText>
              <AppText variant="caption" tone="secondary">
                {t('quiz.levelHint')}
              </AppText>
            </View>
          ) : null}
        </Card>
      </Animated.View>

      <AppText variant="label" tone="muted">
        {t('quiz.reviewTitle')}
      </AppText>
      <View style={styles.list}>
        {queue.map((questionId, index) => {
          const question = QUESTIONS_BY_ID[questionId];
          if (!question) {
            return null;
          }
          const answer = answers.find((item) => item.questionId === questionId);
          const icon = getResultIcon(answer?.result ?? null, colors);
          return (
            <Pressable
              key={questionId}
              onPress={() => onOpenQuestion(questionId)}
              accessibilityRole="button"
              accessibilityLabel={`${answer ? t(RESULT_LABEL_KEY[answer.result]) : t('quiz.notAnswered')}. ${index + 1}. ${toPlainText(text(question.prompt))}`}
              style={({ pressed }) => [
                styles.row,
                { backgroundColor: colors.bgCard, borderColor: colors.border },
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name={icon.name} size={22} color={icon.color} />
              <View style={styles.rowText}>
                <AppText numberOfLines={2}>{`${index + 1}. ${toPlainText(text(question.prompt))}`}</AppText>
                <AppText variant="caption" tone="muted">
                  {question.tags.map((tag) => text(TAGS[tag].title)).join(' · ')}
                </AppText>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
          );
        })}
      </View>

      {lessonTags.length > 0 ? (
        <View style={styles.list}>
          <AppText variant="label" tone="muted">
            {t('quiz.lessonsTitle')}
          </AppText>
          {lessonTags.map((tag) => (
            <Button
              key={tag}
              title={t('lesson.open', { tag: text(TAGS[tag].title) })}
              icon="book-outline"
              variant="secondary"
              size="compact"
              onPress={() => onOpenLesson(tag)}
            />
          ))}
        </View>
      ) : null}

      <View style={styles.actions}>
        <Button title={t('quiz.again')} icon="refresh" onPress={onRestart} />
        <Button title={t('common.done')} variant="ghost" onPress={onDone} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  hero: {
    gap: 10,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  level: {
    borderRadius: 12,
    padding: 12,
    gap: 2,
  },
  list: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: MIN_TOUCH_SIZE + 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  pressed: {
    opacity: 0.8,
  },
  actions: {
    gap: 10,
  },
});
