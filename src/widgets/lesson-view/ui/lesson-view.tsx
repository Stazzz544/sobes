import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExplanationBlocks, getLessonByTag, getQuestions, SourceList, TAGS } from '@app/entities/question';
import { useI18n } from '@app/shared/i18n';
import { AppText, Button, Card, EmptyState, FormattedText, Screen } from '@app/shared/ui';
import type { TagId } from '@app/entities/question';

type LessonViewProps = {
  tag: TagId | null;
  onPractice: (tag: TagId) => void;
};

export const LessonView = ({ tag, onPractice }: LessonViewProps): JSX.Element => {
  const { t, text, plural } = useI18n();
  const lesson = tag ? getLessonByTag(tag) : undefined;

  if (!tag || !lesson) {
    return (
      <Screen>
        <EmptyState icon="book-outline" title={t('lesson.notFound')} text={tag ?? ''} />
      </Screen>
    );
  }

  const questionCount = getQuestions().filter((question) => question.tags.includes(tag)).length;

  return (
    <Screen withBottomInset>
      <View style={styles.heading}>
        <AppText variant="title">{text(TAGS[tag].title)}</AppText>
        <AppText tone="secondary">{text(lesson.summary)}</AppText>
      </View>
      <ExplanationBlocks blocks={lesson.blocks} />
      <Card style={styles.keyPoints}>
        <AppText variant="label" tone="muted">
          {t('lesson.keyPoints')}
        </AppText>
        {lesson.keyPoints.map((point, index) => (
          <View key={index} style={styles.point}>
            <AppText tone="accent">•</AppText>
            <View style={styles.pointText}>
              <FormattedText>{text(point)}</FormattedText>
            </View>
          </View>
        ))}
      </Card>
      {questionCount > 0 ? (
        <Button
          title={t('lesson.practice', { count: plural('question', questionCount) })}
          icon="school-outline"
          onPress={() => onPractice(tag)}
        />
      ) : null}
      <View style={styles.sources}>
        <SourceList sources={lesson.sources} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    gap: 6,
  },
  keyPoints: {
    gap: 10,
  },
  point: {
    flexDirection: 'row',
    gap: 10,
  },
  pointText: {
    flex: 1,
    minWidth: 0,
  },
  sources: {
    gap: 12,
  },
});
