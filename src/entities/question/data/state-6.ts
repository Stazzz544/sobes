import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const STATE_QUESTIONS_6: Question[] = [
  {
    id: 'state-url-008',
    kind: 'output',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 1,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const url = new URL('https://shop.example/catalog?page=2#reviews');

console.log(url.pathname, url.search, url.hash);`,
    },
    answers: ['/catalog ?page=2 #reviews'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`URL` разбирает адрес на части: `pathname` — путь без параметров, `search` — строка запроса **вместе с** `?`, `hash` — якорь вместе с `#`. Параметры удобнее читать через `url.searchParams` — это готовый `URLSearchParams`. Якорь браузер не отправляет на сервер: он живёт только на клиенте.',
          en: '`URL` splits an address into parts: `pathname` is the path without parameters, `search` is the query string **including** `?`, and `hash` is the anchor including `#`. Parameters are easier to read via `url.searchParams`, a ready `URLSearchParams`. The browser doesn’t send the hash to the server: it lives only on the client.',
        },
      },
    ],
    sources: [{ title: 'MDN — URL', url: `${MDN}/Web/API/URL` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'state-url-009',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что из этого **не стоит** класть в URL?',
      en: 'Which of these **shouldn’t** go in the URL?',
    },
    options: [
      { text: { ru: 'Категорию и сортировку каталога', en: 'The catalog category and sorting' } },
      { text: { ru: 'Номер страницы списка', en: 'The list page number' } },
      { text: { ru: 'Токен доступа или личные данные пользователя', en: 'An access token or the user’s personal data' } },
      { text: { ru: 'Открытую вкладку на странице товара', en: 'The open tab on a product page' } },
      { text: { ru: 'Строку поиска', en: 'The search query' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'URL виден и сохраняется повсюду: в истории браузера, в логах серверов и прокси, в заголовке `Referer` при переходе на другие сайты и в ссылках, которыми делятся. Секретам и личным данным там не место. Фильтры, сортировка, страница, вкладка и поиск — как раз то, что пользователь ожидает сохранить и передать ссылкой.',
          en: 'A URL is visible and stored everywhere: in browser history, in server and proxy logs, in the `Referer` header when navigating to other sites, and in shared links. Secrets and personal data don’t belong there. Filters, sorting, page, tab and search are exactly what users expect to keep and share as a link.',
        },
      },
    ],
    sources: [{ title: 'MDN — Referer header: privacy and security concerns', url: `${MDN}/Web/Security/Referer_header:_privacy_and_security_concerns` }],
  },
  {
    id: 'state-url-010',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Пользователь на странице `?category=books&page=5` выбирает категорию `games`. Что сделать с `page`?',
      en: 'A user on `?category=books&page=5` picks the `games` category. What should happen to `page`?',
    },
    options: [
      { text: { ru: 'Оставить 5 — пользователь уже листал список', en: 'Keep 5 — the user was already paging' } },
      { text: { ru: 'Сбросить на первую страницу, удалив `page`', en: 'Reset to the first page by removing `page`' } },
      { text: { ru: 'Перенести 5 в отдельный параметр `prevPage`', en: 'Move 5 into a separate `prevPage` parameter' } },
      { text: { ru: 'Ничего не делать — роутер решит сам', en: 'Do nothing — the router will decide' } },
      { text: { ru: 'Увеличить до 6', en: 'Increase it to 6' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Номер страницы относится к старому списку. В новой категории страниц может быть меньше, и пользователь увидит пустую пятую страницу. Поэтому при смене фильтра или сортировки `page` сбрасывают в том же обновлении URL: `params.set(\'category\', \'games\'); params.delete(\'page\')`.',
          en: 'The page number belongs to the old list. The new category may have fewer pages, and the user would see an empty page 5. So when a filter or sort changes, `page` is reset in the same URL update: `params.set(\'category\', \'games\'); params.delete(\'page\')`.',
        },
      },
    ],
    sources: [{ title: 'MDN — URLSearchParams', url: `${MDN}/Web/API/URLSearchParams` }],
  },
  {
    id: 'state-url-011',
    kind: 'output',
    topic: 'state',
    tags: ['state-url'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'js',
      source: `const params = new URLSearchParams('?sort=price');

const page = Number(params.get('page'));
const size = Number(params.get('size') ?? 20);

console.log(page, size);`,
    },
    answers: ['0 20'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Отсутствующий параметр — `null`, а `Number(null)` — это `0`: страница 0 некорректна, и список может сломаться. Значения из URL всегда строки или `null`, поэтому значение по умолчанию подставляют **до** преобразования (`?? 20`) и проверяют результат: целое ли число и не меньше ли единицы. Пользователь может вручную вписать в адрес что угодно.',
          en: 'A missing parameter is `null`, and `Number(null)` is `0`: page 0 is invalid and may break the list. URL values are always strings or `null`, so the default is applied **before** conversion (`?? 20`) and the result is validated: is it an integer, is it at least one. Users can type anything into the address bar.',
        },
      },
    ],
    sources: [{ title: 'MDN — URLSearchParams.get()', url: `${MDN}/Web/API/URLSearchParams/get` }],
    verify: { kind: 'js-output' },
  },
];
