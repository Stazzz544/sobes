import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';
const MICROTASK_GUIDE = 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide';

export const JAVASCRIPT_QUESTIONS_3: Question[] = [
  {
    id: 'js-proto-001',
    topic: 'javascript',
    tags: ['prototypes'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return \`\${this.name} speaks\`;
};

const dog = new Animal('Rex');
console.log(
  dog.speak(),
  Object.getPrototypeOf(dog) === Animal.prototype,
  Object.hasOwn(dog, 'speak'),
);`,
    },
    options: [
      { code: 'Rex speaks true true' },
      { code: 'Rex speaks false false' },
      { code: 'undefined speaks true false' },
      { code: 'Rex speaks true false' },
      { code: 'TypeError' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`new Animal("Rex")` создаёт объект, у которого внутренний прототип `[[Prototype]]` указывает на `Animal.prototype`. Собственное свойство у объекта только `name`.',
          en: '`new Animal("Rex")` creates an object whose internal `[[Prototype]]` points to `Animal.prototype`. The only own property of the object is `name`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Метод `speak` объекту не копируется: при обращении `dog.speak` движок не находит свойство у объекта и идёт вверх по цепочке прототипов. Поэтому `Object.hasOwn(dog, "speak")` — `false`, а сам вызов работает.',
          en: 'The `speak` method isn’t copied onto the object: when you access `dog.speak`, the engine doesn’t find it on the object and walks up the prototype chain. So `Object.hasOwn(dog, "speak")` is `false`, yet the call works.',
        },
      },
      { type: 'diagram', diagram: 'prototype-chain' },
    ],
    sources: [
      { title: 'MDN — Inheritance and the prototype chain', url: `${MDN}/Guide/Inheritance_and_the_prototype_chain` },
      { title: 'MDN — Object.hasOwn()', url: `${MDN}/Reference/Global_Objects/Object/hasOwn` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-proto-002',
    topic: 'javascript',
    tags: ['prototypes', 'this'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `class A {
  constructor() {
    this.who = 'A';
  }
  hello() {
    return \`A:\${this.who}\`;
  }
}

class B extends A {
  constructor() {
    super();
    this.who = 'B';
  }
  hello() {
    return \`B>\${super.hello()}\`;
  }
}

console.log(new B().hello());`,
    },
    options: [{ code: 'B>A:A' }, { code: 'A:B' }, { code: 'B>B:B' }, { code: 'B>A:B' }, { code: 'ReferenceError' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`super.hello()` вызывает метод родителя, но с тем же `this` — текущим экземпляром `B`. К моменту вызова конструктор `B` уже перезаписал `who` на `"B"`.',
          en: '`super.hello()` calls the parent’s method, but with the same `this` — the current `B` instance. By then the `B` constructor has already overwritten `who` with `"B"`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В конструкторе наследника `super()` обязателен до первого обращения к `this`, иначе будет `ReferenceError`.',
          en: 'In a derived constructor, `super()` must be called before the first use of `this`, otherwise you get a `ReferenceError`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — super', url: `${MDN}/Reference/Operators/super` },
      { title: 'MDN — extends', url: `${MDN}/Reference/Classes/extends` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-proto-003',
    topic: 'javascript',
    tags: ['prototypes'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что делает оператор `new F()`?', en: 'What does the `new F()` operator do?' },
    options: [
      {
        text: {
          ru: 'Копирует все свойства `F.prototype` в новый объект',
          en: 'Copies all properties of `F.prototype` into a new object',
        },
      },
      {
        text: {
          ru: 'Вызывает `F` и всегда возвращает то, что она вернула',
          en: 'Calls `F` and always returns whatever it returned',
        },
      },
      {
        text: {
          ru: 'Создаёт объект с прототипом `F.prototype`, вызывает `F` с `this`, равным этому объекту, и возвращает его, если `F` не вернула другой объект',
          en: 'Creates an object whose prototype is `F.prototype`, calls `F` with `this` set to it, and returns it unless `F` returns another object',
        },
      },
      {
        text: {
          ru: 'Создаёт новый класс на основе функции `F`',
          en: 'Creates a new class based on the function `F`',
        },
      },
      {
        text: {
          ru: 'Вызывает `F` с `this`, равным `globalThis`',
          en: 'Calls `F` with `this` set to `globalThis`',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Шаги `new`: создать пустой объект → связать его `[[Prototype]]` с `F.prototype` (связь, а не копирование) → вызвать `F` с этим объектом в `this` → вернуть объект. Если конструктор явно вернул объект, `new` вернёт его; примитив в `return` игнорируется.',
          en: 'The steps of `new`: create an empty object → link its `[[Prototype]]` to `F.prototype` (a link, not a copy) → call `F` with that object as `this` → return the object. If the constructor explicitly returns an object, `new` returns that; a primitive `return` is ignored.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function F() {
  this.a = 1;
  return { b: 2 };
}
new F(); // { b: 2 }`,
        },
      },
    ],
    sources: [{ title: 'MDN — new', url: `${MDN}/Reference/Operators/new` }],
  },
  {
    id: 'js-event-loop-002',
    topic: 'javascript',
    tags: ['event-loop', 'promises'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'В каком порядке выведутся строки?', en: 'In what order will the strings be logged?' },
    code: {
      lang: 'js',
      source: `setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => {
  console.log('then 1');
  setTimeout(() => console.log('timeout 2'), 0);
  Promise.resolve().then(() => console.log('then 2'));
});

queueMicrotask(() => console.log('micro'));
console.log('sync');`,
    },
    options: [
      { code: 'sync micro then 1 then 2 timeout timeout 2' },
      { code: 'sync then 1 micro timeout then 2 timeout 2' },
      { code: 'sync then 1 then 2 micro timeout timeout 2' },
      { code: 'sync then 1 micro then 2 timeout timeout 2' },
      { code: 'sync timeout then 1 micro then 2 timeout 2' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'После синхронного `sync` в очереди микрозадач лежат `then 1` и `micro` — в порядке постановки. Колбэк `then 1` ставит ещё одну микрозадачу (`then 2`) в **конец** этой же очереди и новый таймер в очередь задач.',
          en: 'After the synchronous `sync`, the microtask queue holds `then 1` and `micro`, in the order they were queued. The `then 1` callback adds another microtask (`then 2`) to the **end** of the same queue and a new timer to the task queue.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Очередь микрозадач опустошается полностью, включая добавленные по ходу: `micro`, `then 2`. Только потом — таймеры по порядку: `timeout`, `timeout 2`.',
          en: 'The microtask queue is drained completely, including tasks added along the way: `micro`, `then 2`. Only then do the timers run in order: `timeout`, `timeout 2`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Using microtasks', url: MICROTASK_GUIDE },
      { title: 'MDN — queueMicrotask()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask' },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-event-loop-003',
    topic: 'javascript',
    tags: ['event-loop'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что произойдёт на странице, если микрозадача бесконечно ставит в очередь новую микрозадачу?',
      en: 'What happens to a page if a microtask keeps queueing a new microtask forever?',
    },
    code: {
      lang: 'js',
      source: `function loop() {
  queueMicrotask(loop);
}
loop();`,
    },
    options: [
      {
        text: {
          ru: 'Браузер выполняет одну микрозадачу за кадр, интерфейс продолжит отрисовываться',
          en: 'The browser runs one microtask per frame, so the UI keeps rendering',
        },
      },
      {
        text: {
          ru: 'Будет `RangeError: Maximum call stack size exceeded`',
          en: 'You get `RangeError: Maximum call stack size exceeded`',
        },
      },
      {
        text: {
          ru: 'Страница зависнет: до отрисовки и макрозадач очередь не дойдёт, пока микрозадачи не закончатся',
          en: 'The page freezes: rendering and tasks never get a turn while microtasks keep coming',
        },
      },
      {
        text: {
          ru: 'После 1000 микрозадач браузер переносит остальные в очередь таймеров',
          en: 'After 1000 microtasks the browser moves the rest to the timer queue',
        },
      },
      {
        text: {
          ru: 'Ничего: микрозадачи выполняются в отдельном потоке',
          en: 'Nothing: microtasks run on a separate thread',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Цикл событий опустошает очередь микрозадач **целиком**, включая добавленные во время обработки. Пока в ней что-то есть, браузер не отрисовывает кадр и не берёт следующую задачу (клики, таймеры).',
          en: 'The event loop drains the microtask queue **completely**, including microtasks added during processing. While anything is in it, the browser doesn’t render a frame or take the next task (clicks, timers).',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Стек при этом не растёт: каждая микрозадача стартует с пустого стека, поэтому `RangeError` не будет — вкладка просто зависнет. С `setTimeout(loop)` интерфейс остался бы живым.',
          en: 'The call stack doesn’t grow — each microtask starts from an empty stack, so there’s no `RangeError`; the tab just hangs. With `setTimeout(loop)` the UI would stay responsive.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Using microtasks', url: MICROTASK_GUIDE },
      {
        title: 'HTML Standard — Event loop processing model',
        url: 'https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model',
      },
    ],
  },
  {
    id: 'js-event-loop-004',
    topic: 'javascript',
    tags: ['event-loop', 'promises'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `async function a() {
  console.log(1);
  await b();
  console.log(2);
}

async function b() {
  console.log(3);
}

a();
console.log(4);`,
    },
    options: [{ code: '1 2 3 4' }, { code: '1 3 2 4' }, { code: '1 3 4 2' }, { code: '1 4 3 2' }, { code: '4 1 3 2' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`a()` выполняется синхронно: выводит `1` и вызывает `b()`, которая тоже синхронно выводит `3` и возвращает промис. На `await` функция `a` приостанавливается.',
          en: '`a()` runs synchronously: it logs `1` and calls `b()`, which also synchronously logs `3` and returns a promise. At `await`, `a` is suspended.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Управление возвращается в основной код — выводится `4`. Продолжение `a` выполняется микрозадачей после синхронного кода — `2`.',
          en: 'Control returns to the main code, which logs `4`. The rest of `a` runs as a microtask after the synchronous code — `2`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — async function', url: `${MDN}/Reference/Statements/async_function` },
      { title: 'MDN — await', url: `${MDN}/Reference/Operators/await` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-promises-001',
    topic: 'javascript',
    tags: ['promises'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `Promise.all([
  Promise.resolve(1),
  Promise.reject(new Error('boom')),
  Promise.resolve(3),
])
  .then((values) => console.log('ok', values.join(',')))
  .catch((error) => console.log('fail', error.message));`,
    },
    options: [
      { code: 'ok 1,3' },
      { code: 'ok 1,,3' },
      { code: 'fail boom' },
      { code: 'fail Error' },
      { code: 'ok undefined' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Promise.all` отклоняется сразу, как только отклоняется **любой** из промисов, с его же причиной. Результаты успешных промисов при этом теряются.',
          en: '`Promise.all` rejects as soon as **any** of the promises rejects, with that same reason. The results of the successful promises are lost.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Если нужны результаты всех промисов, включая ошибки, используйте `Promise.allSettled`.',
          en: 'If you need the outcome of every promise, errors included, use `Promise.allSettled`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Promise.all()', url: `${MDN}/Reference/Global_Objects/Promise/all` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-promises-002',
    topic: 'javascript',
    tags: ['promises'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какой метод дождётся всех промисов и вернёт результат каждого — и успех, и ошибку, — не отклоняясь на первой ошибке?',
      en: 'Which method waits for all promises and returns each outcome — success or failure — without rejecting on the first error?',
    },
    options: [
      { code: 'Promise.all' },
      { code: 'Promise.race' },
      { code: 'Promise.any' },
      { code: 'Promise.allSettled' },
      { code: 'Promise.resolve' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`allSettled` всегда выполняется успешно и возвращает массив объектов `{ status: "fulfilled", value }` или `{ status: "rejected", reason }`.',
          en: '`allSettled` always fulfills and returns an array of `{ status: "fulfilled", value }` or `{ status: "rejected", reason }` objects.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`all` падает на первой ошибке, `race` берёт первый завершившийся промис (успех или ошибку), `any` — первый успешный, а если все упали, отклоняется с `AggregateError`.',
          en: '`all` fails on the first error, `race` settles with the first promise to settle (success or failure), and `any` takes the first success, rejecting with `AggregateError` if all fail.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Promise.allSettled()', url: `${MDN}/Reference/Global_Objects/Promise/allSettled` },
      { title: 'MDN — Promise.any()', url: `${MDN}/Reference/Global_Objects/Promise/any` },
    ],
  },
  {
    id: 'js-promises-003',
    topic: 'javascript',
    tags: ['promises'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => {
    throw new Error(String(x));
  })
  .catch((error) => Number(error.message) * 10)
  .then((x) => console.log(x));`,
    },
    options: [{ code: '2' }, { code: 'NaN' }, { code: 'Error: 2' }, { code: '10' }, { code: '20' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждый `.then` возвращает новый промис со значением, которое вернул колбэк. `throw` внутри колбэка отклоняет этот промис, и управление переходит к ближайшему `.catch`.',
          en: 'Each `.then` returns a new promise resolved with the callback’s return value. A `throw` inside a callback rejects that promise, and control jumps to the nearest `.catch`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`.catch` возвращает `2 * 10 = 20`, и цепочка снова становится успешной — следующий `.then` получает `20`.',
          en: '`.catch` returns `2 * 10 = 20`, and the chain becomes fulfilled again — the next `.then` receives `20`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Using promises: Chaining', url: `${MDN}/Guide/Using_promises#chaining` },
      { title: 'MDN — Promise.prototype.catch()', url: `${MDN}/Reference/Global_Objects/Promise/catch` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-promises-004',
    topic: 'javascript',
    tags: ['promises', 'event-loop'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const promise = new Promise((resolve) => {
  console.log('A');
  resolve('B');
  console.log('C');
});

promise.then(console.log);
console.log('D');`,
    },
    options: [{ code: 'A B C D' }, { code: 'A C B D' }, { code: 'D A C B' }, { code: 'A D C B' }, { code: 'A C D B' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Функция-исполнитель промиса вызывается **синхронно** прямо в `new Promise`, поэтому `A` и `C` выводятся сразу. `resolve` не прерывает исполнитель — `C` всё равно выводится.',
          en: 'The executor function runs **synchronously** inside `new Promise`, so `A` and `C` are logged right away. `resolve` doesn’t stop the executor — `C` is still logged.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Колбэк `.then` всегда асинхронный — это микрозадача. Он выполнится после синхронного `D`.',
          en: 'A `.then` callback is always asynchronous — it’s a microtask. It runs after the synchronous `D`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Promise() constructor', url: `${MDN}/Reference/Global_Objects/Promise/Promise` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-promises-005',
    topic: 'javascript',
    tags: ['promises', 'arrays'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  const result = [];
  [3, 1, 2].forEach(async (n) => {
    await wait(n * 10);
    result.push(n);
  });
  console.log(result.length);
}

run();`,
    },
    options: [{ code: '3' }, { code: '1' }, { code: '0' }, { code: '2' }, { code: 'undefined' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`forEach` не знает о промисах: он вызывает асинхронный колбэк и сразу идёт дальше, не дожидаясь его. Поэтому `console.log` срабатывает, когда в массиве ещё ничего нет.',
          en: '`forEach` knows nothing about promises: it calls the async callback and moves on without waiting. So `console.log` runs while the array is still empty.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `// последовательно / sequentially
for (const n of [3, 1, 2]) {
  await wait(n * 10);
  result.push(n);
}

// параллельно / in parallel
await Promise.all([3, 1, 2].map((n) => wait(n * 10)));`,
        },
      },
    ],
    sources: [
      {
        title: 'MDN — Array.prototype.forEach()',
        url: `${MDN}/Reference/Global_Objects/Array/forEach`,
      },
    ],
    verify: { kind: 'js-output' },
  },
];
