import type { Question } from '../model/types';

export const TYPESCRIPT_QUESTIONS: Question[] = [
  {
    id: 'ts-unknown-001',
    topic: 'typescript',
    tags: ['any-unknown-never'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'В чём главное отличие `unknown` от `any`?',
      en: 'What is the key difference between `unknown` and `any`?',
    },
    options: [
      {
        text: {
          ru: '`unknown` — синоним `any`, оставленный для обратной совместимости',
          en: '`unknown` is an alias of `any` kept for backward compatibility',
        },
      },
      {
        text: {
          ru: 'Значение `unknown` нельзя использовать, пока тип не сужен проверкой, а `any` отключает проверку типов',
          en: 'A value of type `unknown` can’t be used until it is narrowed, while `any` turns type checking off',
        },
      },
      {
        text: {
          ru: 'Переменной типа `unknown` нельзя присвоить `null`',
          en: 'You can’t assign `null` to a variable of type `unknown`',
        },
      },
      {
        text: {
          ru: '`any` нельзя передать туда, где ожидается `string`, а `unknown` — можно',
          en: '`any` can’t be passed where a `string` is expected, but `unknown` can',
        },
      },
      {
        text: {
          ru: '`unknown` существует только во время выполнения программы',
          en: '`unknown` only exists at runtime',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В `unknown` можно положить что угодно, включая `null`, но **использовать** такое значение нельзя: ни вызвать метод, ни присвоить в `string`. Сначала нужно сузить тип — `typeof`, `instanceof`, проверкой свойства или [[type-guard|type guard]].',
          en: 'Anything, including `null`, can be stored in `unknown`, but you can’t **use** the value: no method calls, no assigning it to `string`. You have to narrow it first with `typeof`, `instanceof`, a property check or a [[type-guard|type guard]].',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `function shout(value: unknown) {
  // value.toUpperCase(); // ошибка / error
  if (typeof value === 'string') {
    return value.toUpperCase(); // ок / ok
  }
}

const loose: any = 42;
loose.toUpperCase(); // компилируется, падает в рантайме
                     // compiles, crashes at runtime`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`any` выключает проверки и «заражает» всё, к чему прикасается. `unknown` — безопасная альтернатива для данных извне: ответов API, `JSON.parse`, `catch (error)`.',
          en: '`any` disables checks and “infects” everything it touches. `unknown` is the safe choice for external data: API responses, `JSON.parse`, `catch (error)`.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — unknown',
        url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown',
      },
      {
        title: 'TypeScript 3.0 — New unknown top type',
        url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type',
      },
    ],
    verify: {
      kind: 'ts-check',
      source: `declare const value: unknown;
// @ts-expect-error
value.toUpperCase();
if (typeof value === 'string') {
  value.toUpperCase();
}
const nullable: unknown = null;
declare const loose: any;
const fromAny: string = loose;
// @ts-expect-error
const fromUnknown: string = value;`,
    },
  },
  {
    id: 'ts-narrowing-001',
    topic: 'typescript',
    tags: ['narrowing'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какой тип будет у `inside`?',
      en: 'What is the type of `inside`?',
    },
    code: {
      lang: 'ts',
      source: `function format(value: string | number | null) {
  if (typeof value === 'object') {
    const inside = value;
  }
}`,
    },
    options: [{ code: 'object' }, { code: 'never' }, { code: 'null' }, { code: 'string | number' }, { code: 'object | null' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'TypeScript знает, что в JavaScript `typeof null === "object"`. Из `string | number | null` под проверку `typeof value === "object"` подходит только `null` — его и оставляет [[type-narrowing|сужение]].',
          en: 'TypeScript knows that in JavaScript `typeof null === "object"`. Of `string | number | null`, only `null` passes the `typeof value === "object"` check, so that is what [[type-narrowing|narrowing]] leaves.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Это частая ловушка: проверка `typeof x === "object"` не отсекает `null`. Для объектов добавляйте `x !== null`.',
          en: 'It’s a common trap: `typeof x === "object"` does not exclude `null`. Add `x !== null` when you mean objects.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — typeof type guards',
        url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards',
      },
    ],
    verify: { kind: 'ts-type', symbol: 'inside' },
  },
  {
    id: 'ts-utility-001',
    topic: 'typescript',
    tags: ['utility-types'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какой тип получится у `Patch`?',
      en: 'What type does `Patch` resolve to?',
    },
    code: {
      lang: 'ts',
      source: `type User = { id: number; name: string; email?: string };
type Patch = Partial<Pick<User, 'name' | 'email'>>;`,
    },
    options: [
      { code: '{ name: string; email?: string }' },
      { code: '{ name?: string; email?: string }' },
      { code: '{ id?: number; name?: string; email?: string }' },
      { code: '{ id: number }' },
      { code: '{ name?: string }' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Pick<User, "name" | "email">` оставляет только перечисленные поля: `{ name: string; email?: string }`. `Partial` делает все поля необязательными, поэтому `name` тоже становится `name?`.',
          en: '`Pick<User, "name" | "email">` keeps only the listed fields: `{ name: string; email?: string }`. `Partial` makes every field optional, so `name` becomes `name?` too.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `const empty: Patch = {};            // ok
const full: Patch = { name: 'Ann' }; // ok
const bad: Patch = { id: 1 };       // ошибка / error`,
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Utility Types',
        url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
      },
    ],
    verify: {
      kind: 'ts-check',
      source: `const empty: Patch = {};
const full: Patch = { name: 'Ann', email: 'ann@example.com' };
// @ts-expect-error
const withId: Patch = { id: 1 };`,
    },
  },
  {
    id: 'ts-generics-001',
    topic: 'typescript',
    tags: ['generics', 'keyof-typeof'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какой тип будет у `age`?',
      en: 'What is the type of `age`?',
    },
    code: {
      lang: 'ts',
      source: `function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Ann', age: 30 };
const age = getProp(user, 'age');`,
    },
    options: [{ code: 'string | number' }, { code: 'number' }, { code: '30' }, { code: 'unknown' }, { code: 'any' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'TypeScript выводит `T` как `{ name: string; age: number }`, а `K` — как литерал `"age"`. Индексный доступ `T[K]` превращается в `T["age"]`, то есть `number`.',
          en: 'TypeScript infers `T` as `{ name: string; age: number }` and `K` as the literal `"age"`. The indexed access `T[K]` becomes `T["age"]`, which is `number`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Литерального типа `30` не будет: объект не объявлен `as const`, поэтому числовое поле расширяется до `number`.',
          en: 'It won’t be the literal `30`: the object isn’t declared `as const`, so the numeric field is widened to `number`.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Using type parameters in generic constraints',
        url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints',
      },
      {
        title: 'TypeScript Handbook — Indexed Access Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html',
      },
    ],
    verify: { kind: 'ts-type', symbol: 'age' },
  },
  {
    id: 'ts-conditional-001',
    topic: 'typescript',
    tags: ['conditional-types'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Какой тип получится у `C`?',
      en: 'What type does `C` resolve to?',
    },
    code: {
      lang: 'ts',
      source: `type Unwrap<T> = T extends Promise<infer U> ? U : T;

type C = Unwrap<Promise<string> | number>;`,
    },
    options: [
      { code: 'Promise<string> | number' },
      { code: 'string' },
      { code: 'never' },
      { code: 'string | number' },
      { code: 'unknown' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Условный тип вида `T extends …`, где `T` — «голый» параметр, **дистрибутивен**: для объединения он применяется к каждому члену отдельно.',
          en: 'A conditional type of the form `T extends …` where `T` is a “naked” type parameter is **distributive**: for a union it is applied to each member separately.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `Unwrap<Promise<string> | number>
// = Unwrap<Promise<string>> | Unwrap<number>
// = string | number`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы отключить дистрибутивность, оберните обе стороны в кортеж: `[T] extends [Promise<infer U>]`.',
          en: 'To turn distribution off, wrap both sides in a tuple: `[T] extends [Promise<infer U>]`.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Distributive Conditional Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types',
      },
      {
        title: 'TypeScript Handbook — Inferring Within Conditional Types',
        url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types',
      },
    ],
    verify: {
      kind: 'ts-check',
      source: `type Equal<X, Y> = (<V>() => V extends X ? 1 : 2) extends (<V>() => V extends Y ? 1 : 2) ? true : false;
const check: Equal<C, string | number> = true;`,
    },
  },
];
