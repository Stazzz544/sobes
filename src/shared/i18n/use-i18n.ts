import { useMemo } from 'react';
import { useUnit } from 'effector-react';
import { DICTIONARIES } from './locales';
import { i18nModel } from './model';
import { selectPluralForm, translate } from './translate';
import type { Locale, LocalizedText } from './types';
import type { PluralKey, TranslationKey } from './locales';

export type I18n = {
  locale: Locale;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  plural: (key: PluralKey, count: number) => string;
  text: (value: LocalizedText) => string;
};

export const useI18n = (): I18n => {
  const { locale } = useUnit({ locale: i18nModel.$locale });

  return useMemo((): I18n => {
    const dictionary = DICTIONARIES[locale];
    return {
      locale,
      t: (key, params) => translate(dictionary, key, params),
      plural: (key, count) => `${count} ${selectPluralForm(locale, count, dictionary.plurals[key])}`,
      text: (value) => value[locale],
    };
  }, [locale]);
};
