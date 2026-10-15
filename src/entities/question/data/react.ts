import type { Question } from '../model/types';

export const REACT_QUESTIONS: Question[] = [
  {
    id: 'react-keys-001',
    topic: 'react',
    tags: ['keys', 'rendering'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Зачем React нужен `key` у элементов списка?',
      en: 'Why does React need a `key` on list items?',
    },
    options: [
      {
        text: {
          ru: 'Чтобы закэшировать HTML списка и ускорить первую отрисовку',
          en: 'To cache the list’s HTML and speed up the first render',
        },
      },
      {
        text: {
          ru: 'Без `key` список не отрисуется: React выбросит ошибку',
          en: 'Without `key` the list won’t render: React throws an error',
        },
      },
      {
        text: {
          ru: 'Чтобы сопоставлять элементы между рендерами и сохранять их состояние при вставках, удалениях и перестановках',
          en: 'To match items between renders and keep their state when items are inserted, removed or reordered',
        },
      },
      {
        text: {
          ru: '`key` приходит в компонент обычным пропсом и нужен для стилизации',
          en: '`key` is passed to the component as a regular prop and is used for styling',
        },
      },
      {
        text: {
          ru: '`key` нужен только спискам длиннее 100 элементов',
          en: '`key` is only needed for lists longer than 100 items',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По `key` React понимает, какой элемент массива какому компоненту соответствовал в прошлом рендере. Так он переиспользует нужные DOM-узлы и состояние, а не путает их при изменении порядка.',
          en: 'React uses `key` to tell which array item corresponds to which component from the previous render. That way it reuses the right DOM nodes and state instead of mixing them up when the order changes.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Без ключа React только выведет предупреждение в консоль. Сам `key` в пропсы компонента не попадает. Индекс массива в качестве ключа ломается при вставке и сортировке — берите стабильный `id` из данных.',
          en: 'Without a key React only logs a warning. The `key` itself is not passed to the component as a prop. Using the array index breaks on inserts and sorting — use a stable `id` from your data.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `<ul>
  {todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} />
  ))}
</ul>`,
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Keeping list items in order with key',
        url: 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key',
      },
      {
        title: 'react.dev — Preserving and resetting state',
        url: 'https://react.dev/learn/preserving-and-resetting-state',
      },
    ],
  },
  {
    id: 'react-state-001',
    topic: 'react',
    tags: ['state'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какое число покажет кнопка после одного клика?',
      en: 'What number will the button show after one click?',
    },
    code: {
      lang: 'jsx',
      source: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}`,
    },
    options: [{ code: '3' }, { code: '0' }, { code: '1' }, { code: '2' }, { text: { ru: 'Ошибка: слишком много ререндеров', en: 'Error: too many re-renders' } }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Состояние — это снимок на момент рендера. Внутри обработчика `count` равен `0` во всех трёх строках, поэтому React трижды получает «установи 1».',
          en: 'State is a snapshot taken at render time. Inside the handler `count` is `0` on all three lines, so React receives “set to 1” three times.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы опираться на предыдущее значение, передайте функцию-обновитель — React применит их по очереди:',
          en: 'To build on the previous value, pass an updater function — React applies them in order:',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `setCount((c) => c + 1);
setCount((c) => c + 1);
setCount((c) => c + 1);
// 3`,
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Queueing a series of state updates',
        url: 'https://react.dev/learn/queueing-a-series-of-state-updates',
      },
      {
        title: 'react.dev — State as a snapshot',
        url: 'https://react.dev/learn/state-as-a-snapshot',
      },
    ],
  },
  {
    id: 'react-effects-001',
    topic: 'react',
    tags: ['effects'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Компонент с `useEffect(() => {…}, [])` рендерится внутри `<StrictMode>` в режиме разработки. Что произойдёт при монтировании?',
      en: 'A component with `useEffect(() => {…}, [])` renders inside `<StrictMode>` in development. What happens on mount?',
    },
    options: [
      {
        text: {
          ru: 'Эффект выполнится один раз, как в продакшене',
          en: 'The effect runs once, just like in production',
        },
      },
      {
        text: {
          ru: 'Эффект выполнится дважды подряд, без очистки между запусками',
          en: 'The effect runs twice in a row without cleanup in between',
        },
      },
      {
        text: {
          ru: 'Эффект не выполнится, пока состояние не изменится',
          en: 'The effect doesn’t run until state changes',
        },
      },
      {
        text: {
          ru: 'Эффект, затем его очистка, затем эффект ещё раз',
          en: 'Setup, then cleanup, then setup again',
        },
      },
      {
        text: {
          ru: 'Эффект будет выполняться бесконечно, пока не убрать StrictMode',
          en: 'The effect will run in a loop until StrictMode is removed',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В режиме разработки StrictMode делает один лишний цикл «setup → cleanup» перед настоящим запуском эффекта. Так он проверяет, что очистка корректно отменяет работу эффекта: отписывается, закрывает соединение, сбрасывает таймер.',
          en: 'In development StrictMode runs one extra “setup → cleanup” cycle before the real setup. This stress-tests that your cleanup correctly undoes the effect: unsubscribes, closes connections, clears timers.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В продакшене эффект выполнится один раз. Если двойной запуск что-то ломает — значит, в эффекте не хватает очистки.',
          en: 'In production the effect runs once. If the double run breaks something, the effect is missing a cleanup.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — My Effect runs twice when the component mounts',
        url: 'https://react.dev/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts',
      },
      {
        title: 'react.dev — StrictMode',
        url: 'https://react.dev/reference/react/StrictMode',
      },
    ],
  },
  {
    id: 'react-memo-001',
    topic: 'react',
    tags: ['memoization', 'rendering'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Дочерний компонент обёрнут в `memo`, а родитель на каждом рендере передаёт ему `onClick={() => save(id)}`. Что произойдёт при ререндере родителя?',
      en: 'A child component is wrapped in `memo`, and the parent passes `onClick={() => save(id)}` on every render. What happens when the parent re-renders?',
    },
    options: [
      {
        text: {
          ru: 'Ребёнок не перерисуется: `memo` сравнивает функции по их коду',
          en: 'The child won’t re-render: `memo` compares functions by their source code',
        },
      },
      {
        text: {
          ru: 'Ребёнок перерисуется: каждый раз приходит новая функция, и поверхностное сравнение пропсов не проходит',
          en: 'The child re-renders: a new function arrives every time, so the shallow props comparison fails',
        },
      },
      {
        text: {
          ru: 'React выбросит ошибку о нестабильном пропсе',
          en: 'React throws an error about an unstable prop',
        },
      },
      {
        text: {
          ru: 'Ребёнок перерисуется, только если `onClick` уже вызывался',
          en: 'The child re-renders only if `onClick` has been called before',
        },
      },
      {
        text: {
          ru: '`memo` запрещает ререндер навсегда, пока не изменится `key`',
          en: '`memo` blocks re-rendering forever until the `key` changes',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`memo` сравнивает каждый пропс через `Object.is`. Стрелочная функция, созданная при рендере, — каждый раз новый объект, поэтому сравнение не проходит и [[memoization|мемоизация]] не срабатывает.',
          en: '`memo` compares every prop with `Object.is`. An arrow function created during render is a new object each time, so the comparison fails and [[memoization|memoization]] does nothing.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `const handleClick = useCallback(() => save(id), [id]);

return <Child onClick={handleClick} />;`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`useCallback` сохраняет ту же функцию, пока не изменились зависимости. React Compiler умеет делать такую мемоизацию автоматически.',
          en: '`useCallback` keeps the same function until its dependencies change. React Compiler can apply this memoization automatically.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — memo: Minimizing props changes',
        url: 'https://react.dev/reference/react/memo#minimizing-props-changes',
      },
      {
        title: 'react.dev — useCallback: Skipping re-rendering of components',
        url: 'https://react.dev/reference/react/useCallback#skipping-re-rendering-of-components',
      },
    ],
  },
  {
    id: 'react-hooks-rules-001',
    topic: 'react',
    tags: ['hooks-rules', 'react-19'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какой фрагмент кода внутри компонента нарушает правила хуков?',
      en: 'Which snippet inside a component breaks the Rules of Hooks?',
    },
    options: [
      { code: 'const [a, setA] = useState(0);\nconst [b, setB] = useState(0);' },
      { code: 'if (isOpen) {\n  useEffect(() => {}, []);\n}' },
      { code: "useEffect(() => {\n  if (isOpen) {\n    document.title = 'Open';\n  }\n}, [isOpen]);" },
      { code: 'if (isOpen) {\n  const theme = use(ThemeContext);\n}' },
      { code: 'const theme = useContext(ThemeContext);' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Хуки нужно вызывать на верхнем уровне компонента, в одном и том же порядке на каждом рендере: React различает их по порядку вызова. Хук внутри `if` нарушает это правило.',
          en: 'Hooks must be called at the top level of a component, in the same order on every render: React tells them apart by call order. A Hook inside an `if` breaks that rule.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Условие внутри эффекта — нормально. А `use` из React 19 — исключение: в отличие от хуков, его можно вызывать в условиях и циклах.',
          en: 'A condition inside an effect is fine. And React 19’s `use` is an exception: unlike Hooks, it can be called inside conditions and loops.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — Rules of Hooks', url: 'https://react.dev/reference/rules/rules-of-hooks' },
      { title: 'react.dev — use', url: 'https://react.dev/reference/react/use' },
    ],
  },
];
