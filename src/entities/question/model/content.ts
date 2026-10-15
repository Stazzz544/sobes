import { QUESTIONS, QUESTIONS_BY_ID } from '../data';
import { DIAGRAMS } from '../data/diagrams';
import { GLOSSARY } from '../glossary/glossary';
import { LESSONS_BY_TAG } from '../lessons';
import type { TagId } from '../config/tags';
import type { GlossaryTerm } from '../glossary/glossary';
import type { Diagram, Lesson, Question } from './types';

export type ContentBank = {
  questions: readonly Question[];
  questionsById: Readonly<Record<string, Question>>;
  lessonsByTag: Partial<Record<TagId, Lesson>>;
  glossary: Readonly<Record<string, GlossaryTerm>>;
  diagrams: Readonly<Record<string, Diagram>>;
  packVersion: string | null;
  builtAt: string | null;
};

export const BUNDLED_CONTENT: ContentBank = {
  questions: QUESTIONS,
  questionsById: QUESTIONS_BY_ID,
  lessonsByTag: LESSONS_BY_TAG,
  glossary: GLOSSARY,
  diagrams: DIAGRAMS,
  packVersion: null,
  builtAt: null,
};

// банк меняется только при холодном старте, до первого рендера, поэтому хватает модуля, а не стора
let current = BUNDLED_CONTENT;

export const setContentBank = (bank: ContentBank): void => {
  current = bank;
};

export const getQuestions = (): readonly Question[] => current.questions;

export const getQuestionsById = (): Readonly<Record<string, Question>> => current.questionsById;

export const getQuestionById = (id: string): Question | undefined => current.questionsById[id];

export const getLessonByTag = (tag: TagId): Lesson | undefined => current.lessonsByTag[tag];

export const getGlossaryTerm = (id: string): GlossaryTerm | undefined => current.glossary[id];

export const getDiagram = (id: string): Diagram | undefined => current.diagrams[id];

export const getContentBank = (): ContentBank => current;
