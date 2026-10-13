import { JSX } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { QuestionReview } from '@app/widgets/question-review';

export default function QuestionScreen(): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <QuestionReview questionId={id ?? ''} />;
}
