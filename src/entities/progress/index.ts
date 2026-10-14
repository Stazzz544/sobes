export { progressModel } from './model/progress-model';
export { applyAnswer, MISTAKE_RESOLVE_STREAK } from './lib/apply-answer';
export { isDueForReview, REVIEW_INTERVAL_DAYS } from './lib/review';
export { getBestStreak, getGoalProgress } from './lib/goal-streak';
export type { GoalProgress } from './lib/goal-streak';
export type { AnswerRecord, AnswerResult, QuestionStat, QuestionStats } from './model/types';
