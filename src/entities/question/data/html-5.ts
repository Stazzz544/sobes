import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';
const PARSING = 'https://html.spec.whatwg.org/multipage/parsing.html';
const ACCNAME = 'https://www.w3.org/TR/accname-1.2/';

export const HTML_QUESTIONS_5: Question[] = [
  {
    id: 'html-parsing-009',
    kind: 'output',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какой тег окажется первым дочерним элементом `<table>` после разбора? Впишите имя тега.',
      en: 'Which tag becomes the first child element of `<table>` after parsing? Type the tag name.',
    },
    code: { lang: 'html', source: '<table>\n  <tr><td>1</td></tr>\n</table>' },
    answers: ['TBODY', 'tbody'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Строки таблицы по стандарту живут внутри секции, поэтому парсер сам вставляет пропущенный `<tbody>`. Отсюда частая ошибка: селектор `table > tr` ничего не находит, а `table.firstElementChild` — это `tbody`, а не строка. Надёжнее писать `table tr` или работать с `table.rows`, которые не зависят от секций.',
          en: 'Per the standard, table rows live inside a section, so the parser inserts the missing `<tbody>` itself. Hence a common bug: the selector `table > tr` matches nothing, and `table.firstElementChild` is `tbody`, not the row. Prefer `table tr` or `table.rows`, which don’t depend on sections.',
        },
      },
    ],
    sources: [{ title: 'HTML Standard — Parsing: in table insertion mode', url: PARSING }],
    verify: { kind: 'dom-probe', selector: 'table', property: 'js:el.firstElementChild.tagName' },
  },
  {
    id: 'html-parsing-010',
    kind: 'output',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что выведет `document.querySelectorAll("li").length + " " + template.content.querySelectorAll("li").length`? Впишите ответ.',
      en: 'What does `document.querySelectorAll("li").length + " " + template.content.querySelectorAll("li").length` return? Type the answer.',
    },
    code: { lang: 'html', source: '<template id="row">\n  <li>First</li>\n  <li>Second</li>\n</template>' },
    answers: ['0 2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Содержимое `<template>` разбирается, но не попадает в документ: оно лежит в отдельном `DocumentFragment` — `template.content`. Его не видят `querySelectorAll`, не грузятся картинки и не выполняются скрипты внутри. Чтобы использовать шаблон, его клонируют: `template.content.cloneNode(true)` — и вставляют копию на страницу.',
          en: 'The contents of `<template>` are parsed but don’t enter the document: they live in a separate `DocumentFragment` — `template.content`. `querySelectorAll` doesn’t see them, images inside don’t load and scripts don’t run. To use a template, clone it: `template.content.cloneNode(true)` — and insert the copy.',
        },
      },
    ],
    sources: [{ title: 'MDN — <template>', url: `${MDN}/Web/HTML/Reference/Elements/template` }],
    verify: {
      kind: 'dom-probe',
      selector: 'template',
      property: "js:document.querySelectorAll('li').length + ' ' + el.content.querySelectorAll('li').length",
    },
  },
  {
    id: 'html-parsing-011',
    kind: 'output',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чему равно `input.value`? Впишите ответ.',
      en: 'What is `input.value`? Type the answer.',
    },
    code: { lang: 'html', source: '<input name="city" value="Moscow" value="Kazan">' },
    answers: ['Moscow'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Если атрибут повторяется в одном теге, парсер оставляет **первый**, а остальные отбрасывает — это ошибка разбора, но без исключений и предупреждений. Так бывает при сборке разметки из шаблонов: значение по умолчанию и переданное значение оказываются в одном теге, и «побеждает» не то, что ожидали. Валидатор HTML такие дубли находит.',
          en: 'When an attribute repeats within a tag, the parser keeps the **first** one and drops the rest — it’s a parse error, but with no exception or warning. It happens when markup is assembled from templates: a default value and a passed value end up in one tag, and the “wrong” one wins. An HTML validator catches such duplicates.',
        },
      },
    ],
    sources: [{ title: 'HTML Standard — Parsing: duplicate-attribute', url: PARSING }],
    verify: { kind: 'dom-probe', selector: 'input', property: 'js:el.value' },
  },
  {
    id: 'html-forms-012',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Чему равно `input.value.length`? Впишите число.',
      en: 'What is `input.value.length`? Type the number.',
    },
    code: { lang: 'html', source: '<input type="number" value="12px">' },
    answers: ['0'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У `type="number"` браузер очищает значение: всё, что не является корректным числом, превращается в пустую строку. То же происходит, когда пользователь вводит «12,5» в локали с точкой или просто «е». Поэтому пустой `value` у числового поля не всегда значит «ничего не ввели» — смотрите `input.validity.badInput`. Число удобнее брать через `input.valueAsNumber` (будет `NaN`).',
          en: 'For `type="number"` the browser sanitizes the value: anything that isn’t a valid number becomes an empty string. The same happens when a user types “12,5” in a dot-decimal locale or just “e”. So an empty `value` on a number field doesn’t always mean “nothing entered” — check `input.validity.badInput`. Get the number via `input.valueAsNumber` (it’ll be `NaN`).',
        },
      },
    ],
    sources: [{ title: 'MDN — <input type="number">', url: `${MDN}/Web/HTML/Reference/Elements/input/number` }],
    verify: { kind: 'dom-probe', selector: 'input', property: 'js:el.value.length' },
  },
  {
    id: 'html-forms-013',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что вернёт `new FormData(form).get("agree")`? Впишите ответ.',
      en: 'What does `new FormData(form).get("agree")` return? Type the answer.',
    },
    code: { lang: 'html', source: '<form>\n  <input type="checkbox" name="agree" checked>\n</form>' },
    answers: ['on'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Отмеченный чекбокс без атрибута `value` отправляет строку `"on"` — не `true` и не `"1"`. Неотмеченный не отправляет ничего: поля нет в `FormData` вообще. Поэтому на сервере проверяют наличие поля, а если нужно конкретное значение — задают `value="yes"`. Для булевых настроек в JSON удобнее брать `input.checked`.',
          en: 'A checked checkbox without a `value` attribute submits the string `"on"` — not `true` and not `"1"`. An unchecked one submits nothing: the field is absent from `FormData` entirely. So servers check whether the field exists, and when a specific value is needed you set `value="yes"`. For boolean settings in JSON, read `input.checked`.',
        },
      },
    ],
    sources: [{ title: 'MDN — <input type="checkbox">: value', url: `${MDN}/Web/HTML/Reference/Elements/input/checkbox` }],
    verify: { kind: 'dom-probe', selector: 'form', property: "js:new FormData(el).get('agree')" },
  },
  {
    id: 'html-forms-014',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'У формы стоит `novalidate`. Что вернёт `form.checkValidity()`? Впишите ответ.',
      en: 'The form has `novalidate`. What does `form.checkValidity()` return? Type the answer.',
    },
    code: { lang: 'html', source: '<form novalidate>\n  <input name="email" required>\n</form>' },
    answers: ['false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`novalidate` отключает только **проверку при отправке**: форма уйдёт без встроенных подсказок браузера. Ограничения полей остаются в силе: `required` по-прежнему нарушен, `checkValidity()` возвращает `false`, а `:invalid` срабатывает. На этом строят свою валидацию: отключают стандартные всплывашки и показывают сообщения сами, опираясь на `validity`.',
          en: '`novalidate` turns off only **validation on submit**: the form submits without the browser’s built-in prompts. Field constraints still apply: `required` is still violated, `checkValidity()` returns `false`, and `:invalid` matches. Custom validation builds on this: disable the default bubbles and show your own messages based on `validity`.',
        },
      },
    ],
    sources: [{ title: 'MDN — <form>: novalidate', url: `${MDN}/Web/HTML/Reference/Elements/form` }],
    verify: { kind: 'dom-probe', selector: 'form', property: 'js:el.checkValidity()' },
  },
  {
    id: 'html-a11y-names-011',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какое доступное имя у группы полей? Впишите ответ.',
      en: 'What is the accessible name of the field group? Type the answer.',
    },
    code: {
      lang: 'html',
      source: '<fieldset>\n  <legend>Delivery</legend>\n  <label><input type="radio" name="d"> Courier</label>\n  <label><input type="radio" name="d"> Pickup</label>\n</fieldset>',
    },
    answers: ['Delivery'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`<fieldset>` получает роль `group`, а `<legend>` даёт ей имя. Скринридер, попадая на первую радиокнопку, объявит «Delivery, группа» и только потом «Courier, переключатель». Без группы пользователь услышит «Courier» и «Pickup», не понимая, о чём вопрос. Для набора радиокнопок или связанных полей (адрес, дата) группа с подписью обязательна.',
          en: '`<fieldset>` gets the `group` role, and `<legend>` gives it its name. When a screen reader reaches the first radio button it announces “Delivery, group” and only then “Courier, radio button”. Without the group the user hears “Courier” and “Pickup” with no idea what’s being asked. For a set of radios or related fields (address, date) a labeled group is a must.',
        },
      },
    ],
    sources: [{ title: 'MDN — <fieldset>', url: `${MDN}/Web/HTML/Reference/Elements/fieldset` }],
    verify: { kind: 'dom-probe', selector: 'fieldset', property: 'aom.name' },
  },
  {
    id: 'html-a11y-names-012',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Какое доступное имя у кнопки? Впишите ответ.',
      en: 'What is the button’s accessible name? Type the answer.',
    },
    code: {
      lang: 'html',
      source: '<span id="file">report.pdf</span>\n<button id="remove" aria-labelledby="remove file">Delete</button>',
    },
    answers: ['Delete report.pdf'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`aria-labelledby` принимает список id и склеивает тексты через пробел в указанном порядке. Ссылка на сам элемент берёт его содержимое — так получается «Delete report.pdf». Приём нужен для списков, где у каждой строки своя кнопка «Delete»: на слух они иначе неразличимы, а визуально подпись не меняется.',
          en: '`aria-labelledby` takes a list of ids and joins their texts with spaces in the given order. A reference to the element itself uses its own content — giving “Delete report.pdf”. The technique is for lists where every row has its own “Delete” button: otherwise they sound identical, while the visible label stays the same.',
        },
      },
    ],
    sources: [{ title: 'W3C — Accessible Name and Description Computation 1.2', url: ACCNAME }],
    verify: { kind: 'dom-probe', selector: 'button', property: 'aom.name' },
  },
  {
    id: 'html-a11y-keyboard-008',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-keyboard'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Скрипт вызывает `focus()` у каждой ссылки и проверяет, стала ли она `document.activeElement`. Что получится для первой и второй ссылки? Впишите через пробел.',
      en: 'A script calls `focus()` on each link and checks whether it became `document.activeElement`. What is the result for the first and second link? Type them separated by a space.',
    },
    code: { lang: 'html', source: '<a href="/docs">Docs</a>\n<a class="link">More</a>' },
    answers: ['true false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ссылка без `href` — не ссылка: она не получает фокус ни скриптом, ни с клавиатуры и не открывается по Enter, даже если выглядит как ссылка и на ней висит обработчик клика. Подвох: `tabIndex` у обеих ссылок равен `0` — по стандарту это значение по умолчанию для любого `<a>`, так что о фокусируемости он ничего не говорит. Нужна навигация — ставьте `href`, нужно действие — используйте `<button>`.',
          en: 'An anchor without `href` isn’t a link: it can’t be focused by script or keyboard and isn’t activated by Enter, even if it looks like a link and has a click handler. The catch: `tabIndex` is `0` on both links — per the standard that’s the default for any `<a>`, so it says nothing about focusability. For navigation use `href`; for an action use `<button>`.',
        },
      },
    ],
    sources: [{ title: 'MDN — HTMLElement.tabIndex', url: `${MDN}/Web/API/HTMLElement/tabIndex` }],
    verify: {
      kind: 'dom-probe',
      selector: 'a',
      property: "js:[...document.querySelectorAll('a')].map((link) => (link.focus(), document.activeElement === link)).join(' ')",
    },
  },
  {
    id: 'html-semantics-009',
    kind: 'output',
    topic: 'html',
    tags: ['html-semantics'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чему равно `getComputedStyle(div).display`? Впишите ответ.',
      en: 'What is `getComputedStyle(div).display`? Type the answer.',
    },
    code: {
      lang: 'html',
      source: '<style>\n  .toolbar { display: flex; }\n</style>\n<div class="toolbar" hidden>…</div>',
    },
    answers: ['flex'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Атрибут `hidden` прячет элемент правилом браузера `[hidden] { display: none }`. Это обычный CSS с низким приоритетом, и любое авторское `display` его перебивает — блок с `hidden` остаётся на экране. Поэтому в сбросах стилей часто пишут `[hidden] { display: none !important; }`. Сам атрибут при этом есть, и `el.hidden` вернёт `true`.',
          en: 'The `hidden` attribute hides an element with the browser rule `[hidden] { display: none }`. It’s ordinary low-priority CSS, and any author `display` overrides it — the block with `hidden` stays visible. That’s why CSS resets often include `[hidden] { display: none !important; }`. The attribute is still there, and `el.hidden` returns `true`.',
        },
      },
    ],
    sources: [{ title: 'MDN — hidden', url: `${MDN}/Web/HTML/Reference/Global_attributes/hidden` }],
    verify: { kind: 'dom-probe', selector: 'div', property: 'js:getComputedStyle(el).display' },
  },
];
