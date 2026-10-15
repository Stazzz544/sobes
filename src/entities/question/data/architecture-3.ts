import type { Question } from '../model/types';

const GURU = 'https://refactoring.guru/design-patterns';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const ARCHITECTURE_QUESTIONS_3: Question[] = [
  {
    id: 'arch-patterns-command-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `let text = '';
const history = [];

const execute = (command) => {
  command.do();
  history.push(command);
};
const undo = () => history.pop()?.undo();

const append = (value) => ({
  do: () => {
    text += value;
  },
  undo: () => {
    text = text.slice(0, -value.length);
  },
});

execute(append('Hello'));
execute(append(', world'));
undo();
execute(append('!'));

console.log(text);`,
    },
    answers: ['Hello!'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Паттерн **Команда**: действие упаковано в объект, который знает, как себя выполнить и как отменить. Стек выполненных команд даёт отмену и повтор — так работают редакторы, конструкторы и «Отменить» в почте. Отмена сняла `, world`, а новая команда добавила `!` к оставшемуся `Hello`.',
          en: 'The **Command** pattern: an action is wrapped in an object that knows how to execute and undo itself. A stack of executed commands gives undo and redo — that’s how editors, builders and “Undo” in mail work. Undo removed `, world`, and the new command appended `!` to the remaining `Hello`.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Command', url: `${GURU}/command` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-patterns-middleware-001',
    kind: 'order',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Цепочка middleware в стиле Koa. Расставьте записи в порядке, в котором они попадут в лог.',
      en: 'A Koa-style middleware chain. Put the log entries in the order they’re recorded.',
    },
    code: {
      lang: 'js',
      source: `const log = [];
const compose = (middlewares) => (context) => {
  const dispatch = (index) => middlewares[index]?.(context, () => dispatch(index + 1));
  return dispatch(0);
};

const app = compose([
  (ctx, next) => { log.push('a1'); next(); log.push('a2'); },
  (ctx, next) => { log.push('b1'); next(); log.push('b2'); },
  (ctx) => { log.push('handler'); },
]);

app({});
console.log(log.join(' '));`,
    },
    items: [{ code: 'a1' }, { code: 'b1' }, { code: 'handler' }, { code: 'b2' }, { code: 'a2' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '«Луковая» модель: каждый слой выполняет код до `next()`, передаёт управление внутрь и получает его обратно, когда внутренние слои закончат. Поэтому выход идёт в обратном порядке. Так логгер может замерить время всего запроса, а обработчик ошибок — поймать исключение из любого внутреннего слоя. Это вариация паттерна **Цепочка обязанностей**.',
          en: 'The “onion” model: each layer runs code before `next()`, passes control inward and gets it back when inner layers finish. That’s why the way out is reversed. So a logger can time the whole request, and an error handler can catch an exception from any inner layer. It’s a variation of the **Chain of Responsibility** pattern.',
        },
      },
    ],
    sources: [
      { title: 'Koa — Cascading', url: 'https://koajs.com/' },
      { title: 'Refactoring.Guru — Chain of Responsibility', url: `${GURU}/chain-of-responsibility` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-frontend-state-machine-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-frontend'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const machine = {
  idle: { FETCH: 'loading' },
  loading: { RESOLVE: 'success', REJECT: 'error' },
  error: { RETRY: 'loading' },
  success: {},
};
const send = (state, event) => machine[state][event] ?? state;

let state = 'idle';
for (const event of ['FETCH', 'FETCH', 'REJECT', 'RESOLVE', 'RETRY', 'RESOLVE']) {
  state = send(state, event);
}

console.log(state);`,
    },
    answers: ['success'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Конечный автомат** описывает, какие события допустимы в каждом состоянии, а остальные игнорирует: второй `FETCH` во время загрузки не запускает новый запрос, `RESOLVE` после ошибки ничего не ломает. Набор флагов `isLoading`/`isError`/`isSuccess` допускает невозможные сочетания вроде «загружается и ошибка одновременно» — с одним полем `status` их просто нет.',
          en: 'A **finite state machine** defines which events are valid in each state and ignores the rest: a second `FETCH` while loading doesn’t start a new request, `RESOLVE` after an error breaks nothing. Flags like `isLoading`/`isError`/`isSuccess` allow impossible combinations such as “loading and error at once” — with a single `status` field they simply can’t exist.',
        },
      },
    ],
    sources: [{ title: 'Kent C. Dodds — Stop using isLoading booleans', url: 'https://kentcdodds.com/blog/stop-using-isloading-booleans' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-principles-composition-001',
    topic: 'architecture',
    tags: ['arch-principles'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Нужны кнопки: обычная, с иконкой, со спиннером и с иконкой и спиннером сразу. Как лучше устроить компоненты?',
      en: 'You need buttons: plain, with an icon, with a spinner, and with both. How should the components be structured?',
    },
    options: [
      { text: { ru: 'Иерархия наследования: `IconButton extends Button`, `LoadingIconButton extends IconButton`…', en: 'An inheritance hierarchy: `IconButton extends Button`, `LoadingIconButton extends IconButton`…' } },
      {
        text: {
          ru: 'Один `Button` с пропсами `icon` и `loading` и вложенными компонентами — композиция вместо наследования',
          en: 'One `Button` with `icon` and `loading` props and nested components — composition over inheritance',
        },
      },
      { text: { ru: 'Четыре независимые копии кнопки', en: 'Four independent copies of the button' } },
      { text: { ru: 'Глобальный стиль, который меняет все кнопки', en: 'A global style that changes all buttons' } },
      { text: { ru: 'Миксины для каждого сочетания', en: 'Mixins for each combination' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Наследование плохо переносит независимые оси изменений: каждое новое сочетание требует нового класса, а иерархия жёстко фиксирует, что от чего происходит. Композиция собирает поведение из частей — пропсов, `children`, вложенных компонентов, — и сочетания получаются бесплатно. В React так устроено почти всё; классовое наследование компонентов документация не рекомендует.',
          en: 'Inheritance handles independent axes of change poorly: each new combination needs a new class, and the hierarchy rigidly fixes what derives from what. Composition assembles behavior from parts — props, `children`, nested components — and combinations come for free. Almost everything in React works this way; the docs discourage component class inheritance.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Composition over inheritance', url: 'https://en.wikipedia.org/wiki/Composition_over_inheritance' }],
  },
  {
    id: 'arch-principles-functional-core-001',
    topic: 'architecture',
    tags: ['arch-principles', 'arch-dependencies'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что значит подход «функциональное ядро, императивная оболочка»?',
      en: 'What does “functional core, imperative shell” mean?',
    },
    options: [
      { text: { ru: 'Писать весь код только на функциях, без классов', en: 'Write all code as functions only, no classes' } },
      {
        text: {
          ru: 'Бизнес-логику делать чистыми функциями от данных, а запросы, хранилище и время держать в тонком внешнем слое, который их вызывает',
          en: 'Make business logic pure functions of data, keeping requests, storage and time in a thin outer layer that calls them',
        },
      },
      { text: { ru: 'Ядро писать на Rust, а оболочку — на JavaScript', en: 'Write the core in Rust and the shell in JavaScript' } },
      { text: { ru: 'Использовать только неизменяемые структуры данных', en: 'Use only immutable data structures' } },
      { text: { ru: 'Хранить всю логику в компонентах', en: 'Keep all logic in components' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Расчёт скидки, валидация или переход статуса заказа — [[pure-function|чистые функции]]: на вход данные, на выход данные. Их легко тестировать без моков и переиспользовать на клиенте и сервере. Оболочка делает [[side-effect|побочные эффекты]]: загружает данные, вызывает ядро, сохраняет результат. Чем толще ядро и тоньше оболочка, тем меньше кода, который трудно проверить.',
          en: 'Discount calculation, validation or order status transitions are [[pure-function|pure functions]]: data in, data out. They’re easy to test without mocks and to reuse on client and server. The shell performs [[side-effect|side effects]]: loads data, calls the core, saves the result. The thicker the core and the thinner the shell, the less code that’s hard to test.',
        },
      },
    ],
    sources: [{ title: 'Gary Bernhardt — Functional Core, Imperative Shell', url: 'https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell' }],
  },
  {
    id: 'arch-data-idempotency-001',
    topic: 'architecture',
    tags: ['arch-data'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Запрос оплаты оборвался по таймауту, и клиент повторяет его. Как не списать деньги дважды, если первый запрос всё-таки дошёл?',
      en: 'A payment request timed out, and the client retries it. How do you avoid charging twice if the first request actually went through?',
    },
    options: [
      { text: { ru: 'Никогда не повторять запросы оплаты', en: 'Never retry payment requests' } },
      {
        text: {
          ru: 'Генерировать ключ идемпотентности на попытку оплаты и слать его в заголовке; сервер по тому же ключу вернёт прежний результат',
          en: 'Generate an idempotency key per payment attempt and send it in a header; the server returns the earlier result for the same key',
        },
      },
      { text: { ru: 'Блокировать кнопку на 10 секунд', en: 'Disable the button for 10 seconds' } },
      { text: { ru: 'Делать оплату GET-запросом', en: 'Make the payment a GET request' } },
      { text: { ru: 'Повторять запрос, пока не придёт ответ 200', en: 'Retry until a 200 arrives' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При таймауте клиент не знает, выполнилась ли операция. **Ключ идемпотентности** (например, UUID, созданный при нажатии «Оплатить») делает повтор безопасным: сервер видит знакомый ключ и возвращает сохранённый результат вместо новой оплаты. Блокировка кнопки защищает только от двойного клика, но не от сетевых повторов.',
          en: 'On a timeout the client doesn’t know whether the operation happened. An **idempotency key** (say, a UUID created when “Pay” is pressed) makes retries safe: the server sees a known key and returns the stored result instead of charging again. Disabling the button only prevents double clicks, not network retries.',
        },
      },
    ],
    sources: [{ title: 'Stripe — Idempotent requests', url: 'https://docs.stripe.com/api/idempotent_requests' }],
  },
  {
    id: 'arch-data-cursor-pagination-001',
    topic: 'architecture',
    tags: ['arch-data'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В ленте с бесконечной прокруткой при подгрузке появляются дубли, пока сверху добавляются новые посты. Что поможет?',
      en: 'An infinite-scroll feed shows duplicates on loading more while new posts are added at the top. What helps?',
    },
    options: [
      { text: { ru: 'Увеличить размер страницы', en: 'Increase the page size' } },
      {
        text: {
          ru: 'Курсорная пагинация: «дай 20 постов старше этого id» вместо `offset=40`',
          en: 'Cursor pagination: “give me 20 posts older than this id” instead of `offset=40`',
        },
      },
      { text: { ru: 'Убирать дубли на клиенте и больше ничего не менять', en: 'Remove duplicates on the client and change nothing else' } },
      { text: { ru: 'Загружать ленту целиком', en: 'Load the whole feed' } },
      { text: { ru: 'Запретить публикацию новых постов', en: 'Forbid publishing new posts' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`offset` считает позиции от начала: если сверху добавили 3 поста, следующая страница сдвинется, и 3 поста придут повторно (а при удалениях — пропадут). Курсор привязан к конкретной записи — `after=<id или дата>`, — поэтому вставки в начало его не сдвигают. Курсор ещё и быстрее для базы на больших смещениях. Offset остаётся удобен для нумерованных страниц.',
          en: '`offset` counts positions from the start: if 3 posts were added on top, the next page shifts and 3 posts come again (and deletions make some vanish). A cursor is tied to a specific record — `after=<id or date>` — so inserts at the top don’t shift it. Cursors are also faster for the database at large offsets. Offset remains handy for numbered pages.',
        },
      },
    ],
    sources: [{ title: 'Slack Engineering — Evolving API Pagination at Slack', url: 'https://slack.engineering/evolving-api-pagination-at-slack/' }],
  },
  {
    id: 'arch-dependencies-composition-root-001',
    topic: 'architecture',
    tags: ['arch-dependencies'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Где при внедрении зависимостей создают конкретные реализации — HTTP-клиент, логгер, хранилище?',
      en: 'With dependency injection, where are concrete implementations — the HTTP client, logger, storage — created?',
    },
    options: [
      { text: { ru: 'В каждом модуле, который их использует', en: 'In every module that uses them' } },
      {
        text: {
          ru: 'В одной точке сборки у входа в приложение (composition root), откуда они передаются вниз',
          en: 'In one composition root at the app’s entry point, from where they’re passed down',
        },
      },
      { text: { ru: 'В глобальном объекте `window`', en: 'On the global `window` object' } },
      { text: { ru: 'В тестах', en: 'In tests' } },
      { text: { ru: 'Лениво при первом вызове в любом месте', en: 'Lazily on first use anywhere' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Composition root** — единственное место, которое знает обо всех конкретных классах: в `main.ts` или корневом провайдере создают клиент, логгер, сторы и раздают их модулям. Остальной код зависит только от интерфейсов. Подмена для тестов, стейджа или [[ssr|SSR]] — правка в одном файле, а не охота по проекту.',
          en: 'The **composition root** is the only place that knows all concrete classes: `main.ts` or the root provider creates the client, logger and stores and hands them to modules. The rest of the code depends only on interfaces. Swapping for tests, staging or [[ssr|SSR]] is a one-file change, not a hunt across the project.',
        },
      },
    ],
    sources: [{ title: 'Mark Seemann — Composition Root', url: 'https://blog.ploeh.dk/2011/07/28/CompositionRoot/' }],
  },
  {
    id: 'arch-scale-adr-001',
    topic: 'architecture',
    tags: ['arch-scale'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Зачем команды пишут ADR (Architecture Decision Records)?',
      en: 'Why do teams write ADRs (Architecture Decision Records)?',
    },
    options: [
      { text: { ru: 'Чтобы согласовывать каждый коммит', en: 'To approve every commit' } },
      {
        text: {
          ru: 'Чтобы сохранить контекст решения — проблему, варианты и почему выбран этот, — и через год не гадать, «почему так»',
          en: 'To keep a decision’s context — the problem, the options and why this one was chosen — so nobody has to guess “why” a year later',
        },
      },
      { text: { ru: 'Это замена документации API', en: 'They replace API documentation' } },
      { text: { ru: 'Для отчётности перед заказчиком', en: 'For reporting to the client' } },
      { text: { ru: 'Чтобы запретить менять архитектуру', en: 'To forbid architecture changes' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'ADR — короткий документ в репозитории: контекст, решение, рассмотренные альтернативы и последствия. Код показывает, **что** сделано, а ADR — **почему**. Новичок понимает, что этот выбор был осознанным, и при изменении условий можно пересмотреть решение новой записью, а не спорить по памяти.',
          en: 'An ADR is a short document in the repo: context, decision, alternatives considered and consequences. Code shows **what** was done, an ADR shows **why**. A newcomer sees the choice was deliberate, and when conditions change the decision can be revisited with a new record instead of arguing from memory.',
        },
      },
    ],
    sources: [
      { title: 'adr.github.io', url: 'https://adr.github.io/' },
      { title: 'Martin Fowler — Architecture Decision Record', url: 'https://martinfowler.com/bliki/ArchitectureDecisionRecord.html' },
    ],
  },
  {
    id: 'arch-data-openapi-001',
    topic: 'architecture',
    tags: ['arch-data'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Бэкенд публикует спецификацию OpenAPI. Что даёт генерация из неё типов и клиента для фронтенда?',
      en: 'The backend publishes an OpenAPI spec. What does generating types and a client from it give the frontend?',
    },
    options: [
      { text: { ru: 'Ничего: типы всё равно пишут руками', en: 'Nothing: types are written by hand anyway' } },
      {
        text: {
          ru: 'Один источник правды: изменение контракта сразу видно как ошибка компиляции, а не баг в рантайме',
          en: 'A single source of truth: a contract change shows up as a compile error, not a runtime bug',
        },
      },
      { text: { ru: 'Сгенерированный клиент работает быстрее `fetch`', en: 'A generated client is faster than `fetch`' } },
      { text: { ru: 'Отпадает необходимость в бэкенде', en: 'The backend is no longer needed' } },
      { text: { ru: 'Ответы перестают приходить с ошибками', en: 'Responses stop containing errors' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сгенерированные типы и клиент (например, `openapi-typescript`) повторяют контракт: переименовали поле в спецификации — TypeScript покажет все места, которые сломаются. Генерацию запускают в CI и при обновлении API. Типы проверяют только код; на случай, если сервер нарушит собственную спецификацию, ответ всё равно стоит проверять схемой на границе.',
          en: 'Generated types and clients (e.g. `openapi-typescript`) mirror the contract: rename a field in the spec, and TypeScript shows every place that breaks. Generation runs in CI and on API updates. Types only check your code; in case the server violates its own spec, still validate responses with a schema at the boundary.',
        },
      },
    ],
    sources: [{ title: 'openapi-typescript', url: 'https://openapi-ts.dev/' }],
  },
];
