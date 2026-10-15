import type { Question } from '../model/types';

const LEARN = 'https://react.dev/learn';
const REFERENCE = 'https://react.dev/reference';

export const REACT_QUESTIONS_6: Question[] = [
  {
    id: 'react-effects-cleanup-order-001',
    kind: 'order',
    topic: 'react',
    tags: ['effects'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Без StrictMode: `<Chat roomId="a" />` монтируется, затем получает `roomId="b"`, затем размонтируется. Расставьте логи по порядку.',
      en: 'Without StrictMode: `<Chat roomId="a" />` mounts, then gets `roomId="b"`, then unmounts. Put the logs in order.',
    },
    code: {
      lang: 'jsx',
      source: `function Chat({ roomId }) {
  useEffect(() => {
    console.log(\`connect \${roomId}\`);
    return () => console.log(\`disconnect \${roomId}\`);
  }, [roomId]);
  return null;
}`,
    },
    items: [{ code: 'connect a' }, { code: 'disconnect a' }, { code: 'connect b' }, { code: 'disconnect b' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Когда зависимость меняется, React сначала вызывает очистку **предыдущего** эффекта — с теми значениями, которые были у него в [[closure|замыкании]] (`a`), — а потом запускает новый эффект с `b`. При размонтировании выполняется последняя очистка. Поэтому подписка, соединение или таймер всегда закрываются ровно один раз на каждое открытие.',
          en: 'When a dependency changes, React first runs the **previous** effect’s cleanup — with the values from its [[closure|closure]] (`a`) — then runs the new effect with `b`. On unmount the last cleanup runs. So a subscription, connection or timer is always closed exactly once per open.',
        },
      },
    ],
    sources: [{ title: 'React — Synchronizing with Effects', url: `${LEARN}/synchronizing-with-effects` }],
  },
  {
    id: 'react-effects-event-001',
    topic: 'react',
    tags: ['effects', 'react-19'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Эффект должен логировать визит при смене `url`, добавляя текущий `cartCount`. Если указать `cartCount` в зависимостях, визит логируется и при каждом изменении корзины. Как правильно?',
      en: 'An effect should log a visit when `url` changes, including the current `cartCount`. With `cartCount` in dependencies, a visit is also logged on every cart change. What’s right?',
    },
    code: {
      lang: 'jsx',
      source: `useEffect(() => {
  logVisit(url, cartCount);
}, [url, cartCount]);`,
    },
    options: [
      { text: { ru: 'Убрать `cartCount` из зависимостей и выключить правило линтера', en: 'Remove `cartCount` from dependencies and disable the lint rule' } },
      {
        code: 'const onVisit = useEffectEvent((visitedUrl) => logVisit(visitedUrl, cartCount));\nuseEffect(() => {\n  onVisit(url);\n}, [url]);',
      },
      { code: 'const count = useRef(cartCount);\nuseEffect(() => logVisit(url, count.current), [url]);' },
      { text: { ru: 'Хранить `cartCount` в глобальной переменной', en: 'Keep `cartCount` in a global variable' } },
      { text: { ru: 'Вызывать `logVisit` прямо в рендере', en: 'Call `logVisit` directly during render' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useEffectEvent` (стабилен с React 19.2) выносит из эффекта «событийную» часть: она всегда видит свежие пропсы и состояние, но не является зависимостью. Эффект синхронизируется только по `url`, а `cartCount` читается на момент визита. Отключённое правило линтера прячет баги, а `useRef` с начальным значением застрянет на первом `cartCount`.',
          en: '`useEffectEvent` (stable since React 19.2) pulls the “event” part out of an effect: it always sees fresh props and state but isn’t a dependency. The effect syncs only on `url`, while `cartCount` is read at visit time. A disabled lint rule hides bugs, and a `useRef` with an initial value gets stuck on the first `cartCount`.',
        },
      },
    ],
    sources: [{ title: 'React — useEffectEvent', url: `${REFERENCE}/react/useEffectEvent` }],
  },
  {
    id: 'react-refs-imperative-001',
    topic: 'react',
    tags: ['refs'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Компонент `SearchInput` должен позволять родителю только поставить фокус, но не давать доступ ко всему DOM-узлу. Что использовать?',
      en: '`SearchInput` should let the parent only focus it, without exposing the whole DOM node. What do you use?',
    },
    options: [
      { text: { ru: 'Передать родителю DOM-узел через `ref` как есть', en: 'Pass the DOM node to the parent via `ref` as is' } },
      {
        code: 'useImperativeHandle(ref, () => ({\n  focus: () => inputRef.current.focus(),\n}));',
      },
      { code: 'window.searchInput = inputRef.current;' },
      { code: 'useEffect(() => inputRef.current.focus(), []);' },
      { text: { ru: 'Передавать функцию `focus` через контекст', en: 'Pass a `focus` function via context' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useImperativeHandle` подменяет то, что получит ref родителя: вместо DOM-узла — объект с нужными методами. Так компонент сохраняет инкапсуляцию: родитель не сможет менять стили или удалять узел, а внутреннюю разметку можно переделать. В React 19 `ref` приходит обычным пропсом, без `forwardRef`. Императивные методы — для фокуса, прокрутки, анимаций; данные передают пропсами.',
          en: '`useImperativeHandle` replaces what the parent’s ref receives: instead of the DOM node, an object with chosen methods. The component keeps encapsulation: the parent can’t change styles or remove the node, and the inner markup can be reworked. In React 19 `ref` arrives as a regular prop, no `forwardRef`. Imperative methods are for focus, scrolling, animations; data goes through props.',
        },
      },
    ],
    sources: [{ title: 'React — useImperativeHandle', url: `${REFERENCE}/react/useImperativeHandle` }],
  },
  {
    id: 'react-refs-callback-cleanup-001',
    topic: 'react',
    tags: ['refs', 'react-19'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Нужно подписать элемент на `IntersectionObserver`, когда он появляется в DOM, и отписать, когда исчезает. Как это сделать в React 19 без эффекта?',
      en: 'You need to observe an element with `IntersectionObserver` when it enters the DOM and stop when it leaves. How do you do it in React 19 without an effect?',
    },
    options: [
      { code: '<div ref={(node) => observer.observe(node)} />' },
      {
        code: '<div ref={(node) => {\n  observer.observe(node);\n  return () => observer.unobserve(node);\n}} />',
      },
      { code: '<div onMount={(node) => observer.observe(node)} />' },
      { code: '<div ref="observed" />' },
      { code: '<div ref={observer} />' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ref-колбэк вызывается, когда узел появляется в DOM. С React 19 он может вернуть **функцию очистки** — её React вызовет, когда узел исчезнет. Подписка и отписка оказываются рядом, как в эффекте, но привязаны к конкретному узлу, в том числе в списках. Без очистки старое поведение — повторный вызов с `null`, и его придётся обрабатывать вручную.',
          en: 'A ref callback is called when the node enters the DOM. Since React 19 it can return a **cleanup function**, which React calls when the node leaves. Subscribe and unsubscribe sit together like in an effect, but bound to a specific node, including in lists. Without cleanup, the legacy behavior is another call with `null`, which you’d have to handle manually.',
        },
      },
    ],
    sources: [{ title: 'React — ref callback function', url: `${REFERENCE}/react-dom/components/common#ref-callback` }],
  },
  {
    id: 'react-19-title-001',
    topic: 'react',
    tags: ['react-19'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Компонент страницы товара рендерит `<title>{product.name}</title>` внутри своей разметки. Что сделает React 19?',
      en: 'A product page component renders `<title>{product.name}</title>` inside its markup. What does React 19 do?',
    },
    options: [
      { text: { ru: 'Вставит `<title>` прямо в `<div>` страницы', en: 'Insert `<title>` right into the page `<div>`' } },
      {
        text: {
          ru: 'Перенесёт `<title>` в `<head>` документа, где бы он ни был в дереве',
          en: 'Move `<title>` into the document `<head>`, wherever it is in the tree',
        },
      },
      { text: { ru: 'Выдаст ошибку: `<title>` можно только в `index.html`', en: 'Throw an error: `<title>` is only allowed in `index.html`' } },
      { text: { ru: 'Проигнорирует тег', en: 'Ignore the tag' } },
      { text: { ru: 'Потребует библиотеку `react-helmet`', en: 'Require the `react-helmet` library' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'С React 19 теги метаданных — `<title>`, `<meta>`, `<link>` — можно рендерить в любом компоненте: React сам поднимает их в `<head>`, и при серверном рендеринге они попадают в HTML. Раньше для этого нужны были `react-helmet` или эффекты с `document.title`. Отображать стоит один `<title>` за раз — иначе поведение браузера неопределённо.',
          en: 'Since React 19 metadata tags — `<title>`, `<meta>`, `<link>` — can be rendered in any component: React hoists them into `<head>`, and with server rendering they land in the HTML. Previously this needed `react-helmet` or effects with `document.title`. Render only one `<title>` at a time — otherwise browser behavior is undefined.',
        },
      },
    ],
    sources: [{ title: 'React — <title>', url: `${REFERENCE}/react-dom/components/title` }],
  },
  {
    id: 'react-19-form-status-001',
    topic: 'react',
    tags: ['react-19', 'forms'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Кнопка `SubmitButton` должна блокироваться, пока форма отправляется. Где вызвать `useFormStatus()`?',
      en: '`SubmitButton` should be disabled while the form submits. Where do you call `useFormStatus()`?',
    },
    code: {
      lang: 'jsx',
      source: `function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Save</button>;
}`,
    },
    options: [
      { text: { ru: 'В компоненте, который рендерит `<form>`', en: 'In the component that renders `<form>`' } },
      {
        text: {
          ru: 'В дочернем компоненте, отрендеренном **внутри** `<form>`, — как `SubmitButton`',
          en: 'In a child component rendered **inside** the `<form>` — like `SubmitButton`',
        },
      },
      { text: { ru: 'В корневом компоненте приложения', en: 'In the app’s root component' } },
      { text: { ru: 'В любом месте — он отслеживает все формы страницы', en: 'Anywhere — it tracks all forms on the page' } },
      { text: { ru: 'Только в серверном компоненте', en: 'Only in a Server Component' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useFormStatus` читает состояние **родительской** формы, как будто форма — провайдер контекста. Поэтому его вызывают в компоненте, который находится внутри `<form>`, а в компоненте, который саму форму рендерит, он вернёт `pending: false`. Так кнопку отправки можно переиспользовать в любой форме без пропсов.',
          en: '`useFormStatus` reads the status of the **parent** form, as if the form were a context provider. So call it in a component inside the `<form>`; in the component that renders the form itself it returns `pending: false`. That lets you reuse the submit button in any form without props.',
        },
      },
    ],
    sources: [{ title: 'React — useFormStatus', url: `${REFERENCE}/react-dom/hooks/useFormStatus` }],
  },
  {
    id: 'react-19-activity-001',
    topic: 'react',
    tags: ['react-19', 'rendering'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Боковую панель прячут через `<Activity mode="hidden">` вместо условного рендера. Что происходит с ней, пока она скрыта?',
      en: 'A sidebar is hidden with `<Activity mode="hidden">` instead of conditional rendering. What happens to it while hidden?',
    },
    options: [
      { text: { ru: 'Размонтируется, состояние теряется', en: 'It unmounts, state is lost' } },
      {
        text: {
          ru: 'Скрывается через `display: none`, эффекты очищаются, а состояние и DOM сохраняются до следующего показа',
          en: 'It’s hidden with `display: none`, effects are cleaned up, while state and DOM are preserved until shown again',
        },
      },
      { text: { ru: 'Продолжает работать как видимая, включая эффекты', en: 'It keeps running like a visible one, effects included' } },
      { text: { ru: 'Удаляется из DOM, но эффекты продолжают работать', en: 'It’s removed from the DOM, but effects keep running' } },
      { text: { ru: 'Переносится в Web Worker', en: 'It moves to a Web Worker' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`<Activity>` (React 19.2) — альтернатива `{isOpen && <Sidebar />}`, которая не выбрасывает состояние. Скрытая часть остаётся в DOM с `display: none`, её эффекты очищаются (подписки и таймеры не работают в фоне), а при показе эффекты запускаются снова, и пользователь видит панель такой, какой оставил. Скрытые части ещё и можно заранее отрендерить с низким приоритетом.',
          en: '`<Activity>` (React 19.2) is an alternative to `{isOpen && <Sidebar />}` that doesn’t throw away state. The hidden part stays in the DOM with `display: none`, its effects are cleaned up (no background subscriptions or timers), and on show effects run again and the user sees the panel as they left it. Hidden parts can also be pre-rendered at low priority.',
        },
      },
    ],
    sources: [{ title: 'React — <Activity>', url: `${REFERENCE}/react/Activity` }],
  },
  {
    id: 'react-suspense-transition-001',
    topic: 'react',
    tags: ['suspense'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'При переключении вкладки уже показанный контент сменяется спиннером `<Suspense>`, пока грузится новая вкладка. Как оставить старую вкладку на экране до готовности новой?',
      en: 'When switching tabs, already visible content is replaced by the `<Suspense>` spinner while the new tab loads. How do you keep the old tab on screen until the new one is ready?',
    },
    options: [
      { text: { ru: 'Убрать `<Suspense>`', en: 'Remove `<Suspense>`' } },
      {
        code: "const [isPending, startTransition] = useTransition();\nstartTransition(() => setTab('reviews'));",
      },
      { code: "setTimeout(() => setTab('reviews'), 1000);" },
      { code: "flushSync(() => setTab('reviews'));" },
      { text: { ru: 'Показывать спиннер дольше', en: 'Show the spinner longer' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обновление внутри `startTransition` помечается как неважное: если новый контент приостанавливается, React продолжает показывать прежний вместо фолбэка, а `isPending` позволяет приглушить старую вкладку или показать маленький индикатор. Фолбэк `<Suspense>` по-прежнему появится при первой загрузке, когда показывать ещё нечего. Роутеры с поддержкой Suspense оборачивают навигацию в переходы сами.',
          en: 'An update inside `startTransition` is marked non-urgent: if the new content suspends, React keeps showing the previous one instead of the fallback, and `isPending` lets you dim the old tab or show a small indicator. The `<Suspense>` fallback still appears on first load, when there’s nothing to show yet. Suspense-enabled routers wrap navigation in transitions themselves.',
        },
      },
    ],
    sources: [{ title: 'React — useTransition: preventing unwanted loading indicators', url: `${REFERENCE}/react/useTransition` }],
  },
  {
    id: 'react-keys-003',
    topic: 'react',
    tags: ['keys'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В списке задач используют `key={Math.random()}`. Что пойдёт не так?',
      en: 'A todo list uses `key={Math.random()}`. What goes wrong?',
    },
    options: [
      { text: { ru: 'Ничего: ключи уникальны', en: 'Nothing: the keys are unique' } },
      {
        text: {
          ru: 'Ключи меняются при каждом рендере: React пересоздаёт все элементы, сбрасывая их состояние и фокус, и теряет производительность',
          en: 'Keys change on every render: React recreates every item, resetting their state and focus, and loses performance',
        },
      },
      { text: { ru: 'React выдаст ошибку о дубликатах ключей', en: 'React throws a duplicate key error' } },
      { text: { ru: 'Список отсортируется случайно', en: 'The list sorts randomly' } },
      { text: { ru: 'Ключ не может быть числом', en: 'A key can’t be a number' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ключ говорит React, что элемент в этом рендере — **тот же самый**, что в прошлом. Случайный ключ меняется каждый раз, и React считает все элементы новыми: размонтирует старые, создаёт новые, состояние полей и фокус пропадают. Ключ должен быть стабильным и уникальным среди соседей — обычно id из данных; генерировать его стоит при создании записи, а не при рендере.',
          en: 'A key tells React an item in this render is **the same one** as last time. A random key changes every time, so React treats every item as new: unmounts the old ones, creates new ones, and input state and focus vanish. A key must be stable and unique among siblings — usually an id from the data; generate it when the record is created, not during render.',
        },
      },
    ],
    sources: [{ title: 'React — Rendering Lists: keeping list items in order with key', url: `${LEARN}/rendering-lists` }],
  },
  {
    id: 'react-forms-002',
    topic: 'react',
    tags: ['forms'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: '`<input value={name} />` без `onChange`: пользователь печатает, а текст не меняется. Что сделать, если поле не нужно контролировать?',
      en: '`<input value={name} />` without `onChange`: the user types, but the text doesn’t change. What if the field doesn’t need to be controlled?',
    },
    options: [
      { code: '<input value={name} readOnly={false} />' },
      { code: '<input defaultValue={name} />' },
      { code: '<input value={name} key={name} />' },
      { code: '<input value={name ?? ""} />' },
      { code: '<input value={name} disabled />' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`value` делает поле **контролируемым**: React каждый раз выставляет ему значение из состояния, и без `onChange` ввод откатывается (React ещё и предупредит). Если нужно лишь задать начальный текст, а дальше пусть браузер хранит ввод сам, используют `defaultValue` — значение потом читают из формы или через `FormData`. Контролируемое поле нужно, когда значение надо проверять или менять на лету.',
          en: '`value` makes the field **controlled**: React sets it from state every time, and without `onChange` input reverts (React also warns). If you only need an initial text and let the browser keep the input, use `defaultValue` — read the value later from the form or via `FormData`. A controlled field is needed when the value must be validated or changed on the fly.',
        },
      },
    ],
    sources: [{ title: 'React — <input>', url: `${REFERENCE}/react-dom/components/input` }],
  },
];
