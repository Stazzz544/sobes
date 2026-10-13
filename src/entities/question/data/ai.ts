import type { Question } from '../model/types';

const CLAUDE_DOCS = 'https://docs.claude.com/en/docs';
const GOOGLE_ML = 'https://developers.google.com/machine-learning';
const GLOSSARY = `${CLAUDE_DOCS}/about-claude/glossary`;

export const AI_QUESTIONS: Question[] = [
  {
    id: 'ai-llm-001',
    topic: 'ai',
    tags: ['llm-basics'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что такое LLM (большая языковая модель)?', en: 'What is an LLM (large language model)?' },
    options: [
      {
        text: {
          ru: 'База данных с готовыми ответами на популярные вопросы',
          en: 'A database of ready-made answers to popular questions',
        },
      },
      {
        text: {
          ru: 'Нейросеть, обученная на огромном объёме текстов предсказывать следующий фрагмент текста; ответ она генерирует по кусочкам',
          en: 'A neural network trained on huge amounts of text to predict the next piece of text; it generates answers piece by piece',
        },
      },
      {
        text: {
          ru: 'Поисковик, который в реальном времени читает интернет',
          en: 'A search engine that reads the internet in real time',
        },
      },
      {
        text: {
          ru: 'Набор правил «если — то», написанных программистами',
          en: 'A set of if-then rules written by programmers',
        },
      },
      {
        text: {
          ru: 'Программа, которая понимает смысл как человек и не ошибается',
          en: 'A program that understands meaning like a human and never makes mistakes',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'LLM — это нейросеть с миллиардами параметров, обученная на огромном корпусе текстов. Её базовая задача — по уже написанному тексту предсказать следующий **токен**. Ответ строится по токену за раз: модель дописывает текст, каждый раз выбирая продолжение.',
          en: 'An LLM is a neural network with billions of parameters trained on a huge text corpus. Its basic task is to predict the next **token** given the text so far. An answer is built one token at a time: the model keeps extending the text, choosing a continuation each step.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Сама по себе модель не ищет в интернете и не хранит готовых ответов, поэтому может уверенно ошибаться. Поиск, базы знаний и инструменты к ней подключают отдельно.',
          en: 'On its own the model doesn’t search the internet or store ready answers, so it can be confidently wrong. Search, knowledge bases and tools are connected to it separately.',
        },
      },
    ],
    sources: [
      { title: 'Google ML — Introduction to Large Language Models', url: `${GOOGLE_ML}/resources/intro-llms` },
      { title: 'Claude Docs — Glossary', url: GLOSSARY },
    ],
  },
  {
    id: 'ai-llm-002',
    topic: 'ai',
    tags: ['llm-basics'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что такое токен в контексте LLM?', en: 'What is a token in the context of LLMs?' },
    options: [
      {
        text: {
          ru: 'Ключ доступа к API модели',
          en: 'An access key for the model’s API',
        },
      },
      {
        text: {
          ru: 'Всегда ровно один символ текста',
          en: 'Always exactly one character of text',
        },
      },
      {
        text: {
          ru: 'Фрагмент текста — слово, часть слова или знак, — на которые модель разбивает текст; лимиты и цена считаются в токенах',
          en: 'A piece of text — a word, part of a word, or a symbol — that the model splits text into; limits and pricing are counted in tokens',
        },
      },
      {
        text: {
          ru: 'Одно целое предложение',
          en: 'One whole sentence',
        },
      },
      {
        text: {
          ru: 'Единица скорости генерации',
          en: 'A unit of generation speed',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Перед обработкой текст разбивается **токенизатором** на токены. Частые слова часто становятся одним токеном, редкие и длинные — несколькими. Для русского текста токенов обычно больше, чем для английского того же смысла.',
          en: 'Before processing, a **tokenizer** splits text into tokens. Common words often become a single token, rare and long ones several. Non-English text, such as Russian, usually takes more tokens than English with the same meaning.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'В токенах измеряются размер контекста, ограничения на длину ответа и стоимость запросов к API — поэтому длинные промпты стоят дороже.',
          en: 'Context size, response length limits and API costs are all measured in tokens — which is why long prompts cost more.',
        },
      },
    ],
    sources: [
      { title: 'Hugging Face LLM Course — Tokenizers', url: 'https://huggingface.co/learn/llm-course/chapter2/4' },
      { title: 'Claude Docs — Glossary', url: GLOSSARY },
    ],
  },
  {
    id: 'ai-llm-003',
    topic: 'ai',
    tags: ['llm-basics'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что такое контекстное окно модели?', en: 'What is a model’s context window?' },
    options: [
      {
        text: {
          ru: 'Окно чата в интерфейсе',
          en: 'The chat window in the UI',
        },
      },
      {
        text: {
          ru: 'Память, в которой модель навсегда хранит все прошлые разговоры',
          en: 'Memory where the model permanently stores all past conversations',
        },
      },
      {
        text: {
          ru: 'Сколько пользователей одновременно может общаться с моделью',
          en: 'How many users can talk to the model at the same time',
        },
      },
      {
        text: {
          ru: 'Максимальный объём текста в токенах, который модель учитывает за один запрос, — вместе с её ответом',
          en: 'The maximum amount of text, in tokens, the model takes into account in one request — including its response',
        },
      },
      {
        text: {
          ru: 'Время, в течение которого модель помнит запрос',
          en: 'How long the model remembers a request',
        },
      },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Всё, что модель «видит» в запросе — системный промпт, история диалога, документы, ответы инструментов и её собственный ответ, — должно поместиться в контекстное окно. Что не влезло, для модели не существует.',
          en: 'Everything the model “sees” in a request — the system prompt, chat history, documents, tool results and its own answer — must fit in the context window. Whatever doesn’t fit doesn’t exist for the model.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому в длинных чатах старые сообщения обрезают или сжимают в краткое содержание, а большие базы знаний подключают через поиск (RAG), а не целиком.',
          en: 'That’s why long chats trim or summarize old messages, and large knowledge bases are connected via search (RAG) instead of being pasted whole.',
        },
      },
    ],
    sources: [
      { title: 'Claude Docs — Context windows', url: `${CLAUDE_DOCS}/build-with-claude/context-windows` },
      { title: 'Claude Docs — Glossary', url: GLOSSARY },
    ],
  },
  {
    id: 'ai-llm-004',
    topic: 'ai',
    tags: ['llm-basics'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что называют галлюцинациями LLM?', en: 'What are LLM hallucinations?' },
    options: [
      {
        text: {
          ru: 'Сбои сети, из-за которых ответ обрывается',
          en: 'Network failures that cut the answer short',
        },
      },
      {
        text: {
          ru: 'Убедительно звучащие, но неверные или выдуманные утверждения: несуществующие факты, ссылки, функции API',
          en: 'Convincing-sounding but wrong or made-up statements: non-existent facts, links, API functions',
        },
      },
      {
        text: {
          ru: 'Артефакты только на сгенерированных картинках',
          en: 'Artifacts that appear only in generated images',
        },
      },
      {
        text: {
          ru: 'Ситуацию, когда модель отвечает слишком медленно',
          en: 'When the model answers too slowly',
        },
      },
      {
        text: {
          ru: 'Ошибки, которые возникают только у старых моделей',
          en: 'Errors that only happen with old models',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модель генерирует правдоподобное продолжение текста, а не проверяет факты. Если нужных знаний нет, она всё равно может выдать уверенный ответ: придумать цитату, ссылку или метод библиотеки.',
          en: 'The model generates a plausible continuation, it doesn’t check facts. Without the needed knowledge it may still give a confident answer: invent a quote, a link or a library method.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Снизить риск помогают: передать модели проверенный контекст (RAG), разрешить ей отвечать «не знаю», просить ссылки на источник из контекста и проверять важные утверждения. Полностью галлюцинации не исчезают даже у новых моделей.',
          en: 'What helps: give the model verified context (RAG), allow it to say “I don’t know,” ask it to cite the provided sources, and verify important claims. Hallucinations don’t fully disappear even in newer models.',
        },
      },
    ],
    sources: [
      {
        title: 'Claude Docs — Reduce hallucinations',
        url: `${CLAUDE_DOCS}/test-and-evaluate/strengthen-guardrails/reduce-hallucinations`,
      },
      { title: 'Google ML — Introduction to Large Language Models', url: `${GOOGLE_ML}/resources/intro-llms` },
    ],
  },
  {
    id: 'ai-llm-005',
    topic: 'ai',
    tags: ['llm-basics', 'prompting'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что регулирует параметр `temperature`?', en: 'What does the `temperature` parameter control?' },
    options: [
      {
        text: {
          ru: 'Скорость генерации ответа',
          en: 'How fast the answer is generated',
        },
      },
      {
        text: {
          ru: 'Максимальную длину ответа',
          en: 'The maximum answer length',
        },
      },
      {
        text: {
          ru: 'Случайность выбора следующего токена: ниже — предсказуемее и стабильнее, выше — разнообразнее',
          en: 'The randomness of choosing the next token: lower is more predictable and stable, higher is more varied',
        },
      },
      {
        text: {
          ru: 'Точность фактов: чем выше температура, тем меньше ошибок',
          en: 'Factual accuracy: the higher the temperature, the fewer the mistakes',
        },
      },
      {
        text: {
          ru: 'Нагрузку на серверы провайдера',
          en: 'The load on the provider’s servers',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'На каждом шаге модель получает распределение вероятностей следующего токена. Низкая температура делает выбор почти всегда в пользу самых вероятных вариантов — ответы стабильнее и повторяемее. Высокая сглаживает распределение — текст разнообразнее, но и ошибок больше.',
          en: 'At each step the model has a probability distribution over the next token. A low temperature almost always picks the most likely options — answers are more stable and repeatable. A high one flattens the distribution — text is more varied, but so are the mistakes.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Для извлечения данных и кода обычно берут низкую температуру, для генерации идей — повыше. Знаний модели температура не добавляет.',
          en: 'For data extraction and code, a low temperature is typical; for brainstorming, a higher one. Temperature doesn’t add knowledge.',
        },
      },
    ],
    sources: [
      { title: 'Claude Docs — Glossary', url: GLOSSARY },
      {
        title: 'Hugging Face — Generation strategies',
        url: 'https://huggingface.co/docs/transformers/generation_strategies',
      },
    ],
  },
  {
    id: 'ai-llm-006',
    topic: 'ai',
    tags: ['llm-basics'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Почему модель может не знать о недавних событиях или новой версии библиотеки?',
      en: 'Why might a model not know about recent events or a new library version?',
    },
    options: [
      {
        text: {
          ru: 'Её знания зафиксированы на момент обучения; свежие данные нужно передать в запросе или через инструменты вроде поиска',
          en: 'Its knowledge is frozen at training time; fresh data must be passed in the request or via tools like search',
        },
      },
      {
        text: {
          ru: 'Модель намеренно скрывает новые данные',
          en: 'The model deliberately hides new data',
        },
      },
      {
        text: {
          ru: 'Модели обновляют знания раз в сутки, нужно подождать',
          en: 'Models update their knowledge daily; just wait',
        },
      },
      {
        text: {
          ru: 'Из-за низкой температуры',
          en: 'Because of a low temperature',
        },
      },
      {
        text: {
          ru: 'Новые данные не помещаются в токенизатор',
          en: 'New data doesn’t fit in the tokenizer',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У каждой модели есть **дата отсечения знаний** (knowledge cutoff): данные для обучения собраны до неё. Всё более новое модель не знает и может «додумать» по старым паттернам — например, предложить устаревший API.',
          en: 'Every model has a **knowledge cutoff**: its training data was collected up to that date. It doesn’t know anything newer and may “fill in” from old patterns — for example, suggest a deprecated API.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поэтому для актуальной информации модели дают документацию в контексте, подключают поиск или собственные базы знаний.',
          en: 'That’s why, for up-to-date information, models are given documentation in context, web search, or your own knowledge bases.',
        },
      },
    ],
    sources: [{ title: 'Claude Docs — Glossary', url: GLOSSARY }],
  },
  {
    id: 'ai-llm-007',
    topic: 'ai',
    tags: ['llm-basics', 'ai-frontend'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Помнит ли модель предыдущие сообщения, когда вы шлёте новый запрос в API чата?',
      en: 'Does the model remember previous messages when you send a new request to a chat API?',
    },
    options: [
      {
        text: {
          ru: 'Да, модель запоминает пользователя по API-ключу',
          en: 'Yes, the model remembers the user by their API key',
        },
      },
      {
        text: {
          ru: 'Да, но только последние 10 сообщений',
          en: 'Yes, but only the last 10 messages',
        },
      },
      {
        text: {
          ru: 'Нет: API обычно без состояния, и приложение заново отправляет историю диалога в каждом запросе',
          en: 'No: the API is usually stateless, and the app re-sends the conversation history with every request',
        },
      },
      {
        text: {
          ru: 'Да, модель дообучается на каждом сообщении',
          en: 'Yes, the model is fine-tuned on every message',
        },
      },
      {
        text: {
          ru: 'Нет, и передать историю невозможно',
          en: 'No, and there’s no way to pass the history',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Для модели каждый вызов независим. «Память» чата — это массив сообщений, который приложение хранит и отправляет целиком в каждом запросе. Отсюда следствия: длинный диалог стоит дороже (все токены считаются заново), а при переполнении контекста старые сообщения приходится обрезать или пересказывать.',
          en: 'For the model each call is independent. Chat “memory” is an array of messages the app stores and sends in full every time. Consequences: a long conversation costs more (all tokens are counted again), and when the context overflows, old messages have to be trimmed or summarized.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'js',
          source: `const messages = [
  { role: 'user', content: 'Hi! My name is Ann.' },
  { role: 'assistant', content: 'Hi, Ann!' },
  { role: 'user', content: 'What is my name?' }, // модель видит всё выше / the model sees everything above
];`,
        },
      },
    ],
    sources: [
      { title: 'Claude Docs — Messages API: working with messages', url: `${CLAUDE_DOCS}/build-with-claude/working-with-messages` },
      { title: 'Claude Docs — Context windows', url: `${CLAUDE_DOCS}/build-with-claude/context-windows` },
    ],
  },
  {
    id: 'ai-llm-008',
    topic: 'ai',
    tags: ['llm-basics'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Чем обучение модели (training) отличается от инференса (inference)?',
      en: 'How does model training differ from inference?',
    },
    options: [
      {
        text: {
          ru: 'Это одно и то же',
          en: 'They’re the same thing',
        },
      },
      {
        text: {
          ru: 'Инференс — это обучение на ваших запросах в реальном времени',
          en: 'Inference is training on your requests in real time',
        },
      },
      {
        text: {
          ru: 'Обучение подбирает параметры модели на огромных данных — долго и дорого; инференс — генерация ответа уже обученной моделью на конкретный запрос',
          en: 'Training tunes the model’s parameters on huge data — slow and expensive; inference is an already trained model generating an answer to a specific request',
        },
      },
      {
        text: {
          ru: 'Обучение происходит в браузере, инференс — на сервере',
          en: 'Training happens in the browser, inference on the server',
        },
      },
      {
        text: {
          ru: 'Инференс нужен только для картинок',
          en: 'Inference is only for images',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обучение — этап, на котором веса модели подбираются по данным; занимает недели на тысячах ускорителей. Инференс — использование готовой модели: ваш запрос прогоняется через неё, и она генерирует ответ. Ваши запросы к API обычно не меняют саму модель.',
          en: 'Training is when the model’s weights are fitted to data; it takes weeks on thousands of accelerators. Inference is using the finished model: your request runs through it and it generates an answer. Your API requests usually don’t change the model itself.',
        },
      },
    ],
    sources: [
      { title: 'Google ML — Introduction to Large Language Models', url: `${GOOGLE_ML}/resources/intro-llms` },
      { title: 'Claude Docs — Glossary', url: GLOSSARY },
    ],
  },
  {
    id: 'ai-llm-009',
    topic: 'ai',
    tags: ['llm-basics'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Почему LLM может ошибиться, считая буквы в слове (например, сколько «r» в strawberry)?',
      en: 'Why can an LLM get letter counts wrong (e.g., how many “r”s are in strawberry)?',
    },
    options: [
      {
        text: {
          ru: 'Модель работает с токенами — кусками слов, а не с отдельными буквами',
          en: 'The model works with tokens — chunks of words — not individual letters',
        },
      },
      {
        text: {
          ru: 'В обучающих данных не было этого слова',
          en: 'That word wasn’t in the training data',
        },
      },
      {
        text: {
          ru: 'Модели запрещено считать',
          en: 'The model isn’t allowed to count',
        },
      },
      {
        text: {
          ru: 'Из-за слишком высокой температуры',
          en: 'Because the temperature is too high',
        },
      },
      {
        text: {
          ru: 'Модель не знает английский алфавит',
          en: 'The model doesn’t know the English alphabet',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Слово попадает в модель не по буквам, а одним или несколькими токенами, например `straw` + `berry`. Модель не «видит» отдельные символы напрямую, поэтому побуквенные задачи — подсчёт, переворот строки, точная арифметика — для неё неестественны.',
          en: 'A word reaches the model not letter by letter but as one or more tokens, like `straw` + `berry`. The model doesn’t directly “see” characters, so character-level tasks — counting, reversing a string, exact arithmetic — are unnatural for it.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Надёжный приём — дать модели инструмент: пусть она напишет и выполнит код, который посчитает точно.',
          en: 'A reliable fix is to give the model a tool: let it write and run code that counts exactly.',
        },
      },
    ],
    sources: [{ title: 'Hugging Face LLM Course — Tokenizers', url: 'https://huggingface.co/learn/llm-course/chapter2/4' }],
  },
  {
    id: 'ai-llm-010',
    topic: 'ai',
    tags: ['llm-basics'],
    difficulty: 1,
    popular: false,
    prompt: { ru: 'Что значит «мультимодальная модель»?', en: 'What does “multimodal model” mean?' },
    options: [
      {
        text: {
          ru: 'Модель, которая работает в нескольких режимах скорости',
          en: 'A model with several speed modes',
        },
      },
      {
        text: {
          ru: 'Модель, которая понимает несколько языков программирования',
          en: 'A model that understands several programming languages',
        },
      },
      {
        text: {
          ru: 'Модель, которая принимает или создаёт данные разных типов: текст, изображения, аудио',
          en: 'A model that accepts or produces different data types: text, images, audio',
        },
      },
      {
        text: {
          ru: 'Несколько моделей, запущенных на одном сервере',
          en: 'Several models running on one server',
        },
      },
      {
        text: {
          ru: 'Модель, которую можно скачать на телефон',
          en: 'A model you can download to a phone',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Мультимодальная модель работает с несколькими «модальностями» данных. Например, получает скриншот интерфейса и текст «найди проблемы с доступностью» и отвечает текстом. Для фронтенда это полезно: можно разбирать макеты, скриншоты ошибок и графики.',
          en: 'A multimodal model handles several data “modalities.” For example, it takes a UI screenshot plus the text “find accessibility issues” and answers in text. That’s handy for frontend work: reviewing mockups, error screenshots and charts.',
        },
      },
    ],
    sources: [{ title: 'Claude Docs — Vision', url: `${CLAUDE_DOCS}/build-with-claude/vision` }],
  },
  {
    id: 'ai-prompt-001',
    topic: 'ai',
    tags: ['prompting'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Для чего нужен системный промпт?', en: 'What is a system prompt for?' },
    options: [
      {
        text: {
          ru: 'Чтобы задать модели роль, правила и формат ответов на весь диалог',
          en: 'To set the model’s role, rules and answer format for the whole conversation',
        },
      },
      {
        text: {
          ru: 'Чтобы перезагрузить модель',
          en: 'To restart the model',
        },
      },
      {
        text: {
          ru: 'Это сообщение об ошибке от системы',
          en: 'It’s an error message from the system',
        },
      },
      {
        text: {
          ru: 'Чтобы скрыть API-ключ',
          en: 'To hide the API key',
        },
      },
      {
        text: {
          ru: 'Он нужен только для генерации картинок',
          en: 'It’s only needed for image generation',
        },
      },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Системный промпт — инструкция от разработчика, которая действует на весь разговор: «Ты — ассистент поддержки интернет-магазина, отвечай кратко, на вопросы не по теме вежливо отказывай». Пользователь его обычно не видит.',
          en: 'A system prompt is a developer instruction that applies to the whole conversation: “You’re a support assistant for an online store, answer briefly, politely decline off-topic questions.” Users usually don’t see it.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Важно: системный промпт — не защита секретов. Хитрым запросом его иногда удаётся «вытащить», поэтому ключи и приватные данные туда класть нельзя.',
          en: 'Important: a system prompt isn’t a place for secrets. Clever requests can sometimes extract it, so never put keys or private data there.',
        },
      },
    ],
    sources: [
      {
        title: 'Claude Docs — Giving Claude a role with a system prompt',
        url: `${CLAUDE_DOCS}/build-with-claude/prompt-engineering/system-prompts`,
      },
    ],
  },
  {
    id: 'ai-prompt-002',
    topic: 'ai',
    tags: ['prompting'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что такое few-shot промптинг?', en: 'What is few-shot prompting?' },
    options: [
      {
        text: {
          ru: 'Несколько попыток отправить один и тот же запрос',
          en: 'Several attempts at sending the same request',
        },
      },
      {
        text: {
          ru: 'Дать в промпте несколько примеров «вход → нужный ответ», чтобы модель поняла формат и стиль',
          en: 'Including a few “input → desired output” examples in the prompt so the model picks up the format and style',
        },
      },
      {
        text: {
          ru: 'Ограничение ответа несколькими словами',
          en: 'Limiting the answer to a few words',
        },
      },
      {
        text: {
          ru: 'Дообучение модели на нескольких тысячах примеров',
          en: 'Fine-tuning the model on a few thousand examples',
        },
      },
      {
        text: {
          ru: 'Отправка запроса нескольким моделям сразу',
          en: 'Sending the request to several models at once',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Примеры прямо в промпте — один из самых эффективных приёмов: модель копирует их структуру, тон и формат. Это работает без дообучения, модель не меняется.',
          en: 'Examples right in the prompt are one of the most effective techniques: the model copies their structure, tone and format. It works without fine-tuning; the model itself doesn’t change.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'text',
          source: `Review: "Fast delivery, works fine" → positive
Review: "Broke after one day" → negative
Review: "Okay, but a bit pricey" →`,
        },
      },
    ],
    sources: [
      {
        title: 'Claude Docs — Use examples (multishot prompting)',
        url: `${CLAUDE_DOCS}/build-with-claude/prompt-engineering/multishot-prompting`,
      },
    ],
  },
  {
    id: 'ai-prompt-003',
    topic: 'ai',
    tags: ['prompting', 'ai-frontend'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Фронтенду нужен от модели ответ в виде JSON. Как сделать это надёжно?',
      en: 'The frontend needs a JSON response from the model. How do you make it reliable?',
    },
    options: [
      {
        text: {
          ru: 'Написать «верни JSON» и сразу передать ответ в `JSON.parse` без проверок',
          en: 'Write “return JSON” and pass the answer straight to `JSON.parse` without checks',
        },
      },
      {
        text: {
          ru: 'Поднять температуру, чтобы модель лучше старалась',
          en: 'Raise the temperature so the model tries harder',
        },
      },
      {
        text: {
          ru: 'Использовать режим структурированного вывода по JSON-схеме, если он есть, и всё равно валидировать ответ (например, zod) перед использованием',
          en: 'Use structured output with a JSON schema if available, and still validate the answer (e.g., with zod) before using it',
        },
      },
      {
        text: {
          ru: 'Вырезать JSON из текста регулярным выражением',
          en: 'Cut the JSON out of the text with a regular expression',
        },
      },
      {
        text: {
          ru: 'Попросить модель вернуть HTML и вставить его через `innerHTML`',
          en: 'Ask the model for HTML and insert it via `innerHTML`',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Многие API умеют ограничивать генерацию JSON-схемой (structured outputs), а function calling тоже возвращает структурированные аргументы. Но ответ модели — это внешние данные: поле может отсутствовать или иметь не тот тип. Поэтому на границе его валидируют так же, как ответ любого API.',
          en: 'Many APIs can constrain generation to a JSON schema (structured outputs), and function calling also returns structured arguments. But the model’s answer is external data: a field may be missing or have the wrong type. So validate it at the boundary like any API response.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'ts',
          source: `const Review = z.object({
  sentiment: z.enum(['positive', 'negative', 'neutral']),
  summary: z.string(),
});
const result = Review.safeParse(JSON.parse(modelText));`,
        },
      },
    ],
    sources: [
      { title: 'Claude Docs — Increase output consistency', url: `${CLAUDE_DOCS}/test-and-evaluate/strengthen-guardrails/increase-consistency` },
      { title: 'zod — Basic usage', url: 'https://zod.dev/basics' },
    ],
  },
  {
    id: 'ai-prompt-004',
    topic: 'ai',
    tags: ['prompting'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что делает промпт качественным?', en: 'What makes a prompt good?' },
    options: [
      {
        text: {
          ru: 'Чем короче, тем лучше: модель сама догадается',
          en: 'The shorter the better: the model will figure it out',
        },
      },
      {
        text: {
          ru: 'Капслок и угрозы, чтобы модель отнеслась серьёзно',
          en: 'All caps and threats so the model takes it seriously',
        },
      },
      {
        text: {
          ru: 'Конкретная задача, нужный контекст, ожидаемый формат ответа, ограничения и при необходимости примеры',
          en: 'A specific task, the needed context, the expected output format, constraints, and examples if helpful',
        },
      },
      {
        text: {
          ru: 'Много вежливых слов — от них ответы точнее',
          en: 'Lots of polite words — they make answers more accurate',
        },
      },
      {
        text: {
          ru: 'Всегда просить ответ на английском',
          en: 'Always asking for an answer in English',
        },
      },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модель не знает вашего контекста. Хороший промпт похож на задачу новому коллеге: что сделать, зачем, с какими данными, в каком виде вернуть и чего избегать. Пример: «Перепиши этот React-компонент на хуки, сохрани пропсы, верни только код без пояснений».',
          en: 'The model doesn’t know your context. A good prompt reads like a task for a new colleague: what to do, why, with what data, in what form, and what to avoid. Example: “Rewrite this React component using hooks, keep the props, return only code without explanations.”',
        },
      },
    ],
    sources: [
      {
        title: 'Claude Docs — Be clear, direct, and detailed',
        url: `${CLAUDE_DOCS}/build-with-claude/prompt-engineering/be-clear-and-direct`,
      },
      {
        title: 'Claude Docs — Prompt engineering overview',
        url: `${CLAUDE_DOCS}/build-with-claude/prompt-engineering/overview`,
      },
    ],
  },
  {
    id: 'ai-prompt-005',
    topic: 'ai',
    tags: ['prompting'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Зачем просят модель «рассуждать по шагам» перед ответом?',
      en: 'Why ask a model to “think step by step” before answering?',
    },
    options: [
      {
        text: {
          ru: 'Чтобы ответ был длиннее и выглядел солиднее',
          en: 'To make the answer longer and look more solid',
        },
      },
      {
        text: {
          ru: 'Промежуточные рассуждения повышают качество на задачах с логикой, вычислениями и несколькими шагами',
          en: 'Intermediate reasoning improves quality on tasks involving logic, calculations and multiple steps',
        },
      },
      {
        text: {
          ru: 'Это снижает стоимость запроса',
          en: 'It lowers the cost of the request',
        },
      },
      {
        text: {
          ru: 'Это отключает галлюцинации полностью',
          en: 'It completely turns off hallucinations',
        },
      },
      {
        text: {
          ru: 'Так модель начинает пользоваться интернетом',
          en: 'It makes the model start using the internet',
        },
      },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модель генерирует ответ токен за токеном, и выписанные промежуточные шаги становятся частью контекста, на который она опирается дальше. Это приём chain-of-thought. Многие современные «рассуждающие» модели делают это сами.',
          en: 'The model generates token by token, and written-out intermediate steps become part of the context it builds on. That’s chain-of-thought prompting. Many modern “reasoning” models do this on their own.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Цена — больше токенов и выше задержка, поэтому для простых задач это лишнее. Ошибки рассуждения тоже возможны, проверка результата остаётся нужной.',
          en: 'The cost is more tokens and higher latency, so it’s overkill for simple tasks. Reasoning can still go wrong, so checking the result remains necessary.',
        },
      },
    ],
    sources: [
      {
        title: 'Claude Docs — Let Claude think (chain of thought)',
        url: `${CLAUDE_DOCS}/build-with-claude/prompt-engineering/chain-of-thought`,
      },
    ],
  },
];
