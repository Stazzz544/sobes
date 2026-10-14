import { JSX } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { Button, EmptyState, Screen } from '@app/shared/ui';

type ErrorFallbackProps = {
  onRetry: () => void;
};

export const ErrorFallback = ({ onRetry }: ErrorFallbackProps): JSX.Element => {
  const { t } = useI18n();
  const { isDark } = useTheme();

  return (
    <Screen withTopInset withBottomInset>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <EmptyState icon="alert-circle-outline" title={t('errorFallback.title')} text={t('errorFallback.text')} />
      <Button title={t('errorFallback.retry')} icon="refresh" onPress={onRetry} />
    </Screen>
  );
};
