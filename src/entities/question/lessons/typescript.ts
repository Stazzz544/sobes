import type { Lesson } from '../model/types';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';

export const TYPESCRIPT_LESSONS: Lesson[] = [
  {
    tag: 'any-unknown-never',
    summary: {
      ru: '`any` отключает проверку типов, `unknown` — безопасное «что угодно», `never` — значение, которого не бывает.',
      en: '`any` turns type checking off, `unknown` is a safe “anything”, `never` is a value that can’t exist.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`any` выключает проверки и «заражает» всё, к чему прикасается: результат операций с ним тоже `any`. `unknown` принимает любое значение, но пользоваться им можно только после [[type-narrowing|сужения]] — так безопасно описывать внешние данные: JSON, ответы API, `catch (error)`.',
          en: '`any` turns checks off and “infects” everything it touches: operations on it produce `any` too. `unknown` accepts any value, but you can use it only after [[type-narrowing|narrowing]] — the safe way to type external data: JSON, API responses, `catch (error)`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `function parse(json: string): unknown {
  return JSON.parse(json);
}

const data = parse('{"name":"Ann"}');
// data.name; // error: 'data' is of type 'unknown'
if (typeof data === 'object' && data !== null && 'name' in data) {
  console.log(data.name); // Ann
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`never` — пустой тип. Его «возвращают» функции, которые никогда не завершаются нормально (бросают ошибку, крутят бесконечный цикл), и он остаётся у переменной в ветке, куда не может попасть ни один вариант union. Присваивание в `never` — проверка, что обработаны все варианты.',
          en: '`never` is the empty type. Functions that never finish normally (throw, loop forever) “return” it, and a variable has it in a branch no union member can reach. Assigning to `never` is a check that every variant is handled.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number };

function area(shape: Shape): number {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  }
  if (shape.kind === 'square') {
    return shape.side ** 2;
  }
  const unreachable: never = shape;
  return unreachable;
}`,
        },
        caption: {
          ru: 'Добавите новую фигуру — строка с never перестанет компилироваться.',
          en: 'Add a new shape and the never line stops compiling.',
        },
      },
    ],
    keyPoints: [
      { ru: '`any` отключает проверку и расползается по коду.', en: '`any` disables checking and spreads through the code.' },
      {
        ru: '`unknown` принимает что угодно, но требует сужения перед использованием.',
        en: '`unknown` accepts anything but requires narrowing before use.',
      },
      {
        ru: '`never` — тип без значений: функции, которые не возвращаются, и невозможные ветки.',
        en: '`never` has no values: functions that don’t return and impossible branches.',
      },
      {
        ru: 'Присваивание в `never` проверяет, что все варианты union обработаны.',
        en: 'Assigning to `never` checks that every union member is handled.',
      },
      { ru: 'Внешние данные — `unknown` плюс проверка, а не `any`.', en: 'External data is `unknown` plus a check, not `any`.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Everyday Types: any', url: `${HANDBOOK}/2/everyday-types.html#any` },
      { title: 'TypeScript Handbook — unknown', url: `${HANDBOOK}/2/functions.html#unknown` },
      { title: 'TypeScript Handbook — The never type', url: `${HANDBOOK}/2/narrowing.html#the-never-type` },
    ],
  },
  {
    tag: 'narrowing',
    summary: {
      ru: 'TypeScript сужает union-тип внутри веток по обычным проверкам: `typeof`, `instanceof`, `in`, сравнениям.',
      en: 'TypeScript narrows a union type inside branches using ordinary checks: `typeof`, `instanceof`, `in`, comparisons.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Анализ потока управления следит за проверками и `return`: после `typeof value === \'string\'` внутри ветки `value` — строка, а после неё строки в типе уже нет. Работают `typeof` (примитивы), `instanceof` (классы), `in` (наличие поля), `===` и проверка на истинность.',
          en: 'Control flow analysis follows checks and `return`s: after `typeof value === \'string\'`, `value` is a string inside the branch, and string is gone from the type after it. `typeof` (primitives), `instanceof` (classes), `in` (field presence), `===` and truthiness checks all work.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `function format(value: string | number | Date): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value.toFixed(2);
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Discriminated union** — варианты с общим полем-литералом (`kind`, `type`): сравнение этого поля сразу выбирает вариант. Свою проверку оформляют предикатом `value is T`, а функция с `asserts value is T` сужает тип после вызова, если не бросила ошибку. Предикату компилятор верит на слово — если он ошибается, ошибётся и тип.',
          en: 'A **discriminated union** has variants with a common literal field (`kind`, `type`): comparing that field picks the variant. A custom check is written as a `value is T` predicate, and a function with `asserts value is T` narrows the type after the call if it didn’t throw. The compiler trusts a predicate blindly — if it’s wrong, so is the type.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type Cat = { meow: () => void };
type Dog = { bark: () => void };

function isCat(pet: Cat | Dog): pet is Cat {
  return 'meow' in pet;
}

function speak(pet: Cat | Dog): void {
  if (isCat(pet)) {
    pet.meow();
  } else {
    pet.bark();
  }
}`,
        },
      },
    ],
    keyPoints: [
      {
        ru: '`typeof`, `instanceof`, `in`, `===` и истинность сужают union внутри ветки.',
        en: '`typeof`, `instanceof`, `in`, `===` and truthiness narrow a union inside a branch.',
      },
      {
        ru: 'Discriminated union — общее поле-литерал, по нему выбирается вариант.',
        en: 'A discriminated union has a common literal field that picks the variant.',
      },
      { ru: '`value is T` — свой предикат; компилятор верит ему на слово.', en: '`value is T` is a custom predicate; the compiler trusts it.' },
      {
        ru: '`asserts value is T` сужает тип после вызова, если функция не бросила.',
        en: '`asserts value is T` narrows after the call if the function didn’t throw.',
      },
      { ru: '`typeof x === \'object\'` пропускает `null`.', en: '`typeof x === \'object\'` lets `null` through.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Narrowing', url: `${HANDBOOK}/2/narrowing.html` },
      { title: 'TypeScript Handbook — Discriminated unions', url: `${HANDBOOK}/2/narrowing.html#discriminated-unions` },
    ],
  },
  {
    tag: 'generics',
    summary: {
      ru: 'Дженерик — параметр-тип: код работает с любым типом и сохраняет связь между входом и выходом.',
      en: 'A generic is a type parameter: code works with any type and keeps the link between input and output.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Вместо `any` — параметр `T`: функция возвращает тот же тип, что получила. Обычно `T` выводится из аргументов, явно его указывают редко. Ограничение `T extends …` говорит, что умеет `T`; `K extends keyof T` вместе с `T[K]` даёт типобезопасный доступ к полю.',
          en: 'Instead of `any`, a parameter `T`: the function returns the same type it received. `T` is usually inferred from the arguments and rarely written explicitly. A constraint `T extends …` says what `T` can do; `K extends keyof T` together with `T[K]` gives type-safe property access.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `function first<T>(items: T[]): T | undefined {
  return items[0];
}

const n = first([1, 2, 3]); // number | undefined
const s = first(['a', 'b']); // string | undefined

function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const age = getProperty({ name: 'Ann', age: 30 }, 'age'); // number
// getProperty({ name: 'Ann' }, 'email'); // error`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '[[generic|Дженерики]] бывают у функций, типов (`type Box<T> = { value: T }`), интерфейсов и классов; у типа может быть значение по умолчанию `T = string`. Правило хорошего дженерика: параметр связывает хотя бы два места — вход и выход или два аргумента. Если он встречается один раз, хватит конкретного типа или `unknown`.',
          en: '[[generic|Generics]] exist on functions, types (`type Box<T> = { value: T }`), interfaces and classes; a type can have a default `T = string`. Rule of a good generic: the parameter links at least two places — input and output, or two arguments. If it appears once, a concrete type or `unknown` will do.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Параметр-тип сохраняет связь между входом и выходом.', en: 'A type parameter keeps the link between input and output.' },
      { ru: 'Обычно `T` выводится из аргументов.', en: '`T` is usually inferred from the arguments.' },
      { ru: '`T extends X` — ограничение: внутри доступно то, что есть у `X`.', en: '`T extends X` is a constraint: inside, what `X` has is available.' },
      {
        ru: '`K extends keyof T` и `T[K]` — типобезопасный доступ к полю.',
        en: '`K extends keyof T` and `T[K]` give type-safe property access.',
      },
      { ru: 'Параметр, который используется один раз, не нужен.', en: 'A parameter used only once isn’t needed.' },
    ],
    sources: [{ title: 'TypeScript Handbook — Generics', url: `${HANDBOOK}/2/generics.html` }],
  },
  {
    tag: 'utility-types',
    summary: {
      ru: 'Встроенные утилиты строят новые типы из существующих: сделать поля необязательными, выбрать часть, достать тип результата.',
      en: 'Built-in utilities build new types from existing ones: make fields optional, pick a subset, extract a result type.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Модификаторы полей: `Partial`, `Required`, `Readonly` (все — поверхностные). Форма объекта: `Pick`, `Omit`, `Record<K, V>`. Union: `Exclude`, `Extract`, `NonNullable`. Функции и промисы: `ReturnType`, `Parameters`, `Awaited`.',
          en: 'Field modifiers: `Partial`, `Required`, `Readonly` (all shallow). Object shape: `Pick`, `Omit`, `Record<K, V>`. Unions: `Exclude`, `Extract`, `NonNullable`. Functions and promises: `ReturnType`, `Parameters`, `Awaited`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type User = { id: number; name: string; email?: string };

type UserPatch = Partial<Omit<User, 'id'>>;
// { name?: string; email?: string }

type UserPreview = Pick<User, 'id' | 'name'>;
type Roles = Record<'admin' | 'editor', boolean>;

async function loadUser(): Promise<User> {
  return { id: 1, name: 'Ann' };
}
type Loaded = Awaited<ReturnType<typeof loadUser>>; // User`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Все утилиты — обычные mapped и conditional types из `lib.d.ts`, их можно открыть и прочитать. Тонкость: `Pick` проверяет, что ключи существуют, а `Omit` — нет: `Omit<User, \'typo\'>` компилируется молча.',
          en: 'All utilities are ordinary mapped and conditional types from `lib.d.ts` — you can open and read them. A subtlety: `Pick` checks that the keys exist, `Omit` doesn’t: `Omit<User, \'typo\'>` compiles silently.',
        },
      },
    ],
    keyPoints: [
      {
        ru: '`Partial`, `Required`, `Readonly` меняют модификаторы всех полей, поверхностно.',
        en: '`Partial`, `Required`, `Readonly` change modifiers of all fields, shallowly.',
      },
      { ru: '`Pick` выбирает поля, `Omit` убирает; `Omit` не проверяет ключи.', en: '`Pick` selects fields, `Omit` removes them; `Omit` doesn’t check keys.' },
      { ru: '`Record<K, V>` — объект с ключами `K` и значениями `V`.', en: '`Record<K, V>` is an object with keys `K` and values `V`.' },
      {
        ru: '`Exclude`/`Extract` фильтруют union, `NonNullable` убирает `null` и `undefined`.',
        en: '`Exclude`/`Extract` filter a union, `NonNullable` removes `null` and `undefined`.',
      },
      {
        ru: '`ReturnType`, `Parameters`, `Awaited` достают типы из функций и промисов.',
        en: '`ReturnType`, `Parameters`, `Awaited` extract types from functions and promises.',
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Utility Types', url: `${HANDBOOK}/utility-types.html` }],
  },
  {
    tag: 'conditional-types',
    summary: {
      ru: '`T extends U ? X : Y` — условие на уровне типов, а `infer` позволяет «достать» часть типа.',
      en: '`T extends U ? X : Y` is a condition at the type level, and `infer` lets you pull out part of a type.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Условный тип выбирает ветку по совместимости типов. Если `T` — «голый» параметр и в него подставлен union, условие применяется к каждому члену отдельно ([[distributive|дистрибутивность]]) — на этом построен `Exclude`. Обёртка в кортеж `[T] extends [U]` дистрибутивность отключает.',
          en: 'A conditional type picks a branch by type compatibility. If `T` is a “naked” parameter and a union is passed, the condition applies to each member separately ([[distributive|distributivity]]) — that’s how `Exclude` works. Wrapping in a tuple `[T] extends [U]` turns distributivity off.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type IsString<T> = T extends string ? true : false;
type A = IsString<'hi'>; // true
type B = IsString<string | number>; // boolean (true | false)

type NoDistribute<T> = [T] extends [string] ? true : false;
type E = NoDistribute<string | number>; // false`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`infer` объявляет переменную типа внутри условия: «если `T` — массив чего-то, назови это `Item`». Так устроены `ReturnType`, `Parameters` и `Awaited`. Пока `T` не известен (внутри [[generic|дженерик]]-функции), условный тип не вычисляется — это частая причина «непонятных» ошибок.',
          en: '`infer` declares a type variable inside the condition: “if `T` is an array of something, call it `Item`”. That’s how `ReturnType`, `Parameters` and `Awaited` work. While `T` is unknown (inside a [[generic|generic]] function), a conditional type isn’t resolved — a common source of “weird” errors.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type ElementType<T> = T extends (infer Item)[] ? Item : T;
type C = ElementType<number[]>; // number
type D = ElementType<string>; // string`,
        },
      },
    ],
    keyPoints: [
      { ru: '`T extends U ? X : Y` — ветка по совместимости типов.', en: '`T extends U ? X : Y` picks a branch by type compatibility.' },
      {
        ru: 'Голый параметр + union = условие для каждого члена (дистрибутивность).',
        en: 'Naked parameter + union = the condition per member (distributivity).',
      },
      { ru: '`[T] extends [U]` отключает дистрибутивность.', en: '`[T] extends [U]` turns distributivity off.' },
      { ru: '`infer` достаёт часть типа: элемент массива, результат функции.', en: '`infer` extracts part of a type: an array element, a function result.' },
      {
        ru: '`never` на входе дистрибутивного условия даёт `never`.',
        en: '`never` passed to a distributive condition gives `never`.',
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Conditional Types', url: `${HANDBOOK}/2/conditional-types.html` }],
  },
  {
    tag: 'mapped-types',
    summary: {
      ru: 'Mapped type проходит по ключам и строит новый объектный тип: `{ [K in keyof T]: … }`.',
      en: 'A mapped type iterates over keys and builds a new object type: `{ [K in keyof T]: … }`.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`[K in keyof T]` перебирает ключи, `T[K]` — тип значения по ключу. Модификаторы `readonly` и `?` можно добавлять (`+`) и снимать (`-`). `Partial`, `Readonly`, `Pick` и `Record` — mapped types из стандартной библиотеки.',
          en: '`[K in keyof T]` iterates over keys, `T[K]` is the value type at a key. The `readonly` and `?` modifiers can be added (`+`) and removed (`-`). `Partial`, `Readonly`, `Pick` and `Record` are mapped types from the standard library.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type User = { id: number; name: string };

type Nullable<T> = { [K in keyof T]: T[K] | null };
type MaybeUser = Nullable<User>; // { id: number | null; name: string | null }

type Mutable<T> = { -readonly [K in keyof T]: T[K] };`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ремаппинг `as` переименовывает ключи (вместе с template literal types) или выкидывает их: ключ, превратившийся в `never`, исчезает из результата.',
          en: 'Key remapping with `as` renames keys (together with template literal types) or drops them: a key that turns into `never` disappears from the result.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type UserGetters = Getters<User>; // { getId: () => number; getName: () => string }

type OnlyStrings<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] };
type Names = OnlyStrings<User>; // { name: string }`,
        },
      },
    ],
    keyPoints: [
      { ru: '`{ [K in keyof T]: … }` — пройти по ключам `T`.', en: '`{ [K in keyof T]: … }` iterates over the keys of `T`.' },
      { ru: '`T[K]` — тип значения по ключу.', en: '`T[K]` is the value type at a key.' },
      { ru: '`+`/`-` перед `readonly` и `?` меняют модификаторы.', en: '`+`/`-` before `readonly` and `?` change modifiers.' },
      { ru: '`as` переименовывает ключи, `as never` — удаляет.', en: '`as` renames keys, `as never` removes them.' },
      {
        ru: '`Partial`, `Readonly`, `Pick`, `Record` — mapped types из стандартной библиотеки.',
        en: '`Partial`, `Readonly`, `Pick`, `Record` are mapped types from the standard library.',
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Mapped Types', url: `${HANDBOOK}/2/mapped-types.html` },
      { title: 'TypeScript Handbook — Template Literal Types', url: `${HANDBOOK}/2/template-literal-types.html` },
    ],
  },
  {
    tag: 'keyof-typeof',
    summary: {
      ru: '`typeof` берёт тип у значения, `keyof` — union ключей типа. Вместе они выводят типы из констант без дублирования.',
      en: '`typeof` takes the type of a value, `keyof` the union of a type’s keys. Together they derive types from constants without duplication.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`typeof` в позиции типа — не JS-оператор, а запрос «какой тип у этого значения». `as const` делает литералы узкими и `readonly`: без него массив ролей был бы просто `string[]`. Индексированный доступ `(typeof ROLES)[number]` даёт union элементов.',
          en: '`typeof` in a type position isn’t the JS operator but a query “what’s the type of this value”. `as const` makes literals narrow and `readonly`: without it the roles array would be just `string[]`. Indexed access `(typeof ROLES)[number]` gives the union of elements.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `const config = { host: 'localhost', port: 8080 };
type Config = typeof config; // { host: string; port: number }
type ConfigKey = keyof Config; // 'host' | 'port'

const ROLES = ['admin', 'editor', 'viewer'] as const;
type Role = (typeof ROLES)[number]; // 'admin' | 'editor' | 'viewer'

const STATUS = { active: 1, blocked: 2 } as const;
type StatusName = keyof typeof STATUS; // 'active' | 'blocked'
type StatusCode = (typeof STATUS)[StatusName]; // 1 | 2`,
        },
        caption: {
          ru: 'Список значений живёт в коде, тип выводится из него — источник правды один.',
          en: 'The list of values lives in code and the type is derived from it — one source of truth.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'У типа с индексной сигнатурой `{ [key: string]: boolean }` `keyof` даёт `string | number`: в JavaScript числовые ключи объекта всё равно становятся строками.',
          en: 'For a type with an index signature `{ [key: string]: boolean }`, `keyof` gives `string | number`: in JavaScript numeric object keys become strings anyway.',
        },
      },
    ],
    keyPoints: [
      { ru: '`typeof` в типе — тип значения, а не JS-оператор.', en: '`typeof` in a type is the type of a value, not the JS operator.' },
      { ru: '`keyof T` — union ключей типа.', en: '`keyof T` is the union of a type’s keys.' },
      { ru: '`as const` сужает литералы и делает их `readonly`.', en: '`as const` narrows literals and makes them `readonly`.' },
      {
        ru: '`(typeof ARR)[number]` — union элементов массива-константы.',
        en: '`(typeof ARR)[number]` is the union of a constant array’s elements.',
      },
      {
        ru: '`keyof` у индексной сигнатуры `string` даёт `string | number`.',
        en: '`keyof` on a `string` index signature gives `string | number`.',
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Keyof Type Operator', url: `${HANDBOOK}/2/keyof-types.html` },
      { title: 'TypeScript Handbook — Typeof Type Operator', url: `${HANDBOOK}/2/typeof-types.html` },
      { title: 'TypeScript Handbook — Indexed Access Types', url: `${HANDBOOK}/2/indexed-access-types.html` },
    ],
  },
  {
    tag: 'satisfies',
    summary: {
      ru: '`satisfies` проверяет значение на соответствие типу и сохраняет выведенный тип, а `as` — утверждение, которое проверку обходит.',
      en: '`satisfies` checks a value against a type and keeps the inferred type, while `as` is an assertion that bypasses the check.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Аннотация `const x: T = …` расширяет тип значения до `T` — точность теряется. `satisfies T` ловит опечатки и лишние ключи так же, как аннотация, но оставляет узкий выведенный тип.',
          en: 'An annotation `const x: T = …` widens the value’s type to `T` — precision is lost. `satisfies T` catches typos and extra keys just like an annotation, but keeps the narrow inferred type.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type Color = 'red' | 'green';
type Palette = Record<Color, string | [number, number, number]>;

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Palette;

palette.green.toUpperCase(); // ok: TS knows it is a string
palette.red[0]; // ok: TS knows it is a tuple

const annotated: Palette = { red: [255, 0, 0], green: '#00ff00' };
// annotated.green.toUpperCase(); // error: string | [number, number, number]`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`as` по существу ничего не проверяет: `{} as User` компилируется, хотя полей нет. Используйте его, только когда знаете больше компилятора — например, какой элемент вернёт `getElementById`. Двойное `as unknown as T` — признак того, что типы описаны неверно. `as const` — отдельная конструкция: она сужает литералы, а не обходит проверку.',
          en: '`as` checks essentially nothing: `{} as User` compiles even though the fields are missing. Use it only when you know more than the compiler — say, which element `getElementById` returns. A double `as unknown as T` is a sign that the types are wrong. `as const` is a different thing: it narrows literals rather than bypassing checks.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `const input = document.getElementById('email') as HTMLInputElement;
const user = {} as { name: string }; // compiles, but name is missing at runtime`,
        },
      },
    ],
    keyPoints: [
      { ru: '`satisfies` проверяет и сохраняет узкий выведенный тип.', en: '`satisfies` checks and keeps the narrow inferred type.' },
      { ru: 'Аннотация `: T` расширяет тип значения до `T`.', en: 'An annotation `: T` widens the value’s type to `T`.' },
      { ru: '`as` — утверждение без проверки: `{} as User` компилируется.', en: '`as` is an unchecked assertion: `{} as User` compiles.' },
      {
        ru: '`as const` — другое: сузить литералы и сделать их `readonly`.',
        en: '`as const` is different: narrow literals and make them `readonly`.',
      },
      { ru: '`as unknown as T` — признак, что типы описаны неверно.', en: '`as unknown as T` signals that the types are wrong.' },
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
    summary: {
      ru: '`enum` — одна из немногих конструкций TypeScript, которая попадает в JavaScript. Часто удобнее union литералов или объект `as const`.',
      en: '`enum` is one of the few TypeScript constructs that emits JavaScript. A union of literals or an `as const` object is often more convenient.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Числовой `enum` компилируется в объект с обратным отображением: по имени получаем число, по числу — имя. У строкового `enum` значения задаются явно, обратного отображения нет. `const enum` подставляется значениями и объекта не оставляет, но плохо совместим с покомпонентной сборкой (Babel, esbuild, `isolatedModules`).',
          en: 'A numeric `enum` compiles to an object with reverse mapping: name to number and number to name. A string `enum` has explicit values and no reverse mapping. A `const enum` is inlined and leaves no object, but it doesn’t play well with per-file compilation (Babel, esbuild, `isolatedModules`).',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `enum Direction {
  Up,
  Down,
}
console.log(Direction.Up, Direction[0]); // 0 Up

enum Status {
  Active = 'active',
  Blocked = 'blocked',
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Union строковых литералов ничего не добавляет в бандл и сравнивается обычными строками. Если нужен ещё и список значений во время выполнения — массив или объект `as const`, из которого выводится тип. С флагом `erasableSyntaxOnly` (TypeScript 5.8) и при запуске TS прямо в Node (type stripping) `enum` недоступны вовсе.',
          en: 'A union of string literals adds nothing to the bundle and compares as plain strings. If you also need a runtime list of values, use an `as const` array or object and derive the type from it. With the `erasableSyntaxOnly` flag (TypeScript 5.8) and when running TS directly in Node (type stripping), `enum` is not available at all.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type Theme = 'light' | 'dark';

const THEMES = ['light', 'dark'] as const;
type ThemeName = (typeof THEMES)[number]; // 'light' | 'dark'`,
        },
      },
    ],
    keyPoints: [
      {
        ru: '`enum` — объект во время выполнения; у числового есть обратное отображение.',
        en: '`enum` is a runtime object; a numeric one has reverse mapping.',
      },
      { ru: 'Строковый `enum` — явные значения, без обратного отображения.', en: 'A string `enum` has explicit values and no reverse mapping.' },
      { ru: '`const enum` инлайнится, но конфликтует с `isolatedModules`.', en: '`const enum` is inlined but conflicts with `isolatedModules`.' },
      { ru: 'Union литералов — ноль кода в бандле.', en: 'A union of literals adds zero code to the bundle.' },
      {
        ru: 'Нужен список во время выполнения — массив или объект `as const`.',
        en: 'Need a runtime list — use an `as const` array or object.',
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Enums', url: `${HANDBOOK}/enums.html` },
      { title: 'TypeScript 5.8 — erasableSyntaxOnly', url: `${HANDBOOK}/release-notes/typescript-5-8.html` },
    ],
  },
  {
    tag: 'structural-typing',
    summary: {
      ru: 'TypeScript сравнивает типы по форме, а не по имени: подходит любой объект, у которого есть нужные поля.',
      en: 'TypeScript compares types by shape, not by name: any object with the required fields fits.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Совместимость определяется составом полей. Экземпляр класса подходит под тип-объект с теми же полями, объект с лишними полями — тоже. Исключение — **проверка лишних свойств**: объектный литерал, переданный напрямую, не может содержать неизвестных полей — так ловятся опечатки.',
          en: 'Compatibility is decided by the set of fields. A class instance fits an object type with the same fields, and so does an object with extra fields. The exception is the **excess property check**: an object literal passed directly can’t contain unknown fields — that catches typos.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type Point = { x: number; y: number };

class Vector {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

function distance(point: Point): number {
  return Math.hypot(point.x, point.y);
}

console.log(distance(new Vector(3, 4))); // 5
const point3d = { x: 1, y: 2, z: 3 };
distance(point3d); // ok: extra fields are allowed
// distance({ x: 1, y: 2, z: 3 }); // error: excess property 'z'`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Обратная сторона: одинаковые по форме, но разные по смыслу типы взаимозаменяемы — `UserId` и `OrderId`, если оба `string`. Различить их помогает **брендирование**: пересечение с полем-меткой, которого нет у обычных строк.',
          en: 'The flip side: types with the same shape but different meaning are interchangeable — `UserId` and `OrderId` if both are `string`. **Branding** tells them apart: an intersection with a marker field that plain strings don’t have.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type UserId = string & { readonly __brand: 'UserId' };
type OrderId = string & { readonly __brand: 'OrderId' };

function loadUser(id: UserId): void {}

const orderId = 'o-1' as OrderId;
// loadUser(orderId); // error: OrderId is not assignable to UserId`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Совместимость типов определяется формой, а не именем.', en: 'Type compatibility is decided by shape, not by name.' },
      { ru: 'Объект с лишними полями подходит, если нужные поля есть.', en: 'An object with extra fields fits if the required fields are there.' },
      {
        ru: 'Лишнее поле в литерале, переданном напрямую, — ошибка.',
        en: 'An extra field in a literal passed directly is an error.',
      },
      {
        ru: 'Классы тоже сравниваются по форме — кроме `private` и `protected` полей.',
        en: 'Classes are compared by shape too — except for `private` and `protected` fields.',
      },
      { ru: 'Различить одинаковые по форме типы помогает брендирование.', en: 'Branding tells apart types with the same shape.' },
    ],
    sources: [
      { title: 'TypeScript Handbook — Type Compatibility', url: `${HANDBOOK}/type-compatibility.html` },
      {
        title: 'TypeScript for OOP programmers — Erased structural types',
        url: `${HANDBOOK}/typescript-in-5-minutes-oop.html#erased-structural-types`,
      },
    ],
  },
];
