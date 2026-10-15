import type { Question } from '../model/types';

const WIKI = 'https://en.wikipedia.org/wiki';
const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const ALGORITHMS_QUESTIONS_5: Question[] = [
  {
    id: 'algo-ds-brackets-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['data-structures'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const PAIRS = { ')': '(', ']': '[', '}': '{' };

const isBalanced = (text) => {
  const stack = [];
  for (const char of text) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else if (char in PAIRS && stack.pop() !== PAIRS[char]) {
      return false;
    }
  }
  return stack.length === 0;
};

console.log(isBalanced('({[]})'), isBalanced('([)]'), isBalanced('(('), isBalanced('a(b)c'));`,
    },
    answers: ['true false false true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Открывающую скобку кладём в стек, закрывающая должна совпасть с верхушкой стека. `([)]` ломается на `)`: сверху лежит `[`. `((` проходит цикл, но стек в конце не пуст — две скобки не закрыты. Остальные символы пропускаются. Один проход и стек: время O(n), память O(n). Та же идея проверяет вложенность тегов и выражений.',
          en: 'An opening bracket is pushed onto the stack, and a closing one must match the top. `([)]` fails on `)`: the top is `[`. `((` survives the loop, but the stack isn’t empty at the end — two brackets are unclosed. Other characters are skipped. One pass with a stack: O(n) time, O(n) memory. The same idea checks nesting of tags and expressions.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Stack (abstract data type)', url: `${WIKI}/Stack_(abstract_data_type)` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-sort-locale-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['sorting'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const words = ['zebra', 'Äpfel', 'apple'];

console.log(
  [...words].sort().join(','),
  [...words].sort((a, b) => a.localeCompare(b, 'de')).join(','),
);`,
    },
    answers: ['apple,zebra,Äpfel Äpfel,apple,zebra'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`sort()` без компаратора сравнивает строки по кодам UTF-16: `Ä` (U+00C4) больше любой латинской буквы, поэтому «Äpfel» уезжает в конец. `localeCompare` с локалью сортирует по правилам языка: `Ä` считается вариантом `A`, а дальше сравнение идёт по буквам — `f` раньше `p`. Для списков, которые видит пользователь, нужен `localeCompare` или `Intl.Collator` (он быстрее при многократных сравнениях). То же с кириллицей: «ё» без локали окажется после «я».',
          en: '`sort()` without a comparator compares strings by UTF-16 code units: `Ä` (U+00C4) is greater than any Latin letter, so “Äpfel” goes last. `localeCompare` with a locale sorts by the language’s rules: `Ä` is treated as a variant of `A`, then letters are compared — `f` comes before `p`. For user-facing lists use `localeCompare` or `Intl.Collator` (faster for repeated comparisons). Cyrillic has the same issue: without a locale “ё” lands after “я”.',
        },
      },
    ],
    sources: [{ title: 'MDN — String.prototype.localeCompare()', url: `${MDN}/String/localeCompare` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-search-first-bad-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['searching'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Версии 1–100, начиная с какой-то версии сборка сломана. Бинарный поиск ищет первую сломанную и считает проверки. Что выведет код? Впишите ответ.',
      en: 'Versions 1–100; from some version on the build is broken. Binary search finds the first broken one and counts the checks. What will this code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `let calls = 0;
const isBad = (version) => {
  calls += 1;
  return version >= 37;
};

let low = 1;
let high = 100;
while (low < high) {
  const middle = Math.floor((low + high) / 2);
  if (isBad(middle)) {
    high = middle;
  } else {
    low = middle + 1;
  }
}

console.log(low, calls);`,
    },
    answers: ['37 7'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждая проверка вдвое сужает диапазон: 100 → 50 → 25 → 13 → 7 → 4 → 2 → 1, поэтому хватает 7 проверок — ⌈log₂ 100⌉. Обратите внимание на границы: при плохой версии `high = middle` (она может быть ответом), при хорошей `low = middle + 1`. Так работает `git bisect`, и так же ищут «левую границу» в отсортированном массиве.',
          en: 'Each check halves the range: 100 → 50 → 25 → 13 → 7 → 4 → 2 → 1, so 7 checks are enough — ⌈log₂ 100⌉. Mind the bounds: on a bad version `high = middle` (it may be the answer), on a good one `low = middle + 1`. This is how `git bisect` works, and how you find the “left bound” in a sorted array.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Binary search', url: `${WIKI}/Binary_search` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-hash-group-anagrams-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['hashing'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const groups = new Map();
for (const word of ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']) {
  const key = [...word].sort().join('');
  groups.set(key, [...(groups.get(key) ?? []), word]);
}

console.log(groups.size, groups.get('aet').join(','));`,
    },
    answers: ['3 eat,tea,ate'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ключ группы — буквы слова в отсортированном порядке: у анаграмм он одинаковый (`aet`, `ant`, `abt`). Хеш-таблица собирает слова по ключу за один проход, а `Map` сохраняет порядок добавления. Сложность — O(n · k log k), где k — длина слова. Приём «нормализовать в ключ и сгруппировать» решает много задач: дубли без учёта регистра, группировка по дате, поиск похожих записей.',
          en: 'The group key is the word’s letters in sorted order: anagrams share it (`aet`, `ant`, `abt`). A hash map groups words by key in one pass, and `Map` keeps insertion order. Complexity is O(n · k log k), where k is the word length. “Normalize into a key and group” solves many tasks: case-insensitive duplicates, grouping by date, finding similar records.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Hash table', url: `${WIKI}/Hash_table` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-tp-sliding-window-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['two-pointers'],
    difficulty: 1,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const maxSum = (numbers, size) => {
  let sum = numbers.slice(0, size).reduce((total, value) => total + value, 0);
  let best = sum;
  for (let index = size; index < numbers.length; index += 1) {
    sum += numbers[index] - numbers[index - size];
    best = Math.max(best, sum);
  }
  return best;
};

console.log(maxSum([2, 1, 5, 1, 3, 2], 3));`,
    },
    answers: ['9'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '«Скользящее окно» не пересчитывает сумму заново: при сдвиге добавляет новый элемент и вычитает ушедший. Суммы окон: 8, 7, 9, 6 — максимум 9 (`5 + 1 + 3`). Вместо O(n · k) получается O(n). Так считают скользящее среднее, лимиты запросов за последнюю минуту, лучший период на графике.',
          en: 'A sliding window doesn’t recompute the sum: on each shift it adds the new element and subtracts the one that left. The window sums are 8, 7, 9, 6 — the max is 9 (`5 + 1 + 3`). O(n) instead of O(n · k). Moving averages, per-minute rate limits and the best period on a chart are computed this way.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Moving average', url: `${WIKI}/Moving_average` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-ds-prefix-sums-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['data-structures'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const numbers = [3, 1, 4, 1, 5];
const prefix = [0];
for (const value of numbers) {
  prefix.push(prefix.at(-1) + value);
}

const rangeSum = (from, to) => prefix[to + 1] - prefix[from];
console.log(rangeSum(1, 3), rangeSum(0, 4));`,
    },
    answers: ['6 14'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Префиксные суммы: `prefix[i]` — сумма первых `i` элементов (`0, 3, 4, 8, 9, 14`). Сумма любого отрезка — разность двух префиксов: `prefix[4] − prefix[1]` = 9 − 3 = 6. Подготовка O(n), каждый запрос O(1) вместо O(n). Нужно, когда запросов много: суммы за произвольный период в отчёте, число событий между датами.',
          en: 'Prefix sums: `prefix[i]` is the sum of the first `i` elements (`0, 3, 4, 8, 9, 14`). Any range sum is a difference of two prefixes: `prefix[4] − prefix[1]` = 9 − 3 = 6. Preparation is O(n), each query O(1) instead of O(n). Useful when there are many queries: sums over arbitrary report periods, event counts between dates.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Prefix sum', url: `${WIKI}/Prefix_sum` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-graph-cycle-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['trees-graphs', 'recursion'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Функция ищет циклические зависимости между модулями. Что выведет код? Впишите ответ.',
      en: 'The function looks for circular dependencies between modules. What will this code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const hasCycle = (graph) => {
  const state = {};
  const visit = (node) => {
    if (state[node] === 'visiting') return true;
    if (state[node] === 'done') return false;
    state[node] = 'visiting';
    const found = (graph[node] ?? []).some(visit);
    state[node] = 'done';
    return found;
  };
  return Object.keys(graph).some(visit);
};

console.log(hasCycle({ a: ['b'], b: ['c'], c: ['a'] }), hasCycle({ a: ['b', 'c'], b: ['c'], c: [] }));`,
    },
    answers: ['true false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обход в глубину с тремя состояниями: не посещён, «в обработке» (узел на текущем пути) и «готов». Цикл — это встреча узла, который ещё в обработке: `a → b → c → a`. Во втором графе `c` достигается дважды, но к этому моменту он уже «готов» — это ромб, а не цикл. Двух состояний (просто «посещён») мало: ромб приняли бы за цикл. Так сборщики и линтеры находят циклические импорты.',
          en: 'Depth-first search with three states: unvisited, “visiting” (on the current path) and “done”. A cycle means reaching a node that’s still visiting: `a → b → c → a`. In the second graph `c` is reached twice, but by then it’s already “done” — a diamond, not a cycle. Two states (just “visited”) aren’t enough: the diamond would be mistaken for a cycle. Bundlers and linters find circular imports this way.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Cycle (graph theory): Cycle detection', url: `${WIKI}/Cycle_(graph_theory)` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-dp-lcs-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['dynamic-programming'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const lcs = (left, right) => {
  const table = Array.from({ length: left.length + 1 }, () => new Array(right.length + 1).fill(0));
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      table[i][j] =
        left[i - 1] === right[j - 1] ? table[i - 1][j - 1] + 1 : Math.max(table[i - 1][j], table[i][j - 1]);
    }
  }
  return table[left.length][right.length];
};

console.log(lcs('ABCBDAB', 'BDCABA'), lcs('kitten', 'sitting'));`,
    },
    answers: ['4 4'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Наибольшая общая подпоследовательность (буквы в том же порядке, не обязательно подряд): для первой пары — например, `BCBA`, для второй — `ittn`. Таблица хранит ответ для всех префиксов: совпали последние буквы — берём диагональ + 1, нет — лучшее из соседей. Время и память O(n · m). На этом построены `diff`, сравнение версий текста и подсветка изменений в ревью.',
          en: 'The longest common subsequence (letters in the same order, not necessarily adjacent): for the first pair, e.g. `BCBA`; for the second, `ittn`. The table stores the answer for every pair of prefixes: if the last letters match, take the diagonal + 1, otherwise the better neighbor. O(n · m) time and memory. `diff`, text version comparison and change highlighting in code review build on this.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Longest common subsequence', url: `${WIKI}/Longest_common_subsequence` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-rec-permutations-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['recursion'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const permutations = (letters) =>
  letters.length <= 1
    ? [letters]
    : [...letters].flatMap((letter, index) =>
        permutations(letters.slice(0, index) + letters.slice(index + 1)).map((rest) => letter + rest),
      );

console.log(permutations('abc').join(' '));`,
    },
    answers: ['abc acb bac bca cab cba'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Рекурсия «зафиксируй первый символ и переставь остальные»: для каждой буквы строятся все перестановки оставшихся, и буква ставится в начало. Базовый случай — строка из одного символа. Перестановок n!, поэтому уже для 10 символов их 3 628 800 — перебор всех вариантов годится только для маленьких n.',
          en: 'Recursion as “fix the first character and permute the rest”: for each letter, all permutations of the remaining ones are built and the letter is prepended. The base case is a one-character string. There are n! permutations, so 10 characters already give 3,628,800 — brute force only works for small n.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Permutation', url: `${WIKI}/Permutation` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-ds-lru-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['data-structures', 'hashing'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'LRU-кеш на две записи построен на `Map`. Что выведет код? Впишите ответ.',
      en: 'A two-entry LRU cache is built on `Map`. What will this code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const createLru = (capacity) => {
  const cache = new Map();
  return {
    get(key) {
      if (!cache.has(key)) return undefined;
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    },
    set(key, value) {
      cache.delete(key);
      cache.set(key, value);
      if (cache.size > capacity) cache.delete(cache.keys().next().value);
    },
    keys: () => [...cache.keys()].join(','),
  };
};

const lru = createLru(2);
lru.set('a', 1);
lru.set('b', 2);
lru.get('a');
lru.set('c', 3);
console.log(lru.keys(), lru.get('b'));`,
    },
    answers: ['a,c undefined'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Map` помнит порядок вставки, и на этом держится LRU: при каждом обращении ключ удаляется и вставляется заново — переезжает в конец как самый свежий. При переполнении вытесняется первый ключ — тот, к которому дольше всех не обращались. После `get("a")` старейшим стал `b`, его и вытеснил `c`. Все операции — O(1). Так кешируют ответы API, результаты тяжёлых вычислений, картинки.',
          en: '`Map` remembers insertion order, and that’s what makes the LRU work: on every access the key is deleted and reinserted — moved to the end as the freshest. On overflow the first key — the least recently used — is evicted. After `get("a")` the oldest is `b`, so `c` evicts it. All operations are O(1). API responses, expensive computations and images are cached this way.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Cache replacement policies: LRU', url: `${WIKI}/Cache_replacement_policies` }],
    verify: { kind: 'js-output' },
  },
];
