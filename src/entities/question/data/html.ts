import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';
const APG_NAMES = 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/';
const USING_ARIA = 'https://www.w3.org/TR/using-aria/';
const PARSING = 'https://html.spec.whatwg.org/multipage/parsing.html';

export const HTML_QUESTIONS: Question[] = [
  {
    id: 'html-parsing-001',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Сколько элементов `<p>` окажется в DOM?', en: 'How many `<p>` elements end up in the DOM?' },
    code: { lang: 'html', source: '<p>a<div>b</div>c</p>' },
    options: [{ code: '1' }, { code: '2' }, { code: '3' }, { code: '0' }, { code: '4' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`<p>` не может содержать `<div>`. Встретив `<div>`, парсер закрывает абзац: `<p>a</p><div>b</div>c`. Затем лишний `</p>` без открытого абзаца по правилам превращается в пустой `<p></p>` — итого два.',
          en: '`<p>` can’t contain `<div>`. On seeing `<div>`, the parser closes the paragraph: `<p>a</p><div>b</div>c`. Then the stray `</p>` with no open paragraph becomes an empty `<p></p>` by the rules — two in total.',
        },
      },
    ],
    sources: [
      { title: 'WHATWG — Parsing HTML documents', url: PARSING },
      { title: 'MDN — <p>', url: `${MDN}/Web/HTML/Reference/Elements/p` },
    ],
    verify: { kind: 'dom-probe', selector: 'html', property: "js:document.querySelectorAll('p').length" },
  },
  {
    id: 'html-parsing-002',
    kind: 'output',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Сколько элементов `<li>` будет в списке? Впишите число.',
      en: 'How many `<li>` elements will the list have? Type the number.',
    },
    code: { lang: 'html', source: '<ul>\n  <li>HTML\n  <li>CSS\n  <li>JS\n</ul>' },
    answers: ['3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Закрывающий `</li>` можно опускать: новый `<li>` или конец списка автоматически закрывает предыдущий пункт. Получается три полноценных элемента, а не вложенная лесенка.',
          en: 'The closing `</li>` may be omitted: a new `<li>` or the end of the list closes the previous item automatically. You get three proper elements, not a nested staircase.',
        },
      },
    ],
    sources: [{ title: 'WHATWG — Parsing HTML documents', url: PARSING }],
    verify: { kind: 'dom-probe', selector: 'ul', property: "js:el.querySelectorAll('li').length" },
  },
  {
    id: 'html-parsing-003',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какой тег у родителя `<span>` в DOM?', en: 'What is the tag of `<span>`’s parent in the DOM?' },
    code: { lang: 'html', source: '<div class="icon" />\n<span>Hello</span>' },
    options: [{ code: 'BODY' }, { code: 'DIV' }, { code: 'SPAN' }, { code: 'HTML' }, { code: 'P' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В HTML слеш в `<div />` игнорируется: это просто открывающий `<div>`. Он остаётся открытым, и `<span>` попадает внутрь. «Самозакрываются» только пустые элементы — `br`, `img`, `input`, `meta` и подобные; в JSX правила другие.',
          en: 'In HTML the slash in `<div />` is ignored: it’s just an opening `<div>`. It stays open, and `<span>` ends up inside. Only void elements “self-close” — `br`, `img`, `input`, `meta` and the like; JSX has different rules.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Void element', url: `${MDN}/Glossary/Void_element` },
      { title: 'WHATWG — Parsing HTML documents', url: PARSING },
    ],
    verify: { kind: 'dom-probe', selector: 'span', property: 'js:el.parentElement.tagName' },
  },
  {
    id: 'html-parsing-004',
    topic: 'html',
    tags: ['html-parsing'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что будет, если убрать `<!DOCTYPE html>` из начала страницы?', en: 'What happens if you remove `<!DOCTYPE html>` from the top of a page?' },
    options: [
      { text: { ru: 'Ничего: это просто комментарий', en: 'Nothing: it’s just a comment' } },
      { text: { ru: 'Браузер откажется показывать страницу', en: 'The browser refuses to render the page' } },
      {
        text: {
          ru: 'Страница отрисуется в режиме совместимости (quirks): часть CSS начнёт вести себя по-старому',
          en: 'The page renders in quirks mode: some CSS starts behaving the old way',
        },
      },
      { text: { ru: 'Отключится JavaScript', en: 'JavaScript gets disabled' } },
      { text: { ru: 'Страница станет XHTML', en: 'The page becomes XHTML' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`<!DOCTYPE html>` включает **стандартный режим**. Без него браузер переходит в quirks mode и эмулирует ошибки старых браузеров: иначе считаются размеры блоков, высота строк в таблицах и другое. Поэтому doctype пишут всегда.',
          en: '`<!DOCTYPE html>` turns on **standards mode**. Without it the browser switches to quirks mode and emulates old browser bugs: box sizes, table line heights and more are computed differently. So always include the doctype.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Quirks mode and standards mode', url: `${MDN}/Web/HTML/Guides/Quirks_mode_and_standards_mode` },
      { title: 'MDN — Doctype', url: `${MDN}/Glossary/Doctype` },
    ],
  },
  {
    id: 'html-forms-001',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Чему равен `type` у кнопки?', en: 'What is the button’s `type`?' },
    code: { lang: 'html', source: '<form>\n  <input name="q">\n  <button>Find</button>\n</form>' },
    options: [{ code: 'button' }, { code: 'submit' }, { code: 'reset' }, { code: 'undefined' }, { code: 'none' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У `<button>` без атрибута `type` значение по умолчанию — `submit`: нажатие отправит форму и перезагрузит страницу. Для кнопок-действий внутри формы (очистить, открыть подсказку) пишут `type="button"`.',
          en: 'A `<button>` without a `type` attribute defaults to `submit`: clicking it submits the form and reloads the page. For action buttons inside a form (clear, open a hint) write `type="button"`.',
        },
      },
    ],
    sources: [{ title: 'MDN — <button>', url: `${MDN}/Web/HTML/Reference/Elements/button` }],
    verify: { kind: 'dom-probe', selector: 'button', property: 'js:el.type' },
  },
  {
    id: 'html-forms-002',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какие имена полей попадут в `new FormData(form)`? Впишите через запятую в порядке полей.',
      en: 'Which field names end up in `new FormData(form)`? Type them comma-separated in field order.',
    },
    code: {
      lang: 'html',
      source: `<form>
  <input name="name" value="Ann">
  <input name="email" value="ann@example.com" disabled>
  <input name="city" value="Tver" readonly>
</form>`,
    },
    answers: ['name,city'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Поле с `disabled` не отправляется и не попадает в `FormData`. `readonly` запрещает только редактирование — значение отправится. Если поле нужно показать, но не давать менять, и при этом отправить, — это `readonly`.',
          en: 'A `disabled` field isn’t submitted and doesn’t appear in `FormData`. `readonly` only prevents editing — the value is still sent. To show a value, block changes and still submit it, use `readonly`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — disabled', url: `${MDN}/Web/HTML/Reference/Attributes/disabled` },
      { title: 'MDN — FormData()', url: `${MDN}/Web/API/FormData/FormData` },
    ],
    verify: { kind: 'dom-probe', selector: 'form', property: "js:[...new FormData(el).keys()].join(',')" },
  },
  {
    id: 'html-forms-003',
    kind: 'output',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Что вернёт `input.checkValidity()`? Впишите ответ.',
      en: 'What does `input.checkValidity()` return? Type the answer.',
    },
    code: { lang: 'html', source: '<input type="email" value="abc">' },
    answers: ['false'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`type="email"` включает встроенную проверку формата: «abc» — не адрес, поэтому поле невалидно и `checkValidity()` возвращает `false`. Пустое необязательное поле считалось бы валидным; за обязательность отвечает `required`.',
          en: '`type="email"` turns on built-in format validation: “abc” isn’t an address, so the field is invalid and `checkValidity()` returns `false`. An empty optional field would be valid; `required` handles mandatory input.',
        },
      },
    ],
    sources: [{ title: 'MDN — <input type="email">', url: `${MDN}/Web/HTML/Reference/Elements/input/email` }],
    verify: { kind: 'dom-probe', selector: 'input', property: 'js:el.checkValidity()' },
  },
  {
    id: 'html-forms-004',
    topic: 'html',
    tags: ['html-forms'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Как правильно связать подпись «Email» с полем ввода?',
      en: 'What’s the right way to tie the “Email” caption to an input?',
    },
    options: [
      { text: { ru: 'Написать текст «Email» рядом в `<span>`', en: 'Put the text “Email” next to it in a `<span>`' } },
      { text: { ru: '`<label for="email">Email</label>` и `<input id="email">`', en: '`<label for="email">Email</label>` and `<input id="email">`' } },
      { text: { ru: 'Только `placeholder="Email"`', en: 'Only `placeholder="Email"`' } },
      { text: { ru: '`<input title="Email">` без подписи на экране', en: '`<input title="Email">` with no visible caption' } },
      { text: { ru: '`<div class="label">Email</div>` над полем', en: '`<div class="label">Email</div>` above the field' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Связанный `<label>` (через `for`/`id` или обёрткой) даёт полю доступное имя, а клик по тексту фокусирует поле — это ещё и большая цель касания. Соседний `<span>` или `<div>` визуально похож, но с полем не связан.',
          en: 'An associated `<label>` (via `for`/`id` or by wrapping) gives the field an accessible name, and clicking the text focuses the field — a bigger touch target too. A nearby `<span>` or `<div>` looks similar but isn’t associated.',
        },
      },
    ],
    sources: [{ title: 'MDN — <label>', url: `${MDN}/Web/HTML/Reference/Elements/label` }],
  },
  {
    id: 'html-a11y-names-001',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какое доступное имя у кнопки?', en: 'What is the button’s accessible name?' },
    code: { lang: 'html', source: '<button aria-label="Close" title="Exit">Cancel</button>' },
    options: [{ code: 'Close' }, { code: 'Exit' }, { code: 'Cancel' }, { code: 'Close Cancel' }, { code: 'Cancel Exit' }],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`aria-label` стоит в расчёте имени раньше содержимого и `title`, поэтому диктор скажет «Close», хотя на экране написано «Cancel». Такое расхождение мешает голосовому управлению: человек говорит «нажми Cancel», а кнопки с таким именем нет.',
          en: '`aria-label` comes before content and `title` in the name computation, so a screen reader says “Close” even though the screen shows “Cancel”. Such a mismatch breaks voice control: the user says “click Cancel” and there’s no button with that name.',
        },
      },
    ],
    sources: [
      { title: 'W3C APG — Names and Descriptions', url: APG_NAMES },
      { title: 'MDN — aria-label', url: `${MDN}/Web/Accessibility/ARIA/Reference/Attributes/aria-label` },
    ],
    verify: { kind: 'dom-probe', selector: 'button', property: 'aom.name' },
  },
  {
    id: 'html-a11y-names-002',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какое доступное имя у кнопки?', en: 'What is the button’s accessible name?' },
    code: { lang: 'html', source: '<span id="hint">Confirm</span>\n<button aria-labelledby="hint" aria-label="Delete">Remove</button>' },
    options: [{ code: 'Confirm' }, { code: 'Delete' }, { code: 'Remove' }, { code: 'Confirm Delete' }, { code: 'Delete Remove' }],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`aria-labelledby` — самый приоритетный источник имени: он перекрывает и `aria-label`, и содержимое. Имя берётся из текста элемента с `id="hint"` — «Confirm».',
          en: '`aria-labelledby` is the highest-priority name source: it overrides both `aria-label` and content. The name comes from the text of the element with `id="hint"` — “Confirm”.',
        },
      },
    ],
    sources: [
      { title: 'W3C — Accessible Name and Description Computation', url: 'https://www.w3.org/TR/accname-1.2/' },
      { title: 'MDN — aria-labelledby', url: `${MDN}/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby` },
    ],
    verify: { kind: 'dom-probe', selector: 'button', property: 'aom.name' },
  },
  {
    id: 'html-a11y-names-003',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какое доступное имя получит поле ввода? Впишите ответ.',
      en: 'What accessible name does the input get? Type the answer.',
    },
    code: { lang: 'html', source: '<label>\n  Email\n  <input type="email" placeholder="you@example.com">\n</label>' },
    answers: ['Email'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Поле внутри `<label>` связано с ним неявно и получает имя из текста подписи — «Email». `placeholder` используется только как запасной источник, когда подписи нет.',
          en: 'An input inside `<label>` is implicitly associated and takes its name from the caption text — “Email”. `placeholder` is only a fallback when there’s no label.',
        },
      },
    ],
    sources: [
      { title: 'MDN — <label>', url: `${MDN}/Web/HTML/Reference/Elements/label` },
      { title: 'W3C APG — Names and Descriptions', url: APG_NAMES },
    ],
    verify: { kind: 'dom-probe', selector: 'input', property: 'aom.name' },
  },
  {
    id: 'html-a11y-names-004',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что услышит пользователь экранного диктора на этой ссылке?', en: 'What does a screen reader user hear on this link?' },
    code: { lang: 'html', source: '<a href="/cart">\n  <svg width="24" height="24" viewBox="0 0 24 24"><path d="M3 3h18v18H3z" /></svg>\n</a>' },
    options: [
      { text: { ru: '«Корзина, ссылка»', en: '“Cart, link”' } },
      { text: { ru: 'Только «ссылка» — имени у неё нет', en: 'Just “link” — it has no name' } },
      { text: { ru: 'Адрес «/cart» целиком, всегда одинаково', en: 'The “/cart” address, always the same way' } },
      { text: { ru: '«Изображение»', en: '“Image”' } },
      { text: { ru: 'Ссылка будет пропущена', en: 'The link will be skipped' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В ссылке только SVG без текста, поэтому доступное имя пустое. Часть дикторов зачитает адрес, часть — просто «ссылка»; понять, куда она ведёт, нельзя. Нужен `aria-label="Корзина"` на ссылке или скрытый текст.',
          en: 'The link contains only an SVG with no text, so the accessible name is empty. Some screen readers read the URL, others just say “link”; you can’t tell where it goes. Add `aria-label="Cart"` to the link or visually hidden text.',
        },
      },
    ],
    sources: [{ title: 'W3C APG — Names and Descriptions', url: APG_NAMES }],
    verify: { kind: 'dom-probe', selector: 'a', property: 'aom.name', expected: '' },
  },
  {
    id: 'html-a11y-names-005',
    topic: 'html',
    tags: ['a11y-names'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Почему `placeholder` не заменяет `<label>`?', en: 'Why doesn’t `placeholder` replace `<label>`?' },
    options: [
      { text: { ru: 'Его не поддерживают браузеры', en: 'Browsers don’t support it' } },
      {
        text: {
          ru: 'Он исчезает при вводе, обычно бледный и не всеми технологиями используется как имя',
          en: 'It disappears on input, is usually faint and isn’t used as a name by all technologies',
        },
      },
      { text: { ru: 'Он отправляется на сервер вместо значения', en: 'It’s submitted to the server instead of the value' } },
      { text: { ru: 'Он запрещён в полях `type="email"`', en: 'It’s forbidden in `type="email"` fields' } },
      { text: { ru: 'Заменяет — это одно и то же', en: 'It does — they’re the same' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Подсказка пропадает, как только человек начинает печатать, — непонятно, что за поле, особенно при ошибке. Цвет подсказки часто не проходит по контрасту, а как доступное имя `placeholder` — лишь запасной вариант. Подпись нужна всегда, `placeholder` — для примера формата.',
          en: 'The hint vanishes as soon as someone starts typing — it’s unclear what the field is, especially on error. Placeholder color often fails contrast, and as an accessible name it’s only a fallback. Always have a label; use `placeholder` for a format example.',
        },
      },
    ],
    sources: [
      { title: 'MDN — placeholder', url: `${MDN}/Web/HTML/Reference/Attributes/placeholder` },
      { title: 'W3C APG — Names and Descriptions', url: APG_NAMES },
    ],
  },
  {
    id: 'html-semantics-001',
    topic: 'html',
    tags: ['html-semantics'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Какую роль получит элемент в дереве доступности?', en: 'What role does the element get in the accessibility tree?' },
    code: { lang: 'html', source: '<nav>\n  <a href="/">Home</a>\n  <a href="/docs">Docs</a>\n</nav>' },
    options: [{ code: 'navigation' }, { code: 'menu' }, { code: 'list' }, { code: 'region' }, { code: 'generic' }],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`<nav>` получает роль `navigation` — это ориентир, к которому пользователь экранного диктора переходит одной командой. Роль `menu` — для меню приложения со стрелочной навигацией, а не для набора ссылок.',
          en: '`<nav>` gets the `navigation` role — a landmark a screen reader user can jump to with one command. The `menu` role is for application menus with arrow-key navigation, not a set of links.',
        },
      },
    ],
    sources: [
      { title: 'MDN — <nav>', url: `${MDN}/Web/HTML/Reference/Elements/nav` },
      { title: 'W3C — HTML Accessibility API Mappings', url: 'https://www.w3.org/TR/html-aam-1.0/' },
    ],
    verify: { kind: 'dom-probe', selector: 'nav', property: 'aom.role' },
  },
  {
    id: 'html-semantics-002',
    topic: 'html',
    tags: ['html-semantics'],
    difficulty: 3,
    popular: false,
    prompt: { ru: 'Какую роль получит `<section>` без доступного имени?', en: 'What role does a `<section>` without an accessible name get?' },
    code: { lang: 'html', source: '<section>\n  <h2>News</h2>\n  <p>…</p>\n</section>' },
    options: [{ code: 'region' }, { code: 'generic' }, { code: 'article' }, { code: 'main' }, { code: 'group' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`<section>` становится ориентиром `region` только при наличии доступного имени (`aria-label` или `aria-labelledby` на заголовок). Без имени это `generic` — обычный блок, как `div`. Заголовок внутри сам по себе имя не даёт.',
          en: '`<section>` becomes a `region` landmark only when it has an accessible name (`aria-label` or `aria-labelledby` pointing to its heading). Without a name it’s `generic` — a plain block like `div`. A heading inside doesn’t name it by itself.',
        },
      },
    ],
    sources: [
      { title: 'MDN — <section>', url: `${MDN}/Web/HTML/Reference/Elements/section` },
      { title: 'W3C — HTML Accessibility API Mappings', url: 'https://www.w3.org/TR/html-aam-1.0/' },
    ],
    verify: { kind: 'dom-probe', selector: 'section', property: 'aom.role' },
  },
  {
    id: 'html-semantics-003',
    topic: 'html',
    tags: ['html-semantics'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'После `<h1>` дизайнер хочет маленький заголовок раздела. Что правильнее?',
      en: 'After `<h1>`, the designer wants a small section heading. What’s right?',
    },
    options: [
      { text: { ru: 'Взять `<h4>`, потому что он мельче', en: 'Use `<h4>` because it’s smaller' } },
      { text: { ru: 'Использовать `<h2>` и уменьшить его в CSS', en: 'Use `<h2>` and make it smaller in CSS' } },
      { text: { ru: '`<div class="title">` — заголовки только для SEO', en: '`<div class="title">` — headings are only for SEO' } },
      { text: { ru: '`<b>` с крупным шрифтом', en: '`<b>` with a large font' } },
      { text: { ru: 'Ещё один `<h1>`', en: 'Another `<h1>`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Уровень заголовка отражает структуру, а не размер: подраздел после `h1` — это `h2`. Пользователи дикторов навигируют по заголовкам как по оглавлению, и пропущенные уровни сбивают с толку. Размер задают стилями.',
          en: 'A heading level reflects structure, not size: a subsection after `h1` is `h2`. Screen reader users navigate by headings like a table of contents, and skipped levels confuse them. Set size with styles.',
        },
      },
    ],
    sources: [
      { title: 'W3C WAI — Headings', url: 'https://www.w3.org/WAI/tutorials/page-structure/headings/' },
      { title: 'MDN — Heading elements', url: `${MDN}/Web/HTML/Reference/Elements/Heading_Elements` },
    ],
  },
  {
    id: 'html-semantics-004',
    topic: 'html',
    tags: ['html-semantics'],
    difficulty: 1,
    popular: false,
    prompt: { ru: 'Чем `<strong>` отличается от `<b>`?', en: 'How does `<strong>` differ from `<b>`?' },
    options: [
      { text: { ru: 'Ничем, это синонимы', en: 'Nothing, they’re synonyms' } },
      { text: { ru: '`<strong>` обозначает важность, `<b>` — только визуальное выделение', en: '`<strong>` marks importance, `<b>` is visual emphasis only' } },
      { text: { ru: '`<b>` устарел и не работает в HTML5', en: '`<b>` is deprecated and doesn’t work in HTML5' } },
      { text: { ru: '`<strong>` делает текст крупнее', en: '`<strong>` makes text larger' } },
      { text: { ru: '`<b>` — блочный элемент, `<strong>` — строчный', en: '`<b>` is a block element, `<strong>` is inline' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Оба выглядят жирными, но `<strong>` несёт смысл — важность, серьёзность или срочность, а `<b>` лишь привлекает внимание без дополнительного значения (ключевые слова, названия). Для чисто визуального жирного проще задать `font-weight` в CSS.',
          en: 'Both render bold, but `<strong>` carries meaning — importance, seriousness or urgency, while `<b>` just draws attention without extra meaning (keywords, names). For purely visual bold, set `font-weight` in CSS.',
        },
      },
    ],
    sources: [{ title: 'MDN — <strong>', url: `${MDN}/Web/HTML/Reference/Elements/strong` }],
  },
  {
    id: 'html-a11y-aria-001',
    kind: 'output',
    topic: 'html',
    tags: ['a11y-aria'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Чему равен `el.tabIndex` у этого «кнопочного» `div`? Впишите число.',
      en: 'What is `el.tabIndex` for this “button” `div`? Type the number.',
    },
    code: { lang: 'html', source: '<div role="button">Save</div>' },
    answers: ['-1'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`role="button"` меняет только то, как элемент объявляется, — фокус и клавиши не добавляются. `tabIndex` равен -1: до «кнопки» не дойти табом, а Enter и пробел её не нажмут. Нативный `<button>` всё это умеет сам.',
          en: '`role="button"` only changes how the element is announced — no focus or keys are added. `tabIndex` is -1: you can’t Tab to the “button”, and Enter or Space won’t activate it. A native `<button>` handles all that itself.',
        },
      },
    ],
    sources: [
      { title: 'MDN — ARIA: button role', url: `${MDN}/Web/Accessibility/ARIA/Reference/Roles/button_role` },
      { title: 'W3C — Using ARIA', url: USING_ARIA },
    ],
    verify: { kind: 'dom-probe', selector: 'div', property: 'js:el.tabIndex' },
  },
  {
    id: 'html-a11y-aria-002',
    topic: 'html',
    tags: ['a11y-aria'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Какое решение для кнопки «Сохранить» лучше?', en: 'Which solution for a “Save” button is best?' },
    options: [
      { text: { ru: '`<div onclick="save()">Сохранить</div>`', en: '`<div onclick="save()">Save</div>`' } },
      {
        text: {
          ru: '`<div role="button" tabindex="0">` и свои обработчики Enter и пробела',
          en: '`<div role="button" tabindex="0">` plus your own Enter and Space handlers',
        },
      },
      { text: { ru: '`<button type="button">Сохранить</button>`', en: '`<button type="button">Save</button>`' } },
      { text: { ru: '`<span class="btn" aria-label="Сохранить">`', en: '`<span class="btn" aria-label="Save">`' } },
      { text: { ru: '`<a href="#">Сохранить</a>`', en: '`<a href="#">Save</a>`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Первое правило ARIA**: если есть нативный элемент с нужной семантикой и поведением — используйте его. `<button>` фокусируется, нажимается Enter и пробелом, объявляется как кнопка и работает в формах.',
          en: '**The first rule of ARIA**: if a native element with the needed semantics and behavior exists, use it. `<button>` is focusable, activates on Enter and Space, is announced as a button and works in forms.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`div` с ролью и обработчиками можно довести до рабочего состояния, но это больше кода и ошибок. Ссылка — для перехода, а не для действия.',
          en: 'A `div` with a role and handlers can be made to work, but it’s more code and more bugs. A link is for navigation, not actions.',
        },
      },
    ],
    sources: [{ title: 'W3C — Using ARIA', url: USING_ARIA }],
  },
  {
    id: 'html-a11y-aria-003',
    topic: 'html',
    tags: ['a11y-aria'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чтобы спрятать от дикторов модальное окно «под» открытым, на контейнер страницы повесили `aria-hidden="true"`. В чём проблема?',
      en: 'To hide the page under an open modal from screen readers, `aria-hidden="true"` was put on the page container. What’s the problem?',
    },
    options: [
      { text: { ru: 'Его скроет и визуально', en: 'It also hides it visually' } },
      {
        text: {
          ru: 'Ссылки и кнопки внутри по-прежнему получают фокус с клавиатуры — пользователь окажется на «невидимом» элементе',
          en: 'Links and buttons inside still get keyboard focus — the user lands on an “invisible” element',
        },
      },
      { text: { ru: 'Атрибут не работает на `div`', en: 'The attribute doesn’t work on `div`' } },
      { text: { ru: 'Его нужно писать как `aria-hidden="hidden"`', en: 'It must be written as `aria-hidden="hidden"`' } },
      { text: { ru: 'Проблем нет', en: 'There’s no problem' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`aria-hidden` убирает элементы только из дерева доступности, но не из порядка табуляции. Фокус уходит на скрытую ссылку, и диктор молчит или зачитывает непонятное. Для фона модалки используют атрибут `inert` — он убирает и из дерева, и из фокуса.',
          en: '`aria-hidden` removes elements only from the accessibility tree, not from the tab order. Focus moves to a hidden link, and the screen reader is silent or confusing. For the content behind a modal use the `inert` attribute — it removes things from both the tree and focus.',
        },
      },
    ],
    sources: [
      { title: 'MDN — aria-hidden', url: `${MDN}/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden` },
      { title: 'W3C — Using ARIA', url: USING_ARIA },
    ],
  },
  {
    id: 'html-a11y-keyboard-001',
    kind: 'order',
    topic: 'html',
    tags: ['a11y-keyboard'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В каком порядке кнопки получат фокус при нажатии Tab?',
      en: 'In what order do the buttons receive focus when pressing Tab?',
    },
    code: {
      lang: 'html',
      source: `<button>A</button>
<button tabindex="2">B</button>
<button tabindex="1">C</button>
<button>D</button>`,
    },
    items: [{ code: 'C' }, { code: 'B' }, { code: 'A' }, { code: 'D' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сначала идут элементы с **положительным** `tabindex` по возрастанию: `1` (C), затем `2` (B). Потом — все с `tabindex="0"` или фокусируемые по умолчанию, в порядке DOM: A, D.',
          en: 'First come elements with a **positive** `tabindex` in ascending order: `1` (C), then `2` (B). Then everything with `tabindex="0"` or focusable by default, in DOM order: A, D.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому положительный `tabindex` почти всегда ошибка: порядок фокуса перестаёт совпадать с визуальным. Порядок меняют перестановкой элементов в DOM.',
          en: 'That’s why a positive `tabindex` is almost always a mistake: focus order stops matching the visual order. Change the order by rearranging the DOM.',
        },
      },
    ],
    sources: [{ title: 'MDN — tabindex', url: `${MDN}/Web/HTML/Reference/Global_attributes/tabindex` }],
  },
  {
    id: 'html-a11y-keyboard-002',
    topic: 'html',
    tags: ['a11y-keyboard'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что делает `tabindex="-1"`?', en: 'What does `tabindex="-1"` do?' },
    options: [
      { text: { ru: 'Делает элемент полностью нефокусируемым', en: 'Makes the element completely unfocusable' } },
      {
        text: {
          ru: 'Убирает элемент из обхода Tab, но позволяет фокусировать его из кода через `focus()`',
          en: 'Removes the element from Tab order but lets code focus it with `focus()`',
        },
      },
      { text: { ru: 'Ставит элемент последним в порядке Tab', en: 'Puts the element last in Tab order' } },
      { text: { ru: 'Скрывает элемент от экранных дикторов', en: 'Hides the element from screen readers' } },
      { text: { ru: 'Отключает клики мышью', en: 'Disables mouse clicks' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`tabindex="-1"` нужен для элементов, куда фокус переводят программно: заголовок модального окна при открытии, контейнер сообщения об ошибке, цель ссылки «Перейти к содержимому». Табом до них не дойти, но `focus()` работает.',
          en: '`tabindex="-1"` is for elements that receive focus programmatically: a modal heading on open, an error summary container, the target of a “Skip to content” link. Tab won’t reach them, but `focus()` works.',
        },
      },
    ],
    sources: [{ title: 'MDN — tabindex', url: `${MDN}/Web/HTML/Reference/Global_attributes/tabindex` }],
  },
  {
    id: 'html-a11y-keyboard-003',
    topic: 'html',
    tags: ['a11y-keyboard'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Дизайнеру не нравится рамка фокуса при клике по кнопкам. Как поступить?',
      en: 'The designer dislikes the focus ring when clicking buttons. What should you do?',
    },
    options: [
      { text: { ru: '`button:focus { outline: none; }`', en: '`button:focus { outline: none; }`' } },
      {
        text: {
          ru: 'Убрать рамку у `:focus`, но показать её у `:focus-visible`',
          en: 'Remove the ring on `:focus` but show it on `:focus-visible`',
        },
      },
      { text: { ru: 'Запретить фокус кнопок через `tabindex="-1"`', en: 'Block button focus with `tabindex="-1"`' } },
      { text: { ru: 'Сделать рамку прозрачной', en: 'Make the ring transparent' } },
      { text: { ru: 'Заменить кнопки на `div`', en: 'Replace the buttons with `div`s' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`:focus-visible` срабатывает, когда браузер считает индикатор нужным — обычно при навигации с клавиатуры, — и не при клике мышью. Так рамка не мешает дизайну, а клавиатурные пользователи видят, где фокус. Полностью убирать её нельзя: это нарушение WCAG.',
          en: '`:focus-visible` matches when the browser deems an indicator necessary — usually keyboard navigation — and not on mouse clicks. The ring stays out of the design’s way while keyboard users see where focus is. Removing it entirely violates WCAG.',
        },
      },
    ],
    sources: [
      { title: 'MDN — :focus-visible', url: `${MDN}/Web/CSS/:focus-visible` },
      { title: 'W3C — Understanding Focus Visible', url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html' },
    ],
  },
];
