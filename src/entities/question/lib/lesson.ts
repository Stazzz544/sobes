import { TOPIC_PATHS } from '../config/paths';
import { TAGS } from '../config/tags';
import { getContentBank, getQuestionById } from '../model/content';
import type { TopicId } from '@app/shared/config';
import type { TagId } from '../config/tags';
import type { ContentBank } from '../model/content';
import type { Course, Lesson, LessonStep, StepLesson } from '../model/types';

export type QuestionStepRef = {
  tag: TagId;
  stepId: string;
  index: number;
  title: LessonStep['title'];
};

export const isStepLesson = (lesson: Lesson | undefined): lesson is StepLesson => lesson?.format === 'steps';

export const getLessonTestIds = (lesson: StepLesson): string[] =>
  lesson.steps.flatMap((step) => step.test).filter((id) => getQuestionById(id) !== undefined);

export const getCourseTestIds = (course: Course): string[] =>
  course.final.map((item) => item.question).filter((id) => getQuestionById(id) !== undefined);

export const getStepIndex = (lesson: StepLesson, stepId: string): number => lesson.steps.findIndex((step) => step.id === stepId);

const stepIndexByBank = new WeakMap<ContentBank, Map<string, QuestionStepRef>>();

const buildStepIndex = (bank: ContentBank): Map<string, QuestionStepRef> => {
  const index = new Map<string, QuestionStepRef>();
  for (const lesson of Object.values(bank.lessonsByTag)) {
    if (!isStepLesson(lesson)) {
      continue;
    }
    lesson.steps.forEach((step, stepIndex) => {
      for (const questionId of step.test) {
        index.set(questionId, { tag: lesson.tag, stepId: step.id, index: stepIndex, title: step.title });
      }
    });
  }
  for (const course of Object.values(bank.coursesByTopic)) {
    for (const item of course?.final ?? []) {
      const lesson = bank.lessonsByTag[item.tag];
      const stepIndex = isStepLesson(lesson) ? getStepIndex(lesson, item.step) : -1;
      const step = isStepLesson(lesson) ? lesson.steps[stepIndex] : undefined;
      if (step && !index.has(item.question)) {
        index.set(item.question, { tag: item.tag, stepId: step.id, index: stepIndex, title: step.title });
      }
    }
  }
  return index;
};

export const findQuestionStep = (questionId: string): QuestionStepRef | null => {
  const bank = getContentBank();
  const index = stepIndexByBank.get(bank) ?? buildStepIndex(bank);
  stepIndexByBank.set(bank, index);
  return index.get(questionId) ?? null;
};

export const getLessonPosition = (tag: TagId): { current: number; total: number } | null => {
  const path = TOPIC_PATHS[TAGS[tag].topic];
  const index = path.indexOf(tag);
  return index >= 0 ? { current: index + 1, total: path.length } : null;
};

export const isCourseTopic = (topic: TopicId): boolean =>
  Boolean(getContentBank().coursesByTopic[topic]) ||
  TOPIC_PATHS[topic].some((tag) => isStepLesson(getContentBank().lessonsByTag[tag]));
