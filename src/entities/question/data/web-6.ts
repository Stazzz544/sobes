import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const WEB_QUESTIONS_6: Question[] = [
  {
    id: 'web-origin-001',
    kind: 'output',
    topic: 'web',
    tags: ['security'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Сколько адресов того же origin, что и `base`? Впишите число.', en: 'How many URLs share `base`’s origin? Type the number.' },
    code: {
      lang: 'js',
      source: `const base = new URL('https://example.com');
const urls = [
  'https://example.com:443/a',
  'http://example.com/a',
  'https://www.example.com/a',
  'https://example.com:8080/a',
  'https://example.com/b?x=1#y',
];

console.log(urls.filter((url) => new URL(url).origin === base.origin).length);`,
    },
    answers: ['2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[origin|Origin]] — это **схема + хост + порт**. `:443` — порт HTTPS по умолчанию, поэтому `https://example.com:443` совпадает с базой; путь, параметры и якорь в origin не входят. Другая схема (`http`), поддомен (`www`) и порт `8080` — уже другой origin.',
          en: 'An [[origin|origin]] is **scheme + host + port**. `:443` is the default HTTPS port, so `https://example.com:443` matches the base; path, query and hash aren’t part of the origin. A different scheme (`http`), subdomain (`www`) or port `8080` makes a different origin.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Same-origin policy', url: `${MDN}/Web/Security/Same-origin_policy` },
      { title: 'MDN — URL: origin', url: `${MDN}/Web/API/URL/origin` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'web-cookie-samesite-001',
    topic: 'web',
    tags: ['security', 'storage'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Сайт `evil.example` отправляет форму `POST` на `bank.example`. С какой cookie браузер приложит её к запросу?',
      en: '`evil.example` submits a `POST` form to `bank.example`. With which cookie will the browser attach it to the request?',
    },
    options: [
      { code: 'session=1; SameSite=Strict' },
      { code: 'session=1; SameSite=Lax' },
      { code: 'session=1; SameSite=None; Secure' },
      { code: 'session=1; SameSite=None' },
      { code: 'session=1; HttpOnly; SameSite=Lax' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Strict` не отправляется ни в каких межсайтовых запросах, `Lax` — только при переходе по ссылке верхнего уровня методом `GET`, но не при межсайтовом `POST`. В межсайтовых запросах уходит только `SameSite=None`, и браузеры принимают её лишь вместе с `Secure` — без него cookie отклоняется.',
          en: '`Strict` isn’t sent on any cross-site request; `Lax` only on top-level `GET` navigations, not on a cross-site `POST`. Only `SameSite=None` goes on cross-site requests, and browsers accept it only with `Secure` — without it the cookie is rejected.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому `Lax` (умолчание в современных браузерах) уже сильно снижает риск [[csrf|CSRF]].',
          en: 'That’s why `Lax` (the default in modern browsers) already greatly reduces [[csrf|CSRF]] risk.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Set-Cookie: SameSite', url: `${MDN}/Web/HTTP/Reference/Headers/Set-Cookie` },
      { title: 'web.dev — SameSite cookies explained', url: 'https://web.dev/articles/samesite-cookies-explained' },
    ],
  },
  {
    id: 'web-raf-001',
    topic: 'web',
    tags: ['browser-rendering', 'performance'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Когда вызывается колбэк `requestAnimationFrame`?', en: 'When does a `requestAnimationFrame` callback run?' },
    options: [
      { text: { ru: 'Сразу после текущей синхронной функции', en: 'Right after the current synchronous function' } },
      { text: { ru: 'Перед следующей отрисовкой кадра браузером', en: 'Before the browser’s next repaint' } },
      { text: { ru: 'Ровно через 16 мс в любом случае', en: 'Exactly 16 ms later, no matter what' } },
      { text: { ru: 'После загрузки всех картинок', en: 'After all images have loaded' } },
      { text: { ru: 'Только в фоновой вкладке', en: 'Only in a background tab' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`requestAnimationFrame` планирует вызов **перед следующей отрисовкой** — обычно с частотой экрана (60, 120 Гц). Анимации на нём синхронизированы с кадрами и не делают лишней работы между ними, а в фоновых вкладках вызовы приостанавливаются. `setTimeout(fn, 16)` не привязан к кадрам и может «рваться».',
          en: '`requestAnimationFrame` schedules a call **before the next repaint** — usually at the screen’s refresh rate (60, 120 Hz). Animations built on it are in sync with frames and do no extra work between them, and calls pause in background tabs. `setTimeout(fn, 16)` isn’t tied to frames and can stutter.',
        },
      },
    ],
    sources: [{ title: 'MDN — requestAnimationFrame', url: `${MDN}/Web/API/Window/requestAnimationFrame` }],
  },
  {
    id: 'web-service-worker-order-001',
    kind: 'order',
    topic: 'web',
    tags: ['caching', 'networking'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Расставьте этапы жизненного цикла Service Worker по порядку.', en: 'Put the Service Worker lifecycle stages in order.' },
    items: [
      { code: "navigator.serviceWorker.register('/sw.js')" },
      { text: { ru: 'Событие `install`: заранее положить файлы в кэш', en: '`install` event: precache files' } },
      { text: { ru: 'Событие `activate`: удалить кэши старых версий', en: '`activate` event: delete old version caches' } },
      { text: { ru: 'События `fetch`: перехват запросов страниц в области действия', en: '`fetch` events: intercept requests from pages in scope' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Страница регистрирует воркер, браузер скачивает его и шлёт `install` — время наполнить кэш. Затем `activate` — чистка старых кэшей (новая версия ждёт, пока закроются вкладки со старой, если не вызвать `skipWaiting`). Только активный воркер получает `fetch` и может отдавать ответы из кэша.',
          en: 'The page registers the worker; the browser downloads it and fires `install` — time to fill the cache. Then `activate` — clean up old caches (a new version waits until tabs with the old one close unless `skipWaiting` is called). Only an active worker receives `fetch` and can serve responses from cache.',
        },
      },
    ],
    sources: [
      { title: 'web.dev — The service worker lifecycle', url: 'https://web.dev/articles/service-worker-lifecycle' },
      { title: 'MDN — Using Service Workers', url: `${MDN}/Web/API/Service_Worker_API/Using_Service_Workers` },
    ],
  },
  {
    id: 'web-vary-001',
    topic: 'web',
    tags: ['http', 'caching'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Сервер отдаёт один URL сжатым (gzip/br) или нет — в зависимости от `Accept-Encoding`. Какой заголовок нужен, чтобы CDN не отдал сжатую версию клиенту, который её не поддерживает?',
      en: 'The server returns one URL compressed (gzip/br) or not depending on `Accept-Encoding`. Which header keeps a CDN from serving the compressed version to a client that can’t handle it?',
    },
    options: [
      { code: 'Cache-Control: no-store' },
      { code: 'Vary: Accept-Encoding' },
      { code: 'Content-Encoding: identity' },
      { code: 'ETag: "v1"' },
      { code: 'Accept-Ranges: bytes' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Vary` перечисляет заголовки запроса, от которых зависит ответ. С `Vary: Accept-Encoding` кэш хранит отдельные копии для разных значений и отдаёт подходящую. `no-store` решил бы проблему ценой отказа от кэша вообще.',
          en: '`Vary` lists the request headers the response depends on. With `Vary: Accept-Encoding` a cache stores separate copies for different values and serves the right one. `no-store` would solve it by giving up caching entirely.',
        },
      },
    ],
    sources: [{ title: 'MDN — Vary', url: `${MDN}/Web/HTTP/Reference/Headers/Vary` }],
  },
  {
    id: 'web-redirect-001',
    topic: 'web',
    tags: ['http'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'API переехал навсегда, и клиенты шлют на старый адрес `POST`. Какой статус редиректа сохранит метод и тело запроса?',
      en: 'An API moved permanently, and clients send `POST` to the old URL. Which redirect status preserves the method and body?',
    },
    options: [{ code: '301' }, { code: '302' }, { code: '303' }, { code: '307' }, { code: '308' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`308 Permanent Redirect` — постоянный и **гарантированно** повторяет тот же метод с тем же телом. `301` и `302` исторически позволяют браузеру заменить `POST` на `GET`, `303` делает это намеренно, а `307` сохраняет метод, но означает временный переезд.',
          en: '`308 Permanent Redirect` is permanent and **guarantees** the same method and body are reused. `301` and `302` historically let browsers turn `POST` into `GET`, `303` does so on purpose, and `307` keeps the method but means a temporary move.',
        },
      },
    ],
    sources: [
      { title: 'MDN — 308 Permanent Redirect', url: `${MDN}/Web/HTTP/Reference/Status/308` },
      { title: 'MDN — Redirections in HTTP', url: `${MDN}/Web/HTTP/Guides/Redirections` },
    ],
  },
  {
    id: 'web-preconnect-001',
    topic: 'web',
    tags: ['performance', 'networking'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что делает `<link rel="preconnect" href="https://fonts.example">`?', en: 'What does `<link rel="preconnect" href="https://fonts.example">` do?' },
    options: [
      { text: { ru: 'Скачивает все шрифты с этого домена', en: 'Downloads all fonts from that domain' } },
      {
        text: {
          ru: 'Заранее устанавливает соединение — DNS, TCP и TLS, — чтобы будущие запросы стартовали быстрее',
          en: 'Opens the connection early — DNS, TCP and TLS — so future requests start faster',
        },
      },
      { text: { ru: 'Разрешает CORS-запросы к домену', en: 'Allows CORS requests to the domain' } },
      { text: { ru: 'Кэширует страницу домена', en: 'Caches the domain’s page' } },
      { text: { ru: 'Блокирует отрисовку до подключения', en: 'Blocks rendering until connected' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`preconnect` выполняет «дорогую» часть заранее: поиск DNS, TCP- и TLS-рукопожатия. Сам ресурс не скачивается — это задача `preload`. Подсказку ставят для 1–2 сторонних доменов, которые точно понадобятся скоро: лишние соединения тратят ресурсы.',
          en: '`preconnect` does the “expensive” part early: DNS lookup, TCP and TLS handshakes. It doesn’t download the resource — that’s `preload`’s job. Use it for 1–2 third-party domains that will definitely be needed soon: extra connections waste resources.',
        },
      },
    ],
    sources: [{ title: 'MDN — rel=preconnect', url: `${MDN}/Web/HTML/Reference/Attributes/rel/preconnect` }],
  },
  {
    id: 'web-hsts-001',
    topic: 'web',
    tags: ['security', 'http'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что даёт заголовок `Strict-Transport-Security: max-age=31536000`?', en: 'What does the `Strict-Transport-Security: max-age=31536000` header do?' },
    options: [
      { text: { ru: 'Шифрует cookie сайта', en: 'Encrypts the site’s cookies' } },
      {
        text: {
          ru: 'Браузер год обращается к домену только по HTTPS, даже если ввести или открыть `http://`',
          en: 'For a year the browser uses only HTTPS for the domain, even if `http://` is typed or linked',
        },
      },
      { text: { ru: 'Запрещает встраивать сайт во фреймы', en: 'Forbids embedding the site in frames' } },
      { text: { ru: 'Включает HTTP/2', en: 'Enables HTTP/2' } },
      { text: { ru: 'Кэширует страницу на год', en: 'Caches the page for a year' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[hsts|HSTS]] запоминается браузером: все запросы к домену на срок `max-age` сразу идут по HTTPS. Это закрывает атаку «понижения» до HTTP, когда злоумышленник в сети перехватывает первый незащищённый запрос. Самый первый визит защищает только включение домена в список HSTS preload.',
          en: 'The browser remembers [[hsts|HSTS]]: for `max-age` all requests to the domain go straight to HTTPS. This blocks downgrade attacks where an attacker on the network intercepts the first unencrypted request. Only adding the domain to the HSTS preload list protects the very first visit.',
        },
      },
    ],
    sources: [{ title: 'MDN — Strict-Transport-Security', url: `${MDN}/Web/HTTP/Reference/Headers/Strict-Transport-Security` }],
  },
  {
    id: 'web-clickjacking-001',
    topic: 'web',
    tags: ['security'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Как запретить встраивать страницу «Перевести деньги» в `<iframe>` на чужих сайтах (clickjacking)?',
      en: 'How do you forbid embedding a “Transfer money” page in an `<iframe>` on other sites (clickjacking)?',
    },
    options: [
      { code: "Content-Security-Policy: frame-ancestors 'none'" },
      { code: "Content-Security-Policy: script-src 'self'" },
      { code: 'Access-Control-Allow-Origin: none' },
      { code: 'Set-Cookie: session=1; HttpOnly' },
      { code: 'Strict-Transport-Security: max-age=31536000' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При clickjacking страницу прозрачно встраивают во фрейм и заставляют пользователя кликнуть по «невидимой» кнопке. `frame-ancestors` в [[csp|CSP]] указывает, кто может встраивать страницу; `\'none\'` — никто. Старый аналог — `X-Frame-Options: DENY`. `script-src`, [[cors|CORS]] и флаги cookie от этого не защищают.',
          en: 'In clickjacking the page is embedded in a transparent frame and the user is tricked into clicking an “invisible” button. [[csp|CSP]] `frame-ancestors` says who may embed the page; `\'none\'` — nobody. The older equivalent is `X-Frame-Options: DENY`. `script-src`, [[cors|CORS]] and cookie flags don’t protect against it.',
        },
      },
    ],
    sources: [
      { title: 'MDN — CSP: frame-ancestors', url: `${MDN}/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors` },
      { title: 'MDN — Clickjacking', url: `${MDN}/Web/Security/Attacks/Clickjacking` },
    ],
  },
  {
    id: 'web-indexeddb-001',
    topic: 'web',
    tags: ['storage'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Нужно хранить в браузере тысячи черновиков с картинками для офлайна. Что выбрать?',
      en: 'You need to store thousands of drafts with images in the browser for offline use. What should you pick?',
    },
    options: [
      { text: { ru: '`localStorage`', en: '`localStorage`' } },
      { text: { ru: 'Cookie', en: 'Cookies' } },
      { text: { ru: 'IndexedDB', en: 'IndexedDB' } },
      { text: { ru: '`sessionStorage`', en: '`sessionStorage`' } },
      { text: { ru: 'Глобальную переменную `window.drafts`', en: 'A global `window.drafts` variable' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'IndexedDB — асинхронная база в браузере: хранит структурированные объекты и `Blob`, поддерживает индексы и транзакции, объём — от сотен мегабайт. `localStorage` синхронный (блокирует главный поток), хранит только строки и ограничен примерно 5 МБ; cookie уходят с каждым запросом; `sessionStorage` и переменная не переживут закрытие вкладки.',
          en: 'IndexedDB is an async in-browser database: it stores structured objects and `Blob`s, supports indexes and transactions, with quota from hundreds of megabytes. `localStorage` is synchronous (blocks the main thread), stores only strings and is limited to about 5 MB; cookies go with every request; `sessionStorage` and a variable won’t survive closing the tab.',
        },
      },
    ],
    sources: [{ title: 'MDN — IndexedDB API', url: `${MDN}/Web/API/IndexedDB_API` }],
  },
  {
    id: 'web-fetch-errors-001',
    topic: 'web',
    tags: ['http', 'networking'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Сервер ответил `404`. Что будет в этом коде?', en: 'The server responded `404`. What happens in this code?' },
    code: {
      lang: 'js',
      source: `fetch('/api/user')
  .then((response) => response.json())
  .then((user) => render(user))
  .catch((error) => showError(error));`,
    },
    options: [
      { text: { ru: 'Сразу сработает `catch`, потому что статус 404', en: '`catch` runs immediately because the status is 404' } },
      {
        text: {
          ru: 'Промис `fetch` выполнится успешно: ошибкой считаются только сетевые сбои, статус нужно проверять через `response.ok`',
          en: 'The `fetch` promise resolves: only network failures are errors; check the status with `response.ok`',
        },
      },
      { text: { ru: '`fetch` повторит запрос три раза', en: '`fetch` retries the request three times' } },
      { text: { ru: 'Браузер покажет страницу 404 вместо приложения', en: 'The browser shows a 404 page instead of the app' } },
      { text: { ru: '`response.json()` всегда вернёт `null`', en: '`response.json()` always returns `null`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`fetch` отклоняет промис только при сетевой ошибке или блокировке [[cors|CORS]]. Ответ 404 или 500 — это успешно полученный ответ, у которого `response.ok === false`. Без проверки код попытается разобрать тело ошибки как данные пользователя.',
          en: '`fetch` rejects only on a network error or a [[cors|CORS]] block. A 404 or 500 is a successfully received response with `response.ok === false`. Without a check, the code tries to parse the error body as user data.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const response = await fetch('/api/user');
if (!response.ok) {
  throw new Error(\`HTTP \${response.status}\`);
}`,
        },
      },
    ],
    sources: [
      { title: 'MDN — fetch()', url: `${MDN}/Web/API/Window/fetch` },
      { title: 'MDN — Response: ok', url: `${MDN}/Web/API/Response/ok` },
    ],
  },
  {
    id: 'web-encode-uri-001',
    topic: 'web',
    tags: ['http'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: { lang: 'js', source: `const query = 'a b&c=d/e';\n\nconsole.log(encodeURI(query), encodeURIComponent(query));` },
    options: [
      { code: 'a%20b&c=d/e a%20b%26c%3Dd%2Fe' },
      { code: 'a%20b%26c%3Dd%2Fe a%20b&c=d/e' },
      { code: 'a+b&c=d/e a+b%26c%3Dd%2Fe' },
      { code: 'a%20b&c=d/e a%20b&c=d/e' },
      { code: 'a b&c=d/e a%20b%26c%3Dd%2Fe' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`encodeURI` кодирует целый адрес и не трогает символы, у которых в URL есть смысл: `&`, `=`, `/`, `?`. `encodeURIComponent` кодирует **часть** адреса — значение параметра — поэтому экранирует и их. Для значений в query-строке нужен именно он, иначе `&` разрежет параметр.',
          en: '`encodeURI` encodes a whole URL and leaves characters meaningful in URLs alone: `&`, `=`, `/`, `?`. `encodeURIComponent` encodes **a part** of a URL — a parameter value — so it escapes them too. Use it for query values, otherwise `&` splits the parameter.',
        },
      },
    ],
    sources: [
      { title: 'MDN — encodeURIComponent()', url: `${MDN}/Web/JavaScript/Reference/Global_Objects/encodeURIComponent` },
      { title: 'MDN — encodeURI()', url: `${MDN}/Web/JavaScript/Reference/Global_Objects/encodeURI` },
    ],
    verify: { kind: 'js-output' },
  },
];
