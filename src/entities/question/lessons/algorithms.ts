import type { Lesson } from '../model/types';

const WIKI = 'https://en.wikipedia.org/wiki';
const MDN_JS = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects';

export const ALGORITHMS_LESSONS: Lesson[] = [
  {
    tag: 'big-o',
    summary: {
      ru: 'Big-O описывает, как растут время или память при росте входа, отбрасывая константы и младшие слагаемые.',
      en: 'Big-O describes how time or memory grow with input size, dropping constants and lower-order terms.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Типичные классы по возрастанию: O(1) — доступ по индексу или ключу; O(log n) — бинарный поиск; O(n) — один проход; O(n log n) — хорошие сортировки; O(n²) — вложенный цикл по тем же данным; O(2ⁿ) — перебор всех подмножеств. Константы не важны: `2n² + 3n` — это O(n²). Обычно оценивают худший случай, для хэш-таблиц — средний.',
          en: 'Typical classes in increasing order: O(1) — index or key access; O(log n) — binary search; O(n) — one pass; O(n log n) — good sorts; O(n²) — a nested loop over the same data; O(2ⁿ) — trying all subsets. Constants don’t matter: `2n² + 3n` is O(n²). Usually the worst case is estimated; for hash tables, the average.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function hasDuplicate(items) {
  // O(n²): every pair is compared
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i] === items[j]) {
        return true;
      }
    }
  }
  return false;
}

function hasDuplicateFast(items) {
  // O(n) time, O(n) extra memory
  return new Set(items).size !== items.length;
}

console.log(hasDuplicate([1, 2, 3, 2]), hasDuplicateFast([1, 2, 3])); // true false`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ищите скрытые циклы: `includes`, `indexOf`, `find` внутри цикла — это ещё один проход, итого O(n²); `slice` и spread копируют массив за O(n). Память тоже считают: `Set` ускоряет поиск ценой O(n) дополнительной памяти — частый обмен «время на память».',
          en: 'Look for hidden loops: `includes`, `indexOf`, `find` inside a loop are another pass, O(n²) overall; `slice` and spread copy the array in O(n). Memory counts too: a `Set` speeds up lookups at the cost of O(n) extra memory — a common time-for-memory trade.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Big-O — порядок роста; константы и младшие слагаемые отбрасывают.', en: 'Big-O is the growth order; constants and lower terms are dropped.' },
      { ru: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).', en: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).' },
      { ru: 'Вложенный цикл по тем же данным — обычно O(n²).', en: 'A nested loop over the same data is usually O(n²).' },
      { ru: '`includes` и `indexOf` внутри цикла — скрытый второй цикл.', en: '`includes` and `indexOf` inside a loop are a hidden second loop.' },
      { ru: 'Память тоже считают: `Set` ускоряет поиск ценой O(n) памяти.', en: 'Memory counts too: a `Set` speeds up lookups at O(n) memory.' },
    ],
    sources: [
      {
        title: 'Khan Academy — Big-O notation',
        url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation',
      },
      { title: 'Wikipedia — Big O notation', url: `${WIKI}/Big_O_notation` },
    ],
  },
  {
    tag: 'data-structures',
    summary: {
      ru: 'Структура данных определяет цену операций: массив быстр по индексу, хэш-таблица — по ключу, стек и очередь — по порядку.',
      en: 'The data structure determines the cost of operations: an array is fast by index, a hash table by key, a stack and a queue by order.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Массив**: доступ по индексу, `push` и `pop` — O(1), но `shift` и `unshift` сдвигают все элементы — O(n). **Стек** (LIFO — последним пришёл, первым ушёл) — `push`/`pop`. **Очередь** (FIFO): на больших объёмах `shift` медленный, поэтому хранят указатель на голову. **Связный список** вставляет за O(1) рядом с известным узлом, но ищет за O(n). **Map/Set** — поиск по ключу в среднем за O(1). **Куча** отдаёт минимум за O(1) и вставляет за O(log n) — это очередь с приоритетом.',
          en: '**Array**: index access, `push` and `pop` are O(1), but `shift` and `unshift` move every element — O(n). **Stack** (LIFO — last in, first out) — `push`/`pop`. **Queue** (FIFO): with large volumes `shift` is slow, so keep a head pointer. **Linked list** inserts in O(1) next to a known node but searches in O(n). **Map/Set** — key lookup in O(1) on average. **Heap** gives the minimum in O(1) and inserts in O(log n) — a priority queue.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `class Queue {
  #items = [];
  #head = 0;

  enqueue(value) {
    this.#items.push(value);
  }

  dequeue() {
    return this.#items[this.#head++];
  }

  get size() {
    return this.#items.length - this.#head;
  }
}

const queue = new Queue();
queue.enqueue('a');
queue.enqueue('b');
console.log(queue.dequeue(), queue.size); // a 1`,
        },
        caption: {
          ru: 'Очередь без shift: dequeue за O(1).',
          en: 'A queue without shift: dequeue in O(1).',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Массив: индекс и `push`/`pop` — O(1), `shift`/`unshift` — O(n).',
        en: 'Array: index and `push`/`pop` are O(1), `shift`/`unshift` O(n).',
      },
      { ru: 'Стек — LIFO, очередь — FIFO.', en: 'A stack is LIFO, a queue is FIFO.' },
      { ru: '`Map` и `Set` ищут по ключу в среднем за O(1).', en: '`Map` and `Set` look up by key in O(1) on average.' },
      { ru: 'Связный список вставляет за O(1), но ищет за O(n).', en: 'A linked list inserts in O(1) but searches in O(n).' },
      {
        ru: 'Куча — минимум за O(1), вставка за O(log n): очередь с приоритетом.',
        en: 'A heap gives the minimum in O(1) and inserts in O(log n): a priority queue.',
      },
    ],
    sources: [
      { title: 'MDN — Array.prototype.shift()', url: `${MDN_JS}/Array/shift` },
      { title: 'Wikipedia — Queue', url: `${WIKI}/Queue_(abstract_data_type)` },
      { title: 'Wikipedia — Heap', url: `${WIKI}/Heap_(data_structure)` },
    ],
  },
  {
    tag: 'searching',
    summary: {
      ru: 'Линейный поиск проверяет всё за O(n); бинарный делит отсортированный диапазон пополам и находит за O(log n).',
      en: 'Linear search checks everything in O(n); binary search halves a sorted range and finds the item in O(log n).',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Бинарный поиск работает только на отсортированных данных с доступом по индексу. Каждое сравнение с серединой отбрасывает половину диапазона: для миллиона элементов хватает примерно 20 сравнений. Главные ошибки — в границах: условие `left <= right` и сдвиг на `middle + 1` / `middle - 1`, иначе цикл зависнет или пропустит элемент.',
          en: 'Binary search only works on sorted data with index access. Each comparison with the middle discards half the range: about 20 comparisons are enough for a million elements. The main bugs are in the bounds: the `left <= right` condition and moving to `middle + 1` / `middle - 1`, otherwise the loop hangs or skips an element.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function binarySearch(sorted, target) {
  let left = 0;
  let right = sorted.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (sorted[middle] === target) {
      return middle;
    }
    if (sorted[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return -1;
}

console.log(binarySearch([3, 8, 12, 17, 23, 31, 42], 23)); // 4`,
        },
      },
      { type: 'diagram', diagram: 'binary-search' },
      {
        type: 'text',
        text: {
          ru: 'Если поиск по ключу повторяется много раз, часто проще один раз построить `Map` — дальше O(1) в среднем. Бинарный поиск применяют и к ответу: «минимальная скорость, при которой успеем» — проверяем середину диапазона возможных ответов.',
          en: 'If you search by key many times, it’s often simpler to build a `Map` once — then it’s O(1) on average. Binary search also works on the answer: “the minimum speed that’s fast enough” — check the middle of the range of possible answers.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Линейный поиск — O(n), работает на любом массиве.', en: 'Linear search is O(n) and works on any array.' },
      { ru: 'Бинарный — O(log n), но только на отсортированных данных.', en: 'Binary search is O(log n), but only on sorted data.' },
      { ru: 'Каждое сравнение отбрасывает половину диапазона.', en: 'Each comparison discards half of the range.' },
      { ru: 'Частые ошибки — границы: `left <= right` и `middle ± 1`.', en: 'Common bugs are bounds: `left <= right` and `middle ± 1`.' },
      { ru: 'Для повторных поисков по ключу проще `Map` — O(1) в среднем.', en: 'For repeated key lookups a `Map` is simpler — O(1) on average.' },
    ],
    sources: [
      { title: 'Wikipedia — Binary search', url: `${WIKI}/Binary_search` },
      { title: 'MDN — Array.prototype.indexOf()', url: `${MDN_JS}/Array/indexOf` },
    ],
  },
  {
    tag: 'sorting',
    summary: {
      ru: 'Хорошие универсальные сортировки работают за O(n log n). Встроенный `sort` в JS стабилен, но без компаратора сравнивает строки.',
      en: 'Good general-purpose sorts run in O(n log n). JS’s built-in `sort` is stable but compares strings without a comparator.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Простые сортировки (пузырёк, вставки, выбор) — O(n²); вставки хороши для маленьких и почти отсортированных массивов. **Merge sort** — всегда O(n log n) и стабилен, но требует O(n) памяти. **Quick sort** — в среднем O(n log n) и на месте, но в худшем случае O(n²). Быстрее O(n log n) сортировки сравнениями не бывают; подсчётом можно за O(n + k), если значения — небольшие целые.',
          en: 'Simple sorts (bubble, insertion, selection) are O(n²); insertion sort is good for small and nearly sorted arrays. **Merge sort** is always O(n log n) and stable but needs O(n) memory. **Quick sort** is O(n log n) on average and in place, but O(n²) in the worst case. Comparison sorts can’t beat O(n log n); counting sort can do O(n + k) when values are small integers.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function mergeSort(items) {
  if (items.length <= 1) {
    return items;
  }
  const middle = Math.floor(items.length / 2);
  const left = mergeSort(items.slice(0, middle));
  const right = mergeSort(items.slice(middle));
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort([5, 2, 9, 1, 5])); // [1, 2, 5, 5, 9]`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Стабильность** — равные элементы сохраняют исходный порядок. Это важно при сортировке по нескольким ключам: отсортировали по имени, затем по возрасту — внутри одного возраста имена остались по алфавиту. `Array.prototype.sort` стабилен начиная с ES2019.',
          en: '**Stability** means equal elements keep their original order. It matters when sorting by several keys: sort by name, then by age — within one age the names stay alphabetical. `Array.prototype.sort` is stable since ES2019.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const users = [
  { name: 'Bob', age: 30 },
  { name: 'Ann', age: 25 },
  { name: 'Cid', age: 30 },
];
users.sort((a, b) => a.age - b.age);
console.log(users.map((user) => user.name)); // ['Ann', 'Bob', 'Cid']`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Простые сортировки — O(n²), хорошие универсальные — O(n log n).', en: 'Simple sorts are O(n²), good general ones O(n log n).' },
      {
        ru: 'Merge sort стабилен и всегда O(n log n), но требует O(n) памяти.',
        en: 'Merge sort is stable and always O(n log n) but needs O(n) memory.',
      },
      { ru: 'Quick sort — O(n log n) в среднем и O(n²) в худшем случае.', en: 'Quick sort is O(n log n) on average and O(n²) in the worst case.' },
      { ru: 'Стабильная сортировка сохраняет порядок равных элементов.', en: 'A stable sort keeps the order of equal elements.' },
      {
        ru: '`sort` стабилен с ES2019; числа сортируют с `(a, b) => a - b`.',
        en: '`sort` is stable since ES2019; sort numbers with `(a, b) => a - b`.',
      },
    ],
    sources: [
      { title: 'Wikipedia — Merge sort', url: `${WIKI}/Merge_sort` },
      { title: 'Wikipedia — Quicksort', url: `${WIKI}/Quicksort` },
      { title: 'MDN — Array.prototype.sort(): stability', url: `${MDN_JS}/Array/sort#sort_stability` },
    ],
  },
  {
    tag: 'recursion',
    summary: {
      ru: 'Рекурсивная функция решает задачу через ту же задачу меньшего размера и обязана иметь базовый случай.',
      en: 'A recursive function solves a problem through a smaller instance of the same problem and must have a base case.',
    },
    blocks: [
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(3)); // 6`,
        },
      },
      { type: 'diagram', diagram: 'recursion-stack' },
      {
        type: 'text',
        text: {
          ru: 'Каждый вызов кладёт кадр в стек вызовов и ждёт результата вложенного, поэтому память — O(глубины). Стек ограничен: слишком глубокая рекурсия бросает `RangeError: Maximum call stack size exceeded`. Оптимизацию хвостовых вызовов, которая убрала бы эту проблему, почти никакие JS-движки не делают. Рекурсия естественна для деревьев и «разделяй и властвуй», а глубокую переписывают в цикл с явным стеком.',
          en: 'Every call pushes a frame onto the call stack and waits for the nested result, so memory is O(depth). The stack is limited: recursion that’s too deep throws `RangeError: Maximum call stack size exceeded`. Almost no JS engine does the tail-call optimization that would avoid it. Recursion is natural for trees and divide and conquer, and deep recursion is rewritten as a loop with an explicit stack.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function sumTree(root) {
  let sum = 0;
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    sum += node.value;
    stack.push(...node.children);
  }
  return sum;
}

const tree = { value: 1, children: [{ value: 2, children: [] }, { value: 3, children: [] }] };
console.log(sumTree(tree)); // 6`,
        },
        caption: {
          ru: 'Тот же обход без рекурсии: стек — обычный массив.',
          en: 'The same traversal without recursion: the stack is a plain array.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Нужен базовый случай, иначе рекурсия бесконечна.', en: 'A base case is required, otherwise recursion never ends.' },
      { ru: 'Каждый вызов занимает кадр стека: память O(глубины).', en: 'Each call takes a stack frame: memory is O(depth).' },
      {
        ru: 'Слишком глубокая рекурсия — `RangeError: Maximum call stack size exceeded`.',
        en: 'Too deep recursion throws `RangeError: Maximum call stack size exceeded`.',
      },
      { ru: 'Хвостовые вызовы в JS почти нигде не оптимизируются.', en: 'Tail calls are almost never optimized in JS.' },
      { ru: 'Глубокую рекурсию переписывают на цикл с явным стеком.', en: 'Deep recursion is rewritten as a loop with an explicit stack.' },
    ],
    sources: [
      { title: 'MDN — Recursion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion' },
      { title: 'MDN — RangeError', url: `${MDN_JS}/RangeError` },
      { title: 'Wikipedia — Recursion (computer science)', url: `${WIKI}/Recursion_(computer_science)` },
    ],
  },
  {
    tag: 'two-pointers',
    summary: {
      ru: 'Два указателя и скользящее окно заменяют вложенный цикл одним проходом: O(n) вместо O(n²).',
      en: 'Two pointers and a sliding window replace a nested loop with a single pass: O(n) instead of O(n²).',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Два указателя с концов** — для отсортированных массивов и палиндромов: сумма мала — двигаем левый вправо, велика — правый влево. **Скользящее окно** — для подмассивов и подстрок с условием: правый край расширяет окно, левый сжимает, пока условие нарушено. Каждый указатель двигается только вперёд, поэтому весь проход — O(n).',
          en: '**Two pointers from both ends** — for sorted arrays and palindromes: if the sum is too small move the left one right, if too big move the right one left. **A sliding window** — for subarrays and substrings with a condition: the right edge grows the window, the left edge shrinks it while the condition is violated. Each pointer only moves forward, so the whole pass is O(n).',
        },
      },
      {
        type: 'code',
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
  return null;
}

console.log(pairWithSum([1, 3, 4, 6, 9], 10)); // [1, 9]`,
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function longestUnique(text) {
  const lastSeen = new Map();
  let start = 0;
  let best = 0;
  for (let end = 0; end < text.length; end++) {
    const char = text[end];
    if (lastSeen.has(char) && lastSeen.get(char) >= start) {
      start = lastSeen.get(char) + 1;
    }
    lastSeen.set(char, end);
    best = Math.max(best, end - start + 1);
  }
  return best;
}

console.log(longestUnique('abcabcbb')); // 3`,
        },
        caption: {
          ru: 'Окно: длина самой длинной подстроки без повторов.',
          en: 'A window: the length of the longest substring without repeats.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Два указателя с концов — для отсортированных массивов и палиндромов.',
        en: 'Two pointers from the ends work for sorted arrays and palindromes.',
      },
      {
        ru: 'Окно расширяется справа и сжимается слева, пока условие нарушено.',
        en: 'A window grows on the right and shrinks on the left while the condition is violated.',
      },
      { ru: 'Указатели двигаются только вперёд — отсюда O(n).', en: 'Pointers only move forward — hence O(n).' },
      {
        ru: 'Пара или подмассив во вложенном цикле — повод попробовать окно.',
        en: 'A pair or subarray in a nested loop is a hint to try a window.',
      },
      { ru: 'Счётчики символов в окне удобно держать в `Map`.', en: 'Keep character counts in the window in a `Map`.' },
    ],
    sources: [
      { title: 'Wikipedia — Merge algorithm', url: `${WIKI}/Merge_algorithm` },
      { title: 'Wikipedia — Palindrome', url: `${WIKI}/Palindrome` },
    ],
  },
  {
    tag: 'hashing',
    summary: {
      ru: 'Хэш-таблица превращает ключ в номер ячейки и даёт поиск, вставку и удаление в среднем за O(1). В JS это `Map`, `Set` и объекты.',
      en: 'A hash table turns a key into a slot number and gives lookup, insertion and deletion in O(1) on average. In JS that’s `Map`, `Set` and objects.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Хэш-функция вычисляет по ключу индекс ячейки. Разные ключи иногда попадают в одну ячейку — это коллизии, их разрешают цепочками или поиском свободной ячейки. Когда таблица заполняется, она увеличивается и перекладывает элементы — поэтому вставка O(1) **амортизированно**. В худшем случае (все ключи в одной ячейке) операции деградируют до O(n).',
          en: 'A hash function computes a slot index from the key. Different keys sometimes land in the same slot — collisions, resolved with chaining or by probing for a free slot. When the table fills up, it grows and rehashes — so insertion is **amortized** O(1). In the worst case (all keys in one slot) operations degrade to O(n).',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function twoSum(numbers, target) {
  const seen = new Map();
  for (let i = 0; i < numbers.length; i++) {
    const need = target - numbers[i];
    if (seen.has(need)) {
      return [seen.get(need), i];
    }
    seen.set(numbers[i], i);
  }
  return null;
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`,
        },
        caption: {
          ru: 'Один проход и Map вместо перебора всех пар: O(n) вместо O(n²).',
          en: 'One pass and a Map instead of checking every pair: O(n) instead of O(n²).',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Типовые применения: подсчёт частот, удаление дублей, «встречали ли уже», группировка (например, анаграмм по отсортированным буквам), кэш результатов.',
          en: 'Typical uses: counting frequencies, removing duplicates, “have we seen it”, grouping (e.g. anagrams by sorted letters), caching results.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const counts = new Map();
for (const word of ['a', 'b', 'a']) {
  counts.set(word, (counts.get(word) ?? 0) + 1);
}
console.log(counts.get('a')); // 2`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Поиск, вставка и удаление — в среднем O(1).', en: 'Lookup, insertion and deletion are O(1) on average.' },
      {
        ru: 'При заполнении таблица растёт — вставка O(1) амортизированно.',
        en: 'The table grows when full — insertion is amortized O(1).',
      },
      { ru: 'В худшем случае операции деградируют до O(n).', en: 'In the worst case operations degrade to O(n).' },
      { ru: '`Map`/`Set` — для подсчёта, дедупликации и «видели ли уже».', en: '`Map`/`Set` for counting, deduplication and “seen before”.' },
      { ru: 'Two Sum через `Map` — O(n) вместо O(n²).', en: 'Two Sum with a `Map` is O(n) instead of O(n²).' },
    ],
    sources: [
      { title: 'Wikipedia — Hash table', url: `${WIKI}/Hash_table` },
      { title: 'MDN — Map', url: `${MDN_JS}/Map` },
      { title: 'MDN — Set', url: `${MDN_JS}/Set` },
    ],
  },
  {
    tag: 'trees-graphs',
    summary: {
      ru: 'Дерево — граф без циклов с корнем. Обходы в ширину (BFS, очередь) и в глубину (DFS, стек или рекурсия) лежат в основе почти всех задач.',
      en: 'A tree is a rooted graph without cycles. Breadth-first (BFS, a queue) and depth-first (DFS, a stack or recursion) traversals underlie almost every problem.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Граф обычно хранят **списком смежности**: для каждой вершины — массив соседей. **BFS** обходит по уровням с помощью очереди и находит кратчайший путь в графе без весов. **DFS** идёт вглубь — стеком или рекурсией; удобен для проверки достижимости, поиска циклов, топологической сортировки.',
          en: 'A graph is usually stored as an **adjacency list**: an array of neighbors per vertex. **BFS** traverses level by level with a queue and finds the shortest path in an unweighted graph. **DFS** goes deep first — with a stack or recursion; handy for reachability, cycle detection, topological sorting.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const tree = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: [],
  F: [],
};

function bfs(start) {
  const order = [];
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    queue.push(...tree[node]);
  }
  return order;
}

console.log(bfs('A').join(' ')); // A B C D E F`,
        },
        caption: {
          ru: 'Для небольших очередей shift подходит; для больших — очередь с указателем из конспекта «Структуры данных».',
          en: 'shift is fine for small queues; for large ones use the pointer queue from the Data structures lesson.',
        },
      },
      { type: 'diagram', diagram: 'bfs-queue' },
      {
        type: 'text',
        text: {
          ru: 'В графе с циклами нужен `Set` посещённых вершин, иначе обход зациклится. В двоичном дереве поиска слева от узла меньшие ключи, справа большие: в сбалансированном дереве поиск — O(log n), в вырожденном («палке») — O(n). DOM — тоже дерево.',
          en: 'In a graph with cycles you need a `Set` of visited vertices, or the traversal loops forever. In a binary search tree, smaller keys go left and larger ones right: search is O(log n) in a balanced tree and O(n) in a degenerate one (a “stick”). The DOM is a tree too.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) {
    return visited;
  }
  visited.add(node);
  for (const next of graph[node]) {
    dfs(graph, next, visited);
  }
  return visited;
}

console.log([...dfs(tree, 'A')].join(' ')); // A B D E C F`,
        },
      },
    ],
    keyPoints: [
      {
        ru: 'BFS — очередь, обход по уровням, кратчайший путь в графе без весов.',
        en: 'BFS — a queue, level by level, shortest path in an unweighted graph.',
      },
      { ru: 'DFS — стек или рекурсия, сначала вглубь.', en: 'DFS — a stack or recursion, depth first.' },
      { ru: 'В графе с циклами нужен `Set` посещённых вершин.', en: 'A graph with cycles needs a `Set` of visited vertices.' },
      { ru: 'Граф обычно хранят списком смежности.', en: 'A graph is usually stored as an adjacency list.' },
      {
        ru: 'В сбалансированном BST поиск — O(log n), в вырожденном — O(n).',
        en: 'Search in a balanced BST is O(log n), in a degenerate one O(n).',
      },
    ],
    sources: [
      { title: 'Wikipedia — Breadth-first search', url: `${WIKI}/Breadth-first_search` },
      { title: 'Wikipedia — Depth-first search', url: `${WIKI}/Depth-first_search` },
      { title: 'Wikipedia — Binary search tree', url: `${WIKI}/Binary_search_tree` },
    ],
  },
  {
    tag: 'dynamic-programming',
    summary: {
      ru: 'Динамическое программирование решает задачу через подзадачи и запоминает их ответы, чтобы не считать одно и то же дважды.',
      en: 'Dynamic programming solves a problem through subproblems and remembers their answers so nothing is computed twice.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'ДП нужно, когда подзадачи **повторяются** и из их ответов собирается ответ задачи. Наивная рекурсия для чисел Фибоначчи пересчитывает одни и те же значения и работает за O(2ⁿ); с запоминанием — O(n). Два способа: **мемоизация** (рекурсия сверху вниз плюс кэш) и **табуляция** (таблица снизу вверх от базовых случаев).',
          en: 'DP is needed when subproblems **repeat** and the answer is built from their answers. Naive recursion for Fibonacci numbers recomputes the same values and runs in O(2ⁿ); with memoization it’s O(n). Two approaches: **memoization** (top-down recursion plus a cache) and **tabulation** (a bottom-up table from the base cases).',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function fib(n, memo = new Map()) {
  if (n <= 1) {
    return n;
  }
  if (!memo.has(n)) {
    memo.set(n, fib(n - 1, memo) + fib(n - 2, memo));
  }
  return memo.get(n);
}

console.log(fib(50)); // 12586269025`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Рецепт: определить **состояние** (что значит `best[sum]`), **переход** (как оно выражается через меньшие), **базовые случаи** и **порядок** вычисления. Классика: лестница, размен монет, наибольшая общая подпоследовательность, рюкзак.',
          en: 'Recipe: define the **state** (what `best[sum]` means), the **transition** (how it’s expressed through smaller states), the **base cases** and the **order** of computation. Classics: stairs, coin change, longest common subsequence, knapsack.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function minCoins(coins, amount) {
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
}

console.log(minCoins([1, 5, 10], 18)); // 5`,
        },
        caption: {
          ru: 'Табуляция: best[sum] — минимум монет для суммы sum.',
          en: 'Tabulation: best[sum] is the minimum number of coins for sum.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'ДП нужно, когда подзадачи повторяются и из их ответов складывается ответ.',
        en: 'DP fits when subproblems repeat and their answers build the answer.',
      },
      { ru: 'Мемоизация — рекурсия сверху вниз с кэшем.', en: 'Memoization is top-down recursion with a cache.' },
      { ru: 'Табуляция заполняет таблицу снизу вверх от базовых случаев.', en: 'Tabulation fills a table bottom-up from the base cases.' },
      {
        ru: 'Рецепт: состояние, переход, базовые случаи, порядок вычисления.',
        en: 'Recipe: state, transition, base cases, order of computation.',
      },
      { ru: 'Наивный Фибоначчи — O(2ⁿ), с ДП — O(n).', en: 'Naive Fibonacci is O(2ⁿ), with DP it’s O(n).' },
    ],
    sources: [
      { title: 'Wikipedia — Dynamic programming', url: `${WIKI}/Dynamic_programming` },
      { title: 'Wikipedia — Memoization', url: `${WIKI}/Memoization` },
    ],
  },
];
