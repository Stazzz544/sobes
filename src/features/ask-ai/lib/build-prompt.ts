import { OPTION_IDS, OPTION_LETTERS, getOption, getOptionText } from '@app/entities/question';
import { DICTIONARIES, translate } from '@app/shared/i18n';
import type { OptionId, Question } from '@app/entities/question';
import type { Locale } from '@app/shared/i18n';

export const buildAiPrompt = (question: Question, chosen: OptionId | null | undefined, locale: Locale): string => {
  const dictionary = DICTIONARIES[locale];
  const formatOption = (optionId: OptionId): string =>
    `${OPTION_LETTERS[optionId]}) ${getOptionText(getOption(question, optionId), locale)}`;
  const lines = [
    translate(dictionary, 'askAi.promptIntro'),
    '',
    `${translate(dictionary, 'askAi.promptQuestion')}: ${question.prompt[locale]}`,
  ];
  if (question.code) {
    lines.push('', '```' + question.code.lang, question.code.source, '```');
  }
  lines.push('', `${translate(dictionary, 'askAi.promptOptions')}:`, ...OPTION_IDS.map(formatOption));
  lines.push('', `${translate(dictionary, 'askAi.promptCorrect')}: ${formatOption(question.answer)}`);
  if (chosen === null) {
    lines.push(translate(dictionary, 'askAi.promptDontKnow'));
  }
  if (chosen) {
    lines.push(`${translate(dictionary, 'askAi.promptMine')}: ${formatOption(chosen)}`);
  }
  lines.push('', translate(dictionary, 'askAi.promptOutro'));
  return lines.join('\n');
};
