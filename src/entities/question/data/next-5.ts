import type { Question } from '../model/types';

const DOCS = 'https://nextjs.org/docs/app';

export const NEXT_QUESTIONS_5: Question[] = [
  {
    id: 'next-routing-loading-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что даёт файл `app/dashboard/loading.tsx`?',
      en: 'What does the file `app/dashboard/loading.tsx` give you?',
    },
    options: [
      { text: { ru: 'Показывает спиннер только при первой загрузке сайта', en: 'Shows a spinner only on the site’s first load' } },
      {
        text: {
          ru: 'Оборачивает страницу сегмента в `<Suspense>`: при переходе сразу показывается заглушка, а layout остаётся интерактивным',
          en: 'Wraps the segment’s page in `<Suspense>`: navigation shows the fallback instantly, and the layout stays interactive',
        },
      },
      { text: { ru: 'Загружает данные для `page.tsx`', en: 'Loads data for `page.tsx`' } },
      { text: { ru: 'Отключает серверный рендеринг для раздела', en: 'Disables server rendering for the section' } },
      { text: { ru: 'Показывает индикатор во время сборки', en: 'Shows an indicator during the build' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`loading.tsx` вкладывается внутрь `layout.tsx` того же сегмента и оборачивает `page.tsx` и всё ниже в `<Suspense>`. Заглушка предзагружается вместе со ссылкой, поэтому переход мгновенный, а содержимое приходит потоком и подменяет её. Переход можно прервать, не дожидаясь загрузки, а общий layout — меню, поиск — продолжает работать. Сам layout в границу не входит.',
          en: '`loading.tsx` nests inside the same segment’s `layout.tsx` and wraps `page.tsx` and everything below in `<Suspense>`. The fallback is prefetched with the link, so navigation is instant, and the content streams in and replaces it. Navigation can be interrupted without waiting, and the shared layout — menu, search — keeps working. The layout itself isn’t inside the boundary.',
        },
      },
    ],
    sources: [{ title: 'Next.js — loading.js', url: `${DOCS}/api-reference/file-conventions/loading` }],
  },
  {
    id: 'next-routing-redirects-config-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Блог переехал с `/blog/:slug` на `/posts/:slug`. Как настроить постоянный редирект так, чтобы поисковики обновили ссылки?',
      en: 'The blog moved from `/blog/:slug` to `/posts/:slug`. How do you set up a permanent redirect so search engines update their links?',
    },
    options: [
      { text: { ru: 'В каждой старой странице вызывать `router.push` в `useEffect`', en: 'Call `router.push` in `useEffect` on every old page' } },
      {
        text: {
          ru: '`redirects()` в `next.config` с `source: "/blog/:slug"`, `destination: "/posts/:slug"`, `permanent: true` — ответ 308',
          en: '`redirects()` in `next.config` with `source: "/blog/:slug"`, `destination: "/posts/:slug"`, `permanent: true` — a 308 response',
        },
      },
      { text: { ru: 'Оставить старые страницы и добавить на них ссылку на новые', en: 'Keep the old pages and add a link to the new ones' } },
      { text: { ru: '`<meta http-equiv="refresh">` на старых страницах', en: '`<meta http-equiv="refresh">` on the old pages' } },
      { text: { ru: '`permanent: false` — так безопаснее для SEO', en: '`permanent: false` — safer for SEO' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Редиректы из `next.config` срабатывают до поиска страниц и файлов в `public`, а параметр `:slug` переносится в новый адрес вместе со строкой запроса. `permanent: true` даёт 308: браузеры и поисковики запоминают переезд. Next.js использует 307/308 вместо 302/301, потому что они сохраняют метод запроса — `POST` не превратится в `GET`. Клиентский `router.push` поисковик не увидит.',
          en: 'Redirects from `next.config` run before pages and `public` files are matched, and the `:slug` parameter carries over to the new path along with the query string. `permanent: true` gives a 308: browsers and search engines remember the move. Next.js uses 307/308 instead of 302/301 because they preserve the request method — a `POST` won’t become a `GET`. A client-side `router.push` is invisible to search engines.',
        },
      },
    ],
    sources: [{ title: 'Next.js — redirects', url: `${DOCS}/api-reference/config/next-config-js/redirects` }],
  },
  {
    id: 'next-data-update-tag-001',
    topic: 'next',
    tags: ['next-data'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Next.js 16. Server Action сохраняет профиль, и пользователь должен **сразу** увидеть новые данные, а не закешированные. Что вызвать?',
      en: 'Next.js 16. A Server Action saves a profile, and the user must see the new data **right away**, not the cached version. What should you call?',
    },
    options: [
      { text: { ru: '`revalidateTag("profile", "max")`', en: '`revalidateTag("profile", "max")`' } },
      {
        text: {
          ru: '`updateTag("profile")` — следующий запрос дождётся свежих данных',
          en: '`updateTag("profile")` — the next request waits for fresh data',
        },
      },
      { text: { ru: '`router.refresh()` на сервере', en: '`router.refresh()` on the server' } },
      { text: { ru: 'Ничего: Server Action сам сбрасывает весь кеш', en: 'Nothing: a Server Action clears the whole cache itself' } },
      { text: { ru: '`location.reload()` после действия', en: '`location.reload()` after the action' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`updateTag` создан для сценария «прочитать свою же запись»: он сразу делает данные с тегом устаревшими, и следующий запрос ждёт свежие, а не отдаёт старые. Вызывать его можно только из Server Action. `revalidateTag(tag, "max")` работает по схеме stale-while-revalidate: пока данные обновляются в фоне, отдаётся старая версия — подходит для вебхуков и Route Handlers, где пользователь не ждёт мгновенного результата.',
          en: '`updateTag` is built for read-your-own-writes: it immediately expires the tagged data, so the next request waits for fresh data instead of serving stale content. It can only be called from a Server Action. `revalidateTag(tag, "max")` uses stale-while-revalidate: the old version is served while fresh data loads in the background — fine for webhooks and Route Handlers, where nobody expects an instant result.',
        },
      },
    ],
    sources: [{ title: 'Next.js — updateTag', url: `${DOCS}/api-reference/functions/updateTag` }],
  },
  {
    id: 'next-components-third-party-001',
    topic: 'next',
    tags: ['next-components'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Карусель из npm-пакета использует `useState`, но в пакете нет `"use client"`. В серверной странице `<Carousel />` падает с ошибкой. Что сделать?',
      en: 'A carousel from an npm package uses `useState`, but the package has no `"use client"`. In a server page `<Carousel />` throws an error. What should you do?',
    },
    options: [
      { text: { ru: 'Добавить `"use client"` в файл внутри `node_modules`', en: 'Add `"use client"` to the file inside `node_modules`' } },
      { text: { ru: 'Сделать клиентской всю страницу', en: 'Make the whole page a Client Component' } },
      {
        text: {
          ru: 'Создать свой файл с `"use client"`, который реэкспортирует `Carousel`, и импортировать его',
          en: 'Create your own file with `"use client"` that re-exports `Carousel`, and import that',
        },
      },
      { text: { ru: 'Использовать `next/dynamic` с `ssr: true`', en: 'Use `next/dynamic` with `ssr: true`' } },
      { text: { ru: 'Отказаться от пакета', en: 'Drop the package' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Next.js не знает, что компонент из пакета использует клиентские возможности: директивы в нём нет. Обёртка из двух строк — `"use client"` и `export { Carousel } from "acme-carousel"` — проводит границу, и серверная страница остаётся серверной, а клиентским становится только виджет. Правка `node_modules` пропадёт при переустановке, а клиентская страница целиком раздует бандл.',
          en: 'Next.js doesn’t know the package component uses client features: it has no directive. A two-line wrapper — `"use client"` and `export { Carousel } from "acme-carousel"` — draws the boundary, so the server page stays a server page and only the widget becomes client code. Editing `node_modules` is lost on reinstall, and making the whole page client-side bloats the bundle.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Third-party components', url: `${DOCS}/getting-started/server-and-client-components` }],
  },
  {
    id: 'next-components-use-server-001',
    topic: 'next',
    tags: ['next-components', 'next-actions'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чем `"use server"` в начале файла отличается от `import "server-only"`?',
      en: 'How does `"use server"` at the top of a file differ from `import "server-only"`?',
    },
    options: [
      { text: { ru: 'Это одно и то же', en: 'They’re the same thing' } },
      {
        text: {
          ru: '`"use server"` делает экспортируемые функции Server Actions, которые клиент может вызвать по сети; `server-only` лишь запрещает импорт модуля в клиентский код',
          en: '`"use server"` turns exported functions into Server Actions the client can call over the network; `server-only` just forbids importing the module into client code',
        },
      },
      { text: { ru: '`"use server"` помечает серверные компоненты', en: '`"use server"` marks Server Components' } },
      { text: { ru: '`server-only` шифрует код модуля', en: '`server-only` encrypts the module’s code' } },
      { text: { ru: '`"use server"` запрещает импорт модуля на клиенте', en: '`"use server"` forbids importing the module on the client' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`"use server"` открывает функции наружу: каждая экспортируемая функция файла становится Server Action с собственной точкой входа, и её можно вызвать запросом в обход интерфейса. Поэтому внутри обязательны проверка прав и валидация. `import "server-only"` ничего не открывает — он даёт ошибку сборки, если модуль с секретами случайно попадёт в клиентский бандл. [[rsc|Серверные компоненты]] директивы не требуют: в `app/` они по умолчанию.',
          en: '`"use server"` exposes functions: every exported function in the file becomes a Server Action with its own entry point, callable by a request that bypasses the UI. So authorization and validation inside are mandatory. `import "server-only"` exposes nothing — it causes a build error if a module with secrets accidentally ends up in the client bundle. [[rsc|Server Components]] need no directive: they’re the default in `app/`.',
        },
      },
    ],
    sources: [
      { title: 'Next.js — use server', url: `${DOCS}/api-reference/directives/use-server` },
      { title: 'Next.js — Preventing environment poisoning', url: `${DOCS}/getting-started/server-and-client-components` },
    ],
  },
  {
    id: 'next-actions-optimistic-001',
    topic: 'next',
    tags: ['next-actions'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Лайк сохраняется через Server Action около секунды. Как показать новый счётчик сразу, а при ошибке вернуть прежний?',
      en: 'A like is saved via a Server Action in about a second. How do you show the new count immediately and roll back on error?',
    },
    options: [
      { text: { ru: 'Блокировать кнопку на секунду', en: 'Disable the button for a second' } },
      {
        text: {
          ru: '`useOptimistic`: показать предполагаемое значение на время действия — после завершения React вернётся к настоящему состоянию',
          en: '`useOptimistic`: show the expected value while the action runs — when it finishes, React falls back to the real state',
        },
      },
      { text: { ru: 'Перезагрузить страницу после действия', en: 'Reload the page after the action' } },
      { text: { ru: 'Обновить счётчик через `setTimeout`', en: 'Update the count with `setTimeout`' } },
      { text: { ru: 'Хранить лайки в `localStorage`', en: 'Store likes in `localStorage`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`useOptimistic` возвращает временное значение, которое живёт, пока идёт действие или переход. Пользователь видит `+1` мгновенно; если действие успешно и данные обновились, показывается уже настоящее значение, а если упало — оптимистичное просто исчезает, и на экране снова прежнее. Отката руками писать не нужно.',
          en: '`useOptimistic` returns a temporary value that lives while the action or transition is pending. The user sees `+1` instantly; if the action succeeds and the data refreshes, the real value takes over, and if it fails the optimistic value simply disappears, leaving the previous one. No manual rollback needed.',
        },
      },
    ],
    sources: [{ title: 'React — useOptimistic', url: 'https://react.dev/reference/react/useOptimistic' }],
  },
  {
    id: 'next-actions-body-limit-001',
    topic: 'next',
    tags: ['next-actions'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Форма загружает фото на 5 МБ через Server Action, и запрос падает, хотя на маленьких файлах всё работает. Почему?',
      en: 'A form uploads a 5 MB photo via a Server Action, and the request fails, although small files work. Why?',
    },
    options: [
      { text: { ru: 'Server Actions не умеют принимать файлы', en: 'Server Actions can’t accept files' } },
      {
        text: {
          ru: 'По умолчанию тело запроса к Server Action ограничено 1 МБ; лимит меняют через `serverActions.bodySizeLimit`',
          en: 'By default a Server Action request body is limited to 1 MB; change it with `serverActions.bodySizeLimit`',
        },
      },
      { text: { ru: 'Нужно передать файл в base64', en: 'The file must be sent as base64' } },
      { text: { ru: 'Браузер не отправляет файлы больше 4 МБ', en: 'Browsers don’t send files over 4 MB' } },
      { text: { ru: 'Нужно включить `"use client"` в action', en: 'You need `"use client"` in the action' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Next.js ограничивает тело запроса к Server Action одним мегабайтом, чтобы большой запрос не занимал ресурсы сервера и не открывал путь к DoS. Лимит поднимают в `next.config`: `serverActions: { bodySizeLimit: "6mb" }` — с запасом, потому что multipart добавляет к файлу служебные байты. Для больших файлов надёжнее загрузка напрямую в хранилище по подписанной ссылке.',
          en: 'Next.js limits a Server Action request body to one megabyte so a large request doesn’t tie up server resources or open the door to DoS. Raise it in `next.config`: `serverActions: { bodySizeLimit: "6mb" }` — with headroom, since multipart adds overhead bytes to the file. For large files, uploading directly to storage via a signed URL is more robust.',
        },
      },
    ],
    sources: [{ title: 'Next.js — serverActions: bodySizeLimit', url: `${DOCS}/api-reference/config/next-config-js/serverActions` }],
  },
  {
    id: 'next-optimization-blur-001',
    topic: 'next',
    tags: ['next-optimization'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Картинка подключена так: `import hero from "./hero.jpg"`, `<Image src={hero} … />`. Как показать размытую заглушку, пока она грузится?',
      en: 'An image is used like this: `import hero from "./hero.jpg"`, `<Image src={hero} … />`. How do you show a blurred placeholder while it loads?',
    },
    options: [
      { text: { ru: 'Вручную сгенерировать `blurDataURL` и передать его', en: 'Generate a `blurDataURL` by hand and pass it' } },
      {
        text: {
          ru: 'Добавить `placeholder="blur"` — для статического импорта `blurDataURL` создаётся автоматически',
          en: 'Add `placeholder="blur"` — for a static import the `blurDataURL` is generated automatically',
        },
      },
      { text: { ru: 'CSS `filter: blur()` на `<Image>`', en: 'CSS `filter: blur()` on `<Image>`' } },
      { text: { ru: 'Это невозможно для локальных картинок', en: 'It’s impossible for local images' } },
      { text: { ru: '`loading="eager"`', en: '`loading="eager"`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При статическом импорте `jpg`, `png`, `webp` или `avif` Next.js сам вычисляет размеры и крошечную размытую версию картинки — достаточно `placeholder="blur"`. Для удалённого `src` такой информации нет, и `blurDataURL` (маленький data URL) передают сами. Заглушка снижает ощущение пустоты, а заданные размеры не дают макету прыгать.',
          en: 'With a static import of a `jpg`, `png`, `webp` or `avif`, Next.js computes the dimensions and a tiny blurred version itself — `placeholder="blur"` is enough. A remote `src` has no such info, so you pass the `blurDataURL` (a small data URL) yourself. The placeholder makes loading feel less empty, and the known dimensions keep the layout from jumping.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Image: blurDataURL', url: `${DOCS}/api-reference/components/image` }],
  },
  {
    id: 'next-rendering-search-params-suspense-001',
    topic: 'next',
    tags: ['next-rendering'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Клиентский поиск в шапке статической страницы читает `useSearchParams()`. В разработке всё работает, а `next build` падает. В чём дело?',
      en: 'A client search box in a static page’s header reads `useSearchParams()`. It works in development, but `next build` fails. What’s wrong?',
    },
    options: [
      { text: { ru: '`useSearchParams` нельзя использовать в клиентских компонентах', en: '`useSearchParams` can’t be used in Client Components' } },
      {
        text: {
          ru: 'Компонент нужно обернуть в `<Suspense>`: параметры запроса неизвестны при предварительном рендеринге, и без границы сборка падает',
          en: 'The component must be wrapped in `<Suspense>`: query params are unknown at prerender time, and without a boundary the build fails',
        },
      },
      { text: { ru: 'Нужно заменить на `window.location.search`', en: 'Replace it with `window.location.search`' } },
      { text: { ru: 'В продакшене `useSearchParams` всегда возвращает `null`', en: 'In production `useSearchParams` always returns `null`' } },
      { text: { ru: 'Нужно добавить `"use server"` в компонент', en: 'Add `"use server"` to the component' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Статическая страница рендерится при сборке, когда строки запроса ещё нет. `useSearchParams` заставляет рендерить на клиенте всё до ближайшей границы `<Suspense>`; без неё сборка падает с ошибкой о пропущенной границе. С `<Suspense fallback={…}>` вокруг поиска остальная страница попадает в HTML, а поиск дорисуется в браузере. В разработке страницы рендерятся по запросу, поэтому проблема видна только при сборке.',
          en: 'A static page is rendered at build time, when there’s no query string yet. `useSearchParams` forces client rendering of everything up to the nearest `<Suspense>` boundary; without one the build fails with a missing-boundary error. With `<Suspense fallback={…}>` around the search box, the rest of the page goes into the HTML and the search renders in the browser. In development pages render on demand, so the issue only shows up at build time.',
        },
      },
    ],
    sources: [{ title: 'Next.js — useSearchParams: Prerendering', url: `${DOCS}/api-reference/functions/use-search-params` }],
  },
  {
    id: 'next-data-direct-db-001',
    topic: 'next',
    tags: ['next-data'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Серверной странице нужны заказы из своей базы. Как их получить?',
      en: 'A server page needs orders from your own database. How should it get them?',
    },
    options: [
      {
        text: {
          ru: 'Сделать Route Handler `/api/orders` и вызвать его через `fetch` из страницы',
          en: 'Create a Route Handler `/api/orders` and call it with `fetch` from the page',
        },
      },
      {
        text: {
          ru: 'Запросить базу прямо в серверном компоненте (через ORM или функцию слоя данных)',
          en: 'Query the database directly in the Server Component (via an ORM or a data-layer function)',
        },
      },
      { text: { ru: 'Загрузить заказы в `useEffect`', en: 'Load the orders in `useEffect`' } },
      { text: { ru: 'Передать строку подключения к базе в клиентский компонент', en: 'Pass the database connection string to a Client Component' } },
      { text: { ru: 'Выгрузить заказы в JSON при сборке', en: 'Export the orders to JSON at build time' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[rsc|Серверный компонент]] и так выполняется на сервере: он может читать базу напрямую, а секреты остаются там же. Свой Route Handler здесь — лишний HTTP-запрос сервера к самому себе, с сериализацией и отдельной обработкой ошибок. Route Handlers нужны, когда данные запрашивает кто-то снаружи: мобильное приложение, вебхук, клиентский код. Запросы удобно собрать в слой данных с проверкой прав.',
          en: 'A [[rsc|Server Component]] already runs on the server: it can read the database directly, and secrets stay there. Your own Route Handler here is an extra HTTP request from the server to itself, with serialization and separate error handling. Route Handlers are for outside callers: a mobile app, a webhook, client code. Gather queries into a data layer that also checks permissions.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Fetching Data', url: `${DOCS}/getting-started/fetching-data` }],
  },
];
