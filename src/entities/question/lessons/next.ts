import type { Lesson } from '../model/types';

const DOCS = 'https://nextjs.org/docs/app';

export const NEXT_LESSONS: Lesson[] = [
  {
    tag: 'next-routing',
    summary: {
      ru: 'В App Router маршруты задаются папками в `app/`, а поведение сегмента — специальными файлами: `page`, `layout`, `loading`, `error`, `not-found`, `route`.',
      en: 'In the App Router routes are folders in `app/`, and a segment’s behavior comes from special files: `page`, `layout`, `loading`, `error`, `not-found`, `route`.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Адрес открывает только `page`. `layout` оборачивает вложенные страницы и сохраняет состояние при переходах между ними, `template` — то же, но перемонтируется каждый раз. `[slug]` — динамический сегмент, `[...slug]` — catch-all, `[[...slug]]` — необязательный catch-all. Папка в скобках `(group)` группирует маршруты, не попадая в URL.',
          en: 'Only `page` opens a URL. `layout` wraps nested pages and keeps state across navigation between them; `template` does the same but remounts every time. `[slug]` is a dynamic segment, `[...slug]` catch-all, `[[...slug]]` optional catch-all. A folder in parentheses `(group)` groups routes without appearing in the URL.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Вложенность файлов сегмента: `layout` → `template` → `error` → `loading` → `not-found` → `page`. `<Link>` переходит на клиенте и подгружает маршруты заранее. Код до маршрута — редиректы, переписывание адресов, заголовки — в `proxy.ts` (до Next.js 16 — `middleware.ts`).',
          en: 'A segment’s files nest as `layout` → `template` → `error` → `loading` → `not-found` → `page`. `<Link>` navigates on the client and prefetches routes. Code before a route — redirects, rewrites, headers — goes in `proxy.ts` (`middleware.ts` before Next.js 16).',
        },
      },
    ],
    keyPoints: [
      { ru: 'URL открывает только `page`.', en: 'Only `page` opens a URL.' },
      { ru: '`layout` сохраняет состояние, `template` — нет.', en: '`layout` keeps state, `template` doesn’t.' },
      { ru: '`(group)` не попадает в адрес.', en: '`(group)` isn’t part of the URL.' },
    ],
    sources: [
      { title: 'Next.js — Project structure', url: `${DOCS}/getting-started/project-structure` },
      { title: 'Next.js — Dynamic Route Segments', url: `${DOCS}/api-reference/file-conventions/dynamic-routes` },
      { title: 'Next.js — proxy.js', url: `${DOCS}/api-reference/file-conventions/proxy` },
    ],
  },
  {
    tag: 'next-rendering',
    summary: {
      ru: 'Страница рендерится заранее (при сборке) или на каждый запрос. Next.js выбирает режим сам: всё, что зависит от запроса, делает маршрут динамическим.',
      en: 'A page renders ahead of time (at build) or on every request. Next.js picks the mode itself: anything depending on the request makes a route dynamic.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Статический рендер — HTML готов при сборке и раздаётся мгновенно. `cookies()`, `headers()`, `searchParams` — API времени запроса: страница с ними рендерится на каждый запрос, поэтому их выносят в компоненты за `<Suspense>`. `generateStaticParams` заранее собирает страницы динамического маршрута для перечисленных параметров.',
          en: 'Static rendering — HTML is ready at build time and served instantly. `cookies()`, `headers()`, `searchParams` are request-time APIs: a page using them renders per request, so they go into components behind `<Suspense>`. `generateStaticParams` prerenders a dynamic route’s pages for the listed params.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Гидрация** ломается, если первый рендер на клиенте отличается от серверного: время, `Math.random()`, `typeof window`, `localStorage` в рендере. Такие значения показывают после монтирования. Переменные `NEXT_PUBLIC_` вшиваются в бандл при сборке, остальные в браузер не попадают.',
          en: '**Hydration** breaks when the first client render differs from the server one: time, `Math.random()`, `typeof window`, `localStorage` during render. Show such values after mount. `NEXT_PUBLIC_` variables are inlined at build time; others never reach the browser.',
        },
      },
    ],
    keyPoints: [
      { ru: '`cookies()`/`headers()` делают маршрут динамическим.', en: '`cookies()`/`headers()` make a route dynamic.' },
      { ru: 'Сервер и первый клиентский рендер должны совпасть.', en: 'Server and first client render must match.' },
      { ru: '`NEXT_PUBLIC_` замораживается при `next build`.', en: '`NEXT_PUBLIC_` is frozen at `next build`.' },
    ],
    sources: [
      { title: 'Next.js — generateStaticParams', url: `${DOCS}/api-reference/functions/generate-static-params` },
      { title: 'Next.js — Hydration error', url: 'https://nextjs.org/docs/messages/react-hydration-error' },
      { title: 'Next.js — Environment Variables', url: `${DOCS}/guides/environment-variables` },
    ],
  },
  {
    tag: 'next-components',
    summary: {
      ru: 'В `app/` компоненты по умолчанию серверные. `"use client"` отмечает границу, ниже которой код уходит в браузер и может использовать состояние и события.',
      en: 'In `app/` components are server-side by default. `"use client"` marks a boundary below which code ships to the browser and can use state and events.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Серверный компонент может быть `async`, читать базу и секреты, а его код в браузер не попадает. Клиентский нужен для `useState`, эффектов, обработчиков и браузерных API. Границу ставят как можно ниже — на интерактивных листьях дерева. Модули с секретами защищают `import \'server-only\'`: импорт в клиентский код сломает сборку.',
          en: 'A Server Component can be `async`, read the database and secrets, and its code never reaches the browser. Client Components are for `useState`, effects, handlers and browser APIs. Put the boundary as low as possible — on interactive leaves. Guard modules with secrets via `import \'server-only\'`: importing them into client code breaks the build.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Пропсы из серверного компонента в клиентский должны быть сериализуемыми: функции передавать нельзя, кроме Server Functions. Серверный компонент можно вложить в клиентский, передав его через `children` — он отрендерится на сервере.',
          en: 'Props from a Server to a Client Component must be serializable: functions can’t be passed, except Server Functions. A Server Component can sit inside a Client Component when passed via `children` — it renders on the server.',
        },
      },
    ],
    keyPoints: [
      { ru: 'По умолчанию — серверный компонент.', en: 'Server Component by default.' },
      { ru: 'Пропсы через границу — только сериализуемые.', en: 'Props across the boundary must be serializable.' },
      { ru: 'Серверное внутри клиентского — через `children`.', en: 'Server inside client — via `children`.' },
    ],
    sources: [{ title: 'Next.js — Server and Client Components', url: `${DOCS}/getting-started/server-and-client-components` }],
  },
  {
    tag: 'next-data',
    summary: {
      ru: 'Данные загружают прямо в серверных компонентах. С Next.js 15 `fetch` по умолчанию не кешируется — кеш включают явно, а после изменений сбрасывают.',
      en: 'Data is fetched directly in Server Components. Since Next.js 15 `fetch` isn’t cached by default — caching is opt-in and invalidated after changes.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Одинаковые `fetch` в одном рендере выполняются один раз (мемоизация), поэтому данные можно запрашивать там, где они нужны. Независимые запросы запускают параллельно — `Promise.all` или отдельные компоненты за `<Suspense>`, иначе получается водопад.',
          en: 'Identical `fetch` calls in one render run once (memoization), so fetch data where it’s needed. Start independent requests in parallel — `Promise.all` or separate components behind `<Suspense>` — otherwise you get a waterfall.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Кеш включают директивой `"use cache"` (с Cache Components) или опцией `cache: \'force-cache\'`, срок задаёт `cacheLife`, метки — `cacheTag`. После изменения данных вызывают `revalidatePath(\'/posts\')` или `updateTag(\'posts\')`.',
          en: 'Enable caching with the `"use cache"` directive (with Cache Components) or the `cache: \'force-cache\'` option; `cacheLife` sets the lifetime and `cacheTag` the tags. After changing data call `revalidatePath(\'/posts\')` or `updateTag(\'posts\')`.',
        },
      },
    ],
    keyPoints: [
      { ru: '`fetch` не кешируется по умолчанию (с 15-й версии).', en: '`fetch` isn’t cached by default (since v15).' },
      { ru: 'Независимые запросы — параллельно.', en: 'Independent requests — in parallel.' },
      { ru: 'После мутации — `revalidatePath`/`updateTag`.', en: 'After a mutation — `revalidatePath`/`updateTag`.' },
    ],
    sources: [
      { title: 'Next.js — Fetching Data', url: `${DOCS}/getting-started/fetching-data` },
      { title: 'Next.js — Caching', url: `${DOCS}/getting-started/caching` },
      { title: 'Next.js — Revalidating', url: `${DOCS}/getting-started/revalidating` },
    ],
  },
  {
    tag: 'next-actions',
    summary: {
      ru: 'Server Actions — серверные функции с `"use server"`, которые вызываются из форм и кнопок. Route Handlers (`route.ts`) — обычные HTTP-эндпоинты.',
      en: 'Server Actions are server functions with `"use server"` called from forms and buttons. Route Handlers (`route.ts`) are regular HTTP endpoints.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Server Action вызывается POST-запросом, и отправить его можно в обход интерфейса: внутри каждой функции проверяют сессию, права на объект и входные данные. После изменения данных в ней же сбрасывают кеш и при необходимости делают `redirect`.',
          en: 'A Server Action is invoked via a POST request that can bypass the UI: every function checks the session, permissions on the object and the input. After changing data it also invalidates the cache and, if needed, calls `redirect`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`route.ts` экспортирует функции по именам методов — `GET`, `POST`… — на стандартных `Request` и `Response`. Это вебхуки, API для мобильного клиента, health-check. В одной папке не может быть `route.ts` и `page.tsx` одновременно.',
          en: '`route.ts` exports functions named after methods — `GET`, `POST`… — using standard `Request` and `Response`. Use them for webhooks, a mobile client API, health checks. A folder can’t contain both `route.ts` and `page.tsx`.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Server Action — публичный POST: проверять права внутри.', en: 'A Server Action is a public POST: check permissions inside.' },
      { ru: 'Эндпоинты — `route.ts` с `GET`/`POST`.', en: 'Endpoints — `route.ts` with `GET`/`POST`.' },
      { ru: '`route.ts` и `page.tsx` в одной папке — конфликт.', en: '`route.ts` and `page.tsx` in one folder conflict.' },
    ],
    sources: [
      { title: 'Next.js — Mutating Data', url: `${DOCS}/getting-started/mutating-data` },
      { title: 'Next.js — Route Handlers', url: `${DOCS}/getting-started/route-handlers` },
    ],
  },
  {
    tag: 'next-optimization',
    summary: {
      ru: 'Встроенные компоненты Next.js берут на себя типовые оптимизации: `next/image` — картинки, `next/font` — шрифты, `<Link>` — быстрые переходы.',
      en: 'Built-in Next.js components handle common optimizations: `next/image` for images, `next/font` for fonts, `<Link>` for fast navigation.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`next/image` требует размеры (или `fill`), чтобы не было сдвига макета, отдаёт картинку нужного размера и формата и по умолчанию грузит её лениво. Картинке первого экрана ставят `preload` (в Next.js 16 он заменил `priority`).',
          en: '`next/image` requires dimensions (or `fill`) to avoid layout shift, serves the right size and format, and lazy-loads by default. The above-the-fold image gets `preload` (in Next.js 16 it replaced `priority`).',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`next/font` скачивает шрифты при сборке и раздаёт их с вашего домена, подгоняя запасной шрифт по метрикам — без запросов к Google и без сдвигов. `<Link>` подгружает маршруты во вьюпорте и переходит без перезагрузки страницы.',
          en: '`next/font` downloads fonts at build time and serves them from your domain with a metric-matched fallback — no requests to Google and no shifts. `<Link>` prefetches routes in the viewport and navigates without a page reload.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Размеры картинки — против CLS.', en: 'Image dimensions prevent CLS.' },
      { ru: '`next/font` — самохостинг без сдвигов.', en: '`next/font` — self-hosting without shifts.' },
      { ru: '`<Link>` — клиентский переход и предзагрузка.', en: '`<Link>` — client navigation and prefetching.' },
    ],
    sources: [
      { title: 'Next.js — Image Component', url: `${DOCS}/api-reference/components/image` },
      { title: 'Next.js — Font Module', url: `${DOCS}/api-reference/components/font` },
      { title: 'Next.js — Link Component', url: `${DOCS}/api-reference/components/link` },
    ],
  },
];
