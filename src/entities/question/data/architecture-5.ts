import type { Question } from '../model/types';

const GURU = 'https://refactoring.guru/design-patterns';
const FOWLER = 'https://martinfowler.com/bliki';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const ARCHITECTURE_QUESTIONS_5: Question[] = [
  {
    id: 'arch-patterns-strategy-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const shipping = {
  courier: (weight) => 300 + weight * 50,
  pickup: () => 0,
  post: (weight) => 150 + weight * 30,
};
const cost = (method, weight) => (shipping[method] ?? shipping.post)(weight);

console.log(cost('courier', 2), cost('pickup', 5), cost('drone', 1));`,
    },
    answers: ['400 0 180'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это «Стратегия»: каждый способ расчёта — отдельная функция, а выбор — поиск в объекте вместо `switch`. Новый способ доставки добавляется одной строкой, без правки остального кода, а неизвестный метод получает запасной вариант (`post`: 150 + 30). Каждую стратегию легко протестировать отдельно.',
          en: 'This is the Strategy pattern: each calculation is a separate function, and choosing one is an object lookup instead of a `switch`. A new delivery method is one more line with no changes elsewhere, and an unknown method gets a fallback (`post`: 150 + 30). Each strategy is easy to test on its own.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Strategy', url: `${GURU}/strategy` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-patterns-chain-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const required = (value) => (value ? null : 'required');
const minLength = (length) => (value) => (value.length >= length ? null : \`min \${length}\`);
const email = (value) => (value.includes('@') ? null : 'email');

const validate = (rules) => (value) => rules.reduce((error, rule) => error ?? rule(value), null);
const check = validate([required, minLength(5), email]);

console.log(check(''), check('ab'), check('abcdef'), check('a@b.ru'));`,
    },
    answers: ['required min 5 email null'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Правила выстроены цепочкой: значение проходит их по порядку, и первое нарушение останавливает проверку — `??` не вызывает следующие правила, если ошибка уже есть. Это «Цепочка обязанностей»: правило не знает о соседях, их легко переставлять и комбинировать для разных полей. По тому же принципу устроены middleware и валидаторы в библиотеках форм.',
          en: 'The rules form a chain: the value passes through them in order, and the first violation stops the check — `??` doesn’t call later rules once there’s an error. This is Chain of Responsibility: a rule doesn’t know its neighbors, so rules are easy to reorder and combine per field. Middleware and form-library validators follow the same idea.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Chain of Responsibility', url: `${GURU}/chain-of-responsibility` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-principles-pipe-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-principles'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const pipe = (...fns) => (value) => fns.reduce((result, fn) => fn(result), value);
const compose = (...fns) => (value) => fns.reduceRight((result, fn) => fn(result), value);

const inc = (x) => x + 1;
const double = (x) => x * 2;

console.log(pipe(inc, double)(3), compose(inc, double)(3));`,
    },
    answers: ['8 7'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`pipe` применяет функции слева направо: `double(inc(3))` = 8. `compose` — справа налево, как в математике: `inc(double(3))` = 7. Обе собирают преобразование из маленьких [[pure-function|чистых функций]], которые проверяются по отдельности. В коде чаще читают `pipe`: порядок шагов совпадает с порядком записи.',
          en: '`pipe` applies functions left to right: `double(inc(3))` = 8. `compose` goes right to left, as in math: `inc(double(3))` = 7. Both build a transformation out of small [[pure-function|pure functions]] that can be tested separately. `pipe` usually reads better in code: the order of steps matches the order they’re written.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Function composition (computer science)', url: 'https://en.wikipedia.org/wiki/Function_composition_(computer_science)' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-data-result-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-data'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const parseAge = (input) => {
  const age = Number(input);
  return Number.isInteger(age) && age >= 0 ? { ok: true, value: age } : { ok: false, error: \`bad age: \${input}\` };
};

const results = ['42', 'abc', '-1'].map(parseAge);
console.log(results.filter((result) => result.ok).length, results.find((result) => !result.ok).error);`,
    },
    answers: ['1 bad age: abc'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вместо исключения функция возвращает результат-объект: `{ ok: true, value }` или `{ ok: false, error }`. Ошибка становится частью типа, и вызывающий код **обязан** её обработать — в TypeScript без проверки `ok` до `value` не добраться. Удобно для ожидаемых ошибок: невалидный ввод, «не найдено». Исключения оставляют для действительно неожиданного — упала сеть, сломан инвариант.',
          en: 'Instead of throwing, the function returns a result object: `{ ok: true, value }` or `{ ok: false, error }`. The error becomes part of the type, and the caller **must** handle it — in TypeScript you can’t reach `value` without checking `ok`. It suits expected failures: invalid input, “not found”. Exceptions stay for the truly unexpected — a network failure, a broken invariant.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Result type', url: 'https://en.wikipedia.org/wiki/Result_type' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-scale-strangler-001',
    topic: 'architecture',
    tags: ['arch-scale'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Старое приложение на jQuery нужно перевести на React, но фичи нельзя замораживать на полгода. Какой подход разумнее?',
      en: 'An old jQuery app must move to React, but features can’t be frozen for six months. Which approach is sensible?',
    },
    options: [
      { text: { ru: 'Переписать всё с нуля в отдельной ветке и переключиться за один день', en: 'Rewrite everything from scratch in a branch and switch over in a day' } },
      {
        text: {
          ru: 'Новые и переделываемые экраны делать на React рядом со старыми и постепенно переключать на них маршруты',
          en: 'Build new and reworked screens in React next to the old ones and gradually route traffic to them',
        },
      },
      { text: { ru: 'Оставить jQuery навсегда', en: 'Keep jQuery forever' } },
      { text: { ru: 'Переписывать по одному файлу без возможности выкатки', en: 'Rewrite one file at a time with nothing shippable' } },
      { text: { ru: 'Сначала полгода писать тесты на старый код, потом решать', en: 'Spend six months writing tests for the old code, then decide' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это «душащая смоковница» (Strangler Fig): новое приложение растёт вокруг старого и забирает у него экраны один за другим, пока старое не останется пустым. Каждый шаг выкатывается и приносит пользу сразу, риск ограничен одним экраном, а откатиться можно, вернув маршрут. Большое переписывание с нуля долго не даёт результата и часто так и не доходит до запуска.',
          en: 'This is the Strangler Fig: the new app grows around the old one and takes over screens one by one until the old app is empty. Each step ships and delivers value right away, risk is limited to one screen, and rolling back means switching the route back. A big rewrite from scratch shows no results for a long time and often never launches.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — Strangler Fig Application', url: `${FOWLER}/StranglerFigApplication.html` }],
  },
  {
    id: 'arch-principles-rule-of-three-001',
    topic: 'architecture',
    tags: ['arch-principles'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'В двух местах появился похожий код форматирования цены. Когда выносить его в общую функцию по «правилу трёх»?',
      en: 'Similar price-formatting code has appeared in two places. When should it be extracted into a shared function by the “rule of three”?',
    },
    options: [
      { text: { ru: 'Сразу, при первом же повторе', en: 'Right away, on the first repeat' } },
      { text: { ru: 'Никогда: дублирование всегда лучше абстракции', en: 'Never: duplication always beats abstraction' } },
      {
        text: {
          ru: 'Когда похожий код появится в третий раз — тогда видно, что в нём действительно общее',
          en: 'When similar code appears a third time — that’s when it’s clear what’s actually shared',
        },
      },
      { text: { ru: 'Только когда код станет длиннее 100 строк', en: 'Only once the code exceeds 100 lines' } },
      { text: { ru: 'Когда так решит линтер', en: 'When the linter says so' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По двум примерам трудно понять, какие различия случайны, а какие существенны, — абстракция, выдуманная слишком рано, потом обрастает флагами под каждый новый случай. Третье повторение показывает настоящую общую часть. Это эвристика, а не закон: если дублируется бизнес-правило, которое должно меняться синхронно, его выносят сразу.',
          en: 'With two examples it’s hard to tell which differences are incidental and which matter — an abstraction invented too early later sprouts flags for every new case. The third repetition reveals what’s truly shared. It’s a heuristic, not a law: if a business rule that must change in sync is duplicated, extract it right away.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Rule of three (computer programming)', url: 'https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming)' }],
  },
  {
    id: 'arch-scale-affected-001',
    topic: 'architecture',
    tags: ['arch-scale'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В монорепозитории CI на каждый пулреквест 40 минут гоняет тесты всех 30 проектов, хотя правка затронула одну библиотеку. Как ускорить?',
      en: 'In a monorepo, CI runs tests for all 30 projects on every pull request for 40 minutes, though the change touched one library. How do you speed it up?',
    },
    options: [
      { text: { ru: 'Отключить тесты в CI', en: 'Disable tests in CI' } },
      {
        text: {
          ru: 'Запускать задачи только для затронутых проектов по графу зависимостей (Nx affected, Turborepo) и кешировать результаты',
          en: 'Run tasks only for affected projects using the dependency graph (Nx affected, Turborepo) and cache the results',
        },
      },
      { text: { ru: 'Разбить репозиторий на 30 отдельных', en: 'Split the repo into 30 separate ones' } },
      { text: { ru: 'Гонять тесты только по ночам', en: 'Run tests only at night' } },
      { text: { ru: 'Купить более мощный раннер и больше ничего не менять', en: 'Buy a bigger runner and change nothing else' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Инструменты монорепозитория знают, кто от кого зависит. Изменили библиотеку — проверяются она и проекты, которые её используют, а остальные пропускаются. Кеш задач добавляет второй уровень: если входы проекта не изменились, результат берётся из кеша, в том числе с чужих машин. Так монорепозиторий сохраняет главный плюс — атомарные изменения сразу во многих проектах — без расплаты временем CI.',
          en: 'Monorepo tools know who depends on whom. Change a library — it and the projects using it are checked, the rest are skipped. A task cache adds a second layer: if a project’s inputs haven’t changed, the result comes from the cache, including from other machines. The monorepo keeps its main advantage — atomic changes across many projects — without paying for it in CI time.',
        },
      },
    ],
    sources: [{ title: 'Nx — Run only tasks affected by a PR', url: 'https://nx.dev/ci/features/affected' }],
  },
  {
    id: 'arch-principles-cqs-001',
    topic: 'architecture',
    tags: ['arch-principles'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Метод `getUnreadCount()` возвращает число непрочитанных и заодно помечает их прочитанными. Какой принцип нарушен?',
      en: 'The method `getUnreadCount()` returns the unread count and also marks them as read. Which principle is violated?',
    },
    options: [
      { text: { ru: 'DRY', en: 'DRY' } },
      { text: { ru: 'Принцип подстановки Лисков', en: 'The Liskov substitution principle' } },
      {
        text: {
          ru: 'Разделение команд и запросов (CQS): метод либо возвращает данные, либо меняет состояние',
          en: 'Command–query separation (CQS): a method either returns data or changes state',
        },
      },
      { text: { ru: 'YAGNI', en: 'YAGNI' } },
      { text: { ru: 'Ничего не нарушено', en: 'Nothing is violated' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Запрос должен быть безопасным: его можно вызвать дважды, вызвать в логах или отладчике — и ничего не изменится. Здесь второй вызов вернёт 0, а показ счётчика в двух местах сломает данные. Правильно разделить: `getUnreadCount()` только читает, `markAllRead()` только меняет. Исключения бывают (`stack.pop()`), но их делают осознанно и называют глаголом.',
          en: 'A query should be safe: call it twice, in a log or a debugger, and nothing changes. Here the second call returns 0, and showing the counter in two places corrupts data. Split it: `getUnreadCount()` only reads, `markAllRead()` only changes. Exceptions exist (`stack.pop()`), but they’re deliberate and named with a verb.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — CommandQuerySeparation', url: `${FOWLER}/CommandQuerySeparation.html` }],
  },
  {
    id: 'arch-frontend-fsd-layer-001',
    topic: 'architecture',
    tags: ['arch-frontend'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Проект на Feature-Sliced Design. Где разместить кнопку «В избранное», которая есть на карточке товара в каталоге и на странице товара?',
      en: 'A Feature-Sliced Design project. Where does an “Add to favorites” button go if it appears on product cards in the catalog and on the product page?',
    },
    options: [
      { text: { ru: 'В `entities/product` вместе с карточкой', en: 'In `entities/product` along with the card' } },
      {
        text: {
          ru: 'В `features/add-to-favorites`, а карточка получает кнопку через слот от виджета или страницы',
          en: 'In `features/add-to-favorites`, and the card receives the button through a slot from a widget or page',
        },
      },
      { text: { ru: 'В `shared/ui`', en: 'In `shared/ui`' } },
      { text: { ru: 'Скопировать в обе страницы', en: 'Copy it into both pages' } },
      { text: { ru: 'В `app`, потому что она используется в двух местах', en: 'In `app`, because it’s used in two places' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Действие пользователя, которое приносит ценность, — это фича. `entities/product` описывает сам товар и не должна зависеть от фич: слой ниже не импортирует слой выше. Поэтому карточка оставляет место (слот, `actions` в пропсах), а виджет каталога и страница товара собирают её с кнопкой из фичи. `shared/ui` подходит только для «глупой» кнопки без бизнес-логики.',
          en: 'A user action that delivers value is a feature. `entities/product` describes the product itself and must not depend on features: a lower layer doesn’t import a higher one. So the card leaves room (a slot, `actions` in props), and the catalog widget and product page compose it with the button from the feature. `shared/ui` only fits a “dumb” button with no business logic.',
        },
      },
    ],
    sources: [{ title: 'Feature-Sliced Design — Layers', url: 'https://feature-sliced.design/docs/reference/layers' }],
  },
  {
    id: 'arch-dependencies-peer-001',
    topic: 'architecture',
    tags: ['arch-dependencies'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Вы публикуете библиотеку React-компонентов. Почему `react` указывают в `peerDependencies`, а не в `dependencies`?',
      en: 'You publish a React component library. Why is `react` listed in `peerDependencies` rather than `dependencies`?',
    },
    options: [
      { text: { ru: 'Так быстрее устанавливается пакет', en: 'The package installs faster' } },
      {
        text: {
          ru: 'Чтобы библиотека использовала React приложения: два экземпляра React в одном дереве ломают хуки («Invalid hook call»)',
          en: 'So the library uses the app’s React: two React copies in one tree break hooks (“Invalid hook call”)',
        },
      },
      { text: { ru: 'Чтобы React не попадал в итоговый бандл приложения', en: 'So React doesn’t end up in the app bundle' } },
      { text: { ru: 'Это требование лицензии React', en: 'React’s license requires it' } },
      { text: { ru: 'Разницы нет, это вопрос стиля', en: 'There’s no difference, it’s a matter of style' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`peerDependencies` говорят: «мне нужен React, но возьми тот, что уже есть у приложения». Если положить React в `dependencies`, при несовпадении версий пакетный менеджер может поставить библиотеке свою копию — и хуки из одной копии окажутся в дереве, отрендеренном другой. React это не поддерживает и падает с «Invalid hook call». Диапазон в `peerDependencies` делают широким: `"react": "^18 || ^19"`.',
          en: '`peerDependencies` says: “I need React, but use the one the app already has.” If React is in `dependencies`, a version mismatch can make the package manager install a separate copy for the library — and hooks from one copy end up in a tree rendered by another. React doesn’t support that and fails with “Invalid hook call”. Keep the `peerDependencies` range wide: `"react": "^18 || ^19"`.',
        },
      },
    ],
    sources: [
      { title: 'React — Invalid Hook Call Warning', url: 'https://react.dev/warnings/invalid-hook-call-warning' },
      { title: 'npm — package.json: peerDependencies', url: 'https://docs.npmjs.com/cli/v11/configuring-npm/package-json' },
    ],
  },
];
