import { JSX } from 'react';
import { Alert } from 'react-native';
import { progressModel } from '@app/entities/progress';
import { useI18n } from '@app/shared/i18n';
import { Button } from '@app/shared/ui';

export const ResetProgressButton = (): JSX.Element => {
  const { t } = useI18n();

  const handlePress = (): void => {
    Alert.alert(t('settings.resetTitle'), t('settings.resetText'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('settings.resetConfirm'), style: 'destructive', onPress: () => progressModel.progressReset() },
    ]);
  };

  return <Button title={t('settings.reset')} icon="trash-outline" variant="danger" onPress={handlePress} />;
};
