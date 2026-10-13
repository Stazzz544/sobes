import { createEvent, createStore, sample } from 'effector';
import { getLocales } from 'expo-localization';
import type { Locale } from './types';

export const detectDeviceLocale = (): Locale => (getLocales()[0]?.languageCode === 'ru' ? 'ru' : 'en');

const localeChanged = createEvent<Locale>();

const $locale = createStore<Locale>(detectDeviceLocale());

sample({ clock: localeChanged, target: $locale });

export const i18nModel = { $locale, localeChanged };
