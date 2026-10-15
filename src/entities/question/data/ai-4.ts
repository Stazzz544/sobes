import type { Question } from '../model/types';

const CLAUDE_DOCS = 'https://platform.claude.com/docs/en';

const OUTPUT_PROMPT = { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' };

export const AI_QUESTIONS_4: Question[] = [
  {
    id: 'ai-rag-005',
    kind: 'output',
    topic: 'ai',
    tags: ['rag'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Поиск по эмбеддингам выбирает документ, ближайший к запросу по косинусной близости. Какой ключ выведет код?',
      en: 'Embedding search picks the document closest to the query by cosine similarity. Which key does the code print?',
    },
    code: {
      lang: 'js',
      source: `const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const cosine = (a, b) => dot(a, b) / (norm(a) * norm(b));

const query = [1, 0];
const docs = { cats: [0.9, 0.1], cars: [0.1, 0.9], pets: [0.7, 0.7] };

const [best] = Object.entries(docs).sort(([, x], [, y]) => cosine(query, y) - cosine(query, x));
console.log(best[0]);`,
    },
    answers: ['cats'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Косинусная близость — косинус угла между векторами: 1 — одно направление, 0 — перпендикулярны. Она сравнивает **смысл** (направление), а не длину вектора. `cats` почти совпадает с запросом по направлению (≈ 0.99), `pets` — под углом 45° (≈ 0.71), `cars` почти перпендикулярен. В реальных системах векторы имеют сотни измерений, а поиск ведёт векторная база.',
          en: 'Cosine similarity is the cosine of the angle between vectors: 1 means the same direction, 0 means perpendicular. It compares **meaning** (direction), not vector length. `cats` nearly matches the query’s direction (≈ 0.99), `pets` is at 45° (≈ 0.71), `cars` is almost perpendicular. Real systems use hundreds of dimensions, and a vector database runs the search.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Cosine similarity', url: 'https://en.wikipedia.org/wiki/Cosine_similarity' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'ai-rag-006',
    kind: 'output',
    topic: 'ai',
    tags: ['rag'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Сколько чанков получится из 8 слов при размере 4 и перекрытии 1? Впишите число, которое выведет код.',
      en: 'How many chunks do 8 words make with size 4 and overlap 1? Type the number the code prints.',
    },
    code: {
      lang: 'js',
      source: `function chunk(words, size, overlap) {
  const result = [];
  for (let start = 0; start < words.length; start += size - overlap) {
    result.push(words.slice(start, start + size));
    if (start + size >= words.length) {
      break;
    }
  }
  return result;
}

console.log(chunk('a b c d e f g h'.split(' '), 4, 1).length);`,
    },
    answers: ['3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Чанки: `a b c d`, `d e f g`, `g h` — каждый следующий начинается на одно слово раньше конца предыдущего. **Перекрытие** нужно, чтобы мысль на границе не разорвалась между чанками и нашлась целиком хотя бы в одном. Цена — больше чанков и повторы в индексе. На практике режут по смысловым границам — абзацам, заголовкам, — а не ровно по словам.',
          en: 'Chunks: `a b c d`, `d e f g`, `g h` — each next one starts one word before the previous one ends. **Overlap** keeps an idea on the boundary from being split so it’s found whole in at least one chunk. The cost is more chunks and duplicates in the index. In practice, split on meaningful boundaries — paragraphs, headings — not exact word counts.',
        },
      },
    ],
    sources: [{ title: 'Pinecone — Chunking Strategies', url: 'https://www.pinecone.io/learn/chunking-strategies/' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'ai-rag-007',
    topic: 'ai',
    tags: ['rag'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'RAG по базе знаний плохо находит документы по точным строкам вроде кода ошибки `ERR_4012` или артикула. Что поможет?',
      en: 'RAG over a knowledge base struggles to find documents by exact strings like the error code `ERR_4012` or a SKU. What helps?',
    },
    options: [
      { text: { ru: 'Увеличить размер чанков', en: 'Increase chunk size' } },
      {
        text: {
          ru: 'Гибридный поиск: объединить векторный поиск с полнотекстовым (BM25) и пересортировать результаты',
          en: 'Hybrid search: combine vector search with full-text search (BM25) and rerank the results',
        },
      },
      { text: { ru: 'Поднять `temperature` модели', en: 'Raise the model’s `temperature`' } },
      { text: { ru: 'Убрать эмбеддинги и спрашивать модель без документов', en: 'Drop embeddings and ask the model without documents' } },
      { text: { ru: 'Перевести документы на английский', en: 'Translate the documents into English' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Эмбеддинги хорошо ловят смысл и перефразировки, но редкие точные токены — коды, имена функций, артикулы — для них почти неотличимы. Полнотекстовый поиск (BM25) наоборот силён в точных совпадениях. Гибридный поиск берёт кандидатов из обоих, а реранкер упорядочивает их. Так устроено большинство серьёзных RAG-систем.',
          en: 'Embeddings capture meaning and paraphrases well, but rare exact tokens — codes, function names, SKUs — look almost the same to them. Full-text search (BM25) is the opposite: strong at exact matches. Hybrid search takes candidates from both, and a reranker orders them. Most serious RAG systems work this way.',
        },
      },
    ],
    sources: [{ title: 'Anthropic — Contextual Retrieval', url: 'https://www.anthropic.com/engineering/contextual-retrieval' }],
  },
  {
    id: 'ai-front-005',
    kind: 'output',
    topic: 'ai',
    tags: ['ai-frontend'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Бэкенд стримит ответ модели в формате Server-Sent Events. Что выведет код? Впишите ответ.',
      en: 'The backend streams the model’s answer as Server-Sent Events. What will the code log? Type the answer.',
    },
    code: {
      lang: 'js',
      source: `const chunk = 'data: {"text":"Hel"}\\n\\ndata: {"text":"lo"}\\n\\ndata: [DONE]\\n\\n';

const text = chunk
  .split('\\n\\n')
  .filter((event) => event.startsWith('data: ') && event !== 'data: [DONE]')
  .map((event) => JSON.parse(event.slice(6)).text)
  .join('');

console.log(text);`,
    },
    answers: ['Hello'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'SSE — текстовый поток событий: каждое начинается с `data:` и заканчивается пустой строкой. Модель шлёт ответ кусочками, интерфейс дописывает их по мере прихода. Ловушка реального кода: сетевой чанк может оборвать событие посередине, поэтому текст копят в буфер и разбирают только завершённые события — до `\\n\\n`.',
          en: 'SSE is a text stream of events: each starts with `data:` and ends with a blank line. The model sends the answer in pieces, and the UI appends them as they arrive. The real-world trap: a network chunk can cut an event in half, so text is buffered and only complete events — up to `\\n\\n` — are parsed.',
        },
      },
    ],
    sources: [
      { title: 'MDN — Using server-sent events', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events' },
      { title: 'Claude Docs — Streaming Messages', url: `${CLAUDE_DOCS}/build-with-claude/streaming` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'ai-front-006',
    topic: 'ai',
    tags: ['ai-frontend'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Пользователь нажал «Остановить» во время генерации длинного ответа. Как это правильно сделать?',
      en: 'The user pressed “Stop” while a long answer is generating. How do you do it properly?',
    },
    options: [
      { text: { ru: 'Скрыть текст, а запрос пусть идёт до конца', en: 'Hide the text and let the request finish' } },
      {
        text: {
          ru: 'Отменить `fetch` через `AbortController`; бэкенд, заметив разрыв, прерывает запрос к модели — чтобы не платить за ненужные токены',
          en: 'Abort the `fetch` via `AbortController`; the backend, noticing the disconnect, cancels the model request — so you don’t pay for unneeded tokens',
        },
      },
      { text: { ru: 'Перезагрузить страницу', en: 'Reload the page' } },
      { text: { ru: 'Отправить второй запрос с текстом «стоп»', en: 'Send a second request saying “stop”' } },
      { text: { ru: 'Ничего: генерацию нельзя остановить', en: 'Nothing: generation can’t be stopped' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`controller.abort()` закрывает соединение и отклоняет промис с `AbortError` — его обрабатывают как штатную остановку, а не ошибку. Важно и на сервере: если продолжать генерацию после ухода клиента, токены всё равно будут оплачены. Уже показанный текст обычно сохраняют в истории как частичный ответ.',
          en: '`controller.abort()` closes the connection and rejects the promise with `AbortError` — handle it as a normal stop, not an error. The server side matters too: if generation continues after the client leaves, the tokens are still billed. The text already shown is usually kept in history as a partial answer.',
        },
      },
    ],
    sources: [{ title: 'MDN — AbortController', url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController' }],
  },
  {
    id: 'ai-prompt-006',
    topic: 'ai',
    tags: ['prompting', 'ai-frontend'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Модель должна вернуть JSON карточки товара. Что сделать с ответом, прежде чем показывать его в интерфейсе?',
      en: 'The model must return product card JSON. What do you do with the response before showing it in the UI?',
    },
    options: [
      { text: { ru: 'Сразу передать в компонент — модель знает формат', en: 'Pass it straight to the component — the model knows the format' } },
      {
        text: {
          ru: 'Разобрать и проверить схемой (например, zod); при ошибке — повторить запрос или показать запасной вариант',
          en: 'Parse and validate with a schema (e.g. zod); on failure — retry or show a fallback',
        },
      },
      { text: { ru: 'Выполнить через `eval`, чтобы поддержать любые форматы', en: 'Run it with `eval` to support any format' } },
      { text: { ru: 'Попросить модель в следующий раз быть внимательнее', en: 'Ask the model to be more careful next time' } },
      { text: { ru: 'Сохранить в базу, а проверить потом', en: 'Save to the database and check later' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Даже со структурированным выводом ответ модели — внешние данные: поле может отсутствовать, число прийти строкой, текст оказаться длиннее лимита. Схема на границе превращает это в понятную ошибку, после которой можно повторить запрос с текстом ошибки или показать запасной интерфейс. `eval` для ответа модели — прямой путь к выполнению чужого кода.',
          en: 'Even with structured output, a model response is external data: a field may be missing, a number may arrive as a string, text may exceed a limit. A schema at the boundary turns that into a clear error, after which you can retry with the error text or show a fallback UI. `eval` on model output is a direct path to running foreign code.',
        },
      },
    ],
    sources: [{ title: 'Claude Docs — Structured outputs', url: `${CLAUDE_DOCS}/build-with-claude/structured-outputs` }],
  },
  {
    id: 'ai-llm-011',
    kind: 'output',
    topic: 'ai',
    tags: ['llm-basics'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Цена модели — за миллион токенов, выходные дороже входных. Сколько стоит запрос в долларах? Впишите, что выведет код.',
      en: 'Model pricing is per million tokens, with output pricier than input. How much does the request cost in dollars? Type what the code prints.',
    },
    code: {
      lang: 'js',
      source: `const pricePerMillion = { input: 3, output: 15 };
const usage = { input: 12000, output: 800 };

const cost =
  (usage.input * pricePerMillion.input + usage.output * pricePerMillion.output) / 1_000_000;

console.log(cost.toFixed(3));`,
    },
    answers: ['0.048'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вход — 12 000 × 3 = 36 000, выход — 800 × 15 = 12 000, вместе 48 000 / 1 000 000 = $0.048. Здесь основную часть цены даёт **вход**: длинный системный промпт, история чата и документы RAG отправляются заново в каждом запросе. Поэтому историю обрезают или сжимают, а неизменную часть промпта кешируют.',
          en: 'Input is 12,000 × 3 = 36,000, output is 800 × 15 = 12,000, total 48,000 / 1,000,000 = $0.048. Here most of the cost comes from **input**: a long system prompt, chat history and RAG documents are resent with every request. So history is trimmed or summarized, and the unchanging part of the prompt is cached.',
        },
      },
    ],
    sources: [
      { title: 'Claude Docs — Pricing', url: `${CLAUDE_DOCS}/about-claude/pricing` },
      { title: 'Claude Docs — Prompt caching', url: `${CLAUDE_DOCS}/build-with-claude/prompt-caching` },
    ],
    verify: { kind: 'js-output' },
  },
  {
    id: 'ai-agents-004',
    topic: 'ai',
    tags: ['agents'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Агент сам вызывает инструменты в цикле, пока не решит задачу. Какие ограничения стоит заложить?',
      en: 'An agent calls tools in a loop until it solves the task. What limits should you build in?',
    },
    options: [
      { text: { ru: 'Никаких — агент сам поймёт, когда остановиться', en: 'None — the agent knows when to stop' } },
      {
        text: {
          ru: 'Лимит шагов и бюджета токенов, подтверждение человеком для необратимых действий и логирование каждого вызова',
          en: 'A step and token budget limit, human confirmation for irreversible actions, and logging of every call',
        },
      },
      { text: { ru: 'Только таймаут на весь процесс в 24 часа', en: 'Only a 24-hour timeout for the whole run' } },
      { text: { ru: 'Запрет на любые инструменты', en: 'Forbid all tools' } },
      { text: { ru: 'Высокую `temperature`, чтобы агент пробовал разное', en: 'A high `temperature` so the agent tries different things' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Агент может зациклиться, повторяя одни и те же вызовы, и тратить деньги. Поэтому задают максимум шагов и бюджет, а действия с последствиями — оплата, удаление, отправка писем — ставят за подтверждение человека. Логи вызовов нужны, чтобы разобраться, почему агент поступил так. Где задачу можно решить фиксированной цепочкой шагов, агент часто вообще не нужен.',
          en: 'An agent can loop, repeating the same calls and spending money. So set a maximum number of steps and a budget, and put consequential actions — payments, deletions, sending emails — behind human confirmation. Call logs help understand why the agent acted as it did. Where a fixed chain of steps solves the task, an agent often isn’t needed at all.',
        },
      },
    ],
    sources: [{ title: 'Anthropic — Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents' }],
  },
  {
    id: 'ai-sec-005',
    topic: 'ai',
    tags: ['ai-security', 'agents'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Чат-боту поддержки дали инструмент `runSql(query)` с правами администратора базы, чтобы он отвечал о заказах. В чём главный риск?',
      en: 'A support chatbot got a `runSql(query)` tool with database admin rights to answer questions about orders. What’s the main risk?',
    },
    options: [
      { text: { ru: 'Запросы будут медленными', en: 'Queries will be slow' } },
      {
        text: {
          ru: 'Избыточные полномочия: через prompt injection модель могут заставить прочитать чужие данные или удалить таблицы',
          en: 'Excessive agency: via prompt injection the model can be made to read others’ data or drop tables',
        },
      },
      { text: { ru: 'Модель не знает SQL', en: 'The model doesn’t know SQL' } },
      { text: { ru: 'Никакого, если промпт запрещает опасные запросы', en: 'None, if the prompt forbids dangerous queries' } },
      { text: { ru: 'Только расход токенов', en: 'Only token usage' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Инструкции в промпте не защищают: их обходят через prompt injection в сообщении пользователя или в данных. Защита — в устройстве инструментов: вместо произвольного SQL — узкие функции вроде `getOrderStatus(orderId)`, которые сами проверяют, что заказ принадлежит этому пользователю, и права только на чтение нужных таблиц. Что модель не может вызвать, то нельзя и злоупотребить.',
          en: 'Prompt instructions don’t protect: they’re bypassed via prompt injection in the user’s message or the data. Protection lives in the tool design: instead of arbitrary SQL, narrow functions like `getOrderStatus(orderId)` that check the order belongs to this user, with read-only rights to the needed tables. What the model can’t call can’t be abused.',
        },
      },
    ],
    sources: [{ title: 'OWASP — LLM06: Excessive Agency', url: 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/' }],
  },
  {
    id: 'ai-tools-003',
    topic: 'ai',
    tags: ['ai-tools'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'ИИ-ассистент написал тесты к функции расчёта скидки, и все они зелёные. Что проверить в первую очередь?',
      en: 'An AI assistant wrote tests for a discount function, and they’re all green. What should you check first?',
    },
    options: [
      { text: { ru: 'Ничего: зелёные тесты — значит, функция работает', en: 'Nothing: green tests mean the function works' } },
      {
        text: {
          ru: 'Что ожидаемые значения взяты из требований, а не из текущего вывода функции, — иначе тесты закрепляют баг',
          en: 'That expected values come from the requirements, not from the function’s current output — otherwise the tests cement the bug',
        },
      },
      { text: { ru: 'Количество тестов: чем больше, тем лучше', en: 'The number of tests: the more the better' } },
      { text: { ru: 'Что тесты написаны на TypeScript', en: 'That the tests are written in TypeScript' } },
      { text: { ru: 'Скорость их выполнения', en: 'Their execution speed' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сгенерированные по коду тесты часто описывают то, что функция **делает**, а не то, что она **должна** делать: если скидка считается неверно, тест с подсмотренным результатом это зафиксирует. Ожидания сверяют с требованиями и краевыми случаями — 0%, 100%, отрицательная цена. Полезная проверка — сломать функцию и убедиться, что тесты упали.',
          en: 'Tests generated from code often describe what the function **does**, not what it **should** do: if the discount is wrong, a test with the copied result locks that in. Check expectations against requirements and edge cases — 0%, 100%, a negative price. A useful check is to break the function and confirm the tests fail.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — Exploring Generative AI', url: 'https://martinfowler.com/articles/exploring-gen-ai.html' }],
  },
];
