import type { Question } from '../model/types';

const LEARN = 'https://react.dev/learn';
const REFERENCE = 'https://react.dev/reference/react';

export const REACT_QUESTIONS_4: Question[] = [
  {
    id: 'react-forms-001',
    topic: 'react',
    tags: ['forms', 'state'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Чем контролируемый input отличается от неконтролируемого?',
      en: 'How does a controlled input differ from an uncontrolled one?',
    },
    options: [
      {
        text: {
          ru: 'Контролируемый получает `value` из состояния и меняется через `onChange`; неконтролируемый хранит значение в DOM, а читают его через ref или `FormData`',
          en: 'A controlled input gets `value` from state and changes via `onChange`; an uncontrolled one keeps its value in the DOM, read via a ref or `FormData`',
        },
      },
      {
        text: {
          ru: 'Контролируемый нельзя редактировать',
          en: 'A controlled input can’t be edited',
        },
      },
      {
        text: {
          ru: 'Неконтролируемые инпуты запрещены в React',
          en: 'Uncontrolled inputs are forbidden in React',
        },
      },
      {
        text: {
          ru: 'Контролируемый — это инпут внутри `<form>`',
          en: 'A controlled input is one inside a `<form>`',
        },
      },
      {
        text: {
          ru: 'Разница только в атрибуте `name`',
          en: 'The only difference is the `name` attribute',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У контролируемого поля источник истины — состояние React: `<input value={text} onChange={(e) => setText(e.target.value)} />`. Это даёт мгновенную валидацию и форматирование. Неконтролируемое (`defaultValue`) проще: значение живёт в DOM, его забирают при отправке.',
          en: 'A controlled field’s source of truth is React state: `<input value={text} onChange={(e) => setText(e.target.value)} />`. That enables instant validation and formatting. An uncontrolled one (`defaultValue`) is simpler: the value lives in the DOM and is read on submit.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Если указать `value` без `onChange`, поле станет только для чтения, а React выведет предупреждение.',
          en: 'If you pass `value` without `onChange`, the field becomes read-only and React logs a warning.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Controlling an input with a state variable',
        url: 'https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable',
      },
    ],
  },
  {
    id: 'react-19-001',
    topic: 'react',
    tags: ['react-19', 'forms'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что возвращает хук `useActionState` из React 19?',
      en: 'What does the React 19 `useActionState` hook return?',
    },
    code: {
      lang: 'jsx',
      source: `const result = useActionState(saveProfile, { error: null });`,
    },
    options: [
      { code: '[state, setState]' },
      { code: '[state, formAction, isPending]' },
      { code: '{ data, error, isLoading }' },
      { code: 'Promise<state>' },
      { code: '[formAction, reset]' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useActionState(action, initialState)` возвращает текущее состояние, обёрнутое действие для `<form action={…}>` или кнопки и флаг `isPending`. Действие получает предыдущее состояние и данные формы, а его результат становится новым состоянием.',
          en: '`useActionState(action, initialState)` returns the current state, a wrapped action for `<form action={…}>` or a button, and an `isPending` flag. The action receives the previous state and the form data, and its result becomes the new state.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `const [state, formAction, isPending] = useActionState(
  async (previous, formData) => {
    const error = await updateName(formData.get('name'));
    return { error };
  },
  { error: null },
);

<form action={formAction}>…</form>`,
        },
      },
    ],
    sources: [{ title: 'react.dev — useActionState', url: `${REFERENCE}/useActionState` }],
  },
  {
    id: 'react-19-002',
    topic: 'react',
    tags: ['react-19', 'state'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Для чего нужен хук `useOptimistic`?',
      en: 'What is the `useOptimistic` hook for?',
    },
    options: [
      {
        text: {
          ru: 'Чтобы кэшировать ответы сервера между рендерами',
          en: 'To cache server responses between renders',
        },
      },
      {
        text: {
          ru: 'Чтобы откладывать рендер до загрузки данных',
          en: 'To delay rendering until data loads',
        },
      },
      {
        text: {
          ru: 'Чтобы показать ожидаемый результат сразу, пока асинхронное действие выполняется, а после завершения вернуться к реальному состоянию',
          en: 'To show the expected result immediately while an async action runs, then fall back to the real state when it finishes',
        },
      },
      {
        text: {
          ru: 'Чтобы автоматически повторять упавшие запросы',
          en: 'To retry failed requests automatically',
        },
      },
      {
        text: {
          ru: 'Чтобы оптимизировать производительность рендера',
          en: 'To optimize render performance',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useOptimistic(state, updateFn)` возвращает «оптимистичное» состояние и функцию для его изменения. Пока действие выполняется, интерфейс показывает, например, отправленное сообщение. Когда действие завершится, оптимистичное значение заменится настоящим состоянием — успешным результатом или прежним значением при ошибке.',
          en: '`useOptimistic(state, updateFn)` returns an “optimistic” state and a function to update it. While the action runs, the UI shows, say, the sent message. When the action finishes, the optimistic value is replaced by the real state — the successful result, or the previous value on error.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `const [optimisticMessages, addOptimistic] = useOptimistic(
  messages,
  (current, newMessage) => [...current, { text: newMessage, sending: true }],
);`,
        },
      },
    ],
    sources: [{ title: 'react.dev — useOptimistic', url: `${REFERENCE}/useOptimistic` }],
  },
  {
    id: 'react-19-003',
    topic: 'react',
    tags: ['react-19', 'suspense'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что делает `use(promise)` в клиентском компоненте?',
      en: 'What does `use(promise)` do in a client component?',
    },
    code: {
      lang: 'jsx',
      source: `function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map((comment) => <p key={comment.id}>{comment.text}</p>);
}`,
    },
    options: [
      {
        text: {
          ru: 'Подписывается на промис через `useEffect` и рендерит `undefined`, пока данных нет',
          en: 'Subscribes to the promise via `useEffect` and renders `undefined` until data arrives',
        },
      },
      {
        text: {
          ru: 'Блокирует главный поток, пока промис не выполнится',
          en: 'Blocks the main thread until the promise settles',
        },
      },
      {
        text: {
          ru: 'Возвращает тот же промис, который нужно дождаться через `await`',
          en: 'Returns the same promise, which you must `await`',
        },
      },
      {
        text: {
          ru: 'Приостанавливает рендер, пока промис не выполнится: ближайший `Suspense` покажет fallback, затем `use` вернёт результат',
          en: 'Suspends rendering until the promise resolves: the nearest `Suspense` shows its fallback, then `use` returns the result',
        },
      },
      {
        text: {
          ru: 'Работает только в серверных компонентах',
          en: 'Only works in server components',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`use` читает значение промиса или контекста. Пока промис в ожидании, компонент «приостанавливается» и показывается fallback ближайшего `<Suspense>`. Если промис отклонён, ошибку поймает ближайший Error Boundary.',
          en: '`use` reads the value of a promise or a context. While the promise is pending, the component suspends and the nearest `<Suspense>` shows its fallback. If the promise rejects, the nearest Error Boundary catches it.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В отличие от хуков, `use` можно вызывать в условиях и циклах. Промис не стоит создавать прямо в рендере клиентского компонента: он будет новым на каждом рендере. Его передают из серверного компонента или кэшируют.',
          en: 'Unlike hooks, `use` can be called in conditions and loops. Don’t create the promise during a client component’s render — it would be new on every render. Pass it from a server component or cache it.',
        },
      },
    ],
    sources: [{ title: 'react.dev — use', url: `${REFERENCE}/use` }],
  },
  {
    id: 'react-19-004',
    topic: 'react',
    tags: ['react-19', 'forms'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что происходит, когда в React 19 в `<form action={…}>` передана функция?',
      en: 'What happens in React 19 when a function is passed to `<form action={…}>`?',
    },
    code: {
      lang: 'jsx',
      source: `<form action={async (formData) => {
  await subscribe(formData.get('email'));
}}>
  <input name="email" />
  <button type="submit">Subscribe</button>
</form>`,
    },
    options: [
      {
        text: {
          ru: 'Браузер отправит форму на URL с текстом функции',
          en: 'The browser submits the form to a URL containing the function’s text',
        },
      },
      {
        text: {
          ru: 'React выбросит ошибку: `action` принимает только строку',
          en: 'React throws an error: `action` only accepts a string',
        },
      },
      {
        text: {
          ru: 'React вызовет функцию с `FormData`, а после успешного выполнения сбросит неконтролируемые поля формы',
          en: 'React calls the function with `FormData`, and after it succeeds resets the form’s uncontrolled fields',
        },
      },
      {
        text: {
          ru: 'Функция вызовется при каждом вводе символа',
          en: 'The function is called on every keystroke',
        },
      },
      {
        text: {
          ru: 'Нужно обязательно вызвать `event.preventDefault()`, иначе страница перезагрузится',
          en: 'You must call `event.preventDefault()`, otherwise the page reloads',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В React 19 `action` формы может быть функцией (Action). React сам перехватывает отправку, вызывает функцию с `FormData`, запускает её в переходе (transition) и после успеха сбрасывает неконтролируемые поля. `preventDefault` и ручной сбор значений не нужны.',
          en: 'In React 19 a form’s `action` can be a function (an Action). React intercepts the submit, calls the function with `FormData`, runs it in a transition, and resets uncontrolled fields on success. No `preventDefault` or manual value collection needed.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Статус отправки дочерние компоненты могут прочитать через `useFormStatus`.',
          en: 'Child components can read the submission status via `useFormStatus`.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — <form>', url: 'https://react.dev/reference/react-dom/components/form' },
      { title: 'React 19 — Actions', url: 'https://react.dev/blog/2024/12/05/react-19#actions' },
    ],
  },
  {
    id: 'react-suspense-001',
    topic: 'react',
    tags: ['suspense'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что увидит пользователь, пока загружается код `Settings`?',
      en: 'What does the user see while the `Settings` code is loading?',
    },
    code: {
      lang: 'jsx',
      source: `const Settings = lazy(() => import('./settings'));

<Suspense fallback={<Spinner />}>
  <Settings />
</Suspense>`,
    },
    options: [
      { text: { ru: 'Пустой экран', en: 'A blank screen' } },
      { text: { ru: 'Ошибку: модуль ещё не загружен', en: 'An error: the module isn’t loaded yet' } },
      { text: { ru: 'Компонент `<Spinner />`', en: 'The `<Spinner />` component' } },
      { text: { ru: 'Предыдущую страницу без изменений', en: 'The previous page, unchanged' } },
      { text: { ru: 'Текст «Loading…» от React', en: 'A “Loading…” text from React' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`lazy` загружает код компонента при первом рендере. Пока модуль грузится, компонент приостанавливается, и ближайший `<Suspense>` показывает `fallback`. Код разбивается на отдельные чанки и не попадает в основной бандл.',
          en: '`lazy` loads a component’s code on its first render. While the module loads, the component suspends and the nearest `<Suspense>` shows its `fallback`. The code is split into separate chunks and stays out of the main bundle.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Объявляйте `lazy` на верхнем уровне модуля, а не внутри компонента — иначе состояние будет сбрасываться при каждом рендере.',
          en: 'Declare `lazy` at the top level of a module, not inside a component — otherwise state resets on every render.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — lazy', url: `${REFERENCE}/lazy` },
      { title: 'react.dev — Suspense', url: `${REFERENCE}/Suspense` },
    ],
  },
  {
    id: 'react-suspense-002',
    topic: 'react',
    tags: ['suspense', 'rendering'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Какую ошибку **не** поймает Error Boundary?',
      en: 'Which error will an Error Boundary **not** catch?',
    },
    options: [
      {
        text: {
          ru: 'Ошибку при рендере дочернего компонента',
          en: 'An error thrown while rendering a child component',
        },
      },
      {
        text: {
          ru: 'Ошибку в методе жизненного цикла потомка',
          en: 'An error in a descendant’s lifecycle method',
        },
      },
      {
        text: {
          ru: 'Ошибку в обработчике клика',
          en: 'An error in a click handler',
        },
      },
      {
        text: {
          ru: 'Отклонённый промис, прочитанный через `use`',
          en: 'A rejected promise read with `use`',
        },
      },
      {
        text: {
          ru: 'Ошибку в конструкторе дочернего классового компонента',
          en: 'An error in a child class component’s constructor',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Error Boundary ловит ошибки, которые происходят во время **рендера**, в методах жизненного цикла и конструкторах дерева под ним. Обработчики событий вызываются вне рендера, поэтому их ошибки нужно ловить обычным `try/catch`. То же с асинхронным кодом (`setTimeout`), SSR и ошибками в самом Boundary.',
          en: 'An Error Boundary catches errors that happen during **rendering**, in lifecycle methods, and in constructors of the tree below it. Event handlers run outside rendering, so their errors need a regular `try/catch`. The same goes for async code (`setTimeout`), SSR, and errors in the boundary itself.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Error Boundary пока можно написать только классовым компонентом (`getDerivedStateFromError`, `componentDidCatch`); на практике часто берут библиотеку `react-error-boundary`.',
          en: 'For now an Error Boundary can only be a class component (`getDerivedStateFromError`, `componentDidCatch`); in practice people often use the `react-error-boundary` library.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Catching rendering errors with an Error Boundary',
        url: `${REFERENCE}/Component#catching-rendering-errors-with-an-error-boundary`,
      },
      { title: 'React (legacy) — Error Boundaries', url: 'https://legacy.reactjs.org/docs/error-boundaries.html' },
    ],
  },
  {
    id: 'react-rsc-001',
    topic: 'react',
    tags: ['server-components'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что можно делать в серверном компоненте (React Server Component)?',
      en: 'What can you do in a React Server Component?',
    },
    options: [
      {
        text: {
          ru: 'Использовать `useState` и `useEffect`',
          en: 'Use `useState` and `useEffect`',
        },
      },
      {
        text: {
          ru: 'Вешать обработчики `onClick`',
          en: 'Attach `onClick` handlers',
        },
      },
      {
        text: {
          ru: 'Обращаться к `window` и `localStorage`',
          en: 'Access `window` and `localStorage`',
        },
      },
      {
        text: {
          ru: 'Быть `async` и получать данные прямо в теле компонента — из базы, файловой системы или API',
          en: 'Be `async` and fetch data right in the component body — from a database, the file system or an API',
        },
      },
      {
        text: {
          ru: 'Перерисовываться при каждом клике пользователя',
          en: 'Re-render on every user click',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Серверные компоненты выполняются на сервере (или во время сборки), их код не попадает в клиентский бандл. Они могут быть асинхронными и напрямую ходить в базу или читать файлы.',
          en: 'Server Components run on the server (or at build time), and their code isn’t shipped in the client bundle. They can be async and query a database or read files directly.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Интерактивность — состояние, эффекты, обработчики событий, браузерные API — доступна только в клиентских компонентах, помеченных `"use client"`.',
          en: 'Interactivity — state, effects, event handlers, browser APIs — is only available in client components marked with `"use client"`.',
        },
      },
    ],
    sources: [{ title: 'react.dev — Server Components', url: 'https://react.dev/reference/rsc/server-components' }],
  },
  {
    id: 'react-rsc-002',
    topic: 'react',
    tags: ['server-components'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что означает директива `"use client"` в начале файла?',
      en: 'What does the `"use client"` directive at the top of a file mean?',
    },
    options: [
      {
        text: {
          ru: 'Компонент рендерится только в браузере и никогда — на сервере',
          en: 'The component renders only in the browser and never on the server',
        },
      },
      {
        text: {
          ru: 'Файл и всё, что он импортирует, становится клиентским кодом и попадает в бандл; серверные компоненты можно передавать в него как `children`',
          en: 'The file and everything it imports become client code and go into the bundle; server components can still be passed into it as `children`',
        },
      },
      {
        text: {
          ru: 'Отключает SSR для всего приложения',
          en: 'Disables SSR for the whole app',
        },
      },
      {
        text: {
          ru: 'Разрешает компоненту обращаться к базе данных',
          en: 'Allows the component to access the database',
        },
      },
      {
        text: {
          ru: 'Нужна в каждом файле с компонентом',
          en: 'It’s required in every component file',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`"use client"` отмечает **границу** между серверным и клиентским кодом. Модуль с директивой и его импорты отправляются в браузер. Клиентские компоненты при этом всё равно могут предварительно рендериться на сервере (SSR) — директива говорит о том, где код **может выполняться**, а не об отказе от SSR.',
          en: '`"use client"` marks the **boundary** between server and client code. The module with the directive and its imports are shipped to the browser. Client components can still be pre-rendered on the server (SSR) — the directive is about where code **can run**, not about opting out of SSR.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Импортировать серверный компонент в клиентский нельзя, но можно передать его как `children` или другой проп — он отрендерится на сервере.',
          en: 'You can’t import a server component into a client one, but you can pass it as `children` or another prop — it renders on the server.',
        },
      },
    ],
    sources: [{ title: 'react.dev — "use client"', url: 'https://react.dev/reference/rsc/use-client' }],
  },
  {
    id: 'react-strict-001',
    topic: 'react',
    tags: ['rendering', 'effects'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Зачем `<StrictMode>` в режиме разработки вызывает функцию компонента дважды?',
      en: 'Why does `<StrictMode>` call a component function twice in development?',
    },
    options: [
      {
        text: {
          ru: 'Чтобы найти «нечистые» компоненты: при чистом рендере два вызова дают одинаковый результат',
          en: 'To find impure components: a pure render gives the same result both times',
        },
      },
      {
        text: {
          ru: 'Чтобы ускорить первый рендер за счёт прогрева',
          en: 'To speed up the first render by warming up',
        },
      },
      {
        text: {
          ru: 'Это баг React 18, исправленный в React 19',
          en: 'It’s a React 18 bug fixed in React 19',
        },
      },
      {
        text: {
          ru: 'Так же ведёт себя продакшен-сборка',
          en: 'The production build does the same',
        },
      },
      {
        text: {
          ru: 'Чтобы проверить работу батчинга',
          en: 'To test batching',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Компоненты должны быть чистыми функциями: одинаковые пропсы и состояние — одинаковый JSX, без побочных эффектов во время рендера. Двойной вызов в разработке быстро выявляет ошибки вроде мутации внешнего массива или счётчика вне компонента.',
          en: 'Components must be pure functions: the same props and state give the same JSX, with no side effects during render. The double call in development quickly exposes bugs like mutating an outside array or a counter outside the component.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В продакшене двойного вызова нет. Аналогично StrictMode проверяет эффекты лишним циклом setup → cleanup.',
          en: 'Production doesn’t double-invoke. Similarly, StrictMode tests effects with an extra setup → cleanup cycle.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — StrictMode', url: `${REFERENCE}/StrictMode` },
      { title: 'react.dev — Keeping Components Pure', url: `${LEARN}/keeping-components-pure` },
    ],
  },
  {
    id: 'react-portal-001',
    topic: 'react',
    tags: ['rendering'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Модалка отрисована через `createPortal` в `document.body`. Дойдёт ли клик внутри неё до `onClick` на `<div>`-родителе в JSX?',
      en: 'A modal is rendered with `createPortal` into `document.body`. Will a click inside it reach `onClick` on its JSX parent `<div>`?',
    },
    code: {
      lang: 'jsx',
      source: `<div onClick={() => console.log('parent')}>
  {createPortal(<Modal />, document.body)}
</div>`,
    },
    options: [
      {
        text: {
          ru: 'Нет: в DOM модалка не внутри `<div>`, поэтому событие до него не всплывёт',
          en: 'No: in the DOM the modal isn’t inside the `<div>`, so the event won’t bubble to it',
        },
      },
      {
        text: {
          ru: 'Да: события из портала всплывают по дереву React, а не по дереву DOM',
          en: 'Yes: events from a portal bubble through the React tree, not the DOM tree',
        },
      },
      {
        text: {
          ru: 'Только если вызвать `event.persist()`',
          en: 'Only if you call `event.persist()`',
        },
      },
      {
        text: {
          ru: 'React выбросит ошибку: порталы нельзя вкладывать в элементы с обработчиками',
          en: 'React throws an error: portals can’t be nested in elements with handlers',
        },
      },
      {
        text: {
          ru: 'Только в браузерах на Chromium',
          en: 'Only in Chromium-based browsers',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Портал меняет только место в DOM. Для React модалка остаётся ребёнком `<div>`: контекст доступен, а синтетические события всплывают по дереву React. Поэтому `parent` выведется.',
          en: 'A portal only changes the DOM location. For React the modal is still a child of the `<div>`: context is available, and synthetic events bubble through the React tree. So `parent` is logged.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Если такое всплытие мешает, вызовите `event.stopPropagation()` внутри портала.',
          en: 'If this bubbling gets in the way, call `event.stopPropagation()` inside the portal.',
        },
      },
    ],
    sources: [{ title: 'react.dev — createPortal', url: 'https://react.dev/reference/react-dom/createPortal' }],
  },
];
