import type { Question } from '../model/types';

const PLAYWRIGHT = 'https://playwright.dev/docs';
const JEST_EXPECT = 'https://jestjs.io/docs/expect';
const NODE_TEST = 'https://nodejs.org/api/test.html';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const TESTING_QUESTIONS_5: Question[] = [
  {
    id: 'test-unit-011',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Функция вернула `{ id: 1, note: undefined }`, а в тесте ожидают `{ id: 1 }`. Какие проверки пройдут?',
      en: 'A function returned `{ id: 1, note: undefined }`, and the test expects `{ id: 1 }`. Which assertions pass?',
    },
    options: [
      { text: { ru: 'Обе: `toEqual` и `toStrictEqual`', en: 'Both: `toEqual` and `toStrictEqual`' } },
      { text: { ru: 'Ни одна', en: 'Neither' } },
      {
        text: {
          ru: '`toEqual` пройдёт, `toStrictEqual` — нет: он учитывает свойства со значением `undefined`',
          en: '`toEqual` passes, `toStrictEqual` doesn’t: it takes `undefined` properties into account',
        },
      },
      { text: { ru: 'Только `toStrictEqual`', en: 'Only `toStrictEqual`' } },
      { text: { ru: 'Только `toBe`', en: 'Only `toBe`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`toEqual` рекурсивно сравнивает значения и пропускает свойства с `undefined`, поэтому объекты для него равны. `toStrictEqual` строже: учитывает такие свойства, дыры в массивах и классы объектов — экземпляр класса не равен простому объекту с теми же полями. `toBe` сравнивает ссылки и для двух разных объектов не пройдёт. Для ответов API и данных состояния надёжнее `toStrictEqual`.',
          en: '`toEqual` compares values recursively and ignores properties set to `undefined`, so the objects are equal to it. `toStrictEqual` is stricter: it accounts for such properties, array holes and object classes — a class instance isn’t equal to a plain object with the same fields. `toBe` compares references and fails for two distinct objects. For API responses and state data `toStrictEqual` is the safer choice.',
        },
      },
    ],
    sources: [{ title: 'Jest — .toStrictEqual()', url: `${JEST_EXPECT}#tostrictequalvalue` }],
  },
  {
    id: 'test-unit-012',
    kind: 'output',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Матчер `toBeCloseTo(expected, digits = 2)` в Jest проверяет условие, как функция ниже. Что выведет код? Впишите ответ.',
      en: 'Jest’s `toBeCloseTo(expected, digits = 2)` checks the condition below. What will this code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const toBeCloseTo = (received, expected, digits = 2) => Math.abs(expected - received) < 10 ** -digits / 2;

console.log(0.1 + 0.2 === 0.3, toBeCloseTo(0.1 + 0.2, 0.3), toBeCloseTo(0.123, 0.12), toBeCloseTo(0.126, 0.12));`,
    },
    answers: ['false true true false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`0.1 + 0.2` в двоичной арифметике равно `0.30000000000000004`, поэтому `toBe(0.3)` упадёт. `toBeCloseTo` допускает разницу меньше половины единицы последнего знака: при двух знаках — `0.005`. `0.123` отличается от `0.12` на `0.003` — проходит, `0.126` на `0.006` — нет. Для денег надёжнее хранить копейки целыми числами, а не сравнивать дроби с допуском.',
          en: 'In binary arithmetic `0.1 + 0.2` is `0.30000000000000004`, so `toBe(0.3)` fails. `toBeCloseTo` allows a difference below half a unit of the last digit: with two digits, `0.005`. `0.123` differs from `0.12` by `0.003` — passes; `0.126` by `0.006` — fails. For money it’s more robust to store cents as integers than to compare fractions with a tolerance.',
        },
      },
    ],
    sources: [{ title: 'Jest — .toBeCloseTo()', url: `${JEST_EXPECT}#tobeclosetonumber-numdigits` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'test-mocks-011',
    kind: 'output',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { mock } = require('node:test');

const calculator = { add: (a, b) => a + b };
const spy = mock.method(calculator, 'add');

const result = calculator.add(2, 3);
console.log(result, spy.mock.callCount(), spy.mock.calls[0].arguments.join('+'));

spy.mock.restore();
console.log('mock' in calculator.add);`,
    },
    answers: ['5 1 2+3 false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Шпион (`mock.method`, в Jest — `jest.spyOn`, в Vitest — `vi.spyOn`) подменяет метод обёрткой, которая записывает вызовы, но по умолчанию **вызывает настоящую реализацию** — поэтому результат 5. После `restore` на месте снова исходная функция без `mock`. Восстанавливать шпионов нужно после каждого теста (`afterEach`), иначе подмена протечёт в соседние тесты.',
          en: 'A spy (`mock.method`, `jest.spyOn` in Jest, `vi.spyOn` in Vitest) replaces a method with a wrapper that records calls but **calls the real implementation** by default — hence 5. After `restore` the original function is back, without `mock`. Restore spies after every test (`afterEach`), or the replacement leaks into neighboring tests.',
        },
      },
    ],
    sources: [{ title: 'Node.js — mock.method()', url: `${NODE_TEST}#mockmethodobject-methodname-implementation-options` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'test-mocks-012',
    kind: 'output',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Опрос сервера раз в секунду тестируют с фейковыми таймерами. Что выведет код? Впишите ответ.',
      en: 'Polling the server once a second is tested with fake timers. What will this code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const { mock } = require('node:test');

mock.timers.enable({ apis: ['setInterval'] });
let ticks = 0;
const id = setInterval(() => {
  ticks += 1;
}, 1000);

mock.timers.tick(3500);
clearInterval(id);
mock.timers.reset();

console.log(ticks);`,
    },
    answers: ['3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Фейковые таймеры подменяют `setInterval`, и время двигается только по команде: `tick(3500)` мгновенно «прокручивает» 3,5 секунды — колбэк срабатывает на 1000, 2000 и 3000 мс. Тест не ждёт по-настоящему и не зависит от загрузки машины. В Jest и Vitest то же самое: `useFakeTimers()` и `advanceTimersByTime()`. После теста таймеры возвращают — иначе сломаются соседние тесты.',
          en: 'Fake timers replace `setInterval`, and time moves only on command: `tick(3500)` instantly “fast-forwards” 3.5 seconds — the callback fires at 1000, 2000 and 3000 ms. The test doesn’t really wait and doesn’t depend on machine load. Jest and Vitest do the same with `useFakeTimers()` and `advanceTimersByTime()`. Restore timers after the test, or neighboring tests break.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Timers mocking', url: `${NODE_TEST}#timers` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'test-basics-009',
    kind: 'output',
    topic: 'testing',
    tags: ['testing-basics'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Два теста используют общий объект-заготовку. Что выведет код? Впишите ответ.',
      en: 'Two tests share a fixture object. What will this code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const fixture = { items: [] };
const addItem = (cart, item) => {
  cart.items.push(item);
  return cart;
};

const first = addItem(fixture, 'tea').items.length;
const second = addItem(fixture, 'milk').items.length;
console.log(first, second);`,
    },
    answers: ['1 2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Второй «тест» ожидал бы одну позицию, но видит две: первый изменил общую заготовку. Такие тесты проходят поодиночке и падают вместе или в другом порядке. Лекарство — фабрика, которая каждый раз создаёт свежие данные (`const createCart = () => ({ items: [] })`), или создание заготовки в `beforeEach`. Код, который меняет аргументы, к тому же стоит переписать без мутаций.',
          en: 'The second “test” would expect one item but sees two: the first mutated the shared fixture. Such tests pass alone and fail together or in a different order. The cure is a factory that creates fresh data every time (`const createCart = () => ({ items: [] })`), or building the fixture in `beforeEach`. Code that mutates its arguments is also worth rewriting without mutation.',
        },
      },
    ],
    sources: [{ title: 'Jest — Setup and Teardown', url: 'https://jestjs.io/docs/setup-teardown' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'test-unit-013',
    kind: 'output',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Табличный тест прогоняет одну функцию по списку случаев. Что выведет код? Впишите ответ.',
      en: 'A table-driven test runs one function over a list of cases. What will this code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const slugify = (text) => text.trim().toLowerCase().replace(/\\s+/g, '-');

const cases = [
  ['Hello World', 'hello-world'],
  ['  Many   spaces ', 'many-spaces'],
  ['Café', 'cafe'],
];
const failed = cases.filter(([input, expected]) => slugify(input) !== expected).map(([input]) => input);

console.log(failed.length, failed.join('|'));`,
    },
    answers: ['1 Café'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Табличный тест — один сценарий и список «вход → ожидание». Новый случай добавляется одной строкой, а упавшие видны поимённо. Здесь он сразу находит пропущенное: `slugify` не убирает диакритику, и «Café» превращается в `café`. В Jest и Vitest для этого есть `test.each`, каждая строка таблицы становится отдельным тестом со своим названием.',
          en: 'A table-driven test is one scenario plus a list of “input → expected”. A new case is one more line, and failures are reported by name. Here it immediately catches a gap: `slugify` doesn’t strip diacritics, so “Café” becomes `café`. Jest and Vitest provide `test.each` for this, turning every table row into its own named test.',
        },
      },
    ],
    sources: [{ title: 'Jest — test.each', url: 'https://jestjs.io/docs/api#testeachtablename-fn-timeout' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'test-components-011',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: '`getByRole("button", { name: "Отправить" })` не находит кнопку, хотя на странице она есть. С чего начать разбор?',
      en: '`getByRole("button", { name: "Submit" })` can’t find the button, though it’s on the page. Where do you start?',
    },
    options: [
      { text: { ru: 'Сразу заменить запрос на `container.querySelector`', en: 'Switch straight to `container.querySelector`' } },
      {
        text: {
          ru: 'Посмотреть, что отрендерилось: `screen.debug()` и `logRoles(container)` покажут разметку, роли и доступные имена',
          en: 'Look at what rendered: `screen.debug()` and `logRoles(container)` show the markup, roles and accessible names',
        },
      },
      { text: { ru: 'Увеличить таймаут теста', en: 'Increase the test timeout' } },
      { text: { ru: 'Добавить кнопке `data-testid`', en: 'Add a `data-testid` to the button' } },
      { text: { ru: 'Удалить тест', en: 'Delete the test' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Чаще всего элемент есть, но не с той ролью или именем: иконка без подписи, `div` вместо `button`, текст во вложенном элементе, другая локаль. `screen.debug()` печатает текущий DOM, а `logRoles` — все роли с именами, как их видит запрос. Проблему находят и чинят в разметке — заодно она становится доступнее. Переход на `querySelector` или `data-testid` только прячет её.',
          en: 'Most often the element exists, but with a different role or name: an unlabeled icon, a `div` instead of a `button`, text in a nested element, another locale. `screen.debug()` prints the current DOM, and `logRoles` lists every role with its name as the query sees it. Find and fix the issue in the markup — which also makes it more accessible. Switching to `querySelector` or `data-testid` just hides it.',
        },
      },
    ],
    sources: [{ title: 'Testing Library — Debugging', url: 'https://testing-library.com/docs/dom-testing-library/api-debugging' }],
  },
  {
    id: 'test-e2e-009',
    topic: 'testing',
    tags: ['testing-e2e'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'E2E-тест падает только в CI, локально всё зелёное. Что в Playwright помогает понять причину?',
      en: 'An E2E test fails only in CI; locally it’s green. What in Playwright helps find the cause?',
    },
    options: [
      { text: { ru: 'Добавить `waitForTimeout(5000)` перед каждым шагом', en: 'Add `waitForTimeout(5000)` before every step' } },
      {
        text: {
          ru: 'Трейс (`trace: "on-first-retry"`): запись шагов со снимками DOM, сетью и консолью — открыть в Trace Viewer',
          en: 'A trace (`trace: "on-first-retry"`): a recording of steps with DOM snapshots, network and console — open it in Trace Viewer',
        },
      },
      { text: { ru: 'Отключить тест в CI', en: 'Disable the test in CI' } },
      { text: { ru: 'Запускать CI только с `--headed`', en: 'Run CI only with `--headed`' } },
      { text: { ru: 'Писать больше `console.log` в тесте', en: 'Write more `console.log` in the test' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Трейс записывает каждое действие: снимок DOM до и после, сетевые запросы, консоль, ошибки — и открывается в Trace Viewer как пошаговое видео. С `on-first-retry` запись включается только при повторе упавшего теста, поэтому зелёные прогоны не замедляются. Трейсы складывают в артефакты CI и разбирают локально — видно, например, что API ответил ошибкой или элемент перекрыт.',
          en: 'A trace records every action: DOM snapshots before and after, network requests, console, errors — and opens in Trace Viewer as a step-by-step replay. With `on-first-retry` recording only kicks in when a failed test is retried, so green runs aren’t slowed down. Traces go into CI artifacts and are inspected locally — showing, for example, that the API returned an error or an element was covered.',
        },
      },
    ],
    sources: [{ title: 'Playwright — Trace viewer', url: `${PLAYWRIGHT}/trace-viewer-intro` }],
  },
  {
    id: 'test-e2e-010',
    topic: 'testing',
    tags: ['testing-e2e'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Кнопку «Сохранить» на секунду перекрывает полупрозрачный оверлей со спиннером. Что сделает `page.getByRole("button", { name: "Save" }).click()`?',
      en: 'A translucent overlay with a spinner covers the “Save” button for a second. What does `page.getByRole("button", { name: "Save" }).click()` do?',
    },
    options: [
      { text: { ru: 'Кликнет сразу, попав в оверлей', en: 'Click immediately, hitting the overlay' } },
      { text: { ru: 'Сразу упадёт с ошибкой', en: 'Fail immediately' } },
      {
        text: {
          ru: 'Подождёт, пока кнопка станет видимой, стабильной, доступной и начнёт получать события (оверлей исчезнет), и только потом кликнет',
          en: 'Wait until the button is visible, stable, enabled and receives events (the overlay is gone), and only then click',
        },
      },
      { text: { ru: 'Кликнет через JavaScript, минуя оверлей', en: 'Click via JavaScript, bypassing the overlay' } },
      { text: { ru: 'Подождёт ровно 1 секунду', en: 'Wait exactly 1 second' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Перед действием Playwright проверяет «готовность» элемента: он виден, не анимируется, доступен и не перекрыт другим элементом в точке клика. Пока проверки не пройдут, он повторяет их до таймаута действия. Поэтому ручные `waitForTimeout` не нужны, а падение по таймауту с сообщением «element intercepts pointer events» обычно указывает на настоящую проблему интерфейса.',
          en: 'Before acting, Playwright checks the element’s actionability: it’s visible, not animating, enabled and not covered by another element at the click point. Until the checks pass, it retries them up to the action timeout. So manual `waitForTimeout` isn’t needed, and a timeout with “element intercepts pointer events” usually points to a real UI issue.',
        },
      },
    ],
    sources: [{ title: 'Playwright — Auto-waiting', url: `${PLAYWRIGHT}/actionability` }],
  },
  {
    id: 'test-tdd-006',
    topic: 'testing',
    tags: ['testing-tdd'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что делают тесты на основе свойств (property-based, например fast-check)?',
      en: 'What do property-based tests (e.g. fast-check) do?',
    },
    options: [
      { text: { ru: 'Проверяют свойства объектов через `hasOwnProperty`', en: 'Check object properties via `hasOwnProperty`' } },
      {
        text: {
          ru: 'Генерируют сотни случайных входов и проверяют общее правило, а найдя падение — уменьшают его до минимального примера',
          en: 'Generate hundreds of random inputs and check a general rule, and when one fails, shrink it to a minimal example',
        },
      },
      { text: { ru: 'Измеряют покрытие кода', en: 'Measure code coverage' } },
      { text: { ru: 'Сравнивают снимки компонентов', en: 'Compare component snapshots' } },
      { text: { ru: 'Заменяют все unit-тесты', en: 'Replace all unit tests' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вместо отдельных примеров формулируют свойство, верное для **любых** входов: «сортировка не меняет длину», «`decode(encode(x)) === x`». Библиотека генерирует много случайных данных, включая неудобные: пустые строки, эмодзи, огромные числа. Найдя падение, она уменьшает вход до минимального воспроизведения. Такие тесты дополняют обычные примеры и хорошо ловят граничные случаи.',
          en: 'Instead of individual examples you state a property true for **any** input: “sorting doesn’t change length”, “`decode(encode(x)) === x`”. The library generates lots of random data, including awkward cases: empty strings, emoji, huge numbers. When something fails, it shrinks the input to a minimal reproduction. Such tests complement example-based ones and are good at catching edge cases.',
        },
      },
    ],
    sources: [{ title: 'fast-check — Introduction', url: 'https://fast-check.dev/docs/introduction/' }],
  },
];
