import { addDays, startOfDay, toDayKey } from '@app/shared/lib';
import type { AnswerRecord } from '../model/types';

const FREEZE_COOLDOWN_DAYS = 7;

export type GoalProgress = {
  todayCount: number;
  isTodayDone: boolean;
  streakDays: number;
};

const countByDay = (log: AnswerRecord[]): Map<string, number> => {
  const countsByDay = new Map<string, number>();
  log.forEach((record) => {
    const dayKey = toDayKey(record.at);
    countsByDay.set(dayKey, (countsByDay.get(dayKey) ?? 0) + 1);
  });
  return countsByDay;
};

export const getGoalProgress = (log: AnswerRecord[], goal: number, now: number): GoalProgress => {
  const countsByDay = countByDay(log);
  const isDone = (timestamp: number): boolean => (countsByDay.get(toDayKey(timestamp)) ?? 0) >= goal;

  const todayCount = countsByDay.get(toDayKey(now)) ?? 0;
  const isTodayDone = todayCount >= goal;
  const firstDay = startOfDay(Math.min(now, ...log.map((record) => record.at)));
  let streakDays = isTodayDone ? 1 : 0;
  let lastFreezeOffset: number | null = null;
  // сегодня ещё не закончилось, поэтому серия считается со вчера, а незакрытое «сегодня» её не обрывает
  for (let offset = 1, cursor = addDays(now, -1); cursor >= firstDay; offset += 1, cursor = addDays(cursor, -1)) {
    if (isDone(cursor)) {
      streakDays += 1;
      continue;
    }
    if (lastFreezeOffset !== null && offset - lastFreezeOffset < FREEZE_COOLDOWN_DAYS) {
      break;
    }
    lastFreezeOffset = offset;
  }
  return { todayCount, isTodayDone, streakDays };
};

export const getBestStreak = (log: AnswerRecord[], goal: number, now: number): number => {
  if (log.length === 0) {
    return 0;
  }
  const countsByDay = countByDay(log);
  const today = startOfDay(now);
  let best = 0;
  let run = 0;
  let lastFreezeIndex: number | null = null;
  let dayIndex = 0;
  for (let cursor = startOfDay(Math.min(...log.map((record) => record.at))); cursor <= today; cursor = addDays(cursor, 1)) {
    if ((countsByDay.get(toDayKey(cursor)) ?? 0) >= goal) {
      run += 1;
      best = Math.max(best, run);
    } else if (cursor === today) {
      break;
    } else if (run > 0 && (lastFreezeIndex === null || dayIndex - lastFreezeIndex >= FREEZE_COOLDOWN_DAYS)) {
      lastFreezeIndex = dayIndex;
    } else {
      run = 0;
    }
    dayIndex += 1;
  }
  return best;
};
