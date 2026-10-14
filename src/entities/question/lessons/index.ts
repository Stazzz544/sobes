import { AI_LESSONS } from './ai';
import { ALGORITHMS_LESSONS } from './algorithms';
import { CSS_LESSONS } from './css';
import { GIT_LESSONS } from './git';
import { HR_LESSONS } from './hr';
import { HTML_LESSONS } from './html';
import { TESTING_LESSONS } from './testing';
import { JAVASCRIPT_LESSONS } from './javascript';
import { JAVASCRIPT_LESSONS_2 } from './javascript-2';
import { REACT_LESSONS } from './react';
import { TYPESCRIPT_LESSONS } from './typescript';
import { WEB_LESSONS } from './web';
import type { TopicId } from '@app/shared/config';
import type { TagId } from '../config/tags';
import type { Lesson } from '../model/types';

export const LESSON_GROUPS: Partial<Record<TopicId, readonly Lesson[]>> = {
  javascript: [...JAVASCRIPT_LESSONS, ...JAVASCRIPT_LESSONS_2],
  typescript: TYPESCRIPT_LESSONS,
  react: REACT_LESSONS,
  web: WEB_LESSONS,
  css: CSS_LESSONS,
  algorithms: ALGORITHMS_LESSONS,
  ai: AI_LESSONS,
  html: HTML_LESSONS,
  testing: TESTING_LESSONS,
  git: GIT_LESSONS,
  hr: HR_LESSONS,
};

export const LESSONS_BY_TAG: Partial<Record<TagId, Lesson>> = Object.fromEntries(
  Object.values(LESSON_GROUPS).flatMap((lessons) => (lessons ?? []).map((lesson) => [lesson.tag, lesson])),
);
