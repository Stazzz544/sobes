import { shuffle } from '@app/shared/lib';
import type { Question, QuizMode, TagId } from '@app/entities/question';
import type { QuestionStat, QuestionStats } from '@app/entities/progress';
import type { TopicSelection } from '@app/shared/config';
import type { RandomSource } from '@app/shared/lib';

export const INTERVIEW_LENGTH = 15;

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

const pickInterview = (pool: Question[], random: RandomSource): Question[] => {
  const byDifficulty = [1, 2, 3].map((difficulty) =>
    shuffle(
      pool.filter((question) => question.difficulty === difficulty),
      random,
    ),
  );
  const picked: Question[] = [];
  while (picked.length < INTERVIEW_LENGTH && byDifficulty.some((group) => group.length > 0)) {
    for (const group of byDifficulty) {
      const next = group.shift();
      if (next && picked.length < INTERVIEW_LENGTH) {
        picked.push(next);
      }
    }
  }
  return shuffle(picked, random);
};

const filterByMode = (pool: Question[], mode: QuizMode, stats: QuestionStats): Question[] => {
  if (mode === 'popular') {
    return pool.filter((question) => question.popular);
  }
  if (mode === 'hard') {
    return pool.filter((question) => question.difficulty === 3);
  }
  if (mode === 'mistakes') {
    return pool.filter((question) => stats[question.id]?.inMistakes);
  }
  return pool;
};

export const buildQueue = (
  questions: Question[],
  stats: QuestionStats,
  params: SessionParams,
  sessionLength: number,
  random: RandomSource,
): string[] => {
  const pool = questions.filter(
    (question) =>
      (params.topic === 'all' || question.topic === params.topic) &&
      (params.tag === null || question.tags.includes(params.tag)),
  );
  if (params.mode === 'interview') {
    return pickInterview(pool, random).map((question) => question.id);
  }
  const filtered = filterByMode(pool, params.mode, stats);
  const ordered = params.mode === 'mistakes' ? shuffle(filtered, random) : prioritize(filtered, stats, random);
  return ordered.slice(0, sessionLength).map((question) => question.id);
};
