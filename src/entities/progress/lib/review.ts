import { addDays, startOfDay } from '@app/shared/lib';
import type { AnswerResult, QuestionStat } from '../model/types';

export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 16, 35] as const;

export type ReviewState = Pick<QuestionStat, 'reviewStep' | 'dueAt'>;

export type StoredQuestionStat = Omit<QuestionStat, keyof ReviewState> & Partial<ReviewState>;

const scheduleStep = (step: number, at: number): ReviewState => ({
  reviewStep: step,
  dueAt: addDays(startOfDay(at), REVIEW_INTERVAL_DAYS[step] ?? REVIEW_INTERVAL_DAYS[0]),
});

export const getReviewState = (previous: QuestionStat | undefined, result: AnswerResult, at: number): ReviewState => {
  if (!previous || result !== 'correct') {
    return scheduleStep(0, at);
  }
  if (at < previous.dueAt) {
    return { reviewStep: previous.reviewStep, dueAt: previous.dueAt };
  }
  return scheduleStep(Math.min(previous.reviewStep + 1, REVIEW_INTERVAL_DAYS.length - 1), at);
};

export const isDueForReview = (stat: QuestionStat | undefined, now: number): boolean =>
  stat !== undefined && stat.dueAt <= now;

export const withReviewState = (stat: StoredQuestionStat): QuestionStat => ({
  ...stat,
  ...(stat.dueAt === undefined ? scheduleStep(0, stat.lastAnsweredAt) : { reviewStep: stat.reviewStep ?? 0, dueAt: stat.dueAt }),
});
