import { getCourse, getLessonByTag, getLessonTestIds, getQuestions, isStepLesson, TOPIC_PATHS } from '@app/entities/question';
import type { LearningProgress, QuestionStat, QuestionStats, TestRecord } from '@app/entities/progress';
import type { Course, TagId } from '@app/entities/question';
import type { TopicId } from '@app/shared/config';

export const UNIT_DONE_RATIO = 0.8;

export type UnitStatus = 'new' | 'started' | 'done';

export type LessonSteps = {
  total: number;
  seen: number;
  lastIndex: number;
  testSize: number;
  test: TestRecord | null;
};

export type UnitProgress = {
  tag: TagId;
  total: number;
  answered: number;
  correct: number;
  status: UnitStatus;
  lesson: LessonSteps | null;
};

export type PathProgress = {
  units: UnitProgress[];
  doneCount: number;
  nextTag: TagId | null;
  course: Course | null;
  courseTest: TestRecord | null;
};

const getTagStatus = (total: number, answered: number, correct: number): UnitStatus => {
  if (answered === 0) {
    return 'new';
  }
  if (answered === total && correct >= total * UNIT_DONE_RATIO) {
    return 'done';
  }
  return 'started';
};

const getLessonSteps = (tag: TagId, learning: LearningProgress): LessonSteps | null => {
  const lesson = getLessonByTag(tag);
  if (!isStepLesson(lesson)) {
    return null;
  }
  const record = learning.lessons[tag];
  const stepIds = lesson.steps.map((step) => step.id);
  return {
    total: stepIds.length,
    seen: stepIds.filter((stepId) => record?.seenSteps.includes(stepId)).length,
    lastIndex: record?.lastStep ? stepIds.indexOf(record.lastStep) : -1,
    testSize: getLessonTestIds(lesson).length,
    test: record?.test ?? null,
  };
};

const getStatus = (tagStatus: UnitStatus, lesson: LessonSteps | null): UnitStatus => {
  if (lesson?.test?.passedAt) {
    return 'done';
  }
  if (!lesson || tagStatus !== 'new') {
    return tagStatus;
  }
  return lesson.seen > 0 || lesson.test ? 'started' : 'new';
};

export const getPathProgress = (topic: TopicId, stats: QuestionStats, learning: LearningProgress): PathProgress => {
  const units = TOPIC_PATHS[topic].map((tag): UnitProgress => {
    const tagStats = getQuestions()
      .filter((question) => question.tags.includes(tag))
      .map((question) => stats[question.id]);
    const answeredStats = tagStats.filter((stat): stat is QuestionStat => stat !== undefined);
    const correct = answeredStats.filter((stat) => stat.lastResult === 'correct').length;
    const lesson = getLessonSteps(tag, learning);
    return {
      tag,
      total: tagStats.length,
      answered: answeredStats.length,
      correct,
      status: getStatus(getTagStatus(tagStats.length, answeredStats.length, correct), lesson),
      lesson,
    };
  });
  return {
    units,
    doneCount: units.filter((unit) => unit.status === 'done').length,
    nextTag: units.find((unit) => unit.status !== 'done')?.tag ?? null,
    course: getCourse(topic) ?? null,
    courseTest: learning.courses[topic] ?? null,
  };
};
