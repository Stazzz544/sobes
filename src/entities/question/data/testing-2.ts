import type { Question } from '../model/types';

const JEST = 'https://jestjs.io/docs';
const RTL = 'https://testing-library.com/docs';

export const TESTING_QUESTIONS_2: Question[] = [
  {
    id: 'test-unit-005',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Этот тест проходит, даже если `fetchUser` возвращает другое имя. Почему?',
      en: 'This test passes even if `fetchUser` returns a different name. Why?',
    },
    code: {
      lang: 'js',
      source: `test('loads the user', () => {
  fetchUser(1).then((user) => {
    expect(user.name).toBe('Anna');
  });
});`,
    },
    options: [
      { text: { ru: '`toBe` не работает со строками', en: '`toBe` doesn’t work with strings' } },
      {
        text: {
          ru: 'Промис не возвращается и не ожидается: тест завершается раньше, чем выполнится `expect`',
          en: 'The promise isn’t returned or awaited: the test finishes before `expect` runs',
        },
      },
      { text: { ru: 'Нужно обернуть `expect` в `try/catch`', en: '`expect` must be wrapped in `try/catch`' } },
      { text: { ru: 'Jest не поддерживает промисы', en: 'Jest doesn’t support promises' } },
      { text: { ru: 'Тест должен называться `it`, а не `test`', en: 'The test must be called `it`, not `test`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Функция теста синхронно завершилась, и раннер засчитал успех; `then` выполнится позже, когда тест уже закончен. Нужно вернуть промис или сделать тест `async` и написать `await`: `const user = await fetchUser(1)`. Страховка от таких ошибок — `expect.assertions(1)` в начале теста: если проверок окажется меньше, тест упадёт.',
          en: 'The test function finished synchronously, and the runner counted it as passed; `then` runs later, after the test is over. Return the promise or make the test `async` and `await`: `const user = await fetchUser(1)`. A safeguard is `expect.assertions(1)` at the start: if fewer assertions run, the test fails.',
        },
      },
    ],
    sources: [
      { title: 'Jest — Testing Asynchronous Code', url: `${JEST}/asynchronous` },
      { title: 'Jest — expect.assertions', url: `${JEST}/expect#expectassertionsnumber` },
    ],
  },
  {
    id: 'test-mocks-005',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Тест на Vitest падает с ошибкой: `mockUser` используется до объявления. Почему?',
      en: 'A Vitest test fails: `mockUser` is accessed before initialization. Why?',
    },
    code: {
      lang: 'ts',
      source: `import { vi, test } from 'vitest';
import { getProfile } from './profile';

const mockUser = { id: 1, name: 'Anna' };

vi.mock('./api', () => ({
  fetchUser: () => Promise.resolve(mockUser),
}));`,
    },
    options: [
      { text: { ru: '`vi.mock` можно вызывать только внутри `test`', en: '`vi.mock` can only be called inside `test`' } },
      {
        text: {
          ru: '`vi.mock` поднимается в начало файла, выше `const mockUser`; общие данные объявляют через `vi.hoisted`',
          en: '`vi.mock` is hoisted to the top of the file, above `const mockUser`; shared data goes through `vi.hoisted`',
        },
      },
      { text: { ru: 'Объект нельзя возвращать из промиса', en: 'An object can’t be returned from a promise' } },
      { text: { ru: 'Нужно заменить `const` на `var`', en: '`const` must be replaced with `var`' } },
      { text: { ru: 'Путь в `vi.mock` должен быть абсолютным', en: 'The path in `vi.mock` must be absolute' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Чтобы мок применился до импортов, Vitest (как и Jest с `jest.mock`) **поднимает** вызов `vi.mock` в самое начало файла. Фабрика выполняется раньше, чем строка с `const mockUser`, — переменная ещё в «мёртвой зоне». Данные для фабрики объявляют через `const { mockUser } = vi.hoisted(() => ({ mockUser: {…} }))` — этот блок поднимается вместе с моком.',
          en: 'So the mock applies before imports, Vitest (like Jest with `jest.mock`) **hoists** the `vi.mock` call to the very top of the file. The factory runs before the `const mockUser` line — the variable is still in the temporal dead zone. Declare factory data with `const { mockUser } = vi.hoisted(() => ({ mockUser: {…} }))` — that block is hoisted along with the mock.',
        },
      },
    ],
    sources: [{ title: 'Vitest — vi.mock and vi.hoisted', url: 'https://vitest.dev/api/vi.html' }],
  },
  {
    id: 'test-components-005',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Тест проходит, но в консоли предупреждение «An update to Profile inside a test was not wrapped in act(...)». Что чаще всего не так?',
      en: 'The test passes, but the console warns “An update to Profile inside a test was not wrapped in act(...)”. What’s usually wrong?',
    },
    options: [
      { text: { ru: 'Нужно обернуть каждую строку теста в `act`', en: 'Every test line must be wrapped in `act`' } },
      {
        text: {
          ru: 'Компонент обновился асинхронно уже после проверок: тест не дождался результата через `findBy…` или `waitFor`',
          en: 'The component updated asynchronously after the assertions: the test didn’t wait for the result with `findBy…` or `waitFor`',
        },
      },
      { text: { ru: 'Устарела версия React', en: 'The React version is outdated' } },
      { text: { ru: 'Компонент нельзя рендерить в тестах', en: 'The component can’t be rendered in tests' } },
      { text: { ru: 'Это безобидное предупреждение, его надо отключить', en: 'It’s a harmless warning that should be silenced' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Testing Library уже оборачивает `render`, `fireEvent` и `waitFor` в `act`. Предупреждение значит: после завершения проверок компонент ещё обновился — обычно загрузка данных или таймер. Тест проверил промежуточное состояние и, возможно, проходит случайно. Лечится ожиданием итогового состояния — `await screen.findByText(…)` — а не ручным `act` вокруг всего подряд.',
          en: 'Testing Library already wraps `render`, `fireEvent` and `waitFor` in `act`. The warning means the component updated after the assertions — usually data loading or a timer. The test checked an intermediate state and may pass by accident. The fix is waiting for the final state — `await screen.findByText(…)` — not manual `act` around everything.',
        },
      },
    ],
    sources: [{ title: 'Kent C. Dodds — Fix the “not wrapped in act(...)” warning', url: 'https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning' }],
  },
  {
    id: 'test-components-006',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Как протестировать собственный хук `useCounter` отдельно от компонентов?',
      en: 'How do you test a custom `useCounter` hook apart from components?',
    },
    options: [
      { code: 'const result = useCounter();' },
      { code: "const { result } = renderHook(() => useCounter());\nact(() => result.current.increment());\nexpect(result.current.count).toBe(1);" },
      { code: 'const result = new useCounter();' },
      { code: "jest.spyOn(React, 'useState');" },
      { code: 'expect(useCounter).toBeDefined();' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Хуки можно вызывать только внутри компонента, поэтому прямой вызов в тесте падает. `renderHook` рендерит служебный компонент и отдаёт актуальные значения через `result.current`, а изменения состояния оборачивают в `act`. Но если хук используется в одном компоненте, проще и надёжнее тестировать сам компонент — как его видит пользователь.',
          en: 'Hooks can only be called inside a component, so calling one directly in a test fails. `renderHook` renders a helper component and exposes current values via `result.current`, with state changes wrapped in `act`. But if the hook is used by a single component, it’s simpler and more robust to test that component as the user sees it.',
        },
      },
    ],
    sources: [{ title: 'React Testing Library — renderHook', url: `${RTL}/react-testing-library/api#renderhook` }],
  },
  {
    id: 'test-e2e-004',
    topic: 'testing',
    tags: ['testing-e2e'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: '200 E2E-тестов на Playwright каждый раз входят в систему через форму логина, и прогон идёт 40 минут. Как ускорить?',
      en: '200 Playwright E2E tests each log in through the login form, and the run takes 40 minutes. How do you speed it up?',
    },
    options: [
      { text: { ru: 'Отключить вход и сделать все страницы публичными на время тестов', en: 'Disable auth and make all pages public during tests' } },
      {
        text: {
          ru: 'Войти один раз в setup-проекте, сохранить `storageState` (cookie, localStorage) и переиспользовать его во всех тестах',
          en: 'Log in once in a setup project, save `storageState` (cookies, localStorage) and reuse it in all tests',
        },
      },
      { text: { ru: 'Увеличить таймауты', en: 'Increase timeouts' } },
      { text: { ru: 'Запускать тесты последовательно в одном воркере', en: 'Run tests sequentially in one worker' } },
      { text: { ru: 'Объединить все тесты в один большой', en: 'Merge all tests into one big test' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вход через интерфейс достаточно проверить одним тестом. Остальным нужна уже авторизованная сессия: setup-проект логинится, сохраняет состояние браузера в файл, а тесты стартуют с ним через `storageState`. Если тесты меняют данные пользователя, каждому параллельному воркеру дают свой аккаунт.',
          en: 'Logging in through the UI needs just one test. The rest need an already authenticated session: a setup project logs in and saves browser state to a file, and tests start with it via `storageState`. If tests change user data, give each parallel worker its own account.',
        },
      },
    ],
    sources: [{ title: 'Playwright — Authentication', url: 'https://playwright.dev/docs/auth' }],
  },
  {
    id: 'test-tdd-003',
    topic: 'testing',
    tags: ['testing-tdd', 'testing-mocks'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В тестах репозиторий заменён рабочей реализацией, которая хранит данные в `Map` в памяти. Как называется такой тестовый дублёр?',
      en: 'In tests the repository is replaced by a working implementation that stores data in an in-memory `Map`. What kind of test double is this?',
    },
    options: [
      { text: { ru: 'Stub — заготовленные ответы', en: 'Stub — canned answers' } },
      { text: { ru: 'Mock — проверка ожидаемых вызовов', en: 'Mock — verifying expected calls' } },
      { text: { ru: 'Fake — упрощённая, но работающая реализация', en: 'Fake — a simplified but working implementation' } },
      { text: { ru: 'Spy — запись вызовов настоящего объекта', en: 'Spy — recording calls to a real object' } },
      { text: { ru: 'Dummy — объект-заглушка, который не используется', en: 'Dummy — a placeholder that isn’t used' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Fake** действительно работает — сохраняет и находит записи, — но упрощённо: в памяти вместо базы. **Stub** лишь возвращает заготовленные ответы, **mock** заранее знает ожидаемые вызовы и проверяет их, **spy** записывает вызовы, **dummy** просто заполняет параметр. Fake хорош тем, что тест проверяет поведение, а не детали вызовов.',
          en: 'A **fake** actually works — it stores and finds records — but in a simplified way: in memory instead of a database. A **stub** only returns canned answers, a **mock** knows expected calls in advance and verifies them, a **spy** records calls, a **dummy** just fills a parameter. A fake is good because the test checks behavior, not call details.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — TestDouble', url: 'https://martinfowler.com/bliki/TestDouble.html' }],
  },
  {
    id: 'test-basics-004',
    topic: 'testing',
    tags: ['testing-basics'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'С флагом случайного порядка (`--randomize` в Jest, `sequence.shuffle` в Vitest) часть тестов начала падать. О чём это говорит?',
      en: 'With random order enabled (`--randomize` in Jest, `sequence.shuffle` in Vitest), some tests started failing. What does that tell you?',
    },
    options: [
      { text: { ru: 'Флаг сломан, его нужно выключить', en: 'The flag is broken and should be turned off' } },
      {
        text: {
          ru: 'Тесты зависят друг от друга через общее состояние: один оставляет данные или моки, на которые неявно опирается другой',
          en: 'Tests depend on each other via shared state: one leaves data or mocks that another implicitly relies on',
        },
      },
      { text: { ru: 'Тестов слишком много', en: 'There are too many tests' } },
      { text: { ru: 'Нужно больше `expect` в каждом тесте', en: 'Each test needs more `expect`s' } },
      { text: { ru: 'Это нормально, порядок тестов всегда важен', en: 'It’s normal, test order always matters' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждый тест должен проходить отдельно и в любом порядке. Если перестановка ломает тесты, кто-то из них мутирует общий объект, не сбрасывает моки, данные в базе или модульное состояние. Лечится изоляцией: свежие данные в `beforeEach`, сброс моков, отдельные экземпляры вместо общих синглтонов. Случайный порядок как раз и нужен, чтобы находить такие связи.',
          en: 'Each test must pass on its own and in any order. If shuffling breaks tests, one of them mutates a shared object or leaves mocks, database data or module state behind. The cure is isolation: fresh data in `beforeEach`, resetting mocks, separate instances instead of shared singletons. Random order exists precisely to surface such coupling.',
        },
      },
    ],
    sources: [
      { title: 'Jest — CLI: --randomize', url: `${JEST}/cli#--randomize` },
      { title: 'Vitest — sequence', url: 'https://vitest.dev/config/sequence.html' },
    ],
  },
  {
    id: 'test-unit-006',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'После правки вёрстки упали 40 снапшот-тестов, и их обновили через `-u`, не глядя. В чём проблема такого подхода?',
      en: 'After a markup change 40 snapshot tests failed, and they were updated with `-u` without looking. What’s wrong with this approach?',
    },
    options: [
      { text: { ru: 'Ни в чём: снапшоты для этого и нужны', en: 'Nothing: that’s what snapshots are for' } },
      {
        text: {
          ru: 'Большие снапшоты никто не читает: настоящую регрессию примут вместе с ожидаемыми изменениями',
          en: 'Nobody reads big snapshots: a real regression gets accepted along with the expected changes',
        },
      },
      { text: { ru: '`-u` удаляет тесты', en: '`-u` deletes the tests' } },
      { text: { ru: 'Снапшоты нельзя хранить в git', en: 'Snapshots can’t be stored in git' } },
      { text: { ru: 'Снапшоты работают только для строк', en: 'Snapshots only work for strings' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Снапшот ловит **любое** изменение, но не знает, какое из них ошибка. Если снапшоты огромные и меняются часто, их обновляют не читая, и тест перестаёт что-либо защищать. Снапшоты делают маленькими и сфокусированными (часто — `toMatchInlineSnapshot` прямо в тесте), а важное поведение проверяют явными `expect`.',
          en: 'A snapshot catches **any** change but doesn’t know which one is a bug. If snapshots are huge and change often, people update them without reading, and the test stops protecting anything. Keep snapshots small and focused (often `toMatchInlineSnapshot` right in the test), and check important behavior with explicit `expect`s.',
        },
      },
    ],
    sources: [
      { title: 'Jest — Snapshot Testing: best practices', url: `${JEST}/snapshot-testing` },
      { title: 'Kent C. Dodds — Effective Snapshot Testing', url: 'https://kentcdodds.com/blog/effective-snapshot-testing' },
    ],
  },
];
