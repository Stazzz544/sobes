export type TopicId = 'javascript' | 'typescript' | 'react' | 'web' | 'css' | 'ai' | 'algorithms';

export type TopicSelection = TopicId | 'all';

export const TOPIC_IDS: readonly TopicId[] = ['javascript', 'typescript', 'react', 'web', 'css', 'ai', 'algorithms'];

export const TOPIC_SELECTIONS: readonly TopicSelection[] = [...TOPIC_IDS, 'all'];
