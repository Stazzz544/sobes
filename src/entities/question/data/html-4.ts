import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';
const APG_NAMES = 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/';
const PARSING = 'https://html.spec.whatwg.org/multipage/parsing.html';

export const HTML_QUESTIONS_4: Question[] = [
  {
    id: 'html-forms-009',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чему равно `input.validity.patternMismatch`? Впишите ответ.',
      en: 'What is `input.validity.patternMismatch`? Type the answer.',
    },
    code: { lang: 'html', source: '<input name="code" pattern="[0-9]{3}" value="12a">' },
    answers: ['true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`pattern` проверяет **всё** значение целиком — регулярное выражение неявно обёрнуто в `^(?:…)$`. `12a` не три цифры, поэтому `patternMismatch` — `true`. Каждое нарушение видно в своём флаге `validity`: `valueMissing`, `typeMismatch`, `tooShort`… — по ним показывают точное сообщение, а `setCustomValidity` задаёт своё. Пустое поле `pattern` не проверяет — для этого нужен `required`.',
          en: '`pattern` checks the **whole** value — the regex is implicitly wrapped in `^(?:…)$`. `12a` isn’t three digits, so `patternMismatch` is `true`. Each violation has its own `validity` flag: `valueMissing`, `typeMismatch`, `tooShort`… — use them for precise messages, and `setCustomValidity` for your own. An empty field isn’t checked by `pattern` — that needs `required`.',
        },
      },
    ],
    sources: [{ title: 'MDN — pattern', url: `${MDN}/Web/HTML/Reference/Attributes/pattern` }],
    verify: { kind: 'dom-probe', selector: 'input', property: 'js:el.validity.patternMismatch' },
  },
  {
    id: 'html-forms-010',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что вернёт `new FormData(form).getAll(\'tags\').join(\',\')`? Впишите ответ.',
      en: 'What does `new FormData(form).getAll(\'tags\').join(\',\')` return? Type the answer.',
    },
    code: {
      lang: 'html',
      source: `<form>
  <input type="checkbox" name="tags" value="react" checked>
  <input type="checkbox" name="tags" value="vue">
  <input type="checkbox" name="tags" value="css" checked>
</form>`,
    },
    answers: ['react,css'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Несколько полей с одним `name` дают несколько значений одного ключа — так отправляют группы чекбоксов и `<select multiple>`. `get(\'tags\')` вернёт только первое (`react`), все — `getAll`. Невыбранный `vue` в данные не попал. При превращении в объект через `Object.fromEntries(formData)` повторяющиеся ключи схлопнутся — останется последнее значение.',
          en: 'Several fields with one `name` give several values for one key — that’s how checkbox groups and `<select multiple>` are submitted. `get(\'tags\')` returns only the first (`react`), `getAll` returns all. The unchecked `vue` isn’t included. Converting with `Object.fromEntries(formData)` collapses repeated keys — only the last value survives.',
        },
      },
    ],
    sources: [{ title: 'MDN — FormData.getAll()', url: `${MDN}/Web/API/FormData/getAll` }],
    verify: { kind: 'dom-probe', selector: 'form', property: "js:new FormData(el).getAll('tags').join(',')" },
  },
  {
    id: 'html-forms-011',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Кнопка лежит вне формы. Чему равно `button.form?.id`? Впишите ответ.',
      en: 'The button is outside the form. What is `button.form?.id`? Type the answer.',
    },
    code: {
      lang: 'html',
      source: `<form id="checkout">
  <input name="email">
</form>
<footer>
  <button form="checkout">Pay</button>
</footer>`,
    },
    answers: ['checkout'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Атрибут `form` связывает поле или кнопку с формой по id, даже если элемент лежит в другом месте разметки: кнопка в подвале модалки или в липкой панели отправит `checkout` и попадёт в его `elements`. Это удобнее, чем растягивать `<form>` на весь макет или вызывать `form.submit()` вручную.',
          en: 'The `form` attribute links a field or button to a form by id, even if it lives elsewhere in the markup: a button in a modal footer or sticky bar submits `checkout` and joins its `elements`. That’s easier than stretching `<form>` over the whole layout or calling `form.submit()` by hand.',
        },
      },
    ],
    sources: [{ title: 'MDN — <button>: form', url: `${MDN}/Web/HTML/Reference/Elements/button` }],
    verify: { kind: 'dom-probe', selector: 'button', property: "js:el.form?.id ?? 'null'" },
  },
  {
    id: 'html-parsing-007',
    kind: 'output',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Какой текст у первой ссылки (`document.querySelector(\'a\').textContent.trim()`)? Впишите ответ.',
      en: 'What’s the first link’s text (`document.querySelector(\'a\').textContent.trim()`)? Type the answer.',
    },
    code: { lang: 'html', source: '<a href="/docs">Docs <a href="/api">API</a></a>' },
    answers: ['Docs'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ссылки нельзя вкладывать друг в друга. Встретив второй `<a>`, парсер сначала **закрывает** первый, поэтому получаются две соседние ссылки: «Docs» и «API». Так же ведут себя вложенные `<form>` и интерактивные элементы внутри `<button>` — разметка из JSX может разойтись с тем, что окажется в DOM, и сломать гидрацию.',
          en: 'Links can’t be nested. On meeting the second `<a>`, the parser first **closes** the first one, so you get two sibling links: “Docs” and “API”. Nested `<form>`s and interactive elements inside `<button>` behave similarly — JSX markup can diverge from the resulting DOM and break hydration.',
        },
      },
    ],
    sources: [{ title: 'WHATWG — The "in body" insertion mode', url: `${PARSING}#parsing-main-inbody` }],
    verify: { kind: 'dom-probe', selector: 'a', property: "js:document.querySelector('a').textContent.trim()" },
  },
  {
    id: 'html-parsing-008',
    kind: 'output',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что окажется в `p.textContent`? Впишите ответ.',
      en: 'What ends up in `p.textContent`? Type the answer.',
    },
    code: { lang: 'html', source: '<p>&lt;b&gt;bold&lt;/b&gt; &amp;copy;</p>' },
    answers: ['<b>bold</b> &copy;'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Символьные ссылки** раскрываются при разборе: `&lt;` → `<`, `&amp;` → `&`. Поэтому в тексте оказывается буквальное `<b>bold</b>` — не тег, а символы, а `&amp;copy;` превращается в `&copy;`, а не в ©. Так HTML показывает код без выполнения. Именно это делает React, экранируя строки в JSX, — и именно это отключает `dangerouslySetInnerHTML`.',
          en: '**Character references** are decoded during parsing: `&lt;` → `<`, `&amp;` → `&`. So the text contains a literal `<b>bold</b>` — characters, not a tag — and `&amp;copy;` becomes `&copy;`, not ©. That’s how HTML shows code without executing it. React does exactly this when escaping JSX strings — and `dangerouslySetInnerHTML` turns it off.',
        },
      },
    ],
    sources: [{ title: 'MDN — Character reference', url: `${MDN}/Glossary/Character_reference` }],
    verify: { kind: 'dom-probe', selector: 'p', property: 'js:el.textContent' },
  },
  {
    id: 'html-semantics-008',
    topic: 'html',
    tags: ['html-semantics'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какую роль получит поле `<input type="search">`?',
      en: 'What role does `<input type="search">` get?',
    },
    code: { lang: 'html', source: '<label>Search products <input type="search"></label>' },
    options: [{ code: 'textbox' }, { code: 'searchbox' }, { code: 'search' }, { code: 'combobox' }, { code: 'generic' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`type="search"` даёт полю роль `searchbox` — диктор объявит «поле поиска», а на телефоне клавиатура покажет кнопку «Найти». Роль `search` — это другое: [[landmark|ориентир]] для всей области поиска, его даёт элемент `<search>` или `<form role="search">`. Подсказки-автодополнение превращают поле в `combobox` — это уже задача ARIA.',
          en: '`type="search"` gives the field the `searchbox` role — a screen reader announces “search field”, and phones show a “Search” key. The `search` role is different: a [[landmark|landmark]] for the whole search area, given by the `<search>` element or `<form role="search">`. Autocomplete suggestions turn the field into a `combobox` — that’s an ARIA job.',
        },
      },
    ],
    sources: [{ title: 'MDN — ARIA: searchbox role', url: `${MDN}/Web/Accessibility/ARIA/Reference/Roles/searchbox_role` }],
    verify: { kind: 'dom-probe', selector: 'input', property: 'aom.role' },
  },
  {
    id: 'html-a11y-names-009',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какое доступное имя у поля?', en: 'What is the field’s accessible name?' },
    code: { lang: 'html', source: '<label>Email <input type="email" aria-label="Work email"></label>' },
    options: [{ code: 'Email' }, { code: 'Work email' }, { code: 'Email Work email' }, { code: 'email' }, { code: '(no name)' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`aria-label` стоит в расчёте имени выше `<label>`, поэтому диктор скажет «Work email», хотя на экране «Email». Такое расхождение ломает голосовое управление и путает зрячих пользователей дикторов. Правило: если есть видимая подпись, имя должно совпадать с ней или начинаться с неё; `aria-label` нужен там, где видимой подписи нет.',
          en: '`aria-label` ranks above `<label>` in the name computation, so the screen reader says “Work email” while the screen shows “Email”. Such a mismatch breaks voice control and confuses sighted screen reader users. Rule: with a visible label, the name should match it or start with it; `aria-label` is for when there’s no visible label.',
        },
      },
    ],
    sources: [{ title: 'W3C APG — Names and Descriptions', url: APG_NAMES }],
    verify: { kind: 'dom-probe', selector: 'input', property: 'aom.name' },
  },
  {
    id: 'html-a11y-names-010',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 1,
    popular: false,
    prompt: { ru: 'Какое доступное имя у кнопки? Впишите ответ.', en: 'What is the button’s accessible name? Type the answer.' },
    code: { lang: 'html', source: '<button>\n  <img src="disk.svg" alt="">\n  Save\n</button>' },
    answers: ['Save'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Пустой `alt=""` помечает картинку как декоративную — она не участвует в имени, и диктор скажет просто «Save, кнопка». Если бы `alt` отсутствовал совсем, некоторые дикторы зачитали бы имя файла. Для иконок рядом с текстом пустой `alt` — правильный выбор; для иконки без текста нужен осмысленный `alt` или `aria-label` на кнопке.',
          en: 'An empty `alt=""` marks the image as decorative — it doesn’t contribute to the name, and the screen reader just says “Save, button”. If `alt` were missing entirely, some screen readers would read the file name. For icons next to text an empty `alt` is right; an icon-only button needs a meaningful `alt` or an `aria-label`.',
        },
      },
    ],
    sources: [{ title: 'MDN — <img>: alt', url: `${MDN}/Web/HTML/Reference/Elements/img` }],
    verify: { kind: 'dom-probe', selector: 'button', property: 'aom.name' },
  },
  {
    id: 'html-a11y-aria-006',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-aria', 'a11y-keyboard'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Скрипт вызывает `focus()` у каждой кнопки и проверяет, стала ли она `document.activeElement`. Что получится? Впишите два значения через пробел.',
      en: 'A script calls `focus()` on each button and checks whether it became `document.activeElement`. What’s the result? Type two values separated by a space.',
    },
    code: { lang: 'html', source: '<button disabled>Pay</button>\n<button aria-disabled="true">Pay</button>' },
    answers: ['false true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`disabled` выключает кнопку полностью: она пропадает из порядка Tab, и пользователь клавиатуры может даже не узнать, что она есть. `aria-disabled="true"` только объявляет её недоступной — фокус остаётся, диктор прочитает «Pay, недоступно», а рядом можно объяснить, что заполнить. Клик при этом не блокируется — его отменяют в обработчике.',
          en: '`disabled` turns the button off entirely: it leaves the Tab order, and a keyboard user may not even know it exists. `aria-disabled="true"` only announces it as unavailable — focus stays, the screen reader says “Pay, dimmed”, and you can explain nearby what to fill in. Clicks aren’t blocked, though — cancel them in the handler.',
        },
      },
    ],
    sources: [{ title: 'MDN — aria-disabled', url: `${MDN}/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled` }],
    verify: {
      kind: 'dom-probe',
      selector: 'button',
      property:
        "js:(() => { const [native, aria] = document.querySelectorAll('button'); native.focus(); const first = document.activeElement === native; aria.focus(); return first + ' ' + (document.activeElement === aria); })()",
    },
  },
  {
    id: 'html-a11y-keyboard-007',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-keyboard', 'html-semantics'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Скрипт кликает по `<summary>`. Чему станет равно `details.open`? Впишите ответ.',
      en: 'A script clicks `<summary>`. What does `details.open` become? Type the answer.',
    },
    code: { lang: 'html', source: '<details>\n  <summary>Delivery terms</summary>\n  <p>2–3 days across the city.</p>\n</details>' },
    answers: ['true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`<details>`/`<summary>` — готовый раскрывающийся блок без JavaScript: работает с клавиатуры (Enter и пробел), диктор объявляет «свёрнуто/развёрнуто», а `Ctrl+F` находит текст даже в свёрнутом блоке. Несколько `<details>` с одинаковым `name` ведут себя как аккордеон — открыт только один. Самодельный аккордеон на `div` пришлось бы учить всему этому вручную.',
          en: '`<details>`/`<summary>` is a ready-made disclosure without JavaScript: keyboard-operable (Enter and Space), announced as “collapsed/expanded”, and `Ctrl+F` finds text even inside a collapsed block. Several `<details>` with the same `name` act as an accordion — only one open. A homemade `div` accordion would need all of this by hand.',
        },
      },
    ],
    sources: [{ title: 'MDN — <details>', url: `${MDN}/Web/HTML/Reference/Elements/details` }],
    verify: { kind: 'dom-probe', selector: 'details', property: "js:(el.querySelector('summary').click(), el.open)" },
  },
];
