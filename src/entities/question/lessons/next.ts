import type { Lesson } from '../model/types';

const DOCS = 'https://nextjs.org/docs/app';

export const NEXT_LESSONS: Lesson[] = [
  {
    tag: 'next-routing',
    format: 'steps',
    summary: {
      ru: 'В App Router адреса задаются папками, а поведение страницы — специальными файлами внутри них. Разобравшись, что делает каждый файл и как они вкладываются друг в друга, легко объяснить сохранённое состояние, заглушки загрузки и обработку ошибок.',
      en: 'In the App Router, addresses come from folders and page behavior from special files inside them. Once you know what each file does and how they nest, preserved state, loading placeholders and error handling are easy to explain.',
    },
    steps: [
      {
        id: 'files',
        title: { ru: 'Папки — это адреса', en: 'Folders are addresses' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Папки в `app/` задают сегменты адреса, а публичным маршрут делает только файл `page`: `/blog` — это `app/blog/page.tsx`. Остальные файлы в папке страницу не открывают. `[slug]` — динамический сегмент, `[...slug]` — один и более сегментов массивом, `[[...slug]]` — то же, но необязательное: подойдёт и сам `/shop`. Папка в скобках `(marketing)` — группа маршрутов: она упорядочивает код и даёт разделам свои layout, но в адрес не попадает.',
              en: 'Folders in `app/` define address segments, and only a `page` file makes a route public: `/blog` is `app/blog/page.tsx`. Other files in the folder don’t open a page. `[slug]` is a dynamic segment, `[...slug]` one or more segments as an array, `[[...slug]]` the same but optional: plain `/shop` matches too. A folder in parentheses, `(marketing)`, is a route group: it organizes code and gives sections their own layouts but stays out of the URL.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'text',
              source: 'app/blog/page.tsx       → /blog\napp/blog/[slug]/page.tsx → /blog/a\napp/(shop)/cart/page.tsx → /cart',
            },
          },
        ],
        test: ['next-routing-files-001'],
      },
      {
        id: 'layouts',
        title: { ru: 'layout и template', en: 'layout and template' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`layout` общий для всех вложенных страниц: при переходе между ними он **не перемонтируется** и сохраняет состояние — текст в поиске бокового меню останется, меняется только `children`. `template` оборачивает страницы так же, но получает уникальный ключ на каждый маршрут: при переходе он **монтируется заново**, эффекты запускаются снова, а состояние сбрасывается. Его берут для анимации появления страницы или сброса полей при каждом переходе.',
              en: 'A `layout` is shared by all nested pages: navigating between them **doesn’t remount** it, and its state survives — text in a sidebar search stays, only `children` changes. A `template` wraps pages the same way but gets a unique key per route: on navigation it **remounts**, effects run again and state resets. Use it for page enter animations or resetting fields on every navigation.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'layout-effect',
              prompt: {
                ru: 'В `layout.tsx` раздела есть `useEffect`, который логирует открытие. Сработает ли он при переходе между страницами раздела?',
                en: 'A section’s `layout.tsx` has a `useEffect` that logs an open. Does it fire when navigating between the section’s pages?',
              },
              options: [
                { text: { ru: 'Да, при каждом переходе', en: 'Yes, on every navigation' } },
                { text: { ru: 'Нет: layout не перемонтируется', en: 'No: the layout doesn’t remount' } },
                { text: { ru: 'Только на сервере', en: 'Only on the server' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Общий layout живёт, пока вы внутри раздела. Чтобы эффект срабатывал на каждый переход, нужен `template.tsx`.',
                en: 'A shared layout lives while you stay in the section. For an effect on every navigation, use `template.tsx`.',
              },
            },
          },
        ],
        test: ['next-routing-layout-001', 'next-routing-template-001'],
      },
      {
        id: 'special-files',
        title: { ru: 'loading, error и вложенность', en: 'loading, error and nesting' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Специальные файлы сегмента вкладываются друг в друга: `layout` → `template` → `error` → `loading` → `not-found` → `page`. `loading.tsx` — граница Suspense вокруг страницы: при переходе сразу показывается заглушка, а layout остаётся интерактивным. `error.tsx` — Error Boundary. Он снаружи `loading`, поэтому ловит и ошибки при загрузке, но лежит **внутри** layout того же сегмента: ошибку в layout ловит граница уровнем выше, а для корневого — `global-error.tsx`.',
              en: 'A segment’s special files nest inside each other: `layout` → `template` → `error` → `loading` → `not-found` → `page`. `loading.tsx` is a Suspense boundary around the page: navigation shows a placeholder at once while the layout stays interactive. `error.tsx` is an Error Boundary. It sits outside `loading`, so it catches loading errors too, but **inside** the same segment’s layout: an error in that layout is caught a level up, and for the root one by `global-error.tsx`.',
            },
          },
          {
            type: 'illustration',
            illustration: 'next-file-nesting',
          },
        ],
        test: ['next-routing-hierarchy-001', 'next-routing-loading-001'],
      },
      {
        id: 'navigation',
        title: { ru: 'Навигация из кода', en: 'Navigating from code' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В App Router хуки навигации берут из `next/navigation`: `next/router` — от старого Pages Router и в `app/` не работает. `router.push(\'/dashboard\')` делает клиентский переход с сохранением общих layout. `usePathname()` даёт текущий путь — например, чтобы подсветить активный пункт меню; для этого меню выносят в клиентский компонент. А чтобы показать 404 для несуществующей записи, вызывают `notFound()`: он прерывает рендер и показывает ближайший `not-found.tsx` с настоящим статусом 404.',
              en: 'In the App Router, navigation hooks come from `next/navigation`: `next/router` belongs to the old Pages Router and doesn’t work in `app/`. `router.push(\'/dashboard\')` performs a client navigation that keeps shared layouts. `usePathname()` gives the current path — say, to highlight the active menu item; the menu moves into a client component for that. And to show a 404 for a missing record, call `notFound()`: it aborts rendering and shows the nearest `not-found.tsx` with a real 404 status.',
            },
          },
        ],
        test: ['next-routing-use-router-001', 'next-routing-not-found-001'],
      },
      {
        id: 'proxy',
        title: { ru: 'proxy.ts и редиректы', en: 'proxy.ts and redirects' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`proxy.ts` в корне проекта — так в Next.js 16 переименовали `middleware.ts` — выполняется **до** того, как запрос дойдёт до маршрута: делает редиректы и переписывание адресов, меняет заголовки, проверяет наличие сессии. Имя сменили, потому что «middleware» путали с цепочкой Express. Постоянные редиректы, известные заранее, — например, переезд `/blog/:slug` на `/posts/:slug`, — удобнее задать в `redirects()` в `next.config` с `permanent: true`.',
              en: '`proxy.ts` at the project root — Next.js 16’s new name for `middleware.ts` — runs **before** a request reaches a route: it redirects and rewrites URLs, changes headers, checks for a session. It was renamed because “middleware” got confused with the Express chain. Permanent redirects known in advance — say, moving `/blog/:slug` to `/posts/:slug` — are easier to declare in `redirects()` in `next.config` with `permanent: true`.',
            },
          },
        ],
        test: ['next-routing-proxy-001'],
      },
    ],
    keyPoints: [
      { ru: 'Папка — сегмент, `page` — публичный маршрут, `(группа)` — не в адресе.', en: 'A folder is a segment, `page` a public route, `(group)` stays out of the URL.' },
      { ru: '`layout` сохраняет состояние, `template` монтируется заново.', en: '`layout` keeps state; `template` remounts.' },
      { ru: '`loading` — Suspense, `error` — Error Boundary внутри layout.', en: '`loading` is Suspense; `error` is an Error Boundary inside the layout.' },
      { ru: 'Навигация — `next/navigation`, 404 — `notFound()`.', en: 'Navigation via `next/navigation`; 404 via `notFound()`.' },
    ],
    sources: [
      { title: 'Next.js — Project structure', url: `${DOCS}/getting-started/project-structure` },
      { title: 'Next.js — Layouts and Pages', url: `${DOCS}/getting-started/layouts-and-pages` },
      { title: 'Next.js — Dynamic Route Segments', url: `${DOCS}/api-reference/file-conventions/dynamic-routes` },
      { title: 'Next.js — proxy.js', url: `${DOCS}/api-reference/file-conventions/proxy` },
    ],
  },
  {
    tag: 'next-rendering',
    format: 'steps',
    summary: {
      ru: 'Next.js старается отрендерить как можно больше заранее, а остальное — во время запроса и потоком. Понимая, что делает страницу динамической и как работает стриминг, можно получить быстрые страницы и не наткнуться на ошибки гидрации.',
      en: 'Next.js tries to render as much as possible ahead of time and the rest per request, streamed. Knowing what makes a page dynamic and how streaming works gets you fast pages without hydration errors.',
    },
    steps: [
      {
        id: 'static-dynamic',
        title: { ru: 'Статическая или динамическая', en: 'Static or dynamic' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'По умолчанию страница рендерится при сборке. API времени запроса — `cookies()`, `headers()`, `searchParams` — неизвестны на этапе сборки, поэтому одна такая строка переводит страницу в динамический режим: рендер на каждый запрос. С Next.js 15 `params` и `searchParams` — **промисы**: в серверной странице их ждут через `await`, а в клиентском компоненте читают через `use()`. Так Next.js рендерит статические части, не дожидаясь параметров.',
              en: 'By default a page renders at build time. Request-time APIs — `cookies()`, `headers()`, `searchParams` — are unknown at build, so one such line makes the page dynamic: rendered on every request. Since Next.js 15, `params` and `searchParams` are **promises**: a server page awaits them, and a client component reads them with `use()`. That lets Next.js render static parts without waiting for parameters.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'tsx',
              source: 'export default async function Page({\n  params,\n}) {\n  const { slug } = await params;\n  return <Post slug={slug} />;\n}',
            },
          },
        ],
        test: ['next-rendering-dynamic-001', 'next-rendering-search-params-001'],
      },
      {
        id: 'static-params-isr',
        title: { ru: 'Статика для динамических адресов', en: 'Static pages for dynamic routes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`generateStaticParams` в `app/blog/[slug]/page.tsx` возвращает список параметров, и для каждого Next.js рендерит страницу при сборке — статика для динамического маршрута. Можно вернуть только популярные `slug`, остальные отрендерятся при первом запросе. Чтобы такие страницы обновлялись без пересборки, есть **инкрементальная регенерация**: `fetch(url, { next: { revalidate: 3600 } })` — страница отдаётся из кеша, а через час первый запрос запускает фоновую перегенерацию.',
              en: '`generateStaticParams` in `app/blog/[slug]/page.tsx` returns a list of params, and Next.js renders a page for each at build time — static pages for a dynamic route. You can return just the popular slugs; the rest render on first request. To refresh such pages without rebuilding there’s **incremental regeneration**: `fetch(url, { next: { revalidate: 3600 } })` — the page is served from cache, and after an hour the first request triggers a background regeneration.',
            },
          },
        ],
        test: ['next-rendering-static-params-001', 'next-rendering-isr-001'],
      },
      {
        id: 'streaming',
        title: { ru: 'Стриминг и Suspense', en: 'Streaming and Suspense' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Сервер может отправлять HTML **кусками**. Всё вне `<Suspense>` уходит сразу, на месте медленного блока — `fallback`, а когда данные готовы, тот же ответ досылает разметку блока. Так быстрый заголовок не ждёт трёхсекундных рекомендаций. С Cache Components Next.js заранее собирает **статическую оболочку** — всё до ближайших `<Suspense>` вокруг некешируемых данных, вместе с их заглушками, — и отдаёт её мгновенно, а «дыры» заполняются потоком.',
              en: 'The server can send HTML **in chunks**. Everything outside `<Suspense>` goes out at once, the slow block shows its `fallback`, and when the data is ready the same response streams in the block’s markup. That way a fast header doesn’t wait for three-second recommendations. With Cache Components, Next.js prebuilds a **static shell** — everything up to the nearest `<Suspense>` around uncached data, fallbacks included — and serves it instantly while the “holes” stream in.',
            },
          },
          {
            type: 'illustration',
            illustration: 'next-static-shell',
          },
        ],
        test: ['next-rendering-streaming-001'],
      },
      {
        id: 'hydration',
        title: { ru: 'Ошибки гидрации', en: 'Hydration errors' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Гидрация** — React «оживляет» HTML с сервера и ожидает, что первый рендер на клиенте даст ту же разметку. Если результат зависит от того, где идёт рендер, разметка не совпадает и возникает ошибка гидрации. Так ломают её текущее время, `Math.random()`, проверки `typeof window` прямо в рендере и форматирование по локали браузера. Такие значения показывают после монтирования — в `useEffect` — или вычисляют один раз на сервере и передают пропом.',
              en: '**Hydration** is React “bringing to life” server HTML, expecting the first client render to produce the same markup. If the output depends on where rendering happens, the markup differs and a hydration error occurs. The current time, `Math.random()`, `typeof window` checks right in render and browser-locale formatting all break it. Show such values after mounting — in `useEffect` — or compute them once on the server and pass them as props.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'hydration-random',
              prompt: {
                ru: 'Компонент рендерит `<span>{Math.random()}</span>`. Что произойдёт при загрузке страницы?',
                en: 'A component renders `<span>{Math.random()}</span>`. What happens on page load?',
              },
              options: [
                { text: { ru: 'Ничего: число просто будет случайным', en: 'Nothing: the number is just random' } },
                { text: { ru: 'Ошибка гидрации: число на сервере и в браузере разное', en: 'A hydration error: the number differs on server and client' } },
                { text: { ru: 'Страница не соберётся', en: 'The page won’t build' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Сервер и клиент вызовут `Math.random()` отдельно и получат разные значения — разметка не совпадёт.',
                en: 'Server and client call `Math.random()` separately and get different values — the markup won’t match.',
              },
            },
          },
        ],
        test: ['next-rendering-hydration-001'],
      },
      {
        id: 'build-time',
        title: { ru: 'Что фиксируется при сборке', en: 'What’s fixed at build time' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Переменные с префиксом `NEXT_PUBLIC_` Next.js подставляет в JavaScript **при сборке**: после `next build` они заморожены, и один образ на stage и проде покажет в браузере тот адрес, что был при сборке. С `output: \'export\'` сервера Next.js нет вовсе — не работают Server Actions, `cookies()`, `proxy.ts` и оптимизация картинок. Метаданные страницы задают экспортом `metadata` или `generateMetadata`: они вычисляются на сервере и сразу попадают в HTML.',
              en: 'Variables prefixed `NEXT_PUBLIC_` are inlined into JavaScript **at build time**: after `next build` they’re frozen, and one image on stage and prod shows the browser whatever address existed at build. With `output: \'export\'` there’s no Next.js server at all — Server Actions, `cookies()`, `proxy.ts` and image optimization don’t work. Page metadata comes from a `metadata` export or `generateMetadata`: computed on the server and placed straight into the HTML.',
            },
          },
        ],
        test: ['next-rendering-env-001', 'next-rendering-metadata-001'],
      },
    ],
    keyPoints: [
      { ru: '`cookies()`, `headers()`, `searchParams` делают страницу динамической.', en: '`cookies()`, `headers()`, `searchParams` make a page dynamic.' },
      { ru: '`generateStaticParams` — статика для динамических адресов, `revalidate` — обновление.', en: '`generateStaticParams` prebuilds dynamic routes; `revalidate` refreshes them.' },
      { ru: '`<Suspense>` — граница стриминга и статической оболочки.', en: '`<Suspense>` bounds streaming and the static shell.' },
      { ru: 'Время и случайность в рендере ломают гидрацию.', en: 'Time and randomness in render break hydration.' },
      { ru: '`NEXT_PUBLIC_` вшивается при сборке.', en: '`NEXT_PUBLIC_` is baked in at build time.' },
    ],
    sources: [
      { title: 'Next.js — generateStaticParams', url: `${DOCS}/api-reference/functions/generate-static-params` },
      { title: 'Next.js — Streaming', url: `${DOCS}/api-reference/file-conventions/loading` },
      { title: 'Next.js — Hydration error', url: 'https://nextjs.org/docs/messages/react-hydration-error' },
      { title: 'Next.js — Environment Variables', url: `${DOCS}/guides/environment-variables` },
    ],
  },
  {
    tag: 'next-components',
    format: 'steps',
    summary: {
      ru: 'В App Router компонент по умолчанию серверный, а клиентский — исключение со своей границей. Почти все вопросы про Next.js сводятся к тому, где проходит эта граница, что через неё можно передать и как не утащить серверный код в браузер.',
      en: 'In the App Router a component is server-side by default, and a client component is an exception with its own boundary. Nearly every Next.js question is about where that boundary runs, what can cross it and how not to drag server code into the browser.',
    },
    steps: [
      {
        id: 'server-default',
        title: { ru: 'Серверные по умолчанию', en: 'Server by default' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Компонент в `app/` по умолчанию — [[rsc|серверный]]: рендерится на сервере, может читать базу и секреты, но в браузер не отправляет свой код. Поэтому `useState`, эффекты и обработчики в нём недоступны — для них в начале файла пишут `"use client"`. Зато зависимости серверного компонента в бандл не попадают: разбор Markdown библиотекой на 200 КБ выполнится на сервере, а пользователь получит только готовый HTML.',
              en: 'A component in `app/` is [[rsc|server-side]] by default: it renders on the server, can read the database and secrets, but sends no code to the browser. So `useState`, effects and handlers aren’t available in it — those need `"use client"` at the top of the file. In return, a server component’s dependencies stay out of the bundle: a 200 KB Markdown library runs on the server, and the user gets only finished HTML.',
            },
          },
        ],
        test: ['next-components-default-001', 'next-components-bundle-001'],
      },
      {
        id: 'props',
        title: { ru: 'Что можно передать клиенту', en: 'What can cross to the client' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Пропсы из серверного компонента в клиентский идут по сети, поэтому должны быть **сериализуемыми**: строки, числа, массивы, простые объекты, `Date`, промисы. Обычную функцию вроде `onLike={() => …}` передать нельзя — её код остался на сервере. Промис передать можно: загрузка начинается на сервере сразу, а клиентский компонент читает результат хуком `use(posts)`, пока ближайший `<Suspense>` показывает заглушку.',
              en: 'Props from a server component to a client component travel over the network, so they must be **serializable**: strings, numbers, arrays, plain objects, `Date`, promises. A regular function like `onLike={() => …}` can’t be passed — its code stays on the server. A promise can: loading starts on the server right away, and the client component reads the result with the `use(posts)` hook while the nearest `<Suspense>` shows a placeholder.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: "'use client';\nexport function Feed({ items }) {\n  const list = use(items);\n  return <List data={list} />;\n}",
            },
          },
        ],
        test: ['next-components-props-001', 'next-components-use-promise-001'],
      },
      {
        id: 'children',
        title: { ru: 'Серверное внутри клиентского', en: 'Server inside client' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Всё, что **импортирует** клиентский файл, становится клиентским кодом. Но серверный компонент, переданный через `children` или другой проп-слот, рендерится на сервере, а клиентский получает уже готовый результат. Так серверная `Cart` живёт внутри клиентской `Modal`. По той же схеме подключают контекст: провайдер выносят в файл с `"use client"`, который принимает `children`, а корневой layout остаётся серверным.',
              en: 'Everything a client file **imports** becomes client code. But a server component passed through `children` or another slot prop renders on the server, and the client component receives a finished result. That’s how a server `Cart` lives inside a client `Modal`. Context is wired the same way: the provider moves into a `"use client"` file that accepts `children`, and the root layout stays server-side.',
            },
          },
          { type: 'diagram', diagram: 'next-client-boundary' },
        ],
        test: ['next-components-children-001', 'next-components-context-001'],
      },
      {
        id: 'boundaries',
        title: { ru: 'Граница сервера и клиента', en: 'The server–client boundary' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Компонент из npm с `useState`, но без `"use client"` упадёт в серверной странице: Next.js не знает, что ему нужен браузер. Лечится обёрткой из двух строк — свой файл с `"use client"`, который реэкспортирует компонент. Обратная защита — `import \'server-only\'` в модуле с секретами: случайный импорт в клиентский код станет **ошибкой сборки**. Не путайте с `"use server"`: он, наоборот, открывает экспортируемые функции наружу как Server Actions.',
              en: 'An npm component with `useState` but no `"use client"` crashes in a server page: Next.js doesn’t know it needs a browser. The fix is a two-line wrapper — your own `"use client"` file that re-exports the component. The opposite guard is `import \'server-only\'` in a module with secrets: an accidental import into client code becomes a **build error**. Don’t confuse it with `"use server"`: that one, on the contrary, exposes exported functions as Server Actions.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'server-only-vs-window',
              prompt: {
                ru: 'Чем `import \'server-only\'` лучше проверки `if (typeof window !== \'undefined\') throw …`?',
                en: 'Why is `import \'server-only\'` better than `if (typeof window !== \'undefined\') throw …`?',
              },
              options: [
                { text: { ru: 'Ничем, это одно и то же', en: 'It isn’t, they’re the same' } },
                { text: { ru: 'Ошибка возникает при сборке, до того как код с секретом уйдёт в браузер', en: 'The error happens at build time, before code with secrets ships to the browser' } },
                { text: { ru: 'Ускоряет серверный рендер', en: 'It speeds up server rendering' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Проверка `window` срабатывает только в браузере, когда модуль уже попал в бандл вместе с секретом. `server-only` не даёт собрать такой бандл.',
                en: 'The `window` check runs only in the browser, when the module — secret included — is already in the bundle. `server-only` stops that bundle from being built.',
              },
            },
          },
        ],
        test: ['next-components-third-party-001', 'next-components-server-only-001'],
      },
    ],
    keyPoints: [
      { ru: 'По умолчанию серверный; состояние и обработчики — с `"use client"`.', en: 'Server by default; state and handlers need `"use client"`.' },
      { ru: 'Клиенту — только сериализуемые пропсы и промисы.', en: 'Only serializable props and promises cross to the client.' },
      { ru: 'Серверный внутри клиентского — через `children`.', en: 'Server inside client — via `children`.' },
      { ru: '`server-only` защищает секреты, `"use server"` открывает функции.', en: '`server-only` guards secrets; `"use server"` exposes functions.' },
    ],
    sources: [
      { title: 'Next.js — Server and Client Components', url: `${DOCS}/getting-started/server-and-client-components` },
      { title: 'React — use', url: 'https://react.dev/reference/react/use' },
      { title: 'React — "use client"', url: 'https://react.dev/reference/rsc/use-client' },
    ],
  },
  {
    tag: 'next-data',
    format: 'steps',
    summary: {
      ru: 'В App Router данные загружают прямо в серверных компонентах, а кеш включают явно. Важно не строить водопады запросов, не ходить в базу дважды за рендер и правильно сбрасывать кеш после изменений.',
      en: 'In the App Router, data loads right inside server components, and caching is opt-in. The key is avoiding request waterfalls, not hitting the database twice per render and invalidating the cache correctly after changes.',
    },
    steps: [
      {
        id: 'server-fetch',
        title: { ru: 'Данные в серверном компоненте', en: 'Data in a server component' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '[[rsc|Серверный компонент]] и так выполняется на сервере: он может читать базу напрямую через ORM, а секреты остаются там же. Свой Route Handler для этого — лишний HTTP-запрос сервера к самому себе. С Next.js 15 `fetch` по умолчанию **не кешируется** — в 13–14 было наоборот, и это постоянно удивляло. Кеш включают явно: директивой `"use cache"` или опцией `cache: \'force-cache\'`.',
              en: 'A [[rsc|server component]] already runs on the server: it can read the database directly through an ORM, and secrets stay put. A Route Handler for this is a pointless HTTP request from the server to itself. Since Next.js 15, `fetch` is **not cached** by default — in 13–14 it was the opposite, which kept surprising people. Caching is enabled explicitly: with the `"use cache"` directive or the `cache: \'force-cache\'` option.',
            },
          },
        ],
        test: ['next-data-direct-db-001', 'next-data-fetch-cache-001'],
      },
      {
        id: 'waterfalls',
        title: { ru: 'Водопады запросов', en: 'Request waterfalls' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Два `await` подряд — **водопад**: второй запрос стартует только после первого, и страница ждёт сумму их времени. Независимые запросы запускают одновременно через `Promise.all` — ждать придётся только самый долгий. Ещё лучше разнести их по компонентам за отдельными `<Suspense>`: каждый блок появится, как только готовы его данные.',
              en: 'Two `await`s in a row form a **waterfall**: the second request starts only after the first, and the page waits for their combined time. Independent requests are started together with `Promise.all` — you wait only for the slowest. Better still, split them into components behind separate `<Suspense>` boundaries: each block appears as soon as its data is ready.',
            },
          },
          { type: 'diagram', diagram: 'next-data-waterfall' },
        ],
        test: ['next-data-parallel-001'],
      },
      {
        id: 'dedupe',
        title: { ru: 'Один запрос на рендер', en: 'One query per render' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`layout` и `page` часто нуждаются в одних и тех же данных. Одинаковые вызовы `fetch` за один рендер Next.js объединяет сам, но эта [[memoization|мемоизация]] распространяется **только** на `fetch`. Для запросов к базе через ORM есть `cache` из React: обёрнутая функция с теми же аргументами в рамках одного запроса вернёт один результат. Между запросами пользователей этот кеш не живёт.',
              en: '`layout` and `page` often need the same data. Next.js merges identical `fetch` calls within one render, but that [[memoization|memoization]] applies **only** to `fetch`. For ORM database queries there’s React’s `cache`: a wrapped function with the same arguments returns one result within a single request. This cache doesn’t survive across user requests.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "import { cache } from 'react';\n\nexport const getProduct = cache(\n  async (slug: string) =>\n    db.product.findFirst({\n      where: { slug },\n    }),\n);",
            },
          },
        ],
        test: ['next-data-react-cache-001'],
      },
      {
        id: 'use-cache',
        title: { ru: 'Директива use cache', en: 'The use cache directive' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'С Cache Components `"use cache"` в начале асинхронной функции или компонента кеширует результат на сервере целиком — в том числе запросы к базе, а не только `fetch`. Ключ строится из аргументов, поэтому у каждого `accountId` своя запись. Срок жизни задаёт `cacheLife(\'hours\')`, а `cacheTag(\'orders\')` помечает запись тегом, чтобы потом сбросить её точечно.',
              en: 'With Cache Components, `"use cache"` at the top of an async function or component caches the whole result on the server — database queries included, not just `fetch`. The key is built from the arguments, so each `accountId` gets its own entry. `cacheLife(\'hours\')` sets the lifetime, and `cacheTag(\'orders\')` tags the entry so it can be invalidated precisely later.',
            },
          },
        ],
        test: ['next-data-use-cache-001'],
      },
      {
        id: 'revalidate',
        title: { ru: 'Сброс кеша после изменений', en: 'Invalidating after changes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'После изменения данных кеш нужно сбросить. `revalidatePath(\'/posts\')` помечает страницу устаревшей, и Next.js перерисует её со свежими данными; точечнее — `revalidateTag` по тегу. В Next.js 16 для сценария «сохранил профиль — сразу вижу новые данные» есть `updateTag`: следующий запрос дождётся свежих данных, а не отдаст старые. На клиенте `router.refresh()` заново запрашивает серверные компоненты страницы, сохраняя поля ввода и прокрутку.',
              en: 'After data changes, the cache must be invalidated. `revalidatePath(\'/posts\')` marks the page stale, and Next.js re-renders it with fresh data; more precise is `revalidateTag` by tag. In Next.js 16, for the “saved my profile — want to see it now” case there’s `updateTag`: the next request waits for fresh data instead of serving the old. On the client, `router.refresh()` re-requests the page’s server components while keeping inputs and scroll.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'revalidate-where',
              prompt: {
                ru: 'Server Action добавил комментарий. Где вызвать `revalidatePath`?',
                en: 'A Server Action added a comment. Where should `revalidatePath` be called?',
              },
              options: [
                { text: { ru: 'В клиентском компоненте после клика', en: 'In the client component after the click' } },
                { text: { ru: 'В самом action после записи в базу', en: 'In the action itself after the database write' } },
                { text: { ru: 'Нигде — Next.js сбросит кеш сам', en: 'Nowhere — Next.js invalidates by itself' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Сбросить серверный кеш может только серверный код — сразу после того, как данные изменились. Сам Next.js не знает, что база поменялась.',
                en: 'Only server code can invalidate the server cache — right after the data changed. Next.js has no idea the database changed.',
              },
            },
          },
        ],
        test: ['next-data-revalidate-001'],
      },
      {
        id: 'after',
        title: { ru: 'Работа после ответа', en: 'Work after the response' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`after(() => sendAnalytics(event))` из `next/server` планирует работу на момент, **когда ответ уже отправлен**: логирование, аналитика, синхронизация — пользователь их не ждёт. `await` перед ответом замедлил бы каждую страницу, а `setTimeout` в серверной среде может не выполниться: функцию остановят сразу после ответа.',
              en: '`after(() => sendAnalytics(event))` from `next/server` schedules work for **after the response has been sent**: logging, analytics, syncing — the user doesn’t wait for them. An `await` before the response would slow every page, and a `setTimeout` in a serverless environment may never run: the function is stopped right after responding.',
            },
          },
        ],
        test: ['next-data-after-001'],
      },
    ],
    keyPoints: [
      { ru: 'Серверный компонент читает базу напрямую.', en: 'A server component reads the database directly.' },
      { ru: '`fetch` не кешируется по умолчанию — кеш включают явно.', en: '`fetch` isn’t cached by default — caching is opt-in.' },
      { ru: 'Независимые запросы — `Promise.all` или отдельные `<Suspense>`.', en: 'Independent requests — `Promise.all` or separate `<Suspense>`.' },
      { ru: 'Повтор запроса к базе за рендер — `React.cache`.', en: 'Repeated DB queries per render — `React.cache`.' },
      { ru: 'После изменений — `revalidatePath`, `revalidateTag`, `updateTag`.', en: 'After changes — `revalidatePath`, `revalidateTag`, `updateTag`.' },
    ],
    sources: [
      { title: 'Next.js — Fetching Data', url: `${DOCS}/getting-started/fetching-data` },
      { title: 'Next.js — Caching', url: `${DOCS}/getting-started/caching` },
      { title: 'Next.js — Revalidating', url: `${DOCS}/getting-started/revalidating` },
      { title: 'Next.js — after', url: `${DOCS}/api-reference/functions/after` },
    ],
  },
  {
    tag: 'next-actions',
    format: 'steps',
    summary: {
      ru: 'Server Actions — серверные функции, которые форма или клиентский компонент вызывает как обычную функцию. Под капотом это POST-эндпоинт, и из этого следуют правила безопасности, работа без JavaScript и ограничения.',
      en: 'Server Actions are server functions that a form or client component calls like a regular function. Under the hood each is a POST endpoint, and that dictates the security rules, JavaScript-free behavior and limits.',
    },
    steps: [
      {
        id: 'server-actions',
        title: { ru: 'Server Action в форме', en: 'A Server Action in a form' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Функция с `"use server"` передаётся форме: `<form action={createPost}>`. Next.js превращает `action` в настоящий атрибут формы, поэтому без JavaScript браузер отправит её обычным POST, и action выполнится — это прогрессивное улучшение. Когда JS загрузится, React перехватывает отправку без перезагрузки. Внутри action после записи вызывают `redirect`. Он работает, **бросая** служебную ошибку, поэтому общий `catch` его перехватит: `redirect` вызывают после блока `try/catch`.',
              en: 'A `"use server"` function is passed to a form: `<form action={createPost}>`. Next.js turns `action` into a real form attribute, so without JavaScript the browser submits a plain POST and the action runs — progressive enhancement. Once JS loads, React intercepts the submit without a reload. After the write, the action calls `redirect`. It works by **throwing** an internal error, so a general `catch` swallows it: call `redirect` after the `try/catch` block.',
            },
          },
          { type: 'diagram', diagram: 'next-action-flow' },
        ],
        test: ['next-actions-forms-001'],
      },
      {
        id: 'security',
        title: { ru: 'Action — публичный эндпоинт', en: 'An action is a public endpoint' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Server Action вызывается POST-запросом, и отправить такой запрос можно в обход интерфейса. Кнопка «Удалить», видимая только автору, ничего не защищает. Внутри каждой серверной функции: прочитать сессию, проверить права именно на этот объект, провалидировать входные данные. Относитесь к action как к API-маршруту, а не как к внутренней функции.',
              en: 'A Server Action is invoked by a POST request, and such a request can be sent bypassing the UI. A “Delete” button visible only to the author protects nothing. Inside every server function: read the session, check permissions on this exact object, validate the input. Treat an action like an API route, not an internal function.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "'use server';\nexport async function deletePost(id) {\n  const user = await getSession();\n  const post = await getPost(id);\n  if (post.authorId !== user?.id) {\n    throw new Error('Forbidden');\n  }\n  await db.post.delete({\n    where: { id },\n  });\n}",
            },
          },
        ],
        test: ['next-actions-security-001'],
      },
      {
        id: 'form-state',
        title: { ru: 'Состояние формы', en: 'Form state' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`useActionState` оборачивает action: возвращает последнее состояние — то, что action вернул, например `{ errors }`, — новую функцию для `action` формы и флаг `pending`. Ошибки валидации action возвращает как данные, а не бросает. Чтобы интерфейс откликался мгновенно, есть `useOptimistic`: он показывает предполагаемое значение — лайк `+1` — на время действия, а после завершения React вернётся к настоящему состоянию, при ошибке — к прежнему.',
              en: '`useActionState` wraps an action: it returns the last state — whatever the action returned, e.g. `{ errors }` — a new function for the form’s `action` and a `pending` flag. The action returns validation errors as data rather than throwing. To make the UI respond instantly there’s `useOptimistic`: it shows the expected value — a `+1` like — while the action runs, and when it finishes React returns to the real state, or the old one on failure.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'pending-flag',
              prompt: {
                ru: 'Что даёт третий элемент из `useActionState`?',
                en: 'What does the third item from `useActionState` give you?',
              },
              options: [
                { text: { ru: 'Ошибки валидации', en: 'Validation errors' } },
                { text: { ru: 'Флаг `pending`, пока action выполняется', en: 'A `pending` flag while the action runs' } },
                { text: { ru: 'Функцию отмены', en: 'A cancel function' } },
              ],
              answer: 1,
              explanation: {
                ru: '`[state, formAction, pending]`: состояние, функция для формы и флаг выполнения — им блокируют кнопку отправки.',
                en: '`[state, formAction, pending]`: the state, the function for the form and a running flag — use it to disable the submit button.',
              },
            },
          },
        ],
        test: ['next-actions-use-action-state-001', 'next-actions-optimistic-001'],
      },
      {
        id: 'cookies-limits',
        title: { ru: 'Cookie и ограничения', en: 'Cookies and limits' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Cookie ставятся заголовком `Set-Cookie`, а заголовки уходят в начале ответа. Серверный компонент рендерится потоком, и к моменту его выполнения заголовки могут быть уже отправлены, поэтому **читать** cookie в нём можно, а **ставить** — только в Server Action или Route Handler. Тело запроса к Server Action по умолчанию ограничено 1 МБ, чтобы большой запрос не занимал сервер; лимит поднимают в `next.config` через `serverActions.bodySizeLimit`.',
              en: 'Cookies are set with a `Set-Cookie` header, and headers go out at the start of the response. A server component renders as a stream, and by the time it runs the headers may already be sent, so you can **read** cookies there but **set** them only in a Server Action or Route Handler. A Server Action request body is limited to 1 MB by default so a big request can’t tie up the server; raise the limit in `next.config` via `serverActions.bodySizeLimit`.',
            },
          },
        ],
        test: ['next-actions-cookies-set-001'],
      },
      {
        id: 'route-handlers',
        title: { ru: 'Route Handlers', en: 'Route Handlers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Когда нужен настоящий HTTP-эндпоинт — вебхук, мониторинг, API для мобильного приложения, — пишут **Route Handler**: файл `route.ts`, который экспортирует функции по именам HTTP-методов (`GET`, `POST`, …) на Web API `Request` и `Response`. В одной папке не может быть одновременно `route.ts` и `page.tsx`: адрес принадлежит либо странице, либо обработчику.',
              en: 'When you need a real HTTP endpoint — a webhook, monitoring, an API for a mobile app — you write a **Route Handler**: a `route.ts` file exporting functions named after HTTP methods (`GET`, `POST`, …) using the Web API `Request` and `Response`. One folder can’t hold both `route.ts` and `page.tsx`: an address belongs either to a page or to a handler.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: '// app/api/version/route.ts\nexport async function GET() {\n  return Response.json({ v: 2 });\n}',
            },
          },
        ],
        test: ['next-actions-route-handler-001'],
      },
    ],
    keyPoints: [
      { ru: 'Форма с action работает и без JavaScript.', en: 'A form with an action works without JavaScript.' },
      { ru: 'Action — публичный POST: проверяйте сессию и права внутри.', en: 'An action is a public POST: check session and rights inside.' },
      { ru: '`redirect` — после `try/catch`.', en: '`redirect` goes after `try/catch`.' },
      { ru: '`useActionState` — ошибки и `pending`, `useOptimistic` — мгновенный отклик.', en: '`useActionState` — errors and `pending`; `useOptimistic` — instant feedback.' },
      { ru: 'Cookie ставят в action или `route.ts`, не при рендере.', en: 'Set cookies in an action or `route.ts`, not during render.' },
    ],
    sources: [
      { title: 'Next.js — Mutating Data', url: `${DOCS}/getting-started/mutating-data` },
      { title: 'Next.js — Route Handlers', url: `${DOCS}/getting-started/route-handlers` },
      { title: 'React — useActionState', url: 'https://react.dev/reference/react/useActionState' },
      { title: 'React — useOptimistic', url: 'https://react.dev/reference/react/useOptimistic' },
    ],
  },
  {
    tag: 'next-optimization',
    format: 'steps',
    summary: {
      ru: 'Next.js даёт готовые компоненты для самых тяжёлых частей страницы: картинок, шрифтов, ссылок и сторонних скриптов. Каждый решает конкретную проблему скорости — нужно лишь знать, какие пропсы ему передать.',
      en: 'Next.js ships ready components for the heaviest parts of a page: images, fonts, links and third-party scripts. Each solves a specific speed problem — you just need to know which props to give it.',
    },
    steps: [
      {
        id: 'images',
        title: { ru: 'next/image', en: 'next/image' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`next/image` требует `width` и `height` (или `fill`), чтобы заранее зарезервировать место: иначе картинка догрузится и сдвинет текст — это сдвиг макета (CLS). Ещё компонент отдаёт файл нужного размера в современном формате и грузит его лениво. Браузер выбирает файл из `srcset` **до** вёрстки, поэтому картинке с `fill` нужен `sizes`, например `(max-width: 768px) 100vw, 33vw`. Без него Next.js считает, что картинка на всю ширину, и браузер скачает файл в разы больше нужного.',
              en: '`next/image` requires `width` and `height` (or `fill`) to reserve space up front: otherwise the image loads late and pushes the text — a layout shift (CLS). The component also serves the right file size in a modern format and lazy-loads it. The browser picks a file from `srcset` **before** layout, so an image with `fill` needs `sizes`, e.g. `(max-width: 768px) 100vw, 33vw`. Without it Next.js assumes full width, and the browser downloads a file many times too big.',
            },
          },
          {
            type: 'illustration',
            illustration: 'next-image-cls',
          },
        ],
        test: ['next-optimization-image-001', 'next-optimization-image-sizes-001'],
      },
      {
        id: 'fonts',
        title: { ru: 'next/font', en: 'next/font' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`next/font/google` скачивает CSS и файлы шрифта **при сборке** и раздаёт их с вашего домена вместе со статикой. При загрузке страницы запросов к Google нет: нет лишнего соединения с другим доменом, и данные пользователей не утекают. Запасной системный шрифт подгоняется по метрикам, поэтому текст почти не прыгает, когда загружается настоящий.',
              en: '`next/font/google` downloads the CSS and font files **at build time** and serves them from your domain with the static assets. Loading the page makes no requests to Google: no extra connection to another domain, and no user data leaks. The fallback system font is adjusted to match metrics, so text barely shifts when the real font arrives.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'font-requests',
              prompt: {
                ru: 'Сайт использует `next/font/google`. Увидит ли Google IP-адреса посетителей при загрузке шрифта?',
                en: 'A site uses `next/font/google`. Will Google see visitors’ IP addresses when the font loads?',
              },
              options: [
                { text: { ru: 'Да, шрифт грузится с fonts.googleapis.com', en: 'Yes, the font loads from fonts.googleapis.com' } },
                { text: { ru: 'Нет: файлы скачаны при сборке и отдаются с вашего домена', en: 'No: the files were downloaded at build time and served from your domain' } },
                { text: { ru: 'Только при первом посещении', en: 'Only on the first visit' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Обращение к Google происходит один раз — на сервере сборки. Посетители получают шрифт с вашего домена.',
                en: 'Google is contacted once — on the build server. Visitors get the font from your domain.',
              },
            },
          },
        ],
        test: ['next-optimization-font-001'],
      },
      {
        id: 'link',
        title: { ru: 'Link и предзагрузка', en: 'Link and prefetching' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`<Link href="/about">` рендерит тот же `<a>`, но перехватывает клик: переход происходит на клиенте без полной перезагрузки, а общие layout и их состояние сохраняются. Когда ссылка попадает во вьюпорт, Next.js заранее подгружает маршрут, и переход выглядит мгновенным. Обычный `<a>` каждый раз перезагружает страницу целиком.',
              en: '`<Link href="/about">` renders the same `<a>` but intercepts the click: navigation happens on the client without a full reload, and shared layouts keep their state. When a link enters the viewport, Next.js prefetches the route, so navigation feels instant. A plain `<a>` reloads the whole page every time.',
            },
          },
        ],
        test: ['next-optimization-link-001'],
      },
      {
        id: 'scripts-dynamic',
        title: { ru: 'Сторонние скрипты и ленивые компоненты', en: 'Third-party scripts and lazy components' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`next/script` управляет моментом загрузки стороннего кода. По умолчанию стоит `afterInteractive` — рано, но после начала гидрации. `lazyOnload` загружает скрипт в простое браузера, когда страница уже готова, — так подключают чат поддержки и прочее, что не нужно в первые секунды. Библиотеку, которая трогает `window` при импорте, подключают через `next/dynamic` с `ssr: false`: она загрузится только в браузере и уйдёт в отдельный чанк.',
              en: '`next/script` controls when third-party code loads. The default is `afterInteractive` — early, but after hydration starts. `lazyOnload` loads a script during browser idle time once the page is ready — use it for a support chat and anything not needed in the first seconds. A library that touches `window` on import is loaded via `next/dynamic` with `ssr: false`: it loads in the browser only, in a separate chunk.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'jsx',
              source: "'use client';\nconst Map = dynamic(\n  () => import('./map'),\n  { ssr: false },\n);",
            },
          },
        ],
        test: ['next-optimization-script-001', 'next-optimization-dynamic-001'],
      },
    ],
    keyPoints: [
      { ru: 'Картинке — `width`/`height` или `fill` с `sizes`.', en: 'Images need `width`/`height`, or `fill` with `sizes`.' },
      { ru: '`next/font` раздаёт шрифты со своего домена.', en: '`next/font` serves fonts from your domain.' },
      { ru: '`Link` — клиентский переход и предзагрузка.', en: '`Link` — client navigation and prefetch.' },
      { ru: 'Сторонний код — `lazyOnload`, браузерные библиотеки — `ssr: false`.', en: 'Third-party code — `lazyOnload`; browser-only libraries — `ssr: false`.' },
    ],
    sources: [
      { title: 'Next.js — Image Component', url: `${DOCS}/api-reference/components/image` },
      { title: 'Next.js — Font Module', url: `${DOCS}/api-reference/components/font` },
      { title: 'Next.js — Link Component', url: `${DOCS}/api-reference/components/link` },
      { title: 'Next.js — Script Component', url: `${DOCS}/api-reference/components/script` },
    ],
  },
];
