import { JSX } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { isQuizMode, isTagId } from '@app/entities/question';
import { TOPIC_SELECTIONS } from '@app/shared/config';
import { QuizSession } from '@app/widgets/quiz-session';
import type { TopicSelection } from '@app/shared/config';

export default function QuizScreen(): JSX.Element {
  const params = useLocalSearchParams<{ mode?: string; topic?: string; tag?: string }>();
  const mode = isQuizMode(params.mode) ? params.mode : 'practice';
  const topic: TopicSelection = TOPIC_SELECTIONS.find((selection) => selection === params.topic) ?? 'all';
  const tag = isTagId(params.tag) ? params.tag : null;

  return (
    <QuizSession
      params={{ mode, topic, tag }}
      onOpenQuestion={(questionId) => router.push({ pathname: '/question/[id]', params: { id: questionId } })}
      onOpenLesson={(lessonTag, step) =>
        router.push({ pathname: '/lesson/[tag]', params: { tag: lessonTag, ...(step ? { step, from: 'test' } : {}) } })
      }
      onNextLesson={(lessonTag) => router.replace({ pathname: '/lesson/[tag]', params: { tag: lessonTag } })}
      onCourseTest={(courseTopic) => router.replace({ pathname: '/quiz', params: { mode: 'course-test', topic: courseTopic } })}
      onOpenPath={(pathTopic) => router.replace({ pathname: '/path/[topic]', params: { topic: pathTopic } })}
      onDone={() => router.back()}
    />
  );
}
