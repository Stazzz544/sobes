import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';
const OWASP = 'https://cheatsheetseries.owasp.org/cheatsheets';

export const WEB_QUESTIONS_7: Question[] = [
  {
    id: 'web-sec-jwt-001',
    kind: 'output',
    topic: 'web',
    tags: ['security'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Токен пришёл с сервера. Что выведет код, запущенный кем угодно без ключа? Впишите ответ.',
      en: 'A token came from the server. What does this code, run by anyone without the key, print? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiIsInJvbGUiOiJhZG1pbiJ9.sig';
const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());

console.log(payload.role);`,
    },
    answers: ['admin'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Полезная нагрузка JWT закодирована в base64url, а **не зашифрована**: прочитать её может любой. Подпись лишь гарантирует, что данные не подделаны, — проверяет её сервер. Поэтому в JWT не кладут секреты и персональные данные, а права пользователя проверяют на сервере.',
          en: 'A JWT payload is base64url-encoded, **not encrypted**: anyone can read it. The signature only guarantees the data wasn’t tampered with — the server verifies it. So don’t put secrets or personal data in a JWT, and check permissions on the server.',
        },
      },
    ],
    sources: [
      { title: 'jwt.io — Introduction to JSON Web Tokens', url: 'https://jwt.io/introduction' },
      { title: 'RFC 7519 — JSON Web Token', url: 'https://datatracker.ietf.org/doc/html/rfc7519' },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'web-sec-token-storage-001',
    topic: 'web',
    tags: ['security', 'storage'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Где безопаснее хранить токен сессии, чтобы XSS-скрипт не смог его украсть?',
      en: 'Where is a session token safest from being stolen by an XSS script?',
    },
    options: [
      { text: { ru: 'В `localStorage`', en: 'In `localStorage`' } },
      { text: { ru: 'В глобальной переменной', en: 'In a global variable' } },
      { text: { ru: 'В cookie с `HttpOnly; Secure; SameSite`', en: 'In a cookie with `HttpOnly; Secure; SameSite`' } },
      { text: { ru: 'В `sessionStorage`', en: 'In `sessionStorage`' } },
      { text: { ru: 'В URL как параметр `?token=`', en: 'In the URL as a `?token=` parameter' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Всё, что доступно из JavaScript (`localStorage`, `sessionStorage`, переменные), внедрённый скрипт прочитает и отправит злоумышленнику. Cookie с `HttpOnly` из JS не читается, `Secure` не уходит по HTTP, `SameSite` снижает риск [[csrf|CSRF]]. Токен в URL попадает в историю, логи и `Referer`.',
          en: 'Anything accessible from JavaScript (`localStorage`, `sessionStorage`, variables) an injected script can read and send to an attacker. An `HttpOnly` cookie can’t be read from JS, `Secure` keeps it off HTTP, and `SameSite` reduces [[csrf|CSRF]] risk. A token in the URL ends up in history, logs and `Referer`.',
        },
      },
    ],
    sources: [
      { title: 'OWASP — HTML5 Security: Local Storage', url: `${OWASP}/HTML5_Security_Cheat_Sheet.html` },
      { title: 'MDN — Set-Cookie', url: `${MDN}/Web/HTTP/Reference/Headers/Set-Cookie` },
    ],
  },
  {
    id: 'web-sec-sanitize-001',
    topic: 'web',
    tags: ['security'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Нужно показать отзыв пользователя с HTML-разметкой через `dangerouslySetInnerHTML`. Как сделать это безопасно?',
      en: 'You need to display a user review with HTML markup via `dangerouslySetInnerHTML`. How do you do it safely?',
    },
    options: [
      { text: { ru: 'React сам экранирует всё, что в `__html`', en: 'React escapes everything in `__html` itself' } },
      {
        text: {
          ru: 'Очистить HTML санитайзером (например, DOMPurify) перед вставкой',
          en: 'Clean the HTML with a sanitizer (e.g. DOMPurify) before inserting it',
        },
      },
      { text: { ru: 'Удалить из строки все теги `<script>` регулярным выражением', en: 'Strip all `<script>` tags with a regex' } },
      { text: { ru: 'Обернуть вставку в `try/catch`', en: 'Wrap the insertion in `try/catch`' } },
      { text: { ru: 'Проверить длину строки', en: 'Check the string length' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`dangerouslySetInnerHTML` вставляет HTML как есть — React его не экранирует, отсюда и название. Скрипт можно внедрить и без `<script>`: `<img src=x onerror=...>`, `javascript:`-ссылки. Регулярные выражения такое не ловят; нужен проверенный санитайзер вроде DOMPurify, а лучше — показывать текст без HTML.',
          en: '`dangerouslySetInnerHTML` inserts HTML as is — React doesn’t escape it, hence the name. Script can be injected without `<script>`: `<img src=x onerror=...>`, `javascript:` links. Regexes miss these; use a proven sanitizer like DOMPurify, or better, render plain text without HTML.',
        },
      },
    ],
    sources: [
      { title: 'React — Dangerously setting the inner HTML', url: 'https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html' },
      { title: 'DOMPurify', url: 'https://github.com/cure53/DOMPurify' },
      { title: 'OWASP — XSS Prevention', url: `${OWASP}/Cross_Site_Scripting_Prevention_Cheat_Sheet.html` },
    ],
  },
  {
    id: 'web-sec-noopener-001',
    topic: 'web',
    tags: ['security', 'html-a11y'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'От чего защищает `rel="noopener"` у ссылки с `target="_blank"`?',
      en: 'What does `rel="noopener"` on a `target="_blank"` link protect against?',
    },
    options: [
      { text: { ru: 'От открытия ссылки в новой вкладке', en: 'From opening the link in a new tab' } },
      {
        text: {
          ru: 'Открытая страница не получает `window.opener` и не может подменить адрес исходной вкладки',
          en: 'The opened page doesn’t get `window.opener` and can’t change the original tab’s location',
        },
      },
      { text: { ru: 'От перехода по HTTP вместо HTTPS', en: 'From navigating over HTTP instead of HTTPS' } },
      { text: { ru: 'От индексации ссылки поисковиками', en: 'From search engines indexing the link' } },
      { text: { ru: 'От загрузки картинок с чужого сайта', en: 'From loading images from another site' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Без `noopener` открытая страница получает ссылку `window.opener` и может выполнить `opener.location = \'https://phishing…\'` — исходная вкладка незаметно сменится на поддельную (tabnabbing). Современные браузеры уже ставят `noopener` для `target="_blank"` по умолчанию, но явный атрибут не помешает.',
          en: 'Without `noopener` the opened page gets a `window.opener` reference and can do `opener.location = \'https://phishing…\'` — the original tab silently switches to a fake (tabnabbing). Modern browsers already apply `noopener` to `target="_blank"` by default, but the explicit attribute doesn’t hurt.',
        },
      },
    ],
    sources: [{ title: 'MDN — rel=noopener', url: `${MDN}/Web/HTML/Reference/Attributes/rel/noopener` }],
  },
  {
    id: 'web-sec-sri-001',
    topic: 'web',
    tags: ['security'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Библиотека подключается с публичного CDN. Как защититься от подмены файла на CDN?',
      en: 'A library is loaded from a public CDN. How do you protect against the file being swapped on the CDN?',
    },
    options: [
      { code: '<script src="https://cdn.example/lib.js" async></script>' },
      { code: '<script src="https://cdn.example/lib.js" integrity="sha384-…" crossorigin="anonymous"></script>' },
      { code: '<script src="https://cdn.example/lib.js" defer></script>' },
      { code: '<script src="https://cdn.example/lib.js" type="module"></script>' },
      { code: '<script src="https://cdn.example/lib.js" nomodule></script>' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Subresource Integrity**: атрибут `integrity` содержит хеш ожидаемого файла. Если содержимое на CDN изменится, хеш не совпадёт, и браузер не выполнит скрипт. Для запросов на другой origin нужен `crossorigin`. `async`, `defer` и `type` влияют только на порядок загрузки.',
          en: '**Subresource Integrity**: the `integrity` attribute holds the hash of the expected file. If the CDN content changes, the hash won’t match and the browser won’t run the script. Cross-origin requests also need `crossorigin`. `async`, `defer` and `type` only affect loading order.',
        },
      },
    ],
    sources: [{ title: 'MDN — Subresource Integrity', url: `${MDN}/Web/Security/Defenses/Subresource_Integrity` }],
  },
  {
    id: 'web-sec-postmessage-001',
    topic: 'web',
    tags: ['security'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Страница принимает сообщения от встроенного виджета через `postMessage`. Что обязательно сделать в обработчике?',
      en: 'A page receives messages from an embedded widget via `postMessage`. What must the handler do?',
    },
    code: { lang: 'js', source: `window.addEventListener('message', (event) => {\n  applySettings(event.data);\n});` },
    options: [
      { text: { ru: 'Ничего: сообщения приходят только от своих фреймов', en: 'Nothing: messages only come from your own frames' } },
      { code: "if (event.origin !== 'https://widget.example') return;" },
      { code: "if (typeof event.data !== 'object') return;" },
      { code: 'event.preventDefault();' },
      { code: 'event.stopPropagation();' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`postMessage` может отправить **любое** окно, у которого есть ссылка на ваше: вкладка-открыватель, чужой фрейм. Поэтому в обработчике первым делом сверяют `event.origin` с ожидаемым, а сами данные дополнительно проверяют, прежде чем использовать. Отправляя, указывают конкретный `targetOrigin`, а не `\'*\'`.',
          en: '`postMessage` can be sent by **any** window holding a reference to yours: an opener tab, a foreign frame. So the handler first checks `event.origin` against the expected one and still validates the data before use. When sending, pass a specific `targetOrigin`, not `\'*\'`.',
        },
      },
    ],
    sources: [{ title: 'MDN — window.postMessage()', url: `${MDN}/Web/API/Window/postMessage` }],
  },
  {
    id: 'web-sec-open-redirect-001',
    kind: 'output',
    topic: 'web',
    tags: ['security'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Сколько адресов пропустит эта проверка параметра `?next=` перед редиректом? Впишите число.',
      en: 'How many URLs does this `?next=` check let through before redirecting? Type the number.',
    },
    code: {
      lang: 'js',
      source: `const isSafeRedirect = (next) => next.startsWith('/') && !next.startsWith('//');
const candidates = ['/profile', '//evil.com', 'https://evil.com', '/\\\\evil.com'];

console.log(candidates.filter(isSafeRedirect).length);`,
    },
    answers: ['2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Проходят `/profile` и `/\\evil.com`. Браузеры по спецификации URL считают `\\` в http(s)-адресах прямым слешем, поэтому `/\\evil.com` превращается в `//evil.com` — переход на чужой сайт (open redirect). Строковые проверки такое пропускают.',
          en: '`/profile` and `/\\evil.com` pass. Per the URL spec, browsers treat `\\` in http(s) URLs as a forward slash, so `/\\evil.com` becomes `//evil.com` — a jump to another site (open redirect). String checks miss this.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const isSafeRedirect = (next) => new URL(next, location.origin).origin === location.origin;`,
        },
        caption: { ru: 'Надёжнее: разобрать адрес и сравнить origin', en: 'More robust: parse the URL and compare origins' },
      },
    ],
    sources: [{ title: 'OWASP — Unvalidated Redirects and Forwards', url: `${OWASP}/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'web-sec-supply-chain-001',
    topic: 'web',
    tags: ['security', 'tooling'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Как в CI защититься от того, что зависимость тихо обновится до скомпрометированной версии?',
      en: 'How do you protect CI from a dependency silently updating to a compromised version?',
    },
    options: [
      { text: { ru: 'Ставить пакеты через `npm install` с `^` в версиях', en: 'Install with `npm install` and `^` ranges' } },
      {
        text: {
          ru: 'Коммитить lock-файл и ставить через `npm ci`, обновления — осознанно, с `npm audit` и ревью',
          en: 'Commit the lockfile, install with `npm ci`, and update deliberately with `npm audit` and review',
        },
      },
      { text: { ru: 'Удалять `node_modules` перед каждой сборкой', en: 'Delete `node_modules` before every build' } },
      { text: { ru: 'Отключить проверки TypeScript', en: 'Disable TypeScript checks' } },
      { text: { ru: 'Устанавливать пакеты только глобально', en: 'Install packages only globally' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Lock-файл фиксирует точные версии и хеши всего дерева зависимостей, а `npm ci` ставит строго по нему и падает при расхождении с `package.json`. Так в сборку не попадёт новая версия, которую опубликовали вчера. Обновляют зависимости отдельно: с `npm audit`, просмотром изменений и тестами.',
          en: 'The lockfile pins exact versions and hashes of the whole dependency tree, and `npm ci` installs strictly from it and fails on mismatch with `package.json`. So a version published yesterday won’t sneak into the build. Update dependencies separately: with `npm audit`, change review and tests.',
        },
      },
    ],
    sources: [
      { title: 'npm — npm ci', url: 'https://docs.npmjs.com/cli/v10/commands/npm-ci' },
      { title: 'OWASP — NPM Security', url: `${OWASP}/NPM_Security_Cheat_Sheet.html` },
    ],
  },
  {
    id: 'web-sec-csp-nonce-001',
    topic: 'web',
    tags: ['security', 'http'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'CSP запрещает инлайн-скрипты, но один нужен для аналитики. Как разрешить только его?',
      en: 'CSP blocks inline scripts, but one is needed for analytics. How do you allow only that one?',
    },
    options: [
      { code: "script-src 'self' 'unsafe-inline'" },
      { code: "script-src 'self' 'nonce-r4nd0m'  +  <script nonce=\"r4nd0m\">" },
      { code: "script-src *" },
      { code: "default-src 'none'" },
      { code: "script-src 'self' 'unsafe-eval'" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Nonce** — случайное значение, которое сервер генерирует заново для каждого ответа и ставит и в заголовок [[csp|CSP]], и в атрибут нужного `<script>`. Выполнятся только скрипты с совпадающим nonce; внедрённый злоумышленником его не знает. `\'unsafe-inline\'` разрешает любой инлайн-код и сводит защиту CSP от [[xss|XSS]] на нет.',
          en: 'A **nonce** is a random value the server generates fresh for each response and puts both in the [[csp|CSP]] header and in the `<script>`’s attribute. Only scripts with a matching nonce run; an injected one doesn’t know it. `\'unsafe-inline\'` allows any inline code and defeats CSP’s [[xss|XSS]] protection.',
        },
      },
    ],
    sources: [{ title: 'MDN — CSP: script-src', url: `${MDN}/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src` }],
  },
  {
    id: 'web-sec-prototype-pollution-001',
    kind: 'output',
    topic: 'web',
    tags: ['security'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `function merge(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object') {
      target[key] = target[key] ?? {};
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

merge({}, JSON.parse('{"__proto__": {"isAdmin": true}}'));
console.log({}.isAdmin);`,
    },
    answers: ['true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`JSON.parse` создаёт обычное свойство с именем `__proto__`, а `target[\'__proto__\']` при записи указывает на `Object.prototype`. Рекурсивное слияние записывает `isAdmin` прямо в прототип всех объектов — теперь `{}.isAdmin === true` по всему приложению. Это **prototype pollution**.',
          en: '`JSON.parse` creates a regular property named `__proto__`, and `target[\'__proto__\']` resolves to `Object.prototype`. The recursive merge writes `isAdmin` straight into the prototype of every object — now `{}.isAdmin === true` across the app. That’s **prototype pollution**.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Защита: пропускать ключи `__proto__`, `constructor`, `prototype`, сливать в `Object.create(null)` или `Map`, использовать проверенные библиотеки.',
          en: 'Defense: skip the keys `__proto__`, `constructor`, `prototype`, merge into `Object.create(null)` or a `Map`, use vetted libraries.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Prototype pollution', url: `${MDN}/Web/Security/Attacks/Prototype_pollution` },
      { title: 'OWASP — Prototype Pollution Prevention', url: `${OWASP}/Prototype_Pollution_Prevention_Cheat_Sheet.html` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'web-sec-client-validation-001',
    topic: 'web',
    tags: ['security'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Форма проверяет на клиенте, что скидка не больше 10%. Достаточно ли этого?',
      en: 'A form checks on the client that a discount is at most 10%. Is that enough?',
    },
    options: [
      { text: { ru: 'Да, пользователь не сможет отправить больше', en: 'Yes, the user can’t submit more' } },
      {
        text: {
          ru: 'Нет: клиентская проверка — для удобства, запрос можно отправить в обход формы, поэтому сервер проверяет всё сам',
          en: 'No: client validation is for UX; a request can bypass the form, so the server must validate everything itself',
        },
      },
      { text: { ru: 'Да, если код минифицирован', en: 'Yes, if the code is minified' } },
      { text: { ru: 'Да, если использовать TypeScript', en: 'Yes, if you use TypeScript' } },
      { text: { ru: 'Да, если поле `readonly`', en: 'Yes, if the field is `readonly`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Всё, что выполняется в браузере, контролирует пользователь: запрос можно отправить из DevTools, `curl` или изменённого скрипта. Клиентская валидация даёт быструю обратную связь, а **правила безопасности** — права, лимиты, цены — проверяет сервер.',
          en: 'Everything running in the browser is controlled by the user: a request can be sent from DevTools, `curl` or a modified script. Client validation gives fast feedback, while **security rules** — permissions, limits, prices — are enforced by the server.',
        },
      },
    ],
    sources: [{ title: 'OWASP — Input Validation', url: `${OWASP}/Input_Validation_Cheat_Sheet.html` }],
  },
  {
    id: 'web-sec-cors-credentials-001',
    topic: 'web',
    tags: ['security', 'http'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: '`fetch(url, { credentials: \'include\' })` на другой origin падает, хотя сервер отвечает `Access-Control-Allow-Origin: *`. Почему?',
      en: '`fetch(url, { credentials: \'include\' })` to another origin fails although the server responds with `Access-Control-Allow-Origin: *`. Why?',
    },
    options: [
      { text: { ru: 'Cookie нельзя отправлять через `fetch`', en: 'Cookies can’t be sent with `fetch`' } },
      {
        text: {
          ru: 'С учётными данными `*` запрещён: нужен конкретный origin и `Access-Control-Allow-Credentials: true`',
          en: 'With credentials `*` is forbidden: you need a specific origin and `Access-Control-Allow-Credentials: true`',
        },
      },
      { text: { ru: 'Нужно добавить `mode: \'no-cors\'`', en: 'You need to add `mode: \'no-cors\'`' } },
      { text: { ru: 'Сервер должен ответить статусом 204', en: 'The server must respond with status 204' } },
      { text: { ru: 'Это работает только для `GET`', en: 'It only works for `GET`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Для запросов с cookie или авторизацией браузер требует, чтобы сервер назвал **конкретный** [[origin|origin]] в `Access-Control-Allow-Origin` и разрешил учётные данные `Access-Control-Allow-Credentials: true`. Звёздочка с ними не работает — иначе любой сайт читал бы ответы с вашими cookie. `no-cors` не поможет: ответ станет непрозрачным.',
          en: 'For requests with cookies or auth, the browser requires the server to name a **specific** [[origin|origin]] in `Access-Control-Allow-Origin` and allow credentials with `Access-Control-Allow-Credentials: true`. A wildcard doesn’t work with them — otherwise any site could read responses made with your cookies. `no-cors` won’t help: the response becomes opaque.',
        },
      },
    ],
    sources: [{ title: 'MDN — CORS', url: `${MDN}/Web/HTTP/Guides/CORS` }],
  },
];
