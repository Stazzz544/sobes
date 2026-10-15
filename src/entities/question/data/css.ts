import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const CSS_QUESTIONS: Question[] = [
  {
    id: 'css-cascade-001',
    topic: 'css',
    tags: ['cascade', 'selectors'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Каким цветом будет ссылка?', en: 'What color will the link be?' },
    code: {
      lang: 'html',
      source: `<style>
  ul li a { color: red; }
  .menu a { color: green; }
  a:hover, a.active { color: blue; }
</style>

<ul class="menu">
  <li><a class="active" href="#">Home</a></li>
</ul>`,
    },
    options: [
      { text: { ru: 'Красным', en: 'Red' } },
      { text: { ru: 'Зелёным', en: 'Green' } },
      { text: { ru: 'Синим', en: 'Blue' } },
      { text: { ru: 'Синим только при наведении', en: 'Blue only on hover' } },
      { text: { ru: 'Цветом ссылки по умолчанию', en: 'The default link color' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[specificity|Специфичность]] `ul li a` — `(0, 0, 3)`, `.menu a` — `(0, 1, 1)`. В списке селекторов каждый считается **отдельно**: с элементом совпадает `a.active` со специфичностью `(0, 1, 1)`, как у `.menu a`. При равной специфичности побеждает правило ниже по коду — синий. Наведение не нужно: сработала вторая часть списка.',
          en: 'The [[specificity|specificity]] of `ul li a` is `(0, 0, 3)` and of `.menu a` is `(0, 1, 1)`. In a selector list each selector counts **separately**: `a.active` matches with `(0, 1, 1)`, same as `.menu a`. With equal specificity the later rule wins — blue. No hover needed: the second part of the list matched.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Разряды сравниваются слева направо, поэтому три селектора типа никогда не перебьют один класс. Порядок в коде решает, только когда совпадают важность, слой и специфичность.',
          en: 'Components are compared left to right, so three type selectors never beat a single class. Source order only decides when importance, layer and specificity are all equal.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Specificity', url: `${MDN}/Web/CSS/Specificity` },
      { title: 'MDN — Selector list', url: `${MDN}/Web/CSS/Selector_list` },
    ],
    verify: { kind: 'css-computed', selector: 'a', property: 'color', expected: 'rgb(0, 0, 255)' },
  },
  {
    id: 'css-cascade-002',
    topic: 'css',
    tags: ['cascade', 'selectors'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какая специфичность у этого селектора?', en: 'What is the specificity of this selector?' },
    code: {
      lang: 'css',
      source: `#nav .item > a:hover { }`,
    },
    options: [{ code: '(1, 1, 2)' }, { code: '(0, 3, 1)' }, { code: '(1, 2, 0)' }, { code: '(1, 1, 1)' }, { code: '(1, 2, 1)' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[specificity|Специфичность]] — три разряда: ID; классы, атрибуты и псевдоклассы; типы и псевдоэлементы. `#nav` даёт единицу в первый разряд, `.item` и `:hover` — две во второй (псевдокласс считается как класс), `a` — одну в третий. Итого `(1, 2, 1)`.',
          en: '[[specificity|Specificity]] has three components: IDs; classes, attributes and pseudo-classes; types and pseudo-elements. `#nav` adds one to the first, `.item` and `:hover` add two to the second (a pseudo-class counts as a class), `a` adds one to the third. Total: `(1, 2, 1)`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Частые ошибки — посчитать `:hover` как тип (выходит `(1, 1, 2)`) или забыть о нём. Комбинаторы `>`, `+`, `~`, пробел и универсальный селектор `*` на специфичность не влияют.',
          en: 'Common mistakes are counting `:hover` as a type (giving `(1, 1, 2)`) or forgetting it. Combinators `>`, `+`, `~`, the descendant space and the universal selector `*` add nothing.',
        },
      },
    ],
    sources: [{ title: 'MDN — Specificity', url: `${MDN}/Web/CSS/Specificity` }],
  },
  {
    id: 'css-cascade-003',
    topic: 'css',
    tags: ['cascade', 'selectors'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Каким цветом будет текст абзаца?', en: 'What color will the paragraph text be?' },
    code: {
      lang: 'html',
      source: `<style>
  :is(#main, .x) p { color: blue; }
  :where(#main) p { color: red; }
  p.note { color: green; }
</style>

<div id="main">
  <p class="note">Text</p>
</div>`,
    },
    options: [
      { text: { ru: 'Синим', en: 'Blue' } },
      { text: { ru: 'Красным', en: 'Red' } },
      { text: { ru: 'Зелёным', en: 'Green' } },
      { text: { ru: 'Зелёным: у `:is()` нулевая специфичность', en: 'Green: `:is()` has zero specificity' } },
      { text: { ru: 'Красным: `:where()` весит как ID', en: 'Red: `:where()` weighs as much as an ID' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`:is()` получает [[specificity|специфичность]] **самого специфичного** аргумента — здесь `#main`, независимо от того, какой аргумент совпал. Итого `:is(#main, .x) p` = `(1, 0, 1)`, это больше, чем `(0, 1, 1)` у `p.note`. Поэтому синий, хотя правило объявлено первым.',
          en: '`:is()` takes the [[specificity|specificity]] of its **most specific** argument — `#main` here, whichever argument actually matched. So `:is(#main, .x) p` is `(1, 0, 1)`, higher than `(0, 1, 1)` for `p.note`. Blue wins even though the rule comes first.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`:where()` всегда даёт **нулевую** специфичность: `:where(#main) p` = `(0, 0, 1)`. Поэтому `:where()` любят библиотеки и сбросы стилей — их правила легко переопределить любым классом.',
          en: '`:where()` always has **zero** specificity: `:where(#main) p` is `(0, 0, 1)`. That’s why libraries and resets like `:where()` — any class can override their rules.',
        },
      },
    ],
    sources: [
      { title: 'MDN — :is()', url: `${MDN}/Web/CSS/:is` },
      { title: 'MDN — :where()', url: `${MDN}/Web/CSS/:where` },
    ],
    verify: { kind: 'css-computed', selector: 'p', property: 'color', expected: 'rgb(0, 0, 255)' },
  },
  {
    id: 'css-cascade-004',
    topic: 'css',
    tags: ['cascade'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какое из этих свойств наследуется потомками по умолчанию?',
      en: 'Which of these properties is inherited by default?',
    },
    options: [{ code: 'margin' }, { code: 'color' }, { code: 'border' }, { code: 'padding' }, { code: 'background-color' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Наследуются в основном свойства текста: `color`, `font-*`, `line-height`, `letter-spacing`, `text-align`, а также `visibility` и `cursor`. Свойства бокса — `margin`, `padding`, `border`, `background`, `width` — не наследуются: каждый элемент получает их начальное значение.',
          en: 'Mostly text properties are inherited: `color`, `font-*`, `line-height`, `letter-spacing`, `text-align`, plus `visibility` and `cursor`. Box properties — `margin`, `padding`, `border`, `background`, `width` — are not: each element gets their initial value.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Фон родителя «виден» сквозь потомка не из-за наследования: у потомка `background-color` по умолчанию `transparent`. Унаследовать любое свойство явно можно значением `inherit`.',
          en: 'A parent’s background shows through a child not because of inheritance: the child’s `background-color` defaults to `transparent`. Any property can be inherited explicitly with `inherit`.',
        },
      },
    ],
    sources: [{ title: 'MDN — Inheritance', url: `${MDN}/Web/CSS/Inheritance` }],
    verify: {
      kind: 'css-computed',
      html: `<style>.parent { color: green; padding: 10px; border: 1px solid red; }</style>
<div class="parent"><span class="child">Text</span></div>`,
      selector: '.child',
      property: 'color',
      expected: 'rgb(0, 128, 0)',
      also: [
        { selector: '.child', property: 'padding-top', expected: '0px' },
        { selector: '.child', property: 'border-top-width', expected: '0px' },
      ],
    },
  },
  {
    id: 'css-cascade-005',
    topic: 'css',
    tags: ['cascade'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Как будет выглядеть `.child`?', en: 'What will `.child` look like?' },
    code: {
      lang: 'html',
      source: `<style>
  .parent { color: green; border: 2px solid red; }
  .child { color: unset; border: unset; }
</style>

<div class="parent">
  <span class="child">Hi</span>
</div>`,
    },
    options: [
      { text: { ru: 'Чёрный текст без рамки', en: 'Black text, no border' } },
      { text: { ru: 'Зелёный текст с красной рамкой', en: 'Green text with a red border' } },
      { text: { ru: 'Чёрный текст с красной рамкой', en: 'Black text with a red border' } },
      { text: { ru: 'Зелёный текст без рамки', en: 'Green text, no border' } },
      { text: { ru: 'Стили браузера: `unset` = `revert`', en: 'Browser defaults: `unset` = `revert`' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`unset` ведёт себя по-разному: для наследуемого свойства — как `inherit`, для ненаследуемого — как `initial`. `color` наследуется, поэтому берётся зелёный от родителя. `border` не наследуется — получается начальное значение `border-style: none`, рамки нет.',
          en: '`unset` behaves differently per property: like `inherit` for inherited properties and like `initial` for the rest. `color` is inherited, so it takes green from the parent. `border` isn’t, so it gets the initial `border-style: none` — no border.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`initial` всегда даёт начальное значение из спецификации (для `color` — обычно чёрный), а `revert` откатывает к стилям браузера. Поэтому `all: unset` на кнопке убирает её фон и рамку, но шрифт и цвет берёт от родителя.',
          en: '`initial` always yields the spec’s initial value (usually black for `color`), while `revert` rolls back to the browser’s styles. That’s why `all: unset` on a button drops its background and border but takes the font and color from the parent.',
        },
      },
    ],
    sources: [
      { title: 'MDN — unset', url: `${MDN}/Web/CSS/unset` },
      { title: 'MDN — Inheritance', url: `${MDN}/Web/CSS/Inheritance` },
    ],
    verify: {
      kind: 'css-computed',
      selector: '.child',
      property: 'color',
      expected: 'rgb(0, 128, 0)',
      also: [{ selector: '.child', property: 'border-top-style', expected: 'none' }],
    },
  },
  {
    id: 'css-cascade-006',
    topic: 'css',
    tags: ['cascade', 'modern-css'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Каким цветом будет текст кнопки?', en: 'What color will the button text be?' },
    code: {
      lang: 'html',
      source: `<style>
  @layer base, components;

  @layer components {
    #app .btn { color: red; }
  }
  @layer base {
    .btn { color: green; }
  }
  button { color: blue; }
</style>

<div id="app">
  <button class="btn">OK</button>
</div>`,
    },
    options: [
      { text: { ru: 'Красным', en: 'Red' } },
      { text: { ru: 'Синим', en: 'Blue' } },
      { text: { ru: 'Зелёным', en: 'Green' } },
      { text: { ru: 'Цветом кнопки по умолчанию', en: 'The default button color' } },
      { text: { ru: 'Зависит от порядка блоков `@layer`', en: 'It depends on the order of the `@layer` blocks' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каскад сравнивает слои **раньше** [[specificity|специфичности]]. Обычные (без `!important`) стили вне слоёв побеждают стили из любого слоя — поэтому `button` с минимальной специфичностью перебивает `#app .btn`.',
          en: 'The cascade compares layers **before** [[specificity|specificity]]. Normal (non-`!important`) unlayered styles beat styles from any layer — so `button`, with minimal specificity, overrides `#app .btn`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Порядок слоёв задаёт их первое упоминание: в `@layer base, components;` слой `components` объявлен позже и сильнее `base`. Без правила вне слоёв текст был бы красным, причём специфичность правил из разных слоёв вообще не сравнивается.',
          en: 'Layer order is set by first mention: in `@layer base, components;` the `components` layer comes later and beats `base`. Without the unlayered rule the text would be red — and specificity across different layers isn’t compared at all.',
        },
      },
    ],
    sources: [
      { title: 'MDN — @layer', url: `${MDN}/Web/CSS/@layer` },
      { title: 'MDN — Introduction to the CSS cascade', url: `${MDN}/Web/CSS/CSS_cascade/Cascade` },
    ],
    verify: { kind: 'css-computed', selector: 'button', property: 'color', expected: 'rgb(0, 0, 255)' },
  },
  {
    id: 'css-cascade-007',
    topic: 'css',
    tags: ['cascade', 'modern-css'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Каким цветом будет текст абзаца?', en: 'What color will the paragraph text be?' },
    code: {
      lang: 'html',
      source: `<style>
  @layer base, theme;

  @layer base {
    p { color: red !important; }
  }
  @layer theme {
    p { color: green !important; }
  }
  p { color: blue !important; }
</style>

<p>Text</p>`,
    },
    options: [
      { text: { ru: 'Зелёным', en: 'Green' } },
      { text: { ru: 'Синим', en: 'Blue' } },
      { text: { ru: 'Красным', en: 'Red' } },
      { text: { ru: 'Чёрным', en: 'Black' } },
      { text: { ru: 'Ошибка: в `@layer` нельзя `!important`', en: 'An error: `!important` isn’t allowed in `@layer`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Для `!important` порядок слоёв **переворачивается**: важное объявление из более раннего слоя побеждает важные объявления из поздних слоёв и вне слоёв. Так базовый слой может «запереть» критичный стиль, и темы его не перебьют.',
          en: 'For `!important` the layer order is **reversed**: an important declaration from an earlier layer beats important declarations from later layers and from unlayered styles. A base layer can “lock” a critical style so themes can’t override it.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Для обычных объявлений всё наоборот: вне слоёв сильнее `theme`, а `theme` сильнее `base`. Без `!important` текст был бы синим.',
          en: 'Normal declarations work the other way round: unlayered beats `theme`, and `theme` beats `base`. Without `!important` the text would be blue.',
        },
      },
    ],
    sources: [
      { title: 'MDN — @layer', url: `${MDN}/Web/CSS/@layer` },
      { title: 'MDN — Introduction to the CSS cascade', url: `${MDN}/Web/CSS/CSS_cascade/Cascade` },
    ],
    verify: { kind: 'css-computed', selector: 'p', property: 'color', expected: 'rgb(255, 0, 0)' },
  },
  {
    id: 'css-selectors-001',
    topic: 'css',
    tags: ['selectors'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какие абзацы станут красными?', en: 'Which paragraphs turn red?' },
    code: {
      lang: 'html',
      source: `<style>
  h2 ~ p { color: red; }
</style>

<h2>Title</h2>
<p>A</p>
<div>B</div>
<p>C</p>`,
    },
    options: [
      { text: { ru: 'Только A', en: 'Only A' } },
      { text: { ru: 'Только C', en: 'Only C' } },
      { text: { ru: 'A, B и C', en: 'A, B and C' } },
      { text: { ru: 'A и C', en: 'A and C' } },
      { text: { ru: 'Никакие', en: 'None of them' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`~` — комбинатор последующих соседей: выбирает все `p`, которые идут **после** `h2` у того же родителя, не обязательно вплотную. Поэтому красные и A, и C, а `div` с текстом B не подходит по типу.',
          en: '`~` is the subsequent-sibling combinator: it selects every `p` that comes **after** the `h2` under the same parent, not necessarily right after it. So both A and C turn red, while the `div` with B doesn’t match the type.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`h2 + p` выбрал бы только соседа сразу после заголовка (A), `h2 > p` — абзацы-дети `h2`, а `h2 p` — любых потомков `h2`.',
          en: '`h2 + p` would select only the sibling right after the heading (A), `h2 > p` — paragraphs that are children of the `h2`, and `h2 p` — any descendants of the `h2`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Subsequent-sibling combinator', url: `${MDN}/Web/CSS/Subsequent-sibling_combinator` },
      { title: 'MDN — Next-sibling combinator', url: `${MDN}/Web/CSS/Next-sibling_combinator` },
    ],
    verify: {
      kind: 'css-computed',
      selector: 'p:last-of-type',
      property: 'color',
      expected: 'rgb(255, 0, 0)',
      also: [
        { selector: 'p', property: 'color', expected: 'rgb(255, 0, 0)' },
        { selector: 'div', property: 'color', expected: 'rgb(0, 0, 0)' },
      ],
    },
  },
  {
    id: 'css-selectors-002',
    topic: 'css',
    tags: ['selectors'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой абзац станет красным?', en: 'Which paragraph turns red?' },
    code: {
      lang: 'html',
      source: `<style>
  p:nth-child(2) { color: red; }
</style>

<div>
  <h2>Title</h2>
  <p>First</p>
  <p>Second</p>
</div>`,
    },
    options: [
      { text: { ru: 'Абзац «First»', en: 'The “First” paragraph' } },
      { text: { ru: 'Абзац «Second»', en: 'The “Second” paragraph' } },
      { text: { ru: 'Оба абзаца', en: 'Both paragraphs' } },
      { text: { ru: 'Ни один абзац', en: 'Neither paragraph' } },
      { text: { ru: 'Заголовок и «Second»', en: 'The heading and “Second”' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`:nth-child(2)` считает **всех** детей родителя, а затем проверяет остальную часть селектора. Второй ребёнок `div` — абзац «First», и он `p`, поэтому красным станет именно он.',
          en: '`:nth-child(2)` counts **all** of the parent’s children, then checks the rest of the selector. The `div`’s second child is the “First” paragraph, and it is a `p`, so that’s the one that turns red.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы выбрать второй по счёту `p`, нужен `p:nth-of-type(2)` — он считает только элементы того же типа. Ещё вариант — `:nth-child(2 of p)`: фильтр прямо внутри псевдокласса.',
          en: 'To pick the second `p`, use `p:nth-of-type(2)` — it counts only elements of the same type. Another option is `:nth-child(2 of p)`, with the filter inside the pseudo-class.',
        },
      },
    ],
    sources: [
      { title: 'MDN — :nth-child()', url: `${MDN}/Web/CSS/:nth-child` },
      { title: 'MDN — :nth-of-type()', url: `${MDN}/Web/CSS/:nth-of-type` },
    ],
    verify: {
      kind: 'css-computed',
      selector: 'p',
      property: 'color',
      expected: 'rgb(255, 0, 0)',
      also: [{ selector: 'p:last-child', property: 'color', expected: 'rgb(0, 0, 0)' }],
    },
  },
  {
    id: 'css-selectors-003',
    topic: 'css',
    tags: ['selectors', 'modern-css'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какая карточка станет красной?', en: 'Which card turns red?' },
    code: {
      lang: 'html',
      source: `<style>
  .card:has(> img) { color: red; }
</style>

<div class="card" id="a">
  <figure><img src="a.png" alt=""></figure>
</div>
<div class="card" id="b">
  <img src="b.png" alt="">
</div>`,
    },
    options: [
      { text: { ru: 'Только `#a`', en: 'Only `#a`' } },
      { text: { ru: 'Только `#b`', en: 'Only `#b`' } },
      { text: { ru: 'Обе карточки', en: 'Both cards' } },
      { text: { ru: 'Ни одна: `:has()` только для JS', en: 'Neither: `:has()` is JS-only' } },
      { text: { ru: 'Картинки, а не карточки', en: 'The images, not the cards' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`:has()` — «родительский» селектор: выбирает элемент, внутри которого есть совпадение с аргументом. Аргумент `> img` отсчитывается от самой карточки, то есть нужен **прямой** потомок `img`. У `#a` картинка лежит внутри `figure`, поэтому красной станет только `#b`.',
          en: '`:has()` is the “parent” selector: it matches an element that contains a match for its argument. The argument `> img` is relative to the card itself, so it needs a **direct** child `img`. In `#a` the image sits inside a `figure`, so only `#b` turns red.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`.card:has(img)` без `>` выбрал бы обе карточки. `:has()` работает в стилях всех основных браузеров и заменяет многие JS-хаки: например, `form:has(:invalid)` или `label:has(input:checked)`.',
          en: '`.card:has(img)` without `>` would select both cards. `:has()` works in stylesheets in all major browsers and replaces many JS hacks, e.g. `form:has(:invalid)` or `label:has(input:checked)`.',
        },
      },
    ],
    sources: [{ title: 'MDN — :has()', url: `${MDN}/Web/CSS/:has` }],
    verify: {
      kind: 'css-computed',
      selector: '#b',
      property: 'color',
      expected: 'rgb(255, 0, 0)',
      also: [{ selector: '#a', property: 'color', expected: 'rgb(0, 0, 0)' }],
    },
  },
  {
    id: 'css-selectors-004',
    topic: 'css',
    tags: ['selectors'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Точка перед `.badge` не появляется. Чего не хватает в правиле?',
      en: 'The dot before `.badge` doesn’t show up. What is the rule missing?',
    },
    code: {
      lang: 'css',
      source: `.badge::before {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: red;
}`,
    },
    options: [
      { code: 'position: absolute;' },
      { code: 'z-index: 1;' },
      { code: 'visibility: visible;' },
      { code: 'display: block;' },
      { code: "content: '';" },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Псевдоэлементы `::before` и `::after` создаются, только если у них задано `content`. Без него вычисленное значение — `none`, бокса нет, и остальные свойства ни на что не влияют. Для декоративной точки достаточно `content: \'\'`.',
          en: 'The `::before` and `::after` pseudo-elements are only generated when `content` is set. Without it the computed value is `none`, there’s no box, and the other properties do nothing. For a decorative dot `content: \'\'` is enough.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`display: inline-block` здесь уже есть: без него размеры не применились бы к строчному боксу. У `img` и `br` псевдоэлементов `::before`/`::after` не бывает вовсе.',
          en: '`display: inline-block` is already there: without it the size wouldn’t apply to an inline box. `img` and `br` never get `::before`/`::after` pseudo-elements.',
        },
      },
    ],
    sources: [
      { title: 'MDN — ::before', url: `${MDN}/Web/CSS/::before` },
      { title: 'MDN — content', url: `${MDN}/Web/CSS/content` },
    ],
    verify: {
      kind: 'css-computed',
      html: '<span class="badge">New</span>',
      selector: '.badge::before',
      property: 'content',
      expected: 'none',
    },
  },
  {
    id: 'css-box-001',
    topic: 'css',
    tags: ['box-model'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Какое свойство рисует линию вокруг элемента, не меняя его размеров и не сдвигая соседей?',
      en: 'Which property draws a line around an element without changing its size or moving its neighbors?',
    },
    options: [{ code: 'border' }, { code: 'border-image' }, { code: 'padding' }, { code: 'outline' }, { code: 'margin' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`outline` рисуется за пределами рамки и не участвует в раскладке: ширина элемента и положение соседей не меняются. Поэтому его используют для индикации фокуса — появление обводки не дёргает вёрстку.',
          en: '`outline` is drawn outside the border and takes no part in layout: the element’s size and its neighbors’ positions stay the same. That’s why it’s used for focus indication — showing it doesn’t shift the layout.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`border` (в том числе с `border-image`) входит в размер бокса: при `content-box` прибавляется к `width`, при `border-box` отнимает место у контента. Без влияния на раскладку рисуется ещё `box-shadow`, но это тень, а не линия.',
          en: '`border` (including with `border-image`) is part of the box size: with `content-box` it adds to `width`, with `border-box` it takes space from the content. `box-shadow` also doesn’t affect layout, but it’s a shadow, not a line.',
        },
      },
    ],
    sources: [{ title: 'MDN — outline', url: `${MDN}/Web/CSS/outline` }],
    verify: {
      kind: 'css-computed',
      html: `<style>.box { width: 100px; height: 20px; outline: 10px solid red; }</style>
<div class="box"></div><div class="next"></div>`,
      selector: '.box',
      property: 'rect.width',
      expected: '100px',
      also: [{ selector: '.next', property: 'rect.top', expected: '28px' }],
    },
  },
  {
    id: 'css-box-002',
    topic: 'css',
    tags: ['box-model'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой ширины будет жёлтый фон у `.tag`?', en: 'How wide will the yellow background of `.tag` be?' },
    code: {
      lang: 'html',
      source: `<style>
  .tag { width: 200px; height: 50px; background: gold; }
</style>

<p>Status: <span class="tag">new</span></p>`,
    },
    options: [
      { text: { ru: '200px', en: '200px' } },
      { text: { ru: '200px, но высота по тексту', en: '200px, but the height fits the text' } },
      { text: { ru: 'По ширине слова «new»', en: 'As wide as the word “new”' } },
      { text: { ru: 'Во всю ширину абзаца', en: 'The full width of the paragraph' } },
      { text: { ru: 'Фона не будет вовсе', en: 'There will be no background' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`span` по умолчанию строчный (`display: inline`). Размер строчного бокса задаёт содержимое, а `width` и `height` к нему **не применяются**. Вертикальные `margin` тоже не раздвигают строки.',
          en: 'A `span` is inline by default (`display: inline`). The content sets an inline box’s size, and `width` and `height` **don’t apply** to it. Vertical margins don’t push lines apart either.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы размеры заработали, нужен `display: inline-block` (элемент останется в строке) или `block`. Ещё вариант — положить `span` во flex- или grid-контейнер: его дети автоматически становятся блочными.',
          en: 'For the size to work, use `display: inline-block` (it stays in the line) or `block`. Alternatively, put the `span` in a flex or grid container — its children are blockified automatically.',
        },
      },
    ],
    sources: [
      { title: 'MDN — width', url: `${MDN}/Web/CSS/width` },
      { title: 'MDN — display', url: `${MDN}/Web/CSS/display` },
    ],
    verify: {
      kind: 'css-computed',
      html: '<p><span class="tag probe"><span style="display: inline-block; width: 30px"></span></span></p>',
      selector: '.probe',
      property: 'rect.width',
      expected: '30px',
    },
  },
  {
    id: 'css-box-003',
    topic: 'css',
    tags: ['box-model', 'css-units'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Чему равен `padding-top` у `.child`?', en: 'What is the `padding-top` of `.child`?' },
    code: {
      lang: 'css',
      source: `.parent {
  width: 400px;
  height: 200px;
}
.child {
  padding-top: 10%;
}`,
    },
    options: [{ code: '20px' }, { code: '10px' }, { code: '0px' }, { code: '1.6px' }, { code: '40px' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Процентные `padding` и `margin` — даже вертикальные — считаются от **ширины** [[containing-block|содержащего блока]]. 10% от 400px = 40px, высота родителя не участвует.',
          en: 'Percentage `padding` and `margin` — even vertical ones — are calculated from the [[containing-block|containing block]]’s **width**. 10% of 400px is 40px; the parent’s height plays no part.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'На этом держался старый приём для пропорций: `height: 0; padding-top: 56.25%` давал блок 16:9. Сейчас для этого есть `aspect-ratio: 16 / 9`.',
          en: 'An old aspect-ratio trick relied on this: `height: 0; padding-top: 56.25%` produced a 16:9 box. Today there’s `aspect-ratio: 16 / 9` for that.',
        },
      },
    ],
    sources: [
      { title: 'MDN — padding-top', url: `${MDN}/Web/CSS/padding-top` },
      { title: 'MDN — aspect-ratio', url: `${MDN}/Web/CSS/aspect-ratio` },
    ],
    verify: {
      kind: 'css-computed',
      html: '<div class="parent"><div class="child"></div></div>',
      selector: '.child',
      property: 'padding-top',
    },
  },
];
