import type { Question } from '../model/types';

const DOCS = 'https://nextjs.org/docs/app';

export const NEXT_QUESTIONS_4: Question[] = [
  {
    id: 'next-routing-active-link-001',
    topic: 'next',
    tags: ['next-routing', 'next-components'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Меню в `layout.tsx` должно подсвечивать ссылку на текущую страницу. Как узнать текущий путь?',
      en: 'The menu in `layout.tsx` must highlight the link to the current page. How do you get the current path?',
    },
    options: [
      { text: { ru: 'Прочитать `window.location` в серверном layout', en: 'Read `window.location` in the server layout' } },
      {
        text: {
          ru: 'Вынести меню в клиентский компонент и использовать `usePathname()` из `next/navigation`',
          en: 'Move the menu into a Client Component and use `usePathname()` from `next/navigation`',
        },
      },
      { text: { ru: 'Получить `pathname` из пропсов layout', en: 'Get `pathname` from the layout’s props' } },
      { text: { ru: 'Хранить путь в `localStorage` при каждом переходе', en: 'Store the path in `localStorage` on every navigation' } },
      { text: { ru: 'Использовать `useRouter().pathname` из `next/router`', en: 'Use `useRouter().pathname` from `next/router`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Layout не перерисовывается при переходах между вложенными страницами, поэтому путь ему не передают — он бы устарел. Клиентский компонент перерисовывается при навигации, и хук `usePathname()` даёт актуальный путь. Меню делают маленьким клиентским островком, а сам layout остаётся серверным. `next/router` — от старого Pages Router.',
          en: 'A layout doesn’t re-render when navigating between nested pages, so it isn’t given the path — it would go stale. A Client Component re-renders on navigation, and `usePathname()` returns the current path. Make the menu a small client island and keep the layout server-side. `next/router` belongs to the old Pages Router.',
        },
      },
    ],
    sources: [{ title: 'Next.js — usePathname', url: `${DOCS}/api-reference/functions/use-pathname` }],
  },
  {
    id: 'next-routing-global-error-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Ошибка возникает в корневом `app/layout.tsx`. Что её поймает и чем этот файл особенный?',
      en: 'An error happens in the root `app/layout.tsx`. What catches it, and what’s special about that file?',
    },
    options: [
      { text: { ru: '`app/error.tsx` — как и любые другие ошибки', en: '`app/error.tsx` — like any other error' } },
      {
        text: {
          ru: '`app/global-error.tsx`: он заменяет корневой layout, поэтому должен сам рендерить `<html>` и `<body>` и подключать стили',
          en: '`app/global-error.tsx`: it replaces the root layout, so it must render its own `<html>` and `<body>` and bring its styles',
        },
      },
      { text: { ru: '`proxy.ts`', en: '`proxy.ts`' } },
      { text: { ru: '`not-found.tsx`', en: '`not-found.tsx`' } },
      { text: { ru: 'Ничто: приложение просто упадёт', en: 'Nothing: the app simply crashes' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`error.tsx` сегмента вложен **внутрь** его layout, поэтому ошибку в самом layout не ловит — её ловит граница уровнем выше. У корневого layout выше никого нет, для этого и существует `global-error.tsx`. Он рендерится вместо всего документа, так что `<html>`, `<body>`, шрифты и тема в нём свои. Как и `error.tsx`, это клиентский компонент.',
          en: 'A segment’s `error.tsx` sits **inside** its layout, so it doesn’t catch errors in that layout — the boundary one level up does. The root layout has nothing above it, which is why `global-error.tsx` exists. It renders instead of the whole document, so `<html>`, `<body>`, fonts and theme are its own. Like `error.tsx`, it’s a Client Component.',
        },
      },
    ],
    sources: [{ title: 'Next.js — error.js: global errors', url: `${DOCS}/api-reference/file-conventions/error` }],
  },
  {
    id: 'next-routing-default-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Со слотом `@analytics` переходы по ссылкам работают, но при обновлении страницы `/settings` получается 404. Чего не хватает?',
      en: 'With an `@analytics` slot, link navigation works, but refreshing `/settings` gives a 404. What’s missing?',
    },
    options: [
      { text: { ru: '`loading.tsx` в слоте', en: 'A `loading.tsx` in the slot' } },
      {
        text: {
          ru: '`default.tsx` в слоте: при полной загрузке Next.js не знает, что показать в слоте для этого адреса, и без запасного варианта отдаёт 404',
          en: 'A `default.tsx` in the slot: on a full load Next.js doesn’t know what to show in the slot for this URL, and without a fallback returns 404',
        },
      },
      { text: { ru: '`route.ts` для `/settings`', en: 'A `route.ts` for `/settings`' } },
      { text: { ru: 'Переименовать слот без `@`', en: 'Rename the slot without `@`' } },
      { text: { ru: 'Отключить кеш браузера', en: 'Disable browser cache' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При клиентской навигации Next.js помнит, что было в каждом слоте, и оставляет его как есть, даже если для нового адреса в слоте нет страницы. При полной загрузке восстановить это состояние неоткуда, поэтому для «неподходящего» слота рендерится `default.tsx`, а если его нет — 404. Часто `default` просто возвращает `null` или то же, что и основная страница слота.',
          en: 'On client navigation Next.js remembers each slot’s content and keeps it, even if the slot has no page for the new URL. On a full load there’s nothing to restore that from, so an unmatched slot renders `default.tsx` — or a 404 if it’s missing. Often `default` just returns `null` or the same as the slot’s main page.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Parallel Routes: default.js', url: `${DOCS}/api-reference/file-conventions/parallel-routes` }],
  },
  {
    id: 'next-rendering-isr-001',
    topic: 'next',
    tags: ['next-rendering', 'next-data'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Без Cache Components: страница блога собрана статически, а посты должны обновляться не реже раза в час без пересборки. Как это сделать?',
      en: 'Without Cache Components: a blog page is statically built, but posts must refresh at least hourly without a rebuild. How?',
    },
    options: [
      { text: { ru: 'Пересобирать проект по крону каждый час', en: 'Rebuild the project on a cron every hour' } },
      {
        code: "const posts = await fetch('https://api.blog/posts', { next: { revalidate: 3600 } });",
      },
      { code: "const posts = await fetch('https://api.blog/posts', { cache: 'no-store' });" },
      { text: { ru: 'Перенести загрузку постов в `useEffect`', en: 'Move post loading into `useEffect`' } },
      { code: "setInterval(() => location.reload(), 3600000);" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это **инкрементальная статическая регенерация**: страница отдаётся из кеша мгновенно, а когда прошёл час, первый запрос запускает фоновую перегенерацию — следующий посетитель получит свежую версию. `no-store` сделает страницу динамической на каждый запрос, а загрузка в `useEffect` лишит HTML контента для поисковиков. С Cache Components ту же роль играют `"use cache"` и `cacheLife`.',
          en: 'This is **incremental static regeneration**: the page is served from cache instantly, and once an hour has passed, the first request triggers background regeneration — the next visitor gets the fresh version. `no-store` makes the page dynamic on every request, and loading in `useEffect` strips content from the HTML for search engines. With Cache Components, `"use cache"` and `cacheLife` play this role.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Caching without Cache Components: time-based revalidation', url: `${DOCS}/guides/caching-without-cache-components` }],
  },
  {
    id: 'next-rendering-static-shell-001',
    topic: 'next',
    tags: ['next-rendering', 'next-data'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'С Cache Components страница содержит заголовок и `<Suspense fallback={<p>Loading posts…</p>}><LatestPosts /></Suspense>`, где посты не кешируются. Что попадёт в заранее собранную «статическую оболочку»?',
      en: 'With Cache Components, a page has a heading and `<Suspense fallback={<p>Loading posts…</p>}><LatestPosts /></Suspense>`, where posts aren’t cached. What goes into the prerendered “static shell”?',
    },
    options: [
      { text: { ru: 'Ничего: страница с некешируемыми данными целиком динамическая', en: 'Nothing: a page with uncached data is fully dynamic' } },
      {
        text: {
          ru: 'Заголовок и `fallback` «Loading posts…», а сами посты придут потоком во время запроса',
          en: 'The heading and the “Loading posts…” `fallback`, while the posts stream in at request time',
        },
      },
      { text: { ru: 'Вся страница вместе с постами на момент сборки', en: 'The whole page with posts as of build time' } },
      { text: { ru: 'Только `<html>` и `<body>`', en: 'Only `<html>` and `<body>`' } },
      { text: { ru: 'Только посты, без заголовка', en: 'Only the posts, without the heading' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Next.js заранее рендерит всё, что не зависит от запроса, — до ближайших `<Suspense>` вокруг некешируемых данных. Получается **статическая оболочка**, которую можно отдать мгновенно с CDN, а «дыры» на месте `fallback` заполняются потоком во время запроса. Без `<Suspense>` вокруг некешируемого чтения маршрут блокируется целиком, и dev-оверлей подскажет, где поставить границу.',
          en: 'Next.js prerenders everything that doesn’t depend on the request — up to the nearest `<Suspense>` around uncached data. That’s the **static shell**, served instantly from a CDN, while the “holes” at each `fallback` fill in by streaming at request time. Without `<Suspense>` around an uncached read the whole route blocks, and the dev overlay suggests where to add the boundary.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Caching', url: `${DOCS}/getting-started/caching` }],
  },
  {
    id: 'next-data-after-001',
    topic: 'next',
    tags: ['next-data', 'next-actions'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'После ответа на запрос нужно отправить событие в аналитику, не задерживая страницу. Что использовать в Next.js?',
      en: 'After responding to a request you need to send an analytics event without delaying the page. What do you use in Next.js?',
    },
    options: [
      { code: "await sendAnalytics(event);  // before returning the page" },
      { code: "after(() => sendAnalytics(event));  // import { after } from 'next/server'" },
      { code: "setTimeout(() => sendAnalytics(event), 0);" },
      { code: "useEffect(() => { sendAnalytics(event); }, []);  // in a Server Component" },
      { code: "process.on('exit', () => sendAnalytics(event));" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`after` планирует работу на момент, **когда ответ уже отправлен**: логирование, аналитика, синхронизация — пользователь их не ждёт. `await` перед ответом замедлит каждую страницу, а `setTimeout` в серверлесс-окружении может не выполниться — функцию заморозят сразу после ответа; `after` как раз продлевает её жизнь до завершения задачи. В серверных компонентах эффектов нет.',
          en: '`after` schedules work for **once the response has been sent**: logging, analytics, syncing — the user doesn’t wait for them. `await` before responding slows every page, and `setTimeout` in a serverless environment may never run — the function is frozen right after responding; `after` extends its life until the task completes. Server Components have no effects.',
        },
      },
    ],
    sources: [{ title: 'Next.js — after', url: `${DOCS}/api-reference/functions/after` }],
  },
  {
    id: 'next-routing-router-refresh-001',
    topic: 'next',
    tags: ['next-routing', 'next-data'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'После действия в клиентском компоненте нужно перезагрузить данные серверных компонентов страницы, не теряя введённый текст и прокрутку. Что вызвать?',
      en: 'After an action in a Client Component you need to reload the page’s Server Component data without losing typed text and scroll. What do you call?',
    },
    options: [
      { code: 'window.location.reload();' },
      { code: 'router.refresh();  // const router = useRouter()' },
      { code: "router.push('/');" },
      { code: 'location.href = location.href;' },
      { code: 'router.back();' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`router.refresh()` заново запрашивает текущий маршрут у сервера и перерисовывает серверные компоненты, а клиентское состояние — поля, прокрутка, `useState` — сохраняется: React сливает новый результат с текущим деревом. `location.reload()` перезагружает страницу целиком и всё теряет. Если данные закешированы, `refresh` может вернуть то же самое — после мутаций кеш сбрасывают через `revalidatePath`/`updateTag`.',
          en: '`router.refresh()` re-requests the current route from the server and re-renders Server Components, while client state — inputs, scroll, `useState` — is preserved: React merges the new result into the current tree. `location.reload()` reloads the whole page and loses everything. If data is cached, `refresh` may return the same result — after mutations invalidate with `revalidatePath`/`updateTag`.',
        },
      },
    ],
    sources: [{ title: 'Next.js — useRouter: refresh', url: `${DOCS}/api-reference/functions/use-router` }],
  },
  {
    id: 'next-optimization-image-sizes-001',
    topic: 'next',
    tags: ['next-optimization'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Картинка с `fill` занимает треть ширины экрана на десктопе и всю ширину на телефоне. Зачем ей проп `sizes`?',
      en: 'An image with `fill` takes a third of the screen width on desktop and the full width on phones. Why does it need the `sizes` prop?',
    },
    code: {
      lang: 'tsx',
      source: '<Image src={photo} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" />',
    },
    options: [
      { text: { ru: 'Без него картинка не отобразится', en: 'Without it the image won’t render' } },
      {
        text: {
          ru: 'Без `sizes` Next.js считает, что картинка на всю ширину экрана, и браузер скачает файл в разы больше нужного',
          en: 'Without `sizes` Next.js assumes the image spans the full viewport, and the browser downloads a file several times larger than needed',
        },
      },
      { text: { ru: '`sizes` задаёт CSS-размер картинки', en: '`sizes` sets the image’s CSS size' } },
      { text: { ru: '`sizes` нужен только для SVG', en: '`sizes` is only for SVG' } },
      { text: { ru: 'Это подсказка для поисковиков', en: 'It’s a hint for search engines' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Браузер выбирает файл из `srcset` **до** вёрстки, когда реальный размер картинки ещё неизвестен. `sizes` сообщает: «на узких экранах 100% ширины, иначе треть». Без него для `fill` Next.js строит `srcset` как для картинки во весь экран, и на десктопе скачивается файл под 1920 пикселей вместо 640. Сам размер на экране по-прежнему задаёт CSS.',
          en: 'The browser picks a file from `srcset` **before** layout, when the image’s real size isn’t known yet. `sizes` tells it: “100% width on narrow screens, otherwise a third”. Without it, for `fill` Next.js builds `srcset` as for a full-viewport image, and desktop downloads a ~1920px file instead of ~640px. CSS still sets the on-screen size.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Image: sizes', url: `${DOCS}/api-reference/components/image#sizes` }],
  },
  {
    id: 'next-components-bundle-001',
    topic: 'next',
    tags: ['next-components', 'next-optimization'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Статья рендерится из Markdown через библиотеку на 200 КБ. Где её подключить, чтобы не раздувать бандл?',
      en: 'An article is rendered from Markdown using a 200 KB library. Where should you use it to avoid bloating the bundle?',
    },
    options: [
      { text: { ru: 'В клиентском компоненте статьи', en: 'In the article’s Client Component' } },
      {
        text: {
          ru: 'В серверном компоненте: разбор выполнится на сервере, а в браузер уйдёт только готовый HTML',
          en: 'In a Server Component: parsing happens on the server, and only finished HTML reaches the browser',
        },
      },
      { text: { ru: 'Загрузить библиотеку через `<script>` с CDN', en: 'Load the library via `<script>` from a CDN' } },
      { text: { ru: 'Через `next/dynamic` с `ssr: false`', en: 'Via `next/dynamic` with `ssr: false`' } },
      { text: { ru: 'В `proxy.ts`', en: 'In `proxy.ts`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Код серверного компонента и его зависимости в браузер не отправляются вовсе. Разбор Markdown, подсветка кода, форматирование дат большими библиотеками — идеальные кандидаты: пользователь получает HTML и ноль лишних килобайт JS. В клиентский бандл стоит пускать только то, что нужно для интерактивности. `ssr: false` наоборот перенесёт всю работу в браузер.',
          en: 'A Server Component’s code and its dependencies are never sent to the browser. Markdown parsing, code highlighting, date formatting with big libraries are ideal candidates: the user gets HTML and zero extra kilobytes of JS. Only what interactivity needs belongs in the client bundle. `ssr: false` would do the opposite, moving all the work to the browser.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Server and Client Components', url: `${DOCS}/getting-started/server-and-client-components` }],
  },
  {
    id: 'next-actions-cookies-set-001',
    topic: 'next',
    tags: ['next-actions'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Где в App Router можно **установить** cookie через `(await cookies()).set(...)`?',
      en: 'Where in the App Router can you **set** a cookie via `(await cookies()).set(...)`?',
    },
    options: [
      { text: { ru: 'Где угодно, включая рендер серверного компонента', en: 'Anywhere, including Server Component rendering' } },
      {
        text: {
          ru: 'Только в Server Action (серверной функции) или Route Handler — во время рендера серверного компонента нельзя',
          en: 'Only in a Server Action (Server Function) or Route Handler — not during Server Component rendering',
        },
      },
      { text: { ru: 'Только в клиентских компонентах', en: 'Only in Client Components' } },
      { text: { ru: 'Только в `layout.tsx`', en: 'Only in `layout.tsx`' } },
      { text: { ru: 'Только в `next.config`', en: 'Only in `next.config`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Cookie ставятся заголовком `Set-Cookie`, а заголовки уходят в начале ответа. Серверный компонент рендерится потоком — к моменту его выполнения заголовки могут быть уже отправлены, поэтому читать cookie в рендере можно, а менять нельзя. Изменение делают в ответ на действие: в Server Action (например, при входе) или Route Handler.',
          en: 'Cookies are set with a `Set-Cookie` header, and headers go out at the start of the response. A Server Component renders as a stream — by the time it runs, headers may already be sent, so you can read cookies during render but not change them. Changes happen in response to an action: in a Server Action (say, on login) or a Route Handler.',
        },
      },
    ],
    sources: [{ title: 'Next.js — cookies', url: `${DOCS}/api-reference/functions/cookies` }],
  },
];
