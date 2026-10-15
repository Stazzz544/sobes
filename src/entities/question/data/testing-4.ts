import type { Question } from '../model/types';

const PLAYWRIGHT = 'https://playwright.dev/docs';
const RTL = 'https://testing-library.com/docs';
const NODE_TEST = 'https://nodejs.org/api/test.html';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const TESTING_QUESTIONS_4: Question[] = [
  {
    id: 'test-mocks-008',
    kind: 'output',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { mock } = require('node:test');

const save = mock.fn();
[10, 20, 30].forEach((value) => save(value));

console.log(save.mock.callCount(), save.mock.calls[1].arguments[0]);`,
    },
    answers: ['3 20'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[test-double|Мок]]-функция записывает каждый вызов: сколько их было и с какими аргументами. Здесь три вызова, второй — с `20`. В Jest и Vitest то же самое: `jest.fn()`/`vi.fn()`, а проверки пишут через `toHaveBeenCalledTimes(3)` и `toHaveBeenNthCalledWith(2, 20)`. Встроенный `node:test` даёт моки без сторонних пакетов.',
          en: 'A [[test-double|mock]] function records every call: how many and with which arguments. Here there are three calls, the second with `20`. Jest and Vitest work the same: `jest.fn()`/`vi.fn()`, asserted with `toHaveBeenCalledTimes(3)` and `toHaveBeenNthCalledWith(2, 20)`. The built-in `node:test` provides mocks without third-party packages.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Test runner: mocking', url: NODE_TEST }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'test-mocks-009',
    kind: 'output',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Автосохранение срабатывает через секунду тишины. Что выведет тест с фейковыми таймерами? Впишите ответ.',
      en: 'Autosave fires after a second of inactivity. What does the fake-timer test print? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const { mock } = require('node:test');
mock.timers.enable({ apis: ['setTimeout'] });

let saves = 0;
let timer;
const autosave = () => {
  clearTimeout(timer);
  timer = setTimeout(() => saves++, 1000);
};

autosave();
mock.timers.tick(500);
autosave();
mock.timers.tick(999);
const before = saves;
mock.timers.tick(1);

console.log(before, saves);
mock.timers.reset();`,
    },
    answers: ['0 1'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Фейковые таймеры подменяют `setTimeout`, и время двигается только командой `tick` — тест проходит мгновенно и детерминированно. Второй вызов на 500 мс перезапустил таймер, поэтому через 999 мс сохранения ещё нет, а через ещё 1 мс — есть. В Jest и Vitest то же самое: `useFakeTimers()` и `advanceTimersByTime(ms)`. Таймеры обязательно возвращают обратно, чтобы не сломать соседние тесты.',
          en: 'Fake timers replace `setTimeout`, and time moves only via `tick` — the test runs instantly and deterministically. The second call at 500 ms restarted the timer, so after 999 ms there’s no save yet, and after 1 more ms there is. Jest and Vitest are the same: `useFakeTimers()` and `advanceTimersByTime(ms)`. Always restore timers so neighboring tests don’t break.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Test runner: timers', url: NODE_TEST }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'test-unit-010',
    kind: 'output',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const assert = require('node:assert');

const results = [];
const checks = [
  () => assert.deepEqual({ id: 1 }, { id: '1' }),
  () => assert.deepStrictEqual({ id: 1 }, { id: '1' }),
];
for (const check of checks) {
  try {
    check();
    results.push('pass');
  } catch {
    results.push('fail');
  }
}

console.log(results.join(' '));`,
    },
    answers: ['pass fail'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Старый `deepEqual` сравнивает примитивы через `==`, поэтому число `1` и строка `\'1\'` для него равны — тест пропустит баг, когда API начнёт отдавать id строкой. `deepStrictEqual` сравнивает строго, включая типы и прототипы. В Node предпочтителен `node:assert/strict`, где все проверки строгие по умолчанию; в Jest аналог — `toStrictEqual`.',
          en: 'The legacy `deepEqual` compares primitives with `==`, so number `1` and string `\'1\'` are equal to it — the test misses the bug when the API starts returning ids as strings. `deepStrictEqual` compares strictly, including types and prototypes. Prefer `node:assert/strict`, where all checks are strict by default; Jest’s equivalent is `toStrictEqual`.',
        },
      },
    ],
    sources: [{ title: 'Node.js — assert.deepStrictEqual()', url: 'https://nodejs.org/api/assert.html' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'test-basics-007',
    topic: 'testing',
    tags: ['testing-basics'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что проверяет мутационное тестирование (например, Stryker)?',
      en: 'What does mutation testing (e.g. Stryker) check?',
    },
    options: [
      { text: { ru: 'Скорость тестов', en: 'Test speed' } },
      {
        text: {
          ru: 'Качество тестов: инструмент вносит в код мелкие ошибки («мутанты») и смотрит, упадёт ли хоть один тест',
          en: 'Test quality: the tool injects small bugs (“mutants”) into the code and checks whether any test fails',
        },
      },
      { text: { ru: 'Что тесты проходят в разных браузерах', en: 'That tests pass in different browsers' } },
      { text: { ru: 'Покрытие строк кода', en: 'Line coverage' } },
      { text: { ru: 'Безопасность зависимостей', en: 'Dependency security' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Покрытие говорит, что строка выполнилась, но не что результат проверили. Мутационное тестирование меняет `>` на `>=`, `+` на `-`, удаляет вызовы — и если тесты всё равно зелёные, мутант «выжил»: этот код по сути не проверяется. Метрика честнее покрытия, но прогон долгий, поэтому его запускают выборочно — на критичной логике или ночью.',
          en: 'Coverage says a line ran, not that its result was checked. Mutation testing changes `>` to `>=`, `+` to `-`, removes calls — and if tests stay green, the mutant “survived”: that code isn’t really tested. The metric is more honest than coverage, but runs are slow, so it’s used selectively — on critical logic or nightly.',
        },
      },
    ],
    sources: [{ title: 'Stryker Mutator', url: 'https://stryker-mutator.io/docs/' }],
  },
  {
    id: 'test-basics-008',
    topic: 'testing',
    tags: ['testing-basics'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Какое название теста лучше?',
      en: 'Which test name is better?',
    },
    options: [
      { code: "test('test 1', …)" },
      { code: "test('calls setState with 0 and then with total', …)" },
      { code: "test('shows the total with a 10% discount for orders over 5000 ₽', …)" },
      { code: "test('works', …)" },
      { code: "test('cart', …)" },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Хорошее название описывает **поведение** и условие, как требование: при падении сразу понятно, что сломалось, без чтения кода. Название про `setState` привязано к реализации — его придётся менять при рефакторинге, хотя поведение то же. «test 1» и «works» ничего не сообщают.',
          en: 'A good name describes **behavior** and the condition, like a requirement: when it fails, you see what broke without reading the code. A name about `setState` is tied to implementation — it changes on refactoring though the behavior is the same. “test 1” and “works” say nothing.',
        },
      },
    ],
    sources: [{ title: 'Kent C. Dodds — Testing Implementation Details', url: 'https://kentcdodds.com/blog/testing-implementation-details' }],
  },
  {
    id: 'test-components-009',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Как правильно использовать `user-event` v14 в тесте?',
      en: 'How do you use `user-event` v14 correctly in a test?',
    },
    options: [
      { code: "render(<Form />);\nuserEvent.click(screen.getByRole('button'));" },
      {
        code: "const user = userEvent.setup();\nrender(<Form />);\nawait user.click(screen.getByRole('button'));",
      },
      { code: "render(<Form />);\nscreen.getByRole('button').click();" },
      { code: "render(<Form />);\nfireEvent(screen.getByRole('button'), 'click');" },
      { code: "const user = userEvent.setup();\nuser.click(screen.getByRole('button'));\nrender(<Form />);" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В v14 сначала создают сессию через `userEvent.setup()` (до рендера), а все действия **асинхронные** — их ждут через `await`. Без `await` проверки выполнятся раньше, чем закончатся события. `user-event` воспроизводит цепочку настоящих событий (hover, focus, pointerdown, click), поэтому ловит больше багов, чем одиночный `fireEvent`.',
          en: 'In v14 you first create a session with `userEvent.setup()` (before rendering), and all actions are **async** — `await` them. Without `await`, assertions run before events finish. `user-event` reproduces the chain of real events (hover, focus, pointerdown, click), so it catches more bugs than a single `fireEvent`.',
        },
      },
    ],
    sources: [{ title: 'Testing Library — user-event intro', url: `${RTL}/user-event/intro` }],
  },
  {
    id: 'test-components-010',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Компонент использует тему из контекста, роутер и клиент запросов. Как удобнее всего рендерить его в тестах?',
      en: 'A component uses a theme from context, a router and a query client. What’s the most convenient way to render it in tests?',
    },
    options: [
      { text: { ru: 'Замокать все хуки контекста по отдельности', en: 'Mock every context hook separately' } },
      {
        text: {
          ru: 'Свой `renderWithProviders`, который оборачивает компонент в те же провайдеры, что и приложение (со свежим клиентом на каждый тест)',
          en: 'A custom `renderWithProviders` that wraps the component in the same providers as the app (with a fresh client per test)',
        },
      },
      { text: { ru: 'Тестировать только компоненты без контекста', en: 'Test only components without context' } },
      { text: { ru: 'Рендерить приложение целиком в каждом тесте', en: 'Render the whole app in every test' } },
      { text: { ru: 'Убрать контекст из компонента ради тестов', en: 'Remove context from the component for tests' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Testing Library рекомендует собственную функцию рендера с опцией `wrapper`: тесты получают настоящие провайдеры и работают как в приложении, а не с горой [[test-double|моков]]. Клиент запросов и стор создают заново для каждого теста, чтобы кеш не переходил между тестами. Подменяют только то, что выходит за границы, — сеть (например, через MSW).',
          en: 'Testing Library recommends your own render function with the `wrapper` option: tests get real providers and behave like the app instead of piles of [[test-double|mocks]]. Create the query client and store fresh for each test so cache doesn’t leak between tests. Only replace what crosses the boundary — the network (e.g. with MSW).',
        },
      },
    ],
    sources: [{ title: 'Testing Library — Setup: custom render', url: `${RTL}/react-testing-library/setup` }],
  },
  {
    id: 'test-e2e-007',
    topic: 'testing',
    tags: ['testing-e2e'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Скриншотные тесты (`toHaveScreenshot`) проходят у вас локально, но падают в CI на каждом прогоне. Частая причина?',
      en: 'Screenshot tests (`toHaveScreenshot`) pass locally but fail in CI on every run. A common cause?',
    },
    options: [
      { text: { ru: 'В CI выключен JavaScript', en: 'JavaScript is disabled in CI' } },
      {
        text: {
          ru: 'Разное окружение: шрифты, сглаживание и ОС отличаются; эталоны снимают в том же Docker-образе, что и CI, и выключают анимации',
          en: 'A different environment: fonts, antialiasing and OS differ; capture baselines in the same Docker image as CI and disable animations',
        },
      },
      { text: { ru: 'В CI слишком быстрый процессор', en: 'CI has too fast a CPU' } },
      { text: { ru: 'Скриншотные тесты нельзя запускать в CI', en: 'Screenshot tests can’t run in CI' } },
      { text: { ru: 'Нужно увеличить таймаут до минуты', en: 'Increase the timeout to a minute' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сравнение идёт по пикселям, и даже другой шрифт или сглаживание в Linux дают разницу. Эталоны снимают в том же окружении, где идёт проверка (официальный Docker-образ Playwright), отключают анимации и каретку, маскируют динамические области — даты, аватары. Небольшой допуск `maxDiffPixelRatio` помогает, но не заменяет одинаковое окружение.',
          en: 'Comparison is pixel-based, and even a different font or Linux antialiasing makes a diff. Capture baselines in the same environment that checks them (the official Playwright Docker image), disable animations and the caret, and mask dynamic areas — dates, avatars. A small `maxDiffPixelRatio` tolerance helps but doesn’t replace a consistent environment.',
        },
      },
    ],
    sources: [{ title: 'Playwright — Visual comparisons', url: `${PLAYWRIGHT}/test-snapshots` }],
  },
  {
    id: 'test-e2e-008',
    topic: 'testing',
    tags: ['testing-e2e'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Тест B проходит, только если перед ним выполнился тест A, который добавил товар в корзину. Что не так?',
      en: 'Test B passes only if test A ran before it and added an item to the cart. What’s wrong?',
    },
    options: [
      { text: { ru: 'Ничего: тесты так и должны идти по цепочке', en: 'Nothing: tests are meant to run in a chain' } },
      {
        text: {
          ru: 'Тесты зависят друг от друга; каждый должен сам готовить нужное состояние — через API или фикстуру — в своём изолированном контексте браузера',
          en: 'The tests depend on each other; each must set up its own state — via the API or a fixture — in its own isolated browser context',
        },
      },
      { text: { ru: 'Нужно запускать тесты в одном воркере', en: 'Run tests in a single worker' } },
      { text: { ru: 'Нужно объединить A и B в один тест', en: 'Merge A and B into one test' } },
      { text: { ru: 'Нужно добавить `retries: 3`', en: 'Add `retries: 3`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Playwright даёт каждому тесту новый контекст браузера — свои cookie и хранилище, — чтобы тесты были независимы и шли параллельно. Зависимость от порядка ломается при параллельном запуске, перезапуске одного теста и фильтрации. Нужное состояние создают в самом тесте: быстрее всего — запросом к API в фикстуре, а не прокликиванием интерфейса.',
          en: 'Playwright gives each test a new browser context — its own cookies and storage — so tests are independent and run in parallel. Order dependence breaks with parallel runs, rerunning a single test and filtering. Create the needed state in the test itself: fastest via an API call in a fixture, not by clicking through the UI.',
        },
      },
    ],
    sources: [{ title: 'Playwright — Isolation', url: `${PLAYWRIGHT}/browser-contexts` }],
  },
  {
    id: 'test-tdd-005',
    topic: 'testing',
    tags: ['testing-tdd', 'testing-basics'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Фронтенд и бэкенд живут в разных репозиториях, и изменения API регулярно ломают интерфейс. Какой вид тестов это ловит до релиза?',
      en: 'Frontend and backend live in separate repos, and API changes keep breaking the UI. Which kind of test catches this before release?',
    },
    options: [
      { text: { ru: 'Юнит-тесты компонентов с моками API', en: 'Component unit tests with API mocks' } },
      {
        text: {
          ru: 'Контрактные тесты (например, Pact): фронтенд описывает ожидания от API, а бэкенд в своём CI проверяет, что их выполняет',
          en: 'Contract tests (e.g. Pact): the frontend describes its API expectations, and the backend verifies them in its own CI',
        },
      },
      { text: { ru: 'Скриншотные тесты', en: 'Screenshot tests' } },
      { text: { ru: 'Нагрузочные тесты', en: 'Load tests' } },
      { text: { ru: 'Ручное тестирование после релиза', en: 'Manual testing after release' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[test-double|Моки]] во фронтенд-тестах описывают API таким, каким его **представляет** фронтенд, — и не узнают, что бэкенд переименовал поле. В **контрактном тестировании** ожидания потребителя сохраняются в контракт, а провайдер прогоняет его против настоящего сервиса: изменение, ломающее клиента, падает в CI бэкенда до релиза. Это дешевле полного E2E на два репозитория.',
          en: '[[test-double|Mocks]] in frontend tests describe the API as the frontend **imagines** it — and never learn that the backend renamed a field. In **contract testing**, consumer expectations are saved as a contract, and the provider runs it against the real service: a client-breaking change fails in the backend’s CI before release. It’s cheaper than full E2E across two repos.',
        },
      },
    ],
    sources: [{ title: 'Pact — Introduction', url: 'https://docs.pact.io/' }],
  },
  {
    id: 'test-mocks-010',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В тесте компонента замокан `fetch`, хук данных и три дочерних компонента. Тест зелёный, а в продакшене страница падает. В чём проблема подхода?',
      en: 'A component test mocks `fetch`, the data hook and three child components. The test is green, but the page crashes in production. What’s wrong with the approach?',
    },
    options: [
      { text: { ru: 'Моков слишком мало', en: 'There are too few mocks' } },
      {
        text: {
          ru: 'Избыток моков: тест проверяет сами моки, а не взаимодействие настоящих частей; подменять стоит только границы — сеть, время',
          en: 'Over-mocking: the test checks the mocks themselves, not how real parts interact; replace only boundaries — the network, time',
        },
      },
      { text: { ru: 'Нужно было использовать snapshot', en: 'A snapshot should have been used' } },
      { text: { ru: 'Моки нужно писать на TypeScript', en: 'Mocks must be written in TypeScript' } },
      { text: { ru: 'Тестам компонентов нельзя доверять в принципе', en: 'Component tests can’t be trusted at all' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждый [[test-double|мок]] — предположение о том, как ведёт себя настоящий код. Чем их больше, тем меньше тест проверяет реальность: дочерний компонент изменил пропсы, хук — формат данных, а моки остались прежними. Надёжнее рендерить настоящие компоненты и подменять только внешний мир: сеть через MSW, время через фейковые таймеры.',
          en: 'Every [[test-double|mock]] is an assumption about how real code behaves. The more there are, the less the test checks reality: a child changed its props, the hook its data shape, while the mocks stayed the same. It’s more reliable to render real components and replace only the outside world: the network via MSW, time via fake timers.',
        },
      },
    ],
    sources: [{ title: 'Kent C. Dodds — Stop mocking fetch', url: 'https://kentcdodds.com/blog/stop-mocking-fetch' }],
  },
];
