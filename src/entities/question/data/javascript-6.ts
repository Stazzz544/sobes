import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects';
const MDN_API = 'https://developer.mozilla.org/en-US/docs/Web/API';

const EMITTER = `class Emitter {
  constructor() {
    this.listeners = {};
  }
  on(event, listener) {
    (this.listeners[event] ??= []).push(listener);
  }
  off(event, listener) {
    this.listeners[event] = (this.listeners[event] ?? []).filter((item) => item !== listener);
  }
  emit(event, ...args) {
    [...(this.listeners[event] ?? [])].forEach((listener) => listener(...args));
  }
}`;

export const JAVASCRIPT_QUESTIONS_6: Question[] = [
  {
    id: 'js-live-debounce-001',
    topic: 'javascript',
    tags: ['live-coding', 'closures'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какая реализация `debounce` вызовет функцию один раз — с последними аргументами — после паузы во вводе?',
      en: 'Which `debounce` implementation calls the function once — with the latest arguments — after typing pauses?',
    },
    options: [
      {
        code: `function debounce(fn, ms) {
  let timer;
  return (...args) => {
    timer = setTimeout(() => fn(...args), ms);
  };
}`,
      },
      {
        code: `function debounce(fn, ms) {
  return (...args) => {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}`,
      },
      {
        code: `function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}`,
      },
      {
        code: `function debounce(fn, ms) {
  let ready = true;
  return (...args) => {
    if (ready) {
      fn(...args);
      ready = false;
      setTimeout(() => (ready = true), ms);
    }
  };
}`,
      },
      {
        code: `function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}`,
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Таймер должен жить в [[closure|замыкании]] **снаружи** возвращаемой функции, чтобы каждый новый вызов отменял предыдущий через `clearTimeout`. Без отмены сработают все вызовы, с `let timer` внутри — тоже: у каждого вызова свой таймер. Вариант с флагом `ready` — это throttle с ведущим вызовом: он отработает на первой букве. А если не передать `...args`, функция получит `undefined`.',
          en: 'The timer must live in the [[closure|closure]] **outside** the returned function so each new call cancels the previous one via `clearTimeout`. Without cancelling, every call fires; with `let timer` inside, too: each call gets its own timer. The `ready` flag version is a leading-edge throttle: it fires on the first letter. And without passing `...args`, the function receives `undefined`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Debounce', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Debounce' }],
    verify: {
      kind: 'js-tests',
      tests: `const calls = [];
const search = debounce((query) => calls.push(query), 50);
search('r');
search('re');
search('rea');
await new Promise((resolve) => setTimeout(resolve, 150));
assert.deepEqual(calls, ['rea']);`,
    },
  },
  {
    id: 'js-live-promise-all-001',
    topic: 'javascript',
    tags: ['live-coding', 'promises'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Пишем свой `Promise.all`. Что поставить вместо `// ???`, чтобы результаты шли в порядке исходного массива?',
      en: 'We’re writing our own `Promise.all`. What replaces `// ???` so results come in the order of the input array?',
    },
    code: {
      lang: 'js',
      source: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (promises.length === 0) {
      resolve(results);
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {
        // ???
      }, reject);
    });
  });
}`,
    },
    options: [
      { code: 'results.push(value);\nif (results.length === promises.length) {\n  resolve(results);\n}' },
      { code: 'results[index] = value;\nif (results.length === promises.length) {\n  resolve(results);\n}' },
      { code: 'results[index] = value;\nresolve(results);' },
      { code: 'results[index] = value;\ndone++;\nif (done === promises.length) {\n  resolve(results);\n}' },
      { code: 'done++;\nif (done === promises.length) {\n  resolve(results);\n}' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Промисы завершаются в любом порядке, поэтому значение кладут по `index`, а готовность считают отдельным счётчиком. `push` складывает в порядке завершения. Проверка `results.length` обманывает: если последний промис завершился первым, `results[2] = …` сразу делает длину 3, и массив с дырами уходит раньше времени.',
          en: 'Promises settle in any order, so the value goes in at `index`, and completion is tracked by a separate counter. `push` stores in completion order. Checking `results.length` is a trap: if the last promise settles first, `results[2] = …` instantly makes the length 3, and an array with holes resolves too early.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Остальное в каркасе тоже важно: пустой массив должен сразу дать `[]`, `Promise.resolve` позволяет передавать обычные значения, а `reject` срабатывает на первой же ошибке.',
          en: 'The rest of the skeleton matters too: an empty array must yield `[]` right away, `Promise.resolve` allows plain values, and `reject` fires on the very first error.',
        },
      },
    ],
    sources: [{ title: 'MDN — Promise.all()', url: `${MDN}/Promise/all` }],
    verify: {
      kind: 'js-tests',
      before: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    if (promises.length === 0) {
      resolve(results);
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((value) => {`,
      after: `      }, reject);
    });
  });
}`,
      tests: `const delay = (value, ms) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
assert.deepEqual(await promiseAll([delay('a', 30), delay('b', 10), 'c']), ['a', 'b', 'c']);
assert.deepEqual(await promiseAll([]), []);
await assert.rejects(promiseAll([delay('a', 10), Promise.reject(new Error('boom'))]), /boom/);`,
    },
  },
  {
    id: 'js-live-flatten-001',
    topic: 'javascript',
    tags: ['live-coding', 'arrays'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какая реализация `flatten` разворачивает массив любой вложенности и не трогает объекты внутри?',
      en: 'Which `flatten` implementation unwraps an array of any depth and leaves objects inside intact?',
    },
    options: [
      { code: 'function flatten(array) {\n  return array.flat();\n}' },
      {
        code: `function flatten(array) {
  return array.reduce(
    (result, item) => result.concat(Array.isArray(item) ? flatten(item) : item),
    [],
  );
}`,
      },
      {
        code: `function flatten(array) {
  return array.reduce(
    (result, item) => result.concat(typeof item === 'object' ? flatten(item) : item),
    [],
  );
}`,
      },
      { code: "function flatten(array) {\n  return array.toString().split(',');\n}" },
      { code: 'function flatten(array) {\n  return [].concat(...array);\n}' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Рекурсия по `Array.isArray`: массивы разворачиваем, всё остальное кладём как есть. `typeof item === \'object\'` ошибочно считает массивом и объект, и `null`. `flat()` и `[].concat(...array)` снимают только один уровень, а `toString` превращает всё в строки. В реальном коде есть готовое `array.flat(Infinity)` — на собеседовании его стоит назвать, а потом написать рекурсию.',
          en: 'Recurse on `Array.isArray`: unwrap arrays, keep everything else as is. `typeof item === \'object\'` wrongly treats objects and `null` as arrays. `flat()` and `[].concat(...array)` remove only one level, and `toString` turns everything into strings. Real code has `array.flat(Infinity)` — mention it in the interview, then write the recursion.',
        },
      },
    ],
    sources: [{ title: 'MDN — Array.prototype.flat()', url: `${MDN}/Array/flat` }],
    verify: {
      kind: 'js-tests',
      tests: `assert.deepEqual(flatten([1, [2, [3, [4]], 5]]), [1, 2, 3, 4, 5]);
assert.deepEqual(flatten([]), []);
assert.deepEqual(flatten([['a'], [{ x: 1 }]]), ['a', { x: 1 }]);`,
    },
  },
  {
    id: 'js-live-curry-001',
    kind: 'order',
    topic: 'javascript',
    tags: ['live-coding', 'closures'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Соберите тело `curried`, чтобы `sum(1)(2)(3)`, `sum(1, 2)(3)` и `sum(1, 2, 3)` давали 6.',
      en: 'Assemble the body of `curried` so that `sum(1)(2)(3)`, `sum(1, 2)(3)` and `sum(1, 2, 3)` all return 6.',
    },
    code: {
      lang: 'js',
      source: `function curry(fn) {
  return function curried(...args) {
    // ???
  };
}

const sum = curry((a, b, c) => a + b + c);`,
    },
    items: [
      { code: 'if (args.length >= fn.length) {' },
      { code: 'return fn(...args);' },
      { code: '}' },
      { code: 'return (...rest) => curried(...args, ...rest);' },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`fn.length` — число объявленных параметров. Если аргументов набралось достаточно, вызываем исходную функцию. Иначе возвращаем новую функцию, которая запомнила уже переданные `args` в [[closure|замыкании]] и добавит к ним следующие. Рекурсивный вызов `curried` позволяет передавать аргументы любыми порциями.',
          en: '`fn.length` is the number of declared parameters. If enough arguments have arrived, call the original function. Otherwise return a new function that remembers the `args` passed so far in a [[closure|closure]] and appends the next ones. The recursive `curried` call allows passing arguments in any batches.',
        },
      },
    ],
    sources: [{ title: 'MDN — Function: length', url: `${MDN}/Function/length` }],
    verify: {
      kind: 'js-tests',
      before: 'function curry(fn) {\n  return function curried(...args) {',
      after: '  };\n}',
      tests: `const sum = curry((a, b, c) => a + b + c);
assert.equal(sum(1)(2)(3), 6);
assert.equal(sum(1, 2)(3), 6);
assert.equal(sum(1)(2, 3), 6);
assert.equal(sum(1, 2, 3), 6);`,
    },
  },
  {
    id: 'js-live-lru-001',
    kind: 'bug-line',
    topic: 'javascript',
    tags: ['live-coding', 'collections'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'LRU-кеш на 2 элемента должен вытеснять тот ключ, к которому дольше всего не обращались. В какой строке ошибка?',
      en: 'A 2-item LRU cache must evict the key that was used least recently. Which line has the bug?',
    },
    code: {
      lang: 'js',
      source: `class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) {
      return undefined;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  set(key, value) {
    this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.limit) {
      const oldest = [...this.cache.keys()].pop();
      this.cache.delete(oldest);
    }
  }
}`,
    },
    answerLine: 19,
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Map` помнит порядок вставки, и на этом держится решение: при каждом обращении ключ удаляют и вставляют заново — он становится самым свежим. Значит, самый старый ключ — **первый**, а `pop()` берёт последний, то есть только что добавленный. Правильно: `this.cache.keys().next().value`. Все операции — O(1).',
          en: '`Map` remembers insertion order, and the solution relies on it: on every access the key is deleted and re-inserted — it becomes the freshest. So the oldest key is the **first** one, while `pop()` takes the last, i.e. the one just added. Correct: `this.cache.keys().next().value`. All operations are O(1).',
        },
      },
    ],
    sources: [{ title: 'MDN — Map', url: `${MDN}/Map` }],
    verify: {
      kind: 'js-tests',
      fixedLine: '      const oldest = this.cache.keys().next().value;',
      tests: `const cache = new LRUCache(2);
cache.set('a', 1);
cache.set('b', 2);
cache.get('a');
cache.set('c', 3);
assert.equal(cache.get('b'), undefined);
assert.equal(cache.get('a'), 1);
assert.equal(cache.get('c'), 3);`,
    },
  },
  {
    id: 'js-live-brackets-001',
    kind: 'bug-line',
    topic: 'javascript',
    tags: ['live-coding'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: '`isBalanced(\'((\')` возвращает `true`, хотя скобки не закрыты. В какой строке ошибка?',
      en: '`isBalanced(\'((\')` returns `true`, although the brackets aren’t closed. Which line has the bug?',
    },
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
  return true;
}`,
    },
    answerLine: 13,
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Классика на стек: открывающую скобку кладём, на закрывающей снимаем и сверяем пару. Но после цикла стек может быть не пуст — какие-то скобки так и не закрыли. Поэтому в конце нужно `return stack.length === 0`. Сложность O(n) по времени и памяти.',
          en: 'A classic stack task: push opening brackets, pop on a closing one and check the pair. But after the loop the stack may not be empty — some brackets were never closed. So the end must be `return stack.length === 0`. Complexity is O(n) in time and memory.',
        },
      },
    ],
    sources: [{ title: 'MDN — Array.prototype.pop()', url: `${MDN}/Array/pop` }],
    verify: {
      kind: 'js-tests',
      fixedLine: '  return stack.length === 0;',
      tests: `assert.equal(isBalanced('([]{})'), true);
assert.equal(isBalanced('(]'), false);
assert.equal(isBalanced('(('), false);
assert.equal(isBalanced(''), true);`,
    },
  },
  {
    id: 'js-live-memoize-001',
    topic: 'javascript',
    tags: ['live-coding', 'collections'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Какая версия `memoize` правильно кеширует функцию с несколькими аргументами-примитивами?',
      en: 'Which `memoize` version correctly caches a function with several primitive arguments?',
    },
    options: [
      {
        code: `function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = args[0];
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}`,
      },
      {
        code: `function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = args.join(',');
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}`,
      },
      {
        code: `function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    if (!cache.has(args)) {
      cache.set(args, fn(...args));
    }
    return cache.get(args);
  };
}`,
      },
      {
        code: `function memoize(fn) {
  return (...args) => {
    const cache = new Map();
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}`,
      },
      {
        code: `function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}`,
      },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ключ должен однозначно описывать **все** аргументы. `args[0]` путает `(1, 2)` и `(1, 3)`, `join` — `(1, 2)` и `(\'1,2\')`. Массив `args` новый при каждом вызове, поэтому `Map` с ним в качестве ключа никогда не находит запись. Кеш внутри возвращаемой функции создаётся заново каждый раз. `JSON.stringify(args)` различает типы и количество аргументов — для примитивов этого достаточно.',
          en: 'The key must uniquely describe **all** arguments. `args[0]` confuses `(1, 2)` and `(1, 3)`, `join` confuses `(1, 2)` and `(\'1,2\')`. The `args` array is new on every call, so a `Map` keyed by it never finds an entry. A cache inside the returned function is recreated each time. `JSON.stringify(args)` distinguishes types and argument count — enough for primitives.',
        },
      },
    ],
    sources: [{ title: 'MDN — Memoization', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Memoization' }],
    verify: {
      kind: 'js-tests',
      tests: `let calls = 0;
const joinParts = memoize((...parts) => {
  calls++;
  return parts.join('-');
});
assert.equal(joinParts(1, 2), '1-2');
assert.equal(joinParts(1, 3), '1-3');
assert.equal(joinParts('1,2'), '1,2');
assert.equal(joinParts(1, 2), '1-2');
assert.equal(calls, 3);`,
    },
  },
  {
    id: 'js-live-group-by-001',
    topic: 'javascript',
    tags: ['live-coding', 'arrays'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какая реализация `groupBy(items, getKey)` собирает элементы в объект по ключу?',
      en: 'Which `groupBy(items, getKey)` implementation collects items into an object by key?',
    },
    options: [
      {
        code: `function groupBy(items, getKey) {
  return items.reduce((groups, item) => {
    groups[getKey(item)] = [item];
    return groups;
  }, {});
}`,
      },
      {
        code: `function groupBy(items, getKey) {
  return items.reduce((groups, item) => {
    (groups[getKey(item)] ??= []).push(item);
    return groups;
  }, {});
}`,
      },
      {
        code: `function groupBy(items, getKey) {
  return items.reduce((groups, item) => {
    (groups[getKey(item)] ??= []).push(getKey(item));
    return groups;
  }, {});
}`,
      },
      {
        code: `function groupBy(items, getKey) {
  return items.map((item) => ({ [getKey(item)]: [item] }));
}`,
      },
      {
        code: `function groupBy(items, getKey) {
  return items.reduce((groups, item) => {
    (groups[getKey(item)] ??= []).push(item);
  }, {});
}`,
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`??=` создаёт массив для нового ключа, затем элемент добавляется в него. Присваивание `= [item]` затирает группу, `map` возвращает массив объектов, а без `return groups` на втором шаге аккумулятор становится `undefined`. В современном JS есть встроенный `Object.groupBy` — на собеседовании полезно о нём упомянуть.',
          en: '`??=` creates an array for a new key, then the item is pushed into it. Assigning `= [item]` overwrites the group, `map` returns an array of objects, and without `return groups` the accumulator becomes `undefined` on the second step. Modern JS has a built-in `Object.groupBy` — worth mentioning in the interview.',
        },
      },
    ],
    sources: [{ title: 'MDN — Object.groupBy()', url: `${MDN}/Object/groupBy` }],
    verify: {
      kind: 'js-tests',
      tests: `const items = [{ type: 'a', value: 1 }, { type: 'b', value: 2 }, { type: 'a', value: 3 }];
assert.deepEqual(groupBy(items, (item) => item.type), {
  a: [{ type: 'a', value: 1 }, { type: 'a', value: 3 }],
  b: [{ type: 'b', value: 2 }],
});`,
    },
  },
  {
    id: 'js-live-chunk-001',
    kind: 'bug-line',
    topic: 'javascript',
    tags: ['live-coding', 'arrays'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: '`chunk([1, 2, 3, 4, 5], 2)` должен вернуть `[[1, 2], [3, 4], [5]]`, а возвращает `[[1, 2], [], []]`. В какой строке ошибка?',
      en: '`chunk([1, 2, 3, 4, 5], 2)` should return `[[1, 2], [3, 4], [5]]` but returns `[[1, 2], [], []]`. Which line has the bug?',
    },
    code: {
      lang: 'js',
      source: `function chunk(array, size) {
  const result = [];
  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, size));
  }
  return result;
}`,
    },
    answerLine: 4,
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Второй аргумент `slice` — **индекс конца**, а не длина. На второй итерации получается `slice(2, 2)` — пустой массив. Нужно `array.slice(index, index + size)`. Похожая ловушка — `substring(start, end)` против устаревшего `substr(start, length)`.',
          en: 'The second argument of `slice` is the **end index**, not a length. On the second iteration that’s `slice(2, 2)` — an empty array. It should be `array.slice(index, index + size)`. A similar trap is `substring(start, end)` versus the legacy `substr(start, length)`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Array.prototype.slice()', url: `${MDN}/Array/slice` }],
    verify: {
      kind: 'js-tests',
      fixedLine: '    result.push(array.slice(index, index + size));',
      tests: `assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
assert.deepEqual(chunk([], 3), []);`,
    },
  },
  {
    id: 'js-live-once-001',
    topic: 'javascript',
    tags: ['live-coding', 'this'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Есть простой `Emitter`. Какая реализация `once` вызовет слушателя только при первом событии?',
      en: 'Here’s a simple `Emitter`. Which `once` implementation calls the listener only on the first event?',
    },
    code: { lang: 'js', source: EMITTER },
    options: [
      {
        code: `Emitter.prototype.once = function (event, listener) {
  this.on(event, listener);
};`,
      },
      {
        code: `Emitter.prototype.once = function (event, listener) {
  const wrapper = (...args) => {
    this.off(event, listener);
    listener(...args);
  };
  this.on(event, wrapper);
};`,
      },
      {
        code: `Emitter.prototype.once = function (event, listener) {
  const wrapper = (...args) => {
    this.off(event, wrapper);
    listener(...args);
  };
  this.on(event, wrapper);
};`,
      },
      {
        code: `Emitter.prototype.once = function (event, listener) {
  this.on(event, function wrapper(...args) {
    this.off(event, wrapper);
    listener(...args);
  });
};`,
      },
      {
        code: `Emitter.prototype.once = (event, listener) => {
  const wrapper = (...args) => {
    this.off(event, wrapper);
    listener(...args);
  };
  this.on(event, wrapper);
};`,
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Подписываем **обёртку**, и она первым делом отписывает саму себя. Отписка исходного `listener` ничего не удаляет — в списке лежит обёртка. Внутри `function wrapper` свой `this`, не эмиттер, а у стрелочной функции на месте метода `this` вообще не эмиттер — поэтому метод обычный, а обёртка стрелочная.',
          en: 'Subscribe a **wrapper** that first unsubscribes itself. Removing the original `listener` removes nothing — the list holds the wrapper. Inside `function wrapper` `this` isn’t the emitter, and an arrow function used as the method has no emitter `this` at all — so the method is a regular function and the wrapper is an arrow.',
        },
      },
    ],
    sources: [{ title: 'MDN — Arrow function expressions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions' }],
    verify: {
      kind: 'js-tests',
      before: EMITTER,
      tests: `const emitter = new Emitter();
const received = [];
emitter.once('save', (value) => received.push(value));
emitter.emit('save', 1);
emitter.emit('save', 2);
assert.deepEqual(received, [1]);`,
    },
  },
  {
    id: 'js-live-deep-clone-001',
    topic: 'javascript',
    tags: ['live-coding', 'objects'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Нужна глубокая копия объекта с вложенными массивами и датой `Date`. Какой вариант подходит?',
      en: 'You need a deep copy of an object with nested arrays and a `Date`. Which option works?',
    },
    options: [
      { code: 'const clone = (value) => ({ ...value });' },
      { code: 'const clone = (value) => JSON.parse(JSON.stringify(value));' },
      { code: 'const clone = (value) => Object.assign({}, value);' },
      { code: 'const clone = (value) => structuredClone(value);' },
      { code: 'const clone = (value) => Object.create(value);' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Спред и `Object.assign` копируют только верхний уровень — вложенный массив останется общим. `JSON` превращает `Date` в строку и теряет `undefined`, функции, `Map`, `Set`. `Object.create` вообще не копирует, а делает прототип. `structuredClone` создаёт настоящую глубокую копию, поддерживает `Date`, `Map`, `Set` и циклические ссылки, но не функции и DOM-узлы.',
          en: 'Spread and `Object.assign` copy only the top level — a nested array stays shared. `JSON` turns `Date` into a string and loses `undefined`, functions, `Map`, `Set`. `Object.create` doesn’t copy at all but creates a prototype. `structuredClone` makes a true deep copy and supports `Date`, `Map`, `Set` and circular references, but not functions or DOM nodes.',
        },
      },
    ],
    sources: [{ title: 'MDN — structuredClone()', url: `${MDN_API}/Window/structuredClone` }],
    verify: {
      kind: 'js-tests',
      tests: `const original = { tags: ['a'], created: new Date(0), meta: { views: 1 } };
const copy = clone(original);
copy.tags.push('b');
copy.meta.views = 2;
assert.deepEqual(original.tags, ['a']);
assert.equal(original.meta.views, 1);
assert.ok(copy.created instanceof Date);
assert.equal(copy.created.getTime(), 0);
assert.ok(Object.hasOwn(copy, 'tags'));`,
    },
  },
  {
    id: 'js-live-timeout-001',
    topic: 'javascript',
    tags: ['live-coding', 'promises'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какая реализация `withTimeout(promise, ms)` вернёт результат промиса, если он успел, и отклонится с ошибкой `timeout`, если нет?',
      en: 'Which `withTimeout(promise, ms)` implementation returns the promise’s result if it’s on time and rejects with a `timeout` error if not?',
    },
    options: [
      {
        code: `function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('timeout')), ms);
  });
  return Promise.all([promise, timeout]);
}`,
      },
      {
        code: `function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('timeout')), ms);
  });
  return Promise.race([promise, timeout]);
}`,
      },
      {
        code: `function withTimeout(promise, ms) {
  const timeout = new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
  return Promise.race([promise, timeout]);
}`,
      },
      {
        code: `function withTimeout(promise, ms) {
  return Promise.race([promise, setTimeout(() => {
    throw new Error('timeout');
  }, ms)]);
}`,
      },
      {
        code: `function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('timeout')), ms);
  });
  return Promise.any([promise, timeout]);
}`,
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`Promise.race` берёт исход первого завершившегося промиса — успех или ошибку. `Promise.all` ждёт оба, `Promise.any` проигнорирует ошибку таймера и дождётся медленного промиса. `setTimeout` возвращает идентификатор таймера, а не промис, — `race` сразу «выиграет» им. В реальном коде таймер ещё очищают через `clearTimeout`, а для `fetch` используют `AbortSignal.timeout(ms)`.',
          en: '`Promise.race` takes the outcome of the first promise to settle — success or error. `Promise.all` waits for both, `Promise.any` ignores the timer’s error and waits for the slow promise. `setTimeout` returns a timer id, not a promise — `race` instantly “wins” with it. Real code also clears the timer with `clearTimeout`, and `fetch` uses `AbortSignal.timeout(ms)`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Promise.race()', url: `${MDN}/Promise/race` }],
    verify: {
      kind: 'js-tests',
      tests: `const delay = (value, ms) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
assert.equal(await withTimeout(delay('fast', 10), 100), 'fast');
await assert.rejects(withTimeout(delay('slow', 200), 30), /timeout/);`,
    },
  },
];
