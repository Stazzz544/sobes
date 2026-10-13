export type TopicId = 'javascript' | 'typescript' | 'react' | 'web';

export type TopicSelection = TopicId | 'all';

export const TOPIC_IDS: readonly TopicId[] = ['javascript', 'typescript', 'react', 'web'];

export const TOPIC_SELECTIONS: readonly TopicSelection[] = [...TOPIC_IDS, 'all'];
