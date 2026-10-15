import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const CSS_QUESTIONS_3: Question[] = [
  {
    id: 'css-units-001',
    topic: 'css',
    tags: ['css-units'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какой `font-size` получится у `.child`?', en: 'What `font-size` will `.child` get?' },
    code: {
      lang: 'css',
      source: `html { font-size: 16px; }
.parent { font-size: 2em; }
.child { font-size: 1.5em; }`,
    },
    options: [{ code: '48px' }, { code: '24px' }, { code: '32px' }, { code: '1.5px' }, { code: '40px' }],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`em` в `font-size` считается от размера шрифта **родителя**. `.parent` = 2 × 16 = 32px, `.child` = 1.5 × 32 = 48px — множители накапливаются по вложенности.',
          en: 'In `font-size`, `em` is relative to the **parent’s** font size. `.parent` is 2 × 16 = 32px, `.child` is 1.5 × 32 = 48px — the multipliers compound with nesting.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`rem` всегда берёт размер корня (`html`), поэтому `1.5rem` дал бы 24px на любой глубине. В остальных свойствах (`padding`, `margin`) `em` считается от размера шрифта самого элемента.',
          en: '`rem` always uses the root (`html`) size, so `1.5rem` would give 24px at any depth. In other properties (`padding`, `margin`), `em` is relative to the element’s own font size.',
        },
      },
    ],
    sources: [
      { title: 'MDN — <length>', url: `${MDN}/Web/CSS/length` },
      { title: 'MDN — font-size', url: `${MDN}/Web/CSS/font-size` },
    ],
    verify: {
      kind: 'css-computed',
      html: '<div class="parent"><div class="child">Text</div></div>',
      selector: '.child',
      property: 'font-size',
    },
  },
  {
    id: 'css-units-002',
    topic: 'css',
    tags: ['css-units'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Корневой размер шрифта — 16px. Чему равен `margin-bottom` у `.title`?',
      en: 'The root font size is 16px. What is the `margin-bottom` of `.title`?',
    },
    code: {
      lang: 'css',
      source: `.card { font-size: 12px; }
.title {
  font-size: 2rem;
  margin-bottom: 1em;
}`,
    },
    options: [{ code: '12px' }, { code: '32px' }, { code: '16px' }, { code: '24px' }, { code: '64px' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Во всех свойствах, кроме самого `font-size`, `em` считается от размера шрифта **этого же элемента**. У `.title` он 2rem = 32px, значит `1em` = 32px.',
          en: 'In every property except `font-size` itself, `em` is relative to the **element’s own** font size. `.title` has 2rem = 32px, so `1em` is 32px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '12px получилось бы, если считать `em` от родителя — так работает только `font-size`. Плюс такого подхода: отступы в `em` масштабируются вместе с текстом, если поменять размер заголовка.',
          en: '12px would come from using the parent’s size — that only happens in `font-size`. The upside: `em` spacing scales with the text when you change the heading size.',
        },
      },
    ],
    sources: [{ title: 'MDN — <length>', url: `${MDN}/Web/CSS/length` }],
    verify: {
      kind: 'css-computed',
      html: '<div class="card"><h2 class="title">Title</h2></div>',
      selector: '.title',
      property: 'margin-bottom',
    },
  },
  {
    id: 'css-units-003',
    topic: 'css',
    tags: ['css-units', 'box-model'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой высоты будет `.child`?', en: 'How tall will `.child` be?' },
    code: {
      lang: 'html',
      source: `<style>
  .child { height: 50%; }
  .content { height: 40px; }
  .spacer { height: 200px; }
</style>

<div class="parent">
  <div class="child">
    <div class="content"></div>
  </div>
  <div class="spacer"></div>
</div>`,
    },
    options: [{ code: '120px' }, { code: '100px' }, { code: '40px' }, { code: '300px' }, { code: '0px' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Процентная высота считается от высоты [[containing-block|содержащего блока]], только если та задана явно. У `.parent` высота `auto` (зависит от содержимого), поэтому `height: 50%` ведёт себя как `auto` — `.child` по высоте контента, 40px.',
          en: 'A percentage height resolves against the [[containing-block|containing block]]’s height only if that height is set explicitly. `.parent` has `height: auto` (it depends on content), so `height: 50%` behaves like `auto` — `.child` is as tall as its content, 40px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Иначе вышел бы замкнутый круг: высота родителя зависит от ребёнка, а ребёнка — от родителя. Отсюда старое `html, body { height: 100% }` по всей цепочке; сейчас проще `min-height: 100dvh`, flex или grid.',
          en: 'Otherwise it would be circular: the parent’s height depends on the child and the child’s on the parent. Hence the old `html, body { height: 100% }` down the chain; today `min-height: 100dvh`, flex or grid are simpler.',
        },
      },
    ],
    sources: [{ title: 'MDN — height', url: `${MDN}/Web/CSS/height` }],
    verify: { kind: 'css-computed', selector: '.child', property: 'rect.height' },
  },
  {
    id: 'css-units-004',
    topic: 'css',
    tags: ['css-units', 'responsive'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Ширина окна — 800px, корневой шрифт — 16px. Какой будет `font-size` у `h1`?',
      en: 'The window is 800px wide and the root font is 16px. What `font-size` will the `h1` get?',
    },
    code: {
      lang: 'css',
      source: `h1 {
  font-size: clamp(1rem, 2.5vw, 2rem);
}`,
    },
    options: [{ code: '16px' }, { code: '24px' }, { code: '32px' }, { code: '20px' }, { code: '40px' }],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`clamp(MIN, VAL, MAX)` возвращает `VAL`, ограниченное снизу `MIN` и сверху `MAX`. `2.5vw` при окне 800px — это 20px, между 16px (1rem) и 32px (2rem), поэтому размер 20px.',
          en: '`clamp(MIN, VAL, MAX)` returns `VAL` bounded below by `MIN` and above by `MAX`. At an 800px window `2.5vw` is 20px, which lies between 16px (1rem) and 32px (2rem), so the size is 20px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В окне уже 640px сработает нижняя граница 16px, шире 1280px — верхняя 32px. Это «резиновая» типографика без медиазапросов; в `VAL` часто добавляют `rem` (например, `1rem + 1vw`), чтобы текст реагировал на пользовательский зум.',
          en: 'Below 640px the 16px floor applies, above 1280px the 32px ceiling. This is fluid typography without media queries; `VAL` often includes `rem` (e.g. `1rem + 1vw`) so the text still responds to user zoom.',
        },
      },
    ],
    sources: [{ title: 'MDN — clamp()', url: `${MDN}/Web/CSS/clamp` }],
    verify: { kind: 'css-computed', html: '<h1>Title</h1>', selector: 'h1', property: 'font-size' },
  },
  {
    id: 'css-units-005',
    topic: 'css',
    tags: ['css-units', 'responsive'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'На телефоне блок с `height: 100vh` уходит под панель браузера, и его низ не виден. Что исправит это современным CSS?',
      en: 'On a phone a block with `height: 100vh` slides under the browser toolbar and its bottom is hidden. What fixes it in modern CSS?',
    },
    options: [
      { code: 'height: 100%' },
      { code: 'height: 100vw' },
      { code: 'height: 100vmax' },
      { code: 'height: calc(100vh - 1px)' },
      { code: 'height: 100dvh' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В мобильных браузерах `vh` равен **большому** вьюпорту — высоте окна со спрятанными панелями адреса и навигации. Пока панели видны, блок высотой `100vh` выше видимой области.',
          en: 'In mobile browsers `vh` equals the **large** viewport — the window height with the address and navigation bars hidden. While the bars are visible, a `100vh` block is taller than the visible area.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`dvh` (dynamic) следует за текущей высотой окна, `svh` (small) равен наименьшей (панели показаны), `lvh` (large) — наибольшей. `100dvh` совпадает с видимой областью; если пересчёт при прокрутке мешает, берут `100svh`.',
          en: '`dvh` (dynamic) follows the current window height, `svh` (small) is the smallest one (bars shown), `lvh` (large) the largest. `100dvh` matches the visible area; if resizing while scrolling is a problem, use `100svh`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — <length>: viewport units', url: `${MDN}/Web/CSS/length#relative_length_units_based_on_viewport` },
      { title: 'web.dev — The large, small, and dynamic viewport units', url: 'https://web.dev/blog/viewport-units' },
    ],
  },
  {
    id: 'css-resp-001',
    topic: 'css',
    tags: ['responsive', 'cascade'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Ширина окна — 1000px. Какая ширина будет у `.box`?', en: 'The window is 1000px wide. What width will `.box` have?' },
    code: {
      lang: 'css',
      source: `.box { width: 100%; }

@media (min-width: 900px) {
  .box { width: 33%; }
}
@media (min-width: 600px) {
  .box { width: 50%; }
}`,
    },
    options: [
      { code: '33%' },
      { code: '50%' },
      { code: '100%' },
      { text: { ru: 'По ширине содержимого', en: 'As wide as its content' } },
      { text: { ru: 'Условия пересекаются — не сработает ни одно', en: 'The conditions overlap, so neither applies' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Медиазапросы не добавляют [[specificity|специфичности]]. При ширине 1000px подходят **оба** условия, селекторы одинаковые — побеждает правило ниже по коду, то есть 50%.',
          en: 'Media queries add no [[specificity|specificity]]. At 1000px **both** conditions match and the selectors are the same, so the later rule wins — 50%.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому при mobile-first запросы с `min-width` пишут по возрастанию: 600px, потом 900px — тогда широкий экран переопределяет узкий. При desktop-first с `max-width` — наоборот, по убыванию.',
          en: 'That’s why mobile-first `min-width` queries go in ascending order: 600px, then 900px — so wider screens override narrower ones. Desktop-first `max-width` queries go in descending order.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Using media queries', url: `${MDN}/Web/CSS/CSS_media_queries/Using_media_queries` },
      { title: 'MDN — Introduction to the CSS cascade', url: `${MDN}/Web/CSS/CSS_cascade/Cascade` },
    ],
    verify: {
      kind: 'css-computed',
      html: '<div class="box"></div>',
      viewportWidth: 1000,
      selector: '.box',
      property: 'rect.width',
      expected: '492px',
    },
  },
  {
    id: 'css-resp-002',
    topic: 'css',
    tags: ['responsive'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'На телефоне страница выглядит как уменьшенная десктопная, а `@media (max-width: 600px)` не срабатывает. Чего не хватает в `<head>`?',
      en: 'On a phone the page looks like a scaled-down desktop page and `@media (max-width: 600px)` never applies. What is missing from `<head>`?',
    },
    options: [
      { code: '<meta charset="utf-8">' },
      { code: '<meta name="theme-color" content="#ffffff">' },
      { code: '<link rel="stylesheet" media="handheld" href="mobile.css">' },
      { code: '<meta name="viewport" content="width=device-width, initial-scale=1">' },
      { code: '<meta name="HandheldFriendly" content="true">' },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Без meta viewport мобильный браузер рисует страницу на виртуальном холсте шириной около 980px и уменьшает её под экран. Медиазапросы видят эти 980px, поэтому `max-width: 600px` не срабатывает.',
          en: 'Without a viewport meta tag a mobile browser lays the page out on a virtual canvas about 980px wide and scales it down. Media queries see those 980px, so `max-width: 600px` never matches.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`width=device-width` приравнивает ширину вьюпорта к ширине экрана в CSS-пикселях, `initial-scale=1` убирает начальное масштабирование. Запрещать зум через `user-scalable=no` не стоит — это вредит доступности.',
          en: '`width=device-width` sets the viewport width to the screen width in CSS pixels, and `initial-scale=1` removes the initial zoom. Don’t disable zoom with `user-scalable=no` — it hurts accessibility.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Viewport meta tag', url: `${MDN}/Web/HTML/Viewport_meta_tag` },
      { title: 'web.dev — Responsive web design basics', url: 'https://web.dev/articles/responsive-web-design-basics' },
    ],
  },
  {
    id: 'css-modern-001',
    topic: 'css',
    tags: ['modern-css', 'cascade'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Каким цветом будет текст кнопки «Inside»?', en: 'What color will the “Inside” button text be?' },
    code: {
      lang: 'html',
      source: `<style>
  :root { --accent: red; }
  .card { --accent: green; }
  .btn { color: var(--accent, blue); }
</style>

<div class="card">
  <button class="btn">Inside</button>
</div>
<button class="btn">Outside</button>`,
    },
    options: [
      { text: { ru: 'Красным', en: 'Red' } },
      { text: { ru: 'Синим', en: 'Blue' } },
      { text: { ru: 'Зелёным', en: 'Green' } },
      { text: { ru: 'Чёрным', en: 'Black' } },
      { text: { ru: 'Ошибка: переменную нельзя переопределить', en: 'An error: a variable can’t be redefined' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Пользовательские свойства (`--*`) наследуются как обычные. Кнопка внутри `.card` получает ближайшее по дереву значение `--accent` — зелёное от `.card`. Кнопка снаружи возьмёт красное от `:root`.',
          en: 'Custom properties (`--*`) inherit like regular ones. The button inside `.card` gets the nearest `--accent` up the tree — green from `.card`. The button outside takes red from `:root`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Второй аргумент `var()` — запасное значение: синий был бы, только если `--accent` нигде не определена. Переопределение переменной внутри компонента — основной приём для тем и вариантов.',
          en: 'The second `var()` argument is a fallback: blue would only apply if `--accent` weren’t defined anywhere. Redefining a variable inside a component is the core technique for themes and variants.',
        },
      },
    ],
    sources: [
      {
        title: 'MDN — Using CSS custom properties',
        url: `${MDN}/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties`,
      },
      { title: 'MDN — var()', url: `${MDN}/Web/CSS/var` },
    ],
    verify: {
      kind: 'css-computed',
      selector: '.card .btn',
      property: 'color',
      expected: 'rgb(0, 128, 0)',
      also: [{ selector: 'body > .btn', property: 'color', expected: 'rgb(255, 0, 0)' }],
    },
  },
  {
    id: 'css-modern-002',
    topic: 'css',
    tags: ['modern-css', 'cascade'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Каким цветом будет текст абзаца?', en: 'What color will the paragraph text be?' },
    code: {
      lang: 'html',
      source: `<style>
  body { color: purple; }
  p { color: red; }
  .note {
    --size: 16px;
    color: var(--size);
  }
</style>

<p class="note">Text</p>`,
    },
    options: [
      { text: { ru: 'Красным', en: 'Red' } },
      { text: { ru: 'Фиолетовым', en: 'Purple' } },
      { text: { ru: 'Чёрным', en: 'Black' } },
      { text: { ru: 'Прозрачным', en: 'Transparent' } },
      { text: { ru: 'Серым: 16px приведётся к цвету', en: 'Gray: 16px is coerced to a color' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Объявление с `var()` нельзя проверить заранее, поэтому оно проходит каскад и побеждает `p { color: red }`. Только при вычислении выясняется, что `16px` — не цвет. Такое объявление **недействительно во время вычисления** и ведёт себя как `unset`.',
          en: 'A declaration with `var()` can’t be validated up front, so it goes through the cascade and beats `p { color: red }`. Only at computed-value time does `16px` turn out not to be a color. The declaration becomes **invalid at computed-value time** and acts like `unset`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`color` наследуется, поэтому `unset` = `inherit` — берётся фиолетовый от `body`. Вернуться к «предыдущему подходящему» правилу (красному) браузер уже не может: каскад к этому моменту завершён.',
          en: '`color` is inherited, so `unset` means `inherit` — purple from `body`. The browser can’t fall back to the “previous valid” rule (red): the cascade is already done by then.',
        },
      },
    ],
    sources: [
      {
        title: 'CSS Variables — Invalid at computed-value time',
        url: 'https://www.w3.org/TR/css-variables-1/#invalid-at-computed-value-time',
      },
      { title: 'MDN — var()', url: `${MDN}/Web/CSS/var` },
    ],
    verify: { kind: 'css-computed', selector: '.note', property: 'color', expected: 'rgb(128, 0, 128)' },
  },
  {
    id: 'css-modern-003',
    topic: 'css',
    tags: ['modern-css', 'responsive'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Ширина `.sidebar` — 600px, но правило внутри `@container` не применяется. Почему?',
      en: '`.sidebar` is 600px wide, but the rule inside `@container` doesn’t apply. Why?',
    },
    code: {
      lang: 'html',
      source: `<style>
  .sidebar { width: 600px; }
  .card { color: black; }

  @container (min-width: 400px) {
    .card { color: red; }
  }
</style>

<div class="sidebar">
  <div class="card">Card</div>
</div>`,
    },
    options: [
      { text: { ru: 'У `.sidebar` нет `container-type`', en: '`.sidebar` has no `container-type`' } },
      { text: { ru: '`@container` смотрит на ширину окна', en: '`@container` checks the window width' } },
      { text: { ru: 'Браузеры их ещё не поддерживают', en: 'Browsers don’t support them yet' } },
      { text: { ru: 'В `@container` специфичность ниже', en: 'Rules in `@container` are less specific' } },
      { text: { ru: 'Нужен `display: grid` у `.sidebar`', en: '`.sidebar` needs `display: grid`' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Контейнерный запрос ищет ближайшего предка, объявленного контейнером через `container-type` (`inline-size` или `size`). Обычный блок контейнером не считается, даже если у него задана ширина, поэтому условие не на чем проверить и правило не применяется.',
          en: 'A container query looks for the nearest ancestor declared as a container via `container-type` (`inline-size` or `size`). A regular block isn’t a container even with a fixed width, so there’s nothing to test the condition against and the rule doesn’t apply.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Исправление — `.sidebar { container-type: inline-size; }`. Контейнеру можно дать имя: `container: sidebar / inline-size` и `@container sidebar (min-width: 400px)`. В отличие от `@media`, компонент подстраивается под место, где стоит, а не под окно.',
          en: 'The fix is `.sidebar { container-type: inline-size; }`. A container can be named: `container: sidebar / inline-size` with `@container sidebar (min-width: 400px)`. Unlike `@media`, the component adapts to where it’s placed, not to the window.',
        },
      },
    ],
    sources: [
      { title: 'MDN — CSS container queries', url: `${MDN}/Web/CSS/CSS_containment/Container_queries` },
      { title: 'MDN — container-type', url: `${MDN}/Web/CSS/container-type` },
    ],
    verify: {
      kind: 'css-computed',
      html: `<style>.sidebar.fixed { container-type: inline-size; }</style>
<div class="sidebar fixed"><div class="card fixed-card">Card</div></div>`,
      selector: '.card',
      property: 'color',
      expected: 'rgb(0, 0, 0)',
      also: [{ selector: '.fixed-card', property: 'color', expected: 'rgb(255, 0, 0)' }],
    },
  },
  {
    id: 'css-modern-004',
    topic: 'css',
    tags: ['modern-css', 'selectors'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Какой селектор получится у вложенного правила?', en: 'What selector does the nested rule produce?' },
    code: {
      lang: 'css',
      source: `.btn {
  color: black;

  .toolbar & {
    color: red;
  }
}`,
    },
    options: [
      { code: '.btn .toolbar' },
      { code: '.toolbar.btn' },
      { code: '.btn.toolbar' },
      { code: '.toolbar > .btn' },
      { code: '.toolbar .btn' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`&` подставляет родительский селектор туда, где стоит. `.toolbar &` превращается в `.toolbar .btn` — кнопка внутри `.toolbar`. Так стиль «в контексте» пишется рядом с основным стилем компонента.',
          en: '`&` inserts the parent selector exactly where it stands. `.toolbar &` becomes `.toolbar .btn` — a button inside `.toolbar`. This keeps contextual styles next to the component’s main styles.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`&.toolbar` (без пробела) дал бы `.btn.toolbar` — оба класса на одном элементе, а вложенный `.icon` без `&` — потомка `.btn .icon`. Нативная вложенность работает во всех основных браузерах, препроцессор для неё не нужен.',
          en: '`&.toolbar` (no space) would give `.btn.toolbar` — both classes on one element — and a nested `.icon` without `&` gives the descendant `.btn .icon`. Native nesting works in all major browsers, no preprocessor needed.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Using CSS nesting', url: `${MDN}/Web/CSS/CSS_nesting/Using_CSS_nesting` },
      { title: 'MDN — & nesting selector', url: `${MDN}/Web/CSS/Nesting_selector` },
    ],
    verify: {
      kind: 'css-computed',
      html: '<div class="toolbar"><button class="btn">A</button></div><button class="btn plain">B</button>',
      selector: '.toolbar .btn',
      property: 'color',
      expected: 'rgb(255, 0, 0)',
      also: [{ selector: '.plain', property: 'color', expected: 'rgb(0, 0, 0)' }],
    },
  },
  {
    id: 'css-modern-005',
    topic: 'css',
    tags: ['modern-css'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Лента из тысяч карточек долго рендерится при загрузке. Какое свойство позволит браузеру пропускать раскладку и отрисовку карточек за пределами экрана?',
      en: 'A feed of thousands of cards renders slowly on load. Which property lets the browser skip layout and painting for off-screen cards?',
    },
    options: [
      { code: 'will-change: transform' },
      { code: 'visibility: hidden' },
      { code: 'content-visibility: auto' },
      { code: 'display: contents' },
      { code: 'contain: none' },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`content-visibility: auto` включает «ленивый» рендер: для элементов вне экрана браузер пропускает раскладку и отрисовку содержимого, пока они не приблизятся к вьюпорту. При этом контент остаётся в DOM, доступен для поиска по странице и скринридеров.',
          en: '`content-visibility: auto` enables lazy rendering: the browser skips layout and paint for off-screen elements’ contents until they approach the viewport. The content stays in the DOM and remains available to find-in-page and screen readers.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы полоса прокрутки не прыгала, рядом задают `contain-intrinsic-size: auto 300px` — примерный размер пропущенного блока. `will-change` лишь выносит элемент в отдельный слой и при злоупотреблении тратит память, а `visibility: hidden` прячет элемент, но не отменяет его раскладку.',
          en: 'To keep the scrollbar steady, add `contain-intrinsic-size: auto 300px` — an estimated size for skipped blocks. `will-change` just promotes an element to its own layer and wastes memory when overused, and `visibility: hidden` hides an element without skipping its layout.',
        },
      },
    ],
    sources: [
      { title: 'MDN — content-visibility', url: `${MDN}/Web/CSS/content-visibility` },
      { title: 'web.dev — content-visibility', url: 'https://web.dev/articles/content-visibility' },
    ],
  },
  {
    id: 'css-anim-001',
    topic: 'css',
    tags: ['animations'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Почему `transition: height 0.3s` не анимирует раскрытие блока с `height: 0` до `height: auto`?',
      en: 'Why doesn’t `transition: height 0.3s` animate a block opening from `height: 0` to `height: auto`?',
    },
    options: [
      { text: { ru: '`transition` не работает с `height`', en: '`transition` doesn’t work with `height`' } },
      { text: { ru: 'Нужен `transition-property: all`', en: 'It needs `transition-property: all`' } },
      { text: { ru: 'Высоту анимирует только `@keyframes`', en: 'Only `@keyframes` can animate height' } },
      { text: { ru: 'Значение `auto` не интерполируется', en: 'The `auto` value can’t be interpolated' } },
      { text: { ru: 'Не хватает `will-change: height`', en: 'It’s missing `will-change: height`' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Для анимации браузеру нужны два значения, между которыми можно считать промежуточные. `auto` — ключевое слово, а не длина, поэтому по умолчанию переход между `0` и `auto` не анимируется: высота меняется сразу.',
          en: 'To animate, the browser needs two values it can compute intermediate steps between. `auto` is a keyword, not a length, so by default a transition between `0` and `auto` doesn’t animate: the height jumps.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Классические обходы — анимировать `max-height` до заведомо большого значения или `grid-template-rows` от `0fr` к `1fr`. Новые `interpolate-size: allow-keywords` и `calc-size()` разрешают анимацию до `auto`, но появились сначала в Chromium (с версии 129) — поддержку остальных браузеров проверяйте на MDN.',
          en: 'Classic workarounds are animating `max-height` to a safely large value or `grid-template-rows` from `0fr` to `1fr`. The newer `interpolate-size: allow-keywords` and `calc-size()` allow animating to `auto`, but they shipped first in Chromium (version 129) — check MDN for other browsers.',
        },
      },
    ],
    sources: [
      { title: 'MDN — interpolate-size', url: `${MDN}/Web/CSS/interpolate-size` },
      { title: 'MDN — Using CSS transitions', url: `${MDN}/Web/CSS/CSS_transitions/Using_CSS_transitions` },
    ],
  },
  {
    id: 'css-anim-002',
    topic: 'css',
    tags: ['animations'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'После окончания `@keyframes`-анимации элемент возвращается в исходное состояние. Как оставить его в состоянии последнего кадра?',
      en: 'When a `@keyframes` animation ends, the element snaps back to its original state. How do you keep the last frame?',
    },
    options: [
      { code: 'animation-direction: reverse' },
      { code: 'animation-iteration-count: 1' },
      { code: 'animation-play-state: paused' },
      { code: 'transition: none' },
      { code: 'animation-fill-mode: forwards' },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По умолчанию (`animation-fill-mode: none`) стили ключевых кадров действуют только во время анимации. `forwards` оставляет элемент со стилями последнего кадра после окончания, `backwards` применяет первый кадр уже во время `animation-delay`, а `both` делает и то и другое.',
          en: 'By default (`animation-fill-mode: none`) keyframe styles apply only while the animation runs. `forwards` keeps the last frame’s styles after it ends, `backwards` applies the first frame during `animation-delay`, and `both` does both.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Альтернатива — задать конечное состояние в обычных стилях элемента, а анимацию использовать только для перехода к нему. Тогда состояние не зависит от анимации и сохраняется, даже если её отключить через `prefers-reduced-motion`.',
          en: 'An alternative is to put the final state in the element’s regular styles and use the animation only to get there. Then the state doesn’t depend on the animation and survives disabling it via `prefers-reduced-motion`.',
        },
      },
    ],
    sources: [{ title: 'MDN — animation-fill-mode', url: `${MDN}/Web/CSS/animation-fill-mode` }],
  },
  {
    id: 'css-anim-003',
    topic: 'css',
    tags: ['animations', 'modern-css'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Почему при наведении градиент поворачивается скачком, без плавного перехода?',
      en: 'Why does the gradient rotate abruptly on hover instead of transitioning smoothly?',
    },
    code: {
      lang: 'css',
      source: `.button {
  --angle: 0deg;
  background: linear-gradient(var(--angle), red, blue);
  transition: --angle 1s;
}
.button:hover {
  --angle: 180deg;
}`,
    },
    options: [
      { text: { ru: 'У переменной нет типа — её нельзя интерполировать', en: 'The variable has no type, so it can’t be interpolated' } },
      { text: { ru: 'В градиентах нельзя использовать переменные', en: 'Gradients can’t use variables' } },
      { text: { ru: 'Нужно писать `transition: background 1s`', en: 'It should be `transition: background 1s`' } },
      { text: { ru: '`transition` не срабатывает на `:hover`', en: '`transition` doesn’t fire on `:hover`' } },
      { text: { ru: 'Угол нужно задавать в `turn`, а не в `deg`', en: 'The angle must be in `turn`, not `deg`' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Незарегистрированное пользовательское свойство для браузера — просто набор токенов без типа. Интерполировать его нельзя, поэтому перехода нет и значение меняется сразу. Если зарегистрировать тип через `@property`, `--angle` станет углом и будет плавно анимироваться — а вместе с ним и градиент.',
          en: 'To the browser, an unregistered custom property is just an untyped token sequence. It can’t be interpolated, so there’s no transition and the value changes instantly. Registering its type with `@property` makes `--angle` an angle that animates smoothly — and the gradient with it.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'css',
          source: `@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}`,
        },
        caption: {
          ru: 'После регистрации `transition: --angle 1s` работает.',
          en: 'Once registered, `transition: --angle 1s` works.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Переход по `background` не поможет: градиенты — это изображения, и браузеры не интерполируют между ними. `@property` поддерживается всеми основными браузерами.',
          en: 'Transitioning `background` won’t help: gradients are images, and browsers don’t interpolate between them. `@property` is supported in all major browsers.',
        },
      },
    ],
    sources: [
      { title: 'MDN — @property', url: `${MDN}/Web/CSS/@property` },
      { title: 'web.dev — @property', url: 'https://web.dev/articles/at-property' },
    ],
  },
];
