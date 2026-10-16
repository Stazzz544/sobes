import { createEvent, sample } from 'effector';
import { trackEventFx } from '@app/shared/analytics';
import type { AnalyticsEvent } from '@app/shared/analytics';

type LessonVisit = {
  tag: string;
  step: number;
  steps: number;
};

type CheckAnswer = {
  tag: string;
  checkId: string;
  isCorrect: boolean;
};

const lessonOpened = createEvent<LessonVisit>();
const lessonClosed = createEvent<LessonVisit>();
const checkAnswered = createEvent<CheckAnswer>();

sample({
  clock: lessonOpened,
  fn: ({ tag, step, steps }): AnalyticsEvent => ({ name: 'lesson_opened', params: { tag, step, steps } }),
  target: trackEventFx,
});
sample({
  clock: lessonClosed,
  fn: ({ tag, step, steps }): AnalyticsEvent => ({
    name: 'lesson_closed',
    params: { tag, step_reached: step, steps, finished: step > steps },
  }),
  target: trackEventFx,
});
sample({
  clock: checkAnswered,
  fn: ({ tag, checkId, isCorrect }): AnalyticsEvent => ({
    name: 'lesson_check_answered',
    params: { tag, check_id: checkId, result: isCorrect ? 'correct' : 'wrong' },
  }),
  target: trackEventFx,
});

export const lessonAnalyticsModel = { lessonOpened, lessonClosed, checkAnswered };
