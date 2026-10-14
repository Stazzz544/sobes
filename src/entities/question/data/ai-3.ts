import type { Question } from '../model/types';

export const AI_QUESTIONS_3: Question[] = [
  {
    id: 'ai-rag-order-001',
    kind: 'order',
    topic: 'ai',
    tags: ['rag'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Расставьте шаги RAG-пайплайна по порядку: от подготовки документов до ответа.',
      en: 'Put the RAG pipeline steps in order, from preparing documents to the answer.',
    },
    items: [
      { text: { ru: 'Разбить документы на фрагменты (чанки)', en: 'Split documents into chunks' } },
      { text: { ru: 'Посчитать эмбеддинги чанков и сохранить в векторную БД', en: 'Embed the chunks and store them in a vector DB' } },
      { text: { ru: 'Посчитать эмбеддинг вопроса пользователя', en: 'Embed the user’s question' } },
      { text: { ru: 'Найти ближайшие по смыслу чанки', en: 'Retrieve the most similar chunks' } },
      { text: { ru: 'Передать найденное в промпт и сгенерировать ответ', en: 'Put the retrieved chunks into the prompt and generate the answer' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Индексация делается заранее: документы режут на чанки, считают для них эмбеддинги и кладут в векторную БД.',
          en: 'Indexing happens ahead of time: documents are split into chunks, embedded and stored in a vector DB.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'На запрос: вопрос тоже превращают в эмбеддинг, ищут ближайшие чанки и добавляют их в контекст модели — так ответ опирается на актуальные данные, а не только на обучение.',
          en: 'At query time the question is embedded as well, the nearest chunks are retrieved and added to the model’s context — so the answer is grounded in current data, not just training.',
        },
      },
    ],
    sources: [
      { title: 'AWS — What is RAG?', url: 'https://aws.amazon.com/what-is/retrieval-augmented-generation/' },
      { title: 'Google — Embeddings', url: 'https://developers.google.com/machine-learning/crash-course/embeddings' },
    ],
  },
];
