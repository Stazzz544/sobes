import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript';
const MDN_API = 'https://developer.mozilla.org/en-US/docs/Web/API';

export const JAVASCRIPT_QUESTIONS_5: Question[] = [
  {
    id: 'js-event-loop-order-001',
    kind: 'order',
    topic: 'javascript',
    tags: ['event-loop'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Расставьте буквы в том порядке, в котором они попадут в консоль.',
      en: 'Put the letters in the order they will be logged.',
    },
    code: {
      lang: 'js',
      source: `setTimeout(() => console.log('b'), 0);
Promise.resolve().then(() => console.log('c'));
queueMicrotask(() => console.log('d'));
console.log('a');
(async () => {
  console.log('e');
})();`,
    },
    items: [{ code: 'a' }, { code: 'e' }, { code: 'c' }, { code: 'd' }, { code: 'b' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сначала выполняется весь синхронный код: `a`, затем тело async-функции до первого `await` — оно тоже синхронное, поэтому `e`.',
          en: 'All synchronous code runs first: `a`, then the body of the async function up to its first `await` — it is synchronous too, hence `e`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Когда стек пуст, выполняется очередь микрозадач в порядке добавления: колбэк `then` (`c`), потом `queueMicrotask` (`d`). Таймер — макрозадача, он идёт последним даже с задержкой 0: `b`.',
          en: 'Once the stack is empty, the microtask queue runs in insertion order: the `then` callback (`c`), then `queueMicrotask` (`d`). The timer is a macrotask, so it comes last even with a 0 delay: `b`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Microtask guide', url: `${MDN_API}/HTML_DOM_API/Microtask_guide` },
      { title: 'MDN — queueMicrotask()', url: `${MDN_API}/Window/queueMicrotask` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-arrays-output-001',
    kind: 'output',
    topic: 'javascript',
    tags: ['arrays'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `const result = [1, 2, 3, 4]
  .map((n) => n * 2)
  .filter((n) => n > 4)
  .reduce((sum, n) => sum + n, 0);

console.log(result);`,
    },
    answers: ['14'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`map` удваивает элементы: `[2, 4, 6, 8]`. `filter` оставляет те, что больше 4: `[6, 8]`. `reduce` с начальным значением 0 складывает их: `6 + 8 = 14`.',
          en: '`map` doubles the items: `[2, 4, 6, 8]`. `filter` keeps those greater than 4: `[6, 8]`. `reduce` with an initial value of 0 sums them: `6 + 8 = 14`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.filter()', url: `${MDN}/Reference/Global_Objects/Array/filter` },
      { title: 'MDN — Array.prototype.reduce()', url: `${MDN}/Reference/Global_Objects/Array/reduce` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-types-coercion-output-001',
    kind: 'output',
    topic: 'javascript',
    tags: ['types-coercion'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `console.log(typeof typeof 1);`,
    },
    answers: ['string', "'string'", '"string"'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Оператор читается справа налево: `typeof 1` даёт строку `"number"`, а `typeof "number"` — `"string"`. `typeof` всегда возвращает строку, поэтому двойной `typeof` от чего угодно — `"string"`.',
          en: 'It reads right to left: `typeof 1` returns the string `"number"`, and `typeof "number"` is `"string"`. `typeof` always returns a string, so a double `typeof` of anything is `"string"`.',
        },
      },
    ],
    sources: [{ title: 'MDN — typeof', url: `${MDN}/Reference/Operators/typeof` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'js-arrays-bug-001',
    kind: 'bug-line',
    topic: 'javascript',
    tags: ['arrays'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Функция должна вернуть 6, а возвращает NaN. В какой строке ошибка?',
      en: 'The function should return 6 but returns NaN. Which line has the bug?',
    },
    code: {
      lang: 'js',
      source: `function sum(numbers) {
  let total = 0;
  for (let i = 0; i <= numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

sum([1, 2, 3]);`,
    },
    answerLine: 3,
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Индексы массива идут от `0` до `length - 1`. Условие `i <= numbers.length` делает лишнюю итерацию с `i = 3`, где `numbers[3]` — `undefined`, а `6 + undefined` — это `NaN`.',
          en: 'Array indexes run from `0` to `length - 1`. The condition `i <= numbers.length` adds an extra iteration with `i = 3`, where `numbers[3]` is `undefined`, and `6 + undefined` is `NaN`.',
        },
      },
      {
        type: 'code',
        code: { lang: 'js', source: `for (let i = 0; i < numbers.length; i++) {` },
        caption: { ru: 'Правильное условие', en: 'The correct condition' },
      },
    ],
    sources: [{ title: 'MDN — Array: length', url: `${MDN}/Reference/Global_Objects/Array/length` }],
  },
  {
    id: 'js-equality-bug-001',
    kind: 'bug-line',
    topic: 'javascript',
    tags: ['equality'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: '`isSelected` всегда возвращает false, даже для выбранного элемента. В какой строке ошибка?',
      en: '`isSelected` always returns false, even for a selected item. Which line has the bug?',
    },
    code: {
      lang: 'js',
      source: `const selected = [{ id: 1 }, { id: 2 }];

function isSelected(item) {
  return selected.includes({ id: item.id });
}

isSelected({ id: 1 });`,
    },
    answerLine: 4,
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`includes` сравнивает элементы как `===` (точнее, SameValueZero), а объекты равны, только если это **одна и та же ссылка**. Литерал `{ id: item.id }` создаёт новый объект, которого в массиве нет.',
          en: '`includes` compares items like `===` (SameValueZero, to be precise), and objects are equal only when they are **the same reference**. The literal `{ id: item.id }` creates a new object that isn’t in the array.',
        },
      },
      {
        type: 'code',
        code: { lang: 'js', source: `return selected.some((entry) => entry.id === item.id);` },
        caption: { ru: 'Сравнивать по полю', en: 'Compare by a field' },
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.includes()', url: `${MDN}/Reference/Global_Objects/Array/includes` },
      { title: 'MDN — Equality comparisons and sameness', url: `${MDN}/Guide/Equality_comparisons_and_sameness` },
    ],
  },
];
