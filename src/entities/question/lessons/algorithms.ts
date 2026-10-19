import type { Lesson } from '../model/types';

const WIKI = 'https://en.wikipedia.org/wiki';
const MDN_JS = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects';

export const ALGORITHMS_LESSONS: Lesson[] = [
  {
    tag: 'big-o',
    format: 'steps',
    summary: {
      ru: 'Big-O описывает, как растут время и память алгоритма, когда растёт вход. На собеседовании это язык, которым сравнивают решения: «работает» мало, важно, как оно масштабируется.',
      en: 'Big-O describes how an algorithm’s time and memory grow as the input grows. In interviews it’s the language for comparing solutions: “it works” isn’t enough — what matters is how it scales.',
    },
    steps: [
      {
        id: 'growth',
        title: { ru: 'Как растёт работа', en: 'How work grows' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Big-O отбрасывает константы и младшие слагаемые и оставляет главное: как число шагов зависит от размера входа n. `O(1)` — доступ по индексу, `O(log n)` — деление пополам, `O(n)` — один проход, `O(n log n)` — хорошие сортировки, `O(n²)` — цикл в цикле по тем же данным, `O(2^n)` — перебор всех подмножеств. Вдвое больше данных — для `O(n²)` вчетверо больше работы.',
              en: 'Big-O drops constants and lower-order terms and keeps the essence: how the number of steps depends on the input size n. `O(1)` is index access, `O(log n)` is halving, `O(n)` is one pass, `O(n log n)` is good sorting, `O(n²)` is a loop inside a loop over the same data, `O(2^n)` is trying every subset. Twice the data means four times the work for `O(n²)`.',
            },
          },
          { type: 'illustration', illustration: 'algo-growth' },
        ],
        test: ['algo-big-o-001', 'algo-big-o-order-001'],
      },
      {
        id: 'space',
        title: { ru: 'Память и стек вызовов', en: 'Memory and the call stack' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Сложность по памяти считают так же: сколько дополнительной памяти нужно в зависимости от n. Легко забыть про **стек вызовов**: каждый незавершённый рекурсивный вызов хранит свой кадр. Рекурсия глубиной n занимает `O(n)` памяти, даже если в функции почти нет переменных. Цикл с одной переменной-аккумулятором — `O(1)`.',
              en: 'Space complexity is counted the same way: how much extra memory is needed depending on n. The **call stack** is easy to forget: every unfinished recursive call keeps its own frame. Recursion n levels deep takes `O(n)` memory even if the function has almost no variables. A loop with a single accumulator is `O(1)`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const total = (items) => {\n  let sum = 0; // O(1) extra memory\n  for (const item of items) {\n    sum += item;\n  }\n  return sum;\n};',
            },
          },
        ],
        test: ['algo-big-o-005'],
      },
      {
        id: 'arrays-lists',
        title: { ru: 'Цена операций с массивом', en: 'The cost of array operations' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Массив хранит элементы подряд. `push` и `pop` работают с концом — `O(1)`, а `shift` и `unshift` сдвигают все остальные элементы — `O(n)`. В связном списке вставка в начало — `O(1)`: новый узел просто ссылается на старую голову, зато доступ по индексу — `O(n)`. `push` дёшев **амортизированно**: когда место кончается, массив выделяет вдвое больше и копирует элементы, но такие копирования редки, и n вставок стоят `O(n)`.',
              en: 'An array stores elements contiguously. `push` and `pop` work at the end — `O(1)`, while `shift` and `unshift` move every other element — `O(n)`. In a linked list inserting at the head is `O(1)`: the new node just points to the old head, but index access is `O(n)`. `push` is cheap **amortized**: when space runs out the array allocates twice as much and copies, but such copies are rare, and n inserts cost `O(n)`.',
            },
          },
        ],
        test: ['algo-big-o-004', 'algo-ds-005'],
      },
      {
        id: 'heap',
        title: { ru: 'Куча для «лучших k»', en: 'A heap for “top k”' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Куча** (heap) даёт минимум за `O(1)`, а вставка и удаление стоят `O(log k)`, где k — её размер. Чтобы из огромного потока держать k самых больших чисел, хранят мин-кучу из k элементов: новое число больше минимума — заменяет его. Итого `O(n log k)` времени и `O(k)` памяти — вместо сортировки всего потока за `O(n log n)`.',
              en: 'A **heap** gives the minimum in `O(1)`, while insertion and removal cost `O(log k)`, where k is its size. To keep the k largest numbers from a huge stream, store a min-heap of k elements: a new number larger than the minimum replaces it. That’s `O(n log k)` time and `O(k)` memory — instead of sorting the whole stream in `O(n log n)`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'heap-vs-sort',
              prompt: {
                ru: 'Почему для «10 самых больших из миллиона» куча лучше полной сортировки?',
                en: 'Why is a heap better than a full sort for “the 10 largest of a million”?',
              },
              options: [
                { text: { ru: 'Она держит только 10 элементов: `O(n log 10)` вместо `O(n log n)` и `O(10)` памяти', en: 'It keeps only 10 elements: `O(n log 10)` instead of `O(n log n)` and `O(10)` memory' } },
                { text: { ru: 'Куча сортирует за `O(1)`', en: 'A heap sorts in `O(1)`' } },
                { text: { ru: 'Сортировка не умеет находить максимум', en: 'Sorting can’t find the maximum' } },
              ],
              answer: 0,
              explanation: {
                ru: '`log 10` — константа, поэтому решение по сути линейное и не хранит весь поток.',
                en: '`log 10` is a constant, so the solution is essentially linear and doesn’t store the whole stream.',
              },
            },
          },
        ],
        test: ['algo-ds-004'],
      },
    ],
    keyPoints: [
      { ru: 'Big-O — главный член, без констант.', en: 'Big-O is the leading term, no constants.' },
      { ru: 'Рекурсия тратит память на стек.', en: 'Recursion spends memory on the stack.' },
      { ru: '`shift`/`unshift` — `O(n)`, `push` — амортизированно `O(1)`.', en: '`shift`/`unshift` are `O(n)`; `push` is amortized `O(1)`.' },
      { ru: '«Лучшие k» — куча из k элементов.', en: '“Top k” — a heap of k elements.' },
    ],
    sources: [
      {
        title: 'Khan Academy — Big-O notation',
        url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation',
      },
      { title: 'Wikipedia — Big O notation', url: `${WIKI}/Big_O_notation` },
      { title: 'Wikipedia — Amortized analysis', url: `${WIKI}/Amortized_analysis` },
      { title: 'Wikipedia — Heap', url: `${WIKI}/Heap_(data_structure)` },
    ],
  },
  {
    tag: 'data-structures',
    format: 'steps',
    summary: {
      ru: 'Выбор структуры данных часто решает задачу наполовину. Разберём стек и очередь, задачу о скобках, очередь на двух стеках, префиксные суммы и LRU-кеш.',
      en: 'Choosing the data structure often solves half the problem. We’ll cover the stack and queue, the brackets problem, a queue built from two stacks, prefix sums and an LRU cache.',
    },
    steps: [
      {
        id: 'stack-queue',
        title: { ru: 'Стек и очередь', en: 'Stack and queue' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Стек** — «последним пришёл, первым ушёл» (LIFO): так устроены история отмены (`undo`), стек вызовов и кнопка «Назад». **Очередь** — «первым пришёл, первым ушёл» (FIFO): задачи по порядку поступления, обход в ширину. В JavaScript массив работает как стек через `push` + `pop` (конец) и как очередь через `push` + `shift` (из начала).',
              en: 'A **stack** is last in, first out (LIFO): that’s how undo history, the call stack and the Back button work. A **queue** is first in, first out (FIFO): tasks in arrival order, breadth-first traversal. In JavaScript an array works as a stack with `push` + `pop` (the end) and as a queue with `push` + `shift` (from the start).',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const history = ['a', 'b'];\nhistory.push('c');\nhistory.pop(); // 'c' — last in\n\nconst tasks = ['a', 'b'];\ntasks.push('c');\ntasks.shift(); // 'a' — first in",
            },
          },
        ],
        test: ['algo-ds-001', 'algo-ds-002'],
      },
      {
        id: 'brackets',
        title: { ru: 'Задача о скобках', en: 'The brackets problem' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Проверка, что скобки расставлены правильно, — классика на стек. Открывающую скобку кладут в стек; закрывающая должна совпасть по типу с **верхушкой** стека, иначе строка неверна. В конце стек обязан быть пуст — иначе какие-то скобки не закрыты. Вложенность проверяется сама: последняя открытая должна закрыться первой.',
              en: 'Checking that brackets are balanced is a classic stack task. An opening bracket is pushed; a closing one must match the **top** of the stack by type, or the string is invalid. At the end the stack must be empty — otherwise some brackets are unclosed. Nesting checks itself: the last opened must close first.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'brackets-empty',
              prompt: {
                ru: 'Строка `(()` прошла цикл без ошибок. Верна ли она?',
                en: 'The string `(()` went through the loop without errors. Is it valid?',
              },
              options: [
                { text: { ru: 'Да, ни одна пара не нарушена', en: 'Yes, no pair was broken' } },
                { text: { ru: 'Нет: в стеке осталась незакрытая скобка', en: 'No: an unclosed bracket remains on the stack' } },
                { text: { ru: 'Зависит от длины строки', en: 'It depends on the string length' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Финальная проверка пустоты стека так же важна, как проверка пар внутри цикла.',
                en: 'The final empty-stack check matters as much as the pair check inside the loop.',
              },
            },
          },
        ],
        test: ['algo-ds-003'],
      },
      {
        id: 'two-stacks',
        title: { ru: 'Очередь на двух стеках', en: 'A queue from two stacks' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Очередь без `O(n)`-сдвигов можно собрать из двух стеков. Новые элементы кладут во «входящий» стек. Когда нужно достать элемент, а «исходящий» стек пуст, туда переливают весь входящий — порядок при этом разворачивается, и наверху оказывается самый старый элемент. Каждый элемент переливается один раз, поэтому операции амортизированно `O(1)`.',
              en: 'A queue without `O(n)` shifts can be built from two stacks. New elements go onto the “inbox” stack. When you need to take one and the “outbox” stack is empty, the whole inbox is poured into it — the order reverses, so the oldest element ends up on top. Each element is moved once, so operations are amortized `O(1)`.',
            },
          },
        ],
        test: ['algo-ds-queue-stacks-001'],
      },
      {
        id: 'prefix-lru',
        title: { ru: 'Префиксные суммы и LRU', en: 'Prefix sums and LRU' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Префиксные суммы**: `prefix[i]` — сумма первых i элементов. Сумма любого отрезка — разность двух префиксов: подготовка `O(n)`, каждый запрос `O(1)`. **LRU-кеш** вытесняет запись, к которой дольше всего не обращались. Его удобно строить на `Map`: она помнит порядок вставки. При обращении ключ удаляют и вставляют заново — он становится самым свежим, а при переполнении вытесняют первый ключ.',
              en: '**Prefix sums**: `prefix[i]` is the sum of the first i elements. Any range sum is the difference of two prefixes: `O(n)` preparation, `O(1)` per query. An **LRU cache** evicts the entry unused for the longest time. It’s easy to build on `Map`, which remembers insertion order. On access the key is deleted and re-inserted — becoming the freshest — and on overflow the first key is evicted.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const values = [2, 7, 1, 8];\nconst prefix = [0];\nfor (const value of values) {\n  prefix.push(prefix.at(-1) + value);\n}\n// sum of values[1..2]:\nprefix[3] - prefix[1]; // 8',
            },
          },
        ],
        test: ['algo-ds-prefix-sums-001', 'algo-ds-lru-001'],
      },
    ],
    keyPoints: [
      { ru: 'Стек — LIFO, очередь — FIFO.', en: 'A stack is LIFO; a queue is FIFO.' },
      { ru: 'Скобки — стек и пустой стек в конце.', en: 'Brackets — a stack, empty at the end.' },
      { ru: 'Префиксные суммы — отрезок за `O(1)`.', en: 'Prefix sums give a range in `O(1)`.' },
      { ru: 'LRU на `Map` — порядок вставки.', en: 'LRU on `Map` uses insertion order.' },
    ],
    sources: [
      { title: 'MDN — Array.prototype.shift()', url: `${MDN_JS}/Array/shift` },
      { title: 'Wikipedia — Queue', url: `${WIKI}/Queue_(abstract_data_type)` },
      { title: 'Wikipedia — Prefix sum', url: `${WIKI}/Prefix_sum` },
      { title: 'MDN — Map', url: `${MDN_JS}/Map` },
    ],
  },
  {
    tag: 'searching',
    format: 'steps',
    summary: {
      ru: 'Бинарный поиск — самый частый «логарифмический» алгоритм на собеседовании. Идея простая, а ошибки прячутся в границах. Разберём условие применимости, правильные границы и поиск первого подходящего элемента.',
      en: 'Binary search is the most common “logarithmic” algorithm in interviews. The idea is simple, and the bugs hide in the bounds. We’ll cover when it applies, correct bounds and finding the first matching element.',
    },
    steps: [
      {
        id: 'precondition',
        title: { ru: 'Когда работает бинарный поиск', en: 'When binary search works' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Бинарный поиск сравнивает искомое значение с серединой и отбрасывает половину, где ответа быть не может. Это корректно, только если элементы **упорядочены**: всё левее середины меньше, правее — больше. На неотсортированном массиве поиск может пройти мимо существующего элемента. Отсортировать ради одного поиска невыгодно — `O(n log n)` дороже простого прохода `O(n)`.',
              en: 'Binary search compares the target with the middle and discards the half where the answer can’t be. That’s correct only if the elements are **ordered**: everything left of the middle is smaller, everything right is larger. On an unsorted array the search can miss an existing element. Sorting for a single search doesn’t pay off — `O(n log n)` costs more than a plain `O(n)` pass.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'one-search',
              prompt: {
                ru: 'В неотсортированном массиве нужно один раз найти число. Что выгоднее?',
                en: 'You need to find a number once in an unsorted array. What’s cheaper?',
              },
              options: [
                { text: { ru: 'Отсортировать и искать бинарным поиском', en: 'Sort it and use binary search' } },
                { text: { ru: 'Пройти массив циклом — `O(n)`', en: 'Scan the array in a loop — `O(n)`' } },
                { text: { ru: 'Бинарный поиск без сортировки', en: 'Binary search without sorting' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Сортировка стоит `O(n log n)` и окупается, только если искать предстоит много раз. Бинарный поиск по неотсортированным данным просто неверен.',
                en: 'Sorting costs `O(n log n)` and pays off only for many searches. Binary search on unsorted data is simply wrong.',
              },
            },
          },
        ],
        test: ['algo-search-001'],
      },
      {
        id: 'halving',
        title: { ru: 'Деление пополам', en: 'Halving' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Каждое сравнение вдвое сужает диапазон. Чтобы дойти от n элементов до одного, нужно около log₂ n шагов: для тысячи элементов — 10, для миллиона — 20 вместо миллиона сравнений при переборе. Отсюда сложность `O(log n)`.',
              en: 'Each comparison halves the range. Getting from n elements to one takes about log₂ n steps: 10 for a thousand elements, 20 for a million — instead of a million comparisons with a linear scan. Hence the `O(log n)` complexity.',
            },
          },
          { type: 'diagram', diagram: 'algo-binary-search' },
        ],
        test: ['algo-big-o-002'],
      },
      {
        id: 'bounds',
        title: { ru: 'Границы без зацикливания', en: 'Bounds without infinite loops' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В классическом варианте `high = length - 1`, а цикл идёт `while (low <= high)`: при `<` последний оставшийся элемент не проверится. Середина уже сравнена, поэтому граница обязана сдвигаться **за неё**: `low = mid + 1` или `high = mid - 1`. Если написать `low = mid`, то при `low === mid` диапазон перестанет сужаться, и цикл будет крутиться вечно. Не нашли — вернуть `-1`.',
              en: 'In the classic version `high = length - 1` and the loop runs `while (low <= high)`: with `<` the last remaining element is never checked. The middle has already been compared, so a bound must move **past it**: `low = mid + 1` or `high = mid - 1`. Writing `low = mid` stops the range from shrinking when `low === mid`, and the loop spins forever. Not found — return `-1`.',
            },
          },
        ],
        test: ['algo-search-002', 'algo-searching-bug-001'],
      },
      {
        id: 'first-true',
        title: { ru: 'Поиск первого подходящего', en: 'Finding the first match' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Часто нужно не «найти значение», а найти **первую позицию**, где условие становится истинным: первую сломанную версию, место вставки числа (нижняя граница). Тогда диапазон полуоткрытый: `while (low < high)`. Если в середине условие истинно, она может быть ответом — `high = mid`; если ложно — `low = mid + 1`. Цикл заканчивается, когда `low === high`, — это и есть ответ.',
              en: 'Often you need not to “find a value” but the **first position** where a condition becomes true: the first broken version, the insertion point of a number (lower bound). Then the range is half-open: `while (low < high)`. If the condition holds at the middle, it may be the answer — `high = mid`; if not — `low = mid + 1`. The loop ends when `low === high`, and that’s the answer.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'let low = 0;\nlet high = scores.length;\nwhile (low < high) {\n  const mid = (low + high) >> 1;\n  if (scores[mid] >= limit) {\n    high = mid;\n  } else {\n    low = mid + 1;\n  }\n}',
            },
          },
        ],
        test: ['algo-search-first-bad-001'],
      },
    ],
    keyPoints: [
      { ru: 'Бинарный поиск — только по упорядоченным данным.', en: 'Binary search needs ordered data.' },
      { ru: '`O(log n)`: 20 шагов на миллион.', en: '`O(log n)`: 20 steps for a million.' },
      { ru: 'Граница сдвигается за середину.', en: 'A bound moves past the middle.' },
      { ru: 'Первое «да» — `low < high` и `high = mid`.', en: 'First “yes” — `low < high` and `high = mid`.' },
    ],
    sources: [
      { title: 'Wikipedia — Binary search', url: `${WIKI}/Binary_search` },
      { title: 'MDN — Array.prototype.indexOf()', url: `${MDN_JS}/Array/indexOf` },
    ],
  },
  {
    tag: 'sorting',
    format: 'steps',
    summary: {
      ru: 'Писать сортировку руками на работе почти не приходится, но знать, как устроен встроенный `sort`, чем отличаются классические алгоритмы и где сортировка помогает решить задачу, нужно.',
      en: 'You rarely write a sort by hand at work, but you need to know how the built-in `sort` works, how the classic algorithms differ and where sorting helps solve a problem.',
    },
    steps: [
      {
        id: 'built-in',
        title: { ru: 'Встроенный sort', en: 'The built-in sort' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Спецификация не фиксирует алгоритм `Array.prototype.sort`, но V8 (Chrome, Node.js) с 2018 года использует TimSort — гибрид сортировки слиянием и вставками: `O(n log n)` в худшем случае и почти `O(n)` на частично отсортированных данных. С ES2019 сортировка обязана быть **стабильной**: элементы с одинаковым ключом сохраняют исходный взаимный порядок — можно сортировать по второму ключу, а потом по первому.',
              en: 'The spec doesn’t fix the algorithm of `Array.prototype.sort`, but since 2018 V8 (Chrome, Node.js) uses TimSort — a hybrid of merge and insertion sort: `O(n log n)` worst case and nearly `O(n)` on partly sorted data. Since ES2019 sorting must be **stable**: elements with equal keys keep their original relative order — so you can sort by a second key, then by the first.',
            },
          },
        ],
        test: ['algo-big-o-006', 'algo-sort-001'],
      },
      {
        id: 'comparator',
        title: { ru: 'Компаратор', en: 'The comparator' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Без компаратора `sort` приводит элементы к строкам и сравнивает их по кодам UTF-16. Поэтому `[10, 9, 1].sort()` даёт `[1, 10, 9]`, а буквы с диакритикой вроде `Ä` уезжают в конец: их коды больше латинских. Числа сортируют компаратором `(a, b) => a - b`, строки для людей — `localeCompare` с нужной локалью или `Intl.Collator`. `sort` меняет исходный массив; копию возвращает `toSorted`.',
              en: 'Without a comparator `sort` converts elements to strings and compares UTF-16 codes. So `[10, 9, 1].sort()` gives `[1, 10, 9]`, and accented letters like `Ä` go to the end: their codes are larger than Latin ones. Numbers are sorted with `(a, b) => a - b`, human-facing strings with `localeCompare` in the right locale or `Intl.Collator`. `sort` mutates the array; `toSorted` returns a copy.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: '[10, 9, 1].sort(); // [1, 10, 9]\n[10, 9, 1].toSorted((a, b) => a - b);\n// [1, 9, 10]',
            },
          },
        ],
        test: ['algo-sort-locale-001'],
      },
      {
        id: 'merge-quick',
        title: { ru: 'Слиянием и быстрая', en: 'Merge sort and quicksort' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Сортировка слиянием** делит массив пополам, сортирует части и сливает их: два указателя идут по отсортированным половинам и каждый раз забирают меньший элемент, а когда одна половина кончилась, хвост другой добавляют целиком. Всегда `O(n log n)` и стабильно, но нужен буфер `O(n)`. **Быстрая сортировка** раскладывает элементы вокруг опорного — в среднем быстрее и без буфера, но при неудачном опорном вырождается в `O(n²)`.',
              en: '**Merge sort** splits the array in half, sorts the halves and merges them: two pointers walk the sorted halves and take the smaller element each time, and when one half runs out the other’s tail is appended whole. Always `O(n log n)` and stable, but it needs an `O(n)` buffer. **Quicksort** partitions around a pivot — faster on average and bufferless, but with a bad pivot it degrades to `O(n²)`.',
            },
          },
        ],
        test: ['algo-sort-002'],
      },
      {
        id: 'sort-as-tool',
        title: { ru: 'Сортировка как приём', en: 'Sorting as a technique' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Сортировка приводит данные к каноническому виду. Анаграммы состоят из одних и тех же букв, поэтому после сортировки букв обе строки совпадают: `"night"` и `"thing"` дают `"ghint"`. Это `O(n log n)`; подсчёт частот через хэш-таблицу быстрее — `O(n)`. Ещё приёмы: после сортировки дубликаты стоят рядом, а пары с нужной суммой ищутся двумя указателями.',
              en: 'Sorting brings data to a canonical form. Anagrams consist of the same letters, so after sorting the letters both strings match: `"night"` and `"thing"` give `"ghint"`. That’s `O(n log n)`; counting frequencies with a hash table is faster — `O(n)`. More tricks: after sorting duplicates sit next to each other, and pairs with a given sum are found with two pointers.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'sort-numbers',
              prompt: {
                ru: 'Что вернёт `[3, 20, 100].sort()`?',
                en: 'What does `[3, 20, 100].sort()` return?',
              },
              options: [
                { text: { ru: '`[3, 20, 100]`', en: '`[3, 20, 100]`' } },
                { text: { ru: '`[100, 20, 3]`', en: '`[100, 20, 3]`' } },
                { text: { ru: '`[3, 100, 20]`', en: '`[3, 100, 20]`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Без компаратора сравниваются строки: `"100" < "20" < "3"` — по первому символу.',
                en: 'Without a comparator strings are compared: `"100" < "20" < "3"` — by the first character.',
              },
            },
          },
        ],
        test: ['algo-hash-002'],
      },
    ],
    keyPoints: [
      { ru: '`sort` в V8 — TimSort, `O(n log n)`, стабильный.', en: '`sort` in V8 is TimSort, `O(n log n)`, stable.' },
      { ru: 'Без компаратора — сравнение строк.', en: 'Without a comparator it compares strings.' },
      { ru: 'Слияние — всегда `O(n log n)` и `O(n)` памяти; быстрая — худший `O(n²)`.', en: 'Merge sort is always `O(n log n)` with `O(n)` memory; quicksort’s worst case is `O(n²)`.' },
      { ru: 'Сортировка — канонический вид для сравнения.', en: 'Sorting gives a canonical form for comparison.' },
    ],
    sources: [
      { title: 'Wikipedia — Merge sort', url: `${WIKI}/Merge_sort` },
      { title: 'Wikipedia — Quicksort', url: `${WIKI}/Quicksort` },
      { title: 'MDN — Array.prototype.sort(): stability', url: `${MDN_JS}/Array/sort#sort_stability` },
      { title: 'MDN — String.prototype.localeCompare()', url: `${MDN_JS}/String/localeCompare` },
    ],
  },
  {
    tag: 'recursion',
    format: 'steps',
    summary: {
      ru: 'Рекурсия решает задачу через ту же задачу меньшего размера. Это естественный способ работать с деревьями и перебором, но у неё есть цена: стек вызовов и экспоненциальный рост вызовов.',
      en: 'Recursion solves a problem through the same problem of a smaller size. It’s the natural way to work with trees and enumeration, but it has a price: the call stack and exponential call growth.',
    },
    steps: [
      {
        id: 'base-case',
        title: { ru: 'Базовый случай и шаг', en: 'Base case and step' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Рекурсивной функции нужны две части: **базовый случай**, где ответ известен сразу, и **шаг**, сводящий задачу к меньшей. Без базового случая рекурсия не остановится. Вложенный массив — это дерево: рекурсивный обход раскрывает его до самых листьев, а встроенный `flat()` по умолчанию раскрывает только один уровень — все уровни даёт `flat(Infinity)`.',
              en: 'A recursive function needs two parts: a **base case** where the answer is known at once, and a **step** that reduces the problem to a smaller one. Without a base case recursion never stops. A nested array is a tree: a recursive walk unfolds it down to the leaves, while the built-in `flat()` unfolds only one level by default — `flat(Infinity)` unfolds all.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'function countdown(n) {\n  if (n === 0) return [];\n  return [n, ...countdown(n - 1)];\n}\ncountdown(3); // [3, 2, 1]',
            },
          },
        ],
        test: ['algo-recursion-output-001', 'algo-tree-004'],
      },
      {
        id: 'call-tree',
        title: { ru: 'Дерево вызовов', en: 'The call tree' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Если функция вызывает себя дважды, вызовы образуют дерево. У наивных чисел Фибоначчи `fib(n - 1) + fib(n - 2)` одни и те же значения считаются снова и снова, и число вызовов растёт экспоненциально — примерно в 1,6 раза с каждым следующим n. Для `fib(30)` это больше миллиона вызовов. Лечится это мемоизацией — о ней урок про динамическое программирование.',
              en: 'If a function calls itself twice, the calls form a tree. With naive Fibonacci `fib(n - 1) + fib(n - 2)` the same values are computed over and over, and the call count grows exponentially — roughly 1.6 times with each next n. For `fib(30)` that’s over a million calls. Memoization cures it — see the dynamic programming lesson.',
            },
          },
        ],
        test: ['algo-rec-001'],
      },
      {
        id: 'stack-limits',
        title: { ru: 'Глубина и стек', en: 'Depth and the stack' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Каждый незавершённый вызов занимает кадр в стеке вызовов, а стек ограничен — в V8 это порядка десяти тысяч кадров для простой функции. Слишком глубокая рекурсия падает с `RangeError: Maximum call stack size exceeded`. Хвостовые вызовы (`return f(n - 1)`) по стандарту ES2015 могли бы переиспользовать кадр, но в V8 это не реализовано — оптимизация есть только в Safari. Глубокую рекурсию переписывают на цикл или явный стек.',
              en: 'Every unfinished call takes a frame on the call stack, and the stack is limited — in V8 about ten thousand frames for a simple function. Recursion that’s too deep fails with `RangeError: Maximum call stack size exceeded`. Tail calls (`return f(n - 1)`) could reuse the frame per ES2015, but V8 doesn’t implement them — only Safari does. Deep recursion is rewritten as a loop or an explicit stack.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'deep-recursion',
              prompt: {
                ru: 'Обход дерева глубиной в миллион узлов падает с `RangeError`. Что сделать?',
                en: 'Walking a tree a million nodes deep fails with `RangeError`. What do you do?',
              },
              options: [
                { text: { ru: 'Переписать на цикл с явным стеком', en: 'Rewrite it as a loop with an explicit stack' } },
                { text: { ru: 'Добавить `\'use strict\'` для хвостовых вызовов', en: 'Add `\'use strict\'` for tail calls' } },
                { text: { ru: 'Обернуть вызов в `try/catch`', en: 'Wrap the call in `try/catch`' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Явный стек живёт в куче и ограничен только памятью. Хвостовые вызовы в V8 не оптимизируются даже в строгом режиме.',
                en: 'An explicit stack lives on the heap and is limited only by memory. V8 doesn’t optimize tail calls even in strict mode.',
              },
            },
          },
        ],
        test: ['algo-rec-003', 'algo-rec-004'],
      },
      {
        id: 'combinatorics',
        title: { ru: 'Перебор вариантов', en: 'Enumerating options' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Рекурсия естественно перебирает варианты. **Подмножества**: каждое либо содержит первый элемент, либо нет, поэтому их вдвое больше, чем подмножеств остальных, — всего `2^n`, включая пустое. **Перестановки**: зафиксировать первый символ и переставить остальные — их `n!`. Базовый случай — пустой набор или один символ. Такой перебор экспоненциален и годится только для маленьких n.',
              en: 'Recursion naturally enumerates options. **Subsets**: each one either contains the first element or not, so there are twice as many as subsets of the rest — `2^n` in total, the empty one included. **Permutations**: fix the first character and permute the rest — there are `n!`. The base case is an empty set or a single character. Such enumeration is exponential and fits only small n.',
            },
          },
        ],
        test: ['algo-rec-subsets-001'],
      },
    ],
    keyPoints: [
      { ru: 'Базовый случай + шаг к меньшей задаче.', en: 'A base case + a step to a smaller problem.' },
      { ru: 'Двойной вызов — экспоненциальное дерево.', en: 'A double call makes an exponential tree.' },
      { ru: 'Глубокая рекурсия — `RangeError`, хвостовых вызовов в V8 нет.', en: 'Deep recursion means `RangeError`; V8 has no tail calls.' },
      { ru: 'Подмножеств `2^n`, перестановок `n!`.', en: '`2^n` subsets, `n!` permutations.' },
    ],
    sources: [
      { title: 'MDN — Recursion', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion' },
      { title: 'MDN — RangeError', url: `${MDN_JS}/RangeError` },
      { title: 'Wikipedia — Recursion (computer science)', url: `${WIKI}/Recursion_(computer_science)` },
    ],
  },
  {
    tag: 'two-pointers',
    format: 'steps',
    summary: {
      ru: 'Два указателя и скользящее окно превращают вложенные циклы `O(n²)` в один проход `O(n)`. Разберём встречные указатели, окна фиксированной и переменной длины и «черепаху и зайца».',
      en: 'Two pointers and a sliding window turn `O(n²)` nested loops into one `O(n)` pass. We’ll cover pointers moving toward each other, fixed and variable windows, and the “tortoise and hare”.',
    },
    steps: [
      {
        id: 'opposite',
        title: { ru: 'Встречные указатели', en: 'Pointers moving inward' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Один указатель идёт с начала, другой с конца, и они сходятся. Так проверяют палиндром: сравнивают пары символов снаружи внутрь. Так же ищут пару с заданной суммой в **отсортированном** массиве: если сумма меньше цели, двигают левый указатель к большим числам, если больше — правый к меньшим. Каждый шаг отбрасывает один элемент, поэтому весь проход — `O(n)`.',
              en: 'One pointer starts at the beginning, the other at the end, and they converge. That’s how a palindrome is checked: compare character pairs from the outside in. The same finds a pair with a given sum in a **sorted** array: if the sum is too small, move the left pointer toward bigger numbers; if too big, move the right one toward smaller. Each step discards one element, so the whole pass is `O(n)`.',
            },
          },
        ],
        test: ['algo-tp-001', 'algo-tp-002'],
      },
      {
        id: 'sliding-window',
        title: { ru: 'Скользящее окно', en: 'The sliding window' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Скользящее окно** фиксированной длины k: сумму первого окна считают один раз, а при сдвиге добавляют вошедший элемент и вычитают вышедший. Вместо `O(n · k)` получается `O(n)`. Так считают максимальную сумму k подряд идущих чисел, скользящее среднее, число событий за последние 5 минут.',
              en: 'A **sliding window** of fixed length k: compute the first window’s sum once, and when sliding, add the entering element and subtract the leaving one. Instead of `O(n · k)` you get `O(n)`. That’s how you compute the max sum of k consecutive numbers, a moving average, the number of events in the last 5 minutes.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'let sum = 0;\nfor (let i = 0; i < k; i++) sum += a[i];\nlet best = sum;\nfor (let i = k; i < a.length; i++) {\n  sum += a[i] - a[i - k];\n  best = Math.max(best, sum);\n}',
            },
          },
        ],
        test: ['algo-tp-003'],
      },
      {
        id: 'variable-window',
        title: { ru: 'Окно переменной длины', en: 'A variable-length window' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Окно `[start, end]` может расширяться и сжиматься. Задача «самая длинная подстрока без повторов»: `end` идёт вперёд, `Map` хранит последнюю позицию каждого символа. Встретили символ, который уже внутри окна, — `start` прыгает за его прошлую позицию. Ловушка: прошлая позиция может лежать **левее** окна, и `start` нельзя сдвигать назад — берут `Math.max(start, last + 1)`.',
              en: 'A `[start, end]` window can grow and shrink. For “the longest substring without repeats”: `end` moves forward, and a `Map` keeps each character’s last position. On meeting a character already inside the window, `start` jumps past its previous position. The trap: that position may be **left of** the window, and `start` must never move back — use `Math.max(start, last + 1)`.',
            },
          },
        ],
        test: ['algo-tp-window-bug-001'],
      },
      {
        id: 'fast-slow',
        title: { ru: 'Черепаха и заяц', en: 'Tortoise and hare' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Алгоритм Флойда ищет цикл в связном списке без дополнительной памяти: медленный указатель шагает по одному узлу, быстрый — по два. Если цикла нет, быстрый упрётся в `null`. Если есть, оба зайдут в кольцо, и быстрый догонит медленного — указатели совпадут. Время `O(n)`, память `O(1)` — в отличие от `Set` посещённых узлов.',
              en: 'Floyd’s algorithm finds a cycle in a linked list with no extra memory: the slow pointer moves one node at a time, the fast one two. Without a cycle the fast one hits `null`. With one, both enter the ring and the fast one catches up — the pointers meet. `O(n)` time and `O(1)` memory — unlike a `Set` of visited nodes.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'floyd-memory',
              prompt: {
                ru: 'Чем алгоритм Флойда лучше хранения посещённых узлов в `Set`?',
                en: 'How is Floyd’s algorithm better than storing visited nodes in a `Set`?',
              },
              options: [
                { text: { ru: 'Он быстрее в `O`-нотации', en: 'It’s faster in Big-O terms' } },
                { text: { ru: 'Ему нужна `O(1)` памяти вместо `O(n)`', en: 'It needs `O(1)` memory instead of `O(n)`' } },
                { text: { ru: 'Он работает только на отсортированных списках', en: 'It only works on sorted lists' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Оба способа линейны по времени, но `Set` хранит до n узлов, а Флойду хватает двух указателей.',
                en: 'Both are linear in time, but a `Set` stores up to n nodes, while Floyd needs just two pointers.',
              },
            },
          },
        ],
        test: ['algo-tp-005'],
      },
    ],
    keyPoints: [
      { ru: 'Встречные указатели — по отсортированным данным.', en: 'Inward pointers work on sorted data.' },
      { ru: 'Окно: прибавить вошедший, вычесть вышедший.', en: 'Window: add the incoming, subtract the outgoing.' },
      { ru: '`start` окна не двигается назад.', en: 'A window’s `start` never moves back.' },
      { ru: 'Цикл в списке — быстрый и медленный указатели.', en: 'A list cycle — fast and slow pointers.' },
    ],
    sources: [
      { title: 'Wikipedia — Palindrome', url: `${WIKI}/Palindrome` },
      { title: 'Wikipedia — Cycle detection', url: `${WIKI}/Cycle_detection` },
      { title: 'Wikipedia — Merge algorithm', url: `${WIKI}/Merge_algorithm` },
    ],
  },
  {
    tag: 'hashing',
    format: 'steps',
    summary: {
      ru: 'Хэш-таблица — `Map` и `Set` в JavaScript — превращает поиск за `O(n)` в поиск почти за `O(1)`. На этом построены десятки задач собеседований: найти пару, посчитать частоты, сгруппировать.',
      en: 'A hash table — `Map` and `Set` in JavaScript — turns an `O(n)` lookup into a nearly `O(1)` one. Dozens of interview problems rest on it: find a pair, count frequencies, group.',
    },
    steps: [
      {
        id: 'map-set',
        title: { ru: 'Map и Set вместо поиска', en: 'Map and Set instead of searching' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`includes` и `indexOf` ищут линейно — `O(n)`. Если такой поиск стоит внутри цикла, получается `O(n · m)` или `O(n²)`. `Set.prototype.has` и `Map.prototype.get` в среднем работают почти за `O(1)`: в движках это хэш-таблицы. Поэтому типовой приём — один раз сложить данные в `Set` или `Map`, а потом проверять наличие. `[...new Set(items)]` удаляет дубликаты за `O(n)` и сохраняет порядок первого появления.',
              en: '`includes` and `indexOf` search linearly — `O(n)`. Inside a loop that becomes `O(n · m)` or `O(n²)`. `Set.prototype.has` and `Map.prototype.get` run in nearly `O(1)` on average: engines implement them as hash tables. So the standard trick is to put the data into a `Set` or `Map` once, then check membership. `[...new Set(items)]` removes duplicates in `O(n)` and keeps first-occurrence order.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const banned = new Set(blockedIds);\nconst visible = posts.filter(\n  (post) => !banned.has(post.author),\n);',
            },
          },
        ],
        test: ['algo-big-o-003', 'algo-hash-004'],
      },
      {
        id: 'complement',
        title: { ru: 'Поиск дополнения', en: 'Looking up the complement' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Задача «найти два числа с суммой target» решается за один проход. Для каждого числа x считают, какое число ему нужно в пару: `target - x`. Если оно уже встречалось — в `Map` лежит его индекс, и ответ найден. Если нет — кладут в `Map` само x с его индексом. Важно проверять **до** добавления текущего числа, иначе x найдёт пару с самим собой.',
              en: 'The “find two numbers that sum to target” problem is solved in one pass. For each number x compute the partner it needs: `target - x`. If that number was seen before — its index is in the `Map`, and the answer is found. If not — store x itself with its index in the `Map`. Check **before** adding the current number, or x will pair with itself.',
            },
          },
        ],
        test: ['algo-hash-001'],
      },
      {
        id: 'counting',
        title: { ru: 'Подсчёт частот', en: 'Counting frequencies' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Частоты считают одним проходом: `counts.set(x, (counts.get(x) ?? 0) + 1)`. Второй проход по исходным данным находит, например, первый символ с частотой 1. Анаграммы — это строки с одинаковым **количеством** каждого символа. Проверка «каждая буква есть в другой строке» или через `Set` теряет количество: `"aab"` и `"abb"` она посчитает анаграммами.',
              en: 'Frequencies are counted in one pass: `counts.set(x, (counts.get(x) ?? 0) + 1)`. A second pass over the original data finds, say, the first character with frequency 1. Anagrams are strings with the same **count** of every character. Checking “every letter is in the other string” or using a `Set` loses counts: it would call `"aab"` and `"abb"` anagrams.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const counts = new Map();\nfor (const word of words) {\n  counts.set(\n    word,\n    (counts.get(word) ?? 0) + 1,\n  );\n}',
            },
          },
        ],
        test: ['algo-hash-003'],
      },
      {
        id: 'grouping',
        title: { ru: 'Группировка по ключу', en: 'Grouping by key' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Чтобы сгруппировать элементы, для каждого вычисляют **ключ группы** и складывают элемент в массив по этому ключу. Для анаграмм ключ — буквы слова в отсортированном порядке, для заказов — дата или статус. Хэш-таблица собирает группы за один проход, а `Map` сохраняет порядок появления групп. Для простых случаев есть встроенный `Map.groupBy`.',
              en: 'To group elements, compute a **group key** for each and put the element into an array under that key. For anagrams the key is the word’s letters in sorted order; for orders, a date or status. A hash table builds the groups in one pass, and `Map` keeps the order in which groups appear. Simple cases have the built-in `Map.groupBy`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'group-key',
              prompt: {
                ru: 'Какой ключ сгруппирует слова `"stop"`, `"pots"`, `"tops"` вместе?',
                en: 'Which key groups `"stop"`, `"pots"`, `"tops"` together?',
              },
              options: [
                { text: { ru: 'Длина слова', en: 'The word’s length' } },
                { text: { ru: 'Буквы слова в отсортированном порядке: `"opst"`', en: 'The word’s letters sorted: `"opst"`' } },
                { text: { ru: 'Первая буква', en: 'The first letter' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Длина совпадёт и у не-анаграмм, первая буква разная. Отсортированные буквы одинаковы ровно у анаграмм.',
                en: 'Length matches non-anagrams too, and first letters differ. Sorted letters are identical exactly for anagrams.',
              },
            },
          },
        ],
        test: ['algo-hash-group-anagrams-001'],
      },
    ],
    keyPoints: [
      { ru: '`Set`/`Map` — поиск почти за `O(1)`.', en: '`Set`/`Map` give nearly `O(1)` lookup.' },
      { ru: 'Пара с суммой — ищем дополнение в `Map`.', en: 'A pair with a sum — look up the complement in a `Map`.' },
      { ru: 'Анаграммы — равные количества букв.', en: 'Anagrams — equal letter counts.' },
      { ru: 'Группировка — ключ + один проход.', en: 'Grouping — a key + one pass.' },
    ],
    sources: [
      { title: 'Wikipedia — Hash table', url: `${WIKI}/Hash_table` },
      { title: 'MDN — Map', url: `${MDN_JS}/Map` },
      { title: 'MDN — Set', url: `${MDN_JS}/Set` },
      { title: 'MDN — Map.groupBy()', url: `${MDN_JS}/Map/groupBy` },
    ],
  },
  {
    tag: 'trees-graphs',
    format: 'steps',
    summary: {
      ru: 'Деревья и графы во фронтенде повсюду: DOM, дерево компонентов, зависимости модулей, маршруты. Разберём обходы, деревья поиска, кратчайшие пути, сортировку зависимостей и то, как React сравнивает деревья.',
      en: 'Trees and graphs are everywhere on the frontend: the DOM, the component tree, module dependencies, routes. We’ll cover traversals, search trees, shortest paths, dependency ordering and how React compares trees.',
    },
    steps: [
      {
        id: 'traversal',
        title: { ru: 'В глубину и в ширину', en: 'Depth-first and breadth-first' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Обход **в глубину** (DFS) идёт рекурсией или стеком: спускается по ветке до конца и только потом переходит к соседу. Обход **в ширину** (BFS) использует очередь: сначала корень, потом весь первый уровень, потом второй. DOM определяет порядок документа как прямой обход в глубину — элемент, его потомки, затем сосед; в этом порядке `querySelectorAll` возвращает элементы.',
              en: '**Depth-first** traversal (DFS) uses recursion or a stack: it goes down a branch to the end and only then moves to the sibling. **Breadth-first** (BFS) uses a queue: the root first, then the whole first level, then the second. The DOM defines document order as a pre-order depth-first walk — an element, its descendants, then its sibling; `querySelectorAll` returns elements in that order.',
            },
          },
          { type: 'diagram', diagram: 'algo-dom-traversal' },
        ],
        test: ['algo-tree-001', 'algo-tree-002'],
      },
      {
        id: 'depth-bst',
        title: { ru: 'Глубина и деревья поиска', en: 'Depth and search trees' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Глубину дерева считают рекурсивно: 1 плюс максимальная глубина детей. В **бинарном дереве поиска** меньшие значения уходят влево, большие — вправо, и поиск идёт по одной ветке — за `O(высоты)`. В сбалансированном дереве это `O(log n)`. Но если вставлять уже отсортированные числа, каждое уходит вправо, и дерево вырождается в цепочку — поиск становится `O(n)`. Поэтому на практике используют самобалансирующиеся деревья.',
              en: 'A tree’s depth is computed recursively: 1 plus the maximum depth of its children. In a **binary search tree** smaller values go left and larger go right, so a search follows one branch — `O(height)`. In a balanced tree that’s `O(log n)`. But insert already sorted numbers and each one goes right, so the tree degenerates into a chain — search becomes `O(n)`. That’s why self-balancing trees are used in practice.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: 'const height = (node) =>\n  node === null\n    ? 0\n    : 1 + Math.max(\n        height(node.left),\n        height(node.right),\n      );',
            },
          },
        ],
        test: ['algo-tree-depth-001', 'algo-tree-003'],
      },
      {
        id: 'shortest-path',
        title: { ru: 'Кратчайший путь', en: 'Shortest path' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'BFS обходит граф «волнами»: сначала все вершины на расстоянии 1, потом 2 и так далее. Поэтому первая встреча с целью — кратчайший путь по числу рёбер, а множество посещённых не даёт ходить по кругу. Если у рёбер разный вес — километры, секунды, — BFS не годится: путь из двух длинных дорог может быть хуже пути из пяти коротких. Тогда нужен алгоритм Дейкстры с очередью с приоритетом (при неотрицательных весах).',
              en: 'BFS explores a graph in “waves”: first all vertices at distance 1, then 2 and so on. So the first time it reaches the goal is the shortest path by edge count, and a visited set prevents going in circles. If edges have different weights — kilometers, seconds — BFS won’t do: two long roads can be worse than five short ones. Then you need Dijkstra’s algorithm with a priority queue (for non-negative weights).',
            },
          },
          {
            type: 'check',
            check: {
              id: 'bfs-shortest',
              prompt: {
                ru: 'Почему BFS находит кратчайший путь в графе без весов?',
                en: 'Why does BFS find the shortest path in an unweighted graph?',
              },
              options: [
                { text: { ru: 'Он посещает вершины в порядке роста расстояния от старта', en: 'It visits vertices in order of increasing distance from the start' } },
                { text: { ru: 'Он перебирает все пути', en: 'It tries every path' } },
                { text: { ru: 'Он идёт по самым коротким рёбрам', en: 'It follows the shortest edges' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Очередь гарантирует, что все вершины на расстоянии k обработаны раньше вершин на расстоянии k + 1.',
                en: 'The queue guarantees all vertices at distance k are processed before those at distance k + 1.',
              },
            },
          },
        ],
        test: ['algo-graph-bfs-001'],
      },
      {
        id: 'dependencies',
        title: { ru: 'Зависимости и циклы', en: 'Dependencies and cycles' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Топологическая сортировка** выстраивает задачи так, чтобы каждая шла после своих зависимостей: так работают сборщики и менеджеры пакетов. Алгоритм Кана берёт задачи без невыполненных зависимостей, «выполняет» их и уменьшает счётчики у зависящих задач. Цикл зависимостей ищут обходом в глубину с тремя состояниями: не посещён, «в обработке», готов. Встретили узел «в обработке» — значит, вернулись по кругу.',
              en: '**Topological sorting** orders tasks so each comes after its dependencies: build tools and package managers work this way. Kahn’s algorithm takes tasks with no unmet dependencies, “runs” them and decrements the counters of dependent tasks. A dependency cycle is found by a depth-first walk with three states: unvisited, “in progress”, done. Meeting an “in progress” node means you’ve come back around.',
            },
          },
        ],
        test: ['algo-graph-topo-001'],
      },
      {
        id: 'react-diff',
        title: { ru: 'Как React сравнивает деревья', en: 'How React compares trees' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Точное сравнение двух произвольных деревьев стоит `O(n³)`. React сравнивает деревья элементов за `O(n)` благодаря эвристикам. Узлы сравниваются уровень за уровнем; другой тип элемента — значит новое поддерево, и старое удаляется вместе с состоянием; дети списка сопоставляются по `key`. Поэтому стабильные ключи важны и для скорости, и для сохранности состояния.',
              en: 'An exact comparison of two arbitrary trees costs `O(n³)`. React compares element trees in `O(n)` thanks to heuristics. Nodes are compared level by level; a different element type means a new subtree, and the old one is removed along with its state; list children are matched by `key`. So stable keys matter for both speed and preserving state.',
            },
          },
        ],
        test: ['algo-tree-005'],
      },
    ],
    keyPoints: [
      { ru: 'DFS — стек или рекурсия, BFS — очередь.', en: 'DFS uses a stack or recursion; BFS a queue.' },
      { ru: 'Отсортированные вставки вырождают BST в цепочку.', en: 'Sorted inserts degrade a BST into a chain.' },
      { ru: 'BFS — по числу рёбер, Дейкстра — по весам.', en: 'BFS counts edges; Dijkstra uses weights.' },
      { ru: 'Зависимости — топологическая сортировка, цикл — DFS с состояниями.', en: 'Dependencies — topological sort; cycles — DFS with states.' },
    ],
    sources: [
      { title: 'Wikipedia — Breadth-first search', url: `${WIKI}/Breadth-first_search` },
      { title: 'Wikipedia — Depth-first search', url: `${WIKI}/Depth-first_search` },
      { title: 'Wikipedia — Binary search tree', url: `${WIKI}/Binary_search_tree` },
      { title: 'Wikipedia — Topological sorting', url: `${WIKI}/Topological_sorting` },
    ],
  },
  {
    tag: 'dynamic-programming',
    format: 'steps',
    summary: {
      ru: 'Динамическое программирование — это перебор, который не повторяет работу: ответы на подзадачи запоминаются и переиспользуются. Разберём, когда оно применимо и как построить решение.',
      en: 'Dynamic programming is enumeration that doesn’t repeat work: answers to subproblems are remembered and reused. We’ll see when it applies and how to build a solution.',
    },
    steps: [
      {
        id: 'overlapping',
        title: { ru: 'Перекрывающиеся подзадачи', en: 'Overlapping subproblems' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Динамику применяют, когда задача распадается на **перекрывающиеся подзадачи**: одни и те же значения нужны много раз. Наивная рекурсия пересчитывает их заново, и число вызовов растёт экспоненциально. **Мемоизация** запоминает результат по аргументам: первый вызов считает и кладёт в кэш, повторный сразу берёт готовое. Число вызовов становится линейным.',
              en: 'Dynamic programming applies when a problem breaks into **overlapping subproblems**: the same values are needed many times. Naive recursion recomputes them, and the call count grows exponentially. **Memoization** remembers results by argument: the first call computes and caches, a repeated one takes the ready value at once. The call count becomes linear.',
            },
          },
          { type: 'diagram', diagram: 'algo-fib-memo' },
          {
            type: 'check',
            check: {
              id: 'memo-once',
              prompt: {
                ru: 'Сколько раз вычисляется `fib(3)` при вызове `fib(10)` с мемоизацией?',
                en: 'How many times is `fib(3)` computed when calling `fib(10)` with memoization?',
              },
              options: [
                { text: { ru: 'Один раз', en: 'Once' } },
                { text: { ru: 'Столько же, сколько без мемоизации', en: 'As many times as without memoization' } },
                { text: { ru: 'Ни разу', en: 'Never' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Первый вызов считает значение и кладёт в кэш, все следующие достают его без вычислений.',
                en: 'The first call computes and caches the value; all later ones read it without computing.',
              },
            },
          },
        ],
        test: ['algo-rec-002', 'algo-rec-fib-calls-001'],
      },
      {
        id: 'memo-vs-tab',
        title: { ru: 'Сверху вниз или снизу вверх', en: 'Top-down or bottom-up' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Мемоизация** — сверху вниз: рекурсивная формула плюс кэш. Удобно, когда нужны не все подзадачи, но глубина рекурсии равна размеру задачи, и на больших n можно получить `RangeError`. **Табуляция** — снизу вверх: цикл заполняет таблицу от маленьких подзадач к большим, стек не растёт. Если для следующего шага нужны только последние значения, память сжимается до пары переменных.',
              en: '**Memoization** is top-down: a recursive formula plus a cache. Handy when not all subproblems are needed, but recursion depth equals the problem size, and large n can hit `RangeError`. **Tabulation** is bottom-up: a loop fills a table from small subproblems to large ones, and the stack doesn’t grow. If the next step needs only the latest values, memory shrinks to a couple of variables.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: '// best loot, no two adjacent houses\nfunction maxLoot(houses) {\n  let prev = 0;\n  let best = 0;\n  for (const value of houses) {\n    const take = prev + value;\n    prev = best;\n    best = Math.max(best, take);\n  }\n  return best;\n}\nmaxLoot([2, 7, 9, 3, 1]); // 12',
            },
          },
        ],
        test: ['algo-dp-002'],
      },
      {
        id: 'recurrence',
        title: { ru: 'Рекуррентная формула', en: 'The recurrence' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ключ к динамике — **рекуррентная формула**: как ответ для n выражается через ответы для меньших n. Например, на n-ю ступеньку можно попасть с n−1 шагом в одну ступеньку или с n−2 шагом в две, значит число способов — сумма двух предыдущих ответов. Дальше остаётся задать базовые значения и порядок вычисления.',
              en: 'The key to dynamic programming is the **recurrence**: how the answer for n is expressed through answers for smaller n. For example, step n can be reached from n−1 with a one-step move or from n−2 with a two-step move, so the number of ways is the sum of the two previous answers. Then you only set the base values and the computation order.',
            },
          },
        ],
        test: ['algo-dp-001'],
      },
      {
        id: 'tables',
        title: { ru: 'Таблицы ответов', en: 'Tables of answers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Жадный выбор «сначала самое крупное» работает не всегда: для монет `[1, 5, 6, 9]` и суммы 11 он даст `9 + 1 + 1`, а оптимум — `5 + 6`. Динамика считает ответ для **всех** сумм от 0 до нужной: `best[s]` — минимум из `best[s - coin] + 1` по всем монетам, а недостижимые суммы остаются `Infinity`. Двумерные задачи хранят таблицу: для наибольшей общей подпоследовательности двух строк ячейка `[i][j]` — ответ для их префиксов.',
              en: 'The greedy “largest first” choice doesn’t always work: for coins `[1, 5, 6, 9]` and amount 11 it gives `9 + 1 + 1`, while the optimum is `5 + 6`. DP computes the answer for **every** amount from 0 up: `best[s]` is the minimum of `best[s - coin] + 1` over all coins, and unreachable amounts stay `Infinity`. Two-dimensional problems keep a table: for the longest common subsequence of two strings, cell `[i][j]` is the answer for their prefixes.',
            },
          },
        ],
        test: ['algo-dp-coins-001'],
      },
    ],
    keyPoints: [
      { ru: 'Динамика — когда подзадачи повторяются.', en: 'DP is for repeating subproblems.' },
      { ru: 'Мемоизация — рекурсия с кэшем, табуляция — цикл.', en: 'Memoization is recursion with a cache; tabulation is a loop.' },
      { ru: 'Сначала рекуррентная формула, потом код.', en: 'First the recurrence, then the code.' },
      { ru: 'Жадность не всегда оптимальна — считать все подзадачи.', en: 'Greedy isn’t always optimal — compute all subproblems.' },
    ],
    sources: [
      { title: 'Wikipedia — Dynamic programming', url: `${WIKI}/Dynamic_programming` },
      { title: 'Wikipedia — Memoization', url: `${WIKI}/Memoization` },
      { title: 'Wikipedia — Longest common subsequence', url: `${WIKI}/Longest_common_subsequence` },
    ],
  },
];
