import { JSX } from 'react';
import { router } from 'expo-router';
import { MistakesList } from '@app/widgets/mistakes-list';

export default function MistakesScreen(): JSX.Element {
  return (
    <MistakesList
      onOpenQuestion={(questionId) => router.push({ pathname: '/question/[id]', params: { id: questionId } })}
      onReview={(topic) => router.push({ pathname: '/quiz', params: { mode: 'mistakes', topic } })}
    />
  );
}
