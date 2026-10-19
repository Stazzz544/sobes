import type { Question } from '../model/types';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';
const SATISFIES = `${HANDBOOK}/release-notes/typescript-4-9.html#the-satisfies-operator`;

export const TYPESCRIPT_QUESTIONS_8: Question[] = [
  {
    id: 'ts-satisfies-004',
    topic: 'typescript',
    tags: ['satisfies'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой тип будет у `theme`?', en: 'What is the type of `theme`?' },
    code: {
      lang: 'ts',
      source: `type Theme = 'light' | 'dark';

const settings = { theme: 'dark' } satisfies { theme: Theme };
const theme = settings.theme;`,
    },
    options: [{ code: 'string' }, { code: 'Theme' }, { code: '"dark"' }, { code: '"light" | "dark" | undefined' }, { code: 'unknown' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Без `satisfies` поле объекта расширилось бы до `string`. Но `satisfies` даёт значению **контекстный тип** `{ theme: Theme }`: литерал `"dark"` сверяется с объединением литералов и поэтому не расширяется. Тип выражения остаётся выведенным, а не заменяется на `Theme`, — получается самый точный тип `"dark"`. С аннотацией `const settings: { theme: Theme }` было бы `Theme`.',
          en: 'Without `satisfies` the property would widen to `string`. But `satisfies` gives the value a **contextual type** `{ theme: Theme }`: the literal `"dark"` is checked against a union of literals and so isn’t widened. The expression keeps its inferred type instead of being replaced by `Theme`, giving the most precise type, `"dark"`. With the annotation `const settings: { theme: Theme }` you’d get `Theme`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript 4.9 — The satisfies operator', url: SATISFIES }],
    verify: { kind: 'ts-type', symbol: 'theme' },
  },
  {
    id: 'ts-satisfies-005',
    topic: 'typescript',
    tags: ['satisfies'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выдаст компилятор?', en: 'What does the compiler report?' },
    code: {
      lang: 'ts',
      source: `type Route = { path: string; auth?: boolean };

const routes = {
  home: { path: '/' },
  admin: { path: '/admin', auht: true },
} satisfies Record<string, Route>;`,
    },
    options: [
      { text: { ru: 'Ошибок нет: `satisfies` не проверяет лишние поля', en: 'No errors: `satisfies` doesn’t check extra properties' } },
      { text: { ru: 'Ошибку: опечатка `auht` — у `Route` нет такого поля', en: 'An error: the typo `auht` — `Route` has no such property' } },
      { text: { ru: 'Ошибку: у `home` нет поля `auth`', en: 'An error: `home` has no `auth` property' } },
      { text: { ru: 'Ошибку: `satisfies` нельзя писать после объекта', en: 'An error: `satisfies` can’t follow an object' } },
      { text: { ru: 'Ошибку в рантайме', en: 'A runtime error' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'К объектному литералу после `satisfies` применяется та же **проверка лишних свойств**, что и при аннотации: поле `auht` не описано в `Route`, и компилятор сообщает об опечатке (TS2353). `auth` необязательно, поэтому `home` без него в порядке. С `as Record<string, Route>` опечатка прошла бы незамеченной: утверждение типа такую проверку не делает.',
          en: 'An object literal followed by `satisfies` gets the same **excess property check** as with an annotation: `auht` isn’t declared in `Route`, so the compiler reports the typo (TS2353). `auth` is optional, so `home` without it is fine. With `as Record<string, Route>` the typo would slip through: a type assertion doesn’t do this check.',
        },
      },
    ],
    sources: [{ title: 'TypeScript 4.9 — The satisfies operator', url: SATISFIES }],
    verify: { kind: 'ts-error', code: 2353 },
  },
  {
    id: 'ts-satisfies-006',
    topic: 'typescript',
    tags: ['satisfies'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип будет у `medium`?', en: 'What is the type of `medium`?' },
    code: {
      lang: 'ts',
      source: `const sizes = { small: 8, medium: 16 } as const satisfies Record<string, number>;

const medium = sizes.medium;`,
    },
    options: [{ code: 'number' }, { code: '16' }, { code: '8 | 16' }, { code: 'number | undefined' }, { code: 'Record<string, number>' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`as const` сохраняет литералы и делает объект `readonly`, а `satisfies` проверяет, что все значения — числа, и при этом не расширяет тип до `Record<string, number>`. Поэтому `sizes.medium` — литерал `16`, а обращение к несуществующему ключу будет ошибкой. Связка `as const satisfies` — частый способ описать конфиг: и проверка, и точные типы.',
          en: '`as const` keeps the literals and makes the object `readonly`, while `satisfies` checks that every value is a number without widening the type to `Record<string, number>`. So `sizes.medium` is the literal `16`, and accessing a missing key is an error. `as const satisfies` is a common way to describe a config: both a check and precise types.',
        },
      },
    ],
    sources: [{ title: 'TypeScript 4.9 — The satisfies operator', url: SATISFIES }],
    verify: { kind: 'ts-type', symbol: 'medium' },
  },
  {
    id: 'ts-keyof-005',
    topic: 'typescript',
    tags: ['keyof-typeof'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой тип будет у `current`?', en: 'What is the type of `current`?' },
    code: {
      lang: 'ts',
      source: `const STATUS = { draft: 0, published: 1 } as const;

declare const current: (typeof STATUS)[keyof typeof STATUS];`,
    },
    options: [{ code: 'number' }, { code: '"draft" | "published"' }, { code: '0 | 1' }, { code: '{ draft: 0; published: 1 }' }, { code: 'string' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`typeof STATUS` — тип объекта `{ readonly draft: 0; readonly published: 1 }`, `keyof` — объединение его ключей `"draft" | "published"`. Индексный доступ по объединению ключей даёт объединение значений: `0 | 1`. Так из объекта-константы получают тип всех его значений — замену `enum` без генерации кода.',
          en: '`typeof STATUS` is the object type `{ readonly draft: 0; readonly published: 1 }`, and `keyof` is the union of its keys, `"draft" | "published"`. Indexed access with a union of keys gives a union of values: `0 | 1`. This is how you get the type of all values of a constant object — an `enum` replacement with no generated code.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Indexed Access Types', url: `${HANDBOOK}/2/indexed-access-types.html` }],
    verify: { kind: 'ts-type', symbol: 'current' },
  },
  {
    id: 'ts-generics-008',
    topic: 'typescript',
    tags: ['generics'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой тип будет у `box`?', en: 'What is the type of `box`?' },
    code: {
      lang: 'ts',
      source: `function createBox<T>(value: T) {
  return { value };
}

const box = createBox<string | null>(null);`,
    },
    options: [{ code: '{ value: null; }' }, { code: '{ value: string | null; }' }, { code: '{ value: any; }' }, { code: '{ value: string; }' }, { code: 'unknown' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Аргумент типа можно передать явно в угловых скобках — тогда TypeScript не выводит `T` из значения, а берёт указанный тип. Без `<string | null>` получилось бы `{ value: null }`, и положить туда строку позже было бы нельзя. Так же работает `useState<User | null>(null)` в React: начальное значение пустое, а тип — на будущее.',
          en: 'A type argument can be passed explicitly in angle brackets — then TypeScript doesn’t infer `T` from the value but uses the given type. Without `<string | null>` you’d get `{ value: null }`, and you couldn’t store a string there later. `useState<User | null>(null)` in React works the same way: the initial value is empty, the type is for later.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Generics', url: `${HANDBOOK}/2/generics.html` }],
    verify: { kind: 'ts-type', symbol: 'box' },
  },
];
