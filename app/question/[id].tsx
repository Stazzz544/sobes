import { JSX } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { QuestionReview } from '@app/widgets/question-review';

export default function QuestionScreen(): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <QuestionReview
      questionId={id ?? ''}
      onOpenLesson={(tag, step) => router.push({ pathname: '/lesson/[tag]', params: { tag, ...(step ? { step } : {}) } })}
    />
  );
}
