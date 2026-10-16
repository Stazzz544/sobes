import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import { progressModel, TEST_PASS_RATIO } from '@app/entities/progress';
import { TAGS } from '@app/entities/question';
import { TOPICS } from '@app/entities/topic';
import { getPathProgress } from '@app/features/learning-path';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Card, Pill, ProgressBar, Screen } from '@app/shared/ui';
import type { TagId } from '@app/entities/question';
import type { PathProgress, UnitProgress } from '@app/features/learning-path';
import type { TopicId } from '@app/shared/config';
import type { I18n } from '@app/shared/i18n';
import type { ThemeColors } from '@app/shared/theme';

type TopicPathViewProps = {
  topic: TopicId;
  onOpenLesson: (tag: TagId) => void;
  onCourseTest: (topic: TopicId) => void;
};

type FinalTestCardProps = {
  path: PathProgress;
  onPress: () => void;
};

type UnitRowProps = {
  unit: UnitProgress;
  index: number;
  isNext: boolean;
  onPress: () => void;
};

type BadgeLook = {
  background: string;
  color: string;
};

const getBadgeLook = (unit: UnitProgress, colors: ThemeColors): BadgeLook => {
  if (unit.status === 'done') {
    return { background: colors.successSoft, color: colors.success };
  }
  if (unit.status === 'started') {
    return { background: colors.accentSoft, color: colors.accentText };
  }
  return { background: colors.border, color: colors.textSecondary };
};

const TARGET_PERCENT = Math.round(TEST_PASS_RATIO * 100);

const toPercent = (ratio: number): number => Math.round(ratio * 100);

const getLessonCaption = (unit: UnitProgress, { t, plural }: I18n): string | null => {
  const lesson = unit.lesson;
  if (!lesson) {
    return null;
  }
  if (lesson.test?.passedAt) {
    return t('path.lessonPassed', { percent: toPercent(lesson.test.bestRatio) });
  }
  if (unit.status === 'done') {
    return null;
  }
  if (lesson.test) {
    return t('path.lessonTest', { percent: toPercent(lesson.test.bestRatio), target: TARGET_PERCENT });
  }
  if (lesson.seen >= lesson.total) {
    return t('path.lessonRead', { count: plural('question', lesson.testSize) });
  }
  if (lesson.seen > 0) {
    return t('path.lessonStep', { current: Math.max(lesson.lastIndex, 0) + 1, total: lesson.total });
  }
  return t('path.lessonNew', { steps: plural('step', lesson.total), count: plural('question', lesson.testSize) });
};

const getCaption = (unit: UnitProgress, i18n: I18n): string => {
  const { t, plural } = i18n;
  const lessonCaption = getLessonCaption(unit, i18n);
  if (lessonCaption) {
    return lessonCaption;
  }
  if (unit.status === 'done') {
    return t('path.unitDone', { count: plural('question', unit.total) });
  }
  if (unit.status === 'started') {
    return t('path.unitStarted', { answered: unit.answered, total: unit.total, correct: unit.correct });
  }
  return plural('question', unit.total);
};

const UnitRow = ({ unit, index, isNext, onPress }: UnitRowProps): JSX.Element => {
  const { colors } = useTheme();
  const i18n = useI18n();
  const { t, text } = i18n;
  const look = getBadgeLook(unit, colors);
  const title = text(TAGS[unit.tag].title);
  const caption = getCaption(unit, i18n);

  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${index + 1}. ${title}. ${caption}`}
      style={[styles.row, isNext && { borderColor: colors.accent }]}
    >
      <View style={[styles.badge, { backgroundColor: look.background }]}>
        {unit.status === 'done' ? (
          <Ionicons name="checkmark" size={22} color={look.color} />
        ) : (
          <AppText variant="bodyStrong" style={{ color: look.color }}>
            {String(index + 1)}
          </AppText>
        )}
      </View>
      <View style={styles.rowTexts}>
        <AppText variant="bodyStrong">{title}</AppText>
        <AppText variant="caption" tone="secondary">
          {caption}
        </AppText>
      </View>
      {isNext ? <Pill label={t('path.recommended')} tone="accent" /> : null}
    </Card>
  );
};

const FinalTestCard = ({ path, onPress }: FinalTestCardProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, plural } = useI18n();
  const test = path.courseTest;
  const getCaption = (): string => {
    if (test?.passedAt) {
      return t('path.finalTestPassed', { percent: toPercent(test.bestRatio) });
    }
    if (test) {
      return t('path.finalTestBest', { percent: toPercent(test.bestRatio), target: TARGET_PERCENT });
    }
    return t('path.finalTestCaption', { count: plural('question', path.course?.final.length ?? 0) });
  };
  const caption = getCaption();

  return (
    <Card onPress={onPress} accessibilityLabel={`${t('path.finalTest')}. ${caption}`} style={styles.row}>
      <View style={[styles.badge, { backgroundColor: test?.passedAt ? colors.successSoft : colors.accentSoft }]}>
        <Ionicons
          name={test?.passedAt ? 'trophy-outline' : 'flag-outline'}
          size={22}
          color={test?.passedAt ? colors.success : colors.accentText}
        />
      </View>
      <View style={styles.rowTexts}>
        <AppText variant="bodyStrong">{t('path.finalTest')}</AppText>
        <AppText variant="caption" tone="secondary">
          {caption}
        </AppText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </Card>
  );
};

export const TopicPathView = ({ topic, onOpenLesson, onCourseTest }: TopicPathViewProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const { stats, learning } = useUnit({ stats: progressModel.$questionStats, learning: progressModel.$learning });
  const path = getPathProgress(topic, stats, learning);
  const { units, doneCount, nextTag } = path;
  const isCourse = path.course !== null || units.some((unit) => unit.lesson !== null);
  const progressText = t('path.progress', { done: doneCount, total: units.length });

  return (
    <Screen withBottomInset>
      <View style={styles.heading}>
        <AppText variant="title">{text(TOPICS[topic].title)}</AppText>
        <ProgressBar value={units.length > 0 ? doneCount / units.length : 0} color={colors.success} accessibilityLabel={progressText} />
        <AppText tone="secondary">{nextTag ? progressText : t('path.complete')}</AppText>
        <AppText variant="caption" tone="muted">
          {isCourse ? t('path.courseHint') : t('path.hint')}
        </AppText>
      </View>
      <View style={styles.list}>
        {units.map((unit, index) => (
          <UnitRow
            key={unit.tag}
            unit={unit}
            index={index}
            isNext={unit.tag === nextTag}
            onPress={() => onOpenLesson(unit.tag)}
          />
        ))}
        {path.course ? <FinalTestCard path={path} onPress={() => onCourseTest(topic)} /> : null}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    gap: 8,
  },
  list: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
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
