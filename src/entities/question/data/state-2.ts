import type { Question } from '../model/types';

const REACT = 'https://react.dev/learn';
const REDUX = 'https://redux.js.org';
const QUERY = 'https://tanstack.com/query/latest/docs/framework/react/guides';
const ZUSTAND = 'https://zustand.docs.pmnd.rs';
const MDN = 'https://developer.mozilla.org/en-US/docs';

export const STATE_QUESTIONS_2: Question[] = [
  {
    id: 'state-basics-004',
    topic: 'state',
    tags: ['state-basics'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Проп `user` пробрасывается через пять компонентов, которым он не нужен, до `Avatar`. Что попробовать в первую очередь?',
      en: 'The `user` prop is drilled through five components that don’t need it, down to `Avatar`. What should you try first?',
    },
    options: [
      { text: { ru: 'Сразу завести глобальный стор', en: 'Set up a global store right away' } },
      {
        text: {
          ru: 'Композицию: передать готовый `<Avatar user={user} />` через `children` или проп-слот, чтобы промежуточные компоненты не знали о `user`',
          en: 'Composition: pass a ready `<Avatar user={user} />` via `children` or a slot prop so intermediate components don’t know about `user`',
        },
      },
      { text: { ru: 'Положить `user` в `window`', en: 'Put `user` on `window`' } },
      { text: { ru: 'Хранить `user` в `localStorage` и читать в `Avatar`', en: 'Store `user` in `localStorage` and read it in `Avatar`' } },
      { text: { ru: 'Скопировать `user` в состояние каждого компонента', en: 'Copy `user` into each component’s state' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Prop drilling часто лечится композицией: родитель, у которого есть данные, сам собирает `<Avatar user={user} />` и передаёт его вниз как `children`. Промежуточные компоненты просто рендерят слот. Если данные действительно нужны многим компонентам на разной глубине (тема, текущий пользователь), подходит контекст, а глобальный стор — когда состояние сложное и часто меняется.',
          en: 'Prop drilling is often cured by composition: the parent that has the data builds `<Avatar user={user} />` itself and passes it down as `children`. Intermediate components just render the slot. If many components at different depths really need the data (theme, current user), use context, and a global store when the state is complex and changes often.',
        },
      },
    ],
    sources: [{ title: 'React — Passing Data Deeply with Context: before you use context', url: `${REACT}/passing-data-deeply-with-context` }],
  },
  {
    id: 'state-basics-005',
    topic: 'state',
    tags: ['state-basics', 'state-redux'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Зачем хранить сущности нормализованно — `{ byId: { 1: {...} }, allIds: [1] }` — вместо вложенных массивов?',
      en: 'Why store entities normalized — `{ byId: { 1: {...} }, allIds: [1] }` — instead of nested arrays?',
    },
    options: [
      { text: { ru: 'Так данные занимают меньше места на сервере', en: 'It takes less space on the server' } },
      {
        text: {
          ru: 'У каждой сущности одна копия: её обновляют в одном месте и находят по id за O(1), а не ищут по вложенным спискам',
          en: 'Each entity has one copy: it’s updated in one place and found by id in O(1) instead of searching nested lists',
        },
      },
      { text: { ru: 'Это требование React', en: 'React requires it' } },
      { text: { ru: 'Чтобы данные нельзя было изменить', en: 'So data can’t be changed' } },
      { text: { ru: 'Это нужно только для сериализации в JSON', en: 'It’s only needed for JSON serialization' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Если автор лежит внутри каждого поста и комментария, смена его имени требует найти и обновить все копии — и легко пропустить одну. В нормализованном виде сущности хранятся таблицами по id, а связи — списками id, как в базе данных. Иммутабельные обновления становятся короче, а мемоизированные селекторы перестают пересчитываться без причины. В Redux Toolkit для этого есть `createEntityAdapter`.',
          en: 'If the author sits inside every post and comment, renaming them means finding and updating every copy — and it’s easy to miss one. Normalized entities are stored as tables by id, with relations as id lists, like a database. Immutable updates get shorter, and memoized selectors stop recomputing for no reason. Redux Toolkit offers `createEntityAdapter` for this.',
        },
      },
    ],
    sources: [{ title: 'Redux — Normalizing State Shape', url: `${REDUX}/usage/structuring-reducers/normalizing-state-shape` }],
  },
  {
    id: 'state-immutability-004',
    kind: 'output',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `const state = Object.freeze({ user: { name: 'Anna' }, tags: ['a'] });

state.user.name = 'Ivan';
state.tags.push('b');

console.log(state.user.name, state.tags.length);`,
    },
    answers: ['Ivan 2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Object.freeze` замораживает только сам объект: нельзя заменить `state.user` или добавить новое поле. Но вложенные объект и массив остались обычными, и их можно менять. Для защиты целиком нужна рекурсивная заморозка — так делает Immer в режиме разработки, — а в TypeScript помогает `readonly`/`Readonly<T>` на этапе компиляции.',
          en: '`Object.freeze` freezes only the object itself: you can’t replace `state.user` or add a field. But the nested object and array are still regular and can be changed. Full protection needs a recursive freeze — Immer does this in development — and in TypeScript `readonly`/`Readonly<T>` helps at compile time.',
        },
      },
    ],
    sources: [{ title: 'MDN — Object.freeze()', url: `${MDN}/Web/JavaScript/Reference/Global_Objects/Object/freeze` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-immutability-005',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какая функция отмечает задачу выполненной, не изменяя исходное состояние и не пересоздавая остальные задачи?',
      en: 'Which function marks a todo as done without mutating the original state or recreating the other todos?',
    },
    options: [
      {
        code: `function toggle(state, id) {
  state.todos.find((todo) => todo.id === id).done = true;
  return state;
}`,
      },
      {
        code: `function toggle(state, id) {
  return {
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        todo.done = true;
      }
      return todo;
    }),
  };
}`,
      },
      {
        code: `function toggle(state, id) {
  return {
    ...state,
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: true } : todo)),
  };
}`,
      },
      {
        code: `function toggle(state, id) {
  const index = state.todos.findIndex((todo) => todo.id === id);
  state.todos[index] = { ...state.todos[index], done: true };
  return { ...state };
}`,
      },
      {
        code: `function toggle(state, id) {
  return Object.assign(state, {
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: true } : todo)),
  });
}`,
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Новые объекты создаются только на пути к изменению: новое состояние, новый массив `todos`, новая задача с `done: true`, а остальные задачи переиспользуются — это **структурное разделение**. Изменение `todo.done` внутри `map`, запись по индексу в старый массив и `Object.assign(state, …)` мутируют исходные данные, и React или селекторы не заметят изменения либо заметят его не там.',
          en: 'New objects are created only along the path to the change: a new state, a new `todos` array, a new todo with `done: true`, while other todos are reused — that’s **structural sharing**. Setting `todo.done` inside `map`, writing by index into the old array and `Object.assign(state, …)` mutate the original data, so React or selectors miss the change or see it in the wrong place.',
        },
      },
    ],
    sources: [{ title: 'React — Updating Arrays in State', url: `${REACT}/updating-arrays-in-state` }],
    verify: {
      kind: 'js-tests',
      tests: `const state = { filter: 'all', todos: [{ id: 1, done: false }, { id: 2, done: false }] };
const before = JSON.stringify(state);
const next = toggle(state, 2);
assert.equal(JSON.stringify(state), before);
assert.notEqual(next, state);
assert.equal(next.todos[1].done, true);
assert.equal(next.todos[0], state.todos[0]);`,
    },
  },
  {
    id: 'state-redux-005',
    kind: 'output',
    topic: 'state',
    tags: ['state-redux'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `function counter(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
  }
}

let state = counter(0, { type: 'increment' });
state = counter(state, { type: 'user/loggedIn' });

console.log(state);`,
    },
    answers: ['undefined'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В Redux **каждое** действие проходит через **все** редьюсеры. Чужое действие `user/loggedIn` не попало ни в один `case`, функция ничего не вернула — и счётчик превратился в `undefined`. Редьюсер обязан возвращать текущее состояние для незнакомых действий: `default: return state`. В `createSlice` это сделано за вас.',
          en: 'In Redux **every** action goes through **all** reducers. The foreign `user/loggedIn` action matched no `case`, the function returned nothing — and the counter became `undefined`. A reducer must return the current state for unknown actions: `default: return state`. `createSlice` does this for you.',
        },
      },
    ],
    sources: [{ title: 'Redux Fundamentals — State, Actions, and Reducers', url: `${REDUX}/tutorials/fundamentals/part-3-state-actions-reducers` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-redux-006',
    topic: 'state',
    tags: ['state-redux'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что из этого **нельзя** делать внутри редьюсера?',
      en: 'Which of these must **not** be done inside a reducer?',
    },
    options: [
      { text: { ru: 'Вычислять новое состояние из текущего и действия', en: 'Compute new state from the current state and the action' } },
      { text: { ru: 'Возвращать прежнее состояние для незнакомых действий', en: 'Return the previous state for unknown actions' } },
      {
        text: {
          ru: 'Генерировать id через `crypto.randomUUID()` или брать `Date.now()`',
          en: 'Generate ids with `crypto.randomUUID()` or read `Date.now()`',
        },
      },
      { text: { ru: 'Копировать массив перед изменением', en: 'Copy an array before changing it' } },
      { text: { ru: 'Использовать `action.payload`', en: 'Use `action.payload`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Редьюсер — **чистая функция**: один и тот же вход всегда даёт тот же результат и без побочных эффектов. На этом держатся отладка «путешествием во времени», воспроизведение багов по логу действий и тесты. Случайные id и время вычисляют до диспатча — в action creator или в `prepare` у `createSlice`, — а запросы к API делают в thunk.',
          en: 'A reducer is a **pure function**: the same input always yields the same result, with no side effects. Time-travel debugging, replaying bugs from an action log and tests all rely on this. Random ids and time are computed before dispatch — in an action creator or `createSlice`’s `prepare` — and API calls go in thunks.',
        },
      },
    ],
    sources: [{ title: 'Redux — Three Principles', url: `${REDUX}/understanding/thinking-in-redux/three-principles` }],
  },
  {
    id: 'state-stores-003',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'После обновления на Zustand v5 компонент падает с «Maximum update depth exceeded». Что не так?',
      en: 'After upgrading to Zustand v5 a component crashes with “Maximum update depth exceeded”. What’s wrong?',
    },
    code: {
      lang: 'js',
      source: `const { count, increment } = useCounterStore((state) => ({
  count: state.count,
  increment: state.increment,
}));`,
    },
    options: [
      { text: { ru: 'Нельзя читать из стора функции', en: 'Functions can’t be read from the store' } },
      {
        text: {
          ru: 'Селектор каждый раз возвращает новый объект, и v5 считает это изменением; нужен `useShallow` или отдельные селекторы',
          en: 'The selector returns a new object every time, and v5 treats that as a change; use `useShallow` or separate selectors',
        },
      },
      { text: { ru: 'В v5 убрали селекторы', en: 'v5 removed selectors' } },
      { text: { ru: 'Нужно обернуть компонент в `memo`', en: 'The component must be wrapped in `memo`' } },
      { text: { ru: 'Стор нужно создать заново при каждом рендере', en: 'The store must be recreated on every render' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Zustand сравнивает результат селектора по ссылке. Литерал `{ count, increment }` — новый объект при каждом вызове, поэтому в v5, который работает как стандартный `useSyncExternalStore`, это превращается в бесконечные перерисовки. Варианты: обернуть селектор в `useShallow` (сравнение полей) или брать значения отдельными вызовами `useCounterStore((state) => state.count)`.',
          en: 'Zustand compares the selector’s result by reference. The `{ count, increment }` literal is a new object on every call, so in v5, which behaves like standard `useSyncExternalStore`, this turns into endless re-renders. Options: wrap the selector in `useShallow` (field comparison) or read values separately with `useCounterStore((state) => state.count)`.',
        },
      },
    ],
    sources: [
      { title: 'Zustand — Migrating to v5', url: `${ZUSTAND}/reference/migrations/migrating-to-v5` },
      { title: 'Zustand — useShallow', url: `${ZUSTAND}/reference/hooks/use-shallow` },
    ],
  },
  {
    id: 'state-stores-004',
    kind: 'output',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Сколько раз пересчитается фильтр? Впишите число, которое выведет код.',
      en: 'How many times does the filter recompute? Type the number the code prints.',
    },
    code: {
      lang: 'js',
      source: `function createSelector(select, compute) {
  let lastInput;
  let lastResult;
  return (state) => {
    const input = select(state);
    if (input !== lastInput) {
      lastInput = input;
      lastResult = compute(input);
    }
    return lastResult;
  };
}

let runs = 0;
const selectDone = createSelector(
  (state) => state.todos,
  (todos) => {
    runs++;
    return todos.filter((todo) => todo.done);
  },
);

const todos = [{ done: true }, { done: false }];
selectDone({ todos, filter: 'all' });
selectDone({ todos, filter: 'done' });
selectDone({ todos: [...todos], filter: 'done' });

console.log(runs);`,
    },
    answers: ['2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Мемоизированный селектор пересчитывает результат, только когда входные данные изменились **по ссылке**. Смена `filter` не касается `todos` — второй вызов берёт кеш. Третий получил новый массив с теми же элементами, и ссылка другая — пересчёт. Поэтому иммутабельные обновления, создающие новые объекты только там, где что-то поменялось, так важны для производительности.',
          en: 'A memoized selector recomputes only when its inputs change **by reference**. Changing `filter` doesn’t touch `todos` — the second call hits the cache. The third gets a new array with the same items, so the reference differs — recompute. That’s why immutable updates that create new objects only where something changed matter for performance.',
        },
      },
    ],
    sources: [{ title: 'Redux — Deriving Data with Selectors', url: `${REDUX}/usage/deriving-data-selectors` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-stores-005',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чем сигналы (Angular, Preact, Solid) отличаются от состояния в `useState`?',
      en: 'How do signals (Angular, Preact, Solid) differ from `useState` state?',
    },
    options: [
      { text: { ru: 'Ничем, это другое название того же', en: 'No difference, it’s another name for the same thing' } },
      {
        text: {
          ru: 'Сигнал сам знает, кто его читает, и при изменении обновляет только зависимые вычисления и места в DOM, а не перерисовывает весь компонент',
          en: 'A signal knows who reads it and, on change, updates only dependent computations and DOM spots rather than re-rendering the whole component',
        },
      },
      { text: { ru: 'Сигналы хранятся на сервере', en: 'Signals are stored on the server' } },
      { text: { ru: 'Сигналы нельзя изменять', en: 'Signals can’t be changed' } },
      { text: { ru: 'Сигналы работают только с числами', en: 'Signals only work with numbers' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Сигнал** — контейнер значения с автоматическим отслеживанием зависимостей: когда `computed` или шаблон читает сигнал, он подписывается на него. При изменении обновляются только эти подписчики — это мелкозернистая реактивность. В React же изменение `useState` перерисовывает компонент целиком и его потомков, а лишнее отсекают мемоизацией.',
          en: 'A **signal** is a value container with automatic dependency tracking: when a `computed` or template reads a signal, it subscribes to it. On change only those subscribers update — fine-grained reactivity. In React, a `useState` change re-renders the whole component and its children, with memoization cutting the excess.',
        },
      },
    ],
    sources: [
      { title: 'Angular — Signals', url: 'https://angular.dev/guide/signals' },
      { title: 'Preact — Signals', url: 'https://preactjs.com/guide/v10/signals/' },
    ],
  },
  {
    id: 'state-server-004',
    kind: 'order',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Оптимистичное обновление лайка в TanStack Query. Расставьте шаги по порядку.',
      en: 'An optimistic like update in TanStack Query. Put the steps in order.',
    },
    items: [
      { text: { ru: '`cancelQueries` — отменить запросы, которые могут перезаписать кеш', en: '`cancelQueries` — cancel queries that could overwrite the cache' } },
      { text: { ru: '`getQueryData` — сохранить снимок текущих данных', en: '`getQueryData` — save a snapshot of current data' } },
      { text: { ru: '`setQueryData` — сразу показать лайк в интерфейсе', en: '`setQueryData` — show the like in the UI right away' } },
      { text: { ru: 'При ошибке — вернуть снимок в кеш', en: 'On error — restore the snapshot into the cache' } },
      { text: { ru: 'В конце — `invalidateQueries`, чтобы сверить данные с сервером', en: 'Finally — `invalidateQueries` to sync with the server' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В `onMutate` сначала отменяют идущие запросы (иначе старый ответ затрёт оптимистичное значение), сохраняют снимок и записывают ожидаемый результат. Снимок возвращают как контекст: в `onError` его кладут обратно. В `onSettled` — при успехе и ошибке — инвалидируют запрос, чтобы окончательно взять данные с сервера.',
          en: 'In `onMutate`, first cancel in-flight queries (otherwise an old response overwrites the optimistic value), save a snapshot and write the expected result. Return the snapshot as context: `onError` puts it back. In `onSettled` — on success or error — invalidate the query to finally take server data.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Optimistic Updates', url: `${QUERY}/optimistic-updates` }],
  },
  {
    id: 'state-server-005',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чем `staleTime` отличается от `gcTime` в TanStack Query?',
      en: 'How does `staleTime` differ from `gcTime` in TanStack Query?',
    },
    options: [
      { text: { ru: 'Это одно и то же, просто разные версии API', en: 'They’re the same, just different API versions' } },
      {
        text: {
          ru: '`staleTime` — сколько данные считаются свежими и не перезапрашиваются; `gcTime` — сколько неиспользуемый кеш хранится в памяти',
          en: '`staleTime` — how long data stays fresh and isn’t refetched; `gcTime` — how long unused cache stays in memory',
        },
      },
      { text: { ru: '`staleTime` — таймаут запроса, `gcTime` — интервал повторов', en: '`staleTime` — request timeout, `gcTime` — retry interval' } },
      { text: { ru: '`gcTime` задаёт, как часто данные обновляются в фоне', en: '`gcTime` sets how often data refreshes in the background' } },
      { text: { ru: '`staleTime` работает только для мутаций', en: '`staleTime` only applies to mutations' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По умолчанию `staleTime: 0` — данные сразу «несвежие», и при монтировании, фокусе окна или переподключении их перезапрашивают в фоне, показывая кеш. `gcTime` (по умолчанию 5 минут) — сколько хранить данные запроса, на который никто не подписан; потом они удаляются. Для редко меняющихся справочников поднимают `staleTime`, а не `gcTime`.',
          en: 'By default `staleTime: 0` — data is stale right away, and on mount, window focus or reconnect it’s refetched in the background while showing the cache. `gcTime` (5 minutes by default) is how long to keep data of a query nobody subscribes to; then it’s removed. For rarely changing reference data raise `staleTime`, not `gcTime`.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Caching Examples', url: `${QUERY}/caching` }],
  },
  {
    id: 'state-server-006',
    kind: 'output',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Пользователь быстро ввёл «re», потом «react». Что покажет поиск? Впишите, что выведет код.',
      en: 'The user quickly typed “re”, then “react”. What will search show? Type what the code prints.',
    },
    code: {
      lang: 'js',
      source: `let shown;
const fakeFetch = (query, ms) => new Promise((resolve) => setTimeout(() => resolve(query), ms));

async function search(query, ms) {
  shown = await fakeFetch(query, ms);
}

search('re', 50);
search('react', 10);
setTimeout(() => console.log(shown), 100);`,
    },
    answers: ['re'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ответ на «react» пришёл первым, а запоздавший ответ на «re» перезаписал его — на экране результаты устаревшего запроса. Это **гонка запросов**. Лечится отменой прошлого запроса (`AbortController`), флагом «игнорировать устаревший ответ» в эффекте или библиотекой: в TanStack Query у каждого запроса свой ключ, и экран берёт данные по актуальному ключу.',
          en: 'The “react” response arrived first, and the late “re” response overwrote it — the screen shows stale results. That’s a **race condition**. Fix it by aborting the previous request (`AbortController`), an “ignore stale response” flag in the effect, or a library: in TanStack Query each query has its own key, and the screen reads data for the current key.',
        },
      },
    ],
    sources: [
      { title: 'React — You Might Not Need an Effect: fetching data', url: `${REACT}/you-might-not-need-an-effect#fetching-data` },
      { title: 'MDN — AbortController', url: `${MDN}/Web/API/AbortController` },
    ],
    verify: { kind: 'js-output' },
  },
];
