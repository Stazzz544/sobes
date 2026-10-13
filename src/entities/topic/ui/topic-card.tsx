import { JSX } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CARD_BORDER_RADIUS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { ACCENT_COLORS, useTheme } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';
import { TOPICS, getSelectionAccent } from '../config/topics';
import { TopicLogo } from './topic-logo';
import type { TopicSelection } from '../model/types';

type TopicCardProps = {
  topic: TopicSelection;
  isSelected: boolean;
  onPress: () => void;
};

export const TopicCard = ({ topic, isSelected, onPress }: TopicCardProps): JSX.Element => {
  const { colors, scheme } = useTheme();
  const { t, text } = useI18n();
  const topicColors = ACCENT_COLORS[getSelectionAccent(topic)][scheme];
  const title = topic === 'all' ? t('topics.all') : text(TOPICS[topic].title);
  const description = topic === 'all' ? t('topics.allDescription') : text(TOPICS[topic].description);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: isSelected ? topicColors.accentSoft : colors.bgCard,
          borderColor: isSelected ? topicColors.accentText : colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <TopicLogo topic={topic} size={48} />
      <View style={styles.texts}>
        <AppText variant="subtitle">{title}</AppText>
        <AppText variant="caption" tone="secondary">
          {description}
        </AppText>
      </View>
      <Ionicons
        name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
        size={26}
        color={isSelected ? topicColors.accentText : colors.textMuted}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: CARD_BORDER_RADIUS,
    borderWidth: 2,
  },
  texts: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  pressed: {
    opacity: 0.85,
  },
});
