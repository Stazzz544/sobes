import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';

export const JAVASCRIPT_LESSONS_2: Lesson[] = [
  {
    tag: 'types-coercion',
    format: 'steps',
    summary: {
      ru: 'В JavaScript восемь типов, и язык охотно приводит одни к другим. Знать правила приведения нужно, чтобы читать чужой код и не попадаться на `+` со строками, `typeof null` и дробные числа.',
      en: 'JavaScript has eight types, and the language readily converts between them. You need the conversion rules to read others’ code and not trip over `+` with strings, `typeof null` and fractions.',
    },
    steps: [
      {
        id: 'typeof',
        title: { ru: 'Типы и typeof', en: 'Types and typeof' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Примитивы: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null`; всё остальное — объекты, включая массивы и функции. `typeof` всегда возвращает **строку** и знает несколько исторических причуд: `typeof null` — `"object"`, `typeof NaN` — `"number"`, `typeof []` — `"object"`, а `typeof` функции — `"function"`. Массив проверяют `Array.isArray`, `null` — сравнением `=== null`.',
              en: 'Primitives: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null`; everything else is an object, arrays and functions included. `typeof` always returns a **string** and has some historical quirks: `typeof null` is `"object"`, `typeof NaN` is `"number"`, `typeof []` is `"object"`, and a function’s `typeof` is `"function"`. Check arrays with `Array.isArray` and `null` with `=== null`.',
            },
          },
        ],
        test: ['js-types-001', 'js-types-coercion-output-001'],
      },
      {
        id: 'plus',
        title: { ru: 'Плюс: сложение или склейка', en: 'Plus: addition or concatenation' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Оператор `+` сначала приводит операнды к примитивам. Если хотя бы один получился строкой — происходит **склейка**, иначе сложение чисел. Объекты приводятся через `valueOf`/`toString`: массив становится строкой через `join` (`[]` → `""`, `[1, 2]` → `"1,2"`), обычный объект — `"[object Object]"`. Остальные арифметические операторы (`-`, `*`, `/`) всегда приводят к числам.',
              en: 'The `+` operator first converts operands to primitives. If at least one became a string, it **concatenates**; otherwise it adds numbers. Objects convert via `valueOf`/`toString`: an array becomes a string through `join` (`[]` → `""`, `[1, 2]` → `"1,2"`), a plain object becomes `"[object Object]"`. The other arithmetic operators (`-`, `*`, `/`) always convert to numbers.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "'5' + 1;   // '51'\n'5' - 1;   // 4\n[1, 2] + 3; // '1,23'\ntrue + 1;  // 2",
            },
          },
        ],
        test: ['js-types-002'],
      },
      {
        id: 'numbers',
        title: { ru: 'Числа и разбор строк', en: 'Numbers and parsing strings' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Все числа — 64-битные с плавающей точкой (IEEE 754): дроби вроде `0.1` нельзя точно записать в двоичном виде, поэтому `0.1 + 0.2` чуть больше `0.3`. Деньги считают в копейках целыми числами, а дроби сравнивают с допуском. `Number(str)` разбирает строку **целиком**: пробелы по краям обрезает, пустая строка даёт `0`, лишний символ — `NaN`. `parseInt` читает слева и останавливается на первом неподходящем символе.',
              en: 'Every number is a 64-bit float (IEEE 754): fractions like `0.1` can’t be represented exactly in binary, so `0.1 + 0.2` is slightly more than `0.3`. Money is counted in integer cents, and fractions are compared with a tolerance. `Number(str)` parses the **whole** string: it trims spaces, an empty string gives `0`, any extra character gives `NaN`. `parseInt` reads from the left and stops at the first unsuitable character.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'parse-float',
              prompt: {
                ru: 'Что вернут `Number(\'3.5kg\')` и `parseFloat(\'3.5kg\')`?',
                en: 'What do `Number(\'3.5kg\')` and `parseFloat(\'3.5kg\')` return?',
              },
              options: [
                { text: { ru: '`3.5` и `3.5`', en: '`3.5` and `3.5`' } },
                { text: { ru: '`NaN` и `3.5`', en: '`NaN` and `3.5`' } },
                { text: { ru: '`NaN` и `NaN`', en: '`NaN` and `NaN`' } },
              ],
              answer: 1,
              explanation: {
                ru: '`Number` требует, чтобы вся строка была числом, а `parseFloat` берёт число из начала строки.',
                en: '`Number` needs the whole string to be a number, while `parseFloat` takes the number from the start of the string.',
              },
            },
          },
        ],
        test: ['js-types-005'],
      },
      {
        id: 'nullish',
        title: { ru: '||, ?? и ?.', en: '||, ?? and ?.' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`a || b` возвращает `b`, если `a` **ложное**: `0`, `""`, `false`, `null`, `undefined`, `NaN`. Для значений по умолчанию это часто ошибка — `0` и пустая строка тоже заменятся. `a ?? b` подставляет `b`, только если `a` равно `null` или `undefined`. Опциональная цепочка `a?.b` возвращает `undefined` вместо ошибки, если `a` — `null` или `undefined`.',
              en: '`a || b` returns `b` if `a` is **falsy**: `0`, `""`, `false`, `null`, `undefined`, `NaN`. For defaults that’s often a bug — `0` and an empty string get replaced too. `a ?? b` falls back to `b` only if `a` is `null` or `undefined`. Optional chaining `a?.b` returns `undefined` instead of throwing if `a` is `null` or `undefined`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const limit = 0;\nlimit || 10; // 10 — wrong\nlimit ?? 10; // 0\nconst user = null;\nuser?.email; // undefined",
            },
          },
        ],
        test: ['js-types-006'],
      },
    ],
    keyPoints: [
      { ru: '`typeof null` — `"object"`, массив — `Array.isArray`.', en: '`typeof null` is `"object"`; arrays — `Array.isArray`.' },
      { ru: '`+` со строкой — склейка, остальные операторы — числа.', en: '`+` with a string concatenates; other operators use numbers.' },
      { ru: '`0.1 + 0.2 !== 0.3`.', en: '`0.1 + 0.2 !== 0.3`.' },
      { ru: 'Значения по умолчанию — через `??`.', en: 'Defaults via `??`.' },
    ],
    sources: [
      { title: 'MDN — JavaScript data types', url: `${MDN}/Guide/Data_structures` },
      { title: 'MDN — Type coercion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion' },
      { title: 'MDN — Nullish coalescing operator (??)', url: `${MDN}/Reference/Operators/Nullish_coalescing` },
    ],
  },  {
    tag: 'equality',
    format: 'steps',
    summary: {
      ru: 'В JavaScript четыре способа сравнить значения: `==`, `===`, `Object.is` и SameValueZero внутри `includes`, `Map` и `Set`. Разберём, чем они отличаются и почему объекты равны только самим себе.',
      en: 'JavaScript has four ways to compare values: `==`, `===`, `Object.is` and SameValueZero inside `includes`, `Map` and `Set`. We’ll see how they differ and why objects equal only themselves.',
    },
    steps: [
      {
        id: 'strict-loose',
        title: { ru: '=== и ==', en: '=== and ==' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`===` сравнивает без приведения: разные типы — сразу `false`. `==` сначала приводит типы, и правила неочевидны: булево значение превращается в число (`false` → `0`), объект — в примитив (`[]` → `""` → `0`), строка — в число. Отсюда странности вроде `[] == false` и `"0" == false`. В коде используют `===`, а `== null` — единственное разумное исключение.',
              en: '`===` compares without conversion: different types give `false` at once. `==` converts types first, and the rules are surprising: a boolean becomes a number (`false` → `0`), an object a primitive (`[]` → `""` → `0`), a string a number. Hence oddities like `[] == false` and `"0" == false`. Code uses `===`, with `== null` as the one sensible exception.',
            },
          },
        ],
        test: ['js-equality-003'],
      },
      {
        id: 'null-undefined',
        title: { ru: 'null и undefined', en: 'null and undefined' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Для `==` у `null` особое правило: он равен только `undefined` и самому себе и **не** приводится к числу, поэтому `null == 0` — `false`. Удобный приём: `value == null` проверяет сразу и `null`, и `undefined`. А операторы `>`, `<`, `>=` приводят `null` к `0`, поэтому `null >= 0` — `true`, хотя `null == 0` — `false`.',
              en: 'For `==`, `null` has a special rule: it equals only `undefined` and itself and is **not** converted to a number, so `null == 0` is `false`. A handy trick: `value == null` checks both `null` and `undefined`. But `>`, `<` and `>=` convert `null` to `0`, so `null >= 0` is `true` even though `null == 0` is `false`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'loose-null',
              prompt: {
                ru: 'Что проверяет условие `if (value == null)`?',
                en: 'What does `if (value == null)` check?',
              },
              options: [
                { text: { ru: 'Только `null`', en: 'Only `null`' } },
                { text: { ru: '`null` и `undefined`', en: '`null` and `undefined`' } },
                { text: { ru: 'Любое ложное значение', en: 'Any falsy value' } },
              ],
              answer: 1,
              explanation: {
                ru: 'По правилу `==` `null` равен только `undefined`, а `0`, `""` и `false` под условие не попадут.',
                en: 'By the `==` rule `null` equals only `undefined`; `0`, `""` and `false` don’t match.',
              },
            },
          },
        ],
        test: ['js-equality-001'],
      },
      {
        id: 'nan-zero',
        title: { ru: 'NaN, -0 и Object.is', en: 'NaN, -0 and Object.is' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`NaN` — единственное значение, не равное самому себе при `===`; `0 / 0` тоже даёт `NaN`. `Object.is` (алгоритм SameValue) считает `NaN` равным `NaN` и отличает `0` от `-0` — им React сравнивает состояние. SameValueZero, который используют `includes`, `Map` и `Set`, находит `NaN`, но `0` и `-0` считает равными. А `indexOf` сравнивает как `===` и `NaN` не находит.',
              en: '`NaN` is the only value not equal to itself under `===`; `0 / 0` also gives `NaN`. `Object.is` (SameValue) treats `NaN` as equal to `NaN` and tells `0` from `-0` — React compares state with it. SameValueZero, used by `includes`, `Map` and `Set`, finds `NaN` but treats `0` and `-0` as equal. And `indexOf` compares like `===` and doesn’t find `NaN`.',
            },
          },
        ],
        test: ['js-types-004', 'js-equality-002'],
      },
      {
        id: 'references',
        title: { ru: 'Объекты сравниваются по ссылке', en: 'Objects compare by reference' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Объекты, массивы и функции равны только **самим себе**: два одинаковых литерала — два разных объекта. Поэтому `includes`, `indexOf` и `Set` не найдут объект, созданный заново с тем же содержимым. Искать по содержимому нужно явно: `items.some((item) => item.id === id)`. Для глубокого сравнения пишут свою функцию или берут библиотеку.',
              en: 'Objects, arrays and functions equal only **themselves**: two identical literals are two different objects. So `includes`, `indexOf` and `Set` won’t find an object recreated with the same contents. Search by contents explicitly: `items.some((item) => item.id === id)`. Deep comparison needs your own function or a library.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const tags = [{ id: 7 }];\ntags.includes({ id: 7 }); // false\ntags.some((t) => t.id === 7); // true",
            },
          },
        ],
        test: ['js-equality-bug-001'],
      },
    ],
    keyPoints: [
      { ru: '`===` без приведения, `==` — с хитрыми правилами.', en: '`===` without conversion; `==` with tricky rules.' },
      { ru: '`== null` ловит и `null`, и `undefined`.', en: '`== null` catches both `null` and `undefined`.' },
      { ru: '`Object.is` различает `-0` и находит `NaN`.', en: '`Object.is` tells `-0` apart and matches `NaN`.' },
      { ru: 'Объекты равны только самим себе.', en: 'Objects equal only themselves.' },
    ],
    sources: [
      { title: 'MDN — Equality comparisons and sameness', url: `${MDN}/Guide/Equality_comparisons_and_sameness` },
      { title: 'MDN — Object.is()', url: `${MDN}/Reference/Global_Objects/Object/is` },
    ],
  },  {
    tag: 'scope',
    format: 'steps',
    summary: {
      ru: 'Область видимости решает, где переменная доступна. Разберём блочную и функциональную область, подъём объявлений, временную мёртвую зону и лексическую область — основу замыканий.',
      en: 'Scope decides where a variable is accessible. We’ll cover block and function scope, hoisting, the temporal dead zone and lexical scope — the foundation of closures.',
    },
    steps: [
      {
        id: 'block-function',
        title: { ru: 'Блок или функция', en: 'Block or function' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`let` и `const` видны только внутри блока `{}`, где объявлены: в `if`, цикле или просто в фигурных скобках. Переменная с тем же именем внутри блока — новая, она **затеняет** внешнюю и исчезает после блока. `var` блоков не замечает: его область — вся функция или модуль, и повторное `var` в блоке переприсваивает ту же переменную.',
              en: '`let` and `const` are visible only inside the `{}` block where they’re declared: in an `if`, a loop or plain braces. A same-named variable inside a block is a new one: it **shadows** the outer one and disappears after the block. `var` ignores blocks: its scope is the whole function or module, and another `var` in a block reassigns the same variable.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const mode = 'light';\n{\n  const mode = 'dark';\n  console.log(mode); // dark\n}\nconsole.log(mode); // light",
            },
          },
        ],
        test: ['js-scope-003'],
      },
      {
        id: 'hoisting',
        title: { ru: 'Подъём объявлений', en: 'Hoisting' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Объявления поднимаются в начало своей области. Function Declaration поднимается **целиком** — её можно вызвать выше по коду. У `var` поднимается только объявление, без присваивания: до строки присваивания переменная равна `undefined`, причём локальная `var` затеняет внешнюю уже с первой строки функции. У Function Expression, записанного в `var`, до присваивания тоже `undefined`.',
              en: 'Declarations are hoisted to the top of their scope. A Function Declaration is hoisted **entirely** — you can call it earlier in the code. With `var` only the declaration is hoisted, not the assignment: before the assignment line the variable is `undefined`, and a local `var` shadows the outer one from the function’s first line. A Function Expression stored in a `var` is also `undefined` before assignment.',
            },
          },
        ],
        test: ['js-scope-004', 'js-scope-002'],
      },
      {
        id: 'tdz',
        title: { ru: 'Временная мёртвая зона', en: 'The temporal dead zone' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`let`, `const` и `class` тоже поднимаются, но до строки объявления находятся во «[[tdz|временной мёртвой зоне]]». Любое обращение к ним там бросает `ReferenceError`, а не возвращает `undefined`. Так язык ловит ошибку «используем раньше, чем объявили», которую `var` молча скрывал.',
              en: '`let`, `const` and `class` are hoisted too, but before the declaration line they’re in the “[[tdz|temporal dead zone]]”. Any access there throws a `ReferenceError` instead of returning `undefined`. That’s how the language catches “used before declared” bugs that `var` silently hid.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'tdz-typeof',
              prompt: {
                ru: 'Что даст обращение к переменной `let` до строки её объявления в том же блоке?',
                en: 'What happens when you access a `let` variable before its declaration line in the same block?',
              },
              options: [
                { text: { ru: '`undefined`', en: '`undefined`' } },
                { text: { ru: '`ReferenceError`', en: '`ReferenceError`' } },
                { text: { ru: 'Значение внешней переменной с тем же именем', en: 'The outer variable’s value with the same name' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Внутренняя `let` уже существует в блоке и затеняет внешнюю, но до объявления в мёртвой зоне.',
                en: 'The inner `let` already exists in the block and shadows the outer one, but sits in the dead zone until declared.',
              },
            },
          },
        ],
        test: ['js-scope-001'],
      },
      {
        id: 'lexical',
        title: { ru: 'Лексическая область', en: 'Lexical scope' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Функция ищет переменные там, где она **объявлена**, а не там, откуда её вызвали: сначала в своей области, потом во внешних по цепочке. Отсюда классическая ловушка: в цикле с `var` одна переменная на все итерации, и колбэки, запущенные позже, видят её последнее значение. `let` в заголовке цикла создаёт новую переменную на каждую итерацию.',
              en: 'A function looks up variables where it’s **declared**, not where it’s called from: first in its own scope, then outward along the chain. Hence the classic trap: a `var` loop has one variable for all iterations, and callbacks that run later see its final value. `let` in the loop header creates a new variable per iteration.',
            },
          },
          { type: 'diagram', diagram: 'js-scope-chain' },
        ],
        test: ['js-closures-001'],
      },
    ],
    keyPoints: [
      { ru: '`let`/`const` — блок, `var` — функция.', en: '`let`/`const` are block-scoped; `var` is function-scoped.' },
      { ru: 'Function Declaration поднимается целиком, `var` — без значения.', en: 'Function Declarations hoist whole; `var` hoists without its value.' },
      { ru: 'До объявления `let` — `ReferenceError`.', en: 'Before a `let` declaration — `ReferenceError`.' },
      { ru: 'Переменные ищутся по месту объявления функции.', en: 'Variables are looked up by where the function is declared.' },
    ],
    sources: [
      { title: 'MDN — Scope', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Scope' },
      { title: 'MDN — Hoisting', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting' },
      { title: 'MDN — let: temporal dead zone', url: `${MDN}/Reference/Statements/let#temporal_dead_zone_tdz` },
    ],
  },  {
    tag: 'objects',
    format: 'steps',
    summary: {
      ru: 'Объекты передаются по ссылке, и большая часть ошибок с ними — это неожиданные общие ссылки. Разберём копирование, заморозку и порядок ключей.',
      en: 'Objects are passed by reference, and most bugs with them are unexpected shared references. We’ll cover copying, freezing and key order.',
    },
    steps: [
      {
        id: 'references',
        title: { ru: 'Ссылки', en: 'References' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Переменная хранит не сам объект, а **ссылку** на него. `const b = a` копирует ссылку: обе переменные указывают на один объект, и изменение через одну видно через другую. `const` запрещает переприсвоить переменную, но не менять объект. Спред `{ ...a }` создаёт **новый** объект с копией свойств верхнего уровня.',
              en: 'A variable holds not the object itself but a **reference** to it. `const b = a` copies the reference: both variables point to one object, and a change through one is visible through the other. `const` forbids reassigning the variable, not changing the object. Spread `{ ...a }` creates a **new** object with a copy of the top-level properties.',
            },
          },
        ],
        test: ['js-objects-001'],
      },
      {
        id: 'copies',
        title: { ru: 'Поверхностная и глубокая копия', en: 'Shallow and deep copies' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Спред и `Object.assign` копируют только **верхний уровень**: вложенные объекты и массивы в копии — те же ссылки, и их изменение затронет оригинал. Глубокую копию делает `structuredClone`: он копирует вложенные объекты, массивы, `Date`, `Map` и `Set`, но не функции. `JSON.parse(JSON.stringify(x))` превращает `Date` в строку и теряет `undefined`, функции, `Map` и `Set`.',
              en: 'Spread and `Object.assign` copy only the **top level**: nested objects and arrays in the copy are the same references, and changing them affects the original. `structuredClone` makes a deep copy: it copies nested objects, arrays, `Date`, `Map` and `Set`, but not functions. `JSON.parse(JSON.stringify(x))` turns `Date` into a string and loses `undefined`, functions, `Map` and `Set`.',
            },
          },
          { type: 'illustration', illustration: 'imm-shared-reference' },
        ],
        test: ['js-live-deep-clone-001'],
      },
      {
        id: 'freeze',
        title: { ru: 'Object.freeze', en: 'Object.freeze' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`Object.freeze` запрещает добавлять, удалять и менять свойства объекта; в строгом режиме попытка бросает `TypeError`, в нестрогом молча игнорируется. Заморозка **поверхностная**: вложенные объекты остаются изменяемыми, пока их тоже не заморозить. Для типов есть `as const` и `Readonly`, но они работают только на этапе компиляции.',
              en: '`Object.freeze` forbids adding, deleting and changing an object’s properties; in strict mode an attempt throws a `TypeError`, in sloppy mode it’s silently ignored. Freezing is **shallow**: nested objects stay mutable until frozen too. Types have `as const` and `Readonly`, but they work only at compile time.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'freeze-nested',
              prompt: {
                ru: 'Объект заморожен через `Object.freeze`. Можно ли изменить свойство вложенного объекта?',
                en: 'An object is frozen with `Object.freeze`. Can you change a property of a nested object?',
              },
              options: [
                { text: { ru: 'Нет, заморожено всё дерево', en: 'No, the whole tree is frozen' } },
                { text: { ru: 'Да: заморозка поверхностная', en: 'Yes: freezing is shallow' } },
                { text: { ru: 'Только в строгом режиме', en: 'Only in strict mode' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Заморожены только собственные свойства верхнего объекта; вложенный объект — отдельный и не заморожен.',
                en: 'Only the top object’s own properties are frozen; the nested object is separate and not frozen.',
              },
            },
          },
        ],
        test: ['js-objects-003'],
      },
      {
        id: 'keys',
        title: { ru: 'Ключи и их порядок', en: 'Keys and their order' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ключи обычного объекта — строки и символы. Порядок собственных ключей задан спецификацией: сначала целочисленные ключи по возрастанию, затем строковые в порядке добавления, затем символы. Если ключами должны быть объекты, нужен `Map` — он сравнивает ключи по ссылке: другой объект с тем же содержимым — другой ключ.',
              en: 'Plain object keys are strings and symbols. The order of own keys is defined by the spec: integer keys ascending first, then string keys in insertion order, then symbols. If keys must be objects, you need a `Map` — it compares keys by reference: another object with the same contents is another key.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const ids = { z: 1, 10: 1, a: 1, 2: 1 };\nObject.keys(ids);\n// ['2', '10', 'z', 'a']",
            },
          },
        ],
        test: ['js-objects-004', 'js-collections-001'],
      },
    ],
    keyPoints: [
      { ru: 'Присваивание копирует ссылку, а не объект.', en: 'Assignment copies the reference, not the object.' },
      { ru: 'Спред — поверхностная копия, `structuredClone` — глубокая.', en: 'Spread is a shallow copy; `structuredClone` a deep one.' },
      { ru: '`Object.freeze` — поверхностный.', en: '`Object.freeze` is shallow.' },
      { ru: 'Целые ключи идут первыми по возрастанию.', en: 'Integer keys come first, ascending.' },
    ],
    sources: [
      { title: 'MDN — Working with objects', url: `${MDN}/Guide/Working_with_objects` },
      { title: 'MDN — structuredClone()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone' },
      { title: 'MDN — Object.freeze()', url: `${MDN}/Reference/Global_Objects/Object/freeze` },
    ],
  },  {
    tag: 'arrays',
    format: 'steps',
    summary: {
      ru: 'Методы массивов — основной инструмент обработки данных во фронтенде. Разберём цепочки `map`/`filter`/`reduce`, аргументы колбэков, сортировку и типичные ошибки с границами.',
      en: 'Array methods are the main data-processing tool on the frontend. We’ll cover `map`/`filter`/`reduce` chains, callback arguments, sorting and typical boundary bugs.',
    },
    steps: [
      {
        id: 'map-filter-reduce',
        title: { ru: 'map, filter, reduce', en: 'map, filter, reduce' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`map` превращает каждый элемент и возвращает новый массив той же длины, `filter` оставляет элементы, для которых колбэк вернул истину, `reduce` сворачивает массив в одно значение. Методы не меняют исходный массив и складываются в цепочку. У `reduce` всегда задают начальное значение: без него на пустом массиве будет `TypeError`, а первый элемент станет аккумулятором.',
              en: '`map` transforms each element and returns a new array of the same length, `filter` keeps elements for which the callback returns true, `reduce` folds the array into one value. These methods don’t change the source array and chain together. Always give `reduce` an initial value: without it an empty array throws a `TypeError`, and the first element becomes the accumulator.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const total = orders\n  .filter((order) => order.paid)\n  .map((order) => order.sum)\n  .reduce((acc, sum) => acc + sum, 0);',
            },
          },
        ],
        test: ['js-arrays-output-001'],
      },
      {
        id: 'callback-args',
        title: { ru: 'Аргументы колбэка', en: 'Callback arguments' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Колбэк `map`, `filter` и `forEach` получает **три** аргумента: элемент, индекс и сам массив. Если передать функцию напрямую, она получит их все — и может понять лишние по-своему. `parseInt` принимает второй аргумент как основание системы счисления, поэтому `["1", "2"].map(parseInt)` даёт неожиданный результат. Надёжнее явная стрелка: `map((s) => parseInt(s, 10))` или `map(Number)`.',
              en: 'The callback of `map`, `filter` and `forEach` gets **three** arguments: the element, the index and the array itself. Pass a function directly and it gets all of them — and may interpret the extra ones its own way. `parseInt` takes the second argument as the radix, so `["1", "2"].map(parseInt)` gives a surprising result. An explicit arrow is safer: `map((s) => parseInt(s, 10))` or `map(Number)`.',
            },
          },
        ],
        test: ['js-arrays-001'],
      },
      {
        id: 'sorting',
        title: { ru: 'Сортировка', en: 'Sorting' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Без функции сравнения `sort` приводит элементы к строкам и сравнивает посимвольно: `"10"` окажется раньше `"2"`. Для чисел нужен компаратор `(a, b) => a - b`. `sort` меняет исходный массив и возвращает его же; чтобы не трогать оригинал, используют `toSorted` или сортируют копию `[...items]`. С ES2019 сортировка стабильна.',
              en: 'Without a comparator `sort` converts elements to strings and compares them character by character: `"10"` lands before `"2"`. Numbers need the comparator `(a, b) => a - b`. `sort` mutates the source array and returns it; to keep the original intact, use `toSorted` or sort a copy `[...items]`. Since ES2019 sorting is stable.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'sort-mutates',
              prompt: {
                ru: '`const sorted = items.sort()`. Что стало с `items`?',
                en: '`const sorted = items.sort()`. What happened to `items`?',
              },
              options: [
                { text: { ru: 'Ничего, `sorted` — копия', en: 'Nothing, `sorted` is a copy' } },
                { text: { ru: 'Он отсортирован: `sort` меняет массив и возвращает его же', en: 'It’s sorted: `sort` mutates the array and returns it' } },
                { text: { ru: 'Он очищен', en: 'It’s emptied' } },
              ],
              answer: 1,
              explanation: {
                ru: '`sorted` и `items` — один и тот же массив. Копию возвращает `toSorted`.',
                en: '`sorted` and `items` are the same array. `toSorted` returns a copy.',
              },
            },
          },
        ],
        test: ['js-arrays-002'],
      },
      {
        id: 'boundaries',
        title: { ru: 'Границы и вложенность', en: 'Boundaries and nesting' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Индексы идут от `0` до `length - 1`: условие `i <= length` делает лишнюю итерацию, где элемент — `undefined`, а арифметика с ним даёт `NaN`. Массив любой вложенности разворачивают рекурсией: массивы разворачиваем дальше, остальное кладём как есть (`Array.isArray`, а не `typeof`, — иначе объекты и `null` примут за массивы). `flat()` по умолчанию снимает один уровень. Группировка — `reduce` с объектом-аккумулятором.',
              en: 'Indexes go from `0` to `length - 1`: the condition `i <= length` adds an extra iteration where the element is `undefined`, and arithmetic with it gives `NaN`. Arrays of any depth are flattened recursively: unfold arrays further, keep everything else as is (`Array.isArray`, not `typeof` — otherwise objects and `null` pass as arrays). `flat()` removes one level by default. Grouping is `reduce` with an object accumulator.',
            },
          },
        ],
        test: ['js-arrays-bug-001', 'js-live-flatten-001'],
      },
    ],
    keyPoints: [
      { ru: '`map`/`filter`/`reduce` не меняют массив; `reduce` — с начальным значением.', en: '`map`/`filter`/`reduce` don’t mutate; give `reduce` an initial value.' },
      { ru: 'Колбэк получает элемент, индекс и массив.', en: 'A callback gets the element, the index and the array.' },
      { ru: '`sort` без компаратора сравнивает строки и меняет массив.', en: '`sort` without a comparator compares strings and mutates.' },
      { ru: 'Последний индекс — `length - 1`.', en: 'The last index is `length - 1`.' },
    ],
    sources: [
      { title: 'MDN — Array', url: `${MDN}/Reference/Global_Objects/Array` },
      { title: 'MDN — Array.prototype.reduce()', url: `${MDN}/Reference/Global_Objects/Array/reduce` },
      { title: 'MDN — Array.prototype.toSorted()', url: `${MDN}/Reference/Global_Objects/Array/toSorted` },
    ],
  },  {
    tag: 'prototypes',
    format: 'steps',
    summary: {
      ru: 'Наследование в JavaScript построено на прототипах: объект делегирует поиск свойств другому объекту. Классы — удобный синтаксис поверх этого механизма.',
      en: 'Inheritance in JavaScript is built on prototypes: an object delegates property lookup to another object. Classes are convenient syntax on top of this mechanism.',
    },
    steps: [
      {
        id: 'chain',
        title: { ru: 'Цепочка прототипов', en: 'The prototype chain' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'У каждого объекта есть скрытая ссылка `[[Prototype]]` на другой объект или `null`. Если свойства нет в самом объекте, поиск идёт по этой цепочке выше. **Чтение** идёт по цепочке, а **запись** всегда создаёт или меняет собственное свойство объекта: оно затеняет прототипное, а сам прототип не меняется. `Object.hasOwn(obj, key)` проверяет только собственные свойства.',
              en: 'Every object has a hidden `[[Prototype]]` link to another object or `null`. If a property isn’t on the object itself, the lookup continues up this chain. **Reading** walks the chain, while **writing** always creates or changes the object’s own property: it shadows the prototype one, and the prototype itself stays unchanged. `Object.hasOwn(obj, key)` checks own properties only.',
            },
          },
          { type: 'diagram', diagram: 'prototype-chain' },
        ],
        test: ['js-proto-004'],
      },
      {
        id: 'new',
        title: { ru: 'Что делает new', en: 'What new does' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`new F()` выполняет четыре шага: создаёт пустой объект, связывает его `[[Prototype]]` с `F.prototype` (связь, а не копирование), вызывает `F` с этим объектом в `this` и возвращает его. Если конструктор явно вернул другой объект, `new` вернёт его. Методы кладут в `F.prototype`, чтобы все экземпляры делили одну функцию, а не получали копию.',
              en: '`new F()` performs four steps: creates an empty object, links its `[[Prototype]]` to `F.prototype` (a link, not a copy), calls `F` with that object as `this` and returns it. If the constructor explicitly returns another object, `new` returns that instead. Methods go into `F.prototype` so all instances share one function rather than each getting a copy.',
            },
          },
        ],
        test: ['js-proto-003'],
      },
      {
        id: 'classes',
        title: { ru: 'Классы', en: 'Classes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Класс — синтаксис поверх функции-конструктора: `typeof` класса — `"function"`. Методы класса попадают в его `prototype`, а поля (`count = 0`) создаются у каждого экземпляра. Тело класса всегда выполняется в строгом режиме, а вызвать класс без `new` нельзя — будет `TypeError`.',
              en: 'A class is syntax over a constructor function: a class’s `typeof` is `"function"`. Class methods go onto its `prototype`, while fields (`count = 0`) are created on each instance. A class body always runs in strict mode, and calling a class without `new` throws a `TypeError`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "class Cart {\n  items = [];\n  add(item) { this.items.push(item); }\n}\nconst cart = new Cart();\nObject.hasOwn(cart, 'items'); // true\nObject.hasOwn(cart, 'add'); // false",
            },
          },
        ],
        test: ['js-proto-005'],
      },
      {
        id: 'extends',
        title: { ru: 'extends, super и instanceof', en: 'extends, super and instanceof' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`class B extends A` выстраивает цепочку `B.prototype → A.prototype`. В конструкторе наследника `super()` обязателен до обращения к `this`, а `super.method()` вызывает метод родителя с **тем же** `this` — текущим экземпляром. `instanceof` проверяет, есть ли `A.prototype` в цепочке объекта. `Object.create(null)` создаёт объект вообще без прототипа: у него нет даже `toString`.',
              en: '`class B extends A` builds the chain `B.prototype → A.prototype`. In a subclass constructor `super()` must come before using `this`, and `super.method()` calls the parent’s method with the **same** `this` — the current instance. `instanceof` checks whether `A.prototype` is in the object’s chain. `Object.create(null)` creates an object with no prototype at all: it lacks even `toString`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'super-this',
              prompt: {
                ru: 'Какой `this` получит метод родителя при вызове `super.render()` из метода наследника?',
                en: 'What `this` does the parent method get when called via `super.render()` from a subclass method?',
              },
              options: [
                { text: { ru: 'Прототип родителя', en: 'The parent’s prototype' } },
                { text: { ru: 'Текущий экземпляр наследника', en: 'The current subclass instance' } },
                { text: { ru: '`undefined`', en: '`undefined`' } },
              ],
              answer: 1,
              explanation: {
                ru: '`super` лишь указывает, где искать метод, а `this` остаётся прежним.',
                en: '`super` only says where to find the method; `this` stays the same.',
              },
            },
          },
        ],
        test: ['js-proto-002', 'js-proto-006'],
      },
    ],
    keyPoints: [
      { ru: 'Чтение — по цепочке, запись — в сам объект.', en: 'Reads walk the chain; writes go to the object.' },
      { ru: '`new` связывает объект с `F.prototype`.', en: '`new` links the object to `F.prototype`.' },
      { ru: 'Методы класса — в прототипе, поля — в экземпляре.', en: 'Class methods live on the prototype; fields on the instance.' },
      { ru: '`super.method()` сохраняет `this`.', en: '`super.method()` keeps `this`.' },
    ],
    sources: [
      { title: 'MDN — Inheritance and the prototype chain', url: `${MDN}/Inheritance_and_the_prototype_chain` },
      { title: 'MDN — new', url: `${MDN}/Reference/Operators/new` },
      { title: 'MDN — Classes', url: `${MDN}/Reference/Classes` },
    ],
  },  {
    tag: 'collections',
    format: 'steps',
    summary: {
      ru: '`Map`, `Set`, `WeakMap` и `WeakSet` закрывают задачи, для которых обычные объекты и массивы неудобны: ключи любого типа, уникальность, привязка данных к объектам без утечек памяти.',
      en: '`Map`, `Set`, `WeakMap` and `WeakSet` cover tasks that plain objects and arrays handle poorly: keys of any type, uniqueness, attaching data to objects without memory leaks.',
    },
    steps: [
      {
        id: 'map-vs-object',
        title: { ru: 'Map или объект', en: 'Map or object' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ключи обычного объекта — только строки и символы: число и строка `"1"` становятся одним ключом. `Map` хранит ключи **любого** типа без преобразования, включая объекты и функции, держит размер в `size`, перебирается в порядке вставки и не содержит унаследованных ключей вроде `toString`. Для словарей с произвольными ключами и частыми добавлениями `Map` удобнее объекта.',
              en: 'Plain object keys are only strings and symbols: a number and the string `"1"` become one key. `Map` stores keys of **any** type without conversion, objects and functions included, keeps its size in `size`, iterates in insertion order and has no inherited keys like `toString`. For dictionaries with arbitrary keys and frequent additions `Map` beats an object.',
            },
          },
        ],
        test: ['js-collections-003'],
      },
      {
        id: 'set',
        title: { ru: 'Set', en: 'Set' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`Set` хранит уникальные значения в порядке первого добавления. Сравнение — SameValueZero: `NaN` равен `NaN`, `1` и `"1"` разные, объекты — по ссылке. Конструктор принимает любой итерируемый объект — массив, строку (посимвольно), другой `Set`. Типовой приём: `[...new Set(items)]` убирает дубликаты примитивов за `O(n)`.',
              en: '`Set` stores unique values in first-insertion order. Comparison is SameValueZero: `NaN` equals `NaN`, `1` and `"1"` differ, objects compare by reference. The constructor takes any iterable — an array, a string (character by character), another `Set`. The standard trick: `[...new Set(items)]` removes primitive duplicates in `O(n)`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const tags = ['js', 'css', 'js'];\n[...new Set(tags)]; // ['js', 'css']\nnew Set('aab').size; // 2",
            },
          },
        ],
        test: ['js-collections-004', 'js-iterators-002'],
      },
      {
        id: 'weak',
        title: { ru: 'WeakMap и WeakSet', en: 'WeakMap and WeakSet' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`WeakMap` держит **ключи слабо**: запись не мешает [[garbage-collection|сборщику мусора]] удалить объект, и когда он больше нигде не нужен, запись пропадает. Ключи — только объекты (и незарегистрированные символы). Перебрать `WeakMap` нельзя и `size` у неё нет: содержимое зависит от сборщика. Подходит для кешей и данных, привязанных к DOM-узлам или объектам чужой библиотеки.',
              en: '`WeakMap` holds **keys weakly**: an entry doesn’t stop the [[garbage-collection|garbage collector]] from removing the object, and once it’s no longer needed elsewhere the entry disappears. Keys can only be objects (and non-registered symbols). You can’t iterate a `WeakMap` and it has no `size`: its contents depend on the collector. It suits caches and data attached to DOM nodes or third-party objects.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'weakmap-size',
              prompt: {
                ru: 'Почему у `WeakMap` нет `size` и её нельзя перебрать?',
                en: 'Why does `WeakMap` have no `size` and can’t be iterated?',
              },
              options: [
                { text: { ru: 'Записи могут исчезнуть в любой момент вместе с ключами', en: 'Entries can disappear at any moment along with their keys' } },
                { text: { ru: 'Это ошибка в стандарте', en: 'It’s a flaw in the standard' } },
                { text: { ru: 'Она хранит только одну запись', en: 'It holds only one entry' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Содержимое зависит от того, когда сработает сборщик мусора, поэтому его нельзя надёжно посчитать или перечислить.',
                en: 'Contents depend on when the garbage collector runs, so they can’t be reliably counted or listed.',
              },
            },
          },
        ],
        test: ['js-collections-002'],
      },
      {
        id: 'patterns',
        title: { ru: 'Паттерны на Map', en: 'Map patterns' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`Map` помнит порядок вставки — на этом строят **LRU-кеш**: при обращении ключ удаляют и вставляют заново, он становится самым свежим, а при переполнении вытесняют **первый** ключ — `map.keys().next().value`. Для мемоизации функции с несколькими аргументами нужен ключ, однозначно описывающий все аргументы: массив `args` новый при каждом вызове и по ссылке не совпадёт.',
              en: '`Map` remembers insertion order — that’s the basis of an **LRU cache**: on access the key is deleted and re-inserted, becoming the freshest, and on overflow the **first** key is evicted — `map.keys().next().value`. To memoize a function with several arguments you need a key that uniquely describes all of them: the `args` array is new on every call and won’t match by reference.',
            },
          },
        ],
        test: ['js-live-lru-001'],
      },
    ],
    keyPoints: [
      { ru: '`Map` — ключи любого типа и `size`.', en: '`Map` has keys of any type and `size`.' },
      { ru: '`Set` — уникальность по SameValueZero.', en: '`Set` gives uniqueness via SameValueZero.' },
      { ru: '`WeakMap` не удерживает ключи в памяти.', en: '`WeakMap` doesn’t keep keys alive.' },
      { ru: 'LRU — порядок вставки `Map`, вытеснять первый ключ.', en: 'LRU uses `Map` insertion order; evict the first key.' },
    ],
    sources: [
      { title: 'MDN — Map', url: `${MDN}/Reference/Global_Objects/Map` },
      { title: 'MDN — Set', url: `${MDN}/Reference/Global_Objects/Set` },
      { title: 'MDN — WeakMap', url: `${MDN}/Reference/Global_Objects/WeakMap` },
    ],
  },  {
    tag: 'iterators',
    format: 'steps',
    summary: {
      ru: 'Протокол итерации связывает `for...of`, спред, деструктуризацию и генераторы. Разберём, что делает объект итерируемым, чем итератор отличается от итерируемого и как работают ленивые генераторы.',
      en: 'The iteration protocol ties together `for...of`, spread, destructuring and generators. We’ll see what makes an object iterable, how an iterator differs from an iterable and how lazy generators work.',
    },
    steps: [
      {
        id: 'protocol',
        title: { ru: 'Протокол итерации', en: 'The iteration protocol' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Объект **итерируемый**, если у него есть метод `[Symbol.iterator]`, который возвращает **итератор** — объект с методом `next()`, отдающим `{ value, done }`. Итерируемы массивы, строки, `Map`, `Set`, `arguments`. Обычный объект — нет: его перебирают через `Object.keys`, `Object.values` или `Object.entries`. Своему объекту можно добавить итерацию, описав `[Symbol.iterator]`.',
              en: 'An object is **iterable** if it has a `[Symbol.iterator]` method returning an **iterator** — an object with a `next()` method that yields `{ value, done }`. Arrays, strings, `Map`, `Set` and `arguments` are iterable. A plain object isn’t: you walk it via `Object.keys`, `Object.values` or `Object.entries`. Your own object becomes iterable once you define `[Symbol.iterator]`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const countdown = {\n  *[Symbol.iterator]() {\n    yield 3; yield 2; yield 1;\n  },\n};\n[...countdown]; // [3, 2, 1]',
            },
          },
        ],
        test: ['js-iterators-003', 'js-iterators-007'],
      },
      {
        id: 'one-shot',
        title: { ru: 'Итератор одноразовый', en: 'An iterator is one-shot' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Итерируемый объект при каждом вызове `[Symbol.iterator]()` выдаёт **новый** итератор, поэтому массив можно обходить сколько угодно раз. Сам итератор хранит позицию и после конца отдаёт только `done: true`: второй спред того же итератора получит пустой результат. Генераторный объект — тоже итератор и тоже одноразовый.',
              en: 'An iterable returns a **new** iterator on every `[Symbol.iterator]()` call, so an array can be walked any number of times. The iterator itself keeps a position and after the end yields only `done: true`: a second spread of the same iterator gets nothing. A generator object is an iterator too, and also one-shot.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'reuse-generator',
              prompt: {
                ru: 'Генератор `ids()` вызвали один раз и сохранили в `gen`. Сколько элементов даст второй `[...gen]` после первого?',
                en: 'Generator `ids()` was called once and stored in `gen`. How many items does a second `[...gen]` give after the first?',
              },
              options: [
                { text: { ru: 'Столько же, сколько первый', en: 'As many as the first' } },
                { text: { ru: 'Ни одного', en: 'None' } },
                { text: { ru: 'Один', en: 'One' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Генераторный объект уже дошёл до конца. Чтобы пройти снова, нужно вызвать `ids()` ещё раз.',
                en: 'The generator object has already finished. To walk again, call `ids()` once more.',
              },
            },
          },
        ],
        test: ['js-iterators-005'],
      },
      {
        id: 'generators',
        title: { ru: 'Генераторы', en: 'Generators' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Функция-генератор `function*` при вызове ничего не выполняет, а возвращает итератор. Каждый `next()` запускает тело до следующего `yield` и приостанавливает его. Значение, переданное в `next(value)`, становится результатом выражения `yield`, на котором генератор стоял, — первый `next()` лишь доводит до первого `yield`. Генератор **ленивый**: значения считаются по запросу, поэтому бесконечный цикл внутри безопасен, а `break` в `for...of` закрывает генератор.',
              en: 'Calling a `function*` generator runs nothing; it returns an iterator. Each `next()` runs the body up to the next `yield` and pauses. A value passed to `next(value)` becomes the result of the `yield` expression the generator was paused on — the first `next()` only runs up to the first `yield`. A generator is **lazy**: values are computed on demand, so an infinite loop inside is safe, and `break` in `for...of` closes the generator.',
            },
          },
        ],
        test: ['js-iterators-001'],
      },
      {
        id: 'for-in-of',
        title: { ru: 'for...in и for...of', en: 'for...in and for...of' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`for...of` идёт по **значениям** через протокол итерации и работает с любым итерируемым объектом. `for...in` перебирает **ключи** — все перечисляемые строковые свойства, включая добавленные вручную и унаследованные из прототипа. Для массивов `for...in` даёт индексы-строки и лишние свойства, поэтому массивы обходят `for...of` или методами массива.',
              en: '`for...of` walks **values** via the iteration protocol and works with any iterable. `for...in` walks **keys** — all enumerable string properties, including manually added and inherited ones. For arrays `for...in` gives index strings and extra properties, so arrays are walked with `for...of` or array methods.',
            },
          },
        ],
        test: ['js-iterators-006'],
      },
    ],
    keyPoints: [
      { ru: 'Итерируемый = есть `[Symbol.iterator]`.', en: 'Iterable = has `[Symbol.iterator]`.' },
      { ru: 'Обычный объект не итерируем — `Object.entries`.', en: 'A plain object isn’t iterable — use `Object.entries`.' },
      { ru: 'Итератор и генераторный объект одноразовые.', en: 'Iterators and generator objects are one-shot.' },
      { ru: '`for...of` — значения, `for...in` — ключи.', en: '`for...of` gives values; `for...in` keys.' },
    ],
    sources: [
      { title: 'MDN — Iteration protocols', url: `${MDN}/Reference/Iteration_protocols` },
      { title: 'MDN — function*', url: `${MDN}/Reference/Statements/function*` },
      { title: 'MDN — for...of', url: `${MDN}/Reference/Statements/for...of` },
    ],
  },  {
    tag: 'promises',
    format: 'steps',
    summary: {
      ru: 'Промис — объект будущего результата. Разберём, когда выполняется его код, как устроены цепочки и обработка ошибок, чем отличаются `all`, `allSettled`, `race` и `any` и почему `forEach` не ждёт `await`.',
      en: 'A promise is an object for a future result. We’ll see when its code runs, how chains and error handling work, how `all`, `allSettled`, `race` and `any` differ and why `forEach` doesn’t wait for `await`.',
    },
    steps: [
      {
        id: 'executor',
        title: { ru: 'Исполнитель и then', en: 'The executor and then' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Функция-исполнитель в `new Promise((resolve, reject) => …)` вызывается **синхронно**, прямо при создании промиса. `resolve` не прерывает её: код после него тоже выполнится. Колбэки `.then` всегда асинхронны — встают в очередь микрозадач, даже если промис уже выполнен. Поэтому синхронный код после подписки отработает раньше колбэка.',
              en: 'The executor in `new Promise((resolve, reject) => …)` is called **synchronously**, right when the promise is created. `resolve` doesn’t stop it: code after it still runs. `.then` callbacks are always asynchronous — they join the microtask queue even if the promise is already resolved. So synchronous code after subscribing runs before the callback.',
            },
          },
        ],
        test: ['js-promises-004'],
      },
      {
        id: 'chaining',
        title: { ru: 'Цепочки и ошибки', en: 'Chains and errors' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Каждый `.then` возвращает **новый** промис со значением, которое вернул колбэк; если колбэк вернул промис, цепочка его дождётся. `throw` внутри колбэка отклоняет промис, и управление переходит к ближайшему `.catch`, пропуская промежуточные `.then`. `.catch` тоже возвращает новый промис: если он вернул значение, цепочка продолжается как успешная.',
              en: 'Each `.then` returns a **new** promise holding whatever the callback returned; if the callback returns a promise, the chain waits for it. A `throw` inside a callback rejects the promise, and control jumps to the nearest `.catch`, skipping the `.then`s in between. `.catch` also returns a new promise: if it returns a value, the chain continues as a success.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "fetchUser()\n  .then((user) => user.id)\n  .then(() => {\n    throw new Error('no access');\n  })\n  .catch(() => 'guest')\n  .then((name) => show(name));",
            },
          },
        ],
        test: ['js-promises-003'],
      },
      {
        id: 'combinators',
        title: { ru: 'all, allSettled, race, any', en: 'all, allSettled, race, any' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`Promise.all` ждёт все промисы и отклоняется сразу на **первой** ошибке, теряя остальные результаты. `allSettled` всегда выполняется и возвращает статус каждого: `fulfilled` с `value` или `rejected` с `reason`. `race` берёт исход первого завершившегося — успех или ошибку, на нём строят таймауты. `any` ждёт первого **успешного** и игнорирует ошибки, пока не упадут все.',
              en: '`Promise.all` waits for all promises and rejects at the **first** error, losing the other results. `allSettled` always fulfills and returns each one’s status: `fulfilled` with `value` or `rejected` with `reason`. `race` takes the outcome of the first to settle — success or error; timeouts are built on it. `any` waits for the first **success** and ignores errors until all fail.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'race-vs-any',
              prompt: {
                ru: 'Первым завершился промис с ошибкой, вторым — успешный. Что вернут `race` и `any`?',
                en: 'The first promise to settle rejects; the second fulfills. What do `race` and `any` return?',
              },
              options: [
                { text: { ru: '`race` — ошибку, `any` — успешный результат', en: '`race` the error, `any` the success' } },
                { text: { ru: 'Оба — успешный результат', en: 'Both the success' } },
                { text: { ru: 'Оба — ошибку', en: 'Both the error' } },
              ],
              answer: 0,
              explanation: {
                ru: '`race` берёт первый исход любого вида, `any` — первый успешный.',
                en: '`race` takes the first outcome of any kind; `any` the first success.',
              },
            },
          },
        ],
        test: ['js-promises-001', 'js-promises-002'],
      },
      {
        id: 'async-loops',
        title: { ru: 'await в циклах', en: 'await in loops' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`forEach`, `map` и `filter` не знают о промисах: они вызывают асинхронный колбэк и сразу идут дальше, не дожидаясь его. Код после цикла выполнится раньше колбэков. Последовательно ждать помогает `for...of` с `await` внутри, параллельно — `await Promise.all(items.map(async (item) => …))`.',
              en: '`forEach`, `map` and `filter` know nothing about promises: they call the async callback and move on without waiting. Code after the loop runs before the callbacks. Use `for...of` with `await` inside to wait sequentially, or `await Promise.all(items.map(async (item) => …))` to wait in parallel.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'for (const id of ids) {\n  await save(id); // one by one\n}\nawait Promise.all(\n  ids.map((id) => save(id)),\n); // in parallel',
            },
          },
        ],
        test: ['js-promises-005'],
      },
    ],
    keyPoints: [
      { ru: 'Исполнитель синхронный, `.then` — микрозадача.', en: 'The executor is synchronous; `.then` is a microtask.' },
      { ru: '`throw` в `.then` → ближайший `.catch`.', en: '`throw` in `.then` → the nearest `.catch`.' },
      { ru: '`all` падает на первой ошибке, `allSettled` — никогда.', en: '`all` fails at the first error; `allSettled` never fails.' },
      { ru: '`forEach` не ждёт `await`.', en: '`forEach` doesn’t wait for `await`.' },
    ],
    sources: [
      { title: 'MDN — Using promises', url: `${MDN}/Guide/Using_promises` },
      { title: 'MDN — Promise.allSettled()', url: `${MDN}/Reference/Global_Objects/Promise/allSettled` },
      { title: 'MDN — Promise.race()', url: `${MDN}/Reference/Global_Objects/Promise/race` },
    ],
  },  {
    tag: 'modules',
    format: 'steps',
    summary: {
      ru: 'ES-модули — стандартный способ делить код на файлы. Разберём их отличие от CommonJS, живые привязки, однократное выполнение, виды экспорта, динамический импорт и модульные скрипты в браузере.',
      en: 'ES modules are the standard way to split code into files. We’ll cover how they differ from CommonJS, live bindings, single evaluation, export kinds, dynamic import and module scripts in the browser.',
    },
    steps: [
      {
        id: 'esm-vs-cjs',
        title: { ru: 'ESM и CommonJS', en: 'ESM and CommonJS' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Объявления `import` и `export` **статичны**: их нельзя поставить в `if`, и граф зависимостей известен до выполнения кода. Поэтому сборщики умеют выкидывать неиспользуемые экспорты (tree shaking) и находить ошибки в именах заранее. `require` в CommonJS — обычный вызов функции во время выполнения: путь можно вычислить, но анализировать такой код сложнее.',
              en: '`import` and `export` declarations are **static**: they can’t go inside an `if`, and the dependency graph is known before the code runs. That’s why bundlers can drop unused exports (tree shaking) and catch name errors early. `require` in CommonJS is an ordinary function call at runtime: the path can be computed, but such code is harder to analyze.',
            },
          },
        ],
        test: ['js-modules-001'],
      },
      {
        id: 'bindings',
        title: { ru: 'Живые привязки и один экземпляр', en: 'Live bindings and one instance' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Импорт — **живая привязка** к переменной модуля, а не копия значения: если модуль поменял экспортированную `let`, импортёры увидят новое значение. Присвоить импорту новое значение снаружи нельзя. Модуль выполняется **один раз** при первом импорте, а результат кешируется: все импортёры получают один и тот же экземпляр. Поэтому состояние на уровне модуля общее для всего приложения.',
              en: 'An import is a **live binding** to the module’s variable, not a copy of its value: if the module changes an exported `let`, importers see the new value. You can’t assign to an import from outside. A module runs **once** on first import, and the result is cached: every importer gets the same instance. So module-level state is shared by the whole app.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'live-binding',
              prompt: {
                ru: 'Модуль экспортирует `let theme = \'light\'` и функцию, меняющую `theme`. Что увидит импортёр после вызова функции?',
                en: 'A module exports `let theme = \'light\'` and a function that changes `theme`. What does an importer see after calling it?',
              },
              options: [
                { text: { ru: 'Старое значение — импорт скопирован', en: 'The old value — the import was copied' } },
                { text: { ru: 'Новое значение — импорт живой', en: 'The new value — the import is live' } },
                { text: { ru: 'Ошибку', en: 'An error' } },
              ],
              answer: 1,
              explanation: {
                ru: 'ESM-импорт смотрит на саму переменную модуля, а не на её значение в момент импорта.',
                en: 'An ESM import looks at the module variable itself, not its value at import time.',
              },
            },
          },
        ],
        test: ['js-modules-002', 'js-modules-003'],
      },
      {
        id: 'exports',
        title: { ru: 'Экспорты и import()', en: 'Exports and import()' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Именованных экспортов в модуле может быть много, их импортируют по точному имени в фигурных скобках (переименовать можно через `as`). Экспорт по умолчанию — один, и имя при импорте выбирает потребитель. Динамический `import(\'./x.js\')` работает во время выполнения и возвращает **промис** с объектом модуля; сборщики выносят такой модуль в отдельный чанк и грузят его по требованию.',
              en: 'A module can have many named exports, imported by their exact names in braces (renamed with `as`). There’s one default export, and the importer picks its name. Dynamic `import(\'./x.js\')` works at runtime and returns a **promise** of the module object; bundlers split such a module into a separate chunk loaded on demand.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "button.onclick = async () => {\n  const { openEditor } =\n    await import('./editor.js');\n  openEditor();\n};",
            },
          },
        ],
        test: ['js-modules-005'],
      },
      {
        id: 'module-scripts',
        title: { ru: 'Модули в браузере', en: 'Modules in the browser' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`<script type="module">` загружается без блокировки разбора HTML и выполняется отложенно, как `defer`. Код модуля всегда в строгом режиме, у модуля своя область видимости: переменные верхнего уровня не попадают в `window`, а `this` на верхнем уровне — `undefined`. Модули загружаются по CORS и выполняются один раз, даже если подключены дважды.',
              en: '`<script type="module">` loads without blocking HTML parsing and runs deferred, like `defer`. Module code is always strict, and a module has its own scope: top-level variables don’t land on `window`, and top-level `this` is `undefined`. Modules load via CORS and run once even if included twice.',
            },
          },
        ],
        test: ['js-modules-006'],
      },
    ],
    keyPoints: [
      { ru: 'Статичный `import` даёт tree shaking.', en: 'Static `import` enables tree shaking.' },
      { ru: 'Импорт — живая привязка, модуль выполняется один раз.', en: 'An import is a live binding; a module runs once.' },
      { ru: '`import()` — промис и отдельный чанк.', en: '`import()` is a promise and a separate chunk.' },
      { ru: 'Модульный скрипт — `defer`, строгий режим, своя область.', en: 'A module script is `defer`, strict and scoped.' },
    ],
    sources: [
      { title: 'MDN — JavaScript modules', url: `${MDN}/Guide/Modules` },
      { title: 'MDN — import', url: `${MDN}/Reference/Statements/import` },
      { title: 'MDN — import()', url: `${MDN}/Reference/Operators/import` },
    ],
  },  {
    tag: 'live-coding',
    format: 'steps',
    summary: {
      ru: 'На лайвкодинге проверяют не знание наизусть, а то, как вы думаете: уточняете задачу, учитываете крайние случаи и проверяете решение на примерах. Разберём приёмы, которые помогают в типовых задачах.',
      en: 'Live coding tests not memorization but how you think: clarifying the task, handling edge cases and checking the solution on examples. We’ll go through techniques that help with typical tasks.',
    },
    steps: [
      {
        id: 'clarify',
        title: { ru: 'Уточнить и проверить на примерах', en: 'Clarify and test on examples' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Перед кодом уточняют задачу и выписывают примеры, включая крайние случаи: пустой ввод, один элемент, повторы, остаток при делении на части. Потом мысленно прогоняют решение по ним. Типичные ошибки ловятся именно так: счётчик без начального значения даёт `undefined + 1 = NaN`, а второй аргумент `slice` — индекс **конца**, а не длина куска.',
              en: 'Before coding, clarify the task and write out examples, edge cases included: empty input, one element, repeats, a remainder when splitting into parts. Then trace the solution through them. That’s exactly how typical bugs get caught: a counter without an initial value gives `undefined + 1 = NaN`, and `slice`’s second argument is the **end** index, not the chunk length.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: '[1, 2, 3, 4].slice(2, 2); // []\n[1, 2, 3, 4].slice(2, 4); // [3, 4]\nlet count;\ncount + 1; // NaN',
            },
          },
        ],
        test: ['js-live-count-by-001'],
      },
      {
        id: 'tools',
        title: { ru: 'Set, Map и чистые функции', en: 'Set, Map and pure functions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Половину задач решают правильные структуры: `Set` уже виденных ключей даёт проверку за `O(1)`, `Map` собирает группы и счётчики. Важно, что именно сохраняется: `map.set` на каждом шаге оставит **последний** элемент с ключом, а фильтр по `Set` — первый. Хорошая утилита не меняет входные данные: `pick` или `omit` возвращают новый объект, а не удаляют ключи из исходного.',
              en: 'Half the tasks are solved by the right structures: a `Set` of seen keys gives an `O(1)` check, a `Map` collects groups and counters. What gets kept matters: `map.set` on every step keeps the **last** item for a key, while a `Set` filter keeps the first. A good utility doesn’t mutate its input: `pick` or `omit` return a new object rather than deleting keys from the source.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'pure-utility',
              prompt: {
                ru: 'Утилита `omit(user, [\'password\'])` удаляет ключ через `delete user.password` и возвращает `user`. Чем это плохо?',
                en: 'A utility `omit(user, [\'password\'])` deletes the key with `delete user.password` and returns `user`. What’s wrong with that?',
              },
              options: [
                { text: { ru: 'Ничем, так быстрее', en: 'Nothing, it’s faster' } },
                { text: { ru: 'Она меняет исходный объект — побочный эффект для всех, у кого есть ссылка', en: 'It mutates the source object — a side effect for everyone holding a reference' } },
                { text: { ru: '`delete` не работает с объектами', en: '`delete` doesn’t work on objects' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Объект передаётся по ссылке, и его изменят для всего приложения. Правильнее собрать новый объект.',
                en: 'The object is passed by reference, so it changes for the whole app. Building a new object is correct.',
              },
            },
          },
        ],
        test: ['js-live-unique-by-001', 'js-live-pick-001'],
      },
      {
        id: 'stack',
        title: { ru: 'Задачи на стек', en: 'Stack tasks' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Задачи про вложенность — скобки, теги, пути — решаются стеком: открывающий элемент кладут, на закрывающем снимают верхний и сверяют пару. Частая ошибка — забыть проверку после цикла: стек обязан быть пуст, иначе часть открытых элементов так и не закрыли. Хорошо озвучить на собеседовании и сложность: `O(n)` по времени и памяти.',
              en: 'Nesting tasks — brackets, tags, paths — are solved with a stack: push an opening element, pop the top on a closing one and check the pair. A common bug is forgetting the check after the loop: the stack must be empty, or some opened elements were never closed. It’s good to state the complexity in the interview too: `O(n)` time and memory.',
            },
          },
        ],
        test: ['js-live-brackets-001'],
      },
      {
        id: 'async',
        title: { ru: 'Асинхронные утилиты', en: 'Async utilities' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Свой `Promise.all` — частая задача. Промисы завершаются в любом порядке, поэтому результат кладут по **индексу** исходного массива, а готовность считают отдельным счётчиком: `push` сложит в порядке завершения, а `results.length` обманет, если первым завершится последний. Пустой массив разрешают сразу. Таймаут для промиса собирают из `Promise.race` с промисом, который отклоняется по `setTimeout`.',
              en: 'Your own `Promise.all` is a common task. Promises settle in any order, so each result goes by the source array’s **index**, and readiness is tracked with a separate counter: `push` stores in settle order, and `results.length` lies if the last promise settles first. An empty array resolves immediately. A promise timeout is built from `Promise.race` with a promise that rejects on `setTimeout`.',
            },
          },
        ],
        test: ['js-live-promise-all-001'],
      },
    ],
    keyPoints: [
      { ru: 'Сначала примеры и крайние случаи, потом код.', en: 'Examples and edge cases first, then code.' },
      { ru: '`Set` и `Map` — проверка и группировка за `O(1)`.', en: '`Set` and `Map` give `O(1)` checks and grouping.' },
      { ru: 'Утилиты не меняют входные данные.', en: 'Utilities don’t mutate their input.' },
      { ru: 'Результаты асинхронных задач — по индексу.', en: 'Async results go by index.' },
    ],
    sources: [
      { title: 'MDN — Array.prototype.slice()', url: `${MDN}/Reference/Global_Objects/Array/slice` },
      { title: 'MDN — Promise.all()', url: `${MDN}/Reference/Global_Objects/Promise/all` },
      { title: 'MDN — Set', url: `${MDN}/Reference/Global_Objects/Set` },
    ],
  },
];
