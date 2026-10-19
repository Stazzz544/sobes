import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

export const CSS_LESSONS: Lesson[] = [
  {
    tag: 'cascade',
    format: 'steps',
    summary: {
      ru: 'Каскад решает, какое из конфликтующих объявлений победит, а наследование — что элемент получит от родителя. Это основа, без которой стили кажутся случайными.',
      en: 'The cascade decides which of the conflicting declarations wins, and inheritance decides what an element gets from its parent. Without this foundation styles seem random.',
    },
    steps: [
      {
        id: 'order',
        title: { ru: 'Порядок каскада', en: 'Cascade order' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Когда несколько объявлений спорят за одно свойство, браузер сравнивает их по очереди и останавливается на первом различии: **важность** (`!important`), инлайн-стиль, **слои** `@layer`, **специфичность** и, наконец, **порядок** в коде. Поэтому `!important` из таблицы стилей перебивает обычный атрибут `style`, хотя инлайн-стиль сильнее любого селектора.',
              en: 'When several declarations compete for one property, the browser compares them in turn and stops at the first difference: **importance** (`!important`), inline style, `@layer` **layers**, **specificity** and finally source **order**. That’s why `!important` in a stylesheet beats a normal `style` attribute, even though an inline style beats any selector.',
            },
          },
          { type: 'diagram', diagram: 'css-cascade-order' },
        ],
        test: ['css-cascade-008'],
      },
      {
        id: 'specificity',
        title: { ru: 'Специфичность', en: 'Specificity' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '[[specificity|Специфичность]] — три разряда: ID; классы, атрибуты и псевдоклассы; типы элементов и псевдоэлементы. Разряды сравниваются слева направо: один ID сильнее любого количества классов. Комбинаторы и `*` ничего не добавляют. В списке через запятую каждый селектор считается **отдельно**, и для элемента важен тот, что с ним совпал. При равной специфичности побеждает правило ниже по коду.',
              en: '[[specificity|Specificity]] has three digits: IDs; classes, attributes and pseudo-classes; element types and pseudo-elements. The digits are compared left to right: one ID beats any number of classes. Combinators and `*` add nothing. In a comma-separated list each selector counts **separately**, and what matters is the one that matched the element. With equal specificity the later rule wins.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.menu a {}         /* 0,1,1 */\n#top a {}          /* 1,0,1 */\nnav .item:hover {} /* 0,2,1 */',
            },
          },
        ],
        test: ['css-cascade-002', 'css-cascade-001'],
      },
      {
        id: 'is-where',
        title: { ru: ':is() и :where()', en: ':is() and :where()' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`:is()` и `:where()` принимают список селекторов и совпадают, если подходит любой. Специфичность `:is()` равна специфичности **самого сильного** аргумента — даже если совпал другой: `:is(#id, .x)` весит как ID. `:where()` всегда даёт **ноль** — поэтому им пишут базовые стили и сбросы, которые легко перебить чем угодно.',
              en: '`:is()` and `:where()` take a list of selectors and match if any fits. The specificity of `:is()` equals that of its **strongest** argument — even if another one matched: `:is(#id, .x)` weighs as an ID. `:where()` always counts as **zero** — so it’s used for base styles and resets that anything can override.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: ':is(.title, #logo) span {} /* 1,0,1 */\n:where(.title) span {}     /* 0,0,1 */',
            },
          },
        ],
        test: ['css-cascade-003', 'css-cascade-009'],
      },
      {
        id: 'inheritance',
        title: { ru: 'Наследование', en: 'Inheritance' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Часть свойств **наследуется**: потомок получает значение родителя, если своего нет. Наследуются в основном свойства текста — `color`, `font-*`, `line-height`, `text-align`, а ещё `visibility` и `cursor`. Свойства бокса — `margin`, `padding`, `border`, `background`, `width` — не наследуются. Если у рамки не задан цвет, она берёт `currentColor` — текущий цвет текста самого элемента.',
              en: 'Some properties are **inherited**: a descendant gets the parent’s value if it has none of its own. Mostly text properties inherit — `color`, `font-*`, `line-height`, `text-align`, plus `visibility` and `cursor`. Box properties — `margin`, `padding`, `border`, `background`, `width` — don’t. If a border has no color set, it uses `currentColor` — the element’s own text color.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'link-color',
              prompt: {
                ru: 'Абзацу задан `color: green`, а ссылка внутри осталась синей. Почему?',
                en: 'A paragraph has `color: green`, but the link inside stays blue. Why?',
              },
              options: [
                { text: { ru: '`color` не наследуется', en: '`color` isn’t inherited' } },
                { text: { ru: 'У ссылки свой цвет из стилей браузера, а наследуется только при отсутствии своего', en: 'The link has its own color from browser styles, and inheritance applies only when there’s none' } },
                { text: { ru: 'Ссылки всегда синие', en: 'Links are always blue' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Стили браузера задают ссылке цвет напрямую. Чтобы она брала цвет текста, пишут `a { color: inherit; }`.',
                en: 'Browser styles set the link’s color directly. To make it follow the text color, write `a { color: inherit; }`.',
              },
            },
          },
        ],
        test: ['css-cascade-004', 'css-cascade-011'],
      },
      {
        id: 'keywords',
        title: { ru: 'inherit, initial, unset', en: 'inherit, initial, unset' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Любому свойству можно задать ключевое слово каскада. `inherit` — взять значение родителя. `initial` — начальное значение **по спецификации**: для `color` это цвет текста по умолчанию, а не цвет родителя. `unset` действует как `inherit` для наследуемых свойств и как `initial` для остальных. `revert` откатывает к стилям браузера — например, вернёт `display: block` у `div`.',
              en: 'Any property accepts a cascade keyword. `inherit` takes the parent’s value. `initial` is the **spec’s** initial value: for `color` that’s the default text color, not the parent’s. `unset` acts as `inherit` for inherited properties and as `initial` for the rest. `revert` rolls back to browser styles — for example, restoring `display: block` on a `div`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.reset {\n  all: unset;\n}',
            },
          },
        ],
        test: ['css-cascade-005'],
      },
    ],
    keyPoints: [
      { ru: 'Важность → инлайн → слои → специфичность → порядок.', en: 'Importance → inline → layers → specificity → order.' },
      { ru: 'Один ID сильнее любого числа классов.', en: 'One ID beats any number of classes.' },
      { ru: '`:is()` весит как сильнейший аргумент, `:where()` — ноль.', en: '`:is()` weighs as its strongest argument; `:where()` is zero.' },
      { ru: 'Наследуются свойства текста, не бокса.', en: 'Text properties inherit; box properties don’t.' },
      { ru: '`initial` — значение спецификации, а не родителя.', en: '`initial` is the spec value, not the parent’s.' },
    ],
    sources: [
      { title: 'MDN — Introduction to the CSS cascade', url: `${MDN}/CSS_cascade/Cascade` },
      { title: 'MDN — Specificity', url: `${MDN}/CSS_cascade/Specificity` },
      { title: 'MDN — Inheritance', url: `${MDN}/CSS_cascade/Inheritance` },
      { title: 'MDN — :where()', url: `${MDN}/:where` },
    ],
  },
  {
    tag: 'selectors',
    format: 'steps',
    summary: {
      ru: 'Селектор выбирает элементы, к которым применится правило. Разберём комбинаторы, счёт `:nth-child`, «родительский» `:has()` и псевдоэлементы — на них чаще всего ошибаются.',
      en: 'A selector picks the elements a rule applies to. We’ll cover combinators, how `:nth-child` counts, the “parent” `:has()` and pseudo-elements — the usual sources of mistakes.',
    },
    steps: [
      {
        id: 'combinators',
        title: { ru: 'Комбинаторы', en: 'Combinators' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Комбинатор описывает связь между элементами. Пробел — любой потомок, `>` — только прямой ребёнок. `+` — **соседний** элемент, идущий сразу следом, `~` — **все** следующие соседи того же родителя, не обязательно вплотную. Соседние комбинаторы смотрят только вперёд по разметке: предыдущих соседей ими не выбрать.',
              en: 'A combinator describes how elements relate. A space means any descendant, `>` only a direct child. `+` is the **adjacent** element right after, `~` is **all** following siblings of the same parent, not necessarily adjacent. Sibling combinators only look forward in the markup: you can’t select previous siblings with them.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: 'nav > a {}  /* direct child */\nh3 + p {}   /* next sibling */\nh3 ~ p {}   /* all later siblings */',
            },
          },
          {
            type: 'check',
            check: {
              id: 'sibling-backwards',
              prompt: {
                ru: 'Выберет ли `h3 + p` абзац, который стоит **перед** `h3`?',
                en: 'Will `h3 + p` select a paragraph that comes **before** the `h3`?',
              },
              options: [
                { text: { ru: 'Да, соседи есть с обеих сторон', en: 'Yes, siblings exist on both sides' } },
                { text: { ru: 'Нет: соседние комбинаторы смотрят только вперёд', en: 'No: sibling combinators only look forward' } },
                { text: { ru: 'Только если между ними нет других элементов', en: 'Only if nothing else is between them' } },
              ],
              answer: 1,
              explanation: {
                ru: '`+` и `~` выбирают элементы **после** первого. Предыдущего соседа выбирают обходным путём — например, через `:has()`.',
                en: '`+` and `~` select elements **after** the first one. A previous sibling needs a workaround — such as `:has()`.',
              },
            },
          },
        ],
        test: ['css-selectors-001'],
      },
      {
        id: 'nth-child',
        title: { ru: 'Как считает :nth-child', en: 'How :nth-child counts' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`:nth-child(2)` считает **всех** детей родителя и только потом проверяет остальную часть селектора: `p:nth-child(2)` — «второй ребёнок, если он `p`». Чтобы считать только абзацы, нужен `:nth-of-type(2)`. Синтаксис `:nth-child(2 of .done)` сначала отбирает детей, подходящих под селектор после `of`, и считает позицию среди них. Формула `An+B`: `2n` — чётные, `-n+3` — первые три.',
              en: '`:nth-child(2)` counts **all** of the parent’s children and only then checks the rest of the selector: `p:nth-child(2)` means “the second child, if it’s a `p`”. To count only paragraphs, use `:nth-of-type(2)`. The `:nth-child(2 of .done)` syntax first picks the children matching the selector after `of` and counts the position among them. The `An+B` formula: `2n` is even, `-n+3` is the first three.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: 'li:nth-child(odd) {}\nli:nth-of-type(2) {}\nli:nth-child(1 of .active) {}',
            },
          },
        ],
        test: ['css-selectors-002'],
      },
      {
        id: 'has',
        title: { ru: 'Родительский :has()', en: 'The parent selector :has()' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`:has()` выбирает элемент, внутри которого есть совпадение с аргументом, — «родительский» селектор, которого CSS не хватало много лет. Аргумент отсчитывается от самого элемента: `.card:has(> img)` требует **прямого** потомка `img`, а `.card:has(img)` — любого. Так стилизуют карточку с картинкой, поле с ошибкой внутри формы или `label` с отмеченным чекбоксом — без JavaScript.',
              en: '`:has()` selects an element that contains a match for its argument — the “parent” selector CSS lacked for years. The argument is relative to the element itself: `.card:has(> img)` requires a **direct** child `img`, while `.card:has(img)` accepts any. It styles a card with an image, a field with an error inside a form or a `label` with a checked checkbox — without JavaScript.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.field:has(input:invalid) {\n  border-color: red;\n}',
            },
          },
        ],
        test: ['css-selectors-003'],
      },
      {
        id: 'pseudo',
        title: { ru: 'Псевдоэлементы и :empty', en: 'Pseudo-elements and :empty' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`::before` и `::after` — псевдоэлементы: браузер создаёт их, только если задано `content`. Без него бокса нет, и `width` или `background` ни на что не влияют; для декоративной точки пишут `content: \'\'`. Псевдокласс `:empty` срабатывает, только если внутри нет **ничего**: даже пробел или перенос строки — уже текстовый узел, и элемент не считается пустым.',
              en: '`::before` and `::after` are pseudo-elements: the browser creates them only if `content` is set. Without it there’s no box, and `width` or `background` have no effect; a decorative dot uses `content: \'\'`. The `:empty` pseudo-class matches only if there’s **nothing** inside: even a space or a line break is a text node, so the element isn’t empty.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: ".required::after {\n  content: '*';\n  color: red;\n}",
            },
          },
        ],
        test: ['css-selectors-004', 'css-selectors-006'],
      },
    ],
    keyPoints: [
      { ru: '`+` — следующий сосед, `~` — все следующие.', en: '`+` is the next sibling, `~` all later ones.' },
      { ru: '`:nth-child` считает всех детей, `:nth-of-type` — своего типа.', en: '`:nth-child` counts all children; `:nth-of-type` its own type.' },
      { ru: '`:has()` — выбор по содержимому.', en: '`:has()` selects by content.' },
      { ru: 'Без `content` псевдоэлемента нет.', en: 'No `content`, no pseudo-element.' },
    ],
    sources: [
      { title: 'MDN — CSS selectors', url: `${MDN}/CSS_selectors` },
      { title: 'MDN — :nth-child()', url: `${MDN}/:nth-child` },
      { title: 'MDN — :has()', url: `${MDN}/:has` },
      { title: 'MDN — ::before', url: `${MDN}/::before` },
    ],
  },
  {
    tag: 'box-model',
    format: 'steps',
    summary: {
      ru: 'Каждый элемент — прямоугольник из содержимого, внутренних отступов, рамки и внешних отступов. Как считается его размер и почему отступы ведут себя неожиданно — в этом уроке.',
      en: 'Every element is a rectangle of content, padding, border and margin. How its size is calculated and why spacing behaves unexpectedly — that’s this lesson.',
    },
    steps: [
      {
        id: 'box-sizing',
        title: { ru: 'box-sizing', en: 'box-sizing' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'По умолчанию `box-sizing: content-box`: `width` задаёт только область содержимого, а `padding` и `border` прибавляются с обеих сторон. При `border-box` в `width` уже входят отступы и рамка, а контенту достаётся остаток. Если отступы больше заданной ширины, контент сжимается до нуля, но сами отступы не уменьшаются — элемент станет шире `width`. `margin` в размер бокса не входит ни в одном режиме.',
              en: 'By default `box-sizing: content-box`: `width` sets only the content area, and `padding` and `border` are added on both sides. With `border-box`, `width` already includes padding and border, and the content gets what’s left. If the padding exceeds the set width, the content shrinks to zero but the padding doesn’t — the element becomes wider than `width`. `margin` is never part of the box size.',
            },
          },
          { type: 'illustration', illustration: 'css-box-layers' },
        ],
        test: ['css-box-model-output-001', 'css-box-007'],
      },
      {
        id: 'inline',
        title: { ru: 'Строчные элементы', en: 'Inline elements' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Строчные элементы (`span`, `a`, `img`) встают в строку текста. К `span` не применяются `width` и `height` — размер задаёт содержимое, а вертикальные `margin` не раздвигают строки. Чтобы задать размер, нужен `inline-block` или `block`. `img` тоже строчный и стоит на **базовой линии**: под ней остаётся место для «хвостов» букв, отсюда щель под картинкой. Её убирают `display: block` или `vertical-align: middle`.',
              en: 'Inline elements (`span`, `a`, `img`) sit in a line of text. `width` and `height` don’t apply to a `span` — its content sets the size, and vertical `margin` doesn’t push lines apart. To set a size you need `inline-block` or `block`. An `img` is inline too and sits on the **baseline**: below it there’s room for letter descenders, hence the gap under an image. `display: block` or `vertical-align: middle` removes it.',
            },
          },
        ],
        test: ['css-box-002', 'css-box-004'],
      },
      {
        id: 'margins',
        title: { ru: 'Отступы и проценты', en: 'Margins and percentages' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Вертикальные `margin` соседних блоков **схлопываются**: между ними остаётся больший из двух отступов, а не сумма. Отступ первого ребёнка может «вытечь» наружу через родителя без рамки и `padding`. Во flex- и grid-контейнерах схлопывания нет. Ещё одна неожиданность: процентные `padding` и `margin` — даже вертикальные — считаются от **ширины** содержащего блока.',
              en: 'Vertical `margin`s of adjacent blocks **collapse**: the larger of the two remains between them, not the sum. A first child’s margin can “leak” out through a parent without border or `padding`. Flex and grid containers don’t collapse margins. Another surprise: percentage `padding` and `margin` — even vertical ones — are calculated from the containing block’s **width**.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.a { margin-bottom: 24px; }\n.b { margin-top: 16px; }\n/* gap between them: 24px */',
            },
          },
          {
            type: 'check',
            check: {
              id: 'flex-no-collapse',
              prompt: {
                ru: 'Те же два блока положили во flex-контейнер с `flex-direction: column`. Каким станет промежуток?',
                en: 'The same two blocks are put in a flex container with `flex-direction: column`. What’s the gap now?',
              },
              options: [
                { text: { ru: '24px', en: '24px' } },
                { text: { ru: '40px: во flex отступы не схлопываются', en: '40px: margins don’t collapse in flex' } },
                { text: { ru: '16px', en: '16px' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Схлопывание — правило обычного блочного потока. У flex- и grid-элементов отступы просто складываются.',
                en: 'Collapsing is a rule of normal block flow. Flex and grid items simply add their margins.',
              },
            },
          },
        ],
        test: ['css-box-006', 'css-box-003'],
      },
      {
        id: 'outline-flow-root',
        title: { ru: 'outline и flow-root', en: 'outline and flow-root' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`outline` рисуется поверх соседей и не участвует в раскладке: размер элемента не меняется, ничего не сдвигается. Поэтому им показывают фокус. `display: flow-root` создаёт новый блочный контекст форматирования ([[bfc|BFC]]): блок растягивается, чтобы вместить свои `float`-элементы, и `margin` детей не схлопываются с внешними. Раньше для этого писали clearfix или `overflow: hidden`.',
              en: '`outline` is drawn over neighbors and doesn’t take part in layout: the element’s size stays the same and nothing shifts. That’s why it’s used for focus. `display: flow-root` creates a new block formatting context ([[bfc|BFC]]): the block stretches to contain its `float`s, and children’s `margin`s don’t collapse with outer ones. A clearfix or `overflow: hidden` used to do this.',
            },
          },
        ],
        test: ['css-box-001'],
      },
    ],
    keyPoints: [
      { ru: '`content-box`: `width` — только контент.', en: '`content-box`: `width` is content only.' },
      { ru: 'У строчных элементов нет `width` и `height`.', en: 'Inline elements have no `width` or `height`.' },
      { ru: 'Вертикальные `margin` схлопываются, во flex — нет.', en: 'Vertical `margin`s collapse, but not in flex.' },
      { ru: '`flow-root` вмещает float без побочных эффектов.', en: '`flow-root` contains floats with no side effects.' },
    ],
    sources: [
      { title: 'MDN — box-sizing', url: `${MDN}/box-sizing` },
      { title: 'MDN — Mastering margin collapsing', url: `${MDN}/CSS_box_model/Mastering_margin_collapsing` },
      { title: 'MDN — outline', url: `${MDN}/outline` },
      { title: 'MDN — padding-top', url: `${MDN}/padding-top` },
    ],
  },
  {
    tag: 'flexbox',
    format: 'steps',
    summary: {
      ru: 'Flexbox раскладывает элементы вдоль одной оси и делит между ними свободное место. Чтобы предсказать размеры, нужно понимать оси, `flex-basis` и то, как работают `grow` и `shrink`.',
      en: 'Flexbox lays items out along one axis and shares free space between them. To predict sizes you need to understand the axes, `flex-basis` and how `grow` and `shrink` work.',
    },
    steps: [
      {
        id: 'axes',
        title: { ru: 'Главная и поперечная ось', en: 'Main and cross axes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'У flex-контейнера две оси. **Главная** идёт по `flex-direction` (`row` — слева направо, `column` — сверху вниз), **поперечная** — перпендикулярно. `justify-content` распределяет элементы вдоль главной оси, `align-items` выравнивает вдоль поперечной. Поэтому при `column` горизонтальное центрирование делает `align-items`. `margin: auto` во flex забирает всё свободное место по своей оси: `margin-left: auto` прижимает элемент вправо.',
              en: 'A flex container has two axes. The **main** one follows `flex-direction` (`row` is left to right, `column` top to bottom); the **cross** axis is perpendicular. `justify-content` distributes items along the main axis, `align-items` aligns them along the cross axis. So with `column`, horizontal centering is `align-items`. In flex, `margin: auto` takes all free space on its axis: `margin-left: auto` pushes an item to the right.',
            },
          },
          { type: 'illustration', illustration: 'css-flex-axes' },
        ],
        test: ['css-flex-005', 'css-flex-007'],
      },
      {
        id: 'basis',
        title: { ru: 'flex-basis и сокращение flex', en: 'flex-basis and the flex shorthand' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Стартовый размер элемента вдоль главной оси задаёт `flex-basis`; `width` используется, только когда basis равен `auto`. Сокращение `flex: 1` — это `1 1 0%`: basis ноль, поэтому элементы делят место поровну, независимо от содержимого. `flex: auto` — `1 1 auto`, `flex: none` — `0 0 auto`. `gap` вычитается из свободного места **до** того, как оно делится между элементами.',
              en: 'An item’s starting size along the main axis is set by `flex-basis`; `width` is used only when basis is `auto`. The shorthand `flex: 1` is `1 1 0%`: a zero basis, so items share space equally regardless of content. `flex: auto` is `1 1 auto`, `flex: none` is `0 0 auto`. `gap` is subtracted from free space **before** it’s shared between items.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.row { display: flex; gap: 20px; }\n.col { flex: 1; } /* 1 1 0% */',
            },
          },
        ],
        test: ['css-flex-006', 'css-flex-002'],
      },
      {
        id: 'grow-shrink',
        title: { ru: 'grow и shrink', en: 'grow and shrink' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Если места больше суммы `flex-basis`, свободное место делится по `flex-grow` **пропорционально**: при `1` и `3` первый элемент получает четверть остатка, второй — три четверти. Если места не хватает, недостача делится по `flex-shrink`, но с весом **`flex-shrink × flex-basis`**: при одинаковом `flex-shrink` крупный элемент теряет больше пикселей, чем мелкий.',
              en: 'If there’s more room than the sum of `flex-basis`, free space is shared by `flex-grow` **proportionally**: with `1` and `3` the first item gets a quarter of it, the second three quarters. If there isn’t enough room, the shortfall is shared by `flex-shrink`, weighted by **`flex-shrink × flex-basis`**: with equal `flex-shrink` a large item loses more pixels than a small one.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.row { display: flex; width: 400px; }\n.a { flex: 1 0 100px; } /* 150px */\n.b { flex: 3 0 100px; } /* 250px */',
            },
          },
          {
            type: 'check',
            check: {
              id: 'equal-grow',
              prompt: {
                ru: 'Два элемента `flex: 1 0 100px` в контейнере шириной 300px. Какой ширины каждый?',
                en: 'Two items with `flex: 1 0 100px` in a 300px container. How wide is each?',
              },
              options: [
                { text: { ru: '100px', en: '100px' } },
                { text: { ru: '150px', en: '150px' } },
                { text: { ru: '200px', en: '200px' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Свободно 300 − 200 = 100px, при равных `flex-grow` каждому достаётся по 50px: 100 + 50 = 150px.',
                en: 'Free space is 300 − 200 = 100px; with equal `flex-grow` each gets 50px: 100 + 50 = 150px.',
              },
            },
          },
        ],
        test: ['css-flex-001', 'css-flex-003'],
      },
      {
        id: 'min-width',
        title: { ru: 'Почему элемент не сжимается', en: 'Why an item won’t shrink' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'У flex-элемента `min-width` по умолчанию `auto`: он не сжимается уже своего минимального содержимого. Длинная строка с `white-space: nowrap` распирает элемент: многоточие не появляется, а соседей выталкивает за край контейнера. Лечится `min-width: 0` (или `overflow: hidden`) у самого flex-элемента — того, который должен сжаться, а не у текста внутри него.',
              en: 'A flex item’s `min-width` defaults to `auto`: it won’t shrink below its minimum content. A long line with `white-space: nowrap` props the item open: no ellipsis appears, and neighbors are pushed out of the container. The fix is `min-width: 0` (or `overflow: hidden`) on the flex item itself — the one that should shrink, not the text inside it.',
            },
          },
        ],
        test: ['css-flex-004'],
      },
    ],
    keyPoints: [
      { ru: '`justify-content` — главная ось, `align-items` — поперечная.', en: '`justify-content` is the main axis; `align-items` the cross axis.' },
      { ru: '`flex-basis` важнее `width`, `flex: 1` = `1 1 0%`.', en: '`flex-basis` beats `width`; `flex: 1` = `1 1 0%`.' },
      { ru: 'Сжатие взвешено по `flex-basis`.', en: 'Shrinking is weighted by `flex-basis`.' },
      { ru: 'Многоточие во flex — `min-width: 0`.', en: 'Ellipsis in flex needs `min-width: 0`.' },
    ],
    sources: [
      { title: 'MDN — Basic concepts of flexbox', url: `${MDN}/CSS_flexible_box_layout/Basic_concepts_of_flexbox` },
      { title: 'MDN — flex', url: `${MDN}/flex` },
      { title: 'MDN — flex-basis', url: `${MDN}/flex-basis` },
      { title: 'MDN — min-width', url: `${MDN}/min-width` },
    ],
  },
  {
    tag: 'css-grid',
    format: 'steps',
    summary: {
      ru: 'Grid раскладывает элементы сразу в двух измерениях. Разберём, как считаются доли `fr`, как размещать элементы по линиям и как строить адаптивную сетку без медиазапросов.',
      en: 'Grid lays items out in two dimensions at once. We’ll see how `fr` fractions are calculated, how to place items by lines and how to build a responsive grid without media queries.',
    },
    steps: [
      {
        id: 'fr',
        title: { ru: 'Доли fr', en: 'fr fractions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`fr` — доля **оставшегося** места: из ширины контейнера вычитают фиксированные колонки и промежутки `gap`, а остаток делят по долям. Нюанс: `1fr` — это на самом деле `minmax(auto, 1fr)`, и колонка не станет уже своего минимального содержимого: широкий блок внутри растянет её, а другие колонки получат меньше. Чтобы доли были строго равными, пишут `minmax(0, 1fr)`.',
              en: '`fr` is a fraction of the **remaining** space: fixed columns and `gap`s are subtracted from the container’s width, and the rest is split by fractions. A nuance: `1fr` is actually `minmax(auto, 1fr)`, so a column won’t get narrower than its minimum content: a wide block inside stretches it, and other columns get less. For strictly equal fractions, write `minmax(0, 1fr)`.',
            },
          },
          { type: 'illustration', illustration: 'css-grid-fr' },
        ],
        test: ['css-grid-001'],
      },
      {
        id: 'lines',
        title: { ru: 'Линии сетки', en: 'Grid lines' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Элементы размещают по **линиям** сетки: у трёх колонок четыре линии. `grid-column: 1 / 3` — от первой линии до третьей, то есть две колонки вместе с промежутком между ними. Отрицательные номера считаются с конца **явной** сетки: `1 / -1` растягивает элемент на всю ширину. `span 2` — «занять две колонки» от текущей позиции.',
              en: 'Items are placed by grid **lines**: three columns have four lines. `grid-column: 1 / 3` runs from the first line to the third — two columns plus the gap between them. Negative numbers count from the end of the **explicit** grid: `1 / -1` stretches an item across the full width. `span 2` means “take two columns” from the current position.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n}\n.hero { grid-column: 1 / -1; }\n.side { grid-column: span 2; }',
            },
          },
          {
            type: 'check',
            check: {
              id: 'grid-line-count',
              prompt: {
                ru: 'Сколько вертикальных линий у сетки из трёх колонок?',
                en: 'How many vertical lines does a three-column grid have?',
              },
              options: [
                { text: { ru: '3', en: '3' } },
                { text: { ru: '4', en: '4' } },
                { text: { ru: '6', en: '6' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Линии стоят по краям и между колонками: на одну больше, чем колонок. Поэтому `-1` — это правый край сетки.',
                en: 'Lines sit at the edges and between columns: one more than the columns. That’s why `-1` is the grid’s right edge.',
              },
            },
          },
        ],
        test: ['css-grid-003', 'css-grid-005'],
      },
      {
        id: 'auto-fill',
        title: { ru: 'auto-fill и auto-fit', en: 'auto-fill and auto-fit' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`repeat(auto-fill, minmax(200px, 1fr))` создаёт столько колонок, сколько влезает, — адаптивная сетка без медиазапросов. `auto-fill` сохраняет пустые колонки: два элемента в широком контейнере займут по минимальной ширине, а справа останется пусто. `auto-fit` схлопывает пустые колонки, и элементы растягиваются на всю ширину.',
              en: '`repeat(auto-fill, minmax(200px, 1fr))` creates as many columns as fit — a responsive grid without media queries. `auto-fill` keeps empty columns: two items in a wide container take the minimum width each, leaving empty space on the right. `auto-fit` collapses empty columns, so the items stretch across the full width.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.cards {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(\n    auto-fit,\n    minmax(200px, 1fr)\n  );\n}',
            },
          },
        ],
        test: ['css-grid-002'],
      },
      {
        id: 'areas',
        title: { ru: 'Карта областей', en: 'Area maps' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`grid-template-areas` описывает раскладку «картой» из имён: каждая строка в кавычках — ряд сетки, одинаковые имена подряд — одна область. Элемент встаёт в область через `grid-area`, и его место в разметке на это не влияет. Так раскладку меняют медиазапросом, не трогая HTML. Точка `.` в карте обозначает пустую ячейку.',
              en: '`grid-template-areas` describes the layout as a “map” of names: each quoted string is a grid row, and repeated names form one area. An item goes into an area via `grid-area`, regardless of its place in the markup. So a media query can change the layout without touching HTML. A dot `.` in the map marks an empty cell.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: ".page {\n  display: grid;\n  grid-template-columns: 1fr 240px;\n  grid-template-areas:\n    'head head'\n    'main side';\n}\n.sidebar { grid-area: side; }",
            },
          },
        ],
        test: ['css-grid-006'],
      },
    ],
    keyPoints: [
      { ru: '`fr` делит остаток после фиксированных колонок и `gap`.', en: '`fr` splits what’s left after fixed columns and `gap`.' },
      { ru: '`1fr` = `minmax(auto, 1fr)`, строго — `minmax(0, 1fr)`.', en: '`1fr` = `minmax(auto, 1fr)`; strictly equal is `minmax(0, 1fr)`.' },
      { ru: '`1 / -1` — на всю ширину явной сетки.', en: '`1 / -1` spans the explicit grid.' },
      { ru: '`auto-fit` растягивает, `auto-fill` оставляет пустые колонки.', en: '`auto-fit` stretches; `auto-fill` keeps empty columns.' },
    ],
    sources: [
      { title: 'MDN — grid-template-columns', url: `${MDN}/grid-template-columns` },
      { title: 'MDN — repeat()', url: `${MDN}/repeat` },
      { title: 'MDN — minmax()', url: `${MDN}/minmax` },
      { title: 'MDN — grid-template-areas', url: `${MDN}/grid-template-areas` },
    ],
  },
  {
    tag: 'positioning',
    format: 'steps',
    summary: {
      ru: '`position` выводит элемент из обычного потока или привязывает его к окну. Главное — понимать, относительно чего он встаёт и как устроены слои наложения.',
      en: '`position` takes an element out of normal flow or pins it to the window. The key is knowing what it’s positioned against and how stacking works.',
    },
    steps: [
      {
        id: 'absolute',
        title: { ru: 'absolute и содержащий блок', en: 'absolute and the containing block' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`position: absolute` убирает элемент из потока и позиционирует его относительно [[containing-block|содержащего блока]] — ближайшего предка с `position`, отличным от `static`. Отсчёт идёт от его **padding box**: внутри рамки, но вместе с внутренними отступами, поэтому `inset: 0` растягивает слой на всю область внутри рамки. Без `width` абсолютный элемент не растягивается, а сжимается под содержимое.',
              en: '`position: absolute` removes an element from flow and positions it against its [[containing-block|containing block]] — the nearest ancestor whose `position` isn’t `static`. Offsets are measured from its **padding box**: inside the border but including padding, so `inset: 0` stretches a layer over the whole area inside the border. Without `width` an absolute element doesn’t stretch but shrinks to fit its content.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.card { position: relative; }\n.close {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}',
            },
          },
        ],
        test: ['css-pos-001', 'css-pos-004'],
      },
      {
        id: 'fixed',
        title: { ru: 'fixed и transform', en: 'fixed and transform' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`position: fixed` отсчитывается от окна и не прокручивается вместе со страницей. Но если у предка есть `transform`, `filter`, `perspective`, `contain: paint` или `will-change: transform`, этот предок становится содержащим блоком и для `fixed`: модалка окажется в углу карточки и будет прокручиваться вместе с ней. Поэтому модалки рендерят в конец `body` через портал.',
              en: '`position: fixed` is measured from the window and doesn’t scroll with the page. But if an ancestor has `transform`, `filter`, `perspective`, `contain: paint` or `will-change: transform`, that ancestor becomes the containing block for `fixed` too: a modal ends up in the card’s corner and scrolls with it. That’s why modals are rendered at the end of `body` via a portal.',
            },
          },
        ],
        test: ['css-pos-002'],
      },
      {
        id: 'sticky',
        title: { ru: 'sticky', en: 'sticky' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`position: sticky` ведёт себя как `relative`, пока элемент не дойдёт до порога, заданного `top` (или `bottom`, `left`, `right`), — тогда он прилипает. Без порога прилипать не к чему. Элемент не выходит за пределы своего родителя: когда родитель уехал, уезжает и он. А предок с `overflow: hidden` или `auto` становится прокручиваемым контейнером, и прилипание работает внутри него, а не относительно окна.',
              en: '`position: sticky` behaves like `relative` until the element reaches the threshold set by `top` (or `bottom`, `left`, `right`) — then it sticks. With no threshold there’s nothing to stick to. The element never leaves its parent: when the parent scrolls away, so does it. And an ancestor with `overflow: hidden` or `auto` becomes the scroll container, so sticking works inside it rather than relative to the window.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: 'th {\n  position: sticky;\n  top: 0;\n}',
            },
          },
        ],
        test: ['css-pos-006'],
      },
      {
        id: 'stacking',
        title: { ru: 'z-index и контекст наложения', en: 'z-index and stacking contexts' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`z-index` сравнивается только **внутри одного контекста наложения**. Контекст создают позиционированный элемент с `z-index`, `opacity` меньше 1, `transform`, `filter`, `isolation: isolate`. Ребёнок с `z-index: 9999` не поднимется выше соседа своего родителя, если сам родитель ниже. `isolation: isolate` создаёт контекст без побочных эффектов и запирает `z-index` детей внутри компонента.',
              en: '`z-index` is compared only **within one stacking context**. A context is created by a positioned element with `z-index`, `opacity` below 1, `transform`, `filter`, `isolation: isolate`. A child with `z-index: 9999` won’t rise above its parent’s sibling if the parent itself is lower. `isolation: isolate` creates a context with no side effects and locks children’s `z-index` inside the component.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'stacking-trap',
              prompt: {
                ru: 'У родителя `z-index: 1`, у его ребёнка — `z-index: 9999`, у соседа родителя — `z-index: 2`. Кто окажется выше?',
                en: 'A parent has `z-index: 1`, its child `z-index: 9999`, the parent’s sibling `z-index: 2`. Which ends up on top?',
              },
              options: [
                { text: { ru: 'Ребёнок: 9999 больше 2', en: 'The child: 9999 is more than 2' } },
                { text: { ru: 'Сосед родителя: ребёнок заперт в контексте родителя', en: 'The parent’s sibling: the child is locked in the parent’s context' } },
                { text: { ru: 'Зависит от порядка в разметке', en: 'It depends on markup order' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Снаружи сравниваются родитель (1) и сосед (2). Всё содержимое родителя, включая ребёнка, лежит на уровне 1.',
                en: 'Outside, the parent (1) is compared with the sibling (2). Everything inside the parent, the child included, sits at level 1.',
              },
            },
          },
        ],
        test: ['css-pos-003'],
      },
    ],
    keyPoints: [
      { ru: '`absolute` — от ближайшего позиционированного предка, по padding box.', en: '`absolute` is relative to the nearest positioned ancestor’s padding box.' },
      { ru: '`transform` у предка ломает `fixed`.', en: 'An ancestor’s `transform` breaks `fixed`.' },
      { ru: '`sticky` нужен порог `top`.', en: '`sticky` needs a `top` threshold.' },
      { ru: '`z-index` живёт внутри контекста наложения.', en: '`z-index` lives inside a stacking context.' },
    ],
    sources: [
      { title: 'MDN — position', url: `${MDN}/position` },
      { title: 'MDN — Containing block', url: `${MDN}/Containing_block` },
      { title: 'MDN — Stacking context', url: `${MDN}/CSS_positioned_layout/Stacking_context` },
      { title: 'MDN — isolation', url: `${MDN}/isolation` },
    ],
  },
  {
    tag: 'css-units',
    format: 'steps',
    summary: {
      ru: 'Относительные единицы зависят от контекста: `em` — от шрифта, проценты — от содержащего блока. Разберём, от чего именно, и как функции `min()`, `max()` и `clamp()` заменяют медиазапросы.',
      en: 'Relative units depend on context: `em` on the font, percentages on the containing block. We’ll see exactly what each depends on and how `min()`, `max()` and `clamp()` replace media queries.',
    },
    steps: [
      {
        id: 'em-rem',
        title: { ru: 'em и rem', en: 'em and rem' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`rem` — размер шрифта корня (`html`), одинаковый везде. `em` зависит от места: в `font-size` он считается от шрифта **родителя**, и вложенные множители накапливаются, а во всех остальных свойствах — от шрифта **самого элемента**. Поэтому `padding: 1em` у заголовка с крупным шрифтом больше, чем у текста. `em` удобен для отступов, которые растут вместе с текстом кнопки, а для общей системы размеров надёжнее `rem`.',
              en: '`rem` is the root (`html`) font size, the same everywhere. `em` depends on where it’s used: in `font-size` it’s relative to the **parent’s** font and nested multipliers compound, while in every other property it’s relative to the **element’s own** font. So `padding: 1em` on a large heading is bigger than on body text. `em` suits spacing that should grow with a button’s text; `rem` is more reliable for an overall size system.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: 'html { font-size: 16px; }\n.note { font-size: 0.75rem; } /* 12px */\n.note b { font-size: 2em; }   /* 24px */',
            },
          },
        ],
        test: ['css-units-001', 'css-units-002'],
      },
      {
        id: 'percent',
        title: { ru: 'Проценты', en: 'Percentages' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Проценты считаются от [[containing-block|содержащего блока]], но от разных его размеров: `width` — от ширины, `height` — от высоты, причём только если высота родителя задана явно. Если она `auto` и зависит от содержимого, `height: 50%` ведёт себя как `auto`. Отсюда частая жалоба «`height: 100%` не работает»: у цепочки предков не задана высота.',
              en: 'Percentages are relative to the [[containing-block|containing block]], but to different dimensions of it: `width` to its width, `height` to its height — and only if the parent’s height is set explicitly. If it’s `auto` and depends on content, `height: 50%` acts like `auto`. Hence the common complaint “`height: 100%` doesn’t work”: the chain of ancestors has no height set.',
            },
          },
        ],
        test: ['css-units-003'],
      },
      {
        id: 'min-max-clamp',
        title: { ru: 'min(), max() и clamp()', en: 'min(), max() and clamp()' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Функции сравнения вычисляют значение на лету. `min(a, b)` берёт меньшее: `width: min(90%, 720px)` — «резиновый, но не шире 720px». `max()` задаёт нижнюю границу. `clamp(MIN, VAL, MAX)` возвращает `VAL`, ограниченное снизу и сверху: `font-size: clamp(1rem, 4vw, 2rem)` растёт с окном, но не меньше 16px и не больше 32px.',
              en: 'Comparison functions compute a value on the fly. `min(a, b)` takes the smaller one: `width: min(90%, 720px)` means “fluid, but no wider than 720px”. `max()` sets a lower bound. `clamp(MIN, VAL, MAX)` returns `VAL` limited from below and above: `font-size: clamp(1rem, 4vw, 2rem)` grows with the window but stays between 16px and 32px.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.content {\n  width: min(90%, 720px);\n  margin-inline: auto;\n}',
            },
          },
          {
            type: 'check',
            check: {
              id: 'max-function',
              prompt: {
                ru: '`width: max(50%, 300px)` в контейнере шириной 400px. Какой ширины элемент?',
                en: '`width: max(50%, 300px)` in a 400px container. How wide is the element?',
              },
              options: [
                { text: { ru: '200px', en: '200px' } },
                { text: { ru: '300px', en: '300px' } },
                { text: { ru: '400px', en: '400px' } },
              ],
              answer: 1,
              explanation: {
                ru: '50% от 400px — это 200px, а `max()` берёт большее из значений: 300px.',
                en: '50% of 400px is 200px, and `max()` takes the larger value: 300px.',
              },
            },
          },
        ],
        test: ['css-units-006'],
      },
      {
        id: 'line-height',
        title: { ru: 'line-height без единиц', en: 'Unitless line-height' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`line-height` лучше задавать числом без единиц: оно наследуется **как множитель**, и каждый потомок считает высоту строки от своего шрифта. Значение в `em` или `px` вычисляется у родителя и наследуется **готовым числом пикселей**: у ребёнка с крупным шрифтом строки начнут налезать друг на друга.',
              en: '`line-height` is best set as a unitless number: it’s inherited **as a multiplier**, and each descendant computes line height from its own font. A value in `em` or `px` is computed on the parent and inherited **as a ready pixel value**: a child with a larger font gets overlapping lines.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: 'body { line-height: 1.5; }',
            },
          },
        ],
        test: ['css-units-007'],
      },
    ],
    keyPoints: [
      { ru: '`em` в `font-size` — от родителя, в остальном — от себя.', en: '`em` in `font-size` is from the parent; elsewhere from itself.' },
      { ru: 'Процентная высота требует явной высоты родителя.', en: 'Percentage height needs an explicit parent height.' },
      { ru: '`clamp()` — значение с границами.', en: '`clamp()` is a value with bounds.' },
      { ru: '`line-height` — числом без единиц.', en: '`line-height` as a unitless number.' },
    ],
    sources: [
      { title: 'MDN — CSS values and units: length', url: `${MDN}/length` },
      { title: 'MDN — font-size', url: `${MDN}/font-size` },
      { title: 'MDN — clamp()', url: `${MDN}/clamp` },
      { title: 'MDN — line-height', url: `${MDN}/line-height` },
    ],
  },
  {
    tag: 'responsive',
    format: 'steps',
    summary: {
      ru: 'Адаптивная вёрстка — это одна страница для любых экранов. Начинается она с meta viewport, держится на медиазапросах и резиновых значениях, а компоненты подстраиваются под свой контейнер.',
      en: 'Responsive layout means one page for every screen. It starts with the viewport meta tag, relies on media queries and fluid values, and lets components adapt to their container.',
    },
    steps: [
      {
        id: 'viewport-meta',
        title: { ru: 'meta viewport', en: 'The viewport meta tag' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Без `<meta name="viewport">` мобильный браузер рисует страницу на виртуальном холсте шириной около 980px и уменьшает её под экран. Медиазапросы видят эти 980px, поэтому мобильные стили не включаются, а текст становится мелким. Содержимое `width=device-width, initial-scale=1` говорит браузеру: ширина холста равна ширине экрана в CSS-пикселях, без масштабирования.',
              en: 'Without `<meta name="viewport">` a mobile browser renders the page on a virtual canvas about 980px wide and scales it down to the screen. Media queries see those 980px, so mobile styles never kick in and text gets tiny. The content `width=device-width, initial-scale=1` tells the browser: the canvas width equals the screen width in CSS pixels, with no zoom.',
            },
          },
        ],
        test: ['css-resp-002'],
      },
      {
        id: 'media-queries',
        title: { ru: 'Медиазапросы', en: 'Media queries' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Медиазапрос включает правила по условию, но **не добавляет специфичности**. Если подходят несколько запросов, а селекторы одинаковые, побеждает правило ниже по коду. Поэтому при подходе mobile-first база пишется для узких экранов, а запросы `min-width` идут по возрастанию: 600px, затем 900px. При обратном порядке узкий запрос, стоящий ниже, перебьёт широкий.',
              en: 'A media query enables rules conditionally but **adds no specificity**. If several queries match and the selectors are the same, the later rule wins. That’s why mobile-first writes the base for narrow screens and orders `min-width` queries ascending: 600px, then 900px. In reverse order the narrow query, placed later, overrides the wide one.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.list { columns: 1; }\n@media (min-width: 600px) {\n  .list { columns: 2; }\n}\n@media (min-width: 900px) {\n  .list { columns: 3; }\n}',
            },
          },
        ],
        test: ['css-resp-001'],
      },
      {
        id: 'fluid',
        title: { ru: 'Резиновые значения', en: 'Fluid values' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Многое адаптируется без медиазапросов. `vw` — процент ширины окна: при окне 800px `5vw` = 40px, а `clamp(1rem, 5vw, 2rem)` плавно меняет размер, не выходя за границы. `aspect-ratio: 16 / 9` вычисляет высоту по ширине и заранее резервирует место. На телефонах `100vh` равен высоте окна со **спрятанными** панелями браузера, поэтому блок уходит под них; `100dvh` следует за реально видимой высотой.',
              en: 'Much adapts without media queries. `vw` is a percentage of the window width: in an 800px window `5vw` = 40px, and `clamp(1rem, 5vw, 2rem)` changes size smoothly within bounds. `aspect-ratio: 16 / 9` computes height from width and reserves space up front. On phones `100vh` equals the window height with browser bars **hidden**, so a block slides under them; `100dvh` follows the actually visible height.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'aspect-ratio-height',
              prompt: {
                ru: 'У блока `width: 300px; aspect-ratio: 3 / 2`. Какой он высоты?',
                en: 'A block has `width: 300px; aspect-ratio: 3 / 2`. How tall is it?',
              },
              options: [
                { text: { ru: '150px', en: '150px' } },
                { text: { ru: '200px', en: '200px' } },
                { text: { ru: '450px', en: '450px' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Пропорция — ширина к высоте: 300 × 2 / 3 = 200px.',
                en: 'The ratio is width to height: 300 × 2 / 3 = 200px.',
              },
            },
          },
        ],
        test: ['css-units-004', 'css-units-005'],
      },
      {
        id: 'container-queries',
        title: { ru: 'Контейнерные запросы', en: 'Container queries' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`@container` выбирает стили по размеру **контейнера**, а не окна: одна и та же карточка выглядит по-разному в узкой колонке и на всю ширину страницы. Контейнером считается только предок, объявленный через `container-type: inline-size` (или `size`). Обычный блок, даже с заданной шириной, контейнерные запросы не видят.',
              en: '`@container` picks styles by the **container’s** size, not the window’s: the same card looks different in a narrow column and at full page width. Only an ancestor declared with `container-type: inline-size` (or `size`) counts as a container. A regular block, even with a set width, is invisible to container queries.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.sidebar {\n  container-type: inline-size;\n}\n@container (min-width: 400px) {\n  .card { display: flex; }\n}',
            },
          },
        ],
        test: ['css-modern-003'],
      },
    ],
    keyPoints: [
      { ru: 'Без meta viewport мобильные медиазапросы не срабатывают.', en: 'Without the viewport meta tag mobile media queries don’t fire.' },
      { ru: 'Медиазапрос не добавляет специфичности — важен порядок.', en: 'A media query adds no specificity — order matters.' },
      { ru: '`clamp()` и `aspect-ratio` — адаптивность без запросов.', en: '`clamp()` and `aspect-ratio` adapt without queries.' },
      { ru: 'На телефонах — `dvh`, а не `vh`.', en: 'On phones use `dvh`, not `vh`.' },
    ],
    sources: [
      { title: 'MDN — Viewport meta tag', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag' },
      { title: 'MDN — Using media queries', url: `${MDN}/CSS_media_queries/Using_media_queries` },
      { title: 'MDN — aspect-ratio', url: `${MDN}/aspect-ratio` },
      { title: 'MDN — Container queries', url: `${MDN}/CSS_containment/Container_queries` },
    ],
  },
  {
    tag: 'animations',
    format: 'steps',
    summary: {
      ru: 'Переходы и анимации оживляют интерфейс, но легко становятся дёргаными или вредными. Разберём, что вообще можно анимировать, как работают ключевые кадры и как анимировать дёшево и бережно.',
      en: 'Transitions and animations bring an interface to life, but easily turn janky or harmful. We’ll see what can be animated at all, how keyframes work and how to animate cheaply and considerately.',
    },
    steps: [
      {
        id: 'transitions',
        title: { ru: 'Что можно анимировать', en: 'What can be animated' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`transition` плавно меняет свойство между двумя значениями, поэтому браузеру нужны значения, между которыми можно посчитать промежуточные. `auto` — ключевое слово, а не длина: переход `height: 0` → `auto` по умолчанию идёт скачком (в новых браузерах помогает `interpolate-size: allow-keywords`). Незарегистрированная CSS-переменная — строка без типа, её тоже не интерполировать; тип ей задают через `@property`.',
              en: '`transition` smoothly changes a property between two values, so the browser needs values it can compute in-betweens for. `auto` is a keyword, not a length: a `height: 0` → `auto` transition jumps by default (newer browsers help with `interpolate-size: allow-keywords`). An unregistered CSS variable is a typeless string and can’t be interpolated either; `@property` gives it a type.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: "@property --angle {\n  syntax: '<angle>';\n  inherits: false;\n  initial-value: 0deg;\n}",
            },
          },
        ],
        test: ['css-anim-001', 'css-anim-003'],
      },
      {
        id: 'keyframes',
        title: { ru: '@keyframes', en: '@keyframes' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`@keyframes` описывает анимацию по кадрам, а `animation` подключает её: имя, длительность, повторы, задержка. По умолчанию стили кадров действуют только во время анимации — потом элемент возвращается к своим стилям. `animation-fill-mode: forwards` оставляет стили последнего кадра, `backwards` применяет первый кадр ещё во время задержки, `both` — и то и другое.',
              en: '`@keyframes` describes an animation frame by frame, and `animation` attaches it: name, duration, iterations, delay. By default keyframe styles apply only while the animation runs — then the element returns to its own styles. `animation-fill-mode: forwards` keeps the last frame’s styles, `backwards` applies the first frame during the delay, `both` does both.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '@keyframes fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.toast { animation: fade-in 0.3s; }',
            },
          },
          {
            type: 'check',
            check: {
              id: 'fill-backwards',
              prompt: {
                ru: 'Анимация стартует с задержкой 2s. Что даст `animation-fill-mode: backwards`?',
                en: 'An animation starts after a 2s delay. What does `animation-fill-mode: backwards` give?',
              },
              options: [
                { text: { ru: 'Элемент примет вид первого кадра уже во время задержки', en: 'The element takes the first frame’s look during the delay' } },
                { text: { ru: 'Анимация проиграется в обратную сторону', en: 'The animation plays in reverse' } },
                { text: { ru: 'После конца останется последний кадр', en: 'The last frame stays after the end' } },
              ],
              answer: 0,
              explanation: {
                ru: 'Направление задаёт `animation-direction`, а последний кадр сохраняет `forwards`. `backwards` закрывает «мигание» перед стартом.',
                en: '`animation-direction` sets direction, and `forwards` keeps the last frame. `backwards` removes the “flash” before the start.',
              },
            },
          },
        ],
        test: ['css-anim-002'],
      },
      {
        id: 'starting-style',
        title: { ru: 'Появление из display: none', en: 'Appearing from display: none' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'У элемента, который только что появился — например, сменой `display: none` на `block`, — нет «предыдущего» стиля, и переходу не от чего стартовать: он показывается сразу. Правило `@starting-style` задаёт стиль, с которого начнётся переход при первом отображении. Чтобы плавно анимировать и исчезновение, в `transition` добавляют `display` с ключевым словом `allow-discrete`.',
              en: 'An element that just appeared — say, by switching `display: none` to `block` — has no “previous” style, so the transition has nothing to start from and it shows instantly. The `@starting-style` rule sets the style the transition starts from on first display. To animate disappearing too, add `display` with the `allow-discrete` keyword to `transition`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.menu {\n  opacity: 1;\n  transition: opacity 0.2s;\n}\n@starting-style {\n  .menu { opacity: 0; }\n}',
            },
          },
        ],
        test: ['css-anim-004'],
      },
      {
        id: 'performance-a11y',
        title: { ru: 'Плавно и бережно', en: 'Smooth and considerate' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Анимация `width`, `top` или `margin` на каждом кадре заставляет браузер заново считать раскладку и перерисовывать страницу. `transform` и `opacity` раскладку не трогают — их обрабатывает композитор, часто на GPU. Людям с вестибулярными нарушениями крупные движения вредны: системную настройку «Уменьшить движение» CSS видит через `@media (prefers-reduced-motion: reduce)`, и внутри анимации отключают или упрощают.',
              en: 'Animating `width`, `top` or `margin` makes the browser recalculate layout and repaint on every frame. `transform` and `opacity` don’t touch layout — the compositor handles them, often on the GPU. Large motion harms people with vestibular disorders: CSS sees the OS “Reduce motion” setting via `@media (prefers-reduced-motion: reduce)`, where animations are disabled or simplified.',
            },
          },
          { type: 'diagram', diagram: 'css-render-pipeline' },
        ],
        test: ['css-anim-006'],
      },
    ],
    keyPoints: [
      { ru: '`auto` и переменные без типа не интерполируются.', en: '`auto` and typeless variables don’t interpolate.' },
      { ru: '`forwards` — оставить последний кадр.', en: '`forwards` keeps the last frame.' },
      { ru: '`@starting-style` — переход при появлении.', en: '`@starting-style` enables an entry transition.' },
      { ru: 'Анимировать `transform` и `opacity`, уважать `prefers-reduced-motion`.', en: 'Animate `transform` and `opacity`; respect `prefers-reduced-motion`.' },
    ],
    sources: [
      { title: 'MDN — Using CSS transitions', url: `${MDN}/CSS_transitions/Using_CSS_transitions` },
      { title: 'MDN — Using CSS animations', url: `${MDN}/CSS_animations/Using_CSS_animations` },
      { title: 'MDN — @starting-style', url: `${MDN}/@starting-style` },
      { title: 'MDN — prefers-reduced-motion', url: `${MDN}/@media/prefers-reduced-motion` },
    ],
  },
  {
    tag: 'modern-css',
    format: 'steps',
    summary: {
      ru: 'Современный CSS закрывает задачи, для которых раньше были нужны препроцессоры и JavaScript: переменные, слои каскада, вложенность, логические свойства и ленивый рендер.',
      en: 'Modern CSS covers tasks that used to need preprocessors and JavaScript: variables, cascade layers, nesting, logical properties and lazy rendering.',
    },
    steps: [
      {
        id: 'custom-properties',
        title: { ru: 'CSS-переменные', en: 'CSS variables' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Пользовательские свойства (`--accent`) наследуются как обычные: элемент получает ближайшее по дереву значение. `var(--accent, blue)` подставит запасное значение, только если переменная не определена. Объявление с `var()` нельзя проверить заранее: оно проходит каскад и может победить. Если при вычислении значение оказалось негодным — `16px` в `color`, — объявление недействительно, и свойство ведёт себя как `unset`.',
              en: 'Custom properties (`--accent`) inherit like normal ones: an element gets the nearest value up the tree. `var(--accent, blue)` uses the fallback only if the variable is undefined. A declaration with `var()` can’t be checked in advance: it goes through the cascade and may win. If the computed value turns out invalid — `16px` in `color` — the declaration is invalid and the property acts as `unset`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: ':root { --gap: 16px; }\n.compact { --gap: 8px; }\n.list { gap: var(--gap, 12px); }',
            },
          },
        ],
        test: ['css-modern-001', 'css-modern-002'],
      },
      {
        id: 'layers',
        title: { ru: 'Слои @layer', en: '@layer layers' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`@layer` делит стили на слои, порядок которых объявляют заранее: `@layer reset, base, components;`. Каскад сравнивает слои **раньше** специфичности: поздний слой побеждает ранний, даже если селектор слабее, а обычные стили вне слоёв побеждают все слои. Для `!important` порядок **переворачивается**: важное объявление из раннего слоя сильнее важных из поздних слоёв и вне слоёв.',
              en: '`@layer` splits styles into layers whose order is declared up front: `@layer reset, base, components;`. The cascade compares layers **before** specificity: a later layer beats an earlier one even with a weaker selector, and normal unlayered styles beat every layer. For `!important` the order **flips**: an important declaration from an earlier layer beats important ones from later layers and unlayered styles.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '@layer reset, components;\n@layer components {\n  .btn { color: navy; }\n}\n@layer reset {\n  #app button { color: black; }\n}',
            },
          },
        ],
        test: ['css-cascade-006'],
      },
      {
        id: 'nesting',
        title: { ru: 'Вложенность', en: 'Nesting' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Нативная вложенность CSS работает почти как в препроцессорах. `&` подставляет родительский селектор туда, где стоит: `&:hover` — состояние самого элемента, `&.active` — элемент с классом, а `.dark &` — элемент внутри `.dark`. Вложенный селектор без `&` считается потомком: правило `p` внутри `.card` — это `.card p`.',
              en: 'Native CSS nesting works almost like in preprocessors. `&` inserts the parent selector where it stands: `&:hover` is the element’s own state, `&.active` the element with a class, and `.dark &` the element inside `.dark`. A nested selector without `&` is a descendant: a `p` rule inside `.card` means `.card p`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.btn {\n  color: black;\n  &:hover { color: navy; }\n  .dark & { color: white; }\n}',
            },
          },
        ],
        test: ['css-modern-004'],
      },
      {
        id: 'logical',
        title: { ru: 'Логические свойства', en: 'Logical properties' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Логические свойства привязаны к направлению текста, а не к сторонам экрана. `inline` — ось строки, `block` — ось блоков. `margin-inline-start` — отступ в начале строки: в русском и английском это слева, в арабском и иврите (`dir="rtl"`) — справа. `padding-block`, `inset-inline`, `inline-size` позволяют сверстать интерфейс один раз для обоих направлений.',
              en: 'Logical properties follow the text direction, not the sides of the screen. `inline` is the line axis, `block` the block axis. `margin-inline-start` is the margin at the start of a line: on the left in English and Russian, on the right in Arabic and Hebrew (`dir="rtl"`). `padding-block`, `inset-inline` and `inline-size` let you build an interface once for both directions.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'inline-end',
              prompt: {
                ru: 'С какой стороны будет `padding-inline-end: 8px` на странице с `dir="ltr"`?',
                en: 'On which side is `padding-inline-end: 8px` on a `dir="ltr"` page?',
              },
              options: [
                { text: { ru: 'Слева', en: 'Left' } },
                { text: { ru: 'Справа', en: 'Right' } },
                { text: { ru: 'Снизу', en: 'Bottom' } },
              ],
              answer: 1,
              explanation: {
                ru: 'В LTR строка начинается слева и заканчивается справа — `end` там. В RTL тот же отступ окажется слева.',
                en: 'In LTR a line starts on the left and ends on the right — that’s `end`. In RTL the same padding lands on the left.',
              },
            },
          },
        ],
        test: ['css-modern-007'],
      },
      {
        id: 'content-visibility',
        title: { ru: 'Ленивый рендер', en: 'Lazy rendering' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`content-visibility: auto` включает ленивый рендер: для элементов вне экрана браузер пропускает раскладку и отрисовку содержимого, пока они не приблизятся к вьюпорту. Контент остаётся в DOM — он доступен поиску по странице и скринридерам. Чтобы полоса прокрутки не прыгала, задают ожидаемый размер: `contain-intrinsic-size: auto 300px`.',
              en: '`content-visibility: auto` turns on lazy rendering: for off-screen elements the browser skips layout and painting of their content until they approach the viewport. The content stays in the DOM — available to find-in-page and screen readers. To keep the scrollbar from jumping, set an expected size: `contain-intrinsic-size: auto 300px`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: '.post {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 300px;\n}',
            },
          },
        ],
        test: ['css-modern-005'],
      },
    ],
    keyPoints: [
      { ru: 'Переменные наследуются, негодное значение = `unset`.', en: 'Variables inherit; an invalid value = `unset`.' },
      { ru: 'Слои сравниваются раньше специфичности.', en: 'Layers are compared before specificity.' },
      { ru: '`!important` переворачивает порядок слоёв.', en: '`!important` flips the layer order.' },
      { ru: '`inline-start` — начало строки, а не «лево».', en: '`inline-start` is the line start, not “left”.' },
    ],
    sources: [
      { title: 'MDN — Using CSS custom properties', url: `${MDN}/Using_CSS_custom_properties` },
      { title: 'MDN — @layer', url: `${MDN}/@layer` },
      { title: 'MDN — Using CSS nesting', url: `${MDN}/CSS_nesting/Using_CSS_nesting` },
      { title: 'MDN — CSS logical properties and values', url: `${MDN}/CSS_logical_properties_and_values` },
      { title: 'MDN — content-visibility', url: `${MDN}/content-visibility` },
    ],
  },
];
