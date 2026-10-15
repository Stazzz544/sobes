import type { Question } from '../model/types';

const DOCS = 'https://nextjs.org/docs/app';

export const NEXT_QUESTIONS_3: Question[] = [
  {
    id: 'next-routing-intercepting-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Клик по фото в ленте должен открывать его в модалке поверх ленты, а прямая ссылка `/photo/123` — полноценной страницей. Что использовать в App Router?',
      en: 'Clicking a photo in a feed should open it in a modal over the feed, while a direct `/photo/123` link opens a full page. What do you use in the App Router?',
    },
    options: [
      { text: { ru: 'Хранить «открыта ли модалка» в `localStorage`', en: 'Store “is the modal open” in `localStorage`' } },
      {
        text: {
          ru: 'Перехватывающий маршрут `(.)photo/[id]` внутри параллельного слота `@modal`: при навигации из ленты он рендерится модалкой, а при прямом заходе работает обычная страница',
          en: 'An intercepting route `(.)photo/[id]` inside a parallel `@modal` slot: navigating from the feed renders it as a modal, while a direct visit uses the regular page',
        },
      },
      { text: { ru: 'Сделать две разные ссылки: одну для модалки, другую для страницы', en: 'Make two different links: one for the modal, one for the page' } },
      { text: { ru: 'Отрисовать модалку в `proxy.ts`', en: 'Render the modal in `proxy.ts`' } },
      { text: { ru: 'Перезагружать страницу с параметром `?modal=1`', en: 'Reload the page with `?modal=1`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Параллельный маршрут** `@modal` — именованный слот, который layout получает отдельным пропом рядом с `children`. **Перехватывающий маршрут** `(.)photo/[id]` подменяет содержимое при клиентской навигации: адрес меняется на `/photo/123`, лента остаётся под модалкой. Обновление страницы или переход по ссылке перехват не включают — открывается обычный `photo/[id]/page.tsx`. Так ссылкой на модалку можно делиться.',
          en: 'A **parallel route** `@modal` is a named slot the layout receives as a separate prop next to `children`. An **intercepting route** `(.)photo/[id]` swaps content on client navigation: the URL becomes `/photo/123` while the feed stays under the modal. A refresh or opening the link directly doesn’t intercept — the regular `photo/[id]/page.tsx` renders. So a modal link can be shared.',
        },
      },
    ],
    sources: [
      { title: 'Next.js — Intercepting Routes', url: `${DOCS}/api-reference/file-conventions/intercepting-routes` },
      { title: 'Next.js — Parallel Routes', url: `${DOCS}/api-reference/file-conventions/parallel-routes` },
    ],
  },
  {
    id: 'next-routing-template-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Нужно, чтобы при каждом переходе между страницами раздела проигрывалась анимация появления и сбрасывалось поле поиска в обёртке. Какой файл подходит?',
      en: 'On every navigation between section pages, an enter animation should play and the wrapper’s search field should reset. Which file fits?',
    },
    options: [
      { code: 'layout.tsx' },
      { code: 'template.tsx' },
      { code: 'loading.tsx' },
      { code: 'default.tsx' },
      { code: 'route.ts' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`template` оборачивает страницы так же, как `layout`, но получает уникальный ключ для каждого маршрута: при переходе он **монтируется заново** — эффекты запускаются снова, состояние клиентских компонентов сбрасывается. `layout` наоборот сохраняется между страницами, поэтому анимация и сброс в нём не сработают. Без такой необходимости берут `layout` — он дешевле.',
          en: '`template` wraps pages like `layout` does, but gets a unique key per route: on navigation it **remounts** — effects run again and client component state resets. `layout`, by contrast, persists across pages, so animations and resets won’t fire there. Without such a need use `layout` — it’s cheaper.',
        },
      },
    ],
    sources: [{ title: 'Next.js — template.js', url: `${DOCS}/api-reference/file-conventions/template` }],
  },
  {
    id: 'next-routing-use-router-001',
    topic: 'next',
    tags: ['next-routing', 'next-components'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'После успешного входа клиентский компонент должен перейти на `/dashboard`. Какой код правильный в App Router?',
      en: 'After a successful login a client component must navigate to `/dashboard`. Which code is right in the App Router?',
    },
    options: [
      { code: "import { useRouter } from 'next/router';\nconst router = useRouter();\nrouter.push('/dashboard');" },
      { code: "import { useRouter } from 'next/navigation';\nconst router = useRouter();\nrouter.push('/dashboard');" },
      { code: "window.location.href = '/dashboard';" },
      { code: "import { redirect } from 'next/navigation';\nuseEffect(() => redirect('/dashboard'));" },
      { code: "history.pushState(null, '', '/dashboard');" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В App Router хук берут из `next/navigation`; `next/router` — от старого Pages Router и в `app/` не работает. `router.push` делает клиентский переход с сохранением общих layout. `window.location` перезагрузит страницу целиком, а голый `history.pushState` поменяет адрес, но не страницу. `redirect` предназначен для серверного кода и Server Actions.',
          en: 'In the App Router the hook comes from `next/navigation`; `next/router` belongs to the old Pages Router and doesn’t work in `app/`. `router.push` does a client-side navigation keeping shared layouts. `window.location` reloads the whole page, and a bare `history.pushState` changes the URL but not the page. `redirect` is meant for server code and Server Actions.',
        },
      },
    ],
    sources: [{ title: 'Next.js — useRouter', url: `${DOCS}/api-reference/functions/use-router` }],
  },
  {
    id: 'next-rendering-search-params-001',
    topic: 'next',
    tags: ['next-rendering'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Как в Next.js 15+ прочитать `?q=` в серверной странице `app/search/page.tsx`?',
      en: 'How do you read `?q=` in the server page `app/search/page.tsx` in Next.js 15+?',
    },
    options: [
      { code: "export default function Page({ searchParams }) {\n  return <Results query={searchParams.q} />;\n}" },
      { code: "export default async function Page({ searchParams }) {\n  const { q } = await searchParams;\n  return <Results query={q} />;\n}" },
      { code: "export default function Page() {\n  const q = new URLSearchParams(window.location.search).get('q');\n  return <Results query={q} />;\n}" },
      { code: "export default function Page() {\n  const q = useSearchParams().get('q');\n  return <Results query={q} />;\n}" },
      { code: "export default function Page({ params }) {\n  return <Results query={params.q} />;\n}" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'С Next.js 15 `params` и `searchParams` — **промисы**: их ожидают через `await` в [[rsc|серверном компоненте]] или `use()` в клиентском. Это позволяет Next.js рендерить статические части, не дожидаясь параметров запроса. `window` на сервере нет, `useSearchParams` — клиентский хук, а `params` — сегменты пути вроде `[slug]`, а не строка запроса.',
          en: 'Since Next.js 15, `params` and `searchParams` are **promises**: await them in a [[rsc|Server Component]] or use `use()` in a Client Component. This lets Next.js render static parts without waiting for request params. There’s no `window` on the server, `useSearchParams` is a client hook, and `params` are path segments like `[slug]`, not the query string.',
        },
      },
    ],
    sources: [{ title: 'Next.js — page.js: searchParams', url: `${DOCS}/api-reference/file-conventions/page` }],
  },
  {
    id: 'next-data-use-cache-001',
    topic: 'next',
    tags: ['next-data'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что делает директива `"use cache"` в начале асинхронной функции при включённых Cache Components?',
      en: 'What does the `"use cache"` directive at the top of an async function do with Cache Components enabled?',
    },
    code: {
      lang: 'tsx',
      source: `export async function getOrderSummary(accountId: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(\`orders-\${accountId}\`);
  return computeSummary(await db.orders.findMany({ where: { accountId } }));
}`,
    },
    options: [
      { text: { ru: 'Кеширует результат в `localStorage` браузера', en: 'Caches the result in the browser’s `localStorage`' } },
      {
        text: {
          ru: 'Кеширует результат на сервере отдельно для каждого набора аргументов; срок задаёт `cacheLife`, а `cacheTag` позволяет сбросить запись точечно',
          en: 'Caches the result on the server separately for each set of arguments; `cacheLife` sets the lifetime, and `cacheTag` allows targeted invalidation',
        },
      },
      { text: { ru: 'Делает функцию клиентской', en: 'Makes the function client-side' } },
      { text: { ru: 'Кеширует один общий результат для всех `accountId`', en: 'Caches one shared result for all `accountId`s' } },
      { text: { ru: 'Отключает кеширование `fetch` внутри', en: 'Disables `fetch` caching inside' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`"use cache"` кеширует результат функции или компонента целиком — в том числе запросы к базе, а не только `fetch`. Ключ строится из сериализованных аргументов, поэтому у каждого `accountId` своя запись. `cacheLife(\'hours\')` задаёт профиль срока жизни (без него — `default`), а `cacheTag` связывает запись с тегом: после изменения заказов вызывают `updateTag` или `revalidateTag`.',
          en: '`"use cache"` caches a function’s or component’s whole result — including database calls, not just `fetch`. The key is built from serialized arguments, so each `accountId` gets its own entry. `cacheLife(\'hours\')` sets the lifetime profile (without it, `default`), and `cacheTag` links the entry to a tag: after orders change, call `updateTag` or `revalidateTag`.',
        },
      },
    ],
    sources: [
      { title: 'Next.js — use cache', url: `${DOCS}/api-reference/directives/use-cache` },
      { title: 'Next.js — cacheLife', url: `${DOCS}/api-reference/functions/cacheLife` },
    ],
  },
  {
    id: 'next-components-use-promise-001',
    topic: 'next',
    tags: ['next-components', 'next-data'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Серверная страница запускает загрузку постов и передаёт **промис** клиентскому компоненту с фильтрами. Как его прочитать?',
      en: 'A server page starts loading posts and passes a **promise** to a client component with filters. How do you read it?',
    },
    code: {
      lang: 'tsx',
      source: `// page.tsx (Server Component)
export default function Page() {
  const posts = getPosts();
  return (
    <Suspense fallback={<Skeleton />}>
      <PostList posts={posts} />
    </Suspense>
  );
}`,
    },
    options: [
      { code: "'use client';\nexport function PostList({ posts }) {\n  const allPosts = use(posts);\n  return <List items={allPosts} />;\n}" },
      { code: "'use client';\nexport async function PostList({ posts }) {\n  const allPosts = await posts;\n  return <List items={allPosts} />;\n}" },
      { code: "'use client';\nexport function PostList({ posts }) {\n  return <List items={posts} />;\n}" },
      { code: "'use client';\nexport function PostList({ posts }) {\n  const [allPosts] = useState(posts.then());\n  return <List items={allPosts} />;\n}" },
      { code: "'use client';\nexport function PostList({ posts }) {\n  return <List items={JSON.parse(posts)} />;\n}" },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Промис можно передать из [[rsc|серверного компонента]] в клиентский: загрузка начинается на сервере сразу, а клиентский компонент читает результат хуком `use(posts)`. Пока промис не выполнен, показывается ближайший `<Suspense>`. Клиентские компоненты не бывают `async`, а сам промис — не массив данных. Так интерактивная часть получает данные стримингом без водопада «загрузили JS → сделали запрос».',
          en: 'A promise can be passed from a [[rsc|Server Component]] to a Client Component: loading starts on the server right away, and the client component reads the result with `use(posts)`. Until it resolves, the nearest `<Suspense>` shows. Client components can’t be `async`, and the promise itself isn’t the data array. This way the interactive part gets streamed data without the “load JS → fetch” waterfall.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Streaming data with the use API', url: `${DOCS}/getting-started/fetching-data#streaming-data-with-the-use-api` }],
  },
  {
    id: 'next-actions-use-action-state-001',
    topic: 'next',
    tags: ['next-actions'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Форма вызывает Server Action. Как показать ошибки валидации от сервера и заблокировать кнопку на время отправки?',
      en: 'A form calls a Server Action. How do you show server validation errors and disable the button while submitting?',
    },
    options: [
      { text: { ru: 'Бросать исключение из action и ловить его в `error.tsx`', en: 'Throw from the action and catch it in `error.tsx`' } },
      {
        code: "const [state, formAction, pending] = useActionState(createPost, { errors: {} });\n<form action={formAction}>…<button disabled={pending}>Save</button></form>",
      },
      { text: { ru: 'Писать ошибки в `localStorage` и читать после перезагрузки', en: 'Write errors to `localStorage` and read them after reload' } },
      { text: { ru: 'Вызывать action через `fetch` и обрабатывать JSON вручную', en: 'Call the action via `fetch` and handle JSON manually' } },
      { text: { ru: 'Это невозможно без отдельного API-маршрута', en: 'Impossible without a separate API route' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useActionState` оборачивает action: возвращает последнее состояние (что action вернул — например, `{ errors }`), новую функцию для `action` формы и флаг `pending`. Action возвращает ошибки как данные, а не бросает их: исключение уйдёт в `error.tsx` и сотрёт форму. Работает и с прогрессивным улучшением — форма отправляется ещё до загрузки JS.',
          en: '`useActionState` wraps an action: it returns the latest state (whatever the action returned — say, `{ errors }`), a new function for the form’s `action`, and a `pending` flag. The action returns errors as data instead of throwing: an exception goes to `error.tsx` and wipes the form. It also works with progressive enhancement — the form submits before JS loads.',
        },
      },
    ],
    sources: [
      { title: 'Next.js — Mutating Data: pending state', url: `${DOCS}/getting-started/mutating-data` },
      { title: 'React — useActionState', url: 'https://react.dev/reference/react/useActionState' },
    ],
  },
  {
    id: 'next-optimization-script-001',
    topic: 'next',
    tags: ['next-optimization'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Виджет чата поддержки не нужен в первые секунды. С какой стратегией подключить его через `next/script`?',
      en: 'A support chat widget isn’t needed in the first seconds. Which `next/script` strategy should load it?',
    },
    options: [
      { code: '<Script src="https://chat.example/widget.js" strategy="beforeInteractive" />' },
      { code: '<Script src="https://chat.example/widget.js" strategy="lazyOnload" />' },
      { code: '<script src="https://chat.example/widget.js"></script>  // in <head>' },
      { code: '<Script src="https://chat.example/widget.js" strategy="afterInteractive" async={false} />' },
      { code: '<link rel="preload" href="https://chat.example/widget.js" as="script" />' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`lazyOnload` загружает скрипт в простое браузера, когда страница уже готова, — сторонний код не отнимает время у загрузки и гидрации. По умолчанию стоит `afterInteractive` (рано, но после начала гидрации) — подходит для аналитики. `beforeInteractive` — только для критичного кода вроде антибот-проверки: он блокирует всё остальное.',
          en: '`lazyOnload` loads the script during browser idle time once the page is ready — third-party code doesn’t steal time from loading and hydration. The default is `afterInteractive` (early, but after hydration begins) — fine for analytics. `beforeInteractive` is only for critical code like bot detection: it blocks everything else.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Script Component', url: `${DOCS}/api-reference/components/script` }],
  },
  {
    id: 'next-optimization-remote-images-001',
    topic: 'next',
    tags: ['next-optimization'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: '`<Image src="https://cdn.shop.com/p/1.jpg" … />` падает с ошибкой о незарегистрированном хосте. Что нужно сделать?',
      en: '`<Image src="https://cdn.shop.com/p/1.jpg" … />` fails with an unconfigured host error. What do you need to do?',
    },
    options: [
      { text: { ru: 'Заменить `next/image` на `<img>` везде', en: 'Replace `next/image` with `<img>` everywhere' } },
      {
        text: {
          ru: 'Разрешить этот источник в `images.remotePatterns` в `next.config` — оптимизатор обрабатывает только явно разрешённые внешние адреса',
          en: 'Allow the source in `images.remotePatterns` in `next.config` — the optimizer only processes explicitly allowed external URLs',
        },
      },
      { text: { ru: 'Скачать все картинки в `public/`', en: 'Download all images into `public/`' } },
      { text: { ru: 'Добавить `crossorigin="anonymous"`', en: 'Add `crossorigin="anonymous"`' } },
      { text: { ru: 'Включить HTTPS на локальном сервере', en: 'Enable HTTPS on the local server' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Оптимизатор картинок Next.js скачивает и пережимает изображения на вашем сервере. Если разрешить любые адреса, им можно воспользоваться как бесплатным прокси и нагрузить сервер чужими файлами. Поэтому внешние источники явно перечисляют в `remotePatterns` — протокол, хост, путь. Устаревшая настройка `domains` заменена именно им.',
          en: 'The Next.js image optimizer downloads and re-encodes images on your server. Allowing any URL would let anyone use it as a free proxy and load your server with foreign files. So external sources are listed explicitly in `remotePatterns` — protocol, host, path. The deprecated `domains` setting was replaced by it.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Image: remotePatterns', url: `${DOCS}/api-reference/components/image#remotepatterns` }],
  },
  {
    id: 'next-rendering-static-export-001',
    topic: 'next',
    tags: ['next-rendering'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Сайт собирают с `output: \'export\'` и кладут на обычный статический хостинг. Что из этого работать не будет?',
      en: 'A site is built with `output: \'export\'` and put on plain static hosting. Which of these won’t work?',
    },
    options: [
      { text: { ru: 'Серверные компоненты, отрендеренные при сборке', en: 'Server Components rendered at build time' } },
      { text: { ru: '`<Link>` и клиентская навигация', en: '`<Link>` and client navigation' } },
      {
        text: {
          ru: 'Server Actions, `cookies()`, `proxy.ts` и оптимизация картинок стандартным загрузчиком',
          en: 'Server Actions, `cookies()`, `proxy.ts` and image optimization with the default loader',
        },
      },
      { text: { ru: 'Клиентские компоненты с `useState`', en: 'Client Components with `useState`' } },
      { text: { ru: 'Динамические маршруты с `generateStaticParams`', en: 'Dynamic routes with `generateStaticParams`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Статический экспорт превращает приложение в набор HTML, CSS и JS — сервера Next.js нет. Всё, что выполняется во время запроса, отпадает: Server Actions, `cookies()` и `headers()`, `proxy.ts`, [[isr|ISR]], редиректы из конфига, оптимизатор картинок по умолчанию. [[rsc|Серверные компоненты]] при этом работают — они рендерятся один раз при сборке, а динамические маршруты требуют `generateStaticParams`.',
          en: 'A static export turns the app into HTML, CSS and JS — there’s no Next.js server. Everything that runs at request time is gone: Server Actions, `cookies()` and `headers()`, `proxy.ts`, [[isr|ISR]], config redirects, the default image optimizer. [[rsc|Server Components]] still work — they render once at build time, and dynamic routes need `generateStaticParams`.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Static Exports: unsupported features', url: `${DOCS}/guides/static-exports` }],
  },
];
