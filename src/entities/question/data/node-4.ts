import type { Question } from '../model/types';

const API = 'https://nodejs.org/api';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const NODE_QUESTIONS_4: Question[] = [
  {
    id: 'node-streams-readline-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-streams'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Поток приходит двумя чанками, и строка разорвана между ними. Сколько строк насчитает `readline`? Впишите число.',
      en: 'The stream arrives in two chunks, with a line split between them. How many lines does `readline` count? Type the number.',
    },
    code: {
      lang: 'js',
      source: `const { Readable } = require('node:stream');
const readline = require('node:readline');

(async () => {
  const input = Readable.from(['first line\\nsec', 'ond line\\nthird']);
  let count = 0;
  for await (const line of readline.createInterface({ input })) {
    count++;
  }
  console.log(count);
})();`,
    },
    answers: ['3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Чанки потока не совпадают с границами строк: `sec` и `ond line` пришли разными кусками. `readline` копит текст и отдаёт только целые строки, а последнюю — `third` — по окончании потока. Так обрабатывают логи и CSV на гигабайты построчно, не загружая файл в память: `readline.createInterface({ input: fs.createReadStream(file) })`.',
          en: 'Stream chunks don’t match line boundaries: `sec` and `ond line` came in different pieces. `readline` buffers text and yields only whole lines, plus the last one — `third` — when the stream ends. That’s how gigabyte logs and CSVs are processed line by line without loading the file into memory: `readline.createInterface({ input: fs.createReadStream(file) })`.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Readline', url: `${API}/readline.html` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-streams-write-backpressure-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-streams'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { Writable } = require('node:stream');

const slow = new Writable({
  highWaterMark: 4,
  write(chunk, encoding, callback) {
    setTimeout(callback, 10);
  },
});

console.log(slow.write('ab'), slow.write('cd'), slow.write('ef'));`,
    },
    answers: ['true false false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`write` возвращает `false`, как только во внутреннем буфере набралось `highWaterMark` байт или больше: после `ab` там 2 байта, после `cd` — уже 4. Данные при этом **не теряются** — третья запись тоже ляжет в буфер, но это сигнал остановиться и ждать события `drain`. Кто игнорирует `false`, раздувает память при медленном получателе.',
          en: '`write` returns `false` once the internal buffer holds `highWaterMark` bytes or more: after `ab` there are 2 bytes, after `cd` already 4. Data is **not lost** — the third write is buffered too, but it’s a signal to stop and wait for `drain`. Ignoring `false` bloats memory when the destination is slow.',
        },
      },
    ],
    sources: [{ title: 'Node.js — writable.write()', url: `${API}/stream.html#writablewritechunk-encoding-callback` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-modules-require-cache-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const file = path.join(os.tmpdir(), \`config-\${process.pid}.js\`);
fs.writeFileSync(file, 'module.exports = { loadedAt: Math.random() };');

const first = require(file);
const second = require(file);
delete require.cache[require.resolve(file)];
const third = require(file);

console.log(first === second, first === third);
fs.unlinkSync(file);`,
    },
    answers: ['true false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`require.cache` — объект, где CommonJS хранит загруженные модули по полному пути. Повторный `require` берёт модуль оттуда, а после удаления записи файл выполняется заново и создаёт новый объект. На этом построена «горячая перезагрузка» в старых dev-серверах. Ссылки на старый экземпляр у других модулей при этом остаются — поэтому такой трюк легко оставляет две копии состояния.',
          en: '`require.cache` is the object where CommonJS keeps loaded modules by full path. A repeated `require` takes the module from there, and after deleting the entry the file runs again and creates a new object. Old dev servers built “hot reload” on this. Other modules still hold references to the old instance, though — so the trick easily leaves two copies of state.',
        },
      },
    ],
    sources: [{ title: 'Node.js — require.cache', url: `${API}/modules.html#requirecache` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-event-loop-unref-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-event-loop'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const timer = setTimeout(() => console.log('timeout'), 1000);
timer.unref();

console.log('done');`,
    },
    answers: ['done'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Процесс Node живёт, пока в [[event-loop|цикле событий]] есть активные дела: таймеры, сокеты, серверы. `unref()` говорит: «этот таймер не повод не выходить». Других дел нет, поэтому процесс завершается сразу после `done`, и колбэк не срабатывает. Так делают фоновые задачи — периодическую отправку метрик, очистку кеша, — которые не должны мешать завершению.',
          en: 'A Node process stays alive while the [[event-loop|event loop]] has active work: timers, sockets, servers. `unref()` says “this timer isn’t a reason to stay”. There’s nothing else, so the process exits right after `done`, and the callback never runs. It’s used for background chores — periodic metrics, cache cleanup — that shouldn’t block shutdown.',
        },
      },
    ],
    sources: [{ title: 'Node.js — timeout.unref()', url: `${API}/timers.html#timeoutunref` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-runtime-exit-events-001',
    kind: 'order',
    topic: 'node',
    tags: ['node-runtime', 'node-event-loop'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Расставьте строки в порядке вывода.',
      en: 'Put the lines in output order.',
    },
    code: {
      lang: 'js',
      source: `let scheduled = false;

process.on('beforeExit', () => {
  if (!scheduled) {
    scheduled = true;
    console.log('beforeExit');
    setTimeout(() => console.log('timer'), 0);
  }
});
process.on('exit', (code) => console.log('exit', code));

console.log('main');`,
    },
    items: [{ code: 'main' }, { code: 'beforeExit' }, { code: 'timer' }, { code: 'exit 0' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`beforeExit` срабатывает, когда [[event-loop|цикл событий]] опустел, и в нём ещё можно запланировать асинхронную работу — тогда процесс продолжит жить. Таймер выполнился, цикл снова опустел, `beforeExit` пришёл повторно, но флаг уже стоит. В `exit` асинхронный код уже не выполнится — только синхронный, например запись последней строки лога. При `process.exit()` событие `beforeExit` не наступает вовсе.',
          en: '`beforeExit` fires when the [[event-loop|event loop]] is empty, and async work can still be scheduled there — the process then keeps running. The timer ran, the loop emptied again, `beforeExit` fired again, but the flag was set. In `exit` async code no longer runs — only sync, like writing a last log line. With `process.exit()`, `beforeExit` doesn’t happen at all.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Process events', url: `${API}/process.html#event-beforeexit` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-async-local-storage-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-async', 'node-http'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { AsyncLocalStorage } = require('node:async_hooks');

const storage = new AsyncLocalStorage();
const logLater = (ms) => setTimeout(() => console.log(storage.getStore().requestId), ms);

storage.run({ requestId: 'r1' }, () => logLater(20));
storage.run({ requestId: 'r2' }, () => logLater(10));`,
    },
    answers: ['r2 r1'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`AsyncLocalStorage` хранит контекст, который «едет» вместе с асинхронными операциями: таймер, запущенный внутри `run({ requestId: \'r1\' })`, видит свой `r1`, даже если сработает позже чужого. Так в логах сервера у каждой строки оказывается id своего запроса без проброса параметра через все функции. На этом же построены трассировка и `cookies()`/`headers()` в Next.js.',
          en: '`AsyncLocalStorage` keeps context that “travels” with async operations: a timer started inside `run({ requestId: \'r1\' })` sees its own `r1`, even if it fires after someone else’s. That gives every server log line its request id without threading a parameter through every function. Tracing and Next.js `cookies()`/`headers()` are built on it.',
        },
      },
    ],
    sources: [{ title: 'Node.js — AsyncLocalStorage', url: `${API}/async_context.html` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-runtime-crypto-hash-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Что выведет код? Впишите первые 8 символов хеша.',
      en: 'What will this code log? Type the first 8 characters of the hash.',
    },
    code: {
      lang: 'js',
      source: `const { createHash } = require('node:crypto');

const digest = createHash('sha256').update('abc').digest('hex');
console.log(digest.slice(0, 8));`,
    },
    answers: ['ba7816bf'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Хеш детерминирован: одни и те же байты всегда дают один и тот же результат, а малейшее изменение — совершенно другой. `sha256` подходит для ETag, проверки целостности файлов и ключей кеша. Для **паролей** он не годится: слишком быстрый для перебора — для них `crypto.scrypt` или argon2 с солью.',
          en: 'A hash is deterministic: the same bytes always produce the same result, and the slightest change gives a completely different one. `sha256` suits ETags, file integrity checks and cache keys. It’s wrong for **passwords**: too fast to brute-force — use `crypto.scrypt` or argon2 with a salt.',
        },
      },
    ],
    sources: [{ title: 'Node.js — crypto.createHash()', url: `${API}/crypto.html#cryptocreatehashalgorithm-options` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-runtime-inspect-depth-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: { lang: 'js', source: `console.log({ a: { b: { c: { d: 1 } } } });` },
    answers: ['{ a: { b: { c: [Object] } } }'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`console.log` в Node форматирует объекты через `util.inspect`, а он по умолчанию раскрывает только два уровня вложенности — глубже пишет `[Object]`. Из-за этого в логах «пропадают» данные. Полностью показать можно через `console.dir(obj, { depth: null })` или `JSON.stringify(obj, null, 2)`, а в продакшене логи лучше писать структурированным JSON.',
          en: 'Node’s `console.log` formats objects with `util.inspect`, which by default expands only two levels of nesting — deeper it prints `[Object]`. That’s how data “disappears” from logs. Show everything with `console.dir(obj, { depth: null })` or `JSON.stringify(obj, null, 2)`, and in production prefer structured JSON logs.',
        },
      },
    ],
    sources: [{ title: 'Node.js — util.inspect()', url: `${API}/util.html#utilinspectobject-options` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-streams-hex-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-streams'],
    difficulty: 1,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const bytes = Buffer.from([255, 0, 16]);

console.log(bytes.toString('hex'), bytes.length);`,
    },
    answers: ['ff0010 3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Buffer` — массив байтов (0–255). В шестнадцатеричном виде каждый байт — ровно две цифры: 255 → `ff`, 0 → `00`, 16 → `10`. Так выводят хеши, цвета и бинарные протоколы. Число вне диапазона при записи в `Buffer` обрежется по модулю 256 — например, 256 станет 0.',
          en: 'A `Buffer` is an array of bytes (0–255). In hex each byte is exactly two digits: 255 → `ff`, 0 → `00`, 16 → `10`. That’s how hashes, colors and binary protocols are shown. A number out of range is wrapped modulo 256 when stored in a `Buffer` — 256 becomes 0, for instance.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Buffer', url: `${API}/buffer.html` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-runtime-argv-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Скрипт запущен как `node script.js` без аргументов. Что выведет код? Впишите число.',
      en: 'The script runs as `node script.js` with no arguments. What does the code print? Type the number.',
    },
    code: { lang: 'js', source: `console.log(process.argv.length);` },
    answers: ['2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`process.argv` всегда начинается с двух элементов: путь к исполняемому `node` и путь к скрипту. Аргументы пользователя начинаются с индекса 2, поэтому их берут как `process.argv.slice(2)` — или сразу разбирают через `util.parseArgs`.',
          en: '`process.argv` always starts with two items: the path to the `node` executable and the script path. User arguments start at index 2, so take them as `process.argv.slice(2)` — or parse them directly with `util.parseArgs`.',
        },
      },
    ],
    sources: [{ title: 'Node.js — process.argv', url: `${API}/process.html#processargv` }],
    verify: { kind: 'js-output' },
  },
];
