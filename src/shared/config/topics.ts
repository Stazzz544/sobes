export type TopicId = 'javascript' | 'typescript' | 'react' | 'web' | 'css' | 'ai' | 'algorithms' | 'html' | 'testing' | 'git' | 'hr';

export type TopicSelection = TopicId | 'all';

export type DirectionId = 'frontend';

export const DIRECTION_IDS: readonly DirectionId[] = ['frontend'];

export const TOPIC_IDS: readonly TopicId[] = ['javascript', 'typescript', 'react', 'web', 'css', 'ai', 'algorithms', 'html', 'testing', 'git', 'hr'];

export const TOPIC_SELECTIONS: readonly TopicSelection[] = [...TOPIC_IDS, 'all'];
