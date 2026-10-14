import type { TopicId } from '@app/shared/config';
import type { LocalizedText } from '@app/shared/i18n';
import type { CodeLanguage } from '@app/shared/ui';
import type { TagId } from '../config/tags';

export type QuizMode = 'practice' | 'popular' | 'hard' | 'interview' | 'mistakes' | 'review';

export const QUIZ_MODES: readonly QuizMode[] = ['practice', 'popular', 'hard', 'interview', 'mistakes', 'review'];

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
  | 'recursion-stack';

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
};

export type DiagramStep = {
  caption: LocalizedText;
  lanes: DiagramLane[];
};

export type Diagram = {
  id: DiagramId;
  layout: 'columns' | 'chain';
  steps: DiagramStep[];
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

export type QuestionVerification =
  | { kind: 'js-output' }
  | { kind: 'ts-type'; symbol: string }
  | { kind: 'ts-check'; source: string }
  | { kind: 'ts-error'; code: number }
  | { kind: 'ts-output' }
  | {
      kind: 'css-computed';
      selector: string;
      property: string;
      expected?: string;
      also?: CssProbe[];
      html?: string;
      viewportWidth?: number;
    };

export type Question = {
  id: string;
  topic: TopicId;
  tags: TagId[];
  difficulty: Difficulty;
  popular: boolean;
  prompt: LocalizedText;
  code?: CodeSnippet;
  options: QuestionOptions;
  answer: OptionId;
  explanation: ExplanationBlock[];
  sources: QuestionSource[];
  verify?: QuestionVerification;
};

export type Lesson = {
  tag: TagId;
  summary: LocalizedText;
  blocks: ExplanationBlock[];
  keyPoints: LocalizedText[];
  sources: QuestionSource[];
};
