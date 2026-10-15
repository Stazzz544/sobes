import type { Question } from '../model/types';

const REACT = 'https://react.dev';
const REDUX = 'https://redux.js.org';
const MDN = 'https://developer.mozilla.org/en-US/docs';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const STATE_QUESTIONS_5: Question[] = [
  {
    id: 'state-immutability-010',
    kind: 'output',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const state = { user: { name: 'Ann' }, createdAt: new Date(0) };
const copy = structuredClone(state);
copy.user.name = 'Bob';
console.log(state.user.name, copy.createdAt instanceof Date);

try {
  structuredClone({ onClick() {} });
} catch (error) {
  console.log(error.name);
}`,
    },
    answers: ['Ann true DataCloneError'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`structuredClone` делает глубокую копию: вложенный `user` новый, поэтому оригинал не меняется. В отличие от `JSON.parse(JSON.stringify(…))`, он сохраняет `Date`, `Map`, `Set`, циклические ссылки и не превращает дату в строку. Функции, DOM-узлы и экземпляры классов с методами он не копирует — бросает `DataCloneError`. Для состояния из простых данных это хороший выбор, но глубокая копия на каждое изменение дороже точечных обновлений через spread.',
          en: '`structuredClone` makes a deep copy: the nested `user` is new, so the original stays unchanged. Unlike `JSON.parse(JSON.stringify(…))`, it keeps `Date`, `Map`, `Set` and circular references and doesn’t turn a date into a string. It can’t copy functions, DOM nodes or class instances with methods — it throws `DataCloneError`. It’s a good fit for plain-data state, but a deep copy on every change costs more than targeted spread updates.',
        },
      },
    ],
    sources: [{ title: 'MDN — structuredClone()', url: `${MDN}/Web/API/Window/structuredClone` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-redux-009',
    kind: 'output',
    topic: 'state',
    tags: ['state-redux'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const counter = (state = 0, action) => (action.type === 'inc' ? state + 1 : state);
const log = (state = [], action) => [...state, action.type];

const combine = (reducers) => (state = {}, action) =>
  Object.fromEntries(Object.entries(reducers).map(([key, reducer]) => [key, reducer(state[key], action)]));

const root = combine({ counter, log });
let state = root(undefined, { type: 'init' });
state = root(state, { type: 'inc' });

console.log(state.counter, state.log.join(','));`,
    },
    answers: ['1 init,inc'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Так устроен `combineReducers`: каждое действие получает **каждый** редьюсер-срез, а тот сам решает, реагировать ли. Поэтому `log` записал и служебное `init`, и `inc`. Первый вызов с `undefined` даёт срезам их значения по умолчанию. Следствие: одно действие может обновить несколько срезов, а редьюсер обязан возвращать прежнее состояние для чужих действий — иначе он затрёт свой срез.',
          en: 'This is how `combineReducers` works: **every** slice reducer receives every action and decides whether to react. That’s why `log` recorded both the internal `init` and `inc`. The first call with `undefined` gives the slices their default values. As a result, one action can update several slices, and a reducer must return its previous state for actions it doesn’t handle — otherwise it wipes its slice.',
        },
      },
    ],
    sources: [{ title: 'Redux — combineReducers', url: `${REDUX}/api/combinereducers` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-redux-010',
    kind: 'order',
    topic: 'state',
    tags: ['state-redux'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Два middleware подключены в порядке `[a, b]`. Расставьте строки в порядке вывода.',
      en: 'Two middleware are applied in the order `[a, b]`. Put the lines in the order they’re logged.',
    },
    code: {
      lang: 'js',
      source: `const logger = (name) => (next) => (action) => {
  console.log(\`\${name} before\`);
  const result = next(action);
  console.log(\`\${name} after\`);
  return result;
};
const reducer = () => console.log('reducer');

const dispatch = [logger('a'), logger('b')].reduceRight((next, middleware) => middleware(next), reducer);
dispatch({ type: 'save' });`,
    },
    items: [{ code: 'a before' }, { code: 'b before' }, { code: 'reducer' }, { code: 'b after' }, { code: 'a after' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Middleware оборачивают `dispatch` как луковица: первый в списке — внешний слой. Действие проходит `a` → `b` → редьюсер, а код после `next(action)` выполняется на обратном пути: `b`, потом `a`. Поэтому логгер ставят последним — он видит действие ровно перед редьюсером, а middleware, которые меняют или перехватывают действия (thunk), — раньше.',
          en: 'Middleware wraps `dispatch` like an onion: the first in the list is the outer layer. The action passes `a` → `b` → reducer, and the code after `next(action)` runs on the way back: `b`, then `a`. That’s why a logger goes last — it sees the action right before the reducer — while middleware that transforms or intercepts actions (thunk) goes earlier.',
        },
      },
    ],
    sources: [{ title: 'Redux — Middleware', url: `${REDUX}/understanding/history-and-design/middleware` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-stores-010',
    kind: 'output',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: '`set` в Zustand сливает новое значение с состоянием только на верхнем уровне — как функция ниже. Что выведет код? Впишите ответ.',
      en: 'Zustand’s `set` merges the new value into state at the top level only — like the function below. What will this code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `let state = { user: { name: 'Ann', age: 30 }, count: 5 };
const set = (partial) => {
  state = { ...state, ...partial };
};

set({ user: { name: 'Bob' } });
console.log(state.user.age, state.count);`,
    },
    answers: ['undefined 5'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`count` сохранился — верхний уровень сливается. А `user` **заменён целиком**: вложенные объекты не сливаются, и `age` потерян. Вложенное обновляют явно: `set((state) => ({ user: { ...state.user, name: "Bob" } }))` или подключают Immer. Тот же подвох у `this.setState` в классовых компонентах React — он тоже сливает только один уровень.',
          en: '`count` survived — the top level is merged. But `user` is **replaced entirely**: nested objects aren’t merged, so `age` is lost. Update nested data explicitly: `set((state) => ({ user: { ...state.user, name: "Bob" } }))`, or use Immer. React class components’ `this.setState` has the same catch — it also merges just one level.',
        },
      },
    ],
    sources: [{ title: 'Zustand — Immutable state and merging', url: 'https://zustand.docs.pmnd.rs/learn/guides/immutable-state-and-merging' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-server-011',
    kind: 'output',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Два компонента одновременно запрашивают одного пользователя через кеш запросов. Что выведет код? Впишите ответ.',
      en: 'Two components request the same user at the same time through a query cache. What will this code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const inFlight = new Map();
let calls = 0;
const fetchUser = (id) => {
  calls += 1;
  return Promise.resolve({ id });
};
const query = (key, fn) => {
  if (!inFlight.has(key)) {
    inFlight.set(key, fn().finally(() => inFlight.delete(key)));
  }
  return inFlight.get(key);
};

const first = query('user:1', () => fetchUser(1));
const second = query('user:1', () => fetchUser(1));
console.log(calls, first === second);`,
    },
    answers: ['1 true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Пока запрос с этим ключом в полёте, второй вызов получает **тот же промис**, а не новый запрос. Так работают TanStack Query, SWR и RTK Query: десять компонентов с одинаковым ключом дают один сетевой запрос, поэтому данные можно запрашивать прямо там, где они нужны, без проброса через пропсы. Отсюда и важность ключа: он должен включать все параметры запроса.',
          en: 'While a request with this key is in flight, the second call gets **the same promise**, not a new request. That’s how TanStack Query, SWR and RTK Query work: ten components with the same key make one network request, so data can be requested right where it’s needed, without passing it down through props. Hence the key matters: it must include every request parameter.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Caching Examples', url: 'https://tanstack.com/query/latest/docs/framework/react/guides/caching' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-basics-008',
    topic: 'state',
    tags: ['state-basics'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'В форме есть `firstName` и `lastName`, а в шапке нужно показать полное имя. Как лучше?',
      en: 'A form has `firstName` and `lastName`, and the header needs the full name. What’s best?',
    },
    options: [
      {
        text: {
          ru: 'Хранить `fullName` в отдельном состоянии и обновлять в `useEffect`',
          en: 'Keep `fullName` in separate state and update it in `useEffect`',
        },
      },
      {
        text: {
          ru: 'Вычислять при рендере: `const fullName = firstName + " " + lastName`',
          en: 'Compute it during render: `const fullName = firstName + " " + lastName`',
        },
      },
      { text: { ru: 'Хранить `fullName` в глобальном сторе', en: 'Keep `fullName` in a global store' } },
      { text: { ru: 'Обновлять `fullName` в каждом обработчике `onChange`', en: 'Update `fullName` in every `onChange` handler' } },
      { text: { ru: 'Сохранять `fullName` в `localStorage`', en: 'Save `fullName` to `localStorage`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Всё, что вычисляется из имеющегося состояния, хранить не нужно — это лишнее состояние, которое может разойтись с источником. Вариант с `useEffect` ещё и даёт лишний рендер: сначала со старым `fullName`, потом с новым. Вычисление при рендере всегда актуально, а дорогие вычисления кешируют через `useMemo`, а не через отдельный стейт.',
          en: 'Anything computed from existing state shouldn’t be stored — it’s redundant state that can drift from its source. The `useEffect` version also adds an extra render: first with the stale `fullName`, then the new one. Computing during render is always up to date, and expensive calculations are cached with `useMemo`, not separate state.',
        },
      },
    ],
    sources: [{ title: 'React — Avoid redundant state', url: `${REACT}/learn/choosing-the-state-structure#avoid-redundant-state` }],
  },
  {
    id: 'state-basics-009',
    topic: 'state',
    tags: ['state-basics'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Два соседних компонента — фильтр и список — должны знать выбранную категорию. Где хранить это состояние?',
      en: 'Two sibling components — a filter and a list — need the selected category. Where should this state live?',
    },
    options: [
      { text: { ru: 'В каждом компоненте своё и синхронизировать через `useEffect`', en: 'In each component, synced via `useEffect`' } },
      { text: { ru: 'Только в фильтре, а список прочитает его через `ref`', en: 'Only in the filter; the list reads it via a `ref`' } },
      {
        text: {
          ru: 'В ближайшем общем родителе и передать вниз пропсами — значение и функцию изменения',
          en: 'In the closest common parent, passed down as props — the value and a setter',
        },
      },
      { text: { ru: 'Обязательно в глобальном сторе', en: 'Always in a global store' } },
      { text: { ru: 'В глобальной переменной модуля', en: 'In a module-level global variable' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это «подъём состояния»: общее состояние живёт в ближайшем общем родителе, вниз уходят значение и колбэк. Так у данных один источник истины, и компоненты не могут разойтись. Две копии с синхронизацией через эффекты дают лишние рендеры и рассинхрон, глобальный стор для двух соседей избыточен, а переменная модуля не вызывает перерисовку.',
          en: 'This is “lifting state up”: shared state lives in the closest common parent, and the value plus a callback go down. The data then has a single source of truth, and the components can’t drift apart. Two copies synced through effects cause extra renders and mismatches, a global store is overkill for two siblings, and a module variable doesn’t trigger re-renders.',
        },
      },
    ],
    sources: [{ title: 'React — Sharing State Between Components', url: `${REACT}/learn/sharing-state-between-components` }],
  },
  {
    id: 'state-immutability-011',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Рецепт Immer `produce(state, (draft) => { if (draft.items.length > 100) draft.items.pop(); })` ничего не изменил — элементов меньше сотни. Что вернёт `produce`?',
      en: 'The Immer recipe `produce(state, (draft) => { if (draft.items.length > 100) draft.items.pop(); })` changed nothing — there are fewer than 100 items. What does `produce` return?',
    },
    options: [
      { text: { ru: 'Глубокую копию `state`', en: 'A deep copy of `state`' } },
      { text: { ru: '`undefined`', en: '`undefined`' } },
      { text: { ru: 'Новый объект с теми же вложенными ссылками', en: 'A new object with the same nested references' } },
      { text: { ru: 'Сам draft-прокси', en: 'The draft proxy itself' } },
      { text: { ru: 'Исходный `state` — ту же ссылку', en: 'The original `state` — the same reference' } },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Immer копирует только то, что действительно изменили, и если изменений не было, возвращает исходный объект. Это важно для React и Redux: та же ссылка значит «ничего не поменялось», и подписчики не перерисуются. Поэтому рецепт без изменений безопасен и дёшев, а сравнение `next === state` — надёжный способ узнать, было ли обновление.',
          en: 'Immer copies only what was actually changed, and if nothing changed it returns the original object. This matters for React and Redux: the same reference means “nothing changed”, so subscribers don’t re-render. A no-op recipe is therefore safe and cheap, and `next === state` is a reliable way to tell whether an update happened.',
        },
      },
    ],
    sources: [{ title: 'Immer — Returning new data from producers', url: 'https://immerjs.github.io/immer/return' }],
  },
  {
    id: 'state-server-012',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Список заказов загружен через TanStack Query, а по WebSocket приходит событие «заказ 42 изменился». Как правильнее обновить экран?',
      en: 'The order list is loaded with TanStack Query, and a WebSocket event says “order 42 changed”. What’s the right way to update the screen?',
    },
    options: [
      { text: { ru: 'Перезагрузить страницу', en: 'Reload the page' } },
      { text: { ru: 'Положить заказы из сокета в отдельный `useState` и показывать его', en: 'Put orders from the socket into a separate `useState` and render that' } },
      {
        text: {
          ru: 'В обработчике события вызвать `queryClient.invalidateQueries` для ключей заказов или обновить кеш через `setQueryData`',
          en: 'In the event handler call `queryClient.invalidateQueries` for the order keys, or update the cache with `setQueryData`',
        },
      },
      { text: { ru: 'Включить `refetchInterval: 1000` и не использовать сокет', en: 'Set `refetchInterval: 1000` and drop the socket' } },
      { text: { ru: 'Хранить сокет в query-ключе', en: 'Put the socket in the query key' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Кеш запросов остаётся единственным источником данных, а сокет только сообщает, что они устарели. `invalidateQueries` перезапросит активные запросы с подходящими ключами — просто и надёжно. Если событие приносит готовые данные, `setQueryData` обновит кеш без запроса. Отдельный `useState` создаёт вторую копию данных, которая разойдётся с кешем, а частый опрос делает сокет бессмысленным.',
          en: 'The query cache stays the single source of data, and the socket only signals that it’s stale. `invalidateQueries` refetches active queries with matching keys — simple and reliable. If the event carries the new data, `setQueryData` updates the cache without a request. A separate `useState` creates a second copy that drifts from the cache, and frequent polling makes the socket pointless.',
        },
      },
    ],
    sources: [{ title: 'TkDodo — Using WebSockets with React Query', url: 'https://tkdodo.eu/blog/using-web-sockets-with-react-query' }],
  },
  {
    id: 'state-redux-011',
    topic: 'state',
    tags: ['state-redux', 'state-server'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В проекте на Redux Toolkit каждую загрузку пишут как `createAsyncThunk` + флаги `loading`/`error` в слайсе. Что даст переход на RTK Query?',
      en: 'In a Redux Toolkit project every load is written as `createAsyncThunk` plus `loading`/`error` flags in a slice. What does moving to RTK Query give?',
    },
    options: [
      { text: { ru: 'Ничего: это просто другой синтаксис для thunk', en: 'Nothing: it’s just another syntax for thunks' } },
      {
        text: {
          ru: 'Кеш серверных данных: дедупликацию запросов, статусы загрузки, повторные запросы и инвалидацию по тегам без ручных редьюсеров',
          en: 'A server-data cache: request deduplication, loading statuses, refetching and tag-based invalidation without hand-written reducers',
        },
      },
      { text: { ru: 'Отказ от Redux Toolkit', en: 'Dropping Redux Toolkit' } },
      { text: { ru: 'Синхронные запросы вместо асинхронных', en: 'Synchronous requests instead of async ones' } },
      { text: { ru: 'Хранение данных в `localStorage` по умолчанию', en: 'Storing data in `localStorage` by default' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Серверные данные — это кеш, а не обычное состояние: им нужны загрузка, ошибки, дедупликация, устаревание и обновление после мутаций. С `createAsyncThunk` всё это пишут руками в каждом слайсе. RTK Query описывает эндпойнты и генерирует хуки: одинаковые запросы объединяются, а мутация с `invalidatesTags` сама перезапрашивает связанные данные. Обычные слайсы остаются для клиентского состояния.',
          en: 'Server data is a cache, not ordinary state: it needs loading, errors, deduplication, staleness and refreshing after mutations. With `createAsyncThunk` all of that is hand-written in every slice. RTK Query describes endpoints and generates hooks: identical requests are merged, and a mutation with `invalidatesTags` refetches related data itself. Regular slices remain for client state.',
        },
      },
    ],
    sources: [{ title: 'Redux Toolkit — RTK Query Overview', url: 'https://redux-toolkit.js.org/rtk-query/overview' }],
  },
];
