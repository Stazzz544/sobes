import { OPTION_IDS, OPTION_LETTERS, getOption, getOptionText, isChoiceQuestion } from '@app/entities/question';
import { DICTIONARIES, translate } from '@app/shared/i18n';
import type { OptionContent, OptionId, Question, QuestionResponse } from '@app/entities/question';
import type { Dictionary, Locale } from '@app/shared/i18n';

const formatItems = (items: (OptionContent | undefined)[], locale: Locale): string[] =>
  items.map((item, index) => `${index + 1}. ${item ? getOptionText(item, locale) : ''}`);

const describeAnswer = (question: Question, locale: Locale, dictionary: Dictionary): string[] => {
  if (question.kind === 'order') {
    return [`${translate(dictionary, 'askAi.promptCorrectOrder')}:`, ...formatItems(question.items, locale)];
  }
  if (question.kind === 'bug-line') {
    return [`${translate(dictionary, 'askAi.promptBugLine')}: ${question.answerLine}`];
  }
  if (question.kind === 'output') {
    return [`${translate(dictionary, 'askAi.promptCorrectOutput')}: ${question.answers[0] ?? ''}`];
  }
  return [];
};

const describeMine = (question: Question, response: QuestionResponse, locale: Locale, dictionary: Dictionary): string[] => {
  const mine = translate(dictionary, 'askAi.promptMine');
  if (response.kind === 'order' && question.kind === 'order') {
    return [`${mine}:`, ...formatItems(response.order.map((itemIndex) => question.items[itemIndex]), locale)];
  }
  if (response.kind === 'bug-line') {
    return [`${mine}: ${response.line}`];
  }
  if (response.kind === 'output') {
    return [`${mine}: ${response.text}`];
  }
  return [];
};

const formatCode = (question: Question): string => {
  if (!question.code) {
    return '';
  }
  if (question.kind !== 'bug-line') {
    return question.code.source;
  }
  return question.code.source
    .split('\n')
    .map((line, index) => `${index + 1} | ${line}`)
    .join('\n');
};

export const buildAiPrompt = (question: Question, response: QuestionResponse | null | undefined, locale: Locale): string => {
  const dictionary = DICTIONARIES[locale];
  const lines = [
    translate(dictionary, 'askAi.promptIntro'),
    '',
    `${translate(dictionary, 'askAi.promptQuestion')}: ${question.prompt[locale]}`,
  ];
  if (question.code) {
    lines.push('', '```' + question.code.lang, formatCode(question), '```');
  }
  if (isChoiceQuestion(question)) {
    const formatOption = (optionId: OptionId): string =>
      `${OPTION_LETTERS[optionId]}) ${getOptionText(getOption(question, optionId), locale)}`;
    lines.push('', `${translate(dictionary, 'askAi.promptOptions')}:`, ...OPTION_IDS.map(formatOption));
    lines.push('', `${translate(dictionary, 'askAi.promptCorrect')}: ${formatOption(question.answer)}`);
    if (response?.kind === 'choice') {
      lines.push(`${translate(dictionary, 'askAi.promptMine')}: ${formatOption(response.option)}`);
    }
  } else {
    lines.push('', ...describeAnswer(question, locale, dictionary));
    if (response) {
      lines.push(...describeMine(question, response, locale, dictionary));
    }
  }
  if (response === null) {
    lines.push(translate(dictionary, 'askAi.promptDontKnow'));
  }
  lines.push('', translate(dictionary, 'askAi.promptOutro'));
  return lines.join('\n');
};
