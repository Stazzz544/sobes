import type { Lesson } from '../model/types';

const REACT = 'https://react.dev';

export const REACT_LESSONS: Lesson[] = [
  {
    tag: 'rendering',
    summary: {
      ru: 'Рендер — вызов компонентов ради нового описания интерфейса. React сравнивает его с прошлым и меняет в DOM только разницу.',
      en: 'Rendering is calling components to get a new description of the UI. React compares it with the previous one and changes only the difference in the DOM.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Три шага. **Триггер**: изменился state, отрендерился родитель или изменился прочитанный контекст. **Рендер**: React вызывает компоненты и получает новое дерево элементов — это чистое вычисление, DOM не трогается. **Commit**: React применяет к DOM только отличия, затем запускает эффекты, а браузер рисует кадр.',
          en: 'Three steps. **Trigger**: state changed, a parent rendered, or a context that was read changed. **Render**: React calls components and gets a new element tree — a pure calculation, the DOM isn’t touched. **Commit**: React applies only the differences to the DOM, then runs effects, and the browser paints.',
        },
      },
      { type: 'diagram', diagram: 'react-render-commit' },
      {
        type: 'text',
        text: {
          ru: 'Когда рендерится родитель, по умолчанию рендерятся и все его дети — даже если их пропсы не изменились. [[reconciliation|Сравнение деревьев (reconciliation)]] идёт по позиции и типу: тот же тип на том же месте — компонент обновляется и сохраняет state; другой тип — поддерево пересоздаётся, и state теряется.',
          en: 'When a parent renders, all its children render too by default — even if their props didn’t change. [[reconciliation|Tree comparison (reconciliation)]] goes by position and type: the same type in the same place is updated and keeps its state; a different type recreates the subtree and the state is lost.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Child />
    </>
  );
}

function Child() {
  console.log('Child render');
  return <p>static</p>;
}`,
        },
        caption: {
          ru: 'Child рендерится при каждом клике, хотя пропсов у него нет.',
          en: 'Child renders on every click even though it has no props.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Рендер запускают: изменение state, рендер родителя, изменение прочитанного контекста.',
        en: 'A render is triggered by a state change, a parent render, or a change in a read context.',
      },
      { ru: 'Рендер — чистое вычисление, DOM меняется только в commit.', en: 'Render is a pure calculation; the DOM changes only in commit.' },
      {
        ru: 'Дети рендерятся вместе с родителем, даже если пропсы те же.',
        en: 'Children render with their parent even if their props are the same.',
      },
      {
        ru: 'Другой тип элемента на той же позиции — поддерево и state пересоздаются.',
        en: 'A different element type in the same position recreates the subtree and its state.',
      },
      { ru: 'Рендер не равен изменению DOM: React применяет только разницу.', en: 'Rendering isn’t a DOM update: React applies only the difference.' },
    ],
    sources: [
      { title: 'react.dev — Render and Commit', url: `${REACT}/learn/render-and-commit` },
      { title: 'react.dev — Preserving and Resetting State', url: `${REACT}/learn/preserving-and-resetting-state` },
    ],
  },
  {
    tag: 'keys',
    summary: {
      ru: '`key` помогает React сопоставить элементы списка между рендерами. Он должен быть стабильным и уникальным среди соседей.',
      en: '`key` helps React match list items between renders. It must be stable and unique among siblings.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'По `key` React понимает, какой элемент списка какой, когда элементы добавляют, удаляют или переставляют. Если ключ — индекс, после вставки в начало каждый элемент получает чужой индекс, и внутреннее состояние (введённый текст, раскрытость) «переезжает» к соседу. `Math.random()` ещё хуже: новый ключ на каждом рендере пересоздаёт все элементы. Правильный ключ — id из данных.',
          en: 'With `key`, React knows which list item is which when items are added, removed or reordered. If the key is the index, after an insertion at the start every item gets someone else’s index, and internal state (typed text, expanded state) “moves” to a neighbor. `Math.random()` is even worse: a new key on every render recreates all items. The right key is an id from the data.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input defaultValue={todo.title} />
        </li>
      ))}
    </ul>
  );
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`key` работает и вне списков: смена ключа говорит React, что это другой компонент, и он создаётся заново со свежим state. Так удобно сбрасывать форму при переходе к другому пользователю.',
          en: '`key` works outside lists too: changing the key tells React it’s a different component, so it’s created anew with fresh state. Handy for resetting a form when switching to another user.',
        },
      },
      {
        type: 'code',
        code: { lang: 'jsx', source: `<ProfileForm key={userId} userId={userId} />` },
      },
    ],
    keyPoints: [
      { ru: '`key` сопоставляет элементы списка между рендерами.', en: '`key` matches list items between renders.' },
      { ru: 'Ключ уникален среди соседей и стабилен — это id из данных.', en: 'A key is unique among siblings and stable — an id from the data.' },
      {
        ru: 'Индекс как ключ ломает state при вставке, удалении и сортировке.',
        en: 'Index as a key breaks state on insertion, removal and sorting.',
      },
      { ru: '`Math.random()` как ключ пересоздаёт элементы каждый рендер.', en: '`Math.random()` as a key recreates items on every render.' },
      { ru: 'Смена `key` — способ сбросить state компонента.', en: 'Changing `key` resets a component’s state.' },
    ],
    sources: [
      { title: 'react.dev — Rendering Lists', url: `${REACT}/learn/rendering-lists` },
      {
        title: 'react.dev — Resetting state with a key',
        url: `${REACT}/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key`,
      },
    ],
  },
  {
    tag: 'hooks-rules',
    summary: {
      ru: 'Хуки вызываются только на верхнем уровне компонента или своего хука: React узнаёт их по порядку вызова.',
      en: 'Hooks are called only at the top level of a component or a custom hook: React identifies them by call order.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'React хранит состояние хуков компонента списком и сопоставляет их по порядку вызова. Если хук вызван в условии, цикле или после раннего `return`, порядок на разных рендерах разъедется, и хук получит чужое состояние. Поэтому правила: только верхний уровень и только из компонентов или своих хуков с именем `use…`.',
          en: 'React keeps a component’s hook state as a list and matches hooks by call order. If a hook is called in a condition, a loop or after an early `return`, the order differs between renders and the hook gets someone else’s state. Hence the rules: top level only, and only from components or custom hooks named `use…`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function Profile({ user }) {
  const [name, setName] = useState(user?.name ?? '');
  if (!user) {
    return null;
  }
  return <input value={name} onChange={(event) => setName(event.target.value)} />;
}`,
        },
        caption: {
          ru: 'Хук до раннего return — порядок вызовов всегда одинаковый.',
          en: 'The hook comes before the early return — the call order is always the same.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Свой хук — функция `use…`, которая вызывает другие хуки. Он переиспользует **логику**, а не состояние: у каждого вызова своё. Нарушения ловит `eslint-plugin-react-hooks`. Единственное исключение — `use` из React 19: его можно вызывать в условиях и циклах.',
          en: 'A custom hook is a `use…` function that calls other hooks. It reuses **logic**, not state: each call has its own. `eslint-plugin-react-hooks` catches violations. The one exception is `use` from React 19: it can be called in conditions and loops.',
        },
      },
    ],
    keyPoints: [
      { ru: 'React сопоставляет хуки по порядку вызова.', en: 'React matches hooks by call order.' },
      {
        ru: 'Только верхний уровень: не в условиях, циклах, после раннего `return` и не в обработчиках.',
        en: 'Top level only: not in conditions, loops, after an early `return` or in handlers.',
      },
      { ru: 'Только из компонентов и своих хуков с именем `use…`.', en: 'Only from components and custom hooks named `use…`.' },
      {
        ru: 'Свой хук переиспользует логику, а не состояние: у каждого вызова своё.',
        en: 'A custom hook reuses logic, not state: each call has its own.',
      },
      { ru: '`use` из React 19 можно вызывать в условиях.', en: '`use` from React 19 can be called in conditions.' },
    ],
    sources: [
      { title: 'react.dev — Rules of Hooks', url: `${REACT}/reference/rules/rules-of-hooks` },
      { title: 'react.dev — Reusing Logic with Custom Hooks', url: `${REACT}/learn/reusing-logic-with-custom-hooks` },
    ],
  },
  {
    tag: 'state',
    summary: {
      ru: 'State — память компонента между рендерами. Сеттер не меняет переменную сразу, а планирует новый рендер.',
      en: 'State is a component’s memory between renders. The setter doesn’t change the variable right away — it schedules a new render.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Внутри одного рендера state — **снимок**, константа. `setCount(count + 1)` три раза подряд даст `+1`: каждый раз читается одно и то же `count`. Функция-обновлятор `setCount((c) => c + 1)` получает результат предыдущих обновлений из очереди. Несколько обновлений в одном событии React объединяет в один рендер ([[batching|batching]]) — в React 18+ это работает и в таймерах, и в промисах.',
          en: 'Within one render, state is a **snapshot**, a constant. `setCount(count + 1)` three times in a row gives `+1`: the same `count` is read each time. An updater function `setCount((c) => c + 1)` receives the result of the previous queued updates. React [[batching|batches]] several updates in one event into a single render — since React 18 that works in timers and promises too.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount((c) => c + 1);
    console.log(count); // 0: the snapshot of this render
  }

  return <button onClick={handleClick}>{count}</button>; // 2 after the click
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Объекты и массивы в state не мутируют — создают новые: React сравнивает старое и новое значение через `Object.is`, и мутированный объект с той же ссылкой не вызовет рендер. Производные данные (отфильтрованный список, сумма) считают прямо при рендере, а не дублируют в state. Общее состояние поднимают к ближайшему общему родителю.',
          en: 'Objects and arrays in state aren’t mutated — new ones are created: React compares old and new values with `Object.is`, and a mutated object with the same reference won’t trigger a render. Derived data (a filtered list, a total) is computed during render, not duplicated in state. Shared state is lifted to the closest common parent.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `setUser({ ...user, name: 'Bob' });
setItems([...items, newItem]);
setItems(items.filter((item) => item.id !== id));`,
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Сеттер планирует рендер; в текущем рендере state — снимок.',
        en: 'The setter schedules a render; within the current render state is a snapshot.',
      },
      {
        ru: '`setX(x + 1)` трижды — это `+1`; функция-обновлятор накапливает изменения.',
        en: '`setX(x + 1)` three times is `+1`; an updater function accumulates changes.',
      },
      {
        ru: 'Несколько обновлений в одном событии — один рендер (batching).',
        en: 'Several updates in one event make one render (batching).',
      },
      { ru: 'Объекты и массивы в state не мутируют — создают новые.', en: 'Objects and arrays in state aren’t mutated — create new ones.' },
      {
        ru: 'Производное от props и state считают при рендере, а не хранят в state.',
        en: 'Data derived from props and state is computed during render, not stored in state.',
      },
    ],
    sources: [
      { title: 'react.dev — State as a Snapshot', url: `${REACT}/learn/state-as-a-snapshot` },
      { title: 'react.dev — Queueing a Series of State Updates', url: `${REACT}/learn/queueing-a-series-of-state-updates` },
      { title: 'react.dev — Updating Objects in State', url: `${REACT}/learn/updating-objects-in-state` },
    ],
  },
  {
    tag: 'effects',
    summary: {
      ru: '`useEffect` синхронизирует компонент с внешней системой после рендера. Нет внешней системы — эффект, скорее всего, не нужен.',
      en: '`useEffect` synchronizes a component with an external system after rendering. No external system — you probably don’t need an effect.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Эффект запускается после commit. Массив зависимостей перечисляет все реактивные значения, которые эффект читает: если хоть одно изменилось (`Object.is`), эффект перезапускается. Перед перезапуском и при размонтировании выполняется функция очистки. В режиме разработки StrictMode специально запускает эффект дважды (setup → cleanup → setup), чтобы забытая очистка проявилась сразу.',
          en: 'An effect runs after commit. The dependency array lists every reactive value the effect reads: if any changed (`Object.is`), the effect re-runs. Before a re-run and on unmount the cleanup function runs. In development, StrictMode deliberately runs the effect twice (setup → cleanup → setup) so a missing cleanup shows up right away.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Room {roomId}</h1>;
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Эффект не нужен, чтобы посчитать производные данные (считайте при рендере), отреагировать на действие пользователя (это работа обработчика события) или сбросить state при смене пропа (используйте `key`). Если данные всё же грузятся в эффекте, защититесь от гонки: ответ на старый запрос может прийти позже нового.',
          en: 'You don’t need an effect to compute derived data (do it during render), to react to a user action (that’s an event handler’s job) or to reset state when a prop changes (use `key`). If you do fetch data in an effect, guard against races: a response to an old request can arrive after a newer one.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `useEffect(() => {
  let ignore = false;
  fetchUser(userId).then((user) => {
    if (!ignore) {
      setUser(user);
    }
  });
  return () => {
    ignore = true;
  };
}, [userId]);`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Эффект — синхронизация с внешней системой после рендера.', en: 'An effect synchronizes with an external system after rendering.' },
      {
        ru: 'Зависимости — все реактивные значения, которые читает эффект.',
        en: 'Dependencies are all reactive values the effect reads.',
      },
      {
        ru: 'Очистка выполняется перед следующим запуском и при размонтировании.',
        en: 'Cleanup runs before the next run and on unmount.',
      },
      {
        ru: 'В StrictMode в разработке эффект запускается дважды — так ловят забытую очистку.',
        en: 'In development StrictMode runs effects twice — that catches a missing cleanup.',
      },
      {
        ru: 'Производные данные и реакция на события обходятся без эффектов.',
        en: 'Derived data and reacting to events don’t need effects.',
      },
    ],
    sources: [
      { title: 'react.dev — Synchronizing with Effects', url: `${REACT}/learn/synchronizing-with-effects` },
      { title: 'react.dev — You Might Not Need an Effect', url: `${REACT}/learn/you-might-not-need-an-effect` },
    ],
  },
  {
    tag: 'memoization',
    summary: {
      ru: '`memo`, `useMemo` и `useCallback` пропускают лишнюю работу, сравнивая зависимости. Это оптимизация, а не гарантия.',
      en: '`memo`, `useMemo` and `useCallback` skip unnecessary work by comparing dependencies. It’s an optimization, not a guarantee.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`memo(Component)` пропускает рендер, если все пропсы равны прежним по `Object.is`. `useMemo` кеширует вычисленное значение, `useCallback` — саму функцию между рендерами. Работают они в связке: новый объект или стрелка в пропсах на каждом рендере сводят `memo` ребёнка на нет.',
          en: '`memo(Component)` skips a render if every prop equals the previous one by `Object.is`. `useMemo` caches a computed value, `useCallback` the function itself between renders. They work together: a new object or arrow in props on every render defeats a child’s `memo`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `const List = memo(function List({ items, onSelect }) {
  return items.map((item) => (
    <button key={item.id} onClick={() => onSelect(item.id)}>
      {item.title}
    </button>
  ));
});

function Page({ items, query }) {
  const visible = useMemo(() => items.filter((item) => item.title.includes(query)), [items, query]);
  const handleSelect = useCallback((id) => console.log(id), []);
  return <List items={visible} onSelect={handleSelect} />;
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Мемоизация окупается для тяжёлых вычислений, для пропсов `memo`-компонентов и для зависимостей эффектов — в остальных случаях она лишь добавляет сравнений. Сначала измерьте React Profiler. React Compiler мемоизирует компоненты и значения автоматически — с ним ручные `useMemo`/`useCallback` почти не нужны.',
          en: 'Memoization pays off for expensive calculations, for props of `memo` components and for effect dependencies — otherwise it just adds comparisons. Measure with the React Profiler first. React Compiler memoizes components and values automatically — with it, manual `useMemo`/`useCallback` are rarely needed.',
        },
      },
    ],
    keyPoints: [
      { ru: '`memo` пропускает рендер, если пропсы поверхностно равны.', en: '`memo` skips a render if props are shallowly equal.' },
      {
        ru: '`useMemo` кеширует значение, `useCallback` — функцию между рендерами.',
        en: '`useMemo` caches a value, `useCallback` a function between renders.',
      },
      {
        ru: 'Новый объект или стрелка в пропсах на каждом рендере ломают `memo`.',
        en: 'A new object or arrow in props on every render breaks `memo`.',
      },
      { ru: 'Мемоизация — оптимизация: сначала измерьте Profiler.', en: 'Memoization is an optimization: measure with the Profiler first.' },
      { ru: 'React Compiler мемоизирует автоматически.', en: 'React Compiler memoizes automatically.' },
    ],
    sources: [
      { title: 'react.dev — memo', url: `${REACT}/reference/react/memo` },
      { title: 'react.dev — useMemo', url: `${REACT}/reference/react/useMemo` },
      { title: 'react.dev — React Compiler', url: `${REACT}/learn/react-compiler` },
    ],
  },
  {
    tag: 'context',
    summary: {
      ru: 'Context передаёт значение глубоко по дереву без пробрасывания пропсов. Все потребители перерендериваются, когда значение меняется.',
      en: 'Context passes a value deep down the tree without prop drilling. All consumers re-render when the value changes.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`createContext(defaultValue)` создаёт контекст, провайдер выше по дереву задаёт значение, `useContext` читает ближайшее. Без провайдера выше берётся значение по умолчанию. В React 19 провайдером служит сам контекст: `<ThemeContext value={…}>` вместо `.Provider`.',
          en: '`createContext(defaultValue)` creates a context, a provider higher in the tree sets the value, `useContext` reads the nearest one. Without a provider above, the default value is used. In React 19 the context itself is the provider: `<ThemeContext value={…}>` instead of `.Provider`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext value={theme}>
      <Toolbar />
    </ThemeContext>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>OK</button>;
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Значение сравнивается через `Object.is`. Объект, созданный прямо в JSX, — новый на каждом рендере провайдера, и все потребители перерендериваются; оберните его в `useMemo`. Context — транспорт, а не менеджер состояния: часто меняющиеся и редко меняющиеся данные лучше разнести по разным контекстам.',
          en: 'The value is compared with `Object.is`. An object created right in JSX is new on every provider render, so all consumers re-render; wrap it in `useMemo`. Context is transport, not a state manager: split frequently and rarely changing data into different contexts.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Context передаёт значение вниз без пробрасывания пропсов.', en: 'Context passes a value down without prop drilling.' },
      {
        ru: 'Потребитель перерендеривается, когда меняется значение провайдера (`Object.is`).',
        en: 'A consumer re-renders when the provider’s value changes (`Object.is`).',
      },
      {
        ru: 'Объект-значение, созданный в JSX, новый каждый рендер — оборачивайте в `useMemo`.',
        en: 'An object value created in JSX is new every render — wrap it in `useMemo`.',
      },
      {
        ru: 'Без провайдера выше берётся значение по умолчанию из `createContext`.',
        en: 'Without a provider above, the default from `createContext` is used.',
      },
      { ru: 'В React 19 провайдер — сам `<Context value>`.', en: 'In React 19 the provider is `<Context value>` itself.' },
    ],
    sources: [
      { title: 'react.dev — Passing Data Deeply with Context', url: `${REACT}/learn/passing-data-deeply-with-context` },
      { title: 'react.dev — useContext', url: `${REACT}/reference/react/useContext` },
    ],
  },
  {
    tag: 'refs',
    summary: {
      ru: 'Ref — ящик для значения, которое переживает рендеры, но не вызывает их. Чаще всего в нём лежит DOM-узел.',
      en: 'A ref is a box for a value that survives renders but doesn’t trigger them. Most often it holds a DOM node.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`useRef` возвращает один и тот же объект `{ current }` на всех рендерах. Изменение `ref.current` рендер не вызывает — поэтому в ref хранят то, что не нужно показывать: id таймера, предыдущее значение, DOM-узел. Узел попадает в `ref.current` после commit, так что читать и писать ref во время рендера нельзя (кроме ленивой инициализации).',
          en: '`useRef` returns the same `{ current }` object on every render. Changing `ref.current` doesn’t trigger a render — so refs hold what you don’t display: a timer id, a previous value, a DOM node. The node lands in `ref.current` after commit, so don’t read or write refs during render (except lazy initialization).',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function Search() {
  const inputRef = useRef(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В React 19 `ref` — обычный проп функционального компонента: `forwardRef` больше не нужен. Ref-колбэк может вернуть функцию очистки, которую React вызовет при отсоединении узла.',
          en: 'In React 19 `ref` is a regular prop of a function component: `forwardRef` is no longer needed. A ref callback can return a cleanup function that React calls when the node is detached.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function TextField({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}`,
        },
      },
    ],
    keyPoints: [
      { ru: '`useRef` хранит значение между рендерами без перерендера.', en: '`useRef` keeps a value between renders without re-rendering.' },
      { ru: 'Изменение `ref.current` не вызывает рендер.', en: 'Changing `ref.current` doesn’t trigger a render.' },
      { ru: 'Не читайте и не пишите `ref.current` во время рендера.', en: 'Don’t read or write `ref.current` during render.' },
      { ru: 'DOM-узел попадает в ref после commit.', en: 'A DOM node lands in the ref after commit.' },
      { ru: 'В React 19 `ref` — обычный проп, `forwardRef` не нужен.', en: 'In React 19 `ref` is a regular prop; `forwardRef` isn’t needed.' },
    ],
    sources: [
      { title: 'react.dev — Referencing Values with Refs', url: `${REACT}/learn/referencing-values-with-refs` },
      { title: 'react.dev — Manipulating the DOM with Refs', url: `${REACT}/learn/manipulating-the-dom-with-refs` },
      { title: 'react.dev — React 19: ref as a prop', url: `${REACT}/blog/2024/12/05/react-19#ref-as-a-prop` },
    ],
  },
  {
    tag: 'forms',
    summary: {
      ru: 'Поле бывает управляемым (значение в state) и неуправляемым (значение в DOM). В React 19 формы получили actions.',
      en: 'A field is controlled (value in state) or uncontrolled (value in the DOM). In React 19 forms gained actions.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Управляемое** поле: `value` из state и `onChange`, который его обновляет, — источник правды в React. `value` без `onChange` делает поле только для чтения. Переход `value` из `undefined` в строку переключает поле из неуправляемого режима в управляемый — React предупредит. **Неуправляемое** поле задаёт только `defaultValue`, а значение читают при отправке — через `FormData` или ref.',
          en: 'A **controlled** field: `value` from state and an `onChange` that updates it — React is the source of truth. `value` without `onChange` makes the field read-only. Switching `value` from `undefined` to a string flips the field from uncontrolled to controlled — React warns about it. An **uncontrolled** field sets only `defaultValue`, and the value is read on submit — via `FormData` or a ref.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function NameForm() {
  const [name, setName] = useState('');
  return <input value={name} onChange={(event) => setName(event.target.value)} />;
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В React 19 `<form action={fn}>` вызывает функцию с `FormData`. `useActionState` возвращает результат последнего вызова, обёрнутое действие и флаг ожидания; `useFormStatus` даёт кнопке внутри формы статус отправки. После успешного действия неуправляемые поля формы сбрасываются автоматически.',
          en: 'In React 19 `<form action={fn}>` calls the function with `FormData`. `useActionState` returns the last result, a wrapped action and a pending flag; `useFormStatus` gives a button inside the form the submit status. After a successful action, uncontrolled fields are reset automatically.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function Signup() {
  const [error, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const result = await register(formData.get('email'));
    return result.error ?? null;
  }, null);

  return (
    <form action={submitAction}>
      <input name="email" type="email" />
      <button disabled={isPending}>Sign up</button>
      {error && <p>{error}</p>}
    </form>
  );
}`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Управляемое поле: `value` + `onChange`, источник правды — state.', en: 'Controlled field: `value` + `onChange`, state is the source of truth.' },
      { ru: '`value` без `onChange` делает поле только для чтения.', en: '`value` without `onChange` makes the field read-only.' },
      {
        ru: 'Неуправляемое: `defaultValue`, значение читают при отправке.',
        en: 'Uncontrolled: `defaultValue`, the value is read on submit.',
      },
      {
        ru: 'Не меняйте `value` с `undefined` на строку — поле сменит режим.',
        en: 'Don’t switch `value` from `undefined` to a string — the field changes mode.',
      },
      {
        ru: 'React 19: `form action`, `useActionState`, `useFormStatus`.',
        en: 'React 19: `form action`, `useActionState`, `useFormStatus`.',
      },
    ],
    sources: [
      { title: 'react.dev — <input>', url: `${REACT}/reference/react-dom/components/input` },
      { title: 'react.dev — <form>', url: `${REACT}/reference/react-dom/components/form` },
      { title: 'react.dev — useActionState', url: `${REACT}/reference/react/useActionState` },
    ],
  },
  {
    tag: 'react-19',
    summary: {
      ru: 'React 19 добавил actions и хук `use`, новые хуки для форм и упростил API: ref как проп и контекст как провайдер.',
      en: 'React 19 added actions and the `use` hook, new form hooks, and simplified the API: ref as a prop and context as a provider.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Actions** — async-функции внутри переходов (`useTransition`, `form action`): React сам ведёт состояние ожидания, ошибки и последовательность отправок. Вокруг них новые хуки: `useActionState`, `useFormStatus` и `useOptimistic` — показать результат сразу, пока запрос ещё идёт.',
          en: '**Actions** are async functions inside transitions (`useTransition`, `form action`): React tracks pending state, errors and the order of submissions. New hooks around them: `useActionState`, `useFormStatus` and `useOptimistic` — show the result immediately while the request is still in flight.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function Likes({ count, onLike }) {
  const [optimisticCount, addOptimistic] = useOptimistic(count, (current, delta) => current + delta);

  async function like() {
    addOptimistic(1);
    await onLike();
  }

  return (
    <form action={like}>
      <button>Like {optimisticCount}</button>
    </form>
  );
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`use(promise)` читает промис прямо в рендере вместе с Suspense, а `use(context)` можно вызвать даже в условии. `ref` стал обычным пропом, `<Context>` — провайдером, ref-колбэк может вернуть очистку, а `<title>` и `<meta>` из компонентов поднимаются в `<head>`. Удалены `propTypes`, `defaultProps` у функциональных компонентов и строковые refs.',
          en: '`use(promise)` reads a promise right in render together with Suspense, and `use(context)` can even be called in a condition. `ref` became a regular prop, `<Context>` a provider, a ref callback can return cleanup, and `<title>` and `<meta>` from components are hoisted to `<head>`. `propTypes`, `defaultProps` for function components and string refs were removed.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Actions: async-функции в переходах сами ведут ожидание и ошибки.',
        en: 'Actions: async functions in transitions handle pending state and errors.',
      },
      {
        ru: '`useActionState`, `useFormStatus`, `useOptimistic` — хуки для форм и оптимистичного UI.',
        en: '`useActionState`, `useFormStatus`, `useOptimistic` are hooks for forms and optimistic UI.',
      },
      {
        ru: '`use(promise)` читает промис в рендере с Suspense; `use(context)` — даже в условии.',
        en: '`use(promise)` reads a promise in render with Suspense; `use(context)` even in a condition.',
      },
      { ru: '`ref` — обычный проп, `<Context>` — провайдер.', en: '`ref` is a regular prop, `<Context>` is a provider.' },
      {
        ru: 'Удалены `propTypes`, `defaultProps` у функций и строковые refs.',
        en: '`propTypes`, `defaultProps` for functions and string refs were removed.',
      },
    ],
    sources: [
      { title: 'react.dev — React v19', url: `${REACT}/blog/2024/12/05/react-19` },
      { title: 'react.dev — use', url: `${REACT}/reference/react/use` },
      { title: 'react.dev — useOptimistic', url: `${REACT}/reference/react/useOptimistic` },
    ],
  },
  {
    tag: 'suspense',
    summary: {
      ru: '`Suspense` показывает запасной интерфейс, пока часть дерева ждёт загрузки кода (`lazy`) или данных.',
      en: '`Suspense` shows a fallback while part of the tree waits for code (`lazy`) or data to load.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Компонент «приостанавливается», когда ему нечего показать: `lazy` ещё грузит код или `use(promise)` ждёт данные. Тогда ближайшая граница `<Suspense>` выше по дереву показывает `fallback`. Вложенные границы раскрывают интерфейс по частям.',
          en: 'A component “suspends” when it has nothing to show: `lazy` is still loading code or `use(promise)` is waiting for data. The nearest `<Suspense>` boundary above then shows its `fallback`. Nested boundaries reveal the UI piece by piece.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `const Settings = lazy(() => import('./settings.jsx'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Settings />
    </Suspense>
  );
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Приостанавливать умеют `lazy`, `use(promise)` и библиотеки и фреймворки с поддержкой Suspense; загрузка в `useEffect` — нет. Если обновление идёт в transition (`startTransition`), React оставит на экране прежний контент вместо fallback. Ошибки `Suspense` не ловит — для них нужен Error Boundary.',
          en: '`lazy`, `use(promise)` and Suspense-enabled libraries and frameworks can suspend; fetching in `useEffect` can’t. If the update is a transition (`startTransition`), React keeps the previous content on screen instead of the fallback. `Suspense` doesn’t catch errors — you need an Error Boundary for that.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map((comment) => <p key={comment.id}>{comment.text}</p>);
}`,
        },
      },
    ],
    keyPoints: [
      {
        ru: '`Suspense` показывает fallback, пока дерево внутри ждёт код или данные.',
        en: '`Suspense` shows the fallback while the tree inside waits for code or data.',
      },
      {
        ru: 'Приостанавливают `lazy`, `use(promise)` и библиотеки с поддержкой Suspense; `useEffect` — нет.',
        en: '`lazy`, `use(promise)` and Suspense-enabled libraries suspend; `useEffect` doesn’t.',
      },
      { ru: 'Срабатывает ближайшая граница выше по дереву.', en: 'The nearest boundary above takes over.' },
      {
        ru: 'Обновление в transition оставляет прежний контент вместо fallback.',
        en: 'An update in a transition keeps the previous content instead of the fallback.',
      },
      { ru: 'Ошибки `Suspense` не ловит — нужен Error Boundary.', en: '`Suspense` doesn’t catch errors — you need an Error Boundary.' },
    ],
    sources: [
      { title: 'react.dev — <Suspense>', url: `${REACT}/reference/react/Suspense` },
      { title: 'react.dev — lazy', url: `${REACT}/reference/react/lazy` },
    ],
  },
  {
    tag: 'server-components',
    summary: {
      ru: 'Серверные компоненты выполняются на сервере или при сборке и присылают готовый результат — их код не попадает в бандл клиента.',
      en: 'Server Components run on the server or at build time and send a ready result — their code doesn’t ship in the client bundle.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Серверный компонент может быть `async` и читать данные напрямую — из базы, файлов, внутренних API. Взамен у него нет state, эффектов и обработчиков событий. Интерактивные части выносят в клиентские компоненты: директива `\'use client\'` в начале файла отмечает границу — этот файл и всё, что он импортирует, попадает в клиентский бандл.',
          en: 'A Server Component can be `async` and read data directly — from a database, files, internal APIs. In exchange it has no state, effects or event handlers. Interactive parts go into Client Components: the `\'use client\'` directive at the top of a file marks the boundary — that file and everything it imports ships to the client.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `// notes.jsx: a Server Component
export default async function Notes() {
  const notes = await db.notes.findMany();
  return notes.map((note) => <Note key={note.id} note={note} />);
}

// like-button.jsx
'use client';
export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? 'Liked' : 'Like'}</button>;
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Серверный компонент может рендерить клиентский, передавая сериализуемые пропсы: примитивы, обычные объекты, промисы, JSX. Функции передать нельзя — кроме серверных функций с директивой `\'use server\'`, которые клиент вызывает как обычные async-функции (например, в `form action`). Серверные компоненты требуют поддержки фреймворка — например, Next.js App Router.',
          en: 'A Server Component can render a Client Component with serializable props: primitives, plain objects, promises, JSX. Functions can’t be passed — except Server Functions marked `\'use server\'`, which the client calls like ordinary async functions (e.g. in a `form action`). Server Components need framework support — e.g. the Next.js App Router.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Серверный компонент выполняется на сервере или при сборке, его код не уходит в бандл.',
        en: 'A Server Component runs on the server or at build time; its code doesn’t ship.',
      },
      {
        ru: 'Может быть `async` и читать данные напрямую, но без state, эффектов и обработчиков.',
        en: 'It can be `async` and read data directly, but has no state, effects or handlers.',
      },
      {
        ru: '`\'use client\'` отмечает границу: файл и его импорты становятся клиентскими.',
        en: '`\'use client\'` marks the boundary: the file and its imports become client code.',
      },
      {
        ru: 'Пропсы из серверного компонента в клиентский должны сериализоваться.',
        en: 'Props from a Server to a Client Component must be serializable.',
      },
      {
        ru: '`\'use server\'` помечает серверные функции, которые можно вызвать с клиента.',
        en: '`\'use server\'` marks Server Functions callable from the client.',
      },
    ],
    sources: [
      { title: 'react.dev — Server Components', url: `${REACT}/reference/rsc/server-components` },
      { title: 'react.dev — \'use client\'', url: `${REACT}/reference/rsc/use-client` },
      { title: 'react.dev — \'use server\'', url: `${REACT}/reference/rsc/use-server` },
    ],
  },
];
