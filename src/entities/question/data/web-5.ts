import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';

export const WEB_QUESTIONS_5: Question[] = [
  {
    id: 'web-security-order-001',
    kind: 'order',
    topic: 'web',
    tags: ['security', 'http'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Сайт на `app.example.com` отправляет `PUT` с JSON на `api.example.com`. Расставьте шаги по порядку.',
      en: 'A page on `app.example.com` sends a `PUT` with JSON to `api.example.com`. Put the steps in order.',
    },
    items: [
      { text: { ru: 'Браузер отправляет `OPTIONS` с `Access-Control-Request-Method: PUT`', en: 'The browser sends `OPTIONS` with `Access-Control-Request-Method: PUT`' } },
      { text: { ru: 'Сервер отвечает `Access-Control-Allow-Methods` и `-Headers`', en: 'The server replies with `Access-Control-Allow-Methods` and `-Headers`' } },
      { text: { ru: 'Браузер отправляет сам `PUT`', en: 'The browser sends the actual `PUT`' } },
      { text: { ru: 'Браузер проверяет `Access-Control-Allow-Origin` в ответе', en: 'The browser checks `Access-Control-Allow-Origin` in the response' } },
      { text: { ru: 'JavaScript получает ответ', en: 'JavaScript receives the response' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Метод `PUT` и `Content-Type: application/json` делают запрос «непростым», поэтому браузер сначала спрашивает разрешение [[preflight|preflight-запросом]] `OPTIONS`. Только если сервер разрешил метод и заголовки, уходит сам `PUT`.',
          en: 'The `PUT` method and `Content-Type: application/json` make the request “non-simple”, so the browser first asks for permission with a [[preflight|preflight]] `OPTIONS` request. Only if the server allows the method and headers does the actual `PUT` go out.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ответ на основной запрос тоже проверяется: без подходящего `Access-Control-Allow-Origin` браузер не отдаст его в JS, хотя сервер запрос уже выполнил. [[cors|CORS]] защищает чтение ответа, а не сервер от запросов.',
          en: 'The main response is checked too: without a matching `Access-Control-Allow-Origin` the browser won’t hand it to JS, even though the server has already processed the request. [[cors|CORS]] protects reading the response, not the server from requests.',
        },
      },
    ],
    sources: [
      { title: 'MDN — CORS: preflighted requests', url: `${MDN}/Web/HTTP/Guides/CORS#preflighted_requests` },
      { title: 'MDN — Preflight request', url: `${MDN}/Glossary/Preflight_request` },
    ],
  },
  {
    id: 'web-browser-rendering-order-001',
    kind: 'order',
    topic: 'web',
    tags: ['browser-rendering'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'На странице есть обычный `<script>` в `<head>`, `<script defer>` и картинки. Расставьте события по порядку.',
      en: 'A page has a regular `<script>` in `<head>`, a `<script defer>` and images. Put the events in order.',
    },
    items: [
      { text: { ru: 'Выполнен обычный `<script>` — разбор HTML ждёт его', en: 'The regular `<script>` runs — HTML parsing waits for it' } },
      { text: { ru: 'HTML полностью разобран', en: 'The HTML is fully parsed' } },
      { text: { ru: 'Выполнен `defer`-скрипт', en: 'The `defer` script runs' } },
      { code: 'DOMContentLoaded' },
      { text: { ru: '`load` — загружены картинки, стили и iframe', en: '`load` — images, styles and iframes are loaded' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обычный скрипт блокирует разбор: парсер останавливается, пока скрипт не загрузится и не выполнится. `defer`-скрипт грузится параллельно, а выполняется после разбора HTML, но до `DOMContentLoaded`.',
          en: 'A regular script blocks parsing: the parser stops until the script is loaded and executed. A `defer` script downloads in parallel and runs after the HTML is parsed but before `DOMContentLoaded`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`DOMContentLoaded` не ждёт картинок, а `load` срабатывает, когда загружено всё — поэтому логику, которой нужен только DOM, вешают на `DOMContentLoaded`.',
          en: '`DOMContentLoaded` doesn’t wait for images, while `load` fires once everything has loaded — so logic that only needs the DOM goes on `DOMContentLoaded`.',
        },
      },
    ],
    sources: [
      { title: 'MDN — DOMContentLoaded event', url: `${MDN}/Web/API/Document/DOMContentLoaded_event` },
      { title: 'MDN — <script>: defer', url: `${MDN}/Web/HTML/Reference/Elements/script#defer` },
    ],
  },
];
