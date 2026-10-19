import type { LocalizedText } from '@app/shared/i18n';

export type Release = {
  version: string;
  date: string;
  changes: LocalizedText[];
};

export const RELEASES: readonly Release[] = [
  {
    version: '1.67.0',
    date: '2026-10-19',
    changes: [
      {
        ru: 'Курс «TypeScript»: все 10 уроков стали пошаговыми — от `any`, `unknown` и `never` до условных типов. Схемы сужения типа и распределения условного типа по объединению, картинки «множества типов» и «Pick, Omit, Partial», «Проверь себя», тест по каждому уроку и итоговый тест курса. Пять новых вопросов: `satisfies`, `keyof typeof` и явный аргумент типа.',
        en: 'The TypeScript course: all 10 lessons are now step by step — from `any`, `unknown` and `never` to conditional types. Diagrams of type narrowing and a conditional type distributing over a union, pictures of “type sets” and “Pick, Omit, Partial”, “Check yourself”, a test per lesson and a final course test. Five new questions: `satisfies`, `keyof typeof` and an explicit type argument.',
      },
    ],
  },
  {
    version: '1.66.0',
    date: '2026-10-19',
    changes: [
      {
        ru: 'Курс «Архитектура»: все 6 уроков стали пошаговыми — SOLID и принципы, паттерны, архитектура фронтенда, зависимости и DI, слой данных, масштабирование. Схемы слоёв FSD, инверсии зависимостей, луковицы middleware, пути данных от API до компонента и миграции маршрут за маршрутом, «Проверь себя», тест по каждому уроку и итоговый тест курса.',
        en: 'The Architecture course: all 6 lessons are now step by step — SOLID and principles, patterns, frontend architecture, dependencies and DI, the data layer, scaling. Diagrams of FSD layers, dependency inversion, the middleware onion, data flow from API to component and route-by-route migration, “Check yourself”, a test per lesson and a final course test.',
      },
    ],
  },
  {
    version: '1.65.0',
    date: '2026-10-19',
    changes: [
      {
        ru: 'Курс «Next.js»: все 6 уроков стали пошаговыми — маршруты App Router, серверные и клиентские компоненты, рендеринг и гидрация, данные и кеш, Server Actions и API, оптимизация. Схемы вложенности файлов, границы клиента, водопада запросов и пути Server Action, «Проверь себя», тест по каждому уроку и итоговый тест курса.',
        en: 'The Next.js course: all 6 lessons are now step by step — App Router routes, server and client components, rendering and hydration, data and cache, Server Actions and APIs, optimization. Diagrams of file nesting, the client boundary, a request waterfall and a Server Action’s path, “Check yourself”, a test per lesson and a final course test.',
      },
    ],
  },
  {
    version: '1.64.0',
    date: '2026-10-19',
    changes: [
      {
        ru: 'Курс «Node.js»: все 6 уроков стали пошаговыми — рантайм и потоки, модули и npm, event loop, асинхронность и ошибки, буферы и потоки, HTTP и Express. Схемы фаз цикла событий и цепочки middleware, «Проверь себя», тест по каждому уроку и итоговый тест курса.',
        en: 'The Node.js course: all 6 lessons are now step by step — runtime and threads, modules and npm, the event loop, async code and errors, buffers and streams, HTTP and Express. Diagrams of event loop phases and the middleware chain, “Check yourself”, a test per lesson and a final course test.',
      },
    ],
  },
  {
    version: '1.63.0',
    date: '2026-10-19',
    changes: [
      {
        ru: 'Курс «Тестирование»: все 6 уроков стали пошаговыми — виды тестов, юнит-тесты и матчеры, моки и таймеры, тесты компонентов, E2E, TDD и покрытие. Схемы, анимации, «Проверь себя», тест по каждому уроку и итоговый тест курса.',
        en: 'The Testing course: all 6 lessons are now step by step — kinds of tests, unit tests and matchers, mocks and timers, component tests, E2E, TDD and coverage. Diagrams, animations, “Check yourself”, a test per lesson and a final course test.',
      },
    ],
  },
  {
    version: '1.62.0',
    date: '2026-10-19',
    changes: [
      {
        ru: 'Курс «HTML и доступность»: все 6 уроков стали пошаговыми — семантика и ориентиры, как браузер разбирает разметку, формы, доступное имя, роли и ARIA, клавиатура и фокус. Схемы, анимации, «Проверь себя», тест по каждому уроку и итоговый тест курса.',
        en: 'The HTML & accessibility course: all 6 lessons are now step by step — semantics and landmarks, how browsers parse markup, forms, accessible names, roles and ARIA, keyboard and focus. Diagrams, animations, “Check yourself”, a test per lesson and a final course test.',
      },
    ],
  },
  {
    version: '1.61.0',
    date: '2026-10-19',
    changes: [
      {
        ru: 'Курс «Git»: все 6 уроков стали пошаговыми — индекс и статус, ветки и слияние, конфликты, удалённые репозитории, отмена изменений, rebase. Графы коммитов, схемы и «Проверь себя» в каждом уроке, тест по прочитанному и итоговый тест курса.',
        en: 'The Git course: all 6 lessons are now step by step — the index and status, branches and merging, conflicts, remotes, undoing changes, rebase. Commit graphs, diagrams and “Check yourself” in every lesson, a test on what you read and a final course test.',
      },
      {
        ru: 'Исправлено: счётчик вопросов в настройках больше не учитывает скрытую тему.',
        en: 'Fixed: the question count in settings no longer includes the hidden topic.',
      },
    ],
  },
  {
    version: '1.60.1',
    date: '2026-10-19',
    changes: [
      {
        ru: 'Тема «HR и поведенческое интервью» временно скрыта: её нет в списке тем, в статистике и в тренировках по всем темам.',
        en: 'The “HR & behavioral interview” topic is hidden for now: it’s gone from the topic list, statistics and all-topics sessions.',
      },
    ],
  },
  {
    version: '1.60.0',
    date: '2026-10-16',
    changes: [
      {
        ru: 'Курс «Стейт-менеджмент» готов целиком: пошаговыми стали уроки «Сторы и селекторы», «Серверное состояние» и «Состояние в URL» — контекст и подписки, атомы и сигналы, кеш запросов, инвалидация, гонки запросов, анатомия адреса и история браузера.',
        en: 'The State management course is complete: the Stores & selectors, Server state and State in the URL lessons are now step by step — context and subscriptions, atoms and signals, the query cache, invalidation, request races, address anatomy and browser history.',
      },
      {
        ru: 'Итоговый тест курса: 12 вопросов по всем урокам, как на экзамене — без подсказок по ходу, а в конце итог по каждому уроку и шаги, которые стоит перечитать.',
        en: 'A final course test: 12 questions across all lessons, exam style — no hints along the way, and at the end a score per lesson and the steps worth rereading.',
      },
      {
        ru: '4 новых вопроса о состоянии в URL. Всего 922 вопроса.',
        en: '4 new questions on state in the URL. 922 questions in total.',
      },
    ],
  },
  {
    version: '1.59.0',
    date: '2026-10-16',
    changes: [
      {
        ru: 'Курс «Стейт-менеджмент»: пошаговыми стали уроки «Иммутабельность» и «Redux» — спред и общие ссылки, структурное разделение, мутирующие методы массивов, поток данных, срезы, middleware и селекторы со схемами и анимациями.',
        en: 'State management course: the Immutability and Redux lessons are now step by step — spread and shared references, structural sharing, mutating array methods, the data flow, slices, middleware and selectors, with diagrams and animations.',
      },
      {
        ru: 'При повторном прохождении теста урока вопросы идут в новом порядке, а кнопка «Ещё раз» теперь сразу под результатом.',
        en: 'When you retake a lesson test, the questions come in a new order, and the Try again button now sits right under the result.',
      },
    ],
  },
  {
    version: '1.58.0',
    date: '2026-10-16',
    changes: [
      {
        ru: 'Курсы вместо конспектов, начинаем со «Стейт-менеджмента»: урок «Где хранить состояние» теперь пошаговый — короткие шаги с иллюстрациями, анимированными схемами и вопросами «Проверь себя».',
        en: 'Courses instead of summaries, starting with State management: the “Where state lives” lesson is now step by step — short steps with illustrations, animated diagrams and “Check yourself” questions.',
      },
      {
        ru: 'После урока — тест ровно по прочитанному. Урок пройден, когда тест сдан на 80%, а при ошибке приложение подскажет, какой шаг перечитать.',
        en: 'After the lesson comes a test on exactly what you read. The lesson is complete once you score 80%, and after a mistake the app tells you which step to reread.',
      },
      {
        ru: 'Экран темы стал экраном курса: статус каждого урока и шаг, на котором вы остановились, а на главной — кнопка «Продолжить».',
        en: 'The topic screen became a course screen: the status of each lesson and the step where you stopped, plus a Continue button on the home screen.',
      },
    ],
  },
  {
    version: '1.57.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в React: когда нужен useReducer, useId для связки label и input, useTransition, ленивое начальное состояние, ловушка с 0 в &&, Error Boundary в React 19, значение контекста без провайдера, key у Fragment, <Context> как провайдер в React 19, use(Context) внутри условия.',
        en: '10 new React questions: when to use useReducer, useId for linking label and input, useTransition, lazy initial state, the 0 trap with &&, Error Boundaries in React 19, a context value without a provider, key on a Fragment, <Context> as a provider in React 19, use(Context) inside a condition.',
      },
      { ru: 'Всего 918 вопросов.', en: '918 questions in total.' },
    ],
  },
  {
    version: '1.56.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в CSS, 9 проверяются в Chrome: initial против inherit, currentColor у рамки, :empty и пробел, border-box с большим padding, gap во flex, grid-template-areas, ширина absolute без width, наследование line-height числом и в em, логические свойства в RTL, prefers-reduced-motion.',
        en: '10 new CSS questions, 9 verified in Chrome: initial vs inherit, currentColor on borders, :empty and whitespace, border-box with large padding, gap in flex, grid-template-areas, the width of an absolute element without width, inheriting line-height as a number vs in em, logical properties in RTL, prefers-reduced-motion.',
      },
      { ru: 'Всего 908 вопросов.', en: '908 questions in total.' },
    ],
  },
  {
    version: '1.55.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в TypeScript, все проверены компилятором: never в проверке полноты switch, вывод дженерика из массива, Awaited и ReturnType, Extract для размеченного объединения, infer и распределение по объединению, фильтрация ключей через as, satisfies ловит лишний ключ, проверка лишних свойств у литерала, функция с типом never, const-параметры типа.',
        en: '10 new TypeScript questions, all verified by the compiler: never in switch exhaustiveness checks, generic inference from an array, Awaited and ReturnType, Extract on a discriminated union, infer and distribution over unions, filtering keys with as, satisfies catching a missing key, excess property checks on literals, a never-returning function, const type parameters.',
      },
      { ru: 'Всего 898 вопросов.', en: '898 questions in total.' },
    ],
  },
  {
    version: '1.54.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «Тестирование», 5 проверяются запуском: toEqual против toStrictEqual, как работает toBeCloseTo, шпион на методе, фейковые таймеры для опроса, общая заготовка между тестами, табличные тесты, разбор ненайденного элемента в Testing Library, трейсы Playwright, ожидание готовности элемента перед кликом, тесты на основе свойств.',
        en: '10 new “Testing” questions, 5 verified by running code: toEqual vs toStrictEqual, how toBeCloseTo works, a spy on a method, fake timers for polling, a fixture shared between tests, table-driven tests, debugging a missing element in Testing Library, Playwright traces, actionability checks before a click, property-based tests.',
      },
      { ru: 'Всего 888 вопросов.', en: '888 questions in total.' },
    ],
  },
  {
    version: '1.53.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «Алгоритмы», все проверяются запуском: скобки и стек, сортировка с localeCompare, бинарный поиск первой сломанной версии, группировка анаграмм, скользящее окно, префиксные суммы, поиск циклических зависимостей, наибольшая общая подпоследовательность, перестановки, LRU-кеш на Map.',
        en: '10 new “Algorithms” questions, all verified by running code: brackets and a stack, sorting with localeCompare, binary search for the first broken version, grouping anagrams, a sliding window, prefix sums, detecting circular dependencies, the longest common subsequence, permutations, an LRU cache on Map.',
      },
      { ru: 'Всего 878 вопросов.', en: '878 questions in total.' },
    ],
  },
  {
    version: '1.52.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в Next.js: loading.tsx, постоянные редиректы в next.config, updateTag против revalidateTag в Next.js 16, сторонние компоненты без "use client", "use server" против server-only, useOptimistic, лимит тела Server Action, размытая заглушка картинки, useSearchParams и Suspense при сборке, запрос к базе прямо в серверном компоненте.',
        en: '10 new Next.js questions: loading.tsx, permanent redirects in next.config, updateTag vs revalidateTag in Next.js 16, third-party components without "use client", "use server" vs server-only, useOptimistic, the Server Action body limit, a blurred image placeholder, useSearchParams and Suspense at build time, querying the database directly in a Server Component.',
      },
      { ru: 'Всего 868 вопросов.', en: '868 questions in total.' },
    ],
  },
  {
    version: '1.51.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «Архитектура и паттерны», 4 проверяются запуском: стратегия вместо switch, цепочка валидаторов, pipe и compose, результат-объект вместо исключений, постепенная миграция (Strangler Fig), правило трёх, запуск только затронутых проектов в монорепозитории, разделение команд и запросов, слой фичи в FSD, peerDependencies в библиотеке компонентов.',
        en: '10 new “Architecture & patterns” questions, 4 verified by running code: Strategy instead of switch, a validator chain, pipe and compose, result objects instead of exceptions, gradual migration (Strangler Fig), the rule of three, running only affected projects in a monorepo, command–query separation, the feature layer in FSD, peerDependencies in a component library.',
      },
      { ru: 'Всего 858 вопросов.', en: '858 questions in total.' },
    ],
  },
  {
    version: '1.50.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «Стейт-менеджмент», 5 проверяются запуском: structuredClone, как combineReducers раздаёт действия, порядок middleware, слияние set в Zustand только на верхнем уровне, дедупликация запросов, производное состояние, подъём состояния, Immer без изменений, WebSocket и кеш запросов, RTK Query вместо createAsyncThunk.',
        en: '10 new “State management” questions, 5 verified by running code: structuredClone, how combineReducers dispatches actions, middleware order, Zustand’s top-level-only set merge, request deduplication, derived state, lifting state up, Immer with no changes, WebSockets and the query cache, RTK Query instead of createAsyncThunk.',
      },
      { ru: 'Всего 848 вопросов.', en: '848 questions in total.' },
    ],
  },
  {
    version: '1.49.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «HTML и доступность», все проверены в Chrome: вставка tbody, содержимое template, повторный атрибут, очистка значения type="number", чекбокс без value, novalidate и checkValidity, имя fieldset из legend, aria-labelledby со ссылкой на себя, фокус у ссылки без href, hidden против display.',
        en: '10 new “HTML & accessibility” questions, all verified in Chrome: tbody insertion, template contents, duplicate attributes, type="number" value sanitization, a checkbox without value, novalidate and checkValidity, a fieldset name from legend, self-referencing aria-labelledby, focus on a link without href, hidden vs display.',
      },
      { ru: 'Всего 838 вопросов.', en: '838 questions in total.' },
    ],
  },
  {
    version: '1.48.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в Node.js, 5 проверяются запуском: setImmediate и setTimeout внутри ввода-вывода и в главном модуле, node:timers/promises, поле exports в package.json, ошибки async-обработчиков в Express 5, pipeline и ошибки потоков, модуль path, MaxListenersExceededWarning, uncaughtException, ERR_HTTP_HEADERS_SENT.',
        en: '10 new Node.js questions, 5 verified by running code: setImmediate vs setTimeout inside I/O and in the main module, node:timers/promises, the exports field in package.json, async handler errors in Express 5, pipeline and stream errors, the path module, MaxListenersExceededWarning, uncaughtException, ERR_HTTP_HEADERS_SENT.',
      },
      { ru: 'Всего 828 вопросов.', en: '828 questions in total.' },
    ],
  },
  {
    version: '1.47.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в Git, все проверены запуском настоящего git: порядок записей в stash, две и три точки в диапазонах, git diff против --cached, git describe, reflog после reset, отказ pull --ff-only, log --follow, rebase --onto, fixup и autosquash, родители merge-коммита.',
        en: '10 new Git questions, all verified by running real git: stash entry order, two vs three dots in ranges, git diff vs --cached, git describe, reflog after reset, pull --ff-only refusing, log --follow, rebase --onto, fixup and autosquash, merge commit parents.',
      },
      { ru: 'Всего 818 вопросов.', en: '818 questions in total.' },
    ],
  },
  {
    version: '1.46.0',
    date: '2026-10-15',
    changes: [
      {
        ru: 'Вопросы обновляются без обновления приложения: новые и исправленные вопросы скачиваются в фоне и появляются при следующем запуске.',
        en: 'Questions now update without an app update: new and corrected questions download in the background and appear on the next launch.',
      },
      { ru: 'В «О приложении» видно, сколько вопросов в банке и когда он обновлялся.', en: '“About” shows how many questions the bank has and when it was last updated.' },
    ],
  },
  {
    version: '1.45.0',
    date: '2026-10-15',
    changes: [
      {
        ru: 'Термины в разборах вопросов: подчёркнутое слово открывает определение. Размечено около 180 разборов, в глоссарии теперь 75 терминов — от замыкания и цикла событий до CORS, гидратации, дерева доступности, rebase и RAG.',
        en: 'Terms in question explanations: an underlined word opens its definition. About 180 explanations are marked up, and the glossary now has 75 terms — from closures and the event loop to CORS, hydration, the accessibility tree, rebase and RAG.',
      },
    ],
  },
  {
    version: '1.44.0',
    date: '2026-10-15',
    changes: [{ ru: 'Новое достижение теперь видно сразу: сверху появляется плашка с его названием, она скрывается сама через 4 секунды или по нажатию. Достижения, полученные до обновления, повторно не показываются.', en: 'New achievements now show up right away: a banner with the name appears at the top and hides by itself after 4 seconds or on tap. Achievements earned before the update aren’t shown again.' }],
  },
  {
    version: '1.43.0',
    date: '2026-10-15',
    changes: [{ ru: 'Нажатие на напоминание «Ждут повторения» сразу открывает повторение — и когда приложение свёрнуто, и когда закрыто.', en: 'Tapping a “waiting for review” reminder now opens the review right away, whether the app is in the background or closed.' }],
  },
  {
    version: '1.42.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в HR, 3 проверяются запуском: последний день при увольнении по ТК РФ, прогрессивный НДФЛ с 2025 года, вестинг опционов с клиффом, строка резюме с измеримым результатом, подготовка к поведенческому интервью, «Что бы вы сделали иначе?», «Почему именно вас?», самооценка от 1 до 10, почему открыта вакансия, ответ на отказ.',
        en: '10 new HR questions, 3 verified by running code: the last day after resigning under Russian labor law, progressive income tax since 2025, option vesting with a cliff, a résumé line with a measurable result, preparing for a behavioral interview, “What would you do differently?”, “Why should we hire you?”, rating yourself from 1 to 10, why the position is open, replying to a rejection.',
      },
      { ru: 'Всего 808 вопросов.', en: '808 questions in total.' },
    ],
  },
  {
    version: '1.41.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «ИИ для разработчика», 3 проверяются запуском: температура и softmax, «потеря середины» длинного контекста, теги для пользовательских данных в промпте, recall и precision поиска, реранкер, обрезка истории чата по бюджету, ошибки инструментов агента, персональные данные в запросах, evals для промптов, файл инструкций для ИИ-ассистента.',
        en: '10 new questions in “AI for developers”, 3 verified by running code: temperature and softmax, “lost in the middle” in long contexts, tags for user data in prompts, retrieval recall and precision, rerankers, trimming chat history to a budget, agent tool errors, personal data in requests, evals for prompts, an instructions file for AI assistants.',
      },
      { ru: 'Всего 798 вопросов.', en: '798 questions in total.' },
    ],
  },
  {
    version: '1.40.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в CSS, 9 проверяются в Chrome: !important против инлайн-стиля, нулевая специфичность :where(), :nth-child(… of …), схлопывание отступов, margin-left: auto во flex, grid-column до -1, min(), aspect-ratio, inset: 0 и padding box, @starting-style.',
        en: '10 new CSS questions, 9 verified in Chrome: !important vs inline styles, zero specificity of :where(), :nth-child(… of …), margin collapsing, margin-left: auto in flex, grid-column to -1, min(), aspect-ratio, inset: 0 and the padding box, @starting-style.',
      },
      { ru: 'Всего 788 вопросов.', en: '788 questions in total.' },
    ],
  },
  {
    version: '1.39.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в React: порядок эффектов и очисток, useEffectEvent, useImperativeHandle, очистка в ref-колбэке, <title> в компонентах, useFormStatus, <Activity>, переходы вместо фолбэка Suspense, случайные ключи, value без onChange.',
        en: '10 new React questions: effect and cleanup order, useEffectEvent, useImperativeHandle, ref callback cleanup, <title> in components, useFormStatus, <Activity>, transitions instead of Suspense fallbacks, random keys, value without onChange.',
      },
      { ru: 'Всего 778 вопросов.', en: '778 questions in total.' },
    ],
  },
  {
    version: '1.38.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в TypeScript, все проверяются компилятором: сужение через in, функции-утверждения, const-параметры типа, Awaited и ReturnType, Parameters, шаблонные литеральные типы, as const, readonly-массивы, unknown после JSON.parse, снятие модификаторов в mapped types.',
        en: '10 new TypeScript questions, all verified by the compiler: narrowing with in, assertion functions, const type parameters, Awaited and ReturnType, Parameters, template literal types, as const, readonly arrays, unknown after JSON.parse, removing modifiers in mapped types.',
      },
      { ru: 'Всего 768 вопросов.', en: '768 questions in total.' },
    ],
  },
  {
    version: '1.37.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в Next.js: подсветка активной ссылки через usePathname, global-error.tsx, default.tsx в параллельных слотах, ISR с revalidate, статическая оболочка в Cache Components, after() для фоновой работы, router.refresh, sizes у next/image, серверные компоненты против лишнего JS, где можно ставить cookie.',
        en: '10 new Next.js questions: active link via usePathname, global-error.tsx, default.tsx in parallel slots, ISR with revalidate, the static shell in Cache Components, after() for background work, router.refresh, sizes on next/image, Server Components vs extra JS, where cookies can be set.',
      },
      { ru: 'Всего 758 вопросов.', en: '758 questions in total.' },
    ],
  },
  {
    version: '1.36.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «Архитектуре и паттернах», 4 проверяются запуском: Строитель, Итератор на генераторе, Null Object, экспоненциальная задержка повторов, логика отдельно от отображения, headless-компоненты, где ставить Error Boundary, semver для своей библиотеки, булева ловушка, бюджет производительности.',
        en: '10 new questions in “Architecture & patterns”, 4 verified by running code: Builder, an Iterator via generators, Null Object, exponential retry backoff, separating logic from rendering, headless components, where to put Error Boundaries, semver for your own library, the boolean trap, performance budgets.',
      },
      { ru: 'Ссылки на документацию Claude переведены на новый адрес. Всего 748 вопросов.', en: 'Claude documentation links moved to the new address. 748 questions in total.' },
    ],
  },
  {
    version: '1.35.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «Стейт-менеджменте», 6 проверяются запуском: мутация и Object.is, поверхностные снимки для отмены, redux-thunk, поверхностное сравнение, разделение контекстов состояния и dispatch, инвалидация по префиксу ключа, SSR с dehydrate, set/append/delete в URLSearchParams, кодирование параметров, где хранить тему.',
        en: '10 new questions in “State management”, 6 verified by running code: mutation and Object.is, shallow undo snapshots, redux-thunk, shallow comparison, splitting state and dispatch contexts, prefix key invalidation, SSR with dehydrate, set/append/delete in URLSearchParams, parameter encoding, where to store the theme.',
      },
      { ru: 'Всего 738 вопросов.', en: '738 questions in total.' },
    ],
  },
  {
    version: '1.34.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «HTML и доступности», все проверяются в Chrome: pattern и validity, getAll для групп чекбоксов, атрибут form у кнопки вне формы, вложенные ссылки, символьные ссылки, роль searchbox, aria-label против label, пустой alt в кнопке, disabled против aria-disabled, details/summary.',
        en: '10 new questions in “HTML & accessibility”, all verified in Chrome: pattern and validity, getAll for checkbox groups, the form attribute on a button outside the form, nested links, character references, the searchbox role, aria-label vs label, empty alt in a button, disabled vs aria-disabled, details/summary.',
      },
      { ru: 'Всего 728 вопросов.', en: '728 questions in total.' },
    ],
  },
  {
    version: '1.33.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в Node.js, все проверяются запуском: readline и разорванные строки, write и backpressure, require.cache, timer.unref, beforeExit и exit, AsyncLocalStorage, sha256 через crypto, глубина console.log, Buffer в hex, process.argv.',
        en: '10 new Node.js questions, all verified by running code: readline and split lines, write and backpressure, require.cache, timer.unref, beforeExit and exit, AsyncLocalStorage, sha256 via crypto, console.log depth, Buffer to hex, process.argv.',
      },
      { ru: 'Всего 718 вопросов.', en: '718 questions in total.' },
    ],
  },
  {
    version: '1.32.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов по Git, все проверяются запуском git: git mv и переименования, исключения в .gitignore, лёгкие и аннотированные теги, detached HEAD, branch -d для неслитой ветки, merge --ff-only, reset без флага, git clean -n, возврат через reflog, pull --rebase без merge-коммитов.',
        en: '10 new Git questions, all verified by running git: git mv and renames, .gitignore negation, lightweight vs annotated tags, detached HEAD, branch -d on an unmerged branch, merge --ff-only, reset without flags, git clean -n, recovery via reflog, pull --rebase without merge commits.',
      },
      { ru: 'Всего 708 вопросов.', en: '708 questions in total.' },
    ],
  },
  {
    version: '1.31.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '11 новых вопросов в «Тестировании», 3 проверяются запуском через встроенный node:test: мок-функции, фейковые таймеры, deepEqual против deepStrictEqual, мутационное тестирование, названия тестов, user-event v14, рендер с провайдерами, скриншотные тесты в CI, изоляция E2E, контрактные тесты, избыток моков.',
        en: '11 new questions in “Testing”, 3 verified by running the built-in node:test: mock functions, fake timers, deepEqual vs deepStrictEqual, mutation testing, test names, user-event v14, rendering with providers, screenshot tests in CI, E2E isolation, contract tests, over-mocking.',
      },
      { ru: 'Всего 698 вопросов.', en: '698 questions in total.' },
    ],
  },
  {
    version: '1.30.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '12 новых задач в «Алгоритмах», 10 проверяются запуском: BFS, топологическая сортировка, анаграммы, скользящее окно с ошибкой, нижняя граница бинарного поиска, размен монет (жадность против динамики), подмножества, число вызовов наивного fib, глубина дерева, очередь на двух стеках, амортизированная сложность, алгоритм Дейкстры.',
        en: '12 new tasks in “Algorithms”, 10 verified by running code: BFS, topological sort, anagrams, a buggy sliding window, binary search lower bound, coin change (greedy vs DP), subsets, naive fib call count, tree depth, a queue on two stacks, amortized complexity, Dijkstra’s algorithm.',
      },
      { ru: 'Всего 687 вопросов.', en: '687 questions in total.' },
    ],
  },
  {
    version: '1.29.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в HR: сравнение офферов по годовому доходу, вопрос о текущей зарплате, сокращение и частая смена работы, «вам не хватает опыта», «я» против «мы» в рассказе о проекте, рассказ о себе под вакансию, вопрос о росте, README к тестовому, письмо после тишины.',
        en: '10 new HR questions: comparing offers by yearly income, the current-salary question, layoffs and frequent job changes, “you lack experience”, “I” vs “we” in project stories, tailoring your intro to the job, asking about growth, a README for the take-home, following up after silence.',
      },
      { ru: 'Всего 675 вопросов.', en: '675 questions in total.' },
    ],
  },
  {
    version: '1.28.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «ИИ для разработчика», 4 проверяются запуском: косинусная близость, чанки с перекрытием, гибридный поиск, разбор SSE-потока, остановка генерации, проверка JSON от модели схемой, расчёт стоимости запроса, ограничения для агентов, избыточные полномочия инструментов, тесты от ИИ-ассистента.',
        en: '10 new questions in “AI for developers”, 4 verified by running code: cosine similarity, overlapping chunks, hybrid search, parsing an SSE stream, stopping generation, validating model JSON with a schema, request cost, agent limits, excessive tool permissions, tests written by an AI assistant.',
      },
      { ru: 'Всего 665 вопросов.', en: '665 questions in total.' },
    ],
  },
  {
    version: '1.27.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в Next.js: перехватывающие и параллельные маршруты для модалок, template против layout, useRouter из next/navigation, searchParams как промис, "use cache" с cacheLife и cacheTag, промис из сервера в use(), useActionState, стратегии next/script, remotePatterns, ограничения статического экспорта.',
        en: '10 new Next.js questions: intercepting and parallel routes for modals, template vs layout, useRouter from next/navigation, searchParams as a promise, "use cache" with cacheLife and cacheTag, passing a server promise to use(), useActionState, next/script strategies, remotePatterns, static export limits.',
      },
      { ru: 'Всего 655 вопросов.', en: '655 questions in total.' },
    ],
  },
  {
    version: '1.26.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «Архитектуре и паттернах»: Команда и отмена, «луковая» цепочка middleware, конечный автомат вместо флагов, композиция вместо наследования, функциональное ядро, ключ идемпотентности, курсорная пагинация, composition root, ADR, генерация клиента из OpenAPI.',
        en: '10 new questions in “Architecture & patterns”: Command and undo, the onion middleware chain, a state machine instead of flags, composition over inheritance, functional core, idempotency keys, cursor pagination, the composition root, ADRs, generating a client from OpenAPI.',
      },
      { ru: 'Всего 645 вопросов.', en: '645 questions in total.' },
    ],
  },
  {
    version: '1.25.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в «Стейт-менеджменте»: избыточное состояние, sort мутирует массив, удаление через filter, combineReducers, getSnapshot в useSyncExternalStore, атомы Jotai, зависимые запросы, пагинация без мигания, getAll в URLSearchParams, URL как источник правды.',
        en: '10 new questions in “State management”: redundant state, sort mutates arrays, removing via filter, combineReducers, getSnapshot in useSyncExternalStore, Jotai atoms, dependent queries, flicker-free pagination, getAll in URLSearchParams, the URL as the source of truth.',
      },
      { ru: 'Всего 635 вопросов.', en: '635 questions in total.' },
    ],
  },
  {
    version: '1.24.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '9 новых вопросов в «HTML и доступности», 8 из них проверяются в Chrome: header внутри article, чекбоксы в FormData, maxlength, <template>, имя ссылки с картинкой, aria-hidden в кнопке-иконке, role="switch", inert, атрибут lang.',
        en: '9 new questions in “HTML & accessibility”, 8 verified in Chrome: header inside article, checkboxes in FormData, maxlength, <template>, a link name with an image, aria-hidden in an icon button, role="switch", inert, the lang attribute.',
      },
      { ru: 'Всего 625 вопросов.', en: '625 questions in total.' },
    ],
  },
  {
    version: '1.23.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '10 новых вопросов в Node.js: nextTick против микрозадач, HTTP-сервер на node:http, Transform и pipeline, events.once, параллельное чтение файлов, поиск пакетов в node_modules, --env-file, встроенный тест-раннер, запуск TypeScript без сборки, require для ES-модулей.',
        en: '10 new Node.js questions: nextTick vs microtasks, an HTTP server on node:http, Transform and pipeline, events.once, parallel file reads, node_modules lookup, --env-file, the built-in test runner, running TypeScript without a build, require for ES modules.',
      },
      { ru: 'Всего 616 вопросов.', en: '616 questions in total.' },
    ],
  },
  {
    version: '1.22.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '11 новых вопросов в «Тестировании»: toBe и Object.is, toEqual против toStrictEqual, mockClear/Reset/Restore, фиксированное время, within в таблицах, getByRole как проверка доступности, web-first проверки Playwright, page.route, регрессионный тест, тестовый трофей, Arrange — Act — Assert.',
        en: '11 new questions in “Testing”: toBe and Object.is, toEqual vs toStrictEqual, mockClear/Reset/Restore, pinned time, within in tables, getByRole as an accessibility check, Playwright web-first assertions, page.route, regression tests, the testing trophy, Arrange — Act — Assert.',
      },
      { ru: 'Всего 606 вопросов.', en: '606 questions in total.' },
    ],
  },
  {
    version: '1.21.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '11 новых вопросов по Git — каждый проверяется запуском git: две колонки git status, rm --cached, git show коммит:файл, изменения при переключении веток, rebase меняет хеши, cherry-pick, revert, restore --staged, push -u, конфликт UU, --ours и --theirs.',
        en: '11 new Git questions, each verified by running git: the two git status columns, rm --cached, git show commit:file, changes across branch switches, rebase changes hashes, cherry-pick, revert, restore --staged, push -u, a UU conflict, --ours vs --theirs.',
      },
      { ru: 'Всего 595 вопросов.', en: '595 questions in total.' },
    ],
  },
  {
    version: '1.20.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '7 новых вопросов в Node.js: path.resolve, base64 и Buffer, событие error без слушателя, потоки и for await, util.parseArgs, worker_threads, отмена через AbortController — все проверяются запуском.',
        en: '7 new Node.js questions: path.resolve, base64 and Buffer, an error event with no listener, streams and for await, util.parseArgs, worker_threads, cancellation with AbortController — all verified by running the code.',
      },
      {
        ru: '8 новых вопросов в «HTML и доступности»: aria-labelledby, value всегда строка, disabled против readonly, <a> без href, foster parenting в таблицах, live-регионы, skip link, <dialog>. Всего 584 вопроса.',
        en: '8 new questions in “HTML & accessibility”: aria-labelledby, value is always a string, disabled vs readonly, <a> without href, foster parenting in tables, live regions, skip links, <dialog>. 584 questions in total.',
      },
    ],
  },
  {
    version: '1.19.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '8 новых вопросов в Next.js: notFound и 404, redirect внутри try/catch, метаданные, стриминг через Suspense, формы без JavaScript, контекст в App Router, React.cache, next/dynamic без SSR.',
        en: '8 new Next.js questions: notFound and 404, redirect inside try/catch, metadata, streaming with Suspense, forms without JavaScript, context in the App Router, React.cache, next/dynamic without SSR.',
      },
      {
        ru: '8 новых вопросов в «Архитектуре и паттернах»: Фабрика, Заместитель (Proxy), ISP, закон Деметры, общий код между фичами в FSD, обработка ошибок API, шина событий, фича-флаги. Всего 569 вопросов.',
        en: '8 new questions in “Architecture & patterns”: Factory, Proxy, ISP, the Law of Demeter, shared code between FSD features, API error handling, event buses, feature flags. 569 questions in total.',
      },
    ],
  },
  {
    version: '1.18.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '12 новых вопросов в «Стейт-менеджменте»: prop drilling и композиция, нормализация, Object.freeze, иммутабельное обновление, чистые редьюсеры, селекторы в Zustand v5, мемоизация селекторов, сигналы, оптимистичные обновления, staleTime и gcTime, гонка запросов.',
        en: '12 new questions in “State management”: prop drilling and composition, normalization, Object.freeze, immutable updates, pure reducers, Zustand v5 selectors, selector memoization, signals, optimistic updates, staleTime vs gcTime, request races.',
      },
      { ru: 'Всего 553 вопроса.', en: '553 questions in total.' },
    ],
  },
  {
    version: '1.17.0',
    date: '2026-10-15',
    changes: [
      {
        ru: '19 новых вопросов, в основном сложных: Git (.gitignore и отслеживаемые файлы, stash, squash-слияние, диапазоны коммитов, amend, bisect), Тестирование (асинхронные тесты, vi.mock, act, renderHook, авторизация в Playwright, тестовые дублёры, случайный порядок, снапшоты), HR (контрпредложение, торг по офферу, влияние без полномочий, перерыв в работе, тревожные ответы работодателя).',
        en: '19 new questions, mostly hard: Git (.gitignore and tracked files, stash, squash merge, commit ranges, amend, bisect), Testing (async tests, vi.mock, act, renderHook, Playwright auth, test doubles, random order, snapshots), HR (counteroffers, offer negotiation, influence without authority, career gaps, employer red flags).',
      },
      { ru: 'Всего 541 вопрос.', en: '541 questions in total.' },
    ],
  },
  {
    version: '1.16.0',
    date: '2026-10-15',
    changes: [
      {
        ru: 'Live-coding задачи в теме JavaScript: debounce, свой Promise.all, flatten, curry, LRU-кеш, скобки, memoize, groupBy, chunk, once, глубокое копирование, таймаут.',
        en: 'Live-coding tasks in the JavaScript topic: debounce, your own Promise.all, flatten, curry, an LRU cache, brackets, memoize, groupBy, chunk, once, deep copy, a timeout.',
      },
      { ru: 'Каждое решение проверено автотестами — всего 522 вопроса.', en: 'Every solution is checked by automated tests — 522 questions in total.' },
    ],
  },
  {
    version: '1.15.0',
    date: '2026-10-15',
    changes: [
      {
        ru: 'Новая тема «Архитектура и паттерны»: SOLID и принципы, паттерны, архитектура фронтенда и FSD, зависимости и DI, слой данных, монорепо и микрофронтенды.',
        en: 'New topic “Architecture & patterns”: SOLID and principles, patterns, frontend architecture and FSD, dependencies and DI, the data layer, monorepos and micro-frontends.',
      },
      { ru: '22 вопроса и 6 конспектов — всего 510 вопросов.', en: '22 questions and 6 lessons — 510 questions in total.' },
    ],
  },
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
