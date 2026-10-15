import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';

export const JAVASCRIPT_LESSONS_2: Lesson[] = [
  {
    tag: 'types-coercion',
    summary: {
      ru: 'В JavaScript восемь типов, а операторы сами приводят значения к строке, числу или логическому — по предсказуемым правилам.',
      en: 'JavaScript has eight types, and operators convert values to string, number or boolean on their own — by predictable rules.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Типов восемь: семь примитивов (`undefined`, `null`, `boolean`, `number`, `bigint`, `string`, `symbol`) и `object` — массивы и функции тоже объекты. `typeof null === \'object\'` — историческая ошибка языка, которую оставили ради совместимости.',
          en: 'There are eight types: seven primitives (`undefined`, `null`, `boolean`, `number`, `bigint`, `string`, `symbol`) and `object` — arrays and functions are objects too. `typeof null === \'object\'` is a historical bug kept for compatibility.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Неявное приведение бывает к строке, к числу и к логическому. `+` со строкой склеивает, остальные арифметические операторы приводят к числу. В логическом контексте ложны только `false`, `0`, `-0`, `0n`, `\'\'`, `null`, `undefined` и `NaN` — всё остальное, включая `[]`, `{}` и `\'0\'`, истинно.',
          en: 'Implicit coercion goes to string, number or boolean. `+` with a string concatenates, other arithmetic operators convert to number. In a boolean context only `false`, `0`, `-0`, `0n`, `\'\'`, `null`, `undefined` and `NaN` are falsy — everything else, including `[]`, `{}` and `\'0\'`, is truthy.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `console.log(1 + '2'); // '12'
console.log('3' * '4'); // 12
console.log(true + 1); // 2
console.log([] + []); // ''
console.log(+''); // 0
console.log(+'12px'); // NaN
console.log(Boolean('0')); // true`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Объект приводится к примитиву через `Symbol.toPrimitive`, затем `valueOf` и `toString`. Поэтому `[1, 2] + \'\'` даёт `\'1,2\'`, а `String({})` — `\'[object Object]\'`. `NaN` не равен даже самому себе — проверяйте через `Number.isNaN`.',
          en: 'An object is converted to a primitive via `Symbol.toPrimitive`, then `valueOf` and `toString`. That’s why `[1, 2] + \'\'` gives `\'1,2\'` and `String({})` gives `\'[object Object]\'`. `NaN` isn’t equal even to itself — check it with `Number.isNaN`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `console.log([1, 2] + ''); // '1,2'
console.log(String({})); // '[object Object]'
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true
console.log(typeof null); // 'object'`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Восемь типов: семь примитивов и `object`.', en: 'Eight types: seven primitives and `object`.' },
      {
        ru: '`+` со строкой склеивает, остальная арифметика приводит к числу.',
        en: '`+` with a string concatenates, other arithmetic converts to number.',
      },
      {
        ru: 'Ложных значений восемь: `false`, `0`, `-0`, `0n`, `\'\'`, `null`, `undefined`, `NaN`.',
        en: 'There are eight falsy values: `false`, `0`, `-0`, `0n`, `\'\'`, `null`, `undefined`, `NaN`.',
      },
      { ru: '`typeof null === \'object\'` — историческая ошибка.', en: '`typeof null === \'object\'` is a historical bug.' },
      { ru: '`NaN` проверяют через `Number.isNaN`.', en: 'Check for `NaN` with `Number.isNaN`.' },
    ],
    sources: [
      { title: 'MDN — JavaScript data types and data structures', url: `${MDN}/Guide/Data_structures` },
      { title: 'MDN — Type coercion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion' },
      { title: 'MDN — Falsy', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Falsy' },
    ],
  },
  {
    tag: 'scope',
    summary: {
      ru: 'Область видимости решает, где доступна переменная. Она лексическая: важно, где код написан, а не где вызван.',
      en: 'Scope decides where a variable is accessible. It is lexical: what matters is where code is written, not where it is called.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Области бывают глобальная, модульная, функциональная и блочная (`{ … }`). `let` и `const` видны только внутри блока, `var` — во всей функции и блоков не замечает. Переменная ищется изнутри наружу по цепочке областей; внутренняя переменная «затеняет» внешнюю с тем же именем.',
          en: 'Scopes are global, module, function and block (`{ … }`). `let` and `const` are visible only inside their block, `var` across the whole function, ignoring blocks. A variable is looked up from the inside out along the scope chain; an inner variable shadows an outer one with the same name.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function outer() {
  if (true) {
    var a = 1;
    let b = 2;
  }
  console.log(a); // 1
  console.log(typeof b); // 'undefined'
}
outer();`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '[[hoisting|Всплытие]] (hoisting): объявления обрабатываются до выполнения кода. `var` всплывает со значением `undefined`, объявление функции — целиком. `let`, `const` и `class` тоже известны заранее, но до строки объявления находятся во [[tdz|«временной мёртвой зоне» (TDZ)]]: обращение к ним — `ReferenceError`.',
          en: '[[hoisting|Hoisting]]: declarations are processed before the code runs. `var` is hoisted with the value `undefined`, a function declaration — entirely. `let`, `const` and `class` are known in advance too, but until their declaration line they are in the [[tdz|temporal dead zone (TDZ)]]: accessing them throws `ReferenceError`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `console.log(x); // undefined
var x = 1;

sayHi(); // works: function declarations are hoisted
function sayHi() {}

try {
  console.log(y);
} catch (error) {
  console.log(error.name); // ReferenceError
}
let y = 2;`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Присваивание без `let`, `const` или `var` в нестрогом режиме создаёт глобальную переменную, в строгом — бросает `ReferenceError`. Модули и классы всегда строгие.',
          en: 'Assigning without `let`, `const` or `var` creates a global variable in sloppy mode and throws `ReferenceError` in strict mode. Modules and classes are always strict.',
        },
      },
    ],
    keyPoints: [
      { ru: '`let` и `const` — блочная область, `var` — функциональная.', en: '`let` and `const` are block-scoped, `var` is function-scoped.' },
      {
        ru: 'Область лексическая: решает место объявления, а не вызова.',
        en: 'Scope is lexical: the place of declaration matters, not the call site.',
      },
      {
        ru: '`var` всплывает как `undefined`, объявление функции — целиком.',
        en: '`var` is hoisted as `undefined`, a function declaration — entirely.',
      },
      {
        ru: '`let`, `const`, `class` до объявления — в TDZ, обращение даёт `ReferenceError`.',
        en: '`let`, `const`, `class` are in the TDZ before declaration — access throws `ReferenceError`.',
      },
      { ru: 'Внутренняя переменная затеняет внешнюю с тем же именем.', en: 'An inner variable shadows an outer one with the same name.' },
    ],
    sources: [
      { title: 'MDN — Scope', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Scope' },
      { title: 'MDN — Hoisting', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting' },
      { title: 'MDN — let: temporal dead zone', url: `${MDN}/Reference/Statements/let#temporal_dead_zone_tdz` },
    ],
  },
  {
    tag: 'prototypes',
    summary: {
      ru: 'Объекты наследуют свойства через цепочку прототипов, а `class` — удобный синтаксис поверх той же модели.',
      en: 'Objects inherit properties through the prototype chain, and `class` is a convenient syntax over the same model.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'У каждого объекта есть скрытая ссылка на прототип (`[[Prototype]]`). Если свойства нет у самого объекта, движок ищет его в прототипе, затем [[prototype-chain|в прототипе прототипа]] — пока не дойдёт до `null`. Так методы хранятся в одном месте и разделяются всеми экземплярами.',
          en: 'Every object has a hidden link to its prototype (`[[Prototype]]`). If a property isn’t on the object itself, the engine looks in the prototype, then [[prototype-chain|in the prototype’s prototype]] — until it reaches `null`. That way methods live in one place and are shared by all instances.',
        },
      },
      {
        type: 'code',
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
); // Rex speaks true false`,
        },
        caption: {
          ru: 'speak нет у самого dog — он найден в Animal.prototype.',
          en: 'speak isn’t on dog itself — it is found in Animal.prototype.',
        },
      },
      { type: 'diagram', diagram: 'prototype-chain' },
      {
        type: 'text',
        text: {
          ru: '`class` устроен так же: методы попадают в `Class.prototype`, `extends` связывает прототипы, `super` ищет метод выше по цепочке. Поля класса (`name = …`) создаются на самом экземпляре. Собственный ли это ключ, проверяет `Object.hasOwn`, а оператор `in` смотрит всю цепочку.',
          en: '`class` works the same way: methods go to `Class.prototype`, `extends` links the prototypes, `super` looks a method up the chain. Class fields (`name = …`) are created on the instance itself. `Object.hasOwn` checks for an own key, while the `in` operator looks through the whole chain.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + ' makes a sound';
  }
}

class Dog extends Animal {
  speak() {
    return super.speak() + ': woof';
  }
}

const rex = new Dog('Rex');
console.log(rex.speak()); // Rex makes a sound: woof
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
console.log(Object.hasOwn(rex, 'speak'), 'speak' in rex); // false true`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Свойство ищется по цепочке прототипов до `null`.', en: 'A property is looked up along the prototype chain until `null`.' },
      { ru: 'Методы живут в прототипе и общие для всех экземпляров.', en: 'Methods live on the prototype and are shared by all instances.' },
      {
        ru: '`class` — синтаксис поверх прототипов; `extends` связывает `Child.prototype` с `Parent.prototype`.',
        en: '`class` is syntax over prototypes; `extends` links `Child.prototype` to `Parent.prototype`.',
      },
      {
        ru: '`Object.hasOwn` — только собственные ключи, `in` — вся цепочка.',
        en: '`Object.hasOwn` checks own keys only, `in` checks the whole chain.',
      },
      {
        ru: '`__proto__` устарел — используйте `Object.getPrototypeOf` и `Object.create`.',
        en: '`__proto__` is deprecated — use `Object.getPrototypeOf` and `Object.create`.',
      },
    ],
    sources: [
      { title: 'MDN — Inheritance and the prototype chain', url: `${MDN}/Guide/Inheritance_and_the_prototype_chain` },
      { title: 'MDN — Classes', url: `${MDN}/Reference/Classes` },
      { title: 'MDN — Object.hasOwn()', url: `${MDN}/Reference/Global_Objects/Object/hasOwn` },
    ],
  },
  {
    tag: 'promises',
    summary: {
      ru: 'Промис — обещание результата асинхронной операции. Цепочки `then` и `async/await` — два способа работать с ним.',
      en: 'A promise is a promise of an asynchronous result. `then` chains and `async/await` are two ways to work with it.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'У промиса три состояния: `pending`, затем один раз и навсегда `fulfilled` (со значением) или `rejected` (с причиной). `then` и `catch` возвращают **новый** промис: значение, которое вернул колбэк, становится результатом следующего звена, а брошенная ошибка — отказом, который поймает ближайший `catch`.',
          en: 'A promise has three states: `pending`, then once and for all `fulfilled` (with a value) or `rejected` (with a reason). `then` and `catch` return a **new** promise: the value returned by the callback becomes the result of the next link, and a thrown error becomes a rejection caught by the nearest `catch`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `Promise.resolve(1)
  .then((value) => value + 1)
  .then((value) => {
    throw new Error('boom ' + value);
  })
  .catch((error) => error.message)
  .then((message) => console.log(message)); // boom 2`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`async`-функция всегда возвращает промис. `await` приостанавливает её, не блокируя поток; до первого `await` она выполняется синхронно, а продолжение — [[microtask|микрозадача]]. Ошибки ловятся обычным `try/catch`.',
          en: 'An `async` function always returns a promise. `await` pauses it without blocking the thread; until the first `await` it runs synchronously, and the continuation is a [[microtask|microtask]]. Errors are caught with a plain `try/catch`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `async function run() {
  console.log('A');
  await null;
  console.log('B');
}
run();
Promise.resolve().then(() => console.log('C'));
console.log('D');
// A D B C`,
        },
      },
      { type: 'diagram', diagram: 'event-loop-async' },
      {
        type: 'text',
        text: {
          ru: 'Комбинаторы: `Promise.all` ждёт всех и падает на первом отказе, `allSettled` возвращает статусы всех, `race` — первый завершившийся, `any` — первый успешный. Независимые запросы запускайте вместе через `Promise.all`: `await` в цикле делает их последовательными. Необработанный отказ — это ошибка, завершайте цепочку `catch` или `try/catch`.',
          en: 'Combinators: `Promise.all` waits for all and fails on the first rejection, `allSettled` returns every status, `race` the first to settle, `any` the first to fulfill. Run independent requests together with `Promise.all`: `await` in a loop makes them sequential. An unhandled rejection is an error — end the chain with `catch` or `try/catch`.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Промис меняет состояние один раз: `pending` → `fulfilled` или `rejected`.',
        en: 'A promise settles once: `pending` → `fulfilled` or `rejected`.',
      },
      {
        ru: '`then`/`catch` возвращают новый промис: `return` передаёт значение дальше, `throw` — отказ.',
        en: '`then`/`catch` return a new promise: `return` passes a value on, `throw` a rejection.',
      },
      {
        ru: '`async`-функция всегда возвращает промис; продолжение после `await` — микрозадача.',
        en: 'An `async` function always returns a promise; the continuation after `await` is a microtask.',
      },
      {
        ru: 'Независимые запросы — через `Promise.all`, а не `await` в цикле.',
        en: 'Run independent requests with `Promise.all`, not `await` in a loop.',
      },
      {
        ru: '`all` — первый отказ, `allSettled` — все статусы, `race` — первый результат, `any` — первый успех.',
        en: '`all` — first rejection, `allSettled` — all statuses, `race` — first result, `any` — first success.',
      },
    ],
    sources: [
      { title: 'MDN — Using promises', url: `${MDN}/Guide/Using_promises` },
      { title: 'MDN — async function', url: `${MDN}/Reference/Statements/async_function` },
      { title: 'MDN — Promise.all()', url: `${MDN}/Reference/Global_Objects/Promise/all` },
    ],
  },
  {
    tag: 'objects',
    summary: {
      ru: 'Примитивы копируются по значению, объекты — по ссылке. Отсюда «неожиданные» мутации и правила копирования.',
      en: 'Primitives are copied by value, objects by reference. That explains “unexpected” mutations and the rules of copying.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Переменная с объектом хранит ссылку на него. Присваивание и передача в функцию копируют ссылку, поэтому изменение через одну переменную видно через другую. Переприсваивание параметра внутри функции снаружи не видно. `const` запрещает переприсвоить переменную, но не менять сам объект.',
          en: 'A variable holding an object stores a reference to it. Assignment and passing to a function copy the reference, so a change through one variable is visible through another. Reassigning a parameter inside a function isn’t visible outside. `const` forbids reassigning the variable, not changing the object.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const a = { count: 1 };
const b = a;
b.count = 2;
console.log(a.count); // 2

function reset(obj) {
  obj.count = 0;
  obj = { count: 100 };
}
reset(a);
console.log(a.count); // 0`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Spread `{ ...obj }` и `Object.assign` копируют **поверхностно**: вложенные объекты остаются общими. Глубокая копия — `structuredClone` (функции и DOM-узлы он не копирует). `===` у объектов сравнивает ссылки: два одинаковых по содержимому объекта не равны.',
          en: 'Spread `{ ...obj }` and `Object.assign` make a **shallow** copy: nested objects stay shared. A deep copy is `structuredClone` (it doesn’t copy functions or DOM nodes). `===` on objects compares references: two objects with the same content are not equal.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const user = { name: 'Ann', tags: ['admin'] };
const shallow = { ...user };
const deep = structuredClone(user);
user.tags.push('editor');
console.log(shallow.tags.length, deep.tags.length); // 2 1
console.log({} === {}); // false`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Объекты копируются по ссылке, примитивы — по значению.', en: 'Objects are copied by reference, primitives by value.' },
      {
        ru: 'Функция получает копию ссылки: мутация видна снаружи, переприсваивание — нет.',
        en: 'A function gets a copy of the reference: mutation is visible outside, reassignment isn’t.',
      },
      { ru: '`const` защищает переменную, а не содержимое объекта.', en: '`const` protects the variable, not the object’s contents.' },
      {
        ru: 'Spread и `Object.assign` копируют поверхностно, `structuredClone` — глубоко.',
        en: 'Spread and `Object.assign` copy shallowly, `structuredClone` deeply.',
      },
      { ru: '`===` у объектов сравнивает ссылки.', en: '`===` on objects compares references.' },
    ],
    sources: [
      { title: 'MDN — Working with objects', url: `${MDN}/Guide/Working_with_objects` },
      { title: 'MDN — structuredClone()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone' },
      { title: 'MDN — Spread syntax', url: `${MDN}/Reference/Operators/Spread_syntax` },
    ],
  },
  {
    tag: 'equality',
    summary: {
      ru: '`===` сравнивает без приведения типов, `==` — с приведением по запутанным правилам. По умолчанию — всегда `===`.',
      en: '`===` compares without type conversion, `==` with conversion by tricky rules. By default, always use `===`.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Строгое `===` при разных типах сразу даёт `false`. Нестрогое `==` сначала приводит: `null` и `undefined` равны только друг другу, строки и логические значения превращаются в числа, объект — в примитив. На практике пишут `===`; единственное распространённое исключение — `x == null` как проверка «`null` или `undefined`».',
          en: 'Strict `===` returns `false` right away for different types. Loose `==` converts first: `null` and `undefined` equal only each other, strings and booleans become numbers, an object becomes a primitive. In practice people write `===`; the one common exception is `x == null` as a check for “`null` or `undefined`”.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `console.log(0 == ''); // true
console.log(0 == '0'); // true
console.log('' == '0'); // false
console.log(null == undefined); // true
console.log(null == 0); // false
console.log([1] == 1); // true`,
        },
        caption: {
          ru: '== не транзитивно: 0 равен и \'\', и \'0\', а они друг другу — нет.',
          en: '== isn’t transitive: 0 equals both \'\' and \'0\', but they don’t equal each other.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Особые числа: `NaN` не равен ничему, включая себя, а `+0 === -0`. `Object.is` различает их. `includes`, `Map` и `Set` используют сравнение SameValueZero: `NaN` находится, а `+0` и `-0` равны; `indexOf` использует `===` и `NaN` не находит.',
          en: 'Special numbers: `NaN` equals nothing, itself included, while `+0 === -0`. `Object.is` tells them apart. `includes`, `Map` and `Set` use SameValueZero: `NaN` is found, and `+0` and `-0` are equal; `indexOf` uses `===` and doesn’t find `NaN`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `console.log(NaN === NaN, Object.is(NaN, NaN)); // false true
console.log(0 === -0, Object.is(0, -0)); // true false
console.log([NaN].includes(NaN)); // true
console.log([NaN].indexOf(NaN)); // -1`,
        },
      },
    ],
    keyPoints: [
      { ru: '`===` не приводит типы, `==` приводит.', en: '`===` doesn’t convert types, `==` does.' },
      {
        ru: '`null == undefined`, и больше ни с чем они нестрого не равны.',
        en: '`null == undefined`, and they loosely equal nothing else.',
      },
      {
        ru: 'Пишите `===`; `x == null` — допустимая проверка на `null`/`undefined`.',
        en: 'Write `===`; `x == null` is an acceptable check for `null`/`undefined`.',
      },
      { ru: '`NaN` не равен себе; `Object.is(NaN, NaN)` — `true`.', en: '`NaN` doesn’t equal itself; `Object.is(NaN, NaN)` is `true`.' },
      {
        ru: '`includes`, `Map`, `Set` находят `NaN`, а `indexOf` — нет.',
        en: '`includes`, `Map`, `Set` find `NaN`, `indexOf` doesn’t.',
      },
    ],
    sources: [
      { title: 'MDN — Equality comparisons and sameness', url: `${MDN}/Guide/Equality_comparisons_and_sameness` },
      { title: 'MDN — Object.is()', url: `${MDN}/Reference/Global_Objects/Object/is` },
    ],
  },
  {
    tag: 'modules',
    summary: {
      ru: 'ES-модуль — файл со своей областью видимости, который выполняется один раз и обменивается значениями через `import`/`export`.',
      en: 'An ES module is a file with its own scope that runs once and shares values through `import`/`export`.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Переменные модуля не попадают в глобальную область, код модуля всегда в строгом режиме, `this` на верхнем уровне — `undefined`. Модуль выполняется один раз — при первом импорте, все импортёры получают один и тот же экземпляр.',
          en: 'Module variables don’t leak into the global scope, module code is always strict, and top-level `this` is `undefined`. A module runs once — on first import — and all importers get the same instance.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Экспорт бывает именованный (`export const x`, импорт `import { x }`) и по умолчанию (`export default`, импорт под любым именем). Импорты — **живые привязки только для чтения**: если модуль поменял экспортированную переменную, импортёр увидит новое значение, но присвоить ей ничего не сможет.',
          en: 'Exports are named (`export const x`, imported as `import { x }`) or default (`export default`, imported under any name). Imports are **live read-only bindings**: if a module changes an exported variable, the importer sees the new value but can’t assign to it.',
        },
      },
      {
        type: 'code',
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
console.log(count); // 1`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Статические `import` разрешаются до выполнения кода — поэтому сборщики умеют выкидывать неиспользуемое ([[tree-shaking|tree-shaking]]). `import()` — динамический: возвращает промис и грузит модуль по требованию, например для редко открываемого экрана. CommonJS (`require`, `module.exports`) — система Node до ES-модулей: загружает синхронно и отдаёт объект `module.exports`, а не живые привязки.',
          en: 'Static `import`s are resolved before the code runs — that’s why bundlers can drop unused code ([[tree-shaking|tree-shaking]]). `import()` is dynamic: it returns a promise and loads a module on demand, e.g. for a rarely opened screen. CommonJS (`require`, `module.exports`) is Node’s pre-ES-modules system: it loads synchronously and hands out the `module.exports` object, not live bindings.',
        },
      },
    ],
    keyPoints: [
      { ru: 'У модуля своя область видимости и строгий режим.', en: 'A module has its own scope and strict mode.' },
      { ru: 'Модуль выполняется один раз, импортёры делят один экземпляр.', en: 'A module runs once; importers share one instance.' },
      { ru: 'Импорты — живые привязки только для чтения.', en: 'Imports are live read-only bindings.' },
      {
        ru: 'Статический `import` разрешается до выполнения — это даёт tree-shaking.',
        en: 'Static `import` is resolved before execution — that enables tree-shaking.',
      },
      { ru: '`import()` грузит модуль по требованию и возвращает промис.', en: '`import()` loads a module on demand and returns a promise.' },
    ],
    sources: [
      { title: 'MDN — JavaScript modules', url: `${MDN}/Guide/Modules` },
      { title: 'MDN — import', url: `${MDN}/Reference/Statements/import` },
      { title: 'MDN — import()', url: `${MDN}/Reference/Operators/import` },
    ],
  },
  {
    tag: 'iterators',
    summary: {
      ru: 'Протокол итерации связывает `for…of`, spread и деструктуризацию с любыми коллекциями, а генераторы пишут итераторы за вас.',
      en: 'The iteration protocol connects `for…of`, spread and destructuring to any collection, and generators write iterators for you.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Итерируемый объект — тот, у кого есть метод `[Symbol.iterator]()`, возвращающий итератор: объект с методом `next()`, который отдаёт `{ value, done }`. Этим протоколом пользуются `for…of`, spread `[...x]`, деструктуризация, `Array.from` и `Promise.all`. Итерируемы массивы, строки, `Map`, `Set`, но не обычные объекты — для них есть `Object.entries`.',
          en: 'An iterable is an object with a `[Symbol.iterator]()` method that returns an iterator: an object with a `next()` method returning `{ value, done }`. This protocol is used by `for…of`, spread `[...x]`, destructuring, `Array.from` and `Promise.all`. Arrays, strings, `Map` and `Set` are iterable, plain objects aren’t — use `Object.entries` for them.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next: () => (current <= last ? { value: current++, done: false } : { value: undefined, done: true }),
    };
  },
};

console.log([...range]); // [1, 2, 3]`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Генератор `function*` пишет итератор за вас: `yield` отдаёт значение и приостанавливает функцию до следующего `next()`. Генераторы ленивые — значения считаются по требованию, поэтому можно описать даже бесконечную последовательность и взять из неё сколько нужно.',
          en: 'A generator `function*` writes the iterator for you: `yield` hands out a value and pauses the function until the next `next()`. Generators are lazy — values are computed on demand, so you can even describe an infinite sequence and take as much as you need.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function* naturals() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

const taken = [];
for (const n of naturals()) {
  if (n > 3) break;
  taken.push(n);
}
console.log(taken); // [1, 2, 3]`,
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Итерируемый — есть `[Symbol.iterator]()`, который возвращает итератор с `next()`.',
        en: 'An iterable has `[Symbol.iterator]()` returning an iterator with `next()`.',
      },
      { ru: '`next()` отдаёт `{ value, done }`.', en: '`next()` returns `{ value, done }`.' },
      {
        ru: '`for…of`, spread, деструктуризация и `Array.from` работают с любым итерируемым.',
        en: '`for…of`, spread, destructuring and `Array.from` work with any iterable.',
      },
      { ru: 'Обычный объект не итерируем — используйте `Object.entries`.', en: 'A plain object isn’t iterable — use `Object.entries`.' },
      {
        ru: 'Генератор ленив: `yield` приостанавливает функцию до следующего `next()`.',
        en: 'A generator is lazy: `yield` pauses the function until the next `next()`.',
      },
    ],
    sources: [
      { title: 'MDN — Iteration protocols', url: `${MDN}/Reference/Iteration_protocols` },
      { title: 'MDN — Iterators and generators', url: `${MDN}/Guide/Iterators_and_generators` },
      { title: 'MDN — function*', url: `${MDN}/Reference/Statements/function*` },
    ],
  },
  {
    tag: 'collections',
    summary: {
      ru: '`Map` и `Set` — коллекции с ключами любого типа и уникальными значениями, а `WeakMap` и `WeakSet` не мешают сборке мусора.',
      en: '`Map` and `Set` are collections with keys of any type and unique values, while `WeakMap` and `WeakSet` don’t prevent garbage collection.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`Map` — словарь, где ключом может быть любое значение, включая объекты; порядок вставки сохраняется, размер — `size`, перебор — `for…of`. У обычного объекта ключи приводятся к строке (или символу) и есть унаследованные свойства. `Set` хранит уникальные значения — так удобно убирать дубликаты. Ключи сравниваются по SameValueZero: объекты — по ссылке, `NaN` равен `NaN`.',
          en: '`Map` is a dictionary whose keys can be any value, objects included; insertion order is kept, the size is `size`, iteration is `for…of`. A plain object converts keys to strings (or symbols) and has inherited properties. `Set` stores unique values — handy for removing duplicates. Keys are compared by SameValueZero: objects by reference, `NaN` equals `NaN`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const visits = new Map();
const user = { id: 1 };
visits.set(user, 3);
console.log(visits.get(user), visits.get({ id: 1 })); // 3 undefined

const unique = [...new Set([1, 2, 2, 3, 1])];
console.log(unique); // [1, 2, 3]

const plain = {};
plain[user] = 'x';
console.log(Object.keys(plain)); // ['[object Object]']`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`WeakMap` и `WeakSet` держат ключи-объекты **слабо**: если других ссылок на объект нет, [[garbage-collection|сборщик мусора]] удалит его вместе с записью. Поэтому их нельзя перебрать и у них нет `size`. Применение — данные, привязанные к объекту, без утечек памяти: кеш по DOM-узлу, приватные данные экземпляров.',
          en: '`WeakMap` and `WeakSet` hold their object keys **weakly**: if there are no other references to an object, the [[garbage-collection|garbage collector]] removes it along with the entry. That’s why they can’t be iterated and have no `size`. Use them for data attached to an object without memory leaks: a cache per DOM node, private instance data.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const clickCounts = new WeakMap();

function trackClick(button) {
  clickCounts.set(button, (clickCounts.get(button) ?? 0) + 1);
}`,
        },
        caption: {
          ru: 'Когда кнопку удалят из DOM, счётчик не будет держать её в памяти.',
          en: 'Once the button is removed from the DOM, the counter won’t keep it in memory.',
        },
      },
    ],
    keyPoints: [
      { ru: '`Map`: ключ — любое значение, порядок вставки, `size`.', en: '`Map`: any value as a key, insertion order, `size`.' },
      { ru: 'Ключи обычного объекта приводятся к строке.', en: 'Plain object keys are converted to strings.' },
      { ru: '`Set` хранит уникальные значения: `[...new Set(arr)]` убирает дубли.', en: '`Set` stores unique values: `[...new Set(arr)]` removes duplicates.' },
      {
        ru: 'Ключи сравниваются по SameValueZero: объекты — по ссылке, `NaN` находится.',
        en: 'Keys are compared by SameValueZero: objects by reference, `NaN` is found.',
      },
      {
        ru: '`WeakMap`/`WeakSet` не мешают сборке мусора и не перебираются.',
        en: '`WeakMap`/`WeakSet` don’t prevent garbage collection and can’t be iterated.',
      },
    ],
    sources: [
      { title: 'MDN — Map', url: `${MDN}/Reference/Global_Objects/Map` },
      { title: 'MDN — Set', url: `${MDN}/Reference/Global_Objects/Set` },
      { title: 'MDN — WeakMap', url: `${MDN}/Reference/Global_Objects/WeakMap` },
    ],
  },
  {
    tag: 'arrays',
    summary: {
      ru: 'Одни методы массива меняют его на месте, другие возвращают новый — на этом строится работа с состоянием в React.',
      en: 'Some array methods change the array in place, others return a new one — state handling in React is built on this.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Изменяют исходный массив `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`. Возвращают новый `map`, `filter`, `slice`, `concat`, `flat`. С ES2023 у изменяющих появились неизменяющие пары: `toSorted`, `toReversed`, `toSpliced` и `with`. В состоянии React мутации запрещены — берите методы, которые возвращают новый массив.',
          en: '`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill` change the array itself. `map`, `filter`, `slice`, `concat`, `flat` return a new one. Since ES2023 the mutating ones have non-mutating twins: `toSorted`, `toReversed`, `toSpliced` and `with`. Mutations are forbidden in React state — use the methods that return a new array.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const nums = [3, 1, 2];
const sorted = nums.toSorted();
console.log(nums, sorted); // [3, 1, 2] [1, 2, 3]
nums.sort();
console.log(nums); // [1, 2, 3]`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`sort` без компаратора сравнивает элементы как строки, поэтому числа сортируют с `(a, b) => a - b`. `map` передаёт колбэку три аргумента — значение, индекс и массив, отсюда ловушка `map(parseInt)`. У `reduce` всегда задавайте начальное значение: на пустом массиве без него будет `TypeError`.',
          en: '`sort` without a comparator compares elements as strings, so numbers are sorted with `(a, b) => a - b`. `map` passes three arguments to the callback — value, index and array — hence the `map(parseInt)` trap. Always give `reduce` an initial value: without it an empty array throws `TypeError`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `console.log([10, 9, 1].sort()); // [1, 10, 9]
console.log([10, 9, 1].sort((a, b) => a - b)); // [1, 9, 10]
console.log(['1', '2', '3'].map(parseInt)); // [1, NaN, NaN]
console.log([1, 2, 3].reduce((sum, value) => sum + value, 0)); // 6`,
        },
      },
    ],
    keyPoints: [
      {
        ru: '`push`, `splice`, `sort`, `reverse` меняют массив; `map`, `filter`, `slice` возвращают новый.',
        en: '`push`, `splice`, `sort`, `reverse` mutate; `map`, `filter`, `slice` return a new array.',
      },
      {
        ru: '`toSorted`, `toReversed`, `toSpliced`, `with` — неизменяющие версии (ES2023).',
        en: '`toSorted`, `toReversed`, `toSpliced`, `with` are the non-mutating versions (ES2023).',
      },
      { ru: '`sort` без компаратора сравнивает как строки.', en: '`sort` without a comparator compares as strings.' },
      {
        ru: '`map` передаёт `(value, index, array)` — поэтому `map(parseInt)` ломается.',
        en: '`map` passes `(value, index, array)` — that’s why `map(parseInt)` breaks.',
      },
      { ru: 'У `reduce` всегда задавайте начальное значение.', en: 'Always give `reduce` an initial value.' },
    ],
    sources: [
      { title: 'MDN — Array', url: `${MDN}/Reference/Global_Objects/Array` },
      { title: 'MDN — Array.prototype.sort()', url: `${MDN}/Reference/Global_Objects/Array/sort` },
      { title: 'MDN — Array.prototype.toSorted()', url: `${MDN}/Reference/Global_Objects/Array/toSorted` },
    ],
  },
  {
    tag: 'live-coding',
    summary: {
      ru: 'На live-coding проверяют не только результат, но и ход мысли: уточнить задачу, разобрать примеры, написать простое решение, проверить крайние случаи и оценить сложность.',
      en: 'Live-coding checks not just the result but your reasoning: clarify the task, walk through examples, write a simple solution, check edge cases and estimate complexity.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Порядок, который хорошо работает: переспросить условие и ограничения → разобрать 2–3 примера, включая пустой ввод → назвать идею решения вслух → написать рабочий вариант → прогнать примеры по коду → назвать сложность и что можно улучшить. Молчание хуже неидеального решения: интервьюер может подсказать, только если слышит ход мысли.',
          en: 'An order that works well: restate the task and constraints → walk through 2–3 examples, including empty input → state the idea out loud → write a working version → trace the examples through the code → name the complexity and what could be improved. Silence is worse than an imperfect solution: the interviewer can only help if they hear your reasoning.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Частые задачи фронтенда: `debounce` и `throttle` ([[closure|замыкание]] + таймер), свой `Promise.all` (порядок по индексу, счётчик, пустой массив), `curry` (`fn.length` + замыкание), `flatten` (рекурсия по `Array.isArray`), `memoize` (ключ из всех аргументов), LRU-кеш (`Map` помнит порядок вставки), скобки (стек), `groupBy`, глубокое копирование (`structuredClone`), таймаут через `Promise.race`.',
          en: 'Common frontend tasks: `debounce` and `throttle` ([[closure|closure]] + timer), your own `Promise.all` (order by index, a counter, the empty array), `curry` (`fn.length` + closure), `flatten` (recursion on `Array.isArray`), `memoize` (a key from all arguments), an LRU cache (`Map` keeps insertion order), brackets (a stack), `groupBy`, deep copy (`structuredClone`), a timeout via `Promise.race`.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Сначала уточнить условие и примеры, потом код.', en: 'Clarify the task and examples first, then code.' },
      { ru: 'Думать вслух и проверять пустой ввод.', en: 'Think out loud and check empty input.' },
      { ru: 'Назвать встроенную альтернативу и сложность.', en: 'Name the built-in alternative and the complexity.' },
    ],
    sources: [
      { title: 'MDN — Closures', url: `${MDN}/Guide/Closures` },
      { title: 'MDN — Promise', url: `${MDN}/Reference/Global_Objects/Promise` },
    ],
  },
];
