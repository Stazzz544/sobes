import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import { progressModel } from '@app/entities/progress';
import { getQuestions } from '@app/entities/question';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Card } from '@app/shared/ui';
import type { TopicId } from '@app/shared/config';

type PlacementCardProps = {
  topic: TopicId;
  onStart: () => void;
};

export const PlacementCard = ({ topic, onStart }: PlacementCardProps): JSX.Element | null => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { stats } = useUnit({ stats: progressModel.$questionStats });
  const hasAnswers = getQuestions().some((question) => question.topic === topic && stats[question.id] !== undefined);

  if (hasAnswers) {
    return null;
  }

  return (
    <Card
      onPress={onStart}
      accessibilityLabel={`${t('placement.title')}. ${t('placement.caption')}`}
      style={[styles.card, { borderColor: colors.accent }]}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.accent }]}>
        <Ionicons name="compass-outline" size={24} color={colors.onAccent} />
      </View>
      <View style={styles.texts}>
        <AppText variant="subtitle">{t('placement.title')}</AppText>
        <AppText variant="caption" tone="secondary">
          {t('placement.caption')}
        </AppText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
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
