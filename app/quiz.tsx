import { JSX } from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { isQuizMode, isTagId } from '@app/entities/question';
import { TOPIC_SELECTIONS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { QuizSession } from '@app/widgets/quiz-session';
import type { TopicSelection } from '@app/shared/config';

export default function QuizScreen(): JSX.Element {
  const { t } = useI18n();
  const params = useLocalSearchParams<{ mode?: string; topic?: string; tag?: string }>();
  const mode = isQuizMode(params.mode) ? params.mode : 'practice';
  const topic: TopicSelection = TOPIC_SELECTIONS.find((selection) => selection === params.topic) ?? 'all';
  const tag = isTagId(params.tag) ? params.tag : null;

  return (
    <>
      <Stack.Screen options={{ title: t(`home.modes.${mode}.title`) }} />
      <QuizSession
        params={{ mode, topic, tag }}
        onOpenQuestion={(questionId) => router.push({ pathname: '/question/[id]', params: { id: questionId } })}
        onOpenLesson={(tag) => router.push({ pathname: '/lesson/[tag]', params: { tag } })}
        onDone={() => router.back()}
      />
    </>
  );
}
