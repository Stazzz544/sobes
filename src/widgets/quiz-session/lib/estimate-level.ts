import type { Difficulty } from '@app/entities/question';

export type InterviewLevel = 'senior' | 'middle' | 'junior' | 'beginner';

type ScoredAnswer = {
  difficulty: Difficulty;
  isCorrect: boolean;
};

export const estimateLevel = (answers: ScoredAnswer[], totalQuestions: Difficulty[]): InterviewLevel => {
  const maxScore = totalQuestions.reduce<number>((sum, difficulty) => sum + difficulty, 0);
  const score = answers.reduce<number>((sum, answer) => sum + (answer.isCorrect ? answer.difficulty : 0), 0);
  const ratio = maxScore > 0 ? score / maxScore : 0;
  if (ratio >= 0.8) {
    return 'senior';
  }
  if (ratio >= 0.6) {
    return 'middle';
  }
  if (ratio >= 0.4) {
    return 'junior';
  }
  return 'beginner';
};
