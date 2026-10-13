import type { Question } from '../model/types';

export const JAVASCRIPT_QUESTIONS: Question[] = [
  {
    id: 'js-event-loop-001',
    topic: 'javascript',
    tags: ['event-loop', 'promises'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В каком порядке выведутся значения?',
      en: 'In what order will the values be logged?',
    },
    code: {
      lang: 'js',
      source: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
    },
    options: [{ code: '1 2 3 4' }, { code: '1 4 3 2' }, { code: '1 4 2 3' }, { code: '1 3 4 2' }, { code: '4 1 3 2' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сначала выполняется весь синхронный код: `1` и `4`. Колбэк `.then` попадает в очередь микрозадач, а колбэк `setTimeout` — в очередь макрозадач (задач таймеров).',
          en: 'All synchronous code runs first: `1` and `4`. The `.then` callback goes to the microtask queue, and the `setTimeout` callback goes to the task (macrotask) queue.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Когда стек вызовов опустел, движок **полностью** опустошает очередь микрозадач (`3`) и только потом берёт следующую макрозадачу (`2`). Даже `setTimeout(…, 0)` всегда уступает промисам.',
          en: 'Once the call stack is empty, the engine drains the **entire** microtask queue (`3`) and only then takes the next task (`2`). Even `setTimeout(…, 0)` always loses to promises.',
        },
      },
      { type: 'diagram', diagram: 'event-loop-basic' },
    ],
    sources: [
      {
        title: 'MDN — Using microtasks in JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide',
      },
      {
        title: 'MDN — JavaScript execution model',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model',
      },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-closures-001',
    topic: 'javascript',
    tags: ['closures', 'scope'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что выведет код?',
      en: 'What will this code log?',
    },
    code: {
      lang: 'js',
      source: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    },
    options: [
      { code: '0 1 2' },
      { code: '2 2 2' },
      { code: '3 3 3' },
      { code: '0 0 0' },
      { code: 'undefined undefined undefined' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`var` имеет область видимости функции, поэтому на все итерации существует **одна** переменная `i`. Все три стрелочные функции замыкают одну и ту же переменную.',
          en: '`var` is function-scoped, so there is **one** `i` variable shared by all iterations. All three arrow functions close over the same variable.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Колбэки таймеров запускаются уже после завершения цикла, когда `i` равно `3`. С `let` на каждую итерацию создаётся новая привязка, и вывод будет `0 1 2`.',
          en: 'Timer callbacks run after the loop has finished, when `i` is `3`. With `let`, each iteration gets a fresh binding and the output is `0 1 2`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0 1 2`,
        },
      },
    ],
    sources: [
      { title: 'MDN — Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures' },
      { title: 'MDN — let', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let' },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-this-001',
    topic: 'javascript',
    tags: ['this'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что выведет код в строгом режиме?',
      en: 'What will this code log in strict mode?',
    },
    code: {
      lang: 'js',
      source: `'use strict';
const counter = {
  count: 10,
  getCount() {
    return this.count;
  },
};
const getCount = counter.getCount;
try {
  console.log(getCount());
} catch (error) {
  console.log(error.constructor.name);
}`,
    },
    options: [{ code: '10' }, { code: 'undefined' }, { code: 'TypeError' }, { code: 'ReferenceError' }, { code: 'NaN' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`this` определяется не местом объявления метода, а **способом вызова**. `getCount()` вызывается без объекта слева от точки, поэтому в строгом режиме `this` равно `undefined`.',
          en: '`this` is determined not by where the method is declared but by **how it is called**. `getCount()` is called with nothing to the left of the dot, so in strict mode `this` is `undefined`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтение свойства у `undefined` бросает `TypeError`. Исправить можно привязкой `counter.getCount.bind(counter)` или вызовом через объект `counter.getCount()`.',
          en: 'Reading a property of `undefined` throws a `TypeError`. Fix it with `counter.getCount.bind(counter)` or by calling it on the object: `counter.getCount()`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const bound = counter.getCount.bind(counter);
console.log(bound()); // 10`,
        },
      },
    ],
    sources: [
      { title: 'MDN — this', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this' },
      {
        title: 'MDN — Function.prototype.bind()',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind',
      },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-types-001',
    topic: 'javascript',
    tags: ['types-coercion'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что выведет код?',
      en: 'What will this code log?',
    },
    code: {
      lang: 'js',
      source: 'console.log(typeof null, typeof NaN, typeof []);',
    },
    options: [
      { code: 'null number array' },
      { code: 'object NaN object' },
      { code: 'object number array' },
      { code: 'object number object' },
      { code: 'null NaN object' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`typeof null === "object"` — известная историческая ошибка первой реализации JavaScript, которую оставили ради совместимости. `NaN` (Not-a-Number) — значение типа `number`.',
          en: '`typeof null === "object"` is a well-known historical bug from the first JavaScript implementation, kept for compatibility. `NaN` (Not-a-Number) is a value of type `number`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Массивы — это объекты, поэтому `typeof []` даёт `"object"`. Чтобы проверить массив, используйте `Array.isArray()`, а для `null` — строгое сравнение `value === null`.',
          en: 'Arrays are objects, so `typeof []` is `"object"`. Use `Array.isArray()` to detect arrays and `value === null` to check for `null`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — typeof', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof' },
      {
        title: 'MDN — Array.isArray()',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray',
      },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-async-001',
    topic: 'javascript',
    tags: ['promises', 'event-loop'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В каком порядке выведутся буквы?',
      en: 'In what order will the letters be logged?',
    },
    code: {
      lang: 'js',
      source: `async function run() {
  console.log('A');
  await null;
  console.log('B');
}
run();
Promise.resolve().then(() => console.log('C'));
console.log('D');`,
    },
    options: [{ code: 'A B D C' }, { code: 'A D C B' }, { code: 'A D B C' }, { code: 'A B C D' }, { code: 'D A B C' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Async-функция выполняется **синхронно** до первого `await`, поэтому `A` выводится сразу при вызове `run()`.',
          en: 'An async function runs **synchronously** until its first `await`, so `A` is logged right when `run()` is called.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`await null` ставит продолжение функции в очередь микрозадач. Затем `.then` ставит туда же колбэк с `C`. Синхронный код заканчивается выводом `D`, после чего микрозадачи выполняются по порядку постановки: сначала `B`, потом `C`.',
          en: '`await null` queues the rest of the function as a microtask. Then `.then` queues the `C` callback after it. Synchronous code ends with `D`, and microtasks run in the order they were queued: `B` first, then `C`.',
        },
      },
      { type: 'diagram', diagram: 'event-loop-async' },
    ],
    sources: [
      {
        title: 'MDN — await',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await',
      },
      {
        title: 'MDN — Using microtasks in JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide',
      },
    ],
    verify: { kind: 'js-output' },
  },
];
