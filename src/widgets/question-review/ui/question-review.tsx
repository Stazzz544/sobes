import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { useUnit } from 'effector-react';
import { progressModel } from '@app/entities/progress';
import {
  BugLineAnswer,
  ExplanationView,
  OPTION_IDS,
  OPTION_LETTERS,
  OptionButton,
  OrderAnswer,
  OutputAnswer,
  QUESTIONS_BY_ID,
  QuestionView,
} from '@app/entities/question';
import { AskAiButton } from '@app/features/ask-ai';
import { ReportQuestionButton } from '@app/features/report-question';
import { useI18n } from '@app/shared/i18n';
import { EmptyState, Pill, Screen } from '@app/shared/ui';
import type { Question, TagId } from '@app/entities/question';

type QuestionReviewProps = {
  questionId: string;
  onOpenLesson: (tag: TagId) => void;
};

type CorrectAnswerProps = {
  question: Question;
};

const CorrectAnswer = ({ question }: CorrectAnswerProps): JSX.Element => {
  if (question.kind === 'order') {
    return <OrderAnswer question={question} displayOrder={[]} order={[]} isRevealed />;
  }
  if (question.kind === 'bug-line') {
    return <BugLineAnswer question={question} line={null} isRevealed />;
  }
  if (question.kind === 'output') {
    return <OutputAnswer question={question} text="" isRevealed isCorrect={false} />;
  }
  return (
    <View style={styles.options}>
      {question.options.map((option, index) => {
        const optionId = OPTION_IDS[index] ?? 'a';
        return (
          <OptionButton
            key={optionId}
            letter={OPTION_LETTERS[optionId]}
            option={option}
            state={optionId === question.answer ? 'correct' : 'idle'}
          />
        );
      })}
    </View>
  );
};

export const QuestionReview = ({ questionId, onOpenLesson }: QuestionReviewProps): JSX.Element => {
  const { t } = useI18n();
  const { stats } = useUnit({ stats: progressModel.$questionStats });
  const question = QUESTIONS_BY_ID[questionId];
  const stat = stats[questionId];

  if (!question) {
    return (
      <Screen>
        <EmptyState icon="help-circle-outline" title={t('review.notFound')} text={questionId} />
      </Screen>
    );
  }

  return (
    <Screen withBottomInset>
      {stat ? (
        <View style={styles.stats}>
          <Pill label={t('review.stats', { attempts: stat.attempts, correct: stat.correct })} icon="stats-chart-outline" />
          {stat.inMistakes ? <Pill label={t('review.inMistakes')} icon="refresh-circle-outline" tone="accent" /> : null}
        </View>
      ) : null}
      <QuestionView question={question} />
      <CorrectAnswer question={question} />
      <ExplanationView question={question} onOpenLesson={onOpenLesson} />
      <AskAiButton question={question} />
      <ReportQuestionButton question={question} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  options: {
    gap: 10,
  },
});
