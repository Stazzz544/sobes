import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';

export const JAVASCRIPT_LESSONS: Lesson[] = [
  {
    tag: 'closures',
    format: 'steps',
    summary: {
      ru: 'Замыкание — функция вместе с окружением, где она создана. На замыканиях держатся счётчики, приватное состояние, `debounce`, каррирование и обработчики событий.',
      en: 'A closure is a function together with the environment where it was created. Counters, private state, `debounce`, currying and event handlers all rely on closures.',
    },
    steps: [
      {
        id: 'definition',
        title: { ru: 'Что такое замыкание', en: 'What a closure is' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '[[closure|Замыкание]] — функция плюс ссылка на [[lexical-environment|лексическое окружение]], в котором её создали. Функция видит внешние переменные даже после того, как внешняя функция завершилась. Важно: хранится **ссылка** на переменные, а не копия значений, поэтому функция видит их актуальное состояние на момент вызова.',
              en: 'A [[closure|closure]] is a function plus a reference to the [[lexical-environment|lexical environment]] it was created in. The function sees outer variables even after the outer function has returned. Crucially, it keeps a **reference** to the variables, not a copy of their values, so it sees their current state at call time.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "function greeter(greeting) {\n  return (who) => `${greeting}, ${who}`;\n}\nconst hello = greeter('Hello');\nhello('Ann'); // 'Hello, Ann'",
            },
          },
        ],
        test: ['js-closures-003'],
      },
      {
        id: 'factories',
        title: { ru: 'Каждый вызов — своё окружение', en: 'Each call, its own environment' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Каждый вызов внешней функции создаёт **новое** окружение со своими переменными. Две функции, полученные из двух вызовов фабрики, не делят состояние: изменения одной не видны другой. А функции, созданные в одном вызове, наоборот, делят одно окружение.',
              en: 'Each call of the outer function creates a **new** environment with its own variables. Two functions from two factory calls don’t share state: one’s changes are invisible to the other. Functions created in the same call, on the other hand, share one environment.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'function makeId(prefix) {\n  let next = 0;\n  return () => `${prefix}-${++next}`;\n}\nconst userId = makeId(\'user\');\nconst postId = makeId(\'post\');\nuserId(); userId(); // user-2\npostId(); // post-1',
            },
          },
        ],
        test: ['js-closures-002'],
      },
      {
        id: 'private-state',
        title: { ru: 'Приватное состояние', en: 'Private state' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Переменная из окружения фабрики недоступна снаружи — до неё можно добраться только через функции, которые её замкнули. Это классический способ спрятать состояние: объект отдаёт методы, а сами данные лежат в замыкании. Присваивание свойства с тем же именем объекту создаёт новое свойство и на скрытую переменную не влияет.',
              en: 'A variable from the factory’s environment is inaccessible from outside — you can reach it only through the functions that closed over it. It’s the classic way to hide state: an object exposes methods while the data lives in the closure. Assigning a same-named property on the object creates a new property and doesn’t touch the hidden variable.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'closure-reference',
              prompt: {
                ru: 'Функция замкнула переменную, а потом переменную изменили снаружи функции. Что увидит функция при следующем вызове?',
                en: 'A function closed over a variable, then the variable was changed outside the function. What will the function see on its next call?',
              },
              options: [
                { text: { ru: 'Старое значение — оно скопировано при создании', en: 'The old value — it was copied at creation' } },
                { text: { ru: 'Новое значение — замыкание хранит ссылку на переменную', en: 'The new value — a closure keeps a reference to the variable' } },
                { text: { ru: 'Ошибку', en: 'An error' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Замыкание держит само окружение, а не снимок значений.',
                en: 'A closure holds the environment itself, not a snapshot of values.',
              },
            },
          },
        ],
        test: ['js-closures-005'],
      },
      {
        id: 'utilities',
        title: { ru: 'debounce, throttle, curry', en: 'debounce, throttle, curry' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Debounce** откладывает вызов, пока события не затихнут на заданное время: каждый новый вызов сбрасывает таймер, который живёт в замыкании **снаружи** возвращаемой функции. **Throttle** вызывает функцию не чаще раза за интервал. **Каррирование** копит аргументы в замыкании: пока их меньше, чем `fn.length`, возвращается новая функция, иначе вызывается исходная.',
              en: '**Debounce** delays the call until events go quiet for a given time: each new call resets a timer that lives in the closure **outside** the returned function. **Throttle** calls the function at most once per interval. **Currying** accumulates arguments in a closure: while there are fewer than `fn.length`, a new function is returned; otherwise the original is called.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'function throttle(fn, ms) {\n  let last = 0;\n  return (...args) => {\n    const now = Date.now();\n    if (now - last < ms) return;\n    last = now;\n    fn(...args);\n  };\n}',
            },
          },
        ],
        test: ['js-closures-004', 'js-live-debounce-001'],
      },
    ],
    keyPoints: [
      { ru: 'Замыкание хранит ссылку на окружение, а не копию.', en: 'A closure keeps a reference to the environment, not a copy.' },
      { ru: 'Каждый вызов фабрики — новое окружение.', en: 'Each factory call creates a new environment.' },
      { ru: 'Замыкание прячет состояние от внешнего кода.', en: 'A closure hides state from outside code.' },
      { ru: 'Таймер `debounce` живёт снаружи возвращаемой функции.', en: 'The `debounce` timer lives outside the returned function.' },
    ],
    sources: [
      { title: 'MDN — Closures', url: `${MDN}/Guide/Closures` },
      { title: 'MDN — Debounce', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Debounce' },
      { title: 'MDN — Throttle', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Throttle' },
    ],
  },  {
    tag: 'event-loop',
    format: 'steps',
    summary: {
      ru: 'JavaScript выполняет код в одном потоке, а асинхронные колбэки ждут в очередях. Порядок, в котором цикл событий берёт задачи из очередей, — один из самых частых вопросов на собеседовании.',
      en: 'JavaScript runs code on a single thread while async callbacks wait in queues. The order in which the event loop takes tasks from the queues is one of the most common interview questions.',
    },
    steps: [
      {
        id: 'queues',
        title: { ru: 'Стек и две очереди', en: 'The stack and two queues' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Сначала выполняется весь синхронный код в **стеке вызовов**. Асинхронные колбэки ждут в очередях: `.then`, `await`, `queueMicrotask` — в очереди [[microtask|микрозадач]], `setTimeout`, события, сетевые ответы — в очереди макрозадач. Когда стек опустел, [[event-loop|цикл событий]] выполняет **все** микрозадачи и только потом берёт **одну** макрозадачу. Поэтому `.then` срабатывает раньше `setTimeout(…, 0)`.',
              en: 'First all synchronous code runs on the **call stack**. Async callbacks wait in queues: `.then`, `await` and `queueMicrotask` go to the [[microtask|microtask]] queue; `setTimeout`, events and network responses to the macrotask queue. When the stack is empty the [[event-loop|event loop]] runs **all** microtasks and only then takes **one** macrotask. That’s why `.then` fires before `setTimeout(…, 0)`.',
            },
          },
          { type: 'diagram', diagram: 'js-loop-queues' },
        ],
        test: ['js-event-loop-001', 'js-event-loop-order-001'],
      },
      {
        id: 'drain',
        title: { ru: 'Микрозадачи до конца', en: 'Microtasks to the end' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Очередь микрозадач опустошается **целиком**, включая микрозадачи, добавленные во время её обработки: они встают в конец этой же очереди и выполнятся до любой макрозадачи. Таймер, поставленный из микрозадачи, встанет в конец очереди макрозадач — после уже ждущих таймеров.',
              en: 'The microtask queue is drained **completely**, including microtasks added while it’s being processed: they join the end of the same queue and run before any macrotask. A timer set from a microtask joins the end of the macrotask queue — after the timers already waiting.',
            },
          },
        ],
        test: ['js-event-loop-002'],
      },
      {
        id: 'starvation',
        title: { ru: 'Когда страница зависает', en: 'When the page freezes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Отрисовка кадра и обработка кликов — это работа между макрозадачами. Если микрозадачи бесконечно ставят новые микрозадачи, очередь никогда не опустеет: браузер не отрисует кадр, не возьмёт ни одной макрозадачи, и страница зависнет. Долгий синхронный код делает то же самое. Тяжёлую работу дробят на части через `setTimeout` или выносят в Web Worker.',
              en: 'Rendering a frame and handling clicks happen between macrotasks. If microtasks endlessly queue new microtasks, the queue never empties: the browser renders no frame, takes no macrotask, and the page freezes. Long synchronous code does the same. Heavy work is split into chunks with `setTimeout` or moved to a Web Worker.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'render-between',
              prompt: {
                ru: 'Когда браузер может отрисовать новый кадр?',
                en: 'When can the browser render a new frame?',
              },
              options: [
                { text: { ru: 'В любой момент, даже посреди синхронного кода', en: 'Any time, even in the middle of synchronous code' } },
                { text: { ru: 'Когда стек пуст и очередь микрозадач опустошена', en: 'When the stack is empty and the microtask queue is drained' } },
                { text: { ru: 'Только после всех макрозадач', en: 'Only after all macrotasks' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Отрисовка встаёт между задачами. Пока выполняется код или микрозадачи, кадр ждёт.',
                en: 'Rendering fits between tasks. While code or microtasks run, the frame waits.',
              },
            },
          },
        ],
        test: ['js-event-loop-003'],
      },
      {
        id: 'async-await',
        title: { ru: 'async и await в очередях', en: 'async and await in the queues' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Async-функция выполняется **синхронно** до первого `await`: её код до него — обычный синхронный код. `await` приостанавливает функцию, а её продолжение встаёт в очередь микрозадач, когда ожидаемый промис выполнится. Вызванная внутри другая async-функция тоже выполняется синхронно до своего первого `await`. Пока функция ждёт, выполняется код, который её вызвал.',
              en: 'An async function runs **synchronously** until its first `await`: the code before it is ordinary synchronous code. `await` suspends the function, and its continuation joins the microtask queue once the awaited promise settles. Another async function called inside also runs synchronously until its own first `await`. While the function waits, the code that called it keeps running.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "async function load() {\n  log('start');\n  await fetchData();\n  log('done'); // microtask\n}\nload();\nlog('after call');\n// start, after call, done",
            },
          },
        ],
        test: ['js-event-loop-004'],
      },
    ],
    keyPoints: [
      { ru: 'Синхронный код → все микрозадачи → одна макрозадача.', en: 'Sync code → all microtasks → one macrotask.' },
      { ru: '`.then` раньше `setTimeout(…, 0)`.', en: '`.then` runs before `setTimeout(…, 0)`.' },
      { ru: 'Бесконечные микрозадачи вешают страницу.', en: 'Endless microtasks freeze the page.' },
      { ru: 'Async-функция синхронна до первого `await`.', en: 'An async function is synchronous until its first `await`.' },
    ],
    sources: [
      { title: 'MDN — The event loop', url: `${MDN}/Event_loop` },
      { title: 'MDN — Using microtasks', url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide' },
      { title: 'Jake Archibald — Tasks, microtasks, queues and schedules', url: 'https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/' },
    ],
  },  {
    tag: 'this',
    format: 'steps',
    summary: {
      ru: '`this` в JavaScript зависит не от того, где функция объявлена, а от того, как её вызвали. Разберём правила вызова, стрелочные функции, `bind` и типичные ловушки с обработчиками.',
      en: 'In JavaScript `this` depends not on where a function is declared but on how it’s called. We’ll cover call rules, arrow functions, `bind` and the typical handler traps.',
    },
    steps: [
      {
        id: 'call-site',
        title: { ru: 'this определяется вызовом', en: 'The call determines this' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'При вызове `obj.method()` внутри метода `this === obj` — объект слева от точки. Если метод извлечь в переменную или передать как колбэк и вызвать без объекта, `this` будет `undefined` в строгом режиме (тела классов и модули — всегда строгие) и чтение `this.x` бросит `TypeError`. Связь метода с объектом существует только в момент вызова через точку.',
              en: 'When calling `obj.method()`, inside the method `this === obj` — the object left of the dot. If you extract the method into a variable or pass it as a callback and call it without an object, `this` is `undefined` in strict mode (class bodies and modules are always strict), and reading `this.x` throws a `TypeError`. The method is tied to the object only at the moment of a dotted call.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "'use strict';\nconst user = {\n  name: 'Ann',\n  hi() { return this.name; },\n};\nuser.hi(); // 'Ann'\nconst hi = user.hi;\nhi(); // TypeError",
            },
          },
        ],
        test: ['js-this-001', 'js-this-005'],
      },
      {
        id: 'arrows',
        title: { ru: 'Стрелочные функции', en: 'Arrow functions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'У стрелочной функции **нет своего** `this`: она берёт его из места, где создана, — как обычную внешнюю переменную. Поэтому стрелка внутри метода видит `this` метода, а поле-стрелка в классе (`handle = () => {}`) привязано к экземпляру и не теряет `this` при передаче. У обычного метода класса `this` по-прежнему зависит от вызова. Некоторые методы, например `forEach`, принимают `this` для колбэка вторым аргументом.',
              en: 'An arrow function has **no `this` of its own**: it takes it from where it was created — like an ordinary outer variable. So an arrow inside a method sees the method’s `this`, and an arrow class field (`handle = () => {}`) is bound to the instance and keeps `this` when passed around. A regular class method’s `this` still depends on the call. Some methods, like `forEach`, take the callback’s `this` as a second argument.',
            },
          },
        ],
        test: ['js-this-002'],
      },
      {
        id: 'bind-call',
        title: { ru: 'call, apply и bind', en: 'call, apply and bind' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`fn.call(obj, a, b)` и `fn.apply(obj, [a, b])` вызывают функцию сразу с указанным `this`. `fn.bind(obj)` возвращает **новую** функцию с навсегда зафиксированным `this`. Переопределить его через `call`, `apply` или повторный `bind` уже нельзя — они меняют только аргументы. Исключение — вызов связанной функции через `new`.',
              en: '`fn.call(obj, a, b)` and `fn.apply(obj, [a, b])` call the function right away with the given `this`. `fn.bind(obj)` returns a **new** function with `this` fixed forever. `call`, `apply` or another `bind` can no longer override it — they change only the arguments. The exception is calling a bound function with `new`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'double-bind',
              prompt: {
                ru: 'Чему будет равен `this` в `fn.bind(a).bind(b)()`?',
                en: 'What is `this` in `fn.bind(a).bind(b)()`?',
              },
              options: [
                { text: { ru: '`a`', en: '`a`' } },
                { text: { ru: '`b`', en: '`b`' } },
                { text: { ru: '`undefined`', en: '`undefined`' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Первый `bind` фиксирует `this` навсегда, второй его уже не меняет.',
                en: 'The first `bind` fixes `this` for good; the second can’t change it.',
              },
            },
          },
        ],
        test: ['js-this-003'],
      },
      {
        id: 'wrappers',
        title: { ru: 'this в обёртках', en: 'this in wrappers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Обёртки вокруг слушателей и колбэков часто пишут стрелками именно из-за `this`: стрелка внутри метода видит `this` метода, а обычная `function wrapper` получила бы свой `this` от вызова. Ещё одна деталь: чтобы потом отписаться, нужно хранить ссылку именно на ту функцию, которую подписали, — на обёртку, а не на исходный слушатель.',
              en: 'Wrappers around listeners and callbacks are often written as arrows precisely because of `this`: an arrow inside a method sees the method’s `this`, while a regular `function wrapper` would get its own `this` from the call. Another detail: to unsubscribe later, keep a reference to exactly the function you subscribed — the wrapper, not the original listener.',
            },
          },
        ],
        test: ['js-live-once-001'],
      },
    ],
    keyPoints: [
      { ru: '`this` — объект слева от точки в момент вызова.', en: '`this` is the object left of the dot at call time.' },
      { ru: 'Извлечённый метод теряет `this`.', en: 'An extracted method loses `this`.' },
      { ru: 'Стрелка берёт `this` снаружи.', en: 'An arrow takes `this` from outside.' },
      { ru: '`bind` фиксирует `this` навсегда.', en: '`bind` fixes `this` for good.' },
    ],
    sources: [
      { title: 'MDN — this', url: `${MDN}/Reference/Operators/this` },
      { title: 'MDN — Function.prototype.bind()', url: `${MDN}/Reference/Global_Objects/Function/bind` },
      { title: 'MDN — Arrow function expressions', url: `${MDN}/Reference/Functions/Arrow_functions` },
    ],
  },
];
