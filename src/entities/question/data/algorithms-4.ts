import type { Question } from '../model/types';

const WIKI = 'https://en.wikipedia.org/wiki';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const ALGORITHMS_QUESTIONS_4: Question[] = [
  {
    id: 'algo-graph-bfs-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['trees-graphs'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'BFS ищет кратчайший путь в невзвешенном графе. Сколько рёбер в пути от `A` до `F`? Впишите, что выведет код.',
      en: 'BFS finds the shortest path in an unweighted graph. How many edges are on the path from `A` to `F`? Type what the code prints.',
    },
    code: {
      lang: 'js',
      source: `const graph = { A: ['B', 'C'], B: ['D'], C: ['D', 'E'], D: ['F'], E: ['F'], F: [] };

function shortest(start, goal) {
  const queue = [[start, 0]];
  const seen = new Set([start]);
  while (queue.length > 0) {
    const [node, distance] = queue.shift();
    if (node === goal) {
      return distance;
    }
    for (const next of graph[node]) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push([next, distance + 1]);
      }
    }
  }
  return -1;
}

console.log(shortest('A', 'F'));`,
    },
    answers: ['3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'BFS обходит граф «волнами»: сначала все вершины на расстоянии 1, потом 2 и так далее. Поэтому первая встреча с целью — кратчайший путь по числу рёбер: `A → B → D → F`. Множество `seen` не даёт добавить вершину в очередь дважды. Сложность O(V + E). Для путей с весами нужен уже не BFS, а алгоритм Дейкстры.',
          en: 'BFS explores the graph in “waves”: first all vertices at distance 1, then 2, and so on. So the first time it meets the goal is the shortest path by edge count: `A → B → D → F`. The `seen` set prevents enqueuing a vertex twice. Complexity is O(V + E). Weighted paths need Dijkstra’s algorithm instead of BFS.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Breadth-first search', url: `${WIKI}/Breadth-first_search` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-graph-topo-001',
    kind: 'order',
    topic: 'algorithms',
    tags: ['trees-graphs'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Алгоритм Кана упорядочивает задачи сборки по зависимостям. Расставьте задачи в порядке, который выведет код.',
      en: 'Kahn’s algorithm orders build tasks by their dependencies. Put the tasks in the order the code prints.',
    },
    code: {
      lang: 'js',
      source: `const deps = { install: [], build: ['install'], lint: ['install'], test: ['build'], deploy: ['test', 'lint'] };

const inDegree = Object.fromEntries(Object.entries(deps).map(([task, list]) => [task, list.length]));
const queue = Object.keys(deps).filter((task) => inDegree[task] === 0);
const order = [];

while (queue.length > 0) {
  const task = queue.shift();
  order.push(task);
  for (const [next, list] of Object.entries(deps)) {
    if (list.includes(task) && --inDegree[next] === 0) {
      queue.push(next);
    }
  }
}

console.log(order.join(' '));`,
    },
    items: [{ code: 'install' }, { code: 'build' }, { code: 'lint' }, { code: 'test' }, { code: 'deploy' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Топологическая сортировка** выдаёт задачи так, что каждая идёт после своих зависимостей. Алгоритм Кана берёт задачи без невыполненных зависимостей (входящая степень 0), «выполняет» их и уменьшает счётчики у зависящих. `build` и `lint` освобождаются одновременно и идут в порядке объявления. Если в графе есть цикл, часть задач так и не попадёт в результат — так обнаруживают циклические зависимости.',
          en: '**Topological sorting** lists tasks so each comes after its dependencies. Kahn’s algorithm takes tasks with no pending dependencies (in-degree 0), “runs” them and decrements counters of dependents. `build` and `lint` are freed at the same time and go in declaration order. If the graph has a cycle, some tasks never make it into the result — that’s how circular dependencies are detected.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Topological sorting', url: `${WIKI}/Topological_sorting` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-hash-anagram-001',
    topic: 'algorithms',
    tags: ['hashing'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какая функция правильно проверяет, что две строки — анаграммы?',
      en: 'Which function correctly checks that two strings are anagrams?',
    },
    options: [
      { code: 'const isAnagram = (a, b) => a.length === b.length;' },
      { code: "const isAnagram = (a, b) => [...a].sort().join('') === [...b].sort().join('');" },
      { code: 'const isAnagram = (a, b) => a.length === b.length && [...a].every((char) => b.includes(char));' },
      {
        code: "const sum = (text) => [...text].reduce((total, char) => total + char.charCodeAt(0), 0);\nconst isAnagram = (a, b) => sum(a) === sum(b);",
      },
      { code: "const isAnagram = (a, b) => [...new Set(a)].sort().join('') === [...new Set(b)].sort().join('');" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Анаграммы — строки с одинаковым **количеством** каждого символа. Сортировка приводит обе строки к одному виду — O(n log n). Проверка «каждый символ есть в другой строке» и `Set` теряют количество (`aab` и `abb`), сумма кодов совпадает у разных строк (`ad` и `bc`). Оптимально за O(n) — посчитать частоты в `Map` и сравнить.',
          en: 'Anagrams have the same **count** of every character. Sorting brings both strings to the same form — O(n log n). Checking “every char exists in the other string” and `Set` lose counts (`aab` vs `abb`), and char-code sums collide for different strings (`ad` vs `bc`). The O(n) way is counting frequencies in a `Map` and comparing.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Anagram', url: `${WIKI}/Anagram` }],
    verify: {
      kind: 'js-tests',
      tests: `assert.equal(isAnagram('listen', 'silent'), true);
assert.equal(isAnagram('aab', 'abb'), false);
assert.equal(isAnagram('ad', 'bc'), false);
assert.equal(isAnagram('rat', 'car'), false);`,
    },
  },
  {
    id: 'algo-tp-window-bug-001',
    kind: 'bug-line',
    topic: 'algorithms',
    tags: ['two-pointers', 'hashing'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Функция ищет длину самой длинной подстроки без повторов. Для `\'abba\'` она возвращает 3 вместо 2. В какой строке ошибка?',
      en: 'The function finds the length of the longest substring without repeats. For `\'abba\'` it returns 3 instead of 2. Which line has the bug?',
    },
    code: {
      lang: 'js',
      source: `function longestUnique(text) {
  const lastSeen = new Map();
  let start = 0;
  let best = 0;
  for (let end = 0; end < text.length; end++) {
    if (lastSeen.has(text[end])) {
      start = lastSeen.get(text[end]) + 1;
    }
    lastSeen.set(text[end], end);
    best = Math.max(best, end - start + 1);
  }
  return best;
}`,
    },
    answerLine: 7,
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Скользящее окно `[start, end]` хранит подстроку без повторов, а `lastSeen` — последнюю позицию каждого символа. Ошибка в том, что `start` может **сдвинуться назад**: на последней `a` в `abba` её прошлая позиция 0 вернёт `start` на 1, и в окно снова попадут две `b`. Начало окна только растёт: `start = Math.max(start, lastSeen.get(text[end]) + 1)`. Сложность O(n).',
          en: 'The sliding window `[start, end]` holds a substring without repeats, and `lastSeen` stores each character’s last position. The bug is that `start` can **move backwards**: at the last `a` in `abba`, its previous position 0 sets `start` back to 1, and both `b`s are in the window again. The window start only grows: `start = Math.max(start, lastSeen.get(text[end]) + 1)`. Complexity is O(n).',
        },
      },
    ],
    sources: [{ title: 'GeeksforGeeks — Window Sliding Technique', url: 'https://www.geeksforgeeks.org/dsa/window-sliding-technique/' }],
    verify: {
      kind: 'js-tests',
      fixedLine: '      start = Math.max(start, lastSeen.get(text[end]) + 1);',
      tests: `assert.equal(longestUnique('abcabcbb'), 3);
assert.equal(longestUnique('bbbbb'), 1);
assert.equal(longestUnique('abba'), 2);
assert.equal(longestUnique(''), 0);`,
    },
  },
  {
    id: 'algo-search-lower-bound-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['searching'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `function lowerBound(items, target) {
  let low = 0;
  let high = items.length;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (items[middle] < target) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }
  return low;
}

const sorted = [1, 2, 2, 2, 5, 7];
console.log(lowerBound(sorted, 2), lowerBound(sorted, 4));`,
    },
    answers: ['1 4'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Нижняя граница** — первый индекс, где элемент не меньше `target`. Для `2` это первая из трёх двоек (индекс 1), для отсутствующей `4` — место, куда её можно вставить с сохранением порядка (перед `5`, индекс 4). Полуинтервал `[low, high)` и условие `low < high` избавляют от ошибок «плюс-минус один» и зацикливания. Так считают и количество вхождений: `lowerBound(x + 1) − lowerBound(x)`.',
          en: 'The **lower bound** is the first index where the element is not less than `target`. For `2` it’s the first of the three twos (index 1); for the missing `4`, it’s where it could be inserted keeping order (before `5`, index 4). The half-open `[low, high)` range and `low < high` avoid off-by-one errors and infinite loops. It also counts occurrences: `lowerBound(x + 1) − lowerBound(x)`.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Binary search', url: `${WIKI}/Binary_search` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-dp-coins-001',
    topic: 'algorithms',
    tags: ['dynamic-programming'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Какая реализация находит минимальное число монет для суммы (или −1, если набрать нельзя)?',
      en: 'Which implementation finds the minimum number of coins for an amount (or −1 if impossible)?',
    },
    options: [
      {
        code: `function minCoins(coins, amount) {
  let count = 0;
  for (const coin of [...coins].sort((a, b) => b - a)) {
    count += Math.floor(amount / coin);
    amount %= coin;
  }
  return amount === 0 ? count : -1;
}`,
      },
      {
        code: `function minCoins(coins, amount) {
  const best = new Array(amount + 1).fill(Infinity);
  best[0] = 0;
  for (let sum = 1; sum <= amount; sum++) {
    for (const coin of coins) {
      if (coin <= sum) {
        best[sum] = Math.min(best[sum], best[sum - coin] + 1);
      }
    }
  }
  return best[amount] === Infinity ? -1 : best[amount];
}`,
      },
      {
        code: `function minCoins(coins, amount) {
  const best = new Array(amount + 1).fill(Infinity);
  best[0] = 0;
  for (let sum = 1; sum <= amount; sum++) {
    for (const coin of coins) {
      if (coin <= sum) {
        best[sum] = Math.min(best[sum], best[sum - coin] + 1);
      }
    }
  }
  return best[amount];
}`,
      },
      {
        code: `function minCoins(coins, amount) {
  const best = new Array(amount + 1).fill(0);
  for (let sum = 1; sum <= amount; sum++) {
    for (const coin of coins) {
      if (coin <= sum) {
        best[sum] = Math.min(best[sum], best[sum - coin] + 1);
      }
    }
  }
  return best[amount];
}`,
      },
      {
        code: `function minCoins(coins, amount) {
  return Math.ceil(amount / Math.max(...coins));
}`,
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Жадный выбор «сначала крупные монеты» работает не для всех наборов: для `[1, 3, 4]` и суммы 6 он даст `4 + 1 + 1`, а оптимум — `3 + 3`. Динамика считает ответ для всех сумм от 0 до `amount`: `best[sum] = min(best[sum − coin] + 1)`. Недостижимые суммы остаются `Infinity`, и это нужно превратить в −1; заполнение нулями ломает `Math.min`. Сложность O(amount × coins).',
          en: 'The greedy “largest coins first” choice fails for some sets: for `[1, 3, 4]` and 6 it gives `4 + 1 + 1`, while the optimum is `3 + 3`. DP computes the answer for every sum from 0 to `amount`: `best[sum] = min(best[sum − coin] + 1)`. Unreachable sums stay `Infinity`, which must become −1; filling with zeros breaks `Math.min`. Complexity is O(amount × coins).',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Change-making problem', url: `${WIKI}/Change-making_problem` }],
    verify: {
      kind: 'js-tests',
      tests: `assert.equal(minCoins([1, 3, 4], 6), 2);
assert.equal(minCoins([1, 5, 10], 12), 3);
assert.equal(minCoins([2], 3), -1);
assert.equal(minCoins([1], 0), 0);`,
    },
  },
  {
    id: 'algo-rec-subsets-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['recursion'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `function subsets(items) {
  if (items.length === 0) {
    return [[]];
  }
  const [first, ...rest] = items;
  const withoutFirst = subsets(rest);
  return [...withoutFirst, ...withoutFirst.map((subset) => [first, ...subset])];
}

console.log(subsets(['a', 'b', 'c', 'd']).length);`,
    },
    answers: ['16'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждое подмножество либо содержит первый элемент, либо нет, поэтому их вдвое больше, чем подмножеств остальных элементов: 2⁴ = 16, включая пустое. Рекурсия сводит задачу к меньшей, а пустой массив — базовый случай. Количество растёт как O(2ⁿ): для 30 элементов это уже миллиард, поэтому полный перебор подходит только для маленьких n.',
          en: 'Each subset either contains the first element or not, so there are twice as many as subsets of the rest: 2⁴ = 16, including the empty one. Recursion reduces the task to a smaller one, with the empty array as the base case. The count grows as O(2ⁿ): for 30 elements that’s a billion, so brute force only suits small n.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Power set', url: `${WIKI}/Power_set` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-rec-fib-calls-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['recursion', 'dynamic-programming'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Сколько раз вызовется `fib` при наивной рекурсии? Впишите число, которое выведет код.',
      en: 'How many times is `fib` called with naive recursion? Type the number the code prints.',
    },
    code: {
      lang: 'js',
      source: `let calls = 0;
function fib(n) {
  calls++;
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

fib(10);
console.log(calls);`,
    },
    answers: ['177'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Дерево вызовов ветвится надвое, и одни и те же значения считаются снова и снова: `fib(2)` здесь вычисляется 34 раза. Число вызовов растёт экспоненциально — для `fib(40)` их больше 300 миллионов. С [[memoization|мемоизацией]] каждый `fib(k)` считается один раз, и вызовов становится O(n). Это главный пример, зачем нужно динамическое программирование.',
          en: 'The call tree branches in two, and the same values are computed again and again: `fib(2)` is evaluated 34 times here. Calls grow exponentially — over 300 million for `fib(40)`. With [[memoization|memoization]] each `fib(k)` is computed once, and calls become O(n). It’s the classic example of why dynamic programming exists.',
        },
      },
    ],
    sources: [{ title: 'javascript.info — Recursion and stack', url: 'https://javascript.info/recursion' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-tree-depth-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['trees-graphs', 'recursion'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какой глубины ветка комментариев? Впишите число, которое выведет код.',
      en: 'How deep is the comment thread? Type the number the code prints.',
    },
    code: {
      lang: 'js',
      source: `const depth = (node) => 1 + Math.max(0, ...node.replies.map(depth));

const thread = {
  replies: [
    { replies: [] },
    { replies: [{ replies: [{ replies: [] }] }] },
  ],
};

console.log(depth(thread));`,
    },
    answers: ['4'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Глубина узла — 1 плюс максимальная глубина его детей; у листа детей нет, и `Math.max(0)` даёт 0. Самая длинная цепочка: корень → второй ответ → его ответ → ещё ответ — 4 уровня. `0` в `Math.max` важен: `Math.max()` без аргументов возвращает `-Infinity`. Такая рекурсия обходит каждый узел один раз — O(n).',
          en: 'A node’s depth is 1 plus its children’s maximum depth; a leaf has no children, and `Math.max(0)` gives 0. The longest chain is root → second reply → its reply → one more reply — 4 levels. The `0` in `Math.max` matters: `Math.max()` with no arguments returns `-Infinity`. This recursion visits each node once — O(n).',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Tree (abstract data type)', url: `${WIKI}/Tree_(abstract_data_type)` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-ds-queue-stacks-001',
    kind: 'output',
    topic: 'algorithms',
    tags: ['data-structures'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `class Queue {
  constructor() {
    this.inbox = [];
    this.outbox = [];
  }
  enqueue(value) {
    this.inbox.push(value);
  }
  dequeue() {
    if (this.outbox.length === 0) {
      while (this.inbox.length > 0) {
        this.outbox.push(this.inbox.pop());
      }
    }
    return this.outbox.pop();
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
const first = queue.dequeue();
queue.enqueue(3);
console.log(first, queue.dequeue(), queue.dequeue());`,
    },
    answers: ['1 2 3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Очередь на двух стеках: новые элементы кладутся в `inbox`, а когда `outbox` пуст, весь `inbox` переливается в него — порядок разворачивается, и первым выходит самый старый. `3` попал в `inbox`, пока в `outbox` ещё лежала `2`, — порядок FIFO сохранился. Каждый элемент перекладывается один раз, поэтому `dequeue` в среднем O(1), в отличие от `Array.shift`, который сдвигает весь массив.',
          en: 'A queue on two stacks: new items go to `inbox`, and when `outbox` is empty, all of `inbox` is poured into it — the order reverses, and the oldest comes out first. `3` went into `inbox` while `2` was still in `outbox` — FIFO order is preserved. Each item is moved once, so `dequeue` is O(1) amortized, unlike `Array.shift`, which shifts the whole array.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Queue (abstract data type)', url: `${WIKI}/Queue_(abstract_data_type)` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'algo-big-o-amortized-001',
    topic: 'algorithms',
    tags: ['big-o', 'data-structures'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Когда динамическому массиву не хватает места, он выделяет память вдвое больше и копирует элементы. Почему `push` всё равно считают O(1)?',
      en: 'When a dynamic array runs out of space, it allocates twice the memory and copies elements. Why is `push` still considered O(1)?',
    },
    options: [
      { text: { ru: 'Копирование в JavaScript бесплатное', en: 'Copying is free in JavaScript' } },
      {
        text: {
          ru: 'Это амортизированная оценка: дорогие копирования редки, и суммарно n вставок стоят O(n), то есть O(1) в среднем на вставку',
          en: 'It’s an amortized bound: expensive copies are rare, and n insertions cost O(n) in total, i.e. O(1) on average per insertion',
        },
      },
      { text: { ru: 'Массив заранее выделяет бесконечную память', en: 'The array preallocates infinite memory' } },
      { text: { ru: 'Это ошибка: `push` всегда O(n)', en: 'It’s a mistake: `push` is always O(n)' } },
      { text: { ru: 'Потому что массив хранится на диске', en: 'Because the array is stored on disk' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Копирования случаются при размерах 1, 2, 4, 8… — их суммарная стоимость 1 + 2 + 4 + … < 2n. Разделив на n вставок, получаем константу на вставку. **Амортизированная** сложность гарантирует среднее по серии операций, а не каждую отдельную: одна конкретная вставка может быть медленной. Для систем реального времени это важно.',
          en: 'Copies happen at sizes 1, 2, 4, 8… — their total cost is 1 + 2 + 4 + … < 2n. Divided over n insertions, that’s a constant per insertion. **Amortized** complexity guarantees the average over a series of operations, not each one: a particular insertion may be slow. For real-time systems that matters.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Amortized analysis', url: `${WIKI}/Amortized_analysis` }],
  },
  {
    id: 'algo-graph-dijkstra-001',
    topic: 'algorithms',
    tags: ['trees-graphs'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'У дорог разная длина в километрах. Почему BFS не годится для поиска кратчайшего маршрута и что использовать?',
      en: 'Roads have different lengths in kilometers. Why doesn’t BFS work for the shortest route, and what should you use?',
    },
    options: [
      { text: { ru: 'BFS годится, просто медленнее', en: 'BFS works, just slower' } },
      {
        text: {
          ru: 'BFS минимизирует число рёбер, а не сумму весов; нужен алгоритм Дейкстры с очередью с приоритетом (при неотрицательных весах)',
          en: 'BFS minimizes edge count, not the sum of weights; use Dijkstra’s algorithm with a priority queue (for non-negative weights)',
        },
      },
      { text: { ru: 'Нужен DFS — он находит путь быстрее', en: 'Use DFS — it finds a path faster' } },
      { text: { ru: 'Нужно отсортировать рёбра и взять самые короткие', en: 'Sort edges and take the shortest ones' } },
      { text: { ru: 'Кратчайший маршрут нельзя найти точно', en: 'The shortest route can’t be found exactly' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Путь из двух длинных дорог может быть хуже пути из пяти коротких, а BFS выберет первый — у него меньше рёбер. Дейкстра каждый раз достаёт из очереди с приоритетом вершину с минимальным известным расстоянием и улучшает соседей — O((V + E) log V) с кучей. При отрицательных весах нужен Беллман — Форд, а для карт с эвристикой расстояния — A*.',
          en: 'A path of two long roads can be worse than one of five short ones, yet BFS picks the first — it has fewer edges. Dijkstra repeatedly takes the vertex with the smallest known distance from a priority queue and relaxes its neighbors — O((V + E) log V) with a heap. Negative weights need Bellman–Ford, and maps with a distance heuristic use A*.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Dijkstra’s algorithm', url: `${WIKI}/Dijkstra%27s_algorithm` }],
  },
];
