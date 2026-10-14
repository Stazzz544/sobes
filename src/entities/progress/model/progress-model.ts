import { createEffect, createEvent, createStore, sample } from 'effector';
import { trackEventFx } from '@app/shared/analytics';
import { STORAGE_KEYS } from '@app/shared/config';
import { storage } from '@app/shared/lib';
import { applyAnswer } from '../lib/apply-answer';
import { withReviewState } from '../lib/review';
import type { AnalyticsEvent } from '@app/shared/analytics';
import type { StoredQuestionStat } from '../lib/review';
import type { AnswerRecord, QuestionStats } from './types';

const MAX_LOG_LENGTH = 3000;

type AppliedRecord = {
  record: AnswerRecord;
  stats: QuestionStats;
  resolvedMistake: boolean;
};

type LoadedProgress = {
  stats: QuestionStats;
  log: AnswerRecord[];
};

const progressLoaded = createEvent();
const answerRecorded = createEvent<AnswerRecord>();
const progressReset = createEvent();
const mistakeResolved = createEvent<string>();
const answerApplied = createEvent<AppliedRecord>();

const $questionStats = createStore<QuestionStats>({});
const $answerLog = createStore<AnswerRecord[]>([]);
const $isLoaded = createStore(false);

const loadProgressFx = createEffect(async (): Promise<LoadedProgress> => {
  const [stats, log] = await Promise.all([
    storage.get<Record<string, StoredQuestionStat>>(STORAGE_KEYS.QUESTION_STATS),
    storage.get<AnswerRecord[]>(STORAGE_KEYS.ANSWER_LOG),
  ]);
  const migratedStats = Object.fromEntries(Object.entries(stats ?? {}).map(([id, stat]) => [id, withReviewState(stat)]));
  return { stats: migratedStats, log: log ?? [] };
});

const saveStatsFx = createEffect(async (stats: QuestionStats) => storage.set(STORAGE_KEYS.QUESTION_STATS, stats));
const saveLogFx = createEffect(async (log: AnswerRecord[]) => storage.set(STORAGE_KEYS.ANSWER_LOG, log));

const $mistakeIds = $questionStats.map((stats) =>
  Object.entries(stats)
    .filter(([, stat]) => stat.inMistakes)
    .sort(([, first], [, second]) => second.lastAnsweredAt - first.lastAnsweredAt)
    .map(([questionId]) => questionId),
);

sample({ clock: progressLoaded, target: loadProgressFx });
sample({ clock: loadProgressFx.doneData, fn: (progress) => progress.stats, target: $questionStats });
sample({ clock: loadProgressFx.doneData, fn: (progress) => progress.log, target: $answerLog });
sample({ clock: loadProgressFx.finally, fn: () => true, target: $isLoaded });

sample({
  clock: answerRecorded,
  source: $questionStats,
  fn: (stats, record): AppliedRecord => {
    const applied = applyAnswer(stats[record.questionId], record.result, record.at);
    return {
      record,
      stats: { ...stats, [record.questionId]: applied.stat },
      resolvedMistake: applied.resolvedMistake,
    };
  },
  target: answerApplied,
});
sample({ clock: answerApplied, fn: (applied) => applied.stats, target: $questionStats });
sample({
  clock: answerApplied,
  source: $answerLog,
  fn: (log, applied) => [...log, applied.record].slice(-MAX_LOG_LENGTH),
  target: $answerLog,
});
sample({
  clock: answerApplied,
  filter: (applied) => applied.resolvedMistake,
  fn: (applied) => applied.record.questionId,
  target: mistakeResolved,
});
sample({
  clock: mistakeResolved,
  fn: (questionId): AnalyticsEvent => ({ name: 'mistake_resolved', params: { question_id: questionId } }),
  target: trackEventFx,
});

sample({ clock: progressReset, fn: (): QuestionStats => ({}), target: $questionStats });
sample({ clock: progressReset, fn: (): AnswerRecord[] => [], target: $answerLog });

sample({ clock: $questionStats.updates, target: saveStatsFx });
sample({ clock: $answerLog.updates, target: saveLogFx });

export const progressModel = {
  $questionStats,
  $answerLog,
  $mistakeIds,
  $isLoaded,
  progressLoaded,
  answerRecorded,
  progressReset,
  mistakeResolved,
};
