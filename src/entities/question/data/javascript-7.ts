import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';

const OUTPUT_PROMPT = { ru: 'Что выведет код?', en: 'What will this code log?' };

export const JAVASCRIPT_QUESTIONS_7: Question[] = [
  {
    id: 'js-equality-003',
    topic: 'javascript',
    tags: ['equality'],
    difficulty: 3,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `console.log([] == false, [] == ![], '' == 0, '0' == false);`,
    },
    options: [
      { code: 'false false true false' },
      { code: 'true false true true' },
      { code: 'true true true true' },
      { code: 'false true false true' },
      { code: 'true true false false' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При `==` с булевым значением оно сначала превращается в число: `false` → `0`. Массив приводится к примитиву через `toString`: `[]` → `""` → `0`. Поэтому `[] == false` — `0 == 0`. `![]` — это `false` (любой объект истинен), и `[] == ![]` сводится к тому же сравнению. `"" == 0` и `"0" == false` тоже сравнивают `0` с `0`. Отсюда правило: в коде используют `===`.',
          en: 'With `==`, a boolean is first converted to a number: `false` → `0`. An array is converted to a primitive via `toString`: `[]` → `""` → `0`. So `[] == false` is `0 == 0`. `![]` is `false` (every object is truthy), and `[] == ![]` reduces to the same comparison. `"" == 0` and `"0" == false` also compare `0` with `0`. Hence the rule: use `===` in code.',
        },
      },
    ],
    sources: [{ title: 'MDN — Equality (==)', url: `${MDN}/Reference/Operators/Equality` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-equality-004',
    topic: 'javascript',
    tags: ['equality'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const a = [1, 2];
const b = [1, 2];
console.log(a === b, JSON.stringify(a) === JSON.stringify(b), a === a);`,
    },
    options: [
      { code: 'true true true' },
      { code: 'false true true' },
      { code: 'false false true' },
      { code: 'true false true' },
      { code: 'false true false' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Объекты и массивы сравниваются **по ссылке**: два одинаковых литерала — два разных объекта, поэтому `a === b` ложно, а `a === a` истинно. Чтобы сравнить содержимое, нужна своя проверка: для простых данных подойдёт сравнение `JSON.stringify`, но оно зависит от порядка ключей и теряет `undefined`, функции и `Date`.',
          en: 'Objects and arrays are compared **by reference**: two identical literals are two different objects, so `a === b` is false and `a === a` is true. Comparing contents needs a custom check: for plain data comparing `JSON.stringify` works, but it depends on key order and loses `undefined`, functions and `Date`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Equality comparisons and sameness', url: `${MDN}/Guide/Equality_comparisons_and_sameness` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-scope-003',
    topic: 'javascript',
    tags: ['scope'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `let x = 1;
if (true) {
  let x = 2;
}

var y = 1;
if (true) {
  var y = 2;
}

console.log(x, y);`,
    },
    options: [{ code: '1 1' }, { code: '2 2' }, { code: '1 2' }, { code: '2 1' }, { code: 'SyntaxError' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`let` и `const` видны только внутри блока `{}`, поэтому `let x = 2` создаёт новую переменную, которая исчезает после блока, — снаружи `x` остаётся 1. `var` не знает о блоках: его область — вся функция (или модуль), и `var y = 2` переприсваивает ту же переменную. Отсюда совет: `var` в новом коде не используют.',
          en: '`let` and `const` are visible only inside the `{}` block, so `let x = 2` creates a new variable that disappears after the block — outside, `x` stays 1. `var` ignores blocks: its scope is the whole function (or module), and `var y = 2` reassigns the same variable. Hence the advice: don’t use `var` in new code.',
        },
      },
    ],
    sources: [{ title: 'MDN — let', url: `${MDN}/Reference/Statements/let` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-scope-004',
    topic: 'javascript',
    tags: ['scope'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `var name = 'global';

function show() {
  console.log(name);
  var name = 'local';
}

show();`,
    },
    options: [{ code: 'global' }, { code: 'local' }, { code: 'undefined' }, { code: 'ReferenceError' }, { code: 'null' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Объявление `var name` внутри функции **поднимается** в её начало, а присваивание остаётся на месте. Локальная `name` перекрывает глобальную уже с первой строки функции, но значение ей ещё не присвоено — поэтому `undefined`. С `let` на этой строке был бы `ReferenceError`: переменная находилась бы во временной мёртвой зоне.',
          en: 'The `var name` declaration inside the function is **hoisted** to its top, while the assignment stays in place. The local `name` shadows the global one from the function’s first line, but it hasn’t been assigned yet — hence `undefined`. With `let` this line would throw a `ReferenceError`: the variable would be in the temporal dead zone.',
        },
      },
    ],
    sources: [{ title: 'MDN — Hoisting', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-scope-005',
    topic: 'javascript',
    tags: ['scope'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const value = 'outer';

function read() {
  return value;
}

function run() {
  const value = 'inner';
  return read();
}

console.log(run());`,
    },
    options: [{ code: 'inner' }, { code: 'outer' }, { code: 'undefined' }, { code: 'ReferenceError' }, { code: 'inner outer' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Область видимости в JavaScript **лексическая**: функция ищет переменные там, где она **объявлена**, а не там, откуда её вызвали. `read` объявлена на верхнем уровне, поэтому видит внешнюю `value`, а локальная `value` внутри `run` ей недоступна. Тот же механизм лежит в основе замыканий.',
          en: 'Scope in JavaScript is **lexical**: a function looks up variables where it is **declared**, not where it’s called from. `read` is declared at the top level, so it sees the outer `value`, and the local `value` inside `run` is invisible to it. The same mechanism underlies closures.',
        },
      },
    ],
    sources: [{ title: 'MDN — Closures: lexical scoping', url: `${MDN}/Guide/Closures#lexical_scoping` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-closures-005',
    topic: 'javascript',
    tags: ['closures'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `function createWallet() {
  let balance = 0;
  return {
    add: (amount) => (balance += amount),
    get: () => balance,
  };
}

const wallet = createWallet();
wallet.add(5);
wallet.balance = 100;
console.log(wallet.get(), wallet.balance);`,
    },
    options: [{ code: '100 100' }, { code: '5 100' }, { code: '5 undefined' }, { code: '105 100' }, { code: '0 100' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`balance` — переменная из окружения `createWallet`, а не свойство объекта. Добраться до неё можно только через функции, которые её замкнули, — это и есть приватное состояние на замыканиях. `wallet.balance = 100` просто создаёт новое свойство объекта и на переменную не влияет, поэтому `get()` возвращает 5.',
          en: '`balance` is a variable from `createWallet`’s environment, not an object property. It can only be reached through the functions that closed over it — that’s private state via closures. `wallet.balance = 100` just creates a new object property and doesn’t touch the variable, so `get()` returns 5.',
        },
      },
    ],
    sources: [{ title: 'MDN — Closures: emulating private methods', url: `${MDN}/Guide/Closures#emulating_private_methods_with_closures` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-this-004',
    topic: 'javascript',
    tags: ['this'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const timer = {
  seconds: 0,
  start() {
    [1, 2, 3].forEach(function () {
      this.seconds += 1;
    }, this);
    [1, 2].forEach(() => {
      this.seconds += 10;
    });
    return this.seconds;
  },
};

console.log(timer.start());`,
    },
    options: [{ code: '0' }, { code: '3' }, { code: '20' }, { code: '23' }, { code: 'NaN' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обычная функция-колбэк получает свой `this` от вызова, и `forEach` передаёт ей значение второго аргумента — здесь сам `timer`, поэтому три итерации дают +3. Стрелочная функция своего `this` не имеет и берёт его из места, где создана, — из метода `start`, то есть тоже `timer`: ещё +20. Итого 23.',
          en: 'A regular callback gets its `this` from the call, and `forEach` passes the value of its second argument — here `timer` itself, so three iterations add 3. An arrow function has no `this` of its own and takes it from where it was created — the `start` method, so also `timer`: another 20. 23 in total.',
        },
      },
    ],
    sources: [{ title: 'MDN — Array.prototype.forEach(): thisArg', url: `${MDN}/Reference/Global_Objects/Array/forEach` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-this-005',
    topic: 'javascript',
    tags: ['this'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `class Counter {
  count = 0;
  increment() {
    this.count += 1;
  }
}

const counter = new Counter();
const handlers = [counter.increment, () => counter.increment()];
let errors = 0;
for (const handler of handlers) {
  try {
    handler();
  } catch {
    errors += 1;
  }
}
console.log(counter.count, errors);`,
    },
    options: [{ code: '2 0' }, { code: '1 1' }, { code: '0 2' }, { code: '1 0' }, { code: '2 1' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`counter.increment` без вызова — просто ссылка на функцию из прототипа. Вызванная сама по себе, она получает `this === undefined` (тело класса всегда в строгом режиме), и `this.count` бросает `TypeError`. Стрелка `() => counter.increment()` вызывает метод через объект, и `this` правильный. Так теряют `this`, передавая метод как обработчик; лечится стрелкой, `bind` или полем-стрелкой в классе.',
          en: '`counter.increment` without a call is just a reference to the prototype function. Called on its own it gets `this === undefined` (class bodies are always strict), and `this.count` throws a `TypeError`. The arrow `() => counter.increment()` calls the method through the object, so `this` is correct. That’s how `this` gets lost when passing a method as a handler; fix it with an arrow, `bind` or an arrow class field.',
        },
      },
    ],
    sources: [{ title: 'MDN — this', url: `${MDN}/Reference/Operators/this` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-proto-004',
    topic: 'javascript',
    tags: ['prototypes'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const base = {
  kind: 'base',
  greet() {
    return 'hi';
  },
};
const child = Object.create(base);
child.kind = 'child';

console.log(child.greet(), child.kind, base.kind, Object.hasOwn(child, 'greet'));`,
    },
    options: [
      { code: 'hi child child false' },
      { code: 'hi child base true' },
      { code: 'hi child base false' },
      { code: 'undefined child base false' },
      { code: 'hi base base false' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Object.create(base)` создаёт пустой объект, прототипом которого стал `base`. `greet` находится по цепочке прототипов, но собственным свойством `child` не является. Запись `child.kind = "child"` создаёт **собственное** свойство, которое затеняет прототипное, — сам `base` не меняется. Чтение идёт по цепочке, а запись — всегда в сам объект.',
          en: '`Object.create(base)` creates an empty object whose prototype is `base`. `greet` is found through the prototype chain but isn’t an own property of `child`. Assigning `child.kind = "child"` creates an **own** property that shadows the prototype one — `base` itself doesn’t change. Reads walk the chain; writes always go to the object itself.',
        },
      },
    ],
    sources: [{ title: 'MDN — Object.create()', url: `${MDN}/Reference/Global_Objects/Object/create` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-proto-005',
    topic: 'javascript',
    tags: ['prototypes'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `class User {
  hello() {
    return 'hi';
  }
}

const user = new User();
console.log(typeof User, Object.getPrototypeOf(user) === User.prototype, Object.hasOwn(user, 'hello'));`,
    },
    options: [
      { code: 'class true false' },
      { code: 'function true false' },
      { code: 'object true true' },
      { code: 'function false true' },
      { code: 'function true true' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Класс в JavaScript — синтаксис поверх функций-конструкторов и прототипов: `typeof User` — `"function"`. Методы класса лежат в `User.prototype`, а не копируются в каждый экземпляр, поэтому `hello` — не собственное свойство `user`. `new User()` связывает прототип экземпляра с `User.prototype`.',
          en: 'A JavaScript class is syntax over constructor functions and prototypes: `typeof User` is `"function"`. Class methods live in `User.prototype` rather than being copied into each instance, so `hello` isn’t an own property of `user`. `new User()` links the instance’s prototype to `User.prototype`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Classes', url: `${MDN}/Reference/Classes` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-proto-006',
    topic: 'javascript',
    tags: ['prototypes'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `class Animal {}
class Dog extends Animal {}

const rex = new Dog();
const plain = Object.create(null);

console.log(rex instanceof Animal, plain instanceof Object, typeof plain.toString);`,
    },
    options: [
      { code: 'true true function' },
      { code: 'false false undefined' },
      { code: 'true false undefined' },
      { code: 'true false function' },
      { code: 'false true function' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`instanceof` проверяет, встречается ли `Animal.prototype` в цепочке прототипов объекта: у `rex` цепочка `Dog.prototype → Animal.prototype → Object.prototype`. `Object.create(null)` создаёт объект **без прототипа**: в его цепочке нет `Object.prototype`, поэтому нет и унаследованных методов вроде `toString`. Такие объекты используют как «чистые» словари.',
          en: '`instanceof` checks whether `Animal.prototype` appears in the object’s prototype chain: `rex`’s chain is `Dog.prototype → Animal.prototype → Object.prototype`. `Object.create(null)` creates an object **with no prototype**: its chain lacks `Object.prototype`, so there are no inherited methods like `toString`. Such objects serve as “clean” dictionaries.',
        },
      },
    ],
    sources: [{ title: 'MDN — instanceof', url: `${MDN}/Reference/Operators/instanceof` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-collections-003',
    topic: 'javascript',
    tags: ['collections'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const object = {};
const map = new Map();

object[1] = 'a';
object['1'] = 'b';
map.set(1, 'a');
map.set('1', 'b');

console.log(Object.keys(object).length, map.size);`,
    },
    options: [{ code: '2 2' }, { code: '1 1' }, { code: '1 2' }, { code: '2 1' }, { code: '0 2' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ключи обычного объекта — только строки и символы: число `1` превращается в строку `"1"`, и вторая запись перезаписывает первую. `Map` хранит ключи любого типа без преобразования, поэтому `1` и `"1"` — разные ключи. Ещё отличия `Map`: размер в `size`, порядок вставки при переборе и никаких унаследованных ключей вроде `toString`.',
          en: 'Plain object keys are only strings and symbols: the number `1` becomes the string `"1"`, so the second write overwrites the first. `Map` stores keys of any type without conversion, so `1` and `"1"` are different keys. Other `Map` advantages: `size`, insertion order when iterating and no inherited keys like `toString`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Map: objects vs. maps', url: `${MDN}/Reference/Global_Objects/Map#objects_vs._maps` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-collections-004',
    topic: 'javascript',
    tags: ['collections'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const set = new Set([1, '1', NaN, NaN, {}, {}]);
console.log(set.size);`,
    },
    options: [{ code: '3' }, { code: '4' }, { code: '5' }, { code: '6' }, { code: '2' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Set` сравнивает значения по алгоритму SameValueZero: `1` и `"1"` — разные значения, а `NaN` считается равным самому себе, поэтому второй `NaN` не добавится. Объекты сравниваются по ссылке: два литерала `{}` — два разных объекта. Итого 5 элементов: `1`, `"1"`, `NaN` и два объекта.',
          en: '`Set` compares values with SameValueZero: `1` and `"1"` are different, while `NaN` equals itself, so the second `NaN` isn’t added. Objects are compared by reference: two `{}` literals are two different objects. That’s 5 elements: `1`, `"1"`, `NaN` and two objects.',
        },
      },
    ],
    sources: [{ title: 'MDN — Set: value equality', url: `${MDN}/Reference/Global_Objects/Set#value_equality` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-iterators-003',
    topic: 'javascript',
    tags: ['iterators'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const range = {
  from: 1,
  to: 3,
  *[Symbol.iterator]() {
    for (let n = this.from; n <= this.to; n++) {
      yield n;
    }
  },
};

console.log([...range].join(','), Math.max(...range));`,
    },
    options: [
      { code: '1,2,3 3' },
      { code: '1,3 3' },
      { code: 'TypeError' },
      { code: '1,2,3 NaN' },
      { code: '1,2,3 -Infinity' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Объект становится **итерируемым**, если у него есть метод `[Symbol.iterator]`, возвращающий итератор. Генератор `*[Symbol.iterator]()` — самый короткий способ его написать: каждый `yield` отдаёт следующее значение. Итерируемый объект работает везде, где ждут итерацию: в спреде, `for...of`, `Array.from`, деструктуризации.',
          en: 'An object becomes **iterable** if it has a `[Symbol.iterator]` method returning an iterator. A generator `*[Symbol.iterator]()` is the shortest way to write one: each `yield` produces the next value. An iterable works wherever iteration is expected: spread, `for...of`, `Array.from`, destructuring.',
        },
      },
    ],
    sources: [{ title: 'MDN — Iteration protocols', url: `${MDN}/Reference/Iteration_protocols` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-iterators-004',
    topic: 'javascript',
    tags: ['iterators'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `let produced = 0;

function* numbers() {
  for (let n = 1; ; n++) {
    produced++;
    yield n;
  }
}

const result = [];
for (const n of numbers()) {
  if (n > 3) break;
  result.push(n);
}

console.log(result.join(','), produced);`,
    },
    options: [
      { code: '1,2,3 3' },
      { code: '1,2,3 4' },
      { code: '1,2,3 Infinity' },
      { code: '1,2,3 5' },
      { code: '1,2,3,4 4' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Генератор **ленивый**: следующее значение вычисляется только тогда, когда его запросили. Бесконечный цикл внутри не страшен — `for...of` просит значения по одному. Четвёртое значение генератор успел выдать (`produced` стал 4), цикл увидел `n > 3` и вызвал `break`, который закрывает генератор. Так обрабатывают бесконечные и очень большие последовательности.',
          en: 'A generator is **lazy**: the next value is computed only when requested. The infinite loop inside is harmless — `for...of` asks for values one at a time. The generator produced the fourth value (`produced` became 4), the loop saw `n > 3` and called `break`, which closes the generator. That’s how infinite or very large sequences are processed.',
        },
      },
    ],
    sources: [{ title: 'MDN — Generator', url: `${MDN}/Reference/Global_Objects/Generator` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-iterators-005',
    topic: 'javascript',
    tags: ['iterators'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const iterator = [1, 2, 3][Symbol.iterator]();
console.log([...iterator].length, [...iterator].length);`,
    },
    options: [{ code: '3 3' }, { code: '3 0' }, { code: '0 0' }, { code: '1 1' }, { code: 'TypeError' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Массив — итерируемый: каждый вызов `[Symbol.iterator]()` даёт **новый** итератор, поэтому сам массив можно обходить сколько угодно раз. А итератор — одноразовый объект с методом `next()` и внутренней позицией. Первый спред дочитал его до конца, второй сразу получает `done: true`. Генераторы ведут себя так же.',
          en: 'An array is iterable: each call to `[Symbol.iterator]()` gives a **new** iterator, so the array itself can be walked any number of times. An iterator, though, is a one-shot object with a `next()` method and an internal position. The first spread read it to the end, so the second immediately gets `done: true`. Generators behave the same way.',
        },
      },
    ],
    sources: [{ title: 'MDN — Iteration protocols', url: `${MDN}/Reference/Iteration_protocols` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-iterators-006',
    topic: 'javascript',
    tags: ['iterators'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const list = ['a', 'b'];
list.extra = 'x';

const keys = [];
const values = [];
for (const key in list) keys.push(key);
for (const value of list) values.push(value);

console.log(keys.join(','), values.join(','));`,
    },
    options: [
      { code: '0,1 a,b' },
      { code: '0,1,extra a,b' },
      { code: '0,1,extra a,b,x' },
      { code: 'a,b a,b' },
      { code: '0,1 a,b,x' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`for...in` перебирает **ключи** — все перечисляемые строковые свойства объекта, включая добавленные вручную и унаследованные. Для массива это индексы-строки и `extra`. `for...of` идёт по **значениям** через протокол итерации, а итератор массива отдаёт только элементы. Для массивов используют `for...of` или методы массива.',
          en: '`for...in` walks **keys** — all enumerable string properties of an object, including manually added and inherited ones. For an array that’s the index strings and `extra`. `for...of` walks **values** via the iteration protocol, and an array’s iterator yields only elements. Use `for...of` or array methods for arrays.',
        },
      },
    ],
    sources: [{ title: 'MDN — for...in', url: `${MDN}/Reference/Statements/for...in` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-iterators-007',
    topic: 'javascript',
    tags: ['iterators'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const prices = { tea: 3, coffee: 5 };

let total = 0;
for (const [, price] of Object.entries(prices)) {
  total += price;
}

console.log(total, typeof prices[Symbol.iterator]);`,
    },
    options: [
      { code: '8 function' },
      { code: '8 undefined' },
      { code: 'TypeError' },
      { code: '0 undefined' },
      { code: '35 undefined' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обычный объект **не** итерируемый: у него нет `Symbol.iterator`, и `for (const x of prices)` бросил бы `TypeError`. Перебирают его через `Object.keys`, `Object.values` или `Object.entries` — они возвращают массивы, а массивы итерируемы. Пары `[ключ, значение]` удобно сразу деструктурировать в заголовке цикла.',
          en: 'A plain object is **not** iterable: it has no `Symbol.iterator`, and `for (const x of prices)` would throw a `TypeError`. You walk it via `Object.keys`, `Object.values` or `Object.entries` — they return arrays, and arrays are iterable. `[key, value]` pairs are handy to destructure right in the loop header.',
        },
      },
    ],
    sources: [{ title: 'MDN — Object.entries()', url: `${MDN}/Reference/Global_Objects/Object/entries` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-modules-003',
    topic: 'javascript',
    tags: ['modules'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Модуль `config.js` импортируют три разных файла приложения. Сколько раз выполнится его код верхнего уровня?',
      en: 'Three different app files import `config.js`. How many times does its top-level code run?',
    },
    options: [
      { text: { ru: 'Три раза — по одному на каждый импорт', en: 'Three times — once per import' } },
      { text: { ru: 'Один раз: модуль кешируется, и все импорты получают один и тот же экземпляр', en: 'Once: the module is cached, and every import gets the same instance' } },
      { text: { ru: 'Ни разу, пока не вызвана экспортированная функция', en: 'Never, until an exported function is called' } },
      { text: { ru: 'Зависит от порядка импортов', en: 'It depends on the import order' } },
      { text: { ru: 'Каждый раз при обращении к экспорту', en: 'Every time an export is accessed' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модуль выполняется **один раз** при первом импорте, а результат кешируется по его адресу: все импортёры получают те же экспорты. Поэтому состояние на уровне модуля — общее для всего приложения (а на сервере — для всех запросов). На этом держатся «синглтоны» вроде клиента API или стора.',
          en: 'A module runs **once** on the first import, and the result is cached by its URL: every importer gets the same exports. So module-level state is shared by the whole app (and on a server, by every request). “Singletons” like an API client or a store rely on this.',
        },
      },
    ],
    sources: [{ title: 'MDN — JavaScript modules', url: `${MDN}/Guide/Modules` }],
  },
  {
    id: 'js-modules-004',
    topic: 'javascript',
    tags: ['modules'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что вернёт `import(\'./chart.js\')` и зачем его используют?',
      en: 'What does `import(\'./chart.js\')` return and why is it used?',
    },
    options: [
      { text: { ru: 'Сам модуль синхронно, как `require`', en: 'The module itself, synchronously, like `require`' } },
      { text: { ru: 'Промис с объектом модуля; сборщик выносит такой модуль в отдельный чанк и грузит по требованию', en: 'A promise of the module namespace object; bundlers split such a module into a separate chunk loaded on demand' } },
      { text: { ru: 'Только экспорт по умолчанию', en: 'Only the default export' } },
      { text: { ru: 'Ошибку: `import` нельзя вызывать как функцию', en: 'An error: `import` can’t be called like a function' } },
      { text: { ru: 'Строку с кодом модуля', en: 'A string with the module’s code' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Динамический `import()` работает во время выполнения и возвращает **промис** с объектом модуля: именованные экспорты — его свойства, экспорт по умолчанию — свойство `default`. Сборщики превращают каждый такой импорт в отдельный чанк, который загрузится, только когда код до него дойдёт, — так делают разделение кода по маршрутам и тяжёлым виджетам.',
          en: 'Dynamic `import()` runs at runtime and returns a **promise** of the module namespace: named exports are its properties, and the default export is the `default` property. Bundlers turn each such import into a separate chunk loaded only when the code reaches it — that’s how code is split by routes and heavy widgets.',
        },
      },
    ],
    sources: [{ title: 'MDN — import()', url: `${MDN}/Reference/Operators/import` }],
  },
  {
    id: 'js-modules-005',
    topic: 'javascript',
    tags: ['modules'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Чем экспорт по умолчанию (`export default`) отличается от именованного?',
      en: 'How does a default export (`export default`) differ from a named one?',
    },
    options: [
      { text: { ru: 'Ничем, это синонимы', en: 'No difference, they’re synonyms' } },
      { text: { ru: 'Default работает только в CommonJS', en: 'Default works only in CommonJS' } },
      {
        text: {
          ru: 'Default — один на модуль, и имя при импорте выбирает потребитель; именованных может быть много, их импортируют по точному имени в фигурных скобках',
          en: 'There’s one default per module, and the importer picks its name; there can be many named exports, imported by their exact names in braces',
        },
      },
      { text: { ru: 'Именованный экспорт нельзя переименовать при импорте', en: 'A named export can’t be renamed on import' } },
      { text: { ru: 'Default экспортирует копию значения, именованный — ссылку', en: 'Default exports a copy, named exports a reference' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`import Chart from \'./chart.js\'` — экспорт по умолчанию, имя `Chart` выбрано импортёром. `import { formatDate } from \'./date.js\'` — именованный: имя должно совпасть, но его можно переименовать через `as`. Многие команды предпочитают именованные экспорты: их проще находить поиском, а ошибка в имени ловится сразу.',
          en: '`import Chart from \'./chart.js\'` is a default export, and the name `Chart` is chosen by the importer. `import { formatDate } from \'./date.js\'` is named: the name must match, though `as` can rename it. Many teams prefer named exports: they’re easier to search for, and a wrong name is caught right away.',
        },
      },
    ],
    sources: [{ title: 'MDN — export', url: `${MDN}/Reference/Statements/export` }],
  },
  {
    id: 'js-modules-006',
    topic: 'javascript',
    tags: ['modules'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чем `<script type="module">` отличается от обычного `<script>`?',
      en: 'How does `<script type="module">` differ from a regular `<script>`?',
    },
    options: [
      { text: { ru: 'Только тем, что разрешает `import`', en: 'Only by allowing `import`' } },
      {
        text: {
          ru: 'Он загружается без блокировки разбора и выполняется отложенно, как `defer`, всегда в строгом режиме и со своей областью видимости',
          en: 'It loads without blocking parsing and runs deferred like `defer`, always in strict mode and with its own scope',
        },
      },
      { text: { ru: 'Выполняется раньше всех обычных скриптов', en: 'It runs before all regular scripts' } },
      { text: { ru: 'Работает только на сервере', en: 'It only works on the server' } },
      { text: { ru: 'Его переменные верхнего уровня попадают в `window`', en: 'Its top-level variables end up on `window`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модульный скрипт по умолчанию отложенный: грузится параллельно с разбором HTML и выполняется после него. Код модуля всегда в строгом режиме, а переменные верхнего уровня не попадают в глобальный объект — у модуля своя область видимости. `this` на верхнем уровне модуля — `undefined`.',
          en: 'A module script is deferred by default: it loads in parallel with HTML parsing and runs after it. Module code is always strict, and top-level variables don’t land on the global object — the module has its own scope. Top-level `this` in a module is `undefined`.',
        },
      },
    ],
    sources: [{ title: 'MDN — JavaScript modules: other differences', url: `${MDN}/Guide/Modules#other_differences_between_modules_and_classic_scripts` }],
  },
  {
    id: 'js-live-unique-by-001',
    topic: 'javascript',
    tags: ['live-coding'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какая реализация `uniqueBy(items, getKey)` оставит первый элемент для каждого ключа и сохранит порядок?',
      en: 'Which `uniqueBy(items, getKey)` implementation keeps the first item for each key and preserves order?',
    },
    options: [
      {
        code: `function uniqueBy(items, getKey) {
  return [...new Set(items.map(getKey))];
}`,
      },
      {
        code: `function uniqueBy(items, getKey) {
  const seen = new Set();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}`,
      },
      {
        code: `function uniqueBy(items, getKey) {
  const byKey = new Map();
  for (const item of items) byKey.set(getKey(item), item);
  return [...byKey.values()];
}`,
      },
      {
        code: `function uniqueBy(items, getKey) {
  return items.filter((item, index) => items.indexOf(item) === index);
}`,
      },
      {
        code: `function uniqueBy(items, getKey) {
  return [...new Set(items)];
}`,
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Set` уже виденных ключей даёт проверку за `O(1)`: первый элемент с ключом проходит фильтр, остальные отбрасываются, порядок сохраняется. `Map` с `set` на каждом шаге оставит **последний** элемент. `new Set(items)` и `indexOf` сравнивают объекты по ссылке и ключ не учитывают, а `new Set(items.map(getKey))` вернёт сами ключи, а не элементы.',
          en: 'A `Set` of seen keys gives an `O(1)` check: the first item with a key passes the filter, the rest are dropped, and order is kept. A `Map` with `set` on every step keeps the **last** item. `new Set(items)` and `indexOf` compare objects by reference and ignore the key, and `new Set(items.map(getKey))` returns the keys, not the items.',
        },
      },
    ],
    sources: [{ title: 'MDN — Set', url: `${MDN}/Reference/Global_Objects/Set` }],
    verify: {
      kind: 'js-tests',
      tests: `const users = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }];
assert.deepEqual(uniqueBy(users, (user) => user.id), [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]);
assert.deepEqual(uniqueBy([], (x) => x), []);`,
    },
  },
  {
    id: 'js-live-pick-001',
    topic: 'javascript',
    tags: ['live-coding'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какая реализация `pick(object, keys)` вернёт новый объект только с перечисленными ключами, которые есть в исходном?',
      en: 'Which `pick(object, keys)` implementation returns a new object with only the listed keys that exist in the source?',
    },
    options: [
      {
        code: `function pick(object, keys) {
  return keys.map((key) => object[key]);
}`,
      },
      {
        code: `function pick(object, keys) {
  return Object.fromEntries(keys.map((key) => [key, object[key]]));
}`,
      },
      {
        code: `function pick(object, keys) {
  return Object.fromEntries(
    keys.filter((key) => key in object).map((key) => [key, object[key]]),
  );
}`,
      },
      {
        code: `function pick(object, keys) {
  for (const key of Object.keys(object)) {
    if (!keys.includes(key)) delete object[key];
  }
  return object;
}`,
      },
      {
        code: `function pick(object, keys) {
  return { ...object };
}`,
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Object.fromEntries` собирает объект из пар `[ключ, значение]`, а фильтр `key in object` не даёт добавить отсутствующие ключи со значением `undefined`. Вариант с `delete` меняет исходный объект — побочный эффект, которого от `pick` не ждут. `map` вернёт массив значений, а спред скопирует все ключи.',
          en: '`Object.fromEntries` builds an object from `[key, value]` pairs, and the `key in object` filter avoids adding missing keys as `undefined`. The `delete` version mutates the source object — a side effect nobody expects from `pick`. `map` returns an array of values, and spread copies every key.',
        },
      },
    ],
    sources: [{ title: 'MDN — Object.fromEntries()', url: `${MDN}/Reference/Global_Objects/Object/fromEntries` }],
    verify: {
      kind: 'js-tests',
      tests: `const source = { a: 1, b: 2, c: 3 };
assert.deepEqual(pick(source, ['a', 'c', 'z']), { a: 1, c: 3 });
assert.deepEqual(source, { a: 1, b: 2, c: 3 });`,
    },
  },
  {
    id: 'js-live-count-by-001',
    kind: 'bug-line',
    topic: 'javascript',
    tags: ['live-coding'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: '`countBy([\'a\', \'b\', \'a\'], (x) => x)` должна вернуть `{ a: 2, b: 1 }`, а возвращает `{ a: NaN, b: NaN }`. В какой строке ошибка?',
      en: '`countBy([\'a\', \'b\', \'a\'], (x) => x)` should return `{ a: 2, b: 1 }` but returns `{ a: NaN, b: NaN }`. Which line has the bug?',
    },
    code: {
      lang: 'js',
      source: `function countBy(items, getKey) {
  const counts = {};
  for (const item of items) {
    const key = getKey(item);
    counts[key] = counts[key] + 1;
  }
  return counts;
}`,
    },
    answerLine: 5,
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При первой встрече ключа `counts[key]` — `undefined`, а `undefined + 1` — это `NaN`, и дальше `NaN` только накапливается. Нужно начальное значение: `counts[key] = (counts[key] ?? 0) + 1`. Тот же приём с `Map`: `map.set(key, (map.get(key) ?? 0) + 1)`.',
          en: 'The first time a key appears, `counts[key]` is `undefined`, and `undefined + 1` is `NaN`, which then only accumulates. You need a starting value: `counts[key] = (counts[key] ?? 0) + 1`. Same trick with a `Map`: `map.set(key, (map.get(key) ?? 0) + 1)`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Nullish coalescing operator (??)', url: `${MDN}/Reference/Operators/Nullish_coalescing` }],
    verify: {
      kind: 'js-tests',
      fixedLine: '    counts[key] = (counts[key] ?? 0) + 1;',
      tests: `assert.deepEqual(countBy(['a', 'b', 'a'], (x) => x), { a: 2, b: 1 });
assert.deepEqual(countBy([], (x) => x), {});`,
    },
  },
];
