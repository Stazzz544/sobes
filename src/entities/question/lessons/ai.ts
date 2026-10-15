import type { Lesson } from '../model/types';

const CLAUDE_DOCS = 'https://platform.claude.com/docs/en';
const OWASP_LLM = 'https://genai.owasp.org/llmrisk';
const MDN = 'https://developer.mozilla.org/en-US/docs';

export const AI_LESSONS: Lesson[] = [
  {
    tag: 'llm-basics',
    summary: {
      ru: 'LLM генерирует текст, раз за разом предсказывая следующий токен по контексту. Отсюда и сила, и ограничения: окно контекста, галлюцинации, случайность.',
      en: 'An LLM generates text by repeatedly predicting the next token from the context. That explains both its power and its limits: context window, hallucinations, randomness.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Текст делится на [[token|токены]] — куски слов; русский текст обычно занимает больше токенов, чем английский того же смысла. [[context-window|Окно контекста]] ограничивает промпт и ответ вместе. Модель **не помнит** прошлые запросы: в чате вся история пересылается с каждым сообщением, и от её длины растут цена и задержка. Знания модели заканчиваются на дате среза обучения.',
          en: 'Text is split into [[token|tokens]] — pieces of words; Russian text usually takes more tokens than English with the same meaning. The [[context-window|context window]] limits the prompt and the response together. The model **doesn’t remember** previous requests: in a chat the whole history is resent with every message, and cost and latency grow with its length. The model’s knowledge ends at its training cutoff.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const messages = [
  { role: 'user', content: 'What is a closure?' },
  { role: 'assistant', content: 'A closure is a function plus its lexical environment.' },
  { role: 'user', content: 'Show an example.' },
];
// the whole history is sent with every request: the model itself remembers nothing`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Галлюцинации** — правдоподобные, но ложные ответы: модель продолжает текст, а не сверяется с фактами. Снижают их исходные данные в промпте, просьба ссылаться на источник и разрешение ответить «не знаю»; проверка всё равно остаётся за человеком. **Температура** управляет случайностью выбора токенов; даже при нуле одинаковые ответы не гарантированы.',
          en: '**Hallucinations** are plausible but false answers: the model continues text rather than checking facts. Source data in the prompt, asking for citations and allowing “I don’t know” reduce them; verification still stays with a human. **Temperature** controls the randomness of token choice; even at zero identical answers aren’t guaranteed.',
        },
      },
    ],
    keyPoints: [
      { ru: 'LLM генерирует текст по токену, предсказывая следующий.', en: 'An LLM generates text token by token, predicting the next one.' },
      { ru: 'Окно контекста ограничивает промпт и ответ вместе.', en: 'The context window limits the prompt and the response together.' },
      {
        ru: 'Модель не помнит прошлые запросы — историю присылают каждый раз.',
        en: 'The model doesn’t remember past requests — the history is sent every time.',
      },
      { ru: 'Галлюцинации — правдоподобные, но ложные ответы; факты проверяют.', en: 'Hallucinations are plausible but false answers; verify facts.' },
      {
        ru: 'Температура управляет случайностью; 0 не гарантирует одинаковых ответов.',
        en: 'Temperature controls randomness; 0 doesn’t guarantee identical answers.',
      },
    ],
    sources: [
      { title: 'Google — Introduction to Large Language Models', url: 'https://developers.google.com/machine-learning/resources/intro-llms' },
      { title: 'Claude Docs — Context windows', url: `${CLAUDE_DOCS}/build-with-claude/context-windows` },
      {
        title: 'Claude Docs — Reduce hallucinations',
        url: `${CLAUDE_DOCS}/test-and-evaluate/strengthen-guardrails/reduce-hallucinations`,
      },
    ],
  },
  {
    tag: 'prompting',
    summary: {
      ru: 'Хороший промпт похож на хорошее ТЗ: контекст, задача, формат ответа и примеры.',
      en: 'A good prompt looks like a good spec: context, task, response format and examples.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Пишите прямо и конкретно: кто читатель результата, зачем он нужен, какие ограничения. **Системный промпт** задаёт роль и правила на весь диалог. **Примеры** (few-shot) показывают нужный формат и стиль лучше описаний. Входные данные отделяют от инструкций тегами или разделителями — так модель не перепутает текст пользователя с командой.',
          en: 'Be direct and specific: who reads the result, why it’s needed, what the constraints are. A **system prompt** sets the role and rules for the whole conversation. **Examples** (few-shot) show the desired format and style better than descriptions. Input data is separated from instructions with tags or delimiters — so the model doesn’t mistake user text for a command.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'text',
          source: `You are a senior frontend reviewer.
Review the React component in <code> for bugs and accessibility issues.
Answer as a JSON array: [{ "line": number, "problem": string, "fix": string }].
If there are no problems, return [].

<code>
...
</code>`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Для задач на рассуждение помогает попросить модель сначала подумать по шагам. Формат ответа задают явно (JSON по схеме), а результат всё равно проверяют программно. Промпт — это код: его улучшают итерациями на наборе тестовых примеров, а не по одному удачному ответу.',
          en: 'For reasoning tasks, asking the model to think step by step first helps. The response format is set explicitly (JSON by schema), and the result is still validated in code. A prompt is code: it’s improved iteratively against a set of test cases, not by a single lucky answer.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Чёткая задача и контекст важнее «магических» фраз.', en: 'A clear task and context matter more than “magic” phrases.' },
      { ru: 'Системный промпт задаёт роль и правила на весь диалог.', en: 'A system prompt sets the role and rules for the whole dialog.' },
      { ru: 'Примеры (few-shot) показывают формат лучше описания.', en: 'Examples (few-shot) show the format better than a description.' },
      { ru: 'Данные отделяют от инструкций тегами или разделителями.', en: 'Separate data from instructions with tags or delimiters.' },
      {
        ru: 'Формат ответа задают явно, промпт улучшают на тестовых примерах.',
        en: 'Set the response format explicitly and improve the prompt on test cases.',
      },
    ],
    sources: [
      { title: 'Claude Docs — Prompt engineering overview', url: `${CLAUDE_DOCS}/build-with-claude/prompt-engineering/overview` },
      {
        title: 'Claude Docs — Be clear and direct',
        url: `${CLAUDE_DOCS}/build-with-claude/prompt-engineering/be-clear-and-direct`,
      },
      {
        title: 'Claude Docs — Multishot prompting',
        url: `${CLAUDE_DOCS}/build-with-claude/prompt-engineering/multishot-prompting`,
      },
    ],
  },
  {
    tag: 'rag',
    summary: {
      ru: 'RAG — поиск по своим данным перед генерацией: модель отвечает по найденным фрагментам, а не по памяти.',
      en: 'RAG is a search over your own data before generation: the model answers from the retrieved fragments, not from memory.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Подготовка: документы режут на фрагменты, для каждого считают [[embedding|эмбеддинг]] — вектор чисел, где близкие по смыслу тексты дают близкие векторы, — и кладут в векторную базу. На вопрос: считают эмбеддинг вопроса, находят ближайшие фрагменты, подставляют их в промпт и просят ответить только по ним, со ссылками.',
          en: 'Preparation: documents are split into chunks, an [[embedding|embedding]] is computed for each — a vector of numbers where texts with similar meaning get similar vectors — and stored in a vector database. For a question: compute the question’s embedding, find the nearest chunks, put them into the prompt and ask the model to answer only from them, with citations.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] ** 2;
    normB += b[i] ** 2;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

console.log(cosineSimilarity([1, 0], [1, 0]), cosineSimilarity([1, 0], [0, 1])); // 1 0`,
        },
        caption: {
          ru: 'Близость векторов обычно меряют косинусным сходством.',
          en: 'Vector closeness is usually measured with cosine similarity.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Зачем: свежие и приватные данные без дообучения модели, меньше галлюцинаций, проверяемые ответы. Слабые места: размер фрагментов, промахи поиска (тогда ответ хорош настолько, насколько хорош поиск), бюджет окна контекста и инструкции, спрятанные в самих документах.',
          en: 'Why: fresh and private data without fine-tuning, fewer hallucinations, verifiable answers. Weak spots: chunk size, retrieval misses (the answer is only as good as the search), the context window budget and instructions hidden inside the documents themselves.',
        },
      },
    ],
    keyPoints: [
      { ru: 'RAG: найти релевантные фрагменты и подставить их в промпт.', en: 'RAG: find relevant fragments and put them into the prompt.' },
      { ru: 'Эмбеддинг — вектор: близкий смысл даёт близкие векторы.', en: 'An embedding is a vector: similar meaning gives similar vectors.' },
      { ru: 'Близость обычно меряют косинусным сходством.', en: 'Closeness is usually measured with cosine similarity.' },
      {
        ru: 'RAG даёт свежие и приватные данные без дообучения модели.',
        en: 'RAG brings fresh and private data without fine-tuning the model.',
      },
      { ru: 'Качество ответа ограничено качеством поиска.', en: 'Answer quality is bounded by retrieval quality.' },
    ],
    sources: [
      { title: 'AWS — What is RAG?', url: 'https://aws.amazon.com/what-is/retrieval-augmented-generation/' },
      { title: 'Google ML Crash Course — Embeddings', url: 'https://developers.google.com/machine-learning/crash-course/embeddings' },
      { title: 'Claude Docs — Embeddings', url: `${CLAUDE_DOCS}/build-with-claude/embeddings` },
    ],
  },
  {
    tag: 'agents',
    summary: {
      ru: 'Агент — LLM в цикле: модель сама решает, какой инструмент вызвать, получает результат и продолжает, пока задача не решена.',
      en: 'An agent is an LLM in a loop: the model decides which tool to call, gets the result and continues until the task is done.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Инструмент описывают именем, описанием и JSON-схемой входа. Модель не выполняет код: она отвечает просьбой вызвать инструмент с аргументами, приложение выполняет вызов и возвращает результат — и так по кругу. **Workflow** — заранее заданная последовательность шагов с LLM внутри; **агент** — шаги выбирает сама модель. Начинать стоит с простого: часто хватает одного вызова или workflow.',
          en: 'A tool is described by a name, a description and a JSON schema of its input. The model doesn’t run code: it replies with a request to call a tool with arguments, the app makes the call and returns the result — and around again. A **workflow** is a predefined sequence of steps with an LLM inside; an **agent** lets the model pick the steps. Start simple: often a single call or a workflow is enough.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const tools = [
  {
    name: 'get_weather',
    description: 'Get the current weather for a city',
    input_schema: {
      type: 'object',
      properties: { city: { type: 'string' } },
      required: ['city'],
    },
  },
];
// the model replies with a call { name: 'get_weather', input: { city: 'Paris' } },
// the app runs it and sends the result back`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '**MCP** (Model Context Protocol) — открытый протокол, по которому ИИ-приложения подключают инструменты и источники данных: один MCP-сервер работает с разными клиентами. Риски агентов — стоимость, зацикливание и опасные действия, поэтому им дают минимальные права, лимиты шагов и подтверждение человека для необратимых операций.',
          en: '**MCP** (Model Context Protocol) is an open protocol for connecting AI apps to tools and data sources: one MCP server works with many clients. Agent risks are cost, loops and dangerous actions, so agents get minimal permissions, step limits and human confirmation for irreversible operations.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Инструмент описывают именем, описанием и JSON-схемой входа.',
        en: 'A tool is described by a name, a description and an input JSON schema.',
      },
      { ru: 'Модель только просит вызвать инструмент — выполняет приложение.', en: 'The model only requests a tool call — the app executes it.' },
      {
        ru: 'Агент повторяет цикл «решение → вызов → результат», пока не закончит.',
        en: 'An agent repeats “decide → call → result” until it’s done.',
      },
      { ru: 'Workflow — заданные шаги, агент — шаги выбирает модель.', en: 'A workflow has fixed steps; an agent lets the model choose.' },
      { ru: 'MCP — открытый протокол подключения инструментов и данных.', en: 'MCP is an open protocol for connecting tools and data.' },
    ],
    sources: [
      { title: 'Claude Docs — Tool use', url: `${CLAUDE_DOCS}/agents-and-tools/tool-use/overview` },
      { title: 'Anthropic — Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { title: 'Model Context Protocol — Introduction', url: 'https://modelcontextprotocol.io/docs/getting-started/intro' },
    ],
  },
  {
    tag: 'ai-security',
    summary: {
      ru: 'Главная уязвимость LLM-приложений — prompt injection: инструкции в данных, которые модель принимает за команды.',
      en: 'The main vulnerability of LLM apps is prompt injection: instructions inside data that the model treats as commands.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Инъекция бывает прямой (пишет сам пользователь) и **косвенной** — когда модель обрабатывает веб-страницу, письмо или документ, где спрятан текст вроде «игнорируй прошлые инструкции». Надёжно запретить это промптом нельзя, поэтому защищаются архитектурой: минимальные права у инструментов, подтверждение человека для действий, отделение данных от инструкций, проверка результата.',
          en: 'Injection can be direct (the user writes it) or **indirect** — when the model processes a web page, email or document hiding text like “ignore previous instructions”. A prompt can’t reliably forbid this, so the defense is architectural: minimal tool permissions, human confirmation for actions, separating data from instructions, validating the output.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Ответ модели — **недоверенный ввод**: его нельзя вставлять в HTML как есть (XSS), выполнять через `eval` или подставлять в SQL; структурированный ответ проверяют схемой (например, zod). Секреты не кладут в промпт и не держат в клиентском бандле: ключ API — только на сервере.',
          en: 'A model’s answer is **untrusted input**: don’t put it into HTML as is (XSS), run it with `eval` or paste it into SQL; validate a structured answer against a schema (e.g. zod). Secrets don’t go into prompts or the client bundle: the API key stays on the server.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const answer = await askModel(question);
element.innerHTML = answer; // dangerous: the answer may contain markup
element.innerHTML = DOMPurify.sanitize(markdownToHtml(answer)); // sanitized`,
        },
      },
    ],
    keyPoints: [
      { ru: 'Prompt injection — инструкции в данных, которые модель выполняет.', en: 'Prompt injection is instructions in data that the model follows.' },
      {
        ru: 'Косвенная инъекция приходит из страниц, писем и документов.',
        en: 'Indirect injection comes from pages, emails and documents.',
      },
      {
        ru: 'Ответ модели — недоверенный ввод: экранировать, проверять, не выполнять.',
        en: 'A model’s answer is untrusted input: escape, validate, never execute.',
      },
      {
        ru: 'Инструментам — минимальные права, опасным действиям — подтверждение человека.',
        en: 'Tools get minimal permissions, dangerous actions need human confirmation.',
      },
      { ru: 'Ключ API — только на сервере.', en: 'The API key stays on the server.' },
    ],
    sources: [
      { title: 'OWASP — LLM01: Prompt Injection', url: `${OWASP_LLM}/llm01-prompt-injection/` },
      { title: 'OWASP — LLM05: Improper Output Handling', url: `${OWASP_LLM}/llm052025-improper-output-handling/` },
      { title: 'OWASP — LLM02: Sensitive Information Disclosure', url: `${OWASP_LLM}/llm022025-sensitive-information-disclosure/` },
    ],
  },
  {
    tag: 'ai-frontend',
    summary: {
      ru: 'ИИ во фронтенде — это в первую очередь UX ожидания: стриминг ответа, отмена, обработка лимитов и честные состояния.',
      en: 'AI in the frontend is primarily the UX of waiting: streaming the answer, cancellation, rate-limit handling and honest states.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Ответ модели генерируется секундами, поэтому его **стримят**: показывают по мере прихода через `ReadableStream` или Server-Sent Events. Кнопка «Стоп» отменяет запрос через `AbortController`. Браузер ходит не к API модели напрямую, а к своему серверу — ключ остаётся там же.',
          en: 'A model’s answer takes seconds to generate, so it’s **streamed**: shown as it arrives via a `ReadableStream` or Server-Sent Events. A “Stop” button cancels the request with an `AbortController`. The browser calls your own server rather than the model API directly — the key stays there.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const controller = new AbortController();
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ question }),
  signal: controller.signal,
});
const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
while (true) {
  const { value, done } = await reader.read();
  if (done) {
    break;
  }
  appendToAnswer(value);
}
// controller.abort() stops the request when the user presses Stop`,
        },
      },
      {
        type: 'text',
        text: {
          ru: '`429 Too Many Requests` — лимит запросов: повторяйте после `Retry-After` или с экспоненциальной задержкой. Markdown из ответа рендерят с санитизацией, структурированные ответы проверяют схемой, а в интерфейсе честно говорят, что ответ может быть неточным.',
          en: '`429 Too Many Requests` means a rate limit: retry after `Retry-After` or with exponential backoff. Markdown from the answer is rendered with sanitization, structured answers are validated with a schema, and the UI honestly says the answer may be inaccurate.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Стриминг показывает ответ по мере генерации.', en: 'Streaming shows the answer as it’s generated.' },
      { ru: '`AbortController` отменяет запрос по кнопке «Стоп».', en: '`AbortController` cancels the request on “Stop”.' },
      {
        ru: '`429` — лимит: ждать по `Retry-After` и повторять с задержкой.',
        en: '`429` is a rate limit: wait for `Retry-After` and retry with backoff.',
      },
      { ru: 'Браузер ходит к своему серверу, ключ модели — только там.', en: 'The browser calls your server; the model key lives only there.' },
      {
        ru: 'Ответ рендерят безопасно и предупреждают, что он может ошибаться.',
        en: 'Render the answer safely and warn that it may be wrong.',
      },
    ],
    sources: [
      { title: 'MDN — Using readable streams', url: `${MDN}/Web/API/Streams_API/Using_readable_streams` },
      { title: 'MDN — AbortController', url: `${MDN}/Web/API/AbortController` },
      { title: 'MDN — 429 Too Many Requests', url: `${MDN}/Web/HTTP/Reference/Status/429` },
    ],
  },
  {
    tag: 'ai-tools',
    summary: {
      ru: 'ИИ-ассистент ускоряет рутину, но ответственность за код остаётся на вас: читать, проверять, тестировать и не отдавать секреты.',
      en: 'An AI assistant speeds up routine work, but you stay responsible for the code: read it, verify it, test it and keep secrets out.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Ассистент хорош для шаблонного кода, тестов, рефакторинга под присмотром, объяснения незнакомого кода и регулярных выражений. Опасности: уверенный, но неверный код, устаревшие API, выдуманные функции и даже пакеты — злоумышленники регистрируют пакеты с именами, которые модели часто «придумывают».',
          en: 'An assistant is good for boilerplate, tests, supervised refactoring, explaining unfamiliar code and regular expressions. Dangers: confident but wrong code, outdated APIs, invented functions and even packages — attackers register packages under names models tend to “invent”.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'bash',
          source: `# before installing a suggested package, check that it exists and is maintained
npm view some-package name version time.modified repository.url`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Рабочий процесс: маленькие задачи с контекстом, чтение каждой строки, тесты и линтеры, проверка зависимостей. Закрытый код и секреты не отправляют во внешние сервисы без разрешения компании. На собеседовании ценят умение объяснить, почему код ассистента верен, — а не то, что он сгенерирован.',
          en: 'Workflow: small tasks with context, reading every line, tests and linters, checking dependencies. Proprietary code and secrets aren’t sent to external services without company approval. In an interview, being able to explain why the assistant’s code is correct is what counts — not that it was generated.',
        },
      },
    ],
    keyPoints: [
      {
        ru: 'Ассистент хорош для шаблонного кода, тестов и объяснений — но каждую строку читают.',
        en: 'An assistant is good for boilerplate, tests and explanations — but read every line.',
      },
      {
        ru: 'Модель может уверенно предложить устаревший API или несуществующую функцию.',
        en: 'A model can confidently suggest an outdated API or a nonexistent function.',
      },
      {
        ru: 'Предложенный пакет проверяют: существует ли и поддерживается ли.',
        en: 'Check a suggested package: does it exist and is it maintained.',
      },
      {
        ru: 'Секреты и закрытый код не отправляют во внешние сервисы без разрешения.',
        en: 'Don’t send secrets or proprietary code to external services without approval.',
      },
      { ru: 'За код отвечает разработчик, а не ассистент.', en: 'The developer, not the assistant, is responsible for the code.' },
    ],
    sources: [
      {
        title: 'GitHub Docs — Responsible use of Copilot code completion',
        url: 'https://docs.github.com/en/copilot/responsible-use/copilot-code-completion',
      },
      { title: 'npm Docs — Threats and mitigations', url: 'https://docs.npmjs.com/threats-and-mitigations' },
      { title: 'OWASP — LLM09: Misinformation', url: `${OWASP_LLM}/llm092025-misinformation/` },
    ],
  },
];
