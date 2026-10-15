import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';
const WEB_DEV = 'https://web.dev/articles';

export const WEB_QUESTIONS_8: Question[] = [
  {
    id: 'web-perf-inp-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Обработчик клика синхронно работает 400 мс, и метрика INP плохая. Что действительно поможет?',
      en: 'A click handler runs synchronously for 400 ms and INP is poor. What actually helps?',
    },
    options: [
      { text: { ru: 'Пометить обработчик `async`', en: 'Mark the handler `async`' } },
      { text: { ru: 'Обернуть работу в `Promise.resolve().then(...)`', en: 'Wrap the work in `Promise.resolve().then(...)`' } },
      {
        text: {
          ru: 'Сначала обновить интерфейс, а работу разбить на части и между ними отдавать управление главному потоку (`scheduler.yield()`, `setTimeout`)',
          en: 'Update the UI first, then split the work into chunks and yield to the main thread between them (`scheduler.yield()`, `setTimeout`)',
        },
      },
      { text: { ru: 'Перенести всю работу в `requestAnimationFrame`', en: 'Move all the work into `requestAnimationFrame`' } },
      { text: { ru: 'Добавить слушателю `{ passive: true }`', en: 'Add `{ passive: true }` to the listener' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**INP** — задержка от взаимодействия до следующей отрисовки. Пока главный поток занят длинной задачей, браузер не может показать отклик. `async` не делает синхронный код неблокирующим, [[microtask|микрозадачи]] из `then` выполняются до отрисовки, а колбэк `requestAnimationFrame` — прямо перед ней, так что кадр всё равно ждёт. Помогает разбить работу и уступать поток: браузер успевает отрисовать отклик между частями.',
          en: '**INP** is the delay from an interaction to the next paint. While the main thread runs a long task, the browser can’t show feedback. `async` doesn’t make synchronous code non-blocking, `then` [[microtask|microtasks]] run before rendering, and a `requestAnimationFrame` callback runs right before paint, so the frame still waits. Splitting the work and yielding helps: the browser paints feedback between chunks.',
        },
      },
    ],
    sources: [
      { title: 'web.dev — Interaction to Next Paint', url: `${WEB_DEV}/inp` },
      { title: 'web.dev — Optimize long tasks', url: `${WEB_DEV}/optimize-long-tasks` },
      { title: 'MDN — scheduler.yield()', url: `${MDN}/Web/API/Scheduler/yield` },
    ],
  },
  {
    id: 'web-perf-lcp-lazy-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Большая картинка на первом экране — элемент LCP. Какое изменение **ухудшит** LCP?',
      en: 'A large above-the-fold image is the LCP element. Which change makes LCP **worse**?',
    },
    options: [
      { code: '<img src="hero.avif" fetchpriority="high" alt="…">' },
      { code: '<link rel="preload" as="image" href="hero.avif">' },
      { code: '<img src="hero.avif" loading="lazy" alt="…">' },
      { code: '<img src="hero.avif" width="1200" height="600" alt="…">' },
      { text: { ru: 'Сжать картинку в AVIF вместо PNG', en: 'Compress the image to AVIF instead of PNG' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ленивая картинка начинает грузиться, только когда браузер построит раскладку и поймёт, что она во вьюпорте, — загрузка стартует позже. `loading="lazy"` ставят картинкам ниже первого экрана. Для [[lcp|LCP]]-картинки наоборот поднимают приоритет: `fetchpriority="high"` или `preload`, а размеры `width`/`height` спасают от сдвигов макета.',
          en: 'A lazy image starts loading only after the browser builds layout and sees it’s in the viewport — the download starts later. Use `loading="lazy"` for images below the fold. For the [[lcp|LCP]] image raise the priority instead: `fetchpriority="high"` or `preload`, while `width`/`height` prevent layout shifts.',
        },
      },
    ],
    sources: [
      { title: 'web.dev — The performance effects of too much lazy loading', url: `${WEB_DEV}/lcp-lazy-loading` },
      { title: 'web.dev — Optimize LCP', url: `${WEB_DEV}/optimize-lcp` },
      { title: 'MDN — fetchpriority', url: `${MDN}/Web/HTML/Reference/Attributes/fetchpriority` },
    ],
  },
  {
    id: 'web-perf-debounce-001',
    kind: 'output',
    topic: 'web',
    tags: ['performance'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Сколько запросов отправит поиск? Впишите число, которое выведет код.',
      en: 'How many requests will the search send? Type the number the code prints.',
    },
    code: {
      lang: 'js',
      source: `function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

let requests = 0;
const search = debounce(() => requests++, 100);

search();
search();
search();
setTimeout(search, 300);
setTimeout(() => console.log(requests), 500);`,
    },
    answers: ['2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Debounce** откладывает вызов, пока поток событий не затихнет на `ms`. Три быстрых вызова сбрасывают таймер друг друга — срабатывает только последний (на 100 мс). Вызов на 300 мс приходит после паузы и срабатывает отдельно — итого 2. Так делают поиск с подсказками: запрос уходит, когда пользователь перестал печатать.',
          en: '**Debounce** delays the call until events go quiet for `ms`. Three quick calls reset each other’s timer — only the last fires (at 100 ms). The call at 300 ms comes after a pause and fires on its own — 2 in total. That’s how search suggestions work: the request goes out once the user stops typing.',
        },
      },
    ],
    sources: [{ title: 'MDN — Debounce', url: `${MDN}/Glossary/Debounce` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'web-perf-throttle-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какая пара подходит лучше: подсказки в поиске и полоска прогресса чтения, которая двигается при прокрутке?',
      en: 'Which pairing fits best: search suggestions and a reading progress bar that moves on scroll?',
    },
    options: [
      { text: { ru: 'Поиск — throttle, прогресс — debounce', en: 'Search — throttle, progress — debounce' } },
      { text: { ru: 'Поиск — debounce, прогресс — throttle', en: 'Search — debounce, progress — throttle' } },
      { text: { ru: 'Обоим — debounce', en: 'Debounce for both' } },
      { text: { ru: 'Обоим — ничего, браузер сам ограничивает события', en: 'Nothing for both, the browser limits events itself' } },
      { text: { ru: 'Обоим — `setInterval` на 1 секунду', en: '`setInterval` of 1 second for both' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Debounce** ждёт паузы — для поиска нужен один запрос, когда пользователь закончил ввод. **Throttle** вызывает функцию не чаще раза в N мс, пока события идут, — полоска прогресса должна двигаться во время прокрутки, а не после неё. С [[debounce|debounce]] она бы застывала, пока пользователь листает.',
          en: '**Debounce** waits for a pause — search needs one request once the user finishes typing. **Throttle** calls the function at most once per N ms while events keep coming — the progress bar must move during scrolling, not after. With [[debounce|debounce]] it would freeze while the user scrolls.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Throttle', url: `${MDN}/Glossary/Throttle` },
      { title: 'MDN — Debounce', url: `${MDN}/Glossary/Debounce` },
    ],
  },
  {
    id: 'web-perf-virtualization-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Таблица на 10 000 строк долго открывается и дёргается при прокрутке. Что поможет сильнее всего?',
      en: 'A 10,000-row table opens slowly and stutters while scrolling. What helps the most?',
    },
    options: [
      { text: { ru: 'Обернуть каждую строку в `React.memo`', en: 'Wrap each row in `React.memo`' } },
      { text: { ru: 'Поставить `will-change: transform` всем строкам', en: 'Set `will-change: transform` on every row' } },
      {
        text: {
          ru: 'Виртуализация: рендерить только видимые строки и небольшой запас',
          en: 'Virtualization: render only visible rows plus a small buffer',
        },
      },
      { text: { ru: 'Заменить `key={row.id}` на `key={index}`', en: 'Replace `key={row.id}` with `key={index}`' } },
      { text: { ru: 'Перенести стили строк в инлайн', en: 'Move row styles inline' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Главная цена — 10 000 строк в DOM: их надо создать, посчитать раскладку и держать в памяти. Виртуализированный список (TanStack Virtual, react-window) держит в DOM пару десятков строк и подменяет их при прокрутке. `memo` спасает только от лишних перерисовок, а `will-change` на тысячах элементов съест память. Если позволяет интерфейс, подойдут и пагинация или подгрузка.',
          en: 'The main cost is 10,000 rows in the DOM: they must be created, laid out and kept in memory. A virtualized list (TanStack Virtual, react-window) keeps a couple dozen rows in the DOM and swaps them while scrolling. `memo` only prevents extra re-renders, and `will-change` on thousands of elements eats memory. If the UI allows it, pagination or incremental loading also work.',
        },
      },
    ],
    sources: [
      { title: 'web.dev — Virtualize large lists with react-window', url: `${WEB_DEV}/virtualize-long-lists-react-window` },
      { title: 'TanStack Virtual', url: 'https://tanstack.com/virtual/latest' },
    ],
  },
  {
    id: 'web-perf-passive-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Зачем слушателю `touchstart` или `wheel` передают `{ passive: true }`?',
      en: 'Why pass `{ passive: true }` to a `touchstart` or `wheel` listener?',
    },
    code: { lang: 'js', source: `window.addEventListener('wheel', onWheel, { passive: true });` },
    options: [
      { text: { ru: 'Обработчик выполнится в отдельном потоке', en: 'The handler runs in a separate thread' } },
      { text: { ru: 'Обработчик сработает только один раз', en: 'The handler fires only once' } },
      {
        text: {
          ru: 'Обработчик обещает не вызывать `preventDefault()`, поэтому браузер прокручивает сразу, не дожидаясь его',
          en: 'The handler promises not to call `preventDefault()`, so the browser scrolls right away without waiting for it',
        },
      },
      { text: { ru: 'Событие перестаёт всплывать', en: 'The event stops bubbling' } },
      { text: { ru: 'Обработчик вызывается после окончания прокрутки', en: 'The handler is called after scrolling ends' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Если обработчик может отменить прокрутку, браузер обязан дождаться его выполнения, и тяжёлый обработчик делает прокрутку рваной. `passive: true` снимает это ожидание; вызов `preventDefault()` внутри будет проигнорирован. Для `touchstart`, `touchmove` и `wheel` на `window`, `document` и `body` браузеры ставят `passive: true` по умолчанию.',
          en: 'If a handler may cancel scrolling, the browser must wait for it, and a heavy handler makes scrolling janky. `passive: true` removes that wait; calling `preventDefault()` inside is ignored. For `touchstart`, `touchmove` and `wheel` on `window`, `document` and `body`, browsers default to `passive: true`.',
        },
      },
    ],
    sources: [{ title: 'MDN — addEventListener: passive', url: `${MDN}/Web/API/EventTarget/addEventListener#passive` }],
  },
  {
    id: 'web-perf-srcset-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какая разметка позволит телефону скачать картинку меньшего размера, чем ноутбуку?',
      en: 'Which markup lets a phone download a smaller image than a laptop?',
    },
    options: [
      { code: '<img src="photo-1600.jpg" style="max-width: 100%" alt="…">' },
      { code: '<img src="photo-1600.jpg" width="800" alt="…">' },
      {
        code: '<img src="photo-1600.jpg" srcset="photo-800.jpg 800w, photo-1600.jpg 1600w" sizes="(max-width: 600px) 100vw, 50vw" alt="…">',
      },
      { code: '<img src="photo-1600.jpg" loading="lazy" alt="…">' },
      { code: '<img src="photo-1600.jpg" decoding="async" alt="…">' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`srcset` перечисляет варианты с их шириной, `sizes` — какую ширину картинка займёт на экране. Браузер сам выберет наименьший подходящий файл с учётом плотности пикселей. CSS и атрибут `width` лишь масштабируют уже скачанный большой файл, `loading` и `decoding` влияют на момент загрузки и декодирования, а не на размер.',
          en: '`srcset` lists variants with their widths, `sizes` says how wide the image will render. The browser picks the smallest suitable file, taking pixel density into account. CSS and the `width` attribute only scale the already downloaded large file, while `loading` and `decoding` affect when it loads and decodes, not its size.',
        },
      },
    ],
    sources: [{ title: 'MDN — Responsive images', url: `${MDN}/Web/HTML/Guides/Responsive_images` }],
  },
  {
    id: 'web-perf-font-display-001',
    topic: 'web',
    tags: ['performance', 'css'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что делает `font-display: swap` в `@font-face`?', en: 'What does `font-display: swap` in `@font-face` do?' },
    options: [
      {
        text: {
          ru: 'Текст сразу показывается запасным шрифтом и заменяется веб-шрифтом, когда тот загрузится',
          en: 'Text shows right away in a fallback font and switches to the web font once it loads',
        },
      },
      { text: { ru: 'Текст невидим, пока шрифт не загрузится', en: 'Text is invisible until the font loads' } },
      { text: { ru: 'Шрифт грузится только при наведении на текст', en: 'The font loads only when hovering the text' } },
      { text: { ru: 'Если шрифт грузится дольше секунды, он не применится никогда', en: 'If the font takes over a second, it’s never applied' } },
      { text: { ru: 'Шрифт навсегда кешируется в браузере', en: 'The font is cached in the browser forever' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Со `swap` у шрифта почти нулевой период блокировки и бесконечный период замены: пользователь читает текст сразу, без «невидимого текста» (FOIT). Цена — заметная смена шрифта и возможный сдвиг макета; его уменьшают предзагрузкой шрифта и подбором запасного по метрикам (`size-adjust`). Невидимый текст до загрузки — поведение `block`.',
          en: 'With `swap` the font gets an almost zero block period and an infinite swap period: the user reads text right away, without “invisible text” (FOIT). The cost is a visible font change and possible layout shift; reduce it by preloading the font and matching the fallback’s metrics (`size-adjust`). Invisible text until load is the `block` behavior.',
        },
      },
    ],
    sources: [
      { title: 'MDN — font-display', url: `${MDN}/Web/CSS/Reference/At-rules/@font-face/font-display` },
      { title: 'web.dev — Best practices for fonts', url: `${WEB_DEV}/font-best-practices` },
    ],
  },
  {
    id: 'web-perf-worker-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Разбор CSV-файла на 50 МБ подвешивает страницу на несколько секунд. Куда вынести эту работу?',
      en: 'Parsing a 50 MB CSV file freezes the page for several seconds. Where should this work go?',
    },
    options: [
      { text: { ru: 'В Service Worker', en: 'Into a Service Worker' } },
      { text: { ru: 'В `async`-функцию', en: 'Into an `async` function' } },
      {
        text: {
          ru: 'В Web Worker: он работает в отдельном потоке и возвращает результат через `postMessage`',
          en: 'Into a Web Worker: it runs in a separate thread and returns the result via `postMessage`',
        },
      },
      { text: { ru: 'В `setTimeout(parse, 0)` целиком', en: 'Into a single `setTimeout(parse, 0)`' } },
      { text: { ru: 'В `useEffect`', en: 'Into `useEffect`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Web Worker** выполняет код в отдельном потоке, и главный поток остаётся свободным для ввода и отрисовки. Доступа к DOM у воркера нет — данные передаются сообщениями. `async`, `setTimeout` и `useEffect` лишь откладывают ту же работу, но выполняют её в главном потоке. [[service-worker|Service Worker]] — прокси для сетевых запросов и кеша, не для вычислений страницы.',
          en: 'A **Web Worker** runs code in a separate thread, leaving the main thread free for input and rendering. A worker has no DOM access — data is passed via messages. `async`, `setTimeout` and `useEffect` only postpone the same work but still run it on the main thread. A [[service-worker|Service Worker]] is a proxy for network requests and caching, not for page computations.',
        },
      },
    ],
    sources: [{ title: 'MDN — Using Web Workers', url: `${MDN}/Web/API/Web_Workers_API/Using_web_workers` }],
  },
  {
    id: 'web-perf-memoize-001',
    kind: 'output',
    topic: 'web',
    tags: ['performance'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Сколько раз вызовется медленная функция? Впишите число, которое выведет код.',
      en: 'How many times is the slow function called? Type the number the code prints.',
    },
    code: {
      lang: 'js',
      source: `let calls = 0;
const slowSquare = (n) => {
  calls++;
  return n * n;
};

function memoize(fn) {
  const cache = new Map();
  return (n) => {
    if (!cache.has(n)) {
      cache.set(n, fn(n));
    }
    return cache.get(n);
  };
}

const fastSquare = memoize(slowSquare);
[2, 3, 2, 2, 3, 4].forEach((n) => fastSquare(n));
console.log(calls);`,
    },
    answers: ['3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Мемоизация** запоминает результат для каждого аргумента: функция считает только для новых значений 2, 3 и 4, остальное берётся из кеша. Подходит только для [[pure-function|чистых функций]]. Кеш без ограничений растёт вечно — в долгоживущих приложениях его ограничивают (LRU). `useMemo` в React — та же идея, но хранит лишь последний результат.',
          en: '**Memoization** remembers the result for each argument: the function computes only for the new values 2, 3 and 4, the rest comes from the cache. It suits only [[pure-function|pure functions]]. An unbounded cache grows forever — long-lived apps limit it (LRU). React’s `useMemo` is the same idea but keeps only the last result.',
        },
      },
    ],
    sources: [{ title: 'MDN — Memoization', url: `${MDN}/Glossary/Memoization` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'web-perf-set-lookup-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Фильтр по 100 000 заказам и 10 000 заблокированным id работает секунды. Как ускорить его сильнее всего?',
      en: 'Filtering 100,000 orders against 10,000 blocked ids takes seconds. What speeds it up the most?',
    },
    code: { lang: 'js', source: `const visible = orders.filter((order) => !blockedIds.includes(order.userId));` },
    options: [
      { text: { ru: 'Заменить `filter` на цикл `for`', en: 'Replace `filter` with a `for` loop' } },
      { text: { ru: 'Отсортировать `blockedIds` перед фильтром', en: 'Sort `blockedIds` before filtering' } },
      { text: { ru: 'Заменить `includes` на `indexOf(...) === -1`', en: 'Replace `includes` with `indexOf(...) === -1`' } },
      {
        text: {
          ru: 'Один раз собрать `new Set(blockedIds)` и проверять через `has`',
          en: 'Build `new Set(blockedIds)` once and check with `has`',
        },
      },
      { text: { ru: 'Скопировать `orders` через спред перед фильтром', en: 'Copy `orders` with spread before filtering' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`includes` перебирает массив целиком, поэтому фильтр делает до 100 000 × 10 000 = 10⁹ сравнений — O(n·m). `Set.has` работает в среднем за O(1), и вся операция становится O(n + m). Цикл `for` и `indexOf` меняют лишь константу, а сортировка не помогает: `includes` всё равно идёт подряд.',
          en: '`includes` scans the whole array, so the filter does up to 100,000 × 10,000 = 10⁹ comparisons — O(n·m). `Set.has` is O(1) on average, making the whole thing O(n + m). A `for` loop and `indexOf` change only the constant, and sorting doesn’t help: `includes` still scans sequentially.',
        },
      },
    ],
    sources: [{ title: 'MDN — Set', url: `${MDN}/Web/JavaScript/Reference/Global_Objects/Set` }],
  },
  {
    id: 'web-perf-lab-field-001',
    topic: 'web',
    tags: ['performance'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Lighthouse в CI ставит 95 баллов, а у реальных пользователей (данные CrUX) INP плохой. Почему так бывает?',
      en: 'Lighthouse in CI scores 95, yet real users (CrUX data) have poor INP. Why does that happen?',
    },
    options: [
      { text: { ru: 'Lighthouse считает баллы только для десктопа', en: 'Lighthouse scores desktop only' } },
      {
        text: {
          ru: 'Lighthouse — лабораторный замер одной загрузки без реальных взаимодействий; полевые данные отражают настоящие устройства, сети и клики',
          en: 'Lighthouse is a lab run of one page load without real interactions; field data reflects real devices, networks and clicks',
        },
      },
      { text: { ru: 'CrUX учитывает только пользователей Safari', en: 'CrUX counts only Safari users' } },
      { text: { ru: 'В CI отключён кеш, поэтому цифры занижены', en: 'Cache is disabled in CI, so the numbers are understated' } },
      { text: { ru: 'INP зависит только от сервера', en: 'INP depends only on the server' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Lighthouse загружает страницу один раз, имитируя средний телефон и медленную сеть, и никуда не кликает — [[inp|INP]] он не измеряет, вместо него смотрит на Total Blocking Time. **Полевые данные** (CrUX, свой RUM через `web-vitals`) собираются у реальных пользователей: слабые телефоны, расширения, долгие сессии и настоящие клики. Решения принимают по полю, а лабораторные замеры нужны, чтобы воспроизвести и проверить исправление.',
          en: 'Lighthouse loads the page once, simulating an average phone and a slow network, and clicks nothing — it doesn’t measure [[inp|INP]], using Total Blocking Time instead. **Field data** (CrUX, your own RUM via `web-vitals`) comes from real users: weak phones, extensions, long sessions and real clicks. Decide based on field data; lab runs help reproduce and verify a fix.',
        },
      },
    ],
    sources: [{ title: 'web.dev — Why lab and field data can be different', url: `${WEB_DEV}/lab-and-field-data-differences` }],
  },
];
