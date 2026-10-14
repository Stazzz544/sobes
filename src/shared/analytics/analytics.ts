import AppMetrica from '@appmetrica/react-native-analytics';
import { attach, createEffect, createStore, sample } from 'effector';
import type { AnalyticsEvent } from './events';

const API_KEY = process.env.EXPO_PUBLIC_APPMETRICA_API_KEY ?? '';
// debug-сборки не шлют события, чтобы свои запуски не смешивались со статистикой пользователей
const IS_SENDING = API_KEY !== '' && !__DEV__;

export const activateAnalyticsFx = createEffect((isEnabled: boolean): void => {
  if (!IS_SENDING) {
    return;
  }
  AppMetrica.activate({
    apiKey: API_KEY,
    statisticsSending: isEnabled,
    locationTracking: false,
    advIdentifiersTracking: false,
    logs: process.env.EXPO_PUBLIC_APPMETRICA_LOGS === '1',
  });
});

export const setAnalyticsEnabledFx = createEffect((isEnabled: boolean): void => {
  if (IS_SENDING) {
    AppMetrica.setDataSendingEnabled(isEnabled);
  }
});

const $isEnabled = createStore(false);

sample({ clock: [activateAnalyticsFx, setAnalyticsEnabledFx], target: $isEnabled });

export const trackEventFx = attach({
  source: $isEnabled,
  effect: (isEnabled, event: AnalyticsEvent): void => {
    if (!isEnabled) {
      return;
    }
    if (__DEV__) {
      console.log('[analytics]', event.name, event.params);
    }
    if (IS_SENDING) {
      AppMetrica.reportEvent(event.name, event.params);
    }
  },
});

export const reportErrorFx = attach({
  source: $isEnabled,
  effect: (isEnabled, error: Error): void => {
    if (!isEnabled) {
      return;
    }
    if (__DEV__) {
      console.log('[analytics] error', error.message);
    }
    if (IS_SENDING) {
      AppMetrica.reportErrorWithoutIdentifier(error.message, error);
    }
  },
});
