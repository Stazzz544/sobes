import { createEffect, createEvent, createStore, sample } from 'effector';
import { activateAnalyticsFx, setAnalyticsEnabledFx } from '@app/shared/analytics';
import { STORAGE_KEYS } from '@app/shared/config';
import { detectDeviceLocale, i18nModel } from '@app/shared/i18n';
import { storage } from '@app/shared/lib';
import type { Locale } from '@app/shared/i18n';
import type { ThemePreference } from '@app/shared/theme';

export type LocalePreference = 'system' | Locale;

export type SessionLength = 10 | 20 | 30;

export type DailyGoal = 5 | 10 | 20;

export const REMINDER_TIMES = ['09:00', '13:00', '19:00', '21:00'] as const;

export type ReminderTime = (typeof REMINDER_TIMES)[number];

export type Settings = {
  theme: ThemePreference;
  locale: LocalePreference;
  sessionLength: SessionLength;
  dailyGoal: DailyGoal;
  haptics: boolean;
  aiProvider: string | null;
  analytics: boolean;
  reminders: boolean;
  reminderTime: ReminderTime;
  onboardingDone: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  locale: 'system',
  sessionLength: 10,
  dailyGoal: 10,
  haptics: true,
  aiProvider: null,
  analytics: true,
  reminders: false,
  reminderTime: '19:00',
  onboardingDone: false,
};

const settingsLoaded = createEvent();
const settingsChanged = createEvent<Partial<Settings>>();
const onboardingCompleted = createEvent();

const $settings = createStore<Settings>(DEFAULT_SETTINGS);
const $isLoaded = createStore(false);

const loadSettingsFx = createEffect(async (): Promise<Settings> => {
  const saved = await storage.get<Partial<Settings>>(STORAGE_KEYS.SETTINGS);
  return { ...DEFAULT_SETTINGS, ...saved };
});

const saveSettingsFx = createEffect(async (settings: Settings) => storage.set(STORAGE_KEYS.SETTINGS, settings));

const $effectiveLocale = $settings.map(
  (settings): Locale => (settings.locale === 'system' ? detectDeviceLocale() : settings.locale),
);

sample({ clock: settingsLoaded, target: loadSettingsFx });
sample({ clock: loadSettingsFx.doneData, target: $settings });
sample({ clock: loadSettingsFx.finally, fn: () => true, target: $isLoaded });
sample({ clock: loadSettingsFx.doneData, fn: (settings) => settings.analytics, target: activateAnalyticsFx });
sample({
  clock: settingsChanged,
  source: $settings,
  fn: (settings, patch): Settings => ({ ...settings, ...patch }),
  target: [$settings, saveSettingsFx],
});
sample({
  clock: settingsChanged,
  filter: (patch) => patch.analytics !== undefined,
  fn: (patch) => patch.analytics === true,
  target: setAnalyticsEnabledFx,
});
sample({ clock: onboardingCompleted, fn: (): Partial<Settings> => ({ onboardingDone: true }), target: settingsChanged });
sample({ clock: $effectiveLocale, target: i18nModel.localeChanged });

export const settingsModel = { $settings, $isLoaded, settingsLoaded, settingsChanged, onboardingCompleted };
