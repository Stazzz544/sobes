import { createEffect, createEvent, createStore, sample } from 'effector';
import { STORAGE_KEYS, TOPIC_SELECTIONS } from '@app/shared/config';
import { storage } from '@app/shared/lib';
import type { TopicSelection } from './types';

const DEFAULT_TOPIC: TopicSelection = 'javascript';

const isTopicSelection = (value: unknown): value is TopicSelection =>
  TOPIC_SELECTIONS.some((selection) => selection === value);

const currentTopicLoaded = createEvent();
const topicSelected = createEvent<TopicSelection>();

const $currentTopic = createStore<TopicSelection>(DEFAULT_TOPIC);
const $isLoaded = createStore(false);

const loadTopicFx = createEffect(async (): Promise<TopicSelection> => {
  const saved = await storage.get<unknown>(STORAGE_KEYS.CURRENT_TOPIC);
  return isTopicSelection(saved) ? saved : DEFAULT_TOPIC;
});

const saveTopicFx = createEffect(async (topic: TopicSelection) => storage.set(STORAGE_KEYS.CURRENT_TOPIC, topic));

sample({ clock: currentTopicLoaded, target: loadTopicFx });
sample({ clock: loadTopicFx.doneData, target: $currentTopic });
sample({ clock: loadTopicFx.finally, fn: () => true, target: $isLoaded });
sample({ clock: topicSelected, target: [$currentTopic, saveTopicFx] });

export const topicModel = { $currentTopic, $isLoaded, currentTopicLoaded, topicSelected };
