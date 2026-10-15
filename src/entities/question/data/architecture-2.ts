import type { Question } from '../model/types';

const GURU = 'https://refactoring.guru/design-patterns';
const WIKI = 'https://en.wikipedia.org/wiki';
const FOWLER = 'https://martinfowler.com/articles';

export const ARCHITECTURE_QUESTIONS_2: Question[] = [
  {
    id: 'arch-patterns-factory-001',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Функция `createNotifier(channel)` по строке `\'email\'`, `\'sms\'` или `\'push\'` возвращает объект с методом `send`. Код, который отправляет уведомления, не знает, какой класс создан. Что это за паттерн?',
      en: '`createNotifier(channel)` returns an object with a `send` method for `\'email\'`, `\'sms\'` or `\'push\'`. The code sending notifications doesn’t know which class was created. Which pattern is this?',
    },
    options: [
      { text: { ru: 'Фабрика', en: 'Factory' } },
      { text: { ru: 'Наблюдатель', en: 'Observer' } },
      { text: { ru: 'Декоратор', en: 'Decorator' } },
      { text: { ru: 'Синглтон', en: 'Singleton' } },
      { text: { ru: 'Итератор', en: 'Iterator' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Фабрика** прячет выбор и создание конкретного объекта за одной функцией. Вызывающий код работает с общим интерфейсом `send` и не зависит от конкретных классов, а новый канал добавляется в одном месте. Часто фабрика выбирает реализацию из реестра — тогда это сочетание с паттерном Стратегия.',
          en: 'A **Factory** hides choosing and creating a concrete object behind one function. Calling code works with the shared `send` interface and doesn’t depend on concrete classes, and a new channel is added in one place. Often a factory picks the implementation from a registry — combining it with the Strategy pattern.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Factory Method', url: `${GURU}/factory-method` }],
  },
  {
    id: 'arch-patterns-proxy-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `const target = { count: 0 };
const log = [];
const tracked = new Proxy(target, {
  set(object, key, value) {
    log.push(key);
    object[key] = value;
    return true;
  },
});

tracked.count++;
tracked.count++;
target.count++;

console.log(log.length, target.count);`,
    },
    answers: ['2 3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Паттерн **Заместитель**: `Proxy` перехватывает операции с объектом и добавляет поведение — логирование, валидацию, отслеживание изменений. Через `tracked` прошли две записи, а прямое изменение `target` перехватчик не увидел, хотя значение стало 3. На `Proxy` построена реактивность Vue и MobX — и поэтому изменения в обход реактивной обёртки там «теряются».',
          en: 'The **Proxy** pattern: `Proxy` intercepts operations on an object and adds behavior — logging, validation, change tracking. Two writes went through `tracked`, while the direct change to `target` bypassed the trap, though the value became 3. Vue and MobX reactivity are built on `Proxy` — which is why changes bypassing the reactive wrapper get “lost” there.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Proxy', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy' },
      { title: 'Refactoring.Guru — Proxy', url: `${GURU}/proxy` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-principles-isp-001',
    topic: 'architecture',
    tags: ['arch-principles', 'arch-dependencies'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Виджету нужен только метод `get` хранилища, но он принимает весь `Storage` с двенадцатью методами. Что предлагает принцип разделения интерфейсов?',
      en: 'A widget needs only the storage’s `get` method but accepts the whole `Storage` with twelve methods. What does interface segregation suggest?',
    },
    options: [
      { text: { ru: 'Добавить в `Storage` ещё методов на будущее', en: 'Add more methods to `Storage` for the future' } },
      {
        text: {
          ru: 'Принимать узкий тип `{ get(key: string): string | null }` — только то, что виджет действительно использует',
          en: 'Accept a narrow type `{ get(key: string): string | null }` — only what the widget actually uses',
        },
      },
      { text: { ru: 'Унаследовать виджет от `Storage`', en: 'Make the widget extend `Storage`' } },
      { text: { ru: 'Сделать все методы `Storage` необязательными', en: 'Make all `Storage` methods optional' } },
      { text: { ru: 'Передавать хранилище через глобальную переменную', en: 'Pass the storage through a global variable' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**ISP**: клиент не должен зависеть от методов, которые не использует. Узкий тип делает зависимость честной: для теста хватит объекта с одним `get`, а изменения в остальных методах `Storage` виджет не заденут. В TypeScript это бесплатно — структурная типизация примет и полный `Storage`, и заглушку.',
          en: '**ISP**: a client shouldn’t depend on methods it doesn’t use. A narrow type makes the dependency honest: a test needs an object with just `get`, and changes to other `Storage` methods won’t affect the widget. In TypeScript it’s free — structural typing accepts both the full `Storage` and a stub.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Interface segregation principle', url: `${WIKI}/Interface_segregation_principle` }],
  },
  {
    id: 'arch-principles-demeter-001',
    topic: 'architecture',
    tags: ['arch-principles', 'arch-dependencies'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Компонент доставки показывает `order.customer.profile.address.city.name`. Чем плоха такая цепочка?',
      en: 'A delivery component shows `order.customer.profile.address.city.name`. What’s wrong with such a chain?',
    },
    options: [
      { text: { ru: 'Она медленная: каждая точка — отдельный запрос', en: 'It’s slow: each dot is a separate request' } },
      {
        text: {
          ru: 'Компонент знает всю внутреннюю структуру чужих объектов: изменение любого звена ломает его (закон Деметры)',
          en: 'The component knows the whole internal structure of other objects: changing any link breaks it (Law of Demeter)',
        },
      },
      { text: { ru: 'Так нельзя писать в JavaScript', en: 'JavaScript doesn’t allow it' } },
      { text: { ru: 'Ничем, если добавить `?.`', en: 'Nothing, if you add `?.`' } },
      { text: { ru: 'Цепочка не работает с TypeScript', en: 'The chain doesn’t work with TypeScript' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Закон Деметры** — «разговаривай только с ближайшими друзьями»: модуль обращается к своим прямым зависимостям, а не к их внутренностям. Длинная цепочка связывает компонент с формой пяти объектов. Лучше получить готовое значение — `deliveryCity` из адаптера или селектора — или передать компоненту только то, что он показывает. `?.` спасает от падения, но не от связанности.',
          en: 'The **Law of Demeter** — “talk only to your immediate friends”: a module calls its direct dependencies, not their internals. A long chain couples the component to the shape of five objects. Better get a ready value — `deliveryCity` from an adapter or selector — or pass the component only what it displays. `?.` prevents crashes, not coupling.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Law of Demeter', url: `${WIKI}/Law_of_Demeter` }],
  },
  {
    id: 'arch-frontend-shared-code-001',
    topic: 'architecture',
    tags: ['arch-frontend'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В FSD двум фичам — `features/checkout` и `features/cart` — нужна одна логика сессии пользователя. Куда её деть?',
      en: 'In FSD two features — `features/checkout` and `features/cart` — need the same user session logic. Where should it go?',
    },
    options: [
      { text: { ru: 'Импортировать из `features/cart` в `features/checkout`', en: 'Import it from `features/cart` into `features/checkout`' } },
      { text: { ru: 'Скопировать в обе фичи и забыть', en: 'Copy it into both features and forget' } },
      {
        text: {
          ru: 'Вынести в слой ниже — например, `entities/session`, — а связывать фичи на уровне страницы или виджета',
          en: 'Move it to a lower layer — say, `entities/session` — and connect features at the page or widget level',
        },
      },
      { text: { ru: 'Положить в `app`', en: 'Put it in `app`' } },
      { text: { ru: 'Сделать глобальную переменную', en: 'Make a global variable' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Слайсы одного слоя не импортируют друг друга. Общую доменную логику опускают ниже — в `entities` (или `shared`, если она не про домен), — а фичи собирают вместе на уровне выше: `widgets` или `pages`. Если две фичи постоянно тянут друг друга, возможно, это одна фича, и их стоит объединить.',
          en: 'Slices of one layer don’t import each other. Shared domain logic goes lower — into `entities` (or `shared` if it isn’t domain-specific) — and features are composed one level up: `widgets` or `pages`. If two features constantly pull each other in, they may be one feature that should be merged.',
        },
      },
    ],
    sources: [{ title: 'Feature-Sliced Design — Cross-imports', url: 'https://feature-sliced.design/docs/guides/issues/cross-imports' }],
  },
  {
    id: 'arch-data-errors-001',
    topic: 'architecture',
    tags: ['arch-data'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Где лучше обрабатывать ошибки API во фронтенде?',
      en: 'Where is it best to handle API errors on the frontend?',
    },
    options: [
      { text: { ru: 'Только в каждом компоненте отдельно', en: 'Only in each component separately' } },
      { text: { ru: 'Нигде: пусть ошибка всплывёт до консоли', en: 'Nowhere: let the error bubble to the console' } },
      {
        text: {
          ru: 'Общие случаи (401 — выход, 5xx и сеть — уведомление) — централизованно в HTTP-слое, а доменные (например, «email занят») — там, где их можно показать пользователю',
          en: 'Common cases (401 — log out, 5xx and network — a notification) centrally in the HTTP layer, and domain ones (say, “email taken”) where they can be shown to the user',
        },
      },
      { text: { ru: 'Только в глобальном `window.onerror`', en: 'Only in global `window.onerror`' } },
      { text: { ru: 'Перехватывать все ошибки и молча возвращать пустые данные', en: 'Catch all errors and silently return empty data' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сквозные ошибки одинаковы для всего приложения, и их обработка в одном месте (перехватчик, обёртка над `fetch`) убирает дублирование. А доменная ошибка имеет смысл только рядом с формой или экраном, где пользователь может что-то исправить. Молча проглоченная ошибка хуже всего: интерфейс показывает «пусто», и причину не найти.',
          en: 'Cross-cutting errors are the same app-wide, and handling them in one place (an interceptor, a `fetch` wrapper) removes duplication. A domain error only makes sense next to the form or screen where the user can fix something. A silently swallowed error is the worst: the UI shows “empty”, and the cause can’t be found.',
        },
      },
    ],
    sources: [{ title: 'MDN — Using the Fetch API: checking response status', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch' }],
  },
  {
    id: 'arch-dependencies-event-bus-001',
    topic: 'architecture',
    tags: ['arch-dependencies', 'arch-patterns'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Модули общаются через глобальную шину событий: `bus.emit(\'cart:updated\')`. Какая главная цена такого подхода?',
      en: 'Modules talk through a global event bus: `bus.emit(\'cart:updated\')`. What’s the main cost of this approach?',
    },
    options: [
      { text: { ru: 'События медленнее вызовов функций в 100 раз', en: 'Events are 100× slower than function calls' } },
      {
        text: {
          ru: 'Связи становятся неявными: по коду не видно, кто реагирует на событие и в каком порядке, — сложнее отлаживать и менять',
          en: 'Coupling becomes implicit: code doesn’t show who reacts to an event and in what order — harder to debug and change',
        },
      },
      { text: { ru: 'Шину нельзя использовать в браузере', en: 'A bus can’t be used in the browser' } },
      { text: { ru: 'События нельзя типизировать', en: 'Events can’t be typed' } },
      { text: { ru: 'Никакой цены нет, это лучший способ связать модули', en: 'No cost, it’s the best way to connect modules' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Шина снимает прямую зависимость между модулями, но связь никуда не исчезает — она становится скрытой. Чтобы понять последствия `emit`, нужно искать подписчиков по строке события по всему проекту. Шина уместна для действительно независимых реакций (аналитика, логирование), а основной поток данных лучше делать явным: вызовы, сторы, пропсы.',
          en: 'A bus removes direct dependencies between modules, but the coupling doesn’t disappear — it becomes hidden. To understand what `emit` triggers you have to search the whole project for subscribers by event name. A bus fits truly independent reactions (analytics, logging), while the main data flow is better explicit: calls, stores, props.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — What do you mean by “Event-Driven”?', url: `${FOWLER}/201701-event-driven.html` }],
  },
  {
    id: 'arch-scale-feature-flags-001',
    topic: 'architecture',
    tags: ['arch-scale'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Большая фича делается три недели. Как вливать её в `main` по частям, не показывая пользователям недоделанное?',
      en: 'A big feature takes three weeks. How do you merge it into `main` in parts without showing users unfinished work?',
    },
    options: [
      { text: { ru: 'Держать отдельную ветку три недели и слить в конце', en: 'Keep a separate branch for three weeks and merge at the end' } },
      {
        text: {
          ru: 'Прятать незаконченное за фича-флагом: код уже в `main`, включается по флагу, а после запуска флаг удаляют',
          en: 'Hide unfinished work behind a feature flag: the code is in `main`, turned on by the flag, and the flag is removed after launch',
        },
      },
      { text: { ru: 'Закомментировать новый код', en: 'Comment out the new code' } },
      { text: { ru: 'Выпускать недоделки и чинить по отзывам', en: 'Ship unfinished work and fix from feedback' } },
      { text: { ru: 'Отключить CI на время работы', en: 'Disable CI during the work' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Фича-флаги** позволяют сливать маленькие PR каждый день: конфликтов меньше, ревью проще, а включить фичу можно для команды, процента пользователей или стейджа. Долгоживущая ветка копит конфликты и даёт огромный рискованный мёрж. Цена флагов — ветвления в коде: их удаляют сразу после запуска, иначе они превращаются в техдолг.',
          en: '**Feature flags** let you merge small PRs daily: fewer conflicts, easier review, and the feature can be enabled for the team, a percentage of users or staging. A long-lived branch accumulates conflicts and ends in a huge risky merge. The cost of flags is branching in code: remove them right after launch, or they become tech debt.',
        },
      },
    ],
    sources: [
      { title: 'Martin Fowler — Feature Toggles', url: `${FOWLER}/feature-toggles.html` },
      { title: 'Trunk Based Development — Feature Flags', url: 'https://trunkbaseddevelopment.com/feature-flags/' },
    ],
  },
];
