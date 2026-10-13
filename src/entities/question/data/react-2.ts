import type { Question } from '../model/types';

const LEARN = 'https://react.dev/learn';
const REFERENCE = 'https://react.dev/reference/react';

export const REACT_QUESTIONS_2: Question[] = [
  {
    id: 'react-rendering-001',
    topic: 'react',
    tags: ['rendering'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Когда React перерисовывает компонент?', en: 'When does React re-render a component?' },
    options: [
      {
        text: {
          ru: 'Только когда меняются его пропсы',
          en: 'Only when its props change',
        },
      },
      {
        text: {
          ru: 'Когда меняется любая переменная внутри компонента',
          en: 'When any variable inside the component changes',
        },
      },
      {
        text: {
          ru: 'Когда меняется его состояние, перерисовывается родитель или меняется контекст, который он читает',
          en: 'When its state changes, its parent re-renders, or a context it reads changes',
        },
      },
      {
        text: {
          ru: 'По таймеру, примерно каждые 16 мс',
          en: 'On a timer, roughly every 16 ms',
        },
      },
      {
        text: {
          ru: 'Только после вызова `forceUpdate`',
          en: 'Only after `forceUpdate` is called',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Рендер запускается, когда компонент получает новое состояние (`setState`), когда рендерится его родитель — по умолчанию React перерисовывает всех потомков — или когда меняется значение контекста, который компонент читает.',
          en: 'A render is triggered when the component gets new state (`setState`), when its parent renders — by default React re-renders all descendants — or when a context value it reads changes.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Популярное заблуждение — «перерисовка только при смене пропсов». На самом деле ребёнок рендерится вместе с родителем даже с теми же пропсами, если он не обёрнут в `memo`. Обычные переменные рендер не вызывают.',
          en: 'A popular misconception is “re-render only when props change.” In fact a child renders along with its parent even with the same props unless it’s wrapped in `memo`. Plain variables never trigger a render.',
        },
      },
      { type: 'diagram', diagram: 'react-render-commit' },
    ],
    sources: [
      { title: 'react.dev — Render and Commit', url: `${LEARN}/render-and-commit` },
      { title: 'react.dev — memo', url: `${REFERENCE}/memo` },
    ],
  },
  {
    id: 'react-rendering-002',
    topic: 'react',
    tags: ['rendering'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что такое reconciliation в React?', en: 'What is reconciliation in React?' },
    options: [
      {
        text: {
          ru: 'Сравнение нового дерева элементов с предыдущим, чтобы вычислить минимальные изменения DOM',
          en: 'Comparing the new element tree with the previous one to compute the minimal DOM changes',
        },
      },
      {
        text: {
          ru: 'Полная замена DOM новым HTML после каждого рендера',
          en: 'Replacing the whole DOM with new HTML after every render',
        },
      },
      {
        text: {
          ru: 'Синхронизация состояния между вкладками браузера',
          en: 'Syncing state between browser tabs',
        },
      },
      {
        text: {
          ru: 'Слияние нескольких вызовов `setState` в один',
          en: 'Merging several `setState` calls into one',
        },
      },
      {
        text: {
          ru: 'Загрузка кода компонентов по требованию',
          en: 'Loading component code on demand',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'После рендера React сравнивает новое дерево с прошлым. Эвристики простые: элемент другого типа на том же месте — поддерево пересоздаётся (состояние теряется); того же типа — обновляются только изменившиеся атрибуты. Для списков React опирается на `key`.',
          en: 'After a render React diffs the new tree against the previous one. The heuristics are simple: a different element type at the same spot rebuilds the subtree (state is lost); the same type only updates changed attributes. For lists React relies on `key`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Слияние нескольких `setState` — это батчинг, а не reconciliation. Загрузка по требованию — `lazy`.',
          en: 'Merging several `setState` calls is batching, not reconciliation. On-demand loading is `lazy`.',
        },
      },
      { type: 'diagram', diagram: 'react-render-commit' },
    ],
    sources: [
      { title: 'react.dev — Preserving and Resetting State', url: `${LEARN}/preserving-and-resetting-state` },
      { title: 'react.dev — Render and Commit', url: `${LEARN}/render-and-commit` },
    ],
  },
  {
    id: 'react-rendering-003',
    topic: 'react',
    tags: ['rendering', 'state'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Сохранится ли счётчик внутри `Counter`, когда `isFancy` меняется?',
      en: 'Will the count inside `Counter` survive when `isFancy` changes?',
    },
    code: {
      lang: 'jsx',
      source: `function App({ isFancy }) {
  return (
    <div>
      {isFancy ? <Counter isFancy /> : <Counter />}
    </div>
  );
}`,
    },
    options: [
      {
        text: {
          ru: 'Нет: это две разные ветки тернарного оператора, поэтому компонент пересоздаётся',
          en: 'No: these are two different ternary branches, so the component is recreated',
        },
      },
      {
        text: {
          ru: 'Да: на том же месте дерева остаётся компонент того же типа, React его просто обновит',
          en: 'Yes: a component of the same type stays at the same spot in the tree, so React just updates it',
        },
      },
      {
        text: {
          ru: 'Нет: изменились пропсы, а это всегда сбрасывает состояние',
          en: 'No: the props changed, and that always resets state',
        },
      },
      {
        text: {
          ru: 'Да, но только если обернуть `Counter` в `memo`',
          en: 'Yes, but only if `Counter` is wrapped in `memo`',
        },
      },
      {
        text: {
          ru: 'Зависит от того, используется ли StrictMode',
          en: 'It depends on whether StrictMode is used',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'React привязывает состояние к **позиции в дереве**, а не к JSX-строке. В обеих ветках на одном месте стоит `<Counter>` — тот же тип в той же позиции, поэтому состояние сохраняется, а меняются только пропсы.',
          en: 'React ties state to the **position in the tree**, not to a line of JSX. Both branches put a `<Counter>` at the same spot — same type, same position — so state is preserved and only the props change.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы сбросить состояние, дайте компонентам разные `key` или разместите их на разных позициях.',
          en: 'To reset the state, give the components different `key`s or render them at different positions.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Same component at the same position preserves state',
        url: `${LEARN}/preserving-and-resetting-state#same-component-at-the-same-position-preserves-state`,
      },
    ],
  },
  {
    id: 'react-rendering-004',
    topic: 'react',
    tags: ['rendering', 'state'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Пользователь вводит текст в поле, затем `Form` перерисовывается. Что станет с введённым текстом?',
      en: 'The user types into the input, then `Form` re-renders. What happens to the typed text?',
    },
    code: {
      lang: 'jsx',
      source: `function Form() {
  const [count, setCount] = useState(0);

  function TextField() {
    const [text, setText] = useState('');
    return <input value={text} onChange={(e) => setText(e.target.value)} />;
  }

  return (
    <>
      <TextField />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}`,
    },
    options: [
      { text: { ru: 'Сохранится', en: 'It’s kept' } },
      { text: { ru: 'Сохранится, но поле потеряет фокус', en: 'It’s kept, but the input loses focus' } },
      {
        text: {
          ru: 'Сбросится: на каждом рендере `TextField` — новая функция, то есть новый тип компонента',
          en: 'It resets: on every render `TextField` is a new function, i.e. a new component type',
        },
      },
      { text: { ru: 'React выбросит ошибку о вложенном компоненте', en: 'React throws an error about a nested component' } },
      { text: { ru: 'Сбросится только в StrictMode', en: 'It resets only in StrictMode' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`TextField` объявлена внутри `Form`, поэтому каждый рендер `Form` создаёт **новую** функцию. Для React это другой тип компонента на той же позиции — старый размонтируется вместе с состоянием, новый монтируется с пустой строкой.',
          en: '`TextField` is declared inside `Form`, so every render of `Form` creates a **new** function. To React that’s a different component type at the same position — the old one unmounts with its state, and the new one mounts with an empty string.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Правило: объявляйте компоненты на верхнем уровне модуля, а не внутри других компонентов.',
          en: 'The rule: declare components at the top level of a module, never inside other components.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Different components at the same position reset state',
        url: `${LEARN}/preserving-and-resetting-state#different-components-at-the-same-position-reset-state`,
      },
    ],
  },
  {
    id: 'react-rendering-005',
    topic: 'react',
    tags: ['rendering', 'keys'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Зачем передавать `key` компоненту, который не находится в списке?',
      en: 'Why pass a `key` to a component that isn’t in a list?',
    },
    code: { lang: 'jsx', source: `<Chat key={contact.id} contact={contact} />` },
    options: [
      {
        text: {
          ru: 'Незачем: вне списков React игнорирует `key`',
          en: 'No reason: React ignores `key` outside lists',
        },
      },
      {
        text: {
          ru: 'Чтобы `Chat` получил `contact.id` в пропсах',
          en: 'So that `Chat` receives `contact.id` in its props',
        },
      },
      {
        text: {
          ru: 'Чтобы React кэшировал `Chat` для каждого контакта',
          en: 'So React caches a `Chat` per contact',
        },
      },
      {
        text: {
          ru: 'Чтобы при смене контакта React пересоздал `Chat` и сбросил его состояние, например черновик сообщения',
          en: 'So that when the contact changes React recreates `Chat` and resets its state, such as a draft message',
        },
      },
      {
        text: {
          ru: 'Чтобы ускорить первый рендер',
          en: 'To speed up the first render',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Другой `key` означает для React другой компонент: старый размонтируется, новый смонтируется с чистым состоянием. Это самый простой способ сбросить состояние при смене «сущности» без эффектов и ручной синхронизации.',
          en: 'A different `key` means a different component to React: the old one unmounts and a new one mounts with fresh state. It’s the simplest way to reset state when the underlying “entity” changes, without effects or manual syncing.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Resetting state with a key',
        url: `${LEARN}/preserving-and-resetting-state#option-2-resetting-state-with-a-key`,
      },
    ],
  },
  {
    id: 'react-state-002',
    topic: 'react',
    tags: ['state'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что произойдёт после вызова `rename`?', en: 'What happens after `rename` is called?' },
    code: {
      lang: 'jsx',
      source: `const [user, setUser] = useState({ name: 'Ann' });

function rename() {
  user.name = 'Bob';
  setUser(user);
}`,
    },
    options: [
      {
        text: {
          ru: 'Интерфейс покажет `Bob`',
          en: 'The UI shows `Bob`',
        },
      },
      {
        text: {
          ru: 'React выбросит ошибку о мутации состояния',
          en: 'React throws an error about mutating state',
        },
      },
      {
        text: {
          ru: 'Интерфейс не обновится: в `setUser` передана та же ссылка, и React пропустит обновление',
          en: 'The UI doesn’t update: `setUser` gets the same reference, so React skips the update',
        },
      },
      {
        text: {
          ru: 'Компонент войдёт в бесконечный цикл рендеров',
          en: 'The component enters an infinite render loop',
        },
      },
      {
        text: {
          ru: 'Интерфейс обновится только в режиме разработки',
          en: 'The UI updates only in development mode',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'React сравнивает новое и старое состояние через `Object.is`. Объект мутировали, но ссылка та же — React считает, что ничего не изменилось, и не перерисовывает интерфейс.',
          en: 'React compares the new and old state with `Object.is`. The object was mutated, but the reference is the same — React assumes nothing changed and doesn’t update the UI.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `setUser({ ...user, name: 'Bob' });`,
        },
        caption: {
          ru: 'Состояние нужно заменять новым объектом.',
          en: 'Replace state with a new object instead.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — Updating Objects in State', url: `${LEARN}/updating-objects-in-state` },
      { title: 'react.dev — useState', url: `${REFERENCE}/useState` },
    ],
  },
  {
    id: 'react-state-003',
    topic: 'react',
    tags: ['state'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В React 18+ обработчик вызывает два `setState` внутри `setTimeout`. Сколько раз перерисуется компонент?',
      en: 'In React 18+, a handler calls two `setState`s inside `setTimeout`. How many times will the component re-render?',
    },
    code: {
      lang: 'jsx',
      source: `function handleClick() {
  setTimeout(() => {
    setCount((c) => c + 1);
    setFlag((f) => !f);
  }, 0);
}`,
    },
    options: [
      { code: '0' },
      { code: '1' },
      { code: '2' },
      { text: { ru: '2 в продакшене и 4 в режиме разработки', en: '2 in production and 4 in development' } },
      { text: { ru: 'Зависит от браузера', en: 'It depends on the browser' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'С React 18 работает **автоматический батчинг**: обновления группируются в один рендер не только в обработчиках событий, но и в `setTimeout`, промисах и нативных обработчиках.',
          en: 'Since React 18, **automatic batching** groups updates into a single render not only in event handlers but also in `setTimeout`, promises and native event handlers.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В React 17 внутри `setTimeout` было бы два рендера. Если нужно применить обновление синхронно, есть `flushSync`, но пользоваться им стоит редко.',
          en: 'In React 17 this would render twice inside `setTimeout`. If you need to apply an update synchronously, there’s `flushSync`, but use it sparingly.',
        },
      },
    ],
    sources: [
      {
        title: 'React 18 — Automatic Batching',
        url: 'https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching',
      },
      { title: 'react.dev — flushSync', url: 'https://react.dev/reference/react-dom/flushSync' },
    ],
  },
  {
    id: 'react-state-004',
    topic: 'react',
    tags: ['state'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Два соседних компонента должны показывать и менять одно и то же значение. Где хранить состояние?',
      en: 'Two sibling components must show and change the same value. Where should the state live?',
    },
    options: [
      {
        text: {
          ru: 'В каждом из них, синхронизируя через `useEffect`',
          en: 'In each of them, synced with `useEffect`',
        },
      },
      {
        text: {
          ru: 'В глобальной переменной модуля',
          en: 'In a module-level global variable',
        },
      },
      {
        text: {
          ru: 'В ближайшем общем родителе, передавая значение и функцию изменения через пропсы',
          en: 'In their closest common parent, passing the value and a setter down as props',
        },
      },
      {
        text: {
          ru: 'В `useRef` одного из компонентов',
          en: 'In a `useRef` of one of the components',
        },
      },
      {
        text: {
          ru: 'Обязательно в Redux',
          en: 'Necessarily in Redux',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это **подъём состояния** (lifting state up): у каждого значения должен быть один источник истины. Родитель хранит состояние и передаёт детям значение и обработчики.',
          en: 'This is **lifting state up**: each value should have a single source of truth. The parent owns the state and passes the value and handlers to its children.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Синхронизация двух копий эффектами порождает рассинхрон и лишние рендеры. Глобальная переменная не вызывает рендер. Контекст или стейт-менеджер нужны, когда пропсы приходится протаскивать через много уровней.',
          en: 'Syncing two copies with effects leads to drift and extra renders. A global variable doesn’t trigger renders. Context or a state manager helps when props must be drilled through many levels.',
        },
      },
    ],
    sources: [{ title: 'react.dev — Sharing State Between Components', url: `${LEARN}/sharing-state-between-components` }],
  },
  {
    id: 'react-state-005',
    topic: 'react',
    tags: ['state', 'effects'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Как правильно получить `fullName` из `firstName` и `lastName`, которые лежат в состоянии?',
      en: 'What’s the right way to get `fullName` from `firstName` and `lastName` held in state?',
    },
    options: [
      {
        text: {
          ru: 'Завести отдельное состояние `fullName` и обновлять его в `useEffect`',
          en: 'Add a separate `fullName` state and update it in `useEffect`',
        },
      },
      {
        text: {
          ru: 'Вычислять прямо при рендере: `const fullName = firstName + " " + lastName`',
          en: 'Compute it during render: `const fullName = firstName + " " + lastName`',
        },
      },
      {
        text: {
          ru: 'Хранить в `useRef` и обновлять в обработчиках',
          en: 'Keep it in a `useRef` and update it in handlers',
        },
      },
      {
        text: {
          ru: 'Всегда оборачивать в `useMemo`',
          en: 'Always wrap it in `useMemo`',
        },
      },
      {
        text: {
          ru: 'Положить в контекст',
          en: 'Put it into context',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Если значение можно вычислить из пропсов и состояния — это **производные данные**, их не нужно хранить. Отдельное состояние с эффектом даёт лишний рендер с устаревшим значением и риск рассинхрона.',
          en: 'If a value can be computed from props and state, it’s **derived data** — don’t store it. A separate state plus an effect causes an extra render with a stale value and a risk of drift.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`useMemo` нужен, только если вычисление действительно дорогое; склейка строк к таким не относится.',
          en: '`useMemo` is only worth it when the computation is genuinely expensive; concatenating strings isn’t.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Avoid redundant state',
        url: `${LEARN}/choosing-the-state-structure#avoid-redundant-state`,
      },
      { title: 'react.dev — You Might Not Need an Effect', url: `${LEARN}/you-might-not-need-an-effect` },
    ],
  },
  {
    id: 'react-state-006',
    topic: 'react',
    tags: ['state', 'memoization'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В чём разница между этими двумя строками?',
      en: 'What’s the difference between these two lines?',
    },
    code: {
      lang: 'jsx',
      source: `const [todos, setTodos] = useState(createInitialTodos());
const [todos, setTodos] = useState(createInitialTodos);`,
    },
    options: [
      { text: { ru: 'Никакой', en: 'None' } },
      {
        text: {
          ru: 'Вторая строка — ошибка: `useState` не принимает функции',
          en: 'The second line is an error: `useState` doesn’t accept functions',
        },
      },
      {
        text: {
          ru: 'Во второй строке состояние будет функцией `createInitialTodos`',
          en: 'In the second line the state will be the `createInitialTodos` function itself',
        },
      },
      {
        text: {
          ru: 'Первая вызывает `createInitialTodos` на каждом рендере, вторая — только при первом',
          en: 'The first calls `createInitialTodos` on every render, the second only on the first one',
        },
      },
      {
        text: {
          ru: 'Первая вызывает `createInitialTodos` только один раз, вторая — на каждом рендере',
          en: 'The first calls `createInitialTodos` only once, the second on every render',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useState(createInitialTodos())` — это обычный вызов функции при каждом рендере. Результат нужен только в первый раз, остальные вычисления выбрасываются. Если функцию передать без вызова, React использует её как **инициализатор** и вызовет один раз.',
          en: '`useState(createInitialTodos())` is a plain function call on every render. The result is only needed the first time; later ones are thrown away. Passing the function itself makes React treat it as an **initializer** and call it once.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы положить в состояние саму функцию, её нужно обернуть: `useState(() => myFunction)`.',
          en: 'To store a function itself in state, wrap it: `useState(() => myFunction)`.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Avoiding recreating the initial state',
        url: `${REFERENCE}/useState#avoiding-recreating-the-initial-state`,
      },
    ],
  },
  {
    id: 'react-hooks-002',
    topic: 'react',
    tags: ['hooks-rules', 'state'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Два компонента вызывают один кастомный хук `useCounter()`. Общее ли у них состояние?',
      en: 'Two components call the same custom hook `useCounter()`. Do they share state?',
    },
    options: [
      {
        text: {
          ru: 'Да, хук хранит состояние в модуле и делит его между всеми вызовами',
          en: 'Yes, the hook keeps state in its module and shares it across calls',
        },
      },
      {
        text: {
          ru: 'Нет: хук переиспользует логику, а состояние у каждого вызова своё',
          en: 'No: a hook reuses logic, and each call gets its own state',
        },
      },
      {
        text: {
          ru: 'Да, если компоненты находятся в одном родителе',
          en: 'Yes, if the components share a parent',
        },
      },
      {
        text: {
          ru: 'Только если хук назван с префиксом `use`',
          en: 'Only if the hook’s name starts with `use`',
        },
      },
      {
        text: {
          ru: 'Да, но только в StrictMode',
          en: 'Yes, but only in StrictMode',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Кастомный хук — это просто функция, которая вызывает другие хуки. Каждый вызов `useState` внутри него привязан к компоненту, который вызвал хук, поэтому состояния полностью независимы.',
          en: 'A custom hook is just a function that calls other hooks. Each `useState` call inside it belongs to the component that called the hook, so the states are completely independent.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы делить состояние, его поднимают в общего родителя или кладут в контекст или стор. Префикс `use` нужен, чтобы линтер и React Compiler узнали хук.',
          en: 'To share state, lift it to a common parent or put it in context or a store. The `use` prefix lets the linter and React Compiler recognize a hook.',
        },
      },
    ],
    sources: [{ title: 'react.dev — Reusing Logic with Custom Hooks', url: `${LEARN}/reusing-logic-with-custom-hooks` }],
  },
  {
    id: 'react-keys-002',
    topic: 'react',
    tags: ['keys', 'rendering'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Список полей ввода отрисован с `key={index}`. Пользователь заполнил поля, затем в начало списка добавили новый элемент. Что увидит пользователь?',
      en: 'A list of inputs uses `key={index}`. The user fills them in, then a new item is added to the start. What does the user see?',
    },
    code: {
      lang: 'jsx',
      source: `{items.map((item, index) => (
  <TodoInput key={index} item={item} />
))}`,
    },
    options: [
      {
        text: {
          ru: 'Всё корректно: каждый текст останется у своего элемента',
          en: 'Everything is fine: each text stays with its item',
        },
      },
      {
        text: {
          ru: 'Все поля очистятся',
          en: 'All inputs are cleared',
        },
      },
      {
        text: {
          ru: 'React выбросит ошибку о дублирующихся ключах',
          en: 'React throws a duplicate key error',
        },
      },
      {
        text: {
          ru: 'Введённый текст «съедет»: состояние останется привязанным к позициям, а не к элементам',
          en: 'The typed text shifts: state stays tied to positions, not to items',
        },
      },
      {
        text: {
          ru: 'Новый элемент не отобразится до перезагрузки',
          en: 'The new item won’t show until a reload',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'С ключом-индексом новый элемент получает `key=0`, а бывший первый — `key=1`. React сопоставляет компоненты по ключам, поэтому внутреннее состояние и DOM поля с `key=0` достаются новому элементу — текст оказывается не там.',
          en: 'With index keys, the new item gets `key=0` and the former first item gets `key=1`. React matches components by key, so the internal state and DOM of the `key=0` input go to the new item — the text ends up in the wrong place.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Используйте стабильный идентификатор из данных: `key={item.id}`. Индекс допустим, только если список никогда не переупорядочивается и не меняется в середине.',
          en: 'Use a stable ID from the data: `key={item.id}`. An index is fine only if the list is never reordered or changed in the middle.',
        },
      },
    ],
    sources: [{ title: 'react.dev — Rules of keys', url: `${LEARN}/rendering-lists#rules-of-keys` }],
  },
];
