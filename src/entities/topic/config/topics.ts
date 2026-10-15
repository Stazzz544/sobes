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
  html: {
    id: 'html',
    accent: 'html',
    shortTitle: 'HTML',
    title: { ru: 'HTML и доступность', en: 'HTML & accessibility' },
    description: {
      ru: 'Семантика, формы, разбор HTML, доступное имя, ARIA, клавиатура и фокус',
      en: 'Semantics, forms, HTML parsing, accessible names, ARIA, keyboard and focus',
    },
  },
  testing: {
    id: 'testing',
    accent: 'testing',
    shortTitle: 'Tests',
    title: { ru: 'Тестирование', en: 'Testing' },
    description: {
      ru: 'Пирамида тестов, матчеры, моки и таймеры, Testing Library, E2E, TDD',
      en: 'The test pyramid, matchers, mocks and timers, Testing Library, E2E, TDD',
    },
  },
  state: {
    id: 'state',
    accent: 'state',
    shortTitle: 'State',
    title: { ru: 'Стейт-менеджмент', en: 'State management' },
    description: {
      ru: 'Где хранить состояние, иммутабельность, Redux, сторы и селекторы, серверное состояние, URL',
      en: 'Where state lives, immutability, Redux, stores and selectors, server state, the URL',
    },
  },
  node: {
    id: 'node',
    accent: 'node',
    shortTitle: 'Node',
    title: { ru: 'Node.js', en: 'Node.js' },
    description: {
      ru: 'Рантайм и потоки, модули и npm, event loop, асинхронность и ошибки, буферы и стримы, HTTP и Express',
      en: 'Runtime and threads, modules and npm, the event loop, async and errors, buffers and streams, HTTP and Express',
    },
  },
  next: {
    id: 'next',
    accent: 'next',
    shortTitle: 'Next',
    title: { ru: 'Next.js', en: 'Next.js' },
    description: {
      ru: 'App Router и файлы маршрутов, рендеринг и гидрация, серверные и клиентские компоненты, данные и кеш, Server Actions, оптимизация',
      en: 'App Router and route files, rendering and hydration, Server and Client Components, data and caching, Server Actions, optimization',
    },
  },
  architecture: {
    id: 'architecture',
    accent: 'architecture',
    shortTitle: 'Arch',
    title: { ru: 'Архитектура и паттерны', en: 'Architecture & patterns' },
    description: {
      ru: 'SOLID и принципы, паттерны, архитектура фронтенда и FSD, зависимости и DI, монорепо и микрофронтенды, слой данных',
      en: 'SOLID and principles, patterns, frontend architecture and FSD, dependencies and DI, monorepos and micro-frontends, the data layer',
    },
  },
  git: {
    id: 'git',
    accent: 'git',
    shortTitle: 'Git',
    title: { ru: 'Git', en: 'Git' },
    description: {
      ru: 'Коммиты и индекс, ветки и merge, rebase, отмена изменений, удалённые репозитории, конфликты',
      en: 'Commits and the index, branches and merge, rebase, undoing changes, remotes, conflicts',
    },
  },
  hr: {
    id: 'hr',
    accent: 'hr',
    shortTitle: 'HR',
    title: { ru: 'HR и поведенческое интервью', en: 'HR & behavioral interview' },
    description: {
      ru: 'Рассказ о себе, метод STAR, трудные вопросы, мотивация и зарплата, вопросы работодателю',
      en: 'Self-introduction, the STAR method, tough questions, motivation and salary, questions to ask',
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
