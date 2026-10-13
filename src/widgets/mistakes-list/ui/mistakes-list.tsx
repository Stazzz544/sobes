import { JSX } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import { progressModel } from '@app/entities/progress';
import { QUESTIONS_BY_ID, TAGS } from '@app/entities/question';
import { TopicLogo, topicModel } from '@app/entities/topic';
import { CARD_BORDER_RADIUS, MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { toPlainText } from '@app/shared/lib';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, Card, EmptyState, Screen } from '@app/shared/ui';
import type { Question } from '@app/entities/question';
import type { TopicSelection } from '@app/shared/config';

type MistakesListProps = {
  onOpenQuestion: (questionId: string) => void;
  onReview: (topic: TopicSelection) => void;
};

export const MistakesList = ({ onOpenQuestion, onReview }: MistakesListProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const { mistakeIds, stats, topic } = useUnit({
    mistakeIds: progressModel.$mistakeIds,
    stats: progressModel.$questionStats,
    topic: topicModel.$currentTopic,
  });
  const questions = mistakeIds
    .map((questionId) => QUESTIONS_BY_ID[questionId])
    .filter((question): question is Question => Boolean(question))
    .filter((question) => topic === 'all' || question.topic === topic);

  return (
    <Screen>
      {questions.length === 0 ? (
        <EmptyState icon="checkmark-done-outline" title={t('mistakes.emptyTitle')} text={t('mistakes.emptyText')} />
      ) : (
        <>
          <Card style={styles.summary}>
            <AppText variant="subtitle">{t('mistakes.pending', { count: questions.length })}</AppText>
            <AppText variant="caption" tone="secondary">
              {t('mistakes.hint')}
            </AppText>
            <Button title={t('mistakes.repeat')} icon="refresh" onPress={() => onReview(topic)} />
          </Card>
          <View style={styles.list}>
            {questions.map((question) => {
              const firstTag = question.tags[0];
              const stat = stats[question.id];
              const mistakesCount = (stat?.wrong ?? 0) + (stat?.dontKnow ?? 0);
              return (
                <Pressable
                  key={question.id}
                  onPress={() => onOpenQuestion(question.id)}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    styles.row,
                    { backgroundColor: colors.bgCard, borderColor: colors.border },
                    pressed && styles.pressed,
                  ]}
                >
                  <TopicLogo topic={question.topic} size={32} />
                  <View style={styles.rowTexts}>
                    <AppText numberOfLines={2}>{toPlainText(text(question.prompt))}</AppText>
                    <AppText variant="caption" tone="muted">
                      {[firstTag ? text(TAGS[firstTag].title) : null, t('mistakes.errors', { count: mistakesCount })]
                        .filter(Boolean)
                        .join(' · ')}
                    </AppText>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </Pressable>
              );
            })}
          </View>
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  summary: {
    gap: 8,
  },
  list: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: MIN_TOUCH_SIZE + 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: CARD_BORDER_RADIUS,
    borderWidth: 1,
  },
  rowTexts: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  pressed: {
    opacity: 0.8,
  },
});
