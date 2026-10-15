import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';
const APG_NAMES = 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/';
const HTML_AAM = 'https://www.w3.org/TR/html-aam-1.0/';

export const HTML_QUESTIONS_3: Question[] = [
  {
    id: 'html-semantics-006',
    topic: 'html',
    tags: ['html-semantics'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Какую роль в дереве доступности получит `<header>` внутри `<article>`?',
      en: 'What role does a `<header>` inside an `<article>` get in the accessibility tree?',
    },
    code: {
      lang: 'html',
      source: `<article>
  <header><h2>Release notes</h2></header>
  <p>…</p>
</article>`,
    },
    options: [{ code: 'banner' }, { code: 'sectionheader' }, { code: 'heading' }, { code: 'region' }, { code: 'navigation' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[landmark|Ориентир]] `banner` (шапка сайта) даёт только `<header>`, который относится ко всей странице. Внутри `<article>`, `<section>`, `<aside>`, `<nav>` или `<main>` это шапка раздела — по ARIA 1.3 роль `sectionheader` (раньше — `generic`), не ориентир. Иначе на странице со списком статей дикторы показывали бы десятки «баннеров». То же правило работает для `<footer>`: `contentinfo` только у подвала страницы.',
          en: 'Only a `<header>` scoped to the whole page gives the `banner` [[landmark|landmark]] (the site header). Inside `<article>`, `<section>`, `<aside>`, `<nav>` or `<main>` it’s a section header — role `sectionheader` per ARIA 1.3 (formerly `generic`), not a landmark. Otherwise a page of articles would show dozens of “banners” to screen readers. The same rule applies to `<footer>`: only the page footer gets `contentinfo`.',
        },
      },
    ],
    sources: [{ title: 'W3C — HTML Accessibility API Mappings: header', url: `${HTML_AAM}#el-header` }],
    verify: { kind: 'dom-probe', selector: 'header', property: 'aom.role' },
  },
  {
    id: 'html-forms-007',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какие имена полей попадут в `new FormData(form)`? Впишите через запятую.',
      en: 'Which field names end up in `new FormData(form)`? Type them comma-separated.',
    },
    code: {
      lang: 'html',
      source: `<form>
  <input type="checkbox" name="news" value="yes" checked>
  <input type="checkbox" name="ads" value="yes">
  <select name="city">
    <option>Moscow</option>
    <option>Kazan</option>
  </select>
</form>`,
    },
    answers: ['news,city', 'news, city'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Невыбранный чекбокс в данные формы **не попадает вовсе** — сервер увидит не `ads=false`, а отсутствие поля. Поэтому «нет» обрабатывают на сервере как значение по умолчанию. `<select>` без выбора отправляет первую опцию, а у `<option>` без `value` значением становится текст.',
          en: 'An unchecked checkbox **doesn’t appear at all** in form data — the server sees not `ads=false` but a missing field. So “no” is handled on the server as the default. A `<select>` without a selection submits the first option, and an `<option>` without `value` submits its text.',
        },
      },
    ],
    sources: [{ title: 'MDN — <input type="checkbox">', url: `${MDN}/Web/HTML/Reference/Elements/input/checkbox` }],
    verify: { kind: 'dom-probe', selector: 'form', property: "js:[...new FormData(el).keys()].join(',')" },
  },
  {
    id: 'html-forms-008',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чему равен `input.value.length`? Впишите число.',
      en: 'What is `input.value.length`? Type the number.',
    },
    code: { lang: 'html', source: '<input type="text" maxlength="3" value="abcdef">' },
    answers: ['6'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`maxlength` ограничивает только **ввод пользователя**: напечатать четвёртый символ не дадут, но значение из атрибута или из JavaScript не обрезается. Валидность `tooLong` срабатывает лишь после правки пользователем. Значит, ограничения длины всё равно проверяют на сервере и в схеме формы.',
          en: '`maxlength` limits only **user input**: you can’t type a fourth character, but a value from the attribute or JavaScript isn’t truncated. The `tooLong` validity only triggers after a user edit. So length limits are still checked on the server and in the form schema.',
        },
      },
    ],
    sources: [{ title: 'MDN — maxlength', url: `${MDN}/Web/HTML/Reference/Attributes/maxlength` }],
    verify: { kind: 'dom-probe', selector: 'input', property: 'js:el.value.length' },
  },
  {
    id: 'html-parsing-006',
    kind: 'output',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Сколько элементов найдёт `document.querySelectorAll(\'li\')`? Впишите число.',
      en: 'How many elements does `document.querySelectorAll(\'li\')` find? Type the number.',
    },
    code: {
      lang: 'html',
      source: `<ul>
  <template>
    <li>Draft</li>
  </template>
  <li>Published</li>
</ul>`,
    },
    answers: ['1'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Содержимое `<template>` разбирается, но не попадает в документ: оно лежит в отдельном фрагменте `template.content`, не рендерится и не находится селекторами. Шаблон клонируют (`template.content.cloneNode(true)`) и вставляют, когда нужно. На этом построены веб-компоненты и Shadow DOM.',
          en: '`<template>` content is parsed but not placed in the document: it lives in a separate `template.content` fragment, isn’t rendered and isn’t found by selectors. You clone the template (`template.content.cloneNode(true)`) and insert it when needed. Web components and Shadow DOM build on this.',
        },
      },
    ],
    sources: [{ title: 'MDN — <template>', url: `${MDN}/Web/HTML/Reference/Elements/template` }],
    verify: { kind: 'dom-probe', selector: 'ul', property: "js:document.querySelectorAll('li').length" },
  },
  {
    id: 'html-a11y-names-007',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какое доступное имя у ссылки? Впишите ответ.',
      en: 'What is the link’s accessible name? Type the answer.',
    },
    code: { lang: 'html', source: '<a href="/">\n  <img src="logo.svg" alt="Sobes">\n  Home\n</a>' },
    answers: ['Sobes Home'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Имя ссылки собирается из содержимого: текст `alt` картинки плюс текст рядом — «Sobes Home». Если картинка лишь дублирует текст, ей ставят `alt=""`, чтобы диктор не читал лишнее. Ссылка из одной картинки без `alt` останется без имени, и диктор зачитает адрес.',
          en: 'A link’s name is built from its content: the image’s `alt` plus the nearby text — “Sobes Home”. If the image only duplicates the text, give it `alt=""` so the screen reader skips it. A link with only an image and no `alt` has no name, and the screen reader reads the URL.',
        },
      },
    ],
    sources: [{ title: 'W3C APG — Names and Descriptions', url: APG_NAMES }],
    verify: { kind: 'dom-probe', selector: 'a', property: 'aom.name' },
  },
  {
    id: 'html-a11y-names-008',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-names', 'a11y-aria'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какое доступное имя у кнопки? Впишите ответ.',
      en: 'What is the button’s accessible name? Type the answer.',
    },
    code: {
      lang: 'html',
      source: '<button>\n  <span aria-hidden="true">×</span>\n  <span class="visually-hidden">Close</span>\n</button>',
    },
    answers: ['Close'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`aria-hidden="true"` убирает декоративный символ из [[accessibility-tree|дерева доступности]], а визуально скрытый (но не `display: none`) текст в нём остаётся. Это распространённый приём для кнопок-иконок: на экране — крестик, диктор говорит «Close». Альтернатива — `aria-label="Close"` на самой кнопке.',
          en: '`aria-hidden="true"` removes the decorative symbol from the [[accessibility-tree|accessibility tree]], while visually hidden (but not `display: none`) text stays in it. It’s a common pattern for icon buttons: a cross on screen, “Close” from the screen reader. The alternative is `aria-label="Close"` on the button itself.',
        },
      },
    ],
    sources: [{ title: 'MDN — aria-hidden', url: `${MDN}/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden` }],
    verify: { kind: 'dom-probe', selector: 'button', property: 'aom.name' },
  },
  {
    id: 'html-a11y-aria-005',
    topic: 'html',
    tags: ['a11y-aria'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какую роль получит этот элемент?',
      en: 'What role does this element get?',
    },
    code: { lang: 'html', source: '<label>\n  <input type="checkbox" role="switch" checked>\n  Dark theme\n</label>' },
    options: [{ code: 'checkbox' }, { code: 'switch' }, { code: 'button' }, { code: 'option' }, { code: 'generic' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`role="switch"` на нативном чекбоксе — правильный способ сделать переключатель: диктор объявит «переключатель, включено», а клавиатура, фокус и отправка формы работают из коробки. Это редкий случай, когда ARIA уточняет роль нативного элемента, не ломая его поведение. Самодельный `div` пришлось бы учить всему вручную.',
          en: '`role="switch"` on a native checkbox is the right way to build a toggle: the screen reader announces “switch, on”, while keyboard, focus and form submission work out of the box. It’s a rare case where ARIA refines a native element’s role without breaking its behavior. A homemade `div` would need all of that by hand.',
        },
      },
    ],
    sources: [{ title: 'MDN — ARIA: switch role', url: `${MDN}/Web/Accessibility/ARIA/Reference/Roles/switch_role` }],
    verify: { kind: 'dom-probe', selector: 'input', property: 'aom.role' },
  },
  {
    id: 'html-a11y-keyboard-006',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-keyboard'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Скрипт по очереди вызывает `focus()` у обеих кнопок и проверяет, стала ли кнопка `document.activeElement`. Что получится? Впишите два значения через пробел.',
      en: 'A script calls `focus()` on each button in turn and checks whether it became `document.activeElement`. What’s the result? Type two values separated by a space.',
    },
    code: {
      lang: 'html',
      source: `<div inert>
  <button>Behind the modal</button>
</div>
<button>In the modal</button>`,
    },
    answers: ['false true'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`inert` делает поддерево недоступным целиком: на элементы нельзя кликнуть, сфокусироваться (даже программно) и их не видят дикторы. Это современная замена связке `aria-hidden` + `tabindex="-1"` + перехват кликов для контента под модальным окном. `dialog.showModal()` делает фон инертным сам.',
          en: '`inert` makes a whole subtree unavailable: elements can’t be clicked or focused (even programmatically), and screen readers don’t see them. It’s the modern replacement for the `aria-hidden` + `tabindex="-1"` + click-blocking combo for content under a modal. `dialog.showModal()` makes the background inert by itself.',
        },
      },
    ],
    sources: [{ title: 'MDN — inert', url: `${MDN}/Web/HTML/Reference/Global_attributes/inert` }],
    verify: {
      kind: 'dom-probe',
      selector: 'div',
      property:
        "js:(() => { const [behind, modal] = document.querySelectorAll('button'); behind.focus(); const first = document.activeElement === behind; modal.focus(); return first + ' ' + (document.activeElement === modal); })()",
    },
  },
  {
    id: 'html-semantics-007',
    topic: 'html',
    tags: ['html-semantics'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Зачем указывать `<html lang="ru">`?',
      en: 'Why set `<html lang="ru">`?',
    },
    options: [
      { text: { ru: 'Чтобы браузер перевёл страницу', en: 'So the browser translates the page' } },
      {
        text: {
          ru: 'Диктор выберет правильное произношение, браузер — переносы и кавычки, поисковики и переводчик поймут язык',
          en: 'Screen readers pick the right pronunciation, the browser hyphenation and quotes, search engines and translators detect the language',
        },
      },
      { text: { ru: 'Без него не работают кириллические шрифты', en: 'Cyrillic fonts don’t work without it' } },
      { text: { ru: 'Это нужно только для SEO в Яндексе', en: 'It’s only for Yandex SEO' } },
      { text: { ru: 'Он задаёт кодировку страницы', en: 'It sets the page encoding' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По `lang` диктор переключает голос: без него русский текст могут прочитать английским синтезатором — получится набор звуков. Ещё `lang` влияет на `hyphens: auto`, кавычки в `q`, проверку орфографии и предложение перевести страницу. Для фраз на другом языке атрибут ставят на отдельный элемент: `<span lang="en">`. Кодировку задаёт `<meta charset>`, а не `lang`.',
          en: 'Screen readers switch voices by `lang`: without it Russian text may be read by an English synthesizer — producing gibberish. `lang` also affects `hyphens: auto`, quotes in `q`, spell-checking and offers to translate. For phrases in another language, set it on an element: `<span lang="en">`. Encoding is set by `<meta charset>`, not `lang`.',
        },
      },
    ],
    sources: [{ title: 'MDN — lang', url: `${MDN}/Web/HTML/Reference/Global_attributes/lang` }],
  },
];
