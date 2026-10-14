import { QUESTIONS, TOPIC_PATHS } from '@app/entities/question';
import type { QuestionStat, QuestionStats } from '@app/entities/progress';
import type { TagId } from '@app/entities/question';
import type { TopicId } from '@app/shared/config';

export const UNIT_DONE_RATIO = 0.8;

export type UnitStatus = 'new' | 'started' | 'done';

export type UnitProgress = {
  tag: TagId;
  total: number;
  answered: number;
  correct: number;
  status: UnitStatus;
};

export type PathProgress = {
  units: UnitProgress[];
  doneCount: number;
  nextTag: TagId | null;
};

const getStatus = (total: number, answered: number, correct: number): UnitStatus => {
  if (answered === 0) {
    return 'new';
  }
  if (answered === total && correct >= total * UNIT_DONE_RATIO) {
    return 'done';
  }
  return 'started';
};

export const getPathProgress = (topic: TopicId, stats: QuestionStats): PathProgress => {
  const units = TOPIC_PATHS[topic].map((tag): UnitProgress => {
    const tagStats = QUESTIONS.filter((question) => question.tags.includes(tag)).map((question) => stats[question.id]);
    const answeredStats = tagStats.filter((stat): stat is QuestionStat => stat !== undefined);
    const correct = answeredStats.filter((stat) => stat.lastResult === 'correct').length;
    return {
      tag,
      total: tagStats.length,
      answered: answeredStats.length,
      correct,
      status: getStatus(tagStats.length, answeredStats.length, correct),
    };
  });
  return {
    units,
    doneCount: units.filter((unit) => unit.status === 'done').length,
    nextTag: units.find((unit) => unit.status !== 'done')?.tag ?? null,
  };
};
