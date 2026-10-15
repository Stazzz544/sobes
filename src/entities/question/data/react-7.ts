import type { Question } from '../model/types';

const LEARN = 'https://react.dev/learn';
const REFERENCE = 'https://react.dev/reference';

export const REACT_QUESTIONS_7: Question[] = [
  {
    id: 'react-state-007',
    topic: 'react',
    tags: ['state'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Когда `useReducer` удобнее, чем несколько `useState`?',
      en: 'When is `useReducer` more convenient than several `useState` calls?',
    },
    options: [
      { text: { ru: 'Всегда: `useState` устарел', en: 'Always: `useState` is deprecated' } },
      {
        text: {
          ru: 'Когда много связанных полей меняются вместе в разных обработчиках — логику обновлений удобно собрать в одну чистую функцию',
          en: 'When many related fields change together across handlers — the update logic fits into one pure function',
        },
      },
      { text: { ru: 'Только для асинхронных запросов', en: 'Only for async requests' } },
      { text: { ru: 'Когда состояние — одно число', en: 'When the state is a single number' } },
      { text: { ru: 'Чтобы состояние стало глобальным', en: 'To make state global' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Редьюсер переносит «как меняется состояние» из обработчиков в одну функцию `(state, action) => newState`: обработчики только сообщают, что произошло, — `dispatch({ type: "added", text })`. Это упрощает форму, корзину, мастер из нескольких шагов, где одно действие трогает несколько полей. Редьюсер чистый, поэтому его легко тестировать без React. Для одного флага или числа `useState` проще.',
          en: 'A reducer moves “how state changes” out of handlers into one function `(state, action) => newState`: handlers only report what happened — `dispatch({ type: "added", text })`. That simplifies a form, a cart, a multi-step wizard where one action touches several fields. The reducer is pure, so it’s easy to test without React. For a single flag or number `useState` is simpler.',
        },
      },
    ],
    sources: [{ title: 'React — Comparing useState and useReducer', url: `${LEARN}/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer` }],
  },
  {
    id: 'react-forms-003',
    topic: 'react',
    tags: ['forms', 'hooks-rules'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Компонент поля рендерит `<label htmlFor={id}>` и `<input id={id}>`, и на странице его используют несколько раз. Как получить `id`?',
      en: 'A field component renders `<label htmlFor={id}>` and `<input id={id}>`, and it’s used several times on a page. How do you get the `id`?',
    },
    options: [
      { text: { ru: '`const id = Math.random().toString(36)`', en: '`const id = Math.random().toString(36)`' } },
      { text: { ru: 'Глобальный счётчик в модуле', en: 'A module-level global counter' } },
      {
        text: {
          ru: '`const id = useId()` — уникальный и одинаковый на сервере и клиенте',
          en: '`const id = useId()` — unique and identical on the server and the client',
        },
      },
      { text: { ru: 'Захардкодить `id="email"`', en: 'Hardcode `id="email"`' } },
      { text: { ru: '`useId()` в качестве `key` для элементов списка', en: 'Use `useId()` as the `key` for list items' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useId` даёт стабильный уникальный идентификатор для каждого экземпляра компонента и совпадает при серверном рендере и [[hydration|гидратации]]. `Math.random()` меняется между рендерами и даёт расхождение гидратации, глобальный счётчик ломается от порядка рендера, а жёсткий `id` повторяется на странице — и `label` укажет не на то поле. Для `key` в списках `useId` не подходит: ключи берут из данных.',
          en: '`useId` gives a stable unique id per component instance that matches between server rendering and [[hydration|hydration]]. `Math.random()` changes between renders and causes hydration mismatches, a global counter breaks with render order, and a hardcoded `id` repeats on the page — so the `label` points at the wrong field. `useId` isn’t for list `key`s: keys come from the data.',
        },
      },
    ],
    sources: [{ title: 'React — useId', url: `${REFERENCE}/react/useId` }],
  },
  {
    id: 'react-rendering-006',
    topic: 'react',
    tags: ['rendering', 'state'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Переключение вкладки запускает тяжёлый рендер, и интерфейс подвисает. Что даст `const [isPending, startTransition] = useTransition()` и `startTransition(() => setTab(next))`?',
      en: 'Switching a tab triggers a heavy render and the UI freezes. What do `const [isPending, startTransition] = useTransition()` and `startTransition(() => setTab(next))` give you?',
    },
    options: [
      { text: { ru: 'Рендер станет быстрее в несколько раз', en: 'Rendering becomes several times faster' } },
      {
        text: {
          ru: 'Обновление станет несрочным: React может прервать его ради ввода и кликов, а `isPending` позволит показать индикатор',
          en: 'The update becomes non-urgent: React can interrupt it for typing and clicks, and `isPending` lets you show an indicator',
        },
      },
      { text: { ru: 'Рендер перенесётся в Web Worker', en: 'Rendering moves to a Web Worker' } },
      { text: { ru: 'Состояние обновится синхронно', en: 'State updates synchronously' } },
      { text: { ru: 'Так управляют значением текстового поля', en: 'It’s how you control a text input’s value' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useTransition` помечает обновление состояния как переход: React готовит новый экран в фоне, и срочные события — ввод, клики — его прерывают, поэтому интерфейс отзывчив. Пока переход идёт, `isPending` равно `true`, и старая вкладка остаётся на экране вместо пустоты. Работу это не ускоряет. Значение поля ввода через переход не меняют — оно должно обновляться сразу; для «тяжёлой реакции на ввод» есть `useDeferredValue`.',
          en: '`useTransition` marks a state update as a transition: React prepares the new screen in the background, and urgent events — typing, clicks — interrupt it, so the UI stays responsive. While it runs, `isPending` is `true`, and the old tab stays on screen instead of a blank. It doesn’t make the work faster. A text input’s value isn’t updated via a transition — it must update immediately; for “heavy reactions to typing” there’s `useDeferredValue`.',
        },
      },
    ],
    sources: [{ title: 'React — useTransition', url: `${REFERENCE}/react/useTransition` }],
  },
  {
    id: 'react-state-008',
    topic: 'react',
    tags: ['state', 'memoization'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чем `useState(createTodos())` отличается от `useState(createTodos)`, если `createTodos` строит большой массив?',
      en: 'How does `useState(createTodos())` differ from `useState(createTodos)` if `createTodos` builds a large array?',
    },
    options: [
      { text: { ru: 'Ничем', en: 'No difference' } },
      {
        text: {
          ru: 'В первом случае `createTodos` вызывается на каждом рендере, хотя результат нужен один раз; во втором — только при первом',
          en: 'In the first, `createTodos` runs on every render though the result is needed once; in the second, only on the first render',
        },
      },
      { text: { ru: 'Второй вариант сохранит в состоянии саму функцию', en: 'The second stores the function itself in state' } },
      { text: { ru: 'Первый вариант вызовет функцию один раз и закеширует', en: 'The first calls the function once and caches it' } },
      { text: { ru: 'Второй вариант запрещён правилами хуков', en: 'The second is forbidden by the rules of hooks' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Аргумент `useState` нужен только при первом рендере, но выражение `createTodos()` всё равно вычисляется каждый раз, когда выполняется функция компонента, — результат просто выбрасывается. Если передать саму функцию, React вызовет её как инициализатор один раз. Чтобы сохранить в состоянии функцию, её оборачивают: `useState(() => fn)`. То же правило есть у `useReducer` — третий аргумент `init`.',
          en: 'The `useState` argument is only needed on the first render, but the expression `createTodos()` is still evaluated every time the component function runs — the result is just thrown away. Pass the function itself, and React calls it once as an initializer. To store a function in state, wrap it: `useState(() => fn)`. `useReducer` has the same idea — its third `init` argument.',
        },
      },
    ],
    sources: [{ title: 'React — Avoiding recreating the initial state', url: `${REFERENCE}/react/useState#avoiding-recreating-the-initial-state` }],
  },
  {
    id: 'react-rendering-007',
    topic: 'react',
    tags: ['rendering'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что отрисует `{messages.length && <Badge count={messages.length} />}`, если сообщений нет?',
      en: 'What does `{messages.length && <Badge count={messages.length} />}` render when there are no messages?',
    },
    options: [
      { text: { ru: 'Ничего', en: 'Nothing' } },
      { text: { ru: '`<Badge count={0} />`', en: '`<Badge count={0} />`' } },
      { text: { ru: 'Символ `0` на странице', en: 'The character `0` on the page' } },
      { text: { ru: 'Строку `false`', en: 'The string `false`' } },
      { text: { ru: 'Ошибку рендера', en: 'A render error' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`0 && X` возвращает `0`, а React не рисует `false`, `null` и `undefined`, но число `0` рисует. Поэтому слева от `&&` ставят логическое значение: `messages.length > 0 && …` или `Boolean(count) && …`, либо пишут тернарный оператор. Та же ловушка с `NaN`.',
          en: '`0 && X` returns `0`, and while React doesn’t render `false`, `null` or `undefined`, it does render the number `0`. So put a boolean on the left of `&&`: `messages.length > 0 && …` or `Boolean(count) && …`, or use a ternary. `NaN` has the same trap.',
        },
      },
    ],
    sources: [{ title: 'React — Conditional Rendering: logical AND', url: `${LEARN}/conditional-rendering#logical-and-operator-` }],
  },
  {
    id: 'react-suspense-003',
    topic: 'react',
    tags: ['suspense', 'rendering'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Как сделать Error Boundary в React 19?',
      en: 'How do you make an Error Boundary in React 19?',
    },
    options: [
      { text: { ru: 'Хуком `useErrorBoundary()` из React', en: 'With the `useErrorBoundary()` hook from React' } },
      { text: { ru: '`try/catch` вокруг JSX в функциональном компоненте', en: '`try/catch` around JSX in a function component' } },
      {
        text: {
          ru: 'Классовым компонентом с `static getDerivedStateFromError` (и `componentDidCatch` для логов) — или готовой библиотекой вроде react-error-boundary',
          en: 'A class component with `static getDerivedStateFromError` (plus `componentDidCatch` for logging) — or a ready library like react-error-boundary',
        },
      },
      { text: { ru: 'Обернуть дерево в `<Suspense>`', en: 'Wrap the tree in `<Suspense>`' } },
      { text: { ru: 'Через `window.onerror`', en: 'Via `window.onerror`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Хука для перехвата ошибок рендера нет — Error Boundary пишется классом: `getDerivedStateFromError` переключает состояние на запасной интерфейс, `componentDidCatch` отправляет ошибку в мониторинг. Обычно класс пишут один раз или берут react-error-boundary с удобным API. `try/catch` вокруг JSX не поймает ошибку дочернего компонента: тот рендерится позже, внутри React. `<Suspense>` отвечает за ожидание, а не за ошибки.',
          en: 'There’s no hook for catching render errors — an Error Boundary is a class: `getDerivedStateFromError` switches state to a fallback UI, and `componentDidCatch` reports the error to monitoring. Usually the class is written once, or react-error-boundary provides a friendlier API. `try/catch` around JSX won’t catch a child’s error: the child renders later, inside React. `<Suspense>` handles waiting, not errors.',
        },
      },
    ],
    sources: [{ title: 'React — Catching rendering errors with an Error Boundary', url: `${REFERENCE}/react/Component#catching-rendering-errors-with-an-error-boundary` }],
  },
  {
    id: 'react-context-003',
    topic: 'react',
    tags: ['context'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Контекст создан как `createContext("light")`. Что вернёт `useContext(ThemeContext)` в компоненте, над которым нет провайдера?',
      en: 'A context is created as `createContext("light")`. What does `useContext(ThemeContext)` return in a component with no provider above it?',
    },
    options: [
      { text: { ru: '`undefined`', en: '`undefined`' } },
      { text: { ru: 'Ошибку: провайдер обязателен', en: 'An error: a provider is required' } },
      { text: { ru: '`"light"` — значение по умолчанию', en: '`"light"` — the default value' } },
      { text: { ru: '`null`', en: '`null`' } },
      { text: { ru: 'Значение из ближайшего провайдера на странице', en: 'The value from the nearest provider on the page' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Аргумент `createContext` — значение на случай, когда выше по дереву провайдера нет. Его удобно делать осмысленным (тема по умолчанию) или, наоборот, `null`, чтобы свой хук `useTheme` бросал понятную ошибку «забыли провайдер». Провайдер ищется только среди **предков** — соседние ветки дерева не влияют.',
          en: 'The `createContext` argument is the value used when there’s no provider above in the tree. Make it meaningful (a default theme) or, conversely, `null` so your own `useTheme` hook can throw a clear “missing provider” error. Providers are looked up among **ancestors** only — sibling branches of the tree don’t count.',
        },
      },
    ],
    sources: [{ title: 'React — createContext', url: `${REFERENCE}/react/createContext` }],
  },
  {
    id: 'react-keys-004',
    topic: 'react',
    tags: ['keys'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Каждый элемент списка рендерит пару `<dt>` + `<dd>` без обёртки. Куда поставить `key`?',
      en: 'Each list item renders a `<dt>` + `<dd>` pair without a wrapper. Where does the `key` go?',
    },
    options: [
      { text: { ru: 'На `<>` — короткую запись фрагмента', en: 'On `<>` — the short fragment syntax' } },
      {
        text: {
          ru: 'На `<Fragment key={item.id}>` — у короткой записи `<>` нельзя указать `key`',
          en: 'On `<Fragment key={item.id}>` — the short `<>` syntax can’t take a `key`',
        },
      },
      { text: { ru: 'На `<dt>` и `<dd>` одинаковый', en: 'The same one on both `<dt>` and `<dd>`' } },
      { text: { ru: 'Ключ не нужен: элементов два', en: 'No key needed: there are two elements' } },
      { text: { ru: 'Обернуть пару в `<div>` с ключом', en: 'Wrap the pair in a `<div>` with the key' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ключ ставится на верхний элемент, который возвращает `map`. Если это фрагмент, нужна полная запись `<Fragment key={…}>` — у `<>` атрибутов нет. Обёртка `<div>` внутри `<dl>` нарушила бы разметку списка определений, а одинаковые ключи у `<dt>` и `<dd>` дали бы предупреждение о дублях.',
          en: 'The key goes on the top-level element returned by `map`. If that’s a fragment, use the full `<Fragment key={…}>` — `<>` takes no attributes. A `<div>` wrapper inside a `<dl>` would break the description-list markup, and identical keys on `<dt>` and `<dd>` would trigger a duplicate-key warning.',
        },
      },
    ],
    sources: [{ title: 'React — Fragment: rendering a list of Fragments', url: `${REFERENCE}/react/Fragment#rendering-a-list-of-fragments` }],
  },
  {
    id: 'react-19-context-provider-001',
    topic: 'react',
    tags: ['react-19', 'context'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Как в React 19 записать провайдер контекста?',
      en: 'How do you write a context provider in React 19?',
    },
    options: [
      { text: { ru: 'Только `<ThemeContext.Provider value="dark">`', en: 'Only `<ThemeContext.Provider value="dark">`' } },
      {
        text: {
          ru: '`<ThemeContext value="dark">` — сам контекст можно рендерить как провайдер',
          en: '`<ThemeContext value="dark">` — the context itself can be rendered as a provider',
        },
      },
      { text: { ru: '`<Provider context={ThemeContext} value="dark">`', en: '`<Provider context={ThemeContext} value="dark">`' } },
      { text: { ru: '`useProvider(ThemeContext, "dark")`', en: '`useProvider(ThemeContext, "dark")`' } },
      { text: { ru: 'Провайдеры убраны, контекст глобальный', en: 'Providers were removed; context is global' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В React 19 объект контекста сам работает как провайдер: `<ThemeContext value="dark">…</ThemeContext>`. Запись `.Provider` пока поддерживается, но объявлена устаревающей, а новый код пишут короче. Поведение не изменилось: потребители перерисовываются, когда меняется `value`, поэтому объект в `value` по-прежнему стоит [[memoization|мемоизировать]].',
          en: 'In React 19 the context object itself works as a provider: `<ThemeContext value="dark">…</ThemeContext>`. `.Provider` is still supported but slated for deprecation, and new code uses the shorter form. Behavior is unchanged: consumers re-render when `value` changes, so an object `value` should still be [[memoization|memoized]].',
        },
      },
    ],
    sources: [{ title: 'React 19 — <Context> as a provider', url: 'https://react.dev/blog/2024/12/05/react-19#context-as-a-provider' }],
  },
  {
    id: 'react-19-use-context-001',
    topic: 'react',
    tags: ['react-19', 'context', 'hooks-rules'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Компонент читает тему только если `showHeader` истинно: `if (showHeader) { const theme = use(ThemeContext); … }`. Что скажет React?',
      en: 'A component reads the theme only when `showHeader` is true: `if (showHeader) { const theme = use(ThemeContext); … }`. What does React say?',
    },
    options: [
      { text: { ru: 'Ошибку правил хуков: вызов внутри условия', en: 'A rules-of-hooks error: a call inside a condition' } },
      {
        text: {
          ru: 'Ничего: в отличие от хуков, `use` можно вызывать в условиях и циклах',
          en: 'Nothing: unlike hooks, `use` can be called in conditions and loops',
        },
      },
      { text: { ru: '`use` работает только с промисами', en: '`use` only works with promises' } },
      { text: { ru: '`use` можно вызывать только в серверных компонентах', en: '`use` can only be called in Server Components' } },
      { text: { ru: 'Ошибку гидратации', en: 'A hydration error' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`use` — не хук в классическом смысле: он читает ресурс (промис или контекст) и может стоять в условиях и циклах, чего `useContext` не позволяет. Ограничение одно — вызывать его во время рендера компонента или хука, не в обработчиках событий и не в `try/catch`. Так компонент может вовсе не подписываться на контекст в ветке, где он не нужен.',
          en: '`use` isn’t a hook in the classic sense: it reads a resource (a promise or a context) and can appear in conditions and loops, which `useContext` doesn’t allow. The one restriction: call it during rendering of a component or hook, not in event handlers or inside `try/catch`. That lets a component skip reading the context entirely in a branch that doesn’t need it.',
        },
      },
    ],
    sources: [{ title: 'React — use: reading context with use', url: `${REFERENCE}/react/use#reading-context-with-use` }],
  },
];
