import { JSX } from 'react';
import { Linking, Share } from 'react-native';
import Constants from 'expo-constants';
import { FEEDBACK_EMAIL } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { Button } from '@app/shared/ui';
import type { Question } from '@app/entities/question';

type ReportQuestionButtonProps = {
  question: Question;
};

export const ReportQuestionButton = ({ question }: ReportQuestionButtonProps): JSX.Element => {
  const { t, text } = useI18n();

  const handlePress = async (): Promise<void> => {
    const subject = t('report.subject', { id: question.id });
    const body = [
      t('report.bodyIntro'),
      '',
      `ID: ${question.id}`,
      `${t('report.version')}: ${Constants.expoConfig?.version ?? '—'}`,
      `${t('askAi.promptQuestion')}: ${text(question.prompt)}`,
      '',
      `${t('report.whatIsWrong')}: `,
    ].join('\n');
    if (FEEDBACK_EMAIL) {
      await Linking.openURL(
        `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      );
      return;
    }
    await Share.share({ title: subject, message: `${subject}\n\n${body}` });
  };

  return <Button title={t('report.button')} icon="flag-outline" variant="ghost" onPress={handlePress} />;
};
