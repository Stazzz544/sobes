import type { Question } from '../model/types';

const DOCS = 'https://nextjs.org/docs/app';

export const NEXT_QUESTIONS: Question[] = [
  {
    id: 'next-routing-files-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какой файл делает адрес `/blog` доступным в App Router?',
      en: 'Which file makes the `/blog` URL available in the App Router?',
    },
    options: [
      { code: 'app/blog/layout.tsx' },
      { code: 'app/blog/page.tsx' },
      { code: 'app/blog/index.tsx' },
      { code: 'app/blog.tsx' },
      { code: 'pages/blog/route.tsx' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В App Router папки задают сегменты адреса, а публичным маршрут делает только файл `page`. `layout` оборачивает страницы, но сам адрес не открывает, а `index.tsx` — привычка из старого Pages Router. Остальные файлы в папке (компоненты, утилиты) наружу не видны.',
          en: 'In the App Router folders define URL segments, and only a `page` file makes a route public. `layout` wraps pages but doesn’t create a URL by itself, and `index.tsx` is a habit from the old Pages Router. Other files in the folder (components, utilities) aren’t exposed.',
        },
      },
    ],
    sources: [{ title: 'Next.js — page.js', url: `${DOCS}/api-reference/file-conventions/page` }],
  },
  {
    id: 'next-routing-dynamic-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какие адреса откроет страница `app/shop/[[...slug]]/page.tsx`?',
      en: 'Which URLs does `app/shop/[[...slug]]/page.tsx` match?',
    },
    options: [
      { text: { ru: 'Только `/shop/a`', en: 'Only `/shop/a`' } },
      { text: { ru: '`/shop/a` и `/shop/a/b`, но не `/shop`', en: '`/shop/a` and `/shop/a/b`, but not `/shop`' } },
      { text: { ru: '`/shop`, `/shop/a` и `/shop/a/b`', en: '`/shop`, `/shop/a` and `/shop/a/b`' } },
      { text: { ru: 'Только `/shop`', en: 'Only `/shop`' } },
      { text: { ru: 'Буквально `/shop/[[...slug]]`', en: 'Literally `/shop/[[...slug]]`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`[slug]` — один динамический сегмент, `[...slug]` — catch-all: один и более сегментов, `slug` приходит массивом. Двойные скобки `[[...slug]]` делают его необязательным: подходит и сам `/shop`, тогда `slug` равен `undefined`.',
          en: '`[slug]` is one dynamic segment, `[...slug]` is catch-all: one or more segments, with `slug` as an array. Double brackets `[[...slug]]` make it optional: `/shop` itself also matches, with `slug` being `undefined`.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Dynamic Route Segments', url: `${DOCS}/api-reference/file-conventions/dynamic-routes` }],
  },
  {
    id: 'next-routing-groups-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'По какому адресу откроется `app/(marketing)/about/page.tsx`?',
      en: 'At which URL does `app/(marketing)/about/page.tsx` open?',
    },
    options: [
      { code: '/marketing/about' },
      { code: '/(marketing)/about' },
      { code: '/about' },
      { code: '/about/marketing' },
      { text: { ru: 'Ни по какому: папки в скобках игнорируются целиком', en: 'None: folders in parentheses are ignored entirely' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Папка в скобках — **группа маршрутов**: она нужна для организации кода и не попадает в адрес. Группы позволяют дать разделам разные `layout` (например, маркетинг и личный кабинет) без лишних сегментов в URL. Страницы внутри группы работают как обычно.',
          en: 'A folder in parentheses is a **route group**: it organizes code and isn’t part of the URL. Groups let sections have different `layout`s (say, marketing and the dashboard) without extra URL segments. Pages inside a group work as usual.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Route Groups', url: `${DOCS}/api-reference/file-conventions/route-groups` }],
  },
  {
    id: 'next-routing-layout-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В `app/dashboard/layout.tsx` есть боковое меню с поиском (клиентский компонент). Что будет с введённым текстом при переходе с `/dashboard/a` на `/dashboard/b`?',
      en: '`app/dashboard/layout.tsx` has a sidebar with a search box (a Client Component). What happens to the typed text when navigating from `/dashboard/a` to `/dashboard/b`?',
    },
    options: [
      { text: { ru: 'Сбросится: при переходе всё дерево монтируется заново', en: 'It resets: the whole tree remounts on navigation' } },
      { text: { ru: 'Сохранится: общий layout не перемонтируется, меняется только страница', en: 'It persists: the shared layout doesn’t remount, only the page changes' } },
      { text: { ru: 'Сохранится, только если обернуть меню в `memo`', en: 'It persists only if the sidebar is wrapped in `memo`' } },
      { text: { ru: 'Сбросится, если не указать `key` у layout', en: 'It resets unless the layout has a `key`' } },
      { text: { ru: 'Страница перезагрузится целиком', en: 'The page reloads completely' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`layout` общий для всех вложенных страниц: при переходе между ними он не перерисовывается и сохраняет состояние, а меняется только содержимое `children`. Если нужно сбрасывать состояние на каждом переходе, вместо `layout` используют `template`. Из-за этого layout не знает текущий путь — его читают в клиентском компоненте через `usePathname`.',
          en: 'A `layout` is shared by its nested pages: navigating between them doesn’t re-render it and keeps its state, only `children` changes. To reset state on every navigation, use `template` instead of `layout`. That’s also why a layout doesn’t know the current path — read it in a Client Component via `usePathname`.',
        },
      },
    ],
    sources: [{ title: 'Next.js — layout.js', url: `${DOCS}/api-reference/file-conventions/layout` }],
  },
  {
    id: 'next-routing-hierarchy-001',
    kind: 'order',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В каком порядке Next.js вкладывает специальные файлы одного сегмента — от внешнего к внутреннему?',
      en: 'In which order does Next.js nest one segment’s special files — from outermost to innermost?',
    },
    items: [
      { code: 'layout.tsx' },
      { code: 'template.tsx' },
      { code: 'error.tsx' },
      { code: 'loading.tsx' },
      { code: 'not-found.tsx' },
      { code: 'page.tsx' },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`error` — это Error Boundary, а `loading` — граница Suspense вокруг страницы. Поскольку `error` снаружи `loading`, ошибка при загрузке тоже будет поймана. А вот ошибку в `layout` того же сегмента его `error` не поймает — она снаружи, её ловит `error` родительского сегмента.',
          en: '`error` is an Error Boundary, and `loading` is a Suspense boundary around the page. Since `error` wraps `loading`, an error while loading is also caught. But an error in the same segment’s `layout` isn’t caught by its `error` — it’s outside, so the parent segment’s `error` catches it.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Project structure: component hierarchy', url: `${DOCS}/getting-started/project-structure#component-hierarchy` }],
  },
  {
    id: 'next-routing-proxy-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В Next.js 16 файл `middleware.ts` переименовали. Как он называется теперь?',
      en: 'In Next.js 16 the `middleware.ts` file was renamed. What is it called now?',
    },
    options: [
      { code: 'interceptor.ts' },
      { code: 'proxy.ts' },
      { code: 'gateway.ts' },
      { code: 'edge.ts' },
      { code: 'handler.ts' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`proxy.ts` в корне проекта выполняется **до** того, как запрос дойдёт до маршрута: делает редиректы и переписывание адресов, меняет заголовки. Имя сменили, потому что «middleware» путали с цепочкой Express, а это сетевая прослойка перед приложением. По умолчанию работает в Node.js-рантайме; тяжёлую логику и запросы к базе туда не кладут.',
          en: '`proxy.ts` at the project root runs **before** a request reaches a route: it redirects and rewrites URLs and modifies headers. It was renamed because “middleware” got confused with Express’s chain, while this is a network layer in front of the app. It runs in the Node.js runtime by default; heavy logic and database calls don’t belong there.',
        },
      },
    ],
    sources: [{ title: 'Next.js — proxy.js', url: `${DOCS}/api-reference/file-conventions/proxy` }],
  },
  {
    id: 'next-rendering-dynamic-001',
    topic: 'next',
    tags: ['next-rendering'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Страница собиралась статически, а после добавления одной строки стала рендериться на каждый запрос. Какой?',
      en: 'A page was prerendered statically, but after adding one line it renders on every request. Which line?',
    },
    options: [
      { code: "import Image from 'next/image';" },
      { code: 'const cookieStore = await cookies();' },
      { code: "export const metadata = { title: 'Blog' };" },
      { code: '<Link href="/about">About</Link>' },
      { code: "const title = 'Blog'.toUpperCase();" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`cookies()`, `headers()`, `searchParams` — API времени запроса: их значения неизвестны на этапе сборки, поэтому страница не может быть заранее отрендерена и переходит в динамический режим. Чтобы не терять статику целиком, такие части выносят в отдельный компонент за `<Suspense>` — остальное остаётся статической оболочкой.',
          en: '`cookies()`, `headers()`, `searchParams` are request-time APIs: their values aren’t known at build time, so the page can’t be prerendered and switches to dynamic rendering. To keep most of the page static, move such parts into a separate component behind `<Suspense>` — the rest stays a static shell.',
        },
      },
    ],
    sources: [{ title: 'Next.js — cookies', url: `${DOCS}/api-reference/functions/cookies` }],
  },
  {
    id: 'next-rendering-hydration-001',
    topic: 'next',
    tags: ['next-rendering'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какой код в компоненте вызовет ошибку гидрации?',
      en: 'Which code in a component causes a hydration error?',
    },
    options: [
      { code: 'const [count, setCount] = useState(0);' },
      { code: '<p>Now: {new Date().toLocaleTimeString()}</p>' },
      { code: 'useEffect(() => setTheme(localStorage.theme), []);' },
      { code: '<button onClick={() => setOpen(true)}>Open</button>' },
      { code: '<p>{props.title}</p>' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Гидрация** — React «оживляет» HTML с сервера и ожидает, что первый рендер на клиенте даст тот же результат. Время на сервере и в браузере разное, разметка не совпадает — ошибка. Так же ломают гидрацию `Math.random()`, ветки по `typeof window` и чтение `localStorage` прямо в рендере.',
          en: '**Hydration** is React “bringing to life” server HTML, expecting the first client render to produce the same result. Server and browser times differ, the markup doesn’t match — error. `Math.random()`, branches on `typeof window` and reading `localStorage` during render break hydration the same way.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Решение — показывать такое значение после монтирования (через `useEffect`) или пометить элемент `suppressHydrationWarning`, если расхождение ожидаемо, как у отметки времени.',
          en: 'The fix is to show such a value after mount (via `useEffect`) or mark the element `suppressHydrationWarning` when the mismatch is expected, as with a timestamp.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Hydration error', url: 'https://nextjs.org/docs/messages/react-hydration-error' }],
  },
  {
    id: 'next-rendering-static-params-001',
    topic: 'next',
    tags: ['next-rendering'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Зачем странице `app/blog/[slug]/page.tsx` функция `generateStaticParams`?',
      en: 'Why does `app/blog/[slug]/page.tsx` need a `generateStaticParams` function?',
    },
    options: [
      { text: { ru: 'Чтобы проверить параметры адреса на сервере', en: 'To validate URL params on the server' } },
      {
        text: {
          ru: 'Чтобы заранее собрать страницы для перечисленных `slug` при сборке',
          en: 'To prerender pages for the listed `slug`s at build time',
        },
      },
      { text: { ru: 'Чтобы передать параметры в клиентский компонент', en: 'To pass params to a Client Component' } },
      { text: { ru: 'Чтобы создать карту сайта', en: 'To generate a sitemap' } },
      { text: { ru: 'Чтобы запретить все остальные адреса', en: 'To forbid all other URLs' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`generateStaticParams` возвращает список параметров, и для каждого Next.js рендерит страницу при сборке — получается статика для динамического маршрута. Можно вернуть только популярные `slug`, а остальные отрендерятся при первом заходе. Запретить неперечисленные адреса позволяет отдельная настройка `dynamicParams = false`.',
          en: '`generateStaticParams` returns a list of params, and Next.js renders a page for each at build time — static output for a dynamic route. You can return only popular `slug`s, and the rest render on first visit. Forbidding unlisted URLs is a separate `dynamicParams = false` setting.',
        },
      },
    ],
    sources: [{ title: 'Next.js — generateStaticParams', url: `${DOCS}/api-reference/functions/generate-static-params` }],
  },
  {
    id: 'next-rendering-env-001',
    topic: 'next',
    tags: ['next-rendering'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Один Docker-образ запускают на stage и на проде с разными `NEXT_PUBLIC_API_URL`. Какой адрес увидит код в браузере?',
      en: 'One Docker image runs on stage and prod with different `NEXT_PUBLIC_API_URL`. Which URL does browser code see?',
    },
    options: [
      { text: { ru: 'Свой для каждого окружения', en: 'Each environment’s own value' } },
      {
        text: {
          ru: 'Тот, что был при `next build`: значение вшито в бандл',
          en: 'The one present at `next build`: the value is inlined into the bundle',
        },
      },
      { text: { ru: '`undefined` — браузер не видит переменные окружения', en: '`undefined` — the browser can’t see env vars' } },
      { text: { ru: 'Значение из `.env.local` разработчика', en: 'The value from the developer’s `.env.local`' } },
      { text: { ru: 'Последнее заданное на любом из серверов', en: 'Whichever was set last on any server' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Переменные с префиксом `NEXT_PUBLIC_` Next.js подставляет в JavaScript **при сборке** — после `next build` они заморожены. Для разных окружений нужен отдельный билд или выдача настроек с сервера во время работы. Переменные без префикса в браузер не попадают вовсе — так секреты остаются на сервере.',
          en: 'Next.js inlines `NEXT_PUBLIC_` variables into JavaScript **at build time** — after `next build` they’re frozen. Different environments need separate builds or settings served at runtime. Variables without the prefix never reach the browser — that’s how secrets stay on the server.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Environment Variables', url: `${DOCS}/guides/environment-variables` }],
  },
  {
    id: 'next-components-default-001',
    topic: 'next',
    tags: ['next-components'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Компонент с `useState` в папке `app/` падает с ошибкой. Почему?',
      en: 'A component with `useState` in the `app/` folder throws an error. Why?',
    },
    options: [
      { text: { ru: 'В Next.js нельзя использовать хуки', en: 'Hooks can’t be used in Next.js' } },
      {
        text: {
          ru: 'Компоненты в `app/` по умолчанию серверные; для состояния нужен `"use client"` в начале файла',
          en: 'Components in `app/` are Server Components by default; state needs `"use client"` at the top of the file',
        },
      },
      { text: { ru: '`useState` нужно импортировать из `next`', en: '`useState` must be imported from `next`' } },
      { text: { ru: 'Компонент должен быть `async`', en: 'The component must be `async`' } },
      { text: { ru: 'Файл должен называться `client.tsx`', en: 'The file must be named `client.tsx`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В App Router компонент по умолчанию **серверный**: рендерится на сервере, может читать базу и секреты, но в браузер не отправляет свой код, поэтому состояние, эффекты и обработчики в нём недоступны. `"use client"` объявляет границу: этот файл и всё, что он импортирует, попадает в клиентский бандл. Ставят её как можно ниже по дереву — только у интерактивных частей.',
          en: 'In the App Router a component is a **Server Component** by default: it renders on the server and can read the database and secrets, but ships no code to the browser, so state, effects and handlers aren’t available. `"use client"` declares a boundary: this file and everything it imports go into the client bundle. Place it as low in the tree as possible — only on interactive parts.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Server and Client Components', url: `${DOCS}/getting-started/server-and-client-components` }],
  },
  {
    id: 'next-components-props-001',
    topic: 'next',
    tags: ['next-components'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Серверная страница рендерит клиентский `<LikeButton>`. Какой проп передать **нельзя**?',
      en: 'A server page renders a client `<LikeButton>`. Which prop **can’t** be passed?',
    },
    options: [
      { code: '<LikeButton postId={42} />' },
      { code: '<LikeButton label="Like" />' },
      { code: '<LikeButton onLike={() => console.log("liked")} />' },
      { code: '<LikeButton tags={["react", "next"]} />' },
      { code: '<LikeButton initial={{ count: 3, liked: false }} />' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Пропсы из серверного компонента в клиентский идут по сети, поэтому должны быть **сериализуемыми**: строки, числа, массивы, простые объекты, `Date`, промисы. Обычную функцию передать нельзя — её код остался на сервере. Исключение — Server Functions с `"use server"`: клиент получает ссылку и вызывает их запросом.',
          en: 'Props from a Server Component to a Client Component cross the network, so they must be **serializable**: strings, numbers, arrays, plain objects, `Date`, promises. A regular function can’t be passed — its code stays on the server. The exception is Server Functions with `"use server"`: the client gets a reference and calls them via a request.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Passing data from Server to Client Components', url: `${DOCS}/getting-started/server-and-client-components` }],
  },
  {
    id: 'next-components-children-001',
    topic: 'next',
    tags: ['next-components'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: '`Modal` — клиентский компонент со своим состоянием. Внутри нужна `Cart`, которая читает данные на сервере. Как это собрать?',
      en: '`Modal` is a Client Component with its own state. Inside it you need `Cart`, which reads data on the server. How do you compose them?',
    },
    options: [
      { text: { ru: 'Импортировать `Cart` в файл `Modal`', en: 'Import `Cart` into the `Modal` file' } },
      {
        text: {
          ru: 'В серверном родителе передать `<Cart />` в `Modal` как `children`',
          en: 'In a server parent, pass `<Cart />` to `Modal` as `children`',
        },
      },
      { text: { ru: 'Сделать `Cart` клиентским и читать базу из браузера', en: 'Make `Cart` a Client Component and read the database from the browser' } },
      { text: { ru: 'Добавить `"use server"` в начало файла `Modal`', en: 'Add `"use server"` at the top of the `Modal` file' } },
      { text: { ru: 'Так нельзя: серверный компонент не бывает внутри клиентского', en: 'Impossible: a Server Component can’t be inside a Client Component' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Всё, что импортирует клиентский файл, становится клиентским кодом. Но серверный компонент, переданный через `children` или другой проп-слот, рендерится на сервере, а `Modal` получает уже готовый результат. Так клиентская обёртка управляет видимостью, а данные корзины читаются на сервере.',
          en: 'Everything a client file imports becomes client code. But a Server Component passed via `children` or another slot prop renders on the server, and `Modal` receives the finished output. The client wrapper controls visibility while cart data is read on the server.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Interleaving Server and Client Components', url: `${DOCS}/getting-started/server-and-client-components#interleaving-server-and-client-components` }],
  },
  {
    id: 'next-components-server-only-001',
    topic: 'next',
    tags: ['next-components'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Модуль `lib/data.ts` использует секретный ключ API. Как гарантировать, что его случайно не импортируют в клиентский компонент?',
      en: '`lib/data.ts` uses a secret API key. How do you guarantee it’s never accidentally imported into a Client Component?',
    },
    options: [
      { code: "import 'server-only';" },
      { code: "'use server';" },
      { code: 'export const runtime = "nodejs";' },
      { code: "if (typeof window !== 'undefined') throw new Error();" },
      { code: 'export const dynamic = "force-dynamic";' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Пакет `server-only` превращает случайный импорт в клиентский код в **ошибку сборки** — до того, как модуль уедет в браузер. Проверка `typeof window` срабатывает уже после того, как код попал в бандл. `"use server"` означает другое: функции файла становятся Server Functions, доступными клиенту.',
          en: 'The `server-only` package turns an accidental import into client code into a **build error** — before the module reaches the browser. A `typeof window` check only fires after the code is already in the bundle. `"use server"` means something else: the file’s functions become Server Functions callable from the client.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Preventing environment poisoning', url: `${DOCS}/getting-started/server-and-client-components` }],
  },
  {
    id: 'next-data-fetch-cache-001',
    topic: 'next',
    tags: ['next-data'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Кешируется ли по умолчанию `fetch` в серверном компоненте в актуальном Next.js?',
      en: 'Is `fetch` in a Server Component cached by default in current Next.js?',
    },
    options: [
      { text: { ru: 'Да, навсегда', en: 'Yes, forever' } },
      { text: { ru: 'Да, на 60 секунд', en: 'Yes, for 60 seconds' } },
      {
        text: {
          ru: 'Нет: кеш включают явно — `"use cache"` или `cache: \'force-cache\'`',
          en: 'No: caching is opt-in — `"use cache"` or `cache: \'force-cache\'`',
        },
      },
      { text: { ru: 'Только в режиме разработки', en: 'Only in development' } },
      { text: { ru: 'Только POST-запросы', en: 'Only POST requests' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В Next.js 13–14 `fetch` кешировался по умолчанию, и это постоянно удивляло. С 15-й версии запросы по умолчанию **не кешируются**: кеш включают явно — директивой `"use cache"` (Cache Components) или опцией `cache: \'force-cache\'`. Одинаковые `fetch` внутри одного рендера при этом всё равно выполняются один раз — это мемоизация, а не кеш.',
          en: 'In Next.js 13–14 `fetch` was cached by default, which kept surprising people. Since version 15 requests are **not cached** by default: caching is explicit — the `"use cache"` directive (Cache Components) or the `cache: \'force-cache\'` option. Identical `fetch` calls within one render still run once — that’s memoization, not caching.',
        },
      },
    ],
    sources: [
      { title: 'Next.js — Fetching Data', url: `${DOCS}/getting-started/fetching-data` },
      { title: 'Next.js — Caching', url: `${DOCS}/getting-started/caching` },
    ],
  },
  {
    id: 'next-data-revalidate-001',
    topic: 'next',
    tags: ['next-data', 'next-actions'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Server Action создаёт пост, но закешированный список `/posts` показывает старые данные. Что добавить в action?',
      en: 'A Server Action creates a post, but the cached `/posts` list shows stale data. What should the action add?',
    },
    options: [
      { code: "revalidatePath('/posts');" },
      { code: "window.location.reload();" },
      { code: "localStorage.clear();" },
      { code: "export const revalidate = 0;" },
      { code: "router.push('/posts');" },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'После изменения данных кеш нужно сбросить. `revalidatePath(\'/posts\')` помечает страницу устаревшей, и Next.js перерисует её со свежими данными. Точечнее — теги: данные помечают `cacheTag(\'posts\')`, а в action вызывают `updateTag(\'posts\')`. `window` и `router` в серверной функции недоступны.',
          en: 'After changing data the cache must be invalidated. `revalidatePath(\'/posts\')` marks the page stale, and Next.js re-renders it with fresh data. More precise are tags: mark data with `cacheTag(\'posts\')` and call `updateTag(\'posts\')` in the action. `window` and `router` aren’t available in a server function.',
        },
      },
    ],
    sources: [
      { title: 'Next.js — Mutating Data', url: `${DOCS}/getting-started/mutating-data` },
      { title: 'Next.js — revalidatePath', url: `${DOCS}/api-reference/functions/revalidatePath` },
    ],
  },
  {
    id: 'next-data-parallel-001',
    topic: 'next',
    tags: ['next-data'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Профиль и заказы грузятся независимо, но страница ждёт сумму их времени. Как исправить?',
      en: 'The profile and orders load independently, but the page waits for the sum of both. How do you fix it?',
    },
    code: {
      lang: 'tsx',
      source: `export default async function Page() {
  const user = await getUser();
  const orders = await getOrders();
  return <Dashboard user={user} orders={orders} />;
}`,
    },
    options: [
      { code: 'const [user, orders] = await Promise.all([getUser(), getOrders()]);' },
      { code: "'use client';" },
      { code: 'const user = getUser(); const orders = await getOrders();' },
      { code: 'export const dynamic = "force-static";' },
      { code: 'const user = await getUser().then(getOrders);' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Два `await` подряд — водопад: второй запрос стартует только после первого. Независимые запросы запускают одновременно через `Promise.all`. Ещё лучше — разнести их по компонентам за отдельными `<Suspense>`: страница покажется сразу, а блоки появятся по мере готовности.',
          en: 'Two `await`s in a row are a waterfall: the second request starts only after the first. Independent requests start together via `Promise.all`. Even better, split them into components behind separate `<Suspense>`: the page shows immediately and blocks appear as they’re ready.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Parallel data fetching', url: `${DOCS}/getting-started/fetching-data#parallel-data-fetching` }],
  },
  {
    id: 'next-actions-security-001',
    topic: 'next',
    tags: ['next-actions'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Кнопка «Удалить» видна только автору поста и вызывает Server Action `deletePost(id)`. Достаточно ли этого для безопасности?',
      en: 'The “Delete” button is shown only to the post’s author and calls the `deletePost(id)` Server Action. Is that secure enough?',
    },
    options: [
      { text: { ru: 'Да, чужие пользователи не видят кнопку', en: 'Yes, other users don’t see the button' } },
      {
        text: {
          ru: 'Нет: action — публичный POST-эндпоинт, внутри нужно проверить сессию и права на этот пост',
          en: 'No: the action is a public POST endpoint, it must check the session and permissions for this post inside',
        },
      },
      { text: { ru: 'Да, Server Actions доступны только из своего приложения', en: 'Yes, Server Actions are only reachable from your own app' } },
      { text: { ru: 'Да, если id поста — UUID', en: 'Yes, if the post id is a UUID' } },
      { text: { ru: 'Нет, Server Actions нельзя использовать для удаления', en: 'No, Server Actions can’t be used for deletion' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Server Action — это эндпоинт, который вызывается POST-запросом, и отправить такой запрос можно в обход интерфейса. Скрытая кнопка ничего не защищает. Внутри каждой серверной функции: прочитать сессию из cookie, проверить права на конкретный объект, провалидировать входные данные. Удобно собрать такие проверки в одном слое доступа к данным.',
          en: 'A Server Action is an endpoint invoked via a POST request, and such a request can be sent bypassing the UI. A hidden button protects nothing. Inside every server function: read the session from cookies, check permissions for the specific object, validate input. It’s convenient to keep these checks in one data access layer.',
        },
      },
    ],
    sources: [
      { title: 'Next.js — Mutating Data', url: `${DOCS}/getting-started/mutating-data` },
      { title: 'Next.js — use server: security', url: `${DOCS}/api-reference/directives/use-server` },
    ],
  },
  {
    id: 'next-actions-route-handler-001',
    topic: 'next',
    tags: ['next-actions'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Нужен эндпоинт `GET /api/health` для мониторинга. Как его сделать в App Router?',
      en: 'You need a `GET /api/health` endpoint for monitoring. How do you build it in the App Router?',
    },
    options: [
      { code: "// app/api/health/page.tsx\nexport default function Page() { return 'ok'; }" },
      { code: "// app/api/health/route.ts\nexport async function GET() { return Response.json({ ok: true }); }" },
      { code: "// pages/api/health.tsx\nexport default function Health() { return <p>ok</p>; }" },
      { code: "// app/api/health/action.ts\n'use server';\nexport async function GET() { return 'ok'; }" },
      { code: "// proxy.ts\nexport function health() { return 'ok'; }" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Route Handler** — файл `route.ts`, экспортирующий функции по именам HTTP-методов (`GET`, `POST`, …) на Web API `Request`/`Response`. В одной папке не может быть одновременно `route.ts` и `page.tsx` — это конфликт. Server Actions не заменяют эндпоинты: они вызываются только POST и рассчитаны на мутации из интерфейса.',
          en: 'A **Route Handler** is a `route.ts` file exporting functions named after HTTP methods (`GET`, `POST`, …) using the Web `Request`/`Response` APIs. A folder can’t have both `route.ts` and `page.tsx` — that’s a conflict. Server Actions don’t replace endpoints: they’re POST-only and meant for mutations from the UI.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Route Handlers', url: `${DOCS}/getting-started/route-handlers` }],
  },
  {
    id: 'next-optimization-image-001',
    topic: 'next',
    tags: ['next-optimization'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Зачем `next/image` требует `width` и `height` (или `fill`) у картинки?',
      en: 'Why does `next/image` require `width` and `height` (or `fill`)?',
    },
    options: [
      { text: { ru: 'Чтобы обрезать картинку до этих размеров', en: 'To crop the image to those dimensions' } },
      {
        text: {
          ru: 'Чтобы заранее зарезервировать место и не было сдвига макета (CLS)',
          en: 'To reserve space in advance so there’s no layout shift (CLS)',
        },
      },
      { text: { ru: 'Для SEO: поисковики читают размеры', en: 'For SEO: search engines read dimensions' } },
      { text: { ru: 'Без них картинка не попадёт в бандл', en: 'Without them the image isn’t bundled' } },
      { text: { ru: 'Это требование только для SVG', en: 'It’s required only for SVG' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Зная пропорции, браузер оставляет под картинку место до загрузки, и текст не «прыгает». `next/image` также отдаёт картинки в нужном размере и современном формате и по умолчанию грузит их лениво. Картинке первого экрана (LCP) в Next.js 16 ставят `preload` — прежний `priority` объявлен устаревшим.',
          en: 'Knowing the aspect ratio, the browser reserves space before loading, so text doesn’t “jump”. `next/image` also serves images at the right size and in modern formats and lazy-loads by default. For the above-the-fold (LCP) image Next.js 16 uses `preload` — the former `priority` is deprecated.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Image Component', url: `${DOCS}/api-reference/components/image` }],
  },
  {
    id: 'next-optimization-font-001',
    topic: 'next',
    tags: ['next-optimization'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Шрифт подключён через `next/font/google`. Что происходит при загрузке страницы?',
      en: 'A font is loaded via `next/font/google`. What happens when the page loads?',
    },
    options: [
      { text: { ru: 'Браузер скачивает шрифт с серверов Google', en: 'The browser downloads the font from Google’s servers' } },
      {
        text: {
          ru: 'Файлы шрифта скачаны при сборке и отдаются с вашего домена, запросов к Google нет',
          en: 'Font files were downloaded at build time and are served from your domain, with no requests to Google',
        },
      },
      { text: { ru: 'Шрифт встраивается в каждый HTML как base64', en: 'The font is embedded in every HTML as base64' } },
      { text: { ru: 'Шрифт грузится только после гидрации', en: 'The font loads only after hydration' } },
      { text: { ru: 'Next.js подбирает системный шрифт вместо Google', en: 'Next.js substitutes a system font for Google’s' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`next/font` скачивает CSS и файлы шрифта при сборке и раздаёт их вместе со статикой: нет лишнего соединения с другим доменом и не утекают данные пользователей в Google. Плюс запасной шрифт подгоняется по метрикам, поэтому смена шрифта не сдвигает макет.',
          en: '`next/font` downloads the CSS and font files at build time and serves them with your static assets: no extra connection to another domain and no user data leaking to Google. Plus the fallback font is metric-adjusted, so the font swap doesn’t shift the layout.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Font Module', url: `${DOCS}/api-reference/components/font` }],
  },
  {
    id: 'next-optimization-link-001',
    topic: 'next',
    tags: ['next-optimization', 'next-routing'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Чем `<Link href="/about">` отличается от `<a href="/about">` в Next.js?',
      en: 'How does `<Link href="/about">` differ from `<a href="/about">` in Next.js?',
    },
    options: [
      { text: { ru: 'Ничем, это одно и то же', en: 'No difference, they’re the same' } },
      {
        text: {
          ru: '`Link` переходит без полной перезагрузки и заранее подгружает маршрут, попавший во вьюпорт',
          en: '`Link` navigates without a full reload and prefetches routes that enter the viewport',
        },
      },
      { text: { ru: '`Link` открывает страницу в новой вкладке', en: '`Link` opens the page in a new tab' } },
      { text: { ru: '`a` нельзя использовать в Next.js', en: '`a` can’t be used in Next.js' } },
      { text: { ru: '`Link` работает только для внешних ссылок', en: '`Link` only works for external links' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`<Link>` рендерит тот же `<a>`, но перехватывает клик: переход происходит на клиенте, общие layout и их состояние сохраняются. Когда ссылка попадает во вьюпорт, Next.js заранее подгружает маршрут, и переход ощущается мгновенным. Обычный `<a>` перезагружает страницу целиком.',
          en: '`<Link>` renders the same `<a>` but intercepts the click: navigation happens on the client, shared layouts and their state are kept. When the link enters the viewport, Next.js prefetches the route, so navigation feels instant. A plain `<a>` reloads the whole page.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Link Component', url: `${DOCS}/api-reference/components/link` }],
  },
];
