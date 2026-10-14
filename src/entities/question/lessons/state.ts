import type { Lesson } from '../model/types';

const REACT = 'https://react.dev/learn';
const REDUX = 'https://redux.js.org';
const QUERY = 'https://tanstack.com/query/latest/docs/framework/react/guides';
const MDN = 'https://developer.mozilla.org/en-US/docs';

export const STATE_LESSONS: Lesson[] = [
  {
    tag: 'state-basics',
    summary: {
      ru: 'Состояние бывает локальным, общим, серверным и в URL. Главный вопрос — не «какую библиотеку взять», а где у каждого кусочка данных источник правды.',
      en: 'State can be local, shared, server or in the URL. The main question isn’t “which library” but where each piece of data has its source of truth.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Локальное** состояние (открыта ли модалка, текст в поле) живёт в компоненте. **Общее клиентское** (тема, корзина, авторизация) — в контексте или сторе. **Серверное** (списки, профиль) — копия данных с сервера: её нужно кэшировать, обновлять и инвалидировать, это работа для TanStack Query и аналогов, а не для глобального стора. **URL** хранит то, чем хочется делиться ссылкой: фильтры, страницу, вкладку.',
          en: '**Local** state (is the modal open, input text) lives in a component. **Shared client** state (theme, cart, auth) goes in context or a store. **Server** state (lists, profile) is a copy of server data: it must be cached, refreshed and invalidated — a job for TanStack Query and similar, not a global store. The **URL** holds what you want to share as a link: filters, page, tab.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Не дублируйте данные: храните `selectedId`, а не копию выбранного объекта, — иначе после обновления списка копия устареет. Всё, что вычисляется из других данных, вычисляют при рендере, а не хранят.',
          en: 'Don’t duplicate data: store `selectedId`, not a copy of the selected object — otherwise the copy goes stale after the list updates. Anything computable from other data is computed during render, not stored.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Локальное → в компоненте, общее → в контексте/сторе.', en: 'Local → in the component, shared → in context/a store.' },
      { ru: 'Серверное состояние — кэш, а не глобальный стор.', en: 'Server state is a cache, not a global store.' },
      { ru: 'Один источник правды: id вместо копии объекта.', en: 'One source of truth: an id instead of an object copy.' },
    ],
    sources: [
      { title: 'React — Choosing the State Structure', url: `${REACT}/choosing-the-state-structure` },
      { title: 'TanStack Query — Important Defaults', url: `${QUERY}/important-defaults` },
    ],
  },
  {
    tag: 'state-immutability',
    summary: {
      ru: 'React и большинство сторов замечают изменения по ссылке. Поэтому состояние не мутируют, а создают новые объекты — только на пути к изменённому месту.',
      en: 'React and most stores detect changes by reference. So state isn’t mutated; new objects are created — only along the path to what changed.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Спред `{ ...state }` копирует **только верхний уровень**: вложенные объекты и массивы остаются общими с оригиналом. Изменение `next.user.name` изменит и `state.user.name`. Нужно копировать каждый уровень на пути: `{ ...state, user: { ...state.user, name } }`.',
          en: 'A spread `{ ...state }` copies **only the top level**: nested objects and arrays stay shared with the original. Changing `next.user.name` also changes `state.user.name`. Copy every level along the path: `{ ...state, user: { ...state.user, name } }`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Неизменённые части переиспользуются по ссылке (**структурное разделение**): `map`, который заменяет один элемент, возвращает новый массив, где остальные элементы — те же объекты. Поэтому `memo` и селекторы видят, что поменялось только одно. Методы `push`, `sort`, `reverse`, `splice` мутируют массив — вместо них `[...arr, x]`, `toSorted`, `toReversed`, `filter`.',
          en: 'Unchanged parts are reused by reference (**structural sharing**): a `map` that replaces one item returns a new array where the other items are the same objects. So `memo` and selectors see that only one thing changed. `push`, `sort`, `reverse`, `splice` mutate the array — use `[...arr, x]`, `toSorted`, `toReversed`, `filter` instead.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Изменения определяют по ссылке — мутация незаметна.', en: 'Changes are detected by reference — mutation goes unnoticed.' },
      { ru: 'Спред копирует только верхний уровень.', en: 'A spread copies only the top level.' },
      { ru: 'Неизменённые части переиспользуются по ссылке.', en: 'Unchanged parts are reused by reference.' },
    ],
    sources: [
      { title: 'React — Updating Objects in State', url: `${REACT}/updating-objects-in-state` },
      { title: 'React — Updating Arrays in State', url: `${REACT}/updating-arrays-in-state` },
      { title: 'Redux — Immutable Update Patterns', url: `${REDUX}/usage/structuring-reducers/immutable-update-patterns` },
    ],
  },
  {
    tag: 'state-redux',
    summary: {
      ru: 'Redux — одно хранилище, изменения только через действия и чистые редьюсеры. Redux Toolkit убирает шаблонный код и позволяет «мутировать» черновик через Immer.',
      en: 'Redux is a single store, changed only through actions and pure reducers. Redux Toolkit removes boilerplate and lets you “mutate” a draft via Immer.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Поток данных однонаправленный: UI отправляет **action** → middleware (например, thunk) может выполнить побочные эффекты → **reducer** по старому состоянию и действию вычисляет новое → стор уведомляет подписчиков → UI перерисовывается. Редьюсер — чистая функция: без запросов, таймеров, `Math.random` и мутаций.',
          en: 'Data flows one way: the UI dispatches an **action** → middleware (e.g. a thunk) may run side effects → the **reducer** computes the new state from the old state and the action → the store notifies subscribers → the UI re-renders. A reducer is a pure function: no requests, timers, `Math.random` or mutation.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В `createSlice` можно писать `state.items.push(x)`: Immer записывает изменения черновика и создаёт новый неизменяемый объект. Вне таких редьюсеров мутации по-прежнему запрещены. Селекторы, которые строят новые массивы (`filter`, `map`), мемоизируют через `createSelector` — иначе каждый вызов вернёт новую ссылку и компонент будет перерисовываться.',
          en: 'In `createSlice` you can write `state.items.push(x)`: Immer records draft changes and produces a new immutable object. Outside such reducers mutation is still forbidden. Selectors that build new arrays (`filter`, `map`) are memoized with `createSelector` — otherwise every call returns a new reference and the component re-renders.',
        },
      },
    ],
    keyPoints: [
      { ru: 'action → (middleware) → reducer → подписчики → UI.', en: 'action → (middleware) → reducer → subscribers → UI.' },
      { ru: 'Редьюсер чистый: побочные эффекты — в thunk.', en: 'Reducers are pure: side effects go in thunks.' },
      { ru: 'В `createSlice` «мутация» безопасна благодаря Immer.', en: 'In `createSlice` “mutation” is safe thanks to Immer.' },
      { ru: 'Производные данные — мемоизированными селекторами.', en: 'Derived data — via memoized selectors.' },
    ],
    sources: [
      { title: 'Redux — Concepts and Data Flow', url: `${REDUX}/tutorials/fundamentals/part-2-concepts-data-flow` },
      { title: 'Redux Toolkit — Writing Reducers with Immer', url: 'https://redux-toolkit.js.org/usage/immer-reducers' },
      { title: 'Redux — Deriving Data with Selectors', url: `${REDUX}/usage/deriving-data-selectors` },
    ],
  },
  {
    tag: 'state-stores',
    summary: {
      ru: 'Лёгкие сторы (Zustand, Effector, MobX) решают ту же задачу проще Redux. Производительность зависит от того, на какую часть стора подписан компонент.',
      en: 'Lightweight stores (Zustand, Effector, MobX) solve the same problem more simply than Redux. Performance depends on which part of the store a component subscribes to.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Глобальный стор нужен, когда одни данные читают и меняют компоненты в разных частях дерева: передавать их пропсами через пять уровней неудобно, а контекст перерисовывает всех потребителей при любом изменении значения.',
          en: 'A global store is needed when components in different parts of the tree read and change the same data: passing it through five levels of props is awkward, and context re-renders every consumer on any value change.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Подписывайтесь **селектором** на нужный кусок: `useStore((s) => s.count)` перерисует компонент только при смене `count`, а `useStore()` без селектора — при любом изменении стора. Селектор, возвращающий новый объект или массив, для этого сравнивают поверхностно (`useShallow`) или мемоизируют.',
          en: 'Subscribe with a **selector** to the piece you need: `useStore((s) => s.count)` re-renders only when `count` changes, while `useStore()` without a selector re-renders on any store change. A selector returning a new object or array is compared shallowly (`useShallow`) or memoized.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Стор — когда одни данные нужны далёким компонентам.', en: 'A store — when distant components need the same data.' },
      { ru: 'Подписка селектором на нужный кусок.', en: 'Subscribe with a selector to the needed piece.' },
      { ru: 'Новый объект из селектора — `useShallow` или мемоизация.', en: 'A new object from a selector — `useShallow` or memoization.' },
    ],
    sources: [
      { title: 'Zustand — documentation', url: 'https://zustand.docs.pmnd.rs/' },
      { title: 'Effector — Core concepts', url: 'https://effector.dev/en/introduction/core-concepts/' },
      { title: 'React — Sharing State Between Components', url: `${REACT}/sharing-state-between-components` },
    ],
  },
  {
    tag: 'state-server',
    summary: {
      ru: 'Серверное состояние — кэш данных, которые принадлежат серверу. TanStack Query (React Query) берёт на себя загрузку, кэш, дедупликацию, фоновое обновление и инвалидацию.',
      en: 'Server state is a cache of data owned by the server. TanStack Query (React Query) handles loading, caching, deduplication, background refresh and invalidation.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Данные хранятся по **ключу запроса**: `[\'todos\', { status }]` — у каждого фильтра свой кэш. Два компонента с одним ключом получат один запрос. По умолчанию данные сразу считаются **устаревшими** (`staleTime: 0`) и тихо обновляются при монтировании, фокусе окна и восстановлении сети, а неиспользуемый кэш удаляется через 5 минут (`gcTime`).',
          en: 'Data is stored by **query key**: `[\'todos\', { status }]` — each filter gets its own cache. Two components with the same key share one request. By default data is **stale** immediately (`staleTime: 0`) and refetched quietly on mount, window focus and reconnect, while unused cache is removed after 5 minutes (`gcTime`).',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'После изменения данных (мутации) соответствующие запросы **инвалидируют**: `queryClient.invalidateQueries({ queryKey: [\'todos\'] })` — и активные списки перезапросятся. Класть такие данные в Redux вручную — значит самому писать кэш, флаги загрузки и обновления.',
          en: 'After data changes (a mutation), **invalidate** the related queries: `queryClient.invalidateQueries({ queryKey: [\'todos\'] })` — active lists refetch. Putting this data in Redux by hand means writing the cache, loading flags and refreshing yourself.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Ключ запроса включает все параметры.', en: 'The query key includes all parameters.' },
      { ru: 'Одинаковый ключ — один запрос и общий кэш.', en: 'Same key — one request and a shared cache.' },
      { ru: 'По умолчанию `staleTime: 0` — фоновое обновление.', en: 'Default `staleTime: 0` — background refetching.' },
      { ru: 'После мутации — `invalidateQueries`.', en: 'After a mutation — `invalidateQueries`.' },
    ],
    sources: [
      { title: 'TanStack Query — Important Defaults', url: `${QUERY}/important-defaults` },
      { title: 'TanStack Query — Query Keys', url: `${QUERY}/query-keys` },
      { title: 'TanStack Query — Query Invalidation', url: `${QUERY}/query-invalidation` },
    ],
  },
  {
    tag: 'state-url',
    summary: {
      ru: 'URL — тоже хранилище состояния: фильтры, страница и вкладка в адресе переживают перезагрузку, работают с кнопкой «Назад» и отправляются ссылкой.',
      en: 'The URL is state storage too: filters, page and tab in the address survive reloads, work with the Back button and can be shared as a link.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`URLSearchParams` разбирает и собирает строку запроса: `get` возвращает первое значение параметра, `getAll` — все (`?tag=js&tag=ts`), `set` заменяет значение, `toString()` собирает строку обратно с правильным кодированием.',
          en: '`URLSearchParams` parses and builds the query string: `get` returns a parameter’s first value, `getAll` — all of them (`?tag=js&tag=ts`), `set` replaces a value, `toString()` builds the string back with proper encoding.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`history.pushState` добавляет запись в историю — «Назад» вернёт прежнее состояние. `replaceState` меняет текущую запись: так обновляют параметр поиска при вводе, чтобы не засорять историю десятками шагов. Роутеры (`useSearchParams` в React Router и аналоги) работают поверх этого API.',
          en: '`history.pushState` adds a history entry — Back returns the previous state. `replaceState` changes the current entry: use it to update a search parameter while typing so history isn’t flooded with dozens of steps. Routers (`useSearchParams` in React Router and similar) build on this API.',
        },
      },
    ],
    keyPoints: [
      { ru: 'В URL — то, чем делятся ссылкой: фильтры, страница, вкладка.', en: 'In the URL — what’s shared as a link: filters, page, tab.' },
      { ru: '`get` — первое значение, `getAll` — все.', en: '`get` — first value, `getAll` — all.' },
      { ru: '`pushState` — новый шаг истории, `replaceState` — без него.', en: '`pushState` — a new history step, `replaceState` — none.' },
    ],
    sources: [
      { title: 'MDN — URLSearchParams', url: `${MDN}/Web/API/URLSearchParams` },
      { title: 'MDN — History API', url: `${MDN}/Web/API/History_API` },
    ],
  },
];
