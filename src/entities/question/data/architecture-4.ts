import type { Question } from '../model/types';

const GURU = 'https://refactoring.guru/design-patterns';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const ARCHITECTURE_QUESTIONS_4: Question[] = [
  {
    id: 'arch-patterns-builder-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 1,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `class QueryBuilder {
  constructor() {
    this.parts = [];
  }
  where(condition) {
    this.parts.push(\`where \${condition}\`);
    return this;
  }
  limit(count) {
    this.parts.push(\`limit \${count}\`);
    return this;
  }
  build() {
    return this.parts.join(' ');
  }
}

console.log(new QueryBuilder().where('age > 18').limit(10).build());`,
    },
    answers: ['where age > 18 limit 10'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Строитель** собирает сложный объект по шагам, а `build()` выдаёт результат. Каждый метод возвращает `this`, поэтому вызовы складываются в цепочку — это «текучий интерфейс». Так устроены query builder’ы, `URLSearchParams`, конфиги тестовых фикстур. Удобно, когда у объекта много необязательных частей и конструктор с десятью параметрами нечитаем.',
          en: 'A **Builder** assembles a complex object step by step, and `build()` returns the result. Each method returns `this`, so calls chain — a “fluent interface”. Query builders, `URLSearchParams` and test fixture configs work this way. It helps when an object has many optional parts and a ten-parameter constructor is unreadable.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Builder', url: `${GURU}/builder` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-patterns-iterator-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `function* pages(total, size) {
  for (let page = 1; (page - 1) * size < total; page++) {
    yield page;
  }
}

console.log([...pages(45, 20)].join(','));`,
    },
    answers: ['1,2,3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Итератор** выдаёт элементы по одному и скрывает, откуда они берутся. Генератор в JS — готовый итератор: 45 записей по 20 дают страницы 1, 2, 3. Значения вычисляются лениво, по запросу, поэтому так же можно обходить бесконечные последовательности или подгружать страницы API только когда их действительно читают — `for await` с асинхронным генератором.',
          en: 'An **Iterator** yields elements one by one and hides where they come from. A JS generator is a ready-made iterator: 45 records at 20 per page give pages 1, 2, 3. Values are computed lazily, on demand, so you can also walk infinite sequences or fetch API pages only when they’re actually read — `for await` with an async generator.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Iterator', url: `${GURU}/iterator` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-patterns-null-object-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const guest = { name: 'Guest', can: () => false };
const currentUser = (session) => session?.user ?? guest;

const admin = { name: 'Anna', can: () => true };
console.log(currentUser(null).can('edit'), currentUser({ user: admin }).name);`,
    },
    answers: ['false Anna'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Null Object** — объект «по умолчанию» с тем же интерфейсом, что и настоящий, но безопасным поведением. Вместо `if (user && user.can(...))` по всему коду — одна точка, где отсутствие пользователя превращается в гостя, который ничего не может. Так же делают «пустой» логгер для тестов или заглушку аналитики, когда пользователь от неё отказался.',
          en: 'A **Null Object** is a “default” object with the same interface as the real one but safe behavior. Instead of `if (user && user.can(...))` all over the code, one place turns a missing user into a guest who can do nothing. The same trick gives a no-op logger for tests or an analytics stub when the user opted out.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Null object pattern', url: 'https://en.wikipedia.org/wiki/Null_object_pattern' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-data-backoff-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-data'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Повторы запроса идут с экспоненциальной задержкой и потолком 5 секунд. Какие задержки получатся? Впишите, что выведет код.',
      en: 'Request retries use exponential backoff capped at 5 seconds. What delays result? Type what the code prints.',
    },
    code: {
      lang: 'js',
      source: `const delayFor = (attempt) => Math.min(1000 * 2 ** attempt, 5000);

console.log([0, 1, 2, 3, 4].map(delayFor).join(','));`,
    },
    answers: ['1000,2000,4000,5000,5000'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Экспоненциальная задержка** удваивает паузу после каждой неудачи и не даёт добить упавший сервер шквалом повторов, а потолок не даёт ждать бесконечно. В реальном коде добавляют **джиттер** — случайную часть задержки: иначе тысячи клиентов, упавших одновременно, будут повторять синхронно. Повторяют только то, что безопасно повторить: GET, идемпотентные запросы, ошибки 429 и 5xx.',
          en: '**Exponential backoff** doubles the pause after each failure so a struggling server isn’t hammered by retries, and the cap prevents endless waits. Real code adds **jitter** — a random part of the delay: otherwise thousands of clients that failed together retry in sync. Retry only what’s safe to retry: GETs, idempotent requests, 429 and 5xx errors.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Exponential backoff', url: 'https://en.wikipedia.org/wiki/Exponential_backoff' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-frontend-container-001',
    topic: 'architecture',
    tags: ['arch-frontend'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Компонент `ProductList` сам загружает данные, фильтрует их и рисует карточки. Как разделить его, чтобы список было легко показать в Storybook и протестировать?',
      en: '`ProductList` fetches data, filters it and renders cards by itself. How do you split it so the list is easy to show in Storybook and test?',
    },
    options: [
      { text: { ru: 'Вынести загрузку в `useEffect` того же компонента', en: 'Move fetching into the same component’s `useEffect`' } },
      {
        text: {
          ru: 'Логику загрузки и фильтрации — в хук или модель, а отрисовку — в компонент, который получает готовые данные пропсами',
          en: 'Move fetching and filtering into a hook or model, and rendering into a component that receives ready data via props',
        },
      },
      { text: { ru: 'Сделать компонент классовым', en: 'Make it a class component' } },
      { text: { ru: 'Разбить на файлы по 50 строк', en: 'Split into 50-line files' } },
      { text: { ru: 'Передать всё через контекст', en: 'Pass everything via context' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Разделение «логика отдельно, отображение отдельно» — современный вариант паттерна container/presentational: вместо класса-контейнера — хук или модель стейт-менеджера. Компонент отображения получает пропсы и ничего не знает о сети: его можно показать в Storybook с любыми данными, тестировать без моков API и переиспользовать. Делить имеет смысл, когда логика и разметка действительно растут, а не каждую кнопку.',
          en: 'Separating “logic here, rendering there” is the modern form of the container/presentational pattern: a hook or state-manager model replaces the container class. The display component gets props and knows nothing about the network: you can show it in Storybook with any data, test it without API mocks and reuse it. Split when logic and markup actually grow, not for every button.',
        },
      },
    ],
    sources: [{ title: 'patterns.dev — Container/Presentational Pattern', url: 'https://www.patterns.dev/react/presentational-container-pattern/' }],
  },
  {
    id: 'arch-frontend-headless-001',
    topic: 'architecture',
    tags: ['arch-frontend', 'arch-scale'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что дают «headless» библиотеки компонентов (Radix Primitives, React Aria, TanStack Table) по сравнению с готовыми UI-китами?',
      en: 'What do “headless” component libraries (Radix Primitives, React Aria, TanStack Table) give compared with ready-made UI kits?',
    },
    options: [
      { text: { ru: 'Готовый дизайн, который нельзя менять', en: 'A fixed design that can’t be changed' } },
      {
        text: {
          ru: 'Поведение, состояние и доступность (фокус, клавиатура, ARIA) без стилей — внешний вид полностью ваш',
          en: 'Behavior, state and accessibility (focus, keyboard, ARIA) without styles — the look is entirely yours',
        },
      },
      { text: { ru: 'Серверный рендеринг вместо React', en: 'Server rendering instead of React' } },
      { text: { ru: 'Компоненты без JavaScript', en: 'Components without JavaScript' } },
      { text: { ru: 'Автоматическую генерацию дизайна', en: 'Automatic design generation' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Самая трудная часть выпадающего списка, модалки или таблицы — не вёрстка, а поведение: управление фокусом, навигация с клавиатуры, роли ARIA, крайние случаи. Headless-библиотеки решают именно это и не навязывают внешний вид, поэтому на них строят собственные дизайн-системы. Готовый UI-кит быстрее на старте, но кастомизация под свой дизайн часто превращается в борьбу со стилями библиотеки.',
          en: 'The hardest part of a dropdown, modal or table isn’t markup but behavior: focus management, keyboard navigation, ARIA roles, edge cases. Headless libraries solve exactly that without imposing a look, which is why custom design systems are built on them. A ready UI kit is faster to start, but adapting it to your design often becomes a fight with the library’s styles.',
        },
      },
    ],
    sources: [{ title: 'Radix Primitives — Introduction', url: 'https://www.radix-ui.com/primitives/docs/overview/introduction' }],
  },
  {
    id: 'arch-frontend-error-boundaries-001',
    topic: 'architecture',
    tags: ['arch-frontend'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'На дашборде шесть виджетов. Где разместить Error Boundary, чтобы падение одного виджета не превращало страницу в белый экран?',
      en: 'A dashboard has six widgets. Where do you place Error Boundaries so one widget failing doesn’t turn the page white?',
    },
    options: [
      { text: { ru: 'Одну вокруг всего приложения', en: 'One around the whole app' } },
      {
        text: {
          ru: 'Вокруг каждого независимого виджета (плюс общую у корня как запасную) — упавший блок покажет заглушку, остальные продолжат работать',
          en: 'Around each independent widget (plus one at the root as a fallback) — a failed block shows a placeholder while the rest keep working',
        },
      },
      { text: { ru: 'Вокруг каждой кнопки', en: 'Around every button' } },
      { text: { ru: 'Не нужны: ошибки ловит `try/catch` в рендере', en: 'Not needed: `try/catch` in render catches errors' } },
      { text: { ru: 'Только вокруг асинхронных запросов', en: 'Only around async requests' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ошибка при рендере размонтирует всё дерево до ближайшей Error Boundary. Одна граница у корня спасает от белого экрана, но заменяет заглушкой всю страницу. Границы вокруг независимых блоков изолируют сбой: график упал — показали «Не удалось загрузить» и кнопку «Повторить», остальное работает. Слишком мелкие границы бесполезны: полкнопки на экране хуже понятной заглушки.',
          en: 'A render error unmounts the tree up to the nearest Error Boundary. One boundary at the root avoids a white screen but replaces the whole page with a placeholder. Boundaries around independent blocks isolate failure: a chart crashed — show “Couldn’t load” with a “Retry” button, the rest works. Too-fine boundaries are useless: half a button is worse than a clear placeholder.',
        },
      },
    ],
    sources: [{ title: 'React — Catching rendering errors with an error boundary', url: 'https://react.dev/reference/react/Component' }],
  },
  {
    id: 'arch-dependencies-semver-001',
    topic: 'architecture',
    tags: ['arch-dependencies', 'arch-scale'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Вы поддерживаете внутреннюю библиотеку версии 2.3.0. Какое изменение требует выпуска 3.0.0?',
      en: 'You maintain an internal library at 2.3.0. Which change requires releasing 3.0.0?',
    },
    options: [
      { text: { ru: 'Добавить новую функцию `formatPhone`', en: 'Add a new `formatPhone` function' } },
      { text: { ru: 'Добавить необязательный параметр в существующую функцию', en: 'Add an optional parameter to an existing function' } },
      { text: { ru: 'Исправить баг, не меняя API', en: 'Fix a bug without changing the API' } },
      {
        text: {
          ru: 'Переименовать экспортируемую функцию или сделать обязательным параметр, который был необязательным',
          en: 'Rename an exported function or make a previously optional parameter required',
        },
      },
      { text: { ru: 'Обновить README', en: 'Update the README' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По **semver** мажорная версия означает, что код потребителей может сломаться: удалили или переименовали экспорт, изменили сигнатуру, поменяли поведение. Новая функциональность без поломок — минорная версия, исправления — патч. Соблюдение правила позволяет потребителям спокойно ставить `^2.3.0` и получать обновления без сюрпризов. Ломающие изменения сопровождают заметкой о миграции.',
          en: 'Under **semver** a major version means consumers’ code may break: an export removed or renamed, a signature or behavior changed. New features without breakage are a minor version, fixes are a patch. Following the rule lets consumers safely use `^2.3.0` and take updates without surprises. Breaking changes come with migration notes.',
        },
      },
    ],
    sources: [{ title: 'Semantic Versioning 2.0.0', url: 'https://semver.org/' }],
  },
  {
    id: 'arch-principles-boolean-trap-001',
    topic: 'architecture',
    tags: ['arch-principles'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что не так с вызовом `exportReport(data, true, false, true)` и как его улучшить?',
      en: 'What’s wrong with the call `exportReport(data, true, false, true)` and how do you improve it?',
    },
    options: [
      { text: { ru: 'Ничего, так экономнее', en: 'Nothing, it’s more compact' } },
      {
        text: {
          ru: 'По вызову не понять, что значат флаги, и их легко перепутать; лучше объект с именованными параметрами: `{ includeTotals: true, compress: true }`',
          en: 'The call doesn’t reveal what the flags mean, and they’re easy to mix up; use a named options object: `{ includeTotals: true, compress: true }`',
        },
      },
      { text: { ru: 'Флаги нужно заменить на числа 0 и 1', en: 'Replace the flags with 0 and 1' } },
      { text: { ru: 'Нужно добавить ещё один флаг для гибкости', en: 'Add one more flag for flexibility' } },
      { text: { ru: 'Параметры должны идти в алфавитном порядке', en: 'Parameters must be alphabetical' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Булева ловушка**: позиционные `true/false` нечитаемы в месте вызова и легко перепутываются местами — TypeScript ошибку не заметит, ведь типы одинаковые. Объект параметров документирует сам себя, порядок не важен, а новые опции добавляются без поломки вызовов. Иногда лучше вовсе две функции вместо флага: `exportCsv` и `exportPdf`.',
          en: 'The **boolean trap**: positional `true/false` are unreadable at the call site and easily swapped — TypeScript won’t notice, since the types match. An options object documents itself, order doesn’t matter, and new options don’t break callers. Sometimes two functions beat a flag: `exportCsv` and `exportPdf`.',
        },
      },
    ],
    sources: [{ title: 'Ariya Hidayat — Hall of API Shame: Boolean Trap', url: 'https://ariya.io/2011/08/hall-of-api-shame-boolean-trap' }],
  },
  {
    id: 'arch-scale-performance-budget-001',
    topic: 'architecture',
    tags: ['arch-scale'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Бандл приложения за полгода вырос с 200 до 900 КБ, и никто не заметил когда. Что помогло бы?',
      en: 'The app bundle grew from 200 to 900 KB in six months, and nobody noticed when. What would have helped?',
    },
    options: [
      { text: { ru: 'Раз в год делать аудит', en: 'An annual audit' } },
      {
        text: {
          ru: 'Бюджет производительности в CI: лимит размера бандла и метрик, превышение роняет сборку или PR',
          en: 'A performance budget in CI: a bundle size and metrics limit where exceeding it fails the build or PR',
        },
      },
      { text: { ru: 'Запретить новые зависимости', en: 'Forbid new dependencies' } },
      { text: { ru: 'Сжимать картинки', en: 'Compress images' } },
      { text: { ru: 'Перейти на другой фреймворк', en: 'Switch frameworks' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Производительность деградирует постепенно: каждый PR добавляет «всего 20 КБ». **Бюджет** превращает это в видимое решение — проверка в CI (например, `size-limit` или Lighthouse CI) падает, когда лимит превышен, и команда обсуждает, стоит ли новая библиотека своего веса. Бюджеты задают и для метрик: LCP, INP, число запросов.',
          en: 'Performance degrades gradually: each PR adds “only 20 KB”. A **budget** makes it a visible decision — a CI check (e.g. `size-limit` or Lighthouse CI) fails when the limit is exceeded, and the team discusses whether a new library is worth its weight. Budgets also cover metrics: LCP, INP, request count.',
        },
      },
    ],
    sources: [{ title: 'web.dev — Performance budgets 101', url: 'https://web.dev/articles/performance-budgets-101' }],
  },
];
