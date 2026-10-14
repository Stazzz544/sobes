import { createEvent, createStore, sample } from 'effector';
import { topicModel } from '@app/entities/topic';
import { trackEventFx } from '@app/shared/analytics';
import type { TopicSelection } from '@app/entities/topic';
import type { AnalyticsEvent } from '@app/shared/analytics';

const menuToggled = createEvent();
const menuClosed = createEvent();
const topicPicked = createEvent<TopicSelection>();

const $isMenuOpen = createStore(false);

sample({ clock: menuToggled, source: $isMenuOpen, fn: (isOpen) => !isOpen, target: $isMenuOpen });
sample({ clock: menuClosed, fn: () => false, target: $isMenuOpen });
// объявлен до смены темы: source, объявленный позже, уже видит новую тему
sample({
  clock: topicPicked,
  source: topicModel.$currentTopic,
  fn: (previous, topic): AnalyticsEvent => ({ name: 'topic_selected', params: { topic, previous } }),
  target: trackEventFx,
});
sample({ clock: topicPicked, target: [topicModel.topicSelected, menuClosed] });

export const topicMenuModel = { $isMenuOpen, menuToggled, menuClosed, topicPicked };
