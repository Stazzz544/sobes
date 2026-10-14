import type { ChoiceQuestion, Question, QuestionKind, QuestionResponse } from '../model/types';

export const isChoiceQuestion = (question: Question): question is ChoiceQuestion =>
  question.kind === undefined || question.kind === 'choice';

export const getQuestionKind = (question: Question): QuestionKind => question.kind ?? 'choice';

export const normalizeOutput = (value: string): string => value.replace(/\s+/g, '');

export const isResponseComplete = (question: Question, response: QuestionResponse | null): boolean => {
  if (response === null) {
    return false;
  }
  if (response.kind === 'order') {
    return question.kind === 'order' && response.order.length === question.items.length;
  }
  if (response.kind === 'output') {
    return response.text.trim().length > 0;
  }
  return true;
};

export const isResponseCorrect = (question: Question, response: QuestionResponse): boolean => {
  if (response.kind === 'choice') {
    return isChoiceQuestion(question) && response.option === question.answer;
  }
  if (response.kind === 'order') {
    return (
      question.kind === 'order' &&
      response.order.length === question.items.length &&
      response.order.every((itemIndex, position) => itemIndex === position)
    );
  }
  if (response.kind === 'bug-line') {
    return question.kind === 'bug-line' && response.line === question.answerLine;
  }
  return (
    question.kind === 'output' &&
    question.answers.some((answer) => normalizeOutput(answer) === normalizeOutput(response.text))
  );
};

export const describeResponse = (response: QuestionResponse | null): string => {
  if (response === null) {
    return 'none';
  }
  if (response.kind === 'choice') {
    return response.option;
  }
  if (response.kind === 'order') {
    return `order:${response.order.join('-')}`;
  }
  if (response.kind === 'bug-line') {
    return `line:${response.line}`;
  }
  return 'text';
};
