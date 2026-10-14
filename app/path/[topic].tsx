import { JSX } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { TOPIC_IDS } from '@app/shared/config';
import { TopicPathView } from '@app/widgets/topic-path';

export default function PathScreen(): JSX.Element {
  const params = useLocalSearchParams<{ topic?: string }>();
  const topic = TOPIC_IDS.find((id) => id === params.topic) ?? 'javascript';

  return (
    <TopicPathView topic={topic} onOpenLesson={(tag) => router.push({ pathname: '/lesson/[tag]', params: { tag } })} />
  );
}
