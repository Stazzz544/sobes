import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const HTML_LESSONS: Lesson[] = [
  {
    tag: 'html-semantics',
    summary: {
      ru: 'Семантические элементы сообщают браузеру и вспомогательным технологиям, что это за часть страницы: навигация, основной контент, заголовок, статья.',
      en: 'Semantic elements tell browsers and assistive technology what a part of the page is: navigation, main content, a heading, an article.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>` становятся **ориентирами** (landmarks): пользователь экранного диктора прыгает между ними одной клавишей. `<section>` становится [[landmark|ориентиром]] «region» только с [[accessible-name|доступным именем]], без него это обычный блок.',
          en: '`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>` become **landmarks**: a screen reader user jumps between them with one key. `<section>` becomes a “region” [[landmark|landmark]] only when it has an [[accessible-name|accessible name]]; without one it’s a plain block.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Заголовки `h1`–`h6` — оглавление страницы: по ним навигируют так же, как по ориентирам. Уровни не пропускают ради размера шрифта — размер задают в CSS. `<strong>` и `<em>` несут смысл (важность, акцент), `<b>` и `<i>` — только оформление.',
          en: 'Headings `h1`–`h6` are the page outline: users navigate by them just like by landmarks. Don’t skip levels for font size — set the size in CSS. `<strong>` and `<em>` carry meaning (importance, stress); `<b>` and `<i>` are only styling.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Ориентиры: `header`, `nav`, `main`, `aside`, `footer`.', en: 'Landmarks: `header`, `nav`, `main`, `aside`, `footer`.' },
      { ru: '`section` — ориентир, только если у него есть имя.', en: '`section` is a landmark only when it has a name.' },
      { ru: 'Уровни заголовков не пропускают ради размера.', en: 'Don’t skip heading levels for size.' },
      { ru: '`strong`/`em` — смысл, `b`/`i` — вид.', en: '`strong`/`em` — meaning, `b`/`i` — appearance.' },
    ],
    sources: [
      { title: 'MDN — <section>', url: `${MDN}/Web/HTML/Reference/Elements/section` },
      { title: 'W3C WAI — Headings', url: 'https://www.w3.org/WAI/tutorials/page-structure/headings/' },
      { title: 'W3C — HTML Accessibility API Mappings', url: 'https://www.w3.org/TR/html-aam-1.0/' },
    ],
  },
  {
    tag: 'html-parsing',
    summary: {
      ru: 'Браузер не падает на «неправильном» HTML, а исправляет его по алгоритму из спецификации. Поэтому DOM может отличаться от того, что написано в коде.',
      en: 'Browsers don’t fail on “invalid” HTML; they fix it using the algorithm from the spec. That’s why the DOM can differ from what’s in the source.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`<p>` не может содержать блочные элементы: встретив `<div>`, парсер закрывает абзац, а лишний `</p>` превращается в новый пустой `<p>`. Закрывающие теги `</li>`, `</p>`, `</td>` можно опускать — их дописывают по правилам.',
          en: '`<p>` can’t contain block elements: when the parser meets `<div>`, it closes the paragraph, and the stray `</p>` becomes a new empty `<p>`. End tags like `</li>`, `</p>`, `</td>` can be omitted — they’re inserted by the rules.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '«Самозакрывающийся» слеш в HTML работает только у **пустых элементов** (`br`, `img`, `input`, `meta`…), у которых и так нет содержимого. `<div />` — это открывающий `<div>`, и всё дальше попадёт внутрь. `<!DOCTYPE html>` включает стандартный режим; без него страница рендерится в режиме совместимости (quirks).',
          en: 'The “self-closing” slash in HTML only means something for **void elements** (`br`, `img`, `input`, `meta`…), which have no content anyway. `<div />` is an opening `<div>`, and everything after it goes inside. `<!DOCTYPE html>` turns on standards mode; without it the page renders in quirks mode.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Парсер чинит разметку — DOM ≠ исходник.', en: 'The parser fixes markup — DOM ≠ source.' },
      { ru: 'Блочный элемент внутри `<p>` закрывает абзац.', en: 'A block element inside `<p>` closes the paragraph.' },
      { ru: '`/>` ничего не значит у непустых элементов.', en: '`/>` means nothing on non-void elements.' },
      { ru: 'Без `<!DOCTYPE html>` — режим quirks.', en: 'Without `<!DOCTYPE html>` — quirks mode.' },
    ],
    sources: [
      { title: 'WHATWG — Parsing HTML documents', url: 'https://html.spec.whatwg.org/multipage/parsing.html' },
      { title: 'MDN — Void element', url: `${MDN}/Glossary/Void_element` },
      { title: 'MDN — Quirks mode and standards mode', url: `${MDN}/Web/HTML/Guides/Quirks_mode_and_standards_mode` },
    ],
  },
  {
    tag: 'html-forms',
    summary: {
      ru: 'Нативные элементы форм дают валидацию, отправку и доступность бесплатно — если знать их умолчания.',
      en: 'Native form elements give you validation, submission and accessibility for free — if you know their defaults.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`<button>` внутри формы по умолчанию имеет `type="submit"` и отправляет её — для кнопок-действий пишут `type="button"`. Поля с `disabled` не отправляются и не попадают в `FormData`; если значение нужно отправить, но не редактировать, — `readonly`.',
          en: 'A `<button>` inside a form defaults to `type="submit"` and submits it — action buttons need `type="button"`. `disabled` fields aren’t submitted and don’t appear in `FormData`; if a value must be sent but not edited, use `readonly`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Типы `email`, `url`, `number` и атрибуты `required`, `minlength`, `pattern` включают встроенную проверку: `checkValidity()` вернёт `false` для `value="abc"` у `type="email"`. Подпись связывают с полем через `<label for>` или обёртку `<label>` — тогда клик по тексту фокусирует поле, а у поля появляется [[accessible-name|доступное имя]].',
          en: 'Types like `email`, `url`, `number` and attributes `required`, `minlength`, `pattern` enable built-in validation: `checkValidity()` returns `false` for `value="abc"` with `type="email"`. Tie a caption to a field with `<label for>` or a wrapping `<label>` — then clicking the text focuses the field, and the field gets an [[accessible-name|accessible name]].',
        },
      },
    ],
    keyPoints: [
      { ru: '`<button>` в форме — по умолчанию `submit`.', en: '`<button>` in a form defaults to `submit`.' },
      { ru: '`disabled` не отправляется, `readonly` — отправляется.', en: '`disabled` isn’t submitted, `readonly` is.' },
      { ru: 'Типы полей и атрибуты дают встроенную валидацию.', en: 'Input types and attributes give built-in validation.' },
      { ru: 'Каждому полю — связанный `<label>`.', en: 'Every field needs an associated `<label>`.' },
    ],
    sources: [
      { title: 'MDN — <button>', url: `${MDN}/Web/HTML/Reference/Elements/button` },
      { title: 'MDN — disabled', url: `${MDN}/Web/HTML/Reference/Attributes/disabled` },
      { title: 'MDN — <label>', url: `${MDN}/Web/HTML/Reference/Elements/label` },
    ],
  },
  {
    tag: 'a11y-names',
    summary: {
      ru: 'Доступное имя — то, что экранный диктор произносит для элемента. У кнопки без имени пользователь слышит просто «кнопка».',
      en: 'The accessible name is what a screen reader announces for an element. A button without a name is heard as just “button”.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Имя вычисляется по порядку: `aria-labelledby` (текст указанных элементов) → `aria-label` → нативный источник (`<label>` у поля, `alt` у картинки, содержимое кнопки или ссылки) → `title` и `placeholder` как последний запасной вариант. Побеждает первый найденный.',
          en: 'The name is computed in order: `aria-labelledby` (text of the referenced elements) → `aria-label` → native source (`<label>` for a field, `alt` for an image, button or link content) → `title` and `placeholder` as a last resort. The first one found wins.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Иконка-кнопка или ссылка из одного SVG имени не получает — нужен `aria-label` или скрытый текст. `placeholder` не заменяет `<label>`: он исчезает при вводе и часто плохо контрастирует. У декоративной картинки — `alt=""`, у содержательной — описание.',
          en: 'An icon-only button or link with just an SVG gets no name — add `aria-label` or visually hidden text. `placeholder` doesn’t replace `<label>`: it disappears on input and often has poor contrast. A decorative image gets `alt=""`; a meaningful one gets a description.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Порядок: `aria-labelledby` → `aria-label` → нативное → `title`/`placeholder`.', en: 'Order: `aria-labelledby` → `aria-label` → native → `title`/`placeholder`.' },
      { ru: 'Иконке-кнопке нужен `aria-label`.', en: 'An icon button needs `aria-label`.' },
      { ru: '`placeholder` — не подпись.', en: '`placeholder` isn’t a label.' },
    ],
    sources: [
      { title: 'MDN — Accessible name', url: `${MDN}/Glossary/Accessible_name` },
      { title: 'W3C APG — Providing Accessible Names and Descriptions', url: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/' },
      { title: 'W3C — Accessible Name and Description Computation', url: 'https://www.w3.org/TR/accname-1.2/' },
    ],
  },
  {
    tag: 'a11y-aria',
    summary: {
      ru: 'ARIA меняет только то, как элемент описан для вспомогательных технологий, — поведение она не добавляет. Первое правило ARIA: если есть нативный элемент, используйте его.',
      en: 'ARIA only changes how an element is described to assistive technology — it adds no behavior. The first rule of ARIA: if a native element exists, use it.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`<div role="button">` объявляется как кнопка, но не получает фокус с клавиатуры (`tabIndex` равен -1) и не нажимается Enter и пробелом — всё это пришлось бы писать вручную. `<button>` даёт это бесплатно.',
          en: '`<div role="button">` is announced as a button but doesn’t get keyboard focus (`tabIndex` is -1) and doesn’t activate on Enter or Space — you’d have to code all that by hand. `<button>` gives it for free.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`aria-hidden="true"` прячет элемент и его потомков от вспомогательных технологий, но не от клавиатуры: фокусируемый элемент внутри такого блока станет «невидимой» остановкой табуляции. Скрывают так только декор и дубли.',
          en: '`aria-hidden="true"` hides an element and its descendants from assistive technology but not from the keyboard: a focusable element inside becomes an “invisible” tab stop. Use it only for decoration and duplicates.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Нативный элемент лучше роли ARIA.', en: 'A native element beats an ARIA role.' },
      { ru: 'Роль не добавляет фокус и обработку клавиш.', en: 'A role adds no focus or key handling.' },
      { ru: '`aria-hidden` не убирает элемент из табуляции.', en: '`aria-hidden` doesn’t remove an element from tabbing.' },
    ],
    sources: [
      { title: 'W3C — Using ARIA', url: 'https://www.w3.org/TR/using-aria/' },
      { title: 'MDN — ARIA: button role', url: `${MDN}/Web/Accessibility/ARIA/Reference/Roles/button_role` },
      { title: 'MDN — aria-hidden', url: `${MDN}/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden` },
    ],
  },
  {
    tag: 'a11y-keyboard',
    summary: {
      ru: 'Всем интерфейсом должно быть можно пользоваться с клавиатуры, а фокус должен быть виден. Порядок табуляции задаёт порядок в DOM.',
      en: 'The whole interface must be usable with a keyboard, and focus must be visible. Tab order follows DOM order.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`tabindex="0"` добавляет элемент в обычный порядок табуляции, `tabindex="-1"` делает его фокусируемым только из кода (`element.focus()`). Положительный `tabindex` ставит элемент **раньше** всех остальных — порядок становится непредсказуемым, поэтому его избегают.',
          en: '`tabindex="0"` adds an element to the normal tab order; `tabindex="-1"` makes it focusable only from code (`element.focus()`). A positive `tabindex` puts the element **before** all others — the order becomes unpredictable, so avoid it.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`outline: none` без замены лишает клавиатурных пользователей понимания, где они. `:focus-visible` показывает рамку при навигации с клавиатуры и не мешает при клике мышью.',
          en: '`outline: none` without a replacement leaves keyboard users lost. `:focus-visible` shows the ring for keyboard navigation without bothering mouse users.',
        },
      },
    ],
    keyPoints: [
      { ru: '`tabindex="0"` — в поток, `-1` — только программно.', en: '`tabindex="0"` — in the flow, `-1` — programmatic only.' },
      { ru: 'Положительный `tabindex` ломает порядок.', en: 'A positive `tabindex` breaks the order.' },
      { ru: 'Фокус всегда видим: `:focus-visible` вместо `outline: none`.', en: 'Focus is always visible: `:focus-visible` instead of `outline: none`.' },
    ],
    sources: [
      { title: 'MDN — tabindex', url: `${MDN}/Web/HTML/Reference/Global_attributes/tabindex` },
      { title: 'MDN — :focus-visible', url: `${MDN}/Web/CSS/:focus-visible` },
      { title: 'W3C — Understanding Focus Visible', url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html' },
    ],
  },
];
