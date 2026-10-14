import type { Question } from '../model/types';

const WIKI = 'https://en.wikipedia.org/wiki';

export const ALGORITHMS_QUESTIONS_3: Question[] = [
  {
    id: 'algo-big-o-order-001',
    kind: 'order',
    topic: 'algorithms',
    tags: ['big-o'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Расставьте сложности от самой быстрой к самой медленной при больших n.',
      en: 'Order the complexities from fastest to slowest for large n.',
    },
    items: [{ code: 'O(1)' }, { code: 'O(log n)' }, { code: 'O(n)' }, { code: 'O(n log n)' }, { code: 'O(n^2)' }, { code: 'O(2^n)' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`O(1)` — доступ по индексу, `O(log n)` — бинарный поиск, `O(n)` — один проход, `O(n log n)` — хорошие сортировки, `O(n^2)` — вложенные циклы, `O(2^n)` — перебор всех подмножеств.',
          en: '`O(1)` — index access, `O(log n)` — binary search, `O(n)` — a single pass, `O(n log n)` — good sorts, `O(n^2)` — nested loops, `O(2^n)` — enumerating all subsets.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'При n = 1000: log n ≈ 10, n log n ≈ 10 000, n² = 1 000 000, а 2ⁿ уже больше числа атомов во Вселенной.',
          en: 'At n = 1000: log n ≈ 10, n log n ≈ 10,000, n² = 1,000,000, while 2ⁿ already exceeds the number of atoms in the universe.',
        },
      },
    ],
    sources: [
      { title: 'Khan Academy — Big-O notation', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation' },
      { title: 'Wikipedia — Time complexity', url: `${WIKI}/Time_complexity` },
    ],
  },
  {
    id: 'algo-searching-bug-001',
    kind: 'bug-line',
    topic: 'algorithms',
    tags: ['searching'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Поиск иногда зацикливается. В какой строке ошибка?',
      en: 'The search sometimes loops forever. Which line has the bug?',
    },
    code: {
      lang: 'js',
      source: `function binarySearch(items, target) {
  let low = 0;
  let high = items.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (items[mid] === target) {
      return mid;
    }
    if (items[mid] < target) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}`,
    },
    answerLine: 10,
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`mid` уже проверен, поэтому граница должна сдвигаться за него: `low = mid + 1`. Иначе при `low === mid` (например, `low = 0`, `high = 1`) диапазон перестаёт сужаться, и цикл крутится вечно.',
          en: '`mid` has already been checked, so the bound must move past it: `low = mid + 1`. Otherwise, when `low === mid` (e.g. `low = 0`, `high = 1`), the range stops shrinking and the loop never ends.',
        },
      },
    ],
    sources: [
      { title: 'Khan Academy — Binary search', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search' },
      { title: 'Wikipedia — Binary search', url: `${WIKI}/Binary_search` },
    ],
  },
  {
    id: 'algo-recursion-output-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['recursion'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `function f(n) {
  if (n <= 1) {
    return n;
  }
  return f(n - 1) + f(n - 2);
}

console.log(f(7));`,
    },
    answers: ['13'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это числа Фибоначчи: f(0) = 0, f(1) = 1, дальше каждое — сумма двух предыдущих: 1, 2, 3, 5, 8, 13. f(7) = 13.',
          en: 'These are Fibonacci numbers: f(0) = 0, f(1) = 1, then each is the sum of the previous two: 1, 2, 3, 5, 8, 13. f(7) = 13.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Такая рекурсия работает за `O(2^n)`: одни и те же значения считаются много раз. Мемоизация или цикл дают `O(n)`.',
          en: 'This recursion runs in `O(2^n)`: the same values are recomputed many times. Memoization or a loop brings it down to `O(n)`.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Fibonacci sequence', url: `${WIKI}/Fibonacci_sequence` }],
    verify: { kind: 'js-output' },
  },
];
