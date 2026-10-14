export { QUIZ_MODES, OPTION_IDS } from './model/types';
export { TAGS } from './config/tags';
export { TOPIC_PATHS } from './config/paths';
export { QUESTIONS, QUESTIONS_BY_ID } from './data';
export { LESSON_GROUPS, LESSONS_BY_TAG } from './lessons';
export { GLOSSARY } from './glossary/glossary';
export { OPTION_LETTERS, getOption, getOptionText } from './lib/options';
export { isQuizMode, isTagId } from './lib/guards';
export {
  describeResponse,
  getQuestionKind,
  isChoiceQuestion,
  isResponseComplete,
  isResponseCorrect,
  normalizeOutput,
} from './lib/evaluate';
export type {
  BugLineQuestion,
  ChoiceQuestion,
  CodeSnippet,
  Difficulty,
  ExplanationBlock,
  Lesson,
  OptionContent,
  OptionId,
  OrderQuestion,
  OutputQuestion,
  Question,
  QuestionKind,
  QuestionResponse,
  QuestionSource,
  QuizMode,
} from './model/types';
export type { TagId } from './config/tags';
export { OptionButton } from './ui/option-button';
export { QuestionView } from './ui/question-view';
export { ExplanationBlocks, ExplanationView, SourceList } from './ui/explanation-view';
export type { OptionState } from './ui/option-button';
export { OrderAnswer } from './ui/order-answer';
export { BugLineAnswer } from './ui/bug-line-answer';
export { OutputAnswer } from './ui/output-answer';
