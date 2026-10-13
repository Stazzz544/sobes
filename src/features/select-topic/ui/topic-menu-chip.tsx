import { JSX } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useUnit } from 'effector-react';
import { TOPICS, TopicChip, topicModel } from '@app/entities/topic';
import { useI18n } from '@app/shared/i18n';
import { topicMenuModel } from '../model/topic-menu-model';

export const TopicMenuChip = (): JSX.Element => {
  const { t, text } = useI18n();
  const { topic, isOpen, onToggle } = useUnit({
    topic: topicModel.$currentTopic,
    isOpen: topicMenuModel.$isMenuOpen,
    onToggle: topicMenuModel.menuToggled,
  });
  const topicTitle = topic === 'all' ? t('topics.all') : text(TOPICS[topic].title);

  return (
    <Pressable
      onPress={() => onToggle()}
      accessibilityRole="button"
      accessibilityLabel={t('topicMenu.current', { topic: topicTitle })}
      accessibilityHint={isOpen ? t('topicMenu.close') : t('topicMenu.open')}
      accessibilityState={{ expanded: isOpen }}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <TopicChip topic={topic} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
