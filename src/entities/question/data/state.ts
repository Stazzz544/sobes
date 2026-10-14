import type { Question } from '../model/types';

const REACT = 'https://react.dev/learn';
const REDUX = 'https://redux.js.org';
const QUERY = 'https://tanstack.com/query/latest/docs/framework/react/guides';
const MDN = 'https://developer.mozilla.org/en-US/docs';

export const STATE_QUESTIONS: Question[] = [
  {
    id: 'state-basics-001',
    topic: 'state',
    tags: ['state-basics'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что из этого — серверное состояние?', en: 'Which of these is server state?' },
    options: [
      { text: { ru: 'Открыто ли выпадающее меню', en: 'Whether a dropdown is open' } },
      { text: { ru: 'Текст, который пользователь вводит в поле', en: 'Text the user is typing into a field' } },
      { text: { ru: 'Список заказов, полученный из API', en: 'A list of orders fetched from the API' } },
      { text: { ru: 'Выбранная тема оформления', en: 'The selected color theme' } },
      { text: { ru: 'Номер текущего шага мастера', en: 'The current wizard step' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Серверное состояние принадлежит серверу, а у клиента — лишь его копия, которая может устареть: её надо кэшировать, обновлять и инвалидировать. Для этого есть TanStack Query, SWR, RTK Query. Остальное — клиентское состояние, им полностью владеет приложение.',
          en: 'Server state is owned by the server; the client has only a copy that can go stale: it must be cached, refreshed and invalidated. That’s what TanStack Query, SWR and RTK Query are for. The rest is client state, fully owned by the app.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Important Defaults', url: `${QUERY}/important-defaults` }],
  },
  {
    id: 'state-basics-002',
    topic: 'state',
    tags: ['state-basics'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Где хранить флаг «открыто ли модальное окно удаления», если он нужен только одному компоненту?',
      en: 'Where should a “delete dialog is open” flag live if only one component needs it?',
    },
    options: [
      { text: { ru: 'В глобальном Redux-сторе — всё состояние должно быть там', en: 'In the global Redux store — all state belongs there' } },
      { text: { ru: 'В `useState` этого компонента', en: 'In that component’s `useState`' } },
      { text: { ru: 'В `localStorage`', en: 'In `localStorage`' } },
      { text: { ru: 'В глобальной переменной модуля', en: 'In a module-level global variable' } },
      { text: { ru: 'В cookie', en: 'In a cookie' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Состояние держат как можно ближе к месту использования. Локальный флаг в глобальном сторе добавляет шаблонного кода и связывает несвязанные части приложения. Поднимать состояние выше стоит, только когда оно понадобится другим компонентам.',
          en: 'Keep state as close to where it’s used as possible. A local flag in a global store adds boilerplate and couples unrelated parts of the app. Lift state up only when other components need it.',
        },
      },
    ],
    sources: [{ title: 'React — Choosing the State Structure', url: `${REACT}/choosing-the-state-structure` }],
  },
  {
    id: 'state-basics-003',
    topic: 'state',
    tags: ['state-basics'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Список товаров обновляется с сервера, а пользователь может выбрать один. Как лучше хранить выбор?',
      en: 'A product list refreshes from the server, and the user can select one. How should the selection be stored?',
    },
    options: [
      { text: { ru: 'Копию объекта выбранного товара', en: 'A copy of the selected product object' } },
      { text: { ru: '`id` выбранного товара, а сам товар находить в списке', en: 'The selected product’s `id`, looking the product up in the list' } },
      { text: { ru: 'И объект, и список — в двух местах для надёжности', en: 'Both the object and the list — in two places to be safe' } },
      { text: { ru: 'Индекс в массиве', en: 'Its index in the array' } },
      { text: { ru: 'Название товара', en: 'The product name' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Копия объекта — дублирование: после обновления списка у выбранного товара может смениться цена, а копия останется старой. С `id` источник правды один — сам список. Индекс сломается при сортировке или удалении, название не уникально.',
          en: 'A copy of the object is duplication: after the list refreshes, the selected product’s price may change while the copy stays old. With an `id` there’s one source of truth — the list itself. An index breaks on sorting or deletion, and a name isn’t unique.',
        },
      },
    ],
    sources: [{ title: 'React — Choosing the State Structure', url: `${REACT}/choosing-the-state-structure` }],
  },
  {
    id: 'state-immutability-001',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const state = { user: { name: 'Ann' }, tags: ['a'] };
const next = { ...state };
next.user.name = 'Bob';

console.log(state.user.name, state === next, state.user === next.user);`,
    },
    options: [{ code: 'Ann false false' }, { code: 'Bob false true' }, { code: 'Ann false true' }, { code: 'Bob true true' }, { code: 'Bob false false' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Спред создаёт новый объект верхнего уровня (`state !== next`), но вложенный `user` копируется **по ссылке** — это тот же объект. Поэтому изменение `next.user.name` меняет и `state.user.name`: состояние мутировано, хотя «копию» сделали.',
          en: 'The spread creates a new top-level object (`state !== next`), but the nested `user` is copied **by reference** — it’s the same object. So changing `next.user.name` also changes `state.user.name`: state was mutated despite the “copy”.',
        },
      },
      {
        type: 'code',
        code: { lang: 'js', source: `const next = { ...state, user: { ...state.user, name: 'Bob' } };` },
        caption: { ru: 'Копировать каждый уровень на пути к изменению', en: 'Copy every level along the path to the change' },
      },
    ],
    sources: [{ title: 'React — Updating Objects in State', url: `${REACT}/updating-objects-in-state` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-immutability-002',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const todos = [{ id: 1, done: false }, { id: 2, done: false }];
const next = todos.map((todo) => (todo.id === 2 ? { ...todo, done: true } : todo));

console.log(next === todos, next[0] === todos[0], next[1] === todos[1]);`,
    },
    options: [{ code: 'false false false' }, { code: 'false true false' }, { code: 'true true false' }, { code: 'false true true' }, { code: 'true false false' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`map` возвращает новый массив, но неизменённый первый элемент — тот же объект, а изменённый второй — новый. Это **структурное разделение**: копируется только путь к изменению. Поэтому `memo`-компонент первого пункта не перерисуется, а второго — перерисуется.',
          en: '`map` returns a new array, but the unchanged first item is the same object, while the changed second one is new. That’s **structural sharing**: only the path to the change is copied. So a `memo` component for the first item won’t re-render, and the second one will.',
        },
      },
    ],
    sources: [
      { title: 'React — Updating Arrays in State', url: `${REACT}/updating-arrays-in-state` },
      { title: 'Redux — Immutable Update Patterns', url: `${REDUX}/usage/structuring-reducers/immutable-update-patterns` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-immutability-003',
    kind: 'output',
    topic: 'state',
    tags: ['state-immutability', 'state-redux'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `function reducer(state, action) {
  if (action.type === 'add') {
    state.items.push(action.item);
    return state;
  }
  return state;
}

const prev = { items: [] };
const next = reducer(prev, { type: 'add', item: 'x' });

console.log(prev === next, prev.items.length);`,
    },
    answers: ['true 1'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Редьюсер мутировал старое состояние и вернул **ту же ссылку**: `prev === next`, а элемент добавился и в `prev`. Redux, React и селекторы сравнивают состояния по ссылке, увидят «ничего не изменилось» — и интерфейс не обновится.',
          en: 'The reducer mutated the old state and returned **the same reference**: `prev === next`, and the item was added to `prev` too. Redux, React and selectors compare state by reference, see “nothing changed” — and the UI won’t update.',
        },
      },
      {
        type: 'code',
        code: { lang: 'js', source: `return { ...state, items: [...state.items, action.item] };` },
      },
    ],
    sources: [{ title: 'Redux — Immutable Update Patterns', url: `${REDUX}/usage/structuring-reducers/immutable-update-patterns` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-redux-001',
    kind: 'order',
    topic: 'state',
    tags: ['state-redux'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Расставьте шаги потока данных в Redux по порядку.', en: 'Put the steps of the Redux data flow in order.' },
    items: [
      { text: { ru: 'Компонент вызывает `dispatch(action)`', en: 'A component calls `dispatch(action)`' } },
      { text: { ru: 'Редьюсер вычисляет новое состояние', en: 'The reducer computes the new state' } },
      { text: { ru: 'Стор уведомляет подписчиков', en: 'The store notifies subscribers' } },
      { text: { ru: 'Компоненты с изменившимися данными перерисовываются', en: 'Components whose data changed re-render' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Поток однонаправленный: действие описывает, **что произошло**, редьюсер по старому состоянию и действию вычисляет новое, стор сообщает подписчикам, а `useSelector` перерисовывает только те компоненты, у которых выбранные данные изменились.',
          en: 'The flow is one-way: an action describes **what happened**, the reducer computes the new state from the old one and the action, the store tells subscribers, and `useSelector` re-renders only the components whose selected data changed.',
        },
      },
    ],
    sources: [{ title: 'Redux — Concepts and Data Flow', url: `${REDUX}/tutorials/fundamentals/part-2-concepts-data-flow` }],
  },
  {
    id: 'state-redux-002',
    topic: 'state',
    tags: ['state-redux'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Где в Redux правильно делать запрос к API?', en: 'Where is the right place for an API request in Redux?' },
    options: [
      { text: { ru: 'Прямо в редьюсере', en: 'Right in the reducer' } },
      { text: { ru: 'В thunk (или другом middleware), который затем отправляет действия с результатом', en: 'In a thunk (or other middleware) that then dispatches actions with the result' } },
      { text: { ru: 'В селекторе', en: 'In a selector' } },
      { text: { ru: 'В `initialState`', en: 'In `initialState`' } },
      { text: { ru: 'Redux не умеет работать с асинхронностью', en: 'Redux can’t handle async at all' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Редьюсер обязан быть **чистым**: одинаковые входы — одинаковый результат, без запросов и таймеров. Побочные эффекты живут в middleware: thunk делает запрос и отправляет `pending`/`fulfilled`/`rejected` действия, а редьюсеры только обновляют состояние по ним (`createAsyncThunk` делает это за вас).',
          en: 'A reducer must be **pure**: same inputs — same result, no requests or timers. Side effects live in middleware: a thunk makes the request and dispatches `pending`/`fulfilled`/`rejected` actions, while reducers only update state from them (`createAsyncThunk` does this for you).',
        },
      },
    ],
    sources: [
      { title: 'Redux — Writing Logic with Thunks', url: `${REDUX}/usage/writing-logic-thunks` },
      { title: 'Redux — Three Principles', url: `${REDUX}/understanding/thinking-in-redux/three-principles` },
    ],
  },
  {
    id: 'state-redux-003',
    topic: 'state',
    tags: ['state-redux', 'state-immutability'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Почему в `createSlice` можно писать `state.items.push(item)`, хотя Redux требует иммутабельности?',
      en: 'Why can you write `state.items.push(item)` in `createSlice` although Redux requires immutability?',
    },
    options: [
      { text: { ru: 'Redux Toolkit отменил требование иммутабельности', en: 'Redux Toolkit dropped the immutability requirement' } },
      {
        text: {
          ru: 'Immer даёт черновик, записывает изменения и создаёт новое неизменяемое состояние',
          en: 'Immer provides a draft, records the changes and produces a new immutable state',
        },
      },
      { text: { ru: 'Toolkit глубоко копирует состояние перед каждым действием', en: 'Toolkit deep-copies state before every action' } },
      { text: { ru: '`push` в Redux работает иначе, чем в JavaScript', en: '`push` works differently in Redux than in JavaScript' } },
      { text: { ru: 'Так делать нельзя — это ошибка', en: 'You can’t — it’s a bug' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Внутри `createSlice` редьюсер получает **черновик** Immer. «Мутации» черновика записываются, и Immer создаёт новый объект, переиспользуя неизменённые части. Снаружи такого редьюсера мутировать состояние по-прежнему нельзя.',
          en: 'Inside `createSlice` a reducer receives an Immer **draft**. “Mutations” to the draft are recorded, and Immer produces a new object reusing unchanged parts. Outside such a reducer you still can’t mutate state.',
        },
      },
    ],
    sources: [{ title: 'Redux Toolkit — Writing Reducers with Immer', url: 'https://redux-toolkit.js.org/usage/immer-reducers' }],
  },
  {
    id: 'state-redux-004',
    topic: 'state',
    tags: ['state-redux', 'state-stores'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Компонент перерисовывается при **любом** действии в сторе. В чём причина?',
      en: 'A component re-renders on **every** store action. What’s the cause?',
    },
    code: { lang: 'js', source: `const done = useSelector((state) => state.todos.filter((todo) => todo.done));` },
    options: [
      { text: { ru: '`useSelector` всегда перерисовывает при любом действии', en: '`useSelector` always re-renders on any action' } },
      {
        text: {
          ru: '`filter` каждый раз возвращает новый массив — ссылка меняется, и `useSelector` считает данные изменившимися',
          en: '`filter` returns a new array every time — the reference changes, and `useSelector` treats the data as changed',
        },
      },
      { text: { ru: 'Список задач слишком большой', en: 'The todo list is too big' } },
      { text: { ru: 'Не хватает `useEffect`', en: 'A `useEffect` is missing' } },
      { text: { ru: 'Нужно хранить `done` отдельным полем в сторе', en: 'You must store `done` as a separate field in the store' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useSelector` после каждого действия вызывает селектор и сравнивает результат с прошлым по ссылке (`===`). `filter` всегда создаёт новый массив, поэтому сравнение «не равно» — и перерисовка. Решение — мемоизированный селектор `createSelector`, который возвращает прежний массив, пока не изменились `todos`.',
          en: '`useSelector` runs the selector after every action and compares the result with the previous one by reference (`===`). `filter` always creates a new array, so the comparison fails — and the component re-renders. The fix is a memoized `createSelector` that returns the same array until `todos` changes.',
        },
      },
    ],
    sources: [{ title: 'Redux — Deriving Data with Selectors', url: `${REDUX}/usage/deriving-data-selectors` }],
  },
  {
    id: 'state-stores-001',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какой вариант подписки на Zustand-стор перерисует компонент только при смене `count`?',
      en: 'Which Zustand subscription re-renders the component only when `count` changes?',
    },
    options: [
      { code: 'const { count } = useStore()' },
      { code: 'const count = useStore((state) => state.count)' },
      { code: 'const state = useStore(); const count = state.count' },
      { code: 'const count = useStore.getState().count' },
      { code: 'const [count] = useState(useStore().count)' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Селектор подписывает компонент на конкретное значение: перерисовка будет, только когда изменится `count`. `useStore()` без селектора подписан на весь стор — компонент перерисуется при изменении любого поля. `getState()` вообще не подписывается и не обновит компонент.',
          en: 'A selector subscribes the component to a specific value: it re-renders only when `count` changes. `useStore()` without a selector subscribes to the whole store — the component re-renders when any field changes. `getState()` doesn’t subscribe at all and won’t update the component.',
        },
      },
    ],
    sources: [{ title: 'Zustand — documentation', url: 'https://zustand.docs.pmnd.rs/' }],
  },
  {
    id: 'state-stores-002',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В каком случае глобальный стор оправдан больше всего?',
      en: 'When is a global store most justified?',
    },
    options: [
      { text: { ru: 'Для каждого поля любой формы', en: 'For every field of every form' } },
      {
        text: {
          ru: 'Корзину читают и меняют шапка, каталог и страница оформления в разных частях дерева',
          en: 'The cart is read and changed by the header, the catalog and the checkout page in different parts of the tree',
        },
      },
      { text: { ru: 'Для флага наведения мыши на кнопку', en: 'For a button hover flag' } },
      { text: { ru: 'Для данных, которые нужны одному компоненту', en: 'For data only one component needs' } },
      { text: { ru: 'Для ответа API, который уже кэширует TanStack Query', en: 'For an API response that TanStack Query already caches' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Стор нужен, когда одни и те же клиентские данные читают и меняют далёкие друг от друга компоненты: пропсы через много уровней неудобны, а контекст перерисует всех потребителей. Локальное держат в компоненте, а серверное — в кэше запросов.',
          en: 'A store is needed when distant components read and change the same client data: props through many levels are awkward, and context re-renders every consumer. Keep local state in the component and server state in the query cache.',
        },
      },
    ],
    sources: [
      { title: 'React — Sharing State Between Components', url: `${REACT}/sharing-state-between-components` },
      { title: 'Effector — Core concepts', url: 'https://effector.dev/en/introduction/core-concepts/' },
    ],
  },
  {
    id: 'state-server-001',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Список задач фильтруется по статусу. Какой ключ запроса TanStack Query правильный?',
      en: 'A todo list is filtered by status. Which TanStack Query key is right?',
    },
    options: [
      { code: "useQuery({ queryKey: ['todos'], queryFn: () => fetchTodos(status) })" },
      { code: "useQuery({ queryKey: ['todos', { status }], queryFn: () => fetchTodos(status) })" },
      { code: "useQuery({ queryKey: [status], queryFn: () => fetchTodos('all') })" },
      { code: "useQuery({ queryKey: ['todos', Math.random()], queryFn: () => fetchTodos(status) })" },
      { code: 'useQuery({ queryKey: [], queryFn: () => fetchTodos(status) })' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ключ должен включать **все параметры**, от которых зависит запрос. С `[\'todos\', { status }]` у каждого фильтра свой кэш, а смена статуса запускает новый запрос. Без `status` в ключе все фильтры делят одну запись и показывают чужие данные; случайный ключ ломает кэш полностью.',
          en: 'The key must include **every parameter** the request depends on. With `[\'todos\', { status }]` each filter has its own cache, and changing the status triggers a new request. Without `status` in the key all filters share one entry and show the wrong data; a random key breaks caching entirely.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Query Keys', url: `${QUERY}/query-keys` }],
  },
  {
    id: 'state-server-002',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'После добавления задачи список не обновился. Что сделать после успешной мутации?',
      en: 'After adding a todo the list didn’t update. What should you do after a successful mutation?',
    },
    options: [
      { text: { ru: 'Перезагрузить страницу', en: 'Reload the page' } },
      { code: "queryClient.invalidateQueries({ queryKey: ['todos'] })" },
      { text: { ru: 'Поставить `staleTime: Infinity`', en: 'Set `staleTime: Infinity`' } },
      { text: { ru: 'Удалить `queryKey` у списка', en: 'Remove the list’s `queryKey`' } },
      { text: { ru: 'Сохранить задачу в `localStorage`', en: 'Save the todo to `localStorage`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`invalidateQueries` помечает подходящие запросы устаревшими, а активные сразу перезапрашивает — список подтянет новую задачу. Ключ сопоставляется по префиксу: `[\'todos\']` обновит и `[\'todos\', { status }]` для всех фильтров.',
          en: '`invalidateQueries` marks matching queries stale and refetches active ones immediately — the list picks up the new todo. Keys match by prefix: `[\'todos\']` also refreshes `[\'todos\', { status }]` for every filter.',
        },
      },
    ],
    sources: [
      { title: 'TanStack Query — Query Invalidation', url: `${QUERY}/query-invalidation` },
      { title: 'TanStack Query — Mutations', url: `${QUERY}/mutations` },
    ],
  },
  {
    id: 'state-server-003',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'С настройками по умолчанию пользователь переключился на другую вкладку браузера и вернулся. Что сделает TanStack Query?',
      en: 'With default settings the user switched to another browser tab and came back. What will TanStack Query do?',
    },
    options: [
      { text: { ru: 'Ничего — данные кэшируются навсегда', en: 'Nothing — data is cached forever' } },
      {
        text: {
          ru: 'Тихо перезапросит активные запросы: по умолчанию данные сразу считаются устаревшими',
          en: 'Quietly refetch active queries: by default data is considered stale immediately',
        },
      },
      { text: { ru: 'Очистит весь кэш и покажет загрузку', en: 'Clear the whole cache and show a loader' } },
      { text: { ru: 'Покажет ошибку сети', en: 'Show a network error' } },
      { text: { ru: 'Перезагрузит страницу', en: 'Reload the page' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По умолчанию `staleTime: 0` — данные устаревают сразу после загрузки, и при фокусе окна (`refetchOnWindowFocus`), монтировании и восстановлении сети они обновляются в фоне. Пока идёт запрос, на экране остаются закэшированные данные. Если данные меняются редко, `staleTime` увеличивают.',
          en: 'By default `staleTime: 0` — data goes stale right after loading, and on window focus (`refetchOnWindowFocus`), mount and reconnect it’s refreshed in the background. While the request runs, cached data stays on screen. If data changes rarely, increase `staleTime`.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Important Defaults', url: `${QUERY}/important-defaults` }],
  },
  {
    id: 'state-url-001',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const params = new URLSearchParams('?page=2&tag=js&tag=ts');
params.set('page', '3');

console.log(params.get('tag'), params.getAll('tag').length, params.toString());`,
    },
    options: [
      { code: 'js 2 page=3&tag=js&tag=ts' },
      { code: 'ts 2 page=3&tag=js&tag=ts' },
      { code: 'js,ts 2 page=3&tag=js,ts' },
      { code: 'js 1 page=2&page=3&tag=js&tag=ts' },
      { code: 'js 2 ?page=3&tag=js&tag=ts' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`get` возвращает **первое** значение параметра (`js`), `getAll` — все (`js`, `ts`). `set` заменяет все значения параметра одним, а `toString()` собирает строку без ведущего `?`.',
          en: '`get` returns the **first** value of a parameter (`js`), `getAll` — all of them (`js`, `ts`). `set` replaces all values of a parameter with one, and `toString()` builds the string without the leading `?`.',
        },
      },
    ],
    sources: [{ title: 'MDN — URLSearchParams', url: `${MDN}/Web/API/URLSearchParams` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-url-002',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Зачем хранить фильтры каталога в URL, а не только в состоянии компонента?', en: 'Why keep catalog filters in the URL rather than only in component state?' },
    options: [
      { text: { ru: 'Так быстрее работает фильтрация', en: 'Filtering runs faster' } },
      {
        text: {
          ru: 'Фильтры переживут перезагрузку, ими можно поделиться ссылкой, а «Назад» вернёт прежний набор',
          en: 'Filters survive a reload, can be shared as a link, and Back returns the previous set',
        },
      },
      { text: { ru: 'URL шифрует данные', en: 'The URL encrypts the data' } },
      { text: { ru: 'Без URL React не перерисует список', en: 'Without the URL React won’t re-render the list' } },
      { text: { ru: 'Это требование поисковых систем для любого состояния', en: 'Search engines require it for all state' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Состояние в URL — то, что пользователь ожидает сохранить и передать: фильтры, сортировку, страницу, вкладку. Его видно в адресе, оно восстанавливается после перезагрузки и работает с историей браузера. Временное UI-состояние (открыт ли выпадающий список) в URL не кладут.',
          en: 'URL state is what users expect to keep and share: filters, sorting, page, tab. It’s visible in the address, restored after reload and works with browser history. Transient UI state (is a dropdown open) doesn’t go in the URL.',
        },
      },
    ],
    sources: [
      { title: 'MDN — URLSearchParams', url: `${MDN}/Web/API/URLSearchParams` },
      { title: 'MDN — History API', url: `${MDN}/Web/API/History_API` },
    ],
  },
  {
    id: 'state-url-003',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Поиск записывает запрос в `?q=` при каждом введённом символе. Как не превратить историю в 20 шагов «Назад»?',
      en: 'Search writes the query to `?q=` on every keystroke. How do you avoid turning history into 20 Back steps?',
    },
    options: [
      { code: 'history.pushState(null, \'\', `?q=${q}`)' },
      { code: 'history.replaceState(null, \'\', `?q=${q}`)' },
      { code: 'location.href = `?q=${q}`' },
      { code: 'history.back()' },
      { code: 'location.reload()' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`replaceState` меняет адрес текущей записи истории, не добавляя новую: «Назад» уведёт со страницы поиска, а не на прошлую букву. `pushState` создаёт запись на каждый символ, а `location.href` ещё и перезагрузит страницу. Роутеры дают то же через опцию `replace`.',
          en: '`replaceState` changes the current history entry’s URL without adding a new one: Back leaves the search page instead of stepping one letter back. `pushState` creates an entry per keystroke, and `location.href` also reloads the page. Routers expose the same via a `replace` option.',
        },
      },
    ],
    sources: [{ title: 'MDN — History API', url: `${MDN}/Web/API/History_API` }],
  },
];
