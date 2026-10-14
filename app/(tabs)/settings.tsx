import { JSX } from 'react';
import { router } from 'expo-router';
import { Screen } from '@app/shared/ui';
import { SettingsPanel } from '@app/widgets/settings-panel';

export default function SettingsScreen(): JSX.Element {
  return (
    <Screen>
      <SettingsPanel onOpenReleases={() => router.push('/releases')} />
    </Screen>
  );
}
