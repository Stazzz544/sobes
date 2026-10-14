import { createEvent, sample } from 'effector';
import { settingsModel } from '@app/entities/settings';
import { topicModel } from '@app/entities/topic';
import { trackEventFx } from '@app/shared/analytics';
import { i18nModel } from '@app/shared/i18n';
import type { AnalyticsEvent } from '@app/shared/analytics';

const startPressed = createEvent();

sample({
  clock: startPressed,
  source: { topic: topicModel.$currentTopic, locale: i18nModel.$locale },
  fn: ({ topic, locale }): AnalyticsEvent => ({ name: 'onboarding_completed', params: { topic, locale } }),
  target: trackEventFx,
});
sample({ clock: startPressed, target: settingsModel.onboardingCompleted });

export const onboardingModel = { startPressed };
