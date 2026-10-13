import type { LocalizedText } from '@app/shared/i18n';

export type AiProvider = {
  id: string;
  name: LocalizedText;
  hint: LocalizedText;
  hasPrefill: boolean;
  buildUrl: (prompt: string) => string;
};

export const AI_PROVIDERS: readonly AiProvider[] = [
  {
    id: 'perplexity',
    name: { ru: 'Perplexity', en: 'Perplexity' },
    hint: { ru: 'Без входа, сразу отвечает', en: 'No sign-in, answers right away' },
    hasPrefill: true,
    buildUrl: (prompt) => `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'chatgpt',
    name: { ru: 'ChatGPT', en: 'ChatGPT' },
    hint: { ru: 'Без входа, вопрос подставится в чат', en: 'No sign-in, the question is pre-filled' },
    hasPrefill: true,
    buildUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'alice',
    name: { ru: 'Алиса (Яндекс)', en: 'Alice (Yandex)' },
    hint: { ru: 'Без входа, вставьте вопрос из буфера', en: 'No sign-in, paste the question from the clipboard' },
    hasPrefill: false,
    buildUrl: () => 'https://alice.yandex.ru/',
  },
  {
    id: 'deepseek',
    name: { ru: 'DeepSeek', en: 'DeepSeek' },
    hint: { ru: 'Нужен вход, вставьте вопрос из буфера', en: 'Sign-in required, paste the question from the clipboard' },
    hasPrefill: false,
    buildUrl: () => 'https://chat.deepseek.com/',
  },
];
