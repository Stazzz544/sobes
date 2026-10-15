import type { Lesson } from '../model/types';

const JEST = 'https://jestjs.io/docs';
const RTL = 'https://testing-library.com/docs';
const FOWLER = 'https://martinfowler.com';

export const TESTING_LESSONS: Lesson[] = [
  {
    tag: 'testing-basics',
    summary: {
      ru: 'Тесты бывают юнит, интеграционные и end-to-end. Чем выше по пирамиде, тем тест медленнее, дороже и хрупче — поэтому внизу их много, наверху мало.',
      en: 'Tests come as unit, integration and end-to-end. The higher up the pyramid, the slower, costlier and more brittle a test is — so there are many at the bottom and few at the top.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Юнит-тест** проверяет функцию или модуль в изоляции за миллисекунды. **Интеграционный** — как несколько частей работают вместе (компонент с хуками и стором). **E2E** запускает приложение в браузере и проходит сценарий пользователя целиком.',
          en: 'A **unit test** checks a function or module in isolation in milliseconds. An **integration** test checks how several parts work together (a component with hooks and a store). An **E2E** test runs the app in a browser and walks through a whole user scenario.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Хороший тест проверяет **поведение**, а не реализацию: что видит и делает пользователь или что возвращает функция. Тесты на внутренние детали ломаются при любом рефакторинге и не ловят реальные баги. **Нестабильный (flaky)** тест иногда падает без изменений кода — из-за времени, сети или порядка тестов — и подрывает доверие ко всему набору.',
          en: 'A good test checks **behavior**, not implementation: what the user sees and does, or what a function returns. Tests of internals break on every refactor and miss real bugs. A **flaky** test sometimes fails without code changes — due to time, network or test order — and undermines trust in the whole suite.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Пирамида: много юнит, меньше интеграционных, мало E2E.', en: 'Pyramid: many unit, fewer integration, few E2E.' },
      { ru: 'Тестируют поведение, а не детали реализации.', en: 'Test behavior, not implementation details.' },
      { ru: 'Flaky-тесты чинят или удаляют, а не перезапускают до зелёного.', en: 'Fix or remove flaky tests; don’t rerun until green.' },
    ],
    sources: [
      { title: 'Martin Fowler — Test Pyramid', url: `${FOWLER}/bliki/TestPyramid.html` },
      { title: 'Kent C. Dodds — Testing Implementation Details', url: 'https://kentcdodds.com/blog/testing-implementation-details' },
      { title: 'Martin Fowler — Eradicating Non-Determinism in Tests', url: `${FOWLER}/articles/nonDeterminism.html` },
    ],
  },
  {
    tag: 'testing-unit',
    summary: {
      ru: 'Юнит-тест — подготовка, действие, проверка. Главное — выбрать правильный матчер и не потерять асинхронность.',
      en: 'A unit test is arrange, act, assert. The key is picking the right matcher and not losing async behavior.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`toBe` сравнивает через `Object.is` — для примитивов и одной и той же ссылки. Для объектов и массивов по содержимому нужен `toEqual`, а `toStrictEqual` дополнительно различает `undefined`-свойства и классы.',
          en: '`toBe` compares with `Object.is` — for primitives and the same reference. For objects and arrays by content use `toEqual`; `toStrictEqual` also distinguishes `undefined` properties and classes.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `test('loads user', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({ id: 1, name: 'Ann' });
});`,
        },
        caption: {
          ru: 'Без await тест закончится раньше проверки и пройдёт впустую',
          en: 'Without await the test ends before the assertion and passes vacuously',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`beforeEach` готовит одинаковое состояние перед каждым тестом, чтобы тесты не зависели друг от друга и от порядка запуска.',
          en: '`beforeEach` sets up the same state before every test so tests don’t depend on each other or on run order.',
        },
      },
    ],
    keyPoints: [
      { ru: '`toBe` — `Object.is`, `toEqual` — по содержимому.', en: '`toBe` — `Object.is`, `toEqual` — by content.' },
      { ru: 'Асинхронный тест: `async` + `await` (или вернуть промис).', en: 'Async test: `async` + `await` (or return the promise).' },
      { ru: 'Тесты независимы: состояние — в `beforeEach`.', en: 'Tests are independent: state goes in `beforeEach`.' },
    ],
    sources: [
      { title: 'Jest — Expect', url: `${JEST}/expect` },
      { title: 'Jest — Testing Asynchronous Code', url: `${JEST}/asynchronous` },
      { title: 'Jest — Setup and Teardown', url: `${JEST}/setup-teardown` },
    ],
  },
  {
    tag: 'testing-mocks',
    summary: {
      ru: 'Моки заменяют зависимости — сеть, время, модули, — чтобы тест был быстрым и предсказуемым. Подменять стоит границы системы, а не всё подряд.',
      en: 'Mocks replace dependencies — network, time, modules — to make tests fast and predictable. Mock the system boundaries, not everything.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`jest.fn()` / `vi.fn()` — функция-шпион: запоминает вызовы и аргументы (`toHaveBeenCalledWith`) и может возвращать заданное значение. Между тестами вызовы накапливаются, поэтому [[test-double|моки]] очищают (`clearAllMocks` или настройка `clearMocks`).',
          en: '`jest.fn()` / `vi.fn()` is a spy function: it records calls and arguments (`toHaveBeenCalledWith`) and can return a set value. Calls accumulate across tests, so clear [[test-double|mocks]] (`clearAllMocks` or the `clearMocks` option).',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Таймеры (`setTimeout`, [[debounce|debounce]]) не ждут по-настоящему: `useFakeTimers()` и `advanceTimersByTime(300)` прокручивают время мгновенно. Сеть в тестах компонентов удобно подменять на уровне запросов (MSW): код делает настоящий `fetch`, а ответ приходит из обработчика.',
          en: 'Don’t really wait for timers (`setTimeout`, [[debounce|debounce]]): `useFakeTimers()` and `advanceTimersByTime(300)` move time instantly. In component tests, mock the network at the request level (MSW): code makes a real `fetch`, and the response comes from a handler.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Мок-функция запоминает вызовы и аргументы.', en: 'A mock function records calls and arguments.' },
      { ru: 'Моки очищают между тестами.', en: 'Clear mocks between tests.' },
      { ru: 'Время — фейковыми таймерами, сеть — на уровне запросов.', en: 'Time — with fake timers, network — at the request level.' },
    ],
    sources: [
      { title: 'Jest — Mock Functions', url: `${JEST}/mock-functions` },
      { title: 'Jest — Timer Mocks', url: `${JEST}/timer-mocks` },
      { title: 'Mock Service Worker', url: 'https://mswjs.io/docs/' },
    ],
  },
  {
    tag: 'testing-components',
    summary: {
      ru: 'Testing Library тестирует компоненты так, как ими пользуется человек: ищет элементы по роли и тексту и взаимодействует через события пользователя.',
      en: 'Testing Library tests components the way a person uses them: it finds elements by role and text and interacts through user events.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Приоритет запросов: `getByRole` (с `name` — [[accessible-name|доступным именем]]) → `getByLabelText` → `getByText` → … → `getByTestId` в последнюю очередь. Поиск по роли заодно проверяет доступность: если кнопку не найти по роли, её не найдёт и экранный диктор.',
          en: 'Query priority: `getByRole` (with `name` — the [[accessible-name|accessible name]]) → `getByLabelText` → `getByText` → … → `getByTestId` as a last resort. Querying by role also checks accessibility: if a button can’t be found by role, a screen reader can’t find it either.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`getBy` бросает ошибку, если элемента нет; `queryBy` возвращает `null` — им проверяют отсутствие; `findBy` возвращает промис и ждёт появления — для асинхронного UI. `userEvent` воспроизводит действия целиком (фокус, нажатия клавиш, клик), а не одно событие, как `fireEvent`.',
          en: '`getBy` throws if the element is missing; `queryBy` returns `null` — use it to assert absence; `findBy` returns a promise and waits for it to appear — for async UI. `userEvent` simulates whole interactions (focus, key presses, click), not a single event like `fireEvent`.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Сначала `getByRole`, `getByTestId` — в последнюю очередь.', en: '`getByRole` first, `getByTestId` last.' },
      { ru: '`queryBy` — проверить отсутствие, `findBy` — дождаться.', en: '`queryBy` — assert absence, `findBy` — wait for it.' },
      { ru: '`userEvent` ближе к реальному пользователю, чем `fireEvent`.', en: '`userEvent` is closer to a real user than `fireEvent`.' },
    ],
    sources: [
      { title: 'Testing Library — About Queries', url: `${RTL}/queries/about/` },
      { title: 'Testing Library — Guiding Principles', url: `${RTL}/guiding-principles` },
      { title: 'Testing Library — user-event', url: `${RTL}/user-event/intro` },
    ],
  },
  {
    tag: 'testing-e2e',
    summary: {
      ru: 'E2E-тесты проверяют критичные сценарии в настоящем браузере. Их мало, и они должны быть устойчивыми: без фиксированных пауз и привязки к вёрстке.',
      en: 'E2E tests check critical scenarios in a real browser. There are few of them, and they must be robust: no fixed sleeps and no coupling to markup.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Фиксированное ожидание вроде `waitForTimeout(3000)` либо слишком длинное, либо однажды окажется коротким — тест станет нестабильным. Playwright сам ждёт, пока элемент станет видимым, доступным и стабильным, а проверки `expect(locator)` повторяются до таймаута.',
          en: 'A fixed wait like `waitForTimeout(3000)` is either too long or one day too short — the test becomes flaky. Playwright itself waits until an element is visible, enabled and stable, and `expect(locator)` assertions retry until the timeout.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Локаторы выбирают так же, как в Testing Library: по роли и тексту (`getByRole`, `getByLabel`), а не по CSS-классам — классы меняются при каждом редизайне. Покрывают сценарии, поломка которых стоит дороже всего: вход, оплата, ключевая форма.',
          en: 'Choose locators like in Testing Library: by role and text (`getByRole`, `getByLabel`), not CSS classes — classes change with every redesign. Cover the scenarios whose breakage costs the most: sign-in, checkout, the key form.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Никаких фиксированных пауз — авто-ожидание и повторяемые проверки.', en: 'No fixed sleeps — auto-waiting and retrying assertions.' },
      { ru: 'Локаторы по роли и тексту, не по классам.', en: 'Locators by role and text, not classes.' },
      { ru: 'E2E — только для критичных сценариев.', en: 'E2E only for critical scenarios.' },
    ],
    sources: [
      { title: 'Playwright — Auto-waiting', url: 'https://playwright.dev/docs/actionability' },
      { title: 'Playwright — Best Practices', url: 'https://playwright.dev/docs/best-practices' },
      { title: 'Playwright — Locators', url: 'https://playwright.dev/docs/locators' },
    ],
  },
  {
    tag: 'testing-tdd',
    summary: {
      ru: 'TDD — цикл «красный → зелёный → рефакторинг»: сначала падающий тест, потом минимальный код, потом улучшение. Покрытие показывает, что выполнялось, но не что проверено.',
      en: 'TDD is the red → green → refactor cycle: a failing test first, then minimal code, then cleanup. Coverage shows what ran, not what was checked.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Красный**: тест на следующее поведение, который сейчас падает — он доказывает, что тест вообще что-то проверяет. **Зелёный**: самый простой код, чтобы тест прошёл. **Рефакторинг**: улучшить код, не меняя поведения, под защитой тестов.',
          en: '**Red**: a test for the next behavior that fails now — proving the test checks something at all. **Green**: the simplest code that makes it pass. **Refactor**: improve the code without changing behavior, protected by the tests.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Покрытие** считает строки и ветки, которые выполнились во время тестов. 100% не значит «без багов»: строка может выполниться, но её результат никто не проверил. Низкое покрытие указывает на непроверенные места, а высокое само по себе не гарантирует качества.',
          en: '**Coverage** counts the lines and branches executed during tests. 100% doesn’t mean “bug-free”: a line can run while no one checks its result. Low coverage points to untested areas; high coverage alone doesn’t guarantee quality.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Красный → зелёный → рефакторинг.', en: 'Red → green → refactor.' },
      { ru: 'Сначала увидеть падение теста.', en: 'See the test fail first.' },
      { ru: 'Покрытие — индикатор, а не цель.', en: 'Coverage is an indicator, not a goal.' },
    ],
    sources: [
      { title: 'Martin Fowler — Test Driven Development', url: `${FOWLER}/bliki/TestDrivenDevelopment.html` },
      { title: 'Martin Fowler — Test Coverage', url: `${FOWLER}/bliki/TestCoverage.html` },
    ],
  },
];
