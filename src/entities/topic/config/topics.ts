import type { AccentName } from '@app/shared/theme';
import type { Topic, TopicId, TopicSelection } from '../model/types';

export const TOPICS: Record<TopicId, Topic> = {
  javascript: {
    id: 'javascript',
    accent: 'javascript',
    shortTitle: 'JS',
    title: { ru: 'JavaScript', en: 'JavaScript' },
    description: {
      ru: 'Типы, замыкания, this, прототипы, event loop, промисы',
      en: 'Types, closures, this, prototypes, event loop, promises',
    },
  },
  typescript: {
    id: 'typescript',
    accent: 'typescript',
    shortTitle: 'TS',
    title: { ru: 'TypeScript', en: 'TypeScript' },
    description: {
      ru: 'Сужение типов, дженерики, utility и conditional types',
      en: 'Narrowing, generics, utility and conditional types',
    },
  },
  react: {
    id: 'react',
    accent: 'react',
    shortTitle: 'React',
    title: { ru: 'React', en: 'React' },
    description: {
      ru: 'Рендер, хуки, эффекты, мемоизация, React 19',
      en: 'Rendering, hooks, effects, memoization, React 19',
    },
  },
  web: {
    id: 'web',
    accent: 'web',
    shortTitle: 'Web',
    title: { ru: 'Общие знания', en: 'General web' },
    description: {
      ru: 'HTTP, браузер, безопасность, CSS, производительность, деплой',
      en: 'HTTP, browser, security, CSS, performance, deployment',
    },
  },
};

export const getSelectionAccent = (selection: TopicSelection): AccentName =>
  selection === 'all' ? 'brand' : TOPICS[selection].accent;
