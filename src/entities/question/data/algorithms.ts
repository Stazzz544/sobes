import type { Question } from '../model/types';

const MDN_JS = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects';
const WIKI = 'https://en.wikipedia.org/wiki';
const BIG_O = 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation';

export const ALGORITHMS_QUESTIONS: Question[] = [
  {
    id: 'algo-big-o-001',
    topic: 'algorithms',
    tags: ['big-o'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какова временная сложность функции?', en: 'What is the time complexity of this function?' },
    code: {
      lang: 'js',
      source: `function countPairs(items) {
  let count = 0;
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      count++;
    }
  }
  return count;
}`,
    },
    options: [{ code: 'O(n)' }, { code: 'O(log n)' }, { code: 'O(n log n)' }, { code: 'O(n²)' }, { code: 'O(2ⁿ)' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Для каждого из n элементов внутренний цикл тоже делает n шагов: всего n · n = n² операций. Вдвое больше данных — вчетверо больше работы.',
          en: 'For each of the n elements the inner loop also runs n times: n · n = n² operations in total. Twice the data means four times the work.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Big-O описывает, как растёт время при росте входа, отбрасывая константы: `2n² + 3n` — это тоже O(n²).',
          en: 'Big-O describes how time grows as input grows, dropping constants: `2n² + 3n` is still O(n²).',
        },
      },
    ],
    sources: [
      { title: 'Khan Academy — Big-O notation', url: BIG_O },
      { title: 'Wikipedia — Big O notation', url: `${WIKI}/Big_O_notation` },
    ],
  },
  {
    id: 'algo-big-o-002',
    topic: 'algorithms',
    tags: ['big-o', 'searching'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какова сложность бинарного поиска в отсортированном массиве из n элементов?',
      en: 'What is the complexity of binary search in a sorted array of n elements?',
    },
    options: [{ code: 'O(1)' }, { code: 'O(log n)' }, { code: 'O(n)' }, { code: 'O(n log n)' }, { code: 'O(n²)' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждое сравнение отбрасывает половину оставшегося диапазона. Чтобы дойти от n элементов до одного, нужно log₂ n делений: для миллиона элементов — около 20 сравнений вместо миллиона при переборе.',
          en: 'Each comparison discards half of the remaining range. Getting from n elements down to one takes log₂ n halvings: about 20 comparisons for a million elements instead of a million with a linear scan.',
        },
      },
      { type: 'diagram', diagram: 'binary-search' },
    ],
    sources: [
      { title: 'Khan Academy — Binary search', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search' },
      { title: 'Wikipedia — Binary search', url: `${WIKI}/Binary_search` },
    ],
  },
  {
    id: 'algo-big-o-003',
    topic: 'algorithms',
    tags: ['big-o', 'hashing'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какова сложность функции для массивов длины n и m, и как её улучшить?',
      en: 'What is the complexity of this function for arrays of length n and m, and how can it be improved?',
    },
    code: {
      lang: 'js',
      source: `function intersect(a, b) {
  return a.filter((x) => b.includes(x));
}`,
    },
    options: [
      {
        text: {
          ru: 'O(n + m): `includes` работает за O(1)',
          en: 'O(n + m): `includes` runs in O(1)',
        },
      },
      {
        text: {
          ru: 'O(n · m); с `Set` из `b` будет O(n + m)',
          en: 'O(n · m); a `Set` built from `b` makes it O(n + m)',
        },
      },
      {
        text: {
          ru: 'O(log n): `includes` использует бинарный поиск',
          en: 'O(log n): `includes` uses binary search',
        },
      },
      {
        text: {
          ru: 'O(n): `filter` проходит массив один раз, остальное — константа',
          en: 'O(n): `filter` walks the array once, the rest is constant',
        },
      },
      {
        text: {
          ru: 'O(n²), и без сортировки обоих массивов не улучшить',
          en: 'O(n²), and it can’t be improved without sorting both arrays',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`filter` проходит n элементов, и для каждого `includes` линейно ищет в `b` — до m шагов. Итого O(n · m). `Set.prototype.has` в среднем работает почти за O(1): в движках это хэш-таблица, а спецификация требует доступ в среднем быстрее линейного.',
          en: '`filter` walks n elements, and for each one `includes` scans `b` linearly — up to m steps. That’s O(n · m). `Set.prototype.has` is close to O(1) on average: engines use hash tables, and the spec requires better-than-linear average access.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function intersect(a, b) {
  const lookup = new Set(b); // O(m)
  return a.filter((x) => lookup.has(x)); // O(n)
}`,
        },
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.includes()', url: `${MDN_JS}/Array/includes` },
      { title: 'MDN — Set', url: `${MDN_JS}/Set` },
    ],
  },
  {
    id: 'algo-big-o-004',
    topic: 'algorithms',
    tags: ['big-o', 'data-structures'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Почему очередь на массиве через `push` + `shift` может тормозить на больших объёмах?',
      en: 'Why can a queue built on an array with `push` + `shift` slow down at large sizes?',
    },
    options: [
      {
        text: {
          ru: '`push` каждый раз выделяет новый массив — O(n), а `shift` — O(1)',
          en: '`push` allocates a new array every time — O(n), while `shift` is O(1)',
        },
      },
      {
        text: {
          ru: 'Массивы в JS — связные списки, и `push` ищет конец за O(n)',
          en: 'JS arrays are linked lists, and `push` finds the end in O(n)',
        },
      },
      {
        text: {
          ru: '`shift` сдвигает все оставшиеся элементы — O(n), а `push` — O(1)',
          en: '`shift` moves every remaining element — O(n), while `push` is O(1)',
        },
      },
      {
        text: {
          ru: '`shift` запускает сборщик мусора после каждого вызова',
          en: '`shift` triggers the garbage collector after every call',
        },
      },
      {
        text: {
          ru: 'Обе операции O(log n): движок хранит массив как дерево',
          en: 'Both are O(log n): the engine stores the array as a tree',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По спецификации `shift` переносит каждый следующий элемент на индекс меньше, поэтому в общем случае его считают O(n). Движки иногда оптимизируют это, но рассчитывать на оптимизацию нельзя. Для больших очередей используют указатель на начало или кольцевой буфер.',
          en: 'Per the spec, `shift` moves every following element down one index, so it’s generally treated as O(n). Engines sometimes optimize it, but you can’t rely on that. For large queues, use a head index or a ring buffer.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const queue = [];
let head = 0;
queue.push(task);           // O(1)
const next = queue[head++]; // O(1), no shift()`,
        },
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.shift()', url: `${MDN_JS}/Array/shift` },
      { title: 'ECMAScript — Array.prototype.shift', url: 'https://tc39.es/ecma262/#sec-array.prototype.shift' },
    ],
  },
  {
    id: 'algo-big-o-005',
    topic: 'algorithms',
    tags: ['big-o', 'recursion'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Сколько дополнительной памяти использует эта функция?',
      en: 'How much extra memory does this function use?',
    },
    code: {
      lang: 'js',
      source: `function sum(n) {
  if (n === 0) {
    return 0;
  }
  return n + sum(n - 1);
}`,
    },
    options: [{ code: 'O(1)' }, { code: 'O(log n)' }, { code: 'O(n)' }, { code: 'O(n²)' }, { code: 'O(2ⁿ)' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Переменных в функции почти нет, но каждый незавершённый вызов хранится в стеке вызовов: `sum(n)` ждёт `sum(n - 1)`, тот ждёт следующего… В пике в стеке n кадров — O(n) памяти. Цикл с одной переменной обошёлся бы O(1).',
          en: 'The function has almost no variables, but every unfinished call sits on the call stack: `sum(n)` waits for `sum(n - 1)`, which waits for the next… At peak there are n frames on the stack — O(n) memory. A loop with one variable would take O(1).',
        },
      },
      { type: 'diagram', diagram: 'recursion-stack' },
    ],
    sources: [
      { title: 'MDN — Recursion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion' },
      { title: 'Khan Academy — Big-O notation', url: BIG_O },
    ],
  },
  {
    id: 'algo-big-o-006',
    topic: 'algorithms',
    tags: ['big-o', 'sorting'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Какова сложность `array.sort()` в V8 (Chrome, Node.js)?',
      en: 'What is the complexity of `array.sort()` in V8 (Chrome, Node.js)?',
    },
    options: [{ code: 'O(n)' }, { code: 'O(log n)' }, { code: 'O(n²)' }, { code: 'O(n log n)' }, { code: 'O(1)' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Спецификация не фиксирует алгоритм, но с 2018 года V8 использует TimSort — гибрид сортировки слиянием и вставками: O(n log n) в худшем случае и почти O(n) на уже частично отсортированных данных.',
          en: 'The spec doesn’t mandate an algorithm, but since 2018 V8 has used TimSort — a hybrid of merge sort and insertion sort: O(n log n) in the worst case and nearly O(n) on partly sorted data.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Сортировка сравнениями в общем случае не может быть быстрее O(n log n).',
          en: 'A comparison sort can’t beat O(n log n) in general.',
        },
      },
    ],
    sources: [
      { title: 'V8 — Getting things sorted in V8', url: 'https://v8.dev/blog/array-sort' },
      { title: 'MDN — Array.prototype.sort()', url: `${MDN_JS}/Array/sort` },
    ],
  },
  {
    id: 'algo-ds-001',
    topic: 'algorithms',
    tags: ['data-structures'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какая структура данных подходит для истории отмены действий (undo)?',
      en: 'Which data structure suits an undo history?',
    },
    options: [
      { text: { ru: 'Очередь (FIFO)', en: 'Queue (FIFO)' } },
      { text: { ru: 'Стек (LIFO)', en: 'Stack (LIFO)' } },
      { text: { ru: 'Множество (Set)', en: 'Set' } },
      { text: { ru: 'Куча (heap)', en: 'Heap' } },
      { text: { ru: 'Хэш-таблица', en: 'Hash map' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Отменяется всегда **последнее** действие — «последним пришёл, первым ушёл» (LIFO). Каждое действие кладётся `push`, отмена делает `pop`. Для redo заводят второй стек.',
          en: 'Undo always reverts the **latest** action — “last in, first out” (LIFO). Each action is `push`ed, and undo `pop`s it. Redo uses a second stack.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Очередь (FIFO) — для задач по порядку поступления: обработка событий, BFS. Стек — ещё и стек вызовов функций, обход в глубину, проверка скобок.',
          en: 'A queue (FIFO) is for first-come processing: event handling, BFS. Stacks also power the function call stack, depth-first traversal and bracket matching.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Stack (abstract data type)', url: `${WIKI}/Stack_(abstract_data_type)` },
      { title: 'Wikipedia — Queue (abstract data type)', url: `${WIKI}/Queue_(abstract_data_type)` },
    ],
  },
  {
    id: 'algo-ds-002',
    topic: 'algorithms',
    tags: ['data-structures'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const stack = [];
stack.push(1);
stack.push(2);
stack.push(3);

const queue = [1, 2, 3];

console.log(stack.pop(), queue.shift());`,
    },
    options: [{ code: '1 3' }, { code: '3 3' }, { code: '3 1' }, { code: '1 1' }, { code: '2 2' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Массив в JavaScript легко превратить и в стек, и в очередь. Стек: `push` + `pop` работают с концом — достаём последний добавленный, 3. Очередь: `push` в конец + `shift` из начала — достаём первый, 1.',
          en: 'A JavaScript array works as both a stack and a queue. Stack: `push` + `pop` work at the end — you get the last item added, 3. Queue: `push` to the end + `shift` from the front — you get the first, 1.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.pop()', url: `${MDN_JS}/Array/pop` },
      { title: 'MDN — Array.prototype.shift()', url: `${MDN_JS}/Array/shift` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-ds-003',
    topic: 'algorithms',
    tags: ['data-structures'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function isBalanced(text) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const char of text) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else if (char in pairs) {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log(isBalanced('({[]})'), isBalanced('([)]'), isBalanced('(('));`,
    },
    options: [
      { code: 'true true false' },
      { code: 'true false true' },
      { code: 'false false false' },
      { code: 'true false false' },
      { code: 'true true true' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Классическая задача на стек. Открывающую скобку кладём в стек, на закрывающей снимаем верхнюю и проверяем пару. `([)]` ломается на `)`: сверху лежит `[`. Для `((` все символы прошли, но стек не пуст — скобки не закрыты.',
          en: 'A classic stack problem. Push opening brackets; on a closing one, pop the top and check the pair. `([)]` fails at `)`: the top is `[`. For `((` every character passes, but the stack isn’t empty — the brackets are left open.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Сложность — O(n) по времени и O(n) по памяти в худшем случае.',
          en: 'Complexity: O(n) time and O(n) memory in the worst case.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Stack (abstract data type)', url: `${WIKI}/Stack_(abstract_data_type)` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-ds-004',
    topic: 'algorithms',
    tags: ['data-structures', 'big-o'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Из потока в миллионы чисел нужно постоянно держать 10 самых больших. Что эффективнее всего?',
      en: 'From a stream of millions of numbers you must always keep the 10 largest. What’s most efficient?',
    },
    options: [
      {
        text: {
          ru: 'После каждого нового числа сортировать весь накопленный массив',
          en: 'Sort the whole accumulated array after every new number',
        },
      },
      {
        text: {
          ru: 'Мин-куча из 10 элементов: новое число вытесняет минимум, O(n log k)',
          en: 'A min-heap of 10: a new number evicts the minimum, O(n log k)',
        },
      },
      {
        text: {
          ru: 'Складывать числа в `Set` и брать первые 10: он хранит их по убыванию',
          en: 'Put the numbers into a `Set` and take the first 10: it keeps them in descending order',
        },
      },
      {
        text: {
          ru: 'Стек: класть число, только если оно больше верхнего',
          en: 'A stack: push a number only if it’s larger than the top',
        },
      },
      {
        text: {
          ru: 'Связный список: вставка в начало O(1), максимум искать после каждого числа',
          en: 'A linked list: O(1) insert at the head, find the maximum after each number',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Куча (heap) даёт доступ к минимуму за O(1), а вставка и удаление стоят O(log k). Держим кучу из k = 10 элементов: если новое число больше минимума, заменяем минимум. Время — O(n log k), память — O(k), и она не растёт с потоком.',
          en: 'A heap gives O(1) access to its minimum, while insertion and removal cost O(log k). Keep a heap of k = 10: if a new number beats the minimum, replace the minimum. Time is O(n log k), memory O(k), which doesn’t grow with the stream.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Сортировка после каждого числа — O(n² log n) в сумме. Во фронтенде кучи встречаются в планировщиках задач — например, в планировщике React.',
          en: 'Sorting after every number totals O(n² log n). In the frontend, heaps show up in task schedulers — for example, React’s scheduler.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Heap (data structure)', url: `${WIKI}/Heap_(data_structure)` }],
  },
  {
    id: 'algo-ds-005',
    topic: 'algorithms',
    tags: ['data-structures', 'big-o'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чем вставка элемента в начало массива отличается от вставки в начало связного списка?',
      en: 'How does inserting at the start of an array differ from inserting at the start of a linked list?',
    },
    options: [
      {
        text: {
          ru: 'Ничем: обе O(1), движок просто сдвигает указатель начала',
          en: 'No difference: both are O(1), the engine just moves a start pointer',
        },
      },
      {
        text: {
          ru: 'Массив — O(n): элементы сдвигаются; список — O(1): меняется голова',
          en: 'Array: O(n), elements shift; list: O(1), only the head changes',
        },
      },
      {
        text: {
          ru: 'Массив — O(1) через `unshift`, список — O(n): нужно дойти до конца',
          en: 'Array: O(1) via `unshift`; list: O(n), you have to walk to the end',
        },
      },
      {
        text: {
          ru: 'В обоих случаях O(log n): позиция ищется бинарным поиском',
          en: 'O(log n) in both cases: the position is found by binary search',
        },
      },
      {
        text: {
          ru: 'Список — O(n): в начало можно вставить, только пересобрав его',
          en: 'List: O(n), inserting at the start means rebuilding it',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Массив хранит элементы подряд, поэтому `unshift` сдвигает все n элементов. В связном списке каждый узел хранит ссылку на следующий: новый узел просто указывает на старую голову.',
          en: 'An array stores elements contiguously, so `unshift` shifts all n elements. In a linked list each node references the next: the new node simply points to the old head.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Зато доступ по индексу у массива — O(1), а у списка — O(n): нужно пройти узлы по цепочке.',
          en: 'On the other hand, index access is O(1) for an array and O(n) for a list: you have to walk the chain.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Linked list', url: `${WIKI}/Linked_list` },
      { title: 'MDN — Array.prototype.unshift()', url: `${MDN_JS}/Array/unshift` },
    ],
  },
  {
    id: 'algo-hash-001',
    topic: 'algorithms',
    tags: ['hashing'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) {
      return [seen.get(need), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9).join(','), twoSum([3, 2, 4], 6).join(','));`,
    },
    options: [{ code: '0,1 0,2' }, { code: '1,0 2,1' }, { code: '0,1 1,2' }, { code: '0,1 0,0' }, { code: '2,7 2,4' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Функция возвращает индексы двух чисел с нужной суммой. Для каждого числа проверяем, встречалось ли раньше «недостающее» `target - x`. Во втором примере `3 + 3` не подходит: у числа 3 нет пары, а 2 (индекс 1) и 4 (индекс 2) дают 6.',
          en: 'The function returns the indices of two numbers that add up to the target. For each number we check whether the “missing” `target - x` was seen before. In the second example `3 + 3` doesn’t count: 3 has no partner, while 2 (index 1) and 4 (index 2) make 6.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Перебор всех пар — O(n²), с `Map` — один проход, O(n) по времени и O(n) по памяти. Это одна из самых популярных задач на собеседованиях.',
          en: 'Checking all pairs is O(n²); with a `Map` it’s a single pass, O(n) time and O(n) memory. It’s one of the most popular interview problems.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Map', url: `${MDN_JS}/Map` },
      { title: 'Wikipedia — Hash table', url: `${WIKI}/Hash_table` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-hash-002',
    topic: 'algorithms',
    tags: ['hashing', 'sorting'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const sortLetters = (word) => [...word].sort().join('');
const isAnagram = (a, b) => sortLetters(a) === sortLetters(b);

console.log(isAnagram('listen', 'silent'), isAnagram('rat', 'car'));`,
    },
    options: [
      { code: 'true true' },
      { code: 'true false' },
      { code: 'false false' },
      { code: 'false true' },
      { code: 'undefined undefined' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Анаграммы состоят из одних и тех же букв. После сортировки букв `listen` и `silent` оба дают `eilnst`. `rat` → `art`, `car` → `acr` — не совпадают.',
          en: 'Anagrams consist of the same letters. After sorting, `listen` and `silent` both become `eilnst`. `rat` → `art`, `car` → `acr` — no match.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Сортировка стоит O(n log n). Быстрее — посчитать частоты букв в `Map` или объекте за O(n) и сравнить.',
          en: 'Sorting costs O(n log n). Faster is counting letter frequencies in a `Map` or object in O(n) and comparing them.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.sort()', url: `${MDN_JS}/Array/sort` },
      { title: 'Wikipedia — Anagram', url: `${WIKI}/Anagram` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-hash-003',
    topic: 'algorithms',
    tags: ['hashing'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function firstUnique(text) {
  const counts = new Map();
  for (const char of text) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }
  for (const char of text) {
    if (counts.get(char) === 1) {
      return char;
    }
  }
  return null;
}

console.log(firstUnique('swiss'), firstUnique('aabb'));`,
    },
    options: [
      { code: 's null' },
      { code: 'w undefined' },
      { code: 'w null' },
      { code: 'i null' },
      { code: 's a' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Первый проход считает частоту каждого символа, второй находит первый символ с частотой 1. В `swiss` буква `s` встречается три раза, `w` и `i` — по одному, и `w` идёт раньше. В `aabb` уникальных нет — `null`.',
          en: 'The first pass counts each character, the second finds the first one with a count of 1. In `swiss`, `s` appears three times while `w` and `i` appear once, and `w` comes first. `aabb` has no unique characters — `null`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Два прохода по n символам — O(n). Вложенный цикл с `indexOf`/`lastIndexOf` дал бы O(n²).',
          en: 'Two passes over n characters — O(n). A nested loop with `indexOf`/`lastIndexOf` would be O(n²).',
        },
      },
    ],
    sources: [{ title: 'MDN — Map', url: `${MDN_JS}/Map` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-hash-004',
    topic: 'algorithms',
    tags: ['hashing', 'big-o'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Чем отличаются эти два способа удалить дубликаты?',
      en: 'How do these two ways of removing duplicates differ?',
    },
    code: {
      lang: 'js',
      source: `const unique1 = items.filter((item, index) => items.indexOf(item) === index);
const unique2 = [...new Set(items)];`,
    },
    options: [
      {
        text: {
          ru: 'Второй сортирует элементы: `Set` хранит значения упорядоченно',
          en: 'The second sorts the elements: a `Set` keeps values ordered',
        },
      },
      {
        text: {
          ru: 'Результат тот же, но первый — O(n²), а второй — O(n)',
          en: 'Same result, but the first is O(n²) and the second O(n)',
        },
      },
      {
        text: {
          ru: 'Первый теряет `0` и пустые строки, потому что они ложные',
          en: 'The first drops `0` and empty strings because they’re falsy',
        },
      },
      {
        text: {
          ru: 'Второй удаляет только стоящие рядом дубликаты',
          en: 'The second only removes adjacent duplicates',
        },
      },
      {
        text: {
          ru: 'Никакой: оба O(n), `indexOf` кэширует результаты',
          en: 'None: both are O(n), `indexOf` caches its results',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`indexOf` внутри `filter` для каждого элемента снова ищет с начала массива — O(n) на элемент, O(n²) всего. `Set` хранит уникальные значения и проверяет наличие в среднем за O(1), а порядок первого появления сохраняется.',
          en: '`indexOf` inside `filter` searches from the start for every element — O(n) each, O(n²) total. A `Set` keeps unique values with O(1) average lookups, and it preserves first-occurrence order.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'На 100 тысячах элементов разница — миллисекунды против секунд. Нюанс: оба способа сравнивают объекты по ссылке, а не по содержимому.',
          en: 'With 100,000 items the difference is milliseconds versus seconds. Caveat: both compare objects by reference, not by content.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Set', url: `${MDN_JS}/Set` },
      { title: 'MDN — Array.prototype.indexOf()', url: `${MDN_JS}/Array/indexOf` },
    ],
  },
  {
    id: 'algo-search-001',
    topic: 'algorithms',
    tags: ['searching'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какое условие обязательно для бинарного поиска?',
      en: 'What condition is required for binary search?',
    },
    options: [
      {
        text: {
          ru: 'Массив должен быть отсортирован',
          en: 'The array must be sorted',
        },
      },
      {
        text: {
          ru: 'В массиве должно быть чётное число элементов',
          en: 'The array must have an even number of elements',
        },
      },
      {
        text: {
          ru: 'Все элементы должны быть уникальными строками',
          en: 'All elements must be unique strings',
        },
      },
      {
        text: {
          ru: 'Массив должен лежать в `Set`',
          en: 'The array must be stored in a `Set`',
        },
      },
      {
        text: {
          ru: 'Никаких условий: он работает с любым массивом',
          en: 'None: it works with any array',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Бинарный поиск сравнивает искомое значение с серединой и отбрасывает половину, где ответа быть не может. Это корректно, только если элементы упорядочены: всё левее середины меньше, правее — больше.',
          en: 'Binary search compares the target with the middle and discards the half that can’t contain it. That only works if elements are ordered: everything left of the middle is smaller, everything right is larger.',
        },
      },
      { type: 'diagram', diagram: 'binary-search' },
    ],
    sources: [{ title: 'Wikipedia — Binary search', url: `${WIKI}/Binary_search` }],
  },
  {
    id: 'algo-search-002',
    topic: 'algorithms',
    tags: ['searching'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function binarySearch(items, target) {
  let low = 0;
  let high = items.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (items[middle] === target) {
      return middle;
    }
    if (items[middle] < target) {
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  return -1;
}

const items = [3, 8, 12, 17, 23, 31, 42];
console.log(binarySearch(items, 23), binarySearch(items, 5));`,
    },
    options: [{ code: '5 -1' }, { code: '4 0' }, { code: '3 -1' }, { code: '4 undefined' }, { code: '4 -1' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '23 стоит на индексе 4 — его находят за 3 сравнения: 17, 31, 23. Числа 5 в массиве нет: диапазон сужается, пока `low` не станет больше `high`, и функция возвращает -1.',
          en: '23 is at index 4 — found in 3 comparisons: 17, 31, 23. 5 isn’t in the array: the range shrinks until `low` passes `high`, and the function returns -1.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Частая ошибка — условие `low < high`: тогда диапазон из одного элемента не проверяется, и поиск последнего кандидата промахивается.',
          en: 'A common bug is `low < high`: a single-element range is never checked, so the last candidate gets missed.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Binary search', url: `${WIKI}/Binary_search` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-sort-001',
    topic: 'algorithms',
    tags: ['sorting'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код в современном движке?', en: 'What will this code log in a modern engine?' },
    code: {
      lang: 'js',
      source: `const people = [
  { name: 'Ann', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Cid', age: 30 },
  { name: 'Dan', age: 25 },
];

people.sort((a, b) => a.age - b.age);
console.log(people.map((person) => person.name).join(' '));`,
    },
    options: [
      { code: 'Dan Bob Cid Ann' },
      { code: 'Bob Dan Cid Ann' },
      { code: 'Ann Cid Bob Dan' },
      { code: 'Dan Bob Ann Cid' },
      { code: 'Bob Dan Ann Cid' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'С ES2019 `Array.prototype.sort` обязан быть **стабильным**: элементы с одинаковым ключом сохраняют исходный взаимный порядок. Среди 25-летних Bob шёл раньше Dan, среди 30-летних Ann — раньше Cid.',
          en: 'Since ES2019 `Array.prototype.sort` must be **stable**: elements with equal keys keep their original relative order. Among the 25-year-olds Bob came before Dan; among the 30-year-olds Ann came before Cid.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Стабильность позволяет сортировать по нескольким полям последовательно: сначала по имени, потом по возрасту — и внутри возраста имена останутся упорядоченными.',
          en: 'Stability lets you sort by several fields in sequence: first by name, then by age — and names stay ordered within each age.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.sort(): sort stability', url: `${MDN_JS}/Array/sort#sort_stability` },
      { title: 'V8 — Stable Array.prototype.sort', url: 'https://v8.dev/features/stable-sort' },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-sort-002',
    topic: 'algorithms',
    tags: ['sorting', 'big-o'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чем сортировка слиянием (merge sort) отличается от быстрой сортировки (quick sort)?',
      en: 'How does merge sort differ from quick sort?',
    },
    options: [
      {
        text: {
          ru: 'Merge sort — всегда O(n log n), но тратит O(n) памяти; quick sort в худшем — O(n²)',
          en: 'Merge sort is always O(n log n) but uses O(n) memory; quick sort is O(n²) at worst',
        },
      },
      {
        text: {
          ru: 'Quick sort всегда O(n log n) благодаря опорному элементу, а merge sort в худшем O(n²)',
          en: 'Quick sort is always O(n log n) thanks to the pivot, while merge sort is O(n²) at worst',
        },
      },
      {
        text: {
          ru: 'Merge sort — O(n), потому что слияние линейно; quick sort — всегда O(n²)',
          en: 'Merge sort is O(n) because merging is linear; quick sort is always O(n²)',
        },
      },
      {
        text: {
          ru: 'Merge sort сортирует только числа, а quick sort — любые значения через функцию сравнения',
          en: 'Merge sort only sorts numbers, while quick sort sorts anything via a compare function',
        },
      },
      {
        text: {
          ru: 'Это один алгоритм: quick sort — просто merge sort с опорным элементом',
          en: 'They’re one algorithm: quick sort is just merge sort with a pivot',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Merge sort делит массив пополам, сортирует части и сливает их — всегда O(n log n) и стабильно, но для слияния нужен буфер O(n). Quick sort выбирает опорный элемент и раскладывает остальные по сторонам прямо в массиве, обычно теряя стабильность. Если опорный постоянно оказывается крайним (например, на отсортированных данных при выборе первого элемента), получается O(n²).',
          en: 'Merge sort splits the array in half, sorts the halves and merges them — always O(n log n) and stable, but merging needs an O(n) buffer. Quick sort picks a pivot and partitions the rest around it in place, usually losing stability. If the pivot keeps landing at an extreme (e.g. first-element pivot on sorted data), it degrades to O(n²).',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'На практике quick sort часто быстрее из-за работы на месте и кэша процессора, а случайный выбор опорного делает худший случай маловероятным.',
          en: 'In practice quick sort is often faster thanks to in-place work and CPU caches, and random pivots make the worst case unlikely.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Merge sort', url: `${WIKI}/Merge_sort` },
      { title: 'Wikipedia — Quicksort', url: `${WIKI}/Quicksort` },
    ],
  },
];
