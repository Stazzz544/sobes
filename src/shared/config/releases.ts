import type { LocalizedText } from '@app/shared/i18n';

export type Release = {
  version: string;
  date: string;
  changes: LocalizedText[];
};

export const RELEASES: readonly Release[] = [
  {
    version: '1.14.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Новая тема «Next.js»: App Router и файлы маршрутов, рендеринг и гидрация, серверные и клиентские компоненты, данные и кеш, Server Actions, оптимизация.',
        en: 'New topic “Next.js”: App Router and route files, rendering and hydration, Server and Client Components, data and caching, Server Actions, optimization.',
      },
      { ru: '22 вопроса и 6 конспектов по актуальной версии Next.js 16 — всего 488 вопросов.', en: '22 questions and 6 lessons for the current Next.js 16 — 488 questions in total.' },
    ],
  },
  {
    version: '1.13.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Новая тема «Node.js»: рантайм и потоки, модули и npm, event loop, асинхронность и ошибки, буферы и потоки, HTTP и Express.',
        en: 'New topic “Node.js”: runtime and threads, modules and npm, the event loop, async and errors, buffers and streams, HTTP and Express.',
      },
      { ru: '23 вопроса и 6 конспектов — всего 466 вопросов.', en: '23 questions and 6 lessons — 466 questions in total.' },
    ],
  },
  {
    version: '1.12.0',
    date: '2026-10-14',
    changes: [
      {
        ru: '13 новых вопросов о производительности: INP и длинные задачи, ленивая загрузка и LCP, debounce и throttle, виртуализация списков, passive-слушатели, srcset, font-display, Web Worker, мемоизация, Set вместо includes, лабораторные и полевые метрики, useDeferredValue — всего 443 вопроса.',
        en: '13 new performance questions: INP and long tasks, lazy loading and LCP, debounce and throttle, list virtualization, passive listeners, srcset, font-display, Web Worker, memoization, Set instead of includes, lab vs field metrics, useDeferredValue — 443 questions in total.',
      },
    ],
  },
  {
    version: '1.11.0',
    date: '2026-10-14',
    changes: [
      {
        ru: '12 новых вопросов о безопасности фронтенда: JWT, хранение токена, санитизация HTML, SRI, postMessage, open redirect, prototype pollution, CSP nonce, CORS с cookie — всего 430 вопросов.',
        en: '12 new frontend security questions: JWT, token storage, HTML sanitizing, SRI, postMessage, open redirect, prototype pollution, CSP nonce, CORS with cookies — 430 questions in total.',
      },
    ],
  },
  {
    version: '1.10.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Новая тема «Стейт-менеджмент»: где хранить состояние, иммутабельность, Redux, сторы и селекторы, серверное состояние, URL.',
        en: 'New topic “State management”: where state lives, immutability, Redux, stores and selectors, server state, the URL.',
      },
      { ru: '18 вопросов и 6 конспектов — всего 418 вопросов.', en: '18 questions and 6 lessons — 418 questions in total.' },
    ],
  },
  {
    version: '1.9.0',
    date: '2026-10-14',
    changes: [
      {
        ru: '12 новых вопросов о браузере и сети: origin, SameSite-cookie, Service Worker, HSTS, редиректы, IndexedDB и другое — всего 400 вопросов.',
        en: '12 new questions on the browser and network: origins, SameSite cookies, Service Workers, HSTS, redirects, IndexedDB and more — 400 questions in total.',
      },
    ],
  },
  {
    version: '1.8.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Новая тема «Тестирование»: пирамида тестов, матчеры, моки и таймеры, Testing Library, E2E и TDD.',
        en: 'New topic “Testing”: the test pyramid, matchers, mocks and timers, Testing Library, E2E and TDD.',
      },
      { ru: '20 вопросов и 6 конспектов — всего 388 вопросов.', en: '20 questions and 6 lessons — 388 questions in total.' },
    ],
  },
  {
    version: '1.7.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Новая тема «HTML и доступность»: семантика, формы, как браузер разбирает HTML, доступное имя, ARIA, клавиатура и фокус.',
        en: 'New topic “HTML & accessibility”: semantics, forms, how browsers parse HTML, accessible names, ARIA, keyboard and focus.',
      },
      {
        ru: '23 вопроса и 6 конспектов; ответы про DOM и доступное имя проверены в Chrome — всего 368 вопросов.',
        en: '23 questions and 6 lessons; answers about the DOM and accessible names are checked in Chrome — 368 questions in total.',
      },
    ],
  },
  {
    version: '1.6.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Новая тема «Git»: индекс и коммиты, ветки и merge, rebase, отмена изменений, удалённые репозитории, конфликты.',
        en: 'New topic “Git”: the index and commits, branches and merge, rebase, undoing changes, remotes, conflicts.',
      },
      {
        ru: '23 вопроса и 6 конспектов по Git; ответы на вопросы с командами проверены реальным запуском git — всего 345 вопросов.',
        en: '23 Git questions and 6 lessons; answers to command questions are checked by actually running git — 345 questions in total.',
      },
    ],
  },
  {
    version: '1.5.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Новая тема «HR и поведенческое интервью»: рассказ о себе, метод STAR, трудные вопросы, зарплата, вопросы работодателю.',
        en: 'New topic “HR & behavioral interview”: self-introduction, STAR, tough questions, salary, questions to ask.',
      },
      { ru: '28 вопросов и 6 конспектов по HR — всего 322 вопроса.', en: '28 HR questions and 6 lessons — 322 questions in total.' },
    ],
  },
  {
    version: '1.4.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Итог тренировки можно отправить картинкой: тема, результат и уровень.',
        en: 'Share your session result as an image: topic, score and level.',
      },
    ],
  },
  {
    version: '1.3.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Темы сгруппированы по направлениям в выборе темы и статистике — пока это «Фронтенд».',
        en: 'Topics are grouped by track in the topic picker and stats — for now, “Front-end”.',
      },
      {
        ru: 'Исправлено: в «Слабых местах» на узком экране название темы больше не разрывается посреди слова.',
        en: 'Fixed: on narrow screens, tag names in “Weak spots” no longer break mid-word.',
      },
    ],
  },
  {
    version: '1.2.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Напоминание о тренировке раз в день в выбранное время — включается в настройках.',
        en: 'A daily practice reminder at the time you choose — turn it on in Settings.',
      },
      {
        ru: 'В напоминании — сколько вопросов ждут повторения; если цель на день выполнена, оно не приходит.',
        en: 'The reminder shows how many questions are due for review and is skipped once today’s goal is done.',
      },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Новые типы вопросов: «Расставь по порядку», «Найди строку с ошибкой» и «Впиши вывод».',
        en: 'New question types: “Put in order”, “Find the buggy line” and “Type the output”.',
      },
      { ru: '19 новых вопросов во всех темах — всего 294.', en: '19 new questions across all topics — 294 in total.' },
      { ru: 'История версий в настройках — «Что нового».', en: 'Version history in Settings — “What’s new”.' },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Глоссарий: термины в пояснениях и конспектах открывают карточку с определением.',
        en: 'Glossary: terms in explanations and lessons open a card with the definition.',
      },
      { ru: 'Тексты и скриншоты для RuStore.', en: 'Store listing texts and screenshots for RuStore.' },
    ],
  },
  {
    version: '0.5.0',
    date: '2026-10-14',
    changes: [
      { ru: 'Конспекты по всем 73 темам вопросов.', en: 'Lessons for all 73 question tags.' },
      {
        ru: 'Путь по каждому направлению — от основ к сложному, с входным тестом.',
        en: 'A learning path for each topic, from basics to advanced, with a placement test.',
      },
      { ru: 'Достижения в статистике.', en: 'Achievements in Stats.' },
    ],
  },
  {
    version: '0.4.0',
    date: '2026-10-14',
    changes: [
      { ru: 'Интервальное повторение: карточка «Повторить сегодня».', en: 'Spaced repetition: the “Review today” card.' },
      {
        ru: 'Цель на день и серия дней с заморозкой раз в неделю.',
        en: 'Daily goal and a day streak with a weekly freeze.',
      },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-10-14',
    changes: [
      {
        ru: 'Анонимная статистика и отчёты о сбоях — можно выключить в настройках.',
        en: 'Anonymous usage stats and crash reports — can be turned off in Settings.',
      },
      { ru: 'Экран ошибки вместо падения приложения.', en: 'An error screen instead of a crash.' },
      { ru: 'Политика конфиденциальности.', en: 'Privacy policy.' },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-10-13',
    changes: [
      {
        ru: 'Новые темы: CSS с проверкой в браузере, алгоритмы, ИИ и LLM.',
        en: 'New topics: CSS verified in a real browser, algorithms, AI and LLMs.',
      },
      { ru: 'Выбор темы в шапке и новая иконка.', en: 'Topic picker in the header and a new icon.' },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-10-13',
    changes: [
      {
        ru: 'Первая версия: вопросы по JavaScript, TypeScript, React и Web с разбором и источниками.',
        en: 'First version: JavaScript, TypeScript, React and Web questions with explanations and sources.',
      },
      {
        ru: 'Режимы: практика, популярные, сложные, собеседование на время, работа над ошибками.',
        en: 'Modes: practice, popular, hard, timed interview, mistakes review.',
      },
      {
        ru: 'Статистика, светлая и тёмная тема, русский и английский.',
        en: 'Stats, light and dark themes, Russian and English.',
      },
    ],
  },
];
