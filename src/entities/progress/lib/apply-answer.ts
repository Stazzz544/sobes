import { getReviewState } from './review';
import type { AnswerResult, QuestionStat } from '../model/types';

export const MISTAKE_RESOLVE_STREAK = 2;

export type AppliedAnswer = {
  stat: QuestionStat;
  resolvedMistake: boolean;
};

const EMPTY_STAT: QuestionStat = {
  attempts: 0,
  correct: 0,
  wrong: 0,
  dontKnow: 0,
  lastResult: 'correct',
  lastAnsweredAt: 0,
  inMistakes: false,
  mistakeStreak: 0,
  reviewStep: 0,
  dueAt: 0,
};

const getMistakeState = (
  previous: QuestionStat,
  result: AnswerResult,
): Pick<QuestionStat, 'inMistakes' | 'mistakeStreak'> => {
  if (result !== 'correct') {
    return { inMistakes: true, mistakeStreak: 0 };
  }
  if (!previous.inMistakes) {
    return { inMistakes: false, mistakeStreak: 0 };
  }
  const streak = previous.mistakeStreak + 1;
  if (streak >= MISTAKE_RESOLVE_STREAK) {
    return { inMistakes: false, mistakeStreak: 0 };
  }
  return { inMistakes: true, mistakeStreak: streak };
};

export const applyAnswer = (previous: QuestionStat | undefined, result: AnswerResult, at: number): AppliedAnswer => {
  const base = previous ?? EMPTY_STAT;
  const mistakeState = getMistakeState(base, result);
  return {
    stat: {
      attempts: base.attempts + 1,
      correct: base.correct + (result === 'correct' ? 1 : 0),
      wrong: base.wrong + (result === 'wrong' ? 1 : 0),
      dontKnow: base.dontKnow + (result === 'dontKnow' ? 1 : 0),
      lastResult: result,
      lastAnsweredAt: at,
      ...mistakeState,
      ...getReviewState(previous, result, at),
    },
    resolvedMistake: base.inMistakes && !mistakeState.inMistakes,
  };
};
