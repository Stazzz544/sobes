import type { OptionId, OptionState } from '@app/entities/question';

type OptionStateInput = {
  optionId: OptionId;
  isRevealed: boolean;
  selected: OptionId | null;
  correct: OptionId;
  chosen: OptionId | null;
};

export const getOptionState = ({ optionId, isRevealed, selected, correct, chosen }: OptionStateInput): OptionState => {
  if (!isRevealed) {
    return optionId === selected ? 'selected' : 'idle';
  }
  if (optionId === correct) {
    return 'correct';
  }
  if (optionId === chosen) {
    return 'wrong';
  }
  return 'dimmed';
};
