import type { Question } from '../model/types';

const MDN_JS = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects';
const WIKI = 'https://en.wikipedia.org/wiki';

export const ALGORITHMS_QUESTIONS_2: Question[] = [
  {
    id: 'algo-rec-001',
    topic: 'algorithms',
    tags: ['recursion', 'big-o'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `let calls = 0;

function fib(n) {
  calls++;
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

console.log(fib(10), calls);`,
    },
    options: [{ code: '55 10' }, { code: '55 55' }, { code: '89 177' }, { code: '55 1024' }, { code: '55 177' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждый вызов порождает два новых, и одни и те же значения считаются снова и снова: `fib(8)` — дважды, `fib(7)` — трижды, `fib(2)` — 34 раза. Всего 177 вызовов ради числа 55.',
          en: 'Every call spawns two more, and the same values are recomputed again and again: `fib(8)` twice, `fib(7)` three times, `fib(2)` 34 times. That’s 177 calls to get 55.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Число вызовов растёт экспоненциально (примерно 1.6ⁿ, на собеседовании обычно говорят O(2ⁿ)): `fib(40)` — уже больше 300 миллионов вызовов. Лечится мемоизацией или циклом.',
          en: 'The call count grows exponentially (about 1.6ⁿ, usually stated as O(2ⁿ) in interviews): `fib(40)` takes over 300 million calls. Memoization or a loop fixes it.',
        },
      },
    ],
    sources: [
      { title: 'javascript.info — Recursion and stack', url: 'https://javascript.info/recursion' },
      { title: 'Wikipedia — Fibonacci sequence', url: `${WIKI}/Fibonacci_sequence` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-rec-002',
    topic: 'algorithms',
    tags: ['recursion', 'dynamic-programming'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `let calls = 0;
const memo = new Map();

function fib(n) {
  calls++;
  if (n < 2) {
    return n;
  }
  if (memo.has(n)) {
    return memo.get(n);
  }
  const result = fib(n - 1) + fib(n - 2);
  memo.set(n, result);
  return result;
}

console.log(fib(10), calls);`,
    },
    options: [{ code: '55 177' }, { code: '55 10' }, { code: '55 55' }, { code: '55 19' }, { code: '55 1' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Мемоизация** — кэширование результатов по аргументам. Первая ветка `fib(n - 1)` спускается до `fib(1)` и заполняет кэш — 10 вызовов. Каждая вторая ветка `fib(n - 2)` берёт готовое значение из кэша или базового случая — ещё 9 вызовов. Итого 19 вместо 177.',
          en: '**Memoization** caches results by argument. The first branch `fib(n - 1)` goes down to `fib(1)` and fills the cache — 10 calls. Every second branch `fib(n - 2)` takes a ready value from the cache or a base case — 9 more. 19 calls instead of 177.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Сложность падает с экспоненциальной до O(n) по времени, цена — O(n) памяти под кэш. Тот же приём во фронтенде — `useMemo`, `reselect`, кэш запросов.',
          en: 'Complexity drops from exponential to O(n) time at the cost of O(n) memory for the cache. The same idea in the frontend: `useMemo`, `reselect`, request caches.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Memoization', url: `${WIKI}/Memoization` },
      { title: 'MDN — Map', url: `${MDN_JS}/Map` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-rec-003',
    topic: 'algorithms',
    tags: ['recursion'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код в Node.js?', en: 'What will this code log in Node.js?' },
    code: {
      lang: 'js',
      source: `function depth(n) {
  return n === 0 ? 0 : 1 + depth(n - 1);
}

try {
  console.log(depth(1e6));
} catch (error) {
  console.log(error.name);
}`,
    },
    options: [{ code: 'RangeError' }, { code: 'TypeError' }, { code: 'SyntaxError' }, { code: 'ReferenceError' }, { code: '1000000' }],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждый незавершённый вызов занимает кадр в стеке вызовов, а стек ограничен — в V8 это порядка десяти тысяч кадров для простой функции. Миллион вложенных вызовов его переполняет: `RangeError: Maximum call stack size exceeded`. Firefox бросает `InternalError: too much recursion`.',
          en: 'Every unfinished call takes a frame on the call stack, and the stack is limited — around ten thousand frames for a simple function in V8. A million nested calls overflow it: `RangeError: Maximum call stack size exceeded`. Firefox throws `InternalError: too much recursion`.',
        },
      },
      { type: 'diagram', diagram: 'recursion-stack' },
      {
        type: 'text',
        text: {
          ru: 'Для глубоких структур рекурсию заменяют циклом с явным стеком или очередью.',
          en: 'For deep structures, replace recursion with a loop and an explicit stack or queue.',
        },
      },
    ],
    sources: [
      { title: 'MDN — RangeError', url: `${MDN_JS}/RangeError` },
      { title: 'MDN — InternalError: too much recursion', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion' },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-rec-004',
    topic: 'algorithms',
    tags: ['recursion'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Что произойдёт при вызове `countdown(100000)` в Chrome?',
      en: 'What happens when `countdown(100000)` runs in Chrome?',
    },
    code: {
      lang: 'js',
      source: `'use strict';

function countdown(n) {
  if (n === 0) {
    return 'done';
  }
  return countdown(n - 1);
}`,
    },
    options: [
      {
        text: {
          ru: 'Вернёт `done`: в строгом режиме хвостовой вызов не растит стек',
          en: 'Returns `done`: in strict mode a tail call doesn’t grow the stack',
        },
      },
      {
        text: {
          ru: 'Вернёт `undefined`: на пределе стека рекурсия молча прерывается',
          en: 'Returns `undefined`: at the stack limit recursion silently stops',
        },
      },
      {
        text: {
          ru: 'Синтаксическая ошибка: рекурсия запрещена в строгом режиме',
          en: 'A syntax error: recursion is forbidden in strict mode',
        },
      },
      {
        text: {
          ru: 'Зависнет: строгий режим отключает проверку глубины стека',
          en: 'Hangs: strict mode disables the stack depth check',
        },
      },
      {
        text: {
          ru: 'Упадёт с `RangeError`: в V8 хвостовые вызовы не реализованы',
          en: 'Throws `RangeError`: V8 doesn’t implement tail calls',
        },
      },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'ES2015 описывает **proper tail calls**: если `return` возвращает результат вызова функции, движок может переиспользовать кадр стека. Так рекурсия могла бы работать как цикл.',
          en: 'ES2015 specifies **proper tail calls**: when `return` returns a function call’s result, the engine can reuse the stack frame. That would let recursion run like a loop.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'На практике это реализовал только JavaScriptCore (Safari). V8 и SpiderMonkey отказались: пропадающие кадры ломают стек-трейсы и отладку. В Chrome и Node.js 100 000 вызовов переполнят стек — глубокую рекурсию по-прежнему переписывают в цикл.',
          en: 'In practice only JavaScriptCore (Safari) shipped it. V8 and SpiderMonkey declined: elided frames break stack traces and debugging. In Chrome and Node.js 100,000 calls overflow the stack — deep recursion still gets rewritten as a loop.',
        },
      },
    ],
    sources: [
      { title: 'V8 — ES2015, ES2016, and beyond (proper tail calls)', url: 'https://v8.dev/blog/modern-javascript' },
      { title: 'WebKit — ECMAScript 6 Proper Tail Calls in WebKit', url: 'https://webkit.org/blog/6240/ecmascript-6-proper-tail-calls-in-webkit/' },
    ],
  },
  {
    id: 'algo-tp-001',
    topic: 'algorithms',
    tags: ['two-pointers'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function isPalindrome(text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome('A man, a plan, a canal: Panama'), isPalindrome('race a car'));`,
    },
    options: [
      { code: 'true false' },
      { code: 'true true' },
      { code: 'false false' },
      { code: 'false true' },
      { code: 'true undefined' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'После очистки получаем `amanaplanacanalpanama` — читается одинаково с обеих сторон. `raceacar` ломается на третьей паре: `c` против `a`.',
          en: 'After cleanup we get `amanaplanacanalpanama` — it reads the same from both ends. `raceacar` fails at the third pair: `c` versus `a`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Приём **двух указателей**: один идёт с начала, другой с конца, навстречу друг другу. O(n) по времени и O(1) дополнительной памяти — без `split().reverse().join()` и копии строки.',
          en: 'The **two pointers** technique: one starts at the beginning, the other at the end, moving toward each other. O(n) time and O(1) extra memory — no `split().reverse().join()` and no string copy.',
        },
      },
    ],
    sources: [
      { title: 'GeeksforGeeks — Two Pointers Technique', url: 'https://www.geeksforgeeks.org/dsa/two-pointers-technique/' },
      { title: 'Wikipedia — Palindrome', url: `${WIKI}/Palindrome` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-tp-002',
    topic: 'algorithms',
    tags: ['two-pointers', 'searching'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function pairWithSum(sorted, target) {
  let left = 0;
  let right = sorted.length - 1;
  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum === target) {
      return [sorted[left], sorted[right]];
    }
    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}

console.log(pairWithSum([1, 3, 4, 6, 8, 11], 10).join(' '));`,
    },
    options: [{ code: '2 3' }, { code: '1 11' }, { code: '6 4' }, { code: '4 6' }, { code: '3 8' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Массив отсортирован, поэтому сумма управляема: если она меньше цели — сдвигаем левый указатель к бо́льшим числам, если больше — правый к меньшим. Ход: 1+11=12, 1+8=9, 3+8=11, 3+6=9, 4+6=10 — найдено.',
          en: 'The array is sorted, so the sum is steerable: below target — move the left pointer to bigger numbers; above — move the right one to smaller numbers. Steps: 1+11=12, 1+8=9, 3+8=11, 3+6=9, 4+6=10 — found.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Функция возвращает сами числа, а не индексы, и левое всегда меньше правого. Сложность O(n) и O(1) памяти — в отличие от `Map`-решения для неотсортированного массива.',
          en: 'The function returns the numbers themselves, not indices, and the left one is always smaller. O(n) time and O(1) memory — unlike the `Map` solution for unsorted arrays.',
        },
      },
    ],
    sources: [{ title: 'GeeksforGeeks — Two Pointers Technique', url: 'https://www.geeksforgeeks.org/dsa/two-pointers-technique/' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-tp-003',
    topic: 'algorithms',
    tags: ['two-pointers', 'big-o'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function maxWindowSum(numbers, size) {
  let windowSum = 0;
  for (let i = 0; i < size; i++) {
    windowSum += numbers[i];
  }
  let best = windowSum;
  for (let i = size; i < numbers.length; i++) {
    windowSum += numbers[i] - numbers[i - size];
    best = Math.max(best, windowSum);
  }
  return best;
}

console.log(maxWindowSum([2, 1, 5, 1, 3, 2], 3));`,
    },
    options: [{ code: '8' }, { code: '14' }, { code: '6' }, { code: '11' }, { code: '9' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Функция ищет максимальную сумму трёх соседних чисел. Окна: 2+1+5=8, 1+5+1=7, 5+1+3=9, 1+3+2=6. Максимум — 9.',
          en: 'The function finds the largest sum of three adjacent numbers. Windows: 2+1+5=8, 1+5+1=7, 5+1+3=9, 1+3+2=6. The maximum is 9.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Скользящее окно**: при сдвиге не пересчитываем сумму заново, а добавляем вошедший элемент и вычитаем вышедший. Получается O(n) вместо O(n · k). Тот же приём — в подсчёте событий за последние N секунд или в rate limiting.',
          en: '**Sliding window**: when shifting, don’t recompute the sum — add the incoming element and subtract the outgoing one. That’s O(n) instead of O(n · k). The same trick counts events over the last N seconds or powers rate limiting.',
        },
      },
    ],
    sources: [{ title: 'GeeksforGeeks — Window Sliding Technique', url: 'https://www.geeksforgeeks.org/dsa/window-sliding-technique/' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-tp-004',
    topic: 'algorithms',
    tags: ['two-pointers', 'sorting'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function mergeSorted(a, b) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      result.push(a[i++]);
    } else {
      result.push(b[j++]);
    }
  }
  return [...result, ...a.slice(i), ...b.slice(j)];
}

console.log(mergeSorted([1, 4, 9], [2, 3, 10, 12]).join(' '));`,
    },
    options: [
      { code: '1 2 3 4 9 10 12' },
      { code: '1 4 9 2 3 10 12' },
      { code: '1 2 3 4 9' },
      { code: '1 2 3 4 9 10' },
      { code: '12 10 9 4 3 2 1' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Два указателя идут по двум отсортированным массивам и каждый раз забирают меньший элемент. Когда `a` закончился на 9, в `b` остаются 10 и 12 — их добавляет `b.slice(j)`. Без этого хвоста получился бы вариант `1 2 3 4 9`.',
          en: 'Two pointers walk two sorted arrays, always taking the smaller element. When `a` runs out at 9, `b` still holds 10 and 12 — `b.slice(j)` appends them. Without that tail you’d get `1 2 3 4 9`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Слияние работает за O(n + m) — это ключевой шаг сортировки слиянием. `[...a, ...b].sort()` стоил бы O((n + m) log(n + m)), а без функции сравнения ещё и сортировал бы числа как строки.',
          en: 'Merging runs in O(n + m) — it’s the key step of merge sort. `[...a, ...b].sort()` would cost O((n + m) log(n + m)), and without a compare function it would also sort numbers as strings.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Merge algorithm', url: `${WIKI}/Merge_algorithm` },
      { title: 'MDN — Array.prototype.sort()', url: `${MDN_JS}/Array/sort` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-tp-005',
    topic: 'algorithms',
    tags: ['two-pointers', 'data-structures'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

const third = { value: 3, next: null };
const second = { value: 2, next: third };
const first = { value: 1, next: second };

console.log(hasCycle(first));
third.next = second;
console.log(hasCycle(first));`,
    },
    options: [
      { code: 'false false' },
      { code: 'true true' },
      { code: 'false true' },
      { code: 'true false' },
      {
        text: {
          ru: 'Первый вызов выведет `false`, второй зависнет',
          en: 'The first call logs `false`, the second one hangs',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Алгоритм Флойда, «черепаха и заяц»: медленный указатель шагает по одному узлу, быстрый — по два. Без цикла быстрый упирается в `null`. С циклом `3 → 2 → 3 …` быстрый догоняет медленного внутри кольца, и они встречаются — бесконечного цикла не будет.',
          en: 'Floyd’s “tortoise and hare”: the slow pointer moves one node at a time, the fast one two. Without a cycle, fast hits `null`. With the cycle `3 → 2 → 3 …`, fast catches up with slow inside the loop and they meet — no infinite loop.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'O(n) по времени и O(1) памяти. Решение «складывать посещённые узлы в `Set`» тоже O(n), но тратит O(n) памяти.',
          en: 'O(n) time and O(1) memory. Storing visited nodes in a `Set` is also O(n), but uses O(n) memory.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Cycle detection', url: `${WIKI}/Cycle_detection` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-tree-001',
    topic: 'algorithms',
    tags: ['trees-graphs', 'data-structures'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `const leaf = (value) => ({ value, children: [] });
const tree = {
  value: 'A',
  children: [
    { value: 'B', children: [leaf('D'), leaf('E')] },
    { value: 'C', children: [leaf('F')] },
  ],
};

function bfs(root) {
  const order = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node.value);
    queue.push(...node.children);
  }
  return order.join('');
}

function dfs(node) {
  return node.value + node.children.map(dfs).join('');
}

console.log(bfs(tree), dfs(tree));`,
    },
    options: [
      { code: 'ABDECF ABCDEF' },
      { code: 'ABCDEF ABCDEF' },
      { code: 'ABDECF ABDECF' },
      { code: 'ABCDEF ABDECF' },
      { code: 'FEDCBA ABDECF' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Обход в ширину (BFS)** использует очередь: сначала корень, потом все узлы первого уровня, потом второго — `ABCDEF`. **Обход в глубину (DFS)** идёт рекурсией или стеком: спускается по ветке до конца и только потом переходит к соседу — `ABDECF`.',
          en: '**Breadth-first search (BFS)** uses a queue: the root, then every node on level one, then level two — `ABCDEF`. **Depth-first search (DFS)** uses recursion or a stack: it goes down a branch to the end before moving to a sibling — `ABDECF`.',
        },
      },
      { type: 'diagram', diagram: 'bfs-queue' },
      {
        type: 'text',
        text: {
          ru: 'BFS находит кратчайший путь по числу рёбер и годится для поиска «ближайшего» узла. DFS проще пишется и тратит меньше памяти на широких деревьях.',
          en: 'BFS finds the shortest path by edge count and suits searching for the “nearest” node. DFS is simpler to write and uses less memory on wide trees.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Breadth-first search', url: `${WIKI}/Breadth-first_search` },
      { title: 'Wikipedia — Depth-first search', url: `${WIKI}/Depth-first_search` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-tree-002',
    topic: 'algorithms',
    tags: ['trees-graphs'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В каком порядке `document.querySelectorAll(\'*\')` возвращает элементы?',
      en: 'In what order does `document.querySelectorAll(\'*\')` return elements?',
    },
    options: [
      {
        text: {
          ru: 'В порядке документа — обход в глубину: элемент, его потомки, затем сосед',
          en: 'In document order — depth-first: an element, its descendants, then the next sibling',
        },
      },
      {
        text: {
          ru: 'В ширину: сначала все элементы первого уровня вложенности, потом второго',
          en: 'Breadth-first: all elements of the first nesting level, then the second',
        },
      },
      {
        text: {
          ru: 'По алфавиту имён тегов, а внутри одного тега — в порядке документа',
          en: 'Alphabetically by tag name, and in document order within a tag',
        },
      },
      {
        text: {
          ru: 'Сначала самые глубоко вложенные, затем их родители, корень последним',
          en: 'The most deeply nested first, then their parents, the root last',
        },
      },
      {
        text: {
          ru: 'Порядок не определён спецификацией и отличается в разных браузерах',
          en: 'The order isn’t specified and differs between browsers',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Стандарт DOM определяет **tree order** как прямой (pre-order) обход дерева в глубину. В этом порядке элементы идут и в разметке: открывающий тег родителя стоит раньше тегов его детей.',
          en: 'The DOM standard defines **tree order** as a preorder, depth-first traversal. That’s also the order of the markup: a parent’s opening tag comes before its children’s tags.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Порядок документа используют `querySelectorAll`, `getElementsByTagName`, `TreeWalker` и навигация по Tab по умолчанию. Обход DOM — частая задача на собеседовании: рекурсия по `children` или `TreeWalker`.',
          en: '`querySelectorAll`, `getElementsByTagName`, `TreeWalker` and default Tab navigation all follow document order. Traversing the DOM is a common interview task: recurse over `children` or use a `TreeWalker`.',
        },
      },
    ],
    sources: [
      { title: 'DOM Standard — tree order', url: 'https://dom.spec.whatwg.org/#concept-tree-order' },
      { title: 'MDN — Document.querySelectorAll()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll' },
    ],
  },
  {
    id: 'algo-tree-003',
    topic: 'algorithms',
    tags: ['trees-graphs', 'big-o'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что случится с обычным бинарным деревом поиска (без балансировки), если вставлять в него уже отсортированные числа 1, 2, 3, …, n?',
      en: 'What happens to a plain binary search tree (no balancing) if you insert already sorted numbers 1, 2, 3, …, n?',
    },
    options: [
      {
        text: {
          ru: 'Дерево само сбалансируется при вставке, и поиск останется O(log n)',
          en: 'The tree balances itself on insert, and search stays O(log n)',
        },
      },
      {
        text: {
          ru: 'Дерево станет полным, и поиск ускорится до O(1)',
          en: 'The tree becomes complete, and search speeds up to O(1)',
        },
      },
      {
        text: {
          ru: 'Ничего: порядок вставки не влияет на форму дерева',
          en: 'Nothing: insertion order doesn’t affect the tree’s shape',
        },
      },
      {
        text: {
          ru: 'Каждое новое число станет корнем, и поиск всегда будет O(1)',
          en: 'Each new number becomes the root, so search is always O(1)',
        },
      },
      {
        text: {
          ru: 'Выродится в цепочку, как связный список: поиск станет O(n)',
          en: 'It degenerates into a chain, like a linked list: search becomes O(n)',
        },
      },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В BST меньшие значения уходят влево, большие — вправо. Каждое следующее число больше всех предыдущих, поэтому всегда уходит в правую ветку: высота дерева равна n, и поиск проходит по всем узлам.',
          en: 'In a BST smaller values go left and larger ones go right. Each next number is larger than all previous ones, so it always goes right: the tree’s height equals n, and search walks every node.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'O(log n) гарантирован только для сбалансированного дерева. Поэтому на практике используют самобалансирующиеся деревья — AVL и красно-чёрные: они перестраиваются при вставке.',
          en: 'O(log n) is guaranteed only for a balanced tree. That’s why real systems use self-balancing trees — AVL and red-black — which restructure themselves on insert.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Binary search tree', url: `${WIKI}/Binary_search_tree` },
      { title: 'Wikipedia — Self-balancing binary search tree', url: `${WIKI}/Self-balancing_binary_search_tree` },
    ],
  },
  {
    id: 'algo-tree-004',
    topic: 'algorithms',
    tags: ['recursion', 'trees-graphs'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что выведет код?', en: 'What will this code log?' },
    code: {
      lang: 'js',
      source: `function flatten(items) {
  const result = [];
  for (const item of items) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

const nested = [1, [2, [3, [4]], 5]];
console.log(flatten(nested).length, nested.flat().length);`,
    },
    options: [{ code: '5 5' }, { code: '4 4' }, { code: '5 2' }, { code: '5 4' }, { code: '2 5' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вложенный массив — это дерево, и рекурсивный `flatten` обходит его в глубину до самых листьев: `[1, 2, 3, 4, 5]`, длина 5.',
          en: 'A nested array is a tree, and the recursive `flatten` walks it depth-first down to the leaves: `[1, 2, 3, 4, 5]`, length 5.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`flat()` по умолчанию раскрывает только один уровень: `[1, 2, [3, [4]], 5]` — четыре элемента. Полностью «расплющивает» `flat(Infinity)`.',
          en: '`flat()` unwraps just one level by default: `[1, 2, [3, [4]], 5]` — four elements. `flat(Infinity)` flattens everything.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.flat()', url: `${MDN_JS}/Array/flat` },
      { title: 'javascript.info — Recursion and stack', url: 'https://javascript.info/recursion' },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-tree-005',
    topic: 'algorithms',
    tags: ['trees-graphs', 'big-o'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Найти минимальную разницу между двумя произвольными деревьями — задача O(n³). Как React сравнивает деревья элементов за O(n)?',
      en: 'Finding the minimal difference between two arbitrary trees is O(n³). How does React diff element trees in O(n)?',
    },
    options: [
      {
        text: {
          ru: 'Эвристики: другой тип элемента — новое поддерево, а `key` сопоставляет детей',
          en: 'Heuristics: a different element type means a new subtree, and `key` matches children',
        },
      },
      {
        text: {
          ru: 'React сравнивает каждый узел с каждым, но выносит это в Web Worker',
          en: 'React compares every node with every other, but offloads it to a Web Worker',
        },
      },
      {
        text: {
          ru: 'React не сравнивает деревья: пересоздать DOM целиком быстрее, чем искать разницу',
          en: 'React doesn’t diff trees: recreating the whole DOM is faster than diffing',
        },
      },
      {
        text: {
          ru: 'React хранит прошлые деревья и ищет совпадение бинарным поиском по `key`',
          en: 'React stores past trees and finds a match by binary search on `key`',
        },
      },
      {
        text: {
          ru: 'Разницу считает браузер через `MutationObserver`, React лишь применяет её',
          en: 'The browser computes the diff via `MutationObserver`, React just applies it',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'React сравнивает деревья уровень за уровнем и не ищет перемещения узлов между уровнями. Если на месте `<div>` оказался `<span>` или другой компонент, старое поддерево удаляется вместе с состоянием, а новое строится с нуля.',
          en: 'React compares trees level by level and doesn’t look for nodes moving between levels. If a `<div>` is replaced by a `<span>` or a different component, the old subtree is removed along with its state and the new one is built from scratch.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Среди детей одного родителя `key` говорит, какой элемент какому соответствует. Поэтому индекс в качестве ключа ломает состояние при перестановке, а смена `key` намеренно сбрасывает компонент.',
          en: 'Among a parent’s children, `key` tells React which element corresponds to which. That’s why an index as a key breaks state on reordering, and changing `key` deliberately resets a component.',
        },
      },
    ],
    sources: [
      { title: 'React (legacy docs) — Reconciliation', url: 'https://legacy.reactjs.org/docs/reconciliation.html' },
      { title: 'react.dev — Preserving and resetting state', url: 'https://react.dev/learn/preserving-and-resetting-state' },
    ],
  },
  {
    id: 'algo-dp-001',
    topic: 'algorithms',
    tags: ['dynamic-programming'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'За один шаг можно подняться на 1 или 2 ступеньки. Функция считает число способов подняться на n ступенек. Что выведет код?',
      en: 'Each step climbs 1 or 2 stairs. The function counts the ways to climb n stairs. What will this code log?',
    },
    code: {
      lang: 'js',
      source: `function countWays(stairs) {
  let previous = 1;
  let current = 1;
  for (let i = 2; i <= stairs; i++) {
    [previous, current] = [current, previous + current];
  }
  return current;
}

console.log(countWays(3), countWays(5));`,
    },
    options: [{ code: '3 5' }, { code: '2 8' }, { code: '3 8' }, { code: '4 16' }, { code: '3 10' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'На n-ю ступеньку попадают либо с n−1 (шаг 1), либо с n−2 (шаг 2), поэтому `ways(n) = ways(n − 1) + ways(n − 2)` — это числа Фибоначчи: 1, 1, 2, 3, 5, 8. Для трёх ступенек: 1+1+1, 1+2, 2+1 — три способа.',
          en: 'You reach stair n either from n−1 (one step) or from n−2 (two steps), so `ways(n) = ways(n − 1) + ways(n − 2)` — the Fibonacci numbers: 1, 1, 2, 3, 5, 8. For three stairs: 1+1+1, 1+2, 2+1 — three ways.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Это **динамическое программирование**: ответ строится из ответов на меньшие подзадачи. Хранить нужно только два последних значения — O(n) по времени и O(1) по памяти.',
          en: 'This is **dynamic programming**: the answer is built from answers to smaller subproblems. Only the last two values need to be kept — O(n) time and O(1) memory.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Dynamic programming', url: `${WIKI}/Dynamic_programming` },
      { title: 'Wikipedia — Fibonacci sequence', url: `${WIKI}/Fibonacci_sequence` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-dp-002',
    topic: 'algorithms',
    tags: ['dynamic-programming', 'recursion'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чем мемоизация (сверху вниз) отличается от табуляции (снизу вверх) в динамическом программировании?',
      en: 'How does memoization (top-down) differ from tabulation (bottom-up) in dynamic programming?',
    },
    options: [
      {
        text: {
          ru: 'Ничем: табуляция — это мемоизация, где кэш хранится в массиве, а не в `Map`',
          en: 'No difference: tabulation is memoization with an array cache instead of a `Map`',
        },
      },
      {
        text: {
          ru: 'Мемоизация работает только с массивами, а табуляция — только с объектами',
          en: 'Memoization works only with arrays, and tabulation only with objects',
        },
      },
      {
        text: {
          ru: 'Табуляция всегда медленнее: она решает все подзадачи, даже ненужные, — это O(n²)',
          en: 'Tabulation is always slower: it solves every subproblem, even unneeded ones, in O(n²)',
        },
      },
      {
        text: {
          ru: 'Мемоизации не нужна дополнительная память, а табуляция хранит всю таблицу',
          en: 'Memoization needs no extra memory, while tabulation stores the whole table',
        },
      },
      {
        text: {
          ru: 'Мемоизация — рекурсия с кэшем; табуляция — цикл снизу вверх без роста стека',
          en: 'Memoization: recursion plus cache; tabulation: a bottom-up loop, no stack growth',
        },
      },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Мемоизация** оставляет естественную рекурсивную формулу и добавляет кэш: удобно, когда нужны не все подзадачи. Но глубина рекурсии равна размеру задачи, и на больших n можно получить `RangeError`.',
          en: '**Memoization** keeps the natural recursive formula and adds a cache: handy when not every subproblem is needed. But recursion depth equals the problem size, so large n can hit a `RangeError`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Табуляция** заполняет таблицу циклом от самых маленьких подзадач к большим. Стек не растёт, а часто достаточно хранить только последние значения, как в задаче про лестницу.',
          en: '**Tabulation** fills a table with a loop from the smallest subproblems up. The stack doesn’t grow, and often only the last few values need to be kept, as in the stairs problem.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Dynamic programming', url: `${WIKI}/Dynamic_programming` },
      { title: 'Wikipedia — Memoization', url: `${WIKI}/Memoization` },
    ],
  },
];
