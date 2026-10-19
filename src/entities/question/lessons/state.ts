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
    format: 'steps',
    summary: {
      ru: 'Общее клиентское состояние живёт в контексте или сторе. Главное — подписываться точечно: контекст перерисовывает всех потребителей, а стор с селекторами — только тех, чьи данные изменились.',
      en: 'Shared client state lives in context or a store. The key is precise subscriptions: context re-renders every consumer, while a store with selectors re-renders only those whose data changed.',
    },
    steps: [
      {
        id: 'when-store',
        title: { ru: 'Когда нужен стор', en: 'When you need a store' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Глобальный стор оправдан, когда одни и те же клиентские данные читают и меняют **далёкие** друг от друга компоненты: корзину — шапка, карточки каталога и страница оформления. Тянуть данные пропсами через промежуточные уровни неудобно, а контекст, как увидим дальше, перерисует всех потребителей. Остальное в стор не кладут: локальное остаётся в компоненте, а ответы API — в кэше запросов вроде TanStack Query.',
              en: 'A global store is justified when the same client data is read and changed by components **far apart**: the cart by the header, the catalog cards and the checkout page. Passing it as props through the levels in between is awkward, and context, as we’ll see, re-renders every consumer. Nothing else goes in the store: local state stays in the component, and API responses stay in a query cache like TanStack Query.',
            },
          },
          { type: 'diagram', diagram: 'stores-distant-consumers' },
        ],
        test: ['state-stores-002'],
      },
      {
        id: 'context',
        title: { ru: 'Контекст перерисовывает всех', en: 'Context re-renders every consumer' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Когда меняется `value` провайдера, React перерисовывает **всех** потребителей контекста — даже тех, кому нужна только часть значения. Если в одном контексте лежит `{ cart, dispatch }`, кнопкам «В корзину» прилетает каждое изменение корзины, хотя им нужен лишь `dispatch`. Решение из документации React — разделить контексты: состояние в одном, `dispatch` в другом. `dispatch` из `useReducer` стабилен между рендерами, поэтому его подписчики не перерисовываются.',
              en: 'When a provider’s `value` changes, React re-renders **every** consumer of the context — even those that need only part of the value. If one context holds `{ cart, dispatch }`, the “Add to cart” buttons get every cart change, though they need only `dispatch`. The fix from the React docs is to split contexts: state in one, `dispatch` in another. `dispatch` from `useReducer` is stable between renders, so its subscribers don’t re-render.',
            },
          },
          { type: 'diagram', diagram: 'stores-context-rerender' },
          {
            type: 'check',
            check: {
              id: 'context-partial-read',
              prompt: {
                ru: 'В контексте лежит `{ theme, user }`, поменялся `user`. Перерисуется ли компонент, который берёт из контекста только `theme`?',
                en: 'A context holds `{ theme, user }`, and `user` changed. Will a component that takes only `theme` from it re-render?',
              },
              options: [
                { text: { ru: 'Нет, он читает только `theme`', en: 'No, it reads only `theme`' } },
                { text: { ru: 'Только если `theme` тоже изменилась', en: 'Only if `theme` changed too' } },
                { text: { ru: 'Да: при новом `value` перерисовываются все потребители', en: 'Yes: a new `value` re-renders every consumer' } },
              ],
              answer: 2,
              explanation: {
                ru: '`useContext` подписывает на весь `value`, а не на поля, которые компонент из него достаёт. Новый объект `{ theme, user }` — значит, рендер у всех.',
                en: '`useContext` subscribes to the whole `value`, not to the fields the component picks from it. A new `{ theme, user }` object means a render for everyone.',
              },
            },
          },
        ],
        test: ['state-stores-009'],
      },
      {
        id: 'selector-subscription',
        title: { ru: 'Подписка селектором', en: 'Subscribing with a selector' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Сторы вроде Zustand решают это селекторами: `useStore((state) => state.count)` подписывает компонент только на `count`, и он перерисуется лишь при его изменении. `useStore()` без селектора подписан на весь стор, и рендер вызовет любое поле — деструктуризация `const { count } = useStore()` этого не меняет. А `useStore.getState()` читает значение один раз и вообще не подписывается: компонент не узнает об изменениях.',
              en: 'Stores like Zustand solve this with selectors: `useStore((state) => state.count)` subscribes the component only to `count`, so it re-renders only when that changes. `useStore()` without a selector subscribes to the whole store, and any field triggers a render — destructuring `const { count } = useStore()` doesn’t change that. And `useStore.getState()` reads the value once and doesn’t subscribe at all: the component never learns about changes.',
            },
          },
          { type: 'diagram', diagram: 'stores-selector-subscription' },
        ],
        test: ['state-stores-001'],
      },
      {
        id: 'shallow',
        title: { ru: 'Новый объект из селектора', en: 'A new object from a selector' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Результат селектора сравнивают **по ссылке**. Селектор, который собирает `{ count, increment }`, каждый раз возвращает новый объект: в Zustand v5 это бесконечные перерисовки и «Maximum update depth exceeded». Выходы — отдельный селектор на каждое значение или `useShallow`: [[shallow-copy|поверхностное]] сравнение ключей верхнего уровня через `Object.is`. Так же работает `shallowEqual` в react-redux. А мемоизированный селектор пересчитывает результат, только когда вход изменился по ссылке.',
              en: 'A selector’s result is compared **by reference**. A selector that builds `{ count, increment }` returns a new object every time: in Zustand v5 that means endless re-renders and “Maximum update depth exceeded”. The way out is a separate selector per value or `useShallow`: a [[shallow-copy|shallow]] comparison of top-level keys with `Object.is`. `shallowEqual` in react-redux works the same way. And a memoized selector recomputes only when its input changes by reference.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const { count, increment } = useStore(\n  useShallow((state) => ({\n    count: state.count,\n    increment: state.increment,\n  })),\n);',
            },
            caption: { ru: '`useShallow` сравнивает поля, а не сам объект', en: '`useShallow` compares fields, not the object itself' },
          },
        ],
        test: ['state-stores-003', 'state-stores-008'],
      },
      {
        id: 'external-store',
        title: { ru: 'Свой стор и слияние', en: 'Your own store and merging' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Внешний стор подключают к React через `useSyncExternalStore(subscribe, getSnapshot)`. Результат `getSnapshot` React сравнивает через `Object.is`, поэтому, пока стор не менялся, функция обязана возвращать **то же** значение. Спред `{ ...store.getState().user }` создаёт новый объект на каждый вызов — и рендеры не заканчиваются. Ещё ловушка: `set` в Zustand сливает значение только на верхнем уровне. `set({ user: { name } })` заменит `user` целиком, и другие его поля пропадут.',
              en: 'An external store is connected to React with `useSyncExternalStore(subscribe, getSnapshot)`. React compares `getSnapshot` results with `Object.is`, so while the store is unchanged the function must return **the same** value. A spread like `{ ...store.getState().user }` creates a new object on every call — and the renders never stop. Another trap: Zustand’s `set` merges only the top level. `set({ user: { name } })` replaces `user` entirely, and its other fields are lost.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "set((state) => ({\n  user: { ...state.user, name: 'Bob' },\n}));",
            },
            caption: { ru: 'Вложенное обновляют явно', en: 'Nested data is updated explicitly' },
          },
        ],
        test: ['state-stores-006'],
      },
      {
        id: 'atoms-signals',
        title: { ru: 'Атомы и сигналы', en: 'Atoms and signals' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Jotai и похожие библиотеки дробят состояние на **атомы**. Производный атом вычисляется из других и пересчитывается, только когда меняются атомы, которые он читает. Компонент перерисовывается лишь из-за атомов, которые использует, — без селекторов и мемоизации. **Сигналы** в Angular, Preact и Solid идут дальше: сигнал сам знает, кто его читает, и при изменении обновляет только зависимые вычисления и места в DOM. В React же `useState` перерисовывает компонент целиком с потомками.',
              en: 'Jotai and similar libraries split state into **atoms**. A derived atom is computed from others and recomputes only when the atoms it reads change. A component re-renders only because of the atoms it uses — no selectors or memoization needed. **Signals** in Angular, Preact and Solid go further: a signal knows who reads it and, on change, updates only the dependent computations and spots in the DOM. In React, `useState` re-renders the whole component with its children.',
            },
          },
          {
            type: 'illustration',
            illustration: 'stores-atoms',
            caption: { ru: 'Изменился `userAtom` — обновился только `Avatar`', en: '`userAtom` changed — only `Avatar` updated' },
          },
          {
            type: 'check',
            check: {
              id: 'derived-atom',
              prompt: {
                ru: 'Производный `totalAtom` читает только `cartAtom`. Что с ним будет, когда изменится `userAtom`?',
                en: 'The derived `totalAtom` reads only `cartAtom`. What happens to it when `userAtom` changes?',
              },
              options: [
                { text: { ru: 'Пересчитается вместе со всеми атомами', en: 'It recomputes along with every atom' } },
                { text: { ru: 'Ничего: от `userAtom` он не зависит', en: 'Nothing: it doesn’t depend on `userAtom`' } },
                { text: { ru: 'Пересчитается, если его читает компонент', en: 'It recomputes if a component reads it' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Атомы отслеживают зависимости: `totalAtom` подписан только на `cartAtom`. Изменение `userAtom` его не касается — и компоненты, которые читают `totalAtom`, тоже не перерисуются.',
                en: 'Atoms track dependencies: `totalAtom` subscribes only to `cartAtom`. A change in `userAtom` doesn’t touch it — nor the components that read `totalAtom`.',
              },
            },
          },
        ],
        test: ['state-stores-007', 'state-stores-005'],
      },
    ],
    keyPoints: [
      { ru: 'Стор — для клиентских данных, которые нужны далёким компонентам.', en: 'A store is for client data that distant components need.' },
      { ru: 'Контекст перерисовывает всех потребителей — разделяйте состояние и `dispatch`.', en: 'Context re-renders every consumer — split state and `dispatch`.' },
      { ru: 'Подписывайтесь селектором, а объект из селектора — через `useShallow`.', en: 'Subscribe with a selector; return objects via `useShallow`.' },
      { ru: '`getSnapshot` возвращает ту же ссылку, пока стор не изменился.', en: '`getSnapshot` returns the same reference until the store changes.' },
      { ru: 'Атомы и сигналы обновляют только зависимых.', en: 'Atoms and signals update only their dependents.' },
    ],
    sources: [
      { title: 'React — Scaling Up with Reducer and Context', url: `${REACT}/scaling-up-with-reducer-and-context` },
      { title: 'React — useSyncExternalStore', url: 'https://react.dev/reference/react/useSyncExternalStore' },
      { title: 'Zustand — documentation', url: 'https://zustand.docs.pmnd.rs/' },
      { title: 'Jotai — Core concepts', url: 'https://jotai.org/docs/core/atom' },
      { title: 'Effector — Core concepts', url: 'https://effector.dev/en/introduction/core-concepts/' },
    ],
  },
  {
    tag: 'state-server',
    format: 'steps',
    summary: {
      ru: 'Данные с сервера — это кеш, а не обычное состояние: их загружают по ключу, обновляют в фоне и помечают устаревшими после изменений. Эту работу берут на себя TanStack Query, SWR и RTK Query.',
      en: 'Server data is a cache, not ordinary state: it’s loaded by key, refreshed in the background and marked stale after changes. TanStack Query, SWR and RTK Query take care of this.',
    },
    steps: [
      {
        id: 'cache',
        title: { ru: 'Кеш, а не стор', en: 'A cache, not a store' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Список заказов на клиенте — лишь копия данных сервера, и она устаревает. Таким данным нужны статус загрузки, ошибки, повторы, обновление в фоне и после изменений. Руками в сторе это пишут в каждом месте заново, поэтому берут библиотеку: TanStack Query, SWR или RTK Query. Пока запрос с ключом в полёте, повторный вызов получает **тот же** промис: десять компонентов с одним ключом — один сетевой запрос. Поэтому данные запрашивают прямо там, где они нужны.',
              en: 'An order list on the client is just a copy of server data, and it goes stale. Such data needs loading status, errors, retries, background refreshes and refreshes after changes. Writing that by hand in a store means repeating it everywhere, so you use a library: TanStack Query, SWR or RTK Query. While a request with a key is in flight, a repeated call gets **the same** promise: ten components with one key make one network request. So data is fetched right where it’s needed.',
            },
          },
          { type: 'diagram', diagram: 'server-dedupe' },
        ],
        test: ['state-server-011'],
      },
      {
        id: 'keys',
        title: { ru: 'Ключ запроса', en: 'The query key' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ключ должен включать **все параметры**, от которых зависит запрос: `[\'todos\', { status }]`. Тогда у каждого фильтра свой кеш, а смена статуса запускает новый запрос. Без `status` все фильтры делят одну запись и показывают чужие данные. Ключи строят иерархически, от общего к частному, потому что фильтры запросов сравнивают их **по префиксу**: `[\'todos\']` совпадёт со всеми ключами, которые с него начинаются, но не с `[\'user\']`. Ровно один запрос выбирают через `exact: true`.',
              en: 'The key must include **every parameter** the request depends on: `[\'todos\', { status }]`. Then each filter has its own cache, and changing the status starts a new request. Without `status`, all filters share one entry and show each other’s data. Keys are built hierarchically, from general to specific, because query filters compare them **by prefix**: `[\'todos\']` matches every key that starts with it, but not `[\'user\']`. To target exactly one query, use `exact: true`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "useQuery({\n  queryKey: ['todos', { status }],\n  queryFn: () => fetchTodos(status),\n});",
            },
          },
        ],
        test: ['state-server-001', 'state-server-009'],
      },
      {
        id: 'freshness',
        title: { ru: 'staleTime и gcTime', en: 'staleTime and gcTime' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`staleTime` — сколько данные считаются свежими. По умолчанию это 0: данные устаревают сразу, и при монтировании, возвращении на вкладку (`refetchOnWindowFocus`) и восстановлении сети их тихо перезапрашивают, показывая кеш. `gcTime`, по умолчанию 5 минут, — сколько хранить данные запроса, на который никто не подписан, прежде чем удалить. Для редко меняющихся справочников поднимают `staleTime`, а не `gcTime`.',
              en: '`staleTime` is how long data counts as fresh. The default is 0: data goes stale at once, and on mount, when you return to the tab (`refetchOnWindowFocus`) and when the network comes back it’s quietly refetched while the cache is shown. `gcTime`, 5 minutes by default, is how long to keep data of a query nobody subscribes to before removing it. For rarely changing reference data you raise `staleTime`, not `gcTime`.',
            },
          },
          {
            type: 'illustration',
            illustration: 'server-query-lifecycle',
          },
          {
            type: 'check',
            check: {
              id: 'fresh-on-focus',
              prompt: {
                ru: 'У запроса `staleTime: 60_000`. Пользователь вернулся на вкладку через 10 секунд после загрузки. Будет запрос?',
                en: 'A query has `staleTime: 60_000`. The user returns to the tab 10 seconds after loading. Will it refetch?',
              },
              options: [
                { text: { ru: 'Да, при фокусе запросы обновляются всегда', en: 'Yes, queries always refetch on focus' } },
                { text: { ru: 'Только если истёк `gcTime`', en: 'Only if `gcTime` has run out' } },
                { text: { ru: 'Нет: данные ещё свежие', en: 'No: the data is still fresh' } },
              ],
              answer: 2,
              explanation: {
                ru: 'Фоновые обновления касаются только устаревших данных. Через 10 секунд они ещё свежие — минута не прошла, — и кеш отдаётся без запроса.',
                en: 'Background refetches apply only to stale data. After 10 seconds it’s still fresh — a minute hasn’t passed — so the cache is served without a request.',
              },
            },
          },
        ],
        test: ['state-server-003', 'state-server-005'],
      },
      {
        id: 'mutations',
        title: { ru: 'Мутации и инвалидация', en: 'Mutations and invalidation' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'После успешной мутации кеш списка устарел. `queryClient.invalidateQueries({ queryKey: [\'todos\'] })` помечает подходящие запросы устаревшими и сразу перезапрашивает активные. Если ответ мутации уже содержит данные, кеш можно обновить без запроса через `setQueryData`. Так же реагируют на события из WebSocket. **Оптимистичное** обновление: отменить идущие запросы, сохранить снимок, записать ожидаемый результат, при ошибке вернуть снимок, а в конце всё равно инвалидировать.',
              en: 'After a successful mutation, the list cache is stale. `queryClient.invalidateQueries({ queryKey: [\'todos\'] })` marks matching queries stale and refetches the active ones right away. If the mutation response already has the data, update the cache without a request via `setQueryData`. WebSocket events are handled the same way. An **optimistic** update: cancel in-flight queries, save a snapshot, write the expected result, restore the snapshot on error, and invalidate at the end anyway.',
            },
          },
          { type: 'diagram', diagram: 'server-invalidation' },
        ],
        test: ['state-server-002'],
      },
      {
        id: 'dependent',
        title: { ru: 'Зависимые запросы и страницы', en: 'Dependent queries and pages' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Заказы можно загрузить, только когда известен `userId`? Это **зависимый** запрос: `enabled: false`, пока значения нет, и запрос стартует сам, когда оно появится. `userId` входит в ключ. Хук внутри `if` нарушает правила хуков, а повторы при ошибке — не способ ждать данные. При листании страниц у каждой свой ключ, и новая грузится «с нуля». `placeholderData: keepPreviousData` показывает прошлую страницу, пока не придёт новая, а `isPlaceholderData` помогает её приглушить.',
              en: 'Can orders load only once `userId` is known? That’s a **dependent** query: `enabled: false` while the value is missing, and the query starts by itself once it appears. `userId` goes into the key. A hook inside `if` breaks the rules of hooks, and retries on error are no way to wait for data. When paging, each page has its own key, and a new one loads from scratch. `placeholderData: keepPreviousData` shows the previous page until the new one arrives, and `isPlaceholderData` helps dim it.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "useQuery({\n  queryKey: ['orders', userId],\n  queryFn: () => fetchOrders(userId),\n  enabled: Boolean(userId),\n});",
            },
          },
        ],
        test: ['state-server-007'],
      },
      {
        id: 'races',
        title: { ru: 'Гонки запросов', en: 'Request races' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Пользователь быстро ввёл «re», потом «react». Ответы приходят в любом порядке: если запрос «re» шёл дольше, его ответ придёт последним и перезапишет свежий результат. Это **гонка запросов**. Лекарства: отменить прошлый запрос через `AbortController`, в эффекте игнорировать устаревший ответ флагом из функции очистки или взять кеш запросов — у каждого запроса свой ключ, и экран показывает данные по актуальному.',
              en: 'The user quickly types “re”, then “react”. Responses arrive in any order: if the “re” request took longer, its response comes last and overwrites the fresh result. That’s a **request race**. The cures: cancel the previous request with `AbortController`, ignore a stale response in an effect with a flag set in the cleanup function, or use a query cache — each request has its own key, and the screen shows data for the current one.',
            },
          },
          {
            type: 'illustration',
            illustration: 'server-race',
            caption: { ru: 'Медленный старый ответ затёр новый', en: 'A slow old response overwrote the new one' },
          },
          {
            type: 'check',
            check: {
              id: 'ignore-stale-response',
              prompt: {
                ru: 'Эффект загружает результаты поиска через `fetch`. Как не дать старому ответу перезаписать новый?',
                en: 'An effect loads search results with `fetch`. How do you stop an old response from overwriting a new one?',
              },
              options: [
                { text: { ru: 'Флагом `ignore`, который выставляет функция очистки эффекта', en: 'With an `ignore` flag set by the effect’s cleanup' } },
                { text: { ru: 'Добавить `await` перед `setResults`', en: 'Add `await` before `setResults`' } },
                { text: { ru: 'Увеличить таймаут запроса', en: 'Increase the request timeout' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Перед новым запуском React вызывает очистку прошлого эффекта: она выставляет `ignore = true`, и запоздавший ответ уже не попадёт в состояние.',
                en: 'Before running again, React calls the previous effect’s cleanup: it sets `ignore = true`, so a late response never reaches the state.',
              },
            },
          },
        ],
        test: ['state-server-006'],
      },
    ],
    keyPoints: [
      { ru: 'Серверные данные — кеш: один ключ — один запрос на всех.', en: 'Server data is a cache: one key, one request for everyone.' },
      { ru: 'В ключе — все параметры запроса; фильтры сравнивают его по префиксу.', en: 'The key holds every request parameter; filters match it by prefix.' },
      { ru: '`staleTime` — сколько данные свежие, `gcTime` — сколько хранить ненужные.', en: '`staleTime` is how long data stays fresh; `gcTime` is how long to keep unused data.' },
      { ru: 'После мутации — `invalidateQueries` или `setQueryData`.', en: 'After a mutation — `invalidateQueries` or `setQueryData`.' },
      { ru: 'Гонки лечат отменой, флагом в очистке или кешем по ключу.', en: 'Races are cured by cancellation, a cleanup flag or a keyed cache.' },
    ],
    sources: [
      { title: 'TanStack Query — Important Defaults', url: `${QUERY}/important-defaults` },
      { title: 'TanStack Query — Query Keys', url: `${QUERY}/query-keys` },
      { title: 'TanStack Query — Query Invalidation', url: `${QUERY}/query-invalidation` },
      { title: 'TanStack Query — Optimistic Updates', url: `${QUERY}/optimistic-updates` },
      { title: 'React — Fetching data with Effects', url: 'https://react.dev/learn/synchronizing-with-effects#fetching-data' },
    ],
  },
  {
    tag: 'state-url',
    format: 'steps',
    summary: {
      ru: 'URL — тоже хранилище состояния: фильтры, страница и вкладка в адресе переживают перезагрузку, работают с кнопкой «Назад» и отправляются ссылкой.',
      en: 'The URL is state storage too: filters, page and tab in the address survive a reload, work with the Back button and travel as a link.',
    },
    steps: [
      {
        id: 'what-in-url',
        title: { ru: 'Что хранить в URL', en: 'What goes in the URL' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В URL кладут то, что пользователь ожидает сохранить и передать: фильтры, сортировку, номер страницы, вкладку, строку поиска. Такое состояние видно в адресе, восстанавливается после перезагрузки, отправляется ссылкой и работает с кнопкой «Назад». Не кладут временное UI-состояние — открыт ли выпадающий список. И никогда не кладут секреты и личные данные: адрес оседает в истории браузера, в логах серверов и уходит другим сайтам в заголовке `Referer`.',
              en: 'The URL holds what users expect to keep and share: filters, sorting, page number, tab, search query. Such state is visible in the address, restored after a reload, shared as a link and works with the Back button. Temporary UI state — is a dropdown open — stays out. And secrets or personal data never go in: the address lands in browser history and server logs and is sent to other sites in the `Referer` header.',
            },
          },
        ],
        test: ['state-url-002', 'state-url-009'],
      },
      {
        id: 'anatomy',
        title: { ru: 'Из чего состоит адрес', en: 'What an address is made of' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`new URL(адрес)` разбирает адрес на части: `origin` — протокол и хост, `pathname` — путь к странице, `search` — строка запроса **вместе с** `?`, `hash` — якорь вместе с `#`. Состояние экрана живёт в `search`; удобнее читать его через `url.searchParams` — готовый `URLSearchParams`. Якорь браузер на сервер не отправляет: он остаётся на клиенте.',
              en: '`new URL(address)` splits an address into parts: `origin` is the protocol and host, `pathname` the page path, `search` the query string **including** `?`, and `hash` the anchor including `#`. Screen state lives in `search`; it’s easiest to read via `url.searchParams`, a ready `URLSearchParams`. The browser doesn’t send the hash to the server: it stays on the client.',
            },
          },
          { type: 'illustration', illustration: 'url-anatomy' },
        ],
        test: ['state-url-008'],
      },
      {
        id: 'source-of-truth',
        title: { ru: 'URL — источник правды', en: 'The URL is the source of truth' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Если фильтры живут в URL, ссылка воспроизводит ровно тот экран, который видел её автор. Состояние **читают** из URL и изменения **пишут** в URL — роутерный `useSearchParams` и аналоги. Ошибка — держать фильтры одновременно в URL и в `useState` и синхронизировать эффектами в обе стороны: появятся гонки и циклы обновлений. А `localStorage` подходит для настроек вида, а не для того, чем делятся ссылкой.',
              en: 'If filters live in the URL, a link reproduces exactly the screen its sender saw. State is **read** from the URL and changes are **written** to the URL — the router’s `useSearchParams` and the like. The mistake is keeping filters both in the URL and in `useState` and syncing them with effects both ways: races and update loops follow. And `localStorage` suits view preferences, not things shared as links.',
            },
          },
          { type: 'diagram', diagram: 'url-source-of-truth' },
          {
            type: 'check',
            check: {
              id: 'two-way-sync',
              prompt: {
                ru: 'Фильтры хранятся и в URL, и в `useState`, а эффекты синхронизируют их в обе стороны. Чем это плохо?',
                en: 'Filters live both in the URL and in `useState`, and effects sync them both ways. What’s wrong with that?',
              },
              options: [
                { text: { ru: 'Ничем — две копии надёжнее', en: 'Nothing — two copies are safer' } },
                { text: { ru: 'Два источника правды: гонки и циклы обновлений', en: 'Two sources of truth: races and update loops' } },
                { text: { ru: 'Из URL нельзя читать в React', en: 'React can’t read from the URL' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Каждое изменение запускает синхронизацию в другую сторону, и копии то расходятся, то перезаписывают друг друга. Достаточно одного источника — URL — и чтения из него при рендере.',
                en: 'Every change triggers a sync the other way, and the copies keep drifting or overwriting each other. One source — the URL — read during render is enough.',
              },
            },
          },
        ],
        test: ['state-url-005'],
      },
      {
        id: 'search-params',
        title: { ru: 'URLSearchParams', en: 'URLSearchParams' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`URLSearchParams` разбирает и собирает строку запроса. Ключ может повторяться: `get` вернёт **первое** значение, `getAll` — все (`?tag=js&tag=ts`). `set` заменяет все значения ключа одним, `append` добавляет ещё одно, `delete` убирает ключ целиком, а порядок остальных пар сохраняется. `toString()` собирает строку **без** ведущего `?`. Для массивов фильтров выбирают один формат — повторяющиеся ключи или `tag=js,ts` — и держат его везде.',
              en: '`URLSearchParams` parses and builds the query string. A key can repeat: `get` returns the **first** value, `getAll` all of them (`?tag=js&tag=ts`). `set` replaces all of a key’s values with one, `append` adds another, `delete` removes the key entirely, and the other pairs keep their order. `toString()` builds the string **without** a leading `?`. For filter arrays, pick one format — repeated keys or `tag=js,ts` — and stick to it.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const params = new URLSearchParams(\n  '?tag=js&tag=ts',\n);\nparams.get('tag'); // 'js'\nparams.getAll('tag'); // ['js', 'ts']\nparams.set('tag', 'css');\nparams.toString(); // 'tag=css'",
            },
          },
        ],
        test: ['state-url-001'],
      },
      {
        id: 'encoding-parsing',
        title: { ru: 'Кодирование и числа', en: 'Encoding and numbers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`URLSearchParams` кодирует значения сам: `&` превращается в `%26`, иначе он разорвал бы параметр, а пробел — в `+`. Собирать строку шаблоном `?q=${query}` опасно: `&` внутри сломает адрес. Значения из URL — всегда строки или `null`, если ключа нет, а `Number(null)` — это `0`. Значение по умолчанию подставляют **до** преобразования и проверяют результат: пользователь может вписать в адрес что угодно. При смене фильтра номер страницы сбрасывают.',
              en: '`URLSearchParams` encodes values itself: `&` becomes `%26`, or it would split the parameter, and a space becomes `+`. Building the string with a template like `?q=${query}` is risky: an `&` inside breaks the address. URL values are always strings, or `null` if the key is missing, and `Number(null)` is `0`. Apply the default **before** conversion and validate the result: users can type anything into the address. When a filter changes, reset the page number.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const raw =\n  Number(params.get('page') ?? 1);\nconst page =\n  Number.isInteger(raw) && raw > 0\n    ? raw\n    : 1;",
            },
            caption: { ru: 'Номер страницы из URL с проверкой', en: 'A validated page number from the URL' },
          },
        ],
        test: ['state-url-007', 'state-url-011'],
      },
      {
        id: 'history',
        title: { ru: 'push или replace', en: 'push or replace' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`history.pushState` добавляет запись в историю — «Назад» вернёт прежнее состояние. `replaceState` меняет текущую запись, не добавляя новую. Поиск, который пишет запрос в `?q=` на каждый символ, обновляет адрес через `replaceState`, иначе история превратится в двадцать шагов «Назад» по буквам. А переключение вкладок или фильтров, к которым хочется вернуться, — через `pushState`. Роутеры дают то же опцией `replace`; `location.href` же перезагрузит страницу.',
              en: '`history.pushState` adds a history entry — “Back” returns to the previous state. `replaceState` changes the current entry without adding one. A search that writes `?q=` on every keystroke updates the address with `replaceState`, or history turns into twenty letter-by-letter “Back” steps. Switching tabs or filters you want to return to goes through `pushState`. Routers offer the same via a `replace` option, while `location.href` reloads the page.',
            },
          },
          { type: 'diagram', diagram: 'url-push-replace' },
          {
            type: 'check',
            check: {
              id: 'tabs-push',
              prompt: {
                ru: 'На странице товара вкладки «Описание» и «Отзывы». Кнопка «Назад» должна возвращать на прошлую вкладку. Как менять адрес?',
                en: 'A product page has Description and Reviews tabs. “Back” should return to the previous tab. How should the address change?',
              },
              options: [
                { text: { ru: 'Через `replaceState`', en: 'With `replaceState`' } },
                { text: { ru: 'Через `pushState`', en: 'With `pushState`' } },
                { text: { ru: 'Через `location.reload()`', en: 'With `location.reload()`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Каждое переключение вкладки должно стать отдельной записью истории — это `pushState`. `replaceState` перезапишет текущую запись, и «Назад» уведёт со страницы товара.',
                en: 'Each tab switch should become its own history entry — that’s `pushState`. `replaceState` overwrites the current entry, and “Back” would leave the product page.',
              },
            },
          },
        ],
        test: ['state-url-003'],
      },
    ],
    keyPoints: [
      { ru: 'В URL — то, чем делятся ссылкой; секреты и личные данные — никогда.', en: 'The URL holds what’s shared as a link; never secrets or personal data.' },
      { ru: 'URL — источник правды: читаем из него и пишем в него.', en: 'The URL is the source of truth: read from it, write to it.' },
      { ru: '`get` — первое значение, `getAll` — все, значения — строки или `null`.', en: '`get` gives the first value, `getAll` all; values are strings or `null`.' },
      { ru: 'Ввод с клавиатуры — `replaceState`, переходы, к которым возвращаются, — `pushState`.', en: 'Typing uses `replaceState`; steps you go back to use `pushState`.' },
    ],
    sources: [
      { title: 'MDN — URL', url: `${MDN}/Web/API/URL` },
      { title: 'MDN — URLSearchParams', url: `${MDN}/Web/API/URLSearchParams` },
      { title: 'MDN — History API', url: `${MDN}/Web/API/History_API` },
    ],
  },
];
