import type { Lesson } from '../model/types';

const JEST = 'https://jestjs.io/docs';
const RTL = 'https://testing-library.com/docs';
const FOWLER = 'https://martinfowler.com';

export const TESTING_LESSONS: Lesson[] = [
  {
    tag: 'testing-basics',
    format: 'steps',
    summary: {
      ru: 'Тесты нужны, чтобы менять код без страха. Это работает, только если они проверяют поведение, не зависят друг от друга и падают лишь тогда, когда сломано что-то настоящее.',
      en: 'Tests exist so you can change code without fear. That works only if they check behavior, don’t depend on each other and fail only when something real is broken.',
    },
    steps: [
      {
        id: 'pyramid',
        title: { ru: 'Пирамида и трофей', en: 'The pyramid and the trophy' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Классическая **пирамида**: больше всего юнит-тестов — они быстрые и дешёвые, меньше интеграционных, которые проверяют связки частей, и совсем немного E2E — они идут через настоящий браузер, самые медленные и хрупкие. Для фронтенда Кент Доддс предложил **трофей**: внизу статический анализ — TypeScript и ESLint ловят опечатки почти бесплатно, — а больше всего вкладываются в **интеграционные** тесты компонентов, которые работают вместе, как у пользователя.',
              en: 'The classic **pyramid**: mostly unit tests — fast and cheap — fewer integration tests that check how parts connect, and very few E2E tests, which run through a real browser and are the slowest and most fragile. For the front end, Kent C. Dodds proposed the **trophy**: static analysis at the base — TypeScript and ESLint catch typos almost for free — and the biggest investment goes into **integration** tests of components working together, as they do for users.',
            },
          },
          {
            type: 'illustration',
            illustration: 'testing-pyramid-trophy',
          },
        ],
        test: ['test-basics-001', 'test-basics-006'],
      },
      {
        id: 'behavior',
        title: { ru: 'Проверять поведение', en: 'Test behavior' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Тест проверяет **поведение**, которое видит пользователь: нажал «+» — увидел «1». Проверки внутреннего состояния, вызовов сеттера и CSS-классов привязаны к реализации: после рефакторинга тест упадёт, хотя всё работает, — или, наоборот, пропустит баг. Название теста описывает поведение и условие, как требование: «показывает сумму со скидкой 10% для заказов дороже 5000 ₽». При падении сразу понятно, что сломалось.',
              en: 'A test checks **behavior** the user sees: clicked “+” — saw “1”. Checks of internal state, setter calls and CSS classes are tied to the implementation: after a refactor the test fails though everything works — or misses a bug. A test name describes behavior and condition like a requirement: “shows the total with a 10% discount for orders over 5000”. When it fails, you know at once what broke.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'implementation-detail',
              prompt: {
                ru: 'Тест проверяет, что компонент вызвал `setCount(1)`. Что случится, если переписать компонент на `useReducer`?',
                en: 'A test checks that a component called `setCount(1)`. What happens if the component is rewritten with `useReducer`?',
              },
              options: [
                { text: { ru: 'Тест продолжит проходить', en: 'The test keeps passing' } },
                { text: { ru: 'Тест упадёт, хотя для пользователя ничего не изменилось', en: 'The test fails though nothing changed for the user' } },
                { text: { ru: 'Тест начнёт ловить больше багов', en: 'The test starts catching more bugs' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Тест держится за деталь реализации: её больше нет, и он падает. Проверка видимого результата — «на экране 1» — пережила бы рефакторинг.',
                en: 'The test clings to an implementation detail that no longer exists, so it fails. Checking the visible result — “1 on screen” — would survive the refactor.',
              },
            },
          },
        ],
        test: ['test-basics-002', 'test-basics-008'],
      },
      {
        id: 'isolation',
        title: { ru: 'Тесты не зависят друг от друга', en: 'Tests don’t depend on each other' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Каждый тест должен проходить отдельно и в любом порядке. Если два теста используют общий объект-заготовку и один его меняет, второй увидит чужие данные — поодиночке оба зелёные, вместе падают. Лекарство — фабрика, которая каждый раз создаёт свежие данные, и сброс моков и состояния в `beforeEach`. Проверить изоляцию помогает случайный порядок: `--randomize` в Jest, `sequence.shuffle` в Vitest, — упавшие тесты выдают скрытую зависимость.',
              en: 'Each test must pass on its own and in any order. If two tests share a fixture object and one mutates it, the other sees someone else’s data — each is green alone, both fail together. The cure is a factory that creates fresh data every time and resetting mocks and state in `beforeEach`. Random order helps verify isolation: `--randomize` in Jest, `sequence.shuffle` in Vitest — failing tests reveal a hidden dependency.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const makeCart = () => ({ items: [] });\n\nbeforeEach(() => {\n  cart = makeCart();\n});",
            },
            caption: { ru: 'Свежая заготовка перед каждым тестом', en: 'A fresh fixture before every test' },
          },
        ],
        test: ['test-basics-009', 'test-basics-004'],
      },
      {
        id: 'quality',
        title: { ru: 'Нестабильные тесты и качество', en: 'Flaky tests and test quality' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '[[flaky-test|Нестабильный]] тест иногда падает без изменений в коде. Он опасен: к красному CI привыкают и пропускают настоящие поломки. Перезапуски и увеличенные таймауты прячут проблему — причину ищут в зависимости от времени, сети, порядка тестов или общего состояния. А насколько тесты вообще ловят ошибки, показывает **мутационное тестирование** (Stryker): инструмент вносит мелкие ошибки — меняет `>` на `>=` — и смотрит, упадёт ли хоть один тест.',
              en: 'A [[flaky-test|flaky]] test sometimes fails with no code change. It’s dangerous: people get used to a red CI and miss real breakage. Retries and longer timeouts hide the problem — look for the cause in time, network, test order or shared state. And how well tests actually catch bugs is shown by **mutation testing** (Stryker): the tool injects small bugs — swaps `>` for `>=` — and checks whether any test fails.',
            },
          },
        ],
        test: ['test-basics-003'],
      },
    ],
    keyPoints: [
      { ru: 'Больше всего — быстрых тестов; E2E — немного и на главное.', en: 'Mostly fast tests; few E2E tests, for what matters.' },
      { ru: 'Проверяйте поведение, а не реализацию.', en: 'Test behavior, not implementation.' },
      { ru: 'Тест проходит отдельно и в любом порядке.', en: 'A test passes alone and in any order.' },
      { ru: 'Нестабильный тест чинят, а не перезапускают.', en: 'Fix a flaky test; don’t just retry it.' },
    ],
    sources: [
      { title: 'Martin Fowler — Test Pyramid', url: `${FOWLER}/bliki/TestPyramid.html` },
      { title: 'Kent C. Dodds — The Testing Trophy', url: 'https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications' },
      { title: 'Kent C. Dodds — Testing Implementation Details', url: 'https://kentcdodds.com/blog/testing-implementation-details' },
      { title: 'Martin Fowler — Eradicating Non-Determinism in Tests', url: `${FOWLER}/articles/nonDeterminism.html` },
    ],
  },
  {
    tag: 'testing-unit',
    format: 'steps',
    summary: {
      ru: 'Юнит-тест проверяет одну функцию или модуль в изоляции. Читаемая структура, правильный матчер и честное ожидание асинхронного кода — три вещи, на которых держится его польза.',
      en: 'A unit test checks one function or module in isolation. A readable structure, the right matcher and honestly awaiting async code are the three things its value rests on.',
    },
    steps: [
      {
        id: 'aaa',
        title: { ru: 'Arrange — Act — Assert', en: 'Arrange — Act — Assert' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Хороший тест читается сверху вниз в три части. **Arrange** — подготовить данные и окружение. **Act** — выполнить одно проверяемое действие. **Assert** — проверить результат. Так сразу видно, что проверяется. Если в тесте несколько «Act» подряд, он проверяет сразу несколько поведений — его лучше разделить. Для одной функции и многих входов удобен табличный тест (`test.each`): новый случай добавляется одной строкой.',
              en: 'A good test reads top to bottom in three parts. **Arrange** — prepare data and environment. **Act** — perform the one action under test. **Assert** — check the result. That makes it obvious what’s being tested. Several “Acts” in a row mean the test checks several behaviors — better to split it. For one function and many inputs, a table test (`test.each`) is handy: a new case is one more row.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "test('formats thousands', () => {\n  // Arrange\n  const price = 1500;\n  // Act\n  const text = formatPrice(price);\n  // Assert\n  expect(text).toBe('1 500');\n});",
            },
          },
        ],
        test: ['test-unit-009'],
      },
      {
        id: 'equality',
        title: { ru: 'toBe, toEqual, toStrictEqual', en: 'toBe, toEqual, toStrictEqual' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`toBe` сравнивает через `Object.is`: два разных объекта не равны, даже с одинаковым содержимым. `toEqual` рекурсивно сравнивает содержимое и **игнорирует** свойства со значением `undefined`: `{ name, avatar: undefined }` равен `{ name }`. `toStrictEqual` строже — учитывает `undefined`-свойства, дырки в массивах и класс объекта. В `node:assert` то же разделение: старый `deepEqual` сравнивает примитивы через `==`, а `deepStrictEqual` — строго.',
              en: '`toBe` compares with `Object.is`: two different objects aren’t equal even with the same content. `toEqual` compares content recursively and **ignores** properties set to `undefined`: `{ name, avatar: undefined }` equals `{ name }`. `toStrictEqual` is stricter — it counts `undefined` properties, array holes and the object’s class. `node:assert` has the same split: the legacy `deepEqual` compares primitives with `==`, while `deepStrictEqual` is strict.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'tobe-objects',
              prompt: {
                ru: 'Пройдёт ли `expect({ id: 1 }).toBe({ id: 1 })`?',
                en: 'Does `expect({ id: 1 }).toBe({ id: 1 })` pass?',
              },
              options: [
                { text: { ru: 'Да, содержимое одинаковое', en: 'Yes, the content is the same' } },
                { text: { ru: 'Нет: это два разных объекта', en: 'No: they’re two different objects' } },
                { text: { ru: 'Только в строгом режиме', en: 'Only in strict mode' } },
              ],
              answer: 1,
              explanation: {
                ru: '`toBe` проверяет идентичность, а каждый литерал `{}` создаёт новый объект. Для сравнения содержимого — `toEqual`.',
                en: '`toBe` checks identity, and each `{}` literal creates a new object. To compare content, use `toEqual`.',
              },
            },
          },
        ],
        test: ['test-unit-001', 'test-unit-008'],
      },
      {
        id: 'numbers',
        title: { ru: 'NaN, -0 и дроби', en: 'NaN, -0 and fractions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`Object.is`, а значит и `toBe`, отличается от `===` в двух местах: `NaN` равен самому себе, а `0` и `-0` различаются. Поэтому `expect(NaN).toBe(NaN)` проходит, а `expect(-0).toBe(0)` падает. Дробные результаты сравнивать через `toBe` нельзя: `0.1 + 0.2` в двоичной арифметике — `0.30000000000000004`. Для них есть `toBeCloseTo(0.3)`: он допускает разницу меньше половины единицы последнего проверяемого знака.',
              en: '`Object.is`, and therefore `toBe`, differs from `===` in two places: `NaN` equals itself, while `0` and `-0` differ. So `expect(NaN).toBe(NaN)` passes and `expect(-0).toBe(0)` fails. Fractional results can’t be compared with `toBe`: `0.1 + 0.2` in binary arithmetic is `0.30000000000000004`. For them there’s `toBeCloseTo(0.3)`: it allows a difference under half a unit of the last checked digit.',
            },
          },
        ],
        test: ['test-unit-007'],
      },
      {
        id: 'throws',
        title: { ru: 'Проверка исключений', en: 'Checking exceptions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`toThrow` должен сам вызвать код, поэтому в `expect` передают **функцию-обёртку**: `expect(() => parseAge(-1)).toThrow()`. В варианте `expect(parseAge(-1))` ошибка вылетит ещё при вычислении аргумента — до `expect`, — и тест упадёт с этой ошибкой вместо проверки. Можно уточнить, что именно брошено: `toThrow(\'negative\')` или `toThrow(RangeError)`.',
              en: '`toThrow` has to call the code itself, so you pass a **wrapper function** to `expect`: `expect(() => parseAge(-1)).toThrow()`. With `expect(parseAge(-1))` the error is thrown while evaluating the argument — before `expect` — and the test fails with that error instead of checking it. You can narrow down what was thrown: `toThrow(\'negative\')` or `toThrow(RangeError)`.',
            },
          },
        ],
        test: ['test-unit-004'],
      },
      {
        id: 'async',
        title: { ru: 'Асинхронные тесты', en: 'Async tests' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Если функция теста синхронная и ничего не возвращает, раннер считает тест завершённым сразу. Проверка внутри `then` выполнится позже, когда тест уже засчитан как успешный, — он «проходит», даже если имя не то. Нужно вернуть промис или сделать тест `async` и дождаться результата через `await`. Для отклонённых промисов есть `await expect(promise).rejects.toThrow()`.',
              en: 'If a test function is synchronous and returns nothing, the runner considers the test finished immediately. The check inside `then` runs later, after the test was already counted as passed — it “passes” even with the wrong name. Return the promise or make the test `async` and wait for the result with `await`. Rejected promises have `await expect(promise).rejects.toThrow()`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "test('loads the user', async () => {\n  const user = await fetchUser(1);\n  expect(user.name).toBe('Bob');\n});",
            },
          },
        ],
        test: ['test-unit-002'],
      },
      {
        id: 'setup-snapshots',
        title: { ru: 'beforeEach и снапшоты', en: 'beforeEach and snapshots' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`beforeEach` выполняется перед **каждым** тестом: свежие данные, новый рендер, сброшенные [[test-double|моки]]. Тогда тесты не зависят от порядка. `beforeAll` — один раз на файл, для дорогой и неизменяемой подготовки. Снапшот ловит **любое** изменение вывода, но не знает, какое из них ошибка. Если снапшоты огромные и меняются часто, их обновляют через `-u` не глядя, и настоящая регрессия проходит вместе с ожидаемыми правками. Снапшоты делают маленькими и сфокусированными.',
              en: '`beforeEach` runs before **each** test: fresh data, a new render, reset [[test-double|mocks]]. Then tests don’t depend on order. `beforeAll` runs once per file, for expensive, immutable setup. A snapshot catches **any** output change but doesn’t know which change is a bug. When snapshots are huge and change often, people update them with `-u` without looking, and a real regression slips in with the expected changes. Keep snapshots small and focused.',
            },
          },
        ],
        test: ['test-unit-003', 'test-unit-006'],
      },
    ],
    keyPoints: [
      { ru: 'Arrange — Act — Assert, одно действие на тест.', en: 'Arrange — Act — Assert, one action per test.' },
      { ru: '`toBe` — идентичность, `toEqual` — содержимое без `undefined`.', en: '`toBe` is identity; `toEqual` is content, ignoring `undefined`.' },
      { ru: 'Дроби — `toBeCloseTo`, исключения — `expect(() => …)`.', en: 'Fractions — `toBeCloseTo`; exceptions — `expect(() => …)`.' },
      { ru: 'Асинхронный тест возвращает промис или ждёт `await`.', en: 'An async test returns the promise or uses `await`.' },
      { ru: 'Снапшоты маленькие, иначе их обновляют не глядя.', en: 'Keep snapshots small, or they get updated blindly.' },
    ],
    sources: [
      { title: 'Jest — Expect', url: `${JEST}/expect` },
      { title: 'Jest — Testing Asynchronous Code', url: `${JEST}/asynchronous` },
      { title: 'Jest — Setup and Teardown', url: `${JEST}/setup-teardown` },
      { title: 'Jest — Snapshot Testing', url: `${JEST}/snapshot-testing` },
    ],
  },
  {
    tag: 'testing-mocks',
    format: 'steps',
    summary: {
      ru: '[[test-double|Моки]] подменяют то, что мешает тесту: сеть, время, колбэки. Хороший мок стоит на границе системы и сбрасывается между тестами, а избыток моков превращает тест в проверку самих моков.',
      en: '[[test-double|Mocks]] replace whatever gets in the test’s way: the network, time, callbacks. A good mock sits at the system’s boundary and is reset between tests; too many mocks turn a test into a test of the mocks.',
    },
    steps: [
      {
        id: 'mock-fn',
        title: { ru: 'Мок-функция', en: 'Mock functions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Мок-функция — `jest.fn()`, `vi.fn()` или `mock.fn()` из `node:test` — запоминает каждый вызов и его аргументы. Её передают вместо колбэка и проверяют и факт вызова, и данные: `toHaveBeenCalledWith({ title: \'Hi\' })`, `toHaveBeenCalledTimes(1)`. Сырые данные лежат в `mock.calls`: массив вызовов, у каждого — массив аргументов. Настоящий обработчик тут не нужен: важно, что компонент передал наружу.',
              en: 'A mock function — `jest.fn()`, `vi.fn()` or `mock.fn()` from `node:test` — records every call and its arguments. You pass it instead of a callback and check both the call and the data: `toHaveBeenCalledWith({ title: \'Hi\' })`, `toHaveBeenCalledTimes(1)`. The raw data lives in `mock.calls`: an array of calls, each an array of arguments. No real handler is needed: what matters is what the component passed out.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: "const onSave = jest.fn();\nrender(<Form onSave={onSave} />);\n// … fill in and submit …\nexpect(onSave).toHaveBeenCalledWith({\n  title: 'Hi',\n});",
            },
          },
        ],
        test: ['test-mocks-001'],
      },
      {
        id: 'spies-reset',
        title: { ru: 'Шпионы и сброс', en: 'Spies and resetting' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Шпион (`jest.spyOn`, `vi.spyOn`) оборачивает существующий метод: записывает вызовы, но по умолчанию **вызывает настоящую реализацию**. Сброс бывает трёх уровней: `mockClear` стирает историю вызовов, `mockReset` — ещё и подменённую реализацию, `mockRestore` возвращает оригинальный метод шпиону. Мок на уровне файла копит вызовы всех тестов: тест «вызвано 1 раз» проходит отдельно, а в общем прогоне видит 3. Поэтому моки чистят в `beforeEach` или включают `clearMocks`.',
              en: 'A spy (`jest.spyOn`, `vi.spyOn`) wraps an existing method: it records calls but by default **calls the real implementation**. Resetting has three levels: `mockClear` wipes call history, `mockReset` also the stubbed implementation, `mockRestore` puts the original method back for a spy. A file-level mock accumulates calls from every test: a “called once” test passes alone but sees 3 in the full run. So mocks are cleared in `beforeEach`, or `clearMocks` is enabled.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'spy-calls-real',
              prompt: {
                ru: '`jest.spyOn(math, \'add\')` без подмены реализации. Что вернёт `math.add(2, 3)`?',
                en: '`jest.spyOn(math, \'add\')` without stubbing the implementation. What does `math.add(2, 3)` return?',
              },
              options: [
                { text: { ru: '`undefined` — шпион глушит метод', en: '`undefined` — the spy silences the method' } },
                { text: { ru: '5 — настоящий метод вызывается, а вызов записывается', en: '5 — the real method runs and the call is recorded' } },
                { text: { ru: 'Ошибку — метод заменён', en: 'An error — the method is replaced' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Шпион по умолчанию прозрачен. Чтобы подменить результат, добавляют `.mockReturnValue(…)` или `.mockImplementation(…)`.',
                en: 'A spy is transparent by default. To change the result, add `.mockReturnValue(…)` or `.mockImplementation(…)`.',
              },
            },
          },
        ],
        test: ['test-mocks-011', 'test-mocks-003'],
      },
      {
        id: 'timers',
        title: { ru: 'Фейковые таймеры', en: 'Fake timers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`jest.useFakeTimers()` или `vi.useFakeTimers()` подменяют `setTimeout`, `setInterval` и `Date`, а время двигается только командой: `advanceTimersByTime(300)` мгновенно «прокручивает» 300 мс. Тест debounce становится быстрым и детерминированным — настоящие паузы замедляют набор и иногда оказываются короче нужного. Тесты, зависящие от «сейчас», фиксируют время через `setSystemTime(new Date(\'2026-01-15T12:00:00Z\'))` — иначе «Сегодня» сломается в полночь.',
              en: '`jest.useFakeTimers()` or `vi.useFakeTimers()` replace `setTimeout`, `setInterval` and `Date`, and time moves only on command: `advanceTimersByTime(300)` instantly “fast-forwards” 300 ms. A debounce test becomes fast and deterministic — real pauses slow the suite and sometimes turn out too short. Tests that depend on “now” pin the time with `setSystemTime(new Date(\'2026-01-15T12:00:00Z\'))` — otherwise “Today” breaks at midnight.',
            },
          },
          { type: 'diagram', diagram: 'mocks-fake-timers' },
        ],
        test: ['test-mocks-002', 'test-mocks-007'],
      },
      {
        id: 'network',
        title: { ru: 'Мокать границы, а не всё подряд', en: 'Mock boundaries, not everything' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ответы API лучше подменять на уровне сети, например через MSW: компонент делает настоящий `fetch`, а ответ приходит из обработчика. Так проверяются и запрос, и обработка ответа, и состояния загрузки и ошибки, а код компонента не трогается. Каждый мок — предположение о том, как ведёт себя настоящий код. Если замокан `fetch`, хук данных и три дочерних компонента, тест проверяет сами моки: в продакшене всё падает, а он зелёный. Подменяют только **границы** — сеть, время.',
              en: 'API responses are better stubbed at the network level, for example with MSW: the component makes a real `fetch`, and the response comes from a handler. That checks the request, the response handling and the loading and error states, without touching the component code. Every mock is an assumption about how real code behaves. Mock `fetch`, the data hook and three child components, and the test checks the mocks: production breaks while it stays green. Stub only the **boundaries** — network, time.',
            },
          },
        ],
        test: ['test-mocks-004', 'test-mocks-010'],
      },
      {
        id: 'hoisting',
        title: { ru: 'vi.mock поднимается вверх', en: 'vi.mock is hoisted' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Чтобы мок модуля применился до импортов, Vitest и Jest **поднимают** вызов `vi.mock` (`jest.mock`) в самое начало файла. Фабрика выполняется раньше, чем строки, которые стоят над ней в коде, поэтому переменная `const mockUser`, объявленная выше `vi.mock`, внутри фабрики ещё не существует — тест падает с «используется до объявления». Общие данные для фабрики объявляют через `vi.hoisted`, который поднимается вместе с ней.',
              en: 'For a module mock to apply before imports, Vitest and Jest **hoist** the `vi.mock` (`jest.mock`) call to the very top of the file. The factory runs before the lines written above it, so a `const mockUser` declared above `vi.mock` doesn’t exist yet inside the factory — the test fails with “accessed before initialization”. Shared data for the factory is declared with `vi.hoisted`, which is hoisted along with it.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const { mockUser } = vi.hoisted(() => ({\n  mockUser: { id: 1, name: 'Anna' },\n}));\n\nvi.mock('./api', () => ({\n  fetchUser: async () => mockUser,\n}));",
            },
          },
        ],
        test: ['test-mocks-005'],
      },
    ],
    keyPoints: [
      { ru: 'Мок-функция запоминает вызовы и аргументы.', en: 'A mock function records calls and arguments.' },
      { ru: 'Шпион по умолчанию вызывает настоящий метод.', en: 'A spy calls the real method by default.' },
      { ru: 'Моки сбрасывают между тестами.', en: 'Reset mocks between tests.' },
      { ru: 'Время — фейковыми таймерами, сеть — на уровне запросов.', en: 'Time via fake timers; the network at the request level.' },
      { ru: '`vi.mock` поднимается вверх — данные через `vi.hoisted`.', en: '`vi.mock` is hoisted — share data via `vi.hoisted`.' },
    ],
    sources: [
      { title: 'Jest — Mock Functions', url: `${JEST}/mock-functions` },
      { title: 'Jest — Timer Mocks', url: `${JEST}/timer-mocks` },
      { title: 'Mock Service Worker', url: 'https://mswjs.io/docs/' },
      { title: 'Vitest — vi.mock', url: 'https://vitest.dev/api/vi.html#vi-mock' },
    ],
  },
  {
    tag: 'testing-components',
    format: 'steps',
    summary: {
      ru: 'Testing Library учит тестировать компонент так, как им пользуется человек: искать по роли и тексту, кликать и печатать, ждать появления данных. Чем ближе тест к пользователю, тем меньше он ломается от рефакторинга.',
      en: 'Testing Library teaches you to test a component the way a person uses it: find by role and text, click and type, wait for data to appear. The closer a test is to the user, the less refactoring breaks it.',
    },
    steps: [
      {
        id: 'queries',
        title: { ru: 'Искать по роли', en: 'Find by role' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Предпочтительный запрос — `getByRole(\'button\', { name: /save/i })`: он ищет элемент так, как его воспринимают пользователь и вспомогательные технологии, — по роли и [[accessible-name|доступному имени]]. Заодно это проверка доступности: если тест не находит кнопку-иконку с крестиком, у неё нет имени, и диктор её тоже не назовёт. Чинят это `aria-label`, а не `data-testid`. `getByTestId` — запасной вариант, когда видимого признака нет.',
              en: 'The preferred query is `getByRole(\'button\', { name: /save/i })`: it finds an element the way users and assistive technology perceive it — by role and [[accessible-name|accessible name]]. It doubles as an accessibility check: if the test can’t find an icon-only close button, the button has no name and a screen reader can’t announce it either. Fix that with `aria-label`, not `data-testid`. `getByTestId` is a fallback when there’s no visible cue.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'testid-fix',
              prompt: {
                ru: '`getByRole(\'button\', { name: \'Close\' })` не находит кнопку с SVG-крестиком. Как правильнее починить?',
                en: '`getByRole(\'button\', { name: \'Close\' })` can’t find a button with an SVG cross. What’s the better fix?',
              },
              options: [
                { text: { ru: 'Добавить `data-testid` и искать по нему', en: 'Add `data-testid` and query by it' } },
                { text: { ru: 'Дать кнопке `aria-label="Close"`', en: 'Give the button `aria-label="Close"`' } },
                { text: { ru: 'Искать по классу `.close`', en: 'Query by the `.close` class' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Тест нашёл настоящий баг: у кнопки нет доступного имени. `aria-label` чинит и тест, и доступность, а `data-testid` прячет проблему.',
                en: 'The test found a real bug: the button has no accessible name. `aria-label` fixes both the test and accessibility; `data-testid` hides the problem.',
              },
            },
          },
        ],
        test: ['test-components-001', 'test-components-008'],
      },
      {
        id: 'variants',
        title: { ru: 'getBy, queryBy, findBy', en: 'getBy, queryBy, findBy' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`getBy*` **бросает ошибку**, если ничего не найдено, — поэтому отсутствие элемента им не проверить: тест упадёт до `expect`. `queryBy*` возвращает `null`, и им проверяют отсутствие: `expect(screen.queryByText(\'Error\')).not.toBeInTheDocument()`. `findBy*` возвращает промис и повторяет поиск, пока элемент не появится или не истечёт таймаут, по умолчанию 1 с, — им ждут данные, которые грузятся после клика.',
              en: '`getBy*` **throws** if nothing is found — so it can’t check absence: the test fails before `expect`. `queryBy*` returns `null`, which is how absence is checked: `expect(screen.queryByText(\'Error\')).not.toBeInTheDocument()`. `findBy*` returns a promise and retries until the element appears or the timeout, 1 s by default, runs out — use it to wait for data that loads after a click.',
            },
          },
          {
            type: 'illustration',
            illustration: 'testing-query-variants',
          },
        ],
        test: ['test-components-002', 'test-components-003'],
      },
      {
        id: 'user-event',
        title: { ru: 'user-event вместо fireEvent', en: 'user-event over fireEvent' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`fireEvent.change` отправляет одно событие и сразу подставляет значение. `userEvent` воспроизводит путь пользователя: фокусирует поле, генерирует `keydown`, `input`, `keyup` для каждого символа, уважает `disabled` и `maxlength`. В версии 14 сначала создают сессию через `userEvent.setup()` — до рендера, — а все действия **асинхронные**: их ждут через `await`, иначе проверки выполнятся раньше, чем закончатся события.',
              en: '`fireEvent.change` dispatches a single event and sets the value at once. `userEvent` replays the user’s path: it focuses the field, fires `keydown`, `input`, `keyup` for every character, respects `disabled` and `maxlength`. In version 14 you first create a session with `userEvent.setup()` — before rendering — and every action is **async**: await it, or the assertions run before the events finish.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: "const user = userEvent.setup();\nrender(<Search />);\nawait user.type(\n  screen.getByRole('searchbox'),\n  'react',\n);",
            },
          },
        ],
        test: ['test-components-004', 'test-components-009'],
      },
      {
        id: 'act',
        title: { ru: 'Предупреждение про act', en: 'The act warning' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Testing Library уже оборачивает `render`, `fireEvent` и `waitFor` в `act`. Предупреждение «An update to Profile inside a test was not wrapped in act(...)» значит другое: после проверок компонент **ещё обновился** — обычно загрузка данных или таймер. Тест проверил промежуточное состояние и закончился раньше. Лечится ожиданием результата через `findBy…` или `waitFor`, а не ручным `act` вокруг всего подряд.',
              en: 'Testing Library already wraps `render`, `fireEvent` and `waitFor` in `act`. The warning “An update to Profile inside a test was not wrapped in act(...)” means something else: after the assertions the component **updated again** — usually data loading or a timer. The test checked an intermediate state and ended too early. The cure is waiting for the result with `findBy…` or `waitFor`, not wrapping everything in `act` by hand.',
            },
          },
        ],
        test: ['test-components-005'],
      },
      {
        id: 'helpers',
        title: { ru: 'within, хуки и провайдеры', en: 'within, hooks and providers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`within` сужает поиск до элемента: сначала находят строку таблицы по её содержимому, потом кнопку «Удалить» внутри неё — тест не сломается от сортировки. Свой хук проверяют через `renderHook`: он рендерит служебный компонент и отдаёт значения через `result.current`, а изменения состояния оборачивают в `act`. Компонент с темой, роутером и клиентом запросов рендерят своей функцией `renderWithProviders` — те же провайдеры, что в приложении, со свежим клиентом на каждый тест.',
              en: '`within` narrows a query to an element: first find the table row by its content, then the “Delete” button inside it — sorting won’t break the test. A custom hook is tested with `renderHook`: it renders a helper component and exposes values through `result.current`, with state changes wrapped in `act`. A component that needs a theme, router and query client is rendered with your own `renderWithProviders` — the same providers as the app, with a fresh client per test.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const row = screen.getByRole('row', {\n  name: /anna/i,\n});\nawait user.click(\n  within(row).getByRole('button'),\n);",
            },
          },
        ],
        test: ['test-components-007'],
      },
    ],
    keyPoints: [
      { ru: 'Ищите по роли и имени — это ещё и проверка доступности.', en: 'Query by role and name — it doubles as an a11y check.' },
      { ru: '`getBy` — есть, `queryBy` — нет, `findBy` — появится.', en: '`getBy` — present, `queryBy` — absent, `findBy` — will appear.' },
      { ru: '`userEvent.setup()` и `await` на каждое действие.', en: '`userEvent.setup()` and `await` on every action.' },
      { ru: 'Предупреждение `act` — тест не дождался обновления.', en: 'The `act` warning means the test didn’t await an update.' },
    ],
    sources: [
      { title: 'Testing Library — About Queries', url: `${RTL}/queries/about/` },
      { title: 'Testing Library — Guiding Principles', url: `${RTL}/guiding-principles` },
      { title: 'Testing Library — user-event', url: `${RTL}/user-event/intro` },
      { title: 'Testing Library — renderHook', url: `${RTL}/react-testing-library/api/#renderhook` },
    ],
  },
  {
    tag: 'testing-e2e',
    format: 'steps',
    summary: {
      ru: 'E2E-тест проходит сценарий целиком через настоящий браузер — от входа до оплаты. Он самый ценный и самый дорогой, поэтому их немного, и пишут их так, чтобы они не зависели от тайминга, порядка и случайных селекторов.',
      en: 'An E2E test runs a whole scenario through a real browser — from login to payment. It’s the most valuable and the most expensive, so there are few of them, and they’re written to be independent of timing, order and fragile selectors.',
    },
    steps: [
      {
        id: 'what-to-cover',
        title: { ru: 'Что покрывать', en: 'What to cover' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'E2E-тесты медленные и дорогие в поддержке, поэтому их пишут на **критичные** сценарии, поломка которых дороже всего: вход, оплата, ключевая форма. Без них продукт не работает, и только E2E проверяет, что фронтенд, бэкенд и инфраструктура работают вместе. Логику функций выгоднее проверять юнит-тестами, а мелкое поведение компонентов — интеграционными.',
              en: 'E2E tests are slow and costly to maintain, so they’re written for **critical** scenarios whose breakage costs the most: login, payment, the key form. The product doesn’t work without them, and only E2E checks that front end, back end and infrastructure work together. Function logic is cheaper to cover with unit tests, and small component behavior with integration tests.',
            },
          },
        ],
        test: ['test-e2e-002'],
      },
      {
        id: 'locators',
        title: { ru: 'Локаторы и автоожидание', en: 'Locators and auto-waiting' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Самый устойчивый локатор Playwright — `page.getByRole(\'button\', { name: \'Sign in\' })`: роль и доступное имя меняются, только когда меняется смысл интерфейса. Сгенерированные классы, XPath по структуре и индексы ломаются при любой перевёрстке. Действия с локатором сами ждут, пока элемент станет готов, — поэтому `waitForTimeout(2000)` перед кликом не нужен: такая пауза либо слишком длинная, либо однажды окажется короткой.',
              en: 'Playwright’s most resilient locator is `page.getByRole(\'button\', { name: \'Sign in\' })`: role and accessible name change only when the interface’s meaning changes. Generated classes, structural XPath and indexes break with any markup change. Locator actions wait by themselves until the element is ready — so `waitForTimeout(2000)` before a click isn’t needed: such a pause is either too long or one day too short.',
            },
          },
          { type: 'diagram', diagram: 'e2e-actionability' },
        ],
        test: ['test-e2e-003', 'test-e2e-001'],
      },
      {
        id: 'assertions',
        title: { ru: 'Проверки, которые ждут', en: 'Assertions that wait' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Асинхронные «web-first» проверки вида `await expect(locator).toBeVisible()` повторяют попытки, пока условие не выполнится или не истечёт таймаут. Поэтому ими проверяют то, что появляется не сразу: сообщение «Сохранено», загруженный список. `await locator.isVisible()` проверяет состояние **один раз**, в этот момент, и при медленном ответе вернёт `false` — отсюда нестабильные тесты.',
              en: 'Async “web-first” assertions like `await expect(locator).toBeVisible()` retry until the condition holds or the timeout runs out. That’s how you check things that don’t appear at once: a “Saved” message, a loaded list. `await locator.isVisible()` checks the state **once**, at that moment, and returns `false` on a slow response — hence flaky tests.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'isvisible-once',
              prompt: {
                ru: 'Чем `expect(await locator.isVisible()).toBe(true)` хуже `await expect(locator).toBeVisible()`?',
                en: 'Why is `expect(await locator.isVisible()).toBe(true)` worse than `await expect(locator).toBeVisible()`?',
              },
              options: [
                { text: { ru: 'Ничем, это одно и то же', en: 'It isn’t, they’re the same' } },
                { text: { ru: 'Проверяет один раз и не ждёт появления', en: 'It checks once and doesn’t wait for the element' } },
                { text: { ru: 'Не работает в Chromium', en: 'It doesn’t work in Chromium' } },
              ],
              answer: 1,
              explanation: {
                ru: '`isVisible()` возвращает состояние на текущий момент. Web-first проверка повторяет попытки до таймаута и переживает медленный ответ.',
                en: '`isVisible()` returns the state right now. A web-first assertion retries until the timeout and survives a slow response.',
              },
            },
          },
        ],
        test: ['test-e2e-005'],
      },
      {
        id: 'isolation-auth',
        title: { ru: 'Независимость и авторизация', en: 'Independence and auth' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Playwright даёт каждому тесту новый контекст браузера — свои cookie и хранилище, — чтобы тесты были независимы и шли параллельно. Тест, который работает только после другого, сломается при параллельном запуске или перезапуске: нужное состояние каждый готовит сам — через API или фикстуру. А чтобы 200 тестов не логинились через форму, setup-проект входит один раз и сохраняет `storageState` — cookie и localStorage, — и остальные тесты стартуют уже авторизованными.',
              en: 'Playwright gives each test a fresh browser context — its own cookies and storage — so tests are independent and run in parallel. A test that works only after another one breaks under parallel runs or retries: each prepares its own state — through the API or a fixture. And so 200 tests don’t log in through the form, a setup project logs in once and saves `storageState` — cookies and localStorage — and the rest start already authenticated.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "// playwright.config\nuse: {\n  storageState: 'auth/user.json',\n},",
            },
          },
        ],
        test: ['test-e2e-008', 'test-e2e-004'],
      },
      {
        id: 'ci-debug',
        title: { ru: 'Сеть, трейсы и скриншоты', en: 'Network, traces and screenshots' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`page.route` перехватывает запросы браузера: можно вернуть статус 500, пустой список или задержать ответ — так проверяют экран ошибки без поломки бэкенда. Когда тест падает только в CI, помогает **трейс**: с `trace: \'on-first-retry\'` Playwright записывает каждый шаг со снимками DOM, сетью и консолью, а Trace Viewer показывает их как пошаговое видео. Скриншотные тесты сравнивают пиксели, поэтому эталоны снимают в том же Docker-образе, что и CI, и выключают анимации.',
              en: '`page.route` intercepts browser requests: return a 500, an empty list or a delayed response — that’s how an error screen is tested without breaking the back end. When a test fails only in CI, a **trace** helps: with `trace: \'on-first-retry\'` Playwright records every step with DOM snapshots, network and console, and Trace Viewer plays them back step by step. Screenshot tests compare pixels, so baselines are taken in the same Docker image as CI, with animations off.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "await page.route('**/api/orders',\n  (route) => route.fulfill({\n    status: 500,\n  }),\n);",
            },
          },
        ],
        test: ['test-e2e-006', 'test-e2e-009'],
      },
    ],
    keyPoints: [
      { ru: 'E2E — немного и на критичные сценарии.', en: 'E2E — few tests, for critical scenarios.' },
      { ru: 'Локатор по роли и имени, без пауз — действия ждут сами.', en: 'Locate by role and name; no pauses — actions wait.' },
      { ru: 'Проверки `await expect(locator)` повторяют попытки.', en: '`await expect(locator)` assertions retry.' },
      { ru: 'Каждый тест сам готовит состояние; логин — через `storageState`.', en: 'Each test prepares its own state; login via `storageState`.' },
      { ru: 'Падает в CI — смотрите трейс.', en: 'Fails in CI — open the trace.' },
    ],
    sources: [
      { title: 'Playwright — Auto-waiting', url: 'https://playwright.dev/docs/actionability' },
      { title: 'Playwright — Best Practices', url: 'https://playwright.dev/docs/best-practices' },
      { title: 'Playwright — Locators', url: 'https://playwright.dev/docs/locators' },
      { title: 'Playwright — Authentication', url: 'https://playwright.dev/docs/auth' },
      { title: 'Playwright — Trace viewer', url: 'https://playwright.dev/docs/trace-viewer' },
    ],
  },
  {
    tag: 'testing-tdd',
    format: 'steps',
    summary: {
      ru: 'TDD — привычка начинать с падающего теста. Вокруг неё — инструменты, которые показывают, насколько тесты на самом деле защищают код: покрытие, дублёры, тесты на свойства и контракты.',
      en: 'TDD is the habit of starting with a failing test. Around it are tools that show how well tests actually protect the code: coverage, test doubles, property-based and contract tests.',
    },
    steps: [
      {
        id: 'cycle',
        title: { ru: 'Красный, зелёный, рефакторинг', en: 'Red, green, refactor' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Цикл TDD — три шага. Сначала тест на новое поведение, и он **падает**: падение доказывает, что тест вообще проверяет это поведение. Затем минимальный код, чтобы тест прошёл, — минимальный, чтобы не написать лишнего. Потом рефакторинг: код улучшают, не меняя поведения, а тесты остаются зелёными и защищают от ошибок. И снова сначала.',
              en: 'The TDD cycle has three steps. First a test for the new behavior, and it **fails**: the failure proves the test actually checks that behavior. Then minimal code to make it pass — minimal, so nothing extra gets written. Then refactoring: the code is improved without changing behavior, while green tests guard against mistakes. And round again.',
            },
          },
          { type: 'diagram', diagram: 'tdd-cycle' },
        ],
        test: ['test-tdd-001'],
      },
      {
        id: 'regression',
        title: { ru: 'Баг — сначала тест', en: 'A bug starts with a test' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Пришёл баг: корзина неверно считает скидку. Сначала пишут **регрессионный тест**, который воспроизводит баг и падает, — так убеждаются, что правильно поняли проблему. Потом исправляют код до зелёного теста. Тест остаётся в наборе и навсегда защищает от возврата ошибки. Если тест не удалось заставить упасть, проблема в другом месте.',
              en: 'A bug report: the cart computes the discount wrong. First you write a **regression test** that reproduces the bug and fails — that confirms you understood the problem. Then you fix the code until the test is green. The test stays in the suite and guards against the bug coming back forever. If you can’t make the test fail, the problem is somewhere else.',
            },
          },
        ],
        test: ['test-basics-005'],
      },
      {
        id: 'coverage',
        title: { ru: 'Что значит покрытие', en: 'What coverage means' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Покрытие считает, какие строки и ветки **выполнились** во время тестов, а не что проверено: тест без единого `expect` тоже «покрывает» код. 100% покрытия гарантирует только то, что каждая строка хоть раз выполнилась. Низкое покрытие полезно как сигнал о непроверенных местах, а погоня за 100% даёт тесты ради цифры. Проверить, ловят ли тесты ошибки, помогает мутационное тестирование.',
              en: 'Coverage counts which lines and branches **ran** during tests, not what was checked: a test with no `expect` at all still “covers” code. 100% coverage guarantees only that every line ran at least once. Low coverage is a useful signal of untested areas, while chasing 100% produces tests for the number’s sake. Mutation testing helps check whether tests actually catch bugs.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'coverage-no-expect',
              prompt: {
                ru: 'Тест вызывает функцию и ничего не проверяет. Что будет с покрытием?',
                en: 'A test calls a function and asserts nothing. What happens to coverage?',
              },
              options: [
                { text: { ru: 'Строки функции не засчитаются', en: 'The function’s lines won’t count' } },
                { text: { ru: 'Строки засчитаются как покрытые', en: 'The lines count as covered' } },
                { text: { ru: 'Отчёт покрытия выдаст ошибку', en: 'The coverage report errors out' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Покрытие видит только выполнение. Без `expect` код «покрыт», но ничего не проверено — поэтому цифра не равна качеству.',
                en: 'Coverage sees only execution. Without `expect` the code is “covered” yet nothing is verified — that’s why the number isn’t quality.',
              },
            },
          },
        ],
        test: ['test-tdd-002'],
      },
      {
        id: 'doubles',
        title: { ru: 'Дублёры и контракты', en: 'Test doubles and contracts' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Тестовые [[test-double|дублёры]] различаются. **Stub** лишь возвращает заготовленные ответы. **Mock** знает ожидаемые вызовы и проверяет их. **Fake** — упрощённая, но работающая реализация: репозиторий на `Map` в памяти вместо базы. Но любой дублёр описывает API таким, каким его **представляет** фронтенд. Если бэкенд переименует поле, тесты не заметят. Это ловят **контрактные тесты** (Pact): фронтенд описывает ожидания, а бэкенд проверяет их в своём CI.',
              en: 'Test [[test-double|doubles]] differ. A **stub** only returns canned answers. A **mock** knows the expected calls and verifies them. A **fake** is a simplified but working implementation: a repository on an in-memory `Map` instead of a database. But any double describes the API as the front end **imagines** it. If the back end renames a field, the tests won’t notice. **Contract tests** (Pact) catch that: the front end records its expectations, and the back end verifies them in its CI.',
            },
          },
        ],
        test: ['test-tdd-003'],
      },
      {
        id: 'property',
        title: { ru: 'Тесты на свойства', en: 'Property-based tests' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Вместо отдельных примеров формулируют **свойство**, верное для любых входов: «сортировка не меняет длину», «`decode(encode(x)) === x`». Библиотека вроде fast-check генерирует сотни случайных входов, включая неудобные — пустые строки, эмодзи, огромные числа, — а найдя падение, **уменьшает** его до минимального примера. Такие тесты находят то, о чём автор примеров не подумал.',
              en: 'Instead of individual examples you state a **property** true for any input: “sorting doesn’t change length”, “`decode(encode(x)) === x`”. A library like fast-check generates hundreds of random inputs, including awkward ones — empty strings, emoji, huge numbers — and when one fails, it **shrinks** it to a minimal example. Such tests find what the example author never thought of.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "fc.assert(\n  fc.property(fc.string(), (text) =>\n    decode(encode(text)) === text,\n  ),\n);",
            },
          },
        ],
        test: ['test-tdd-006'],
      },
    ],
    keyPoints: [
      { ru: 'Красный → зелёный → рефакторинг.', en: 'Red → green → refactor.' },
      { ru: 'Баг начинают с падающего регрессионного теста.', en: 'Start a bug fix with a failing regression test.' },
      { ru: 'Покрытие — что выполнилось, а не что проверено.', en: 'Coverage is what ran, not what was checked.' },
      { ru: 'Stub отвечает, mock проверяет, fake работает упрощённо.', en: 'A stub answers, a mock verifies, a fake works simply.' },
      { ru: 'Контрактные тесты ловят расхождения с API.', en: 'Contract tests catch API mismatches.' },
    ],
    sources: [
      { title: 'Martin Fowler — Test Driven Development', url: `${FOWLER}/bliki/TestDrivenDevelopment.html` },
      { title: 'Martin Fowler — Test Coverage', url: `${FOWLER}/bliki/TestCoverage.html` },
      { title: 'Martin Fowler — Mocks Aren’t Stubs', url: `${FOWLER}/articles/mocksArentStubs.html` },
      { title: 'fast-check', url: 'https://fast-check.dev/' },
      { title: 'Pact — Introduction', url: 'https://docs.pact.io/' },
    ],
  },
];
