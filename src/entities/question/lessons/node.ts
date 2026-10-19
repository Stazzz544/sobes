import type { Lesson } from '../model/types';

const API = 'https://nodejs.org/api';
const LEARN = 'https://nodejs.org/learn';
const EXPRESS = 'https://expressjs.com/en';

export const NODE_LESSONS: Lesson[] = [
  {
    tag: 'node-runtime',
    format: 'steps',
    summary: {
      ru: 'Node.js — это движок V8 и библиотека libuv без браузера. Чтобы писать для него уверенно, нужно понимать, сколько у него потоков, что лежит в `process` и как процесс правильно завершается.',
      en: 'Node.js is the V8 engine plus the libuv library, without a browser. To write for it confidently, you need to know how many threads it has, what’s in `process` and how a process exits properly.',
    },
    steps: [
      {
        id: 'no-browser',
        title: { ru: 'JavaScript без браузера', en: 'JavaScript without a browser' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Node.js — это движок V8 и библиотека [[libuv|libuv]], которая даёт доступ к файлам, сети и таймерам. Браузера здесь нет: `window`, `document` и DOM отсутствуют. Зато есть то, чего нет в браузере: `process`, `Buffer`, `setImmediate`, модули `node:fs`, `node:http`, `node:crypto`. Общее у двух сред — сам язык и часть веб-API: `fetch`, `URL`, `AbortController`, `setTimeout`.',
              en: 'Node.js is the V8 engine plus the [[libuv|libuv]] library, which provides files, networking and timers. There’s no browser: no `window`, `document` or DOM. Instead there’s what browsers lack: `process`, `Buffer`, `setImmediate`, the `node:fs`, `node:http`, `node:crypto` modules. The two environments share the language itself and some web APIs: `fetch`, `URL`, `AbortController`, `setTimeout`.',
            },
          },
        ],
        test: ['node-runtime-globals-001'],
      },
      {
        id: 'threads',
        title: { ru: 'Один поток для JavaScript', en: 'One thread for JavaScript' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ваш код и все колбэки выполняются в **одном** главном потоке — поэтому тяжёлое синхронное вычисление останавливает весь сервер. Сетевой ввод-вывод неблокирующий средствами ОС, а операции без асинхронного API в ОС — файлы, `dns.lookup`, сжатие, часть крипто — libuv отдаёт пулу потоков (по умолчанию четыре). Для тяжёлых расчётов есть `worker_threads`: отдельный поток со своим JavaScript и циклом событий, общение — сообщениями.',
              en: 'Your code and every callback run on **one** main thread — that’s why a heavy synchronous computation stalls the whole server. Network I/O is non-blocking via the OS, while operations the OS lacks async APIs for — files, `dns.lookup`, compression, some crypto — libuv hands to a thread pool (four threads by default). For heavy computations there are `worker_threads`: a separate thread with its own JavaScript and event loop, talking through messages.',
            },
          },
          {
            type: 'illustration',
            illustration: 'node-threads',
          },
        ],
        test: ['node-runtime-threads-001', 'node-runtime-worker-001'],
      },
      {
        id: 'process',
        title: { ru: 'process.env и argv', en: 'process.env and argv' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Значения в `process.env` — **всегда строки**: `process.env.PORT = 3000` превратится в `\'3000\'`, и `+ 1` склеит строки. Переменные парсят явно: `Number(process.env.PORT ?? 8080)`. Загрузить `.env` без пакета `dotenv` можно флагом `node --env-file=.env`. `process.argv` всегда начинается с двух элементов — путь к `node` и к скрипту, — поэтому аргументы берут через `process.argv.slice(2)` или разбирают встроенным `util.parseArgs`.',
              en: 'Values in `process.env` are **always strings**: `process.env.PORT = 3000` becomes `\'3000\'`, and `+ 1` concatenates. Parse variables explicitly: `Number(process.env.PORT ?? 8080)`. Load `.env` without the `dotenv` package via the `node --env-file=.env` flag. `process.argv` always starts with two items — the path to `node` and to the script — so arguments come from `process.argv.slice(2)` or the built-in `util.parseArgs`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'env-boolean',
              prompt: {
                ru: 'Запуск `DEBUG=false node app.js`. Чему равно `Boolean(process.env.DEBUG)`?',
                en: 'Run as `DEBUG=false node app.js`. What is `Boolean(process.env.DEBUG)`?',
              },
              options: [
                { text: { ru: '`false`', en: '`false`' } },
                { text: { ru: '`true` — это непустая строка `\'false\'`', en: '`true` — it’s the non-empty string `\'false\'`' } },
                { text: { ru: '`undefined`', en: '`undefined`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Переменная окружения — строка, а любая непустая строка истинна. Флаги сравнивают явно: `process.env.DEBUG === \'true\'`.',
                en: 'An environment variable is a string, and any non-empty string is truthy. Compare flags explicitly: `process.env.DEBUG === \'true\'`.',
              },
            },
          },
        ],
        test: ['node-runtime-env-001', 'node-runtime-argv-001'],
      },
      {
        id: 'exit',
        title: { ru: 'Как завершается процесс', en: 'How a process exits' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`process.exit(1)` завершает процесс **сразу**, даже если запись в `stdout` ещё не закончилась, — хвост лога может пропасть. `process.exitCode = 1` лишь задаёт код: процесс доработает асинхронные дела и выйдет сам. После `uncaughtException` продолжать работу небезопасно: исключение могло вылететь посреди операции, оставив полузаписанные данные и открытые соединения. Правильно — записать лог, освободить ресурсы и завершиться, а перезапустит процесс менеджер.',
              en: '`process.exit(1)` ends the process **immediately**, even if a write to `stdout` hasn’t finished — the tail of the log may be lost. `process.exitCode = 1` only sets the code: the process finishes its async work and exits on its own. After `uncaughtException` it isn’t safe to keep going: the exception may have struck mid-operation, leaving half-written data and open connections. The right move is to log, release resources and exit, and let a process manager restart it.',
            },
          },
        ],
        test: ['node-runtime-exit-code-001', 'node-runtime-uncaught-001'],
      },
      {
        id: 'builtins',
        title: { ru: 'Встроенные модули', en: 'Built-in modules' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Многое Node умеет без пакетов. `node:path` собирает пути: `extname` возвращает только последнее расширение, `join` нормализует `..`. `node:crypto` считает хеши, `node:test` — встроенный тест-раннер. `console.log` форматирует объекты через `util.inspect` и раскрывает только **два** уровня вложенности — глубже пишет `[Object]`, поэтому в логах «пропадают» данные. Полностью показывает `console.dir(obj, { depth: null })`.',
              en: 'Node does a lot without packages. `node:path` builds paths: `extname` returns only the last extension, `join` normalizes `..`. `node:crypto` computes hashes, `node:test` is a built-in test runner. `console.log` formats objects with `util.inspect` and expands only **two** levels of nesting — deeper it prints `[Object]`, so data “disappears” from logs. `console.dir(obj, { depth: null })` shows everything.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const path = require('node:path');\n\npath.extname('a.tar.gz'); // '.gz'\npath.join('/app', 'src', '..');\n// → '/app'",
            },
          },
        ],
        test: ['node-runtime-path-001'],
      },
    ],
    keyPoints: [
      { ru: 'V8 + libuv, без DOM; есть `process` и `Buffer`.', en: 'V8 + libuv, no DOM; there’s `process` and `Buffer`.' },
      { ru: 'JavaScript в одном потоке, файлы и крипто — в пуле libuv.', en: 'JavaScript on one thread; files and crypto in the libuv pool.' },
      { ru: '`process.env` — только строки.', en: '`process.env` holds only strings.' },
      { ru: '`exitCode` вместо `exit()`, после `uncaughtException` — выход.', en: '`exitCode` over `exit()`; exit after `uncaughtException`.' },
    ],
    sources: [
      { title: 'Node.js — Introduction to Node.js', url: `${LEARN}/getting-started/introduction-to-nodejs` },
      { title: 'Node.js — Differences between Node.js and the Browser', url: `${LEARN}/getting-started/differences-between-nodejs-and-the-browser` },
      { title: 'Node.js — process', url: `${API}/process.html` },
      { title: 'Node.js — Worker threads', url: `${API}/worker_threads.html` },
    ],
  },
  {
    tag: 'node-modules',
    format: 'steps',
    summary: {
      ru: 'В Node две модульные системы — CommonJS и ES-модули — и свои правила поиска пакетов. Понимание того, как модуль загружается, кешируется и находится, снимает большую часть «магии» с `require`, `import` и `package.json`.',
      en: 'Node has two module systems — CommonJS and ES modules — and its own package lookup rules. Knowing how a module is loaded, cached and found takes most of the “magic” out of `require`, `import` and `package.json`.',
    },
    steps: [
      {
        id: 'commonjs-exports',
        title: { ru: 'exports и module.exports', en: 'exports and module.exports' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В CommonJS модуль отдаёт наружу объект `module.exports`. `exports` — всего лишь переменная, которая изначально указывает на него. Добавлять в неё свойства можно: `exports.a = 1` попадёт в экспорт. А присваивание `exports = { b: 2 }` лишь перенаправляет переменную на новый объект, и модуль этого не видит. Чтобы заменить экспорт целиком, пишут `module.exports = { … }`.',
              en: 'In CommonJS a module exposes the `module.exports` object. `exports` is just a variable that initially points to it. Adding properties works: `exports.a = 1` ends up in the export. But assigning `exports = { b: 2 }` only redirects the variable to a new object, and the module never sees it. To replace the whole export, write `module.exports = { … }`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'exports-reassign',
              prompt: {
                ru: 'Модуль содержит только строку `exports = { hello: 1 }`. Что получит `require`?',
                en: 'A module contains only `exports = { hello: 1 }`. What does `require` return?',
              },
              options: [
                { text: { ru: '`{ hello: 1 }`', en: '`{ hello: 1 }`' } },
                { text: { ru: 'Пустой объект `{}`', en: 'An empty object `{}`' } },
                { text: { ru: 'Ошибку', en: 'An error' } },
              ],
              answer: 1,
              explanation: {
                ru: '`require` возвращает `module.exports`, а он остался исходным пустым объектом: переприсвоили только локальную переменную.',
                en: '`require` returns `module.exports`, which is still the original empty object: only the local variable was reassigned.',
              },
            },
          },
        ],
        test: ['node-modules-exports-001'],
      },
      {
        id: 'cache',
        title: { ru: 'Модуль выполняется один раз', en: 'A module runs once' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Модуль выполняется **один раз** — при первом `require`, а результат кешируется по полному пути файла. Второй `require` того же файла возвращает тот же объект: код модуля не выполняется снова, и все, кто его подключил, делят одно состояние. На этом держатся синглтоны — подключение к базе, конфиг. Кеш лежит в `require.cache`; если удалить оттуда запись, следующий `require` выполнит файл заново.',
              en: 'A module runs **once** — on the first `require`, and the result is cached by the file’s full path. A second `require` of the same file returns the same object: the module code doesn’t run again, and everyone who required it shares one state. Singletons rely on this — a database connection, a config. The cache lives in `require.cache`; delete an entry, and the next `require` runs the file again.',
            },
          },
        ],
        test: ['node-modules-cache-001'],
      },
      {
        id: 'resolution',
        title: { ru: 'Где Node ищет пакет', en: 'Where Node looks for a package' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Голое имя пакета, например `require(\'lodash\')`, Node ищет в `node_modules` рядом с файлом, затем в родительских папках — до первого найденного. Внутри пакета точку входа задают `exports` или `main` в его `package.json`. Поле `exports` — публичный интерфейс пакета: всё, что в нём не перечислено, снаружи недоступно, даже если файл физически лежит в `node_modules`, — получите `ERR_PACKAGE_PATH_NOT_EXPORTED`.',
              en: 'A bare package name, like `require(\'lodash\')`, is looked up in `node_modules` next to the file, then in parent folders — until the first match. Inside the package, the entry point comes from `exports` or `main` in its `package.json`. The `exports` field is the package’s public interface: anything not listed there is unavailable from outside, even if the file physically sits in `node_modules` — you get `ERR_PACKAGE_PATH_NOT_EXPORTED`.',
            },
          },
          { type: 'diagram', diagram: 'node-module-resolution' },
        ],
        test: ['node-modules-resolution-001', 'node-modules-exports-field-001'],
      },
      {
        id: 'esm',
        title: { ru: 'CommonJS или ES-модуль', en: 'CommonJS or ES module' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Как загрузить `.js`, Node решает по полю `"type"` в ближайшем `package.json`: `"module"` — ES-модули, `"commonjs"` или отсутствие поля — CommonJS. Расширения сильнее поля: `.mjs` — всегда ESM, `.cjs` — всегда CommonJS. В ES-модулях нет `__dirname`, `__filename` и `require` — это переменные обёртки CommonJS. Папку модуля даёт `import.meta.dirname`. Синхронный `require` в свежем Node умеет грузить ES-модули, но только без `await` на верхнем уровне.',
              en: 'How to load a `.js` file, Node decides from the `"type"` field in the nearest `package.json`: `"module"` means ES modules, `"commonjs"` or no field means CommonJS. Extensions win over the field: `.mjs` is always ESM, `.cjs` always CommonJS. ES modules have no `__dirname`, `__filename` or `require` — those are CommonJS wrapper variables. The module’s folder comes from `import.meta.dirname`. A synchronous `require` in recent Node can load ES modules, but only without top-level `await`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "import path from 'node:path';\n\nconst file = path.join(\n  import.meta.dirname,\n  'data.json',\n);",
            },
          },
        ],
        test: ['node-modules-type-001', 'node-modules-dirname-001'],
      },
      {
        id: 'semver',
        title: { ru: 'Версии зависимостей', en: 'Dependency versions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Версия пакета — `MAJOR.MINOR.PATCH`: мажорная может ломать API, минорная добавляет возможности, патч исправляет ошибки. `^1.4.2` разрешает всё, что не меняет первую ненулевую цифру, — `>=1.4.2 <2.0.0`. `~1.4.2` строже, только патчи — `<1.5.0`. Точные версии, которые реально поставились, фиксирует `package-lock.json`: его коммитят, а в CI ставят зависимости через `npm ci`.',
              en: 'A package version is `MAJOR.MINOR.PATCH`: major may break the API, minor adds features, patch fixes bugs. `^1.4.2` allows anything that keeps the first non-zero digit — `>=1.4.2 <2.0.0`. `~1.4.2` is stricter, patches only — `<1.5.0`. The exact versions actually installed are pinned by `package-lock.json`: commit it, and install in CI with `npm ci`.',
            },
          },
        ],
        test: ['node-modules-semver-001'],
      },
    ],
    keyPoints: [
      { ru: 'Экспорт — `module.exports`; присваивание `exports` его не меняет.', en: 'The export is `module.exports`; reassigning `exports` doesn’t change it.' },
      { ru: 'Модуль выполняется один раз и кешируется.', en: 'A module runs once and is cached.' },
      { ru: 'Пакеты ищутся в `node_modules` вверх по папкам.', en: 'Packages are found in `node_modules` going up the folders.' },
      { ru: 'ESM или CJS — по `"type"` и расширению; в ESM — `import.meta.dirname`.', en: 'ESM or CJS by `"type"` and extension; ESM uses `import.meta.dirname`.' },
      { ru: '`^` — без смены мажорной версии, `~` — только патчи.', en: '`^` keeps the major version; `~` allows patches only.' },
    ],
    sources: [
      { title: 'Node.js — Modules: CommonJS', url: `${API}/modules.html` },
      { title: 'Node.js — Modules: ECMAScript modules', url: `${API}/esm.html` },
      { title: 'Node.js — Packages', url: `${API}/packages.html` },
      { title: 'npm — About semantic versioning', url: 'https://docs.npmjs.com/about-semantic-versioning/' },
    ],
  },
  {
    tag: 'node-event-loop',
    format: 'steps',
    summary: {
      ru: '[[event-loop|Цикл событий]] Node похож на браузерный, но устроен фазами и имеет лишнюю очередь — `process.nextTick`. Из этого следуют порядок вывода в задачах на собеседовании и реальные беды: заблокированный сервер и «голодающий» ввод-вывод.',
      en: 'Node’s [[event-loop|event loop]] resembles the browser’s but runs in phases and has an extra queue — `process.nextTick`. That explains the output order in interview puzzles and real trouble: a blocked server and starving I/O.',
    },
    steps: [
      {
        id: 'blocking',
        title: { ru: 'Не блокируйте цикл', en: 'Don’t block the loop' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Синхронный код занимает единственный поток JavaScript, и пока он работает, [[event-loop|цикл событий]] не может принять ни один запрос — даже к `/health`. Если обработчик `/report` три секунды считает отчёт в синхронном цикле, все остальные клиенты три секунды ждут. Решения: асинхронные API, вынос расчёта в `worker_threads` или очередь задач, разбиение работы на куски.',
              en: 'Synchronous code occupies the only JavaScript thread, and while it runs the [[event-loop|event loop]] can’t accept a single request — not even to `/health`. If the `/report` handler spends three seconds computing in a synchronous loop, every other client waits three seconds. Fixes: async APIs, moving the computation to `worker_threads` or a job queue, splitting the work into chunks.',
            },
          },
        ],
        test: ['node-event-loop-blocking-001'],
      },
      {
        id: 'phases',
        title: { ru: 'Фазы цикла', en: 'Loop phases' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Цикл проходит фазы по кругу: **timers** (истёкшие таймеры) → **poll** (колбэки ввода-вывода) → **check** (`setImmediate`) → **close**. Внутри колбэка ввода-вывода `setImmediate` всегда срабатывает раньше `setTimeout(…, 0)`: следующая фаза — check, а таймеры ждут нового круга. В главном модуле порядок этих двоих **не гарантирован**: `setTimeout(fn, 0)` на деле ждёт 1 мс, и всё зависит от того, успела ли она пройти к началу цикла.',
              en: 'The loop cycles through phases: **timers** (expired timers) → **poll** (I/O callbacks) → **check** (`setImmediate`) → **close**. Inside an I/O callback `setImmediate` always fires before `setTimeout(…, 0)`: the next phase is check, while timers wait for a new round. In the main module the order of those two is **not guaranteed**: `setTimeout(fn, 0)` actually waits 1 ms, and it depends on whether that passed before the loop started.',
            },
          },
          { type: 'diagram', diagram: 'node-loop-phases' },
        ],
        test: ['node-event-loop-immediate-io-001', 'node-event-loop-immediate-main-001'],
      },
      {
        id: 'microtasks',
        title: { ru: 'nextTick и промисы', en: 'nextTick and promises' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'После каждого кусочка синхронного кода Node сначала опустошает очередь `process.nextTick` **целиком**, затем — очередь [[microtask|микрозадач]], где `then` и `queueMicrotask` идут в порядке добавления. Только потом цикл переходит дальше. Поэтому в CommonJS-модуле `nextTick` срабатывает раньше промиса, даже если запланирован позже. Оговорка: в ES-модулях код сам выполняется как микрозадача, и промисы там могут обогнать `nextTick`.',
              en: 'After each piece of synchronous code, Node first drains the `process.nextTick` queue **entirely**, then the [[microtask|microtask]] queue, where `then` and `queueMicrotask` run in insertion order. Only then does the loop move on. That’s why in a CommonJS module `nextTick` fires before a promise even when scheduled later. Caveat: in ES modules the code itself runs as a microtask, and promises there may overtake `nextTick`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "Promise.resolve().then(() =>\n  console.log('promise'));\nprocess.nextTick(() =>\n  console.log('tick'));\nconsole.log('sync');\n// sync, tick, promise",
            },
          },
        ],
        test: ['node-event-loop-queues-001', 'node-event-loop-order-001'],
      },
      {
        id: 'starvation',
        title: { ru: 'Голодание ввода-вывода', en: 'Starving I/O' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Раз очередь `nextTick` опустошается целиком до перехода дальше, функция, которая рекурсивно планирует себя через `process.nextTick`, не даст циклу сдвинуться никогда: ввод-вывод и таймеры «голодают», сервер перестаёт отвечать. Стек при этом не переполнится — каждый вызов начинается с пустого стека, поэтому ошибки нет, сервер просто молчит. Для повторяющейся работы берут `setImmediate`: он пропускает ввод-вывод между итерациями.',
              en: 'Since the `nextTick` queue is drained completely before moving on, a function that recursively schedules itself with `process.nextTick` never lets the loop advance: I/O and timers starve, and the server stops responding. The stack doesn’t overflow — each call starts with an empty stack, so there’s no error, the server just goes silent. For repeating work use `setImmediate`: it lets I/O run between iterations.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'immediate-vs-tick',
              prompt: {
                ru: 'Нужно обрабатывать очередь задач кусками, не блокируя запросы. Чем планировать следующий кусок?',
                en: 'You need to process a job queue in chunks without blocking requests. What schedules the next chunk?',
              },
              options: [
                { text: { ru: '`process.nextTick`', en: '`process.nextTick`' } },
                { text: { ru: '`setImmediate`', en: '`setImmediate`' } },
                { text: { ru: 'Синхронный `while (true)`', en: 'A synchronous `while (true)`' } },
              ],
              answer: 1,
              explanation: {
                ru: '`setImmediate` выполняется в фазе check, после ввода-вывода, — запросы успевают обрабатываться. `nextTick` и `while` не отпустят цикл.',
                en: '`setImmediate` runs in the check phase, after I/O — requests get handled in between. `nextTick` and `while` never release the loop.',
              },
            },
          },
        ],
        test: ['node-event-loop-nexttick-001'],
      },
      {
        id: 'keep-alive',
        title: { ru: 'Когда процесс завершается', en: 'When the process exits' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Процесс Node живёт, пока в цикле есть активные дела: таймеры, сокеты, серверы. Когда их нет, он завершается сам. `timer.unref()` говорит: «этот таймер не повод не выходить», — и если других дел нет, процесс закончится, не дождавшись его. Так делают фоновые таймеры метрик. Событие `beforeExit` срабатывает, когда цикл опустел: в нём ещё можно запланировать асинхронную работу, и процесс продолжит жить.',
              en: 'A Node process lives while the loop has active work: timers, sockets, servers. When there’s none, it exits by itself. `timer.unref()` says “this timer isn’t a reason to stay alive” — and with nothing else to do, the process ends without waiting for it. Background metrics timers do this. The `beforeExit` event fires when the loop is empty: you can still schedule async work there, and the process keeps living.',
            },
          },
        ],
        test: ['node-event-loop-unref-001'],
      },
    ],
    keyPoints: [
      { ru: 'Синхронный код блокирует все запросы.', en: 'Synchronous code blocks every request.' },
      { ru: 'Фазы: timers → poll → check → close.', en: 'Phases: timers → poll → check → close.' },
      { ru: 'После I/O `setImmediate` раньше `setTimeout(…, 0)`.', en: 'After I/O, `setImmediate` beats `setTimeout(…, 0)`.' },
      { ru: 'Очередь `nextTick` — раньше промисов и целиком.', en: 'The `nextTick` queue runs before promises, entirely.' },
      { ru: 'Процесс живёт, пока есть активные таймеры и сокеты.', en: 'A process lives while timers and sockets are active.' },
    ],
    sources: [
      { title: 'Node.js — The Node.js Event Loop', url: `${LEARN}/asynchronous-work/event-loop-timers-and-nexttick` },
      { title: 'Node.js — Don’t Block the Event Loop', url: `${LEARN}/asynchronous-work/dont-block-the-event-loop` },
      { title: 'Node.js — Understanding setImmediate()', url: `${LEARN}/asynchronous-work/understanding-setimmediate` },
    ],
  },
  {
    tag: 'node-async',
    format: 'steps',
    summary: {
      ru: 'В Node три поколения асинхронности: error-first колбэки, события и промисы. Они живут вместе, и важно знать, как их связывать, как отменять операции и куда деваются ошибки, которые никто не поймал.',
      en: 'Node has three generations of async code: error-first callbacks, events and promises. They live side by side, and you need to know how to bridge them, how to cancel operations and where uncaught errors go.',
    },
    steps: [
      {
        id: 'error-first',
        title: { ru: 'Error-first колбэки', en: 'Error-first callbacks' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Колбэки Node устроены по схеме **error-first**: первым аргументом приходит ошибка или `null`, вторым — результат. У системных ошибок есть `code`: `ENOENT` — файла нет, `EACCES` — нет прав, `EADDRINUSE` — порт занят. `util.promisify` превращает такую функцию в функцию, возвращающую промис: `callback(null, value)` выполняет промис, `callback(error)` — отклоняет. Для стандартных модулей есть готовые версии: `node:fs/promises`.',
              en: 'Node callbacks follow the **error-first** convention: the first argument is an error or `null`, the second the result. System errors have a `code`: `ENOENT` — no such file, `EACCES` — no permission, `EADDRINUSE` — port taken. `util.promisify` turns such a function into one that returns a promise: `callback(null, value)` resolves it, `callback(error)` rejects. Standard modules already have promise versions: `node:fs/promises`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "fs.readFile('a.txt', (error, data) => {\n  if (error) {\n    return console.log(error.code);\n  }\n  console.log(data.length);\n});",
            },
          },
        ],
        test: ['node-async-error-first-001', 'node-async-promisify-001'],
      },
      {
        id: 'unhandled',
        title: { ru: 'Необработанные отклонения', en: 'Unhandled rejections' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'С Node 15 необработанное отклонение промиса **роняет процесс** с ненулевым кодом — так же, как непойманное исключение. Раньше было только предупреждение, и ошибки молча терялись. Поэтому у каждой цепочки промисов должен быть `catch` или `await` внутри `try`, а в Express 5 отклонения обработчиков сами уходят в обработчик ошибок. Глобальный `process.on(\'unhandledRejection\')` — для логирования, а не для того, чтобы жить дальше.',
              en: 'Since Node 15 an unhandled promise rejection **crashes the process** with a non-zero code — just like an uncaught exception. It used to be a mere warning, and errors were silently lost. So every promise chain needs a `catch` or an `await` inside `try`, and in Express 5 rejected handlers go to the error handler by themselves. A global `process.on(\'unhandledRejection\')` is for logging, not for carrying on.',
            },
          },
        ],
        test: ['node-async-unhandled-001'],
      },
      {
        id: 'emitter',
        title: { ru: 'EventEmitter', en: 'EventEmitter' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`emit` вызывает слушателей **синхронно** и по порядку подписки — это не очередь событий: код после `emit` выполнится только когда отработают все слушатели. Отложить работу слушатель может сам — через `setImmediate`. Событие `error` особое: если на него нет слушателя, `emit(\'error\')` **бросает** ошибку, и без `try` процесс упадёт. Предупреждение `MaxListenersExceededWarning` обычно значит утечку: подписка добавляется снова и снова и не снимается.',
              en: '`emit` calls listeners **synchronously** in subscription order — it isn’t an event queue: code after `emit` runs only once every listener is done. A listener can defer work itself — with `setImmediate`. The `error` event is special: with no listener, `emit(\'error\')` **throws**, and without `try` the process crashes. A `MaxListenersExceededWarning` usually means a leak: a subscription is added again and again and never removed.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'emit-sync',
              prompt: {
                ru: 'Слушатель `save` печатает «listener». Что выведет `emitter.emit(\'save\'); console.log(\'after\')`?',
                en: 'The `save` listener prints “listener”. What does `emitter.emit(\'save\'); console.log(\'after\')` print?',
              },
              options: [
                { text: { ru: 'after, listener', en: 'after, listener' } },
                { text: { ru: 'listener, after', en: 'listener, after' } },
                { text: { ru: 'Порядок не гарантирован', en: 'The order isn’t guaranteed' } },
              ],
              answer: 1,
              explanation: {
                ru: '`emit` синхронно вызывает слушателя и только потом возвращается. Поэтому «listener» печатается до «after».',
                en: '`emit` synchronously calls the listener and only then returns. So “listener” prints before “after”.',
              },
            },
          },
        ],
        test: ['node-async-emitter-001', 'node-async-emitter-error-001'],
      },
      {
        id: 'promise-tools',
        title: { ru: 'Промисы из коробки и отмена', en: 'Built-in promises and cancellation' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`events.once(emitter, \'ready\')` превращает одно событие в промис: он выполнится массивом аргументов события, а при `error` — отклонится. `node:timers/promises` даёт `setTimeout`, который возвращает промис. Отменять операции помогает `AbortController`: его `signal` принимают `fetch`, таймеры из `timers/promises`, `fs.readFile`, `events.once` и потоки. После `abort()` операция прекращается, а промис отклоняется с ошибкой `AbortError`.',
              en: '`events.once(emitter, \'ready\')` turns one event into a promise: it resolves with an array of the event’s arguments and rejects on `error`. `node:timers/promises` provides a `setTimeout` that returns a promise. `AbortController` cancels operations: its `signal` is accepted by `fetch`, `timers/promises`, `fs.readFile`, `events.once` and streams. After `abort()` the operation stops, and its promise rejects with an `AbortError`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const ac = new AbortController();\nsetTimeout(() => ac.abort(), 5000);\n\nconst response = await fetch(url, {\n  signal: ac.signal,\n});',
            },
            caption: {
              ru: 'Запрос дольше 5 секунд отменится с `AbortError`',
              en: 'A request longer than 5 seconds is cancelled with `AbortError`',
            },
          },
        ],
        test: ['node-async-events-once-001', 'node-async-abort-001'],
      },
      {
        id: 'parallel',
        title: { ru: 'Параллельно, но не всё сразу', en: 'Parallel, but not all at once' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`await` в цикле читает 200 файлов строго по очереди. `forEach` с `async` вообще не ждёт промисы — код после него увидит пустой результат. `Promise.all` на все сразу быстрее, но тысячи одновременных операций упрутся в лимит открытых файлов. Золотая середина — пачками, например по 20, или пул с ограничением параллельности. А чтобы протащить контекст запроса — `requestId` — через все `await` без параметров, есть `AsyncLocalStorage`.',
              en: '`await` in a loop reads 200 files strictly one by one. `forEach` with `async` doesn’t wait for promises at all — code after it sees an empty result. `Promise.all` over everything is faster, but thousands of simultaneous operations hit the open-file limit. The middle ground is batches, say 20 at a time, or a pool with a concurrency limit. And to carry request context — a `requestId` — through every `await` without parameters, there’s `AsyncLocalStorage`.',
            },
          },
        ],
        test: ['node-async-parallel-files-001'],
      },
    ],
    keyPoints: [
      { ru: 'Error-first: ошибка первым аргументом; `promisify` — мост к промисам.', en: 'Error-first: the error comes first; `promisify` bridges to promises.' },
      { ru: 'Необработанное отклонение роняет процесс.', en: 'An unhandled rejection crashes the process.' },
      { ru: '`emit` синхронный; `error` без слушателя бросает.', en: '`emit` is synchronous; `error` with no listener throws.' },
      { ru: 'Отмена — `AbortController` и `signal`.', en: 'Cancellation — `AbortController` and `signal`.' },
      { ru: 'Много операций — пачками, а не все сразу.', en: 'Many operations — in batches, not all at once.' },
    ],
    sources: [
      { title: 'Node.js — Errors', url: `${API}/errors.html` },
      { title: 'Node.js — The Node.js Event emitter', url: `${LEARN}/asynchronous-work/the-nodejs-event-emitter` },
      { title: 'Node.js — util.promisify()', url: `${API}/util.html#utilpromisifyoriginal` },
      { title: 'Node.js — Timers Promises API', url: `${API}/timers.html#timers-promises-api` },
    ],
  },
  {
    tag: 'node-streams',
    format: 'steps',
    summary: {
      ru: 'Буфер — это байты, поток — это данные по кусочкам. Вместе они позволяют обрабатывать файлы и ответы любого размера, не загружая их в память целиком, — если соблюдать backpressure и обрабатывать ошибки.',
      en: 'A buffer is bytes; a stream is data piece by piece. Together they let you process files and responses of any size without loading them into memory — as long as you respect backpressure and handle errors.',
    },
    steps: [
      {
        id: 'buffers',
        title: { ru: 'Buffer — это байты', en: 'A Buffer is bytes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`Buffer` — массив байтов от 0 до 255. Строка и её байты — разные вещи: `length` строки считает UTF-16-единицы, а `Buffer.byteLength` — байты в UTF-8, где латиница занимает 1 байт, кириллица — 2, эмодзи — 4. Это важно для `Content-Length` и лимитов размера. `Buffer` переводит данные между кодировками: `toString(\'base64\')`, `toString(\'hex\')` — в шестнадцатеричном виде каждый байт ровно две цифры. Base64 — кодирование, а не шифрование: его раскодирует кто угодно.',
              en: 'A `Buffer` is an array of bytes from 0 to 255. A string and its bytes differ: a string’s `length` counts UTF-16 units, while `Buffer.byteLength` counts UTF-8 bytes, where Latin letters take 1 byte, Cyrillic 2, emoji 4. That matters for `Content-Length` and size limits. `Buffer` converts between encodings: `toString(\'base64\')`, `toString(\'hex\')` — in hex every byte is exactly two digits. Base64 is encoding, not encryption: anyone can decode it.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "Buffer.byteLength('cat'); // 3\nBuffer.byteLength('€'); // 3\nBuffer.from('ok').toString('hex');\n// '6f6b'",
            },
          },
        ],
        test: ['node-streams-buffer-001', 'node-streams-base64-001'],
      },
      {
        id: 'why-streams',
        title: { ru: 'Зачем потоки', en: 'Why streams' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`fs.readFile` читает файл в память **целиком**. Сервер, отдающий так файлы по 2 ГБ, падает по памяти при десятке одновременных скачиваний. Поток читает файл кусками — по умолчанию 64 КБ — и отдаёт их по мере отправки, поэтому память не растёт с размером файла. Ответ сервера `res` — тоже поток, и файл в него подключают через `pipeline(fs.createReadStream(path), res, onDone)`.',
              en: '`fs.readFile` reads a file into memory **entirely**. A server serving 2 GB files this way runs out of memory with a dozen simultaneous downloads. A stream reads the file in chunks — 64 KB by default — and hands them on as they’re sent, so memory doesn’t grow with the file size. The server response `res` is a stream too, and a file is connected to it with `pipeline(fs.createReadStream(path), res, onDone)`.',
            },
          },
          {
            type: 'illustration',
            illustration: 'node-stream-memory',
          },
        ],
        test: ['node-streams-readfile-001'],
      },
      {
        id: 'backpressure',
        title: { ru: 'Backpressure', en: 'Backpressure' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Если источник быстрее приёмника, данные копятся в памяти. Сигнал об этом — [[backpressure|backpressure]]: `writable.write(chunk)` возвращает `false`, как только во внутреннем буфере набралось `highWaterMark` байт или больше. Чанк при этом **принят** и не потерян, но писать дальше нельзя — ждут событие `drain`. Если игнорировать сигнал, быстрый источник и медленный клиент съедят всю память. `pipe` и `pipeline` соблюдают backpressure сами.',
              en: 'When the source is faster than the destination, data piles up in memory. The signal for this is [[backpressure|backpressure]]: `writable.write(chunk)` returns `false` once the internal buffer reaches `highWaterMark` bytes or more. The chunk is **accepted**, not lost, but you must stop writing and wait for the `drain` event. Ignore the signal, and a fast source with a slow client eats all the memory. `pipe` and `pipeline` respect backpressure by themselves.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "if (!out.write(chunk)) {\n  await once(out, 'drain');\n}",
            },
          },
          {
            type: 'check',
            check: {
              id: 'write-false-lost',
              prompt: {
                ru: '`write` вернул `false`. Что стало с переданным чанком?',
                en: '`write` returned `false`. What happened to the chunk you passed?',
              },
              options: [
                { text: { ru: 'Потерян — его нужно отправить снова', en: 'Lost — send it again' } },
                { text: { ru: 'Принят в буфер; дальше ждать `drain`', en: 'Accepted into the buffer; now wait for `drain`' } },
                { text: { ru: 'Поток закрылся с ошибкой', en: 'The stream closed with an error' } },
              ],
              answer: 1,
              explanation: {
                ru: '`false` — не ошибка, а просьба притормозить. Повторная отправка продублировала бы данные.',
                en: '`false` isn’t an error but a request to slow down. Sending again would duplicate the data.',
              },
            },
          },
        ],
        test: ['node-streams-backpressure-001', 'node-streams-write-backpressure-001'],
      },
      {
        id: 'pipeline',
        title: { ru: 'pipeline и Transform', en: 'pipeline and Transform' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Transform** — поток посередине: получает чанк, преобразует и отдаёт дальше через `callback(null, result)`. Так сжимают, шифруют и парсят данные на лету. `pipeline` из `node:stream/promises` соединяет цепочку, следит за backpressure и при ошибке в любом звене **уничтожает все** потоки — источник тоже, поэтому файлы и сокеты закрываются. Промис отклоняется с исходной ошибкой. Ручной `a.pipe(b).pipe(c)` ошибки между звеньями не передаёт.',
              en: 'A **Transform** is a stream in the middle: it receives a chunk, transforms it and passes it on via `callback(null, result)`. That’s how data is compressed, encrypted and parsed on the fly. `pipeline` from `node:stream/promises` connects the chain, handles backpressure and on an error in any link **destroys all** streams — the source too, so files and sockets get closed. The promise rejects with the original error. A manual `a.pipe(b).pipe(c)` doesn’t propagate errors between links.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "await pipeline(\n  fs.createReadStream('log.txt'),\n  zlib.createGzip(),\n  fs.createWriteStream('log.gz'),\n);",
            },
          },
        ],
        test: ['node-streams-transform-001', 'node-streams-pipeline-error-001'],
      },
      {
        id: 'iteration',
        title: { ru: 'for await и строки', en: 'for await and lines' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Readable-потоки — асинхронные итераторы: `for await (const chunk of stream)` читает чанки по одному и сам соблюдает backpressure — следующий чанк не запрашивается, пока тело цикла не закончит работу. Но чанки не совпадают с границами строк: строка может прийти разорванной между двумя кусками. Модуль `readline` копит текст и отдаёт только целые строки, а последнюю — по окончании потока. Так построчно обрабатывают огромные логи и CSV.',
              en: 'Readable streams are async iterators: `for await (const chunk of stream)` reads chunks one at a time and respects backpressure by itself — the next chunk isn’t requested until the loop body finishes. But chunks don’t align with line boundaries: a line can arrive split across two chunks. The `readline` module buffers text and yields only whole lines, the last one when the stream ends. That’s how huge logs and CSVs are processed line by line.',
            },
          },
        ],
        test: ['node-streams-async-iteration-001'],
      },
    ],
    keyPoints: [
      { ru: 'Длина строки ≠ число байтов; base64 — не шифрование.', en: 'String length ≠ byte count; base64 isn’t encryption.' },
      { ru: 'Большие файлы — потоками, а не `readFile`.', en: 'Big files go through streams, not `readFile`.' },
      { ru: '`write` вернул `false` — ждите `drain`.', en: '`write` returned `false` — wait for `drain`.' },
      { ru: '`pipeline` соблюдает backpressure и закрывает всё при ошибке.', en: '`pipeline` handles backpressure and closes everything on error.' },
      { ru: 'Строки из потока — через `readline`.', en: 'Lines from a stream — via `readline`.' },
    ],
    sources: [
      { title: 'Node.js — Stream', url: `${API}/stream.html` },
      { title: 'Node.js — Backpressuring in Streams', url: `${LEARN}/modules/backpressuring-in-streams` },
      { title: 'Node.js — Buffer', url: `${API}/buffer.html` },
      { title: 'Node.js — Readline', url: `${API}/readline.html` },
    ],
  },
  {
    tag: 'node-http',
    format: 'steps',
    summary: {
      ru: 'Под Express лежит голый модуль `http`: запрос, ответ, заголовки, статус. Express добавляет цепочку middleware — и почти все его загадки объясняются порядком этой цепочки и тем, вызвал ли кто-то `next()`.',
      en: 'Under Express lies the bare `http` module: request, response, headers, status. Express adds a middleware chain — and nearly all its puzzles come down to that chain’s order and whether someone called `next()`.',
    },
    steps: [
      {
        id: 'raw-http',
        title: { ru: 'Модуль http', en: 'The http module' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Голый `http.createServer` даёт обработчику `req` и `res`. Статус и заголовки ставят **до** `res.end`: заголовки уходят клиенту вместе с первым байтом тела, и после отправки ответа `setHeader` бросит `ERR_HTTP_HEADERS_SENT` — в Express это «Cannot set headers after they are sent». `req.url` содержит путь **вместе со строкой запроса**, например `/users?id=7`, — параметры разбирают через `new URL(req.url, \'http://localhost\')`.',
              en: 'A bare `http.createServer` gives the handler `req` and `res`. Status and headers are set **before** `res.end`: headers go to the client with the first byte of the body, and after the reply is sent `setHeader` throws `ERR_HTTP_HEADERS_SENT` — in Express it’s “Cannot set headers after they are sent”. `req.url` holds the path **with the query string**, like `/users?id=7` — parse parameters with `new URL(req.url, \'http://localhost\')`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type',\n    'text/plain');\n  res.end('ok');\n});",
            },
          },
        ],
        test: ['node-http-server-001', 'node-http-headers-sent-001'],
      },
      {
        id: 'middleware-chain',
        title: { ru: 'Цепочка middleware', en: 'The middleware chain' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Middleware и маршруты Express образуют цепочку **в порядке объявления**. Каждый участник обязан либо завершить ответ (`res.send`, `res.end`), либо передать управление дальше через `next()` — иначе запрос висит до таймаута. Если маршрут `/admin` объявлен раньше `app.use(requireAuth)`, он ответит и не вызовет `next()`, и до проверки дело не дойдёт: страница откроется без входа. Проверку подключают **до** защищённых маршрутов.',
              en: 'Express middleware and routes form a chain **in declaration order**. Each one must either finish the response (`res.send`, `res.end`) or pass control on with `next()` — otherwise the request hangs until a timeout. If the `/admin` route is declared before `app.use(requireAuth)`, it replies without calling `next()`, and the check never runs: the page opens without login. Register the check **before** protected routes.',
            },
          },
          { type: 'diagram', diagram: 'express-middleware-chain' },
        ],
        test: ['node-http-middleware-order-001', 'node-http-next-001'],
      },
      {
        id: 'body',
        title: { ru: 'Тело запроса', en: 'The request body' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Тело запроса приходит потоком байтов, и Express сам его не читает: без парсера `req.body` равен `undefined`. `app.use(express.json())` собирает тело запросов с `Content-Type: application/json`, разбирает и кладёт результат в `req.body`. Для форм есть `express.urlencoded()`, для файлов — отдельные библиотеки вроде multer. Парсеру можно задать лимит размера, чтобы огромное тело не съело память.',
              en: 'The request body arrives as a byte stream, and Express doesn’t read it by itself: without a parser `req.body` is `undefined`. `app.use(express.json())` collects the body of requests with `Content-Type: application/json`, parses it and puts the result into `req.body`. Forms have `express.urlencoded()`, files need libraries like multer. A parser can take a size limit so a huge body can’t eat memory.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'json-content-type',
              prompt: {
                ru: '`express.json()` подключён, но клиент шлёт JSON с `Content-Type: text/plain`. Что будет в `req.body`?',
                en: '`express.json()` is registered, but the client sends JSON with `Content-Type: text/plain`. What’s in `req.body`?',
              },
              options: [
                { text: { ru: 'Разобранный объект', en: 'The parsed object' } },
                { text: { ru: 'Парсер пропустит запрос, тело не разобрано', en: 'The parser skips the request; the body isn’t parsed' } },
                { text: { ru: 'Ошибка 500', en: 'A 500 error' } },
              ],
              answer: 1,
              explanation: {
                ru: '`express.json()` смотрит на `Content-Type` и обрабатывает только JSON. Чужой тип он пропускает дальше, не трогая тело.',
                en: '`express.json()` checks `Content-Type` and handles JSON only. Other types pass through untouched.',
              },
            },
          },
        ],
        test: ['node-http-body-001'],
      },
      {
        id: 'errors',
        title: { ru: 'Обработчик ошибок', en: 'The error handler' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Обработчик ошибок отличается от обычного middleware только **числом параметров** — четыре: `(err, req, res, next)`, даже если `next` не используется. Его подключают **после** всех маршрутов. Ошибки попадают туда из синхронного `throw` и из `next(error)`. В Express 5 отклонённый промис асинхронного обработчика тоже сам уходит в `next(err)`, а в Express 4 без `try/catch` или обёртки такой запрос просто зависал.',
              en: 'An error handler differs from regular middleware only by its **number of parameters** — four: `(err, req, res, next)`, even if `next` is unused. It’s registered **after** all routes. Errors reach it from a synchronous `throw` and from `next(error)`. In Express 5 a rejected promise from an async handler also goes to `next(err)` automatically, while in Express 4 such a request just hung without `try/catch` or a wrapper.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "app.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({\n    error: 'Internal error',\n  });\n});",
            },
          },
        ],
        test: ['node-http-error-handler-001'],
      },
    ],
    keyPoints: [
      { ru: 'Заголовки — до `res.end`; `req.url` содержит строку запроса.', en: 'Headers go before `res.end`; `req.url` includes the query string.' },
      { ru: 'Middleware идут по порядку; каждый отвечает или вызывает `next()`.', en: 'Middleware run in order; each replies or calls `next()`.' },
      { ru: 'Проверку входа — до защищённых маршрутов.', en: 'Auth checks go before protected routes.' },
      { ru: '`req.body` появляется только с `express.json()`.', en: '`req.body` appears only with `express.json()`.' },
      { ru: 'Обработчик ошибок — четыре параметра и в самом конце.', en: 'The error handler has four parameters and goes last.' },
    ],
    sources: [
      { title: 'Node.js — HTTP', url: `${API}/http.html` },
      { title: 'Express — Using middleware', url: `${EXPRESS}/guide/using-middleware/` },
      { title: 'Express — Error handling', url: `${EXPRESS}/guide/error-handling/` },
      { title: 'Express — express.json()', url: `${EXPRESS}/5x/api.html#express.json` },
    ],
  },
];
