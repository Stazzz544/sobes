import type { Question } from '../model/types';

const JEST = 'https://jestjs.io/docs';
const RTL = 'https://testing-library.com/docs';
const PLAYWRIGHT = 'https://playwright.dev/docs';

export const TESTING_QUESTIONS_3: Question[] = [
  {
    id: 'test-unit-007',
    kind: 'output',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Матчер `toBe` в Jest и Vitest сравнивает значения через `Object.is`. Что выведет код? Впишите ответ.',
      en: 'The `toBe` matcher in Jest and Vitest compares values with `Object.is`. What will this code log? Type the answer.',
    },
    code: { lang: 'js', source: `console.log(Object.is(NaN, NaN), NaN === NaN, Object.is(0, -0));` },
    answers: ['true false false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Object.is` отличается от `===` в двух местах: `NaN` равен самому себе, а `0` и `-0` различаются. Поэтому `expect(NaN).toBe(NaN)` проходит, а `expect(-0).toBe(0)` падает. Для объектов `toBe` проверяет ссылку — два одинаковых объекта сравнивают через `toEqual`.',
          en: '`Object.is` differs from `===` in two places: `NaN` equals itself, and `0` and `-0` differ. So `expect(NaN).toBe(NaN)` passes, while `expect(-0).toBe(0)` fails. For objects `toBe` checks the reference — compare two identical objects with `toEqual`.',
        },
      },
    ],
    sources: [
      { title: 'Jest — .toBe(value)', url: `${JEST}/expect#tobevalue` },
      { title: 'MDN — Object.is()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is' },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'test-unit-008',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какая проверка пройдёт?',
      en: 'Which assertion passes?',
    },
    code: { lang: 'js', source: `const user = { name: 'Anna', avatar: undefined };` },
    options: [
      { code: "expect(user).toBe({ name: 'Anna' });" },
      { code: "expect(user).toStrictEqual({ name: 'Anna' });" },
      { code: "expect(user).toEqual({ name: 'Anna' });" },
      { code: "expect(user).toEqual({ name: 'Anna', avatar: null });" },
      { code: "expect(user).toBe(user.name);" },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`toEqual` рекурсивно сравнивает содержимое и **игнорирует** свойства со значением `undefined`. `toStrictEqual` строже: учитывает `undefined`-свойства, дырки в массивах и класс объекта. `toBe` для объектов сравнивает ссылки, а `null` и `undefined` разные значения. В новом коде чаще берут `toStrictEqual`, чтобы случайный лишний ключ не прошёл незамеченным.',
          en: '`toEqual` compares content recursively and **ignores** properties set to `undefined`. `toStrictEqual` is stricter: it respects `undefined` properties, array holes and the object’s class. `toBe` compares references for objects, and `null` differs from `undefined`. New code often prefers `toStrictEqual` so a stray key doesn’t slip through.',
        },
      },
    ],
    sources: [{ title: 'Jest — .toStrictEqual(value)', url: `${JEST}/expect#tostrictequalvalue` }],
  },
  {
    id: 'test-mocks-006',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чем отличаются `mockClear`, `mockReset` и `mockRestore`?',
      en: 'How do `mockClear`, `mockReset` and `mockRestore` differ?',
    },
    options: [
      { text: { ru: 'Это синонимы', en: 'They’re synonyms' } },
      {
        text: {
          ru: '`mockClear` стирает историю вызовов; `mockReset` — ещё и подменённую реализацию; `mockRestore` — возвращает оригинал для `spyOn`',
          en: '`mockClear` wipes call history; `mockReset` also removes the mocked implementation; `mockRestore` brings back the original for `spyOn`',
        },
      },
      { text: { ru: '`mockClear` удаляет мок из модуля, остальные — только историю', en: '`mockClear` removes the mock from the module, the others only history' } },
      { text: { ru: '`mockRestore` нужен только для таймеров', en: '`mockRestore` is only for timers' } },
      { text: { ru: '`mockReset` перезапускает тест', en: '`mockReset` reruns the test' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Три уровня сброса: **clear** — `mock.calls` и `mock.results` пусты, реализация остаётся; **reset** — плюс реализация снова возвращает `undefined`; **restore** — для шпиона из `spyOn` возвращается настоящий метод. Чтобы не вызывать их вручную, в конфиге включают `clearMocks`/`restoreMocks` — тогда сброс идёт перед каждым тестом, и счётчики вызовов не «текут» между тестами.',
          en: 'Three levels of reset: **clear** — `mock.calls` and `mock.results` are empty, the implementation stays; **reset** — plus the implementation returns `undefined` again; **restore** — a `spyOn` spy gets the real method back. To avoid calling them by hand, enable `clearMocks`/`restoreMocks` in the config — reset then happens before each test, and call counts don’t leak between tests.',
        },
      },
    ],
    sources: [{ title: 'Jest — Mock Functions API', url: `${JEST}/mock-function-api` }],
  },
  {
    id: 'test-mocks-007',
    topic: 'testing',
    tags: ['testing-mocks'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Функция показывает «Сегодня», если дата совпадает с текущей. Тест проходит днём и падает в полночь. Как сделать его стабильным?',
      en: 'A function shows “Today” if a date matches the current one. The test passes during the day and fails at midnight. How do you make it stable?',
    },
    options: [
      { text: { ru: 'Не запускать тесты ночью', en: 'Don’t run tests at night' } },
      {
        text: {
          ru: 'Зафиксировать «сейчас»: фейковые таймеры и `setSystemTime(new Date(\'2026-01-15T12:00:00Z\'))`',
          en: 'Pin “now”: fake timers and `setSystemTime(new Date(\'2026-01-15T12:00:00Z\'))`',
        },
      },
      { text: { ru: 'Добавить `retry: 3` для этого теста', en: 'Add `retry: 3` for this test' } },
      { text: { ru: 'Сравнивать даты в тесте через `toString()`', en: 'Compare dates in the test via `toString()`' } },
      { text: { ru: 'Удалить тест', en: 'Delete the test' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Тест зависит от внешнего состояния — текущего времени, — поэтому результат меняется сам по себе. `jest.setSystemTime` или `vi.setSystemTime` (вместе с фейковыми таймерами) делают `Date.now()` и `new Date()` предсказуемыми. Ещё лучше — передавать «сейчас» в функцию параметром: тогда ей и мок не нужен. Не забудьте часовой пояс: в CI он может отличаться от вашего.',
          en: 'The test depends on external state — the current time — so its result changes by itself. `jest.setSystemTime` or `vi.setSystemTime` (with fake timers) make `Date.now()` and `new Date()` predictable. Even better, pass “now” into the function as a parameter: then no mock is needed. Mind the time zone: CI may differ from yours.',
        },
      },
    ],
    sources: [
      { title: 'Jest — jest.setSystemTime()', url: `${JEST}/jest-object#jestsetsystemtimenow` },
      { title: 'Vitest — vi.setSystemTime', url: 'https://vitest.dev/api/vi.html' },
    ],
  },
  {
    id: 'test-components-007',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В таблице у каждой строки своя кнопка «Удалить». Как кликнуть ту, что в строке «Anna»?',
      en: 'Each table row has its own “Delete” button. How do you click the one in the “Anna” row?',
    },
    options: [
      { code: "await user.click(screen.getAllByRole('button', { name: 'Delete' })[2]);" },
      {
        code: "const row = screen.getByRole('row', { name: /anna/i });\nawait user.click(within(row).getByRole('button', { name: 'Delete' }));",
      },
      { code: "await user.click(document.querySelector('tr:nth-child(3) button'));" },
      { code: "await user.click(screen.getByTestId('delete-2'));" },
      { code: "await user.click(screen.getByText('Delete'));" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`within` сужает поиск до элемента: сначала находим строку по её содержимому, потом кнопку внутри неё. Тест опирается на то, что видит пользователь, и не сломается от сортировки или новой строки. Индексы `[2]` и `nth-child` привязаны к порядку, а `getByText(\'Delete\')` упадёт, найдя несколько совпадений.',
          en: '`within` scopes queries to an element: first find the row by its content, then the button inside it. The test relies on what the user sees and won’t break on sorting or a new row. Indexes like `[2]` and `nth-child` are tied to order, and `getByText(\'Delete\')` fails on multiple matches.',
        },
      },
    ],
    sources: [{ title: 'Testing Library — within', url: `${RTL}/dom-testing-library/api-within` }],
  },
  {
    id: 'test-components-008',
    topic: 'testing',
    tags: ['testing-components'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: '`getByRole(\'button\', { name: \'Close\' })` не находит кнопку-иконку с крестиком. Что это значит?',
      en: '`getByRole(\'button\', { name: \'Close\' })` can’t find an icon-only “×” button. What does that mean?',
    },
    code: { lang: 'html', source: '<button class="close"><svg aria-hidden="true">…</svg></button>' },
    options: [
      { text: { ru: 'Testing Library не умеет искать SVG', en: 'Testing Library can’t find SVGs' } },
      {
        text: {
          ru: 'У кнопки нет доступного имени — диктор её тоже не назовёт; нужен `aria-label="Close"`, а не `data-testid`',
          en: 'The button has no accessible name — a screen reader can’t name it either; it needs `aria-label="Close"`, not a `data-testid`',
        },
      },
      { text: { ru: 'Нужно искать по классу `.close`', en: 'Search by the `.close` class' } },
      { text: { ru: 'Кнопки находят только через `getByText`', en: 'Buttons are found only via `getByText`' } },
      { text: { ru: 'Нужно дождаться рендера через `findByRole`', en: 'Wait for rendering with `findByRole`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`getByRole` ищет так же, как ассистивные технологии: по роли и доступному имени. Если тест не находит кнопку, её не найдёт и пользователь диктора — тест выявил реальный баг доступности. Правильная реакция — дать кнопке имя (`aria-label` или скрытый текст), а не переходить на `data-testid`, пряча проблему.',
          en: '`getByRole` searches the way assistive technology does: by role and accessible name. If the test can’t find the button, neither can a screen reader user — the test surfaced a real accessibility bug. The right fix is naming the button (`aria-label` or visually hidden text), not switching to `data-testid` and hiding the problem.',
        },
      },
    ],
    sources: [{ title: 'Testing Library — ByRole', url: `${RTL}/queries/byrole` }],
  },
  {
    id: 'test-e2e-005',
    topic: 'testing',
    tags: ['testing-e2e'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Какая проверка в Playwright подождёт, пока сообщение «Сохранено» появится?',
      en: 'Which Playwright assertion waits until the “Saved” message appears?',
    },
    options: [
      { code: "expect(await page.getByText('Saved').isVisible()).toBe(true);" },
      { code: "await expect(page.getByText('Saved')).toBeVisible();" },
      { code: "expect(page.getByText('Saved')).toBeTruthy();" },
      { code: "await page.waitForTimeout(3000);" },
      { code: "expect(await page.content()).toContain('Saved');" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Асинхронные «web-first» проверки вида `await expect(locator).toBeVisible()` повторяют попытки, пока условие не выполнится или не истечёт таймаут. `isVisible()` и `page.content()` проверяют состояние один раз — если сообщение появится через 100 мс, тест упадёт. `toBeTruthy()` на локаторе проходит всегда, а `waitForTimeout` делает тест медленным и всё равно ненадёжным.',
          en: 'Async “web-first” assertions like `await expect(locator).toBeVisible()` retry until the condition holds or the timeout expires. `isVisible()` and `page.content()` check the state once — if the message appears 100 ms later, the test fails. `toBeTruthy()` on a locator always passes, and `waitForTimeout` makes the test slow and still unreliable.',
        },
      },
    ],
    sources: [{ title: 'Playwright — Assertions', url: `${PLAYWRIGHT}/test-assertions` }],
  },
  {
    id: 'test-e2e-006',
    topic: 'testing',
    tags: ['testing-e2e', 'testing-mocks'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'E2E-тест должен проверить экран ошибки, когда API отвечает 500. Как это сделать в Playwright?',
      en: 'An E2E test must check the error screen when the API returns 500. How do you do it in Playwright?',
    },
    options: [
      { text: { ru: 'Уронить настоящий сервер перед тестом', en: 'Crash the real server before the test' } },
      {
        code: "await page.route('**/api/orders', (route) => route.fulfill({ status: 500 }));",
      },
      { text: { ru: 'Отключить интернет на машине CI', en: 'Turn off the internet on the CI machine' } },
      { code: "await page.evaluate(() => { window.fetch = null; });" },
      { text: { ru: 'Такое проверяют только вручную', en: 'Only manual testing can check this' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`page.route` перехватывает запросы браузера: можно вернуть свой статус и тело, задержать ответ или оборвать соединение. Так проверяют редкие состояния — ошибки, пустые списки, медленную сеть — быстро и детерминированно. Основные сценарии при этом стоит гонять и против настоящего бэкенда, иначе тест не заметит расхождения контракта.',
          en: '`page.route` intercepts browser requests: you can return your own status and body, delay a response or abort it. That checks rare states — errors, empty lists, slow networks — quickly and deterministically. Still run the main flows against the real backend, or the test won’t notice contract drift.',
        },
      },
    ],
    sources: [{ title: 'Playwright — Mock APIs', url: `${PLAYWRIGHT}/mock` }],
  },
  {
    id: 'test-basics-005',
    topic: 'testing',
    tags: ['testing-basics', 'testing-tdd'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Пришёл баг: корзина считает скидку неверно. С чего лучше начать исправление?',
      en: 'A bug report: the cart computes the discount incorrectly. Where’s the best place to start the fix?',
    },
    options: [
      { text: { ru: 'Сразу поправить формулу и проверить руками', en: 'Fix the formula right away and check by hand' } },
      {
        text: {
          ru: 'Написать тест, который воспроизводит баг и падает, потом исправить код до зелёного теста',
          en: 'Write a test that reproduces the bug and fails, then fix the code until the test is green',
        },
      },
      { text: { ru: 'Переписать модуль корзины целиком', en: 'Rewrite the cart module entirely' } },
      { text: { ru: 'Добавить логирование и ждать повтора', en: 'Add logging and wait for it to happen again' } },
      { text: { ru: 'Отключить скидки', en: 'Disable discounts' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Регрессионный тест**: сначала фиксируем баг падающим тестом — так мы убеждаемся, что правильно поняли проблему. После исправления тест становится зелёным и навсегда защищает от возврата ошибки. Падение теста **до** правки важно: тест, который проходит и с багом, ничего не проверяет.',
          en: 'A **regression test**: first capture the bug with a failing test — that confirms we understood the problem. After the fix the test goes green and guards against the bug coming back forever. The test failing **before** the fix matters: a test that passes with the bug checks nothing.',
        },
      },
    ],
    sources: [{ title: 'Kent C. Dodds — Write tests. Not too many. Mostly integration.', url: 'https://kentcdodds.com/blog/write-tests' }],
  },
  {
    id: 'test-basics-006',
    topic: 'testing',
    tags: ['testing-basics'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что предлагает модель «тестового трофея» (Testing Trophy) для фронтенда в отличие от классической пирамиды?',
      en: 'What does the “Testing Trophy” model suggest for frontend, unlike the classic pyramid?',
    },
    options: [
      { text: { ru: 'Писать только E2E-тесты', en: 'Write only E2E tests' } },
      {
        text: {
          ru: 'Основу делать из статического анализа, а больше всего вкладываться в интеграционные тесты компонентов',
          en: 'Build on static analysis and invest most in component integration tests',
        },
      },
      { text: { ru: 'Отказаться от TypeScript и линтеров', en: 'Drop TypeScript and linters' } },
      { text: { ru: 'Покрывать юнит-тестами каждую функцию на 100%', en: 'Cover every function 100% with unit tests' } },
      { text: { ru: 'Тестировать только вручную', en: 'Test only manually' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Трофей Кента Доддса: внизу — статический анализ (TypeScript, ESLint) ловит опечатки и типы почти бесплатно; самая широкая часть — **интеграционные** тесты, где компоненты работают вместе, как у пользователя; выше — немного E2E. Идея: чем ближе тест к реальному использованию, тем больше уверенности он даёт за свою цену.',
          en: 'Kent C. Dodds’s trophy: at the bottom, static analysis (TypeScript, ESLint) catches typos and types almost for free; the widest part is **integration** tests where components work together as for a user; on top, a few E2E. The idea: the closer a test is to real use, the more confidence it gives for its cost.',
        },
      },
    ],
    sources: [{ title: 'Kent C. Dodds — The Testing Trophy', url: 'https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications' }],
  },
  {
    id: 'test-unit-009',
    kind: 'order',
    topic: 'testing',
    tags: ['testing-unit'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Расставьте части теста по схеме Arrange — Act — Assert.',
      en: 'Arrange the test parts by the Arrange — Act — Assert pattern.',
    },
    items: [
      { code: "const cart = createCart([{ price: 100, qty: 2 }]);" },
      { code: "const total = cart.total({ discount: 0.1 });" },
      { code: "expect(total).toBe(180);" },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Arrange** — подготовить данные и окружение, **Act** — выполнить одно проверяемое действие, **Assert** — проверить результат. Такая структура делает тест читаемым: сразу видно, что проверяется. Если в тесте несколько «Act», обычно это несколько тестов. В BDD то же самое называют Given — When — Then.',
          en: '**Arrange** — prepare data and environment, **Act** — perform the one action under test, **Assert** — check the result. This structure makes a test readable: you see at once what’s being tested. Several “Acts” in one test usually mean several tests. BDD calls the same thing Given — When — Then.',
        },
      },
    ],
    sources: [
      { title: 'Bill Wake — 3A: Arrange, Act, Assert', url: 'https://xp123.com/3a-arrange-act-assert/' },
      { title: 'Martin Fowler — GivenWhenThen', url: 'https://martinfowler.com/bliki/GivenWhenThen.html' },
    ],
  },
];
