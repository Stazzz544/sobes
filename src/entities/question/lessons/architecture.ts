import type { Lesson } from '../model/types';

const GURU = 'https://refactoring.guru/design-patterns';
const WIKI = 'https://en.wikipedia.org/wiki';
const FSD = 'https://feature-sliced.design/docs/reference';

export const ARCHITECTURE_LESSONS: Lesson[] = [
  {
    tag: 'arch-principles',
    summary: {
      ru: 'SOLID, DRY, KISS и YAGNI — эвристики, которые помогают писать код, который легко менять. Это не законы: каждая полезна, пока снижает стоимость изменений.',
      en: 'SOLID, DRY, KISS and YAGNI are heuristics for writing code that’s easy to change. They aren’t laws: each is useful as long as it lowers the cost of change.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**S** — одна причина для изменения у модуля. **O** — новое поведение добавляется расширением (новая стратегия, запись в реестре), а не правкой старого кода. **L** — наследник работает везде, где работает родитель. **I** — маленькие интерфейсы под конкретного потребителя. **D** — зависеть от абстракций, а не от конкретных библиотек.',
          en: '**S** — a module has one reason to change. **O** — new behavior comes by extension (a new strategy, a registry entry), not by editing old code. **L** — a subclass works wherever its parent works. **I** — small interfaces tailored to each consumer. **D** — depend on abstractions, not concrete libraries.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**DRY** борется с дублированием знаний, а не одинаковых строк: похожий код, который меняется по разным причинам, объединять не стоит — неправильная абстракция дороже дубля. **YAGNI** и **KISS** — не строить гибкость «на будущее» и выбирать простое решение.',
          en: '**DRY** fights duplicated knowledge, not identical lines: similar code that changes for different reasons shouldn’t be merged — the wrong abstraction costs more than duplication. **YAGNI** and **KISS** — don’t build flexibility “for the future” and prefer the simple solution.',
        },
      },
    ],
    keyPoints: [
      { ru: 'SRP: одна причина для изменения.', en: 'SRP: one reason to change.' },
      { ru: 'OCP: расширять, а не править.', en: 'OCP: extend, don’t edit.' },
      { ru: 'Неправильная абстракция дороже дубля.', en: 'The wrong abstraction costs more than duplication.' },
    ],
    sources: [
      { title: 'Wikipedia — SOLID', url: `${WIKI}/SOLID` },
      { title: 'Sandi Metz — The Wrong Abstraction', url: 'https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction' },
    ],
  },
  {
    tag: 'arch-patterns',
    summary: {
      ru: 'Паттерны — готовые названия для типовых решений. Во фронтенде чаще всего встречаются Наблюдатель, Стратегия, Адаптер, Фасад, Декоратор и Синглтон.',
      en: 'Patterns are ready-made names for typical solutions. In frontend you most often meet Observer, Strategy, Adapter, Facade, Decorator and Singleton.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Наблюдатель** — подписка на изменения (сторы, события). **Стратегия** — взаимозаменяемые алгоритмы за общим интерфейсом вместо `switch`. **Адаптер** — приводит чужой формат к своему (ответ API, сторонний SDK). **Фасад** — простой вход в сложную подсистему.',
          en: '**Observer** — subscribing to changes (stores, events). **Strategy** — interchangeable algorithms behind a shared interface instead of a `switch`. **Adapter** — converts a foreign format to yours (an API response, a third-party SDK). **Facade** — a simple entry point to a complex subsystem.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Декоратор** оборачивает функцию или компонент, добавляя поведение: `withRetry`, `memoize`, HOC. **Синглтон** в JS — это просто модуль с состоянием: удобно в браузере, но на сервере такой модуль общий для всех запросов, и данные пользователей могут смешаться.',
          en: 'A **Decorator** wraps a function or component to add behavior: `withRetry`, `memoize`, HOCs. A **Singleton** in JS is just a module with state: handy in the browser, but on the server such a module is shared by all requests, and users’ data can mix.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Стратегия вместо разросшегося `switch`.', en: 'Strategy instead of a sprawling `switch`.' },
      { ru: 'Адаптер — на границе с API и SDK.', en: 'Adapter — at the API and SDK boundary.' },
      { ru: 'Модуль с состоянием на сервере — общий для всех.', en: 'A stateful module on the server is shared by all.' },
    ],
    sources: [
      { title: 'Refactoring.Guru — Observer', url: `${GURU}/observer` },
      { title: 'Refactoring.Guru — Strategy', url: `${GURU}/strategy` },
      { title: 'Refactoring.Guru — Decorator', url: `${GURU}/decorator` },
    ],
  },
  {
    tag: 'arch-frontend',
    summary: {
      ru: 'Архитектура фронтенда — это границы: какие модули есть, что они показывают наружу и кто от кого может зависеть.',
      en: 'Frontend architecture is about boundaries: which modules exist, what they expose and who may depend on whom.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Feature-Sliced Design делит код на слои `shared` → `entities` → `features` → `widgets` → `pages` → `app`. Импортировать можно только из слоёв ниже; слайсы одного слоя друг друга не импортируют. Так зависимости идут в одну сторону, и циклов не возникает.',
          en: 'Feature-Sliced Design splits code into layers `shared` → `entities` → `features` → `widgets` → `pages` → `app`. You may import only from lower layers; slices of one layer don’t import each other. Dependencies flow one way, and cycles don’t arise.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'У каждого модуля есть **публичный API** — `index.ts`, глубокие импорты в его внутренности запрещены. Код группируют по фичам, а не по типам файлов: что меняется вместе, лежит рядом. Циклические импорты — признак размытых границ: общее выносят в модуль ниже.',
          en: 'Each module has a **public API** — `index.ts` — and deep imports into its internals are forbidden. Code is grouped by feature, not file type: what changes together lives together. Circular imports signal blurry boundaries: move shared code into a lower module.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Импорт только из слоёв ниже.', en: 'Import only from lower layers.' },
      { ru: 'Наружу — только через `index.ts`.', en: 'Expose only via `index.ts`.' },
      { ru: 'Группировать по фичам, а не по типам.', en: 'Group by feature, not by type.' },
    ],
    sources: [
      { title: 'Feature-Sliced Design — Layers', url: `${FSD}/layers` },
      { title: 'Feature-Sliced Design — Public API', url: `${FSD}/public-api` },
      { title: 'Kent C. Dodds — Colocation', url: 'https://kentcdodds.com/blog/colocation' },
    ],
  },
  {
    tag: 'arch-dependencies',
    summary: {
      ru: 'Хороший код — низкая связанность между модулями и высокая связность внутри них. Внедрение зависимостей и инверсия зависимостей помогают этого добиться.',
      en: 'Good code means low coupling between modules and high cohesion within them. Dependency injection and dependency inversion help achieve that.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Внедрение зависимостей**: модуль получает клиент API, хранилище или часы снаружи (параметром, через контекст), а не создаёт сам. Поэтому в тесте легко подставить заглушку, а в разных окружениях — разные реализации.',
          en: '**Dependency injection**: a module receives its API client, storage or clock from outside (as a parameter, via context) instead of creating them. That makes it easy to pass a stub in tests and different implementations in different environments.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Инверсия зависимостей**: бизнес-код зависит от своего интерфейса (`HttpClient`, `Storage`), а конкретная библиотека подключается в одном месте — точке сборки приложения. Смена `axios` на `fetch` или добавление общих заголовков — правка одного файла.',
          en: '**Dependency inversion**: business code depends on its own interface (`HttpClient`, `Storage`), while the concrete library is wired in one place — the app’s composition root. Switching `axios` to `fetch` or adding shared headers is a one-file change.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Low coupling, high cohesion.', en: 'Low coupling, high cohesion.' },
      { ru: 'Зависимости — снаружи, а не `new` внутри.', en: 'Dependencies come from outside, not `new` inside.' },
      { ru: 'Свой интерфейс вместо прямой привязки к библиотеке.', en: 'Your own interface instead of binding to a library.' },
    ],
    sources: [
      { title: 'Martin Fowler — Dependency Injection', url: 'https://martinfowler.com/articles/injection.html' },
      { title: 'Wikipedia — Dependency inversion principle', url: `${WIKI}/Dependency_inversion_principle` },
    ],
  },
  {
    tag: 'arch-scale',
    summary: {
      ru: 'Когда растут команда и кодовая база, архитектура решает организационные задачи: монорепо, дизайн-система, микрофронтенды. У каждого решения есть цена.',
      en: 'As teams and codebases grow, architecture solves organizational problems: monorepos, design systems, micro-frontends. Each solution has a price.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Монорепо** позволяет менять общую библиотеку и всех её потребителей одним коммитом, но требует инструментов — Nx, Turborepo — с графом зависимостей и кешем, чтобы CI собирал только затронутое. **Дизайн-система** на семантических токенах даёт единый вид и темы без правки компонентов.',
          en: 'A **monorepo** lets you change a shared library and all its consumers in one commit, but needs tooling — Nx, Turborepo — with a dependency graph and caching so CI builds only what’s affected. A **design system** built on semantic tokens gives a consistent look and themes without editing components.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Микрофронтенды** нужны, когда многим автономным командам важно выкатываться независимо. Цена — дублирование зависимостей, сложная сборка, риск разнобоя в интерфейсе. Для одной-двух команд обычно лучше модульный монолит.',
          en: '**Micro-frontends** are for when many autonomous teams need independent releases. The price is duplicated dependencies, complex builds and a risk of inconsistent UI. For one or two teams a modular monolith is usually better.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Монорепо — атомарные изменения + affected-сборки.', en: 'Monorepo — atomic changes + affected builds.' },
      { ru: 'Токены описывают смысл, а не значение.', en: 'Tokens describe meaning, not value.' },
      { ru: 'Микрофронтенды решают оргзадачу, а не техническую.', en: 'Micro-frontends solve an org problem, not a technical one.' },
    ],
    sources: [
      { title: 'monorepo.tools', url: 'https://monorepo.tools/' },
      { title: 'Martin Fowler — Micro Frontends', url: 'https://martinfowler.com/articles/micro-frontends.html' },
      { title: 'Design Tokens Community Group', url: 'https://www.designtokens.org/' },
    ],
  },
  {
    tag: 'arch-data',
    summary: {
      ru: 'Слой данных отделяет интерфейс от бэкенда: запросы, проверка контракта и преобразование форматов живут в одном месте.',
      en: 'The data layer separates the UI from the backend: requests, contract validation and format conversion live in one place.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Ответ API проверяют схемой (zod) на границе: изменение контракта сразу даёт понятную ошибку, а не `undefined` в глубине интерфейса. Там же адаптер превращает `snake_case` и строки дат в удобную для интерфейса модель — компоненты не знают формата бэкенда.',
          en: 'API responses are validated with a schema (zod) at the boundary: a contract change gives a clear error right away instead of `undefined` deep in the UI. There, too, an adapter turns `snake_case` and date strings into a UI-friendly model — components don’t know the backend format.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**BFF** (Backend for Frontend) — серверный слой команды клиента: собирает данные из нескольких сервисов и отдаёт экрану ровно нужное одним запросом. Его роль часто выполняют Next.js Route Handlers и серверные компоненты.',
          en: 'A **BFF** (Backend for Frontend) is the client team’s server layer: it gathers data from several services and returns exactly what a screen needs in one request. Next.js Route Handlers and Server Components often fill this role.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Проверять контракт на границе.', en: 'Validate the contract at the boundary.' },
      { ru: 'Адаптер прячет формат бэкенда от компонентов.', en: 'An adapter hides the backend format from components.' },
      { ru: 'BFF — один запрос под нужды экрана.', en: 'BFF — one request shaped for the screen.' },
    ],
    sources: [
      { title: 'Zod', url: 'https://zod.dev/' },
      { title: 'Refactoring.Guru — Adapter', url: `${GURU}/adapter` },
      { title: 'Sam Newman — Backends For Frontends', url: 'https://samnewman.io/patterns/architectural/bff/' },
    ],
  },
];
