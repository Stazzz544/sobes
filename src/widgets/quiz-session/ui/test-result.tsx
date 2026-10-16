import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TEST_PASS_RATIO } from '@app/entities/progress';
import { findQuestionStep, getCourse, TAGS, TOPIC_PATHS } from '@app/entities/question';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Button } from '@app/shared/ui';
import type { QuestionStepRef, TagId } from '@app/entities/question';
import type { TopicId, TopicSelection } from '@app/shared/config';
import type { SessionAnswer, SessionSummary } from '../model/quiz-session-model';

type TestResultProps = {
  isCourse: boolean;
  topic: TopicSelection;
  tag: TagId | null;
  summary: SessionSummary;
  queue: string[];
  answers: SessionAnswer[];
  onOpenLesson: (tag: TagId, stepId?: string) => void;
  onNextLesson: (tag: TagId) => void;
  onCourseTest: (topic: TopicId) => void;
  onOpenPath: (topic: TopicId) => void;
  onRestart: () => void;
};

type LessonScore = {
  tag: TagId;
  correct: number;
  total: number;
};

const getStepsToReread = (queue: string[], answers: SessionAnswer[]): QuestionStepRef[] => {
  const refs = queue
    .filter((questionId) => answers.find((answer) => answer.questionId === questionId)?.result !== 'correct')
    .map((questionId) => findQuestionStep(questionId))
    .filter((ref): ref is QuestionStepRef => ref !== null);
  const getLessonIndex = (tag: TagId): number => TOPIC_PATHS[TAGS[tag].topic].indexOf(tag);
  return refs
    .filter((ref, index) => refs.findIndex((other) => other.tag === ref.tag && other.stepId === ref.stepId) === index)
    .sort((first, second) => getLessonIndex(first.tag) - getLessonIndex(second.tag) || first.index - second.index);
};

const getLessonScores = (topic: TopicId, answers: SessionAnswer[]): LessonScore[] => {
  const final = getCourse(topic)?.final ?? [];
  return TOPIC_PATHS[topic]
    .map((tag) => {
      const items = final.filter((item) => item.tag === tag);
      return {
        tag,
        total: items.length,
        correct: items.filter(
          (item) => answers.find((answer) => answer.questionId === item.question)?.result === 'correct',
        ).length,
      };
    })
    .filter((score) => score.total > 0);
};

export const TestResult = ({
  isCourse,
  topic,
  tag,
  summary,
  queue,
  answers,
  onOpenLesson,
  onNextLesson,
  onCourseTest,
  onOpenPath,
  onRestart,
}: TestResultProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const isPassed = summary.total > 0 && summary.correct / summary.total >= TEST_PASS_RATIO;
  const courseTopic = topic === 'all' ? null : topic;
  const pathTags = courseTopic ? TOPIC_PATHS[courseTopic] : [];
  const nextTag = tag ? (pathTags[pathTags.indexOf(tag) + 1] ?? null) : null;
  const hasCourseTest = courseTopic ? Boolean(getCourse(courseTopic)) : false;
  const steps = getStepsToReread(queue, answers);
  const passedTitle = isCourse ? t('quiz.test.coursePassed') : t('quiz.test.lessonPassed');

  return (
    <View style={styles.container}>
      <View style={[styles.verdict, { backgroundColor: isPassed ? colors.successSoft : colors.warningSoft }]}>
        <Ionicons
          name={isPassed ? 'trophy-outline' : 'reload-outline'}
          size={24}
          color={isPassed ? colors.success : colors.textPrimary}
        />
        <AppText variant="bodyStrong" style={styles.grow}>
          {isPassed ? passedTitle : t('quiz.test.failed', { percent: Math.round(TEST_PASS_RATIO * 100) })}
        </AppText>
      </View>

      {isCourse && courseTopic ? (
        <View style={styles.section}>
          <AppText variant="label" tone="muted">
            {t('quiz.test.byLesson')}
          </AppText>
          {getLessonScores(courseTopic, answers).map((score) => (
            <View key={score.tag} style={styles.scoreRow}>
              <AppText style={styles.grow} numberOfLines={1}>
                {text(TAGS[score.tag].title)}
              </AppText>
              <AppText variant="bodyStrong" tone={score.correct === score.total ? 'success' : 'secondary'}>
                {t('quiz.test.lessonScore', { correct: score.correct, total: score.total })}
              </AppText>
            </View>
          ))}
        </View>
      ) : null}

      {steps.length > 0 ? (
        <View style={styles.section}>
          <AppText variant="label" tone="muted">
            {t('quiz.test.reread')}
          </AppText>
          {steps.map((step) => (
            <Button
              key={`${step.tag}:${step.stepId}`}
              title={
                isCourse
                  ? t('quiz.test.rereadLessonStep', { tag: text(TAGS[step.tag].title), step: step.index + 1 })
                  : t('quiz.test.rereadStep', { step: step.index + 1, title: text(step.title) })
              }
              icon="book-outline"
              variant="secondary"
              size="compact"
              onPress={() => onOpenLesson(step.tag, step.stepId)}
            />
          ))}
        </View>
      ) : null}

      {isPassed ? null : <Button title={t('quiz.again')} icon="refresh" onPress={onRestart} />}
      {isPassed && !isCourse && nextTag ? (
        <Button
          title={t('quiz.test.nextLesson', { tag: text(TAGS[nextTag].title) })}
          icon="arrow-forward"
          onPress={() => onNextLesson(nextTag)}
        />
      ) : null}
      {isPassed && !isCourse && !nextTag && courseTopic && hasCourseTest ? (
        <Button title={t('quiz.test.courseTest')} icon="flag-outline" onPress={() => onCourseTest(courseTopic)} />
      ) : null}
      {courseTopic ? (
        <Button title={t('quiz.test.toCourse')} icon="map-outline" variant="secondary" onPress={() => onOpenPath(courseTopic)} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  verdict: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    padding: 12,
  },
  grow: {
    flex: 1,
    minWidth: 0,
  },
  section: {
    gap: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
