export type TopicId = 'javascript' | 'typescript' | 'react' | 'web' | 'css' | 'ai' | 'algorithms' | 'html' | 'testing' | 'state' | 'node' | 'next' | 'architecture' | 'git' | 'hr';

export type TopicSelection = TopicId | 'all';

export type DirectionId = 'frontend';

export const DIRECTION_IDS: readonly DirectionId[] = ['frontend'];

export const TOPIC_IDS: readonly TopicId[] = ['javascript', 'typescript', 'react', 'web', 'css', 'ai', 'algorithms', 'html', 'testing', 'state', 'node', 'next', 'architecture', 'git', 'hr'];

// вопросы и уроки скрытых тем остаются в банке и в паках, их просто не показывают
export const HIDDEN_TOPIC_IDS: readonly TopicId[] = ['hr'];

export const isTopicVisible = (topic: TopicId): boolean => !HIDDEN_TOPIC_IDS.includes(topic);

export const VISIBLE_TOPIC_IDS: readonly TopicId[] = TOPIC_IDS.filter(isTopicVisible);

export const TOPIC_SELECTIONS: readonly TopicSelection[] = [...VISIBLE_TOPIC_IDS, 'all'];
