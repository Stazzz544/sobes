import { en } from './en';
import { ru } from './ru';
import type { Locale } from '../types';
import type { Dictionary } from './dictionary';

export const DICTIONARIES: Record<Locale, Dictionary> = { ru, en };

export type { Dictionary, PluralKey, TranslationKey } from './dictionary';
