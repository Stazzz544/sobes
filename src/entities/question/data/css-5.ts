import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

const COLOR_OPTIONS = [
  { text: { ru: 'Красным', en: 'Red' } },
  { text: { ru: 'Зелёным', en: 'Green' } },
  { text: { ru: 'Синим', en: 'Blue' } },
  { text: { ru: 'Чёрным (цвет по умолчанию)', en: 'Black (the default color)' } },
  { text: { ru: 'Зависит от браузера', en: 'It depends on the browser' } },
] as const;

export const CSS_QUESTIONS_5: Question[] = [
  {
    id: 'css-cascade-008',
    topic: 'css',
    tags: ['cascade'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Каким цветом будет текст?', en: 'What color will the text be?' },
    code: {
      lang: 'html',
      source: `<style>
  .text { color: red !important; }
</style>

<p class="text" style="color: blue">Hello</p>`,
    },
    options: [...COLOR_OPTIONS],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Инлайн-стиль сильнее любого селектора, но **`!important`** проверяется раньше специфичности: важное объявление из таблицы стилей побеждает обычный инлайн-стиль. Перебить его можно только другим `!important` — например, инлайновым. Отсюда «гонка вооружений» в проектах, где `!important` ставят по привычке; для своих правил есть каскадные слои.',
          en: 'An inline style beats any selector, but **`!important`** is checked before specificity: an important declaration from a stylesheet beats a normal inline style. Only another `!important` can override it — an inline one, for example. That’s how the “arms race” starts in projects that use `!important` by habit; cascade layers exist for your own rules.',
        },
      },
    ],
    sources: [{ title: 'MDN — !important', url: `${MDN}/important` }],
    verify: { kind: 'css-computed', selector: '.text', property: 'color', expected: 'rgb(255, 0, 0)' },
  },
  {
    id: 'css-cascade-009',
    topic: 'css',
    tags: ['cascade', 'selectors'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Каким цветом будет текст абзаца?', en: 'What color will the paragraph text be?' },
    code: {
      lang: 'html',
      source: `<style>
  :where(.card) p { color: red; }
  p { color: green; }
</style>

<div class="card"><p>Text</p></div>`,
    },
    options: [...COLOR_OPTIONS],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`:where()` всегда даёт нулевую специфичность своему содержимому, поэтому у `:where(.card) p` она такая же, как у `p`, — `(0, 0, 1)`. При равенстве побеждает правило ниже — зелёный. Этим пользуются в библиотеках и сбросах стилей: их правила легко перебить без борьбы за специфичность. `:is()` наоборот берёт специфичность самого сильного аргумента.',
          en: '`:where()` always gives its contents zero specificity, so `:where(.card) p` has the same specificity as `p` — `(0, 0, 1)`. On a tie the later rule wins — green. Libraries and resets use this: their rules are easy to override without a specificity fight. `:is()`, by contrast, takes the specificity of its strongest argument.',
        },
      },
    ],
    sources: [{ title: 'MDN — :where()', url: `${MDN}/:where` }],
    verify: { kind: 'css-computed', selector: 'p', property: 'color', expected: 'rgb(0, 128, 0)' },
  },
  {
    id: 'css-selectors-005',
    topic: 'css',
    tags: ['selectors'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой пункт станет красным?', en: 'Which item turns red?' },
    code: {
      lang: 'html',
      source: `<style>
  li:nth-child(2 of .done) { color: red; }
</style>

<ul>
  <li class="done">A</li>
  <li>B</li>
  <li class="done">C</li>
</ul>`,
    },
    options: [{ code: 'A' }, { code: 'B' }, { code: 'C' }, { text: { ru: 'Никакой', en: 'None' } }, { text: { ru: 'A и C', en: 'A and C' } }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Синтаксис `:nth-child(An+B of S)` сначала отбирает соседей, подходящих под селектор `S`, и уже среди них считает позицию: второй элемент с классом `done` — это `C`. Обычный `li.done:nth-child(2)` искал бы второй `li` вообще (это `B`) и проверял бы, есть ли у него класс, — и не нашёл бы ничего. Удобно для зебры по отфильтрованным строкам таблицы.',
          en: 'The `:nth-child(An+B of S)` syntax first picks siblings matching selector `S` and counts positions among them: the second element with class `done` is `C`. A plain `li.done:nth-child(2)` would look for the second `li` overall (`B`) and check its class — finding nothing. Handy for zebra stripes over filtered table rows.',
        },
      },
    ],
    sources: [{ title: 'MDN — :nth-child(): the of <selector> syntax', url: `${MDN}/:nth-child` }],
    verify: {
      kind: 'css-computed',
      selector: 'li:nth-child(3)',
      property: 'color',
      expected: 'rgb(255, 0, 0)',
      also: [{ selector: 'li:nth-child(1)', property: 'color', expected: 'rgb(0, 0, 0)' }],
    },
  },
  {
    id: 'css-box-006',
    topic: 'css',
    tags: ['box-model'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'На каком расстоянии от верха страницы окажется `.second`?',
      en: 'How far from the top of the page will `.second` be?',
    },
    code: {
      lang: 'html',
      source: `<style>
  body { margin: 0; }
  .first { height: 10px; margin-bottom: 30px; }
  .second { height: 10px; margin-top: 20px; }
</style>

<div class="first"></div>
<div class="second"></div>`,
    },
    options: [{ code: '60px' }, { code: '40px' }, { code: '30px' }, { code: '50px' }, { code: '20px' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вертикальные отступы соседних блоков **схлопываются**: между ними остаётся больший из двух — 30px, а не 50. Значит, `.second` начинается на 10 + 30 = 40px. Схлопывание бывает только по вертикали и только у обычных блоков — во flex- и grid-контейнерах отступы складываются. Поэтому в компонентах часто задают отступы только в одну сторону или используют `gap`.',
          en: 'Vertical margins of adjacent blocks **collapse**: only the larger one remains between them — 30px, not 50. So `.second` starts at 10 + 30 = 40px. Collapsing happens only vertically and only for normal blocks — in flex and grid containers margins add up. That’s why components often set margins in one direction only or use `gap`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Mastering margin collapsing', url: `${MDN}/CSS_box_model/Mastering_margin_collapsing` }],
    verify: { kind: 'css-computed', selector: '.second', property: 'rect.top' },
  },
  {
    id: 'css-flex-007',
    topic: 'css',
    tags: ['flexbox'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'На каком расстоянии от левого края окажется `.menu`?',
      en: 'How far from the left edge will `.menu` be?',
    },
    code: {
      lang: 'html',
      source: `<style>
  body { margin: 0; }
  .nav { display: flex; width: 300px; }
  .logo { width: 50px; }
  .menu { width: 100px; margin-left: auto; }
</style>

<nav class="nav">
  <div class="logo">Logo</div>
  <div class="menu">Menu</div>
</nav>`,
    },
    options: [{ code: '50px' }, { code: '100px' }, { code: '150px' }, { code: '200px' }, { code: '0px' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Во flex-контейнере `margin: auto` забирает всё свободное место по своей оси. Свободно 300 − 50 − 100 = 150px, и они уходят в левый отступ меню, прижимая его вправо: 50 + 150 = 200px. Это самый простой способ разнести логотип и меню по краям шапки без `justify-content` для всех элементов.',
          en: 'In a flex container `margin: auto` takes all free space along its axis. There’s 300 − 50 − 100 = 150px free, and it goes into the menu’s left margin, pushing it right: 50 + 150 = 200px. It’s the simplest way to split a logo and menu to the header’s edges without `justify-content` for everything.',
        },
      },
    ],
    sources: [{ title: 'MDN — Aligning items in a flex container: auto margins', url: `${MDN}/CSS_flexible_box_layout/Aligning_items_in_a_flex_container` }],
    verify: { kind: 'css-computed', selector: '.menu', property: 'rect.left' },
  },
  {
    id: 'css-grid-005',
    topic: 'css',
    tags: ['css-grid'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой ширины будет `.main`?', en: 'How wide will `.main` be?' },
    code: {
      lang: 'html',
      source: `<style>
  .grid { display: grid; width: 500px; grid-template-columns: 100px 1fr 100px; }
  .main { grid-column: 2 / -1; }
</style>

<div class="grid">
  <div class="main">Main</div>
</div>`,
    },
    options: [{ code: '300px' }, { code: '400px' }, { code: '500px' }, { code: '100px' }, { code: '200px' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Средняя колонка `1fr` получает остаток: 500 − 100 − 100 = 300px. `grid-column: 2 / -1` растягивает элемент от второй линии до последней, то есть на две колонки: 300 + 100 = 400px. Отрицательные номера линий считаются с конца, поэтому `-1` всегда последняя линия явной сетки, сколько бы колонок ни было.',
          en: 'The middle `1fr` column gets the rest: 500 − 100 − 100 = 300px. `grid-column: 2 / -1` stretches the item from the second line to the last, i.e. across two columns: 300 + 100 = 400px. Negative line numbers count from the end, so `-1` is always the explicit grid’s last line, however many columns there are.',
        },
      },
    ],
    sources: [{ title: 'MDN — grid-column', url: `${MDN}/grid-column` }],
    verify: { kind: 'css-computed', selector: '.main', property: 'rect.width' },
  },
  {
    id: 'css-units-006',
    topic: 'css',
    tags: ['css-units', 'responsive'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой ширины будет `.box`?', en: 'How wide will `.box` be?' },
    code: {
      lang: 'html',
      source: `<style>
  .wrapper { width: 400px; }
  .box { width: min(90%, 600px); }
</style>

<div class="wrapper"><div class="box"></div></div>`,
    },
    options: [{ code: '600px' }, { code: '360px' }, { code: '400px' }, { code: '540px' }, { code: '90px' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`min()` выбирает меньшее из значений: 90% от 400px — это 360px, что меньше 600px. На широком экране сработало бы 600px. Так одной строкой пишут «резиновый, но не шире N» без медиазапросов. `max()` задаёт нижнюю границу, а `clamp(min, ideal, max)` — обе сразу.',
          en: '`min()` picks the smaller value: 90% of 400px is 360px, which is less than 600px. On a wide screen 600px would apply. That’s the one-liner for “fluid, but no wider than N” without media queries. `max()` sets a lower bound, and `clamp(min, ideal, max)` sets both.',
        },
      },
    ],
    sources: [{ title: 'MDN — min()', url: `${MDN}/min` }],
    verify: { kind: 'css-computed', selector: '.box', property: 'rect.width' },
  },
  {
    id: 'css-modern-006',
    topic: 'css',
    tags: ['modern-css', 'responsive'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой высоты будет `.video`?', en: 'How tall will `.video` be?' },
    code: {
      lang: 'html',
      source: `<style>
  .video { width: 320px; aspect-ratio: 16 / 9; }
</style>

<div class="video"></div>`,
    },
    options: [{ code: '180px' }, { code: '320px' }, { code: '0px' }, { code: '569px' }, { code: '160px' }],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`aspect-ratio` вычисляет недостающий размер по пропорции: 320 × 9 / 16 = 180px. Раньше для этого нужен был трюк с `padding-top: 56.25%` и абсолютным позиционированием. Пропорция резервирует место под видео и картинки до загрузки и спасает от сдвигов макета.',
          en: '`aspect-ratio` computes the missing dimension from the ratio: 320 × 9 / 16 = 180px. Previously this needed the `padding-top: 56.25%` trick with absolute positioning. The ratio reserves space for videos and images before they load and prevents layout shifts.',
        },
      },
    ],
    sources: [{ title: 'MDN — aspect-ratio', url: `${MDN}/aspect-ratio` }],
    verify: { kind: 'css-computed', selector: '.video', property: 'rect.height' },
  },
  {
    id: 'css-pos-004',
    topic: 'css',
    tags: ['positioning', 'box-model'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой ширины будет `.overlay`?', en: 'How wide will `.overlay` be?' },
    code: {
      lang: 'html',
      source: `<style>
  .card { position: relative; width: 200px; padding: 20px; border: 5px solid; }
  .overlay { position: absolute; inset: 0; }
</style>

<div class="card"><div class="overlay"></div></div>`,
    },
    options: [{ code: '200px' }, { code: '240px' }, { code: '250px' }, { code: '210px' }, { code: '0px' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Абсолютный элемент позиционируется относительно **padding box** родителя: внутри рамки, но вместе с внутренними отступами. `inset: 0` — сокращение для `top/right/bottom/left: 0`, поэтому слой растягивается на 200 + 20 + 20 = 240px, не заходя на рамку. Так делают затемнение карточки или кликабельную область на всю карточку.',
          en: 'An absolute element is positioned relative to the parent’s **padding box**: inside the border, but including the padding. `inset: 0` is shorthand for `top/right/bottom/left: 0`, so the layer stretches to 200 + 20 + 20 = 240px without covering the border. It’s used for card overlays or a full-card clickable area.',
        },
      },
    ],
    sources: [{ title: 'MDN — Containing block', url: `${MDN}/CSS_display/Containing_block` }],
    verify: { kind: 'css-computed', selector: '.overlay', property: 'rect.width' },
  },
  {
    id: 'css-anim-004',
    topic: 'css',
    tags: ['animations', 'modern-css'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Всплывающее окно появляется сменой `display: none` → `block`, и `transition: opacity` не срабатывает при появлении. Что поможет в современном CSS?',
      en: 'A popup appears by switching `display: none` → `block`, and `transition: opacity` doesn’t run on appearance. What helps in modern CSS?',
    },
    code: {
      lang: 'css',
      source: `.popup { opacity: 1; transition: opacity 0.3s; }
.popup[hidden] { display: none; opacity: 0; }`,
    },
    options: [
      { text: { ru: 'Увеличить длительность перехода', en: 'Increase the transition duration' } },
      {
        code: '@starting-style {\n  .popup { opacity: 0; }\n}',
      },
      { code: '.popup { will-change: opacity; }' },
      { code: '.popup { animation-delay: 0s; }' },
      { text: { ru: 'Это невозможно без JavaScript', en: 'Impossible without JavaScript' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У элемента, который только что появился, нет «предыдущего» стиля — переходу не от чего стартовать, и он показывается сразу. `@starting-style` задаёт стиль, с которого начнётся переход при первом отображении. Для обратной анимации при скрытии добавляют `transition-behavior: allow-discrete` к `display`, чтобы элемент не исчезал до окончания перехода.',
          en: 'A freshly displayed element has no “previous” style — the transition has nothing to start from, so it appears instantly. `@starting-style` defines the style the transition starts from on first display. For the reverse animation on hide, add `transition-behavior: allow-discrete` for `display` so the element doesn’t vanish before the transition ends.',
        },
      },
    ],
    sources: [
      { title: 'MDN — @starting-style', url: `${MDN}/@starting-style` },
      { title: 'MDN — transition-behavior', url: `${MDN}/transition-behavior` },
    ],
  },
];
