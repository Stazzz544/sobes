import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';

export const JAVASCRIPT_QUESTIONS_4: Question[] = [
  {
    id: 'js-objects-001',
    topic: 'javascript',
    tags: ['objects'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const a = { n: 1 };
const b = a;
b.n = 2;
const c = { ...a };
c.n = 3;
console.log(a.n, b.n, c.n);`,
    },
    options: [{ code: '1 2 3' }, { code: '2 2 3' }, { code: '3 3 3' }, { code: '2 2 2' }, { code: '1 1 3' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Объекты передаются по ссылке: `const b = a` копирует ссылку, и `a` с `b` указывают на один объект. Изменение через `b` видно через `a`.',
          en: 'Objects are handled by reference: `const b = a` copies the reference, so `a` and `b` point to the same object. A change through `b` is visible through `a`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Спред `{ ...a }` создаёт **новый** объект с копией свойств (поверхностно), поэтому `c.n = 3` исходный объект не трогает.',
          en: 'The spread `{ ...a }` creates a **new** object with a shallow copy of the properties, so `c.n = 3` doesn’t affect the original.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Working with objects', url: `${MDN}/Guide/Working_with_objects` },
      { title: 'MDN — Spread syntax', url: `${MDN}/Reference/Operators/Spread_syntax` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-objects-002',
    topic: 'javascript',
    tags: ['objects'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const original = { user: { name: 'Ann' } };
const copy = { ...original };
copy.user.name = 'Bob';

const deep = structuredClone(original);
console.log(original.user.name, deep.user === original.user);`,
    },
    options: [
      { code: 'Ann false' },
      { code: 'Ann true' },
      { code: 'Bob true' },
      { code: 'Bob false' },
      { code: 'TypeError' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Спред копирует только верхний уровень. Вложенный объект `user` в копии — та же ссылка, поэтому `copy.user.name = "Bob"` меняет и оригинал.',
          en: 'Spread copies only the top level. The nested `user` object in the copy is the same reference, so `copy.user.name = "Bob"` changes the original too.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`structuredClone` делает глубокую копию: вложенные объекты новые, поэтому сравнение ссылок даёт `false`. Функции и DOM-узлы он копировать не умеет.',
          en: '`structuredClone` makes a deep copy: nested objects are new, so the reference comparison is `false`. It can’t clone functions or DOM nodes.',
        },
      },
    ],
    sources: [
      {
        title: 'MDN — structuredClone()',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone',
      },
      { title: 'MDN — Shallow copy', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy' },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-objects-003',
    topic: 'javascript',
    tags: ['objects'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `'use strict';
const config = Object.freeze({ api: { url: 'a' } });
config.api.url = 'b';
try {
  config.mode = 'dev';
} catch (error) {
  console.log(error.constructor.name);
}
console.log(config.api.url);`,
    },
    options: [{ code: 'TypeError a' }, { code: 'b' }, { code: 'a' }, { code: 'TypeError b' }, { code: 'dev b' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Object.freeze` замораживает только сам объект: добавить или изменить его свойства нельзя, в строгом режиме это бросает `TypeError`.',
          en: '`Object.freeze` freezes only the object itself: you can’t add or change its properties, and in strict mode trying throws a `TypeError`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Заморозка **поверхностная**: вложенный объект `api` остался обычным, поэтому `config.api.url = "b"` сработал. Для глубокой заморозки нужно рекурсивно заморозить вложенные объекты.',
          en: 'Freezing is **shallow**: the nested `api` object stays mutable, so `config.api.url = "b"` worked. For a deep freeze you have to freeze nested objects recursively.',
        },
      },
    ],
    sources: [{ title: 'MDN — Object.freeze()', url: `${MDN}/Reference/Global_Objects/Object/freeze` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-objects-004',
    topic: 'javascript',
    tags: ['objects'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const object = { b: 1, 2: 1, a: 1, 1: 1 };
console.log(Object.keys(object).join(','));`,
    },
    options: [{ code: 'b,2,a,1' }, { code: 'a,b,1,2' }, { code: 'b,a,1,2' }, { code: '1,2,b,a' }, { code: '2,1,b,a' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Порядок собственных ключей объекта определён спецификацией: сначала ключи — целочисленные индексы по возрастанию, затем строковые ключи в порядке добавления, затем символы.',
          en: 'The spec defines the order of an object’s own keys: integer-like keys first in ascending order, then string keys in insertion order, then symbols.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому `1` и `2` идут первыми, хотя были объявлены позже. Если порядок вставки важен для любых ключей — используйте `Map`.',
          en: 'That’s why `1` and `2` come first even though they were declared later. If insertion order matters for every key, use a `Map`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Object.keys()', url: `${MDN}/Reference/Global_Objects/Object/keys` },
      {
        title: 'ECMAScript — OrdinaryOwnPropertyKeys',
        url: 'https://tc39.es/ecma262/#sec-ordinaryownpropertykeys',
      },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-modules-001',
    topic: 'javascript',
    tags: ['modules'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Чем ES-модули (`import`) отличаются от CommonJS (`require`)?',
      en: 'How do ES modules (`import`) differ from CommonJS (`require`)?',
    },
    options: [
      {
        text: {
          ru: 'Ничем: это два синтаксиса одного механизма',
          en: 'They don’t: it’s two syntaxes for the same mechanism',
        },
      },
      {
        text: {
          ru: 'CommonJS работает только в браузере, а ESM — только в Node.js',
          en: 'CommonJS only works in browsers, ESM only in Node.js',
        },
      },
      {
        text: {
          ru: 'Статические `import` известны до выполнения кода, что позволяет анализ и tree shaking; `require` — обычный вызов функции во время выполнения',
          en: 'Static `import`s are known before the code runs, enabling analysis and tree shaking; `require` is a regular function call at runtime',
        },
      },
      {
        text: {
          ru: '`require` можно писать только внутри функций',
          en: '`require` can only be used inside functions',
        },
      },
      {
        text: {
          ru: 'ESM всегда копирует значения при импорте, а CommonJS отдаёт живые ссылки',
          en: 'ESM always copies values on import, while CommonJS gives live references',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Объявления `import`/`export` статичны: их нельзя поставить в `if`, и граф зависимостей известен до выполнения. Поэтому сборщики умеют выкидывать неиспользуемые экспорты (tree shaking). Для динамической загрузки есть `import()`, возвращающий промис.',
          en: '`import`/`export` declarations are static: they can’t go inside an `if`, and the dependency graph is known before execution. That’s why bundlers can drop unused exports (tree shaking). For dynamic loading there’s `import()`, which returns a promise.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`require` — функция, её можно вызвать где угодно и с вычисленным путём. Она возвращает объект `module.exports` синхронно. А импорты ESM — живые привязки к переменным модуля, а не копии.',
          en: '`require` is a function: you can call it anywhere with a computed path, and it returns `module.exports` synchronously. ESM imports, by contrast, are live bindings to the module’s variables, not copies.',
        },
      },
    ],
    sources: [
      { title: 'MDN — JavaScript modules', url: `${MDN}/Guide/Modules` },
      { title: 'Node.js — ECMAScript modules', url: 'https://nodejs.org/api/esm.html' },
    ],
  },
  {
    id: 'js-modules-002',
    topic: 'javascript',
    tags: ['modules'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что выведет `main.js`?',
      en: 'What will `main.js` log?',
    },
    code: {
      lang: 'js',
      source: `// counter.js
export let count = 0;
export function increment() {
  count += 1;
}

// main.js
import { count, increment } from './counter.js';
increment();
console.log(count);`,
    },
    options: [
      { code: '0' },
      { code: 'undefined' },
      { code: '1' },
      { code: 'TypeError: Assignment to constant variable' },
      { code: 'NaN' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Импорт в ESM — **живая привязка** (live binding) к переменной модуля, а не копия значения. Когда `increment` меняет `count` внутри `counter.js`, `main.js` видит новое значение `1`.',
          en: 'An ESM import is a **live binding** to the module’s variable, not a copy of its value. When `increment` changes `count` inside `counter.js`, `main.js` sees the new value `1`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'При этом присвоить `count = 5` в `main.js` нельзя — импортированные привязки доступны только для чтения. В CommonJS после `const { count } = require(...)` осталась бы копия `0`.',
          en: 'You still can’t assign `count = 5` in `main.js` — imported bindings are read-only. In CommonJS, `const { count } = require(...)` would keep a copy: `0`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — import', url: `${MDN}/Reference/Statements/import` },
      { title: 'MDN — export', url: `${MDN}/Reference/Statements/export` },
    ],
  },
  {
    id: 'js-iterators-001',
    topic: 'javascript',
    tags: ['iterators'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function* gen() {
  const x = yield 1;
  yield x * 2;
}

const it = gen();
console.log(it.next().value, it.next(5).value, it.next().done);`,
    },
    options: [
      { code: '1 5 false' },
      { code: '1 NaN true' },
      { code: '1 10 false' },
      { code: 'undefined 10 true' },
      { code: '1 10 true' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Первый `next()` запускает генератор до первого `yield 1`. Второй `next(5)` возобновляет его, и выражение `yield 1` возвращает переданное значение `5`, поэтому `x = 5`, а дальше `yield 10`.',
          en: 'The first `next()` runs the generator up to `yield 1`. The second `next(5)` resumes it, and the `yield 1` expression evaluates to the passed value `5`, so `x = 5`, then `yield 10`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Третий `next()` доходит до конца функции: `{ value: undefined, done: true }`. Аргумент первого `next()` всегда игнорируется — его некому принять.',
          en: 'The third `next()` reaches the end of the function: `{ value: undefined, done: true }`. The argument of the first `next()` is always ignored — there’s no `yield` waiting to receive it.',
        },
      },
    ],
    sources: [
      { title: 'MDN — function*', url: `${MDN}/Reference/Statements/function*` },
      { title: 'MDN — Generator.prototype.next()', url: `${MDN}/Reference/Global_Objects/Generator/next` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-iterators-002',
    topic: 'javascript',
    tags: ['collections', 'iterators'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: { lang: 'js', source: `console.log([...new Set('hello')].join(''));` },
    options: [{ code: 'hello' }, { code: 'h,e,l,o' }, { code: 'helo' }, { code: 'olleh' }, { code: 'hel' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Строка итерируема посимвольно, поэтому `new Set("hello")` получает символы `h, e, l, l, o`. `Set` хранит только уникальные значения в порядке первого добавления — второй `l` отбрасывается.',
          en: 'A string is iterable by characters, so `new Set("hello")` receives `h, e, l, l, o`. A `Set` keeps only unique values in first-insertion order — the second `l` is dropped.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const unique = [...new Set([3, 1, 3, 2, 1])]; // [3, 1, 2]`,
        },
      },
    ],
    sources: [{ title: 'MDN — Set', url: `${MDN}/Reference/Global_Objects/Set` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-collections-001',
    topic: 'javascript',
    tags: ['collections', 'objects'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const map = new Map();
const key = { id: 1 };
map.set(key, 'a');
map.set({ id: 1 }, 'b');
console.log(map.size, map.get(key), map.get({ id: 1 }));`,
    },
    options: [
      { code: '1 b b' },
      { code: '2 a b' },
      { code: '1 a undefined' },
      { code: '2 a undefined' },
      { code: '2 b undefined' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Map` сравнивает ключи-объекты по ссылке (алгоритм SameValueZero), а не по содержимому. Два литерала `{ id: 1 }` — два разных объекта, поэтому в карте два ключа.',
          en: 'A `Map` compares object keys by reference (SameValueZero), not by content. Two `{ id: 1 }` literals are two different objects, so the map has two keys.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`map.get(key)` находит запись по той же ссылке, а `map.get({ id: 1 })` ищет по третьему, новому объекту и возвращает `undefined`.',
          en: '`map.get(key)` finds the entry by the same reference, while `map.get({ id: 1 })` looks up a third, brand-new object and returns `undefined`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Map', url: `${MDN}/Reference/Global_Objects/Map` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-collections-002',
    topic: 'javascript',
    tags: ['collections'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Зачем нужен `WeakMap`?', en: 'What is `WeakMap` for?' },
    options: [
      {
        text: {
          ru: 'Это `Map`, оптимизированный для числовых ключей',
          en: 'It’s a `Map` optimized for numeric keys',
        },
      },
      {
        text: {
          ru: 'Его можно перебрать через `for...of`, а обычный `Map` — нет',
          en: 'It can be iterated with `for...of`, while a regular `Map` can’t',
        },
      },
      {
        text: {
          ru: 'Записи `WeakMap` автоматически удаляются через заданное время',
          en: '`WeakMap` entries are removed automatically after a set time',
        },
      },
      {
        text: {
          ru: 'Он слабо держит значения, а ключи хранит как обычный `Map`',
          en: 'It holds values weakly and keeps keys like a regular `Map`',
        },
      },
      {
        text: {
          ru: 'Ключи — только объекты, и они не мешают сборке мусора: когда объект больше нигде не нужен, запись пропадает. Удобно для кэшей и данных, привязанных к объектам',
          en: 'Keys must be objects and don’t prevent garbage collection: once an object is unreachable elsewhere, its entry disappears. Handy for caches and per-object data',
        },
      },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`WeakMap` держит **ключи** слабо: запись не удерживает объект в памяти. Поэтому его нельзя перебрать и у него нет `size` — содержимое зависит от сборщика мусора.',
          en: '`WeakMap` holds its **keys** weakly: an entry doesn’t keep the object alive. That’s why it isn’t iterable and has no `size` — its contents depend on the garbage collector.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const cache = new WeakMap();
function getMeta(element) {
  if (!cache.has(element)) {
    cache.set(element, computeMeta(element));
  }
  return cache.get(element);
}
// элемент удалён из DOM — запись тоже уйдёт
// element removed from the DOM — the entry goes away too`,
        },
      },
    ],
    sources: [{ title: 'MDN — WeakMap', url: `${MDN}/Reference/Global_Objects/WeakMap` }],
  },
  {
    id: 'js-arrays-001',
    topic: 'javascript',
    tags: ['arrays', 'types-coercion'],
    difficulty: 3,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: { lang: 'js', source: `console.log([1, 2, 3].map(parseInt).join(' '));` },
    options: [{ code: '1 2 3' }, { code: 'NaN NaN NaN' }, { code: '1 NaN 3' }, { code: '0 1 2' }, { code: '1 NaN NaN' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`map` передаёт в колбэк три аргумента: элемент, индекс и массив. `parseInt` принимает второй аргумент как основание системы счисления, поэтому вызываются `parseInt("1", 0)`, `parseInt("2", 1)` и `parseInt("3", 2)`.',
          en: '`map` passes three arguments to the callback: element, index and array. `parseInt` treats the second argument as the radix, so the calls are `parseInt("1", 0)`, `parseInt("2", 1)` and `parseInt("3", 2)`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Основание `0` означает «по умолчанию» (10) → `1`. Основание `1` недопустимо → `NaN`. В двоичной системе нет цифры `3` → `NaN`. Правильно: `.map(Number)` или `.map((s) => parseInt(s, 10))`.',
          en: 'Radix `0` means “default” (10) → `1`. Radix `1` is invalid → `NaN`. There’s no digit `3` in binary → `NaN`. Correct: `.map(Number)` or `.map((s) => parseInt(s, 10))`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — parseInt()', url: `${MDN}/Reference/Global_Objects/parseInt` },
      { title: 'MDN — Array.prototype.map()', url: `${MDN}/Reference/Global_Objects/Array/map` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-arrays-002',
    topic: 'javascript',
    tags: ['arrays'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const numbers = [10, 1, 2];
console.log([...numbers].sort().join(','), [...numbers].sort((a, b) => a - b).join(','));`,
    },
    options: [
      { code: '1,2,10 1,2,10' },
      { code: '10,2,1 1,2,10' },
      { code: '1,10,2 10,2,1' },
      { code: '1,10,2 1,2,10' },
      { code: '2,10,1 1,2,10' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Без функции сравнения `sort` приводит элементы к строкам и сравнивает их посимвольно: `"10" < "2"`, потому что `"1" < "2"`. Для чисел всегда передавайте компаратор `(a, b) => a - b`.',
          en: 'Without a compare function, `sort` converts elements to strings and compares them character by character: `"10" < "2"` because `"1" < "2"`. For numbers, always pass a comparator `(a, b) => a - b`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`sort` меняет исходный массив, поэтому в примере сортируются копии. В ES2023 появился `toSorted()`, который возвращает новый массив.',
          en: '`sort` mutates the original array, which is why the example sorts copies. ES2023 added `toSorted()`, which returns a new array.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.sort()', url: `${MDN}/Reference/Global_Objects/Array/sort` },
      { title: 'MDN — Array.prototype.toSorted()', url: `${MDN}/Reference/Global_Objects/Array/toSorted` },
    ],
    verify: { kind: 'js-output' },
  },
];
