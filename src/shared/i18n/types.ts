export type Locale = 'ru' | 'en';

export type LocalizedText = Record<Locale, string>;

export const LOCALES: readonly Locale[] = ['ru', 'en'];

export const LOCALE_NAMES: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
};
