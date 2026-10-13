import { createEvent, createStore, sample } from 'effector';
import { topicModel } from '@app/entities/topic';
import type { TopicSelection } from '@app/entities/topic';

const menuToggled = createEvent();
const menuClosed = createEvent();
const topicPicked = createEvent<TopicSelection>();

const $isMenuOpen = createStore(false);

sample({ clock: menuToggled, source: $isMenuOpen, fn: (isOpen) => !isOpen, target: $isMenuOpen });
sample({ clock: menuClosed, fn: () => false, target: $isMenuOpen });
sample({ clock: topicPicked, target: [topicModel.topicSelected, menuClosed] });

export const topicMenuModel = { $isMenuOpen, menuToggled, menuClosed, topicPicked };
