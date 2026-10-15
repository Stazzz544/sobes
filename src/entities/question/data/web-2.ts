import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const WEB_QUESTIONS_2: Question[] = [
  {
    id: 'web-http-001',
    topic: 'web',
    tags: ['http', 'security'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Чем статус `401` отличается от `403`?', en: 'How does status `401` differ from `403`?' },
    options: [
      {
        text: {
          ru: '`401` — ресурс не найден, `403` — сервер упал',
          en: '`401` means not found, `403` means the server crashed',
        },
      },
      {
        text: {
          ru: '`401` — запрос не аутентифицирован (нет или неверные учётные данные), `403` — пользователь известен, но прав не хватает',
          en: '`401` means the request isn’t authenticated (missing or invalid credentials), `403` means the user is known but lacks permission',
        },
      },
      {
        text: {
          ru: 'Это синонимы, разные серверы используют разные коды',
          en: 'They’re synonyms; servers just pick different ones',
        },
      },
      {
        text: {
          ru: '`401` — превышен лимит запросов, `403` — неверный метод',
          en: '`401` means rate limited, `403` means wrong method',
        },
      },
      {
        text: {
          ru: '`403` — нужно повторить запрос с другим паролем, `401` — доступ запрещён навсегда',
          en: '`403` means retry with another password, `401` means access is forbidden forever',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`401 Unauthorized`, несмотря на название, про **аутентификацию**: сервер не знает, кто вы. Обычно это повод перелогиниться или обновить токен. `403 Forbidden` — про **авторизацию**: вы известны, но этот ресурс вам недоступен, и повторный вход не поможет.',
          en: '`401 Unauthorized`, despite the name, is about **authentication**: the server doesn’t know who you are. It usually means re-login or refresh the token. `403 Forbidden` is about **authorization**: you’re known, but this resource isn’t for you, and logging in again won’t help.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Лимит запросов — `429`, неверный метод — `405`, «не найдено» — `404`.',
          en: 'Rate limiting is `429`, a wrong method is `405`, and “not found” is `404`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — 401 Unauthorized', url: `${MDN}/Web/HTTP/Reference/Status/401` },
      { title: 'MDN — 403 Forbidden', url: `${MDN}/Web/HTTP/Reference/Status/403` },
    ],
  },
  {
    id: 'web-http-002',
    topic: 'web',
    tags: ['http'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой HTTP-метод **не** идемпотентен?', en: 'Which HTTP method is **not** idempotent?' },
    options: [{ code: 'GET' }, { code: 'PUT' }, { code: 'DELETE' }, { code: 'HEAD' }, { code: 'POST' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[idempotent|Идемпотентный]] метод даёт одинаковый эффект на сервере, сколько бы раз его ни повторили. `PUT /users/1` с одними данными оставит то же состояние, `DELETE` второй раз удалять уже нечего. А каждый `POST /orders` создаёт новый заказ.',
          en: 'An [[idempotent|idempotent]] method has the same effect on the server however many times it’s repeated. `PUT /users/1` with the same data leaves the same state, and a second `DELETE` has nothing left to delete. But every `POST /orders` creates a new order.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому браузеры и прокси спокойно повторяют идемпотентные запросы при сбоях сети, а для `POST` нужны ключи идемпотентности.',
          en: 'That’s why browsers and proxies may safely retry idempotent requests on network failures, while `POST` needs idempotency keys.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Idempotent', url: `${MDN}/Glossary/Idempotent` },
      { title: 'RFC 9110 — Idempotent Methods', url: 'https://www.rfc-editor.org/rfc/rfc9110#name-idempotent-methods' },
    ],
  },
  {
    id: 'web-http-003',
    topic: 'web',
    tags: ['http', 'caching'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Браузер отправил запрос с `If-None-Match: "abc"`, и на сервере у ресурса тот же `ETag`. Что ответит сервер?',
      en: 'The browser sent a request with `If-None-Match: "abc"`, and the resource on the server has the same `ETag`. What will the server reply?',
    },
    options: [
      { text: { ru: '`200 OK` с полным телом', en: '`200 OK` with the full body' } },
      { text: { ru: '`304 Not Modified` без тела', en: '`304 Not Modified` with no body' } },
      { text: { ru: '`204 No Content`', en: '`204 No Content`' } },
      { text: { ru: '`412 Precondition Failed`', en: '`412 Precondition Failed`' } },
      { text: { ru: '`301 Moved Permanently`', en: '`301 Moved Permanently`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`ETag` — отпечаток версии ресурса. При ревалидации браузер присылает его в `If-None-Match`. Совпало — сервер отвечает `304 Not Modified` без тела, и браузер берёт копию из кэша. Так экономится трафик, хотя запрос всё равно уходит.',
          en: '`ETag` is a fingerprint of a resource version. On revalidation the browser sends it in `If-None-Match`. If it matches, the server replies `304 Not Modified` with no body, and the browser uses its cached copy. This saves bandwidth, though a request is still made.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`412` используется для условных запросов на изменение (`If-Match` при `PUT`), а не для чтения.',
          en: '`412` is for conditional write requests (`If-Match` with `PUT`), not for reads.',
        },
      },
      { type: 'diagram', diagram: 'http-revalidation' },
    ],
    sources: [
      { title: 'MDN — 304 Not Modified', url: `${MDN}/Web/HTTP/Reference/Status/304` },
      { title: 'MDN — ETag', url: `${MDN}/Web/HTTP/Reference/Headers/ETag` },
    ],
  },
  {
    id: 'web-http-004',
    topic: 'web',
    tags: ['http', 'networking', 'performance'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какое главное улучшение HTTP/2 по сравнению с HTTP/1.1?',
      en: 'What is the main improvement of HTTP/2 over HTTP/1.1?',
    },
    options: [
      {
        text: {
          ru: 'Переход с TCP на UDP',
          en: 'Switching from TCP to UDP',
        },
      },
      {
        text: {
          ru: 'Отказ от шифрования ради скорости',
          en: 'Dropping encryption for speed',
        },
      },
      {
        text: {
          ru: 'Мультиплексирование: много запросов и ответов параллельно в одном соединении, плюс бинарные фреймы и сжатие заголовков',
          en: 'Multiplexing: many requests and responses in parallel over one connection, plus binary framing and header compression',
        },
      },
      {
        text: {
          ru: 'Новые методы `FETCH` и `PUSH` вместо `GET` и `POST`',
          en: 'New `FETCH` and `PUSH` methods replacing `GET` and `POST`',
        },
      },
      {
        text: {
          ru: 'Запрет кэширования ответов',
          en: 'A ban on caching responses',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В HTTP/1.1 одно соединение обрабатывает запросы по очереди, поэтому браузеры открывают до ~6 соединений на домен, а разработчики склеивали файлы и делали спрайты. HTTP/2 передаёт потоки параллельно внутри одного TCP-соединения и сжимает заголовки (HPACK).',
          en: 'In HTTP/1.1 one connection handles requests one at a time, so browsers open up to ~6 connections per domain, and developers concatenated files and built sprites. HTTP/2 carries streams in parallel within one TCP connection and compresses headers (HPACK).',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Остаётся блокировка на уровне TCP: потерянный пакет задерживает все потоки. Это решает HTTP/3 поверх QUIC (UDP).',
          en: 'TCP-level head-of-line blocking remains: one lost packet stalls all streams. HTTP/3 over QUIC (UDP) solves that.',
        },
      },
    ],
    sources: [
      { title: 'MDN — HTTP/2', url: `${MDN}/Glossary/HTTP_2` },
      { title: 'RFC 9113 — HTTP/2', url: 'https://www.rfc-editor.org/rfc/rfc9113' },
    ],
  },
  {
    id: 'web-http-005',
    topic: 'web',
    tags: ['http', 'networking'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'На чём работает HTTP/3 и какую проблему он решает?', en: 'What does HTTP/3 run on, and what problem does it solve?' },
    options: [
      {
        text: {
          ru: 'На TCP, решает проблему отсутствия шифрования',
          en: 'On TCP; it solves the lack of encryption',
        },
      },
      {
        text: {
          ru: 'На WebSocket, решает проблему двусторонней связи',
          en: 'On WebSocket; it solves bidirectional communication',
        },
      },
      {
        text: {
          ru: 'На QUIC поверх UDP: убирает блокировку всех потоков из-за потери одного TCP-пакета и ускоряет установку соединения',
          en: 'On QUIC over UDP: it removes the stall of all streams caused by one lost TCP packet and speeds up connection setup',
        },
      },
      {
        text: {
          ru: 'На HTTP/2 с новыми заголовками кэширования',
          en: 'On HTTP/2 with new caching headers',
        },
      },
      {
        text: {
          ru: 'На DNS over HTTPS, ускоряя поиск домена',
          en: 'On DNS over HTTPS, speeding up domain lookup',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'HTTP/3 использует транспорт QUIC поверх UDP. Потоки в QUIC независимы, поэтому потеря пакета задерживает только свой поток, а не все сразу, как в TCP. TLS 1.3 встроен в QUIC, и рукопожатие занимает меньше обменов. Соединение переживает смену сети, например с Wi-Fi на мобильную.',
          en: 'HTTP/3 uses the QUIC transport over UDP. QUIC streams are independent, so a lost packet only delays its own stream instead of all of them as in TCP. TLS 1.3 is built into QUIC, so the handshake takes fewer round trips. Connections also survive network changes, such as Wi-Fi to cellular.',
        },
      },
    ],
    sources: [
      { title: 'MDN — HTTP/3', url: `${MDN}/Glossary/HTTP_3` },
      { title: 'RFC 9114 — HTTP/3', url: 'https://www.rfc-editor.org/rfc/rfc9114' },
    ],
  },
  {
    id: 'web-cache-002',
    topic: 'web',
    tags: ['caching', 'http'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Где может храниться ответ с заголовком `Cache-Control: private, max-age=600`?',
      en: 'Where may a response with `Cache-Control: private, max-age=600` be stored?',
    },
    options: [
      {
        text: {
          ru: 'Только в кэше браузера пользователя, но не в общих кэшах (CDN, прокси)',
          en: 'Only in the user’s browser cache, not in shared caches (CDN, proxies)',
        },
      },
      {
        text: {
          ru: 'Нигде: `private` запрещает кэширование',
          en: 'Nowhere: `private` forbids caching',
        },
      },
      {
        text: {
          ru: 'Только на CDN, но не в браузере',
          en: 'Only on the CDN, not in the browser',
        },
      },
      {
        text: {
          ru: 'В любом кэше, но только по HTTPS',
          en: 'In any cache, but only over HTTPS',
        },
      },
      {
        text: {
          ru: 'Только в `localStorage`',
          en: 'Only in `localStorage`',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`private` означает, что ответ персональный: его можно хранить в частном кэше браузера, но не в общих кэшах, которые обслуживают многих пользователей. Иначе CDN мог бы отдать чужой профиль другому человеку.',
          en: '`private` means the response is personal: it may be stored in the browser’s private cache but not in shared caches serving many users. Otherwise a CDN could hand one person’s profile to someone else.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`public` разрешает общие кэши, `no-store` запрещает хранение совсем.',
          en: '`public` allows shared caches, and `no-store` forbids storage entirely.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Cache-Control', url: `${MDN}/Web/HTTP/Reference/Headers/Cache-Control` },
      { title: 'MDN — HTTP caching', url: `${MDN}/Web/HTTP/Guides/Caching` },
    ],
  },
  {
    id: 'web-cache-003',
    topic: 'web',
    tags: ['caching', 'performance'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Как работает `Cache-Control: max-age=60, stale-while-revalidate=300`?',
      en: 'How does `Cache-Control: max-age=60, stale-while-revalidate=300` behave?',
    },
    options: [
      {
        text: {
          ru: 'Ответ хранится 360 секунд и затем удаляется без проверки',
          en: 'The response is kept for 360 seconds and then deleted without checks',
        },
      },
      {
        text: {
          ru: '60 секунд ответ свежий; следующие 300 секунд кэш может сразу отдать устаревшую копию и в фоне запросить новую',
          en: 'For 60 seconds the response is fresh; for the next 300 seconds the cache may serve the stale copy immediately and refetch in the background',
        },
      },
      {
        text: {
          ru: 'Первые 300 секунд ответ всегда ревалидируется, потом 60 секунд берётся из кэша',
          en: 'For the first 300 seconds it’s always revalidated, then served from cache for 60 seconds',
        },
      },
      {
        text: {
          ru: 'Кэш ждёт 300 секунд перед каждым запросом к серверу',
          en: 'The cache waits 300 seconds before each request to the server',
        },
      },
      {
        text: {
          ru: 'Директивы противоречат друг другу, и браузер игнорирует обе',
          en: 'The directives conflict, so the browser ignores both',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Первые 60 секунд ответ берётся из кэша без запросов. С 60-й по 360-ю секунду пользователь мгновенно получает устаревшую копию, а кэш параллельно её обновляет — следующий запрос увидит свежие данные. После 360 секунд нужна обычная ревалидация.',
          en: 'For the first 60 seconds the response is served from cache with no requests. From second 60 to 360, the user instantly gets the stale copy while the cache refreshes it in parallel — the next request sees fresh data. After 360 seconds normal revalidation is required.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Та же идея лежит в основе библиотек SWR и TanStack Query: показать данные сразу, обновить в фоне.',
          en: 'The same idea powers libraries like SWR and TanStack Query: show data right away, refresh in the background.',
        },
      },
    ],
    sources: [
      { title: 'web.dev — stale-while-revalidate', url: 'https://web.dev/articles/stale-while-revalidate' },
      { title: 'MDN — Cache-Control', url: `${MDN}/Web/HTTP/Reference/Headers/Cache-Control` },
    ],
  },
  {
    id: 'web-render-001',
    topic: 'web',
    tags: ['browser-rendering', 'performance'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В каком порядке браузер превращает HTML и CSS в пиксели?',
      en: 'In what order does the browser turn HTML and CSS into pixels?',
    },
    options: [
      { code: 'Layout → DOM → CSSOM → Paint → Composite' },
      { code: 'DOM + CSSOM → Render tree → Layout → Paint → Composite' },
      { code: 'Paint → Layout → DOM → CSSOM → Composite' },
      { code: 'CSSOM → Paint → DOM → Layout → Composite' },
      { code: 'DOM → Paint → CSSOM → Composite → Layout' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Браузер разбирает HTML в DOM и CSS в CSSOM, объединяет их в дерево отрисовки (только видимые элементы с вычисленными стилями). **Layout** рассчитывает размеры и позиции, **Paint** рисует пиксели по слоям, **Composite** собирает слои в итоговый кадр.',
          en: 'The browser parses HTML into the DOM and CSS into the CSSOM, then combines them into the render tree (visible elements with computed styles). **Layout** computes sizes and positions, **Paint** fills in pixels per layer, and **Composite** assembles the layers into the final frame.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'CSS блокирует отрисовку: без CSSOM дерево не построить. Поэтому критичные стили грузят как можно раньше.',
          en: 'CSS is render-blocking: there’s no render tree without the CSSOM. That’s why critical styles are loaded as early as possible.',
        },
      },
      { type: 'diagram', diagram: 'critical-rendering-path' },
    ],
    sources: [
      { title: 'MDN — Critical rendering path', url: `${MDN}/Web/Performance/Guides/Critical_rendering_path` },
      {
        title: 'web.dev — Render-tree construction, layout, and paint',
        url: 'https://web.dev/articles/critical-rendering-path/render-tree-construction',
      },
    ],
  },
  {
    id: 'web-render-002',
    topic: 'web',
    tags: ['browser-rendering', 'performance'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какое изменение вызовет только перерисовку (repaint) без пересчёта раскладки (layout)?',
      en: 'Which change triggers only a repaint without a layout recalculation?',
    },
    options: [
      { text: { ru: 'Изменение `width`', en: 'Changing `width`' } },
      { text: { ru: 'Изменение `font-size`', en: 'Changing `font-size`' } },
      { text: { ru: 'Изменение `color`', en: 'Changing `color`' } },
      { text: { ru: 'Добавление элемента в DOM', en: 'Adding an element to the DOM' } },
      { text: { ru: 'Изменение `padding`', en: 'Changing `padding`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Всё, что влияет на геометрию — размеры, отступы, шрифт, структура DOM, — запускает **layout (reflow)**, а затем перерисовку. Цвет текста или фона геометрию не меняет, поэтому достаточно **repaint**.',
          en: 'Anything that affects geometry — sizes, spacing, fonts, DOM structure — triggers **layout (reflow)** followed by a repaint. Text or background color doesn’t change geometry, so a **repaint** is enough.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ещё дешевле `transform` и `opacity`: их часто можно применить на этапе композитинга без [[layout|layout]] и paint.',
          en: 'Even cheaper are `transform` and `opacity`: they can often be applied at the compositing stage without [[layout|layout]] or paint.',
        },
      },
      { type: 'diagram', diagram: 'critical-rendering-path' },
    ],
    sources: [
      { title: 'MDN — Reflow', url: `${MDN}/Glossary/Reflow` },
      { title: 'MDN — Repaint', url: `${MDN}/Glossary/Repaint` },
    ],
  },
  {
    id: 'web-render-003',
    topic: 'web',
    tags: ['browser-rendering', 'html-a11y'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Чем `<script defer>` отличается от `<script async>`?',
      en: 'How does `<script defer>` differ from `<script async>`?',
    },
    options: [
      {
        text: {
          ru: '`async` выполняется после разбора HTML по порядку, `defer` — сразу после загрузки',
          en: '`async` runs after HTML parsing in order, `defer` runs as soon as it loads',
        },
      },
      {
        text: {
          ru: '`defer` выполняется после разбора HTML в порядке подключения, `async` — сразу после загрузки, без гарантии порядка',
          en: '`defer` runs after HTML parsing in document order, `async` runs as soon as it loads, with no order guarantee',
        },
      },
      {
        text: {
          ru: 'Оба блокируют разбор HTML до выполнения скрипта',
          en: 'Both block HTML parsing until the script runs',
        },
      },
      {
        text: {
          ru: '`defer` работает только с модулями',
          en: '`defer` only works with modules',
        },
      },
      {
        text: {
          ru: 'Разницы нет',
          en: 'There’s no difference',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Оба атрибута загружают скрипт параллельно с разбором HTML. `defer` откладывает выполнение до конца разбора и сохраняет порядок скриптов — удобно для кода, который работает с DOM и зависит от других скриптов. `async` выполняет скрипт, как только он загрузился, — подходит для независимого кода вроде аналитики.',
          en: 'Both attributes download the script in parallel with HTML parsing. `defer` delays execution until parsing finishes and preserves script order — good for code that touches the DOM and depends on other scripts. `async` runs the script as soon as it downloads — good for independent code like analytics.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Скрипты `type="module"` ведут себя как `defer` по умолчанию.',
          en: 'Scripts with `type="module"` behave like `defer` by default.',
        },
      },
    ],
    sources: [{ title: 'MDN — <script>', url: `${MDN}/Web/HTML/Reference/Elements/script` }],
  },
  {
    id: 'web-render-004',
    topic: 'web',
    tags: ['browser-rendering', 'performance', 'css'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какие CSS-свойства лучше анимировать, чтобы анимация была плавной (60 fps)?',
      en: 'Which CSS properties are best to animate for smooth (60 fps) animation?',
    },
    options: [
      { text: { ru: '`top` и `left`', en: '`top` and `left`' } },
      { text: { ru: '`width` и `height`', en: '`width` and `height`' } },
      { text: { ru: '`margin` и `padding`', en: '`margin` and `padding`' } },
      { text: { ru: '`transform` и `opacity`', en: '`transform` and `opacity`' } },
      { text: { ru: '`box-shadow` и `border-radius`', en: '`box-shadow` and `border-radius`' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`transform` и `opacity` браузер может менять на этапе композитинга, часто на GPU, без [[layout|layout]] и paint. Анимация `top`, `left`, `width` пересчитывает раскладку на каждом кадре, а `box-shadow` — перерисовку. На слабых устройствах это даёт рывки.',
          en: 'The browser can change `transform` and `opacity` at the compositing stage, often on the GPU, without [[layout|layout]] or paint. Animating `top`, `left` or `width` recomputes layout every frame, and `box-shadow` forces repaints. On weak devices that causes jank.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.panel {
  transition: transform 200ms ease;
}
.panel.open {
  transform: translateX(0);
}`,
        },
      },
      { type: 'diagram', diagram: 'critical-rendering-path' },
    ],
    sources: [
      {
        title: 'web.dev — Stick to compositor-only properties',
        url: 'https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count',
      },
      { title: 'web.dev — How to create high-performance CSS animations', url: 'https://web.dev/articles/animations-guide' },
    ],
  },
  {
    id: 'web-render-005',
    topic: 'web',
    tags: ['browser-rendering', 'performance'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Почему этот код работает медленно?', en: 'Why is this code slow?' },
    code: {
      lang: 'js',
      source: `for (const box of boxes) {
  box.style.width = \`\${container.offsetWidth / 2}px\`;
}`,
    },
    options: [
      {
        text: {
          ru: 'Шаблонные строки медленнее конкатенации',
          en: 'Template literals are slower than concatenation',
        },
      },
      {
        text: {
          ru: 'Цикл `for...of` медленнее обычного `for`',
          en: '`for...of` is slower than a plain `for`',
        },
      },
      {
        text: {
          ru: 'Чтение `offsetWidth` после записи стиля на каждой итерации заставляет браузер синхронно пересчитывать layout (layout thrashing)',
          en: 'Reading `offsetWidth` after a style write on each iteration forces the browser to recalculate layout synchronously (layout thrashing)',
        },
      },
      {
        text: {
          ru: 'Нельзя менять `style` в цикле, нужно использовать классы',
          en: 'You can’t change `style` in a loop; you must use classes',
        },
      },
      {
        text: {
          ru: 'Ничего не мешает, браузер оптимизирует такой код сам',
          en: 'Nothing; the browser optimizes this code automatically',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Браузер копит изменения стилей и пересчитывает раскладку один раз перед кадром. Но чтение геометрии (`offsetWidth`, `getBoundingClientRect`) после записи требует актуальных значений — и [[layout|layout]] выполняется **синхронно** прямо сейчас, на каждой итерации.',
          en: 'The browser batches style changes and recomputes [[layout|layout]] once before a frame. But reading geometry (`offsetWidth`, `getBoundingClientRect`) after a write needs up-to-date values, so layout runs **synchronously** right then — on every iteration.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const half = container.offsetWidth / 2; // одно чтение / one read
for (const box of boxes) {
  box.style.width = \`\${half}px\`;            // только записи / writes only
}`,
        },
      },
    ],
    sources: [
      {
        title: 'web.dev — Avoid large, complex layouts and layout thrashing',
        url: 'https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing',
      },
    ],
  },
];
