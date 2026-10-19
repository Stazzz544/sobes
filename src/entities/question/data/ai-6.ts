import type { Question } from '../model/types';

export const AI_QUESTIONS_6: Question[] = [
  {
    id: 'ai-tools-005',
    topic: 'ai',
    tags: ['ai-tools'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Нужно с помощью ИИ-ассистента переписать большой модуль на новую библиотеку. Как поставить задачу, чтобы результат было легко проверить?',
      en: 'You need an AI assistant to rewrite a large module onto a new library. How do you frame the task so the result is easy to verify?',
    },
    options: [
      { text: { ru: 'Одним запросом «перепиши всё», а потом посмотреть, что получилось', en: 'One request, “rewrite everything”, then see what comes out' } },
      {
        text: {
          ru: 'Разбить на небольшие шаги с понятным критерием готовности — тесты, type-check — и проверять дифф после каждого шага',
          en: 'Split it into small steps with a clear definition of done — tests, type-check — and review the diff after each step',
        },
      },
      { text: { ru: 'Попросить ассистента самому решить, когда задача готова, и не смотреть код', en: 'Let the assistant decide when it’s done and skip reading the code' } },
      { text: { ru: 'Сначала выключить тесты, чтобы они не мешали', en: 'Disable the tests first so they don’t get in the way' } },
      { text: { ru: 'Писать запрос как можно короче, без контекста', en: 'Keep the request as short as possible, with no context' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Большой дифф за один раз почти невозможно внимательно проверить, а ошибка в начале расползается по всему результату. Короткие шаги с измеримым критерием — «тесты модуля зелёные, type-check проходит» — дают точки, где видно, что пошло не так, и можно откатить один шаг, а не всё. Ассистенту такой план тоже помогает: меньше контекста за раз, меньше выдуманных решений.',
          en: 'A huge diff in one go is nearly impossible to review carefully, and an early mistake spreads through the whole result. Short steps with a measurable criterion — “the module’s tests are green, type-check passes” — give checkpoints where you see what went wrong and can roll back one step, not everything. Such a plan helps the assistant too: less context at a time, fewer invented decisions.',
        },
      },
    ],
    sources: [{ title: 'Anthropic — Claude Code best practices', url: 'https://www.anthropic.com/engineering/claude-code-best-practices' }],
  },
  {
    id: 'ai-sec-007',
    topic: 'ai',
    tags: ['ai-security'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Публичный чат-бот ходит в платную LLM через ваш бэкенд. Кто-то шлёт тысячи длинных запросов, и счёт растёт. Что защитит бюджет?',
      en: 'A public chatbot calls a paid LLM through your backend. Someone sends thousands of long requests, and the bill grows. What protects the budget?',
    },
    options: [
      { text: { ru: 'Спрятать API-ключ в переменную окружения фронтенда', en: 'Hide the API key in a frontend environment variable' } },
      { text: { ru: 'Попросить модель в системном промпте отвечать короче', en: 'Ask the model in the system prompt to answer briefly' } },
      {
        text: {
          ru: 'Лимиты на бэкенде: частота запросов на пользователя, длина ввода, `max_tokens` ответа, дневной бюджет с оповещениями',
          en: 'Backend limits: request rate per user, input length, response `max_tokens`, a daily budget with alerts',
        },
      },
      { text: { ru: 'Перейти на модель с большим контекстным окном', en: 'Switch to a model with a bigger context window' } },
      { text: { ru: 'Кешировать ответы в браузере пользователя', en: 'Cache responses in the user’s browser' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каждый запрос к модели стоит денег, поэтому бесконтрольный доступ — это атака на кошелёк (OWASP называет её Unbounded Consumption). Защита — на сервере, где её нельзя обойти: аутентификация и лимит запросов на пользователя, ограничение длины входа и `max_tokens` ответа, общий бюджет с оповещениями и отключением. Просьба в промпте ничего не гарантирует, а всё, что на фронтенде, злоумышленник контролирует сам.',
          en: 'Every model request costs money, so uncontrolled access is an attack on your wallet (OWASP calls it Unbounded Consumption). Protection belongs on the server, where it can’t be bypassed: authentication and a per-user rate limit, a cap on input length and response `max_tokens`, an overall budget with alerts and a cut-off. A request in the prompt guarantees nothing, and anything on the frontend is controlled by the attacker.',
        },
      },
    ],
    sources: [{ title: 'OWASP — LLM10: Unbounded Consumption', url: 'https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/' }],
  },
];
