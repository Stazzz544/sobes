import type { Question } from '../model/types';

const JEST = 'https://jestjs.io/docs';
const RTL = 'https://testing-library.com/docs';
const FOWLER = 'https://martinfowler.com';
const PLAYWRIGHT = 'https://playwright.dev/docs';

export const TESTING_QUESTIONS: Question[] = [
  {
    id: 'test-basics-001',
    kind: 'order',
    topic: 'testing',
    tags: ['testing-basics'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Расставьте виды тестов по пирамиде: от тех, которых должно быть больше всего, к тем, которых меньше всего.',
      en: 'Order the test types by the pyramid: from the most numerous to the fewest.',
    },
    items: [
      { text: { ru: 'Юнит-тесты', en: 'Unit tests' } },
      { text: { ru: 'Интеграционные тесты', en: 'Integration tests' } },
      { text: { ru: 'E2E-тесты', en: 'E2E tests' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Юнит-тесты быстрые и дешёвые — их больше всего. Интеграционные проверяют связки частей и медленнее. E2E идут через настоящий браузер: самые медленные, дорогие в поддержке и хрупкие — их держат немного, для ключевых сценариев.',
          en: 'Unit tests are fast and cheap — they’re the most numerous. Integration tests check how parts fit together and are slower. E2E tests go through a real browser: the slowest, costliest to maintain and most brittle — keep a few for key scenarios.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — Test Pyramid', url: `${FOWLER}/bliki/TestPyramid.html` }],
  },
  {
    id: 'test-basics-002',
    topic: 'testing',
    tags: ['testing-basics'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что лучше проверять в тесте компонента счётчика?', en: 'What should a counter component test check?' },
    options: [
      { text: { ru: 'Что внутреннее состояние `count` стало равно 1', en: 'That the internal `count` state became 1' } },
      { text: { ru: 'Что после клика по кнопке «+» на экране видно «1»', en: 'That after clicking the “+” button the screen shows “1”' } },
      { text: { ru: 'Что `setCount` вызвали ровно один раз', en: 'That `setCount` was called exactly once' } },
      { text: { ru: 'Что у кнопки есть класс `btn-primary`', en: 'That the button has the `btn-primary` class' } },
      { text: { ru: 'Что компонент — функция, а не класс', en: 'That the component is a function, not a class' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Тест должен проверять **поведение**, которое видит пользователь: нажал «+» — увидел «1». Проверки состояния, вызовов сеттера и классов привязаны к реализации: после рефакторинга (например, переезда на `useReducer`) они упадут, хотя всё работает, и при этом не поймают баг в отображении.',
          en: 'A test should check **behavior** the user sees: clicked “+” — saw “1”. Checks of state, setter calls and classes are tied to implementation: after a refactor (say, moving to `useReducer`) they fail although everything works, and they still miss a rendering bug.',
        },
      },
    ],
    sources: [
      { title: 'Kent C. Dodds — Testing Implementation Details', url: 'https://kentcdodds.com/blog/testing-implementation-details' },
      { title: 'Testing Library — Guiding Principles', url: `${RTL}/guiding-principles` },
    ],
  },
  {
    id: 'test-basics-003',
    topic: 'testing',
    tags: ['testing-basics'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Тест в CI иногда падает без изменений в коде, а при перезапуске проходит. Как правильнее поступить?',
      en: 'A CI test sometimes fails without code changes and passes on rerun. What’s the right move?',
    },
    options: [
      { text: { ru: 'Настроить автоматический перезапуск до зелёного', en: 'Set up automatic reruns until it’s green' } },
      { text: { ru: 'Увеличить все таймауты вдвое', en: 'Double all timeouts' } },
      {
        text: {
          ru: 'Найти источник недетерминизма — время, сеть, порядок тестов, общее состояние — и устранить или изолировать тест',
          en: 'Find the source of non-determinism — time, network, test order, shared state — and fix it or quarantine the test',
        },
      },
      { text: { ru: 'Игнорировать: главное, что в основном проходит', en: 'Ignore it: it mostly passes' } },
      { text: { ru: 'Удалить все тесты этого модуля', en: 'Delete all tests of that module' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Нестабильный (flaky) тест опасен: к красному CI привыкают и пропускают настоящие поломки. Перезапуски и таймауты прячут проблему. Причину ищут в зависимости от времени, сети, порядка тестов или общего состояния; пока не починили — изолируют, чтобы не шумел.',
          en: 'A flaky test is dangerous: people get used to red CI and miss real breakages. Reruns and timeouts hide the problem. Look for the cause in time, network, test order or shared state; until it’s fixed, quarantine it so it doesn’t add noise.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — Eradicating Non-Determinism in Tests', url: `${FOWLER}/articles/nonDeterminism.html` }],
  },
  {
    id: 'test-unit-001',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какая проверка пройдёт?', en: 'Which assertion passes?' },
    code: { lang: 'js', source: `const user = { id: 1, name: 'Ann' };` },
    options: [
      { code: "expect(user).toBe({ id: 1, name: 'Ann' })" },
      { code: "expect(user).toEqual({ id: 1, name: 'Ann' })" },
      { code: "expect(user).toEqual({ id: 1 })" },
      { code: "expect(user).toBe('{ id: 1, name: \"Ann\" }')" },
      { code: "expect(user).toStrictEqual({ id: '1', name: 'Ann' })" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`toBe` сравнивает через `Object.is`: два разных объекта не равны, даже с одинаковым содержимым. `toEqual` рекурсивно сравнивает содержимое — проходит. `toEqual({ id: 1 })` не пройдёт из-за лишнего `name`, а `toStrictEqual` с `id: \'1\'` — из-за типа.',
          en: '`toBe` compares with `Object.is`: two different objects aren’t equal even with the same content. `toEqual` recursively compares content — it passes. `toEqual({ id: 1 })` fails because of the extra `name`, and `toStrictEqual` with `id: \'1\'` fails on the type.',
        },
      },
    ],
    sources: [{ title: 'Jest — Expect', url: `${JEST}/expect` }],
  },
  {
    id: 'test-unit-002',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что не так с этим тестом?', en: 'What’s wrong with this test?' },
    code: {
      lang: 'js',
      source: `test('loads the user', () => {
  fetchUser(1).then((user) => {
    expect(user.name).toBe('Bob');
  });
});`,
    },
    options: [
      { text: { ru: 'Всё правильно', en: 'Nothing, it’s fine' } },
      {
        text: {
          ru: 'Тест завершится до проверки внутри `then` и может пройти, даже если имя не «Bob»',
          en: 'The test finishes before the check inside `then` and may pass even if the name isn’t “Bob”',
        },
      },
      { text: { ru: '`expect` нельзя вызывать внутри `then`', en: '`expect` can’t be called inside `then`' } },
      { text: { ru: 'Нужно `toEqual` вместо `toBe`', en: 'It needs `toEqual` instead of `toBe`' } },
      { text: { ru: 'Тесты не могут вызывать сетевые функции', en: 'Tests can’t call network functions' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Функция теста синхронная и ничего не возвращает, поэтому раннер считает тест завершённым сразу — проверка в `then` выполнится позже или не будет учтена. Нужно вернуть промис или сделать тест `async` и написать `await`.',
          en: 'The test function is synchronous and returns nothing, so the runner considers it done immediately — the check in `then` runs later or isn’t counted. Return the promise or make the test `async` and `await` it.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `test('loads the user', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Bob');
});`,
        },
      },
    ],
    sources: [{ title: 'Jest — Testing Asynchronous Code', url: `${JEST}/asynchronous` }],
  },
  {
    id: 'test-unit-003',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 1,
    popular: false,
    prompt: { ru: 'Зачем нужен `beforeEach`?', en: 'What is `beforeEach` for?' },
    options: [
      { text: { ru: 'Запустить тесты параллельно', en: 'Run tests in parallel' } },
      {
        text: {
          ru: 'Подготовить одинаковое состояние перед каждым тестом, чтобы тесты не влияли друг на друга',
          en: 'Set up the same state before each test so tests don’t affect each other',
        },
      },
      { text: { ru: 'Выполнить код один раз перед всеми тестами файла', en: 'Run code once before all tests in the file' } },
      { text: { ru: 'Пропустить упавшие тесты', en: 'Skip failing tests' } },
      { text: { ru: 'Повторить тест несколько раз', en: 'Repeat a test several times' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`beforeEach` выполняется перед **каждым** тестом: свежие данные, новый рендер, сброшенные моки. Тогда тесты не зависят от порядка и от того, что «наследили» соседи. Один раз перед всеми тестами файла — это `beforeAll`.',
          en: '`beforeEach` runs before **every** test: fresh data, a new render, reset mocks. Then tests don’t depend on order or on what neighbors left behind. Running once before all tests in a file is `beforeAll`.',
        },
      },
    ],
    sources: [{ title: 'Jest — Setup and Teardown', url: `${JEST}/setup-teardown` }],
  },
  {
    id: 'test-unit-004',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Как проверить, что функция бросает ошибку?', en: 'How do you check that a function throws?' },
    code: { lang: 'js', source: `function parseAge(value) {\n  if (value < 0) throw new Error('negative');\n  return value;\n}` },
    options: [
      { code: 'expect(parseAge(-1)).toThrow()' },
      { code: 'expect(() => parseAge(-1)).toThrow()' },
      { code: 'expect(parseAge).toThrow(-1)' },
      { code: "expect(parseAge(-1)).toBe('negative')" },
      { code: 'expect(() => parseAge(1)).toThrow()' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`toThrow` должен сам вызвать код, поэтому в `expect` передают **функцию-обёртку**. В варианте `expect(parseAge(-1))` ошибка вылетит ещё при вычислении аргумента — до `expect`, и тест упадёт с этой ошибкой вместо проверки.',
          en: '`toThrow` must call the code itself, so you pass a **wrapper function** to `expect`. In `expect(parseAge(-1))` the error is thrown while evaluating the argument — before `expect` — and the test fails with that error instead of asserting.',
        },
      },
    ],
    sources: [{ title: 'Jest — Expect: .toThrow', url: `${JEST}/expect` }],
  },
  {
    id: 'test-mocks-001',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Как проверить, что компонент вызвал колбэк `onSave` с нужными данными?',
      en: 'How do you check that a component called the `onSave` callback with the right data?',
    },
    options: [
      { text: { ru: 'Добавить `console.log` в `onSave` и посмотреть вывод', en: 'Add `console.log` to `onSave` and read the output' } },
      {
        text: {
          ru: 'Передать `jest.fn()` и проверить `toHaveBeenCalledWith({ title: \'Hi\' })`',
          en: 'Pass `jest.fn()` and assert `toHaveBeenCalledWith({ title: \'Hi\' })`',
        },
      },
      { text: { ru: 'Проверить, что кнопка «Сохранить» существует', en: 'Check that the “Save” button exists' } },
      { text: { ru: 'Сделать снапшот компонента', en: 'Take a component snapshot' } },
      { text: { ru: 'Передать настоящую функцию сохранения на сервер', en: 'Pass the real save-to-server function' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Мок-функция запоминает каждый вызов и аргументы, поэтому можно проверить и сам факт вызова, и данные: `toHaveBeenCalledWith`, `toHaveBeenCalledTimes`. Настоящий запрос на сервер сделает тест медленным и нестабильным.',
          en: 'A mock function records every call and its arguments, so you can check both the call and the data: `toHaveBeenCalledWith`, `toHaveBeenCalledTimes`. A real server call makes the test slow and flaky.',
        },
      },
    ],
    sources: [{ title: 'Jest — Mock Functions', url: `${JEST}/mock-functions` }],
  },
  {
    id: 'test-mocks-002',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Поиск запускается через 300 мс после ввода (debounce). Как протестировать это быстро и надёжно?',
      en: 'Search runs 300 ms after typing (debounce). How do you test it quickly and reliably?',
    },
    options: [
      { text: { ru: 'Подождать в тесте `setTimeout` на 500 мс', en: 'Wait in the test with a 500 ms `setTimeout`' } },
      {
        text: {
          ru: 'Включить фейковые таймеры и прокрутить время на 300 мс',
          en: 'Enable fake timers and advance time by 300 ms',
        },
      },
      { text: { ru: 'Убрать debounce из кода на время тестов', en: 'Remove the debounce from the code for tests' } },
      { text: { ru: 'Проверять только, что поле ввода существует', en: 'Only check that the input exists' } },
      { text: { ru: 'Запускать такой тест только вручную', en: 'Run such a test only manually' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`jest.useFakeTimers()` (или `vi.useFakeTimers()`) подменяет таймеры, а `advanceTimersByTime(300)` мгновенно «прокручивает» время — тест быстрый и детерминированный. Настоящие паузы замедляют набор и делают его нестабильным, а удаление debounce проверяет уже другой код.',
          en: '`jest.useFakeTimers()` (or `vi.useFakeTimers()`) replaces timers, and `advanceTimersByTime(300)` moves time forward instantly — the test is fast and deterministic. Real waits slow the suite and make it flaky, and removing the debounce tests different code.',
        },
      },
    ],
    sources: [
      { title: 'Jest — Timer Mocks', url: `${JEST}/timer-mocks` },
      { title: 'Vitest — Mocking', url: 'https://vitest.dev/guide/mocking' },
    ],
  },
  {
    id: 'test-mocks-003',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Тест «вызвано 1 раз» проходит отдельно, но падает в общем прогоне с «вызвано 3 раза». Вероятная причина?',
      en: 'A “called once” test passes alone but fails in the full run with “called 3 times”. Likely cause?',
    },
    options: [
      { text: { ru: 'Ошибка в Jest', en: 'A bug in Jest' } },
      {
        text: {
          ru: 'Общий мок не очищается между тестами, и вызовы из соседних тестов накапливаются',
          en: 'A shared mock isn’t cleared between tests, so calls from neighboring tests accumulate',
        },
      },
      { text: { ru: 'Компьютер CI слишком медленный', en: 'The CI machine is too slow' } },
      { text: { ru: 'Нужно заменить `toHaveBeenCalledTimes` на `toBe`', en: 'Replace `toHaveBeenCalledTimes` with `toBe`' } },
      { text: { ru: 'Тесты нельзя запускать вместе', en: 'Tests can’t run together' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Мок, объявленный на уровне файла, хранит историю вызовов всех тестов. Его сбрасывают в `beforeEach` (`jest.clearAllMocks()`) или включают `clearMocks` в конфигурации — тогда каждый тест начинает с чистого листа.',
          en: 'A mock declared at file level keeps the call history of all tests. Reset it in `beforeEach` (`jest.clearAllMocks()`) or enable `clearMocks` in the config — then each test starts from a clean slate.',
        },
      },
    ],
    sources: [
      { title: 'Jest — The Jest Object: clearAllMocks', url: `${JEST}/jest-object` },
      { title: 'Jest — Mock Functions', url: `${JEST}/mock-functions` },
    ],
  },
  {
    id: 'test-mocks-004',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Как лучше подменить ответы API в тестах компонентов, которые загружают данные?',
      en: 'What’s the best way to fake API responses in tests of components that load data?',
    },
    options: [
      { text: { ru: 'Ходить на настоящий тестовый сервер', en: 'Hit a real test server' } },
      { text: { ru: 'Замокать `useEffect`', en: 'Mock `useEffect`' } },
      {
        text: {
          ru: 'Перехватывать запросы на уровне сети (например, MSW): компонент делает настоящий `fetch`, ответ приходит из обработчика',
          en: 'Intercept requests at the network level (e.g. MSW): the component makes a real `fetch`, and the response comes from a handler',
        },
      },
      { text: { ru: 'Передавать данные в компонент только пропсами', en: 'Pass data to the component only via props' } },
      { text: { ru: 'Вообще не тестировать такие компоненты', en: 'Don’t test such components at all' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Перехват на уровне сети оставляет код компонента нетронутым: проверяются и сам запрос, и обработка ответа, и состояния загрузки и ошибки. Те же обработчики можно переиспользовать в разработке и в Storybook. Мок `useEffect` или клиента ломает связь теста с реальным кодом.',
          en: 'Network-level interception leaves the component code untouched: the request, the response handling and the loading and error states are all tested. The same handlers can be reused in development and Storybook. Mocking `useEffect` or the client breaks the link between the test and real code.',
        },
      },
    ],
    sources: [
      { title: 'Mock Service Worker', url: 'https://mswjs.io/docs/' },
      { title: 'Kent C. Dodds — Common mistakes with React Testing Library', url: 'https://kentcdodds.com/blog/common-mistakes-with-react-testing-library' },
    ],
  },
  {
    id: 'test-components-001',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой запрос Testing Library предпочтителен, чтобы найти кнопку «Сохранить»?', en: 'Which Testing Library query is preferred to find the “Save” button?' },
    options: [
      { code: "screen.getByTestId('save-btn')" },
      { code: "screen.getByRole('button', { name: /save/i })" },
      { code: "container.querySelector('.btn-save')" },
      { code: "screen.getByText('Save').parentElement" },
      { code: 'screen.getAllByRole(\'button\')[2]' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`getByRole` ищет элемент так, как его воспринимает пользователь и вспомогательные технологии: по роли и **доступному имени**. Заодно это проверка доступности — кнопку без имени так не найти. `getByTestId` — запасной вариант, CSS-селекторы и индексы ломаются при изменении вёрстки.',
          en: '`getByRole` finds an element the way users and assistive technology perceive it: by role and **accessible name**. It doubles as an accessibility check — a nameless button can’t be found this way. `getByTestId` is a fallback; CSS selectors and indexes break when markup changes.',
        },
      },
    ],
    sources: [{ title: 'Testing Library — About Queries', url: `${RTL}/queries/about/` }],
  },
  {
    id: 'test-components-002',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Как проверить, что сообщения об ошибке нет на экране?', en: 'How do you check that an error message is NOT on the screen?' },
    options: [
      { code: "expect(screen.getByText('Error')).toBeNull()" },
      { code: "expect(screen.queryByText('Error')).not.toBeInTheDocument()" },
      { code: "expect(await screen.findByText('Error')).toBeNull()" },
      { code: "expect(screen.getByText('Error')).not.toBeVisible()" },
      { code: "expect(screen.getAllByText('Error')).toHaveLength(0)" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`getBy*` и `getAllBy*` **бросают ошибку**, если ничего не найдено, — проверка до `expect` не дойдёт. `queryBy*` возвращает `null`, поэтому им проверяют отсутствие. `findBy*` ждёт появления и упадёт по таймауту.',
          en: '`getBy*` and `getAllBy*` **throw** when nothing is found — the check never reaches `expect`. `queryBy*` returns `null`, so use it to assert absence. `findBy*` waits for the element to appear and fails on timeout.',
        },
      },
    ],
    sources: [{ title: 'Testing Library — About Queries', url: `${RTL}/queries/about/` }],
  },
  {
    id: 'test-components-003',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'После клика список загружается с сервера и появляется через ~200 мс. Как дождаться первого пункта?',
      en: 'After a click, a list loads from the server and appears in ~200 ms. How do you wait for the first item?',
    },
    options: [
      { code: "expect(screen.getByText('Item 1')).toBeInTheDocument()" },
      { code: "expect(await screen.findByText('Item 1')).toBeInTheDocument()" },
      { code: "await new Promise((r) => setTimeout(r, 200))" },
      { code: "expect(screen.queryByText('Item 1')).toBeInTheDocument()" },
      { code: "screen.debug()" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`findBy*` возвращает промис и повторяет поиск, пока элемент не появится или не истечёт таймаут (по умолчанию 1 с). `getBy` и `queryBy` проверяют мгновенно и не увидят данные, которые ещё грузятся, а фиксированная пауза делает тест медленным и нестабильным.',
          en: '`findBy*` returns a promise and retries until the element appears or the timeout (1 s by default) expires. `getBy` and `queryBy` check instantly and won’t see data that’s still loading, and a fixed sleep makes the test slow and flaky.',
        },
      },
    ],
    sources: [{ title: 'Testing Library — Async Methods', url: `${RTL}/dom-testing-library/api-async/` }],
  },
  {
    id: 'test-components-004',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Чем `userEvent.type` лучше, чем `fireEvent.change`?', en: 'Why is `userEvent.type` better than `fireEvent.change`?' },
    options: [
      { text: { ru: 'Он быстрее', en: 'It’s faster' } },
      {
        text: {
          ru: 'Он воспроизводит ввод как пользователь: фокус, нажатия клавиш, события `input` по символам',
          en: 'It simulates input like a user: focus, key presses, per-character `input` events',
        },
      },
      { text: { ru: 'Он работает без рендера компонента', en: 'It works without rendering the component' } },
      { text: { ru: '`fireEvent` удалён из Testing Library', en: '`fireEvent` was removed from Testing Library' } },
      { text: { ru: 'Он не требует `await`', en: 'It doesn’t need `await`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`fireEvent.change` отправляет одно событие и сразу подставляет значение. `userEvent` проходит путь пользователя: фокусирует поле, генерирует `keydown`/`keypress`/`input`/`keyup` для каждого символа, учитывает `disabled` и `maxlength`. Так тест ловит больше реальных проблем. Методы `userEvent` асинхронные и требуют `await`.',
          en: '`fireEvent.change` dispatches one event and sets the value at once. `userEvent` goes the user’s way: focuses the field, fires `keydown`/`keypress`/`input`/`keyup` per character, respects `disabled` and `maxlength`. The test catches more real problems. `userEvent` methods are async and need `await`.',
        },
      },
    ],
    sources: [{ title: 'Testing Library — user-event', url: `${RTL}/user-event/intro` }],
  },
  {
    id: 'test-e2e-001',
    topic: 'testing',
    tags: ['testing-e2e'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'E2E-тест иногда падает: кнопка ещё не появилась, когда по ней кликают. Как исправить?',
      en: 'An E2E test sometimes fails: the button hasn’t appeared yet when it’s clicked. How do you fix it?',
    },
    options: [
      { code: 'await page.waitForTimeout(3000)' },
      { code: "await page.getByRole('button', { name: 'Pay' }).click()" },
      { code: "await page.click('#root > div:nth-child(3) button')" },
      { code: 'await page.reload()' },
      { code: 'test.describe.configure({ retries: 5 })' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Действия с локатором в Playwright сами ждут, пока элемент станет видимым, доступным и стабильным, — фиксированная пауза не нужна. `waitForTimeout` либо слишком длинный, либо однажды окажется коротким. Хрупкий CSS-путь ломается при изменении вёрстки, а повторы прячут проблему.',
          en: 'Locator actions in Playwright wait on their own until the element is visible, enabled and stable — no fixed sleep needed. `waitForTimeout` is either too long or one day too short. A brittle CSS path breaks when markup changes, and retries hide the problem.',
        },
      },
    ],
    sources: [
      { title: 'Playwright — Auto-waiting', url: `${PLAYWRIGHT}/actionability` },
      { title: 'Playwright — Locators', url: `${PLAYWRIGHT}/locators` },
    ],
  },
  {
    id: 'test-e2e-002',
    topic: 'testing',
    tags: ['testing-e2e'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что стоит покрывать E2E-тестами в первую очередь?', en: 'What should E2E tests cover first?' },
    options: [
      { text: { ru: 'Каждую кнопку и каждое поле приложения', en: 'Every button and field in the app' } },
      {
        text: {
          ru: 'Критичные сценарии, поломка которых дороже всего: вход, оплата, ключевая форма',
          en: 'Critical scenarios whose breakage costs the most: sign-in, checkout, the key form',
        },
      },
      { text: { ru: 'Расчёты в утилитах', en: 'Calculations in utilities' } },
      { text: { ru: 'Цвета и отступы', en: 'Colors and spacing' } },
      { text: { ru: 'Только страницу 404', en: 'Only the 404 page' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'E2E-тесты медленные и дорогие в поддержке, поэтому их немного и на самое важное — сквозные сценарии, без которых продукт не работает. Логику функций выгоднее проверять юнит-тестами, а мелкое поведение компонентов — интеграционными.',
          en: 'E2E tests are slow and costly to maintain, so keep a few for what matters most — end-to-end scenarios the product can’t work without. Function logic is cheaper to cover with unit tests, and small component behavior with integration tests.',
        },
      },
    ],
    sources: [
      { title: 'Martin Fowler — Test Pyramid', url: `${FOWLER}/bliki/TestPyramid.html` },
      { title: 'Playwright — Best Practices', url: `${PLAYWRIGHT}/best-practices` },
    ],
  },
  {
    id: 'test-e2e-003',
    topic: 'testing',
    tags: ['testing-e2e'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой локатор в Playwright самый устойчивый к редизайну?', en: 'Which Playwright locator is most resilient to a redesign?' },
    options: [
      { code: "page.locator('.MuiButton-root.css-1x2y3z')" },
      { code: "page.locator('xpath=//div[2]/div/button')" },
      { code: "page.getByRole('button', { name: 'Sign in' })" },
      { code: "page.locator('button').nth(4)" },
      { code: "page.locator('#btn-17')" },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Роль и доступное имя — то, что видит пользователь; они меняются только когда меняется смысл интерфейса. Сгенерированные классы, XPath по структуре и индексы ломаются при любой перестановке вёрстки.',
          en: 'Role and accessible name are what the user sees; they change only when the UI’s meaning changes. Generated classes, structural XPath and indexes break with any markup rearrangement.',
        },
      },
    ],
    sources: [
      { title: 'Playwright — Best Practices', url: `${PLAYWRIGHT}/best-practices` },
      { title: 'Playwright — Locators', url: `${PLAYWRIGHT}/locators` },
    ],
  },
  {
    id: 'test-tdd-001',
    kind: 'order',
    topic: 'testing',
    tags: ['testing-tdd'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Расставьте шаги цикла TDD по порядку.', en: 'Put the steps of the TDD cycle in order.' },
    items: [
      { text: { ru: 'Написать тест на новое поведение и увидеть, что он падает', en: 'Write a test for new behavior and see it fail' } },
      { text: { ru: 'Написать минимальный код, чтобы тест прошёл', en: 'Write the minimal code to make it pass' } },
      { text: { ru: 'Улучшить код, не меняя поведения, — тесты остаются зелёными', en: 'Improve the code without changing behavior — tests stay green' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '«Красный → зелёный → рефакторинг». Падение на первом шаге доказывает, что тест вообще проверяет новое поведение. Минимальный код не даёт написать лишнего, а рефакторинг идёт под защитой тестов.',
          en: '“Red → green → refactor”. The failure in step one proves the test actually checks the new behavior. Minimal code keeps you from writing extra, and refactoring happens under the protection of tests.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — Test Driven Development', url: `${FOWLER}/bliki/TestDrivenDevelopment.html` }],
  },
  {
    id: 'test-tdd-002',
    topic: 'testing',
    tags: ['testing-tdd'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Покрытие кода тестами — 100%. Что это гарантирует?', en: 'Code coverage is 100%. What does that guarantee?' },
    options: [
      { text: { ru: 'Что в коде нет багов', en: 'That the code has no bugs' } },
      {
        text: {
          ru: 'Только то, что каждая строка выполнялась во время тестов — но не что её результат проверен',
          en: 'Only that every line ran during tests — not that its result was checked',
        },
      },
      { text: { ru: 'Что приложение работает во всех браузерах', en: 'That the app works in all browsers' } },
      { text: { ru: 'Что E2E-тесты больше не нужны', en: 'That E2E tests are no longer needed' } },
      { text: { ru: 'Что тесты быстрые', en: 'That the tests are fast' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Покрытие считает, какие строки и ветки выполнились, а не что проверено: тест без единого `expect` тоже «покрывает» код. Низкое покрытие полезно как сигнал о непроверенных местах, но погоня за 100% даёт хрупкие тесты ради цифры.',
          en: 'Coverage counts which lines and branches ran, not what was checked: a test with no `expect` also “covers” code. Low coverage is a useful signal of untested areas, but chasing 100% yields brittle tests for the sake of a number.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — Test Coverage', url: `${FOWLER}/bliki/TestCoverage.html` }],
  },
];
