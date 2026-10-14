import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { BugLineAnswer, OPTION_IDS, OPTION_LETTERS, OptionButton, OrderAnswer, OutputAnswer, getOption } from '@app/entities/question';
import { getOptionState } from '../lib/option-state';
import type { AnswerResult } from '@app/entities/progress';
import type { OptionId, Question, QuestionResponse } from '@app/entities/question';

type AnswerAreaProps = {
  question: Question;
  draft: QuestionResponse | null;
  submitted: QuestionResponse | null;
  result: AnswerResult | null;
  isRevealed: boolean;
  optionOrder: OptionId[];
  itemOrder: number[];
  onSelectOption: (option: OptionId) => void;
  onDraftChange: (draft: QuestionResponse) => void;
};

export const AnswerArea = ({
  question,
  draft,
  submitted,
  result,
  isRevealed,
  optionOrder,
  itemOrder,
  onSelectOption,
  onDraftChange,
}: AnswerAreaProps): JSX.Element => {
  const response = isRevealed ? submitted : draft;
  const onChange = isRevealed ? undefined : onDraftChange;

  if (question.kind === 'order') {
    return (
      <OrderAnswer
        question={question}
        displayOrder={itemOrder}
        order={response?.kind === 'order' ? response.order : []}
        isRevealed={isRevealed}
        onChange={onChange && ((order) => onChange({ kind: 'order', order }))}
      />
    );
  }
  if (question.kind === 'bug-line') {
    return (
      <BugLineAnswer
        question={question}
        line={response?.kind === 'bug-line' ? response.line : null}
        isRevealed={isRevealed}
        onChange={onChange && ((line) => onChange({ kind: 'bug-line', line }))}
      />
    );
  }
  if (question.kind === 'output') {
    return (
      <OutputAnswer
        question={question}
        text={response?.kind === 'output' ? response.text : ''}
        isRevealed={isRevealed}
        isCorrect={result === 'correct'}
        onChange={onChange && ((text) => onChange({ kind: 'output', text }))}
      />
    );
  }

  const selected = draft?.kind === 'choice' ? draft.option : null;
  const chosen = submitted?.kind === 'choice' ? submitted.option : null;

  return (
    <View accessibilityRole="radiogroup" style={styles.options}>
      {optionOrder.map((optionId, position) => (
        <OptionButton
          key={optionId}
          letter={OPTION_LETTERS[OPTION_IDS[position] ?? optionId]}
          option={getOption(question, optionId)}
          state={getOptionState({ optionId, isRevealed, selected, correct: question.answer, chosen })}
          onPress={isRevealed ? undefined : () => onSelectOption(optionId)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  options: {
    gap: 10,
  },
});
