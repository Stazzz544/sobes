import type { Lesson } from '../model/types';

const API = 'https://nodejs.org/api';
const LEARN = 'https://nodejs.org/learn';
const EXPRESS = 'https://expressjs.com/en';

export const NODE_LESSONS: Lesson[] = [
  {
    tag: 'node-runtime',
    summary: {
      ru: 'Node.js — это V8 и libuv без браузера: JavaScript на сервере с доступом к файлам, сети и процессу, но без DOM. Код выполняется в одном потоке, а ввод-вывод — асинхронно.',
      en: 'Node.js is V8 plus libuv without a browser: server-side JavaScript with access to files, network and the process, but no DOM. Code runs on one thread, and I/O is asynchronous.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Вместо `window` и `document` здесь `process` (аргументы, переменные окружения, код выхода), `Buffer` для бинарных данных и встроенные модули `node:fs`, `node:http`, `node:path`. Глобальный объект — `globalThis`, `fetch` встроен с Node 18.',
          en: 'Instead of `window` and `document` there’s `process` (arguments, environment variables, exit code), `Buffer` for binary data and built-in modules `node:fs`, `node:http`, `node:path`. The global object is `globalThis`, and `fetch` is built in since Node 18.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ваш JavaScript работает в одном потоке. Сетевой ввод-вывод неблокирующий средствами ОС, а файлы, DNS, `zlib` и часть `crypto` [[libuv|libuv]] выполняет в пуле из 4 потоков. Тяжёлые вычисления выносят в `worker_threads`. Значения `process.env` — всегда строки, а завершать скрипт с ошибкой лучше через `process.exitCode = 1`, а не `process.exit(1)`.',
          en: 'Your JavaScript runs on one thread. Network I/O is non-blocking via the OS, while files, DNS, `zlib` and some `crypto` run in [[libuv|libuv]]’s pool of 4 threads. Heavy computations go to `worker_threads`. `process.env` values are always strings, and a script should fail via `process.exitCode = 1` rather than `process.exit(1)`.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Нет DOM, зато есть `process`, `Buffer`, `fs`, `http`.', en: 'No DOM, but there’s `process`, `Buffer`, `fs`, `http`.' },
      { ru: 'Один поток JS + пул потоков libuv для части операций.', en: 'One JS thread + libuv’s thread pool for some operations.' },
      { ru: '`process.env` — строки; код выхода 0 — успех.', en: '`process.env` holds strings; exit code 0 means success.' },
    ],
    sources: [
      { title: 'Node.js — Introduction to Node.js', url: `${LEARN}/getting-started/introduction-to-nodejs` },
      { title: 'Node.js — Differences between Node.js and the Browser', url: `${LEARN}/getting-started/differences-between-nodejs-and-the-browser` },
    ],
  },
  {
    tag: 'node-modules',
    summary: {
      ru: 'В Node.js две системы модулей: CommonJS (`require`, `module.exports`) и ES-модули (`import`/`export`). Какая используется, решают поле `"type"` в `package.json` и расширение файла.',
      en: 'Node.js has two module systems: CommonJS (`require`, `module.exports`) and ES modules (`import`/`export`). Which one applies depends on the `"type"` field in `package.json` and the file extension.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'В CommonJS модуль экспортирует `module.exports`; `exports` — лишь ссылка на него, поэтому присваивание `exports = {…}` ничего не экспортирует. Модуль выполняется один раз и кешируется: повторный `require` вернёт тот же объект. В ESM нет `__dirname` и `require` — вместо них `import.meta.dirname` и `import`.',
          en: 'In CommonJS a module exports `module.exports`; `exports` is just a reference to it, so assigning `exports = {…}` exports nothing. A module runs once and is cached: a repeated `require` returns the same object. ESM has no `__dirname` or `require` — use `import.meta.dirname` and `import`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`"type": "module"` делает `.js` ES-модулями, `.mjs` и `.cjs` задают систему явно. Версии зависимостей пишут по semver: `^1.4.2` — любые `1.x.x` не ниже `1.4.2`, `~1.4.2` — только патчи `1.4.x`. Точные версии всего дерева фиксирует lock-файл.',
          en: '`"type": "module"` makes `.js` files ES modules, while `.mjs` and `.cjs` set the system explicitly. Dependency versions follow semver: `^1.4.2` means any `1.x.x` from `1.4.2`, `~1.4.2` only `1.4.x` patches. The lockfile pins exact versions of the whole tree.',
        },
      },
    ],
    keyPoints: [
      { ru: '`require` возвращает `module.exports`, а не `exports`.', en: '`require` returns `module.exports`, not `exports`.' },
      { ru: 'Модуль выполняется один раз, дальше — из кеша.', en: 'A module runs once, then comes from the cache.' },
      { ru: '`^` — без смены мажорной версии, `~` — только патчи.', en: '`^` — same major version, `~` — patches only.' },
    ],
    sources: [
      { title: 'Node.js — Modules: CommonJS', url: `${API}/modules.html` },
      { title: 'Node.js — Packages', url: `${API}/packages.html` },
      { title: 'npm — About semantic versioning', url: 'https://docs.npmjs.com/about-semantic-versioning/' },
    ],
  },
  {
    tag: 'node-event-loop',
    summary: {
      ru: 'Цикл событий Node проходит фазы: таймеры → ввод-вывод (poll) → `setImmediate` (check) → закрытия. Между любыми колбэками сначала опустошаются очереди `process.nextTick` и микрозадач.',
      en: 'Node’s event loop goes through phases: timers → I/O (poll) → `setImmediate` (check) → close callbacks. Between any callbacks the `process.nextTick` and microtask queues are drained first.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Приоритет: синхронный код → `process.nextTick` → промисы → следующая фаза цикла. Внутри колбэка ввода-вывода `setImmediate` всегда раньше `setTimeout(…, 0)`; в главном модуле их порядок не определён.',
          en: 'Priority: synchronous code → `process.nextTick` → promises → the next loop phase. Inside an I/O callback `setImmediate` always runs before `setTimeout(…, 0)`; in the main module their order is undefined.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Цикл не может перейти дальше, пока работает синхронный код. Долгий расчёт, `fs.readFileSync` или рекурсивный `nextTick` в обработчике останавливают весь сервер — даже запросы к `/health` будут ждать.',
          en: 'The loop can’t move on while synchronous code runs. A long computation, `fs.readFileSync` or a recursive `nextTick` in a handler stalls the whole server — even `/health` requests wait.',
        },
      },
    ],
    keyPoints: [
      { ru: '`nextTick` → промисы → фазы цикла.', en: '`nextTick` → promises → loop phases.' },
      { ru: 'В I/O-колбэке `setImmediate` раньше таймера.', en: 'In an I/O callback `setImmediate` runs before a timer.' },
      { ru: 'Не блокировать поток: async API, воркеры, разбиение работы.', en: 'Don’t block the thread: async APIs, workers, chunked work.' },
    ],
    sources: [
      { title: 'Node.js — The Node.js Event Loop', url: `${LEARN}/asynchronous-work/event-loop-timers-and-nexttick` },
      { title: 'Node.js — Don’t Block the Event Loop', url: `${LEARN}/asynchronous-work/dont-block-the-event-loop` },
    ],
  },
  {
    tag: 'node-async',
    summary: {
      ru: 'Асинхронность в Node прошла путь от error-first колбэков к промисам и `async`/`await`. Ошибки нужно обрабатывать на каждом уровне: необработанное отклонение промиса роняет процесс.',
      en: 'Async in Node evolved from error-first callbacks to promises and `async`/`await`. Errors must be handled at every level: an unhandled promise rejection crashes the process.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Колбэк по схеме error-first получает `(error, result)`: ошибку проверяют первой, у системных ошибок есть `code` (`ENOENT`, `EACCES`, `EADDRINUSE`). `util.promisify` превращает такой API в промисы, а у стандартных модулей есть готовые версии: `node:fs/promises`, `node:timers/promises`.',
          en: 'An error-first callback receives `(error, result)`: check the error first; system errors carry a `code` (`ENOENT`, `EACCES`, `EADDRINUSE`). `util.promisify` turns such an API into promises, and standard modules have ready versions: `node:fs/promises`, `node:timers/promises`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`EventEmitter` вызывает слушателей синхронно и по порядку подписки. Событие `error` без слушателя бросает исключение. С Node 15 необработанное отклонение промиса завершает процесс — как и необработанное исключение.',
          en: '`EventEmitter` calls listeners synchronously in subscription order. An `error` event with no listener throws. Since Node 15 an unhandled promise rejection ends the process — just like an uncaught exception.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Error-first: `(error, result)`, ошибку проверять первой.', en: 'Error-first: `(error, result)`, check the error first.' },
      { ru: '`fs/promises` и `promisify` вместо колбэков.', en: '`fs/promises` and `promisify` instead of callbacks.' },
      { ru: 'Необработанный reject роняет процесс.', en: 'An unhandled reject crashes the process.' },
    ],
    sources: [
      { title: 'Node.js — Errors', url: `${API}/errors.html` },
      { title: 'Node.js — The Node.js Event emitter', url: `${LEARN}/asynchronous-work/the-nodejs-event-emitter` },
      { title: 'Node.js — util.promisify()', url: `${API}/util.html#utilpromisifyoriginal` },
    ],
  },
  {
    tag: 'node-streams',
    summary: {
      ru: '`Buffer` хранит байты, потоки обрабатывают данные по кускам. Большие файлы и ответы читают потоком, а не целиком в память.',
      en: '`Buffer` holds bytes, streams process data in chunks. Large files and responses are read as a stream, not loaded into memory whole.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Строка и её байты — разное: `\'Привет\'.length` — 6, а `Buffer.byteLength(\'Привет\')` — 12, потому что кириллица в UTF-8 занимает по 2 байта. Заголовки вроде `Content-Length` и лимиты размера считают в байтах.',
          en: 'A string and its bytes differ: `\'Привет\'.length` is 6, but `Buffer.byteLength(\'Привет\')` is 12, since Cyrillic takes 2 bytes each in UTF-8. Headers like `Content-Length` and size limits count bytes.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Потоки бывают Readable, Writable, Duplex и Transform. Когда приёмник не успевает, `write()` возвращает `false` — это **backpressure**: писать дальше нужно после события `drain`. `stream.pipeline` соединяет потоки, сам соблюдает [[backpressure|backpressure]] и закрывает всё при ошибке.',
          en: 'Streams are Readable, Writable, Duplex and Transform. When the destination can’t keep up, `write()` returns `false` — that’s **backpressure**: continue after the `drain` event. `stream.pipeline` connects streams, respects [[backpressure|backpressure]] and closes everything on error.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Байты ≠ символы: считать через `Buffer.byteLength`.', en: 'Bytes ≠ characters: count with `Buffer.byteLength`.' },
      { ru: 'Большие файлы — `createReadStream`, а не `readFile`.', en: 'Large files — `createReadStream`, not `readFile`.' },
      { ru: '`pipeline` вместо ручного `pipe`: ошибки и backpressure.', en: '`pipeline` over manual `pipe`: errors and backpressure.' },
    ],
    sources: [
      { title: 'Node.js — Stream', url: `${API}/stream.html` },
      { title: 'Node.js — Backpressuring in Streams', url: `${LEARN}/modules/backpressuring-in-streams` },
      { title: 'Node.js — Buffer', url: `${API}/buffer.html` },
    ],
  },
  {
    tag: 'node-http',
    summary: {
      ru: 'HTTP-сервер в Node — это `http.createServer`, а Express добавляет маршруты и цепочку middleware. Всё решает порядок регистрации и вызов `next()`.',
      en: 'An HTTP server in Node is `http.createServer`, and Express adds routes and a middleware chain. Registration order and calling `next()` decide everything.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Middleware — функция `(req, res, next)`. Она либо отвечает, либо зовёт `next()`; иначе запрос висит до таймаута. Обработчики идут в порядке объявления: проверку прав ставят **до** защищённых маршрутов. Тело запроса само не читается — нужен `express.json()` или `express.urlencoded()`.',
          en: 'Middleware is a `(req, res, next)` function. It either responds or calls `next()`; otherwise the request hangs until a timeout. Handlers run in declaration order: put auth checks **before** protected routes. The request body isn’t read by itself — you need `express.json()` or `express.urlencoded()`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Обработчик ошибок — middleware с четырьмя параметрами `(err, req, res, next)`, его подключают последним. Ошибку передают через `next(error)`; в Express 5 туда же попадают отклонённые промисы `async`-обработчиков.',
          en: 'An error handler is middleware with four parameters `(err, req, res, next)`, registered last. Errors are passed via `next(error)`; in Express 5 rejected promises of `async` handlers also land there.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Middleware отвечает или вызывает `next()`.', en: 'Middleware responds or calls `next()`.' },
      { ru: 'Порядок регистрации = порядок выполнения.', en: 'Registration order = execution order.' },
      { ru: 'Обработчик ошибок — 4 параметра, в конце.', en: 'Error handler — 4 parameters, at the end.' },
    ],
    sources: [
      { title: 'Express — Using middleware', url: `${EXPRESS}/guide/using-middleware/` },
      { title: 'Express — Error handling', url: `${EXPRESS}/guide/error-handling/` },
      { title: 'Node.js — HTTP', url: `${API}/http.html` },
    ],
  },
];
