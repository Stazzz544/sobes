import { TOPIC_IDS } from '@app/shared/config';
import { compareVersions } from '@app/shared/lib';
import { PACK_SCHEMA } from '../config/content-pack';
import { OPTION_IDS } from '../model/types';
import { isTagId } from './guards';
import type { LocalizedText } from '@app/shared/i18n';
import type { CodeLanguage } from '@app/shared/ui';
import type { TagId } from '../config/tags';
import type { GlossaryTerm } from '../glossary/glossary';
import type { ContentBank } from '../model/content';
import type { CodeSnippet, Diagram, ExplanationBlock, Lesson, OptionContent, Question, QuestionSource } from '../model/types';

type UnknownRecord = Record<string, unknown>;

const CODE_LANGUAGES: readonly CodeLanguage[] = ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'http', 'bash', 'text'];
const LANE_TONES = ['accent', 'success', 'warning', 'neutral'];
const MIN_QUESTION_SHARE = 0.5;

const isRecord = (value: unknown): value is UnknownRecord => typeof value === 'object' && value !== null && !Array.isArray(value);

const isText = (value: unknown): value is LocalizedText => isRecord(value) && typeof value.ru === 'string' && typeof value.en === 'string';

const isArrayOf = <T>(value: unknown, check: (item: unknown) => item is T): value is T[] => Array.isArray(value) && value.every(check);

const isCode = (value: unknown): value is CodeSnippet =>
  isRecord(value) && CODE_LANGUAGES.some((lang) => lang === value.lang) && typeof value.source === 'string';

const isSource = (value: unknown): value is QuestionSource =>
  isRecord(value) && typeof value.title === 'string' && typeof value.url === 'string';

const isOption = (value: unknown): value is OptionContent => isRecord(value) && (isText(value.text) || typeof value.code === 'string');

const isDiagramText = (value: unknown): boolean => typeof value === 'string' || isText(value);

const isDiagram = (value: unknown): value is Diagram =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  (value.layout === 'columns' || value.layout === 'chain') &&
  Array.isArray(value.steps) &&
  value.steps.length > 0 &&
  value.steps.every(
    (step) =>
      isRecord(step) &&
      isText(step.caption) &&
      Array.isArray(step.lanes) &&
      step.lanes.every(
        (lane) =>
          isRecord(lane) &&
          typeof lane.id === 'string' &&
          isDiagramText(lane.title) &&
          LANE_TONES.includes(String(lane.tone)) &&
          Array.isArray(lane.items) &&
          lane.items.every((item) => isRecord(item) && typeof item.id === 'string' && isDiagramText(item.label)),
      ),
  );

const blockChecker =
  (diagrams: Readonly<Record<string, Diagram>>) =>
  (value: unknown): value is ExplanationBlock => {
    if (!isRecord(value)) {
      return false;
    }
    if (value.type === 'text') {
      return isText(value.text);
    }
    if (value.type === 'code') {
      return isCode(value.code) && (value.caption === undefined || isText(value.caption));
    }
    if (value.type === 'diagram') {
      return typeof value.diagram === 'string' && value.diagram in diagrams;
    }
    return false;
  };

const questionChecker = (diagrams: Readonly<Record<string, Diagram>>) => {
  const isBlock = blockChecker(diagrams);
  return (value: unknown): value is Question => {
    if (
      !isRecord(value) ||
      typeof value.id !== 'string' ||
      !TOPIC_IDS.some((topic) => topic === value.topic) ||
      !Array.isArray(value.tags) ||
      value.tags.length === 0 ||
      !value.tags.every(isTagId) ||
      ![1, 2, 3].includes(Number(value.difficulty)) ||
      typeof value.popular !== 'boolean' ||
      !isText(value.prompt) ||
      (value.code !== undefined && !isCode(value.code)) ||
      !Array.isArray(value.explanation) ||
      value.explanation.length === 0 ||
      !value.explanation.every(isBlock) ||
      !isArrayOf(value.sources, isSource)
    ) {
      return false;
    }
    if (value.kind === undefined || value.kind === 'choice') {
      return isArrayOf(value.options, isOption) && value.options.length === OPTION_IDS.length && OPTION_IDS.some((id) => id === value.answer);
    }
    if (value.kind === 'order') {
      return isArrayOf(value.items, isOption) && value.items.length >= 2;
    }
    if (value.kind === 'bug-line') {
      return (
        isCode(value.code) &&
        Number.isInteger(value.answerLine) &&
        Number(value.answerLine) >= 1 &&
        Number(value.answerLine) <= value.code.source.split('\n').length
      );
    }
    if (value.kind === 'output') {
      return isCode(value.code) && isArrayOf(value.answers, (answer): answer is string => typeof answer === 'string') && value.answers.length > 0;
    }
    return false;
  };
};

const lessonChecker = (diagrams: Readonly<Record<string, Diagram>>) => {
  const isBlock = blockChecker(diagrams);
  return (value: unknown): value is Lesson =>
    isRecord(value) &&
    isTagId(value.tag) &&
    isText(value.summary) &&
    isArrayOf(value.blocks, isBlock) &&
    isArrayOf(value.keyPoints, isText) &&
    isArrayOf(value.sources, isSource);
};

const isGlossaryTerm = (value: unknown): value is GlossaryTerm => isRecord(value) && isText(value.term) && isText(value.definition);

const pickValid = <T>(value: unknown, check: (item: unknown) => item is T): Record<string, T> =>
  isRecord(value) ? Object.fromEntries(Object.entries(value).filter((entry): entry is [string, T] => check(entry[1]))) : {};

export const readPackVersion = (pack: unknown): string | null =>
  isRecord(pack) && pack.schema === PACK_SCHEMA && typeof pack.appVersion === 'string' ? pack.appVersion : null;

export const sanitizePack = (pack: unknown, appVersion: string, bundled: ContentBank): ContentBank | null => {
  const packVersion = readPackVersion(pack);
  if (!isRecord(pack) || !packVersion || compareVersions(packVersion, appVersion) <= 0 || !Array.isArray(pack.questions)) {
    return null;
  }
  const diagrams = { ...bundled.diagrams, ...pickValid(pack.diagrams, isDiagram) };
  const isQuestion = questionChecker(diagrams);
  const isLesson = lessonChecker(diagrams);
  const seen = new Set<string>();
  const questions = pack.questions.filter((question): question is Question => {
    if (!isQuestion(question) || seen.has(question.id)) {
      return false;
    }
    seen.add(question.id);
    return true;
  });
  if (questions.length < bundled.questions.length * MIN_QUESTION_SHARE) {
    return null;
  }
  const packLessons = isRecord(pack.lessons)
    ? Object.values(pack.lessons).flatMap((group) => (Array.isArray(group) ? group.filter(isLesson) : []))
    : [];
  const lessonsByTag: Partial<Record<TagId, Lesson>> = {
    ...bundled.lessonsByTag,
    ...Object.fromEntries(packLessons.map((lesson) => [lesson.tag, lesson])),
  };

  return {
    questions,
    questionsById: Object.fromEntries(questions.map((question) => [question.id, question])),
    lessonsByTag,
    glossary: { ...bundled.glossary, ...pickValid(pack.glossary, isGlossaryTerm) },
    diagrams,
    packVersion,
    builtAt: typeof pack.builtAt === 'string' ? pack.builtAt : null,
  };
};
