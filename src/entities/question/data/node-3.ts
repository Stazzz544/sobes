import type { Question } from '../model/types';

const API = 'https://nodejs.org/api';
const LEARN = 'https://nodejs.org/learn';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const NODE_QUESTIONS_3: Question[] = [
  {
    id: 'node-event-loop-queues-001',
    kind: 'order',
    topic: 'node',
    tags: ['node-event-loop'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'CommonJS-модуль. Расставьте строки в порядке вывода.',
      en: 'A CommonJS module. Put the lines in output order.',
    },
    code: {
      lang: 'js',
      source: `Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('tick-1'));
queueMicrotask(() => console.log('microtask'));
process.nextTick(() => console.log('tick-2'));
console.log('sync');`,
    },
    items: [{ code: 'sync' }, { code: 'tick-1' }, { code: 'tick-2' }, { code: 'promise' }, { code: 'microtask' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'После синхронного кода Node сначала опустошает очередь `process.nextTick` целиком, а потом — очередь микрозадач, где `then` и `queueMicrotask` идут в порядке добавления. Оговорка: в ES-модуле порядок другой — модуль сам выполняется как асинхронная задача, и микрозадачи успевают раньше `nextTick`. Поэтому на порядок между ними лучше не полагаться.',
          en: 'After synchronous code Node first drains the whole `process.nextTick` queue, then the microtask queue, where `then` and `queueMicrotask` run in insertion order. Caveat: in an ES module the order differs — the module itself runs as an async task, so microtasks run before `nextTick`. So don’t rely on the order between them.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Understanding process.nextTick()', url: `${LEARN}/asynchronous-work/understanding-processnexttick` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-http-server-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-http'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const http = require('node:http');

const server = http.createServer((req, res) => {
  res.statusCode = 201;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ path: req.url }));
});

server.listen(0, '127.0.0.1', async () => {
  const { port } = server.address();
  const response = await fetch(\`http://127.0.0.1:\${port}/users?id=7\`);
  const body = await response.json();
  console.log(response.status, body.path);
  server.close();
});`,
    },
    answers: ['201 /users?id=7'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Голый `http` — основа Express и остальных фреймворков: обработчик получает `req` и `res`, статус и заголовки ставят до `res.end`. `req.url` содержит путь **вместе со строкой запроса** — параметры разбирают сами: `new URL(req.url, \'http://localhost\').searchParams`. Порт `0` просит ОС выдать свободный — удобно в тестах.',
          en: 'Plain `http` is the base of Express and other frameworks: the handler gets `req` and `res`, and status and headers are set before `res.end`. `req.url` holds the path **together with the query string** — parse params yourself: `new URL(req.url, \'http://localhost\').searchParams`. Port `0` asks the OS for a free one — handy in tests.',
        },
      },
    ],
    sources: [{ title: 'Node.js — HTTP', url: `${API}/http.html` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-streams-transform-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-streams'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { Readable, Transform, Writable } = require('node:stream');
const { pipeline } = require('node:stream/promises');

const chunks = [];

pipeline(
  Readable.from(['node', 'js']),
  new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase());
    },
  }),
  new Writable({
    write(chunk, encoding, callback) {
      chunks.push(chunk.toString());
      callback();
    },
  }),
).then(() => console.log(chunks.join('.')));`,
    },
    answers: ['NODE.JS'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Transform** — поток посередине: получает чанк, преобразует и отдаёт дальше через `callback(null, result)`. `pipeline` из `node:stream/promises` соединяет цепочку, следит за backpressure и возвращает промис, который выполнится, когда всё записано, или отклонится при ошибке любого звена. Так строят сжатие, парсинг CSV, шифрование на лету.',
          en: 'A **Transform** is a stream in the middle: it receives a chunk, transforms it and passes it on via `callback(null, result)`. `pipeline` from `node:stream/promises` connects the chain, handles backpressure and returns a promise that resolves once everything is written or rejects if any stage fails. That’s how on-the-fly compression, CSV parsing and encryption are built.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Duplex and transform streams', url: `${API}/stream.html#duplex-and-transform-streams` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-async-events-once-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { EventEmitter, once } = require('node:events');

const emitter = new EventEmitter();

(async () => {
  setTimeout(() => emitter.emit('ready', 'db', 5432), 10);
  const [name, port] = await once(emitter, 'ready');
  console.log(name, port);
})();`,
    },
    answers: ['db 5432'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`events.once` превращает одно событие в промис: он выполнится массивом аргументов события, а если раньше придёт `error` — отклонится. Это удобный мост между событиями и `async/await`: дождаться `listening` у сервера, `open` у соединения или `drain` у потока. Принимает и `AbortSignal` для отмены ожидания.',
          en: '`events.once` turns one event into a promise: it resolves with the event’s argument array, and rejects if `error` comes first. It’s a handy bridge between events and `async/await`: wait for a server’s `listening`, a connection’s `open` or a stream’s `drain`. It also accepts an `AbortSignal` to cancel waiting.',
        },
      },
    ],
    sources: [{ title: 'Node.js — events.once()', url: `${API}/events.html#eventsonceemitter-name-options` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-async-parallel-files-001',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Нужно прочитать 200 независимых файлов. Какой вариант быстрее и при этом не упрётся в лимит открытых файлов?',
      en: 'You need to read 200 independent files. Which option is faster and won’t hit the open-file limit?',
    },
    options: [
      { code: 'for (const file of files) {\n  results.push(await readFile(file, \'utf8\'));\n}' },
      { code: "files.forEach(async (file) => results.push(await readFile(file, 'utf8')));" },
      { text: { ru: 'Параллельно пачками, например по 20: `Promise.all` для каждой пачки', en: 'In parallel batches, say 20 at a time: `Promise.all` per batch' } },
      { code: "files.map((file) => readFileSync(file, 'utf8'));" },
      { text: { ru: 'Запустить 200 воркеров', en: 'Start 200 workers' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`await` в цикле читает файлы строго по очереди. `forEach` с `async` не ждёт промисы — код после него увидит пустой `results`. `readFileSync` блокирует поток. Параллельное чтение быстрее, но 10 000 одновременных операций упрутся в лимит открытых файлов (`EMFILE`), поэтому ограничивают параллельность: пачками или пулом (`p-limit`). Для 200 файлов часто хватает и одного `Promise.all`.',
          en: '`await` in a loop reads files strictly one by one. `forEach` with `async` doesn’t wait for promises — code after it sees an empty `results`. `readFileSync` blocks the thread. Parallel reads are faster, but 10,000 simultaneous operations hit the open-file limit (`EMFILE`), so concurrency is bounded: batches or a pool (`p-limit`). For 200 files a single `Promise.all` is often fine.',
        },
      },
    ],
    sources: [{ title: 'Node.js — fs promises API', url: `${API}/fs.html#promises-api` }],
  },
  {
    id: 'node-modules-resolution-001',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Где Node.js ищет пакет при `require(\'lodash\')` в файле `/app/src/utils/date.js`?',
      en: 'Where does Node.js look for the package on `require(\'lodash\')` in `/app/src/utils/date.js`?',
    },
    options: [
      { text: { ru: 'Только в глобальной папке npm', en: 'Only in the global npm folder' } },
      {
        text: {
          ru: 'В `node_modules` текущей папки, затем родительских: `/app/src/utils`, `/app/src`, `/app`, `/` — до первого найденного',
          en: 'In `node_modules` of the current folder, then its parents: `/app/src/utils`, `/app/src`, `/app`, `/` — until the first match',
        },
      },
      { text: { ru: 'Скачивает из npm при первом вызове', en: 'Downloads it from npm on first call' } },
      { text: { ru: 'Только в `/app/node_modules`, указанной в `package.json`', en: 'Only in `/app/node_modules` listed in `package.json`' } },
      { text: { ru: 'В папке, где лежит исполняемый файл `node`', en: 'In the folder containing the `node` executable' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Голое имя пакета Node ищет в `node_modules`, поднимаясь по дереву папок от файла, который делает `require`. Внутри пакета точку входа определяют `exports` (если есть) или `main` в его `package.json`. На этом держатся монорепо: пакет в корневом `node_modules` виден всем вложенным проектам — и отсюда же «фантомные» зависимости, не указанные в своём `package.json`.',
          en: 'Node looks up a bare package name in `node_modules`, walking up the folder tree from the requiring file. Inside the package, the entry point comes from `exports` (if present) or `main` in its `package.json`. Monorepos rely on this: a package in the root `node_modules` is visible to all nested projects — which also causes “phantom” dependencies missing from a project’s own `package.json`.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Loading from node_modules folders', url: `${API}/modules.html#loading-from-node_modules-folders` }],
  },
  {
    id: 'node-runtime-env-file-001',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Как в современном Node.js загрузить переменные из `.env` без пакета `dotenv`?',
      en: 'How do you load variables from `.env` in modern Node.js without the `dotenv` package?',
    },
    options: [
      { code: 'node app.js < .env' },
      { code: 'node --env-file=.env app.js' },
      { code: "require('.env');" },
      { code: 'process.env = JSON.parse(".env");' },
      { text: { ru: 'Никак, без `dotenv` нельзя', en: 'Impossible without `dotenv`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Флаг `--env-file` появился в Node 20.6, а из кода то же делает `process.loadEnvFile()`. Значения попадают в `process.env` строками, уже заданные переменные окружения по умолчанию не перезаписываются. Сам `.env` с секретами в git не коммитят — в репозитории держат `.env.example` с пустыми значениями.',
          en: 'The `--env-file` flag arrived in Node 20.6, and `process.loadEnvFile()` does the same from code. Values land in `process.env` as strings, and variables already set in the environment aren’t overwritten by default. Don’t commit `.env` with secrets — keep a `.env.example` with empty values in the repo.',
        },
      },
    ],
    sources: [
      { title: 'Node.js — CLI: --env-file', url: `${API}/cli.html#--env-filefile` },
      { title: 'Node.js — process.loadEnvFile()', url: `${API}/process.html#processloadenvfilepath` },
    ],
  },
  {
    id: 'node-runtime-test-runner-001',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Можно ли писать тесты для Node.js-библиотеки без Jest и Vitest?',
      en: 'Can you test a Node.js library without Jest or Vitest?',
    },
    options: [
      { text: { ru: 'Нет, в Node нет инструментов для тестов', en: 'No, Node has no testing tools' } },
      {
        text: {
          ru: 'Да: встроенный раннер `node:test` с `node:assert`, запуск — `node --test`, есть моки и покрытие',
          en: 'Yes: the built-in `node:test` runner with `node:assert`, run via `node --test`, with mocks and coverage',
        },
      },
      { text: { ru: 'Только через `console.assert`', en: 'Only via `console.assert`' } },
      { text: { ru: 'Только в браузере', en: 'Only in the browser' } },
      { text: { ru: 'Да, но только для TypeScript', en: 'Yes, but only for TypeScript' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`node:test` появился в Node 18 и давно стабилен: `test`/`describe`, хуки, моки функций и таймеров, снапшоты, отчёты и покрытие (`--experimental-test-coverage`). Для библиотек и бэкенда без сборки этого часто достаточно — меньше зависимостей и конфигов. Для фронтенда с JSX и DOM удобнее Vitest или Jest.',
          en: '`node:test` arrived in Node 18 and has long been stable: `test`/`describe`, hooks, function and timer mocks, snapshots, reporters and coverage (`--experimental-test-coverage`). For libraries and build-free backends it’s often enough — fewer dependencies and configs. For frontend with JSX and the DOM, Vitest or Jest is more convenient.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Test runner', url: `${API}/test.html` }],
  },
  {
    id: 'node-runtime-typescript-001',
    topic: 'node',
    tags: ['node-runtime', 'node-modules'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Свежий Node.js запускает `node app.ts` без сборки. Что при этом происходит с типами?',
      en: 'Recent Node.js runs `node app.ts` without a build. What happens to the types?',
    },
    options: [
      { text: { ru: 'Node проверяет типы, как `tsc`, и падает при ошибке', en: 'Node type-checks like `tsc` and fails on errors' } },
      {
        text: {
          ru: 'Аннотации типов просто вырезаются, проверки типов нет; `enum` и пространства имён с кодом не поддерживаются',
          en: 'Type annotations are simply stripped, there’s no type checking; `enum`s and namespaces with code aren’t supported',
        },
      },
      { text: { ru: 'Node компилирует TypeScript в C++', en: 'Node compiles TypeScript to C++' } },
      { text: { ru: 'Типы превращаются в проверки во время выполнения', en: 'Types become runtime checks' } },
      { text: { ru: 'Работает только с `tsconfig.json` в корне', en: 'It only works with a root `tsconfig.json`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Type stripping** включён по умолчанию с Node 23.6 и 22.18: Node стирает аннотации и выполняет оставшийся JavaScript. Поэтому работает только «стираемый» синтаксис — `enum`, пространства имён с кодом и параметры-свойства конструктора требуют сторонних инструментов вроде `tsx`. Типы по-прежнему проверяет `tsc --noEmit` в CI.',
          en: '**Type stripping** is on by default since Node 23.6 and 22.18: Node erases annotations and runs the remaining JavaScript. So only “erasable” syntax works — `enum`s, namespaces with code and constructor parameter properties need third-party tools like `tsx`. Types are still checked by `tsc --noEmit` in CI.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Modules: TypeScript', url: `${API}/typescript.html` }],
  },
  {
    id: 'node-modules-require-esm-001',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'CommonJS-код делает `require(\'./config.mjs\')`, а в этом ES-модуле есть `await` на верхнем уровне. Что будет в актуальном Node.js?',
      en: 'CommonJS code calls `require(\'./config.mjs\')`, and that ES module has a top-level `await`. What happens in current Node.js?',
    },
    options: [
      { text: { ru: 'Модуль загрузится, `require` дождётся `await`', en: 'The module loads, `require` waits for the `await`' } },
      { text: { ru: '`require` вернёт промис', en: '`require` returns a promise' } },
      {
        text: {
          ru: 'Ошибка `ERR_REQUIRE_ASYNC_MODULE`: синхронный `require` умеет загружать ES-модули, но только без `await` на верхнем уровне',
          en: '`ERR_REQUIRE_ASYNC_MODULE`: synchronous `require` can load ES modules, but only without top-level `await`',
        },
      },
      { text: { ru: '`require` вообще не умеет загружать ES-модули', en: '`require` can’t load ES modules at all' } },
      { text: { ru: 'Node сам перепишет модуль в CommonJS', en: 'Node rewrites the module into CommonJS' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Долгое время `require` не мог загружать ES-модули совсем. Начиная с Node 22.12 и 20.19 `require(esm)` работает, но `require` синхронный, поэтому модуль с `await` на верхнем уровне так загрузить нельзя — для него нужен динамический `import()`, возвращающий промис. Это упрощает переход библиотек на ESM без поломки старых потребителей.',
          en: 'For a long time `require` couldn’t load ES modules at all. Since Node 22.12 and 20.19 `require(esm)` works, but `require` is synchronous, so a module with top-level `await` can’t be loaded this way — it needs dynamic `import()`, which returns a promise. This eases moving libraries to ESM without breaking older consumers.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Loading ECMAScript modules using require()', url: `${API}/modules.html#loading-ecmascript-modules-using-require` }],
  },
];
