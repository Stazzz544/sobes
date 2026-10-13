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

export const DIAGRAMS: Record<DiagramId, Diagram> = {
  'event-loop-basic': EVENT_LOOP_BASIC,
  'event-loop-async': EVENT_LOOP_ASYNC,
  'prototype-chain': PROTOTYPE_CHAIN,
  'closure-counters': CLOSURE_COUNTERS,
  'react-render-commit': REACT_RENDER_COMMIT,
  'critical-rendering-path': CRITICAL_RENDERING_PATH,
  'http-revalidation': HTTP_REVALIDATION,
};
