import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { useI18n } from '@app/shared/i18n';
import { CodeBlock, FormattedText, Pill } from '@app/shared/ui';
import { TAGS } from '../config/tags';
import type { Question } from '../model/types';

type QuestionViewProps = {
  question: Question;
};

export const QuestionView = ({ question }: QuestionViewProps): JSX.Element => {
  const { t, text } = useI18n();

  return (
    <View style={styles.container}>
      <View style={styles.meta}>
        <Pill label={t(`question.difficulty${question.difficulty}`)} icon="speedometer-outline" />
        {question.popular ? <Pill label={t('question.popular')} icon="flame-outline" tone="accent" /> : null}
        {question.tags.slice(0, 2).map((tag) => (
          <Pill key={tag} label={text(TAGS[tag].title)} />
        ))}
      </View>
      <FormattedText variant="subtitle">{text(question.prompt)}</FormattedText>
      {question.code ? <CodeBlock source={question.code.source} lang={question.code.lang} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
});
