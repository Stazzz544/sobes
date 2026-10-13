import { TAGS } from '../config/tags';
import { QUIZ_MODES } from '../model/types';
import type { TagId } from '../config/tags';
import type { QuizMode } from '../model/types';

export const isTagId = (value: unknown): value is TagId => typeof value === 'string' && value in TAGS;

export const isQuizMode = (value: unknown): value is QuizMode => QUIZ_MODES.some((mode) => mode === value);
