export type TopicId = 'javascript' | 'typescript' | 'react' | 'web' | 'css' | 'ai';

export type TopicSelection = TopicId | 'all';

export const TOPIC_IDS: readonly TopicId[] = ['javascript', 'typescript', 'react', 'web', 'css', 'ai'];

export const TOPIC_SELECTIONS: readonly TopicSelection[] = [...TOPIC_IDS, 'all'];
