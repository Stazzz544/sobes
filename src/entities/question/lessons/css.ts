import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

export const CSS_LESSONS: Lesson[] = [
  {
    tag: 'cascade',
    summary: {
      ru: 'Когда несколько правил задают одно свойство, победителя выбирают по порядку: важность и происхождение, слои, специфичность, порядок в коде.',
      en: 'When several rules set the same property, the winner is chosen in order: importance and origin, layers, specificity, source order.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '[[specificity|Специфичность]] считается тройкой (id, классы/атрибуты/псевдоклассы, теги/псевдоэлементы) и сравнивается слева направо: один id сильнее любого числа классов. Инлайн-стиль сильнее любого селектора, `!important` переворачивает обычный порядок. `:is()` и `:not()` берут специфичность самого сильного аргумента, `:where()` — всегда ноль.',
          en: '[[specificity|Specificity]] is a triple (ids, classes/attributes/pseudo-classes, types/pseudo-elements) compared left to right: one id beats any number of classes. An inline style beats any selector, and `!important` flips the usual order. `:is()` and `:not()` take the specificity of their strongest argument, `:where()` is always zero.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `#nav a { color: red; }       /* (1,0,1) */
.menu .link { color: blue; } /* (0,2,0) */
a:hover { color: green; }    /* (0,1,1) */
/* a.link inside #nav.menu is red: one id beats two classes */`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`@layer` добавляет уровень выше специфичности: среди слоёв побеждает объявленный позже в списке, а стили вне слоёв сильнее любых слоёв. Наследуются в основном текстовые свойства (`color`, `font`, `line-height`); `margin`, `border`, `background` — нет. Управлять этим помогают `inherit`, `initial`, `unset` и `revert`.',
          en: '`@layer` adds a level above specificity: among layers, the one declared later in the list wins, and unlayered styles beat any layer. Mostly text properties are inherited (`color`, `font`, `line-height`); `margin`, `border`, `background` aren’t. `inherit`, `initial`, `unset` and `revert` control this.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `@layer base, components;
@layer components { .button { color: white; } }
@layer base { .button { color: black; } }
/* white: components comes later in the @layer list */`,
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Порядок: важность и происхождение → слои → специфичность → порядок в коде.',
        en: 'Order: importance and origin → layers → specificity → source order.',
      },
      { ru: 'Один id сильнее любого числа классов.', en: 'One id beats any number of classes.' },
      {
        ru: '`:where()` — нулевая специфичность, `:is()` и `:not()` — по самому сильному аргументу.',
        en: '`:where()` has zero specificity, `:is()` and `:not()` take the strongest argument.',
      },
      {
        ru: 'Стили вне слоёв сильнее стилей в `@layer`; среди слоёв побеждает объявленный позже.',
        en: 'Unlayered styles beat `@layer` styles; among layers the later-declared one wins.',
      },
      { ru: 'Наследуются в основном текстовые свойства.', en: 'Mostly text properties are inherited.' },
    ],
    sources: [
      { title: 'MDN — Introduction to the CSS cascade', url: `${MDN}/CSS_cascade/Cascade` },
      { title: 'MDN — Specificity', url: `${MDN}/CSS_cascade/Specificity` },
      { title: 'MDN — @layer', url: `${MDN}/@layer` },
    ],
  },
  {
    tag: 'selectors',
    summary: {
      ru: 'Селекторы выбирают элементы по типу, классу, атрибуту, состоянию и месту в дереве, а `:has()` позволяет выбирать по содержимому.',
      en: 'Selectors pick elements by type, class, attribute, state and position in the tree, and `:has()` lets you select by contents.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Комбинаторы: пробел — любой потомок, `>` — прямой ребёнок, `+` — следующий сосед, `~` — все следующие соседи. Псевдоклассы описывают состояние и положение: `:hover`, `:focus-visible`, `:nth-child(2n+1)`, `:not()`. Псевдоэлементы `::before` и `::after` без `content` не отображаются.',
          en: 'Combinators: a space — any descendant, `>` — a direct child, `+` — the next sibling, `~` — all following siblings. Pseudo-classes describe state and position: `:hover`, `:focus-visible`, `:nth-child(2n+1)`, `:not()`. The `::before` and `::after` pseudo-elements aren’t rendered without `content`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.card:has(img) { padding: 0; }      /* a card that contains an image */
li:nth-child(odd) { font-weight: 500; }
input:focus-visible { outline: 2px solid; }
h2 + p { margin-top: 0; }            /* the paragraph right after h2 */`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`:has()` — первый «родительский» селектор: он выбирает элемент по тому, что внутри или после него, — раньше для этого нужен был JavaScript. `:focus-visible` показывает рамку фокуса при навигации с клавиатуры и не показывает при клике мышью — так не нужно убирать `outline` ради красоты.',
          en: '`:has()` is the first “parent” selector: it picks an element by what’s inside or after it — this used to need JavaScript. `:focus-visible` shows the focus ring when navigating with a keyboard and hides it on mouse clicks — so there’s no need to remove `outline` for looks.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Пробел — потомок, `>` — ребёнок, `+` — следующий сосед, `~` — все следующие.',
        en: 'Space — descendant, `>` — child, `+` — next sibling, `~` — all following.',
      },
      { ru: '`:has()` выбирает элемент по содержимому.', en: '`:has()` selects an element by its contents.' },
      { ru: '`:nth-child(an+b)` считает позиции среди соседей с единицы.', en: '`:nth-child(an+b)` counts sibling positions from one.' },
      { ru: '`::before` и `::after` без `content` не отображаются.', en: '`::before` and `::after` aren’t rendered without `content`.' },
      {
        ru: '`:focus-visible` показывает фокус при навигации с клавиатуры.',
        en: '`:focus-visible` shows focus for keyboard navigation.',
      },
    ],
    sources: [
      { title: 'MDN — CSS selectors', url: `${MDN}/CSS_selectors` },
      { title: 'MDN — :has()', url: `${MDN}/:has` },
      { title: 'MDN — :focus-visible', url: `${MDN}/:focus-visible` },
    ],
  },
  {
    tag: 'box-model',
    summary: {
      ru: 'Каждый элемент — прямоугольник из содержимого, `padding`, `border` и `margin`, а `box-sizing` решает, к чему относится `width`.',
      en: 'Every element is a box of content, `padding`, `border` and `margin`, and `box-sizing` decides what `width` refers to.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'При `content-box` (по умолчанию) `width` — ширина содержимого, а `padding` и `border` прибавляются. При `border-box` они входят в `width`. У строчных элементов (`span`, `a`) `width` и `height` не действуют, а вертикальные `margin` не раздвигают строки — нужен `inline-block` или `block`.',
          en: 'With `content-box` (the default), `width` is the content width and `padding` and `border` are added on top. With `border-box` they’re included in `width`. On inline elements (`span`, `a`) `width` and `height` have no effect, and vertical `margin`s don’t push lines apart — use `inline-block` or `block`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid;
  /* content-box: 250px on screen, border-box: 200px */
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Вертикальные `margin` соседей и первого ребёнка с родителем (без `padding` и `border` между ними) схлопываются до большего значения; горизонтальные — никогда, и во flex и grid тоже нет. Проценты в `padding` и `margin` считаются от **ширины** контейнера — даже сверху и снизу.',
          en: 'Vertical margins of siblings, and of a first child with its parent (with no `padding` or `border` between them), collapse to the larger value; horizontal ones never do, and neither do margins in flex and grid. Percentages in `padding` and `margin` are relative to the container’s **width** — even for top and bottom.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.wrap { width: 400px; }
.wrap .ratio { padding-top: 50%; } /* 200px: half of the WIDTH */`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Размер = содержимое + `padding` + `border`; `margin` — снаружи.', en: 'Size = content + `padding` + `border`; `margin` is outside.' },
      {
        ru: '`content-box`: `width` — только содержимое; `border-box` — вместе с `padding` и `border`.',
        en: '`content-box`: `width` is content only; `border-box` includes `padding` and `border`.',
      },
      { ru: 'Вертикальные `margin` схлопываются, горизонтальные — никогда.', en: 'Vertical margins collapse, horizontal ones never do.' },
      {
        ru: 'Проценты в `padding` и `margin` — от ширины контейнера.',
        en: 'Percentages in `padding` and `margin` are relative to the container width.',
      },
      { ru: 'У строчных элементов `width` и `height` не работают.', en: '`width` and `height` don’t apply to inline elements.' },
    ],
    sources: [
      { title: 'MDN — box-sizing', url: `${MDN}/box-sizing` },
      { title: 'MDN — Mastering margin collapsing', url: `${MDN}/CSS_box_model/Mastering_margin_collapsing` },
      { title: 'MDN — padding-top', url: `${MDN}/padding-top` },
    ],
  },
  {
    tag: 'flexbox',
    summary: {
      ru: 'Flexbox раскладывает элементы в линию по главной оси и делит свободное место; `flex: 1` значит «расти и сжимайся от нуля».',
      en: 'Flexbox lays items out in a line along the main axis and distributes free space; `flex: 1` means “grow and shrink from zero”.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`flex-direction` задаёт главную ось, `justify-content` выравнивает по ней, `align-items` — по поперечной; `gap` даёт расстояние без `margin`, `flex-wrap: wrap` переносит элементы. Сокращение `flex` — это `grow shrink basis`: `flex: 1` = `1 1 0%`, `flex: auto` = `1 1 auto`, `flex: none` = `0 0 auto`.',
          en: '`flex-direction` sets the main axis, `justify-content` aligns along it, `align-items` along the cross axis; `gap` adds spacing without `margin`, `flex-wrap: wrap` moves items to new lines. The `flex` shorthand is `grow shrink basis`: `flex: 1` = `1 1 0%`, `flex: auto` = `1 1 auto`, `flex: none` = `0 0 auto`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.row { display: flex; gap: 8px; }
.row > .main { flex: 1; min-width: 0; } /* takes free space, may shrink below its content */
.row > .side { flex: none; }            /* keeps its own size */`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Частая ловушка: у flex-элемента `min-width: auto`, поэтому он не сжимается уже своего содержимого — длинная строка или таблица распирают раскладку. `min-width: 0` (или `overflow: hidden`) разрешает сжатие, и тогда работает `text-overflow: ellipsis`.',
          en: 'A common trap: a flex item has `min-width: auto`, so it won’t shrink below its content — a long line or a table blows up the layout. `min-width: 0` (or `overflow: hidden`) allows shrinking, and then `text-overflow: ellipsis` works.',
        },
      },
    ],
    keyPoints: [
      {
        ru: '`justify-content` — по главной оси, `align-items` — по поперечной.',
        en: '`justify-content` works on the main axis, `align-items` on the cross axis.',
      },
      { ru: '`flex: 1` = `1 1 0%`: расти, сжиматься, база ноль.', en: '`flex: 1` = `1 1 0%`: grow, shrink, zero basis.' },
      {
        ru: 'Без `min-width: 0` flex-элемент не сжимается уже содержимого.',
        en: 'Without `min-width: 0` a flex item won’t shrink below its content.',
      },
      { ru: '`flex-wrap: wrap` переносит элементы на новые строки.', en: '`flex-wrap: wrap` moves items onto new lines.' },
      { ru: '`gap` задаёт расстояние между элементами без `margin`.', en: '`gap` sets spacing between items without `margin`.' },
    ],
    sources: [
      { title: 'MDN — Basic concepts of flexbox', url: `${MDN}/CSS_flexible_box_layout/Basic_concepts_of_flexbox` },
      { title: 'MDN — flex', url: `${MDN}/flex` },
      { title: 'MDN — min-width', url: `${MDN}/min-width` },
    ],
  },
  {
    tag: 'css-grid',
    summary: {
      ru: 'Grid — двумерная раскладка: строки и колонки сразу. Flexbox — для линии, Grid — для сетки.',
      en: 'Grid is a two-dimensional layout: rows and columns at once. Flexbox is for a line, Grid for a grid.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`grid-template-columns` задаёт колонки, `fr` — долю свободного места после фиксированных треков, `minmax(a, b)` — диапазон размера. `repeat(auto-fit, minmax(160px, 1fr))` даёт адаптивную сетку без медиазапросов: колонок столько, сколько влезает. `auto-fit` схлопывает пустые колонки, и элементы растягиваются; `auto-fill` оставляет пустые треки.',
          en: '`grid-template-columns` defines columns, `fr` is a share of free space after fixed tracks, `minmax(a, b)` a size range. `repeat(auto-fit, minmax(160px, 1fr))` gives a responsive grid without media queries: as many columns as fit. `auto-fit` collapses empty columns so items stretch; `auto-fill` keeps empty tracks.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}
.cards .wide { grid-column: span 2; }`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`grid-template-areas` описывает раскладку страницы именами областей — её видно прямо в коде. Выбор простой: если размеры диктует содержимое и элементы идут в одну линию — Flexbox; если раскладка задаёт и строки, и колонки — Grid.',
          en: '`grid-template-areas` describes the page layout with named areas — you can see it right in the code. The choice is simple: if content drives the sizes and items flow in one line, use Flexbox; if the layout defines both rows and columns, use Grid.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    'header header'
    'sidebar main';
}`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Grid управляет строками и колонками одновременно.', en: 'Grid controls rows and columns at the same time.' },
      { ru: '`fr` — доля свободного места после фиксированных треков.', en: '`fr` is a share of free space after fixed tracks.' },
      {
        ru: '`repeat(auto-fit, minmax(160px, 1fr))` — адаптивная сетка без медиазапросов.',
        en: '`repeat(auto-fit, minmax(160px, 1fr))` is a responsive grid without media queries.',
      },
      { ru: '`auto-fit` схлопывает пустые колонки, `auto-fill` оставляет.', en: '`auto-fit` collapses empty columns, `auto-fill` keeps them.' },
      { ru: '`grid-template-areas` задаёт раскладку именами областей.', en: '`grid-template-areas` defines the layout with area names.' },
    ],
    sources: [
      { title: 'MDN — grid-template-columns', url: `${MDN}/grid-template-columns` },
      { title: 'MDN — repeat()', url: `${MDN}/repeat` },
      { title: 'MDN — minmax()', url: `${MDN}/minmax` },
    ],
  },
  {
    tag: 'positioning',
    summary: {
      ru: '`position` решает, от чего отсчитываются `top` и `left` и участвует ли элемент в потоке, а `z-index` работает внутри контекста наложения.',
      en: '`position` decides what `top` and `left` are measured from and whether the element stays in the flow, while `z-index` works within a stacking context.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`relative` сдвигает элемент от его места, сохраняя место в потоке. `absolute` вынимает из потока и отсчитывает от ближайшего позиционированного предка (`position` не `static`). `fixed` привязан к окну — но если у предка есть `transform` или `filter`, то к этому предку. `sticky` ведёт себя как `relative`, пока не достигнет порога `top` внутри прокручиваемого предка.',
          en: '`relative` shifts an element from its place while keeping its space in the flow. `absolute` removes it from the flow and measures from the nearest positioned ancestor (`position` other than `static`). `fixed` is tied to the viewport — unless an ancestor has `transform` or `filter`, then to that ancestor. `sticky` acts like `relative` until it reaches its `top` threshold within the scrolling ancestor.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.card { position: relative; }
.card .badge { position: absolute; top: 8px; right: 8px; } /* relative to .card */
.header { position: sticky; top: 0; }`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`z-index` сравнивается только между элементами одного [[stacking-context|контекста наложения]]. Новый контекст создают позиционированный элемент с `z-index`, `opacity < 1`, `transform`, `filter`, `isolation: isolate` и другие свойства — и дети уже не выберутся выше соседей родителя, какой бы `z-index` им ни дали. `isolation: isolate` создаёт контекст без побочных эффектов.',
          en: '`z-index` is compared only between elements of the same [[stacking-context|stacking context]]. A new context is created by a positioned element with `z-index`, `opacity < 1`, `transform`, `filter`, `isolation: isolate` and other properties — and its children can’t rise above the parent’s siblings, whatever `z-index` they get. `isolation: isolate` creates a context without side effects.',
        },
      },
    ],
    keyPoints: [
      { ru: '`absolute` отсчитывается от ближайшего позиционированного предка.', en: '`absolute` is measured from the nearest positioned ancestor.' },
      {
        ru: '`fixed` привязан к окну, но `transform` у предка делает его относительным к предку.',
        en: '`fixed` is tied to the viewport, but an ancestor’s `transform` makes it relative to that ancestor.',
      },
      {
        ru: '`sticky` прилипает внутри прокручиваемого предка и требует `top`.',
        en: '`sticky` sticks within its scrolling ancestor and needs `top`.',
      },
      { ru: '`z-index` сравнивается внутри одного контекста наложения.', en: '`z-index` is compared within one stacking context.' },
      {
        ru: '`transform`, `opacity < 1` и `isolation: isolate` создают новый контекст.',
        en: '`transform`, `opacity < 1` and `isolation: isolate` create a new context.',
      },
    ],
    sources: [
      { title: 'MDN — position', url: `${MDN}/position` },
      { title: 'MDN — Containing block', url: `${MDN}/Containing_block` },
      { title: 'MDN — Stacking context', url: `${MDN}/CSS_positioned_layout/Stacking_context` },
    ],
  },
  {
    tag: 'css-units',
    summary: {
      ru: 'Единицы бывают абсолютные (`px`) и относительные: от шрифта (`em`, `rem`), от окна (`vw`, `dvh`), от контейнера (`%`).',
      en: 'Units are absolute (`px`) or relative: to the font (`em`, `rem`), the viewport (`vw`, `dvh`), the container (`%`).',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`em` считается от `font-size` самого элемента, а внутри `font-size` — от шрифта родителя, поэтому вложенные `em` накапливаются. `rem` всегда от корня (`html`). `%` зависит от свойства: в `width` — от ширины контейнера, в `font-size` — от шрифта родителя. `vh` на мобильных не учитывает выезжающую панель браузера — для полной высоты экрана берут `dvh`.',
          en: '`em` is relative to the element’s own `font-size`, and inside `font-size` to the parent’s font, so nested `em`s compound. `rem` is always relative to the root (`html`). `%` depends on the property: in `width` it’s the container width, in `font-size` the parent font. `vh` on mobile ignores the sliding browser bar — use `dvh` for the full screen height.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `html { font-size: 16px; }
.parent { font-size: 20px; }
.parent .child { font-size: 1.5em; padding: 1em; } /* font 30px, padding 30px */
.parent .other { font-size: 1.5rem; }              /* 24px: from the root */
.screen { min-height: 100dvh; }`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`clamp(min, предпочтительное, max)` задаёт плавное значение с границами — например, размер заголовка, который растёт с окном, но не выходит за пределы. `calc()` смешивает единицы, а кастомные свойства (`var(--gap)`) делают значения настраиваемыми.',
          en: '`clamp(min, preferred, max)` sets a fluid value with bounds — e.g. a heading size that grows with the viewport but stays within limits. `calc()` mixes units, and custom properties (`var(--gap)`) make values configurable.',
        },
      },
      {
        type: 'code',
        code: { lang: 'css', source: `h1 { font-size: clamp(1.5rem, 4vw, 3rem); }` },
      },
    ],
    keyPoints: [
      {
        ru: '`em` — от `font-size` элемента (в `font-size` — от родителя), `rem` — от корня.',
        en: '`em` is relative to the element’s `font-size` (in `font-size`, to the parent), `rem` to the root.',
      },
      { ru: 'Вложенные `em` накапливаются, `rem` — нет.', en: 'Nested `em`s compound, `rem`s don’t.' },
      {
        ru: '`%` в `width` — от ширины контейнера, в `font-size` — от шрифта родителя.',
        en: '`%` in `width` is the container width, in `font-size` the parent font.',
      },
      {
        ru: '`dvh` учитывает выезжающие панели мобильного браузера, `vh` — нет.',
        en: '`dvh` accounts for mobile browser bars, `vh` doesn’t.',
      },
      { ru: '`clamp()` задаёт плавное значение с минимумом и максимумом.', en: '`clamp()` sets a fluid value with a minimum and maximum.' },
    ],
    sources: [
      { title: 'MDN — CSS values and units: length', url: `${MDN}/length` },
      { title: 'MDN — font-size', url: `${MDN}/font-size` },
      { title: 'MDN — clamp()', url: `${MDN}/clamp` },
    ],
  },
  {
    tag: 'responsive',
    summary: {
      ru: 'Адаптивная вёрстка начинается с `viewport` и гибких раскладок, а медиазапросы и container queries подстраивают остальное.',
      en: 'Responsive design starts with `viewport` and fluid layouts, and media queries and container queries adjust the rest.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Без `<meta name="viewport">` мобильный браузер рисует страницу шириной около 980 px и уменьшает её. Подход mobile-first: базовые стили — для узкого экрана, а запросы `min-width` добавляют раскладку для широких. Большую часть задач решают гибкие единицы и раскладки (`fr`, `minmax`, `clamp`, `max-width: 100%` у картинок) — медиазапросы остаются для крупных перестроений.',
          en: 'Without `<meta name="viewport">` a mobile browser renders the page about 980 px wide and scales it down. Mobile-first: base styles target narrow screens, and `min-width` queries add layout for wider ones. Fluid units and layouts (`fr`, `minmax`, `clamp`, `max-width: 100%` on images) solve most problems — media queries remain for major rearrangements.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'html',
          source: `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.layout { display: grid; gap: 16px; }
@media (min-width: 768px) {
  .layout { grid-template-columns: 240px 1fr; }
}

.card-list { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: flex; }
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Container queries** реагируют на размер контейнера, а не окна: одна и та же карточка выглядит по-разному в узкой боковой колонке и в широкой ленте. Учитывайте и настройки пользователя: `prefers-color-scheme`, `prefers-reduced-motion`. Картинкам под разные экраны — `srcset` и `sizes`.',
          en: '**Container queries** respond to the container’s size rather than the viewport: the same card looks different in a narrow sidebar and a wide feed. Respect user preferences too: `prefers-color-scheme`, `prefers-reduced-motion`. For images on different screens — `srcset` and `sizes`.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Без `meta viewport` мобильный браузер рисует ~980 px и уменьшает.',
        en: 'Without `meta viewport` a mobile browser renders ~980 px and scales down.',
      },
      {
        ru: 'Mobile-first: базовые стили для узких экранов, `min-width` добавляет.',
        en: 'Mobile-first: base styles for narrow screens, `min-width` adds more.',
      },
      {
        ru: 'Гибкие единицы и раскладки решают большую часть задач без медиазапросов.',
        en: 'Fluid units and layouts solve most problems without media queries.',
      },
      { ru: 'Container queries реагируют на размер контейнера, а не окна.', en: 'Container queries respond to the container size, not the viewport.' },
      { ru: '`srcset` и `sizes` подбирают картинку под экран.', en: '`srcset` and `sizes` pick an image for the screen.' },
    ],
    sources: [
      { title: 'MDN — Viewport meta tag', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag' },
      { title: 'MDN — Using media queries', url: `${MDN}/CSS_media_queries/Using_media_queries` },
      { title: 'MDN — Container queries', url: `${MDN}/CSS_containment/Container_queries` },
    ],
  },
  {
    tag: 'animations',
    summary: {
      ru: '`transition` анимирует переход между двумя состояниями, `@keyframes` — сценарий из нескольких шагов. Плавно анимируются `transform` и `opacity`.',
      en: '`transition` animates the change between two states, `@keyframes` a multi-step scenario. `transform` and `opacity` animate smoothly.',
    },
    blocks: [
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `.button { transition: transform 150ms ease-out; }
.button:hover { transform: scale(1.05); }

@keyframes pulse {
  from { opacity: 1; }
  to { opacity: 0.4; }
}
.loading { animation: pulse 800ms ease-in-out infinite alternate; }

@media (prefers-reduced-motion: reduce) {
  * { animation: none; transition: none; }
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Анимация `width`, `height`, `top` или `margin` пересчитывает layout на каждом кадре — на слабых устройствах это рывки. `transform` и `opacity` обычно обрабатываются на этапе composite, без layout и paint. `will-change` заранее выносит элемент в отдельный слой — но каждый слой стоит памяти, поэтому его ставят точечно.',
          en: 'Animating `width`, `height`, `top` or `margin` recalculates layout every frame — janky on weak devices. `transform` and `opacity` are usually handled at the composite stage, without layout and paint. `will-change` promotes an element to its own layer in advance — but every layer costs memory, so use it sparingly.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Раньше нельзя было анимировать переход к `height: auto` и появление после `display: none`. В новых браузерах это делают `interpolate-size: allow-keywords`, `transition-behavior: allow-discrete` и `@starting-style`. Настройку `prefers-reduced-motion` уважайте всегда: у части людей движение вызывает дискомфорт.',
          en: 'Animating to `height: auto` or appearing after `display: none` used to be impossible. In new browsers `interpolate-size: allow-keywords`, `transition-behavior: allow-discrete` and `@starting-style` do it. Always respect `prefers-reduced-motion`: motion makes some people feel unwell.',
        },
      },
    ],
    keyPoints: [
      {
        ru: '`transition` — переход между состояниями, `animation` с `@keyframes` — сценарий.',
        en: '`transition` is a change between states, `animation` with `@keyframes` is a scenario.',
      },
      { ru: 'Анимируйте `transform` и `opacity`: они не запускают layout.', en: 'Animate `transform` and `opacity`: they don’t trigger layout.' },
      {
        ru: 'Анимация `width`, `height`, `top` пересчитывает layout на каждом кадре.',
        en: 'Animating `width`, `height`, `top` recalculates layout every frame.',
      },
      { ru: 'Уважайте `prefers-reduced-motion`.', en: 'Respect `prefers-reduced-motion`.' },
      {
        ru: '`height: auto` анимируется через `interpolate-size: allow-keywords` в новых браузерах.',
        en: '`height: auto` animates via `interpolate-size: allow-keywords` in new browsers.',
      },
    ],
    sources: [
      { title: 'MDN — Using CSS transitions', url: `${MDN}/CSS_transitions/Using_CSS_transitions` },
      { title: 'MDN — Using CSS animations', url: `${MDN}/CSS_animations/Using_CSS_animations` },
      { title: 'MDN — interpolate-size', url: `${MDN}/interpolate-size` },
    ],
  },
  {
    tag: 'modern-css',
    summary: {
      ru: 'Современный CSS решает задачи, для которых раньше нужны были препроцессор или JS: переменные, вложенность, `:has()`, слои, смешивание цветов.',
      en: 'Modern CSS solves problems that used to need a preprocessor or JS: variables, nesting, `:has()`, layers, color mixing.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Кастомные свойства (`--accent`) живут во время работы страницы: наследуются, переопределяются в медиазапросах и для тем, меняются из JavaScript. Переменные Sass, наоборот, исчезают при компиляции. Вложенность с `&`, `:has()`, `@layer` и container queries теперь есть в браузерах без сборки.',
          en: 'Custom properties (`--accent`) live at runtime: they inherit, can be overridden in media queries and themes, and change from JavaScript. Sass variables, by contrast, disappear at compile time. Nesting with `&`, `:has()`, `@layer` and container queries now work in browsers without a build step.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `:root { --accent: #3748c6; }

.card {
  border: 1px solid color-mix(in srgb, var(--accent), transparent 70%);

  & .title { color: var(--accent); }
  &:has(img) { padding: 0; }
}`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ещё полезное: `color-mix()` и `light-dark()` для цветов, `aspect-ratio` для пропорций, логические свойства (`margin-inline`, `padding-block`) для языков с другим направлением письма, `subgrid` для выравнивания по сетке родителя. Перед использованием проверяйте статус Baseline — он показывает, поддерживают ли свойство все основные браузеры.',
          en: 'Also handy: `color-mix()` and `light-dark()` for colors, `aspect-ratio` for proportions, logical properties (`margin-inline`, `padding-block`) for languages with other writing directions, `subgrid` to align with the parent grid. Check the Baseline status before using a feature — it shows whether all major browsers support it.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Кастомные свойства наследуются и меняются во время работы — темы без пересборки.',
        en: 'Custom properties inherit and change at runtime — themes without rebuilding.',
      },
      { ru: 'Вложенность с `&` работает без препроцессора.', en: 'Nesting with `&` works without a preprocessor.' },
      { ru: '`:has()` — «родительский» селектор.', en: '`:has()` is a “parent” selector.' },
      { ru: '`color-mix()` смешивает цвета прямо в CSS.', en: '`color-mix()` mixes colors right in CSS.' },
      { ru: 'Поддержку свойства проверяют по Baseline.', en: 'Check feature support with Baseline.' },
    ],
    sources: [
      { title: 'MDN — Using CSS custom properties', url: `${MDN}/Using_CSS_custom_properties` },
      { title: 'MDN — Using CSS nesting', url: `${MDN}/CSS_nesting/Using_CSS_nesting` },
      { title: 'web.dev — Baseline', url: 'https://web.dev/baseline' },
    ],
  },
];
