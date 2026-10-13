export type AnswerResult = 'correct' | 'wrong' | 'dontKnow';

export type AnswerRecord = {
  questionId: string;
  result: AnswerResult;
  mode: string;
  at: number;
};

export type QuestionStat = {
  attempts: number;
  correct: number;
  wrong: number;
  dontKnow: number;
  lastResult: AnswerResult;
  lastAnsweredAt: number;
  inMistakes: boolean;
  mistakeStreak: number;
};

export type QuestionStats = Record<string, QuestionStat>;
