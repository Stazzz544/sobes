import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useUnit } from 'effector-react';
import { TOPICS, TopicSwitcher, topicModel } from '@app/entities/topic';
import { useI18n } from '@app/shared/i18n';
import { AppText, Screen } from '@app/shared/ui';
import { ModePicker } from '@app/widgets/mode-picker';

export default function HomeScreen(): JSX.Element {
  const { t, text } = useI18n();
  const { topic, onTopicSelect } = useUnit({ topic: topicModel.$currentTopic, onTopicSelect: topicModel.topicSelected });
  const title = topic === 'all' ? t('topics.all') : text(TOPICS[topic].title);
  const description = topic === 'all' ? t('topics.allDescription') : text(TOPICS[topic].description);

  return (
    <Screen>
      <TopicSwitcher value={topic} onChange={onTopicSelect} />
      <View style={styles.heading}>
        <AppText variant="title">{title}</AppText>
        <AppText tone="secondary">{description}</AppText>
      </View>
      <AppText variant="label" tone="muted">
        {t('home.modesTitle')}
      </AppText>
      <ModePicker onSelect={(mode) => router.push({ pathname: '/quiz', params: { mode, topic } })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    gap: 4,
  },
});
