import type { DirectionId, TopicId } from '@app/shared/config';
import type { LocalizedText } from '@app/shared/i18n';
import type { AccentName } from '@app/shared/theme';

export type { DirectionId, TopicId, TopicSelection } from '@app/shared/config';

export type Topic = {
  id: TopicId;
  accent: AccentName;
  shortTitle: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type Direction = {
  id: DirectionId;
  title: LocalizedText;
  role: LocalizedText;
  topics: readonly TopicId[];
};
