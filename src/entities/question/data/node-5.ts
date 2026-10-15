import type { Question } from '../model/types';

const API = 'https://nodejs.org/api';
const EVENT_LOOP_GUIDE = 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const NODE_QUESTIONS_5: Question[] = [
  {
    id: 'node-event-loop-immediate-io-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-event-loop'],
    difficulty: 3,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const fs = require('node:fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});`,
    },
    answers: ['immediate timeout'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Колбэк `readFile` выполняется в фазе poll [[event-loop|цикла событий]]. Следующая фаза — check, где выполняются колбэки `setImmediate`, а таймеры ждут нового круга. Поэтому внутри колбэка ввода-вывода `setImmediate` **всегда** срабатывает раньше `setTimeout(…, 0)`. В главном модуле, вне ввода-вывода, их порядок не гарантирован.',
          en: 'The `readFile` callback runs in the poll phase of the [[event-loop|event loop]]. The next phase is check, where `setImmediate` callbacks run, while timers wait for the next iteration. So inside an I/O callback `setImmediate` **always** fires before `setTimeout(…, 0)`. In the main module, outside I/O, their order isn’t guaranteed.',
        },
      },
    ],
    sources: [{ title: 'Node.js — The Event Loop, Timers, and process.nextTick()', url: EVENT_LOOP_GUIDE }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-event-loop-immediate-main-001',
    topic: 'node',
    tags: ['node-event-loop'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В главном модуле подряд стоят `setTimeout(() => console.log("timeout"), 0)` и `setImmediate(() => console.log("immediate"))`. Что выведет код?',
      en: 'The main module calls `setTimeout(() => console.log("timeout"), 0)` and then `setImmediate(() => console.log("immediate"))`. What will the code log?',
    },
    options: [
      { text: { ru: 'Всегда `timeout`, потом `immediate`', en: 'Always `timeout`, then `immediate`' } },
      { text: { ru: 'Всегда `immediate`, потом `timeout`', en: 'Always `immediate`, then `timeout`' } },
      { text: { ru: 'Только `immediate`: таймер с нулём отменяется', en: 'Only `immediate`: a zero timer is cancelled' } },
      {
        text: {
          ru: 'Порядок не гарантирован: зависит от того, успел ли истечь таймер к началу цикла',
          en: 'The order isn’t guaranteed: it depends on whether the timer has expired when the loop starts',
        },
      },
      { text: { ru: 'Ошибка: `setImmediate` есть только в браузере', en: 'An error: `setImmediate` only exists in browsers' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`setTimeout(fn, 0)` на деле ставит задержку 1 мс. Если к первой фазе таймеров эта миллисекунда прошла — первым будет `timeout`, если нет — цикл дойдёт до фазы check, и первым окажется `immediate`. Это зависит от загрузки машины, поэтому порядок недетерминирован. Нужна гарантия «после текущего ввода-вывода» — используйте `setImmediate` внутри колбэка I/O, где он всегда раньше.',
          en: '`setTimeout(fn, 0)` actually sets a 1 ms delay. If that millisecond has passed by the first timers phase, `timeout` comes first; if not, the loop reaches the check phase and `immediate` wins. It depends on machine load, so the order is non-deterministic. For a guaranteed “after the current I/O”, use `setImmediate` inside an I/O callback, where it always comes first.',
        },
      },
    ],
    sources: [{ title: 'Node.js — setImmediate() vs setTimeout()', url: EVENT_LOOP_GUIDE }],
  },
  {
    id: 'node-async-timers-promises-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const { setTimeout: sleep } = require('node:timers/promises');

(async () => {
  const value = await sleep(10, 'done');
  console.log(value);
  const results = await Promise.all([sleep(30, 'slow'), sleep(10, 'fast')]);
  console.log(results.join(' '));
})();`,
    },
    answers: ['done slow fast'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`node:timers/promises` даёт таймеры, которые возвращают промис: второй аргумент — значение, которым он выполнится. Обёртка `new Promise((resolve) => setTimeout(resolve, ms))` больше не нужна, а ещё можно передать `{ signal }` для отмены. `Promise.all` возвращает результаты в порядке **промисов в массиве**, а не в порядке завершения, поэтому `slow` идёт первым, хотя закончился позже.',
          en: '`node:timers/promises` provides timers that return a promise: the second argument is the value it resolves with. No more `new Promise((resolve) => setTimeout(resolve, ms))` wrappers, and you can pass `{ signal }` to cancel. `Promise.all` returns results in the order of the **promises in the array**, not completion order, so `slow` comes first even though it finished later.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Timers Promises API', url: `${API}/timers.html#timers-promises-api` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-modules-exports-field-001',
    topic: 'node',
    tags: ['node-modules'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В `package.json` библиотеки есть `"exports": { ".": "./index.js" }`. Что будет при `require("lib/utils/format.js")`, если такой файл в пакете есть?',
      en: 'A library’s `package.json` has `"exports": { ".": "./index.js" }`. What happens on `require("lib/utils/format.js")` if that file exists in the package?',
    },
    options: [
      { text: { ru: 'Файл загрузится: он же лежит в пакете', en: 'The file loads: it’s in the package' } },
      {
        text: {
          ru: 'Ошибка `ERR_PACKAGE_PATH_NOT_EXPORTED`: снаружи доступны только пути из `exports`',
          en: 'An `ERR_PACKAGE_PATH_NOT_EXPORTED` error: only paths listed in `exports` are reachable from outside',
        },
      },
      { text: { ru: 'Загрузится `index.js` вместо запрошенного файла', en: '`index.js` loads instead of the requested file' } },
      { text: { ru: 'Загрузится, но только через `import`, не через `require`', en: 'It loads, but only via `import`, not `require`' } },
      { text: { ru: 'Предупреждение в консоли, и файл загрузится', en: 'A console warning, and the file loads' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Поле `exports` — публичный интерфейс пакета: всё, что в нём не перечислено, снаружи недоступно, даже если файл физически лежит в `node_modules`. Это позволяет автору менять внутреннюю структуру без мажорной версии. Нужен доступ к подпапке — автор добавляет её явно, например `"./utils/*": "./utils/*.js"`. Добавление `exports` в существующий пакет — ломающее изменение.',
          en: 'The `exports` field is the package’s public interface: anything not listed is unreachable from outside, even if the file physically sits in `node_modules`. It lets the author change the internal layout without a major version. To expose a subfolder, the author adds it explicitly, e.g. `"./utils/*": "./utils/*.js"`. Adding `exports` to an existing package is a breaking change.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Package entry points', url: `${API}/packages.html#package-entry-points` }],
  },
  {
    id: 'node-http-express5-async-001',
    topic: 'node',
    tags: ['node-http'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Асинхронный обработчик Express упал: `await db.find()` отклонился, `try/catch` нет. Что произойдёт в Express 5?',
      en: 'An async Express handler failed: `await db.find()` rejected and there’s no `try/catch`. What happens in Express 5?',
    },
    options: [
      { text: { ru: 'Запрос повиснет до таймаута', en: 'The request hangs until timeout' } },
      { text: { ru: 'Процесс упадёт с необработанным отклонением промиса', en: 'The process crashes with an unhandled rejection' } },
      {
        text: {
          ru: 'Ошибка уйдёт в `next(err)` — к обработчику ошибок, по умолчанию ответ 500',
          en: 'The error goes to `next(err)` — the error handler, a 500 response by default',
        },
      },
      { text: { ru: 'Express повторит запрос к базе', en: 'Express retries the database call' } },
      { text: { ru: 'Клиент получит 200 с пустым телом', en: 'The client gets a 200 with an empty body' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В Express 5 отклонённый промис из middleware или обработчика автоматически передаётся в `next(err)`, и ответ формирует обработчик ошибок. В Express 4 так не было: без `try/catch` или обёртки отклонение оставалось необработанным — запрос висел, а в Node 15+ процесс падал. Это одно из главных изменений при переходе на пятую версию.',
          en: 'In Express 5 a rejected promise from middleware or a handler is automatically passed to `next(err)`, and the error handler builds the response. Express 4 didn’t do this: without `try/catch` or a wrapper the rejection went unhandled — the request hung, and on Node 15+ the process crashed. It’s one of the key changes when moving to version 5.',
        },
      },
    ],
    sources: [{ title: 'Express — Migrating to Express 5', url: 'https://expressjs.com/en/guide/migrating-5.html' }],
  },
  {
    id: 'node-streams-pipeline-error-001',
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

const source = Readable.from(['a', 'b', 'c']);
const check = new Transform({
  transform(chunk, _encoding, callback) {
    callback(String(chunk) === 'b' ? new Error('bad chunk') : null, chunk);
  },
});
const sink = new Writable({ write: (_chunk, _encoding, callback) => callback() });

pipeline(source, check, sink).catch((error) => console.log(error.message, source.destroyed));`,
    },
    answers: ['bad chunk true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`pipeline` соединяет потоки и при ошибке в любом звене **уничтожает все** — источник тоже, поэтому `source.destroyed` равно `true`, а файлы и сокеты закрываются. Промис отклоняется с исходной ошибкой. Старый `a.pipe(b)` так не умеет: если упал `b`, `a` остаётся открытым, а ошибки каждого потока нужно ловить отдельно. Поэтому в новом коде — `pipeline`.',
          en: '`pipeline` connects streams and, on an error in any link, **destroys all of them** — including the source, so `source.destroyed` is `true` and files and sockets get closed. The promise rejects with the original error. The old `a.pipe(b)` can’t do this: if `b` fails, `a` stays open, and each stream’s errors must be caught separately. So new code uses `pipeline`.',
        },
      },
    ],
    sources: [{ title: 'Node.js — stream.pipeline()', url: `${API}/stream.html#streampipelinesource-transforms-destination-options` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-runtime-path-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 1,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const path = require('node:path').posix;

console.log(path.extname('archive.tar.gz'), path.basename('/data/report.csv', '.csv'), path.join('/app', 'src', '..', 'public'));`,
    },
    answers: ['.gz report /app/public'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`extname` возвращает только последнее расширение — `.gz`, а не `.tar.gz`. `basename` со вторым аргументом отрезает суффикс. `join` склеивает части и нормализует путь: `..` убирает `src`. Пути собирают через `path`, а не конкатенацией строк: на Windows разделитель другой, и `path` подставит нужный. `path.posix` и `path.win32` дают одинаковый результат на любой ОС.',
          en: '`extname` returns only the last extension — `.gz`, not `.tar.gz`. `basename` with a second argument strips the suffix. `join` glues the parts and normalizes the path: `..` removes `src`. Build paths with `path`, not string concatenation: Windows uses a different separator, and `path` picks the right one. `path.posix` and `path.win32` give the same result on any OS.',
        },
      },
    ],
    sources: [{ title: 'Node.js — Path', url: `${API}/path.html` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'node-async-max-listeners-001',
    topic: 'node',
    tags: ['node-async'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В логах появилось «MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 listeners added». Что это обычно значит?',
      en: 'The logs show “MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 listeners added”. What does it usually mean?',
    },
    options: [
      { text: { ru: 'У эмиттера закончилась память, его нужно пересоздать', en: 'The emitter ran out of memory and must be recreated' } },
      {
        text: {
          ru: 'Подписка добавляется снова и снова (например, на каждый запрос) и не снимается — утечка',
          en: 'A listener is added again and again (e.g. on every request) and never removed — a leak',
        },
      },
      { text: { ru: 'Больше 10 обработчиков Node.js запрещает', en: 'Node.js forbids more than 10 listeners' } },
      { text: { ru: 'Событие сработало 11 раз подряд', en: 'The event fired 11 times in a row' } },
      { text: { ru: 'Нужно просто поднять лимит через `setMaxListeners(0)`', en: 'Just raise the limit with `setMaxListeners(0)`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По умолчанию на одно событие ожидается не больше 10 обработчиков. Больше — частый признак того, что подписка создаётся в функции, которая вызывается много раз, и не снимается. Лечат причину: `emitter.off(...)`, `once`, `{ signal }` у `events.on`/`addEventListener`. Это лишь предупреждение — 11-й обработчик добавится, а поднимать лимит без разбора значит спрятать утечку.',
          en: 'By default at most 10 listeners per event are expected. More is a common sign that a subscription is created in a function called many times and never removed. Fix the cause: `emitter.off(...)`, `once`, `{ signal }` with `events.on`/`addEventListener`. It’s only a warning — the 11th listener is still added, and raising the limit blindly just hides the leak.',
        },
      },
    ],
    sources: [{ title: 'Node.js — events.defaultMaxListeners', url: `${API}/events.html#eventsdefaultmaxlisteners` }],
  },
  {
    id: 'node-runtime-uncaught-001',
    topic: 'node',
    tags: ['node-runtime'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чтобы сервер «никогда не падал», в него добавили `process.on("uncaughtException", (error) => log(error))`. Что не так?',
      en: 'To make the server “never crash”, someone added `process.on("uncaughtException", (error) => log(error))`. What’s wrong?',
    },
    options: [
      { text: { ru: 'Ничего, это рекомендованный способ', en: 'Nothing, it’s the recommended way' } },
      { text: { ru: 'Обработчик сработает только в dev-режиме', en: 'The handler only fires in dev mode' } },
      {
        text: {
          ru: 'После такой ошибки состояние процесса неизвестно: нужно записать лог, освободить ресурсы и завершиться, а перезапустит менеджер процессов',
          en: 'After such an error the process state is unknown: log, release resources and exit, and let a process manager restart it',
        },
      },
      { text: { ru: 'Он ловит ещё и отклонённые промисы, поэтому всё правильно', en: 'It also catches rejected promises, so it’s fine' } },
      { text: { ru: 'Нужно `process.once`, тогда продолжать работу безопасно', en: 'Use `process.once`, then it’s safe to continue' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Исключение могло вылететь посреди операции: полузаписанные данные, незакрытые соединения, сломанные инварианты. Документация Node прямо говорит, что продолжать работу после `uncaughtException` небезопасно: обработчик нужен для синхронной очистки и логирования, после чего процесс завершают, а поднимает его заново менеджер процессов — systemd, Kubernetes, PM2.',
          en: 'The exception may have been thrown mid-operation: half-written data, open connections, broken invariants. The Node docs state plainly that resuming after `uncaughtException` isn’t safe: the handler is for synchronous cleanup and logging, after which the process exits and a process manager — systemd, Kubernetes, PM2 — brings it back.',
        },
      },
    ],
    sources: [
      { title: 'Node.js — Warning: using uncaughtException correctly', url: `${API}/process.html#warning-using-uncaughtexception-correctly` },
    ],
  },
  {
    id: 'node-http-headers-sent-001',
    kind: 'output',
    topic: 'node',
    tags: ['node-http'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const http = require('node:http');

const server = http.createServer((_request, response) => {
  response.end('ok');
  try {
    response.setHeader('X-Late', '1');
  } catch (error) {
    console.log(error.code);
  }
});

server.listen(0, '127.0.0.1', async () => {
  const response = await fetch(\`http://127.0.0.1:\${server.address().port}\`);
  console.log(response.status, await response.text());
  server.close();
});`,
    },
    answers: ['ERR_HTTP_HEADERS_SENT 200 ok'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Заголовки уходят клиенту вместе с первым байтом тела, а `end` отправляет ответ целиком. Менять заголовки после этого нельзя — Node бросает `ERR_HTTP_HEADERS_SENT`. В Express та же ошибка «Cannot set headers after they are sent» обычно значит, что ответ отправлен дважды: забыли `return` после `res.json()` или вызвали `next()` после ответа.',
          en: 'Headers go to the client with the first byte of the body, and `end` sends the whole response. They can’t be changed afterwards — Node throws `ERR_HTTP_HEADERS_SENT`. In Express the same “Cannot set headers after they are sent” error usually means the response was sent twice: a missing `return` after `res.json()` or a `next()` call after responding.',
        },
      },
    ],
    sources: [{ title: 'Node.js — response.setHeader()', url: `${API}/http.html#responsesetheadername-value` }],
    verify: { kind: 'js-output' },
  },
];
