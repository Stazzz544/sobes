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
  css: {
    id: 'css',
    accent: 'css',
    shortTitle: 'CSS',
    title: { ru: 'CSS', en: 'CSS' },
    description: {
      ru: 'Каскад и специфичность, блочная модель, Flexbox, Grid, позиционирование, современный CSS',
      en: 'Cascade and specificity, box model, Flexbox, Grid, positioning, modern CSS',
    },
  },
  ai: {
    id: 'ai',
    accent: 'ai',
    shortTitle: 'AI',
    title: { ru: 'ИИ и LLM', en: 'AI & LLMs' },
    description: {
      ru: 'LLM, промпты, RAG, агенты, безопасность и ИИ во фронтенде',
      en: 'LLMs, prompting, RAG, agents, safety and AI in the frontend',
    },
  },
  algorithms: {
    id: 'algorithms',
    accent: 'algorithms',
    shortTitle: 'Algo',
    title: { ru: 'Алгоритмы', en: 'Algorithms' },
    description: {
      ru: 'Big-O, структуры данных, поиск и сортировки, рекурсия, классические задачи',
      en: 'Big-O, data structures, searching and sorting, recursion, classic problems',
    },
  },
};

export const getSelectionAccent = (selection: TopicSelection): AccentName =>
  selection === 'all' ? 'brand' : TOPICS[selection].accent;
