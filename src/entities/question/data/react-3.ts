import type { Question } from '../model/types';

const LEARN = 'https://react.dev/learn';
const REFERENCE = 'https://react.dev/reference/react';

export const REACT_QUESTIONS_3: Question[] = [
  {
    id: 'react-effects-002',
    topic: 'react',
    tags: ['effects'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Когда выполняется эффект, если не передать массив зависимостей: `useEffect(() => {…})`?',
      en: 'When does an effect run if no dependency array is passed: `useEffect(() => {…})`?',
    },
    options: [
      { text: { ru: 'Один раз после монтирования', en: 'Once after mount' } },
      { text: { ru: 'После каждого рендера компонента', en: 'After every render of the component' } },
      { text: { ru: 'Никогда — без массива эффект не запустится', en: 'Never — without the array the effect won’t run' } },
      { text: { ru: 'Только перед размонтированием', en: 'Only before unmount' } },
      { text: { ru: 'Перед каждым рендером', en: 'Before every render' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Без массива — после **каждого** рендера. С пустым массивом `[]` — один раз после монтирования (и cleanup при размонтировании). С `[a, b]` — после рендеров, в которых `a` или `b` изменились по `Object.is`.',
          en: 'With no array — after **every** render. With an empty array `[]` — once after mount (and cleanup on unmount). With `[a, b]` — after renders where `a` or `b` changed by `Object.is`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Эффекты всегда выполняются **после** того, как изменения попали на экран, а не перед рендером.',
          en: 'Effects always run **after** the changes are committed to the screen, not before rendering.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — Synchronizing with Effects', url: `${LEARN}/synchronizing-with-effects` },
      { title: 'react.dev — useEffect', url: `${REFERENCE}/useEffect` },
    ],
  },
  {
    id: 'react-effects-003',
    topic: 'react',
    tags: ['effects', 'state'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что будет показывать счётчик через 5 секунд?',
      en: 'What will the counter show after 5 seconds?',
    },
    code: {
      lang: 'jsx',
      source: `function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <p>{count}</p>;
}`,
    },
    options: [
      { code: '5' },
      { code: '0' },
      { code: '1' },
      { text: { ru: 'Счётчик будет расти бесконечно быстро', en: 'It will grow infinitely fast' } },
      { code: 'NaN' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Эффект с `[]` выполнился один раз, и колбэк интервала **замкнул** `count` из первого рендера — `0`. Каждую секунду вызывается `setCount(0 + 1)`, поэтому счётчик застревает на `1`. Это «[[stale-closure|устаревшее замыкание]]» (stale closure).',
          en: 'The effect with `[]` ran once, and the interval callback **closed over** `count` from the first render — `0`. Every second it calls `setCount(0 + 1)`, so the counter is stuck at `1`. That’s a [[stale-closure|stale closure]].',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `const id = setInterval(() => setCount((c) => c + 1), 1000);`,
        },
        caption: {
          ru: 'Функция-обновитель берёт актуальное значение и не требует зависимостей.',
          en: 'An updater function reads the latest value and needs no dependencies.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Updating state based on previous state from an Effect',
        url: `${REFERENCE}/useEffect#updating-state-based-on-previous-state-from-an-effect`,
      },
    ],
  },
  {
    id: 'react-effects-004',
    topic: 'react',
    tags: ['effects'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Пользователь быстро переключает профили. Какая проблема есть в этом коде?',
      en: 'The user switches profiles quickly. What problem does this code have?',
    },
    code: {
      lang: 'jsx',
      source: `useEffect(() => {
  fetchProfile(userId).then((profile) => setProfile(profile));
}, [userId]);`,
    },
    options: [
      {
        text: {
          ru: 'Никакой: эффект перезапускается при смене `userId`',
          en: 'None: the effect re-runs when `userId` changes',
        },
      },
      {
        text: {
          ru: 'Бесконечный цикл: `setProfile` снова запускает эффект',
          en: 'An infinite loop: `setProfile` triggers the effect again',
        },
      },
      {
        text: {
          ru: 'Гонка: ответ на старый запрос может прийти позже нового и показать чужой профиль. Нужен флаг отмены в cleanup',
          en: 'A race condition: a stale response may arrive after the newer one and show the wrong profile. You need an ignore flag in cleanup',
        },
      },
      {
        text: {
          ru: 'Эффекты не могут работать с промисами',
          en: 'Effects can’t work with promises',
        },
      },
      {
        text: {
          ru: '`userId` не нужно указывать в зависимостях',
          en: '`userId` shouldn’t be in the dependencies',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сетевые ответы приходят в произвольном порядке. Если запрос для профиля A медленнее запроса для B, `setProfile(A)` выполнится последним и перезапишет актуальные данные.',
          en: 'Network responses arrive in any order. If the request for profile A is slower than for B, `setProfile(A)` runs last and overwrites the current data.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `useEffect(() => {
  let ignore = false;
  fetchProfile(userId).then((profile) => {
    if (!ignore) {
      setProfile(profile);
    }
  });
  return () => {
    ignore = true;
  };
}, [userId]);`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Альтернатива — `AbortController` или библиотеки вроде TanStack Query, которые решают это сами.',
          en: 'Alternatives are an `AbortController` or libraries like TanStack Query that handle this for you.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — Fetching data with Effects', url: `${REFERENCE}/useEffect#fetching-data-with-effects` },
    ],
  },
  {
    id: 'react-effects-005',
    topic: 'react',
    tags: ['effects', 'rendering'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чем `useLayoutEffect` отличается от `useEffect`?',
      en: 'How does `useLayoutEffect` differ from `useEffect`?',
    },
    options: [
      {
        text: {
          ru: 'Он выполняется синхронно после изменения DOM, но до отрисовки кадра — удобно для измерения элементов без мигания',
          en: 'It runs synchronously after DOM changes but before the browser paints — handy for measuring elements without flicker',
        },
      },
      {
        text: {
          ru: 'Он выполняется до рендера компонента',
          en: 'It runs before the component renders',
        },
      },
      {
        text: {
          ru: 'Он работает только на сервере',
          en: 'It only runs on the server',
        },
      },
      {
        text: {
          ru: 'Он быстрее, поэтому его стоит использовать по умолчанию',
          en: 'It’s faster, so it should be the default choice',
        },
      },
      {
        text: {
          ru: 'Это устаревшее название `useEffect`',
          en: 'It’s a deprecated name for `useEffect`',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useLayoutEffect` блокирует отрисовку: браузер покажет кадр только после него. Это нужно, когда эффект измеряет DOM (размер тултипа) и сразу меняет позицию — иначе пользователь увидит «прыжок».',
          en: '`useLayoutEffect` blocks painting: the browser shows the frame only after it finishes. That’s needed when an effect measures the DOM (a tooltip’s size) and immediately repositions — otherwise the user sees a jump.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Из-за блокировки он может тормозить интерфейс, поэтому по умолчанию используют `useEffect`.',
          en: 'Because it blocks, it can hurt performance, so `useEffect` is the default.',
        },
      },
    ],
    sources: [{ title: 'react.dev — useLayoutEffect', url: `${REFERENCE}/useLayoutEffect` }],
  },
  {
    id: 'react-memo-002',
    topic: 'react',
    tags: ['memoization'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Чем `useMemo` отличается от `useCallback`?',
      en: 'How does `useMemo` differ from `useCallback`?',
    },
    options: [
      {
        text: {
          ru: '`useMemo` кэширует результат вычисления, `useCallback` — саму функцию между рендерами',
          en: '`useMemo` caches a computed value, `useCallback` caches the function itself between renders',
        },
      },
      {
        text: {
          ru: '`useCallback` кэширует результат функции, `useMemo` — саму функцию',
          en: '`useCallback` caches a function’s result, `useMemo` caches the function itself',
        },
      },
      {
        text: {
          ru: '`useMemo` работает только с массивами',
          en: '`useMemo` only works with arrays',
        },
      },
      {
        text: {
          ru: '`useCallback` предотвращает ререндер самого компонента',
          en: '`useCallback` prevents the component itself from re-rendering',
        },
      },
      {
        text: {
          ru: 'Никакой разницы',
          en: 'There’s no difference',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useMemo(() => compute(a), [a])` хранит **значение** и пересчитывает его при изменении зависимостей. `useCallback(fn, [a])` хранит **функцию**, чтобы её ссылка не менялась. По сути `useCallback(fn, deps)` — это `useMemo(() => fn, deps)`.',
          en: '`useMemo(() => compute(a), [a])` stores a **value** and recomputes it when dependencies change. `useCallback(fn, [a])` stores a **function** so its reference stays stable. Essentially `useCallback(fn, deps)` is `useMemo(() => fn, deps)`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ни один из них не останавливает ререндер компонента, в котором вызван. Польза — при передаче в `memo`-компонент или в зависимости других хуков.',
          en: 'Neither stops the component that calls them from re-rendering. They pay off when passing values to a `memo` component or into other hooks’ dependencies.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — useMemo', url: `${REFERENCE}/useMemo` },
      { title: 'react.dev — useCallback', url: `${REFERENCE}/useCallback` },
    ],
  },
  {
    id: 'react-memo-003',
    topic: 'react',
    tags: ['memoization', 'react-19'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Что делает React Compiler?', en: 'What does React Compiler do?' },
    options: [
      {
        text: {
          ru: 'Компилирует JSX в нативный код для мобильных устройств',
          en: 'Compiles JSX into native mobile code',
        },
      },
      {
        text: {
          ru: 'Переводит классовые компоненты в функциональные',
          en: 'Converts class components into function components',
        },
      },
      {
        text: {
          ru: 'Заменяет Babel и TypeScript',
          en: 'Replaces Babel and TypeScript',
        },
      },
      {
        text: {
          ru: 'На этапе сборки автоматически мемоизирует компоненты и значения, избавляя от ручных `useMemo`/`useCallback`/`memo` в большинстве случаев',
          en: 'Automatically memoizes components and values at build time, removing the need for manual `useMemo`/`useCallback`/`memo` in most cases',
        },
      },
      {
        text: {
          ru: 'Проверяет типы пропсов во время выполнения',
          en: 'Checks prop types at runtime',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'React Compiler — инструмент сборки (плагин Babel), который анализирует компоненты и сам вставляет [[memoization|мемоизацию]] там, где она нужна. Он рассчитывает, что код соблюдает правила React: компоненты чистые, состояние не мутируется.',
          en: 'React Compiler is a build-time tool (a Babel plugin) that analyzes components and inserts [[memoization|memoization]] where it’s needed. It assumes the code follows the Rules of React: components are pure and state isn’t mutated.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Код, нарушающий правила, компилятор пропускает. Ручные `useMemo`/`useCallback` остаются полезными как «аварийный люк» для точного контроля.',
          en: 'Code that breaks the rules is skipped by the compiler. Manual `useMemo`/`useCallback` remain useful as an escape hatch for precise control.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — React Compiler', url: `${LEARN}/react-compiler` },
      { title: 'react.dev — Rules of React', url: 'https://react.dev/reference/rules' },
    ],
  },
  {
    id: 'react-memo-004',
    topic: 'react',
    tags: ['memoization'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Как часто будет пересчитываться `visibleItems`?',
      en: 'How often will `visibleItems` be recomputed?',
    },
    code: {
      lang: 'jsx',
      source: `function List({ items, query }) {
  const filter = { query, caseSensitive: false };
  const visibleItems = useMemo(() => applyFilter(items, filter), [items, filter]);
  // ...
}`,
    },
    options: [
      {
        text: {
          ru: 'Только при изменении `items`',
          en: 'Only when `items` changes',
        },
      },
      {
        text: {
          ru: 'Только при изменении `items` или `query`',
          en: 'Only when `items` or `query` changes',
        },
      },
      {
        text: {
          ru: 'Один раз за всё время жизни компонента',
          en: 'Once for the component’s lifetime',
        },
      },
      {
        text: {
          ru: 'Никогда — `useMemo` с объектом в зависимостях не работает',
          en: 'Never — `useMemo` doesn’t work with an object dependency',
        },
      },
      {
        text: {
          ru: 'На каждом рендере: `filter` — новый объект каждый раз, и зависимость всегда «меняется»',
          en: 'On every render: `filter` is a new object each time, so the dependency always “changes”',
        },
      },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'React сравнивает зависимости через `Object.is`. Объект `filter` создаётся заново на каждом рендере, поэтому сравнение всегда даёт «изменилось», и [[memoization|мемоизация]] бесполезна.',
          en: 'React compares dependencies with `Object.is`. The `filter` object is created anew on every render, so the comparison always says “changed”, and the [[memoization|memoization]] is useless.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `const visibleItems = useMemo(() => {
  const filter = { query, caseSensitive: false };
  return applyFilter(items, filter);
}, [items, query]);`,
        },
        caption: {
          ru: 'Создавайте объект внутри вычисления и зависьте от примитивов.',
          en: 'Create the object inside the computation and depend on primitives.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Memoizing a dependency of another Hook',
        url: `${REFERENCE}/useMemo#memoizing-a-dependency-of-another-hook`,
      },
    ],
  },
  {
    id: 'react-context-001',
    topic: 'react',
    tags: ['context', 'memoization'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Значение `value` у `ThemeContext.Provider` изменилось. Какие компоненты перерисуются?',
      en: 'The `value` of `ThemeContext.Provider` changed. Which components re-render?',
    },
    options: [
      {
        text: {
          ru: 'Только прямые дети провайдера',
          en: 'Only the provider’s direct children',
        },
      },
      {
        text: {
          ru: 'Все компоненты, которые читают этот контекст, даже если между ними и провайдером стоит `memo`',
          en: 'Every component that reads this context, even if there’s a `memo` between it and the provider',
        },
      },
      {
        text: {
          ru: 'Никакие: контекст не вызывает рендер',
          en: 'None: context doesn’t trigger renders',
        },
      },
      {
        text: {
          ru: 'Только компоненты без `memo`',
          en: 'Only components without `memo`',
        },
      },
      {
        text: {
          ru: 'Всё приложение целиком',
          en: 'The whole app',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Когда провайдер получает новое значение (сравнение через `Object.is`), React перерисовывает каждый компонент, который вызывает `useContext` с этим контекстом. `memo` у промежуточных компонентов это не останавливает: потребители контекста обновятся всё равно.',
          en: 'When a provider gets a new value (compared with `Object.is`), React re-renders every component that calls `useContext` with that context. A `memo` on intermediate components doesn’t stop it: context consumers update anyway.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому часто меняющиеся данные лучше разносить по разным контекстам.',
          en: 'That’s why frequently changing data is better split across separate contexts.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — useContext', url: `${REFERENCE}/useContext` },
      { title: 'react.dev — Passing Data Deeply with Context', url: `${LEARN}/passing-data-deeply-with-context` },
    ],
  },
  {
    id: 'react-context-002',
    topic: 'react',
    tags: ['context', 'memoization'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что не так с этим провайдером с точки зрения производительности?',
      en: 'What’s wrong with this provider performance-wise?',
    },
    code: {
      lang: 'jsx',
      source: `function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Page />
    </AuthContext.Provider>
  );
}`,
    },
    options: [
      {
        text: {
          ru: 'Ничего: React сравнивает объекты по содержимому',
          en: 'Nothing: React compares objects by content',
        },
      },
      {
        text: {
          ru: 'Функцию `setUser` нельзя класть в контекст',
          en: '`setUser` can’t be put into context',
        },
      },
      {
        text: {
          ru: 'В `value` нужно передавать только примитивы',
          en: 'Only primitives may be passed as `value`',
        },
      },
      {
        text: {
          ru: 'Провайдер должен быть классовым компонентом',
          en: 'The provider must be a class component',
        },
      },
      {
        text: {
          ru: 'На каждом рендере `App` создаётся новый объект `value`, и все потребители контекста перерисовываются, даже если `user` не менялся',
          en: 'Every render of `App` creates a new `value` object, so all context consumers re-render even if `user` didn’t change',
        },
      },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Литерал `{ user, setUser }` — новый объект на каждом рендере. Для React это новое значение контекста, и он обновляет всех потребителей.',
          en: 'The literal `{ user, setUser }` is a new object on every render. To React that’s a new context value, so it updates every consumer.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `const value = useMemo(() => ({ user, setUser }), [user]);
return <AuthContext.Provider value={value}>…</AuthContext.Provider>;`,
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — Optimizing re-renders when passing objects and functions',
        url: `${REFERENCE}/useContext#optimizing-re-renders-when-passing-objects-and-functions`,
      },
    ],
  },
  {
    id: 'react-refs-001',
    topic: 'react',
    tags: ['refs', 'state'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Чем `useRef` отличается от `useState`?',
      en: 'How does `useRef` differ from `useState`?',
    },
    options: [
      {
        text: {
          ru: 'Изменение `ref.current` не вызывает перерисовку; значение сохраняется между рендерами',
          en: 'Changing `ref.current` doesn’t trigger a re-render; the value persists between renders',
        },
      },
      {
        text: {
          ru: '`useRef` сбрасывается при каждом рендере',
          en: '`useRef` resets on every render',
        },
      },
      {
        text: {
          ru: '`useRef` можно использовать только для DOM-элементов',
          en: '`useRef` can only be used for DOM elements',
        },
      },
      {
        text: {
          ru: 'Изменение `ref.current` вызывает рендер, как и `setState`',
          en: 'Changing `ref.current` triggers a render, just like `setState`',
        },
      },
      {
        text: {
          ru: '`useRef` работает только в классовых компонентах',
          en: '`useRef` only works in class components',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useRef` возвращает один и тот же изменяемый объект `{ current }` на всё время жизни компонента. Менять его можно напрямую, и React об этом не узнает — рендера не будет.',
          en: '`useRef` returns the same mutable `{ current }` object for the component’s whole lifetime. You can change it directly, and React won’t know — no render happens.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Подходит для значений, которые не влияют на вывод: ID таймера, предыдущее значение, ссылка на DOM-узел. Всё, что показывается на экране, держите в состоянии.',
          en: 'It suits values that don’t affect output: a timer ID, a previous value, a DOM node. Anything shown on screen belongs in state.',
        },
      },
    ],
    sources: [
      { title: 'react.dev — Referencing Values with Refs', url: `${LEARN}/referencing-values-with-refs` },
      { title: 'react.dev — useRef', url: `${REFERENCE}/useRef` },
    ],
  },
  {
    id: 'react-refs-002',
    topic: 'react',
    tags: ['refs', 'react-19'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Как в React 19 передать `ref` в собственный функциональный компонент `MyInput`?',
      en: 'How do you pass a `ref` to your own function component `MyInput` in React 19?',
    },
    options: [
      {
        text: {
          ru: 'Только через `forwardRef` — иначе `ref` не дойдёт',
          en: 'Only via `forwardRef` — otherwise the `ref` won’t arrive',
        },
      },
      {
        text: {
          ru: 'Никак: ref работает только со встроенными DOM-элементами',
          en: 'You can’t: refs only work with built-in DOM elements',
        },
      },
      {
        text: {
          ru: 'Как обычный проп: `function MyInput({ ref }) { return <input ref={ref} />; }`',
          en: 'As a regular prop: `function MyInput({ ref }) { return <input ref={ref} />; }`',
        },
      },
      {
        text: {
          ru: 'Через контекст',
          en: 'Through context',
        },
      },
      {
        text: {
          ru: 'Через `useImperativeHandle` без передачи ref',
          en: 'Via `useImperativeHandle` without passing a ref',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Начиная с React 19 функциональные компоненты получают `ref` как обычный проп. `forwardRef` больше не нужен, и в будущих версиях его объявят устаревшим.',
          en: 'Since React 19, function components receive `ref` as a regular prop. `forwardRef` is no longer needed and will be deprecated in a future version.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'jsx',
          source: `function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />;
}

<MyInput ref={inputRef} />`,
        },
      },
    ],
    sources: [
      { title: 'React 19 — ref as a prop', url: 'https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop' },
      { title: 'react.dev — forwardRef', url: `${REFERENCE}/forwardRef` },
    ],
  },
  {
    id: 'react-refs-003',
    topic: 'react',
    tags: ['refs', 'rendering'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чему равен `inputRef.current` во время **первого** рендера компонента?',
      en: 'What is `inputRef.current` during the component’s **first** render?',
    },
    code: {
      lang: 'jsx',
      source: `function Search() {
  const inputRef = useRef(null);
  console.log(inputRef.current);
  return <input ref={inputRef} />;
}`,
    },
    options: [
      { code: 'null' },
      { code: 'undefined' },
      { text: { ru: 'DOM-элемент `<input>`', en: 'The `<input>` DOM element' } },
      { code: '{}' },
      { text: { ru: 'React выбросит ошибку', en: 'React throws an error' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Во время рендера DOM ещё не создан: React записывает узел в `ref.current` на этапе коммита, уже после рендера. Поэтому в первом рендере там начальное значение — `null`.',
          en: 'During render the DOM doesn’t exist yet: React assigns the node to `ref.current` during the commit, after rendering. So in the first render it holds the initial value — `null`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Работайте с DOM через ref в обработчиках событий или эффектах, а не в теле компонента.',
          en: 'Work with the DOM through refs in event handlers or effects, not in the component body.',
        },
      },
    ],
    sources: [
      {
        title: 'react.dev — When React attaches the refs',
        url: `${LEARN}/manipulating-the-dom-with-refs#when-react-attaches-the-refs`,
      },
    ],
  },
];
