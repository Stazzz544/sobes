import type { Question } from '../model/types';

export const WEB_QUESTIONS: Question[] = [
  {
    id: 'web-cache-control-001',
    topic: 'web',
    tags: ['http', 'caching'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что означает заголовок ответа `Cache-Control: no-cache`?',
      en: 'What does the `Cache-Control: no-cache` response header mean?',
    },
    options: [
      {
        text: {
          ru: 'Ответ запрещено сохранять в любом кэше',
          en: 'The response must not be stored in any cache',
        },
      },
      {
        text: {
          ru: 'Ответ можно сохранить, но перед каждым использованием его нужно перепроверить на сервере',
          en: 'The response may be stored, but must be revalidated with the server before every reuse',
        },
      },
      {
        text: {
          ru: 'Ответ можно хранить только в браузере, но не в CDN',
          en: 'The response may only be stored by the browser, not by a CDN',
        },
      },
      {
        text: {
          ru: 'Браузер должен игнорировать `ETag` и `Last-Modified`',
          en: 'The browser must ignore `ETag` and `Last-Modified`',
        },
      },
      {
        text: {
          ru: 'Ответ живёт в кэше 0 секунд и сразу удаляется',
          en: 'The response lives in the cache for 0 seconds and is deleted right away',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Название обманчиво: `no-cache` **разрешает** хранить ответ, но требует ревалидации перед каждым использованием. Браузер отправит условный запрос с `If-None-Match` / `If-Modified-Since`, и если ресурс не изменился, сервер ответит `304 Not Modified` без тела.',
          en: 'The name is misleading: `no-cache` **allows** storing the response but requires revalidation before every reuse. The browser sends a conditional request with `If-None-Match` / `If-Modified-Since`, and if nothing changed the server replies `304 Not Modified` with no body.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Запрет на хранение — это `no-store`. Только браузерный кэш — `private`.',
          en: 'Forbidding storage is `no-store`. Browser-only caching is `private`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'http',
          source: `Cache-Control: no-cache   # храни, но проверяй / store, but revalidate
Cache-Control: no-store   # не храни вообще / never store
Cache-Control: private    # только браузер / browser only`,
        },
      },
      { type: 'diagram', diagram: 'http-revalidation' },
    ],
    sources: [
      {
        title: 'MDN — Cache-Control',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control',
      },
      { title: 'RFC 9111 — HTTP Caching', url: 'https://www.rfc-editor.org/rfc/rfc9111#name-no-cache-2' },
    ],
  },
  {
    id: 'web-cors-preflight-001',
    topic: 'web',
    tags: ['security', 'http'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Когда браузер отправляет preflight-запрос `OPTIONS`?',
      en: 'When does the browser send a preflight `OPTIONS` request?',
    },
    options: [
      {
        text: {
          ru: 'Перед любым запросом на другой origin, включая простой `GET` без заголовков',
          en: 'Before any request to another origin, including a plain `GET` with no headers',
        },
      },
      {
        text: {
          ru: 'Перед каждым запросом, даже на тот же origin',
          en: 'Before every request, even to the same origin',
        },
      },
      {
        text: {
          ru: 'Только после того, как сервер вернул `401`',
          en: 'Only after the server has returned `401`',
        },
      },
      {
        text: {
          ru: 'Его отправляет сервер браузеру, чтобы проверить cookies',
          en: 'The server sends it to the browser to check cookies',
        },
      },
      {
        text: {
          ru: 'Перед кросс-доменным запросом, который не является «простым», например с методом `PUT` или `Content-Type: application/json`',
          en: 'Before a cross-origin request that isn’t “simple”, e.g. with the `PUT` method or `Content-Type: application/json`',
        },
      },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '«Простые» запросы (`GET`, `HEAD`, `POST` только с безопасными заголовками и `Content-Type` из списка: `text/plain`, `multipart/form-data`, `application/x-www-form-urlencoded`) уходят сразу.',
          en: '“Simple” requests (`GET`, `HEAD`, `POST` with only safelisted headers and a `Content-Type` of `text/plain`, `multipart/form-data` or `application/x-www-form-urlencoded`) are sent directly.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Для остальных браузер сначала спрашивает сервер `OPTIONS`-запросом с `Access-Control-Request-Method` и `Access-Control-Request-Headers`. Основной запрос уйдёт, только если ответ разрешит метод, заголовки и [[origin|origin]].',
          en: 'For anything else the browser first asks the server with an `OPTIONS` request carrying `Access-Control-Request-Method` and `Access-Control-Request-Headers`. The actual request is sent only if the response allows the method, headers and [[origin|origin]].',
        },
      },
    ],
    sources: [
      {
        title: 'MDN — Cross-Origin Resource Sharing (CORS)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS',
      },
      {
        title: 'MDN — Preflight request',
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request',
      },
    ],
  },
  {
    id: 'web-css-cascade-001',
    topic: 'web',
    tags: ['css'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Каким цветом будет текст параграфа?',
      en: 'What color will the paragraph text be?',
    },
    code: {
      lang: 'html',
      source: `<style>
  #intro { color: red; }
  .text.text.text { color: green; }
  p { color: blue !important; }
</style>

<p id="intro" class="text">Hello</p>`,
    },
    options: [
      { text: { ru: 'Красным', en: 'Red' } },
      { text: { ru: 'Зелёным', en: 'Green' } },
      { text: { ru: 'Синим', en: 'Blue' } },
      { text: { ru: 'Чёрным (цвет по умолчанию)', en: 'Black (the default color)' } },
      { text: { ru: 'Зависит от порядка подключения стилей', en: 'It depends on stylesheet order' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каскад сначала смотрит на важность, и только потом на специфичность. Объявление с `!important` побеждает обычные объявления того же источника, какой бы высокой ни была их специфичность.',
          en: 'The cascade looks at importance before specificity. A declaration with `!important` beats normal declarations from the same origin, however specific they are.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Без `!important` выиграл бы `#intro`: специфичность ID `(1, 0, 0)` выше, чем у трёх классов `(0, 3, 0)`. Порядок правил важен, только когда важность и специфичность равны.',
          en: 'Without `!important`, `#intro` would win: an ID’s specificity `(1, 0, 0)` beats three classes `(0, 3, 0)`. Source order only matters when importance and specificity are equal.',
        },
      },
    ],
    sources: [
      {
        title: 'MDN — Introduction to the CSS cascade',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade',
      },
      {
        title: 'MDN — Specificity',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity',
      },
    ],
  },
  {
    id: 'web-xss-001',
    topic: 'web',
    tags: ['security'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какая мера напрямую защищает от XSS, когда на страницу выводится пользовательский ввод?',
      en: 'Which measure directly protects against XSS when user input is rendered on a page?',
    },
    options: [
      { text: { ru: 'Перевести сайт на HTTPS', en: 'Move the site to HTTPS' } },
      { text: { ru: 'Добавить CSRF-токен во все формы', en: 'Add a CSRF token to every form' } },
      {
        text: {
          ru: 'Разрешить CORS только для своего домена',
          en: 'Allow CORS only for your own domain',
        },
      },
      {
        text: {
          ru: 'Экранировать данные при выводе — например, вставлять их через `textContent`, а не `innerHTML`',
          en: 'Encode data on output — for example, insert it with `textContent` instead of `innerHTML`',
        },
      },
      {
        text: {
          ru: 'Хранить токен сессии в `localStorage` вместо cookies',
          en: 'Store the session token in `localStorage` instead of cookies',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[xss|XSS]] возникает, когда ввод пользователя попадает в страницу как исполняемый код. Главная защита — контекстное экранирование при выводе: `textContent`, автоэкранирование в шаблонизаторах и фреймворках. React экранирует текст в JSX, пока вы не используете `dangerouslySetInnerHTML`.',
          en: '[[xss|XSS]] happens when user input ends up in the page as executable code. The main defense is context-aware output encoding: `textContent`, auto-escaping in template engines and frameworks. React escapes text in JSX unless you use `dangerouslySetInnerHTML`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `comment.innerHTML = userInput;   // опасно / dangerous
comment.textContent = userInput; // безопасно / safe`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Content-Security-Policy и `HttpOnly`-cookies — полезная вторая линия обороны. HTTPS, [[csrf|CSRF]]-токены и [[cors|CORS]] решают другие задачи, а токен в `localStorage` XSS как раз легко украдёт.',
          en: 'Content-Security-Policy and `HttpOnly` cookies are a useful second line of defense. HTTPS, [[csrf|CSRF]] tokens and [[cors|CORS]] solve different problems, and a token in `localStorage` is exactly what XSS can steal.',
        },
      },
    ],
    sources: [
      {
        title: 'OWASP — Cross Site Scripting Prevention Cheat Sheet',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
      },
      {
        title: 'MDN — Cross-site scripting (XSS)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS',
      },
    ],
  },
  {
    id: 'web-asset-hash-001',
    topic: 'web',
    tags: ['deploy', 'caching', 'tooling'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Зачем сборщики добавляют хэш содержимого в имена файлов (`app.3f9a2c.js`)?',
      en: 'Why do bundlers add a content hash to file names (`app.3f9a2c.js`)?',
    },
    options: [
      {
        text: {
          ru: 'Чтобы скрыть код: по хэшу нельзя найти файл',
          en: 'To hide the code: a file can’t be found by its hash',
        },
      },
      {
        text: {
          ru: 'Чтобы движок быстрее парсил JavaScript',
          en: 'So the engine parses JavaScript faster',
        },
      },
      {
        text: {
          ru: 'Чтобы такие файлы можно было кэшировать надолго, а при изменении кода менялось имя и браузер скачивал новую версию',
          en: 'So the files can be cached for a long time, while any code change produces a new name and the browser downloads the new version',
        },
      },
      {
        text: {
          ru: 'Хэш нужен tree shaking, чтобы удалить неиспользуемый код',
          en: 'Tree shaking needs the hash to remove unused code',
        },
      },
      {
        text: {
          ru: 'Чтобы CDN мог сжать файл в gzip',
          en: 'So the CDN can gzip the file',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Файл с хэшем в имени никогда не меняется, поэтому его отдают с долгим кэшем: `Cache-Control: max-age=31536000, immutable`. Изменился код — изменился хэш и URL, и браузер просто скачивает новый файл.',
          en: 'A file with a hash in its name never changes, so it is served with a long cache lifetime: `Cache-Control: max-age=31536000, immutable`. When the code changes, the hash and URL change, and the browser simply downloads the new file.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Сам `index.html` хэш не получает и кэшируется коротко или с `no-cache`, чтобы пользователи быстро получали ссылки на свежие ассеты.',
          en: '`index.html` itself has no hash and is cached briefly or with `no-cache`, so users quickly get links to the fresh assets.',
        },
      },
    ],
    sources: [
      { title: 'web.dev — Versioned URLs', url: 'https://web.dev/articles/http-cache#versioned-urls' },
      { title: 'webpack — Caching', url: 'https://webpack.js.org/guides/caching/' },
    ],
  },
];
