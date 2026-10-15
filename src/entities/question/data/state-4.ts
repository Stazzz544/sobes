import type { Question } from '../model/types';

const REACT = 'https://react.dev';
const QUERY = 'https://tanstack.com/query/latest/docs/framework/react/guides';
const MDN = 'https://developer.mozilla.org/en-US/docs';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const STATE_QUESTIONS_4: Question[] = [
  {
    id: 'state-immutability-008',
    kind: 'output',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'React решает, нужен ли рендер после `setState`, сравнивая старое и новое значение через `Object.is`. Что выведет код? Впишите ответ.',
      en: 'React decides whether to re-render after `setState` by comparing old and new values with `Object.is`. What will the code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const state = { count: 1 };

const next = state;
next.count = 2;

console.log(Object.is(state, next), state.count);`,
    },
    answers: ['true 2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`next` — та же ссылка, поэтому изменение «следующего» состояния мутировало текущее, а `Object.is` считает их равными. В React `setState(next)` с такой мутацией пропустит рендер: для React ничего не изменилось, хотя данные другие. Отсюда правило — новое состояние создают копией: `setState({ ...state, count: 2 })`.',
          en: '`next` is the same reference, so changing the “next” state mutated the current one, and `Object.is` considers them equal. In React, `setState(next)` with such a mutation skips the render: to React nothing changed, though the data did. Hence the rule — create new state as a copy: `setState({ ...state, count: 2 })`.',
        },
      },
    ],
    sources: [{ title: 'React — useState: caveats', url: `${REACT}/reference/react/useState` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-immutability-009',
    kind: 'output',
    topic: 'state',
    tags: ['state-immutability'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'История для «Отменить» хранит снимки состояния. Что выведет код? Впишите ответ.',
      en: 'An undo history stores state snapshots. What will the code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const history = [];
const state = { user: { name: 'Anna' } };

history.push({ ...state });
state.user.name = 'Ivan';

console.log(history[0].user.name);`,
    },
    answers: ['Ivan'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Спред копирует только верхний уровень: в снимке лежит ссылка на тот же объект `user`, и мутация «переписала историю». Работающая отмена возможна при одном из двух условий: состояние обновляется иммутабельно (старые объекты не меняются, и снимок — просто сохранённая ссылка), либо снимок делают глубокой копией через `structuredClone`.',
          en: 'Spread copies only the top level: the snapshot holds a reference to the same `user` object, and the mutation “rewrote history”. Undo works under one of two conditions: state is updated immutably (old objects never change, so a snapshot is just a stored reference), or snapshots are deep copies via `structuredClone`.',
        },
      },
    ],
    sources: [{ title: 'MDN — structuredClone()', url: `${MDN}/Web/API/Window/structuredClone` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-redux-008',
    kind: 'output',
    topic: 'state',
    tags: ['state-redux'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `let state = 0;
const log = [];
const getState = () => state;
const reducer = (action) => {
  if (action.type === 'add') {
    state += action.amount;
  }
  log.push(action.type);
};

const thunk = (next) => (action) =>
  typeof action === 'function' ? action(dispatch, getState) : next(action);
const dispatch = (action) => thunk(reducer)(action);

dispatch((innerDispatch, innerGetState) => {
  innerDispatch({ type: 'add', amount: 2 });
  if (innerGetState() > 1) {
    innerDispatch({ type: 'add', amount: 10 });
  }
});

console.log(state, log.length);`,
    },
    answers: ['12 2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Так устроен **redux-thunk**: если вместо объекта действия пришла функция, middleware вызывает её с `dispatch` и `getState`, а в редьюсер она не попадает. Внутри можно диспатчить несколько обычных действий и читать актуальное состояние между ними. Поэтому в редьюсер дошли два действия, а функция — нет. На thunk построен `createAsyncThunk` в Redux Toolkit.',
          en: 'This is how **redux-thunk** works: if a function arrives instead of an action object, the middleware calls it with `dispatch` and `getState`, and it never reaches the reducer. Inside you can dispatch several plain actions and read fresh state between them. So the reducer saw two actions, not the function. Redux Toolkit’s `createAsyncThunk` is built on thunks.',
        },
      },
    ],
    sources: [{ title: 'Redux — Writing Logic with Thunks', url: 'https://redux.js.org/usage/writing-logic-thunks' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-stores-008',
    kind: 'output',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const shallowEqual = (a, b) =>
  Object.keys(a).length === Object.keys(b).length &&
  Object.keys(a).every((key) => Object.is(a[key], b[key]));

const items = [1, 2];
console.log(
  shallowEqual({ items, page: 1 }, { items, page: 1 }),
  shallowEqual({ items: [1, 2], page: 1 }, { items, page: 1 }),
);`,
    },
    answers: ['true false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Поверхностное сравнение** проверяет ключи верхнего уровня через `Object.is`: в первом случае `items` — та же ссылка, во втором — новый массив с теми же числами. Так работают `useShallow` в Zustand и `shallowEqual` в `react-redux`: селектор может возвращать новый объект, но рендер случится, только если поменялась какая-то из его частей.',
          en: '**Shallow comparison** checks top-level keys with `Object.is`: in the first case `items` is the same reference, in the second a new array with the same numbers. That’s how Zustand’s `useShallow` and `react-redux`’s `shallowEqual` work: a selector may return a new object, but a render happens only if one of its parts changed.',
        },
      },
    ],
    sources: [{ title: 'Zustand — useShallow', url: 'https://zustand.docs.pmnd.rs/reference/hooks/use-shallow' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-stores-009',
    topic: 'state',
    tags: ['state-stores'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Корзина на `useReducer` + Context. Кнопки «В корзину» на каждой карточке перерисовываются при любом изменении корзины, хотя им нужен только `dispatch`. Как исправить?',
      en: 'A cart uses `useReducer` + Context. “Add to cart” buttons on every card re-render on any cart change, though they only need `dispatch`. How do you fix it?',
    },
    options: [
      { text: { ru: 'Обернуть кнопки в `useMemo`', en: 'Wrap the buttons in `useMemo`' } },
      {
        text: {
          ru: 'Разделить контексты: состояние — в одном, `dispatch` — в другом; `dispatch` стабилен, и его подписчики не перерисовываются',
          en: 'Split contexts: state in one, `dispatch` in another; `dispatch` is stable, so its consumers don’t re-render',
        },
      },
      { text: { ru: 'Хранить корзину в `localStorage`', en: 'Store the cart in `localStorage`' } },
      { text: { ru: 'Передавать `dispatch` через `window`', en: 'Pass `dispatch` through `window`' } },
      { text: { ru: 'Это невозможно без Redux', en: 'Impossible without Redux' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Все потребители контекста перерисовываются, когда меняется его `value`. Если в одном контексте `{ cart, dispatch }`, кнопкам «прилетает» каждое изменение корзины. `dispatch` из `useReducer` не меняется между рендерами, поэтому в отдельном контексте его подписчики спокойны. Это рекомендованный в документации React паттерн; дальше по сложности — сторы с селекторами.',
          en: 'All context consumers re-render when its `value` changes. With `{ cart, dispatch }` in one context, the buttons get every cart change. `dispatch` from `useReducer` doesn’t change between renders, so in a separate context its consumers stay calm. It’s the pattern React’s docs recommend; beyond that, stores with selectors.',
        },
      },
    ],
    sources: [{ title: 'React — Scaling Up with Reducer and Context', url: `${REACT}/learn/scaling-up-with-reducer-and-context` }],
  },
  {
    id: 'state-server-009',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В кеше лежат запросы `[\'todos\']`, `[\'todos\', { status: \'done\' }]` и `[\'user\']`. Что инвалидирует `invalidateQueries({ queryKey: [\'todos\'] })`?',
      en: 'The cache holds `[\'todos\']`, `[\'todos\', { status: \'done\' }]` and `[\'user\']`. What does `invalidateQueries({ queryKey: [\'todos\'] })` invalidate?',
    },
    options: [
      { text: { ru: 'Только `[\'todos\']`', en: 'Only `[\'todos\']`' } },
      { text: { ru: 'Оба запроса, которые начинаются с `todos`, а `[\'user\']` нет', en: 'Both queries starting with `todos`, but not `[\'user\']`' } },
      { text: { ru: 'Все три', en: 'All three' } },
      { text: { ru: 'Ничего, нужен точный ключ', en: 'Nothing, an exact key is required' } },
      { text: { ru: 'Только `[\'todos\', { status: \'done\' }]`', en: 'Only `[\'todos\', { status: \'done\' }]`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Фильтры запросов сравнивают ключ **по префиксу**: `[\'todos\']` совпадает со всеми ключами, которые с него начинаются, — и списком, и его вариантами с фильтрами. Поэтому ключи строят иерархически: от общего к частному. Если нужен ровно один запрос, добавляют `exact: true`.',
          en: 'Query filters match keys **by prefix**: `[\'todos\']` matches every key starting with it — the list and its filtered variants. That’s why keys are built hierarchically, from general to specific. To target exactly one query, add `exact: true`.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Query Invalidation', url: `${QUERY}/query-invalidation` }],
  },
  {
    id: 'state-server-010',
    topic: 'state',
    tags: ['state-server'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Страница рендерится на сервере, а потом клиент заново запрашивает те же данные. Как этого избежать с TanStack Query?',
      en: 'A page renders on the server, then the client fetches the same data again. How do you avoid this with TanStack Query?',
    },
    options: [
      { text: { ru: 'Отключить SSR', en: 'Disable SSR' } },
      {
        text: {
          ru: 'На сервере выполнить `prefetchQuery`, передать кеш через `dehydrate`, а на клиенте обернуть дерево в `HydrationBoundary` и задать `staleTime` больше нуля',
          en: 'On the server run `prefetchQuery`, pass the cache via `dehydrate`, and on the client wrap the tree in `HydrationBoundary` with a non-zero `staleTime`',
        },
      },
      { text: { ru: 'Хранить данные в глобальной переменной модуля', en: 'Keep the data in a module-level variable' } },
      { text: { ru: 'Запрашивать данные только в `useEffect`', en: 'Fetch data only in `useEffect`' } },
      { text: { ru: 'Положить ответ в `localStorage` на сервере', en: 'Put the response in `localStorage` on the server' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сервер заполняет свой (созданный на этот запрос!) `QueryClient`, сериализует кеш через `dehydrate`, и клиент подхватывает его в `HydrationBoundary` — данные уже есть до первого рендера. Без `staleTime` они сразу будут считаться устаревшими и запросятся повторно. Модульная переменная на сервере опасна: она общая для всех пользователей.',
          en: 'The server fills its own (per-request!) `QueryClient`, serializes the cache with `dehydrate`, and the client picks it up in `HydrationBoundary` — data is there before the first render. Without `staleTime` it’s immediately stale and refetched. A module-level variable on the server is dangerous: it’s shared by all users.',
        },
      },
    ],
    sources: [{ title: 'TanStack Query — Advanced Server Rendering', url: `${QUERY}/advanced-ssr` }],
  },
  {
    id: 'state-url-006',
    kind: 'output',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const params = new URLSearchParams('page=2&sort=price');

params.set('page', '1');
params.append('tag', 'sale');
params.append('tag', 'new');
params.delete('sort');

console.log(params.toString());`,
    },
    answers: ['page=1&tag=sale&tag=new'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`set` заменяет все значения ключа одним, `append` добавляет ещё одно, `delete` убирает ключ целиком. Порядок пар сохраняется: `page` остался на своём месте. При смене фильтров обычно сбрасывают номер страницы — иначе пользователь окажется на пустой странице 5 нового списка.',
          en: '`set` replaces all values of a key with one, `append` adds another, `delete` removes the key entirely. Pair order is kept: `page` stays in place. When filters change, the page number is usually reset — otherwise the user lands on an empty page 5 of the new list.',
        },
      },
    ],
    sources: [{ title: 'MDN — URLSearchParams', url: `${MDN}/Web/API/URLSearchParams` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-url-007',
    kind: 'output',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: { lang: 'js', source: `console.log(new URLSearchParams({ q: 'rock & roll' }).toString());` },
    answers: ['q=rock+%26+roll'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`URLSearchParams` кодирует значения сам: `&` превращается в `%26`, иначе он разорвал бы параметр на два, а пробел — в `+` (формат форм). Собирать строку запроса вручную через шаблонную строку опасно: `?q=${query}` с `&` внутри сломает URL. `encodeURIComponent` кодирует пробел как `%20` — оба варианта сервер поймёт.',
          en: '`URLSearchParams` encodes values itself: `&` becomes `%26`, or it would split the parameter in two, and a space becomes `+` (form format). Building query strings by hand with a template string is risky: `?q=${query}` with an `&` inside breaks the URL. `encodeURIComponent` encodes space as `%20` — servers understand both.',
        },
      },
    ],
    sources: [{ title: 'MDN — URLSearchParams.toString()', url: `${MDN}/Web/API/URLSearchParams/toString` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-basics-007',
    topic: 'state',
    tags: ['state-basics'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Выбранная тема оформления должна сохраняться между визитами. Где её хранить?',
      en: 'The selected color theme must persist between visits. Where should it live?',
    },
    options: [
      { text: { ru: 'В `useState` корневого компонента', en: 'In the root component’s `useState`' } },
      { text: { ru: 'В URL: `?theme=dark`', en: 'In the URL: `?theme=dark`' } },
      {
        text: {
          ru: 'В `localStorage` (или в профиле на сервере), читая при старте, а в приложении — в контексте или сторе',
          en: 'In `localStorage` (or the server profile), read on startup, and in the app — in context or a store',
        },
      },
      { text: { ru: 'В кеше TanStack Query', en: 'In the TanStack Query cache' } },
      { text: { ru: 'В `sessionStorage`', en: 'In `sessionStorage`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useState` живёт до перезагрузки, `sessionStorage` — до закрытия вкладки, а тема — личная настройка, которой не делятся ссылкой, так что URL тоже не подходит. Её сохраняют в `localStorage` (или в профиле, если нужна синхронизация между устройствами) и читают при старте. Чтобы тема не «моргала» при загрузке, значение применяют до первой отрисовки.',
          en: '`useState` lives until reload, `sessionStorage` until the tab closes, and a theme is a personal setting not shared via links, so the URL doesn’t fit either. Save it to `localStorage` (or the profile, to sync across devices) and read it on startup. To avoid a theme “flash” on load, apply the value before the first paint.',
        },
      },
    ],
    sources: [{ title: 'MDN — Window.localStorage', url: `${MDN}/Web/API/Window/localStorage` }],
  },
];
