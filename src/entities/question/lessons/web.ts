import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const WEB_LESSONS: Lesson[] = [
  {
    tag: 'http',
    format: 'steps',
    summary: {
      ru: 'HTTP — язык, на котором браузер говорит с сервером. Разберём методы и идемпотентность, коды ответов и редиректы, ловушки `fetch` и кодирования URL и то, когда браузер отправляет preflight-запрос.',
      en: 'HTTP is the language the browser speaks with the server. We’ll cover methods and idempotency, status codes and redirects, `fetch` and URL-encoding traps, and when the browser sends a preflight request.',
    },
    steps: [
      {
        id: 'methods',
        title: { ru: 'Методы и идемпотентность', en: 'Methods and idempotency' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`GET` читает, `POST` создаёт или запускает действие, `PUT` заменяет ресурс целиком, `PATCH` меняет часть, `DELETE` удаляет. **Идемпотентный** метод даёт тот же эффект на сервере, сколько раз его ни повтори: второй `PUT` с теми же данными оставит то же состояние, при втором `DELETE` удалять уже нечего. `POST` не идемпотентен: два одинаковых запроса могут создать два заказа. Поэтому при сбое повторяют только идемпотентные запросы — или передают ключ идемпотентности.',
              en: '`GET` reads, `POST` creates or triggers an action, `PUT` replaces a resource whole, `PATCH` changes part of it, `DELETE` removes it. An **idempotent** method has the same effect on the server however many times you repeat it: a second `PUT` with the same data leaves the same state, a second `DELETE` has nothing left to delete. `POST` isn’t idempotent: two identical requests can create two orders. That’s why only idempotent requests are retried on failure — or an idempotency key is sent.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'text',
              source: 'PUT /users/7    → same state twice\nDELETE /users/7 → nothing left 2nd time\nPOST /orders    → a new order each time',
            },
          },
        ],
        test: ['web-http-002'],
      },
      {
        id: 'statuses',
        title: { ru: 'Коды ответов', en: 'Status codes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Первая цифра — класс: `2xx` успех, `3xx` перенаправление, `4xx` ошибка клиента, `5xx` ошибка сервера. `401` — сервер не знает, кто вы: нет токена или он неверный, пора войти заново. `403` — вы известны, но прав не хватает, повторный вход не поможет. У редиректов важны срок и метод: `301` и `302` исторически позволяют браузеру сменить `POST` на `GET`, `303` делает это всегда, а `307` (временный) и `308` (постоянный) повторяют тот же метод с тем же телом.',
              en: 'The first digit is the class: `2xx` success, `3xx` redirection, `4xx` client error, `5xx` server error. `401` means the server doesn’t know who you are: no token or a bad one, time to sign in again. `403` means you’re known but lack permissions, and signing in again won’t help. For redirects permanence and method matter: `301` and `302` historically let the browser switch `POST` to `GET`, `303` always does, while `307` (temporary) and `308` (permanent) repeat the same method with the same body.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'foreign-report',
              prompt: {
                ru: 'Пользователь вошёл в систему, но открывает чужой отчёт, к которому у него нет доступа. Какой статус уместен?',
                en: 'A signed-in user opens someone else’s report they have no access to. Which status fits?',
              },
              options: [
                { text: { ru: '`401`', en: '`401`' } },
                { text: { ru: '`403`', en: '`403`' } },
                { text: { ru: '`500`', en: '`500`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Сервер знает пользователя, но прав не хватает — это `403`. `401` означал бы, что пользователь не аутентифицирован.',
                en: 'The server knows the user, but permissions are missing — that’s `403`. `401` would mean the user isn’t authenticated.',
              },
            },
          },
        ],
        test: ['web-http-001'],
      },
      {
        id: 'fetch',
        title: { ru: 'Ловушки fetch и URL', en: 'fetch and URL traps' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`fetch` отклоняет промис только при сбое сети или блокировке CORS. Ответ `404` или `500` — успешно полученный ответ с `response.ok === false`, статус проверяют сами. Значения в адресе кодируют. Оба кодировщика превращают пробел в `%20`, но `encodeURIComponent` экранирует ещё и символы со смыслом в URL — `&`, `=`, `/`, `?` — он для значения параметра. `encodeURI` кодирует адрес целиком и эти символы оставляет. Проще всего — `URLSearchParams`: он кодирует сам.',
              en: '`fetch` rejects its promise only on a network failure or a CORS block. A `404` or `500` is a successfully received response with `response.ok === false`, so you check the status yourself. Values in a URL are encoded. Both encoders turn a space into `%20`, but `encodeURIComponent` also escapes characters that mean something in a URL — `&`, `=`, `/`, `?` — it’s for a parameter value. `encodeURI` encodes a whole address and leaves them alone. Simplest of all is `URLSearchParams`: it encodes for you.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const res = await fetch(url);\nif (!res.ok) {\n  throw new Error(`HTTP ${res.status}`);\n}\nconst data = await res.json();',
            },
          },
        ],
        test: ['web-fetch-errors-001', 'web-encode-uri-001'],
      },
      {
        id: 'preflight',
        title: { ru: 'CORS и preflight', en: 'CORS and preflight' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Запрос на чужой origin браузер отправит, но ответ отдаст коду страницы, только если сервер разрешил это заголовком `Access-Control-Allow-Origin`. «Простые» запросы — `GET`, `HEAD` и `POST` с безопасными заголовками и `Content-Type` вроде `text/plain` или данных формы — уходят сразу. Для остальных, например `PUT`, `DELETE` или JSON, браузер сначала спрашивает разрешения запросом `OPTIONS` — это **preflight**.',
              en: 'The browser will send a request to another origin, but it hands the response to the page’s code only if the server allowed it with `Access-Control-Allow-Origin`. “Simple” requests — `GET`, `HEAD` and `POST` with safe headers and a `Content-Type` like `text/plain` or form data — go out immediately. For the rest, such as `PUT`, `DELETE` or JSON, the browser first asks permission with an `OPTIONS` request — the **preflight**.',
            },
          },
          { type: 'diagram', diagram: 'web-cors-preflight' },
        ],
        test: ['web-cors-preflight-001'],
      },
    ],
    keyPoints: [
      { ru: 'Идемпотентны `GET`, `PUT`, `DELETE`; `POST` — нет.', en: '`GET`, `PUT`, `DELETE` are idempotent; `POST` isn’t.' },
      { ru: '`401` — кто вы? `403` — нельзя. `308` сохраняет метод.', en: '`401` — who are you? `403` — not allowed. `308` keeps the method.' },
      { ru: '`fetch` не падает на `404` — проверяйте `response.ok`.', en: '`fetch` doesn’t fail on `404` — check `response.ok`.' },
      { ru: 'Не «простой» запрос на чужой origin — сначала `OPTIONS`.', en: 'A non-simple cross-origin request starts with `OPTIONS`.' },
    ],
    sources: [
      { title: 'MDN — HTTP request methods', url: `${MDN}/Web/HTTP/Reference/Methods` },
      { title: 'MDN — HTTP response status codes', url: `${MDN}/Web/HTTP/Reference/Status` },
      { title: 'MDN — Using the Fetch API', url: `${MDN}/Web/API/Fetch_API/Using_Fetch` },
      { title: 'MDN — CORS', url: `${MDN}/Web/HTTP/Guides/CORS` },
    ],
  },  {
    tag: 'networking',
    format: 'steps',
    summary: {
      ru: 'Что происходит между вводом адреса и первым байтом HTML: DNS, TCP и TLS. Чем HTTP/2 и HTTP/3 быстрее HTTP/1.1 и как сервер сам присылает данные в реальном времени.',
      en: 'What happens between typing an address and the first byte of HTML: DNS, TCP and TLS. Why HTTP/2 and HTTP/3 are faster than HTTP/1.1, and how the server pushes data in real time.',
    },
    steps: [
      {
        id: 'url-to-page',
        title: { ru: 'От адреса до страницы', en: 'From address to page' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'До первого HTTP-запроса браузер узнаёт IP-адрес через DNS, открывает TCP-соединение и для HTTPS проводит TLS-рукопожатие. Каждый шаг — минимум круг до сервера и обратно, на мобильной сети это сотни миллисекунд. Поэтому соединения переиспользуют, а для важного стороннего домена — шрифтов или API — подсказывают браузеру заранее: `<link rel="preconnect">` выполняет DNS, TCP и TLS до того, как ресурс понадобится, но сам файл не скачивает.',
              en: 'Before the first HTTP request, the browser looks up the IP via DNS, opens a TCP connection and, for HTTPS, runs a TLS handshake. Each step costs at least a round trip to the server, hundreds of milliseconds on a mobile network. So connections are reused, and for an important third-party domain — fonts or an API — the browser gets a hint in advance: `<link rel="preconnect">` does DNS, TCP and TLS before the resource is needed, but doesn’t download the file itself.',
            },
          },
          { type: 'diagram', diagram: 'web-url-to-page' },
        ],
        test: ['web-preconnect-001'],
      },
      {
        id: 'tls',
        title: { ru: 'Что даёт TLS', en: 'What TLS provides' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'TLS решает три задачи. **Шифрование** — трафик не прочитать по дороге: в кафе, у провайдера. **Целостность** — данные не подменить незаметно. **Подлинность** — сертификат сервера подписан доверенным центром сертификации и выдан на этот домен, так что вы говорите с настоящим сайтом, а не с перехватчиком. Безопасным сам сайт TLS не делает: XSS или утечка базы — уже не его зона.',
              en: 'TLS solves three problems. **Encryption** — traffic can’t be read on the way: in a café, at the provider. **Integrity** — data can’t be swapped unnoticed. **Authenticity** — the server’s certificate is signed by a trusted certificate authority and issued for this domain, so you’re talking to the real site, not an interceptor. TLS doesn’t make the site itself secure: XSS or a database leak is outside its scope.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'public-wifi',
              prompt: {
                ru: 'Злоумышленник в общей Wi-Fi-сети перехватывает HTTPS-трафик. Что он увидит?',
                en: 'An attacker on a shared Wi-Fi network intercepts HTTPS traffic. What will they see?',
              },
              options: [
                { text: { ru: 'Пароли и cookie в открытом виде', en: 'Passwords and cookies in plain text' } },
                { text: { ru: 'Зашифрованные данные, которые без ключей не прочитать', en: 'Encrypted data that can’t be read without the keys' } },
                { text: { ru: 'Ничего: HTTPS скрывает даже факт соединения', en: 'Nothing: HTTPS hides even the fact of a connection' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Содержимое зашифровано. Видны лишь адрес сервера, обычно домен и объём трафика — сам факт соединения не скрыт.',
                en: 'The content is encrypted. Only the server address, usually the domain and the traffic volume are visible — the connection itself isn’t hidden.',
              },
            },
          },
        ],
        test: ['web-network-002'],
      },
      {
        id: 'http2-http3',
        title: { ru: 'HTTP/2 и HTTP/3', en: 'HTTP/2 and HTTP/3' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'HTTP/1.1 обрабатывает запросы в соединении по очереди, поэтому браузеры открывают до шести соединений на домен, а файлы склеивали в бандлы и спрайты. HTTP/2 **мультиплексирует**: много запросов и ответов параллельно в одном соединении, плюс бинарные фреймы и сжатие заголовков. Но он работает поверх TCP: потерялся один пакет — ждут все потоки. HTTP/3 переходит на QUIC поверх UDP: потоки независимы, а TLS 1.3 встроен в рукопожатие, и соединение устанавливается быстрее.',
              en: 'HTTP/1.1 handles requests on a connection one at a time, so browsers open up to six connections per domain, and files used to be glued into bundles and sprites. HTTP/2 **multiplexes**: many requests and responses in parallel over one connection, plus binary frames and header compression. But it runs on TCP: lose one packet and every stream waits. HTTP/3 moves to QUIC over UDP: streams are independent, TLS 1.3 is built into the handshake, and connections are set up faster.',
            },
          },
        ],
        test: ['web-http-004', 'web-http-005'],
      },
      {
        id: 'realtime',
        title: { ru: 'Данные в реальном времени', en: 'Real-time data' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Когда сервер должен сам присылать данные, есть два стандартных пути. **Server-Sent Events** (`EventSource`) — односторонний поток от сервера к клиенту поверх обычного HTTP с типом `text/event-stream`; при обрыве браузер сам переподключается. Подходит для уведомлений, лент и стриминга ответа. **WebSocket** — двусторонний канал по отдельному протоколу: чаты, игры, совместное редактирование. Переподключение и пинги для него пишут сами.',
              en: 'When the server must push data itself, there are two standard ways. **Server-Sent Events** (`EventSource`) are a one-way stream from server to client over plain HTTP with the `text/event-stream` type; the browser reconnects on its own after a drop. They suit notifications, feeds and response streaming. **WebSocket** is a two-way channel over a separate protocol: chats, games, collaborative editing. You write reconnection and pings for it yourself.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const events = new EventSource(\'/feed\');\nevents.onmessage = (event) => {\n  render(JSON.parse(event.data));\n};',
            },
          },
        ],
        test: ['web-network-003'],
      },
    ],
    keyPoints: [
      { ru: 'DNS → TCP → TLS → HTTP: каждый шаг — круг до сервера.', en: 'DNS → TCP → TLS → HTTP: each step is a round trip.' },
      { ru: '`preconnect` делает рукопожатия заранее.', en: '`preconnect` does the handshakes in advance.' },
      { ru: 'TLS: шифрование, целостность, подлинность.', en: 'TLS: encryption, integrity, authenticity.' },
      { ru: 'HTTP/2 — мультиплексирование, HTTP/3 — QUIC поверх UDP.', en: 'HTTP/2 multiplexes; HTTP/3 is QUIC over UDP.' },
      { ru: 'SSE — от сервера, WebSocket — в обе стороны.', en: 'SSE is server-to-client; WebSocket goes both ways.' },
    ],
    sources: [
      { title: 'MDN — How browsers work', url: `${MDN}/Web/Performance/Guides/How_browsers_work` },
      { title: 'MDN — rel=preconnect', url: `${MDN}/Web/HTML/Reference/Attributes/rel/preconnect` },
      { title: 'MDN — Evolution of HTTP', url: `${MDN}/Web/HTTP/Guides/Evolution_of_HTTP` },
      { title: 'MDN — Server-sent events', url: `${MDN}/Web/API/Server-sent_events` },
    ],
  },  {
    tag: 'caching',
    format: 'steps',
    summary: {
      ru: 'Самый быстрый запрос — тот, которого не было. Разберём директивы `Cache-Control`, ревалидацию через `ETag`, заголовок `Vary` и Service Worker, который управляет кэшем из кода.',
      en: 'The fastest request is the one never made. We’ll cover `Cache-Control` directives, revalidation with `ETag`, the `Vary` header and the Service Worker that controls caching from code.',
    },
    steps: [
      {
        id: 'cache-control',
        title: { ru: 'Cache-Control', en: 'Cache-Control' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`max-age=N` — сколько секунд ответ свежий и берётся из кэша без запроса. `public` разрешает хранить ответ и общим кэшам — CDN и прокси, `private` — только браузеру пользователя: персональные данные нельзя раздавать из CDN другим людям. `stale-while-revalidate=M` продлевает жизнь: ещё M секунд после устаревания кэш сразу отдаёт старую копию и в фоне запрашивает свежую. `no-store` запрещает хранить ответ вообще.',
              en: '`max-age=N` is how many seconds the response stays fresh and is served from cache without a request. `public` lets shared caches — CDNs and proxies — store it too, `private` only the user’s browser: personal data must not be served from a CDN to other people. `stale-while-revalidate=M` extends its life: for M more seconds after it goes stale, the cache serves the old copy immediately and fetches a fresh one in the background. `no-store` forbids storing the response at all.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'http',
              source: 'Cache-Control: public, max-age=3600\nCache-Control: private, no-store\nCache-Control: max-age=30,\n  stale-while-revalidate=120',
            },
          },
        ],
        test: ['web-cache-002', 'web-cache-003'],
      },
      {
        id: 'revalidation',
        title: { ru: 'Ревалидация', en: 'Revalidation' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Устаревший ответ не выбрасывают, а **перепроверяют**. Вместе с ответом сервер отдал `ETag` — отпечаток версии — или `Last-Modified`. Браузер отправляет условный запрос с `If-None-Match` или `If-Modified-Since`. Ресурс не изменился — сервер отвечает коротким `304 Not Modified` без тела, и браузер берёт копию из кэша. Название `no-cache` обманчиво: хранить ответ можно, но перед **каждым** использованием его нужно перепроверить.',
              en: 'A stale response isn’t thrown away but **revalidated**. Along with the response the server sent an `ETag` — a version fingerprint — or `Last-Modified`. The browser sends a conditional request with `If-None-Match` or `If-Modified-Since`. If the resource hasn’t changed, the server replies with a short `304 Not Modified` without a body, and the browser uses its cached copy. The name `no-cache` is misleading: the response may be stored but must be revalidated before **every** use.',
            },
          },
          { type: 'diagram', diagram: 'http-revalidation' },
          {
            type: 'check',
            check: {
              id: 'no-cache-vs-no-store',
              prompt: {
                ru: 'Чем `no-cache` отличается от `no-store`?',
                en: 'How does `no-cache` differ from `no-store`?',
              },
              options: [
                { text: { ru: 'Это синонимы', en: 'They’re synonyms' } },
                { text: { ru: '`no-cache` хранит, но перепроверяет, а `no-store` не хранит вовсе', en: '`no-cache` stores but revalidates; `no-store` doesn’t store at all' } },
                { text: { ru: '`no-store` разрешает хранить только в CDN', en: '`no-store` allows storing only in a CDN' } },
              ],
              answer: 1,
              explanation: {
                ru: '`no-cache` экономит трафик за счёт `304`, а `no-store` — для данных, которые нельзя оставлять на диске.',
                en: '`no-cache` saves bandwidth thanks to `304`, while `no-store` is for data that must not stay on disk.',
              },
            },
          },
        ],
        test: ['web-cache-control-001'],
      },
      {
        id: 'vary',
        title: { ru: 'Vary: один URL — разные ответы', en: 'Vary: one URL, different responses' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Кэш ищет копию по URL. Если ответ зависит ещё и от заголовков запроса, об этом нужно сказать: `Vary` перечисляет такие заголовки, и кэш хранит отдельную копию на каждое их значение. Например, сервер отдаёт по одному адресу английскую или русскую страницу в зависимости от `Accept-Language`. Без `Vary: Accept-Language` CDN раздаст всем ту версию, которую закэшировал первой. Чем больше вариантов, тем реже попадания в кэш.',
              en: 'A cache looks up a copy by URL. If the response also depends on request headers, you must say so: `Vary` lists those headers, and the cache keeps a separate copy for each of their values. Say the server returns an English or a Russian page at one address depending on `Accept-Language`. Without `Vary: Accept-Language` a CDN serves everyone whichever version it cached first. The more variants, the fewer cache hits.',
            },
          },
        ],
        test: ['web-vary-001'],
      },
      {
        id: 'service-worker',
        title: { ru: 'Service Worker', en: 'Service Worker' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Service Worker** — скрипт-посредник между страницей и сетью. Страница регистрирует его, и браузер присылает событие `install` — время заранее положить файлы в кэш. Затем `activate` — пора удалить кэши старых версий; новая версия по умолчанию ждёт, пока закроются вкладки со старой. Дальше воркер получает событие `fetch` на каждый запрос страниц своей области и сам решает: ответить из кэша, сходить в сеть или совместить. Так работает офлайн-режим.',
              en: 'A **Service Worker** is a script that sits between the page and the network. The page registers it, and the browser fires `install` — time to pre-cache files. Then `activate` — time to delete old versions’ caches; by default a new version waits until tabs with the old one close. After that the worker receives a `fetch` event for every request from pages in its scope and decides itself: answer from cache, go to the network or combine both. That’s how offline mode works.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'async function cacheFirst(req) {\n  const hit = await caches.match(req);\n  return hit ?? fetch(req);\n}\n\nself.onfetch = (event) => {\n  const req = event.request;\n  event.respondWith(cacheFirst(req));\n};',
            },
          },
        ],
        test: ['web-service-worker-order-001'],
      },
    ],
    keyPoints: [
      { ru: '`max-age` — свежесть, `private` — только браузер.', en: '`max-age` is freshness; `private` means browser only.' },
      { ru: '`no-cache` — хранить и перепроверять, `no-store` — не хранить.', en: '`no-cache` stores and revalidates; `no-store` doesn’t store.' },
      { ru: '`ETag` + `If-None-Match` → `304` без тела.', en: '`ETag` + `If-None-Match` → `304` with no body.' },
      { ru: '`Vary` — отдельная копия на значение заголовка.', en: '`Vary` keeps a copy per header value.' },
    ],
    sources: [
      { title: 'MDN — HTTP caching', url: `${MDN}/Web/HTTP/Guides/Caching` },
      { title: 'MDN — Cache-Control', url: `${MDN}/Web/HTTP/Reference/Headers/Cache-Control` },
      { title: 'MDN — Vary', url: `${MDN}/Web/HTTP/Reference/Headers/Vary` },
      { title: 'MDN — Using Service Workers', url: `${MDN}/Web/API/Service_Worker_API/Using_Service_Workers` },
    ],
  },  {
    tag: 'browser-rendering',
    format: 'steps',
    summary: {
      ru: 'Как браузер превращает HTML и CSS в пиксели, почему скрипты тормозят разбор страницы, какие изменения стоят дороже всего и как синхронизировать анимации с кадрами.',
      en: 'How the browser turns HTML and CSS into pixels, why scripts hold up parsing, which changes cost the most and how to sync animations with frames.',
    },
    steps: [
      {
        id: 'pipeline',
        title: { ru: 'Путь к пикселям', en: 'The road to pixels' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Браузер разбирает HTML в DOM и CSS в CSSOM и объединяет их в **дерево отрисовки** — только видимые элементы с вычисленными стилями. Затем **Layout** считает размеры и позиции, **Paint** заливает пиксели по слоям, а **Composite** собирает слои в итоговый кадр. CSS блокирует отрисовку: пока стили не загружены, браузер не покажет страницу, иначе она бы «прыгала».',
              en: 'The browser parses HTML into the DOM and CSS into the CSSOM and combines them into the **render tree** — only visible elements with computed styles. Then **Layout** computes sizes and positions, **Paint** fills pixels layer by layer, and **Composite** assembles the layers into the final frame. CSS is render-blocking: until styles load, the browser won’t show the page, or it would “jump”.',
            },
          },
          { type: 'diagram', diagram: 'critical-rendering-path' },
        ],
        test: ['web-render-001'],
      },
      {
        id: 'scripts',
        title: { ru: 'Скрипты и разбор HTML', en: 'Scripts and HTML parsing' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Обычный `<script>` останавливает разбор HTML, пока скрипт не загрузится и не выполнится: он ведь может изменить документ. `defer` и `async` загружают скрипт параллельно с разбором. `defer` выполняется после разбора всего HTML в порядке подключения, но до события `DOMContentLoaded`. `async` выполняется сразу после загрузки, без гарантии порядка — для независимых скриптов вроде аналитики. Событие `load` наступает последним: когда загружены картинки, стили и iframe.',
              en: 'A plain `<script>` stops HTML parsing until the script loads and runs: it might change the document, after all. `defer` and `async` load the script in parallel with parsing. `defer` runs after all HTML is parsed, in source order, but before `DOMContentLoaded`. `async` runs as soon as it loads, with no order guarantee — for independent scripts like analytics. The `load` event comes last: when images, styles and iframes have loaded.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<script defer src="app.js"></script>\n<script async src="ads.js"></script>',
            },
          },
        ],
        test: ['web-render-003', 'web-browser-rendering-order-001'],
      },
      {
        id: 'reflow',
        title: { ru: 'Layout дороже Paint', en: 'Layout costs more than Paint' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Изменения геометрии — размеры, отступы, шрифт, структура DOM — запускают пересчёт раскладки (**reflow**), а за ним перерисовку. Цвет текста или фона геометрию не меняет, хватает **repaint**. Браузер копит изменения и пересчитывает раскладку раз в кадр. Но если прочитать геометрию (`offsetHeight`, `getBoundingClientRect()`) сразу после записи стиля, пересчёт придётся сделать синхронно. Чтение и запись вперемешку в цикле — **layout thrashing**: сначала читайте, потом пишите.',
              en: 'Geometry changes — sizes, spacing, fonts, DOM structure — trigger a layout recalculation (**reflow**) followed by a repaint. Text or background color doesn’t change geometry, so a **repaint** is enough. The browser batches changes and recalculates layout once per frame. But reading geometry (`offsetHeight`, `getBoundingClientRect()`) right after writing a style forces a synchronous recalculation. Interleaving reads and writes in a loop is **layout thrashing**: read first, then write.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const height = panel.offsetHeight;\nfor (const item of items) {\n  item.style.height = `${height}px`;\n}',
            },
          },
          {
            type: 'check',
            check: {
              id: 'cheapest-change',
              prompt: {
                ru: 'Какое изменение обойдётся браузеру дешевле всего?',
                en: 'Which change is cheapest for the browser?',
              },
              options: [
                { text: { ru: 'Сменить `background-color`', en: 'Changing `background-color`' } },
                { text: { ru: 'Сменить `padding`', en: 'Changing `padding`' } },
                { text: { ru: 'Добавить элемент в начало списка', en: 'Adding an element at the start of a list' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Фон не меняет геометрию — достаточно repaint. Отступы и новые элементы двигают раскладку.',
                en: 'A background doesn’t change geometry — a repaint is enough. Padding and new elements shift the layout.',
              },
            },
          },
        ],
        test: ['web-render-002', 'web-render-005'],
      },
      {
        id: 'frames',
        title: { ru: 'Анимации и кадры', en: 'Animations and frames' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'При 60 Гц на кадр есть около 16 мс. `requestAnimationFrame` вызывает колбэк перед следующей отрисовкой: анимация синхронизирована с экраном, а в фоновой вкладке колбэки ставятся на паузу. Анимируйте `transform` и `opacity`: их браузер часто меняет на этапе композитинга, без layout и paint, нередко на GPU. Анимация `top`, `left` или `width` пересчитывает раскладку на каждом кадре и дёргается.',
              en: 'At 60 Hz a frame has about 16 ms. `requestAnimationFrame` runs its callback before the next paint: the animation is in sync with the screen, and in a background tab callbacks pause. Animate `transform` and `opacity`: the browser can often change them at the compositing stage, without layout or paint, often on the GPU. Animating `top`, `left` or `width` recalculates layout every frame and stutters.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'function tick(time) {\n  ball.style.transform =\n    `translateX(${time / 10 % 300}px)`;\n  requestAnimationFrame(tick);\n}\nrequestAnimationFrame(tick);',
            },
          },
        ],
        test: ['web-raf-001'],
      },
    ],
    keyPoints: [
      { ru: 'DOM + CSSOM → Render tree → Layout → Paint → Composite.', en: 'DOM + CSSOM → Render tree → Layout → Paint → Composite.' },
      { ru: '`defer` — после разбора по порядку, `async` — как загрузится.', en: '`defer` runs after parsing in order; `async` as soon as loaded.' },
      { ru: 'Геометрия → reflow, цвет → repaint.', en: 'Geometry → reflow; color → repaint.' },
      { ru: 'Анимируйте `transform` и `opacity` через `requestAnimationFrame`.', en: 'Animate `transform` and `opacity` with `requestAnimationFrame`.' },
    ],
    sources: [
      { title: 'MDN — Critical rendering path', url: `${MDN}/Web/Performance/Guides/Critical_rendering_path` },
      { title: 'MDN — The script element', url: `${MDN}/Web/HTML/Reference/Elements/script` },
      { title: 'web.dev — Avoid layout thrashing', url: 'https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing' },
      { title: 'MDN — requestAnimationFrame', url: `${MDN}/Web/API/Window/requestAnimationFrame` },
    ],
  },  {
    tag: 'html-a11y',
    format: 'steps',
    summary: {
      ru: 'Доступная разметка работает для всех: клавиатуры, скринридеров, поисковиков. Разберём семантические элементы, `alt` и размеры картинок, способы скрыть элемент, безопасные ссылки и подсказки браузеру о ресурсах.',
      en: 'Accessible markup works for everyone: keyboards, screen readers, search engines. We’ll cover semantic elements, `alt` and image sizes, ways to hide an element, safe links and resource hints for the browser.',
    },
    steps: [
      {
        id: 'semantics',
        title: { ru: 'Семантика вместо div', en: 'Semantics over div' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Семантический элемент даёт поведение бесплатно. `<button>` попадает в порядок Tab, нажимается Enter и Space, объявляется скринридером как кнопка и умеет `disabled`. `<div onclick>` — просто блок: мышью кликается, а с клавиатуры недоступен. Чтобы его починить, нужны `role="button"`, `tabindex="0"` и обработка клавиш — проще взять `<button>`. Ориентиры — `<header>`, `<nav>`, `<main>`, `<footer>` — позволяют скринридеру прыгать по разделам.',
              en: 'A semantic element gives you behavior for free. `<button>` joins the Tab order, responds to Enter and Space, is announced as a button by screen readers and supports `disabled`. `<div onclick>` is just a box: clickable with a mouse, unreachable from the keyboard. Fixing it takes `role="button"`, `tabindex="0"` and key handling — easier to use `<button>`. Landmarks — `<header>`, `<nav>`, `<main>`, `<footer>` — let screen readers jump between sections.',
            },
          },
          { type: 'illustration', illustration: 'html-landmarks' },
        ],
        test: ['web-a11y-001'],
      },
      {
        id: 'images',
        title: { ru: 'Картинки: alt и размеры', en: 'Images: alt and size' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`alt` — текст вместо картинки для скринридера и при ошибке загрузки. Содержательная картинка описывает смысл: «Продажи в мае выросли», а не «картинка». Декоративной ставят пустой `alt=""` — её пропустят. Без атрибута скринридер может зачитать имя файла. Размеры важны не меньше: без `width` и `height` или `aspect-ratio` браузер не знает высоту картинки до загрузки, а потом раздвигает контент. Это сдвиг макета (CLS) — пользователь промахивается мимо кнопки.',
              en: '`alt` is the text that replaces an image for screen readers and when loading fails. A meaningful image describes its point: “Sales grew in May”, not “image”. A decorative one gets an empty `alt=""` — it will be skipped. Without the attribute a screen reader may read out the file name. Sizes matter just as much: without `width` and `height` or `aspect-ratio`, the browser doesn’t know the image’s height before it loads and then pushes content down. That’s a layout shift (CLS) — the user misses the button.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<img src="chart.png" width="640"\n  height="360" alt="Sales grew in May">',
            },
          },
        ],
        test: ['web-a11y-002', 'web-perf-002'],
      },
      {
        id: 'hiding',
        title: { ru: 'Как скрыть элемент', en: 'How to hide an element' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`display: none` и атрибут `hidden` убирают элемент из раскладки и из дерева доступности. `visibility: hidden` оставляет место, но элемент не кликается и скрыт от скринридера. `opacity: 0` скрывает только визуально: место, клики, фокус и скринридер — всё остаётся. Текст «только для скринридера» прячут классом `visually-hidden`: элемент сжимают до 1px и обрезают, но из дерева доступности не убирают.',
              en: '`display: none` and the `hidden` attribute remove an element from layout and from the accessibility tree. `visibility: hidden` keeps its space, but the element isn’t clickable and is hidden from screen readers. `opacity: 0` hides only visually: space, clicks, focus and screen readers all remain. Text “for screen readers only” is hidden with a `visually-hidden` class: the element is shrunk to 1px and clipped but stays in the accessibility tree.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'visibility-hidden',
              prompt: {
                ru: 'Панель спрятали через `visibility: hidden`. Что с её кнопками?',
                en: 'A panel is hidden with `visibility: hidden`. What about its buttons?',
              },
              options: [
                { text: { ru: 'Скринридер по-прежнему их читает', en: 'Screen readers still read them' } },
                { text: { ru: 'Не кликаются и скрыты от скринридера, но место занято', en: 'Not clickable and hidden from screen readers, but they keep their space' } },
                { text: { ru: 'Удалены из DOM', en: 'Removed from the DOM' } },
              ],
              answer: 1,
              explanation: {
                ru: '`visibility: hidden` сохраняет раскладку, но выключает взаимодействие и доступность. Из DOM элемент не удаляется.',
                en: '`visibility: hidden` keeps the layout but turns off interaction and accessibility. The element stays in the DOM.',
              },
            },
          },
        ],
        test: ['web-css-006'],
      },
      {
        id: 'links-hints',
        title: { ru: 'Ссылки и подсказки браузеру', en: 'Links and browser hints' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ссылка с `target="_blank"` без `rel="noopener"` отдаёт новой вкладке `window.opener`, и чужая страница может подменить адрес исходной на фишинговую. Браузеры уже ставят `noopener` по умолчанию, но явный атрибут не помешает. В `<head>` подсказывают, что загрузить: `preload` — критичный ресурс **текущей** страницы, который браузер иначе найдёт поздно (шрифт из CSS, главная картинка), с высоким приоритетом. `prefetch` — ресурс вероятной **следующей** страницы, с низким.',
              en: 'A `target="_blank"` link without `rel="noopener"` gives the new tab `window.opener`, and a foreign page can swap the original tab’s address for a phishing one. Browsers now apply `noopener` by default, but an explicit attribute doesn’t hurt. In `<head>` you hint what to load: `preload` is a critical resource of the **current** page that the browser would otherwise find late (a font from CSS, the hero image), at high priority. `prefetch` is a resource of the likely **next** page, at low priority.',
            },
          },
        ],
        test: ['web-sec-noopener-001'],
      },
    ],
    keyPoints: [
      { ru: '`<button>` даёт фокус, клавиши и роль бесплатно.', en: '`<button>` gives focus, keys and a role for free.' },
      { ru: 'Декоративной картинке — `alt=""`, любой — размеры.', en: 'Decorative images get `alt=""`; every image gets a size.' },
      { ru: '`opacity: 0` скрывает только визуально.', en: '`opacity: 0` hides only visually.' },
      { ru: '`noopener` для `_blank`; `preload` — сейчас, `prefetch` — потом.', en: '`noopener` for `_blank`; `preload` is for now, `prefetch` for later.' },
    ],
    sources: [
      { title: 'MDN — The button element', url: `${MDN}/Web/HTML/Reference/Elements/button` },
      { title: 'MDN — HTMLImageElement.alt', url: `${MDN}/Web/API/HTMLImageElement/alt` },
      { title: 'web.dev — Cumulative Layout Shift', url: 'https://web.dev/articles/cls' },
      { title: 'MDN — rel=preload', url: `${MDN}/Web/HTML/Reference/Attributes/rel/preload` },
    ],
  },  {
    tag: 'css',
    format: 'steps',
    summary: {
      ru: 'Механизмы CSS, на которых спотыкаются чаще всего: каскад, блочная модель и схлопывание отступов, sticky и контексты наложения, а ещё выбор между Flexbox и Grid.',
      en: 'The CSS mechanics people trip over most: the cascade, the box model and margin collapsing, sticky and stacking contexts, plus choosing between Flexbox and Grid.',
    },
    steps: [
      {
        id: 'cascade',
        title: { ru: 'Каскад', en: 'The cascade' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Когда к элементу применяются конфликтующие правила, каскад сравнивает их по очереди критериев. Сначала **важность и источник**: `!important` побеждает обычные объявления, какой бы ни была их специфичность. Затем **слои** `@layer`, затем **специфичность**: id весомее любого числа классов, класс — любого числа тегов. Последний критерий — **порядок**: при равенстве побеждает объявление ниже. Инлайн-стиль сильнее селекторов, но проигрывает `!important`.',
              en: 'When conflicting rules apply to an element, the cascade compares them by a sequence of criteria. First **importance and origin**: `!important` beats normal declarations whatever their specificity. Then **layers** (`@layer`), then **specificity**: an id outweighs any number of classes, a class any number of tags. The last criterion is **order**: on a tie the later declaration wins. An inline style beats selectors but loses to `!important`.',
            },
          },
          { type: 'diagram', diagram: 'css-cascade-order' },
        ],
        test: ['web-css-cascade-001'],
      },
      {
        id: 'box-model',
        title: { ru: 'Блочная модель и отступы', en: 'Box model and margins' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Бокс состоит из content, padding, border и margin. По умолчанию `box-sizing: content-box`: `width` — только контент, padding и border добавляются сверху. С `border-box` в `width` входят padding и border — блок занимает ровно заданную ширину, поэтому его часто включают для всех элементов. Вертикальные margin соседних блоков **схлопываются**: вместо суммы берётся больший. Горизонтальные не схлопываются, а во flex- и grid-контейнерах схлопывания нет.',
              en: 'A box is made of content, padding, border and margin. By default `box-sizing: content-box`: `width` is the content only, and padding and border are added on top. With `border-box`, `width` includes padding and border — the box takes exactly the set width, so it’s often enabled for every element. Vertical margins of adjacent blocks **collapse**: the larger one is used instead of the sum. Horizontal margins don’t collapse, and there’s no collapsing in flex and grid containers.',
            },
          },
          { type: 'illustration', illustration: 'css-box-layers' },
        ],
        test: ['web-css-002'],
      },
      {
        id: 'positioning',
        title: { ru: 'Sticky и z-index', en: 'Sticky and z-index' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`position: sticky` ведёт себя как `relative`, пока не пересечёт порог из `top`, `bottom`, `left` или `right`: без порога он не прилипнет. Прилипает он к ближайшему предку с прокруткой, поэтому `overflow: hidden` или `auto` у родителя ломает «прилипание к окну». `z-index` работает внутри **контекста наложения**: его создают позиционированный элемент с `z-index`, `opacity < 1`, `transform`, `filter`. Потомок с огромным `z-index` не поднимется выше соседа своего контекста.',
              en: '`position: sticky` behaves like `relative` until it crosses a threshold from `top`, `bottom`, `left` or `right`: without a threshold it never sticks. It sticks to the nearest scrolling ancestor, so `overflow: hidden` or `auto` on a parent breaks “sticking to the window”. `z-index` works within a **stacking context**: one is created by a positioned element with `z-index`, `opacity < 1`, `transform`, `filter`. A descendant with a huge `z-index` won’t rise above its context’s sibling.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'modal-under-header',
              prompt: {
                ru: 'У модалки `z-index: 1000`, но она всё равно под шапкой. Что проверить первым?',
                en: 'A modal has `z-index: 1000` but still sits under the header. What do you check first?',
              },
              options: [
                { text: { ru: 'Поднять `z-index` до 99999', en: 'Raise `z-index` to 99999' } },
                { text: { ru: 'Не создаёт ли кто-то из предков модалки контекст наложения', en: 'Whether one of the modal’s ancestors creates a stacking context' } },
                { text: { ru: 'Добавить `!important`', en: 'Add `!important`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Внутри чужого контекста любой `z-index` бессилен. Модалку выносят из него — например, порталом в конец `<body>`.',
                en: 'Inside another context any `z-index` is powerless. Move the modal out of it — for example, with a portal to the end of `<body>`.',
              },
            },
          },
        ],
        test: ['web-css-004', 'web-css-005'],
      },
      {
        id: 'flex-grid',
        title: { ru: 'Flexbox или Grid', en: 'Flexbox or Grid' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Flexbox одномерный: раскладывает элементы вдоль одной оси и выравнивает по второй. Он хорош для панелей, меню, кнопок в строку — размеры идут от содержимого. Grid двумерный: задаёт сетку строк и колонок сразу, и элементы встают в ячейки. Им удобно размечать страницу и карточки, которые должны выравниваться и по горизонтали, и по вертикали. Их часто совмещают: сетка страницы на Grid, содержимое ячейки — на Flexbox.',
              en: 'Flexbox is one-dimensional: it lays items out along one axis and aligns them on the other. It’s good for toolbars, menus, rows of buttons — sizes come from the content. Grid is two-dimensional: it defines rows and columns at once, and items sit in cells. It’s handy for page layout and cards that must line up both horizontally and vertically. They’re often combined: the page grid in Grid, a cell’s content in Flexbox.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.cards {\n  display: grid;\n  grid-template-columns: repeat(\n    auto-fill, minmax(200px, 1fr)\n  );\n  gap: 16px;\n}',
            },
          },
        ],
        test: ['web-css-003'],
      },
    ],
    keyPoints: [
      { ru: 'Важность → слои → специфичность → порядок.', en: 'Importance → layers → specificity → order.' },
      { ru: '`border-box`: `width` включает padding и border.', en: '`border-box`: `width` includes padding and border.' },
      { ru: 'Вертикальные margin соседей схлопываются.', en: 'Vertical margins of siblings collapse.' },
      { ru: '`z-index` сравнивается внутри контекста наложения.', en: '`z-index` is compared within a stacking context.' },
      { ru: 'Одна ось — Flexbox, две — Grid.', en: 'One axis — Flexbox, two — Grid.' },
    ],
    sources: [
      { title: 'MDN — Cascade', url: `${MDN}/Web/CSS/CSS_cascade/Cascade` },
      { title: 'MDN — box-sizing', url: `${MDN}/Web/CSS/box-sizing` },
      { title: 'MDN — Stacking context', url: `${MDN}/Web/CSS/CSS_positioned_layout/Stacking_context` },
      { title: 'MDN — Grid and other layout methods', url: `${MDN}/Web/CSS/CSS_grid_layout/Relationship_of_grid_layout_with_other_layout_methods` },
    ],
  },  {
    tag: 'storage',
    format: 'steps',
    summary: {
      ru: 'Где браузер хранит данные: `localStorage` и `sessionStorage`, IndexedDB и cookie. Разберём ограничения каждого и то, почему токен сессии держат в cookie с правильными атрибутами.',
      en: 'Where the browser keeps data: `localStorage` and `sessionStorage`, IndexedDB and cookies. We’ll cover each one’s limits and why a session token belongs in a cookie with the right attributes.',
    },
    steps: [
      {
        id: 'web-storage',
        title: { ru: 'localStorage и sessionStorage', en: 'localStorage and sessionStorage' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Оба хранилища привязаны к origin и хранят только строки: объект без `JSON.stringify` превратится в `"[object Object]"`. Лимит — около 5 МБ, а API синхронный: большие чтения и записи блокируют главный поток. `localStorage` общий для всех вкладок сайта и живёт, пока его не очистят. `sessionStorage` свой у каждой вкладки: переживает перезагрузку, но исчезает при её закрытии. В Service Worker и Web Worker ни то ни другое недоступно.',
              en: 'Both stores are tied to the origin and hold only strings: an object without `JSON.stringify` becomes `"[object Object]"`. The limit is about 5 MB, and the API is synchronous: big reads and writes block the main thread. `localStorage` is shared by all of a site’s tabs and lives until cleared. `sessionStorage` is per tab: it survives a reload but disappears when the tab closes. Neither is available in Service Workers or Web Workers.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const draft = { title: \'Hi\', tags: [] };\nlocalStorage.setItem(\n  \'draft\',\n  JSON.stringify(draft),\n);',
            },
          },
        ],
        test: ['web-storage-001', 'web-storage-002'],
      },
      {
        id: 'indexeddb',
        title: { ru: 'IndexedDB', en: 'IndexedDB' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Для больших объёмов есть **IndexedDB** — асинхронная база данных в браузере. Она хранит структурированные объекты и бинарные данные — `Blob`, файлы, картинки — без превращения в строки, поддерживает индексы для быстрого поиска и транзакции. Квота — от сотен мегабайт и зависит от свободного места на диске. API у неё громоздкий, поэтому обычно берут обёртку вроде `idb` или Dexie. На IndexedDB вместе с Service Worker строят офлайн-режим.',
              en: 'For large volumes there’s **IndexedDB** — an asynchronous database in the browser. It stores structured objects and binary data — `Blob`s, files, images — without turning them into strings, and supports indexes for fast lookups and transactions. The quota starts at hundreds of megabytes and depends on free disk space. Its API is clunky, so people usually reach for a wrapper like `idb` or Dexie. Offline mode is built on IndexedDB together with a Service Worker.',
            },
          },
        ],
        test: ['web-indexeddb-001'],
      },
      {
        id: 'cookies',
        title: { ru: 'Cookie и их атрибуты', en: 'Cookies and their attributes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Cookie браузер сам прикладывает к запросам на свой сайт — поэтому в ней хранят сессию. Атрибуты решают, насколько это безопасно. `HttpOnly` скрывает cookie от JavaScript: `document.cookie` её не покажет, и скрипт, внедрённый через XSS, токен не украдёт. `Secure` — отправлять только по HTTPS. `Max-Age` или `Expires` задают срок; без них cookie живёт до закрытия браузера. Всё, что доступно из JS, — `localStorage` тоже — внедрённый скрипт прочитает.',
              en: 'The browser attaches cookies to requests to their own site by itself — that’s why sessions live in them. Attributes decide how safe that is. `HttpOnly` hides the cookie from JavaScript: `document.cookie` won’t show it, and a script injected via XSS can’t steal the token. `Secure` means HTTPS only. `Max-Age` or `Expires` set the lifetime; without them the cookie lives until the browser closes. Anything reachable from JS — `localStorage` included — an injected script can read.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'http',
              source: 'Set-Cookie: sid=8f2c; Path=/;\n  HttpOnly; Secure; SameSite=Lax',
            },
          },
          {
            type: 'check',
            check: {
              id: 'httponly-fetch',
              prompt: {
                ru: 'Сервер поставил cookie с `HttpOnly`. Уйдёт ли она с запросом `fetch` на тот же сайт?',
                en: 'The server set a cookie with `HttpOnly`. Will it go out with a `fetch` request to the same site?',
              },
              options: [
                { text: { ru: 'Нет, `HttpOnly`-cookie не отправляются из `fetch`', en: 'No, `HttpOnly` cookies aren’t sent from `fetch`' } },
                { text: { ru: 'Да: `HttpOnly` прячет cookie только от скриптов, а браузер прикладывает её как обычно', en: 'Yes: `HttpOnly` hides the cookie only from scripts; the browser attaches it as usual' } },
                { text: { ru: 'Только если прочитать её через `document.cookie`', en: 'Only if read via `document.cookie`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Сервер получает cookie как обычно — она недоступна лишь коду на странице.',
                en: 'The server receives the cookie as usual — only code on the page can’t access it.',
              },
            },
          },
        ],
        test: ['web-security-002'],
      },
      {
        id: 'samesite',
        title: { ru: 'SameSite', en: 'SameSite' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`SameSite` решает, уходит ли cookie в **межсайтовых** запросах — тех, что начались на чужом сайте. `Strict` — никогда: даже переход по ссылке с другого сайта придёт без cookie. `Lax` — только при переходе верхнего уровня методом `GET`: по ссылке пользователь окажется залогиненным, но `POST`-форма или `fetch` с чужого сайта придут без cookie. `None` — всегда, но только вместе с `Secure`. Без атрибута браузеры считают cookie `Lax`.',
              en: '`SameSite` decides whether a cookie goes out in **cross-site** requests — those started on another site. `Strict` — never: even following a link from another site arrives without the cookie. `Lax` — only on top-level `GET` navigation: a link keeps the user signed in, but a `POST` form or `fetch` from another site arrives without the cookie. `None` — always, but only together with `Secure`. Without the attribute browsers treat a cookie as `Lax`.',
            },
          },
        ],
        test: ['web-cookie-samesite-001'],
      },
    ],
    keyPoints: [
      { ru: 'Web Storage: строки, ~5 МБ, синхронно.', en: 'Web Storage: strings, ~5 MB, synchronous.' },
      { ru: '`sessionStorage` — вкладка, `localStorage` — пока не очистят.', en: '`sessionStorage` — per tab; `localStorage` — until cleared.' },
      { ru: 'Много данных и файлы — в IndexedDB.', en: 'Lots of data and files go to IndexedDB.' },
      { ru: 'Сессия — в cookie `HttpOnly; Secure; SameSite`.', en: 'Sessions go in an `HttpOnly; Secure; SameSite` cookie.' },
    ],
    sources: [
      { title: 'MDN — Web Storage API', url: `${MDN}/Web/API/Web_Storage_API` },
      { title: 'MDN — IndexedDB API', url: `${MDN}/Web/API/IndexedDB_API` },
      { title: 'MDN — Using HTTP cookies', url: `${MDN}/Web/HTTP/Guides/Cookies` },
      { title: 'MDN — Set-Cookie', url: `${MDN}/Web/HTTP/Reference/Headers/Set-Cookie` },
    ],
  },  {
    tag: 'security',
    format: 'steps',
    summary: {
      ru: 'Безопасность в браузере держится на origin. Разберём, что такое origin и CORS, как работают XSS и CSP, как защититься от подменённого кода, чужих форм и прозрачных фреймов.',
      en: 'Browser security rests on the origin. We’ll cover what an origin and CORS are, how XSS and CSP work, and how to defend against tampered code, foreign forms and invisible frames.',
    },
    steps: [
      {
        id: 'origin-cors',
        title: { ru: 'Origin и CORS', en: 'Origin and CORS' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Origin** — схема, хост и порт. `http://` и `https://`, `www.` и голый домен — разные origin, а путь и параметры не важны. Порт по умолчанию (`443` у HTTPS) можно не писать. Политика одного источника запрещает странице читать ответы чужого origin. CORS её **ослабляет**: сервер разрешает конкретным сайтам читать ответы. Проверяет это браузер, поэтому CORS не защищает API: curl пошлёт что угодно. Для запросов с cookie `*` не годится — нужен конкретный origin.',
              en: 'An **origin** is scheme, host and port. `http://` and `https://`, `www.` and the bare domain are different origins; path and query don’t matter. The default port (`443` for HTTPS) can be omitted. The same-origin policy stops a page from reading another origin’s responses. CORS **relaxes** it: the server lets specific sites read responses. The browser enforces it, so CORS doesn’t protect an API: curl sends anything. For requests with cookies `*` won’t do — a specific origin is required.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'http',
              source: 'Access-Control-Allow-Origin:\n  https://app.example.com\nAccess-Control-Allow-Credentials: true',
            },
          },
        ],
        test: ['web-origin-001', 'web-security-004'],
      },
      {
        id: 'xss',
        title: { ru: 'XSS', en: 'XSS' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**XSS** — ввод пользователя попадает на страницу как код и выполняется у других посетителей: крадёт данные, действует от их имени. Главная защита — экранировать данные при выводе: `textContent` вместо `innerHTML`, автоэкранирование в шаблонах и React. Если HTML действительно нужен, например в форматированном отзыве, его чистят санитайзером вроде DOMPurify. Регулярки не спасают: скрипт внедряют и без `<script>` — через `onerror` у картинки или ссылку `javascript:`.',
              en: '**XSS** is user input landing on the page as code and running for other visitors: stealing data, acting on their behalf. The main defense is escaping data on output: `textContent` instead of `innerHTML`, auto-escaping in templates and React. If HTML is really needed, say in a formatted review, it’s cleaned with a sanitizer like DOMPurify. Regexes don’t help: scripts get injected without `<script>` — via an image’s `onerror` or a `javascript:` link.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'comment.textContent = userText;\npreview.innerHTML =\n  DOMPurify.sanitize(userHtml);',
            },
          },
        ],
        test: ['web-xss-001', 'web-sec-sanitize-001'],
      },
      {
        id: 'csp-sri',
        title: { ru: 'CSP и чужой код', en: 'CSP and third-party code' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Content-Security-Policy** — заголовок со списком разрешённых источников. `script-src \'self\'` пускает только скрипты с вашего origin, а встроенные `<script>` и `eval` по умолчанию блокируются — даже удачная XSS-инъекция не выполнится. Скрипт с публичного CDN защищает **Subresource Integrity**: атрибут `integrity` хранит хеш ожидаемого файла, и если содержимое на CDN подменили, браузер его не выполнит. Для чужого origin нужен ещё `crossorigin="anonymous"`.',
              en: '**Content-Security-Policy** is a header listing allowed sources. `script-src \'self\'` lets in only scripts from your origin, and inline `<script>` and `eval` are blocked by default — even a successful XSS injection won’t run. A script from a public CDN is protected by **Subresource Integrity**: the `integrity` attribute holds the expected file’s hash, and if the CDN content is swapped, the browser won’t run it. A foreign origin also needs `crossorigin="anonymous"`.',
            },
          },
        ],
        test: ['web-security-003', 'web-sec-sri-001'],
      },
      {
        id: 'csrf-framing',
        title: { ru: 'CSRF и clickjacking', en: 'CSRF and clickjacking' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В **CSRF** чужой сайт заставляет браузер жертвы отправить запрос на ваш сайт, и браузер сам прикладывает cookie сессии. Защита — cookie с `SameSite=Lax` или `Strict` плюс CSRF-токен в изменяющих запросах: чужой сайт его не знает. В **clickjacking** вашу страницу прозрачно встраивают во фрейм и подставляют под клик пользователя. Встраивание запрещает CSP `frame-ancestors`: `\'none\'` — никому, `\'self\'` — только своему сайту. Старый аналог — `X-Frame-Options: DENY`.',
              en: 'In **CSRF** a foreign site makes the victim’s browser send a request to your site, and the browser attaches the session cookie by itself. The defense is a cookie with `SameSite=Lax` or `Strict` plus a CSRF token in state-changing requests: the foreign site doesn’t know it. In **clickjacking** your page is embedded invisibly in a frame and placed under the user’s click. CSP `frame-ancestors` forbids embedding: `\'none\'` — nobody, `\'self\'` — your own site only. The older equivalent is `X-Frame-Options: DENY`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'csrf-token',
              prompt: {
                ru: 'Почему CSRF-токен защищает от подделки запроса?',
                en: 'Why does a CSRF token protect against request forgery?',
              },
              options: [
                { text: { ru: 'Он шифрует cookie сессии', en: 'It encrypts the session cookie' } },
                { text: { ru: 'Чужой сайт не может его прочитать и подставить в запрос', en: 'A foreign site can’t read it and put it into the request' } },
                { text: { ru: 'Он запрещает JavaScript на странице', en: 'It disables JavaScript on the page' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Cookie браузер приложит сам, а токен нужно вписать в запрос явно — его знает только ваша страница.',
                en: 'The browser attaches the cookie by itself, but the token must be put into the request explicitly — only your page knows it.',
              },
            },
          },
        ],
        test: ['web-security-001', 'web-clickjacking-001'],
      },
    ],
    keyPoints: [
      { ru: 'Origin = схема + хост + порт.', en: 'Origin = scheme + host + port.' },
      { ru: 'CORS проверяет браузер, а не сервер.', en: 'CORS is enforced by the browser, not the server.' },
      { ru: 'Экранировать при выводе, HTML — через санитайзер.', en: 'Escape on output; HTML goes through a sanitizer.' },
      { ru: 'CSP ограничивает источники, SRI — содержимое.', en: 'CSP restricts sources; SRI pins contents.' },
      { ru: 'CSRF — `SameSite` + токен, фреймы — `frame-ancestors`.', en: 'CSRF — `SameSite` + a token; frames — `frame-ancestors`.' },
    ],
    sources: [
      { title: 'MDN — Same-origin policy', url: `${MDN}/Web/Security/Same-origin_policy` },
      { title: 'OWASP — XSS Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html' },
      { title: 'MDN — Content Security Policy', url: `${MDN}/Web/HTTP/Guides/CSP` },
      { title: 'MDN — Subresource Integrity', url: `${MDN}/Web/Security/Subresource_Integrity` },
    ],
  },  {
    tag: 'performance',
    format: 'steps',
    summary: {
      ru: 'Как измерять скорость и что улучшать в первую очередь: Core Web Vitals, загрузка главной картинки, отзывчивость главного потока, частые события и длинные списки.',
      en: 'How to measure speed and what to improve first: Core Web Vitals, loading the hero image, main-thread responsiveness, frequent events and long lists.',
    },
    steps: [
      {
        id: 'web-vitals',
        title: { ru: 'Core Web Vitals', en: 'Core Web Vitals' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Опыт пользователя Google оценивает тремя метриками. **LCP** — когда показан крупнейший элемент первого экрана, хорошо до 2,5 с. **INP** — задержка от действия до следующей отрисовки, хорошо до 200 мс. **CLS** — суммарный сдвиг макета, хорошо до 0,1. Lighthouse — лабораторный замер одной загрузки на эмулированном устройстве без кликов: INP он не видит. Реальную картину дают **полевые данные** настоящих пользователей — CrUX, библиотека `web-vitals`.',
              en: 'Google rates user experience with three metrics. **LCP** — when the largest above-the-fold element appears, good is under 2.5 s. **INP** — the delay from an action to the next paint, good is under 200 ms. **CLS** — total layout shift, good is under 0.1. Lighthouse is a lab test of one load on an emulated device with no clicks: it can’t see INP. The real picture comes from **field data** of actual users — CrUX, the `web-vitals` library.',
            },
          },
        ],
        test: ['web-perf-001', 'web-perf-lab-field-001'],
      },
      {
        id: 'lcp-images',
        title: { ru: 'Главная картинка', en: 'The hero image' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Часто LCP-элемент — большая картинка. `loading="lazy"` ей вредит: ленивая картинка начинает грузиться, только когда браузер построит раскладку и поймёт, что она видна. Её, наоборот, поднимают в приоритете — `fetchpriority="high"` или `preload`, а ленивыми делают картинки ниже первого экрана. Важен и размер файла: `srcset` перечисляет варианты с их шириной, `sizes` — сколько места картинка займёт, и браузер выберет наименьший подходящий файл.',
              en: 'The LCP element is often a big image. `loading="lazy"` hurts it: a lazy image starts loading only once the browser has built the layout and sees it’s visible. Instead it gets a priority boost — `fetchpriority="high"` or `preload`, while images below the fold are made lazy. File size matters too: `srcset` lists variants with their widths, `sizes` says how much room the image takes, and the browser picks the smallest suitable file.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<img src="hero-1200.avif"\n  srcset="hero-600.avif 600w,\n          hero-1200.avif 1200w"\n  sizes="100vw" fetchpriority="high"\n  alt="Team at work">',
            },
          },
        ],
        test: ['web-perf-lcp-lazy-001', 'web-perf-srcset-001'],
      },
      {
        id: 'main-thread',
        title: { ru: 'Главный поток', en: 'The main thread' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'JavaScript, раскладка и отрисовка делят один главный поток. Пока обработчик клика синхронно работает полсекунды, браузер не может показать отклик — INP плохой. Помогает дробление: сначала обновить интерфейс, а тяжёлую работу разбить на части и между ними отдавать управление (`scheduler.yield()`, `setTimeout`). Слово `async` само не делает синхронный код неблокирующим. Долгие вычисления выносят в **Web Worker** — отдельный поток без доступа к DOM, общение через `postMessage`.',
              en: 'JavaScript, layout and painting share one main thread. While a click handler runs synchronously for half a second, the browser can’t show a response — INP is poor. Chunking helps: update the UI first, then split heavy work into parts and yield between them (`scheduler.yield()`, `setTimeout`). The `async` keyword alone doesn’t make synchronous code non-blocking. Long computations move to a **Web Worker** — a separate thread with no DOM access, talking via `postMessage`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const worker = new Worker(\'/parse.js\');\nworker.postMessage(file);\nworker.onmessage = (event) => {\n  showTable(event.data);\n};',
            },
          },
        ],
        test: ['web-perf-inp-001', 'web-perf-worker-001'],
      },
      {
        id: 'events-lists',
        title: { ru: 'Частые события и длинные списки', en: 'Frequent events and long lists' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Debounce** откладывает вызов, пока поток событий не затихнет: каждое новое событие сбрасывает таймер. Он подходит для поиска — один запрос, когда пользователь закончил печатать. **Throttle** вызывает функцию не чаще раза в N мс, пока события идут: прокрутка, ресайз, перетаскивание. А если тормозит огромная таблица, главная цена — тысячи узлов в DOM. **Виртуализация** держит в DOM только видимые строки с небольшим запасом и подменяет их при прокрутке.',
              en: '**Debounce** delays a call until the stream of events goes quiet: each new event resets the timer. It suits search — one request once the user stops typing. **Throttle** calls the function at most once every N ms while events keep coming: scrolling, resizing, dragging. And if a huge table is slow, the main cost is thousands of DOM nodes. **Virtualization** keeps only the visible rows plus a small buffer in the DOM and swaps them as you scroll.',
            },
          },
          { type: 'illustration', illustration: 'web-debounce-throttle' },
          {
            type: 'check',
            check: {
              id: 'debounce-stream',
              prompt: {
                ru: 'События идут каждые 100 мс десять секунд подряд. Сколько раз сработает `debounce(fn, 300)`?',
                en: 'Events fire every 100 ms for ten seconds straight. How many times does `debounce(fn, 300)` fire?',
              },
              options: [
                { text: { ru: 'Сто раз', en: 'A hundred times' } },
                { text: { ru: 'Один раз — через 300 мс после последнего события', en: 'Once — 300 ms after the last event' } },
                { text: { ru: 'Раз в 300 мс, всего около 33', en: 'Once per 300 ms, about 33 in total' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Пауза между событиями меньше 300 мс, поэтому таймер всё время сбрасывается. Раз в 300 мс сработал бы throttle.',
                en: 'The gap between events is under 300 ms, so the timer keeps resetting. Firing once per 300 ms is what throttle would do.',
              },
            },
          },
        ],
        test: ['web-perf-debounce-001', 'web-perf-virtualization-001'],
      },
    ],
    keyPoints: [
      { ru: 'LCP ≤ 2,5 с, INP ≤ 200 мс, CLS ≤ 0,1.', en: 'LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.' },
      { ru: 'Lighthouse — лаборатория, правду говорят полевые данные.', en: 'Lighthouse is a lab; field data tells the truth.' },
      { ru: 'LCP-картинка не ленивая; `srcset` — под размер экрана.', en: 'The LCP image isn’t lazy; `srcset` fits the screen.' },
      { ru: 'Долгие задачи — дробить или в Web Worker.', en: 'Long tasks get chunked or moved to a Web Worker.' },
      { ru: 'Поиск — debounce, прокрутка — throttle, списки — виртуализация.', en: 'Search — debounce, scroll — throttle, lists — virtualization.' },
    ],
    sources: [
      { title: 'web.dev — Web Vitals', url: 'https://web.dev/articles/vitals' },
      { title: 'web.dev — Optimize LCP', url: 'https://web.dev/articles/optimize-lcp' },
      { title: 'web.dev — Optimize INP', url: 'https://web.dev/articles/optimize-inp' },
      { title: 'MDN — Responsive images', url: `${MDN}/Web/HTML/Guides/Responsive_images` },
    ],
  },  {
    tag: 'tooling',
    format: 'steps',
    summary: {
      ru: 'Инструменты вокруг кода: `package.json` и lock-файл, защита от подменённых зависимостей, сборщик с tree shaking и переменными окружения, source maps для отладки продакшена.',
      en: 'The tools around the code: `package.json` and the lock file, protection against tampered dependencies, a bundler with tree shaking and environment variables, source maps for debugging production.',
    },
    steps: [
      {
        id: 'package-json',
        title: { ru: 'package.json', en: 'package.json' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`dependencies` нужны коду во время работы: при установке пакета они ставятся вместе с ним. `devDependencies` — инструменты разработки: линтер, тесты, сборщик, типы; пользователи библиотеки их не получат. `scripts` — команды проекта: `npm run build`, `npm test`. Версии обычно задают диапазонами: `^1.2.0` разрешает любые `1.x.x` не ниже `1.2.0`, а `~1.2.0` — только патчи `1.2.x`.',
              en: '`dependencies` are needed by the code at runtime: installing the package installs them too. `devDependencies` are development tools: linter, tests, bundler, types; library users won’t get them. `scripts` are project commands: `npm run build`, `npm test`. Versions are usually ranges: `^1.2.0` allows any `1.x.x` from `1.2.0` up, while `~1.2.0` allows only `1.2.x` patches.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'tilde-range',
              prompt: {
                ru: 'Какие версии разрешает диапазон `~2.4.1`?',
                en: 'Which versions does the range `~2.4.1` allow?',
              },
              options: [
                { text: { ru: 'От `2.4.1` до любой `2.4.x`', en: 'From `2.4.1` up to any `2.4.x`' } },
                { text: { ru: 'Любые `2.x.x`', en: 'Any `2.x.x`' } },
                { text: { ru: 'Только `2.4.1`', en: 'Only `2.4.1`' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Тильда разрешает только патчи. Любые `2.x.x` не ниже `2.4.1` дал бы `^2.4.1`.',
                en: 'A tilde allows patches only. Any `2.x.x` from `2.4.1` up is what `^2.4.1` would allow.',
              },
            },
          },
        ],
        test: ['web-tooling-004'],
      },
      {
        id: 'lock-file',
        title: { ru: 'Lock-файл и цепочка поставок', en: 'Lock file and supply chain' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Из-за диапазонов две установки в разные дни могут получить разные версии — «у меня работает». Lock-файл (`package-lock.json`) фиксирует точные версии и хеши всего дерева, включая зависимости зависимостей. Его коммитят, а в CI ставят через `npm ci`: строго по lock-файлу, с падением при расхождении с `package.json`. Это защищает и от **атаки на цепочку поставок**: скомпрометированная новая версия пакета сама в сборку не попадёт. Обновляют осознанно, с ревью и `npm audit`.',
              en: 'Because of ranges, two installs on different days may get different versions — “works on my machine”. The lock file (`package-lock.json`) pins exact versions and hashes of the whole tree, dependencies of dependencies included. It’s committed, and CI installs with `npm ci`: strictly from the lock file, failing if it doesn’t match `package.json`. This also guards against a **supply-chain attack**: a compromised new package version won’t slip into the build. Updates are deliberate, with review and `npm audit`.',
            },
          },
        ],
        test: ['web-tooling-002'],
      },
      {
        id: 'bundler',
        title: { ru: 'Сборщик', en: 'The bundler' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Сборщик — Vite, webpack, esbuild — собирает модули в бандлы и выкидывает лишнее. **Tree shaking** удаляет неиспользуемые экспорты, только если граф зависимостей известен статически: это гарантируют ES-модули с `import`/`export`, а с `require` анализ ненадёжен. Флаг `"sideEffects": false` разрешает удалять модули целиком. Переменные с префиксом `VITE_` (в Next.js — `NEXT_PUBLIC_`) сборщик вписывает прямо в клиентский код: их увидит любой, секретам там не место.',
              en: 'A bundler — Vite, webpack, esbuild — combines modules into bundles and drops what’s unused. **Tree shaking** removes unused exports only if the dependency graph is known statically: ES modules with `import`/`export` guarantee that, while with `require` analysis is unreliable. The `"sideEffects": false` flag allows dropping whole modules. Variables prefixed `VITE_` (`NEXT_PUBLIC_` in Next.js) are written straight into client code: anyone can see them, so no secrets there.',
            },
          },
        ],
        test: ['web-tooling-001', 'web-deploy-002'],
      },
      {
        id: 'source-maps',
        title: { ru: 'Source maps', en: 'Source maps' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В продакшене код минифицирован и склеен, и позиция ошибки вроде `main.js:1:90412` ничего не говорит. **Source map** — файл соответствий «позиция в бандле → файл и строка в исходниках». DevTools подхватывает его сам, а сервисы мониторинга вроде Sentry показывают по нему понятный стек. Карты часто загружают только в мониторинг и не публикуют, чтобы не раскрывать исходники: режим `hidden` создаёт их без ссылки в бандле.',
              en: 'In production code is minified and concatenated, and an error position like `main.js:1:90412` tells you nothing. A **source map** is a mapping file “bundle position → source file and line”. DevTools picks it up automatically, and monitoring services like Sentry use it to show a readable stack. Maps are often uploaded only to monitoring and not published, to keep sources private: the `hidden` mode generates them without a reference in the bundle.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: '// vite.config.js\nexport default {\n  build: { sourcemap: \'hidden\' },\n};',
            },
          },
        ],
        test: ['web-tooling-003'],
      },
    ],
    keyPoints: [
      { ru: 'Инструменты — в `devDependencies`.', en: 'Tools go in `devDependencies`.' },
      { ru: 'Lock-файл — в git, в CI — `npm ci`.', en: 'The lock file goes in git; CI uses `npm ci`.' },
      { ru: 'Tree shaking работает с ES-модулями.', en: 'Tree shaking works with ES modules.' },
      { ru: '`VITE_*` и `NEXT_PUBLIC_*` видны всем.', en: '`VITE_*` and `NEXT_PUBLIC_*` are visible to everyone.' },
      { ru: 'Source maps — в мониторинг, не обязательно на сайт.', en: 'Source maps go to monitoring, not necessarily the site.' },
    ],
    sources: [
      { title: 'npm — package.json', url: 'https://docs.npmjs.com/cli/v10/configuring-npm/package-json' },
      { title: 'npm — npm ci', url: 'https://docs.npmjs.com/cli/v10/commands/npm-ci' },
      { title: 'MDN — Tree shaking', url: `${MDN}/Glossary/Tree_shaking` },
      { title: 'Vite — Env variables and modes', url: 'https://vite.dev/guide/env-and-mode' },
    ],
  },  {
    tag: 'git',
    format: 'steps',
    summary: {
      ru: 'Git в командной работе: понятные коммиты, синхронизация с сервером, merge, rebase и конфликты, безопасная отмена и отложенные изменения.',
      en: 'Git in a team: clear commits, syncing with the server, merge, rebase and conflicts, safe undo and shelving changes.',
    },
    steps: [
      {
        id: 'commits',
        title: { ru: 'Коммиты', en: 'Commits' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Коммит — снимок проекта с сообщением, которое объясняет, **что** и **зачем** изменилось. Многие команды пишут по **Conventional Commits**: `тип(область): описание`. Тип — характер изменения: `feat` — новая возможность, `fix` — исправление, а ещё `refactor`, `docs`, `test`, `chore`. По типам инструменты собирают changelog и поднимают версию по semver: `fix` — патч, `feat` — минор, `BREAKING CHANGE` — мажор. Один коммит — одно логическое изменение.',
              en: 'A commit is a snapshot of the project with a message explaining **what** changed and **why**. Many teams follow **Conventional Commits**: `type(scope): description`. The type is the kind of change: `feat` is a new feature, `fix` a bug fix, plus `refactor`, `docs`, `test`, `chore`. Tools build the changelog and bump semver from the types: `fix` → patch, `feat` → minor, `BREAKING CHANGE` → major. One commit is one logical change.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git commit -m "feat(cart): promo codes"',
            },
          },
        ],
        test: ['web-git-006'],
      },
      {
        id: 'remote',
        title: { ru: 'fetch, pull и push', en: 'fetch, pull and push' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Локальный репозиторий хранит копии удалённых веток — `origin/main`, и они обновляются только при обмене с сервером. `git fetch` скачивает новые коммиты и сдвигает `origin/main`, но вашу ветку и рабочую папку не трогает — можно спокойно посмотреть, что пришло. `git pull` — это `fetch` плюс слияние или rebase в текущую ветку. `git push` отправляет ваши коммиты; если на сервере есть чужие, которых у вас нет, он откажет — сначала заберите их.',
              en: 'A local repository keeps copies of remote branches — `origin/main` — and they update only when you sync with the server. `git fetch` downloads new commits and moves `origin/main` but leaves your branch and working tree alone — you can look at what arrived in peace. `git pull` is `fetch` plus a merge or rebase into the current branch. `git push` sends your commits; if the server has commits you don’t, it refuses — fetch them first.',
            },
          },
          { type: 'diagram', diagram: 'git-remote-sync' },
        ],
        test: ['web-git-004'],
      },
      {
        id: 'merge-rebase',
        title: { ru: 'Merge, rebase и конфликты', en: 'Merge, rebase and conflicts' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`merge` объединяет ветки, ничего не переписывая, и фиксирует слияние отдельным коммитом. `rebase` переигрывает ваши коммиты поверх другой ветки: получаются **новые** коммиты с другими хешами и прямая история. Если обе ветки изменили одни и те же строки, возникает **конфликт**: Git вставляет обе версии между маркерами `<<<<<<<`, `=======` и `>>>>>>>`. Оставьте нужный код, удалите маркеры, сделайте `git add` — и завершите слияние.',
              en: '`merge` combines branches without rewriting anything and records the merge as a separate commit. `rebase` replays your commits on top of another branch: you get **new** commits with different hashes and a linear history. If both branches changed the same lines, there’s a **conflict**: Git writes both versions between the `<<<<<<<`, `=======` and `>>>>>>>` markers. Keep the right code, delete the markers, run `git add` — and finish the merge.',
            },
          },
          { type: 'illustration', illustration: 'git-rebase-replay' },
          {
            type: 'check',
            check: {
              id: 'rebase-shared',
              prompt: {
                ru: 'Можно ли делать rebase ветки, которую уже забрали коллеги?',
                en: 'Is it OK to rebase a branch your teammates have already pulled?',
              },
              options: [
                { text: { ru: 'Да, это безопасно', en: 'Yes, it’s safe' } },
                { text: { ru: 'Нет: rebase создаёт новые коммиты, и история у коллег разойдётся с вашей', en: 'No: rebase creates new commits, and teammates’ history will diverge from yours' } },
                { text: { ru: 'Да, если потом сделать `git pull`', en: 'Yes, if you run `git pull` afterwards' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Опубликованную историю не переписывают. Rebase — для своих ещё не отправленных коммитов.',
                en: 'Published history isn’t rewritten. Rebase is for your own commits that haven’t been pushed yet.',
              },
            },
          },
        ],
        test: ['web-git-001', 'web-git-005'],
      },
      {
        id: 'undo',
        title: { ru: 'Отмена и отложенные изменения', en: 'Undoing and shelving changes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Коммит уже в общей ветке — отменяйте его через `git revert`: он создаёт **новый** коммит с обратными изменениями, история не переписывается, и у коллег ничего не ломается. `git reset --hard` с `push --force` переписывает общую историю — так можно только в своей ветке. Незаконченную работу, которую рано коммитить, откладывают: `git stash` убирает изменения в отдельный стек и очищает рабочую папку, `git stash pop` возвращает их. Новые файлы прячет `git stash -u`.',
              en: 'If a commit is already in a shared branch, undo it with `git revert`: it creates a **new** commit with the reverse changes, history isn’t rewritten, and nothing breaks for teammates. `git reset --hard` with `push --force` rewrites shared history — only OK in your own branch. Unfinished work that’s too early to commit gets shelved: `git stash` moves changes onto a separate stack and cleans the working tree, `git stash pop` brings them back. New files are stashed with `git stash -u`.',
            },
          },
        ],
        test: ['web-git-002'],
      },
    ],
    keyPoints: [
      { ru: '`тип(область): описание` — Conventional Commits.', en: '`type(scope): description` — Conventional Commits.' },
      { ru: '`fetch` только скачивает, `pull` ещё и вливает.', en: '`fetch` only downloads; `pull` also integrates.' },
      { ru: 'Конфликт: выбрать код, убрать маркеры, `git add`.', en: 'Conflict: pick the code, remove markers, `git add`.' },
      { ru: 'Общую историю не переписывают: `revert`, а не `reset`.', en: 'Shared history isn’t rewritten: `revert`, not `reset`.' },
      { ru: '`stash` откладывает незаконченное.', en: '`stash` shelves unfinished work.' },
    ],
    sources: [
      { title: 'Conventional Commits', url: 'https://www.conventionalcommits.org/en/v1.0.0/' },
      { title: 'Git — git-fetch', url: 'https://git-scm.com/docs/git-fetch' },
      { title: 'Git — Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
      { title: 'Git — git-revert', url: 'https://git-scm.com/docs/git-revert' },
      { title: 'Git — git-stash', url: 'https://git-scm.com/docs/git-stash' },
    ],
  },  {
    tag: 'deploy',
    format: 'steps',
    summary: {
      ru: 'Как фронтенд попадает к пользователям: хостинг SPA, кэширование статики по хэшам, Docker-образ, preview-деплои и быстрый откат.',
      en: 'How a frontend reaches users: hosting an SPA, caching hashed static files, a Docker image, preview deploys and fast rollbacks.',
    },
    steps: [
      {
        id: 'spa-hosting',
        title: { ru: 'Хостинг SPA', en: 'Hosting an SPA' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Одностраничное приложение меняет URL через History API без запросов к серверу. Но при обновлении страницы или переходе по прямой ссылке браузер запросит этот путь у сервера, а файла с таким именем нет — будет `404`. Поэтому сервер настраивают отдавать `index.html` на все неизвестные пути, и маршрут разбирает клиентский роутер. Настоящие файлы — скрипты, стили, картинки — сервер отдаёт как обычно.',
              en: 'A single-page app changes the URL via the History API without server requests. But on reload or when following a direct link, the browser asks the server for that path, and there’s no such file — a `404`. So the server is set up to return `index.html` for every unknown path, and the client-side router handles the route. Real files — scripts, styles, images — are served as usual.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'text',
              source: 'location / {\n  try_files $uri $uri/ /index.html;\n}',
            },
          },
        ],
        test: ['web-deploy-001'],
      },
      {
        id: 'hashed-assets',
        title: { ru: 'Статика с хэшами', en: 'Hashed static files' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Сборщик добавляет в имя файла хэш содержимого: `main.a41c9e.js`. Изменился код — изменилось имя. Поэтому такие файлы кэшируют практически навсегда (`max-age=31536000, immutable`): под этим именем содержимое не изменится, а новая версия придёт под новым. `index.html`, наоборот, отдают с `no-cache` — хранить можно, но каждый раз перепроверять: именно он ссылается на актуальные имена. Без хэшей пришлось бы выбирать между долгим кэшем и свежим кодом.',
              en: 'The bundler adds a content hash to the file name: `main.a41c9e.js`. Change the code and the name changes. So such files are cached practically forever (`max-age=31536000, immutable`): the content under that name never changes, and a new version arrives under a new one. `index.html`, on the contrary, is served with `no-cache` — it may be stored but must be revalidated every time: it’s the file that references the current names. Without hashes you’d have to choose between a long cache and fresh code.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'html-cached-year',
              prompt: {
                ru: 'Что будет, если отдать `index.html` с кэшем на год?',
                en: 'What happens if `index.html` is cached for a year?',
              },
              options: [
                { text: { ru: 'Ничего страшного: файлы с хэшем всё равно обновятся', en: 'Nothing bad: hashed files will update anyway' } },
                { text: { ru: 'Пользователи будут получать старую версию, пока кэш не очистится', en: 'Users will keep getting the old version until the cache is cleared' } },
                { text: { ru: 'Сайт перестанет открываться офлайн', en: 'The site will stop working offline' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Старый `index.html` ссылается на старые имена файлов, и новый код до пользователя не дойдёт.',
                en: 'The old `index.html` references the old file names, so the new code never reaches the user.',
              },
            },
          },
        ],
        test: ['web-asset-hash-001'],
      },
      {
        id: 'docker',
        title: { ru: 'Docker-образ', en: 'Docker image' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Фронтенд часто поставляют Docker-образом. **Многоэтапная сборка** делит работу: первый этап на образе с Node.js ставит зависимости и собирает проект, второй начинается с чистого nginx и забирает из первого только папку со статикой. В итоговый образ не попадают `node_modules`, исходники и компилятор — он весит десятки мегабайт вместо гигабайта, быстрее скачивается и даёт меньше поверхности для атак.',
              en: 'A frontend is often shipped as a Docker image. A **multi-stage build** splits the work: the first stage, on a Node.js image, installs dependencies and builds the project; the second starts from a clean nginx and takes only the static folder from the first. `node_modules`, sources and the compiler stay out of the final image — it weighs tens of megabytes instead of a gigabyte, downloads faster and offers less attack surface.',
            },
          },
        ],
        test: ['web-deploy-003'],
      },
      {
        id: 'release',
        title: { ru: 'Выкладка и откат', en: 'Release and rollback' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Preview-деплой** — отдельная временная версия сайта на каждый пулреквест со своим адресом: ревьюер и тестировщик смотрят изменения в настоящем браузере до слияния, там же гоняют e2e-тесты. В продакшен выкладывают **атомарно**: новая сборка загружается рядом со старой целиком, затем трафик переключается одним действием. Откат — такое же переключение назад, за секунды. Копирование поверх старых файлов даёт смесь версий: старый `index.html` сошлётся на удалённые чанки.',
              en: 'A **preview deploy** is a separate temporary site version for each pull request at its own URL: reviewers and QA check the changes in a real browser before merging, and e2e tests run there too. Production releases are **atomic**: the new build is uploaded whole next to the old one, then traffic switches in one step. A rollback is the same switch back, in seconds. Copying over old files produces a mix of versions: an old `index.html` will reference deleted chunks.',
            },
          },
          { type: 'diagram', diagram: 'web-atomic-deploy' },
        ],
        test: ['web-deploy-004', 'web-deploy-006'],
      },
    ],
    keyPoints: [
      { ru: 'SPA: неизвестный путь → `index.html`.', en: 'SPA: unknown path → `index.html`.' },
      { ru: 'Файлы с хэшем — `immutable`, `index.html` — `no-cache`.', en: 'Hashed files are `immutable`; `index.html` is `no-cache`.' },
      { ru: 'Многоэтапный Docker: собрать в Node, отдать из nginx.', en: 'Multi-stage Docker: build in Node, serve from nginx.' },
      { ru: 'Preview на каждый PR, выкладка и откат — переключением.', en: 'A preview per PR; release and rollback by switching.' },
    ],
    sources: [
      { title: 'Vite — Deploying a static site', url: 'https://vite.dev/guide/static-deploy' },
      { title: 'MDN — Cache-Control', url: `${MDN}/Web/HTTP/Reference/Headers/Cache-Control` },
      { title: 'Docker — Multi-stage builds', url: 'https://docs.docker.com/build/building/multi-stage/' },
      { title: 'Netlify — Deploy Previews', url: 'https://docs.netlify.com/site-deploys/deploy-previews/' },
    ],
  },
];
