import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';

export const JAVASCRIPT_QUESTIONS_2: Question[] = [
  {
    id: 'js-types-002',
    topic: 'javascript',
    tags: ['types-coercion'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `console.log(JSON.stringify([[] + [], [] + {}, 1 + '2', '3' * '4']));`,
    },
    options: [
      { code: '[0,"[object Object]",3,12]' },
      { code: '["","{}","12","12"]' },
      { code: '["","[object Object]","12",12]' },
      { code: '[[],"[object Object]",12,12]' },
      { code: '["",0,"12",12]' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Оператор `+` складывает числа, только если оба операнда приводятся к числам. Если хотя бы один после приведения к примитиву — строка, выполняется конкатенация. Массив приводится к строке через `join`: `[]` → `""`, объект — к `"[object Object]"`.',
          en: 'The `+` operator adds numbers only if both operands become numbers. If either operand turns into a string after conversion to a primitive, it concatenates. An array becomes a string via `join`: `[]` → `""`, and a plain object becomes `"[object Object]"`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому `[] + []` → `""`, `[] + {}` → `"[object Object]"`, `1 + "2"` → `"12"`. А `*` всегда работает с числами: `"3" * "4"` → `12` (число, без кавычек в JSON).',
          en: 'So `[] + []` → `""`, `[] + {}` → `"[object Object]"`, `1 + "2"` → `"12"`. The `*` operator always works with numbers: `"3" * "4"` → `12` (a number, no quotes in JSON).',
        },
      },
    ],
    sources: [
      { title: 'MDN — Addition (+)', url: `${MDN}/Reference/Operators/Addition` },
      { title: 'MDN — Type coercion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion' },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-types-003',
    topic: 'javascript',
    tags: ['types-coercion'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: { lang: 'js', source: 'console.log(0.1 + 0.2 === 0.3, 0.1 + 0.2);' },
    options: [
      { code: 'true 0.3' },
      { code: 'false 0.3' },
      { code: 'true 0.30000000000000004' },
      { code: 'false 0.30000000000000004' },
      { code: 'false NaN' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Числа в JavaScript — 64-битные числа с плавающей точкой (IEEE 754). Десятичные дроби `0.1` и `0.2` нельзя точно записать в двоичной системе, поэтому сумма получается чуть больше `0.3`.',
          en: 'JavaScript numbers are 64-bit floating-point values (IEEE 754). The decimals `0.1` and `0.2` can’t be represented exactly in binary, so their sum comes out slightly above `0.3`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true
// для денег — целые копейки / for money — integer cents
(10 + 20) / 100; // 0.3`,
        },
      },
    ],
    sources: [
      { title: 'MDN — Number.EPSILON', url: `${MDN}/Reference/Global_Objects/Number/EPSILON` },
      { title: 'MDN — Number', url: `${MDN}/Reference/Global_Objects/Number` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-types-004',
    topic: 'javascript',
    tags: ['types-coercion', 'equality'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: 'console.log(NaN === NaN, Object.is(NaN, NaN), [NaN].includes(NaN), [NaN].indexOf(NaN));',
    },
    options: [
      { code: 'true true true 0' },
      { code: 'false false false -1' },
      { code: 'false true false -1' },
      { code: 'false true true 0' },
      { code: 'false true true -1' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`NaN` — единственное значение, которое не равно самому себе при `===`. `Object.is` использует алгоритм SameValue и считает `NaN` равным `NaN`.',
          en: '`NaN` is the only value that isn’t equal to itself under `===`. `Object.is` uses the SameValue algorithm and treats `NaN` as equal to `NaN`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`includes` сравнивает по SameValueZero и находит `NaN`, а `indexOf` использует строгое равенство и возвращает `-1`. Для проверки значения используйте `Number.isNaN(x)`.',
          en: '`includes` compares with SameValueZero and finds `NaN`, while `indexOf` uses strict equality and returns `-1`. To check a value, use `Number.isNaN(x)`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Equality comparisons and sameness', url: `${MDN}/Guide/Equality_comparisons_and_sameness` },
      { title: 'MDN — Number.isNaN()', url: `${MDN}/Reference/Global_Objects/Number/isNaN` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-types-005',
    topic: 'javascript',
    tags: ['types-coercion'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `console.log(Number(''), Number(' 12 '), Number('12px'), parseInt('12px'));`,
    },
    options: [
      { code: 'NaN 12 NaN 12' },
      { code: '0 12 NaN 12' },
      { code: '0 NaN NaN 12' },
      { code: '0 12 12 12' },
      { code: 'NaN NaN NaN NaN' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Number()` преобразует строку целиком: пробелы по краям обрезаются, пустая строка даёт `0`, а любой лишний символ (`px`) — `NaN`.',
          en: '`Number()` converts the whole string: surrounding whitespace is trimmed, an empty string becomes `0`, and any extra character (`px`) gives `NaN`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`parseInt` читает строку слева направо и останавливается на первом символе, который не является цифрой, поэтому `parseInt("12px")` → `12`.',
          en: '`parseInt` reads the string from the left and stops at the first non-digit, so `parseInt("12px")` → `12`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Number() constructor', url: `${MDN}/Reference/Global_Objects/Number/Number` },
      { title: 'MDN — parseInt()', url: `${MDN}/Reference/Global_Objects/parseInt` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-types-006',
    topic: 'javascript',
    tags: ['types-coercion'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const user = undefined;
console.log(0 || 'a', 0 ?? 'a', null ?? 'b', user?.name);`,
    },
    options: [
      { code: 'a a b undefined' },
      { code: '0 0 b undefined' },
      { code: 'a 0 b undefined' },
      { code: 'a 0 null undefined' },
      { code: 'a 0 b TypeError' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`||` возвращает правый операнд, если левый **ложный** (`0`, `""`, `false`, `null`, `undefined`, `NaN`). `??` — только если левый равен `null` или `undefined`, поэтому `0 ?? "a"` остаётся `0`.',
          en: '`||` returns the right operand when the left one is **falsy** (`0`, `""`, `false`, `null`, `undefined`, `NaN`). `??` does so only when the left one is `null` or `undefined`, so `0 ?? "a"` stays `0`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Опциональная цепочка `?.` не бросает ошибку на `undefined`, а возвращает `undefined`. Поэтому для значений по умолчанию, где `0` или пустая строка допустимы, используйте `??`.',
          en: 'Optional chaining `?.` doesn’t throw on `undefined` and returns `undefined` instead. Use `??` for defaults when `0` or an empty string are valid values.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Nullish coalescing (??)', url: `${MDN}/Reference/Operators/Nullish_coalescing` },
      { title: 'MDN — Optional chaining (?.)', url: `${MDN}/Reference/Operators/Optional_chaining` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-equality-001',
    topic: 'javascript',
    tags: ['equality', 'types-coercion'],
    difficulty: 3,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: 'console.log(null == undefined, null === undefined, null == 0, null >= 0);',
    },
    options: [
      { code: 'true false true true' },
      { code: 'false false false false' },
      { code: 'true true false false' },
      { code: 'true false false false' },
      { code: 'true false false true' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Нестрогое равенство `==` для `null` работает по особому правилу: `null` равен только `undefined` (и самому себе) и **не** приводится к числу. Поэтому `null == 0` — `false`.',
          en: 'Loose equality `==` has a special rule for `null`: it equals only `undefined` (and itself) and is **not** converted to a number. So `null == 0` is `false`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'А операторы сравнения `>`, `<`, `>=` приводят операнды к числам: `null` → `0`, и `0 >= 0` — `true`. Отсюда парадокс: `null >= 0`, но `null != 0`. Совет: используйте `===` и явные проверки.',
          en: 'Relational operators `>`, `<`, `>=` convert operands to numbers: `null` → `0`, and `0 >= 0` is `true`. Hence the paradox: `null >= 0` while `null != 0`. Tip: use `===` and explicit checks.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Equality (==)', url: `${MDN}/Reference/Operators/Equality` },
      {
        title: 'MDN — Greater than or equal (>=)',
        url: `${MDN}/Reference/Operators/Greater_than_or_equal`,
      },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-equality-002',
    topic: 'javascript',
    tags: ['equality'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: { lang: 'js', source: 'console.log(Object.is(0, -0), 0 === -0, Object.is(NaN, 0 / 0));' },
    options: [
      { code: 'true true true' },
      { code: 'false true true' },
      { code: 'false true false' },
      { code: 'true false true' },
      { code: 'false false true' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Object.is` почти совпадает с `===`, но различается в двух случаях: он отличает `0` от `-0` и считает `NaN` равным `NaN`. Выражение `0 / 0` даёт `NaN`.',
          en: '`Object.is` is almost the same as `===`, with two differences: it tells `0` and `-0` apart and treats `NaN` as equal to `NaN`. The expression `0 / 0` is `NaN`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'React использует `Object.is`, чтобы решить, изменилось ли состояние или зависимость эффекта.',
          en: 'React uses `Object.is` to decide whether state or an effect dependency has changed.',
        },
      },
    ],
    sources: [{ title: 'MDN — Object.is()', url: `${MDN}/Reference/Global_Objects/Object/is` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-scope-001',
    topic: 'javascript',
    tags: ['scope'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `try {
  console.log(value);
  let value = 1;
} catch (error) {
  console.log(error.constructor.name);
}`,
    },
    options: [{ code: 'undefined' }, { code: '1' }, { code: 'TypeError' }, { code: 'ReferenceError' }, { code: 'null' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Объявления `let` и `const` тоже поднимаются, но до строки объявления переменная находится во «[[tdz|временной мёртвой зоне]]» (TDZ). Любое обращение к ней в TDZ бросает `ReferenceError`.',
          en: '`let` and `const` declarations are hoisted too, but until the declaration line runs the variable is in the “[[tdz|temporal dead zone]]” (TDZ). Any access in the TDZ throws a `ReferenceError`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'С `var` было бы иначе: переменная поднимается и инициализируется `undefined`, поэтому вывелось бы `undefined`.',
          en: 'With `var` it would be different: the variable is hoisted and initialized with `undefined`, so `undefined` would be logged.',
        },
      },
    ],
    sources: [
      { title: 'MDN — let: Temporal dead zone', url: `${MDN}/Reference/Statements/let#temporal_dead_zone_tdz` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-scope-002',
    topic: 'javascript',
    tags: ['scope'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `console.log(typeof declared, typeof expressed);

function declared() {}
var expressed = function () {};`,
    },
    options: [
      { code: 'function function' },
      { code: 'undefined undefined' },
      { code: 'function undefined' },
      { code: 'undefined function' },
      { code: 'function object' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Function Declaration поднимается целиком — вместе с телом, поэтому функцию можно вызвать до её объявления в коде.',
          en: 'A function declaration is hoisted entirely, body included, so the function can be called before it appears in the code.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'У Function Expression поднимается только переменная `var expressed`, и до присваивания она равна `undefined`. С `let` или `const` здесь был бы `ReferenceError` из-за [[tdz|TDZ]].',
          en: 'For a function expression only the `var expressed` variable is hoisted, and it is `undefined` until the assignment. With `let` or `const` you’d get a `ReferenceError` because of the [[tdz|TDZ]].',
        },
      },
    ],
    sources: [
      { title: 'MDN — Hoisting', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting' },
      { title: 'MDN — function expression', url: `${MDN}/Reference/Operators/function` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-closures-002',
    topic: 'javascript',
    tags: ['closures'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
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
console.log(first(), second());`,
    },
    options: [{ code: '3 4' }, { code: '1 1' }, { code: '3 1' }, { code: '2 1' }, { code: '3 3' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждый вызов `makeCounter()` создаёт новое [[lexical-environment|лексическое окружение]] со своей переменной `count`. Возвращённая стрелка замыкает именно его.',
          en: 'Each `makeCounter()` call creates a new [[lexical-environment|lexical environment]] with its own `count`. The returned arrow function closes over that particular environment.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`first` вызвали трижды — её `count` стал `3`. У `second` свой счётчик, и первый вызов даёт `1`. Так [[closure|замыкания]] дают приватное состояние без классов.',
          en: '`first` was called three times, so its `count` is `3`. `second` has its own counter, and its first call returns `1`. That’s how [[closure|closures]] give you private state without classes.',
        },
      },
      { type: 'diagram', diagram: 'closure-counters' },
    ],
    sources: [{ title: 'MDN — Closures', url: `${MDN}/Guide/Closures` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-closures-003',
    topic: 'javascript',
    tags: ['closures', 'scope'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что такое замыкание?', en: 'What is a closure?' },
    options: [
      {
        text: {
          ru: 'Способ запретить изменение объекта, как `Object.freeze`',
          en: 'A way to prevent an object from changing, like `Object.freeze`',
        },
      },
      {
        text: {
          ru: 'Функция, которая вызывается сразу после объявления (IIFE)',
          en: 'A function that is invoked right after it is declared (IIFE)',
        },
      },
      {
        text: {
          ru: 'Копия внешних переменных, которую функция сохраняет в момент создания',
          en: 'A copy of outer variables that a function saves when it is created',
        },
      },
      {
        text: {
          ru: 'Функция вместе с лексическим окружением, в котором она создана: она видит внешние переменные даже после завершения внешней функции',
          en: 'A function bundled with the lexical environment it was created in: it can see outer variables even after the outer function has returned',
        },
      },
      {
        text: {
          ru: 'Приватное поле класса, объявленное через `#`',
          en: 'A private class field declared with `#`',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[closure|Замыкание]] — это функция плюс ссылка на окружение, где она была объявлена. Важно: функция хранит **ссылку** на переменные, а не их копию, поэтому видит их актуальные значения.',
          en: 'A [[closure|closure]] is a function plus a reference to the environment where it was declared. Importantly, the function keeps a **reference** to the variables, not a copy, so it sees their current values.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function greeter(name) {
  return () => \`Hi, \${name}\`;
}
const hiAnn = greeter('Ann');
hiAnn(); // 'Hi, Ann' — greeter уже завершилась / greeter has returned`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'На замыканиях построены приватные данные, фабрики функций, `debounce`/`throttle`, обработчики событий и хуки React.',
          en: 'Closures power private data, function factories, `debounce`/`throttle`, event handlers and React hooks.',
        },
      },
      { type: 'diagram', diagram: 'closure-counters' },
    ],
    sources: [{ title: 'MDN — Closures', url: `${MDN}/Guide/Closures` }],
  },
  {
    id: 'js-closures-004',
    topic: 'javascript',
    tags: ['closures'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Чем `debounce` отличается от `throttle`?', en: 'How does `debounce` differ from `throttle`?' },
    options: [
      {
        text: {
          ru: '`debounce` вызывает функцию не чаще раза за интервал, а `throttle` — только после паузы в событиях',
          en: '`debounce` calls the function at most once per interval, while `throttle` waits for a pause in events',
        },
      },
      {
        text: {
          ru: 'Это синонимы, названия просто разные в разных библиотеках',
          en: 'They are synonyms; libraries just name them differently',
        },
      },
      {
        text: {
          ru: '`debounce` откладывает вызов, пока события не прекратятся на заданное время, а `throttle` вызывает функцию не чаще одного раза за интервал',
          en: '`debounce` delays the call until events stop for a given time, while `throttle` calls the function at most once per interval',
        },
      },
      {
        text: {
          ru: '`debounce` работает только с вводом с клавиатуры, `throttle` — только со скроллом',
          en: '`debounce` only works with keyboard input, `throttle` only with scrolling',
        },
      },
      {
        text: {
          ru: '`throttle` навсегда отменяет все вызовы, кроме первого',
          en: '`throttle` permanently cancels every call except the first',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Debounce**: каждый новый вызов сбрасывает таймер, функция сработает, когда события затихнут. Подходит для поиска по мере ввода. **Throttle**: функция срабатывает не чаще раза в N мс, даже если события идут непрерывно. Подходит для скролла и `resize`.',
          en: '**Debounce**: every new call resets the timer, and the function fires once events go quiet. Good for search-as-you-type. **Throttle**: the function fires at most once every N ms even when events keep coming. Good for scroll and `resize`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}`,
        },
      },
    ],
    sources: [
      { title: 'MDN — Debounce', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Debounce' },
      { title: 'MDN — Throttle', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Throttle' },
    ],
  },
  {
    id: 'js-this-002',
    topic: 'javascript',
    tags: ['this', 'prototypes'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `class Button {
  label = 'OK';
  regular() {
    return this?.label;
  }
  arrow = () => this.label;
}

const { regular, arrow } = new Button();
console.log(regular(), arrow());`,
    },
    options: [
      { code: 'OK OK' },
      { code: 'OK undefined' },
      { code: 'undefined undefined' },
      { code: 'TypeError' },
      { code: 'undefined OK' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Метод класса лежит в прототипе, и его `this` зависит от вызова. После деструктуризации `regular()` вызывается без объекта, а тело класса всегда в строгом режиме, поэтому `this` — `undefined`, и `this?.label` даёт `undefined`.',
          en: 'A class method lives on the prototype, and its `this` depends on the call. After destructuring, `regular()` is called without an object, and class bodies are always strict, so `this` is `undefined` and `this?.label` gives `undefined`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Стрелочная функция в поле класса создаётся для каждого экземпляра и берёт `this` лексически — из конструктора. Поэтому `arrow()` возвращает `OK` в любом контексте. Так часто делают обработчики событий.',
          en: 'An arrow function in a class field is created per instance and captures `this` lexically from the constructor. So `arrow()` returns `OK` in any context — a common pattern for event handlers.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Arrow functions', url: `${MDN}/Reference/Functions/Arrow_functions` },
      { title: 'MDN — Public class fields', url: `${MDN}/Reference/Classes/Public_class_fields` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-this-003',
    topic: 'javascript',
    tags: ['this'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function greet(greeting) {
  return \`\${greeting}, \${this.name}\`;
}

const bound = greet.bind({ name: 'Ann' });
console.log(bound.call({ name: 'Bob' }, 'Hi'));`,
    },
    options: [
      { code: 'Hi, Bob' },
      { code: 'Hi, Ann' },
      { code: 'Hi, undefined' },
      { code: 'undefined, Ann' },
      { code: 'TypeError' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`bind` возвращает новую функцию с жёстко зафиксированным `this`. Переопределить его через `call`, `apply` или повторный `bind` нельзя — они меняют только аргументы.',
          en: '`bind` returns a new function with `this` permanently fixed. `call`, `apply` or another `bind` can’t override it — they only affect the arguments.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Исключение — вызов связанной функции через `new`: тогда `this` будет новым объектом.',
          en: 'The exception is calling a bound function with `new`: then `this` is the newly created object.',
        },
      },
    ],
    sources: [
      {
        title: 'MDN — Function.prototype.bind()',
        url: `${MDN}/Reference/Global_Objects/Function/bind`,
      },
    ],
    verify: { kind: 'js-output' },
  },
];
