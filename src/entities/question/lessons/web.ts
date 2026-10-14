import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const WEB_LESSONS: Lesson[] = [
  {
    tag: 'http',
    summary: {
      ru: 'HTTP — протокол «запрос — ответ»: метод, адрес, заголовки и тело в одну сторону, статус, заголовки и тело — в другую.',
      en: 'HTTP is a request–response protocol: method, URL, headers and body one way; status, headers and body the other way.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Метод задаёт смысл запроса. `GET` только читает: он безопасен, идемпотентен и кэшируется. `POST` создаёт или запускает действие и не идемпотентен — повтор может создать дубль. `PUT` заменяет ресурс целиком, `PATCH` меняет часть, `DELETE` удаляет; `PUT` и `DELETE` [[idempotent|идемпотентны]] — повтор даёт тот же результат, поэтому их безопасно переотправлять при сбое сети.',
          en: 'The method defines the meaning of a request. `GET` only reads: it is safe, idempotent and cacheable. `POST` creates or triggers an action and isn’t idempotent — a retry may create a duplicate. `PUT` replaces a resource, `PATCH` changes part of it, `DELETE` removes it; `PUT` and `DELETE` are [[idempotent|idempotent]] — a repeat gives the same result, so they’re safe to retry after a network failure.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'http',
          source: `GET /api/users/42 HTTP/1.1
Host: example.com
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=60

{"id":42,"name":"Ann"}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Классы статусов: `2xx` — успех (`200`, `201 Created`, `204 No Content`), `3xx` — перенаправление и кэш (`301`, `302`, `304 Not Modified`), `4xx` — ошибка клиента (`400`, `401` — не аутентифицирован, `403` — нет прав, `404`, `409`, `429`), `5xx` — ошибка сервера. HTTP/2 гонит много запросов по одному соединению, HTTP/3 работает поверх QUIC и не страдает от потерь пакетов TCP.',
          en: 'Status classes: `2xx` success (`200`, `201 Created`, `204 No Content`), `3xx` redirects and caching (`301`, `302`, `304 Not Modified`), `4xx` client errors (`400`, `401` — not authenticated, `403` — not allowed, `404`, `409`, `429`), `5xx` server errors. HTTP/2 multiplexes many requests over one connection, HTTP/3 runs over QUIC and doesn’t suffer from TCP packet loss.',
        },
      },
    ],
    keyPoints: [
      { ru: '`GET` безопасен и идемпотентен, `POST` — нет.', en: '`GET` is safe and idempotent, `POST` isn’t.' },
      { ru: '`PUT` и `DELETE` идемпотентны: повтор не меняет результат.', en: '`PUT` and `DELETE` are idempotent: a repeat doesn’t change the result.' },
      { ru: '`401` — не аутентифицирован, `403` — нет прав.', en: '`401` is not authenticated, `403` is not allowed.' },
      { ru: '`304` — ресурс не изменился, берите из кэша.', en: '`304` means unchanged — use the cached copy.' },
      { ru: 'HTTP/2 мультиплексирует запросы, HTTP/3 работает поверх QUIC.', en: 'HTTP/2 multiplexes requests, HTTP/3 runs over QUIC.' },
    ],
    sources: [
      { title: 'RFC 9110 — Idempotent methods', url: 'https://www.rfc-editor.org/rfc/rfc9110#name-idempotent-methods' },
      { title: 'MDN — 401 Unauthorized', url: `${MDN}/Web/HTTP/Reference/Status/401` },
      { title: 'MDN — 403 Forbidden', url: `${MDN}/Web/HTTP/Reference/Status/403` },
    ],
  },
  {
    tag: 'caching',
    summary: {
      ru: 'HTTP-кэш хранит ответы и отдаёт их без сети или после короткой проверки. Правила задаёт сервер заголовком `Cache-Control`.',
      en: 'The HTTP cache stores responses and serves them without the network or after a quick check. The server sets the rules with `Cache-Control`.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`max-age=N` — ответ свеж N секунд и берётся из кэша без запроса. `no-cache` — хранить можно, но перед каждым использованием проверить у сервера. `no-store` — не хранить вовсе. `private` — только кэш браузера, `public` и `s-maxage` — правила для общих кэшей (CDN), `immutable` — не перепроверять даже при перезагрузке.',
          en: '`max-age=N` — the response is fresh for N seconds and served from cache without a request. `no-cache` — may be stored but must be checked with the server before each use. `no-store` — don’t store at all. `private` — browser cache only; `public` and `s-maxage` — rules for shared caches (CDN); `immutable` — don’t revalidate even on reload.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Проверка (ревалидация): сервер отдал `ETag` или `Last-Modified`, браузер присылает `If-None-Match` или `If-Modified-Since`. Не изменилось — ответ `304 Not Modified` без тела, и браузер берёт копию из кэша.',
          en: 'Revalidation: the server sent `ETag` or `Last-Modified`, and the browser sends `If-None-Match` or `If-Modified-Since`. If nothing changed, the answer is `304 Not Modified` with no body, and the browser uses its cached copy.',
        },
      },
      { type: 'diagram', diagram: 'http-revalidation' },
      {
        type: 'text',
        text: {
          ru: 'Рабочая стратегия: статика с хешем в имени (`app.3f9a1c.js`) — `max-age=31536000, immutable`, ведь новая версия получит новое имя; HTML — `no-cache`, чтобы пользователь сразу увидел ссылки на новые файлы.',
          en: 'A working strategy: static files with a hash in the name (`app.3f9a1c.js`) get `max-age=31536000, immutable`, since a new version gets a new name; HTML gets `no-cache` so users see links to new files immediately.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'http',
          source: `Cache-Control: max-age=31536000, immutable

Cache-Control: no-cache
ETag: "v42"`,
        },
        caption: {
          ru: 'Первый заголовок — для файлов с хешем, второй — для HTML.',
          en: 'The first header is for hashed files, the second for HTML.',
        },
      },
    ],
    keyPoints: [
      { ru: '`max-age` — сколько ответ свеж и используется без запроса.', en: '`max-age` is how long a response is fresh and used without a request.' },
      {
        ru: '`no-cache` — хранить, но проверять перед использованием; `no-store` — не хранить.',
        en: '`no-cache` — store but revalidate before use; `no-store` — don’t store.',
      },
      { ru: '`ETag` + `If-None-Match` → `304` без тела.', en: '`ETag` + `If-None-Match` → `304` with no body.' },
      {
        ru: 'Статика с хешем в имени — кэш на год и `immutable`, HTML — `no-cache`.',
        en: 'Hashed static files — a year and `immutable`; HTML — `no-cache`.',
      },
      { ru: '`public` и `s-maxage` управляют общими кэшами (CDN).', en: '`public` and `s-maxage` control shared caches (CDN).' },
    ],
    sources: [
      { title: 'MDN — HTTP caching', url: `${MDN}/Web/HTTP/Guides/Caching` },
      { title: 'MDN — Cache-Control', url: `${MDN}/Web/HTTP/Reference/Headers/Cache-Control` },
      { title: 'web.dev — HTTP cache: versioned URLs', url: 'https://web.dev/articles/http-cache#versioned-urls' },
    ],
  },
  {
    tag: 'browser-rendering',
    summary: {
      ru: 'Браузер превращает HTML и CSS в пиксели по конвейеру: DOM, CSSOM, дерево отрисовки, layout, paint и composite.',
      en: 'The browser turns HTML and CSS into pixels through a pipeline: DOM, CSSOM, render tree, layout, paint and composite.',
    },
    blocks: [
      { type: 'diagram', diagram: 'critical-rendering-path' },
      {
        type: 'text',
        text: {
          ru: 'CSS блокирует отрисовку: без CSSOM страницу не нарисовать. Обычный `<script>` блокирует разбор HTML — браузер ждёт загрузки и выполнения. `defer` грузит скрипт параллельно и выполняет после разбора по порядку, `async` — сразу по загрузке, без порядка; модули (`type="module"`) ведут себя как `defer`.',
          en: 'CSS blocks rendering: without the CSSOM the page can’t be painted. A plain `<script>` blocks HTML parsing — the browser waits for it to load and run. `defer` loads the script in parallel and runs it after parsing, in order; `async` runs it as soon as it loads, in no particular order; modules (`type="module"`) behave like `defer`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'html',
          source: `<link rel="stylesheet" href="/app.css" />
<script src="/app.js" defer></script>`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Цена изменения зависит от свойства: геометрия (`width`, `top`) запускает [[layout|layout]] и всё после него, цвет — только paint и composite, а `transform` и `opacity` часто обходятся одним composite — поэтому их и анимируют. Чтение размеров (`offsetWidth`) сразу после записи стилей заставляет браузер пересчитать layout синхронно; в цикле это layout thrashing.',
          en: 'The cost of a change depends on the property: geometry (`width`, `top`) triggers [[layout|layout]] and everything after it, color only paint and composite, while `transform` and `opacity` often need just composite — that’s why they’re animated. Reading sizes (`offsetWidth`) right after writing styles forces a synchronous layout; in a loop that’s layout thrashing.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `// slow: every read forces a layout after the previous write
for (const item of items) {
  item.style.width = box.offsetWidth + 'px';
}

// fast: read once, then only write
const width = box.offsetWidth;
for (const item of items) {
  item.style.width = width + 'px';
}`,
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Конвейер: DOM, CSSOM, дерево отрисовки, layout, paint, composite.',
        en: 'Pipeline: DOM, CSSOM, render tree, layout, paint, composite.',
      },
      { ru: 'CSS блокирует отрисовку, обычный `<script>` — разбор HTML.', en: 'CSS blocks rendering, a plain `<script>` blocks HTML parsing.' },
      {
        ru: '`defer` — после разбора по порядку, `async` — сразу по загрузке.',
        en: '`defer` runs after parsing in order, `async` as soon as it loads.',
      },
      {
        ru: 'Геометрия запускает layout, цвет — paint, `transform` и `opacity` — только composite.',
        en: 'Geometry triggers layout, color paint, `transform` and `opacity` only composite.',
      },
      {
        ru: 'Чередовать чтение и запись размеров в цикле — layout thrashing.',
        en: 'Alternating size reads and writes in a loop is layout thrashing.',
      },
    ],
    sources: [
      { title: 'MDN — Critical rendering path', url: `${MDN}/Web/Performance/Guides/Critical_rendering_path` },
      { title: 'MDN — <script>', url: `${MDN}/Web/HTML/Reference/Elements/script` },
      {
        title: 'web.dev — Avoid large, complex layouts and layout thrashing',
        url: 'https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing',
      },
    ],
  },
  {
    tag: 'security',
    summary: {
      ru: 'Главные угрозы фронтенда — XSS (чужой скрипт на вашей странице) и CSRF (запрос от имени пользователя с чужого сайта).',
      en: 'The main frontend threats are XSS (a foreign script on your page) and CSRF (a request on the user’s behalf from another site).',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '[[xss|XSS]] — данные пользователя попадают в страницу как разметка и выполняются с правами вашего сайта: читают данные, шлют запросы. React экранирует текст сам; опасны `innerHTML`, `dangerouslySetInnerHTML` и подстановка в `href` (`javascript:`). Чужой HTML выводят только после санитизации (DOMPurify). **CSP** ограничивает источники скриптов и снижает ущерб, если уязвимость всё же есть.',
          en: '[[xss|XSS]]: user data ends up in the page as markup and runs with your site’s privileges — reading data, sending requests. React escapes text itself; the dangerous parts are `innerHTML`, `dangerouslySetInnerHTML` and values in `href` (`javascript:`). Foreign HTML is rendered only after sanitizing (DOMPurify). **CSP** restricts script sources and limits the damage if a hole exists.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `element.textContent = comment; // safe: always text
element.innerHTML = comment; // dangerous: <img src=x onerror=...> will run`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '[[csrf|CSRF]] — браузер прикладывает cookie к запросу на ваш домен, даже если его отправила форма с чужого сайта. Защита: `SameSite=Lax` или `Strict` у сессионной cookie, CSRF-токен в запросах, проверка заголовка `Origin`. CORS от CSRF не защищает: он ограничивает чтение ответа, а не отправку простого запроса. `HttpOnly` прячет cookie от JavaScript, `Secure` — отправляет только по HTTPS.',
          en: '[[csrf|CSRF]]: the browser attaches cookies to a request to your domain even if a form on another site sent it. Defenses: `SameSite=Lax` or `Strict` on the session cookie, a CSRF token in requests, checking the `Origin` header. CORS doesn’t protect against CSRF: it limits reading the response, not sending a simple request. `HttpOnly` hides a cookie from JavaScript, `Secure` sends it over HTTPS only.',
        },
      },
      {
        type: 'code',
        code: { lang: 'http', source: `Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax; Path=/` },
      },
    ],
    keyPoints: [
      { ru: 'XSS — выполнение чужого скрипта на вашей странице.', en: 'XSS is a foreign script running on your page.' },
      {
        ru: 'Пользовательские данные выводите как текст; HTML — только после санитизации.',
        en: 'Render user data as text; HTML only after sanitizing.',
      },
      { ru: 'CSP ограничивает источники скриптов и снижает ущерб от XSS.', en: 'CSP restricts script sources and limits XSS damage.' },
      {
        ru: 'CSRF — запрос от имени пользователя с чужого сайта; защита — `SameSite`, токены, проверка `Origin`.',
        en: 'CSRF is a request on the user’s behalf from another site; defenses — `SameSite`, tokens, checking `Origin`.',
      },
      { ru: '`HttpOnly` прячет cookie от JS, `Secure` — только HTTPS.', en: '`HttpOnly` hides a cookie from JS, `Secure` means HTTPS only.' },
    ],
    sources: [
      { title: 'MDN — Cross-site scripting (XSS)', url: `${MDN}/Web/Security/Attacks/XSS` },
      { title: 'MDN — Cross-site request forgery (CSRF)', url: `${MDN}/Web/Security/Attacks/CSRF` },
      { title: 'MDN — Content Security Policy', url: `${MDN}/Web/HTTP/Guides/CSP` },
    ],
  },
  {
    tag: 'networking',
    summary: {
      ru: 'Браузер не даёт скрипту читать ответы с чужого origin. CORS — способ сервера разрешить это явно.',
      en: 'The browser doesn’t let a script read responses from another origin. CORS is how a server explicitly allows it.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '[[origin|Origin]] — это схема, хост и порт: `https://app.example.com` и `https://api.example.com` — разные origin. Политика same-origin запрещает JavaScript читать ответы чужого origin. Сервер разрешает это заголовком `Access-Control-Allow-Origin`. Для «непростых» запросов — `PUT`, `DELETE`, свои заголовки, `Content-Type: application/json` — браузер сначала шлёт [[preflight|preflight]] `OPTIONS` и отправляет настоящий запрос, только если сервер согласился.',
          en: 'An [[origin|origin]] is scheme, host and port: `https://app.example.com` and `https://api.example.com` are different origins. The same-origin policy forbids JavaScript from reading another origin’s responses. A server allows it with `Access-Control-Allow-Origin`. For “non-simple” requests — `PUT`, `DELETE`, custom headers, `Content-Type: application/json` — the browser first sends a [[preflight|preflight]] `OPTIONS` and sends the real request only if the server agrees.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'http',
          source: `OPTIONS /api/items HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: content-type

HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, PUT
Access-Control-Allow-Headers: content-type`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Запрос с cookie (`credentials: \'include\'`) требует конкретного origin вместо `*` и `Access-Control-Allow-Credentials: true`. CORS настраивается на сервере: с клиента его не «включить». Для локальной разработки обычно хватает прокси dev-сервера — тогда запросы идут на свой origin.',
          en: 'A request with cookies (`credentials: \'include\'`) requires a specific origin instead of `*` and `Access-Control-Allow-Credentials: true`. CORS is configured on the server: it can’t be “turned on” from the client. For local development a dev-server proxy usually does the job — requests then go to your own origin.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Origin = схема + хост + порт.', en: 'Origin = scheme + host + port.' },
      {
        ru: 'Same-origin запрещает читать чужие ответы, CORS разрешает это заголовками сервера.',
        en: 'Same-origin forbids reading foreign responses; CORS allows it via server headers.',
      },
      {
        ru: '`PUT`, `DELETE`, свои заголовки и JSON — сначала preflight `OPTIONS`.',
        en: '`PUT`, `DELETE`, custom headers and JSON trigger a preflight `OPTIONS`.',
      },
      {
        ru: 'С cookie нужен конкретный origin вместо `*` и `Allow-Credentials`.',
        en: 'With cookies you need a specific origin instead of `*` and `Allow-Credentials`.',
      },
      { ru: 'CORS настраивается на сервере, а не на клиенте.', en: 'CORS is configured on the server, not the client.' },
    ],
    sources: [
      { title: 'MDN — Same-origin policy', url: `${MDN}/Web/Security/Same-origin_policy` },
      { title: 'MDN — CORS', url: `${MDN}/Web/HTTP/Guides/CORS` },
      { title: 'MDN — Preflight request', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request' },
    ],
  },
  {
    tag: 'performance',
    summary: {
      ru: 'Скорость сайта меряют Core Web Vitals: LCP — загрузка главного контента, INP — отзывчивость, CLS — стабильность вёрстки.',
      en: 'Site speed is measured with Core Web Vitals: LCP — main content loading, INP — responsiveness, CLS — layout stability.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Хорошие значения по 75-му перцентилю пользователей: LCP ≤ 2,5 с, INP ≤ 200 мс, CLS ≤ 0,1. INP заменил FID в марте 2024 года: он учитывает задержку всех взаимодействий, а не только первого.',
          en: 'Good values at the 75th percentile of users: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. INP replaced FID in March 2024: it accounts for the delay of all interactions, not just the first.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'LCP: быстрый ответ сервера, сжатые картинки, главную картинку не делать ленивой и дать ей высокий приоритет. INP: дробить длинные задачи (дольше 50 мс) и отдавать поток браузеру, грузить меньше JS. CLS: задавать картинкам `width` и `height` (или `aspect-ratio`), резервировать место под рекламу и встраиваемые блоки.',
          en: 'LCP: a fast server response, compressed images, don’t lazy-load the main image and give it high priority. INP: split long tasks (over 50 ms) and yield to the browser, ship less JS. CLS: give images `width` and `height` (or `aspect-ratio`), reserve space for ads and embeds.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'html',
          source: `<img src="/hero.webp" width="1200" height="600" fetchpriority="high" alt="Product photo" />`,
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `async function processAll(items) {
  for (const item of items) {
    process(item);
    await new Promise((resolve) => setTimeout(resolve));
  }
}`,
        },
        caption: {
          ru: 'Между порциями браузер успевает обработать клики и нарисовать кадр.',
          en: 'Between chunks the browser gets to handle clicks and paint a frame.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'LCP ≤ 2,5 с, INP ≤ 200 мс, CLS ≤ 0,1 — по 75-му перцентилю.',
        en: 'LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 — at the 75th percentile.',
      },
      { ru: 'INP заменил FID в 2024 году.', en: 'INP replaced FID in 2024.' },
      {
        ru: 'Главную картинку не делают ленивой, ей дают `fetchpriority="high"`.',
        en: 'Don’t lazy-load the main image; give it `fetchpriority="high"`.',
      },
      { ru: 'Длинные задачи дробят и отдают поток браузеру.', en: 'Split long tasks and yield to the browser.' },
      {
        ru: '`width`/`height` или `aspect-ratio` у картинок убирают сдвиги вёрстки.',
        en: '`width`/`height` or `aspect-ratio` on images prevent layout shifts.',
      },
    ],
    sources: [
      { title: 'web.dev — Web Vitals', url: 'https://web.dev/articles/vitals' },
      { title: 'web.dev — Interaction to Next Paint', url: 'https://web.dev/articles/inp' },
      { title: 'web.dev — Optimize CLS', url: 'https://web.dev/articles/optimize-cls' },
    ],
  },
  {
    tag: 'css',
    summary: {
      ru: 'Частые ловушки CSS на собеседовании: ширина блока, схлопывание отступов, способы скрыть элемент, sticky и z-index.',
      en: 'Common CSS traps in interviews: box width, collapsing margins, ways to hide an element, sticky and z-index.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'По умолчанию `width` — ширина содержимого (`box-sizing: content-box`), а `padding` и `border` добавляются сверху. С `border-box` они входят в `width` — поэтому его обычно задают всем элементам. Вертикальные `margin` соседних блоков схлопываются до большего из них, а не складываются; внутри flex и grid схлопывания нет.',
          en: 'By default `width` is the content width (`box-sizing: content-box`), and `padding` and `border` are added on top. With `border-box` they’re included in `width` — which is why it’s usually set on every element. Vertical `margin`s of adjacent blocks collapse to the larger one instead of adding up; there’s no collapsing inside flex and grid.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid;
  /* content-box: 250px on screen, border-box: 200px */
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Скрыть элемент: `display: none` — места не занимает, не кликается и не читается скринридером; `visibility: hidden` — место остаётся, кликов нет; `opacity: 0` — место остаётся, и элемент по-прежнему кликается и получает фокус. `position: sticky` работает, только если задан `top` (или другой край) и между элементом и прокручиваемым контейнером нет предка с `overflow: hidden` или `auto`. `z-index` сравнивается только внутри контекста наложения: родитель с `transform`, `opacity < 1` или своим `z-index` «запирает» детей.',
          en: 'Hiding an element: `display: none` — takes no space, isn’t clickable or read by screen readers; `visibility: hidden` — keeps its space, no clicks; `opacity: 0` — keeps its space and is still clickable and focusable. `position: sticky` works only with `top` (or another edge) set and no ancestor with `overflow: hidden` or `auto` between the element and the scroll container. `z-index` is compared only within a stacking context: a parent with `transform`, `opacity < 1` or its own `z-index` “locks in” its children.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'По умолчанию `width` — ширина контента; `border-box` включает `padding` и `border`.',
        en: 'By default `width` is the content width; `border-box` includes `padding` and `border`.',
      },
      {
        ru: 'Вертикальные `margin` соседних блоков схлопываются до большего; во flex и grid — нет.',
        en: 'Vertical margins of adjacent blocks collapse to the larger one; not in flex and grid.',
      },
      {
        ru: '`display: none` убирает элемент, `visibility: hidden` оставляет место, `opacity: 0` оставляет и клики.',
        en: '`display: none` removes, `visibility: hidden` keeps the space, `opacity: 0` keeps clicks too.',
      },
      {
        ru: '`sticky` нужен `top` и предок без `overflow: hidden/auto`.',
        en: '`sticky` needs `top` and no ancestor with `overflow: hidden/auto`.',
      },
      { ru: '`z-index` действует внутри своего контекста наложения.', en: '`z-index` works within its stacking context.' },
    ],
    sources: [
      { title: 'MDN — box-sizing', url: `${MDN}/Web/CSS/box-sizing` },
      { title: 'MDN — Mastering margin collapsing', url: `${MDN}/Web/CSS/CSS_box_model/Mastering_margin_collapsing` },
      { title: 'MDN — Stacking context', url: `${MDN}/Web/CSS/CSS_positioned_layout/Stacking_context` },
    ],
  },
  {
    tag: 'html-a11y',
    summary: {
      ru: 'Семантический HTML даёт доступность почти бесплатно: кнопки работают с клавиатуры, заголовки строят структуру, label связывает поле с подписью.',
      en: 'Semantic HTML gives accessibility almost for free: buttons work from the keyboard, headings build structure, label ties a field to its caption.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Нативный элемент лучше самодельного: `<button>` получает фокус, нажимается Enter и пробелом и объявляется скринридером как кнопка, а `<div onclick>` — нет. Структуру страницы задают заголовки по уровням и области `header`, `nav`, `main`, `footer`. `label` связывает поле с подписью (и увеличивает зону нажатия), ошибку к полю привязывают через `aria-describedby`.',
          en: 'A native element beats a homemade one: `<button>` gets focus, is pressed with Enter and Space, and is announced as a button, while `<div onclick>` isn’t. Page structure comes from leveled headings and the `header`, `nav`, `main`, `footer` landmarks. `label` ties a field to its caption (and enlarges the tap area); an error is linked to a field via `aria-describedby`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'html',
          source: `<!-- bad: not focusable, no keyboard, no role -->
<div class="btn" onclick="save()">Save</div>

<!-- good -->
<button type="button" onclick="save()">Save</button>

<label for="email">Email</label>
<input id="email" type="email" aria-describedby="email-error" />
<p id="email-error">Enter a valid email</p>`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`alt` описывает смысл картинки; у декоративной — пустой `alt=""`, чтобы скринридер её пропустил. Первое правило ARIA — не использовать ARIA, если есть подходящий элемент; кнопке-иконке нужен `aria-label`. Фокус должен быть виден (не убирайте `outline` без замены), контраст обычного текста — не ниже 4,5:1.',
          en: '`alt` describes what an image means; a decorative one gets an empty `alt=""` so screen readers skip it. The first rule of ARIA is not to use ARIA when a suitable element exists; an icon button needs an `aria-label`. Focus must be visible (don’t remove `outline` without a replacement), and normal text contrast must be at least 4.5:1.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Нативный элемент лучше ARIA: `button`, а не `div` с `onclick`.', en: 'A native element beats ARIA: `button`, not a `div` with `onclick`.' },
      { ru: '`label` связывает поле с подписью.', en: '`label` ties a field to its caption.' },
      {
        ru: '`alt` описывает смысл картинки, у декоративной — `alt=""`.',
        en: '`alt` describes the image’s meaning; a decorative one gets `alt=""`.',
      },
      { ru: 'Видимый фокус и работа с клавиатуры обязательны.', en: 'Visible focus and keyboard operation are required.' },
      { ru: 'Контраст обычного текста — не ниже 4,5:1.', en: 'Normal text contrast is at least 4.5:1.' },
    ],
    sources: [
      { title: 'MDN — <button>', url: `${MDN}/Web/HTML/Reference/Elements/button` },
      { title: 'W3C — Using ARIA: first rule', url: 'https://www.w3.org/TR/using-aria/#rule1' },
      { title: 'W3C WAI — Decorative images', url: 'https://www.w3.org/WAI/tutorials/images/decorative/' },
    ],
  },
  {
    tag: 'storage',
    summary: {
      ru: 'Хранилищ в браузере несколько: cookie уходят на сервер с запросами, localStorage и sessionStorage хранят строки, IndexedDB — асинхронная база.',
      en: 'The browser has several stores: cookies go to the server with requests, localStorage and sessionStorage hold strings, IndexedDB is an async database.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Cookie** — до ~4 КБ, автоматически уходят на сервер с каждым запросом к домену; атрибуты `HttpOnly`, `Secure`, `SameSite`, `Max-Age`. **localStorage** — несколько мегабайт на origin, только строки, синхронный API, живёт бессрочно и общий для всех вкладок. **sessionStorage** — то же, но на одну вкладку и до её закрытия. **IndexedDB** — асинхронная база для больших структурированных данных с транзакциями.',
          en: '**Cookies** — up to ~4 KB, automatically sent to the server with every request to the domain; attributes `HttpOnly`, `Secure`, `SameSite`, `Max-Age`. **localStorage** — a few megabytes per origin, strings only, synchronous API, lives forever and is shared across tabs. **sessionStorage** — the same, but per tab and until it closes. **IndexedDB** — an asynchronous database for large structured data with transactions.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `localStorage.setItem('settings', JSON.stringify({ theme: 'dark' }));
const settings = JSON.parse(localStorage.getItem('settings') ?? '{}');

window.addEventListener('storage', (event) => {
  console.log(event.key, event.newValue);
});`,
        },
        caption: {
          ru: 'Событие storage приходит в другие вкладки того же origin.',
          en: 'The storage event fires in other tabs of the same origin.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Всё, что лежит в localStorage, прочитает любой скрипт на странице — в том числе внедрённый через XSS. Поэтому сессию безопаснее хранить в `HttpOnly`-cookie, до которой JavaScript не дотянется.',
          en: 'Anything in localStorage can be read by any script on the page — including one injected via XSS. That’s why a session is safer in an `HttpOnly` cookie that JavaScript can’t reach.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Cookie отправляются на сервер с каждым запросом к домену.', en: 'Cookies are sent to the server with every request to the domain.' },
      {
        ru: 'localStorage — синхронный, только строки, бессрочный; sessionStorage — до закрытия вкладки.',
        en: 'localStorage is synchronous, strings only, permanent; sessionStorage lasts until the tab closes.',
      },
      { ru: 'IndexedDB — асинхронная база для больших данных.', en: 'IndexedDB is an asynchronous database for large data.' },
      { ru: 'Событие `storage` приходит в другие вкладки.', en: 'The `storage` event fires in other tabs.' },
      {
        ru: 'Сессию безопаснее хранить в `HttpOnly`-cookie, чем в localStorage.',
        en: 'A session is safer in an `HttpOnly` cookie than in localStorage.',
      },
    ],
    sources: [
      { title: 'MDN — Web Storage API', url: `${MDN}/Web/API/Web_Storage_API` },
      { title: 'MDN — Using HTTP cookies', url: `${MDN}/Web/HTTP/Guides/Cookies` },
      { title: 'MDN — IndexedDB API', url: `${MDN}/Web/API/IndexedDB_API` },
    ],
  },
  {
    tag: 'tooling',
    summary: {
      ru: 'Сборщик превращает исходники в файлы для браузера: объединяет модули, транспилирует, минифицирует и выкидывает неиспользуемое.',
      en: 'A bundler turns sources into files for the browser: it combines modules, transpiles, minifies and drops unused code.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '[[tree-shaking|Tree-shaking]] удаляет неиспользуемые экспорты, но работает только со статическими ES-модулями и кодом без побочных эффектов при импорте (`"sideEffects": false` в `package.json` помогает). Динамический `import()` делит бандл на чанки, которые грузятся по требованию. Хеш содержимого в имени файла позволяет кэшировать его навсегда.',
          en: '[[tree-shaking|Tree-shaking]] removes unused exports, but only works with static ES modules and code without import-time side effects (`"sideEffects": false` in `package.json` helps). Dynamic `import()` splits the bundle into chunks loaded on demand. A content hash in the file name lets it be cached forever.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Переменные окружения подставляются в код при сборке и становятся частью бандла — любой может прочитать их в DevTools. Vite отдаёт клиентскому коду только переменные с префиксом `VITE_`, чтобы случайно не утёк секрет. Секреты остаются на сервере.',
          en: 'Environment variables are substituted into code at build time and become part of the bundle — anyone can read them in DevTools. Vite exposes only `VITE_`-prefixed variables to client code so a secret doesn’t leak by accident. Secrets stay on the server.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `// only variables with the VITE_ prefix reach client code
const apiUrl = import.meta.env.VITE_API_URL;`,
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Сборщик объединяет модули, транспилирует, минифицирует и удаляет неиспользуемое.',
        en: 'A bundler combines modules, transpiles, minifies and removes unused code.',
      },
      {
        ru: 'Tree-shaking работает с ES-модулями и кодом без побочных эффектов.',
        en: 'Tree-shaking works with ES modules and side-effect-free code.',
      },
      { ru: '`import()` делит бандл на чанки.', en: '`import()` splits the bundle into chunks.' },
      { ru: 'Хеш в имени файла позволяет кэшировать его навсегда.', en: 'A hash in the file name lets it be cached forever.' },
      {
        ru: 'Переменные окружения в клиентском бандле публичны — секреты туда не кладут.',
        en: 'Environment variables in the client bundle are public — no secrets there.',
      },
    ],
    sources: [
      { title: 'webpack — Tree Shaking', url: 'https://webpack.js.org/guides/tree-shaking/' },
      { title: 'webpack — Caching', url: 'https://webpack.js.org/guides/caching/' },
      { title: 'Vite — Env Variables and Modes', url: 'https://vite.dev/guide/env-and-mode' },
    ],
  },
  {
    tag: 'deploy',
    summary: {
      ru: 'Деплой фронтенда — это раздача статики: собранные файлы на CDN или веб-сервер, правильный кэш и fallback для маршрутов SPA.',
      en: 'Frontend deployment is serving static files: the build on a CDN or web server, correct caching and a fallback for SPA routes.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'У SPA маршруты живут в JavaScript, а файла `/users/42` на сервере нет — при обновлении страницы сервер вернёт 404. Лечится fallback-ом: на любой неизвестный путь отдавать `index.html`.',
          en: 'In an SPA, routes live in JavaScript and there is no `/users/42` file on the server — a page refresh returns 404. The fix is a fallback: serve `index.html` for any unknown path.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'text',
          source: `location / {
  try_files $uri $uri/ /index.html;
}`,
        },
        caption: { ru: 'nginx: сначала файл, иначе index.html.', en: 'nginx: the file if it exists, otherwise index.html.' },
      },
      {
        type: 'text',
        text: {
          ru: 'Docker-образ собирают в несколько этапов: сборка в образе с Node, раздача — из лёгкого nginx, и в итоговый образ не попадают исходники и `node_modules`. Переменные окружения зашиваются при сборке, поэтому для каждой среды нужна своя сборка или конфиг, который приложение читает при запуске. Откат — переключение на предыдущую готовую сборку, а не пересборка.',
          en: 'A Docker image is built in stages: build in a Node image, serve from a light nginx one, so sources and `node_modules` don’t end up in the final image. Environment variables are baked in at build time, so each environment needs its own build or a config the app reads at startup. A rollback is switching to the previous ready build, not rebuilding.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'text',
          source: `FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html`,
        },
      },
    ],
    keyPoints: [
      {
        ru: 'SPA нужен fallback на `index.html`, иначе обновление страницы даст 404.',
        en: 'An SPA needs an `index.html` fallback, or a page refresh gives 404.',
      },
      { ru: 'Файлы с хешем — кэш на год, `index.html` — `no-cache`.', en: 'Hashed files — cached for a year, `index.html` — `no-cache`.' },
      {
        ru: 'Многоэтапный Docker: собрать в Node, раздавать из лёгкого nginx.',
        en: 'Multi-stage Docker: build in Node, serve from light nginx.',
      },
      {
        ru: 'Переменные окружения зашиваются при сборке.',
        en: 'Environment variables are baked in at build time.',
      },
      { ru: 'Откат — переключение на прошлую сборку, а не пересборка.', en: 'Rollback means switching to the previous build, not rebuilding.' },
    ],
    sources: [
      { title: 'nginx — try_files', url: 'https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files' },
      { title: 'Docker — Multi-stage builds', url: 'https://docs.docker.com/build/building/multi-stage/' },
      { title: 'web.dev — HTTP cache: versioned URLs', url: 'https://web.dev/articles/http-cache#versioned-urls' },
    ],
  },
  {
    tag: 'git',
    summary: {
      ru: 'Git хранит историю как граф коммитов. Ветки — указатели на коммиты, а merge, rebase, reset и revert меняют граф по-разному.',
      en: 'Git stores history as a graph of commits. Branches are pointers to commits, and merge, rebase, reset and revert change the graph differently.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Коммит — снимок файлов и ссылка на родителя. Ветка — подвижный указатель на коммит, `HEAD` — где вы сейчас. `merge` соединяет истории merge-коммитом и ничего не переписывает. `rebase` переносит ваши коммиты поверх другой ветки, создавая новые коммиты с новыми хешами, — история становится линейной, но опубликованную общую ветку так переписывать нельзя.',
          en: 'A commit is a snapshot of files plus a link to its parent. A branch is a movable pointer to a commit, `HEAD` is where you are. `merge` joins histories with a merge commit and rewrites nothing. `rebase` replays your commits on top of another branch, creating new commits with new hashes — history becomes linear, but a published shared branch must not be rewritten this way.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`revert` отменяет коммит новым коммитом — безопасно для общей истории. `reset` передвигает ветку: `--soft` оставляет изменения проиндексированными, `--mixed` (по умолчанию) — в рабочей папке, `--hard` удаляет их совсем.',
          en: '`revert` undoes a commit with a new commit — safe for shared history. `reset` moves the branch: `--soft` keeps changes staged, `--mixed` (the default) keeps them in the working tree, `--hard` discards them.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'bash',
          source: `git switch -c feature
git commit -am "Add search"
git rebase main          # replay feature commits on top of main
git revert a1b2c3d       # a new commit that undoes a1b2c3d
git reset --soft HEAD~1  # undo the last commit, keep changes staged`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Ветка — указатель на коммит, `HEAD` — где вы сейчас.', en: 'A branch is a pointer to a commit, `HEAD` is where you are.' },
      {
        ru: '`merge` сохраняет историю, `rebase` переписывает коммиты.',
        en: '`merge` preserves history, `rebase` rewrites commits.',
      },
      { ru: 'Опубликованные общие ветки не перебазируют.', en: 'Don’t rebase published shared branches.' },
      {
        ru: '`revert` — безопасная отмена новым коммитом, `reset` — перемещение ветки.',
        en: '`revert` is a safe undo via a new commit, `reset` moves the branch.',
      },
      { ru: '`reset --hard` удаляет незакоммиченные изменения.', en: '`reset --hard` discards uncommitted changes.' },
    ],
    sources: [
      { title: 'Pro Git — Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
      { title: 'git-revert', url: 'https://git-scm.com/docs/git-revert' },
      { title: 'git-reset', url: 'https://git-scm.com/docs/git-reset' },
    ],
  },
];
