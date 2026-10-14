import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import { progressModel } from '@app/entities/progress';
import { TAGS } from '@app/entities/question';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Card, ProgressBar } from '@app/shared/ui';
import { getPathProgress } from '../lib/path-progress';
import type { TopicId } from '@app/shared/config';

type TopicPathCardProps = {
  topic: TopicId;
  onOpen: () => void;
};

export const TopicPathCard = ({ topic, onOpen }: TopicPathCardProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const { stats } = useUnit({ stats: progressModel.$questionStats });
  const { units, doneCount, nextTag } = getPathProgress(topic, stats);
  const progressText = t('path.progress', { done: doneCount, total: units.length });
  const nextText = nextTag ? t('path.next', { tag: text(TAGS[nextTag].title) }) : t('path.complete');

  return (
    <Card onPress={onOpen} accessibilityLabel={`${t('path.title')}. ${progressText}. ${nextText}`} style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
        <Ionicons name="map-outline" size={24} color={colors.accentText} />
      </View>
      <View style={styles.texts}>
        <AppText variant="subtitle">{t('path.title')}</AppText>
        <ProgressBar value={units.length > 0 ? doneCount / units.length : 0} height={6} />
        <AppText variant="caption" tone="secondary">
          {`${progressText} · ${nextText}`}
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
    gap: 6,
  },
});
