import { AI_QUESTIONS } from './ai';
import { AI_QUESTIONS_2 } from './ai-2';
import { ALGORITHMS_QUESTIONS } from './algorithms';
import { ALGORITHMS_QUESTIONS_2 } from './algorithms-2';
import { CSS_QUESTIONS } from './css';
import { CSS_QUESTIONS_2 } from './css-2';
import { CSS_QUESTIONS_3 } from './css-3';
import { JAVASCRIPT_QUESTIONS } from './javascript';
import { JAVASCRIPT_QUESTIONS_2 } from './javascript-2';
import { JAVASCRIPT_QUESTIONS_3 } from './javascript-3';
import { JAVASCRIPT_QUESTIONS_4 } from './javascript-4';
import { REACT_QUESTIONS } from './react';
import { REACT_QUESTIONS_2 } from './react-2';
import { REACT_QUESTIONS_3 } from './react-3';
import { REACT_QUESTIONS_4 } from './react-4';
import { TYPESCRIPT_QUESTIONS } from './typescript';
import { TYPESCRIPT_QUESTIONS_2 } from './typescript-2';
import { TYPESCRIPT_QUESTIONS_3 } from './typescript-3';
import { TYPESCRIPT_QUESTIONS_4 } from './typescript-4';
import { WEB_QUESTIONS } from './web';
import { WEB_QUESTIONS_2 } from './web-2';
import { WEB_QUESTIONS_3 } from './web-3';
import { WEB_QUESTIONS_4 } from './web-4';
import type { Question } from '../model/types';

export const QUESTIONS: Question[] = [
  ...JAVASCRIPT_QUESTIONS,
  ...JAVASCRIPT_QUESTIONS_2,
  ...JAVASCRIPT_QUESTIONS_3,
  ...JAVASCRIPT_QUESTIONS_4,
  ...TYPESCRIPT_QUESTIONS,
  ...TYPESCRIPT_QUESTIONS_2,
  ...TYPESCRIPT_QUESTIONS_3,
  ...TYPESCRIPT_QUESTIONS_4,
  ...REACT_QUESTIONS,
  ...REACT_QUESTIONS_2,
  ...REACT_QUESTIONS_3,
  ...REACT_QUESTIONS_4,
  ...WEB_QUESTIONS,
  ...WEB_QUESTIONS_2,
  ...WEB_QUESTIONS_3,
  ...WEB_QUESTIONS_4,
  ...CSS_QUESTIONS,
  ...CSS_QUESTIONS_2,
  ...CSS_QUESTIONS_3,
  ...AI_QUESTIONS,
  ...AI_QUESTIONS_2,
  ...ALGORITHMS_QUESTIONS,
  ...ALGORITHMS_QUESTIONS_2,
];

export const QUESTIONS_BY_ID: Readonly<Record<string, Question>> = Object.fromEntries(
  QUESTIONS.map((question) => [question.id, question]),
);
