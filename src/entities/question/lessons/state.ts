import type { Lesson } from '../model/types';

const REACT = 'https://react.dev/learn';
const REDUX = 'https://redux.js.org';
const QUERY = 'https://tanstack.com/query/latest/docs/framework/react/guides';
const MDN = 'https://developer.mozilla.org/en-US/docs';

export const STATE_LESSONS: Lesson[] = [
  {
    tag: 'state-basics',
    format: 'steps',
    summary: {
      ru: 'Состояние бывает локальным, общим, серверным и в URL. Главный вопрос — не «какую библиотеку взять», а где у каждого кусочка данных источник правды.',
      en: 'State can be local, shared, server or in the URL. The main question isn’t “which library” but where each piece of data has its source of truth.',
    },
    steps: [
      {
        id: 'kinds',
        title: { ru: 'Четыре вида состояния', en: 'Four kinds of state' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Локальное** нужно одному компоненту: открыта ли модалка, текст в поле. **Общее клиентское** — тема, корзина, авторизация — держат в контексте или сторе. **Серверное** — списки и профиль из API — лишь копия данных сервера: она устаревает, её кэшируют и обновляют через TanStack Query, а не в глобальном сторе. **URL** хранит то, чем делятся ссылкой: фильтры, страницу. Личную настройку вроде темы сохраняют в `localStorage` и читают при старте: `sessionStorage` живёт лишь до закрытия вкладки.',
              en: '**Local** state belongs to one component: is the modal open, the input text. **Shared client** state — theme, cart, auth — goes in context or a store. **Server** state — lists and profile from the API — is only a copy of server data: it goes stale, so it is cached and refreshed with TanStack Query, not kept in a global store. The **URL** holds what you share as a link: filters, the page. A personal setting like the theme is saved in `localStorage` and read on start: `sessionStorage` lives only until the tab closes.',
            },
          },
          {
            type: 'illustration',
            illustration: 'state-kinds',
            caption: { ru: 'У каждого вида свой источник правды', en: 'Each kind has its own source of truth' },
          },
        ],
        test: ['state-basics-001'],
      },
      {
        id: 'colocation',
        title: { ru: 'Держите состояние рядом', en: 'Keep state close' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Состояние держат как можно ближе к месту, где оно используется. Флаг «открыто ли окно удаления» нужен одной кнопке — значит, это `useState` в ней. Положите его в глобальный стор — получите лишний шаблонный код и свяжете части приложения, которым незачем знать друг о друге. Поднимать состояние выше стоит, только когда оно понадобилось кому-то ещё.',
              en: 'Keep state as close as possible to where it is used. The “is the delete dialog open” flag is needed by one button — so it is a `useState` inside it. Put it in a global store and you get extra boilerplate and couple parts of the app that have no reason to know about each other. Lift state higher only when someone else needs it.',
            },
          },
          { type: 'diagram', diagram: 'state-colocation' },
        ],
        test: ['state-basics-002'],
      },
      {
        id: 'lifting',
        title: { ru: 'Подъём состояния', en: 'Lifting state up' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Фильтру и списку по соседству нужна выбранная категория. Состояние поднимают в **ближайший общий родитель**: он хранит `category` и передаёт вниз значение и функцию изменения. Так у данных [[single-source-of-truth|один источник правды]]. Две копии, которые синхронизируют через `useEffect`, дают лишние рендеры и рано или поздно расходятся. Глобальный стор для двух соседей избыточен, а переменная модуля не вызовет перерисовку.',
              en: 'A filter and a list next to it both need the selected category. Lift the state into the **closest common parent**: it holds `category` and passes down the value and a setter. The data then has [[single-source-of-truth|one source of truth]]. Two copies synced with `useEffect` cause extra renders and sooner or later drift apart. A global store is overkill for two siblings, and a module variable won’t trigger a re-render.',
            },
          },
          { type: 'diagram', diagram: 'state-lifting' },
          {
            type: 'check',
            check: {
              id: 'module-variable',
              prompt: {
                ru: 'Почему общую категорию нельзя хранить в переменной модуля `let category`?',
                en: 'Why can’t the shared category live in a module variable `let category`?',
              },
              options: [
                { text: { ru: 'React запрещает переменные на уровне модуля', en: 'React forbids module-level variables' } },
                { text: { ru: 'Её изменение не вызывает перерисовку компонентов', en: 'Changing it doesn’t re-render components' } },
                { text: { ru: 'Переменная модуля медленнее `useState`', en: 'A module variable is slower than `useState`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'React перерисовывает компонент, когда меняются его состояние, пропсы или контекст. Присваивание переменной модуля он не замечает — на экране останется старая категория.',
                en: 'React re-renders a component when its state, props or context change. It doesn’t notice an assignment to a module variable — the screen keeps showing the old category.',
              },
            },
          },
        ],
        test: ['state-basics-009'],
      },
      {
        id: 'prop-drilling',
        title: { ru: 'Проп-дриллинг и композиция', en: 'Prop drilling and composition' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '[[prop-drilling|Проп-дриллинг]] — когда проп идёт через компоненты, которым он не нужен, лишь бы добраться до глубокого потомка. Первое лекарство — **композиция**: родитель, у которого есть данные, сам собирает `<Avatar user={user} />` и передаёт его вниз через `children` или проп-слот. Промежуточные компоненты просто рендерят слот. Контекст нужен, когда данные читают многие компоненты на разной глубине, а стор — когда состояние сложное и часто меняется.',
              en: '[[prop-drilling|Prop drilling]] is when a prop passes through components that don’t need it just to reach a deep child. The first cure is **composition**: the parent that has the data builds `<Avatar user={user} />` itself and passes it down via `children` or a slot prop. The components in between just render the slot. Context is for data read by many components at different depths; a store is for complex, frequently changing state.',
            },
          },
          { type: 'diagram', diagram: 'state-prop-drilling' },
          {
            type: 'code',
            code: {
              lang: 'tsx',
              source: 'function App() {\n  const user = useUser();\n  return (\n    <Layout>\n      <Sidebar>\n        <Avatar user={user} />\n      </Sidebar>\n    </Layout>\n  );\n}',
            },
            caption: { ru: '`Layout` и `Sidebar` ничего не знают о `user`', en: '`Layout` and `Sidebar` know nothing about `user`' },
          },
        ],
        test: ['state-basics-004'],
      },
      {
        id: 'single-source',
        title: { ru: 'Id вместо копии', en: 'An id, not a copy' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Список товаров приходит с сервера, пользователь выбирает один. Храните `selectedId`, а сам товар находите в списке. Копия объекта — дублирование: список обновится, цена изменится, а копия останется старой. Индекс сломается при сортировке или удалении, а название не уникально. На том же стоит [[normalization|нормализация]]: сущности лежат таблицей `{ byId, allIds }`, у каждой одна копия — её обновляют в одном месте и находят по id за O(1).',
              en: 'The product list comes from the server, and the user picks one. Store `selectedId` and look the product up in the list. An object copy is duplication: the list refreshes, the price changes, and the copy stays stale. An index breaks on sorting or deletion, and a name isn’t unique. [[normalization|Normalization]] rests on the same idea: entities live in a `{ byId, allIds }` table, each stored once — updated in one place and found by id in O(1).',
            },
          },
          {
            type: 'illustration',
            illustration: 'state-id-vs-copy',
            caption: { ru: 'Копия устаревает, id — нет', en: 'A copy goes stale, an id doesn’t' },
          },
          {
            type: 'check',
            check: {
              id: 'index-after-sort',
              prompt: {
                ru: 'Выбор хранится как индекс `selectedIndex`. Список отсортировали по цене. Что произойдёт?',
                en: 'The selection is stored as an index, `selectedIndex`. The list gets sorted by price. What happens?',
              },
              options: [
                { text: { ru: 'Выбранным останется тот же товар', en: 'The same product stays selected' } },
                { text: { ru: 'React выбросит ошибку', en: 'React throws an error' } },
                { text: { ru: 'Выбранным окажется другой товар', en: 'A different product becomes selected' } },
              ],
              answer: 2,
              explanation: {
                ru: 'Индекс — это позиция, а не товар. После сортировки на той же позиции стоит уже другой товар, и выбор незаметно «переедет». `id` от позиции не зависит.',
                en: 'An index is a position, not a product. After sorting, that position holds a different product, and the selection silently moves. An `id` doesn’t depend on position.',
              },
            },
          },
        ],
        test: ['state-basics-003'],
      },
      {
        id: 'derived',
        title: { ru: 'Производное не храните', en: 'Don’t store derived values' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Всё, что вычисляется из имеющегося состояния, хранить не нужно. Полное имя — это `firstName` и `lastName`, сумма корзины — это `items`. Отдельное поле — второй источник правды: добавили товар, забыли обновить сумму — и данные разошлись. Синхронизация через `useEffect` ещё и даёт лишний рендер со старым значением. Считайте при рендере, а дорогие вычисления кешируйте через `useMemo`, а не через отдельный стейт.',
              en: 'Anything computable from existing state doesn’t need storing. A full name is `firstName` plus `lastName`; a cart total comes from `items`. A separate field is a second source of truth: add an item, forget to update the total — and the data drifts apart. Syncing with `useEffect` also costs an extra render with the stale value. Compute during render, and cache expensive work with `useMemo`, not with extra state.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'let cart = { items: [5], count: 1 };\ncart = { ...cart, items: [5, 7] };\n\nconsole.log(cart.count); // 1 — stale\nconsole.log(cart.items.length); // 2',
            },
            caption: {
              ru: 'Поле `count` забыли обновить, вычисленное значение верно',
              en: 'The `count` field was not updated; the computed value is right',
            },
          },
        ],
        test: ['state-basics-008', 'state-basics-006'],
      },
    ],
    keyPoints: [
      { ru: 'Локальное — в компоненте; общее — в ближайшем родителе, контексте или сторе.', en: 'Local state stays in the component; shared state goes to the closest parent, context or a store.' },
      { ru: 'Серверное состояние — кэш, а не глобальный стор.', en: 'Server state is a cache, not a global store.' },
      { ru: 'Проп-дриллинг сначала лечат композицией через `children`.', en: 'Try composition via `children` before anything else for prop drilling.' },
      { ru: 'Один источник правды: id вместо копии, производное — вычислять.', en: 'One source of truth: an id instead of a copy, derived values are computed.' },
    ],
    sources: [
      { title: 'React — Choosing the State Structure', url: `${REACT}/choosing-the-state-structure` },
      { title: 'React — Sharing State Between Components', url: `${REACT}/sharing-state-between-components` },
      { title: 'React — Passing Data Deeply with Context', url: `${REACT}/passing-data-deeply-with-context` },
      { title: 'TanStack Query — Important Defaults', url: `${QUERY}/important-defaults` },
    ],
  },
  {
    tag: 'state-immutability',
    format: 'steps',
    summary: {
      ru: 'React и большинство сторов замечают изменения по ссылке. Поэтому состояние не мутируют, а создают новые объекты — только на пути к изменённому месту.',
      en: 'React and most stores detect changes by reference. So state isn’t mutated; new objects are created — only along the path to what changed.',
    },
    steps: [
      {
        id: 'references',
        title: { ru: 'Изменения видят по ссылке', en: 'Changes are seen by reference' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'React, Redux и селекторы не сравнивают объекты поле за полем, а проверяют ссылку через `Object.is`. Если изменить объект на месте и передать его снова, ссылка та же: для React «ничего не изменилось», и рендер пропускается, хотя данные другие. Поэтому состояние [[immutability|не мутируют]], а создают новый объект: `setState({ ...state, count: 2 })`. И помните: `const next = state` — не копия, а вторая ссылка на тот же объект.',
              en: 'React, Redux and selectors don’t compare objects field by field; they check the reference with `Object.is`. Change an object in place and pass it again, and the reference is the same: for React “nothing changed”, so the render is skipped even though the data differs. That’s why state is [[immutability|never mutated]]; a new object is created instead: `setState({ ...state, count: 2 })`. And remember: `const next = state` isn’t a copy, just a second reference to the same object.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: '// ✗ same array: render is skipped\ntodos.push(todo);\nsetTodos(todos);\n\n// ✓ new array: component re-renders\nsetTodos([...todos, todo]);',
            },
          },
          {
            type: 'check',
            check: {
              id: 'set-same-object',
              prompt: {
                ru: 'Компонент делает `user.name = \'Bob\'` и вызывает `setUser(user)`. Что будет?',
                en: 'A component runs `user.name = \'Bob\'` and calls `setUser(user)`. What happens?',
              },
              options: [
                { text: { ru: 'React перерисует компонент с новым именем', en: 'React re-renders the component with the new name' } },
                { text: { ru: 'React выбросит ошибку о мутации', en: 'React throws a mutation error' } },
                { text: { ru: 'React пропустит рендер: ссылка та же', en: 'React skips the render: same reference' } },
              ],
              answer: 2,
              explanation: {
                ru: '`setUser` получил тот же объект, `Object.is` вернул `true`, и React решил, что состояние не изменилось. Нужен новый объект: `setUser({ ...user, name: \'Bob\' })`.',
                en: '`setUser` got the same object, `Object.is` returned `true`, and React decided the state hadn’t changed. Pass a new object: `setUser({ ...user, name: \'Bob\' })`.',
              },
            },
          },
        ],
        test: ['state-immutability-008'],
      },
      {
        id: 'shallow-copy',
        title: { ru: 'Спред копирует один уровень', en: 'A spread copies one level' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`{ ...state }` — [[shallow-copy|поверхностная копия]]: новый объект только верхнего уровня. Вложенные объекты и массивы копируются **по ссылке** и остаются общими с оригиналом. Поэтому `next.user.name = \'Bob\'` меняет и `state.user.name`, хотя сами `state` и `next` — разные объекты. Копируйте каждый уровень на пути к изменению. Так же мелко работает `Object.freeze`: заменить `state.user` нельзя, а поменять поле внутри `user` или сделать `push` во вложенный массив — можно.',
              en: '`{ ...state }` is a [[shallow-copy|shallow copy]]: a new object only at the top level. Nested objects and arrays are copied **by reference** and stay shared with the original. So `next.user.name = \'Bob\'` changes `state.user.name` too, even though `state` and `next` themselves are different objects. Copy every level along the path to the change. `Object.freeze` is just as shallow: you can’t replace `state.user`, but you can change a field inside `user` or `push` into a nested array.',
            },
          },
          {
            type: 'illustration',
            illustration: 'imm-shared-reference',
            caption: { ru: 'Спред создал новый объект, но `user` у них общий', en: 'The spread made a new object, but `user` is shared' },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const next = {\n  ...state,\n  user: { ...state.user, name },\n};',
            },
            caption: { ru: 'Новый `user` — новая ссылка и на этом уровне', en: 'A new `user` gives a new reference at this level too' },
          },
        ],
        test: ['state-immutability-001', 'state-immutability-004'],
      },
      {
        id: 'structural-sharing',
        title: { ru: 'Структурное разделение', en: 'Structural sharing' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Новые объекты создают только **на пути к изменению**, а всё остальное переиспользуют по ссылке. Чтобы отметить задачу выполненной, нужны новое состояние, новый массив через `map` и новая задача `{ ...todo, done: true }`, а остальные задачи остаются теми же объектами. Тогда `memo`-компоненты и селекторы видят, что поменялось только одно. Менять `todo.done` внутри `map`, писать по индексу в старый массив или вызывать `Object.assign(state, …)` нельзя — это мутация исходных данных.',
              en: 'New objects are created only **along the path to the change**; everything else is reused by reference. To complete a task you need a new state, a new array from `map` and a new task `{ ...todo, done: true }`, while the other tasks stay the same objects. Then `memo` components and selectors see that only one thing changed. Changing `todo.done` inside `map`, writing by index into the old array or calling `Object.assign(state, …)` is off limits — that mutates the original data.',
            },
          },
          { type: 'diagram', diagram: 'imm-structural-sharing' },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const todos = state.todos.map((todo) =>\n  todo.id === id\n    ? { ...todo, done: true }\n    : todo,\n);\nconst next = { ...state, todos };',
            },
            caption: { ru: 'Новая только изменённая задача', en: 'Only the changed task is new' },
          },
        ],
        test: ['state-immutability-002', 'state-immutability-005'],
      },
      {
        id: 'array-methods',
        title: { ru: 'Мутирующие методы массивов', en: 'Mutating array methods' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`push`, `splice`, `sort`, `reverse`, `delete arr[i]` и запись `arr[i] = x` меняют сам массив. Причём `sort` и `reverse` возвращают **тот же** массив — «отсортированная копия» оказывается самим состоянием. Новый массив дают `[...arr, x]`, `filter`, `map`, `slice`, `concat` и методы ES2023 `toSorted`, `toReversed`, `toSpliced`, `with`. Можно и скопировать перед сортировкой: `[...items].sort()`. А `const copy = todos` копирует только ссылку.',
              en: '`push`, `splice`, `sort`, `reverse`, `delete arr[i]` and `arr[i] = x` change the array itself. Moreover, `sort` and `reverse` return **the same** array — the “sorted copy” turns out to be the state itself. A new array comes from `[...arr, x]`, `filter`, `map`, `slice`, `concat` and the ES2023 methods `toSorted`, `toReversed`, `toSpliced`, `with`. Or copy before sorting: `[...items].sort()`. And `const copy = todos` copies only the reference.',
            },
          },
          {
            type: 'illustration',
            illustration: 'imm-array-methods',
          },
          {
            type: 'check',
            check: {
              id: 'copy-is-reference',
              prompt: {
                ru: 'После `const copy = todos; copy.push(task);` что стало с `todos`?',
                en: 'After `const copy = todos; copy.push(task);` what happened to `todos`?',
              },
              options: [
                { text: { ru: 'В нём тоже новая задача — это один массив', en: 'It has the new task too — it’s one array' } },
                { text: { ru: 'Не изменился: `copy` — копия', en: 'Unchanged: `copy` is a copy' } },
                { text: { ru: 'Ошибка: `const` нельзя менять', en: 'Error: a `const` can’t change' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Присваивание копирует ссылку, а не массив. `const` запрещает переприсвоить переменную, но не менять сам массив. Нужна копия: `[...todos, task]`.',
                en: 'Assignment copies the reference, not the array. `const` forbids reassigning the variable, not changing the array itself. Make a copy: `[...todos, task]`.',
              },
            },
          },
        ],
        test: ['state-immutability-006', 'state-immutability-007'],
      },
      {
        id: 'immer-and-clone',
        title: { ru: 'Immer и глубокая копия', en: 'Immer and deep copies' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Immer даёт функции **черновик**: вы «мутируете» его, а `produce` собирает новое неизменяемое состояние и переиспользует нетронутые части. Если черновик не меняли, `produce` вернёт исходный объект — ту же ссылку, и подписчики не перерисуются. Так устроены редьюсеры `createSlice`. Глубокую копию делает `structuredClone`: сохраняет `Date`, `Map`, `Set`, но на функции бросает `DataCloneError` и стоит дороже точечных обновлений. Снимки для «Отменить» работают, только если состояние обновляют иммутабельно.',
              en: 'Immer hands your function a **draft**: you “mutate” it, and `produce` builds a new immutable state, reusing the untouched parts. If the draft wasn’t changed, `produce` returns the original object — the same reference, so subscribers don’t re-render. That’s how `createSlice` reducers work. `structuredClone` makes a deep copy: it keeps `Date`, `Map`, `Set`, but throws `DataCloneError` on functions and costs more than targeted updates. Undo snapshots work only if state is updated immutably.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const next = produce(state, (draft) => {\n  draft.todos[1].done = true;\n});\n\nnext === state; // false\nnext.todos[0] === state.todos[0];\n// → true: unchanged task is reused',
            },
            caption: { ru: 'Черновик меняют, оригинал не трогается', en: 'The draft changes, the original stays intact' },
          },
        ],
        test: ['state-immutability-011'],
      },
    ],
    keyPoints: [
      { ru: 'Изменения определяют по ссылке — мутация незаметна.', en: 'Changes are detected by reference — mutation goes unnoticed.' },
      { ru: 'Спред и `Object.freeze` работают только на верхнем уровне.', en: 'Spread and `Object.freeze` work only at the top level.' },
      { ru: 'Новые объекты — только на пути к изменению, остальное по ссылке.', en: 'New objects only along the path to the change; the rest by reference.' },
      { ru: '`sort` и `reverse` мутируют — берите `toSorted` и `toReversed`.', en: '`sort` and `reverse` mutate — use `toSorted` and `toReversed`.' },
    ],
    sources: [
      { title: 'React — Updating Objects in State', url: `${REACT}/updating-objects-in-state` },
      { title: 'React — Updating Arrays in State', url: `${REACT}/updating-arrays-in-state` },
      { title: 'Redux — Immutable Update Patterns', url: `${REDUX}/usage/structuring-reducers/immutable-update-patterns` },
      { title: 'Immer — Introduction', url: 'https://immerjs.github.io/immer/' },
    ],
  },
  {
    tag: 'state-redux',
    format: 'steps',
    summary: {
      ru: 'Redux — одно хранилище, изменения только через действия и чистые редьюсеры. Redux Toolkit убирает шаблонный код и позволяет «мутировать» черновик через Immer.',
      en: 'Redux is a single store where changes happen only through actions and pure reducers. Redux Toolkit removes boilerplate and lets you “mutate” a draft via Immer.',
    },
    steps: [
      {
        id: 'data-flow',
        title: { ru: 'Поток данных', en: 'The data flow' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В Redux всё состояние приложения лежит в одном сторе и меняется только через **действия**. Компонент вызывает `dispatch(action)`: действие описывает, что произошло, а не как менять данные. Middleware может перехватить его по пути, затем **редьюсер** по старому состоянию и действию вычисляет новое. Стор уведомляет подписчиков, и `useSelector` перерисовывает только компоненты, чьи выбранные данные изменились. Поток всегда идёт в одну сторону.',
              en: 'In Redux, all app state lives in one store and changes only through **actions**. A component calls `dispatch(action)`: the action describes what happened, not how to change data. Middleware may intercept it on the way, then the **reducer** computes the new state from the old state and the action. The store notifies subscribers, and `useSelector` re-renders only the components whose selected data changed. The flow always goes one way.',
            },
          },
          { type: 'diagram', diagram: 'redux-data-flow' },
        ],
        test: ['state-redux-001'],
      },
      {
        id: 'pure-reducers',
        title: { ru: 'Редьюсер — чистая функция', en: 'A reducer is a pure function' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Редьюсер получает состояние и действие и возвращает новое состояние. Он [[pure-function|чистый]]: одинаковый вход — одинаковый результат, без запросов, таймеров, `Math.random`, `Date.now()` и `crypto.randomUUID()`. Случайные id и время вычисляют до диспатча — в action creator. Каждое действие проходит через **все** редьюсеры, поэтому для незнакомого действия редьюсер обязан вернуть текущее состояние. Иначе он вернёт `undefined` и затрёт свои данные.',
              en: 'A reducer takes the state and an action and returns the new state. It’s [[pure-function|pure]]: the same input gives the same result, with no requests, timers, `Math.random`, `Date.now()` or `crypto.randomUUID()`. Random ids and timestamps are computed before dispatch — in the action creator. Every action goes through **all** reducers, so for an unknown action a reducer must return the current state. Otherwise it returns `undefined` and wipes its data.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "function counter(state = 0, action) {\n  switch (action.type) {\n    case 'inc':\n      return state + 1;\n    default:\n      return state;\n  }\n}",
            },
            caption: { ru: 'Без `default` чужое действие вернёт `undefined`', en: 'Without `default`, another action returns `undefined`' },
          },
        ],
        test: ['state-redux-005', 'state-redux-006'],
      },
      {
        id: 'slices',
        title: { ru: 'Срезы и combineReducers', en: 'Slices and combineReducers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Большое состояние делят на **срезы** — `counter`, `user`, `todos`, у каждого свой редьюсер. `combineReducers` собирает из них корневой: он вызывает каждый вложенный редьюсер со **своим кусочком** состояния и с **каждым** действием. Срез сам решает, реагировать ли, а на чужое действие возвращает прежнее значение. При первом вызове кусочек равен `undefined`, и срабатывает значение по умолчанию. Поэтому одно действие может обновить сразу несколько срезов.',
              en: 'Large state is split into **slices** — `counter`, `user`, `todos`, each with its own reducer. `combineReducers` builds a root reducer from them: it calls every nested reducer with **its own piece** of state and with **every** action. A slice decides whether to react and returns its previous value for others’ actions. On the first call the piece is `undefined`, so the default value kicks in. That’s why one action can update several slices at once.',
            },
          },
          { type: 'diagram', diagram: 'redux-combine' },
          {
            type: 'check',
            check: {
              id: 'action-reaches-slices',
              prompt: {
                ru: 'В корневой редьюсер пришло действие `user/loggedIn`. Какие срезы его получат?',
                en: 'The root reducer receives `user/loggedIn`. Which slices get it?',
              },
              options: [
                { text: { ru: 'Только срез `user`', en: 'Only the `user` slice' } },
                { text: { ru: 'Все срезы', en: 'Every slice' } },
                { text: { ru: 'Ни один — сначала нужен middleware', en: 'None — middleware is needed first' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Корневой редьюсер вызывает каждый срез с каждым действием. Префикс `user/` — лишь соглашение об именах: остальные срезы тоже получат действие и вернут прежнее состояние.',
                en: 'The root reducer calls every slice with every action. The `user/` prefix is just a naming convention: the other slices get the action too and return their previous state.',
              },
            },
          },
        ],
        test: ['state-redux-007'],
      },
      {
        id: 'middleware',
        title: { ru: 'Middleware и thunk', en: 'Middleware and thunks' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Middleware оборачивают `dispatch` как луковица: первый в списке — внешний слой. Действие проходит `a` → `b` → редьюсер, а код после `next(action)` выполняется на обратном пути — сначала в `b`, потом в `a`. **Thunk** — middleware для асинхронности: если вместо объекта пришла функция, он вызывает её с `dispatch` и `getState`, а в редьюсер она не попадает. Внутри делают запрос к API и диспатчат обычные действия `pending`, `fulfilled`, `rejected` — так устроен `createAsyncThunk`.',
              en: 'Middleware wrap `dispatch` like an onion: the first in the list is the outer layer. An action goes `a` → `b` → reducer, and the code after `next(action)` runs on the way back — first in `b`, then in `a`. A **thunk** is middleware for async work: if a function arrives instead of an object, it calls it with `dispatch` and `getState`, and the function never reaches the reducer. Inside, you call the API and dispatch plain `pending`, `fulfilled`, `rejected` actions — that’s how `createAsyncThunk` works.',
            },
          },
          { type: 'diagram', diagram: 'redux-middleware-onion' },
        ],
        test: ['state-redux-002', 'state-redux-010'],
      },
      {
        id: 'toolkit',
        title: { ru: 'Redux Toolkit', en: 'Redux Toolkit' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`createSlice` по одному описанию генерирует действия и редьюсер. Внутри можно писать `state.push(item)`: редьюсер получает черновик Immer, и тот собирает новое неизменяемое состояние. Вне `createSlice` мутации по-прежнему запрещены. Для нормализованных коллекций есть `createEntityAdapter`, а серверные данные удобнее отдать RTK Query: кеш, дедупликация запросов и инвалидация по тегам без ручных флагов `loading` и `error`.',
              en: '`createSlice` generates actions and a reducer from one description. Inside, you can write `state.push(item)`: the reducer gets an Immer draft, which builds a new immutable state. Outside `createSlice`, mutation is still forbidden. Normalized collections have `createEntityAdapter`, and server data is better left to RTK Query: caching, request deduplication and tag invalidation without hand-written `loading` and `error` flags.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const todos = createSlice({\n  name: 'todos',\n  initialState: [],\n  reducers: {\n    added(state, action) {\n      state.push(action.payload);\n    },\n  },\n});",
            },
            caption: { ru: '«Мутация» черновика превращается в новое состояние', en: 'A draft “mutation” becomes a new state' },
          },
        ],
        test: ['state-redux-003'],
      },
      {
        id: 'selectors',
        title: { ru: 'Селекторы и перерисовки', en: 'Selectors and re-renders' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`useSelector` вызывает селектор после **каждого** действия и сравнивает результат с прошлым через `===`. Если селектор строит данные через `filter` или `map`, он каждый раз возвращает новый массив: сравнение «не равно», и компонент перерисовывается при любом действии в сторе. Решение — [[memoization|мемоизированный]] селектор `createSelector`: он пересчитывает результат, только когда изменились входные данные, а иначе возвращает прежний массив.',
              en: '`useSelector` calls the selector after **every** action and compares the result with the previous one using `===`. If the selector builds data with `filter` or `map`, it returns a new array every time: the comparison says “not equal”, and the component re-renders on any action in the store. The fix is a [[memoization|memoized]] selector, `createSelector`: it recomputes only when its inputs change and otherwise returns the previous array.',
            },
          },
          {
            type: 'illustration',
            illustration: 'redux-selector-new-array',
            caption: { ru: 'Сверху новая ссылка после каждого действия, снизу — прежняя', en: 'Top: a new reference after every action; bottom: the same one' },
          },
          {
            type: 'check',
            check: {
              id: 'primitive-selector',
              prompt: {
                ru: 'Селектор `(state) => state.user.name` возвращает строку. Перерисуется ли компонент после чужого действия?',
                en: 'The selector `(state) => state.user.name` returns a string. Will the component re-render after an unrelated action?',
              },
              options: [
                { text: { ru: 'Да, `useSelector` перерисовывает при любом действии', en: 'Yes, `useSelector` re-renders on any action' } },
                { text: { ru: 'Нет: строка та же, `===` вернёт `true`', en: 'No: the string is the same, `===` returns `true`' } },
                { text: { ru: 'Да: строки сравниваются по ссылке', en: 'Yes: strings are compared by reference' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Примитивы сравниваются по значению. Имя не изменилось — результат селектора равен прошлому, и рендера не будет. Проблема только у селекторов, которые каждый раз создают новый объект или массив.',
                en: 'Primitives are compared by value. The name didn’t change, so the selector result equals the previous one and there’s no render. Only selectors that create a new object or array every time have this problem.',
              },
            },
          },
        ],
        test: ['state-redux-004'],
      },
    ],
    keyPoints: [
      { ru: 'action → middleware → reducer → подписчики → UI.', en: 'action → middleware → reducer → subscribers → UI.' },
      { ru: 'Редьюсер чистый и на чужие действия возвращает state.', en: 'A reducer is pure and returns state for others’ actions.' },
      { ru: 'Каждое действие получают все срезы.', en: 'Every slice receives every action.' },
      { ru: 'Асинхронность — в thunk, «мутации» — только в `createSlice`.', en: 'Async work goes in thunks; “mutations” only in `createSlice`.' },
      { ru: '`filter` и `map` в селекторе — через `createSelector`.', en: '`filter` and `map` in a selector — via `createSelector`.' },
    ],
    sources: [
      { title: 'Redux — Concepts and Data Flow', url: `${REDUX}/tutorials/fundamentals/part-2-concepts-data-flow` },
      { title: 'Redux — Writing Reducers', url: `${REDUX}/tutorials/fundamentals/part-3-state-actions-reducers` },
      { title: 'Redux — Writing Logic with Thunks', url: `${REDUX}/usage/writing-logic-thunks` },
      { title: 'Redux Toolkit — Writing Reducers with Immer', url: 'https://redux-toolkit.js.org/usage/immer-reducers' },
      { title: 'Redux — Deriving Data with Selectors', url: `${REDUX}/usage/deriving-data-selectors` },
    ],
  },
  {
    tag: 'state-stores',
    summary: {
      ru: 'Лёгкие сторы (Zustand, Effector, MobX) решают ту же задачу проще Redux. Производительность зависит от того, на какую часть стора подписан компонент.',
      en: 'Lightweight stores (Zustand, Effector, MobX) solve the same problem more simply than Redux. Performance depends on which part of the store a component subscribes to.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Глобальный стор нужен, когда одни данные читают и меняют компоненты в разных частях дерева: передавать их пропсами через пять уровней неудобно, а контекст перерисовывает всех потребителей при любом изменении значения.',
          en: 'A global store is needed when components in different parts of the tree read and change the same data: passing it through five levels of props is awkward, and context re-renders every consumer on any value change.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Подписывайтесь **селектором** на нужный кусок: `useStore((s) => s.count)` перерисует компонент только при смене `count`, а `useStore()` без селектора — при любом изменении стора. Селектор, возвращающий новый объект или массив, для этого сравнивают поверхностно (`useShallow`) или [[memoization|мемоизируют]].',
          en: 'Subscribe with a **selector** to the piece you need: `useStore((s) => s.count)` re-renders only when `count` changes, while `useStore()` without a selector re-renders on any store change. A selector returning a new object or array is compared shallowly (`useShallow`) or [[memoization|memoized]].',
        },
      },
    ],
    keyPoints: [
      { ru: 'Стор — когда одни данные нужны далёким компонентам.', en: 'A store — when distant components need the same data.' },
      { ru: 'Подписка селектором на нужный кусок.', en: 'Subscribe with a selector to the needed piece.' },
      { ru: 'Новый объект из селектора — `useShallow` или мемоизация.', en: 'A new object from a selector — `useShallow` or memoization.' },
    ],
    sources: [
      { title: 'Zustand — documentation', url: 'https://zustand.docs.pmnd.rs/' },
      { title: 'Effector — Core concepts', url: 'https://effector.dev/en/introduction/core-concepts/' },
      { title: 'React — Sharing State Between Components', url: `${REACT}/sharing-state-between-components` },
    ],
  },
  {
    tag: 'state-server',
    summary: {
      ru: 'Серверное состояние — кэш данных, которые принадлежат серверу. TanStack Query (React Query) берёт на себя загрузку, кэш, дедупликацию, фоновое обновление и инвалидацию.',
      en: 'Server state is a cache of data owned by the server. TanStack Query (React Query) handles loading, caching, deduplication, background refresh and invalidation.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Данные хранятся по **ключу запроса**: `[\'todos\', { status }]` — у каждого фильтра свой кэш. Два компонента с одним ключом получат один запрос. По умолчанию данные сразу считаются **устаревшими** (`staleTime: 0`) и тихо обновляются при монтировании, фокусе окна и восстановлении сети, а неиспользуемый кэш удаляется через 5 минут (`gcTime`).',
          en: 'Data is stored by **query key**: `[\'todos\', { status }]` — each filter gets its own cache. Two components with the same key share one request. By default data is **stale** immediately (`staleTime: 0`) and refetched quietly on mount, window focus and reconnect, while unused cache is removed after 5 minutes (`gcTime`).',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'После изменения данных (мутации) соответствующие запросы **инвалидируют**: `queryClient.invalidateQueries({ queryKey: [\'todos\'] })` — и активные списки перезапросятся. Класть такие данные в Redux вручную — значит самому писать кэш, флаги загрузки и обновления.',
          en: 'After data changes (a mutation), **invalidate** the related queries: `queryClient.invalidateQueries({ queryKey: [\'todos\'] })` — active lists refetch. Putting this data in Redux by hand means writing the cache, loading flags and refreshing yourself.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Ключ запроса включает все параметры.', en: 'The query key includes all parameters.' },
      { ru: 'Одинаковый ключ — один запрос и общий кэш.', en: 'Same key — one request and a shared cache.' },
      { ru: 'По умолчанию `staleTime: 0` — фоновое обновление.', en: 'Default `staleTime: 0` — background refetching.' },
      { ru: 'После мутации — `invalidateQueries`.', en: 'After a mutation — `invalidateQueries`.' },
    ],
    sources: [
      { title: 'TanStack Query — Important Defaults', url: `${QUERY}/important-defaults` },
      { title: 'TanStack Query — Query Keys', url: `${QUERY}/query-keys` },
      { title: 'TanStack Query — Query Invalidation', url: `${QUERY}/query-invalidation` },
    ],
  },
  {
    tag: 'state-url',
    summary: {
      ru: 'URL — тоже хранилище состояния: фильтры, страница и вкладка в адресе переживают перезагрузку, работают с кнопкой «Назад» и отправляются ссылкой.',
      en: 'The URL is state storage too: filters, page and tab in the address survive reloads, work with the Back button and can be shared as a link.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`URLSearchParams` разбирает и собирает строку запроса: `get` возвращает первое значение параметра, `getAll` — все (`?tag=js&tag=ts`), `set` заменяет значение, `toString()` собирает строку обратно с правильным кодированием.',
          en: '`URLSearchParams` parses and builds the query string: `get` returns a parameter’s first value, `getAll` — all of them (`?tag=js&tag=ts`), `set` replaces a value, `toString()` builds the string back with proper encoding.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`history.pushState` добавляет запись в историю — «Назад» вернёт прежнее состояние. `replaceState` меняет текущую запись: так обновляют параметр поиска при вводе, чтобы не засорять историю десятками шагов. Роутеры (`useSearchParams` в React Router и аналоги) работают поверх этого API.',
          en: '`history.pushState` adds a history entry — Back returns the previous state. `replaceState` changes the current entry: use it to update a search parameter while typing so history isn’t flooded with dozens of steps. Routers (`useSearchParams` in React Router and similar) build on this API.',
        },
      },
    ],
    keyPoints: [
      { ru: 'В URL — то, чем делятся ссылкой: фильтры, страница, вкладка.', en: 'In the URL — what’s shared as a link: filters, page, tab.' },
      { ru: '`get` — первое значение, `getAll` — все.', en: '`get` — first value, `getAll` — all.' },
      { ru: '`pushState` — новый шаг истории, `replaceState` — без него.', en: '`pushState` — a new history step, `replaceState` — none.' },
    ],
    sources: [
      { title: 'MDN — URLSearchParams', url: `${MDN}/Web/API/URLSearchParams` },
      { title: 'MDN — History API', url: `${MDN}/Web/API/History_API` },
    ],
  },
];
