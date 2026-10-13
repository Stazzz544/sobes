import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const WEB_QUESTIONS_4: Question[] = [
  {
    id: 'web-css-002',
    topic: 'web',
    tags: ['css'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой будет итоговая ширина блока на экране?', en: 'What is the box’s rendered width?' },
    code: {
      lang: 'css',
      source: `.box {
  box-sizing: border-box;
  width: 100px;
  padding: 10px;
  border: 5px solid;
}`,
    },
    options: [{ code: '100px' }, { code: '130px' }, { code: '120px' }, { code: '70px' }, { code: '110px' }],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При `box-sizing: border-box` свойство `width` задаёт ширину **вместе** с padding и border. Блок займёт ровно 100px, а на контент останется `100 − 2·10 − 2·5 = 70px`.',
          en: 'With `box-sizing: border-box`, `width` includes padding and border. The box takes exactly 100px, leaving `100 − 2·10 − 2·5 = 70px` for content.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'По умолчанию действует `content-box`: `width` относится только к контенту, и блок вышел бы шириной 130px. Поэтому во многих проектах в сбросе стилей пишут `*, *::before, *::after { box-sizing: border-box; }`.',
          en: 'The default is `content-box`: `width` covers only the content, and the box would be 130px wide. That’s why many resets include `*, *::before, *::after { box-sizing: border-box; }`.',
        },
      },
    ],
    sources: [{ title: 'MDN — box-sizing', url: `${MDN}/Web/CSS/box-sizing` }],
  },
  {
    id: 'web-css-003',
    topic: 'web',
    tags: ['css'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Когда лучше выбрать CSS Grid, а не Flexbox?', en: 'When is CSS Grid a better choice than Flexbox?' },
    options: [
      {
        text: {
          ru: 'Когда нужно выстроить элементы в одну строку',
          en: 'When items need to line up in a single row',
        },
      },
      {
        text: {
          ru: 'Когда раскладка двумерная: нужно управлять строками и колонками одновременно',
          en: 'When the layout is two-dimensional: rows and columns must be controlled together',
        },
      },
      {
        text: {
          ru: 'Grid устарел, Flexbox его заменил',
          en: 'Grid is outdated; Flexbox replaced it',
        },
      },
      {
        text: {
          ru: 'Когда нужна поддержка старых браузеров',
          en: 'When you need old browser support',
        },
      },
      {
        text: {
          ru: 'Grid работает только для таблиц с данными',
          en: 'Grid only works for data tables',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Flexbox одномерный: раскладывает элементы вдоль одной оси и хорош для панелей, меню, выравнивания внутри компонента. Grid двумерный: задаёт сетку строк и колонок, удобен для раскладки страницы и карточек, где элементы должны совпадать по обеим осям.',
          en: 'Flexbox is one-dimensional: it lays items along one axis and shines for toolbars, menus and alignment inside a component. Grid is two-dimensional: it defines rows and columns, great for page layouts and card grids where items align on both axes.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}`,
        },
        caption: {
          ru: 'Адаптивная сетка карточек без медиазапросов.',
          en: 'A responsive card grid with no media queries.',
        },
      },
    ],
    sources: [
      {
        title: 'MDN — Relationship of grid layout to other layout methods',
        url: `${MDN}/Web/CSS/CSS_grid_layout/Relationship_of_grid_layout_with_other_layout_methods`,
      },
    ],
  },
  {
    id: 'web-css-004',
    topic: 'web',
    tags: ['css'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Почему шапка с `position: sticky` может не «прилипать» при прокрутке?',
      en: 'Why might a header with `position: sticky` not stick when scrolling?',
    },
    options: [
      {
        text: {
          ru: '`sticky` работает только внутри flex-контейнера',
          en: '`sticky` only works inside a flex container',
        },
      },
      {
        text: {
          ru: 'Не задан порог (например, `top: 0`) или у предка `overflow: hidden`/`auto`, и элемент прилипает к нему, а не к окну',
          en: 'No threshold is set (e.g. `top: 0`), or an ancestor has `overflow: hidden`/`auto`, so the element sticks to it instead of the viewport',
        },
      },
      {
        text: {
          ru: 'Нужно добавить `z-index: 9999`',
          en: 'You need to add `z-index: 9999`',
        },
      },
      {
        text: {
          ru: '`sticky` поддерживается только в Safari',
          en: '`sticky` is only supported in Safari',
        },
      },
      {
        text: {
          ru: 'Элементу обязательно нужен `display: block`',
          en: 'The element must have `display: block`',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Sticky-элемент ведёт себя как `relative`, пока не пересечёт порог, заданный `top`/`bottom`/`left`/`right`. Без порога он никогда не прилипнет. Прилипает он к ближайшему предку со своей прокруткой (`overflow` не `visible`) — если это не окно, кажется, что ничего не работает.',
          en: 'A sticky element behaves like `relative` until it crosses the threshold set by `top`/`bottom`/`left`/`right`. Without a threshold it never sticks. It sticks to the nearest ancestor that scrolls (`overflow` other than `visible`) — if that isn’t the viewport, it looks broken.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ещё одна причина: элемент не может выйти за границы родителя. Если родитель такой же высоты, прилипать некуда.',
          en: 'One more cause: the element can’t leave its parent. If the parent is just as tall, there’s nowhere to stick.',
        },
      },
    ],
    sources: [{ title: 'MDN — position: sticky', url: `${MDN}/Web/CSS/position#sticky_positioning` }],
  },
  {
    id: 'web-css-005',
    topic: 'web',
    tags: ['css'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Почему подсказка с `z-index: 9999` оказывается под шапкой?',
      en: 'Why does the tooltip with `z-index: 9999` end up under the header?',
    },
    code: {
      lang: 'html',
      source: `<style>
  .header { position: relative; z-index: 2; }
  .page { position: relative; z-index: 1; }
  .tooltip { position: absolute; z-index: 9999; }
</style>

<header class="header">Header</header>
<main class="page">
  <div class="tooltip">Tooltip</div>
</main>`,
    },
    options: [
      {
        text: {
          ru: '`z-index` больше 1000 игнорируется браузером',
          en: 'Browsers ignore `z-index` values above 1000',
        },
      },
      {
        text: {
          ru: '`.page` создаёт свой контекст наложения с `z-index: 1`, и подсказка соревнуется с шапкой только внутри него',
          en: '`.page` creates its own stacking context with `z-index: 1`, so the tooltip competes with the header only within it',
        },
      },
      {
        text: {
          ru: '`position: absolute` не поддерживает `z-index`',
          en: '`position: absolute` doesn’t support `z-index`',
        },
      },
      {
        text: {
          ru: 'Шапка выше, потому что объявлена в HTML раньше',
          en: 'The header wins because it comes first in the HTML',
        },
      },
      {
        text: {
          ru: 'Нужно использовать `!important` для `z-index`',
          en: 'You need `!important` on `z-index`',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Позиционированный элемент с `z-index` (а также элементы с `opacity < 1`, `transform`, `filter` и др.) образует **контекст наложения**. Потомки сравниваются по `z-index` только внутри него. Для внешнего мира вся `.page` — это один слой с `z-index: 1`, и он ниже шапки с `z-index: 2`.',
          en: 'A positioned element with `z-index` (and elements with `opacity < 1`, `transform`, `filter`, etc.) forms a **stacking context**. Its descendants compare `z-index` only within it. To the outside world, all of `.page` is one layer at `z-index: 1`, which is below the header at `z-index: 2`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Решения: убрать `z-index` у `.page`, поднять её контекст или вынести подсказку в портал на уровень `body`.',
          en: 'Fixes: remove `z-index` from `.page`, raise its context, or render the tooltip in a portal at the `body` level.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Stacking context', url: `${MDN}/Web/CSS/CSS_positioned_layout/Stacking_context` },
    ],
  },
  {
    id: 'web-css-006',
    topic: 'web',
    tags: ['css', 'html-a11y'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'После какого способа скрытия элемент остаётся кликабельным и занимает место?',
      en: 'Which way of hiding an element keeps it clickable and taking up space?',
    },
    options: [
      { code: 'display: none' },
      { code: 'visibility: hidden' },
      { code: 'opacity: 0' },
      { code: '<div hidden>' },
      { code: 'width: 0; height: 0; overflow: hidden' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`display: none` и атрибут `hidden` убирают элемент из раскладки и из дерева доступности. `visibility: hidden` сохраняет место, но элемент не реагирует на клики и скрыт от скринридеров. `opacity: 0` делает его прозрачным, но он остаётся на месте, кликабелен и доступен с клавиатуры.',
          en: '`display: none` and the `hidden` attribute remove the element from layout and the accessibility tree. `visibility: hidden` keeps its space but it ignores clicks and is hidden from screen readers. `opacity: 0` makes it transparent, but it stays in place, clickable and keyboard-focusable.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Невидимые, но кликабельные элементы — частый источник багов: пользователь нажимает «в пустоту».',
          en: 'Invisible yet clickable elements are a common source of bugs: users tap on “nothing”.',
        },
      },
    ],
    sources: [
      { title: 'MDN — visibility', url: `${MDN}/Web/CSS/visibility` },
      { title: 'MDN — opacity', url: `${MDN}/Web/CSS/opacity` },
    ],
  },
  {
    id: 'web-css-007',
    topic: 'web',
    tags: ['css'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какое расстояние будет между блоками по вертикали?',
      en: 'What will the vertical gap between the blocks be?',
    },
    code: {
      lang: 'html',
      source: `<style>
  .first { margin-bottom: 20px; }
  .second { margin-top: 30px; }
</style>

<div class="first">A</div>
<div class="second">B</div>`,
    },
    options: [{ code: '50px' }, { code: '20px' }, { code: '30px' }, { code: '10px' }, { code: '0px' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вертикальные внешние отступы соседних блоков **схлопываются**: вместо суммы берётся больший из них — 30px. Горизонтальные отступы не схлопываются.',
          en: 'Adjacent vertical margins of block siblings **collapse**: instead of their sum, the larger one is used — 30px. Horizontal margins never collapse.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Во flex- и grid-контейнерах схлопывания нет, поэтому там было бы 50px. Многие раскладывают элементы через `gap`, чтобы не думать об этом.',
          en: 'There’s no collapsing inside flex and grid containers, so there you’d get 50px. Many people use `gap` for spacing to avoid the issue.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Mastering margin collapsing', url: `${MDN}/Web/CSS/CSS_box_model/Mastering_margin_collapsing` },
    ],
  },
  {
    id: 'web-a11y-001',
    topic: 'web',
    tags: ['html-a11y'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Почему для кнопки лучше `<button>`, а не `<div onclick>`?',
      en: 'Why is `<button>` better than `<div onclick>` for a button?',
    },
    options: [
      {
        text: {
          ru: '`<button>` из коробки получает фокус с клавиатуры, нажимается Enter и Space и объявляется скринридером как кнопка',
          en: '`<button>` gets keyboard focus, activates on Enter and Space, and is announced as a button by screen readers out of the box',
        },
      },
      {
        text: {
          ru: '`<div>` нельзя стилизовать как кнопку',
          en: 'A `<div>` can’t be styled like a button',
        },
      },
      {
        text: {
          ru: '`<button>` быстрее отрисовывается',
          en: '`<button>` renders faster',
        },
      },
      {
        text: {
          ru: 'У `<div>` не работает событие `click`',
          en: 'The `click` event doesn’t work on a `<div>`',
        },
      },
      {
        text: {
          ru: 'Разницы нет, это вопрос стиля кода',
          en: 'There’s no difference; it’s a code style preference',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Семантический `<button>` даёт доступность бесплатно: попадает в порядок Tab, срабатывает с клавиатуры, имеет роль `button` для технологий доступности, умеет `disabled` и отправку формы. Чтобы `<div>` вёл себя так же, нужны `role="button"`, `tabindex="0"` и обработчик `keydown` — и всё равно легко что-то упустить.',
          en: 'A semantic `<button>` gives you accessibility for free: it’s in the Tab order, works from the keyboard, has the `button` role for assistive tech, and supports `disabled` and form submission. Making a `<div>` behave the same needs `role="button"`, `tabindex="0"` and a `keydown` handler — and it’s still easy to miss something.',
        },
      },
    ],
    sources: [
      { title: 'MDN — <button>', url: `${MDN}/Web/HTML/Reference/Elements/button` },
      { title: 'MDN — ARIA: button role', url: `${MDN}/Web/Accessibility/ARIA/Reference/Roles/button_role` },
    ],
  },
  {
    id: 'web-a11y-002',
    topic: 'web',
    tags: ['html-a11y'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какой `alt` правильно указать у чисто декоративной картинки?',
      en: 'What `alt` should a purely decorative image have?',
    },
    options: [
      { text: { ru: 'Не указывать атрибут `alt` вообще', en: 'Omit the `alt` attribute entirely' } },
      { code: 'alt="image"' },
      { code: 'alt=""' },
      { code: 'alt="decorative"' },
      { text: { ru: 'Имя файла картинки', en: 'The image file name' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Пустой `alt=""` говорит скринридеру, что картинку можно пропустить. Если `alt` не указать совсем, многие скринридеры зачитают имя файла — бесполезный шум. Слова вроде «image» или «decorative» тоже будут прочитаны.',
          en: 'An empty `alt=""` tells screen readers the image can be skipped. If `alt` is missing, many screen readers read out the file name — useless noise. Words like “image” or “decorative” get read aloud too.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Для информативной картинки `alt` должен передавать её смысл, а не описывать сам факт, что это картинка.',
          en: 'For an informative image, `alt` should convey its meaning rather than say it’s an image.',
        },
      },
    ],
    sources: [
      { title: 'W3C WAI — Decorative Images', url: 'https://www.w3.org/WAI/tutorials/images/decorative/' },
      { title: 'MDN — <img>: alt', url: `${MDN}/Web/HTML/Reference/Elements/img#alt` },
    ],
  },
  {
    id: 'web-storage-001',
    topic: 'web',
    tags: ['storage'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Чем `sessionStorage` отличается от `localStorage`?',
      en: 'How does `sessionStorage` differ from `localStorage`?',
    },
    options: [
      {
        text: {
          ru: '`sessionStorage` отправляется на сервер с каждым запросом',
          en: '`sessionStorage` is sent to the server with every request',
        },
      },
      {
        text: {
          ru: '`sessionStorage` живёт в пределах вкладки и очищается при её закрытии, а `localStorage` хранится, пока его не удалят',
          en: '`sessionStorage` lives within a tab and is cleared when it closes, while `localStorage` persists until deleted',
        },
      },
      {
        text: {
          ru: '`sessionStorage` очищается при каждой перезагрузке страницы',
          en: '`sessionStorage` is cleared on every page reload',
        },
      },
      {
        text: {
          ru: '`localStorage` доступен всем сайтам',
          en: '`localStorage` is shared across all sites',
        },
      },
      {
        text: {
          ru: '`sessionStorage` асинхронный, а `localStorage` синхронный',
          en: '`sessionStorage` is async, while `localStorage` is sync',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Оба хранилища привязаны к origin, синхронные и хранят строки. `sessionStorage` отдельный для каждой вкладки и переживает перезагрузку, но исчезает при закрытии вкладки. `localStorage` общий для всех вкладок этого origin и не имеет срока жизни.',
          en: 'Both are scoped to the origin, synchronous, and store strings. `sessionStorage` is separate per tab and survives reloads but disappears when the tab closes. `localStorage` is shared by all tabs of that origin and never expires.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'На сервер с запросами уходят только cookie. Токены доступа в веб-хранилищах уязвимы к XSS — для сессий надёжнее `HttpOnly`-cookie.',
          en: 'Only cookies are sent to the server with requests. Access tokens in web storage are exposed to XSS — `HttpOnly` cookies are safer for sessions.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Window.sessionStorage', url: `${MDN}/Web/API/Window/sessionStorage` },
      { title: 'MDN — Window.localStorage', url: `${MDN}/Web/API/Window/localStorage` },
    ],
  },
  {
    id: 'web-tooling-001',
    topic: 'web',
    tags: ['tooling', 'performance'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что нужно, чтобы tree shaking удалил неиспользуемый код из бандла?',
      en: 'What does tree shaking need to remove unused code from a bundle?',
    },
    options: [
      {
        text: {
          ru: 'Минификация с удалением пробелов',
          en: 'Minification that strips whitespace',
        },
      },
      {
        text: {
          ru: 'Импорт через `require`',
          en: 'Importing with `require`',
        },
      },
      {
        text: {
          ru: 'Статические `import`/`export` (ES-модули) и код без побочных эффектов при импорте',
          en: 'Static `import`/`export` (ES modules) and code without side effects on import',
        },
      },
      {
        text: {
          ru: 'Включённый gzip на сервере',
          en: 'gzip enabled on the server',
        },
      },
      {
        text: {
          ru: 'Импорт всей библиотеки через `import * as lib`',
          en: 'Importing the whole library via `import * as lib`',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сборщик удаляет экспорты, которые никто не импортирует, только если граф зависимостей известен статически — это гарантируют ES-модули. С `require` такой анализ ненадёжен. Флаг `"sideEffects": false` в `package.json` подсказывает, что неиспользуемые модули можно выкинуть целиком.',
          en: 'A bundler drops exports nobody imports only if the dependency graph is known statically — ES modules guarantee that. With `require` the analysis is unreliable. The `"sideEffects": false` flag in `package.json` hints that unused modules can be dropped entirely.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `import { debounce } from 'lodash-es'; // в бандл попадёт только debounce
                                         // only debounce ends up in the bundle`,
        },
      },
    ],
    sources: [
      { title: 'MDN — Tree shaking', url: `${MDN}/Glossary/Tree_shaking` },
      { title: 'webpack — Tree Shaking', url: 'https://webpack.js.org/guides/tree-shaking/' },
    ],
  },
  {
    id: 'web-deploy-001',
    topic: 'web',
    tags: ['deploy'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'SPA задеплоили на nginx: главная открывается, а при обновлении страницы `/profile` — 404. Почему?',
      en: 'An SPA is deployed on nginx: the home page works, but refreshing `/profile` gives a 404. Why?',
    },
    options: [
      {
        text: {
          ru: 'В бандле не хватает кода страницы `/profile`',
          en: 'The bundle is missing the `/profile` page code',
        },
      },
      {
        text: {
          ru: 'Сервер ищет файл `/profile`, которого нет; нужно отдавать `index.html` для всех неизвестных путей, чтобы маршрут обработал клиентский роутер',
          en: 'The server looks for a `/profile` file that doesn’t exist; it must serve `index.html` for unknown paths so the client router handles the route',
        },
      },
      {
        text: {
          ru: 'Браузер кэширует 404',
          en: 'The browser caches the 404',
        },
      },
      {
        text: {
          ru: 'Нужно включить HTTPS',
          en: 'HTTPS must be enabled',
        },
      },
      {
        text: {
          ru: 'Роутер работает только с hash-URL вида `/#/profile`',
          en: 'The router only works with hash URLs like `/#/profile`',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Переходы внутри SPA меняют URL через History API без запросов к серверу. Но при обновлении страницы браузер запрашивает `/profile` у сервера, а такого файла нет. Решение — fallback на `index.html`.',
          en: 'Navigation inside an SPA changes the URL via the History API without hitting the server. But on refresh the browser requests `/profile` from the server, and no such file exists. The fix is a fallback to `index.html`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'text',
          source: `location / {
  try_files $uri $uri/ /index.html;
}`,
        },
        caption: {
          ru: 'Конфигурация nginx.',
          en: 'nginx configuration.',
        },
      },
    ],
    sources: [
      {
        title: 'nginx — try_files',
        url: 'https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files',
      },
      { title: 'MDN — History API', url: `${MDN}/Web/API/History_API` },
    ],
  },
  {
    id: 'web-deploy-002',
    topic: 'web',
    tags: ['deploy', 'security', 'tooling'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Можно ли хранить секретный ключ платёжного API в `VITE_PAYMENT_SECRET`?',
      en: 'Can you keep a secret payment API key in `VITE_PAYMENT_SECRET`?',
    },
    options: [
      {
        text: {
          ru: 'Да: переменные окружения не попадают в браузер',
          en: 'Yes: environment variables never reach the browser',
        },
      },
      {
        text: {
          ru: 'Да, если добавить `.env` в `.gitignore`',
          en: 'Yes, if `.env` is in `.gitignore`',
        },
      },
      {
        text: {
          ru: 'Нет: переменные с префиксом `VITE_` подставляются в клиентский бандл при сборке, и ключ увидит любой пользователь',
          en: 'No: `VITE_`-prefixed variables are inlined into the client bundle at build time, so any user can see the key',
        },
      },
      {
        text: {
          ru: 'Да, Vite шифрует такие переменные',
          en: 'Yes, Vite encrypts such variables',
        },
      },
      {
        text: {
          ru: 'Нет, потому что Vite не поддерживает переменные окружения',
          en: 'No, because Vite doesn’t support environment variables',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Всё, что доступно фронтенду, доступно и пользователю. Vite заменяет `import.meta.env.VITE_*` значениями прямо в JS-файлах при сборке — их видно в DevTools. Так же работает `NEXT_PUBLIC_*` в Next.js.',
          en: 'Anything available to the frontend is available to the user. Vite replaces `import.meta.env.VITE_*` with literal values in the JS files at build time — visible in DevTools. `NEXT_PUBLIC_*` in Next.js works the same way.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Секреты держат только на сервере, а фронтенд обращается к своему бэкенду, который уже ходит в платёжный API.',
          en: 'Secrets stay on the server only; the frontend calls your own backend, which talks to the payment API.',
        },
      },
    ],
    sources: [{ title: 'Vite — Env Variables and Modes', url: 'https://vite.dev/guide/env-and-mode' }],
  },
  {
    id: 'web-deploy-003',
    topic: 'web',
    tags: ['deploy', 'tooling'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Зачем фронтенду многоэтапная сборка Docker (multi-stage)?',
      en: 'Why use a multi-stage Docker build for a frontend?',
    },
    code: {
      lang: 'bash',
      source: `FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html`,
    },
    options: [
      {
        text: {
          ru: 'Чтобы запускать Node.js и nginx одновременно в одном контейнере',
          en: 'To run Node.js and nginx together in one container',
        },
      },
      {
        text: {
          ru: 'Чтобы собрать проект в образе с Node.js, а в итоговый образ скопировать только статику — без `node_modules` и исходников, он будет маленьким',
          en: 'To build in an image with Node.js and copy only the static files into the final image — no `node_modules` or sources, so it stays small',
        },
      },
      {
        text: {
          ru: 'Чтобы ускорить работу JavaScript в браузере',
          en: 'To make JavaScript run faster in the browser',
        },
      },
      {
        text: {
          ru: 'Чтобы шифровать исходный код',
          en: 'To encrypt the source code',
        },
      },
      {
        text: {
          ru: 'Без этого Docker не умеет копировать файлы',
          en: 'Without it Docker can’t copy files',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Первый этап содержит всё для сборки: Node.js, зависимости, исходники. Второй начинается с чистого образа nginx и забирает из первого только папку `dist`. Итоговый образ весит десятки мегабайт вместо сотен, быстрее скачивается и не содержит лишнего.',
          en: 'The first stage has everything needed to build: Node.js, dependencies, sources. The second starts from a clean nginx image and copies only the `dist` folder from the first. The final image weighs tens of megabytes instead of hundreds, pulls faster and carries nothing extra.',
        },
      },
    ],
    sources: [{ title: 'Docker — Multi-stage builds', url: 'https://docs.docker.com/build/building/multi-stage/' }],
  },
  {
    id: 'web-git-001',
    topic: 'web',
    tags: ['git'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Чем `git rebase` отличается от `git merge`?', en: 'How does `git rebase` differ from `git merge`?' },
    options: [
      {
        text: {
          ru: '`rebase` переносит коммиты поверх другой ветки, создавая новые коммиты и линейную историю; `merge` сохраняет историю и добавляет коммит слияния',
          en: '`rebase` replays commits on top of another branch, creating new commits and a linear history; `merge` keeps history and adds a merge commit',
        },
      },
      {
        text: {
          ru: '`rebase` удаляет ветку после слияния',
          en: '`rebase` deletes the branch after merging',
        },
      },
      {
        text: {
          ru: '`merge` переписывает хэши коммитов, а `rebase` — нет',
          en: '`merge` rewrites commit hashes, while `rebase` doesn’t',
        },
      },
      {
        text: {
          ru: 'Это одно и то же, `rebase` — старое название',
          en: 'They’re the same; `rebase` is an old name',
        },
      },
      {
        text: {
          ru: '`rebase` работает только с удалённым репозиторием',
          en: '`rebase` only works with a remote repository',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`rebase` переигрывает ваши коммиты поверх целевой ветки: получаются **новые** коммиты с другими хэшами и история без лишних слияний. `merge` ничего не переписывает и фиксирует слияние отдельным коммитом.',
          en: '`rebase` replays your commits on top of the target branch, producing **new** commits with different hashes and a history without extra merges. `merge` rewrites nothing and records the merge as a separate commit.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Золотое правило: не делайте `rebase` веток, которые уже запушены и используются другими, — иначе коллеги получат расходящуюся историю.',
          en: 'The golden rule: don’t rebase branches that are already pushed and used by others — your teammates will end up with diverged history.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' }],
  },
  {
    id: 'web-git-002',
    topic: 'web',
    tags: ['git'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Ошибочный коммит уже в общей ветке `main`. Как безопасно отменить его изменения?',
      en: 'A bad commit is already on the shared `main` branch. How do you safely undo its changes?',
    },
    options: [
      { code: 'git reset --hard HEAD~1 && git push --force' },
      { code: 'git revert <commit>' },
      { code: 'git checkout <commit>' },
      { code: 'git stash' },
      { code: 'git commit --amend' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git revert` создаёт **новый** коммит, который отменяет изменения указанного. История не переписывается, поэтому у коллег ничего не ломается.',
          en: '`git revert` creates a **new** commit that undoes the given one. History isn’t rewritten, so nothing breaks for your teammates.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`reset --hard` с `push --force` переписывает общую историю: у всех, кто уже забрал коммит, она разойдётся, а чужие коммиты можно потерять. `--amend` тоже переписывает последний коммит.',
          en: '`reset --hard` plus `push --force` rewrites shared history: everyone who already pulled the commit diverges, and others’ commits can be lost. `--amend` also rewrites the last commit.',
        },
      },
    ],
    sources: [
      { title: 'git — git-revert', url: 'https://git-scm.com/docs/git-revert' },
      { title: 'git — git-reset', url: 'https://git-scm.com/docs/git-reset' },
    ],
  },
];
