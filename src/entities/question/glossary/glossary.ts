import type { LocalizedText } from '@app/shared/i18n';

export type GlossaryTerm = {
  term: LocalizedText;
  definition: LocalizedText;
};

export const GLOSSARY: Readonly<Record<string, GlossaryTerm>> = {
  'lexical-environment': {
    term: { ru: 'Лексическое окружение', en: 'Lexical environment' },
    definition: {
      ru: 'Переменные области видимости плюс ссылка на внешнее окружение. Функция запоминает окружение, в котором её создали.',
      en: 'The variables of a scope plus a link to the outer environment. A function remembers the environment it was created in.',
    },
  },
  microtask: {
    term: { ru: 'Микрозадача', en: 'Microtask' },
    definition: {
      ru: 'Задача из приоритетной очереди: колбэки промисов, продолжение после `await`, `queueMicrotask`. Все микрозадачи выполняются сразу после текущего кода, до следующей макрозадачи.',
      en: 'A task from the priority queue: promise callbacks, the continuation after `await`, `queueMicrotask`. All microtasks run right after the current code, before the next task.',
    },
  },
  tdz: {
    term: { ru: 'Временная мёртвая зона (TDZ)', en: 'Temporal dead zone (TDZ)' },
    definition: {
      ru: 'Участок от начала блока до объявления `let`, `const` или `class`. Обращение к переменной там бросает `ReferenceError`.',
      en: 'The span from the start of a block to the `let`, `const` or `class` declaration. Accessing the variable there throws `ReferenceError`.',
    },
  },
  hoisting: {
    term: { ru: 'Всплытие (hoisting)', en: 'Hoisting' },
    definition: {
      ru: 'Обработка объявлений до выполнения кода: `var` получает `undefined`, объявление функции доступно целиком.',
      en: 'Processing declarations before the code runs: `var` gets `undefined`, a function declaration is available entirely.',
    },
  },
  'prototype-chain': {
    term: { ru: 'Цепочка прототипов', en: 'Prototype chain' },
    definition: {
      ru: 'Объект ссылается на прототип, прототип — на свой прототип и так до `null`. По этой цепочке ищутся свойства, которых нет у самого объекта.',
      en: 'An object links to its prototype, the prototype to its own, and so on until `null`. Properties missing on the object are looked up along this chain.',
    },
  },
  idempotent: {
    term: { ru: 'Идемпотентность', en: 'Idempotence' },
    definition: {
      ru: 'Повторный вызов операции даёт тот же результат, что и первый. `GET`, `PUT` и `DELETE` идемпотентны, `POST` — нет.',
      en: 'Repeating an operation gives the same result as doing it once. `GET`, `PUT` and `DELETE` are idempotent, `POST` isn’t.',
    },
  },
  origin: {
    term: { ru: 'Origin', en: 'Origin' },
    definition: {
      ru: 'Схема, хост и порт адреса. Адреса с одинаковыми всеми тремя частями — один origin.',
      en: 'The scheme, host and port of a URL. URLs that share all three belong to the same origin.',
    },
  },
  preflight: {
    term: { ru: 'Preflight-запрос', en: 'Preflight request' },
    definition: {
      ru: 'Предварительный запрос `OPTIONS`, которым браузер спрашивает сервер, разрешён ли кросс-доменный запрос с таким методом и заголовками.',
      en: 'A preliminary `OPTIONS` request in which the browser asks the server whether a cross-origin request with this method and headers is allowed.',
    },
  },
  xss: {
    term: { ru: 'XSS', en: 'XSS' },
    definition: {
      ru: 'Межсайтовый скриптинг: чужой код выполняется на вашей странице с её правами — обычно из-за вывода данных пользователя как HTML.',
      en: 'Cross-site scripting: foreign code runs on your page with its privileges — usually because user data is rendered as HTML.',
    },
  },
  csrf: {
    term: { ru: 'CSRF', en: 'CSRF' },
    definition: {
      ru: 'Подделка межсайтового запроса: чужой сайт отправляет запрос на ваш домен, а браузер прикладывает к нему cookie пользователя.',
      en: 'Cross-site request forgery: another site sends a request to your domain, and the browser attaches the user’s cookies.',
    },
  },
  specificity: {
    term: { ru: 'Специфичность', en: 'Specificity' },
    definition: {
      ru: 'Вес селектора: id, затем классы, атрибуты и псевдоклассы, затем теги. При конфликте правил побеждает более специфичный.',
      en: 'The weight of a selector: ids, then classes, attributes and pseudo-classes, then types. In a conflict the more specific rule wins.',
    },
  },
  'stacking-context': {
    term: { ru: 'Контекст наложения', en: 'Stacking context' },
    definition: {
      ru: 'Группа элементов, внутри которой сравниваются `z-index`. Её создают, например, `transform`, `opacity < 1` и позиционированный элемент с `z-index`.',
      en: 'A group of elements within which `z-index` values are compared. It’s created by, e.g., `transform`, `opacity < 1` and a positioned element with `z-index`.',
    },
  },
  reconciliation: {
    term: { ru: 'Reconciliation', en: 'Reconciliation' },
    definition: {
      ru: 'Сравнение нового дерева элементов React с прошлым, чтобы применить к DOM только изменения.',
      en: 'Comparing React’s new element tree with the previous one to apply only the changes to the DOM.',
    },
  },
  batching: {
    term: { ru: 'Батчинг', en: 'Batching' },
    definition: {
      ru: 'Объединение нескольких обновлений состояния в один рендер.',
      en: 'Combining several state updates into a single render.',
    },
  },
  memoization: {
    term: { ru: 'Мемоизация', en: 'Memoization' },
    definition: {
      ru: 'Запоминание результата вычисления по входным данным, чтобы не считать его повторно.',
      en: 'Caching a computation’s result by its inputs so it isn’t computed again.',
    },
  },
  amortized: {
    term: { ru: 'Амортизированная сложность', en: 'Amortized complexity' },
    definition: {
      ru: 'Средняя цена операции в длинной серии: редкие дорогие шаги (например, расширение таблицы) раскладываются на множество дешёвых.',
      en: 'The average cost of an operation over a long series: rare expensive steps (like growing a table) are spread over many cheap ones.',
    },
  },
  token: {
    term: { ru: 'Токен', en: 'Token' },
    definition: {
      ru: 'Кусок текста, с которым работает языковая модель: часть слова, слово или знак. Окно контекста и цена считаются в токенах.',
      en: 'A piece of text a language model works with: part of a word, a word or a symbol. The context window and the price are measured in tokens.',
    },
  },
  'context-window': {
    term: { ru: 'Окно контекста', en: 'Context window' },
    definition: {
      ru: 'Максимальный объём текста в токенах, который модель обрабатывает за раз: промпт и ответ вместе.',
      en: 'The maximum amount of text in tokens a model processes at once: the prompt and the response together.',
    },
  },
  embedding: {
    term: { ru: 'Эмбеддинг', en: 'Embedding' },
    definition: {
      ru: 'Вектор чисел, представляющий смысл текста: близкие по смыслу тексты дают близкие векторы.',
      en: 'A vector of numbers representing a text’s meaning: texts with similar meaning get similar vectors.',
    },
  },
  distributive: {
    term: { ru: 'Дистрибутивный условный тип', en: 'Distributive conditional type' },
    definition: {
      ru: 'Условный тип над «голым» параметром: если подставить union, условие применится к каждому члену отдельно.',
      en: 'A conditional type over a “naked” parameter: given a union, the condition is applied to each member separately.',
    },
  },
  'tree-shaking': {
    term: { ru: 'Tree-shaking', en: 'Tree-shaking' },
    definition: {
      ru: 'Удаление неиспользуемого кода при сборке. Работает со статическими ES-модулями и кодом без побочных эффектов.',
      en: 'Removing unused code at build time. Works with static ES modules and side-effect-free code.',
    },
  },
  layout: {
    term: { ru: 'Layout', en: 'Layout' },
    definition: {
      ru: 'Этап отрисовки, на котором браузер вычисляет размеры и положение элементов. Его запускает изменение геометрии.',
      en: 'The rendering stage where the browser computes element sizes and positions. Geometry changes trigger it.',
    },
  },
  closure: {
    term: { ru: 'Замыкание', en: 'Closure' },
    definition: {
      ru: 'Функция вместе с лексическим окружением, в котором её создали: она видит внешние переменные и после того, как внешняя функция завершилась.',
      en: 'A function together with the lexical environment it was created in: it still sees outer variables after the outer function has returned.',
    },
  },
  'stale-closure': {
    term: { ru: 'Устаревшее замыкание', en: 'Stale closure' },
    definition: {
      ru: 'Замыкание, которое видит старые значения состояния или пропсов, потому что создано на прошлом рендере. Типичный случай — колбэк `setInterval` в эффекте с пустым массивом зависимостей.',
      en: 'A closure that sees old state or props because it was created on a previous render. A typical case is a `setInterval` callback in an effect with an empty dependency array.',
    },
  },
  'event-loop': {
    term: { ru: 'Цикл событий (event loop)', en: 'Event loop' },
    definition: {
      ru: 'Механизм выполнения JavaScript: когда стек вызовов пуст, берётся следующая задача из очереди; после каждой задачи выполняются все микрозадачи, а браузер при необходимости перерисовывает страницу.',
      en: 'The mechanism that runs JavaScript: when the call stack is empty, the next task is taken from the queue; after each task all microtasks run, and the browser repaints if needed.',
    },
  },
  'garbage-collection': {
    term: { ru: 'Сборка мусора', en: 'Garbage collection' },
    definition: {
      ru: 'Автоматическое освобождение памяти: объекты, до которых нельзя добраться от корней (глобальных переменных, стека вызовов), удаляются.',
      en: 'Automatic memory release: objects unreachable from the roots (global variables, the call stack) are removed.',
    },
  },
  'pure-function': {
    term: { ru: 'Чистая функция', en: 'Pure function' },
    definition: {
      ru: 'Функция, результат которой зависит только от аргументов и которая ничего не меняет снаружи. Одинаковый вход — всегда одинаковый выход.',
      en: 'A function whose result depends only on its arguments and which changes nothing outside. The same input always gives the same output.',
    },
  },
  'side-effect': {
    term: { ru: 'Побочный эффект', en: 'Side effect' },
    definition: {
      ru: 'Любое влияние функции за пределами возвращаемого значения: изменение внешних переменных, запросы, запись в DOM или хранилище, логирование.',
      en: 'Any effect of a function beyond its return value: changing outer variables, requests, writing to the DOM or storage, logging.',
    },
  },
  immutability: {
    term: { ru: 'Иммутабельность', en: 'Immutability' },
    definition: {
      ru: 'Данные не меняют на месте, а создают новую версию. Изменение видно по смене ссылки — на этом построено сравнение в React и Redux.',
      en: 'Data isn’t changed in place; a new version is created instead. A change shows up as a new reference — React and Redux comparisons rely on this.',
    },
  },
  'shallow-copy': {
    term: { ru: 'Поверхностная копия', en: 'Shallow copy' },
    definition: {
      ru: 'Копия, в которой новый только верхний уровень, а вложенные объекты остаются общими с оригиналом. Так копируют spread и `Object.assign`.',
      en: 'A copy where only the top level is new, while nested objects are shared with the original. Spread and `Object.assign` copy this way.',
    },
  },
  'type-coercion': {
    term: { ru: 'Приведение типов', en: 'Type coercion' },
    definition: {
      ru: 'Автоматическое преобразование значения в другой тип — например, при `==` или при `+` со строкой.',
      en: 'Automatic conversion of a value to another type — for example, with `==` or with `+` and a string.',
    },
  },
  debounce: {
    term: { ru: 'Debounce', en: 'Debounce' },
    definition: {
      ru: 'Вызов откладывается, пока события не прекратятся на заданное время: из серии нажатий выполняется только последнее.',
      en: 'The call is postponed until events stop for a given time: out of a burst of keystrokes only the last one runs.',
    },
  },
  throttle: {
    term: { ru: 'Throttle', en: 'Throttle' },
    definition: {
      ru: 'Функция вызывается не чаще раза за интервал, сколько бы событий ни пришло.',
      en: 'The function runs at most once per interval, however many events arrive.',
    },
  },
  'type-narrowing': {
    term: { ru: 'Сужение типа', en: 'Type narrowing' },
    definition: {
      ru: 'Уточнение типа в ветке кода после проверки: `typeof`, `in`, `instanceof`, сравнения. Из `string | number` после `typeof x === "string"` остаётся `string`.',
      en: 'Refining a type in a code branch after a check: `typeof`, `in`, `instanceof`, comparisons. After `typeof x === "string"`, `string | number` becomes `string`.',
    },
  },
  'type-guard': {
    term: { ru: 'Type guard', en: 'Type guard' },
    definition: {
      ru: 'Функция с возвращаемым типом `value is T`: если она вернула `true`, TypeScript сужает тип аргумента до `T`.',
      en: 'A function with the return type `value is T`: when it returns `true`, TypeScript narrows the argument to `T`.',
    },
  },
  generic: {
    term: { ru: 'Дженерик', en: 'Generic' },
    definition: {
      ru: 'Параметр типа, который подставляется при использовании: `Array<T>`, `function first<T>(items: T[]): T`. Один код работает с разными типами без потери типизации.',
      en: 'A type parameter filled in at the use site: `Array<T>`, `function first<T>(items: T[]): T`. One piece of code works with different types without losing type safety.',
    },
  },
  'structural-typing': {
    term: { ru: 'Структурная типизация', en: 'Structural typing' },
    definition: {
      ru: 'Совместимость типов по форме, а не по имени: значение подходит под тип, если у него есть все нужные свойства нужных типов.',
      en: 'Type compatibility by shape rather than name: a value fits a type if it has all the required properties with the right types.',
    },
  },
  hydration: {
    term: { ru: 'Гидратация', en: 'Hydration' },
    definition: {
      ru: 'Подключение React к HTML, пришедшему с сервера: React строит дерево компонентов, сверяет его с готовой разметкой и навешивает обработчики, не пересоздавая DOM.',
      en: 'Attaching React to server-rendered HTML: React builds the component tree, matches it against the existing markup and attaches handlers without recreating the DOM.',
    },
  },
  'controlled-component': {
    term: { ru: 'Управляемый компонент', en: 'Controlled component' },
    definition: {
      ru: 'Поле формы, значение которого хранится в состоянии React: оно передаётся через `value`, а меняется через `onChange`.',
      en: 'A form field whose value lives in React state: it’s passed via `value` and changed via `onChange`.',
    },
  },
  'prop-drilling': {
    term: { ru: 'Prop drilling', en: 'Prop drilling' },
    definition: {
      ru: 'Передача пропса через несколько уровней компонентов, которым он не нужен, только чтобы донести его до глубоко вложенного.',
      en: 'Passing a prop through several levels of components that don’t need it, just to reach a deeply nested one.',
    },
  },
  bfc: {
    term: { ru: 'Блочный контекст форматирования (BFC)', en: 'Block formatting context (BFC)' },
    definition: {
      ru: 'Независимая область раскладки: обтекание и схлопывание отступов не выходят за её границы. Её создают `display: flow-root`, `overflow` не `visible`, флоаты, flex- и grid-элементы.',
      en: 'An independent layout area: floats and margin collapsing don’t cross its boundary. It’s created by `display: flow-root`, `overflow` other than `visible`, floats, flex and grid items.',
    },
  },
  'margin-collapsing': {
    term: { ru: 'Схлопывание отступов', en: 'Margin collapsing' },
    definition: {
      ru: 'Соседние вертикальные внешние отступы блоков в обычном потоке сливаются в один — остаётся больший. Во flex- и grid-контейнерах отступы не схлопываются.',
      en: 'Adjacent vertical margins of blocks in normal flow merge into one — the larger remains. Margins don’t collapse inside flex and grid containers.',
    },
  },
  'containing-block': {
    term: { ru: 'Содержащий блок', en: 'Containing block' },
    definition: {
      ru: 'Прямоугольник, относительно которого считаются проценты и смещения элемента. Для `position: absolute` — padding box ближайшего предка с `position` не `static` (или с `transform`).',
      en: 'The rectangle an element’s percentages and offsets are computed against. For `position: absolute` it’s the padding box of the nearest ancestor whose `position` isn’t `static` (or that has a `transform`).',
    },
  },
  cors: {
    term: { ru: 'CORS', en: 'CORS' },
    definition: {
      ru: 'Механизм, которым сервер через заголовки `Access-Control-Allow-*` разрешает страницам с другого origin читать его ответы. Без такого разрешения браузер не отдаст ответ скрипту.',
      en: 'The mechanism by which a server uses `Access-Control-Allow-*` headers to let pages from another origin read its responses. Without that permission the browser won’t hand the response to the script.',
    },
  },
  csp: {
    term: { ru: 'CSP', en: 'CSP' },
    definition: {
      ru: 'Заголовок `Content-Security-Policy`: откуда странице разрешено загружать и выполнять скрипты, стили и другие ресурсы. Главная защита от последствий XSS.',
      en: 'The `Content-Security-Policy` header: where a page may load and run scripts, styles and other resources from. The main defense against the impact of XSS.',
    },
  },
  'same-origin-policy': {
    term: { ru: 'Политика одного источника', en: 'Same-origin policy' },
    definition: {
      ru: 'Правило браузера: скрипт читает данные только своего origin. Ответы, DOM и хранилища другого origin ему недоступны без явного разрешения, например CORS.',
      en: 'A browser rule: a script can read data only from its own origin. Responses, DOM and storage of another origin are off-limits without explicit permission such as CORS.',
    },
  },
  hsts: {
    term: { ru: 'HSTS', en: 'HSTS' },
    definition: {
      ru: 'Заголовок `Strict-Transport-Security`: браузер запоминает, что сайт открывается только по HTTPS, и сам заменяет `http://` на `https://`.',
      en: 'The `Strict-Transport-Security` header: the browser remembers that the site opens only over HTTPS and rewrites `http://` to `https://` itself.',
    },
  },
  lcp: {
    term: { ru: 'LCP', en: 'LCP' },
    definition: {
      ru: 'Largest Contentful Paint, метрика Core Web Vitals: когда отрисован самый крупный элемент контента в видимой области. Хорошо — до 2,5 с.',
      en: 'Largest Contentful Paint, a Core Web Vitals metric: when the largest content element in the viewport is rendered. Good is up to 2.5 s.',
    },
  },
  cls: {
    term: { ru: 'CLS', en: 'CLS' },
    definition: {
      ru: 'Cumulative Layout Shift, метрика Core Web Vitals: насколько сдвигается видимый контент во время загрузки и работы страницы. Хорошо — до 0,1.',
      en: 'Cumulative Layout Shift, a Core Web Vitals metric: how much visible content shifts while the page loads and runs. Good is up to 0.1.',
    },
  },
  inp: {
    term: { ru: 'INP', en: 'INP' },
    definition: {
      ru: 'Interaction to Next Paint, метрика Core Web Vitals: задержка от действия пользователя (клик, нажатие клавиши) до следующей отрисовки — почти худшая за визит. Хорошо — до 200 мс.',
      en: 'Interaction to Next Paint, a Core Web Vitals metric: the delay from a user action (click, key press) to the next paint — close to the worst during the visit. Good is up to 200 ms.',
    },
  },
  'critical-rendering-path': {
    term: { ru: 'Критический путь рендеринга', en: 'Critical rendering path' },
    definition: {
      ru: 'Шаги от получения HTML до первых пикселей: DOM, CSSOM, дерево рендеринга, раскладка, отрисовка. Блокирующие CSS и скрипты его удлиняют.',
      en: 'The steps from receiving HTML to the first pixels: DOM, CSSOM, render tree, layout, paint. Render-blocking CSS and scripts make it longer.',
    },
  },
  'service-worker': {
    term: { ru: 'Service Worker', en: 'Service worker' },
    definition: {
      ru: 'Скрипт, который браузер запускает отдельно от страницы: перехватывает её сетевые запросы, кэширует ответы, позволяет работать офлайн и принимать push-уведомления.',
      en: 'A script the browser runs separately from the page: it intercepts the page’s network requests, caches responses, enables offline work and receives push notifications.',
    },
  },
  'accessibility-tree': {
    term: { ru: 'Дерево доступности', en: 'Accessibility tree' },
    definition: {
      ru: 'Упрощённая версия DOM для вспомогательных технологий: у каждого узла есть роль, доступное имя и состояние. Её читают скринридеры.',
      en: 'A simplified version of the DOM for assistive technologies: each node has a role, an accessible name and a state. Screen readers read it.',
    },
  },
  'accessible-name': {
    term: { ru: 'Доступное имя', en: 'Accessible name' },
    definition: {
      ru: 'Текст, которым скринридер называет элемент. Берётся из `aria-labelledby`, `aria-label`, `<label>`, `alt` или содержимого элемента.',
      en: 'The text a screen reader uses to announce an element. It comes from `aria-labelledby`, `aria-label`, `<label>`, `alt` or the element’s content.',
    },
  },
  landmark: {
    term: { ru: 'Ориентир (landmark)', en: 'Landmark' },
    definition: {
      ru: 'Область страницы с ролью, по которой скринридер умеет переходить: `banner`, `navigation`, `main`, `contentinfo` и другие. Обычно её задают семантические теги `<header>`, `<nav>`, `<main>`, `<footer>`.',
      en: 'A page region with a role a screen reader can jump to: `banner`, `navigation`, `main`, `contentinfo` and others. Usually set by the semantic tags `<header>`, `<nav>`, `<main>`, `<footer>`.',
    },
  },
  backpressure: {
    term: { ru: 'Обратное давление (backpressure)', en: 'Backpressure' },
    definition: {
      ru: 'Сигнал «притормози», когда получатель потока не успевает за источником: `write()` возвращает `false`, и пишущий ждёт события `drain`. `pipe` и `pipeline` делают это сами.',
      en: 'A “slow down” signal when a stream’s consumer can’t keep up with the source: `write()` returns `false`, and the writer waits for `drain`. `pipe` and `pipeline` handle it automatically.',
    },
  },
  libuv: {
    term: { ru: 'libuv', en: 'libuv' },
    definition: {
      ru: 'Библиотека на C в основе Node.js: цикл событий, асинхронный ввод-вывод, таймеры и пул потоков для файловых операций, DNS и криптографии.',
      en: 'The C library underneath Node.js: the event loop, async I/O, timers and a thread pool for file operations, DNS and crypto.',
    },
  },
  rsc: {
    term: { ru: 'Серверные компоненты (RSC)', en: 'Server Components (RSC)' },
    definition: {
      ru: 'Компоненты React, которые выполняются только на сервере: читают данные напрямую, их код не попадает в бандл, но в них нет состояния и обработчиков событий.',
      en: 'React components that run only on the server: they read data directly and their code stays out of the bundle, but they have no state or event handlers.',
    },
  },
  ssr: {
    term: { ru: 'SSR', en: 'SSR' },
    definition: {
      ru: 'Server-side rendering: HTML собирается на сервере на каждый запрос. Пользователь сразу видит контент, потом страница гидратируется.',
      en: 'Server-side rendering: HTML is built on the server for each request. The user sees content right away, then the page hydrates.',
    },
  },
  isr: {
    term: { ru: 'ISR', en: 'ISR' },
    definition: {
      ru: 'Incremental Static Regeneration: статическая страница, которую Next.js пересобирает в фоне по истечении `revalidate` или по запросу, не пересобирая весь сайт.',
      en: 'Incremental Static Regeneration: a static page that Next.js rebuilds in the background after `revalidate` expires or on demand, without rebuilding the whole site.',
    },
  },
  'fast-forward': {
    term: { ru: 'Fast-forward', en: 'Fast-forward' },
    definition: {
      ru: 'Слияние без коммита слияния: если текущая ветка — предок вливаемой, указатель ветки просто передвигается вперёд.',
      en: 'A merge without a merge commit: if the current branch is an ancestor of the incoming one, the branch pointer simply moves forward.',
    },
  },
  'detached-head': {
    term: { ru: 'Detached HEAD', en: 'Detached HEAD' },
    definition: {
      ru: '`HEAD` указывает прямо на коммит, а не на ветку. Новые коммиты в этом состоянии не принадлежат ни одной ветке — их легко потерять, если не создать ветку.',
      en: '`HEAD` points directly at a commit rather than a branch. New commits in this state belong to no branch — they’re easy to lose unless you create one.',
    },
  },
  rebase: {
    term: { ru: 'Rebase', en: 'Rebase' },
    definition: {
      ru: 'Перенос коммитов на новую базу: Git заново применяет их поверх другой ветки и создаёт новые коммиты с новыми хешами. История становится линейной.',
      en: 'Moving commits onto a new base: Git reapplies them on top of another branch, creating new commits with new hashes. History becomes linear.',
    },
  },
  'test-double': {
    term: { ru: 'Тестовый двойник (мок)', en: 'Test double (mock)' },
    definition: {
      ru: 'Подмена настоящей зависимости в тесте: стаб возвращает заготовленные ответы, мок ещё и запоминает вызовы для проверки, фейк — упрощённая рабочая реализация.',
      en: 'A stand-in for a real dependency in a test: a stub returns canned answers, a mock also records calls for assertions, a fake is a simplified working implementation.',
    },
  },
  'flaky-test': {
    term: { ru: 'Нестабильный (flaky) тест', en: 'Flaky test' },
    definition: {
      ru: 'Тест, который то проходит, то падает без изменений в коде — из-за таймингов, порядка тестов, общих данных или сети.',
      en: 'A test that passes and fails without code changes — due to timing, test order, shared data or the network.',
    },
  },
  normalization: {
    term: { ru: 'Нормализация состояния', en: 'State normalization' },
    definition: {
      ru: 'Хранение сущностей в сторе плоско, по id, как таблиц в базе: `{ byId, allIds }`. Каждая сущность лежит в одном месте, связи — через id.',
      en: 'Storing entities in the store flat, by id, like database tables: `{ byId, allIds }`. Each entity lives in one place, and relations go through ids.',
    },
  },
  'single-source-of-truth': {
    term: { ru: 'Единый источник истины', en: 'Single source of truth' },
    definition: {
      ru: 'У каждого значения одно место хранения, всё остальное из него вычисляется. Тогда копии не расходятся.',
      en: 'Each value has one place where it’s stored, and everything else is derived from it. That way copies can’t drift apart.',
    },
  },
  coupling: {
    term: { ru: 'Связанность (coupling)', en: 'Coupling' },
    definition: {
      ru: 'Степень зависимости модулей друг от друга. Чем она ниже, тем легче менять модуль, не задевая остальные.',
      en: 'How much modules depend on each other. The lower it is, the easier it is to change a module without touching the rest.',
    },
  },
  cohesion: {
    term: { ru: 'Связность (cohesion)', en: 'Cohesion' },
    definition: {
      ru: 'Насколько части модуля объединены общей задачей. Высокая связность — модуль делает одно дело, и всё нужное для него лежит рядом.',
      en: 'How strongly the parts of a module serve one purpose. High cohesion means the module does one job and everything it needs sits together.',
    },
  },
  'dependency-injection': {
    term: { ru: 'Внедрение зависимостей (DI)', en: 'Dependency injection (DI)' },
    definition: {
      ru: 'Модуль получает зависимости снаружи — через параметры, конструктор или контейнер, — а не создаёт их сам. Так их легко подменить, например в тестах.',
      en: 'A module receives its dependencies from outside — through parameters, a constructor or a container — instead of creating them. That makes them easy to swap, e.g. in tests.',
    },
  },
  'dependency-inversion': {
    term: { ru: 'Инверсия зависимостей', en: 'Dependency inversion' },
    definition: {
      ru: 'Принцип SOLID: модули верхнего уровня не зависят от модулей нижнего, оба зависят от абстракций. Интерфейс объявляет потребитель, а детали его реализуют.',
      en: 'A SOLID principle: high-level modules don’t depend on low-level ones; both depend on abstractions. The consumer declares the interface, and the details implement it.',
    },
  },
  hallucination: {
    term: { ru: 'Галлюцинация', en: 'Hallucination' },
    definition: {
      ru: 'Уверенный и правдоподобный, но неверный ответ модели: несуществующие функции, пакеты, факты или ссылки.',
      en: 'A confident, plausible but wrong model answer: functions, packages, facts or links that don’t exist.',
    },
  },
  rag: {
    term: { ru: 'RAG', en: 'RAG' },
    definition: {
      ru: 'Retrieval-augmented generation: перед ответом система находит подходящие фрагменты в базе знаний и добавляет их в промпт, чтобы модель опиралась на них.',
      en: 'Retrieval-augmented generation: before answering, the system finds relevant passages in a knowledge base and adds them to the prompt so the model relies on them.',
    },
  },
  'prompt-injection': {
    term: { ru: 'Prompt injection', en: 'Prompt injection' },
    definition: {
      ru: 'Атака, при которой текст из недоверенного источника — страницы, файла, письма — содержит инструкции, и модель выполняет их вместо задачи пользователя.',
      en: 'An attack where text from an untrusted source — a web page, file or email — contains instructions, and the model follows them instead of the user’s task.',
    },
  },
  'big-o': {
    term: { ru: 'O-нотация', en: 'Big O notation' },
    definition: {
      ru: 'Оценка того, как растут время или память алгоритма с размером входа, без констант: `O(1)`, `O(log n)`, `O(n)`, `O(n log n)`, `O(n²)`.',
      en: 'An estimate of how an algorithm’s time or memory grows with input size, ignoring constants: `O(1)`, `O(log n)`, `O(n)`, `O(n log n)`, `O(n²)`.',
    },
  },
};
