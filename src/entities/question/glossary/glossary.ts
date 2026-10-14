import type { LocalizedText } from '@app/shared/i18n';

export type GlossaryTerm = {
  term: LocalizedText;
  definition: LocalizedText;
};

export const GLOSSARY: Readonly<Record<string, GlossaryTerm>> = {
  'lexical-environment': {
    term: { ru: 'Лексическое окружение', en: 'Lexical environment' },
    definition: {
      ru: 'Переменные области видимости плюс ссылка на внешнее окружение. Функция запоминает окружение, в котором её создали.',
      en: 'The variables of a scope plus a link to the outer environment. A function remembers the environment it was created in.',
    },
  },
  microtask: {
    term: { ru: 'Микрозадача', en: 'Microtask' },
    definition: {
      ru: 'Задача из приоритетной очереди: колбэки промисов, продолжение после `await`, `queueMicrotask`. Все микрозадачи выполняются сразу после текущего кода, до следующей макрозадачи.',
      en: 'A task from the priority queue: promise callbacks, the continuation after `await`, `queueMicrotask`. All microtasks run right after the current code, before the next task.',
    },
  },
  tdz: {
    term: { ru: 'Временная мёртвая зона (TDZ)', en: 'Temporal dead zone (TDZ)' },
    definition: {
      ru: 'Участок от начала блока до объявления `let`, `const` или `class`. Обращение к переменной там бросает `ReferenceError`.',
      en: 'The span from the start of a block to the `let`, `const` or `class` declaration. Accessing the variable there throws `ReferenceError`.',
    },
  },
  hoisting: {
    term: { ru: 'Всплытие (hoisting)', en: 'Hoisting' },
    definition: {
      ru: 'Обработка объявлений до выполнения кода: `var` получает `undefined`, объявление функции доступно целиком.',
      en: 'Processing declarations before the code runs: `var` gets `undefined`, a function declaration is available entirely.',
    },
  },
  'prototype-chain': {
    term: { ru: 'Цепочка прототипов', en: 'Prototype chain' },
    definition: {
      ru: 'Объект ссылается на прототип, прототип — на свой прототип и так до `null`. По этой цепочке ищутся свойства, которых нет у самого объекта.',
      en: 'An object links to its prototype, the prototype to its own, and so on until `null`. Properties missing on the object are looked up along this chain.',
    },
  },
  idempotent: {
    term: { ru: 'Идемпотентность', en: 'Idempotence' },
    definition: {
      ru: 'Повторный вызов операции даёт тот же результат, что и первый. `GET`, `PUT` и `DELETE` идемпотентны, `POST` — нет.',
      en: 'Repeating an operation gives the same result as doing it once. `GET`, `PUT` and `DELETE` are idempotent, `POST` isn’t.',
    },
  },
  origin: {
    term: { ru: 'Origin', en: 'Origin' },
    definition: {
      ru: 'Схема, хост и порт адреса. Адреса с одинаковыми всеми тремя частями — один origin.',
      en: 'The scheme, host and port of a URL. URLs that share all three belong to the same origin.',
    },
  },
  preflight: {
    term: { ru: 'Preflight-запрос', en: 'Preflight request' },
    definition: {
      ru: 'Предварительный запрос `OPTIONS`, которым браузер спрашивает сервер, разрешён ли кросс-доменный запрос с таким методом и заголовками.',
      en: 'A preliminary `OPTIONS` request in which the browser asks the server whether a cross-origin request with this method and headers is allowed.',
    },
  },
  xss: {
    term: { ru: 'XSS', en: 'XSS' },
    definition: {
      ru: 'Межсайтовый скриптинг: чужой код выполняется на вашей странице с её правами — обычно из-за вывода данных пользователя как HTML.',
      en: 'Cross-site scripting: foreign code runs on your page with its privileges — usually because user data is rendered as HTML.',
    },
  },
  csrf: {
    term: { ru: 'CSRF', en: 'CSRF' },
    definition: {
      ru: 'Подделка межсайтового запроса: чужой сайт отправляет запрос на ваш домен, а браузер прикладывает к нему cookie пользователя.',
      en: 'Cross-site request forgery: another site sends a request to your domain, and the browser attaches the user’s cookies.',
    },
  },
  specificity: {
    term: { ru: 'Специфичность', en: 'Specificity' },
    definition: {
      ru: 'Вес селектора: id, затем классы, атрибуты и псевдоклассы, затем теги. При конфликте правил побеждает более специфичный.',
      en: 'The weight of a selector: ids, then classes, attributes and pseudo-classes, then types. In a conflict the more specific rule wins.',
    },
  },
  'stacking-context': {
    term: { ru: 'Контекст наложения', en: 'Stacking context' },
    definition: {
      ru: 'Группа элементов, внутри которой сравниваются `z-index`. Её создают, например, `transform`, `opacity < 1` и позиционированный элемент с `z-index`.',
      en: 'A group of elements within which `z-index` values are compared. It’s created by, e.g., `transform`, `opacity < 1` and a positioned element with `z-index`.',
    },
  },
  reconciliation: {
    term: { ru: 'Reconciliation', en: 'Reconciliation' },
    definition: {
      ru: 'Сравнение нового дерева элементов React с прошлым, чтобы применить к DOM только изменения.',
      en: 'Comparing React’s new element tree with the previous one to apply only the changes to the DOM.',
    },
  },
  batching: {
    term: { ru: 'Батчинг', en: 'Batching' },
    definition: {
      ru: 'Объединение нескольких обновлений состояния в один рендер.',
      en: 'Combining several state updates into a single render.',
    },
  },
  memoization: {
    term: { ru: 'Мемоизация', en: 'Memoization' },
    definition: {
      ru: 'Запоминание результата вычисления по входным данным, чтобы не считать его повторно.',
      en: 'Caching a computation’s result by its inputs so it isn’t computed again.',
    },
  },
  amortized: {
    term: { ru: 'Амортизированная сложность', en: 'Amortized complexity' },
    definition: {
      ru: 'Средняя цена операции в длинной серии: редкие дорогие шаги (например, расширение таблицы) раскладываются на множество дешёвых.',
      en: 'The average cost of an operation over a long series: rare expensive steps (like growing a table) are spread over many cheap ones.',
    },
  },
  token: {
    term: { ru: 'Токен', en: 'Token' },
    definition: {
      ru: 'Кусок текста, с которым работает языковая модель: часть слова, слово или знак. Окно контекста и цена считаются в токенах.',
      en: 'A piece of text a language model works with: part of a word, a word or a symbol. The context window and the price are measured in tokens.',
    },
  },
  'context-window': {
    term: { ru: 'Окно контекста', en: 'Context window' },
    definition: {
      ru: 'Максимальный объём текста в токенах, который модель обрабатывает за раз: промпт и ответ вместе.',
      en: 'The maximum amount of text in tokens a model processes at once: the prompt and the response together.',
    },
  },
  embedding: {
    term: { ru: 'Эмбеддинг', en: 'Embedding' },
    definition: {
      ru: 'Вектор чисел, представляющий смысл текста: близкие по смыслу тексты дают близкие векторы.',
      en: 'A vector of numbers representing a text’s meaning: texts with similar meaning get similar vectors.',
    },
  },
  distributive: {
    term: { ru: 'Дистрибутивный условный тип', en: 'Distributive conditional type' },
    definition: {
      ru: 'Условный тип над «голым» параметром: если подставить union, условие применится к каждому члену отдельно.',
      en: 'A conditional type over a “naked” parameter: given a union, the condition is applied to each member separately.',
    },
  },
  'tree-shaking': {
    term: { ru: 'Tree-shaking', en: 'Tree-shaking' },
    definition: {
      ru: 'Удаление неиспользуемого кода при сборке. Работает со статическими ES-модулями и кодом без побочных эффектов.',
      en: 'Removing unused code at build time. Works with static ES modules and side-effect-free code.',
    },
  },
  layout: {
    term: { ru: 'Layout', en: 'Layout' },
    definition: {
      ru: 'Этап отрисовки, на котором браузер вычисляет размеры и положение элементов. Его запускает изменение геометрии.',
      en: 'The rendering stage where the browser computes element sizes and positions. Geometry changes trigger it.',
    },
  },
};
