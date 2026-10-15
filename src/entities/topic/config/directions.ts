import type { Direction, DirectionId, TopicId } from '../model/types';

export const DIRECTIONS: Record<DirectionId, Direction> = {
  frontend: {
    id: 'frontend',
    title: { ru: 'Фронтенд', en: 'Front-end' },
    role: { ru: 'фронтенд-разработчика', en: 'front-end developer' },
    topics: ['javascript', 'typescript', 'react', 'web', 'css', 'ai', 'algorithms', 'html', 'testing', 'state', 'node', 'next', 'architecture', 'git', 'hr'],
  },
};

export const getTopicDirection = (topic: TopicId): Direction =>
  Object.values(DIRECTIONS).find((direction) => direction.topics.includes(topic)) ?? DIRECTIONS.frontend;
