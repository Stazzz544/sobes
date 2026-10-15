import type { Question } from '../model/types';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';

export const TYPESCRIPT_QUESTIONS_5: Question[] = [
  {
    id: 'ts-unknown-bug-001',
    kind: 'bug-line',
    topic: 'typescript',
    tags: ['any-unknown-never'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'На какой строке TypeScript покажет ошибку?', en: 'Which line will TypeScript report an error on?' },
    code: {
      lang: 'ts',
      source: `function getUserId(json: string): number | null {
  const data: unknown = JSON.parse(json);
  if (typeof data === 'object' && data !== null) {
    return data.id;
  }
  return null;
}`,
    },
    answerLine: 4,
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Проверка `typeof data === "object"` сужает `unknown` только до `object` — про его свойства TypeScript ничего не знает, поэтому `data.id` даёт «Property `id` does not exist on type `object`».',
          en: 'The `typeof data === "object"` check narrows `unknown` only to `object` — TypeScript knows nothing about its properties, so `data.id` gives “Property `id` does not exist on type `object`”.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Дальше сужают через `in`: после `"id" in data` у `data` появляется свойство `id: unknown`, которое проверяют `typeof data.id === "number"`. Для сложных данных удобнее схема (zod) или [[type-guard|type guard]].',
          en: 'Narrow further with `in`: after `"id" in data`, `data` gets an `id: unknown` property that you check with `typeof data.id === "number"`. For complex data a schema (zod) or a [[type-guard|type guard]] is handier.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — The in operator narrowing', url: `${HANDBOOK}/2/narrowing.html#the-in-operator-narrowing` },
      { title: 'TypeScript Handbook — typeof type guards', url: `${HANDBOOK}/2/narrowing.html#typeof-type-guards` },
    ],
    verify: { kind: 'ts-error-line' },
  },
  {
    id: 'ts-narrowing-bug-001',
    kind: 'bug-line',
    topic: 'typescript',
    tags: ['narrowing'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'На какой строке TypeScript (strict) покажет ошибку?',
      en: 'Which line will TypeScript (strict) report an error on?',
    },
    code: {
      lang: 'ts',
      source: `function getLength(value: string | null): number {
  if (value !== undefined) {
    return value.length;
  }
  return 0;
}`,
    },
    answerLine: 3,
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Проверка `!== undefined` не убирает `null` из типа: внутри `if` у `value` всё ещё `string | null`, и обращение к `.length` даёт «`value` is possibly `null`».',
          en: 'The `!== undefined` check doesn’t remove `null` from the type: inside the `if`, `value` is still `string | null`, so `.length` triggers “`value` is possibly `null`”.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Нужна проверка `!== null` или нестрогая `!= null` — она убирает и `null`, и `undefined`.',
          en: 'Use `!== null`, or the loose `!= null`, which removes both `null` and `undefined`.',
        },
      },
    ],
    sources: [{ title: 'TypeScript Handbook — Equality narrowing', url: `${HANDBOOK}/2/narrowing.html#equality-narrowing` }],
    verify: { kind: 'ts-error-line' },
  },
  {
    id: 'ts-enums-output-001',
    kind: 'output',
    topic: 'typescript',
    tags: ['enums'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'ts',
      source: `enum Status {
  Draft,
  Published = 5,
  Archived,
}

console.log(Status.Archived, Status[5]);`,
    },
    answers: ['6 Published'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Числовой enum без значения продолжает счёт от предыдущего: `Draft = 0`, `Published = 5`, значит `Archived = 6`.',
          en: 'A numeric enum member without a value continues from the previous one: `Draft = 0`, `Published = 5`, so `Archived = 6`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Числовые enum компилируются в объект с обратным отображением: `Status[5]` возвращает имя `"Published"`.',
          en: 'Numeric enums compile to an object with a reverse mapping: `Status[5]` returns the name `"Published"`.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Numeric enums', url: `${HANDBOOK}/enums.html#numeric-enums` },
      { title: 'TypeScript Handbook — Reverse mappings', url: `${HANDBOOK}/enums.html#reverse-mappings` },
    ],
    verify: { kind: 'ts-output' },
  },
];
