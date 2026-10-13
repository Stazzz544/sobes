import type { Locale } from './types';

type TranslationParams = Record<string, string | number>;

export const translate = (dictionary: object, key: string, params?: TranslationParams): string => {
  const value = key
    .split('.')
    .reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], dictionary);
  if (typeof value !== 'string') {
    return key;
  }
  if (!params) {
    return value;
  }
  return value.replace(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match));
};

export const selectPluralForm = (locale: Locale, count: number, forms: readonly string[]): string => {
  const absolute = Math.abs(count);
  if (locale === 'en') {
    return (absolute === 1 ? forms[0] : forms[1]) ?? forms[0] ?? '';
  }
  const lastDigit = absolute % 10;
  const lastTwoDigits = absolute % 100;
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return forms[0] ?? '';
  }
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return forms[1] ?? '';
  }
  return forms[2] ?? '';
};
