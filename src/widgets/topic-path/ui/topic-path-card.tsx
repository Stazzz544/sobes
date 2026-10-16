import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import { progressModel } from '@app/entities/progress';
import { TAGS } from '@app/entities/question';
import { getPathProgress } from '@app/features/learning-path';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, Card, ProgressBar } from '@app/shared/ui';
import type { TagId } from '@app/entities/question';
import type { TopicId } from '@app/shared/config';

type TopicPathCardProps = {
  topic: TopicId;
  onOpen: () => void;
  onContinue: (tag: TagId) => void;
};

export const TopicPathCard = ({ topic, onOpen, onContinue }: TopicPathCardProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const { stats, learning } = useUnit({ stats: progressModel.$questionStats, learning: progressModel.$learning });
  const path = getPathProgress(topic, stats, learning);
  const { units, doneCount, nextTag } = path;
  const isCourse = path.course !== null || units.some((unit) => unit.lesson !== null);
  const progressText = t('path.progress', { done: doneCount, total: units.length });
  const title = isCourse ? t('path.courseTitle') : t('path.title');
  const isStarted = units.some((unit) => unit.status !== 'new');

  const getNextText = (): string => {
    if (!nextTag) {
      return t('path.complete');
    }
    if (isCourse) {
      const current = units.findIndex((unit) => unit.tag === nextTag) + 1;
      return t('path.nextLesson', { current, total: units.length, tag: text(TAGS[nextTag].title) });
    }
    return t('path.next', { tag: text(TAGS[nextTag].title) });
  };
  const nextText = getNextText();

  return (
    <Card onPress={onOpen} accessibilityLabel={`${title}. ${progressText}. ${nextText}`} style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
          <Ionicons name={isCourse ? 'library-outline' : 'map-outline'} size={24} color={colors.accentText} />
        </View>
        <View style={styles.texts}>
          <AppText variant="subtitle">{title}</AppText>
          <ProgressBar value={units.length > 0 ? doneCount / units.length : 0} height={6} />
          <AppText variant="caption" tone="secondary">
            {`${progressText} · ${nextText}`}
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </View>
      {isCourse && nextTag ? (
        <Button
          title={isStarted ? t('path.continue') : t('path.start')}
          icon="play"
          size="compact"
          onPress={() => onContinue(nextTag)}
        />
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 12,
  },
  row: {
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
