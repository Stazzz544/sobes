import type { LearningProgress, LessonFinished, LessonRecord, LessonStepViewed, TestFinished, TestRecord } from '../model/types';

export const TEST_PASS_RATIO = 0.8;

export const EMPTY_LEARNING: LearningProgress = { lessons: {}, courses: {} };

const EMPTY_LESSON: LessonRecord = { seenSteps: [], lastStep: null, finishedAt: null, test: null };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const restoreLearning = (saved: unknown): LearningProgress => {
  if (!isRecord(saved) || !isRecord(saved.lessons) || !isRecord(saved.courses)) {
    return EMPTY_LEARNING;
  }
  return saved as LearningProgress;
};

const updateLesson = (
  learning: LearningProgress,
  tag: string,
  update: (lesson: LessonRecord) => LessonRecord,
): LearningProgress => ({
  ...learning,
  lessons: { ...learning.lessons, [tag]: update(learning.lessons[tag] ?? EMPTY_LESSON) },
});

export const markStepViewed = (learning: LearningProgress, { tag, stepId }: LessonStepViewed): LearningProgress => {
  const current = learning.lessons[tag];
  if (current?.lastStep === stepId && current.seenSteps.includes(stepId)) {
    return learning;
  }
  return updateLesson(learning, tag, (lesson) => ({
    ...lesson,
    seenSteps: lesson.seenSteps.includes(stepId) ? lesson.seenSteps : [...lesson.seenSteps, stepId],
    lastStep: stepId,
  }));
};

export const markLessonFinished = (learning: LearningProgress, { tag, at }: LessonFinished): LearningProgress => {
  if (learning.lessons[tag]?.finishedAt) {
    return learning;
  }
  return updateLesson(learning, tag, (lesson) => ({ ...lesson, finishedAt: at }));
};

const applyTest = (record: TestRecord | null | undefined, ratio: number, at: number): TestRecord => ({
  attempts: (record?.attempts ?? 0) + 1,
  bestRatio: Math.max(record?.bestRatio ?? 0, ratio),
  lastRatio: ratio,
  passedAt: record?.passedAt ?? (ratio >= TEST_PASS_RATIO ? at : null),
  lastAt: at,
});

export const applyTestResult = (
  learning: LearningProgress,
  { scope, id, correct, total, at }: TestFinished,
): LearningProgress => {
  const ratio = total > 0 ? correct / total : 0;
  if (scope === 'course') {
    return { ...learning, courses: { ...learning.courses, [id]: applyTest(learning.courses[id], ratio, at) } };
  }
  return updateLesson(learning, id, (lesson) => ({ ...lesson, test: applyTest(lesson.test, ratio, at) }));
};

export const isLessonTestPassed = (learning: LearningProgress, tag: string): boolean =>
  Boolean(learning.lessons[tag]?.test?.passedAt);
