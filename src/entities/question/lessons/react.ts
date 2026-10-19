import type { Lesson } from '../model/types';

const REACT = 'https://react.dev';

export const REACT_LESSONS: Lesson[] = [
  {
    tag: 'rendering',
    format: 'steps',
    summary: {
      ru: 'Рендер в React — вызов функции компонента и сравнение результата с прошлым. Разберём, что запускает рендер, как React сохраняет состояние по позиции в дереве и какие ошибки в JSX встречаются чаще всего.',
      en: 'A render in React is a call to the component function and a comparison of the result with the previous one. We’ll cover what triggers a render, how React keeps state by position in the tree and the most common JSX mistakes.',
    },
    steps: [
      {
        id: 'triggers',
        title: { ru: 'Что запускает рендер', en: 'What triggers a render' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Компонент рендерится, когда меняется его состояние, когда рендерится родитель — по умолчанию React перерисовывает всех потомков — или когда меняется контекст, который он читает. Рендер — это только вызов функции и получение нового дерева. Затем React сравнивает его с прошлым (**reconciliation**) и вносит в DOM минимальные изменения на этапе **коммита**.',
              en: 'A component renders when its state changes, when its parent renders — by default React re-renders all descendants — or when a context it reads changes. Rendering is only calling the function and getting a new tree. Then React compares it with the previous one (**reconciliation**) and applies minimal DOM changes in the **commit** phase.',
            },
          },
          { type: 'diagram', diagram: 'react-render-commit' },
        ],
        test: ['react-rendering-001', 'react-rendering-002'],
      },
      {
        id: 'position',
        title: { ru: 'Состояние живёт в позиции', en: 'State lives at a position' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'React привязывает состояние к **позиции в дереве**, а не к строке JSX. Компонент того же типа на том же месте сохраняет состояние, даже если его отрисовала другая ветка условия. Другой тип на этом месте — поддерево пересоздаётся. Отсюда ловушка: компонент, объявленный **внутри** другого, — новая функция на каждом рендере, то есть новый тип, и его состояние сбрасывается каждый раз.',
              en: 'React ties state to a **position in the tree**, not to a JSX line. A component of the same type at the same place keeps its state even if a different condition branch rendered it. A different type there — the subtree is recreated. Hence the trap: a component declared **inside** another is a new function on every render, i.e. a new type, and its state resets every time.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'inner-component',
              prompt: {
                ru: 'Почему компоненты не объявляют внутри других компонентов?',
                en: 'Why aren’t components declared inside other components?',
              },
              options: [
                { text: { ru: 'Это запрещено синтаксисом', en: 'The syntax forbids it' } },
                { text: { ru: 'Каждый рендер создаёт новый тип, и состояние вложенного компонента сбрасывается', en: 'Each render creates a new type, and the nested component’s state resets' } },
                { text: { ru: 'Так нельзя передать пропсы', en: 'Props can’t be passed that way' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Для React новая функция — другой компонент: старый размонтируется вместе с состоянием и DOM.',
                en: 'To React a new function is a different component: the old one unmounts along with its state and DOM.',
              },
            },
          },
        ],
        test: ['react-rendering-003', 'react-rendering-004'],
      },
      {
        id: 'jsx-traps',
        title: { ru: 'Ловушки JSX', en: 'JSX traps' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`onClick={remove(id)}` **вызывает** функцию прямо во время рендера и передаёт её результат; нужна сама функция: `onClick={() => remove(id)}`. `{count && <Badge />}` при `count = 0` нарисует `0`: React не рисует `false`, `null` и `undefined`, а число рисует — слева от `&&` ставят логическое выражение. Портал меняет только место в DOM: события из него всплывают по дереву React к родителям в JSX.',
              en: '`onClick={remove(id)}` **calls** the function right during render and passes its result; you need the function itself: `onClick={() => remove(id)}`. `{count && <Badge />}` with `count = 0` renders `0`: React doesn’t render `false`, `null` or `undefined`, but it renders numbers — put a boolean left of `&&`. A portal changes only the DOM location: its events bubble through the React tree to JSX parents.',
            },
          },
        ],
        test: ['react-rendering-bug-001', 'react-rendering-007'],
      },
      {
        id: 'purity',
        title: { ru: 'Чистый рендер и переходы', en: 'Pure rendering and transitions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Компонент должен быть [[pure-function|чистой функцией]]: одинаковые пропсы и состояние — одинаковый JSX, без побочных эффектов во время рендера. `<StrictMode>` в разработке вызывает рендер дважды, чтобы такие нарушения проявились. Тяжёлый рендер можно пометить несрочным: обновление внутри `startTransition` из `useTransition` React готовит в фоне и прерывает ради ввода и кликов, а `isPending` показывает, что переход идёт.',
              en: 'A component must be a [[pure-function|pure function]]: same props and state — same JSX, with no side effects during render. In development `<StrictMode>` renders twice so such violations surface. A heavy render can be marked non-urgent: React prepares an update inside `startTransition` from `useTransition` in the background and interrupts it for typing and clicks, while `isPending` shows the transition is running.',
            },
          },
        ],
        test: ['react-strict-001', 'react-rendering-006'],
      },
    ],
    keyPoints: [
      { ru: 'Рендер: состояние, родитель или контекст.', en: 'Render triggers: state, parent or context.' },
      { ru: 'Состояние привязано к позиции и типу.', en: 'State is tied to position and type.' },
      { ru: '`onClick` ждёт функцию, `0 &&` рисует ноль.', en: '`onClick` needs a function; `0 &&` renders zero.' },
      { ru: 'Рендер чистый, тяжёлое — в `startTransition`.', en: 'Rendering is pure; heavy updates go in `startTransition`.' },
    ],
    sources: [
      { title: 'React — Render and commit', url: `${REACT}/learn/render-and-commit` },
      { title: 'React — Preserving and resetting state', url: `${REACT}/learn/preserving-and-resetting-state` },
      { title: 'React — Keeping components pure', url: `${REACT}/learn/keeping-components-pure` },
      { title: 'React — useTransition', url: `${REACT}/reference/react/useTransition` },
    ],
  },  {
    tag: 'state',
    format: 'steps',
    summary: {
      ru: 'Состояние — данные, которые меняются со временем и вызывают перерисовку. Разберём, почему состояние — это снимок, почему его нельзя мутировать, как React группирует обновления и где состоянию место.',
      en: 'State is data that changes over time and triggers re-renders. We’ll see why state is a snapshot, why it mustn’t be mutated, how React batches updates and where state belongs.',
    },
    steps: [
      {
        id: 'snapshot',
        title: { ru: 'Состояние — снимок', en: 'State is a snapshot' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Внутри одного рендера состояние не меняется: переменная `count` — снимок на момент рендера. `setCount` не меняет её сразу, а заказывает новый рендер. Поэтому три вызова `setCount(count + 1)` подряд трижды попросят одно и то же значение. Чтобы опираться на предыдущее значение, передают функцию-обновление: `setCount((c) => c + 1)` — React применит такие функции по очереди.',
              en: 'Within one render state doesn’t change: the `count` variable is a snapshot at render time. `setCount` doesn’t change it right away but requests a new render. So three `setCount(count + 1)` calls in a row ask for the same value three times. To build on the previous value, pass an updater: `setCount((c) => c + 1)` — React applies such functions in order.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: 'function addTwo() {\n  setScore((s) => s + 1);\n  setScore((s) => s + 1);\n}\n// score grows by 2',
            },
          },
        ],
        test: ['react-state-001'],
      },
      {
        id: 'immutability',
        title: { ru: 'Не мутировать', en: 'Don’t mutate' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'React сравнивает новое и старое состояние через `Object.is`. Если изменить поле объекта и передать в `setState` тот же объект, ссылка не изменится — React решит, что ничего не произошло, и пропустит обновление. Поэтому в состояние всегда кладут **новый** объект или массив: `setUser({ ...user, name })`, `setItems([...items, item])`, `items.filter(…)`.',
              en: 'React compares new and old state with `Object.is`. If you change an object field and pass the same object to `setState`, the reference doesn’t change — React decides nothing happened and skips the update. So state always gets a **new** object or array: `setUser({ ...user, name })`, `setItems([...items, item])`, `items.filter(…)`.',
            },
          },
        ],
        test: ['react-state-002'],
      },
      {
        id: 'batching',
        title: { ru: 'Группировка обновлений', en: 'Batching updates' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'С React 18 работает **автоматический батчинг**: несколько обновлений состояния подряд дают один рендер — не только в обработчиках событий, но и в `setTimeout`, промисах и нативных обработчиках. В React 17 вне обработчиков React-событий каждое обновление вызывало отдельный рендер. Принудительно отрисовать синхронно позволяет `flushSync`, но нужен он редко.',
              en: 'Since React 18 **automatic batching** works: several state updates in a row produce one render — not only in event handlers but also in `setTimeout`, promises and native handlers. In React 17 outside React event handlers every update caused a separate render. `flushSync` forces a synchronous render, but it’s rarely needed.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'batch-promise',
              prompt: {
                ru: 'В React 19 после `await fetch()` вызывают три разных `setState`. Сколько будет рендеров?',
                en: 'In React 19 three different `setState` calls run after `await fetch()`. How many renders?',
              },
              options: [
                { text: { ru: 'Три', en: 'Three' } },
                { text: { ru: 'Один', en: 'One' } },
                { text: { ru: 'Ни одного', en: 'None' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Автоматический батчинг группирует обновления в любом месте, в том числе после `await`.',
                en: 'Automatic batching groups updates anywhere, including after `await`.',
              },
            },
          },
        ],
        test: ['react-state-003'],
      },
      {
        id: 'structure',
        title: { ru: 'Где хранить состояние', en: 'Where state belongs' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Если два соседа показывают и меняют одно значение, его **поднимают** в ближайшего общего родителя и передают вниз значение и обработчики — у данных один источник истины. Значения, которые можно вычислить из пропсов и состояния, не хранят: их считают прямо при рендере. Когда много связанных полей меняются в разных обработчиках, логику обновлений собирают в `useReducer`.',
              en: 'If two siblings show and change one value, **lift** it to the nearest common parent and pass the value and handlers down — the data has one source of truth. Values computable from props and state aren’t stored: compute them right during render. When many related fields change in different handlers, gather the update logic into `useReducer`.',
            },
          },
        ],
        test: ['react-state-004', 'react-state-005'],
      },
    ],
    keyPoints: [
      { ru: 'Состояние — снимок; от прошлого — через функцию-обновление.', en: 'State is a snapshot; build on the previous via an updater.' },
      { ru: 'В состояние — только новые объекты.', en: 'Only new objects go into state.' },
      { ru: 'React 18+ группирует обновления везде.', en: 'React 18+ batches updates everywhere.' },
      { ru: 'Общее — в общий родитель, вычисляемое — при рендере.', en: 'Shared goes to a common parent; derived is computed in render.' },
    ],
    sources: [
      { title: 'React — State as a snapshot', url: `${REACT}/learn/state-as-a-snapshot` },
      { title: 'React — Updating objects in state', url: `${REACT}/learn/updating-objects-in-state` },
      { title: 'React — Sharing state between components', url: `${REACT}/learn/sharing-state-between-components` },
    ],
  },  {
    tag: 'keys',
    format: 'steps',
    summary: {
      ru: '`key` говорит React, какой элемент в новом рендере соответствует какому в старом. От ключей зависит, сохранится ли состояние элементов списка и сбросится ли компонент.',
      en: '`key` tells React which element in the new render matches which in the old one. Keys decide whether list items keep their state and whether a component resets.',
    },
    steps: [
      {
        id: 'why-keys',
        title: { ru: 'Зачем ключи', en: 'Why keys' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'По `key` React сопоставляет элементы массива между рендерами: какой компонент был каким. Так он переиспользует нужные DOM-узлы и состояние при вставках, удалениях и перестановках, а не путает их. Лучший ключ — стабильный уникальный id из данных. Ключ должен быть уникален только среди соседей в одном списке.',
              en: 'React matches array items between renders by `key`: which component was which. That way it reuses the right DOM nodes and state on inserts, removals and reorders instead of mixing them up. The best key is a stable unique id from the data. A key needs to be unique only among siblings in one list.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: '{todos.map((todo) => (\n  <TodoRow key={todo.id} todo={todo} />\n))}',
            },
          },
        ],
        test: ['react-keys-001'],
      },
      {
        id: 'index-keys',
        title: { ru: 'Индекс как ключ', en: 'The index as a key' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Индекс описывает **позицию**, а не элемент. Пока порядок не меняется, это работает. Но вставьте элемент в начало: новый получит `key=0`, бывший первый — `key=1`, и состояние полей ввода останется у позиций — введённый текст «съедет» на соседний элемент. Индекс допустим только для статичных списков без перестановок, фильтрации и вставок не в конец.',
              en: 'An index describes a **position**, not an item. While the order doesn’t change, it works. But insert an item at the start: the new one gets `key=0`, the former first gets `key=1`, and input state stays with the positions — typed text “shifts” to a neighbor. An index is fine only for static lists with no reordering, filtering or inserts except at the end.',
            },
          },
        ],
        test: ['react-keys-002'],
      },
      {
        id: 'bad-keys',
        title: { ru: 'Нестабильные ключи', en: 'Unstable keys' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ключ должен быть **стабильным** между рендерами. `key={Math.random()}` или `crypto.randomUUID()` прямо в JSX меняются каждый раз: React считает все элементы новыми, размонтирует старые и создаёт новые — состояние и фокус теряются, а производительность падает. Если в данных нет id, его создают один раз при получении данных, а не при рендере.',
              en: 'A key must be **stable** across renders. `key={Math.random()}` or `crypto.randomUUID()` right in JSX change every time: React treats every item as new, unmounts the old ones and creates new ones — state and focus are lost and performance drops. If the data has no id, create one once when the data arrives, not during render.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'stable-key',
              prompt: {
                ru: 'Где правильно генерировать id для элементов, у которых его нет?',
                en: 'Where is the right place to generate ids for items that lack one?',
              },
              options: [
                { text: { ru: 'Прямо в `key={…}` при рендере', en: 'Right in `key={…}` during render' } },
                { text: { ru: 'Один раз при создании или получении элемента', en: 'Once, when the item is created or received' } },
                { text: { ru: 'В `useEffect` после каждого рендера', en: 'In `useEffect` after every render' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Id, созданный один раз, остаётся с элементом и делает ключ стабильным.',
                en: 'An id created once stays with the item and makes the key stable.',
              },
            },
          },
        ],
        test: ['react-keys-003'],
      },
      {
        id: 'fragments-reset',
        title: { ru: 'Фрагменты и сброс', en: 'Fragments and resetting' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ключ ставят на верхний элемент, который возвращает `map`. Если это фрагмент, нужна полная запись `<Fragment key={…}>` — у `<>` атрибутов нет. Ключ полезен и вне списков: другой `key` означает для React другой компонент, поэтому `<Chat key={contact.id} />` при смене контакта пересоздаёт чат и сбрасывает его состояние без эффектов.',
              en: 'The key goes on the top element returned by `map`. If that’s a fragment, use the full `<Fragment key={…}>` form — `<>` takes no attributes. A key helps outside lists too: a different `key` means a different component to React, so `<Chat key={contact.id} />` recreates the chat and resets its state when the contact changes, with no effects.',
            },
          },
        ],
        test: ['react-keys-004', 'react-rendering-005'],
      },
    ],
    keyPoints: [
      { ru: 'Ключ — стабильный id из данных.', en: 'A key is a stable id from the data.' },
      { ru: 'Индекс — только для статичных списков.', en: 'An index works only for static lists.' },
      { ru: 'Случайный ключ пересоздаёт всё.', en: 'A random key recreates everything.' },
      { ru: 'Новый `key` — сброс состояния компонента.', en: 'A new `key` resets a component’s state.' },
    ],
    sources: [
      { title: 'React — Rendering lists', url: `${REACT}/learn/rendering-lists` },
      { title: 'React — Resetting state with a key', url: `${REACT}/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key` },
    ],
  },  {
    tag: 'effects',
    format: 'steps',
    summary: {
      ru: 'Эффекты синхронизируют компонент с внешним миром: подписками, таймерами, сетью. Разберём массив зависимостей, очистку, порядок запуска и типичные ошибки — устаревшие замыкания и гонки.',
      en: 'Effects synchronize a component with the outside world: subscriptions, timers, the network. We’ll cover the dependency array, cleanup, run order and typical bugs — stale closures and races.',
    },
    steps: [
      {
        id: 'deps',
        title: { ru: 'Массив зависимостей', en: 'The dependency array' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Без массива эффект запускается после **каждого** рендера. С пустым `[]` — один раз после монтирования. С `[a, b]` — после рендеров, в которых `a` или `b` изменились по `Object.is`. Все реактивные значения, которые читает эффект, — пропсы, состояние, переменные компонента — должны быть в зависимостях, иначе эффект не перезапустится, когда они изменятся.',
              en: 'Without an array an effect runs after **every** render. With an empty `[]` — once after mount. With `[a, b]` — after renders where `a` or `b` changed by `Object.is`. Every reactive value the effect reads — props, state, component variables — must be in the dependencies, or the effect won’t re-run when they change.',
            },
          },
        ],
        test: ['react-effects-002', 'react-effects-bug-001'],
      },
      {
        id: 'cleanup',
        title: { ru: 'Очистка', en: 'Cleanup' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Эффект может вернуть функцию очистки: отписаться, закрыть соединение, остановить таймер. Когда зависимость меняется, React сначала вызывает очистку **предыдущего** эффекта — со старыми значениями из её замыкания, — а потом запускает новый. При размонтировании вызывается последняя очистка. В разработке `<StrictMode>` один лишний раз прогоняет «эффект → очистка → эффект», чтобы проверить, что очистка всё отменяет.',
              en: 'An effect can return a cleanup function: unsubscribe, close a connection, stop a timer. When a dependency changes, React first calls the **previous** effect’s cleanup — with the old values from its closure — and then runs the new one. On unmount the last cleanup runs. In development `<StrictMode>` runs an extra “effect → cleanup → effect” cycle to check that cleanup undoes everything.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: 'useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);',
            },
          },
        ],
        test: ['react-effects-cleanup-order-001', 'react-effects-001'],
      },
      {
        id: 'order',
        title: { ru: 'Порядок запуска', en: 'Run order' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Рендер идёт сверху вниз: React вызывает родителя, получает детей и вызывает их. Эффекты запускаются **после коммита** в DOM и **снизу вверх**: сначала у детей, потом у родителя — к моменту эффекта родителя дети уже готовы. `useLayoutEffect` выполняется синхронно после изменения DOM, но до отрисовки кадра — для измерений без мигания.',
              en: 'Rendering goes top-down: React calls the parent, gets the children and calls them. Effects run **after the commit** to the DOM and **bottom-up**: children first, then the parent — by the parent’s effect the children are ready. `useLayoutEffect` runs synchronously after DOM changes but before the frame is painted — for flicker-free measurements.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'effect-after-dom',
              prompt: {
                ru: 'Доступен ли в `useEffect` DOM-узел, созданный в этом же рендере?',
                en: 'Is a DOM node created in the same render available in `useEffect`?',
              },
              options: [
                { text: { ru: 'Нет, DOM создаётся после эффектов', en: 'No, the DOM is created after effects' } },
                { text: { ru: 'Да: эффекты запускаются после коммита в DOM', en: 'Yes: effects run after the DOM commit' } },
                { text: { ru: 'Только в StrictMode', en: 'Only in StrictMode' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Сначала рендер, потом коммит в DOM, и только потом эффекты.',
                en: 'Render first, then the DOM commit, and only then effects.',
              },
            },
          },
        ],
        test: ['react-effects-order-001'],
      },
      {
        id: 'pitfalls',
        title: { ru: 'Устаревшие замыкания и гонки', en: 'Stale closures and races' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Колбэк внутри эффекта замыкает значения **того рендера**, в котором эффект создан. Интервал из эффекта с `[]` навсегда видит начальное состояние — помогает функция-обновление `setCount((c) => c + 1)`. Запросы из эффекта завершаются в любом порядке: ответ на старый запрос может прийти позже нового и перезаписать данные. Защита — флаг отмены в очистке или `AbortController`.',
              en: 'A callback inside an effect captures the values of the render **in which the effect was created**. An interval from an effect with `[]` forever sees the initial state — an updater `setCount((c) => c + 1)` fixes it. Requests from an effect finish in any order: a response to an old request can arrive after a new one and overwrite the data. The defense is an ignore flag in cleanup or an `AbortController`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: 'useEffect(() => {\n  let ignore = false;\n  load(id).then((data) => {\n    if (!ignore) setData(data);\n  });\n  return () => {\n    ignore = true;\n  };\n}, [id]);',
            },
          },
        ],
        test: ['react-effects-003'],
      },
    ],
    keyPoints: [
      { ru: 'Без массива — каждый рендер, `[]` — один раз.', en: 'No array — every render; `[]` — once.' },
      { ru: 'Очистка предыдущего эффекта — перед новым.', en: 'The previous effect’s cleanup runs before the new one.' },
      { ru: 'Эффекты — после коммита, снизу вверх.', en: 'Effects run after commit, bottom-up.' },
      { ru: 'Замыкания устаревают, ответы гоняются.', en: 'Closures go stale; responses race.' },
    ],
    sources: [
      { title: 'React — Synchronizing with effects', url: `${REACT}/learn/synchronizing-with-effects` },
      { title: 'React — Lifecycle of reactive effects', url: `${REACT}/learn/lifecycle-of-reactive-effects` },
      { title: 'React — useLayoutEffect', url: `${REACT}/reference/react/useLayoutEffect` },
    ],
  },  {
    tag: 'hooks-rules',
    format: 'steps',
    summary: {
      ru: 'Хуки работают, пока соблюдаются два правила: вызывать их на верхнем уровне и только из компонентов и кастомных хуков. Разберём, откуда берутся правила и как устроены кастомные хуки.',
      en: 'Hooks work as long as two rules hold: call them at the top level and only from components and custom hooks. We’ll see where the rules come from and how custom hooks work.',
    },
    steps: [
      {
        id: 'top-level',
        title: { ru: 'Только на верхнем уровне', en: 'Only at the top level' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'React различает хуки по **порядку вызова**: первый `useState` — первое состояние, второй — второе. Поэтому хуки вызывают на верхнем уровне компонента, в одном и том же порядке на каждом рендере: не в `if`, циклах и вложенных функциях. Условие переносят внутрь хука, например внутрь эффекта. Исключение — `use`: он читает промис или контекст и может стоять в условиях и циклах.',
              en: 'React tells hooks apart by **call order**: the first `useState` is the first state, the second is the second. So hooks are called at the component’s top level in the same order on every render: not in `if`s, loops or nested functions. Move the condition inside the hook, for example inside the effect. The exception is `use`: it reads a promise or context and may appear in conditions and loops.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: 'useEffect(() => {\n  if (!isOpen) return;\n  const off = subscribe();\n  return off;\n}, [isOpen]);',
            },
          },
        ],
        test: ['react-hooks-rules-001'],
      },
      {
        id: 'early-return',
        title: { ru: 'Хуки до раннего return', en: 'Hooks before an early return' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ранний `return` — тоже условие. Если хук стоит после него, на одних рендерах он вызывается, а на других нет, и порядок хуков меняется. React сообщит об ошибке «Rendered more hooks than during the previous render». Поэтому все хуки вызывают в начале компонента, а условный `return` ставят после них.',
              en: 'An early `return` is a condition too. If a hook comes after it, some renders call it and others don’t, so the hook order changes. React reports “Rendered more hooks than during the previous render”. So call all hooks at the start of the component and put the conditional `return` after them.',
            },
          },
        ],
        test: ['react-hooks-003'],
      },
      {
        id: 'where',
        title: { ru: 'Где вызывать хуки', en: 'Where to call hooks' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Хуки привязаны к рендеру конкретного компонента, поэтому их вызывают только во время рендера функционального компонента — напрямую или через кастомный хук. Внутри обработчиков событий, эффектов, `useMemo` и обычных функций хук не знает, к какому компоненту относится. Классовые компоненты хуки не поддерживают. Нарушения ловит линтер `eslint-plugin-react-hooks`.',
              en: 'Hooks are tied to a specific component’s render, so they’re called only while a function component renders — directly or via a custom hook. Inside event handlers, effects, `useMemo` and plain functions a hook doesn’t know which component it belongs to. Class components don’t support hooks. The `eslint-plugin-react-hooks` linter catches violations.',
            },
          },
        ],
        test: ['react-hooks-004'],
      },
      {
        id: 'custom-hooks',
        title: { ru: 'Кастомные хуки', en: 'Custom hooks' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Кастомный хук — обычная функция с префиксом `use`, которая вызывает другие хуки. Он переиспользует **логику**, а не состояние: каждый компонент, вызвавший `useCart()`, получает собственное состояние. Чтобы делить данные между компонентами, их поднимают в общего родителя, контекст или стор. По префиксу `use` линтер и React Compiler узнают хук и проверяют правила.',
              en: 'A custom hook is a plain function with the `use` prefix that calls other hooks. It reuses **logic**, not state: every component calling `useCart()` gets its own state. To share data between components, lift it to a common parent, context or a store. The linter and React Compiler recognize a hook by the `use` prefix and check the rules.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'hook-state-sharing',
              prompt: {
                ru: 'Шапка и корзина вызывают один и тот же `useToggle()`. Переключение в шапке изменит состояние в корзине?',
                en: 'The header and the cart call the same `useToggle()`. Will toggling in the header change the cart’s state?',
              },
              options: [
                { text: { ru: 'Да, хук общий', en: 'Yes, the hook is shared' } },
                { text: { ru: 'Нет: у каждого вызова своё состояние', en: 'No: each call has its own state' } },
                { text: { ru: 'Только если они соседи', en: 'Only if they’re siblings' } },
              ],
              answer: 1,
              explanation: {
                ru: '`useState` внутри хука привязан к компоненту, который его вызвал.',
                en: '`useState` inside the hook is tied to the component that called it.',
              },
            },
          },
        ],
        test: ['react-hooks-002', 'react-hooks-005'],
      },
    ],
    keyPoints: [
      { ru: 'Хуки — по порядку, на верхнем уровне.', en: 'Hooks go in order, at the top level.' },
      { ru: 'Условный `return` — после хуков.', en: 'A conditional `return` goes after hooks.' },
      { ru: 'Только в компонентах и кастомных хуках.', en: 'Only in components and custom hooks.' },
      { ru: 'Кастомный хук делит логику, а не состояние.', en: 'A custom hook shares logic, not state.' },
    ],
    sources: [
      { title: 'React — Rules of Hooks', url: `${REACT}/reference/rules/rules-of-hooks` },
      { title: 'React — Reusing logic with custom hooks', url: `${REACT}/learn/reusing-logic-with-custom-hooks` },
    ],
  },  {
    tag: 'refs',
    format: 'steps',
    summary: {
      ru: 'Ref — «карман» компонента: значение, которое переживает рендеры, но не вызывает их. Через ref работают с DOM, хранят id таймеров и открывают родителю ограниченный набор методов.',
      en: 'A ref is a component’s “pocket”: a value that survives renders without triggering them. Refs work with the DOM, hold timer ids and expose a limited set of methods to a parent.',
    },
    steps: [
      {
        id: 'ref-vs-state',
        title: { ru: 'Ref или состояние', en: 'Ref or state' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`useRef` возвращает один и тот же изменяемый объект `{ current }` на всё время жизни компонента. Менять его можно напрямую, и React об этом не узнает — рендера не будет. Поэтому в ref кладут то, что не влияет на отображение: id таймера, предыдущее значение, ссылку на DOM-узел. Всё, что видно на экране, хранят в состоянии.',
              en: '`useRef` returns the same mutable `{ current }` object for the component’s whole lifetime. You can change it directly, and React won’t know — no render. So refs hold things that don’t affect output: a timer id, a previous value, a DOM node reference. Anything shown on screen lives in state.',
            },
          },
        ],
        test: ['react-refs-001'],
      },
      {
        id: 'mutable-values',
        title: { ru: 'Значения между рендерами', en: 'Values across renders' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Обычная переменная внутри компонента создаётся заново на каждом рендере, поэтому сохранить в ней id таймера между рендерами нельзя. `useState` сохранит значение, но каждое изменение вызовет лишний рендер. Ref хранит значение без рендеров — идеальное место для id таймеров, подписок и флагов вроде «уже отправили».',
              en: 'A plain variable inside a component is recreated on every render, so it can’t keep a timer id between renders. `useState` would keep the value, but each change triggers an extra render. A ref stores the value with no renders — the ideal place for timer ids, subscriptions and flags like “already sent”.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: 'const id = useRef(null);\nconst start = () => {\n  id.current = setInterval(tick, 500);\n};\nconst stop = () => {\n  clearInterval(id.current);\n};',
            },
          },
        ],
        test: ['react-refs-004'],
      },
      {
        id: 'dom-refs',
        title: { ru: 'Ref на DOM', en: 'DOM refs' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Атрибут `ref={inputRef}` просит React записать DOM-узел в `inputRef.current`. Делает он это на этапе коммита, уже **после** рендера: во время первого рендера там начальное значение `null`. Поэтому с DOM через ref работают в обработчиках событий и эффектах, а не в теле компонента.',
              en: 'The `ref={inputRef}` attribute asks React to put the DOM node into `inputRef.current`. It does this in the commit phase, **after** rendering: during the first render it holds the initial `null`. So you work with the DOM via refs in event handlers and effects, not in the component body.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'ref-in-handler',
              prompt: {
                ru: 'Где безопасно вызвать `inputRef.current.focus()`?',
                en: 'Where is it safe to call `inputRef.current.focus()`?',
              },
              options: [
                { text: { ru: 'Прямо в теле компонента', en: 'Right in the component body' } },
                { text: { ru: 'В обработчике события или эффекте', en: 'In an event handler or an effect' } },
                { text: { ru: 'В `useMemo`', en: 'In `useMemo`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'К моменту обработчиков и эффектов коммит уже прошёл, и узел записан в ref.',
                en: 'By the time handlers and effects run, the commit is done and the node is in the ref.',
              },
            },
          },
        ],
        test: ['react-refs-003'],
      },
      {
        id: 'ref-prop',
        title: { ru: 'ref как проп и useImperativeHandle', en: 'ref as a prop and useImperativeHandle' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'С React 19 функциональный компонент получает `ref` как обычный проп — `forwardRef` больше не нужен. Если родителю нужно не всё DOM-дерево, а пара действий, `useImperativeHandle(ref, () => ({ focus }))` отдаёт ему объект с этими методами. Ref-колбэк `ref={(node) => …}` вызывается, когда узел появляется в DOM, а в React 19 может вернуть функцию очистки, которую React вызовет при исчезновении узла.',
              en: 'Since React 19 a function component receives `ref` as an ordinary prop — `forwardRef` is no longer needed. If the parent needs a couple of actions rather than the whole DOM, `useImperativeHandle(ref, () => ({ focus }))` hands it an object with those methods. A ref callback `ref={(node) => …}` runs when the node appears in the DOM, and in React 19 it can return a cleanup that React calls when the node goes away.',
            },
          },
        ],
        test: ['react-refs-002', 'react-refs-imperative-001'],
      },
    ],
    keyPoints: [
      { ru: 'Ref меняется без рендера.', en: 'A ref changes without a render.' },
      { ru: 'id таймеров и флаги — в ref, видимое — в состоянии.', en: 'Timer ids and flags go in refs; visible data in state.' },
      { ru: 'DOM-узел в ref — после коммита.', en: 'The DOM node lands in the ref after commit.' },
      { ru: 'React 19: `ref` — проп, ref-колбэк с очисткой.', en: 'React 19: `ref` is a prop; ref callbacks can clean up.' },
    ],
    sources: [
      { title: 'React — Referencing values with refs', url: `${REACT}/learn/referencing-values-with-refs` },
      { title: 'React — Manipulating the DOM with refs', url: `${REACT}/learn/manipulating-the-dom-with-refs` },
      { title: 'React — useImperativeHandle', url: `${REACT}/reference/react/useImperativeHandle` },
    ],
  },  {
    tag: 'forms',
    format: 'steps',
    summary: {
      ru: 'Формы в React бывают контролируемыми и неконтролируемыми, а в React 19 у них появились Actions. Разберём, где хранится значение поля, как собрать данные формы и как показать статус отправки.',
      en: 'React forms can be controlled or uncontrolled, and React 19 added Actions. We’ll see where a field’s value lives, how to collect form data and how to show submission status.',
    },
    steps: [
      {
        id: 'controlled',
        title: { ru: 'Контролируемые и неконтролируемые', en: 'Controlled and uncontrolled' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'У **контролируемого** поля источник истины — состояние React: `value` из состояния, изменения через `onChange`. Это даёт мгновенную валидацию и форматирование. `value` без `onChange` делает поле «замороженным»: React каждый раз возвращает значение из состояния. **Неконтролируемое** поле хранит значение в DOM: начальное задают `defaultValue`, читают через ref или `FormData`.',
              en: 'A **controlled** field’s source of truth is React state: `value` from state, changes via `onChange`. That enables instant validation and formatting. `value` without `onChange` “freezes” the field: React keeps resetting it to the state value. An **uncontrolled** field keeps its value in the DOM: set the initial one with `defaultValue`, read it via a ref or `FormData`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: '<input\n  value={email}\n  onChange={(e) =>\n    setEmail(e.target.value)\n  }\n/>\n<input name="tag" defaultValue="news" />',
            },
          },
        ],
        test: ['react-forms-001', 'react-forms-002'],
      },
      {
        id: 'form-data',
        title: { ru: 'FormData', en: 'FormData' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`new FormData(event.currentTarget)` в обработчике `onSubmit` собирает значения всех полей формы по их атрибутам `name`, а `Object.fromEntries(formData)` превращает результат в объект. Не забудьте `event.preventDefault()`, иначе браузер отправит форму и перезагрузит страницу. Для больших форм это проще, чем состояние на каждое поле.',
              en: '`new FormData(event.currentTarget)` in an `onSubmit` handler collects the values of all form fields by their `name` attributes, and `Object.fromEntries(formData)` turns them into an object. Don’t forget `event.preventDefault()`, or the browser submits the form and reloads the page. For big forms that’s simpler than state per field.',
            },
          },
        ],
        test: ['react-forms-004'],
      },
      {
        id: 'ids',
        title: { ru: 'Связь label и поля', en: 'Linking label and field' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`<label htmlFor={id}>` связывается с полем через одинаковый `id`. Если компонент поля используют на странице несколько раз, захардкоженный id повторится. `useId()` даёт уникальный стабильный идентификатор для каждого экземпляра и совпадает при серверном рендере и гидратации; `Math.random()` меняется между рендерами и даёт расхождение.',
              en: '`<label htmlFor={id}>` links to the field through a matching `id`. If a field component appears on the page several times, a hard-coded id repeats. `useId()` gives each instance a unique stable id that matches between server rendering and hydration; `Math.random()` changes between renders and causes mismatches.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'use-id-keys',
              prompt: {
                ru: 'Можно ли использовать `useId()` для `key` элементов списка?',
                en: 'Can `useId()` be used for list item `key`s?',
              },
              options: [
                { text: { ru: 'Да, он уникален', en: 'Yes, it’s unique' } },
                { text: { ru: 'Нет: ключи берут из данных, а `useId` — для атрибутов доступности', en: 'No: keys come from data, and `useId` is for accessibility attributes' } },
                { text: { ru: 'Только на сервере', en: 'Only on the server' } },
              ],
              answer: 1,
              explanation: {
                ru: '`useId` даёт id экземпляру компонента, а ключ должен описывать элемент данных.',
                en: '`useId` identifies a component instance, while a key must describe a data item.',
              },
            },
          },
        ],
        test: ['react-forms-003'],
      },
      {
        id: 'actions',
        title: { ru: 'Actions в React 19', en: 'Actions in React 19' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В React 19 в `<form action={fn}>` можно передать функцию. React сам перехватывает отправку, вызывает её с `FormData` внутри перехода, а после успеха сбрасывает неконтролируемые поля. Статус отправки читает `useFormStatus()` — но только в компоненте, отрисованном **внутри** `<form>`, например в кнопке: форма для него как провайдер контекста.',
              en: 'In React 19 you can pass a function to `<form action={fn}>`. React intercepts the submit, calls it with `FormData` inside a transition and, on success, resets uncontrolled fields. `useFormStatus()` reads the submission status — but only in a component rendered **inside** the `<form>`, such as a button: the form acts like a context provider for it.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: 'function SaveButton() {\n  const { pending } = useFormStatus();\n  return <button disabled={pending}>\n    Save\n  </button>;\n}',
            },
          },
        ],
        test: ['react-19-004'],
      },
    ],
    keyPoints: [
      { ru: 'Контролируемое поле — `value` + `onChange`.', en: 'A controlled field is `value` + `onChange`.' },
      { ru: 'Неконтролируемое — `defaultValue` и `FormData`.', en: 'Uncontrolled — `defaultValue` and `FormData`.' },
      { ru: 'id для `label` — `useId()`.', en: 'Ids for `label` come from `useId()`.' },
      { ru: '`useFormStatus` — внутри формы.', en: '`useFormStatus` goes inside the form.' },
    ],
    sources: [
      { title: 'React — <input>', url: `${REACT}/reference/react-dom/components/input` },
      { title: 'React — <form>', url: `${REACT}/reference/react-dom/components/form` },
      { title: 'React — useFormStatus', url: `${REACT}/reference/react-dom/hooks/useFormStatus` },
    ],
  },  {
    tag: 'context',
    format: 'steps',
    summary: {
      ru: 'Контекст передаёт значение глубоко по дереву без пропсов на каждом уровне. Разберём, когда он уместен, что вернёт `useContext` без провайдера и почему контекст легко вызывает лишние перерисовки.',
      en: 'Context passes a value deep down the tree without props at every level. We’ll see when it fits, what `useContext` returns without a provider and why context easily causes extra re-renders.',
    },
    steps: [
      {
        id: 'when',
        title: { ru: 'Когда нужен контекст', en: 'When context fits' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Контекст хорош для данных, которые нужны многим компонентам на разной глубине: тема, текущий пользователь, локаль. Но он делает зависимость неявной: по пропсам уже не видно, откуда пришли данные. Если проброс неглубокий, лучше пропсы; если мешают промежуточные компоненты — композиция: передать готовый элемент через `children`.',
              en: 'Context suits data many components at different depths need: theme, current user, locale. But it makes the dependency implicit: props no longer show where data comes from. For shallow passing, props are better; if intermediate components get in the way — composition: pass a ready element through `children`.',
            },
          },
        ],
        test: ['react-context-004'],
      },
      {
        id: 'provider',
        title: { ru: 'Провайдер и значение по умолчанию', en: 'Provider and default value' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Аргумент `createContext(defaultValue)` используется, когда выше по дереву провайдера нет. Его делают осмысленным (тема по умолчанию) или `null`, чтобы свой хук `useTheme` бросал понятную ошибку. В React 19 сам объект контекста работает как провайдер: `<ThemeContext value="dark">`; запись `.Provider` объявлена устаревающей.',
              en: 'The `createContext(defaultValue)` argument is used when there’s no provider above in the tree. Make it meaningful (a default theme) or `null` so your `useTheme` hook throws a clear error. In React 19 the context object itself works as a provider: `<ThemeContext value="dark">`; the `.Provider` form is being deprecated.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: "const Locale = createContext('en');\n\n<Locale value=\"ru\">\n  <App />\n</Locale>",
            },
          },
        ],
        test: ['react-context-003', 'react-19-context-provider-001'],
      },
      {
        id: 'rerenders',
        title: { ru: 'Кто перерисуется', en: 'Who re-renders' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Когда провайдер получает новое значение (сравнение через `Object.is`), React перерисовывает **каждый** компонент, который читает этот контекст, — даже если между ним и провайдером стоит `memo`: подписка на контекст находится внутри компонента. Поэтому в контекст не кладут быстро меняющиеся данные, нужные немногим.',
              en: 'When a provider gets a new value (compared with `Object.is`), React re-renders **every** component reading that context — even with `memo` between it and the provider: the context subscription lives inside the component. So fast-changing data needed by few doesn’t belong in context.',
            },
          },
          { type: 'diagram', diagram: 'stores-context-rerender' },
        ],
        test: ['react-context-001'],
      },
      {
        id: 'value-identity',
        title: { ru: 'Стабильное значение и разделение', en: 'A stable value and splitting' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Литерал `value={{ user, setUser }}` — новый объект на каждом рендере провайдера, и все потребители перерисуются, даже если `user` не менялся. Значение оборачивают в `useMemo`. Если в одном контексте лежат данные с разной частотой изменений — курсор и настройки, — его делят на два контекста: изменение одного не трогает потребителей другого.',
              en: 'The literal `value={{ user, setUser }}` is a new object on every provider render, so all consumers re-render even if `user` didn’t change. Wrap the value in `useMemo`. If one context holds data changing at different rates — a cursor and settings — split it into two contexts: changing one doesn’t touch the other’s consumers.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'memo-value',
              prompt: {
                ru: 'Как сделать `value` провайдера стабильным между рендерами?',
                en: 'How do you keep a provider’s `value` stable across renders?',
              },
              options: [
                { text: { ru: 'Обернуть провайдер в `memo`', en: 'Wrap the provider in `memo`' } },
                { text: { ru: 'Собрать объект в `useMemo` с нужными зависимостями', en: 'Build the object in `useMemo` with the right dependencies' } },
                { text: { ru: 'Передавать `value` строкой', en: 'Pass `value` as a string' } },
              ],
              answer: 1,
              explanation: {
                ru: '`useMemo` вернёт тот же объект, пока зависимости не изменились, и потребители не перерисуются зря.',
                en: '`useMemo` returns the same object until dependencies change, so consumers don’t re-render needlessly.',
              },
            },
          },
        ],
        test: ['react-context-002'],
      },
    ],
    keyPoints: [
      { ru: 'Контекст — для данных многим на разной глубине.', en: 'Context is for data many need at different depths.' },
      { ru: 'Без провайдера — значение по умолчанию.', en: 'Without a provider — the default value.' },
      { ru: 'Новое значение перерисует всех потребителей, `memo` не спасёт.', en: 'A new value re-renders all consumers; `memo` won’t help.' },
      { ru: '`value` — в `useMemo`, разное по частоте — в разные контексты.', en: '`value` in `useMemo`; different rates in different contexts.' },
    ],
    sources: [
      { title: 'React — Passing data deeply with context', url: `${REACT}/learn/passing-data-deeply-with-context` },
      { title: 'React — useContext', url: `${REACT}/reference/react/useContext` },
    ],
  },  {
    tag: 'memoization',
    format: 'steps',
    summary: {
      ru: 'Мемоизация избавляет от лишней работы при рендере, но работает только при стабильных ссылках. Разберём `useMemo`, `useCallback`, `memo`, ленивое начальное состояние и отложенные значения.',
      en: 'Memoization avoids extra work during rendering, but only with stable references. We’ll cover `useMemo`, `useCallback`, `memo`, lazy initial state and deferred values.',
    },
    steps: [
      {
        id: 'memo-callback',
        title: { ru: 'useMemo и useCallback', en: 'useMemo and useCallback' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`useMemo(() => compute(a), [a])` хранит **значение** и пересчитывает его, только когда изменились зависимости. `useCallback(fn, [a])` хранит **функцию**, чтобы её ссылка не менялась между рендерами. По сути `useCallback(fn, deps)` — это `useMemo(() => fn, deps)`. Обе нужны, когда вычисление дорогое или стабильная ссылка важна для `memo` или зависимостей эффекта.',
              en: '`useMemo(() => compute(a), [a])` keeps a **value** and recomputes it only when dependencies change. `useCallback(fn, [a])` keeps a **function** so its reference doesn’t change between renders. Essentially `useCallback(fn, deps)` is `useMemo(() => fn, deps)`. Both matter when the computation is expensive or a stable reference matters for `memo` or effect dependencies.',
            },
          },
        ],
        test: ['react-memo-002'],
      },
      {
        id: 'memo-props',
        title: { ru: 'memo и пропсы-функции', en: 'memo and function props' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`memo(Component)` пропускает рендер, если все пропсы равны по `Object.is`. Стрелочная функция или объект, созданные при рендере родителя, — каждый раз **новые**, поэтому сравнение не проходит и `memo` не срабатывает. Такие пропсы стабилизируют через `useCallback` и `useMemo` — или включают React Compiler, который сделает это сам.',
              en: '`memo(Component)` skips a render if all props are equal by `Object.is`. An arrow function or object created during the parent’s render is **new** every time, so the comparison fails and `memo` doesn’t help. Stabilize such props with `useCallback` and `useMemo` — or enable React Compiler, which does it for you.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: 'const remove = useCallback(\n  () => deleteItem(id),\n  [id],\n);\n<Row onRemove={remove} />',
            },
          },
        ],
        test: ['react-memo-001'],
      },
      {
        id: 'deps-identity',
        title: { ru: 'Зависимости-объекты', en: 'Object dependencies' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Зависимости сравниваются через `Object.is`. Если в массиве зависимостей объект, созданный прямо в теле компонента, он новый на каждом рендере — `useMemo` будет пересчитываться всегда, а эффект перезапускаться. Решение — зависеть от примитивов (`query`, `caseSensitive`) или создавать объект внутри самого `useMemo`.',
              en: 'Dependencies are compared with `Object.is`. If the array holds an object created right in the component body, it’s new on every render — `useMemo` always recomputes and an effect always re-runs. The fix is to depend on primitives (`query`, `caseSensitive`) or create the object inside the `useMemo` itself.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'object-dep',
              prompt: {
                ru: '`useEffect(…, [options])`, где `options = { page }` создаётся в теле компонента. Как часто сработает эффект?',
                en: '`useEffect(…, [options])` where `options = { page }` is created in the component body. How often does the effect run?',
              },
              options: [
                { text: { ru: 'Только при смене `page`', en: 'Only when `page` changes' } },
                { text: { ru: 'После каждого рендера', en: 'After every render' } },
                { text: { ru: 'Один раз', en: 'Once' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Каждый рендер создаёт новый объект. Зависеть нужно от `page`.',
                en: 'Every render creates a new object. Depend on `page` instead.',
              },
            },
          },
        ],
        test: ['react-memo-004'],
      },
      {
        id: 'lazy-deferred',
        title: { ru: 'Ленивая инициализация и отложенные значения', en: 'Lazy init and deferred values' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Аргумент `useState` нужен только при первом рендере, но выражение `useState(build())` вычисляется каждый раз — результат просто выбрасывается. Передайте функцию без вызова: `useState(build)` — React вызовет её один раз. Если медленный список тормозит ввод, `useDeferredValue(query)` отдаёт списку «отстающее» значение: поле обновляется сразу, а список — в фоне, и React прерывает этот рендер ради нового ввода.',
              en: 'The `useState` argument is needed only on the first render, yet `useState(build())` evaluates every time — the result is just discarded. Pass the function without calling it: `useState(build)` — React calls it once. If a slow list makes typing laggy, `useDeferredValue(query)` gives the list a “lagging” value: the field updates at once while the list updates in the background, and React interrupts that render for new input.',
            },
          },
        ],
        test: ['react-state-006', 'react-deferred-value-001'],
      },
    ],
    keyPoints: [
      { ru: '`useMemo` — значение, `useCallback` — функция.', en: '`useMemo` keeps a value; `useCallback` a function.' },
      { ru: '`memo` ломают новые функции и объекты в пропсах.', en: 'New functions and objects in props defeat `memo`.' },
      { ru: 'Зависимости — примитивы, а не свежие объекты.', en: 'Depend on primitives, not fresh objects.' },
      { ru: '`useState(fn)` — ленивая инициализация.', en: '`useState(fn)` is lazy initialization.' },
    ],
    sources: [
      { title: 'React — useMemo', url: `${REACT}/reference/react/useMemo` },
      { title: 'React — memo', url: `${REACT}/reference/react/memo` },
      { title: 'React — useDeferredValue', url: `${REACT}/reference/react/useDeferredValue` },
    ],
  },  {
    tag: 'suspense',
    format: 'steps',
    summary: {
      ru: '`Suspense` показывает запасной интерфейс, пока часть дерева не готова, а Error Boundary — когда она упала. Разберём ленивую загрузку, расстановку границ, переходы и обработку ошибок.',
      en: '`Suspense` shows a fallback while part of the tree isn’t ready, and an Error Boundary when it fails. We’ll cover lazy loading, placing boundaries, transitions and error handling.',
    },
    steps: [
      {
        id: 'lazy',
        title: { ru: 'lazy и Suspense', en: 'lazy and Suspense' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`lazy(() => import(\'./settings\'))` загружает код компонента при первом рендере, и сборщик выносит его в отдельный чанк. Пока модуль грузится, компонент **приостанавливается**, и ближайший `<Suspense>` выше по дереву показывает `fallback`. Без `Suspense` выше приостановка привела бы к ошибке.',
              en: '`lazy(() => import(\'./settings\'))` loads the component’s code on first render, and the bundler splits it into a separate chunk. While the module loads, the component **suspends**, and the nearest `<Suspense>` above shows its `fallback`. Without a `Suspense` above, suspending would cause an error.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: "const Chart = lazy(\n  () => import('./chart'),\n);\n\n<Suspense fallback={<Skeleton />}>\n  <Chart />\n</Suspense>",
            },
          },
        ],
        test: ['react-suspense-001'],
      },
      {
        id: 'boundaries',
        title: { ru: 'Где ставить границы', en: 'Where to place boundaries' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`<Suspense>` показывает fallback, пока приостановлен **любой** компонент внутри него. Одна общая граница ждёт самую медленную часть, и быстрые части тоже скрыты. Отдельные границы позволяют каждой части появиться, как только готовы её данные. Границы расставляют по смыслу: что пользователь готов видеть по частям, а что — только целиком.',
              en: '`<Suspense>` shows its fallback while **any** component inside is suspended. One shared boundary waits for the slowest part, hiding the fast parts too. Separate boundaries let each part appear as soon as its data is ready. Place boundaries by meaning: what the user is fine seeing piece by piece and what only as a whole.',
            },
          },
        ],
        test: ['react-suspense-004'],
      },
      {
        id: 'transitions',
        title: { ru: 'use и переходы', en: 'use and transitions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`use(promise)` приостанавливает рендер, пока промис не выполнится: ближайший `Suspense` покажет fallback, а затем `use` вернёт результат. Если уже показанный контент при новой загрузке сменяется спиннером, обновление заворачивают в `startTransition`: React продолжит показывать прежний экран, пока новый не готов, а `isPending` позволит приглушить старый.',
              en: '`use(promise)` suspends rendering until the promise resolves: the nearest `Suspense` shows its fallback, then `use` returns the result. If already-shown content gets replaced by a spinner on a new load, wrap the update in `startTransition`: React keeps showing the previous screen until the new one is ready, and `isPending` lets you dim the old one.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'transition-fallback',
              prompt: {
                ru: 'Что делает `startTransition`, если новый экран приостановился?',
                en: 'What does `startTransition` do if the new screen suspends?',
              },
              options: [
                { text: { ru: 'Сразу показывает fallback', en: 'Shows the fallback immediately' } },
                { text: { ru: 'Оставляет прежний экран, пока новый не готов', en: 'Keeps the previous screen until the new one is ready' } },
                { text: { ru: 'Отменяет загрузку', en: 'Cancels the load' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Переход несрочный: React не прячет уже показанный контент за спиннером.',
                en: 'A transition isn’t urgent: React doesn’t hide already-shown content behind a spinner.',
              },
            },
          },
        ],
        test: ['react-suspense-transition-001', 'react-19-003'],
      },
      {
        id: 'error-boundaries',
        title: { ru: 'Error Boundary', en: 'Error Boundary' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Error Boundary ловит ошибки, которые происходят во время **рендера**, в методах жизненного цикла и конструкторах дерева под ним, и показывает запасной интерфейс. Ошибки в обработчиках событий и асинхронном коде он не ловит — там нужен `try/catch`. Хука для этого нет: границу пишут классом с `static getDerivedStateFromError` и `componentDidCatch` или берут библиотеку react-error-boundary.',
              en: 'An Error Boundary catches errors thrown during **rendering**, in lifecycle methods and constructors of the tree below it, and shows a fallback UI. It doesn’t catch errors in event handlers or async code — use `try/catch` there. There’s no hook for it: a boundary is a class with `static getDerivedStateFromError` and `componentDidCatch`, or the react-error-boundary library.',
            },
          },
        ],
        test: ['react-suspense-002'],
      },
    ],
    keyPoints: [
      { ru: '`lazy` + `Suspense` — код по требованию.', en: '`lazy` + `Suspense` — code on demand.' },
      { ru: 'Отдельные границы — части появляются независимо.', en: 'Separate boundaries let parts appear independently.' },
      { ru: '`startTransition` не прячет готовый экран за спиннером.', en: '`startTransition` doesn’t hide a ready screen behind a spinner.' },
      { ru: 'Error Boundary — класс, ошибки обработчиков не ловит.', en: 'An Error Boundary is a class and misses handler errors.' },
    ],
    sources: [
      { title: 'React — Suspense', url: `${REACT}/reference/react/Suspense` },
      { title: 'React — lazy', url: `${REACT}/reference/react/lazy` },
      { title: 'React — Catching rendering errors with an error boundary', url: `${REACT}/reference/react/Component#catching-rendering-errors-with-an-error-boundary` },
    ],
  },  {
    tag: 'react-19',
    format: 'steps',
    summary: {
      ru: 'React 19 добавил Actions для асинхронных обновлений, оптимистичный интерфейс, метаданные в любом компоненте, `<Activity>` и компилятор. Разберём, что из этого спрашивают на собеседовании.',
      en: 'React 19 added Actions for async updates, optimistic UI, metadata in any component, `<Activity>` and a compiler. We’ll go through what interviews ask about.',
    },
    steps: [
      {
        id: 'action-state',
        title: { ru: 'useActionState', en: 'useActionState' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`useActionState(action, initialState)` оборачивает асинхронное действие и возвращает `[state, formAction, isPending]`: текущее состояние — то, что вернуло действие, например `{ error }`, — функцию для `<form action={…}>` или кнопки и флаг выполнения. Действие получает предыдущее состояние и данные формы, а ошибки валидации возвращает как данные.',
              en: '`useActionState(action, initialState)` wraps an async action and returns `[state, formAction, isPending]`: the current state — whatever the action returned, e.g. `{ error }` — a function for `<form action={…}>` or a button, and a pending flag. The action receives the previous state and form data, and returns validation errors as data.',
            },
          },
        ],
        test: ['react-19-001'],
      },
      {
        id: 'optimistic',
        title: { ru: 'useOptimistic', en: 'useOptimistic' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`useOptimistic(state, updateFn)` показывает ожидаемый результат сразу, пока асинхронное действие выполняется: отправленное сообщение, поставленный лайк. Когда действие завершится, React вернётся к настоящему состоянию — если запрос упал, оптимистичное значение просто исчезнет. Интерфейс откликается мгновенно без ручного отката.',
              en: '`useOptimistic(state, updateFn)` shows the expected result immediately while an async action runs: a sent message, a placed like. When the action finishes, React returns to the real state — if the request failed, the optimistic value simply disappears. The UI responds instantly with no manual rollback.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'optimistic-fail',
              prompt: {
                ru: 'Оптимистично добавили комментарий, но запрос упал. Что увидит пользователь?',
                en: 'A comment was added optimistically, but the request failed. What does the user see?',
              },
              options: [
                { text: { ru: 'Комментарий останется навсегда', en: 'The comment stays forever' } },
                { text: { ru: 'Комментарий исчезнет: React вернётся к настоящему состоянию', en: 'The comment disappears: React returns to the real state' } },
                { text: { ru: 'Страница перезагрузится', en: 'The page reloads' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Оптимистичное значение живёт только пока действие выполняется. Об ошибке стоит сказать отдельно.',
                en: 'The optimistic value lives only while the action runs. Report the error separately.',
              },
            },
          },
        ],
        test: ['react-19-002'],
      },
      {
        id: 'new-components',
        title: { ru: 'Метаданные и Activity', en: 'Metadata and Activity' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'С React 19 `<title>`, `<meta>` и `<link>` можно рендерить в любом компоненте: React сам поднимет их в `<head>`, а при серверном рендеринге они попадут в HTML. `<Activity mode="hidden">` (React 19.2) прячет часть интерфейса через `display: none`, очищает её эффекты, но сохраняет состояние и DOM до следующего показа — в отличие от условного рендера.',
              en: 'Since React 19, `<title>`, `<meta>` and `<link>` can be rendered in any component: React hoists them into `<head>`, and with server rendering they land in the HTML. `<Activity mode="hidden">` (React 19.2) hides part of the UI via `display: none`, cleans up its effects, but keeps state and DOM until shown again — unlike conditional rendering.',
            },
          },
        ],
        test: ['react-19-title-001', 'react-19-activity-001'],
      },
      {
        id: 'compiler',
        title: { ru: 'Компилятор и события эффектов', en: 'The compiler and effect events' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**React Compiler** — инструмент сборки, который сам расставляет мемоизацию компонентов и значений: ручные `useMemo`, `useCallback` и `memo` в большинстве случаев становятся не нужны. Он рассчитывает, что код соблюдает правила React. `useEffectEvent` (React 19.2) выносит из эффекта «событийную» часть: она видит свежие пропсы и состояние, но не является зависимостью, и эффект не перезапускается из-за неё.',
              en: '**React Compiler** is a build tool that inserts memoization of components and values by itself: manual `useMemo`, `useCallback` and `memo` become unnecessary in most cases. It relies on code following the rules of React. `useEffectEvent` (React 19.2) extracts the “event” part of an effect: it sees fresh props and state but isn’t a dependency, so the effect doesn’t re-run because of it.',
            },
          },
        ],
        test: ['react-memo-003'],
      },
    ],
    keyPoints: [
      { ru: '`useActionState` — состояние, действие и `isPending`.', en: '`useActionState` gives state, an action and `isPending`.' },
      { ru: '`useOptimistic` — мгновенный отклик с автооткатом.', en: '`useOptimistic` — instant feedback with auto-rollback.' },
      { ru: '`<title>` из любого компонента, `<Activity>` хранит состояние.', en: '`<title>` from any component; `<Activity>` keeps state.' },
      { ru: 'Компилятор мемоизирует сам.', en: 'The compiler memoizes for you.' },
    ],
    sources: [
      { title: 'React — React 19', url: `${REACT}/blog/2024/12/05/react-19` },
      { title: 'React — useActionState', url: `${REACT}/reference/react/useActionState` },
      { title: 'React — React Compiler', url: `${REACT}/learn/react-compiler` },
      { title: 'React — <Activity>', url: `${REACT}/reference/react/Activity` },
    ],
  },  {
    tag: 'server-components',
    format: 'steps',
    summary: {
      ru: 'Серверные компоненты выполняются на сервере и отправляют в браузер готовый результат. Разберём, что они умеют, где проходит граница с клиентскими компонентами и что можно передать через неё.',
      en: 'Server Components run on the server and send a ready result to the browser. We’ll see what they can do, where the boundary with Client Components lies and what can cross it.',
    },
    steps: [
      {
        id: 'what',
        title: { ru: 'Что умеет серверный компонент', en: 'What a Server Component can do' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '[[rsc|Серверный компонент]] выполняется на сервере или во время сборки. Он может быть `async` и получать данные прямо в теле — из базы, файлов или API, без эффектов и лоадеров. Но у него нет состояния, эффектов и обработчиков событий: он рендерится один раз и в браузере не живёт. Интерактивность выносят в клиентские компоненты.',
              en: 'A [[rsc|Server Component]] runs on the server or at build time. It can be `async` and fetch data right in its body — from a database, files or an API, with no effects or loaders. But it has no state, effects or event handlers: it renders once and doesn’t live in the browser. Interactivity moves to Client Components.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: 'async function Orders() {\n  const orders = await db.orders.list();\n  return <OrderTable rows={orders} />;\n}',
            },
          },
        ],
        test: ['react-rsc-001', 'react-rsc-003'],
      },
      {
        id: 'boundary',
        title: { ru: 'Граница "use client"', en: 'The "use client" boundary' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Директива `"use client"` в начале файла отмечает **границу**: этот модуль и всё, что он импортирует, становится клиентским кодом и попадает в бандл. Серверный компонент нельзя импортировать в клиентский — он станет клиентским. Зато его можно передать в клиентский компонент как `children`: серверная часть отрендерится на сервере и придёт готовой.',
              en: 'The `"use client"` directive at the top of a file marks a **boundary**: that module and everything it imports become client code and land in the bundle. A Server Component can’t be imported into a Client Component — it would become client code. But it can be passed into a Client Component as `children`: the server part renders on the server and arrives ready.',
            },
          },
          { type: 'diagram', diagram: 'next-client-boundary' },
        ],
        test: ['react-rsc-002'],
      },
      {
        id: 'props',
        title: { ru: 'Пропсы через границу', en: 'Props across the boundary' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Пропсы из серверного компонента в клиентский пересекают сеть: сервер сериализует их и отправляет вместе с результатом рендера. Поэтому годятся только сериализуемые значения — строки, числа, массивы, обычные объекты, промисы и JSX. Обычную функцию отправить нельзя; исключение — Server Actions с `"use server"`, которые клиент вызывает как удалённые функции.',
              en: 'Props from a Server Component to a Client Component cross the network: the server serializes them and sends them with the render result. So only serializable values work — strings, numbers, arrays, plain objects, promises and JSX. A plain function can’t be sent; the exception is Server Actions marked `"use server"`, which the client calls as remote functions.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'date-prop',
              prompt: {
                ru: 'Можно ли передать в клиентский компонент обработчик `onSelect={(id) => …}`, созданный в серверном?',
                en: 'Can a Server Component pass an `onSelect={(id) => …}` handler to a Client Component?',
              },
              options: [
                { text: { ru: 'Да, как любой проп', en: 'Yes, like any prop' } },
                { text: { ru: 'Нет: обычная функция не сериализуется — обработчик создают в клиентском компоненте', en: 'No: a plain function isn’t serializable — create the handler in the Client Component' } },
                { text: { ru: 'Только внутри `Suspense`', en: 'Only inside `Suspense`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Обработчик должен жить в браузере, значит, его объявляют на клиентской стороне границы.',
                en: 'A handler has to live in the browser, so it’s declared on the client side of the boundary.',
              },
            },
          },
        ],
        test: ['react-rsc-004'],
      },
      {
        id: 'bundle-secrets',
        title: { ru: 'Бандл и секреты', en: 'The bundle and secrets' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Код серверных компонентов и библиотек, которые им нужны только для рендера, — парсеры, форматтеры, подсветка кода — остаётся на сервере: в браузер приходит готовый результат, и бандл не растёт. По той же причине в серверном компоненте можно читать секреты из `process.env`, а в клиентском — нельзя: всё, что попало в бандл, видно в DevTools.',
              en: 'The code of Server Components and of libraries they need only for rendering — parsers, formatters, syntax highlighting — stays on the server: the browser gets the ready result, and the bundle doesn’t grow. For the same reason a Server Component may read secrets from `process.env`, while a Client Component may not: anything in the bundle is visible in DevTools.',
            },
          },
        ],
        test: ['react-rsc-006'],
      },
    ],
    keyPoints: [
      { ru: 'Серверный компонент — async и данные в теле, без состояния.', en: 'A Server Component is async with data in its body, no state.' },
      { ru: '`"use client"` переносит модуль и его импорты в бандл.', en: '`"use client"` moves the module and its imports into the bundle.' },
      { ru: 'Через границу — только сериализуемое и Server Actions.', en: 'Only serializable values and Server Actions cross the boundary.' },
      { ru: 'Серверный код и секреты не уходят в браузер.', en: 'Server code and secrets don’t reach the browser.' },
    ],
    sources: [
      { title: 'React — Server Components', url: `${REACT}/reference/rsc/server-components` },
      { title: 'React — "use client"', url: `${REACT}/reference/rsc/use-client` },
      { title: 'React — "use server"', url: `${REACT}/reference/rsc/use-server` },
    ],
  },
];
