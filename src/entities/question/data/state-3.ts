import type { Question } from '../model/types';

const REACT = 'https://react.dev';
const QUERY = 'https://tanstack.com/query/latest/docs/framework/react/guides';
const MDN = 'https://developer.mozilla.org/en-US/docs';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const STATE_QUESTIONS_3: Question[] = [
  {
    id: 'state-basics-006',
    kind: 'output',
    topic: 'state',
    tags: ['state-basics'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `let state = { items: [{ id: 1, price: 100 }], total: 100 };

state = { ...state, items: [...state.items, { id: 2, price: 50 }] };

console.log(state.total);`,
    },
    answers: ['100'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`total` вычисляется из `items`, но хранится отдельно — и при добавлении товара его забыли обновить. Это **избыточное состояние**: два источника правды, которые рано или поздно разойдутся. Производные значения считают из исходных при рендере или в селекторе: `items.reduce((sum, item) => sum + item.price, 0)`.',
          en: '`total` derives from `items` but is stored separately — and was forgotten when an item was added. That’s **redundant state**: two sources of truth that will drift apart sooner or later. Derived values are computed from the source during render or in a selector: `items.reduce((sum, item) => sum + item.price, 0)`.',
        },
      },
    ],
    sources: [{ title: 'React — Choosing the State Structure: avoid redundant state', url: `${REACT}/learn/choosing-the-state-structure` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-immutability-006',
    kind: 'output',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const state = { items: [3, 1, 2] };
const sorted = state.items.sort();

console.log(state.items.join(''), sorted === state.items);`,
    },
    answers: ['123 true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`sort` сортирует массив **на месте** и возвращает тот же массив, так что «отсортированная копия» оказалась самим состоянием. В React такой код в рендере тихо мутирует пропсы или стор. Неизменяющие версии — `toSorted`, `toReversed`, `toSpliced`, `with` (ES2023) — или копия перед сортировкой: `[...items].sort()`.',
          en: '`sort` sorts the array **in place** and returns the same array, so the “sorted copy” is the state itself. In React such code in render silently mutates props or the store. Non-mutating versions are `toSorted`, `toReversed`, `toSpliced`, `with` (ES2023) — or copy before sorting: `[...items].sort()`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Array.prototype.toSorted()', url: `${MDN}/Web/JavaScript/Reference/Global_Objects/Array/toSorted` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-immutability-007',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какая функция удаляет задачу по `id`, не изменяя исходный массив?',
      en: 'Which function removes a todo by `id` without mutating the original array?',
    },
    options: [
      {
        code: `function removeTodo(todos, id) {
  todos.splice(todos.findIndex((todo) => todo.id === id), 1);
  return todos;
}`,
      },
      {
        code: `function removeTodo(todos, id) {
  delete todos[todos.findIndex((todo) => todo.id === id)];
  return [...todos];
}`,
      },
      {
        code: `function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}`,
      },
      {
        code: `function removeTodo(todos, id) {
  const copy = todos;
  copy.splice(copy.findIndex((todo) => todo.id === id), 1);
  return copy;
}`,
      },
      {
        code: `function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id === id);
}`,
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`filter` возвращает новый массив без нужного элемента, исходный не трогается. `splice` и `delete` меняют исходный массив, а `const copy = todos` копирует только ссылку — это тот же массив. Условие `todo.id === id` наоборот оставило бы только удаляемую задачу.',
          en: '`filter` returns a new array without the item, leaving the original untouched. `splice` and `delete` mutate the original, and `const copy = todos` copies only the reference — it’s the same array. The condition `todo.id === id` would instead keep only the item being removed.',
        },
      },
    ],
    sources: [{ title: 'React — Updating Arrays in State', url: `${REACT}/learn/updating-arrays-in-state` }],
    verify: {
      kind: 'js-tests',
      tests: `const todos = [{ id: 1 }, { id: 2 }, { id: 3 }];
const next = removeTodo(todos, 2);
assert.deepEqual(todos, [{ id: 1 }, { id: 2 }, { id: 3 }]);
assert.deepEqual(next, [{ id: 1 }, { id: 3 }]);
assert.equal(next.length, 2);`,
    },
  },
  {
    id: 'state-redux-007',
    kind: 'output',
    topic: 'state',
    tags: ['state-redux'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const combine = (reducers) => (state = {}, action) =>
  Object.fromEntries(
    Object.entries(reducers).map(([key, reducer]) => [key, reducer(state[key], action)]),
  );

const counter = (state = 0, action) => (action.type === 'inc' ? state + 1 : state);
const user = (state = null, action) => (action.type === 'login' ? action.name : state);

const root = combine({ counter, user });
let state = root(undefined, { type: '@@init' });
state = root(state, { type: 'inc' });
state = root(state, { type: 'login', name: 'Anna' });

console.log(state.counter, state.user);`,
    },
    answers: ['1 Anna'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Так устроен `combineReducers`: корневой редьюсер вызывает каждый вложенный со **своим кусочком** состояния и **каждым** действием. `counter` не знает про `login`, `user` — про `inc`, и оба возвращают прежнее значение для чужих действий. При первом вызове `state[key]` равен `undefined`, и срабатывают значения по умолчанию.',
          en: 'This is how `combineReducers` works: the root reducer calls each nested reducer with **its own slice** of state and **every** action. `counter` knows nothing about `login`, `user` nothing about `inc`, and both return the previous value for foreign actions. On the first call `state[key]` is `undefined`, so the defaults kick in.',
        },
      },
    ],
    sources: [{ title: 'Redux — combineReducers', url: 'https://redux.js.org/api/combinereducers' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-stores-006',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Свой стор подключён через `useSyncExternalStore`, и компонент уходит в бесконечные перерисовки. Что не так?',
      en: 'A custom store is wired via `useSyncExternalStore`, and the component re-renders endlessly. What’s wrong?',
    },
    code: {
      lang: 'js',
      source: `const user = useSyncExternalStore(
  store.subscribe,
  () => ({ ...store.getState().user }),
);`,
    },
    options: [
      { text: { ru: '`subscribe` нужно обернуть в `useCallback`', en: '`subscribe` must be wrapped in `useCallback`' } },
      {
        text: {
          ru: '`getSnapshot` каждый раз возвращает новый объект: React считает, что стор изменился, и перерисовывает снова',
          en: '`getSnapshot` returns a new object every time: React thinks the store changed and re-renders again',
        },
      },
      { text: { ru: 'Хук нельзя использовать вне React Native', en: 'The hook can’t be used outside React Native' } },
      { text: { ru: 'Нужно передать третий аргумент для SSR', en: 'A third argument for SSR is required' } },
      { text: { ru: 'Стор должен быть классом', en: 'The store must be a class' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'React сравнивает результат `getSnapshot` через `Object.is`: пока стор не менялся, функция обязана возвращать **то же** значение. Спред создаёт новый объект на каждый вызов — для React это «новое состояние», и цикл не заканчивается. Возвращают сохранённую ссылку `store.getState().user`, а для вычисленных значений кешируют результат. На этом же споткнулся бы селектор-объект в Zustand v5.',
          en: 'React compares the `getSnapshot` result with `Object.is`: while the store hasn’t changed, the function must return **the same** value. The spread creates a new object on every call — to React that’s “new state”, and the loop never ends. Return the stored reference `store.getState().user`, and cache derived values. An object selector in Zustand v5 trips over the same thing.',
        },
      },
    ],
    sources: [{ title: 'React — useSyncExternalStore', url: `${REACT}/reference/react/useSyncExternalStore` }],
  },
  {
    id: 'state-stores-007',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В чём идея «атомарных» стейт-менеджеров вроде Jotai?',
      en: 'What’s the idea behind “atomic” state managers like Jotai?',
    },
    options: [
      { text: { ru: 'Хранить всё состояние в одном большом объекте', en: 'Keep all state in one big object' } },
      {
        text: {
          ru: 'Состояние дробится на маленькие атомы, производные атомы вычисляются из других, а компонент подписан только на атомы, которые читает',
          en: 'State is split into small atoms, derived atoms compute from others, and a component subscribes only to the atoms it reads',
        },
      },
      { text: { ru: 'Сохранять состояние на сервере после каждого изменения', en: 'Save state to the server after each change' } },
      { text: { ru: 'Запрещать изменение состояния', en: 'Forbid changing state' } },
      { text: { ru: 'Хранить состояние в URL', en: 'Store state in the URL' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Атом — минимальная единица состояния с подпиской. Производный атом читает другие и пересчитывается только при их изменении, а компонент перерисовывается только из-за атомов, которые использует, — без селекторов и мемоизации. Это ближе к `useState`, вынесенному за пределы компонента, чем к одному большому стору Redux.',
          en: 'An atom is the smallest unit of state with subscriptions. A derived atom reads others and recomputes only when they change, and a component re-renders only for the atoms it uses — no selectors or memoization needed. It’s closer to `useState` lifted out of the component than to one big Redux store.',
        },
      },
    ],
    sources: [{ title: 'Jotai — atom', url: 'https://jotai.org/docs/core/atom' }],
  },
  {
    id: 'state-server-007',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Заказы пользователя можно загрузить, только когда известен `userId`, а он приходит отдельным запросом. Как это выразить в TanStack Query?',
      en: 'A user’s orders can only load once `userId` is known, and it comes from a separate request. How do you express that in TanStack Query?',
    },
    options: [
      { code: "useQuery({ queryKey: ['orders', userId], queryFn: () => fetchOrders(userId), enabled: !!userId });" },
      { code: "if (userId) { useQuery({ queryKey: ['orders'], queryFn: () => fetchOrders(userId) }); }" },
      { code: "useEffect(() => { if (userId) queryClient.fetchQuery(['orders']); }, []);" },
      { code: "useQuery({ queryKey: ['orders'], queryFn: () => fetchOrders(userId), retry: 100 });" },
      { code: "useQuery({ queryKey: ['orders'], queryFn: async () => { while (!userId) {} return fetchOrders(userId); } });" },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Зависимый запрос**: `enabled: false`, пока нет `userId`, и запрос стартует сам, когда значение появится. `userId` входит в ключ — у каждого пользователя свой кеш. Хук внутри `if` нарушает правила хуков, бесконечный цикл вешает поток, а повторы при ошибке — не способ ждать данные.',
          en: 'A **dependent query**: `enabled: false` until there’s a `userId`, and the query starts by itself once the value arrives. `userId` is part of the key — each user gets their own cache. A hook inside `if` breaks the rules of hooks, a busy loop blocks the thread, and retries on error aren’t a way to wait for data.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Dependent Queries', url: `${QUERY}/dependent-queries` }],
  },
  {
    id: 'state-server-008',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'При переключении страницы таблицы на месте данных на секунду появляется спиннер, и таблица «прыгает». Как показать старую страницу, пока грузится новая?',
      en: 'When switching table pages, a spinner briefly replaces the data and the table “jumps”. How do you keep showing the old page while the new one loads?',
    },
    options: [
      { text: { ru: 'Увеличить `staleTime` до часа', en: 'Raise `staleTime` to an hour' } },
      {
        text: {
          ru: '`placeholderData: keepPreviousData` — пока грузится новая страница, показываются данные прошлой, а `isPlaceholderData` позволяет приглушить их',
          en: '`placeholderData: keepPreviousData` — while the new page loads, the previous one is shown, and `isPlaceholderData` lets you dim it',
        },
      },
      { text: { ru: 'Убрать номер страницы из ключа запроса', en: 'Remove the page number from the query key' } },
      { text: { ru: 'Загрузить сразу все страницы', en: 'Load all pages at once' } },
      { text: { ru: 'Скрывать таблицу целиком при загрузке', en: 'Hide the whole table while loading' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У каждой страницы свой ключ запроса, поэтому при переходе новый запрос стартует «с нуля» в состоянии загрузки. `placeholderData` с `keepPreviousData` подставляет данные прошлого ключа, пока не придут новые, — таблица не мигает. Убрать номер из ключа нельзя: страницы перепутаются в кеше. Дополнительно следующую страницу можно загрузить заранее через `prefetchQuery`.',
          en: 'Each page has its own query key, so navigating starts a fresh query in the loading state. `placeholderData` with `keepPreviousData` fills in the previous key’s data until new data arrives — the table doesn’t flicker. Removing the page from the key isn’t an option: pages would mix up in the cache. You can also prefetch the next page with `prefetchQuery`.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Paginated Queries', url: `${QUERY}/paginated-queries` }],
  },
  {
    id: 'state-url-004',
    kind: 'output',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const params = new URLSearchParams('?tag=react&tag=css&page=2');

console.log(params.get('tag'), params.getAll('tag').length, typeof params.get('page'));`,
    },
    answers: ['react 2 string'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ключ в строке запроса может повторяться: `get` вернёт только первое значение, все — `getAll`. Значения всегда строки, а отсутствующий ключ — `null`, поэтому номер страницы парсят и проверяют: `Number(params.get(\'page\') ?? 1)`. Для массивов фильтров выбирают один формат — повторяющиеся ключи или `tag=react,css` — и держат его везде.',
          en: 'A key can repeat in a query string: `get` returns only the first value, `getAll` returns all. Values are always strings, and a missing key is `null`, so the page number is parsed and validated: `Number(params.get(\'page\') ?? 1)`. For filter arrays pick one format — repeated keys or `tag=react,css` — and use it everywhere.',
        },
      },
    ],
    sources: [{ title: 'MDN — URLSearchParams.getAll()', url: `${MDN}/Web/API/URLSearchParams/getAll` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-url-005',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Коллега прислал ссылку на каталог с фильтрами. Откуда страница должна взять фильтры при открытии?',
      en: 'A colleague sent a link to the catalog with filters. Where should the page get the filters on open?',
    },
    options: [
      { text: { ru: 'Из `localStorage` — там последние фильтры этого браузера', en: 'From `localStorage` — it has this browser’s last filters' } },
      { text: { ru: 'Из глобального стора с начальными значениями', en: 'From a global store with initial values' } },
      {
        text: {
          ru: 'Из URL: он источник правды для фильтров, а интерфейс лишь отражает и меняет его',
          en: 'From the URL: it’s the source of truth for filters, and the UI only reflects and updates it',
        },
      },
      { text: { ru: 'Запросить у сервера последние фильтры пользователя', en: 'Ask the server for the user’s last filters' } },
      { text: { ru: 'Спросить у пользователя заново', en: 'Ask the user again' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Если фильтры живут в URL, ссылка воспроизводит ровно тот экран, который видел автор, а «Назад» возвращает прошлые фильтры. Ошибка — держать их одновременно в URL и в состоянии и синхронизировать в обе стороны: появляются гонки и циклы обновлений. Состояние читают из URL, а изменения пишут в URL. `localStorage` подходит для настроек вида, а не для того, чем делятся ссылкой.',
          en: 'If filters live in the URL, a link reproduces exactly the screen the sender saw, and “Back” restores previous filters. The mistake is keeping them both in the URL and in state and syncing both ways: races and update loops follow. Read state from the URL and write changes to the URL. `localStorage` suits view preferences, not what people share as links.',
        },
      },
    ],
    sources: [{ title: 'MDN — URLSearchParams', url: `${MDN}/Web/API/URLSearchParams` }],
  },
];
