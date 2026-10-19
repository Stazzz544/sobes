import type { LocalizedText } from '@app/shared/i18n';
import type { Diagram, DiagramId, DiagramItem, DiagramLane, DiagramStep } from '../model/types';

type EventLoopState = {
  stack?: DiagramItem[];
  micro?: DiagramItem[];
  macro?: DiagramItem[];
  output?: string[];
};

const code = (id: string, label: string): DiagramItem => ({ id, label, isCode: true });

const eventLoopStep = (caption: LocalizedText, state: EventLoopState): DiagramStep => ({
  caption,
  lanes: [
    { id: 'stack', title: { ru: 'Стек вызовов', en: 'Call stack' }, tone: 'accent', items: state.stack ?? [] },
    { id: 'micro', title: { ru: 'Микрозадачи', en: 'Microtasks' }, tone: 'success', items: state.micro ?? [] },
    { id: 'macro', title: { ru: 'Макрозадачи', en: 'Tasks' }, tone: 'warning', items: state.macro ?? [] },
    {
      id: 'console',
      title: { ru: 'Консоль', en: 'Console' },
      tone: 'neutral',
      items: (state.output ?? []).map((value) => code(`out-${value}`, value)),
    },
  ],
});

type ChainNode = Omit<DiagramLane, 'isActive'>;

const chainSteps = (nodes: ChainNode[], steps: { activeId: string; caption: LocalizedText }[]): DiagramStep[] =>
  steps.map(({ activeId, caption }) => ({
    caption,
    lanes: nodes.map((node) => ({ ...node, isActive: node.id === activeId })),
  }));

const EVENT_LOOP_BASIC: Diagram = {
  id: 'event-loop-basic',
  layout: 'columns',
  steps: [
    eventLoopStep(
      {
        ru: 'Синхронный код выполняется сразу: `console.log(\'1\')` попадает в стек и печатает 1.',
        en: 'Synchronous code runs right away: `console.log(\'1\')` goes onto the stack and prints 1.',
      },
      { stack: [code('log1', "log('1')")], output: ['1'] },
    ),
    eventLoopStep(
      {
        ru: '`setTimeout` регистрирует таймер — колбэк встаёт в очередь макрозадач.',
        en: '`setTimeout` registers a timer — its callback is queued as a task.',
      },
      { stack: [code('timeout', 'setTimeout(…)')], macro: [code('cb2', "() => log('2')")], output: ['1'] },
    ),
    eventLoopStep(
      {
        ru: '`Promise.resolve().then` ставит колбэк в очередь микрозадач.',
        en: '`Promise.resolve().then` queues its callback as a microtask.',
      },
      {
        stack: [code('then', '.then(…)')],
        micro: [code('cb3', "() => log('3')")],
        macro: [code('cb2', "() => log('2')")],
        output: ['1'],
      },
    ),
    eventLoopStep(
      {
        ru: '`console.log(\'4\')` — последняя синхронная строка.',
        en: '`console.log(\'4\')` is the last synchronous line.',
      },
      {
        stack: [code('log4', "log('4')")],
        micro: [code('cb3', "() => log('3')")],
        macro: [code('cb2', "() => log('2')")],
        output: ['1', '4'],
      },
    ),
    eventLoopStep(
      {
        ru: 'Стек опустел. Сначала выполняются **все** микрозадачи — печатается 3.',
        en: 'The stack is empty. **All** microtasks run first — 3 is printed.',
      },
      { stack: [code('log3', "log('3')")], macro: [code('cb2', "() => log('2')")], output: ['1', '4', '3'] },
    ),
    eventLoopStep(
      {
        ru: 'Микрозадач больше нет — event loop берёт следующую макрозадачу и печатает 2.',
        en: 'No microtasks left — the event loop takes the next task and prints 2.',
      },
      { stack: [code('log2', "log('2')")], output: ['1', '4', '3', '2'] },
    ),
  ],
};

const EVENT_LOOP_ASYNC: Diagram = {
  id: 'event-loop-async',
  layout: 'columns',
  steps: [
    eventLoopStep(
      {
        ru: '`run()` выполняется синхронно до первого `await` — печатается A.',
        en: '`run()` runs synchronously until its first `await` — A is printed.',
      },
      { stack: [code('run', 'run()')], output: ['A'] },
    ),
    eventLoopStep(
      {
        ru: '`await null` приостанавливает `run`: продолжение функции встаёт в очередь микрозадач.',
        en: '`await null` suspends `run`: the rest of the function is queued as a microtask.',
      },
      { micro: [code('resume', 'run() ⏵ B')], output: ['A'] },
    ),
    eventLoopStep(
      {
        ru: '`.then` добавляет колбэк с C в **конец** очереди микрозадач.',
        en: '`.then` adds the C callback to the **end** of the microtask queue.',
      },
      { stack: [code('then', '.then(…)')], micro: [code('resume', 'run() ⏵ B'), code('cbC', "() => log('C')")], output: ['A'] },
    ),
    eventLoopStep(
      {
        ru: 'Последняя синхронная строка печатает D.',
        en: 'The last synchronous line prints D.',
      },
      {
        stack: [code('logD', "log('D')")],
        micro: [code('resume', 'run() ⏵ B'), code('cbC', "() => log('C')")],
        output: ['A', 'D'],
      },
    ),
    eventLoopStep(
      {
        ru: 'Микрозадачи выполняются по порядку: сначала продолжение `run` — B.',
        en: 'Microtasks run in order: first the rest of `run` — B.',
      },
      { stack: [code('runB', "log('B')")], micro: [code('cbC', "() => log('C')")], output: ['A', 'D', 'B'] },
    ),
    eventLoopStep(
      {
        ru: 'Затем колбэк `.then` — C.',
        en: 'Then the `.then` callback — C.',
      },
      { stack: [code('logC', "log('C')")], output: ['A', 'D', 'B', 'C'] },
    ),
  ],
};

const PROTOTYPE_CHAIN: Diagram = {
  id: 'prototype-chain',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'dog', title: 'dog', tone: 'accent', items: [code('name', "name: 'Rex'")] },
      { id: 'animal', title: 'Animal.prototype', tone: 'success', items: [code('speak', 'speak()'), code('ctor', 'constructor')] },
      {
        id: 'object',
        title: 'Object.prototype',
        tone: 'warning',
        items: [code('tostring', 'toString()'), code('hasown', 'hasOwnProperty()')],
      },
      { id: 'null', title: 'null', tone: 'neutral', items: [] },
    ],
    [
      {
        activeId: 'dog',
        caption: {
          ru: 'Вызов `dog.speak()`: сначала свойство ищется в самом объекте. Там только `name`.',
          en: 'Calling `dog.speak()`: the property is looked up on the object itself first. It only has `name`.',
        },
      },
      {
        activeId: 'animal',
        caption: {
          ru: 'Не нашли — идём по ссылке `[[Prototype]]` в `Animal.prototype`. Здесь есть `speak`.',
          en: 'Not found — follow the `[[Prototype]]` link to `Animal.prototype`. `speak` is here.',
        },
      },
      {
        activeId: 'object',
        caption: {
          ru: '`dog.toString()` нашёлся бы ещё выше — в `Object.prototype`.',
          en: '`dog.toString()` would be found even higher — in `Object.prototype`.',
        },
      },
      {
        activeId: 'null',
        caption: {
          ru: 'Цепочка заканчивается на `null`. Свойства нет нигде — результат `undefined`.',
          en: 'The chain ends at `null`. If the property isn’t found anywhere, the result is `undefined`.',
        },
      },
    ],
  ),
};

const counterLanes = (first: number, second: number, output: string[]): DiagramLane[] => [
  {
    id: 'first',
    title: { ru: 'Окружение first', en: 'first’s environment' },
    tone: 'accent',
    items: [code(`first-${first}`, `count = ${first}`)],
  },
  {
    id: 'second',
    title: { ru: 'Окружение second', en: 'second’s environment' },
    tone: 'success',
    items: [code(`second-${second}`, `count = ${second}`)],
  },
  {
    id: 'console',
    title: { ru: 'Консоль', en: 'Console' },
    tone: 'neutral',
    items: output.map((value, index) => code(`out-${index}`, value)),
  },
];

const CLOSURE_COUNTERS: Diagram = {
  id: 'closure-counters',
  layout: 'columns',
  steps: [
    {
      caption: {
        ru: '`makeCounter()` вызвана дважды — создано два независимых окружения, в каждом свой `count = 0`.',
        en: '`makeCounter()` was called twice — two independent environments, each with its own `count = 0`.',
      },
      lanes: counterLanes(0, 0, []),
    },
    {
      caption: {
        ru: '`first()` выполняет `++count` — меняется только окружение `first`.',
        en: '`first()` runs `++count` — only `first`’s environment changes.',
      },
      lanes: counterLanes(1, 0, []),
    },
    {
      caption: {
        ru: 'Ещё один вызов `first()`.',
        en: 'Another `first()` call.',
      },
      lanes: counterLanes(2, 0, []),
    },
    {
      caption: {
        ru: '`console.log(first(), second())` печатает 3 и 1: у каждой функции свой счётчик.',
        en: '`console.log(first(), second())` prints 3 and 1: each function has its own counter.',
      },
      lanes: counterLanes(3, 1, ['3', '1']),
    },
  ],
};

const REACT_RENDER_COMMIT: Diagram = {
  id: 'react-render-commit',
  layout: 'chain',
  steps: chainSteps(
    [
      {
        id: 'trigger',
        title: { ru: 'Триггер', en: 'Trigger' },
        tone: 'warning',
        items: [
          code('setstate', 'setState'),
          { id: 'parent', label: { ru: 'рендер родителя', en: 'parent render' } },
          { id: 'context', label: { ru: 'новый контекст', en: 'new context' } },
        ],
      },
      { id: 'render', title: 'Render', tone: 'accent', items: [code('call', 'Component(props)')] },
      {
        id: 'reconcile',
        title: 'Reconciliation',
        tone: 'accent',
        items: [{ id: 'diff', label: { ru: 'сравнение деревьев', en: 'tree diff' } }],
      },
      { id: 'commit', title: 'Commit', tone: 'success', items: [code('dom', 'DOM'), code('refs', 'refs'), code('effects', 'useEffect')] },
      { id: 'paint', title: { ru: 'Отрисовка', en: 'Paint' }, tone: 'neutral', items: [] },
    ],
    [
      {
        activeId: 'trigger',
        caption: {
          ru: 'Рендер запускается, когда меняется состояние, рендерится родитель или меняется прочитанный контекст.',
          en: 'A render starts when state changes, the parent renders, or a context it reads changes.',
        },
      },
      {
        activeId: 'render',
        caption: {
          ru: 'Render: React вызывает компоненты и получает новое дерево элементов. Это чистое вычисление — DOM не трогается.',
          en: 'Render: React calls your components and gets a new element tree. It’s a pure calculation — the DOM isn’t touched.',
        },
      },
      {
        activeId: 'reconcile',
        caption: {
          ru: 'Reconciliation: новое дерево сравнивается с прошлым, вычисляются минимальные изменения.',
          en: 'Reconciliation: the new tree is diffed against the previous one to find the minimal changes.',
        },
      },
      {
        activeId: 'commit',
        caption: {
          ru: 'Commit: изменения применяются к DOM, обновляются refs, затем запускаются эффекты.',
          en: 'Commit: changes are applied to the DOM, refs are updated, then effects run.',
        },
      },
      {
        activeId: 'paint',
        caption: {
          ru: 'Браузер отрисовывает новый кадр.',
          en: 'The browser paints the new frame.',
        },
      },
    ],
  ),
};

const CRITICAL_RENDERING_PATH: Diagram = {
  id: 'critical-rendering-path',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'dom', title: 'HTML → DOM', tone: 'accent', items: [] },
      { id: 'cssom', title: 'CSS → CSSOM', tone: 'accent', items: [] },
      { id: 'tree', title: 'Render tree', tone: 'success', items: [] },
      { id: 'layout', title: 'Layout', tone: 'warning', items: [code('width', 'width, font-size')] },
      { id: 'paint', title: 'Paint', tone: 'warning', items: [code('color', 'color, background')] },
      { id: 'composite', title: 'Composite', tone: 'neutral', items: [code('transform', 'transform, opacity')] },
    ],
    [
      {
        activeId: 'dom',
        caption: { ru: 'HTML разбирается в DOM.', en: 'HTML is parsed into the DOM.' },
      },
      {
        activeId: 'cssom',
        caption: {
          ru: 'CSS разбирается в CSSOM. Без него страницу не отрисовать — CSS блокирует рендеринг.',
          en: 'CSS is parsed into the CSSOM. The page can’t render without it — CSS is render-blocking.',
        },
      },
      {
        activeId: 'tree',
        caption: {
          ru: 'DOM + CSSOM → дерево отрисовки: только видимые элементы с вычисленными стилями.',
          en: 'DOM + CSSOM → render tree: only visible elements with computed styles.',
        },
      },
      {
        activeId: 'layout',
        caption: {
          ru: 'Layout рассчитывает размеры и позиции. Меняете `width` — этот шаг и все следующие повторяются.',
          en: 'Layout computes sizes and positions. Change `width` and this step and everything after reruns.',
        },
      },
      {
        activeId: 'paint',
        caption: {
          ru: 'Paint заливает пиксели. Меняете `color` — повторяются только Paint и Composite.',
          en: 'Paint fills in pixels. Change `color` and only Paint and Composite rerun.',
        },
      },
      {
        activeId: 'composite',
        caption: {
          ru: 'Composite собирает слои в кадр. `transform` и `opacity` часто меняются только здесь — поэтому их дешевле анимировать.',
          en: 'Composite assembles layers into a frame. `transform` and `opacity` often change only here — which is why they’re cheap to animate.',
        },
      },
    ],
  ),
};

const HTTP_REVALIDATION: Diagram = {
  id: 'http-revalidation',
  layout: 'chain',
  steps: chainSteps(
    [
      {
        id: 'cache',
        title: { ru: 'Кэш браузера', en: 'Browser cache' },
        tone: 'accent',
        items: [code('etag', 'ETag: "abc"'), code('cc', 'Cache-Control: no-cache')],
      },
      {
        id: 'request',
        title: { ru: 'Условный запрос', en: 'Conditional request' },
        tone: 'warning',
        items: [code('inm', 'If-None-Match: "abc"')],
      },
      {
        id: 'server',
        title: { ru: 'Сервер', en: 'Server' },
        tone: 'neutral',
        items: [code('compare', '"abc" === current ETag')],
      },
      {
        id: 'response',
        title: { ru: 'Ответ', en: 'Response' },
        tone: 'success',
        items: [code('304', '304 Not Modified')],
      },
    ],
    [
      {
        activeId: 'cache',
        caption: {
          ru: 'В кэше лежит ответ с `ETag` и `no-cache`: хранить можно, но перед использованием нужно проверить.',
          en: 'The cache holds a response with an `ETag` and `no-cache`: it may be stored but must be checked before use.',
        },
      },
      {
        activeId: 'request',
        caption: {
          ru: 'Браузер отправляет условный запрос с `If-None-Match`.',
          en: 'The browser sends a conditional request with `If-None-Match`.',
        },
      },
      {
        activeId: 'server',
        caption: {
          ru: 'Сервер сравнивает ETag с текущей версией ресурса — совпадает.',
          en: 'The server compares the ETag with the current resource version — it matches.',
        },
      },
      {
        activeId: 'response',
        caption: {
          ru: 'Ответ `304 Not Modified` без тела — браузер берёт копию из кэша. Сэкономлен трафик, но не сам запрос.',
          en: 'A `304 Not Modified` response with no body — the browser uses its cached copy. Bandwidth is saved, but not the request itself.',
        },
      },
    ],
  ),
};

const binarySearchLanes = (range: number[], middle: number | null, result: string | null): DiagramLane[] => [
  {
    id: 'range',
    title: { ru: 'Диапазон поиска', en: 'Search range' },
    tone: 'accent',
    items: range.map((value) => code(`range-${value}`, String(value))),
  },
  {
    id: 'middle',
    title: { ru: 'Середина', en: 'Middle' },
    tone: 'warning',
    items: middle === null ? [] : [code(`middle-${middle}`, String(middle))],
  },
  {
    id: 'result',
    title: { ru: 'Результат', en: 'Result' },
    tone: 'success',
    items: result === null ? [] : [code('result', result)],
  },
];

const BINARY_SEARCH: Diagram = {
  id: 'binary-search',
  layout: 'columns',
  steps: [
    {
      caption: {
        ru: 'Ищем 23 в отсортированном массиве. Сначала диапазон — весь массив.',
        en: 'We’re looking for 23 in a sorted array. At first the range is the whole array.',
      },
      lanes: binarySearchLanes([3, 8, 12, 17, 23, 31, 42], null, null),
    },
    {
      caption: {
        ru: 'Середина — 17. 23 больше, значит левую половину вместе с серединой можно отбросить.',
        en: 'The middle is 17. 23 is larger, so the left half and the middle can be discarded.',
      },
      lanes: binarySearchLanes([3, 8, 12, 17, 23, 31, 42], 17, null),
    },
    {
      caption: {
        ru: 'Остались 23, 31, 42 — середина 31. 23 меньше, отбрасываем правую часть.',
        en: '23, 31, 42 remain — the middle is 31. 23 is smaller, so drop the right part.',
      },
      lanes: binarySearchLanes([23, 31, 42], 31, null),
    },
    {
      caption: {
        ru: 'Осталось одно число — нашли за 3 сравнения. Каждый шаг делит диапазон пополам, отсюда O(log n).',
        en: 'One number is left — found in 3 comparisons. Each step halves the range, hence O(log n).',
      },
      lanes: binarySearchLanes([23], 23, 'index = 4'),
    },
  ],
};

const bfsLanes = (queue: string[], visited: string[]): DiagramLane[] => [
  {
    id: 'queue',
    title: { ru: 'Очередь', en: 'Queue' },
    tone: 'accent',
    items: queue.map((node) => code(`queue-${node}`, node)),
  },
  {
    id: 'visited',
    title: { ru: 'Порядок обхода', en: 'Visit order' },
    tone: 'neutral',
    items: visited.map((node) => code(`visited-${node}`, node)),
  },
];

const BFS_QUEUE: Diagram = {
  id: 'bfs-queue',
  layout: 'columns',
  steps: [
    {
      caption: {
        ru: 'Дерево: у A дети B и C, у B — D и E, у C — F. Кладём корень A в очередь.',
        en: 'The tree: A has children B and C, B has D and E, C has F. Put the root A into the queue.',
      },
      lanes: bfsLanes(['A'], []),
    },
    {
      caption: {
        ru: 'Достаём A из начала очереди, посещаем и кладём в конец его детей B и C.',
        en: 'Take A from the front of the queue, visit it, and add its children B and C to the back.',
      },
      lanes: bfsLanes(['B', 'C'], ['A']),
    },
    {
      caption: {
        ru: 'Достаём B, добавляем его детей D и E.',
        en: 'Take B and add its children D and E.',
      },
      lanes: bfsLanes(['C', 'D', 'E'], ['A', 'B']),
    },
    {
      caption: {
        ru: 'Достаём C, добавляем F.',
        en: 'Take C and add F.',
      },
      lanes: bfsLanes(['D', 'E', 'F'], ['A', 'B', 'C']),
    },
    {
      caption: {
        ru: 'У D, E и F детей нет — посещаем их по очереди. BFS идёт по уровням: A, затем B C, затем D E F.',
        en: 'D, E and F have no children — visit them in order. BFS goes level by level: A, then B C, then D E F.',
      },
      lanes: bfsLanes([], ['A', 'B', 'C', 'D', 'E', 'F']),
    },
  ],
};

const RECURSION_CALLS = ['factorial(1)', 'factorial(2)', 'factorial(3)'];

const recursionLanes = (stackDepth: number, returned: string[]): DiagramLane[] => [
  {
    id: 'stack',
    title: { ru: 'Стек вызовов', en: 'Call stack' },
    tone: 'accent',
    items: RECURSION_CALLS.slice(RECURSION_CALLS.length - stackDepth).map((call) => code(`call-${call}`, call)),
  },
  {
    id: 'returned',
    title: { ru: 'Вернули', en: 'Returned' },
    tone: 'success',
    items: returned.map((value) => code(`returned-${value}`, value)),
  },
];

const RECURSION_STACK: Diagram = {
  id: 'recursion-stack',
  layout: 'columns',
  steps: [
    {
      caption: {
        ru: 'Вызываем `factorial(3)` — вызов попадает в стек.',
        en: 'We call `factorial(3)` — the call goes onto the stack.',
      },
      lanes: recursionLanes(1, []),
    },
    {
      caption: {
        ru: '`factorial(3)` ждёт результат `factorial(2)`: новый вызов кладётся сверху.',
        en: '`factorial(3)` waits for `factorial(2)`: the new call is pushed on top.',
      },
      lanes: recursionLanes(2, []),
    },
    {
      caption: {
        ru: '`factorial(1)` — базовый случай, новых вызовов не будет.',
        en: '`factorial(1)` is the base case — no more calls.',
      },
      lanes: recursionLanes(3, []),
    },
    {
      caption: {
        ru: '`factorial(1)` возвращает 1 и снимается со стека.',
        en: '`factorial(1)` returns 1 and is popped off the stack.',
      },
      lanes: recursionLanes(2, ['1']),
    },
    {
      caption: {
        ru: '`factorial(2)` возвращает 2 · 1 = 2.',
        en: '`factorial(2)` returns 2 · 1 = 2.',
      },
      lanes: recursionLanes(1, ['1', '2']),
    },
    {
      caption: {
        ru: '`factorial(3)` возвращает 3 · 2 = 6. Глубина стека росла вместе с n — отсюда O(n) памяти и `RangeError` при очень большой глубине.',
        en: '`factorial(3)` returns 3 · 2 = 6. Stack depth grew with n — hence O(n) memory and a `RangeError` at very large depths.',
      },
      lanes: recursionLanes(0, ['1', '2', '6']),
    },
  ],
};

const STATE_COLOCATION: Diagram = {
  id: 'state-colocation',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'Флаг `isOpen` положили в корень. Он нужен одной кнопке, но знают о нём все уровни — и все перерисовываются при каждом открытии.',
        en: 'The `isOpen` flag lives at the root. Only one button needs it, yet every level knows about it — and re-renders on every open.',
      },
      lanes: [
        { id: 'app', title: 'App', tone: 'warning', items: [code('is-open', 'isOpen')], isActive: true },
        { id: 'page', title: 'ProductsPage', tone: 'warning', items: [code('is-open-prop', 'isOpen')], parent: 'app', isActive: true },
        { id: 'list', title: 'ProductList', tone: 'neutral', items: [], parent: 'page' },
        { id: 'button', title: 'DeleteButton', tone: 'warning', items: [code('is-open-use', 'isOpen')], parent: 'page', isActive: true },
      ],
    },
    {
      caption: {
        ru: 'Перенесли `isOpen` в `DeleteButton`: состояние живёт там, где используется, а остальным компонентам до него нет дела.',
        en: 'We moved `isOpen` into `DeleteButton`: the state lives where it is used, and other components don’t care about it.',
      },
      lanes: [
        { id: 'app', title: 'App', tone: 'neutral', items: [] },
        { id: 'page', title: 'ProductsPage', tone: 'neutral', items: [], parent: 'app' },
        { id: 'list', title: 'ProductList', tone: 'neutral', items: [], parent: 'page' },
        { id: 'button', title: 'DeleteButton', tone: 'success', items: [code('is-open', 'useState(false)')], parent: 'page', isActive: true },
      ],
    },
  ],
};

const STATE_LIFTING: Diagram = {
  id: 'state-lifting',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'Категория хранится в фильтре — список о ней не знает и показывает всё подряд.',
        en: 'The category lives in the filter — the list doesn’t know about it and shows everything.',
      },
      lanes: [
        { id: 'page', title: 'CatalogPage', tone: 'neutral', items: [] },
        { id: 'filter', title: 'CategoryFilter', tone: 'accent', items: [code('category', 'category')], parent: 'page', isActive: true },
        { id: 'list', title: 'ProductList', tone: 'neutral', items: [], parent: 'page' },
      ],
    },
    {
      caption: {
        ru: 'Завели копию в списке и синхронизируют через `useEffect`: два источника правды, лишние рендеры, рассинхрон.',
        en: 'A copy in the list synced with `useEffect`: two sources of truth, extra renders, drift.',
      },
      lanes: [
        { id: 'page', title: 'CatalogPage', tone: 'neutral', items: [] },
        { id: 'filter', title: 'CategoryFilter', tone: 'warning', items: [code('category', 'category')], parent: 'page', isActive: true },
        { id: 'list', title: 'ProductList', tone: 'warning', items: [{ id: 'category-copy', label: { ru: 'category (копия)', en: 'category (copy)' }, isCode: true }], parent: 'page', isActive: true },
      ],
    },
    {
      caption: {
        ru: 'Подняли в ближайший общий родитель: `CatalogPage` хранит `category`, фильтру уходят значение и `onChange`, списку — значение.',
        en: 'Lifted into the closest common parent: `CatalogPage` holds `category`; the filter gets the value and `onChange`, the list gets the value.',
      },
      lanes: [
        { id: 'page', title: 'CatalogPage', tone: 'success', items: [code('category', 'category')], isActive: true },
        {
          id: 'filter',
          title: 'CategoryFilter',
          tone: 'accent',
          items: [code('category-prop', 'category'), code('on-change', 'onChange')],
          parent: 'page',
        },
        { id: 'list', title: 'ProductList', tone: 'accent', items: [code('category-list', 'category')], parent: 'page' },
      ],
    },
  ],
};

const STATE_PROP_DRILLING: Diagram = {
  id: 'state-prop-drilling',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'Проп-дриллинг: `user` идёт через `Layout` и `Sidebar`, которым он не нужен, — только чтобы дойти до `Avatar`.',
        en: 'Prop drilling: `user` passes through `Layout` and `Sidebar`, which don’t need it, just to reach `Avatar`.',
      },
      lanes: [
        { id: 'app', title: 'App', tone: 'accent', items: [code('user', 'user')] },
        { id: 'layout', title: 'Layout', tone: 'warning', items: [code('user-layout', 'user')], parent: 'app', isActive: true },
        { id: 'sidebar', title: 'Sidebar', tone: 'warning', items: [code('user-sidebar', 'user')], parent: 'layout', isActive: true },
        { id: 'avatar', title: 'Avatar', tone: 'success', items: [code('user-avatar', 'user')], parent: 'sidebar' },
      ],
    },
    {
      caption: {
        ru: 'Композиция: `App` сам собирает `<Avatar user={user} />` и передаёт его как `children`. Промежуточные слои просто рендерят слот.',
        en: 'Composition: `App` builds `<Avatar user={user} />` itself and passes it as `children`. The layers in between just render the slot.',
      },
      lanes: [
        { id: 'app', title: 'App', tone: 'accent', items: [code('user', 'user')], isActive: true },
        { id: 'layout', title: 'Layout', tone: 'neutral', items: [code('children-layout', 'children')], parent: 'app' },
        { id: 'sidebar', title: 'Sidebar', tone: 'neutral', items: [code('children-sidebar', 'children')], parent: 'layout' },
        { id: 'avatar', title: 'Avatar', tone: 'success', items: [code('user-avatar', 'user')], parent: 'sidebar', isActive: true },
      ],
    },
  ],
};

const IMM_STRUCTURAL_SHARING: Diagram = {
  id: 'imm-structural-sharing',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'Исходное состояние: объект, в нём массив `todos` и две задачи.',
        en: 'The initial state: an object holding a `todos` array with two tasks.',
      },
      lanes: [
        { id: 'state', title: 'state', tone: 'neutral', items: [] },
        { id: 'todos', title: 'todos', tone: 'neutral', items: [], parent: 'state' },
        { id: 'todo-1', title: 'todos[0]', tone: 'neutral', items: [code('done-1', 'done: false')], parent: 'todos' },
        { id: 'todo-2', title: 'todos[1]', tone: 'neutral', items: [code('done-2', 'done: false')], parent: 'todos' },
      ],
    },
    {
      caption: {
        ru: 'Отмечаем вторую задачу. Новые объекты появляются только на пути к ней: состояние, массив и сама задача.',
        en: 'We complete the second task. New objects appear only along the path to it: the state, the array and the task itself.',
      },
      lanes: [
        { id: 'state', title: 'state', tone: 'success', items: [code('state-new', '{ ...state }')], isActive: true },
        { id: 'todos', title: 'todos', tone: 'success', items: [code('todos-new', 'map(…)')], parent: 'state', isActive: true },
        { id: 'todo-1', title: 'todos[0]', tone: 'neutral', items: [code('done-1', 'done: false')], parent: 'todos' },
        { id: 'todo-2', title: 'todos[1]', tone: 'success', items: [code('done-2-new', 'done: true')], parent: 'todos', isActive: true },
      ],
    },
    {
      caption: {
        ru: 'Первая задача — та же ссылка. Её `memo`-компонент не перерисуется, а компонент второй — перерисуется.',
        en: 'The first task is the same reference. Its `memo` component won’t re-render, while the second task’s component will.',
      },
      lanes: [
        { id: 'state', title: 'state', tone: 'success', items: [code('state-new', '{ ...state }')] },
        { id: 'todos', title: 'todos', tone: 'success', items: [code('todos-new', 'map(…)')], parent: 'state' },
        {
          id: 'todo-1',
          title: 'todos[0]',
          tone: 'accent',
          items: [{ id: 'same-ref', label: { ru: 'та же ссылка', en: 'same reference' } }],
          parent: 'todos',
          isActive: true,
        },
        { id: 'todo-2', title: 'todos[1]', tone: 'success', items: [code('done-2-new', 'done: true')], parent: 'todos' },
      ],
    },
  ],
};

const REDUX_DATA_FLOW: Diagram = {
  id: 'redux-data-flow',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'component', title: { ru: 'Компонент', en: 'Component' }, tone: 'accent', items: [code('dispatch', 'dispatch(action)')] },
      { id: 'middleware', title: 'Middleware', tone: 'warning', items: [code('thunk', 'thunk'), code('logger', 'logger')] },
      { id: 'reducer', title: { ru: 'Редьюсер', en: 'Reducer' }, tone: 'accent', items: [code('reduce', '(state, action) => next')] },
      { id: 'store', title: { ru: 'Стор', en: 'Store' }, tone: 'success', items: [{ id: 'notify', label: { ru: 'уведомляет подписчиков', en: 'notifies subscribers' } }] },
      { id: 'ui', title: 'UI', tone: 'neutral', items: [code('selector', 'useSelector')] },
    ],
    [
      {
        activeId: 'component',
        caption: {
          ru: 'Компонент отправляет действие — объект, который описывает, что произошло: `{ type: \'todos/added\', payload }`.',
          en: 'A component dispatches an action — an object describing what happened: `{ type: \'todos/added\', payload }`.',
        },
      },
      {
        activeId: 'middleware',
        caption: {
          ru: 'Middleware видят действие первыми: логируют, перехватывают функции-thunk, делают запросы.',
          en: 'Middleware see the action first: they log it, intercept thunk functions, make requests.',
        },
      },
      {
        activeId: 'reducer',
        caption: {
          ru: 'Редьюсер по старому состоянию и действию вычисляет новое — без побочных эффектов.',
          en: 'The reducer computes the new state from the old state and the action — with no side effects.',
        },
      },
      {
        activeId: 'store',
        caption: {
          ru: 'Стор сохраняет новое состояние и уведомляет всех подписчиков.',
          en: 'The store saves the new state and notifies every subscriber.',
        },
      },
      {
        activeId: 'ui',
        caption: {
          ru: '`useSelector` перерисовывает только компоненты, у которых изменились выбранные данные.',
          en: '`useSelector` re-renders only the components whose selected data changed.',
        },
      },
    ],
  ),
};

const REDUX_COMBINE: Diagram = {
  id: 'redux-combine',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'Корневой редьюсер получает действие `inc` и передаёт его **каждому** срезу вместе с его кусочком состояния.',
        en: 'The root reducer receives the `inc` action and passes it to **every** slice along with that slice’s piece of state.',
      },
      lanes: [
        { id: 'root', title: 'rootReducer', tone: 'warning', items: [code('action', "{ type: 'inc' }")], isActive: true },
        { id: 'counter', title: 'counter', tone: 'neutral', items: [code('counter-in', '0')], parent: 'root', isActive: true },
        { id: 'user', title: 'user', tone: 'neutral', items: [code('user-in', 'null')], parent: 'root', isActive: true },
        { id: 'todos', title: 'todos', tone: 'neutral', items: [code('todos-in', '[]')], parent: 'root', isActive: true },
      ],
    },
    {
      caption: {
        ru: '`counter` знает `inc` и возвращает 1. `user` и `todos` действие не знают и возвращают прежние значения.',
        en: '`counter` knows `inc` and returns 1. `user` and `todos` don’t know the action and return their previous values.',
      },
      lanes: [
        { id: 'root', title: 'rootReducer', tone: 'warning', items: [code('action', "{ type: 'inc' }")] },
        { id: 'counter', title: 'counter', tone: 'success', items: [code('counter-out', '0 → 1')], parent: 'root', isActive: true },
        { id: 'user', title: 'user', tone: 'neutral', items: [code('user-out', 'null → null')], parent: 'root' },
        { id: 'todos', title: 'todos', tone: 'neutral', items: [code('todos-out', '[] → []')], parent: 'root' },
      ],
    },
    {
      caption: {
        ru: 'Из ответов срезов собирается новое состояние. Срез, вернувший `undefined`, затёр бы свои данные.',
        en: 'The slices’ answers form the new state. A slice returning `undefined` would wipe its own data.',
      },
      lanes: [
        { id: 'root', title: 'rootReducer', tone: 'success', items: [code('result', '{ counter: 1, user, todos }')], isActive: true },
        { id: 'counter', title: 'counter', tone: 'success', items: [code('counter-out', '1')], parent: 'root' },
        { id: 'user', title: 'user', tone: 'neutral', items: [code('user-out', 'null')], parent: 'root' },
        { id: 'todos', title: 'todos', tone: 'neutral', items: [code('todos-out', '[]')], parent: 'root' },
      ],
    },
  ],
};

const REDUX_MIDDLEWARE_ONION: Diagram = {
  id: 'redux-middleware-onion',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'dispatch', title: 'dispatch(action)', tone: 'accent', items: [] },
      { id: 'a', title: 'middleware a', tone: 'warning', items: [code('a-next', 'next(action)')] },
      { id: 'b', title: 'middleware b', tone: 'warning', items: [code('b-next', 'next(action)')] },
      { id: 'reducer', title: { ru: 'Редьюсер', en: 'Reducer' }, tone: 'success', items: [] },
    ],
    [
      {
        activeId: 'dispatch',
        caption: {
          ru: 'Middleware подключены в порядке `[a, b]`: `a` — внешний слой луковицы.',
          en: 'Middleware are applied as `[a, b]`: `a` is the outer layer of the onion.',
        },
      },
      {
        activeId: 'a',
        caption: { ru: '`a` печатает «a before» и вызывает `next(action)`.', en: '`a` logs “a before” and calls `next(action)`.' },
      },
      {
        activeId: 'b',
        caption: { ru: '`b` печатает «b before» и передаёт действие дальше.', en: '`b` logs “b before” and passes the action on.' },
      },
      {
        activeId: 'reducer',
        caption: { ru: 'Редьюсер обновляет состояние.', en: 'The reducer updates the state.' },
      },
      {
        activeId: 'b',
        caption: {
          ru: 'Обратный путь: код после `next` выполняется изнутри наружу — сначала «b after»…',
          en: 'The way back: code after `next` runs from the inside out — first “b after”…',
        },
      },
      {
        activeId: 'a',
        caption: {
          ru: '…потом «a after». Итог: a before, b before, reducer, b after, a after.',
          en: '…then “a after”. Result: a before, b before, reducer, b after, a after.',
        },
      },
    ],
  ),
};

const STORES_DISTANT_CONSUMERS: Diagram = {
  id: 'stores-distant-consumers',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'Корзину читают и меняют три далёких друг от друга компонента: иконка в шапке, кнопка на карточке и оформление заказа.',
        en: 'Three components far apart read and change the cart: the header icon, the card button and the checkout.',
      },
      lanes: [
        { id: 'app', title: 'App', tone: 'neutral', items: [] },
        { id: 'header', title: 'Header', tone: 'neutral', items: [], parent: 'app' },
        { id: 'icon', title: 'CartIcon', tone: 'accent', items: [code('cart-icon', 'cart')], parent: 'header', isActive: true },
        { id: 'catalog', title: 'Catalog', tone: 'neutral', items: [], parent: 'app' },
        { id: 'card', title: 'ProductCard', tone: 'neutral', items: [], parent: 'catalog' },
        { id: 'button', title: 'AddButton', tone: 'accent', items: [code('cart-button', 'cart')], parent: 'card', isActive: true },
        { id: 'checkout', title: 'Checkout', tone: 'accent', items: [code('cart-checkout', 'cart')], parent: 'app', isActive: true },
      ],
    },
    {
      caption: {
        ru: 'Через пропсы `cart` пришлось бы тянуть через `Header`, `Catalog` и `ProductCard`, которым корзина не нужна.',
        en: 'With props, `cart` would have to pass through `Header`, `Catalog` and `ProductCard`, which don’t need it.',
      },
      lanes: [
        { id: 'app', title: 'App', tone: 'accent', items: [code('cart-app', 'cart')] },
        { id: 'header', title: 'Header', tone: 'warning', items: [code('cart-header', 'cart')], parent: 'app', isActive: true },
        { id: 'icon', title: 'CartIcon', tone: 'accent', items: [code('cart-icon', 'cart')], parent: 'header' },
        { id: 'catalog', title: 'Catalog', tone: 'warning', items: [code('cart-catalog', 'cart')], parent: 'app', isActive: true },
        { id: 'card', title: 'ProductCard', tone: 'warning', items: [code('cart-card', 'cart')], parent: 'catalog', isActive: true },
        { id: 'button', title: 'AddButton', tone: 'accent', items: [code('cart-button', 'cart')], parent: 'card' },
        { id: 'checkout', title: 'Checkout', tone: 'accent', items: [code('cart-checkout', 'cart')], parent: 'app' },
      ],
    },
    {
      caption: {
        ru: 'Со стором каждый, кому нужна корзина, подписывается напрямую, а промежуточные компоненты о ней не знают.',
        en: 'With a store, everyone who needs the cart subscribes directly, and the components in between know nothing about it.',
      },
      lanes: [
        { id: 'app', title: 'App', tone: 'neutral', items: [] },
        { id: 'header', title: 'Header', tone: 'neutral', items: [], parent: 'app' },
        { id: 'icon', title: 'CartIcon', tone: 'success', items: [code('use-icon', 'useCart()')], parent: 'header', isActive: true },
        { id: 'catalog', title: 'Catalog', tone: 'neutral', items: [], parent: 'app' },
        { id: 'card', title: 'ProductCard', tone: 'neutral', items: [], parent: 'catalog' },
        { id: 'button', title: 'AddButton', tone: 'success', items: [code('use-button', 'useCart()')], parent: 'card', isActive: true },
        { id: 'checkout', title: 'Checkout', tone: 'success', items: [code('use-checkout', 'useCart()')], parent: 'app', isActive: true },
      ],
    },
  ],
};

const STORES_CONTEXT_RERENDER: Diagram = {
  id: 'stores-context-rerender',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'Один контекст `{ cart, dispatch }`. Корзина изменилась — новый `value`, и перерисовываются **все** потребители, даже кнопки, которым нужен только `dispatch`.',
        en: 'One context, `{ cart, dispatch }`. The cart changed — a new `value`, so **every** consumer re-renders, even the buttons that only need `dispatch`.',
      },
      lanes: [
        { id: 'provider', title: 'CartProvider', tone: 'warning', items: [code('value', '{ cart, dispatch }')], isActive: true },
        { id: 'icon', title: 'CartIcon', tone: 'warning', items: [code('icon-cart', 'cart')], parent: 'provider', isActive: true },
        { id: 'list', title: 'ProductList', tone: 'neutral', items: [], parent: 'provider' },
        { id: 'button-1', title: 'AddButton', tone: 'warning', items: [code('button-1-dispatch', 'dispatch')], parent: 'list', isActive: true },
        { id: 'button-2', title: 'AddButton', tone: 'warning', items: [code('button-2-dispatch', 'dispatch')], parent: 'list', isActive: true },
      ],
    },
    {
      caption: {
        ru: 'Два контекста: состояние отдельно, `dispatch` отдельно. `dispatch` стабилен, поэтому кнопки не перерисовываются — только иконка корзины.',
        en: 'Two contexts: state separately, `dispatch` separately. `dispatch` is stable, so the buttons don’t re-render — only the cart icon does.',
      },
      lanes: [
        { id: 'provider', title: 'CartProvider', tone: 'accent', items: [code('cart-context', 'CartContext'), code('dispatch-context', 'DispatchContext')] },
        { id: 'icon', title: 'CartIcon', tone: 'warning', items: [code('icon-cart', 'cart')], parent: 'provider', isActive: true },
        { id: 'list', title: 'ProductList', tone: 'neutral', items: [], parent: 'provider' },
        { id: 'button-1', title: 'AddButton', tone: 'success', items: [code('button-1-dispatch', 'dispatch')], parent: 'list' },
        { id: 'button-2', title: 'AddButton', tone: 'success', items: [code('button-2-dispatch', 'dispatch')], parent: 'list' },
      ],
    },
  ],
};

const STORES_SELECTOR_SUBSCRIPTION: Diagram = {
  id: 'stores-selector-subscription',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'Три компонента читают один стор: два через селекторы, один целиком через `useStore()`.',
        en: 'Three components read one store: two via selectors, one as a whole via `useStore()`.',
      },
      lanes: [
        { id: 'store', title: 'useStore', tone: 'accent', items: [code('fields', '{ count, user }')] },
        { id: 'counter', title: 'Counter', tone: 'neutral', items: [code('select-count', 'state => state.count')], parent: 'store' },
        { id: 'profile', title: 'Profile', tone: 'neutral', items: [code('select-user', 'state => state.user')], parent: 'store' },
        { id: 'toolbar', title: 'Toolbar', tone: 'neutral', items: [code('select-all', 'useStore()')], parent: 'store' },
      ],
    },
    {
      caption: {
        ru: 'Изменился `user`. Стор сообщает подписчикам и сравнивает результат каждого селектора с прошлым.',
        en: '`user` changed. The store notifies subscribers and compares each selector’s result with the previous one.',
      },
      lanes: [
        { id: 'store', title: 'useStore', tone: 'warning', items: [code('fields', '{ count, user }')], isActive: true },
        { id: 'counter', title: 'Counter', tone: 'neutral', items: [code('select-count', 'state => state.count')], parent: 'store' },
        { id: 'profile', title: 'Profile', tone: 'neutral', items: [code('select-user', 'state => state.user')], parent: 'store' },
        { id: 'toolbar', title: 'Toolbar', tone: 'neutral', items: [code('select-all', 'useStore()')], parent: 'store' },
      ],
    },
    {
      caption: {
        ru: 'Перерисовались `Profile` — он выбрал `user` — и `Toolbar`, подписанный на весь стор. `Counter` выбрал `count`, и его не тронули.',
        en: '`Profile` re-rendered because it selected `user`, and so did `Toolbar`, subscribed to the whole store. `Counter` selected `count` and stayed put.',
      },
      lanes: [
        { id: 'store', title: 'useStore', tone: 'warning', items: [code('fields', '{ count, user }')] },
        { id: 'counter', title: 'Counter', tone: 'success', items: [code('select-count', 'state => state.count')], parent: 'store' },
        { id: 'profile', title: 'Profile', tone: 'warning', items: [code('select-user', 'state => state.user')], parent: 'store', isActive: true },
        { id: 'toolbar', title: 'Toolbar', tone: 'warning', items: [code('select-all', 'useStore()')], parent: 'store', isActive: true },
      ],
    },
  ],
};

const SERVER_DEDUPE: Diagram = {
  id: 'server-dedupe',
  layout: 'columns',
  steps: [
    {
      caption: {
        ru: '`Header` монтируется и запрашивает пользователя по ключу `[\'user\', 1]`. В кеше такого ключа нет — уходит запрос.',
        en: '`Header` mounts and asks for the user by the key `[\'user\', 1]`. The cache has no such key, so a request goes out.',
      },
      lanes: [
        { id: 'components', title: { ru: 'Компоненты', en: 'Components' }, tone: 'accent', items: [code('header', 'Header')] },
        { id: 'cache', title: { ru: 'Кеш', en: 'Cache' }, tone: 'success', items: [code('key', "['user', 1]")] },
        { id: 'network', title: { ru: 'Сеть', en: 'Network' }, tone: 'warning', items: [code('request', 'GET /user/1')] },
      ],
    },
    {
      caption: {
        ru: '`Menu` просит тот же ключ, пока запрос ещё в полёте. Он получает **тот же** промис — второго запроса нет.',
        en: '`Menu` asks for the same key while the request is still in flight. It gets **the same** promise — no second request.',
      },
      lanes: [
        { id: 'components', title: { ru: 'Компоненты', en: 'Components' }, tone: 'accent', items: [code('header', 'Header'), code('menu', 'Menu')] },
        { id: 'cache', title: { ru: 'Кеш', en: 'Cache' }, tone: 'success', items: [code('key', "['user', 1]")] },
        { id: 'network', title: { ru: 'Сеть', en: 'Network' }, tone: 'warning', items: [code('request', 'GET /user/1')] },
      ],
    },
    {
      caption: {
        ru: 'Ответ пришёл: кеш сохранил данные, и оба компонента получили их из одного запроса.',
        en: 'The response arrived: the cache stored the data, and both components got it from a single request.',
      },
      lanes: [
        { id: 'components', title: { ru: 'Компоненты', en: 'Components' }, tone: 'accent', items: [code('header', 'Header'), code('menu', 'Menu')] },
        { id: 'cache', title: { ru: 'Кеш', en: 'Cache' }, tone: 'success', items: [code('key', "['user', 1]"), code('data', "{ name: 'Ann' }")] },
        { id: 'network', title: { ru: 'Сеть', en: 'Network' }, tone: 'warning', items: [] },
      ],
    },
  ],
};

const SERVER_INVALIDATION: Diagram = {
  id: 'server-invalidation',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'mutation', title: 'useMutation', tone: 'accent', items: [code('mutate', 'addTodo.mutate(todo)')] },
      { id: 'server', title: { ru: 'Сервер', en: 'Server' }, tone: 'neutral', items: [code('post', 'POST /todos')] },
      { id: 'invalidate', title: 'onSuccess', tone: 'warning', items: [code('call', "invalidateQueries(['todos'])")] },
      { id: 'refetch', title: { ru: 'Активные запросы', en: 'Active queries' }, tone: 'success', items: [code('list', "['todos']"), code('filtered', "['todos', { status }]")] },
      { id: 'ui', title: 'UI', tone: 'neutral', items: [{ id: 'fresh', label: { ru: 'новая задача в списке', en: 'the new task is listed' } }] },
    ],
    [
      {
        activeId: 'mutation',
        caption: { ru: 'Пользователь добавляет задачу — запускается мутация.', en: 'The user adds a task — the mutation runs.' },
      },
      {
        activeId: 'server',
        caption: {
          ru: 'Сервер сохранил задачу, но кеш списка об этом не знает: там старые данные.',
          en: 'The server saved the task, but the list cache doesn’t know: it still holds old data.',
        },
      },
      {
        activeId: 'invalidate',
        caption: {
          ru: 'В `onSuccess` помечаем списки устаревшими. Ключ сравнивается по префиксу — подходят все варианты `todos`.',
          en: 'In `onSuccess` we mark the lists stale. Keys match by prefix — every `todos` variant qualifies.',
        },
      },
      {
        activeId: 'refetch',
        caption: {
          ru: 'Активные запросы с этими ключами сразу перезапрашиваются, неактивные обновятся при следующем использовании.',
          en: 'Active queries with these keys refetch right away; inactive ones refresh the next time they’re used.',
        },
      },
      {
        activeId: 'ui',
        caption: { ru: 'Список подтянул новую задачу — без перезагрузки и ручного копирования.', en: 'The list picked up the new task — no reload, no manual copying.' },
      },
    ],
  ),
};

const URL_SOURCE_OF_TRUTH: Diagram = {
  id: 'url-source-of-truth',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'click', title: { ru: 'Выбор фильтра', en: 'Picking a filter' }, tone: 'accent', items: [code('category', "category: 'games'")] },
      { id: 'write', title: { ru: 'Запись в URL', en: 'Writing the URL' }, tone: 'warning', items: [code('set', 'setSearchParams(…)')] },
      { id: 'url', title: 'URL', tone: 'success', items: [code('query', '?category=games')] },
      { id: 'read', title: { ru: 'Чтение из URL', en: 'Reading the URL' }, tone: 'accent', items: [code('get', "params.get('category')")] },
      { id: 'render', title: { ru: 'Рендер', en: 'Render' }, tone: 'neutral', items: [{ id: 'list', label: { ru: 'список игр', en: 'the games list' } }] },
    ],
    [
      {
        activeId: 'click',
        caption: { ru: 'Пользователь выбирает категорию «Игры».', en: 'The user picks the Games category.' },
      },
      {
        activeId: 'write',
        caption: {
          ru: 'Обработчик не кладёт значение в `useState`, а записывает его в URL.',
          en: 'The handler doesn’t put the value into `useState`; it writes it to the URL.',
        },
      },
      {
        activeId: 'url',
        caption: {
          ru: 'Адрес изменился: теперь его можно отправить ссылкой, и он переживёт перезагрузку.',
          en: 'The address changed: it can now be shared as a link and survives a reload.',
        },
      },
      {
        activeId: 'read',
        caption: {
          ru: 'Компонент читает фильтр из URL — это единственный источник правды.',
          en: 'The component reads the filter from the URL — the only source of truth.',
        },
      },
      {
        activeId: 'render',
        caption: {
          ru: 'Список рисуется по URL. «Назад» вернёт прошлый адрес — и прошлые фильтры сами.',
          en: 'The list renders from the URL. “Back” restores the previous address — and the previous filters with it.',
        },
      },
    ],
  ),
};

const URL_PUSH_REPLACE: Diagram = {
  id: 'url-push-replace',
  layout: 'columns',
  steps: [
    {
      caption: {
        ru: 'Пользователь начал вводить запрос: «r». В истории две записи в обоих случаях.',
        en: 'The user starts typing the query: “r”. History holds two entries in both cases.',
      },
      lanes: [
        { id: 'push', title: 'pushState', tone: 'warning', items: [code('push-home', '/'), code('q-1', '?q=r')] },
        { id: 'replace', title: 'replaceState', tone: 'success', items: [code('replace-home', '/'), code('current', '?q=r')] },
      ],
    },
    {
      caption: {
        ru: '«re», «rea»… `pushState` добавляет запись на каждую букву, `replaceState` меняет текущую.',
        en: '“re”, “rea”… `pushState` adds an entry per letter, `replaceState` changes the current one.',
      },
      lanes: [
        { id: 'push', title: 'pushState', tone: 'warning', items: [code('push-home', '/'), code('q-1', '?q=r'), code('q-2', '?q=re'), code('q-3', '?q=rea')] },
        { id: 'replace', title: 'replaceState', tone: 'success', items: [code('replace-home', '/'), code('current', '?q=rea')] },
      ],
    },
    {
      caption: {
        ru: '«Назад» после `pushState` вернёт на прошлую букву, после `replaceState` — уведёт со страницы поиска.',
        en: '“Back” after `pushState` returns to the previous letter; after `replaceState` it leaves the search page.',
      },
      lanes: [
        { id: 'push', title: 'pushState', tone: 'warning', items: [code('push-home', '/'), code('q-1', '?q=r'), code('q-2', '?q=re')] },
        { id: 'replace', title: 'replaceState', tone: 'success', items: [code('replace-home', '/')] },
      ],
    },
  ],
};

const remoteLanes = (server: string[], tracking: string[], local: string[]): DiagramLane[] => [
  { id: 'server', title: { ru: 'Сервер', en: 'Server' }, tone: 'warning', items: server.map((label) => code(`s-${label}`, label)) },
  { id: 'tracking', title: 'origin/main', tone: 'accent', items: tracking.map((label) => code(`t-${label}`, label)) },
  { id: 'local', title: 'main', tone: 'success', items: local.map((label) => code(`l-${label}`, label)) },
];

const GIT_REMOTE_SYNC: Diagram = {
  id: 'git-remote-sync',
  layout: 'columns',
  steps: [
    {
      caption: {
        ru: 'После `push` всё совпадает: на сервере, в `origin/main` и в `main` одни и те же коммиты.',
        en: 'After `push` everything matches: the server, `origin/main` and `main` hold the same commits.',
      },
      lanes: remoteLanes(['A', 'B'], ['A', 'B'], ['A', 'B']),
    },
    {
      caption: {
        ru: 'Вы сделали коммит C. Ваша `main` впереди копии сервера: `[ahead 1]`.',
        en: 'You made commit C. Your `main` is ahead of the server copy: `[ahead 1]`.',
      },
      lanes: remoteLanes(['A', 'B'], ['A', 'B'], ['A', 'B', 'C']),
    },
    {
      caption: {
        ru: 'Коллега отправил на сервер коммит D. У вас ничего не изменилось: `origin/main` обновляется только при обмене.',
        en: 'A colleague pushed commit D. Nothing changed on your side: `origin/main` updates only on exchange.',
      },
      lanes: remoteLanes(['A', 'B', 'D'], ['A', 'B'], ['A', 'B', 'C']),
    },
    {
      caption: {
        ru: '`git fetch` скачал D и сдвинул `origin/main`, но `main` не тронул. Ветки разошлись: `[ahead 1, behind 1]`.',
        en: '`git fetch` downloaded D and moved `origin/main` but left `main` alone. The branches diverged: `[ahead 1, behind 1]`.',
      },
      lanes: remoteLanes(['A', 'B', 'D'], ['A', 'B', 'D'], ['A', 'B', 'C']),
    },
    {
      caption: {
        ru: '`git pull --rebase` пересоздал ваш C поверх D как C′. История прямая, осталось `git push`.',
        en: '`git pull --rebase` recreated your C on top of D as C′. History is linear; all that’s left is `git push`.',
      },
      lanes: remoteLanes(['A', 'B', 'D'], ['A', 'B', 'D'], ['A', 'B', 'D', 'C′']),
    },
  ],
};

const HTML_PARSE_P_DIV: Diagram = {
  id: 'html-parse-p-div',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'Разбираем `<p>a<div>b</div>c</p>`. Парсер открыл абзац и положил в него текст `a`.',
        en: 'Parsing `<p>a<div>b</div>c</p>`. The parser opened a paragraph and put the text `a` in it.',
      },
      lanes: [
        { id: 'body', title: 'body', tone: 'neutral', items: [] },
        { id: 'p1', title: 'p', tone: 'accent', items: [code('a', '"a"')], parent: 'body', isActive: true },
      ],
    },
    {
      caption: {
        ru: 'Встретился `<div>`. Внутри `<p>` блоку не место, поэтому парсер **закрывает абзац** и кладёт `<div>` рядом.',
        en: 'A `<div>` arrives. A block can’t live inside `<p>`, so the parser **closes the paragraph** and puts the `<div>` next to it.',
      },
      lanes: [
        { id: 'body', title: 'body', tone: 'neutral', items: [] },
        { id: 'p1', title: 'p', tone: 'neutral', items: [code('a', '"a"')], parent: 'body' },
        { id: 'div', title: 'div', tone: 'accent', items: [code('b', '"b"')], parent: 'body', isActive: true },
      ],
    },
    {
      caption: {
        ru: 'Текст `c` после `</div>` попадает прямо в `<body>`: абзац уже закрыт.',
        en: 'The text `c` after `</div>` goes straight into `<body>`: the paragraph is already closed.',
      },
      lanes: [
        { id: 'body', title: 'body', tone: 'accent', items: [code('c', '"c"')], isActive: true },
        { id: 'p1', title: 'p', tone: 'neutral', items: [code('a', '"a"')], parent: 'body' },
        { id: 'div', title: 'div', tone: 'neutral', items: [code('b', '"b"')], parent: 'body' },
      ],
    },
    {
      caption: {
        ru: 'Лишний `</p>` без открытого абзаца по правилам превращается в пустой `<p></p>`. В DOM два абзаца.',
        en: 'The stray `</p>` with no open paragraph becomes an empty `<p></p>` by the rules. The DOM has two paragraphs.',
      },
      lanes: [
        { id: 'body', title: 'body', tone: 'neutral', items: [code('c', '"c"')] },
        { id: 'p1', title: 'p', tone: 'neutral', items: [code('a', '"a"')], parent: 'body' },
        { id: 'div', title: 'div', tone: 'neutral', items: [code('b', '"b"')], parent: 'body' },
        { id: 'p2', title: 'p', tone: 'warning', items: [{ id: 'empty', label: { ru: 'пустой', en: 'empty' } }], parent: 'body', isActive: true },
      ],
    },
  ],
};

const A11Y_TAB_ORDER: Diagram = {
  id: 'a11y-tab-order',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'c', title: { ru: 'Кнопка C', en: 'Button C' }, tone: 'warning', items: [code('c-index', 'tabindex="1"')] },
      { id: 'b', title: { ru: 'Кнопка B', en: 'Button B' }, tone: 'warning', items: [code('b-index', 'tabindex="2"')] },
      { id: 'a', title: { ru: 'Кнопка A', en: 'Button A' }, tone: 'neutral', items: [{ id: 'a-native', label: { ru: 'без tabindex', en: 'no tabindex' } }] },
      { id: 'd', title: { ru: 'Кнопка D', en: 'Button D' }, tone: 'neutral', items: [{ id: 'd-native', label: { ru: 'без tabindex', en: 'no tabindex' } }] },
    ],
    [
      {
        activeId: 'c',
        caption: {
          ru: 'В разметке порядок A, B, C, D. Первый Tab попадает на C: элементы с положительным `tabindex` идут раньше всех, по возрастанию.',
          en: 'The markup order is A, B, C, D. The first Tab lands on C: elements with a positive `tabindex` come first, in ascending order.',
        },
      },
      {
        activeId: 'b',
        caption: { ru: 'Следом `tabindex="2"` — кнопка B.', en: 'Next is `tabindex="2"` — button B.' },
      },
      {
        activeId: 'a',
        caption: {
          ru: 'Потом все остальные в порядке DOM: сначала A…',
          en: 'Then everything else in DOM order: first A…',
        },
      },
      {
        activeId: 'd',
        caption: {
          ru: '…и D. Порядок фокуса разошёлся с порядком на экране — поэтому положительный `tabindex` не используют.',
          en: '…and D. Focus order no longer matches the visual order — that’s why positive `tabindex` is avoided.',
        },
      },
    ],
  ),
};

const fakeTimerLanes = (clock: string, timer: string[], calls: string[]): DiagramLane[] => [
  { id: 'clock', title: { ru: 'Фейковое время', en: 'Fake time' }, tone: 'accent', items: [code('now', clock)] },
  { id: 'timer', title: { ru: 'Таймер', en: 'Timer' }, tone: 'warning', items: timer.map((label) => code(`timer-${label}`, label)) },
  { id: 'calls', title: { ru: 'Вызовы search', en: 'search calls' }, tone: 'success', items: calls.map((label) => code(`call-${label}`, label)) },
];

const MOCKS_FAKE_TIMERS: Diagram = {
  id: 'mocks-fake-timers',
  layout: 'columns',
  steps: [
    {
      caption: {
        ru: '`jest.useFakeTimers()`: время стоит, пока тест сам его не сдвинет. Ввели «r» — debounce завёл таймер на 300 мс.',
        en: '`jest.useFakeTimers()`: time stands still until the test moves it. Typed “r” — the debounce set a 300 ms timer.',
      },
      lanes: fakeTimerLanes('0 ms', ['300 ms'], []),
    },
    {
      caption: {
        ru: '`advanceTimersByTime(100)`, ввели «re» — старый таймер отменён, новый снова на 300 мс.',
        en: '`advanceTimersByTime(100)`, typed “re” — the old timer is cleared, a new one set for 300 ms again.',
      },
      lanes: fakeTimerLanes('100 ms', ['300 ms'], []),
    },
    {
      caption: {
        ru: '`advanceTimersByTime(299)` — до срабатывания 1 мс, поиск ещё не вызван.',
        en: '`advanceTimersByTime(299)` — 1 ms to go, search not called yet.',
      },
      lanes: fakeTimerLanes('399 ms', ['1 ms'], []),
    },
    {
      caption: {
        ru: '`advanceTimersByTime(1)` — таймер сработал: один вызов `search(\'re\')`. Тест прошёл мгновенно, без настоящих пауз.',
        en: '`advanceTimersByTime(1)` — the timer fired: one `search(\'re\')` call. The test ran instantly, with no real waiting.',
      },
      lanes: fakeTimerLanes('400 ms', [], ["'re'"]),
    },
  ],
};

const E2E_ACTIONABILITY: Diagram = {
  id: 'e2e-actionability',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'attached', title: { ru: 'Есть в DOM', en: 'Attached' }, tone: 'neutral', items: [] },
      { id: 'visible', title: { ru: 'Виден', en: 'Visible' }, tone: 'accent', items: [] },
      { id: 'stable', title: { ru: 'Не анимируется', en: 'Stable' }, tone: 'accent', items: [] },
      { id: 'receives', title: { ru: 'Ничем не перекрыт', en: 'Receives events' }, tone: 'warning', items: [{ id: 'overlay', label: { ru: 'оверлей ушёл', en: 'overlay gone' } }] },
      { id: 'enabled', title: { ru: 'Доступен', en: 'Enabled' }, tone: 'accent', items: [] },
      { id: 'click', title: 'click()', tone: 'success', items: [] },
    ],
    [
      {
        activeId: 'attached',
        caption: {
          ru: '`locator.click()` сначала ждёт, пока элемент появится в DOM. Фиксированная пауза не нужна.',
          en: '`locator.click()` first waits for the element to appear in the DOM. No fixed pause needed.',
        },
      },
      {
        activeId: 'visible',
        caption: { ru: 'Затем — пока он станет видимым.', en: 'Then until it becomes visible.' },
      },
      {
        activeId: 'stable',
        caption: { ru: 'Потом — пока закончится анимация и он перестанет двигаться.', en: 'Then until its animation ends and it stops moving.' },
      },
      {
        activeId: 'receives',
        caption: {
          ru: 'Проверяет, что в точке клика нет другого элемента — например, оверлея со спиннером.',
          en: 'It checks that no other element, like a spinner overlay, sits at the click point.',
        },
      },
      {
        activeId: 'enabled',
        caption: { ru: 'И что кнопка не `disabled`.', en: 'And that the button isn’t `disabled`.' },
      },
      {
        activeId: 'click',
        caption: {
          ru: 'Только теперь клик. Если проверки не прошли до таймаута — тест падает с понятной причиной.',
          en: 'Only now the click. If the checks don’t pass before the timeout, the test fails with a clear reason.',
        },
      },
    ],
  ),
};

const TDD_CYCLE: Diagram = {
  id: 'tdd-cycle',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'red', title: { ru: 'Красный', en: 'Red' }, tone: 'warning', items: [{ id: 'red-text', label: { ru: 'тест падает', en: 'the test fails' } }] },
      { id: 'green', title: { ru: 'Зелёный', en: 'Green' }, tone: 'success', items: [{ id: 'green-text', label: { ru: 'минимальный код', en: 'minimal code' } }] },
      { id: 'refactor', title: { ru: 'Рефакторинг', en: 'Refactor' }, tone: 'accent', items: [{ id: 'refactor-text', label: { ru: 'тесты зелёные', en: 'tests stay green' } }] },
    ],
    [
      {
        activeId: 'red',
        caption: {
          ru: 'Пишем тест на новое поведение и видим, что он **падает**. Это доказывает, что тест вообще что-то проверяет.',
          en: 'Write a test for the new behavior and watch it **fail**. That proves the test checks something at all.',
        },
      },
      {
        activeId: 'green',
        caption: {
          ru: 'Пишем минимальный код, чтобы тест прошёл. Ничего «на будущее» — только то, чего требует тест.',
          en: 'Write the minimal code to make the test pass. Nothing “for the future” — only what the test demands.',
        },
      },
      {
        activeId: 'refactor',
        caption: {
          ru: 'Улучшаем код, не меняя поведения: убираем дубли, проясняем имена. Тесты остаются зелёными — и цикл повторяется.',
          en: 'Improve the code without changing behavior: remove duplication, clarify names. Tests stay green — and the cycle repeats.',
        },
      },
    ],
  ),
};

const NODE_MODULE_RESOLUTION: Diagram = {
  id: 'node-module-resolution',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'utils', title: '/app/src/utils/node_modules', tone: 'neutral', items: [{ id: 'utils-miss', label: { ru: 'нет папки', en: 'no folder' } }] },
      { id: 'src', title: '/app/src/node_modules', tone: 'neutral', items: [{ id: 'src-miss', label: { ru: 'нет lodash', en: 'no lodash' } }] },
      { id: 'app', title: '/app/node_modules', tone: 'success', items: [code('found', 'lodash/')] },
      { id: 'entry', title: 'package.json', tone: 'accent', items: [code('exports', '"exports" / "main"')] },
    ],
    [
      {
        activeId: 'utils',
        caption: {
          ru: '`require(\'lodash\')` в файле `/app/src/utils/date.js`. Голое имя пакета Node ищет в `node_modules` рядом с файлом…',
          en: '`require(\'lodash\')` in `/app/src/utils/date.js`. Node looks for a bare package name in `node_modules` next to the file…',
        },
      },
      {
        activeId: 'src',
        caption: { ru: '…потом поднимается на папку выше…', en: '…then goes one folder up…' },
      },
      {
        activeId: 'app',
        caption: {
          ru: '…и так до корня, пока не найдёт первый подходящий `node_modules`. Здесь — в корне проекта.',
          en: '…and so on up to the root until the first matching `node_modules`. Here it’s at the project root.',
        },
      },
      {
        activeId: 'entry',
        caption: {
          ru: 'Точку входа пакета задают `exports` или `main` в его `package.json`. Всё, чего нет в `exports`, снаружи недоступно.',
          en: 'The package entry point comes from `exports` or `main` in its `package.json`. Anything missing from `exports` is off limits from outside.',
        },
      },
    ],
  ),
};

const NODE_LOOP_PHASES: Diagram = {
  id: 'node-loop-phases',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'timers', title: 'timers', tone: 'warning', items: [code('timeout', 'setTimeout'), code('interval', 'setInterval')] },
      { id: 'poll', title: 'poll', tone: 'accent', items: [{ id: 'io', label: { ru: 'колбэки ввода-вывода', en: 'I/O callbacks' } }] },
      { id: 'check', title: 'check', tone: 'success', items: [code('immediate', 'setImmediate')] },
      { id: 'close', title: 'close', tone: 'neutral', items: [code('close-cb', "socket.on('close')")] },
    ],
    [
      {
        activeId: 'timers',
        caption: {
          ru: 'Фаза **timers**: выполняются колбэки таймеров, чей срок истёк. Между любыми двумя колбэками Node опустошает очереди `nextTick` и промисов.',
          en: 'The **timers** phase runs callbacks of expired timers. Between any two callbacks Node drains the `nextTick` and promise queues.',
        },
      },
      {
        activeId: 'poll',
        caption: {
          ru: 'Фаза **poll**: колбэки ввода-вывода — прочитанный файл, пришедший запрос. Если дел нет, цикл ждёт здесь новых событий.',
          en: 'The **poll** phase: I/O callbacks — a file was read, a request arrived. With nothing else to do, the loop waits here for events.',
        },
      },
      {
        activeId: 'check',
        caption: {
          ru: 'Фаза **check**: колбэки `setImmediate`. Она идёт сразу после poll — поэтому внутри колбэка ввода-вывода `setImmediate` всегда раньше `setTimeout(…, 0)`.',
          en: 'The **check** phase: `setImmediate` callbacks. It follows poll directly — so inside an I/O callback `setImmediate` always beats `setTimeout(…, 0)`.',
        },
      },
      {
        activeId: 'close',
        caption: {
          ru: 'Фаза **close**: обработчики закрытия сокетов и потоков. Затем новый круг — снова timers.',
          en: 'The **close** phase: close handlers for sockets and streams. Then a new round — timers again.',
        },
      },
    ],
  ),
};

const EXPRESS_MIDDLEWARE_CHAIN: Diagram = {
  id: 'express-middleware-chain',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'logger', title: 'logger', tone: 'neutral', items: [code('logger-next', 'next()')] },
      { id: 'json', title: 'express.json()', tone: 'accent', items: [code('body', 'req.body')] },
      { id: 'auth', title: 'requireAuth', tone: 'warning', items: [code('auth-next', 'next() / 401')] },
      { id: 'route', title: "app.get('/admin')", tone: 'success', items: [code('send', 'res.send()')] },
      { id: 'errors', title: '(err, req, res, next)', tone: 'warning', items: [code('status', '500')] },
    ],
    [
      {
        activeId: 'logger',
        caption: {
          ru: 'Запрос проходит middleware в порядке регистрации. Логгер записал строку и вызвал `next()` — без него запрос повис бы.',
          en: 'A request passes middleware in registration order. The logger wrote a line and called `next()` — without it the request would hang.',
        },
      },
      {
        activeId: 'json',
        caption: {
          ru: '`express.json()` прочитал тело и положил разобранный JSON в `req.body`.',
          en: '`express.json()` read the body and put the parsed JSON into `req.body`.',
        },
      },
      {
        activeId: 'auth',
        caption: {
          ru: 'Проверка входа стоит **до** защищённых маршрутов: нет сессии — ответ 401, есть — `next()`.',
          en: 'The auth check sits **before** protected routes: no session — a 401 reply, otherwise `next()`.',
        },
      },
      {
        activeId: 'route',
        caption: {
          ru: 'Маршрут отвечает через `res.send()`. После ответа менять заголовки уже нельзя.',
          en: 'The route replies with `res.send()`. After the reply, headers can’t be changed.',
        },
      },
      {
        activeId: 'errors',
        caption: {
          ru: 'Если кто-то бросил ошибку или вызвал `next(err)`, управление прыгает в обработчик с четырьмя параметрами — он подключён последним.',
          en: 'If anyone throws or calls `next(err)`, control jumps to the four-parameter handler — it’s registered last.',
        },
      },
    ],
  ),
};

const NEXT_CLIENT_BOUNDARY: Diagram = {
  id: 'next-client-boundary',
  layout: 'tree',
  steps: [
    {
      caption: {
        ru: 'По умолчанию всё дерево серверное: компоненты рендерятся на сервере, их код в браузер не попадает.',
        en: 'By default the whole tree is server-side: components render on the server, and their code never reaches the browser.',
      },
      lanes: [
        { id: 'page', title: 'Page', tone: 'success', items: [{ id: 'page-server', label: { ru: 'сервер', en: 'server' } }] },
        { id: 'modal', title: 'Modal', tone: 'success', items: [{ id: 'modal-server', label: { ru: 'сервер', en: 'server' } }], parent: 'page' },
        { id: 'cart', title: 'Cart', tone: 'success', items: [{ id: 'cart-server', label: { ru: 'сервер', en: 'server' } }], parent: 'modal' },
      ],
    },
    {
      caption: {
        ru: '`Modal` нужно состояние — в его файле `"use client"`. Если `Modal` **импортирует** `Cart`, тот тоже станет клиентским и не сможет читать базу.',
        en: '`Modal` needs state — its file gets `"use client"`. If `Modal` **imports** `Cart`, that becomes client code too and can’t read the database.',
      },
      lanes: [
        { id: 'page', title: 'Page', tone: 'success', items: [{ id: 'page-server', label: { ru: 'сервер', en: 'server' } }] },
        { id: 'modal', title: 'Modal', tone: 'accent', items: [code('use-client', '"use client"')], parent: 'page', isActive: true },
        { id: 'cart', title: 'Cart', tone: 'warning', items: [code('cart-import', 'import Cart')], parent: 'modal', isActive: true },
      ],
    },
    {
      caption: {
        ru: 'Решение: серверная `Page` рендерит `<Modal><Cart /></Modal>`. `Cart` — серверный и приходит в `Modal` готовым результатом через `children`.',
        en: 'The fix: the server `Page` renders `<Modal><Cart /></Modal>`. `Cart` stays on the server and arrives in `Modal` as a ready result through `children`.',
      },
      lanes: [
        { id: 'page', title: 'Page', tone: 'success', items: [{ id: 'page-server', label: { ru: 'сервер', en: 'server' } }] },
        { id: 'modal', title: 'Modal', tone: 'accent', items: [code('use-client', '"use client"')], parent: 'page' },
        { id: 'cart', title: 'Cart', tone: 'success', items: [code('children', 'children')], parent: 'modal', isActive: true },
      ],
    },
  ],
};

const NEXT_DATA_WATERFALL: Diagram = {
  id: 'next-data-waterfall',
  layout: 'columns',
  steps: [
    {
      caption: {
        ru: 'Два `await` подряд: `getOrders()` стартует, только когда закончился `getUser()`.',
        en: 'Two `await`s in a row: `getOrders()` starts only after `getUser()` finishes.',
      },
      lanes: [
        { id: 'serial', title: { ru: 'Подряд', en: 'Sequential' }, tone: 'warning', items: [code('user-1', 'getUser 300 ms')] },
        { id: 'parallel', title: 'Promise.all', tone: 'success', items: [code('user-2', 'getUser 300 ms'), code('orders-2', 'getOrders 400 ms')] },
      ],
    },
    {
      caption: {
        ru: 'Слева второй запрос только начался, а справа оба уже идут одновременно.',
        en: 'On the left the second request has just started; on the right both are already running together.',
      },
      lanes: [
        { id: 'serial', title: { ru: 'Подряд', en: 'Sequential' }, tone: 'warning', items: [code('user-1', 'getUser 300 ms'), code('orders-1', 'getOrders 400 ms')] },
        { id: 'parallel', title: 'Promise.all', tone: 'success', items: [code('user-2', 'getUser 300 ms'), code('orders-2', 'getOrders 400 ms')] },
      ],
    },
    {
      caption: {
        ru: 'Итог: водопад ждёт сумму — 700 мс, параллельная загрузка — самый долгий запрос, 400 мс.',
        en: 'Result: the waterfall waits for the sum — 700 ms; parallel loading waits for the slowest request — 400 ms.',
      },
      lanes: [
        { id: 'serial', title: { ru: 'Подряд', en: 'Sequential' }, tone: 'warning', items: [code('total-1', '= 700 ms')] },
        { id: 'parallel', title: 'Promise.all', tone: 'success', items: [code('total-2', '= 400 ms')] },
      ],
    },
  ],
};

const NEXT_ACTION_FLOW: Diagram = {
  id: 'next-action-flow',
  layout: 'chain',
  steps: chainSteps(
    [
      { id: 'form', title: '<form action={createPost}>', tone: 'accent', items: [] },
      { id: 'post', title: 'POST', tone: 'neutral', items: [{ id: 'network', label: { ru: 'запрос по сети', en: 'a network request' } }] },
      { id: 'action', title: "'use server'", tone: 'warning', items: [code('session', 'getSession()'), code('write', 'db.post.create')] },
      { id: 'revalidate', title: 'revalidatePath', tone: 'success', items: [code('path', "'/posts'")] },
      { id: 'redirect', title: 'redirect', tone: 'success', items: [code('to', '/posts/42')] },
    ],
    [
      {
        activeId: 'form',
        caption: {
          ru: 'Форма передаёт Server Action в `action`. Без JavaScript браузер отправит её обычным POST — прогрессивное улучшение.',
          en: 'The form passes a Server Action to `action`. Without JavaScript the browser sends a plain POST — progressive enhancement.',
        },
      },
      {
        activeId: 'post',
        caption: {
          ru: 'Вызов action — это POST-запрос к публичному эндпоинту. Отправить его можно и в обход интерфейса.',
          en: 'Calling an action is a POST to a public endpoint. It can be sent bypassing the UI too.',
        },
      },
      {
        activeId: 'action',
        caption: {
          ru: 'Поэтому первым делом action проверяет сессию и права, валидирует данные и только потом пишет в базу.',
          en: 'So the action first checks the session and permissions, validates the data and only then writes to the database.',
        },
      },
      {
        activeId: 'revalidate',
        caption: {
          ru: 'Сбрасывает кеш страниц, которые показывают изменённые данные.',
          en: 'It invalidates the cache of pages that show the changed data.',
        },
      },
      {
        activeId: 'redirect',
        caption: {
          ru: 'И перенаправляет на новый пост. `redirect` бросает служебную ошибку, поэтому его вызывают **после** `try/catch`.',
          en: 'Then it redirects to the new post. `redirect` throws an internal error, so it’s called **after** `try/catch`.',
        },
      },
    ],
  ),
};

export const DIAGRAMS: Record<DiagramId, Diagram> = {
  'event-loop-basic': EVENT_LOOP_BASIC,
  'event-loop-async': EVENT_LOOP_ASYNC,
  'prototype-chain': PROTOTYPE_CHAIN,
  'closure-counters': CLOSURE_COUNTERS,
  'react-render-commit': REACT_RENDER_COMMIT,
  'critical-rendering-path': CRITICAL_RENDERING_PATH,
  'http-revalidation': HTTP_REVALIDATION,
  'binary-search': BINARY_SEARCH,
  'bfs-queue': BFS_QUEUE,
  'recursion-stack': RECURSION_STACK,
  'state-colocation': STATE_COLOCATION,
  'state-lifting': STATE_LIFTING,
  'state-prop-drilling': STATE_PROP_DRILLING,
  'imm-structural-sharing': IMM_STRUCTURAL_SHARING,
  'redux-data-flow': REDUX_DATA_FLOW,
  'redux-combine': REDUX_COMBINE,
  'redux-middleware-onion': REDUX_MIDDLEWARE_ONION,
  'stores-distant-consumers': STORES_DISTANT_CONSUMERS,
  'stores-context-rerender': STORES_CONTEXT_RERENDER,
  'stores-selector-subscription': STORES_SELECTOR_SUBSCRIPTION,
  'server-dedupe': SERVER_DEDUPE,
  'server-invalidation': SERVER_INVALIDATION,
  'url-source-of-truth': URL_SOURCE_OF_TRUTH,
  'url-push-replace': URL_PUSH_REPLACE,
  'git-remote-sync': GIT_REMOTE_SYNC,
  'html-parse-p-div': HTML_PARSE_P_DIV,
  'a11y-tab-order': A11Y_TAB_ORDER,
  'mocks-fake-timers': MOCKS_FAKE_TIMERS,
  'e2e-actionability': E2E_ACTIONABILITY,
  'tdd-cycle': TDD_CYCLE,
  'node-module-resolution': NODE_MODULE_RESOLUTION,
  'node-loop-phases': NODE_LOOP_PHASES,
  'express-middleware-chain': EXPRESS_MIDDLEWARE_CHAIN,
  'next-client-boundary': NEXT_CLIENT_BOUNDARY,
  'next-data-waterfall': NEXT_DATA_WATERFALL,
  'next-action-flow': NEXT_ACTION_FLOW,
};
