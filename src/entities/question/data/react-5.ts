import type { Question } from '../model/types';

const LEARN = 'https://react.dev/learn';
const REFERENCE = 'https://react.dev/reference/react';

export const REACT_QUESTIONS_5: Question[] = [
  {
    id: 'react-effects-order-001',
    kind: 'order',
    topic: 'react',
    tags: ['effects'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Расставьте логи в порядке появления при первом монтировании `<Parent />` (без StrictMode).',
      en: 'Put the logs in the order they appear when `<Parent />` mounts for the first time (no StrictMode).',
    },
    code: {
      lang: 'jsx',
      source: `function Child() {
  console.log('Child render');
  useEffect(() => console.log('Child effect'), []);
  return null;
}

function Parent() {
  console.log('Parent render');
  useEffect(() => console.log('Parent effect'), []);
  return <Child />;
}`,
    },
    items: [{ code: 'Parent render' }, { code: 'Child render' }, { code: 'Child effect' }, { code: 'Parent effect' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Рендер идёт сверху вниз: React вызывает `Parent`, получает `<Child />` и вызывает `Child`.',
          en: 'Rendering goes top-down: React calls `Parent`, gets `<Child />` and calls `Child`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Эффекты запускаются после коммита в DOM и снизу вверх: сначала у детей, потом у родителя — к моменту эффекта родителя дети уже готовы.',
          en: 'Effects run after the commit, bottom-up: children first, then the parent — by the time the parent’s effect runs, its children are ready.',
        },
      },
    ],
    sources: [
      { title: 'React — Render and Commit', url: `${LEARN}/render-and-commit` },
      { title: 'React — useEffect', url: `${REFERENCE}/useEffect` },
    ],
  },
  {
    id: 'react-effects-bug-001',
    kind: 'bug-line',
    topic: 'react',
    tags: ['effects'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'При смене `query` результаты не обновляются. В какой строке ошибка?',
      en: 'The results don’t update when `query` changes. Which line has the bug?',
    },
    code: {
      lang: 'jsx',
      source: `function Search({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults(query).then(setResults);
  }, []);

  return <List items={results} />;
}`,
    },
    answerLine: 6,
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Эффект читает `query`, но массив зависимостей пустой — эффект отработает один раз при монтировании и не перезапустится при новом `query`.',
          en: 'The effect reads `query`, but the dependency array is empty — it runs once on mount and never re-runs for a new `query`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Все реактивные значения, которые использует эффект, должны быть в зависимостях: `[query]`. Линтер `react-hooks/exhaustive-deps` ловит это автоматически.',
          en: 'Every reactive value the effect uses must be a dependency: `[query]`. The `react-hooks/exhaustive-deps` lint rule catches this automatically.',
        },
      },
    ],
    sources: [
      { title: 'React — Lifecycle of Reactive Effects', url: `${LEARN}/lifecycle-of-reactive-effects` },
      { title: 'React — useEffect', url: `${REFERENCE}/useEffect` },
    ],
  },
  {
    id: 'react-rendering-bug-001',
    kind: 'bug-line',
    topic: 'react',
    tags: ['rendering'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Задачи удаляются сразу при отрисовке списка, без нажатия на кнопку. В какой строке ошибка?',
      en: 'Todos get deleted as soon as the list renders, without any click. Which line has the bug?',
    },
    code: {
      lang: 'jsx',
      source: `function TodoItem({ todo, onDelete }) {
  return (
    <li>
      {todo.text}
      <button type="button" onClick={onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}`,
    },
    answerLine: 5,
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`onClick={onDelete(todo.id)}` **вызывает** функцию прямо во время рендера и передаёт в `onClick` её результат. Обработчику нужна сама функция, а не результат вызова.',
          en: '`onClick={onDelete(todo.id)}` **calls** the function during render and passes its result to `onClick`. A handler needs the function itself, not the result of calling it.',
        },
      },
      {
        type: 'code',
        code: { lang: 'jsx', source: `<button type="button" onClick={() => onDelete(todo.id)}>` },
        caption: { ru: 'Передать функцию, которая вызовется по клику', en: 'Pass a function that runs on click' },
      },
    ],
    sources: [{ title: 'React — Responding to Events', url: `${LEARN}/responding-to-events` }],
  },
];
