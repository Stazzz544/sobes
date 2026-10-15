import type { Question } from '../model/types';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';
const EQUAL = 'type Equal<X, Y> = (<V>() => V extends X ? 1 : 2) extends (<V>() => V extends Y ? 1 : 2) ? true : false;';

export const TYPESCRIPT_QUESTIONS_6: Question[] = [
  {
    id: 'ts-narrowing-006',
    topic: 'typescript',
    tags: ['narrowing'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой тип будет у `inside`?', en: 'What is the type of `inside`?' },
    code: {
      lang: 'ts',
      source: `type Cat = { meow(): void };
type Dog = { bark(): void };
declare const pet: Cat | Dog;

if ('bark' in pet) {
  const inside = pet;
}`,
    },
    options: [{ code: 'Cat' }, { code: 'Dog' }, { code: 'Cat | Dog' }, { code: 'never' }, { code: 'unknown' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Оператор `in` сужает объединение: внутри `if` остаются только варианты, у которых может быть свойство `bark`, — это `Dog`. В ветке `else` останется `Cat`. Так различают объекты без общего поля-дискриминатора; если такое поле есть (`kind: \'cat\'`), удобнее сужать по нему.',
          en: 'The `in` operator narrows a union: inside the `if` only variants that may have `bark` remain — that’s `Dog`. The `else` branch keeps `Cat`. It distinguishes objects without a shared discriminant field; if there is one (`kind: \'cat\'`), narrowing by it is more convenient.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — The in operator narrowing', url: `${HANDBOOK}/2/narrowing.html#the-in-operator-narrowing` }],
    verify: { kind: 'ts-type', symbol: 'inside' },
  },
  {
    id: 'ts-narrowing-007',
    topic: 'typescript',
    tags: ['narrowing'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип будет у `after`?', en: 'What is the type of `after`?' },
    code: {
      lang: 'ts',
      source: `function assertDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value == null) {
    throw new Error('missing');
  }
}

declare const user: { name: string } | undefined;
assertDefined(user);
const after = user;`,
    },
    options: [
      { code: '{ name: string; } | undefined' },
      { code: '{ name: string; }' },
      { code: 'NonNullable<T>' },
      { code: 'never' },
      { code: 'unknown' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Функция-утверждение** с `asserts value is …` сообщает компилятору: если она вернула управление, условие выполнено. Поэтому после вызова `user` сужен до `{ name: string }` без `if`. Это удобно для проверок в начале функции и в тестах. Главное — чтобы реализация действительно бросала ошибку: компилятор верит сигнатуре на слово.',
          en: 'An **assertion function** with `asserts value is …` tells the compiler: if it returns, the condition holds. So after the call `user` is narrowed to `{ name: string }` without an `if`. Handy for checks at the top of a function and in tests. The implementation must actually throw: the compiler takes the signature at its word.',
        },
      },
    ],
    sources: [{ title: 'TypeScript 3.7 — Assertion Functions', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions' }],
    verify: { kind: 'ts-type', symbol: 'after' },
  },
  {
    id: 'ts-generics-005',
    topic: 'typescript',
    tags: ['generics'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип будет у `result`?', en: 'What is the type of `result`?' },
    code: {
      lang: 'ts',
      source: `function first<const T extends readonly unknown[]>(items: T): T[0] {
  return items[0];
}

const result = first(['admin', 'user']);`,
    },
    options: [{ code: 'string' }, { code: '"admin"' }, { code: 'unknown' }, { code: '"admin" | "user"' }, { code: 'string[]' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модификатор `const` у параметра типа (TypeScript 5.0+) выводит аргумент так, будто его написали с `as const`: массив становится кортежем `readonly ["admin", "user"]`, и `T[0]` — литерал `"admin"`. Без `const` вывелся бы `string[]`, а результат — `string`. Так библиотеки сохраняют точные литералы без `as const` у вызывающего.',
          en: 'The `const` modifier on a type parameter (TypeScript 5.0+) infers the argument as if written with `as const`: the array becomes the tuple `readonly ["admin", "user"]`, and `T[0]` is the literal `"admin"`. Without `const` it would infer `string[]`, giving `string`. Libraries use this to keep exact literals without callers writing `as const`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript 5.0 — const Type Parameters', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters' }],
    verify: { kind: 'ts-type', symbol: 'result' },
  },
  {
    id: 'ts-utility-007',
    topic: 'typescript',
    tags: ['utility-types'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой тип получится у `User`?', en: 'What type does `User` resolve to?' },
    code: {
      lang: 'ts',
      source: `async function fetchUser() {
  return { id: 1, name: 'Anna' };
}

type User = Awaited<ReturnType<typeof fetchUser>>;`,
    },
    options: [
      { code: 'Promise<{ id: number; name: string }>' },
      { code: '{ id: number; name: string }' },
      { code: '{ id: 1; name: "Anna" }' },
      { code: 'typeof fetchUser' },
      { code: 'unknown' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`typeof fetchUser` — тип функции, `ReturnType` достаёт тип результата — `Promise<{ id: number; name: string }>`, а `Awaited` разворачивает промис. Так тип выводят из реализации и не дублируют руками. Литеральных типов `1` и `"Anna"` не будет: поля объекта без `as const` расширяются до `number` и `string`.',
          en: '`typeof fetchUser` is the function type, `ReturnType` extracts the result type — `Promise<{ id: number; name: string }>`, and `Awaited` unwraps the promise. This derives the type from the implementation instead of duplicating it. There won’t be literal types `1` and `"Anna"`: object fields without `as const` widen to `number` and `string`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Utility Types', url: `${HANDBOOK}/utility-types.html` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<User, { id: number; name: string }> = true;` },
  },
  {
    id: 'ts-utility-008',
    topic: 'typescript',
    tags: ['utility-types'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Options`?', en: 'What type does `Options` resolve to?' },
    code: {
      lang: 'ts',
      source: `function createChart(element: HTMLElement, options: { type: 'bar' | 'line'; animate?: boolean }) {}

type Options = Parameters<typeof createChart>[1];`,
    },
    options: [
      { code: 'HTMLElement' },
      { code: "{ type: 'bar' | 'line'; animate?: boolean }" },
      { code: "[HTMLElement, { type: 'bar' | 'line'; animate?: boolean }]" },
      { code: 'void' },
      { code: 'unknown' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Parameters<F>` возвращает кортеж типов параметров функции, а `[1]` берёт второй. Так достают тип опций сторонней библиотеки, если он не экспортирован, — без копирования описания. Похожие помощники: `ReturnType`, `ConstructorParameters`, `InstanceType`.',
          en: '`Parameters<F>` returns a tuple of a function’s parameter types, and `[1]` takes the second. That’s how you get a third-party library’s options type when it isn’t exported — without copying it. Similar helpers: `ReturnType`, `ConstructorParameters`, `InstanceType`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Utility Types: Parameters', url: `${HANDBOOK}/utility-types.html#parameterstype` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Options, { type: 'bar' | 'line'; animate?: boolean }> = true;` },
  },
  {
    id: 'ts-keyof-004',
    topic: 'typescript',
    tags: ['keyof-typeof', 'mapped-types'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Handler`?', en: 'What type does `Handler` resolve to?' },
    code: {
      lang: 'ts',
      source: `type EventName = 'click' | 'focus';
type Handler = \`on\${Capitalize<EventName>}\`;`,
    },
    options: [
      { code: '"onclick" | "onfocus"' },
      { code: '"onClick" | "onFocus"' },
      { code: 'string' },
      { code: '"onClick"' },
      { code: '`on${string}`' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Шаблонные литеральные типы** собирают строки на уровне типов, а объединение раскрывается в каждую комбинацию: два события дают два имени обработчика. `Capitalize`, `Uncapitalize`, `Uppercase`, `Lowercase` — встроенные преобразования. Вместе с mapped types так генерируют, например, `onClick`/`onFocus` для пропсов из списка событий.',
          en: '**Template literal types** build strings at the type level, and a union expands into every combination: two events give two handler names. `Capitalize`, `Uncapitalize`, `Uppercase`, `Lowercase` are built-in transforms. Combined with mapped types they generate, say, `onClick`/`onFocus` props from a list of events.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Template Literal Types', url: `${HANDBOOK}/2/template-literal-types.html` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Handler, 'onClick' | 'onFocus'> = true;` },
  },
  {
    id: 'ts-literal-002',
    topic: 'typescript',
    tags: ['enums', 'keyof-typeof'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой тип будет у `mode`?', en: 'What is the type of `mode`?' },
    code: {
      lang: 'ts',
      source: `const config = { mode: 'dark', retries: 3 } as const;
const mode = config.mode;`,
    },
    options: [{ code: 'string' }, { code: '"dark"' }, { code: '"dark" | "light"' }, { code: 'readonly string' }, { code: 'unknown' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Без `as const` поля объекта расширяются до `string` и `number`, ведь их можно изменить. `as const` делает объект целиком `readonly` и сохраняет литералы: `mode` — именно `"dark"`, `retries` — `3`. Так описывают конфиги и справочники, из которых потом выводят типы через `typeof`.',
          en: 'Without `as const` object fields widen to `string` and `number`, since they can change. `as const` makes the whole object `readonly` and keeps literals: `mode` is exactly `"dark"`, `retries` is `3`. It’s used for configs and lookup tables whose types are later derived with `typeof`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript 3.4 — const assertions', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions' }],
    verify: { kind: 'ts-type', symbol: 'mode' },
  },
  {
    id: 'ts-readonly-001',
    topic: 'typescript',
    tags: ['structural-typing'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выдаст компилятор?', en: 'What does the compiler report?' },
    code: {
      lang: 'ts',
      source: `function addItem(items: readonly string[], item: string) {
  items.push(item);
}`,
    },
    options: [
      { text: { ru: 'Ошибок нет', en: 'No errors' } },
      {
        text: {
          ru: 'Ошибку: у `readonly string[]` нет метода `push`',
          en: 'An error: `readonly string[]` has no `push` method',
        },
      },
      { text: { ru: 'Предупреждение, но код скомпилируется', en: 'A warning, but the code compiles' } },
      { text: { ru: 'Ошибку: `item` должен быть `readonly`', en: 'An error: `item` must be `readonly`' } },
      { text: { ru: 'Ошибку в рантайме', en: 'A runtime error' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Тип `readonly string[]` (он же `ReadonlyArray<string>`) просто не содержит изменяющих методов: `push`, `splice`, `sort` недоступны, а `map`, `filter`, `toSorted` — пожалуйста. Так функция обещает не трогать входной массив. Это проверка только на этапе компиляции: в рантайме массив обычный, и `Object.freeze` нужен, если защита требуется и там.',
          en: 'The `readonly string[]` type (aka `ReadonlyArray<string>`) simply lacks mutating methods: `push`, `splice`, `sort` aren’t available, while `map`, `filter`, `toSorted` are. That way a function promises not to touch the input array. It’s a compile-time check only: at runtime the array is ordinary, and `Object.freeze` is needed for protection there.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — ReadonlyArray', url: `${HANDBOOK}/2/objects.html#the-readonlyarray-type` }],
    verify: { kind: 'ts-error', code: 2339 },
  },
  {
    id: 'ts-unknown-003',
    topic: 'typescript',
    tags: ['any-unknown-never'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выдаст компилятор при `strict: true`?', en: 'What does the compiler report with `strict: true`?' },
    code: {
      lang: 'ts',
      source: `function readName(text: string) {
  const data: unknown = JSON.parse(text);
  return data.name;
}`,
    },
    options: [
      { text: { ru: 'Ошибок нет: `JSON.parse` возвращает `any`', en: 'No errors: `JSON.parse` returns `any`' } },
      {
        text: {
          ru: 'Ошибку: `data` имеет тип `unknown`, и обращаться к его полям без проверки нельзя',
          en: 'An error: `data` is `unknown`, and its fields can’t be accessed without a check',
        },
      },
      { text: { ru: 'Ошибку: `JSON.parse` нельзя присвоить `unknown`', en: 'An error: `JSON.parse` can’t be assigned to `unknown`' } },
      { text: { ru: 'Ошибку в рантайме', en: 'A runtime error' } },
      { text: { ru: 'Предупреждение о неявном `any`', en: 'An implicit `any` warning' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`JSON.parse` возвращает `any`, и с ним опечатка `data.nmae` прошла бы незаметно. Явный `unknown` заставляет сначала проверить форму: `typeof`, `in`, type guard или, лучше всего, схему (zod). Это честное описание внешних данных — ответов API, `localStorage`, сообщений `postMessage`.',
          en: '`JSON.parse` returns `any`, and with it a typo like `data.nmae` would slip through. An explicit `unknown` forces checking the shape first: `typeof`, `in`, a type guard or, best, a schema (zod). It’s an honest type for external data — API responses, `localStorage`, `postMessage` messages.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — unknown', url: `${HANDBOOK}/2/functions.html#unknown` }],
    verify: { kind: 'ts-error', code: 18046 },
  },
  {
    id: 'ts-mapped-004',
    topic: 'typescript',
    tags: ['mapped-types'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Draft`?', en: 'What type does `Draft` resolve to?' },
    code: {
      lang: 'ts',
      source: `type Mutable<T> = { -readonly [K in keyof T]-?: T[K] };

type Article = { readonly id: number; readonly title: string; tags?: string[] };
type Draft = Mutable<Article>;`,
    },
    options: [
      { code: '{ readonly id: number; readonly title: string; tags?: string[] }' },
      { code: '{ id: number; title: string; tags: string[] }' },
      { code: '{ id: number; title: string; tags?: string[] }' },
      { code: '{ id?: number; title?: string; tags?: string[] }' },
      { code: 'Article' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В mapped types модификаторы можно не только добавлять, но и снимать: `-readonly` убирает `readonly`, `-?` делает необязательные поля обязательными (а `undefined` из их типа уходит). Встроенный `Required<T>` — это ровно `{ [K in keyof T]-?: T[K] }`. Комбинация полезна для черновиков и форм, где поля редактируются.',
          en: 'Mapped types can remove modifiers, not just add them: `-readonly` drops `readonly`, `-?` makes optional fields required (and removes `undefined` from their type). The built-in `Required<T>` is exactly `{ [K in keyof T]-?: T[K] }`. The combination suits drafts and forms where fields are edited.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Mapping Modifiers', url: `${HANDBOOK}/2/mapped-types.html#mapping-modifiers` }],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Draft, { id: number; title: string; tags: string[] }> = true;` },
  },
];
