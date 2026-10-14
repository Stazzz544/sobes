import { JSX, ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useUnit } from 'effector-react';
import { progressModel } from '@app/entities/progress';
import { LESSONS_BY_TAG, QUESTIONS, QUESTIONS_BY_ID, TAGS } from '@app/entities/question';
import { settingsModel } from '@app/entities/settings';
import { DIRECTIONS, DIRECTION_IDS, TOPICS, TopicLogo, topicModel } from '@app/entities/topic';
import { useI18n } from '@app/shared/i18n';
import { useNow } from '@app/shared/lib';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, Card, EmptyState, IconButton, ProgressBar, Screen } from '@app/shared/ui';
import { aggregateStats } from '../lib/aggregate-stats';
import { ActivityChart } from './activity-chart';
import type { TagId } from '@app/entities/question';
import type { TopicSelection } from '@app/shared/config';

type StatsDashboardProps = {
  onPracticeTag: (topic: TopicSelection, tag: TagId) => void;
  onOpenLesson: (tag: TagId) => void;
  footer?: ReactNode;
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

export const StatsDashboard = ({ onPracticeTag, onOpenLesson, footer }: StatsDashboardProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const { log, stats, topic, settings } = useUnit({
    log: progressModel.$answerLog,
    stats: progressModel.$questionStats,
    topic: topicModel.$currentTopic,
    settings: settingsModel.$settings,
  });
  const now = useNow();
  const dailyGoal = settings.dailyGoal;
  const overview = useMemo(
    () =>
      aggregateStats({
        log,
        stats,
        questions: QUESTIONS,
        questionsById: QUESTIONS_BY_ID,
        selection: topic,
        dailyGoal,
        now,
      }),
    [log, stats, topic, dailyGoal, now],
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
                  <View style={styles.weakMain}>
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
                  <View style={styles.weakActions}>
                    {LESSONS_BY_TAG[weakTag.tag] ? (
                      <IconButton
                        icon="book-outline"
                        accessibilityLabel={t('lesson.open', { tag: text(TAGS[weakTag.tag].title) })}
                        onPress={() => onOpenLesson(weakTag.tag)}
                      />
                    ) : null}
                    <Button
                      title={t('stats.train')}
                      variant="secondary"
                      size="compact"
                      onPress={() => onPracticeTag(TAGS[weakTag.tag].topic, weakTag.tag)}
                    />
                  </View>
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
            {DIRECTION_IDS.map((directionId) => (
              <View key={directionId} style={styles.section}>
                <AppText variant="label" tone="muted" accessibilityRole="header">
                  {text(DIRECTIONS[directionId].title)}
                </AppText>
                {overview.topics
                  .filter((topicOverview) => DIRECTIONS[directionId].topics.includes(topicOverview.topic))
                  .map((topicOverview) => (
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
                        <ProgressBar
                          value={topicOverview.total > 0 ? topicOverview.seen / topicOverview.total : 0}
                          height={6}
                        />
                        <AppText variant="caption" tone="muted">
                          {t('stats.seen', { seen: topicOverview.seen, total: topicOverview.total })}
                        </AppText>
                      </View>
                    </View>
                  ))}
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
          {footer}
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
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  weakMain: {
    flexGrow: 1,
    flexBasis: 160,
    minWidth: 0,
    gap: 6,
  },
  weakActions: {
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
