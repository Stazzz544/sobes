export { progressModel } from './model/progress-model';
export { applyAnswer, MISTAKE_RESOLVE_STREAK } from './lib/apply-answer';
export { isDueForReview, REVIEW_INTERVAL_DAYS } from './lib/review';
export { getBestStreak, getGoalProgress } from './lib/goal-streak';
export { isLessonTestPassed, TEST_PASS_RATIO } from './lib/learning';
export type { GoalProgress } from './lib/goal-streak';
export type {
  AnswerRecord,
  AnswerResult,
  LearningProgress,
  LessonRecord,
  QuestionStat,
  QuestionStats,
  TestFinished,
  TestRecord,
} from './model/types';
