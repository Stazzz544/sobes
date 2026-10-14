import { JAVASCRIPT_LESSONS } from './javascript';
import type { TopicId } from '@app/shared/config';
import type { TagId } from '../config/tags';
import type { Lesson } from '../model/types';

export const LESSON_GROUPS: Partial<Record<TopicId, readonly Lesson[]>> = {
  javascript: JAVASCRIPT_LESSONS,
};

export const LESSONS_BY_TAG: Partial<Record<TagId, Lesson>> = Object.fromEntries(
  Object.values(LESSON_GROUPS).flatMap((lessons) => (lessons ?? []).map((lesson) => [lesson.tag, lesson])),
);
