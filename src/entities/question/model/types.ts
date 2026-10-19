import type { TopicId } from '@app/shared/config';
import type { LocalizedText } from '@app/shared/i18n';
import type { CodeLanguage } from '@app/shared/ui';
import type { TagId } from '../config/tags';

export type QuizMode =
  | 'practice'
  | 'popular'
  | 'hard'
  | 'interview'
  | 'mistakes'
  | 'review'
  | 'placement'
  | 'lesson-test'
  | 'course-test';

export const QUIZ_MODES: readonly QuizMode[] = [
  'practice',
  'popular',
  'hard',
  'interview',
  'mistakes',
  'review',
  'placement',
  'lesson-test',
  'course-test',
];

export type OptionId = 'a' | 'b' | 'c' | 'd' | 'e';

export const OPTION_IDS: readonly OptionId[] = ['a', 'b', 'c', 'd', 'e'];

export type Difficulty = 1 | 2 | 3;

export type CodeSnippet = {
  lang: CodeLanguage;
  source: string;
};

export type OptionContent = { text: LocalizedText } | { code: string };

export type QuestionOptions = [OptionContent, OptionContent, OptionContent, OptionContent, OptionContent];

export type DiagramId =
  | 'event-loop-basic'
  | 'event-loop-async'
  | 'prototype-chain'
  | 'closure-counters'
  | 'react-render-commit'
  | 'critical-rendering-path'
  | 'http-revalidation'
  | 'binary-search'
  | 'bfs-queue'
  | 'recursion-stack'
  | 'state-colocation'
  | 'state-lifting'
  | 'state-prop-drilling'
  | 'imm-structural-sharing'
  | 'redux-data-flow'
  | 'redux-combine'
  | 'redux-middleware-onion'
  | 'stores-distant-consumers'
  | 'stores-context-rerender'
  | 'stores-selector-subscription'
  | 'server-dedupe'
  | 'server-invalidation'
  | 'url-source-of-truth'
  | 'url-push-replace'
  | 'git-remote-sync'
  | 'html-parse-p-div'
  | 'a11y-tab-order'
  | 'mocks-fake-timers'
  | 'e2e-actionability'
  | 'tdd-cycle'
  | 'node-module-resolution'
  | 'node-loop-phases'
  | 'express-middleware-chain'
  | 'next-client-boundary'
  | 'next-data-waterfall'
  | 'next-action-flow'
  | 'arch-middleware-onion'
  | 'arch-data-boundary'
  | 'arch-strangler'
  | 'ts-narrowing-flow'
  | 'ts-distribution';

export type DiagramText = string | LocalizedText;

export type DiagramItem = {
  id: string;
  label: DiagramText;
  isCode?: boolean;
};

export type DiagramLaneTone = 'accent' | 'success' | 'warning' | 'neutral';

export type DiagramLane = {
  id: string;
  title: DiagramText;
  tone: DiagramLaneTone;
  items: DiagramItem[];
  isActive?: boolean;
  parent?: string;
};

export type DiagramStep = {
  caption: LocalizedText;
  lanes: DiagramLane[];
};

export type DiagramLayout = 'columns' | 'chain' | 'tree';

export type Diagram = {
  id: DiagramId;
  layout: DiagramLayout;
  steps: DiagramStep[];
};

export type IllustrationId =
  | 'state-kinds'
  | 'state-id-vs-copy'
  | 'imm-shared-reference'
  | 'imm-array-methods'
  | 'redux-selector-new-array'
  | 'stores-atoms'
  | 'server-query-lifecycle'
  | 'server-race'
  | 'url-anatomy'
  | 'git-three-areas'
  | 'git-status-columns'
  | 'git-branch-pointers'
  | 'git-ff-vs-merge'
  | 'git-conflict-origin'
  | 'git-reset-modes'
  | 'git-rebase-replay'
  | 'html-landmarks'
  | 'html-formdata'
  | 'a11y-name-priority'
  | 'a11y-hidden-vs-inert'
  | 'testing-pyramid-trophy'
  | 'testing-query-variants'
  | 'node-threads'
  | 'node-stream-memory'
  | 'next-file-nesting'
  | 'next-static-shell'
  | 'next-image-cls'
  | 'arch-srp-reasons'
  | 'arch-observer'
  | 'arch-fsd-layers'
  | 'arch-upload-machine'
  | 'arch-dependency-inversion'
  | 'arch-backoff'
  | 'arch-offset-cursor'
  | 'arch-affected-graph'
  | 'ts-type-sets'
  | 'ts-utility-fields';

export type Illustration = {
  id: IllustrationId;
  svg: string;
  labels: Readonly<Record<string, LocalizedText>>;
  alt: LocalizedText;
};

export type ExplanationBlock =
  | { type: 'text'; text: LocalizedText }
  | { type: 'code'; code: CodeSnippet; caption?: LocalizedText }
  | { type: 'diagram'; diagram: DiagramId };

export type QuestionSource = {
  title: string;
  url: string;
};

export type CssProbe = {
  selector: string;
  property: string;
  expected: string;
};

type BrowserProbe = {
  selector: string;
  property: string;
  expected?: string;
  also?: CssProbe[];
  html?: string;
  viewportWidth?: number;
};

export type JsTestsVerification = {
  kind: 'js-tests';
  tests: string;
  before?: string;
  after?: string;
  fixedLine?: string;
};

export type QuestionVerification =
  | { kind: 'js-output' }
  | { kind: 'ts-type'; symbol: string }
  | { kind: 'ts-check'; source: string }
  | { kind: 'ts-error'; code: number }
  | { kind: 'ts-output' }
  | { kind: 'shell-output' }
  | ({ kind: 'css-computed' } & BrowserProbe)
  | ({ kind: 'dom-probe' } & BrowserProbe)
  | JsTestsVerification;

type QuestionBase = {
  id: string;
  topic: TopicId;
  tags: TagId[];
  difficulty: Difficulty;
  popular: boolean;
  prompt: LocalizedText;
  code?: CodeSnippet;
  explanation: ExplanationBlock[];
  sources: QuestionSource[];
};

export type ChoiceQuestion = QuestionBase & {
  kind?: 'choice';
  options: QuestionOptions;
  answer: OptionId;
  verify?: QuestionVerification;
};

export type OrderQuestion = QuestionBase & {
  kind: 'order';
  items: OptionContent[];
  verify?: Extract<QuestionVerification, { kind: 'js-output' | 'shell-output' | 'dom-probe' | 'js-tests' }>;
};

export type BugLineQuestion = QuestionBase & {
  kind: 'bug-line';
  code: CodeSnippet;
  answerLine: number;
  verify?: { kind: 'ts-error-line' } | JsTestsVerification;
};

export type OutputQuestion = QuestionBase & {
  kind: 'output';
  code: CodeSnippet;
  answers: string[];
  verify?: Extract<QuestionVerification, { kind: 'js-output' | 'ts-output' | 'shell-output' | 'css-computed' | 'dom-probe' }>;
};

export type Question = ChoiceQuestion | OrderQuestion | BugLineQuestion | OutputQuestion;

export type QuestionKind = 'choice' | 'order' | 'bug-line' | 'output';

export type QuestionResponse =
  | { kind: 'choice'; option: OptionId }
  | { kind: 'order'; order: number[] }
  | { kind: 'bug-line'; line: number }
  | { kind: 'output'; text: string };

export type InlineCheck = {
  id: string;
  prompt: LocalizedText;
  options: OptionContent[];
  answer: number;
  explanation: LocalizedText;
};

export type LessonBlock =
  | ExplanationBlock
  | { type: 'illustration'; illustration: IllustrationId; caption?: LocalizedText }
  | { type: 'check'; check: InlineCheck };

export type LessonStep = {
  id: string;
  title: LocalizedText;
  blocks: LessonBlock[];
  test: string[];
};

type LessonBase = {
  tag: TagId;
  summary: LocalizedText;
  keyPoints: LocalizedText[];
  sources: QuestionSource[];
};

export type ClassicLesson = LessonBase & {
  format?: undefined;
  blocks: ExplanationBlock[];
};

export type StepLesson = LessonBase & {
  format: 'steps';
  steps: LessonStep[];
};

export type Lesson = ClassicLesson | StepLesson;

export type CourseFinalItem = {
  question: string;
  tag: TagId;
  step: string;
};

export type Course = {
  topic: TopicId;
  final: CourseFinalItem[];
};
