import type { Question } from '../model/types';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';
const TSCONFIG = 'https://www.typescriptlang.org/tsconfig';
const EQUAL = 'type Equal<X, Y> = (<V>() => V extends X ? 1 : 2) extends (<V>() => V extends Y ? 1 : 2) ? true : false;';

export const TYPESCRIPT_QUESTIONS_4: Question[] = [
  {
    id: 'ts-keyof-002',
    topic: 'typescript',
    tags: ['keyof-typeof', 'enums'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой тип получится у `Role`?', en: 'What type does `Role` resolve to?' },
    code: {
      lang: 'ts',
      source: `const ROLES = ['admin', 'editor', 'viewer'] as const;
type Role = (typeof ROLES)[number];`,
    },
    options: [
      { code: 'string' },
      { code: 'readonly string[]' },
      { code: '"admin" | "editor" | "viewer"' },
      { code: 'number' },
      { code: '["admin", "editor", "viewer"]' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`as const` превращает массив в кортеж только для чтения с литеральными типами: `readonly ["admin", "editor", "viewer"]`. Индексный доступ `[number]` берёт тип любого элемента — объединение литералов.',
          en: '`as const` turns the array into a readonly tuple of literal types: `readonly ["admin", "editor", "viewer"]`. Indexed access with `[number]` takes the type of any element — the union of literals.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Так один массив служит и данными для рантайма (выпадающий список), и источником типа — без дублирования.',
          en: 'This way one array serves as runtime data (a dropdown, say) and as the source of the type — with no duplication.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Indexed Access Types', url: `${HANDBOOK}/2/indexed-access-types.html` },
      { title: 'TypeScript Handbook — Literal Inference', url: `${HANDBOOK}/2/everyday-types.html#literal-inference` },
    ],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Role, 'admin' | 'editor' | 'viewer'> = true;` },
  },
  {
    id: 'ts-keyof-003',
    topic: 'typescript',
    tags: ['keyof-typeof'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Key`?', en: 'What type does `Key` resolve to?' },
    code: {
      lang: 'ts',
      source: `type Dictionary = { [key: string]: number };
type Key = keyof Dictionary;`,
    },
    options: [
      { code: 'string' },
      { code: 'number' },
      { code: 'never' },
      { code: 'string | symbol' },
      { code: 'string | number' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Для строковой индексной сигнатуры `keyof` даёт `string | number`: в JavaScript числовые ключи всё равно приводятся к строкам, поэтому `dictionary[0]` — то же самое, что `dictionary["0"]`.',
          en: 'For a string index signature, `keyof` gives `string | number`: in JavaScript numeric keys are converted to strings anyway, so `dictionary[0]` is the same as `dictionary["0"]`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Keyof Type Operator', url: `${HANDBOOK}/2/keyof-types.html` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Key, string | number> = true;` },
  },
  {
    id: 'ts-satisfies-001',
    topic: 'typescript',
    tags: ['satisfies'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой тип будет у `green`?', en: 'What is the type of `green`?' },
    code: {
      lang: 'ts',
      source: `type Color = string | [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, Color>;

const green = palette.green;`,
    },
    options: [
      { code: 'string | [number, number, number]' },
      { code: 'Color' },
      { code: '"#00ff00"' },
      { code: 'string' },
      { code: 'unknown' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`satisfies` проверяет, что значение подходит под тип, но **не заменяет** выведенный тип. Поэтому `palette.green` остаётся `string`, и у него доступны строковые методы без проверок.',
          en: '`satisfies` checks that the value fits the type but **doesn’t replace** the inferred type. So `palette.green` stays a `string`, and string methods are available without checks.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `const annotated: Record<string, Color> = { green: '#00ff00' };
annotated.green; // string | [number, number, number]`,
        },
        caption: {
          ru: 'С аннотацией типа информация о конкретных значениях теряется.',
          en: 'With a type annotation, knowledge of the specific values is lost.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript 4.9 — The satisfies Operator',
        url: `${HANDBOOK}/release-notes/typescript-4-9.html#the-satisfies-operator`,
      },
    ],
    verify: { kind: 'ts-type', symbol: 'green' },
  },
  {
    id: 'ts-satisfies-002',
    topic: 'typescript',
    tags: ['satisfies'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Чем `satisfies` отличается от `as`?', en: 'How does `satisfies` differ from `as`?' },
    options: [
      { text: { ru: 'Ничем, это синонимы', en: 'They’re synonyms' } },
      {
        text: {
          ru: '`as` проверяет совместимость строже, чем `satisfies`',
          en: '`as` checks compatibility more strictly than `satisfies`',
        },
      },
      {
        text: {
          ru: '`satisfies` преобразует значение к типу во время выполнения',
          en: '`satisfies` converts the value to the type at runtime',
        },
      },
      {
        text: {
          ru: '`satisfies` проверяет, что значение подходит под тип, и сохраняет выведенный тип; `as` просит компилятор поверить на слово и может скрыть ошибку',
          en: '`satisfies` checks that the value fits the type and keeps the inferred type; `as` asks the compiler to take your word for it and can hide an error',
        },
      },
      {
        text: {
          ru: '`satisfies` работает только с объектами, объявленными через `as const`',
          en: '`satisfies` only works with objects declared `as const`',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Утверждение `as` (type assertion) меняет тип выражения без проверки значения: `{} as Port` компилируется, хотя `port` там нет. `satisfies` — это проверка: несоответствие даст ошибку, а тип выражения останется выведенным.',
          en: 'A type assertion `as` changes an expression’s type without checking the value: `{} as Port` compiles even though there’s no `port`. `satisfies` is a check: a mismatch is an error, and the expression keeps its inferred type.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type Port = { port: number };
const asserted = {} as Port;                 // ok, но port нет / ok, yet no port
const checked = { port: '80' } satisfies Port; // ошибка / error`,
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript 4.9 — The satisfies Operator',
        url: `${HANDBOOK}/release-notes/typescript-4-9.html#the-satisfies-operator`,
      },
      { title: 'TypeScript Handbook — Type Assertions', url: `${HANDBOOK}/2/everyday-types.html#type-assertions` },
    ],
    verify: {
      kind: 'ts-check',
      source: `type Port = { port: number };
const asserted = {} as Port;
// @ts-expect-error
const checked = { port: '80' } satisfies Port;`,
    },
  },
  {
    id: 'ts-enums-001',
    topic: 'typescript',
    tags: ['enums'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'ts',
      source: `enum Direction {
  Up,
  Down = 5,
  Left,
}

console.log(Direction.Up, Direction.Left, Direction[5]);`,
    },
    options: [
      { code: '0 2 Down' },
      { code: '1 6 Down' },
      { code: '0 6 undefined' },
      { code: 'Up Left Down' },
      { code: '0 6 Down' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Числовой enum нумеруется с `0`, а после явно заданного значения счёт продолжается от него: `Up = 0`, `Down = 5`, `Left = 6`.',
          en: 'A numeric enum starts at `0`, and after an explicit value numbering continues from it: `Up = 0`, `Down = 5`, `Left = 6`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Для числовых членов TypeScript генерирует **обратное отображение**: в объекте есть и `Direction.Down === 5`, и `Direction[5] === "Down"`. У строковых enum обратного отображения нет.',
          en: 'For numeric members TypeScript generates a **reverse mapping**: the object has both `Direction.Down === 5` and `Direction[5] === "Down"`. String enums have no reverse mapping.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Numeric enums', url: `${HANDBOOK}/enums.html#numeric-enums` },
      { title: 'TypeScript Handbook — Reverse mappings', url: `${HANDBOOK}/enums.html#reverse-mappings` },
    ],
    verify: { kind: 'ts-output' },
  },
  {
    id: 'ts-enums-002',
    topic: 'typescript',
    tags: ['enums'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Почему всё чаще вместо `enum` используют union строковых литералов?',
      en: 'Why do teams increasingly use a union of string literals instead of `enum`?',
    },
    options: [
      {
        text: {
          ru: '`enum` нельзя использовать в `switch`',
          en: '`enum` can’t be used in a `switch`',
        },
      },
      {
        text: {
          ru: '`enum` удалён в TypeScript 5',
          en: '`enum` was removed in TypeScript 5',
        },
      },
      {
        text: {
          ru: '`enum` порождает JavaScript-код, а union литералов полностью стирается — такой код работает в режиме «только стирание типов» (Node.js, флаг `erasableSyntaxOnly`)',
          en: '`enum` emits JavaScript code, while a literal union is fully erased — so the code works in “type stripping only” mode (Node.js, the `erasableSyntaxOnly` flag)',
        },
      },
      {
        text: {
          ru: 'Union литералов можно перебрать в рантайме через `Object.keys`',
          en: 'A literal union can be iterated at runtime with `Object.keys`',
        },
      },
      {
        text: {
          ru: '`enum` в десятки раз медленнее строк при сравнении',
          en: '`enum` is dozens of times slower than strings in comparisons',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`enum` — одна из немногих конструкций TypeScript, которая генерирует код (объект с прямым и обратным отображением). Node.js умеет запускать `.ts`, просто вырезая типы, и на `enum` падает с `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`. Флаг `erasableSyntaxOnly` (TypeScript 5.8) запрещает такие конструкции в проекте.',
          en: '`enum` is one of the few TypeScript constructs that emits code (an object with forward and reverse mappings). Node.js can run `.ts` files by simply stripping types, and it fails on `enum` with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`. The `erasableSyntaxOnly` flag (TypeScript 5.8) forbids such constructs in a project.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `const Status = { Active: 'active', Banned: 'banned' } as const;
type Status = (typeof Status)[keyof typeof Status]; // "active" | "banned"`,
        },
        caption: {
          ru: 'Если нужен и тип, и значения в рантайме — объект `as const`.',
          en: 'If you need both the type and runtime values — an `as const` object.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Сам union литералов в рантайме не существует, поэтому перебрать его нельзя — для этого и нужен объект или массив `as const`.',
          en: 'A literal union doesn’t exist at runtime, so it can’t be iterated — that’s what an `as const` object or array is for.',
        },
      },
    ],
    sources: [
      { title: 'TSConfig — erasableSyntaxOnly', url: `${TSCONFIG}/#erasableSyntaxOnly` },
      { title: 'Node.js — Modules: TypeScript', url: 'https://nodejs.org/api/typescript.html' },
      { title: 'TypeScript Handbook — Objects vs Enums', url: `${HANDBOOK}/enums.html#objects-vs-enums` },
    ],
  },
  {
    id: 'ts-structural-001',
    topic: 'typescript',
    tags: ['structural-typing'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой вызов не скомпилируется?', en: 'Which call fails to compile?' },
    code: {
      lang: 'ts',
      source: `type Point = { x: number; y: number };
function print(point: Point) {}

const point3d = { x: 1, y: 2, z: 3 };
print(point3d);
print({ x: 1, y: 2, z: 3 });`,
    },
    options: [
      { text: { ru: 'Оба', en: 'Both' } },
      { text: { ru: 'Только первый: у `point3d` лишнее поле `z`', en: 'Only the first: `point3d` has an extra `z` field' } },
      { text: { ru: 'Ни один', en: 'Neither' } },
      {
        text: {
          ru: 'Только второй: лишние свойства проверяются только у объектных литералов',
          en: 'Only the second: excess properties are only checked on object literals',
        },
      },
      {
        text: {
          ru: 'Только второй: `z` должен быть строкой',
          en: 'Only the second: `z` must be a string',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'TypeScript использует **структурную типизацию**: объект подходит под тип, если у него есть все нужные свойства, лишние не мешают. Поэтому `point3d` можно передать.',
          en: 'TypeScript uses **structural typing**: an object fits a type if it has all the required properties; extra ones don’t matter. So `point3d` can be passed.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Исключение — **проверка лишних свойств** (excess property check) для свежего объектного литерала: лишнее поле там почти наверняка опечатка, поэтому второй вызов — ошибка TS2353.',
          en: 'The exception is the **excess property check** on a fresh object literal: an extra field there is almost certainly a typo, so the second call is error TS2353.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Excess Property Checks', url: `${HANDBOOK}/2/objects.html#excess-property-checks` },
      { title: 'TypeScript Handbook — Type Compatibility', url: `${HANDBOOK}/type-compatibility.html` },
    ],
    verify: { kind: 'ts-error', code: 2353 },
  },
  {
    id: 'ts-structural-002',
    topic: 'typescript',
    tags: ['structural-typing'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Чем `interface` отличается от `type`?', en: 'How does `interface` differ from `type`?' },
    options: [
      {
        text: {
          ru: '`type` работает быстрее во время выполнения',
          en: '`type` is faster at runtime',
        },
      },
      {
        text: {
          ru: '`interface` можно дополнить повторным объявлением (declaration merging), а `type` переобъявить нельзя; зато `type` описывает объединения, кортежи и примитивы',
          en: 'An `interface` can be extended by redeclaring it (declaration merging) while a `type` can’t be redeclared; `type`, however, can describe unions, tuples and primitives',
        },
      },
      {
        text: {
          ru: '`interface` нельзя наследовать',
          en: '`interface` can’t be extended',
        },
      },
      {
        text: {
          ru: '`type` не поддерживает дженерики',
          en: '`type` doesn’t support generics',
        },
      },
      {
        text: {
          ru: '`interface` может описывать объединение типов, а `type` — нет',
          en: '`interface` can describe a union of types, while `type` can’t',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Для описания формы объекта они почти взаимозаменяемы. Отличия: интерфейсы с одним именем **сливаются** — так библиотеки расширяют, например, `Window`. `type` — это псевдоним любого типа: объединения, кортежа, примитива, условного или mapped-типа.',
          en: 'For describing object shapes they’re almost interchangeable. The differences: interfaces with the same name **merge** — that’s how libraries extend, say, `Window`. A `type` is an alias for any type: a union, a tuple, a primitive, a conditional or mapped type.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `interface User { id: number }
interface User { name: string } // сливаются / merged

type Id = string | number;      // только через type / type only`,
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Differences Between Type Aliases and Interfaces',
        url: `${HANDBOOK}/2/everyday-types.html#differences-between-type-aliases-and-interfaces`,
      },
      { title: 'TypeScript Handbook — Declaration Merging', url: `${HANDBOOK}/declaration-merging.html` },
    ],
    verify: {
      kind: 'ts-check',
      source: `interface User { id: number }
interface User { name: string }
const user: User = { id: 1, name: 'Ann' };
type Id = string | number;
type Pair = [string, number];`,
    },
  },
  {
    id: 'ts-structural-003',
    topic: 'typescript',
    tags: ['structural-typing'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Почему последняя строка не компилируется при `strict: true`?',
      en: 'Why doesn’t the last line compile with `strict: true`?',
    },
    code: {
      lang: 'ts',
      source: `type Handler = (value: string | number) => void;

const onlyStrings = (value: string) => console.log(value.toUpperCase());
const handler: Handler = onlyStrings;`,
    },
    options: [
      {
        text: {
          ru: 'Стрелочную функцию нельзя присвоить переменной с типом-функцией',
          en: 'An arrow function can’t be assigned to a function-typed variable',
        },
      },
      {
        text: {
          ru: '`Handler` обязан возвращать `string`',
          en: '`Handler` must return a `string`',
        },
      },
      {
        text: {
          ru: '`handler` могут вызвать с числом, а `onlyStrings` умеет только строки: параметры функций проверяются контравариантно',
          en: '`handler` may be called with a number, but `onlyStrings` only handles strings: function parameters are checked contravariantly',
        },
      },
      {
        text: {
          ru: 'Строка компилируется: `string` — подтип `string | number`',
          en: 'It does compile: `string` is a subtype of `string | number`',
        },
      },
      {
        text: {
          ru: 'У `console.log` нет типа в TypeScript',
          en: '`console.log` has no type in TypeScript',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Функцию можно подставить вместо другой, только если она принимает **не меньше** вариантов аргументов. `onlyStrings` не справится с числом, которое ей могут передать через `handler`, поэтому флаг `strictFunctionTypes` даёт ошибку TS2322.',
          en: 'A function can stand in for another only if it accepts **at least** the same arguments. `onlyStrings` can’t handle a number that may come through `handler`, so `strictFunctionTypes` reports TS2322.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Нюанс: параметры **методов** (`method(value: T): void` в интерфейсе) остаются бивариантными даже в строгом режиме — ради совместимости с DOM-типами.',
          en: 'A nuance: **method** parameters (`method(value: T): void` in an interface) stay bivariant even in strict mode, for compatibility with DOM types.',
        },
      },
    ],
    sources: [
      { title: 'TSConfig — strictFunctionTypes', url: `${TSCONFIG}/#strictFunctionTypes` },
      { title: 'TypeScript Handbook — Type Compatibility', url: `${HANDBOOK}/type-compatibility.html` },
    ],
    verify: { kind: 'ts-error', code: 2322 },
  },
  {
    id: 'ts-literal-001',
    topic: 'typescript',
    tags: ['enums'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой тип получится у `Result`?', en: 'What type does `Result` resolve to?' },
    code: {
      lang: 'ts',
      source: `let mutable = 'hi';
const constant = 'hi';

type Result = [typeof mutable, typeof constant];`,
    },
    options: [
      { code: '[string, string]' },
      { code: '["hi", "hi"]' },
      { code: '["hi", string]' },
      { code: '[string, "hi"]' },
      { code: '[unknown, "hi"]' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`let` можно переприсвоить, поэтому TypeScript **расширяет** литерал до `string`. Значение `const` поменять нельзя, и тип остаётся литеральным — `"hi"`.',
          en: '`let` can be reassigned, so TypeScript **widens** the literal to `string`. A `const` can’t change, so its type stays the literal `"hi"`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Literal Types', url: `${HANDBOOK}/2/everyday-types.html#literal-types` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Result, [string, 'hi']> = true;` },
  },
  {
    id: 'ts-tuple-001',
    topic: 'typescript',
    tags: ['enums'],
    difficulty: 1,
    popular: false,
    prompt: { ru: 'Какой тип будет у `pair`?', en: 'What is the type of `pair`?' },
    code: { lang: 'ts', source: `const pair = [1, 'a'];` },
    options: [
      { code: '[number, string]' },
      { code: 'readonly [1, "a"]' },
      { code: '(string | number)[]' },
      { code: 'any[]' },
      { code: '[1, "a"]' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Литерал массива по умолчанию выводится как массив, а не кортеж: тип элемента — объединение типов всех элементов. Порядок и длина не запоминаются.',
          en: 'An array literal is inferred as an array, not a tuple, by default: the element type is the union of all element types. Order and length aren’t remembered.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `const tuple: [number, string] = [1, 'a'];
const frozen = [1, 'a'] as const; // readonly [1, "a"]`,
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Tuple Types', url: `${HANDBOOK}/2/objects.html#tuple-types` }],
    verify: { kind: 'ts-type', symbol: 'pair' },
  },
  {
    id: 'ts-optional-001',
    topic: 'typescript',
    tags: ['structural-typing'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выдаст компилятор?', en: 'What will the compiler report?' },
    code: {
      lang: 'ts',
      source: `type A = { value?: number };
type B = { value: number | undefined };

const a: A = {};
const b: B = {};`,
    },
    options: [
      { text: { ru: 'Ошибку у обоих', en: 'An error on both' } },
      { text: { ru: 'Ничего: это одинаковые типы', en: 'Nothing: the types are identical' } },
      { text: { ru: 'Ошибку только у `a`', en: 'An error only on `a`' } },
      {
        text: {
          ru: 'Ошибку только у `b`: ключ `value` там обязателен, хоть и может быть `undefined`',
          en: 'An error only on `b`: the `value` key is required there, even though it may be `undefined`',
        },
      },
      {
        text: {
          ru: 'Ошибку только у `b`: `undefined` нельзя использовать в объединении',
          en: 'An error only on `b`: `undefined` can’t be used in a union',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`value?: number` — ключа может **не быть**. `value: number | undefined` — ключ **обязателен**, просто значение может быть `undefined`. Поэтому `{}` подходит под `A`, но не под `B` (ошибка TS2741).',
          en: '`value?: number` means the key may be **absent**. `value: number | undefined` means the key is **required**, its value just may be `undefined`. So `{}` fits `A` but not `B` (error TS2741).',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'С флагом `exactOptionalPropertyTypes` разница ещё строже: в `value?: number` нельзя явно записать `undefined`.',
          en: 'With `exactOptionalPropertyTypes` the difference is even stricter: you can’t explicitly assign `undefined` to `value?: number`.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Optional Properties', url: `${HANDBOOK}/2/objects.html#optional-properties` },
      { title: 'TSConfig — exactOptionalPropertyTypes', url: `${TSCONFIG}/#exactOptionalPropertyTypes` },
    ],
    verify: { kind: 'ts-error', code: 2741 },
  },
];
