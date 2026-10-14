import { OPTION_IDS } from '../model/types';
import type { Locale } from '@app/shared/i18n';
import type { ChoiceQuestion, OptionContent, OptionId } from '../model/types';

export const OPTION_LETTERS: Record<OptionId, string> = { a: 'A', b: 'B', c: 'C', d: 'D', e: 'E' };

export const getOption = (question: ChoiceQuestion, optionId: OptionId): OptionContent =>
  question.options[OPTION_IDS.indexOf(optionId)] ?? question.options[0];

export const getOptionText = (option: OptionContent, locale: Locale): string =>
  'code' in option ? option.code : option.text[locale];
