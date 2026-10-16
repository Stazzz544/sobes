import { getBestStreak } from '@app/entities/progress';
import { getQuestions } from '@app/entities/question';
import { getPathProgress } from '@app/features/learning-path';
import { TOPIC_IDS } from '@app/shared/config';
import type { AnswerRecord, LearningProgress, QuestionStats } from '@app/entities/progress';
import type { IconName } from '@app/shared/ui';

export type AchievementId =
  | 'first-steps'
  | 'answers-100'
  | 'answers-500'
  | 'streak-7'
  | 'streak-30'
  | 'first-unit'
  | 'full-path'
  | 'all-topics'
  | 'mistakes-fixed'
  | 'long-memory';

export type Achievement = {
  id: AchievementId;
  icon: IconName;
  current: number;
  target: number;
};

type AchievementInput = {
  stats: QuestionStats;
  log: AnswerRecord[];
  learning: LearningProgress;
  dailyGoal: number;
  now: number;
};

const REVIEW_STEP_FOR_MEMORY = 2;

export const getAchievements = ({ stats, log, learning, dailyGoal, now }: AchievementInput): Achievement[] => {
  const statList = Object.values(stats);
  const answers = statList.reduce((sum, stat) => sum + stat.attempts, 0);
  const bestStreak = getBestStreak(log, dailyGoal, now);
  const paths = TOPIC_IDS.map((topic) => getPathProgress(topic, stats, learning));
  const doneUnits = paths.reduce((sum, path) => sum + path.doneCount, 0);
  const donePaths = paths.filter((path) => path.doneCount === path.units.length).length;
  const touchedTopics = TOPIC_IDS.filter((topic) =>
    getQuestions().some((question) => question.topic === topic && stats[question.id] !== undefined),
  ).length;
  const fixedMistakes = statList.filter((stat) => stat.wrong + stat.dontKnow > 0 && !stat.inMistakes).length;
  const remembered = statList.filter((stat) => stat.reviewStep >= REVIEW_STEP_FOR_MEMORY).length;

  return [
    { id: 'first-steps', icon: 'footsteps-outline', current: answers, target: 1 },
    { id: 'answers-100', icon: 'ribbon-outline', current: answers, target: 100 },
    { id: 'answers-500', icon: 'trophy-outline', current: answers, target: 500 },
    { id: 'streak-7', icon: 'flame-outline', current: bestStreak, target: 7 },
    { id: 'streak-30', icon: 'bonfire-outline', current: bestStreak, target: 30 },
    { id: 'first-unit', icon: 'map-outline', current: doneUnits, target: 1 },
    { id: 'full-path', icon: 'flag-outline', current: donePaths, target: 1 },
    { id: 'all-topics', icon: 'planet-outline', current: touchedTopics, target: TOPIC_IDS.length },
    { id: 'mistakes-fixed', icon: 'construct-outline', current: fixedMistakes, target: 10 },
    { id: 'long-memory', icon: 'bulb-outline', current: remembered, target: 10 },
  ];
};
