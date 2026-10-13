import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const WEB_QUESTIONS_3: Question[] = [
  {
    id: 'web-security-001',
    topic: 'web',
    tags: ['security'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что защищает от CSRF-атак?', en: 'What protects against CSRF attacks?' },
    options: [
      {
        text: {
          ru: 'Атрибут `HttpOnly` у cookie',
          en: 'The `HttpOnly` cookie attribute',
        },
      },
      {
        text: {
          ru: 'Перевод сайта на HTTPS',
          en: 'Moving the site to HTTPS',
        },
      },
      {
        text: {
          ru: 'Настройка CORS только для своего домена',
          en: 'Allowing CORS only for your own domain',
        },
      },
      {
        text: {
          ru: 'Cookie с `SameSite=Lax` или `Strict` плюс CSRF-токен в изменяющих запросах',
          en: 'Cookies with `SameSite=Lax` or `Strict` plus a CSRF token on state-changing requests',
        },
      },
      {
        text: {
          ru: 'Экранирование вывода HTML',
          en: 'Escaping HTML output',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В CSRF чужой сайт заставляет браузер жертвы отправить запрос на ваш сайт, и браузер сам прикладывает cookie сессии. `SameSite` запрещает отправку cookie в межсайтовых запросах (`Lax` — кроме навигации по ссылке методом GET), а CSRF-токен, который знает только ваша страница, подделать нельзя.',
          en: 'In CSRF, another site makes the victim’s browser send a request to your site, and the browser attaches the session cookie automatically. `SameSite` stops cookies from being sent on cross-site requests (`Lax` still allows top-level GET navigations), and a CSRF token known only to your page can’t be forged.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`HttpOnly` и экранирование защищают от XSS, HTTPS — от перехвата. CORS не мешает «простым» запросам дойти до сервера.',
          en: '`HttpOnly` and escaping protect against XSS, and HTTPS against interception. CORS doesn’t stop “simple” requests from reaching the server.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Cross-site request forgery (CSRF)', url: `${MDN}/Web/Security/Attacks/CSRF` },
      {
        title: 'OWASP — CSRF Prevention Cheat Sheet',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html',
      },
    ],
  },
  {
    id: 'web-security-002',
    topic: 'web',
    tags: ['security', 'storage'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что даёт атрибут cookie `HttpOnly`?', en: 'What does the `HttpOnly` cookie attribute do?' },
    options: [
      {
        text: {
          ru: 'Cookie отправляется только по HTTP, но не по HTTPS',
          en: 'The cookie is sent only over HTTP, not HTTPS',
        },
      },
      {
        text: {
          ru: 'Cookie недоступна из JavaScript через `document.cookie`, поэтому её не украсть через XSS',
          en: 'The cookie isn’t accessible from JavaScript via `document.cookie`, so XSS can’t steal it',
        },
      },
      {
        text: {
          ru: 'Cookie удаляется при закрытии вкладки',
          en: 'The cookie is deleted when the tab closes',
        },
      },
      {
        text: {
          ru: 'Cookie не отправляется на другие домены',
          en: 'The cookie isn’t sent to other domains',
        },
      },
      {
        text: {
          ru: 'Cookie шифруется браузером',
          en: 'The browser encrypts the cookie',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Браузер по-прежнему отправляет `HttpOnly`-cookie на сервер с запросами, но скрипты на странице её не видят. Даже если злоумышленник выполнит JavaScript через XSS, токен сессии он не прочитает.',
          en: 'The browser still sends an `HttpOnly` cookie to the server with requests, but page scripts can’t see it. Even if an attacker runs JavaScript via XSS, they can’t read the session token.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'http',
          source: `Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax; Path=/`,
        },
        caption: {
          ru: '`Secure` — только по HTTPS, `SameSite` — защита от CSRF.',
          en: '`Secure` means HTTPS only, `SameSite` guards against CSRF.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Set-Cookie', url: `${MDN}/Web/HTTP/Reference/Headers/Set-Cookie` },
      { title: 'MDN — Using HTTP cookies', url: `${MDN}/Web/HTTP/Guides/Cookies` },
    ],
  },
  {
    id: 'web-security-003',
    topic: 'web',
    tags: ['security'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что делает заголовок `Content-Security-Policy: script-src \'self\'`?',
      en: 'What does the `Content-Security-Policy: script-src \'self\'` header do?',
    },
    options: [
      {
        text: {
          ru: 'Разрешает скрипты только с того же origin; встроенные `<script>` и `eval` блокируются',
          en: 'Allows scripts only from the same origin; inline `<script>` and `eval` are blocked',
        },
      },
      {
        text: {
          ru: 'Шифрует все скрипты страницы',
          en: 'Encrypts all of the page’s scripts',
        },
      },
      {
        text: {
          ru: 'Запрещает другим сайтам загружать ваши скрипты',
          en: 'Prevents other sites from loading your scripts',
        },
      },
      {
        text: {
          ru: 'Разрешает любые скрипты, но только по HTTPS',
          en: 'Allows any scripts, but only over HTTPS',
        },
      },
      {
        text: {
          ru: 'Включает CORS для скриптов',
          en: 'Enables CORS for scripts',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'CSP говорит браузеру, откуда разрешено загружать ресурсы. `script-src \'self\'` пропускает только скрипты с вашего origin. Встроенные скрипты и `eval` по умолчанию запрещены, поэтому даже внедрённый через XSS `<script>` не выполнится.',
          en: 'CSP tells the browser where resources may be loaded from. `script-src \'self\'` only lets through scripts from your origin. Inline scripts and `eval` are blocked by default, so even a `<script>` injected via XSS won’t run.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Для нужных встроенных скриптов используют `nonce` или хэши. CSP — вторая линия обороны, а не замена экранированию.',
          en: 'For legitimate inline scripts you use a `nonce` or hashes. CSP is a second line of defense, not a replacement for escaping.',
        },
      },
    ],
    sources: [{ title: 'MDN — Content Security Policy (CSP)', url: `${MDN}/Web/HTTP/Guides/CSP` }],
  },
  {
    id: 'web-security-004',
    topic: 'web',
    tags: ['security', 'http'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Защищает ли CORS ваш API от нежелательных запросов?',
      en: 'Does CORS protect your API from unwanted requests?',
    },
    options: [
      {
        text: {
          ru: 'Да: сервер не получит ни одного запроса с чужого origin',
          en: 'Yes: the server won’t receive any request from another origin',
        },
      },
      {
        text: {
          ru: 'Да, CORS заменяет аутентификацию',
          en: 'Yes, CORS replaces authentication',
        },
      },
      {
        text: {
          ru: 'Нет: CORS — механизм браузера, ограничивающий чтение ответов страницами с других origin; curl или сервер обойдут его, а «простые» запросы всё равно доходят до сервера',
          en: 'No: CORS is a browser mechanism that limits reading responses from other origins; curl or a server bypass it, and “simple” requests still reach the server',
        },
      },
      {
        text: {
          ru: 'Да, если указать `Access-Control-Allow-Origin: *`',
          en: 'Yes, if you set `Access-Control-Allow-Origin: *`',
        },
      },
      {
        text: {
          ru: 'Нет, CORS работает только для картинок',
          en: 'No, CORS only applies to images',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'CORS **ослабляет** политику одного источника (same-origin policy) для доверенных сайтов, а проверяет её браузер. Сервер просто отдаёт заголовки, а решение «отдать ли ответ скрипту» принимает браузер. Простые запросы (например, `POST` из формы) при этом выполняются и могут изменить данные.',
          en: 'CORS **relaxes** the same-origin policy for trusted sites, and it’s enforced by the browser. The server just sends headers; the browser decides whether to hand the response to the script. Simple requests (like a form `POST`) still execute and can change data.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'API защищают аутентификация, проверка прав, CSRF-защита и лимиты, а не CORS.',
          en: 'APIs are protected by authentication, authorization checks, CSRF defenses and rate limits — not by CORS.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Cross-Origin Resource Sharing (CORS)', url: `${MDN}/Web/HTTP/Guides/CORS` },
      { title: 'MDN — Same-origin policy', url: `${MDN}/Web/Security/Same-origin_policy` },
    ],
  },
  {
    id: 'web-network-001',
    topic: 'web',
    tags: ['networking', 'browser-rendering'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Пользователь ввёл `https://example.com` в адресную строку. Каков порядок основных шагов?',
      en: 'A user types `https://example.com` into the address bar. What’s the order of the main steps?',
    },
    options: [
      { text: { ru: 'HTTP-запрос → DNS → TCP → TLS → рендеринг', en: 'HTTP request → DNS → TCP → TLS → rendering' } },
      { text: { ru: 'DNS → TCP → TLS → HTTP-запрос → ответ → разбор и рендеринг', en: 'DNS → TCP → TLS → HTTP request → response → parsing and rendering' } },
      { text: { ru: 'TLS → DNS → TCP → HTTP-запрос → рендеринг', en: 'TLS → DNS → TCP → HTTP request → rendering' } },
      { text: { ru: 'TCP → DNS → HTTP-запрос → TLS → рендеринг', en: 'TCP → DNS → HTTP request → TLS → rendering' } },
      { text: { ru: 'Рендеринг → DNS → TCP → TLS → HTTP-запрос', en: 'Rendering → DNS → TCP → TLS → HTTP request' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сначала DNS превращает имя домена в IP-адрес (с учётом кэшей). Затем устанавливается TCP-соединение, поверх него — TLS-рукопожатие для HTTPS. После этого уходит HTTP-запрос, приходит HTML, и браузер начинает разбор и отрисовку, параллельно запрашивая CSS, JS и картинки.',
          en: 'First DNS resolves the domain name to an IP address (using caches). Then a TCP connection is set up, with a TLS handshake on top for HTTPS. After that the HTTP request goes out, HTML comes back, and the browser starts parsing and rendering while fetching CSS, JS and images in parallel.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В HTTP/3 вместо TCP + TLS используется QUIC, совмещающий оба шага.',
          en: 'With HTTP/3, QUIC replaces TCP + TLS and combines both steps.',
        },
      },
    ],
    sources: [
      { title: 'MDN — How browsers work', url: `${MDN}/Web/Performance/Guides/How_browsers_work` },
      { title: 'MDN — DNS', url: `${MDN}/Glossary/DNS` },
    ],
  },
  {
    id: 'web-network-002',
    topic: 'web',
    tags: ['networking', 'security'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что обеспечивает TLS в HTTPS?', en: 'What does TLS provide in HTTPS?' },
    options: [
      {
        text: {
          ru: 'Только сжатие трафика',
          en: 'Only traffic compression',
        },
      },
      {
        text: {
          ru: 'Шифрование, целостность данных и подтверждение подлинности сервера через сертификат',
          en: 'Encryption, data integrity, and server authentication via a certificate',
        },
      },
      {
        text: {
          ru: 'Защиту от XSS и CSRF',
          en: 'Protection from XSS and CSRF',
        },
      },
      {
        text: {
          ru: 'Анонимность пользователя: сервер не узнает его IP',
          en: 'User anonymity: the server won’t learn their IP',
        },
      },
      {
        text: {
          ru: 'Ускорение DNS-запросов',
          en: 'Faster DNS queries',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'TLS шифрует трафик (его не прочитать по дороге), защищает от подмены (целостность) и позволяет убедиться, что вы говорите с настоящим сервером: сертификат подписан доверенным центром сертификации и выдан на этот домен.',
          en: 'TLS encrypts traffic (it can’t be read in transit), protects it from tampering (integrity), and lets you verify you’re talking to the real server: the certificate is signed by a trusted CA and issued for that domain.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'От уязвимостей самого приложения (XSS, CSRF) HTTPS не защищает, а IP-адрес клиента сервер видит всегда.',
          en: 'HTTPS doesn’t protect against the app’s own vulnerabilities (XSS, CSRF), and the server always sees the client’s IP address.',
        },
      },
    ],
    sources: [{ title: 'MDN — Transport Layer Security', url: `${MDN}/Web/Security/Transport_Layer_Security` }],
  },
  {
    id: 'web-network-003',
    topic: 'web',
    tags: ['networking', 'http'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чем Server-Sent Events отличаются от WebSocket?',
      en: 'How do Server-Sent Events differ from WebSocket?',
    },
    options: [
      {
        text: {
          ru: 'SSE — односторонний поток событий от сервера к клиенту поверх обычного HTTP с автопереподключением; WebSocket — двусторонний канал по отдельному протоколу',
          en: 'SSE is a one-way stream of events from server to client over plain HTTP with auto-reconnect; WebSocket is a two-way channel over its own protocol',
        },
      },
      {
        text: {
          ru: 'SSE двусторонний, а WebSocket — только от сервера к клиенту',
          en: 'SSE is two-way, while WebSocket is server-to-client only',
        },
      },
      {
        text: {
          ru: 'SSE работает только в Node.js',
          en: 'SSE only works in Node.js',
        },
      },
      {
        text: {
          ru: 'WebSocket не поддерживается браузерами',
          en: 'Browsers don’t support WebSocket',
        },
      },
      {
        text: {
          ru: 'Это одно и то же, разные названия',
          en: 'They’re the same thing under different names',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`EventSource` (SSE) открывает долгий HTTP-ответ `text/event-stream`, по которому сервер шлёт сообщения. Браузер сам переподключается при обрыве. Подходит для уведомлений, лент, прогресса и стриминга ответов ИИ.',
          en: '`EventSource` (SSE) opens a long-lived HTTP response of type `text/event-stream` that the server pushes messages through. The browser reconnects automatically. Great for notifications, feeds, progress and streaming AI responses.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'WebSocket после HTTP-рукопожатия переключается на свой протокол и позволяет обеим сторонам писать в любой момент. Нужен для чатов, игр и совместного редактирования.',
          en: 'WebSocket switches to its own protocol after an HTTP handshake and lets both sides send at any time. It’s for chats, games and collaborative editing.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Server-sent events', url: `${MDN}/Web/API/Server-sent_events` },
      { title: 'MDN — The WebSocket API', url: `${MDN}/Web/API/WebSockets_API` },
    ],
  },
  {
    id: 'web-perf-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какие метрики входят в Core Web Vitals сейчас?',
      en: 'Which metrics make up Core Web Vitals today?',
    },
    options: [
      { code: 'FCP, TTI, TBT' },
      { code: 'LCP, FID, CLS' },
      { code: 'TTFB, FCP, LCP' },
      { code: 'LCP, INP, CLS' },
      { code: 'INP, TBT, Speed Index' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**LCP** (Largest Contentful Paint) — скорость загрузки основного контента, хорошо ≤ 2,5 с. **INP** (Interaction to Next Paint) — отзывчивость на действия пользователя, хорошо ≤ 200 мс. **CLS** (Cumulative Layout Shift) — визуальная стабильность, хорошо ≤ 0,1.',
          en: '**LCP** (Largest Contentful Paint) measures how fast the main content loads, good is ≤ 2.5 s. **INP** (Interaction to Next Paint) measures responsiveness, good is ≤ 200 ms. **CLS** (Cumulative Layout Shift) measures visual stability, good is ≤ 0.1.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В марте 2024 года INP заменил FID, поэтому вариант с FID устарел.',
          en: 'In March 2024 INP replaced FID, so the FID option is outdated.',
        },
      },
    ],
    sources: [
      { title: 'web.dev — Web Vitals', url: 'https://web.dev/articles/vitals' },
      { title: 'web.dev — Interaction to Next Paint (INP)', url: 'https://web.dev/articles/inp' },
    ],
  },
  {
    id: 'web-perf-002',
    topic: 'web',
    tags: ['performance', 'html-a11y'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что чаще всего ухудшает CLS (сдвиги макета)?',
      en: 'What most often hurts CLS (layout shifts)?',
    },
    options: [
      {
        text: {
          ru: 'Большой размер JavaScript-бандла',
          en: 'A large JavaScript bundle',
        },
      },
      {
        text: {
          ru: 'Медленный ответ сервера',
          en: 'A slow server response',
        },
      },
      {
        text: {
          ru: 'Картинки, реклама и iframe без заданных размеров, а также контент, вставленный над уже показанным',
          en: 'Images, ads and iframes without set dimensions, plus content injected above what’s already shown',
        },
      },
      {
        text: {
          ru: 'Использование CSS Grid',
          en: 'Using CSS Grid',
        },
      },
      {
        text: {
          ru: 'Анимации через `transform`',
          en: 'Animations using `transform`',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Если браузер не знает размер картинки заранее, он отводит под неё 0 пикселей, а после загрузки раздвигает контент — пользователь промахивается мимо кнопки. Задавайте `width`/`height` или `aspect-ratio` и резервируйте место под динамические блоки.',
          en: 'If the browser doesn’t know an image’s size in advance, it reserves 0 pixels and pushes content down once it loads — users miss the button they meant to tap. Set `width`/`height` or `aspect-ratio`, and reserve space for dynamic blocks.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'html',
          source: `<img src="hero.webp" width="1200" height="600" alt="..." />`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`transform`-анимации не вызывают сдвигов макета, а большой бандл и медленный сервер бьют по LCP и INP.',
          en: '`transform` animations don’t cause layout shifts, while a big bundle or slow server hurts LCP and INP.',
        },
      },
    ],
    sources: [
      { title: 'web.dev — Cumulative Layout Shift (CLS)', url: 'https://web.dev/articles/cls' },
      { title: 'web.dev — Optimize CLS', url: 'https://web.dev/articles/optimize-cls' },
    ],
  },
  {
    id: 'web-perf-003',
    topic: 'web',
    tags: ['performance', 'html-a11y'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чем `<link rel="preload">` отличается от `<link rel="prefetch">`?',
      en: 'How does `<link rel="preload">` differ from `<link rel="prefetch">`?',
    },
    options: [
      {
        text: {
          ru: '`preload` — для ресурса текущей страницы с высоким приоритетом; `prefetch` — для вероятной следующей навигации с низким приоритетом',
          en: '`preload` is for a current-page resource at high priority; `prefetch` is for a likely next navigation at low priority',
        },
      },
      {
        text: {
          ru: '`prefetch` грузит ресурс раньше `preload`',
          en: '`prefetch` loads a resource earlier than `preload`',
        },
      },
      {
        text: {
          ru: '`preload` выполняет скрипт сразу после загрузки',
          en: '`preload` executes a script right after loading',
        },
      },
      {
        text: {
          ru: 'Это синонимы',
          en: 'They’re synonyms',
        },
      },
      {
        text: {
          ru: '`prefetch` работает только с картинками',
          en: '`prefetch` only works with images',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`preload` заранее сообщает браузеру о критичном ресурсе, который он иначе нашёл бы поздно: шрифт из CSS, LCP-картинку. Загрузка начинается сразу, но ресурс не выполняется и не применяется сам по себе. `prefetch` — подсказка «скорее всего понадобится дальше»: браузер скачает в простое и положит в кэш.',
          en: '`preload` tells the browser early about a critical resource it would otherwise discover late: a font referenced from CSS, the LCP image. The download starts right away, but nothing is executed or applied by itself. `prefetch` is a hint that something will likely be needed next: the browser downloads it when idle and caches it.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'html',
          source: `<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
<link rel="prefetch" href="/checkout.js" />`,
        },
      },
    ],
    sources: [
      { title: 'MDN — rel=preload', url: `${MDN}/Web/HTML/Reference/Attributes/rel/preload` },
      { title: 'MDN — Prefetch', url: `${MDN}/Glossary/Prefetch` },
    ],
  },
];
