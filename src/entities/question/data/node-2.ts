import type { Question } from '../model/types';

const API = 'https://nodejs.org/api';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const NODE_QUESTIONS_2: Question[] = [
  {
    id: 'node-modules-path-resolve-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const path = require('node:path');

console.log(path.posix.resolve('/app', 'src', '/etc/config', 'app.json'));`,
    },
    answers: ['/etc/config/app.json'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`path.resolve` идёт по аргументам справа налево и останавливается, как только получил абсолютный путь: `/etc/config` «сбрасывает» всё, что было левее. `path.join` просто склеил бы части: `/app/src/etc/config/app.json`. Отсюда классическая уязвимость — склеивать путь с пользовательским вводом без проверки, что результат остался внутри нужной папки.',
          en: '`path.resolve` walks the arguments right to left and stops as soon as it has an absolute path: `/etc/config` “resets” everything to its left. `path.join` would just concatenate: `/app/src/etc/config/app.json`. Hence a classic vulnerability — joining a path with user input without checking the result stays inside the intended folder.',
        },
      },
    ],
    sources: [{ title: 'Node.js — path.resolve()', url: `${API}/path.html#pathresolvepaths` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-streams-base64-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-streams'],
    difficulty: 1,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const encoded = Buffer.from('hi').toString('base64');
const decoded = Buffer.from(encoded, 'base64').toString('utf8');

console.log(encoded, decoded);`,
    },
    answers: ['aGk= hi'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Buffer` переводит данные между кодировками: строка → байты UTF-8 → base64 и обратно. Два байта `hi` дают три символа base64 и `=` для выравнивания. Base64 — это **кодирование**, а не шифрование: так передают бинарные данные в JSON или заголовках, но прочитать их может любой.',
          en: '`Buffer` converts data between encodings: string → UTF-8 bytes → base64 and back. The two bytes of `hi` give three base64 characters plus `=` padding. Base64 is **encoding**, not encryption: it carries binary data in JSON or headers, but anyone can read it.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Buffers and character encodings', url: `${API}/buffer.html#buffers-and-character-encodings` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-async-emitter-error-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();
emitter.on('data', () => {});

try {
  emitter.emit('error', new Error('boom'));
} catch (error) {
  console.log('thrown', error.message);
}`,
    },
    answers: ['thrown boom'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Событие `error` особое: если на него нет слушателя, `emit` **бросает** ошибку, и без `try/catch` процесс упадёт. Слушатели других событий не спасают. Поэтому у потоков, сокетов и серверов всегда подписываются на `error` — или используют `pipeline` и `events.once`, которые превращают его в отклонённый промис.',
          en: 'The `error` event is special: with no listener for it, `emit` **throws**, and without `try/catch` the process crashes. Listeners for other events don’t help. That’s why streams, sockets and servers always get an `error` listener — or use `pipeline` and `events.once`, which turn it into a rejected promise.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Error events', url: `${API}/events.html#error-events` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-streams-async-iteration-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-streams'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { Readable } = require('node:stream');

(async () => {
  const chunks = [];
  for await (const chunk of Readable.from(['a', 'b', 'c'])) {
    chunks.push(chunk.toUpperCase());
  }
  console.log(chunks.join('-'));
})();`,
    },
    answers: ['A-B-C'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Readable-потоки — асинхронные итераторы: `for await` читает чанки по одному и сам соблюдает backpressure — следующий чанк не запрашивается, пока тело цикла не закончит работу. `Readable.from` превращает массив или генератор в поток. Так удобно обрабатывать большие файлы построчно через `readline` или `fs.createReadStream`.',
          en: 'Readable streams are async iterators: `for await` reads chunks one by one and respects backpressure itself — the next chunk isn’t requested until the loop body finishes. `Readable.from` turns an array or generator into a stream. This makes processing big files line by line with `readline` or `fs.createReadStream` convenient.',
        },
      },
    ],
    sources: [{ title: 'Node.js — readable[Symbol.asyncIterator]()', url: `${API}/stream.html#readablesymbolasynciterator` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-runtime-parse-args-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { parseArgs } = require('node:util');

const { values } = parseArgs({
  args: ['--port', '3000', '-v'],
  options: {
    port: { type: 'string' },
    verbose: { type: 'boolean', short: 'v' },
  },
});

console.log(typeof values.port, values.verbose);`,
    },
    answers: ['string true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Аргументы командной строки — строки из `process.argv` (первые два элемента — путь к `node` и к скрипту). Встроенный `util.parseArgs` разбирает флаги без сторонних пакетов: `--port 3000` → строка `\'3000\'`, `-v` → `verbose: true`. Число из строки получают явно, как и у переменных окружения.',
          en: 'Command-line arguments are strings from `process.argv` (the first two items are the paths to `node` and the script). The built-in `util.parseArgs` parses flags without third-party packages: `--port 3000` → the string `\'3000\'`, `-v` → `verbose: true`. Convert to a number explicitly, as with environment variables.',
        },
      },
    ],
    sources: [{ title: 'Node.js — util.parseArgs()', url: `${API}/util.html#utilparseargsconfig` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-runtime-worker-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { Worker } = require('node:worker_threads');

const worker = new Worker(
  \`const { parentPort } = require('node:worker_threads');
  parentPort.on('message', (n) => parentPort.postMessage(n * 2));\`,
  { eval: true },
);

worker.on('message', (result) => {
  console.log(result);
  worker.terminate();
});
worker.postMessage(21);`,
    },
    answers: ['42'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`worker_threads` запускает JavaScript в отдельном потоке со своим event loop. Общаются через сообщения: данные копируются (structured clone), а `ArrayBuffer` можно передать без копирования. Так выносят тяжёлые вычисления — парсинг, сжатие, хеши, — чтобы главный поток продолжал отвечать на запросы. `terminate()` нужен, иначе воркер держит процесс живым.',
          en: '`worker_threads` runs JavaScript in a separate thread with its own event loop. They talk via messages: data is copied (structured clone), and an `ArrayBuffer` can be transferred without copying. This offloads heavy work — parsing, compression, hashing — so the main thread keeps serving requests. `terminate()` is needed, or the worker keeps the process alive.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Worker threads', url: `${API}/worker_threads.html` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-async-abort-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { setTimeout: sleep } = require('node:timers/promises');

const controller = new AbortController();
sleep(1000, 'done', { signal: controller.signal })
  .then((value) => console.log(value))
  .catch((error) => console.log(error.name));

controller.abort();`,
    },
    answers: ['AbortError'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`AbortController` — общий способ отмены в Node и браузере: его `signal` принимают `fetch`, `timers/promises`, `fs.readFile`, `events.once` и потоки. После `abort()` операция прекращается, а промис отклоняется с ошибкой `AbortError` — таймер не ждёт секунду. Так отменяют устаревшие запросы и ставят таймауты (`AbortSignal.timeout(ms)`).',
          en: '`AbortController` is the common cancellation mechanism in Node and browsers: its `signal` is accepted by `fetch`, `timers/promises`, `fs.readFile`, `events.once` and streams. After `abort()` the operation stops and the promise rejects with `AbortError` — the timer doesn’t wait a second. That’s how stale requests are cancelled and timeouts set (`AbortSignal.timeout(ms)`).',
        },
      },
    ],
    sources: [{ title: 'Node.js — Timers Promises API', url: `${API}/timers.html#timers-promises-api` }],
    verify: { kind: 'js-output' },
  },
];
