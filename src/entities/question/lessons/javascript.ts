import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';

export const JAVASCRIPT_LESSONS: Lesson[] = [
  {
    tag: 'closures',
    summary: {
      ru: 'Функция запоминает переменные того места, где её создали, и видит их даже после того, как внешняя функция завершилась.',
      en: 'A function remembers the variables of the place where it was created and still sees them after the outer function has returned.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Когда функция создаётся, она получает ссылку на [[lexical-environment|лексическое окружение]] — переменные той области, где её объявили. Функция вместе с этим окружением и называется замыканием. Хранится **ссылка на переменные, а не копия значений**: если переменная изменится, функция увидит новое значение.',
          en: 'When a function is created, it gets a reference to its [[lexical-environment|lexical environment]] — the variables of the scope where it was declared. The function together with that environment is called a closure. It keeps a **reference to the variables, not a copy of their values**: if a variable changes, the function sees the new value.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function makeCounter() {
  let count = 0;
  return () => ++count;
}

const first = makeCounter();
const second = makeCounter();
first();
first();
console.log(first(), second()); // 3 1`,
        },
        caption: {
          ru: 'Каждый вызов makeCounter создаёт новое окружение со своим count.',
          en: 'Each makeCounter call creates a new environment with its own count.',
        },
      },
      { type: 'diagram', diagram: 'closure-counters' },
      {
        type: 'text',
        text: {
          ru: 'Где это встречается каждый день: приватное состояние без классов (счётчики, кеши), фабрики функций, колбэки и обработчики событий, которые помнят свои параметры, хуки React — каждый рендер создаёт новые замыкания над props и state.',
          en: 'Where you meet it every day: private state without classes (counters, caches), function factories, callbacks and event handlers that remember their parameters, React hooks — each render creates new closures over props and state.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Классическая ловушка — `var` в цикле: у всех колбэков одна общая переменная `i`, и к моменту их вызова цикл уже закончился. `let` создаёт новую переменную на каждой итерации, и каждый колбэк замыкает свою.',
          en: 'The classic trap is `var` in a loop: all callbacks share one `i`, and by the time they run the loop is over. `let` creates a new variable on every iteration, so each callback closes over its own.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // 3 3 3
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j)); // 0 1 2
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'У замыканий есть цена: пока функция жива, живы и переменные, на которые она ссылается. Большой объект, захваченный долгоживущим обработчиком, сборщик мусора не освободит, пока обработчик не удалят.',
          en: 'Closures have a cost: while the function is alive, so are the variables it references. A large object captured by a long-lived handler can’t be garbage-collected until the handler is removed.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Замыкание — функция плюс ссылка на окружение, где она создана.', en: 'A closure is a function plus a reference to the environment where it was created.' },
      { ru: 'Хранится ссылка на переменные, а не снимок значений.', en: 'It keeps a reference to the variables, not a snapshot of their values.' },
      { ru: 'Каждый вызов внешней функции создаёт новое окружение.', en: 'Every call of the outer function creates a new environment.' },
      {
        ru: '`let` в цикле — новая переменная на каждой итерации, `var` — одна на весь цикл.',
        en: '`let` in a loop gives a new variable per iteration, `var` gives one for the whole loop.',
      },
      { ru: 'Захваченные переменные живут, пока живо замыкание.', en: 'Captured variables live as long as the closure does.' },
    ],
    sources: [
      { title: 'MDN — Closures', url: `${MDN}/Guide/Closures` },
      { title: 'MDN — let', url: `${MDN}/Reference/Statements/let` },
    ],
  },
  {
    tag: 'event-loop',
    summary: {
      ru: 'JavaScript выполняет код в одном потоке: синхронный код до конца, затем все микрозадачи, затем одна макрозадача — и по кругу.',
      en: 'JavaScript runs code on a single thread: synchronous code to the end, then all microtasks, then one task — and around again.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'У движка один стек вызовов. Пока в нём есть код, ничего другого не выполняется — поэтому долгий синхронный цикл «замораживает» страницу. Асинхронные API (`setTimeout`, сеть, события) текущий код не прерывают: когда результат готов, они ставят колбэк в очередь.',
          en: 'The engine has a single call stack. While there is code on it, nothing else runs — that’s why a long synchronous loop freezes the page. Asynchronous APIs (`setTimeout`, network, events) don’t interrupt running code: when a result is ready, they queue a callback.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Очередей две. **Макрозадачи**: таймеры, события ввода, `postMessage`, ввод-вывод. [[microtask|Микрозадачи]]: колбэки промисов (`then`, `catch`, `finally`, продолжение после `await`) и `queueMicrotask`. Цикл событий берёт одну макрозадачу, затем **полностью** опустошает очередь микрозадач, в браузере при необходимости рисует кадр — и переходит к следующей макрозадаче.',
          en: 'There are two queues. **Tasks** (macrotasks): timers, input events, `postMessage`, I/O. [[microtask|Microtasks]]: promise callbacks (`then`, `catch`, `finally`, the continuation after `await`) and `queueMicrotask`. The event loop takes one task, then drains the microtask queue **completely**, renders a frame in the browser if needed — and moves on to the next task.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 1 4 3 2`,
        },
        caption: {
          ru: 'Синхронный код, затем микрозадача промиса, и только потом таймер.',
          en: 'Synchronous code, then the promise microtask, and only then the timer.',
        },
      },
      { type: 'diagram', diagram: 'event-loop-basic' },
      {
        type: 'text',
        text: {
          ru: 'Следствия. `setTimeout(fn, 0)` значит не «сейчас», а «после текущего кода и всех микрозадач». Код после `await` — это микрозадача: функция возвращает управление, и продолжение выполнится, когда закончится синхронный код. Микрозадачи, которые всё время порождают новые, заблокируют и таймеры, и отрисовку.',
          en: 'Consequences. `setTimeout(fn, 0)` means not “now” but “after the current code and all microtasks”. Code after `await` is a microtask: the function returns control, and the continuation runs once the synchronous code is done. Microtasks that keep scheduling new ones will block both timers and rendering.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `async function run() {
  console.log('a');
  await null;
  console.log('c');
}

run();
console.log('b');
// a b c`,
        },
        caption: {
          ru: 'До первого await асинхронная функция выполняется синхронно.',
          en: 'An async function runs synchronously until its first await.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Синхронный код выполняется до конца — его ничто не прерывает.', en: 'Synchronous code runs to completion — nothing interrupts it.' },
      {
        ru: 'Микрозадачи (промисы, await, queueMicrotask) выполняются раньше следующей макрозадачи (таймеры, события).',
        en: 'Microtasks (promises, await, queueMicrotask) run before the next task (timers, events).',
      },
      {
        ru: 'Очередь микрозадач опустошается полностью, даже если в ней появляются новые.',
        en: 'The microtask queue is drained completely, even if new microtasks are added.',
      },
      {
        ru: '`setTimeout(fn, 0)` — «после текущего кода и всех микрозадач», а не «сразу».',
        en: '`setTimeout(fn, 0)` means “after the current code and all microtasks”, not “immediately”.',
      },
      { ru: 'Продолжение после `await` — микрозадача.', en: 'The continuation after `await` is a microtask.' },
    ],
    sources: [
      { title: 'MDN — JavaScript execution model', url: `${MDN}/Reference/Execution_model` },
      {
        title: 'MDN — Using microtasks',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide',
      },
      { title: 'HTML Standard — Event loops', url: 'https://html.spec.whatwg.org/multipage/webappapis.html#event-loops' },
    ],
  },
  {
    tag: 'this',
    summary: {
      ru: '`this` определяется не местом объявления функции, а тем, как её вызвали. Исключение — стрелочные функции: своего `this` у них нет.',
      en: '`this` is determined not by where a function is declared but by how it is called. Arrow functions are the exception: they have no `this` of their own.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Для обычных функций действуют четыре правила, по убыванию приоритета: вызов с `new` — `this` это новый объект; `call`, `apply`, `bind` — явно переданное значение; вызов как метода `obj.method()` — объект слева от точки; просто `fn()` — `undefined` в строгом режиме (модули и классы всегда строгие), иначе глобальный объект.',
          en: 'Regular functions follow four rules, from highest priority: called with `new` — `this` is the new object; `call`, `apply`, `bind` — the value passed explicitly; called as a method `obj.method()` — the object left of the dot; a plain `fn()` — `undefined` in strict mode (modules and classes are always strict), otherwise the global object.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `'use strict';
const user = {
  name: 'Ann',
  greet() {
    return 'Hi, ' + this.name;
  },
};

console.log(user.greet()); // Hi, Ann
console.log(user.greet.call({ name: 'Bob' })); // Hi, Bob

const greet = user.greet;
greet(); // TypeError: this is undefined`,
        },
        caption: {
          ru: 'Метод, сохранённый в переменную, теряет объект.',
          en: 'A method stored in a variable loses its object.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Метод «отрывается» от объекта всякий раз, когда его передают как значение: `setTimeout(user.greet)`, `addEventListener(\'click\', obj.handle)`, `const { greet } = user`. Помогают `bind`, обёртка-стрелка `() => user.greet()` или поле класса со стрелочной функцией. В обработчике DOM-события, заданном обычной функцией, `this` — элемент, на котором висит обработчик.',
          en: 'A method gets detached from its object whenever it is passed as a value: `setTimeout(user.greet)`, `addEventListener(\'click\', obj.handle)`, `const { greet } = user`. Use `bind`, an arrow wrapper `() => user.greet()`, or a class field holding an arrow function. In a DOM event handler defined as a regular function, `this` is the element the handler is attached to.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'У стрелочной функции нет своего `this`: она берёт его из окружения, где создана, и `call`, `bind` или `new` этого не меняют. Поэтому стрелки удобны для колбэков внутри методов, но не годятся как методы объекта, которым нужен `this` этого объекта.',
          en: 'An arrow function has no `this` of its own: it takes it from the environment where it was created, and `call`, `bind` or `new` don’t change that. That makes arrows handy for callbacks inside methods, but wrong as object methods that need the object’s `this`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `class Timer {
  seconds = 0;

  start() {
    setInterval(() => {
      this.seconds += 1;
    }, 1000);
  }
}`,
        },
        caption: {
          ru: 'Стрелка внутри метода видит this экземпляра.',
          en: 'The arrow inside the method sees the instance’s this.',
        },
      },
    ],
    keyPoints: [
      { ru: '`this` задаётся в момент вызова, а не объявления.', en: '`this` is set at call time, not at declaration time.' },
      {
        ru: 'Приоритет: `new` → `call`/`apply`/`bind` → `obj.method()` → обычный вызов.',
        en: 'Priority: `new` → `call`/`apply`/`bind` → `obj.method()` → plain call.',
      },
      {
        ru: 'При обычном вызове в строгом режиме (модули, классы) `this` — `undefined`.',
        en: 'In a plain call in strict mode (modules, classes) `this` is `undefined`.',
      },
      {
        ru: 'Метод, переданный как значение, теряет контекст — помогает `bind` или обёртка-стрелка.',
        en: 'A method passed as a value loses its context — use `bind` or an arrow wrapper.',
      },
      {
        ru: 'У стрелочных функций своего `this` нет — он берётся из окружения, где их создали.',
        en: 'Arrow functions have no `this` of their own — it comes from where they were created.',
      },
    ],
    sources: [
      { title: 'MDN — this', url: `${MDN}/Reference/Operators/this` },
      { title: 'MDN — Function.prototype.bind()', url: `${MDN}/Reference/Global_Objects/Function/bind` },
      { title: 'MDN — Arrow function expressions', url: `${MDN}/Reference/Functions/Arrow_functions` },
    ],
  },
];
