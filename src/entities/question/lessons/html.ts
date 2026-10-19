import type { Lesson } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const HTML_LESSONS: Lesson[] = [
  {
    tag: 'html-semantics',
    format: 'steps',
    summary: {
      ru: 'Семантический тег — это не только «правильно по стандарту». Из него браузер строит дерево доступности: роли, ориентиры и заголовки, по которым люди с экранным диктором ходят по странице.',
      en: 'A semantic tag isn’t just “correct by the spec”. The browser builds the accessibility tree from it: roles, landmarks and headings that screen reader users navigate by.',
    },
    steps: [
      {
        id: 'landmarks',
        title: { ru: 'Ориентиры страницы', en: 'Page landmarks' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Теги разметки получают **роли** в [[accessibility-tree|дереве доступности]]. Часть ролей — [[landmark|ориентиры]]: диктор перечисляет их и переходит к нужному одной командой. `<nav>` — `navigation`, `<main>` — `main`, `<aside>` — `complementary`. `<header>` и `<footer>` дают `banner` и `contentinfo`, только если относятся ко всей странице. Внутри `<article>`, `<section>` или `<main>` это шапка и подвал раздела: `<header>` там — `sectionheader`, а не `banner`.',
              en: 'Markup tags get **roles** in the [[accessibility-tree|accessibility tree]]. Some roles are [[landmark|landmarks]]: a screen reader lists them and jumps to one with a single command. `<nav>` is `navigation`, `<main>` is `main`, `<aside>` is `complementary`. `<header>` and `<footer>` give `banner` and `contentinfo` only when they belong to the whole page. Inside `<article>`, `<section>` or `<main>` they’re a section’s header and footer: a `<header>` there is `sectionheader`, not `banner`.',
            },
          },
          {
            type: 'illustration',
            illustration: 'html-landmarks',
            caption: { ru: 'Тег слева, роль в дереве доступности — справа', en: 'Tag on the left, accessibility role on the right' },
          },
        ],
        test: ['html-semantics-001'],
      },
      {
        id: 'section-name',
        title: { ru: 'section и article', en: 'section and article' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`<article>` — самостоятельный кусок, который можно вынести отдельно: пост, карточка товара, комментарий. `<section>` — тематический раздел страницы. Ориентиром `region` он становится только при наличии [[accessible-name|доступного имени]] — `aria-label` или `aria-labelledby` со ссылкой на заголовок. Без имени это `generic`, обычный блок вроде `<div>`: десяток безымянных регионов только засорил бы список ориентиров.',
              en: '`<article>` is a self-contained piece you could pull out on its own: a post, a product card, a comment. `<section>` is a thematic part of the page. It becomes a `region` landmark only with an [[accessible-name|accessible name]] — `aria-label` or `aria-labelledby` pointing at a heading. Without a name it’s `generic`, a plain block like `<div>`: a dozen unnamed regions would just clutter the landmark list.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<section aria-labelledby="news-title">\n  <h2 id="news-title">News</h2>\n  …\n</section>',
            },
            caption: { ru: 'С именем — ориентир `region`', en: 'With a name — a `region` landmark' },
          },
        ],
        test: ['html-semantics-002'],
      },
      {
        id: 'headings',
        title: { ru: 'Заголовки — оглавление', en: 'Headings are a table of contents' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Пользователи дикторов часто читают страницу как оглавление: перескакивают по заголовкам `h1`–`h6`. Поэтому уровень заголовка отражает **структуру**, а не размер шрифта. Подраздел после `h1` — это `h2`, даже если дизайнер хочет его маленьким: размер задают в CSS. Пропущенные уровни (`h1` → `h4`) и заголовки, выбранные «по виду», сбивают с толку — непонятно, что во что вложено.',
              en: 'Screen reader users often read a page as a table of contents, jumping between `h1`–`h6` headings. So a heading level reflects **structure**, not font size. A subsection after `h1` is an `h2`, even if the designer wants it small: size is set in CSS. Skipped levels (`h1` → `h4`) and headings picked “by looks” are confusing — it’s unclear what nests in what.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'heading-for-style',
              prompt: {
                ru: 'В карточке нужен крупный жирный текст, но это не заголовок раздела. Что выбрать?',
                en: 'A card needs large bold text, but it isn’t a section heading. What do you pick?',
              },
              options: [
                { text: { ru: '`<h3>` — он подходящего размера', en: '`<h3>` — it’s the right size' } },
                { text: { ru: '`<p>` или `<span>` со стилями в CSS', en: 'A `<p>` or `<span>` styled with CSS' } },
                { text: { ru: '`<h1>` — самый заметный', en: '`<h1>` — the most visible' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Заголовок попадёт в оглавление диктора и сломает структуру. Внешний вид — задача CSS, а тег выбирают по смыслу.',
                en: 'A heading would land in the screen reader’s outline and break the structure. Looks are CSS’s job; the tag is chosen by meaning.',
              },
            },
          },
        ],
        test: ['html-semantics-003'],
      },
      {
        id: 'text-meaning',
        title: { ru: 'Смысл текста и язык', en: 'Text meaning and language' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`<strong>` и `<b>` выглядят одинаково жирными, но `<strong>` означает **важность**, а `<b>` лишь выделяет без смысла — ключевые слова, названия. Так же `<em>` — смысловое ударение, `<i>` — термин или иноязычное слово. Атрибут `lang` у `<html>` сообщает язык: по нему диктор выбирает голос и произношение — без `lang="ru"` русский текст может прочитать английский синтезатор. Ещё `lang` влияет на переносы `hyphens: auto`, кавычки и проверку орфографии.',
              en: '`<strong>` and `<b>` both look bold, but `<strong>` means **importance**, while `<b>` only highlights without meaning — keywords, names. Likewise `<em>` is stress emphasis and `<i>` a term or a foreign word. The `lang` attribute on `<html>` declares the language: the screen reader picks its voice and pronunciation from it — without `lang="ru"` Russian text may be read by an English synthesizer. `lang` also affects `hyphens: auto`, quotes and spellchecking.',
            },
          },
        ],
        test: ['html-semantics-004', 'html-semantics-007'],
      },
      {
        id: 'controls',
        title: { ru: 'Ссылка, кнопка, поиск', en: 'Link, button, search' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ссылкой `<a>` становится только с `href`. Без него это `generic` — обёртка над текстом: на неё не попасть через Tab, диктор не назовёт её ссылкой, Enter ничего не сделает. Ведёт на другую страницу — ссылка, выполняет действие — `<button>`. Похожие роли легко спутать: `<input type="search">` — это поле `searchbox`, а ориентир `search` даёт элемент `<search>` (или `role="search"`) вокруг всей области поиска.',
              en: '`<a>` becomes a link only with `href`. Without it, it’s `generic` — a wrapper around text: Tab can’t reach it, the screen reader won’t call it a link, Enter does nothing. Goes to another page — a link; performs an action — a `<button>`. Similar roles are easy to mix up: `<input type="search">` is a `searchbox` field, while the `search` landmark comes from a `<search>` element (or `role="search"`) wrapping the whole search area.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<search>\n  <label>\n    Search <input type="search">\n  </label>\n</search>',
            },
            caption: { ru: 'Ориентир `search`, внутри поле `searchbox`', en: 'A `search` landmark with a `searchbox` inside' },
          },
        ],
        test: ['html-semantics-005'],
      },
      {
        id: 'hidden',
        title: { ru: 'Атрибут hidden', en: 'The hidden attribute' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Атрибут `hidden` прячет элемент правилом браузера `[hidden] { display: none }`. Это обычный CSS с самым низким приоритетом, и любое авторское `display` его перебивает: блок `.toolbar { display: flex }` с `hidden` останется на экране. Поэтому в сбросе стилей часто пишут `[hidden] { display: none !important; }`. Для «спрятать только визуально, но оставить диктору» нужен класс вроде `visually-hidden`, а не `hidden`.',
              en: 'The `hidden` attribute hides an element with the browser rule `[hidden] { display: none }`. It’s ordinary CSS with the lowest priority, and any author `display` overrides it: a `.toolbar { display: flex }` block with `hidden` stays on screen. That’s why style resets often include `[hidden] { display: none !important; }`. To hide something visually but keep it for screen readers, use a class like `visually-hidden`, not `hidden`.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'hidden-overridden',
              prompt: {
                ru: 'У `<div class="modal" hidden>` в CSS `.modal { display: grid }`. Видно ли окно?',
                en: '`<div class="modal" hidden>` has `.modal { display: grid }` in CSS. Is the modal visible?',
              },
              options: [
                { text: { ru: 'Нет: `hidden` всегда сильнее CSS', en: 'No: `hidden` always beats CSS' } },
                { text: { ru: 'Да: авторский `display` перебил правило браузера', en: 'Yes: the author `display` overrode the browser rule' } },
                { text: { ru: 'Видно только диктору', en: 'Only to screen readers' } },
              ],
              answer: 1,
              explanation: {
                ru: '`hidden` работает через стиль браузера по умолчанию, а авторские стили важнее. Окно останется на экране.',
                en: '`hidden` works through the browser’s default stylesheet, and author styles win. The modal stays on screen.',
              },
            },
          },
        ],
        test: ['html-semantics-009'],
      },
    ],
    keyPoints: [
      { ru: 'Теги дают роли; `nav`, `main`, `aside` — ориентиры.', en: 'Tags give roles; `nav`, `main`, `aside` are landmarks.' },
      { ru: '`<section>` — ориентир только с доступным именем.', en: '`<section>` is a landmark only with an accessible name.' },
      { ru: 'Уровень заголовка — структура, а не размер.', en: 'A heading level is structure, not size.' },
      { ru: '`<a>` без `href` — не ссылка.', en: '`<a>` without `href` isn’t a link.' },
      { ru: '`hidden` перебивается любым авторским `display`.', en: 'Any author `display` overrides `hidden`.' },
    ],
    sources: [
      { title: 'MDN — <section>', url: `${MDN}/Web/HTML/Reference/Elements/section` },
      { title: 'W3C WAI — Headings', url: 'https://www.w3.org/WAI/tutorials/page-structure/headings/' },
      { title: 'W3C — HTML Accessibility API Mappings', url: 'https://www.w3.org/TR/html-aam-1.0/' },
      { title: 'MDN — hidden', url: `${MDN}/Web/HTML/Reference/Global_attributes/hidden` },
    ],
  },
  {
    tag: 'html-parsing',
    format: 'steps',
    summary: {
      ru: 'HTML-парсер никогда не падает с ошибкой: на любую разметку у него есть правило. Поэтому DOM часто отличается от исходного текста — и знание этих правил объясняет «пропавшие» абзацы, лишние `tbody` и странных родителей.',
      en: 'The HTML parser never fails: it has a rule for any markup. That’s why the DOM often differs from the source text — and knowing these rules explains “vanished” paragraphs, extra `tbody` elements and strange parents.',
    },
    steps: [
      {
        id: 'implicit-tags',
        title: { ru: 'Неявные закрытия', en: 'Implied end tags' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Парсер не бросает ошибок, а исправляет разметку по стандарту. Некоторые закрывающие теги можно опускать: новый `<li>` или конец списка сам закрывает предыдущий пункт, поэтому три `<li>` без `</li>` — три соседних элемента, а не лесенка. Блочный элемент внутри `<p>` закрывает абзац: `<p>a<div>b</div>c</p>` превращается в два абзаца и `<div>` между ними. Проверять стоит итоговый DOM в инструментах разработчика, а не исходник.',
              en: 'The parser doesn’t throw errors; it fixes markup according to the spec. Some end tags may be omitted: a new `<li>` or the end of the list closes the previous item, so three `<li>` without `</li>` are three siblings, not a staircase. A block element inside `<p>` closes the paragraph: `<p>a<div>b</div>c</p>` becomes two paragraphs with a `<div>` between them. Check the resulting DOM in dev tools, not the source.',
            },
          },
          { type: 'diagram', diagram: 'html-parse-p-div' },
        ],
        test: ['html-parsing-001', 'html-parsing-002'],
      },
      {
        id: 'void-elements',
        title: { ru: 'Слеш ничего не закрывает', en: 'The slash closes nothing' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В HTML слеш в `<div />` игнорируется: это обычный открывающий `<div>`, и всё следующее попадёт внутрь него. «Самозакрываются» только пустые (void) элементы — `br`, `img`, `input`, `meta`, `link`, `hr`: у них вообще нет содержимого и закрывающего тега. Привычка из JSX и XML здесь подводит. Ещё одно правило: если атрибут в теге повторяется, парсер оставляет **первый**, остальные молча отбрасывает.',
              en: 'In HTML the slash in `<div />` is ignored: it’s an ordinary opening `<div>`, and everything after it goes inside. Only void elements “self-close” — `br`, `img`, `input`, `meta`, `link`, `hr`: they have no content and no end tag at all. A habit from JSX and XML misleads here. One more rule: if an attribute repeats in a tag, the parser keeps the **first** and silently drops the rest.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<div class="icon" />\n<span>Hello</span>\n<!-- span ends up inside div -->',
            },
          },
        ],
        test: ['html-parsing-003'],
      },
      {
        id: 'tables',
        title: { ru: 'Таблицы', en: 'Tables' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Строки таблицы по стандарту живут в секции, поэтому парсер сам вставляет пропущенный `<tbody>`: первым ребёнком `<table>` окажется он, а селектор `table > tr` ничего не найдёт. Внутри `<table>` допустима только табличная разметка. Встретив там `<div>`, парсер не выбрасывает его, а применяет **foster parenting** — переносит элемент **перед** таблицей. Так «Загрузка…» внутри таблицы внезапно оказывается над ней.',
              en: 'By the spec, table rows live in a section, so the parser inserts a missing `<tbody>` itself: it becomes the first child of `<table>`, and the `table > tr` selector finds nothing. Only table markup is allowed inside `<table>`. When it meets a `<div>` there, the parser doesn’t drop it but applies **foster parenting** — it moves the element **before** the table. That’s how a “Loading…” inside a table suddenly appears above it.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'table-tr-selector',
              prompt: {
                ru: 'В разметке `<table><tr>…</tr></table>`. Найдёт ли что-то `table > tr`?',
                en: 'The markup is `<table><tr>…</tr></table>`. Will `table > tr` find anything?',
              },
              options: [
                { text: { ru: 'Да, строка — ребёнок таблицы', en: 'Yes, the row is a child of the table' } },
                { text: { ru: 'Нет: между ними парсер вставил `tbody`', en: 'No: the parser inserted a `tbody` between them' } },
                { text: { ru: 'Нет: строка без `tbody` выбрасывается', en: 'No: a row without `tbody` is dropped' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Строка цела, но её родитель — автоматически вставленный `<tbody>`. Работает `table tr` или `table > tbody > tr`.',
                en: 'The row is fine, but its parent is the auto-inserted `<tbody>`. Use `table tr` or `table > tbody > tr`.',
              },
            },
          },
        ],
        test: ['html-parsing-009', 'html-parsing-005'],
      },
      {
        id: 'nesting',
        title: { ru: 'Запрещённая вложенность и сущности', en: 'Forbidden nesting and entities' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ссылки нельзя вкладывать друг в друга. Встретив второй `<a>` внутри первого, парсер сначала **закрывает** первый — получаются две соседние ссылки. Так же ведут себя вложенные `<form>` и кнопки. Символьные ссылки раскрываются при разборе: `&lt;` становится `<`, `&amp;` — `&`. Поэтому `&lt;b&gt;` в тексте — это буквальные символы `<b>`, а не тег, а `&amp;copy;` превращается в текст `&copy;`, а не в знак ©.',
              en: 'Links can’t be nested. When a second `<a>` appears inside the first, the parser **closes** the first one — you get two sibling links. Nested `<form>` elements and buttons behave the same way. Character references are decoded during parsing: `&lt;` becomes `<`, `&amp;` becomes `&`. So `&lt;b&gt;` in text is literal `<b>` characters, not a tag, and `&amp;copy;` turns into the text `&copy;`, not the © sign.',
            },
          },
        ],
        test: ['html-parsing-007'],
      },
      {
        id: 'template',
        title: { ru: 'Шаблон template', en: 'The template element' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Содержимое `<template>` разбирается, но **не попадает в документ**: оно лежит в отдельном фрагменте `template.content`. Его не видит `document.querySelectorAll`, не грузятся картинки, не выполняются скрипты. Чтобы показать шаблон, фрагмент клонируют и вставляют в страницу. Искать элементы внутри шаблона нужно в самом фрагменте.',
              en: 'The content of `<template>` is parsed but **doesn’t enter the document**: it lives in a separate fragment, `template.content`. `document.querySelectorAll` doesn’t see it, images don’t load, scripts don’t run. To show the template, you clone the fragment and insert it into the page. Elements inside a template are queried on the fragment itself.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const tpl = document\n  .querySelector('#row');\ntpl.content.querySelectorAll('li');\n// → found in the fragment\nconst copy =\n  tpl.content.cloneNode(true);\nlist.append(copy);",
            },
          },
        ],
        test: ['html-parsing-010'],
      },
      {
        id: 'doctype',
        title: { ru: 'DOCTYPE и режим совместимости', en: 'DOCTYPE and quirks mode' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`<!DOCTYPE html>` в первой строке включает **стандартный режим**. Без него браузер переходит в режим совместимости (quirks mode) и эмулирует ошибки старых браузеров: иначе считаются размеры блоков, высота строк в таблицах, наследование шрифтов в них. Вёрстка «ломается» без видимой причины. Поэтому DOCTYPE — обязательная первая строка любого документа.',
              en: '`<!DOCTYPE html>` on the first line turns on **standards mode**. Without it the browser switches to quirks mode and emulates old browsers’ bugs: box sizes, line heights in tables and font inheritance in them are computed differently. The layout “breaks” for no visible reason. That’s why the DOCTYPE is the mandatory first line of any document.',
            },
          },
        ],
        test: ['html-parsing-004'],
      },
    ],
    keyPoints: [
      { ru: 'Парсер не падает — он исправляет разметку по правилам.', en: 'The parser doesn’t fail — it fixes markup by the rules.' },
      { ru: 'Блок внутри `<p>` закрывает абзац, `<div />` — не закрыт.', en: 'A block inside `<p>` closes it; `<div />` isn’t closed.' },
      { ru: 'В таблице сам появляется `tbody`, чужие теги уезжают наверх.', en: 'Tables get an implicit `tbody`; foreign tags move above.' },
      { ru: '`<template>` разбирается, но не попадает в документ.', en: '`<template>` is parsed but stays out of the document.' },
      { ru: 'Без DOCTYPE — режим совместимости.', en: 'No DOCTYPE means quirks mode.' },
    ],
    sources: [
      { title: 'WHATWG — Parsing HTML documents', url: 'https://html.spec.whatwg.org/multipage/parsing.html' },
      { title: 'MDN — Void element', url: `${MDN}/Glossary/Void_element` },
      { title: 'MDN — <template>', url: `${MDN}/Web/HTML/Reference/Elements/template` },
      { title: 'MDN — Quirks mode and standards mode', url: `${MDN}/Web/HTML/Guides/Quirks_mode_and_standards_mode` },
    ],
  },
  {
    tag: 'html-forms',
    format: 'steps',
    summary: {
      ru: 'Форма умеет многое без JavaScript: отправку, подписи, проверку значений. Но у неё есть правила, о которых спотыкаются чаще всего: какая кнопка отправляет, что попадает в данные и почему `value` всегда строка.',
      en: 'A form does a lot without JavaScript: submission, labels, value checks. But it has rules people trip over most: which button submits, what ends up in the data and why `value` is always a string.',
    },
    steps: [
      {
        id: 'button-type',
        title: { ru: 'Какая кнопка отправляет', en: 'Which button submits' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'У `<button>` без атрибута `type` значение по умолчанию — `submit`: внутри формы нажатие отправит её и перезагрузит страницу. Для кнопок-действий — очистить, показать пароль, открыть подсказку — пишут `type="button"`. Кнопка не обязана лежать внутри формы: атрибут `form="id"` связывает поле или кнопку с формой по id, где бы они ни стояли в разметке, — например, «Оплатить» в липкой панели внизу.',
              en: 'A `<button>` without a `type` attribute defaults to `submit`: inside a form, clicking it submits the form and reloads the page. Action buttons — clear, show password, open a hint — get `type="button"`. A button doesn’t have to sit inside the form: the `form="id"` attribute links a field or button to a form by id wherever it is in the markup — say, “Pay” in a sticky bottom bar.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<form id="checkout">…</form>\n<footer>\n  <button form="checkout">Pay</button>\n</footer>',
            },
          },
        ],
        test: ['html-forms-001'],
      },
      {
        id: 'label',
        title: { ru: 'Подпись поля', en: 'Labeling a field' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Подпись связывают с полем через `<label for="email">` и `<input id="email">` или оборачивают поле в `<label>`. Связанный `<label>` даёт полю [[accessible-name|доступное имя]] — диктор прочитает «Email, поле ввода», — а клик по тексту фокусирует поле, что увеличивает цель касания. Соседний `<span>` или `<div>` визуально похож, но для браузера ничем не связан с полем.',
              en: 'A label is tied to a field with `<label for="email">` and `<input id="email">`, or by wrapping the field in `<label>`. A linked `<label>` gives the field an [[accessible-name|accessible name]] — the screen reader says “Email, edit text” — and clicking the text focuses the field, enlarging the tap target. A neighboring `<span>` or `<div>` looks similar but isn’t connected to the field in any way.',
            },
          },
        ],
        test: ['html-forms-004'],
      },
      {
        id: 'form-data',
        title: { ru: 'Что попадёт в данные', en: 'What gets submitted' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В данные формы и в `new FormData(form)` попадают только поля с атрибутом `name`. Поле с `disabled` не отправляется вовсе — его нельзя ни изменить, ни сфокусировать. `readonly` запрещает только редактирование: значение отправится, фокус работает. Поэтому, если поле нужно показать, не давать менять и всё же отправить, берут `readonly`, а не `disabled`.',
              en: 'Only fields with a `name` attribute end up in the form data and in `new FormData(form)`. A `disabled` field isn’t sent at all — it can’t be edited or focused. `readonly` forbids only editing: the value is sent and focus works. So if a field must be shown, locked and still submitted, use `readonly`, not `disabled`.',
            },
          },
          {
            type: 'illustration',
            illustration: 'html-formdata',
          },
        ],
        test: ['html-forms-002'],
      },
      {
        id: 'checkboxes',
        title: { ru: 'Чекбоксы и группы', en: 'Checkboxes and groups' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Неотмеченный чекбокс в данные **не попадает вовсе**: сервер увидит не `false`, а отсутствие поля, поэтому «нет» на сервере — значение по умолчанию. Отмеченный чекбокс без `value` отправляет строку `"on"`. Несколько полей с одним `name` дают несколько значений одного ключа — так отправляют группы чекбоксов и `<select multiple>`. `formData.get(\'tags\')` вернёт только первое значение, все — `getAll(\'tags\')`.',
              en: 'An unchecked checkbox **isn’t sent at all**: the server sees not `false` but a missing field, so “no” is the server-side default. A checked checkbox without a `value` sends the string `"on"`. Several fields with the same `name` give several values for one key — that’s how checkbox groups and `<select multiple>` are sent. `formData.get(\'tags\')` returns only the first value, `getAll(\'tags\')` all of them.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'unchecked-checkbox',
              prompt: {
                ru: 'Чекбокс `name="news"` не отмечен. Что получит сервер?',
                en: 'The `name="news"` checkbox is unchecked. What does the server receive?',
              },
              options: [
                { text: { ru: '`news=false`', en: '`news=false`' } },
                { text: { ru: '`news=` с пустым значением', en: '`news=` with an empty value' } },
                { text: { ru: 'Ничего: поля `news` в данных нет', en: 'Nothing: there’s no `news` field in the data' } },
              ],
              answer: 2,
              explanation: {
                ru: 'Неотмеченные чекбоксы и радиокнопки не участвуют в отправке. Сервер проверяет наличие поля, а не его значение.',
                en: 'Unchecked checkboxes and radios don’t take part in submission. The server checks whether the field is present, not its value.',
              },
            },
          },
        ],
        test: ['html-forms-013', 'html-forms-010'],
      },
      {
        id: 'values',
        title: { ru: 'value — всегда строка', en: '`value` is always a string' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`input.value` у любого поля — **строка**, даже при `type="number"`: `\'42\' + 1` даст `\'421\'`. Число берут через `input.valueAsNumber` (для пустого поля — `NaN`) или `Number(input.value)`. `type="number"` к тому же очищает некорректное значение: из `12px` получится пустая строка. А `maxlength` ограничивает только **ввод пользователя** — значение из атрибута или из кода не обрезается.',
              en: '`input.value` of any field is a **string**, even with `type="number"`: `\'42\' + 1` gives `\'421\'`. Get a number via `input.valueAsNumber` (`NaN` for an empty field) or `Number(input.value)`. `type="number"` also clears an invalid value: `12px` becomes an empty string. And `maxlength` limits only **user input** — a value from the attribute or from code isn’t truncated.',
            },
          },
        ],
        test: ['html-forms-005'],
      },
      {
        id: 'validation',
        title: { ru: 'Встроенная проверка', en: 'Built-in validation' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ограничения полей проверяет сам браузер: `required`, `type="email"`, `min`, `max`, `pattern`. «abc» в поле `type="email"` — не адрес, и `checkValidity()` вернёт `false`; пустое необязательное поле при этом валидно. `pattern` проверяет **всё** значение — выражение неявно обёрнуто в `^(?:…)$`. Каждое нарушение видно в своём флаге: `validity.patternMismatch`, `valueMissing`, `typeMismatch`. `novalidate` отключает только проверку при отправке, а сами ограничения остаются.',
              en: 'The browser checks field constraints itself: `required`, `type="email"`, `min`, `max`, `pattern`. “abc” in a `type="email"` field isn’t an address, so `checkValidity()` returns `false`; an empty optional field is valid. `pattern` checks the **whole** value — the expression is implicitly wrapped in `^(?:…)$`. Each violation shows up in its own flag: `validity.patternMismatch`, `valueMissing`, `typeMismatch`. `novalidate` only disables the check on submit; the constraints themselves remain.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<input pattern="[0-9]{3}" value="12a">\n<!-- validity.patternMismatch: true -->',
            },
          },
        ],
        test: ['html-forms-003', 'html-forms-009'],
      },
    ],
    keyPoints: [
      { ru: '`<button>` без `type` — это `submit`.', en: 'A `<button>` without `type` is `submit`.' },
      { ru: 'Подпись — `<label for>`, а не соседний текст.', en: 'A label is `<label for>`, not nearby text.' },
      { ru: 'В данных только поля с `name`; `disabled` не отправляется.', en: 'Only named fields are sent; `disabled` isn’t.' },
      { ru: 'Неотмеченный чекбокс в данные не попадает.', en: 'An unchecked checkbox isn’t submitted.' },
      { ru: '`value` — строка, число — через `valueAsNumber`.', en: '`value` is a string; numbers come from `valueAsNumber`.' },
    ],
    sources: [
      { title: 'MDN — <button>', url: `${MDN}/Web/HTML/Reference/Elements/button` },
      { title: 'MDN — <label>', url: `${MDN}/Web/HTML/Reference/Elements/label` },
      { title: 'MDN — FormData', url: `${MDN}/Web/API/FormData` },
      { title: 'MDN — Client-side form validation', url: `${MDN}/Learn_web_development/Extensions/Forms/Form_validation` },
    ],
  },
  {
    tag: 'a11y-names',
    format: 'steps',
    summary: {
      ru: 'Доступное имя — то, что диктор произносит вместо «кнопка» или «поле»: «Сохранить, кнопка». Браузер вычисляет его по строгому порядку источников, и если имени нет, элемент для пользователя диктора безымянный.',
      en: 'The accessible name is what a screen reader says along with “button” or “field”: “Save, button”. The browser computes it from sources in a strict order, and without a name the element is anonymous to a screen reader user.',
    },
    steps: [
      {
        id: 'from-content',
        title: { ru: 'Имя из содержимого', en: 'A name from content' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '[[accessible-name|Доступное имя]] у кнопки или ссылки обычно берётся из содержимого: текста и `alt` картинок внутри, склеенных по порядку. Ссылка с логотипом `alt="Sobes"` и текстом «Home» получит имя «Sobes Home». Если картинка лишь дублирует соседний текст, ей ставят `alt=""` — пустой `alt` помечает её декоративной, и диктор её пропустит. Отсутствующий `alt` хуже пустого: некоторые дикторы зачитают имя файла.',
              en: 'The [[accessible-name|accessible name]] of a button or link usually comes from its content: the text and the `alt` of images inside, joined in order. A link with an `alt="Sobes"` logo and the text “Home” gets the name “Sobes Home”. If an image only repeats nearby text, it gets `alt=""` — an empty `alt` marks it decorative, and the screen reader skips it. A missing `alt` is worse than an empty one: some screen readers read out the file name.',
            },
          },
        ],
        test: ['html-a11y-names-007'],
      },
      {
        id: 'priority',
        title: { ru: 'Порядок источников', en: 'The order of sources' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Источники имени проверяются по приоритету. Выше всех `aria-labelledby` — имя берётся из текста элементов по указанным id. Затем `aria-label`. Дальше нативные источники: `<label>`, `alt`, `<legend>` или содержимое. В самом конце запасные `title` и `placeholder`. Поэтому `<button aria-label="Close">Cancel</button>` диктор назовёт «Close»: на экране одно, в ушах другое, и голосовое управление «нажми Cancel» не сработает. Лучше, чтобы видимый текст входил в имя.',
              en: 'Name sources are checked by priority. Top is `aria-labelledby` — the name comes from the text of the elements with the given ids. Then `aria-label`. Next, native sources: `<label>`, `alt`, `<legend>` or content. Last, the fallbacks `title` and `placeholder`. So the screen reader calls `<button aria-label="Close">Cancel</button>` “Close”: one thing on screen, another in the ears, and the voice command “click Cancel” fails. Prefer names that include the visible text.',
            },
          },
          {
            type: 'illustration',
            illustration: 'a11y-name-priority',
            caption: { ru: 'Побеждает первый найденный источник сверху', en: 'The first source found from the top wins' },
          },
          {
            type: 'check',
            check: {
              id: 'label-vs-aria-label',
              prompt: {
                ru: 'У поля есть `<label>` «Телефон» и `aria-label="Номер"`. Что скажет диктор?',
                en: 'A field has a `<label>` “Phone” and `aria-label="Number"`. What will the screen reader say?',
              },
              options: [
                { text: { ru: '«Телефон»', en: '“Phone”' } },
                { text: { ru: '«Номер»', en: '“Number”' } },
                { text: { ru: '«Телефон Номер»', en: '“Phone Number”' } },
              ],
              answer: 1,
              explanation: {
                ru: '`aria-label` стоит в расчёте выше `<label>` и перекрывает его. Отсюда правило: не вешать `aria-label` на поле с видимой подписью.',
                en: '`aria-label` ranks above `<label>` and overrides it. Hence the rule: don’t put `aria-label` on a field that has a visible label.',
              },
            },
          },
        ],
        test: ['html-a11y-names-001', 'html-a11y-names-002'],
      },
      {
        id: 'fields',
        title: { ru: 'Подписи полей', en: 'Field labels' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Поле внутри `<label>` связано с ним неявно и получает имя из текста подписи. `placeholder` подписью не считается: он исчезает, как только человек начинает печатать, — непонятно, что за поле, особенно при ошибке. Цвет подсказки часто не проходит по контрасту, а как имя `placeholder` используют не все технологии — только как запасной вариант, когда подписи нет совсем.',
              en: 'A field inside a `<label>` is implicitly linked and gets its name from the label text. A `placeholder` doesn’t count as a label: it disappears as soon as the person starts typing — it’s unclear what the field is, especially on an error. Placeholder color often fails contrast, and not all technologies use `placeholder` as a name — only as a fallback when there’s no label at all.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<label>\n  Email\n  <input type="email"\n    placeholder="you@example.com">\n</label>',
            },
            caption: { ru: 'Имя поля — «Email», подсказка лишь пример', en: 'The field’s name is “Email”; the placeholder is just an example' },
          },
        ],
        test: ['html-a11y-names-003', 'html-a11y-names-005'],
      },
      {
        id: 'icon-only',
        title: { ru: 'Кнопки и ссылки из иконок', en: 'Icon-only buttons and links' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ссылка, внутри которой только SVG, не имеет имени: часть дикторов зачитает адрес, часть скажет просто «ссылка» — куда она ведёт, непонятно. Имя дают через `aria-label="Корзина"` или скрытый визуально текст. Популярный приём: значок `×` прячут от дикторов через `aria-hidden="true"`, а рядом кладут текст «Close» с классом `visually-hidden` — он не виден, но остаётся в дереве доступности. Не через `display: none`: такой текст пропадёт и для диктора.',
              en: 'A link containing only an SVG has no name: some screen readers read the URL, some just say “link” — where it leads is unclear. Give it a name with `aria-label="Cart"` or visually hidden text. A popular trick: hide the `×` glyph from screen readers with `aria-hidden="true"` and put the text “Close” next to it with a `visually-hidden` class — invisible but still in the accessibility tree. Not via `display: none`: that text disappears for the screen reader too.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<button>\n  <span aria-hidden="true">×</span>\n  <span class="visually-hidden">\n    Close\n  </span>\n</button>',
            },
          },
        ],
        test: ['html-a11y-names-004', 'html-a11y-names-008'],
      },
      {
        id: 'groups',
        title: { ru: 'Группы и составные имена', en: 'Groups and composite names' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`<fieldset>` получает роль `group`, а `<legend>` даёт ей имя. Попав на первую радиокнопку, диктор объявит «Доставка, группа», а потом «Курьер, переключатель» — без группы человек услышит «Курьер» и не поймёт, к чему вопрос. `aria-labelledby` принимает **список** id и склеивает их тексты через пробел в указанном порядке. Ссылка на сам элемент берёт его содержимое: так кнопка «Delete» рядом с файлом становится «Delete report.pdf».',
              en: '`<fieldset>` gets the `group` role, and `<legend>` gives it a name. On the first radio button the screen reader announces “Delivery, group”, then “Courier, radio button” — without the group a person hears “Courier” and doesn’t know what the question is. `aria-labelledby` takes a **list** of ids and joins their texts with spaces in that order. Referencing the element itself uses its content: that’s how a “Delete” button next to a file becomes “Delete report.pdf”.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<span id="file">report.pdf</span>\n<button id="remove"\n  aria-labelledby="remove file">\n  Delete\n</button>',
            },
          },
        ],
        test: ['html-a11y-names-011'],
      },
    ],
    keyPoints: [
      { ru: 'Имя кнопки и ссылки — из содержимого и `alt`.', en: 'Button and link names come from content and `alt`.' },
      { ru: 'Порядок: `aria-labelledby` → `aria-label` → `label`/содержимое → `title`.', en: 'Order: `aria-labelledby` → `aria-label` → `label`/content → `title`.' },
      { ru: '`placeholder` — не подпись.', en: 'A `placeholder` isn’t a label.' },
      { ru: 'Кнопке-иконке нужно имя: `aria-label` или скрытый текст.', en: 'An icon button needs a name: `aria-label` or hidden text.' },
      { ru: '`fieldset` + `legend` — имя для группы полей.', en: '`fieldset` + `legend` name a group of fields.' },
    ],
    sources: [
      { title: 'MDN — Accessible name', url: `${MDN}/Glossary/Accessible_name` },
      { title: 'W3C APG — Providing Accessible Names and Descriptions', url: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/' },
      { title: 'W3C — Accessible Name and Description Computation', url: 'https://www.w3.org/TR/accname-1.2/' },
      { title: 'MDN — <fieldset>', url: `${MDN}/Web/HTML/Reference/Elements/fieldset` },
    ],
  },
  {
    tag: 'a11y-aria',
    format: 'steps',
    summary: {
      ru: 'ARIA меняет только то, как элемент объявляется диктору, — поведения она не добавляет. Поэтому лучшая ARIA та, которой нет: нативный элемент уже умеет всё сам, а атрибуты нужны там, где HTML не хватает.',
      en: 'ARIA changes only how an element is announced to a screen reader — it adds no behavior. So the best ARIA is no ARIA: a native element already does it all, and attributes are for where HTML falls short.',
    },
    steps: [
      {
        id: 'first-rule',
        title: { ru: 'Первое правило ARIA', en: 'The first rule of ARIA' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '**Первое правило ARIA**: если есть нативный элемент с нужной семантикой и поведением, используйте его. `<div role="button">` диктор объявит кнопкой, но и только: `tabIndex` у такого `div` равен -1 — табом до него не дойти, Enter и пробел его не нажмут, в форме он не работает. Чтобы это починить, нужны `tabindex="0"`, обработчики клавиш и стили фокуса. `<button type="button">` даёт всё это из коробки.',
              en: '**The first rule of ARIA**: if a native element has the semantics and behavior you need, use it. A screen reader announces `<div role="button">` as a button, and that’s all: its `tabIndex` is -1 — Tab can’t reach it, Enter and Space don’t press it, it doesn’t work in forms. Fixing that takes `tabindex="0"`, key handlers and focus styles. `<button type="button">` gives you all of it out of the box.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'role-adds-behavior',
              prompt: {
                ru: 'Что добавляет `role="button"` на `<div>`?',
                en: 'What does `role="button"` add to a `<div>`?',
              },
              options: [
                { text: { ru: 'Фокус по Tab и нажатие Enter', en: 'Tab focus and Enter activation' } },
                { text: { ru: 'Только объявление «кнопка» для диктора', en: 'Only the “button” announcement for screen readers' } },
                { text: { ru: 'Отправку формы', en: 'Form submission' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Роль влияет лишь на дерево доступности. Фокус, клавиши и участие в форме нужно дописывать самим — или взять нативный `<button>`.',
                en: 'A role only affects the accessibility tree. Focus, keys and form participation have to be added by hand — or just use a native `<button>`.',
              },
            },
          },
        ],
        test: ['html-a11y-aria-001', 'html-a11y-aria-002'],
      },
      {
        id: 'aria-hidden',
        title: { ru: 'aria-hidden и фокус', en: 'aria-hidden and focus' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`aria-hidden="true"` убирает элементы только из [[accessibility-tree|дерева доступности]], но **не** из порядка табуляции. Если спрятать так страницу под модальным окном, Tab всё равно уведёт фокус на её ссылки — и диктор замолчит или прочитает непонятное. Атрибут `inert` делает поддерево недоступным целиком: ни клика, ни фокуса, ни диктора. А `dialog.showModal()` сам делает фон инертным.',
              en: '`aria-hidden="true"` removes elements only from the [[accessibility-tree|accessibility tree]], **not** from the tab order. Hide the page under a modal this way, and Tab still moves focus onto its links — the screen reader goes silent or reads something confusing. The `inert` attribute disables a subtree entirely: no clicks, no focus, no screen reader. And `dialog.showModal()` makes the background inert by itself.',
            },
          },
          {
            type: 'illustration',
            illustration: 'a11y-hidden-vs-inert',
          },
        ],
        test: ['html-a11y-aria-003'],
      },
      {
        id: 'live-regions',
        title: { ru: 'Live-регионы', en: 'Live regions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Сообщение «Сохранено» появилось на экране, но диктор о нём не знает: фокус остался на кнопке. **Live-регион** объявляет изменения своего содержимого без перевода фокуса. `role="status"` (он же `aria-live="polite"`) дождётся паузы — для подтверждений. `role="alert"` перебивает сразу — для ошибок. Важно: контейнер должен быть на странице **заранее**, а меняется только его текст, — регион, добавленный вместе с сообщением, часто не объявляется.',
              en: 'A “Saved” message appeared on screen, but the screen reader doesn’t know: focus stayed on the button. A **live region** announces changes to its content without moving focus. `role="status"` (same as `aria-live="polite"`) waits for a pause — for confirmations. `role="alert"` interrupts at once — for errors. Key point: the container must be on the page **in advance**, and only its text changes — a region added together with the message often isn’t announced.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<div role="status"></div>',
            },
            caption: {
              ru: 'Контейнер есть сразу, потом скрипт меняет только текст: `box.textContent = \'Saved\'`',
              en: 'The container exists up front; later a script changes only its text: `box.textContent = \'Saved\'`',
            },
          },
        ],
        test: ['html-a11y-aria-004'],
      },
      {
        id: 'states',
        title: { ru: 'Роли и состояния', en: 'Roles and states' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Иногда ARIA уточняет нативный элемент — и это правильно. `<input type="checkbox" role="switch">` диктор объявит «переключатель, включено», а клавиатура, фокус и отправка формы останутся нативными. Состояния тоже различаются: `disabled` выключает кнопку целиком — она пропадает из порядка Tab, и пользователь клавиатуры может не узнать о ней. `aria-disabled="true"` только объявляет недоступность: фокус остаётся, а нажатие блокируют в обработчике и могут объяснить, почему кнопка неактивна.',
              en: 'Sometimes ARIA refines a native element — and that’s right. A screen reader announces `<input type="checkbox" role="switch">` as “switch, on”, while keyboard, focus and form submission stay native. States differ too: `disabled` turns a button off entirely — it leaves the tab order, and a keyboard user may never learn it exists. `aria-disabled="true"` only announces unavailability: focus stays, the click is blocked in the handler, and you can explain why the button is inactive.',
            },
          },
        ],
        test: ['html-a11y-aria-005'],
      },
    ],
    keyPoints: [
      { ru: 'Сначала нативный элемент, ARIA — когда HTML не хватает.', en: 'Native element first; ARIA when HTML falls short.' },
      { ru: 'Роль не добавляет фокус и клавиши.', en: 'A role adds no focus or keys.' },
      { ru: '`aria-hidden` не убирает из Tab, `inert` — убирает.', en: '`aria-hidden` keeps Tab access; `inert` removes it.' },
      { ru: 'Live-регион ставят заранее, меняют только текст.', en: 'Put a live region in place first; change only its text.' },
      { ru: '`aria-disabled` оставляет фокус, `disabled` — нет.', en: '`aria-disabled` keeps focus; `disabled` doesn’t.' },
    ],
    sources: [
      { title: 'W3C — Using ARIA', url: 'https://www.w3.org/TR/using-aria/' },
      { title: 'MDN — ARIA: button role', url: `${MDN}/Web/Accessibility/ARIA/Reference/Roles/button_role` },
      { title: 'MDN — aria-hidden', url: `${MDN}/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden` },
      { title: 'MDN — ARIA live regions', url: `${MDN}/Web/Accessibility/ARIA/Guides/Live_regions` },
    ],
  },
  {
    tag: 'a11y-keyboard',
    format: 'steps',
    summary: {
      ru: 'Всё, что можно сделать мышью, должно делаться с клавиатуры: Tab, Enter, пробел, Esc. Нативные элементы умеют это сами, а ломается клавиатура обычно на самодельных контролах, модалках и спрятанном фокусе.',
      en: 'Everything doable with a mouse must be doable from the keyboard: Tab, Enter, Space, Esc. Native elements handle this themselves; keyboard access usually breaks on homemade controls, modals and hidden focus.',
    },
    steps: [
      {
        id: 'tab-order',
        title: { ru: 'Порядок Tab и tabindex', en: 'Tab order and tabindex' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Tab обходит фокусируемые элементы в порядке DOM. `tabindex="0"` добавляет в этот порядок элемент, который сам не фокусируется. `tabindex="-1"` убирает элемент из обхода, но позволяет фокусировать его из кода через `focus()` — так переводят фокус на заголовок модалки или блок с ошибкой. Положительный `tabindex` ставит элемент **раньше всех** остальных, по возрастанию числа, — порядок фокуса расходится с экраном, поэтому его не используют.',
              en: 'Tab walks focusable elements in DOM order. `tabindex="0"` adds an element that isn’t focusable by itself to that order. `tabindex="-1"` removes an element from the tab sequence but lets code focus it with `focus()` — that’s how focus moves to a modal’s heading or an error block. A positive `tabindex` puts an element **before all** others, in ascending order — focus order drifts from the screen, so it isn’t used.',
            },
          },
          { type: 'diagram', diagram: 'a11y-tab-order' },
        ],
        test: ['html-a11y-keyboard-001'],
      },
      {
        id: 'focus-visible',
        title: { ru: 'Рамка фокуса', en: 'The focus ring' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Рамка фокуса — единственный способ понять, где ты, когда работаешь с клавиатуры. `outline: none` без замены делает интерфейс непроходимым. Если дизайнеру мешает рамка при клике мышью, её убирают у `:focus`, но показывают у `:focus-visible`: этот псевдокласс срабатывает, когда браузер считает индикатор нужным, — обычно при навигации с клавиатуры, а не при клике.',
              en: 'The focus ring is the only way to tell where you are when using a keyboard. `outline: none` without a replacement makes the interface unusable. If the designer dislikes the ring on mouse clicks, remove it from `:focus` but show it on `:focus-visible`: that pseudo-class fires when the browser deems an indicator necessary — usually during keyboard navigation, not on click.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'css',
              source: 'button:focus {\n  outline: none;\n}\nbutton:focus-visible {\n  outline: 2px solid currentColor;\n}',
            },
          },
          {
            type: 'check',
            check: {
              id: 'outline-none',
              prompt: {
                ru: 'Что будет, если написать `*:focus { outline: none }` и ничего не добавить?',
                en: 'What happens if you write `*:focus { outline: none }` and add nothing else?',
              },
              options: [
                { text: { ru: 'Ничего страшного — фокус всё равно работает', en: 'Nothing bad — focus still works' } },
                { text: { ru: 'Пользователь клавиатуры не увидит, где фокус', en: 'Keyboard users won’t see where focus is' } },
                { text: { ru: 'Элементы перестанут получать фокус', en: 'Elements will stop receiving focus' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Фокус по-прежнему перемещается, но его не видно — работать с клавиатуры становится невозможно. Индикатор нужно заменить, например стилем `:focus-visible`.',
                en: 'Focus still moves but is invisible — keyboard use becomes impossible. Replace the indicator, for example with a `:focus-visible` style.',
              },
            },
          },
        ],
        test: ['html-a11y-keyboard-003'],
      },
      {
        id: 'native-controls',
        title: { ru: 'Нативные элементы работают сами', en: 'Native elements just work' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Ссылка без `href` — не ссылка: она не получает фокус ни с клавиатуры, ни из кода, Enter её не откроет, даже если на ней висит обработчик клика. `<details>` и `<summary>` — готовый раскрывающийся блок без JavaScript: он работает с клавиатуры (Enter и пробел), диктор объявляет «свёрнуто» или «развёрнуто», клик меняет `details.open`, а поиск по странице находит текст даже в свёрнутом блоке.',
              en: 'A link without `href` isn’t a link: it gets no focus from the keyboard or from code, Enter won’t open it, even with a click handler attached. `<details>` and `<summary>` are a ready disclosure widget without JavaScript: it works from the keyboard (Enter and Space), the screen reader announces “collapsed” or “expanded”, a click toggles `details.open`, and find-in-page locates text even in a collapsed block.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<details>\n  <summary>Delivery terms</summary>\n  <p>2–3 days across the city.</p>\n</details>',
            },
          },
        ],
        test: ['html-a11y-keyboard-008', 'html-a11y-keyboard-007'],
      },
      {
        id: 'skip-link',
        title: { ru: 'Ссылка «к содержимому»', en: 'The skip link' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Первой ссылкой на странице ставят «Перейти к основному содержимому» — **skip link**. Она ведёт на `<main id="main">` и избавляет пользователей клавиатуры и дикторов от прохода Tab по всему меню на каждой странице. Обычно её прячут визуально и показывают при фокусе. Но не через `display: none` или `hidden` — тогда она пропадёт и для клавиатуры.',
              en: 'The first link on a page is “Skip to main content” — a **skip link**. It points to `<main id="main">` and spares keyboard and screen reader users from tabbing through the whole menu on every page. It’s usually hidden visually and shown on focus. But not with `display: none` or `hidden` — then it disappears for the keyboard too.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'html',
              source: '<a class="skip-link" href="#main">\n  Skip to content\n</a>\n…\n<main id="main">…</main>',
            },
          },
        ],
        test: ['html-a11y-keyboard-004'],
      },
      {
        id: 'modals',
        title: { ru: 'Модальные окна', en: 'Modal dialogs' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Самодельная модалка из `<div>` — источник клавиатурных багов: фокус уходит на страницу под ней, Esc не закрывает окно. `dialog.showModal()` решает всё сразу: выводит окно в **top layer** поверх всего, делает остальную страницу инертной, ставит фокус внутрь и закрывает по Esc. Для своих случаев есть атрибут `inert`: поддерево с ним недоступно целиком — на элементы нельзя кликнуть, их не видит диктор и их нельзя сфокусировать даже через `focus()`.',
              en: 'A homemade `<div>` modal breeds keyboard bugs: focus escapes to the page underneath, Esc doesn’t close it. `dialog.showModal()` fixes it all at once: it renders the dialog in the **top layer** above everything, makes the rest of the page inert, moves focus inside and closes on Esc. For custom cases there’s the `inert` attribute: a subtree with it is fully unavailable — no clicks, invisible to screen readers, and not focusable even via `focus()`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'js',
              source: "const dialog =\n  document.querySelector('dialog');\nopenButton.onclick = () =>\n  dialog.showModal();",
            },
          },
        ],
        test: ['html-a11y-keyboard-006'],
      },
    ],
    keyPoints: [
      { ru: 'Tab идёт по DOM; положительный `tabindex` ломает порядок.', en: 'Tab follows the DOM; a positive `tabindex` breaks the order.' },
      { ru: '`tabindex="-1"` — фокус только из кода.', en: '`tabindex="-1"` means focus from code only.' },
      { ru: 'Рамку фокуса заменяют через `:focus-visible`, а не убирают.', en: 'Replace the focus ring via `:focus-visible`, don’t remove it.' },
      { ru: 'Ссылка без `href` не фокусируется.', en: 'A link without `href` isn’t focusable.' },
      { ru: 'Модалка — `dialog.showModal()`, фон — `inert`.', en: 'Modals use `dialog.showModal()`; backgrounds use `inert`.' },
    ],
    sources: [
      { title: 'MDN — tabindex', url: `${MDN}/Web/HTML/Reference/Global_attributes/tabindex` },
      { title: 'MDN — :focus-visible', url: `${MDN}/Web/CSS/:focus-visible` },
      { title: 'MDN — <dialog>', url: `${MDN}/Web/HTML/Reference/Elements/dialog` },
      { title: 'MDN — inert', url: `${MDN}/Web/HTML/Reference/Global_attributes/inert` },
    ],
  },
];
