import type { Lesson } from '../model/types';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';

export const TYPESCRIPT_LESSONS: Lesson[] = [
  {
    tag: 'any-unknown-never',
    format: 'steps',
    summary: {
      ru: '`any` отключает проверку типов, `unknown` — безопасное «что угодно», `never` — значение, которого не бывает. Разберём, когда какой тип появляется и как с ним работать.',
      en: '`any` turns type checking off, `unknown` is a safe “anything”, `never` is a value that can’t exist. Let’s see when each one appears and how to work with it.',
    },
    steps: [
      {
        id: 'any-vs-unknown',
        title: { ru: 'any и unknown', en: 'any and unknown' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В переменную типа `any` можно положить что угодно и делать с ней что угодно: компилятор молчит, а ошибка всплывёт в рантайме. Хуже того, `any` расползается — его можно присвоить в любой тип. `unknown` тоже принимает любое значение, но **использовать** его нельзя: ни вызвать метод, ни прочитать поле, ни передать туда, где ждут `string`. Сначала тип нужно сузить проверкой. `JSON.parse` возвращает `any`, поэтому результат лучше сразу объявить `unknown`.',
              en: 'A variable of type `any` accepts anything and allows anything: the compiler stays silent and the error surfaces at runtime. Worse, `any` spreads — it can be assigned to any type. `unknown` also accepts any value, but you can’t **use** it: no method calls, no property reads, no passing it where a `string` is expected. First the type must be narrowed by a check. `JSON.parse` returns `any`, so declare its result as `unknown` right away.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "const a: any = 'text';\na.toFixed(2); // compiles, crashes\n\nconst u: unknown = 'text';\nu.toFixed(2); // error",
            },
          },
          { type: 'illustration', illustration: 'ts-type-sets' },
        ],
        test: ['ts-unknown-001', 'ts-unknown-003'],
      },
      {
        id: 'narrow-unknown',
        title: { ru: 'Как сузить unknown', en: 'Narrowing unknown' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Проверка `typeof data === \'object\' && data !== null` сужает `unknown` только до `object` — о его полях компилятор ничего не знает, и `data.id` всё ещё ошибка. Дальше нужен оператор `in`, [[type-guard|type guard]] или схема (zod). В JavaScript бросить можно что угодно, не только `Error`, поэтому при `strict` переменная в `catch` тоже имеет тип `unknown` — её проверяют через `instanceof Error`.',
              en: 'The check `typeof data === \'object\' && data !== null` narrows `unknown` only to `object` — the compiler knows nothing about its properties, so `data.id` is still an error. Next you need the `in` operator, a [[type-guard|type guard]] or a schema (zod). JavaScript can throw anything, not only an `Error`, so under `strict` the `catch` variable is `unknown` too — check it with `instanceof Error`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "function readId(data: unknown) {\n  if (\n    typeof data === 'object' &&\n    data !== null &&\n    'id' in data\n  ) {\n    return data.id; // unknown\n  }\n}",
            },
          },
        ],
        test: ['ts-unknown-bug-001', 'ts-unknown-002'],
      },
      {
        id: 'never',
        title: { ru: 'never — значения не бывает', en: 'never — no value at all' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`never` — тип без единого значения. Его возвращает функция, которая никогда не завершается нормально: всегда бросает исключение или зацикливается. В объединении `never` исчезает: `number | never` — это просто `number`. Тонкость вывода: стрелочная функция или function expression, которая только бросает, получает возвращаемый тип `never`, а **объявление** `function` без аннотации — `void`. Чтобы получить `never`, тип пишут явно: `function fail(): never`.',
              en: '`never` is a type with no values at all. It’s returned by a function that never completes normally: it always throws or loops forever. In a union `never` disappears: `number | never` is just `number`. An inference subtlety: an arrow function or function expression that only throws gets the return type `never`, while a function **declaration** without an annotation gets `void`. To get `never`, write the type explicitly: `function fail(): never`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'never-in-union',
              prompt: {
                ru: 'Во что превращается тип `number | never`?',
                en: 'What does the type `number | never` become?',
              },
              options: [
                { text: { ru: '`never`', en: '`never`' } },
                { text: { ru: '`number`', en: '`number`' } },
                { text: { ru: '`unknown`', en: '`unknown`' } },
              ],
              answer: 1,
              explanation: {
                ru: '`never` — пустое множество значений, и в объединении оно ничего не добавляет.',
                en: '`never` is an empty set of values, so it adds nothing to a union.',
              },
            },
          },
        ],
        test: ['ts-never-003'],
      },
      {
        id: 'exhaustive',
        title: { ru: 'Проверка полноты', en: 'Exhaustiveness checks' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Каждая проверка отсекает вариант объединения. Когда разобраны все, остаётся `never` — и это можно превратить в проверку: присвоить остаток переменной типа `never`. Если позже в объединение добавят новый вариант и забудут его обработать, остаток уже не будет `never`, и присваивание даст ошибку компиляции прямо в нужном месте.',
              en: 'Each check removes a member of the union. Once all are handled, `never` remains — and you can turn that into a check: assign the remainder to a variable of type `never`. If a new member is later added to the union and nobody handles it, the remainder is no longer `never`, and the assignment fails to compile right where it matters.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "type Status = 'idle' | 'done';\nfunction label(status: Status) {\n  if (status === 'idle') return 'Wait';\n  if (status === 'done') return 'OK';\n  const rest: never = status;\n  return rest;\n}",
            },
          },
        ],
        test: ['ts-never-002'],
      },
    ],
    keyPoints: [
      { ru: '`any` выключает проверки и расползается.', en: '`any` disables checks and spreads.' },
      { ru: '`unknown` — сначала сузить, потом использовать.', en: '`unknown` — narrow first, then use.' },
      { ru: 'Переменная `catch` при `strict` — `unknown`.', en: 'Under `strict` a `catch` variable is `unknown`.' },
      { ru: '`never` исчезает в объединении и ловит необработанные варианты.', en: '`never` vanishes in unions and catches unhandled cases.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Everyday Types: any', url: `${HANDBOOK}/2/everyday-types.html#any` },
      { title: 'TypeScript Handbook — unknown', url: `${HANDBOOK}/2/functions.html#unknown` },
      { title: 'TypeScript Handbook — The never type', url: `${HANDBOOK}/2/narrowing.html#the-never-type` },
    ],
  },
  {
    tag: 'narrowing',
    format: 'steps',
    summary: {
      ru: '[[type-narrowing|Сужение]] — как TypeScript уточняет тип внутри ветки после проверки. Это основной способ работать с объединениями без `as` и лишних проверок.',
      en: '[[type-narrowing|Narrowing]] is how TypeScript refines a type inside a branch after a check. It’s the main way to work with unions without `as` or extra checks.',
    },
    steps: [
      {
        id: 'typeof',
        title: { ru: 'typeof и strictNullChecks', en: 'typeof and strictNullChecks' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'После `if (typeof value === \'string\')` внутри ветки остаётся только `string`, а после ветки с ранним `return` — остальные варианты. Компилятор знает причуды JavaScript: `typeof null === \'object\'`, поэтому проверка на `\'object\'` оставляет в объединении и `null`. При `strictNullChecks` (входит в `strict`) `null` и `undefined` — отдельные типы: необязательный параметр `text?: string` — это `string | undefined`, и читать `text.length` без проверки нельзя.',
              en: 'After `if (typeof value === \'string\')` only `string` remains inside the branch, and after a branch with an early `return` — the other members. The compiler knows JavaScript quirks: `typeof null === \'object\'`, so a check for `\'object\'` keeps `null` in the union too. With `strictNullChecks` (part of `strict`) `null` and `undefined` are separate types: an optional parameter `text?: string` is `string | undefined`, and reading `text.length` without a check is an error.',
            },
          },
          { type: 'diagram', diagram: 'ts-narrowing-flow' },
        ],
        test: ['ts-narrowing-001', 'ts-strict-null-001'],
      },
      {
        id: 'null-checks',
        title: { ru: 'null и undefined', en: 'null and undefined' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`null` и `undefined` — разные значения. Проверка `!== undefined` оставляет в типе `null`, а `!== null` — `undefined`. Нестрогое сравнение `!= null` убирает оба сразу — это единственное место, где `!=` полезен. Проверка на истинность `if (value)` тоже сужает, но отсекает заодно `\'\'`, `0` и `NaN` — для чисел и строк это часто ошибка.',
              en: '`null` and `undefined` are different values. A `!== undefined` check leaves `null` in the type, and `!== null` leaves `undefined`. The loose comparison `!= null` removes both at once — the one place where `!=` is useful. A truthiness check `if (value)` also narrows but drops `\'\'`, `0` and `NaN` too — often a bug for numbers and strings.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Text = string | null | undefined;\nfunction size(text: Text) {\n  if (text != null) {\n    return text.length; // string\n  }\n  return 0;\n}',
            },
          },
          {
            type: 'check',
            check: {
              id: 'truthy-zero',
              prompt: {
                ru: 'Чем опасна проверка `if (count)` для `count: number | null`?',
                en: 'What’s risky about `if (count)` for `count: number | null`?',
              },
              options: [
                { text: { ru: 'Она отсечёт и `0`', en: 'It also drops `0`' } },
                { text: { ru: 'Ничем', en: 'Nothing' } },
                { text: { ru: 'Она не уберёт `null`', en: 'It doesn’t remove `null`' } },
              ],
              answer: 0,
              explanation: {
                ru: '`0` — ложное значение, поэтому ноль попадёт в ветку «нет данных». Надёжнее `count !== null`.',
                en: '`0` is falsy, so zero lands in the “no data” branch. `count !== null` is safer.',
              },
            },
          },
        ],
        test: ['ts-narrowing-bug-001'],
      },
      {
        id: 'in-discriminated',
        title: { ru: 'in и размеченные объединения', en: '`in` and discriminated unions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Оператор `in` сужает объединение объектов: в ветке `\'swim\' in animal` остаются варианты, у которых такое свойство есть. Надёжнее **размеченное объединение**: у всех вариантов общее поле-литерал (`kind`, `type`, `state`), и проверка этого поля сужает объект до одного варианта — внутри ветки доступны его собственные поля без `as`.',
              en: 'The `in` operator narrows a union of objects: in the `\'swim\' in animal` branch only the members with that property remain. A **discriminated union** is more robust: every member shares a literal field (`kind`, `type`, `state`), and checking it narrows the object to one member — its own fields are available inside the branch without `as`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "type Load =\n  | { state: 'ok'; data: string[] }\n  | { state: 'fail'; reason: string };\nfunction view(load: Load) {\n  if (load.state === 'fail') {\n    return load.reason;\n  }\n  return load.data.join(', ');\n}",
            },
          },
        ],
        test: ['ts-narrowing-002', 'ts-narrowing-005'],
      },
      {
        id: 'type-guards',
        title: { ru: 'Свои проверки типов', en: 'Custom type guards' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Функция с возвращаемым типом `value is number` — **предикат типа**: если она вернула `true`, аргумент считается `number`. У `filter` есть перегрузка для предикатов, поэтому `filter(isNum)` даёт `number[]`. С TypeScript 5.5 простой стрелочный колбэк вроде `x => x !== null` сам выводится как предикат. **Функция-утверждение** с `asserts value is string` ничего не возвращает: если она не бросила исключение, тип сужен до конца блока — без `if`.',
              en: 'A function returning `value is number` is a **type predicate**: if it returns `true`, the argument is treated as `number`. `filter` has an overload for predicates, so `filter(isNum)` gives `number[]`. Since TypeScript 5.5 a simple arrow callback like `x => x !== null` is inferred as a predicate by itself. An **assertion function** with `asserts value is string` returns nothing: if it didn’t throw, the type is narrowed to the end of the block — no `if` needed.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "function isNum(\n  value: unknown,\n): value is number {\n  return typeof value === 'number';\n}\nfunction assertString(\n  value: unknown,\n): asserts value is string {\n  if (typeof value !== 'string') {\n    throw new TypeError('not a string');\n  }\n}",
            },
          },
        ],
        test: ['ts-narrowing-003', 'ts-narrowing-007'],
      },
      {
        id: 'switch-never',
        title: { ru: 'switch по дискриминанту', en: 'switch on the discriminant' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`switch` по полю-дискриминанту сужает так же, как цепочка `if`: каждый `case` отсекает свой вариант. Когда все варианты разобраны, в ветке `default` не остаётся ничего — тип `never`. Если там написать `const rest: never = shape`, то новый вариант, добавленный в объединение и забытый в `switch`, сразу даст ошибку компиляции.',
              en: 'A `switch` on the discriminant narrows just like an `if` chain: each `case` removes its member. Once all members are handled, nothing remains in `default` — the type is `never`. If you write `const rest: never = shape` there, a new member added to the union and forgotten in the `switch` immediately causes a compile error.',
            },
          },
        ],
        test: ['ts-narrowing-008'],
      },
    ],
    keyPoints: [
      { ru: 'Ранний `return` сужает тип до конца функции.', en: 'An early `return` narrows the type for the rest of the function.' },
      { ru: '`!= null` убирает и `null`, и `undefined`.', en: '`!= null` removes both `null` and `undefined`.' },
      { ru: 'Размеченное объединение — общее поле-литерал.', en: 'A discriminated union shares a literal field.' },
      { ru: '`value is T` и `asserts value is T` — свои проверки.', en: '`value is T` and `asserts value is T` are custom guards.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Narrowing', url: `${HANDBOOK}/2/narrowing.html` },
      { title: 'TypeScript Handbook — Discriminated unions', url: `${HANDBOOK}/2/narrowing.html#discriminated-unions` },
      { title: 'TypeScript Handbook — Using type predicates', url: `${HANDBOOK}/2/narrowing.html#using-type-predicates` },
      { title: 'TypeScript 5.5 — Inferred type predicates', url: `${HANDBOOK}/release-notes/typescript-5-5.html#inferred-type-predicates` },
    ],
  },
  {
    tag: 'generics',
    format: 'steps',
    summary: {
      ru: 'Обобщения (generics) — параметры для типов: одна функция работает с разными типами и не теряет связь между входом и выходом. Главное — понимать, как TypeScript выводит параметр типа.',
      en: 'Generics are parameters for types: one function works with different types without losing the link between input and output. The key is understanding how TypeScript infers a type parameter.',
    },
    steps: [
      {
        id: 'type-params',
        title: { ru: 'Параметр типа', en: 'A type parameter' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Параметр типа `<T>` — переменная, которую TypeScript подставляет при каждом вызове. Обычно `T` **выводится** из аргументов: для массива `[1, \'a\']` тип элементов — объединение `string | number`, и именно оно станет `T`. Типы не знают, какой элемент первый. Параметр можно передать и явно в угловых скобках — тогда вывода нет: так задают тип «на будущее», когда начальное значение пустое.',
              en: 'A type parameter `<T>` is a variable TypeScript fills in on every call. Usually `T` is **inferred** from the arguments: for the array `[1, \'a\']` the element type is the union `string | number`, and that becomes `T`. Types don’t know which element comes first. You can also pass the parameter explicitly in angle brackets — then there’s no inference: that’s how you set a type “for later” when the initial value is empty.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'function last<T>(items: T[]): T {\n  return items[items.length - 1];\n}\nlast([1, 2]); // T = number\nlast<string | null>([]); // explicit',
            },
          },
        ],
        test: ['ts-generics-008', 'ts-generics-006'],
      },
      {
        id: 'constraints',
        title: { ru: 'Ограничения extends', en: 'extends constraints' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`T extends { id: number }` ограничивает параметр: внутри функции можно читать `.id`, а вызов с типом без такого поля не скомпилируется. Если два параметра функции имеют один тип `T`, TypeScript ищет общий тип для всех кандидатов. Когда «лучшего» общего типа нет — например, `number[]` и `string`, — он берёт первый кандидат, и второй аргумент получает ошибку.',
              en: '`T extends { id: number }` constrains the parameter: inside the function you can read `.id`, and a call with a type lacking that field won’t compile. If two parameters share one type `T`, TypeScript looks for a common type across all candidates. When there’s no “best” common type — say, `number[]` and `string` — it takes the first candidate, and the second argument gets an error.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'function byId<T extends { id: number }>(\n  items: T[],\n  id: number,\n) {\n  return items.find(\n    (item) => item.id === id,\n  );\n}',
            },
          },
          {
            type: 'check',
            check: {
              id: 'constraint-meaning',
              prompt: {
                ru: 'Что даёт `T extends { id: number }` в объявлении функции?',
                en: 'What does `T extends { id: number }` give a function declaration?',
              },
              options: [
                { text: { ru: 'Внутри можно читать `.id`, а без поля `id` вызов не скомпилируется', en: 'You can read `.id` inside, and a call without an `id` field won’t compile' } },
                { text: { ru: '`T` всегда равен `{ id: number }`', en: '`T` always equals `{ id: number }`' } },
                { text: { ru: 'Проверку поля в рантайме', en: 'A runtime check of the field' } },
              ],
              answer: 0,
              explanation: {
                ru: '`T` по-прежнему выводится из аргумента и может содержать другие поля — ограничение лишь гарантирует наличие `id`.',
                en: '`T` is still inferred from the argument and may have other fields — the constraint only guarantees `id`.',
              },
            },
          },
        ],
        test: ['ts-generics-002'],
      },
      {
        id: 'literal-inference',
        title: { ru: 'Когда литерал расширяется', en: 'When a literal widens' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Для аргумента `\'hi\'` первый кандидат в `T` — литерал `"hi"`. Он сохраняется, если `T` стоит на верхнем уровне возвращаемого типа (функция возвращает сам `T`) или ограничен примитивом (`T extends string`). Если же `T` спрятан внутрь — например, функция возвращает `{ value }`, — литерал **расширяется** до `string`: поле объекта можно изменить, и узкий тип мешал бы.',
              en: 'For the argument `\'hi\'` the first candidate for `T` is the literal `"hi"`. It’s kept if `T` sits at the top level of the return type (the function returns `T` itself) or is constrained to a primitive (`T extends string`). But if `T` is tucked inside — say, the function returns `{ value }` — the literal **widens** to `string`: an object field can change, and a narrow type would get in the way.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "function same<T>(value: T) {\n  return value;\n}\nconst s = same('hi'); // \"hi\"",
            },
          },
        ],
        test: ['ts-generics-003'],
      },
      {
        id: 'const-params',
        title: { ru: 'const-параметры типа', en: 'const type parameters' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Модификатор `const` у параметра типа (TypeScript 5.0) просит выводить `T` так, будто аргумент записан с `as const`: литералы сохраняются, а массив становится кортежем. Чтобы массив превратился именно в кортеж только для чтения, ограничение тоже должно быть `readonly`: `const T extends readonly unknown[]`. Тогда `T[0]` — литерал первого элемента, а не объединение.',
              en: 'The `const` modifier on a type parameter (TypeScript 5.0) asks to infer `T` as if the argument were written with `as const`: literals are kept and an array becomes a tuple. For the array to become a readonly tuple, the constraint must be `readonly` too: `const T extends readonly unknown[]`. Then `T[0]` is the first element’s literal, not a union.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "declare function keys<\n  const T extends readonly string[],\n>(list: T): T;\n\nconst k = keys(['a', 'b']);\n// readonly [\"a\", \"b\"]",
            },
          },
        ],
        test: ['ts-generics-005'],
      },
    ],
    keyPoints: [
      { ru: '`T` выводится из аргументов или передаётся явно.', en: '`T` is inferred from arguments or passed explicitly.' },
      { ru: '`extends` — ограничение, а не равенство.', en: '`extends` is a constraint, not equality.' },
      { ru: 'Литерал внутри объекта расширяется.', en: 'A literal inside an object widens.' },
      { ru: '`const T` — вывод как с `as const`.', en: '`const T` infers as with `as const`.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Generics', url: `${HANDBOOK}/2/generics.html` },
      { title: 'TypeScript 5.0 — const type parameters', url: `${HANDBOOK}/release-notes/typescript-5-0.html#const-type-parameters` },
    ],
  },
  {
    tag: 'utility-types',
    format: 'steps',
    summary: {
      ru: 'Встроенные утилиты строят новые типы из существующих: выбрать поля, сделать их необязательными, достать результат функции. Это избавляет от копий описаний, которые расходятся со временем.',
      en: 'Built-in utilities build new types from existing ones: pick fields, make them optional, extract a function’s result. That saves you from copied descriptions that drift apart over time.',
    },
    steps: [
      {
        id: 'pick-omit',
        title: { ru: 'Pick, Omit и Partial', en: 'Pick, Omit and Partial' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`Pick<T, K>` оставляет только перечисленные ключи, `Omit<T, K>` — все, кроме них. `Partial<T>` делает все поля необязательными: удобно для патча, где можно прислать любое подмножество полей. Утилиты комбинируются: сначала выбрать поля, потом сделать их необязательными. Нюанс: `Omit` не проверяет, что убираемый ключ существует, — опечатку он молча пропустит.',
              en: '`Pick<T, K>` keeps only the listed keys, `Omit<T, K>` keeps all but them. `Partial<T>` makes every field optional: handy for a patch where any subset of fields may be sent. Utilities combine: first pick fields, then make them optional. A nuance: `Omit` doesn’t check that the key being removed exists — it silently lets a typo through.',
            },
          },
          { type: 'illustration', illustration: 'ts-utility-fields' },
          {
            type: 'check',
            check: {
              id: 'partial-meaning',
              prompt: {
                ru: 'Чем `Partial<User>` отличается от `User`?',
                en: 'How does `Partial<User>` differ from `User`?',
              },
              options: [
                { text: { ru: 'Все поля стали необязательными', en: 'All fields became optional' } },
                { text: { ru: 'Все поля стали `readonly`', en: 'All fields became `readonly`' } },
                { text: { ru: 'Все поля могут быть `null`', en: 'All fields may be `null`' } },
              ],
              answer: 0,
              explanation: {
                ru: '`Partial` добавляет `?` к каждому полю. За `readonly` отвечает `Readonly`, а `null` нужно добавлять отдельно.',
                en: '`Partial` adds `?` to every field. `Readonly` handles `readonly`, and `null` must be added separately.',
              },
            },
          },
        ],
        test: ['ts-utility-001', 'ts-utility-002'],
      },
      {
        id: 'required-readonly',
        title: { ru: 'Required и Readonly', en: 'Required and Readonly' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`Required<T>` — противоположность `Partial`: все поля становятся обязательными. `Readonly<T>` запрещает присваивать полям новые значения — попытка даст ошибку компиляции. Это проверка только на этапе компиляции: в JavaScript объект остаётся изменяемым, и для настоящей заморозки нужен `Object.freeze`. Утилиты вкладываются: `Readonly<Required<T>>` — все поля есть и неизменны.',
              en: '`Required<T>` is the opposite of `Partial`: every field becomes required. `Readonly<T>` forbids assigning new values to fields — an attempt is a compile error. This is a compile-time check only: in JavaScript the object stays mutable, and real freezing needs `Object.freeze`. Utilities nest: `Readonly<Required<T>>` means every field is present and immutable.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Draft = { title?: string };\ntype Final = Required<Draft>;\n// { title: string }',
            },
          },
        ],
        test: ['ts-utility-005'],
      },
      {
        id: 'record',
        title: { ru: 'Record', en: 'Record' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`Record<K, V>` — объект, где **каждый** ключ из `K` обязателен и имеет значение типа `V`. С объединением литералов это проверка полноты: добавили новый вариант в `K` — компилятор покажет все объекты, где для него забыли значение. С `Record<string, V>` ключи произвольные, и такой проверки уже нет.',
              en: '`Record<K, V>` is an object where **every** key from `K` is required and holds a value of type `V`. With a union of literals that’s an exhaustiveness check: add a new member to `K` and the compiler points to every object that forgot a value for it. With `Record<string, V>` keys are arbitrary, and that check is gone.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "type Level = 'info' | 'error';\nconst colors: Record<Level, string> = {\n  info: 'blue',\n  error: 'red',\n};",
            },
          },
        ],
        test: ['ts-utility-003'],
      },
      {
        id: 'from-functions',
        title: { ru: 'Типы из функций', en: 'Types from functions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`ReturnType<F>` достаёт возвращаемый тип функции, `Parameters<F>` — кортеж типов её параметров (`Parameters<F>[1]` — второй). Им передают тип функции: `typeof fn`. У async-функции результат — `Promise<…>`, и его разворачивает `Awaited`, как `await`, в том числе вложенные промисы. Так тип выводят из реализации или достают неэкспортированный тип опций библиотеки.',
              en: '`ReturnType<F>` extracts a function’s return type, `Parameters<F>` a tuple of its parameter types (`Parameters<F>[1]` is the second). They take a function type: `typeof fn`. An async function returns `Promise<…>`, which `Awaited` unwraps like `await`, nested promises included. This is how you derive a type from an implementation or get a library’s unexported options type.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'function makeUser(name: string) {\n  return { name, created: new Date() };\n}\ntype User =\n  ReturnType<typeof makeUser>;',
            },
          },
        ],
        test: ['ts-utility-004', 'ts-utility-008'],
      },
      {
        id: 'extract-exclude',
        title: { ru: 'Extract и Exclude', en: 'Extract and Exclude' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Эти утилиты работают с объединениями. `Exclude<T, U>` убирает из `T` всё, что можно присвоить в `U`; `Extract<T, U>` — наоборот, оставляет только такие члены. Для размеченного объединения `Extract<Shape, { kind: \'circle\' }>` возвращает вариант целиком — со всеми его полями, а не только с `kind`.',
              en: 'These utilities work on unions. `Exclude<T, U>` removes from `T` everything assignable to `U`; `Extract<T, U>`, conversely, keeps only those members. For a discriminated union `Extract<Shape, { kind: \'circle\' }>` returns the whole member — with all its fields, not just `kind`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "type UiEvent =\n  | { type: 'click'; x: number }\n  | { type: 'key'; code: string };\ntype Click = Extract<\n  UiEvent,\n  { type: 'click' }\n>;",
            },
          },
        ],
        test: ['ts-utility-010'],
      },
    ],
    keyPoints: [
      { ru: '`Pick`/`Omit` выбирают поля, `Partial`/`Required` меняют обязательность.', en: '`Pick`/`Omit` select fields; `Partial`/`Required` change optionality.' },
      { ru: '`Readonly` — только проверка компилятора.', en: '`Readonly` is a compile-time check only.' },
      { ru: '`Record` с union-ключами — проверка полноты.', en: '`Record` with union keys is an exhaustiveness check.' },
      { ru: '`Awaited<ReturnType<typeof fn>>` — результат async-функции.', en: '`Awaited<ReturnType<typeof fn>>` is an async function’s result.' },
    ],
    sources: [{ title: 'TypeScript Handbook — Utility Types', url: `${HANDBOOK}/utility-types.html` }],
  },
  {
    tag: 'conditional-types',
    format: 'steps',
    summary: {
      ru: 'Условные типы — `if` на уровне типов: `T extends U ? X : Y`. Вместе с `infer` они достают части типов, а дистрибутивность по объединениям объясняет многие неожиданные результаты.',
      en: 'Conditional types are an `if` at the type level: `T extends U ? X : Y`. Together with `infer` they extract parts of types, and distribution over unions explains many surprising results.',
    },
    steps: [
      {
        id: 'basics',
        title: { ru: 'T extends U ? X : Y', en: 'T extends U ? X : Y' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Условный тип выбирает ветку по проверке присваиваемости: если `T` можно присвоить в `U`, результат — `X`, иначе — `Y`. На этом построены встроенные утилиты: `Exclude<T, U>` — это `T extends U ? never : T`, он убирает из объединения всё, что подходит под `U`, а `Extract` — наоборот, оставляет. Член `U`, которого нет в `T`, ни на что не влияет.',
              en: 'A conditional type picks a branch by an assignability check: if `T` is assignable to `U`, the result is `X`, otherwise `Y`. Built-in utilities rest on this: `Exclude<T, U>` is `T extends U ? never : T`, removing from a union everything that fits `U`, and `Extract` does the opposite. A member of `U` that isn’t in `T` has no effect.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type IsArray<T> = T extends unknown[]\n  ? true\n  : false;\ntype A = IsArray<string[]>; // true',
            },
          },
        ],
        test: ['ts-utility-006'],
      },
      {
        id: 'infer',
        title: { ru: 'infer', en: 'infer' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`infer X` объявляет переменную типа прямо внутри условия. Если `T` подходит под шаблон, TypeScript выводит `X` из реального типа — так достают первый аргумент функции, тип элемента массива или значение промиса. Так устроены `ReturnType`, `Parameters` и `Awaited`. Если `T` под шаблон не подходит, срабатывает ветка «иначе» — часто это `never`.',
              en: '`infer X` declares a type variable right inside the condition. If `T` matches the pattern, TypeScript infers `X` from the actual type — that’s how you extract a function’s first argument, an array’s element type or a promise’s value. `ReturnType`, `Parameters` and `Awaited` work this way. If `T` doesn’t match, the “else” branch applies — often `never`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Head<T> =\n  T extends [infer H, ...unknown[]]\n    ? H\n    : never;\ntype A = Head<[string, number]>;\n// string',
            },
          },
          {
            type: 'check',
            check: {
              id: 'infer-where',
              prompt: {
                ru: 'Где можно писать `infer`?',
                en: 'Where can you write `infer`?',
              },
              options: [
                { text: { ru: 'Только в части `extends` условного типа', en: 'Only in the `extends` part of a conditional type' } },
                { text: { ru: 'В любом месте типа', en: 'Anywhere in a type' } },
                { text: { ru: 'В параметрах функции', en: 'In function parameters' } },
              ],
              answer: 0,
              explanation: {
                ru: '`infer` объявляет переменную в шаблоне проверки, и она доступна в ветке «да».',
                en: '`infer` declares a variable in the check’s pattern, available in the “true” branch.',
              },
            },
          },
        ],
        test: ['ts-conditional-002'],
      },
      {
        id: 'distributive',
        title: { ru: 'Дистрибутивность', en: 'Distribution' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Если проверяется «голый» параметр типа (`T extends …`), условный тип [[distributive|дистрибутивен]]: для объединения он применяется к каждому члену отдельно, а результаты склеиваются обратно в объединение. Ветка `never` при склейке исчезает — так работает фильтрация. `never` — пустое объединение: распределять нечего, и результат тоже `never`, какой бы ни была ветка.',
              en: 'If a “naked” type parameter is checked (`T extends …`), the conditional type is [[distributive|distributive]]: for a union it’s applied to each member separately, and the results are joined back into a union. A `never` branch disappears when joining — that’s how filtering works. `never` is an empty union: there’s nothing to distribute, so the result is `never` too, whatever the branch.',
            },
          },
          { type: 'diagram', diagram: 'ts-distribution' },
        ],
        test: ['ts-conditional-001', 'ts-conditional-004'],
      },
      {
        id: 'no-distribution',
        title: { ru: 'Как отключить распределение', en: 'Turning distribution off' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Иногда объединение нужно проверить целиком. Для этого обе стороны оборачивают в кортеж: `[T] extends [U]`. Параметр уже не «голый», и распределения нет: объединение `number | null` проверяется как единый тип и подтипом `number` не является, хотя один его член подходит. Литерал `42` при этом подтип `number`, и проверка проходит.',
              en: 'Sometimes a union must be checked as a whole. To do that, wrap both sides in a tuple: `[T] extends [U]`. The parameter is no longer “naked”, so there’s no distribution: the union `number | null` is checked as one type and isn’t a subtype of `number`, even though one member fits. The literal `42`, meanwhile, is a subtype of `number`, and the check passes.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Whole<T> = [T] extends [unknown]\n  ? T[]\n  : never;\n// Whole<1 | 2> = (1 | 2)[]',
            },
          },
        ],
        test: ['ts-conditional-003'],
      },
    ],
    keyPoints: [
      { ru: '`Exclude` и `Extract` — условные типы.', en: '`Exclude` and `Extract` are conditional types.' },
      { ru: '`infer` достаёт часть типа по шаблону.', en: '`infer` extracts part of a type by pattern.' },
      { ru: '«Голый» `T` распределяется по объединению.', en: 'A “naked” `T` distributes over a union.' },
      { ru: '`[T] extends [U]` проверяет объединение целиком.', en: '`[T] extends [U]` checks the union as a whole.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Conditional Types', url: `${HANDBOOK}/2/conditional-types.html` },
      {
        title: 'TypeScript Handbook — Distributive Conditional Types',
        url: `${HANDBOOK}/2/conditional-types.html#distributive-conditional-types`,
      },
    ],
  },
  {
    tag: 'mapped-types',
    format: 'steps',
    summary: {
      ru: 'Сопоставленные типы проходят по ключам другого типа и строят новый: меняют типы значений, модификаторы и даже имена ключей. На них построены `Partial`, `Readonly` и `Record`.',
      en: 'Mapped types walk the keys of another type and build a new one: they change value types, modifiers and even key names. `Partial`, `Readonly` and `Record` are built on them.',
    },
    steps: [
      {
        id: 'mapping',
        title: { ru: 'Проход по ключам', en: 'Walking the keys' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Синтаксис `{ [K in keyof T]: … }` перебирает ключи `T` и для каждого задаёт тип значения. Ключи сохраняются, а тип значения можно вычислить из `T[K]` или заменить целиком. Модификаторы исходных полей — `?` и `readonly` — при переборе `keyof T` переносятся в результат автоматически.',
              en: 'The syntax `{ [K in keyof T]: … }` iterates over the keys of `T` and sets a value type for each. Keys are kept, and the value type can be computed from `T[K]` or replaced entirely. Modifiers of the original fields — `?` and `readonly` — carry over automatically when iterating `keyof T`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Nullable<T> = {\n  [K in keyof T]: T[K] | null;\n};',
            },
          },
        ],
        test: ['ts-mapped-001'],
      },
      {
        id: 'modifiers',
        title: { ru: 'Модификаторы + и -', en: 'Modifiers + and -' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В сопоставленном типе модификаторы можно добавлять — `readonly`, `?` — и **снимать** префиксом `-`. `-readonly` убирает «только для чтения», `-?` делает поле обязательным и вычитает `undefined` из его типа. Так устроены встроенные утилиты: `Partial` добавляет `?`, `Required` снимает его через `-?`, а изменяемую копию readonly-типа делают через `-readonly`.',
              en: 'In a mapped type you can add modifiers — `readonly`, `?` — and **remove** them with a `-` prefix. `-readonly` drops read-only, `-?` makes a field required and subtracts `undefined` from its type. That’s how the built-in utilities work: `Partial` adds `?`, `Required` removes it via `-?`, and a mutable copy of a readonly type uses `-readonly`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Frozen<T> = {\n  readonly [K in keyof T]: T[K];\n};\ntype Loose<T> = {\n  [K in keyof T]?: T[K];\n};',
            },
          },
          {
            type: 'check',
            check: {
              id: 'minus-question',
              prompt: {
                ru: 'Что делает `-?` в сопоставленном типе?',
                en: 'What does `-?` do in a mapped type?',
              },
              options: [
                { text: { ru: 'Делает поля обязательными', en: 'Makes fields required' } },
                { text: { ru: 'Делает поля необязательными', en: 'Makes fields optional' } },
                { text: { ru: 'Удаляет поля', en: 'Removes fields' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Префикс `-` снимает модификатор: `-?` убирает необязательность, как в `Required<T>`.',
                en: 'The `-` prefix removes a modifier: `-?` removes optionality, as in `Required<T>`.',
              },
            },
          },
        ],
        test: ['ts-mapped-003', 'ts-mapped-004'],
      },
      {
        id: 'template-literals',
        title: { ru: 'Шаблонные литеральные типы', en: 'Template literal types' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Шаблонные литеральные типы** собирают строки на уровне типов — так же, как шаблонные строки в JavaScript собирают значения. Объединение внутри шаблона раскрывается в каждую комбинацию, а два объединения дают все пары. Встроенные `Capitalize`, `Uncapitalize`, `Uppercase` и `Lowercase` меняют регистр. Так описывают имена обработчиков, CSS-классы и ключи событий.',
              en: '**Template literal types** build strings at the type level — just as JavaScript template strings build values. A union inside the template expands into every combination, and two unions give all pairs. The built-in `Capitalize`, `Uncapitalize`, `Uppercase` and `Lowercase` change case. They describe handler names, CSS classes and event keys.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "type Size = 'sm' | 'lg';\ntype Variant = 'solid' | 'ghost';\ntype ClassName = `${Variant}-${Size}`;\n// 4 combinations",
            },
          },
        ],
        test: ['ts-keyof-004'],
      },
      {
        id: 'key-remapping',
        title: { ru: 'Переименование ключей через as', en: 'Key remapping with as' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Секция `as` (TypeScript 4.1) переименовывает ключи: `[K in keyof T as NewName]`. Новое имя собирают шаблонным типом; `string & K` отсекает ключи-числа и символы, которые нельзя вставить в строку. Если `as` превращает ключ в `never`, ключ **выбрасывается** из результата — так фильтруют поля, например оставляют только строковые: `T[K] extends string ? K : never`.',
              en: 'The `as` clause (TypeScript 4.1) renames keys: `[K in keyof T as NewName]`. The new name is built with a template type; `string & K` drops number and symbol keys that can’t go into a string. If `as` turns a key into `never`, the key is **dropped** from the result — that’s how fields are filtered, for example keeping only string ones: `T[K] extends string ? K : never`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Evt<K> = `${string & K}Changed`;\ntype Events<T> = {\n  [K in keyof T as Evt<K>]: (\n    value: T[K],\n  ) => void;\n};',
            },
          },
        ],
        test: ['ts-mapped-002'],
      },
    ],
    keyPoints: [
      { ru: '`[K in keyof T]` — перебор ключей.', en: '`[K in keyof T]` iterates keys.' },
      { ru: '`-readonly` и `-?` снимают модификаторы.', en: '`-readonly` and `-?` remove modifiers.' },
      { ru: 'Шаблонный тип раскрывает объединения во все комбинации.', en: 'A template type expands unions into every combination.' },
      { ru: '`as … never` выбрасывает ключ.', en: '`as … never` drops a key.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Mapped Types', url: `${HANDBOOK}/2/mapped-types.html` },
      { title: 'TypeScript Handbook — Key Remapping via as', url: `${HANDBOOK}/2/mapped-types.html#key-remapping-via-as` },
      { title: 'TypeScript Handbook — Template Literal Types', url: `${HANDBOOK}/2/template-literal-types.html` },
    ],
  },
  {
    tag: 'keyof-typeof',
    format: 'steps',
    summary: {
      ru: '`typeof`, `keyof` и индексный доступ позволяют выводить типы из уже существующих значений и типов, а не описывать их второй раз руками.',
      en: '`typeof`, `keyof` and indexed access let you derive types from existing values and types instead of describing them a second time by hand.',
    },
    steps: [
      {
        id: 'typeof-type',
        title: { ru: 'typeof в позиции типа', en: 'typeof in a type position' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В позиции типа `typeof value` берёт тип существующего значения. Поля обычного объекта расширяются — `\'red\'` становится `string`, ведь их можно изменить. `as const` делает объект целиком `readonly` и сохраняет литералы: тип поля — ровно `\'red\'`. Так описывают конфиги и справочники, из которых потом выводят типы, — один источник правды вместо значения и отдельного типа.',
              en: 'In a type position `typeof value` takes the type of an existing value. Fields of a plain object widen — `\'red\'` becomes `string`, since they can change. `as const` makes the whole object `readonly` and keeps the literals: the field’s type is exactly `\'red\'`. That’s how configs and lookup tables are described when types are later derived from them — one source of truth instead of a value plus a separate type.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "const theme = { color: 'red', gap: 8 };\ntype Theme = typeof theme;\n// { color: string; gap: number }",
            },
          },
        ],
        test: ['ts-keyof-001'],
      },
      {
        id: 'keyof',
        title: { ru: 'keyof — объединение ключей', en: 'keyof — a union of keys' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`keyof T` превращает тип объекта в объединение его ключей-литералов. Связка `keyof typeof obj` описывает ключи существующего объекта: добавили поле — тип обновился сам. Для строковой индексной сигнатуры `{ [key: string]: T }` `keyof` даёт `string | number`: в JavaScript числовые ключи приводятся к строкам, и `dict[0]` — то же самое, что `dict[\'0\']`.',
              en: '`keyof T` turns an object type into a union of its literal keys. The pair `keyof typeof obj` describes the keys of an existing object: add a field and the type updates itself. For a string index signature `{ [key: string]: T }` `keyof` gives `string | number`: in JavaScript numeric keys are converted to strings, and `dict[0]` is the same as `dict[\'0\']`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "type Point = { x: number; y: number };\ntype Axis = keyof Point; // 'x' | 'y'",
            },
          },
          {
            type: 'check',
            check: {
              id: 'keyof-literal',
              prompt: {
                ru: 'Что такое `keyof { a: 1; b: 2 }`?',
                en: 'What is `keyof { a: 1; b: 2 }`?',
              },
              options: [
                { text: { ru: '`"a" | "b"`', en: '`"a" | "b"`' } },
                { text: { ru: '`1 | 2`', en: '`1 | 2`' } },
                { text: { ru: '`string`', en: '`string`' } },
              ],
              answer: 0,
              explanation: {
                ru: '`keyof` берёт ключи, а не значения. Значения достают индексным доступом: `T[keyof T]`.',
                en: '`keyof` takes keys, not values. Values come from indexed access: `T[keyof T]`.',
              },
            },
          },
        ],
        test: ['ts-keyof-003'],
      },
      {
        id: 'indexed-access',
        title: { ru: 'Индексный доступ', en: 'Indexed access' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`T[K]` — тип свойства `K` в типе `T`. Если `K` — объединение ключей, результат — объединение типов значений: `T[keyof T]` даёт тип всех значений объекта. Для массива индекс `[number]` берёт тип любого элемента: у кортежа из `as const` это объединение литералов. Так из списка-константы получают union допустимых значений, а из объекта-константы — замену `enum` без генерации кода.',
              en: '`T[K]` is the type of property `K` in type `T`. If `K` is a union of keys, the result is a union of value types: `T[keyof T]` gives the type of all of an object’s values. For an array the index `[number]` takes the type of any element: for an `as const` tuple that’s a union of literals. This is how a constant list yields a union of allowed values, and a constant object yields an `enum` replacement with no generated code.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "type User = {\n  id: number;\n  tags: string[];\n};\ntype Tag = User['tags'][number];\n// string",
            },
          },
        ],
        test: ['ts-keyof-002', 'ts-keyof-005'],
      },
      {
        id: 'generic-keys',
        title: { ru: 'Ключи в обобщённых функциях', en: 'Keys in generic functions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ограничение `K extends keyof T` связывает два параметра типа: ключ обязан существовать в объекте. Тогда `T[K]` — тип именно этого поля. TypeScript выводит `T` из объекта, а `K` — как литерал переданного ключа, поэтому для ключа `\'age\'` результат — тип поля `age`, а не объединение всех значений. Литеральный тип значения при этом не сохраняется: поля обычного объекта уже расширены.',
              en: 'The constraint `K extends keyof T` ties two type parameters together: the key must exist in the object. Then `T[K]` is the type of exactly that field. TypeScript infers `T` from the object and `K` as the literal of the passed key, so for the key `\'age\'` the result is the type of the `age` field, not a union of all values. The value’s literal type isn’t kept: plain object fields are already widened.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "function update<T, K extends keyof T>(\n  obj: T,\n  key: K,\n  value: T[K],\n) {\n  obj[key] = value;\n}\nupdate({ n: 1 }, 'n', 'x'); // error",
            },
          },
        ],
        test: ['ts-generics-001'],
      },
    ],
    keyPoints: [
      { ru: '`typeof` в типе — тип значения.', en: '`typeof` in a type is the value’s type.' },
      { ru: '`keyof` — объединение ключей.', en: '`keyof` is a union of keys.' },
      { ru: '`T[keyof T]` — все значения, `(typeof list)[number]` — все элементы.', en: '`T[keyof T]` — all values; `(typeof list)[number]` — all elements.' },
      { ru: '`K extends keyof T` + `T[K]` — типобезопасный доступ по ключу.', en: '`K extends keyof T` + `T[K]` — type-safe access by key.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Keyof Type Operator', url: `${HANDBOOK}/2/keyof-types.html` },
      { title: 'TypeScript Handbook — Typeof Type Operator', url: `${HANDBOOK}/2/typeof-types.html` },
      { title: 'TypeScript Handbook — Indexed Access Types', url: `${HANDBOOK}/2/indexed-access-types.html` },
    ],
  },
  {
    tag: 'satisfies',
    format: 'steps',
    summary: {
      ru: '`satisfies` (TypeScript 4.9) проверяет, что значение подходит под тип, и при этом сохраняет точный выведенный тип. Разберём, чем он лучше аннотации и `as`.',
      en: '`satisfies` (TypeScript 4.9) checks that a value fits a type while keeping its precise inferred type. Let’s see why it beats an annotation and `as`.',
    },
    steps: [
      {
        id: 'annotation-problem',
        title: { ru: 'Проверка без потери точности', en: 'Checking without losing precision' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Аннотация `const cfg: Record<string, Color> = …` проверяет значение, но **заменяет** его тип на указанный: ключи становятся произвольными, а значение каждого поля — общим `Color`. Обращение к несуществующему ключу больше не ошибка, а у строкового поля пропали строковые методы. `satisfies` проверяет то же самое, но тип выражения оставляет выведенным: ключи известны, у каждого поля свой точный тип.',
              en: 'The annotation `const cfg: Record<string, Color> = …` checks the value but **replaces** its type with the given one: keys become arbitrary and each field’s value becomes the general `Color`. Accessing a missing key is no longer an error, and a string field loses its string methods. `satisfies` checks the same thing but keeps the expression’s inferred type: the keys are known and each field has its own precise type.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "const icons = {\n  home: 'house',\n  user: 'person',\n} satisfies Record<string, string>;\n\nicons.home; // string\nicons.cart; // error",
            },
          },
        ],
        test: ['ts-satisfies-001', 'ts-satisfies-003'],
      },
      {
        id: 'vs-as',
        title: { ru: 'satisfies или as', en: 'satisfies or as' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Утверждение `as` просит компилятор поверить на слово: оно меняет тип выражения почти без проверки значения, поэтому пустой объект `as Server` компилируется, хотя полей там нет. `satisfies` — это именно проверка: несоответствие даёт ошибку, а тип выражения остаётся прежним. `as` оставляют для случаев, когда вы знаете больше компилятора, например после проверки в рантайме.',
              en: 'An `as` assertion asks the compiler to take your word for it: it changes the expression’s type with almost no check of the value, so an empty object `as Server` compiles even though the fields are missing. `satisfies` is a real check: a mismatch is an error, and the expression’s type stays the same. Keep `as` for cases where you know more than the compiler, such as after a runtime check.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Server = { host: string };\nconst a = {} as Server; // compiles\nconst b = {} satisfies Server; // error',
            },
          },
        ],
        test: ['ts-satisfies-002'],
      },
      {
        id: 'contextual',
        title: { ru: 'Контекстный тип и опечатки', en: 'Contextual type and typos' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`satisfies` даёт значению **контекстный тип**. Поэтому литерал, который сверяется с объединением литералов, не расширяется до `string` и остаётся самым точным типом — например `"m"`, а не `Size` и не `string`. К объектному литералу перед `satisfies` применяется и проверка лишних свойств: опечатка в имени необязательного поля сразу даст ошибку, тогда как `as` её пропустит.',
              en: '`satisfies` gives the value a **contextual type**. So a literal checked against a union of literals doesn’t widen to `string` and stays the most precise type — say, `"m"`, not `Size` and not `string`. An object literal before `satisfies` also gets the excess property check: a typo in an optional field’s name is an error right away, whereas `as` lets it through.',
            },
          },
        ],
        test: ['ts-satisfies-004'],
      },
      {
        id: 'as-const-satisfies',
        title: { ru: 'as const satisfies', en: 'as const satisfies' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Связка `as const satisfies T` — частый способ описать конфиг. `as const` сохраняет литералы и делает объект `readonly`, `satisfies` проверяет, что все значения подходят под тип, и не расширяет результат. Получаются и проверка, и точные типы: значение поля — литерал, а из объекта можно выводить ключи и значения через `keyof typeof`.',
              en: 'The pair `as const satisfies T` is a common way to describe a config. `as const` keeps the literals and makes the object `readonly`; `satisfies` checks that every value fits the type without widening the result. You get both a check and precise types: a field’s value is a literal, and keys and values can be derived from the object with `keyof typeof`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Limits = Record<string, number>;\nconst LIMITS = {\n  free: 3,\n  pro: 50,\n} as const satisfies Limits;\n// LIMITS.pro: 50',
            },
          },
          {
            type: 'check',
            check: {
              id: 'as-const-effect',
              prompt: {
                ru: 'Что делает `as const` с объектом?',
                en: 'What does `as const` do to an object?',
              },
              options: [
                { text: { ru: 'Делает поля `readonly` и сохраняет литералы', en: 'Makes fields `readonly` and keeps literals' } },
                { text: { ru: 'Замораживает объект в рантайме', en: 'Freezes the object at runtime' } },
                { text: { ru: 'Проверяет объект по типу', en: 'Checks the object against a type' } },
              ],
              answer: 0,
              explanation: {
                ru: '`as const` влияет только на типы. Заморозка в рантайме — `Object.freeze`, проверка по типу — `satisfies`.',
                en: '`as const` affects only types. Runtime freezing is `Object.freeze`; checking against a type is `satisfies`.',
              },
            },
          },
        ],
        test: ['ts-satisfies-006'],
      },
    ],
    keyPoints: [
      { ru: 'Аннотация заменяет тип, `satisfies` — только проверяет.', en: 'An annotation replaces the type; `satisfies` only checks.' },
      { ru: '`as` верит на слово и может скрыть ошибку.', en: '`as` takes your word and can hide an error.' },
      { ru: '`satisfies` ловит опечатки в полях.', en: '`satisfies` catches field typos.' },
      { ru: '`as const satisfies` — проверка плюс литералы.', en: '`as const satisfies` — a check plus literals.' },
    ],
    sources: [
      {
        title: 'TypeScript 4.9 — The satisfies operator',
        url: `${HANDBOOK}/release-notes/typescript-4-9.html#the-satisfies-operator`,
      },
      { title: 'TypeScript Handbook — Type Assertions', url: `${HANDBOOK}/2/everyday-types.html#type-assertions` },
    ],
  },
  {
    tag: 'enums',
    format: 'steps',
    summary: {
      ru: 'Как TypeScript выводит литеральные типы, как устроены `enum` и почему всё чаще вместо них используют объединения литералов и `as const`.',
      en: 'How TypeScript infers literal types, how `enum` works, and why unions of literals and `as const` increasingly replace it.',
    },
    steps: [
      {
        id: 'numeric-enums',
        title: { ru: 'Числовые enum', en: 'Numeric enums' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Числовой `enum` нумеруется с `0`, а после явно заданного значения счёт продолжается от него: каждый следующий член на единицу больше предыдущего. Для числовых членов TypeScript генерирует **обратное отображение**: в объекте есть и `Level.Mid → 2`, и `Level[2] → \'Mid\'`. У строковых `enum` обратного отображения нет.',
              en: 'A numeric `enum` starts at `0`, and after an explicitly set value counting continues from it: each next member is one greater than the previous. For numeric members TypeScript generates a **reverse mapping**: the object has both `Level.Mid → 2` and `Level[2] → \'Mid\'`. String `enum`s have no reverse mapping.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "enum Level {\n  Low = 1,\n  Mid,\n  High = 10,\n}\nLevel.Mid; // 2\nLevel[10]; // 'High'",
            },
          },
        ],
        test: ['ts-enums-001'],
      },
      {
        id: 'erasable',
        title: { ru: 'enum или union', en: 'enum or a union' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`enum` — одна из немногих конструкций TypeScript, которая порождает JavaScript-код: объект с прямым и обратным отображением. Node.js умеет запускать `.ts`, просто вырезая типы, и на `enum` падает; флаг `erasableSyntaxOnly` запрещает такие конструкции. Объединение строковых литералов полностью стирается при сборке. Если нужен и объект со значениями, его пишут с `as const`, а тип выводят из него.',
              en: '`enum` is one of the few TypeScript constructs that emits JavaScript: an object with forward and reverse mappings. Node.js can run `.ts` by simply stripping types, and it fails on `enum`; the `erasableSyntaxOnly` flag forbids such constructs. A union of string literals is fully erased at build time. If you also need an object with the values, write it with `as const` and derive the type from it.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "const Level = {\n  Low: 'low',\n  High: 'high',\n} as const;\ntype Level =\n  (typeof Level)[keyof typeof Level];",
            },
          },
          {
            type: 'check',
            check: {
              id: 'emits-code',
              prompt: {
                ru: 'Какая из конструкций оставляет код после компиляции?',
                en: 'Which construct leaves code behind after compilation?',
              },
              options: [
                { text: { ru: '`enum`', en: '`enum`' } },
                { text: { ru: '`type`', en: '`type`' } },
                { text: { ru: '`interface`', en: '`interface`' } },
              ],
              answer: 0,
              explanation: {
                ru: '`type` и `interface` существуют только для компилятора и исчезают, а `enum` превращается в объект.',
                en: '`type` and `interface` exist only for the compiler and vanish, while `enum` becomes an object.',
              },
            },
          },
        ],
        test: ['ts-enums-002'],
      },
      {
        id: 'literal-widening',
        title: { ru: 'Расширение литералов', en: 'Literal widening' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Значение `const` нельзя изменить, поэтому его тип остаётся литеральным. `let` можно переприсвоить, и TypeScript **расширяет** литерал до общего типа: `number`, `string`. Литерал массива по умолчанию выводится как массив, а не кортеж: тип элемента — объединение типов всех элементов, а порядок и длина не запоминаются.',
              en: 'A `const` value can’t change, so its type stays literal. A `let` can be reassigned, so TypeScript **widens** the literal to the general type: `number`, `string`. An array literal is inferred as an array by default, not a tuple: the element type is a union of all element types, and order and length aren’t remembered.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'let size = 10; // number\nconst max = 10; // 10\nconst point = [0, 0]; // number[]',
            },
          },
        ],
        test: ['ts-literal-001', 'ts-tuple-001'],
      },
      {
        id: 'const-assertions',
        title: { ru: 'as const', en: 'as const' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`as const` отключает расширение: литералы сохраняются, массив становится кортежем только для чтения, поля объекта — `readonly`. Тот же эффект для аргумента функции даёт модификатор `const` у параметра типа с ограничением `readonly unknown[]`: переданный массив выводится кортежем литералов только для чтения. Это проверка компилятора — в рантайме объект не замораживается.',
              en: '`as const` turns widening off: literals are kept, an array becomes a readonly tuple, object fields become `readonly`. The `const` modifier on a type parameter constrained to `readonly unknown[]` gives the same effect for a function argument: the passed array is inferred as a readonly tuple of literals. It’s a compiler check — the object isn’t frozen at runtime.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: "const pair = [0, 'origin'] as const;\n// readonly [0, \"origin\"]",
            },
          },
        ],
        test: ['ts-generics-007'],
      },
    ],
    keyPoints: [
      { ru: 'Числовой enum продолжает счёт от явного значения.', en: 'A numeric enum continues counting from an explicit value.' },
      { ru: '`enum` порождает код, union — стирается.', en: '`enum` emits code; a union is erased.' },
      { ru: '`let` расширяет литерал, `const` — нет.', en: '`let` widens a literal; `const` doesn’t.' },
      { ru: '`as const` — readonly-кортежи и литералы.', en: '`as const` — readonly tuples and literals.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Enums', url: `${HANDBOOK}/enums.html` },
      { title: 'TypeScript 5.8 — erasableSyntaxOnly', url: `${HANDBOOK}/release-notes/typescript-5-8.html` },
      { title: 'TypeScript Handbook — Literal Types', url: `${HANDBOOK}/2/everyday-types.html#literal-types` },
    ],
  },
  {
    tag: 'structural-typing',
    format: 'steps',
    summary: {
      ru: 'TypeScript сравнивает типы по форме, а не по имени: подходит любой объект, у которого есть нужные поля. Из этого правила вытекают и удобство, и неожиданные ошибки.',
      en: 'TypeScript compares types by shape, not by name: any object with the required fields fits. Both the convenience and the surprising errors follow from this rule.',
    },
    steps: [
      {
        id: 'shape',
        title: { ru: 'Совместимость по форме', en: 'Compatibility by shape' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '[[structural-typing|Структурная типизация]]: объект подходит под тип, если у него есть все нужные свойства, а лишние не мешают. Поэтому переменную с дополнительным полем можно передать туда, где ждут более узкий тип. Исключение — **проверка лишних свойств**: она срабатывает только для свежего объектного литерала, записанного прямо в месте присваивания или вызова. Лишнее поле в литерале почти всегда опечатка.',
              en: '[[structural-typing|Structural typing]]: an object fits a type if it has all the required properties, and extra ones don’t matter. So a variable with an additional field can be passed where a narrower type is expected. The exception is the **excess property check**: it fires only for a fresh object literal written right at the assignment or call. An extra field in a literal is almost always a typo.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Size = { w: number; h: number };\nconst box = { w: 1, h: 2, depth: 3 };\nconst ok: Size = box;\nconst bad: Size = { w: 1, h: 2, d: 3 };',
            },
          },
        ],
        test: ['ts-structural-001'],
      },
      {
        id: 'interface-type',
        title: { ru: 'interface или type', en: 'interface or type' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Для формы объекта `interface` и `type` почти взаимозаменяемы. Отличия: интерфейсы с одним именем **сливаются** (declaration merging) — так библиотеки расширяют `Window` или настройки темы. `type` переобъявить нельзя, зато это псевдоним любого типа: объединения, кортежа, примитива, условного или сопоставленного типа. Интерфейс расширяют через `extends`, тип — через пересечение `&`.',
              en: 'For an object shape `interface` and `type` are nearly interchangeable. The differences: interfaces with the same name **merge** (declaration merging) — that’s how libraries extend `Window` or theme settings. A `type` can’t be redeclared, but it can alias any type: a union, tuple, primitive, conditional or mapped type. An interface is extended with `extends`, a type with an intersection `&`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'interface Env { mode: string }\ninterface Env { debug: boolean }\n// Env = { mode; debug }\n\ntype Id = string | number;',
            },
          },
        ],
        test: ['ts-structural-002'],
      },
      {
        id: 'optional-readonly',
        title: { ru: 'Необязательные и readonly', en: 'Optional and readonly' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`note?: string` значит, что ключа может **не быть** вовсе. `note: string | undefined` — ключ **обязателен**, просто значение может быть `undefined`: объект `{}` под такой тип не подходит. `readonly string[]` (он же `ReadonlyArray<string>`) не содержит изменяющих методов — `push`, `splice`, `sort` недоступны, а `map` и `filter` остаются. Так функция обещает не трогать переданный массив.',
              en: '`note?: string` means the key may be **absent** altogether. `note: string | undefined` means the key is **required**, it just may hold `undefined`: `{}` doesn’t fit that type. `readonly string[]` (aka `ReadonlyArray<string>`) has no mutating methods — `push`, `splice` and `sort` are unavailable, while `map` and `filter` remain. That’s how a function promises not to touch the array it’s given.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'ts',
              source: 'type Prices = readonly number[];\nfunction total(prices: Prices) {\n  return prices.reduce(\n    (sum, price) => sum + price,\n    0,\n  );\n}',
            },
          },
        ],
        test: ['ts-optional-001', 'ts-readonly-001'],
      },
      {
        id: 'functions',
        title: { ru: 'Совместимость функций', en: 'Function compatibility' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Функцию можно подставить вместо другой, если она принимает **не меньше** вариантов аргументов: ей могут передать всё, что допускает исходный тип. Функция только для `string` не подойдёт туда, где ждут `(value: string | number) => void`, — ей могут прислать число. Такую проверку параметров (контравариантность) включает флаг `strictFunctionTypes` из `strict`. Возвращаемый тип, наоборот, может быть уже исходного.',
              en: 'A function can stand in for another if it accepts **at least** as many argument variants: it may be passed anything the original type allows. A function for `string` only won’t fit where `(value: string | number) => void` is expected — it may be sent a number. This parameter check (contravariance) is enabled by `strictFunctionTypes`, part of `strict`. The return type, conversely, may be narrower than the original.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'wider-params',
              prompt: {
                ru: 'Можно ли передать `(x: string | number) => void` туда, где ждут `(x: string) => void`?',
                en: 'Can `(x: string | number) => void` be passed where `(x: string) => void` is expected?',
              },
              options: [
                { text: { ru: 'Да: она принимает даже больше вариантов', en: 'Yes: it accepts even more variants' } },
                { text: { ru: 'Нет: типы параметров разные', en: 'No: the parameter types differ' } },
                { text: { ru: 'Только через `as`', en: 'Only with `as`' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Её будут вызывать только со строками, а строки она умеет обрабатывать.',
                en: 'It will only be called with strings, and it can handle strings.',
              },
            },
          },
        ],
        test: ['ts-structural-003'],
      },
    ],
    keyPoints: [
      { ru: 'Лишние поля не мешают — кроме свежего литерала.', en: 'Extra fields are fine — except in a fresh literal.' },
      { ru: '`interface` сливается, `type` описывает любые типы.', en: '`interface` merges; `type` aliases any type.' },
      { ru: '`?:` — ключа может не быть, `| undefined` — ключ обязателен.', en: '`?:` — the key may be absent; `| undefined` — the key is required.' },
      { ru: 'Параметры функций проверяются контравариантно.', en: 'Function parameters are checked contravariantly.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Type Compatibility', url: `${HANDBOOK}/type-compatibility.html` },
      { title: 'TypeScript Handbook — Object Types', url: `${HANDBOOK}/2/objects.html` },
      {
        title: 'TypeScript Handbook — Differences Between Type Aliases and Interfaces',
        url: `${HANDBOOK}/2/everyday-types.html#differences-between-type-aliases-and-interfaces`,
      },
    ],
  },
];
