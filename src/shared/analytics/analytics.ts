import AppMetrica from '@appmetrica/react-native-analytics';
import { createEffect } from 'effector';
import type { AnalyticsEvent } from './events';

const API_KEY = process.env.EXPO_PUBLIC_APPMETRICA_API_KEY ?? '';
// debug-сборки не шлют события, чтобы свои запуски не смешивались со статистикой пользователей
const IS_SENDING = API_KEY !== '' && !__DEV__;

export const activateAnalytics = (): void => {
  if (!IS_SENDING) {
    return;
  }
  AppMetrica.activate({
    apiKey: API_KEY,
    locationTracking: false,
    advIdentifiersTracking: false,
    logs: process.env.EXPO_PUBLIC_APPMETRICA_LOGS === '1',
  });
};

export const trackEventFx = createEffect((event: AnalyticsEvent): void => {
  if (__DEV__) {
    console.log('[analytics]', event.name, event.params);
  }
  if (IS_SENDING) {
    AppMetrica.reportEvent(event.name, event.params);
  }
});
