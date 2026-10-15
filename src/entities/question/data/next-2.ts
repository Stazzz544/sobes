import type { Question } from '../model/types';

const DOCS = 'https://nextjs.org/docs/app';

export const NEXT_QUESTIONS_2: Question[] = [
  {
    id: 'next-routing-not-found-001',
    topic: 'next',
    tags: ['next-routing'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Страница `app/posts/[slug]/page.tsx` не нашла пост в базе. Как правильно показать 404?',
      en: '`app/posts/[slug]/page.tsx` didn’t find the post in the database. How do you show a 404 properly?',
    },
    options: [
      { code: "return <p>Not found</p>;" },
      { code: "notFound();  // import { notFound } from 'next/navigation'" },
      { code: "throw new Error('404');" },
      { code: "window.location.href = '/404';" },
      { code: "return null;" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`notFound()` прерывает рендер сегмента и показывает ближайший `not-found.tsx` с настоящим статусом 404, а также добавляет `noindex` для поисковиков. Обычная разметка «Not found» отдаётся со статусом 200 — для поисковиков это нормальная страница. `throw new Error` попадёт в `error.tsx` как сбой, а не как отсутствие ресурса.',
          en: '`notFound()` stops rendering the segment and shows the nearest `not-found.tsx` with a real 404 status, also adding `noindex` for search engines. Plain “Not found” markup is served with status 200 — a normal page to search engines. `throw new Error` lands in `error.tsx` as a failure, not a missing resource.',
        },
      },
    ],
    sources: [{ title: 'Next.js — notFound', url: `${DOCS}/api-reference/functions/not-found` }],
  },
  {
    id: 'next-routing-redirect-001',
    topic: 'next',
    tags: ['next-routing', 'next-actions'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Server Action сохраняет пост и должен перенаправить на него, но вместо перехода срабатывает `catch` с ошибкой `NEXT_REDIRECT`. Почему?',
      en: 'A Server Action saves a post and should redirect to it, but instead the `catch` fires with a `NEXT_REDIRECT` error. Why?',
    },
    code: {
      lang: 'tsx',
      source: `'use server';

export async function createPost(formData: FormData) {
  try {
    const post = await db.post.create({ title: formData.get('title') });
    redirect(\`/posts/\${post.id}\`);
  } catch (error) {
    return { error: 'Could not save the post' };
  }
}`,
    },
    options: [
      { text: { ru: '`redirect` нельзя вызывать в Server Actions', en: '`redirect` can’t be called in Server Actions' } },
      {
        text: {
          ru: '`redirect` работает, выбрасывая служебную ошибку, и `catch` её перехватил; вызывать его нужно после блока `try/catch`',
          en: '`redirect` works by throwing an internal error, and `catch` swallowed it; call it after the `try/catch` block',
        },
      },
      { text: { ru: 'Нужно вернуть `redirect(...)` через `return`', en: 'You must `return redirect(...)`' } },
      { text: { ru: 'Адрес должен быть абсолютным', en: 'The URL must be absolute' } },
      { text: { ru: 'Перед `redirect` нужен `await`', en: '`redirect` needs `await`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`redirect()` и `notFound()` прерывают выполнение, **бросая** специальную ошибку, которую ловит Next.js. Общий `catch` перехватывает её как обычную ошибку — и перенаправление не случается. Правильно: в `try` — только операция с базой, а `redirect` — после блока.',
          en: '`redirect()` and `notFound()` stop execution by **throwing** a special error that Next.js catches. A generic `catch` intercepts it as a regular error — and the redirect never happens. Correct: keep only the database call in `try`, and call `redirect` after the block.',
        },
      },
    ],
    sources: [{ title: 'Next.js — redirect', url: `${DOCS}/api-reference/functions/redirect` }],
  },
  {
    id: 'next-rendering-metadata-001',
    topic: 'next',
    tags: ['next-rendering', 'next-optimization'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Как задать заголовок вкладки и описание для каждой статьи блога в App Router?',
      en: 'How do you set the tab title and description for each blog article in the App Router?',
    },
    options: [
      { code: "useEffect(() => { document.title = post.title; }, [post]);" },
      { code: "export async function generateMetadata({ params }) {\n  const { slug } = await params;\n  const post = await getPost(slug);\n  return { title: post.title, description: post.excerpt };\n}" },
      { code: "<head><title>{post.title}</title></head>  // in a Client Component" },
      { code: "export const metadata = { title: 'Blog' };  // in a 'use client' file" },
      { code: "next.config.js: { titles: { '/blog/*': post.title } }" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Метаданные задают экспортом `metadata` (статично) или `generateMetadata` (из данных) в `page` или `layout`. Они вычисляются на сервере и попадают в HTML сразу — их видят поисковики и превью ссылок. Оба экспорта работают только в серверных компонентах; `document.title` в эффекте появится лишь после загрузки JS.',
          en: 'Metadata is set by exporting `metadata` (static) or `generateMetadata` (from data) in a `page` or `layout`. It’s resolved on the server and lands in the HTML right away — search engines and link previews see it. Both exports only work in Server Components; `document.title` in an effect appears only after JS loads.',
        },
      },
    ],
    sources: [{ title: 'Next.js — generateMetadata', url: `${DOCS}/api-reference/functions/generate-metadata` }],
  },
  {
    id: 'next-rendering-streaming-001',
    topic: 'next',
    tags: ['next-rendering', 'next-data'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'На странице быстрый заголовок и медленный блок рекомендаций (3 секунды). Как показать заголовок сразу?',
      en: 'A page has a fast header and a slow recommendations block (3 seconds). How do you show the header immediately?',
    },
    options: [
      { text: { ru: 'Загружать рекомендации в `useEffect` на клиенте — другого способа нет', en: 'Load recommendations in `useEffect` on the client — there’s no other way' } },
      {
        text: {
          ru: 'Обернуть `<Recommendations />` в `<Suspense fallback={<Skeleton />}>`: HTML страницы придёт сразу, а блок догрузится потоком',
          en: 'Wrap `<Recommendations />` in `<Suspense fallback={<Skeleton />}>`: the page HTML arrives at once, and the block streams in later',
        },
      },
      { text: { ru: 'Увеличить таймаут сервера', en: 'Increase the server timeout' } },
      { text: { ru: 'Сделать страницу клиентской целиком', en: 'Make the whole page a Client Component' } },
      { text: { ru: 'Закешировать заголовок через `localStorage`', en: 'Cache the header in `localStorage`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Стриминг**: сервер отправляет HTML кусками. Всё вне `<Suspense>` уходит сразу, на месте медленного блока — `fallback`, а когда данные готовы, тот же ответ досылает разметку блока. `loading.tsx` делает то же для всей страницы. Данные при этом грузятся на сервере, без водопада «HTML → JS → запрос».',
          en: '**Streaming**: the server sends HTML in chunks. Everything outside `<Suspense>` goes out at once, the slow block shows its `fallback`, and when data is ready the same response sends the block’s markup. `loading.tsx` does the same for a whole page. Data still loads on the server, without the “HTML → JS → request” waterfall.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Streaming', url: `${DOCS}/guides/streaming` }],
  },
  {
    id: 'next-actions-forms-001',
    topic: 'next',
    tags: ['next-actions'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Форма в серверном компоненте вызывает Server Action через `<form action={createPost}>`. Что будет, если JavaScript в браузере ещё не загрузился?',
      en: 'A form in a Server Component calls a Server Action via `<form action={createPost}>`. What happens if JavaScript hasn’t loaded in the browser yet?',
    },
    options: [
      { text: { ru: 'Кнопка не сработает', en: 'The button won’t work' } },
      {
        text: {
          ru: 'Форма отправится обычным POST-запросом, и action выполнится — это прогрессивное улучшение',
          en: 'The form submits as a regular POST request, and the action runs — that’s progressive enhancement',
        },
      },
      { text: { ru: 'Данные сохранятся в `localStorage` до загрузки JS', en: 'Data is saved to `localStorage` until JS loads' } },
      { text: { ru: 'Next.js покажет ошибку гидрации', en: 'Next.js shows a hydration error' } },
      { text: { ru: 'Форма отправится GET-запросом с данными в URL', en: 'The form submits a GET request with data in the URL' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Next.js превращает `action` в настоящий атрибут формы, поэтому браузер умеет отправить её сам, без JavaScript. Когда JS загрузится, React перехватывает отправку и обновляет страницу без перезагрузки. Это полезно на медленных сетях: пользователь может отправить форму, пока бандл ещё грузится.',
          en: 'Next.js turns `action` into a real form attribute, so the browser can submit it by itself, without JavaScript. Once JS loads, React intercepts submissions and updates the page without a reload. This helps on slow networks: the user can submit while the bundle is still loading.',
        },
      },
    ],
    sources: [
      { title: 'Next.js — Mutating Data', url: `${DOCS}/getting-started/mutating-data` },
      { title: 'Next.js — Forms', url: `${DOCS}/guides/forms` },
    ],
  },
  {
    id: 'next-components-context-001',
    topic: 'next',
    tags: ['next-components'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Нужен `ThemeContext` для всего приложения. Как подключить провайдер в `app/layout.tsx`, не превращая весь layout в клиентский?',
      en: 'You need a `ThemeContext` for the whole app. How do you add the provider in `app/layout.tsx` without making the whole layout a Client Component?',
    },
    options: [
      { text: { ru: 'Добавить `"use client"` в `layout.tsx`', en: 'Add `"use client"` to `layout.tsx`' } },
      {
        text: {
          ru: 'Вынести провайдер в отдельный клиентский компонент `ThemeProvider`, принимающий `children`, и обернуть им `children` в layout',
          en: 'Move the provider into a separate Client Component `ThemeProvider` that accepts `children`, and wrap `children` with it in the layout',
        },
      },
      { text: { ru: 'Вызвать `createContext` прямо в серверном layout', en: 'Call `createContext` right in the server layout' } },
      { text: { ru: 'Передать тему через `cookies()` в каждый компонент', en: 'Pass the theme via `cookies()` to every component' } },
      { text: { ru: 'Контекст в App Router не поддерживается совсем', en: 'Context isn’t supported in the App Router at all' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Контекст работает только в клиентских компонентах. Провайдер выносят в файл с `"use client"`, который принимает `children`, а layout остаётся серверным и просто оборачивает им дерево. Страницы, переданные как `children`, по-прежнему рендерятся на сервере. Провайдер ставят как можно глубже — только вокруг части, которой он нужен.',
          en: 'Context only works in Client Components. Move the provider into a `"use client"` file that accepts `children`, and the layout stays a Server Component that simply wraps the tree. Pages passed as `children` still render on the server. Place the provider as deep as possible — only around the part that needs it.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Context providers', url: `${DOCS}/getting-started/server-and-client-components#context-providers` }],
  },
  {
    id: 'next-data-react-cache-001',
    topic: 'next',
    tags: ['next-data'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: '`layout` и `page` оба вызывают `getUser(id)`, который ходит в базу через ORM, а не через `fetch`. Как не делать два запроса за один рендер?',
      en: '`layout` and `page` both call `getUser(id)`, which queries the database via an ORM, not `fetch`. How do you avoid two queries in one render?',
    },
    options: [
      { text: { ru: 'Next.js сам дедуплицирует любые функции', en: 'Next.js deduplicates any function by itself' } },
      { code: "export const getUser = cache(async (id) => db.user.findUnique({ where: { id } }));  // import { cache } from 'react'" },
      { code: 'let user; export const getUser = async (id) => (user ??= await db.user.findUnique({ where: { id } }));' },
      { text: { ru: 'Передать пользователя из `layout` в `page` через пропсы', en: 'Pass the user from `layout` to `page` via props' } },
      { text: { ru: 'Сохранить пользователя в `localStorage`', en: 'Save the user in `localStorage`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Автоматическая мемоизация распространяется только на `fetch`. Для запросов к базе есть `React.cache`: вызовы с теми же аргументами в рамках **одного запроса** вернут один результат. Модульная переменная опасна — она общая для всех пользователей сервера. А `layout` не передаёт пропсы в `page`, поэтому данные запрашивают там, где они нужны, и дедуплицируют.',
          en: 'Automatic memoization only covers `fetch`. For database calls there’s `React.cache`: calls with the same arguments within **one request** return one result. A module variable is dangerous — it’s shared by all users of the server. And `layout` can’t pass props to `page`, so data is fetched where needed and deduplicated.',
        },
      },
    ],
    sources: [
      { title: 'React — cache', url: 'https://react.dev/reference/react/cache' },
      { title: 'Next.js — Fetching Data', url: `${DOCS}/getting-started/fetching-data` },
    ],
  },
  {
    id: 'next-optimization-dynamic-001',
    topic: 'next',
    tags: ['next-optimization', 'next-components'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Библиотека графиков обращается к `window` при импорте и падает на сервере. Как подключить её только в браузере?',
      en: 'A chart library touches `window` on import and crashes on the server. How do you load it only in the browser?',
    },
    options: [
      { code: "import Chart from 'chart-lib';  // in a Server Component" },
      { code: "const Chart = dynamic(() => import('./chart'), { ssr: false });  // in a Client Component" },
      { code: "if (typeof window !== 'undefined') { import Chart from 'chart-lib'; }" },
      { code: "export const dynamic = 'force-dynamic';" },
      { code: "const Chart = require('chart-lib');" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`next/dynamic` с `ssr: false` загружает компонент только на клиенте и выносит его в отдельный чанк. Опция работает только внутри клиентских компонентов. Статический `import` нельзя поставить в `if`, а `force-dynamic` управляет рендером страницы, а не загрузкой модулей. Пока компонент грузится, можно показать `loading`.',
          en: '`next/dynamic` with `ssr: false` loads the component only on the client and splits it into a separate chunk. The option works only inside Client Components. A static `import` can’t go in an `if`, and `force-dynamic` controls page rendering, not module loading. While it loads, you can show `loading`.',
        },
      },
    ],
    sources: [{ title: 'Next.js — Lazy Loading', url: `${DOCS}/guides/lazy-loading` }],
  },
];
