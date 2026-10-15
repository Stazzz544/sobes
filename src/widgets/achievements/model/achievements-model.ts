import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { progressModel } from '@app/entities/progress';
import { settingsModel } from '@app/entities/settings';
import { STORAGE_KEYS } from '@app/shared/config';
import { storage } from '@app/shared/lib';
import { getAchievements } from '../lib/achievements';
import type { Achievement, AchievementId } from '../lib/achievements';

const toastDismissed = createEvent();

const $seen = createStore<AchievementId[] | null>(null);

const loadSeenFx = createEffect(() => storage.get<AchievementId[]>(STORAGE_KEYS.SEEN_ACHIEVEMENTS));
const saveSeenFx = createEffect((ids: AchievementId[]) => storage.set(STORAGE_KEYS.SEEN_ACHIEVEMENTS, ids));

const $isProgressReady = combine(
  progressModel.$isLoaded,
  settingsModel.$isLoaded,
  (isProgressLoaded, isSettingsLoaded) => isProgressLoaded && isSettingsLoaded,
);
const $unlocked = combine(progressModel.$questionStats, progressModel.$answerLog, settingsModel.$settings, (stats, log, settings) =>
  getAchievements({ stats, log, dailyGoal: settings.dailyGoal, now: Date.now() }).filter(
    (achievement) => achievement.current >= achievement.target,
  ),
);
const $current = combine(
  $unlocked,
  $seen,
  (unlocked, seen): Achievement | null => (seen === null ? null : (unlocked.find((achievement) => !seen.includes(achievement.id)) ?? null)),
);

sample({ clock: $isProgressReady.updates, filter: Boolean, target: loadSeenFx });
// без сохранённого списка всё уже полученное считаем показанным, чтобы после обновления не посыпались старые
sample({
  clock: loadSeenFx.doneData,
  source: $unlocked,
  fn: (unlocked, saved): AchievementId[] => saved ?? unlocked.map((achievement) => achievement.id),
  target: [$seen, saveSeenFx],
});
sample({
  clock: toastDismissed,
  source: { seen: $seen, current: $current },
  filter: ({ seen, current }) => seen !== null && current !== null,
  fn: ({ seen, current }): AchievementId[] => [...(seen ?? []), ...(current ? [current.id] : [])],
  target: [$seen, saveSeenFx],
});
sample({ clock: progressModel.progressReset, fn: (): AchievementId[] => [], target: [$seen, saveSeenFx] });

export const achievementsModel = { $current, toastDismissed };
