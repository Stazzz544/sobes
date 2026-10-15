import type { Question } from '../model/types';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';
const EQUAL = 'type Equal<X, Y> = (<V>() => V extends X ? 1 : 2) extends (<V>() => V extends Y ? 1 : 2) ? true : false;';

export const TYPESCRIPT_QUESTIONS_7: Question[] = [
  {
    id: 'ts-narrowing-008',
    topic: 'typescript',
    tags: ['narrowing', 'any-unknown-never'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой тип будет у `rest` в ветке `default`?', en: 'What is the type of `rest` in the `default` branch?' },
    code: {
      lang: 'ts',
      source: `type Shape = { kind: 'circle'; r: number } | { kind: 'square'; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.r ** 2;
    case 'square':
      return shape.side ** 2;
    default: {
      const rest = shape;
      return rest;
    }
  }
}`,
    },
    options: [{ code: 'Shape' }, { code: 'never' }, { code: 'unknown' }, { code: '{ kind: string; }' }, { code: 'undefined' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждый `case` отсекает вариант объединения по полю `kind`. Когда разобраны все, в `default` не остаётся ничего — тип `never`. Это и есть проверка полноты: если добавить `{ kind: "triangle" }` и забыть `case`, `rest` станет треугольником, и `return rest` (где ждут `number`) или явное `const check: never = shape` не скомпилируются. Компилятор сам укажет на забытый вариант.',
          en: 'Each `case` removes a union member by the `kind` field. Once all are handled, nothing is left in `default` — the type is `never`. That’s exhaustiveness checking: add `{ kind: "triangle" }` and forget its `case`, and `rest` becomes the triangle, so `return rest` (where `number` is expected) or an explicit `const check: never = shape` fails to compile. The compiler points at the forgotten variant itself.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Exhaustiveness checking', url: `${HANDBOOK}/2/narrowing.html#exhaustiveness-checking` }],
    verify: { kind: 'ts-type', symbol: 'rest' },
  },
  {
    id: 'ts-generics-006',
    topic: 'typescript',
    tags: ['generics'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой тип будет у `value`?', en: 'What is the type of `value`?' },
    code: {
      lang: 'ts',
      source: `const first = <T,>(items: T[]) => items[0];
const value = first([1, 'a']);`,
    },
    options: [{ code: 'number' }, { code: 'string | number' }, { code: 'unknown' }, { code: 'any' }, { code: '[number, string]' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'TypeScript выводит `T` из аргумента: у массива `[1, "a"]` тип элементов — объединение `string | number`. Функция возвращает `T`, поэтому `value` — `string | number`, а не тип первого элемента: типы не знают, что лежит по индексу 0. Заметьте ещё: с `noUncheckedIndexedAccess` `items[0]` получил бы `| undefined` — массив может быть пустым.',
          en: 'TypeScript infers `T` from the argument: the array `[1, "a"]` has the element type `string | number`. The function returns `T`, so `value` is `string | number`, not the first element’s type: types don’t know what sits at index 0. Also note: with `noUncheckedIndexedAccess`, `items[0]` would get `| undefined` — the array could be empty.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Generics: type argument inference', url: `${HANDBOOK}/2/generics.html` }],
    verify: { kind: 'ts-type', symbol: 'value' },
  },
  {
    id: 'ts-utility-009',
    topic: 'typescript',
    tags: ['utility-types'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Result`?', en: 'What is the type of `Result`?' },
    code: {
      lang: 'ts',
      source: `type User = { id: number; name: string };

async function fetchUser(): Promise<User> {
  return { id: 1, name: 'Ann' };
}

type Result = Awaited<ReturnType<typeof fetchUser>>;`,
    },
    options: [{ code: 'Promise<User>' }, { code: 'User' }, { code: '() => Promise<User>' }, { code: 'Promise<unknown>' }, { code: 'unknown' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`typeof fetchUser` — тип функции, `ReturnType` достаёт из него возвращаемый тип — `Promise<User>`, а `Awaited` разворачивает промис, в том числе вложенный. Получается `User`. Связка удобна, когда тип не экспортирован, а функция есть: тип ответа не дублируется руками и сам обновится, если поменяется функция.',
          en: '`typeof fetchUser` is the function type, `ReturnType` extracts its return type — `Promise<User>` — and `Awaited` unwraps the promise, including nested ones. The result is `User`. The combo helps when a type isn’t exported but the function is: the response type isn’t duplicated by hand and updates itself when the function changes.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Awaited<Type>', url: `${HANDBOOK}/utility-types.html#awaitedtype` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Result, User> = true;` },
  },
  {
    id: 'ts-utility-010',
    topic: 'typescript',
    tags: ['utility-types', 'narrowing'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Round`?', en: 'What is the type of `Round`?' },
    code: {
      lang: 'ts',
      source: `type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; side: number }
  | { kind: 'line'; length: number };

type Round = Extract<Shape, { kind: 'circle' }>;`,
    },
    options: [
      { code: "{ kind: 'circle' }" },
      { code: "{ kind: 'circle'; r: number }" },
      { code: 'Shape' },
      { code: "{ kind: 'square'; side: number } | { kind: 'line'; length: number }" },
      { code: 'never' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Extract<T, U>` оставляет члены объединения `T`, которые совместимы с `U`. Под `{ kind: "circle" }` подходит только вариант круга — и он остаётся целиком, со всеми своими полями. `Exclude<Shape, { kind: "circle" }>` дал бы обратное: квадрат и линию. Так получают тип одного варианта из размеченного объединения, не объявляя его отдельно.',
          en: '`Extract<T, U>` keeps the members of the union `T` that are assignable to `U`. Only the circle variant fits `{ kind: "circle" }` — and it stays whole, with all its fields. `Exclude<Shape, { kind: "circle" }>` would give the opposite: square and line. This is how you get one variant’s type out of a discriminated union without declaring it separately.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Extract<Type, Union>', url: `${HANDBOOK}/utility-types.html#extracttype-union` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Round, { kind: 'circle'; r: number }> = true;` },
  },
  {
    id: 'ts-conditional-005',
    topic: 'typescript',
    tags: ['conditional-types'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `R`?', en: 'What is the type of `R`?' },
    code: {
      lang: 'ts',
      source: `type ElementOf<T> = T extends (infer U)[] ? U : never;

type R = ElementOf<string[] | number>;`,
    },
    options: [{ code: 'string' }, { code: 'string | number' }, { code: 'never' }, { code: 'string[]' }, { code: 'unknown' }],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`infer U` вытаскивает тип элемента из массива. Условный тип над «голым» параметром распределяется по объединению: `ElementOf<string[]> | ElementOf<number>` = `string | never`, а `never` из объединения исчезает. Остаётся `string`. Чтобы условие проверялось для объединения целиком, параметр оборачивают: `[T] extends [(infer U)[]]` — тогда результат был бы `never`.',
          en: '`infer U` pulls the element type out of an array. A conditional type over a “naked” parameter distributes over a union: `ElementOf<string[]> | ElementOf<number>` = `string | never`, and `never` drops out of the union. What remains is `string`. To check the union as a whole, wrap the parameter: `[T] extends [(infer U)[]]` — then the result would be `never`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Inferring within conditional types', url: `${HANDBOOK}/2/conditional-types.html#inferring-within-conditional-types` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<R, string> = true;` },
  },
  {
    id: 'ts-mapped-005',
    topic: 'typescript',
    tags: ['mapped-types', 'conditional-types'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Texts`?', en: 'What is the type of `Texts`?' },
    code: {
      lang: 'ts',
      source: `type User = { id: number; name: string; email: string; active: boolean };

type OnlyStrings<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] };

type Texts = OnlyStrings<User>;`,
    },
    options: [
      { code: '{ name: string; email: string }' },
      { code: '{ id: never; name: string; email: string; active: never }' },
      { code: 'User' },
      { code: "'name' | 'email'" },
      { code: '{ name: string | never; email: string | never }' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Секция `as` в mapped type переименовывает ключи, а ключ, превращённый в `never`, **выбрасывается** из результата. Поэтому `id` и `active` не остаются со значением `never`, а исчезают совсем. Так строят «выбрать поля по типу значения»: только строковые поля для поиска, только функции для моков, только опциональные для формы.',
          en: 'The `as` clause in a mapped type remaps keys, and a key remapped to `never` is **dropped** from the result. So `id` and `active` don’t stay with a `never` value — they disappear entirely. This is how you build “pick fields by value type”: only string fields for search, only functions for mocks, only optional ones for a form.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Key remapping via as', url: `${HANDBOOK}/2/mapped-types.html#key-remapping-via-as` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Texts, { name: string; email: string }> = true;` },
  },
  {
    id: 'ts-satisfies-003',
    topic: 'typescript',
    tags: ['satisfies'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выдаст компилятор?', en: 'What does the compiler report?' },
    code: {
      lang: 'ts',
      source: `const routes = { home: '/', about: '/about' } satisfies Record<string, string>;

const path = routes.contact;`,
    },
    options: [
      { text: { ru: 'Ошибок нет: у `Record<string, string>` есть любой ключ', en: 'No errors: `Record<string, string>` has any key' } },
      {
        text: {
          ru: 'Ошибку: у `routes` нет свойства `contact` — тип объекта остался точным',
          en: 'An error: `routes` has no `contact` property — the object’s type stayed precise',
        },
      },
      { text: { ru: 'Ошибку: `satisfies` нельзя применять к объектам', en: 'An error: `satisfies` can’t be applied to objects' } },
      { text: { ru: '`path` получит тип `string | undefined`', en: '`path` gets the type `string | undefined`' } },
      { text: { ru: 'Ошибку в рантайме', en: 'A runtime error' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`satisfies` проверяет, что значение подходит под `Record<string, string>`, но **не меняет** его тип: он остаётся `{ home: string; about: string }`, и обращение к несуществующему ключу ловится сразу. С аннотацией `const routes: Record<string, string>` тип расширился бы до словаря, и `routes.contact` молча скомпилировался бы. В этом и разница: проверка без потери точности.',
          en: '`satisfies` checks that the value fits `Record<string, string>` but **doesn’t change** its type: it stays `{ home: string; about: string }`, and accessing a missing key is caught right away. With the annotation `const routes: Record<string, string>` the type would widen to a dictionary, and `routes.contact` would compile silently. That’s the difference: checking without losing precision.',
        },
      },
    ],
    sources: [{ title: 'TypeScript 4.9 — The satisfies operator', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator' }],
    verify: { kind: 'ts-error', code: 2339 },
  },
  {
    id: 'ts-structural-004',
    topic: 'typescript',
    tags: ['structural-typing'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выдаст компилятор?', en: 'What does the compiler report?' },
    code: {
      lang: 'ts',
      source: `type User = { name: string };

const draft = { name: 'Ann', age: 30 };
const fromVariable: User = draft;
const fromLiteral: User = { name: 'Ann', age: 30 };`,
    },
    options: [
      { text: { ru: 'Ошибок нет', en: 'No errors' } },
      { text: { ru: 'Ошибки в обеих строках с `User`', en: 'Errors on both lines with `User`' } },
      { text: { ru: 'Ошибку только в строке с `fromVariable`', en: 'An error only on the `fromVariable` line' } },
      {
        text: {
          ru: 'Ошибку только в строке с `fromLiteral`: у литерала лишнее свойство `age`',
          en: 'An error only on the `fromLiteral` line: the literal has an extra property `age`',
        },
      },
      { text: { ru: 'Ошибку: `age` должен быть `string`', en: 'An error: `age` must be a `string`' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[structural-typing|Структурная типизация]] разрешает лишние поля: `draft` подходит под `User`, раз у него есть `name`. Но для **свежего** объектного литерала TypeScript дополнительно проверяет лишние свойства — почти всегда это опечатка или забытое поле в типе. Литерал, сначала сохранённый в переменную, этой проверки уже не проходит, поэтому опечатки в объектах опций лучше ловить, передавая литерал напрямую.',
          en: '[[structural-typing|Structural typing]] allows extra fields: `draft` fits `User` since it has `name`. But for a **fresh** object literal TypeScript additionally checks for excess properties — almost always a typo or a field missing from the type. A literal first stored in a variable no longer gets this check, so typos in option objects are best caught by passing the literal directly.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Excess property checks', url: `${HANDBOOK}/2/objects.html#excess-property-checks` }],
    verify: { kind: 'ts-error', code: 2353 },
  },
  {
    id: 'ts-never-003',
    topic: 'typescript',
    tags: ['any-unknown-never'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой тип будет у `port`?', en: 'What is the type of `port`?' },
    code: {
      lang: 'ts',
      source: `function fail(message: string): never {
  throw new Error(message);
}

declare const input: string;
const port = input ? Number(input) : fail('PORT is required');`,
    },
    options: [{ code: 'number | never' }, { code: 'number' }, { code: 'number | undefined' }, { code: 'never' }, { code: 'unknown' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Функция с типом `never` никогда не возвращает управление — она бросает исключение или зацикливается. В объединении `never` исчезает, поэтому `number | never` — это просто `number`, и дальше `port` не нужно проверять на `undefined`. Такие функции удобны для обязательных настроек и проверок вида `assertUnreachable(x: never)`.',
          en: 'A function typed `never` never returns control — it throws or loops forever. `never` vanishes in a union, so `number | never` is just `number`, and `port` needs no `undefined` check afterward. Such functions are handy for required settings and checks like `assertUnreachable(x: never)`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — never', url: `${HANDBOOK}/2/functions.html#never` }],
    verify: { kind: 'ts-type', symbol: 'port' },
  },
  {
    id: 'ts-generics-007',
    topic: 'typescript',
    tags: ['generics', 'enums'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип будет у `pair` в TypeScript 5.0+?', en: 'What is the type of `pair` in TypeScript 5.0+?' },
    code: {
      lang: 'ts',
      source: `function tuple<const T extends readonly unknown[]>(items: T): T {
  return items;
}

const pair = tuple(['a', 1]);`,
    },
    options: [
      { code: '(string | number)[]' },
      { code: '[string, number]' },
      { code: 'readonly ["a", 1]' },
      { code: 'unknown[]' },
      { code: 'readonly (string | number)[]' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модификатор `const` у параметра типа заставляет выводить `T` так, будто аргумент записан с `as const`: литералы `"a"` и `1` сохраняются, а массив становится кортежем только для чтения. Без `const` получилось бы `(string | number)[]`. Приём избавляет пользователей функции от необходимости писать `as const` у каждого вызова — так делают библиотеки маршрутов и схем.',
          en: 'The `const` modifier on a type parameter infers `T` as if the argument were written with `as const`: the literals `"a"` and `1` are kept, and the array becomes a readonly tuple. Without `const` you’d get `(string | number)[]`. It spares the function’s users from writing `as const` at every call — routing and schema libraries do this.',
        },
      },
    ],
    sources: [{ title: 'TypeScript 5.0 — const type parameters', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters' }],
    verify: { kind: 'ts-type', symbol: 'pair' },
  },
];
