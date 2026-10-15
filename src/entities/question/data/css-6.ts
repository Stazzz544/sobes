import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

const COLOR_OPTIONS = [
  { text: { ru: 'Красным', en: 'Red' } },
  { text: { ru: 'Зелёным', en: 'Green' } },
  { text: { ru: 'Синим', en: 'Blue' } },
  { text: { ru: 'Чёрным (цвет по умолчанию)', en: 'Black (the default color)' } },
  { text: { ru: 'Зависит от браузера', en: 'It depends on the browser' } },
] as const;

export const CSS_QUESTIONS_6: Question[] = [
  {
    id: 'css-cascade-010',
    topic: 'css',
    tags: ['cascade'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Каким цветом будет текст `.child`?', en: 'What color will the `.child` text be?' },
    code: {
      lang: 'html',
      source: `<style>
  .parent { color: red; }
  .child { color: initial; }
</style>

<div class="parent">
  <p class="child">Hello</p>
</div>`,
    },
    options: [...COLOR_OPTIONS],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`initial` — это начальное значение свойства **по спецификации**, а не «как у родителя» и не «как было бы без моего правила». Для `color` это цвет текста по умолчанию, поэтому наследование от красного родителя обрывается. Нужно взять значение родителя — `inherit`; отменить свои правила и вернуться к стилям браузера — `revert`; «наследуй, если свойство наследуется, иначе начальное» — `unset`.',
          en: '`initial` is the property’s initial value **per the spec**, not “like the parent” and not “as if my rule didn’t exist”. For `color` that’s the default text color, so inheritance from the red parent is cut off. To take the parent’s value use `inherit`; to undo your rules and fall back to browser styles use `revert`; for “inherit if the property is inherited, otherwise initial” use `unset`.',
        },
      },
    ],
    sources: [{ title: 'MDN — initial', url: `${MDN}/initial` }],
    verify: { kind: 'css-computed', selector: '.child', property: 'color', expected: 'rgb(0, 0, 0)' },
  },
  {
    id: 'css-cascade-011',
    topic: 'css',
    tags: ['cascade'],
    difficulty: 1,
    popular: false,
    prompt: { ru: 'Какого цвета будет рамка?', en: 'What color will the border be?' },
    code: {
      lang: 'html',
      source: `<style>
  .box { color: green; border: 2px solid; }
</style>

<div class="box">Box</div>`,
    },
    options: [...COLOR_OPTIONS],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Если цвет рамки не указан, она берёт `currentColor` — текущий цвет текста элемента. То же у `outline`, `text-decoration` и тени. Отсюда удобный приём: SVG-иконки с `fill="currentColor"` и рамки кнопок сами перекрашиваются вместе с текстом при наведении и в тёмной теме — достаточно поменять одно свойство `color`.',
          en: 'If the border color isn’t set, it uses `currentColor` — the element’s current text color. The same goes for `outline`, `text-decoration` and shadows. Hence a handy trick: SVG icons with `fill="currentColor"` and button borders recolor along with the text on hover and in dark mode — you change just one `color` property.',
        },
      },
    ],
    sources: [{ title: 'MDN — currentColor', url: `${MDN}/color_value#currentcolor_keyword` }],
    verify: { kind: 'css-computed', selector: '.box', property: 'border-top-color', expected: 'rgb(0, 128, 0)' },
  },
  {
    id: 'css-selectors-006',
    kind: 'output',
    topic: 'css',
    tags: ['selectors'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В абзаце только пробел. Что вернёт `p.matches(":empty")` в Chrome? Впишите ответ.',
      en: 'The paragraph contains just a space. What does `p.matches(":empty")` return in Chrome? Type the answer.',
    },
    code: {
      lang: 'html',
      source: `<style>
  p:empty { display: none; }
</style>

<p> </p>`,
    },
    answers: ['false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`:empty` срабатывает, только если внутри нет **ничего**, даже пробела или перевода строки: текстовый узел из пробела уже содержимое. Поэтому правило «прятать пустые блоки» часто не работает, когда шаблон оставляет отступы в разметке. Черновик спецификации Selectors 4 предлагает игнорировать пробелы, но браузеры так не делают. Надёжнее не выводить элемент вовсе или убрать пробелы в шаблоне.',
          en: '`:empty` matches only when there’s **nothing** inside, not even a space or a newline: a whitespace text node is already content. That’s why a “hide empty blocks” rule often fails when a template leaves indentation in the markup. The Selectors 4 draft proposes ignoring whitespace, but browsers don’t do that. It’s more reliable not to render the element at all or to strip whitespace in the template.',
        },
      },
    ],
    sources: [{ title: 'MDN — :empty', url: `${MDN}/:empty` }],
    verify: { kind: 'dom-probe', selector: 'p', property: "js:el.matches(':empty')" },
  },
  {
    id: 'css-box-007',
    topic: 'css',
    tags: ['box-model'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой ширины будет `.chip`?', en: 'How wide will `.chip` be?' },
    code: {
      lang: 'html',
      source: `<style>
  .chip { box-sizing: border-box; width: 50px; padding: 0 40px; }
</style>

<div class="chip"></div>`,
    },
    options: [{ code: '50px' }, { code: '80px' }, { code: '130px' }, { code: '10px' }, { code: '0px' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При `border-box` в `width` входят и отступы, и рамка, а контенту достаётся остаток: 50 − 80 = −30. Отрицательной области контента не бывает — она становится 0, а внутренние отступы не сжимаются, поэтому элемент шире заданного: 0 + 40 + 40 = 80px. Так кнопка с большим `padding` «не слушается» `width`; задавайте отступы с учётом минимальной ширины или используйте `min-width`.',
          en: 'With `border-box`, `width` includes padding and border, and the content gets what’s left: 50 − 80 = −30. A content area can’t be negative — it becomes 0, and padding doesn’t shrink, so the element is wider than specified: 0 + 40 + 40 = 80px. That’s why a button with large `padding` “ignores” `width`; size padding with the minimum width in mind or use `min-width`.',
        },
      },
    ],
    sources: [{ title: 'MDN — box-sizing', url: `${MDN}/box-sizing` }],
    verify: { kind: 'css-computed', selector: '.chip', property: 'rect.width' },
  },
  {
    id: 'css-flex-008',
    kind: 'output',
    topic: 'css',
    tags: ['flexbox'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой ширины будет каждая карточка? Впишите значение в px.', en: 'How wide will each card be? Type the value in px.' },
    code: {
      lang: 'html',
      source: `<style>
  .row { display: flex; gap: 30px; width: 300px; }
  .card { flex: 1; }
</style>

<div class="row">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>`,
    },
    answers: ['80px', '80'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`gap` вычитается из свободного места до того, как оно делится между элементами: два промежутка по 30px оставляют 240px, и `flex: 1` делит их поровну — по 80px. В отличие от `margin`, `gap` ставится только **между** элементами, без лишнего отступа у краёв, и не требует обнулять отступ у последнего элемента.',
          en: '`gap` is subtracted from the free space before it’s shared among items: two 30px gaps leave 240px, and `flex: 1` splits it evenly — 80px each. Unlike `margin`, `gap` goes only **between** items, with no extra space at the edges, and you don’t need to reset the last item’s margin.',
        },
      },
    ],
    sources: [{ title: 'MDN — gap', url: `${MDN}/gap` }],
    verify: { kind: 'css-computed', selector: '.card', property: 'rect.width' },
  },
  {
    id: 'css-grid-006',
    topic: 'css',
    tags: ['css-grid'],
    difficulty: 1,
    popular: false,
    prompt: { ru: 'На каком расстоянии от левого края окажется `.main`?', en: 'How far from the left edge will `.main` be?' },
    code: {
      lang: 'html',
      source: `<style>
  body { margin: 0; }
  .layout {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-areas:
      'header header'
      'aside main';
  }
  .header { grid-area: header; }
  .aside { grid-area: aside; }
  .main { grid-area: main; }
</style>

<div class="layout">
  <div class="main">Main</div>
  <div class="header">Header</div>
  <div class="aside">Aside</div>
</div>`,
    },
    options: [{ code: '0px' }, { code: '100px' }, { code: '50%' }, { code: '200px' }, { code: '300px' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`grid-template-areas` рисует раскладку «картой»: `main` занимает вторую колонку второй строки, после колонки `aside` шириной 100px. Порядок элементов в разметке на размещение не влияет — каждый встаёт в свою именованную область. Это удобно для адаптивности: на мобильном достаточно переписать карту в одну колонку. Но порядок чтения и фокуса остаётся по разметке — его не стоит сильно расходить с визуальным.',
          en: '`grid-template-areas` draws the layout as a “map”: `main` takes the second column of the second row, after the 100px `aside` column. The order of elements in the markup doesn’t affect placement — each goes to its named area. That’s handy for responsiveness: on mobile you just rewrite the map as one column. But reading and focus order follow the markup — don’t let it drift far from the visual order.',
        },
      },
    ],
    sources: [{ title: 'MDN — grid-template-areas', url: `${MDN}/grid-template-areas` }],
    verify: { kind: 'css-computed', selector: '.main', property: 'rect.left' },
  },
  {
    id: 'css-pos-005',
    topic: 'css',
    tags: ['positioning'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой ширины будет `.popup` (окно шире 800px)?', en: 'How wide will `.popup` be (the window is wider than 800px)?' },
    code: {
      lang: 'html',
      source: `<style>
  .popup { position: absolute; }
  .content { width: 50px; height: 20px; }
</style>

<div class="popup">
  <div class="content"></div>
</div>`,
    },
    options: [{ code: '50px' }, { code: '100%' }, { code: '0px' }, { code: '800px' }, { code: '20px' }],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обычный блок растягивается на всю ширину родителя, а абсолютно позиционированный без `width` **сжимается под содержимое** (shrink-to-fit) — здесь до 50px. Так же ведут себя `float`, `inline-block` и элементы flex-контейнера. Поэтому выпадающие меню и тултипы без явной ширины подстраиваются под текст, а если нужно растянуть — задают `left` и `right` (или `inset`) одновременно.',
          en: 'A normal block stretches to the parent’s full width, but an absolutely positioned one without `width` **shrinks to fit its content** — here 50px. `float`, `inline-block` and flex items behave the same way. That’s why dropdowns and tooltips without an explicit width fit their text, and to stretch one you set `left` and `right` (or `inset`) together.',
        },
      },
    ],
    sources: [{ title: 'MDN — position: absolute', url: `${MDN}/position` }],
    verify: { kind: 'css-computed', selector: '.popup', property: 'rect.width' },
  },
  {
    id: 'css-units-007',
    topic: 'css',
    tags: ['css-units', 'cascade'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Чему равен вычисленный `line-height` у `.a .child` и `.b .child`?', en: 'What is the computed `line-height` of `.a .child` and `.b .child`?' },
    code: {
      lang: 'html',
      source: `<style>
  .a { font-size: 10px; line-height: 1.5; }
  .b { font-size: 10px; line-height: 1.5em; }
  .child { font-size: 20px; }
</style>

<div class="a"><p class="child">Text</p></div>
<div class="b"><p class="child">Text</p></div>`,
    },
    options: [
      { text: { ru: '30px и 30px', en: '30px and 30px' } },
      { text: { ru: '15px и 15px', en: '15px and 15px' } },
      { text: { ru: '30px и 15px', en: '30px and 15px' } },
      { text: { ru: '15px и 30px', en: '15px and 30px' } },
      { text: { ru: '1.5 и 1.5em', en: '1.5 and 1.5em' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Число без единиц наследуется **как множитель**: у `.a .child` высота строки считается от его собственного шрифта — 20 × 1.5 = 30px. Значение в `em` вычисляется **у родителя** и наследуется уже готовыми пикселями: 10 × 1.5 = 15px, и крупный текст в `.b` слипается. Поэтому `line-height` задают безразмерным числом.',
          en: 'A unitless number is inherited **as a multiplier**: `.a .child` computes its line height from its own font — 20 × 1.5 = 30px. An `em` value is computed **on the parent** and inherited as ready-made pixels: 10 × 1.5 = 15px, so the larger text in `.b` gets cramped. That’s why `line-height` is set as a unitless number.',
        },
      },
    ],
    sources: [{ title: 'MDN — line-height: prefer unitless numbers', url: `${MDN}/line-height#prefer_unitless_numbers_for_line-height_values` }],
    verify: {
      kind: 'css-computed',
      selector: '.a .child',
      property: 'line-height',
      expected: '30px',
      also: [{ selector: '.b .child', property: 'line-height', expected: '15px' }],
    },
  },
  {
    id: 'css-modern-007',
    topic: 'css',
    tags: ['modern-css'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Страница на иврите (`dir="rtl"`). С какой стороны окажется отступ у `.icon`?',
      en: 'A Hebrew page (`dir="rtl"`). Which side gets the margin on `.icon`?',
    },
    code: {
      lang: 'html',
      source: `<style>
  .icon { margin-inline-start: 20px; }
</style>

<div dir="rtl">
  <span class="icon">★</span>
</div>`,
    },
    options: [
      { text: { ru: 'Слева, как всегда', en: 'On the left, as always' } },
      { text: { ru: 'Справа — там, где в RTL начинается строка', en: 'On the right — where an RTL line starts' } },
      { text: { ru: 'Сверху', en: 'On top' } },
      { text: { ru: 'С обеих сторон по 10px', en: '10px on each side' } },
      { text: { ru: 'Отступа не будет: свойство не работает у `span`', en: 'No margin: the property doesn’t work on `span`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Логические свойства привязаны к направлению текста, а не к сторонам экрана: `inline-start` — начало строки. В левосторонних языках это лево, в RTL — право. Вычисленный `margin-right` здесь 20px, а `margin-left` — 0. Если вёрстка построена на `margin-inline`, `padding-inline-start`, `inset-inline-end`, поддержка арабского и иврита не требует отдельных стилей.',
          en: 'Logical properties follow text direction, not screen sides: `inline-start` is where a line begins. In left-to-right languages that’s the left, in RTL the right. The computed `margin-right` here is 20px and `margin-left` is 0. If the layout is built on `margin-inline`, `padding-inline-start`, `inset-inline-end`, supporting Arabic and Hebrew needs no separate styles.',
        },
      },
    ],
    sources: [{ title: 'MDN — CSS logical properties and values', url: `${MDN}/CSS_logical_properties_and_values` }],
    verify: {
      kind: 'css-computed',
      selector: '.icon',
      property: 'margin-right',
      expected: '20px',
      also: [{ selector: '.icon', property: 'margin-left', expected: '0px' }],
    },
  },
  {
    id: 'css-anim-005',
    topic: 'css',
    tags: ['animations', 'responsive'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Пользователь включил в системе «Уменьшить движение». Как уважать эту настройку в CSS?',
      en: 'A user turned on “Reduce motion” in their OS. How do you respect that setting in CSS?',
    },
    options: [
      { text: { ru: 'Никак: CSS не знает о системных настройках', en: 'You can’t: CSS doesn’t know about OS settings' } },
      {
        text: {
          ru: 'Медиазапрос `@media (prefers-reduced-motion: reduce)`, внутри которого анимации отключаются или упрощаются',
          en: 'A `@media (prefers-reduced-motion: reduce)` query that disables or simplifies animations',
        },
      },
      { text: { ru: 'Проверять `navigator.userAgent`', en: 'Check `navigator.userAgent`' } },
      { text: { ru: 'Сделать все анимации короче 1 секунды', en: 'Make every animation shorter than 1 second' } },
      { text: { ru: 'Убрать анимации только на мобильных', en: 'Remove animations on mobile only' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У людей с вестибулярными нарушениями крупные движения — параллакс, масштабирование, «улёт» блоков — вызывают головокружение. Системная настройка доступна в CSS через `prefers-reduced-motion`: внутри `@media (prefers-reduced-motion: reduce)` анимации убирают или заменяют плавным появлением. В JS то же значение читается через `matchMedia`. Пропадать должны сами движения, а не смысл — например, состояние «загрузка».',
          en: 'For people with vestibular disorders, large motion — parallax, zooming, flying blocks — causes dizziness. The OS setting is exposed to CSS as `prefers-reduced-motion`: inside `@media (prefers-reduced-motion: reduce)` animations are removed or replaced with a gentle fade. JS reads the same value via `matchMedia`. The motion should go away, not the meaning — a “loading” state, for instance.',
        },
      },
    ],
    sources: [{ title: 'MDN — prefers-reduced-motion', url: `${MDN}/@media/prefers-reduced-motion` }],
  },
];
