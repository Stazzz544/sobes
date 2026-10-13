import { JSX, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useUnit } from 'effector-react';
import { progressModel } from '@app/entities/progress';
import { QUESTIONS, QUESTIONS_BY_ID, TAGS } from '@app/entities/question';
import { TOPICS, TopicLogo, topicModel } from '@app/entities/topic';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, Card, EmptyState, ProgressBar, Screen } from '@app/shared/ui';
import { aggregateStats } from '../lib/aggregate-stats';
import { ActivityChart } from './activity-chart';
import type { TagId } from '@app/entities/question';
import type { TopicSelection } from '@app/shared/config';

type StatsDashboardProps = {
  onPracticeTag: (topic: TopicSelection, tag: TagId) => void;
};

type TileProps = {
  label: string;
  value: string;
};

const formatPercent = (value: number | null): string => (value === null ? '—' : `${Math.round(value * 100)}%`);

const Tile = ({ label, value }: TileProps): JSX.Element => (
  <Card style={styles.tile}>
    <AppText variant="title" tone="accent">
      {value}
    </AppText>
    <AppText variant="caption" tone="secondary">
      {label}
    </AppText>
  </Card>
);

export const StatsDashboard = ({ onPracticeTag }: StatsDashboardProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const { log, stats, topic } = useUnit({
    log: progressModel.$answerLog,
    stats: progressModel.$questionStats,
    topic: topicModel.$currentTopic,
  });
  const overview = useMemo(
    () =>
      aggregateStats({ log, stats, questions: QUESTIONS, questionsById: QUESTIONS_BY_ID, selection: topic, now: Date.now() }),
    [log, stats, topic],
  );

  return (
    <Screen>
      {overview.answered === 0 ? (
        <EmptyState icon="stats-chart-outline" title={t('stats.emptyTitle')} text={t('stats.emptyText')} />
      ) : (
        <>
          <View style={styles.tiles}>
            <Tile label={t('stats.answered')} value={String(overview.answered)} />
            <Tile label={t('stats.accuracy')} value={formatPercent(overview.accuracy)} />
            <Tile label={t('stats.dontKnowRate')} value={formatPercent(overview.dontKnowRate)} />
            <Tile label={t('stats.streak')} value={String(overview.streakDays)} />
          </View>

          <Card style={styles.section}>
            <AppText variant="subtitle">{t('stats.weakTitle')}</AppText>
            {overview.weakTags.length === 0 ? (
              <AppText tone="secondary">{t('stats.weakEmpty')}</AppText>
            ) : (
              overview.weakTags.map((weakTag) => (
                <View key={weakTag.tag} style={styles.weakRow}>
                  <View style={styles.weakTexts}>
                    <View style={styles.rowHeader}>
                      <AppText variant="bodyStrong" style={styles.shrink}>
                        {text(TAGS[weakTag.tag].title)}
                      </AppText>
                      <AppText variant="caption" tone="danger">
                        {formatPercent(weakTag.accuracy)}
                      </AppText>
                    </View>
                    <ProgressBar value={weakTag.accuracy} color={colors.danger} height={6} />
                  </View>
                  <Button
                    title={t('stats.train')}
                    variant="secondary"
                    size="compact"
                    onPress={() => onPracticeTag(TAGS[weakTag.tag].topic, weakTag.tag)}
                  />
                </View>
              ))
            )}
          </Card>

          <Card style={styles.section}>
            <AppText variant="subtitle">{t('stats.activityTitle')}</AppText>
            <ActivityChart activity={overview.activity} />
          </Card>

          <Card style={styles.section}>
            <AppText variant="subtitle">{t('stats.topicsTitle')}</AppText>
            {overview.topics.map((topicOverview) => (
              <View key={topicOverview.topic} style={styles.topicRow}>
                <TopicLogo topic={topicOverview.topic} size={32} />
                <View style={styles.weakTexts}>
                  <View style={styles.rowHeader}>
                    <AppText variant="bodyStrong" style={styles.shrink}>
                      {text(TOPICS[topicOverview.topic].title)}
                    </AppText>
                    <AppText variant="caption" tone="secondary">
                      {formatPercent(topicOverview.accuracy)}
                    </AppText>
                  </View>
                  <ProgressBar value={topicOverview.total > 0 ? topicOverview.seen / topicOverview.total : 0} height={6} />
                  <AppText variant="caption" tone="muted">
                    {t('stats.seen', { seen: topicOverview.seen, total: topicOverview.total })}
                  </AppText>
                </View>
              </View>
            ))}
          </Card>

          <Card style={styles.section}>
            <AppText variant="subtitle">{t('stats.difficultyTitle')}</AppText>
            {overview.difficulties.map((difficulty) => (
              <View key={difficulty.difficulty} style={styles.weakTexts}>
                <View style={styles.rowHeader}>
                  <AppText variant="bodyStrong">{t(`question.difficulty${difficulty.difficulty}`)}</AppText>
                  <AppText variant="caption" tone="secondary">
                    {difficulty.answered > 0 ? formatPercent(difficulty.accuracy) : t('stats.noAnswers')}
                  </AppText>
                </View>
                <ProgressBar value={difficulty.accuracy ?? 0} color={colors.success} height={6} />
              </View>
            ))}
          </Card>
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tile: {
    flexGrow: 1,
    flexBasis: '45%',
    gap: 2,
  },
  section: {
    gap: 14,
  },
  weakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weakTexts: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  shrink: {
    flexShrink: 1,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
