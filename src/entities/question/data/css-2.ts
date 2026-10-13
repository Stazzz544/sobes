import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const CSS_QUESTIONS_2: Question[] = [
  {
    id: 'css-box-004',
    topic: 'css',
    tags: ['box-model'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Почему под картинкой внутри рамки остаётся щель в несколько пикселей?',
      en: 'Why is there a gap of a few pixels under the image inside the frame?',
    },
    code: {
      lang: 'html',
      source: `<style>
  .frame { border: 1px solid; }
  .frame img { height: 100px; }
</style>

<div class="frame">
  <img src="photo.jpg" alt="">
</div>`,
    },
    options: [
      { text: { ru: 'Картинка строчная и стоит на базовой линии', en: 'The image is inline and sits on the baseline' } },
      { text: { ru: 'У `img` есть скрытый нижний `margin`', en: '`img` has a hidden bottom `margin`' } },
      { text: { ru: 'Браузер оставляет место под `alt`-текст', en: 'The browser reserves room for the `alt` text' } },
      { text: { ru: 'Не задан `box-sizing: border-box`', en: '`box-sizing: border-box` is missing' } },
      { text: { ru: 'Рамка добавляет внутренний отступ', en: 'The border adds inner spacing' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`img` — строчный элемент и по умолчанию выравнивается по базовой линии (`vertical-align: baseline`). Под базовой линией строки остаётся место для «хвостов» букв (g, у, р) — это и есть щель, её высота зависит от шрифта и `line-height`.',
          en: '`img` is an inline element aligned to the baseline by default (`vertical-align: baseline`). Below the line’s baseline there’s room for letter descenders (g, y, p) — that’s the gap, and its height depends on the font and `line-height`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Лечится `display: block` у картинки или `vertical-align: middle` / `top`. Обнулять `line-height` и `font-size` у родителя тоже помогает, но ломает текст рядом.',
          en: 'Fix it with `display: block` on the image or `vertical-align: middle` / `top`. Zeroing the parent’s `line-height` and `font-size` also works but breaks any text next to it.',
        },
      },
    ],
    sources: [{ title: 'MDN — vertical-align', url: `${MDN}/Web/CSS/vertical-align` }],
  },
  {
    id: 'css-box-005',
    topic: 'css',
    tags: ['box-model'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Внутри родителя только `float`-блок, и родитель схлопнулся до нулевой высоты. Что заставит его вместить float без побочных эффектов?',
      en: 'A parent contains only a floated block and has collapsed to zero height. What makes it contain the float without side effects?',
    },
    options: [
      { code: 'clear: both' },
      { code: 'display: flow-root' },
      { code: 'position: relative' },
      { code: 'overflow: visible' },
      { code: 'display: block' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`display: flow-root` создаёт новый **блочный контекст форматирования** (BFC). BFC растягивается так, чтобы вместить свои float-элементы, и не даёт margin детей схлопываться с внешними.',
          en: '`display: flow-root` creates a new **block formatting context** (BFC). A BFC grows to contain its floats and stops children’s margins from collapsing with outer ones.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Раньше то же делали `overflow: hidden` (обрезает тени и выпадающие меню) или clearfix через `::after` с `clear: both`. `clear: both` на самом родителе не помогает: оно сдвигает сам элемент ниже предыдущих float, а не растягивает его вокруг детей.',
          en: 'This used to be done with `overflow: hidden` (which clips shadows and dropdowns) or a clearfix via `::after` with `clear: both`. `clear: both` on the parent itself doesn’t help: it moves the element below earlier floats rather than wrapping it around its children.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Block formatting context', url: `${MDN}/Web/CSS/CSS_display/Block_formatting_context` },
      { title: 'MDN — display', url: `${MDN}/Web/CSS/display` },
    ],
    verify: {
      kind: 'css-computed',
      html: `<style>.float { float: left; width: 50px; height: 80px; } .parent { display: flow-root; }</style>
<div class="parent"><div class="float"></div></div>
<div class="plain"><div class="float"></div></div>`,
      selector: '.parent',
      property: 'rect.height',
      expected: '80px',
      also: [{ selector: '.plain', property: 'rect.height', expected: '0px' }],
    },
  },
  {
    id: 'css-flex-001',
    topic: 'css',
    tags: ['flexbox'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой ширины будет `.a`?', en: 'How wide will `.a` be?' },
    code: {
      lang: 'css',
      source: `.row {
  display: flex;
  width: 500px;
}
.a { flex: 1 1 100px; }
.b { flex: 2 1 100px; }`,
    },
    options: [{ code: '166.67px' }, { code: '250px' }, { code: '200px' }, { code: '100px' }, { code: '300px' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сначала элементы получают `flex-basis`: 100px + 100px. Свободное место 500 − 200 = 300px делится по `flex-grow` в пропорции 1 : 2 — `.a` получает +100px, `.b` +200px. Итого `.a` = 200px, `.b` = 300px.',
          en: 'First the items get their `flex-basis`: 100px + 100px. The free space, 500 − 200 = 300px, is split by `flex-grow` in a 1 : 2 ratio — `.a` gets +100px, `.b` +200px. So `.a` is 200px and `.b` is 300px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '166.67px получилось бы при `flex-basis: 0` (например, `flex: 1` и `flex: 2`): тогда делится вся ширина, и размеры строго пропорциональны 1 : 2.',
          en: '166.67px would be the answer with `flex-basis: 0` (e.g. `flex: 1` and `flex: 2`): then the whole width is shared and the sizes are exactly 1 : 2.',
        },
      },
    ],
    sources: [
      { title: 'MDN — flex-grow', url: `${MDN}/Web/CSS/flex-grow` },
      {
        title: 'MDN — Controlling ratios of flex items along the main axis',
        url: `${MDN}/Web/CSS/CSS_flexible_box_layout/Controlling_ratios_of_flex_items_along_the_main_axis`,
      },
    ],
    verify: {
      kind: 'css-computed',
      html: '<div class="row"><div class="a"></div><div class="b"></div></div>',
      selector: '.a',
      property: 'rect.width',
      also: [{ selector: '.b', property: 'rect.width', expected: '300px' }],
    },
  },
  {
    id: 'css-flex-002',
    topic: 'css',
    tags: ['flexbox'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Во что разворачивается `flex: 1`?', en: 'What does `flex: 1` expand to?' },
    options: [{ code: '1 1 auto' }, { code: '1 0 auto' }, { code: '0 1 auto' }, { code: '1 1 0%' }, { code: '1 0 0%' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Одно число без единиц в `flex` — это `flex-grow`. `flex-shrink` остаётся 1, а `flex-basis` становится `0%`, а не `auto`. Поэтому элементы с `flex: 1` делят место поровну, независимо от содержимого.',
          en: 'A single unitless number in `flex` is `flex-grow`. `flex-shrink` stays 1, and `flex-basis` becomes `0%` rather than `auto`. That’s why items with `flex: 1` share space equally regardless of their content.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`flex: auto` — это `1 1 auto`: сначала размер берётся по контенту, и делится только остаток. `flex: none` — `0 0 auto`, а значение по умолчанию — `0 1 auto`.',
          en: '`flex: auto` is `1 1 auto`: sizes start from the content and only the remainder is shared. `flex: none` is `0 0 auto`, and the default is `0 1 auto`.',
        },
      },
    ],
    sources: [{ title: 'MDN — flex', url: `${MDN}/Web/CSS/flex` }],
    verify: {
      kind: 'css-computed',
      html: '<div style="display: flex"><div class="item" style="flex: 1"></div></div>',
      selector: '.item',
      property: 'flex',
    },
  },
  {
    id: 'css-flex-003',
    topic: 'css',
    tags: ['flexbox'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой ширины будет `.a`?', en: 'How wide will `.a` be?' },
    code: {
      lang: 'css',
      source: `.row {
  display: flex;
  width: 300px;
}
.a { flex: 0 1 300px; }
.b { flex: 0 1 100px; }`,
    },
    options: [{ code: '250px' }, { code: '200px' }, { code: '150px' }, { code: '300px' }, { code: '225px' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Не хватает 300 + 100 − 300 = 100px. Сжатие делится не поровну, а пропорционально `flex-shrink × flex-basis`: 1·300 : 1·100 = 3 : 1. `.a` теряет 75px, `.b` — 25px: получается 225px и 75px.',
          en: 'The items overflow by 300 + 100 − 300 = 100px. Shrinking isn’t split equally but in proportion to `flex-shrink × flex-basis`: 1·300 : 1·100 = 3 : 1. `.a` loses 75px and `.b` 25px, giving 225px and 75px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Так крупные элементы сжимаются сильнее мелких, и мелкие не схлопываются первыми. 250px вышло бы при равном вычитании по 50px. Снизу сжатие ограничивает автоматический минимум (`min-width: auto`), но элементы пустые, и он здесь не мешает.',
          en: 'This way large items shrink more than small ones, and small ones don’t collapse first. 250px would come from subtracting 50px from each. The automatic minimum (`min-width: auto`) limits shrinking, but the items are empty here, so it doesn’t interfere.',
        },
      },
    ],
    sources: [
      { title: 'MDN — flex-shrink', url: `${MDN}/Web/CSS/flex-shrink` },
      { title: 'CSS Flexbox — Resolving flexible lengths', url: 'https://www.w3.org/TR/css-flexbox-1/#resolve-flexible-lengths' },
    ],
    verify: {
      kind: 'css-computed',
      html: '<div class="row"><div class="a"></div><div class="b"></div></div>',
      selector: '.a',
      property: 'rect.width',
      also: [{ selector: '.b', property: 'rect.width', expected: '75px' }],
    },
  },
  {
    id: 'css-flex-004',
    topic: 'css',
    tags: ['flexbox'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Заголовок не обрезается многоточием, а кнопка вылезает за пределы 200px. Что исправит?',
      en: 'The title isn’t truncated with an ellipsis and the button overflows the 200px. What fixes it?',
    },
    code: {
      lang: 'html',
      source: `<style>
  .row { display: flex; width: 200px; }
  .item { flex: 1; }
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<div class="row">
  <div class="item">
    <div class="title">A very long title that does not fit</div>
  </div>
  <button>Edit</button>
</div>`,
    },
    options: [
      { code: '.item { min-width: 0; }' },
      { code: '.title { width: 100%; }' },
      { code: '.item { flex-shrink: 1; }' },
      { code: '.row { flex-wrap: nowrap; }' },
      { code: '.title { display: inline; }' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У flex-элементов `min-width` по умолчанию `auto`: элемент не сжимается уже своего минимального контента. Для `.item` это ширина всей строки без переносов, поэтому `flex-shrink` упирается в этот минимум и ряд распирает.',
          en: 'Flex items default to `min-width: auto`: an item won’t shrink below its min-content size. For `.item` that’s the full unwrapped line of text, so `flex-shrink` hits that floor and the row overflows.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`min-width: 0` (или `overflow: hidden` на самом `.item`) снимает ограничение: `.item` сжимается, и `.title` обрезает текст многоточием. В Grid та же история лечится `minmax(0, 1fr)` вместо `1fr`.',
          en: '`min-width: 0` (or `overflow: hidden` on `.item` itself) removes the floor: `.item` shrinks and `.title` truncates with an ellipsis. In Grid the same issue is fixed with `minmax(0, 1fr)` instead of `1fr`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — min-width', url: `${MDN}/Web/CSS/min-width` },
      { title: 'CSS Flexbox — Automatic minimum size', url: 'https://www.w3.org/TR/css-flexbox-1/#min-size-auto' },
    ],
    verify: {
      kind: 'css-computed',
      html: `<style>button { width: 50px; padding: 0; border: 0; } .fixed .item { min-width: 0; }</style>
<div class="row fixed">
  <div class="item"><div class="title">A very long title that does not fit</div></div>
  <button>Edit</button>
</div>`,
      selector: '.fixed .item',
      property: 'rect.width',
      expected: '150px',
      also: [{ selector: '.item', property: 'min-width', expected: 'auto' }],
    },
  },
  {
    id: 'css-flex-005',
    topic: 'css',
    tags: ['flexbox'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'В контейнере с `flex-direction: column` нужно отцентрировать детей по горизонтали. Какое свойство это сделает?',
      en: 'In a `flex-direction: column` container the children must be centered horizontally. Which property does it?',
    },
    options: [
      { code: 'justify-content: center' },
      { code: 'align-items: center' },
      { code: 'text-align: center' },
      { code: 'vertical-align: middle' },
      { code: 'align-content: center' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`justify-content` работает вдоль **главной** оси, `align-items` — вдоль **поперечной**. При `flex-direction: column` главная ось вертикальная, поэтому по горизонтали центрирует `align-items: center`.',
          en: '`justify-content` works along the **main** axis and `align-items` along the **cross** axis. With `flex-direction: column` the main axis is vertical, so `align-items: center` does the horizontal centering.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`justify-content: center` здесь сдвинул бы детей к середине по вертикали (если у контейнера есть высота). `align-content` распределяет строки при `flex-wrap: wrap`, а `vertical-align` на flex-элементы не действует.',
          en: '`justify-content: center` would move the children to the vertical middle (if the container has a height). `align-content` distributes lines with `flex-wrap: wrap`, and `vertical-align` has no effect on flex items.',
        },
      },
    ],
    sources: [
      { title: 'MDN — align-items', url: `${MDN}/Web/CSS/align-items` },
      {
        title: 'MDN — Basic concepts of flexbox',
        url: `${MDN}/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox`,
      },
    ],
    verify: {
      kind: 'css-computed',
      html: `<style>
  .column { display: flex; flex-direction: column; align-items: center; width: 400px; }
  .child { width: 100px; height: 20px; }
</style>
<div class="column"><div class="child"></div></div>`,
      selector: '.child',
      property: 'rect.left',
      expected: '158px',
    },
  },
  {
    id: 'css-flex-006',
    topic: 'css',
    tags: ['flexbox'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой ширины будет `.item`?', en: 'How wide will `.item` be?' },
    code: {
      lang: 'css',
      source: `.row {
  display: flex;
  width: 1000px;
}
.item {
  width: 100px;
  flex-basis: 200px;
}`,
    },
    options: [{ code: '100px' }, { code: '300px' }, { code: '1000px' }, { code: '200px' }, { code: '150px' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Стартовый размер flex-элемента вдоль главной оси задаёт `flex-basis`. `width` используется, только когда `flex-basis: auto` (значение по умолчанию). Здесь basis 200px, а `flex-grow` по умолчанию 0 — элемент не растягивается, итого 200px.',
          en: 'A flex item’s starting size along the main axis comes from `flex-basis`. `width` is used only when `flex-basis` is `auto` (the default). Here the basis is 200px and `flex-grow` defaults to 0, so the item doesn’t grow: 200px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ограничения `min-width` и `max-width` при этом действуют: `max-width: 150px` урезал бы элемент до 150px, несмотря на basis.',
          en: '`min-width` and `max-width` still apply: `max-width: 150px` would clamp the item to 150px despite the basis.',
        },
      },
    ],
    sources: [{ title: 'MDN — flex-basis', url: `${MDN}/Web/CSS/flex-basis` }],
    verify: {
      kind: 'css-computed',
      html: '<div class="row"><div class="item"></div></div>',
      selector: '.item',
      property: 'rect.width',
    },
  },
  {
    id: 'css-grid-001',
    topic: 'css',
    tags: ['css-grid'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой ширины будет третья колонка?', en: 'How wide will the third column be?' },
    code: {
      lang: 'css',
      source: `.grid {
  display: grid;
  width: 440px;
  grid-template-columns: 100px 1fr 2fr;
  gap: 20px;
}`,
    },
    options: [{ code: '226.67px' }, { code: '266.67px' }, { code: '200px' }, { code: '293.33px' }, { code: '220px' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`fr` делит **оставшееся** место. Из 440px вычитаем фиксированную колонку 100px и два промежутка по 20px — остаётся 300px. Это 3 доли (1fr + 2fr), одна доля = 100px, значит третья колонка — 200px.',
          en: '`fr` shares the **remaining** space. From 440px subtract the fixed 100px column and two 20px gaps — 300px is left. That’s 3 fractions (1fr + 2fr), one fraction is 100px, so the third column is 200px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Если забыть про `gap`, выйдет 226.67px, а если взять 2/3 от всей ширины — 293.33px. Промежутки — отдельные полосы между колонками, они не входят ни в одну из них.',
          en: 'Forgetting the `gap` gives 226.67px, and taking 2/3 of the full width gives 293.33px. Gaps are separate gutters between columns and don’t belong to any column.',
        },
      },
    ],
    sources: [
      { title: 'MDN — grid-template-columns', url: `${MDN}/Web/CSS/grid-template-columns` },
      { title: 'MDN — <flex> (fr)', url: `${MDN}/Web/CSS/flex_value` },
    ],
    verify: {
      kind: 'css-computed',
      html: '<div class="grid"><div></div><div></div><div class="third"></div></div>',
      selector: '.third',
      property: 'rect.width',
    },
  },
  {
    id: 'css-grid-002',
    topic: 'css',
    tags: ['css-grid', 'responsive'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'В сетке всего два элемента. Какой ширины будет каждый?', en: 'The grid has only two items. How wide is each?' },
    code: {
      lang: 'css',
      source: `.grid {
  display: grid;
  width: 600px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}`,
    },
    options: [{ code: '300px' }, { code: '200px' }, { code: '150px' }, { code: '600px' }, { code: '100px' }],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`auto-fill` создаёт столько колонок, сколько влезает: 600 / 100 = 6 колонок по 100px. Пустые колонки остаются в сетке, поэтому два элемента занимают по 100px, а справа пусто.',
          en: '`auto-fill` creates as many columns as fit: 600 / 100 = 6 columns of 100px. Empty columns stay in the grid, so the two items are 100px each with empty space to the right.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'С `auto-fit` пустые колонки схлопываются до нуля, и `1fr` растягивает два элемента на всю ширину — по 300px. Разница видна, только когда элементов меньше, чем помещается колонок.',
          en: 'With `auto-fit` empty columns collapse to zero and `1fr` stretches the two items across the full width — 300px each. The difference only shows when there are fewer items than columns that fit.',
        },
      },
    ],
    sources: [{ title: 'MDN — repeat()', url: `${MDN}/Web/CSS/repeat` }],
    verify: {
      kind: 'css-computed',
      html: `<style>.fit { grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); }</style>
<div class="grid"><div class="item"></div><div></div></div>
<div class="grid fit"><div class="fit-item"></div><div></div></div>`,
      selector: '.item',
      property: 'rect.width',
      also: [{ selector: '.fit-item', property: 'rect.width', expected: '300px' }],
    },
  },
  {
    id: 'css-grid-003',
    topic: 'css',
    tags: ['css-grid'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой ширины будет `.wide`?', en: 'How wide will `.wide` be?' },
    code: {
      lang: 'css',
      source: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
}
.wide {
  grid-column: 1 / -1;
}`,
    },
    options: [{ code: '100px' }, { code: '300px' }, { code: '310px' }, { code: '320px' }, { code: '330px' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Отрицательные номера линий считаются с конца **явной** сетки: `-1` — последняя линия. `1 / -1` растягивает элемент на все три колонки вместе с двумя промежутками: 3 × 100 + 2 × 10 = 320px.',
          en: 'Negative line numbers count from the end of the **explicit** grid: `-1` is the last line. `1 / -1` spans all three columns plus the two gaps: 3 × 100 + 2 × 10 = 320px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Приём удобен для заголовков и баннеров во всю ширину сетки. Но неявные колонки, созданные автоматически вне `grid-template-columns`, `-1` не учитывает.',
          en: 'It’s handy for full-width headings and banners. But `-1` ignores implicit columns created automatically outside `grid-template-columns`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — grid-column', url: `${MDN}/Web/CSS/grid-column` },
      {
        title: 'MDN — Grid layout using line-based placement',
        url: `${MDN}/Web/CSS/CSS_grid_layout/Grid_layout_using_line-based_placement`,
      },
    ],
    verify: {
      kind: 'css-computed',
      html: '<div class="grid"><div class="wide"></div></div>',
      selector: '.wide',
      property: 'rect.width',
    },
  },
  {
    id: 'css-grid-004',
    topic: 'css',
    tags: ['css-grid'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какой ширины будет первая колонка?', en: 'How wide will the first column be?' },
    code: {
      lang: 'html',
      source: `<style>
  .grid {
    display: grid;
    width: 400px;
    grid-template-columns: 1fr 1fr;
  }
  .wide { width: 300px; }
</style>

<div class="grid">
  <div class="first">
    <div class="wide"></div>
  </div>
  <div class="second"></div>
</div>`,
    },
    options: [{ code: '200px' }, { code: '300px' }, { code: '400px' }, { code: '250px' }, { code: '100px' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`1fr` вне `minmax()` на самом деле означает `minmax(auto, 1fr)`: колонка не может стать уже минимального размера своего содержимого. В первой ячейке блок шириной 300px, поэтому первая колонка — 300px, а второй достаётся остаток 100px.',
          en: 'Outside `minmax()`, `1fr` actually means `minmax(auto, 1fr)`: a column can’t get narrower than its content’s minimum size. The first cell holds a 300px block, so the first column is 300px and the second gets the remaining 100px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы колонки были строго равными, пишут `repeat(2, minmax(0, 1fr))` — тогда содержимое просто переполнит ячейку. Это частая причина «разъехавшейся» сетки из-за длинного URL или блока `<pre>`.',
          en: 'For strictly equal columns write `repeat(2, minmax(0, 1fr))` — the content will simply overflow its cell. This is a common cause of a “broken” grid with a long URL or a `<pre>` block.',
        },
      },
    ],
    sources: [
      { title: 'CSS Grid — <flex> values', url: 'https://www.w3.org/TR/css-grid-1/#valdef-grid-template-columns-flex' },
      { title: 'MDN — minmax()', url: `${MDN}/Web/CSS/minmax` },
    ],
    verify: {
      kind: 'css-computed',
      selector: '.first',
      property: 'rect.width',
      also: [{ selector: '.second', property: 'rect.width', expected: '100px' }],
    },
  },
  {
    id: 'css-pos-001',
    topic: 'css',
    tags: ['positioning'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Относительно какого элемента встанет `.badge`?',
      en: 'Which element is `.badge` positioned relative to?',
    },
    code: {
      lang: 'html',
      source: `<style>
  .outer { position: relative; margin-left: 20px; }
  .inner { margin-left: 50px; }
  .badge { position: absolute; top: 0; left: 0; }
</style>

<div class="outer">
  <div class="inner">
    <span class="badge">!</span>
  </div>
</div>`,
    },
    options: [
      { text: { ru: '`.inner`', en: '`.inner`' } },
      { text: { ru: 'Окна браузера', en: 'The browser window' } },
      { text: { ru: '`.outer`', en: '`.outer`' } },
      { text: { ru: '`body`', en: '`body`' } },
      { text: { ru: 'Своего места в потоке', en: 'Its own spot in the flow' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Для `position: absolute` содержащий блок — ближайший предок с `position`, отличным от `static` (или с `transform`, `filter`, `contain` и т.п.). `.inner` не позиционирован, поэтому `.badge` встаёт в левый верхний угол `.outer`, игнорируя отступ `.inner`.',
          en: 'For `position: absolute` the containing block is the nearest ancestor whose `position` isn’t `static` (or that has `transform`, `filter`, `contain`, etc.). `.inner` isn’t positioned, so `.badge` lands in the top-left corner of `.outer`, ignoring `.inner`’s margin.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Если позиционированного предка нет, отсчёт идёт от начального содержащего блока размером с окно, а не от `body`. Поэтому родителю ставят `position: relative` без смещений — только чтобы он стал «якорем».',
          en: 'With no positioned ancestor, it’s relative to the initial containing block (the size of the window), not `body`. That’s why a parent gets `position: relative` with no offsets — just to become the anchor.',
        },
      },
    ],
    sources: [
      { title: 'MDN — position', url: `${MDN}/Web/CSS/position` },
      { title: 'MDN — Containing block', url: `${MDN}/Web/CSS/Containing_block` },
    ],
    verify: { kind: 'css-computed', selector: '.badge', property: 'rect.left', expected: '28px' },
  },
  {
    id: 'css-pos-002',
    topic: 'css',
    tags: ['positioning'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Модалка с `position: fixed` должна стоять в углу окна, но оказывается в углу карточки и прокручивается вместе с ней. Почему?',
      en: 'A `position: fixed` modal should sit in the window’s corner but ends up in the card’s corner and scrolls with it. Why?',
    },
    code: {
      lang: 'html',
      source: `<style>
  .card { transform: translateY(0); margin: 50px 100px; }
  .modal { position: fixed; top: 0; left: 0; }
</style>

<div class="card">
  <div class="modal">Dialog</div>
</div>`,
    },
    options: [
      { text: { ru: '`transform` у предка сделал его содержащим блоком', en: 'The ancestor’s `transform` made it the containing block' } },
      { text: { ru: 'Не хватает `z-index` выше, чем у карточки', en: 'It needs a `z-index` above the card’s' } },
      { text: { ru: '`fixed` всегда отсчитывается от родителя', en: '`fixed` is always relative to the parent' } },
      { text: { ru: 'Нужно `absolute` вместо `fixed`', en: 'It needs `absolute` instead of `fixed`' } },
      { text: { ru: '`margin` карточки сдвигает всех потомков', en: 'The card’s `margin` shifts all descendants' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обычно `position: fixed` отсчитывается от окна. Но если у предка есть `transform`, `perspective`, `filter`, `contain: paint` или `will-change: transform`, этот предок становится содержащим блоком и для fixed-потомков. `.modal` встаёт в угол `.card` и прокручивается вместе с ней.',
          en: 'Normally `position: fixed` is relative to the window. But if an ancestor has `transform`, `perspective`, `filter`, `contain: paint` or `will-change: transform`, that ancestor becomes the containing block for fixed descendants too. `.modal` lands in `.card`’s corner and scrolls with it.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому модалки и тосты рендерят в конец `body` через портал (`createPortal` в React), а не внутри анимированных карточек. Даже `translateY(0)`, который визуально ничего не меняет, уже включает это поведение.',
          en: 'That’s why modals and toasts are rendered at the end of `body` through a portal (`createPortal` in React), not inside animated cards. Even `translateY(0)`, which changes nothing visually, triggers this behavior.',
        },
      },
    ],
    sources: [
      { title: 'MDN — position', url: `${MDN}/Web/CSS/position` },
      { title: 'MDN — Containing block', url: `${MDN}/Web/CSS/Containing_block` },
    ],
    verify: {
      kind: 'css-computed',
      selector: '.modal',
      property: 'rect.left',
      expected: '108px',
      also: [{ selector: '.modal', property: 'rect.top', expected: '50px' }],
    },
  },
  {
    id: 'css-pos-003',
    topic: 'css',
    tags: ['positioning'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Декоративный слой внутри компонента с `z-index: 1000` перекрывает выпадающее меню соседнего блока. Как ограничить z-index детей рамками компонента, не трогая его позиционирование?',
      en: 'A decorative layer inside a component with `z-index: 1000` covers a neighbor’s dropdown. How do you confine the children’s z-index to the component without touching its positioning?',
    },
    options: [
      { code: 'z-index: auto' },
      { code: 'position: relative' },
      { code: 'overflow: hidden' },
      { code: 'display: contents' },
      { code: 'isolation: isolate' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`isolation: isolate` создаёт новый **контекст наложения** (stacking context) без побочных эффектов. Все `z-index` детей теперь сравниваются только внутри компонента, а снаружи компонент участвует в наложении как единое целое.',
          en: '`isolation: isolate` creates a new **stacking context** with no side effects. The children’s `z-index` values are now compared only inside the component, and from outside it stacks as a single unit.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Тот же эффект дают `position` вместе с `z-index`, `opacity` меньше 1, `transform`, `filter` — но они меняют поведение или вид элемента. `position: relative` без `z-index` контекст наложения не создаёт, `overflow: hidden` — тоже.',
          en: '`position` combined with `z-index`, `opacity` below 1, `transform` and `filter` do the same, but they change the element’s behavior or look. `position: relative` without `z-index` doesn’t create a stacking context, and neither does `overflow: hidden`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — isolation', url: `${MDN}/Web/CSS/isolation` },
      { title: 'MDN — Stacking context', url: `${MDN}/Web/CSS/CSS_positioned_layout/Stacking_context` },
    ],
  },
];
