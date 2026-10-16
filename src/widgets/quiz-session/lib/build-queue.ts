import { isDueForReview } from '@app/entities/progress';
import { getCourse, getCourseTestIds, getLessonByTag, getLessonTestIds, isStepLesson } from '@app/entities/question';
import { shuffle } from '@app/shared/lib';
import type { Question, QuizMode, TagId } from '@app/entities/question';
import type { LearningProgress, QuestionStat, QuestionStats } from '@app/entities/progress';
import type { TopicSelection } from '@app/shared/config';
import type { RandomSource } from '@app/shared/lib';

export const INTERVIEW_LENGTH = 15;
export const PLACEMENT_LENGTH = 9;

export type SessionParams = {
  mode: QuizMode;
  topic: TopicSelection;
  tag: TagId | null;
};

const getAccuracy = (stat: QuestionStat | undefined): number => (stat ? stat.correct / stat.attempts : -1);

const prioritize = (questions: Question[], stats: QuestionStats, random: RandomSource): Question[] =>
  shuffle(questions, random).sort((first, second) => {
    const firstStat = stats[first.id];
    const secondStat = stats[second.id];
    const accuracyDelta = getAccuracy(firstStat) - getAccuracy(secondStat);
    if (accuracyDelta !== 0) {
      return accuracyDelta;
    }
    return (firstStat?.lastAnsweredAt ?? 0) - (secondStat?.lastAnsweredAt ?? 0);
  });

const pickBalanced = (pool: Question[], random: RandomSource, length: number): Question[] => {
  const byDifficulty = [1, 2, 3].map((difficulty) =>
    shuffle(
      pool.filter((question) => question.difficulty === difficulty),
      random,
    ),
  );
  const picked: Question[] = [];
  while (picked.length < length && byDifficulty.some((group) => group.length > 0)) {
    for (const group of byDifficulty) {
      const next = group.shift();
      if (next && picked.length < length) {
        picked.push(next);
      }
    }
  }
  return picked;
};

const filterByMode = (pool: Question[], mode: QuizMode, stats: QuestionStats, now: number): Question[] => {
  if (mode === 'popular') {
    return pool.filter((question) => question.popular);
  }
  if (mode === 'hard') {
    return pool.filter((question) => question.difficulty === 3);
  }
  if (mode === 'mistakes') {
    return pool.filter((question) => stats[question.id]?.inMistakes);
  }
  if (mode === 'review') {
    return pool.filter((question) => isDueForReview(stats[question.id], now));
  }
  return pool;
};

const orderByMode = (questions: Question[], mode: QuizMode, stats: QuestionStats, random: RandomSource): Question[] => {
  if (mode === 'mistakes') {
    return shuffle(questions, random);
  }
  if (mode === 'review') {
    return shuffle(questions, random).sort((first, second) => (stats[first.id]?.dueAt ?? 0) - (stats[second.id]?.dueAt ?? 0));
  }
  return prioritize(questions, stats, random);
};

const getTestQueue = (params: SessionParams, learning: LearningProgress, random: RandomSource): string[] => {
  if (params.mode === 'lesson-test') {
    const lesson = params.tag ? getLessonByTag(params.tag) : undefined;
    const ids = isStepLesson(lesson) ? getLessonTestIds(lesson) : [];
    const isRetake = Boolean(params.tag && learning.lessons[params.tag]?.test);
    return isRetake ? shuffle(ids, random) : ids;
  }
  const course = params.topic === 'all' ? undefined : getCourse(params.topic);
  const ids = course ? getCourseTestIds(course) : [];
  const isRetake = params.topic !== 'all' && Boolean(learning.courses[params.topic]);
  return isRetake ? shuffle(ids, random) : ids;
};

export const buildQueue = (
  questions: readonly Question[],
  stats: QuestionStats,
  learning: LearningProgress,
  params: SessionParams,
  sessionLength: number,
  random: RandomSource,
  now: number,
): string[] => {
  if (params.mode === 'lesson-test' || params.mode === 'course-test') {
    return getTestQueue(params, learning, random);
  }
  const pool = questions.filter(
    (question) =>
      (params.topic === 'all' || question.topic === params.topic) &&
      (params.tag === null || question.tags.includes(params.tag)),
  );
  if (params.mode === 'interview') {
    return shuffle(pickBalanced(pool, random, INTERVIEW_LENGTH), random).map((question) => question.id);
  }
  if (params.mode === 'placement') {
    return pickBalanced(pool, random, PLACEMENT_LENGTH)
      .sort((first, second) => first.difficulty - second.difficulty)
      .map((question) => question.id);
  }
  const filtered = filterByMode(pool, params.mode, stats, now);
  return orderByMode(filtered, params.mode, stats, random)
    .slice(0, sessionLength)
    .map((question) => question.id);
};
