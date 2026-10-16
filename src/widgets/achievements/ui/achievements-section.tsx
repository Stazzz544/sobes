import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import { progressModel } from '@app/entities/progress';
import { settingsModel } from '@app/entities/settings';
import { useI18n } from '@app/shared/i18n';
import { useNow } from '@app/shared/lib';
import { useTheme } from '@app/shared/theme';
import { AppText, Card } from '@app/shared/ui';
import { getAchievements } from '../lib/achievements';
import type { Achievement } from '../lib/achievements';

type AchievementRowProps = {
  achievement: Achievement;
};

const AchievementRow = ({ achievement }: AchievementRowProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const isUnlocked = achievement.current >= achievement.target;
  const title = t(`achievements.items.${achievement.id}.title`);
  const description = t(`achievements.items.${achievement.id}.description`);
  const status = isUnlocked
    ? t('achievements.unlocked')
    : t('achievements.progress', { current: achievement.current, target: achievement.target });

  return (
    <View style={styles.row} accessible accessibilityLabel={`${title}. ${description}. ${status}`}>
      <View style={[styles.badge, { backgroundColor: isUnlocked ? colors.accent : colors.border }]}>
        <Ionicons name={achievement.icon} size={22} color={isUnlocked ? colors.onAccent : colors.textMuted} />
      </View>
      <View style={styles.rowTexts}>
        <AppText variant="bodyStrong" tone={isUnlocked ? 'primary' : 'secondary'}>
          {title}
        </AppText>
        <AppText variant="caption" tone="muted">
          {description}
        </AppText>
      </View>
      <AppText variant="caption" tone={isUnlocked ? 'accent' : 'muted'}>
        {status}
      </AppText>
    </View>
  );
};

export const AchievementsSection = (): JSX.Element => {
  const { t } = useI18n();
  const { stats, log, learning, settings } = useUnit({
    stats: progressModel.$questionStats,
    log: progressModel.$answerLog,
    learning: progressModel.$learning,
    settings: settingsModel.$settings,
  });
  const now = useNow();
  const achievements = getAchievements({ stats, log, learning, dailyGoal: settings.dailyGoal, now });
  const done = achievements.filter((achievement) => achievement.current >= achievement.target).length;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <AppText variant="subtitle">{t('achievements.title')}</AppText>
        <AppText variant="caption" tone="secondary">
          {t('achievements.summary', { done, total: achievements.length })}
        </AppText>
      </View>
      {achievements.map((achievement) => (
        <AchievementRow key={achievement.id} achievement={achievement} />
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTexts: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
});
