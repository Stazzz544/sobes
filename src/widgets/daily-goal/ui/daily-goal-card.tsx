import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { useUnit } from 'effector-react';
import { getGoalProgress, progressModel } from '@app/entities/progress';
import { settingsModel } from '@app/entities/settings';
import { useI18n } from '@app/shared/i18n';
import { useNow } from '@app/shared/lib';
import { AppText, Card, Pill, ProgressBar } from '@app/shared/ui';

export const DailyGoalCard = (): JSX.Element => {
  const { t, plural } = useI18n();
  const { log, settings } = useUnit({
    log: progressModel.$answerLog,
    settings: settingsModel.$settings,
  });
  const now = useNow();
  const goal = settings.dailyGoal;
  const { todayCount, isTodayDone, streakDays } = getGoalProgress(log, goal, now);
  const progressText = t('dailyGoal.progress', { done: todayCount, goal });

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <AppText variant="subtitle" style={styles.title}>
          {t('dailyGoal.title')}
        </AppText>
        {streakDays > 0 ? (
          <View accessible accessibilityLabel={t('dailyGoal.streak', { days: plural('day', streakDays) })}>
            <Pill icon="flame" tone="accent" label={plural('day', streakDays)} />
          </View>
        ) : null}
      </View>
      <ProgressBar value={todayCount / goal} accessibilityLabel={progressText} />
      <View style={styles.footer}>
        <AppText variant="caption" tone="secondary" style={styles.title}>
          {isTodayDone ? t('dailyGoal.done') : t('dailyGoal.remaining', { count: plural('question', goal - todayCount) })}
        </AppText>
        <AppText variant="caption" tone="muted">{`${todayCount} / ${goal}`}</AppText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    flex: 1,
    minWidth: 0,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
