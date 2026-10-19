import type { Question } from '../model/types';

const LEARN = 'https://react.dev/learn';
const REFERENCE = 'https://react.dev/reference';

export const REACT_QUESTIONS_8: Question[] = [
  {
    id: 'react-keys-005',
    topic: 'react',
    tags: ['keys'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Когда в качестве `key` допустимо использовать индекс элемента?',
      en: 'When is it acceptable to use the item index as the `key`?',
    },
    options: [
      { text: { ru: 'Всегда: индекс уникален', en: 'Always: the index is unique' } },
      { text: { ru: 'Никогда: React выдаст ошибку', en: 'Never: React throws an error' } },
      {
        text: {
          ru: 'Когда список статичен: элементы не переставляются, не фильтруются и не добавляются в начало или середину',
          en: 'When the list is static: items aren’t reordered, filtered or inserted at the start or middle',
        },
      },
      { text: { ru: 'Только для списков длиннее 100 элементов', en: 'Only for lists longer than 100 items' } },
      { text: { ru: 'Когда у элементов нет состояния — тогда ключ вообще не нужен', en: 'When items have no state — then no key is needed at all' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Индекс описывает **позицию**, а не элемент. Пока порядок не меняется, позиция и элемент совпадают, и индекс работает. Стоит вставить элемент в начало, отфильтровать или отсортировать список — состояние и DOM поедут за позициями. Ключ нужен всегда; лучший ключ — стабильный id из данных.',
          en: 'An index describes a **position**, not an item. While the order doesn’t change, position and item coincide, and the index works. Insert at the start, filter or sort the list — and state and DOM follow the positions. A key is always needed; the best key is a stable id from the data.',
        },
      },
    ],
    sources: [{ title: 'React — Rendering lists: keys', url: `${LEARN}/rendering-lists#keeping-list-items-in-order-with-key` }],
  },
  {
    id: 'react-hooks-003',
    topic: 'react',
    tags: ['hooks-rules'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что не так в этом компоненте?',
      en: 'What’s wrong with this component?',
    },
    code: {
      lang: 'jsx',
      source: `function Profile({ user }) {
  if (!user) {
    return null;
  }
  const [tab, setTab] = useState('info');
  return <Tabs value={tab} onChange={setTab} />;
}`,
    },
    options: [
      { text: { ru: 'Ничего: `useState` стоит на верхнем уровне функции', en: 'Nothing: `useState` is at the function’s top level' } },
      {
        text: {
          ru: 'Хук вызывается после раннего `return`: на разных рендерах число хуков разное, и React собьётся в их порядке',
          en: 'The hook is called after an early `return`: the number of hooks differs between renders, and React loses track of their order',
        },
      },
      { text: { ru: 'Нельзя возвращать `null` из компонента', en: 'You can’t return `null` from a component' } },
      { text: { ru: '`useState` нельзя использовать со строкой', en: '`useState` can’t be used with a string' } },
      { text: { ru: 'Пропс `user` нужно обернуть в `useMemo`', en: 'The `user` prop must be wrapped in `useMemo`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'React различает хуки по **порядку вызова**. Если на одном рендере `user` нет, `useState` не вызывается, а на следующем — вызывается: порядок меняется, и React сообщит об ошибке «Rendered more hooks than during the previous render». Хуки вызывают до любых условных `return`, а условие переносят ниже.',
          en: 'React tells hooks apart by **call order**. If `user` is missing on one render, `useState` isn’t called, and on the next it is: the order changes, and React reports “Rendered more hooks than during the previous render”. Call hooks before any conditional `return` and move the condition below them.',
        },
      },
    ],
    sources: [{ title: 'React — Rules of Hooks', url: `${REFERENCE}/rules/rules-of-hooks` }],
  },
  {
    id: 'react-hooks-004',
    topic: 'react',
    tags: ['hooks-rules'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Где разрешено вызывать хуки вроде `useState` и `useEffect`?',
      en: 'Where may hooks like `useState` and `useEffect` be called?',
    },
    options: [
      { text: { ru: 'В любой функции проекта', en: 'In any function in the project' } },
      { text: { ru: 'В обработчиках событий и колбэках эффектов', en: 'In event handlers and effect callbacks' } },
      {
        text: {
          ru: 'Только на верхнем уровне функциональных компонентов и кастомных хуков',
          en: 'Only at the top level of function components and custom hooks',
        },
      },
      { text: { ru: 'В классовых компонентах и функциях-утилитах', en: 'In class components and utility functions' } },
      { text: { ru: 'Только в корневом компоненте приложения', en: 'Only in the app’s root component' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Хуки привязаны к рендеру конкретного компонента, поэтому вызывать их можно только во время рендера функционального компонента — напрямую или через кастомный хук. Внутри обработчиков, эффектов, `useMemo` и обычных функций хук не знает, к какому компоненту относится. Классовые компоненты хуки не поддерживают.',
          en: 'Hooks are tied to a specific component’s render, so they can be called only while a function component renders — directly or via a custom hook. Inside handlers, effects, `useMemo` and plain functions a hook doesn’t know which component it belongs to. Class components don’t support hooks.',
        },
      },
    ],
    sources: [{ title: 'React — Rules of Hooks', url: `${REFERENCE}/rules/rules-of-hooks` }],
  },
  {
    id: 'react-hooks-005',
    topic: 'react',
    tags: ['hooks-rules'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Вы выносите логику корзины с `useState` и `useEffect` в отдельную функцию. Как её назвать?',
      en: 'You extract cart logic with `useState` and `useEffect` into a separate function. How should you name it?',
    },
    options: [
      { text: { ru: '`getCart` — как обычную функцию', en: '`getCart` — like a regular function' } },
      {
        text: {
          ru: '`useCart` — с префиксом `use`: по нему линтер и React Compiler узнают хук и проверяют правила хуков',
          en: '`useCart` — with the `use` prefix: the linter and React Compiler recognize a hook by it and check the rules of hooks',
        },
      },
      { text: { ru: '`CartHook` — с большой буквы, как компонент', en: '`CartHook` — capitalized, like a component' } },
      { text: { ru: 'Имя не важно', en: 'The name doesn’t matter' } },
      { text: { ru: '`withCart` — как HOC', en: '`withCart` — like a HOC' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Кастомный хук — обычная функция, которая вызывает другие хуки, и префикс `use` — это соглашение, на которое опираются инструменты. Линтер `eslint-plugin-react-hooks` по нему проверяет, что хук не вызывается в условиях, а React Compiler — что функцию можно мемоизировать. Функцию без хуков внутри называть `use…` не нужно.',
          en: 'A custom hook is a plain function that calls other hooks, and the `use` prefix is a convention tools rely on. The `eslint-plugin-react-hooks` linter uses it to check the hook isn’t called conditionally, and React Compiler to know the function can be memoized. A function with no hooks inside shouldn’t be named `use…`.',
        },
      },
    ],
    sources: [{ title: 'React — Reusing logic with custom hooks', url: `${LEARN}/reusing-logic-with-custom-hooks` }],
  },
  {
    id: 'react-context-004',
    topic: 'react',
    tags: ['context'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Когда стоит передать данные через контекст, а не пропсами?',
      en: 'When should data go through context rather than props?',
    },
    options: [
      { text: { ru: 'Всегда: контекст быстрее пропсов', en: 'Always: context is faster than props' } },
      {
        text: {
          ru: 'Когда значение нужно многим компонентам на разной глубине — тема, текущий пользователь, локаль; паре соседей хватит пропсов или композиции через `children`',
          en: 'When many components at different depths need the value — theme, current user, locale; a couple of neighbors are fine with props or composition via `children`',
        },
      },
      { text: { ru: 'Только для данных с сервера', en: 'Only for server data' } },
      { text: { ru: 'Когда пропсов больше трёх', en: 'When there are more than three props' } },
      { text: { ru: 'Никогда: контекст устарел', en: 'Never: context is deprecated' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Контекст избавляет от проброса значения через десяток промежуточных компонентов, но делает зависимость неявной: по пропсам уже не видно, откуда пришли данные, а компонент сложнее переиспользовать. Если проброс неглубокий, лучше пропсы; если мешают промежуточные компоненты — композиция: передать готовый элемент через `children`.',
          en: 'Context saves you from passing a value through a dozen intermediate components, but it makes the dependency implicit: props no longer show where data comes from, and the component is harder to reuse. For shallow passing, props are better; if intermediate components are in the way — composition: pass a ready element through `children`.',
        },
      },
    ],
    sources: [{ title: 'React — Passing data deeply with context', url: `${LEARN}/passing-data-deeply-with-context` }],
  },
  {
    id: 'react-context-005',
    topic: 'react',
    tags: ['context'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Один контекст хранит и позицию курсора (меняется постоянно), и настройки интерфейса (меняются редко). Компоненты настроек перерисовываются при каждом движении мыши. Что поможет?',
      en: 'One context holds both the cursor position (changes constantly) and UI settings (rarely change). Settings components re-render on every mouse move. What helps?',
    },
    options: [
      { text: { ru: 'Обернуть компоненты настроек в `memo`', en: 'Wrap the settings components in `memo`' } },
      { text: { ru: 'Разделить на два контекста: потребители настроек не будут зависеть от курсора', en: 'Split it into two contexts: settings consumers won’t depend on the cursor' } },
      { text: { ru: 'Передавать `value` как строку JSON', en: 'Pass `value` as a JSON string' } },
      { text: { ru: 'Вызывать `useContext` в `useEffect`', en: 'Call `useContext` inside `useEffect`' } },
      { text: { ru: 'Убрать провайдер', en: 'Remove the provider' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При новом значении контекста React перерисовывает **всех** его потребителей, и `memo` это не останавливает: подписка на контекст — внутри компонента. Значения с разной частотой изменений разносят по разным контекстам, тогда изменение одного не трогает потребителей другого. Для частых обновлений многим подписчикам подходят и сторы с подпиской по селектору.',
          en: 'On a new context value React re-renders **all** its consumers, and `memo` doesn’t stop it: the context subscription is inside the component. Values that change at different rates go into different contexts, so changing one doesn’t touch the other’s consumers. Stores with selector subscriptions also suit frequent updates to many subscribers.',
        },
      },
    ],
    sources: [{ title: 'React — useContext: optimizing re-renders', url: `${REFERENCE}/react/useContext#optimizing-re-renders-when-passing-objects-and-functions` }],
  },
  {
    id: 'react-refs-004',
    topic: 'react',
    tags: ['refs'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Нужно сохранить id таймера из `setInterval`, чтобы остановить его по кнопке. Где его хранить?',
      en: 'You need to keep a `setInterval` timer id to stop it with a button. Where should it live?',
    },
    options: [
      { text: { ru: 'В обычной переменной внутри компонента', en: 'In a plain variable inside the component' } },
      { text: { ru: 'В `useState`', en: 'In `useState`' } },
      { text: { ru: 'В `useRef`: значение переживёт рендеры, а его изменение не вызовет лишний рендер', en: 'In `useRef`: the value survives renders, and changing it doesn’t trigger an extra render' } },
      { text: { ru: 'В контексте', en: 'In context' } },
      { text: { ru: 'В `useMemo`', en: 'In `useMemo`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обычная переменная пересоздаётся на каждом рендере, и id потеряется. `useState` сохранит его, но каждое изменение вызовет лишний рендер, хотя на экране id не показывается. `useRef` — «карман» компонента: объект `{ current }` один на всё время жизни, менять его можно напрямую, рендера не будет.',
          en: 'A plain variable is recreated on every render, so the id gets lost. `useState` would keep it, but each change triggers an extra render even though the id isn’t shown on screen. `useRef` is the component’s “pocket”: one `{ current }` object for its whole lifetime, mutable directly with no render.',
        },
      },
    ],
    sources: [{ title: 'React — Referencing values with refs', url: `${LEARN}/referencing-values-with-refs` }],
  },
  {
    id: 'react-suspense-004',
    topic: 'react',
    tags: ['suspense'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Профиль грузится быстро, а лента — медленно. Обе части обёрнуты в один `<Suspense>`. Как показать профиль, не дожидаясь ленты?',
      en: 'The profile loads quickly and the feed slowly. Both are wrapped in one `<Suspense>`. How do you show the profile without waiting for the feed?',
    },
    options: [
      { text: { ru: 'Убрать `Suspense` совсем', en: 'Remove `Suspense` entirely' } },
      { text: { ru: 'Обернуть каждую часть в свой `<Suspense>` со своим fallback', en: 'Wrap each part in its own `<Suspense>` with its own fallback' } },
      { text: { ru: 'Поставить `key` на `Suspense`', en: 'Put a `key` on `Suspense`' } },
      { text: { ru: 'Грузить ленту в `useLayoutEffect`', en: 'Load the feed in `useLayoutEffect`' } },
      { text: { ru: 'Увеличить таймаут fallback', en: 'Increase the fallback timeout' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`<Suspense>` показывает fallback, пока приостановлен **любой** компонент внутри него, поэтому общий `Suspense` ждёт самую медленную часть. Отдельные границы позволяют каждой части появиться, как только готовы её данные. Границы расставляют по смыслу интерфейса: что пользователь готов увидеть по частям, а что — только целиком.',
          en: '`<Suspense>` shows its fallback while **any** component inside is suspended, so a shared `Suspense` waits for the slowest part. Separate boundaries let each part appear as soon as its data is ready. Place boundaries by UI meaning: what the user is fine seeing piece by piece and what only as a whole.',
        },
      },
    ],
    sources: [{ title: 'React — Suspense', url: `${REFERENCE}/react/Suspense` }],
  },
  {
    id: 'react-forms-004',
    topic: 'react',
    tags: ['forms'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Как в обработчике `onSubmit` получить все значения неконтролируемой формы?',
      en: 'How do you get all values of an uncontrolled form in an `onSubmit` handler?',
    },
    options: [
      { text: { ru: 'Создать `useState` на каждое поле', en: 'Create a `useState` per field' } },
      {
        text: {
          ru: '`new FormData(event.currentTarget)` — значения берутся по атрибутам `name` полей',
          en: '`new FormData(event.currentTarget)` — values are read by the fields’ `name` attributes',
        },
      },
      { text: { ru: 'Через `document.querySelectorAll(\'input\')`', en: 'With `document.querySelectorAll(\'input\')`' } },
      { text: { ru: 'Из `event.target.value`', en: 'From `event.target.value`' } },
      { text: { ru: 'Никак: неконтролируемые поля нельзя прочитать', en: 'You can’t: uncontrolled fields can’t be read' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У неконтролируемых полей значение живёт в DOM. `FormData` собирает его со всей формы по атрибутам `name`; `Object.fromEntries(formData)` превращает результат в объект. Не забудьте `event.preventDefault()`, чтобы браузер не перезагрузил страницу. В React 19 функция в `<form action={…}>` получает `FormData` сама.',
          en: 'Uncontrolled fields keep their value in the DOM. `FormData` collects it from the whole form by `name` attributes; `Object.fromEntries(formData)` turns it into an object. Don’t forget `event.preventDefault()` so the browser doesn’t reload the page. In React 19 a function in `<form action={…}>` receives `FormData` by itself.',
        },
      },
    ],
    sources: [{ title: 'React — <form>', url: `${REFERENCE}/react-dom/components/form` }],
  },
  {
    id: 'react-rsc-003',
    topic: 'react',
    tags: ['server-components'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Можно ли использовать `useState` в серверном компоненте?',
      en: 'Can you use `useState` in a Server Component?',
    },
    options: [
      { text: { ru: 'Да, как в любом компоненте', en: 'Yes, like in any component' } },
      {
        text: {
          ru: 'Нет: серверный компонент рендерится один раз без состояния и эффектов — интерактивность выносят в клиентский компонент',
          en: 'No: a Server Component renders once with no state or effects — interactivity goes into a Client Component',
        },
      },
      { text: { ru: 'Да, но только с начальным значением `null`', en: 'Yes, but only with an initial value of `null`' } },
      { text: { ru: 'Только внутри `Suspense`', en: 'Only inside `Suspense`' } },
      { text: { ru: 'Да, состояние хранится на сервере', en: 'Yes, the state is stored on the server' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Серверный компонент выполняется на сервере и превращается в готовый результат — в браузере он не живёт, поэтому перерисовываться по клику ему нечем. `useState`, `useEffect` и обработчики событий доступны только клиентским компонентам. Типичная схема: серверный компонент получает данные и передаёт их в небольшой клиентский компонент с `"use client"`.',
          en: 'A Server Component runs on the server and becomes a ready result — it doesn’t live in the browser, so it has nothing to re-render on a click. `useState`, `useEffect` and event handlers exist only in Client Components. The usual pattern: a Server Component fetches data and passes it to a small `"use client"` component.',
        },
      },
    ],
    sources: [{ title: 'React — Server Components', url: `${REFERENCE}/rsc/server-components` }],
  },
  {
    id: 'react-rsc-004',
    topic: 'react',
    tags: ['server-components'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что можно передать пропсом из серверного компонента в клиентский?',
      en: 'What can be passed as a prop from a Server Component to a Client Component?',
    },
    options: [
      { text: { ru: 'Что угодно, включая обычные функции и экземпляры классов', en: 'Anything, including plain functions and class instances' } },
      {
        text: {
          ru: 'Сериализуемые значения — строки, числа, массивы, обычные объекты, промисы и JSX; из функций — только Server Actions',
          en: 'Serializable values — strings, numbers, arrays, plain objects, promises and JSX; of functions, only Server Actions',
        },
      },
      { text: { ru: 'Только строки', en: 'Only strings' } },
      { text: { ru: 'Только JSX через `children`', en: 'Only JSX via `children`' } },
      { text: { ru: 'Ничего: клиентские компоненты не принимают пропсы от серверных', en: 'Nothing: Client Components don’t accept props from Server Components' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Пропсы пересекают сеть: сервер сериализует их и отправляет в браузер вместе с результатом рендера. Поэтому годятся только сериализуемые значения. Обычную функцию отправить нельзя — исключение составляют Server Actions (`"use server"`), которые клиент вызывает как удалённые функции. Промис можно передать и прочитать на клиенте через `use`.',
          en: 'Props cross the network: the server serializes them and sends them to the browser with the render result. So only serializable values work. A plain function can’t be sent — the exception is Server Actions (`"use server"`), which the client calls as remote functions. A promise can be passed and read on the client with `use`.',
        },
      },
    ],
    sources: [{ title: 'React — "use client": serializable types', url: `${REFERENCE}/rsc/use-client#serializable-types` }],
  },
  {
    id: 'react-rsc-005',
    topic: 'react',
    tags: ['server-components'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В каком компоненте можно безопасно читать секретный API-ключ из `process.env`?',
      en: 'In which component is it safe to read a secret API key from `process.env`?',
    },
    options: [
      { text: { ru: 'В любом: переменные окружения не попадают в браузер', en: 'Any: environment variables never reach the browser' } },
      { text: { ru: 'В клиентском, если обернуть в `useMemo`', en: 'In a Client Component, if wrapped in `useMemo`' } },
      {
        text: {
          ru: 'В серверном: его код не попадает в бандл, а в клиентском компоненте секрет уйдёт в браузер',
          en: 'In a Server Component: its code isn’t in the bundle, while in a Client Component the secret ships to the browser',
        },
      },
      { text: { ru: 'Только в `useEffect`', en: 'Only in `useEffect`' } },
      { text: { ru: 'Ни в каком', en: 'In none' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Код серверного компонента выполняется только на сервере, и в браузер приходит лишь результат рендера. Клиентский компонент целиком попадает в бандл: всё, что он читает, видно в DevTools. Фреймворки дополнительно защищают секреты: в Next.js в клиентский код попадают только переменные с префиксом `NEXT_PUBLIC_`, а пакет `server-only` запрещает импорт модуля на клиенте.',
          en: 'A Server Component’s code runs only on the server, and the browser receives just the render result. A Client Component goes into the bundle entirely: everything it reads is visible in DevTools. Frameworks add protection: in Next.js only `NEXT_PUBLIC_`-prefixed variables reach client code, and the `server-only` package forbids importing a module on the client.',
        },
      },
    ],
    sources: [{ title: 'React — Server Components', url: `${REFERENCE}/rsc/server-components` }],
  },
  {
    id: 'react-rsc-006',
    topic: 'react',
    tags: ['server-components'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Страница статьи рендерит Markdown тяжёлой библиотекой-парсером в серверном компоненте. Что получит браузер?',
      en: 'An article page renders Markdown with a heavy parser library in a Server Component. What does the browser get?',
    },
    options: [
      { text: { ru: 'Код парсера и исходный Markdown — разбор пройдёт в браузере', en: 'The parser code and the raw Markdown — parsing happens in the browser' } },
      {
        text: {
          ru: 'Готовый результат рендера: код компонента и парсера остаётся на сервере и не увеличивает бандл',
          en: 'The ready render result: the component and parser code stay on the server and don’t grow the bundle',
        },
      },
      { text: { ru: 'Пустую страницу до гидратации', en: 'An empty page until hydration' } },
      { text: { ru: 'Парсер в отдельном чанке', en: 'The parser in a separate chunk' } },
      { text: { ru: 'Ошибку: серверные компоненты не могут импортировать библиотеки', en: 'An error: Server Components can’t import libraries' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это одно из главных преимуществ серверных компонентов: зависимости, которые нужны только для рендера — парсеры, форматтеры дат, подсветка кода, — выполняются на сервере, а в браузер уходит готовая разметка. В бандл попадают только клиентские компоненты и их импорты.',
          en: 'That’s one of the main benefits of Server Components: dependencies needed only for rendering — parsers, date formatters, syntax highlighting — run on the server, and the browser receives ready markup. Only Client Components and their imports go into the bundle.',
        },
      },
    ],
    sources: [{ title: 'React — Server Components', url: `${REFERENCE}/rsc/server-components` }],
  },
];
