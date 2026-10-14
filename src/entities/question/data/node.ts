import type { Question } from '../model/types';

const API = 'https://nodejs.org/api';
const LEARN = 'https://nodejs.org/learn';
const EXPRESS = 'https://expressjs.com/en';

export const NODE_QUESTIONS: Question[] = [
  {
    id: 'node-runtime-globals-001',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Чего нет в Node.js без сторонних пакетов?',
      en: 'What does Node.js lack without third-party packages?',
    },
    options: [
      { code: 'process' },
      { code: 'Buffer' },
      { code: 'document' },
      { code: 'setImmediate' },
      { code: 'fetch' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Node.js — это движок V8 и библиотека libuv без браузера: DOM, `window` и `document` здесь нет. Зато есть то, чего нет в браузере: `process`, `Buffer`, `setImmediate`, модули `fs` и `http`. Глобальный объект доступен как `globalThis`, а `fetch` встроен начиная с Node 18.',
          en: 'Node.js is the V8 engine plus libuv without a browser: there’s no DOM, `window` or `document`. Instead it has things browsers lack: `process`, `Buffer`, `setImmediate`, the `fs` and `http` modules. The global object is `globalThis`, and `fetch` is built in since Node 18.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Differences between Node.js and the Browser', url: `${LEARN}/getting-started/differences-between-nodejs-and-the-browser` }],
  },
  {
    id: 'node-runtime-threads-001',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Насколько Node.js «однопоточный»?', en: 'How “single-threaded” is Node.js?' },
    options: [
      { text: { ru: 'Полностью: всё, включая чтение файлов, идёт в одном потоке', en: 'Fully: everything, including file reads, runs on one thread' } },
      {
        text: {
          ru: 'JavaScript выполняется в одном главном потоке, а файловые операции, DNS, сжатие и часть крипто libuv отдаёт пулу потоков',
          en: 'JavaScript runs on one main thread, while libuv hands file operations, DNS, compression and some crypto to a thread pool',
        },
      },
      { text: { ru: 'Каждый HTTP-запрос обрабатывается в своём потоке', en: 'Each HTTP request is handled on its own thread' } },
      { text: { ru: 'Node.js запускает столько потоков JavaScript, сколько ядер у процессора', en: 'Node.js runs as many JavaScript threads as there are CPU cores' } },
      { text: { ru: 'Потоков нет совсем, асинхронность — это иллюзия', en: 'There are no threads at all, async is an illusion' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ваш код и колбэки выполняются в одном потоке — поэтому тяжёлое синхронное вычисление останавливает весь сервер. Сетевой ввод-вывод неблокирующий средствами ОС, а операции без асинхронного API в ОС (`fs`, `dns.lookup`, `zlib`, `crypto.pbkdf2`) libuv выполняет в пуле потоков (по умолчанию 4). Для своих тяжёлых вычислений есть `worker_threads`.',
          en: 'Your code and callbacks run on one thread — that’s why a heavy synchronous computation stalls the whole server. Network I/O is non-blocking via the OS, while operations without an async OS API (`fs`, `dns.lookup`, `zlib`, `crypto.pbkdf2`) are run by libuv in a thread pool (4 by default). For your own heavy computations there’s `worker_threads`.',
        },
      },
    ],
    sources: [
      { title: 'Node.js — Don’t Block the Event Loop', url: `${LEARN}/asynchronous-work/dont-block-the-event-loop` },
      { title: 'Node.js — Worker threads', url: `${API}/worker_threads.html` },
    ],
  },
  {
    id: 'node-runtime-env-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `process.env.PORT = 3000;
const port = process.env.PORT + 1;

console.log(port);`,
    },
    answers: ['30001'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Значения в `process.env` — всегда строки: при записи `3000` превращается в `\'3000\'`, и `+ 1` склеивает строки. Переменные окружения парсят явно: `Number(process.env.PORT ?? 8080)`, а ещё лучше — проверяют схемой при старте приложения.',
          en: 'Values in `process.env` are always strings: on assignment `3000` becomes `\'3000\'`, and `+ 1` concatenates. Parse environment variables explicitly: `Number(process.env.PORT ?? 8080)`, or better, validate them with a schema at startup.',
        },
      },
    ],
    sources: [{ title: 'Node.js — process.env', url: `${API}/process.html#processenv` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-runtime-exit-code-001',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'CLI-скрипт нашёл ошибки и должен завершиться с ненулевым кодом, не потеряв последние строки лога. Как лучше?',
      en: 'A CLI script found errors and must exit with a non-zero code without losing the last log lines. What’s best?',
    },
    options: [
      { code: 'process.exit(1);' },
      { code: 'process.exitCode = 1;' },
      { code: "throw 'failed';" },
      { code: 'return 1;' },
      { code: 'console.error(1);' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`process.exit()` завершает процесс сразу, даже если запись в `stdout` или другие асинхронные операции ещё не закончились, — хвост лога может пропасть. `process.exitCode = 1` лишь задаёт код: процесс завершится сам, когда цикл событий опустеет. CI смотрит именно на код выхода: 0 — успех, всё остальное — падение.',
          en: '`process.exit()` ends the process immediately, even if writes to `stdout` or other async work haven’t finished — the end of the log may be lost. `process.exitCode = 1` only sets the code: the process exits by itself once the event loop is empty. CI looks at the exit code: 0 means success, anything else is a failure.',
        },
      },
    ],
    sources: [{ title: 'Node.js — process.exit()', url: `${API}/process.html#processexitcode` }],
  },
  {
    id: 'node-modules-exports-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какие ключи экспортирует этот CommonJS-модуль? Впишите, что выведет код.',
      en: 'Which keys does this CommonJS module export? Type what the code prints.',
    },
    code: {
      lang: 'js',
      source: `exports.a = 1;
exports = { b: 2 };
module.exports.c = 3;

console.log(Object.keys(module.exports).join(','));`,
    },
    answers: ['a,c'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`exports` — всего лишь переменная, которая изначально указывает на `module.exports`. Добавлять в неё свойства можно, а присваивание `exports = {…}` лишь перенаправляет переменную, и модуль это не видит. `require` возвращает именно `module.exports`, поэтому `b` потерялся.',
          en: '`exports` is just a variable that initially points to `module.exports`. Adding properties to it works, but assigning `exports = {…}` only rebinds the variable, and the module doesn’t see it. `require` returns `module.exports`, so `b` is lost.',
        },
      },
    ],
    sources: [{ title: 'Node.js — exports shortcut', url: `${API}/modules.html#exports-shortcut` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-modules-cache-001',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет `main.js`?', en: 'What does `main.js` print?' },
    code: {
      lang: 'js',
      source: `// counter.js
console.log('init');
let count = 0;
module.exports = { increment: () => ++count };

// main.js
const first = require('./counter');
const second = require('./counter');
first.increment();
console.log(second.increment());`,
    },
    options: [
      { code: 'init\ninit\n1' },
      { code: 'init\n2' },
      { code: 'init\n1' },
      { code: 'init\ninit\n2' },
      { code: '1' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модуль выполняется один раз — при первом `require`, а результат кешируется по полному пути файла. Второй `require` возвращает тот же объект, поэтому `first` и `second` делят один счётчик. На этом держатся «синглтоны» вроде подключения к базе, созданного в модуле. ES-модули тоже выполняются один раз.',
          en: 'A module runs once — on the first `require` — and the result is cached by the full file path. The second `require` returns the same object, so `first` and `second` share one counter. Module-level “singletons” like a database connection rely on this. ES modules also run only once.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Modules: Caching', url: `${API}/modules.html#caching` }],
  },
  {
    id: 'node-modules-semver-001',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В `package.json` указано `"ui-kit": "^1.4.2"`. Какую версию npm **не** установит?',
      en: '`package.json` has `"ui-kit": "^1.4.2"`. Which version will npm **not** install?',
    },
    options: [
      { code: '1.4.3' },
      { code: '1.9.0' },
      { code: '1.10.1' },
      { code: '2.0.0' },
      { code: '1.4.9' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Версия — `MAJOR.MINOR.PATCH`. `^` разрешает всё, что не меняет первую ненулевую цифру: `^1.4.2` — это `>=1.4.2 <2.0.0`, ведь мажорная версия может ломать API. `~1.4.2` строже — только патчи, `<1.5.0`. Для версий `0.x` каретка сужается: `^0.4.2` значит `<0.5.0`.',
          en: 'A version is `MAJOR.MINOR.PATCH`. `^` allows anything that keeps the first non-zero digit: `^1.4.2` means `>=1.4.2 <2.0.0`, since a major version may break the API. `~1.4.2` is stricter — patches only, `<1.5.0`. For `0.x` versions the caret narrows: `^0.4.2` means `<0.5.0`.',
        },
      },
    ],
    sources: [
      { title: 'npm — About semantic versioning', url: 'https://docs.npmjs.com/about-semantic-versioning/' },
      { title: 'node-semver — Caret ranges', url: 'https://github.com/npm/node-semver#caret-ranges-123-025-004' },
    ],
  },
  {
    id: 'node-modules-type-001',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что прежде всего определяет, загрузит ли Node.js файл `.js` как CommonJS или как ES-модуль?',
      en: 'What primarily decides whether Node.js loads a `.js` file as CommonJS or as an ES module?',
    },
    options: [
      { text: { ru: 'Поле `"type"` в ближайшем `package.json`', en: 'The `"type"` field in the nearest `package.json`' } },
      { text: { ru: 'Поле `"main"` в `package.json`', en: 'The `"main"` field in `package.json`' } },
      { text: { ru: 'Версия Node.js', en: 'The Node.js version' } },
      { text: { ru: 'Настройка `"module"` в `tsconfig.json`', en: 'The `"module"` option in `tsconfig.json`' } },
      { text: { ru: 'Имя папки, где лежит файл', en: 'The name of the folder containing the file' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`"type": "module"` в ближайшем `package.json` делает `.js` ES-модулями, `"commonjs"` или отсутствие поля — CommonJS. Расширения сильнее поля: `.mjs` — всегда ESM, `.cjs` — всегда CommonJS. Если поля нет, свежие версии Node ещё и смотрят на синтаксис: файл с `import`/`export` загрузят как ESM, но явное поле надёжнее и быстрее.',
          en: '`"type": "module"` in the nearest `package.json` makes `.js` files ES modules; `"commonjs"` or no field means CommonJS. Extensions win over the field: `.mjs` is always ESM, `.cjs` always CommonJS. Without the field, recent Node versions also look at the syntax: a file with `import`/`export` loads as ESM, but an explicit field is more reliable and faster.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Packages: type', url: `${API}/packages.html#type` }],
  },
  {
    id: 'node-modules-dirname-001',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'После перехода на `"type": "module"` строка `path.join(__dirname, \'data.json\')` падает с `ReferenceError`. Чем заменить `__dirname`?',
      en: 'After switching to `"type": "module"`, `path.join(__dirname, \'data.json\')` throws a `ReferenceError`. What replaces `__dirname`?',
    },
    options: [
      { code: 'process.cwd()' },
      { code: 'import.meta.dirname' },
      { code: 'globalThis.__dirname' },
      { code: 'require.main.path' },
      { code: "new URL('.').pathname" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В ES-модулях нет `__dirname`, `__filename` и `require` — это переменные обёртки CommonJS. Папку модуля даёт `import.meta.dirname` (Node 20.11+), в старых версиях — `path.dirname(fileURLToPath(import.meta.url))`. `process.cwd()` — папка, **откуда запустили** процесс, она может быть любой.',
          en: 'ES modules have no `__dirname`, `__filename` or `require` — those are CommonJS wrapper variables. The module’s folder is `import.meta.dirname` (Node 20.11+), or `path.dirname(fileURLToPath(import.meta.url))` in older versions. `process.cwd()` is the folder the process was **started from**, which can be anything.',
        },
      },
    ],
    sources: [{ title: 'Node.js — import.meta.dirname', url: `${API}/esm.html#importmetadirname` }],
  },
  {
    id: 'node-event-loop-order-001',
    kind: 'order',
    topic: 'node',
    tags: ['node-event-loop'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Расставьте строки в том порядке, в котором они попадут в консоль.',
      en: 'Put the lines in the order they will be logged.',
    },
    code: {
      lang: 'js',
      source: `const fs = require('node:fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  Promise.resolve().then(() => console.log('promise'));
  process.nextTick(() => console.log('tick'));
  console.log('callback');
});`,
    },
    items: [{ code: 'callback' }, { code: 'tick' }, { code: 'promise' }, { code: 'immediate' }, { code: 'timeout' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сначала синхронный код колбэка. Сразу после него Node опустошает очередь `process.nextTick`, затем микрозадачи промисов. Колбэк `readFile` выполнялся в фазе poll, следующая фаза — check, где выполняется `setImmediate`, а таймеры — только на следующем витке цикла.',
          en: 'First the callback’s synchronous code. Right after it Node drains the `process.nextTick` queue, then promise microtasks. The `readFile` callback ran in the poll phase; the next phase is check, where `setImmediate` runs, while timers wait for the next loop iteration.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Внутри колбэка ввода-вывода порядок `immediate` → `timeout` гарантирован. А в главном модуле порядок `setTimeout(…, 0)` и `setImmediate` не определён — зависит от того, как быстро запустился процесс.',
          en: 'Inside an I/O callback the order `immediate` → `timeout` is guaranteed. In the main module, though, the order of `setTimeout(…, 0)` and `setImmediate` is undefined — it depends on how fast the process started.',
        },
      },
    ],
    sources: [
      { title: 'Node.js — The Node.js Event Loop', url: `${LEARN}/asynchronous-work/event-loop-timers-and-nexttick` },
      { title: 'Node.js — Understanding setImmediate()', url: `${LEARN}/asynchronous-work/understanding-setimmediate` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-event-loop-nexttick-001',
    topic: 'node',
    tags: ['node-event-loop'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Функция рекурсивно планирует себя через `process.nextTick`. Что станет с сервером?',
      en: 'A function recursively schedules itself via `process.nextTick`. What happens to the server?',
    },
    code: { lang: 'js', source: `function poll() {\n  checkQueue();\n  process.nextTick(poll);\n}\npoll();` },
    options: [
      { text: { ru: 'Ничего: между вызовами сервер успевает обработать запросы', en: 'Nothing: the server handles requests between calls' } },
      {
        text: {
          ru: 'Сервер перестанет отвечать: очередь `nextTick` выполняется до ввода-вывода, и цикл событий дальше не пойдёт',
          en: 'The server stops responding: the `nextTick` queue runs before I/O, and the event loop never moves on',
        },
      },
      { text: { ru: 'Node выбросит ошибку переполнения стека', en: 'Node throws a stack overflow error' } },
      { text: { ru: 'Вызовы автоматически переедут в пул потоков', en: 'The calls automatically move to the thread pool' } },
      { text: { ru: 'Node сам заменит `nextTick` на `setImmediate`', en: 'Node replaces `nextTick` with `setImmediate` itself' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Очередь `nextTick` опустошается целиком, прежде чем цикл событий перейдёт дальше, — а она никогда не пустеет. Ввод-вывод и таймеры «голодают». Стек не переполнится: каждый вызов начинается с чистого стека. Для повторяющейся работы, которая должна пропускать ввод-вывод вперёд, используют `setImmediate`.',
          en: 'The `nextTick` queue is drained completely before the event loop moves on — and it never empties. I/O and timers starve. The stack won’t overflow: each call starts on a clean stack. For repeated work that should let I/O through, use `setImmediate`.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Understanding process.nextTick()', url: `${LEARN}/asynchronous-work/understanding-processnexttick` }],
  },
  {
    id: 'node-event-loop-blocking-001',
    topic: 'node',
    tags: ['node-event-loop'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В обработчике `/report` синхронный цикл считает отчёт 3 секунды. Что происходит с другими запросами в это время?',
      en: 'The `/report` handler runs a synchronous loop for 3 seconds. What happens to other requests meanwhile?',
    },
    options: [
      { text: { ru: 'Обрабатываются параллельно в других потоках', en: 'They’re processed in parallel on other threads' } },
      { text: { ru: 'Ждут: пока цикл не закончится, сервер не отвечает никому', en: 'They wait: until the loop ends, the server answers nobody' } },
      { text: { ru: 'Получают ошибку 503 автоматически', en: 'They get a 503 error automatically' } },
      { text: { ru: 'Ждут только запросы к `/report`', en: 'Only requests to `/report` wait' } },
      { text: { ru: 'Node прерывает цикл через секунду', en: 'Node interrupts the loop after a second' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Синхронный код занимает единственный поток JavaScript, и цикл событий не может принять ни один запрос, даже к `/health`. Решения: асинхронные API, вынос расчёта в `worker_threads` или отдельную очередь задач, разбиение работы на части через `setImmediate`. Сюда же относятся `*Sync`-методы `fs` и тяжёлые регулярные выражения в обработчиках.',
          en: 'Synchronous code holds the only JavaScript thread, and the event loop can’t accept any request, even to `/health`. Fixes: async APIs, moving the computation to `worker_threads` or a job queue, splitting work into chunks via `setImmediate`. The same goes for `fs` `*Sync` methods and heavy regexes in handlers.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Don’t Block the Event Loop', url: `${LEARN}/asynchronous-work/dont-block-the-event-loop` }],
  },
  {
    id: 'node-async-error-first-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `const fs = require('node:fs');

fs.readFile('./no-such-file.txt', 'utf8', (error, data) => {
  console.log(error.code);
});`,
    },
    answers: ['ENOENT'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Колбэки Node устроены по схеме **error-first**: первым аргументом приходит ошибка или `null`, вторым — результат. У системных ошибок есть `code`: `ENOENT` — файла нет, `EACCES` — нет прав, `EADDRINUSE` — порт занят. Проверять ошибку обязательно: при ней `data` равно `undefined`.',
          en: 'Node callbacks follow the **error-first** convention: the first argument is an error or `null`, the second is the result. System errors have a `code`: `ENOENT` — no such file, `EACCES` — permission denied, `EADDRINUSE` — port in use. Always check the error: when it’s set, `data` is `undefined`.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Common system errors', url: `${API}/errors.html#common-system-errors` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-async-promisify-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `const { promisify } = require('node:util');

const double = (value, callback) => {
  setTimeout(() => callback(null, value * 2), 10);
};
const doubleAsync = promisify(double);

doubleAsync(21).then((result) => console.log(result));`,
    },
    answers: ['42'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`util.promisify` превращает функцию с error-first колбэком в функцию, возвращающую промис: `callback(null, value)` выполняет его со значением, `callback(error)` — отклоняет. Для стандартных модулей обёртки уже есть: `node:fs/promises`, `node:timers/promises`, `node:dns/promises`.',
          en: '`util.promisify` turns a function with an error-first callback into one that returns a promise: `callback(null, value)` resolves it, `callback(error)` rejects it. Standard modules already have wrappers: `node:fs/promises`, `node:timers/promises`, `node:dns/promises`.',
        },
      },
    ],
    sources: [{ title: 'Node.js — util.promisify()', url: `${API}/util.html#utilpromisifyoriginal` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-async-unhandled-001',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Промис в обработчике отклонился, а `catch` нигде нет. Что сделает Node.js 15+ по умолчанию?',
      en: 'A promise in a handler rejects with no `catch` anywhere. What does Node.js 15+ do by default?',
    },
    options: [
      { text: { ru: 'Молча проигнорирует ошибку', en: 'Silently ignore the error' } },
      { text: { ru: 'Выведет предупреждение и продолжит работу', en: 'Print a warning and keep running' } },
      { text: { ru: 'Завершит процесс с ненулевым кодом', en: 'Exit the process with a non-zero code' } },
      { text: { ru: 'Повторит промис ещё раз', en: 'Retry the promise once more' } },
      { text: { ru: 'Вернёт клиенту ответ 500', en: 'Send a 500 response to the client' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'С Node 15 режим `--unhandled-rejections` по умолчанию `throw`: необработанное отклонение становится исключением и роняет процесс, как и `uncaughtException`. Раньше было только предупреждение, и ошибки терялись. Поэтому каждый промис доводят до `catch`/`try…await`, а процесс держат под менеджером, который его перезапустит.',
          en: 'Since Node 15 `--unhandled-rejections` defaults to `throw`: an unhandled rejection becomes an exception and crashes the process, like `uncaughtException`. Before, it was only a warning, and errors got lost. So every promise ends in `catch`/`try…await`, and the process runs under a manager that restarts it.',
        },
      },
    ],
    sources: [{ title: 'Node.js — --unhandled-rejections', url: `${API}/cli.html#--unhandled-rejectionsmode` }],
  },
  {
    id: 'node-async-emitter-001',
    kind: 'order',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Расставьте строки в том порядке, в котором они попадут в консоль.',
      en: 'Put the lines in the order they will be logged.',
    },
    code: {
      lang: 'js',
      source: `const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();
emitter.on('save', () => console.log('listener'));
emitter.on('save', () => setImmediate(() => console.log('deferred')));

console.log('before');
emitter.emit('save');
console.log('after');`,
    },
    items: [{ code: 'before' }, { code: 'listener' }, { code: 'after' }, { code: 'deferred' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`emit` вызывает слушателей **синхронно** и по порядку подписки — это не очередь событий. Поэтому `listener` печатается до `after`. Отложить работу слушатель может сам: `setImmediate` или `queueMicrotask`. Особое событие `error` без слушателя бросает исключение и роняет процесс.',
          en: '`emit` calls listeners **synchronously** in subscription order — it’s not an event queue. So `listener` prints before `after`. A listener can defer work itself: `setImmediate` or `queueMicrotask`. The special `error` event with no listener throws and crashes the process.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Events', url: `${API}/events.html` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-streams-readfile-001',
    topic: 'node',
    tags: ['node-streams'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Сервер отдаёт файлы по 2 ГБ через `fs.readFile`, и под нагрузкой процесс падает по памяти. Как отдавать правильно?',
      en: 'A server sends 2 GB files via `fs.readFile`, and under load the process runs out of memory. What’s the right way?',
    },
    options: [
      { code: "res.end(fs.readFileSync(filePath));" },
      { code: "pipeline(fs.createReadStream(filePath), res, onDone);" },
      { code: "res.end(await fs.promises.readFile(filePath));" },
      { code: "res.end(JSON.stringify(await fs.promises.readFile(filePath)));" },
      { code: "res.end(Buffer.alloc(fs.statSync(filePath).size));" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`readFile` и `readFileSync` читают файл в память целиком: десять одновременных скачиваний — 20 ГБ. Поток читает файл кусками (по 64 КБ) и отдаёт их по мере отправки, так что память не растёт с размером файла. `pipeline` ещё и закрывает оба потока при ошибке.',
          en: '`readFile` and `readFileSync` load the whole file into memory: ten concurrent downloads mean 20 GB. A stream reads the file in chunks (64 KB) and passes them on as they’re sent, so memory doesn’t grow with file size. `pipeline` also closes both streams on error.',
        },
      },
    ],
    sources: [
      { title: 'Node.js — fs.createReadStream()', url: `${API}/fs.html#fscreatereadstreampath-options` },
      { title: 'Node.js — stream.pipeline()', url: `${API}/stream.html#streampipelinesource-transforms-destination-callback` },
    ],
  },
  {
    id: 'node-streams-buffer-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-streams'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: { lang: 'js', source: `const text = 'Привет';\n\nconsole.log(text.length, Buffer.byteLength(text));` },
    answers: ['6 12'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`length` строки — число UTF-16-единиц, то есть 6 букв. `Buffer.byteLength` считает байты в UTF-8, а кириллица занимает по 2 байта — 12. Разница важна для `Content-Length`, лимитов размера и нарезки бинарных данных: считать нужно байты, а не символы.',
          en: 'A string’s `length` counts UTF-16 units — 6 letters. `Buffer.byteLength` counts UTF-8 bytes, and Cyrillic takes 2 bytes each — 12. This matters for `Content-Length`, size limits and slicing binary data: count bytes, not characters.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Buffer.byteLength()', url: `${API}/buffer.html#static-method-bufferbytelengthstring-encoding` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-streams-backpressure-001',
    topic: 'node',
    tags: ['node-streams'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: '`writable.write(chunk)` вернул `false`. Что это значит и что делать?',
      en: '`writable.write(chunk)` returned `false`. What does it mean and what should you do?',
    },
    options: [
      { text: { ru: 'Запись не удалась — повторить тот же `chunk`', en: 'The write failed — retry the same `chunk`' } },
      { text: { ru: 'Поток закрыт — создать новый', en: 'The stream is closed — create a new one' } },
      {
        text: {
          ru: 'Внутренний буфер переполнен — приостановить запись до события `drain`',
          en: 'The internal buffer is full — pause writing until the `drain` event',
        },
      },
      { text: { ru: 'Данные записаны, это нормальный ответ', en: 'The data is written, it’s a normal result' } },
      { text: { ru: 'Нужно вызвать `end()` немедленно', en: 'You must call `end()` immediately' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это **backpressure**: приёмник не успевает, и данные копятся в памяти. Чанк принят, но продолжать писать нельзя — ждут `drain`. Если игнорировать сигнал, быстрый источник и медленный клиент съедят всю память. `pipe` и `pipeline` делают эту паузу сами — ещё одна причина ими пользоваться.',
          en: 'This is **backpressure**: the destination can’t keep up, and data piles up in memory. The chunk is accepted, but you must stop writing until `drain`. Ignoring the signal lets a fast source and a slow client eat all memory. `pipe` and `pipeline` pause automatically — another reason to use them.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Backpressuring in Streams', url: `${LEARN}/modules/backpressuring-in-streams` }],
  },
  {
    id: 'node-http-middleware-order-001',
    topic: 'node',
    tags: ['node-http'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Страница `/admin` открывается без входа, хотя `requireAuth` подключён. Почему?',
      en: 'The `/admin` page opens without logging in, although `requireAuth` is registered. Why?',
    },
    code: {
      lang: 'js',
      source: `const app = express();

app.get('/admin', (req, res) => res.send('secret'));
app.use(requireAuth);

app.listen(3000);`,
    },
    options: [
      { text: { ru: '`app.use` работает только для POST-запросов', en: '`app.use` only works for POST requests' } },
      {
        text: {
          ru: 'Express вызывает обработчики в порядке регистрации, а маршрут уже ответил до `requireAuth`',
          en: 'Express calls handlers in registration order, and the route already responded before `requireAuth`',
        },
      },
      { text: { ru: 'Middleware нужно передавать в `app.listen`', en: 'Middleware must be passed to `app.listen`' } },
      { text: { ru: '`requireAuth` должен быть `async`', en: '`requireAuth` must be `async`' } },
      { text: { ru: 'Express кеширует ответ `/admin`', en: 'Express caches the `/admin` response' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Middleware и маршруты образуют цепочку в порядке объявления. Маршрут `/admin` отправил ответ и не вызвал `next()`, поэтому до `requireAuth` дело не дошло. Проверку подключают **до** защищённых маршрутов: `app.use(requireAuth)` выше или прямо в маршруте — `app.get(\'/admin\', requireAuth, handler)`.',
          en: 'Middleware and routes form a chain in declaration order. The `/admin` route sent a response without calling `next()`, so `requireAuth` never ran. Register the check **before** protected routes: `app.use(requireAuth)` above them or right in the route — `app.get(\'/admin\', requireAuth, handler)`.',
        },
      },
    ],
    sources: [{ title: 'Express — Using middleware', url: `${EXPRESS}/guide/using-middleware/` }],
  },
  {
    id: 'node-http-body-001',
    topic: 'node',
    tags: ['node-http'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Клиент отправляет POST с JSON, а в обработчике Express `req.body` равен `undefined`. Чего не хватает?',
      en: 'A client sends a POST with JSON, but `req.body` is `undefined` in the Express handler. What’s missing?',
    },
    options: [
      { code: "app.use(express.json());" },
      { code: "app.use(express.static('public'));" },
      { code: "res.setHeader('Content-Type', 'application/json');" },
      { code: "app.set('json spaces', 2);" },
      { code: "app.use(cors());" },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Тело запроса приходит потоком байтов, и Express сам его не читает. `express.json()` собирает тело запросов с `Content-Type: application/json`, парсит и кладёт результат в `req.body`. Для форм есть `express.urlencoded()`, для файлов — отдельные пакеты вроде `multer`.',
          en: 'The request body arrives as a byte stream, and Express doesn’t read it by itself. `express.json()` collects the body of requests with `Content-Type: application/json`, parses it and puts the result in `req.body`. Forms need `express.urlencoded()`, file uploads — separate packages like `multer`.',
        },
      },
    ],
    sources: [{ title: 'Express — express.json()', url: `${EXPRESS}/api/#express.json` }],
  },
  {
    id: 'node-http-next-001',
    topic: 'node',
    tags: ['node-http'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'После подключения логгера все запросы «висят» до таймаута. В чём ошибка?',
      en: 'After adding a logger, every request hangs until it times out. What’s wrong?',
    },
    code: {
      lang: 'js',
      source: `app.use((req, res, next) => {
  console.log(req.method, req.url);
});`,
    },
    options: [
      { text: { ru: '`console.log` блокирует цикл событий', en: '`console.log` blocks the event loop' } },
      { text: { ru: 'Middleware должен вернуть `true`', en: 'Middleware must return `true`' } },
      {
        text: {
          ru: 'Middleware не вызвал `next()` и не ответил — цепочка остановилась',
          en: 'The middleware neither called `next()` nor responded — the chain stopped',
        },
      },
      { text: { ru: 'Логгер нужно подключать после маршрутов', en: 'The logger must be registered after the routes' } },
      { text: { ru: '`req.url` нельзя читать в middleware', en: '`req.url` can’t be read in middleware' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждый middleware обязан либо завершить ответ (`res.send`, `res.end`), либо передать управление дальше через `next()`. Иначе запрос никто не обработает, и соединение висит до таймаута клиента или сервера. Ошибку передают через `next(error)` — тогда Express перейдёт к обработчику ошибок.',
          en: 'Each middleware must either finish the response (`res.send`, `res.end`) or pass control on via `next()`. Otherwise nobody handles the request, and the connection hangs until a client or server timeout. Errors are passed via `next(error)` — then Express jumps to the error handler.',
        },
      },
    ],
    sources: [{ title: 'Express — Using middleware', url: `${EXPRESS}/guide/using-middleware/` }],
  },
  {
    id: 'node-http-error-handler-001',
    topic: 'node',
    tags: ['node-http'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Как Express понимает, что middleware — обработчик ошибок?',
      en: 'How does Express know a middleware is an error handler?',
    },
    options: [
      { text: { ru: 'По имени функции `errorHandler`', en: 'By the function name `errorHandler`' } },
      { text: { ru: 'По четырём параметрам: `(err, req, res, next)`', en: 'By its four parameters: `(err, req, res, next)`' } },
      { text: { ru: 'По вызову `app.useError(...)`', en: 'By calling `app.useError(...)`' } },
      { text: { ru: 'Он должен быть объявлен первым', en: 'It must be declared first' } },
      { text: { ru: 'Он должен вернуть объект ошибки', en: 'It must return the error object' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обработчик ошибок отличается только числом параметров — четыре, даже если `next` не используется. Его подключают **после** всех маршрутов. Ошибки попадают туда из синхронного `throw` и из `next(error)`; в Express 5 ещё и отклонённые промисы `async`-обработчиков, а в Express 4 их нужно ловить и передавать в `next` вручную.',
          en: 'An error handler differs only by its parameter count — four, even if `next` is unused. Register it **after** all routes. Errors reach it from a synchronous `throw` and from `next(error)`; in Express 5 also from rejected promises of `async` handlers, while in Express 4 you must catch them and pass to `next` manually.',
        },
      },
    ],
    sources: [
      { title: 'Express — Error handling', url: `${EXPRESS}/guide/error-handling/` },
      { title: 'Express — Migrating to Express 5', url: `${EXPRESS}/guide/migrating-5/` },
    ],
  },
];
