import type { Question } from '../model/types';

const HANDBOOK = 'https://www.typescriptlang.org/docs/handbook';
const EQUAL = 'type Equal<X, Y> = (<V>() => V extends X ? 1 : 2) extends (<V>() => V extends Y ? 1 : 2) ? true : false;';

export const TYPESCRIPT_QUESTIONS_2: Question[] = [
  {
    id: 'ts-never-001',
    topic: 'typescript',
    tags: ['any-unknown-never'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип получится у `Result`?', en: 'What type does `Result` resolve to?' },
    code: {
      lang: 'ts',
      source: `function declared(message: string) {
  throw new Error(message);
}

const arrow = (message: string) => {
  throw new Error(message);
};

type Result = [ReturnType<typeof declared>, ReturnType<typeof arrow>];`,
    },
    options: [
      { code: '[never, never]' },
      { code: '[void, void]' },
      { code: '[never, void]' },
      { code: '[void, never]' },
      { code: '[undefined, never]' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Если тело функции не может завершиться нормально, для стрелочных функций и function expression TypeScript выводит возвращаемый тип `never`. А для **объявлений функций** без аннотации — `void`: так сделано ради обратной совместимости.',
          en: 'When a function body can never complete normally, TypeScript infers `never` for arrow functions and function expressions. For **function declarations** without an annotation it infers `void` — a backward-compatibility decision.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `function fail(message: string): never {
  throw new Error(message);
}`,
        },
        caption: {
          ru: 'Если нужен `never` — укажите его явно.',
          en: 'If you need `never`, annotate it explicitly.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — never', url: `${HANDBOOK}/2/functions.html#never` },
      {
        title: 'TypeScript issue #16608 — inference for functions that throw',
        url: 'https://github.com/microsoft/TypeScript/issues/16608',
      },
    ],
    verify: { kind: 'ts-check', source: `${EQUAL}\nconst check: Equal<Result, [void, never]> = true;` },
  },
  {
    id: 'ts-never-002',
    topic: 'typescript',
    tags: ['any-unknown-never', 'narrowing'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выдаст компилятор?', en: 'What will the compiler report?' },
    code: {
      lang: 'ts',
      source: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  }
  if (shape.kind === 'square') {
    return shape.size ** 2;
  }
  const unhandled: never = shape;
  return unhandled;
}`,
    },
    options: [
      {
        text: {
          ru: 'Ничего: на треугольнике функция просто вернёт `undefined`',
          en: 'Nothing: for a triangle the function just returns `undefined`',
        },
      },
      {
        text: {
          ru: 'Ошибку: тип `never` нельзя указывать у переменной',
          en: 'An error: `never` can’t be used as a variable type',
        },
      },
      {
        text: {
          ru: 'Ошибку: функция может не вернуть `number`',
          en: 'An error: the function might not return a `number`',
        },
      },
      {
        text: {
          ru: 'Ошибку в строке с `unhandled`: треугольник не обработан, поэтому `shape` там не сужается до `never`',
          en: 'An error on the `unhandled` line: the triangle isn’t handled, so `shape` isn’t narrowed to `never` there',
        },
      },
      {
        text: {
          ru: 'Ничего при компиляции, но код упадёт при запуске с `TypeError`',
          en: 'Nothing at compile time, but the code throws a `TypeError` at runtime',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это приём **проверки полноты** (exhaustiveness check). После всех `if` TypeScript сужает `shape` до оставшихся вариантов. Если обработаны все, остаётся `never`, и присваивание проходит. Здесь остался треугольник: `{ kind: "triangle"; … }` нельзя присвоить в `never` — ошибка TS2322.',
          en: 'This is the **exhaustiveness check** pattern. After all the `if`s, TypeScript narrows `shape` to the remaining members. If every case is handled, only `never` is left and the assignment passes. Here the triangle remains: `{ kind: "triangle"; … }` isn’t assignable to `never` — error TS2322.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Польза: добавили новый вариант в union — компилятор сам покажет все места, где его забыли обработать.',
          en: 'The payoff: add a new member to the union and the compiler points to every place that forgot to handle it.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Exhaustiveness checking',
        url: `${HANDBOOK}/2/narrowing.html#exhaustiveness-checking`,
      },
    ],
    verify: { kind: 'ts-error', code: 2322 },
  },
  {
    id: 'ts-narrowing-002',
    topic: 'typescript',
    tags: ['narrowing'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой тип будет у `inside`?', en: 'What is the type of `inside`?' },
    code: {
      lang: 'ts',
      source: `type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    const inside = animal;
  }
}`,
    },
    options: [
      { code: 'Fish | Bird' },
      { code: 'Bird' },
      { code: 'never' },
      { code: 'Fish' },
      { code: '{ swim: () => void; fly: () => void; }' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Оператор `in` сужает объединение: в ветке `true` остаются члены, у которых свойство `swim` есть (обязательное или опциональное), в ветке `false` — у которых его нет.',
          en: 'The `in` operator narrows a union: the `true` branch keeps members that have a `swim` property (required or optional), and the `false` branch keeps those that don’t.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — The in operator narrowing',
        url: `${HANDBOOK}/2/narrowing.html#the-in-operator-narrowing`,
      },
    ],
    verify: { kind: 'ts-type', symbol: 'inside' },
  },
  {
    id: 'ts-narrowing-003',
    topic: 'typescript',
    tags: ['narrowing'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой тип будет у `strings`?', en: 'What is the type of `strings`?' },
    code: {
      lang: 'ts',
      source: `function isString(value: unknown): value is string {
  return typeof value === 'string';
}

const values: unknown[] = ['a', 1, 'b'];
const strings = values.filter(isString);`,
    },
    options: [
      { code: 'unknown[]' },
      { code: '(string | unknown)[]' },
      { code: 'string[]' },
      { code: 'boolean[]' },
      { code: 'string' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Возвращаемый тип `value is string` — это **предикат типа** ([[type-guard|type guard]]). Он сообщает компилятору: если функция вернула `true`, аргумент — `string`.',
          en: 'The return type `value is string` is a **type predicate** ([[type-guard|type guard]]). It tells the compiler: if the function returns `true`, the argument is a `string`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'У `Array.prototype.filter` есть перегрузка для предикатов, поэтому результат сужается до `string[]`. С обычной функцией, возвращающей `boolean`, остался бы `unknown[]`.',
          en: '`Array.prototype.filter` has an overload for predicates, so the result narrows to `string[]`. With a plain `boolean`-returning function it would stay `unknown[]`.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Using type predicates',
        url: `${HANDBOOK}/2/narrowing.html#using-type-predicates`,
      },
    ],
    verify: { kind: 'ts-type', symbol: 'strings' },
  },
  {
    id: 'ts-narrowing-004',
    topic: 'typescript',
    tags: ['narrowing'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип будет у `names` в TypeScript 5.5+?', en: 'What is the type of `names` in TypeScript 5.5+?' },
    code: {
      lang: 'ts',
      source: `const names = ['Ann', null, 'Bob'].filter((name) => name !== null);`,
    },
    options: [
      { code: '(string | null)[]' },
      { code: 'null[]' },
      { code: 'unknown[]' },
      { code: '(string | undefined)[]' },
      { code: 'string[]' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Начиная с TypeScript 5.5 компилятор сам **выводит предикат типа** из простых стрелочных функций: `(name) => name !== null` получает тип `(name: string | null) => name is string`. Поэтому `filter` сужает результат до `string[]`.',
          en: 'Since TypeScript 5.5 the compiler **infers type predicates** from simple arrow functions: `(name) => name !== null` gets the type `(name: string | null) => name is string`. So `filter` narrows the result to `string[]`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'До версии 5.5 здесь получался `(string | null)[]`, и приходилось писать предикат вручную.',
          en: 'Before 5.5 this produced `(string | null)[]`, and you had to write the predicate by hand.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript 5.5 — Inferred Type Predicates',
        url: `${HANDBOOK}/release-notes/typescript-5-5.html#inferred-type-predicates`,
      },
    ],
    verify: { kind: 'ts-type', symbol: 'names' },
  },
  {
    id: 'ts-narrowing-005',
    topic: 'typescript',
    tags: ['narrowing'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой тип будет у `inside`?', en: 'What is the type of `inside`?' },
    code: {
      lang: 'ts',
      source: `type Result =
  | { ok: true; value: number }
  | { ok: false; error: string };

function handle(result: Result) {
  if (!result.ok) {
    const inside = result;
  }
}`,
    },
    options: [
      { code: '{ ok: true; value: number; }' },
      { code: 'Result' },
      { code: 'never' },
      { code: '{ ok: false; error: string; }' },
      { code: '{ ok: boolean; error: string; }' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это **размеченное объединение** (discriminated union): у всех членов есть общее поле-литерал `ok`. Проверка этого поля сужает объект до одного варианта, и внутри ветки доступно `result.error` без лишних проверок.',
          en: 'This is a **discriminated union**: every member has a common literal field `ok`. Checking that field narrows the object to one member, so `result.error` is available inside the branch with no extra checks.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript Handbook — Discriminated unions',
        url: `${HANDBOOK}/2/narrowing.html#discriminated-unions`,
      },
    ],
    verify: { kind: 'ts-type', symbol: 'inside' },
  },
  {
    id: 'ts-unknown-002',
    topic: 'typescript',
    tags: ['any-unknown-never'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какой тип будет у `caught` при `strict: true`?',
      en: 'What is the type of `caught` with `strict: true`?',
    },
    code: {
      lang: 'ts',
      source: `try {
  JSON.parse('{');
} catch (error) {
  const caught = error;
}`,
    },
    options: [{ code: 'any' }, { code: 'Error' }, { code: 'SyntaxError' }, { code: 'unknown' }, { code: 'never' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В JavaScript бросить можно что угодно — не только `Error`. Поэтому с флагом `useUnknownInCatchVariables` (включён в `strict` с TypeScript 4.4) переменная в `catch` имеет тип `unknown`.',
          en: 'In JavaScript you can throw anything, not just an `Error`. That’s why with `useUnknownInCatchVariables` (part of `strict` since TypeScript 4.4) the `catch` variable is `unknown`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `catch (error) {
  const message = error instanceof Error ? error.message : String(error);
}`,
        },
      },
    ],
    sources: [
      {
        title: 'TSConfig — useUnknownInCatchVariables',
        url: 'https://www.typescriptlang.org/tsconfig/#useUnknownInCatchVariables',
      },
    ],
    verify: { kind: 'ts-type', symbol: 'caught' },
  },
  {
    id: 'ts-strict-null-001',
    topic: 'typescript',
    tags: ['narrowing'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что скажет компилятор при `strict: true`?',
      en: 'What will the compiler say with `strict: true`?',
    },
    code: {
      lang: 'ts',
      source: `function getLength(text?: string) {
  return text.length;
}`,
    },
    options: [
      {
        text: {
          ru: 'Ничего: знак `?` только документирует параметр',
          en: 'Nothing: the `?` only documents the parameter',
        },
      },
      {
        text: {
          ru: 'Ошибку: у `string` нет свойства `length`',
          en: 'An error: `string` has no `length` property',
        },
      },
      {
        text: {
          ru: 'Ошибку: `text` может быть `undefined`',
          en: 'An error: `text` is possibly `undefined`',
        },
      },
      {
        text: {
          ru: 'Ошибку: у функции нет явного типа возврата',
          en: 'An error: the function has no explicit return type',
        },
      },
      {
        text: {
          ru: 'Только предупреждение, код скомпилируется',
          en: 'Only a warning; the code compiles',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Необязательный параметр `text?: string` имеет тип `string | undefined`. При `strictNullChecks` (входит в `strict`) обращаться к свойствам такого значения без проверки нельзя.',
          en: 'The optional parameter `text?: string` has the type `string | undefined`. With `strictNullChecks` (part of `strict`) you can’t access its properties without a check.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `function getLength(text?: string) {
  return text?.length ?? 0;
}`,
        },
      },
    ],
    sources: [
      { title: 'TSConfig — strictNullChecks', url: 'https://www.typescriptlang.org/tsconfig/#strictNullChecks' },
      { title: 'TypeScript Handbook — Optional Parameters', url: `${HANDBOOK}/2/functions.html#optional-parameters` },
    ],
    verify: { kind: 'ts-error', code: 18048 },
  },
  {
    id: 'ts-generics-002',
    topic: 'typescript',
    tags: ['generics'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выдаст компилятор?', en: 'What will the compiler report?' },
    code: {
      lang: 'ts',
      source: `function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

const result = longest([1, 2], 'abc');`,
    },
    options: [
      {
        text: {
          ru: 'Всё скомпилируется, `T` выведется как `number[] | string`',
          en: 'It compiles, and `T` is inferred as `number[] | string`',
        },
      },
      {
        text: {
          ru: 'Всё скомпилируется, `result` будет `string`',
          en: 'It compiles, and `result` is `string`',
        },
      },
      {
        text: {
          ru: 'Ошибку: у `number[]` нет свойства `length`',
          en: 'An error: `number[]` has no `length` property',
        },
      },
      {
        text: {
          ru: 'Ошибку: `T` выводится из первого аргумента как `number[]`, и строка `"abc"` ему не подходит',
          en: 'An error: `T` is inferred from the first argument as `number[]`, and the string `"abc"` doesn’t fit',
        },
      },
      {
        text: {
          ru: 'Ошибку: в дженерике функции нельзя использовать `extends`',
          en: 'An error: `extends` isn’t allowed in a function’s generic',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Оба параметра имеют один тип `T`. Кандидаты для вывода — `number[]` и `string`, общего «лучшего» типа у них нет, поэтому TypeScript берёт первый кандидат и сообщает, что `string` нельзя передать в `number[]`.',
          en: 'Both parameters share the type `T`. The inference candidates are `number[]` and `string`; there’s no common best type, so TypeScript picks the first candidate and reports that `string` isn’t assignable to `number[]`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ограничение `extends { length: number }` при этом выполняется для обоих типов. Если нужны разные типы — используйте два параметра: `<A extends …, B extends …>`.',
          en: 'The `extends { length: number }` constraint holds for both types. If you need different types, use two parameters: `<A extends …, B extends …>`.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Generic Constraints', url: `${HANDBOOK}/2/generics.html#generic-constraints` },
      { title: 'TypeScript Handbook — Type Inference', url: `${HANDBOOK}/type-inference.html#best-common-type` },
    ],
    verify: { kind: 'ts-error', code: 2345 },
  },
  {
    id: 'ts-generics-003',
    topic: 'typescript',
    tags: ['generics', 'enums'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой тип будет у `wrapped`?', en: 'What is the type of `wrapped`?' },
    code: {
      lang: 'ts',
      source: `function wrap<T>(value: T) {
  return { value };
}

const wrapped = wrap('hi');`,
    },
    options: [
      { code: '{ value: "hi"; }' },
      { code: '{ value: string; }' },
      { code: '{ value: unknown; }' },
      { code: 'string' },
      { code: '{ value: any; }' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Для аргумента `"hi"` кандидатом в `T` сначала будет литерал `"hi"`. Но если параметр типа не ограничен примитивом и в возвращаемом типе стоит не на верхнем уровне (здесь он внутри объекта), литерал **расширяется** до `string`.',
          en: 'For the argument `"hi"`, the first candidate for `T` is the literal `"hi"`. But when the type parameter has no primitive constraint and isn’t at the top level of the return type (here it’s inside an object), the literal is **widened** to `string`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `function wrapExact<const T>(value: T) {
  return { value };
}
wrapExact('hi'); // { value: "hi" }`,
        },
        caption: {
          ru: 'Модификатор `const` (TypeScript 5.0) сохраняет литерал.',
          en: 'The `const` modifier (TypeScript 5.0) keeps the literal.',
        },
      },
    ],
    sources: [
      { title: 'TypeScript Handbook — Literal Inference', url: `${HANDBOOK}/2/everyday-types.html#literal-inference` },
      {
        title: 'TypeScript 5.0 — const Type Parameters',
        url: `${HANDBOOK}/release-notes/typescript-5-0.html#const-type-parameters`,
      },
    ],
    verify: { kind: 'ts-type', symbol: 'wrapped' },
  },
  {
    id: 'ts-generics-004',
    topic: 'typescript',
    tags: ['generics', 'enums'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой тип будет у `result`?', en: 'What is the type of `result`?' },
    code: {
      lang: 'ts',
      source: `function tuple<const T extends readonly unknown[]>(...items: T) {
  return items;
}

const result = tuple('a', 1);`,
    },
    options: [
      { code: '(string | number)[]' },
      { code: '[string, number]' },
      { code: 'readonly (string | number)[]' },
      { code: 'unknown[]' },
      { code: 'readonly ["a", 1]' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модификатор `const` у параметра типа (TypeScript 5.0) просит выводить тип так, будто аргументы записаны с `as const`: литералы сохраняются, массив становится кортежем. Ограничение `readonly unknown[]` разрешает вывести кортеж только для чтения.',
          en: 'The `const` modifier on a type parameter (TypeScript 5.0) asks for inference as if the arguments were written with `as const`: literals are kept and the array becomes a tuple. The `readonly unknown[]` constraint lets a readonly tuple be inferred.',
        },
      },
    ],
    sources: [
      {
        title: 'TypeScript 5.0 — const Type Parameters',
        url: `${HANDBOOK}/release-notes/typescript-5-0.html#const-type-parameters`,
      },
    ],
    verify: { kind: 'ts-type', symbol: 'result' },
  },
];
