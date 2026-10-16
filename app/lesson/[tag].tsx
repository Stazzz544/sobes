import { JSX } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { isTagId, TAGS } from '@app/entities/question';
import { LessonView } from '@app/widgets/lesson-view';

export default function LessonScreen(): JSX.Element {
  const params = useLocalSearchParams<{ tag?: string; step?: string; from?: string }>();
  const tag = isTagId(params.tag) ? params.tag : null;

  return (
    <LessonView
      tag={tag}
      initialStepId={params.step ?? null}
      isFromTest={params.from === 'test'}
      onPractice={(practiceTag) =>
        router.push({ pathname: '/quiz', params: { mode: 'practice', topic: TAGS[practiceTag].topic, tag: practiceTag } })
      }
      onStartTest={(testTag) =>
        router.push({ pathname: '/quiz', params: { mode: 'lesson-test', topic: TAGS[testTag].topic, tag: testTag } })
      }
      onBackToTest={() => router.back()}
    />
  );
}
