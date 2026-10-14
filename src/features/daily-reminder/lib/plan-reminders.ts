import { addDays, startOfDay } from '@app/shared/lib';
import { REMINDER_DAYS_AHEAD } from '../config';
import type { QuestionStats } from '@app/entities/progress';

export type PlannedReminder = {
  at: number;
  dueCount: number;
};

type PlanInput = {
  now: number;
  time: string;
  stats: QuestionStats;
  isTodayDone: boolean;
};

const atTime = (day: number, time: string): number => {
  const [hours = 0, minutes = 0] = time.split(':').map(Number);
  const date = new Date(day);
  date.setHours(hours, minutes, 0, 0);
  return date.getTime();
};

export const planReminders = ({ now, time, stats, isTodayDone }: PlanInput): PlannedReminder[] =>
  Array.from({ length: REMINDER_DAYS_AHEAD }, (_, dayOffset) => atTime(addDays(startOfDay(now), dayOffset), time))
    .filter((at, dayOffset) => at > now && !(dayOffset === 0 && isTodayDone))
    .map((at) => ({ at, dueCount: Object.values(stats).filter((stat) => stat.dueAt <= at).length }));
