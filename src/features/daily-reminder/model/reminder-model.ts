import { combine, createEffect, createEvent, sample } from 'effector';
import * as Notifications from 'expo-notifications';
import { AppState, Linking, ToastAndroid } from 'react-native';
import { debounce } from 'patronum';
import { getGoalProgress, progressModel } from '@app/entities/progress';
import { settingsModel } from '@app/entities/settings';
import { DICTIONARIES, i18nModel, selectPluralForm, translate } from '@app/shared/i18n';
import { REMINDER_CHANNEL_ID, REVIEW_ACTION } from '../config';
import { planReminders } from '../lib/plan-reminders';
import type { QuestionStats } from '@app/entities/progress';
import type { ReminderTime, Settings } from '@app/entities/settings';
import type { Locale } from '@app/shared/i18n';

type PermissionResult = {
  granted: boolean;
  canAskAgain: boolean;
};

type ScheduledReminder = {
  at: number;
  title: string;
  body: string;
  opensReview: boolean;
};

type ReminderSchedule = {
  channelName: string;
  reminders: ScheduledReminder[];
};

type DeniedNotice = {
  message: string;
  canAskAgain: boolean;
};

const remindersStarted = createEvent();
const reminderToggled = createEvent<boolean>();
const reminderTimeChanged = createEvent<ReminderTime>();
const appActivated = createEvent();
const rescheduleRequested = createEvent();

const $isReady = combine(settingsModel.$isLoaded, progressModel.$isLoaded, (isSettingsLoaded, isProgressLoaded) => isSettingsLoaded && isProgressLoaded);

const requestPermissionFx = createEffect(async (): Promise<PermissionResult> => {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) {
    return { granted: true, canAskAgain: true };
  }
  const requested = await Notifications.requestPermissionsAsync();
  return { granted: requested.granted, canAskAgain: requested.canAskAgain };
});

const checkPermissionFx = createEffect(async (): Promise<boolean> => (await Notifications.getPermissionsAsync()).granted);

const scheduleRemindersFx = createEffect(async ({ channelName, reminders }: ReminderSchedule) => {
  await Notifications.setNotificationChannelAsync(REMINDER_CHANNEL_ID, {
    name: channelName,
    importance: Notifications.AndroidImportance.DEFAULT,
  });
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Promise.all(
    reminders.map(({ at, title, body, opensReview }) =>
      Notifications.scheduleNotificationAsync({
        content: { title, body, data: opensReview ? { action: REVIEW_ACTION } : {} },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at, channelId: REMINDER_CHANNEL_ID },
      }),
    ),
  );
});

const cancelRemindersFx = createEffect(() => Notifications.cancelAllScheduledNotificationsAsync());

const deniedFx = createEffect(async ({ message, canAskAgain }: DeniedNotice) => {
  ToastAndroid.show(message, ToastAndroid.LONG);
  if (!canAskAgain) {
    await Linking.openSettings();
  }
});

const watchAppStateFx = createEffect(() => {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      appActivated();
    }
  });
});

const formatQuestions = (locale: Locale, count: number): string =>
  `${count} ${selectPluralForm(locale, count, DICTIONARIES[locale].plurals.question)}`;

const buildSchedule = (settings: Settings, stats: QuestionStats, isTodayDone: boolean, locale: Locale): ReminderSchedule => {
  const dictionary = DICTIONARIES[locale];
  const planned = planReminders({ now: Date.now(), time: settings.reminderTime, stats, isTodayDone });
  return {
    channelName: translate(dictionary, 'reminder.channel'),
    reminders: planned.map(({ at, dueCount }) => ({
      at,
      title: translate(dictionary, 'reminder.title'),
      body:
        dueCount > 0
          ? translate(dictionary, 'reminder.bodyReview', { count: formatQuestions(locale, dueCount) })
          : translate(dictionary, 'reminder.bodyGoal', { count: formatQuestions(locale, settings.dailyGoal) }),
      opensReview: dueCount > 0,
    })),
  };
};

sample({ clock: remindersStarted, target: watchAppStateFx });
sample({
  clock: [
    remindersStarted,
    appActivated,
    $isReady.updates,
    settingsModel.$settings.updates,
    progressModel.$answerLog.updates,
    i18nModel.$locale.updates,
  ],
  target: rescheduleRequested,
});

const rescheduleSettled = debounce(rescheduleRequested, 500);
const $scheduleSource = combine({
  isReady: $isReady,
  settings: settingsModel.$settings,
  stats: progressModel.$questionStats,
  log: progressModel.$answerLog,
  locale: i18nModel.$locale,
});

sample({
  clock: rescheduleSettled,
  source: $scheduleSource,
  filter: ({ isReady, settings }) => isReady && settings.reminders,
  fn: ({ settings, stats, log, locale }) =>
    buildSchedule(settings, stats, getGoalProgress(log, settings.dailyGoal, Date.now()).isTodayDone, locale),
  target: scheduleRemindersFx,
});
sample({
  clock: rescheduleSettled,
  source: $scheduleSource,
  filter: ({ isReady, settings }) => isReady && !settings.reminders,
  target: cancelRemindersFx,
});

sample({
  clock: $isReady.updates,
  source: settingsModel.$settings,
  filter: (settings, isReady) => isReady && settings.reminders,
  target: checkPermissionFx,
});
sample({
  clock: checkPermissionFx.doneData,
  filter: (granted) => !granted,
  fn: (): Partial<Settings> => ({ reminders: false }),
  target: settingsModel.settingsChanged,
});

sample({ clock: reminderToggled, filter: (isEnabled) => isEnabled, target: requestPermissionFx });
sample({
  clock: reminderToggled,
  filter: (isEnabled) => !isEnabled,
  fn: (): Partial<Settings> => ({ reminders: false }),
  target: settingsModel.settingsChanged,
});
sample({
  clock: requestPermissionFx.doneData,
  filter: ({ granted }) => granted,
  fn: (): Partial<Settings> => ({ reminders: true }),
  target: settingsModel.settingsChanged,
});
sample({
  clock: requestPermissionFx.doneData,
  source: i18nModel.$locale,
  filter: (_, { granted }) => !granted,
  fn: (locale, { canAskAgain }): DeniedNotice => ({ message: translate(DICTIONARIES[locale], 'reminder.denied'), canAskAgain }),
  target: deniedFx,
});
sample({ clock: reminderTimeChanged, fn: (reminderTime): Partial<Settings> => ({ reminderTime }), target: settingsModel.settingsChanged });

export const reminderModel = { remindersStarted, reminderToggled, reminderTimeChanged };
