import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import { isDueForReview, progressModel } from '@app/entities/progress';
import { QUESTIONS } from '@app/entities/question';
import { useI18n } from '@app/shared/i18n';
import { addDays, startOfDay, useNow } from '@app/shared/lib';
import { useTheme } from '@app/shared/theme';
import { AppText, Card } from '@app/shared/ui';
import type { QuestionStat } from '@app/entities/progress';

type ReviewTodayCardProps = {
  onStart: () => void;
};

export const ReviewTodayCard = ({ onStart }: ReviewTodayCardProps): JSX.Element | null => {
  const { colors } = useTheme();
  const { t, plural, locale } = useI18n();
  const { stats } = useUnit({ stats: progressModel.$questionStats });
  const now = useNow();

  const scheduled = QUESTIONS.map((question) => stats[question.id]).filter(
    (stat): stat is QuestionStat => stat !== undefined,
  );
  if (scheduled.length === 0) {
    return null;
  }

  const dueCount = scheduled.filter((stat) => isDueForReview(stat, now)).length;

  if (dueCount > 0) {
    const caption = t('reviewToday.due', { count: plural('question', dueCount) });
    return (
      <Card
        onPress={onStart}
        accessibilityLabel={`${t('reviewToday.title')}. ${caption}`}
        style={[styles.card, { borderColor: colors.accent }]}
      >
        <View style={[styles.iconWrap, { backgroundColor: colors.accent }]}>
          <Ionicons name="calendar-outline" size={24} color={colors.onAccent} />
        </View>
        <View style={styles.texts}>
          <AppText variant="subtitle">{t('reviewToday.title')}</AppText>
          <AppText variant="caption" tone="secondary">
            {caption}
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </Card>
    );
  }

  const nextDueAt = Math.min(...scheduled.map((stat) => stat.dueAt));
  const isTomorrow = startOfDay(nextDueAt) === addDays(startOfDay(now), 1);
  const nextText = isTomorrow
    ? t('reviewToday.nextTomorrow')
    : t('reviewToday.nextDate', { date: new Date(nextDueAt).toLocaleDateString(locale, { day: 'numeric', month: 'long' }) });

  return (
    <Card style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
        <Ionicons name="checkmark-done-outline" size={24} color={colors.accentText} />
      </View>
      <View style={styles.texts}>
        <AppText variant="subtitle">{t('reviewToday.doneTitle')}</AppText>
        <AppText variant="caption" tone="secondary">
          {nextText}
        </AppText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
});
