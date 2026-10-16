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
  reviewStep: number;
  dueAt: number;
};

export type QuestionStats = Record<string, QuestionStat>;

export type TestRecord = {
  attempts: number;
  bestRatio: number;
  lastRatio: number;
  passedAt: number | null;
  lastAt: number;
};

export type LessonRecord = {
  seenSteps: string[];
  lastStep: string | null;
  finishedAt: number | null;
  test: TestRecord | null;
};

export type LearningProgress = {
  lessons: Record<string, LessonRecord>;
  courses: Record<string, TestRecord>;
};

export type LessonStepViewed = {
  tag: string;
  stepId: string;
};

export type LessonFinished = {
  tag: string;
  at: number;
};

export type TestFinished = {
  scope: 'lesson' | 'course';
  id: string;
  correct: number;
  total: number;
  at: number;
};
