import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';
const APG_NAMES = 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/';
const PARSING = 'https://html.spec.whatwg.org/multipage/parsing.html';

export const HTML_QUESTIONS_2: Question[] = [
  {
    id: 'html-a11y-names-006',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какое доступное имя у кнопки?', en: 'What is the button’s accessible name?' },
    code: {
      lang: 'html',
      source: '<h2 id="cart-title">Cart</h2>\n<button aria-labelledby="cart-title" aria-label="Open">3</button>',
    },
    options: [{ code: 'Open' }, { code: '3' }, { code: 'Cart' }, { code: 'Open 3' }, { code: 'Cart 3' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В расчёте [[accessible-name|доступного имени]] `aria-labelledby` стоит выше всего: выше `aria-label`, содержимого и `title`. Имя берётся из текста элемента с указанным id — «Cart». Этим пользуются, чтобы не дублировать текст: кнопка или регион называется видимым заголовком. Ссылаться можно и на несколько id через пробел — тексты склеятся.',
          en: 'In the [[accessible-name|accessible name]] computation `aria-labelledby` ranks highest: above `aria-label`, content and `title`. The name comes from the text of the element with that id — “Cart”. It’s used to avoid duplicating text: a button or region is named by a visible heading. You can reference several ids separated by spaces — the texts are joined.',
        },
      },
    ],
    sources: [
      { title: 'W3C APG — Names and Descriptions', url: APG_NAMES },
      { title: 'MDN — aria-labelledby', url: `${MDN}/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby` },
    ],
    verify: { kind: 'dom-probe', selector: 'button', property: 'aom.name' },
  },
  {
    id: 'html-forms-005',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Что вернёт `typeof input.value`? Впишите ответ.',
      en: 'What does `typeof input.value` return? Type the answer.',
    },
    code: { lang: 'html', source: '<input type="number" value="42">' },
    answers: ['string'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`value` у любого поля — **строка**, даже при `type="number"`: `\'42\' + 1` даст `\'421\'`. Число берут через `input.valueAsNumber` (для пустого поля — `NaN`) или `Number(input.value)`. Тип поля влияет на клавиатуру, проверку и стрелки, но не на тип значения.',
          en: 'Any field’s `value` is a **string**, even with `type="number"`: `\'42\' + 1` gives `\'421\'`. Get a number via `input.valueAsNumber` (`NaN` for an empty field) or `Number(input.value)`. The field type affects the keyboard, validation and spinners, not the value’s type.',
        },
      },
    ],
    sources: [{ title: 'MDN — <input type="number">', url: `${MDN}/Web/HTML/Reference/Elements/input/number` }],
    verify: { kind: 'dom-probe', selector: 'input', property: 'js:typeof el.value' },
  },
  {
    id: 'html-forms-006',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какие имена полей попадут в `new FormData(form)`? Впишите через запятую.',
      en: 'Which field names end up in `new FormData(form)`? Type them comma-separated.',
    },
    code: {
      lang: 'html',
      source: `<form>
  <input name="login" value="anna" disabled>
  <input name="email" value="anna@example.com" readonly>
  <input value="no-name">
</form>`,
    },
    answers: ['email'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`disabled`-поле не отправляется с формой, его нельзя сфокусировать, и диктор объявляет его недоступным. `readonly` нельзя изменить, но значение отправляется и фокус работает. Поле без `name` в данные формы не попадает вовсе. Поэтому для «показать, но отправить» берут `readonly`, а не `disabled`.',
          en: 'A `disabled` field isn’t submitted, can’t be focused, and screen readers announce it as unavailable. A `readonly` field can’t be changed, but its value is submitted and it’s focusable. A field without `name` isn’t included at all. So for “show it but submit it” use `readonly`, not `disabled`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — readonly', url: `${MDN}/Web/HTML/Reference/Attributes/readonly` },
      { title: 'MDN — disabled', url: `${MDN}/Web/HTML/Reference/Attributes/disabled` },
    ],
    verify: { kind: 'dom-probe', selector: 'form', property: "js:[...new FormData(el).keys()].join(',')" },
  },
  {
    id: 'html-semantics-005',
    topic: 'html',
    tags: ['html-semantics'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какую роль в дереве доступности получит `<a>` без `href`?',
      en: 'What role does an `<a>` without `href` get in the accessibility tree?',
    },
    code: { lang: 'html', source: '<a class="menu-toggle">Menu</a>' },
    options: [{ code: 'link' }, { code: 'button' }, { code: 'generic' }, { code: 'menuitem' }, { code: 'navigation' }],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ссылкой `<a>` становится только с `href`. Без него это просто обёртка над текстом: диктор не объявит её ссылкой, на неё нельзя попасть через Tab, а Enter ничего не нажмёт. Chrome, увидев у такого `<a>` обработчик клика, объявляет его ссылкой, но через Tab на него всё равно не попасть. Для действия без перехода нужна `<button type="button">`, для перехода — `<a href>`.',
          en: '`<a>` becomes a link only with `href`. Without it, it’s just a text wrapper: a screen reader won’t announce a link, Tab can’t reach it, and Enter does nothing. Chrome announces such an `<a>` as a link if it has a click handler, but Tab still can’t reach it. For an action without navigation use `<button type="button">`; for navigation, `<a href>`.',
        },
      },
    ],
    sources: [{ title: 'MDN — <a>: accessibility', url: `${MDN}/Web/HTML/Reference/Elements/a` }],
    verify: { kind: 'dom-probe', selector: 'a', property: 'aom.role' },
  },
  {
    id: 'html-parsing-005',
    kind: 'output',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Какой тег окажется первым дочерним элементом `<body>` после разбора? Впишите имя тега.',
      en: 'Which tag becomes the first child element of `<body>` after parsing? Type the tag name.',
    },
    code: {
      lang: 'html',
      source: `<table>
  <div>Loading…</div>
  <tr><td>1</td></tr>
</table>`,
    },
    answers: ['DIV', 'div'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Внутри `<table>` может быть только табличная разметка. Встретив `<div>`, парсер не выбрасывает его, а применяет **foster parenting**: переносит элемент **перед** таблицей. Поэтому `<div>` оказывается первым в `<body>`, а в таблице остаётся строка. Так «прыгают» блоки загрузки и ошибки, вставленные прямо в таблицу.',
          en: 'Only table markup is allowed inside `<table>`. On meeting a `<div>`, the parser doesn’t drop it but applies **foster parenting**: it moves the element **before** the table. So the `<div>` becomes the first child of `<body>`, and the table keeps the row. That’s how loading and error blocks placed right inside a table “jump” out.',
        },
      },
    ],
    sources: [{ title: 'WHATWG — Foster parenting', url: `${PARSING}#foster-parent` }],
    verify: { kind: 'dom-probe', selector: 'body', property: 'js:el.firstElementChild.tagName' },
  },
  {
    id: 'html-a11y-aria-004',
    topic: 'html',
    tags: ['a11y-aria'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'После сохранения появляется надпись «Сохранено». Как сделать, чтобы диктор её объявил?',
      en: 'After saving, a “Saved” message appears. How do you make a screen reader announce it?',
    },
    options: [
      { text: { ru: 'Дать надписи `tabindex="0"`', en: 'Give the message `tabindex="0"`' } },
      {
        text: {
          ru: 'Выводить текст в контейнер с `role="status"` (`aria-live="polite"`), который есть на странице заранее',
          en: 'Render the text into a container with `role="status"` (`aria-live="polite"`) that exists on the page beforehand',
        },
      },
      { text: { ru: 'Сделать текст жирным', en: 'Make the text bold' } },
      { text: { ru: 'Добавить `aria-hidden="true"`', en: 'Add `aria-hidden="true"`' } },
      { text: { ru: 'Показать `alert()`', en: 'Show an `alert()`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Live-регион** сообщает диктору об изменениях без перевода фокуса. `role="status"` (вежливый, дождётся паузы) — для подтверждений, `role="alert"` (срочный) — для ошибок. Важно: контейнер должен быть в DOM **до** изменения текста — регион, вставленный вместе с сообщением, многие дикторы не объявят.',
          en: 'A **live region** tells the screen reader about changes without moving focus. `role="status"` (polite, waits for a pause) suits confirmations, `role="alert"` (assertive) suits errors. Important: the container must be in the DOM **before** the text changes — a region inserted together with the message isn’t announced by many screen readers.',
        },
      },
    ],
    sources: [{ title: 'MDN — ARIA live regions', url: `${MDN}/Web/Accessibility/ARIA/Guides/Live_regions` }],
  },
  {
    id: 'html-a11y-keyboard-004',
    topic: 'html',
    tags: ['a11y-keyboard'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Зачем первой ссылкой на странице ставят «Перейти к основному содержимому»?',
      en: 'Why is “Skip to main content” placed as the first link on a page?',
    },
    options: [
      { text: { ru: 'Для SEO', en: 'For SEO' } },
      {
        text: {
          ru: 'Чтобы пользователи клавиатуры и дикторов не проходили Tab’ом всё меню на каждой странице',
          en: 'So keyboard and screen reader users don’t Tab through the whole menu on every page',
        },
      },
      { text: { ru: 'Чтобы ускорить загрузку страницы', en: 'To speed up page loading' } },
      { text: { ru: 'Это требование HTTPS', en: 'HTTPS requires it' } },
      { text: { ru: 'Для печатной версии страницы', en: 'For the print version of the page' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Skip link** ведёт на `<main id="main">` и экономит десятки нажатий Tab. Обычно её прячут визуально и показывают при фокусе — но не через `display: none`, иначе она пропадёт и для клавиатуры. Вместе с [[landmark|ориентирами]] (`<main>`, `<nav>`) и заголовками это основа навигации без мыши.',
          en: 'A **skip link** points to `<main id="main">` and saves dozens of Tab presses. It’s usually visually hidden and shown on focus — but not with `display: none`, or it disappears for the keyboard too. Together with [[landmark|landmarks]] (`<main>`, `<nav>`) and headings it’s the basis of mouse-free navigation.',
        },
      },
    ],
    sources: [{ title: 'WebAIM — Skip Navigation Links', url: 'https://webaim.org/techniques/skipnav/' }],
  },
  {
    id: 'html-a11y-keyboard-005',
    topic: 'html',
    tags: ['a11y-keyboard', 'a11y-aria'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Чем `dialog.showModal()` лучше самодельной модалки из `<div>`?',
      en: 'Why is `dialog.showModal()` better than a homemade `<div>` modal?',
    },
    options: [
      { text: { ru: 'Ничем, это одно и то же', en: 'No difference, they’re the same' } },
      {
        text: {
          ru: 'Браузер сам делает фон недоступным, переносит фокус внутрь, закрывает по Esc и выводит окно поверх всего',
          en: 'The browser itself makes the background inert, moves focus inside, closes on Esc and renders it above everything',
        },
      },
      { text: { ru: '`<dialog>` нельзя стилизовать', en: '`<dialog>` can’t be styled' } },
      { text: { ru: '`<dialog>` работает только в Chrome', en: '`<dialog>` only works in Chrome' } },
      { text: { ru: '`showModal()` блокирует JavaScript, как `alert()`', en: '`showModal()` blocks JavaScript like `alert()`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`showModal()` выводит диалог в **top layer** (никаких войн `z-index`), делает остальную страницу инертной — ни клик, ни Tab, ни диктор туда не попадут, — ставит фокус внутрь и закрывает окно по Esc. В самодельной модалке всё это приходится писать руками и легко забыть. Фон затемняют через `::backdrop`.',
          en: '`showModal()` renders the dialog in the **top layer** (no `z-index` wars), makes the rest of the page inert — no click, Tab or screen reader gets there — moves focus inside and closes on Esc. A homemade modal needs all this by hand, and it’s easy to forget. Dim the background with `::backdrop`.',
        },
      },
    ],
    sources: [{ title: 'MDN — <dialog>', url: `${MDN}/Web/HTML/Reference/Elements/dialog` }],
  },
];
