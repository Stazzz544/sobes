import type { Question } from '../model/types';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';
const UTILITY = `${HANDBOOK}/utility-types.html`;
const EQUAL = 'type Equal<X, Y> = (<V>() => V extends X ? 1 : 2) extends (<V>() => V extends Y ? 1 : 2) ? true : false;';

export const TYPESCRIPT_QUESTIONS_3: Question[] = [
  {
    id: 'ts-utility-002',
    topic: 'typescript',
    tags: ['utility-types'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой тип получится у `PublicUser`?', en: 'What type does `PublicUser` resolve to?' },
    code: {
      lang: 'ts',
      source: `type User = { id: number; name: string; password: string };
type PublicUser = Omit<User, 'password'>;`,
    },
    options: [
      { code: '{ password: string }' },
      { code: '{ id: number; name: string }' },
      { code: '{ id: number; name: string; password?: string }' },
      { code: '{ id?: number; name?: string }' },
      { code: 'User' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Omit<T, K>` — тип `T` без перечисленных ключей `K`. Его пара — `Pick<T, K>`, который, наоборот, оставляет только `K`. Удобно, чтобы не дублировать описание сущности для API.',
          en: '`Omit<T, K>` is `T` without the listed keys `K`. Its counterpart `Pick<T, K>` keeps only `K`. Handy for not duplicating an entity’s shape for an API.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Нюанс: `Omit` не проверяет, что `K` существует в `T`, — опечатка в имени ключа молча ничего не удалит.',
          en: 'A nuance: `Omit` doesn’t check that `K` exists in `T`, so a typo in the key name silently removes nothing.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Omit<Type, Keys>', url: `${UTILITY}#omittype-keys` },
      { title: 'TypeScript Handbook — Pick<Type, Keys>', url: `${UTILITY}#picktype-keys` },
    ],
    verify: {
      kind: 'ts-check',
      source: `const user: PublicUser = { id: 1, name: 'Ann' };
// @ts-expect-error
const leaked: PublicUser = { id: 1, name: 'Ann', password: 'secret' };
// @ts-expect-error
const partial: PublicUser = { id: 1 };`,
    },
  },
  {
    id: 'ts-utility-003',
    topic: 'typescript',
    tags: ['utility-types'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выдаст компилятор?', en: 'What will the compiler report?' },
    code: {
      lang: 'ts',
      source: `type Role = 'admin' | 'user';
const limits: Record<Role, number> = { admin: 10 };`,
    },
    options: [
      {
        text: {
          ru: 'Ничего: `Record` разрешает любое подмножество ключей',
          en: 'Nothing: `Record` allows any subset of keys',
        },
      },
      {
        text: {
          ru: 'Ошибку: значения в `Record` должны быть строками',
          en: 'An error: `Record` values must be strings',
        },
      },
      {
        text: {
          ru: 'Ошибку: в объекте нет ключа `user`',
          en: 'An error: the object is missing the `user` key',
        },
      },
      {
        text: {
          ru: 'Ошибку: union литералов нельзя использовать как ключи',
          en: 'An error: a union of literals can’t be used as keys',
        },
      },
      {
        text: {
          ru: 'Ничего, а `limits.user` будет равен `0`',
          en: 'Nothing, and `limits.user` will be `0`',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Record<K, V>` — объект, где **каждый** ключ из `K` обязателен и имеет значение типа `V`. С union-литералами это удобная проверка полноты: добавили новую роль — компилятор найдёт все объекты, где её забыли.',
          en: '`Record<K, V>` is an object where **every** key from `K` is required and maps to `V`. With a literal union it doubles as an exhaustiveness check: add a new role and the compiler finds every object that forgot it.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `const partial: Partial<Record<Role, number>> = { admin: 10 }; // ok`,
        },
        caption: {
          ru: 'Если часть ключей необязательна — оберните в `Partial`.',
          en: 'If some keys are optional, wrap it in `Partial`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Record<Keys, Type>', url: `${UTILITY}#recordkeys-type` }],
    verify: { kind: 'ts-error', code: 2741 },
  },
  {
    id: 'ts-utility-004',
    topic: 'typescript',
    tags: ['utility-types'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой тип получится у `User`?', en: 'What type does `User` resolve to?' },
    code: {
      lang: 'ts',
      source: `async function fetchUser() {
  return { id: 1, name: 'Ann' };
}

type User = Awaited<ReturnType<typeof fetchUser>>;`,
    },
    options: [
      { code: 'Promise<{ id: number; name: string }>' },
      { code: '{ id: 1; name: "Ann" }' },
      { code: '() => Promise<{ id: number; name: string }>' },
      { code: '{ id: number; name: string }' },
      { code: 'unknown' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`typeof fetchUser` — тип функции, `ReturnType` достаёт её возвращаемый тип: у async-функции это `Promise<{ id: number; name: string }>`. `Awaited` разворачивает промис (рекурсивно, как `await`).',
          en: '`typeof fetchUser` is the function type, and `ReturnType` extracts its return type: for an async function that’s `Promise<{ id: number; name: string }>`. `Awaited` unwraps the promise (recursively, like `await`).',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Литералов `1` и `"Ann"` в типе нет: свойства объекта расширяются до `number` и `string`. Приём позволяет не описывать тип ответа отдельно, а выводить его из функции.',
          en: 'There are no `1` or `"Ann"` literals: object properties widen to `number` and `string`. The trick lets you derive a response type from the function instead of writing it by hand.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Awaited<Type>', url: `${UTILITY}#awaitedtype` },
      { title: 'TypeScript Handbook — ReturnType<Type>', url: `${UTILITY}#returntypetype` },
    ],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<User, { id: number; name: string }> = true;` },
  },
  {
    id: 'ts-utility-005',
    topic: 'typescript',
    tags: ['utility-types'],
    difficulty: 1,
    popular: false,
    prompt: { ru: 'Что выдаст компилятор?', en: 'What will the compiler report?' },
    code: {
      lang: 'ts',
      source: `type Config = { debug?: boolean };

const config: Readonly<Required<Config>> = { debug: true };
config.debug = false;`,
    },
    options: [
      {
        text: {
          ru: 'Ошибку во второй строке: `debug` обязателен',
          en: 'An error on the second line: `debug` is required',
        },
      },
      {
        text: {
          ru: 'Ошибку в последней строке: `debug` доступен только для чтения',
          en: 'An error on the last line: `debug` is read-only',
        },
      },
      {
        text: {
          ru: 'Ничего: `Readonly` работает только во время выполнения',
          en: 'Nothing: `Readonly` only works at runtime',
        },
      },
      {
        text: {
          ru: 'Ошибку: `Required` и `Readonly` нельзя комбинировать',
          en: 'An error: `Required` and `Readonly` can’t be combined',
        },
      },
      {
        text: {
          ru: 'Ничего при компиляции, но в рантайме объект будет заморожен',
          en: 'Nothing at compile time, but the object is frozen at runtime',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Required` делает поля обязательными, `Readonly` — доступными только для чтения. Присваивание `config.debug = false` даёт ошибку TS2540.',
          en: '`Required` makes fields mandatory and `Readonly` makes them read-only. Assigning `config.debug = false` gives error TS2540.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Это проверка только на этапе компиляции: в JavaScript объект остаётся обычным. Для настоящей [[immutability|неизменяемости]] нужен `Object.freeze` (его тип как раз `Readonly<T>`).',
          en: 'It’s a compile-time check only: in JavaScript the object stays mutable. For real [[immutability|immutability]] you need `Object.freeze` (whose return type is exactly `Readonly<T>`).',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Readonly<Type>', url: `${UTILITY}#readonlytype` },
      { title: 'TypeScript Handbook — Required<Type>', url: `${UTILITY}#requiredtype` },
    ],
    verify: { kind: 'ts-error', code: 2540 },
  },
  {
    id: 'ts-utility-006',
    topic: 'typescript',
    tags: ['utility-types', 'conditional-types'],
    difficulty: 1,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Letters`?', en: 'What type does `Letters` resolve to?' },
    code: { lang: 'ts', source: `type Letters = Exclude<'a' | 'b' | 'c', 'a' | 'z'>;` },
    options: [
      { code: '"a"' },
      { code: '"b" | "c" | "z"' },
      { code: '"z"' },
      { code: 'never' },
      { code: '"b" | "c"' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Exclude<T, U>` убирает из объединения `T` всё, что можно присвоить в `U`. `"z"` в `T` нет, поэтому он ни на что не влияет. Противоположность — `Extract<T, U>`: оставляет только общие члены (`"a"`).',
          en: '`Exclude<T, U>` removes from the union `T` everything assignable to `U`. `"z"` isn’t in `T`, so it has no effect. The opposite is `Extract<T, U>`, which keeps only the common members (`"a"`).',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `type Exclude<T, U> = T extends U ? never : T;`,
        },
        caption: {
          ru: 'Под капотом — дистрибутивный условный тип.',
          en: 'Under the hood it’s a distributive conditional type.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Exclude<UnionType, ExcludedMembers>', url: `${UTILITY}#excludeuniontype-excludedmembers` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Letters, 'b' | 'c'> = true;` },
  },
  {
    id: 'ts-conditional-002',
    topic: 'typescript',
    tags: ['conditional-types'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `T`?', en: 'What type does `T` resolve to?' },
    code: {
      lang: 'ts',
      source: `type FirstArg<F> = F extends (first: infer A, ...rest: any[]) => any ? A : never;

type T = FirstArg<(id: number, name: string) => void>;`,
    },
    options: [
      { code: 'string' },
      { code: '[number, string]' },
      { code: 'never' },
      { code: 'number | string' },
      { code: 'number' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`infer A` объявляет переменную типа прямо внутри условия. Если `F` подходит под шаблон «функция, первый аргумент которой — `A`», TypeScript выводит `A` из реального типа — здесь `number`.',
          en: '`infer A` declares a type variable right inside the condition. If `F` matches the pattern “a function whose first argument is `A`”, TypeScript infers `A` from the actual type — here `number`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Так устроены встроенные `ReturnType`, `Parameters`, `Awaited`.',
          en: 'That’s how the built-in `ReturnType`, `Parameters` and `Awaited` work.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Inferring Within Conditional Types',
        url: `${HANDBOOK}/2/conditional-types.html#inferring-within-conditional-types`,
      },
    ],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<T, number> = true;` },
  },
  {
    id: 'ts-conditional-003',
    topic: 'typescript',
    tags: ['conditional-types'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Result`?', en: 'What type does `Result` resolve to?' },
    code: {
      lang: 'ts',
      source: `type IsString<T> = [T] extends [string] ? true : false;

type A = IsString<string | number>;
type B = IsString<'hello'>;
type Result = [A, B];`,
    },
    options: [
      { code: '[boolean, true]' },
      { code: '[true, true]' },
      { code: '[false, true]' },
      { code: '[never, true]' },
      { code: '[false, false]' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обёртка `[T]` отключает дистрибутивность: объединение `string | number` проверяется целиком, а оно не является подтипом `string` → `false`. Литерал `"hello"` — подтип `string` → `true`.',
          en: 'Wrapping in `[T]` turns distribution off: the union `string | number` is checked as a whole, and it isn’t a subtype of `string` → `false`. The literal `"hello"` is a subtype of `string` → `true`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Без кортежей (`T extends string ? …`) условие применилось бы к каждому члену: `true | false`, то есть `boolean`.',
          en: 'Without tuples (`T extends string ? …`) the condition would apply to each member: `true | false`, i.e. `boolean`.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Distributive Conditional Types',
        url: `${HANDBOOK}/2/conditional-types.html#distributive-conditional-types`,
      },
    ],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Result, [false, true]> = true;` },
  },
  {
    id: 'ts-conditional-004',
    topic: 'typescript',
    tags: ['conditional-types'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Result`?', en: 'What type does `Result` resolve to?' },
    code: {
      lang: 'ts',
      source: `type ToArray<T> = T extends unknown ? T[] : never;

type A = ToArray<string | number>;
type B = ToArray<never>;
type Result = [A, B];`,
    },
    options: [
      { code: '[(string | number)[], never[]]' },
      { code: '[string[] | number[], never[]]' },
      { code: '[(string | number)[], never]' },
      { code: '[string[] | number[], never]' },
      { code: '[unknown[], never]' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[distributive|Дистрибутивный]] условный тип применяется к каждому члену объединения отдельно: `string[] | number[]`, а не `(string | number)[]`.',
          en: 'A [[distributive|distributive]] conditional type is applied to each union member separately: `string[] | number[]`, not `(string | number)[]`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`never` — это пустое объединение. Распределять нечего, поэтому результат — тоже `never`, а не `never[]`. Если нужно иначе, оберните в кортеж: `[T] extends [unknown]`.',
          en: '`never` is the empty union. There’s nothing to distribute over, so the result is `never` too, not `never[]`. To change that, wrap in a tuple: `[T] extends [unknown]`.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Distributive Conditional Types',
        url: `${HANDBOOK}/2/conditional-types.html#distributive-conditional-types`,
      },
    ],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Result, [string[] | number[], never]> = true;` },
  },
  {
    id: 'ts-mapped-001',
    topic: 'typescript',
    tags: ['mapped-types', 'keyof-typeof'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой тип получится у `FeatureFlags`?', en: 'What type does `FeatureFlags` resolve to?' },
    code: {
      lang: 'ts',
      source: `type Flags<T> = { [K in keyof T]: boolean };

type FeatureFlags = Flags<{ darkMode: string; beta: number }>;`,
    },
    options: [
      { code: '{ darkMode: string; beta: number }' },
      { code: 'boolean[]' },
      { code: '{ [key: string]: boolean }' },
      { code: '{ darkMode: boolean; beta: boolean }' },
      { code: 'Record<"darkMode" | "beta", string | number>' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сопоставленный тип (mapped type) проходит по ключам `keyof T` и для каждого задаёт новый тип значения. Ключи сохраняются, а типы значений заменяются на `boolean`.',
          en: 'A mapped type iterates over the keys in `keyof T` and assigns a new value type to each. The keys are kept, and the value types become `boolean`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'На этом построены `Partial`, `Readonly`, `Record` и другие встроенные типы.',
          en: '`Partial`, `Readonly`, `Record` and other built-ins are built on this.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Mapped Types', url: `${HANDBOOK}/2/mapped-types.html` }],
    verify: {
      kind: 'ts-check',
      source: `const flags: FeatureFlags = { darkMode: true, beta: false };
// @ts-expect-error
const wrong: FeatureFlags = { darkMode: 'on', beta: false };`,
    },
  },
  {
    id: 'ts-mapped-002',
    topic: 'typescript',
    tags: ['mapped-types'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `UserGetters`?', en: 'What type does `UserGetters` resolve to?' },
    code: {
      lang: 'ts',
      source: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<{ name: string; age: number }>;`,
    },
    options: [
      { code: '{ name: () => string; age: () => number }' },
      { code: '{ getname: () => string; getage: () => number }' },
      { code: '{ getName: string; getAge: number }' },
      { code: 'never' },
      { code: '{ getName: () => string; getAge: () => number }' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Конструкция `as` в mapped type переименовывает ключи (TypeScript 4.1). Шаблонный литеральный тип собирает новое имя: `get` + `Capitalize<"name">` → `getName`. `string & K` отсекает ключи-числа и символы, которые нельзя вставить в строку.',
          en: 'The `as` clause in a mapped type remaps keys (TypeScript 4.1). A template literal type builds the new name: `get` + `Capitalize<"name">` → `getName`. `string & K` filters out number and symbol keys that can’t go into a string.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Key Remapping via as', url: `${HANDBOOK}/2/mapped-types.html#key-remapping-via-as` },
      { title: 'TypeScript Handbook — Template Literal Types', url: `${HANDBOOK}/2/template-literal-types.html` },
    ],
    verify: {
      kind: 'ts-check',
      source: `const getters: UserGetters = { getName: () => 'Ann', getAge: () => 30 };
// @ts-expect-error
const lower: UserGetters = { getname: () => 'Ann', getage: () => 30 };`,
    },
  },
  {
    id: 'ts-mapped-003',
    topic: 'typescript',
    tags: ['mapped-types', 'utility-types'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Settings`?', en: 'What type does `Settings` resolve to?' },
    code: {
      lang: 'ts',
      source: `type Mutable<T> = { -readonly [K in keyof T]-?: T[K] };

type Settings = Mutable<{ readonly theme?: 'light' | 'dark' }>;`,
    },
    options: [
      { code: '{ readonly theme?: "light" | "dark" }' },
      { code: '{ theme: "light" | "dark" }' },
      { code: '{ theme?: "light" | "dark" }' },
      { code: '{ readonly theme: "light" | "dark" }' },
      { code: '{ theme: "light" | "dark" | undefined }' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В mapped type модификаторы можно не только добавлять, но и снимать префиксом `-`. `-readonly` убирает «только для чтения», `-?` делает поле обязательным и вычитает из его типа `undefined`.',
          en: 'In a mapped type you can remove modifiers as well as add them, with a `-` prefix. `-readonly` drops read-only, and `-?` makes the field required and removes `undefined` from its type.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Встроенный `Required<T>` объявлен именно через `-?`.',
          en: 'The built-in `Required<T>` is declared with exactly that `-?`.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Mapping Modifiers', url: `${HANDBOOK}/2/mapped-types.html#mapping-modifiers` },
    ],
    verify: {
      kind: 'ts-check',
      source: `const settings: Settings = { theme: 'dark' };
settings.theme = 'light';
// @ts-expect-error
const empty: Settings = {};
// @ts-expect-error
const missing: Settings = { theme: undefined };`,
    },
  },
  {
    id: 'ts-keyof-001',
    topic: 'typescript',
    tags: ['keyof-typeof'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой тип получится у `ConfigKey`?', en: 'What type does `ConfigKey` resolve to?' },
    code: {
      lang: 'ts',
      source: `const config = { host: 'localhost', port: 8080 };
type ConfigKey = keyof typeof config;`,
    },
    options: [
      { code: 'string' },
      { code: '"localhost" | 8080' },
      { code: 'string | number' },
      { code: '"host" | "port"' },
      { code: '{ host: string; port: number }' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`typeof config` в позиции типа берёт тип значения: `{ host: string; port: number }`. `keyof` превращает тип объекта в объединение его ключей.',
          en: '`typeof config` in a type position takes the type of the value: `{ host: string; port: number }`. `keyof` turns an object type into a union of its keys.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Связка `keyof typeof` позволяет описать тип ключей по существующему объекту, не дублируя их вручную.',
          en: 'The `keyof typeof` combo describes the key type from an existing object without duplicating the keys by hand.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Keyof Type Operator', url: `${HANDBOOK}/2/keyof-types.html` },
      { title: 'TypeScript Handbook — Typeof Type Operator', url: `${HANDBOOK}/2/typeof-types.html` },
    ],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<ConfigKey, 'host' | 'port'> = true;` },
  },
];
