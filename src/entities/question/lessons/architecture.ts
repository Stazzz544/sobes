import type { Lesson } from '../model/types';

const GURU = 'https://refactoring.guru/design-patterns';
const WIKI = 'https://en.wikipedia.org/wiki';
const FSD = 'https://feature-sliced.design/docs/reference';

export const ARCHITECTURE_LESSONS: Lesson[] = [
  {
    tag: 'arch-principles',
    format: 'steps',
    summary: {
      ru: 'SOLID, DRY, KISS и YAGNI — эвристики, которые помогают писать код, который легко менять. Это не законы: каждая полезна, пока снижает стоимость изменений.',
      en: 'SOLID, DRY, KISS and YAGNI are heuristics for writing code that’s easy to change. They aren’t laws: each is useful as long as it lowers the cost of change.',
    },
    steps: [
      {
        id: 'srp',
        title: { ru: 'Одна причина для изменения', en: 'One reason to change' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Принцип единственной ответственности (SRP)**: у модуля одна причина для изменения. Компонент корзины, который сам считает скидки, отправляет события аналитики и рисует список, меняется по трём причинам: скидки правит маркетинг, события — аналитики, вёрстку — дизайнер. Правка одного задевает остальное. Такой модуль раскладывают на части: расчёт, отправку и отображение.',
              en: '**The single responsibility principle (SRP)**: a module has one reason to change. A cart component that calculates discounts itself, sends analytics events and renders the list changes for three reasons: marketing edits discounts, analysts edit events, a designer edits layout. Changing one touches the rest. Such a module is split into parts: calculation, sending and rendering.',
            },
          },
          { type: 'illustration', illustration: 'arch-srp-reasons' },
        ],
        test: ['arch-principles-srp-001'],
      },
      {
        id: 'open-closed',
        title: { ru: 'Расширять, а не править', en: 'Extend, don’t edit' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Принцип открытости/закрытости (OCP)**: новое поведение добавляют, не переписывая проверенный код. Признак нарушения — `switch` по типу, размноженный по файлам: каждый новый вариант требует правки во всех. Решение — описать вариант одним объектом с общим набором полей и методов и хранить варианты в реестре по ключу. Новый формат экспорта или канал уведомлений — одна новая запись.',
              en: '**The open/closed principle (OCP)**: new behavior is added without rewriting tested code. The warning sign is a `switch` on type copied across files: every new variant needs edits in all of them. The fix is to describe a variant as one object with a shared set of fields and methods and keep variants in a registry by key. A new export format or notification channel is one new entry.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const exporters = {\n  csv: { ext: 'csv', run: toCsv },\n  pdf: { ext: 'pdf', run: toPdf },\n};\nconst exportAs = (format, rows) =>\n  exporters[format].run(rows);",
            },
          },
        ],
        test: ['arch-principles-ocp-001'],
      },
      {
        id: 'liskov',
        title: { ru: 'Подстановка Лисков', en: 'Liskov substitution' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Принцип подстановки Лисков (LSP)**: объект подкласса должен работать везде, где работает родитель, не ломая ожиданий кода, написанного для родителя. Наследник может добавлять поведение, но не менять смысл унаследованных методов. Если переопределённый метод вдруг бросает ошибку или меняет больше, чем обещал родитель, это не подтип: лучше общий интерфейс и отдельные классы.',
              en: '**The Liskov substitution principle (LSP)**: a subclass object must work wherever the parent works without breaking the expectations of code written for the parent. A subclass may add behavior but not change the meaning of inherited methods. If an overridden method suddenly throws or changes more than the parent promised, it isn’t a subtype: prefer a shared interface and separate classes.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "class List {\n  items = [];\n  add(item) { this.items.push(item); }\n}\nclass ReadonlyList extends List {\n  add() {\n    throw new Error('read only');\n  }\n}\nconst fill = (list) => list.add(1);\nfill(new ReadonlyList()); // Error",
            },
          },
        ],
        test: ['arch-principles-lsp-001'],
      },
      {
        id: 'narrow-interfaces',
        title: { ru: 'Разделение интерфейсов', en: 'Interface segregation' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Принцип разделения интерфейсов (ISP)**: модуль не должен зависеть от методов, которыми не пользуется. Функции, которой нужен только `send`, незачем требовать весь `Mailer` с двадцатью методами — опишите тип ровно под её потребность. Зависимость становится честной: в тесте хватит объекта с одним методом, а изменения в остальных методах функцию не задевают.',
              en: '**The interface segregation principle (ISP)**: a module shouldn’t depend on methods it doesn’t use. A function that needs only `send` has no reason to require a whole `Mailer` with twenty methods — describe a type that fits exactly its need. The dependency becomes honest: a test needs an object with one method, and changes to other methods don’t affect the function.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "type Sender = {\n  send(to: string, text: string): void;\n};\nfunction notify(sender: Sender) {\n  sender.send('ops', 'deploy done');\n}",
            },
          },
        ],
        test: ['arch-principles-isp-001'],
      },
      {
        id: 'dry-yagni',
        title: { ru: 'DRY, KISS и YAGNI', en: 'DRY, KISS and YAGNI' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**DRY** запрещает дублировать **знание**, а не одинаковые строки. Похожий код, который меняется по разным причинам, объединять вредно: общая функция обрастает флагами под каждый случай, и правка для одной фичи ломает другую. Неправильная абстракция дороже дубля — её откатывают, встраивая код обратно. «Правило трёх»: выносить общее, когда повтор появился в третий раз. **YAGNI** — не строить возможности «на будущее», **KISS** — выбирать простое решение.',
              en: '**DRY** forbids duplicating **knowledge**, not identical lines. Merging similar code that changes for different reasons is harmful: the shared function grows a flag for every case, and a change for one feature breaks another. The wrong abstraction costs more than duplication — roll it back by inlining the code. The “rule of three”: extract the common part when it repeats a third time. **YAGNI** — don’t build features “for the future”; **KISS** — prefer the simple solution.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'dry-knowledge',
              prompt: {
                ru: 'Что на самом деле запрещает дублировать DRY?',
                en: 'What does DRY actually forbid duplicating?',
              },
              options: [
                { text: { ru: 'Любые одинаковые строки кода', en: 'Any identical lines of code' } },
                { text: { ru: 'Знание: одно правило — в одном месте', en: 'Knowledge: one rule lives in one place' } },
                { text: { ru: 'Имена переменных', en: 'Variable names' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Одинаковые строки могут выражать разные правила и меняться по разным причинам. Дублем считается одно и то же правило в двух местах.',
                en: 'Identical lines may express different rules and change for different reasons. A duplicate is the same rule in two places.',
              },
            },
          },
        ],
        test: ['arch-principles-wrong-abstraction-001', 'arch-principles-yagni-001'],
      },
      {
        id: 'honest-functions',
        title: { ru: 'Честные функции', en: 'Honest functions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Разделение команд и запросов (CQS)**: метод либо возвращает данные (запрос), либо меняет состояние (команда), но не то и другое сразу. Запрос безопасно вызвать дважды — в логе, в отладчике, в двух компонентах. Ещё одна ловушка — позиционные флаги: по вызову `save(doc, true, false)` не понять, что значит каждый `true`, а перепутанный порядок TypeScript не заметит — типы одинаковые. Объект с именованными полями читается сам.',
              en: '**Command–query separation (CQS)**: a method either returns data (a query) or changes state (a command), never both. A query is safe to call twice — in a log, a debugger, two components. Another trap is positional flags: from the call `save(doc, true, false)` you can’t tell what each `true` means, and TypeScript won’t notice a swapped order — the types match. An object with named fields reads by itself.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'save(doc, true, false);\n\nsave(doc, {\n  draft: true,\n  notify: false,\n});',
            },
          },
        ],
        test: ['arch-principles-cqs-001'],
      },
      {
        id: 'composition',
        title: { ru: 'Композиция вместо наследования', en: 'Composition over inheritance' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Наследование фиксирует одну иерархию: у карточки товара бывают скидка, рейтинг и бейдж «Новинка», и на каждое сочетание пришлось бы заводить подкласс. **Композиция** собирает поведение из независимых частей: компонент принимает их пропсами или через `children`, и любое сочетание — просто другой набор пропсов. Та же идея в функциях: маленькие [[pure-function|чистые функции]] собирают в конвейер.',
              en: 'Inheritance fixes a single hierarchy: a product card may have a discount, a rating and a “New” badge, and every combination would need its own subclass. **Composition** builds behavior from independent parts: a component takes them as props or via `children`, and any combination is just a different set of props. The same idea works for functions: small [[pure-function|pure functions]] are chained into a pipeline.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: '<ProductCard\n  badge={<NewBadge />}\n  footer={<Rating value={4.5} />}\n>\n  <Price value={990} discount={10} />\n</ProductCard>',
            },
          },
        ],
        test: ['arch-principles-composition-001'],
      },
    ],
    keyPoints: [
      { ru: 'SRP: одна причина для изменения.', en: 'SRP: one reason to change.' },
      { ru: 'OCP: новый вариант — новая запись, а не правка `switch`.', en: 'OCP: a new variant is a new entry, not a `switch` edit.' },
      { ru: 'Неправильная абстракция дороже дубля.', en: 'The wrong abstraction costs more than duplication.' },
      { ru: 'Метод — либо запрос, либо команда.', en: 'A method is either a query or a command.' },
      { ru: 'Сочетания — композицией, а не подклассами.', en: 'Combinations via composition, not subclasses.' },
    ],
    sources: [
      { title: 'Wikipedia — SOLID', url: `${WIKI}/SOLID` },
      { title: 'Sandi Metz — The Wrong Abstraction', url: 'https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction' },
      { title: 'Martin Fowler — CommandQuerySeparation', url: 'https://martinfowler.com/bliki/CommandQuerySeparation.html' },
      { title: 'Wikipedia — Composition over inheritance', url: `${WIKI}/Composition_over_inheritance` },
    ],
  },
  {
    tag: 'arch-patterns',
    format: 'steps',
    summary: {
      ru: 'Паттерны — готовые названия для типовых решений. На собеседовании важно не заученное определение, а умение узнать паттерн в коде и сказать, какую проблему он решает.',
      en: 'Patterns are ready-made names for typical solutions. In an interview what matters isn’t a memorized definition but spotting a pattern in code and saying what problem it solves.',
    },
    steps: [
      {
        id: 'creational',
        title: { ru: 'Фабрика и Строитель', en: 'Factory and Builder' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Фабрика** — функция, которая по параметру выбирает и создаёт нужный объект: вызывающий код работает с общим интерфейсом и не знает конкретных классов, а новый вариант добавляется в одном месте. **Строитель** собирает сложный объект по шагам: каждый метод добавляет часть и возвращает `this`, поэтому вызовы складываются в цепочку («текучий интерфейс»), а финальный `build()` выдаёт результат.',
              en: 'A **Factory** is a function that picks and creates the right object from a parameter: calling code works with a shared interface and doesn’t know concrete classes, and a new variant is added in one place. A **Builder** assembles a complex object step by step: each method adds a part and returns `this`, so calls chain together (a “fluent interface”), and the final `build()` returns the result.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "class UrlBuilder {\n  parts = [];\n  path(segment) {\n    this.parts.push(segment);\n    return this;\n  }\n  build() {\n    return '/' + this.parts.join('/');\n  }\n}\nconst url = new UrlBuilder()\n  .path('users')\n  .path('42')\n  .build(); // '/users/42'",
            },
          },
        ],
        test: ['arch-patterns-factory-001'],
      },
      {
        id: 'strategy',
        title: { ru: 'Стратегия', en: 'Strategy' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Стратегия** — взаимозаменяемые алгоритмы за общим интерфейсом. В JS это часто просто объект функций: выбор — поиск по ключу вместо разросшегося `switch`, новый вариант — одна новая запись. Для неизвестного ключа подставляют вариант по умолчанию через `??`, иначе код упадёт с `is not a function`. Родственный приём — **Null Object**: вместо `null` объект-заглушка с тем же интерфейсом и безопасным поведением.',
              en: '**Strategy** means interchangeable algorithms behind a shared interface. In JS it’s often just an object of functions: choosing is a key lookup instead of a sprawling `switch`, and a new variant is one new entry. For an unknown key you fall back to a default via `??`, or the code crashes with `is not a function`. A related trick is **Null Object**: instead of `null`, a stub with the same interface and safe behavior.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const sorters = {\n  cheap: (a, b) => a.price - b.price,\n  newest: (a, b) => b.date - a.date,\n};\nconst sortBy = (key, list) => {\n  const sorter = sorters[key];\n  return [...list].sort(\n    sorter ?? sorters.newest,\n  );\n};',
            },
          },
        ],
        test: ['arch-patterns-strategy-001'],
      },
      {
        id: 'observer',
        title: { ru: 'Наблюдатель', en: 'Observer' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Наблюдатель**: источник хранит список подписчиков и уведомляет их об изменениях, ничего о них не зная. Так устроены сторы, события DOM, `EventEmitter`. Метод `subscribe` обычно возвращает функцию отписки: после её вызова подписчик больше не получает уведомлений. Забытая отписка — частая утечка памяти: компонент давно размонтирован, а его обработчик всё ещё вызывается.',
              en: '**Observer**: a source keeps a list of subscribers and notifies them of changes without knowing anything about them. Stores, DOM events and `EventEmitter` work this way. `subscribe` usually returns an unsubscribe function: after calling it, the subscriber gets no more notifications. A forgotten unsubscribe is a common memory leak: the component unmounted long ago, but its handler still runs.',
            },
          },
          { type: 'illustration', illustration: 'arch-observer' },
        ],
        test: ['arch-patterns-observer-001'],
      },
      {
        id: 'wrappers',
        title: { ru: 'Обёртки', en: 'Wrappers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Адаптер** приводит чужой интерфейс к нужному: ответ API — к модели приложения. **Фасад** даёт один простой вход в сложную подсистему: компонент вызывает одну функцию, а она — несколько SDK. **Декоратор** оборачивает функцию, сохраняя её интерфейс, и добавляет поведение: повторы, кеш, логирование. **Заместитель** (`Proxy`) перехватывает операции с объектом, но только идущие через него: прямые изменения исходного объекта ловушки не видят.',
              en: 'An **Adapter** converts a foreign interface into the one you need: an API response into the app’s model. A **Facade** offers one simple entry to a complex subsystem: a component calls one function, and it calls several SDKs. A **Decorator** wraps a function, keeping its interface, and adds behavior: retries, caching, logging. A **Proxy** intercepts operations on an object, but only those going through it: direct changes to the original object bypass the traps.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const withLog = (fn) => (...args) => {\n  console.log('call', args);\n  return fn(...args);\n};\nconst add = (a, b) => a + b;\nwithLog(add)(2, 3); // logs, returns 5",
            },
          },
          {
            type: 'check',
            check: {
              id: 'decorator-vs-adapter',
              prompt: {
                ru: 'Чем Декоратор отличается от Адаптера?',
                en: 'How does a Decorator differ from an Adapter?',
              },
              options: [
                { text: { ru: 'Декоратор сохраняет интерфейс и добавляет поведение, Адаптер меняет интерфейс', en: 'A Decorator keeps the interface and adds behavior; an Adapter changes the interface' } },
                { text: { ru: 'Ничем, это синонимы', en: 'No difference, they’re synonyms' } },
                { text: { ru: 'Декоратор работает только с классами', en: 'A Decorator works only with classes' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Обёрнутую декоратором функцию вызывают так же, как исходную. Адаптер нужен именно там, где интерфейсы не совпадают.',
                en: 'A decorated function is called exactly like the original. An Adapter is for when the interfaces don’t match.',
              },
            },
          },
        ],
        test: ['arch-patterns-facade-001', 'arch-patterns-decorator-001'],
      },
      {
        id: 'behavioral',
        title: { ru: 'Команда и middleware', en: 'Command and middleware' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Команда** упаковывает действие в объект, который умеет себя выполнить (`do`) и отменить (`undo`). Выполненные команды кладут в стек: «Отменить» снимает последнюю и вызывает её `undo`. **Цепочка middleware** («луковица»): каждый слой выполняет код до `next()`, передаёт управление внутрь, а когда внутренние слои закончат — код после `next()`. Поэтому вход идёт по порядку, а выход — в обратном.',
              en: 'A **Command** packs an action into an object that can run itself (`do`) and undo itself (`undo`). Executed commands go on a stack: “Undo” pops the last one and calls its `undo`. A **middleware chain** (an “onion”): each layer runs its code before `next()`, passes control inward, and once the inner layers finish — the code after `next()`. So the way in is in order, and the way out is reversed.',
            },
          },
          { type: 'diagram', diagram: 'arch-middleware-onion' },
        ],
        test: ['arch-patterns-command-001', 'arch-patterns-middleware-001'],
      },
      {
        id: 'singleton',
        title: { ru: 'Синглтон и сервер', en: 'Singletons on the server' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В JS **синглтон** — это просто модуль с состоянием: модуль выполняется один раз, и все импорты получают один и тот же объект. В браузере это удобно — вкладка принадлежит одному пользователю. На сервере один процесс обслуживает всех, и данные из модульной переменной, записанные для одного запроса, прочитает другой. Состояние запроса создают на каждый запрос и передают явно.',
              en: 'In JS a **singleton** is just a module with state: a module runs once, and every import gets the same object. In the browser that’s handy — a tab belongs to one user. On the server one process serves everyone, and data written to a module variable for one request will be read by another. Per-request state is created for each request and passed explicitly.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'let currentUser = null; // shared!\n\nexport const handle = (request) => {\n  currentUser = request.user;\n  return render();\n};',
            },
          },
        ],
        test: ['arch-patterns-singleton-ssr-001'],
      },
    ],
    keyPoints: [
      { ru: 'Фабрика прячет выбор класса, Строитель — сборку по шагам.', en: 'Factory hides the class choice; Builder hides step-by-step assembly.' },
      { ru: 'Стратегия вместо разросшегося `switch`.', en: 'Strategy instead of a sprawling `switch`.' },
      { ru: 'Декоратор сохраняет интерфейс, Адаптер — меняет.', en: 'Decorator keeps the interface; Adapter changes it.' },
      { ru: 'Middleware: вход по порядку, выход — в обратном.', en: 'Middleware: in — in order, out — reversed.' },
      { ru: 'Модуль с состоянием на сервере — общий для всех.', en: 'A stateful module on the server is shared by all.' },
    ],
    sources: [
      { title: 'Refactoring.Guru — Builder', url: `${GURU}/builder` },
      { title: 'Refactoring.Guru — Strategy', url: `${GURU}/strategy` },
      { title: 'Refactoring.Guru — Observer', url: `${GURU}/observer` },
      { title: 'Refactoring.Guru — Decorator', url: `${GURU}/decorator` },
      { title: 'Refactoring.Guru — Command', url: `${GURU}/command` },
    ],
  },
  {
    tag: 'arch-frontend',
    format: 'steps',
    summary: {
      ru: 'Архитектура фронтенда — это границы: какие модули есть, что они показывают наружу и кто от кого может зависеть. Разберём на примере Feature-Sliced Design и приёмов, которые делают интерфейс устойчивым.',
      en: 'Frontend architecture is about boundaries: which modules exist, what they expose and who may depend on whom. We’ll use Feature-Sliced Design and a few techniques that make a UI resilient.',
    },
    steps: [
      {
        id: 'layers',
        title: { ru: 'Слои FSD', en: 'FSD layers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Feature-Sliced Design делит код на слои снизу вверх: `shared` → `entities` → `features` → `widgets` → `pages` → `app`. Правило одно: модуль импортирует только из слоёв **ниже** себя. `shared` не знает о предметной области (UI-кит, утилиты), `entities` — бизнес-сущности (пользователь, товар), `features` — действия пользователя, `widgets` — крупные блоки, `pages` — экраны. Зависимости идут в одну сторону, и циклов нет.',
              en: 'Feature-Sliced Design splits code into layers from the bottom up: `shared` → `entities` → `features` → `widgets` → `pages` → `app`. There’s one rule: a module imports only from layers **below** it. `shared` knows nothing of the domain (UI kit, utils), `entities` are business entities (user, product), `features` are user actions, `widgets` are large blocks, `pages` are screens. Dependencies flow one way, and there are no cycles.',
            },
          },
          { type: 'illustration', illustration: 'arch-fsd-layers' },
        ],
        test: ['arch-frontend-fsd-imports-001'],
      },
      {
        id: 'slices',
        title: { ru: 'Слайсы и слоты', en: 'Slices and slots' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Слайсы одного слоя друг друга не импортируют: `features/cart` не знает о `features/compare`. Общую логику опускают ниже — в `entities` или `shared`, — а фичи соединяют слоем выше, в виджете или на странице. Если сущности нужно показать действие из фичи, она оставляет **слот** — проп для готового элемента, — и виджет вставляет туда кнопку фичи. Действие пользователя, которое приносит ценность, — это фича, а не часть сущности.',
              en: 'Slices of one layer don’t import each other: `features/cart` doesn’t know about `features/compare`. Shared logic moves lower — into `entities` or `shared` — and features are joined a layer up, in a widget or page. If an entity needs to show a feature’s action, it leaves a **slot** — a prop for a ready element — and the widget puts the feature’s button there. A user action that delivers value is a feature, not part of an entity.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: '// widgets/catalog\n<ProductCard\n  product={product}\n  actions={\n    <AddToCompare id={product.id} />\n  }\n/>',
            },
          },
        ],
        test: ['arch-frontend-shared-code-001', 'arch-frontend-fsd-layer-001'],
      },
      {
        id: 'public-api',
        title: { ru: 'Публичный API и циклы', en: 'Public API and cycles' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Каждый слайс открывает наружу только `index.ts` — **публичный API**. Глубокий импорт во внутренние файлы привязывает потребителя к структуре папок: переименовали файл — сломались десятки мест. Циклический импорт — признак размытых границ. В ES-модулях зависимость выполняется раньше модуля, который её импортирует, и каждый модуль — один раз. При цикле зависимость начнёт выполняться, пока её импортёр ещё не дошёл до своих `export const`, и чтение такой переменной бросит `ReferenceError`.',
              en: 'Each slice exposes only `index.ts` — its **public API**. A deep import into internal files ties the consumer to the folder layout: rename a file and dozens of places break. A circular import signals blurry boundaries. In ES modules a dependency runs before the module that imports it, and each module runs once. In a cycle the dependency starts running while its importer hasn’t reached its own `export const` yet, and reading such a variable throws a `ReferenceError`.',
            },
          },
        ],
        test: ['arch-frontend-public-api-001', 'arch-frontend-cycles-001'],
      },
      {
        id: 'colocation',
        title: { ru: 'Что меняется вместе — рядом', en: 'What changes together lives together' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Раскладка по типам файлов — `components/`, `hooks/`, `utils/`, `api/` — удобна в маленьком проекте. С ростом код одной фичи оказывается в пяти папках: любая правка задевает их все, а удалить фичу целиком трудно. **Colocation**: компонент, его модель, запросы и тексты лежат рядом в папке фичи. Удалили папку — удалили фичу, и ничего лишнего не осталось.',
              en: 'Grouping by file type — `components/`, `hooks/`, `utils/`, `api/` — works in a small project. As it grows, one feature’s code ends up in five folders: any change touches them all, and removing the feature entirely is hard. **Colocation**: a component, its model, requests and texts live together in the feature’s folder. Delete the folder and the feature is gone with nothing left over.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'text',
              source: 'features/favorites/\n  ui/favorite-button.tsx\n  model/favorites.ts\n  api/toggle-favorite.ts\n  index.ts',
            },
          },
        ],
        test: ['arch-frontend-colocation-001'],
      },
      {
        id: 'logic-view',
        title: { ru: 'Логика отдельно от отображения', en: 'Logic apart from rendering' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Компонент, который сам загружает данные, фильтрует и рисует, трудно показать в Storybook и протестировать. Логику выносят в хук или модель, а компонент отображения получает готовые данные пропсами — современная версия container/presentational. Та же граница у **headless-библиотек** (Radix, React Aria, TanStack Table): они дают поведение, состояние и доступность — фокус, клавиатуру, ARIA, — а разметка и стили остаются вашими.',
              en: 'A component that loads data, filters it and renders it all by itself is hard to show in Storybook and to test. Logic moves into a hook or model, and a rendering component gets ready data as props — the modern take on container/presentational. **Headless libraries** (Radix, React Aria, TanStack Table) draw the same line: they provide behavior, state and accessibility — focus, keyboard, ARIA — while markup and styles stay yours.',
            },
          },
        ],
        test: ['arch-frontend-container-001'],
      },
      {
        id: 'states',
        title: { ru: 'Автоматы и границы ошибок', en: 'State machines and error boundaries' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Конечный автомат** описывает состояния экрана и допустимые переходы. Событие, которого нет в таблице переходов текущего состояния, просто игнорируется — состояние не меняется. **Error Boundary** ловит ошибки рендера ниже себя и показывает заглушку. Одна граница у корня спасает от белого экрана, но заменяет всю страницу; границы вокруг независимых блоков изолируют сбой одного виджета, а остальные продолжают работать.',
              en: 'A **state machine** describes a screen’s states and allowed transitions. An event missing from the current state’s transition table is simply ignored — the state doesn’t change. An **Error Boundary** catches render errors below it and shows a fallback. One boundary at the root saves you from a blank screen but replaces the whole page; boundaries around independent blocks isolate one widget’s failure while the rest keep working.',
            },
          },
          {
            type: 'illustration',
            illustration: 'arch-upload-machine',
            caption: {
              ru: 'В `uploading` нет перехода по `START`: повторное нажатие не запустит вторую загрузку.',
              en: '`uploading` has no `START` transition: a second tap won’t start another upload.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'machine-unknown-event',
              prompt: {
                ru: 'Автомат в состоянии `done`, и приходит `RETRY`, которого у `done` нет. Что будет?',
                en: 'The machine is in `done` and receives `RETRY`, which `done` doesn’t have. What happens?',
              },
              options: [
                { text: { ru: 'Ошибка', en: 'An error' } },
                { text: { ru: 'Состояние останется `done`', en: 'The state stays `done`' } },
                { text: { ru: 'Переход в `uploading`', en: 'A move to `uploading`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Недопустимые события игнорируются — в этом и ценность автомата: случайный клик не переводит экран в невозможное состояние.',
                en: 'Invalid events are ignored — that’s the value of a state machine: a stray click can’t push the screen into an impossible state.',
              },
            },
          },
        ],
        test: ['arch-frontend-error-boundaries-001'],
      },
    ],
    keyPoints: [
      { ru: 'Импорт только из слоёв ниже, слайсы слоя друг друга не знают.', en: 'Import only from lower layers; slices of a layer don’t know each other.' },
      { ru: 'Наружу — только через `index.ts`.', en: 'Expose only via `index.ts`.' },
      { ru: 'Группировать по фичам, а не по типам файлов.', en: 'Group by feature, not by file type.' },
      { ru: 'Логика — в хуке или модели, отображение — пропсами.', en: 'Logic in a hook or model; rendering via props.' },
      { ru: 'Error Boundary — вокруг каждого независимого блока.', en: 'An Error Boundary around each independent block.' },
    ],
    sources: [
      { title: 'Feature-Sliced Design — Layers', url: `${FSD}/layers` },
      { title: 'Feature-Sliced Design — Public API', url: `${FSD}/public-api` },
      { title: 'Kent C. Dodds — Colocation', url: 'https://kentcdodds.com/blog/colocation' },
      { title: 'React — Error boundaries', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary' },
    ],
  },
  {
    tag: 'arch-dependencies',
    format: 'steps',
    summary: {
      ru: 'Хорошая архитектура — это низкая связанность между модулями и высокая связность внутри них. Внедрение и инверсия зависимостей помогают этого добиться, а версии пакетов делают зависимости предсказуемыми.',
      en: 'Good architecture means low coupling between modules and high cohesion within them. Dependency injection and inversion help get there, and package versions make dependencies predictable.',
    },
    steps: [
      {
        id: 'coupling',
        title: { ru: 'Связанность и связность', en: 'Coupling and cohesion' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Связность (cohesion)** — насколько части модуля работают на одну задачу. **Связанность (coupling)** — насколько модули зависят друг от друга. Цель — высокая связность и низкая связанность: модуль делает одно дело и мало знает о соседях. **Закон Деметры**: обращаться к прямым зависимостям, а не к их внутренностям. Цепочка `user.company.office.address.zip` связывает код с формой четырёх чужих объектов — изменение любого звена его сломает.',
              en: '**Cohesion** is how much a module’s parts serve one task. **Coupling** is how much modules depend on each other. The goal is high cohesion and low coupling: a module does one thing and knows little about its neighbors. **The Law of Demeter**: talk to direct dependencies, not their internals. The chain `user.company.office.address.zip` ties code to the shape of four foreign objects — changing any link breaks it.',
            },
          },
        ],
        test: ['arch-dependencies-coupling-001'],
      },
      {
        id: 'injection',
        title: { ru: 'Внедрение зависимостей', en: 'Dependency injection' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Внедрение зависимостей (DI)**: модуль получает клиент API, хранилище или часы снаружи — параметром, через контекст, — а не создаёт сам. В тесте вместо них передают заглушку, без моков модулей и глобальных переменных. Развитие идеи — «**функциональное ядро, императивная оболочка**»: бизнес-логика — [[pure-function|чистые функции]] от данных, а запросы, хранилище и время живут в тонком внешнем слое, который их вызывает.',
              en: '**Dependency injection (DI)**: a module receives its API client, storage or clock from outside — as a parameter, via context — instead of creating them. Tests pass a stub instead, with no module mocks or globals. The idea grows into “**functional core, imperative shell**”: business logic is [[pure-function|pure functions]] of data, while requests, storage and time live in a thin outer layer that calls them.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const isExpired = (token, now) =>\n  token.expiresAt < now();\n\nisExpired(token, Date.now);\nisExpired(token, () => 0); // test',
            },
          },
        ],
        test: ['arch-dependencies-di-001'],
      },
      {
        id: 'inversion',
        title: { ru: 'Инверсия зависимостей', en: 'Dependency inversion' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Инверсия зависимостей (DIP)**: бизнес-код зависит от собственной абстракции — интерфейса `Storage` или `HttpClient` с нужными ему методами, — а не от конкретной библиотеки. Реализацию создают в одном месте у входа в приложение — **composition root** (`main.ts`, корневой провайдер) — и передают вниз. Сменить библиотеку или добавить общее поведение — правка одного файла, а не каждого модуля.',
              en: '**Dependency inversion (DIP)**: business code depends on its own abstraction — a `Storage` or `HttpClient` interface with the methods it needs — not on a concrete library. The implementation is created in one place at the app’s entry — the **composition root** (`main.ts`, a root provider) — and passed down. Switching the library or adding shared behavior is a one-file change, not an edit in every module.',
            },
          },
          { type: 'illustration', illustration: 'arch-dependency-inversion' },
        ],
        test: ['arch-dependencies-dip-001', 'arch-dependencies-composition-root-001'],
      },
      {
        id: 'hidden-links',
        title: { ru: 'Неявные связи', en: 'Hidden links' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Глобальная шина событий — `events.emit(\'order:paid\')` — убирает прямой импорт между модулями, но связь не исчезает, а прячется. По коду не видно, кто подписан, в каком порядке выполнятся реакции и не опечатались ли в имени события: найти последствия можно только поиском строки по проекту. Прямой вызов или явная подписка на стор видны в IDE и ломаются при компиляции. Шину оставляют для широковещательных событий: выход из аккаунта, смена языка.',
              en: 'A global event bus — `events.emit(\'order:paid\')` — removes the direct import between modules, but the link doesn’t vanish, it hides. The code doesn’t show who’s subscribed, in what order reactions run or whether the event name has a typo: the only way to find the effects is a text search across the project. A direct call or an explicit store subscription shows up in the IDE and breaks at compile time. Keep a bus for broadcasts: logout, language change.',
            },
          },
        ],
        test: ['arch-dependencies-event-bus-001'],
      },
      {
        id: 'packages',
        title: { ru: 'Версии и peer-зависимости', en: 'Versions and peer dependencies' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Semver** — `MAJOR.MINOR.PATCH`. Исправление без изменения API — патч, новая возможность без поломок — минор. Всё, что может сломать потребителя — удалили или переименовали экспорт, изменили сигнатуру, сделали необязательный параметр обязательным, — мажор. Библиотека React-компонентов кладёт `react` в `peerDependencies`: она использует React приложения, иначе в дереве окажутся два экземпляра и хуки упадут с «Invalid hook call».',
              en: '**Semver** is `MAJOR.MINOR.PATCH`. A fix without API changes is a patch; a new feature without breakage is a minor. Anything that may break consumers — removing or renaming an export, changing a signature, making an optional parameter required — is a major. A React component library puts `react` into `peerDependencies`: it uses the app’s React; otherwise the tree gets two copies and hooks fail with “Invalid hook call”.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'text',
              source: '"peerDependencies": {\n  "react": "^18.0.0 || ^19.0.0"\n}',
            },
          },
          {
            type: 'check',
            check: {
              id: 'semver-minor',
              prompt: {
                ru: 'Библиотека 2.4.1 добавила новую необязательную опцию, ничего не сломав. Какой будет следующая версия?',
                en: 'Library 2.4.1 added a new optional setting without breaking anything. What’s the next version?',
              },
              options: [
                { text: { ru: '2.4.2', en: '2.4.2' } },
                { text: { ru: '2.5.0', en: '2.5.0' } },
                { text: { ru: '3.0.0', en: '3.0.0' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Новая возможность без поломок — минорная версия, патч при этом обнуляется.',
                en: 'A new feature without breakage is a minor bump, and the patch resets to zero.',
              },
            },
          },
        ],
        test: ['arch-dependencies-semver-001', 'arch-dependencies-peer-001'],
      },
    ],
    keyPoints: [
      { ru: 'Low coupling, high cohesion.', en: 'Low coupling, high cohesion.' },
      { ru: 'Зависимости — снаружи, а не `new` внутри.', en: 'Dependencies come from outside, not `new` inside.' },
      { ru: 'Свой интерфейс, реализация — в composition root.', en: 'Your own interface; the implementation lives in the composition root.' },
      { ru: 'Шина событий прячет связи, а не убирает их.', en: 'An event bus hides links rather than removing them.' },
      { ru: 'Поломка API — мажорная версия.', en: 'Breaking the API is a major version.' },
    ],
    sources: [
      { title: 'Martin Fowler — Dependency Injection', url: 'https://martinfowler.com/articles/injection.html' },
      { title: 'Wikipedia — Dependency inversion principle', url: `${WIKI}/Dependency_inversion_principle` },
      { title: 'Wikipedia — Law of Demeter', url: `${WIKI}/Law_of_Demeter` },
      { title: 'Semantic Versioning', url: 'https://semver.org/' },
    ],
  },
  {
    tag: 'arch-scale',
    format: 'steps',
    summary: {
      ru: 'Когда растут команда и кодовая база, архитектура решает организационные задачи: как менять общий код, выпускать по частям, переезжать со старого стека и помнить, почему решили именно так. У каждого решения есть цена.',
      en: 'As teams and codebases grow, architecture solves organizational problems: how to change shared code, ship in pieces, move off an old stack and remember why a decision was made. Every solution has a price.',
    },
    steps: [
      {
        id: 'monorepo',
        title: { ru: 'Монорепозиторий', en: 'Monorepo' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В **монорепозитории** приложения и общие библиотеки живут в одном репозитории: поменять библиотеку и всех её потребителей можно одним коммитом и одним ревью. Цена — масштаб: без инструментов CI собирает и тестирует всё на каждый PR. Nx и Turborepo строят граф зависимостей и запускают задачи только для **затронутых** (affected) проектов, а кеш задач пропускает то, чьи входы не изменились.',
              en: 'In a **monorepo** apps and shared libraries live in one repository: you can change a library and all its consumers in one commit and one review. The price is scale: without tooling CI builds and tests everything on every PR. Nx and Turborepo build a dependency graph and run tasks only for **affected** projects, while the task cache skips whatever has unchanged inputs.',
            },
          },
          { type: 'illustration', illustration: 'arch-affected-graph' },
        ],
        test: ['arch-scale-monorepo-001'],
      },
      {
        id: 'design-system',
        title: { ru: 'Дизайн-система и токены', en: 'Design systems and tokens' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Дизайн-система — общие компоненты и правила для всех продуктов команды. Её основа — **дизайн-токены**: именованные решения о цветах, отступах и радиусах. Семантическое имя — `--color-danger`, `--color-surface` — говорит, **зачем** цвет, а не какой он. Тёмная тема и ребрендинг меняют значения токенов в одном месте, а компоненты остаются как есть.',
              en: 'A design system is shared components and rules for all of a team’s products. Its foundation is **design tokens**: named decisions about colors, spacing and radii. A semantic name — `--color-danger`, `--color-surface` — says **why** a color is used, not which one it is. A dark theme or a rebrand changes token values in one place, and components stay as they are.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: ":root {\n  --color-danger: #d92d20;\n}\n[data-theme='dark'] {\n  --color-danger: #f97066;\n}\n.error {\n  color: var(--color-danger);\n}",
            },
          },
        ],
        test: ['arch-scale-tokens-001'],
      },
      {
        id: 'delivery',
        title: { ru: 'Фича-флаги и бюджеты', en: 'Feature flags and budgets' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Большую фичу не держат неделями в отдельной ветке — она копит конфликты. Код вливают в `main` маленькими частями, а незаконченное прячут за **фича-флагом**: включить можно для команды, процента пользователей или стейджа, а после запуска флаг удаляют. Чтобы скорость не таяла незаметно, вводят **бюджет производительности**: лимит размера бандла и метрик в CI, превышение роняет проверку PR.',
              en: 'A big feature isn’t kept for weeks in a separate branch — it piles up conflicts. Code is merged into `main` in small pieces, and unfinished parts hide behind a **feature flag**: it can be on for the team, a percentage of users or staging, and is removed after launch. So that speed doesn’t erode unnoticed, teams set a **performance budget**: a bundle size and metrics limit in CI, and exceeding it fails the PR check.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'budget-exceeded',
              prompt: {
                ru: 'PR добавил 30 КБ, и бандл превысил бюджет. Что произойдёт?',
                en: 'A PR adds 30 KB, and the bundle exceeds its budget. What happens?',
              },
              options: [
                { text: { ru: 'Ничего: бюджет — просто рекомендация', en: 'Nothing: a budget is just advice' } },
                { text: { ru: 'Проверка в CI упадёт — рост станет явным решением', en: 'The CI check fails — growth becomes an explicit decision' } },
                { text: { ru: 'Сборщик сам удалит лишний код', en: 'The bundler removes extra code by itself' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Смысл бюджета — сделать рост видимым: команда либо оптимизирует, либо осознанно поднимает лимит.',
                en: 'A budget exists to make growth visible: the team either optimizes or consciously raises the limit.',
              },
            },
          },
        ],
        test: ['arch-scale-feature-flags-001'],
      },
      {
        id: 'migration',
        title: { ru: 'Миграция и микрофронтенды', en: 'Migration and micro-frontends' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Переписывать всё с нуля, заморозив фичи, рискованно. Подход **Strangler Fig** («душащая смоковница»): новые и переделанные экраны делают на новом стеке рядом со старыми и переключают на них маршруты по одному. **Микрофронтенды** — части продукта с независимыми релизами. Они решают организационную задачу: много автономных команд выкатываются отдельно. Цена — дубли зависимостей, сложная сборка, разнобой в интерфейсе; одной-двум командам обычно хватает модульного монолита.',
              en: 'Rewriting everything from scratch with a feature freeze is risky. The **Strangler Fig** approach: new and reworked screens are built on the new stack next to the old ones, and routes switch over one at a time. **Micro-frontends** are product parts with independent releases. They solve an organizational problem: many autonomous teams shipping separately. The price is duplicated dependencies, complex builds and inconsistent UI; one or two teams usually do fine with a modular monolith.',
            },
          },
          { type: 'diagram', diagram: 'arch-strangler' },
        ],
        test: ['arch-scale-strangler-001', 'arch-scale-microfrontends-001'],
      },
      {
        id: 'decisions',
        title: { ru: 'Записи о решениях', en: 'Decision records' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**ADR** (Architecture Decision Record) — короткий файл в репозитории о важном решении: контекст и проблема, рассмотренные варианты, выбранный и его последствия. Код показывает, **что** сделано, ADR — **почему**. Через год новый человек не будет гадать, случайность это или осознанный выбор, и сможет пересмотреть решение, если изменились условия.',
              en: 'An **ADR** (Architecture Decision Record) is a short file in the repo about an important decision: the context and problem, the options considered, the chosen one and its consequences. Code shows **what** was done; an ADR shows **why**. A year later a newcomer won’t have to guess whether it was an accident or a deliberate choice, and can revisit it if the conditions change.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'text',
              source: '# 0007. Validate API with zod\nStatus: accepted\nContext: backend fields change\nOptions: types only, zod, io-ts\nDecision: zod at the boundary\nConsequences: +12 KB bundle',
            },
          },
        ],
        test: ['arch-scale-adr-001'],
      },
    ],
    keyPoints: [
      { ru: 'Монорепо — атомарные изменения + affected-сборки.', en: 'Monorepo — atomic changes + affected builds.' },
      { ru: 'Токены описывают смысл, а не значение.', en: 'Tokens describe meaning, not value.' },
      { ru: 'Незаконченное — за флагом, рост бандла — под бюджетом.', en: 'Unfinished work behind a flag; bundle growth under a budget.' },
      { ru: 'Миграция — маршрут за маршрутом.', en: 'Migrate route by route.' },
      { ru: 'Микрофронтенды решают оргзадачу, а не техническую.', en: 'Micro-frontends solve an org problem, not a technical one.' },
    ],
    sources: [
      { title: 'monorepo.tools', url: 'https://monorepo.tools/' },
      { title: 'Martin Fowler — Strangler Fig Application', url: 'https://martinfowler.com/bliki/StranglerFigApplication.html' },
      { title: 'Martin Fowler — Micro Frontends', url: 'https://martinfowler.com/articles/micro-frontends.html' },
      { title: 'ADR GitHub organization', url: 'https://adr.github.io/' },
    ],
  },
  {
    tag: 'arch-data',
    format: 'steps',
    summary: {
      ru: 'Слой данных отделяет интерфейс от бэкенда: запросы, проверка контракта, преобразование форматов, ошибки и повторы живут в одном месте, а компоненты получают готовые модели.',
      en: 'The data layer separates the UI from the backend: requests, contract checks, format conversion, errors and retries live in one place, and components get ready models.',
    },
    steps: [
      {
        id: 'contract',
        title: { ru: 'Контракт на границе', en: 'The contract at the boundary' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Типы TypeScript исчезают после сборки и ничего не проверяют во время работы. Поэтому ответ API проверяют схемой (zod, valibot) сразу при получении: если бэкенд переименует поле или пришлёт `null`, ошибка будет понятной и случится на границе, а не превратится в `undefined` глубоко в рендере. Если бэкенд публикует спецификацию OpenAPI, из неё генерируют типы и клиент — один источник правды: изменение контракта сразу видно как ошибка компиляции.',
              en: 'TypeScript types vanish after the build and check nothing at runtime. So an API response is validated with a schema (zod, valibot) right on arrival: if the backend renames a field or sends `null`, the error is clear and happens at the boundary instead of becoming `undefined` deep in rendering. If the backend publishes an OpenAPI spec, types and a client are generated from it — a single source of truth: a contract change shows up as a compile error right away.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'types-runtime',
              prompt: {
                ru: 'Почему одних типов TypeScript мало, чтобы доверять ответу API?',
                en: 'Why aren’t TypeScript types alone enough to trust an API response?',
              },
              options: [
                { text: { ru: 'Типы исчезают после сборки и не проверяют данные во время работы', en: 'Types vanish after the build and don’t check data at runtime' } },
                { text: { ru: 'TypeScript не поддерживает `null`', en: 'TypeScript doesn’t support `null`' } },
                { text: { ru: 'Типы замедляют запросы', en: 'Types slow requests down' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Тип — обещание для компилятора. Что на самом деле пришло по сети, проверяет только код, который выполняется в рантайме, — например, схема.',
                en: 'A type is a promise to the compiler. Only code that runs at runtime — such as a schema — checks what actually came over the network.',
              },
            },
          },
        ],
        test: ['arch-data-validation-001'],
      },
      {
        id: 'adapter',
        title: { ru: 'Адаптер к модели', en: 'An adapter to the model' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'После проверки **адаптер** превращает формат бэкенда в модель интерфейса: `snake_case` — в `camelCase`, строки дат — в `Date`, вложенные структуры — в удобные поля. Преобразование живёт в одном месте слоя данных, а компоненты не знают, как устроен ответ: если бэкенд переименует поле, правка будет одна.',
              en: 'After validation an **adapter** turns the backend format into the UI model: `snake_case` into `camelCase`, date strings into `Date`, nested structures into convenient fields. The conversion lives in one place in the data layer, and components don’t know the response format: if the backend renames a field, there’s one fix.',
            },
          },
          { type: 'diagram', diagram: 'arch-data-boundary' },
        ],
        test: ['arch-patterns-adapter-001'],
      },
      {
        id: 'errors',
        title: { ru: 'Где обрабатывать ошибки', en: 'Where to handle errors' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Сквозные ошибки одинаковы для всего приложения: 401 — выход, 5xx и сбой сети — уведомление. Их обрабатывают один раз в HTTP-слое: перехватчик, обёртка над `fetch`. Доменные — «email уже занят» — показывают там, где пользователь может их исправить: у поля формы. Ожидаемые ошибки удобно возвращать значением, а не бросать: `{ ok: true, value }` или `{ ok: false, error }` — тогда вызывающий код обязан проверить `ok`.',
              en: 'Cross-cutting errors are the same app-wide: 401 means logout, 5xx and network failures mean a notification. They’re handled once in the HTTP layer: an interceptor or a `fetch` wrapper. Domain errors — “email already taken” — are shown where the user can fix them: next to the form field. Expected errors are best returned as values rather than thrown: `{ ok: true, value }` or `{ ok: false, error }` — then the caller must check `ok`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const parsePort = (text) => {\n  const port = Number(text);\n  return port > 0 && port < 65536\n    ? { ok: true, value: port }\n    : { ok: false, error: 'bad port' };\n};",
            },
          },
        ],
        test: ['arch-data-errors-001'],
      },
      {
        id: 'retries',
        title: { ru: 'Повторы без вреда', en: 'Safe retries' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Повторять упавший запрос сразу и часто — значит добивать перегруженный сервер. **Экспоненциальная задержка** удваивает паузу после каждой неудачи, потолок не даёт ждать бесконечно, а **джиттер** — случайный разброс — не даёт клиентам повторять хором. Повтор безопасен, только если операция [[idempotent|идемпотентна]]. Для оплаты клиент создаёт ключ идемпотентности на попытку и шлёт его в заголовке: сервер по знакомому ключу вернёт прежний результат.',
              en: 'Retrying a failed request immediately and often just hammers an overloaded server. **Exponential backoff** doubles the pause after each failure, a ceiling keeps the wait bounded, and **jitter** — random spread — stops clients retrying in unison. A retry is safe only if the operation is [[idempotent|idempotent]]. For a payment the client creates an idempotency key per attempt and sends it in a header: on a known key the server returns the earlier result.',
            },
          },
          { type: 'illustration', illustration: 'arch-backoff' },
        ],
        test: ['arch-data-backoff-001', 'arch-data-idempotency-001'],
      },
      {
        id: 'pagination',
        title: { ru: 'Курсорная пагинация', en: 'Cursor pagination' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Пагинация через `offset` считает позиции от начала списка. Если, пока пользователь листает, сверху добавились записи, следующая страница сдвинется и покажет уже виденное, а после удалений — пропустит записи. **Курсорная пагинация** привязана к конкретной записи: «дай 20 записей после id 812». Новые записи сверху её не сдвигают, поэтому ленты с бесконечной прокруткой используют курсоры.',
              en: 'Pagination via `offset` counts positions from the start of the list. If records are added on top while the user scrolls, the next page shifts and shows what was already seen, and after deletions it skips records. **Cursor pagination** is anchored to a specific record: “give me 20 records after id 812”. New records on top don’t shift it, so infinite-scroll feeds use cursors.',
            },
          },
          { type: 'illustration', illustration: 'arch-offset-cursor' },
        ],
        test: ['arch-data-cursor-pagination-001'],
      },
      {
        id: 'bff',
        title: { ru: 'Backend for Frontend', en: 'Backend for Frontend' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**BFF** (Backend for Frontend) — отдельный серверный слой под конкретный клиент, который принадлежит команде этого клиента. Он ходит в несколько сервисов, отбрасывает лишние поля и отдаёт экрану ровно нужное одним запросом — особенно важно для мобильного приложения на медленной сети. Роль BFF часто играют Route Handlers Next.js и [[rsc|серверные компоненты]]. Цена — ещё один сервис, который нужно поддерживать.',
              en: 'A **BFF** (Backend for Frontend) is a separate server layer for a specific client, owned by that client’s team. It calls several services, drops extra fields and returns exactly what a screen needs in one request — especially important for a mobile app on a slow network. Next.js Route Handlers and [[rsc|Server Components]] often play the BFF role. The price is one more service to maintain.',
            },
          },
        ],
        test: ['arch-data-bff-001'],
      },
    ],
    keyPoints: [
      { ru: 'Проверять контракт на границе.', en: 'Validate the contract at the boundary.' },
      { ru: 'Адаптер прячет формат бэкенда от компонентов.', en: 'An adapter hides the backend format from components.' },
      { ru: 'Сквозные ошибки — в HTTP-слое, доменные — у формы.', en: 'Cross-cutting errors in the HTTP layer; domain errors by the form.' },
      { ru: 'Повторы — с задержкой и ключом идемпотентности.', en: 'Retries — with backoff and an idempotency key.' },
      { ru: 'Лента — курсор, а не `offset`.', en: 'Feeds use a cursor, not `offset`.' },
    ],
    sources: [
      { title: 'Zod', url: 'https://zod.dev/' },
      { title: 'Refactoring.Guru — Adapter', url: `${GURU}/adapter` },
      { title: 'Stripe — Idempotent requests', url: 'https://docs.stripe.com/api/idempotent_requests' },
      { title: 'Sam Newman — Backends For Frontends', url: 'https://samnewman.io/patterns/architectural/bff/' },
    ],
  },
];
